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

  const { data: profile } = await supabase.from("user_profiles").select("*").eq("id", user.id).single()

  const { data: emergencyPlans } = await supabase.from("emergency_plans").select("*").eq("user_id", user.id)

  const { data: alerts } = await supabase
    .from("emergency_alerts")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })

  return <DashboardClient user={user} profile={profile} emergencyPlans={emergencyPlans || []} alerts={alerts || []} />
}
