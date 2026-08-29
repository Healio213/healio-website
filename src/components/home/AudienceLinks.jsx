import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const AudienceLinks = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const items = t('audiences.items', { returnObjects: true });
  const company = items.find((item) => item.routeKey === 'unternehmen');
  const practice = items.find((item) => item.routeKey === 'partner');

  return (
    <section className="home-section bg-[#F5EFE3] text-home-midnight" aria-labelledby="audience-links-title">
      <div className="healio-container">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h2 id="audience-links-title" className="max-w-[18ch] font-friendly text-4xl font-bold leading-[1.04] tracking-[-0.025em] text-home-midnight sm:text-5xl">
            {t('audiences.title')}
          </h2>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">{t('audiences.description')}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.45fr_0.75fr]">
          {company && (
            <Link
              to={getPath(company.routeKey)}
              className="home-focus group relative isolate flex min-h-[380px] overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_24px_65px_rgba(12,42,33,0.16)] sm:p-11"
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
                <div className="flex items-center gap-3">
                  <FriendlyIcon kind="protection" tone="mint" size="sm" />
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-home-mint">{company.label}</p>
                </div>
                <h3 className="mt-6 max-w-[16ch] font-friendly text-3xl font-bold leading-[1.06] tracking-[-0.02em] sm:text-4xl">
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
              className="home-focus group relative isolate flex min-h-[380px] flex-col overflow-hidden rounded-[2rem] border border-[#CCE8DA] bg-[#E7F7EF] p-8 text-home-midnight shadow-[0_18px_48px_rgba(12,42,33,0.08)] transition duration-200 hover:-translate-y-1 hover:bg-[#DDF3E9] hover:shadow-[0_22px_54px_rgba(12,42,33,0.12)] motion-reduce:transform-none sm:p-10"
            >
              <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-emerald-900/10" aria-hidden="true" />
              <div className="absolute -right-8 top-16 h-48 w-48 rounded-full border border-emerald-900/10" aria-hidden="true" />
              <div className="absolute -bottom-4 -right-10 z-0 w-[235px] opacity-95 transition-transform duration-500 group-hover:-translate-x-1 group-hover:scale-[1.025] motion-reduce:transform-none sm:w-[260px]" aria-hidden="true">
                <img
                  src="/images/friendly-icons/trust-advisor.webp"
                  alt=""
                  width="512"
                  height="512"
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(24,63,52,0.16)]"
                />
              </div>
              <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(231,247,239,0.98)_0%,rgba(231,247,239,0.92)_50%,rgba(231,247,239,0.12)_82%)] transition-colors duration-200 group-hover:from-[#DDF3E9]" aria-hidden="true" />
              <div className="relative z-10 flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-home-mint shadow-[0_0_14px_3px_rgba(37,201,144,0.3)]" aria-hidden="true" />
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-emerald-800">{practice.label}</p>
              </div>
              <h3 className="relative z-10 mt-6 max-w-[13ch] font-friendly text-3xl font-bold leading-[1.06] tracking-[-0.02em]">
                {practice.title}
              </h3>
              {practice.description && <p className="relative z-10 mt-5 max-w-[20ch] text-base leading-7 text-home-slate">{practice.description}</p>}
              <span className="relative z-10 mt-auto inline-flex items-center gap-2 self-start rounded-full bg-white/80 px-4 py-2.5 font-display text-sm font-extrabold shadow-sm backdrop-blur-sm">
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
