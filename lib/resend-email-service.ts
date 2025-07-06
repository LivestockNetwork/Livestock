// Enhanced Resend Email Service with better error handling and logging

interface EmailConfig {
  apiKey: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

interface UserData {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  location?: string
  propertyType?: string
  primaryInterest?: string
  state?: string
}

class ResendEmailService {
  private config: EmailConfig | null = null

  setConfig(apiKey: string) {
    this.config = { apiKey }
    console.log("Resend Email Service - API key configured")
  }

  isConfigured(): boolean {
    return this.config !== null && this.config.apiKey.length > 0
  }

  async sendWelcomeEmail(toEmail: string, userData: UserData): Promise<EmailResult> {
    console.log("Resend Email Service - Sending welcome email to:", toEmail)
    console.log("Resend Email Service - User data:", userData)

    if (!this.config) {
      console.error("Resend Email Service - Not configured")
      return { success: false, error: "Email service not configured" }
    }

    try {
      const emailHtml = this.generateWelcomeEmailHTML(userData)
      const emailText = this.generateWelcomeEmailText(userData)

      console.log("Resend Email Service - Making API call to Resend...")

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Rural Community Hub <welcome@ruralcommunityhub.com>",
          to: [toEmail],
          subject: "🇦🇺 Welcome to Rural Community Hub Australia!",
          html: emailHtml,
          text: emailText,
        }),
      })

      console.log("Resend Email Service - Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Resend Email Service - API error:", errorData)
        return {
          success: false,
          error: `Resend API error: ${errorData.message || "Unknown error"}`,
        }
      }

      const result = await response.json()
      console.log("Resend Email Service - Success:", result)

      return {
        success: true,
        messageId: result.id,
      }
    } catch (error: any) {
      console.error("Resend Email Service - Network error:", error)
      return {
        success: false,
        error: `Network error: ${error.message}`,
      }
    }
  }

  async sendTestEmail(toEmail: string): Promise<EmailResult> {
    console.log("Resend Email Service - Sending test email to:", toEmail)

    if (!this.config) {
      return { success: false, error: "Email service not configured" }
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Rural Community Hub <test@ruralcommunityhub.com>",
          to: [toEmail],
          subject: "🧪 Test Email - Rural Community Hub",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #16a34a;">🇦🇺 Test Email Success!</h2>
              <p>G'day! This test email confirms your Rural Community Hub email system is working perfectly.</p>
              <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #15803d;">✅ System Status</h3>
                <ul style="color: #166534;">
                  <li>Resend API: Connected</li>
                  <li>Email delivery: Working</li>
                  <li>HTML formatting: Active</li>
                </ul>
              </div>
              <p style="color: #6b7280; font-size: 14px;">
                Sent from Rural Community Hub Australia<br>
                Connecting rural communities across the continent
              </p>
            </div>
          `,
          text: "Test email from Rural Community Hub Australia - Your email system is working!",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { success: false, error: errorData.message || "Test email failed" }
      }

      const result = await response.json()
      return { success: true, messageId: result.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  private generateWelcomeEmailHTML(userData: UserData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Rural Community Hub Australia</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            background: #ffffff;
          }
          .header { 
            background: linear-gradient(135deg, #16a34a 0%, #059669 100%); 
            color: white; 
            padding: 40px 20px; 
            text-align: center; 
            border-radius: 8px 8px 0 0; 
          }
          .content { 
            background: #ffffff; 
            padding: 40px 20px; 
            border-radius: 0 0 8px 8px; 
          }
          .button { 
            display: inline-block; 
            background: #16a34a; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 10px 0; 
            font-weight: bold;
          }
          .info-box { 
            background: #f0fdf4; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #16a34a;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="margin: 0; font-size: 28px;">🇦🇺 Welcome to Rural Community Hub Australia!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px; color: #dcfce7;">Connecting rural communities across the continent</p>
        </div>
        
        <div class="content">
          <h2 style="color: #16a34a; margin-top: 0;">G'day ${userData.firstName}! 👋</h2>
          
          <p style="font-size: 16px;">
            Welcome to Rural Community Hub Australia! We're excited to have you join our growing community of rural Australians.
          </p>

          <div class="info-box">
            <h3 style="color: #15803d; margin-top: 0;">🎯 Your Registration Details</h3>
            <ul style="color: #166534; margin: 0; padding-left: 20px;">
              <li><strong>Name:</strong> ${userData.firstName} ${userData.lastName || ""}</li>
              <li><strong>Email:</strong> ${userData.email}</li>
              ${userData.location ? `<li><strong>Location:</strong> ${userData.location}</li>` : ""}
              ${userData.state ? `<li><strong>State:</strong> ${userData.state}</li>` : ""}
              ${userData.propertyType ? `<li><strong>Property Type:</strong> ${userData.propertyType}</li>` : ""}
              ${userData.primaryInterest ? `<li><strong>Primary Interest:</strong> ${userData.primaryInterest}</li>` : ""}
            </ul>
          </div>

          <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #d97706; margin-top: 0;">🚀 What's Next?</h3>
            <ul style="color: #92400e; margin: 0; padding-left: 20px;">
              <li>Log in to your account</li>
              <li>Complete your profile setup</li>
              <li>Join community discussions</li>
              <li>Create your emergency preparedness plan</li>
              <li>Connect with nearby rural families</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/login" class="button">
              🏡 Log In to Your Account
            </a>
          </div>

          <p style="font-size: 16px;">
            Rural Community Hub Australia is your platform for connecting with fellow rural Australians, sharing knowledge, and building stronger communities.
          </p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #374151; margin-top: 0;">🔐 Your Login Details</h4>
            <p style="color: #6b7280; margin: 0;">
              <strong>Email:</strong> ${userData.email}<br>
              <strong>Password:</strong> Use the password you created during registration
            </p>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0;">
            © 2024 Rural Community Hub Australia<br>
            Connecting rural communities across the continent 🇦🇺
          </p>
        </div>
      </body>
      </html>
    `
  }

  private generateWelcomeEmailText(userData: UserData): string {
    return `
Welcome to Rural Community Hub Australia!

G'day ${userData.firstName}!

Welcome to Rural Community Hub Australia! We're excited to have you join our growing community of rural Australians.

Your Registration Details:
- Name: ${userData.firstName} ${userData.lastName || ""}
- Email: ${userData.email}
${userData.location ? `- Location: ${userData.location}` : ""}
${userData.state ? `- State: ${userData.state}` : ""}
${userData.propertyType ? `- Property Type: ${userData.propertyType}` : ""}
${userData.primaryInterest ? `- Primary Interest: ${userData.primaryInterest}` : ""}

What's Next:
1. Log in to your account
2. Complete your profile setup
3. Join community discussions
4. Create your emergency preparedness plan
5. Connect with nearby rural families

Your Login Details:
Email: ${userData.email}
Password: Use the password you created during registration

Log in here: ${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/login

Rural Community Hub Australia is your platform for connecting with fellow rural Australians, sharing knowledge, and building stronger communities.

© 2024 Rural Community Hub Australia
Connecting rural communities across the continent 🇦🇺
    `
  }
}

export const resendEmailService = new ResendEmailService()

// Initialize with API key if available
if (process.env.RESEND_API_KEY) {
  resendEmailService.setConfig(process.env.RESEND_API_KEY)
}
