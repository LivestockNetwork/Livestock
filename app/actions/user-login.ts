"use server"

interface LoginResult {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name: string
  }
}

export async function loginUser(prevState: any, formData: FormData): Promise<LoginResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!email || !password) {
    return {
      success: false,
      message: "Please enter both email and password",
    }
  }

  // Demo accounts for testing
  const demoAccounts = [
    { email: "demo@rural.com", password: "demo123", name: "Demo User" },
    { email: "farmer@example.com", password: "farm123", name: "John Farmer" },
    { email: "sarah@station.com", password: "sarah123", name: "Sarah Station" },
  ]

  const user = demoAccounts.find((account) => account.email === email && account.password === password)

  if (user) {
    return {
      success: true,
      message: `Welcome back, ${user.name}!`,
      user: {
        id: `user_${Date.now()}`,
        email: user.email,
        name: user.name,
      },
    }
  }

  return {
    success: false,
    message: "Invalid email or password. Try demo@rural.com / demo123",
  }
}
