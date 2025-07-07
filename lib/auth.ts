import { createClient } from "@supabase/supabase-js"

export async function signUp(email: string, password: string, metadata: { full_name: string; state: string }) {
  console.log("🔐 Auth signUp function called with:", { email, hasPassword: !!password, metadata })

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    console.log("📧 Calling Supabase signUp")

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })

    console.log("📊 Supabase signUp response:", {
      hasData: !!data,
      hasUser: !!data?.user,
      hasError: !!error,
      errorMessage: error?.message,
    })

    if (error) {
      console.log("❌ Supabase auth error:", error)
      return { error: error.message }
    }

    if (!data.user) {
      console.log("❌ No user returned from Supabase")
      return { error: "Failed to create user account" }
    }

    console.log("✅ User created successfully:", data.user.id)

    return {
      success: true,
      user: data.user,
      message: "Registration successful! Please check your email to verify your account.",
    }
  } catch (error) {
    console.error("💥 Auth signUp error:", error)
    return {
      error: error instanceof Error ? error.message : "Authentication service error",
    }
  }
}

export async function signIn(email: string, password: string) {
  console.log("🔐 Auth signIn function called with:", { email, hasPassword: !!password })

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log("❌ SignIn error:", error)
      return { error: error.message }
    }

    console.log("✅ SignIn successful")
    return { success: true, user: data.user }
  } catch (error) {
    console.error("💥 Auth signIn error:", error)
    return {
      error: error instanceof Error ? error.message : "Authentication service error",
    }
  }
}

export async function resetPassword(email: string) {
  console.log("🔐 Auth resetPassword function called with:", { email })

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password`,
    })

    if (error) {
      console.log("❌ Reset password error:", error)
      return { error: error.message }
    }

    console.log("✅ Reset password email sent successfully")
    return {
      success: true,
      message: "Password reset email sent! Please check your inbox.",
    }
  } catch (error) {
    console.error("💥 Auth resetPassword error:", error)
    return {
      error: error instanceof Error ? error.message : "Password reset service error",
    }
  }
}
