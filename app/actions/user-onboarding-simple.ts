"use server"

import { sendWelcomeEmail } from "@/lib/simple-email-service"

export async function registerUser(formData: FormData) {
  console.log("Server Action - Registration started")

  try {
    // Extract form data
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const location = formData.get("location") as string
    const propertyType = formData.get("propertyType") as string
    const primaryInterest = formData.get("primaryInterest") as string

    console.log("Server Action - Form data:", {
      firstName,
      lastName,
      email,
      location,
      propertyType,
      primaryInterest,
    })

    // Validate required fields
    if (!firstName || !email) {
      console.log("Server Action - Missing required fields")
      return {
        success: false,
        message: "First name and email are required",
      }
    }

    // Simulate user registration (in real app, save to database)
    console.log("Server Action - Simulating user registration...")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Send welcome email
    console.log("Server Action - Sending welcome email...")
    const emailResult = await sendWelcomeEmail(email, {
      firstName,
      lastName,
      email,
      location,
      propertyType,
      primaryInterest,
    })

    if (emailResult.success) {
      console.log("Server Action - Registration completed successfully")
      return {
        success: true,
        message: `Registration successful! Welcome email sent to ${email}`,
      }
    } else {
      console.log("Server Action - Email failed but registration succeeded")
      return {
        success: true,
        message: `Registration successful, but welcome email failed: ${emailResult.message}`,
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
