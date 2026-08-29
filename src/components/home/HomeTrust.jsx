import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const visuals = [
  { kind: 'broker', tone: 'mint', surface: 'bg-[#E7F7EF]', border: 'border-[#CCE8DA]' },
  { kind: 'thinking', tone: 'butter', surface: 'bg-[#FFF1D6]', border: 'border-[#EBDCBF]' },
  { kind: 'advisor', tone: 'lavender', surface: 'bg-[#F2ECFB]', border: 'border-[#DED3EF]' },
];

const HomeTrust = () => {
  const { t } = useTranslation('home');
  const items = t('trust.items', { returnObjects: true });

  return (
    <section className="home-section bg-[#FDFAF6]" aria-labelledby="home-trust-title">
      <div className="healio-container">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-20">
          <div>
            <h2 id="home-trust-title" className="max-w-[17ch] font-friendly text-4xl font-bold leading-[1.04] tracking-[-0.025em] text-home-midnight sm:text-5xl">
              {t('trust.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{t('trust.description')}</p>

            <ul className="mt-9 grid gap-3">
              {items.map((item, index) => {
                const visual = visuals[index];
                return (
                  <li key={item.title} className={`grid grid-cols-[auto_1fr] gap-4 rounded-2xl border p-4 sm:p-5 ${visual.surface} ${visual.border}`}>
                    <FriendlyIcon kind={visual.kind} tone={visual.tone} size="md" />
                    <div>
                      <h3 className="font-friendly text-xl font-bold leading-tight text-home-midnight">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border border-[#CCE8DA] bg-[linear-gradient(145deg,#E7F7EF_0%,#DDF4EA_52%,#FFF6DF_100%)] p-7 shadow-[0_24px_70px_rgba(12,42,33,0.13)] sm:min-h-[580px] sm:p-10">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-emerald-900/10" aria-hidden="true" />
            <div className="absolute -left-8 bottom-10 h-44 w-44 rounded-full bg-white/50 blur-2xl" aria-hidden="true" />
            <div className="relative mx-auto w-[210px] rotate-2 rounded-[2rem] border border-white/15 bg-slate-950 p-2.5 shadow-[0_28px_60px_rgba(7,17,31,0.24)] sm:w-[245px]">
              <div className="overflow-hidden rounded-[1.45rem] border border-white/10 bg-slate-900">
                <img
                  src="/images/healio-app-dashboard-card.webp"
                  alt={t('trust.appScreenshotAlt')}
                  className="block h-auto w-full"
                  width="720"
                  height="1565"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTrust;
