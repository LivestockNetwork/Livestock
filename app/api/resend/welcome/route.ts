import { type NextRequest, NextResponse } from "next/server"
import { resendEmailService } from "@/lib/resend-email-service"

export async function POST(request: NextRequest) {
  console.log("Welcome Email API - Request received")

  try {
    const { toEmail, firstName, userData } = await request.json()

    console.log("Welcome Email API - Data:", { toEmail, firstName, userData })

    // Validate required fields
    if (!toEmail || !firstName) {
      console.error("Welcome Email API - Missing required fields")
      return NextResponse.json({
        success: false,
        message: "Email and first name are required",
      })
    }

    // Check if email service is configured
    if (!resendEmailService.isConfigured()) {
      console.error("Welcome Email API - Resend not configured")
      return NextResponse.json({
        success: false,
        message: "Email service not configured. Please check RESEND_API_KEY environment variable.",
      })
    }

    // Send welcome email
    console.log("Welcome Email API - Sending email...")
    const result = await resendEmailService.sendWelcomeEmail(toEmail, {
      firstName,
      lastName: userData?.lastName,
      email: toEmail,
      phone: userData?.phone,
      location: userData?.location,
      propertyType: userData?.propertyType,
      primaryInterest: userData?.primaryInterest,
      state: userData?.state,
    })

    console.log("Welcome Email API - Result:", result)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Welcome email sent successfully!",
        messageId: result.messageId,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: result.error || "Failed to send welcome email",
      })
    }
  } catch (error: any) {
    console.error("Welcome Email API - Error:", error)
    return NextResponse.json({
      success: false,
      message: `Welcome email failed: ${error.message}`,
    })
  }
}
