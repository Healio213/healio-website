import React from 'react';
import { ArrowRight, Briefcase, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const icons = [Briefcase, Stethoscope];

const AudienceLinks = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const items = t('audiences.items', { returnObjects: true });

  return (
    <section className="home-section bg-home-ice" aria-labelledby="audience-links-title">
      <div className="healio-container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="home-eyebrow text-emerald-700">{t('audiences.eyebrow')}</p>
            <h2 id="audience-links-title" className="mt-4 max-w-[18ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.04em] text-home-midnight sm:text-5xl">
              {t('audiences.title')}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">{t('audiences.description')}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Link
                key={item.routeKey}
                to={getPath(item.routeKey)}
                className="home-focus group flex min-h-[270px] flex-col rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:border-home-mint/60 hover:shadow-[0_24px_70px_rgba(15,23,42,0.1)] sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-700" aria-hidden="true" />
                </div>
                <p className="mt-10 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">{item.label}</p>
                <h3 className="mt-4 max-w-[20ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-home-midnight sm:text-3xl">{item.title}</h3>
                <span className="mt-auto pt-7 font-display text-sm font-extrabold text-home-midnight">{item.cta}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AudienceLinks;
