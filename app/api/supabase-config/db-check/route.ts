import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({
        success: false,
        error: "Missing environment variables",
      })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Test database connection
    const { data, error } = await supabase.from("auth.users").select("count").limit(1)

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: {
          code: error.code,
          hint: error.hint,
        },
      })
    }

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      data: data,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
