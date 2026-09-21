/**
 * Meta Conversions API (CAPI) Relay fuer healio.de.
 *
 * Vercel Serverless Function, Node Runtime (Fluid Compute Standard).
 *
 * Grundregeln:
 * - Ohne META_PIXEL_ID und META_CAPI_ACCESS_TOKEN antwortet die Funktion 204
 *   und tut nichts. Der Code ist ohne Konfiguration vollstaendig inaktiv.
 * - Das Zugriffstoken verlaesst niemals diese Funktion und wird nie geloggt.
 * - Es werden ausschliesslich vier Ereignisnamen und ein einziger,
 *   wertbeschraenkter Parameter (content_name) akzeptiert.
 * - Es werden keine personenbezogenen Daten gehasht oder uebertragen; wir
 *   senden schlicht keine. Nur IP, User-Agent sowie fbp/fbc gehen als
 *   technische Zuordnungsmerkmale mit, wie fuer CAPI vorgesehen.
 * - Die event_id kommt vom Client und ist identisch mit der Pixel-event_id,
 *   damit Meta beide Wege dedupliziert.
 */

const GRAPH_API_VERSION = 'v21.0';

const ALLOWED_EVENT_NAMES = new Set(['PageView', 'ViewContent', 'RechnerStart', 'Lead']);
const ALLOWED_CONTENT_NAMES = new Set(['zahn', 'ambulant', 'partner']);
const ALLOWED_ORIGINS = new Set(['https://healio.de', 'https://www.healio.de']);
const VERCEL_PREVIEW_ORIGIN = /^https:\/\/[a-z0-9][a-z0-9-]{0,200}\.vercel\.app$/;

const ALLOWED_HOSTS = new Set(['healio.de', 'www.healio.de']);
const VERCEL_PREVIEW_HOST = /^[a-z0-9][a-z0-9-]{0,200}\.vercel\.app$/;

// Diese Routen duerfen Meta nie erreichen, auch nicht ueber einen
// manipulierten Client-Aufruf.
const BLOCKED_PATHS = new Set(['/schwangerschaft']);
const QUERY_ALLOWLIST = /^(?:utm_[a-z_]{1,30}|fbclid)$/i;

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const FBP_PATTERN = /^fb\.[12]\.\d{1,20}\.[A-Za-z0-9_-]{1,64}$/;
const FBC_PATTERN = /^fb\.[12]\.\d{1,20}\.[A-Za-z0-9_-]{1,255}$/;
const PIXEL_ID_PATTERN = /^\d{6,20}$/;
const TEST_EVENT_CODE_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

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
  // Wenn die Vercel-Node-Helfer den Body schon gelesen haben, ist der Stream
  // beendet. Dann darf hier nicht auf Events gewartet werden.
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
    if (raw.length > 8192) {
      tooLarge = true;
      raw = '';
    }
  });
  req.on('end', () => finish(tooLarge ? null : raw));
  req.on('error', () => finish(null));
});

/** Nur eigene Seiten, ohne alles ausser utm_* und fbclid, ohne Hash. */
const sanitizeEventSourceUrl = (value) => {
  if (typeof value !== 'string' || value.length > 2048) return null;

  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== 'https:') return null;
  if (!ALLOWED_HOSTS.has(url.hostname) && !VERCEL_PREVIEW_HOST.test(url.hostname)) return null;

  const pathname = (url.pathname || '/').replace(/\/+$/, '').toLowerCase() || '/';
  if (BLOCKED_PATHS.has(pathname)) return null;

  const safeParams = new URLSearchParams();
  url.searchParams.forEach((paramValue, paramKey) => {
    if (QUERY_ALLOWLIST.test(paramKey)) safeParams.append(paramKey, paramValue);
  });

  const query = safeParams.toString();
  return `${url.origin}${url.pathname}${query ? `?${query}` : ''}`;
};

const sanitizeCustomData = (customData) => {
  if (!customData || typeof customData !== 'object' || Array.isArray(customData)) return null;
  const contentName = customData.content_name;
  if (typeof contentName !== 'string' || !ALLOWED_CONTENT_NAMES.has(contentName)) return null;
  return { content_name: contentName };
};

const readClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = typeof value === 'string' ? value.split(',')[0].trim() : '';
  if (first && first.length <= 64) return first;
  return req.socket?.remoteAddress || null;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end();
    return;
  }

  const origin = req.headers.origin;
  if (!isAllowedOrigin(origin)) {
    res.status(403).end();
    return;
  }

  const pixelId = (process.env.META_PIXEL_ID || '').trim();
  const accessToken = (process.env.META_CAPI_ACCESS_TOKEN || '').trim();

  // Ohne Konfiguration passiert nichts. Kein Fehler, keine Messung.
  if (!PIXEL_ID_PATTERN.test(pixelId) || accessToken === '') {
    res.status(204).end();
    return;
  }

  const payload = parseBody(req.body) || parseBody(await readRawBody(req));
  if (!payload || typeof payload !== 'object') {
    res.status(400).end();
    return;
  }

  const eventName = payload.event_name;
  const eventId = payload.event_id;
  if (typeof eventName !== 'string' || !ALLOWED_EVENT_NAMES.has(eventName)) {
    res.status(400).end();
    return;
  }
  if (typeof eventId !== 'string' || !UUID_PATTERN.test(eventId)) {
    res.status(400).end();
    return;
  }

  const eventSourceUrl = sanitizeEventSourceUrl(payload.event_source_url);
  if (!eventSourceUrl) {
    res.status(400).end();
    return;
  }

  const customData = sanitizeCustomData(payload.custom_data);

  const userAgent = typeof req.headers['user-agent'] === 'string'
    ? req.headers['user-agent'].slice(0, 512)
    : null;
  const clientIp = readClientIp(req);

  const fbp = typeof payload.fbp === 'string' && FBP_PATTERN.test(payload.fbp) ? payload.fbp : null;
  const fbc = typeof payload.fbc === 'string' && FBC_PATTERN.test(payload.fbc) ? payload.fbc : null;

  const testEventCode = (process.env.META_TEST_EVENT_CODE || '').trim();

  const body = {
    data: [{
      event_name: eventName,
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: {
        ...(clientIp ? { client_ip_address: clientIp } : {}),
        ...(userAgent ? { client_user_agent: userAgent } : {}),
        ...(fbp ? { fbp } : {}),
        ...(fbc ? { fbc } : {}),
      },
      ...(customData ? { custom_data: customData } : {}),
    }],
    access_token: accessToken,
    ...(TEST_EVENT_CODE_PATTERN.test(testEventCode) ? { test_event_code: testEventCode } : {}),
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${pixelId}/events`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    // Bewusst keine Antwortdetails loggen: sie koennen das Token spiegeln.
    res.status(response.ok ? 202 : 502).end();
  } catch {
    res.status(502).end();
  }
}
