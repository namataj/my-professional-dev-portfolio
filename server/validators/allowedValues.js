// Must match the options in client/src/data (services.js, healthcare.js, formOptions.js).
export const SERVICES = {
  'business-website': 'Business Website Development',
  ecommerce: 'E-Commerce Website Development',
  'web-application': 'Custom Web Application Development',
  'backend-api': 'Backend & REST API Development',
  'qa-automation': 'Software Testing & Test Automation',
  'website-redesign': 'Website Redesign & Modernization',
  'maintenance-support': 'Website Maintenance & Technical Support',
  'landing-page': 'Landing Page Development',
  'healthcare-website': 'Healthcare Website Development',
  'healthcare-management-app': 'Healthcare Management Applications',
  'healthcare-data': 'Healthcare Data Management',
  'healthcare-api': 'Healthcare API Integration',
  'healthcare-testing': 'Healthcare Software Testing',
  'healthcare-transformation': 'Healthcare Digital Transformation',
  other: 'Something else / not sure yet',
};

export const BUDGETS = ['Under $500', '$500–$1,500', '$1,500–$5,000', '$5,000–$10,000', 'Above $10,000', 'Not Sure'];

export const TIMELINES = ['As soon as possible', 'Within 1 month', '1–3 months', '3–6 months', 'Flexible'];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[+()\d\s.-]{7,20}$/;

// Patterns that suggest pasted patient information. The general inquiry
// forms must not collect protected health information.
const PHI_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/,
  /\b(mrn|medical record (number|no\.?))\b\s*[:#]?\s*\w+/i,
  /\b(date of birth|dob)\s*[:#]?\s*\d/i,
];
export const looksLikePhi = (text = '') => PHI_PATTERNS.some((re) => re.test(text));
export const PHI_MESSAGE =
  'This looks like it may include patient information. Please remove it and describe the project without personal health details.';
