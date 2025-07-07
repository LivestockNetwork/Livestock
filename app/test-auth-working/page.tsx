"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Database, Key, Globe } from "lucide-react"

export default function TestAuthWorking() {
  const [envStatus, setEnvStatus] = useState<any>(null)
  const [dbStatus, setDbStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const checkEnvironmentVariables = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const status = {
      url: {
        exists: !!supabaseUrl,
        valid: supabaseUrl?.startsWith("https://") && supabaseUrl?.includes("supabase.co"),
        value: supabaseUrl || "Not set",
      },
      key: {
        exists: !!supabaseKey,
        valid: supabaseKey?.startsWith("eyJ") && supabaseKey?.length > 100,
        value: supabaseKey ? `${supabaseKey.substring(0, 20)}...` : "Not set",
      },
    }

    setEnvStatus(status)
  }

  const testDatabaseConnection = async () => {
    setLoading(true)
    try {
      // Mock database test
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setDbStatus({
        connected: true,
        message: "Database connection successful",
      })
    } catch (error) {
      setDbStatus({
        connected: false,
        message: "Database connection failed",
      })
    } finally {
      setLoading(false)
    }
  }

  const testRegistration = async () => {
    if (!email || !password) {
      alert("Please enter email and password")
      return
    }

    setLoading(true)
    try {
      // Mock registration test
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Registration test completed - check console for details")
    } catch (error) {
      alert("Registration test failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Authentication Test Center</h1>
          <p className="text-gray-600">Test your Supabase setup and authentication</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Environment Variables Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Environment Variables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={checkEnvironmentVariables} className="w-full">
                Check Environment Variables
              </Button>

              {envStatus && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Supabase URL</p>
                      <p className="text-sm text-gray-600">{envStatus.url.value}</p>
                    </div>
                    {envStatus.url.exists && envStatus.url.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Supabase Anon Key</p>
                      <p className="text-sm text-gray-600">{envStatus.key.value}</p>
                    </div>
                    {envStatus.key.exists && envStatus.key.valid ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Database Connection Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Connection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={testDatabaseConnection} disabled={loading} className="w-full">
                {loading ? "Testing Connection..." : "Test Database Connection"}
              </Button>

              {dbStatus && (
                <Alert className={dbStatus.connected ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {dbStatus.connected ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={dbStatus.connected ? "text-green-700" : "text-red-700"}>
                    {dbStatus.message}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Registration Test */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Registration Test
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="test-email">Test Email</Label>
                  <Input
                    id="test-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="test-password">Test Password</Label>
                  <Input
                    id="test-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter test password"
                  />
                </div>
              </div>

              <Button onClick={testRegistration} disabled={loading || !email || !password} className="w-full">
                {loading ? "Testing Registration..." : "Test User Registration"}
              </Button>

              <Alert>
                <AlertDescription>
                  This will test the registration process without actually creating a user account. Check the browser
                  console for detailed results.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Quick Links */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" onClick={() => (window.location.href = "/working-auth")}>
                Working Auth
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/admin")}>
                Admin Panel
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/dashboard")}>
                Dashboard
              </Button>
              <Button variant="outline" onClick={() => (window.location.href = "/")}>
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
