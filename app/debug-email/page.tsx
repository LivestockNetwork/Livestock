"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugEmailPage() {
  const [status, setStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const checkStatus = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/email/simple-status")
      const data = await response.json()
      setStatus(data)
    } catch (error: any) {
      setStatus({
        success: false,
        configured: false,
        email: "Error",
        message: `Status check failed: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🔍 Email System Debug</CardTitle>
            <p className="text-center text-gray-600">Check Gmail configuration status</p>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <Button onClick={checkStatus} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? "🔄 Checking..." : "🔍 Check Status"}
              </Button>
            </div>

            {status && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">📊 Email System Status:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Configured:</span>
                      <span className={status.configured ? "text-green-600" : "text-red-600"}>
                        {status.configured ? "✅ Yes" : "❌ No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span>{status.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Message:</span>
                      <span>{status.message}</span>
                    </div>
                  </div>
                </div>

                {!status.configured && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-800 mb-2">⚠️ Gmail Not Configured</h4>
                    <p className="text-yellow-700 text-sm mb-2">You need to set up Gmail before you can send emails.</p>
                    <Button
                      onClick={() => (window.location.href = "/simple-email-setup")}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      📧 Setup Gmail Now
                    </Button>
                  </div>
                )}

                {status.configured && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-800 mb-2">✅ Gmail Configured</h4>
                    <p className="text-green-700 text-sm mb-2">Your Gmail is ready to send emails!</p>
                    <div className="space-x-2">
                      <Button
                        onClick={() => (window.location.href = "/test-registration")}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        🧪 Test Registration
                      </Button>
                      <Button
                        onClick={() => (window.location.href = "/complete-test")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        🚀 Run Complete Test
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
