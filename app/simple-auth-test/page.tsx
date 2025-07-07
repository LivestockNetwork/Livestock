"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SimpleAuthTest() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testSignUp = async () => {
    setLoading(true)
    setResult(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      setResult({
        type: "signup",
        success: !error,
        data: data,
        error: error?.message,
        fullError: error,
      })
    } catch (err) {
      setResult({
        type: "signup",
        success: false,
        error: "Unexpected error: " + (err instanceof Error ? err.message : String(err)),
      })
    }
    setLoading(false)
  }

  const testSignIn = async () => {
    setLoading(true)
    setResult(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      setResult({
        type: "signin",
        success: !error,
        data: data,
        error: error?.message,
        fullError: error,
      })
    } catch (err) {
      setResult({
        type: "signin",
        success: false,
        error: "Unexpected error: " + (err instanceof Error ? err.message : String(err)),
      })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Auth Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123"
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={testSignUp} disabled={loading || !email || !password}>
              Test Sign Up
            </Button>
            <Button onClick={testSignIn} disabled={loading || !email || !password} variant="outline">
              Test Sign In
            </Button>
          </div>

          {result && (
            <Alert className={result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <AlertDescription>
                <div className="space-y-2">
                  <p>
                    <strong>Test:</strong> {result.type}
                  </p>
                  <p>
                    <strong>Success:</strong> {result.success ? "Yes" : "No"}
                  </p>
                  {result.error && (
                    <p>
                      <strong>Error:</strong> {result.error}
                    </p>
                  )}
                  {result.data && (
                    <details>
                      <summary>Full Response</summary>
                      <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(result.data, null, 2)}</pre>
                    </details>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
