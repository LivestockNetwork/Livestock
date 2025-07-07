import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface CommunityPost {
  id: string
  user_id: string
  title: string
  content: string
  post_type: "discussion" | "help_request" | "resource_share" | "alert"
  tags?: string[]
  location?: string
  created_at: string
  updated_at: string
  user_profiles?: {
    full_name: string
    state: string
  }
}

export class CommunityService {
  private supabase = createClientComponentClient()

  async getPosts(limit = 20, offset = 0): Promise<CommunityPost[]> {
    const { data, error } = await this.supabase
      .from("community_posts")
      .select(`
        *,
        user_profiles (
          full_name,
          state
        )
      `)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    return data || []
  }

  async createPost(
    post: Omit<CommunityPost, "id" | "created_at" | "updated_at" | "user_profiles">,
  ): Promise<CommunityPost> {
    const { data, error } = await this.supabase
      .from("community_posts")
      .insert(post)
      .select(`
        *,
        user_profiles (
          full_name,
          state
        )
      `)
      .single()

    if (error) throw error
    return data
  }

  async updatePost(id: string, updates: Partial<CommunityPost>): Promise<CommunityPost> {
    const { data, error } = await this.supabase
      .from("community_posts")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select(`
        *,
        user_profiles (
          full_name,
          state
        )
      `)
      .single()

    if (error) throw error
    return data
  }

  async deletePost(id: string): Promise<void> {
    const { error } = await this.supabase.from("community_posts").delete().eq("id", id)

    if (error) throw error
  }

  async getPostsByType(postType: string): Promise<CommunityPost[]> {
    const { data, error } = await this.supabase
      .from("community_posts")
      .select(`
        *,
        user_profiles (
          full_name,
          state
        )
      `)
      .eq("post_type", postType)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }
}
