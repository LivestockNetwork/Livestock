# Email Service Setup Guide

This guide will help you set up email services for your Rural Community Hub application.

## Option 1: Resend (Recommended)

Resend is the easiest and most reliable email service for Next.js applications.

### Step 1: Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" 
3. Create account with your email
4. Verify your email address

### Step 2: Get API Key
1. After logging in, go to "API Keys" in the dashboard
2. Click "Create API Key"
3. Name it "Rural Community Hub"
4. Copy the API key (starts with `re_`)

### Step 3: Add Domain (Optional but Recommended)
1. Go to "Domains" in Resend dashboard
2. Click "Add Domain"
3. Enter your domain (e.g., `ruralcommunityhub.com`)
4. Follow DNS setup instructions
5. Once verified, you can send from `noreply@yourdomain.com`

### Step 4: Add to Environment Variables
\`\`\`bash
RESEND_API_KEY=re_your_api_key_here
\`\`\`

## Option 2: SendGrid (Fallback)

SendGrid is a reliable alternative email service.

### Step 1: Create SendGrid Account
1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for free account (100 emails/day free)
3. Complete account verification

### Step 2: Create API Key
1. Go to Settings > API Keys
2. Click "Create API Key"
3. Choose "Restricted Access"
4. Give permissions for "Mail Send"
5. Copy the API key (starts with `SG.`)

### Step 3: Add to Environment Variables
\`\`\`bash
SENDGRID_API_KEY=SG.your_api_key_here
\`\`\`

## Development Setup (No API Keys Needed)

For development and testing, you don't need real API keys. The system will automatically use a mock email provider that logs emails to the console.

Just start your development server and emails will be logged like this:

\`\`\`
📧 Mock Email Sent:
To: user@example.com
Subject: Welcome to Rural Community Hub, John!
Content: Welcome email content...
\`\`\`

## Environment Variables Setup

Create a `.env.local` file in your project root:

\`\`\`bash
# Email Service (choose one or both)
RESEND_API_KEY=re_your_resend_key_here
SENDGRID_API_KEY=SG.your_sendgrid_key_here

# Other environment variables
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## Testing Your Email Setup

Use this test component to verify your email service is working:

\`\`\`tsx
// components/email-test.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { emailService } from '@/lib/email-service'

export function EmailTest() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const testEmail = async () => {
    setStatus('Sending...')
    
    const result = await emailService.sendWelcomeEmail({
      email,
      firstName: 'Test',
      lastName: 'User',
      suburb: 'Test Town',
      state: 'NSW',
      propertyType: 'Test Farm'
    })

    if (result.success) {
      setStatus('✅ Email sent successfully!')
    } else {
      setStatus(`❌ Error: ${result.error}`)
    }
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">Test Email Service</h3>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter test email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={testEmail} disabled={!email}>
          Send Test
        </Button>
      </div>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </div>
  )
}
\`\`\`

## Production Checklist

Before going live:

- [ ] Set up custom domain in Resend/SendGrid
- [ ] Configure SPF/DKIM records for better deliverability
- [ ] Set up email templates with your branding
- [ ] Test emergency alert emails
- [ ] Set up email analytics and monitoring
- [ ] Configure unsubscribe handling
- [ ] Set up bounce and complaint handling

## Pricing

### Resend
- Free: 3,000 emails/month
- Pro: $20/month for 50,000 emails
- Scale: $85/month for 100,000 emails

### SendGrid
- Free: 100 emails/day
- Essentials: $19.95/month for 50,000 emails
- Pro: $89.95/month for 100,000 emails

## Support

If you need help setting up email services:
- Resend Documentation: [resend.com/docs](https://resend.com/docs)
- SendGrid Documentation: [docs.sendgrid.com](https://docs.sendgrid.com)
- Contact me for specific setup questions
\`\`\`

Now let me create a **quick setup component** to help you test the email integration:
