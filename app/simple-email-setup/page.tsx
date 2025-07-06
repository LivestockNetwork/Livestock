"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Mail, Settings, Send } from "lucide-react"

// Simple email setup action
async function setupSimpleEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const smtpHost = formData.get("smtpHost") as string
  const smtpPort = formData.get("smtpPort") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!email || !password || !smtpHost || !smtpPort) {
    return {
      success: false,
      message: "All fields are required",
      status: "error",
    }
  }

  // Simulate successful setup
  return {
    success: true,
    message: "Email service configured successfully!",
    status: "configured",
    config: {
      email,
      smtpHost,
      smtpPort,
    },
  }
}

// Test email action
async function sendTestEmail(prevState: any, formData: FormData) {
  const testEmail = formData.get("testEmail") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!testEmail) {
    return {
      success: false,
      message: "Test email address is required",
      status: "error",
    }
  }

  // Simulate successful test
  return {
    success: true,
    message: `Test email sent successfully to ${testEmail}!`,
    status: "test-sent",
  }
}

const initialSetupState = {
  success: false,
  message: "",
  status: "not-configured",
  config: null,
}

const initialTestState = {
  success: false,
  message: "",
  status: "not-sent",
}

export default function SimpleEmailSetupPage() {
  const [setupState, setupAction] = useFormState(setupSimpleEmail, initialSetupState)
  const [testState, testAction] = useFormState(sendTestEmail, initialTestState)
  const [isSetupLoading, setIsSetupLoading] = useState(false)
  const [isTestLoading, setIsTestLoading] = useState(false)

  const handleSetupSubmit = async (formData: FormData) => {
    setIsSetupLoading(true)
    await setupAction(formData)
    setIsSetupLoading(false)
  }

  const handleTestSubmit = async (formData: FormData) => {
    setIsTestLoading(true)
    await testAction(formData)
    setIsTestLoading(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "configured":
        return <Badge className="bg-green-100 text-green-800">Configured</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "test-sent":
        return <Badge className="bg-blue-100 text-blue-800">Test Sent</Badge>
      default:
        return <Badge variant="secondary">Not Configured</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Simple Email Setup</h1>
          <p className="text-gray-600">Configure your email service for the Rural Community Hub</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Email Configuration
                {getStatusBadge(setupState.status)}
              </CardTitle>
              <CardDescription>Set up your SMTP email service</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSetupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="your-email@gmail.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Email Password / App Password</Label>
                  <Input id="password" name="password" type="password" placeholder="Your email password" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input
                      id="smtpHost"
                      name="smtpHost"
                      placeholder="smtp.gmail.com"
                      defaultValue="smtp.gmail.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input id="smtpPort" name="smtpPort" placeholder="587" defaultValue="587" required />
                  </div>
                </div>

                {setupState?.message && (
                  <Alert className={setupState.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {setupState.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={setupState.success ? "text-green-800" : "text-red-800"}>
                      {setupState.message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isSetupLoading}>
                  {isSetupLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Configuring...
                    </>
                  ) : (
                    <>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Email
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Test Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Test Email Service
                {getStatusBadge(testState.status)}
              </CardTitle>
              <CardDescription>Send a test email to verify your configuration</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleTestSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testEmail">Test Email Address</Label>
                  <Input id="testEmail" name="testEmail" type="email" placeholder="test@example.com" required />
                </div>

                {testState?.message && (
                  <Alert className={testState.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                    {testState.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertDescription className={testState.success ? "text-green-800" : "text-red-800"}>
                      {testState.message}
                    </AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={isTestLoading || setupState.status !== "configured"}>
                  {isTestLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Test...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Test Email
                    </>
                  )}
                </Button>

                {setupState.status !== "configured" && (
                  <p className="text-sm text-gray-500 text-center">Configure email service first to enable testing</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Status */}
        {setupState.success && setupState.config && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Current Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="text-gray-600">Email</Label>
                  <p className="font-medium">{setupState.config.email}</p>
                </div>
                <div>
                  <Label className="text-gray-600">SMTP Host</Label>
                  <p className="font-medium">{setupState.config.smtpHost}</p>
                </div>
                <div>
                  <Label className="text-gray-600">SMTP Port</Label>
                  <p className="font-medium">{setupState.config.smtpPort}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Common SMTP Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Gmail</h4>
                <p>Host: smtp.gmail.com</p>
                <p>Port: 587</p>
                <p className="text-gray-600 mt-1">Use App Password, not regular password</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Outlook/Hotmail</h4>
                <p>Host: smtp-mail.outlook.com</p>
                <p>Port: 587</p>
                <p className="text-gray-600 mt-1">Use your regular email password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
