/**
 * Leadspeicher fuer das Altersvorsorgedepot-Webinar (/altersvorsorgedepot).
 *
 * Vercel Serverless Function, Node Runtime. Kopie des Sicherheitsmusters aus
 * api/partner-lead.js:
 * - Ohne SUPABASE_URL und SUPABASE_PUBLISHABLE_KEY antwortet die Funktion 503
 *   und speichert nichts. Der Code ist ohne Konfiguration vollstaendig inaktiv.
 * - Es wird nichts geloggt. Weder E-Mail noch Name noch Telefonnummer duerfen
 *   in einem Log landen.
 * - Die IP wird nie im Klartext gespeichert, sondern nur als SHA-256 ueber IP
 *   plus geheimes Salt (LEAD_IP_SALT). Ohne Salt wird gar kein Wert gesetzt.
 * - Die Einwilligungsfassung wird als fester Text-Stand mitgeschrieben, damit
 *   spaeter belegbar ist, welchem Text zugestimmt wurde.
 */

import crypto from 'node:crypto';

const ALLOWED_ORIGINS = new Set(['https://healio.de', 'https://www.healio.de']);
const VERCEL_PREVIEW_ORIGIN = /^https:\/\/[a-z0-9][a-z0-9-]{0,200}\.vercel\.app$/;

const LEAD_SOURCE = 'website_altersvorsorgedepot_webinar';
export const CONSENT_TEXT_VERSION = 'altersvorsorge-v2-2026-10-06';

// Muss mit den Termin-IDs in src/content/altersvorsorgedepotContent.js
// uebereinstimmen. Bewusst dupliziert wie PRACTICE_TYPES bei partner-lead.js:
// diese Funktion importiert nichts aus src/, damit sie unabhaengig bleibt.
export const WEBINAR_SLOTS = Object.freeze([
  'termin-2026-11-12',
  'termin-2026-12-01',
  'termin-2027-01-14',
  'aufzeichnung',
  'nur-check',
]);
const WEBINAR_SLOT_SET = new Set(WEBINAR_SLOTS);

// "Kein Webinar, nur der Zuschuss-Check": Wir rufen an, also sind
// Rueckruf-Einwilligung und Telefonnummer hier Pflicht.
const NUR_CHECK_SLOT = 'nur-check';

export const SEGMENTE = Object.freeze(['selbststaendige', 'eltern', 'riester', 'einsteiger']);
const SEGMENT_SET = new Set(SEGMENTE);

// Bewusst einfache Pruefung. Sie soll Tippfehler und Muell abfangen, nicht
// jede exotische Adresse aus dem RFC nachbilden.
const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@.]{1,63}(?:\.[^\s@.]{1,63}){1,4}$/;
const PHONE_PATTERN = /^[+\d][\d\s/().-]{5,39}$/;

// Klick-Kennung der Google-Anzeige (gclid), gleiches Format wie in
// src/lib/google-ads.js. Sie kommt nur mit, wenn die Person "marketing"
// erlaubt hat; das prueft der Browser. Hier zaehlt nur das Format.
const GCLID_PATTERN = /^[A-Za-z0-9_-]{10,200}$/;

const MAX_BODY_BYTES = 8192;
const MAX_UTM_LENGTH = 200;
const MAX_USER_AGENT_LENGTH = 400;

// Ratenbegrenzung je IP: 5 Anfragen in 10 Minuten. Der Speicher lebt nur so
// lange wie die Function-Instanz. Das reicht gegen einfache Schleifen; gegen
// verteilte Angriffe schuetzt zusaetzlich die Pflichteinwilligung.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const rateLimitBuckets = new Map();

const isAllowedOrigin = (origin) => (
  typeof origin === 'string'
  && (ALLOWED_ORIGINS.has(origin) || VERCEL_PREVIEW_ORIGIN.test(origin))
);

const parseBody = (body) => {
  if (!body) return null;
  if (typeof body === 'object' && !Buffer.isBuffer(body)) return body;

  try {
    return JSON.parse(Buffer.isBuffer(body) ? body.toString('utf8') : String(body));
  } catch {
    return null;
  }
};

const readRawBody = (req) => new Promise((resolve) => {
  if (req.readable === false || req.complete === true) {
    resolve(null);
    return;
  }

  let raw = '';
  let tooLarge = false;
  const timer = setTimeout(() => resolve(null), 2000);
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

const readClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = typeof value === 'string' ? value.split(',')[0].trim() : '';
  if (first && first.length <= 64) return first;
  return req.socket?.remoteAddress || null;
};

/** Ohne Salt gibt es keinen Hash. Lieber kein Wert als ein ratbarer Wert. */
const hashIp = (ip) => {
  const salt = (process.env.LEAD_IP_SALT || '').trim();
  if (!ip || salt === '') return null;
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex');
};

const isRateLimited = (key) => {
  if (!key) return false;
  const now = Date.now();

  for (const [bucketKey, bucket] of rateLimitBuckets) {
    if (now - bucket.startedAt > RATE_LIMIT_WINDOW_MS) rateLimitBuckets.delete(bucketKey);
  }

  const bucket = rateLimitBuckets.get(key);
  if (!bucket || now - bucket.startedAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitBuckets.set(key, { startedAt: now, count: 1 });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
};

const readText = (value, maxLength) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed === '' || trimmed.length > maxLength) return null;
  return trimmed;
};

const readOptionalTracking = (value) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed === '') return null;
  return trimmed.slice(0, MAX_UTM_LENGTH);
};

/** Nur die bekannten Kampagnenfelder, gekuerzt, ohne freie Zusatzschluessel. */
export const buildUtm = (tracking) => {
  if (!tracking || typeof tracking !== 'object' || Array.isArray(tracking)) return null;

  const utm = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'referrer']) {
    const value = readOptionalTracking(tracking[key]);
    if (value) utm[key] = value;
  }

  // Die Klick-Kennung landet in derselben JSON-Spalte, es braucht keine neue
  // Datenbankspalte. Ungueltige Werte werden still verworfen.
  const gclid = typeof tracking.gclid === 'string' ? tracking.gclid.trim() : '';
  if (GCLID_PATTERN.test(gclid)) utm.gclid = gclid;

  return Object.keys(utm).length > 0 ? utm : null;
};

/** Zahl in einem festen Bereich, sonst null. Grenzen passend zum Rechner. */
const readBoundedNumber = (value, min, max) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < min || numeric > max) return null;
  return Math.round(numeric * 100) / 100;
};

/** Reine Pruefung ohne Seiteneffekte, damit sie testbar bleibt. */
export const validateLead = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return { ok: false, status: 400, error: 'invalid_request' };
  }

  // Der Honeypot wird bereits im Browser abgefangen. Kommt er trotzdem
  // gefuellt an, ist es ein Bot: wir antworten freundlich und speichern
  // nichts, damit das Skript nichts ueber die Pruefung lernt.
  const honeypot = typeof payload.healio_website === 'string' ? payload.healio_website.trim() : '';
  if (honeypot !== '') return { ok: true, discard: true };

  const firstName = readText(payload.first_name, 80);
  if (!firstName) return { ok: false, status: 400, error: 'invalid_first_name' };

  const email = readText(payload.email, 254);
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, error: 'invalid_email' };
  }

  const webinarSlot = typeof payload.webinar_slot === 'string' ? payload.webinar_slot.trim() : '';
  if (!WEBINAR_SLOT_SET.has(webinarSlot)) {
    return { ok: false, status: 400, error: 'invalid_webinar_slot' };
  }

  const rawSegment = typeof payload.segment === 'string' ? payload.segment.trim() : '';
  if (rawSegment !== '' && !SEGMENT_SET.has(rawSegment)) {
    return { ok: false, status: 400, error: 'invalid_segment' };
  }

  const callbackConsent = payload.callback_consent === true;
  const rawPhone = typeof payload.phone === 'string' ? payload.phone.trim() : '';
  if (rawPhone !== '') {
    if (!callbackConsent) return { ok: false, status: 400, error: 'phone_requires_callback_consent' };
    if (!PHONE_PATTERN.test(rawPhone)) return { ok: false, status: 400, error: 'invalid_phone' };
  }

  if (webinarSlot === NUR_CHECK_SLOT) {
    if (!callbackConsent) return { ok: false, status: 400, error: 'check_requires_callback_consent' };
    if (rawPhone === '') return { ok: false, status: 400, error: 'check_requires_phone' };
  }

  if (payload.consent_contact !== true) {
    return { ok: false, status: 400, error: 'consent_required' };
  }
  if (payload.consent_text_version !== CONSENT_TEXT_VERSION) {
    return { ok: false, status: 400, error: 'invalid_consent_version' };
  }

  // Grenzen wie im Rechner: 0 bis 300 EUR im Monat (0 nur als defensiver
  // Rand, der Regler selbst geht nicht unter 10), 0 bis 6 Kinder, Zulage im
  // Jahr theoretisch bis 540 + 6 x 300 = 2.340 EUR.
  const monatsbeitrag = readBoundedNumber(payload.monatsbeitrag, 0, 300);
  if (monatsbeitrag === null) return { ok: false, status: 400, error: 'invalid_monatsbeitrag' };

  const kinderRaw = Number(payload.kinder);
  const kinder = Number.isInteger(kinderRaw) && kinderRaw >= 0 && kinderRaw <= 6 ? kinderRaw : null;
  if (kinder === null) return { ok: false, status: 400, error: 'invalid_kinder' };

  if (typeof payload.unter25 !== 'boolean') return { ok: false, status: 400, error: 'invalid_unter25' };
  if (typeof payload.selbststaendig !== 'boolean') return { ok: false, status: 400, error: 'invalid_selbststaendig' };
  if (typeof payload.riester !== 'boolean') return { ok: false, status: 400, error: 'invalid_riester' };

  const zulageJahr = readBoundedNumber(payload.zulage_jahr, 0, 3000);
  if (zulageJahr === null) return { ok: false, status: 400, error: 'invalid_zulage_jahr' };

  return {
    ok: true,
    discard: false,
    lead: {
      first_name: firstName,
      email,
      webinar_slot: webinarSlot,
      phone: rawPhone === '' ? null : rawPhone,
      callback_consent: callbackConsent,
      consent_contact: true,
      consent_text_version: CONSENT_TEXT_VERSION,
      segment: rawSegment === '' ? null : rawSegment,
      monatsbeitrag,
      kinder,
      unter25: payload.unter25,
      selbststaendig: payload.selbststaendig,
      riester: payload.riester,
      zulage_jahr: zulageJahr,
      source: LEAD_SOURCE,
      utm: buildUtm(payload.utm),
    },
  };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  if (!isAllowedOrigin(req.headers.origin)) {
    res.status(403).json({ error: 'forbidden_origin' });
    return;
  }

  if (process.env.ALTERSVORSORGE_WEBINAR_ENABLED !== 'true') {
    res.status(503).json({ error: 'not_configured' });
    return;
  }

  const supabaseUrl = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const supabaseKey = (process.env.SUPABASE_PUBLISHABLE_KEY || '').trim();
  if (supabaseUrl === '' || supabaseKey === '') {
    res.status(503).json({ error: 'not_configured' });
    return;
  }

  const clientIp = readClientIp(req);
  const ipHash = hashIp(clientIp);
  if (isRateLimited(ipHash || clientIp)) {
    res.status(429).json({ error: 'too_many_requests' });
    return;
  }

  const payload = parseBody(req.body) || parseBody(await readRawBody(req));
  const result = validateLead(payload);
  if (!result.ok) {
    res.status(result.status).json({ error: result.error });
    return;
  }
  if (result.discard) {
    res.status(200).json({ ok: true });
    return;
  }

  const userAgent = typeof req.headers['user-agent'] === 'string'
    ? req.headers['user-agent'].slice(0, MAX_USER_AGENT_LENGTH)
    : null;

  const row = {
    ...result.lead,
    user_agent: userAgent,
    ip_hash: ipHash,
  };

  try {
    // Es gibt bewusst nur ein Insert-Recht. return=representation wuerde ein
    // Leserecht voraussetzen und fehlschlagen.
    const response = await fetch(`${supabaseUrl}/rest/v1/altersvorsorge_leads`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });

    if (!response.ok) {
      res.status(502).json({ error: 'storage_failed' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch {
    res.status(502).json({ error: 'storage_failed' });
  }
}
