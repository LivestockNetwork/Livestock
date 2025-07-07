"use server"

import { resetPassword } from "@/lib/auth"

interface PasswordResetResult {
  success: boolean
  message: string
}

export async function sendPasswordReset(prevState: any, formData: FormData): Promise<PasswordResetResult> {
  const email = formData.get("email") as string

  console.log("Password reset requested for:", email)

  if (!email) {
    return {
      success: false,
      message: "Please enter your email address",
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  // Send password reset email via Supabase
  const { error } = await resetPassword(email)

  if (error) {
    console.error("Password reset error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }

  return {
    success: true,
    message: "If an account with this email exists, you will receive a password reset link shortly.",
  }
}
