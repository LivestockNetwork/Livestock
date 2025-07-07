"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, AlertTriangle, Loader2 } from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "success" | "error" | "warning"
  message: string
  details?: any
}

export default function ComprehensiveAuthDebug() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const updateTest = (name: string, status: TestResult["status"], message: string, details?: any) => {
    setTests((prev) => {
      const existing = prev.find((t) => t.name === name)
      if (existing) {
        existing.status = status
        existing.message = message
        existing.details = details
        return [...prev]
      } else {
        return [...prev, { name, status, message, details }]
      }
    })
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setTests([])

    // Test 1: Environment Variables
    updateTest("Environment Variables", "pending", "Checking environment variables...")
    try {
      const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
      const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (hasUrl && hasKey) {
        updateTest("Environment Variables", "success", "Environment variables are present", {
          url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + "...",
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 30) + "...",
        })
      } else {
        updateTest("Environment Variables", "error", "Missing environment variables", {
          hasUrl,
          hasKey,
        })
        setIsRunning(false)
        return
      }
    } catch (error) {
      updateTest("Environment Variables", "error", "Error checking environment variables", error)
      setIsRunning(false)
      return
    }

    // Test 2: Supabase Client Creation
    updateTest("Supabase Client", "pending", "Creating Supabase client...")
    let supabase: any
    try {
      supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      updateTest("Supabase Client", "success", "Supabase client created successfully")
    } catch (error) {
      updateTest("Supabase Client", "error", "Failed to create Supabase client", error)
      setIsRunning(false)
      return
    }

    // Test 3: Basic Connection Test
    updateTest("Connection Test", "pending", "Testing basic connection...")
    try {
      const { data, error } = await supabase.from("users").select("count").limit(1)
      if (error) {
        updateTest("Connection Test", "warning", "Connection established but query failed", {
          error: error.message,
          code: error.code,
        })
      } else {
        updateTest("Connection Test", "success", "Database connection successful", data)
      }
    } catch (error) {
      updateTest("Connection Test", "error", "Connection test failed", error)
    }

    // Test 4: Auth Service Test
    updateTest("Auth Service", "pending", "Testing auth service...")
    try {
      const { data, error } = await supabase.auth.getSession()
      updateTest("Auth Service", "success", "Auth service is accessible", {
        hasSession: !!data.session,
        sessionData: data.session ? "Session exists" : "No active session",
      })
    } catch (error) {
      updateTest("Auth Service", "error", "Auth service test failed", error)
    }

    // Test 5: Sign Up Test (without actually signing up)
    updateTest("Sign Up Test", "pending", "Testing sign up functionality...")
    try {
      // Test with invalid email to see what error we get
      const { data, error } = await supabase.auth.signUp({
        email: "invalid-email-format",
        password: "test123",
      })

      if (error) {
        if (error.message.includes("Invalid email")) {
          updateTest("Sign Up Test", "success", "Sign up service is working (validation error expected)", {
            error: error.message,
          })
        } else {
          updateTest("Sign Up Test", "warning", "Sign up service responded with unexpected error", {
            error: error.message,
            code: error.status,
          })
        }
      } else {
        updateTest("Sign Up Test", "warning", "Sign up accepted invalid email", data)
      }
    } catch (error) {
      updateTest("Sign Up Test", "error", "Sign up test failed completely", error)
    }

    // Test 6: Network Connectivity
    updateTest("Network Test", "pending", "Testing network connectivity...")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
      })

      if (response.ok) {
        updateTest("Network Test", "success", "Direct API call successful", {
          status: response.status,
          statusText: response.statusText,
        })
      } else {
        updateTest("Network Test", "warning", "API responded with error", {
          status: response.status,
          statusText: response.statusText,
        })
      }
    } catch (error) {
      updateTest("Network Test", "error", "Network test failed", error)
    }

    // Test 7: Browser Environment
    updateTest("Browser Environment", "pending", "Checking browser environment...")
    try {
      const browserInfo = {
        userAgent: navigator.userAgent,
        cookiesEnabled: navigator.cookieEnabled,
        localStorage: typeof localStorage !== "undefined",
        sessionStorage: typeof sessionStorage !== "undefined",
        fetch: typeof fetch !== "undefined",
      }
      updateTest("Browser Environment", "success", "Browser environment check complete", browserInfo)
    } catch (error) {
      updateTest("Browser Environment", "error", "Browser environment check failed", error)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "pending":
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
    }
  }

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "pending":
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Comprehensive Authentication Debug</CardTitle>
            <p className="text-sm text-gray-600">
              This will test every component in the authentication chain to identify the exact issue.
            </p>
          </CardHeader>
          <CardContent>
            <Button onClick={runAllTests} disabled={isRunning} className="w-full">
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Tests...
                </>
              ) : (
                "Run All Tests"
              )}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {tests.map((test, index) => (
            <Alert key={index} className={getStatusColor(test.status)}>
              <div className="flex items-start gap-3">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{test.name}</h3>
                  </div>
                  <AlertDescription className="mt-1">{test.message}</AlertDescription>
                  {test.details && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-sm font-medium">View Details</summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                        {JSON.stringify(test.details, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {tests.length > 0 && !isRunning && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {tests.filter((t) => t.status === "success").length}
                  </div>
                  <div className="text-sm text-gray-600">Passed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {tests.filter((t) => t.status === "warning").length}
                  </div>
                  <div className="text-sm text-gray-600">Warnings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {tests.filter((t) => t.status === "error").length}
                  </div>
                  <div className="text-sm text-gray-600">Failed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {tests.filter((t) => t.status === "pending").length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
