import { getVariante } from '../content/altersvorsorgedepotContent.js';
import { RECHNER_MAX_MONATSBEITRAG, formatEuroDE } from './altersvorsorgeZulagen.js';

// Die Beispielwerte wandern ausschließlich im Zustand der internen Navigation
// mit. Keine E-Mail, keine Vertragsdaten, kein URL-Parameter und kein Speicher.
const SLUG_PATTERN = /^(altersvorsorgedepot|riester)-[a-z0-9-]{1,64}$/;

export function getArtikelCheckVoreinstellung(article) {
  const { monatsbeitrag, kinder, unter25 } = getVariante(article.audience).voreinstellung;
  return { monatsbeitrag: Math.min(monatsbeitrag, RECHNER_MAX_MONATSBEITRAG), kinder, unter25 };
}

export function readArtikelCheckState(state) {
  const snapshot = state?.altersvorsorgeArtikelCheck;
  if (!snapshot || typeof snapshot.slug !== 'string' || !SLUG_PATTERN.test(snapshot.slug)) return null;
  const value = snapshot.value;
  if (!value || typeof value.monatsbeitrag !== 'number' || !Number.isFinite(value.monatsbeitrag)
      || value.monatsbeitrag < 10 || value.monatsbeitrag > RECHNER_MAX_MONATSBEITRAG
      || !Number.isInteger(value.kinder) || value.kinder < 0 || value.kinder > 6
      || typeof value.unter25 !== 'boolean') return null;
  return {
    slug: snapshot.slug,
    value: { monatsbeitrag: value.monatsbeitrag, kinder: value.kinder, unter25: value.unter25 },
  };
}

export function createArtikelCheckState(slug, value) {
  const snapshot = readArtikelCheckState({ altersvorsorgeArtikelCheck: { slug, value } });
  if (!snapshot) throw new TypeError('Die Beispielrechnung enthält ungültige Werte.');
  return { altersvorsorgeArtikelCheck: snapshot };
}

const KONTAKT_ZWECKE = ['check', 'rueckruf', 'info'];

export function openAltersvorsorgeStartinfo() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('healio:altersvorsorge-startinfo'));
}

export function createAltersvorsorgeKontaktState(value, purpose = 'check') {
  const snapshot = readArtikelCheckState({
    altersvorsorgeArtikelCheck: { slug: 'altersvorsorgedepot-kontakt', value },
  });
  return {
    altersvorsorgeKontakt: {
      purpose: KONTAKT_ZWECKE.includes(purpose) ? purpose : 'check',
      value: snapshot?.value || null,
    },
  };
}

export function buildAltersvorsorgeKontaktMessage(state) {
  const request = state?.altersvorsorgeKontakt;
  if (!request || !KONTAKT_ZWECKE.includes(request.purpose)) return '';
  const intro = request.purpose === 'rueckruf'
    ? 'Ich wünsche einen Rückruf von Healio zu meinem Zuschuss-Check zum Altersvorsorgedepot. Meine Telefonnummer ergänze ich unten.'
    : request.purpose === 'info'
      ? 'Ich habe eine Frage zum Altersvorsorgedepot und zum Zuschuss-Fahrplan 2027. Bitte antwortet auf meine Anfrage.'
      : 'Ich möchte einen unverbindlichen Zuschuss-Check zum Altersvorsorgedepot anfragen. Bitte stimmt einen Termin per Video oder Telefon mit mir ab.';
  const snapshot = readArtikelCheckState({
    altersvorsorgeArtikelCheck: { slug: 'altersvorsorgedepot-kontakt', value: request.value },
  });
  if (!snapshot) return intro;
  const { monatsbeitrag, kinder, unter25 } = snapshot.value;
  return `${intro}\n\nMeine Beispielrechnung: ${formatEuroDE(monatsbeitrag)} Monatsbeitrag, ${kinder} zugeordnete zulagenberechtigte Kinder mit Kindergeldanspruch, zu Beginn des Beitragsjahres unter 25: ${unter25 ? 'ja' : 'nein'}. Bitte prüft meine tatsächlichen Fördervoraussetzungen.`;
}
