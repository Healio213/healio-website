// Gemeinsame Teile der SDK-Online-Strecke (Level Nine) für ambulant und
// stationär, Erfassung 12.11.2026. Reihenfolge der Schritte wie im Original:
// Beitrag, Persönliche Daten (mit Datenschutz- und GKV-Haken), Ihre
// Vertragsunterlagen (Pflicht-Downloads), Erklärungen, Gesundheitsfragen,
// Beratung und Beratungsverzicht, Antragsdaten (Anschrift, Kontakt, Bank,
// SEPA). Dazu Healios eigene Erklärungen (Auftrag, Vollmacht,
// Gesundheitsangaben) im Schritt „Beratung und Auftrag“. Wortlaute der SDK
// unverändert aus original/levelnine.js.

import {
  BEITRAG_VORBEHALT, ERKLAERUNG_KURZ, KNOPF_BEANTRAGEN, SDK_NAME, TEIL_3_TITEL, TEXT_12_KNOPF, TEXT_13_FRAGE, TEXT_6_GESUNDHEIT,
  TEXT_6_STANDORT_PLATZHALTER, TEXT_9_HAKEN, TEXT_9_HINWEIS,
} from '../sdkAmbulantAntragTexte.js';
import { TEXT_6_STANDORT } from '../sdkAmbulantAntragSdkTexte.js';
import {
  LEVELNINE, anschriftSdk, feldAus, hakenAus, sdkUnterlagen,
} from './levelnine.js';

export const WICHTIGE_INFORMATIONEN = 'https://www.sdk.de/downloads/online-absatz/0.155a.pdf';
export const SDK_HINWEIS_NACH_EINGANG = 'Die SDK prüft deine Angaben nach Eingang und entscheidet dann über deinen Antrag.';

// strecke: 'sdkAmbulant' | 'sdkStationaer'; vollmacht: Text 10 für dieses Produkt.
export function sdkTeile({
  strecke, produkt, vollmacht, vollmachtKurz, tarifFuerUnterlagen,
}) {
  const schritte = LEVELNINE[strecke].schritte;
  const f = (schritt, id) => feldAus(schritte, schritt, id);
  const acknowledge = f(2, 'acknowledge');
  const beratung = f(6, 'hinweis_beratung');
  const sepa = f(7, 'sepaMandatConfirmation');
  const kontoinhaber = f(7, 'orderIbanName');

  return {
    versicherer: {
      id: 'sdk', name: SDK_NAME, kurz: 'SDK', beiDer: 'der SDK',
    },
    person: {
      // Original Schritt 1: Geschlecht Männlich/Weiblich (MALE/FEMALE).
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
      bestaetigungenIn: 'person',
      bestaetigungen: [{
        key: 'acknowledge', original: 'acknowledge', label: acknowledge.wortlaut, fehler: acknowledge.fehlertext || 'Bitte bestätigen.', links: [{ label: 'Informationen zur Verwendung Ihrer Daten', href: acknowledge.link.url }], ausweg: 'Nicht gesetzlich versichert? Lass uns kurz sprechen.',
      }],
      anschrift: anschriftSdk(schritte),
    },
    unterlagenDownload: {
      produkt,
      hinweis: f(3, 'labelDocuments').wortlaut.replace(/^Ihre Vertragsunterlagen\s+/, ''),
      fehler: 'Laden Sie die Datei bitte runter!',
      liste: (tarif) => sdkUnterlagen(tarifFuerUnterlagen(tarif)),
    },
    zahlung: {
      zahlweisen: [{ id: 'monatlich', label: 'Monatlich' }],
      kontoinhaberFrage: TEXT_13_FRAGE,
      kontoinhaberHinweis: kontoinhaber.hilfetext,
      kontoAndere: {
        titel: 'Das klären wir am besten kurz zusammen.',
        text: 'Gehört das Konto jemand anderem, muss diese Person das Lastschriftmandat selbst erteilen. Vereinbare einfach einen Termin, dann machen wir den Rest gemeinsam.',
      },
      bankname: {
        id: 'bankname', label: 'Bankname', original: 'orderBankName', fehlerLeer: 'Bitte gib den Namen deiner Bank ein.',
      },
      sepa: {
        karte: 'SEPA-Lastschriftmandat', titel: null, absaetze: [], angaben: [], key: 'sepaMandatConfirmation', original: 'sepaMandatConfirmation', haken: sepa.wortlaut,
      },
    },
    erklaerungen: [
      {
        id: 'erklaerungen',
        teil: 'Erklärungen',
        eintraege: [
          hakenAus(f(4, 'saveConfirmationtext'), { schritt: 4, titel: 'Vorvertragliche Anzeigepflicht', links: [{ label: 'Wichtige Informationen für den Antragssteller', href: WICHTIGE_INFORMATIONEN }] }),
          hakenAus(f(4, 'declarationOfConsentTermsOfContract'), { schritt: 4, titel: 'Vertragsunterlagen' }),
          hakenAus(f(4, 'declarationOfConsentAndReleaseFromConfidentiality'), { schritt: 4, titel: 'Datenschutz und Schweigepflichtentbindung' }),
          // Original: Ja oder Nein ist Pflicht zu wählen. Healio: leer und freiwillig, ohne Haken geht „false“ an das Original.
          hakenAus(f(4, 'declarationOfConsentAdvertising'), {
            schritt: 4, titel: 'Informationen der SDK', pflicht: false, freiwilligText: 'Freiwillig. Dein Antrag geht auch ohne diesen Haken.',
          }),
        ],
      },
      {
        id: 'beratung',
        teil: 'Beratung und Auftrag',
        eintraege: [
          { art: 'hinweis', text: beratung.wortlaut, terminLink: true },
          hakenAus(f(6, 'avoidAdvice'), { schritt: 6, titel: 'Beratungsverzicht gegenüber der SDK' }),
          {
            art: 'haken', key: 'verzicht', titel: 'Verzicht auf Beratung durch Healio', warnung: TEXT_9_HINWEIS, haken: TEXT_9_HAKEN, pflicht: true,
          },
          {
            art: 'haken', key: 'vollmacht', titel: 'Auftrag und Vollmacht', kurz: vollmachtKurz || ERKLAERUNG_KURZ.vollmacht, volltext: [['p', vollmacht]], dokument: 'Maklervertrag', haken: 'Ich erteile Healio diesen Auftrag und diese Vollmacht.', pflicht: true,
          },
          {
            art: 'haken',
            key: 'gesundheitsdaten',
            titel: 'Gesundheitsangaben bei Healio',
            kurz: ERKLAERUNG_KURZ.gesundheitsdaten,
            volltext: [['p', TEXT_6_GESUNDHEIT.map((stueck) => (stueck === TEXT_6_STANDORT_PLATZHALTER ? TEXT_6_STANDORT : stueck)).join('')]],
            haken: 'Ich bin einverstanden.',
            pflicht: true,
          },
        ],
      },
    ],
    zusammenfassung: { titel: TEIL_3_TITEL },
    absenden: { satz: TEXT_12_KNOPF, vorbehalt: BEITRAG_VORBEHALT, knopf: KNOPF_BEANTRAGEN },
    // Verdeckte Antworten, die das Original selbst setzt (nie angezeigt).
    verdeckt: [
      { schritt: 4, feld: 'policyHolderIsEqualInsuredPerson', wert: 'true' },
      { schritt: 4, feld: 'confirmDataProtection', wert: 'true', hinweis: 'Vermittlererklärung der ObjectiveIT GmbH, setzt die Seite selbst (Frank prüfen)' },
    ],
  };
}

// Ablauf der Maske für die SDK-Strecke (Schritt der Maske, Titel, Bildschirm).
export const SDK_ABLAUF = [
  { id: 'tarif', titel: 'Tarif und Beitrag' },
  { id: 'person', titel: 'Deine Daten' },
  { id: 'unterlagenDownload', titel: 'Deine Unterlagen' },
  { id: 'erkl:erklaerungen', titel: 'Erklärungen' },
  { id: 'hinweis', titel: 'Gesundheitsfragen' },
  { id: 'fragen', titel: 'Gesundheitsfragen' },
  { id: 'beitrag', titel: 'Dein Beitrag' },
  { id: 'erkl:beratung', titel: 'Beratung und Auftrag' },
  { id: 'anschrift', titel: 'Anschrift und Kontakt' },
  { id: 'zahlung', titel: 'Zahlung' },
  { id: 'zusammenfassung', titel: 'Zusammenfassung' },
];

// Zuordnung der Antragsdaten zum Original (Schritt 2, 7 und Erklärungen).
export function sdkDatenZuordnung(definition, daten) {
  const f = daten.formular || {};
  const anrede = definition.person.anreden.find((eintrag) => eintrag.id === daten.anrede);
  const ja = (key) => (daten.erklaerungen?.[key] === true ? 'true' : 'false');
  const liste = [
    { schritt: 1, feld: 'geschlecht', wert: anrede?.original || null },
    { schritt: 2, feld: 'firstName', wert: String(f.vorname || '').trim() },
    { schritt: 2, feld: 'lastName', wert: String(f.nachname || '').trim() },
    { schritt: 2, feld: 'acknowledge', wert: daten.bestaetigungen?.acknowledge === true ? 'true' : 'false' },
    ...definition.erklaerungen.flatMap((teil) => teil.eintraege).filter((e) => e.original && e.originalSchritt).map((e) => ({ schritt: e.originalSchritt, feld: e.original, wert: ja(e.key) })),
    ...definition.person.anschrift.map((feld) => ({ schritt: 7, feld: feld.original, wert: feld.gesperrt ? feld.wert : String(f[feld.id] || '').trim() })),
    { schritt: 7, feld: 'orderIbanName', wert: [f.vorname, f.nachname].map((teil) => String(teil || '').trim()).join(' ') },
    { schritt: 7, feld: 'orderIban', wert: String(daten.iban || '').replace(/\s/g, '').toUpperCase() },
    { schritt: 7, feld: 'orderBankName', wert: String(daten.bankname || '').trim() },
    { schritt: 7, feld: 'sepaMandatConfirmation', wert: ja('sepaMandatConfirmation') },
    ...definition.verdeckt.map((eintrag) => ({ ...eintrag, verdeckt: true })),
  ];
  return liste;
}
