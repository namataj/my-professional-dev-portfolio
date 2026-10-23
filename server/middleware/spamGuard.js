// Lightweight spam protection for public forms, without CAPTCHAs:
//  1. Honeypot: a hidden "website" field people never see. Bots that fill it
//     get a normal-looking success response, but nothing is saved or emailed.
//  2. Timing: the form sends when it was opened (startedAt). Submissions made
//     faster than a person could type are rejected.
export function createSpamGuard({ minFillMs = 3000, now = () => Date.now(), logger } = {}) {
  return function spamGuard(req, res, next) {
    const body = req.body || {};

    if (typeof body.website === 'string' && body.website.trim() !== '') {
      logger?.warn(`Honeypot triggered from ${req.ip}`);
      return res.status(201).json({ success: true, message: 'Thanks! Your message has been received.' });
    }

    const startedAt = Number(body.startedAt);
    const elapsed = now() - startedAt;
    // Reject missing values, values in the future, and very fast submissions.
    if (!Number.isFinite(startedAt) || elapsed < minFillMs || elapsed > 1000 * 60 * 60 * 24) {
      return res.status(400).json({
        success: false,
        message: 'Your submission could not be verified. Please reload the page and try again.',
      });
    }

    return next();
  };
}
