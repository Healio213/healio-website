// Gemeinsame Teile der SDK-Online-Strecke (Level Nine) für ambulant und
// stationär, Erfassung 12.11.2026. Reihenfolge der Schritte wie im Original:
// Beitrag, Persönliche Daten (mit Datenschutz- und GKV-Haken), Ihre
// Vertragsunterlagen (Pflicht-Downloads), Erklärungen, Gesundheitsfragen,
// Beratung und Beratungsverzicht, Antragsdaten (Anschrift, Kontakt, Bank,
// SEPA). Dazu Healios eigene Erklärungen (Auftrag, Vollmacht,
// Gesundheitsangaben) im Schritt „Beratung und Auftrag“. Wortlaute der SDK
// unverändert aus original/levelnine.js.

import {
  BEITRAG_VORBEHALT_ANNAHME, ERKLAERUNG_KURZ, NACH_EINGANG_ANNAHME, KNOPF_BEANTRAGEN, SDK_NAME, TEIL_3_TITEL, TEXT_12_KNOPF, TEXT_13_FRAGE, TEXT_6_GESUNDHEIT,
  TEXT_6_STANDORT_PLATZHALTER, TEXT_9_HAKEN, TEXT_9_HINWEIS,
} from '../sdkAmbulantAntragTexte.js';
import { TEXT_6_STANDORT } from '../sdkAmbulantAntragSdkTexte.js';
import {
  LEVELNINE, anschriftSdk, feldAus, hakenAus, sdkUnterlagen,
} from './levelnine.js';

export const WICHTIGE_INFORMATIONEN = 'https://www.sdk.de/downloads/online-absatz/0.155a.pdf';
// Stationär, Hinweis bei „Ja“ (Bauplan Ebene 1, B9, Entwurf für Frank): Online
// gibt es keinen Zuschlag, die SDK entscheidet nach Eingang (1.770asi Z. 251,
// 424 bis 427, 600 bis 606, 665 bis 667). Am Beitrag steht der Satz mit „oben“.
const SDK_PRUEFT_NACH_EINGANG = 'Die SDK prüft deine Angaben, nachdem dein Antrag eingegangen ist. Sie kann dann einen Zuschlag verlangen, einzelne Leistungen ausschließen oder den Antrag ablehnen.';
export const SDK_HINWEIS_NACH_EINGANG = `${SDK_PRUEFT_NACH_EINGANG} Der Beitrag oben gilt, wenn sie ohne Änderung annimmt.`;
export const SDK_HINWEIS_BEI_JA = `${SDK_PRUEFT_NACH_EINGANG} Dein Beitrag gilt, wenn sie ohne Änderung annimmt.`;
export const SDK_NACH_EINGANG_STATIONAER = `Eingegangen heißt noch nicht angenommen. ${SDK_PRUEFT_NACH_EINGANG}`;

// Link zur Datenschutzerklärung an der Einwilligung zu den Gesundheitsangaben
// (19.11.2026, gleiche Art wie am Datenschutz-Haken im Schritt „Deine Daten“).
export const DATENSCHUTZ_LINK = Object.freeze({ label: 'Datenschutzerklärung', href: '/datenschutz' });
// Unterlagen von Healio wie in der Strecke der Bayerischen und der UKV (19.11.2026).
// Paket 1 (19.11.2026): Nur noch Unterlagen mit Datei. Hinweis zur Tarifauswahl,
// Beratungsverzicht und Auftrag stehen im Wortlaut in „Mein Antrag“ (PDF nach
// dem Absenden), deshalb hier kein Name ohne Datei mehr.
export const UNTERLAGEN_VON_HEALIO = Object.freeze({
  von: 'Von Healio', eintraege: [{ name: 'Erstinformation', dateien: [{ label: 'Erstinformation', href: '/erstinformation' }] }],
});
export const MEIN_ANTRAG_HINWEIS = 'Deinen ganzen Antrag mit allen Angaben und Erklärungen bekommst du direkt nach dem Absenden als PDF „Mein Antrag“. Darin stehen auch der Hinweis zur Tarifauswahl, dein Beratungsverzicht und dein Auftrag an Healio im Wortlaut.';
// Text 10 der Prüfseite endet mit „Den vollständigen Maklervertrag habe ich als
// PDF erhalten.“ Eine solche Datei gibt es nicht (Abgleich 19.11.2026); in der
// Maske steht stattdessen, was der Kunde wirklich bekommt.
export const VOLLMACHT_PDF_ALT = 'Den vollständigen Maklervertrag habe ich als PDF erhalten.';
export const VOLLMACHT_PDF_NEU = 'Diesen Auftrag bekomme ich mit allen meinen Angaben und Erklärungen nach dem Absenden als PDF „Mein Antrag“.';
export const vollmachtMitPdf = (text) => String(text).replace(VOLLMACHT_PDF_ALT, VOLLMACHT_PDF_NEU);
// Datenschutzhinweise der SDK: im Original im Fuß jeder Seite (Abgleich 19.11.2026).
export const SDK_DATENSCHUTZ = Object.freeze({ label: 'Datenschutzhinweise der SDK', href: 'https://www.sdk.de/datenschutz' });
// Vor dem Absenden bestätigt der Kunde den Satz aus dem Bestätigungsdialog der
// SDK selbst (Schritt 9, Wortlaut aus der Erfassung). Der Einreicher klickt
// „Kostenpflichtig Beantragen“ nur, wenn diese Bestätigung vorliegt.
export const BESTAETIGUNG_VORSPANN = 'Diesen Satz bestätigst du gegenüber der SDK. Healio klickt danach in deinem Auftrag auf „Kostenpflichtig Beantragen“.';
const JA_NEIN = [{ id: 'ja', label: 'Ja', original: 'true' }, { id: 'nein', label: 'Nein', original: 'false' }];

// strecke: 'sdkAmbulant' | 'sdkStationaer'; vollmacht: Text 10 für dieses Produkt;
// auswahl: Text 8, Hinweis auf die eingeschränkte Auswahl dieses Produkts.
export function sdkTeile({
  strecke, produkt, vollmacht, vollmachtKurz, tarifFuerUnterlagen, auswahl, nachEingang,
}) {
  const schritte = LEVELNINE[strecke].schritte;
  const f = (schritt, id) => feldAus(schritte, schritt, id);
  const acknowledge = f(2, 'acknowledge');
  const beratung = f(6, 'hinweis_beratung');
  const sepa = f(7, 'sepaMandatConfirmation');
  const kontoinhaber = f(7, 'orderIbanName');
  const werbung = f(4, 'declarationOfConsentAdvertising');
  const versicherungsnehmer = f(4, 'policyHolderIsEqualInsuredPerson');
  const dialog = schritte.find((eintrag) => eintrag.schritt === 9)?.felder.find((feld) => /^Hiermit bestätige ich/.test(feld.wortlaut || ''));

  return {
    versicherer: {
      id: 'sdk', name: SDK_NAME, kurz: 'SDK', beiDer: 'der SDK', datenschutz: SDK_DATENSCHUTZ,
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
          // Original Schritt 4: mit „Ja“ vorbelegt und gesperrt, sichtbar (Paket 1 Punkt 11).
          {
            art: 'fest', original: versicherungsnehmer.id, originalSchritt: 4, titel: 'Versicherungsnehmer', text: versicherungsnehmer.wortlaut, optionen: JA_NEIN, wert: 'ja',
            hinweis: 'Das steht fest auf Ja, denn online beantragst du den Schutz für dich selbst.',
          },
          hakenAus(f(4, 'saveConfirmationtext'), { schritt: 4, titel: 'Vorvertragliche Anzeigepflicht', links: [{ label: 'Wichtige Informationen für den Antragssteller', href: WICHTIGE_INFORMATIONEN }] }),
          hakenAus(f(4, 'declarationOfConsentTermsOfContract'), { schritt: 4, titel: 'Vertragsunterlagen' }),
          hakenAus(f(4, 'declarationOfConsentAndReleaseFromConfidentiality'), { schritt: 4, titel: 'Datenschutz und Schweigepflichtentbindung' }),
          // Original: Ja oder Nein ist Pflicht zu wählen, nichts vorbelegt (Paket 1 Punkt 6).
          {
            art: 'janein', key: werbung.id, original: werbung.id, originalSchritt: 4, titel: 'Informationen der SDK', text: werbung.wortlaut, optionen: JA_NEIN, pflicht: true,
            hinweis: 'Dein Antrag geht mit Ja genauso wie mit Nein.', fehler: 'Bitte wähle Ja oder Nein.',
          },
        ],
      },
      {
        id: 'beratung',
        teil: 'Beratung und Auftrag',
        eintraege: [
          ...(auswahl ? [{ art: 'hinweis', text: auswahl }] : []),
          { art: 'hinweis', text: beratung.wortlaut, terminLink: true },
          hakenAus(f(6, 'avoidAdvice'), { schritt: 6, titel: 'Beratungsverzicht gegenüber der SDK' }),
          {
            art: 'haken', key: 'verzicht', titel: 'Verzicht auf Beratung durch Healio', warnung: TEXT_9_HINWEIS, haken: TEXT_9_HAKEN, pflicht: true,
          },
          {
            art: 'unterlagen', key: 'unterlagenHealio', titel: 'Unterlagen von Healio', gruppen: [UNTERLAGEN_VON_HEALIO], text: MEIN_ANTRAG_HINWEIS, pflicht: false,
          },
          {
            art: 'haken', key: 'vollmacht', titel: 'Auftrag und Vollmacht', kurz: vollmachtKurz || ERKLAERUNG_KURZ.vollmacht, volltext: [['p', vollmachtMitPdf(vollmacht)]], haken: 'Ich erteile Healio diesen Auftrag und diese Vollmacht.', pflicht: true,
          },
          {
            art: 'haken',
            key: 'gesundheitsdaten',
            titel: 'Gesundheitsangaben bei Healio',
            kurz: ERKLAERUNG_KURZ.gesundheitsdaten,
            volltext: [['p', TEXT_6_GESUNDHEIT.map((stueck) => (stueck === TEXT_6_STANDORT_PLATZHALTER ? TEXT_6_STANDORT : stueck)).join('')]],
            links: [DATENSCHUTZ_LINK],
            haken: 'Ich bin einverstanden.',
            pflicht: true,
          },
        ],
      },
    ],
    zusammenfassung: { titel: TEIL_3_TITEL },
    absenden: {
      satz: TEXT_12_KNOPF,
      vorbehalt: BEITRAG_VORBEHALT_ANNAHME,
      nachEingang: nachEingang || NACH_EINGANG_ANNAHME,
      knopf: KNOPF_BEANTRAGEN,
      bestaetigung: {
        key: 'angabenBestaetigt', original: 'bestaetigungsdialog', originalSchritt: 9, titel: 'Bestätigung für die SDK', vorspann: BESTAETIGUNG_VORSPANN, text: dialog.wortlaut, fehler: 'Bitte bestätige diesen Satz, bevor du absendest.',
      },
    },
    // Verdeckte Antworten, die das Original selbst setzt (nie angezeigt). Die
    // Frage zum Versicherungsnehmer steht seit 19.11.2026 sichtbar unter
    // „Erklärungen“ (art 'fest').
    verdeckt: [
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
  // Ja/Nein-Erklärung: nur eine gewählte Antwort zählt, sonst null (fehlt).
  const wahl = (eintrag) => eintrag.optionen.find((option) => option.id === daten.erklaerungen?.[eintrag.key])?.original ?? null;
  const wertDer = (eintrag) => {
    if (eintrag.art === 'fest') return eintrag.optionen.find((option) => option.id === eintrag.wert)?.original ?? null;
    if (eintrag.art === 'janein') return wahl(eintrag);
    return ja(eintrag.key);
  };
  const schluss = definition.absenden?.bestaetigung;
  const liste = [
    { schritt: 1, feld: 'geschlecht', wert: anrede?.original || null },
    { schritt: 2, feld: 'firstName', wert: String(f.vorname || '').trim() },
    { schritt: 2, feld: 'lastName', wert: String(f.nachname || '').trim() },
    { schritt: 2, feld: 'acknowledge', wert: daten.bestaetigungen?.acknowledge === true ? 'true' : 'false' },
    ...definition.erklaerungen.flatMap((teil) => teil.eintraege).filter((e) => e.original && e.originalSchritt).map((e) => ({
      schritt: e.originalSchritt, feld: e.original, wert: wertDer(e), ...(e.art === 'fest' ? { gesperrt: true } : {}),
    })),
    ...definition.person.anschrift.map((feld) => ({ schritt: 7, feld: feld.original, wert: feld.gesperrt ? feld.wert : String(f[feld.id] || '').trim() })),
    { schritt: 7, feld: 'orderIbanName', wert: [f.vorname, f.nachname].map((teil) => String(teil || '').trim()).join(' ') },
    { schritt: 7, feld: 'orderIban', wert: String(daten.iban || '').replace(/\s/g, '').toUpperCase() },
    { schritt: 7, feld: 'orderBankName', wert: String(daten.bankname || '').trim() },
    { schritt: 7, feld: 'sepaMandatConfirmation', wert: ja('sepaMandatConfirmation') },
    ...(schluss ? [{ schritt: schluss.originalSchritt, feld: schluss.original, wert: ja(schluss.key) }] : []),
    ...definition.verdeckt.map((eintrag) => ({ ...eintrag, verdeckt: true })),
  ];
  return liste;
}
