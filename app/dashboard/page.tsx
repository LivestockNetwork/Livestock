import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardClient from "./dashboard-client"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user profile data
  const { data: profile } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single()

  // Fetch emergency plans
  const { data: emergencyPlans } = await supabase
    .from("emergency_plans")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Fetch recent community posts
  const { data: communityPosts } = await supabase
    .from("community_posts")
    .select(`
      *,
      user_profiles (
        full_name,
        state,
        property_type
      )
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <DashboardClient
      user={user}
      profile={profile}
      emergencyPlans={emergencyPlans || []}
      communityPosts={communityPosts || []}
    />
  )
}
