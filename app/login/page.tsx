"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Mail, Lock, ArrowRight, ArrowLeft, Eye, EyeOff, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate login process
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login - redirect to community
      window.location.href = "/community"
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      <div className="w-full max-w-md p-6">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div
            className="p-6 text-white text-center"
            style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
          >
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">Rural Community Hub</span>
            </Link>
            <p className="opacity-90">Sign in to your rural community</p>
          </div>

          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-red-700 text-sm font-semibold">{error}</p>
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 p-3 border-2 border-slate-300 rounded-xl focus:border-teal-400"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 p-3 border-2 border-slate-300 rounded-xl focus:border-teal-400"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-teal-500 focus:ring-teal-400"
                    disabled={isLoading}
                  />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700 font-semibold">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full text-white font-bold py-3 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-slate-300"></div>
              <span className="px-4 text-sm text-slate-500">or</span>
              <div className="flex-1 border-t border-slate-300"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-slate-600 mb-4">New to Rural Community Hub?</p>
              <Link href="/onboarding">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-teal-300 text-teal-700 hover:bg-teal-50 font-bold py-3 text-lg rounded-xl bg-transparent"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Join Your Community
                </Button>
              </Link>
            </div>

            {/* Community Stats */}
            <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
              <p className="text-sm text-green-800 font-semibold mb-2">Join 8,630+ rural families</p>
              <div className="flex justify-center gap-4 text-xs text-green-700">
                <Badge className="bg-green-100 text-green-700">🇦🇺 Australian Made</Badge>
                <Badge className="bg-green-100 text-green-700">🚜 Built by Rural Folk</Badge>
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link href="/">
                <Button variant="ghost" className="text-slate-500 hover:text-slate-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
