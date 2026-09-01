import React from 'react';
import { useTranslation } from 'react-i18next';

const COST_ROWS = ['diagnostics', 'surgery', 'anaesthesia', 'aftercare'];
const CHECK_ROWS = ['reimbursement', 'limits', 'deductible', 'waiting', 'animalData', 'horseData'];

const CostAnalysisSection = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section id="vet-analysis" className="relative overflow-hidden bg-[#fffdf8] py-20 sm:py-24 lg:py-28" aria-labelledby="vet-cost-title">
      <div className="absolute -right-44 top-10 h-[34rem] w-[34rem] rounded-full bg-[#25c990]/[0.06] blur-3xl" aria-hidden="true" />
      <div className="healio-container relative px-4 sm:px-6 md:px-8">
        <div className="mb-12 max-w-5xl sm:mb-16">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087451]">{t('costs.eyebrow')}</p>
          <h2 id="vet-cost-title" className="mt-4 max-w-[20ch] font-display text-[clamp(2.35rem,5vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#10272d] [text-wrap:balance]">
            {t('costs.title')}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c6c6f] sm:text-lg">{t('costs.subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-20">
          <div className="relative px-1 pb-5 pt-2 sm:px-5">
            <div className="absolute inset-x-7 bottom-0 top-10 rotate-2 rounded-[2rem] bg-[#12362f]/10 blur-[1px]" aria-hidden="true" />
            <article className="relative rotate-[-1deg] overflow-hidden rounded-[1.75rem] bg-[#f8efdc] shadow-[0_28px_60px_rgba(64,46,17,0.17)]">
              <div className="border-b border-dashed border-[#9d7c42]/35 px-6 py-6 sm:px-8">
                <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#8d6118]">{t('costs.example.eyebrow')}</p>
                <h3 className="mt-2 max-w-[24ch] font-friendly text-2xl font-bold leading-tight text-[#31291b] sm:text-3xl">{t('costs.example.title')}</h3>
              </div>

              <div className="px-6 py-3 sm:px-8">
                {COST_ROWS.map((key, index) => (
                  <div key={key} className={`flex items-baseline justify-between gap-4 py-3.5 text-sm ${index !== COST_ROWS.length - 1 ? 'border-b border-[#9d7c42]/15' : ''}`}>
                    <span className="text-[#685d49]">{t(`costs.example.rows.${key}.label`)}</span>
                    <span className="shrink-0 font-display font-extrabold text-[#31291b]">{t(`costs.example.rows.${key}.value`)}</span>
                  </div>
                ))}
              </div>

              <div className="mx-6 mb-6 mt-1 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6 border-t-2 border-[#8f6b2f] pt-5 sm:mx-8">
                <span className="max-w-[12ch] pr-1 font-display text-sm font-extrabold uppercase tracking-[0.08em] text-[#4b3d25]">{t('costs.example.totalLabel')}</span>
                <span className="text-right font-friendly text-3xl font-bold leading-none text-[#76500c] sm:text-4xl">{t('costs.example.totalValue')}</span>
              </div>

              <div className="bg-[#eadbbd] px-6 py-4 text-[0.68rem] leading-relaxed text-[#6c5c40] sm:px-8">
                <p>{t('costs.example.disclaimer')}</p>
                <a
                  href="https://bundestieraerztekammer.de/tierhalter/got/index.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex font-extrabold text-[#5f430f] underline decoration-[#8d6118]/45 underline-offset-2 hover:text-[#2f281b]"
                >
                  {t('costs.example.sourceLabel')}
                </a>
              </div>
            </article>
          </div>

          <div className="lg:pt-5">
            <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#087451]">{t('costs.check.eyebrow')}</p>
            <h3 className="mt-3 max-w-[18ch] font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.045em] text-[#10272d] sm:text-4xl">{t('costs.check.title')}</h3>

            <ol className="mt-8 border-t border-[#173b36]/20">
              {CHECK_ROWS.map((key, index) => (
                <li key={key} className="grid grid-cols-[42px_1fr] items-start gap-2 border-b border-[#173b36]/15 py-4 sm:grid-cols-[54px_1fr] sm:py-[1.15rem]">
                  <span className="font-display text-xs font-extrabold tracking-[0.16em] text-[#25a77d]">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-semibold leading-snug text-[#30484c] sm:text-base">{t(`costs.check.items.${key}`)}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 border-l-4 border-[#25c990] bg-[#071827] px-6 py-6 text-slate-200 shadow-[0_18px_45px_rgba(7,24,39,0.17)] sm:px-7">
              <strong className="block font-friendly text-xl font-bold text-white sm:text-2xl">{t('costs.check.noteTitle')}</strong>
              <span className="mt-2 block text-sm leading-relaxed text-slate-300 sm:text-base">{t('costs.check.note')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostAnalysisSection;
