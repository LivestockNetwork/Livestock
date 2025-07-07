import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { User } from "@supabase/supabase-js"

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  state?: string
  property_type?: string
  livestock_types?: string[]
  is_admin?: boolean
}

export function isAdmin(user: User | null): boolean {
  if (!user) return false
  return user.app_metadata?.is_admin === true
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = createClientComponentClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase.from("user_profiles").select("*").eq("id", userId).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return data
}

export async function signOut(): Promise<void> {
  const supabase = createClientComponentClient()
  await supabase.auth.signOut()
}
