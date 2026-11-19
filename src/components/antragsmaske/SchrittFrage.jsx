import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { frageFehler, sichtbareFolgefragen, zahlAusText } from '@/lib/antragsmaske/regeln';
import {
  Aufklapper, Callout, FOKUS, FehlerText, Field, Gruppe, OptionCard, TRENNUNG, buttonClass, cx, eingabeKlasse, fieldAria,
} from '@/components/antrag/ui';
import { UKV_URL } from '@/components/sections/dental/dentalLinks';
import { HEALIO_ANTRAGSMASKE_AKTIV, HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV } from '@/config/contactChannels';
import { TERMIN_LINK, telefonLink } from './teile';
import { WARUM_GESUNDHEIT } from './anzeige';

const wortlautVon = (definition) => `Wortlaut ${definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`}`;

// Schritt 2: eine Frage je Bildschirm, Folgefragen auf demselben Bildschirm
// darunter (wie 1a der Prüfseite). Wortlaut und Reihenfolge kommen aus der
// Definition. Kein laufender Preis auf diesen Bildschirmen.

const EINBLENDEN = 'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-200';
const KARTE = 'rounded-[1.4rem] bg-white p-4 shadow-[0_1px_2px_rgba(7,17,31,0.06),0_16px_32px_-24px_rgba(7,17,31,0.3)] ring-1 ring-home-midnight/10 sm:p-6';

export function fehlerHinweis(definition, daten) {
  const bestaetigung = definition.gesundheit?.vorspann?.bestaetigung;
  if (bestaetigung && daten.antworten[bestaetigung.key] !== true) return [{ key: bestaetigung.key, text: bestaetigung.fehler }];
  return [];
}

// Fehler des Frage-Bildschirms: Hauptfrage und geltende Folgefragen.
export function fehlerFrage(frage, kontext) {
  return [frage, ...sichtbareFolgefragen(frage, kontext)]
    .map((teil) => ({ key: `frage-${teil.id}`, text: frageFehler(teil, kontext.antworten) }))
    .filter((eintrag) => eintrag.text);
}

export function SchrittHinweis({
  definition, daten, setAntwort, fehler, ueberschriftRef, anzahl,
}) {
  const vorspann = definition.gesundheit.vorspann;
  const bestaetigung = vorspann.bestaetigung;
  return (
    <div className="space-y-5">
      <div>
        <h2 ref={ueberschriftRef} tabIndex={-1} className="font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
          Kurz vorweg: {anzahl} {anzahl === 1 ? 'Frage' : 'Fragen'} zu deiner Gesundheit
        </h2>
        <p className="mt-1 text-base leading-7 text-home-slate">{WARUM_GESUNDHEIT}</p>
      </div>
      <section className={cx(KARTE, 'space-y-3')} aria-labelledby="hinweis-titel">
        <p className="text-base font-semibold text-home-slate">{wortlautVon(definition)}</p>
        <h3 id="hinweis-titel" className="font-display text-lg font-extrabold text-home-midnight">{vorspann.titel}</h3>
        <div className={cx('max-h-[22rem] space-y-3 overflow-y-auto break-words border-l-2 border-emerald-600/40 pl-4 text-base leading-7 text-home-midnight', TRENNUNG)} tabIndex={0} aria-label={vorspann.titel}>
          {vorspann.absaetze.map((absatz) => (typeof absatz === 'string'
            ? <p key={absatz.slice(0, 40)}>{absatz}</p>
            : (
              <p key={absatz.text.slice(0, 40)}>
                {absatz.text}
                {' '}
                <a href={absatz.link.href} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" className="font-semibold text-emerald-800 underline underline-offset-4">{absatz.link.text}<span className="sr-only"> (öffnet in neuem Tab)</span></a>
                {absatz.nachLink}
              </p>
            )))}
        </div>
      </section>
      {vorspann.aufklapper && (
        <Aufklapper titel={vorspann.aufklapper.titel}>
          {vorspann.aufklapper.absaetze.map((absatz) => <p key={absatz.slice(0, 40)}>{absatz}</p>)}
        </Aufklapper>
      )}
      {bestaetigung && (
        <div data-fehlerblock="">
          <OptionCard
            id={`feld-${bestaetigung.key}`}
            type="checkbox"
            name={bestaetigung.key}
            checked={daten.antworten[bestaetigung.key] === true}
            onChange={(event) => setAntwort(bestaetigung.key, event.target.checked)}
            describedBy={fehler[bestaetigung.key] ? `fehler-${bestaetigung.key}` : undefined}
            invalid={Boolean(fehler[bestaetigung.key])}
          >
            {bestaetigung.label}
          </OptionCard>
          <FehlerText id={`fehler-${bestaetigung.key}`}>{fehler[bestaetigung.key]}</FehlerText>
        </div>
      )}
    </div>
  );
}

function JaNein({
  frage, wert, beantworte, gesperrt, fehler,
}) {
  const fehlerId = `fehler-frage-${frage.id}`;
  return (
    <div data-janein="" className="pt-2">
      <FehlerText id={fehlerId}>{fehler}</FehlerText>
      {frage.zuschlagText && <p className="text-base leading-6 text-home-slate">{frage.zuschlagText}</p>}
      <div role="group" aria-labelledby={`frage-${frage.id}-text`} className="mt-4 grid grid-cols-2 gap-3">
        {['ja', 'nein'].map((antwort) => {
          const aktiv = wert === antwort;
          return (
            <button
              key={antwort}
              id={antwort === 'ja' ? `feld-frage-${frage.id}` : undefined}
              type="button"
              aria-pressed={aktiv}
              aria-disabled={gesperrt || undefined}
              aria-describedby={fehler ? fehlerId : undefined}
              data-antwort={antwort}
              onClick={() => beantworte(frage, antwort)}
              className={cx(
                FOKUS,
                'inline-flex min-h-[4.5rem] min-w-0 items-center justify-center gap-2 rounded-[1.2rem] border-2 px-4 font-display text-xl font-extrabold transition active:scale-[0.98] motion-reduce:active:scale-100',
                aktiv ? 'border-emerald-700 bg-home-mint text-home-midnight shadow-[0_12px_24px_-12px_rgba(37,201,144,0.7)]' : 'border-home-midnight/20 bg-white text-home-midnight [@media(hover:hover)]:hover:border-home-midnight [@media(hover:hover)]:hover:bg-home-ice',
                gesperrt && 'pointer-events-none',
              )}
            >
              {aktiv && <Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" />}
              {antwort === 'ja' ? 'Ja' : 'Nein'}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Auswahl({
  frage, wert, setAntwort, fehler, mehrfach,
}) {
  const fehlerId = `fehler-frage-${frage.id}`;
  const liste = Array.isArray(wert) ? wert : [];
  return (
    <Gruppe id={`gruppe-${frage.id}`} legend={frage.legend || frage.text} fehlerId={fehlerId} error={fehler} className={cx('scroll-mt-4 pt-2', EINBLENDEN)}>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {frage.optionen.map((option, stelle) => (
          <OptionCard
            key={option.id}
            id={stelle === 0 ? `feld-frage-${frage.id}` : undefined}
            kompakt
            type={mehrfach ? 'checkbox' : 'radio'}
            name={`frage-${frage.id}`}
            value={option.id}
            checked={mehrfach ? liste.includes(option.id) : wert === option.id}
            onChange={(event) => {
              if (!mehrfach) { setAntwort(frage.id, option.id); return; }
              const ohne = liste.filter((id) => id !== option.id);
              setAntwort(frage.id, event.target.checked ? [...ohne, option.id] : ohne);
            }}
            describedBy={fehler ? fehlerId : undefined}
            invalid={Boolean(fehler)}
          >
            {option.label}
          </OptionCard>
        ))}
      </div>
    </Gruppe>
  );
}

function Masse({
  frage, wert, setAntwort, fehler, weiter,
}) {
  const [beruehrt, setBeruehrt] = useState({});
  const werte = wert && typeof wert === 'object' ? wert : {};
  const setze = (id, text) => setAntwort(frage.id, { ...werte, [id]: text });
  return (
    <div className="grid grid-cols-2 gap-3" data-fehlerblock="">
      {frage.felder.map((feld, stelle) => {
        const roh = werte[feld.id] ?? '';
        const zahl = feld.lesen ? feld.lesen(roh) : zahlAusText(roh);
        const ungueltig = zahl === null || zahl < feld.min || zahl > feld.max;
        const text = (fehler && ungueltig) || (beruehrt[feld.id] && roh !== '' && ungueltig) ? feld.fehler : null;
        const letzte = stelle === frage.felder.length - 1;
        return (
          <Field key={feld.id} id={`feld-frage-${frage.id}-${feld.id}`} label={feld.label} error={text}>
            <input
              {...fieldAria(`feld-frage-${frage.id}-${feld.id}`, { error: text })}
              type="text"
              inputMode={feld.ganzzahl ? 'numeric' : 'decimal'}
              enterKeyHint={letzte ? 'done' : 'next'}
              autoComplete="off"
              maxLength={5}
              placeholder={feld.platzhalter}
              value={roh}
              onChange={(event) => setze(feld.id, event.target.value.replace(feld.ganzzahl ? /\D/g : /[^0-9.,]/g, '').slice(0, 5))}
              onBlur={() => {
                setBeruehrt((alt) => ({ ...alt, [feld.id]: true }));
                if (feld.bereinigen) setze(feld.id, feld.bereinigen(roh));
              }}
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                if (letzte) { event.currentTarget.blur(); weiter(); } else document.getElementById(`feld-frage-${frage.id}-${frage.felder[stelle + 1].id}`)?.focus();
              }}
              className={eingabeKlasse}
            />
          </Field>
        );
      })}
    </div>
  );
}

// Folgefelder des Originals: Text, Datum, Zahl (z. B. SDK stationär „Von wann“).
function FolgeFeld({
  frage, wert, setAntwort, fehler,
}) {
  const id = `feld-frage-${frage.id}`;
  const text = fehler;
  let eigenschaften = { type: 'text', autoComplete: 'off', maxLength: frage.maxLength || 500 };
  if (frage.typ === 'datum') eigenschaften = { type: 'text', inputMode: 'numeric', placeholder: 'TT.MM.JJJJ', maxLength: 10, autoComplete: 'off' };
  if (frage.typ === 'zahl') eigenschaften = { type: 'text', inputMode: 'numeric', maxLength: 5, autoComplete: 'off' };
  return (
    <Field id={id} label={frage.label || frage.text} hint={frage.pflicht === false ? 'Freiwillig' : undefined} error={text}>
      <input
        {...fieldAria(id, { hint: frage.pflicht === false, error: text })}
        {...eigenschaften}
        value={wert ?? ''}
        onChange={(event) => {
          let neu = event.target.value;
          if (frage.typ === 'zahl') neu = neu.replace(/\D/g, '');
          if (frage.typ === 'datum') neu = neu.replace(/[^0-9.]/g, '');
          setAntwort(frage.id, neu);
        }}
        className={eingabeKlasse}
      />
    </Field>
  );
}

// Folgefragen (rekursiv nach Bedingung) unter der Hauptfrage.
function Folgefragen({
  frage, daten, setAntwort, beantworte, fehler, kontext,
}) {
  return sichtbareFolgefragen(frage, kontext).map((teil) => (
    <div key={teil.id} data-folge={teil.id}>
      {(teil.typ === 'auswahl' || teil.typ === 'mehrfach') && (
        <Auswahl frage={teil} wert={daten.antworten[teil.id]} setAntwort={setAntwort} fehler={fehler[`frage-${teil.id}`]} mehrfach={teil.typ === 'mehrfach'} />
      )}
      {teil.typ === 'janein' && (
        <div className={KARTE}>
          <p id={`frage-${teil.id}-text`} className="text-lg font-semibold leading-7 text-home-midnight">{teil.text}</p>
          <JaNein frage={teil} wert={daten.antworten[teil.id]} beantworte={beantworte} gesperrt={false} fehler={fehler[`frage-${teil.id}`]} />
        </div>
      )}
      {['text', 'datum', 'zahl'].includes(teil.typ) && (
        <FolgeFeld frage={teil} wert={daten.antworten[teil.id]} setAntwort={setAntwort} fehler={fehler[`frage-${teil.id}`]} />
      )}
    </div>
  ));
}

function Stamm({ frage }) {
  if (frage.stamm) {
    return (
      <p className="rounded-[1rem] bg-home-ice px-4 py-3 text-base leading-6 text-home-slate ring-1 ring-home-midnight/5">
        <span className="font-bold text-home-midnight">{frage.stamm.label}: </span>
        „{frage.stamm.text}“
      </p>
    );
  }
  if (frage.stammAufklappbar) {
    return (
      <Aufklapper titel={<span className="[hyphens:manual]">{frage.stammAufklappbar.titel}</span>}>
        <p className="text-home-slate">„{frage.stammAufklappbar.text}“</p>
      </Aufklapper>
    );
  }
  return null;
}

// Hinweis, wenn eine Antwort nur mit persönlicher Prüfung geht oder der
// Versicherer online nicht annimmt. Auswege aus der Definition, wie sie die
// Produktseite schon anbietet (Zahn: UKV oder zusammen am Telefon).
const AUSWEGE = {
  telefon: (sparte) => ({ href: telefonLink(sparte), label: 'Zusammen am Telefon' }),
  termin: () => ({ href: TERMIN_LINK, label: 'Termin vereinbaren' }),
  // Mit eingeschaltetem UKV-Produkt bleibt der Kunde in der eigenen Maske.
  ukv: () => (HEALIO_ANTRAGSMASKE_AKTIV && HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV
    ? { href: '/antrag/zahn-ukv', label: 'UKV ZahnPRIVAT beantragen' }
    : { href: UKV_URL, label: 'UKV ZahnPRIVAT online berechnen', extern: true }),
};
function PruefungHinweis({ wirkung, sparte }) {
  const auswege = (wirkung.auswege || ['telefon', 'termin']).map((art) => AUSWEGE[art]?.(sparte)).filter(Boolean);
  return (
    <Callout tone="hinweis" title={wirkung.art === 'keineAufnahme' ? 'Hier geht es online leider nicht weiter.' : 'Das schauen wir uns am besten zusammen an.'} data-pruefung="">
      {wirkung.text && <p>{wirkung.text}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {auswege.map((weg, stelle) => (
          <a key={weg.href} href={weg.href} data-zaehler-ignorieren="" data-ausweg="" {...(weg.extern ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={buttonClass(stelle === 0 ? 'primary' : 'secondary')}>
            {weg.label}
            {weg.extern && <span className="sr-only"> (öffnet in neuem Tab)</span>}
          </a>
        ))}
      </div>
    </Callout>
  );
}

export default function SchrittFrage({
  definition, frage, nummer, anzahl, daten, setAntwort, beantworte, gesperrt, fehler, ueberschriftRef, kontext, stop, weiter, vorbelegt = false, vorbelegtVon,
}) {
  const folge = sichtbareFolgefragen(frage, kontext);
  // Bei Folgefragen ohne Hinweis: Hinweis bei „ja“ trotzdem zeigen (SDK stationär).
  const wert = daten.antworten[frage.id];
  return (
    <div className="space-y-4">
      <div>
        <h2 ref={ueberschriftRef} tabIndex={-1} className="flex flex-wrap items-baseline gap-x-3 font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
          <span className="min-w-0">{frage.titel || `Frage ${nummer}`}</span>
          <span className="sr-only">, </span>
          <span className="whitespace-nowrap text-base font-bold text-emerald-800">{nummer} von {anzahl}</span>
        </h2>
        <div className="mt-2 flex gap-1" aria-hidden="true">
          {Array.from({ length: anzahl }, (_, stelle) => <span key={stelle} className={cx('h-1 flex-1 rounded-full', stelle < nummer ? 'bg-emerald-600' : 'bg-home-midnight/10')} />)}
        </div>
        {nummer === 1 && !definition.gesundheit.vorspann && <p className="mt-3 text-base leading-7 text-home-slate">{WARUM_GESUNDHEIT}</p>}
      </div>
      {vorbelegt && (
        <p className="flex gap-2 rounded-[1rem] bg-home-mint/15 px-4 py-3 text-base leading-6 text-emerald-950" data-vorbelegt="">
          <Check className="mt-1 h-4 w-4 shrink-0" strokeWidth={3} aria-hidden="true" />
          <span>{vorbelegtVon || 'Aus deinen Antworten vorab übernommen.'} Stimmt das so? Tippe deine Antwort zur Bestätigung an.</span>
        </p>
      )}
      <Stamm frage={frage} />
      <div key={frage.id} data-fehlerblock="" className={cx(KARTE, EINBLENDEN)}>
        <p className="mb-2 text-base font-semibold text-home-slate">{wortlautVon(definition)}</p>
        {frage.liste && (
          <ul id={`frage-${frage.id}-text`} className="mb-1 space-y-1 text-base font-semibold leading-6 text-home-midnight sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
            {frage.liste.map((eintrag) => (
              <li key={eintrag} className="flex gap-2">
                <span aria-hidden="true" className="mt-[0.5625rem] h-1.5 w-1.5 shrink-0 rounded-full bg-home-midnight" />
                <span className={cx('min-w-0 break-words', TRENNUNG)}>{eintrag}</span>
              </li>
            ))}
          </ul>
        )}
        {frage.text && (
          <p id={`frage-${frage.id}-text`} className={cx('break-words text-lg font-semibold leading-7 text-home-midnight', TRENNUNG)}>{frage.text}</p>
        )}
        {frage.typ === 'janein' && <JaNein frage={frage} wert={wert} beantworte={beantworte} gesperrt={gesperrt} fehler={fehler[`frage-${frage.id}`]} />}
        {(frage.typ === 'auswahl' || frage.typ === 'mehrfach') && (
          <Auswahl frage={frage} wert={wert} setAntwort={setAntwort} fehler={fehler[`frage-${frage.id}`]} mehrfach={frage.typ === 'mehrfach'} />
        )}
        {frage.typ === 'masse' && <Masse frage={frage} wert={wert} setAntwort={setAntwort} fehler={fehler[`frage-${frage.id}`]} weiter={weiter} />}
      </div>
      {folge.length > 0 && wert === 'ja' && frage.hinweisBeiJa && <p className="text-base leading-6 text-emerald-900" data-hinweis-ja="">{frage.hinweisBeiJa}</p>}
      <div className="space-y-3">
        <Folgefragen frage={frage} daten={daten} setAntwort={setAntwort} beantworte={beantworte} fehler={fehler} kontext={kontext} />
      </div>
      {stop && <PruefungHinweis wirkung={stop} sparte={definition.sparte} />}
    </div>
  );
}
