import { validateInquiry } from '../validators/inquiryValidator.js';
import { validateContact } from '../validators/contactValidator.js';

// Controllers translate HTTP <-> service calls. They validate input, call the
// service, and choose the response. No SQL or email code lives here.
const requestMeta = (req) => ({
  ipAddress: req.ip,
  userAgent: (req.get?.('user-agent') || '').slice(0, 255),
});

export function createSubmissionController(service) {
  return {
    async createInquiry(req, res, next) {
      try {
        const { value, errors } = validateInquiry(req.body);
        if (Object.keys(errors).length) {
          return res.status(400).json({ success: false, message: 'Please correct the highlighted fields.', errors });
        }
        const { id } = await service.createInquiry({ ...value, ...requestMeta(req) });
        return res.status(201).json({
          success: true,
          id,
          message: "Thanks for your request. I'll review your project details and reply by email, usually within two business days.",
        });
      } catch (err) {
        return next(err);
      }
    },

    async createContactMessage(req, res, next) {
      try {
        const { value, errors } = validateContact(req.body);
        if (Object.keys(errors).length) {
          return res.status(400).json({ success: false, message: 'Please correct the highlighted fields.', errors });
        }
        const { id } = await service.createContactMessage({ ...value, ...requestMeta(req) });
        return res.status(201).json({ success: true, id, message: "Thanks for getting in touch. I'll reply by email soon." });
      } catch (err) {
        return next(err);
      }
    },
  };
}
