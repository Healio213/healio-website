import React from 'react';
import { useTranslation } from 'react-i18next';

const ANIMALS = ['dog', 'cat', 'horse'];
const FACT_ROWS = ['one', 'two', 'three'];
const PATH_STEPS = ['request', 'reply', 'apply'];

const VeterinaryProvidersSection = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section id="vet-providers" className="relative overflow-hidden bg-[#f5f0e7] py-20 sm:py-24 lg:py-28" aria-labelledby="vet-providers-title">
      <div className="absolute -left-40 top-16 h-[30rem] w-[30rem] rounded-full bg-[#25c990]/[0.07] blur-3xl" aria-hidden="true" />
      <div className="healio-container relative px-4 sm:px-6 md:px-8">
        <div className="mb-12 max-w-5xl sm:mb-16">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087451]">{t('providers.eyebrow')}</p>
          <h2 id="vet-providers-title" className="mt-4 max-w-[20ch] font-display text-[clamp(2.35rem,5vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#10272d] [text-wrap:balance]">
            {t('providers.title')}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c6c6f] sm:text-lg">{t('providers.subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {ANIMALS.map((animal) => (
            <article key={animal} className="flex flex-col rounded-[1.5rem] border border-[#173b36]/10 bg-[#fffdf8] p-6 shadow-[0_18px_40px_rgba(16,39,45,0.08)] sm:p-7">
              <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#087451]">{t(`providers.animals.${animal}.label`)}</p>
              <h3 className="mt-2 font-friendly text-2xl font-bold leading-tight text-[#10272d]">{t(`providers.animals.${animal}.insurers`)}</h3>
              <ul className="mt-5 flex-1 space-y-3 border-t border-[#173b36]/15 pt-5">
                {FACT_ROWS.map((row) => (
                  <li key={row} className="grid grid-cols-[18px_1fr] gap-2 text-sm leading-relaxed text-[#30484c]">
                    <span className="mt-[0.45rem] h-2 w-2 rounded-full bg-[#25c990]" aria-hidden="true" />
                    <span>{t(`providers.animals.${animal}.facts.${row}`)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="rounded-[1.5rem] border-l-4 border-[#25c990] bg-[#071827] px-6 py-6 text-slate-200 shadow-[0_18px_45px_rgba(7,24,39,0.17)] sm:px-7">
            <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#76e2bd]">{t('providers.tracker.eyebrow')}</p>
            <strong className="mt-2 block font-friendly text-xl font-bold text-white sm:text-2xl">{t('providers.tracker.title')}</strong>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{t('providers.tracker.text')}</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">{t('providers.tracker.note')}</p>
          </div>

          <div className="rounded-[1.5rem] bg-[#fffdf8] px-6 py-6 shadow-[0_18px_40px_rgba(16,39,45,0.08)] sm:px-7">
            <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#087451]">{t('providers.path.eyebrow')}</p>
            <strong className="mt-2 block font-friendly text-xl font-bold text-[#10272d] sm:text-2xl">{t('providers.path.title')}</strong>
            <ol className="mt-5 border-t border-[#173b36]/15">
              {PATH_STEPS.map((step, index) => (
                <li key={step} className="grid grid-cols-[42px_1fr] items-start gap-2 border-b border-[#173b36]/10 py-3.5">
                  <span className="font-display text-xs font-extrabold tracking-[0.16em] text-[#25a77d]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm leading-relaxed text-[#30484c]">{t(`providers.path.steps.${step}`)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-6xl text-xs leading-relaxed text-[#6f7772]">{t('providers.stand')}</p>
      </div>
    </section>
  );
};

export default VeterinaryProvidersSection;
