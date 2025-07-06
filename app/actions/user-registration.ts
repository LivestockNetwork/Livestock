"use server"

export async function handleUserRegistration(prevState: any, formData: FormData) {
  try {
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    }

    // Basic validation
    if (userData.password !== userData.confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      }
    }

    // Simulate user creation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: "Account created successfully!",
      user: { name: userData.name, email: userData.email },
    }
  } catch (error) {
    return {
      success: false,
      message: "Registration failed. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
