"use server"

import { emailService } from "@/lib/direct-email-service"
import { revalidatePath } from "next/cache"

export interface UserOnboardingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  postcode: string
  suburb: string
  state: string
  propertyName: string
  propertyType: string
  propertySize: string
  livestock: string[]
  equipment: string[]
  skills: string[]
  helpOffer: string
  helpNeed: string
  emergencyContact: string
  notifications: {
    emergency: boolean
    community: boolean
    equipment: boolean
    livestock: boolean
  }
  privacy: string
}

export async function saveUserOnboardingData(data: UserOnboardingData) {
  try {
    // Simulate saving to database
    console.log("Saving user onboarding data:", data)

    // In a real app, you would save to your database here
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Send welcome email if email service is available
    if (emailService && data.notifications.community) {
      try {
        const emailResult = await emailService.sendWelcomeEmail(data.email, data.firstName)
        if (emailResult.success) {
          console.log("Welcome email sent successfully")
        }
      } catch (error) {
        console.error("Failed to send welcome email:", error)
        // Don't fail the entire process if email fails
      }
    }

    revalidatePath("/")

    return {
      success: true,
      message: `Welcome to Rural Community Hub, ${data.firstName}!`,
    }
  } catch (error) {
    console.error("Error saving user onboarding data:", error)
    return {
      success: false,
      error: "Failed to save user data. Please try again.",
    }
  }
}

export async function submitUserOnboarding(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) {
    return {
      message: "Missing fields",
    }
  }

  // Simulate saving to a database
  console.log("Saving to database", name, email)

  // Send welcome email using the direct email service
  if (emailService) {
    const emailResult = await emailService.sendWelcomeEmail(email, name)

    if (emailResult.success) {
      console.log("✅ Welcome email sent successfully:", emailResult.message)
    } else {
      console.error("❌ Failed to send welcome email:", emailResult.error)
      // Don't fail the entire onboarding process if email fails
    }
  }

  revalidatePath("/")

  return {
    message: "User onboarding complete",
  }
}
