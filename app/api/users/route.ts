import { type NextRequest, NextResponse } from "next/server"
import { sendWelcomeEmail } from "@/lib/simple-email-service"

export async function POST(request: NextRequest) {
  try {
    console.log("API Users - Received registration request")

    const userData = await request.json()
    console.log("API Users - User data:", userData)

    // Validate required fields
    if (!userData.email || !userData.firstName) {
      console.log("API Users - Missing required fields")
      return NextResponse.json(
        {
          success: false,
          message: "Email and first name are required",
        },
        { status: 400 },
      )
    }

    // Send welcome email
    console.log("API Users - Sending welcome email to:", userData.email)
    const emailResult = await sendWelcomeEmail(userData.email, userData)
    console.log("API Users - Email result:", emailResult)

    if (emailResult.success) {
      console.log("API Users - Registration completed successfully")
      return NextResponse.json({
        success: true,
        message: `Welcome ${userData.firstName}! Registration successful and welcome email sent to ${userData.email}`,
        userData: userData,
        emailResult: emailResult,
      })
    } else {
      console.log("API Users - Email sending failed")
      return NextResponse.json(
        {
          success: false,
          message: `Registration failed: ${emailResult.message}`,
          emailError: emailResult.message,
        },
        { status: 400 },
      )
    }
  } catch (error: any) {
    console.error("API Users - Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: `Registration failed: ${error.message}`,
      },
      { status: 500 },
    )
  }
}
