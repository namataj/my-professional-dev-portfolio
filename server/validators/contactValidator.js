import { cleanEmail, cleanText } from '../utils/sanitize.js';
import { EMAIL_RE, PHI_MESSAGE, looksLikePhi } from './allowedValues.js';

export function validateContact(body = {}) {
  const value = {
    name: cleanText(body.name, { maxLength: 100 }),
    email: cleanEmail(body.email),
    subject: cleanText(body.subject, { maxLength: 151 }),
    message: cleanText(body.message, { maxLength: 5001, multiline: true }),
  };
  const errors = {};

  if (value.name.length < 2) errors.name = 'Enter your name.';
  if (!EMAIL_RE.test(value.email)) errors.email = 'Enter a valid email address.';
  if (value.subject.length > 150) errors.subject = 'Keep the subject under 150 characters.';
  if (value.message.length < 10) errors.message = 'Write a message of at least 10 characters.';
  else if (value.message.length > 5000) errors.message = 'Keep the message under 5,000 characters.';
  else if (looksLikePhi(value.message)) errors.message = PHI_MESSAGE;

  return { value, errors };
}
