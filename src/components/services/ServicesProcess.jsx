import React from 'react';
import { useTranslation } from 'react-i18next';

const ServicesProcess = () => {
  const { t } = useTranslation('leistungen');
  const steps = t('process.steps', { returnObjects: true });

  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="services-process-title">
      <div className="healio-container">
        <div className="min-w-0">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-700">{t('process.eyebrow')}</p>
          <h2 id="services-process-title" className="mt-4 max-w-[20ch] break-words font-display text-[clamp(1.375rem,calc((100vw_-_4rem)/11.5),2.25rem)] font-extrabold leading-tight tracking-[-0.045em] text-[#10202A] max-[319px]:[hyphens:auto] sm:text-5xl lg:text-[clamp(2.5rem,3.9vw,3rem)]">
            {t('process.title')}
          </h2>
        </div>

        <div className="mt-14 grid border-y border-slate-200 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.number} className={`py-7 lg:px-8 lg:py-9 ${index > 0 ? 'border-t border-slate-200 lg:border-l lg:border-t-0' : ''}`}>
              <span className="font-display text-xs font-extrabold tracking-[0.18em] text-emerald-700">{step.number}</span>
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-[-0.03em] text-[#10202A]">{step.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesProcess;
