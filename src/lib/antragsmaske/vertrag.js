// Selbstantrag an den Antragsdienst (Kanal web-selbst), Entwurf des Vertrags:
// Healio/Antragsstrecken/VERTRAG-SELBSTANTRAG-ENTWURF.md. Baut aus dem
// Zustand der Maske den Datensatz und ordnet Fehlerfelder des Servers den
// Bildschirmen zu. Node-fähig, ohne @/-Importe.

import {
  bedingungErfuellt, ibanOhneLeer, offeneGesundheitsfragen, parseDatum,
} from './regeln.js';
import { bereinigeHerkunft } from '../herkunftSpeicher.js';

export { bereinigeHerkunft };

export const SELBSTANTRAG_KANAL = 'web-selbst';
export const SELBSTANTRAG_PFAD = '/selbstantrag';

const zweistellig = (zahl) => String(zahl).padStart(2, '0');

export function datumText(text, heute = new Date()) {
  const datum = parseDatum(text, heute);
  return datum ? `${zweistellig(datum.tag)}.${zweistellig(datum.monat)}.${datum.jahr}` : '';
}

// Angaben wie in SCHNITTSTELLE.md Abschnitt 3 (gleiche Schlüssel wie die Prüfseite),
// Zahn zusätzlich mit getrennter Hausnummer.
const FORMULAR_SCHLUESSEL = ['vorname', 'nachname', 'strasse', 'hausnummer', 'plz', 'ort', 'telefon', 'email'];
export function angabenAus(daten, beginn, heute = new Date()) {
  const f = daten.formular || {};
  const formular = Object.fromEntries(FORMULAR_SCHLUESSEL
    .filter((key) => key in f && (key !== 'hausnummer' || String(f[key] ?? '').trim() !== ''))
    .map((key) => [key, String(f[key] ?? '').trim()]));
  const angaben = {
    tarifCode: daten.tarif,
    beginnIso: beginn?.iso || null,
    anrede: daten.anrede,
    formular,
    geburtsdatum: datumText(daten.geburtsdatum, heute),
  };
  if (daten.bestaetigungen && 'gkv' in daten.bestaetigungen) angaben.gkv = daten.bestaetigungen.gkv === true;
  else if (daten.mitGkv) angaben.gkv = false;
  const kasse = String(f.krankenkasse ?? '').trim();
  if (kasse) angaben.krankenkasse = kasse;
  return angaben;
}

// Der ganze Datensatz für POST /antrag/api/selbstantrag. Nur Werte aus den
// Schlüssellisten der Definition, nichts sonst.
export function baueSelbstantrag(definition, daten, {
  beginn, beitrag, heute = new Date(), dauerSekunden = 0, feld = '', herkunft = {},
}) {
  const bestaetigungKey = definition.gesundheit?.vorspann?.bestaetigung?.key;
  const erklaerungen = bestaetigungKey ? { [bestaetigungKey]: daten.antworten?.[bestaetigungKey] === true } : {};
  (definition.erklaerungen || []).forEach((teil) => teil.eintraege.forEach((eintrag) => {
    if (!eintrag.key) return;
    erklaerungen[eintrag.key] = eintrag.art === 'wahl' || eintrag.art === 'janein' ? (daten.erklaerungen?.[eintrag.key] ?? null) : daten.erklaerungen?.[eintrag.key] === true;
  }));
  if (definition.zahlung?.sepa?.key) erklaerungen[definition.zahlung.sepa.key] = daten.erklaerungen?.[definition.zahlung.sepa.key] === true;
  // Bestätigungssatz vor dem Absenden (SDK: Satz aus dem Bestätigungsdialog, Paket 1 Punkt 5).
  const schluss = definition.absenden?.bestaetigung?.key;
  if (schluss) erklaerungen[schluss] = daten.erklaerungen?.[schluss] === true;
  return {
    kanal: SELBSTANTRAG_KANAL,
    sparte: definition.sparte,
    versicherer: definition.versicherer.id,
    textfassung: definition.textfassung,
    // Paket C (1.18): Antrag über die Weiche der Zahn-Strecke (Einwilligung vor den Zahnfragen mit Zeitpunkt, Texte nach 2.9).
    ...(definition.weiche ? { weiche: true } : {}),
    angaben: angabenAus(daten, beginn, heute),
    gesundheit: definition.gesundheitFuerVertrag(daten.antworten || {}, { tarif: daten.tarif, bausteine: daten.bausteine || [] }),
    ...(definition.bausteine ? { bausteine: (daten.bausteine || []).filter((id) => definition.bausteine.some((baustein) => baustein.id === id)) } : {}),
    zahlung: {
      zahlweise: daten.zahlweise, kontoinhaber: 'selbst', iban: ibanOhneLeer(daten.iban), ...(definition.zahlung?.bankname ? { bankname: String(daten.bankname || '').trim() } : {}),
    },
    ...((definition.person?.bestaetigungen || []).length
      ? { bestaetigungen: Object.fromEntries(definition.person.bestaetigungen.map((eintrag) => [eintrag.key, daten.bestaetigungen?.[eintrag.key] === true])) }
      : {}),
    versand: 'email',
    erklaerungen,
    beitragAngezeigt: beitrag?.beitrag ?? null,
    ...(typeof definition.originalFuerVertrag === 'function'
      ? { original: definition.originalFuerVertrag({ ...daten, geburtsdatumText: datumText(daten.geburtsdatum, heute) }, { beginn }) }
      : {}),
    unterlagen: {
      gezeigt: [
        ...(daten.unterlagenDienst || []).map((u) => ({
          name: u.name, id: u.id ?? null, quelle: 'antragsdienst', stand: u.stand || definition.textfassung || null, pflichtDownload: true,
        })),
        ...gezeigteUnterlagen(definition, { tarif: daten.tarif, bausteine: daten.bausteine || [], antworten: daten.antworten || {} }),
      ],
      geoeffnet: Object.entries(daten.unterlagenGeoeffnet || {}).map(([href, um]) => ({ href, um })),
      bestaetigt: Object.entries(daten.zeitpunkte || {}).map(([key, um]) => ({ erklaerung: key, um })),
    },
    herkunft: bereinigeHerkunft({ ...herkunft, sparte: definition.sparte, weg: 'allein' }),
    schutz: { feld: String(feld ?? ''), dauerSekunden: Math.max(0, Math.round(dauerSekunden)) },
  };
}

// Unterlagen, die dem Kunden im Schritt „Erklärungen und Unterlagen“ gezeigt
// werden (Name, Adresse, Stand der Definition), passend zu Tarif und Baustein.
export function gezeigteUnterlagen(definition, kontext = {}) {
  const liste = [];
  const dazu = (name, href) => { if (href && !liste.some((eintrag) => eintrag.href === href)) liste.push({ name, href, stand: definition.textfassung || definition.stand || null }); };
  (definition.erklaerungen || []).forEach((teil) => teil.eintraege.forEach((eintrag) => {
    (eintrag.links || []).forEach((link) => dazu(link.label, link.href));
    (eintrag.gruppen || []).forEach((gruppe) => gruppe.eintraege
      .filter((unterlage) => bedingungErfuellt(unterlage.bedingung, kontext))
      .forEach((unterlage) => unterlage.dateien.forEach((datei) => dazu(datei.label, datei.href || (datei.dienstId ? `dienst:${datei.dienstId}` : null)))));
  }));
  return liste;
}

// Server-Fehlerfelder (z. B. „angaben.formular.plz“) auf Bildschirme der Maske.
export function bildschirmFuerFeld(pfad) {
  const teile = String(pfad).split('.');
  const [kopf, zweit, dritt] = teile;
  if (kopf === 'angaben') {
    if (['tarifCode', 'beginnIso', 'geburtsdatum'].includes(zweit)) return { bildschirm: 'tarif', label: zweit === 'geburtsdatum' ? 'Geburtsdatum' : 'Tarif und Beginn' };
    if (zweit === 'anrede' || (zweit === 'formular' && ['vorname', 'nachname'].includes(dritt))) return { bildschirm: 'person', label: 'Name' };
    if (zweit === 'formular' || zweit === 'krankenkasse' || zweit === 'gkv') return { bildschirm: 'anschrift', label: 'Anschrift und Kontakt' };
  }
  if (kopf === 'gesundheit') return { bildschirm: 'zusammenfassung', label: 'Gesundheitsfragen' };
  if (kopf === 'unterlagen') return { bildschirm: 'unterlagenDownload', label: 'Deine Unterlagen' };
  if (kopf === 'erklaerungen' && zweit === 'angabenBestaetigt') return { bildschirm: 'zusammenfassung', label: 'Bestätigung für die SDK' };
  if (kopf === 'zahlung' || (kopf === 'erklaerungen' && zweit === 'sepa')) return { bildschirm: 'zahlung', label: 'Zahlung und IBAN' };
  if (kopf === 'erklaerungen') return { bildschirm: 'erklaerungen', label: 'Erklärungen' };
  return null;
}

// Vollständigkeit vor dem Absenden (gleiche Regeln wie die Bildschirme).
export const gesundheitVollstaendig = (definition, kontext) => offeneGesundheitsfragen(definition, kontext).length === 0;


// Beitragsart und Betrag, wie die Zusammenfassung sie zeigt (jährlich nur,
// wenn die Zahlweise den Beitrag selbst ändert, z. B. Bayerische).
export function beitragsAnzeige(definition, daten, beitrag) {
  const jaehrlich = Boolean(definition.zahlweiseImTarif) && daten.zahlweise === 'jaehrlich';
  return { label: jaehrlich ? 'Jahresbeitrag' : 'Monatsbeitrag', betrag: beitrag?.beitrag ?? null };
}

// Auftragssatz vor dem Absenden: Der Satz der Prüfseite (Text 12) nennt den
// „oben genannten Monatsbeitrag“. Hier passend zur Zahlweise und mit Betrag.
export function auftragSatz(definition, daten, beitrag) {
  const { label, betrag } = beitragsAnzeige(definition, daten, beitrag);
  const betragText = Number.isFinite(betrag) ? ` von ${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(betrag)} EUR` : '';
  return String(definition.absenden?.satz || '').replace(/Er kostet dich den oben genannten Monatsbeitrag\./, `Er kostet dich den oben genannten ${label}${betragText}.`);
}
