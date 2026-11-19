// Produktdefinition der Antragsmaske stationär: SDK Klinik 1-Bett (SP1),
// Klinik 2-Bett (SP2), Klinik bei Unfall (SPU), 12.11.2026.
//
// Quelle: Erfassung der Level-Nine-Strecke vom 12.11.2026
// (Healio/Antragsstrecken/originale/levelnine/, LEVELNINE-ERFASSUNG.md
// Abschnitt 2, sdk-stationaer.json, beitraege-sdk-stationaer.json).
// - 9 Gesundheitsfragen plus Größe und Gewicht nur bei SP1 und SP2, je „Ja“
//   die Folgefelder des Originals; bei SPU entfällt der Schritt Gesundheitsfragen.
// - Ein „Ja“ ändert online nichts am Beitrag, die SDK entscheidet erst nach
//   Eingang. Die Maske sagt das, verspricht keine Annahme, nennt keinen Zuschlag.
// - Beitrag: Eintrittsalter = Beginnjahr minus Geburtsjahr, Tabelle 0 bis 80.
// - Beginn wie im Original: nächster Monatserster vorbelegt, bis zum 15. auch
//   der laufende Monat, dazu 5 weitere Monate.

import { HINWEIS_MINDERJAEHRIG } from '../sdkAmbulantAntrag.js';
import { ERKLAERUNG_KURZ, TEXT_10_VOLLMACHT } from '../sdkAmbulantAntragTexte.js';
import { bedingungErfuellt } from '../../lib/antragsmaske/regeln.js';
import {
  LEVELNINE, antwortenAusStrecke, feldAus, fragenZuordnung, frageAus,
} from './levelnine.js';
import {
  SDK_ABLAUF, SDK_HINWEIS_NACH_EINGANG, sdkDatenZuordnung, sdkTeile,
} from './sdkStrecke.js';

const SCHRITTE = LEVELNINE.sdkStationaer.schritte;
const TARIFE = [
  { id: 'SP2', original: 'SDKSP2#', name: 'Klinik 2-Bett' },
  { id: 'SP1', original: 'SDKSP1#', name: 'Klinik 1-Bett' },
  { id: 'SPU', original: 'SDKSPU#', name: 'Klinik bei Unfall' },
];
const MIT_FRAGEN = { tarif: ['SP1', 'SP2'] };

const VOLLMACHT = TEXT_10_VOLLMACHT.replace('die ambulante Zusatzversicherung', 'die stationäre Zusatzversicherung');

// Gesundheitsfragen: Größe und Gewicht (G0A, G0B) auf einem Bildschirm, dann G10 bis G35.
const felderGesundheit = SCHRITTE.find((schritt) => schritt.schritt === 5).felder;

// „Weitere Angaben“ (Paket 1 Punkt 13): Die Erfassung vom 12.11. kennt nur
// Block 1 und 2. Der Probelauf vom 19.11.2026 (Testperson, bis Schritt 5) hat
// gezeigt: Die SDK öffnet mit „Weitere Angaben: Ja“ bis zu sechs Blöcke mit
// denselben Wortlauten (Felder G10&C&1 … G10&K&5), ab Block 6 gibt es keine
// „Weitere Angaben“ mehr. Die Blöcke 3 bis 6 entstehen hier aus Block 2, nur
// die Kennungen zählen hoch; kein Wortlaut wird verändert.
export const WEITERE_BLOECKE_MAX = 5;
export function mitWeiterenBloecken(feld) {
  const w1 = feld.folgefragen?.find((x) => x.id === `${feld.id}.1`);
  const vorlage = w1?.folgefragen;
  if (!vorlage?.length) return feld;
  const zwei = `${feld.id}.2`;
  const neu = (id, k) => {
    if (id === zwei) return `${feld.id}.${k + 1}`;
    const t = new RegExp(`^(${feld.id}(?:\\.[A-Z])?)\\.1$`).exec(String(id));
    return t ? `${t[1]}.${k}` : id;
  };
  const kopie = (f, k) => ({
    ...f, id: neu(f.id, k), ...(f.bedingung ? { bedingung: { ...f.bedingung, frage: neu(f.bedingung.frage, k) } } : {}), ...(f.folgefragen ? { folgefragen: f.folgefragen.map((x) => kopie(x, k)) } : {}),
  });
  const block = (k) => vorlage
    .filter((f) => k < WEITERE_BLOECKE_MAX || f.id !== zwei)
    .map((f) => kopie(f, k))
    .map((f) => (f.id === `${feld.id}.${k + 1}` ? { ...f, folgefragen: block(k + 1) } : f));
  return {
    ...feld,
    folgefragen: feld.folgefragen.map((f) => (f.id === w1.id ? { ...f, folgefragen: f.folgefragen.map((x) => (x.id === zwei ? { ...x, folgefragen: block(2) } : x)) } : f)),
  };
}
const groesse = felderGesundheit.find((feld) => feld.id === 'G0A');
const gewicht = felderGesundheit.find((feld) => feld.id === 'G0B');
const FRAGEN = [
  {
    id: 'G0',
    typ: 'masse',
    titel: 'Körpergröße und Körpergewicht',
    kurz: 'Körpergröße und Körpergewicht',
    bedingung: MIT_FRAGEN,
    original: { schritt: 5 },
    felder: [
      {
        id: 'groesse', original: 'G0A', label: groesse.wortlaut, einheit: 'cm', min: 50, max: 250, ganzzahl: true, fehler: 'Bitte gib deine Größe in ganzen Zentimetern ein.', platzhalter: 'z. B. 172',
      },
      {
        id: 'gewicht', original: 'G0B', label: gewicht.wortlaut, einheit: 'kg', min: 20, max: 300, ganzzahl: true, fehler: 'Bitte gib dein Gewicht in ganzen Kilogramm ein.', platzhalter: 'z. B. 68',
      },
    ],
  },
  ...felderGesundheit.filter((feld) => !['G0A', 'G0B'].includes(feld.id)).map(mitWeiterenBloecken).map((feld) => ({
    ...frageAus(feld, { schritt: 5, hinweisBeiJa: SDK_HINWEIS_NACH_EINGANG }),
    bedingung: MIT_FRAGEN,
    kurz: feld.wortlaut.length > 70 ? `${feld.wortlaut.slice(0, 67).replace(/\s+\S*$/, '')} …` : feld.wortlaut,
  })),
];

// Beitragstabelle: je Eintrittsalter eine Gruppe (Werte unverändert).
const GRUPPEN = Object.entries(LEVELNINE.beitraege.sdkStationaer).map(([alter, zeile]) => ({
  von: Number(alter), bis: Number(alter), preise: { SP1: zeile.SDKSP1, SP2: zeile.SDKSP2, SPU: zeile.SDKSPU },
})).sort((a, b) => a.von - b.von);

// Text 8 für stationär, gleich gebaut wie bei ambulant, Bayerischer und UKV (19.11.2026).
const TEXT_8_AUSWAHL_STATIONAER = 'Gut zu wissen: In diesem Antrag geht es nur um die stationären Tarife SP1, SP2 und SPU der Süddeutschen Krankenversicherung a. G. (SDK). Grundlage sind die Bedingungen und Beiträge der SDK. Andere Versicherer vergleichen wir hier nicht.';

const teile = sdkTeile({
  strecke: 'sdkStationaer', produkt: 'sdk-stationaer', vollmacht: VOLLMACHT, vollmachtKurz: ERKLAERUNG_KURZ.vollmacht, tarifFuerUnterlagen: (tarif) => tarif, auswahl: TEXT_8_AUSWAHL_STATIONAER,
});

const stationaer = {
  sparte: 'stationaer',
  produkt: 'stationaer',
  pfad: 'stationaer',
  bereit: true,
  stand: '2026-11-12',
  // 19.11.2026 (Paket 1): Versicherungsnehmer sichtbar, Werbeeinwilligung Ja/Nein,
  // Bestätigungssatz der SDK, Auftrag ohne Verweis auf eine fehlende Datei, sechs Blöcke.
  textfassung: '2026-11-19-sdk-stationaer-online',
  quelle: 'Online-Strecke der SDK über den Exklusivlink 901334, erfasst 12.11.2026',
  kennzeile: 'Klinikschutz der SDK',
  seitentitel: 'Antrag Klinikschutz | Healio',
  beschreibung: 'Dein Antrag auf den Klinikschutz der SDK.',
  ablauf: SDK_ABLAUF,
  ...teile,

  tarife: TARIFE.map((tarif) => ({
    id: tarif.id, name: tarif.name, original: { tarif: tarif.original }, details: LEVELNINE.sdkStationaer.leistungstexte[tarif.original] || null,
  })),
  tarifHinweis: 'Beitrag im Monat.',
  beginn: {
    art: 'monatsErster', abMonat: 1, bisMonat: 6, laufenderMonatBisTag: 15,
  },
  // Online nur Volljährige für sich selbst (Versicherungsnehmer = versicherte
  // Person); Tabelle bis 80, darüber persönlich.
  alter: {
    min: 18, max: 80, maxZaehlung: 'kalenderjahr', stichtag: 'heute', hinweisZuJung: HINWEIS_MINDERJAEHRIG, hinweisZuAlt: 'Ab 81 Jahren nehmen wir den Antrag gemeinsam mit dir auf.',
  },
  beitrag: {
    alter: 'kalenderjahr', gruppen: GRUPPEN, vorbehalt: teile.absenden.vorbehalt, hinweisNachEingang: SDK_HINWEIS_NACH_EINGANG,
  },
  gesundheit: { titel: 'Gesundheitsfragen', vorspann: null, fragen: FRAGEN },

  gesundheitFuerVertrag: (antworten = {}, { tarif } = {}) => ({
    fragebogen: 'SDK_SP',
    antworten: fragenZuordnung(FRAGEN.filter((frage) => frage.typ !== 'masse'), antworten, bedingungErfuellt, { antworten, tarif }),
    ...(MIT_FRAGEN.tarif.includes(tarif) ? { G0A: String(antworten.G0?.groesse ?? ''), G0B: String(antworten.G0?.gewicht ?? '') } : {}),
  }),
  // Telefonweg: Angaben im Format der Strecke (gesundheitFuerVertrag) oder in der
  // einfachen Form des Dienstes ({ groesse, gewicht, antworten: { G10: … } }).
  gesundheitAusVertrag: (gesundheit = {}) => {
    const g = gesundheit || {};
    const antworten = antwortenAusStrecke(FRAGEN.filter((frage) => frage.typ !== 'masse'), g.antworten);
    const groesse = g.G0A ?? g.groesse;
    const gewicht = g.G0B ?? g.gewicht;
    if (groesse || gewicht) antworten.G0 = { groesse: String(groesse ?? ''), gewicht: String(gewicht ?? '') };
    return antworten;
  },
  originalFuerVertrag: (daten, { beginn } = {}) => {
    const tarif = TARIFE.find((eintrag) => eintrag.id === daten.tarif);
    const iso = (text) => { const t = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(String(text || '')); return t ? `${t[3]}-${t[2]}-${t[1]}` : null; };
    const kontext = { antworten: daten.antworten || {}, tarif: daten.tarif };
    const fragen = MIT_FRAGEN.tarif.includes(daten.tarif)
      ? [
        { schritt: 5, feld: 'G0A', wert: String(daten.antworten?.G0?.groesse ?? '') },
        { schritt: 5, feld: 'G0B', wert: String(daten.antworten?.G0?.gewicht ?? '') },
        ...fragenZuordnung(FRAGEN.filter((frage) => frage.typ !== 'masse'), daten.antworten || {}, bedingungErfuellt, kontext),
      ]
      : [];
    return [
      { schritt: 1, feld: 'beginn', wert: beginn ? beginn.iso : null },
      { schritt: 1, feld: 'geburtsdatum', wert: iso(daten.geburtsdatumText) },
      { schritt: 1, feld: 'tarifwahl', wert: tarif?.original || null },
      ...(daten.unterlagenDienst || []).map((u) => ({ schritt: 3, feld: `downloadLnDocument_${u.id ?? u.name}`, wert: daten.unterlagenGeoeffnet?.[`dienst:${u.id ?? u.name}`] ? 'true' : null })),
      ...fragen,
      ...sdkDatenZuordnung(stationaer, daten),
    ];
  },
};

// Kennungen der Felder, die das Original im Schritt Gesundheitsfragen hat (für den Vollständigkeitstest).
export const STATIONAER_GESUNDHEIT_FELDER = feldAus(SCHRITTE, 5, 'G10') ? felderGesundheit.map((feld) => feld.id) : [];

export default stationaer;
