import { getPool } from '../config/db.js';

// Database access only. Every query uses placeholders (?) so user input is
// sent separately from the SQL and can never change the query (prevents SQL injection).

export async function insertInquiry(inquiry) {
  const sql = `
    INSERT INTO inquiries
      (full_name, email, phone, organization, service, description, budget, timeline, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    inquiry.fullName,
    inquiry.email,
    inquiry.phone || null,
    inquiry.organization || null,
    inquiry.service,
    inquiry.description,
    inquiry.budget,
    inquiry.timeline,
    inquiry.ipAddress || null,
    inquiry.userAgent || null,
  ];
  const [result] = await getPool().execute(sql, params);
  return { id: result.insertId };
}

export async function insertContactMessage(message) {
  const sql = `
    INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent)
    VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    message.name,
    message.email,
    message.subject || null,
    message.message,
    message.ipAddress || null,
    message.userAgent || null,
  ];
  const [result] = await getPool().execute(sql, params);
  return { id: result.insertId };
}
