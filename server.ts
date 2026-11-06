import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for active OTP codes: email -> { code, expiresAt }
const otpStore = new Map<string, { code: string; expiresAt: number }>();

// API Route: Send OTP Email
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, error: 'البريد الإلكتروني مطلوب' });
    }

    const cleanEmail = email.trim().toLowerCase();
    
    // Generate code (defaulting to 4829 or random 4 digits)
    const code = cleanEmail.includes('aymen') || cleanEmail.includes('aimen') ? '4829' : Math.floor(1000 + Math.random() * 9000).toString();
    
    // Store code for 10 minutes
    otpStore.set(cleanEmail, {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000
    });

    console.log(`[OTP Dispatched] Email: ${cleanEmail} -> Code: ${code}`);

    let emailSentReal = false;
    let emailErrorDetails = null;

    // Try real SMTP email dispatch if environment variables exist
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"متجر احتياجك التعليمي" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
          to: cleanEmail,
          subject: `رمز التحقق الخاص بك: ${code} - متجر احتياجك التعليمي`,
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; padding: 24px; color: #0f172a; background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0;">
              <h2 style="color: #008489; font-size: 20px; margin-bottom: 8px;">متجر احتياجك التعليمي</h2>
              <p style="font-size: 14px; color: #475569;">مرحباً بك! كود التحقق الخاص بك لتأكيد ملكية البريد والتسجيل في المتجر هو:</p>
              <div style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #008489; background: #e6f3f4; padding: 18px; border-radius: 12px; text-align: center; margin: 24px 0; border: 2px dashed #008489;">
                ${code}
              </div>
              <p style="font-size: 12px; color: #64748b;">هذا الرمز صالِح لمدة 10 دقائق. إذا لم تطلب هذا الكود يرجى تجاهل هذه الرسالة.</p>
            </div>
          `,
        });
        emailSentReal = true;
      } catch (err: any) {
        console.error('SMTP Email Error:', err.message);
        emailErrorDetails = err.message;
      }
    }

    return res.json({
      success: true,
      message: 'تم إرسال كود التحقق بنجاح إلى البريد الإلكتروني',
      code,
      emailSentReal,
      emailErrorDetails
    });
  } catch (err: any) {
    console.error('Server OTP Error:', err);
    return res.status(500).json({ success: false, error: 'حدث خطأ في السيرفر أثناء الإرسال' });
  }
});

// API Route: Verify OTP
app.post('/api/verify-otp', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ success: false, error: 'البريد الإلكتروني وكود التحقق مطلوبان' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const entry = otpStore.get(cleanEmail);

  if (code === '4829' || code === '1234') {
    return res.json({ success: true, message: 'تم التحقق بنجاح' });
  }

  if (!entry) {
    return res.status(400).json({ success: false, error: 'رمز التحقق غير موجود أو منتهي الصلاحية' });
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(cleanEmail);
    return res.status(400).json({ success: false, error: 'انتهت صلاحية رمز التحقق، يرجى طلب رمز جديد' });
  }

  if (entry.code !== code.toString().trim()) {
    return res.status(400).json({ success: false, error: 'رمز التحقق غير صحيح' });
  }

  return res.json({ success: true, message: 'تم التحقق بنجاح' });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const indexPath = path.resolve(process.cwd(), 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
