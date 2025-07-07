"use server"

import { createClient } from "@supabase/supabase-js"

export async function registerUserSimple(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string
    const state = formData.get("state") as string
    const postcode = formData.get("postcode") as string
    const propertyType = formData.get("propertyType") as string

    console.log("🚀 Starting registration for:", email)

    // Validate required fields
    if (!email || !password || !fullName) {
      return {
        success: false,
        error: "Missing required fields",
      }
    }

    // Get environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("❌ Missing environment variables")
      return {
        success: false,
        error: "Server configuration error",
      }
    }

    // Create Supabase client (using anon key for user registration)
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    console.log("🔐 Attempting to create user account...")

    // Create user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          state,
          postcode,
          property_type: propertyType,
        },
      },
    })

    if (authError) {
      console.error("❌ Auth error:", authError.message)
      return {
        success: false,
        error: authError.message,
      }
    }

    if (!authData.user) {
      console.error("❌ No user data returned")
      return {
        success: false,
        error: "Failed to create user account",
      }
    }

    console.log("✅ User created successfully:", authData.user.id)

    // Try to create profile record
    try {
      const { error: profileError } = await supabase.from("user_profiles").insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        state,
        postcode,
        property_type: propertyType,
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        console.warn("⚠️ Profile creation failed:", profileError.message)
        // Don't fail the registration if profile creation fails
      } else {
        console.log("✅ Profile created successfully")
      }
    } catch (profileError) {
      console.warn("⚠️ Profile creation error:", profileError)
      // Continue anyway
    }

    console.log("🎉 Registration completed successfully")

    return {
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
      userId: authData.user.id,
    }
  } catch (error) {
    console.error("💥 Registration error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    }
  }
}
