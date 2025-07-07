import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        message: "Missing environment variables",
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test registration with a test email
    const testEmail = `test-${Date.now()}@example.com`
    const testPassword = "testpass123"

    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
    })

    if (error) {
      return NextResponse.json({
        success: false,
        message: `Registration test failed: ${error.message}`,
        details: {
          error: error.message,
          code: error.code,
          status: error.status,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Registration test successful",
      details: {
        userId: data.user?.id,
        email: data.user?.email,
        emailConfirmed: data.user?.email_confirmed_at !== null,
        needsConfirmation: !data.session,
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Registration test threw an error: ${error instanceof Error ? error.message : "Unknown error"}`,
      details: {
        error: String(error),
        type: "registration_error",
      },
    })
  }
}
