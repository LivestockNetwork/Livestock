"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function GmailDiagnosticPage() {
  const [email, setEmail] = useState("patrick@bulahdelahclydesdales.com")
  const [password, setPassword] = useState("")
  const [testEmail, setTestEmail] = useState("patrick@bulahdelahclydesdales.com")
  const [diagnosticResults, setDiagnosticResults] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const addResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setDiagnosticResults((prev) => [...prev, `${timestamp}: ${message}`])
  }

  const runDiagnostic = async () => {
    setIsRunning(true)
    setDiagnosticResults([])

    addResult("🔧 Starting Gmail diagnostic...")

    try {
      // Step 1: Validate inputs
      addResult("📝 Validating inputs...")
      if (!email || !password) {
        addResult("❌ Email and password are required")
        setIsRunning(false)
        return
      }
      addResult("✅ Inputs validated")

      // Step 2: Setup Gmail
      addResult("⚙️ Setting up Gmail configuration...")
      const setupResponse = await fetch("/api/email/simple-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const setupData = await setupResponse.json()

      if (setupData.success) {
        addResult(`✅ Setup: ${setupData.message}`)
      } else {
        addResult(`❌ Setup: ${setupData.message}`)
        setIsRunning(false)
        return
      }

      // Step 3: Check status
      addResult("📊 Checking configuration status...")
      const statusResponse = await fetch("/api/email/simple-status")
      const statusData = await statusResponse.json()
      addResult(`📋 Status: ${statusData.message}`)

      // Step 4: Send test email
      addResult("📤 Sending test email...")
      const testResponse = await fetch("/api/email/simple-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: testEmail }),
      })
      const testData = await testResponse.json()

      if (testData.success) {
        addResult(`✅ Test Email: ${testData.message}`)
        addResult("🎉 Gmail diagnostic completed successfully!")
      } else {
        addResult(`❌ Test Email: ${testData.message}`)
      }
    } catch (error: any) {
      addResult(`❌ Diagnostic Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">🔧 Gmail Diagnostic Tool</CardTitle>
            <p className="text-center text-gray-600">Advanced Gmail setup and testing</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="16-character app password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Test Email Address</label>
                  <Input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>

                <Button onClick={runDiagnostic} disabled={isRunning} className="w-full bg-green-600 hover:bg-green-700">
                  {isRunning ? "🔄 Running Diagnostic..." : "🚀 Run Gmail Diagnostic"}
                </Button>
              </div>

              <div>
                {diagnosticResults.length > 0 && (
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
                    <h3 className="text-white mb-2">Diagnostic Results:</h3>
                    {diagnosticResults.map((result, index) => (
                      <div key={index} className="mb-1">
                        {result}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">📋 Diagnostic Steps:</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Validates Gmail credentials format</li>
                <li>• Saves Gmail configuration</li>
                <li>• Checks configuration status</li>
                <li>• Sends test email to verify connection</li>
                <li>• Reports detailed results for troubleshooting</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
