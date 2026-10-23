import rateLimit from 'express-rate-limit';

const tooMany = (message) => ({ success: false, message });

// General limit for all API routes.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: tooMany('Too many requests. Please wait a few minutes and try again.'),
});

// Stricter limit for form submissions: 5 per IP per hour.
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: tooMany("You've sent several requests recently. Please try again later, or email directly."),
});
