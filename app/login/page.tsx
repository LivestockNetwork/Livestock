"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const demoAccounts = [
  {
    email: "demo@rural.com",
    password: "demo123",
    name: "Demo User",
    location: "Central Coast, NSW",
    propertyType: "Mixed Farming",
  },
  {
    email: "farmer@example.com",
    password: "farm123",
    name: "John Smith",
    location: "Gippsland, VIC",
    propertyType: "Dairy Farm",
  },
  {
    email: "sarah@station.com",
    password: "sarah123",
    name: "Sarah Johnson",
    location: "Darling Downs, QLD",
    propertyType: "Cattle Station",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Find matching demo account
      const user = demoAccounts.find((account) => account.email === email && account.password === password)

      if (user) {
        // Store user data in localStorage (same as wizards)
        localStorage.setItem("currentUser", JSON.stringify(user))
        localStorage.setItem("isLoggedIn", "true")

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Invalid email or password. Try one of the demo accounts below.")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (account: (typeof demoAccounts)[0]) => {
    setEmail(account.email)
    setPassword(account.password)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">🌾</span>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to your Rural Community Hub account</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Demo Accounts</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {demoAccounts.map((account, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start bg-transparent"
                    onClick={() => handleDemoLogin(account)}
                  >
                    <div>
                      <div className="font-medium">{account.name}</div>
                      <div className="text-xs text-gray-500">{account.email}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center space-y-2">
              <Link href="/forgot-password" className="text-sm text-teal-600 hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/onboarding" className="text-teal-600 hover:underline">
                  Join now
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
