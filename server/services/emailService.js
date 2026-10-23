import nodemailer from 'nodemailer';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

// Sends notification emails through SMTP. If SMTP isn't configured, it logs
// instead so development works without an email account.
let transporter;

function getTransporter() {
  if (!config.mail.host) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure,
      auth: config.mail.user ? { user: config.mail.user, pass: config.mail.pass } : undefined,
    });
  }
  return transporter;
}

export async function sendNotification({ subject, text, html, replyTo }) {
  const t = getTransporter();
  if (!t || !config.mail.notifyEmail) {
    logger.info(`[email skipped — SMTP not configured] ${subject}`);
    return { sent: false };
  }
  await t.sendMail({ from: config.mail.from, to: config.mail.notifyEmail, replyTo, subject, text, html });
  return { sent: true };
}
