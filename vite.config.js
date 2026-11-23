import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Vite dev-server plugin: handles POST /api/contact using Resend SDK.
 * In production (Vercel), the api/contact.js serverless function is used instead.
 */
function contactApiPlugin() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
        if (req.method !== 'POST') {
          res.writeHead(405); res.end(JSON.stringify({ error: 'Method not allowed.' })); return;
        }

        // Collect body
        let body = '';
        for await (const chunk of req) body += chunk;

        let data;
        try { data = JSON.parse(body); }
        catch { res.writeHead(400); res.end(JSON.stringify({ error: 'Invalid JSON.' })); return; }

        const { name, email, subject, message } = data;
        if (!name || !email || !subject || !message) {
          res.writeHead(400); res.end(JSON.stringify({ error: 'All fields are required.' })); return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          res.writeHead(400); res.end(JSON.stringify({ error: 'Invalid email address.' })); return;
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          res.writeHead(500);
          res.end(JSON.stringify({
            error: 'Email service not configured. Set RESEND_API_KEY in a .env file and restart the server. For now, please email this.gokul.s@gmail.com directly.'
          }));
          return;
        }

        try {
          const { Resend } = await import('resend');
          const resend = new Resend(apiKey);

          const html = `
<div style="font-family:system-ui,sans-serif;background:#0a0d16;color:#e0e6f0;padding:40px 24px;max-width:580px;margin:0 auto;">
  <div style="background:#151923;border:1px solid rgba(86,200,255,0.2);border-radius:16px;padding:32px;">
    <p style="font-family:monospace;font-size:11px;color:#56C8FF;letter-spacing:2px;margin:0 0 16px;">PORTFOLIO CONTACT — New Message</p>
    <h2 style="font-size:20px;font-weight:800;color:#fff;margin:0 0 20px;">${subject}</h2>
    <p style="margin:0 0 6px;font-size:13px;"><span style="color:#8ba0b8;font-family:monospace;font-size:11px;">FROM:</span> ${name} &lt;<a href="mailto:${email}" style="color:#56C8FF;">${email}</a>&gt;</p>
    <div style="background:#0d1018;border-radius:12px;padding:20px;border:1px solid rgba(255,255,255,0.05);margin-top:16px;">
      <p style="font-family:monospace;font-size:11px;color:#56C8FF;margin:0 0 10px;">MESSAGE</p>
      <p style="font-size:14px;line-height:1.75;color:#ccd5e0;margin:0;white-space:pre-wrap;">${message}</p>
    </div>
    <p style="margin-top:20px;font-family:monospace;font-size:11px;color:#4a5568;">Reply directly to ${email}</p>
  </div>
</div>`;

          const { error: sendError } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['this.gokul.s@gmail.com'],
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            html,
          });

          if (sendError) {
            console.error('[contact-api] Resend error:', sendError);
            res.writeHead(502);
            res.end(JSON.stringify({ error: 'Email delivery failed. Please try again.' }));
            return;
          }

          res.writeHead(200);
          res.end(JSON.stringify({ success: true }));
        } catch (err) {
          console.error('[contact-api] Error:', err);
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Server error. Please email this.gokul.s@gmail.com directly.' }));
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Expose RESEND_API_KEY to the vite plugin (not to client bundle)
  process.env.RESEND_API_KEY = process.env.RESEND_API_KEY || env.RESEND_API_KEY;

  return {
    plugins: [
      tailwindcss(),
      react(),
      contactApiPlugin(),
    ],
    server: {
      port: 5173,
      host: true,
    },
  };
});
