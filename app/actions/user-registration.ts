"use server"

interface RegistrationResult {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name: string
    location?: string
    propertyType?: string
  }
}

export async function registerUser(prevState: any, formData: FormData): Promise<RegistrationResult> {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const location = formData.get("location") as string
  const propertyType = formData.get("propertyType") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!firstName || !lastName || !email || !password) {
    return {
      success: false,
      message: "Please fill in all required fields",
    }
  }

  if (password !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match",
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long",
    }
  }

  // Check if email already exists (mock check)
  const existingEmails = ["demo@rural.com", "farmer@example.com", "sarah@station.com"]
  if (existingEmails.includes(email)) {
    return {
      success: false,
      message: "An account with this email already exists",
    }
  }

  // Simulate successful registration
  const newUser = {
    id: `user_${Date.now()}`,
    email,
    name: `${firstName} ${lastName}`,
    location,
    propertyType,
  }

  return {
    success: true,
    message: `Welcome to Rural Community Hub, ${firstName}! Your account has been created successfully.`,
    user: newUser,
  }
}
