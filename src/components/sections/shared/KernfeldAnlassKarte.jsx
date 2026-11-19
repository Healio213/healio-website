import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

/**
 * Schlanker Einstieg auf einer Hauptseite (/zahn, /schwangerschaft, /ambulant)
 * zur Anlassseite ihres Feldes: genau eine Karte im Stil der Ratgeber-Karten,
 * ohne eigene Überschrift. Die Daten kommen aus den ANLAESSE-Listen unter
 * src/content/…Anlaesse/gemeinsam.js. Gezählt wird der Klick vom globalen
 * Leistungsweg-Zähler (src/lib/anonyme-zaehler.js), hier steht dafür nichts.
 */
const KernfeldAnlassKarte = ({ anlass, feld }) => {
  if (!anlass) return null;

  return (
    <section aria-label={anlass.label} className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 md:py-8" data-kernfeld-anlass-karte={feld}>
      <Link
        to={anlass.path}
        className="group flex w-full items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:p-5"
      >
        <FriendlyIcon kind={anlass.motiv} tone="mint" size="md" className="shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-extrabold leading-snug text-slate-950">{anlass.label}</span>
          <span className="mt-1 block text-base leading-6 text-slate-600">{anlass.kurz}</span>
          <span className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#076046] underline decoration-emerald-300 underline-offset-4">
            {anlass.linkLabel}
            <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </span>
      </Link>
    </section>
  );
};

export default KernfeldAnlassKarte;
