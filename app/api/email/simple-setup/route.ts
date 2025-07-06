import { type NextRequest, NextResponse } from "next/server"
import { saveEmailConfig } from "@/lib/simple-email-service"

export async function POST(request: NextRequest) {
  try {
    console.log("API - Gmail setup request received")

    const { email, password } = await request.json()

    console.log("API - Setup data:", { email, password: password ? "[PROVIDED]" : "[MISSING]" })

    if (!email || !password) {
      console.log("API - Missing email or password")
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Save the configuration
    const result = saveEmailConfig(email, password)
    console.log("API - Save result:", result)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("API - Setup error:", error)
    return NextResponse.json({ success: false, message: `Setup failed: ${error.message}` }, { status: 500 })
  }
}
