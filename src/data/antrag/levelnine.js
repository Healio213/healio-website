// Bausteine für Produktdefinitionen aus den Level-Nine-Strecken (SDK ambulant,
// SDK stationär, UKV Zahn), Erfassung 12.11.2026 (original/levelnine.js).
// Wandelt Felder des Originals in Fragen und Erklärungen der Maske um, ohne
// den Wortlaut zu ändern. Jede Frage behält die Kennung des Originals (id),
// Antworten werden beim Übermitteln auf die Werte des Originals abgebildet.

import LEVELNINE from './original/levelnine.js';

export { LEVELNINE };

export const feldAus = (schritte, schritt, id) => schritte.find((eintrag) => eintrag.schritt === schritt)?.felder.find((feld) => feld.id === id) || null;

const istJaNein = (feld) => Array.isArray(feld.werte) && feld.werte.length === 2 && feld.werte.every((wert) => ['true', 'false'].includes(wert.wert));
const ORIGINAL_JA_NEIN = { ja: 'true', nein: 'false' };

function bedingungAus(bedingung) {
  if (!bedingung) return undefined;
  if (bedingung.antwort === 'true') return { frage: bedingung.frage, ist: 'ja' };
  if (bedingung.antwort === 'false') return { frage: bedingung.frage, ist: 'nein' };
  if (bedingung.antwort === '' || bedingung.antwort === undefined) return { frage: bedingung.frage, beantwortet: true };
  return { frage: bedingung.frage, ist: bedingung.antwort };
}

// Feld des Originals → Frage der Maske (rekursiv mit Folgefragen).
// schritt: Schritt im Original (für die Zuordnung), hinweisBeiJa: Satz unter
// einer mit „ja“ beantworteten Frage (z. B. SDK stationär: Prüfung nach Eingang).
export function frageAus(feld, { schritt, hinweisBeiJa, titel } = {}) {
  const basis = {
    id: feld.id,
    original: { schritt, id: feld.id },
    pflicht: feld.pflicht !== false,
    ...(feld.bedingung ? { bedingung: bedingungAus(feld.bedingung) } : {}),
  };
  let frage;
  if (istJaNein(feld)) {
    frage = {
      ...basis, typ: 'janein', text: feld.wortlaut, original: { ...basis.original, werte: ORIGINAL_JA_NEIN }, ...(hinweisBeiJa ? { hinweisBeiJa } : {}),
    };
  } else if (/^Auswahl/.test(feld.art) && Array.isArray(feld.werte)) {
    frage = {
      ...basis, typ: 'auswahl', legend: feld.wortlaut, optionen: feld.werte.map((wert) => ({ id: wert.wert, label: wert.anzeige ?? wert.wert })),
    };
  } else if (feld.art === 'Datum') {
    frage = { ...basis, typ: 'datum', label: feld.wortlaut };
  } else if (feld.art === 'Zahl') {
    frage = {
      ...basis, typ: 'zahl', label: feld.wortlaut, ganzzahl: true, min: 0, max: 99999,
    };
  } else {
    frage = { ...basis, typ: 'text', label: feld.wortlaut, maxLength: 500 };
  }
  if (titel) frage.titel = titel;
  if (feld.folgefragen?.length) frage.folge = feld.folgefragen.map((folge) => frageAus(folge, { schritt }));
  return frage;
}

// Alle Feldkennungen eines Feldes samt Folgefragen.
export const alleIds = (feld) => [feld.id, ...(feld.folgefragen || []).flatMap(alleIds)];

// Antwort der Maske → Wert des Originals (true/false, JJJJ-MM-TT, Zahl als Text).
export function originalWert(frage, wert) {
  if (wert === undefined || wert === null || wert === '') return null;
  if (frage.typ === 'janein') return frage.original?.werte?.[wert] ?? wert;
  if (frage.typ === 'datum') {
    const treffer = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(String(wert).trim());
    return treffer ? `${treffer[3]}-${treffer[2].padStart(2, '0')}-${treffer[1].padStart(2, '0')}` : null;
  }
  return String(wert).trim();
}

// Alle geltenden Fragen (rekursiv) als Zuordnung { schritt, feld, wert }.
export function fragenZuordnung(fragen, antworten, bedingungErfuellt, kontext) {
  const liste = [];
  const geh = (frage) => {
    if (!bedingungErfuellt(frage.bedingung, kontext)) return;
    const wert = originalWert(frage, antworten[frage.id]);
    if (wert !== null) liste.push({ schritt: frage.original?.schritt, feld: frage.original?.id || frage.id, wert });
    (frage.folge || []).forEach(geh);
  };
  fragen.forEach(geh);
  return liste;
}

// Gemeinsame Felder der Antragsdaten bei der SDK (Schritt 7), Muster wie im Original.
export function anschriftSdk(schritte) {
  const muster = (id) => feldAus(schritte, 7, id)?.regex || null;
  return [
    { id: 'strasse', label: 'Straße', typ: 'strassenname', original: 'orderStreet', autoComplete: 'address-line1', fehlerLeer: 'Bitte gib deine Straße ein.' },
    {
      id: 'hausnummer', label: 'Hausnr.', typ: 'text', original: 'orderHouseNumber', muster: muster('orderHouseNumber') || '^\\d+(?:(?:\\s*[A-Za-z\\s-]+)|(?:\\s*-\\s*\\d+))?(?:\\s*\\/\\s*\\d+)?$', maxLength: 12, fehlerLeer: 'Bitte gib deine Hausnummer ein, zum Beispiel 12 oder 12a.',
    },
    {
      id: 'plz', label: 'PLZ', typ: 'plz', original: 'orderZip', muster: muster('orderZip') || '^(?!01000|99999)(0[1-9]\\d{3}|[1-9]\\d{4})$', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5, fehlerLeer: 'Bitte gib eine fünfstellige PLZ ein.',
    },
    { id: 'ort', label: 'Ort', typ: 'name', original: 'orderCity', autoComplete: 'address-level2', fehlerLeer: 'Bitte gib deinen Wohnort ein.' },
    {
      id: 'land', label: 'Land', gesperrt: true, wert: 'Deutschland', original: 'orderLand', hinweis: 'Der Wohnsitz muss sich bei Abschluss der Versicherung in Deutschland befinden.',
    },
    {
      id: 'email', label: 'E-Mail', typ: 'email', type: 'email', original: 'eMail', autoComplete: 'email', inputMode: 'email', fehlerLeer: 'Bitte gib deine E-Mail-Adresse ein.',
    },
    {
      id: 'telefon', label: 'Mobil', typ: 'mobil', type: 'tel', original: 'mobilNumber', muster: muster('mobilNumber') || '^((00|\\+)49)?([0-9|\\-| ]{1,})$', autoComplete: 'tel', inputMode: 'tel', fehlerLeer: 'Bitte gib deine Mobilnummer ein.',
    },
  ];
}

// Erklärung des Originals als Haken (Wortlaut am Haken, Wert „true“).
export function hakenAus(feld, { schritt, titel, pflicht = true, links = [], freiwilligText, ungesehen } = {}) {
  return {
    art: 'haken',
    key: feld.id,
    original: feld.id,
    originalSchritt: schritt,
    titel,
    haken: feld.wortlaut,
    links,
    pflicht,
    ...(freiwilligText ? { freiwilligText } : {}),
    ...(ungesehen ? { ungesehen } : {}),
  };
}

// Pflicht-Downloads je Tarif (SDK, „Ihre Vertragsunterlagen“). Die PDFs holt
// die Maske über den Antragsdienst (keine öffentliche Adresse).
export function sdkUnterlagen(tarif) {
  const liste = LEVELNINE.sdkUnterlagen[tarif] || [];
  return liste.map(([id, name]) => ({ id, name }));
}
