"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SupabaseDirectTestPage() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [testPassword, setTestPassword] = useState("")

  const addResult = (message: string) => {
    setTestResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSupabaseDirectly = async () => {
    setIsLoading(true)
    setTestResults([])

    try {
      addResult("Starting direct Supabase test...")

      // Test 1: Check if we can import Supabase
      addResult("Importing Supabase client...")
      const { createClient } = await import("@supabase/supabase-js")
      addResult("✅ Supabase import successful")

      // Test 2: Get environment variables
      addResult("Checking environment variables...")
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl) {
        addResult("❌ NEXT_PUBLIC_SUPABASE_URL not found")
        return
      }
      if (!supabaseAnonKey) {
        addResult("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY not found")
        return
      }

      addResult(`✅ Environment variables found`)
      addResult(`URL: ${supabaseUrl.substring(0, 30)}...`)
      addResult(`Key: ${supabaseAnonKey.substring(0, 20)}...`)

      // Test 3: Create Supabase client
      addResult("Creating Supabase client...")
      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      addResult("✅ Supabase client created")

      // Test 4: Test basic connectivity
      addResult("Testing basic connectivity...")
      const { data, error } = await supabase.from("information_schema.tables").select("table_name").limit(1)

      if (error) {
        addResult(`❌ Database connection failed: ${error.message}`)
        addResult(`Error code: ${error.code}`)
        addResult(`Error hint: ${error.hint}`)
        return
      }

      addResult("✅ Database connection successful")

      // Test 5: Test auth service
      addResult("Testing auth service...")
      const { data: session, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        addResult(`❌ Auth service error: ${sessionError.message}`)
        return
      }

      addResult("✅ Auth service accessible")
      addResult(`Current session: ${session.session ? "Active" : "None"}`)

      addResult("🎉 All basic tests passed!")
    } catch (error) {
      addResult(`❌ Test failed: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testRegistration = async () => {
    if (!testEmail || !testPassword) {
      addResult("❌ Please enter email and password for registration test")
      return
    }

    setIsLoading(true)

    try {
      addResult(`Testing registration with email: ${testEmail}`)

      const { createClient } = await import("@supabase/supabase-js")
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      const supabase = createClient(supabaseUrl, supabaseAnonKey)

      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })

      if (error) {
        addResult(`❌ Registration failed: ${error.message}`)

        // Provide specific fixes for common errors
        if (error.message.includes("Email confirmations are required")) {
          addResult("🔧 Fix: Disable email confirmations in Supabase Dashboard → Authentication → Settings")
        }
        if (error.message.includes("Signup is disabled")) {
          addResult("🔧 Fix: Enable signups in Supabase Dashboard → Authentication → Settings")
        }
        if (error.message.includes("string did not match")) {
          addResult("🔧 Fix: Check your Supabase URL and API keys format")
        }

        return
      }

      addResult("✅ Registration successful!")
      addResult(`User ID: ${data.user?.id}`)
      addResult(`Email confirmed: ${data.user?.email_confirmed_at ? "Yes" : "No"}`)
      addResult(`Session created: ${data.session ? "Yes" : "No"}`)
    } catch (error) {
      addResult(`❌ Registration test failed: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Direct Supabase Test</CardTitle>
            <p className="text-sm text-gray-600">
              Test Supabase connectivity and authentication directly without complex abstractions
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testSupabaseDirectly} disabled={isLoading} className="w-full">
              {isLoading ? "Running Tests..." : "Run Basic Connectivity Test"}
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testEmail">Test Email</Label>
                <Input
                  id="testEmail"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="testPassword">Test Password</Label>
                <Input
                  id="testPassword"
                  type="password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  placeholder="testpassword123"
                />
              </div>
            </div>

            <Button
              onClick={testRegistration}
              disabled={isLoading || !testEmail || !testPassword}
              variant="outline"
              className="w-full bg-transparent"
            >
              Test Registration
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            {testResults.length === 0 ? (
              <Alert>
                <AlertDescription>
                  Click "Run Basic Connectivity Test" to start testing your Supabase setup
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm font-mono ${
                      result.includes("❌")
                        ? "bg-red-50 text-red-800"
                        : result.includes("✅")
                          ? "bg-green-50 text-green-800"
                          : result.includes("🔧")
                            ? "bg-blue-50 text-blue-800"
                            : result.includes("🎉")
                              ? "bg-purple-50 text-purple-800"
                              : "bg-gray-50 text-gray-800"
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
