"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

interface EnvCheck {
  exists: boolean
  valid: boolean
  format: string
  expected: string
}

interface EnvDetails {
  NEXT_PUBLIC_SUPABASE_URL: EnvCheck
  NEXT_PUBLIC_SUPABASE_ANON_KEY: EnvCheck
  SUPABASE_SERVICE_ROLE_KEY: EnvCheck
}

export default function EnvValidatorPage() {
  const [isChecking, setIsChecking] = useState(false)
  const [envDetails, setEnvDetails] = useState<EnvDetails | null>(null)
  const [testUrl, setTestUrl] = useState("")
  const [testAnonKey, setTestAnonKey] = useState("")
  const [testServiceKey, setTestServiceKey] = useState("")

  const checkEnvironment = async () => {
    setIsChecking(true)
    try {
      const response = await fetch("/api/debug/env-check")
      const data = await response.json()
      setEnvDetails(data.details)
    } catch (error) {
      console.error("Failed to check environment:", error)
    }
    setIsChecking(false)
  }

  const validateFormat = (value: string, type: "url" | "key") => {
    if (type === "url") {
      return /^https:\/\/[a-zA-Z0-9-]+\.supabase\.co$/.test(value)
    } else {
      return value.startsWith("eyJ")
    }
  }

  const getStatusIcon = (exists: boolean, valid: boolean) => {
    if (!exists) return <XCircle className="h-4 w-4 text-red-500" />
    if (!valid) return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    return <CheckCircle className="h-4 w-4 text-green-500" />
  }

  const getStatusMessage = (exists: boolean, valid: boolean) => {
    if (!exists) return "Missing"
    if (!valid) return "Invalid Format"
    return "Valid"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables Validator</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={checkEnvironment} disabled={isChecking} className="w-full mb-4">
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Environment...
                </>
              ) : (
                "Check Current Environment Variables"
              )}
            </Button>

            {envDetails && (
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>Current environment variable status from your deployment:</AlertDescription>
                </Alert>

                {Object.entries(envDetails).map(([key, details]) => (
                  <Card key={key} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{key}</h3>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(details.exists, details.valid)}
                          <span className="text-sm font-medium">{getStatusMessage(details.exists, details.valid)}</span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>
                          Current: <code className="bg-gray-100 px-1 rounded">{details.format}</code>
                        </div>
                        <div>
                          Expected: <code className="bg-gray-100 px-1 rounded">{details.expected}</code>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Environment Variable Formats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="test-url">Test Supabase URL Format</Label>
              <Input
                id="test-url"
                placeholder="https://your-project.supabase.co"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
              />
              {testUrl && (
                <div className="flex items-center gap-2 mt-1">
                  {validateFormat(testUrl, "url") ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {validateFormat(testUrl, "url") ? "Valid URL format" : "Invalid URL format"}
                  </span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="test-anon">Test Anon Key Format</Label>
              <Input
                id="test-anon"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={testAnonKey}
                onChange={(e) => setTestAnonKey(e.target.value)}
              />
              {testAnonKey && (
                <div className="flex items-center gap-2 mt-1">
                  {validateFormat(testAnonKey, "key") ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {validateFormat(testAnonKey, "key")
                      ? "Valid key format"
                      : "Invalid key format (should start with 'eyJ')"}
                  </span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="test-service">Test Service Role Key Format</Label>
              <Input
                id="test-service"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={testServiceKey}
                onChange={(e) => setTestServiceKey(e.target.value)}
              />
              {testServiceKey && (
                <div className="flex items-center gap-2 mt-1">
                  {validateFormat(testServiceKey, "key") ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm">
                    {validateFormat(testServiceKey, "key")
                      ? "Valid key format"
                      : "Invalid key format (should start with 'eyJ')"}
                  </span>
                </div>
              )}
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Common Issues:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>URL should be exactly: https://your-project-id.supabase.co (no trailing slash)</li>
                  <li>Keys should start with 'eyJ' (they are JWT tokens)</li>
                  <li>Make sure you didn't swap the anon key and service role key</li>
                  <li>Check for extra spaces or characters when copying from Supabase dashboard</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
