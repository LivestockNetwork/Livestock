"use server"

import { redirect } from "next/navigation"
import { userStorage } from "@/lib/user-storage"

interface RegistrationResult {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
    name: string
    state?: string
  }
}

export async function registerUser(prevState: any, formData: FormData): Promise<RegistrationResult> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const state = formData.get("state") as string

  console.log("Registration attempt for:", email, "from state:", state)

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  if (!name || !email || !password || !state) {
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

  // Check if email already exists
  const existingUser = userStorage.findUserByEmail(email)
  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists",
    }
  }

  // Create new user
  const newUser = userStorage.createUser({
    firstName: name.split(" ")[0],
    lastName: name.split(" ").slice(1).join(" ") || "",
    email,
    password,
    state,
  })

  console.log("Registration successful for:", email)

  // Redirect to dashboard on successful registration
  redirect("/dashboard")
}
