import { type NextRequest, NextResponse } from "next/server"
import { resendEmailService } from "@/lib/resend-email-service"

export async function POST(request: NextRequest) {
  try {
    const { user, digest } = await request.json()

    console.log("Sending community digest to:", user.email)

    if (!user || !user.email || !user.firstName) {
      return NextResponse.json({
        success: false,
        message: "User email and firstName are required",
      })
    }

    if (!digest) {
      return NextResponse.json({
        success: false,
        message: "Digest data is required",
      })
    }

    const result = await resendEmailService.sendCommunityDigest(user, digest)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Community digest sent successfully via Resend!",
        messageId: result.messageId,
      })
    } else {
      return NextResponse.json({
        success: false,
        message: result.error || "Failed to send community digest",
      })
    }
  } catch (error: any) {
    console.error("Resend digest error:", error)
    return NextResponse.json({
      success: false,
      message: `Community digest failed: ${error.message}`,
    })
  }
}
