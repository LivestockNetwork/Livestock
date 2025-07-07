"use server"

import { redirect } from "next/navigation"
import { signIn } from "@/lib/auth"

interface LoginResult {
  success: boolean
  message: string
  user?: any
}

export async function loginUser(prevState: any, formData: FormData): Promise<LoginResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("Login attempt for:", email)

  if (!email || !password) {
    return {
      success: false,
      message: "Please enter both email and password",
    }
  }

  // Sign in with Supabase
  const { user, error } = await signIn(email, password)

  if (error) {
    console.error("Login error:", error)
    return {
      success: false,
      message: "Invalid email or password. Please check your credentials and try again.",
    }
  }

  if (user) {
    console.log("Login successful for:", email)
    // Redirect to dashboard on successful login
    redirect("/dashboard")
  }

  return {
    success: false,
    message: "Login failed. Please try again.",
  }
}
