import React from 'react';
import { ArrowUpRight, Landmark, LineChart, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const sources = [
  {
    key: 'dai',
    icon: LineChart,
    href: 'https://www.dai.de/detail/rendite-dreiecke-2025-zeit-schlaegt-timing',
  },
  {
    key: 'destatis',
    icon: ShieldCheck,
    href: 'https://www.destatis.de/DE/Themen/Querschnitt/Demografischer-Wandel/Aeltere-Menschen/armutsgefaehrdung.html',
  },
  {
    key: 'bmas',
    icon: Landmark,
    href: 'https://www.bmas.de/DE/Soziales/Rente-und-Altersvorsorge/rentenversicherungsbericht-art.html',
  },
];

const ResponsibilityStory = () => {
  const { t } = useTranslation('unternehmen');

  return (
    <section className="bg-[#f5f8f7] py-20 text-[#10202a] lg:py-28" aria-labelledby="responsibility-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{t('responsibility.eyebrow')}</p>
            <h2 id="responsibility-title" className="mt-4 max-w-[13ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl">
              {t('responsibility.title')}
            </h2>
          </div>

          <div className="border-l border-slate-300 pl-6 sm:pl-9">
            <p className="font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-[#10202a] sm:text-3xl">
              {t('responsibility.lead')}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {t('responsibility.description')}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-600">
              {t('responsibility.position')}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-300">
          {sources.map(({ key, icon: Icon, href }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[1fr_auto] gap-x-4 gap-y-4 border-b border-slate-300 py-7 transition hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-4 md:grid-cols-[170px_1fr_auto] md:items-center md:px-4"
            >
              <span className="col-start-1 row-start-1 flex items-center gap-3 pr-8 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700 md:col-auto md:row-auto md:pr-0">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {t(`responsibility.sources.${key}.publisher`)}
              </span>
              <span className="col-span-2 row-start-2 md:col-span-1 md:row-auto">
                <span className="block font-display text-lg font-extrabold text-[#10202a]">{t(`responsibility.sources.${key}.title`)}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{t(`responsibility.sources.${key}.description`)}</span>
              </span>
              <ArrowUpRight className="col-start-2 row-start-1 h-5 w-5 justify-self-end text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-700 md:col-auto md:row-auto" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResponsibilityStory;
