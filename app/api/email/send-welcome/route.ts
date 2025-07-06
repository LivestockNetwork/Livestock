import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const { credentials, toEmail, userData } = await request.json()

    console.log("API Route - Welcome email request:", {
      email: credentials.email,
      toEmail,
      firstName: userData.firstName,
    })

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
      subject: "🇦🇺 Welcome to Rural Community Hub Australia!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #16a34a 0%, #059669 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🇦🇺 Welcome to Rural Community Hub Australia!</h1>
            <p style="color: #dcfce7; margin: 10px 0 0 0; font-size: 16px;">Connecting rural communities across the continent</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="color: #16a34a; margin-top: 0;">G'day ${userData.firstName || "Mate"}! 👋</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Welcome to Rural Community Hub Australia! We're excited to have you join our growing community of rural Australians.
            </p>

            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #16a34a;">
              <h3 style="color: #15803d; margin-top: 0;">🎯 Your Registration Details</h3>
              <ul style="color: #166534; margin: 0; padding-left: 20px;">
                <li><strong>Name:</strong> ${userData.firstName} ${userData.lastName || ""}</li>
                <li><strong>Email:</strong> ${userData.email}</li>
                ${userData.location ? `<li><strong>Location:</strong> ${userData.location}</li>` : ""}
                ${userData.propertyType ? `<li><strong>Property Type:</strong> ${userData.propertyType}</li>` : ""}
                ${userData.primaryInterest ? `<li><strong>Primary Interest:</strong> ${userData.primaryInterest}</li>` : ""}
              </ul>
            </div>

            <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
              <h3 style="color: #d97706; margin-top: 0;">🚀 What's Next?</h3>
              <ul style="color: #92400e; margin: 0; padding-left: 20px;">
                <li>Complete your profile setup</li>
                <li>Join community discussions</li>
                <li>Share your rural knowledge</li>
                <li>Connect with nearby farmers</li>
                <li>Access emergency preparedness tools</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                🏡 Complete Your Profile
              </a>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Rural Community Hub Australia is your platform for connecting with fellow rural Australians, sharing knowledge, and building stronger communities across our vast continent.
            </p>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #374151; margin-top: 0;">📞 Need Help?</h4>
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                If you have any questions or need assistance, don't hesitate to reach out to our community support team.
              </p>
            </div>
          </div>

          <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              © 2024 Rural Community Hub Australia<br>
              Connecting rural communities across the continent 🇦🇺
            </p>
          </div>
        </div>
      `,
    }

    console.log("API Route - Sending welcome email...")
    await transporter.sendMail(mailOptions)
    console.log("API Route - Welcome email sent successfully")

    return NextResponse.json({ success: true, message: "Welcome email sent successfully!" })
  } catch (error: any) {
    console.error("API Route - Send email error:", error)
    return NextResponse.json({ success: false, message: `Failed to send welcome email: ${error.message}` })
  }
}
