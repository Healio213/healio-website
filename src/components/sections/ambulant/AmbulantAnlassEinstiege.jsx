import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { AMBULANT_ANLASS_UEBERSCHRIFT_RATGEBER } from '@/content/ambulantAnlaesse/gemeinsam';

/**
 * Karte am Ende eines Ratgebers, die auf die passende Anlassseite unter
 * /ambulant/… führt (Seitenplan Abschnitt 6.1). Welcher Ratgeber welche Seite
 * zeigt, steht in src/content/ambulantAnlaesse/ratgeberZuordnung.js.
 */
const AmbulantAnlassEinstiege = ({ anlaesse, headingId = 'ambulant-anlass-einstiege-heading' }) => {
  if (!anlaesse?.length) return null;

  return (
    <section aria-labelledby={headingId} className="mt-10 sm:mt-14" data-ambulant-anlass-einstiege="kompakt">
      <h2 id={headingId} className="break-words font-display text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] hyphens-auto sm:text-3xl sm:hyphens-manual">{AMBULANT_ANLASS_UEBERSCHRIFT_RATGEBER}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {anlaesse.map((anlass) => (
          <li key={anlass.slug} className="flex">
            <Link
              to={anlass.path}
              className="group flex h-full w-full items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              <FriendlyIcon kind={anlass.motiv} tone="mint" size="md" className="shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-extrabold leading-snug text-slate-950">{anlass.label}</span>
                <span className="mt-1 block text-base leading-6 text-slate-600">{anlass.kurz}</span>
                <span className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#076046] underline decoration-emerald-300 underline-offset-4">
                  {anlass.linkLabel}
                  <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AmbulantAnlassEinstiege;
