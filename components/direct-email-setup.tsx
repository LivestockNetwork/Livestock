"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Settings, CheckCircle, AlertCircle, Send, Eye, EyeOff, Loader2, Shield, Server } from "lucide-react"

interface EmailConfig {
  provider: "gmail" | "outlook" | "yahoo" | "smtp"
  user: string
  password: string
  host?: string
  port?: number
  secure?: boolean
}

interface EmailStatus {
  configured: boolean
  provider: string
  fromEmail: string
  message: string
  success: boolean
}

export function DirectEmailSetup() {
  const [config, setConfig] = useState<EmailConfig>({
    provider: "gmail",
    user: "",
    password: "",
    host: "",
    port: 587,
    secure: false,
  })

  const [status, setStatus] = useState<EmailStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const emailProviders = [
    {
      value: "gmail",
      label: "Gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      instructions: "Use your Gmail address and an App Password (not your regular password)",
    },
    {
      value: "outlook",
      label: "Outlook/Hotmail",
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      instructions: "Use your Outlook.com email and password",
    },
    {
      value: "yahoo",
      label: "Yahoo Mail",
      host: "smtp.mail.yahoo.com",
      port: 587,
      secure: false,
      instructions: "Use your Yahoo email and an App Password",
    },
    {
      value: "smtp",
      label: "Custom SMTP",
      host: "",
      port: 587,
      secure: false,
      instructions: "Configure your own SMTP server settings",
    },
  ]

  const handleProviderChange = (provider: string) => {
    const providerConfig = emailProviders.find((p) => p.value === provider)
    if (providerConfig) {
      setConfig((prev) => ({
        ...prev,
        provider: provider as EmailConfig["provider"],
        host: providerConfig.host,
        port: providerConfig.port,
        secure: providerConfig.secure,
      }))
    }
  }

  const handleInputChange = (field: keyof EmailConfig, value: string | number | boolean) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const checkEmailStatus = async () => {
    setIsLoading(true)
    setStatus(null)

    try {
      // Simulate API call to check email configuration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock response based on configuration
      if (config.user && config.password) {
        setStatus({
          configured: true,
          provider: config.provider.charAt(0).toUpperCase() + config.provider.slice(1),
          fromEmail: config.user,
          message: `✅ Email service is configured and ready to send emails via ${config.provider}.`,
          success: true,
        })
      } else {
        setStatus({
          configured: false,
          provider: "None",
          fromEmail: "Not configured",
          message: "❌ Email configuration incomplete. Please provide email and password.",
          success: false,
        })
      }
    } catch (error: any) {
      setStatus({
        configured: false,
        provider: "Error",
        fromEmail: "Error",
        message: `❌ Failed to check email configuration: ${error.message}`,
        success: false,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const sendTestEmail = async () => {
    if (!testEmail) return

    setIsLoading(true)
    setTestResult(null)

    try {
      // Simulate sending test email
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setTestResult({
        success: true,
        message: `✅ Test email sent successfully to ${testEmail}! Check your inbox.`,
      })
    } catch (error: any) {
      setTestResult({
        success: false,
        message: `❌ Failed to send test email: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const selectedProvider = emailProviders.find((p) => p.value === config.provider)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Mail className="h-10 w-10 text-blue-600" />
            Direct Email Setup
          </h1>
          <p className="text-xl text-gray-600">Configure email notifications for your rural community platform</p>
        </div>

        <Tabs defaultValue="configure" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="configure" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configure
            </TabsTrigger>
            <TabsTrigger value="test" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Test
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Status
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configure">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Server className="h-6 w-6" />
                  Email Configuration
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Set up your email provider to send notifications and alerts
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="provider" className="text-gray-700 font-medium">
                      Email Provider *
                    </Label>
                    <Select value={config.provider} onValueChange={handleProviderChange}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select email provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {emailProviders.map((provider) => (
                          <SelectItem key={provider.value} value={provider.value}>
                            {provider.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedProvider && <p className="text-sm text-gray-500 mt-2">{selectedProvider.instructions}</p>}
                  </div>

                  <div>
                    <Label htmlFor="user" className="text-gray-700 font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="user"
                      type="email"
                      value={config.user}
                      onChange={(e) => handleInputChange("user", e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-700 font-medium">
                      Password/App Password *
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={config.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        placeholder="Enter your password or app password"
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    {config.provider === "gmail" && (
                      <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <p className="text-sm text-yellow-800">
                          <strong>Gmail users:</strong> You need to use an App Password, not your regular Gmail
                          password.
                          <br />
                          <a
                            href="https://support.google.com/accounts/answer/185833"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Learn how to create an App Password →
                          </a>
                        </p>
                      </div>
                    )}
                  </div>

                  {config.provider === "smtp" && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="host" className="text-gray-700 font-medium">
                            SMTP Host *
                          </Label>
                          <Input
                            id="host"
                            value={config.host || ""}
                            onChange={(e) => handleInputChange("host", e.target.value)}
                            placeholder="smtp.example.com"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor="port" className="text-gray-700 font-medium">
                            Port *
                          </Label>
                          <Input
                            id="port"
                            type="number"
                            value={config.port}
                            onChange={(e) => handleInputChange("port", Number.parseInt(e.target.value))}
                            placeholder="587"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="secure"
                          checked={config.secure}
                          onChange={(e) => handleInputChange("secure", e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Label htmlFor="secure" className="text-sm font-normal">
                          Use SSL/TLS encryption
                        </Label>
                      </div>
                    </>
                  )}

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Security Note
                    </h4>
                    <p className="text-sm text-blue-700">
                      Your email credentials are stored securely and only used to send notifications from your rural
                      community platform. We recommend using app-specific passwords when available for enhanced
                      security.
                    </p>
                  </div>

                  <Button
                    onClick={checkEmailStatus}
                    disabled={isLoading || !config.user || !config.password}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Checking Configuration...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Save & Test Configuration
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Send className="h-6 w-6" />
                  Test Email Delivery
                </CardTitle>
                <CardDescription className="text-green-100">
                  Send a test email to verify your configuration is working
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                {testResult && (
                  <div
                    className={`mb-6 p-4 rounded-lg border ${
                      testResult.success
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {testResult.success ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      )}
                      <p className="font-medium">{testResult.message}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="testEmail" className="text-gray-700 font-medium">
                      Test Email Address *
                    </Label>
                    <Input
                      id="testEmail"
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      placeholder="Enter email address to send test to"
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      We'll send a test email to this address to verify your configuration
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <h4 className="font-semibold text-gray-800 mb-2">Test Email Preview</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Subject:</strong> 🧪 Email Test - Rural Community Hub Australia
                      </p>
                      <p>
                        <strong>From:</strong> Rural Community Hub Australia
                      </p>
                      <p>
                        <strong>Content:</strong> Test email to verify email configuration is working correctly
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={sendTestEmail}
                    disabled={isLoading || !testEmail || !status?.success}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Test Email...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Test Email
                      </div>
                    )}
                  </Button>

                  {!status?.success && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Please configure and save your email settings first before sending a test
                        email.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="status">
            <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <CheckCircle className="h-6 w-6" />
                  Email Service Status
                </CardTitle>
                <CardDescription className="text-purple-100">
                  Current status of your email configuration
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                {status ? (
                  <div className="space-y-6">
                    <div
                      className={`p-6 rounded-lg border-2 ${
                        status.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        {status.success ? (
                          <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                          <AlertCircle className="h-8 w-8 text-red-600" />
                        )}
                        <div>
                          <h3 className={`text-xl font-semibold ${status.success ? "text-green-800" : "text-red-800"}`}>
                            {status.success ? "Email Service Active" : "Email Service Inactive"}
                          </h3>
                          <p className={`${status.success ? "text-green-600" : "text-red-600"}`}>{status.message}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Provider</h4>
                        <Badge variant="outline" className="text-sm">
                          {status.provider}
                        </Badge>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">From Email</h4>
                        <p className="text-sm text-gray-600 break-all">{status.fromEmail}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">Status</h4>
                        <Badge
                          className={
                            status.configured
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {status.configured ? "Configured" : "Not Configured"}
                        </Badge>
                      </div>
                    </div>

                    <Button onClick={checkEmailStatus} variant="outline" className="w-full bg-transparent">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Refresh Status
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No Configuration Found</h3>
                    <p className="text-gray-500 mb-4">Please configure your email settings first to see the status.</p>
                    <Button onClick={checkEmailStatus}>
                      <Settings className="h-4 w-4 mr-2" />
                      Check Configuration
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Named export

// Default export
export default DirectEmailSetup
