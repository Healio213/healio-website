import React from 'react';
import { euro, ibanOhneLeer } from '@/lib/antragsmaske/regeln';
import { auftragSatz, beitragsAnzeige } from '@/lib/antragsmaske/vertrag';
import { AendernKnopf } from '@/components/antrag/Antworten';
import {
  Button, Callout, FOKUS, NeuerTab, bodyText, buttonClass, cx, schuetze,
} from '@/components/antrag/ui';
import Antwortenliste from './Antwortenliste';
import { Haken, TERMIN_LINK, TeilKopf } from './teile';

// Schritt 7: alles auf einen Blick, „ändern“ an jeder Angabe, dann Absenden.

function Pruefzeile({
  label, children, aendern, id,
}) {
  return (
    <li className="flex items-start justify-between gap-3 border-t border-slate-300 py-2 first:border-t-0">
      <span className="min-w-0">
        <span className="block text-base leading-6 text-home-slate">{label}</span>
        <span className="block break-words text-base font-bold leading-6 text-home-midnight">{children}</span>
      </span>
      {aendern && <AendernKnopf id={`pruef-aendern-${id}`} label={label} onClick={aendern} />}
    </li>
  );
}

function Gruppe({ titel, children }) {
  return (
    <section className="rounded-[1.4rem] bg-white px-5 py-3 ring-1 ring-home-midnight/10">
      <h3 className="pt-1 font-display text-lg font-extrabold text-home-midnight">{titel}</h3>
      <ul className="mt-1">{children}</ul>
    </section>
  );
}

function AendernHell({ onClick, label }) {
  return (
    <button type="button" id="pruef-aendern-tarif" onClick={onClick} className={cx(FOKUS, 'inline-flex min-h-11 shrink-0 items-center rounded-full border border-white/30 px-4 font-semibold text-white focus-visible:ring-home-mint [@media(hover:hover)]:hover:border-home-mint')}>
      ändern<span className="sr-only">: {label}</span>
    </button>
  );
}

export default function SchrittZusammenfassung({
  definition, daten, kontext, tarif, beginn, beitrag, geburtsdatumText, aendern, aendernFrage, ueberschriftRef,
  absenden, sendet, sendeFehler, beitragNeu, setBestaetigung, bestaetigungFehler,
}) {
  const bestaetigung = definition.absenden?.bestaetigung;
  const f = daten.formular;
  const anrede = (definition.person.anreden || []).find((eintrag) => eintrag.id === daten.anrede);
  const zahlweise = definition.zahlung.zahlweisen.find((eintrag) => eintrag.id === daten.zahlweise);
  const iban = ibanOhneLeer(daten.iban);
  const bausteine = (definition.bausteine || []).filter((baustein) => daten.bausteine?.includes(baustein.id));
  const anzeige = beitragsAnzeige(definition, daten, beitrag);
  return (
    <div className="space-y-5">
      <TeilKopf titel={definition.zusammenfassung?.titel || 'Zusammenfassung'} ueberschriftRef={ueberschriftRef} text="Schau noch einmal drüber. Bis du absendest, ist nichts abgeschlossen." />

      <div className="space-y-4" data-uebersicht="">
        <section className="overflow-hidden rounded-[1.4rem] bg-home-midnight text-white">
          <div className="flex flex-wrap items-end justify-between gap-3 px-5 pb-4 pt-5">
            <div className="min-w-0">
              <p className="text-base text-slate-300">{tarif?.name}{bausteine.map((baustein) => ` + ${baustein.name}`).join('')} bei {schuetze(definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`)}</p>
              <p className="mt-1 text-base text-home-mint-active">{anzeige.label}</p>
              <p className="whitespace-nowrap font-display text-4xl font-extrabold tracking-[-0.03em]">{euro(beitrag?.beitrag)}</p>
            </div>
            <AendernHell onClick={() => aendern('tarif')} label="Tarif und Beginn" />
          </div>
          <dl className="grid grid-cols-2 gap-px bg-white/10 text-base">
            <div className="bg-home-midnight px-5 py-3"><dt className="text-slate-300">Stufe</dt><dd className="font-semibold">{tarif?.name}</dd></div>
            <div className="bg-home-midnight px-5 py-3"><dt className="text-slate-300">Beginn</dt><dd className="font-semibold">{beginn?.label}</dd></div>
          </dl>
        </section>

        <Gruppe titel="Über dich">
          <Pruefzeile label="Name" id="name" aendern={() => aendern('person')}>{[f.vorname, f.nachname].filter(Boolean).join(' ')}</Pruefzeile>
          {/* Geschlecht (SDK, UKV) bzw. Anrede (Bayerische) als eigene Zeile, nicht in der Namenszeile. */}
          {anrede && <Pruefzeile label={definition.person.anredeLegend || 'Anrede'} id="anrede" aendern={() => aendern('person')}>{anrede.label}</Pruefzeile>}
          <Pruefzeile label="Geburtsdatum" id="geburtsdatum" aendern={() => aendern('tarif')}>{geburtsdatumText}</Pruefzeile>
          <Pruefzeile label="Adresse" id="adresse" aendern={() => aendern('anschrift')}>{[f.strasse, f.hausnummer].filter(Boolean).join(' ')}, {f.plz} {f.ort}</Pruefzeile>
          <Pruefzeile label="Kontakt" id="kontakt" aendern={() => aendern('anschrift')}>
            <span className="break-all">{f.email}</span>
            <span className="block whitespace-nowrap font-bold">{f.telefon}</span>
          </Pruefzeile>
          {daten.bestaetigungen.gkv && (
            <Pruefzeile label="Krankenversicherung" id="kasse" aendern={() => aendern('anschrift')}>
              Gesetzlich versichert{String(f.krankenkasse || '').trim() ? `, ${String(f.krankenkasse).trim()}` : ''}
            </Pruefzeile>
          )}
        </Gruppe>

        <Gruppe titel="Zahlung">
          <Pruefzeile label="Zahlweise" id="zahlweise" aendern={() => aendern(definition.zahlweiseImTarif ? 'tarif' : 'zahlung')}>{zahlweise?.label}</Pruefzeile>
          <Pruefzeile label="IBAN" id="iban" aendern={() => aendern('zahlung')}>{iban.length >= 4 ? `${iban.slice(0, 2)} …${iban.slice(-4)}` : ''}</Pruefzeile>
        </Gruppe>
      </div>

      <section className="rounded-[1.4rem] bg-white px-5 py-4 ring-1 ring-home-midnight/10">
        <h3 className="font-display text-lg font-extrabold text-home-midnight">Deine Antworten</h3>
        <Antwortenliste definition={definition} daten={daten} kontext={kontext} aendern={aendernFrage} className="mt-1 !border-0 !px-0 !ring-0" />
      </section>

      {beitragNeu && (
        <Callout tone="hinweis" title={`Dein Beitrag ist jetzt ${euro(beitragNeu)} im Monat.`} data-beitrag-neu="">
          <p>Die Berechnung hat sich gerade geändert. Wenn das für dich passt, schick den Antrag bitte noch einmal ab.</p>
        </Callout>
      )}
      {sendeFehler && (
        <Callout tone="hinweis" title={sendeFehler.titel} data-sendefehler="" role="alert">
          {sendeFehler.text && <p>{sendeFehler.text}</p>}
          {sendeFehler.termin && (
            <>
              <p>Deine Angaben bleiben hier stehen. Klappt es weiter nicht, vereinbare gern einen Termin mit uns.</p>
              <div className="mt-3">
                <a href={TERMIN_LINK} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" data-sendefehler-termin="" className={buttonClass('secondary')}>
                  Termin vereinbaren<NeuerTab />
                </a>
              </div>
            </>
          )}
          {sendeFehler.felder?.length > 0 && (
            <ul className="mt-2 space-y-1">
              {sendeFehler.felder.map((feld) => (
                <li key={feld.bildschirm} className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">{feld.label}</span>
                  <AendernKnopf id={`fehler-aendern-${feld.bildschirm}`} label={feld.label} onClick={() => aendern(feld.bildschirm)} />
                </li>
              ))}
            </ul>
          )}
        </Callout>
      )}

      {bestaetigung && (
        <section className="space-y-3 rounded-[1.4rem] bg-white p-5 ring-1 ring-home-midnight/10" data-bestaetigung-sdk="">
          <h3 className="font-display text-lg font-extrabold text-home-midnight">{bestaetigung.titel}</h3>
          {bestaetigung.vorspann && <p className={bodyText}>{schuetze(bestaetigung.vorspann)}</p>}
          <Haken feldKey={bestaetigung.key} checked={daten.erklaerungen?.[bestaetigung.key]} onChange={setBestaetigung} fehler={bestaetigungFehler ? bestaetigung.fehler : null}>
            {schuetze(bestaetigung.text)}
          </Haken>
        </section>
      )}
      <div className="rounded-[1.4rem] bg-home-ice p-5 ring-1 ring-emerald-900/10">
        <p className="text-base font-bold leading-7 text-home-midnight" data-auftrag="">{schuetze(auftragSatz(definition, daten, beitrag))}</p>
        {definition.absenden.vorbehalt && <p className={bodyText}>{schuetze(definition.absenden.vorbehalt)}</p>}
      </div>
      <Button className="w-full !min-h-14 text-lg sm:w-auto sm:px-10" onClick={absenden} disabled={sendet} aria-busy={sendet || undefined} id="knopf-absenden">
        {sendet ? 'Wird gesendet …' : definition.absenden.knopf}
      </Button>
    </div>
  );
}
