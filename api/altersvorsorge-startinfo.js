import crypto from 'node:crypto';

export const CONSENT_VERSION = 'altersvorsorge-startinfos-2026-10-09';
const EMAIL = /^[^\s@]{1,64}@[^\s@.]{1,63}(?:\.[^\s@.]{1,63}){1,4}$/;
const SOURCE = /^\/(?:altersvorsorgedepot|ratgeber\/altersvorsorgedepot|ratgeber\/(?:altersvorsorgedepot|riester)-[a-z0-9-]+)$/;
const FIELDS = new Set(['first_name', 'email', 'consent', 'consent_version', 'source_path', 'website', 'elapsed_ms']);
const buckets = new Map();

export const validateStartinfo = (body) => {
  if (!body || typeof body !== 'object' || Array.isArray(body)
      || Object.keys(body).some((key) => !FIELDS.has(key))) return { error: 'invalid_request' };
  if (typeof body.website !== 'string' || body.website.trim()) return { error: 'invalid_request' };
  const name = typeof body.first_name === 'string' ? body.first_name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!name || name.length > 80 || /[\u0000-\u001f\u007f]/.test(name)) return { error: 'invalid_name' };
  if (!EMAIL.test(email) || email.length > 254) return { error: 'invalid_email' };
  if (body.consent !== true || body.consent_version !== CONSENT_VERSION) return { error: 'consent_required' };
  if (typeof body.source_path !== 'string' || !SOURCE.test(body.source_path) || body.source_path.length > 140) return { error: 'invalid_source' };
  if (!Number.isFinite(body.elapsed_ms) || body.elapsed_ms < 2000 || body.elapsed_ms > 86400000) return { error: 'invalid_request' };
  return { value: { first_name: name, email, consent_version: CONSENT_VERSION, source_path: body.source_path } };
};

export const startinfoConfig = () => {
  const url = process.env.ALTERSVORSORGE_STARTINFO_WEBHOOK_URL || '';
  const secret = process.env.ALTERSVORSORGE_STARTINFO_WEBHOOK_SECRET || '';
  return process.env.ALTERSVORSORGE_STARTINFO_ENABLED === 'true'
    && url === 'https://n8n.healio.de/webhook/healio-altersvorsorge-startinfos'
    && secret.length >= 32 ? { url, secret } : null;
};

const limited = (req, email, secret) => {
  const now = Date.now();
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim().slice(0, 64);
  for (const [key, bucket] of buckets) if (now - bucket.at >= 600000) buckets.delete(key);
  const keys = [ip ? `ip:${ip}` : 'ip:unknown', `email:${email}`].map((value) => crypto.createHmac('sha256', secret).update(value).digest('hex'));
  const hit = keys.some((key, index) => (buckets.get(key)?.count || 0) >= (index === 0 ? 5 : 2));
  if (!hit) for (const key of keys) { const bucket = buckets.get(key) || { at: now, count: 0 }; bucket.count += 1; buckets.set(key, bucket); }
  return hit;
};

const readBody = (req) => {
  try {
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body;
    if (typeof raw === 'string') return Buffer.byteLength(raw) <= 2048 ? JSON.parse(raw) : null;
    if (raw && Buffer.byteLength(JSON.stringify(raw)) <= 2048) return raw;
  } catch { /* Keine Eingaben oder Fehler mit Personenbezug protokollieren. */ }
  return null;
};

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const config = startinfoConfig();
  if (req.method === 'GET') { res.status(200).json({ ready: Boolean(config) }); return; }
  if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); res.status(405).json({ error: 'method_not_allowed' }); return; }
  const origin = req.headers.origin;
  const preview = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  if (origin !== 'https://healio.de' && origin !== 'https://www.healio.de' && (!preview || origin !== preview)) { res.status(403).json({ error: 'forbidden_origin' }); return; }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) { res.status(415).json({ error: 'invalid_content_type' }); return; }
  if (!config) { res.status(503).json({ error: 'not_configured' }); return; }
  const validated = validateStartinfo(readBody(req));
  if (validated.error) { res.status(400).json({ error: validated.error }); return; }
  if (limited(req, validated.value.email, config.secret)) { res.status(429).json({ error: 'too_many_requests' }); return; }
  try {
    const response = await fetch(config.url, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', 'x-healio-startinfo-secret': config.secret },
      body: JSON.stringify({ ...validated.value, requested_at: new Date().toISOString() }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.accepted !== true) { res.status(502).json({ error: 'registration_failed' }); return; }
    res.status(202).json({ accepted: true });
  } catch { res.status(502).json({ error: 'registration_failed' }); }
}
