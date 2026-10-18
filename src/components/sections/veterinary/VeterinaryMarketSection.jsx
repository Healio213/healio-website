import React from 'react';
import { useTranslation } from 'react-i18next';

const PET_INSURERS = ['uelzener', 'allianz', 'agila', 'helvetia'];
const PET_ROWS = ['refund', 'got', 'limit', 'age', 'waiting', 'senior'];
const HORSE_INSURERS = ['uelzener', 'allianz', 'barmenia', 'ruv', 'ghv'];
const HORSE_ROWS = ['age', 'oplimit', 'got', 'full'];
const REASONS = ['one', 'two', 'three', 'four'];
const ELSE_ITEMS = ['one', 'two', 'three'];

const InsurerCard = ({ t, group, insurer, rows, recommended }) => (
  <article
    className={`flex w-[82vw] shrink-0 snap-start flex-col rounded-[1.5rem] border-2 bg-[#fffdf8] p-5 sm:w-[60vw] md:w-auto md:shrink ${
      recommended ? 'border-[#25c990] shadow-[0_22px_50px_rgba(37,201,144,0.18)]' : 'border-[#173b36]/10 shadow-[0_18px_40px_rgba(16,39,45,0.08)]'
    }`}
  >
    <div className="flex items-start justify-between gap-3">
      <h4 className="font-friendly text-xl font-bold leading-tight text-[#10272d]">{t(`market.${group}.${insurer}.name`)}</h4>
      {recommended ? (
        <span className="shrink-0 rounded-full bg-[#25c990] px-3 py-1 font-display text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#062319]">
          {t('market.recommended')}
        </span>
      ) : null}
    </div>
    <dl className="mt-4 space-y-3 border-t border-[#173b36]/15 pt-4">
      {rows.map((row) => (
        <div key={row}>
          <dt className="font-display text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-[#087451]">{t(`market.labels.${row}`)}</dt>
          <dd className="mt-0.5 text-sm leading-snug text-[#30484c]">{t(`market.${group}.${insurer}.${row}`)}</dd>
        </div>
      ))}
    </dl>
  </article>
);

const VeterinaryMarketSection = () => {
  const { t } = useTranslation('veterinary');

  return (
    <section id="vet-market" className="relative overflow-hidden bg-[#fffdf8] py-20 sm:py-24 lg:py-28" aria-labelledby="vet-market-title">
      <div className="absolute -right-40 bottom-10 h-[30rem] w-[30rem] rounded-full bg-[#25c990]/[0.06] blur-3xl" aria-hidden="true" />
      <div className="healio-container relative px-4 sm:px-6 md:px-8">
        <div className="mb-10 max-w-5xl sm:mb-14">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-[#087451]">{t('market.eyebrow')}</p>
          <h2 id="vet-market-title" className="mt-4 max-w-[20ch] font-display text-[clamp(2.35rem,5vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#10272d] [text-wrap:balance]">
            {t('market.title')}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#5c6c6f] sm:text-lg">{t('market.subtitle')}</p>
        </div>

        <div className="mx-auto max-w-6xl">
          <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#10272d]">{t('market.groups.pets')}</h3>
          <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-4">
            {PET_INSURERS.map((insurer) => (
              <InsurerCard key={insurer} t={t} group="pets" insurer={insurer} rows={PET_ROWS} recommended={insurer === 'uelzener'} />
            ))}
          </div>

          <h3 className="mt-10 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-[#10272d]">{t('market.groups.horse')}</h3>
          <div className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
            {HORSE_INSURERS.map((insurer) => (
              <InsurerCard key={insurer} t={t} group="horse" insurer={insurer} rows={HORSE_ROWS} recommended={insurer === 'uelzener'} />
            ))}
          </div>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
          <div className="rounded-[1.5rem] border-l-4 border-[#25c990] bg-[#071827] px-6 py-6 text-slate-200 shadow-[0_18px_45px_rgba(7,24,39,0.17)] sm:px-7">
            <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#76e2bd]">{t('market.why.eyebrow')}</p>
            <strong className="mt-2 block font-friendly text-xl font-bold text-white sm:text-2xl">{t('market.why.title')}</strong>
            <ol className="mt-5 space-y-3">
              {REASONS.map((key, index) => (
                <li key={key} className="grid grid-cols-[34px_1fr] gap-2 text-sm leading-relaxed text-slate-300 sm:text-base">
                  <span className="font-display text-xs font-extrabold tracking-[0.16em] text-[#76e2bd]">{String(index + 1).padStart(2, '0')}</span>
                  <span>{t(`market.why.reasons.${key}`)}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[1.5rem] bg-[#f5f0e7] px-6 py-6 sm:px-7">
            <p className="font-display text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-[#087451]">{t('market.why.elseEyebrow')}</p>
            <strong className="mt-2 block font-friendly text-xl font-bold text-[#10272d] sm:text-2xl">{t('market.why.elseTitle')}</strong>
            <ul className="mt-5 space-y-3">
              {ELSE_ITEMS.map((key) => (
                <li key={key} className="grid grid-cols-[18px_1fr] gap-2 text-sm leading-relaxed text-[#30484c]">
                  <span className="mt-[0.45rem] h-2 w-2 rounded-full bg-[#25c990]" aria-hidden="true" />
                  <span>{t(`market.why.elseItems.${key}`)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-6xl text-sm leading-relaxed text-[#30484c]">{t('market.basis')}</p>
        <p className="mx-auto mt-2 max-w-6xl text-xs leading-relaxed text-[#6f7772]">{t('market.stand')}</p>
      </div>
    </section>
  );
};

export default VeterinaryMarketSection;
