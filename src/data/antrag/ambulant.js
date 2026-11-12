import { SDK_ABLAUF, sdkDatenZuordnung, sdkTeile } from './sdkStrecke.js';

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

// Online-Strecke: Größe und Gewicht nur als ganze Zahlen (Gewicht mit Komma ließ WEITER nicht zu).
const FEHLER_GROESSE = `Bitte gib deine Größe in ganzen cm ein, zwischen ${GROESSE_MIN} und ${GROESSE_MAX}.`;
const FEHLER_GEWICHT = `Bitte gib dein Gewicht in ganzen kg ein, zwischen ${GEWICHT_MIN} und ${GEWICHT_MAX}.`;
const ganzeZahl = (text) => (/^\d{1,3}$/.test(String(text ?? '').trim()) ? Number(String(text).trim()) : null);
// Einzelfragen des Originals: 1a als 15 Ja/Nein-Fragen G42 bis G53, 1b bis 1k als G54 bis G63.
export const ORIGINAL_1A = ['G42', 'G43', 'G43A', 'G43B', 'G44', 'G45', 'G46', 'G47', 'G47A', 'G48', 'G49', 'G50', 'G50A', 'G51', 'G53'];
export const ORIGINAL_1B_1K = ['G54', 'G55', 'G56', 'G57', 'G58', 'G59', 'G60', 'G61', 'G62', 'G63'];

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
      id: 'groesse', original: 'G0A', label: 'Körpergröße cm', einheit: 'cm', min: GROESSE_MIN, max: GROESSE_MAX, ganzzahl: true, fehler: FEHLER_GROESSE, platzhalter: 'z. B. 172', lesen: ganzeZahl, bereinigen: groesseEingabeBereinigt, anzeige: groesseAnzeige,
    },
    {
      id: 'gewicht', original: 'G0B', label: 'Körpergewicht kg', einheit: 'kg', min: GEWICHT_MIN, max: GEWICHT_MAX, ganzzahl: true, fehler: FEHLER_GEWICHT, platzhalter: 'z. B. 68', lesen: ganzeZahl, bereinigen: gewichtEingabeBereinigt, anzeige: gewichtAnzeige,
    },
  ],
  // BMI-Tabelle aus dem SDK-Antrag 1.770aai, Seite 4 (bmiZuschlag).
  wirkungAus: (werte) => {
    const bmi = bmiAusEingabe(werte.groesse, werte.gewicht);
    return bmi.prozent ? [{ art: 'zuschlag', prozent: bmi.prozent, grund: 'Größe und Gewicht' }] : [];
  },
};

const teileSdk = sdkTeile({
  strecke: 'sdkAmbulant', produkt: 'sdk-ambulant', vollmacht: TEXT_10_VOLLMACHT, tarifFuerUnterlagen: () => 'AP',
});

const ambulant = {
  sparte: 'ambulant',
  produkt: 'ambulant',
  pfad: 'ambulant',
  bereit: true,
  stand: '2026-11-12',
  // Wortlaute ab 12.11.2026 nach der Online-Strecke der SDK (Erfassung Level Nine).
  textfassung: '2026-11-12-sdk-ambulant-online',
  quelle: 'Online-Strecke der SDK über den Exklusivlink 901334, abgeglichen 12.11.2026',
  kennzeile: 'Ambulanter Zusatzschutz der SDK',
  seitentitel: 'Antrag ambulanter Zusatzschutz | Healio',
  beschreibung: 'Dein Antrag auf den ambulanten Zusatzschutz der SDK.',
  ablauf: SDK_ABLAUF,
  ...teileSdk,
  tarife: SDK_TARIFE.map((tarif) => ({
    id: tarif.code,
    name: tarifName(tarif),
    zusatz: `${formatEuroGanz(tarif.budget)} Budget in 2 Kalenderjahren`,
    zeilen: POT_KEYS.map((key) => [POT_LABELS[key], formatEuroGanz(tarif.pots[key])]),
  })),
  tarifHinweis: 'Beitrag im Monat, noch ohne Zuschlag aus den Gesundheitsfragen.',

  beginn: {
    art: 'monatsErster', abMonat: 1, bisMonat: 1 + BEGINN_MONATE_NACH_NAECHSTMOEGLICH, laufenderMonatBisTag: 15,
  },
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

  // Die Online-Strecke hat keinen Vorspann vor den Fragen (der Hinweis zur
  // Anzeigepflicht steht als Haken unter „Erklärungen“).
  gesundheit: { titel: 'Gesundheitsfragen der SDK', vorspann: null, fragen: [frage1a, ...fragen1bk, frage2] },

  originalFuerVertrag: (daten, { beginn } = {}) => {
    const a = daten.antworten || {};
    const kreuze = a['1a'] === 'ja' && Array.isArray(a['1a-kreuze']) ? a['1a-kreuze'] : [];
    const iso = (text) => { const t = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(text || '')); return t ? `${t[3]}-${t[2]}-${t[1]}` : null; };
    const tf = (wert) => (wert === 'ja' ? 'true' : wert === 'nein' ? 'false' : null);
    return [
      { schritt: 1, feld: 'beginn', wert: beginn ? beginn.iso : null },
      { schritt: 1, feld: 'geburtsdatum', wert: iso(daten.geburtsdatumText) },
      { schritt: 1, feld: 'tarifwahl', wert: daten.tarif ? `SDK${daten.tarif}#` : null },
      ...(daten.unterlagenDienst || []).map((u) => ({ schritt: 3, feld: `downloadLnDocument_${u.id ?? u.name}`, wert: daten.unterlagenGeoeffnet?.[`dienst:${u.id ?? u.name}`] ? 'true' : null })),
      ...FRAGE_1A_ITEMS.map((item, stelle) => ({ schritt: 5, feld: ORIGINAL_1A[stelle], wert: a['1a'] ? (kreuze.includes(item.id) ? 'true' : 'false') : null })),
      ...FRAGEN_1B_1K.map((frage, stelle) => ({ schritt: 5, feld: ORIGINAL_1B_1K[stelle], wert: tf(a[frage.id]) })),
      { schritt: 5, feld: 'G0A', wert: String(a['2']?.groesse ?? '') },
      { schritt: 5, feld: 'G0B', wert: String(a['2']?.gewicht ?? '') },
      ...sdkDatenZuordnung(ambulant, daten),
    ];
  },

  gesundheitFuerVertrag: (antworten = {}) => ({
    antwort1a: antworten['1a'] ?? null,
    kreuze1a: antworten['1a'] === 'ja' && Array.isArray(antworten['1a-kreuze']) ? FRAGE_1A_ITEMS.map((item) => item.id).filter((id) => antworten['1a-kreuze'].includes(id)) : [],
    antworten: Object.fromEntries(FRAGEN_1B_1K.map((frage) => [frage.id, antworten[frage.id] ?? null])),
    groesse: groesseEingabeBereinigt(antworten['2']?.groesse ?? ''),
    gewicht: gewichtEingabeBereinigt(antworten['2']?.gewicht ?? ''),
  }),
};

export default ambulant;
