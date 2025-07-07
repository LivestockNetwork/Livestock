import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Check environment variables
    const supabase_url = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabase_anon_key = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase_service_key = !!process.env.SUPABASE_SERVICE_ROLE_KEY
    const gmail_user = !!process.env.GMAIL_USER

    let supabase_connection = false

    // Test Supabase connection if we have the required variables
    if (supabase_url && supabase_anon_key) {
      try {
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

        // Try a simple query to test connection
        const { error } = await supabase.from("user_profiles").select("count").limit(1)
        supabase_connection = !error
      } catch (error) {
        console.error("Supabase connection test failed:", error)
        supabase_connection = false
      }
    }

    const all_good = supabase_url && supabase_anon_key && supabase_connection

    return NextResponse.json({
      supabase_url,
      supabase_anon_key,
      supabase_service_key,
      gmail_user,
      supabase_connection,
      all_good,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Environment check error:", error)
    return NextResponse.json({ error: "Failed to check environment variables" }, { status: 500 })
  }
}
