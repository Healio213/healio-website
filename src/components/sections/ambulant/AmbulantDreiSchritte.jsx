import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

// Frank 02.11.2026: „Drei einfache Schritte“ muss hoch stehen, damit Besucher
// sofort wissen, was passiert. Mobil direkt unter dem Einstieg, kompakt als
// nummerierte Liste ohne Bilder. Die Schritte folgen dem echten Weg auf der
// Seite: Stufe und Geburtsjahr in der Tarifwahl, Onlineabschluss im
// SDK-Rechner, danach der Kassenbonus. Ab md unverändert ohne diesen Block.
const COPY = {
  de: {
    title: 'Drei einfache Schritte.',
    steps: [
      { title: 'Stufe wählen', text: 'Geburtsjahr eingeben und deinen Beitrag sofort sehen.' },
      { title: 'Online abschließen', text: 'Direkt beim Versicherer beantragen. Bei Fragen helfen wir dir.' },
      { title: 'Kassenbonus holen', text: 'Dein Kassenbonus kann den Beitrag ganz oder teilweise zurückholen.' },
    ],
  },
  en: {
    title: 'Three simple steps.',
    steps: [
      { title: 'Choose your tier', text: 'Enter your year of birth and see your premium straight away.' },
      { title: 'Apply online', text: 'Apply directly with the insurer. We help if you have questions.' },
      { title: 'Claim your fund bonus', text: 'Your health fund bonus can win back all or part of the premium.' },
    ],
  },
};

const AmbulantDreiSchritte = () => {
  const { lang } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];

  return (
    <section className="bg-white px-4 pb-2 pt-7 sm:px-6" aria-labelledby="ambulant-drei-schritte" data-healio-ambulant="drei-schritte">
      <h2 id="ambulant-drei-schritte" className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-home-midnight">{copy.title}</h2>
      <ol className="mt-4 space-y-4">
        {copy.steps.map((step, index) => (
          <li key={step.title} className="relative flex gap-4">
            {index < copy.steps.length - 1 && <span className="absolute bottom-[-1rem] left-[1.1875rem] top-10 w-0.5 bg-home-mint/30" aria-hidden="true" />}
            <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-home-midnight font-display text-base font-extrabold text-home-mint" aria-hidden="true">{index + 1}</span>
            <div className="min-w-0 pt-1.5">
              <h3 className="font-display text-lg font-extrabold leading-snug text-home-midnight">{step.title}</h3>
              <p className="mt-0.5 text-base leading-6 text-home-slate">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default AmbulantDreiSchritte;
