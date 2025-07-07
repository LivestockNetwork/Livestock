import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const { email, password, action } = await request.json()

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    let result: any

    if (action === "signup") {
      result = await supabase.auth.signUp({
        email,
        password,
      })
    } else if (action === "signin") {
      result = await supabase.auth.signInWithPassword({
        email,
        password,
      })
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      success: !result.error,
      data: result.data,
      error: result.error?.message,
      fullError: result.error,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
