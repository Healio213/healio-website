/**
 * Healio Anfragen-Zentrale (Franks Auftrag 08.11.2026).
 *
 * Jede Formularanfrage geht zusätzlich zur E-Mail direkt in die Anfragen-Zentrale
 * auf unserem eigenen Server (anfragen.healio.de, Hetzner, Deutschland). Dort meldet
 * sie sich in derselben Sekunde als Mitteilung auf Franks Handy. Fällt der
 * E-Mail-Versand aus, ist die Anfrage trotzdem gesichert.
 *
 * Übertragen wird nur, was im Formular steht, dazu die Seite, die utm-Werte der
 * Einstiegsseite und der Rechnername der Seite, von der jemand kam (zum Beispiel
 * l.instagram.com). Kein Cookie, kein Browserspeicher.
 */

const STANDARD_URL = 'https://anfragen.healio.de/api/eingang';
const TIMEOUT_MS = 6000;

const konfiguriert = (() => {
  try { return import.meta.env?.VITE_ANFRAGEN_ZENTRALE_URL || ''; } catch { return ''; }
})();

/** Leer, wenn die Zentrale ausgeschaltet ist (VITE_ANFRAGEN_ZENTRALE_URL=aus). */
export const ZENTRALE_URL = konfiguriert === 'aus' ? '' : (konfiguriert || STANDARD_URL);

// Rechnername der verweisenden Seite beim Laden (bleibt bei Seitenwechseln in der App gleich).
const verweis = (() => {
  try {
    if (typeof document === 'undefined' || !document.referrer) return '';
    const host = new URL(document.referrer).hostname.replace(/^www\./, '');
    const eigener = typeof window !== 'undefined' ? window.location.hostname.replace(/^www\./, '') : '';
    return host && host !== eigener ? host : '';
  } catch { return ''; }
})();

// Eine Kennung je Formular, 15 Minuten lang: schickt jemand nach einer Korrektur
// erneut ab, ersetzt die Zentrale die Angaben, statt eine zweite Anfrage anzulegen.
// Nur im Arbeitsspeicher der Seite, nicht im Browserspeicher.
const KENNUNG_GUELTIG_MS = 15 * 60 * 1000;
const kennungen = new Map();
export function zentraleKennung(formular, jetzt = Date.now()) {
  const schluessel = String(formular || 'formular');
  const vorhanden = kennungen.get(schluessel);
  if (vorhanden && jetzt - vorhanden.seit < KENNUNG_GUELTIG_MS) return vorhanden.ref;
  let zufall = '';
  try { zufall = crypto.randomUUID().replace(/-/g, ''); } catch {
    zufall = `${jetzt.toString(36)}${Math.random().toString(36).slice(2, 12)}`;
  }
  const ref = `web-${zufall}`.slice(0, 64);
  kennungen.set(schluessel, { ref, seit: jetzt });
  return ref;
}

export function baueZentraleAnfrage({ params, utm, gclid = false, ort = typeof window !== 'undefined' ? window.location : null }) {
  return {
    ref: zentraleKennung(params.page_source),
    formular: params.page_source || 'Website-Formular',
    seite: ort?.pathname || '',
    name: params.from_name || '',
    email: params.from_email || '',
    telefon: params.phone || '',
    firma: params.company || '',
    nachricht: params.message || '',
    utm: utm || null,
    verweis,
    gclid: Boolean(gclid),
    sprache: typeof document !== 'undefined' ? String(document.documentElement?.lang || '').slice(0, 2) : '',
  };
}

/** Schickt die Anfrage an die Zentrale. Wirft nie, liefert true bei Annahme. */
export async function sendeAnZentrale(anfrage, { fetchImpl, timeoutMs = TIMEOUT_MS } = {}) {
  if (!ZENTRALE_URL) return false;
  let timer;
  try {
    const holen = fetchImpl || globalThis.fetch;
    if (typeof holen !== 'function') return false;
    const controller = typeof AbortController === 'function' ? new AbortController() : null;
    timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    const response = await holen(ZENTRALE_URL, {
      method: 'POST',
      // text/plain gilt als einfache Anfrage: keine Vorab-Prüfung, keepalive klappt in allen Browsern.
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(anfrage),
      keepalive: true,
      credentials: 'omit',
      signal: controller?.signal,
    });
    return Boolean(response?.ok);
  } catch {
    return false;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
