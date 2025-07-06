"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SimpleEmailPage() {
  const [email, setEmail] = useState("patrick@bulahdelahclydesdales.com")
  const [password, setPassword] = useState("")
  const [testEmail, setTestEmail] = useState("patrick@bulahdelahclydesdales.com")
  const [firstName, setFirstName] = useState("Patrick")
  const [status, setStatus] = useState<any>(null)
  const [results, setResults] = useState<string[]>([])
  const [isConfigured, setIsConfigured] = useState(false)

  const addResult = (message: string) => {
    const time = new Date().toLocaleTimeString()
    setResults((prev) => [...prev, `${time}: ${message}`])
  }

  const checkStatus = async () => {
    try {
      const response = await fetch("/api/email/status")
      const data = await response.json()
      setStatus(data)
      setIsConfigured(data.configured)
      addResult(data.message)
    } catch (error: any) {
      addResult(`Status check failed: ${error.message}`)
    }
  }

  const setupEmail = async () => {
    if (!email || !password) {
      addResult("❌ Please enter email and password")
      return
    }

    try {
      addResult("🔧 Setting up email...")
      const response = await fetch("/api/email/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)

      if (data.success) {
        setIsConfigured(true)
        setPassword("") // Clear password from display
      }
    } catch (error: any) {
      addResult(`❌ Setup failed: ${error.message}`)
    }
  }

  const sendTestEmail = async () => {
    if (!testEmail) {
      addResult("❌ Please enter test email address")
      return
    }

    try {
      addResult("📤 Sending test email...")
      const response = await fetch("/api/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: testEmail }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)
    } catch (error: any) {
      addResult(`❌ Test failed: ${error.message}`)
    }
  }

  const sendWelcomeEmail = async () => {
    if (!testEmail || !firstName) {
      addResult("❌ Please enter email and first name")
      return
    }

    try {
      addResult("🎉 Sending welcome email...")
      const response = await fetch("/api/email/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: testEmail, firstName }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)
    } catch (error: any) {
      addResult(`❌ Welcome email failed: ${error.message}`)
    }
  }

  const runAllTests = async () => {
    setResults([])
    addResult("🚀 Starting complete email test...")

    await checkStatus()

    if (isConfigured) {
      await sendTestEmail()
      await sendWelcomeEmail()
      addResult("🎯 All tests completed!")
    } else {
      addResult("❌ Email not configured - please setup first")
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">📧 Simple Email System</CardTitle>
            <p className="text-center text-gray-600">Dead simple, reliable email setup</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status */}
            {status && (
              <Alert className={isConfigured ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
                <AlertDescription className={isConfigured ? "text-green-800" : "text-yellow-800"}>
                  <strong>{isConfigured ? "✅ Configured:" : "⚠️ Not Configured:"}</strong> {status.message}
                  {isConfigured && status.email && (
                    <>
                      <br />
                      Using: {status.email}
                    </>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Setup Section */}
            {!isConfigured && (
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium">🔧 Email Setup</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Gmail Address</label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Gmail App Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="16-character app password"
                    />
                  </div>
                </div>
                <Button onClick={setupEmail} className="w-full bg-green-600 hover:bg-green-700">
                  🔧 Setup Email Now
                </Button>
              </div>
            )}

            {/* Test Section */}
            <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium">🧪 Email Testing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Test Email Address</label>
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="recipient@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Button onClick={sendTestEmail} disabled={!isConfigured} className="bg-blue-600 hover:bg-blue-700">
                  📤 Test Email
                </Button>
                <Button
                  onClick={sendWelcomeEmail}
                  disabled={!isConfigured}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  🎉 Welcome Email
                </Button>
                <Button onClick={runAllTests} disabled={!isConfigured} className="bg-orange-600 hover:bg-orange-700">
                  🚀 Run All Tests
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>📋 Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index} className="mb-1">
                    {result}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <h4 className="font-medium text-blue-900">Step 1: Get Gmail App Password</h4>
                <ol className="list-decimal list-inside text-blue-800 mt-2 space-y-1">
                  <li>Enable 2-factor authentication on Gmail</li>
                  <li>Go to Google Account → Security → App passwords</li>
                  <li>Generate password for "Mail"</li>
                  <li>Copy the 16-character password</li>
                </ol>
              </div>

              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <h4 className="font-medium text-green-900">Step 2: Setup & Test</h4>
                <ol className="list-decimal list-inside text-green-800 mt-2 space-y-1">
                  <li>Enter your Gmail and app password above</li>
                  <li>Click "Setup Email Now"</li>
                  <li>Enter test email address</li>
                  <li>Click "Run All Tests"</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
