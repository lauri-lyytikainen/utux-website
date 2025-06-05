'use server'
import nodemailer from 'nodemailer'

interface FormData {
  name: string
  email: string
  message: string
}

type EmailResponse =
  | {
      data: string
      error: null
    }
  | {
      data: null
      error: string
    }

function validateFormData(data: FormData): boolean {
  // Validate name is 1 to 64 symbols
  if (data.name.length < 1 || data.name.length > 64) {
    return false
  }

  // Validate email is valid
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!emailRegex.test(data.email)) {
    return false
  }

  // Validate email is 1 to 256 symbols
  if (data.email.length < 1 || data.email.length > 256) {
    return false
  }

  // Validate message is 1 to 512 symbols
  if (data.message.length < 1 || data.message.length > 512) {
    return false
  }
  return true
}

export async function sendEmail(data: FormData): Promise<EmailResponse> {
  if (!validateFormData(data)) {
    return { data: null, error: 'Invalid form data' }
  }

  const name = data.name
  const email = data.email
  const message = data.message

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USERNAME,
      to: [email, process.env.GMAIL_USERNAME ?? ''],
      subject: `Utux.fi - ${name} sent you a message`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: hsl(var(--background)); color: hsl(var(--foreground));">
          <div style="text-align: center; margin-bottom: 24px;">
            <img 
              src="https://www.utux.fi/media/utux-dark.png" 
              alt="Utux Logo" 
              title="Utux Logo"
              width="100"
              height="40"
              style="height: 40px; margin-bottom: 16px;" 
            />
            <h2 style="color: hsl(var(--foreground)); font-size: 24px; font-weight: 600; margin: 0;">New Contact Request</h2>
          </div>
          
          <div style="background-color: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-radius: var(--radius); padding: 24px; margin-bottom: 24px;">
            <p style="color: hsl(var(--foreground)); font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">${message}</p>
            <div style="border-top: 1px solid hsl(var(--border)); padding-top: 16px; margin-top: 16px;">
              <p style="color: hsl(var(--muted-foreground)); font-size: 14px; margin: 0;">
                <strong>From:</strong> ${name}<br/>
                <strong>Email:</strong> ${email}
              </p>
            </div>
          </div>

          <div style="text-align: center; color: hsl(var(--muted-foreground)); font-size: 14px;">
            <p style="margin: 0;">This is an automated message from Utux.fi contact form</p>
          </div>
        </div>
      `,
      text: `${name} sent you a message:\n\n${message}\n\n${email}`,
      replyTo: email,
    })
    return { error: null, data: 'Email sent successfully!' }
  } catch (error) {
    return { error: 'Failed to send email', data: null }
  }
}
