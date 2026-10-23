import { services } from './services.js';
import { healthcareAreas } from './healthcare.js';

// Values must match server/validators/inquiryValidator.js
export const budgetOptions = [
  'Under $500',
  '$500–$1,500',
  '$1,500–$5,000',
  '$5,000–$10,000',
  'Above $10,000',
  'Not Sure',
];

export const timelineOptions = [
  'As soon as possible',
  'Within 1 month',
  '1–3 months',
  '3–6 months',
  'Flexible',
];

export const serviceOptionGroups = [
  {
    label: 'Business services',
    options: services.map((s) => ({ value: s.slug, label: s.name })),
  },
  {
    label: 'Healthcare technology',
    options: healthcareAreas.map((h) => ({ value: h.slug, label: h.name })),
  },
  {
    label: 'Other',
    options: [{ value: 'other', label: 'Something else / not sure yet' }],
  },
];

export const allServiceSlugs = serviceOptionGroups.flatMap((g) => g.options.map((o) => o.value));
