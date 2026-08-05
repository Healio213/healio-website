import React from 'react';
import { useTranslation } from 'react-i18next';

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

const ikkAwards = [
  {
    src: '/siegel/ikk/familien-test.webp',
    altKey: 'siegel.ikkAwards.family',
  },
  {
    src: '/siegel/ikk/schwangere-test.webp',
    altKey: 'siegel.ikkAwards.parents',
  },
];

const QualityCooperationSection = ({ variant }) => {
  const namespace = variant === 'zahn' ? 'zahn' : 'stationaer';
  const { t } = useTranslation(namespace);
  const awards = awardSets[namespace];

  return (
    <section className="border-b border-slate-100 bg-white py-12 md:py-16" aria-labelledby={`${namespace}-quality-heading`}>
      <div className="healio-container px-4">
        <header className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
            {t('siegel.eyebrow')}
          </p>
          <h2 id={`${namespace}-quality-heading`} className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            {t('siegel.title')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {t('siegel.subtitle')}
          </p>
        </header>

        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="flex h-full flex-col rounded-[1.75rem] border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50 p-5 shadow-[0_18px_45px_rgba(35,48,67,0.08)] sm:p-7">
            <p className="mb-5 text-center text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              {t('siegel.awardsLabel')}
            </p>
            <div className={`grid flex-1 content-center gap-4 ${awards.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
              {awards.map((award) => (
                <div
                  key={award.src}
                  className={`flex min-h-36 items-center justify-center rounded-2xl border border-white bg-white px-3 py-4 shadow-[0_10px_24px_rgba(45,58,76,0.08)] ring-1 ring-slate-100 ${awards.length === 3 ? 'last:col-span-2 last:mx-auto last:w-1/2 sm:last:col-span-1 sm:last:mx-0 sm:last:w-auto' : ''}`}
                >
                  <img
                    src={award.src}
                    alt={t(award.altKey)}
                    className="max-h-28 w-full max-w-44 object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </article>

          <article className="relative isolate overflow-hidden rounded-[1.75rem] border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-6 shadow-[0_18px_45px_rgba(25,126,119,0.10)] sm:p-8">
            <span className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-sky-200/30 blur-2xl" aria-hidden="true" />
            <span className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full bg-emerald-200/35 blur-2xl" aria-hidden="true" />

            <div className="relative flex h-full flex-col items-center text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                {t('siegel.cooperationLabel')}
              </p>
              <img
                src="/logos/ikk-classic.svg"
                alt={t('siegel.ikkLogoAlt')}
                className="my-4 h-16 w-auto max-w-[230px] object-contain sm:h-20"
                loading="lazy"
              />
              <p className="max-w-md text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
                {t('siegel.cooperationText')}
              </p>

              <div className="mt-6 w-full border-t border-slate-200/70 pt-5">
                <p className="mb-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                  {t('siegel.ikkAwardsLabel')}
                </p>
                <div className="flex items-center justify-center gap-3">
                  {ikkAwards.map((award) => (
                    <div key={award.src} className="rounded-xl bg-white/90 p-2 shadow-sm ring-1 ring-slate-100">
                      <img
                        src={award.src}
                        alt={t(award.altKey)}
                        className="h-16 w-auto object-contain sm:h-20"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default QualityCooperationSection;
