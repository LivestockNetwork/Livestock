"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MinimalSupabaseTest() {
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addResult = (message: string) => {
    setResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testSupabase = async () => {
    setIsLoading(true)
    setResults([])

    try {
      addResult("Starting Supabase test...")

      // Test 1: Check if we can import createClient
      addResult("Testing import...")
      const { createClient } = await import("@supabase/supabase-js")
      addResult("✅ Successfully imported createClient")

      // Test 2: Check environment variables
      addResult("Checking environment variables...")
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url) {
        addResult("❌ NEXT_PUBLIC_SUPABASE_URL is missing")
        setIsLoading(false)
        return
      }
      if (!key) {
        addResult("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing")
        setIsLoading(false)
        return
      }

      addResult(`✅ URL: ${url.substring(0, 30)}...`)
      addResult(`✅ Key: ${key.substring(0, 30)}...`)

      // Test 3: Create client with minimal options
      addResult("Creating Supabase client...")
      const supabase = createClient(url, key)
      addResult("✅ Client created successfully")

      // Test 4: Test the specific auth method that's failing
      addResult("Testing auth.getSession()...")
      const sessionResult = await supabase.auth.getSession()
      addResult(`✅ getSession() worked: ${sessionResult.data.session ? "Has session" : "No session"}`)

      // Test 5: Test auth.signUp with a clearly invalid email to see the error
      addResult("Testing auth.signUp() with invalid email...")
      const signUpResult = await supabase.auth.signUp({
        email: "not-an-email",
        password: "test123",
      })

      if (signUpResult.error) {
        addResult(`✅ signUp() returned expected error: ${signUpResult.error.message}`)
      } else {
        addResult(`⚠️ signUp() unexpectedly succeeded`)
      }
    } catch (error) {
      addResult(`❌ Error: ${error instanceof Error ? error.message : String(error)}`)
      addResult(`❌ Stack: ${error instanceof Error ? error.stack : "No stack trace"}`)
    }

    setIsLoading(false)
  }

  const testDirectFetch = async () => {
    setIsLoading(true)
    setResults([])

    try {
      addResult("Testing direct fetch to Supabase...")

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const response = await fetch(`${url}/auth/v1/settings`, {
        headers: {
          apikey: key!,
          Authorization: `Bearer ${key!}`,
        },
      })

      addResult(`Response status: ${response.status}`)
      addResult(`Response ok: ${response.ok}`)

      const text = await response.text()
      addResult(`Response body: ${text.substring(0, 200)}...`)
    } catch (error) {
      addResult(`❌ Fetch error: ${error instanceof Error ? error.message : String(error)}`)
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Minimal Supabase Test</CardTitle>
            <p className="text-sm text-gray-600">Testing Supabase step by step to isolate the "Load failed" error</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={testSupabase} disabled={isLoading}>
                {isLoading ? "Testing..." : "Test Supabase Client"}
              </Button>
              <Button onClick={testDirectFetch} disabled={isLoading} variant="outline">
                {isLoading ? "Testing..." : "Test Direct Fetch"}
              </Button>
            </div>

            {results.length > 0 && (
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div key={index}>{result}</div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
