import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const InsurancePathway = () => {
  const { t } = useTranslation('home');
  const { getPath } = useLanguage();
  const items = t('products.items', { returnObjects: true });

  return (
    <section id="schutz" className="home-section relative z-10 scroll-mt-20 bg-white" aria-labelledby="insurance-pathway-title">
      <div className="healio-container">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="home-eyebrow text-emerald-700">{t('products.eyebrow')}</p>
            <h2 id="insurance-pathway-title" className="mt-4 max-w-[15ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.035em] text-home-midnight sm:text-5xl">
              {t('products.title')}
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-slate-600 lg:justify-self-end">
            {t('products.description')}
          </p>
        </div>

        <div className="mt-12 border-b border-slate-200">
          {items.map((item) => (
            <Link
              key={item.key}
              to={getPath(item.routeKey)}
              className="home-focus group relative grid gap-4 border-t border-slate-200 py-8 transition-colors duration-300 hover:bg-[#F5F8F6] sm:px-5 md:grid-cols-[7rem_minmax(0,0.9fr)_minmax(0,1.15fr)_3rem] md:items-center lg:py-10"
            >
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                {item.label}
              </span>
              <h3 className="max-w-[18ch] font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-home-midnight sm:text-3xl">
                {item.title}
              </h3>
              <div>
                <p className="max-w-xl text-base leading-7 text-slate-600">{item.description}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-[0.13em] text-slate-400">{item.detail}</p>
              </div>
              <span className="grid h-11 w-11 place-items-center rounded-full border border-slate-300 text-home-midnight transition duration-300 group-hover:border-home-mint group-hover:bg-home-mint group-hover:shadow-[0_10px_26px_rgba(37,201,144,0.18)]">
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only">{item.cta}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsurancePathway;
