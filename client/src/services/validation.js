// Client-side validation gives instant feedback. The server repeats every
// check (server/validators) — the browser is never trusted on its own.
import { allServiceSlugs, budgetOptions, timelineOptions } from '../data/formOptions.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{7,20}$/;

// Patterns that suggest someone is pasting patient information.
const PHI_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/, // US SSN format
  /\b(mrn|medical record (number|no\.?))\b\s*[:#]?\s*\w+/i,
  /\b(date of birth|dob)\s*[:#]?\s*\d/i,
];
export const looksLikePhi = (text = '') => PHI_PATTERNS.some((re) => re.test(text));

const PHI_MESSAGE =
  "This looks like it may include patient information. Please remove it — describe the project without any personal health details.";

export function validateQuote(v) {
  const e = {};
  if (!v.fullName.trim() || v.fullName.trim().length < 2) e.fullName = 'Enter your full name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = 'Enter a valid phone number, or leave it blank.';
  if (!allServiceSlugs.includes(v.service)) e.service = 'Choose the service you need.';
  const d = v.description.trim();
  if (d.length < 20) e.description = 'Describe your project in at least 20 characters.';
  else if (d.length > 5000) e.description = 'Keep the description under 5,000 characters.';
  else if (looksLikePhi(d)) e.description = PHI_MESSAGE;
  if (!budgetOptions.includes(v.budget)) e.budget = 'Choose an estimated budget.';
  if (!timelineOptions.includes(v.timeline)) e.timeline = 'Choose an expected timeline.';
  if (!v.noPhiConfirmed) e.noPhiConfirmed = 'Confirm that your message contains no patient health information.';
  return e;
}

export function validateContact(v) {
  const e = {};
  if (!v.name.trim() || v.name.trim().length < 2) e.name = 'Enter your name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  if (v.subject.trim().length > 150) e.subject = 'Keep the subject under 150 characters.';
  const m = v.message.trim();
  if (m.length < 10) e.message = 'Write a message of at least 10 characters.';
  else if (m.length > 5000) e.message = 'Keep the message under 5,000 characters.';
  else if (looksLikePhi(m)) e.message = PHI_MESSAGE;
  return e;
}
