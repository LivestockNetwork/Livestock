import { type NextRequest, NextResponse } from "next/server"
import { sendTestEmail } from "@/lib/simple-email-service"

export async function POST(request: NextRequest) {
  try {
    console.log("API - Test email request received")

    const { email } = await request.json()

    console.log("API - Test email data:", { email })

    if (!email) {
      console.log("API - Missing email")
      return NextResponse.json({ success: false, message: "Email address is required" }, { status: 400 })
    }

    // Send test email
    const result = await sendTestEmail(email)
    console.log("API - Test email result:", result)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("API - Test email error:", error)
    return NextResponse.json({ success: false, message: `Test email failed: ${error.message}` }, { status: 500 })
  }
}
