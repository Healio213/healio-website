/**
 * Gemeinsame Regeln für den Kurzcheck auf den Meta-Zielseiten. Formular
 * (src/components/campaign/KurzCheck.jsx) und Funktion (api/kurzcheck-lead.js)
 * nutzen dieselben Muster und denselben Aufbau der Anfrage, damit das Formular
 * nichts durchlässt, was der Server ablehnt.
 */

export const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@.]{1,63}(?:\.[^\s@.]{1,63}){1,4}$/;

// Ziffern, Leerzeichen, Plus, Klammern, Schrägstrich, Punkt und Bindestrich,
// zum Beispiel „040 1234567“, „(040) 1234567“, „(+49) 40 1234567“ oder
// „+49 (0)40 1234567“. Am Anfang steht eine Ziffer, ein Plus oder eine Klammer.
export const PHONE_PATTERN = /^(?:\+|\(\+?|\d)[\d\s/().-]{5,39}$/;
export const PHONE_MIN_DIGITS = 6;

/**
 * Kopierte Nummern (Kontakte, Anrufliste, Messenger) tragen oft unsichtbare
 * Richtungszeichen, geschützte Leerzeichen oder typografische Striche. Die
 * werden vor Prüfung und Speicherung vereinheitlicht.
 */
export const normalizeKurzcheckPhone = (value) => (typeof value === 'string'
  ? value
    .replace(/\p{Cf}/gu, '')
    .replace(/[‐-―−]/g, '-')
    .replace(/[   ]/g, ' ')
    .trim()
  : '');

// Steuerzeichen und kaputte Unicode-Folgen lehnt die Datenbank ab; das Formular
// und die Funktion fangen sie deshalb vorher ab.
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;
export const isCleanText = (value) => typeof value === 'string' && !CONTROL_CHARACTERS.test(value) && value.isWellFormed();

export const isValidKurzcheckEmail = (value) => (
  isCleanText(value) && value.length >= 5 && value.length <= 254 && EMAIL_PATTERN.test(value)
);

export const isValidKurzcheckPhone = (value) => (
  isCleanText(value)
  && value.length <= 40
  && PHONE_PATTERN.test(value)
  && value.replace(/\D/g, '').length >= PHONE_MIN_DIGITS
);

/**
 * Nutzlast für den EU-Weg. Nur diese Felder nimmt api/kurzcheck-lead.js an;
 * jedes weitere Feld führt dort zur Ablehnung.
 */
export const buildKurzcheckPayload = ({ config, answers, firstName, phone, email, utm }) => ({
  check: config.key,
  answers: Object.fromEntries(config.steps.map((step) => [step.id, answers?.[step.id]])),
  first_name: firstName,
  phone,
  email,
  consent_contact: true,
  consent_health_data: config.consent.healthData === true,
  consent_text_version: config.consent.version,
  utm,
});
