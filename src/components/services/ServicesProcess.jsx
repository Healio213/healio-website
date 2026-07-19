import React from 'react';
import { useTranslation } from 'react-i18next';

const ServicesProcess = () => {
  const { t } = useTranslation('leistungen');
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="services-process-title">
      <div className="healio-container">
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-700">{t('process.eyebrow')}</p>
            <h2 id="services-process-title" className="mt-4 max-w-[14ch] break-words [hyphens:auto] [overflow-wrap:anywhere] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[#10202A] sm:text-5xl">
              {t('process.title')}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">{t('process.description')}</p>
        </div>

        <div className="mt-14 grid border-y border-slate-200 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.number} className={`py-8 lg:px-8 lg:py-10 ${index > 0 ? 'border-t border-slate-200 lg:border-l lg:border-t-0' : ''}`}>
              <span className="font-display text-xs font-extrabold tracking-[0.18em] text-emerald-700">{step.number}</span>
              <h3 className="mt-7 font-display text-2xl font-extrabold tracking-[-0.03em] text-[#10202A]">{step.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesProcess;
