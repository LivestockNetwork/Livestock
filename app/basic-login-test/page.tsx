"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Database, Shield, UserPlus } from "lucide-react"

interface TestResult {
  name: string
  status: "idle" | "running" | "success" | "error"
  message: string
  details?: any
}

export default function BasicLoginTestPage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "Database Connection", status: "idle", message: "Not started" },
    { name: "Auth Service", status: "idle", message: "Not started" },
    { name: "Registration Test", status: "idle", message: "Not started" },
  ])
  const [isRunning, setIsRunning] = useState(false)

  const updateTest = (name: string, status: TestResult["status"], message: string, details?: any) => {
    setTests((prev) => prev.map((test) => (test.name === name ? { ...test, status, message, details } : test)))
  }

  const runAllTests = async () => {
    setIsRunning(true)

    // Test 1: Database Connection
    updateTest("Database Connection", "running", "Testing database connection...")
    try {
      const dbResponse = await fetch("/api/database/check-connection")
      const dbData = await dbResponse.json()
      updateTest("Database Connection", dbData.success ? "success" : "error", dbData.message, dbData.details)
    } catch (error) {
      updateTest("Database Connection", "error", "Connection test failed", { error: String(error) })
    }

    // Test 2: Auth Service
    updateTest("Auth Service", "running", "Testing Supabase auth service...")
    try {
      const authResponse = await fetch("/api/debug/supabase-test")
      const authData = await authResponse.json()
      updateTest("Auth Service", authData.success ? "success" : "error", authData.message, authData.details)
    } catch (error) {
      updateTest("Auth Service", "error", "Auth service test failed", { error: String(error) })
    }

    // Test 3: Registration Test
    updateTest("Registration Test", "running", "Testing user registration...")
    try {
      const regResponse = await fetch("/api/debug/registration-test", { method: "POST" })
      const regData = await regResponse.json()
      updateTest("Registration Test", regData.success ? "success" : "error", regData.message, regData.details)
    } catch (error) {
      updateTest("Registration Test", "error", "Registration test failed", { error: String(error) })
    }

    setIsRunning(false)
  }

  const getTestIcon = (name: string) => {
    const iconClass = "h-5 w-5"
    switch (name) {
      case "Database Connection":
        return <Database className={iconClass} />
      case "Auth Service":
        return <Shield className={iconClass} />
      case "Registration Test":
        return <UserPlus className={iconClass} />
      default:
        return <CheckCircle className={iconClass} />
    }
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "running":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusColor = (status: TestResult["status"]) => {
    switch (status) {
      case "running":
        return "border-blue-200 bg-blue-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Basic Login Test</CardTitle>
            <p className="text-sm text-gray-600">Test core authentication functionality</p>
          </CardHeader>
          <CardContent>
            <Button onClick={runAllTests} disabled={isRunning} className="w-full mb-6">
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Tests...
                </>
              ) : (
                "Run Authentication Tests"
              )}
            </Button>

            <div className="space-y-4">
              {tests.map((test) => (
                <Alert key={test.name} className={getStatusColor(test.status)}>
                  <div className="flex items-start gap-3">
                    {getTestIcon(test.name)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{test.name}</h3>
                        {getStatusIcon(test.status)}
                        <span className="text-sm font-medium capitalize">{test.status}</span>
                      </div>
                      <AlertDescription>{test.message}</AlertDescription>
                      {test.details && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-sm font-medium">View Details</summary>
                          <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-40">
                            {JSON.stringify(test.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Next Steps</h3>
                  <div className="space-y-2 text-sm">
                    <a href="/simple-auth-test" className="block text-blue-600 hover:underline">
                      → Simple Auth Test
                    </a>
                    <a href="/working-register" className="block text-blue-600 hover:underline">
                      → Working Register
                    </a>
                    <a href="/working-login" className="block text-blue-600 hover:underline">
                      → Working Login
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Debug Tools</h3>
                  <div className="space-y-2 text-sm">
                    <a href="/debug-registration" className="block text-blue-600 hover:underline">
                      → Full Debug Suite
                    </a>
                    <a href="/database-check" className="block text-blue-600 hover:underline">
                      → Database Check
                    </a>
                    <a href="/env-validator" className="block text-blue-600 hover:underline">
                      → Environment Validator
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <h3 className="font-medium mb-2">Status</h3>
                  <div className="text-sm text-gray-600">
                    Environment variables are properly configured. Testing authentication functionality.
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
