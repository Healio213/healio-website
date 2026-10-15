import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

// Verweis auf den Tarifvergleich (Auftrag Frank 15.10.2026): kompakte Karte
// unter allen bestehenden Abschnitten von /ambulant. Überschrift und Aufbau der
// Seite bleiben unverändert. Der Ratgeber ist deutsch, deshalb nur auf /ambulant
// in der deutschen Fassung.
const AmbulantVergleichTeaser = () => {
  const { lang } = useLanguage();
  if (lang === 'en') return null;

  return (
    <section className="bg-white px-4 pb-12 pt-4 sm:px-6 lg:px-8" aria-labelledby="ambulant-vergleich-titel" data-ambulant-vergleich-teaser="">
      <div className="mx-auto max-w-5xl rounded-[1.75rem] border border-[#cfeee0] bg-[#f4faf7] p-5 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-7">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#087654]">Tarifvergleich 2026</p>
          <h2 id="ambulant-vergleich-titel" className="mt-2 font-display text-xl font-extrabold leading-snug text-[#07111f] [text-wrap:balance] sm:text-2xl">
            Wie steht die SDK neben anderen Heilpraktiker-Tarifen?
          </h2>
          <p className="mt-2 text-base leading-7 text-slate-700">
            Acht bekannte ambulante Tarife nebeneinander: Erstattung beim Heilpraktiker, Höchstbetrag, Wartezeit, Brille und Gesundheitsfragen. Mit Quelle zu jedem Wert und einer Auswahlhilfe nach deinem Schwerpunkt.
          </p>
        </div>
        <Link
          to="/ratgeber/heilpraktiker-zusatzversicherung-vergleich-2026"
          className="mt-5 inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full border-2 border-[#07111f] bg-white px-6 font-display text-base font-extrabold text-[#07111f] transition hover:bg-[#07111f] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4 sm:mt-0 sm:w-auto"
        >
          Zum Tarifvergleich
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default AmbulantVergleichTeaser;
