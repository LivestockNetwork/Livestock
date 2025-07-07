import { supabase } from "./supabase"

export interface EmergencyAlert {
  id: string
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  active: boolean
  created_at: string
  updated_at: string
}

export interface EmergencyPlan {
  id: string
  user_id: string
  title: string
  plan_type: string
  content: any
  created_at: string
  updated_at: string
}

export async function getActiveEmergencyAlerts(): Promise<EmergencyAlert[]> {
  const { data, error } = await supabase
    .from("emergency_alerts")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching emergency alerts:", error)
    throw error
  }

  return data || []
}

export async function createEmergencyAlert(alert: Omit<EmergencyAlert, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("emergency_alerts").insert([alert]).select().single()

  if (error) {
    console.error("Error creating emergency alert:", error)
    throw error
  }

  return data
}

export async function getUserEmergencyPlans(): Promise<EmergencyPlan[]> {
  const { data, error } = await supabase.from("emergency_plans").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching emergency plans:", error)
    throw error
  }

  return data || []
}

export async function createEmergencyPlan(plan: Omit<EmergencyPlan, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("emergency_plans").insert([plan]).select().single()

  if (error) {
    console.error("Error creating emergency plan:", error)
    throw error
  }

  return data
}

export async function updateEmergencyPlan(id: string, updates: Partial<EmergencyPlan>) {
  const { data, error } = await supabase.from("emergency_plans").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating emergency plan:", error)
    throw error
  }

  return data
}
