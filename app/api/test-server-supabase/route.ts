import { NextResponse } from "next/server"

export async function GET() {
  const log: string[] = []

  try {
    log.push("Starting server-side Supabase test...")

    // Test environment variables
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    log.push(`URL exists: ${!!url}`)
    log.push(`Anon key exists: ${!!anonKey}`)
    log.push(`Service key exists: ${!!serviceKey}`)

    if (url) {
      log.push(`URL format: ${url.includes("supabase.co") ? "Valid" : "Invalid"}`)
    }

    // Test import
    const { createClient } = await import("@supabase/supabase-js")
    log.push("✅ Successfully imported createClient on server")

    // Test client creation
    if (url && anonKey) {
      const supabase = createClient(url, anonKey)
      log.push("✅ Client created on server")

      // Test a simple query
      const { data, error } = await supabase.from("users").select("count").limit(1)
      log.push(`Query result - Error: ${error?.message || "None"}, Data: ${JSON.stringify(data)}`)
    }

    // Test direct HTTP call
    if (url && anonKey) {
      const response = await fetch(`${url}/rest/v1/`, {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      })
      log.push(`Direct HTTP - Status: ${response.status}, OK: ${response.ok}`)
    }
  } catch (error) {
    log.push(`❌ Server error: ${error instanceof Error ? error.message : String(error)}`)
    log.push(`❌ Stack: ${error instanceof Error ? error.stack : "No stack"}`)
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    log,
  })
}
