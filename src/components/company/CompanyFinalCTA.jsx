import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const CompanyFinalCTA = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();
  const proof = t('cta.proof', { returnObjects: true });

  return (
    <section className="w-full bg-[#07141d] py-16 text-white lg:py-20" aria-labelledby="company-final-cta-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">{t('cta.eyebrow')}</p>
            <h2 id="company-final-cta-title" className="mt-4 max-w-[15ch] font-display text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-6xl">
              {t('cta.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t('cta.description')}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
              {proof.map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#8ee7ca]" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Link
            to={getPath('potenzialanalyse')}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25c990] px-7 py-4 font-display text-sm font-extrabold text-[#07141d] transition hover:-translate-y-0.5 hover:bg-[#5edcaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07141d] motion-reduce:transform-none"
          >
            {t('cta.primary')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompanyFinalCTA;
