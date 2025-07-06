"use server"

import { sendTestEmailWithCredentials, sendWelcomeEmailWithCredentials } from "@/lib/browser-email-service"

export async function sendTestEmailAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const toEmail = formData.get("toEmail") as string

    console.log("Server Action - Test email request:", { email, toEmail })

    if (!email || !password || !toEmail) {
      return {
        success: false,
        message: "Missing required fields: email, password, or recipient email",
      }
    }

    const credentials = { email, password }
    const result = await sendTestEmailWithCredentials(credentials, toEmail)

    console.log("Server Action - Test email result:", result)
    return result
  } catch (error: any) {
    console.error("Server Action - Test email error:", error)
    return {
      success: false,
      message: `Test email failed: ${error.message}`,
    }
  }
}

export async function sendWelcomeEmailAction(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const toEmail = formData.get("toEmail") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const location = formData.get("location") as string
    const propertyType = formData.get("propertyType") as string
    const primaryInterest = formData.get("primaryInterest") as string

    console.log("Server Action - Welcome email request:", { email, toEmail, firstName })

    if (!email || !password || !toEmail) {
      return {
        success: false,
        message: "Missing required fields: email, password, or recipient email",
      }
    }

    const credentials = { email, password }
    const userData = {
      firstName,
      lastName,
      email: toEmail,
      location,
      propertyType,
      primaryInterest,
    }

    const result = await sendWelcomeEmailWithCredentials(credentials, toEmail, userData)

    console.log("Server Action - Welcome email result:", result)
    return result
  } catch (error: any) {
    console.error("Server Action - Welcome email error:", error)
    return {
      success: false,
      message: `Welcome email failed: ${error.message}`,
    }
  }
}

export async function registerUserWithEmail(formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const userEmail = formData.get("userEmail") as string
    const location = formData.get("location") as string
    const propertyType = formData.get("propertyType") as string
    const primaryInterest = formData.get("primaryInterest") as string

    console.log("Server Action - User registration:", { firstName, userEmail })

    if (!email || !password || !userEmail || !firstName) {
      return {
        success: false,
        message: "Missing required fields",
      }
    }

    // Simulate user registration
    console.log("Server Action - Registering user:", {
      firstName,
      lastName,
      email: userEmail,
      location,
      propertyType,
      primaryInterest,
    })

    // Send welcome email
    const credentials = { email, password }
    const userData = {
      firstName,
      lastName,
      email: userEmail,
      location,
      propertyType,
      primaryInterest,
    }

    const emailResult = await sendWelcomeEmailWithCredentials(credentials, userEmail, userData)

    if (emailResult.success) {
      return {
        success: true,
        message: `Registration successful! Welcome email sent to ${userEmail}`,
      }
    } else {
      return {
        success: false,
        message: `Registration completed but email failed: ${emailResult.message}`,
      }
    }
  } catch (error: any) {
    console.error("Server Action - Registration error:", error)
    return {
      success: false,
      message: `Registration failed: ${error.message}`,
    }
  }
}
