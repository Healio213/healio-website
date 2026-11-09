import React from 'react';
import { findeTarif, formatEuro, tarifName } from '@/data/sdkAmbulantAntrag';
import { BEITRAG_HINWEIS, BEITRAG_LABEL } from '@/data/sdkAmbulantAntragTexte';
import Antworten, { AendernKnopf } from './Antworten';
import {
  Button, Callout, bodyText, schuetze,
} from './ui';

function Zeile({
  label, children, unten, aendern, aendernId,
}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 border-t border-slate-300 py-1.5 first:border-t-0">
      <span className="text-base leading-6 text-home-slate">{label}</span>
      <span className="flex min-h-11 items-center gap-1 text-base font-bold leading-6 text-home-midnight">
        {children}
        {aendern && <AendernKnopf id={aendernId} label={label} onClick={aendern} />}
      </span>
      {unten && <span className="basis-full pb-1 text-base leading-6 text-home-slate">{unten}</span>}
    </li>
  );
}

// Schritt 3: Beitrag und Zuschlag, so wie der Antragsdienst sie rechnet
// (POST /antrag/api/beitrag). Die Seite rechnet nicht selbst.
export default function StepBeitrag({
  daten, antwort, laedt, ladeFehler, nochmal, geburtsdatumText, uebersichtOffen, setUebersichtOffen, aendern, aendernAngabe,
}) {
  if (ladeFehler) {
    return (
      <Callout tone="hinweis" title="Dein Beitrag lädt gerade nicht.">
        <p>{ladeFehler}</p>
        <Button variant="secondary" className="mt-3" onClick={nochmal}>Noch einmal versuchen</Button>
      </Callout>
    );
  }
  if (laedt || !antwort) {
    return (
      <div className="rounded-[1.4rem] bg-home-midnight p-5 text-white" aria-live="polite" aria-busy="true">
        <p className="text-base font-bold text-home-mint-active">{BEITRAG_LABEL}</p>
        <p className="mt-2 text-base leading-7 text-slate-100">Wir rechnen deinen Beitrag aus …</p>
      </div>
    );
  }
  const tarif = findeTarif(antwort.tarifCode || daten.tarifCode);
  const gruende = Array.isArray(antwort.gruende) ? antwort.gruende : [];

  return (
    <div className="space-y-5">
      <div className="rounded-[1.4rem] bg-home-midnight p-5 text-white" data-beitrag="">
        <p className="text-base font-bold text-home-mint-active">{BEITRAG_LABEL}</p>
        <p className="mt-1 whitespace-nowrap font-display text-4xl font-extrabold tracking-[-0.03em]">{formatEuro(antwort.beitrag)}</p>
        <p className="mt-1 text-base leading-6 text-slate-100">
          {antwort.zuschlagProzent > 0 ? `darin ${antwort.zuschlagProzent} % Zuschlag aus deinen Antworten` : 'ohne Zuschlag'}
        </p>
      </div>

      <ul className="rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-1">
        <Zeile label="Stufe" aendern={() => aendernAngabe('tarif')} aendernId="aendern-tarif">{tarifName(tarif)}</Zeile>
        <Zeile label="Beginn" aendern={() => aendernAngabe('beginn')} aendernId="aendern-beginn">{antwort.beginnText}</Zeile>
        <Zeile label="Geburtsdatum" aendern={() => aendernAngabe('geburtsdatum')} aendernId="aendern-geburtsdatum">{geburtsdatumText}</Zeile>
        {antwort.zuschlagProzent > 0
          ? (
            <>
              <Zeile label="Grundbeitrag"><span className="whitespace-nowrap">{formatEuro(antwort.grundbeitrag)}</span></Zeile>
              <Zeile label="Beitragszuschlag" unten={gruende.length > 0 ? `Wegen: ${gruende.join(', ')}` : null}>{antwort.zuschlagProzent} %</Zeile>
            </>
          )
          : <Zeile label="Beitragszuschlag">keiner</Zeile>}
      </ul>

      <div>
        <Button
          variant="secondary"
          aria-expanded={uebersichtOffen}
          aria-controls="antworten-uebersicht"
          onClick={() => setUebersichtOffen(!uebersichtOffen)}
          className="w-full sm:w-auto"
        >
          Antworten ändern
        </Button>
        <div id="antworten-uebersicht" hidden={!uebersichtOffen} className="mt-3">
          {uebersichtOffen && (
            <>
              <h2 id="antworten-titel" tabIndex={-1} className="scroll-mt-4 font-display text-xl font-extrabold text-home-midnight outline-none">Deine Antworten</h2>
              <Antworten daten={daten} aendern={aendern} className="mt-2" />
            </>
          )}
        </div>
      </div>

      <p className={bodyText}>{schuetze(BEITRAG_HINWEIS)}</p>
    </div>
  );
}
