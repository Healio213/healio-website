import React from 'react';

/**
 * Schmales, helles Band direkt über dem dunklen KassenBoost-Block auf
 * /ambulant, /zahn und /stationaer. Erklärt die ganzheitliche Reihenfolge
 * (zuerst Krankenkasse, dann Zusatzschutz) knapp und ohne eigenen CTA.
 */
const HolisticNote = ({ eyebrow, title, text, id, className = 'bg-[#FDFAF6]' }) => (
  <section className={`px-4 py-12 sm:px-6 md:py-14 lg:px-8 ${className}`} aria-labelledby={id}>
    <div className="healio-container">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-800">{eyebrow}</p>
        <h2 id={id} className="mt-3 font-display text-2xl font-extrabold tracking-[-0.03em] text-[#0C2A21] sm:text-3xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{text}</p>
      </div>
    </div>
  </section>
);

export default HolisticNote;
