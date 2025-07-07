"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { registerUserSimple } from "../actions/user-registration-fixed"

export default function RegisterFixedPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await registerUserSimple(formData)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "Registration failed",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Account (Fixed)</CardTitle>
          <CardDescription>Join the Rural Emergency Network</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" type="text" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required minLength={6} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Select name="state" required>
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
                  <SelectItem value="NT">Northern Territory</SelectItem>
                  <SelectItem value="ACT">Australian Capital Territory</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input id="postcode" name="postcode" type="text" placeholder="e.g. 2430" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Property Type</Label>
              <Select name="propertyType">
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cattle">Cattle Farm</SelectItem>
                  <SelectItem value="sheep">Sheep Farm</SelectItem>
                  <SelectItem value="mixed">Mixed Livestock</SelectItem>
                  <SelectItem value="horses">Horse Property</SelectItem>
                  <SelectItem value="hobby">Hobby Farm</SelectItem>
                  <SelectItem value="other">Other Rural Property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
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
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                {result.success ? result.message : result.error}
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
