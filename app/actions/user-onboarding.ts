"use server"

import { emailService } from "@/lib/direct-email-service"
import { revalidatePath } from "next/cache"
import type { UserOnboardingData } from "@/components/user-onboarding"

export async function saveUserOnboardingData(data: UserOnboardingData) {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would typically save to a database
    console.log("Saving user onboarding data:", data)

    // Simulate successful save
    return {
      success: true,
      message: `Welcome to Rural Community Hub, ${data.firstName}! Your account has been created successfully.`,
      userId: `user_${Date.now()}`,
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

export type { UserOnboardingData }
