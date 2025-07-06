"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Mail, Copy, Loader2, AlertTriangle, ExternalLink, RefreshCw } from "lucide-react"

export default function GmailSetupPage() {
  const [testEmail, setTestEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)
  const [status, setStatus] = useState<any>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [showInstructions, setShowInstructions] = useState(true)

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    setIsCheckingStatus(true)
    try {
      const response = await fetch("/api/email/status")
      const result = await response.json()
      setStatus(result)
      if (result.success) {
        setShowInstructions(false)
      }
    } catch (error) {
      setStatus({ success: false, message: "Failed to check status" })
    } finally {
      setIsCheckingStatus(false)
    }
  }

  const sendTestEmail = async () => {
    if (!testEmail) return

    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch("/api/email/direct-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail, testType: "welcome" }),
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({ success: false, message: "Failed to send test email" })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📧 Gmail Setup for Rural Community Hub Australia</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect your Gmail account to send professional welcome emails and emergency alerts to your rural community
          </p>
        </div>

        {/* Current Status */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Email Status</span>
              <Button onClick={checkStatus} variant="outline" size="sm" disabled={isCheckingStatus}>
                {isCheckingStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              </Button>
            </CardTitle>
            <CardDescription>Check if your Gmail connection is working</CardDescription>
          </CardHeader>
          <CardContent>
            {status && (
              <Alert className={status.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                {status.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription>
                  <div className="space-y-3">
                    <p className={status.success ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
                      {status.message}
                    </p>
                    {status.success && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Provider: {status.provider}</Badge>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            ✅ Ready to Send Emails
                          </Badge>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm font-medium text-gray-700">Your emails will appear as:</p>
                          <p className="text-sm font-mono text-gray-600 mt-1">
                            "{status.fromName}" &lt;{status.fromEmail}&gt;
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Setup Instructions - Only show if not configured */}
        {showInstructions && (
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">📋 Setup Instructions</CardTitle>
              <CardDescription>Follow these steps to connect your Gmail account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold">Create .env.local File</h3>
                </div>

                <div className="ml-11 space-y-4">
                  <p className="text-gray-700">
                    In your project root folder (same level as package.json), create a file called{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded font-mono">.env.local</code>
                  </p>

                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400"># Add these two lines to .env.local</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(`GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-password`)
                        }
                        className="text-green-400 hover:text-green-300"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>GMAIL_USER=your-email@gmail.com</div>
                    <div>GMAIL_APP_PASSWORD=your-16-character-password</div>
                  </div>

                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="text-amber-800">
                      <strong>Replace the placeholder text:</strong>
                      <ul className="mt-2 space-y-1">
                        <li>• "your-email@gmail.com" → Your actual Gmail address</li>
                        <li>• "your-16-character-password" → The App Password you created</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold">Restart Your Server</h3>
                </div>

                <div className="ml-11 space-y-4">
                  <p className="text-gray-700">After saving the .env.local file, restart your development server:</p>

                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    <div className="text-gray-400 mb-1"># In your terminal, press Ctrl+C to stop</div>
                    <div className="text-gray-400 mb-2"># Then restart with:</div>
                    <div className="text-yellow-400">npm run dev</div>
                  </div>

                  <p className="text-sm text-gray-600">
                    The server needs to restart to load your new environment variables.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold">Refresh This Page</h3>
                </div>

                <div className="ml-11">
                  <p className="text-gray-700">
                    After restarting your server, refresh this page. The status above should show as "Ready to Send
                    Emails" with a green checkmark.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Email Section - Only show if configured */}
        {status && status.success && (
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Test Your Email Setup
              </CardTitle>
              <CardDescription>Send a test welcome email to see exactly what your users will receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="testEmail" className="text-sm font-medium">
                    Enter your email address:
                  </Label>
                  <Input
                    id="testEmail"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="your-email@gmail.com"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={sendTestEmail}
                    disabled={isLoading || !testEmail}
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Test Welcome Email
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {testResult && (
                <Alert className={testResult.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  {testResult.success ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                  <AlertDescription className={testResult.success ? "text-green-700" : "text-red-700"}>
                    <div className="space-y-2">
                      <p className="font-medium">{testResult.message}</p>
                      {testResult.success && (
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm font-medium text-gray-700">Check your inbox for:</p>
                          <p className="text-sm text-gray-600">
                            Subject: 🇦🇺 Welcome to Rural Community Hub Australia, Test!
                          </p>
                          <p className="text-sm text-gray-600">From: {testResult.fromDisplay}</p>
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* What You Get */}
        <Card>
          <CardHeader>
            <CardTitle>🎉 What You'll Get</CardTitle>
            <CardDescription>Professional email system for your rural community platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-green-700">Professional Emails</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>From: "Rural Community Hub Australia"</li>
                  <li>Beautiful HTML welcome emails</li>
                  <li>Emergency alert system</li>
                  <li>Australian rural branding</li>
                </ul>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-blue-700">Zero Monthly Cost</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>No API fees or subscriptions</li>
                  <li>Uses your Gmail account</li>
                  <li>Reliable Gmail infrastructure</li>
                  <li>Excellent deliverability</li>
                </ul>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <ExternalLink className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-purple-700">Ready to Launch</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Complete user onboarding</li>
                  <li>Community features ready</li>
                  <li>Emergency system active</li>
                  <li>Invite your first users</li>
                </ul>
              </div>
            </div>

            {status && status.success && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200">
                <h4 className="font-bold text-gray-800 mb-3 text-center">🚀 Your Rural Community Hub is Ready!</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Next Steps:</h5>
                    <ol className="space-y-1 text-gray-600">
                      <li>1. Go to your homepage and complete onboarding</li>
                      <li>2. Receive your welcome email as the first user</li>
                      <li>3. Test community features and emergency alerts</li>
                      <li>4. Invite friends and neighbors to join</li>
                    </ol>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">Features Ready:</h5>
                    <ul className="space-y-1 text-gray-600">
                      <li>✅ User onboarding with welcome emails</li>
                      <li>✅ Community posts and messaging</li>
                      <li>✅ Emergency alert system</li>
                      <li>✅ Member directory and profiles</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
