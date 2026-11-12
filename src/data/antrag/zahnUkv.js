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
  BEITRAG_VORBEHALT, ERKLAERUNG_KURZ, KNOPF_BEANTRAGEN, TEIL_3_TITEL, TEXT_10_VOLLMACHT, TEXT_12_KNOPF, TEXT_13_FRAGE, TEXT_6_GESUNDHEIT,
  TEXT_6_STANDORT_PLATZHALTER, TEXT_9_HAKEN, TEXT_9_HINWEIS, UNTERLAGEN_HEALIO,
} from '../sdkAmbulantAntragTexte.js';
import { TEXT_6_STANDORT } from '../sdkAmbulantAntragSdkTexte.js';
import { bedingungErfuellt } from '../../lib/antragsmaske/regeln.js';
import {
  LEVELNINE, feldAus, fragenZuordnung, frageAus,
} from './levelnine.js';

const SCHRITTE = LEVELNINE.ukvZahn.schritte;
const f = (schritt, id) => feldAus(SCHRITTE, schritt, id);
const UKV = 'Union Krankenversicherung AG';

// Healio-Texte der Prüfseite mit der UKV statt der SDK (Name ersetzt, sonst gleich).
function fuerUkv(text) {
  const neu = text
    .replace('die ambulante Zusatzversicherung bei der Süddeutschen Krankenversicherung a. G. (SDK)', `die Zahnzusatzversicherung ZahnPRIVAT bei der ${UKV} (UKV)`)
    .replace('in die Online-Antragsstrecke der SDK, die die cpit comparit GmbH (Level Nine) für die SDK betreibt', 'in die Online-Antragsstrecke der UKV')
    .replace(/Online-Antragsstrecke der SDK/g, 'Online-Antragsstrecke der UKV')
    .replace(/Post der SDK/g, 'Post der UKV')
    .replace(/bei der SDK/g, 'bei der UKV')
    .replace(/an die SDK/g, 'an die UKV')
    .replace(/Stellt die SDK/g, 'Stellt die UKV')
    .replace(/Nennt die SDK/g, 'Nennt die UKV');
  if (/SDK|Süddeutsche|Level Nine|cpit/.test(neu)) throw new Error(`zahnUkv.js: SDK-Rest im Text: ${neu.slice(0, 80)}`);
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

const tf0021 = frageAus(f(4, 'TF0021'), { schritt: 4 });
tf0021.titel = 'Fehlende Zähne';
tf0021.kurz = 'Fehlende Zähne';
tf0021.optionen = tf0021.optionen.map((option) => {
  if (option.id === '>3') return { ...option, wirkung: keineAufnahme };
  const anzahl = Number(option.id);
  return anzahl > 0 ? { ...option, wirkung: [{ art: 'zuschlag', euroJeTarif: ZUSCHLAG_JE_ZAHN, anzahl, grund: `${anzahl} fehlende${anzahl === 1 ? 'r Zahn' : ' Zähne'}` }] } : option;
});

const gf0073 = { ...frageAus(f(4, 'GF0073'), { schritt: 4 }), titel: 'Laufende oder empfohlene Behandlung', kurz: 'Laufende oder empfohlene Behandlung', wirkung: { ja: keineAufnahme } };
const gf0074 = {
  ...frageAus(f(4, 'GF0074'), { schritt: 4 }), titel: 'Parodontose', kurz: 'Parodontose', wirkung: { ja: [{ art: 'ausschluss', text: 'Für Parodontosebehandlungen besteht kein Versicherungsschutz.' }] },
};
const af0010 = { ...frageAus(f(4, 'AF0010'), { schritt: 4 }), titel: 'Andere Zahnzusatzversicherung', kurz: 'Andere Zahnzusatzversicherung' };
const afAd0001 = { ...frageAus(f(4, 'AF_AD_0001'), { schritt: 4 }), titel: 'Einzelfallentbindung', kurz: 'Einzelfallentbindung' };
const afAd0005 = { ...frageAus(f(4, 'AF_AD_0005'), { schritt: 4 }), titel: 'Krankenversicherung', kurz: 'Krankenversicherung' };
const FRAGEN = [tf0021, gf0073, gf0074, af0010, afAd0001, afAd0005];

const GRUPPEN = Object.entries(LEVELNINE.beitraege.ukvZahn).map(([alter, zeile]) => ({
  von: Number(alter), bis: Number(alter), preise: Object.fromEntries(TARIFE.map((tarif) => [tarif.id, zeile[tarif.schluessel]])),
})).sort((a, b) => a.von - b.von);

const zahnUkv = {
  sparte: 'zahn',
  produkt: 'zahn-ukv',
  pfad: 'zahn-ukv',
  schalter: 'ukvZahn',
  bereit: true,
  stand: '2026-11-12',
  textfassung: '2026-11-12-ukv-zahn-online',
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
  beginn: {
    art: 'monatsErster', abMonat: 1, bisMonat: 6, laufenderMonatBisTag: 15,
  },
  alter: {
    min: 18, max: 80, maxZaehlung: 'kalenderjahr', stichtag: 'heute', hinweisZuJung: HINWEIS_MINDERJAEHRIG, hinweisZuAlt: 'Ab 81 Jahren nehmen wir den Antrag gemeinsam mit dir auf.',
  },
  beitrag: { alter: 'kalenderjahr', gruppen: GRUPPEN, vorbehalt: fuerUkv(BEITRAG_VORBEHALT) },

  gesundheit: {
    titel: 'Zahnfragen',
    vorspann: {
      vorTitel: 'Vor den Zahnfragen',
      titel: 'Vorvertragliche Anzeigepflicht',
      absaetze: [f(3, 'AT_AD_0001').wortlaut],
    },
    fragen: FRAGEN,
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
          kurz: fuerUkv(ERKLAERUNG_KURZ.gesundheitsdaten),
          volltext: [['p', fuerUkv(TEXT_6_GESUNDHEIT.map((stueck) => (stueck === TEXT_6_STANDORT_PLATZHALTER ? TEXT_6_STANDORT : stueck)).join(''))]],
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
          // Das Original bietet keinen Download an; die Bedingungen sind nur im Leistungstext genannt.
          art: 'unterlagen',
          key: 'unterlagenUkv',
          titel: 'Deine Unterlagen',
          gruppen: [
            {
              von: 'Von der UKV',
              eintraege: [
                { name: 'Teil I AVB/ZV, Stand 01.02.2023 (SAP-Nr. 342743)', dateien: [] },
                { name: 'Teil II Tarife ZahnPRIVAT, Stand 01.08.2024 (SAP-Nr. 348124)', dateien: [] },
                { name: 'Mitteilung nach § 19 Abs. 5 VVG', dateien: [] },
              ],
            },
            { von: 'Von Healio', eintraege: [{ name: 'Erstinformation', dateien: [{ label: 'Erstinformation', href: '/erstinformation' }] }, ...UNTERLAGEN_HEALIO.map((name) => ({ name, dateien: [] }))] },
          ],
          pflicht: false,
        },
      ],
    },
  ],

  zusammenfassung: { titel: TEIL_3_TITEL },
  absenden: { satz: fuerUkv(TEXT_12_KNOPF), vorbehalt: fuerUkv(BEITRAG_VORBEHALT), knopf: KNOPF_BEANTRAGEN },
  verdeckt: [
    { schritt: 3, feld: 'policyHolderIsEqualInsuredPerson', wert: 'true' },
    { schritt: 3, feld: 'agentConfirmation', wert: 'true', hinweis: 'Maklerbestätigung, setzt das Original verdeckt (Frank klärt mit Fonds Finanz/UKV)' },
    { schritt: 4, feld: 'VP0004', wert: 'Versicherungsnehmer selbst' },
    { schritt: 4, feld: 'AF_AD_0002', wert: 'vor Unterschrift des Antrags gewünscht', hinweis: 'verdeckt im Original' },
    { schritt: 4, feld: 'AF_AD_0003', wert: 'wird vom Kunden gewünscht', hinweis: 'verdeckt im Original' },
    { schritt: 4, feld: 'AF_AD_0004', wert: 'true', hinweis: 'Erklärung des Maklers, verdeckt im Original (Frank klären)' },
  ],

  gesundheitFuerVertrag: (antworten = {}, { tarif } = {}) => ({
    fragebogen: 'UKV_ZAHN', antworten: fragenZuordnung(FRAGEN, antworten, bedingungErfuellt, { antworten, tarif }),
  }),
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
      ...fragenZuordnung(FRAGEN, daten.antworten || {}, bedingungErfuellt, { antworten: daten.antworten || {}, tarif: daten.tarif }).map((e) => ({ ...e, schritt: 4 })),
      ...zahnUkv.person.anschrift.filter((feld) => feld.original).map((feld) => ({ schritt: 5, feld: feld.original, wert: String(fo[feld.id] || '').trim() })),
      { schritt: 5, feld: 'orderIbanName', wert: [fo.vorname, fo.nachname].map((teil) => String(teil || '').trim()).join(' ') },
      { schritt: 5, feld: 'orderIban', wert: String(daten.iban || '').replace(/\s/g, '').toUpperCase() },
      { schritt: 5, feld: 'sepaMandatConfirmation', wert: daten.erklaerungen?.sepaMandatConfirmation === true ? 'true' : 'false' },
      ...zahnUkv.verdeckt.map((eintrag) => ({ ...eintrag, verdeckt: true })),
    ];
  },
};

export default zahnUkv;
