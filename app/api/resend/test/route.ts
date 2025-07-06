import { type NextRequest, NextResponse } from "next/server"
import { resendEmailService } from "@/lib/resend-email-service"

export async function POST(request: NextRequest) {
  try {
    const { toEmail } = await request.json()

    console.log("Sending Resend test email to:", toEmail)

    if (!toEmail) {
      return NextResponse.json({
        success: false,
        message: "Recipient email address is required",
      })
    }

    const result = await resendEmailService.sendTestEmail(toEmail)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully via Resend!",
        messageId: result.messageId,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: result.error || "Failed to send test email",
      })
    }
  } catch (error: any) {
    console.error("Resend test error:", error)
    return NextResponse.json({
      success: false,
      message: `Test failed: ${error.message}`,
    })
  }
}
