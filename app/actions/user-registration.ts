"use server"

import { createClient } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export async function registerUser(prevState: any, formData: FormData) {
  console.log("🔍 Registration server action started")

  try {
    // Extract form data with detailed logging
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const state = formData.get("state") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    console.log("📝 Form data:", { fullName, email, state, hasPassword: !!password })

    // Basic validation
    if (!fullName || !email || !state || !password || !confirmPassword) {
      console.log("❌ Missing required fields")
      return {
        success: false,
        error: "All fields are required",
      }
    }

    if (password !== confirmPassword) {
      console.log("❌ Passwords don't match")
      return {
        success: false,
        error: "Passwords do not match",
      }
    }

    if (password.length < 6) {
      console.log("❌ Password too short")
      return {
        success: false,
        error: "Password must be at least 6 characters",
      }
    }

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("🔧 Environment check:", {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      urlPreview: supabaseUrl?.substring(0, 30) + "...",
    })

    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("❌ Missing environment variables")
      return {
        success: false,
        error: "Server configuration error",
      }
    }

    // Create Supabase admin client
    console.log("🔗 Creating Supabase client")
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Create user account
    console.log("👤 Creating user account")
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        state: state,
      },
    })

    if (authError) {
      console.log("❌ Auth error:", authError)
      return {
        success: false,
        error: `Registration failed: ${authError.message}`,
      }
    }

    if (!authData.user) {
      console.log("❌ No user created")
      return {
        success: false,
        error: "Failed to create user account",
      }
    }

    console.log("✅ User created:", authData.user.id)

    // Create user profile
    console.log("📋 Creating user profile")
    const { error: profileError } = await supabase.from("user_profiles").insert({
      id: authData.user.id,
      email: email,
      first_name: fullName.split(" ")[0],
      last_name: fullName.split(" ").slice(1).join(" "),
      state: state,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.log("⚠️ Profile error (non-fatal):", profileError)
    } else {
      console.log("✅ Profile created")
    }

    console.log("🎉 Registration complete, redirecting")
  } catch (error) {
    console.error("💥 Server action error:", error)
    return {
      success: false,
      error: `Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }

  // Redirect on success
  redirect("/dashboard")
}
