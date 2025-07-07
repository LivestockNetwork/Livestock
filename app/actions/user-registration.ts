"use server"

import { redirect } from "next/navigation"

export async function registerUser(prevState: any, formData: FormData) {
  try {
    console.log("=== REGISTRATION DEBUG START ===")

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const state = formData.get("state") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    console.log("Form data received:", { fullName, email, state, hasPassword: !!password })

    // Validation
    if (!fullName || !email || !state || !password || !confirmPassword) {
      console.log("Validation failed: missing fields")
      return {
        success: false,
        error: "All fields are required",
      }
    }

    if (password !== confirmPassword) {
      console.log("Validation failed: passwords don't match")
      return {
        success: false,
        error: "Passwords do not match",
      }
    }

    if (password.length < 6) {
      console.log("Validation failed: password too short")
      return {
        success: false,
        error: "Password must be at least 6 characters",
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Validation failed: invalid email")
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    console.log("All validations passed, attempting Supabase registration...")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("Environment check:", {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      urlStart: supabaseUrl?.substring(0, 20) + "...",
    })

    if (!supabaseUrl || !supabaseServiceKey) {
      console.log("Missing environment variables")
      return {
        success: false,
        error: "Server configuration error - missing environment variables",
      }
    }

    // Import and use Supabase directly here to avoid import issues
    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log("Supabase client created, attempting user creation...")

    // Create user with admin API
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
      console.log("Supabase auth error:", authError)
      return {
        success: false,
        error: `Registration failed: ${authError.message}`,
      }
    }

    if (!authData.user) {
      console.log("No user returned from Supabase")
      return {
        success: false,
        error: "Registration failed - no user created",
      }
    }

    console.log("User created successfully:", authData.user.id)

    // Create user profile
    const { error: profileError } = await supabase.from("user_profiles").insert({
      id: authData.user.id,
      email: email,
      full_name: fullName,
      state: state,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.log("Profile creation error (non-fatal):", profileError)
      // Don't fail registration if profile creation fails
    } else {
      console.log("Profile created successfully")
    }

    console.log("=== REGISTRATION SUCCESS ===")

    // Redirect to dashboard
    redirect("/dashboard")
  } catch (error) {
    console.error("=== REGISTRATION ERROR ===", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed - unknown error",
    }
  }
}
