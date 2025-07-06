"use server"

export async function handleUserLogin(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email && password) {
      return {
        success: true,
        message: "Login successful!",
        user: { email },
      }
    } else {
      return {
        success: false,
        message: "Invalid credentials",
      }
    }
  } catch (error) {
    return {
      success: false,
      message: "Login failed. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
