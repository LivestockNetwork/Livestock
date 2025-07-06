import { type NextRequest, NextResponse } from "next/server"
import { resendEmailService } from "@/lib/resend-email-service"

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json()

    console.log("Setting up Resend API key...")

    if (!apiKey) {
      return NextResponse.json({
        success: false,
        message: "Resend API key is required",
      })
    }

    if (!apiKey.startsWith("re_")) {
      return NextResponse.json({
        success: false,
        message: "Invalid Resend API key format (should start with 're_')",
      })
    }

    resendEmailService.setConfig({ apiKey })

    return NextResponse.json({
      success: true,
      message: "Resend configured successfully! Ready to send emails.",
    })
  } catch (error: any) {
    console.error("Resend setup error:", error)
    return NextResponse.json({
      success: false,
      message: `Setup failed: ${error.message}`,
    })
  }
}
