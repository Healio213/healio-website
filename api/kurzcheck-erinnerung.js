/**
 * Tägliche Erinnerung zum Kurzcheck mit Gesundheitsbezug (Vercel Cron, siehe
 * vercel.json). Läuft einmal am Morgen und meldet an info@healio.de, wie viele
 * Anfragen noch offen sind (Status „neu“), wie viele davon älter als 24 Stunden
 * sind und wie viele noch keine Eingangsmail bekommen haben. Damit bleibt ein
 * gescheiterter Hinweis nicht still liegen.
 *
 * - Nur mit Authorization: Bearer CRON_SECRET (setzt Vercel beim Cron-Aufruf).
 * - Liest aus Supabase nur Zählwerte über kurzcheck_reminder_status, nie eine
 *   Anfrage. Die Mail baut der n8n-Weiterleiter, sie enthält nur die Zahlen.
 * - Scheitert die Erinnerung, antwortet die Funktion mit einem Fehlerstatus;
 *   Vercel zeigt den Cron-Lauf dann als fehlgeschlagen, und das Log nennt den
 *   festen Ereignisnamen. Nicht gemeldete Anfragen bleiben dann für den
 *   nächsten Lauf offen.
 */

import crypto from 'node:crypto';
import {
  callRpc, logIncident, readRelayConfig, readStorageConfig, sendToRelay,
} from '../shared/kurzcheck-server.js';

const TIMEOUT_MS = 5000;

const sameSecret = (supplied, expected) => {
  const a = Buffer.from(String(supplied || ''));
  const b = Buffer.from(String(expected));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
};

const readCount = (value) => (Number.isInteger(value) && value >= 0 ? value : null);

/** Dependency-Injektion nur für Verhaltenstests. */
export const createReminderHandler = ({
  environment = process.env,
  fetchImpl = (...args) => fetch(...args),
  now = Date.now,
  logger = console,
} = {}) => async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const reply = (status, body) => res.status(status).json(body);

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    reply(405, { error: 'method_not_allowed' });
    return;
  }

  const cronSecret = typeof environment.CRON_SECRET === 'string' ? environment.CRON_SECRET.trim() : '';
  if (cronSecret.length < 32) {
    logIncident('kurzcheck_nicht_eingerichtet', null, logger);
    reply(503, { error: 'not_configured' });
    return;
  }
  if (!sameSecret(req.headers.authorization, `Bearer ${cronSecret}`)) {
    reply(401, { error: 'unauthorized' });
    return;
  }

  const storage = readStorageConfig(environment);
  const relay = readRelayConfig(environment);
  if (!storage || !relay) {
    logIncident('kurzcheck_nicht_eingerichtet', null, logger);
    reply(503, { error: 'not_configured' });
    return;
  }

  const { response } = await callRpc({ storage, fetchImpl, name: 'kurzcheck_reminder_status', args: {}, timeoutMs: TIMEOUT_MS });
  const status = response?.ok ? await response.json().catch(() => null) : null;
  const open = readCount(status?.open);
  const openOverdue = readCount(status?.open_overdue);
  const unannounced = readCount(status?.unannounced);
  if (open === null || openOverdue === null || unannounced === null || typeof status?.checked_at !== 'string') {
    logIncident('kurzcheck_erinnerung_fehlgeschlagen', response?.status ?? null, logger);
    reply(502, { error: 'status_failed' });
    return;
  }

  if (openOverdue === 0 && unannounced === 0) {
    reply(200, { sent: false });
    return;
  }

  const sent = await sendToRelay({
    relay,
    fetchImpl,
    timeoutMs: TIMEOUT_MS,
    payload: {
      kind: 'erinnerung',
      open,
      open_overdue: openOverdue,
      unannounced,
      received_at: new Date(now()).toISOString(),
    },
  });
  if (!sent.ok) {
    logIncident('kurzcheck_erinnerung_fehlgeschlagen', sent.status, logger);
    reply(502, { error: 'reminder_failed' });
    return;
  }

  if (unannounced > 0) {
    const marked = await callRpc({
      storage, fetchImpl, name: 'mark_kurzcheck_reminded', args: { p_until: status.checked_at }, timeoutMs: TIMEOUT_MS,
    });
    if (!marked.response?.ok) logIncident('kurzcheck_hinweis_status_fehlgeschlagen', marked.response?.status ?? null, logger);
  }

  reply(200, { sent: true });
};

export default createReminderHandler();
