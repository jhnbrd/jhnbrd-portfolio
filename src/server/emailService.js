import nodemailer from 'nodemailer'
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

// Ensure local .env is loaded in development and standalone server
function loadEnvFile() {
  try {
    const envPath = join(process.cwd(), '.env')
    if (existsSync(envPath)) {
      const content = readFileSync(envPath, 'utf8')
      const lines = content.split('\n')
      for (const line of lines) {
        const trimmed = line.trim()
        if (trimmed && !trimmed.startsWith('#')) {
          const idx = trimmed.indexOf('=')
          if (idx !== -1) {
            const key = trimmed.slice(0, idx).trim()
            const val = trimmed.slice(idx + 1).trim()
            if (!process.env[key]) {
              process.env[key] = val
            }
          }
        }
      }
    }
  } catch (err) {}
}

loadEnvFile()

let transporterInstance = null

function getTransporter() {
  if (transporterInstance) return transporterInstance

  loadEnvFile()
  const user = process.env.GMAIL_USER || 'dev.jhnbrd@gmail.com'
  const pass = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '')

  if (!pass) {
    console.warn('[EmailService] GMAIL_APP_PASSWORD not set in environment.')
  }

  transporterInstance = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })

  return transporterInstance
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Generate Letterhead HTML for Visitor Confirmation
 * Styles: 'light' (Editorial White Paper), 'dark' (Obsidian Dark Terminal), 'memo' (Classic Memorandum)
 */
export function generateLetterheadHtml({ name, email, subject, message, style = 'memo' }) {
  const safeName = escapeHtml(name)
  const safeSubject = escapeHtml(subject)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Manila',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) + ' PHT'

  if (style === 'dark') {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 32px 16px; background-color: #050505; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f3f4f6;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #0c0d12; border: 1px solid #262626; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.8);" border="0" cellspacing="0" cellpadding="0">
          <tr><td style="height: 2px; background: linear-gradient(90deg, #38bdf8 0%, #34d399 50%, #818cf8 100%);"></td></tr>
          <tr>
            <td style="padding: 32px 36px 20px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td><span style="font-family: monospace; font-size: 14px; font-weight: 700; letter-spacing: 2px; color: #ffffff;">jb</span></td>
                  <td align="right"><span style="font-family: monospace; font-size: 11px; letter-spacing: 1px; color: #34d399;">● DISPATCH LOGGED</span></td>
                </tr>
              </table>
              <div style="height: 1px; background-color: #1f222e; margin: 16px 0 12px 0;"></div>
              <div style="font-size: 12px; color: #9ca3af; font-family: monospace;">Jhianne Berida · Backend Architect · Davao City, PH</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 36px 32px 36px;">
              <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 500; color: #ffffff;">Hi ${safeName},</h1>
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.65; color: #d1d5db;">
                Thank you for reaching out. Your inquiry regarding <strong style="color: #38bdf8;">"${safeSubject}"</strong> has been logged in my direct queue (<span style="color: #9ca3af; font-family: monospace;">dev@jhnbrd.com</span>).
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.65; color: #9ca3af;">
                I will personally review your specifications and follow up within <strong style="color: #ffffff;">24–48 hours</strong>.
              </p>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #12151c; border: 1px solid #232734; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                <tr><td style="padding: 12px 18px; border-bottom: 1px solid #1a1e2b;"><span style="font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; color: #38bdf8;">DISPATCH SUMMARY</span></td></tr>
                <tr>
                  <td style="padding: 16px 18px;">
                    <div style="font-family: monospace; font-size: 11px; color: #828ca1; margin-bottom: 6px;">SUBJECT: <span style="color: #ffffff;">${safeSubject}</span></div>
                    <div style="font-family: monospace; font-size: 11px; color: #828ca1; margin-bottom: 12px;">TIMESTAMP: <span style="color: #34d399;">${timestamp}</span></div>
                    <div style="font-size: 13px; line-height: 1.6; color: #e2e8f0; background-color: #0b0d12; padding: 14px; border-radius: 8px; border: 1px solid #1c202d;">${safeMessage}</div>
                  </td>
                </tr>
              </table>
              <div style="font-size: 14px; color: #d1d5db; line-height: 1.6;">
                Regards,<br><strong style="color: #ffffff;">Jhianne Berida</strong><br>
                <span style="font-size: 12px; color: #828ca1; font-family: monospace;">DevJunction Inc. · <a href="https://jhnbrd.com" style="color: #828ca1;">jhnbrd.com</a></span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }

  if (style === 'memo') {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 32px 16px; background-color: #fafafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111827;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.04);" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td style="padding: 28px 32px 18px 32px; border-bottom: 2px solid #0f172a;">
              <span style="font-family: monospace; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #64748b; text-transform: uppercase;">TRANSMISSION MEMORANDUM</span>
              <div style="font-size: 20px; font-weight: 700; color: #0f172a; margin-top: 4px;">JHIANNE BERIDA</div>
              <div style="font-size: 12px; color: #64748b; font-family: monospace; margin-top: 2px;">DevJunction Inc. · dev@jhnbrd.com</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; font-family: monospace; font-size: 11px; color: #475569; line-height: 1.8;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr><td width="70" style="color: #94a3b8; font-weight: 700;">TO:</td><td style="color: #0f172a; font-weight: 600;">${safeName} &lt;${escapeHtml(email)}&gt;</td></tr>
                <tr><td style="color: #94a3b8; font-weight: 700;">FROM:</td><td style="color: #0f172a;">Jhianne Berida &lt;dev@jhnbrd.com&gt;</td></tr>
                <tr><td style="color: #94a3b8; font-weight: 700;">DATE:</td><td>${timestamp}</td></tr>
                <tr><td style="color: #94a3b8; font-weight: 700;">SUBJECT:</td><td style="color: #0f172a; font-weight: 600;">RE: ${safeSubject}</td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 32px 32px;">
              <p style="margin: 0 0 14px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                This automated transmission confirms that your inquiry was successfully dispatched to my personal engineering queue.
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.65; color: #334155;">
                All project scopes, architectural consultations, and collaboration proposals are reviewed directly. You will receive an operational response within <strong>24 to 48 hours</strong>.
              </p>
              <div style="border-left: 2px solid #0f172a; padding: 4px 0 4px 16px; margin: 20px 0;">
                <span style="font-family: monospace; font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 6px;">RECORDED MESSAGE</span>
                <div style="margin: 0; font-size: 13px; line-height: 1.6; color: #1e293b; font-style: italic;">${safeMessage}</div>
              </div>
              <div style="font-size: 13px; color: #475569; margin-top: 28px; line-height: 1.5;">
                Sincerely,<br><strong style="color: #0f172a; font-size: 14px;">Jhianne Berida</strong><br>
                <span style="font-size: 11px; color: #64748b; font-family: monospace;">Backend Architect · Davao City, Philippines</span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
  }

  // Default: 'light' (Editorial White Paper)
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 32px 16px; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111827;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.03);" border="0" cellspacing="0" cellpadding="0">
          <tr><td style="height: 3px; background-color: #111827;"></td></tr>
          <tr>
            <td style="padding: 32px 36px 20px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td><span style="font-family: monospace; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; color: #111827; text-transform: uppercase;">JB.DEV</span></td>
                  <td align="right"><span style="font-family: monospace; font-size: 11px; letter-spacing: 1px; color: #9ca3af; text-transform: uppercase;">TRANSMISSION RECEIPT · 2026</span></td>
                </tr>
              </table>
              <div style="height: 1px; background-color: #f3f4f6; margin: 16px 0 12px 0;"></div>
              <div style="font-size: 12px; color: #6b7280;"><strong style="color: #111827;">Jhianne Berida</strong> · Backend Architect &amp; Systems Developer · Davao City, Philippines</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 36px 32px 36px;">
              <h1 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #111827;">Hi ${safeName},</h1>
              <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.65; color: #374151;">
                Thank you for getting in touch through my portfolio. Your message regarding <strong>"${safeSubject}"</strong> has been safely delivered to my direct inbox (<a href="mailto:dev@jhnbrd.com" style="color: #111827; text-decoration: underline;">dev@jhnbrd.com</a>).
              </p>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.65; color: #374151;">
                I review all technical inquiries and client requirements personally. You can expect a thoughtful response from me within <strong>24 to 48 hours</strong>.
              </p>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fafafa; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
                <tr><td style="padding: 12px 18px; border-bottom: 1px solid #f0f0f0;"><span style="font-family: monospace; font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #9ca3af; text-transform: uppercase;">INQUIRY TRANSCRIPT COPY</span></td></tr>
                <tr>
                  <td style="padding: 16px 18px;">
                    <div style="font-family: monospace; font-size: 11px; color: #6b7280; margin-bottom: 6px;">SUBJECT: <strong style="color: #111827;">${safeSubject}</strong></div>
                    <div style="font-family: monospace; font-size: 11px; color: #6b7280; margin-bottom: 12px;">TIMESTAMP: <span style="color: #374151;">${timestamp}</span></div>
                    <div style="font-size: 13px; line-height: 1.6; color: #1f2937; background-color: #ffffff; padding: 12px 14px; border-radius: 8px; border: 1px solid #e5e7eb; font-style: italic;">${safeMessage}</div>
                  </td>
                </tr>
              </table>
              <div style="font-size: 14px; color: #374151; line-height: 1.6;">
                Warm regards,<br><strong style="color: #111827; font-size: 15px;">Jhianne Berida</strong><br>
                <span style="font-size: 12px; color: #6b7280;">DevJunction Inc. · <a href="https://jhnbrd.com" style="color: #6b7280; text-decoration: none;">jhnbrd.com</a></span>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #fafafa; border-top: 1px solid #f3f4f6; padding: 18px 36px; text-align: center;">
              <span style="font-family: monospace; font-size: 11px; color: #9ca3af;">
                <a href="https://github.com/jhnbrd" style="color: #6b7280; text-decoration: none; margin: 0 8px;">GitHub</a> ·
                <a href="https://linkedin.com/in/jhianneberida" style="color: #6b7280; text-decoration: none; margin: 0 8px;">LinkedIn</a> ·
                <a href="https://jhnbrd.com" style="color: #6b7280; text-decoration: none; margin: 0 8px;">Portfolio</a>
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Dispatch both Admin Alert & Visitor Letterhead confirmation
 */
export async function sendContactEmails({ name, email, subject, message, style = 'memo' }) {
  const transporter = getTransporter()
  const recipientInbox = process.env.RECIPIENT_EMAIL || 'dev@jhnbrd.com'
  const senderDisplayName = process.env.SENDER_DISPLAY_NAME || 'Jhianne Berida'
  const fromAddress = `"${senderDisplayName}" <${recipientInbox}>`

  // 1. Email to Admin (You)
  const adminMailOptions = {
    from: fromAddress,
    to: recipientInbox,
    replyTo: `"${name}" <${email}>`,
    subject: `[Portfolio Inquiry] ${subject} - from ${name}`,
    text: `New contact inquiry received from portfolio:\n\nSender: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}\n\nReply directly to this email to respond to ${name}.`,
    html: `<div style="font-family: sans-serif; font-size: 14px; color: #111; line-height: 1.6;">
      <h2 style="font-size: 18px; margin-bottom: 12px;">New Inquiry from Portfolio</h2>
      <p><strong>Sender:</strong> ${escapeHtml(name)} &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt;</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <div style="background: #f4f5f7; padding: 16px; border-radius: 8px; border-left: 3px solid #111; margin: 16px 0;">
        ${escapeHtml(message).replace(/\n/g, '<br>')}
      </div>
      <p style="color: #666; font-size: 12px;">Hit "Reply" in your email client to reply directly to ${escapeHtml(name)}.</p>
    </div>`,
  }

  // 2. Email to Sender with Official Letterhead
  const visitorMailOptions = {
    from: fromAddress,
    to: email,
    replyTo: fromAddress,
    subject: `Inquiry Acknowledgment: ${subject}`,
    text: `Hi ${name},\n\nThank you for reaching out through my portfolio. Your message regarding "${subject}" has been received at dev@jhnbrd.com.\n\nI review all technical inquiries personally and will respond within 24–48 hours.\n\nSummary of your message:\n${message}\n\nBest regards,\nJhianne Berida\nDevJunction Inc. · https://jhnbrd.com`,
    html: generateLetterheadHtml({ name, email, subject, message, style }),
  }

  // Send both concurrently
  const [adminResult, visitorResult] = await Promise.all([
    transporter.sendMail(adminMailOptions),
    transporter.sendMail(visitorMailOptions),
  ])

  return {
    success: true,
    adminMessageId: adminResult.messageId,
    visitorMessageId: visitorResult.messageId,
  }
}
