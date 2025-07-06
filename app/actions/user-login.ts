"use server"

import { redirect } from "next/navigation"
import { userStorage } from "@/lib/user-storage"

interface LoginResult {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name: string
    state?: string
  }
}

export async function loginUser(prevState: any, formData: FormData): Promise<LoginResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  console.log("Login attempt for:", email)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!email || !password) {
    return {
      success: false,
      message: "Please enter both email and password",
    }
  }

  // Try to validate user credentials
  const user = userStorage.validateUserCredentials(email, password)

  if (user) {
    console.log("Login successful for:", email)

    // Redirect to dashboard on successful login
    redirect("/dashboard")
  }

  console.log("Login failed for:", email)
  return {
    success: false,
    message: "Invalid email or password. Try demo@rural.com / demo123",
  }
}
