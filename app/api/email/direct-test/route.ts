import { NextResponse } from "next/server"
import { emailService } from "@/lib/direct-email-service"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, testType = "basic" } = body

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 },
      )
    }

    const result = await emailService.sendTestEmail(email, testType)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Test email sending failed:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send test email. Please check your email configuration.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
