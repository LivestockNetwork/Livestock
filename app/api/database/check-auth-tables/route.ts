import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        success: false,
        message: "Missing Supabase environment variables",
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if auth.users table exists and is accessible
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      return NextResponse.json({
        success: false,
        message: `Auth tables check failed: ${authError.message}`,
        details: {
          error: authError.message,
          code: authError.code,
          status: authError.status,
        },
      })
    }

    // Check auth schema tables
    const { data: authTables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "auth")

    return NextResponse.json({
      success: true,
      message: "Auth tables are properly configured",
      details: {
        userCount: authUsers.users?.length || 0,
        authTables: authTables?.map((t) => t.table_name) || [],
        adminAccess: true,
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Auth tables check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      details: {
        error: String(error),
      },
    })
  }
}
