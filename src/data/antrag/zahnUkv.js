// Produktdefinition der Antragsmaske Zahn UKV: ZahnPRIVAT 75, 90, 100
// (Union Krankenversicherung AG), 12.11.2026. Zweites Zahn-Produkt neben der
// Bayerischen, eigener Schalter HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV (aus).
//
// Quelle: Erfassung der Level-Nine-Strecke (mandant vmk) vom 12.11.2026,
// LEVELNINE-ERFASSUNG.md Abschnitt 3, ukv-zahn.json, beitraege-ukv-zahn.json.
// - 3 Zahnfragen plus Angaben zur Versicherung im Wortlaut des Originals.
// - Fehlende Zähne: Zuschlag je Zahn und Monat (100er 10,90 EUR, 90er
//   9,00 EUR, 75er 6,10 EUR); mehr als 3 oder laufende bzw. empfohlene
//   Behandlung: online keine Aufnahme; Parodontose „Ja“: Ausschluss laut Fragetext.
// - Online nur Erwachsene ab 18 für sich selbst (16 und 17 im Original nicht
//   möglich, Kinder nur mit anderem Versicherungsnehmer).
// - Kein Unterlagen-Schritt im Original; die Bedingungen sind nur genannt.
// Achtung (Bericht Abschnitt 3): Die UKV-Strecke ist eine Maklerstrecke; das
// Original setzt verdeckt Makler-Erklärungen (verdeckt unten). Frank klärt
// mit Fonds Finanz/UKV, bevor dieses Produkt eingeschaltet wird.

import { HINWEIS_MINDERJAEHRIG } from '../sdkAmbulantAntrag.js';
import {
  ERKLAERUNG_KURZ, KNOPF_BEANTRAGEN, TEIL_3_TITEL, TEXT_10_VOLLMACHT, TEXT_12_KNOPF, TEXT_13_FRAGE, TEXT_6_GESUNDHEIT,
  TEXT_6_STANDORT_PLATZHALTER, TEXT_9_HAKEN, TEXT_9_HINWEIS,
} from '../sdkAmbulantAntragTexte.js';
import { ZAHN_KURZ_GESUNDHEIT, ohneGroesseGewicht } from './zahn.js';
import { TEXT_6_STANDORT } from '../sdkAmbulantAntragSdkTexte.js';
import { DATENSCHUTZ_LINK } from './sdkStrecke.js';
import { bedingungErfuellt } from '../../lib/antragsmaske/regeln.js';
import {
  LEVELNINE, antwortenAusStrecke, feldAus, fragenZuordnung, frageAus,
} from './levelnine.js';

const SCHRITTE = LEVELNINE.ukvZahn.schritte;
const f = (schritt, id) => feldAus(SCHRITTE, schritt, id);
const UKV = 'Union Krankenversicherung AG';
// Paket C (C13, 20.11.2026): Der Einreicher vergleicht jetzt auch bei der UKV Grundbeitrag und Preis nach den Zahnfragen
// (einreicher/preisabgleich.mjs pruefeUkvRisiko) und hält bei jeder Abweichung an. Darum steht der Satz zum Halt wieder da (wie Paket A).
const VORBEHALT_UKV = 'Dein Beitrag gilt vorbehaltlich der Annahme durch die UKV. Zeigt die UKV beim Einreichen einen anderen Beitrag, reicht Healio nichts ein und meldet sich bei dir.';

// Paket C (C11, Ergänzung 1.13, 20.11.2026): Fälle, deren Ergebnis bei der UKV online nie gesehen wurde. false heißt: online nicht,
// Telefon oder Termin. Nach der Messung im Prüfschritt (Teil 6 Nr. 1) je Fall eine Zeile auf true stellen, dann gilt die Regel des
// Originals (Zuschlag laut Papierantrag 5084 bzw. keine Wirkung). Weiche und Einzelmaske lesen dieselben Werte.
//   z90DreiZaehne  ZahnPRIVAT 90 mit 3 fehlenden Zähnen (nur Papierantrag S. 12, TABELLE Nr. 4)
//   z75ZweiZaehne  ZahnPRIVAT 75 mit 2 fehlenden Zähnen (nur Papierantrag S. 12, TABELLE Nr. 6)
//   kfo1819        ZahnPRIVAT 90 und 100 bei Eintrittsalter 18 und 19 (KFO-Frage 6.2.4 online nie geprüft, TABELLE Nr. 25)
//   freiwilligGkv  „freiwillig gesetzlich versichert in deutscher GKV“ (online nie gefahren, TABELLE Nr. 14)
//   alter71bis80   Eintrittsalter 71 bis 80 (Preis gesehen, Annahme nie, raender A11/B10)
export const UKV_BELEGT = Object.freeze({
  z90DreiZaehne: false,
  z75ZweiZaehne: false,
  kfo1819: false,
  freiwilligGkv: false,
  alter71bis80: false,
});

const LEVEL_NINE_SDK = 'in die Online-Antragsstrecke der SDK, die die cpit comparit GmbH (Level Nine) für die SDK betreibt';
const LEVEL_NINE_UKV = 'in die Online-Antragsstrecke der UKV, die die cpit comparit GmbH (Level Nine) für die UKV betreibt';

// Healio-Texte der Prüfseite mit der UKV statt der SDK (Name ersetzt, sonst gleich).
function fuerUkv(text) {
  const neu = text
    .replace('die ambulante Zusatzversicherung bei der Süddeutschen Krankenversicherung a. G. (SDK)', `die Zahnzusatzversicherung ZahnPRIVAT bei der ${UKV} (UKV)`)
    // Die UKV-Strecke betreibt ebenfalls Level Nine: Empfänger in derselben Form wie bei der SDK (19.11.2026).
    .replace(LEVEL_NINE_SDK, LEVEL_NINE_UKV)
    .replace(/Online-Antragsstrecke der SDK/g, 'Online-Antragsstrecke der UKV')
    .replace(/Post der SDK/g, 'Post der UKV')
    .replace(/bei der SDK/g, 'bei der UKV')
    .replace(/an die SDK/g, 'an die UKV')
    .replace(/Stellt die SDK/g, 'Stellt die UKV')
    .replace(/Nennt die SDK/g, 'Nennt die UKV');
  if (/SDK|Süddeutsche|Level Nine|cpit/.test(neu.replace(LEVEL_NINE_UKV, ''))) throw new Error(`zahnUkv.js: SDK-Rest im Text: ${neu.slice(0, 80)}`);
  return neu;
}

const TARIFE = [
  { id: 'Z100', original: 'UKVZahnPRIVAT100#', schluessel: 'UKVZahnPRIVAT100', name: 'ZahnPRIVAT 100' },
  { id: 'Z90', original: 'UKVZahnPRIVAT90#', schluessel: 'UKVZahnPRIVAT90', name: 'ZahnPRIVAT 90' },
  { id: 'Z75', original: 'UKVZahnPRIVAT75#', schluessel: 'UKVZahnPRIVAT75', name: 'ZahnPRIVAT 75' },
];
const ZUSCHLAG_JE_ZAHN = { Z100: 10.9, Z90: 9.0, Z75: 6.1 };

export const UKV_KEINE_AUFNAHME = 'Mit dieser Antwort ist der Tarif online leider nicht möglich. Lass uns zusammen schauen, welcher Schutz für dich passt.';
const keineAufnahme = [{ art: 'keineAufnahme', text: UKV_KEINE_AUFNAHME, auswege: ['telefon', 'termin'] }];
// Nicht belegte Fälle (UKV_BELEGT): neutral, ohne Prüfstatus (Ergänzung 1.22). Gleiche Folge im Code wie keineAufnahme.
export const UKV_GEMEINSAM = 'Mit dieser Antwort nehmen wir deinen Antrag gemeinsam mit dir auf.';
export const UKV_ALTER_GEMEINSAM = 'In deinem Alter nehmen wir den Antrag gemeinsam mit dir auf.';
export const UKV_VN_GEMEINSAM = 'Ist jemand anderes Versicherungsnehmer, nehmen wir den Antrag gemeinsam mit dir auf.';
const offen = (fall, extra = {}) => ({
  art: 'keineAufnahme', text: UKV_GEMEINSAM, auswege: ['telefon', 'termin'], offen: fall, ...extra,
});

// C9 (Ergänzung 1.11): Im Original sichtbar und mit Ja vorgewählt, Nein ist dort nicht nutzbar (TABELLE Nr. 30, netz/lauf1
// 03-versicherungsnehmer.txt). Bei Nein nehmen wir den Antrag gemeinsam auf. Die Folgefelder für einen anderen Versicherungsnehmer
// entfallen; policyHolderBirthday setzt der Server selbst (verdeckt unten, vomServer).
const vn = { ...frageAus(f(3, 'policyHolderIsEqualInsuredPerson'), { schritt: 3 }), titel: 'Versicherungsnehmer', kurz: 'Versicherungsnehmer' };
delete vn.folge;
vn.wirkung = { nein: [{ art: 'keineAufnahme', text: UKV_VN_GEMEINSAM, auswege: ['telefon', 'termin'] }] };

const tf0021 = frageAus(f(4, 'TF0021'), { schritt: 4 });
tf0021.titel = 'Fehlende Zähne';
tf0021.kurz = 'Fehlende Zähne';
// C11: 90er mit 3 und 75er mit 2 Zähnen sind online nie gesehen (UKV_BELEGT), bis dahin je Tarif gesperrt.
const OFFEN_ZAEHNE = { 3: UKV_BELEGT.z90DreiZaehne ? [] : ['Z90'], 2: UKV_BELEGT.z75ZweiZaehne ? [] : ['Z75'] };
tf0021.optionen = tf0021.optionen.map((option) => {
  if (option.id === '>3') return { ...option, wirkung: keineAufnahme };
  const anzahl = Number(option.id);
  if (!(anzahl > 0)) return option;
  const gesperrt = OFFEN_ZAEHNE[anzahl] || [];
  return {
    ...option,
    wirkung: [
      { art: 'zuschlag', euroJeTarif: ZUSCHLAG_JE_ZAHN, anzahl, grund: `${anzahl} fehlende${anzahl === 1 ? 'r Zahn' : ' Zähne'}` },
      ...(gesperrt.length ? [offen(anzahl === 3 ? 'z90DreiZaehne' : 'z75ZweiZaehne', { tarif: gesperrt })] : []),
    ],
  };
});

const gf0073 = { ...frageAus(f(4, 'GF0073'), { schritt: 4 }), titel: 'Laufende oder empfohlene Behandlung', kurz: 'Laufende oder empfohlene Behandlung', wirkung: { ja: keineAufnahme } };
const gf0074 = {
  ...frageAus(f(4, 'GF0074'), { schritt: 4 }),
  titel: 'Parodontose',
  kurz: 'Parodontose',
  wirkung: { ja: [{ art: 'ausschluss', text: 'Für Parodontosebehandlungen besteht kein Versicherungsschutz.' }] },
  // 2.9 Nr. 14: Die Wirkung „ausschluss“ zeigt die Maske sonst nirgends.
  hinweisNachJa: 'Für Parodontosebehandlungen hast du bei der UKV keinen Versicherungsschutz. Dein Beitrag ändert sich dadurch nicht.',
};
// C9: Im Original sichtbar, eine Antwort (TABELLE Nr. 29), Pflicht. Keine Vorauswahl.
const vp0004 = { ...frageAus(f(4, 'VP0004'), { schritt: 4 }), titel: 'Beziehung zum Versicherungsnehmer', kurz: 'Beziehung zum Versicherungsnehmer' };
const af0010 = { ...frageAus(f(4, 'AF0010'), { schritt: 4 }), titel: 'Andere Zahnzusatzversicherung', kurz: 'Andere Zahnzusatzversicherung' };
const afAd0001 = { ...frageAus(f(4, 'AF_AD_0001'), { schritt: 4 }), titel: 'Einzelfallentbindung', kurz: 'Einzelfallentbindung' };
// C7 (Ergänzung 1.9): „private Krankenversicherung/Heilfürsorge“ lehnt das Original ab (netz lauf4 wh3, „Nicht in der GK
// versichert#…“). „freiwillig gesetzlich versichert“ ist online nie gefahren (UKV_BELEGT.freiwilligGkv).
const afAd0005 = { ...frageAus(f(4, 'AF_AD_0005'), { schritt: 4 }), titel: 'Krankenversicherung', kurz: 'Krankenversicherung' };
afAd0005.optionen = afAd0005.optionen.map((option) => {
  if (option.id === 'private Krankenversicherung/Heilfürsorge') return { ...option, wirkung: keineAufnahme };
  if (option.id === 'freiwillig gesetzlich versichert in deutscher GKV' && !UKV_BELEGT.freiwilligGkv) return { ...option, wirkung: [offen('freiwilligGkv')] };
  return option;
});
// Reihenfolge des Originals: Schritt 3 Versicherungsnehmer, Schritt 4 TF0021, GF0073, GF0074, VP0004, AF0010, AF_AD_0001, AF_AD_0005.
const FRAGEN = [vn, tf0021, gf0073, gf0074, vp0004, af0010, afAd0001, afAd0005];
// Keine Gesundheitsangaben (Ergänzung 1.11: sensibel je Feld, nicht pauschal für Schritt 4).
export const UKV_NICHT_SENSIBEL = Object.freeze(['policyHolderIsEqualInsuredPerson', 'VP0004', 'AF_AD_0001', 'AF_AD_0005']);

const GRUPPEN = Object.entries(LEVELNINE.beitraege.ukvZahn).map(([alter, zeile]) => ({
  von: Number(alter), bis: Number(alter), preise: Object.fromEntries(TARIFE.map((tarif) => [tarif.id, zeile[tarif.schluessel]])),
})).sort((a, b) => a.von - b.von);

// Unterlagen der UKV für ZahnPRIVAT 75, 90 und 100, erfasst 12.11.2026 über
// …/vmk/calculate/tariffs/additional/UKVZahnPRIVAT<n>%23/documents. Name nach
// dem Kopf des jeweiligen PDF. Paket C (C10, Ergänzung 1.12, Voreinstellung
// Teil 5 Nr. 8): Franks Vorgabe vom 12.11. bleibt (ohne leeren Papierantrag
// 5084, je Dokument die neueste Fassung). 15605 liefert das Original nur bei
// ZahnPRIVAT 75 und 100 (TABELLE Nr. 37), also 9 bei 100 und 75, 8 bei 90.
export const UKV_UNTERLAGEN_NUR = Object.freeze({ 15605: ['Z100', 'Z75'] });
export const ukvUnterlagenFuer = (tarif) => UKV_UNTERLAGEN.filter(([id]) => !UKV_UNTERLAGEN_NUR[id] || UKV_UNTERLAGEN_NUR[id].includes(tarif));
export const UKV_UNTERLAGEN = [
  ['13019', 'Teil I AVB/ZV: Allgemeine Versicherungsbedingungen, Stand 02.2023'],
  ['15523', 'Teil II Tarife ZahnPRIVAT 100, 90 und 75, Stand 01.08.2024'],
  ['15524', 'Informationsblatt zu Versicherungsprodukten ZahnPRIVAT, Stand 06.2024'],
  ['15248', 'Weitere Vertragsgrundlagen und Zusatzerklärungen, Stand 06.2025'],
  ['15124', 'Mitteilung nach § 19 Absatz 5 VVG, Stand 01.2021'],
  ['15627', 'Datenschutzinformationen nach Art. 12 ff. DSGVO, Stand 04.2025'],
  ['15546', 'Einwilligung zum Datenschutz und Schweigepflichtentbindung, Stand 06.2026'],
  ['15605', 'Einwilligung zum Datenschutz für den Online-Abschluss, Stand 06.2026'],
  ['15548', 'Informationen für Versicherungsvertreiber (POG) ZahnPRIVAT, Stand 01.08.2024'],
];

const zahnUkv = {
  sparte: 'zahn',
  produkt: 'zahn-ukv',
  pfad: 'zahn-ukv',
  schalter: 'ukvZahn',
  bereit: true,
  stand: '2026-11-20',
  // 20.11.2026 (Nachbesserung Ebene 2): Vorbehalt ohne die Zusage „fragt Healio dich vorher“, Fassung 2026-11-20b.
  // 20.11.2026 (Paket C, C7 bis C13): UKV 1 zu 1 (privat lehnt ab, Mindestbeitrag, Beginn ohne Rückwirkung, offene Fälle,
  // Versicherungsnehmer und Beziehung sichtbar, Unterlagen je Tarif) und Vorbehalt wieder mit dem Satz zum Halt (Preisabgleich C13).
  // Der Dienst nimmt 2026-11-20b weiter an, 2026-11-12 nicht mehr (Ergänzung 1.20: C7 und C9 ändern Regeln).
  // 20.11.2026 (Paket C, C6): Text 6 und Kurzfassung ohne „Größe und Gewicht“, Satz nach GF0074 „Ja“, Unterlagen „Von Healio“ nur mit
  // Datei. Auf dem Weg über die Weiche zusätzlich die Texte aus zahnWeiche.js. Der Dienst nimmt 2026-11-20c und 2026-11-20b weiter an.
  textfassung: '2026-11-20d-ukv-zahn-online',
  quelle: 'Online-Strecke der UKV (Level Nine, mandant vmk), erfasst 12.11.2026',
  versicherer: {
    id: 'ukv', name: UKV, kurz: 'UKV', beiDer: 'der UKV',
  },
  kennzeile: 'Zahnzusatzschutz der UKV',
  seitentitel: 'Antrag Zahnzusatzschutz UKV | Healio',
  beschreibung: 'Dein Antrag auf den Zahnzusatzschutz ZahnPRIVAT.',
  ablauf: [
    { id: 'tarif', titel: 'Tarif und Beitrag' },
    { id: 'person', titel: 'Deine Daten' },
    { id: 'hinweis', titel: 'Zahnfragen' },
    { id: 'fragen', titel: 'Zahnfragen' },
    { id: 'beitrag', titel: 'Dein Beitrag' },
    { id: 'erkl:auftrag', titel: 'Beratung und Auftrag' },
    { id: 'anschrift', titel: 'Anschrift und Kontakt' },
    { id: 'zahlung', titel: 'Zahlung' },
    { id: 'erkl:unterlagen', titel: 'Unterlagen' },
    { id: 'zusammenfassung', titel: 'Zusammenfassung' },
  ],

  tarife: TARIFE.map((tarif) => ({
    id: tarif.id, name: tarif.name, original: { tarif: tarif.original }, details: LEVELNINE.ukvZahn.leistungstexte[tarif.original] || null,
  })),
  tarifHinweis: 'Beitrag im Monat, noch ohne Zuschlag aus den Zahnfragen.',
  // 1.19 (Voreinstellung Teil 5 Nr. 9): kein rückwirkender Beginn. Das Original schlägt den Ersten des Folgemonats vor und rechnet
  // Daten in der Vergangenheit nur mit Hinweis (raender 5.2); laufenderMonatBisTag entfällt. Monatserste Folgemonat bis 6 Monate.
  beginn: {
    art: 'monatsErster', abMonat: 1, bisMonat: 6,
  },
  alter: {
    min: 18,
    max: 80,
    maxZaehlung: 'kalenderjahr',
    stichtag: 'heute',
    hinweisZuJung: HINWEIS_MINDERJAEHRIG,
    hinweisZuAlt: 'Ab 81 Jahren nehmen wir den Antrag gemeinsam mit dir auf.',
    // C11 (Ergänzung 1.13): offene Altersfälle nach Eintrittsalter (Kalenderjahr wie die Beitragstabelle).
    sperren: [
      ...(UKV_BELEGT.kfo1819 ? [] : [{
        von: 18, bis: 19, tarif: ['Z100', 'Z90'], text: UKV_ALTER_GEMEINSAM, offen: 'kfo1819',
      }]),
      ...(UKV_BELEGT.alter71bis80 ? [] : [{
        von: 71, bis: 80, text: UKV_ALTER_GEMEINSAM, offen: 'alter71bis80',
      }]),
    ],
    hinweisKeinTarif: UKV_ALTER_GEMEINSAM,
  },
  // C8 (Ergänzung 1.10): Das Original zeigt nur Tarife mit Grundbeitrag über 5,00 Euro (minPrice 5.0, fee > minPrice), etwa
  // ZahnPRIVAT 75 zu 0,99 Euro bei Eintrittsalter 18 und 19 nicht (regeln.js tarifAngeboten).
  beitrag: {
    alter: 'kalenderjahr', gruppen: GRUPPEN, vorbehalt: VORBEHALT_UKV, mindestGrundbeitrag: 5,
  },

  gesundheit: {
    titel: 'Zahnfragen',
    vorspann: {
      vorTitel: 'Vor den Zahnfragen',
      titel: 'Vorvertragliche Anzeigepflicht',
      absaetze: [f(3, 'AT_AD_0001').wortlaut],
    },
    fragen: FRAGEN,
    // Vorauswahl wie im Original (C9): „Ist die versicherte Person auch der Inhaber der Versicherung“ steht dort auf Ja.
    vorgaben: { policyHolderIsEqualInsuredPerson: 'ja' },
  },

  person: {
    anreden: [{ id: 'herr', label: 'Männlich', original: 'MALE' }, { id: 'frau', label: 'Weiblich', original: 'FEMALE' }],
    anredeLegend: 'Geschlecht',
    felder: [
      {
        id: 'vorname', label: 'Vorname', typ: 'name', original: 'firstName', autoComplete: 'given-name', fehlerLeer: 'Bitte gib deinen Vornamen ein.',
      },
      {
        id: 'nachname', label: 'Nachname', typ: 'name', original: 'lastName', autoComplete: 'family-name', fehlerLeer: 'Bitte gib deinen Nachnamen ein.',
      },
    ],
    anschrift: [
      {
        id: 'strasse', label: 'Straße Hausnr.', typ: 'strasse', original: 'orderStreet', autoComplete: 'address-line1', fehlerLeer: 'Bitte gib Straße und Hausnummer ein.',
      },
      {
        id: 'plz', label: 'PLZ', typ: 'plz', original: 'orderZip', autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 5, fehlerLeer: 'Bitte gib eine fünfstellige PLZ ein.',
      },
      { id: 'ort', label: 'Ort', typ: 'name', original: 'orderCity', autoComplete: 'address-level2', fehlerLeer: 'Bitte gib deinen Wohnort ein.' },
      {
        id: 'email', label: 'E-Mail', typ: 'email', type: 'email', original: 'eMail', autoComplete: 'email', inputMode: 'email', fehlerLeer: 'Bitte gib deine E-Mail-Adresse ein.',
      },
      {
        id: 'telefon', label: 'Telefon', hinweis: 'Freiwillig, für Rückfragen von Healio.', typ: 'telefon', type: 'tel', autoComplete: 'tel', inputMode: 'tel', pflicht: false, fehlerLeer: 'Bitte gib eine Telefonnummer ein.',
      },
    ],
    bestaetigungen: [],
  },

  zahlung: {
    zahlweisen: [{ id: 'monatlich', label: 'Monatlich' }],
    kontoinhaberFrage: TEXT_13_FRAGE,
    kontoinhaberHinweis: f(5, 'orderIbanName')?.hilfetext || null,
    kontoAndere: {
      titel: 'Das klären wir am besten kurz zusammen.',
      text: 'Gehört das Konto jemand anderem, muss diese Person das Lastschriftmandat selbst erteilen. Vereinbare einfach einen Termin, dann machen wir den Rest gemeinsam.',
    },
    sepa: {
      karte: 'SEPA-Lastschriftmandat', titel: null, absaetze: [], angaben: [], key: 'sepaMandatConfirmation', original: 'sepaMandatConfirmation', haken: f(5, 'sepaMandatConfirmation').wortlaut,
    },
  },

  erklaerungen: [
    {
      id: 'auftrag',
      teil: 'Beratung und Auftrag',
      eintraege: [
        { art: 'hinweis', text: 'Gut zu wissen: In diesem Antrag geht es nur um die Zahntarife ZahnPRIVAT 75, 90 und 100 der UKV. Grundlage sind die Bedingungen und Beiträge der UKV. Andere Versicherer vergleichen wir hier nicht.' },
        {
          art: 'haken', key: 'verzicht', titel: 'Verzicht auf Beratung', warnung: TEXT_9_HINWEIS, terminLink: true, haken: TEXT_9_HAKEN, pflicht: true,
        },
        {
          art: 'haken', key: 'vollmacht', titel: 'Auftrag und Vollmacht', kurz: fuerUkv(ERKLAERUNG_KURZ.vollmacht), volltext: [['p', fuerUkv(TEXT_10_VOLLMACHT)]], dokument: 'Maklervertrag', haken: 'Ich erteile Healio diesen Auftrag und diese Vollmacht.', pflicht: true,
        },
        {
          art: 'haken',
          key: 'gesundheitsdaten',
          titel: 'Gesundheitsangaben bei Healio',
          kurz: ZAHN_KURZ_GESUNDHEIT('die UKV'),
          volltext: [['p', ohneGroesseGewicht(fuerUkv(TEXT_6_GESUNDHEIT.map((stueck) => (stueck === TEXT_6_STANDORT_PLATZHALTER ? TEXT_6_STANDORT : stueck)).join('')))]],
          links: [DATENSCHUTZ_LINK],
          haken: 'Ich bin einverstanden.',
          pflicht: true,
        },
      ],
    },
    {
      id: 'unterlagen',
      teil: 'Unterlagen',
      eintraege: [
        {
          // Die Strecke selbst hat keinen Unterlagen-Schritt. Die PDF holt der
          // Antragsdienst beim Versicherer (Level Nine, Mandant vmk; Franks
          // Vorgabe 12.11.2026: Vertragsunterlagen und Beilagen ohne
          // Papierantrag, je Dokument die neueste Fassung). dienstId = documentId
          // der Strecke, Download über /antrag/api/unterlagen/datei.
          art: 'unterlagen',
          key: 'unterlagenUkv',
          titel: 'Deine Unterlagen',
          dienstProdukt: 'ukv-zahn',
          gruppen: [
            {
              von: 'Von der UKV',
              eintraege: UKV_UNTERLAGEN.map(([dienstId, name]) => ({
                name, dateien: [{ label: name, dienstId }], ...(UKV_UNTERLAGEN_NUR[dienstId] ? { bedingung: { tarif: [...UKV_UNTERLAGEN_NUR[dienstId]] } } : {}),
              })),
            },
            // Paket C (2.9 Nr. 10): wie Paket 2 bei der Bayerischen nur Unterlagen mit Datei; die Healio-Erklärungen stehen in „Mein Antrag“.
            { von: 'Von Healio', eintraege: [{ name: 'Erstinformation', dateien: [{ label: 'Erstinformation', href: '/erstinformation' }] }] },
          ],
          pflicht: false,
        },
      ],
    },
  ],

  zusammenfassung: { titel: TEIL_3_TITEL },
  absenden: { satz: fuerUkv(TEXT_12_KNOPF), vorbehalt: VORBEHALT_UKV, knopf: KNOPF_BEANTRAGEN },
  // C15 (Ergänzung 1.17): Was die Seite oder der Server von sich aus setzt, steht hier nur zur Dokumentation (vomServer: true). Der
  // Einreicher schreibt keins dieser Felder und vergleicht sie nicht (spickzettel.mjs). Frank klärt sie mit der UKV.
  // Belege: netz-beobachtung.md „Was die Strecke ohne Zutun des Kunden mitschickt“, TABELLE Nr. 32 bis 35.
  verdeckt: [
    { schritt: 3, feld: 'agentConfirmation', wert: 'true', vomServer: true, hinweis: 'Maklerbestätigung, setzt die Seite verdeckt (Frank klärt mit Fonds Finanz/UKV)' },
    { schritt: 3, feld: 'policyHolderBirthday', wert: '1989-07-01', vomServer: true, hinweis: 'Platzhalter des Servers für das Geburtsdatum des Versicherungsnehmers, auch bei anderem Jahrgang' },
    { schritt: 3, feld: 'occupationDescription', wert: 'Kaufmann/-frau Bank', vomServer: true, hinweis: 'Platzhalter des Servers für den Beruf' },
    { schritt: 3, feld: 'occupationStatus', wert: 'A', vomServer: true, hinweis: 'Platzhalter des Servers' },
    { schritt: 1, feld: 'maritalStatus', wert: '1', vomServer: true, hinweis: 'fest von der Seite' },
    { schritt: 1, feld: 'occupationGroup', wert: '1', vomServer: true, hinweis: 'fest von der Seite' },
    { schritt: 3, feld: 'confirmDataProtection', wert: 'true', vomServer: true, hinweis: 'setzt die Seite verdeckt' },
    { schritt: 4, feld: 'AF_AD_0002', wert: 'vor Unterschrift des Antrags gewünscht', vomServer: true, hinweis: 'verdeckt im Original' },
    { schritt: 4, feld: 'AF_AD_0003', wert: 'wird vom Kunden gewünscht', vomServer: true, hinweis: 'verdeckt im Original' },
    { schritt: 4, feld: 'AF_AD_0004', wert: 'true', vomServer: true, hinweis: 'Erklärung des Maklers, verdeckt im Original (Frank klären)' },
    { schritt: 4, feld: 'homecareLevel5Inpatient', wert: '1500', vomServer: true, hinweis: 'fester Wert der Seite ohne Bezug zum Zahntarif' },
    { schritt: 4, feld: 'daySicknessDailyAllowance1', wert: '43', vomServer: true, hinweis: 'fester Wert der Seite ohne Bezug zum Zahntarif' },
    { schritt: 4, feld: 'rateSicknessDailyAllowance1', wert: '30', vomServer: true, hinweis: 'fester Wert der Seite ohne Bezug zum Zahntarif' },
  ],

  gesundheitFuerVertrag: (antworten = {}, { tarif } = {}) => ({
    fragebogen: 'UKV_ZAHN', antworten: fragenZuordnung(FRAGEN, antworten, bedingungErfuellt, { antworten, tarif }),
  }),
  // Telefonweg: Format der Strecke oder einfache Form des Dienstes
  // ({ fehlendeZaehne, behandlung, parodontose, pkvZahn }, Versicherung aus angaben.versicherung).
  gesundheitAusVertrag: (gesundheit = {}, { angaben } = {}) => {
    const g = gesundheit || {};
    if (Array.isArray(g.antworten)) return antwortenAusStrecke(FRAGEN, g.antworten);
    const jn = (wert) => (wert === true || wert === 'true' || wert === 'ja' ? 'true' : wert === false || wert === 'false' || wert === 'nein' ? 'false' : undefined);
    return antwortenAusStrecke(FRAGEN, {
      TF0021: g.fehlendeZaehne !== undefined ? String(g.fehlendeZaehne) : undefined,
      GF0073: jn(g.behandlung),
      GF0074: jn(g.parodontose),
      AF0010: jn(g.pkvZahn),
      AF_AD_0005: angaben?.versicherung,
    });
  },
  originalFuerVertrag: (daten, { beginn } = {}) => {
    const fo = daten.formular || {};
    const tarif = TARIFE.find((eintrag) => eintrag.id === daten.tarif);
    const anrede = zahnUkv.person.anreden.find((eintrag) => eintrag.id === daten.anrede);
    const iso = (text) => { const t = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(text || '')); return t ? `${t[3]}-${t[2]}-${t[1]}` : null; };
    return [
      { schritt: 1, feld: 'beginn', wert: beginn ? beginn.iso : null },
      { schritt: 1, feld: 'geburtsdatum', wert: iso(daten.geburtsdatumText) },
      { schritt: 1, feld: 'geschlecht', wert: anrede?.original || null },
      { schritt: 1, feld: 'tarifwahl', wert: tarif?.original || null },
      { schritt: 2, feld: 'firstName', wert: String(fo.vorname || '').trim() },
      { schritt: 2, feld: 'lastName', wert: String(fo.nachname || '').trim() },
      ...fragenZuordnung(FRAGEN, daten.antworten || {}, bedingungErfuellt, { antworten: daten.antworten || {}, tarif: daten.tarif })
        .map((e) => ({ ...e, ...(UKV_NICHT_SENSIBEL.includes(e.feld) ? { sensibel: false } : {}) })),
      ...zahnUkv.person.anschrift.filter((feld) => feld.original).map((feld) => ({ schritt: 5, feld: feld.original, wert: String(fo[feld.id] || '').trim() })),
      { schritt: 5, feld: 'orderIbanName', wert: [fo.vorname, fo.nachname].map((teil) => String(teil || '').trim()).join(' ') },
      { schritt: 5, feld: 'orderIban', wert: String(daten.iban || '').replace(/\s/g, '').toUpperCase() },
      { schritt: 5, feld: 'sepaMandatConfirmation', wert: daten.erklaerungen?.sepaMandatConfirmation === true ? 'true' : 'false' },
      ...zahnUkv.verdeckt.map((eintrag) => ({ ...eintrag, verdeckt: true })),
    ];
  },
};

export default zahnUkv;
