// Email service integration - supports multiple providers

import nodemailer from "nodemailer"

interface EmailProvider {
  send(emailData: EmailData): Promise<EmailResult>
}

interface EmailData {
  to: string | string[]
  from?: string
  subject: string
  html?: string
  text?: string
  attachments?: EmailAttachment[]
}

interface EmailAttachment {
  filename: string
  content: string | Buffer
  contentType?: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

interface EmailConfig {
  email: string
  password: string
}

// Resend Email Provider (Recommended for production)
class ResendProvider implements EmailProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(emailData: EmailData): Promise<EmailResult> {
    try {
      // In production, install and use: npm install resend
      // import { Resend } from 'resend'
      // const resend = new Resend(this.apiKey)

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: emailData.from || "Rural Community Hub <noreply@ruralcommunityhub.com>",
          to: Array.isArray(emailData.to) ? emailData.to : [emailData.to],
          subject: emailData.subject,
          html: emailData.html,
          text: emailData.text,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        return {
          success: true,
          messageId: result.id,
        }
      } else {
        return {
          success: false,
          error: result.message || "Failed to send email",
        }
      }
    } catch (error) {
      console.error("Resend email error:", error)
      return {
        success: false,
        error: "Email service unavailable",
      }
    }
  }
}

// SendGrid Provider (Alternative)
class SendGridProvider implements EmailProvider {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async send(emailData: EmailData): Promise<EmailResult> {
    try {
      // In production, install: npm install @sendgrid/mail
      // import sgMail from '@sendgrid/mail'
      // sgMail.setApiKey(this.apiKey)

      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: Array.isArray(emailData.to) ? emailData.to.map((email) => ({ email })) : [{ email: emailData.to }],
              subject: emailData.subject,
            },
          ],
          from: {
            email: emailData.from || "noreply@ruralcommunityhub.com",
            name: "Rural Community Hub",
          },
          content: [
            {
              type: "text/html",
              value: emailData.html || "",
            },
            {
              type: "text/plain",
              value: emailData.text || "",
            },
          ],
        }),
      })

      if (response.ok) {
        return {
          success: true,
          messageId: response.headers.get("x-message-id") || undefined,
        }
      } else {
        const error = await response.json()
        return {
          success: false,
          error: error.errors?.[0]?.message || "Failed to send email",
        }
      }
    } catch (error) {
      console.error("SendGrid email error:", error)
      return {
        success: false,
        error: "Email service unavailable",
      }
    }
  }
}

// Email Service Manager
class EmailService {
  private provider: EmailProvider
  private fallbackProvider?: EmailProvider
  private config: EmailConfig | null = null

  constructor(provider: EmailProvider, fallbackProvider?: EmailProvider) {
    this.provider = provider
    this.fallbackProvider = fallbackProvider
  }

  setConfig(config: EmailConfig) {
    this.config = config
    console.log("Email config set for:", config.email)
  }

  getConfig(): EmailConfig | null {
    return this.config
  }

  async sendTestEmail(toEmail: string): Promise<{ success: boolean; message: string }> {
    if (!this.config) {
      return { success: false, message: "Email not configured" }
    }

    try {
      console.log("Creating transporter...")
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: this.config.email,
          pass: this.config.password,
        },
      })

      console.log("Sending email...")
      await transporter.sendMail({
        from: this.config.email,
        to: toEmail,
        subject: "Test Email - Rural Community Hub",
        html: `
          <h2>🇦🇺 Test Email Success!</h2>
          <p>Your email system is working perfectly!</p>
          <p>Sent from Rural Community Hub Australia</p>
        `,
      })

      console.log("Email sent successfully")
      return { success: true, message: "Test email sent successfully!" }
    } catch (error: any) {
      console.error("Email error:", error)
      return { success: false, message: `Email failed: ${error.message}` }
    }
  }

  async sendWelcomeEmail(toEmail: string, firstName: string): Promise<{ success: boolean; message: string }> {
    if (!this.config) {
      return { success: false, message: "Email not configured" }
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: this.config.email,
          pass: this.config.password,
        },
      })

      await transporter.sendMail({
        from: this.config.email,
        to: toEmail,
        subject: "🇦🇺 Welcome to Rural Community Hub Australia!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #16a34a;">🇦🇺 Welcome ${firstName}!</h1>
            <p>G'day! Welcome to Rural Community Hub Australia.</p>
            <p>We're excited to have you join our growing community of rural Australians.</p>
            <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #15803d;">What's Next?</h3>
              <ul>
                <li>Complete your profile setup</li>
                <li>Join community discussions</li>
                <li>Connect with nearby farmers</li>
                <li>Access emergency preparedness tools</li>
              </ul>
            </div>
            <p>Cheers,<br>Rural Community Hub Australia Team</p>
          </div>
        `,
      })

      return { success: true, message: "Welcome email sent successfully!" }
    } catch (error: any) {
      console.error("Welcome email error:", error)
      return { success: false, message: `Welcome email failed: ${error.message}` }
    }
  }

  async sendEmergencyAlert(
    recipients: string[],
    alert: {
      title: string
      message: string
      severity: "low" | "medium" | "high" | "critical"
      location: string
    },
  ): Promise<EmailResult> {
    const emailData: EmailData = {
      to: recipients,
      subject: `🚨 ${alert.severity.toUpperCase()} ALERT: ${alert.title}`,
      html: this.generateEmergencyAlertHTML(alert),
      text: this.generateEmergencyAlertText(alert),
    }

    return this.sendWithFallback(emailData)
  }

  async sendCommunityDigest(
    user: {
      email: string
      firstName: string
    },
    digest: {
      newPosts: number
      helpRequests: number
      equipmentShares: number
      weatherAlerts: number
    },
  ): Promise<EmailResult> {
    const emailData: EmailData = {
      to: user.email,
      subject: `Your Weekly Rural Community Update`,
      html: this.generateDigestEmailHTML(user, digest),
      text: this.generateDigestEmailText(user, digest),
    }

    return this.sendWithFallback(emailData)
  }

  private async sendWithFallback(emailData: EmailData): Promise<EmailResult> {
    try {
      const result = await this.provider.send(emailData)

      if (result.success) {
        return result
      }

      // Try fallback provider if primary fails
      if (this.fallbackProvider) {
        console.warn("Primary email provider failed, trying fallback:", result.error)
        return await this.fallbackProvider.send(emailData)
      }

      return result
    } catch (error) {
      console.error("Email service error:", error)
      return {
        success: false,
        error: "Email service unavailable",
      }
    }
  }

  private generateWelcomeEmailHTML(user: {
    firstName: string
    lastName: string
    suburb: string
    state: string
    propertyType: string
  }): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Rural Community Hub</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #7EC9BB, #6BB3A6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #7EC9BB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          .stats { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚜 Welcome to Rural Community Hub!</h1>
          <p>G'day ${user.firstName}, you're now part of Australia's strongest rural community network</p>
        </div>
        
        <div class="content">
          <h2>You're Connected with ${user.suburb}, ${user.state}</h2>
          
          <p>Thanks for joining Rural Community Hub! You're now connected with rural families across ${user.state} who understand the unique challenges of rural life.</p>
          
          <div class="stats">
            <h3>Your Profile</h3>
            <ul>
              <li><strong>Location:</strong> ${user.suburb}, ${user.state}</li>
              <li><strong>Property Type:</strong> ${user.propertyType}</li>
            </ul>
          </div>

          <h3>What's Next?</h3>
          <ol>
            <li><strong>Complete your emergency plan</strong> - Build a personalized plan for your property</li>
            <li><strong>Join local groups</strong> - Connect with farmers in your area</li>
            <li><strong>Introduce yourself</strong> - Make your first post to the community</li>
          </ol>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://ruralcommunityhub.com/dashboard" class="button">
              Get Started
            </a>
          </div>
        </div>
      </body>
      </html>
    `
  }

  private generateWelcomeEmailText(user: {
    firstName: string
    suburb: string
    state: string
    propertyType: string
  }): string {
    return `
Welcome to Rural Community Hub, ${user.firstName}!

You're now connected with ${user.suburb}, ${user.state}

Thanks for joining Rural Community Hub! You're now connected with rural families across ${user.state} who understand the unique challenges of rural life.

Your Profile:
- Location: ${user.suburb}, ${user.state}
- Property Type: ${user.propertyType}

What's Next:
1. Complete your emergency plan - Build a personalized plan for your property
2. Join local groups - Connect with farmers in your area  
3. Introduce yourself - Make your first post to the community

Get started: https://ruralcommunityhub.com/dashboard

Welcome to the Rural Community Hub family!
    `
  }

  private generateEmergencyAlertHTML(alert: {
    title: string
    message: string
    severity: string
    location: string
  }): string {
    const severityColors = {
      low: "#10B981",
      medium: "#F59E0B",
      high: "#EF4444",
      critical: "#DC2626",
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Emergency Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .alert-header { background: ${severityColors[alert.severity as keyof typeof severityColors]}; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .urgent { background: #FEF2F2; border: 2px solid #FECACA; padding: 15px; border-radius: 6px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="alert-header">
          <h1>🚨 ${alert.severity.toUpperCase()} ALERT</h1>
          <h2>${alert.title}</h2>
          <p>Location: ${alert.location}</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            <h3>Alert Details</h3>
            <p>${alert.message}</p>
          </div>

          <h3>Immediate Actions:</h3>
          <ul>
            <li>Check your emergency plan</li>
            <li>Contact family members</li>
            <li>Monitor official emergency services</li>
            <li>Stay connected with your community</li>
          </ul>

          <p><strong>Stay safe and look out for your neighbors.</strong></p>
        </div>
      </body>
      </html>
    `
  }

  private generateEmergencyAlertText(alert: {
    title: string
    message: string
    severity: string
    location: string
  }): string {
    return `
🚨 ${alert.severity.toUpperCase()} ALERT: ${alert.title}

Location: ${alert.location}

Alert Details:
${alert.message}

Immediate Actions:
- Check your emergency plan
- Contact family members  
- Monitor official emergency services
- Stay connected with your community

Stay safe and look out for your neighbors.
    `
  }

  private generateDigestEmailHTML(
    user: { firstName: string },
    digest: {
      newPosts: number
      helpRequests: number
      equipmentShares: number
      weatherAlerts: number
    },
  ): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Your Weekly Rural Community Update</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #7EC9BB, #6BB3A6); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .stat-box { background: white; padding: 15px; margin: 10px 0; border-radius: 6px; display: inline-block; width: 45%; text-align: center; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>📊 Your Weekly Update</h1>
          <p>G'day ${user.firstName}, here's what happened in your community this week</p>
        </div>
        
        <div class="content">
          <h2>Community Activity</h2>
          
          <div class="stat-box">
            <h3>${digest.newPosts}</h3>
            <p>New Posts</p>
          </div>
          
          <div class="stat-box">
            <h3>${digest.helpRequests}</h3>
            <p>Help Requests</p>
          </div>
          
          <div class="stat-box">
            <h3>${digest.equipmentShares}</h3>
            <p>Equipment Shares</p>
          </div>
          
          <div class="stat-box">
            <h3>${digest.weatherAlerts}</h3>
            <p>Weather Alerts</p>
          </div>

          <p>Visit your dashboard to see the latest updates and connect with your community.</p>
        </div>
      </body>
      </html>
    `
  }

  private generateDigestEmailText(
    user: { firstName: string },
    digest: {
      newPosts: number
      helpRequests: number
      equipmentShares: number
      weatherAlerts: number
    },
  ): string {
    return `
Your Weekly Rural Community Update

G'day ${user.firstName}, here's what happened in your community this week:

Community Activity:
- ${digest.newPosts} New Posts
- ${digest.helpRequests} Help Requests  
- ${digest.equipmentShares} Equipment Shares
- ${digest.weatherAlerts} Weather Alerts

Visit your dashboard to see the latest updates and connect with your community.
    `
  }
}

// Mock provider for development
class MockEmailProvider implements EmailProvider {
  async send(emailData: EmailData): Promise<EmailResult> {
    console.log("📧 Mock Email Sent:")
    console.log("To:", emailData.to)
    console.log("Subject:", emailData.subject)
    console.log("Content:", emailData.text || "HTML content provided")

    return {
      success: true,
      messageId: `mock_${Date.now()}`,
    }
  }
}

function createEmailService(): EmailService {
  const resendApiKey = process.env.RESEND_API_KEY
  const sendGridApiKey = process.env.SENDGRID_API_KEY

  if (resendApiKey) {
    const primary = new ResendProvider(resendApiKey)
    const fallback = sendGridApiKey ? new SendGridProvider(sendGridApiKey) : undefined
    return new EmailService(primary, fallback)
  } else if (sendGridApiKey) {
    const primary = new SendGridProvider(sendGridApiKey)
    return new EmailService(primary)
  } else {
    // Development mode - log emails instead of sending
    console.warn("No email API keys found. Emails will be logged to console.")
    return new EmailService(new MockEmailProvider())
  }
}

export const emailService = createEmailService()
