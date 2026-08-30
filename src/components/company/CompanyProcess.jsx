import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const processVisuals = [
  { kind: 'document', tone: 'sky' },
  { kind: 'calculator', tone: 'butter' },
  { kind: 'advisor', tone: 'mint' },
  { kind: 'support', tone: 'lavender' },
];

const CompanyProcess = () => {
  const { t } = useTranslation('unternehmen');
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section className="bg-[#f5f8f7] py-14 lg:py-20" aria-labelledby="company-process-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{t('process.eyebrow')}</p>
          <h2 id="company-process-title" className="mt-4 max-w-[15ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-[#10202a] sm:text-5xl">
            {t('process.title')}
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">{t('process.description')}</p>
        </div>

        <ol className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-slate-300 bg-slate-300 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const visual = processVisuals[index];
            return (
            <li key={step.title} className="bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-5">
                <FriendlyIcon kind={visual.kind} tone={visual.tone} size="sm" />
                <span className="font-display text-xs font-extrabold tracking-[0.18em] text-emerald-700">0{index + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.025em] text-[#10202a]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default CompanyProcess;
