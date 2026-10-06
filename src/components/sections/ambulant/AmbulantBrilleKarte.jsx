import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AMBULANT_FAQS } from '@/components/sections/ambulant/ambulantFaqs';
import { useLanguage } from '@/hooks/useLanguage';

// Experiment 06.10.2026 (Franks Wunsch zur Brillen-Kampagne, die ohne Anker auf
// /ambulant führt): mobil eine eigene Karte für Brille und Kontaktlinsen direkt
// unter „Auf einen Blick“. Frage und Antwort kommen wortgleich aus der
// geprüften FAQ (ambulantFaqs.js), damit es keine zweite Fassung gibt. Ab md
// ausgeblendet; dort steht dieselbe Antwort in der FAQ.
const QUESTION = { de: 'Was gilt für Brille und Kontaktlinsen?', en: 'What applies to glasses and contact lenses?' };
const CTA = { de: 'Tarif wählen', en: 'Choose your plan' };

const AmbulantBrilleKarte = () => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const faq = AMBULANT_FAQS[language].find((item) => item.q === QUESTION[language]);
  if (!faq) return null;

  const goToTariffs = (event) => {
    const target = document.getElementById('tarifwahl');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="bg-white px-4 pb-8 pt-2 md:hidden" aria-labelledby="ambulant-brille-titel">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-emerald-900/10 bg-home-ice p-5">
        <div className="flex items-center gap-4">
          <img
            src="/images/friendly-icons/vision-glasses.webp"
            alt=""
            width="320"
            height="320"
            loading="lazy"
            decoding="async"
            className="h-16 w-16 shrink-0 object-contain drop-shadow-[0_10px_12px_rgba(7,17,31,0.14)]"
          />
          <h2 id="ambulant-brille-titel" className="font-display text-xl font-extrabold leading-snug text-home-midnight [text-wrap:balance]">
            {faq.q}
          </h2>
        </div>
        <p className="mt-4 text-base leading-7 text-home-slate">{faq.a}</p>
        <a
          href="#tarifwahl"
          onClick={goToTariffs}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-home-mint px-6 font-display text-base font-extrabold text-home-midnight transition hover:bg-home-mint-active focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4"
        >
          {CTA[language]}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default AmbulantBrilleKarte;
