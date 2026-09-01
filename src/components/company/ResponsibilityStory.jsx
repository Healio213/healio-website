import React from 'react';
import { ArrowUpRight, ChevronDown, Landmark, LineChart, ShieldCheck } from 'lucide-react';
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
    <section className="bg-[#f5f8f7] py-12 text-[#10202a] lg:py-16" aria-labelledby="responsibility-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <details className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,34,42,0.05)]">
          <summary className="grid cursor-pointer list-none gap-6 p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-inset sm:p-9 lg:grid-cols-[0.74fr_1.26fr_auto] lg:items-center [&::-webkit-details-marker]:hidden">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{t('responsibility.eyebrow')}</p>
              <h2 id="responsibility-title" className="mt-3 max-w-[16ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">
                {t('responsibility.title')}
              </h2>
            </div>
            <p className="max-w-3xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">
              {t('responsibility.lead')}
            </p>
            <span className="inline-flex items-center gap-2 font-display text-sm font-extrabold text-emerald-700 lg:justify-self-end">
              <span className="group-open:hidden">{t('responsibility.detailsShow')}</span>
              <span className="hidden group-open:inline">{t('responsibility.detailsHide')}</span>
              <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
            </span>
          </summary>

          <div className="border-t border-slate-200 px-7 pb-8 pt-7 sm:px-9 sm:pb-9">
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-10">
              <p className="text-base leading-7 text-slate-600">{t('responsibility.description')}</p>
              <p className="text-base leading-7 text-slate-600">{t('responsibility.position')}</p>
            </div>

            <div className="mt-8 border-t border-slate-200">
              {sources.map(({ key, icon: Icon, href }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group/source grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 border-b border-slate-200 py-5 transition hover:bg-[#f7faf9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 md:grid-cols-[170px_1fr_auto] md:items-center md:px-3"
                >
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-8 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700 md:col-auto md:row-auto md:pr-0">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {t(`responsibility.sources.${key}.publisher`)}
                  </span>
                  <span className="col-span-2 row-start-2 md:col-span-1 md:row-auto">
                    <span className="block font-display text-base font-extrabold text-[#10202a]">{t(`responsibility.sources.${key}.title`)}</span>
                    <span className="mt-1 block text-sm leading-6 text-slate-600">{t(`responsibility.sources.${key}.description`)}</span>
                  </span>
                  <ArrowUpRight className="col-start-2 row-start-1 h-5 w-5 justify-self-end text-slate-400 transition-transform group-hover/source:-translate-y-0.5 group-hover/source:translate-x-0.5 group-hover/source:text-emerald-700 md:col-auto md:row-auto" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
};

export default ResponsibilityStory;
