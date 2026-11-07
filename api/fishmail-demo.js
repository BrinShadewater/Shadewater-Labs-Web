import { Pool } from 'pg';
import { PgStore } from '../server/futureproof-pilot/db.js';
import { handler } from '../server/futureproof-pilot/http.js';
import { emptyState, Pilot } from '../server/futureproof-pilot/pilot.js';
import { Realtime } from '../server/futureproof-pilot/realtime.js';

// This row and its Ably namespace are separate from the retired test event.
const eventId = 'shadewater-fishmail-demo-v1';
let ready;

async function initialize() {
  const env = process.env;
  if (env.PILOT_ENABLED !== '1' || env.PILOT_MODE !== 'test') throw new Error('FishMail is disabled');
  const origin = new URL(env.PILOT_ORIGIN);
  const database = new URL(env.PILOT_DATABASE_URL);
  if (origin.origin !== env.PILOT_ORIGIN || origin.protocol !== 'https:' ||
      !['postgres:', 'postgresql:'].includes(database.protocol) ||
      database.searchParams.get('sslmode') !== 'verify-full') {
    throw new Error('Invalid FishMail configuration');
  }

  const pool = new Pool({
    connectionString: env.PILOT_DATABASE_URL,
    max: 3,
    connectionTimeoutMillis: 5000,
    query_timeout: 10000,
  });
  try {
    await pool.query(
      'INSERT INTO futureproof_pilot_events(id,state) VALUES($1,$2::jsonb) ON CONFLICT (id) DO NOTHING',
      [eventId, JSON.stringify(emptyState(eventId))],
    );
    const pilot = new Pilot(new PgStore(pool, eventId), 'test', [], Date.now, true, false);
    return handler(pilot, {
      origin: origin.origin,
      secure: true,
      trustedProxy: env.VERCEL === '1',
      realtime: env.PILOT_ABLY_KEY ? new Realtime(pilot, env.PILOT_ABLY_KEY) : undefined,
    });
  } catch (error) {
    await pool.end();
    throw error;
  }
}

export default async function fishmailDemo(req, res) {
  const url = new URL(req.url ?? '/', 'https://shadewaterlabs.com');
  const path = url.searchParams.get('route') ?? req.query?.route;
  if (typeof path !== 'string' || !/^[a-z-]+(?:\/[a-z-]+)*$/.test(path)) {
    return res.writeHead(404, { 'Content-Type': 'application/json' }).end('{"code":"invalid"}');
  }
  url.searchParams.delete('route');
  req.url = '/api/fishmail/' + path + url.search;
  let handle;
  try {
    ready ??= initialize();
    handle = await ready;
  } catch {
    ready = undefined;
    return res.writeHead(503, {
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-store',
    }).end('{"code":"unavailable","message":"FishMail is temporarily unavailable."}');
  }
  return handle(req, res);
}

export const config = { api: { bodyParser: false } };
