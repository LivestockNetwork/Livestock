import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface UserProfile {
  id: string
  first_name: string
  last_name?: string
  email: string
  phone?: string
  location?: string
  state?: string
  postcode?: string
  property_type?: string
  property_size?: string
  created_at: string
  updated_at: string
}

export interface EmergencyPlan {
  id: string
  user_id: string
  plan_type: "bushfire" | "flood" | "drought" | "cyclone" | "general"
  plan_data: any
  is_complete: boolean
  created_at: string
  updated_at: string
}

export interface CommunityPost {
  id: string
  user_id: string
  title: string
  content: string
  post_type: "general" | "emergency" | "marketplace" | "help"
  location?: string
  state?: string
  created_at: string
  updated_at: string
}

export interface EmergencyAlert {
  id: string
  alert_type: "bushfire" | "flood" | "severe_weather" | "drought"
  title: string
  message: string
  affected_areas: string[]
  severity: "low" | "medium" | "high" | "extreme"
  active: boolean
  created_at: string
  expires_at: string
}
