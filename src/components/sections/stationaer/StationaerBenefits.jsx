import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

const benefitCards = [
  { key: 'doctor', kind: 'ambulant', tone: 'mint' },
  { key: 'room', kind: 'hospital', tone: 'lavender' },
  { key: 'choice', kind: 'comparison', tone: 'sky' },
  { key: 'start', kind: 'calendar', tone: 'butter' },
];

const StationaerBenefits = () => {
  const { t } = useTranslation('stationaer');

  return (
    <section className="bg-white py-12 md:py-24" aria-labelledby="stationaer-benefits-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 md:gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#087454] md:text-xs md:tracking-[0.22em]">
              {t('refresh.benefits.eyebrow')}
            </p>
            <h2 id="stationaer-benefits-heading" className="mt-4 max-w-[12ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#071726] [text-wrap:balance] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
              {t('refresh.benefits.title')}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              {t('refresh.benefits.subtitle')}
            </p>
            <div className="mt-6 rounded-2xl border border-[#cde9df] bg-[#eefaf5] p-5 md:mt-7">
              <p className="text-base font-extrabold text-[#075f46] md:text-sm">{t('refresh.benefits.contextTitle')}</p>
              <p className="mt-2 text-base leading-relaxed text-slate-600 md:text-sm md:leading-relaxed">{t('refresh.benefits.contextBody')}</p>
            </div>
          </div>

          {/* Mobil Wischreihe, ab md wie zuvor das Raster mit zwei Spalten. */}
          <MobileSwipeRow
            label={t('refresh.benefits.title')}
            className="min-w-0"
            desktopClassName="md:grid md:gap-5 md:grid-cols-2"
          >
            {benefitCards.map((card) => (
              <article
                key={card.key}
                className="h-full rounded-[1.65rem] border border-slate-100 bg-[#fbfdfc] p-5 shadow-[0_2px_8px_rgba(28,52,62,0.07)] sm:p-7 md:shadow-[0_14px_38px_rgba(28,52,62,0.06)]"
              >
                <FriendlyIcon kind={card.kind} tone={card.tone} size="sm" className="!h-10 !w-10 md:!h-12 md:!w-12" />
                <h3 className="mt-4 font-display text-xl font-extrabold text-[#071726] md:mt-5">
                  {t(`refresh.benefits.cards.${card.key}.title`)}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600 md:text-sm md:leading-relaxed">
                  {t(`refresh.benefits.cards.${card.key}.body`)}
                </p>
              </article>
            ))}
          </MobileSwipeRow>
        </div>
      </div>
    </section>
  );
};

export default StationaerBenefits;
