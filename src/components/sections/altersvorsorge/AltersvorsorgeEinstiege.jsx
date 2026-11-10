import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import AltersvorsorgeIllustration from '@/components/sections/altersvorsorge/AltersvorsorgeIllustration';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { EINGANG_MOTIVE } from '@/lib/altersvorsorgeBildmotive';

/**
 * Karten zu den Anfrageseiten unter /altersvorsorgedepot/…, gestaltet wie
 * „Finde deinen Einstieg“ auf der Hauptseite /altersvorsorgedepot.
 * - variante="kompakt": Ratgeber-Artikelende, höchstens vier Einträge, Raster
 * - variante="alle": Ratgeber-Übersicht, alle Einträge als Wischreihe
 */
const EinstiegKarte = ({ eingang }) => (
  <Link
    to={eingang.path}
    className="group flex h-full w-full items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:border-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
  >
    {(() => { const m = EINGANG_MOTIVE[eingang.slug]; return m ? <FriendlyIcon kind={m.kind} tone={m.ton} size="md" className="shrink-0" /> : <AltersvorsorgeIllustration kind={eingang.motiv} className="h-14 w-14 shrink-0" />; })()}
    <span className="min-w-0 flex-1">
      <span className="block font-display text-lg font-extrabold leading-snug text-slate-950">{eingang.label}</span>
      <span className="mt-1 block text-base leading-6 text-slate-600">{eingang.kurz}</span>
    </span>
    <ArrowRight className="h-5 w-5 shrink-0 text-[#076046] transition group-hover:translate-x-0.5" aria-hidden="true" />
  </Link>
);

const AltersvorsorgeEinstiege = ({ eingaenge, ueberschrift, intro, headingId, variante = 'kompakt' }) => {
  if (!eingaenge?.length) return null;

  if (variante === 'alle') {
    return (
      <section aria-labelledby={headingId} className="mt-16" data-altersvorsorge-zielgruppen-einstiege="alle">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id={headingId} className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{ueberschrift}</h2>
          {intro && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{intro}</p>}
        </div>
        {/* bleed aus: Der Elternbereich der Übersicht hat px-5 statt px-4 (Vertrag von MobileSwipeRow). */}
        <MobileSwipeRow
          label={ueberschrift}
          className="mt-8"
          desktopClassName="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-4"
          itemClassName="flex"
          bleed={false}
        >
          {eingaenge.map((eingang) => <EinstiegKarte key={eingang.slug} eingang={eingang} />)}
        </MobileSwipeRow>
      </section>
    );
  }

  return (
    <section aria-labelledby={headingId} className="mt-10 sm:mt-14" data-altersvorsorge-zielgruppen-einstiege="kompakt">
      <h2 id={headingId} className="break-words font-display text-2xl font-extrabold leading-snug tracking-[-0.02em] text-[#07111f] hyphens-auto sm:text-3xl sm:hyphens-manual">{ueberschrift}</h2>
      {intro && <p className="mt-4 text-base leading-7 text-slate-600">{intro}</p>}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {eingaenge.slice(0, 4).map((eingang) => (
          <li key={eingang.slug} className="flex">
            <EinstiegKarte eingang={eingang} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AltersvorsorgeEinstiege;
