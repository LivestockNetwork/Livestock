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
        details: {
          hasUrl: !!supabaseUrl,
          hasAnonKey: !!supabaseAnonKey,
        },
      })
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Test basic database connection
    const { data, error } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .limit(5)

    if (error) {
      return NextResponse.json({
        success: false,
        message: `Database connection failed: ${error.message}`,
        details: {
          error: error.message,
          code: error.code,
          hint: error.hint,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      details: {
        tablesFound: data?.length || 0,
        sampleTables: data?.map((t) => t.table_name) || [],
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Database connection error: ${error instanceof Error ? error.message : "Unknown error"}`,
      details: {
        error: String(error),
        type: "connection_error",
      },
    })
  }
}
