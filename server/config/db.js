import mysql from 'mysql2/promise';
import { config } from './env.js';

// One shared connection pool for the whole app, created on first use.
let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: config.db.host,
      port: config.db.port,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      ssl: config.db.ssl ? { rejectUnauthorized: true } : undefined,
      waitForConnections: true,
      connectionLimit: 10,
      charset: 'utf8mb4',
      timezone: 'Z',
    });
  }
  return pool;
}

export async function pingDatabase() {
  const [rows] = await getPool().query('SELECT 1 AS ok');
  return rows[0]?.ok === 1;
}

export async function closePool() {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
}
