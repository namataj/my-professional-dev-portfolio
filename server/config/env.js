import 'dotenv/config';

// All configuration comes from environment variables (see .env.example).
// Nothing secret is hard-coded.
const bool = (v, fallback = false) => (v === undefined || v === '' ? fallback : /^(1|true|yes)$/i.test(v));
const int = (v, fallback) => (Number.isFinite(Number.parseInt(v, 10)) ? Number.parseInt(v, 10) : fallback);

export const config = {
  env: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: int(process.env.PORT, 5000),
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  serveClient: bool(process.env.SERVE_CLIENT),
  trustProxy: int(process.env.TRUST_PROXY, 0),

  db: {
    host: process.env.DB_HOST || 'localhost',
    port: int(process.env.DB_PORT, 3306),
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'james_namata_portfolio',
    ssl: bool(process.env.DB_SSL),
  },

  mail: {
    host: process.env.SMTP_HOST || '',
    port: int(process.env.SMTP_PORT, 587),
    secure: bool(process.env.SMTP_SECURE),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    notifyEmail: process.env.NOTIFY_EMAIL || '',
    from: process.env.MAIL_FROM || 'Portfolio Website <no-reply@localhost>',
  },

  minFormFillMs: int(process.env.MIN_FORM_FILL_MS, 3000),
};

// Fail fast in production if essential settings are missing.
export function assertProductionConfig() {
  if (!config.isProduction) return;
  const missing = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'CLIENT_ORIGIN'].filter((k) => !process.env[k]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
