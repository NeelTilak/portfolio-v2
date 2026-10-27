/**
 * Netlify Serverless Function: contact.js
 * Features: Anti-Bot CAPTCHA validation, Honeypot detection, and Gmail SMTP Dispatch
 */

const nodemailer = require('nodemailer');
const crypto = require('crypto');

const SECRET_KEY = process.env.CAPTCHA_SECRET || 'neel-tilak-anti-ddos-sec-token-2026-v1';

function verifyCaptcha(userCode, token) {
  if (!userCode || !token || !token.includes(':')) {
    return { valid: false, reason: 'Missing or malformed security token.' };
  }

  const [sig, tsStr] = token.split(':');
  const ts = parseInt(tsStr, 10);
  if (isNaN(ts)) {
    return { valid: false, reason: 'Invalid timestamp in token.' };
  }

  const now = Math.floor(Date.now() / 1000);
  if (now - ts > 600) {
    return { valid: false, reason: 'Security code expired. Please refresh the code.' };
  }
  if (now - ts < 1) {
    return { valid: false, reason: 'Submission too fast (suspected bot).' };
  }

  const expectedSig = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${userCode.trim().toUpperCase()}:${tsStr}`)
    .digest('hex');

  if (crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
    return { valid: true };
  }

  return { valid: false, reason: 'Incorrect security code. Please check characters.' };
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: ''
    };
  }

  // Handle GET /api/captcha
  if (event.httpMethod === 'GET') {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(`${code.toUpperCase()}:${timestamp}`)
      .digest('hex');
    const token = `${signature}:${timestamp}`;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: JSON.stringify({ code, token })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    let data;
    if (event.headers['content-type'] && event.headers['content-type'].includes('application/json')) {
      data = JSON.parse(event.body || '{}');
    } else {
      const querystring = require('querystring');
      data = querystring.parse(event.body || '');
    }

    const { name, email, subject, message, captcha_input, captcha_token, bot_field } = data;

    // 1. Honeypot check
    if (bot_field || data['bot-field']) {
      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true, message: 'Transmission received.' })
      };
    }

    // 2. Required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: false, error: 'Name, email, and message are required.' })
      };
    }

    // 3. CAPTCHA verification
    const captchaResult = verifyCaptcha(captcha_input, captcha_token);
    if (!captchaResult.valid) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: false, error: `Security check failed: ${captchaResult.reason}` })
      };
    }

    // 4. Send email via Gmail SMTP
    const smtpUser = process.env.SMTP_USER || 'neeltilak23@gmail.com';
    const smtpPass = process.env.SMTP_PASS || 'oapi iyrb yxjx cufo';
    const toEmail = process.env.TO_EMAIL || 'neeltilak23@gmail.com';

    const nm = typeof nodemailer.createTransport === 'function' ? nodemailer : (nodemailer.default || nodemailer);
    const transporter = nm.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const nowStr = new Date().toUTCString();

    const mailOptions = {
      from: `"Neel Tilak Portfolio" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio Query] ${subject || 'Direct Query'} — From ${name}`,
      text: `
New Verified Query Received via Portfolio Website (Anti-Bot Protected):

Sender Name:    ${name}
Sender Email:   ${email}
Subject:        ${subject || 'Portfolio Query'}
Timestamp:      ${nowStr}

Message:
${message}

---
Reply directly to this email to respond to ${name} at ${email}.
      `.trim(),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #080A0F; color: #E2E8F0; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #0E121B; border: 1px solid #1E293B; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #8B5CF6, #06B6D4); padding: 20px 24px; color: #ffffff;">
              <h2 style="margin: 0; font-size: 1.25rem;">🚀 New Verified Portfolio Query</h2>
              <div style="font-size:0.8rem;margin-top:4px;opacity:0.9;">🛡️ Anti-DDoS &amp; CAPTCHA Verified</div>
            </div>
            <div style="padding: 24px;">
              <p><strong>From:</strong> ${name} (<a href="mailto:${email}" style="color:#06B6D4;">${email}</a>)</p>
              <p><strong>Subject:</strong> ${subject || 'Portfolio Query'}</p>
              <p><strong>Received At:</strong> ${nowStr}</p>
              <hr style="border: 0; border-top: 1px solid #1E293B; margin: 20px 0;"/>
              <div style="background: #151B28; border-left: 4px solid #8B5CF6; padding: 16px; border-radius: 6px; font-size: 0.95rem; line-height: 1.6; color: #F8FAFC; white-space: pre-wrap;">${message}</div>
              <div style="text-align: center; margin-top: 24px;">
                <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject || 'Portfolio Query')}" style="display: inline-block; background: #8B5CF6; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 600;">Reply to ${name}</a>
              </div>
            </div>
            <div style="padding: 16px 24px; background: #0A0D14; font-size: 0.8rem; color: #64748B; text-align: center; border-top: 1px solid #1E293B;">
              Dispatched via Neel Tilak Portfolio Netlify Serverless Function (Anti-Bot Protected)
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Transmission received! Your query has been delivered directly to Neel Tilak.'
      })
    };
  } catch (error) {
    console.error('SMTP Delivery error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message || 'Failed to dispatch email transmission'
      })
    };
  }
};
