"use server"

interface PasswordResetResult {
  success: boolean
  message: string
}

export async function sendPasswordReset(prevState: any, formData: FormData): Promise<PasswordResetResult> {
  const email = formData.get("email") as string

  console.log("Password reset requested for:", email)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

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

  try {
    // Here you would normally:
    // 1. Check if user exists in database
    // 2. Generate password reset token
    // 3. Send email with reset link
    // 4. Store token with expiration

    // For now, simulate successful email sending
    console.log("Password reset email would be sent to:", email)

    // In production, you'd call your email service:
    // await sendPasswordResetEmail(email, resetToken)

    return {
      success: true,
      message: "If an account with this email exists, you will receive a password reset link shortly.",
    }
  } catch (error) {
    console.error("Password reset error:", error)
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    }
  }
}
