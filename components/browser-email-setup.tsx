"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Mail, Settings, Eye, EyeOff } from "lucide-react"

// Mock setup action for browser email
async function setupBrowserEmail(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!email || !password) {
    return {
      success: false,
      message: "Please provide both email and password",
    }
  }

  if (!email.includes("@gmail.com")) {
    return {
      success: false,
      message: "Please use a Gmail address",
    }
  }

  if (password.length < 16) {
    return {
      success: false,
      message: "Gmail app password should be 16 characters",
    }
  }

  // Store credentials in localStorage for browser use
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "gmail-credentials",
      JSON.stringify({
        email,
        password,
        configuredAt: new Date().toISOString(),
      }),
    )
  }

  return {
    success: true,
    message: "Gmail credentials saved successfully! You can now send emails.",
    email,
  }
}

const initialState = {
  success: false,
  message: "",
  email: null,
}

export default function BrowserEmailSetup() {
  const [state, formAction] = useFormState(setupBrowserEmail, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState<any>(null)

  // Check for existing credentials on component mount
  useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gmail-credentials")
      if (stored) {
        try {
          setStoredCredentials(JSON.parse(stored))
        } catch (error) {
          console.error("Failed to parse stored credentials:", error)
        }
      }
    }
  })

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    await formAction(formData)
    setIsLoading(false)

    // Refresh stored credentials after successful setup
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("gmail-credentials")
      if (stored) {
        try {
          setStoredCredentials(JSON.parse(stored))
        } catch (error) {
          console.error("Failed to parse stored credentials:", error)
        }
      }
    }
  }

  const clearCredentials = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("gmail-credentials")
      setStoredCredentials(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gmail Setup for Browser
            {storedCredentials && <Badge className="bg-green-100 text-green-800">Configured</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          {storedCredentials && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <div className="flex items-center justify-between">
                  <div>
                    <strong>Gmail Configured:</strong> {storedCredentials.email}
                    <br />
                    <span className="text-xs">
                      Configured: {new Date(storedCredentials.configuredAt).toLocaleString()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={clearCredentials}>
                    Clear
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Setup Form */}
          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Gmail Address</label>
              <Input
                name="email"
                type="email"
                placeholder="your.email@gmail.com"
                required
                defaultValue={storedCredentials?.email || "patrick@bulahdelahclydesdales.com"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gmail App Password</label>
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="16-character app password (no spaces)"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Configuring Gmail...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Configure Gmail
                </>
              )}
            </Button>

            {state?.message && (
              <Alert className={state.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                {state.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={state.success ? "text-green-800" : "text-red-800"}>
                  {state.message}
                </AlertDescription>
              </Alert>
            )}
          </form>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-2">📋 Setup Instructions:</h4>
            <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
              <li>Enable 2-factor authentication on your Gmail account</li>
              <li>Go to Google Account settings → Security → App passwords</li>
              <li>Generate a new app password for "Mail"</li>
              <li>Copy the 16-character password (no spaces)</li>
              <li>Paste it in the field above and click Configure</li>
            </ol>
          </div>

          {/* Next Steps */}
          {state.success && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800 mb-2">✅ Next Steps:</h4>
              <div className="space-y-2">
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <a href="/browser-email-test">🧪 Test Email Sending</a>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <a href="/browser-registration">👤 Try Registration Form</a>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
