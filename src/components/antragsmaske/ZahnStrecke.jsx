import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import {
  ArrowLeft, ArrowRight, Check, Phone,
} from 'lucide-react';
import {
  HEALIO_ANTRAG_GESPRAECH_AKTIV, HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV, HEALIO_PHONE_DISPLAY, HEALIO_PHONE_TEL,
} from '@/config/contactChannels';
import { DEFINITIONEN } from '@/data/antrag';
import {
  formatiereGeburtsdatum, geburtsdatumEingabeBereinigt, geburtsdatumFehler,
} from '@/data/sdkAmbulantAntrag';
import { getDentalContent } from '@/components/sections/dental/dentalContent';
import { UKV_URL } from '@/components/sections/dental/dentalLinks';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import {
  altersgrenze, beginnOptionenAus, berechneBeitrag, euro, parseDatum,
} from '@/lib/antragsmaske/regeln';
import { datumText } from '@/lib/antragsmaske/vertrag';
import { holeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { berechneSelbstBeitrag } from '@/lib/antragApi';
import {
  Button, Callout, FOKUS, Field, NeuerTab, TRENNUNG, buttonClass, cx, eingabeKlasse, fieldAria, schuetze, sofortScrollen,
} from '@/components/antrag/ui';
import Antragsmaske from './Antragsmaske';
import { HilfeKarte, KARTE } from './rahmen';
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
      <a href={HEALIO_ANTRAG_GESPRAECH_AKTIV ? telefonLink(sparte) : TERMIN_LINK} data-zaehler-ignorieren="" className={buttonClass('primary')}>
        {HEALIO_ANTRAG_GESPRAECH_AKTIV ? 'Mit Nita am Telefon' : 'Termin vereinbaren'}
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </a>
      <a href={HEALIO_PHONE_TEL} data-zaehler-ignorieren="" className={buttonClass('secondary')}>
        <Phone className="h-5 w-5" aria-hidden="true" />
        {HEALIO_PHONE_DISPLAY}
      </a>
    </div>
  );
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
    const rechne = (tarifId) => berechneBeitrag(zielDefinition, {
      tarif: tarifId, geburtsdatum: datum, beginn, antworten: { TF0021: ziel.antworten.TF0021 },
    })?.beitrag ?? null;
    if (ziel.tarif) return { betrag: rechne(ziel.tarif), ab: false };
    const alle = zielDefinition.tarife.map((tarif) => rechne(tarif.id)).filter(Number.isFinite);
    return alle.length ? { betrag: Math.min(...alle), ab: true } : null;
  }, [ziel?.ziel, ziel?.tarif, ziel?.antworten?.TF0021, datum?.jahr, datum?.monat, datum?.tag, beginn?.iso, grenze]); // eslint-disable-line react-hooks/exhaustive-deps

  const preisSchluessel = bayerisch && phase === 'ergebnis' && datum && beginn && !grenze && plzOk
    ? JSON.stringify({
      sparte: 'zahn', versicherer: 'bayerische', tarifCode: ziel.tarif, bausteine: ziel.bausteine, zahlweise: 'monatlich', geburtsdatum: datumText(geburtsdatum, heute), beginnIso: beginn.iso, plz,
    })
    : null;
  useEffect(() => {
    if (!preisSchluessel) return undefined;
    const steuerung = new AbortController();
    berechneSelbstBeitrag(JSON.parse(preisSchluessel), { signal: steuerung.signal })
      .then((antwort) => setPreis({ schluessel: preisSchluessel, betrag: antwort.beitrag, fehler: false }))
      .catch((fehler) => { if (fehler?.name !== 'AbortError') setPreis({ schluessel: preisSchluessel, betrag: null, fehler: true }); });
    return () => steuerung.abort();
  }, [preisSchluessel]);

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
            ...(ziel.tarif ? { tarif: ziel.tarif } : { tarif: null }),
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
    ? (preis.schluessel === preisSchluessel ? preis : { betrag: null, fehler: false })
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
              <p className="font-display text-xl font-extrabold leading-tight text-home-midnight">Dein Zahnschutz in etwa 8 Minuten</p>
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
        <form className={cx('mt-6 grid gap-4', bayerisch && 'sm:grid-cols-2')} onSubmit={(event) => { event.preventDefault(); angabenWeiter(); }} noValidate>
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
          <button type="submit" className="sr-only">Weiter</button>
        </form>
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
        <p className="mt-5 text-base leading-7 text-home-slate">Am Telefon schauen wir in Ruhe, welcher Schutz für dich möglich ist.</p>
        <div className="mt-4"><TelefonWege /></div>
      </div>
    );
  } else if (phase === 'ergebnis') {
    const versicherer = zielDefinition.versicherer;
    inhalt = (
      <div data-vorab-ergebnis={ziel.ziel}>
        <p className="text-base font-bold text-emerald-800">Dein Ergebnis</p>
        <h1 ref={titelRef} tabIndex={-1} className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">Das passt zu dir</h1>
        <section className="mt-6 overflow-hidden rounded-[1.6rem] bg-home-midnight text-white shadow-[0_24px_48px_-24px_rgba(7,17,31,0.55)]">
          <div className="flex items-start gap-4 p-5 sm:p-6">
            <FriendlyIcon kind="dental" size="md" tone="mint" />
            <div className="min-w-0">
              <p className="text-base text-slate-300">{versicherer.name}</p>
              <p className={cx('font-display text-2xl font-extrabold leading-tight', TRENNUNG)}>
                {tarifName || 'ZahnPRIVAT 75, 90 oder 100'}
                {baustein && <span className="block text-home-mint-active">mit {baustein.name}</span>}
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
        <ul className="mt-3 space-y-2.5">
          {ergebnis.reasons.slice(0, 3).map((grund) => (
            <li key={grund} className="flex gap-3 text-base leading-6 text-home-midnight">
              <span aria-hidden="true" className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-home-mint"><Check className="h-3.5 w-3.5 text-home-midnight" strokeWidth={3} /></span>
              <span className={cx('min-w-0', TRENNUNG)}>{grund}</span>
            </li>
          ))}
        </ul>
        {antworten.q1 === 'fertig' && <p className={cx('mt-4 rounded-[1rem] bg-home-ice p-4 text-base leading-7 text-home-midnight ring-1 ring-emerald-900/10', TRENNUNG)}><span className="font-bold">{CHECK.nachBehandlungLabel}</span> {CHECK.nachBehandlung}</p>}
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

  const weiterKnopf = (phase === 'angaben' && { text: 'Beitrag zeigen', onClick: angabenWeiter, data: { 'data-vorab-weiter': '' } })
    || (phase === 'ergebnis' && ziel?.ziel !== 'telefon' && !ukvAus && { text: 'Weiter zum Antrag', onClick: () => setPhase('maske'), data: { 'data-vorab-start': '' } })
    || null;
  const zeigeZurueck = phase !== 'fragen' || gestellt.length > 1;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-5 sm:px-6 sm:pt-8" data-zahn-vorab="" data-bildschirm={`vorab:${phase === 'fragen' ? frage : phase}`}>
      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start lg:gap-8">
        <div className={cx('flex min-w-0 flex-1 flex-col lg:p-10', 'lg:rounded-[1.75rem] lg:bg-white lg:shadow-[0_1px_2px_rgba(7,17,31,0.06),0_24px_48px_-28px_rgba(7,17,31,0.28)] lg:ring-1 lg:ring-home-midnight/[0.06]')}>
          <div className="pb-6">{inhalt}</div>
          {(zeigeZurueck || weiterKnopf) && (
            <div className="sticky bottom-0 z-30 -mx-4 mt-auto border-t border-home-midnight/10 bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_24px_-16px_rgba(7,17,31,0.25)] backdrop-blur sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-6 lg:shadow-none lg:backdrop-blur-none">
              <div className="flex items-center gap-3 lg:justify-between">
                {zeigeZurueck && (
                  <Button variant="secondary" onClick={zurueck} aria-label="Zurück zur vorigen Frage" className="w-12 shrink-0 !px-0 lg:w-auto lg:!px-6">
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                    <span className="hidden lg:inline" aria-hidden="true">Zurück</span>
                  </Button>
                )}
                {weiterKnopf && (
                  <Button onClick={weiterKnopf.onClick} className="min-w-0 flex-1 lg:ml-auto lg:flex-none lg:px-10" {...weiterKnopf.data}>
                    {weiterKnopf.text}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
        <aside className="hidden space-y-4 lg:sticky lg:top-6 lg:block">
          <section className={cx(KARTE, 'p-5')}>
            <h2 className="font-display text-base font-extrabold text-home-midnight">So geht es weiter</h2>
            <ol className="mt-3 space-y-3">
              {['Kurze Fragen zu deinen Zähnen', 'Dein passender Tarif mit Beitrag', 'Antrag in Ruhe ausfüllen und absenden'].map((punkt, stelle) => (
                <li key={punkt} className="flex gap-3 text-base leading-6 text-home-midnight">
                  <span aria-hidden="true" className={cx('flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-display font-extrabold', (stelle === 0 && phase === 'fragen') || (stelle === 1 && phase !== 'fragen') ? 'bg-home-midnight text-white' : 'bg-home-ice text-home-slate')}>{stelle + 1}</span>
                  <span className="min-w-0 pt-0.5">{punkt}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 border-t border-home-midnight/10 pt-3 text-base leading-6 text-home-slate">Deine Antworten bleiben auf dieser Seite. Gesendet wird erst dein fertiger Antrag.</p>
          </section>
          <HilfeKarte sparte="zahn" />
        </aside>
      </div>
      <div className="h-6 lg:h-12" aria-hidden="true" />
    </div>
  );
}
