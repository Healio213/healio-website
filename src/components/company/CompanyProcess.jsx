import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

const processVisuals = [
  { kind: 'comparison', tone: 'sky' },
  { kind: 'calculator', tone: 'butter' },
  { kind: 'switch', tone: 'mint' },
  { kind: 'support', tone: 'lavender' },
];

const CompanyProcess = () => {
  const { t } = useTranslation('unternehmen');
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section className="bg-[#f5f8f7] py-10 md:py-14 lg:py-20" aria-labelledby="company-process-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700 md:text-xs">{t('process.eyebrow')}</p>
          <h2 id="company-process-title" className="mt-4 max-w-[15ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#10202a] sm:text-5xl">
            {t('process.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">{t('process.description')}</p>
        </div>

        {/* Mobil Wischreihe (vier Schritte), ab md die bisherige verbundene Tafel. */}
        <MobileSwipeRow
          as="ol"
          label={t('process.title')}
          className="mt-6 md:mt-10"
          desktopClassName="md:grid md:grid-cols-2 md:gap-px md:!overflow-hidden md:rounded-[1.5rem] md:border md:border-slate-300 md:bg-slate-300 lg:grid-cols-4"
          itemClassName="flex"
        >
          {steps.map((step, index) => {
            const visual = processVisuals[index];
            return (
              <div key={step.title} className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 md:rounded-none md:border-0">
                <div className="flex items-center justify-between gap-5">
                  <FriendlyIcon kind={visual.kind} tone={visual.tone} size="sm" />
                  <span className="font-display text-sm font-extrabold tracking-[0.18em] text-emerald-700 md:text-xs">0{index + 1}</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-extrabold tracking-[-0.025em] text-[#10202a] md:mt-5">{step.title}</h3>
                <p className="mt-2 text-base leading-6 text-slate-600 md:text-sm md:leading-6">{step.description}</p>
              </div>
            );
          })}
        </MobileSwipeRow>
      </div>
    </section>
  );
};

export default CompanyProcess;
