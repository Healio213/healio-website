import React from 'react';
import { sichtbareFolgefragen, sichtbareFragen } from '@/lib/antragsmaske/regeln';
import { AendernKnopf } from '@/components/antrag/Antworten';
import { FOKUS, cx } from '@/components/antrag/ui';

// In der Zusammenfassung stehen lange Originalwortlaute in einer schmalen
// Spalte neben „ändern“: hier immer deutsche Silbentrennung (lang="de"),
// damit kein Wort hart ohne Trennstrich umbricht.
const TRENNUNG_LANG = 'hyphens-auto';

// Alle geltenden Antworten in der Reihenfolge der Fragen, je Antwort mit dem
// Fragetext im Wortlaut des Originals (lange Texte gekürzt, aufklappbar) und
// bei „ja“ mit den Folgeangaben. Mit aendern steht an jeder Antwort ein Knopf,
// der direkt zur Frage springt.

const ohneTrenner = (text) => String(text ?? '').replace(/​/g, '');
const KURZ = 140;

export function frageWortlaut(frage) {
  if (frage.stamm) return ohneTrenner(`${frage.stamm.text}${frage.liste ? ` ${frage.liste.join('; ')}` : ''}`);
  return ohneTrenner(frage.text || frage.legend || frage.label || frage.titel || '');
}

export function antwortText(frage, antworten, kontext) {
  const wert = antworten[frage.id];
  if (frage.typ === 'janein') {
    if (wert !== 'ja') return wert === 'nein' ? 'Nein' : '';
    // Ankreuzlisten (z. B. 1a) gehören zur Antwort selbst.
    const kreuze = sichtbareFolgefragen(frage, kontext).filter((folge) => folge.typ === 'mehrfach').map((folge) => antwortText(folge, antworten, kontext)).filter(Boolean);
    return kreuze.length ? `Ja: ${kreuze.join('; ')}` : 'Ja';
  }
  if (frage.typ === 'auswahl') return ohneTrenner(frage.optionen.find((option) => option.id === wert)?.label);
  if (frage.typ === 'mehrfach') {
    const liste = Array.isArray(wert) ? wert : [];
    return frage.optionen.filter((option) => liste.includes(option.id)).map((option) => ohneTrenner(option.label)).join('; ');
  }
  if (frage.typ === 'masse') {
    const werte = wert || {};
    return frage.felder.map((feld) => `${feld.anzeige ? feld.anzeige(werte[feld.id]) : werte[feld.id]} ${feld.einheit}`).join(', ');
  }
  return String(wert ?? '').trim();
}

// Folgeangaben nach „ja“ (ohne Ankreuzlisten, die stehen in der Antwort).
export function folgeAngaben(frage, antworten, kontext) {
  return sichtbareFolgefragen(frage, kontext)
    .filter((folge) => folge.typ !== 'mehrfach')
    .map((folge) => ({ id: folge.id, frage: frageWortlaut(folge), antwort: antwortText(folge, antworten, kontext) }))
    .filter((eintrag) => eintrag.antwort);
}

// Ist der Kurztitel nur der Anfang oder die gekürzte Fassung des Wortlauts
// (stationär), zeigt die Liste ihn nicht zusätzlich: nur Anzeige, die Daten
// bleiben unverändert. Echte Kurztitel („Frage 1b: Atemwege …“) bleiben.
const vergleichbar = (text) => String(text || '').replace(/(\s*(…|\.\.\.))+\s*$/, '').replace(/[?:.\s]+$/, '').replace(/\s+/g, ' ').trim().toLowerCase();
export function kurztitelDoppelt(kurz, wortlaut) {
  const k = vergleichbar(kurz);
  return Boolean(k) && vergleichbar(wortlaut).startsWith(k);
}

function Wortlaut({ text }) {
  if (text.length <= KURZ) return <span className={cx('block text-base leading-6 text-home-midnight', TRENNUNG_LANG)}>{text}</span>;
  return (
    <details className="group">
      <summary className={`${FOKUS} cursor-pointer list-none rounded text-base leading-6 text-home-midnight ${TRENNUNG_LANG} [&::-webkit-details-marker]:hidden`}>
        <span className="group-open:hidden">{`${text.slice(0, KURZ).replace(/\s+\S*$/, '')} … `}</span>
        <span className="font-semibold text-emerald-800 underline underline-offset-4 hyphens-none group-open:hidden">ganzen Wortlaut lesen</span>
        <span className="hidden font-semibold text-emerald-800 underline underline-offset-4 hyphens-none group-open:inline">Wortlaut einklappen</span>
      </summary>
      <span className={cx('mt-1 block text-base leading-6 text-home-midnight', TRENNUNG_LANG)}>{text}</span>
    </details>
  );
}

export default function Antwortenliste({
  definition, daten, kontext, aendern, className,
}) {
  return (
    <ul className={cx('rounded-[1.4rem] bg-white px-5 py-1 ring-1 ring-home-midnight/10', className)} data-antwortenliste="">
      {sichtbareFragen(definition, kontext).map((frage) => {
        const folge = daten.antworten[frage.id] === 'ja' ? folgeAngaben(frage, daten.antworten, kontext) : [];
        return (
          <li key={frage.id} className="flex items-start justify-between gap-3 border-t border-slate-300 py-2 first:border-t-0" data-antwort-zu={frage.id}>
            <span className="min-w-0 flex-1">
              {!kurztitelDoppelt(frage.kurz || frage.titel, frageWortlaut(frage)) && (
                <span className={cx('block text-base leading-6 text-home-slate', TRENNUNG_LANG)}>{frage.kurz || frage.titel}</span>
              )}
              <Wortlaut text={frageWortlaut(frage)} />
              <span className="mt-0.5 block break-words hyphens-auto text-base font-bold leading-6 text-home-midnight">{antwortText(frage, daten.antworten, kontext)}</span>
              {folge.length > 0 && (
                <ul className="mt-2 space-y-1 rounded-[0.8rem] bg-home-ice px-3 py-2" data-folgeangaben="">
                  {folge.map((eintrag) => (
                    <li key={eintrag.id} className="text-base leading-6">
                      <span className="block text-home-slate hyphens-auto">{eintrag.frage}</span>
                      <span className="block break-words hyphens-auto font-bold text-home-midnight">{eintrag.antwort}</span>
                    </li>
                  ))}
                </ul>
              )}
            </span>
            {aendern && <AendernKnopf id={`aendern-frage-${frage.id}`} label={frage.kurz || frage.titel} onClick={() => aendern(frage.id)} />}
          </li>
        );
      })}
    </ul>
  );
}
