"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Mail, Settings, ExternalLink } from "lucide-react"

interface EmailStatus {
  success: boolean
  configured: boolean
  provider: string
  fromName: string
  fromEmail: string
  message: string
  needsSetup?: boolean
}

export function EmailIntegrationHelper() {
  const [status, setStatus] = useState<EmailStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkEmailStatus()
  }, [])

  const checkEmailStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/email/status")
      const result = await response.json()
      setStatus(result)
    } catch (error) {
      setStatus({
        success: false,
        configured: false,
        provider: "Error",
        fromName: "Rural Community Hub Australia",
        fromEmail: "Error checking status",
        message: "Failed to check email service status",
        needsSetup: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Mail className="h-8 w-8 mx-auto mb-2 animate-pulse" />
            <p>Checking email configuration...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Service Status
        </CardTitle>
        <CardDescription>Professional email integration for your rural community platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status && (
          <Alert className={status.success ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}>
            {status.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-amber-600" />
            )}
            <AlertDescription>
              <div className="space-y-2">
                <p className={status.success ? "text-green-700 font-medium" : "text-amber-700 font-medium"}>
                  {status.message}
                </p>
                {status.success && (
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm font-medium text-gray-700">Email Configuration:</p>
                    <p className="text-sm text-gray-600">Provider: {status.provider}</p>
                    <p className="text-sm text-gray-600">
                      From: "{status.fromName}" &lt;{status.fromEmail}&gt;
                    </p>
                  </div>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          <Button onClick={checkEmailStatus} variant="outline" size="sm">
            Refresh Status
          </Button>

          {status && !status.success && (
            <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
              <a href="/email-setup">
                <Settings className="h-4 w-4 mr-2" />
                Setup Email
              </a>
            </Button>
          )}

          {status && status.success && (
            <Button asChild variant="outline" size="sm">
              <a href="/email-setup">
                <ExternalLink className="h-4 w-4 mr-2" />
                Test & Manage
              </a>
            </Button>
          )}
        </div>

        {status && status.success && (
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">✅ Email Features Active</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Welcome emails for new members</li>
              <li>• Emergency alert notifications</li>
              <li>• Community updates and announcements</li>
              <li>• Password reset and security emails</li>
            </ul>
          </div>
        )}

        {status && status.needsSetup && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">📧 Setup Professional Emails</h4>
            <p className="text-sm text-blue-700 mb-3">
              Connect your Gmail, Outlook, or other email provider to send professional welcome emails and notifications
              to your rural community members.
            </p>
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <a href="/email-setup">
                <Mail className="h-4 w-4 mr-2" />
                Setup Email Now
              </a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
