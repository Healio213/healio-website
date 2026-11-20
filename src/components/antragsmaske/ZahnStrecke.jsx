import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  ArrowLeft, ArrowRight, Check, Phone,
} from 'lucide-react';
import {
  HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV, HEALIO_PHONE_DISPLAY, HEALIO_PHONE_TEL, antragTelefonAktiv,
} from '@/config/contactChannels';
import { DEFINITIONEN } from '@/data/antrag';
import {
  formatiereGeburtsdatum, geburtsdatumEingabeBereinigt, geburtsdatumFehler,
} from '@/data/sdkAmbulantAntrag';
import { getDentalContent } from '@/components/sections/dental/dentalContent';
import { UKV_URL } from '@/components/sections/dental/dentalLinks';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import {
  altersgrenze, beginnOptionenAus, berechneBeitrag, euro, parseDatum, tarifAngeboten, wirkungen,
} from '@/lib/antragsmaske/regeln';
import { datumText } from '@/lib/antragsmaske/vertrag';
import { holeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { berechneSelbstBeitrag } from '@/lib/antragApi';
import {
  Button, Callout, FOKUS, Field, NeuerTab, TRENNUNG, buttonClass, cx, eingabeKlasse, fieldAria, schuetze, sofortScrollen,
} from '@/components/antrag/ui';
import Antragsmaske from './Antragsmaske';
import { GeteilteSeite, NitaDunkel, VertrauenPunkte } from './rahmen';
import { TERMIN_LINK, telefonLink } from './teile';
import { gestellteFragen, naechsteFrage, zielAus } from './zahnVorabfrage';

// Zahn-Strecke /antrag/zahn (12.11.2026, Franks Auftrag): Vorabfrage wie der
// Zahn-Check auf /zahn, dann „Das passt zu dir“ und ohne Bruch in die Maske
// des passenden Versicherers (Bayerische mit ZAHN Sofort oder UKV ZahnPRIVAT).
// Kommt der Kunde über die Wahl der zwei Wege von /zahn (Zahn-Check schon
// gemacht, Versicherer aus dem Link), geht es direkt in die Maske.
// Die Antworten bleiben im Arbeitsspeicher dieser Seite. Gesendet wird nur,
// was die Maske des Versicherers ohnehin sendet.

const CHECK = getDentalContent('de').check;

// Zusatzfragen, die der Zahn-Check nicht stellt (siehe zahnVorabfrage.js).
const ZUSATZ = {
  anzahl: {
    text: 'Wie viele Zähne fehlen dir, die noch nicht ersetzt sind?',
    hint: 'Milch- und Weisheitszähne zählen nicht. Für jeden fehlenden Zahn rechnet die UKV einen kleinen Zuschlag.',
    options: { 1: { label: '1 Zahn' }, 2: { label: '2 Zähne' }, 3: { label: '3 Zähne' } },
  },
  schmelz: {
    text: 'Hattest du in den letzten 3 Jahren Parodontose, Parodontitis oder einen Zahnschmelzdefekt?',
    hint: 'Das fragt der Versicherer später im Antrag. So weißt du jetzt schon, ob der Sofortschutz für dich passt.',
    options: { ja: { label: 'Ja, eins davon trifft zu' }, nein: { label: 'Nein, nichts davon' } },
  },
};
const frageText = (id) => ZUSATZ[id] || CHECK.questions[id];
const MAX_FRAGEN = 5;

function Optionen({ id, frage, wert, onWahl }) {
  return (
    <div role="group" aria-labelledby={`vorab-${id}-text`} className="mt-5 grid gap-3">
      {Object.entries(frage.options).map(([schluessel, option]) => {
        const aktiv = wert === schluessel;
        return (
          <button
            key={schluessel}
            type="button"
            aria-pressed={aktiv}
            data-vorab-antwort={schluessel}
            onClick={() => onWahl(schluessel)}
            className={cx(
              FOKUS,
              'flex min-h-[4rem] w-full items-start gap-3 rounded-[1.2rem] border-2 px-4 py-3.5 text-left transition active:scale-[0.99] motion-reduce:active:scale-100',
              aktiv ? 'border-emerald-700 bg-emerald-50' : 'border-home-midnight/15 bg-white [@media(hover:hover)]:hover:border-home-midnight/50 [@media(hover:hover)]:hover:bg-home-ice',
            )}
          >
            <span aria-hidden="true" className={cx('mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2', aktiv ? 'border-emerald-700 bg-home-mint' : 'border-slate-400 bg-white')}>
              {aktiv && <Check className="h-4 w-4 text-home-midnight" strokeWidth={3} />}
            </span>
            <span className="min-w-0">
              <span className={cx('block font-display text-lg font-extrabold leading-snug text-home-midnight', TRENNUNG)}>{option.label}</span>
              {option.sub && <span className={cx('mt-0.5 block text-base leading-6 text-home-slate', TRENNUNG)}>{option.sub}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TelefonWege({ sparte = 'zahn' }) {
  return (
    <div className="flex flex-wrap gap-2">
      <a href={antragTelefonAktiv(sparte) ? telefonLink(sparte) : TERMIN_LINK} data-zaehler-ignorieren="" className={buttonClass('primary')}>
        {antragTelefonAktiv(sparte) ? 'Mit Nita am Telefon' : 'Termin vereinbaren'}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </a>
      <a href={HEALIO_PHONE_TEL} data-zaehler-ignorieren="" className={buttonClass('secondary')}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        {HEALIO_PHONE_DISPLAY}
      </a>
    </div>
  );
}

// Gründe aus der Lage des Kunden, dann die Grenzen („Gut zu wissen“). Nur
// Aussagen aus der Produktdefinition, der Erfassung der Strecke
// (config-KZV-lesbar.txt: keine Wartezeiten in allen Stufen, keine
// Zuschläge bei der Bayerischen) und den Texten des Zahn-Checks.
function ergebnisTexte(ziel, a, definition) {
  const ergebnis = CHECK.results[ziel.ergebnis];
  if (ziel.ziel === 'bayerische-sofort') {
    return {
      gruende: [
        'Für deine anstehende oder schon begonnene Behandlung gibt es mit ZAHN Sofort rückwirkenden Schutz.',
        'Dir fehlen keine Zähne und es gibt keine Vorgeschichte.',
        'Keine Wartezeiten, der Schutz gilt ab Beginn.',
      ],
      gutZuWissen: [ergebnis.reasons[0], ergebnis.reasons[2], ergebnis.warning],
    };
  }
  if (ziel.ziel === 'bayerische') {
    return {
      gruende: [
        'Deine Behandlung ist abgerechnet. Die Bayerische fragt nach dem heutigen Zustand deiner Zähne, nicht nach Empfehlungen der letzten zwei Jahre.',
        'Dir fehlen keine Zähne und es gibt keine Vorgeschichte.',
        'Keine Wartezeiten in allen drei Stufen.',
      ],
      gutZuWissen: [
        'Deine abgerechnete Behandlung ist nicht versichert. Ohne den Baustein ZAHN Sofort sind angeratene und begonnene Behandlungen ausgeschlossen.',
        definition.tarifFussnote,
      ].filter(Boolean),
    };
  }
  const gruende = [];
  if (a.q2 === 'wenige') gruende.push(`Deine ${a.anzahl === '1' ? 'Lücke ist' : `${a.anzahl} fehlenden Zähne sind`} nach Annahme mitversichert, mit einem Zuschlag je Zahn.`);
  else gruende.push('Dir fehlen keine Zähne, deshalb ohne Zuschlag.');
  gruende.push('In den letzten zwei Jahren wurde nichts empfohlen, und es läuft nichts.');
  if (a.q3 === 'ja') gruende.push('Prothese und älterer Zahnersatz sind bei der UKV keine Antragsfrage. Bei Parodontose gilt nur ein Ausschluss für deren Behandlung.');
  else if (a.q4 === 'leistung') gruende.push('Du willst viel Leistung: Mit ZahnPRIVAT 100 zahlen Kasse und Tarif zusammen 100 % der Rechnung.');
  else if (a.q4 === 'preis') gruende.push('Du willst einen günstigen Einstieg: ZahnPRIVAT 75 ist die günstigste Stufe der UKV.');
  else if (a.q4 === 'familie') gruende.push('Kieferorthopädie bis Alter 18 ist in ZahnPRIVAT 100 mit bis zu 5.000 EUR enthalten.');
  else if (a.q4 === 'pzr') gruende.push('Professionelle Zahnreinigung ist in ZahnPRIVAT 100 ohne Jahresdeckel enthalten.');
  return {
    gruende,
    gutZuWissen: ['Keine Wartezeiten.', 'In den ersten Kalenderjahren gilt eine Zahnstaffel, bei Unfall nicht.'],
  };
}

export default function ZahnStrecke({ definition }) {
  const heute = useMemo(() => new Date(), []);
  // Eintrag aus der Wahl der zwei Wege (nur Tarif, Geburtsjahr, Herkunft).
  const [vorbelegung] = useState(() => holeVorbelegung(definition.pfad));
  const ueberWahl = 'tarif' in vorbelegung;
  const [antworten, setAntworten] = useState({});
  const [phase, setPhase] = useState(ueberWahl ? 'maske' : 'fragen');
  const [geburtsdatum, setGeburtsdatum] = useState('');
  const [plz, setPlz] = useState('');
  const [versucht, setVersucht] = useState(false);
  const [preis, setPreis] = useState({ schluessel: null, betrag: null, fehler: false });
  const titelRef = useRef(null);

  const frage = naechsteFrage(antworten);
  const gestellt = gestellteFragen(antworten);
  const ziel = zielAus(antworten);
  const zielDefinition = ziel?.produkt ? DEFINITIONEN[ziel.produkt] : null;
  const ukvAus = ziel?.ziel === 'ukv' && !HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV;
  const bayerisch = ziel?.produkt === 'zahn';

  const beginn = zielDefinition ? beginnOptionenAus(zielDefinition.beginn, heute).naechstmoeglich : null;
  const datumFehler = geburtsdatumFehler(geburtsdatum, heute);
  const datum = datumFehler ? null : parseDatum(datumText(geburtsdatum, heute) || geburtsdatum, heute);
  const grenze = datum && zielDefinition ? altersgrenze(zielDefinition, datum, { heute, beginn }) : null;
  const plzOk = !bayerisch || /^\d{5}$/.test(plz);

  // Beitrag für den Ergebnis-Bildschirm. UKV: aus dem Regelwerk der Maske
  // (mit Zuschlag je fehlendem Zahn); Bayerische: vom Antragsdienst.
  const ukvPreis = useMemo(() => {
    if (ziel?.ziel !== 'ukv' || !datum || !beginn || grenze) return null;
    // Paket C (C8, C11): nur Tarife, die das Original anbietet (Mindestbeitrag, Altersregel), und ohne gesperrte Zahl fehlender Zähne.
    const rechne = (tarifId) => {
      if (tarifAngeboten(zielDefinition, {
        tarif: tarifId, geburtsdatum: datum, beginn, heute,
      }) !== true) return null;
      const antwortenVorab = { TF0021: ziel.antworten.TF0021 };
      if (wirkungen(zielDefinition, { antworten: antwortenVorab, tarif: tarifId }).keineAufnahme.length) return null;
      return berechneBeitrag(zielDefinition, {
        tarif: tarifId, geburtsdatum: datum, beginn, antworten: antwortenVorab,
      })?.beitrag ?? null;
    };
    if (ziel.tarif) return { betrag: rechne(ziel.tarif), ab: false };
    const alle = zielDefinition.tarife.map((tarif) => rechne(tarif.id)).filter(Number.isFinite);
    return alle.length ? { betrag: Math.min(...alle), ab: true } : null;
  }, [ziel?.ziel, ziel?.tarif, ziel?.antworten?.TF0021, datum?.jahr, datum?.monat, datum?.tag, beginn?.iso, grenze]); // eslint-disable-line react-hooks/exhaustive-deps

  const preisSchluessel = bayerisch && phase === 'ergebnis' && datum && beginn && !grenze && plzOk
    ? JSON.stringify({
      sparte: 'zahn', versicherer: 'bayerische', tarifCode: ziel.tarif || 'SMART', bausteine: ziel.bausteine, zahlweise: 'monatlich', geburtsdatum: datumText(geburtsdatum, heute), beginnIso: beginn.iso, plz,
    })
    : null;
  useEffect(() => {
    if (!preisSchluessel) return undefined;
    const steuerung = new AbortController();
    berechneSelbstBeitrag(JSON.parse(preisSchluessel), { signal: steuerung.signal })
      .then((antwort) => {
        // Ohne Vorauswahl: günstigste Stufe als „ab“ (Beiträge aller Stufen vom Dienst).
        const alle = Object.values(antwort.alleStufen || antwort.alleTarife || {}).filter(Number.isFinite);
        const ab = !JSON.parse(preisSchluessel).bausteine.length && alle.length > 0 && !ziel?.tarif;
        setPreis({
          schluessel: preisSchluessel, betrag: ab ? Math.min(...alle) : antwort.beitrag, ab, fehler: false,
        });
      })
      .catch((fehler) => { if (fehler?.name !== 'AbortError') setPreis({ schluessel: preisSchluessel, betrag: null, fehler: true }); });
    return () => steuerung.abort();
  }, [preisSchluessel, ziel?.tarif]);

  useEffect(() => {
    if (phase === 'maske') return;
    sofortScrollen(() => window.scrollTo({ top: 0 }));
    titelRef.current?.focus({ preventScroll: true });
  }, [phase, frage]);

  if (phase === 'maske') {
    if (ueberWahl) return <Antragsmaske definition={definition} vorab={{ vorbelegung }} />;
    return (
      <Antragsmaske
        key={ziel.produkt}
        definition={zielDefinition}
        vorab={{
          vorbelegung,
          empfohlen: ziel.tarif,
          quelle: 'Aus deinen Antworten vorab übernommen.',
          vorbelegt: Object.keys(ziel.antworten),
          daten: {
            // Ohne Empfehlung: Vorgabe der Strecke (Bayerische Prestige wie im Original), sonst frei.
            tarif: ziel.tarif || (bayerisch ? zielDefinition.tarifVorgabe : null),
            bausteine: ziel.bausteine,
            geburtsdatum: datumText(geburtsdatum, heute) || geburtsdatum,
            ...(bayerisch ? { plz } : {}),
            antworten: ziel.antworten,
          },
        }}
      />
    );
  }

  const bereinigt = (neu) => {
    // Spätere Antworten gelten nur, solange die Frage noch gestellt wird.
    const gueltig = gestellteFragen(neu);
    return Object.fromEntries(Object.entries(neu).filter(([schluessel]) => gueltig.includes(schluessel)));
  };
  const antworte = (id, wert) => {
    const neu = bereinigt({ ...antworten, [id]: wert });
    setAntworten(neu);
    if (naechsteFrage(neu) === null) setPhase(zielAus(neu).ziel === 'telefon' ? 'ergebnis' : 'angaben');
  };
  const zurueck = () => {
    setVersucht(false);
    if (phase === 'ergebnis' && ziel?.ziel !== 'telefon') { setPhase('angaben'); return; }
    // Aus Angaben oder Ergebnis zurück zur letzten Frage, sonst eine Frage zurück.
    const zuLoeschen = phase === 'fragen' ? gestellt[gestellt.length - 2] : gestellt[gestellt.length - 1];
    if (!zuLoeschen) return;
    const neu = { ...antworten };
    delete neu[zuLoeschen];
    setAntworten(bereinigt(neu));
    setPhase('fragen');
  };
  const angabenWeiter = () => {
    setVersucht(true);
    if (datumFehler || grenze || !plzOk) return;
    setPhase('ergebnis');
  };

  const ergebnis = ziel ? CHECK.results[ziel.ergebnis] : null;
  const tarifName = ziel?.tarif ? zielDefinition?.tarife.find((tarif) => tarif.id === ziel.tarif)?.name : null;
  const baustein = ziel?.bausteine?.length ? zielDefinition?.bausteine.find((eintrag) => eintrag.id === ziel.bausteine[0]) : null;
  const preisJetzt = bayerisch
    ? (preis.schluessel === preisSchluessel ? { ...preis, ab: preis.ab || !ziel?.tarif } : { betrag: null, fehler: false })
    : { betrag: ukvPreis?.betrag ?? null, fehler: false, ab: ukvPreis?.ab };
  const nummer = Math.min(gestellt.length, MAX_FRAGEN);

  let inhalt;
  if (phase === 'fragen' && frage) {
    const text = frageText(frage);
    inhalt = (
      <div data-vorab-frage={frage}>
        {frage === 'q1' && (
          <div className="mb-7 flex gap-4 rounded-[1.4rem] bg-home-ice p-4 ring-1 ring-emerald-900/10 sm:p-5" data-begruessung="">
            <FriendlyIcon kind="dental" size="md" tone="mint" className="hidden sm:inline-grid" />
            <div className="min-w-0">
              <p className="font-display text-xl font-extrabold leading-tight text-home-midnight">Dein Zahnschutz in wenigen Minuten</p>
              <ul className="mt-2 space-y-1">
                {['Ein paar kurze Fragen, dann zeigen wir dir den Tarif, der zu dir passt.', 'Du musst keine Versicherer vergleichen und bleibst die ganze Zeit bei Healio.', 'Die Bestätigung bekommst du per E-Mail.'].map((punkt) => (
                  <li key={punkt} className="flex gap-2 text-base leading-6 text-home-midnight">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" strokeWidth={3} aria-hidden="true" />
                    <span className="min-w-0">{schuetze(punkt)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <p className="text-base font-bold text-emerald-800">Frage {nummer} von höchstens {MAX_FRAGEN}</p>
        <div className="mt-2 flex gap-1" aria-hidden="true">
          {Array.from({ length: MAX_FRAGEN }, (_, stelle) => <span key={stelle} className={cx('h-1.5 flex-1 rounded-full transition-colors', stelle < nummer ? 'bg-emerald-600' : 'bg-home-midnight/10')} />)}
        </div>
        <h1 id={`vorab-${frage}-text`} ref={titelRef} tabIndex={-1} className={cx('mt-5 font-display text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-3xl', TRENNUNG)}>{text.text}</h1>
        {text.hint && <p className={cx('mt-2 text-base leading-7 text-home-slate', TRENNUNG)}>{text.hint}</p>}
        <Optionen id={frage} frage={text} wert={antworten[frage]} onWahl={(wert) => antworte(frage, wert)} />
      </div>
    );
  } else if (phase === 'angaben') {
    inhalt = (
      <div data-vorab-angaben="">
        <p className="text-base font-bold text-emerald-800">Fast geschafft</p>
        <h1 ref={titelRef} tabIndex={-1} className="mt-2 font-display text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-3xl">
          {bayerisch ? 'Noch zwei Angaben für deinen Beitrag' : 'Noch eine Angabe für deinen Beitrag'}
        </h1>
        <p className="mt-2 text-base leading-7 text-home-slate">Damit zeigen wir dir gleich deinen echten Monatsbeitrag.</p>
        {/* Bewusst kein Formular-Element: hier wird nichts abgeschickt (check-form-hardening). Enter in einem Feld geht weiter wie der Knopf. */}
        <div className={cx('mt-6 grid gap-4', bayerisch && 'sm:grid-cols-2')} onKeyDown={(event) => { if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); angabenWeiter(); } }}>
          <Field id="vorab-geburtsdatum" label="Dein Geburtsdatum" error={versucht && !grenze ? datumFehler : null}>
            <input
              {...fieldAria('vorab-geburtsdatum', { error: versucht && !grenze ? datumFehler : null })}
              type="text"
              inputMode="numeric"
              autoComplete="bday"
              maxLength={12}
              placeholder="TT.MM.JJJJ"
              value={geburtsdatum}
              onChange={(event) => setGeburtsdatum(formatiereGeburtsdatum(event.target.value))}
              onBlur={(event) => setGeburtsdatum(geburtsdatumEingabeBereinigt(event.target.value, heute))}
              className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal')}
            />
          </Field>
          {bayerisch && (
            <Field id="vorab-plz" label="Deine Postleitzahl" hint="Der Beitrag hängt vom Wohnort ab." error={versucht && !plzOk ? 'Bitte gib deine fünfstellige PLZ ein.' : null}>
              <input
                {...fieldAria('vorab-plz', { hint: true, error: versucht && !plzOk })}
                type="text"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                placeholder="z. B. 20095"
                value={plz}
                onChange={(event) => setPlz(event.target.value.replace(/\D/g, ''))}
                className={cx(eingabeKlasse, 'font-display text-lg font-extrabold placeholder:font-sans placeholder:text-base placeholder:font-normal')}
              />
            </Field>
          )}
        </div>
        {grenze && (
          <Callout tone="hinweis" className="mt-4" data-altersgrenze="">
            <p className="font-bold">{grenze.text}</p>
            <div className="mt-3"><TelefonWege /></div>
          </Callout>
        )}
      </div>
    );
  } else if (phase === 'ergebnis' && ziel?.ziel === 'telefon') {
    inhalt = (
      <div data-vorab-ergebnis="telefon">
        <FriendlyIcon kind="support" size="lg" tone="mint" />
        <h1 ref={titelRef} tabIndex={-1} className="mt-4 font-display text-[1.6rem] font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-3xl">{ergebnis.title}</h1>
        <p className={cx('mt-3 text-base leading-7 text-home-midnight', TRENNUNG)}>{ergebnis.text}</p>
        <ul className="mt-4 space-y-2">
          {ergebnis.reasons.map((grund) => (
            <li key={grund} className="flex gap-2 text-base leading-6 text-home-midnight"><Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" strokeWidth={3} aria-hidden="true" />{grund}</li>
          ))}
        </ul>
        <p className="mt-5 text-base leading-7 text-home-slate">Am Telefon schauen wir in Ruhe, welcher Schutz für dich möglich ist. Du erreichst uns auch direkt:</p>
        <a href={HEALIO_PHONE_TEL} data-zaehler-ignorieren="" className={buttonClass('secondary', 'mt-3')}>
          <Phone className="h-5 w-5" aria-hidden="true" />
          {HEALIO_PHONE_DISPLAY}
        </a>
      </div>
    );
  } else if (phase === 'ergebnis') {
    const versicherer = zielDefinition.versicherer;
    const { gruende, gutZuWissen } = ergebnisTexte(ziel, antworten, zielDefinition);
    inhalt = (
      <div data-vorab-ergebnis={ziel.ziel}>
        <p className="text-base font-bold text-emerald-800">Dein Ergebnis</p>
        <h1 ref={titelRef} tabIndex={-1} className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">Das passt zu dir</h1>
        <section className="mt-6 overflow-hidden rounded-[1.6rem] bg-home-midnight text-white shadow-[0_24px_48px_-24px_rgba(7,17,31,0.55)]">
          <div className="flex items-start gap-4 p-5 sm:p-6">
            <FriendlyIcon kind="dental" size="md" tone="mint" />
            <div className="min-w-0">
              <p className="font-display text-xl font-extrabold leading-tight text-home-mint-active">die {versicherer.kurz}</p>
              <p className="text-base leading-6 text-slate-300">{versicherer.name}</p>
              <p className={cx('mt-2 font-display text-2xl font-extrabold leading-tight', TRENNUNG)}>
                {tarifName || (bayerisch ? 'Smart, Komfort oder Prestige' : 'ZahnPRIVAT 75, 90 oder 100')}
                {baustein && <span className="block">mit {baustein.name}</span>}
              </p>
            </div>
          </div>
          <div className="border-t border-white/10 px-5 py-4 sm:px-6" aria-live="polite" data-vorab-preis="">
            {Number.isFinite(preisJetzt.betrag) && (
              <>
                <p className="text-base text-home-mint-active">{preisJetzt.ab ? 'Dein Beitrag im Monat ab' : 'Dein Beitrag im Monat'}</p>
                <p className="whitespace-nowrap font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.03em]">{euro(preisJetzt.betrag)}</p>
                {ziel.antworten.TF0021 && ziel.antworten.TF0021 !== '0' && <p className="mt-2 text-base leading-6 text-slate-300">mit dem Zuschlag für {ziel.antworten.TF0021 === '1' ? 'einen fehlenden Zahn' : `${ziel.antworten.TF0021} fehlende Zähne`}</p>}
              </>
            )}
            {!Number.isFinite(preisJetzt.betrag) && !preisJetzt.fehler && <p className="text-base text-slate-300">Einen Moment, wir rechnen deinen Beitrag aus …</p>}
            {preisJetzt.fehler && <p className="text-base text-slate-300">Den Beitrag siehst du gleich im nächsten Schritt.</p>}
          </div>
        </section>
        <h2 className="mt-7 font-display text-lg font-extrabold text-home-midnight">Darum passt das</h2>
        <ul className="mt-3 space-y-2.5" data-gruende="">
          {gruende.map((grund) => (
            <li key={grund} className="flex gap-3 text-base leading-6 text-home-midnight">
              <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-home-mint"><Check className="h-3.5 w-3.5 text-home-midnight" strokeWidth={3} /></span>
              <span className={cx('min-w-0', TRENNUNG)}>{grund}</span>
            </li>
          ))}
        </ul>
        {gutZuWissen.length > 0 && (
          <>
            <p className="mt-6 text-base font-bold text-home-midnight">Gut zu wissen</p>
            <ul className="mt-2 space-y-1.5 rounded-[1rem] bg-home-ice p-4 ring-1 ring-emerald-900/10" data-gut-zu-wissen="">
              {gutZuWissen.map((punkt) => (
                <li key={punkt} className={cx('flex gap-2 text-base leading-6 text-home-midnight', TRENNUNG)}>
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700" />
                  <span className="min-w-0">{punkt}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <p className={cx('mt-5 text-base leading-7 text-home-slate', TRENNUNG)}>
          {`Dein Vertrag kommt direkt von ${versicherer.beiDer}. `}
          {ziel.tarif || bayerisch ? 'Die Stufe kannst du im nächsten Schritt noch ändern. ' : 'Deine Stufe wählst du im nächsten Schritt. '}
          {CHECK.disclaimer}
        </p>
        {ukvAus && (
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={UKV_URL} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className={buttonClass('primary')}>Online bei der UKV berechnen<NeuerTab /></a>
          </div>
        )}
      </div>
    );
  }

  const telefonZiel = antragTelefonAktiv('zahn') ? { text: 'Mit Nita am Telefon', href: telefonLink('zahn') } : { text: 'Termin vereinbaren', href: TERMIN_LINK };
  const weiterKnopf = (phase === 'angaben' && { text: 'Beitrag zeigen', onClick: angabenWeiter, data: { 'data-vorab-weiter': '' } })
    || (phase === 'ergebnis' && ziel?.ziel === 'telefon' && { ...telefonZiel, data: { 'data-vorab-telefon': '' } })
    || (phase === 'ergebnis' && ziel?.ziel !== 'telefon' && !ukvAus && { text: 'Weiter zum Antrag', onClick: () => setPhase('maske'), data: { 'data-vorab-start': '' } })
    || null;
  const zeigeZurueck = phase !== 'fragen' || gestellt.length > 1;

  const rechts = (
    <>
      <section>
        <FriendlyIcon kind="dental" size="md" tone="mint" />
        <h2 className="mt-4 font-display text-2xl font-extrabold leading-tight">So geht es weiter</h2>
        <ol className="mt-5 space-y-4">
          {['Kurze Fragen zu deinen Zähnen', 'Dein passender Tarif mit Beitrag', 'Antrag in Ruhe ausfüllen und absenden'].map((punkt, stelle) => {
            const jetzt = (stelle === 0 && phase === 'fragen') || (stelle === 1 && phase !== 'fragen');
            return (
              <li key={punkt} className="flex items-center gap-3 text-base leading-6">
                <span aria-hidden="true" className={cx('flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display font-extrabold', jetzt ? 'bg-home-mint text-home-midnight' : 'bg-white/10 text-slate-300')}>{stelle + 1}</span>
                <span className={cx('min-w-0', jetzt ? 'font-semibold text-white' : 'text-slate-300')}>{punkt}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-6 text-base leading-6 text-slate-300">Deine Antworten bleiben auf dieser Seite. Gesendet wird erst dein fertiger Antrag.</p>
      </section>
      <VertrauenPunkte definition={zielDefinition} className="[@media(max-height:820px)]:hidden" />
      <NitaDunkel sparte="zahn" />
    </>
  );

  return (
    <GeteilteSeite rechts={rechts} data-zahn-vorab="" data-bildschirm={`vorab:${phase === 'fragen' ? frage : phase}`}>
      <div className="flex min-w-0 flex-1 flex-col lg:pt-4">
        <div className="pb-6">{inhalt}</div>
        {(zeigeZurueck || weiterKnopf) && (
          <div className="sticky bottom-0 z-30 -mx-4 mt-auto border-t border-home-midnight/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_24px_-16px_rgba(7,17,31,0.25)] backdrop-blur sm:-mx-8 sm:px-8 lg:static lg:mx-0 lg:mb-12 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-6 lg:shadow-none lg:backdrop-blur-none">
            <div className="flex items-center gap-3 lg:justify-between">
              {zeigeZurueck && (
                <Button variant="secondary" onClick={zurueck} aria-label="Zurück zur vorigen Frage" className="w-12 shrink-0 !px-0 lg:w-auto lg:!px-6">
                  <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  <span className="hidden lg:inline" aria-hidden="true">Zurück</span>
                </Button>
              )}
              {weiterKnopf?.href && (
                <a href={weiterKnopf.href} data-zaehler-ignorieren="" className={buttonClass('primary', 'min-w-0 flex-1 lg:ml-auto lg:flex-none lg:px-10')} {...weiterKnopf.data}>
                  {weiterKnopf.text}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              )}
              {weiterKnopf && !weiterKnopf.href && (
                <Button onClick={weiterKnopf.onClick} className="min-w-0 flex-1 lg:ml-auto lg:flex-none lg:px-10" {...weiterKnopf.data}>
                  {weiterKnopf.text}
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
