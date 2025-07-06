"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimpleEmailSetupPage() {
  const [email, setEmail] = useState("patrick@bulahdelahclydesdales.com")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleSetup = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/email/simple-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      setResult({
        success: false,
        message: `Setup failed: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">📧 Gmail Setup</CardTitle>
            <p className="text-center text-gray-600">Configure Gmail for sending emails</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Gmail Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Gmail App Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="16-character app password (no spaces)"
                />
              </div>

              <Button onClick={handleSetup} disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700">
                {isLoading ? "🔄 Setting up..." : "📧 Setup Gmail Now"}
              </Button>

              {result && (
                <div
                  className={`p-4 rounded-lg ${
                    result.success
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  <p className="font-medium">{result.success ? "✅ Success!" : "❌ Error"}</p>
                  <p>{result.message}</p>
                  {result.success && (
                    <div className="mt-3">
                      <Button
                        onClick={() => (window.location.href = "/complete-test")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        🚀 Run Complete Test
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">📋 Setup Instructions:</h4>
              <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
                <li>Enable 2-factor authentication on your Gmail account</li>
                <li>Go to Google Account settings → Security → App passwords</li>
                <li>Generate a new app password for "Mail"</li>
                <li>Copy the 16-character password (no spaces)</li>
                <li>Paste it in the field above and click Setup</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
