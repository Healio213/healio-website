/**
 * Anonymer Zähler ohne Cookies für healio.de (src/lib/anonyme-zaehler.js).
 *
 * Vercel Serverless Function, Node Runtime, Region fra1.
 *
 * Grundregeln:
 * - Angenommen werden nur drei Ereignisse mit festen, geprüften Feldern
 *   (shared/anonyme-zaehler.js). Alles andere wird verworfen.
 * - Weitergegeben werden nur ereignis, von_pfad, ziel und geraet. Keine IP,
 *   kein User-Agent, kein Referrer, keine Uhrzeit; das Datum setzt die
 *   Datenbank. Es wird nichts geloggt.
 * - geraet („mobil“ oder „desktop“) leitet die Funktion aus der
 *   Browserkennung der Anfrage ab. Der Browser selbst liest dafür nichts aus.
 * - Die IP dient nur flüchtig als Schutz gegen Schleifen (Zähler im Speicher
 *   der Instanz, als Prüfwert mit zufälligem Salz je Instanz) und wird nie
 *   gespeichert oder weitergegeben.
 * - Geschrieben wird mit dem vorhandenen öffentlichen Schlüssel
 *   (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) in public.anonyme_zaehler. Die
 *   Rolle anon darf dort nur einfügen, mit denselben Prüfungen wie hier.
 * - Ohne Konfiguration oder ohne Tabelle antwortet die Funktion trotzdem 204.
 *   Eine Zählung darf nie etwas auf der Website stören.
 * - Nur Aufrufe von healio.de zählen. Vorschau-Deployments schreiben nichts
 *   in die Produktionszahlen.
 */

import crypto from 'node:crypto';
import { geraetAusUserAgent, pruefeZaehlerEintrag } from '../shared/anonyme-zaehler.js';

const ALLOWED_ORIGINS = new Set(['https://healio.de', 'https://www.healio.de']);
const MAX_BODY_BYTES = 1024;
const STORAGE_TIMEOUT_MS = 2500;

// Gegen einfache Schleifen: 60 Zählungen je Minute und Anschluss reichen für
// jedes echte Klickverhalten.
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_BUCKETS = 5000;
const INSTANCE_SALT = crypto.randomBytes(16).toString('hex');
const rateLimitBuckets = new Map();

const readClientKey = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = typeof value === 'string' ? value.split(',')[0].trim() : '';
  const ip = first && first.length <= 64 ? first : req.socket?.remoteAddress || '';
  if (!ip) return null;
  return crypto.createHash('sha256').update(`${INSTANCE_SALT}:${ip}`).digest('hex');
};

const isRateLimited = (key) => {
  if (!key) return false;
  const now = Date.now();
  if (rateLimitBuckets.size > RATE_LIMIT_MAX_BUCKETS) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (now - bucket.startedAt > RATE_LIMIT_WINDOW_MS) rateLimitBuckets.delete(bucketKey);
    }
  }
  const bucket = rateLimitBuckets.get(key);
  if (!bucket || now - bucket.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(key, { startedAt: now, count: 1 });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
};

const parseBody = (body) => {
  if (!body) return null;
  if (typeof body === 'object' && !Buffer.isBuffer(body)) return body;
  try {
    const text = Buffer.isBuffer(body) ? body.toString('utf8') : String(body);
    if (text.length > MAX_BODY_BYTES) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
};

const readRawBody = (req) => new Promise((resolve) => {
  if (typeof req.on !== 'function' || req.readable === false || req.complete === true) {
    resolve(null);
    return;
  }
  let raw = '';
  let tooLarge = false;
  const timer = setTimeout(() => resolve(null), 1500);
  const finish = (value) => {
    clearTimeout(timer);
    resolve(value);
  };
  req.on('data', (chunk) => {
    if (tooLarge) return;
    raw += chunk;
    if (raw.length > MAX_BODY_BYTES) {
      tooLarge = true;
      raw = '';
    }
  });
  req.on('end', () => finish(tooLarge ? null : raw));
  req.on('error', () => finish(null));
});

const noContent = (res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(204).end();
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : '';
  if (!ALLOWED_ORIGINS.has(origin)) {
    res.status(403).json({ error: 'forbidden_origin' });
    return;
  }

  const payload = parseBody(req.body) || parseBody(await readRawBody(req));
  const eintrag = pruefeZaehlerEintrag(payload, geraetAusUserAgent(req.headers['user-agent']));
  if (!eintrag) {
    res.status(400).json({ error: 'invalid_event' });
    return;
  }

  if (isRateLimited(readClientKey(req))) {
    res.status(429).json({ error: 'too_many_requests' });
    return;
  }

  const supabaseUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const supabaseKey = (process.env.SUPABASE_PUBLISHABLE_KEY || '').trim();
  if (supabaseUrl === '' || supabaseKey === '') {
    noContent(res);
    return;
  }

  try {
    // Nur Einfügerecht: return=minimal, sonst bräuchte die Antwort ein Leserecht.
    await fetch(`${supabaseUrl}/rest/v1/anonyme_zaehler`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(eintrag),
      signal: AbortSignal.timeout(STORAGE_TIMEOUT_MS),
    });
  } catch {
    // Fehlende Tabelle, Zeitüberschreitung oder Netzfehler bleiben still.
  }
  noContent(res);
}
