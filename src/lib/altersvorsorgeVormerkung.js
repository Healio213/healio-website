import { berechneZulagen, formatEuroDE, RECHNER_MAX_MONATSBEITRAG } from './altersvorsorgeZulagen.js';

export const VORMERKUNG_CONSENT_VERSION = 'altersvorsorge-vormerkung-2026-10-27';
export const vormerkungConsent = (mitTelefon) => `Ich bitte Healio, meine Berechnung zu übernehmen und mich per E-Mail${mitTelefon ? ' sowie telefonisch unter der angegebenen Nummer' : ''} zum Vorabcheck und zur Vorbereitung meines Starts 2027 zu kontaktieren. Diese Einwilligung kann ich jederzeit für die Zukunft widerrufen.`;

const gueltigerBeitrag = (value) => Number.isFinite(value) && value >= 10 && value <= RECHNER_MAX_MONATSBEITRAG;

// Modellannahme: monatliche Eigenbeiträge nachschüssig, Grundzulage jeweils
// am Jahresende. Kinderzulagen und Startbonus bleiben aus der Langfristprognose
// heraus, weil ihr späterer Anspruch unbekannt ist. Keine Steuerwiederanlage.
export function berechneVorsorgeModell({ monatsbeitrag, alter, rendite = 0.04 }) {
  if (!gueltigerBeitrag(monatsbeitrag) || !Number.isInteger(alter) || alter < 18 || alter >= 67
    || !Number.isFinite(rendite) || rendite < 0 || rendite > 0.1) return null;
  const jahre = 67 - alter;
  const grundzulage = berechneZulagen({ monatsbeitrag }).grundzulage;
  const monatsrendite = (1 + rendite) ** (1 / 12) - 1;
  let endkapital = 0;
  for (let monat = 1; monat <= jahre * 12; monat += 1) {
    endkapital = endkapital * (1 + monatsrendite) + monatsbeitrag;
    if (monat % 12 === 0) endkapital += grundzulage;
  }
  return { jahre, endkapital: Math.round(endkapital * 100) / 100, eigenbeitraege: monatsbeitrag * 12 * jahre, zulagen: grundzulage * jahre };
}

// § 10a EStG ab 2027: Eigenbeiträge bis 1.800 EUR zuzüglich Zulageanspruch.
// Ein fester angenommener Satz ersetzt keine tarifliche Günstigerprüfung.
export function berechneSteuerModell({ monatsbeitrag, kinder = 0, unter25 = false, steuersatz }) {
  if (!gueltigerBeitrag(monatsbeitrag) || !Number.isFinite(steuersatz) || steuersatz < 0 || steuersatz > 0.45
    || !Number.isInteger(kinder) || kinder < 0 || kinder > 6) return null;
  const ergebnis = berechneZulagen({ monatsbeitrag, kinder, unter25 });
  // § 10a Abs. 1 Satz 6 EStG: Der einmalige Startbonus nach § 84 Satz 2
  // bleibt bei der steuerlichen Zulageermittlung außer Betracht.
  const zulagen = ergebnis.zulageJahr;
  return Math.round(Math.max(0, (ergebnis.jahresbeitrag + zulagen) * steuersatz - zulagen) * 100) / 100;
}

export function buildVormerkungMessage(value, mitTelefon) {
  const ergebnis = berechneZulagen(value);
  return [
    'Bitte übernehmt meine Berechnung und merkt mich für die Vorbereitung meines Starts ins Altersvorsorgedepot im Januar 2027 vor.',
    'Ich wünsche einen etwa 10-minütigen Vorabcheck meiner Förderberechtigung, Kinderzuordnung und eines möglichen Riesterwechsels. Bitte sendet mir anschließend meine persönliche Einschätzung per E-Mail.',
    '',
    `Monatsbeitrag: ${formatEuroDE(value.monatsbeitrag)}`,
    `Zugeordnete zulagenberechtigte Kinder: ${value.kinder}`,
    `Zu Jahresbeginn unter 25: ${value.unter25 ? 'ja' : 'nein'}`,
    `Selbstständig: ${value.selbststaendig ? 'ja' : 'nein'}`,
    `Riester-Vertrag: ${value.riester ? 'ja' : 'nein'}`,
    `Grund- und Kinderzulage im Jahr (Beispiel): ${formatEuroDE(ergebnis.zulageJahr)}`,
    `Startbonus einmalig (Beispiel): ${formatEuroDE(ergebnis.startbonus)}`,
    '',
    'Kein Vertragsabschluss und keine Zusage eines bestimmten Anbieters oder Förderanspruchs.',
    `Einwilligung (${VORMERKUNG_CONSENT_VERSION}): ${vormerkungConsent(mitTelefon)}`,
  ].join('\n');
}
