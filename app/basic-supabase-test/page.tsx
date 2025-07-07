"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BasicSupabaseTest() {
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const addResult = (message: string) => {
    setResults((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testEnvironmentVariables = () => {
    setResults([])
    addResult("Testing environment variables...")

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    addResult(`URL exists: ${!!url}`)
    addResult(`Key exists: ${!!key}`)

    if (url) {
      addResult(`URL: ${url}`)
      addResult(`URL format valid: ${url.includes("supabase.co")}`)
    }

    if (key) {
      addResult(`Key starts with eyJ: ${key.startsWith("eyJ")}`)
      addResult(`Key length: ${key.length}`)
    }
  }

  const testDirectHTTP = async () => {
    setIsLoading(true)
    setResults([])

    try {
      addResult("Testing direct HTTP to Supabase...")

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url || !key) {
        addResult("❌ Missing environment variables")
        setIsLoading(false)
        return
      }

      // Test 1: Basic connectivity
      addResult("Testing basic connectivity...")
      const response = await fetch(`${url}/rest/v1/`, {
        method: "GET",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      })

      addResult(`Response status: ${response.status}`)
      addResult(`Response ok: ${response.ok}`)

      if (response.ok) {
        const text = await response.text()
        addResult(`Response: ${text.substring(0, 100)}...`)
      } else {
        const errorText = await response.text()
        addResult(`Error response: ${errorText}`)
      }
    } catch (error) {
      addResult(`❌ HTTP Error: ${error instanceof Error ? error.message : String(error)}`)
    }

    setIsLoading(false)
  }

  const testSupabaseImport = async () => {
    setIsLoading(true)
    setResults([])

    try {
      addResult("Testing Supabase import...")

      // Try to import without using auth
      const { createClient } = await import("@supabase/supabase-js")
      addResult("✅ Successfully imported createClient")

      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url || !key) {
        addResult("❌ Missing environment variables")
        setIsLoading(false)
        return
      }

      // Create client with minimal config
      addResult("Creating Supabase client...")
      const supabase = createClient(url, key, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
      addResult("✅ Client created successfully")

      // Test a simple database query instead of auth
      addResult("Testing database query...")
      const { data, error } = await supabase.from("information_schema.tables").select("table_name").limit(1)

      if (error) {
        addResult(`Database query error: ${error.message}`)
      } else {
        addResult(`✅ Database query successful: ${JSON.stringify(data)}`)
      }
    } catch (error) {
      addResult(`❌ Import/Client Error: ${error instanceof Error ? error.message : String(error)}`)
      if (error instanceof Error && error.stack) {
        addResult(`Stack: ${error.stack}`)
      }
    }

    setIsLoading(false)
  }

  const testAuthSpecifically = async () => {
    setIsLoading(true)
    setResults([])

    try {
      addResult("Testing auth module specifically...")

      const { createClient } = await import("@supabase/supabase-js")
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!url || !key) {
        addResult("❌ Missing environment variables")
        setIsLoading(false)
        return
      }

      const supabase = createClient(url, key)
      addResult("✅ Client created")

      // This is where the "Load failed" error typically occurs
      addResult("Testing auth.getSession()...")
      const { data, error } = await supabase.auth.getSession()

      if (error) {
        addResult(`❌ Auth error: ${error.message}`)
      } else {
        addResult(`✅ Auth getSession successful: ${data.session ? "Has session" : "No session"}`)
      }
    } catch (error) {
      addResult(`❌ Auth Error: ${error instanceof Error ? error.message : String(error)}`)
      if (error instanceof Error && error.stack) {
        addResult(`Stack: ${error.stack}`)
      }
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Basic Supabase Connection Test</CardTitle>
            <p className="text-sm text-gray-600">
              Testing each component separately to isolate the "Load failed" error
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={testEnvironmentVariables} variant="outline">
                Test Environment Variables
              </Button>
              <Button onClick={testDirectHTTP} disabled={isLoading}>
                {isLoading ? "Testing..." : "Test Direct HTTP"}
              </Button>
              <Button onClick={testSupabaseImport} disabled={isLoading}>
                {isLoading ? "Testing..." : "Test Supabase Import"}
              </Button>
              <Button onClick={testAuthSpecifically} disabled={isLoading}>
                {isLoading ? "Testing..." : "Test Auth Module"}
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
