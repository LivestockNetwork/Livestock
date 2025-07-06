import nodemailer from "nodemailer"

interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

interface EmailMessage {
  to: string
  subject: string
  text?: string
  html?: string
  from?: string
}

interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

class DirectEmailService {
  private transporter: nodemailer.Transporter | null = null
  private config: EmailConfig | null = null

  constructor() {
    this.initializeFromEnv()
  }

  private initializeFromEnv() {
    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS

    if (host && port && user && pass) {
      this.configure({
        host,
        port: Number.parseInt(port),
        secure: port === "465",
        auth: { user, pass },
      })
    }
  }

  configure(config: EmailConfig): void {
    this.config = config
    this.transporter = nodemailer.createTransporter({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
      tls: {
        rejectUnauthorized: false,
      },
    })
  }

  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.transporter) {
      return { success: false, error: "Email service not configured" }
    }

    try {
      await this.transporter.verify()
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  async sendEmail(message: EmailMessage): Promise<EmailResult> {
    if (!this.transporter || !this.config) {
      return { success: false, error: "Email service not configured" }
    }

    try {
      const result = await this.transporter.sendMail({
        from: message.from || this.config.auth.user,
        to: message.to,
        subject: message.subject,
        text: message.text,
        html: message.html,
      })

      return { success: true, messageId: result.messageId }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      }
    }
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<EmailResult> {
    const subject = "Welcome to Rural Emergency Hub"
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to Rural Emergency Hub!</h1>
        <p>Hi ${userName},</p>
        <p>Thank you for joining our rural emergency preparedness community. We're excited to have you on board!</p>
        
        <h2>What's Next?</h2>
        <ul>
          <li>Complete your emergency plan using our interactive wizards</li>
          <li>Connect with your local community groups</li>
          <li>Set up emergency alerts for your area</li>
          <li>Share resources and knowledge with fellow rural families</li>
        </ul>
        
        <p>If you have any questions, don't hesitate to reach out to our support team.</p>
        
        <p>Stay safe,<br>The Rural Emergency Hub Team</p>
      </div>
    `

    return this.sendEmail({
      to: userEmail,
      subject,
      html,
      text: `Welcome to Rural Emergency Hub! Hi ${userName}, thank you for joining our community...`,
    })
  }

  async sendEmergencyAlert(recipients: string[], alertMessage: string, alertType: string): Promise<EmailResult[]> {
    const subject = `🚨 Emergency Alert: ${alertType}`
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 3px solid #dc2626; padding: 20px;">
        <h1 style="color: #dc2626; text-align: center;">🚨 EMERGENCY ALERT</h1>
        <h2 style="color: #dc2626;">${alertType}</h2>
        <div style="background: #fef2f2; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="font-size: 16px; line-height: 1.5;">${alertMessage}</p>
        </div>
        <p><strong>This is an automated emergency alert from Rural Emergency Hub.</strong></p>
        <p>Please take appropriate action and stay safe.</p>
      </div>
    `

    const results: EmailResult[] = []

    for (const recipient of recipients) {
      const result = await this.sendEmail({
        to: recipient,
        subject,
        html,
        text: `EMERGENCY ALERT: ${alertType}\n\n${alertMessage}\n\nThis is an automated alert from Rural Emergency Hub.`,
      })
      results.push(result)
    }

    return results
  }

  async sendDigestEmail(userEmail: string, digestData: any): Promise<EmailResult> {
    const subject = "Your Weekly Rural Hub Digest"
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #059669;">Your Weekly Rural Hub Digest</h1>
        
        <h2>Community Activity</h2>
        <p>New posts this week: ${digestData.newPosts || 0}</p>
        <p>Active discussions: ${digestData.activeDiscussions || 0}</p>
        
        <h2>Emergency Updates</h2>
        <p>Weather alerts: ${digestData.weatherAlerts || 0}</p>
        <p>Community alerts: ${digestData.communityAlerts || 0}</p>
        
        <h2>Your Groups</h2>
        <p>You're a member of ${digestData.groupCount || 0} community groups.</p>
        
        <p>Stay connected and stay safe!</p>
        <p>The Rural Emergency Hub Team</p>
      </div>
    `

    return this.sendEmail({
      to: userEmail,
      subject,
      html,
      text: `Your Weekly Rural Hub Digest\n\nCommunity Activity: ${digestData.newPosts || 0} new posts...`,
    })
  }

  isConfigured(): boolean {
    return this.transporter !== null && this.config !== null
  }

  getConfig(): EmailConfig | null {
    return this.config
  }
}

// Create singleton instance
const directEmailService = new DirectEmailService()

// Named exports
export { DirectEmailService, directEmailService }
export const emailService = directEmailService

// Default export
export default directEmailService

// Export types
export type { EmailConfig, EmailMessage, EmailResult }
