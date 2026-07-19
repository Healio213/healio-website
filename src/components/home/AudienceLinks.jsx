import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const AudienceLinks = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const items = t('audiences.items', { returnObjects: true });
  const company = items.find((item) => item.routeKey === 'unternehmen');
  const practice = items.find((item) => item.routeKey === 'partner');

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

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
          {company && (
            <Link
              to={getPath(company.routeKey)}
              className="home-focus group relative isolate flex min-h-[410px] overflow-hidden rounded-[2.75rem] bg-home-midnight p-8 text-white shadow-[0_26px_80px_rgba(7,17,31,0.18)] sm:p-11"
            >
              <img
                src="/images/healio-hero-markenrelief-v1.webp"
                alt=""
                width="1586"
                height="992"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-[64%_center] transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transform-none"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,16,24,0.97)_0%,rgba(4,16,24,0.88)_38%,rgba(4,16,24,0.28)_72%,rgba(4,16,24,0.06)_100%)]" />
              <div className="relative flex max-w-[520px] flex-col">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-home-mint">{company.label}</p>
                <h3 className="mt-6 max-w-[16ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-4xl">
                  {company.title}
                </h3>
                {company.description && <p className="mt-5 max-w-md text-base leading-7 text-slate-200">{company.description}</p>}
                <span className="mt-auto inline-flex items-center gap-2 pt-9 font-display text-sm font-extrabold">
                  {company.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          )}

          {practice && (
            <Link
              to={getPath(practice.routeKey)}
              className="home-focus group relative flex min-h-[410px] flex-col overflow-hidden rounded-[2.75rem] border border-emerald-900/10 bg-[#DDEFE8] p-8 text-home-midnight transition-colors hover:bg-[#D3EAE1] sm:p-10"
            >
              <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-emerald-900/10" aria-hidden="true" />
              <div className="absolute -right-8 top-16 h-48 w-48 rounded-full border border-emerald-900/10" aria-hidden="true" />
              <p className="relative text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-800">{practice.label}</p>
              <h3 className="relative mt-6 max-w-[16ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.035em]">
                {practice.title}
              </h3>
              {practice.description && <p className="relative mt-5 text-base leading-7 text-home-slate">{practice.description}</p>}
              <span className="relative mt-auto inline-flex items-center gap-2 pt-9 font-display text-sm font-extrabold">
                {practice.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default AudienceLinks;
