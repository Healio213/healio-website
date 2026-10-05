import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const awardSets = {
  zahn: [
    {
      src: '/siegel/bayerische/warentest-zahn-prestige-2025.jpg',
      altKey: 'siegel.awards.warentest',
    },
    {
      src: '/siegel/ukv/franke-bornberg-zahnprivat100-2025.svg',
      altKey: 'siegel.awards.frankeBornberg',
    },
  ],
  stationaer: [
    {
      src: '/siegel/sdk/stiftung-warentest.png',
      altKey: 'siegel.awards.warentest',
    },
    {
      src: '/siegel/sdk/fairnesspreis.png',
      altKey: 'siegel.awards.fairness',
    },
    {
      src: '/siegel/sdk/morgen-morgen.png',
      altKey: 'siegel.awards.morgenMorgen',
    },
  ],
};

const primaryIkkAwards = {
  zahn: [
    {
      src: '/siegel/ikk/krankenkasseninfo-leistungen.png',
      altKey: 'siegel.ikkAwards.performance',
    },
    {
      src: '/siegel/ikk/familien-test.webp',
      altKey: 'siegel.ikkAwards.family',
    },
  ],
  stationaer: [
    {
      src: '/siegel/ikk/familien-test.webp',
      altKey: 'siegel.ikkAwards.family',
    },
    {
      src: '/siegel/ikk/schwangere-test.webp',
      altKey: 'siegel.ikkAwards.parents',
    },
  ],
};

const furtherIkkAwards = [
  {
    src: '/siegel/ikk/krankenkasseninfo-gesamt.png',
    altKey: 'siegel.ikkAwards.overall',
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-leistungen.png',
    altKey: 'siegel.ikkAwards.performance',
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-selbststaendige.png',
    altKey: 'siegel.ikkAwards.selfEmployed',
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-senioren.png',
    altKey: 'siegel.ikkAwards.seniors',
  },
  {
    src: '/siegel/ikk/krankenkasseninfo-studenten.png',
    altKey: 'siegel.ikkAwards.students',
  },
];

const QualityCooperationSection = ({ variant }) => {
  const namespace = variant === 'zahn' ? 'zahn' : 'stationaer';
  const { t } = useTranslation(namespace);
  const awards = awardSets[namespace];
  const mainAwards = [...awards, ...primaryIkkAwards[namespace]];
  const mainAwardPaths = new Set(mainAwards.map((award) => award.src));
  const remainingIkkAwards = furtherIkkAwards.filter((award) => !mainAwardPaths.has(award.src));

  return (
    <section className="border-b border-slate-100 bg-white py-10 md:py-12" aria-label={t('siegel.partnersLabel')}>
      <div className="container mx-auto px-4">
        <p className="mb-7 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 md:text-base">
          {t('siegel.partnersLabel')}
        </p>

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-8">
          {mainAwards.map((award) => (
            <img
              key={award.src}
              src={award.src}
              alt={t(award.altKey)}
              className="h-20 w-auto max-w-[170px] object-contain sm:h-24 sm:max-w-[190px] md:h-28 lg:h-32"
              loading="lazy"
            />
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-lg border border-sky-100 bg-gradient-to-r from-sky-50 via-white to-emerald-50 px-5 py-5 shadow-sm md:mt-10 md:px-8 md:py-6">
          <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-6 sm:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500 md:text-sm">
              {t('siegel.cooperationLabel')}
            </p>
            <img
              src="/logos/ikk-classic.svg"
              alt={t('siegel.ikkLogoAlt')}
              className="h-14 w-auto max-w-[240px] object-contain sm:h-16 md:h-20"
              loading="lazy"
            />
            <p className="max-w-sm text-sm font-medium leading-relaxed text-slate-600 md:text-base">
              {t('siegel.cooperationText')}
            </p>
          </div>
        </div>

        <details className="group mx-auto mt-7 max-w-6xl md:mt-8">
          <summary className="mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center justify-center gap-2 rounded-lg px-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700 md:text-sm [&::-webkit-details-marker]:hidden">
            {t('siegel.moreAwardsLabel')}
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5">
            {remainingIkkAwards.map((award) => (
              <img
                key={award.src}
                src={award.src}
                alt={t(award.altKey)}
                className="h-auto w-[132px] rounded-md shadow-sm ring-1 ring-slate-100 sm:w-[150px] md:w-[168px] lg:w-[180px]"
                loading="lazy"
              />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
};

export default QualityCooperationSection;
