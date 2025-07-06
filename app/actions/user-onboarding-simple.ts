"use server"

interface SimpleRegistrationResult {
  success: boolean
  message: string
  user?: {
    id: string
    firstName: string
    lastName: string
    email: string
    location: string
    propertyType: string
    primaryInterest: string
  }
}

export async function registerUser(prevState: any, formData: FormData): Promise<SimpleRegistrationResult> {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const location = formData.get("location") as string
  const propertyType = formData.get("propertyType") as string
  const primaryInterest = formData.get("primaryInterest") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!firstName || !email) {
    return {
      success: false,
      message: "Please fill in the required fields (First Name and Email)",
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address",
    }
  }

  // Simulate successful registration
  const newUser = {
    id: `user_${Date.now()}`,
    firstName,
    lastName: lastName || "",
    email,
    location: location || "",
    propertyType: propertyType || "",
    primaryInterest: primaryInterest || "",
    registeredAt: new Date().toISOString(),
  }

  // Here you would typically:
  // 1. Save user to database
  // 2. Send welcome email
  // 3. Set up user session

  return {
    success: true,
    message: `G'day ${firstName}! Welcome to Rural Community Hub Australia. You're now connected with rural communities across the continent.`,
    user: newUser,
  }
}
