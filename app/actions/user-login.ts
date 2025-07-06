"use server"

export async function loginUser(formData: FormData) {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Demo accounts for testing
  const demoAccounts = [
    {
      email: "demo@rural.com",
      password: "demo123",
      firstName: "Demo",
      lastName: "User",
      state: "nsw",
      propertyType: "Mixed Farming",
    },
    {
      email: "farmer@example.com",
      password: "farm123",
      firstName: "John",
      lastName: "Farmer",
      state: "vic",
      propertyType: "Cattle Station",
    },
    {
      email: "sarah@station.com",
      password: "sarah123",
      firstName: "Sarah",
      lastName: "Mitchell",
      state: "qld",
      propertyType: "Sheep Farm",
    },
  ]

  // Check demo accounts
  const demoAccount = demoAccounts.find((account) => account.email === email && account.password === password)

  if (demoAccount) {
    return {
      success: true,
      message: `Welcome back, ${demoAccount.firstName}!`,
      user: {
        ...demoAccount,
        id: Date.now().toString(),
        isDemo: true,
        loginDate: new Date().toISOString(),
      },
    }
  }

  // In a real app, you would check against a database
  // For demo purposes, we'll simulate a failed login
  return {
    success: false,
    message: "Invalid email or password. Please try a demo account.",
    user: null,
  }
}
