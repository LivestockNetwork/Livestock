import { NextResponse } from "next/server"
import { resendEmailService } from "@/lib/resend-email-service"

export async function GET() {
  try {
    const config = resendEmailService.getConfig()

    if (config) {
      return NextResponse.json({
        configured: true,
        provider: "Resend",
        message: "Resend is configured and ready to send emails",
        limits: "3,000 emails/month FREE",
      })
    } else {
      return NextResponse.json({
        configured: false,
        provider: "None",
        message: "Resend not configured - please add your API key",
        limits: "Sign up at resend.com for 3,000 free emails/month",
      })
    }
  } catch (error: any) {
    return NextResponse.json({
      configured: false,
      provider: "Error",
      message: `Status check failed: ${error.message}`,
      limits: "Unknown",
    })
  }
}
