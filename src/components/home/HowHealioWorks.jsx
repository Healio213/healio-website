import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const stepVisuals = [
  { kind: 'thinking', tone: 'mint', surface: 'bg-[#E7F7EF]', border: 'border-[#CCE8DA]' },
  { kind: 'weighing', tone: 'butter', surface: 'bg-[#FFF1D6]', border: 'border-[#EBDCBF]' },
  { kind: 'choice', tone: 'sky', surface: 'bg-[#EAF2FF]', border: 'border-[#D6E1F1]' },
];

const HowHealioWorks = () => {
  const { t } = useTranslation('home');
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section id="so-funktioniert" className="home-section relative scroll-mt-20 overflow-hidden bg-[#FDFAF6]" aria-labelledby="how-healio-title">
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-home-mint/10 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#FFF1D6]/70 blur-3xl" aria-hidden="true" />
      <div className="healio-container">
        <div className="relative grid gap-7 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <span className="inline-flex rounded-full border border-emerald-900/10 bg-white px-3 py-1.5 font-display text-xs font-extrabold uppercase tracking-[0.12em] text-emerald-800 shadow-[0_8px_22px_rgba(12,42,33,0.06)]">
              KassenBoost × Healio
            </span>
            <h2 id="how-healio-title" className="mt-5 max-w-[17ch] font-friendly text-4xl font-bold leading-[1.02] tracking-[-0.025em] text-[#0C2A21] sm:text-5xl">
              {t('process.title')}
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:justify-self-end">{t('process.description')}</p>
        </div>

        <ol className="relative mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step, index) => {
            const visual = stepVisuals[index];
            return (
              <li
                key={step.number}
                className={`group relative min-h-[315px] overflow-hidden rounded-3xl border p-7 shadow-[0_18px_44px_rgba(7,17,31,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_52px_rgba(7,17,31,0.11)] motion-reduce:transform-none ${visual.surface} ${visual.border}`}
              >
                <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full border border-current opacity-[0.06]" aria-hidden="true" />
                <div className="relative flex items-start justify-between gap-4">
                  <FriendlyIcon kind={visual.kind} label={step.title} tone={visual.tone} size="xl" className="transition-transform duration-200 group-hover:rotate-2 group-hover:scale-[1.03] motion-reduce:transform-none" />
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-emerald-900/10 bg-white/70 font-display text-xs font-extrabold tracking-[0.12em] text-emerald-800">
                    {step.number}
                  </span>
                </div>
                <h3 className="relative mt-7 font-friendly text-2xl font-bold leading-tight text-[#0C2A21]">{step.title}</h3>
                <p className="relative mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HowHealioWorks;
