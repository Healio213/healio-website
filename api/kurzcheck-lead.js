/**
 * Anfragespeicher für Kurzchecks mit Gesundheitsbezug (/check/schwangerschaft).
 *
 * Vercel Serverless Function, Node Runtime. Die Region steht in vercel.json
 * fest auf Frankfurt (fra1), die Speicherung liegt bei Supabase in der
 * EU-Region Frankfurt. Der Inhalt der Anfrage geht weder an EmailJS noch per Mail.
 *
 * Grundregeln:
 * - Ohne SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY und KURZCHECK_INGEST_TOKEN
 *   antwortet die Funktion 503 und speichert nichts.
 * - Geschrieben wird nur über die Datenbankfunktion submit_kurzcheck_lead. Sie
 *   verlangt das geheime KURZCHECK_INGEST_TOKEN und kann nur einfügen. Mit dem
 *   öffentlichen Schlüssel allein lässt sich die Tabelle weder lesen noch füllen.
 * - Es wird nichts geloggt. Weder Name noch Telefonnummer, E-Mail-Adresse oder
 *   Antworten dürfen in einem Log oder einer Fehlermeldung landen.
 * - Die IP wird nie im Klartext gespeichert, sondern nur als HMAC-SHA-256 mit
 *   geheimem Schlüssel (LEAD_IP_SALT), IPv6 auf das /64-Netz gekürzt. Ohne
 *   Schlüssel wird gar kein Wert gesetzt.
 * - Angenommen wird nur, was von healio.de oder einer Vercel-Adresse dieses
 *   Deployments kommt.
 * - Angenommen werden nur Checks, deren Konfiguration diesen Weg vorsieht,
 *   nur die dort hinterlegten Antworten und nur die aktuelle
 *   Einwilligungsfassung. Unbekannte Felder führen zur Ablehnung.
 * - Danach meldet ein Hinweis an info@healio.de den Eingang, über den eigenen
 *   n8n-Weiterleiter (Hetzner, fester Brevo-Zugang). Er enthält nur Kennung,
 *   Fassung und Eingangszeit, nie Name, Kontakt, Antworten oder Kampagnenwerte.
 *   Ob er ankam, steht in der Datenbank; die tägliche Erinnerung
 *   (api/kurzcheck-erinnerung.js) holt nicht gemeldete Anfragen nach. Scheitert
 *   das Speichern, geht eine Warnung ohne Angaben aus der Anfrage hinaus.
 * - Fehler landen mit festem Ereignisnamen ohne Personendaten im Vercel-Log.
 */

import crypto from 'node:crypto';
import net from 'node:net';
import {
  isCleanText, isValidKurzcheckEmail, isValidKurzcheckPhone, normalizeKurzcheckPhone,
} from '../shared/kurzcheck.js';
import {
  callRpc, logIncident, readRelayConfig, readStorageConfig, sendToRelay,
} from '../shared/kurzcheck-server.js';
import { KURZCHECK_ENDPOINT, META_CHECKS } from '../src/content/meta-checks.js';

const LEAD_SOURCE = 'website_kurzcheck';
const STORAGE_RPC = 'submit_kurzcheck_lead';

const NOTIFY_TIMEOUT_MS = 4000;
// Grenzen je Instanz, zusätzlich bremst der Weiterleiter selbst. Echter Verkehr
// liegt weit darunter; Zurückgehaltenes meldet die tägliche Erinnerung nach.
// Warnungen haben ein eigenes, kleineres Budget, damit sie die Eingangshinweise
// nicht verdrängen.
const NOTIFY_LIMITS = Object.freeze({
  eingang: { hour: 20, day: 40 },
  fehler: { hour: 5, day: 10 },
});
const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** Nur Checks, die ausdrücklich über diesen Weg laufen. */
export const EU_CHECKS = Object.freeze(Object.fromEntries(
  Object.values(META_CHECKS)
    .filter((config) => config.endpoint === KURZCHECK_ENDPOINT)
    .map((config) => [config.key, config]),
));

const PAYLOAD_KEYS = new Set([
  'check',
  'answers',
  'first_name',
  'phone',
  'email',
  'consent_contact',
  'consent_health_data',
  'consent_text_version',
  'utm',
  'healio_website',
]);
const UTM_KEYS = Object.freeze(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']);

const MAX_BODY_BYTES = 8192;
// Je Wert höchstens 200 Byte in UTF-8, damit utm sicher unter der Grenze der
// Datenbank bleibt (pg_column_size(utm) <= 2048).
const MAX_UTM_BYTES = 200;
const STORAGE_TIMEOUT_MS = 5000;

// Ratenbegrenzung je Absender: 5 Anfragen in 10 Minuten, nur im Arbeitsspeicher
// der Function-Instanz. Die Datenbank bremst zusätzlich je Prüfwert und gesamt.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_BUCKETS = 2048;

// Veröffentlichte Adressbereiche von Cloudflare (cloudflare.com/ips, Abruf
// 19.10.2026). Nur wenn die Anfrage von dort kommt, gilt cf-connecting-ip.
const CLOUDFLARE_RANGES = (() => {
  const list = new net.BlockList();
  for (const range of [
    '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22', '141.101.64.0/18',
    '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20', '197.234.240.0/22', '198.41.128.0/17',
    '162.158.0.0/15', '104.16.0.0/13', '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22',
  ]) {
    const [address, prefix] = range.split('/');
    list.addSubnet(address, Number(prefix), 'ipv4');
  }
  for (const range of [
    '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32',
    '2405:8100::/32', '2a06:98c0::/29', '2c0f:f248::/32',
  ]) {
    const [address, prefix] = range.split('/');
    list.addSubnet(address, Number(prefix), 'ipv6');
  }
  return list;
})();

const readText = (value, maxLength) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (trimmed === '' || trimmed.length > maxLength || !isCleanText(trimmed)) return null;
  return trimmed;
};

/** Kürzt an einer Zeichengrenze auf höchstens maxBytes Byte in UTF-8. */
const truncateBytes = (value, maxBytes) => {
  let result = '';
  let bytes = 0;
  for (const character of value) {
    const size = Buffer.byteLength(character, 'utf8');
    if (bytes + size > maxBytes) break;
    result += character;
    bytes += size;
  }
  return result;
};

/** Nur die bekannten Kampagnenfelder, gekürzt. Keine Klick-Kennungen, keine Herkunftsseite. */
export const buildUtm = (tracking) => {
  if (!tracking || typeof tracking !== 'object' || Array.isArray(tracking)) return null;

  const utm = {};
  for (const key of UTM_KEYS) {
    if (typeof tracking[key] !== 'string' || !isCleanText(tracking[key])) continue;
    const value = truncateBytes(tracking[key].trim(), MAX_UTM_BYTES);
    if (value !== '') utm[key] = value;
  }

  return Object.keys(utm).length > 0 ? utm : null;
};

/** Reine Prüfung ohne Seiteneffekte, damit sie testbar bleibt. */
export const validateKurzcheck = (payload) => {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)
    || Object.keys(payload).some((key) => !PAYLOAD_KEYS.has(key))) {
    return { ok: false, status: 400, error: 'invalid_request' };
  }

  // Der Honeypot wird bereits im Browser abgefangen. Kommt er trotzdem
  // gefüllt an, ist es ein Bot: freundlich antworten und nichts speichern.
  const honeypot = typeof payload.healio_website === 'string' ? payload.healio_website.trim() : '';
  if (honeypot !== '') return { ok: true, discard: true };

  const config = typeof payload.check === 'string' && Object.hasOwn(EU_CHECKS, payload.check)
    ? EU_CHECKS[payload.check]
    : null;
  if (!config) return { ok: false, status: 400, error: 'invalid_check' };

  const answers = payload.answers;
  if (!answers || typeof answers !== 'object' || Array.isArray(answers)
    || Object.keys(answers).length !== config.steps.length) {
    return { ok: false, status: 400, error: 'invalid_answers' };
  }
  const chosen = {};
  for (const step of config.steps) {
    const value = answers[step.id];
    if (!step.options.some((option) => option.value === value)) {
      return { ok: false, status: 400, error: 'invalid_answers' };
    }
    chosen[step.id] = value;
  }

  const firstName = readText(payload.first_name, 80);
  if (!firstName) return { ok: false, status: 400, error: 'invalid_first_name' };

  const rawPhone = normalizeKurzcheckPhone(payload.phone);
  if (rawPhone !== '' && !isValidKurzcheckPhone(rawPhone)) {
    return { ok: false, status: 400, error: 'invalid_phone' };
  }

  const rawEmail = typeof payload.email === 'string' ? payload.email.trim() : '';
  if (rawEmail !== '' && !isValidKurzcheckEmail(rawEmail)) {
    return { ok: false, status: 400, error: 'invalid_email' };
  }

  if (rawPhone === '' && rawEmail === '') {
    return { ok: false, status: 400, error: 'contact_required' };
  }

  if (payload.consent_contact !== true
    || payload.consent_health_data !== (config.consent.healthData === true)) {
    return { ok: false, status: 400, error: 'consent_required' };
  }

  // Gespeichert wird nur die Fassung, die dieser Stand der Website zeigt.
  // Ein veralteter Browser-Stand fällt auf, statt einen falschen Nachweis
  // zu schreiben.
  if (payload.consent_text_version !== config.consent.version) {
    return { ok: false, status: 409, error: 'consent_version_outdated' };
  }

  return {
    ok: true,
    discard: false,
    lead: {
      check_key: config.key,
      ...chosen,
      first_name: firstName,
      phone: rawPhone === '' ? null : rawPhone,
      email: rawEmail === '' ? null : rawEmail,
      consent_contact: true,
      consent_health_data: config.consent.healthData === true,
      consent_text_version: config.consent.version,
      source: LEAD_SOURCE,
      utm: buildUtm(payload.utm),
    },
  };
};

const isAllowedOrigin = (req, environment) => {
  const origin = req.headers.origin;
  if (origin === 'https://healio.de' || origin === 'https://www.healio.de') return true;
  // Nur die Vercel-Adressen dieses Deployments, keine beliebige fremde Preview.
  for (const hostname of [environment.VERCEL_URL, environment.VERCEL_BRANCH_URL]) {
    if (typeof hostname === 'string' && /^[a-z0-9][a-z0-9-]{0,200}\.vercel\.app$/.test(hostname)
      && origin === `https://${hostname}`) return true;
  }
  return false;
};

const firstHeaderValue = (raw) => {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === 'string' ? value.split(',')[0].trim() : '';
};

/** Gültige IP mit Familie, IPv4 in IPv6-Schreibweise wird zu IPv4. */
const parseIp = (value) => {
  if (typeof value !== 'string' || value === '' || value.length > 64) return null;
  let address = value.split('%')[0].toLowerCase();
  if (address.startsWith('::ffff:') && net.isIP(address.slice(7)) === 4) address = address.slice(7);
  const family = net.isIP(address);
  return family === 0 ? null : { address, family };
};

/** IPv6-Anschlüsse bekommen ein ganzes /64-Netz; gruppiert wird deshalb danach. */
const ipv6Prefix64 = (address) => {
  const [head, tail] = address.split('::');
  const headGroups = head ? head.split(':') : [];
  const tailGroups = tail === undefined ? [] : (tail ? tail.split(':') : []);
  const groups = tail === undefined
    ? headGroups
    : [...headGroups, ...Array(Math.max(8 - headGroups.length - tailGroups.length, 0)).fill('0'), ...tailGroups];
  return `${groups.slice(0, 4).map((group) => group.padStart(4, '0')).join(':')}::/64`;
};

/**
 * Absenderkennung für Ratenbegrenzung und Prüfwert. Vercel überschreibt
 * x-forwarded-for mit der Adresse, von der die Anfrage kam. Ist das ein
 * Cloudflare-Knoten, steht die Adresse der Besucherin in cf-connecting-ip.
 * Kommt die Anfrage nicht über Cloudflare, wird cf-connecting-ip ignoriert,
 * damit niemand die Ratenbegrenzung mit einem gefälschten Wert umgeht.
 */
export const readClientKey = (req) => {
  const peer = parseIp(firstHeaderValue(req.headers['x-forwarded-for'])) || parseIp(req.socket?.remoteAddress);
  let client = peer;
  if (peer && CLOUDFLARE_RANGES.check(peer.address, peer.family === 6 ? 'ipv6' : 'ipv4')) {
    client = parseIp(firstHeaderValue(req.headers['cf-connecting-ip'])) || peer;
  }
  if (!client) return null;
  return client.family === 6 ? ipv6Prefix64(client.address) : client.address;
};

/** Ohne Schlüssel gibt es keinen Prüfwert. Lieber kein Wert als ein ratbarer Wert. */
const hashClientKey = (clientKey, environment) => {
  const secret = typeof environment.LEAD_IP_SALT === 'string' ? environment.LEAD_IP_SALT.trim() : '';
  if (!clientKey || secret === '') return null;
  return crypto.createHmac('sha256', secret).update(clientKey).digest('hex');
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
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      if (Buffer.byteLength(JSON.stringify(req.body), 'utf8') > MAX_BODY_BYTES) throw new BodyError('body_too_large', 413);
      return req.body;
    }
    const raw = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body);
    if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) throw new BodyError('body_too_large', 413);
    return parseJson(raw);
  }

  if (req.readable === false || req.complete === true || typeof req.on !== 'function') {
    throw new BodyError('invalid_json', 400);
  }

  return new Promise((resolve, reject) => {
    const chunks = [];
    let bytes = 0;
    const finish = (callback) => {
      clearTimeout(timer);
      req.removeAllListeners('data');
      callback();
    };
    const timer = setTimeout(() => finish(() => reject(new BodyError('body_timeout', 408))), 2000);
    req.on('data', (chunk) => {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      bytes += buffer.length;
      if (bytes > MAX_BODY_BYTES) {
        finish(() => reject(new BodyError('body_too_large', 413)));
        return;
      }
      chunks.push(buffer);
    });
    req.on('end', () => finish(() => {
      try {
        resolve(parseJson(Buffer.concat(chunks).toString('utf8')));
      } catch (error) {
        reject(error);
      }
    }));
    req.on('error', () => finish(() => reject(new BodyError('invalid_json', 400))));
  });
};

/** Liest nur den festen Fehlertext der Datenbankbremse, nie Details der Antwort. */
const isDatabaseRateLimit = async (response) => {
  try {
    const body = await response.json();
    return body?.message === 'kurzcheck_rate_limited';
  } catch {
    return false;
  }
};

/** Dependency-Injektion nur für Verhaltenstests, Produktionswerte bleiben serverseitig. */
export const createKurzcheckHandler = ({
  environment = process.env,
  fetchImpl = (...args) => fetch(...args),
  now = Date.now,
  randomUUID = () => crypto.randomUUID(),
  storageTimeoutMs = STORAGE_TIMEOUT_MS,
  notifyTimeoutMs = NOTIFY_TIMEOUT_MS,
  logger = console,
} = {}) => {
  const rateBuckets = new Map();
  const notifyTimes = { eingang: [], fehler: [] };
  const relay = readRelayConfig(environment);

  const isRateLimited = (key) => {
    const time = now();
    for (const [bucketKey, bucket] of rateBuckets) {
      if (time - bucket.startedAt >= RATE_LIMIT_WINDOW_MS) rateBuckets.delete(bucketKey);
    }
    const bucket = rateBuckets.get(key);
    if (!bucket) {
      // Volle Tabelle: den ältesten Eintrag verdrängen statt alle Neuen zu sperren.
      if (rateBuckets.size >= MAX_BUCKETS) rateBuckets.delete(rateBuckets.keys().next().value);
      rateBuckets.set(key, { startedAt: time, count: 1 });
      return false;
    }
    bucket.count += 1;
    return bucket.count > RATE_LIMIT_MAX;
  };

  const mayNotify = (kind) => {
    const time = now();
    const limits = NOTIFY_LIMITS[kind];
    notifyTimes[kind] = notifyTimes[kind].filter((sentAt) => time - sentAt < DAY_MS);
    const lastHour = notifyTimes[kind].filter((sentAt) => time - sentAt < HOUR_MS).length;
    if (lastHour >= limits.hour || notifyTimes[kind].length >= limits.day) return false;
    notifyTimes[kind].push(time);
    return true;
  };

  // Ergebnis: 'sent', 'failed' oder 'skipped' (kein Weiterleiter eingerichtet oder Grenze erreicht).
  const notify = async (payload) => {
    if (!relay || !mayNotify(payload.kind)) return 'skipped';
    const result = await sendToRelay({ relay, fetchImpl, payload, timeoutMs: notifyTimeoutMs });
    if (result.ok) return 'sent';
    logIncident('kurzcheck_hinweis_fehlgeschlagen', result.status, logger);
    return 'failed';
  };

  const warnStorageFailure = async (reason, status) => {
    logIncident(reason === 'not_configured' ? 'kurzcheck_nicht_eingerichtet' : 'kurzcheck_speichern_fehlgeschlagen', status, logger);
    await notify({ kind: 'fehler', reason, status: Number.isInteger(status) ? status : null, received_at: new Date(now()).toISOString() });
  };

  return async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    const reply = (status, body) => res.status(status).json(body);

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      reply(405, { error: 'method_not_allowed' });
      return;
    }

    if (!isAllowedOrigin(req, environment)) {
      reply(403, { error: 'forbidden_origin' });
      return;
    }

    if (typeof req.headers['content-type'] !== 'string'
      || !/^application\/json(?:\s*;\s*charset=utf-8)?$/i.test(req.headers['content-type'])) {
      reply(415, { error: 'json_required' });
      return;
    }

    const storage = readStorageConfig(environment);
    if (!storage) {
      await warnStorageFailure('not_configured', null);
      reply(503, { error: 'not_configured' });
      return;
    }

    const clientKey = readClientKey(req);
    const ipHash = hashClientKey(clientKey, environment);
    const rateKey = ipHash || crypto.createHash('sha256').update(String(clientKey || 'unknown')).digest('hex');
    if (isRateLimited(rateKey)) {
      res.setHeader('Retry-After', '600');
      reply(429, { error: 'too_many_requests' });
      return;
    }

    let result;
    try {
      result = validateKurzcheck(await readBody(req));
    } catch (error) {
      reply(error instanceof BodyError ? error.status : 400, { error: error instanceof BodyError ? error.code : 'invalid_json' });
      return;
    }
    if (!result.ok) {
      reply(result.status, { error: result.error });
      return;
    }
    if (result.discard) {
      reply(200, { ok: true });
      return;
    }

    // Die Kennung entsteht hier, weil der Schreibweg kein Zurücklesen erlaubt.
    const row = { id: randomUUID(), ...result.lead, ip_hash: ipHash };

    const { response, timedOut } = await callRpc({
      storage, fetchImpl, name: STORAGE_RPC, args: { p_lead: row }, timeoutMs: storageTimeoutMs,
    });
    if (timedOut) {
      await warnStorageFailure('storage_timeout', null);
      reply(504, { error: 'storage_timeout' });
      return;
    }

    if (!response || !response.ok) {
      if (response && await isDatabaseRateLimit(response)) {
        res.setHeader('Retry-After', '600');
        reply(429, { error: 'too_many_requests' });
        return;
      }
      // 4xx ohne Bremse heißt: die Datenbank hat eine Prüfregel verletzt gesehen
      // (Abweichung zwischen Funktion und Migration). 5xx, 401/403 und Netzfehler
      // sind Einrichtungs- oder Betriebsfehler.
      const status = response ? response.status : null;
      await warnStorageFailure(status === 400 ? 'storage_rejected' : 'storage_failed', status);
      reply(502, { error: 'storage_failed' });
      return;
    }

    // Gespeichert ist gespeichert: der Hinweis entscheidet nicht mehr über die Antwort.
    const outcome = await notify({
      kind: 'eingang',
      request_id: row.id,
      consent_version: row.consent_text_version,
      received_at: new Date(now()).toISOString(),
    });
    if (outcome !== 'skipped') {
      const marked = await callRpc({
        storage, fetchImpl, name: 'record_kurzcheck_notification', args: { p_id: row.id, p_ok: outcome === 'sent' }, timeoutMs: notifyTimeoutMs,
      });
      if (!marked.response?.ok) logIncident('kurzcheck_hinweis_status_fehlgeschlagen', marked.response?.status ?? null, logger);
    }

    reply(200, { ok: true });
  };
};

export default createKurzcheckHandler();
