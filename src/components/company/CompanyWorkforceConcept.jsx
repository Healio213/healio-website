import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const CompanyWorkforceConcept = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();
  const points = t('workforce.points', { returnObjects: true });

  return (
    <section
      id="healio-belegschaft"
      className="scroll-mt-24 bg-[#f5f8f7] py-20 lg:py-28"
      aria-labelledby="company-workforce-title"
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 shadow-[0_24px_80px_rgba(15,34,42,0.08)] lg:grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative isolate overflow-hidden bg-[#07161f] p-8 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#25c990]/15 blur-3xl" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-[#8ee7ca]">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">{t('workforce.cardEyebrow')}</p>
            <p className="mt-3 font-display text-6xl font-extrabold tracking-[-0.06em] sm:text-7xl">{t('workforce.employerAmount')}</p>
            <p className="mt-2 text-sm font-semibold text-slate-300">{t('workforce.employerLabel')}</p>

            <div className="mt-10 border-t border-white/[0.12] pt-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{t('workforce.budgetLabel')}</p>
              <p className="mt-2 font-display text-3xl font-extrabold tracking-[-0.04em] text-[#8ee7ca]">{t('workforce.budgetAmount')}</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-slate-300">{t('workforce.budgetSuffix')}</p>
            </div>
          </div>

          <div className="bg-[#f8faf9] p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{t('workforce.eyebrow')}</p>
            <h2
              id="company-workforce-title"
              className="mt-4 max-w-[16ch] break-words [hyphens:manual] font-display text-[2rem] font-extrabold leading-tight tracking-[-0.045em] text-[#10202a] sm:text-5xl"
            >
              {t('workforce.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t('workforce.description')}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700 sm:block">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 sm:mb-3" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>

            <Link
              to={getPath('potenzialanalyse')}
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#10242c] px-7 py-4 font-display text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#18333c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:transform-none"
            >
              {t('workforce.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <p className="mt-6 max-w-2xl text-xs leading-5 text-slate-500">{t('workforce.note')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyWorkforceConcept;
