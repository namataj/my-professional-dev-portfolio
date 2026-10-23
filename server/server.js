import { config, assertProductionConfig } from './config/env.js';
import { createApp } from './app.js';
import { closePool, pingDatabase } from './config/db.js';
import { logger } from './utils/logger.js';

assertProductionConfig();

const app = createApp();
const server = app.listen(config.port, async () => {
  logger.info(`API listening on http://localhost:${config.port} (${config.env})`);
  try {
    await pingDatabase();
    logger.info(`Connected to MySQL database "${config.db.database}"`);
  } catch (err) {
    logger.warn(`MySQL is not reachable yet: ${err.message}. Form submissions will fail until it is.`);
  }
});

async function shutdown(signal) {
  logger.info(`${signal} received, shutting down`);
  server.close(async () => {
    await closePool().catch(() => {});
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10_000).unref();
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
