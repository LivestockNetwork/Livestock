import { NextResponse } from "next/server"
import { isEmailConfigured, getEmailConfig } from "@/lib/simple-email-service"

export async function GET() {
  try {
    console.log("API - Status check request")

    const configured = isEmailConfigured()
    const config = getEmailConfig()

    const response = {
      configured,
      email: config?.email || "Not configured",
      message: configured ? "Gmail is configured and ready" : "Gmail not configured. Please setup first.",
    }

    console.log("API - Status response:", response)
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("API - Status error:", error)
    return NextResponse.json({
      configured: false,
      email: "Error",
      message: `Status check failed: ${error.message}`,
    })
  }
}
