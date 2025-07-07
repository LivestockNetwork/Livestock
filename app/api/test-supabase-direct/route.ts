import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey,
        },
      })
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test connection with a simple query
    const { data, error } = await supabase.from("users").select("count").limit(1)

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful",
      data: data,
      error: error?.message || null,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Connection failed",
      details: error instanceof Error ? error.message : String(error),
    })
  }
}
