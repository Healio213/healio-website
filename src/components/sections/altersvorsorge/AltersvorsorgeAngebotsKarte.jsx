import React, { useId } from 'react';
import AltersvorsorgeIllustration from './AltersvorsorgeIllustration';

// Die Randfarbe gehört zur Kachel, nicht zur Position. So bleibt jede
// Kachel in ihrer Farbe, egal in welcher Reihenfolge die Variante sie zeigt.
const KACHEL_FARBEN = {
  grundzulage: { rand: 'border-[#b9e6d6]' },
  kinderzulage: { rand: 'border-[#d7d3ee]' },
  startbonus: { rand: 'border-[#ead8a7]' },
  neu: { rand: 'border-[#c5dceb]' },
};

const STANDARD_FARBE = { rand: 'border-[#b9e6d6]' };

/**
 * Angebotskarte im Hero von /altersvorsorgedepot, nach dem Muster der Karte in
 * StationaerHero (helle Karte, Figur, Angebotskacheln), aber in Healio-Farben
 * mit einer eigenen Depot-Illustration und thematischen Zulagenmotiven.
 *
 * Text und Reihenfolge kommen komplett von außen (Content-Datei). Auf dem Handy
 * steht jede Kachel einzeln, auf breiteren Karten rutschen zwei nebeneinander.
 */
const AltersvorsorgeAngebotsKarte = ({ titel, kacheln, hinweis }) => {
  const titelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={titelId}
      className="relative overflow-hidden rounded-[2.2rem] border border-emerald-100 bg-gradient-to-br from-[#eefaf5] via-white to-[#fff5d9] p-5 text-[#071726] shadow-[0_28px_70px_rgba(7,17,31,0.10)] sm:p-7"
    >
      <div className="flex items-center gap-4 sm:gap-5">
        <AltersvorsorgeIllustration kind="depot" className="h-20 w-20 shrink-0 sm:h-24 sm:w-24" />
        <p id={titelId} className="font-display text-lg font-extrabold leading-tight text-[#0b6048] sm:text-xl">
          {titel}
        </p>
      </div>

      <ul className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(12rem,1fr))]">
        {kacheln.map((kachel) => {
          const farbe = KACHEL_FARBEN[kachel.key] || STANDARD_FARBE;
          return (
            <li
              key={kachel.key}
              className={`flex items-center gap-3 rounded-2xl border bg-white/95 p-3.5 shadow-[0_12px_30px_rgba(39,63,72,0.10)] sm:block sm:p-4 ${farbe.rand}`}
            >
              <AltersvorsorgeIllustration kind={kachel.key} className="h-12 w-12 shrink-0 sm:mb-2 sm:h-14 sm:w-14" />
              <div className="min-w-0">
                <p className="whitespace-nowrap font-display text-[1.375rem] font-extrabold leading-tight tracking-tight text-[#071726] sm:text-2xl">
                  {kachel.wert}
                </p>
                <p className="mt-1 text-base font-medium leading-snug text-slate-600">{kachel.text}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 text-base leading-6 text-slate-600">{hinweis}</p>
    </div>
  );
};

export default AltersvorsorgeAngebotsKarte;
