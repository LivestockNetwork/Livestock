"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, Database, Shield, UserPlus, Settings } from "lucide-react"

interface TestResult {
  name: string
  status: "idle" | "running" | "success" | "error"
  message: string
  details?: any
}

export default function DebugRegistrationPage() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: "Environment Check", status: "idle", message: "Not started" },
    { name: "Supabase Connection", status: "idle", message: "Not started" },
    { name: "Registration Test", status: "idle", message: "Not started" },
  ])
  const [isRunning, setIsRunning] = useState(false)

  const updateTest = (name: string, status: TestResult["status"], message: string, details?: any) => {
    setTests((prev) => prev.map((test) => (test.name === name ? { ...test, status, message, details } : test)))
  }

  const runAllTests = async () => {
    setIsRunning(true)

    // Test 1: Environment Check
    updateTest("Environment Check", "running", "Checking environment variables...")
    try {
      const envResponse = await fetch("/api/debug/env-check")
      const envData = await envResponse.json()
      updateTest("Environment Check", envData.success ? "success" : "error", envData.message, envData.details)
    } catch (error) {
      updateTest("Environment Check", "error", "Environment check failed", { error: String(error) })
    }

    // Test 2: Supabase Connection
    updateTest("Supabase Connection", "running", "Testing Supabase connection...")
    try {
      const supabaseResponse = await fetch("/api/debug/supabase-test")
      const supabaseData = await supabaseResponse.json()
      updateTest(
        "Supabase Connection",
        supabaseData.success ? "success" : "error",
        supabaseData.message,
        supabaseData.details,
      )
    } catch (error) {
      updateTest("Supabase Connection", "error", "Supabase connection failed", { error: String(error) })
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
      case "Environment Check":
        return <Settings className={iconClass} />
      case "Supabase Connection":
        return <Database className={iconClass} />
      case "Registration Test":
        return <UserPlus className={iconClass} />
      default:
        return <Shield className={iconClass} />
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
            <CardTitle>Registration Debug Center</CardTitle>
            <p className="text-sm text-gray-600">Diagnose registration issues and test system components</p>
          </CardHeader>
          <CardContent>
            <Button onClick={runAllTests} disabled={isRunning} className="w-full mb-6">
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running All Tests...
                </>
              ) : (
                "Run All Tests"
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

            <div className="mt-8 space-y-4">
              <h3 className="font-medium">Common Issues & Solutions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Alert>
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>"fetch failed" Error</strong>
                    <br />
                    Usually caused by incorrect Supabase URL or missing environment variables
                  </AlertDescription>
                </Alert>
                <Alert>
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>"String did not match expected pattern"</strong>
                    <br />
                    Supabase URL or API key format is invalid
                  </AlertDescription>
                </Alert>
              </div>
              <Alert>
                <Settings className="h-4 w-4" />
                <AlertDescription>
                  <strong>Environment Variables</strong>
                  <br />
                  Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
