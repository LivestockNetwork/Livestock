import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  const results: any[] = []

  // Test 1: Environment Variables
  results.push({
    test: "Server Environment Variables",
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    urlFormat: process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("supabase.co") ? "Valid" : "Invalid",
    keyFormat: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.startsWith("eyJ") ? "Valid JWT" : "Invalid format",
  })

  // Test 2: Server-side Supabase Client
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // Test basic connection
    const { data, error } = await supabase.from("users").select("count").limit(1)

    results.push({
      test: "Server Database Connection",
      success: !error,
      error: error?.message,
      data: data,
    })

    // Test auth from server
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

    results.push({
      test: "Server Auth Admin Access",
      success: !authError,
      error: authError?.message,
      userCount: authData?.users?.length || 0,
    })
  } catch (error) {
    results.push({
      test: "Server Supabase Client Creation",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    })
  }

  // Test 3: Direct HTTP calls
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/users?select=count`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        "Content-Type": "application/json",
      },
    })

    results.push({
      test: "Direct HTTP API Call",
      success: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    })
  } catch (error) {
    results.push({
      test: "Direct HTTP API Call",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    })
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    results,
  })
}
