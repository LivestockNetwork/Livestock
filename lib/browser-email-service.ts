export interface EmailCredentials {
  email: string
  password: string
}

export async function sendTestEmailWithCredentials(credentials: EmailCredentials, toEmail: string) {
  console.log("Email Service - Sending test email to:", toEmail)
  console.log("Email Service - Using email:", credentials.email)

  try {
    // Use fetch to call our API route instead of nodemailer directly
    const response = await fetch("/api/email/send-test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentials,
        toEmail,
      }),
    })

    const result = await response.json()
    console.log("Email Service - Test email result:", result)
    return result
  } catch (error: any) {
    console.error("Email Service - Send email error:", error)
    return { success: false, message: `Failed to send email: ${error.message}` }
  }
}

export async function sendWelcomeEmailWithCredentials(credentials: EmailCredentials, toEmail: string, userData: any) {
  console.log("Email Service - Sending welcome email to:", toEmail)
  console.log("Email Service - Using email:", credentials.email)

  try {
    // Use fetch to call our API route instead of nodemailer directly
    const response = await fetch("/api/email/send-welcome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credentials,
        toEmail,
        userData,
      }),
    })

    const result = await response.json()
    console.log("Email Service - Welcome email result:", result)
    return result
  } catch (error: any) {
    console.error("Email Service - Send email error:", error)
    return { success: false, message: `Failed to send welcome email: ${error.message}` }
  }
}
