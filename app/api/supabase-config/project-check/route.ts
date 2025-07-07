import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Test basic connectivity
    const { data, error } = await supabase.from("information_schema.tables").select("table_name").limit(1)

    if (error) {
      return NextResponse.json({
        configured: false,
        message: `Database connection failed: ${error.message}`,
        fix: "Check if your Supabase project is active and environment variables are correct",
        details: {
          error: error.message,
          code: error.code,
          hint: error.hint,
        },
      })
    }

    // Check auth configuration
    try {
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1,
      })

      if (authError) {
        return NextResponse.json({
          configured: false,
          message: `Auth service issue: ${authError.message}`,
          fix: "Check authentication settings in Supabase dashboard",
          details: { authError: authError.message },
        })
      }

      return NextResponse.json({
        configured: true,
        message: "Supabase project is properly configured and accessible",
        details: {
          databaseConnected: true,
          authServiceWorking: true,
          userCount: authData.users?.length || 0,
        },
      })
    } catch (authError) {
      return NextResponse.json({
        configured: false,
        message: "Auth service configuration issue",
        fix: "Check if authentication is enabled in your Supabase project",
        details: { authError: String(authError) },
      })
    }
  } catch (error) {
    return NextResponse.json({
      configured: false,
      message: `Project check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      fix: "Verify your Supabase project exists and is active",
      details: { error: String(error) },
    })
  }
}
