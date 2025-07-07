import { supabase } from "./supabase"

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) {
    console.error("Error getting user:", error)
    return null
  }
  return user
}

export async function isUserAdmin(user: any) {
  if (!user) return false
  return user.app_metadata?.is_admin === true
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error("Error signing out:", error)
    throw error
  }
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Error signing in:", error)
    throw error
  }

  return data
}

export async function signUpWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error("Error signing up:", error)
    throw error
  }

  return data
}
