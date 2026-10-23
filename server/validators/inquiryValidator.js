import { cleanEmail, cleanText } from '../utils/sanitize.js';
import { BUDGETS, EMAIL_RE, PHI_MESSAGE, PHONE_RE, SERVICES, TIMELINES, looksLikePhi } from './allowedValues.js';

// Returns { value, errors }. `value` holds cleaned data; `errors` maps field -> message.
export function validateInquiry(body = {}) {
  const value = {
    fullName: cleanText(body.fullName, { maxLength: 100 }),
    email: cleanEmail(body.email),
    phone: cleanText(body.phone, { maxLength: 20 }),
    organization: cleanText(body.organization, { maxLength: 150 }),
    service: cleanText(body.service, { maxLength: 60 }),
    description: cleanText(body.description, { maxLength: 5001, multiline: true }),
    budget: cleanText(body.budget, { maxLength: 40 }),
    timeline: cleanText(body.timeline, { maxLength: 40 }),
  };
  const errors = {};

  if (value.fullName.length < 2) errors.fullName = 'Enter your full name.';
  if (!EMAIL_RE.test(value.email)) errors.email = 'Enter a valid email address.';
  if (value.phone && !PHONE_RE.test(value.phone)) errors.phone = 'Enter a valid phone number, or leave it blank.';
  if (!Object.hasOwn(SERVICES, value.service)) errors.service = 'Choose a service from the list.';
  if (value.description.length < 20) errors.description = 'Describe your project in at least 20 characters.';
  else if (value.description.length > 5000) errors.description = 'Keep the description under 5,000 characters.';
  else if (looksLikePhi(value.description)) errors.description = PHI_MESSAGE;
  if (!BUDGETS.includes(value.budget)) errors.budget = 'Choose an estimated budget.';
  if (!TIMELINES.includes(value.timeline)) errors.timeline = 'Choose an expected timeline.';
  if (body.noPhiConfirmed !== true) {
    errors.noPhiConfirmed = 'Confirm that your request contains no patient health information.';
  }

  return { value, errors };
}
