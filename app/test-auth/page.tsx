"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [user, setUser] = useState<any>(null)

  // Create Supabase client directly here
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  const handleRegister = async () => {
    try {
      setMessage("Registering...")
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setMessage(`Registration error: ${error.message}`)
      } else {
        setMessage("Registration successful! Check your email for confirmation.")
        setUser(data.user)
      }
    } catch (err) {
      setMessage(`Registration failed: ${err}`)
    }
  }

  const handleLogin = async () => {
    try {
      setMessage("Logging in...")
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(`Login error: ${error.message}`)
      } else {
        setMessage("Login successful!")
        setUser(data.user)
      }
    } catch (err) {
      setMessage(`Login failed: ${err}`)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setMessage(`Logout error: ${error.message}`)
      } else {
        setMessage("Logged out successfully")
        setUser(null)
      }
    } catch (err) {
      setMessage(`Logout failed: ${err}`)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Test Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex gap-2">
            <Button onClick={handleRegister}>Register</Button>
            <Button onClick={handleLogin}>Login</Button>
            {user && <Button onClick={handleLogout}>Logout</Button>}
          </div>

          {message && <div className="p-2 bg-gray-100 rounded">{message}</div>}

          {user && (
            <div className="p-2 bg-green-100 rounded">
              <p>Logged in as: {user.email}</p>
              <p>User ID: {user.id}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
