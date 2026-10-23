// Last-resort error handling. Never leaks stack traces or SQL details to the browser.
export function createErrorHandler({ logger, isProduction }) {
  // eslint-disable-next-line no-unused-vars
  return function errorHandler(err, req, res, _next) {
    // Malformed JSON body
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ success: false, message: 'The request body is not valid JSON.' });
    }
    if (err.type === 'entity.too.large') {
      return res.status(413).json({ success: false, message: 'The request is too large.' });
    }
    if (err.message === 'Not allowed by CORS') {
      return res.status(403).json({ success: false, message: 'Origin not allowed.' });
    }

    logger.error(`${req.method} ${req.originalUrl}:`, err.stack || err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong on our side and your request wasn't saved. Please try again, or email directly.",
      ...(isProduction ? {} : { detail: err.message }),
    });
  };
}

export function notFound(req, res) {
  res.status(404).json({ success: false, message: `No API route for ${req.method} ${req.originalUrl}` });
}
