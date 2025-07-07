import { supabase } from "./supabase"

export interface CommunityPost {
  id: string
  user_id: string
  title: string
  content: string
  post_type: "general" | "emergency" | "resource" | "question"
  created_at: string
  updated_at: string
  user_profiles?: {
    full_name: string
    location: string
  }
}

export async function getCommunityPosts(): Promise<CommunityPost[]> {
  const { data, error } = await supabase
    .from("community_posts")
    .select(`
      *,
      user_profiles (
        full_name,
        location
      )
    `)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching community posts:", error)
    throw error
  }

  return data || []
}

export async function createCommunityPost(
  post: Omit<CommunityPost, "id" | "created_at" | "updated_at" | "user_profiles">,
) {
  const { data, error } = await supabase
    .from("community_posts")
    .insert([post])
    .select(`
      *,
      user_profiles (
        full_name,
        location
      )
    `)
    .single()

  if (error) {
    console.error("Error creating community post:", error)
    throw error
  }

  return data
}

export async function updateCommunityPost(id: string, updates: Partial<CommunityPost>) {
  const { data, error } = await supabase
    .from("community_posts")
    .update(updates)
    .eq("id", id)
    .select(`
      *,
      user_profiles (
        full_name,
        location
      )
    `)
    .single()

  if (error) {
    console.error("Error updating community post:", error)
    throw error
  }

  return data
}

export async function deleteCommunityPost(id: string) {
  const { error } = await supabase.from("community_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting community post:", error)
    throw error
  }
}
