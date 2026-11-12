import React from 'react';
import { FileText, Phone } from 'lucide-react';
import { HEALIO_ANTRAG_GESPRAECH_AKTIV } from '@/config/contactChannels';
import {
  Aufklapper, FehlerText, LINK, NeuerTab, OptionCard, TRENNUNG, cx, schuetze,
} from '@/components/antrag/ui';

// Kleine Bausteine der Antragsmaske /antrag/<sparte> (12.11.2026). Die
// Grundbausteine (Knopf, Karten, Felder) kommen unverändert von der Prüfseite
// (src/components/antrag/ui.jsx), damit beide gleich aussehen.

export const TERMIN_LINK = '/terminvereinbarung';
export const telefonLink = (sparte) => `/antrag/aufnehmen?sparte=${encodeURIComponent(sparte)}`;

export function TeilKopf({
  vorTitel, titel, ueberschriftRef, text,
}) {
  return (
    <div>
      <h2 ref={ueberschriftRef} tabIndex={-1} className="scroll-mt-4 font-display text-xl font-extrabold leading-tight text-home-midnight outline-none">
        {vorTitel && <span className="block text-base font-extrabold text-emerald-900">{vorTitel}</span>}
        {schuetze(titel)}
      </h2>
      {text && <p className="mt-1 text-base leading-7 text-home-slate">{schuetze(text)}</p>}
    </div>
  );
}

export function Karte({ titel, children, ...props }) {
  return (
    <section className="space-y-3 rounded-[1.2rem] border-2 border-slate-300 bg-white p-3 sm:p-4" {...props}>
      {titel && <h3 className="font-display text-lg font-extrabold leading-snug text-home-midnight">{schuetze(titel)}</h3>}
      {children}
    </section>
  );
}

// Volltext in Blöcken: ['titel' | 'h' | 'p' | 'fussnote', text], ['ul', [text]], ['wahl', 'I', [Blöcke]].
export function Bloecke({ bloecke }) {
  return (bloecke || []).map(([art, inhalt, extra], stelle) => {
    const key = `${art}-${stelle}`;
    if (art === 'titel') return <p key={key} className="font-bold [hyphens:auto]">{inhalt}</p>;
    if (art === 'h') return <p key={key} className="font-bold">{inhalt}</p>;
    if (art === 'ul') return <ul key={key} className="list-disc space-y-1 pl-5">{inhalt.map((punkt) => <li key={punkt.slice(0, 40)}>{punkt}</li>)}</ul>;
    if (art === 'wahl') {
      return (
        <div key={key} className="space-y-2 rounded-lg border border-slate-300 p-3">
          <p className="font-bold">Möglichkeit {inhalt}:</p>
          <Bloecke bloecke={extra} />
        </div>
      );
    }
    if (art === 'fussnote') return <p key={key} className="text-home-slate">{inhalt}</p>;
    return <p key={key}>{schuetze(inhalt)}</p>;
  });
}

export function Volltext({ titel, bloecke }) {
  return (
    <Aufklapper schlicht titel={<>Ganzen Text lesen<span className="sr-only">: {titel}</span></>}>
      <Bloecke bloecke={bloecke} />
    </Aufklapper>
  );
}

export const kurzText = (text) => <p className={cx('break-words text-base leading-7 text-home-midnight', TRENNUNG)}>{schuetze(text)}</p>;

// Haken mit Fehlertext. key bestimmt die Feld-Kennung (feld-<key>) für den Fokus.
export function Haken({
  feldKey, checked, onChange, fehler, children,
}) {
  return (
    <div data-fehlerblock="">
      <OptionCard
        id={`feld-${feldKey}`}
        type="checkbox"
        name={feldKey}
        checked={Boolean(checked)}
        onChange={(event) => onChange(event.target.checked)}
        describedBy={fehler ? `fehler-${feldKey}` : undefined}
        invalid={Boolean(fehler)}
      >
        {children}
      </OptionCard>
      <FehlerText id={`fehler-${feldKey}`}>{fehler}</FehlerText>
    </div>
  );
}

// beimOeffnen (optional): hält fest, wann der Kunde die Unterlage geöffnet hat
// (geht mit dem Antrag an den Antragsdienst, keine Messung).
export function UnterlageLink({ href, children, beimOeffnen }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-zaehler-ignorieren="" data-unterlage="" onClick={() => beimOeffnen?.(href)} onAuxClick={() => beimOeffnen?.(href)} className={cx(LINK, 'gap-1.5')}>
      <FileText className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{children}</span>
      <NeuerTab />
    </a>
  );
}

// Ausweg „Lieber zusammen am Telefon“, auf jedem Bildschirm sichtbar. Ist das
// Antragsgespräch abgeschaltet, führt er zum Termin.
export function TelefonAusweg({ sparte, className }) {
  const telefon = HEALIO_ANTRAG_GESPRAECH_AKTIV;
  return (
    <a
      href={telefon ? telefonLink(sparte) : TERMIN_LINK}
      data-zaehler-ignorieren=""
      data-telefon-ausweg=""
      className={cx(LINK, 'gap-1.5 whitespace-nowrap text-base', className)}
    >
      <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
      {telefon ? 'Lieber zusammen am Telefon' : 'Lieber zusammen besprechen'}
    </a>
  );
}
