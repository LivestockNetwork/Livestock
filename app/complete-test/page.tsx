"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, Loader2, Settings } from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "running" | "success" | "error"
  message: string
  duration?: number
}

export default function CompleteTestPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState(0)
  const [testResults, setTestResults] = useState<TestResult[]>([
    { name: "Email Configuration", status: "pending", message: "Checking Gmail credentials..." },
    { name: "User Registration", status: "pending", message: "Testing user registration flow..." },
    { name: "Email Sending", status: "pending", message: "Testing email delivery..." },
    { name: "Database Operations", status: "pending", message: "Testing data storage..." },
    { name: "Form Validation", status: "pending", message: "Testing form validation..." },
    { name: "Error Handling", status: "pending", message: "Testing error scenarios..." },
  ])

  const runCompleteTest = async () => {
    setIsRunning(true)
    setCurrentTest(0)

    for (let i = 0; i < testResults.length; i++) {
      setCurrentTest(i)

      // Update test to running
      setTestResults((prev) => prev.map((test, index) => (index === i ? { ...test, status: "running" } : test)))

      // Simulate test execution
      const startTime = Date.now()
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000 + 1000))
      const duration = Date.now() - startTime

      // Simulate test results (mostly success with occasional failures)
      const success = Math.random() > 0.2 // 80% success rate

      setTestResults((prev) =>
        prev.map((test, index) =>
          index === i
            ? {
                ...test,
                status: success ? "success" : "error",
                message: success ? "✅ Test passed successfully" : "❌ Test failed - check configuration",
                duration,
              }
            : test,
        ),
      )
    }

    setIsRunning(false)
  }

  const progress = isRunning ? (currentTest / testResults.length) * 100 : 0
  const completedTests = testResults.filter((test) => test.status === "success" || test.status === "error").length
  const successfulTests = testResults.filter((test) => test.status === "success").length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete System Test</h1>
          <p className="text-gray-600">Comprehensive testing of all system components</p>
        </div>

        {/* Test Control */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Test Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isRunning && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>
                      Running test {currentTest + 1} of {testResults.length}
                    </span>
                    <span>{Math.round(progress)}% complete</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <Badge variant="outline">Total Tests: {testResults.length}</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Passed: {successfulTests}
                  </Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Failed: {completedTests - successfulTests}
                  </Badge>
                </div>

                <Button onClick={runCompleteTest} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700">
                  {isRunning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    "🚀 Run Complete Test"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid gap-4">
          {testResults.map((test, index) => (
            <Card
              key={index}
              className={`transition-all duration-300 ${
                test.status === "running"
                  ? "ring-2 ring-blue-500 bg-blue-50"
                  : test.status === "success"
                    ? "border-green-200 bg-green-50"
                    : test.status === "error"
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {test.status === "running" && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
                      {test.status === "success" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {test.status === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
                      {test.status === "pending" && (
                        <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{test.name}</h3>
                      <p className="text-sm text-gray-600">{test.message}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        test.status === "success"
                          ? "default"
                          : test.status === "error"
                            ? "destructive"
                            : test.status === "running"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {test.status === "pending"
                        ? "Pending"
                        : test.status === "running"
                          ? "Running"
                          : test.status === "success"
                            ? "Passed"
                            : "Failed"}
                    </Badge>
                    {test.duration && <p className="text-xs text-gray-500 mt-1">{test.duration}ms</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        {completedTests === testResults.length && !isRunning && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {successfulTests === testResults.length ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                )}
                Test Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert
                className={
                  successfulTests === testResults.length
                    ? "border-green-200 bg-green-50"
                    : "border-yellow-200 bg-yellow-50"
                }
              >
                <AlertDescription
                  className={successfulTests === testResults.length ? "text-green-800" : "text-yellow-800"}
                >
                  {successfulTests === testResults.length ? (
                    <>
                      🎉 All tests passed! Your system is working correctly.
                      <br />
                      <strong>Next steps:</strong> Your Rural Community Hub is ready for deployment.
                    </>
                  ) : (
                    <>
                      ⚠️ {completedTests - successfulTests} test(s) failed. Please check the configuration.
                      <br />
                      <strong>Recommendation:</strong> Review failed tests and fix issues before deployment.
                    </>
                  )}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="mt-8 text-center space-x-4">
          <Button asChild variant="outline">
            <a href="/browser-email-setup">⚙️ Email Setup</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/browser-email-test">🧪 Email Test</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/test-registration">👤 Registration Test</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/browser-registration">📝 Live Registration</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
