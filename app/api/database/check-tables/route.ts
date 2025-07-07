import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        message: "Missing Supabase environment variables",
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Check for our custom tables
    const { data: publicTables, error: publicError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")

    if (publicError) {
      return NextResponse.json({
        success: false,
        message: `Failed to check custom tables: ${publicError.message}`,
        details: {
          error: publicError.message,
          code: publicError.code,
        },
      })
    }

    // Check if our expected tables exist
    const tableNames = publicTables?.map((t) => t.table_name) || []
    const expectedTables = ["users", "communities", "emergency_plans", "posts"]
    const existingTables = expectedTables.filter((table) => tableNames.includes(table))
    const missingTables = expectedTables.filter((table) => !tableNames.includes(table))

    return NextResponse.json({
      success: existingTables.length > 0,
      message: `Found ${existingTables.length} of ${expectedTables.length} expected tables`,
      details: {
        allTables: tableNames,
        existingTables,
        missingTables,
        totalTablesInPublic: tableNames.length,
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Custom tables check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      details: {
        error: String(error),
        type: "tables_check_error",
      },
    })
  }
}
