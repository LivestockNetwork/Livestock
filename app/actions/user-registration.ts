"use server"

import { signUp } from "@/lib/auth"

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const state = formData.get("state") as string

    // Validation
    if (!name || !email || !password || !confirmPassword || !state) {
      return {
        success: false,
        message: "All fields are required",
        user: null,
      }
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
        user: null,
      }
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
        user: null,
      }
    }

    // Register user with Supabase
    const result = await signUp(email, password, {
      full_name: name,
      state: state,
    })

    if (result.error) {
      return {
        success: false,
        message: result.error.message || "Registration failed",
        user: null,
      }
    }

    // Registration successful
    return {
      success: true,
      message: "Registration successful! Please check your email to verify your account.",
      user: result.user,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "Registration failed. Please try again.",
      user: null,
    }
  }
}
