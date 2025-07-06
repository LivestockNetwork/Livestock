"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { loginUser } from "@/app/actions/user-login"

const demoAccounts = [
  {
    email: "demo@rural.com",
    password: "demo123",
    name: "Demo User",
    type: "Cattle Station",
  },
  {
    email: "farmer@example.com",
    password: "farm123",
    name: "John Farmer",
    type: "Mixed Farm",
  },
  {
    email: "sarah@station.com",
    password: "sarah123",
    name: "Sarah Mitchell",
    type: "Sheep Station",
  },
]

export default function LoginPage() {
  const [state, formAction, isPending] = useFormState(loginUser, null)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState<string>("")

  const handleDemoLogin = (email: string, password: string) => {
    setSelectedDemo(email)
    // Auto-fill the form
    const emailInput = document.getElementById("email") as HTMLInputElement
    const passwordInput = document.getElementById("password") as HTMLInputElement
    if (emailInput && passwordInput) {
      emailInput.value = email
      passwordInput.value = password
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Shield className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">RuralGuard</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account to access your emergency plans</p>
        </div>

        {/* Demo Accounts */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-800">Demo Accounts</CardTitle>
            <CardDescription className="text-xs text-blue-600">
              Click any account below to auto-fill the login form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => handleDemoLogin(account.email, account.password)}
                className="w-full text-left p-2 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-sm text-blue-900">{account.name}</div>
                    <div className="text-xs text-blue-600">{account.email}</div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {account.type}
                  </Badge>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className={selectedDemo ? "border-blue-300" : ""}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    className={selectedDemo ? "border-blue-300" : ""}
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

              {state?.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{state.error}</AlertDescription>
                </Alert>
              )}

              {state?.success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Login successful! Redirecting to dashboard...
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center">
                <Link href="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                  Forgot your password?
                </Link>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-sm text-gray-600">Don't have an account? </span>
                <Link href="/register" className="text-sm text-green-600 hover:text-green-700 font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>
            Protected by enterprise-grade security.
            <Link href="/security" className="text-green-600 hover:text-green-700 ml-1">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
