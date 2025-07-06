"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResendSetupPage() {
  const [apiKey, setApiKey] = useState("")
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
      const response = await fetch("/api/resend/status")
      const data = await response.json()
      setStatus(data)
      setIsConfigured(data.configured)
      addResult(data.message)
    } catch (error: any) {
      addResult(`Status check failed: ${error.message}`)
    }
  }

  const setupResend = async () => {
    if (!apiKey) {
      addResult("❌ Please enter your Resend API key")
      return
    }

    if (!apiKey.startsWith("re_")) {
      addResult("❌ Invalid API key format (should start with 're_')")
      return
    }

    try {
      addResult("🔧 Setting up Resend...")
      const response = await fetch("/api/resend/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)

      if (data.success) {
        setIsConfigured(true)
        setApiKey("") // Clear API key from display
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
      addResult("📤 Sending test email via Resend...")
      const response = await fetch("/api/resend/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: testEmail }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)
      if (data.messageId) {
        addResult(`📧 Message ID: ${data.messageId}`)
      }
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
      addResult("🎉 Sending welcome email via Resend...")
      const response = await fetch("/api/resend/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toEmail: testEmail, firstName }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)
      if (data.messageId) {
        addResult(`📧 Message ID: ${data.messageId}`)
      }
    } catch (error: any) {
      addResult(`❌ Welcome email failed: ${error.message}`)
    }
  }

  const sendEmergencyAlert = async () => {
    if (!testEmail) {
      addResult("❌ Please enter test email address")
      return
    }

    try {
      addResult("🚨 Sending emergency alert via Resend...")
      const response = await fetch("/api/resend/emergency", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: [testEmail],
          alert: {
            title: "Test Emergency Alert",
            message:
              "This is a test emergency alert to verify the system is working correctly. In a real emergency, this would contain critical safety information.",
            severity: "high",
            location: "Test Location, NSW",
          },
        }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)
      if (data.messageId) {
        addResult(`📧 Message ID: ${data.messageId}`)
      }
    } catch (error: any) {
      addResult(`❌ Emergency alert failed: ${error.message}`)
    }
  }

  const sendDigest = async () => {
    if (!testEmail || !firstName) {
      addResult("❌ Please enter email and first name")
      return
    }

    try {
      addResult("📊 Sending community digest via Resend...")
      const response = await fetch("/api/resend/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { email: testEmail, firstName },
          digest: {
            newPosts: 12,
            helpRequests: 3,
            equipmentShares: 7,
            weatherAlerts: 2,
          },
        }),
      })

      const data = await response.json()
      addResult(data.success ? `✅ ${data.message}` : `❌ ${data.message}`)
      if (data.messageId) {
        addResult(`📧 Message ID: ${data.messageId}`)
      }
    } catch (error: any) {
      addResult(`❌ Digest failed: ${error.message}`)
    }
  }

  const runAllTests = async () => {
    setResults([])
    addResult("🚀 Starting complete Resend email test...")

    await checkStatus()

    if (isConfigured) {
      await sendTestEmail()
      await sendWelcomeEmail()
      await sendEmergencyAlert()
      await sendDigest()
      addResult("🎯 All tests completed!")
    } else {
      addResult("❌ Resend not configured - please setup first")
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
            <CardTitle className="text-2xl text-center">📧 Resend Email Setup</CardTitle>
            <p className="text-center text-gray-600">Simple, reliable email service - 3,000 emails/month FREE</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Status */}
            {status && (
              <Alert className={isConfigured ? "border-green-200 bg-green-50" : "border-yellow-200 bg-yellow-50"}>
                <AlertDescription className={isConfigured ? "text-green-800" : "text-yellow-800"}>
                  <strong>{isConfigured ? "✅ Configured:" : "⚠️ Not Configured:"}</strong> {status.message}
                  <br />
                  <strong>Provider:</strong> {status.provider} | <strong>Limits:</strong> {status.limits}
                </AlertDescription>
              </Alert>
            )}

            {/* Setup Section */}
            {!isConfigured && (
              <div className="space-y-4 p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium">🔧 Resend Setup</h3>
                <div>
                  <label className="block text-sm font-medium mb-1">Resend API Key</label>
                  <Input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="re_xxxxxxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Get your free API key at{" "}
                    <a
                      href="https://resend.com"
                      target="_blank"
                      className="text-blue-600 hover:underline"
                      rel="noreferrer"
                    >
                      resend.com
                    </a>
                  </p>
                </div>
                <Button onClick={setupResend} className="w-full bg-green-600 hover:bg-green-700">
                  🔧 Setup Resend Now
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

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <Button onClick={sendTestEmail} disabled={!isConfigured} className="bg-blue-600 hover:bg-blue-700">
                  📤 Test
                </Button>
                <Button
                  onClick={sendWelcomeEmail}
                  disabled={!isConfigured}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  🎉 Welcome
                </Button>
                <Button onClick={sendEmergencyAlert} disabled={!isConfigured} className="bg-red-600 hover:bg-red-700">
                  🚨 Alert
                </Button>
                <Button onClick={sendDigest} disabled={!isConfigured} className="bg-indigo-600 hover:bg-indigo-700">
                  📊 Digest
                </Button>
                <Button onClick={runAllTests} disabled={!isConfigured} className="bg-orange-600 hover:bg-orange-700">
                  🚀 All Tests
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
            <CardTitle>📋 How to Get Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                <h4 className="font-medium text-blue-900">Step 1: Get Free Resend Account</h4>
                <ol className="list-decimal list-inside text-blue-800 mt-2 space-y-1">
                  <li>
                    Go to{" "}
                    <a href="https://resend.com" target="_blank" className="underline" rel="noreferrer">
                      resend.com
                    </a>
                  </li>
                  <li>Sign up for free (no credit card required)</li>
                  <li>Go to API Keys section</li>
                  <li>Create a new API key</li>
                  <li>Copy the API key (starts with "re_")</li>
                </ol>
              </div>

              <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <h4 className="font-medium text-green-900">Step 2: Setup & Test</h4>
                <ol className="list-decimal list-inside text-green-800 mt-2 space-y-1">
                  <li>Paste your Resend API key above</li>
                  <li>Click "Setup Resend Now"</li>
                  <li>Enter your test email address</li>
                  <li>Click "All Tests" to test everything</li>
                </ol>
              </div>

              <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                <h4 className="font-medium text-purple-900">Free Limits</h4>
                <ul className="list-disc list-inside text-purple-800 mt-2 space-y-1">
                  <li>✅ 3,000 emails per month</li>
                  <li>✅ 100 emails per day</li>
                  <li>✅ No time limit - free forever</li>
                  <li>✅ Professional email delivery</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
