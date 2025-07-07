"use server"

import { redirect } from "next/navigation"
import { signUp } from "@/lib/auth"

interface RegistrationResult {
  success: boolean
  message: string
  user?: any
}

export async function registerUser(prevState: any, formData: FormData): Promise<RegistrationResult> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const state = formData.get("state") as string

  console.log("Registration attempt for:", email, "from state:", state)

  if (!name || !email || !password || !state) {
    return {
      success: false,
      message: "Please fill in all required fields",
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match",
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long",
    }
  }

  // Register with Supabase
  const { user, error } = await signUp(email, password, {
    firstName: name.split(" ")[0],
    lastName: name.split(" ").slice(1).join(" ") || "",
    state,
  })

  if (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: error.message || "Registration failed. Please try again.",
    }
  }

  if (user) {
    console.log("Registration successful for:", email)

    // Send welcome email via existing Resend integration
    try {
      const response = await fetch(`${process.env.VERCEL_URL || "http://localhost:3000"}/api/resend/welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: name.split(" ")[0],
          state,
        }),
      })

      if (!response.ok) {
        console.error("Welcome email failed to send")
      }
    } catch (emailError) {
      console.error("Welcome email error:", emailError)
    }

    // Redirect to dashboard on successful registration
    redirect("/dashboard")
  }

  return {
    success: false,
    message: "Registration failed. Please try again.",
  }
}
