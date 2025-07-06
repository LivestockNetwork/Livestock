"use server"

interface EmailRegistrationResult {
  success: boolean
  message: string
  user?: {
    id: string
    firstName: string
    lastName: string
    userEmail: string
    location: string
    propertyType: string
    primaryInterest: string
  }
}

export async function registerUserWithEmail(prevState: any, formData: FormData): Promise<EmailRegistrationResult> {
  const email = formData.get("email") as string // Gmail credentials
  const password = formData.get("password") as string // Gmail app password
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const userEmail = formData.get("userEmail") as string // User's actual email
  const location = formData.get("location") as string
  const propertyType = formData.get("propertyType") as string
  const primaryInterest = formData.get("primaryInterest") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!firstName || !userEmail || !email || !password) {
    return {
      success: false,
      message: "Please fill in all required fields",
    }
  }

  // Validate email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(userEmail)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid Gmail address for sending emails",
    }
  }

  try {
    // Simulate email sending
    console.log(`Sending welcome email from ${email} to ${userEmail}`)

    // Here you would:
    // 1. Configure nodemailer with Gmail credentials
    // 2. Send welcome email to userEmail
    // 3. Save user to database

    const newUser = {
      id: `user_${Date.now()}`,
      firstName,
      lastName: lastName || "",
      userEmail,
      location: location || "",
      propertyType: propertyType || "",
      primaryInterest: primaryInterest || "",
      registeredAt: new Date().toISOString(),
    }

    return {
      success: true,
      message: `Welcome ${firstName}! Registration successful and welcome email sent to ${userEmail}. Check your inbox for next steps.`,
      user: newUser,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      message: "Registration failed. Please check your Gmail credentials and try again.",
    }
  }
}

export async function sendTestEmailAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const testEmail = formData.get("testEmail") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!email || !password || !testEmail) {
    return {
      success: false,
      message: "Please fill in all required fields",
    }
  }

  try {
    // Simulate sending test email
    console.log(`Sending test email from ${email} to ${testEmail}`)

    return {
      success: true,
      message: `Test email sent successfully from ${email} to ${testEmail}!`,
    }
  } catch (error) {
    console.error("Test email error:", error)
    return {
      success: false,
      message: "Failed to send test email. Please check your credentials.",
    }
  }
}

export async function sendWelcomeEmailAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const recipientEmail = formData.get("recipientEmail") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const location = formData.get("location") as string
  const propertyType = formData.get("propertyType") as string
  const primaryInterest = formData.get("primaryInterest") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (!email || !password || !recipientEmail) {
    return {
      success: false,
      message: "Please fill in all required fields",
    }
  }

  try {
    // Simulate sending welcome email with user details
    console.log(`Sending welcome email from ${email} to ${recipientEmail}`)
    console.log(`User details: ${firstName} ${lastName}, ${location}, ${propertyType}, ${primaryInterest}`)

    return {
      success: true,
      message: `Welcome email sent successfully to ${firstName || recipientEmail}! Check your inbox for the personalized welcome message.`,
    }
  } catch (error) {
    console.error("Welcome email error:", error)
    return {
      success: false,
      message: "Failed to send welcome email. Please check your credentials.",
    }
  }
}
