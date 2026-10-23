import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/env.js';
import { container } from './container.js';
import { createApiRouter } from './routes/index.js';
import { createErrorHandler, notFound } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  if (config.trustProxy) app.set('trust proxy', config.trustProxy);

  // Security headers. The CSP allows the site's own files plus Google Fonts.
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
        },
      },
    })
  );

  // Only the configured frontend origin(s) may call the API from a browser.
  app.use(
    '/api',
    cors({
      origin(origin, cb) {
        if (!origin || config.clientOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
      },
      methods: ['GET', 'POST'],
    })
  );

  app.use(express.json({ limit: '20kb' }));

  app.use('/api', createApiRouter(container));
  app.use('/api', notFound);

  // Optional: serve the built React app from the same server.
  const clientDist = path.resolve(__dirname, '../client/dist');
  if (config.serveClient && fs.existsSync(clientDist)) {
    app.use(express.static(clientDist, { maxAge: '7d', index: false }));
    // React Router handles page URLs, so unknown paths return index.html.
    app.get('*', (_req, res) => res.sendFile(path.join(clientDist, 'index.html')));
  }

  app.use(createErrorHandler({ logger, isProduction: config.isProduction }));
  return app;
}
