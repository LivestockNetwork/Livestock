"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

export default function SimpleRegisterTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleTest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/test-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Test failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Registration Test</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Test Email</Label>
              <Input id="email" name="email" type="email" defaultValue="test@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Test Password</Label>
              <Input id="password" name="password" type="password" defaultValue="testpass123" required />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                "Test Registration"
              )}
            </Button>
          </form>

          {result && (
            <Alert className={`mt-4 ${result.success ? "border-green-200" : "border-red-200"}`}>
              <AlertDescription>
                <strong>{result.success ? "Success:" : "Error:"}</strong>{" "}
                {result.success ? result.message : result.error}
              </AlertDescription>
            </Alert>
          )}

          {result && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium">Raw Response</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
