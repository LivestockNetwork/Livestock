import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    // Create client with anon key (like frontend would)
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test 1: Basic auth service availability
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession()

      if (sessionError) {
        return NextResponse.json({
          working: false,
          message: `Auth session check failed: ${sessionError.message}`,
          fix: "Check if authentication is properly configured in Supabase dashboard",
          details: { sessionError: sessionError.message },
        })
      }

      // Test 2: Try to sign up with a test user (this will reveal configuration issues)
      const testEmail = `test-${Date.now()}@example.com`
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: "testpassword123",
      })

      if (signUpError) {
        // Common error messages and their fixes
        const errorFixes: { [key: string]: string } = {
          "Email confirmations are required":
            "Disable email confirmations in Supabase Dashboard → Authentication → Settings",
          "Invalid login credentials": "Check if sign-ups are enabled in Supabase Dashboard",
          "Signup is disabled": "Enable sign-ups in Supabase Dashboard → Authentication → Settings",
          "To signup, please provide your email": "Email format validation issue",
        }

        const fix = errorFixes[signUpError.message] || "Check authentication settings in Supabase dashboard"

        return NextResponse.json({
          working: false,
          message: `Auth signup test failed: ${signUpError.message}`,
          fix,
          details: {
            signUpError: signUpError.message,
            errorCode: signUpError.status,
          },
        })
      }

      // If we get here, auth is working
      return NextResponse.json({
        working: true,
        message: "Authentication is properly configured and working",
        details: {
          sessionCheckPassed: true,
          signUpTestPassed: true,
          testUserId: signUpData.user?.id,
          needsEmailConfirmation: !signUpData.session,
        },
      })
    } catch (authError) {
      return NextResponse.json({
        working: false,
        message: `Auth service error: ${authError instanceof Error ? authError.message : "Unknown error"}`,
        fix: "Check if your Supabase URL and anon key are correct",
        details: { authError: String(authError) },
      })
    }
  } catch (error) {
    return NextResponse.json({
      working: false,
      message: `Auth check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      fix: "Verify environment variables and Supabase project configuration",
      details: { error: String(error) },
    })
  }
}
