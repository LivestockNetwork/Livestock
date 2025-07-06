import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log("Setting up email for:", email)

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password required",
      })
    }

    emailService.setConfig({ email, password })

    return NextResponse.json({
      success: true,
      message: "Email configured successfully!",
    })
  } catch (error: any) {
    console.error("Setup error:", error)
    return NextResponse.json({
      success: false,
      message: `Setup failed: ${error.message}`,
    })
  }
}
