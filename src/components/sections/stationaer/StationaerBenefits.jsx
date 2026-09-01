import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const benefitCards = [
  { key: 'doctor', kind: 'ambulant', tone: 'mint' },
  { key: 'room', kind: 'hospital', tone: 'lavender' },
  { key: 'choice', kind: 'comparison', tone: 'sky' },
  { key: 'start', kind: 'calendar', tone: 'butter' },
];

const StationaerBenefits = () => {
  const { t } = useTranslation('stationaer');

  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="stationaer-benefits-heading">
      <div className="healio-container">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#087454]">
              {t('refresh.benefits.eyebrow')}
            </p>
            <h2 id="stationaer-benefits-heading" className="mt-4 max-w-[12ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#071726] sm:text-4xl lg:text-5xl">
              {t('refresh.benefits.title')}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {t('refresh.benefits.subtitle')}
            </p>
            <div className="mt-7 rounded-2xl border border-[#cde9df] bg-[#eefaf5] p-5">
              <p className="text-sm font-extrabold text-[#075f46]">{t('refresh.benefits.contextTitle')}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{t('refresh.benefits.contextBody')}</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefitCards.map((card) => (
              <article
                key={card.key}
                className="rounded-[1.65rem] border border-slate-100 bg-[#fbfdfc] p-6 shadow-[0_14px_38px_rgba(28,52,62,0.06)] sm:p-7"
              >
                <FriendlyIcon kind={card.kind} tone={card.tone} size="sm" />
                <h3 className="mt-5 font-display text-xl font-extrabold text-[#071726]">
                  {t(`refresh.benefits.cards.${card.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t(`refresh.benefits.cards.${card.key}.body`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StationaerBenefits;
