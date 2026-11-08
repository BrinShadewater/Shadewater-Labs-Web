import { Pool } from 'pg';

const origin = 'https://shadewaterlabs.com';
const pagesByAction = {
  'play-brinespace': ['/', '/projects'],
  'try-fishmail': ['/', '/projects', '/projects/futureproof'],
  'browse-open-source': ['/'],
  'read-case-study': ['/projects'],
};

let ready;

async function initialize() {
  const pool = new Pool({
    connectionString: process.env.PILOT_DATABASE_URL,
    max: 2,
    connectionTimeoutMillis: 5000,
    statement_timeout: 5000,
  });
  pool.on('error', () => console.error('Project click database connection closed'));

  try {
    // Serialize initialization across cold starts. A single batch runs in one transaction.
    await pool.query(`
      SELECT pg_advisory_xact_lock(668210427);
      CREATE SCHEMA IF NOT EXISTS labs_analytics;
      CREATE TABLE IF NOT EXISTS labs_analytics.project_clicks_daily (
        day date NOT NULL,
        action text NOT NULL,
        source_page text NOT NULL,
        clicks bigint NOT NULL,
        PRIMARY KEY (day, action, source_page)
      );
    `);
    return pool;
  } catch (error) {
    await pool.end();
    throw error;
  }
}

export default async function projectClick(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }
  if (req.headers.origin !== origin) return res.status(403).end();
  if (req.headers['content-type'] !== 'application/json') return res.status(415).end();

  const payload = req.body;
  if (!payload || typeof payload !== 'object' || Object.keys(payload).length !== 2 ||
      !Object.hasOwn(pagesByAction, payload.action) || !pagesByAction[payload.action].includes(payload.sourcePage)) {
    return res.status(400).end();
  }

  if (!process.env.PILOT_DATABASE_URL) return res.status(503).end();

  try {
    ready ??= initialize().catch(error => {
      ready = undefined;
      throw error;
    });
    const pool = await ready;
    await pool.query(`
      INSERT INTO labs_analytics.project_clicks_daily AS daily (day, action, source_page, clicks)
      VALUES ((CURRENT_TIMESTAMP AT TIME ZONE 'UTC')::date, $1, $2, 1)
      ON CONFLICT (day, action, source_page) DO UPDATE SET clicks = daily.clicks + 1
    `, [payload.action, payload.sourcePage]);
    return res.status(204).end();
  } catch {
    console.error('Project click counter unavailable');
    return res.status(503).end();
  }
}
