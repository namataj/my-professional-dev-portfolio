// Minimal logger. Swap for pino/winston later without touching callers.
const stamp = () => new Date().toISOString();
export const logger = {
  info: (...args) => console.log(stamp(), 'INFO', ...args),
  warn: (...args) => console.warn(stamp(), 'WARN', ...args),
  error: (...args) => console.error(stamp(), 'ERROR', ...args),
};
