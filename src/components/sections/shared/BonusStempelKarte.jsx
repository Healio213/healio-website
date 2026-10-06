import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { getDentalContent } from '@/components/sections/dental/dentalContent';

/**
 * Bonus-Stempel: die Karte mit der Figur, "Laut Satzung bis zu 810 EUR" und
 * "Wie viel davon holst du raus?" (Vorgabe 06.10.2026: auch auf /ambulant
 * und /stationaer, nicht nur auf /zahn).
 *
 * Optik und Wortlaut stammen unverändert aus dem Abschnitt id="kassenbonus" auf
 * /zahn. Die Texte kommen aus EINER gemeinsamen Quelle (dentalContent.js,
 * bonus.stamp, bonus.question, bonus.amount, bonus.stampLabel, bonus.condition),
 * deutsch und englisch je nach Sprache der Seite. Es gibt bewusst keinen neuen
 * Wortlaut. Wer eigene Zeilen braucht, übergibt sie über content (die Felder
 * heißen wie in dentalContent.bonus).
 *
 * Verwendung (die Karte steht dort auf dunklem Grund, wie auf /zahn):
 *   <BonusStempelKarte />                       // Texte aus der gemeinsamen Quelle
 *   <BonusStempelKarte content={content.bonus} />   // wie auf /zahn
 * Auf /zahn sitzt sie rechts neben dem Text in einem dunklen Kasten
 * (bg-[#07111f]); auf den anderen Seiten bitte ebenfalls auf dunklem oder
 * zumindest klar abgesetztem Grund einsetzen, mit max. 26 rem Breite.
 */
const BonusStempelKarte = ({ content, headingLevel: Heading = 'h3', className = '' }) => {
  const { lang } = useLanguage();
  const bonus = content || getDentalContent(lang).bonus;

  return (
    <div className={`relative mx-auto w-full max-w-[26rem] overflow-hidden rounded-[1.75rem] border border-[#efda9b] bg-gradient-to-br from-[#fffaf0] to-[#ffe9b7] p-5 text-[#07111f] shadow-2xl sm:p-7 md:min-h-[25rem] md:rounded-[2.25rem] ${className}`}>
      <span className="absolute left-1/2 top-0 h-4 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e7d4a0] bg-white/80" aria-hidden="true" />
      <p className="relative z-10 max-w-[14rem] font-display text-sm font-extrabold uppercase tracking-[0.13em] text-[#77570c] md:text-xs">
        {bonus.stamp}
      </p>
      <Heading className="relative z-10 mt-4 max-w-[10ch] font-friendly text-3xl font-bold leading-[0.98] tracking-[-0.035em] text-[#103c30] sm:text-4xl">
        {bonus.question}
      </Heading>
      <img
        src="/images/friendly-icons/bonus-you-mascot.webp"
        alt=""
        loading="lazy"
        decoding="async"
        aria-hidden="true"
        width="512"
        height="512"
        className="absolute -right-6 top-3 w-[42%] max-w-[15.5rem] object-contain drop-shadow-[0_18px_22px_rgba(66,48,15,0.18)] sm:-right-8 sm:top-4 sm:w-[58%]"
      />

      <strong className="relative z-10 mt-8 block font-display text-[3.35rem] font-extrabold leading-none tracking-[-0.065em] text-[#087654] sm:mt-20 sm:text-[4.1rem]">
        {bonus.amount}
      </strong>
      <span className="relative z-10 mt-3 block max-w-[19rem] font-display text-base font-extrabold leading-6 text-[#5c4510]">
        {bonus.stampLabel}
      </span>
      <p className="relative z-10 mt-4 border-t border-[#d9c07f] pt-3 text-sm font-semibold leading-6 text-[#5f543f] hyphens-auto [hyphenate-limit-chars:10_4_4] md:mt-5 md:pt-4">
        {bonus.condition}
      </p>
    </div>
  );
};

export default BonusStempelKarte;
