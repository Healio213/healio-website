/**
 * Serverbausteine für den EU-Weg des Kurzchecks. Nur für api/kurzcheck-lead.js
 * und api/kurzcheck-erinnerung.js, nie im Browser.
 *
 * - Supabase Frankfurt: Aufrufe nur über die token-geschützten Datenbank-
 *   funktionen, mit dem öffentlichen Schlüssel plus KURZCHECK_INGEST_TOKEN.
 * - Hinweis an Healio: über den eigenen n8n-Weiterleiter auf dem Hetzner-Server.
 *   Er versendet mit dem dort hinterlegten Brevo-Zugang von einer festen
 *   Adresse und baut die Mail selbst; von hier gehen nur Kennung, Fassung,
 *   Zeitpunkte und Zählwerte hinaus.
 * - Fehler werden nie still geschluckt, sondern mit einem festen Ereignisnamen
 *   ohne Personendaten protokolliert (Vercel-Logs) und, wo möglich, in der
 *   Datenbank vermerkt.
 */

export const RELAY_URL = 'https://n8n.healio.de/webhook/healio-kurzcheck-hinweis';
export const RELAY_SECRET_HEADER = 'x-healio-kurzcheck-secret';

// Einzige erlaubte Ereignisnamen im Log. Nie Werte aus einer Anfrage.
export const INCIDENTS = Object.freeze([
  'kurzcheck_nicht_eingerichtet',
  'kurzcheck_speichern_fehlgeschlagen',
  'kurzcheck_hinweis_fehlgeschlagen',
  'kurzcheck_hinweis_status_fehlgeschlagen',
  'kurzcheck_erinnerung_fehlgeschlagen',
]);

export const logIncident = (event, status = null, logger = console) => {
  if (!INCIDENTS.includes(event)) return;
  const code = Number.isInteger(status) && status >= 100 && status < 600 ? status : null;
  logger.error(JSON.stringify({ event, status: code }));
};

export const readStorageConfig = (environment) => {
  const url = typeof environment.SUPABASE_URL === 'string' ? environment.SUPABASE_URL.trim().replace(/\/+$/, '') : '';
  const key = typeof environment.SUPABASE_PUBLISHABLE_KEY === 'string' ? environment.SUPABASE_PUBLISHABLE_KEY.trim() : '';
  const token = typeof environment.KURZCHECK_INGEST_TOKEN === 'string' ? environment.KURZCHECK_INGEST_TOKEN.trim() : '';
  if (!/^https:\/\/[a-z0-9.-]+$/i.test(url) || key === '' || token.length < 32 || /[\r\n]/.test(token)) return null;
  return { url, key, token };
};

/** Nur der feste eigene Weiterleiter mit ausreichend langem Geheimnis. */
export const readRelayConfig = (environment) => {
  const url = typeof environment.KURZCHECK_NOTIFY_WEBHOOK_URL === 'string' ? environment.KURZCHECK_NOTIFY_WEBHOOK_URL.trim() : '';
  const secret = typeof environment.KURZCHECK_NOTIFY_WEBHOOK_SECRET === 'string' ? environment.KURZCHECK_NOTIFY_WEBHOOK_SECRET.trim() : '';
  if (url !== RELAY_URL || secret.length < 32 || /[\r\n]/.test(secret)) return null;
  return { url, secret };
};

/** Aufruf einer Datenbankfunktion. Antwortdetails werden nie weitergereicht. */
export const callRpc = async ({ storage, fetchImpl, name, args, timeoutMs }) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(`${storage.url}/rest/v1/rpc/${name}`, {
      method: 'POST',
      headers: {
        apikey: storage.key,
        Authorization: `Bearer ${storage.key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_token: storage.token, ...args }),
      signal: controller.signal,
      redirect: 'error',
    });
    return { response, timedOut: false };
  } catch {
    return { response: null, timedOut: controller.signal.aborted };
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Hinweis über den Weiterleiter. Erfolg nur, wenn n8n die Annahme durch Brevo
 * bestätigt ({ accepted: true }). Alles andere gilt als Fehlschlag.
 */
export const sendToRelay = async ({ relay, fetchImpl, payload, timeoutMs }) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(relay.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', [RELAY_SECRET_HEADER]: relay.secret },
      body: JSON.stringify(payload),
      signal: controller.signal,
      redirect: 'error',
    });
    const result = await response.json().catch(() => null);
    return { ok: response.ok && result?.accepted === true, status: response.status };
  } catch {
    return { ok: false, status: null };
  } finally {
    clearTimeout(timer);
  }
};
