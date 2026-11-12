// Produktdefinition der Antragsmaske ambulant: SDK, Tarife AP5, AP7, AP9, AP1
// (12.11.2026). Nur Zuordnung: Alle Wortlaute, Tarife, Beiträge und
// Rechenregeln kommen unverändert aus dem Regelwerk, das auch die Prüfseite
// /antrag/pruefen und der Antragsdienst nutzen (sdkAmbulantAntrag.js,
// sdkAmbulantAntragTexte.js, sdkAmbulantAntragSdkTexte.js,
// sdkAmbulantBeitraege.js). Hier wird nichts umformuliert.
// Aufbau der Definition: src/data/antrag/aufbau.js.

import {
  ANREDEN,
  BEGINN_MONATE_NACH_NAECHSTMOEGLICH,
  FRAGEN_1B_1K,
  FRAGE_1A_ITEMS,
  FRAGE_1_TEXT,
  FRAGE_2_TEXT,
  GEWICHT_MAX,
  GEWICHT_MIN,
  GROESSE_MAX,
  GROESSE_MIN,
  HINWEIS_MINDERJAEHRIG,
  POT_KEYS,
  POT_LABELS,
  SDK_TARIFE,
  SDK_VORSPANN_ABSAETZE,
  ZAHLWEISEN,
  ZUSCHLAG_PRO_KREUZ_1A,
  beitragFuer2026Bestaetigt,
  beitragsVerlauf,
  bmiAusEingabe,
  formatEuroGanz,
  gewichtAlsZahl,
  gewichtAnzeige,
  gewichtEingabeBereinigt,
  grundbeitrag,
  groesseAlsZahl,
  groesseAnzeige,
  groesseEingabeBereinigt,
  tarifName,
} from '../sdkAmbulantAntrag.js';
import {
  BEITRAG_VORBEHALT,
  ERKLAERUNG_KURZ,
  FRAGE_1_AUFKLAPPEN,
  GKV_BESTAETIGUNG,
  KNOPF_BEANTRAGEN,
  MITTEILUNG_GELESEN,
  SDK_BONITAET,
  SDK_NAME,
  SDK_SCHLUSSERKLAERUNG,
  SDK_SEPA_ANGABEN,
  SDK_SEPA_MANDAT,
  SDK_SEPA_TITEL,
  TEIL_3_TITEL,
  TEXT_10_VOLLMACHT,
  TEXT_12_KNOPF,
  TEXT_13_FRAGE,
  TEXT_6_GESUNDHEIT,
  TEXT_6_STANDORT_PLATZHALTER,
  TEXT_8_AUSWAHL,
  TEXT_9_HAKEN,
  TEXT_9_HINWEIS,
  UNTERLAGEN_HAKEN,
  UNTERLAGEN_HEALIO,
  UNTERLAGEN_SDK,
  VVG_19_AUFKLAPPEN,
  abschlussPunkte,
} from '../sdkAmbulantAntragTexte.js';
import {
  SDK_SCHWEIGEPFLICHT_BLOECKE,
  SDK_VERZICHT_SATZ,
  SDK_VVG_19_MITTEILUNG,
  TEXT_6_STANDORT,
  UNTERLAGEN_SDK_DATEIEN,
} from '../sdkAmbulantAntragSdkTexte.js';

// Wortgleich aus src/components/antrag/StepBestaetigen.jsx (Prüfseite), dort
// nicht exportiert. Bei Änderungen beide Stellen gleich halten
// (Test scripts/check-antragsmaske-regeln.mjs vergleicht sie).
export const SCHWEIGEPFLICHT_KURZ = 'Die SDK darf deine Gesundheitsangaben für Antrag und Vertrag nutzen. Darunter wählst du, ob sie bei Ärzten selbst nachfragen darf oder dich jedes Mal vorher fragt. Jederzeit widerrufbar.';
export const SCHWEIGEPFLICHT_WAHL = [
  { id: 'I', titel: 'Möglichkeit I', text: 'Die SDK darf bei Ärzten und anderen Stellen selbst nachfragen, wenn es nötig ist. Vorher sagt sie dir Bescheid, und du kannst widersprechen.' },
  { id: 'II', titel: 'Möglichkeit II', text: 'Die SDK fragt dich jedes Mal vorher. Du entscheidest dann, ob sie nachfragen darf, oder schickst die Unterlagen selbst. Das kann etwas länger dauern.' },
];

const FEHLER_GROESSE = `Bitte gib deine Größe in cm ein, zwischen ${GROESSE_MIN} und ${GROESSE_MAX}.`;
const FEHLER_GEWICHT = `Bitte gib dein Gewicht in kg ein, zwischen ${GEWICHT_MIN} und ${GEWICHT_MAX}.`;

const frage1a = {
  id: '1a',
  typ: 'janein',
  titel: 'Frage 1a',
  kurz: 'Frage 1a',
  stamm: { label: 'Frage 1', text: FRAGE_1_TEXT },
  liste: FRAGE_1A_ITEMS.map((item) => item.label),
  zuschlagText: `Bei „ja“: je zutreffender Erkrankung ${ZUSCHLAG_PRO_KREUZ_1A} % Beitragszuschlag.`,
  // Bei „ja“ geht es nicht von selbst weiter: erst ankreuzen, dann „Weiter“.
  weiterBeiJa: false,
  folge: [{
    id: '1a-kreuze',
    typ: 'mehrfach',
    bedingung: { frage: '1a', ist: 'ja' },
    legend: 'Bitte ankreuzen, was zutrifft.',
    mindestens: 1,
    fehlerMindestens: 'Bitte kreuze mindestens eine Erkrankung an.',
    optionen: FRAGE_1A_ITEMS.map((item) => ({
      id: item.id,
      label: item.label,
      wirkung: [{ art: 'zuschlag', prozent: ZUSCHLAG_PRO_KREUZ_1A, grund: item.label.replace(/​/g, '') }],
    })),
  }],
};

const fragen1bk = FRAGEN_1B_1K.map((frage) => ({
  id: frage.id,
  typ: 'janein',
  titel: `Frage ${frage.id}`,
  kurz: `Frage ${frage.id}: ${frage.kurz}`,
  stammAufklappbar: { titel: FRAGE_1_AUFKLAPPEN, text: FRAGE_1_TEXT },
  text: `${frage.id.slice(1)}) ${frage.text}`,
  zuschlagText: `Bei „ja“: ${frage.prozent} % Beitragszuschlag.`,
  wirkung: { ja: [{ art: 'zuschlag', prozent: frage.prozent, grund: frage.kurz }] },
}));

const frage2 = {
  id: '2',
  typ: 'masse',
  titel: `Frage 2: ${FRAGE_2_TEXT}`,
  kurz: `Frage 2: ${FRAGE_2_TEXT}`,
  felder: [
    {
      id: 'groesse', label: 'Größe in cm', einheit: 'cm', min: GROESSE_MIN, max: GROESSE_MAX, fehler: FEHLER_GROESSE, platzhalter: 'z. B. 172', lesen: groesseAlsZahl, bereinigen: groesseEingabeBereinigt, anzeige: groesseAnzeige,
    },
    {
      id: 'gewicht', label: 'Gewicht in kg', einheit: 'kg', min: GEWICHT_MIN, max: GEWICHT_MAX, fehler: FEHLER_GEWICHT, platzhalter: 'z. B. 68', lesen: gewichtAlsZahl, bereinigen: gewichtEingabeBereinigt, anzeige: gewichtAnzeige,
    },
  ],
  // BMI-Tabelle aus dem SDK-Antrag 1.770aai, Seite 4 (bmiZuschlag).
  wirkungAus: (werte) => {
    const bmi = bmiAusEingabe(werte.groesse, werte.gewicht);
    return bmi.prozent ? [{ art: 'zuschlag', prozent: bmi.prozent, grund: 'Größe und Gewicht' }] : [];
  },
};

const ambulant = {
  sparte: 'ambulant',
  bereit: true,
  stand: '2026-11-12',
  textfassung: '2026-11-09',
  versicherer: {
    id: 'sdk', name: SDK_NAME, kurz: 'SDK', beiDer: 'der SDK',
  },
  kennzeile: 'Ambulanter Zusatzschutz der SDK',
  seitentitel: 'Antrag ambulanter Zusatzschutz | Healio',
  beschreibung: 'Dein Antrag auf den ambulanten Zusatzschutz der SDK.',

  tarife: SDK_TARIFE.map((tarif) => ({
    id: tarif.code,
    name: tarifName(tarif),
    zusatz: `${formatEuroGanz(tarif.budget)} Budget in 2 Kalenderjahren`,
    zeilen: POT_KEYS.map((key) => [POT_LABELS[key], formatEuroGanz(tarif.pots[key])]),
  })),
  tarifHinweis: 'Beitrag im Monat, noch ohne Zuschlag aus den Gesundheitsfragen.',

  beginn: { art: 'monatsErster', abMonat: 1, bisMonat: 1 + BEGINN_MONATE_NACH_NAECHSTMOEGLICH },
  alter: { min: 18, stichtag: 'heute', hinweisZuJung: HINWEIS_MINDERJAEHRIG },

  beitrag: {
    alter: 'kalenderjahr',
    // Gleiche Rechnung wie der Antragsdienst (SCHNITTSTELLE.md 3): Grundbeitrag
    // der Altersgruppe im Jahr des Beginns, Zuschlag in Prozent auf Cent.
    berechne: ({
      tarif, geburtsdatum, beginn, zuschlagProzent,
    }) => {
      const { gruppe, beitrag: grund } = grundbeitrag(geburtsdatum.jahr, beginn.jahr, tarif);
      const verlauf = beitragsVerlauf({
        geburtsjahr: geburtsdatum.jahr, beginn, code: tarif, zuschlagProzent,
      });
      if (grund === null || !verlauf) return null;
      return {
        grundbeitrag: grund,
        zuschlagProzent,
        zuschlagEuro: 0,
        beitrag: verlauf.beginnjahr.beitragMonat,
        folgejahr: verlauf.wechselZumFolgejahr ? { ab: verlauf.folgejahr.ab, beitrag: verlauf.folgejahr.beitragMonat } : null,
        bestaetigt: beitragFuer2026Bestaetigt(gruppe, tarif),
      };
    },
    vorbehalt: BEITRAG_VORBEHALT,
  },

  gesundheit: {
    titel: 'Gesundheitsfragen der SDK',
    vorspann: {
      vorTitel: 'Vor den 12 Fragen',
      titel: 'Hinweis der SDK',
      absaetze: SDK_VORSPANN_ABSAETZE,
      aufklapper: SDK_VVG_19_MITTEILUNG ? { titel: VVG_19_AUFKLAPPEN, absaetze: [].concat(SDK_VVG_19_MITTEILUNG) } : null,
      bestaetigung: { key: 'hinweisOk', label: MITTEILUNG_GELESEN, fehler: 'Bitte bestätige, dass du den Hinweis gelesen hast.' },
    },
    fragen: [frage1a, ...fragen1bk, frage2],
  },

  person: {
    anreden: ANREDEN,
    felder: [
      { id: 'vorname', label: 'Vorname', typ: 'name', autoComplete: 'given-name', fehlerLeer: 'Bitte gib deinen Vornamen ein.' },
      { id: 'nachname', label: 'Nachname', typ: 'name', autoComplete: 'family-name', fehlerLeer: 'Bitte gib deinen Nachnamen ein.' },
    ],
    anschrift: [
      { id: 'strasse', label: 'Straße und Hausnummer', typ: 'strasse', autoComplete: 'address-line1', fehlerLeer: 'Bitte gib Straße und Hausnummer ein.' },
      { id: 'plz', label: 'PLZ', typ: 'plz', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5, fehlerLeer: 'Bitte gib eine fünfstellige PLZ ein.' },
      { id: 'ort', label: 'Ort', typ: 'name', autoComplete: 'address-level2', fehlerLeer: 'Bitte gib deinen Wohnort ein.' },
      { id: 'telefon', label: 'Telefon', typ: 'telefon', type: 'tel', autoComplete: 'tel', inputMode: 'tel', fehlerLeer: 'Bitte gib eine Telefonnummer ein, unter der wir dich erreichen.' },
      { id: 'email', label: 'E-Mail', typ: 'email', type: 'email', autoComplete: 'email', inputMode: 'email', fehlerLeer: 'Bitte gib deine E-Mail-Adresse ein.' },
      {
        id: 'krankenkasse', label: 'Deine Krankenkasse', hinweis: 'Freiwillig, zum Beispiel Techniker Krankenkasse.', typ: 'kasse', pflicht: false, maxLength: 80, autoComplete: 'off',
      },
    ],
    bestaetigungen: [
      {
        key: 'gkv', label: GKV_BESTAETIGUNG, fehler: 'Bitte bestätige, dass du gesetzlich versichert bist und in Deutschland wohnst.', ausweg: 'Nicht gesetzlich versichert? Lass uns kurz sprechen.',
      },
    ],
  },

  zahlung: {
    zahlweisen: ZAHLWEISEN,
    kontoinhaberFrage: TEXT_13_FRAGE,
    kontoAndere: {
      titel: 'Das klären wir am besten kurz zusammen.',
      text: 'Gehört das Konto jemand anderem, muss diese Person das Lastschriftmandat selbst erteilen. Vereinbare einfach einen Termin, dann machen wir den Rest gemeinsam.',
    },
    sepa: {
      karte: 'SEPA-Lastschriftmandat der SDK', titel: SDK_SEPA_TITEL, absaetze: SDK_SEPA_MANDAT, angaben: SDK_SEPA_ANGABEN, key: 'sepa', haken: 'Ich erteile der SDK dieses SEPA-Lastschriftmandat für mein Konto.',
    },
  },

  // Erklärungen in drei Teilen wie Schritt 4 der Prüfseite. art: hinweis
  // (ohne Haken), haken (Pflicht oder freiwillig), wahl (I oder II).
  erklaerungen: [
    {
      teil: 'Beratung und Auftrag',
      eintraege: [
        { art: 'hinweis', text: TEXT_8_AUSWAHL },
        {
          art: 'haken', key: 'verzicht', titel: 'Verzicht auf Beratung', warnung: TEXT_9_HINWEIS, terminLink: true, haken: TEXT_9_HAKEN, hakenZusatz: SDK_VERZICHT_SATZ, pflicht: true,
        },
        {
          art: 'haken', key: 'vollmacht', titel: 'Auftrag und Vollmacht', kurz: ERKLAERUNG_KURZ.vollmacht, volltext: [['p', TEXT_10_VOLLMACHT]], dokument: 'Maklervertrag', haken: 'Ich erteile Healio diesen Auftrag und diese Vollmacht.', pflicht: true,
        },
      ],
    },
    {
      teil: 'Deine Einwilligungen',
      eintraege: [
        {
          art: 'haken',
          key: 'gesundheitsdaten',
          titel: 'Gesundheitsangaben bei Healio',
          kurz: ERKLAERUNG_KURZ.gesundheitsdaten,
          volltext: [['p', TEXT_6_GESUNDHEIT.map((stueck) => (stueck === TEXT_6_STANDORT_PLATZHALTER ? TEXT_6_STANDORT : stueck)).join('')]],
          haken: 'Ich bin einverstanden.',
          pflicht: true,
        },
        {
          art: 'wahl',
          key: 'schweigepflicht',
          titel: 'Einwilligung und Schweigepflichtentbindung der SDK',
          kurz: SCHWEIGEPFLICHT_KURZ,
          volltext: SDK_SCHWEIGEPFLICHT_BLOECKE,
          legend: 'Deine Wahl',
          hinweis: 'Sie gilt für 2.1 und 2.2 der Erklärung. Mit deiner Wahl gibst du die ganze Erklärung ab.',
          optionen: SCHWEIGEPFLICHT_WAHL,
          fehler: 'Bitte wähle Möglichkeit I oder II.',
          pflicht: true,
        },
        {
          art: 'haken', key: 'bonitaet', titel: 'Einwilligung zur Bonitätsprüfung', kurz: ERKLAERUNG_KURZ.bonitaet, volltext: [['p', SDK_BONITAET]], haken: 'Ich bin einverstanden.', freiwilligText: 'Freiwillig. Dein Antrag geht auch ohne diesen Haken.', pflicht: false,
        },
      ],
    },
    {
      teil: 'Unterlagen und Schlusserklärung',
      eintraege: [
        {
          art: 'unterlagen',
          key: 'schluss',
          titel: 'Unterlagen und Schlusserklärung',
          gruppen: [
            { von: 'Von der SDK', eintraege: UNTERLAGEN_SDK.map((name) => ({ name, dateien: UNTERLAGEN_SDK_DATEIEN[name] || [] })) },
            { von: 'Von Healio', eintraege: [{ name: 'Erstinformation', dateien: [{ label: 'Erstinformation', href: '/erstinformation' }] }, ...UNTERLAGEN_HEALIO.map((name) => ({ name, dateien: [] }))] },
          ],
          haken: UNTERLAGEN_HAKEN,
          hakenAbsaetze: SDK_SCHLUSSERKLAERUNG,
          pflicht: true,
        },
      ],
    },
  ],

  zusammenfassung: { titel: TEIL_3_TITEL },
  absenden: { satz: TEXT_12_KNOPF, vorbehalt: BEITRAG_VORBEHALT, knopf: KNOPF_BEANTRAGEN },
  danke: { punkte: abschlussPunkte({ versand: 'email', kontoinhaber: 'selbst' }) },

  // Gesundheitsangaben im Format des Antragsdienstes (SCHNITTSTELLE.md 3),
  // damit der Server mit zuschlagAufteilung() genau so nachrechnet.
  gesundheitFuerVertrag: (antworten = {}) => ({
    antwort1a: antworten['1a'] ?? null,
    kreuze1a: antworten['1a'] === 'ja' && Array.isArray(antworten['1a-kreuze']) ? FRAGE_1A_ITEMS.map((item) => item.id).filter((id) => antworten['1a-kreuze'].includes(id)) : [],
    antworten: Object.fromEntries(FRAGEN_1B_1K.map((frage) => [frage.id, antworten[frage.id] ?? null])),
    groesse: groesseEingabeBereinigt(antworten['2']?.groesse ?? ''),
    gewicht: gewichtEingabeBereinigt(antworten['2']?.gewicht ?? ''),
  }),
};

export default ambulant;
