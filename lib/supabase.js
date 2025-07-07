// supabase.js
import { createClient } from "@supabase/supabase-js"

// These environment variables should be set in your project
// For Next.js, we use NEXT_PUBLIC_ prefix for client-side access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const auth = {
  // Get the current user session
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error("Error getting session:", error.message)
      return null
    }
    return data.session
  },

  // Get the current user
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) {
      console.error("Error getting user:", error.message)
      return null
    }
    return data.user
  },

  // Sign up a new user
  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Sign in a user
  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Reset password
  resetPassword: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (error) throw error
  },

  // Update password
  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    if (error) throw error
  },

  // Set up auth state change listener
  onAuthStateChange: (callback) => {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  },
}

// User profile helpers
export const userProfiles = {
  // Get a user's profile
  getProfile: async (userId) => {
    const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

    if (error) {
      console.error("Error fetching profile:", error.message)
      return null
    }
    return data
  },

  // Create or update a user's profile
  upsertProfile: async (profile) => {
    const { data, error } = await supabase.from("user_profiles").upsert(profile, { onConflict: "id" }).select()

    if (error) throw error
    return data
  },
}

export default supabase
