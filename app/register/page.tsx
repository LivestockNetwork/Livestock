"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { registerUser } from "@/app/actions/user-registration"

const initialState = {
  success: false,
  message: "",
  user: null,
}

const australianStates = [
  { value: "NSW", label: "New South Wales" },
  { value: "VIC", label: "Victoria" },
  { value: "QLD", label: "Queensland" },
  { value: "WA", label: "Western Australia" },
  { value: "SA", label: "South Australia" },
  { value: "TAS", label: "Tasmania" },
  { value: "ACT", label: "Australian Capital Territory" },
  { value: "NT", label: "Northern Territory" },
]

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Redirect to dashboard on successful registration
  useEffect(() => {
    if (state.success && state.user) {
      router.push("/dashboard")
    }
  }, [state.success, state.user, router])

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true)
    await formAction(formData)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">Rural Community Hub</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
          <p className="text-gray-600">Create your account to access emergency planning and community support</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>Just name, email, state and password to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Smith" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State/Territory</Label>
                <Select name="state" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {australianStates.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {state?.message && !state.success && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{state.message}</AlertDescription>
                </Alert>
              )}

              {state?.success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Registration successful! Redirecting to dashboard...
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
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

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
