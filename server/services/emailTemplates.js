import { escapeHtml } from '../utils/sanitize.js';
import { SERVICES } from '../validators/allowedValues.js';

// Builds notification emails. All user-supplied text is HTML-escaped.
const row = (label, value) =>
  value
    ? `<tr><td style="padding:6px 12px 6px 0;color:#4A5568;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1E242E">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
    : '';

const wrap = (title, rows) => `
  <div style="font-family:Arial,sans-serif;max-width:640px">
    <h2 style="color:#0A1630;margin:0 0 16px">${escapeHtml(title)}</h2>
    <table style="border-collapse:collapse;font-size:14px">${rows}</table>
  </div>`;

export function inquiryEmail(inquiry, id) {
  const serviceName = SERVICES[inquiry.service] || inquiry.service;
  const fields = [
    ['Name', inquiry.fullName],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Organization', inquiry.organization],
    ['Service', serviceName],
    ['Budget', inquiry.budget],
    ['Timeline', inquiry.timeline],
    ['Description', inquiry.description],
  ];
  return {
    subject: `New quote request #${id}: ${serviceName} — ${inquiry.fullName}`,
    text: fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: wrap('New quote request', fields.map(([k, v]) => row(k, v)).join('')),
    replyTo: inquiry.email,
  };
}

export function contactEmail(message, id) {
  const fields = [
    ['Name', message.name],
    ['Email', message.email],
    ['Subject', message.subject],
    ['Message', message.message],
  ];
  return {
    subject: `New contact message #${id}${message.subject ? `: ${message.subject}` : ''} — ${message.name}`,
    text: fields.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: wrap('New contact message', fields.map(([k, v]) => row(k, v)).join('')),
    replyTo: message.email,
  };
}
