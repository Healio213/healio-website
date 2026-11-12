import React from 'react';
import { euro, ibanOhneLeer } from '@/lib/antragsmaske/regeln';
import { auftragSatz, beitragsAnzeige } from '@/lib/antragsmaske/vertrag';
import { AendernKnopf } from '@/components/antrag/Antworten';
import {
  Button, Callout, bodyText, schuetze,
} from '@/components/antrag/ui';
import Antwortenliste from './Antwortenliste';
import { TeilKopf } from './teile';

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

export default function SchrittZusammenfassung({
  definition, daten, kontext, tarif, beginn, beitrag, geburtsdatumText, aendern, aendernFrage, ueberschriftRef,
  absenden, sendet, sendeFehler, beitragNeu,
}) {
  const f = daten.formular;
  const anrede = (definition.person.anreden || []).find((eintrag) => eintrag.id === daten.anrede);
  const zahlweise = definition.zahlung.zahlweisen.find((eintrag) => eintrag.id === daten.zahlweise);
  const iban = ibanOhneLeer(daten.iban);
  return (
    <div className="space-y-4">
      <TeilKopf titel={definition.zusammenfassung?.titel || 'Zusammenfassung'} ueberschriftRef={ueberschriftRef} text="Bis du absendest, ist nichts abgeschlossen." />

      <ul className="rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-1" data-uebersicht="">
        <Pruefzeile label="Stufe" id="tarif" aendern={() => aendern('tarif')}>{tarif?.name}</Pruefzeile>
        <Pruefzeile label="Beginn" id="beginn" aendern={() => aendern('tarif')}>{beginn?.label}</Pruefzeile>
        {(definition.bausteine || []).filter((baustein) => daten.bausteine?.includes(baustein.id)).map((baustein) => (
          <Pruefzeile key={baustein.id} label="Baustein" id={`baustein-${baustein.id}`} aendern={() => aendern('tarif')}>{baustein.name}</Pruefzeile>
        ))}
        <Pruefzeile label={beitragsAnzeige(definition, daten, beitrag).label}>{euro(beitrag?.beitrag)}</Pruefzeile>
        <Pruefzeile label="Name" id="name" aendern={() => aendern('person')}>{[anrede?.label, f.vorname, f.nachname].filter(Boolean).join(' ')}</Pruefzeile>
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
        <Pruefzeile label="Zahlweise" id="zahlweise" aendern={() => aendern(definition.zahlweiseImTarif ? 'tarif' : 'zahlung')}>{zahlweise?.label}</Pruefzeile>
        <Pruefzeile label="IBAN" id="iban" aendern={() => aendern('zahlung')}>{iban.length >= 4 ? `${iban.slice(0, 2)} …${iban.slice(-4)}` : ''}</Pruefzeile>
      </ul>

      <div className="rounded-[1.2rem] border-2 border-slate-300 bg-white px-4 py-2">
        <h3 className="font-display text-lg font-extrabold text-home-midnight">Deine Antworten</h3>
        <Antwortenliste definition={definition} daten={daten} kontext={kontext} aendern={aendernFrage} className="mt-1 !border-0 !px-0" />
      </div>

      {beitragNeu && (
        <Callout tone="hinweis" title={`Dein Beitrag ist jetzt ${euro(beitragNeu)} im Monat.`} data-beitrag-neu="">
          <p>Die Berechnung hat sich gerade geändert. Wenn das für dich passt, schick den Antrag bitte noch einmal ab.</p>
        </Callout>
      )}
      {sendeFehler && (
        <Callout tone="hinweis" title={sendeFehler.titel} data-sendefehler="" role="alert">
          {sendeFehler.text && <p>{sendeFehler.text}</p>}
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

      <div>
        <p className="text-base font-bold leading-7 text-home-midnight" data-auftrag="">{schuetze(auftragSatz(definition, daten, beitrag))}</p>
        {definition.absenden.vorbehalt && <p className={bodyText}>{schuetze(definition.absenden.vorbehalt)}</p>}
      </div>
      <Button className="w-full sm:w-auto" onClick={absenden} disabled={sendet} aria-busy={sendet || undefined} id="knopf-absenden">
        {sendet ? 'Wird gesendet …' : definition.absenden.knopf}
      </Button>
    </div>
  );
}
