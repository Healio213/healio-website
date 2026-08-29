import React from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { requestNitaConsent } from '@/components/NitaConsentWidget';
import { useLanguage } from '@/hooks/useLanguage';

const COPY = {
  de: {
    eyebrow: 'Direkte KI-Hilfe von Healio',
    title: 'Soll ich dir das kurz erklären?',
    text: 'Nita beantwortet deine Frage genau an der Stelle, an der du gerade bist – verständlich, ohne Fachsprache und in wenigen Augenblicken.',
    prompts: ['Konzept kurz erklären', 'Tariffrage klären', 'Nächsten Schritt finden'],
    cta: 'Jetzt Nita fragen',
    privacy: 'Startet erst nach deiner Datenschutz-Freigabe.',
  },
  en: {
    eyebrow: 'Direct AI help from Healio',
    title: 'Want a quick explanation?',
    text: 'Nita answers the question you have right now — clearly, without jargon and in just a few moments.',
    prompts: ['Explain the concept', 'Clarify a tariff question', 'Find my next step'],
    cta: 'Ask Nita now',
    privacy: 'Starts only after your privacy approval.',
  },
};

const PET_COPY = {
  de: {
    eyebrow: 'Direkte Hilfe zu deinem Tier-Schutz',
    title: 'Soll ich dir den Schutz kurz erklären?',
    text: 'Nita erklärt dir den Unterschied zwischen OP- und Vollschutz und worauf es bei Alter, Rasse, Haltung und Vorerkrankungen ankommt – ohne Versicherungsdeutsch.',
    prompts: ['OP- oder Vollschutz?', 'Hund, Katze oder Pferd', 'Nächsten Schritt klären'],
    cta: 'Tier-Schutz erklären lassen',
    privacy: 'Startet erst nach deiner Datenschutz-Freigabe.',
  },
  en: {
    eyebrow: 'Direct help with your pet cover',
    title: 'Want a quick explanation of the cover?',
    text: 'Nita explains the difference between surgery-only and full cover, plus how age, breed, keeping and medical history matter — without insurance jargon.',
    prompts: ['Surgery or full cover?', 'Dog, cat or horse', 'Clarify my next step'],
    cta: 'Explain pet cover',
    privacy: 'Starts only after your privacy approval.',
  },
};

const SalesAiAssist = ({ className = '', variant = 'default' }) => {
  const { lang } = useLanguage();
  const language = lang === 'en' ? 'en' : 'de';
  const isPet = variant === 'pet';
  const copy = (isPet ? PET_COPY : COPY)[language];

  return (
    <section className={`px-4 py-8 sm:px-6 md:py-12 lg:px-8 ${className}`} aria-labelledby="healio-ai-assist-title">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-home-midnight text-white shadow-[0_24px_70px_rgba(7,17,31,0.18)]">
        <div className="pointer-events-none absolute -left-16 -top-20 h-72 w-72 rounded-full bg-home-mint/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 right-10 h-64 w-64 rounded-full border border-home-mint/10" aria-hidden="true" />

        <div className="relative grid items-center gap-6 px-6 py-8 sm:px-9 md:grid-cols-[170px_minmax(0,1fr)_auto] md:gap-8 md:py-9 lg:px-12">
          <div className={`relative mx-auto ${isPet ? 'h-48 w-48 sm:h-52 sm:w-52 md:h-44 md:w-44' : 'hidden h-36 w-36 md:block'}`} aria-hidden="true">
            <div className="absolute inset-4 rounded-full bg-home-mint/20 blur-2xl" />
            <img
              src={isPet ? '/images/veterinary/nita-pet-support.webp' : '/images/friendly-icons/personal-support.webp'}
              alt=""
              width={isPet ? 900 : 320}
              height={isPet ? 900 : 320}
              loading="lazy"
              decoding="async"
              className={`relative h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.28)] ${isPet ? 'rounded-[1.5rem]' : ''}`}
            />
          </div>

          <div>
            <p className="flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-[0.2em] text-home-mint-active">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h2 id="healio-ai-assist-title" className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">{copy.text}</p>
            <div className="mt-5 flex flex-wrap gap-2" aria-label={lang === 'en' ? 'Nita can help with' : 'Dabei kann Nita helfen'}>
              {copy.prompts.map((prompt) => (
                <span key={prompt} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-200 sm:text-sm">
                  {prompt}
                </span>
              ))}
            </div>
          </div>

          <div className="md:min-w-[205px] md:text-right">
            <button
              type="button"
              onClick={() => requestNitaConsent('global_launcher')}
              className="home-focus inline-flex min-h-14 w-full items-center justify-center rounded-full bg-home-mint px-6 font-display text-sm font-extrabold text-home-midnight shadow-[0_14px_34px_rgba(37,201,144,0.24)] transition hover:-translate-y-0.5 hover:bg-home-mint-active motion-reduce:transform-none sm:text-base md:w-auto"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              {copy.cta}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
            <p className="mt-3 text-center text-[11px] leading-4 text-slate-500 md:text-right">{copy.privacy}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesAiAssist;
