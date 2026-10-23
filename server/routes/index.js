import { Router } from 'express';
import { apiLimiter, formLimiter } from '../middleware/rateLimiter.js';

// API routes. Each route: rate limit -> spam check -> controller.
//
//   GET  /api/health      service + database status
//   POST /api/inquiries   quote request (Hire Me page)
//   POST /api/contact     contact form message
//
// Future features (client portal, invoices, bookings) get their own router
// files here, mounted only when finished.
export function createApiRouter({ submissionController, healthController, spamGuard }) {
  const router = Router();
  router.use(apiLimiter);

  router.get('/health', healthController.check);
  router.post('/inquiries', formLimiter, spamGuard, submissionController.createInquiry);
  router.post('/contact', formLimiter, spamGuard, submissionController.createContactMessage);

  return router;
}
