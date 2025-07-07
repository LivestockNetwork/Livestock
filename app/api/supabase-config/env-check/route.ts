import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    const checks = {
      hasUrl: !!supabaseUrl,
      hasAnonKey: !!supabaseAnonKey,
      hasServiceKey: !!supabaseServiceKey,
      urlFormat: false,
      anonKeyFormat: false,
      serviceKeyFormat: false,
    }

    // Check URL format
    if (supabaseUrl) {
      checks.urlFormat = /^https:\/\/[a-z0-9]+\.supabase\.co$/.test(supabaseUrl)
    }

    // Check anon key format (JWT tokens start with 'eyJ')
    if (supabaseAnonKey) {
      checks.anonKeyFormat = supabaseAnonKey.startsWith("eyJ")
    }

    // Check service key format
    if (supabaseServiceKey) {
      checks.serviceKeyFormat = supabaseServiceKey.startsWith("eyJ")
    }

    const allValid = Object.values(checks).every(Boolean)

    return NextResponse.json({
      allValid,
      checks,
      details: {
        urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : "Not set",
        anonKeyPreview: supabaseAnonKey ? `${supabaseAnonKey.substring(0, 20)}...` : "Not set",
        serviceKeyPreview: supabaseServiceKey ? `${supabaseServiceKey.substring(0, 20)}...` : "Not set",
      },
    })
  } catch (error) {
    return NextResponse.json({
      allValid: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
