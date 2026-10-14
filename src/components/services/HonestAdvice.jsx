import React from 'react';
import { useTranslation } from 'react-i18next';

const HonestAdvice = () => {
  const { t } = useTranslation('leistungen');
  const criteria = t('advice.criteria', { returnObjects: true });

  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-12 text-white sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="honest-advice-title">
      <div className="pointer-events-none absolute right-[-8rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[#25C990]/10 blur-[120px]" aria-hidden="true" />
      <div className="healio-container relative z-10 max-md:px-0">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div>
            <p className="hidden font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[#8EE7CA] md:block md:text-xs">{t('advice.eyebrow')}</p>
            <h2 id="honest-advice-title" className="max-w-[20ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] md:mt-4 md:max-w-[13ch] md:text-5xl md:tracking-[-0.045em]">
              <span className="md:hidden">{t('mobile.adviceTitle')}</span>
              <span className="hidden md:inline">{t('advice.title')}</span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">{t('advice.description')}</p>
          </div>

          <div className="hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 sm:p-9 md:block">
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{t('advice.wrongLabel')}</p>
            <p className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-slate-400 line-through decoration-slate-500 sm:text-3xl">
              {t('advice.wrongQuestion')}
            </p>
            <div className="my-5 h-px bg-white/10 sm:my-7" />
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[#8EE7CA]">{t('advice.rightLabel')}</p>
            <p className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              {t('advice.rightQuestion')}
            </p>
          </div>
        </div>

        <div className="mt-6 grid border-y border-white/10 md:mt-14 md:grid-cols-3">
          {criteria.map((item, index) => (
            <article key={item.title} className={`py-5 md:px-7 md:py-8 ${index > 0 ? 'border-t border-white/10 md:border-l md:border-t-0' : ''}`}>
              <h3 className="font-display text-base font-extrabold leading-snug tracking-[-0.025em] text-white [text-wrap:balance] md:text-2xl">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HonestAdvice;
