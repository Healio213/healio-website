import React, {
  useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState,
} from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Inbox, Send, ShieldCheck,
} from 'lucide-react';
import {
  altersgrenze, antwortenBereinigt, beginnOptionenAus, berechneBeitrag, eintrittsalter, euro, parseDatum,
  sichtbareFolgefragen, sichtbareFragen, stopWirkungDerFrage, tarifAngeboten,
} from '@/lib/antragsmaske/regeln';
import { baueSelbstantrag, bildschirmFuerFeld, datumText } from '@/lib/antragsmaske/vertrag';
import { holeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { sammleHerkunft } from '@/lib/antragsmaske/herkunft';
import { zaehle } from '@/lib/anonyme-zaehler';
import {
  AntragFehler, berechneSelbstBeitrag, fehlerText, ladeSelbstUnterlagen, sendeSelbstantrag,
} from '@/lib/antragApi';
import {
  Button, Callout, LINK, NeuerTab, TRENNUNG, cx, schuetze, sofortScrollen,
} from '@/components/antrag/ui';
import SchrittTarif, { fehlerTarif, kernZeilen } from './SchrittTarif';
import SchrittFrage, { SchrittHinweis, fehlerFrage, fehlerHinweis } from './SchrittFrage';
import SchrittBeitrag from './SchrittBeitrag';
import SchrittDaten, { fehlerAnschrift, fehlerPerson } from './SchrittDaten';
import SchrittZahlung, { fehlerZahlung } from './SchrittZahlung';
import SchrittErklaerungen, { fehlerErklaerungen } from './SchrittErklaerungen';
import SchrittZusammenfassung from './SchrittZusammenfassung';
import SchrittUnterlagenDownload from './SchrittUnterlagenDownload';
import { fehlerUnterlagen } from './unterlagenPflicht';
import { TelefonAusweg } from './teile';
import {
  Begruessung, GeteilteSeite, KARTE, NitaDunkel, Schrittleiste, SchutzPanel, VertrauenPunkte,
} from './rahmen';
import { kurzName } from './anzeige';

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

// Standardablauf (Bayerische): Tarif, Gesundheitsfragen, Beitrag, Daten,
// Zahlung, Erklärungen und Unterlagen, Zusammenfassung.
function standardAblauf(definition) {
  return [
    { id: 'tarif', titel: 'Tarif und Beitrag' },
    { id: 'hinweis', titel: definition.gesundheit.titel },
    { id: 'fragen', titel: definition.gesundheit.titel },
    { id: 'beitrag', titel: 'Dein Beitrag' },
    { id: 'person', titel: 'Deine Daten' },
    { id: 'anschrift', titel: 'Deine Daten' },
    { id: 'zahlung', titel: 'Zahlung' },
    ...definition.erklaerungen.map((teil, stelle) => ({ id: `erkl:${teil.id ?? stelle}`, titel: 'Erklärungen und Unterlagen' })),
    { id: 'zusammenfassung', titel: 'Zusammenfassung' },
  ];
}

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
    // Vorauswahl wie im Original (Paket C, UKV: Versicherungsnehmer „Ja“); ohne gesundheit.vorgaben leer wie bisher.
    antworten: { ...(definition.gesundheit?.vorgaben || {}) },
    anrede: null,
    formular: {
      vorname: '', nachname: '', strasse: '', plz: '', ort: '', telefon: '', email: '', krankenkasse: '',
    },
    bestaetigungen: {},
    zahlweise: definition.zahlweiseImTarif || definition.zahlung.zahlweisen.length === 1 ? definition.zahlung.zahlweisen[0]?.id ?? null : null,
    bankname: '',
    kontoinhaber: null,
    iban: '',
    erklaerungen: {},
    zeitpunkte: {},
    unterlagenGeoeffnet: {},
  };
}

function mitVorab(start, vorabDaten) {
  if (!vorabDaten) return start;
  const neu = { ...start, ...vorabDaten };
  if (vorabDaten.antworten) neu.antworten = { ...start.antworten, ...vorabDaten.antworten };
  // Weiche (Paket C): Name aus der Rückweiche bleibt, die PLZ der Vorfragen kommt dazu.
  if (vorabDaten.plz || vorabDaten.formular) neu.formular = { ...start.formular, ...(vorabDaten.formular || {}), ...(vorabDaten.plz ? { plz: vorabDaten.plz } : {}) };
  return neu;
}

// Prüfseite: Angaben vom Telefon über die Startwerte, Antworten zusammengeführt (eine Vorauswahl der Maske bleibt, wenn das
// Telefon die Frage nicht beantwortet hat).
function mitPruefDaten(start, pruefDaten) {
  return { ...start, ...pruefDaten, ...(pruefDaten.antworten ? { antworten: { ...start.antworten, ...pruefDaten.antworten } } : {}) };
}

// Bildschirme in der Reihenfolge der Definition (ablauf, wie im Original)
// oder im Standardablauf. Leere Teile (z. B. SPU: Schritt Gesundheitsfragen entfällt)
// fallen weg; die Schrittnummer zählt die vorhandenen Abschnitte.
function baueBildschirme(definition, fragen) {
  const ablauf = definition.ablauf || standardAblauf(definition);
  const liste = [];
  let schritt = 0;
  let letzterTitel = null;
  ablauf.forEach((eintrag) => {
    let teilListe = [];
    if (eintrag.id === 'hinweis') {
      if (definition.gesundheit.vorspann && fragen.length) teilListe = [{ id: 'hinweis' }];
    } else if (eintrag.id === 'fragen') {
      teilListe = fragen.map((frage, stelle) => ({ id: `frage:${frage.id}`, frage, nummer: stelle + 1 }));
    } else if (eintrag.id === 'unterlagenDownload') {
      if (definition.unterlagenDownload) teilListe = [{ id: 'unterlagenDownload' }];
    } else if (eintrag.id.startsWith('erkl:')) {
      const schluessel = eintrag.id.slice(5);
      const teil = definition.erklaerungen.find((t, stelle) => (t.id ?? String(stelle)) === schluessel);
      if (teil) teilListe = [{ id: eintrag.id, teil }];
    } else teilListe = [{ id: eintrag.id }];
    if (!teilListe.length) return;
    if (eintrag.titel !== letzterTitel) { schritt += 1; letzterTitel = eintrag.titel; }
    teilListe.forEach((teil) => liste.push({ ...teil, schritt, titel: eintrag.titel }));
  });
  // Teile der Erklärungen innerhalb eines Abschnitts zählen („Teil 2 von 3“).
  liste.filter((eintrag) => eintrag.teil).forEach((eintrag) => {
    const gruppe = liste.filter((anderer) => anderer.teil && anderer.schritt === eintrag.schritt);
    eintrag.nummer = gruppe.indexOf(eintrag) + 1;
    eintrag.anzahl = gruppe.length;
  });
  return liste;
}

// Danke-Seite (Franks Vorgabe 12.11.2026): ehrlich, ohne Fristversprechen.
export function dankePunkte(definition, email, mitAntrag = true) {
  const beiDer = definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`;
  return [
    'Dein Antrag ist bei Healio eingegangen. Du bekommst gleich eine Eingangsbestätigung von Healio per E-Mail.',
    // Nachbesserung 20.11.2026: „als Nächstes“ statt „jetzt“, Healio reicht nach einer Prüfung von Hand ein.
    `Healio reicht deinen Antrag als Nächstes in deinem Namen bei ${beiDer} ein.`,
    // 22.11.2026 (Zahn an): Dass die UKV eine Antragsbestätigung per E-Mail schickt, ist nicht belegt (Plan Teil 2.9 Nr. 13,
    // die Eingangsmail sagt es darum auch nicht). Bei der UKV steht hier derselbe Satz wie in der Eingangsmail.
    definition.versicherer.id === 'ukv'
      ? `Nimmt die ${definition.versicherer.kurz} deinen Antrag an, schickt sie dir die Police direkt.`
      : `Die Antragsbestätigung ${beiDer} kommt per E-Mail${email ? ` an ${email}` : ''}.`,
    mitAntrag ? 'In unserer Eingangsbestätigung steht ein geschützter Link zu deinem Antrag und allen Unterlagen.' : 'In unserer Eingangsbestätigung steht ein geschützter Link zu allen Unterlagen.',
    definition.absenden?.vorbehalt,
  ].filter(Boolean);
}

// „Mein Antrag“ (Paket 1 Punkt 1): das PDF aus der Antwort des Dienstes, nur auf
// dieser Seite. Es entsteht erst beim Klick als Datei im Browser.
function MeinAntrag({ datei }) {
  const laden = () => {
    try {
      const roh = window.atob(datei.pdf);
      const bytes = new Uint8Array(roh.length);
      for (let stelle = 0; stelle < roh.length; stelle += 1) bytes[stelle] = roh.charCodeAt(stelle);
      const adresse = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = adresse;
      link.download = datei.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(adresse), 4000);
    } catch { /* bleibt über den Link in der Mail abrufbar */ }
  };
  return (
    <div className="mt-6 flex flex-col gap-3 rounded-[1.2rem] bg-home-ice p-4 ring-1 ring-emerald-900/10 sm:flex-row sm:items-center sm:justify-between" data-mein-antrag="">
      <div className="flex min-w-0 items-start gap-3">
        <FileText className="mt-0.5 h-6 w-6 shrink-0 text-emerald-700" aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-display text-lg font-extrabold leading-snug text-home-midnight">Mein Antrag</p>
          <p className="text-base leading-6 text-home-slate">Hier sind alle deine Angaben und Erklärungen als PDF. Am besten speicherst du es gleich ab.</p>
        </div>
      </div>
      <Button variant="secondary" onClick={laden} className="shrink-0" data-mein-antrag-laden="">
        <Download className="h-5 w-5" aria-hidden="true" />
        PDF herunterladen
      </Button>
    </div>
  );
}

// Die Punkte bleiben wortgleich (dankePunkte); die Seite ordnet sie in drei Schritte.
function Danke({ definition, ergebnis, titelRef }) {
  const punkte = dankePunkte(definition, ergebnis.email, Boolean(ergebnis.meinAntrag));
  const vorbehalt = definition.absenden?.vorbehalt;
  const schritte = [
    { icon: Send, titel: 'Wir reichen ein', texte: punkte.slice(0, 2) },
    // Ebene 1, B9: eingegangen heißt nicht angenommen (absenden.nachEingang).
    { icon: ShieldCheck, titel: definition.absenden?.nachEingang || definition.versicherer.id === 'ukv' ? `Die ${definition.versicherer.kurz} entscheidet` : `Die ${definition.versicherer.kurz} bestätigt`, texte: [punkte[2], definition.absenden?.nachEingang] },
    { icon: Inbox, titel: 'Unterlagen per E-Mail', texte: [punkte[3], 'Der Link gilt, solange wir deinen Antrag speichern.'] },
  ];
  return (
    <div className="space-y-6" data-danke="">
      <div className={cx(KARTE, 'p-6 sm:p-10')}>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-home-mint text-home-midnight shadow-[0_12px_24px_-8px_rgba(37,201,144,0.6)]">
            <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h1 ref={titelRef} tabIndex={-1} className="font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">
              Danke{ergebnis.vorname ? `, ${ergebnis.vorname}` : ''}. Dein Antrag ist bei uns.
            </h1>
            {ergebnis.kennung && (
              <p className="mt-1 text-base text-home-slate">Deine Antragskennung: <span className="whitespace-nowrap font-bold text-home-midnight" data-kennung="">{ergebnis.kennung}</span></p>
            )}
          </div>
        </div>
        {ergebnis.meinAntrag && <MeinAntrag datei={ergebnis.meinAntrag} />}
        <dl className="mt-6 grid gap-px overflow-hidden rounded-[1.2rem] bg-home-midnight/10 sm:grid-cols-3">
          <div className="bg-home-ice px-4 py-3"><dt className="text-base text-home-slate">Tarif bei {schuetze(definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`)}</dt><dd className="font-bold">{ergebnis.tarifName}</dd></div>
          <div className="bg-home-ice px-4 py-3"><dt className="text-base text-home-slate">Beginn</dt><dd className="font-bold">{ergebnis.beginnText}</dd></div>
          <div className="bg-home-ice px-4 py-3"><dt className="text-base text-home-slate">{ergebnis.jaehrlich ? 'Jahresbeitrag' : 'Monatsbeitrag'}</dt><dd className="whitespace-nowrap font-bold">{euro(ergebnis.beitrag)}</dd></div>
        </dl>
      </div>
      <div className={cx(KARTE, 'p-6 sm:p-10')}>
        <h2 className="font-display text-xl font-extrabold text-home-midnight sm:text-2xl">So geht es weiter</h2>
        <ol className="mt-5 grid gap-5 md:grid-cols-3" data-danke-punkte="">
          {schritte.map(({ icon: Icon, titel, texte }, stelle) => (
            <li key={titel} className="relative rounded-[1.2rem] bg-home-ice p-4 ring-1 ring-emerald-900/10">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-home-midnight text-home-mint"><Icon className="h-5 w-5" /></span>
                <p className="font-display text-lg font-extrabold leading-snug text-home-midnight"><span className="sr-only">{stelle + 1}. </span>{titel}</p>
              </div>
              {texte.filter(Boolean).map((text) => (
                <p key={text.slice(0, 30)} className={cx('mt-2 text-base leading-7 text-home-midnight', TRENNUNG)}>{schuetze(text)}</p>
              ))}
            </li>
          ))}
        </ol>
        {vorbehalt && <p className={cx('mt-5 text-base leading-7 text-home-slate', TRENNUNG)}>{schuetze(vorbehalt)}</p>}
      </div>
    </div>
  );
}

// pruefen (optional): Prüfseite eines am Telefon aufgenommenen Antrags
// ({ daten, beginnWahl, absenden(body), kennzeile? }). Dann startet die Maske
// mit diesen Angaben, und „Absenden“ geht an die Prüfseiten-Bestätigung.
// vorab (optional, Zahn-Strecke): { daten, vorbelegt: [Frage-ids], vorbelegung }
// aus der Vorabfrage. daten überschreibt die Startwerte (Tarif, Baustein,
// Geburtsdatum, PLZ, Antworten); vorbelegt markiert Antworten, die der Kunde
// im Wortlaut des Versicherers nur noch bestätigt.
export default function Antragsmaske({ definition, pruefen = null, vorab = null }) {
  const heute = useMemo(() => new Date(), []);
  const startZeit = useRef(Date.now());
  const [vorbelegung] = useState(() => (pruefen ? {} : vorab?.vorbelegung || holeVorbelegung(definition.pfad || definition.sparte)));
  const [daten, setDaten] = useState(() => (pruefen?.daten
    // Leere Angaben vom Telefon überschreiben keine Vorgabe der Maske (z. B. Zahlweise monatlich, Vorauswahl einer Frage).
    ? mitPruefDaten(startDaten(definition, {}), Object.fromEntries(Object.entries(pruefen.daten).filter(([, wert]) => wert !== null && wert !== undefined && wert !== '')))
    : mitVorab(startDaten(definition, vorbelegung), vorab?.daten)));
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
  const [bestaetigungFehler, setBestaetigungFehler] = useState(false);
  const schlussKey = definition.absenden?.bestaetigung?.key || null;

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
  // Paket C (1.2 Nr. 7): Auf dem Weg über die Weiche bietet die Maske keinen Termin an, an dem der Kunde aus der Grenze der Gesellschaft fiele.
  const beginnWahl = useMemo(() => {
    const roh = pruefen?.beginnWahl || beginnOptionenAus(definition.beginn, heute);
    const erlaubt = !pruefen && vorab?.beginnErlaubt;
    if (!erlaubt) return roh;
    return { ...roh, weitere: roh.weitere.filter((option) => erlaubt(option)), frueher: roh.frueher && erlaubt(roh.frueher) ? roh.frueher : null };
  }, [definition, heute, pruefen]); // eslint-disable-line react-hooks/exhaustive-deps
  const beginn = daten.beginnArt === 'anderer'
    ? [...beginnWahl.weitere, beginnWahl.frueher].filter(Boolean).find((option) => option.iso === daten.beginnIso) || null
    : beginnWahl.naechstmoeglich;
  const geburtsdatum = parseDatum(datumText(daten.geburtsdatum, heute) || daten.geburtsdatum, heute);
  const geburtsdatumText = datumText(daten.geburtsdatum, heute);
  // Paket C (C8, C11): Tarife, die das Original für Geburtsdatum und Beginn nicht anbietet (Mindestbeitrag, Altersregel je Tarif),
  // zeigt die Maske nicht. Bietet sie keinen an, gilt das wie eine Altersgrenze (gemeinsam aufnehmen).
  const angeboten = useMemo(() => (geburtsdatum && beginn
    ? Object.fromEntries(definition.tarife.map((eintrag) => [eintrag.id, tarifAngeboten(definition, {
      tarif: eintrag.id, geburtsdatum, beginn, plz: definition.beitrag?.regionen ? daten.plz : '', heute,
    })]))
    : null), [definition, geburtsdatum?.jahr, geburtsdatum?.monat, geburtsdatum?.tag, beginn?.iso, daten.plz, heute]); // eslint-disable-line react-hooks/exhaustive-deps
  const keinTarif = angeboten && Object.values(angeboten).every((wert) => wert === false);
  const grenze = geburtsdatum
    ? altersgrenze(definition, geburtsdatum, { heute, beginn }) || (keinTarif ? { art: 'gemeinsam', text: definition.alter?.hinweisKeinTarif || 'Für dein Alter nehmen wir den Antrag gemeinsam auf.' } : null)
    : null;
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
        // Ebene 1, B3: „antrag_preis_nicht_bestaetigt“ (Preisregion nicht prüfbar) bekommt einen eigenen Hinweis.
        .catch((fehler) => { if (fehler?.name !== 'AbortError') setDienst({ schluessel: dienstSchluessel, antwort: null, fehler: fehler?.code === 'antrag_preis_nicht_bestaetigt' ? fehler.code : true }); });
    }, 250);
    return () => { window.clearTimeout(warte); steuerung.abort(); };
  }, [dienstSchluessel, dienstVersuch]);
  // Pflicht-Downloads (SDK): Die PDFs kommen über den Antragsdienst, je Produkt und Tarif.
  const [unterlagenDienst, setUnterlagenDienst] = useState({ schluessel: null, liste: null, fehler: false });
  const [unterlagenVersuch, setUnterlagenVersuch] = useState(0);
  const unterlagenSchluessel = definition.unterlagenDownload && daten.tarif ? `${definition.unterlagenDownload.produkt}|${daten.tarif}` : null;
  useEffect(() => {
    if (!unterlagenSchluessel) return undefined;
    const steuerung = new AbortController();
    ladeSelbstUnterlagen({ produkt: definition.unterlagenDownload.produkt, tarifCode: daten.tarif }, { signal: steuerung.signal })
      .then((antwort) => setUnterlagenDienst({ schluessel: unterlagenSchluessel, liste: (Array.isArray(antwort.unterlagen) ? antwort.unterlagen : []).filter((u) => u.pflichtDownload !== false), fehler: false }))
      .catch((fehler) => { if (fehler?.name !== 'AbortError') setUnterlagenDienst({ schluessel: unterlagenSchluessel, liste: null, fehler: true }); });
    return () => steuerung.abort();
  }, [unterlagenSchluessel, unterlagenVersuch]); // eslint-disable-line react-hooks/exhaustive-deps
  const unterlagenJetzt = {
    liste: unterlagenDienst.schluessel === unterlagenSchluessel ? unterlagenDienst.liste : null,
    fehler: unterlagenDienst.schluessel === unterlagenSchluessel && unterlagenDienst.fehler,
    nochmal: () => setUnterlagenVersuch((alt) => alt + 1),
    erwartet: definition.unterlagenDownload?.liste?.(daten.tarif) || [],
  };

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
    return Object.fromEntries(definition.tarife.map((eintrag) => [eintrag.id, angeboten?.[eintrag.id] === false ? null : berechneBeitrag(definition, {
      tarif: eintrag.id, geburtsdatum: preisDatum, beginn, plz: plzFuerPreis, ohneZuschlag: true,
    })?.beitrag ?? null]));
  }, [definition, preisDatum?.jahr, preisDatum?.monat, preisDatum?.tag, beginn?.iso, plzFuerPreis, grenze, angeboten]); // eslint-disable-line react-hooks/exhaustive-deps

  const beitragLokal = useMemo(() => (!mitDienst && tarif && geburtsdatum && beginn && !grenze && angeboten?.[tarif.id] !== false
    ? berechneBeitrag(definition, {
      tarif: tarif.id, geburtsdatum, beginn, plz: plzFuerPreis, antworten: daten.antworten,
    })
    : null), [definition, tarif, geburtsdatum?.jahr, geburtsdatum?.monat, geburtsdatum?.tag, beginn?.iso, plzFuerPreis, daten.antworten, grenze]); // eslint-disable-line react-hooks/exhaustive-deps
  // Dienst (12.2) nennt die Beiträge aller Tarife „alleStufen“, die Attrappe zusätzlich „alleTarife“.
  const preise = mitDienst ? dienstJetzt.antwort?.alleStufen || dienstJetzt.antwort?.alleTarife || null : preiseLokal;
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
  // Bildschirme siehe baueBildschirme.
  const bildschirme = useMemo(() => baueBildschirme(definition, fragen), [definition, fragen.map((frage) => frage.id).join('|')]); // eslint-disable-line react-hooks/exhaustive-deps
  // Nachbesserung 20.11.2026: Vor der Tarifwahl zählt die Schrittleiste die Gesundheitsfragen mit, wenn eine
  // Stufe sie hat (SDK stationär: SP1 und SP2 mit, SPU ohne). Sonst stand dort „von 9“ und nach der Wahl „von 10“.
  // Nur Anzeige: Ohne Stufe geht es nicht über den ersten Schritt hinaus.
  const fragenVorWahl = tarif ? null : definition.tarife
    .map((eintrag) => sichtbareFragen(definition, { ...kontext, tarif: eintrag.id }))
    .reduce((laengste, liste) => (liste.length > laengste.length ? liste : laengste), fragen);
  const bildschirmeAnzeige = fragenVorWahl && fragenVorWahl.length > fragen.length ? baueBildschirme(definition, fragenVorWahl) : bildschirme;
  const schrittAnzahl = bildschirmeAnzeige.length ? bildschirmeAnzeige[bildschirmeAnzeige.length - 1].schritt : 1;
  const indexVon = (id) => bildschirme.findIndex((eintrag) => eintrag.id === id);
  const aktuell = bildschirme[Math.max(0, indexVon(pos.id))];

  function fehlerListe(id) {
    const eintrag = bildschirme.find((teil) => teil.id === id);
    if (!eintrag) return [];
    if (id === 'tarif') {
      return fehlerTarif(definition, daten, {
        heute, beginn, grenze, dienst: dienstJetzt, angeboten,
      });
    }
    if (id === 'hinweis') return fehlerHinweis(definition, daten);
    if (id === 'unterlagenDownload') {
      return fehlerUnterlagen({
        erwartet: unterlagenJetzt.erwartet, liste: unterlagenJetzt.liste, geoeffnet: daten.unterlagenGeoeffnet, text: definition.unterlagenDownload.fehler,
      });
    }
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
    // Weiche (1.7): Zurück auf dem ersten Maskenschritt führt zur Weiche; die Eingaben gehen mit, falls die Gesellschaft bleibt.
    if (vorab?.zurueck && indexVon(jetzt.id) <= 0) { vorab.zurueck(daten); return; }
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
    // Bestätigungssatz der SDK: ohne den Haken des Kunden geht nichts ab.
    if (schlussKey && daten.erklaerungen?.[schlussKey] !== true) {
      setBestaetigungFehler(true);
      setFokusAuftrag({ key: schlussKey, zeit: Date.now() });
      return;
    }
    const body = baueSelbstantrag(definition, { ...daten, unterlagenDienst: unterlagenJetzt.liste || [] }, {
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
        tarifName: [tarif?.name, ...(definition.bausteine || []).filter((baustein) => daten.bausteine?.includes(baustein.id)).map((baustein) => baustein.name)].filter(Boolean).join(' mit '),
        beginnText: beginn?.label,
        beitrag: beitrag?.beitrag,
        jaehrlich: daten.zahlweise === 'jaehrlich' && definition.zahlweiseImTarif,
        // „Mein Antrag“ als PDF vom Antragsdienst (nur hier und über den geschützten Link, nie per Mail).
        meinAntrag: antwort.meinAntrag && typeof antwort.meinAntrag.pdf === 'string' ? { name: String(antwort.meinAntrag.name || 'Mein Antrag.pdf'), pdf: antwort.meinAntrag.pdf } : null,
      });
      // Abgeschickt zählen (21.11.2026): nur der anonyme Zähler ohne Cookies und ohne Zustimmung,
      // wie beim Klick in den Antrag (LeadCaptureProvider) Ereignis antragsweg mit <sparte>-allein,
      // aber mit der Antragsseite als Pfad. Kein Tarif, keine Antwort, keine Person.
      // Die Prüfseite (Telefonantrag) zählt nicht. Über die Zahn-Weiche zählt immer /antrag/zahn (22.11.2026),
      // damit der Zähler nicht verrät, welche Gesellschaft die Antworten zu den Zähnen ergeben haben.
      if (!pruefen) zaehle('antragsweg', { vonPfad: vorab?.weiche ? '/antrag/zahn' : `/antrag/${definition.pfad || definition.sparte}`, ziel: `${definition.sparte}-allein` });
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
          const ziel = bildschirmFuerFeld(pfad, definition);
          if (ziel && !ziele.some((eintrag) => eintrag.bildschirm === ziel.bildschirm)) ziele.push(ziel);
        });
        setSendeFehler({ titel: fehlerText(code), felder: ziele });
      } else {
        // Nachbesserung 20.11.2026: Bei Verbindungs- und sonstigen Fehlern zeigt der Hinweis auch den Termin.
        setSendeFehler({ titel: fehlerText(code), termin: true });
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
      <GeteilteSeite
        data-danke-seite=""
        rechts={(
          <>
            <VertrauenPunkte definition={definition} />
            <NitaDunkel sparte={definition.sparte} />
          </>
        )}
      >
        <div className="pb-12"><Danke definition={definition} ergebnis={ergebnis} titelRef={h1Ref} /></div>
      </GeteilteSeite>
    );
  }

  // ---- Rückweiche und Hinweise der Weiche (Paket C, 1.7 und 2.7) --------------------
  // Lehnt eine Antwort ab: erst ein anderer Tarif derselben Gesellschaft ohne diese Wirkung (Stufe wechseln, 2.6), dann die
  // Rückweiche der Zahn-Strecke (vorab.beiAblehnung). Nie ein Wechsel ohne Klick des Kunden.
  function rueckweicheFuer(frage) {
    const stop = stopWirkungDerFrage(frage, kontext);
    if (!stop || pruefen || !vorab?.weiche) return null;
    if (Array.isArray(stop.tarif)) {
      const andere = definition.tarife.filter((eintrag) => !stop.tarif.includes(eintrag.id) && angeboten?.[eintrag.id] !== false
        && !stopWirkungDerFrage(frage, { ...kontext, tarif: eintrag.id }));
      if (andere.length) {
        return {
          art: 'stufe', text: vorab.stufeText, knopf: vorab.stufeKnopf, onKlick: () => zeige({ id: 'tarif', aendern: null, uebersicht: false }),
        };
      }
    }
    return vorab.beiAblehnung?.({ frageId: frage.id, wert: daten.antworten[frage.id], daten, tarif: daten.tarif }) || null;
  }
  let weicheHinweis = null;
  if (vorab?.weiche && !pruefen && tarif && beginn) {
    if (pos.id === 'tarif' && vorab.preiseWeiche?.beginnIso && beginn.iso !== vorab.preiseWeiche.beginnIso && daten.zahlweise !== 'jaehrlich') {
      const alt = vorab.preiseWeiche.stufen?.[tarif.id];
      const neu = preise?.[tarif.id];
      if (Number.isFinite(alt) && Number.isFinite(neu) && Math.abs(alt - neu) > 0.004) weicheHinweis = vorab.hinweisBeginn?.(beginn.label, euro(alt), euro(neu));
    }
    if (pos.id === 'beitrag' && vorab.zaehne && daten.antworten.TF0021 !== undefined && daten.antworten.TF0021 !== vorab.zaehne && beitrag && geburtsdatum) {
      const vorher = berechneBeitrag(definition, {
        tarif: tarif.id, geburtsdatum, beginn, plz: plzFuerPreis, antworten: { ...daten.antworten, TF0021: vorab.zaehne },
      })?.beitrag;
      if (Number.isFinite(vorher) && Math.abs(vorher - beitrag.beitrag) > 0.004) weicheHinweis = vorab.hinweisZaehne?.(euro(vorher), euro(beitrag.beitrag), daten.antworten.TF0021);
    }
  }

  // ---- Inhalt ----------------------------------------------------------------------
  const gemeinsam = {
    definition, daten, set, fehler: fehlerJetzt, ueberschriftRef: unterRef,
  };
  let inhalt;
  if (pos.id === 'tarif') {
    inhalt = <SchrittTarif {...gemeinsam} heute={heute} beginnWahl={beginnWahl} preise={preise} grenze={grenze} angeboten={angeboten} vorbelegtJahr={vorbelegung.geburtsjahr} dienst={dienstJetzt} empfohlen={vorab?.empfohlen} />;
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
        vorbelegt={Boolean(vorab?.vorbelegt?.includes(aktuell.frage.id) && daten.antworten[aktuell.frage.id] !== undefined)}
        vorbelegtVon={vorab?.quelle}
        rueckweiche={rueckweicheFuer(aktuell.frage)}
        ohneUkvAusweg={Boolean(vorab?.weiche && !pruefen)}
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
    inhalt = <SchrittErklaerungen {...gemeinsam} teil={aktuell.teil} nummer={aktuell.nummer} anzahl={aktuell.anzahl} kontext={kontext} />;
  } else if (pos.id === 'unterlagenDownload') {
    inhalt = <SchrittUnterlagenDownload {...gemeinsam} unterlagen={unterlagenJetzt} />;
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
          setBestaetigung={(wert) => {
            setBestaetigungFehler(false);
            set((alt) => ({
              erklaerungen: { ...alt.erklaerungen, [schlussKey]: wert },
              zeitpunkte: { ...alt.zeitpunkte, [schlussKey]: wert ? new Date().toISOString() : undefined },
            }));
          }}
          bestaetigungFehler={bestaetigungFehler}
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
  // Ja/Nein blättert selbst weiter; „Weiter“ nur, wenn nach „ja“ Folgefragen oder Ankreuzlisten offen sind.
  const mitFolge = aktuell?.frage && daten.antworten[aktuell.frage.id] === 'ja'
    && (aktuell.frage.weiterBeiJa === false || sichtbareFolgefragen(aktuell.frage, kontext).length > 0);
  if (aktuell?.frage?.typ === 'janein' && !mitFolge) weiterText = null;
  if (aktuell?.frage && stopWirkungDerFrage(aktuell.frage, kontext)) weiterText = null;
  if (pos.id === 'tarif' && grenze) weiterText = null;
  if (pos.id === 'tarif' && mitDienst && dienstJetzt.fehler) weiterText = null;
  if (pos.id === 'zahlung' && daten.kontoinhaber === 'andere') weiterText = null;
  if (pos.id === 'zusammenfassung' && !pos.aendern) weiterText = null;
  if (pos.id === 'beitrag' && !beitrag) weiterText = null;
  const zeigeZurueck = pos.aendern || indexVon(pos.id) > 0 || Boolean(vorab?.zurueck);

  // Abschnitte mit Kurznamen für die Schrittleiste (reine Anzeige).
  const abschnitte = [];
  bildschirmeAnzeige.forEach((eintrag) => { if (!abschnitte[eintrag.schritt - 1]) abschnitte[eintrag.schritt - 1] = { name: kurzName(eintrag.titel) }; });

  // Beitrag für „Dein Schutz“ und die Handy-Leiste. Vor dem Beitragsbildschirm
  // zeigt die Maske nur den Beitrag aus Schritt 1 (ohne Zuschlag), nie einen
  // laufenden Preis aus den Gesundheitsantworten.
  const beitragErreicht = indexVon(pos.id) >= indexVon('beitrag') && indexVon('beitrag') >= 0;
  const einheit = definition.zahlweiseImTarif && daten.zahlweise === 'jaehrlich' ? 'im Jahr' : 'im Monat';
  let anzeigePreis = null;
  if (mitDienst) {
    if (beitrag) anzeigePreis = { betrag: beitrag.beitrag, einheit };
  } else if (beitragErreicht && beitrag) {
    anzeigePreis = { betrag: beitrag.beitrag, einheit };
  } else if (tarif && Number.isFinite(preise?.[tarif.id])) {
    anzeigePreis = { betrag: preise[tarif.id], einheit, hinweis: /Zuschlag/.test(definition.tarifHinweis || '') ? 'Noch ohne mögliche Zuschläge aus deinen Antworten.' : null };
  }
  const gewaehlteBausteine = (definition.bausteine || []).filter((baustein) => daten.bausteine?.includes(baustein.id));
  const leisteSichtbar = zeigeZurueck || weiterText;

  const rechts = (
    <>
      <SchutzPanel definition={definition} tarif={tarif} bausteine={gewaehlteBausteine} beginn={beginn} preis={anzeigePreis} kernzeilen={tarif ? kernZeilen(tarif, definition.versicherer.id).zeilen : []} />
      <VertrauenPunkte definition={definition} className="[@media(max-height:1100px)]:hidden" />
    </>
  );
  const rechtsFuss = <NitaDunkel sparte={definition.sparte} />;

  return (
    <GeteilteSeite rechts={rechts} rechtsFuss={rechtsFuss} className="break-words" data-antragsmaske={definition.sparte} data-bildschirm={pos.id}>
      <Schrittleiste abschnitte={abschnitte} aktuell={schritt} />

      <div className="mt-6 flex min-w-0 flex-1 flex-col lg:mt-10">
        {pos.id === 'tarif' && !pruefen && !vorab?.daten && !pos.aendern && <Begruessung definition={definition} />}
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <h1 ref={h1Ref} tabIndex={-1} className={cx('min-w-0 break-words font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl lg:text-[2.6rem]', TRENNUNG)}>
            <span className="sr-only">Schritt {schritt} von {schrittAnzahl}: </span>
            {aktuell?.titel}
          </h1>
          {pruefen && <TelefonAusweg sparte={definition.sparte} className="-ml-1 sm:mt-1" />}
        </div>
        {(pruefen?.kennzeile || !pruefen) && <p className={cx('mt-1 text-base text-home-slate', TRENNUNG)}>{pruefen?.kennzeile || definition.kennzeile}</p>}

        {weicheHinweis && <Callout tone="hinweis" className="mt-5" data-beitrag-geaendert="">{weicheHinweis}</Callout>}
        <div className="mt-5 pb-6 sm:mt-8">{inhalt}</div>
        {/* Wie im Original: Datenschutzhinweise des Versicherers auf jeder Seite der Strecke (SDK, Paket 1 Punkt 11). */}
        {definition.versicherer.datenschutz && (
          <p className="pb-4 text-base leading-6 text-home-slate" data-datenschutz-versicherer="">
            <a href={definition.versicherer.datenschutz.href} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={LINK}>
              {definition.versicherer.datenschutz.label}
              <NeuerTab />
            </a>
          </p>
        )}

        {leisteSichtbar && (
          <div
            ref={leisteRef}
            data-leiste=""
            className="sticky bottom-0 z-30 -mx-4 mt-auto border-t border-home-midnight/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_24px_-16px_rgba(7,17,31,0.25)] backdrop-blur sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:mb-12 lg:border-home-midnight/10 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-6 lg:shadow-none lg:backdrop-blur-none [@media(max-height:480px)]:static"
          >
            <div className="flex items-center gap-3 lg:justify-between">
              {zeigeZurueck && (
                <Button variant="secondary" onClick={zurueck} aria-label="Zurück" className="w-12 shrink-0 !px-0 lg:w-auto lg:!px-6">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden lg:inline" aria-hidden="true">Zurück</span>
                </Button>
              )}
              {anzeigePreis && pos.id !== 'beitrag' && (
                <p className="min-w-0 shrink-0 leading-tight lg:hidden" aria-hidden="true" data-leiste-preis="">
                  <span className="block whitespace-nowrap font-display text-lg font-extrabold text-home-midnight">{euro(anzeigePreis.betrag)}</span>
                  {/* Nachbesserung 22.11.2026: Vor der Beitragsseite steht am Handy wie am Desktop dabei, dass ein Zuschlag
                      aus den Antworten noch fehlt (nur wo der Tarifhinweis einen Zuschlag nennt, also nicht bei Stationär). */}
                  <span className="block whitespace-nowrap text-base text-home-slate" data-leiste-einheit="">{anzeigePreis.hinweis ? 'ohne Zuschlag' : anzeigePreis.einheit}</span>
                </p>
              )}
              {weiterText && (
                <Button onClick={weiter} className="min-w-0 flex-1 lg:ml-auto lg:flex-none lg:px-10" data-weiter="">
                  {weiterText}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </GeteilteSeite>
  );
}
