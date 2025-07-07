import { supabase } from "./supabase"
import type { UserProfile } from "./supabase"

export async function signUp(
  email: string,
  password: string,
  userData: {
    firstName: string
    lastName?: string
    state?: string
    location?: string
    propertyType?: string
  },
) {
  try {
    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName || "",
        },
      },
    })

    if (authError) throw authError

    // Create user profile
    if (authData.user) {
      const { error: profileError } = await supabase.from("user_profiles").insert({
        id: authData.user.id,
        first_name: userData.firstName,
        last_name: userData.lastName || "",
        email: email,
        state: userData.state,
        location: userData.location,
        property_type: userData.propertyType,
      })

      if (profileError) throw profileError
    }

    return { user: authData.user, error: null }
  } catch (error) {
    console.error("Sign up error:", error)
    return { user: null, error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { user: data.user, error: null }
  } catch (error) {
    console.error("Sign in error:", error)
    return { user: null, error }
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Sign out error:", error)
    return { error }
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) throw error
    return { error: null }
  } catch (error) {
    console.error("Password reset error:", error)
    return { error }
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()
    if (error) throw error
    return { user, error: null }
  } catch (error) {
    console.error("Get current user error:", error)
    return { user: null, error }
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

    if (error) throw error
    return data
  } catch (error) {
    console.error("Get user profile error:", error)
    return null
  }
}
