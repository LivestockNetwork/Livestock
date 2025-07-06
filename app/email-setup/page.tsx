"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Mail, Loader2, AlertTriangle, Copy, ExternalLink } from "lucide-react"

export default function EmailSetupPage() {
  const [testEmail, setTestEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingStatus, setIsCheckingStatus] = useState(false)
  const [status, setStatus] = useState<any>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [copiedEnv, setCopiedEnv] = useState(false)

  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
    setIsCheckingStatus(true)
    try {
      const response = await fetch("/api/email/status")
      const result = await response.json()
      setStatus(result)
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

  const copyEnvTemplate = () => {
    const envTemplate = `GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-password`

    navigator.clipboard.writeText(envTemplate)
    setCopiedEnv(true)
    setTimeout(() => setCopiedEnv(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">📧 Email Setup</h1>
          <p className="text-xl text-gray-600">Set up professional emails for Rural Community Hub Australia</p>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Email Status
              <Button onClick={checkStatus} variant="outline" size="sm" disabled={isCheckingStatus}>
                {isCheckingStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : "Refresh"}
              </Button>
            </CardTitle>
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
                  <div className="space-y-2">
                    <p className={status.success ? "text-green-700 font-medium" : "text-red-700 font-medium"}>
                      {status.message}
                    </p>
                    {status.success && (
                      <div className="bg-white p-3 rounded border">
                        <p className="text-sm font-medium text-gray-700">Emails will appear as:</p>
                        <p className="text-sm font-mono text-gray-600">
                          "{status.fromName}" &lt;{status.fromEmail}&gt;
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Provider: {status.provider}</p>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Setup Instructions */}
        {(!status || !status.success) && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Gmail Setup */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-red-500" />
                  Gmail Setup (Recommended)
                </CardTitle>
                <CardDescription>Use your Gmail account to send professional emails</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Step 1: Enable 2-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">
                    Go to your Google Account settings and enable 2-factor authentication if not already enabled.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Google Security Settings
                    </a>
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Step 2: Generate App Password</h4>
                  <p className="text-sm text-gray-600">
                    Create a 16-character app password specifically for this application.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Generate App Password
                    </a>
                  </Button>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Step 3: Create .env.local file</h4>
                  <p className="text-sm text-gray-600">
                    In your project root folder, create a file called{" "}
                    <code className="bg-gray-100 px-1 rounded">.env.local</code>
                  </p>
                  <div className="relative">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div>GMAIL_USER=your-email@gmail.com</div>
                      <div>GMAIL_APP_PASSWORD=your-16-character-password</div>
                    </div>
                    <Button
                      onClick={copyEnvTemplate}
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-transparent"
                    >
                      {copiedEnv ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Alert className="border-amber-200 bg-amber-50">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    Replace the placeholder values with your actual Gmail address and the 16-character app password you
                    generated.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Alternative Options */}
            <Card>
              <CardHeader>
                <CardTitle>Alternative Email Providers</CardTitle>
                <CardDescription>Other supported email services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-500" />
                    Outlook/Hotmail
                  </h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs">
                    <div>OUTLOOK_USER=your-email@outlook.com</div>
                    <div>OUTLOOK_PASSWORD=your-password</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-purple-500" />
                    Yahoo Mail
                  </h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs">
                    <div>YAHOO_USER=your-email@yahoo.com</div>
                    <div>YAHOO_APP_PASSWORD=your-app-password</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Custom SMTP
                  </h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs">
                    <div>SMTP_HOST=smtp.yourprovider.com</div>
                    <div>SMTP_PORT=587</div>
                    <div>SMTP_USER=your-email@domain.com</div>
                    <div>SMTP_PASSWORD=your-password</div>
                    <div>SMTP_SECURE=false</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Restart Instructions */}
        {(!status || !status.success) && (
          <Card>
            <CardHeader>
              <CardTitle>Final Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Step 4: Restart your development server</h4>
                <p className="text-gray-600">
                  Stop your server (Ctrl+C) and restart it to load the new environment variables:
                </p>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">npm run dev</div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Step 5: Refresh this page</h4>
                <p className="text-gray-600">
                  After restarting your server, refresh this page to see the updated email status.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Refresh Page
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Email */}
        {status && status.success && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Test Your Email Setup
              </CardTitle>
              <CardDescription>Send a test welcome email to verify everything works perfectly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="Enter your email address to receive a test email"
                  className="flex-1"
                />
                <Button
                  onClick={sendTestEmail}
                  disabled={isLoading || !testEmail}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Send Test Email
                    </>
                  )}
                </Button>
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
                      {testResult.success && testResult.messageId && (
                        <p className="text-sm">Message ID: {testResult.messageId}</p>
                      )}
                      {testResult.error && <p className="text-sm">Error: {testResult.error}</p>}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">What happens when you send a test email?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• You'll receive a beautifully designed welcome email</li>
                  <li>• The email will showcase your Rural Community Hub Australia branding</li>
                  <li>• It includes all the key features and benefits of your platform</li>
                  <li>• The email is mobile-responsive and professional</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Message */}
        {status && status.success && testResult && testResult.success && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                <h3 className="text-2xl font-bold text-green-800">🎉 Email Setup Complete!</h3>
                <p className="text-green-700 text-lg">
                  Your Rural Community Hub Australia is now ready to send professional welcome emails to new members.
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">What's Next?</h4>
                  <ul className="text-sm text-green-700 space-y-1 text-left">
                    <li>✅ Welcome emails will be sent automatically to new members</li>
                    <li>✅ All emails will appear professional with your branding</li>
                    <li>✅ Members will receive emergency alerts and notifications</li>
                    <li>✅ Your community platform is ready for production use</li>
                  </ul>
                </div>
                <div className="pt-4 space-x-4">
                  <Button asChild className="bg-green-600 hover:bg-green-700">
                    <a href="/">Go to Homepage</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href="/onboarding">Test User Onboarding</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Development Mode Info */}
        {status && status.provider === "Development Mode" && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <AlertTriangle className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="text-xl font-bold text-blue-800">Development Mode Active</h3>
                <p className="text-blue-700">
                  No email credentials configured. Emails will be logged to your terminal console instead of being sent.
                </p>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    This is perfect for testing and development. When you're ready to send real emails, follow the setup
                    instructions above to configure Gmail or another email provider.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
