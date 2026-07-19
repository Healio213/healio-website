import React from 'react';
import { useTranslation } from 'react-i18next';

const HonestAdvice = () => {
  const { t } = useTranslation('leistungen');
  const criteria = t('advice.criteria', { returnObjects: true });

  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="honest-advice-title">
      <div className="pointer-events-none absolute right-[-8rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[#25C990]/10 blur-[120px]" aria-hidden="true" />
      <div className="healio-container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div>
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#8EE7CA]">{t('advice.eyebrow')}</p>
            <h2 id="honest-advice-title" className="mt-4 max-w-[13ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl">
              {t('advice.title')}
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">{t('advice.description')}</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 sm:p-9">
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{t('advice.wrongLabel')}</p>
            <p className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-slate-400 line-through decoration-slate-500 sm:text-3xl">
              {t('advice.wrongQuestion')}
            </p>
            <div className="my-7 h-px bg-white/10" />
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[#8EE7CA]">{t('advice.rightLabel')}</p>
            <p className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl">
              {t('advice.rightQuestion')}
            </p>
          </div>
        </div>

        <div className="mt-14 grid border-y border-white/10 sm:grid-cols-3">
          {criteria.map((item, index) => (
            <article key={item.title} className={`py-7 sm:px-7 sm:py-9 ${index > 0 ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''}`}>
              <span className="font-display text-[0.68rem] font-extrabold tracking-[0.18em] text-[#8EE7CA]">0{index + 1}</span>
              <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.025em] text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HonestAdvice;
