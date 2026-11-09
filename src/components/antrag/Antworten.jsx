import React from 'react';
import {
  FRAGEN_1B_1K,
  FRAGE_INDEX_1A,
  FRAGE_INDEX_GROESSE,
  antwort1aText,
  gewichtAnzeige,
  groesseAnzeige,
  indexDerJaNeinFrage,
} from '@/data/sdkAmbulantAntrag';
import { FOKUS, TRENNUNG, cx } from './ui';

const ja = (wert) => (wert === 'ja' ? 'Ja' : 'Nein');

// id: Nach der Rückkehr aus „ändern“ legt die Seite den Fokus wieder hierher.
export function AendernKnopf({ id, label, onClick }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className={cx(FOKUS, 'inline-flex min-h-11 shrink-0 items-center rounded-full px-3 font-semibold text-emerald-800 underline underline-offset-4 [@media(hover:hover)]:hover:text-home-midnight')}
    >
      ändern<span className="sr-only">: {label}</span>
    </button>
  );
}

function Zeile({ label, wert, aendern, aendernId }) {
  return (
    <li className="flex items-start justify-between gap-3 border-t border-slate-300 py-2 first:border-t-0">
      <span className="min-w-0">
        <span className={cx('block text-base leading-6 text-home-slate', TRENNUNG)}>{label}</span>
        <span className="block text-base font-bold leading-6 text-home-midnight">{wert}</span>
      </span>
      {aendern && <AendernKnopf id={aendernId} label={label} onClick={aendern} />}
    </li>
  );
}

// Alle Antworten auf die Gesundheitsfragen. Mit aendern (Index der Frage)
// steht an jeder Antwort ein Knopf, der direkt zu dieser Frage springt.
// kompakt: 1b bis 1k in zwei Spalten, für das Übertragen in Weg A.
export default function Antworten({ daten, aendern, kompakt = false, className }) {
  // „Nein“ oder „Ja: …“ mit den angekreuzten Erkrankungen.
  const wert1a = antwort1aText(daten);
  const koerper = `${groesseAnzeige(daten.groesse)} cm, ${gewichtAnzeige(daten.gewicht)} kg`;
  const mitAendern = (index) => (aendern ? () => aendern(index) : undefined);

  if (kompakt) {
    return (
      <div className={cx('text-base leading-6 text-home-midnight', className)}>
        <p className="py-1.5"><span className="font-bold">Frage 1a: </span>{wert1a}</p>
        <ul className="grid grid-cols-2 gap-x-4 border-t border-slate-300 py-1.5">
          {FRAGEN_1B_1K.map((frage) => (
            <li key={frage.id}><span className="font-bold">Frage {frage.id}: </span>{ja(daten.antworten[frage.id])}</li>
          ))}
        </ul>
        <p className="border-t border-slate-300 py-1.5"><span className="font-bold">Größe: </span>{groesseAnzeige(daten.groesse)} cm</p>
        <p className="border-t border-slate-300 py-1.5"><span className="font-bold">Gewicht: </span>{gewichtAnzeige(daten.gewicht)} kg</p>
      </div>
    );
  }

  return (
    <ul className={cx('rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-1', className)}>
      <Zeile label="Frage 1a" wert={wert1a} aendern={mitAendern(FRAGE_INDEX_1A)} aendernId={`aendern-frage-${FRAGE_INDEX_1A}`} />
      {FRAGEN_1B_1K.map((frage) => (
        <Zeile
          key={frage.id}
          label={`Frage ${frage.id}, ${frage.kurz}`}
          wert={ja(daten.antworten[frage.id])}
          aendern={mitAendern(indexDerJaNeinFrage(frage.id))}
          aendernId={`aendern-frage-${indexDerJaNeinFrage(frage.id)}`}
        />
      ))}
      <Zeile label="Frage 2, Größe und Gewicht" wert={koerper} aendern={mitAendern(FRAGE_INDEX_GROESSE)} aendernId={`aendern-frage-${FRAGE_INDEX_GROESSE}`} />
    </ul>
  );
}
