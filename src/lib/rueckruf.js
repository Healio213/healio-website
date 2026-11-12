// Rückruf-Hinweis „Sprich mit einem Experten“ (Franks Auftrag 04.11.2026:
// derselbe Hinweis wie seit 03.11.2026 auf kassenboost.de, Vorlage
// GKV-Vergleichskampagne/website/app/rueckruf.ts). Reine Regeln ohne React,
// damit Fenster (src/components/RueckrufHinweis.jsx) und Vertragstest
// (scripts/check-rueckruf-hinweis-contract.mjs) dieselben Werte nutzen.
//
// Grundregeln:
// - Erfasst werden nur Vorname und Telefonnummer, dazu Seite (nur Pfad), Thema
//   der Seite, Sprache und Einwilligungsfassung. Keine Fragen zu Gesundheit,
//   Kasse oder Einkommen.
// - Versand über den Formularweg von healio.de (EmailJS an info@healio.de),
//   wie die übrigen Kontakt- und Rückrufformulare. Die KassenBoost-Strecke
//   schreibt fest „kassenboost.de“ in jede Mail und bleibt unberührt.
// - Erlaubt sind nur die Endkundenseiten aus RUECKRUF_ROUTE_TOPICS. Eine Liste
//   statt einer Sperrliste, damit neue Seiten den Hinweis nicht ungefragt
//   bekommen. Bewusst ohne Hinweis: Ratgeber und Blog (führen zur Leistungsseite),
//   Kampagnenseiten (ablenkungsfrei), Rechtsseiten, Kontakt und Terminbuchung
//   (eigenes Formular), /schwangerschaft (Gesundheitsbezug, eigener Check),
//   B2B-Seiten (andere Zielgruppe), Altersvorsorge und Tier (eigene Strecken),
//   /kassenboost (führt nach kassenboost.de, dort steht der Hinweis schon).

export const RUECKRUF_SESSION_KEY = 'healio.rueckruf';
export const RUECKRUF_CONSENT_VERSION = 'rueckruf-2026-11-04';
export const RUECKRUF_FIRST_NAME_MAX = 80;
export const RUECKRUF_PHONE_INPUT_MAX = 40;
export const RUECKRUF_TEASER_MIN_DELAY_MS = 3_000;
export const RUECKRUF_TEASER_FALLBACK_MS = 20_000;
export const RUECKRUF_SCROLL_SHARE = 0.6;

export const RUECKRUF_ROUTE_TOPICS = Object.freeze({
  '/': 'start',
  '/en': 'start',
  '/leistungen': 'start',
  '/en/services': 'start',
  '/kassenbonus': 'bonus',
  '/en/health-insurance-bonus': 'bonus',
  '/ambulant': 'ambulant',
  '/en/outpatient': 'ambulant',
  '/zahn': 'zahn',
  '/en/dental': 'zahn',
  '/stationaer': 'stationaer',
  '/en/inpatient': 'stationaer',
});

// Auf diesen Seiten zeigt der ConsentManager keinen Cookie-Hinweis, es gibt
// also keine Entscheidung, auf die der Rückruf-Hinweis warten könnte.
export const RUECKRUF_BANNER_FREE_ROUTES = Object.freeze(new Set(['/zahn', '/en/dental']));

// Für die Mail an das Healio-Team, nicht für die Seite.
export const RUECKRUF_TOPIC_LABELS = Object.freeze({
  start: 'Allgemein (Startseite oder Leistungen)',
  bonus: 'Kassenbonus',
  ambulant: 'Ambulant',
  zahn: 'Zahn',
  stationaer: 'Stationär',
});

export const normalizeRueckrufPath = (pathname) => {
  if (typeof pathname !== 'string' || pathname === '') return '/';
  return pathname.replace(/\/+$/, '') || '/';
};

// Befund 5 (Franks Regel 01.11.2026: Termin und Beratung nur einmal je Seite, klein im
// Schlusskasten): Auf den drei Produktseiten schwebt kein zweiter Beratungsknopf mehr,
// dort führt der Weg in den Abschluss. Wieder einschalten: Pfad hier entfernen.
export const RUECKRUF_AUSGEBLENDET_AUF_PRODUKTSEITEN = Object.freeze(new Set([
  '/ambulant', '/en/outpatient', '/zahn', '/en/dental', '/stationaer', '/en/inpatient',
]));

export const getRueckrufTopic = (pathname) => {
  const path = normalizeRueckrufPath(pathname);
  if (RUECKRUF_AUSGEBLENDET_AUF_PRODUKTSEITEN.has(path)) return null;
  return RUECKRUF_ROUTE_TOPICS[path] ?? null;
};

const PHONE_ALLOWED = /^[0-9+()/\s.-]+$/;
const PHONE_MIN_DIGITS = 6;
const PHONE_MAX_DIGITS = 20;

// Deutsche und internationale Schreibweisen: 040 123456, 0171/1234567,
// +49 (0) 171 123-4567, 0049 171 1234567, (040) 12 34 56. Ergebnis enthält
// nur ein führendes + und Ziffern; 00 wird zu +, „(0)“ nach einer
// Ländervorwahl entfällt. Eine Ländervorwahl wird nie erfunden.
export const normalizeRueckrufPhone = (raw) => {
  if (typeof raw !== 'string' || raw.length > RUECKRUF_PHONE_INPUT_MAX) return null;
  const value = raw.trim();
  if (!value || !PHONE_ALLOWED.test(value)) return null;
  if (value.indexOf('+', 1) !== -1) return null;
  let international = false;
  let digits;
  if (value.startsWith('+')) {
    international = true;
    digits = value.slice(1).replace(/\(\s*0\s*\)/g, '').replace(/\D/g, '');
  } else {
    digits = value.replace(/\D/g, '');
    if (digits.startsWith('00')) {
      international = true;
      digits = digits.slice(2);
    }
  }
  if (digits.length < PHONE_MIN_DIGITS || digits.length > PHONE_MAX_DIGITS) return null;
  if (international && digits.startsWith('0')) return null;
  return international ? `+${digits}` : digits;
};

export const isValidRueckrufFirstName = (value) => {
  if (typeof value !== 'string') return false;
  const name = value.trim();
  return name.length > 0 && name.length <= RUECKRUF_FIRST_NAME_MAX
    && !/[<>\u0000-\u001f\u007f]/.test(name);
};

// Nachrichtentext der Mail an info@healio.de. Seite nur als Pfad, ohne
// Suchparameter und Anker; Kampagnenmerkmale ergänzt emailjsService selbst.
export const buildRueckrufMessage = ({ pathname, topic, lang }) => [
  'Rückrufwunsch über den Hinweis „Sprich mit einem Experten“',
  `Seite: healio.de${normalizeRueckrufPath(pathname) === '/' ? '' : normalizeRueckrufPath(pathname)}`,
  `Thema: ${RUECKRUF_TOPIC_LABELS[topic] ?? 'Allgemein'}`,
  `Sprache: ${lang === 'en' ? 'Englisch' : 'Deutsch'}`,
  `Einwilligung zum Anruf: ja, Fassung ${RUECKRUF_CONSENT_VERSION}`,
  'Nach dem Absenden sieht der Kunde den Knopf zur Terminbuchung (healio.de/terminvereinbarung). Ohne gebuchten Termin bitte zurückrufen.',
].join('\n');
