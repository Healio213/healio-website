// Regelwerk der eigenen Antragsmaske /antrag/<sparte> (12.11.2026). Reine
// Logik ohne React und ohne @/-Importe, damit Node die Datei direkt laden
// kann (Tests, Attrappe des Antragsdienstes, später der Server selbst).
//
// Eine Sparte wird vollständig durch ihre Definition beschrieben
// (src/data/antrag/<sparte>.js, Aufbau siehe src/data/antrag/aufbau.js).
// Dieses Modul liest die Definition nur, es kennt keine Sparte und keinen
// Versicherer. Datenschutz: Die Funktionen speichern nichts und geben nichts
// aus, Antworten bleiben im Arbeitsspeicher des Aufrufers.

const aufCent = (wert) => Math.round(wert * 100) / 100;
const zweistellig = (zahl) => String(zahl).padStart(2, '0');

// ---------------------------------------------------------------------------
// Bedingungen
// ---------------------------------------------------------------------------

// Eine Bedingung ist ein kleines Objekt, nie Code aus fremder Hand:
//   { frage: '1a', ist: 'ja' }          Antwort gleich Wert
//   { frage: 'z1', in: ['a', 'b'] }     Antwort ist einer der Werte
//   { frage: '1a-kreuze', enthaelt: 'krebs' }  Mehrfachauswahl enthält
//   { frage: 'z1', beantwortet: true }  irgendeine Antwort
//   { tarif: ['AP1', 'AP9'] }           gewählte Tarifstufe
//   { baustein: 'ZAHN_SOFORT' }         gewählter Zusatzbaustein
//   { alterAb: 21 } / { alterBis: 70 }  Eintrittsalter laut Beitragsregel
//   { alle: [...] } / { eine: [...] } / { nicht: {...} }
// Fehlt die Bedingung, gilt sie als erfüllt. Unbekannte Formen gelten als
// nicht erfüllt, damit ein Tippfehler in einer Definition nichts freischaltet.
export function bedingungErfuellt(bedingung, kontext = {}) {
  if (bedingung === undefined || bedingung === null) return true;
  if (typeof bedingung !== 'object' || Array.isArray(bedingung)) return false;
  const {
    antworten = {}, tarif = null, alter = null, bausteine = [],
  } = kontext;
  if (Array.isArray(bedingung.alle)) return bedingung.alle.every((teil) => bedingungErfuellt(teil, kontext));
  if (Array.isArray(bedingung.eine)) return bedingung.eine.some((teil) => bedingungErfuellt(teil, kontext));
  if (bedingung.nicht !== undefined) return !bedingungErfuellt(bedingung.nicht, kontext);
  if (Array.isArray(bedingung.tarif)) return bedingung.tarif.includes(tarif);
  if (typeof bedingung.baustein === 'string') return Array.isArray(bausteine) && bausteine.includes(bedingung.baustein);
  if (Number.isFinite(bedingung.alterAb)) return Number.isFinite(alter) && alter >= bedingung.alterAb;
  if (Number.isFinite(bedingung.alterBis)) return Number.isFinite(alter) && alter <= bedingung.alterBis;
  if (typeof bedingung.frage === 'string') {
    const wert = antworten[bedingung.frage];
    if ('ist' in bedingung) return wert === bedingung.ist;
    if (Array.isArray(bedingung.in)) return bedingung.in.includes(wert);
    if ('enthaelt' in bedingung) return Array.isArray(wert) && wert.includes(bedingung.enthaelt);
    if (bedingung.beantwortet === true) return antwortVorhanden(wert);
    return false;
  }
  return false;
}

function antwortVorhanden(wert) {
  if (wert === undefined || wert === null || wert === '') return false;
  if (Array.isArray(wert)) return wert.length > 0;
  if (typeof wert === 'object') return Object.values(wert).some((teil) => String(teil ?? '').trim() !== '');
  return true;
}

// ---------------------------------------------------------------------------
// Fragen und Folgefragen
// ---------------------------------------------------------------------------

// Alle Hauptfragen, die mit den jetzigen Antworten gestellt werden (eine je
// Bildschirm). Folgefragen gehören zum Bildschirm ihrer Hauptfrage.
export function sichtbareFragen(definition, kontext = {}) {
  const fragen = definition?.gesundheit?.fragen || [];
  return fragen.filter((frage) => bedingungErfuellt(frage.bedingung, kontext));
}

// Folgefragen einer Hauptfrage, die gerade gelten (rekursiv flach).
export function sichtbareFolgefragen(frage, kontext = {}) {
  const liste = [];
  (frage?.folge || []).forEach((folge) => {
    if (!bedingungErfuellt(folge.bedingung, kontext)) return;
    liste.push(folge, ...sichtbareFolgefragen(folge, kontext));
  });
  return liste;
}

// Alle Fragen, die gerade gelten, in der Reihenfolge des Formulars.
export function alleGeltendenFragen(definition, kontext = {}) {
  return sichtbareFragen(definition, kontext).flatMap((frage) => [frage, ...sichtbareFolgefragen(frage, kontext)]);
}

// Fehlertext für eine einzelne Frage oder null.
export function frageFehler(frage, antworten = {}) {
  const wert = antworten[frage.id];
  if (frage.typ === 'janein') return wert === 'ja' || wert === 'nein' ? null : 'Bitte antworte mit Ja oder Nein.';
  if (frage.typ === 'auswahl') {
    return (frage.optionen || []).some((option) => option.id === wert) ? null : 'Bitte wähle eine Antwort.';
  }
  if (frage.typ === 'mehrfach') {
    const gewaehlt = Array.isArray(wert) ? wert.filter((id) => (frage.optionen || []).some((option) => option.id === id)) : [];
    const mindestens = Number.isInteger(frage.mindestens) ? frage.mindestens : 0;
    if (gewaehlt.length < mindestens) return frage.fehlerMindestens || 'Bitte kreuze mindestens eine Antwort an.';
    return null;
  }
  if (frage.typ === 'zahl') {
    const zahl = zahlAusText(wert);
    if (zahl === null) return frage.fehler || 'Bitte gib eine Zahl ein.';
    if (Number.isFinite(frage.min) && zahl < frage.min) return frage.fehler || `Bitte gib mindestens ${frage.min} ein.`;
    if (Number.isFinite(frage.max) && zahl > frage.max) return frage.fehler || `Bitte gib höchstens ${frage.max} ein.`;
    return null;
  }
  if (frage.typ === 'masse') {
    const werte = wert && typeof wert === 'object' ? wert : {};
    const offen = (frage.felder || []).find((feld) => {
      const zahl = feld.lesen ? feld.lesen(werte[feld.id]) : zahlAusText(werte[feld.id]);
      return zahl === null || zahl < feld.min || zahl > feld.max;
    });
    return offen ? offen.fehler : null;
  }
  if (frage.typ === 'text') return String(wert ?? '').trim().length > 0 ? null : 'Bitte fülle dieses Feld aus.';
  return null;
}

// Offene Punkte der Gesundheitsfragen. Leer heißt vollständig.
export function offeneGesundheitsfragen(definition, kontext = {}) {
  const { antworten = {} } = kontext;
  const offen = [];
  const vorspann = definition?.gesundheit?.vorspann;
  if (vorspann?.bestaetigung && antworten[vorspann.bestaetigung.key] !== true) offen.push(vorspann.bestaetigung.key);
  alleGeltendenFragen(definition, kontext).forEach((frage) => {
    if (frageFehler(frage, antworten)) offen.push(frage.id);
  });
  return offen;
}

// Antworten von Folgefragen, deren Bedingung nicht mehr gilt, fallen weg
// (wie in der Original-Strecke: „nein“ löscht die Kreuze darunter).
export function antwortenBereinigt(definition, kontext = {}) {
  const { antworten = {} } = kontext;
  const geltend = new Set(alleGeltendenFragen(definition, kontext).map((frage) => frage.id));
  const vorspannKey = definition?.gesundheit?.vorspann?.bestaetigung?.key;
  return Object.fromEntries(Object.entries(antworten).filter(([id]) => geltend.has(id) || id === vorspannKey));
}

export function zahlAusText(text) {
  if (typeof text === 'number') return Number.isFinite(text) ? text : null;
  const wert = String(text ?? '').trim();
  if (!/^\d{1,4}(?:[.,]\d*)?$/.test(wert)) return null;
  const zahl = Number(wert.replace(',', '.'));
  return Number.isFinite(zahl) ? zahl : null;
}

// ---------------------------------------------------------------------------
// Wirkung der Antworten
// ---------------------------------------------------------------------------

// Wirkungen stehen in der Definition an der Antwort:
//   janein:   wirkung: { ja: [...], nein: [...] }
//   auswahl:  optionen: [{ id, label, wirkung: [...] }]
//   mehrfach: optionen: [{ id, label, wirkung: [...] }]  (je Kreuz)
//   masse:    wirkungAus(werte) → [...]   (Tabelle aus dem Antrag, z. B. BMI)
// Eine Wirkung ist eine der Formen:
//   { art: 'zuschlag', prozent: 20, grund: 'Atemwege und Allergien' }
//   { art: 'zuschlag', euro: 9.0, grund: '…' }      fester Monatsbetrag
//   { art: 'ausschluss', text: '…' }                 wird Teil des Vertrags
//   { art: 'pruefung', text: '…' }                   geht nur mit persönlicher Prüfung
//   { art: 'keineAufnahme', text: '…' }              der Versicherer nimmt nicht an
function wirkungenDerFrage(frage, antworten) {
  const wert = antworten[frage.id];
  if (frage.typ === 'janein') return (frage.wirkung && frage.wirkung[wert]) || [];
  if (frage.typ === 'auswahl') return (frage.optionen || []).find((option) => option.id === wert)?.wirkung || [];
  if (frage.typ === 'mehrfach') {
    const gewaehlt = new Set(Array.isArray(wert) ? wert : []);
    return (frage.optionen || []).filter((option) => gewaehlt.has(option.id)).flatMap((option) => option.wirkung || []);
  }
  if (frage.typ === 'masse' && typeof frage.wirkungAus === 'function') return frage.wirkungAus(wert || {}) || [];
  if (frage.typ === 'zahl' && typeof frage.wirkungAus === 'function') return frage.wirkungAus(zahlAusText(wert)) || [];
  return [];
}

// Summe aller Wirkungen der geltenden Antworten.
// Liefert { zuschlagProzent, zuschlagEuro, gruende, ausschluesse, pruefung, keineAufnahme, jeFrage }.
export function wirkungen(definition, kontext = {}) {
  const { antworten = {} } = kontext;
  const ergebnis = {
    zuschlagProzent: 0, zuschlagEuro: 0, gruende: [], ausschluesse: [], pruefung: [], keineAufnahme: [], jeFrage: {},
  };
  alleGeltendenFragen(definition, kontext).forEach((frage) => {
    const liste = wirkungenDerFrage(frage, antworten);
    if (liste.length) ergebnis.jeFrage[frage.id] = liste;
    liste.forEach((wirkung) => {
      if (wirkung.art === 'zuschlag') {
        if (Number.isFinite(wirkung.prozent)) ergebnis.zuschlagProzent += wirkung.prozent;
        if (Number.isFinite(wirkung.euro)) ergebnis.zuschlagEuro = aufCent(ergebnis.zuschlagEuro + wirkung.euro);
        if (wirkung.grund && !ergebnis.gruende.includes(wirkung.grund)) ergebnis.gruende.push(wirkung.grund);
      } else if (wirkung.art === 'ausschluss') ergebnis.ausschluesse.push(wirkung.text);
      else if (wirkung.art === 'pruefung') ergebnis.pruefung.push(wirkung.text);
      else if (wirkung.art === 'keineAufnahme') ergebnis.keineAufnahme.push(wirkung.text);
    });
  });
  return ergebnis;
}

// Wirkung, die den Selbstabschluss stoppt (persönliche Prüfung oder keine
// Aufnahme), für genau eine Frage samt Folgefragen. Für den Hinweis auf dem
// Bildschirm der Frage.
export function stopWirkungDerFrage(frage, kontext = {}) {
  const { antworten = {} } = kontext;
  const fragen = [frage, ...sichtbareFolgefragen(frage, kontext)];
  for (const teil of fragen) {
    const stop = wirkungenDerFrage(teil, antworten).find((wirkung) => wirkung.art === 'pruefung' || wirkung.art === 'keineAufnahme');
    if (stop) return stop;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Datum, Beginn, Alter
// ---------------------------------------------------------------------------

export function parseDatum(text, heute = new Date()) {
  const wert = String(text ?? '').trim();
  const treffer = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(wert);
  if (!treffer) return null;
  const [tag, monat, jahr] = [treffer[1], treffer[2], treffer[3]].map(Number);
  const datum = new Date(jahr, monat - 1, tag);
  const echt = datum.getFullYear() === jahr && datum.getMonth() === monat - 1 && datum.getDate() === tag;
  if (!echt || jahr < 1900 || datum.getTime() > heute.getTime()) return null;
  return { tag, monat, jahr };
}

export function alterAm(geburtsdatum, stichtag) {
  if (!geburtsdatum || !(stichtag instanceof Date) || Number.isNaN(stichtag.getTime())) return null;
  let alter = stichtag.getFullYear() - geburtsdatum.jahr;
  const monat = stichtag.getMonth() + 1;
  if (monat < geburtsdatum.monat || (monat === geburtsdatum.monat && stichtag.getDate() < geburtsdatum.tag)) alter -= 1;
  return alter >= 0 ? alter : null;
}

const isoAus = (datum) => `${datum.getFullYear()}-${zweistellig(datum.getMonth() + 1)}-${zweistellig(datum.getDate())}`;
const labelAus = (datum) => `${zweistellig(datum.getDate())}.${zweistellig(datum.getMonth() + 1)}.${datum.getFullYear()}`;

// Beginnregeln der Definition: { art: 'monatsErster', abMonat: 1, bisMonat: 7 }
// ergibt die Monatsersten vom nächsten (1) bis zum siebten Monat nach heute.
// Optional rueckwirkendBis: 0 (keine Rückdatierung). Liefert
// { naechstmoeglich, weitere } wie beginnOptionen der Prüfseite.
export function beginnOptionenAus(regel = {}, heute = new Date()) {
  const ab = Number.isInteger(regel.abMonat) ? regel.abMonat : 1;
  const bis = Number.isInteger(regel.bisMonat) ? regel.bisMonat : ab;
  const liste = [];
  for (let schritt = ab; schritt <= bis; schritt += 1) {
    const datum = new Date(heute.getFullYear(), heute.getMonth() + schritt, 1);
    liste.push({
      iso: isoAus(datum), label: labelAus(datum), jahr: datum.getFullYear(), monat: datum.getMonth() + 1,
    });
  }
  return { naechstmoeglich: liste[0] || null, weitere: liste.slice(1) };
}

// Eintrittsalter nach der Beitragsregel der Definition:
//   'kalenderjahr': Jahr des Beginns minus Geburtsjahr (SDK)
//   'genau':        vollendete Lebensjahre am Tag des Beginns
export function eintrittsalter(regel, geburtsdatum, beginn) {
  if (!geburtsdatum || !beginn) return null;
  if (regel === 'genau') return alterAm(geburtsdatum, new Date(beginn.jahr, beginn.monat - 1, 1));
  return beginn.jahr - geburtsdatum.jahr;
}

// Altersgrenzen der Definition: { min, max, stichtag: 'heute' | 'beginn',
// maxZaehlung?: 'kalenderjahr' }. min gilt immer nach vollendeten Jahren am
// Stichtag (Antragsteller volljährig), max auf Wunsch als Eintrittsalter
// (Jahr des Beginns minus Geburtsjahr). Liefert null (passt) oder
// { art: 'zuJung' | 'zuAlt', text }.
export function altersgrenze(definition, geburtsdatum, { heute = new Date(), beginn = null } = {}) {
  const regel = definition?.alter;
  if (!regel || !geburtsdatum) return null;
  const stichtag = regel.stichtag === 'beginn' && beginn ? new Date(beginn.jahr, beginn.monat - 1, 1) : heute;
  const alter = alterAm(geburtsdatum, stichtag);
  if (alter === null) return null;
  if (Number.isFinite(regel.min) && alter < regel.min) return { art: 'zuJung', text: regel.hinweisZuJung };
  const alterMax = regel.maxZaehlung === 'kalenderjahr' && beginn ? beginn.jahr - geburtsdatum.jahr : alter;
  if (Number.isFinite(regel.max) && alterMax > regel.max) return { art: 'zuAlt', text: regel.hinweisZuAlt };
  return null;
}

// ---------------------------------------------------------------------------
// Beitrag
// ---------------------------------------------------------------------------

// Beitrag mit Prozentzuschlag, auf Cent wie im Antragsdienst (beitragMitZuschlag).
export function mitZuschlag(grund, prozent = 0, euro = 0) {
  const cent = Math.round(Number(grund) * 100);
  if (!Number.isFinite(cent)) return null;
  const aufschlag = Number.isFinite(prozent) ? prozent : 0;
  const prozentual = Math.round((cent * (100 + aufschlag)) / 100);
  return (prozentual + Math.round((Number.isFinite(euro) ? euro : 0) * 100)) / 100;
}

// Region aus der Postleitzahl (nur wenn die Definition Regionen kennt).
// regionen: { bereiche: [{ von: '00000', bis: '19999', region: 'stadt' }], standard?: 'land' }
export function regionAusPlz(regionen, plz) {
  if (!regionen) return null;
  const wert = String(plz ?? '').trim();
  if (!/^\d{5}$/.test(wert)) return null;
  const treffer = (regionen.bereiche || []).find((bereich) => wert >= bereich.von && wert <= bereich.bis);
  return treffer ? treffer.region : (regionen.standard ?? null);
}

// Grundbeitrag je Monat aus der Tabelle der Definition:
//   beitrag: { art: 'altersgruppen', alter: 'kalenderjahr' | 'genau',
//              gruppen: [{ von, bis, preise: { TARIF: 12.29 } | { REGION: { TARIF: … } } }],
//              regionen?: {...} }
// Liefert null, wenn ein Wert fehlt. Nie interpolieren.
export function grundbeitragAusTabelle(beitragsRegel, { tarif, alter, region = null }) {
  if (!beitragsRegel || !Number.isFinite(alter)) return null;
  const gruppe = (beitragsRegel.gruppen || []).find((eintrag) => alter >= eintrag.von && (eintrag.bis === null || eintrag.bis === undefined || alter <= eintrag.bis));
  if (!gruppe) return null;
  const preise = beitragsRegel.regionen ? gruppe.preise?.[region] : gruppe.preise;
  const wert = preise?.[tarif];
  return typeof wert === 'number' ? { gruppe, grund: wert } : null;
}

// Beitrag für den Bildschirm „Dein Beitrag“ und für die Tarifwahl.
// Die Definition kann eine eigene Rechnung mitbringen (beitrag.berechne),
// sonst gilt die Tabelle. Liefert null oder
// { tarif, alter, grundbeitrag, zuschlagProzent, zuschlagEuro, beitrag, folgejahr? }.
// Bei beitrag.art 'dienst' rechnet nur der Antragsdienst (Preisregion kennt
// allein der Versicherer). Dann liefert diese Funktion null, die Maske fragt
// den Dienst (antragApi.berechneSelbstBeitrag) und rät nie selbst.
export function berechneBeitrag(definition, {
  tarif, geburtsdatum, beginn, plz = '', antworten = {}, ohneZuschlag = false,
} = {}) {
  const regel = definition?.beitrag;
  if (!regel || regel.art === 'dienst' || !tarif || !geburtsdatum || !beginn) return null;
  const alter = eintrittsalter(regel.alter, geburtsdatum, beginn);
  const wirkung = ohneZuschlag ? { zuschlagProzent: 0, zuschlagEuro: 0, gruende: [] } : wirkungen(definition, { antworten, tarif, alter });
  if (typeof regel.berechne === 'function') {
    const eigen = regel.berechne({
      tarif, geburtsdatum, beginn, alter, zuschlagProzent: wirkung.zuschlagProzent, zuschlagEuro: wirkung.zuschlagEuro,
    });
    return eigen ? { ...eigen, tarif, alter, gruende: wirkung.gruende } : null;
  }
  const region = regionAusPlz(regel.regionen, plz);
  if (regel.regionen && !region) return null;
  const tabelle = grundbeitragAusTabelle(regel, { tarif, alter, region });
  if (!tabelle) return null;
  return {
    tarif,
    alter,
    region,
    grundbeitrag: tabelle.grund,
    zuschlagProzent: wirkung.zuschlagProzent,
    zuschlagEuro: wirkung.zuschlagEuro,
    gruende: wirkung.gruende,
    beitrag: mitZuschlag(tabelle.grund, wirkung.zuschlagProzent, wirkung.zuschlagEuro),
  };
}

// ---------------------------------------------------------------------------
// Eingaben: Person, Anschrift, Kontakt, Zahlung
// ---------------------------------------------------------------------------

// Vertrag SCHNITTSTELLE.md 10.5: Namen und Ort nur Buchstaben mit
// Leerzeichen, Punkt, Apostroph und Bindestrich.
export const NAME_MUSTER = /^\p{L}[\p{L}\p{M}' .-]{1,79}$/u;
export const KASSE_MUSTER = /^[\p{L}\p{M}\d' .&+()-]{0,80}$/u;
export const istNameText = (text) => NAME_MUSTER.test(String(text ?? '').trim());
export const istPlzText = (text) => /^\d{5}$/.test(String(text ?? '').trim());
export const istEmailText = (text) => /^[^\s@]{1,64}@[^\s@.]{1,63}(?:\.[^\s@.]{1,63}){1,4}$/.test(String(text ?? '').trim()) && String(text).trim().length <= 254;
export function istTelefonText(text) {
  const wert = String(text ?? '').trim();
  if (!/^[0-9+()/\s-]+$/.test(wert)) return false;
  const ziffern = wert.replace(/\D/g, '');
  return ziffern.length >= 6 && ziffern.length <= 16;
}
export const istStrasseText = (text) => {
  const wert = String(text ?? '').trim();
  return wert.length >= 4 && wert.length <= 120 && /\p{L}/u.test(wert) && /\d/.test(wert) && !/[<>{}]/.test(wert);
};

// IBAN: deutsche IBAN, Prüfziffer nach ISO 13616 (mod 97). Gleiche Regel wie
// src/lib/iban.js der Prüfseite, hier ohne @/-Import.
export const ibanOhneLeer = (text) => String(text ?? '').replace(/[\s-]/g, '').toUpperCase();
export function istIban(text) {
  const iban = ibanOhneLeer(text);
  if (!/^DE\d{20}$/.test(iban)) return false;
  const ziffern = `${iban.slice(4)}${iban.slice(0, 4)}`.replace(/[A-Z]/g, (buchstabe) => String(buchstabe.charCodeAt(0) - 55));
  let rest = 0;
  for (let stelle = 0; stelle < ziffern.length; stelle += 7) rest = Number(`${rest}${ziffern.slice(stelle, stelle + 7)}`) % 97;
  return rest === 1;
}
export function ibanHinweis(text) {
  const iban = ibanOhneLeer(text);
  if (iban === '') return 'Bitte gib deine IBAN ein.';
  if (!iban.startsWith('DE')) return 'Bitte gib eine deutsche IBAN ein, sie beginnt mit DE.';
  if (iban.length !== 22) return `Eine deutsche IBAN hat 22 Zeichen, hier sind es ${iban.length}.`;
  if (!istIban(iban)) return 'Da hat sich wohl ein Tippfehler eingeschlichen. Prüf die IBAN bitte noch einmal.';
  return null;
}

// Prüfung eines Personenfelds nach seinem Typ (Felder siehe aufbau.js).
export function feldFehler(feld, wert) {
  const text = String(wert ?? '').trim();
  if (!text) return feld.pflicht === false ? null : feld.fehlerLeer;
  switch (feld.typ) {
    case 'name': return istNameText(text) ? null : 'Bitte nur Buchstaben, Leerzeichen, Punkt, Apostroph oder Bindestrich.';
    case 'strasse': return istStrasseText(text) ? null : feld.fehlerLeer;
    case 'strassenname': return text.length >= 2 && text.length <= 100 && /\p{L}/u.test(text) && !/[<>{}]/.test(text) ? null : feld.fehlerLeer;
    case 'hausnummer': return /^\d{1,4}\s?[a-zA-Z]?(?:\s?[-/]\s?\d{1,4}\s?[a-zA-Z]?)?$/.test(text) ? null : 'Bitte gib eine Hausnummer ein, zum Beispiel 12 oder 12a.';
    case 'plz': return istPlzText(text) ? null : 'Bitte gib eine fünfstellige PLZ ein.';
    case 'telefon': return istTelefonText(text) ? null : feld.fehlerLeer;
    case 'email': return istEmailText(text) ? null : 'Bitte gib eine gültige E-Mail-Adresse ein.';
    case 'kasse': return KASSE_MUSTER.test(text) ? null : 'Bitte nur Buchstaben, Ziffern, Leerzeichen und . - & + ( ) verwenden.';
    default: return text.length <= 120 ? null : 'Bitte kürzer fassen.';
  }
}

// ---------------------------------------------------------------------------
// Anzeige
// ---------------------------------------------------------------------------

const euroMitCent = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
export const euro = (wert) => (Number.isFinite(wert) ? `${euroMitCent.format(wert)} EUR` : '');
