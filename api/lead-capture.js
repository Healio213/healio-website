import crypto from 'node:crypto';
import { isPersonalOfferUrl, isValidLeadEmail, sanitizeLeadSourcePage, validateApplicationUrl } from '../shared/lead-capture.js';

const MAX_BODY_BYTES = 8192;
const MAX_BUCKETS = 2048;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const WEBHOOK_TIMEOUT_MS = 5000;
const REQUEST_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PAYLOAD_KEYS = new Set(['firstName', 'email', 'targetUrl', 'timestamp', 'sourcePage', 'trackingCategory']);

const readText = (value, maximum) => {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text && text.length <= maximum && !/[\u0000-\u001f\u007f]/.test(text) ? text : null;
};

/** Nur die vereinbarten Felder verlassen den Server. Kein Tracking-/Gesundheitsobjekt. */
export const validateCapturePayload = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)
    || Object.keys(payload).some((key) => !PAYLOAD_KEYS.has(key))) return { error: 'invalid_request' };
  const firstName = readText(payload.firstName, 80);
  if (!firstName) return { error: 'invalid_first_name' };
  const email = readText(payload.email, 254);
  if (!email || !isValidLeadEmail(email)) return { error: 'invalid_email' };
  const targetUrl = validateApplicationUrl(payload.targetUrl);
  if (!targetUrl) return { error: 'invalid_target_url' };
  const sourcePage = sanitizeLeadSourcePage(payload.sourcePage);
  if (!sourcePage) return { error: 'invalid_source_page' };
  const timestamp = readText(payload.timestamp, 30);
  if (!timestamp || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(timestamp)
    || !Number.isFinite(Date.parse(timestamp))) return { error: 'invalid_timestamp' };
  const isoTimestamp = new Date(timestamp).toISOString();
  if (isoTimestamp !== (timestamp.includes('.') ? timestamp : timestamp.replace('Z', '.000Z'))) {
    return { error: 'invalid_timestamp' };
  }
  const lead = { firstName, email, targetUrl, timestamp: isoTimestamp, sourcePage };
  if (isPersonalOfferUrl(targetUrl) !== (payload.trackingCategory === 'arag-v100')) {
    return { error: 'invalid_tracking_category' };
  }
  if (payload.trackingCategory !== undefined) {
    if (typeof payload.trackingCategory !== 'string' || !/^[a-z][a-z0-9_-]{0,63}$/.test(payload.trackingCategory)) {
      return { error: 'invalid_tracking_category' };
    }
    lead.trackingCategory = payload.trackingCategory;
  }
  return { lead };
};

const isAllowedOrigin = (req, environment) => {
  const origin = req.headers.origin;
  if (origin === 'https://healio.de' || origin === 'https://www.healio.de') return true;
  // Nur die Vercel-Adressen dieses Deployments, keine beliebige fremde Preview.
  for (const hostname of [environment.VERCEL_URL, environment.VERCEL_BRANCH_URL]) {
    if (typeof hostname === 'string' && /^[a-z0-9][a-z0-9-]{0,200}\.vercel\.app$/.test(hostname)
      && origin === `https://${hostname}`) return true;
  }
  if (environment.NODE_ENV === 'production' || typeof origin !== 'string') return false;
  try {
    const url = new URL(origin);
    return url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)
      && url.host === req.headers.host;
  } catch {
    return false;
  }
};

const readWebhookConfig = (environment) => {
  const configuredUrl = typeof environment.LEAD_CAPTURE_WEBHOOK_URL === 'string'
    ? environment.LEAD_CAPTURE_WEBHOOK_URL.trim() : '';
  const secret = typeof environment.LEAD_CAPTURE_WEBHOOK_SECRET === 'string'
    ? environment.LEAD_CAPTURE_WEBHOOK_SECRET.trim() : '';
  try {
    const url = new URL(configuredUrl);
    if (url.protocol !== 'https:' || url.username || url.password || url.hash
      || secret.length > 4096 || /[\r\n]/.test(secret)) return null;
    return { url: url.toString(), secret };
  } catch {
    return null;
  }
};

class BodyError extends Error {
  constructor(code, status) {
    super(code);
    this.code = code;
    this.status = status;
  }
}

const parseJson = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    throw new BodyError('invalid_json', 400);
  }
};

const readBody = async (req) => {
  const length = Number(req.headers['content-length']);
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) throw new BodyError('body_too_large', 413);
  if (req.body !== undefined) {
    let raw;
    try {
      raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8')
        : typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    } catch {
      throw new BodyError('invalid_json', 400);
    }
    if (typeof raw !== 'string') throw new BodyError('invalid_json', 400);
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) throw new BodyError('body_too_large', 413);
    return parseJson(raw);
  }
  if (req.readable === false || req.complete === true || typeof req.on !== 'function') {
    throw new BodyError('invalid_json', 400);
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    let bytes = 0;
    let timer;
    const cleanup = () => {
      clearTimeout(timer);
      req.removeListener('data', onData);
      req.removeListener('end', onEnd);
      req.removeListener('error', onError);
    };
    const fail = (error) => { cleanup(); reject(error); };
    const onData = (chunk) => {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      bytes += buffer.length;
      if (bytes > MAX_BODY_BYTES) { fail(new BodyError('body_too_large', 413)); return; }
      chunks.push(buffer);
    };
    const onEnd = () => {
      cleanup();
      try { resolve(parseJson(Buffer.concat(chunks).toString('utf8'))); } catch (error) { reject(error); }
    };
    const onError = () => fail(new BodyError('invalid_json', 400));
    timer = setTimeout(() => fail(new BodyError('body_timeout', 408)), 2000);
    req.on('data', onData);
    req.on('end', onEnd);
    req.on('error', onError);
  });
};

const readRateKey = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = typeof value === 'string' ? value.split(',')[0].trim().slice(0, 64) : '';
  const ip = first || req.socket?.remoteAddress || 'unknown';
  // Nur im Arbeitsspeicher; weder die IP noch der Prüfwert wird weitergereicht.
  return crypto.createHash('sha256').update(String(ip)).digest('hex');
};

const deliverToWebhook = async (lead, requestId, configuration, fetchImpl, timeoutMs) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const headers = { 'Content-Type': 'application/json', 'Idempotency-Key': requestId };
  if (configuration.secret) headers.Authorization = `Bearer ${configuration.secret}`;
  try {
    // targetUrl wird nur als JSON-Wert übergeben, niemals vom Server abgerufen.
    const response = await fetchImpl(configuration.url, {
      method: 'POST', headers, body: JSON.stringify(lead),
      signal: controller.signal, redirect: 'error',
    });
    return response.ok ? { status: 200, body: { ok: true } }
      : { status: 502, body: { error: 'delivery_failed' } };
  } catch {
    return controller.signal.aborted
      ? { status: 504, body: { error: 'delivery_timeout' } }
      : { status: 502, body: { error: 'delivery_failed' } };
  } finally {
    clearTimeout(timer);
  }
};

/** Dependency-Injektion nur für Verhaltenstests, Produktionswerte bleiben serverseitig. */
export const createLeadCaptureHandler = ({
  environment = process.env, fetchImpl = (...args) => fetch(...args), now = Date.now,
  webhookTimeoutMs = WEBHOOK_TIMEOUT_MS,
} = {}) => {
  const rateBuckets = new Map();
  const deliveries = new Map();

  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const reply = (status, body) => res.status(status).json(body);
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      reply(405, { error: 'method_not_allowed' }); return;
    }
    if (!isAllowedOrigin(req, environment)) { reply(403, { error: 'forbidden_origin' }); return; }
    if (typeof req.headers['content-type'] !== 'string'
      || !/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(req.headers['content-type'])) {
      reply(415, { error: 'json_required' }); return;
    }
    const suppliedRequestId = req.headers['x-idempotency-key'];
    if (suppliedRequestId !== undefined
      && (typeof suppliedRequestId !== 'string' || !REQUEST_ID_PATTERN.test(suppliedRequestId))) {
      reply(400, { error: 'invalid_request_id' }); return;
    }
    const requestId = suppliedRequestId || crypto.randomUUID();
    let validated;
    try { validated = validateCapturePayload(await readBody(req)); } catch (error) {
      reply(error instanceof BodyError ? error.status : 400, { error: error instanceof BodyError ? error.code : 'invalid_json' }); return;
    }
    if (validated.error) { reply(400, { error: validated.error }); return; }
    const configuration = readWebhookConfig(environment);
    if (!configuration) { reply(503, { error: 'not_configured' }); return; }

    const time = now();
    for (const [key, value] of deliveries) if (time - value.startedAt >= RATE_LIMIT_WINDOW_MS) deliveries.delete(key);
    const digest = crypto.createHash('sha256').update(JSON.stringify(validated.lead)).digest('hex');
    const existing = deliveries.get(requestId);
    if (existing) {
      if (existing.digest !== digest) { reply(409, { error: 'request_id_conflict' }); return; }
      const result = await existing.result;
      reply(result.status, result.body); return;
    }
    for (const [key, value] of rateBuckets) if (time - value.startedAt >= RATE_LIMIT_WINDOW_MS) rateBuckets.delete(key);
    const rateKey = readRateKey(req);
    const bucket = rateBuckets.get(rateKey);
    if ((!bucket && rateBuckets.size >= MAX_BUCKETS) || (bucket && bucket.count >= RATE_LIMIT_MAX)
      || deliveries.size >= MAX_BUCKETS) {
      res.setHeader('Retry-After', '600');
      reply(429, { error: 'too_many_requests' }); return;
    }
    rateBuckets.set(rateKey, { startedAt: bucket?.startedAt ?? time, count: (bucket?.count || 0) + 1 });

    const resultPromise = deliverToWebhook(validated.lead, requestId, configuration, fetchImpl, webhookTimeoutMs);
    deliveries.set(requestId, { digest, startedAt: time, result: resultPromise });
    const result = await resultPromise;
    // Fehler sind erneut versuchbar. Erfolgreiche IDs enthalten nur Hash/Status,
    // keine Namen oder Adressen. Ein CRM muss instanzübergreifend deduplizieren.
    if (result.status !== 200) deliveries.delete(requestId);
    reply(result.status, result.body);
  };
};

export default createLeadCaptureHandler();
