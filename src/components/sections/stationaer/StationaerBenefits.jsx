import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

// Frank 07.10.2026: Karten liebevoller gestalten. Jede Karte bekommt einen
// weichen Pastellton mit passendem Rand und ein größeres, freundliches Icon.
const benefitCards = [
  { key: 'doctor', kind: 'ambulant', tone: 'mint', surface: 'bg-[#f4fbf7] border-[#d3ebe0]' },
  { key: 'room', kind: 'hospital', tone: 'lavender', surface: 'bg-[#f9f7ff] border-[#e3dcf5]' },
  { key: 'choice', kind: 'comparison', tone: 'sky', surface: 'bg-[#f5faff] border-[#d6e7f4]' },
  { key: 'start', kind: 'calendar', tone: 'butter', surface: 'bg-[#fffcf2] border-[#f0e6bd]' },
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
                className={`h-full rounded-[1.4rem] border p-5 shadow-[0_2px_8px_rgba(28,52,62,0.07)] sm:p-7 md:shadow-[0_14px_38px_rgba(28,52,62,0.06)] ${card.surface}`}
              >
                {/* Mobil Icon und Titel nebeneinander, damit die Karte nicht höher wird; ab md Icon über dem Titel. */}
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-0">
                  <FriendlyIcon kind={card.kind} tone={card.tone} size="lg" className="!h-16 !w-16 md:!h-20 md:!w-20" />
                  <h3 className="min-w-0 font-display text-xl font-extrabold text-[#071726] md:mt-5">
                    {t(`refresh.benefits.cards.${card.key}.title`)}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-600 md:mt-2 md:text-sm md:leading-relaxed">
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
