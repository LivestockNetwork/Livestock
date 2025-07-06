import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { toEmail, firstName } = await request.json()

    console.log("Sending welcome email to:", toEmail)

    if (!toEmail || !firstName) {
      return NextResponse.json({
        success: false,
        message: "Email and first name required",
      })
    }

    const result = await emailService.sendWelcomeEmail(toEmail, firstName)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Welcome error:", error)
    return NextResponse.json({
      success: false,
      message: `Welcome email failed: ${error.message}`,
    })
  }
}
