// Daten und Rechenregeln für den Entwurf der SDK-Antragsstrecke (Route
// /antrag-entwurf, nur ambulant: AP5, AP7, AP9, AP1). Reine Logik: kein JSX,
// keine @/-Importe, damit Node die Datei direkt laden kann
// (scripts/check-sdk-antrag-entwurf-model.mjs).
//
// Quellen:
// - SDK-Antrag 1.770aai (Fassung 01.24, Wortlaut laut Recherche gleich 10.26):
//   Vorspann, Fragen 1a bis 1k, Frage 2 samt BMI-Tabelle.
// - Konzept Healio/Antragsstrecke/KONZEPT-BEGLEITETER-ANTRAG-2026-10-12.md.
// - Franks Vorgabe 15.10.2026: Die Strecke ist ein schlanker Antrag wie die
//   Online-Strecke der SDK. Produktinfos stehen auf den Tarifseiten, nicht hier.
//
// Die Fragen stehen im Wortlaut der SDK. Healio stellt sie nur dar und
// ändert nichts daran. Beiträge kommen aus sdkAmbulantBeitraege.js.

import {
  SDK_AMBULANT_BEITRAEGE,
  beitragInGruppe,
  findeAltersgruppe,
} from './sdkAmbulantBeitraege.js';
import { TEXT_8_AUSWAHL, WEG_A_TRANSPARENZ } from './sdkAmbulantAntragTexte.js';

// Auf Cent runden.
const aufCent = (wert) => Math.round(wert * 100) / 100;

// ---------------------------------------------------------------------------
// Strecke
// ---------------------------------------------------------------------------

export const SCHRITT_ANZAHL = 4;

export const SPARTE_AMBULANT = {
  id: 'ambulant',
  kennzeile: 'Ambulante Zusatzversicherung der SDK',
  seitentitel: 'Ambulanter Antrag SDK, Entwurf | Healio',
  schritte: {
    1: 'Tarif und Beitrag',
    2: 'Gesundheitsfragen der SDK',
    3: 'Dein Beitrag',
    4: 'Wie möchtest du abschließen?',
  },
};

// ---------------------------------------------------------------------------
// Tarifstufen
// ---------------------------------------------------------------------------

// Spiegelt TIERS in src/components/sections/ambulant/AmbulantConversionFlow.jsx.
// Beträge in EUR je zwei Kalenderjahre ab Versicherungsbeginn.
export const SDK_TARIFE = [
  { id: 50, code: 'AP5', refund: '50 %', budget: 1400, pots: { vision: 200, natural: 500, prevention: 200, copay: 500 } },
  { id: 70, code: 'AP7', refund: '70 %', budget: 2000, pots: { vision: 300, natural: 700, prevention: 300, copay: 700 } },
  { id: 90, code: 'AP9', refund: '90 %', budget: 2600, pots: { vision: 400, natural: 900, prevention: 400, copay: 900 } },
  { id: 100, code: 'AP1', refund: '100 %', budget: 3000, pots: { vision: 500, natural: 1000, prevention: 500, copay: 1000 } },
];

export const POT_KEYS = ['vision', 'natural', 'prevention', 'copay'];

// Bezeichnungen wie im SDK-Antrag (Sehhilfe, Vorsorge und Impfungen,
// Naturheilverfahren, Hilfsmittel und Zuzahlungen).
export const POT_LABELS = {
  vision: 'Sehhilfen',
  natural: 'Naturheilverfahren und Heilpraktiker',
  prevention: 'Vorsorge und Impfungen',
  copay: 'Hilfsmittel und Zuzahlungen',
};

export function findeTarif(code) {
  return SDK_TARIFE.find((tarif) => tarif.code === code) || null;
}

// "AP1 · 100 % Erstattung"
export function tarifName(tarif) {
  return tarif ? `${tarif.code} · ${tarif.refund} Erstattung` : '';
}

// ---------------------------------------------------------------------------
// Beginn und Alter
// ---------------------------------------------------------------------------

const zweistellig = (zahl) => String(zahl).padStart(2, '0');

// SDK-Höchstgrenze für den Beginn noch prüfen: So viele Monate nach dem
// nächstmöglichen Beginn lässt die Auswahl „Anderer Beginn“ zu.
export const BEGINN_MONATE_NACH_NAECHSTMOEGLICH = 6;

function monatsErster(heute, schritt) {
  const datum = new Date(heute.getFullYear(), heute.getMonth() + schritt, 1);
  const jahr = datum.getFullYear();
  const monat = datum.getMonth() + 1;
  return {
    iso: `${jahr}-${zweistellig(monat)}-01`,
    jahr,
    monat,
    label: `01.${zweistellig(monat)}.${jahr}`,
  };
}

// Beginn immer zum Monatsersten. naechstmoeglich: der Erste des nächsten
// Monats (der laufende Monat zählt nicht). weitere: die Monatsersten danach
// bis einschließlich BEGINN_MONATE_NACH_NAECHSTMOEGLICH Monate nach dem
// nächstmöglichen Beginn, für die Auswahlliste bei „Anderer Beginn“.
export function beginnOptionen(heute = new Date()) {
  const weitere = [];
  for (let schritt = 2; schritt <= BEGINN_MONATE_NACH_NAECHSTMOEGLICH + 1; schritt += 1) weitere.push(monatsErster(heute, schritt));
  return { naechstmoeglich: monatsErster(heute, 1), weitere };
}

// Der gewählte Beginn: art 'naechstmoeglich' oder 'anderer' (dann zählt iso
// aus der Auswahlliste). Liefert null, solange bei „Anderer Beginn“ kein
// Datum gewählt ist.
export function gewaehlterBeginn(optionen, art, iso) {
  if (art === 'naechstmoeglich') return optionen.naechstmoeglich;
  if (art === 'anderer') return optionen.weitere.find((option) => option.iso === iso) || null;
  return null;
}

export const HINWEIS_MINDERJAEHRIG = 'Für Kinder und Jugendliche nehmen wir den Antrag gemeinsam auf.';

function istGueltigesDatum(stichtag) {
  return stichtag instanceof Date && !Number.isNaN(stichtag.getTime());
}

// Genaues Alter in ganzen Jahren am Stichtag, nach Tag, Monat und Jahr.
// geburtsdatum: { tag, monat, jahr } oder Text TT.MM.JJJJ. Wer am 29.02.
// geboren ist, wird in Jahren ohne 29.02. erst am 01.03. ein Jahr älter.
// Liefert null bei ungültigen Angaben oder einem Geburtstag nach dem Stichtag.
export function alterAmTag(geburtsdatum, stichtag = new Date()) {
  if (!istGueltigesDatum(stichtag)) return null;
  const datum = typeof geburtsdatum === 'string' ? parseGeburtsdatum(geburtsdatum, stichtag) : geburtsdatum;
  if (!datum || ![datum.tag, datum.monat, datum.jahr].every(Number.isInteger)) return null;
  const monat = stichtag.getMonth() + 1;
  const tag = stichtag.getDate();
  let alter = stichtag.getFullYear() - datum.jahr;
  if (monat < datum.monat || (monat === datum.monat && tag < datum.tag)) alter -= 1;
  return alter >= 0 ? alter : null;
}

// Schritt 1 stoppt, wer am heutigen Tag (Tag der Angaben) noch keine 18 ist.
// Der Beginn liegt immer später, wer heute 18 ist, ist es am Beginn also auch.
export function istVolljaehrigAm(geburtsdatum, stichtag = new Date()) {
  const alter = alterAmTag(geburtsdatum, stichtag);
  return alter !== null && alter >= 18;
}

// Für Altersgruppe und Beitrag zählt nur das Jahr aus dem Geburtsdatum: Die
// SDK rechnet mit dem Kalenderjahr des Beginns minus Geburtsjahr.
export function geburtsjahrAusDatum(text, heute = new Date()) {
  const datum = parseGeburtsdatum(text, heute);
  return datum ? datum.jahr : null;
}

export function grundbeitrag(geburtsjahr, beginnJahr, code) {
  const gruppe = findeAltersgruppe(geburtsjahr, beginnJahr);
  return { gruppe, beitrag: beitragInGruppe(gruppe, code) };
}

export function gruppenName(gruppe) {
  if (!gruppe) return '';
  return gruppe.bis === null ? `ab ${gruppe.von} Jahren` : `${gruppe.von} bis ${gruppe.bis} Jahre`;
}

// ---------------------------------------------------------------------------
// Stand der Beitragstabelle (nur intern)
// ---------------------------------------------------------------------------

const ALLE_CODES = ['AP5', 'AP7', 'AP9', 'AP1'];

// Welche Zellen für 2026 direkt bei der SDK bestätigt sind (Abschlussstrecke
// oder sdk.de), je Altersgruppe (Schlüssel: Alter von). Alle übrigen Zellen
// stammen aus der SDK-Beitragstabelle 06/2020, siehe sdkAmbulantBeitraege.js.
// Öffentlich zeigt die Strecke keinen Prüfstatus (Frank).
export const BEITRAGSTABELLE = {
  stand: SDK_AMBULANT_BEITRAEGE.stand,
  bestaetigt2026: {
    0: ['AP1'],
    21: ALLE_CODES,
    31: ALLE_CODES,
    41: ALLE_CODES,
    51: ['AP5'],
    61: [],
    71: [],
  },
  hinweisIntern: 'Die Beiträge ab 51 Jahren sind für 2026 nicht vollständig belegt. Für 51 bis 60 Jahre ist nur AP5 bestätigt, ab 61 Jahren keine Stufe. Diese Werte stammen aus der SDK-Beitragstabelle 06/2020 und sind vor dem Echtbetrieb in der SDK-Strecke zu prüfen. Eine Beitragsanpassung der SDK, etwa zum 01.01.2027, ist nicht berücksichtigt.',
};

export function beitragFuer2026Bestaetigt(gruppe, code) {
  if (!gruppe) return false;
  return (BEITRAGSTABELLE.bestaetigt2026[gruppe.von] || []).includes(code);
}

// ---------------------------------------------------------------------------
// Beitrag im Jahr des Beginns und ab dem Folgejahr
// ---------------------------------------------------------------------------

// Laut AVB AP-Tarife 1.753a, Abschnitt III.1: Ab dem Kalenderjahr nach dem
// 20., 30., 40., 50., 60. und 70. Geburtstag gilt der Beitrag der nächsten
// Altersgruppe. Der Zuschlag aus den Gesundheitsfragen bleibt gleich.
//
// beginn: { jahr, monat } (wie aus beginnOptionen). Liefert null, wenn eine
// Angabe fehlt, sonst:
// - beginnjahr: { jahr, gruppe, grund, beitragMonat, monate, gezahlt, bis }
//   Beitrag mit Zuschlag vom Beginn bis 31.12. des Beginnjahres.
// - folgejahr: { jahr, gruppe, grund, beitragMonat, monate: 12, gezahlt, ab }
//   Beitrag mit Zuschlag ab 01.01. des Folgejahres.
// - wechselZumFolgejahr: Die Altersgruppe ändert sich zum 01.01. des Folgejahres.
// - wechselInErsten12Monaten: Dieser Wechsel fällt in die ersten 12 Monate
//   (Beginn nicht im Januar).
// - summeErste12Monate: was die ersten 12 Monate zusammen kosten.
// - vollesJahr: { jahr, beitragMonat, jahresbeitrag } für das erste volle
//   Kalenderjahr (das Beginnjahr bei Beginn im Januar, sonst das Folgejahr).
export function beitragsVerlauf({ geburtsjahr, beginn, code, zuschlagProzent = 0 } = {}) {
  if (!Number.isInteger(geburtsjahr) || !beginn || !Number.isInteger(beginn.jahr)
    || !Number.isInteger(beginn.monat) || beginn.monat < 1 || beginn.monat > 12) return null;

  const imJahr = (jahr) => {
    const gruppe = findeAltersgruppe(geburtsjahr, jahr);
    const grund = beitragInGruppe(gruppe, code);
    return { jahr, gruppe, grund, beitragMonat: grund === null ? null : beitragMitZuschlag(grund, zuschlagProzent) };
  };
  const start = imJahr(beginn.jahr);
  const folge = imJahr(beginn.jahr + 1);
  if (start.beitragMonat === null || folge.beitragMonat === null) return null;

  const monate = 13 - beginn.monat;
  const wechselZumFolgejahr = start.gruppe !== folge.gruppe;
  const voll = beginn.monat === 1 ? start : folge;

  return {
    beginnjahr: { ...start, monate, gezahlt: aufCent(monate * start.beitragMonat), bis: `31.12.${beginn.jahr}` },
    folgejahr: { ...folge, monate: 12, gezahlt: aufCent(12 * folge.beitragMonat), ab: `01.01.${beginn.jahr + 1}` },
    wechselZumFolgejahr,
    wechselInErsten12Monaten: wechselZumFolgejahr && beginn.monat > 1,
    summeErste12Monate: aufCent(monate * start.beitragMonat + (12 - monate) * folge.beitragMonat),
    vollesJahr: { jahr: voll.jahr, beitragMonat: voll.beitragMonat, jahresbeitrag: aufCent(12 * voll.beitragMonat) },
  };
}

// ---------------------------------------------------------------------------
// Gesundheitsfragen der SDK (Wortlaut aus dem Antrag 1.770aai)
// ---------------------------------------------------------------------------

// Vorspann vor den ambulanten Gesundheitsfragen, wortgleich, in den Absätzen
// des Antragsformulars. Silbentrennungen des Formulars sind aufgelöst.
// Fragen und Hinweis stehen im Wortlaut des SDK-Antrags 1.770aai, Healio
// stellt sie nur dar (auf der Seite steht dazu kein eigener Satz mehr).
export const SDK_VORSPANN_ABSAETZE = [
  'Um Ihren Antrag prüfen zu können, benötigen wir Antworten auf alle untenstehenden ambulanten Fragen. Bitte beantworten Sie diese wahrheitsgemäß und vollständig. Eine Verletzung der vorvertraglichen Anzeigepflicht kann uns berechtigen, je nach Verschulden vom Vertrag zurückzutreten, ihn zu kündigen oder anzupassen, was zu unserer Leistungsfreiheit (auch für bereits eingetretene Versicherungsfälle) führen kann. Ausführliche Hinweise zu den Anzeigepflichten und zu den Folgen einer Anzeigepflichtverletzung entnehmen Sie bitte den „Wichtigen Informationen für den Antragsteller“, die Sie auf Seite 8 dieses Antrages finden.',
  'Bei den aufgeführten Erkrankungen handelt es sich um eine abschließende Aufzählung der Erkrankungen.',
  'Wird mindestens eine Frage von 1a) bis 1k) mit „ja“ beantwortet, fällt ein Beitragszuschlag auf die jeweils gültige monatliche Beitragsrate an.',
  'Werden mehrere Fragen mit „ja“ beantwortet, werden die Beitragszuschläge addiert. Durch die Zahlung des Beitragszuschlags sind die genannten Erkrankungen in den Versicherungsschutz eingeschlossen.',
];

export const SDK_VORSPANN = SDK_VORSPANN_ABSAETZE.join(' ');

export const FRAGE_1_TEXT = 'Werden oder wurden in den letzten 3 Jahren Beratungen, Behandlungen oder Untersuchungen (auch Kontrolluntersuchungen aufgrund Vorerkrankungen) hinsichtlich einer der nachfolgend aufgeführten Erkrankungen durch Ärzte, Heilpraktiker oder sonstigen Therapeuten durchgeführt bzw. sind solche angeraten oder beabsichtigt?';

// 1a: erst Ja oder Nein (Franks Vorgabe 16.10.2026), bei „ja“ die
// zutreffenden Erkrankungen ankreuzen, jedes Kreuz 40 % Zuschlag.
export const ZUSCHLAG_PRO_KREUZ_1A = 40;

export const FRAGE_1A_ITEMS = [
  { id: 'aids-hepatitis', label: 'AIDS/HIV Infektion, Hepatitis B/C' },
  { id: 'als', label: 'Amyotrophe Lateralsklerose (ALS), progressive Muskelatrophie, Bulbärparalyse' },
  { id: 'weichteilrheuma', label: 'Weichteilrheumatismus' },
  { id: 'chorea', label: 'Chorea Huntington' },
  { id: 'niere', label: 'Chronische Niereninsuffizienz bzw. Nierenentzündung' },
  { id: 'colitis', label: 'Colitis ulcerosa, Morbus Crohn' },
  { id: 'diabetes', label: 'Diabetes mellitus' },
  { id: 'gliedmassen', label: 'Fehlende Gliedmaßen' },
  { id: 'fertilitaet', label: 'Fertilitätsstörungen' },
  { id: 'hoerschaedigung', label: 'Hörschädigung/​Schwerhörigkeit (exkl. akuter Hörsturz)' },
  { id: 'krebs', label: 'Krebserkrankungen' },
  { id: 'lunge', label: 'Lungenemphysem, Mukoviszidose' },
  { id: 'lymphoedem', label: 'Lymphödem' },
  { id: 'ms', label: 'Multiple Sklerose (MS)' },
  { id: 'osteoporose', label: 'Osteoporose' },
];

// 1b bis 1k: je Ja/Nein, Zuschlag nur bei "Ja". text ist der Wortlaut der SDK,
// kurz nur eine Kurzbezeichnung für die Übersicht der Antworten.
export const FRAGEN_1B_1K = [
  { id: '1b', prozent: 20, kurz: 'Atemwege und Allergien', text: 'Atemwegserkrankungen (Asthma, Bronchiektasen, chronische Bronchitis, chronisch obstruktive Lungenerkrankung (COPD)) und Allergien (Heuschnupfen, Hausstaubmilbenallergie, Tierhaarallergie)' },
  { id: '1c', prozent: 40, kurz: 'Psychische Erkrankungen', text: 'Psychische Erkrankungen (Alkohol-, Drogen- und Medikamentenabhängigkeit, Angststörungen, Depressionen, Entwicklungsstörungen, Erschöpfungssyndrom, Schlafstörungen, Zwangsstörungen)' },
  { id: '1d', prozent: 40, kurz: 'Herz und Kreislauf', text: 'Erkrankungen des Herzens und des Kreislaufsystems (Arteriosklerose, Bluthochdruck, Herzinfarkt, Herzinsuffizienz, Herzrhythmusstörungen, Hirnblutungen, Schlaganfall)' },
  { id: '1e', prozent: 40, kurz: 'Muskeln, Sehnen, Nerven, Gelenke, Wirbelsäule', text: 'Erkrankungen der Muskeln, der Sehnen, der Nerven, der Gelenke und der Wirbelsäule (Arthritis, Arthrose, Bandscheibenvorfall/-prolaps, Bursitis, Chondromalazie, Dystonie, Epicondylitis, Gelenksteife, Impingement-Syndrom, Knorpelschäden, Kyphose, Lordose, Morbus Bechterew, Muskelschwäche, Muskelverspannungen, Neuralgie, Osteochondrose, Parese, Parkinson-Syndrom, Plegie, Polyneuropathie, Skoliose, Spinalstenose, Spondylose, Tendinitis)' },
  { id: '1f', prozent: 20, kurz: 'Magen, Speiseröhre und Darm', text: 'Erkrankungen des Magens, der Speiseröhre und des Darms (Magenschleimhautentzündung, Magengeschwür, Darmdivertikel, Refluxkrankheit (Sodbrennen), Reizmagen, Reizdarm)' },
  { id: '1g', prozent: 20, kurz: 'Haut und Pilzerkrankungen', text: 'Erkrankungen der Haut (Akne, Dermatitis, Ekzem, Neurodermitis, Schuppenflechte, Parästhesie der Haut) und Pilzerkrankungen (Fuß-, Haut-, Nagelpilz)' },
  { id: '1h', prozent: 20, kurz: 'Stoffwechsel und Mangelerscheinungen', text: 'Stoffwechselerkrankungen (Schilddrüsenunter/-überfunktion, Fettstoffwechselstörung, Hyperurikämie) und Mangelerscheinungen (Vitamin- und Eisenmangel)' },
  { id: '1i', prozent: 20, kurz: 'Kopfschmerzen und Migräne', text: 'Kopfschmerzen (nicht durch eine andere Krankheit verursacht), Migräne' },
  { id: '1j', prozent: 20, kurz: 'Nebenhöhlen', text: 'Chronische Erkrankungen der Nebenhöhlen (Abzess, chronische Sinusitis, Furunkel, Hypertrophie der Nasenmuscheln, Karbunkel, Mukozele der Nase oder Nasennebenhöhle, Nasenpolypen, Zyste)' },
  { id: '1k', prozent: 20, kurz: 'Schwindel, Hörsturz, Gleichgewicht, Tinnitus', text: 'Chronischer Schwindel, Hörsturz, Morbus Menière, Gleichgewichtsstörungen, Tinnitus' },
];

export const FRAGE_2_TEXT = 'Körpergröße und Körpergewicht';

// Unterbildschirme in Schritt 2: 0 = Hinweis der SDK, 1 = Frage 1 mit 1a,
// 2 bis 11 = 1b bis 1k, 12 = Frage 2. Gezählt werden nur die 12 Fragen.
export const FRAGE_INDEX_1A = 1;
export const FRAGE_INDEX_ERSTE_JA_NEIN = 2;
export const FRAGE_INDEX_LETZTE_JA_NEIN = FRAGE_INDEX_ERSTE_JA_NEIN + FRAGEN_1B_1K.length - 1;
export const FRAGE_INDEX_GROESSE = FRAGE_INDEX_LETZTE_JA_NEIN + 1;
export const FRAGEN_ANZAHL = FRAGE_INDEX_GROESSE;

export function jaNeinFrageAmIndex(index) {
  return FRAGEN_1B_1K[index - FRAGE_INDEX_ERSTE_JA_NEIN] || null;
}

export function indexDerJaNeinFrage(id) {
  const stelle = FRAGEN_1B_1K.findIndex((frage) => frage.id === id);
  return stelle < 0 ? null : FRAGE_INDEX_ERSTE_JA_NEIN + stelle;
}

// ---------------------------------------------------------------------------
// Frage 2: BMI-Zuschlag nach der Tabelle im SDK-Antragsformular
// ---------------------------------------------------------------------------

export const GROESSE_MIN = 120;
export const GROESSE_MAX = 230;
export const GEWICHT_MIN = 30;
export const GEWICHT_MAX = 300;

// Liefert { bmi, anzeige, prozent, plausibel }. prozent ist nur dann null,
// wenn die Angaben nicht plausibel sind.
//
// Grenzen der BMI-Tabelle auf Seite 4 des Antrags 1.770aai: unter 17 sind
// 20 %, unter 30 sind 0 %, unter 36 sind 20 %, ab 36 sind 40 %. Diese Lesart
// trifft alle Zellen der Tabelle (1,60 bis 1,94 m, 40 bis 120 kg), auch
// BMI 29 bis unter 30 (immer 0 %) und 35 bis unter 36 (immer 20 %). Die SDK
// schneidet die Nachkommastellen also ab. Die Legende für Maße außerhalb der
// Tabelle (17 bis 29, 30 bis 35, ab 36) passt dazu.
// anzeige ist der BMI auf eine Nachkommastelle abgeschnitten, damit eine
// gerundete Anzeige nie eine Tabellengrenze überspringt.
export function bmiZuschlag(groesseCm, gewichtKg) {
  const groesse = Number(groesseCm);
  const gewicht = Number(gewichtKg);
  const plausibel = Number.isFinite(groesse) && Number.isFinite(gewicht)
    && groesse >= GROESSE_MIN && groesse <= GROESSE_MAX
    && gewicht >= GEWICHT_MIN && gewicht <= GEWICHT_MAX;
  if (!plausibel) return { bmi: null, anzeige: null, prozent: null, plausibel: false };

  const meter = groesse / 100;
  // Rundung auf sechs Stellen gegen Gleitkomma-Rauschen an den Grenzen.
  const bmi = Math.round((gewicht / (meter * meter)) * 1e6) / 1e6;
  const anzeige = Math.floor(bmi * 10) / 10;

  let prozent;
  if (bmi < 17) prozent = 20;
  else if (bmi < 30) prozent = 0;
  else if (bmi < 36) prozent = 20;
  else prozent = 40;

  return { bmi, anzeige, prozent, plausibel: true };
}

// ---------------------------------------------------------------------------
// Eingaben zu Frage 2 einheitlich lesen und anzeigen
// ---------------------------------------------------------------------------

const zahlFormat = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 2, useGrouping: false });

// Gewicht als Zahl. Komma oder Punkt gelten als Dezimalzeichen, ein Zeichen am
// Ende zählt nicht: „70,“ und „70.“ ergeben 70, „070“ ergibt 70, „70,5“ 70,5.
// Liefert null, wenn der Text keine Zahl ist.
export function gewichtAlsZahl(text) {
  const wert = String(text ?? '').trim();
  if (!/^\d{1,3}(?:[.,]\d*)?$/.test(wert)) return null;
  const zahl = Number(wert.replace(',', '.'));
  return Number.isFinite(zahl) ? zahl : null;
}

// Größe in cm als Zahl. Erlaubt sind Zentimeter („172“, „172,5“) und Meter
// mit Komma oder Punkt („1,72“), die in Zentimeter umgerechnet werden.
// Liefert null, wenn der Text keine Zahl ist.
export function groesseAlsZahl(text) {
  const zahl = gewichtAlsZahl(text);
  if (zahl === null) return null;
  return zahl > 0 && zahl < 3 ? Math.round(zahl * 1000) / 10 : zahl;
}

// „70“, „70,5“: so steht das Gewicht in der Übersicht und beim Übertragen.
export function gewichtAnzeige(text) {
  const zahl = gewichtAlsZahl(text);
  return zahl === null ? '' : zahlFormat.format(zahl);
}

export function groesseAnzeige(text) {
  const zahl = groesseAlsZahl(text);
  return zahl === null ? '' : zahlFormat.format(zahl);
}

// Für das Eingabefeld nach dem Verlassen: dieselbe Schreibweise wie die Anzeige.
// Unlesbare Eingaben bleiben stehen, damit die Fehlermeldung greift.
export function gewichtEingabeBereinigt(text) {
  const zahl = gewichtAlsZahl(text);
  return zahl === null ? String(text ?? '') : zahlFormat.format(zahl);
}

export function groesseEingabeBereinigt(text) {
  const zahl = groesseAlsZahl(text);
  return zahl === null ? String(text ?? '') : zahlFormat.format(zahl);
}

export function bmiAusEingabe(groesseText, gewichtText) {
  const groesse = groesseAlsZahl(groesseText);
  const gewicht = gewichtAlsZahl(gewichtText);
  if (groesse === null || gewicht === null) return bmiZuschlag(Number.NaN, Number.NaN);
  return bmiZuschlag(groesse, gewicht);
}

// ---------------------------------------------------------------------------
// Zuschläge und Beiträge
// ---------------------------------------------------------------------------

// Summe aller Zuschläge in Prozent: 40 % je Kreuz bei 1a, die Prozente der mit
// "ja" beantworteten Fragen 1b bis 1k und der BMI-Zuschlag. Unbekannte Kennungen
// und doppelte Einträge zählen nicht. Ein fehlender BMI-Zuschlag (null) zählt 0.
export function gesamtZuschlag({ kreuze1a = [], jaFragen = [], bmiProzent = null } = {}) {
  const bekannte1a = new Set(FRAGE_1A_ITEMS.map((item) => item.id));
  const kreuze = new Set(kreuze1a.filter((id) => bekannte1a.has(id)));
  const summe1a = kreuze.size * ZUSCHLAG_PRO_KREUZ_1A;

  const ja = new Set(jaFragen);
  const summe1bk = FRAGEN_1B_1K.reduce((summe, frage) => summe + (ja.has(frage.id) ? frage.prozent : 0), 0);

  const summeBmi = typeof bmiProzent === 'number' && Number.isFinite(bmiProzent) ? bmiProzent : 0;
  return summe1a + summe1bk + summeBmi;
}

// Kreuze bei 1a, die zählen: Bei „nein“ zählt kein Kreuz (die Strecke löscht
// sie beim Wechsel von „ja“ auf „nein“).
export function kreuze1aWirksam({ antwort1a = null, kreuze1a = [] } = {}) {
  return antwort1a === 'nein' ? [] : kreuze1a;
}

// Die angekreuzten Erkrankungen bei 1a in der Reihenfolge des Formulars.
export function gewaehlte1a(daten = {}) {
  const kreuze = kreuze1aWirksam(daten);
  return FRAGE_1A_ITEMS.filter((item) => kreuze.includes(item.id));
}

// Antwort auf 1a als Text: „Nein“ oder „Ja: AIDS/HIV Infektion, Hepatitis B/C; …“.
export function antwort1aText(daten = {}, { ohneTrennzeichen = false } = {}) {
  const gewaehlt = gewaehlte1a(daten).map((item) => (ohneTrennzeichen ? item.label.replace(/\u200B/g, '') : item.label));
  return daten.antwort1a === 'ja' && gewaehlt.length > 0 ? `Ja: ${gewaehlt.join('; ')}` : 'Nein';
}

// Zuschlag aufgeteilt wie im SDK-Antrag: Frage 1a, Fragen 1b bis 1k, Frage 2.
export function zuschlagAufteilung({
  antwort1a = null, kreuze1a = [], antworten = {}, groesse = '', gewicht = '',
} = {}) {
  const kreuze = kreuze1aWirksam({ antwort1a, kreuze1a });
  const jaFragen = FRAGEN_1B_1K.filter((frage) => antworten[frage.id] === 'ja').map((frage) => frage.id);
  const bmi = bmiAusEingabe(groesse, gewicht);
  return {
    a: gesamtZuschlag({ kreuze1a: kreuze }),
    bk: gesamtZuschlag({ jaFragen }),
    bmi: bmi.prozent,
    gesamt: gesamtZuschlag({ kreuze1a: kreuze, jaFragen, bmiProzent: bmi.prozent }),
    jaFragen,
  };
}

// Beitrag mit Zuschlag je Monat in EUR, auf Cent gerundet.
export function beitragMitZuschlag(grund, prozent) {
  const cent = Math.round(Number(grund) * 100);
  if (!Number.isFinite(cent)) return null;
  const aufschlag = Number.isFinite(prozent) ? prozent : 0;
  return Math.round((cent * (100 + aufschlag)) / 100) / 100;
}

// ---------------------------------------------------------------------------
// Anzeige
// ---------------------------------------------------------------------------

const euroMitCent = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const euroGanz = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

// "39,19 EUR"
export function formatEuro(wert) {
  if (!Number.isFinite(wert)) return '';
  return `${euroMitCent.format(wert)} EUR`;
}

// "3.000 EUR" für runde Beträge
export function formatEuroGanz(wert) {
  if (!Number.isFinite(wert)) return '';
  return `${euroGanz.format(wert)} EUR`;
}

// ---------------------------------------------------------------------------
// Vollständigkeit der Gesundheitsfragen
// ---------------------------------------------------------------------------

// Liefert die Liste der Punkte, die noch offen sind. Leer heißt vollständig.
export function offeneFragen({
  antwort1a = null, kreuze1a = [], antworten = {}, groesse = '', gewicht = '',
} = {}) {
  const offen = [];
  if (antwort1a !== 'ja' && antwort1a !== 'nein') offen.push('Frage 1a');
  else if (antwort1a === 'ja' && gewaehlte1a({ antwort1a, kreuze1a }).length === 0) offen.push('Frage 1a: mindestens ein Kreuz');
  FRAGEN_1B_1K.forEach((frage) => {
    if (antworten[frage.id] !== 'ja' && antworten[frage.id] !== 'nein') offen.push(`Frage ${frage.id}`);
  });
  if (!bmiAusEingabe(groesse, gewicht).plausibel) offen.push('Frage 2: Körpergröße und Körpergewicht');
  return offen;
}

// Alle Antworten als schlichter Text, zum Kopieren für die Online-Strecke der SDK.
// Die erste Zeile ist der Hinweis zur eingeschränkten Auswahl (Text 8), damit
// er beim Kopieren oder Drucken dauerhaft vorliegt (§ 60, § 62 VVG).
export function antwortenAlsText({
  tarif, beginn, geburtsdatum = '', antwort1a = null, kreuze1a = [], antworten = {}, groesse = '', gewicht = '',
} = {}) {
  // Text 8 und die Zeile mit Healio als Makler stehen vorn: Kopie und Druck
  // nennen so den Erklärenden (Textform, § 62 VVG, § 126b BGB).
  const zeilen = [
    TEXT_8_AUSWAHL,
    WEG_A_TRANSPARENZ,
    '',
    'Ambulante Zusatzversicherung der SDK',
    `Stufe: ${tarif ? `${tarif.code} (${tarif.refund} Erstattung)` : ''}`,
    `Beginn: ${beginn ? beginn.label : ''}`,
    `Geburtsdatum: ${geburtsdatumAnzeige(geburtsdatum)}`,
    `Frage 1a: ${antwort1aText({ antwort1a, kreuze1a }, { ohneTrennzeichen: true })}`,
    ...FRAGEN_1B_1K.map((frage) => `Frage ${frage.id}: ${antworten[frage.id] === 'ja' ? 'Ja' : 'Nein'}`),
    `Größe: ${groesseAnzeige(groesse)} cm`,
    `Gewicht: ${gewichtAnzeige(gewicht)} kg`,
  ];
  return zeilen.join('\n');
}

// ---------------------------------------------------------------------------
// Geburtsdatum (Schritt 1)
// ---------------------------------------------------------------------------

// Formatiert die Eingabe beim Tippen zu TT.MM.JJJJ. Am iPhone hat die
// Zifferntastatur keinen Punkt: Bei reiner Zifferneingabe setzt die Strecke
// die Punkte selbst, und zwar erst, wenn die nächste Ziffer folgt, damit die
// Löschtaste nie an einem Punkt hängen bleibt. Stehen schon Trennzeichen da
// (Punkt, Strich oder Schrägstrich), bleiben sie stehen: Jeder Teil wird nur
// auf seine Höchstlänge gekürzt, und keine Ziffer wandert über einen
// vorhandenen Punkt. Nur was hinter dem letzten Teil zu viel ist, rückt in den
// nächsten Teil (05.031 wird 05.03.1). JJJJ-MM-TT aus dem automatischen
// Ausfüllen wird umgestellt. Die Seite ruft das nur auf, solange die
// Schreibmarke am Ende steht; Korrekturen in der Mitte bleiben unverändert.
const DATUM_LAENGEN = [2, 2, 4];

function zifferTeile(ziffern, start = 0) {
  const teile = [];
  let rest = ziffern;
  for (let stelle = start; stelle < DATUM_LAENGEN.length && rest.length > 0; stelle += 1) {
    teile.push(rest.slice(0, DATUM_LAENGEN[stelle]));
    rest = rest.slice(DATUM_LAENGEN[stelle]);
  }
  return teile;
}

export function formatiereGeburtsdatum(eingabe) {
  const text = String(eingabe ?? '').trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text);
  if (iso) return `${iso[3]}.${iso[2]}.${iso[1]}`;

  if (!/[./-]/.test(text)) return zifferTeile(text.replace(/\D/g, '')).join('.');

  const roh = text.split(/[./-]/).map((teil) => teil.replace(/\D/g, '')).slice(0, DATUM_LAENGEN.length);
  const letzte = roh.length - 1;
  const teile = [];
  roh.forEach((teil, stelle) => {
    if (stelle < letzte) teile.push(teil.slice(0, DATUM_LAENGEN[stelle]));
    else teile.push(...(teil.length > 0 ? zifferTeile(teil, stelle) : ['']));
  });
  return teile.join('.');
}

// Nach dem Verlassen des Feldes: Tag und Monat zweistellig (5.3.1990 wird
// 05.03.1990). Ist das Datum so nicht lesbar, ergeben aber genau acht Ziffern
// ein Datum (etwa nach dem Löschen eines Punktes), gilt dieses.
// Zweistelliges Jahr (05.03.85 oder 050385) zu vierstellig ergänzen. Online
// schließen nur Erwachsene ab, deshalb gilt 00 bis (heutiges Jahr minus 18)
// als 20xx und 20 bis 99 als 19xx. Dazwischen (z. B. „19“, oft der Anfang von
// 19xx) bleibt die Eingabe stehen.
export function jahrErgaenzen(text, heute = new Date()) {
  const wert = String(text ?? '').trim();
  const treffer = /^(\d{1,2})\.(\d{1,2})\.(\d{2})$/.exec(wert) || /^(\d{2})(\d{2})(\d{2})$/.exec(wert);
  if (!treffer) return wert;
  const kurz = Number(treffer[3]);
  const grenze = (heute.getFullYear() - 18) % 100;
  if (kurz > grenze && kurz < 20) return wert;
  const jahr = kurz <= grenze ? 2000 + kurz : 1900 + kurz;
  return `${zweistellig(Number(treffer[1]))}.${zweistellig(Number(treffer[2]))}.${jahr}`;
}

export function geburtsdatumEingabeBereinigt(text, heute = new Date()) {
  const wert = jahrErgaenzen(text, heute);
  const ziffern = wert.replace(/\D/g, '');
  const datum = parseGeburtsdatum(wert, heute) || (ziffern.length === 8 ? parseGeburtsdatum(ziffern, heute) : null);
  return datum ? `${zweistellig(datum.tag)}.${zweistellig(datum.monat)}.${datum.jahr}` : wert;
}

// Erwartet TT.MM.JJJJ (auch T.M.JJJJ), TTMMJJJJ oder JJJJ-MM-TT.
// Liefert { tag, monat, jahr } oder null.
export function parseGeburtsdatum(text, heute = new Date()) {
  const wert = String(text ?? '').trim();
  const treffer = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(wert)
    || /^(\d{2})(\d{2})(\d{4})$/.exec(wert);
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(wert);
  let tag;
  let monat;
  let jahr;
  if (treffer) [tag, monat, jahr] = [treffer[1], treffer[2], treffer[3]].map(Number);
  else if (iso) [jahr, monat, tag] = [iso[1], iso[2], iso[3]].map(Number);
  else return null;
  const datum = new Date(jahr, monat - 1, tag);
  const echt = datum.getFullYear() === jahr && datum.getMonth() === monat - 1 && datum.getDate() === tag;
  if (!echt || jahr < 1900 || datum.getTime() > heute.getTime()) return null;
  return { tag, monat, jahr };
}

export const FEHLER_GEBURTSDATUM_FEHLT = 'Bitte gib dein Geburtsdatum ein, zum Beispiel 05.03.1985.';
export const FEHLER_GEBURTSDATUM_PRUEFEN = 'Bitte prüfe dein Geburtsdatum.';

// Prüfung des Geburtsdatums in Schritt 1. Liefert den Fehlertext oder null.
// Leer oder unvollständig: Bitte mit Beispiel eingeben. Vollständig getippt,
// aber kein echtes Datum (31.02., in der Zukunft, vor 1900): Bitte prüfen.
// Ob jemand heute volljährig ist, prüft die Seite getrennt (istVolljaehrigAm),
// dann steht dort der Hinweis für Minderjährige statt eines Fehlers.
export function geburtsdatumFehler(text, heute = new Date()) {
  const wert = String(text ?? '').trim();
  if (parseGeburtsdatum(wert, heute)) return null;
  const vollstaendig = /^\d{1,2}\.\d{1,2}\.\d{4}$/.test(wert) || /^\d{8}$/.test(wert) || /^\d{4}-\d{2}-\d{2}$/.test(wert);
  return vollstaendig ? FEHLER_GEBURTSDATUM_PRUEFEN : FEHLER_GEBURTSDATUM_FEHLT;
}

// „05.03.1985“ für Übersicht, Prüfseite und Übertragen; leer, solange das
// Datum nicht lesbar ist.
export function geburtsdatumAnzeige(text, heute = new Date()) {
  const datum = parseGeburtsdatum(text, heute);
  return datum ? `${zweistellig(datum.tag)}.${zweistellig(datum.monat)}.${datum.jahr}` : '';
}

// ---------------------------------------------------------------------------
// Eingaben im Healio-Formular (Weg B)
// ---------------------------------------------------------------------------

export const istPlz = (text) => /^\d{5}$/.test(String(text ?? '').trim());

export const istEmail = (text) => /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/.test(String(text ?? '').trim());

export function istTelefon(text) {
  const wert = String(text ?? '').trim();
  if (!/^[0-9+()/\s-]+$/.test(wert)) return false;
  const ziffern = wert.replace(/\D/g, '');
  return ziffern.length >= 6 && ziffern.length <= 16;
}

export const istStrasseMitNummer = (text) => {
  const wert = String(text ?? '').trim();
  return wert.length >= 4 && /[A-Za-zÄÖÜäöüß]/.test(wert) && /\d/.test(wert);
};

export const istName = (text) => String(text ?? '').trim().length >= 2;

// Anrede wie im Konzept (Schritt 5): Frau, Herr, Divers, ohne Vorauswahl.
export const ANREDEN = [
  { id: 'frau', label: 'Frau' },
  { id: 'herr', label: 'Herr' },
  { id: 'divers', label: 'Divers' },
];

// Zahlweise laut SDK-Antrag: monatlich oder jährlich mit derzeit 1 % Skonto.
export const ZAHLWEISEN = [
  { id: 'monatlich', label: 'Monatlich' },
  { id: 'jaehrlich', label: 'Jährlich, derzeit 1 % Skonto laut SDK' },
];
