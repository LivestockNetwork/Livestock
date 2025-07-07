import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export interface EmergencyAlert {
  id: string
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  alert_type: "bushfire" | "flood" | "drought" | "storm" | "other"
  affected_areas: string[]
  active: boolean
  created_at: string
  expires_at?: string
}

export interface EmergencyPlan {
  id: string
  user_id: string
  plan_name: string
  emergency_type: string
  livestock_details: any
  evacuation_plan: any
  contact_details: any
  created_at: string
  updated_at: string
}

export class EmergencyService {
  private supabase = createClientComponentClient()

  // Emergency Alerts (Admin only for create/update/delete)
  async getActiveAlerts(): Promise<EmergencyAlert[]> {
    const { data, error } = await this.supabase
      .from("emergency_alerts")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async createAlert(alert: Omit<EmergencyAlert, "id" | "created_at">): Promise<EmergencyAlert> {
    const { data, error } = await this.supabase.from("emergency_alerts").insert(alert).select().single()

    if (error) throw error
    return data
  }

  async updateAlert(id: string, updates: Partial<EmergencyAlert>): Promise<EmergencyAlert> {
    const { data, error } = await this.supabase.from("emergency_alerts").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  async deleteAlert(id: string): Promise<void> {
    const { error } = await this.supabase.from("emergency_alerts").delete().eq("id", id)

    if (error) throw error
  }

  // Emergency Plans (User-specific)
  async getUserPlans(): Promise<EmergencyPlan[]> {
    const { data, error } = await this.supabase
      .from("emergency_plans")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async createPlan(plan: Omit<EmergencyPlan, "id" | "created_at" | "updated_at">): Promise<EmergencyPlan> {
    const { data, error } = await this.supabase.from("emergency_plans").insert(plan).select().single()

    if (error) throw error
    return data
  }

  async updatePlan(id: string, updates: Partial<EmergencyPlan>): Promise<EmergencyPlan> {
    const { data, error } = await this.supabase
      .from("emergency_plans")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deletePlan(id: string): Promise<void> {
    const { error } = await this.supabase.from("emergency_plans").delete().eq("id", id)

    if (error) throw error
  }
}
