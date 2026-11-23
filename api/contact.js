// api/contact.js — Vercel Serverless Function
// Deploy this project to Vercel and set RESEND_API_KEY in Vercel environment variables.

import { Resend } from 'resend';

const RECIPIENT = 'this.gokul.s@gmail.com';
const RATE_LIMIT = new Map(); // simple in-memory per-IP rate limit (resets on cold start)

function rateCheck(ip) {
  const now = Date.now();
  const record = RATE_LIMIT.get(ip);
  if (record && now - record.time < 60_000 && record.count >= 3) return false; // 3 req/min
  RATE_LIMIT.set(ip, { time: record ? record.time : now, count: (record?.count || 0) + 1 });
  return true;
}

function sanitize(str, maxLen = 500) {
  return String(str ?? '').replace(/<[^>]*>/g, '').trim().slice(0, maxLen);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket?.remoteAddress || 'unknown';
  if (!rateCheck(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute before trying again.' });
  }

  const { name, email, subject, message } = req.body ?? {};

  // Server-side validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address format.' });
  }
  const cleanName = sanitize(name, 100);
  const cleanEmail = sanitize(email, 150);
  const cleanSubject = sanitize(subject, 200);
  const cleanMessage = sanitize(message, 3000);

  if (cleanMessage.length < 10) {
    return res.status(400).json({ error: 'Message is too short.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY environment variable is not set.');
    return res.status(500).json({ error: 'Email service is not configured. Please contact Gokul directly at this.gokul.s@gmail.com' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;background:#0a0d16;color:#e0e6f0;padding:0;margin:0;">
  <div style="max-width:580px;margin:0 auto;padding:40px 24px;">
    <div style="background:#151923;border:1px solid rgba(86,200,255,0.2);border-radius:16px;padding:32px;">
      <div style="margin-bottom:24px;">
        <span style="font-family:monospace;font-size:11px;color:#56C8FF;letter-spacing:2px;text-transform:uppercase;">
          PORTFOLIO CONTACT — New Message
        </span>
      </div>
      <h2 style="font-size:22px;font-weight:800;color:#ffffff;margin:0 0 24px;">
        ${cleanSubject}
      </h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#8ba0b8;font-family:monospace;font-size:12px;width:90px;">From</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#e0e6f0;font-size:14px;">${cleanName}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);color:#8ba0b8;font-family:monospace;font-size:12px;">Email</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);font-size:14px;">
            <a href="mailto:${cleanEmail}" style="color:#56C8FF;text-decoration:none;">${cleanEmail}</a>
          </td>
        </tr>
      </table>
      <div style="background:#0d1018;border-radius:12px;padding:20px;border:1px solid rgba(255,255,255,0.05);">
        <p style="font-family:monospace;font-size:11px;color:#56C8FF;margin:0 0 12px;letter-spacing:1px;text-transform:uppercase;">Message</p>
        <p style="font-size:14px;line-height:1.75;color:#ccd5e0;margin:0;white-space:pre-wrap;">${cleanMessage}</p>
      </div>
      <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.06);font-family:monospace;font-size:11px;color:#4a5568;">
        Sent via gokul-portfolio contact form • Reply directly to ${cleanEmail}
      </div>
    </div>
  </div>
</body>
</html>`;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [RECIPIENT],
      replyTo: cleanEmail,
      subject: `[Portfolio] ${cleanSubject}`,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({ error: 'Email delivery failed. Please try again or contact Gokul directly.' });
    }

    return res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Server error. Please contact Gokul directly at this.gokul.s@gmail.com' });
  }
}
