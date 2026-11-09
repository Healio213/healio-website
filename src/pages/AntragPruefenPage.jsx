import React, {
  useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import CampaignShell from '@/components/campaign/CampaignShell';
import {
  FRAGEN_1B_1K,
  FRAGE_INDEX_1A,
  FRAGE_INDEX_ERSTE_JA_NEIN,
  FRAGE_INDEX_GROESSE,
  FRAGE_INDEX_LETZTE_JA_NEIN,
  findeTarif,
  geburtsdatumAnzeige,
  gewichtEingabeBereinigt,
  groesseEingabeBereinigt,
  istVolljaehrigAm,
  jaNeinFrageAmIndex,
  offeneFragen,
  parseGeburtsdatum,
} from '@/data/sdkAmbulantAntrag';
import {
  AntragFehler, TEXTFASSUNG, berechneBeitrag, bestaetigeAntrag, fehlerText, ladeEntwurf, tokenAusHash,
} from '@/lib/antragApi';
import { ibanBereinigt, ibanEnde } from '@/lib/iban';
import {
  Button, TRENNUNG, cx, sofortScrollen,
} from '@/components/antrag/ui';
import StepAngaben, { fehlerAngaben } from '@/components/antrag/StepAngaben';
import StepHinweis from '@/components/antrag/StepHinweis';
import StepFragen, {
  FEHLER_GEWICHT, FEHLER_GROESSE, gewichtGueltig, groesseGueltig,
} from '@/components/antrag/StepFragen';
import StepBeitrag from '@/components/antrag/StepBeitrag';
import StepBestaetigen, { fehlerBestaetigen } from '@/components/antrag/StepBestaetigen';
import {
  Bestaetigt, Laedt, LinkUngueltig, Netzfehler,
} from '@/components/antrag/Zustaende';

/**
 * Prüfseite /antrag/pruefen#<token> (09.11.2026). Der Kunde hat seinen
 * Antrag auf den ambulanten Zusatzschutz der SDK am Telefon mit Nita
 * aufgenommen. Hier prüft und ändert er seine Angaben, tippt die
 * Gesundheitsfragen selbst an, sieht den Beitrag des Antragsdienstes, gibt
 * Einwilligungen und IBAN und bestätigt. Vertrag: SCHNITTSTELLE.md 4.2.
 *
 * Datenschutz: kein Tracking, kein Pixel, nichts in localStorage. In
 * sessionStorage liegt höchstens die Schrittposition, nie Gesundheitsangaben
 * oder IBAN. Der Token bleibt in der Sprungmarke, damit Neuladen geht.
 */

const SCHRITT_TITEL = {
  1: 'Deine Angaben',
  2: 'Gesundheitsfragen der SDK',
  3: 'Dein Beitrag',
  4: 'Bestätigen',
};
const SCHRITT_ANZAHL = 4;
const SITZUNG_SCHLUESSEL = 'healio.antrag.schritt';

const START_POS = {
  schritt: 1, teil: 1, frage: 0, aendern: null, uebersicht: false,
};

const rang = (pos) => {
  if (pos.schritt === 1) return 100 + pos.teil;
  if (pos.schritt === 2) return 200 + pos.frage;
  if (pos.schritt === 3) return 300;
  return 400 + pos.teil;
};

const posAusRang = (wert) => {
  if (wert < 200) return { ...START_POS, teil: Math.max(1, wert - 100) };
  if (wert < 300) return { ...START_POS, schritt: 2, frage: wert - 200 };
  if (wert < 400) return { ...START_POS, schritt: 3 };
  return { ...START_POS, schritt: 4, teil: wert - 400 };
};

function naechste(pos) {
  if (pos.schritt === 1) return pos.teil < 3 ? { ...START_POS, teil: pos.teil + 1 } : { ...START_POS, schritt: 2 };
  if (pos.schritt === 2) return pos.frage < FRAGE_INDEX_GROESSE ? { ...START_POS, schritt: 2, frage: pos.frage + 1 } : { ...START_POS, schritt: 3 };
  if (pos.schritt === 3) return { ...START_POS, schritt: 4 };
  return { ...START_POS, schritt: 4, teil: Math.min(4, pos.teil + 1) };
}

function vorherige(pos) {
  if (pos.schritt === 1) return pos.teil > 1 ? { ...START_POS, teil: pos.teil - 1 } : null;
  if (pos.schritt === 2) return pos.frage > 0 ? { ...START_POS, schritt: 2, frage: pos.frage - 1 } : { ...START_POS, teil: 3 };
  if (pos.schritt === 3) return { ...START_POS, schritt: 2, frage: FRAGE_INDEX_GROESSE };
  return pos.teil > 1 ? { ...START_POS, schritt: 4, teil: pos.teil - 1 } : { ...START_POS, schritt: 3 };
}

const bildschirm = (pos) => `${pos.schritt}-${pos.teil}-${pos.frage}`;
const istJaNein = (pos) => pos.schritt === 2 && pos.frage >= FRAGE_INDEX_ERSTE_JA_NEIN && pos.frage <= FRAGE_INDEX_LETZTE_JA_NEIN;
const mitJaNein = (pos) => pos.schritt === 2 && pos.frage >= FRAGE_INDEX_1A && pos.frage <= FRAGE_INDEX_LETZTE_JA_NEIN;

// „ändern“ aus Beitrag oder Übersicht: Ziel je Angabe.
const AENDERN_ZIELE = {
  tarif: { schritt: 1, teil: 1, feld: 'tarif' },
  beginn: { schritt: 1, teil: 1, feld: 'beginn' },
  name: { schritt: 1, teil: 2, feld: 'anrede' },
  geburtsdatum: { schritt: 1, teil: 2, feld: 'geburtsdatum' },
  adresse: { schritt: 1, teil: 3, feld: 'strasse' },
  kontakt: { schritt: 1, teil: 3, feld: 'telefon' },
  kasse: { schritt: 1, teil: 3, feld: 'krankenkasse' },
  hinweis: { schritt: 2, frage: 0, feld: 'hinweis' },
  antworten: { schritt: 3, uebersicht: true },
  erklaerung1: { schritt: 4, teil: 1 },
  erklaerung2: { schritt: 4, teil: 2 },
  zahlung: { schritt: 4, teil: 3, feld: 'iban' },
};

// 422 felder (z. B. „formular.plz“) in „ändern“-Ziele mit einem Namen.
function feldZiel(pfad) {
  const [kopf, rest] = String(pfad).split('.');
  if (kopf === 'tarifCode') return ['tarif', 'Stufe'];
  if (kopf === 'beginnIso') return ['beginn', 'Beginn'];
  if (kopf === 'anrede' || (kopf === 'formular' && (rest === 'vorname' || rest === 'nachname'))) return ['name', 'Name'];
  if (kopf === 'geburtsdatum') return ['geburtsdatum', 'Geburtsdatum'];
  if (kopf === 'formular' && ['strasse', 'plz', 'ort'].includes(rest)) return ['adresse', 'Adresse'];
  if (kopf === 'formular') return ['kontakt', 'Telefon oder E-Mail'];
  if (kopf === 'krankenkasse' || kopf === 'gkv') return ['kasse', 'Krankenversicherung'];
  if (kopf === 'gesundheit') return ['antworten', 'Gesundheitsfragen'];
  if (kopf === 'zahlung') return ['zahlung', 'Zahlung und IBAN'];
  if (kopf === 'erklaerungen') {
    if (rest === 'hinweisOk') return ['hinweis', 'Hinweis der SDK'];
    if (rest === 'verzicht' || rest === 'vollmacht') return ['erklaerung1', 'Beratung und Auftrag'];
    if (rest === 'sepa') return ['zahlung', 'SEPA-Lastschriftmandat'];
    if (rest === 'schluss') return null;
    return ['erklaerung2', 'Einwilligungen'];
  }
  return null;
}

function startDaten(entwurf) {
  const a = entwurf?.angaben || {};
  const f = a.formular || {};
  const naechst = entwurf?.beginnOptionen?.naechstmoeglich?.iso;
  const weitere = entwurf?.beginnOptionen?.weitere || [];
  const anderer = Boolean(a.beginnIso) && a.beginnIso !== naechst && weitere.some((option) => option.iso === a.beginnIso);
  return {
    tarifCode: findeTarif(a.tarifCode) ? a.tarifCode : null,
    beginnArt: anderer ? 'anderer' : 'naechstmoeglich',
    beginnIso: anderer ? a.beginnIso : null,
    anrede: ['frau', 'herr', 'divers'].includes(a.anrede) ? a.anrede : null,
    formular: {
      vorname: f.vorname || '', nachname: f.nachname || '', strasse: f.strasse || '', plz: f.plz || '', ort: f.ort || '', telefon: f.telefon || '', email: f.email || '',
    },
    geburtsdatum: a.geburtsdatum || '',
    gkv: a.gkv === true,
    krankenkasse: a.krankenkasse || '',
    hinweisOk: false,
    antwort1a: null,
    kreuze1a: [],
    antworten: {},
    groesse: '',
    gewicht: '',
    zahlweise: null,
    kontoinhaber: null,
    iban: '',
    erklaerungen: {
      verzicht: false, vollmacht: false, gesundheitsdaten: false, schweigepflicht: null, bonitaet: false, schluss: false, sepa: false,
    },
  };
}

function gesundheitAus(daten) {
  return {
    antwort1a: daten.antwort1a,
    kreuze1a: daten.antwort1a === 'ja' ? [...daten.kreuze1a] : [],
    antworten: Object.fromEntries(FRAGEN_1B_1K.map((frage) => [frage.id, daten.antworten[frage.id] ?? null])),
    groesse: groesseEingabeBereinigt(daten.groesse),
    gewicht: gewichtEingabeBereinigt(daten.gewicht),
  };
}

function angabenAus(daten, beginn, heute, emailEntwurf) {
  const angaben = {
    tarifCode: daten.tarifCode,
    beginnIso: beginn?.iso || null,
    anrede: daten.anrede,
    // Die Mail-Adresse geht unverändert aus dem Entwurf mit (Abschnitt 10.2).
    formular: { ...Object.fromEntries(Object.entries(daten.formular).map(([key, wert]) => [key, String(wert).trim()])), email: emailEntwurf },
    geburtsdatum: geburtsdatumAnzeige(daten.geburtsdatum, heute) || daten.geburtsdatum,
    gkv: daten.gkv === true,
  };
  const kasse = String(daten.krankenkasse || '').trim();
  if (kasse) angaben.krankenkasse = kasse;
  return angaben;
}

const gueltigBisText = (iso) => {
  const treffer = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
  return treffer ? `${treffer[3]}.${treffer[2]}.${treffer[1]}` : null;
};

const sitzungLesen = () => {
  try { return JSON.parse(window.sessionStorage.getItem(SITZUNG_SCHLUESSEL) || 'null'); } catch { return null; }
};
const sitzungSchreiben = (wert) => {
  try {
    if (wert) window.sessionStorage.setItem(SITZUNG_SCHLUESSEL, JSON.stringify(wert));
    else window.sessionStorage.removeItem(SITZUNG_SCHLUESSEL);
  } catch { /* ohne Speicher geht es auch */ }
};

function AntragAblauf({ token, entwurf, beiBestaetigt, beiUngueltig }) {
  const heute = useMemo(() => new Date(), []);
  const [daten, setDaten] = useState(() => startDaten(entwurf));
  const [pos, setPos] = useState(START_POS);
  const [versucht, setVersucht] = useState({});
  const [fokusAuftrag, setFokusAuftrag] = useState(null);
  const [jaNeinGesperrt, setJaNeinGesperrt] = useState(false);
  const [stufen, setStufen] = useState(null);
  const [beitrag, setBeitrag] = useState({ schluessel: null, antwort: null, fehler: null, laedt: false });
  const [beitragVersuch, setBeitragVersuch] = useState(0);
  const [sendet, setSendet] = useState(false);
  const [sendeFehler, setSendeFehler] = useState(null);
  const [beitragNeu, setBeitragNeu] = useState(null);
  const [serverFelder, setServerFelder] = useState([]);

  const posRef = useRef(pos);
  posRef.current = pos;
  const h1Ref = useRef(null);
  const unterRef = useRef(null);
  const karteRef = useRef(null);
  const leisteRef = useRef(null);
  const timer = useRef(null);
  const geaendert = useRef(false);
  const tiefeRef = useRef(0);
  const sperreBis = useRef(0);

  const set = useCallback((patch) => {
    geaendert.current = true;
    setDaten((alt) => ({ ...alt, ...(typeof patch === 'function' ? patch(alt) : patch) }));
  }, []);

  // Ändert sich eine Gesundheitsantwort nach der Schlusserklärung, muss sie
  // neu bestätigt werden (wie im Klick-Entwurf).
  const gesundheitRef = useRef(null);
  useEffect(() => {
    const jetzt = JSON.stringify([daten.antwort1a, daten.kreuze1a, daten.antworten, daten.groesse, daten.gewicht]);
    const vorher = gesundheitRef.current;
    gesundheitRef.current = jetzt;
    if (vorher !== null && vorher !== jetzt && daten.erklaerungen.schluss) {
      setDaten((alt) => ({ ...alt, erklaerungen: { ...alt.erklaerungen, schluss: false } }));
    }
  }, [daten.antwort1a, daten.kreuze1a, daten.antworten, daten.groesse, daten.gewicht]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Abgeleitete Werte -----------------------------------------------------
  const beginnWahl = useMemo(() => ({
    naechstmoeglich: entwurf.beginnOptionen?.naechstmoeglich || { iso: '', label: '' },
    weitere: entwurf.beginnOptionen?.weitere || [],
  }), [entwurf]);
  const beginn = daten.beginnArt === 'anderer'
    ? beginnWahl.weitere.find((option) => option.iso === daten.beginnIso) || null
    : (beginnWahl.naechstmoeglich.iso ? beginnWahl.naechstmoeglich : null);
  const geburtsdatumText = geburtsdatumAnzeige(daten.geburtsdatum, heute);
  const datumOk = Boolean(parseGeburtsdatum(daten.geburtsdatum, heute));
  const minderjaehrig = datumOk && !istVolljaehrigAm(daten.geburtsdatum, heute);
  const gesundheitKomplett = offeneFragen(daten).length === 0;
  const abgeleitet = {
    heute, beginnWahl, beginn, minderjaehrig,
  };
  const emailEntwurf = entwurf.angaben?.formular?.email ?? '';

  // Beiträge der vier Stufen ohne Zuschlag (Schritt 1).
  const stufenSchluessel = datumOk && !minderjaehrig && beginn ? `${geburtsdatumText}|${beginn.iso}` : null;
  useEffect(() => {
    if (!stufenSchluessel) return undefined;
    const steuerung = new AbortController();
    const warte = window.setTimeout(() => {
      berechneBeitrag(token, { tarifCode: daten.tarifCode || 'AP1', geburtsdatum: geburtsdatumText, beginnIso: beginn.iso }, { signal: steuerung.signal })
        .then((antwort) => setStufen({ schluessel: stufenSchluessel, ...antwort }))
        .catch(() => {});
    }, 250);
    return () => { window.clearTimeout(warte); steuerung.abort(); };
  }, [stufenSchluessel, token]); // eslint-disable-line react-hooks/exhaustive-deps
  const stufenAktuell = stufen?.schluessel === stufenSchluessel ? stufen : null;

  // Beitrag mit Zuschlag (Schritt 3 und 4). Maßgeblich ist die Antwort des Dienstes.
  const beitragAnfrage = useMemo(() => {
    if (!gesundheitKomplett || !daten.tarifCode || !beginn || !datumOk || minderjaehrig) return null;
    return {
      tarifCode: daten.tarifCode, geburtsdatum: geburtsdatumText, beginnIso: beginn.iso, gesundheit: gesundheitAus(daten),
    };
  }, [gesundheitKomplett, daten, beginn, datumOk, minderjaehrig, geburtsdatumText]);
  const beitragSchluessel = beitragAnfrage ? JSON.stringify(beitragAnfrage) : null;
  useEffect(() => {
    if (!beitragSchluessel) return undefined;
    const steuerung = new AbortController();
    setBeitrag((alt) => ({ ...alt, laedt: true, fehler: null }));
    const warte = window.setTimeout(() => {
      berechneBeitrag(token, JSON.parse(beitragSchluessel), { signal: steuerung.signal })
        .then((antwort) => {
          setBeitrag({ schluessel: beitragSchluessel, antwort, fehler: null, laedt: false });
          setBeitragNeu(null);
        })
        .catch((fehler) => {
          if (fehler?.name === 'AbortError') return;
          if (fehler?.code === 'antrag_link_ungueltig') { beiUngueltig(); return; }
          setBeitrag({ schluessel: beitragSchluessel, antwort: null, fehler: fehlerText(fehler), laedt: false });
        });
    }, 200);
    return () => { window.clearTimeout(warte); steuerung.abort(); };
  }, [beitragSchluessel, beitragVersuch, token]); // eslint-disable-line react-hooks/exhaustive-deps
  const beitragAktuell = beitrag.schluessel === beitragSchluessel && beitrag.antwort ? beitrag.antwort : null;

  // ---- Prüfung je Bildschirm -------------------------------------------------
  // anzeige: zusätzlich die Felder, die der Antragsdienst zurückgewiesen hat
  // (nur markiert, sie sperren das Weiterkommen nicht).
  function fehlerListe(p, { anzeige = false } = {}) {
    if (p.schritt === 1) {
      return fehlerAngaben(p.teil, daten, {
        heute, beginn, minderjaehrig, serverFelder: anzeige ? serverFelder : [],
      });
    }
    const liste = [];
    if (p.schritt === 2) {
      if (p.frage === 0 && !daten.hinweisOk) liste.push({ key: 'hinweis', text: 'Bitte bestätige, dass du den Hinweis gelesen hast.' });
      if (p.frage === FRAGE_INDEX_1A) {
        if (daten.antwort1a !== 'ja' && daten.antwort1a !== 'nein') liste.push({ key: 'frage1a', text: 'Bitte antworte mit Ja oder Nein.' });
        else if (daten.antwort1a === 'ja' && daten.kreuze1a.length === 0) liste.push({ key: 'kreuze1a', text: 'Bitte kreuze mindestens eine Erkrankung an.' });
      }
      const frage = jaNeinFrageAmIndex(p.frage);
      if (frage && !daten.antworten[frage.id]) liste.push({ key: `frage${frage.id}`, text: 'Bitte antworte mit Ja oder Nein.' });
      if (p.frage === FRAGE_INDEX_GROESSE) {
        if (!groesseGueltig(daten.groesse)) liste.push({ key: 'groesse', text: FEHLER_GROESSE });
        if (!gewichtGueltig(daten.gewicht)) liste.push({ key: 'gewicht', text: FEHLER_GEWICHT });
      }
    }
    if (p.schritt === 3 && !beitragAktuell) liste.push({ key: 'beitrag', text: '' });
    if (p.schritt === 4) liste.push(...fehlerBestaetigen(p.teil, daten));
    return liste;
  }

  // Weitester Bildschirm, der mit den jetzigen Angaben erreichbar ist.
  function maxRang() {
    for (let teil = 1; teil <= 3; teil += 1) if (fehlerListe({ ...START_POS, teil }).length) return 100 + teil;
    for (let frage = 0; frage <= FRAGE_INDEX_GROESSE; frage += 1) if (fehlerListe({ ...START_POS, schritt: 2, frage }).length) return 200 + frage;
    if (!beitragAktuell) return 300;
    for (let teil = 1; teil <= 3; teil += 1) if (fehlerListe({ ...START_POS, schritt: 4, teil }).length) return 400 + teil;
    return 404;
  }
  const maxRangRef = useRef(maxRang);
  maxRangRef.current = maxRang;

  const fehlerJetzt = versucht[bildschirm(pos)] || (serverFelder.length > 0 && pos.schritt === 1)
    ? Object.fromEntries(fehlerListe(pos, { anzeige: true }).reverse().map((eintrag) => [eintrag.key, eintrag.text]))
    : {};

  const zeigeFehler = (p, offen) => {
    setVersucht((alt) => ({ ...alt, [bildschirm(p)]: true }));
    const erster = offen.find((eintrag) => eintrag.key !== 'beitrag');
    if (erster) setFokusAuftrag({ key: erster.key, zeit: Date.now() });
  };

  // ---- Navigation ------------------------------------------------------------
  const wechsle = useCallback((ziel) => {
    window.clearTimeout(timer.current);
    sperreBis.current = Date.now() + 450;
    setPos(ziel);
  }, []);

  const zeige = useCallback((ziel) => {
    tiefeRef.current += 1;
    window.history.pushState({ ...window.history.state, antragPos: ziel, antragTiefe: tiefeRef.current }, '');
    wechsle(ziel);
  }, [wechsle]);

  useEffect(() => {
    // Gespeicherte Schrittposition (nur innerhalb dieses Tabs), begrenzt auf
    // das, was mit den Angaben vom Telefon erreichbar ist.
    const gespeichert = sitzungLesen();
    let start = START_POS;
    if (gespeichert && gespeichert.kennung === entwurf.kennung && gespeichert.pos) {
      const wert = Math.min(rang({ ...START_POS, ...gespeichert.pos }), maxRangRef.current());
      start = posAusRang(wert);
    }
    window.history.replaceState({ ...window.history.state, antragPos: start, antragTiefe: 0 }, '');
    setPos(start);
    const beiZurueck = (event) => {
      const ziel = event.state?.antragPos;
      tiefeRef.current = event.state?.antragTiefe || 0;
      if (!ziel) { wechsle(START_POS); return; }
      const grenze = maxRangRef.current();
      wechsle(rang(ziel) > grenze && !ziel.aendern ? posAusRang(grenze) : ziel);
    };
    window.addEventListener('popstate', beiZurueck);
    return () => window.removeEventListener('popstate', beiZurueck);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    sitzungSchreiben({ kennung: entwurf.kennung, pos: { schritt: pos.schritt, teil: pos.teil, frage: pos.frage } });
  }, [pos, entwurf.kennung]);

  const weiter = () => {
    if (Date.now() < sperreBis.current) return;
    const aktuell = posRef.current;
    const offen = fehlerListe(aktuell);
    if (offen.length > 0) {
      zeigeFehler(aktuell, offen);
      return;
    }
    if (aktuell.aendern) {
      zeige(aktuell.aendern);
      return;
    }
    zeige(naechste(aktuell));
  };

  const zurueck = () => {
    const aktuell = posRef.current;
    if (aktuell.aendern) {
      weiter();
      return;
    }
    if (tiefeRef.current > 0) {
      window.history.back();
      return;
    }
    const ziel = vorherige(aktuell);
    if (ziel) zeige(ziel);
  };

  const beantworte = (id, wert) => {
    const aktuell = posRef.current;
    if (aktuell.schritt !== 2 || Date.now() < sperreBis.current) return;
    const ist1a = aktuell.frage === FRAGE_INDEX_1A;
    const frage = jaNeinFrageAmIndex(aktuell.frage);
    if (ist1a ? id !== '1a' : (!frage || frage.id !== id)) return;
    window.clearTimeout(timer.current);
    const weiterblaettern = () => zeige(aktuell.aendern || naechste(aktuell));
    if (ist1a) {
      set({ antwort1a: wert });
      timer.current = window.setTimeout(() => {
        if (posRef.current !== aktuell) return;
        if (wert === 'ja') {
          sofortScrollen(() => document.getElementById('feld-kreuze1a')?.closest('fieldset')?.scrollIntoView({ block: 'start' }));
          return;
        }
        set({ kreuze1a: [] });
        weiterblaettern();
      }, 300);
      return;
    }
    set((alt) => ({ antworten: { ...alt.antworten, [id]: wert } }));
    timer.current = window.setTimeout(() => {
      if (posRef.current === aktuell) weiterblaettern();
    }, 300);
  };

  const aendernAngabe = (was) => {
    const ziel = AENDERN_ZIELE[was];
    if (!ziel) return;
    const rueck = { ...posRef.current };
    zeige({
      ...START_POS, ...ziel, aendern: rueck,
    });
    if (ziel.feld) window.setTimeout(() => setFokusAuftrag({ key: ziel.feld, zeit: Date.now(), ruhig: true }), 60);
  };

  const aendernFrage = (index) => {
    const rueck = { ...posRef.current, uebersicht: true };
    zeige({
      ...START_POS, schritt: 2, frage: index, aendern: rueck,
    });
  };

  const setUebersichtOffen = (offen) => setPos((alt) => ({ ...alt, uebersicht: offen }));

  // ---- Absenden --------------------------------------------------------------
  const absenden = async () => {
    if (sendet) return;
    const aktuell = posRef.current;
    const offen = fehlerListe(aktuell);
    if (offen.length > 0) {
      zeigeFehler(aktuell, offen);
      return;
    }
    const grenze = maxRang();
    if (grenze < 404) {
      zeige(posAusRang(grenze));
      return;
    }
    const e = daten.erklaerungen;
    const body = {
      angaben: angabenAus(daten, beginn, heute, emailEntwurf),
      gesundheit: gesundheitAus(daten),
      zahlung: { zahlweise: daten.zahlweise, kontoinhaber: 'selbst', iban: ibanBereinigt(daten.iban) },
      versand: 'email',
      erklaerungen: {
        hinweisOk: daten.hinweisOk === true,
        verzicht: e.verzicht === true,
        vollmacht: e.vollmacht === true,
        gesundheitsdaten: e.gesundheitsdaten === true,
        schweigepflicht: e.schweigepflicht,
        bonitaet: e.bonitaet === true,
        schluss: e.schluss === true,
        sepa: e.sepa === true,
      },
      textfassung: TEXTFASSUNG,
      beitragAngezeigt: beitragAktuell.beitrag,
    };
    setSendet(true);
    setSendeFehler(null);
    setServerFelder([]);
    try {
      const ergebnis = await bestaetigeAntrag(token, body);
      geaendert.current = false;
      sitzungSchreiben(null);
      beiBestaetigt({
        kennung: ergebnis.kennung || entwurf.kennung,
        bestaetigtAm: ergebnis.bestaetigtAm,
        zusammenfassung: {
          vorname: body.angaben.formular.vorname,
          nachname: body.angaben.formular.nachname,
          tarifCode: body.angaben.tarifCode,
          beginnIso: body.angaben.beginnIso,
          zahlweise: daten.zahlweise,
          ibanEnde: ibanEnde(daten.iban).replace('…', ''),
          beitrag: beitragAktuell.beitrag,
        },
      });
    } catch (fehler) {
      const code = fehler instanceof AntragFehler ? fehler.code : 'unbekannt';
      if (code === 'antrag_beitrag_geaendert') {
        const d = fehler.daten || {};
        const neu = [d.beitrag, d.beitrag?.beitrag, d.beitragNeu].find((wert) => Number.isFinite(wert));
        if (Number.isFinite(neu)) {
          setBeitrag((alt) => ({ ...alt, antwort: { ...alt.antwort, beitrag: neu } }));
          setBeitragNeu(neu);
        } else {
          setBeitragVersuch((alt) => alt + 1);
          setSendeFehler({ titel: fehlerText(code), text: 'Bitte sieh dir den Beitrag in Schritt 3 noch einmal an.' });
        }
      } else if (code === 'antrag_schon_bestaetigt' || code === 'antrag_link_ungueltig') {
        geaendert.current = false;
        beiUngueltig(code);
      } else if (code === 'antrag_angaben_ungueltig') {
        const felder = Array.isArray(fehler.daten?.felder) ? fehler.daten.felder : [];
        setServerFelder(felder);
        const ziele = [];
        felder.forEach((pfad) => {
          const ziel = feldZiel(pfad);
          if (ziel && !ziele.some((eintrag) => eintrag.was === ziel[0])) ziele.push({ was: ziel[0], label: ziel[1] });
        });
        setSendeFehler({ titel: fehlerText(code), felder: ziele });
      } else {
        setSendeFehler({ titel: fehlerText(code) });
      }
      window.setTimeout(() => {
        const ziel = document.querySelector('[data-sendefehler], [data-beitrag-neu]');
        if (ziel) sofortScrollen(() => ziel.scrollIntoView({ block: 'center' }));
      }, 30);
    } finally {
      setSendet(false);
    }
  };

  // ---- Wirkungen -------------------------------------------------------------
  useEffect(() => {
    if (!mitJaNein(pos)) return undefined;
    setJaNeinGesperrt(true);
    const frei = window.setTimeout(() => setJaNeinGesperrt(false), 600);
    return () => window.clearTimeout(frei);
  }, [pos]);

  useEffect(() => {
    if (!fokusAuftrag) return;
    const feld = document.getElementById(`feld-${fokusAuftrag.key}`);
    if (!feld) return;
    feld.focus({ preventScroll: true });
    const block = feld.closest('[data-fehlerblock]') || feld;
    sofortScrollen(() => block.scrollIntoView({ block: fokusAuftrag.ruhig ? 'center' : 'nearest' }));
  }, [fokusAuftrag]);

  // Neuer Bildschirm: nach oben, Fokus auf die Überschrift des Teils.
  const vorherPos = useRef(pos);
  useLayoutEffect(() => {
    const alt = vorherPos.current;
    vorherPos.current = pos;
    if (alt === pos || (bildschirm(alt) === bildschirm(pos) && alt.aendern === pos.aendern)) return;
    sofortScrollen(() => window.scrollTo({ top: 0 }));
    if (pos.schritt === 3 && pos.uebersicht) {
      const titel = document.getElementById('antworten-titel');
      if (titel) {
        sofortScrollen(() => titel.scrollIntoView({ block: 'start' }));
        titel.focus({ preventScroll: true });
        return;
      }
    }
    (unterRef.current || h1Ref.current)?.focus({ preventScroll: true });
  }, [pos]);

  useEffect(() => {
    const warnen = (event) => {
      if (!geaendert.current) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnen);
    return () => window.removeEventListener('beforeunload', warnen);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Höhe der klebenden Leiste für die klebende Ja/Nein-Zeile (StepFragen).
  useLayoutEffect(() => {
    const root = document.documentElement;
    const leiste = leisteRef.current;
    if (!leiste) return undefined;
    const messen = () => {
      if (window.getComputedStyle(leiste).position === 'sticky') {
        const hoehe = Math.ceil(leiste.getBoundingClientRect().height);
        root.style.scrollPaddingBottom = `${hoehe + 12}px`;
        root.style.setProperty('--leiste-hoehe', `${hoehe}px`);
      } else {
        root.style.removeProperty('scroll-padding-bottom');
        root.style.removeProperty('--leiste-hoehe');
      }
    };
    messen();
    const beobachter = typeof ResizeObserver === 'function' ? new ResizeObserver(messen) : null;
    beobachter?.observe(leiste);
    window.addEventListener('resize', messen);
    return () => {
      beobachter?.disconnect();
      window.removeEventListener('resize', messen);
      root.style.removeProperty('scroll-padding-bottom');
      root.style.removeProperty('--leiste-hoehe');
    };
  });

  // ---- Inhalt ----------------------------------------------------------------
  const schrittProps = {
    daten, set, abgeleitet, fehler: fehlerJetzt,
  };
  const uebersicht = {
    angaben: angabenAus(daten, beginn, heute, emailEntwurf),
    geburtsdatumText,
    beginnText: beitragAktuell?.beginnText || beginn?.label,
    beitrag: beitragAktuell?.beitrag,
    zahlweise: daten.zahlweise,
  };
  let inhalt;
  if (pos.schritt === 1) {
    inhalt = <StepAngaben {...schrittProps} teil={pos.teil} ueberschriftRef={unterRef} stufen={stufenAktuell} />;
  } else if (pos.schritt === 2 && pos.frage === 0) {
    inhalt = <StepHinweis {...schrittProps} ueberschriftRef={unterRef} />;
  } else if (pos.schritt === 2) {
    inhalt = (
      <StepFragen
        {...schrittProps}
        index={pos.frage}
        ueberschriftRef={unterRef}
        karteRef={karteRef}
        beantworte={beantworte}
        gesperrt={jaNeinGesperrt}
        weiter={weiter}
        telefon={entwurf.gesundheitTelefon}
      />
    );
  } else if (pos.schritt === 3) {
    inhalt = (
      <StepBeitrag
        daten={daten}
        antwort={beitragAktuell}
        laedt={!beitragAktuell && !beitrag.fehler}
        ladeFehler={beitrag.schluessel === beitragSchluessel ? beitrag.fehler : null}
        nochmal={() => setBeitragVersuch((alt) => alt + 1)}
        geburtsdatumText={geburtsdatumText}
        uebersichtOffen={pos.uebersicht}
        setUebersichtOffen={setUebersichtOffen}
        aendern={aendernFrage}
        aendernAngabe={aendernAngabe}
      />
    );
  } else {
    inhalt = (
      <StepBestaetigen
        {...schrittProps}
        teil={pos.teil}
        ueberschriftRef={unterRef}
        uebersicht={uebersicht}
        aendernAngabe={aendernAngabe}
        absenden={absenden}
        sendet={sendet}
        sendeFehler={sendeFehler}
        beitragNeu={beitragNeu}
      />
    );
  }

  const fertigOderWeiter = pos.aendern ? 'Fertig' : 'Weiter';
  let weiterText = fertigOderWeiter;
  if (pos.schritt === 1 && pos.teil === 2 && minderjaehrig) weiterText = null;
  if (istJaNein(pos)) weiterText = null;
  if (pos.schritt === 2 && pos.frage === FRAGE_INDEX_1A && daten.antwort1a !== 'ja') weiterText = null;
  if (pos.schritt === 4 && pos.teil === 4 && !pos.aendern) weiterText = null;
  if (pos.schritt === 4 && pos.teil === 3 && daten.kontoinhaber === 'andere') weiterText = null;
  const zeigeZurueck = pos.aendern || rang(pos) > 101;
  const weiterGesperrt = pos.schritt === 3 && !beitragAktuell;
  const gueltigBis = gueltigBisText(entwurf.gueltigBis);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col break-words px-4 pt-4 sm:pt-8">
      <div>
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-base">
          <span aria-hidden="true" className="min-w-0 font-display font-extrabold uppercase tracking-[0.08em] text-emerald-900">
            Schritt {pos.schritt} von {SCHRITT_ANZAHL}
          </span>
          <span className={cx('min-w-0 text-home-slate', TRENNUNG)}>Ambulanter Zusatzschutz der SDK</span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
          <div className="h-full rounded-full bg-emerald-600 transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(pos.schritt / SCHRITT_ANZAHL) * 100}%` }} />
        </div>
        <h1 ref={h1Ref} tabIndex={-1} className="mt-3 break-words font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">
          <span className="sr-only">Schritt {pos.schritt} von {SCHRITT_ANZAHL}: </span>
          {SCHRITT_TITEL[pos.schritt]}
        </h1>
        {pos.schritt === 1 && pos.teil === 1 && gueltigBis && (
          <p className="mt-1 text-base leading-6 text-home-slate">Dein Link gilt bis {gueltigBis}.</p>
        )}
      </div>

      <div className="mt-4 pb-6 sm:mt-6">{inhalt}</div>

      {(zeigeZurueck || weiterText) && (
        <div
          ref={leisteRef}
          data-leiste=""
          className="sticky bottom-0 z-30 -mx-4 mt-auto border-t-2 border-slate-300 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:static md:mx-0 md:border-t md:bg-transparent md:px-0 md:pb-8 md:pt-6 md:backdrop-blur-none [@media(max-height:480px)]:static"
        >
          <div className="flex gap-3 md:justify-between">
            {zeigeZurueck && (
              <Button variant="secondary" onClick={zurueck} aria-label="Zurück" className="w-12 shrink-0 !px-0 md:w-auto md:!px-6">
                <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                <span className="hidden md:inline" aria-hidden="true">Zurück</span>
              </Button>
            )}
            {weiterText && (
              <Button onClick={weiter} disabled={weiterGesperrt} className="min-w-0 flex-1 md:ml-auto md:flex-none md:px-10" data-weiter="">
                {weiterText}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Automatisierte Browser ohne Sprungmarke (Prerender beim Build): Die
// vorgerenderte Seite zeigt dann „lädt“ statt „Link ungültig“, sonst sähe
// jeder Kunde diesen Satz kurz aufblitzen, bevor die Seite startet.
const ohneTokenZustand = () => (typeof navigator !== 'undefined' && navigator.webdriver ? 'laedt' : 'ungueltig');

export default function AntragPruefenPage() {
  const [zustand, setZustand] = useState({ phase: 'laedt' });
  const titelRef = useRef(null);

  const laden = useCallback(async () => {
    const token = tokenAusHash(window.location.hash);
    if (!token) {
      setZustand({ phase: ohneTokenZustand() });
      return;
    }
    setZustand({ phase: 'laedt', token });
    try {
      const entwurf = await ladeEntwurf(token);
      if (entwurf.status === 'bestaetigt') {
        sitzungSchreiben(null);
        setZustand({ phase: 'bestaetigt', token, entwurf });
      } else {
        setZustand({ phase: 'offen', token, entwurf });
      }
    } catch (fehler) {
      const ungueltig = fehler?.code === 'antrag_link_ungueltig' || [401, 403, 404, 410].includes(fehler?.status);
      setZustand({ phase: ungueltig ? 'ungueltig' : 'netzfehler', token });
    }
  }, []);

  useEffect(() => {
    laden();
    window.addEventListener('hashchange', laden);
    return () => window.removeEventListener('hashchange', laden);
  }, [laden]);

  useEffect(() => {
    if (['ungueltig', 'netzfehler', 'bestaetigt', 'abschluss'].includes(zustand.phase)) {
      sofortScrollen(() => window.scrollTo({ top: 0 }));
      titelRef.current?.focus({ preventScroll: true });
    }
  }, [zustand.phase]);

  let inhalt;
  if (zustand.phase === 'offen') {
    inhalt = (
      <AntragAblauf
        key={zustand.entwurf.kennung}
        token={zustand.token}
        entwurf={zustand.entwurf}
        beiBestaetigt={(ergebnis) => setZustand((alt) => ({ ...alt, phase: 'abschluss', ergebnis }))}
        beiUngueltig={() => laden()}
      />
    );
  } else {
    let karte;
    if (zustand.phase === 'ungueltig') karte = <LinkUngueltig titelRef={titelRef} />;
    else if (zustand.phase === 'netzfehler') karte = <Netzfehler nochmal={laden} titelRef={titelRef} />;
    else if (zustand.phase === 'abschluss') {
      karte = <Bestaetigt frisch titelRef={titelRef} {...zustand.ergebnis} />;
    } else if (zustand.phase === 'bestaetigt') {
      // Vertrag Abschnitt 10.3: nach der Bestätigung nur noch eine Zusammenfassung.
      const e = zustand.entwurf;
      karte = <Bestaetigt titelRef={titelRef} kennung={e.kennung} bestaetigtAm={e.bestaetigtAm} zusammenfassung={e.bestaetigung || null} />;
    } else karte = <Laedt />;
    inhalt = <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">{karte}</div>;
  }

  return (
    <div className="font-sans text-home-midnight">
      <SEOHead
        title="Antrag prüfen und bestätigen | Healio"
        description="Prüfe deinen Antrag auf den ambulanten Zusatzschutz und bestätige ihn."
        robots="noindex, nofollow"
      />
      <CampaignShell trustNote="Verschlüsselt übertragen">
        <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col">{inhalt}</div>
      </CampaignShell>
    </div>
  );
}
