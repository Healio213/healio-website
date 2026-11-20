import React from 'react';
import { euro } from '@/lib/antragsmaske/regeln';
import { Button, bodyText, schuetze } from '@/components/antrag/ui';
import { AendernKnopf } from '@/components/antrag/Antworten';
import Antwortenliste from './Antwortenliste';

// Schritt 3 „Dein Beitrag“: Beitrag aus demselben Regelwerk wie der
// Antragsdienst, mit Zuschlag, falls einer anfällt. Der Server rechnet beim
// Absenden selbst nach.

function Zeile({
  label, children, unten, aendern,
}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 border-t border-slate-300 py-1.5 first:border-t-0">
      <span className="text-base leading-6 text-home-slate">{label}</span>
      <span className="flex min-h-11 items-center gap-1 text-base font-bold leading-6 text-home-midnight">
        {children}
        {aendern}
      </span>
      {unten && <span className="basis-full pb-1 text-base leading-6 text-home-slate">{unten}</span>}
    </li>
  );
}

export default function SchrittBeitrag({
  definition, daten, beitrag, tarif, beginn, geburtsdatumText, aendern, aendernFrage, uebersichtOffen, setUebersichtOffen, kontext,
}) {
  if (!beitrag) {
    return <p className={bodyText}>Für diese Angaben können wir den Beitrag hier nicht rechnen. Ruf uns gern an, dann machen wir den Antrag zusammen.</p>;
  }
  const mitZuschlag = beitrag.zuschlagProzent > 0 || beitrag.zuschlagEuro > 0;
  const jaehrlich = beitrag.dienst && daten.zahlweise === 'jaehrlich';
  const zahlweise = definition.zahlung.zahlweisen.find((eintrag) => eintrag.id === daten.zahlweise);
  const bausteine = (definition.bausteine || []).filter((baustein) => daten.bausteine?.includes(baustein.id));
  const zuschlagText = [beitrag.zuschlagProzent > 0 && `${beitrag.zuschlagProzent} %`, beitrag.zuschlagEuro > 0 && euro(beitrag.zuschlagEuro)].filter(Boolean).join(' und ');
  // Nachbesserung 20.11.2026: Entscheidet der Versicherer erst nach Eingang (SDK stationär) und gibt es
  // mindestens ein „Ja“, steht hier kein „ohne Zuschlag“ und kein „keiner“, das klänge wie eine Zusage.
  const zuschlagNachEingang = !mitZuschlag && Boolean(definition.beitrag?.hinweisNachEingang) && Object.values(daten.antworten || {}).includes('ja');
  const versicherer = definition.versicherer?.kurz ? `die ${definition.versicherer.kurz}` : 'der Versicherer';
  return (
    <div className="space-y-5">
      <div className="rounded-[1.4rem] bg-home-midnight p-5 text-white" data-beitrag="">
        <p className="text-base font-bold text-home-mint-active">{jaehrlich ? 'Dein Jahresbeitrag' : 'Dein Monatsbeitrag'}</p>
        <p className="mt-1 whitespace-nowrap font-display text-4xl font-extrabold tracking-[-0.03em]" data-beitrag-wert="">{euro(beitrag.beitrag)}</p>
        {!beitrag.dienst && (
          <p className="mt-1 text-base leading-6 text-slate-100">
            {mitZuschlag ? `darin ${zuschlagText} Zuschlag aus deinen Antworten` : zuschlagNachEingang ? `Ob ein Zuschlag dazukommt, entscheidet ${versicherer} nach Eingang.` : 'ohne Zuschlag'}
          </p>
        )}
        {beitrag.folgejahr && (
          <p className="mt-2 text-base leading-6 text-slate-100" data-folgejahr="">
            Ab {beitrag.folgejahr.ab}: {euro(beitrag.folgejahr.beitrag)} im Monat, weil du dann in die nächste Altersgruppe kommst.
          </p>
        )}
      </div>

      <ul className="rounded-[1.4rem] bg-white px-5 py-1 ring-1 ring-home-midnight/10">
        <Zeile label="Stufe" aendern={<AendernKnopf id="aendern-tarif" label="Stufe" onClick={() => aendern('tarif')} />}>{tarif?.name}</Zeile>
        {bausteine.map((baustein) => <Zeile key={baustein.id} label="Baustein" aendern={<AendernKnopf id={`aendern-${baustein.id}`} label={baustein.name} onClick={() => aendern('tarif')} />}>{baustein.name}</Zeile>)}
        {beitrag.dienst && zahlweise && <Zeile label="Zahlungsweise">{zahlweise.label}</Zeile>}
        <Zeile label="Beginn">{beginn?.label}</Zeile>
        <Zeile label="Geburtsdatum" aendern={<AendernKnopf id="aendern-geburtsdatum" label="Geburtsdatum" onClick={() => aendern('tarif')} />}>{geburtsdatumText}</Zeile>
        {beitrag.dienst ? null : mitZuschlag
          ? (
            <>
              <Zeile label="Grundbeitrag"><span className="whitespace-nowrap">{euro(beitrag.grundbeitrag)}</span></Zeile>
              <Zeile label="Beitragszuschlag" unten={beitrag.gruende?.length > 0 ? `Wegen: ${beitrag.gruende.join(', ')}` : null}>{zuschlagText}</Zeile>
            </>
          )
          : <Zeile label="Beitragszuschlag">{zuschlagNachEingang ? <span data-zuschlag-nach-eingang="">entscheidet {versicherer} nach Eingang</span> : 'keiner'}</Zeile>}
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
              <Antwortenliste definition={definition} daten={daten} kontext={kontext} aendern={aendernFrage} className="mt-2" />
            </>
          )}
        </div>
      </div>

      {definition.beitrag?.hinweisNachEingang && Object.values(daten.antworten).includes('ja') && (
        <p className="rounded-[1rem] bg-home-ice p-4 ring-1 ring-emerald-900/10 text-base leading-7 text-home-midnight" data-hinweis-eingang="">{definition.beitrag.hinweisNachEingang}</p>
      )}
      {definition.beitrag?.vorbehalt && <p className={bodyText}>{schuetze(definition.beitrag.vorbehalt)}</p>}
    </div>
  );
}
