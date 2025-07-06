"use client"

import { useState, useEffect } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendTestEmailAction, sendWelcomeEmailAction, registerUserWithEmail } from "@/app/actions/browser-email-actions"

interface EmailCredentials {
  email: string
  password: string
}

export default function BrowserEmailTestPage() {
  const [credentials, setCredentials] = useState<EmailCredentials | null>(null)
  const [testEmail, setTestEmail] = useState("patrick@bulahdelahclydesdales.com")
  const [testResults, setTestResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const [testState, testAction, testPending] = useActionState(sendTestEmailAction, null)
  const [welcomeState, welcomeAction, welcomePending] = useActionState(sendWelcomeEmailAction, null)
  const [registerState, registerAction, registerPending] = useActionState(registerUserWithEmail, null)

  useEffect(() => {
    // Load credentials from localStorage
    const stored = localStorage.getItem("gmail-credentials")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCredentials(parsed)
      } catch (error) {
        console.error("Failed to parse stored credentials:", error)
      }
    }
  }, [])

  const addResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setTestResults((prev) => [...prev, `${timestamp}: ${message}`])
  }

  const runCompleteTest = async () => {
    if (!credentials) {
      addResult("❌ No Gmail credentials found. Please setup first.")
      return
    }

    setIsRunning(true)
    setTestResults([])

    addResult("🚀 Starting comprehensive email system test...")
    addResult(`📧 Using Gmail: ${credentials.email}`)

    try {
      // Test 1: Send test email
      addResult("📤 Sending test email...")
      const testFormData = new FormData()
      testFormData.append("email", credentials.email)
      testFormData.append("password", credentials.password)
      testFormData.append("toEmail", testEmail)

      const testResult = await sendTestEmailAction(testFormData)
      if (testResult.success) {
        addResult(`✅ Test Email: ${testResult.message}`)
      } else {
        addResult(`❌ Test Email: ${testResult.message}`)
      }

      // Test 2: Send welcome email
      addResult("🎉 Sending welcome email...")
      const welcomeFormData = new FormData()
      welcomeFormData.append("email", credentials.email)
      welcomeFormData.append("password", credentials.password)
      welcomeFormData.append("toEmail", testEmail)
      welcomeFormData.append("firstName", "Test")
      welcomeFormData.append("lastName", "User")
      welcomeFormData.append("location", "Test Location, NSW")
      welcomeFormData.append("propertyType", "Test Farm")
      welcomeFormData.append("primaryInterest", "Testing")

      const welcomeResult = await sendWelcomeEmailAction(welcomeFormData)
      if (welcomeResult.success) {
        addResult(`✅ Welcome Email: ${welcomeResult.message}`)
      } else {
        addResult(`❌ Welcome Email: ${welcomeResult.message}`)
      }

      // Test 3: Full registration
      addResult("👤 Testing full registration...")
      const registerFormData = new FormData()
      registerFormData.append("email", credentials.email)
      registerFormData.append("password", credentials.password)
      registerFormData.append("userEmail", testEmail)
      registerFormData.append("firstName", "Test")
      registerFormData.append("lastName", "User")
      registerFormData.append("location", "Test Location, NSW")
      registerFormData.append("propertyType", "Test Farm")
      registerFormData.append("primaryInterest", "Testing")

      const registerResult = await registerUserWithEmail(registerFormData)
      if (registerResult.success) {
        addResult(`✅ Registration: ${registerResult.message}`)
      } else {
        addResult(`❌ Registration: ${registerResult.message}`)
      }

      addResult("🎯 Complete test finished!")
    } catch (error: any) {
      addResult(`💥 Test failed: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  if (!credentials) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">⚠️ Gmail Not Configured</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertDescription className="text-yellow-800">
                  <span className="font-medium">Gmail credentials not found.</span>
                  <br />
                  Please go to the setup page first to configure your Gmail credentials.
                </AlertDescription>
              </Alert>
              <div className="mt-4 text-center">
                <Button
                  onClick={() => (window.location.href = "/browser-email-setup")}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  🔧 Go to Gmail Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🧪 Browser Email System Test</CardTitle>
            <p className="text-center text-gray-600">Testing email system with browser-stored Gmail credentials</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Test Email Address</label>
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter email to receive test messages"
                />
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-green-800 text-sm">
                  <span className="font-medium">✅ Gmail Configured:</span> {credentials.email}
                </p>
              </div>

              <Button
                onClick={runCompleteTest}
                disabled={isRunning || !testEmail}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isRunning ? "🔄 Running Tests..." : "🚀 Run Complete Test"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div key={index} className="mb-1">
                    {result}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Individual Tests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={testAction} className="space-y-2">
              <input type="hidden" name="email" value={credentials.email} />
              <input type="hidden" name="password" value={credentials.password} />
              <input type="hidden" name="toEmail" value={testEmail} />
              <Button type="submit" disabled={testPending} className="w-full">
                {testPending ? "📤 Sending..." : "📧 Send Test Email"}
              </Button>
              {testState && (
                <Alert className={testState.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  <AlertDescription className={testState.success ? "text-green-800" : "text-red-800"}>
                    {testState.success ? "✅" : "❌"} {testState.message}
                  </AlertDescription>
                </Alert>
              )}
            </form>

            <form action={welcomeAction} className="space-y-2">
              <input type="hidden" name="email" value={credentials.email} />
              <input type="hidden" name="password" value={credentials.password} />
              <input type="hidden" name="toEmail" value={testEmail} />
              <input type="hidden" name="firstName" value="Test" />
              <input type="hidden" name="lastName" value="User" />
              <input type="hidden" name="location" value="Test Location" />
              <input type="hidden" name="propertyType" value="Test Farm" />
              <input type="hidden" name="primaryInterest" value="Testing" />
              <Button type="submit" disabled={welcomePending} className="w-full">
                {welcomePending ? "🎉 Sending..." : "🎉 Send Welcome Email"}
              </Button>
              {welcomeState && (
                <Alert className={welcomeState.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  <AlertDescription className={welcomeState.success ? "text-green-800" : "text-red-800"}>
                    {welcomeState.success ? "✅" : "❌"} {welcomeState.message}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
