import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side client with service role key for admin operations
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

export async function signUp(email: string, password: string, fullName: string, state: string) {
  try {
    // Validate environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration")
    }

    // Create user account
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for now
      user_metadata: {
        full_name: fullName,
        state: state,
      },
    })

    if (authError) {
      console.error("Auth error:", authError)
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error("Failed to create user")
    }

    // Create user profile
    const { error: profileError } = await supabaseAdmin.from("user_profiles").insert({
      id: authData.user.id,
      email: email,
      full_name: fullName,
      state: state,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (profileError) {
      console.error("Profile error:", profileError)
      // Don't throw here - user is created, profile creation is secondary
    }

    return {
      success: true,
      user: authData.user,
      message: "Account created successfully",
    }
  } catch (error) {
    console.error("SignUp error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    }
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration")
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
    }
  } catch (error) {
    console.error("SignIn error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Login failed",
    }
  }
}

export async function resetPassword(email: string) {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration")
    }

    const { error } = await supabaseAdmin.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password`,
    })

    if (error) {
      throw new Error(error.message)
    }

    return {
      success: true,
      message: "Password reset email sent",
    }
  } catch (error) {
    console.error("Reset password error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Password reset failed",
    }
  }
}
