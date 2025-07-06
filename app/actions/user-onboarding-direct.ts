"use server"

import { directEmailService } from "@/lib/direct-email-service"

interface UserOnboardingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  suburb: string
  postcode: string
  state: string
  propertyType: string
  propertySize: string
  primaryLivestock: string[]
  emergencyContacts: {
    name: string
    relationship: string
    phone: string
    email: string
  }[]
  hasEmergencyPlan: boolean
  communicationPreferences: {
    email: boolean
    sms: boolean
    push: boolean
  }
  interests: string[]
}

interface ActionResult {
  success: boolean
  message: string
  userId?: string
  error?: string
}

export async function saveUserOnboardingDataDirect(formData: FormData): Promise<ActionResult> {
  try {
    // Extract form data
    const userData: UserOnboardingData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      suburb: formData.get("suburb") as string,
      postcode: formData.get("postcode") as string,
      state: formData.get("state") as string,
      propertyType: formData.get("propertyType") as string,
      propertySize: formData.get("propertySize") as string,
      primaryLivestock: JSON.parse((formData.get("primaryLivestock") as string) || "[]"),
      emergencyContacts: JSON.parse((formData.get("emergencyContacts") as string) || "[]"),
      hasEmergencyPlan: formData.get("hasEmergencyPlan") === "true",
      communicationPreferences: JSON.parse((formData.get("communicationPreferences") as string) || "{}"),
      interests: JSON.parse((formData.get("interests") as string) || "[]"),
    }

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "email", "suburb", "state"]
    for (const field of requiredFields) {
      if (!userData[field as keyof UserOnboardingData]) {
        return {
          success: false,
          message: `${field} is required`,
          error: `Missing required field: ${field}`,
        }
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
        error: "Invalid email format",
      }
    }

    // Generate user ID (in production, this would come from your database)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Save to database (mock implementation)
    // In production, you would save to your actual database
    console.log("Saving user data:", { userId, ...userData })

    // Send welcome email using direct email service
    if (directEmailService && userData.communicationPreferences.email) {
      try {
        const emailResult = await directEmailService.sendWelcomeEmail({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          suburb: userData.suburb,
          state: userData.state,
          propertyType: userData.propertyType,
        })

        if (!emailResult.success) {
          console.warn("Failed to send welcome email:", emailResult.error)
          // Don't fail the entire onboarding process if email fails
        } else {
          console.log("Welcome email sent successfully:", emailResult.messageId)
        }
      } catch (emailError) {
        console.error("Welcome email error:", emailError)
        // Continue with onboarding even if email fails
      }
    }

    return {
      success: true,
      message: `Welcome to Rural Community Hub, ${userData.firstName}! Your account has been created successfully.`,
      userId,
    }
  } catch (error) {
    console.error("User onboarding error:", error)
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function sendEmergencyAlertDirect(
  recipients: string[],
  alert: {
    title: string
    message: string
    severity: "low" | "medium" | "high" | "critical"
    location: string
  },
): Promise<ActionResult> {
  try {
    if (!directEmailService) {
      return {
        success: false,
        message: "Email service not configured",
        error: "Direct email service not available",
      }
    }

    const result = await directEmailService.sendEmergencyAlert(recipients, alert)

    if (result.success) {
      return {
        success: true,
        message: `Emergency alert sent to ${recipients.length} recipients`,
      }
    } else {
      return {
        success: false,
        message: "Failed to send emergency alert",
        error: result.error,
      }
    }
  } catch (error) {
    console.error("Emergency alert error:", error)
    return {
      success: false,
      message: "Failed to send emergency alert",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
