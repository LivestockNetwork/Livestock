"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield } from "lucide-react"

const demoAccounts = [
  { email: "demo@rural.com", password: "demo123", name: "Demo User", property: "Demo Farm" },
  { email: "farmer@example.com", password: "farm123", name: "John Smith", property: "Smith Station" },
  { email: "sarah@station.com", password: "sarah123", name: "Sarah Johnson", property: "Riverside Station" },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check demo accounts
    const account = demoAccounts.find((acc) => acc.email === email && acc.password === password)

    if (account) {
      // Store user data in localStorage (in a real app, use proper auth)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: account.email,
          name: account.name,
          property: account.property,
          isLoggedIn: true,
        }),
      )

      router.push("/dashboard")
    } else {
      setError("Invalid email or password. Try demo@rural.com / demo123")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = (account: (typeof demoAccounts)[0]) => {
    setEmail(account.email)
    setPassword(account.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your Rural Emergency Hub account</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your emergency plans</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center text-sm text-gray-600">
                <p>Demo Accounts (click to auto-fill):</p>
              </div>

              <div className="space-y-2">
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
              <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                Forgot your password?
              </Link>
              <div className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/register" className="text-green-600 hover:underline">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
