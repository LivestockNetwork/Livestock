"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Mail, Key, Globe, TestTube } from "lucide-react"

export function EmailSetupHelper() {
  const [testEmail, setTestEmail] = useState("")
  const [testStatus, setTestStatus] = useState<{
    status: "idle" | "sending" | "success" | "error"
    message: string
  }>({ status: "idle", message: "" })

  const [apiKeyStatus, setApiKeyStatus] = useState<{
    resend: boolean
    sendgrid: boolean
    mock: boolean
  }>({
    resend: false,
    sendgrid: false,
    mock: true,
  })

  const checkApiKeys = async () => {
    try {
      const response = await fetch("/api/email/status")
      const data = await response.json()
      setApiKeyStatus(data)
    } catch (error) {
      console.error("Failed to check API keys:", error)
    }
  }

  const sendTestEmail = async () => {
    if (!testEmail) return

    setTestStatus({ status: "sending", message: "Sending test email..." })

    try {
      const response = await fetch("/api/email/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      })

      const result = await response.json()

      if (result.success) {
        setTestStatus({
          status: "success",
          message: `✅ Test email sent successfully! ${result.provider ? `(via ${result.provider})` : ""}`,
        })
      } else {
        setTestStatus({
          status: "error",
          message: `❌ Failed to send email: ${result.error}`,
        })
      }
    } catch (error) {
      setTestStatus({
        status: "error",
        message: "❌ Network error. Check your connection and try again.",
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Service Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="status" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="status">Status</TabsTrigger>
              <TabsTrigger value="resend">Resend Setup</TabsTrigger>
              <TabsTrigger value="sendgrid">SendGrid Setup</TabsTrigger>
              <TabsTrigger value="test">Test Email</TabsTrigger>
            </TabsList>

            <TabsContent value="status" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Current Email Service Status</h3>
                <Button onClick={checkApiKeys} variant="outline" size="sm">
                  Refresh Status
                </Button>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4" />
                    <span>Resend API Key</span>
                  </div>
                  <Badge variant={apiKeyStatus.resend ? "default" : "secondary"}>
                    {apiKeyStatus.resend ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Configured
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Not Set
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Key className="h-4 w-4" />
                    <span>SendGrid API Key</span>
                  </div>
                  <Badge variant={apiKeyStatus.sendgrid ? "default" : "secondary"}>
                    {apiKeyStatus.sendgrid ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Configured
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Not Set
                      </>
                    )}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <TestTube className="h-4 w-4" />
                    <span>Development Mode</span>
                  </div>
                  <Badge variant={apiKeyStatus.mock ? "outline" : "secondary"}>
                    {apiKeyStatus.mock ? "Active (Console Logging)" : "Disabled"}
                  </Badge>
                </div>
              </div>

              {!apiKeyStatus.resend && !apiKeyStatus.sendgrid && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    No email API keys configured. Emails will be logged to console in development mode. Set up Resend or
                    SendGrid for production email delivery.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="resend" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Resend Setup (Recommended)
                </h3>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Why Resend?</h4>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Built specifically for developers</li>
                    <li>• Excellent deliverability rates</li>
                    <li>• Simple API and great documentation</li>
                    <li>• 3,000 free emails per month</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      1
                    </span>
                    <span>Go to resend.com and create an account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      2
                    </span>
                    <span>Navigate to "API Keys" in your dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      3
                    </span>
                    <span>Click "Create API Key" and name it "Rural Community Hub"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      4
                    </span>
                    <span>Copy the API key (starts with "re_")</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      5
                    </span>
                    <span>Add to your .env.local file:</span>
                  </div>
                </div>

                <div className="bg-slate-100 p-3 rounded-lg font-mono text-sm">RESEND_API_KEY=re_your_api_key_here</div>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Once you add the API key, restart your development server and test the email functionality below.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="sendgrid" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  SendGrid Setup (Alternative)
                </h3>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900">SendGrid Benefits</h4>
                  <ul className="text-sm text-green-800 mt-2 space-y-1">
                    <li>• Established email service provider</li>
                    <li>• Advanced analytics and reporting</li>
                    <li>• 100 free emails per day</li>
                    <li>• Good for high-volume sending</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      1
                    </span>
                    <span>Go to sendgrid.com and create a free account</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      2
                    </span>
                    <span>Complete account verification process</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      3
                    </span>
                    <span>Go to Settings → API Keys</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      4
                    </span>
                    <span>Create API Key with "Mail Send" permissions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      5
                    </span>
                    <span>Copy the API key (starts with "SG.")</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      6
                    </span>
                    <span>Add to your .env.local file:</span>
                  </div>
                </div>

                <div className="bg-slate-100 p-3 rounded-lg font-mono text-sm">
                  SENDGRID_API_KEY=SG.your_api_key_here
                </div>
              </div>
            </TabsContent>

            <TabsContent value="test" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Test Email Functionality</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testEmail">Test Email Address</Label>
                    <Input
                      id="testEmail"
                      type="email"
                      placeholder="Enter your email to receive a test welcome email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={sendTestEmail}
                    disabled={!testEmail || testStatus.status === "sending"}
                    className="w-full"
                  >
                    {testStatus.status === "sending" ? "Sending..." : "Send Test Welcome Email"}
                  </Button>

                  {testStatus.message && (
                    <Alert className={testStatus.status === "error" ? "border-red-200 bg-red-50" : ""}>
                      <AlertDescription>{testStatus.message}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-900">Development Mode</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    If no API keys are configured, emails will be logged to your browser console and server terminal.
                    This is perfect for development and testing without needing real email services.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
