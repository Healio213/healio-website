import React from 'react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

// Thematische Sach-Icons statt der wiederholten 3D-Figur.
const visuals = [
  { kind: 'document', tone: 'mint', surface: 'bg-[#E7F7EF]', border: 'border-[#CCE8DA]' },
  { kind: 'comparison', tone: 'butter', surface: 'bg-[#FFF1D6]', border: 'border-[#EBDCBF]' },
  { kind: 'calendar', tone: 'lavender', surface: 'bg-[#F2ECFB]', border: 'border-[#DED3EF]' },
];

const HomeTrust = () => {
  const { t } = useTranslation('home');
  const items = t('trust.items', { returnObjects: true });

  return (
    <section className="home-section bg-[#FDFAF6] py-10 md:py-24 lg:py-28" aria-labelledby="home-trust-title">
      <div className="healio-container max-md:px-0">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:gap-20">
          <div className="min-w-0">
            <div className="flex items-start gap-5 md:block">
              <div className="min-w-0 flex-1">
                <h2 id="home-trust-title" className="max-w-[17ch] font-display text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-home-midnight md:text-5xl md:leading-none">
                  <span className="md:hidden">{t('mobile.trust.title')}</span>
                  <span className="hidden md:inline">{t('trust.title')}</span>
                </h2>
                <p className="mt-4 text-base leading-6 text-[#3f5b51] md:hidden">{t('mobile.trust.description')}</p>
                <p className="mt-4 hidden max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8 md:block">{t('trust.description')}</p>
              </div>
              <img
                src="/images/healio-app-dashboard-card.webp"
                alt={t('trust.appScreenshotAlt')}
                width="720"
                height="1565"
                loading="lazy"
                decoding="async"
                className="h-auto w-24 shrink-0 rounded-xl shadow-[0_8px_20px_rgba(7,17,31,0.12)] md:hidden"
              />
            </div>
            <details className="mt-6 border-t border-[#D9E6DF] md:hidden">
              <summary className="home-focus min-h-[3rem] cursor-pointer py-3 text-sm font-bold text-emerald-800 underline underline-offset-4">
                {t('mobile.trust.detailsTitle')}
              </summary>
              <ul className="space-y-4 pb-4 text-sm leading-6 text-[#3f5b51]">
                {items.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-bold text-home-midnight">{item.title}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            </details>

            {/* Ab md bleibt die bestehende Liste erhalten. */}
            <MobileSwipeRow
              label={t('trust.title')}
              className="mt-6 hidden md:mt-9 md:block"
              desktopClassName="md:grid md:gap-3"
              itemClassName="flex"
            >
              {items.map((item, index) => {
                const visual = visuals[index];
                return (
                  <div key={item.title} className={`grid w-full grid-cols-1 content-start gap-3 rounded-2xl border p-5 md:grid-cols-[auto_1fr] md:gap-4 ${visual.surface} ${visual.border}`}>
                    <FriendlyIcon kind={visual.kind} tone={visual.tone} size="md" />
                    <div>
                      <h3 className="font-display text-xl font-bold leading-tight text-home-midnight">{item.title}</h3>
                      <p className="mt-1 text-base leading-6 text-slate-600 md:text-sm md:leading-6">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </MobileSwipeRow>
          </div>

          <div className="relative hidden overflow-hidden rounded-[2rem] md:block border border-[#CCE8DA] bg-[linear-gradient(145deg,#E7F7EF_0%,#DDF4EA_52%,#FFF6DF_100%)] px-5 pb-6 pt-6 shadow-[0_24px_70px_rgba(12,42,33,0.13)] sm:h-auto sm:min-h-[580px] sm:p-10">
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
