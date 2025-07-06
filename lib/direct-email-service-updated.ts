import nodemailer from "nodemailer"

interface EmailData {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

class DirectEmailService {
  private transporter: nodemailer.Transporter | null = null
  private fromName = "Rural Community Hub Australia"
  private fromEmail = ""

  constructor() {
    this.initializeTransporter()
  }

  private initializeTransporter() {
    try {
      // Gmail configuration
      if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
        this.fromEmail = process.env.GMAIL_USER
        this.transporter = nodemailer.createTransporter({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        })
        console.log("✅ Gmail SMTP configured for Rural Community Hub Australia")
        return
      }

      // Outlook configuration
      if (process.env.OUTLOOK_USER && process.env.OUTLOOK_PASSWORD) {
        this.fromEmail = process.env.OUTLOOK_USER
        this.transporter = nodemailer.createTransporter({
          service: "hotmail",
          auth: {
            user: process.env.OUTLOOK_USER,
            pass: process.env.OUTLOOK_PASSWORD,
          },
        })
        console.log("✅ Outlook SMTP configured for Rural Community Hub Australia")
        return
      }

      // Yahoo configuration
      if (process.env.YAHOO_USER && process.env.YAHOO_APP_PASSWORD) {
        this.fromEmail = process.env.YAHOO_USER
        this.transporter = nodemailer.createTransporter({
          service: "yahoo",
          auth: {
            user: process.env.YAHOO_USER,
            pass: process.env.YAHOO_APP_PASSWORD,
          },
        })
        console.log("✅ Yahoo SMTP configured for Rural Community Hub Australia")
        return
      }

      // Custom SMTP configuration
      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
        this.fromEmail = process.env.SMTP_USER
        this.transporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST,
          port: Number.parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        })
        console.log("✅ Custom SMTP configured for Rural Community Hub Australia")
        return
      }

      console.warn("⚠️ No email configuration found. Emails will be logged to console.")
    } catch (error) {
      console.error("❌ Email configuration error:", error)
    }
  }

  async sendEmail(emailData: EmailData): Promise<EmailResult> {
    if (!this.transporter) {
      // Development mode - log email instead of sending
      console.log("📧 Email would be sent:")
      console.log("From:", `${this.fromName} <${this.fromEmail}>`)
      console.log("To:", emailData.to)
      console.log("Subject:", emailData.subject)
      console.log("Content:", emailData.text || "HTML content provided")

      return {
        success: true,
        messageId: `dev_${Date.now()}`,
      }
    }

    try {
      const info = await this.transporter.sendMail({
        from: `"${this.fromName}" <${this.fromEmail}>`, // This is the key - shows as "Rural Community Hub Australia"
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        replyTo: this.fromEmail, // Replies go to your actual email
      })

      console.log(`✅ Email sent as "${this.fromName}" from ${this.fromEmail}`)

      return {
        success: true,
        messageId: info.messageId,
      }
    } catch (error) {
      console.error("Email sending error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown email error",
      }
    }
  }

  async sendWelcomeEmail(user: {
    email: string
    firstName: string
    lastName: string
    suburb: string
    state: string
    propertyType: string
  }): Promise<EmailResult> {
    const html = `
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
            background-color: #f5f5f5;
          }
          .container { background-color: white; margin: 20px; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { 
            background: linear-gradient(135deg, #7EC9BB, #6BB3A6); 
            color: white; 
            padding: 30px; 
            text-align: center; 
          }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 30px; }
          .button { 
            display: inline-block; 
            background: #7EC9BB; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            margin: 10px 0; 
            font-weight: bold;
          }
          .stats { 
            background: #f9f9f9; 
            padding: 20px; 
            border-radius: 6px; 
            margin: 20px 0; 
            border-left: 4px solid #7EC9BB;
          }
          .footer { 
            text-align: center; 
            padding: 20px; 
            color: #666; 
            font-size: 14px; 
            background-color: #f9f9f9;
          }
          ul { padding-left: 20px; }
          li { margin-bottom: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🇦🇺 Welcome to Rural Community Hub Australia!</h1>
            <p>G'day ${user.firstName}, you're now part of Australia's strongest rural community network</p>
          </div>
          
          <div class="content">
            <h2>You're Connected with ${user.suburb}, ${user.state}</h2>
            
            <p>Thanks for joining Rural Community Hub Australia! You're now connected with rural families across ${user.state} who understand the unique challenges of rural life in Australia.</p>
            
            <div class="stats">
              <h3>🏡 Your Profile</h3>
              <ul>
                <li><strong>Name:</strong> ${user.firstName} ${user.lastName}</li>
                <li><strong>Location:</strong> ${user.suburb}, ${user.state}</li>
                <li><strong>Property Type:</strong> ${user.propertyType}</li>
              </ul>
            </div>

            <h3>🚀 What's Next?</h3>
            <ol>
              <li><strong>Complete your emergency plan</strong> - Build a personalized plan for your Australian property</li>
              <li><strong>Join local groups</strong> - Connect with farmers and rural families in your area</li>
              <li><strong>Introduce yourself</strong> - Share your story with the community</li>
              <li><strong>Share your knowledge</strong> - Help other rural Australians with your experience</li>
            </ol>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://ruralcommunityhub.com.au/community" class="button">
                Get Started Now
              </a>
            </div>

            <div class="stats">
              <h3>🚨 Emergency Features Ready</h3>
              <p>Your account is now set up to receive:</p>
              <ul>
                <li>✅ Emergency alerts for your area</li>
                <li>✅ Community support requests</li>
                <li>✅ Equipment sharing opportunities</li>
                <li>✅ Local weather warnings</li>
                <li>✅ Bushfire and flood updates</li>
              </ul>
            </div>

            <h3>🤝 Need Help?</h3>
            <p>Our Australian support team is here to help:</p>
            <ul>
              <li>📧 Email: support@ruralcommunityhub.com.au</li>
              <li>📱 SMS: 1800 RURAL (1800 787 252)</li>
              <li>💬 Live Chat: Available in your dashboard</li>
            </ul>

            <p><strong>Fair dinkum mate, we're here to support rural Australia!</strong></p>
          </div>

          <div class="footer">
            <p>🇦🇺 Welcome to the Rural Community Hub Australia family!</p>
            <p>Rural Community Hub Australia • Connecting Rural Australia • Est. 2024</p>
            <p>This email was sent to ${user.email}</p>
          </div>
        </div>
      </body>
      </html>
    `

    const text = `
🇦🇺 Welcome to Rural Community Hub Australia, ${user.firstName}!

You're now connected with ${user.suburb}, ${user.state}

Thanks for joining Rural Community Hub Australia! You're now connected with rural families across ${user.state} who understand the unique challenges of rural life in Australia.

🏡 Your Profile:
- Name: ${user.firstName} ${user.lastName}
- Location: ${user.suburb}, ${user.state}
- Property Type: ${user.propertyType}

🚀 What's Next:
1. Complete your emergency plan - Build a personalized plan for your Australian property
2. Join local groups - Connect with farmers and rural families in your area
3. Introduce yourself - Share your story with the community
4. Share your knowledge - Help other rural Australians with your experience

Get started: https://ruralcommunityhub.com.au/community

🚨 Emergency Features Ready:
Your account is now set up to receive:
✅ Emergency alerts for your area
✅ Community support requests
✅ Equipment sharing opportunities
✅ Local weather warnings
✅ Bushfire and flood updates

🤝 Need Help?
Our Australian support team is here to help:
📧 Email: support@ruralcommunityhub.com.au
📱 SMS: 1800 RURAL (1800 787 252)
💬 Live Chat: Available in your dashboard

Fair dinkum mate, we're here to support rural Australia!

🇦🇺 Welcome to the Rural Community Hub Australia family!
Rural Community Hub Australia • Connecting Rural Australia • Est. 2024

This email was sent to ${user.email}
    `

    return this.sendEmail({
      to: user.email,
      subject: `🇦🇺 Welcome to Rural Community Hub Australia, ${user.firstName}!`,
      html,
      text,
    })
  }

  async testConnection(): Promise<EmailResult> {
    if (!this.transporter) {
      return {
        success: false,
        error: "No email transporter configured",
      }
    }

    try {
      await this.transporter.verify()
      return {
        success: true,
        messageId: "connection_verified",
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Connection test failed",
      }
    }
  }
}

export const directEmailService = new DirectEmailService()
