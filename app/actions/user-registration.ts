"use server"

import { userStorage } from "@/lib/user-storage"

interface RegistrationResult {
  success: boolean
  message: string
  redirectTo?: string
  user?: {
    id: string
    name: string
    email: string
    state: string
    location: string
  }
}

interface RegistrationData {
  name: string
  email: string
  phone: string
  location: string
  state: string
  postcode: string
  propertyType: string
  livestock: string[]
  emergencyContacts: Array<{
    name: string
    phone: string
    relationship: string
  }>
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    emergencyAlerts: boolean
    communityUpdates: boolean
  }
}

// In-memory storage for demo purposes
const users: Array<RegistrationData & { id: string; password: string; createdAt: Date }> = []

export async function registerUser(formData: FormData): Promise<RegistrationResult> {
  console.log("User Registration - Starting registration process...")

  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const location = formData.get("location") as string
    const state = formData.get("state") as string
    const postcode = formData.get("postcode") as string
    const propertyType = formData.get("propertyType") as string
    const emergencyContact = formData.get("emergencyContact") as string
    const emergencyPhone = formData.get("emergencyPhone") as string
    const hasLivestock = formData.get("hasLivestock") === "on"
    const livestockTypes = formData.getAll("livestockTypes") as string[]
    const agreedToTerms = formData.get("agreedToTerms") === "on"
    const wantsUpdates = formData.get("wantsUpdates") === "on"
    const password = formData.get("password") as string

    console.log("🚀 Registration attempt started")

    console.log("📝 Registration data:", { firstName, lastName, email, state })

    // Validation
    if (!firstName || !lastName || !email || !password || !state || !postcode || !propertyType) {
      console.log("❌ Missing required fields")
      return {
        success: false,
        message: "All fields are required. Please fill out the complete form.",
      }
    }

    if (password.length < 6) {
      console.log("❌ Password too short")
      return {
        success: false,
        message: "Password must be at least 6 characters long.",
      }
    }

    if (!agreedToTerms) {
      console.log("❌ User did not agree to terms")
      return {
        success: false,
        message: "You must agree to the terms and conditions to register.",
      }
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim()
    console.log("🧹 Cleaned email:", cleanEmail)

    // Check if user already exists
    const existingUser = userStorage.findUserByEmail(cleanEmail) || users.find((user) => user.email === cleanEmail)
    if (existingUser) {
      console.log("❌ User already exists:", cleanEmail)
      return {
        success: false,
        message: "An account with this email already exists. Please use a different email or try logging in.",
      }
    }

    // Create user
    const fullName = `${firstName} ${lastName}`
    const newUser = {
      id: `user_${Date.now()}`,
      name: fullName,
      email: cleanEmail,
      phone: phone?.trim() || "",
      location: location?.trim() || "",
      state: state,
      postcode: postcode?.trim() || "",
      propertyType: propertyType || "",
      emergencyContacts: [{ name: emergencyContact, phone: emergencyPhone, relationship: "Emergency Contact" }],
      preferences: {
        emailNotifications: wantsUpdates,
        smsNotifications: false,
        emergencyAlerts: true,
        communityUpdates: wantsUpdates,
      },
      livestock: hasLivestock ? livestockTypes : [],
      password: password, // In production, this should be hashed
      createdAt: new Date(),
      isVerified: false,
    }

    console.log("👤 Creating new user:", { name: fullName, email: cleanEmail, state })

    // Add user to storage
    const success = userStorage.addUser(newUser)
    users.push(newUser)

    if (success) {
      console.log("✅ User registration successful!")
      console.log("📊 Total users now:", userStorage.getAllUsers().length)

      return {
        success: true,
        message: `Welcome to Rural Community Hub Australia, ${firstName}! Redirecting to your ${state} dashboard...`,
        redirectTo: "/dashboard",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          state: newUser.state,
          location: newUser.location,
        },
      }
    } else {
      console.log("❌ Failed to save user to storage")
      return {
        success: false,
        message: "Registration failed. Please try again.",
      }
    }
  } catch (error: any) {
    console.error("💥 Registration error:", error)
    return {
      success: false,
      message: `Registration failed: ${error.message}`,
    }
  }
}

export async function getAllUsers() {
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    state: user.state,
    location: user.location,
    createdAt: user.createdAt,
  }))
}
