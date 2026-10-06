import React from 'react';
import { useTranslation } from 'react-i18next';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

const COST_ROWS = ['diagnostics', 'surgery', 'anaesthesia', 'aftercare'];
const CHECK_ROWS = ['reimbursement', 'limits', 'deductible', 'waiting', 'animalData', 'horseData'];

const CostAnalysisSection = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section id="vet-analysis" className="relative overflow-hidden bg-[#fffdf8] py-12 sm:py-24 lg:py-28" aria-labelledby="vet-cost-title">
      <div className="absolute -right-44 top-10 h-[34rem] w-[34rem] rounded-full bg-[#25c990]/[0.06] blur-3xl" aria-hidden="true" />
      <div className="healio-container relative px-4 sm:px-6 md:px-8">
        <div className="mb-8 max-w-5xl sm:mb-16">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.22em] text-[#087451] md:text-xs">{t('costs.eyebrow')}</p>
          <h2 id="vet-cost-title" className="mt-3 max-w-[20ch] sm:mt-4 font-display text-[clamp(2.35rem,5vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#10272d] [text-wrap:balance]">
            {t('costs.title')}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#5c6c6f] sm:mt-5 sm:text-lg">{t('costs.subtitle')}</p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-20">
          <div className="relative px-1 pb-5 pt-2 sm:px-5">
            <div className="absolute inset-x-7 bottom-0 top-10 rotate-2 rounded-[2rem] bg-[#12362f]/10 blur-[1px]" aria-hidden="true" />
            <article className="relative rotate-[-1deg] overflow-hidden rounded-[1.75rem] bg-[#f8efdc] shadow-[0_28px_60px_rgba(64,46,17,0.17)]">
              <div className="border-b border-dashed border-[#9d7c42]/35 px-5 py-4 sm:px-8 sm:py-6">
                <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#8d6118] md:text-xs">{t('costs.example.eyebrow')}</p>
                <h3 className="mt-2 max-w-[24ch] font-friendly text-2xl font-bold leading-tight text-[#31291b] sm:text-3xl">{t('costs.example.title')}</h3>
              </div>

              <div className="px-5 py-2 sm:px-8 sm:py-3">
                {COST_ROWS.map((key, index) => (
                  <div key={key} className={`flex items-baseline justify-between gap-4 py-2.5 text-base sm:py-3.5 ${index !== COST_ROWS.length - 1 ? 'border-b border-[#9d7c42]/15' : ''}`}>
                    <span className="text-[#685d49]">{t(`costs.example.rows.${key}.label`)}</span>
                    <span className="shrink-0 font-display font-extrabold text-[#31291b]">{t(`costs.example.rows.${key}.value`)}</span>
                  </div>
                ))}
              </div>

              <div className="mx-5 mb-4 mt-1 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-t-2 border-[#8f6b2f] pt-4 sm:mx-8 sm:mb-6 sm:pt-5">
                <span className="w-min font-display text-sm font-extrabold uppercase tracking-[0.08em] text-[#4b3d25]">{t('costs.example.totalLabel')}</span>
                <span className="ml-auto text-right font-friendly text-3xl font-bold leading-none text-[#76500c] sm:text-4xl">{t('costs.example.totalValue')}</span>
              </div>

              <div className="bg-[#eadbbd] px-5 py-3 text-base leading-relaxed text-[#6c5c40] sm:px-8 sm:py-4">
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
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-[#087451] md:text-xs">{t('costs.check.eyebrow')}</p>
            <h3 className="mt-3 max-w-[18ch] font-display text-3xl font-extrabold leading-[1.02] tracking-[-0.045em] text-[#10272d] sm:text-4xl">{t('costs.check.title')}</h3>

            {/* Experiment 06.10.2026: die sechs Prüfpunkte wischen mobil als Karten
                nebeneinander, ab md bleibt die nummerierte Liste mit Trennlinien. */}
            <MobileSwipeRow
              as="ol"
              label={t('costs.check.title')}
              className="mt-6 md:mt-8"
              desktopClassName="md:block md:border-t md:border-[#173b36]/20"
              mobileItemWidth="w-[68vw] max-w-[17rem]"
            >
              {CHECK_ROWS.map((key, index) => (
                <div key={key} className="grid h-full grid-cols-[42px_1fr] items-start gap-2 rounded-2xl border border-[#173b36]/15 bg-white/70 p-4 sm:grid-cols-[54px_1fr] md:h-auto md:rounded-none md:border-0 md:border-b md:bg-transparent md:px-0 md:py-[1.15rem]">
                  <span className="font-display text-sm font-extrabold tracking-[0.16em] text-[#25a77d] md:text-xs">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-base font-semibold leading-snug text-[#30484c]">{t(`costs.check.items.${key}`)}</span>
                </div>
              ))}
            </MobileSwipeRow>

            <div className="mt-4 border-l-4 border-[#25c990] bg-[#071827] px-5 py-5 text-slate-200 shadow-[0_18px_45px_rgba(7,24,39,0.17)] sm:mt-8 sm:px-7 sm:py-6">
              <strong className="block font-friendly text-xl font-bold text-white sm:text-2xl">{t('costs.check.noteTitle')}</strong>
              <span className="mt-2 block text-base leading-relaxed text-slate-300">{t('costs.check.note')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostAnalysisSection;
