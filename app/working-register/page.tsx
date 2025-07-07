"use client"

import type React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, User } from "lucide-react"

export default function WorkingRegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    state: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult(null)

    try {
      console.log("Registering user with:", formData)

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            state: formData.state,
          },
        },
      })

      console.log("Registration result:", { data, error })

      if (error) {
        setResult({
          success: false,
          message: `Registration failed: ${error.message}`,
          details: { error: error.message, code: error.code },
        })
      } else {
        setResult({
          success: true,
          message: data.session
            ? "Registration successful! You are now logged in."
            : "Registration successful! Please check your email to confirm your account.",
          details: {
            userId: data.user?.id,
            email: data.user?.email,
            needsConfirmation: !data.session,
            hasSession: !!data.session,
          },
        })

        // Clear form on success
        if (data.user) {
          setFormData({ email: "", password: "", fullName: "", state: "" })
        }
      }
    } catch (error) {
      console.error("Registration error:", error)
      setResult({
        success: false,
        message: `Registration error: ${error instanceof Error ? error.message : "Unknown error"}`,
        details: { error: String(error) },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Create Account
          </CardTitle>
          <p className="text-sm text-gray-600">Register for the livestock emergency planning system</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="At least 6 characters"
                minLength={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State/Territory</Label>
              <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">New South Wales</SelectItem>
                  <SelectItem value="VIC">Victoria</SelectItem>
                  <SelectItem value="QLD">Queensland</SelectItem>
                  <SelectItem value="WA">Western Australia</SelectItem>
                  <SelectItem value="SA">South Australia</SelectItem>
                  <SelectItem value="TAS">Tasmania</SelectItem>
                  <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                  <SelectItem value="NT">Northern Territory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {result && (
            <Alert className={`mt-4 ${result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
              <div className="flex items-center gap-2">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                  {result.message}
                </AlertDescription>
              </div>
            </Alert>
          )}

          {result && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium">Technical Details</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {JSON.stringify(result.details, null, 2)}
              </pre>
            </details>
          )}

          <div className="mt-4 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/working-login" className="text-blue-600 hover:underline">
                Sign in here
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
