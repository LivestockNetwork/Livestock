"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, CheckCircle, AlertCircle, User, LogOut } from "lucide-react"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function WorkingAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [mode, setMode] = useState<"login" | "register">("login")

  useEffect(() => {
    // Check current user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      if (event === "SIGNED_IN") {
        setMessage("Successfully signed in!")
        setError("")
      }
      if (event === "SIGNED_OUT") {
        setMessage("Successfully signed out!")
        setError("")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")

    try {
      if (mode === "register") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) {
          setError(error.message)
        } else {
          setMessage("Registration successful! You can now sign in.")
          console.log("Registration data:", data)
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) {
          setError(error.message)
        } else {
          setMessage("Login successful!")
          console.log("Login data:", data)
        }
      }
    } catch (err) {
      setError(`Authentication failed: ${err instanceof Error ? err.message : "Unknown error"}`)
      console.error("Auth error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError(`Sign out failed: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle className="text-2xl">Welcome!</CardTitle>
            <CardDescription>You are successfully logged in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Email:</p>
              <p className="text-green-700">{user.email}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">User ID:</p>
              <p className="text-blue-700 text-xs font-mono break-all">{user.id}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-800">Email Confirmed:</p>
              <p className="text-purple-700">{user.email_confirmed_at ? "Yes" : "No"}</p>
            </div>
            <div className="space-y-2">
              <Button asChild className="w-full">
                <a href="/dashboard">Go to Dashboard</a>
              </Button>
              <Button variant="outline" onClick={handleSignOut} disabled={loading} className="w-full bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                {loading ? "Signing out..." : "Sign Out"}
              </Button>
            </div>

            {message && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">{message}</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <CardTitle className="text-2xl">{mode === "login" ? "Sign In" : "Create Account"}</CardTitle>
          <CardDescription>
            {mode === "login" ? "Access your Rural Community Hub account" : "Join the Rural Community Hub"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                mode === "register" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? mode === "login"
                  ? "Signing In..."
                  : "Creating Account..."
                : mode === "login"
                  ? "Sign In"
                  : "Create Account"}
            </Button>
          </form>

          {message && (
            <Alert className="mt-4 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">{message}</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Having trouble? Check that email confirmation is disabled in your Supabase dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
