import { type NextRequest, NextResponse } from "next/server"
import { emailService } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const { toEmail } = await request.json()

    console.log("Testing email to:", toEmail)

    if (!toEmail) {
      return NextResponse.json({
        success: false,
        message: "Recipient email required",
      })
    }

    const result = await emailService.sendTestEmail(toEmail)
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Test error:", error)
    return NextResponse.json({
      success: false,
      message: `Test failed: ${error.message}`,
    })
  }
}
