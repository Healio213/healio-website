import React from 'react';
import { sichtbareFolgefragen, sichtbareFragen } from '@/lib/antragsmaske/regeln';
import { AendernKnopf } from '@/components/antrag/Antworten';
import { TRENNUNG, cx } from '@/components/antrag/ui';

// Alle geltenden Antworten in der Reihenfolge der Fragen. Mit aendern steht
// an jeder Antwort ein Knopf, der direkt zur Frage springt.

const ohneTrenner = (text) => String(text ?? '').replace(/​/g, '');

export function antwortText(frage, antworten, kontext) {
  const wert = antworten[frage.id];
  if (frage.typ === 'janein') {
    if (wert !== 'ja') return 'Nein';
    const teile = sichtbareFolgefragen(frage, kontext).map((folge) => antwortText(folge, antworten, kontext)).filter(Boolean);
    return teile.length ? `Ja: ${teile.join('; ')}` : 'Ja';
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
  return String(wert ?? '');
}

export default function Antwortenliste({
  definition, daten, kontext, aendern, className,
}) {
  return (
    <ul className={cx('rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-1', className)} data-antwortenliste="">
      {sichtbareFragen(definition, kontext).map((frage) => (
        <li key={frage.id} className="flex items-start justify-between gap-3 border-t border-slate-300 py-2 first:border-t-0">
          <span className="min-w-0">
            <span className={cx('block text-base leading-6 text-home-slate', TRENNUNG)}>{frage.kurz || frage.titel}</span>
            <span className="block break-words text-base font-bold leading-6 text-home-midnight">{antwortText(frage, daten.antworten, kontext)}</span>
          </span>
          {aendern && <AendernKnopf id={`aendern-frage-${frage.id}`} label={frage.kurz || frage.titel} onClick={() => aendern(frage.id)} />}
        </li>
      ))}
    </ul>
  );
}
