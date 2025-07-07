import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const results = {
      NEXT_PUBLIC_SUPABASE_URL: {
        exists: !!supabaseUrl,
        format: supabaseUrl ? (supabaseUrl.startsWith("https://") ? "valid" : "invalid") : "missing",
        preview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "not set",
      },
      NEXT_PUBLIC_SUPABASE_ANON_KEY: {
        exists: !!supabaseAnonKey,
        format: supabaseAnonKey ? (supabaseAnonKey.startsWith("eyJ") ? "valid" : "invalid") : "missing",
        preview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : "not set",
      },
      SUPABASE_SERVICE_ROLE_KEY: {
        exists: !!supabaseServiceKey,
        format: supabaseServiceKey ? (supabaseServiceKey.startsWith("eyJ") ? "valid" : "invalid") : "missing",
        preview: supabaseServiceKey ? `${supabaseServiceKey.substring(0, 20)}...` : "not set",
      },
    }

    const allValid = Object.values(results).every((result) => result.exists && result.format === "valid")

    return NextResponse.json({
      success: allValid,
      message: allValid
        ? "All environment variables are properly configured"
        : "Some environment variables are missing or invalid",
      details: results,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Environment check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      details: {
        error: String(error),
      },
    })
  }
}
