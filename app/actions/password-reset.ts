"use server"

export async function sendPasswordReset(prevState: any, formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return {
      success: false,
      message: "Please enter your email address",
    }
  }

  try {
    // Here you would integrate with your email service (Resend)
    // For now, we'll simulate the process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log(`Password reset email would be sent to: ${email}`)

    return {
      success: true,
      message: "If an account exists with this email, you will receive a reset link shortly.",
    }
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    }
  }
}
