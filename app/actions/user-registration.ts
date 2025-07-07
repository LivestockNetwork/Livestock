"use server"

import { signUp } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const state = formData.get("state") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Validation
    if (!fullName || !email || !state || !password || !confirmPassword) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords do not match",
      }
    }

    if (password.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters",
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Register user
    const result = await signUp(email, password, fullName, state)

    if (!result.success) {
      return {
        success: false,
        error: result.error || "Registration failed",
      }
    }

    // Success - redirect to dashboard
    redirect("/dashboard")
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Registration failed",
    }
  }
}
