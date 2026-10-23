// Run with: npm run db:check
// Confirms the .env database settings work and the tables exist.
import { getPool, closePool } from '../config/db.js';
import { config } from '../config/env.js';

try {
  const [tables] = await getPool().query(
    "SELECT TABLE_NAME AS name FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME IN ('inquiries','contact_messages')",
    [config.db.database]
  );
  const found = tables.map((t) => t.name).sort();
  console.log(`Connected to ${config.db.host}:${config.db.port}/${config.db.database}`);
  console.log(found.length === 2 ? 'Tables found: contact_messages, inquiries' : `Missing tables. Found: ${found.join(', ') || 'none'} — run database/schema.sql`);
  process.exitCode = found.length === 2 ? 0 : 1;
} catch (err) {
  console.error('Database check failed:', err.message);
  process.exitCode = 1;
} finally {
  await closePool();
}
