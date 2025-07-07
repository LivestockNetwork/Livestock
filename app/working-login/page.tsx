"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, LogIn } from "lucide-react"

export default function WorkingLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      console.log("Logging in user with:", { email: formData.email })

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      console.log("Login result:", { data, error })

      if (error) {
        setResult({
          success: false,
          message: `Login failed: ${error.message}`,
          details: { error: error.message, code: error.code },
        })
      } else {
        setResult({
          success: true,
          message: "Login successful! Welcome back.",
          details: {
            userId: data.user?.id,
            email: data.user?.email,
            hasSession: !!data.session,
            lastSignIn: data.user?.last_sign_in_at,
          },
        })

        // Clear password on success
        setFormData((prev) => ({ ...prev, password: "" }))
      }
    } catch (error) {
      console.error("Login error:", error)
      setResult({
        success: false,
        message: `Login error: ${error instanceof Error ? error.message : "Unknown error"}`,
        details: { error: String(error) },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Sign In
          </CardTitle>
          <p className="text-sm text-gray-600">Access your livestock emergency planning account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Your password"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {result && (
            <Alert className={`mt-4 ${result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                  {result.message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {result && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium">Technical Details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(result.details, null, 2)}
              </pre>
            </details>
          )}

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <a href="/working-register" className="text-blue-600 hover:underline">
                Create one here
              </a>
            </p>
            <p className="mt-2">
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
