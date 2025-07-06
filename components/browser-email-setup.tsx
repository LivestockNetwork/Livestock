"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface EmailCredentials {
  email: string
  password: string
}

export default function BrowserEmailSetup() {
  const [email, setEmail] = useState("patrick@bulahdelahclydesdales.com")
  const [password, setPassword] = useState("")
  const [isSetup, setIsSetup] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Check if credentials are already stored
    const stored = localStorage.getItem("gmail-credentials")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setEmail(parsed.email)
        setIsSetup(true)
        setMessage("Gmail credentials are already configured!")
      } catch (error) {
        console.error("Failed to parse stored credentials:", error)
      }
    }
  }, [])

  const handleSetup = async () => {
    if (!email || !password) {
      setMessage("Please enter both email and password")
      return
    }

    setIsLoading(true)
    setMessage("")

    try {
      // Store credentials in localStorage
      const credentials: EmailCredentials = { email, password }
      localStorage.setItem("gmail-credentials", JSON.stringify(credentials))

      setIsSetup(true)
      setMessage("✅ Gmail credentials saved successfully!")
      setPassword("") // Clear password from display
    } catch (error: any) {
      setMessage(`❌ Failed to save credentials: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    localStorage.removeItem("gmail-credentials")
    setIsSetup(false)
    setPassword("")
    setMessage("Gmail credentials cleared")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🔧 Gmail Setup - Browser Storage</CardTitle>
            <p className="text-center text-gray-600">Configure your Gmail credentials for sending emails</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">📋 How This Works:</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Your Gmail credentials are stored in your browser's localStorage</li>
                <li>• They persist across page refreshes and navigation</li>
                <li>• No server storage - eliminates restart issues</li>
                <li>• Credentials are sent with each email request</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gmail Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@gmail.com"
                  disabled={isSetup}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gmail App Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="16-character app password"
                  disabled={isSetup}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Generate this in your Google Account settings under "App passwords"
                </p>
              </div>

              {!isSetup ? (
                <Button
                  onClick={handleSetup}
                  disabled={isLoading || !email || !password}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? "💾 Saving..." : "💾 Save Gmail Credentials"}
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => (window.location.href = "/browser-email-test")}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    🧪 Test Email System
                  </Button>
                  <Button onClick={handleClear} variant="outline" className="w-full bg-transparent">
                    🗑️ Clear Credentials
                  </Button>
                </div>
              )}
            </div>

            {message && (
              <Alert className={message.includes("✅") ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <AlertDescription className={message.includes("✅") ? "text-green-800" : "text-red-800"}>
                  {message}
                </AlertDescription>
              </Alert>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">🔒 Security Note:</h4>
              <p className="text-yellow-800 text-sm">
                Your Gmail app password is stored locally in your browser and never sent to our servers for storage.
                It's only transmitted when sending emails and is not logged or saved on the server side.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
