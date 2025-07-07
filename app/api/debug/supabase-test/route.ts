import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        message: "Missing environment variables",
        details: {
          hasUrl: !!supabaseUrl,
          hasAnonKey: !!supabaseAnonKey,
        },
      })
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test 1: Basic connection
    const { data: healthData, error: healthError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .limit(1)

    if (healthError) {
      return NextResponse.json({
        success: false,
        message: `Database connection failed: ${healthError.message}`,
        details: {
          error: healthError.message,
          code: healthError.code,
          hint: healthError.hint,
        },
      })
    }

    // Test 2: Auth service
    const { data: authData, error: authError } = await supabase.auth.getSession()

    return NextResponse.json({
      success: true,
      message: "Supabase connection successful",
      details: {
        databaseConnected: true,
        authServiceWorking: !authError,
        timestamp: new Date().toISOString(),
        authError: authError?.message || null,
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Supabase test failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      details: {
        error: String(error),
        type: "connection_error",
      },
    })
  }
}
