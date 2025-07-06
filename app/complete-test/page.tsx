"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CompleteTestPage() {
  const [testResults, setTestResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setTestResults((prev) => [...prev, `${timestamp}: ${message}`])
  }

  const runCompleteTest = async () => {
    setIsRunning(true)
    setTestResults([])

    addResult("🚀 Starting comprehensive email system test...")

    try {
      // Test 1: Check Gmail configuration status
      addResult("📧 Checking Gmail configuration...")
      const statusResponse = await fetch("/api/email/simple-status")
      const statusData = await statusResponse.json()

      if (statusData.configured) {
        addResult(`✅ Gmail Status: ${statusData.message}`)
        addResult(`📧 Using email: ${statusData.email}`)
      } else {
        addResult(`❌ Gmail Status: ${statusData.message}`)
        addResult("🔧 Please go to /simple-email-setup to configure Gmail first")
        setIsRunning(false)
        return
      }

      // Test 2: Send test email
      addResult("📤 Sending test email...")
      const testResponse = await fetch("/api/email/simple-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "patrick@bulahdelahclydesdales.com" }),
      })
      const testData = await testResponse.json()

      if (testData.success) {
        addResult(`✅ Test Email: ${testData.message}`)
      } else {
        addResult(`❌ Test Email: ${testData.message}`)
      }

      // Test 3: Test registration flow
      addResult("👤 Testing registration flow...")
      const formData = new FormData()
      formData.append("firstName", "Test")
      formData.append("lastName", "User")
      formData.append("email", "patrick@bulahdelahclydesdales.com")
      formData.append("location", "Test Location, NSW")
      formData.append("propertyType", "Test Cattle Station")
      formData.append("primaryInterest", "Testing System")

      // Import and call the server action
      const { registerUser } = await import("@/app/actions/user-onboarding-simple")
      const registrationResult = await registerUser(formData)

      if (registrationResult.success) {
        addResult(`✅ Registration: ${registrationResult.message}`)
      } else {
        addResult(`❌ Registration: ${registrationResult.message}`)
      }

      addResult("🎉 Complete test finished!")
    } catch (error: any) {
      addResult(`❌ Test Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🧪 Complete Email System Test</CardTitle>
            <p className="text-center text-gray-600">
              Comprehensive testing of Gmail integration and user registration
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Button
                onClick={runCompleteTest}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
              >
                {isRunning ? "🔄 Running Tests..." : "🚀 Run Complete Test"}
              </Button>
            </div>

            {testResults.length > 0 && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                <h3 className="text-white mb-2">Test Results:</h3>
                {testResults.map((result, index) => (
                  <div key={index} className="mb-1">
                    {result}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">🔍 What This Test Does:</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Checks if Gmail is properly configured</li>
                <li>• Sends a test email to verify SMTP connection</li>
                <li>• Tests the complete user registration flow</li>
                <li>• Verifies welcome email delivery</li>
                <li>• Reports any errors or issues found</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
