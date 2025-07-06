import { NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"

export async function GET() {
  try {
    const config = emailService.getConfig()

    if (config) {
      return NextResponse.json({
        configured: true,
        email: config.email,
        message: "Email system is configured and ready",
      })
    } else {
      return NextResponse.json({
        configured: false,
        message: "Email system not configured",
      })
    }
  } catch (error: any) {
    return NextResponse.json({
      configured: false,
      message: `Status check failed: ${error.message}`,
    })
  }
}
