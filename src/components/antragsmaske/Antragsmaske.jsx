import React, {
  useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  altersgrenze, antwortenBereinigt, beginnOptionenAus, berechneBeitrag, eintrittsalter, euro, parseDatum,
  sichtbareFolgefragen, sichtbareFragen, stopWirkungDerFrage,
} from '@/lib/antragsmaske/regeln';
import { baueSelbstantrag, bildschirmFuerFeld, datumText } from '@/lib/antragsmaske/vertrag';
import { holeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { sammleHerkunft } from '@/lib/antragsmaske/herkunft';
import {
  AntragFehler, berechneSelbstBeitrag, fehlerText, sendeSelbstantrag,
} from '@/lib/antragApi';
import {
  Button, TRENNUNG, cx, schuetze, sofortScrollen,
} from '@/components/antrag/ui';
import SchrittTarif, { fehlerTarif } from './SchrittTarif';
import SchrittFrage, { SchrittHinweis, fehlerFrage, fehlerHinweis } from './SchrittFrage';
import SchrittBeitrag from './SchrittBeitrag';
import SchrittDaten, { fehlerAnschrift, fehlerPerson } from './SchrittDaten';
import SchrittZahlung, { fehlerZahlung } from './SchrittZahlung';
import SchrittErklaerungen, { fehlerErklaerungen } from './SchrittErklaerungen';
import SchrittZusammenfassung from './SchrittZusammenfassung';
import { TelefonAusweg } from './teile';

/**
 * Eigene Antragsmaske /antrag/<sparte> (12.11.2026), gesteuert von der
 * Produktdefinition. Ablauf: Tarif und Beitrag, Gesundheitsfragen (eine je
 * Bildschirm), Dein Beitrag, Deine Daten, Zahlung, Erklärungen und
 * Unterlagen, Zusammenfassung, Absenden, Danke.
 *
 * Datenschutz: Alle Angaben, auch Gesundheitsangaben und IBAN, leben nur im
 * Zustand dieser Komponente (Arbeitsspeicher). Kein localStorage, kein
 * sessionStorage (außer der einmal gelesenen Vorbelegung Tarif und
 * Geburtsjahr), keine Adressparameter, keine Messung, keine Protokollausgabe.
 * Erst „Absenden“ schickt alles einmal an den Antragsdienst.
 */

const SCHRITTE = {
  1: 'Tarif und Beitrag', 2: 'Gesundheitsfragen', 3: 'Dein Beitrag', 4: 'Deine Daten', 5: 'Zahlung', 6: 'Erklärungen und Unterlagen', 7: 'Zusammenfassung',
};
const SCHRITT_ANZAHL = 7;

export function startDaten(definition, vorbelegung = {}) {
  const tarifIds = definition.tarife.map((tarif) => tarif.id);
  let tarif = null;
  if (tarifIds.includes(vorbelegung.tarif)) tarif = vorbelegung.tarif;
  else if (tarifIds.includes(definition.tarifVorgabe)) tarif = definition.tarifVorgabe;
  return {
    tarif,
    bausteine: [],
    beginnArt: 'naechstmoeglich',
    beginnIso: null,
    geburtsdatum: '',
    plz: '',
    antworten: {},
    anrede: null,
    formular: {
      vorname: '', nachname: '', strasse: '', plz: '', ort: '', telefon: '', email: '', krankenkasse: '',
    },
    bestaetigungen: {},
    zahlweise: definition.zahlweiseImTarif ? definition.zahlung.zahlweisen[0]?.id ?? null : null,
    kontoinhaber: null,
    iban: '',
    erklaerungen: {},
    zeitpunkte: {},
    unterlagenGeoeffnet: {},
  };
}

// Danke-Seite (Franks Vorgabe 12.11.2026): ehrlich, ohne Fristversprechen.
export function dankePunkte(definition, email) {
  const beiDer = definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`;
  return [
    'Dein Antrag ist bei Healio eingegangen. Du bekommst gleich eine Eingangsbestätigung von Healio per E-Mail.',
    `Healio reicht deinen Antrag jetzt in deinem Namen bei ${beiDer} ein.`,
    `Die Antragsbestätigung ${beiDer} kommt per E-Mail${email ? ` an ${email}` : ''}.`,
    'Deine Unterlagen schicken wir dir zusätzlich per E-Mail.',
    definition.absenden?.vorbehalt,
  ].filter(Boolean);
}

function Danke({ definition, ergebnis, titelRef }) {
  return (
    <div className="space-y-6" data-danke="">
      <div className="flex flex-col items-start gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-home-mint/20 text-emerald-800">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 ref={titelRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">
          Danke{ergebnis.vorname ? `, ${ergebnis.vorname}` : ''}. Dein Antrag ist bei uns.
        </h1>
      </div>
      <ul className="rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-1">
        {ergebnis.kennung && <li className="flex justify-between gap-3 py-2"><span className="text-home-slate">Antragsnummer bei Healio</span><span className="font-bold" data-kennung="">{ergebnis.kennung}</span></li>}
        <li className="flex justify-between gap-3 border-t border-slate-300 py-2"><span className="text-home-slate">Stufe</span><span className="font-bold">{ergebnis.tarifName}</span></li>
        <li className="flex justify-between gap-3 border-t border-slate-300 py-2"><span className="text-home-slate">Beginn</span><span className="font-bold">{ergebnis.beginnText}</span></li>
        <li className="flex justify-between gap-3 border-t border-slate-300 py-2"><span className="text-home-slate">{ergebnis.jaehrlich ? 'Jahresbeitrag' : 'Monatsbeitrag'}</span><span className="whitespace-nowrap font-bold">{euro(ergebnis.beitrag)}</span></li>
      </ul>
      <div className="space-y-2">
        <h2 className="font-display text-xl font-extrabold text-home-midnight">So geht es weiter</h2>
        <ol className="space-y-2" data-danke-punkte="">
          {dankePunkte(definition, ergebnis.email).map((punkt, stelle) => (
            <li key={punkt.slice(0, 30)} className="flex gap-3 text-base leading-7 text-home-midnight">
              <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-home-mint/30 font-display font-extrabold">{stelle + 1}</span>
              <span className={cx(TRENNUNG, 'min-w-0 break-words')}>{schuetze(punkt)}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// pruefen (optional): Prüfseite eines am Telefon aufgenommenen Antrags
// ({ daten, beginnWahl, absenden(body), kennzeile? }). Dann startet die Maske
// mit diesen Angaben, und „Absenden“ geht an die Prüfseiten-Bestätigung.
export default function Antragsmaske({ definition, pruefen = null }) {
  const heute = useMemo(() => new Date(), []);
  const startZeit = useRef(Date.now());
  const [vorbelegung] = useState(() => (pruefen ? {} : holeVorbelegung(definition.sparte)));
  const [daten, setDaten] = useState(() => (pruefen?.daten ? { ...startDaten(definition, {}), ...pruefen.daten } : startDaten(definition, vorbelegung)));
  const [dienst, setDienst] = useState({ schluessel: null, antwort: null, fehler: false });
  const [dienstVersuch, setDienstVersuch] = useState(0);
  const [pos, setPos] = useState({ id: 'tarif', aendern: null, uebersicht: false });
  const [versucht, setVersucht] = useState({});
  const [fokusAuftrag, setFokusAuftrag] = useState(null);
  const [jaNeinGesperrt, setJaNeinGesperrt] = useState(false);
  const [sendet, setSendet] = useState(false);
  const [sendeFehler, setSendeFehler] = useState(null);
  const [beitragNeu, setBeitragNeu] = useState(null);
  const [ergebnis, setErgebnis] = useState(null);
  const [falle, setFalle] = useState('');

  const posRef = useRef(pos);
  posRef.current = pos;
  const h1Ref = useRef(null);
  const unterRef = useRef(null);
  const leisteRef = useRef(null);
  const timer = useRef(null);
  const geaendert = useRef(false);
  const tiefeRef = useRef(0);
  const sperreBis = useRef(0);

  // ---- Abgeleitete Werte -----------------------------------------------------
  const beginnWahl = useMemo(() => pruefen?.beginnWahl || beginnOptionenAus(definition.beginn, heute), [definition, heute, pruefen]);
  const beginn = daten.beginnArt === 'anderer'
    ? beginnWahl.weitere.find((option) => option.iso === daten.beginnIso) || null
    : beginnWahl.naechstmoeglich;
  const geburtsdatum = parseDatum(datumText(daten.geburtsdatum, heute) || daten.geburtsdatum, heute);
  const geburtsdatumText = datumText(daten.geburtsdatum, heute);
  const grenze = geburtsdatum ? altersgrenze(definition, geburtsdatum, { heute, beginn }) : null;
  const alter = geburtsdatum && beginn ? eintrittsalter(definition.beitrag?.alter, geburtsdatum, beginn) : null;
  const kontext = useMemo(() => ({
    antworten: daten.antworten, tarif: daten.tarif, alter, bausteine: daten.bausteine,
  }), [daten.antworten, daten.tarif, alter, daten.bausteine]);
  const tarif = definition.tarife.find((eintrag) => eintrag.id === daten.tarif) || null;
  const plzFuerPreis = definition.beitrag?.regionen ? daten.plz : '';
  const mitDienst = definition.beitrag?.art === 'dienst';

  // Beitrag vom Antragsdienst (z. B. Zahn: Preisregion kennt nur der
  // Versicherer). Nur Tarifangaben, Geburtsdatum, Beginn, PLZ; nie Antworten.
  const dienstAnfrage = mitDienst && geburtsdatum && beginn && !grenze && /^\d{5}$/.test(String(daten.plz || '')) && daten.tarif && daten.zahlweise
    ? {
      sparte: definition.sparte, versicherer: definition.versicherer.id, tarifCode: daten.tarif, bausteine: daten.bausteine, zahlweise: daten.zahlweise, geburtsdatum: geburtsdatumText, beginnIso: beginn.iso, plz: daten.plz,
    }
    : null;
  const dienstSchluessel = dienstAnfrage ? JSON.stringify(dienstAnfrage) : null;
  useEffect(() => {
    if (!dienstSchluessel) return undefined;
    const steuerung = new AbortController();
    const warte = window.setTimeout(() => {
      berechneSelbstBeitrag(JSON.parse(dienstSchluessel), { signal: steuerung.signal })
        .then((antwort) => setDienst({ schluessel: dienstSchluessel, antwort, fehler: false }))
        .catch((fehler) => { if (fehler?.name !== 'AbortError') setDienst({ schluessel: dienstSchluessel, antwort: null, fehler: true }); });
    }, 250);
    return () => { window.clearTimeout(warte); steuerung.abort(); };
  }, [dienstSchluessel, dienstVersuch]);
  const dienstJetzt = mitDienst ? {
    leer: !dienstSchluessel,
    antwort: dienst.schluessel === dienstSchluessel ? dienst.antwort : null,
    fehler: dienst.schluessel === dienstSchluessel && dienst.fehler,
    nochmal: () => setDienstVersuch((alt) => alt + 1),
  } : null;

  // Beiträge der Stufen ohne Zuschlag. Ist nur das Geburtsjahr aus der Wahl
  // bekannt, reicht es bei der Regel „Kalenderjahr“ schon für die Preise.
  const preisDatum = geburtsdatum || (vorbelegung.geburtsjahr && definition.beitrag?.alter === 'kalenderjahr' && !daten.geburtsdatum
    ? { jahr: vorbelegung.geburtsjahr, monat: 1, tag: 1 } : null);
  const preiseLokal = useMemo(() => {
    if (mitDienst || !preisDatum || !beginn || grenze) return null;
    return Object.fromEntries(definition.tarife.map((eintrag) => [eintrag.id, berechneBeitrag(definition, {
      tarif: eintrag.id, geburtsdatum: preisDatum, beginn, plz: plzFuerPreis, ohneZuschlag: true,
    })?.beitrag ?? null]));
  }, [definition, preisDatum?.jahr, preisDatum?.monat, preisDatum?.tag, beginn?.iso, plzFuerPreis, grenze]); // eslint-disable-line react-hooks/exhaustive-deps

  const beitragLokal = useMemo(() => (!mitDienst && tarif && geburtsdatum && beginn && !grenze
    ? berechneBeitrag(definition, {
      tarif: tarif.id, geburtsdatum, beginn, plz: plzFuerPreis, antworten: daten.antworten,
    })
    : null), [definition, tarif, geburtsdatum?.jahr, geburtsdatum?.monat, geburtsdatum?.tag, beginn?.iso, plzFuerPreis, daten.antworten, grenze]); // eslint-disable-line react-hooks/exhaustive-deps
  const preise = mitDienst ? dienstJetzt.antwort?.alleTarife || null : preiseLokal;
  const beitrag = mitDienst
    ? (dienstJetzt.antwort ? {
      beitrag: dienstJetzt.antwort.beitrag,
      grundbeitrag: dienstJetzt.antwort.beitrag,
      zuschlagProzent: 0,
      zuschlagEuro: 0,
      gruende: [],
      region: dienstJetzt.antwort.region,
      zahlweise: dienstJetzt.antwort.zahlweise,
      dienst: true,
    } : null)
    : beitragLokal;

  // ---- Bildschirme -----------------------------------------------------------
  const fragen = sichtbareFragen(definition, kontext);
  const bildschirme = useMemo(() => {
    const liste = [{ id: 'tarif', schritt: 1 }];
    if (definition.gesundheit.vorspann) liste.push({ id: 'hinweis', schritt: 2 });
    fragen.forEach((frage, stelle) => liste.push({
      id: `frage:${frage.id}`, schritt: 2, frage, nummer: stelle + 1,
    }));
    liste.push({ id: 'beitrag', schritt: 3 }, { id: 'person', schritt: 4 }, { id: 'anschrift', schritt: 4 }, { id: 'zahlung', schritt: 5 });
    definition.erklaerungen.forEach((teil, stelle) => liste.push({
      id: `erkl:${stelle}`, schritt: 6, teil, nummer: stelle + 1,
    }));
    liste.push({ id: 'zusammenfassung', schritt: 7 });
    return liste;
  }, [definition, fragen.map((frage) => frage.id).join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  const indexVon = (id) => bildschirme.findIndex((eintrag) => eintrag.id === id);
  const aktuell = bildschirme[Math.max(0, indexVon(pos.id))];

  function fehlerListe(id) {
    const eintrag = bildschirme.find((teil) => teil.id === id);
    if (!eintrag) return [];
    if (id === 'tarif') {
      return fehlerTarif(definition, daten, {
        heute, beginn, grenze, dienst: dienstJetzt,
      });
    }
    if (id === 'hinweis') return fehlerHinweis(definition, daten);
    if (eintrag.frage) {
      const liste = fehlerFrage(eintrag.frage, kontext);
      if (stopWirkungDerFrage(eintrag.frage, kontext)) liste.push({ key: 'stop', text: '' });
      return liste;
    }
    if (id === 'beitrag') return beitrag ? [] : [{ key: 'beitrag', text: '' }];
    if (id === 'person') return fehlerPerson(definition, daten);
    if (id === 'anschrift') return fehlerAnschrift(definition, daten);
    if (id === 'zahlung') return fehlerZahlung(definition, daten);
    if (eintrag.teil) return fehlerErklaerungen(eintrag.teil, daten);
    return [];
  }
  const maxIndex = () => {
    for (let stelle = 0; stelle < bildschirme.length; stelle += 1) if (fehlerListe(bildschirme[stelle].id).length) return stelle;
    return bildschirme.length - 1;
  };
  const maxIndexRef = useRef(maxIndex);
  maxIndexRef.current = maxIndex;
  const bildschirmeRef = useRef(bildschirme);
  bildschirmeRef.current = bildschirme;

  const fehlerJetzt = versucht[pos.id]
    ? Object.fromEntries(fehlerListe(pos.id).reverse().map((eintrag) => [eintrag.key, eintrag.text]))
    : {};

  // ---- Zustand ändern ----------------------------------------------------------
  const set = useCallback((patch) => {
    geaendert.current = true;
    setDaten((alt) => ({ ...alt, ...(typeof patch === 'function' ? patch(alt) : patch) }));
  }, []);

  const setAntwort = useCallback((id, wert) => {
    geaendert.current = true;
    setDaten((alt) => {
      const neu = { ...alt.antworten, [id]: wert };
      return {
        ...alt,
        antworten: antwortenBereinigt(definition, {
          antworten: neu, tarif: alt.tarif, alter, bausteine: alt.bausteine,
        }),
      };
    });
  }, [definition, alter]);

  // Tarifwechsel kann andere Fragen gelten lassen (Zahn: Frage 1 bei Smart
  // kürzer). Antworten auf nicht mehr gestellte Fragen fallen weg.
  useEffect(() => {
    setDaten((alt) => {
      const bereinigt = antwortenBereinigt(definition, {
        antworten: alt.antworten, tarif: alt.tarif, alter, bausteine: alt.bausteine,
      });
      return Object.keys(bereinigt).length === Object.keys(alt.antworten).length ? alt : { ...alt, antworten: bereinigt };
    });
  }, [daten.tarif]); // eslint-disable-line react-hooks/exhaustive-deps

  // Ändert sich eine Gesundheitsantwort nach der Schlusserklärung, muss sie
  // neu bestätigt werden (wie auf der Prüfseite).
  const gesundheitRef = useRef(null);
  useEffect(() => {
    const jetzt = JSON.stringify(daten.antworten);
    const vorher = gesundheitRef.current;
    gesundheitRef.current = jetzt;
    if (vorher !== null && vorher !== jetzt && daten.erklaerungen.schluss) {
      setDaten((alt) => ({ ...alt, erklaerungen: { ...alt.erklaerungen, schluss: false } }));
    }
  }, [daten.antworten]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Navigation --------------------------------------------------------------
  const wechsle = useCallback((ziel) => {
    window.clearTimeout(timer.current);
    sperreBis.current = Date.now() + 450;
    setPos(ziel);
  }, []);

  const zeige = useCallback((ziel) => {
    tiefeRef.current += 1;
    window.history.pushState({ ...window.history.state, maskePos: ziel, maskeTiefe: tiefeRef.current }, '');
    wechsle(ziel);
  }, [wechsle]);

  useEffect(() => {
    window.history.replaceState({ ...window.history.state, maskePos: { id: 'tarif', aendern: null, uebersicht: false }, maskeTiefe: 0 }, '');
    const beiZurueck = (event) => {
      const ziel = event.state?.maskePos;
      tiefeRef.current = event.state?.maskeTiefe || 0;
      if (!ziel) { wechsle({ id: 'tarif', aendern: null, uebersicht: false }); return; }
      const liste = bildschirmeRef.current;
      const grenzeIndex = maxIndexRef.current();
      const stelle = liste.findIndex((eintrag) => eintrag.id === ziel.id);
      wechsle(stelle < 0 || (stelle > grenzeIndex && !ziel.aendern) ? { id: liste[Math.max(0, grenzeIndex)].id, aendern: null, uebersicht: false } : ziel);
    };
    window.addEventListener('popstate', beiZurueck);
    return () => window.removeEventListener('popstate', beiZurueck);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const zeigeFehler = (id, offen) => {
    setVersucht((alt) => ({ ...alt, [id]: true }));
    const erster = offen.find((eintrag) => eintrag.text);
    if (erster) setFokusAuftrag({ key: erster.key, zeit: Date.now() });
  };

  const naechsterBildschirm = (id) => {
    const stelle = indexVon(id);
    return bildschirme[Math.min(bildschirme.length - 1, stelle + 1)].id;
  };

  const weiter = () => {
    if (Date.now() < sperreBis.current) return;
    const jetzt = posRef.current;
    const offen = fehlerListe(jetzt.id);
    if (offen.length > 0) { zeigeFehler(jetzt.id, offen); return; }
    if (jetzt.aendern) { zeige(jetzt.aendern); return; }
    zeige({ id: naechsterBildschirm(jetzt.id), aendern: null, uebersicht: false });
  };
  const weiterRef = useRef(weiter);
  weiterRef.current = weiter;

  const zurueck = () => {
    const jetzt = posRef.current;
    if (jetzt.aendern) { weiter(); return; }
    if (tiefeRef.current > 0) { window.history.back(); return; }
    const stelle = indexVon(jetzt.id);
    if (stelle > 0) zeige({ id: bildschirme[stelle - 1].id, aendern: null, uebersicht: false });
  };

  // Ja/Nein: nach der Antwort blättert die Maske selbst weiter, außer es
  // folgen Folgefragen auf demselben Bildschirm oder die Antwort braucht eine
  // persönliche Prüfung.
  const beantworte = (frage, wert) => {
    const jetzt = posRef.current;
    if (Date.now() < sperreBis.current) return;
    window.clearTimeout(timer.current);
    setAntwort(frage.id, wert);
    const hauptfrage = bildschirme.find((eintrag) => eintrag.id === jetzt.id)?.frage;
    if (!hauptfrage || hauptfrage.id !== frage.id) return;
    const neu = { ...kontext, antworten: { ...daten.antworten, [frage.id]: wert } };
    const folgt = sichtbareFolgefragen(frage, neu).length > 0;
    const stop = stopWirkungDerFrage(frage, neu);
    if (folgt || stop || (wert === 'ja' && frage.weiterBeiJa === false)) {
      if (folgt) {
        timer.current = window.setTimeout(() => {
          sofortScrollen(() => document.getElementById(`gruppe-${sichtbareFolgefragen(frage, neu)[0].id}`)?.scrollIntoView({ block: 'start' }));
        }, 300);
      }
      return;
    }
    timer.current = window.setTimeout(() => {
      if (posRef.current === jetzt) weiterRef.current();
    }, 300);
  };

  const aendern = (id) => {
    const rueck = { ...posRef.current };
    const ziel = id === 'erklaerungen' ? 'erkl:0' : id;
    zeige({ id: ziel, aendern: rueck, uebersicht: false });
  };
  const aendernFrage = (frageId) => {
    const rueck = { ...posRef.current, uebersicht: posRef.current.id === 'beitrag' };
    zeige({ id: `frage:${frageId}`, aendern: rueck, uebersicht: false });
  };

  // ---- Absenden ------------------------------------------------------------------
  const absenden = async () => {
    if (sendet) return;
    const grenzeIndex = maxIndex();
    if (grenzeIndex < bildschirme.length - 1) {
      zeige({ id: bildschirme[grenzeIndex].id, aendern: null, uebersicht: false });
      return;
    }
    const body = baueSelbstantrag(definition, daten, {
      beginn, beitrag, heute, dauerSekunden: (Date.now() - startZeit.current) / 1000, feld: falle,
      herkunft: sammleHerkunft({ sparte: definition.sparte, weg: 'allein', mitgebracht: vorbelegung.herkunft }),
    });
    setSendet(true);
    setSendeFehler(null);
    try {
      const antwort = pruefen ? await pruefen.absenden(body) : await sendeSelbstantrag(body);
      geaendert.current = false;
      setErgebnis({
        kennung: antwort.kennung || null,
        vorname: body.angaben.formular.vorname,
        email: body.angaben.formular.email,
        tarifName: tarif?.name,
        beginnText: beginn?.label,
        beitrag: beitrag?.beitrag,
        jaehrlich: daten.zahlweise === 'jaehrlich' && definition.zahlweiseImTarif,
      });
      // Nach dem Absenden bleibt nichts im Speicher der Seite.
      setDaten(startDaten(definition, {}));
    } catch (fehler) {
      const code = fehler instanceof AntragFehler ? fehler.code : 'unbekannt';
      if (code === 'antrag_beitrag_geaendert') {
        const d = fehler.daten || {};
        const neu = [d.beitrag, d.beitrag?.beitrag, d.beitragNeu].find((wert) => Number.isFinite(wert));
        setBeitragNeu(Number.isFinite(neu) ? neu : null);
        setSendeFehler({ titel: fehlerText(code), text: Number.isFinite(neu) ? null : 'Bitte ruf uns kurz an, dann klären wir den Beitrag zusammen.' });
      } else if (code === 'antrag_angaben_ungueltig') {
        const felder = Array.isArray(fehler.daten?.felder) ? fehler.daten.felder : [];
        const ziele = [];
        felder.forEach((pfad) => {
          const ziel = bildschirmFuerFeld(pfad);
          if (ziel && !ziele.some((eintrag) => eintrag.bildschirm === ziel.bildschirm)) ziele.push(ziel);
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

  // ---- Wirkungen -------------------------------------------------------------------
  useEffect(() => {
    if (!aktuell?.frage || aktuell.frage.typ !== 'janein') return undefined;
    setJaNeinGesperrt(true);
    const frei = window.setTimeout(() => setJaNeinGesperrt(false), 600);
    return () => window.clearTimeout(frei);
  }, [pos]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!fokusAuftrag) return;
    const feld = document.getElementById(`feld-${fokusAuftrag.key}`) || document.querySelector(`[id^="feld-${fokusAuftrag.key}-"]`);
    if (!feld) return;
    feld.focus({ preventScroll: true });
    const block = feld.closest('[data-fehlerblock]') || feld;
    sofortScrollen(() => block.scrollIntoView({ block: 'nearest' }));
  }, [fokusAuftrag]);

  const vorherPos = useRef(pos);
  useLayoutEffect(() => {
    const alt = vorherPos.current;
    vorherPos.current = pos;
    if (alt === pos || (alt.id === pos.id && alt.aendern === pos.aendern)) return;
    sofortScrollen(() => window.scrollTo({ top: 0 }));
    if (pos.id === 'beitrag' && pos.uebersicht) {
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
    if (ergebnis) {
      sofortScrollen(() => window.scrollTo({ top: 0 }));
      h1Ref.current?.focus({ preventScroll: true });
    }
  }, [ergebnis]);

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

  useLayoutEffect(() => {
    const root = document.documentElement;
    const leiste = leisteRef.current;
    if (!leiste) return undefined;
    const messen = () => {
      if (window.getComputedStyle(leiste).position === 'sticky') {
        root.style.scrollPaddingBottom = `${Math.ceil(leiste.getBoundingClientRect().height) + 12}px`;
      } else root.style.removeProperty('scroll-padding-bottom');
    };
    messen();
    window.addEventListener('resize', messen);
    return () => { window.removeEventListener('resize', messen); root.style.removeProperty('scroll-padding-bottom'); };
  });

  if (ergebnis) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
        <Danke definition={definition} ergebnis={ergebnis} titelRef={h1Ref} />
      </div>
    );
  }

  // ---- Inhalt ----------------------------------------------------------------------
  const gemeinsam = {
    definition, daten, set, fehler: fehlerJetzt, ueberschriftRef: unterRef,
  };
  let inhalt;
  if (pos.id === 'tarif') {
    inhalt = <SchrittTarif {...gemeinsam} heute={heute} beginnWahl={beginnWahl} preise={preise} grenze={grenze} vorbelegtJahr={vorbelegung.geburtsjahr} dienst={dienstJetzt} />;
  } else if (pos.id === 'hinweis') {
    inhalt = <SchrittHinweis {...gemeinsam} setAntwort={setAntwort} anzahl={fragen.length} />;
  } else if (aktuell.frage) {
    inhalt = (
      <SchrittFrage
        {...gemeinsam}
        frage={aktuell.frage}
        nummer={aktuell.nummer}
        anzahl={fragen.length}
        setAntwort={setAntwort}
        beantworte={beantworte}
        gesperrt={jaNeinGesperrt}
        kontext={kontext}
        stop={stopWirkungDerFrage(aktuell.frage, kontext)}
        weiter={weiter}
      />
    );
  } else if (pos.id === 'beitrag') {
    inhalt = (
      <SchrittBeitrag
        definition={definition}
        daten={daten}
        beitrag={beitrag}
        tarif={tarif}
        beginn={beginn}
        geburtsdatumText={geburtsdatumText}
        aendern={aendern}
        aendernFrage={aendernFrage}
        uebersichtOffen={pos.uebersicht}
        setUebersichtOffen={(offen) => setPos((alt) => ({ ...alt, uebersicht: offen }))}
        kontext={kontext}
      />
    );
  } else if (pos.id === 'person' || pos.id === 'anschrift') {
    inhalt = <SchrittDaten {...gemeinsam} teil={pos.id} geburtsdatumText={geburtsdatumText} />;
  } else if (pos.id === 'zahlung') {
    inhalt = <SchrittZahlung {...gemeinsam} />;
  } else if (aktuell.teil) {
    inhalt = <SchrittErklaerungen {...gemeinsam} teil={aktuell.teil} nummer={aktuell.nummer} anzahl={definition.erklaerungen.length} kontext={kontext} />;
  } else {
    inhalt = (
      <>
        <SchrittZusammenfassung
          definition={definition}
          daten={daten}
          kontext={kontext}
          tarif={tarif}
          beginn={beginn}
          beitrag={beitrag}
          geburtsdatumText={geburtsdatumText}
          aendern={aendern}
          aendernFrage={aendernFrage}
          ueberschriftRef={unterRef}
          absenden={absenden}
          sendet={sendet}
          sendeFehler={sendeFehler}
          beitragNeu={beitragNeu}
        />
        {/* Falle für Programme, die jedes Feld füllen. Menschen sehen sie nie. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="feld-firmenseite">Firmenseite</label>
          <input id="feld-firmenseite" type="text" tabIndex={-1} autoComplete="off" value={falle} onChange={(event) => setFalle(event.target.value)} />
        </div>
      </>
    );
  }

  const schritt = aktuell?.schritt || 1;
  let weiterText = pos.aendern ? 'Fertig' : 'Weiter';
  if (aktuell?.frage?.typ === 'janein' && !(daten.antworten[aktuell.frage.id] === 'ja' && aktuell.frage.weiterBeiJa === false)) weiterText = null;
  if (aktuell?.frage && stopWirkungDerFrage(aktuell.frage, kontext)) weiterText = null;
  if (pos.id === 'tarif' && grenze) weiterText = null;
  if (pos.id === 'tarif' && mitDienst && dienstJetzt.fehler) weiterText = null;
  if (pos.id === 'zahlung' && daten.kontoinhaber === 'andere') weiterText = null;
  if (pos.id === 'zusammenfassung' && !pos.aendern) weiterText = null;
  if (pos.id === 'beitrag' && !beitrag) weiterText = null;
  const zeigeZurueck = pos.aendern || indexVon(pos.id) > 0;

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col break-words px-4 pt-4 sm:pt-8" data-antragsmaske={definition.sparte} data-bildschirm={pos.id}>
      <div>
        <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-base">
          <span aria-hidden="true" className="min-w-0 font-display font-extrabold uppercase tracking-[0.08em] text-emerald-900">
            Schritt {schritt} von {SCHRITT_ANZAHL}
          </span>
          <span className={cx('min-w-0 text-home-slate', TRENNUNG)}>{pruefen?.kennzeile || definition.kennzeile}</span>
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
          <div className="h-full rounded-full bg-emerald-600 transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${(schritt / SCHRITT_ANZAHL) * 100}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-x-4">
          <h1 ref={h1Ref} tabIndex={-1} className="min-w-0 break-words font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">
            <span className="sr-only">Schritt {schritt} von {SCHRITT_ANZAHL}: </span>
            {schritt === 2 ? definition.gesundheit.titel : SCHRITTE[schritt]}
          </h1>
          <TelefonAusweg sparte={definition.sparte} className="-ml-1 sm:mt-1" />
        </div>
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
              <Button onClick={weiter} className="min-w-0 flex-1 md:ml-auto md:flex-none md:px-10" data-weiter="">
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
