import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { credentials, toEmail } = await request.json()

    console.log("API Route - Test email request:", { email: credentials.email, toEmail })

    if (!credentials?.email || !credentials?.password || !toEmail) {
      return NextResponse.json({
        success: false,
        message: "Missing required fields: email, password, or recipient email",
      })
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: credentials.email,
        pass: credentials.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const mailOptions = {
      from: `"Rural Community Hub Australia" <${credentials.email}>`,
      to: toEmail,
      subject: "🧪 Test Email - Rural Community Hub Australia",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16a34a;">🇦🇺 Test Email Successful!</h2>
          <p>G'day! This is a test email from Rural Community Hub Australia.</p>
          <p>If you're receiving this, your Gmail integration is working perfectly!</p>
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #15803d; margin-top: 0;">✅ Email System Status</h3>
            <ul style="color: #166534;">
              <li>Gmail SMTP connection: Working</li>
              <li>Email delivery: Successful</li>
              <li>HTML formatting: Active</li>
              <li>Browser storage: Working</li>
            </ul>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            Sent from Rural Community Hub Australia<br>
            Connecting rural communities across the continent
          </p>
        </div>
      `,
    }

    console.log("API Route - Sending test email...")
    await transporter.sendMail(mailOptions)
    console.log("API Route - Test email sent successfully")

    return NextResponse.json({ success: true, message: "Test email sent successfully!" })
  } catch (error: any) {
    console.error("API Route - Send email error:", error)
    return NextResponse.json({ success: false, message: `Failed to send email: ${error.message}` })
  }
}
