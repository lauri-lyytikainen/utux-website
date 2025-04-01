'use server'
const nodemailer = require('nodemailer')

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
      to: process.env.GMAIL_USERNAME,
      subject: `Utux.fi - ${name} sent you a message`,
      text: message,
      replyTo: email,
    })
    return { error: null, data: 'Email sent successfully!' }
  } catch (error) {
    console.error(error)
    return { error: 'Failed to send email', data: null }
  }
}
