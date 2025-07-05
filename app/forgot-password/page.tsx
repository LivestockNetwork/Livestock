"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Basic validation
    if (!email) {
      setError("Please enter your email address")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    // Simulate password reset process
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (err) {
      setError("Failed to send reset email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
      >
        {/* Header with clickable logo */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold">Rural Community Hub</span>
          </Link>
        </div>
        <div className="w-full max-w-md p-6">
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div
              className="p-6 text-white text-center"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
              <p className="opacity-90">Password reset instructions sent</p>
            </div>

            <CardContent className="p-8 text-center">
              <p className="text-slate-700 mb-6 leading-relaxed">
                We've sent password reset instructions to <strong>{email}</strong>
              </p>

              <div className="p-4 bg-blue-50 rounded-xl mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Didn't receive the email?</strong>
                  <br />
                  Check your spam folder or try again in a few minutes.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full text-white font-bold"
                  style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
                  onClick={() => (window.location.href = "mailto:")}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Open Email App
                </Button>

                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full border-slate-300 text-slate-700 bg-transparent">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e8f5e8 50%, #f0f8ff 100%)" }}
    >
      {/* Header with clickable logo */}
      <div className="absolute top-4 left-4 z-10">
        <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
          <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold">Rural Community Hub</span>
        </Link>
      </div>
      <div className="w-full max-w-md p-6">
        <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div
            className="p-6 text-white text-center"
            style={{ background: "linear-gradient(135deg, #7EC9BB, #6BB3A6)" }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
            <p className="opacity-90">We'll send you reset instructions</p>
          </div>

          <CardContent className="p-8">
            <form onSubmit={handleResetPassword} className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <p className="text-red-700 text-sm font-semibold">{error}</p>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <p className="text-slate-600">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

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

              {/* Reset Button */}
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
                    Sending Instructions...
                  </div>
                ) : (
                  <>
                    Send Reset Instructions
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link href="/login">
                <Button variant="ghost" className="text-slate-500 hover:text-slate-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl text-center">
              <p className="text-sm text-slate-600">
                <strong>Need help?</strong> Contact our support team at{" "}
                <a href="mailto:support@ruralcommunityhub.com" className="text-teal-600 hover:text-teal-700">
                  support@ruralcommunityhub.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
