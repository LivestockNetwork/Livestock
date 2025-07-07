import { NextResponse } from "next/server"

export async function GET() {
  const log: string[] = []

  try {
    log.push("=== SERVER-SIDE SUPABASE TEST ===")

    // Test environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    log.push(`URL exists: ${!!url}`)
    log.push(`Anon key exists: ${!!anonKey}`)
    log.push(`Service key exists: ${!!serviceKey}`)

    if (url) {
      log.push(`URL: ${url}`)
      log.push(`URL format valid: ${url.includes("supabase.co")}`)
    }

    if (anonKey) {
      log.push(`Anon key format valid: ${anonKey.startsWith("eyJ")}`)
    }

    // Test import
    log.push("Testing Supabase import on server...")
    const { createClient } = await import("@supabase/supabase-js")
    log.push("✅ Successfully imported createClient")

    if (url && anonKey) {
      // Test client creation
      log.push("Creating client...")
      const supabase = createClient(url, anonKey)
      log.push("✅ Client created on server")

      // Test direct HTTP call
      log.push("Testing direct HTTP call...")
      const response = await fetch(`${url}/rest/v1/`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          "Content-Type": "application/json",
        },
      })

      log.push(`HTTP Response status: ${response.status}`)
      log.push(`HTTP Response ok: ${response.ok}`)

      if (response.ok) {
        const text = await response.text()
        log.push(`HTTP Response body: ${text.substring(0, 100)}...`)
      } else {
        const errorText = await response.text()
        log.push(`HTTP Error body: ${errorText}`)
      }

      // Test auth on server
      log.push("Testing auth.getSession() on server...")
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          log.push(`Auth error: ${error.message}`)
        } else {
          log.push(`✅ Auth getSession successful on server`)
        }
      } catch (authError) {
        log.push(`❌ Auth exception: ${authError instanceof Error ? authError.message : String(authError)}`)
      }
    }
  } catch (error) {
    log.push(`❌ Server error: ${error instanceof Error ? error.message : String(error)}`)
    if (error instanceof Error && error.stack) {
      log.push(`Stack: ${error.stack}`)
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    log,
    environment: {
      nodeEnv: process.env.NODE_ENV,
      runtime: "nodejs",
    },
  })
}
