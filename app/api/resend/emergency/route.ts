import { type NextRequest, NextResponse } from "next/server"
import { resendEmailService } from "@/lib/resend-email-service"

export async function POST(request: NextRequest) {
  try {
    const { recipients, alert } = await request.json()

    console.log("Sending emergency alert to:", recipients.length, "recipients")

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Recipients array is required",
      })
    }

    if (!alert || !alert.title || !alert.message || !alert.severity || !alert.location) {
      return NextResponse.json({
        success: false,
        message: "Alert details (title, message, severity, location) are required",
      })
    }

    const result = await resendEmailService.sendEmergencyAlert(recipients, alert)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Emergency alert sent to ${recipients.length} recipients via Resend!`,
        messageId: result.messageId,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: result.error || "Failed to send emergency alert",
      })
    }
  } catch (error: any) {
    console.error("Resend emergency alert error:", error)
    return NextResponse.json({
      success: false,
      message: `Emergency alert failed: ${error.message}`,
    })
  }
}
