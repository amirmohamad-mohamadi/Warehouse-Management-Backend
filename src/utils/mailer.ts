// src/utils/mailer.ts
import nodemailer from "nodemailer";

export async function createTransporter() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // استفاده از SSL
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER, // ایمیل اصلی
      clientId: process.env.GMAIL_CLIENT_ID, // از Google Console
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN, // با scope کامل mail.google.com
    },
    logger: true, // لاگ داخلی
    debug: true, // دیباگ SMTP
  });

  // تست اتصال قبل از ارسال
  await transporter.verify();
  return transporter;
}

export async function sendResetEmail(to: string, token: string) {
  const resetLink = `http://localhost:5173/reset-password?token=${encodeURIComponent(
    token
  )}`;

  const transporter = await createTransporter();

  const info = await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject: "بازیابی رمز عبور",
    html: `
      <p>سلام،</p>
      <p>برای تغییر رمز عبور روی لینک زیر کلیک کنید:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>این لینک تا 15 دقیقه معتبر است.</p>
    `,
  });

  return info;
}
