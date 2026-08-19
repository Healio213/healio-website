import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const KASSENBOOST_EMPLOYER_URL = 'https://kassenboost.de/?utm_source=healio&utm_medium=website&utm_campaign=arbeitgeberzugang';

const CompanyWorkforceConcept = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();
  const points = t('workforce.points', { returnObjects: true });
  const inquiryPath = `${getPath('potenzialanalyse')}?interest=kassenboost`;

  return (
    <section
      id="healio-belegschaft"
      className="scroll-mt-24 bg-[#f5f8f7] py-16 lg:py-24"
      aria-labelledby="company-workforce-title"
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,34,42,0.07)] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-between bg-[#10242c] p-8 text-white sm:p-10 lg:p-12">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">
                {t('workforce.cardEyebrow')}
              </p>
              <p className="mt-6 max-w-[9ch] font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
                {t('workforce.cardTitle')}
              </p>
            </div>

            <div className="mt-14 border-t border-white/15 pt-7">
              <p className="font-display text-sm font-extrabold text-[#8ee7ca]">
                {t('workforce.privacyTitle')}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {t('workforce.privacyDescription')}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              {t('workforce.eyebrow')}
            </p>
            <h2
              id="company-workforce-title"
              className="mt-4 max-w-[17ch] font-display text-[2rem] font-extrabold leading-tight tracking-[-0.045em] text-[#10202a] sm:text-5xl"
            >
              {t('workforce.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {t('workforce.description')}
            </p>

            <ul className="mt-8 grid gap-3 border-y border-slate-200 py-6 sm:grid-cols-3 sm:gap-5">
              {points.map((point) => (
                <li key={point} className="text-sm font-bold leading-6 text-slate-700">
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={KASSENBOOST_EMPLOYER_URL}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#10242c] px-7 py-3 font-display text-sm font-extrabold text-white transition hover:bg-[#18333c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                {t('workforce.primaryCta')}
              </a>
              <Link
                to={inquiryPath}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 px-7 py-3 font-display text-sm font-extrabold text-[#10242c] transition hover:border-[#25c990] hover:bg-[#effaf6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                {t('workforce.secondaryCta')}
              </Link>
            </div>

            <p className="mt-5 max-w-2xl text-xs leading-5 text-slate-500">
              {t('workforce.note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyWorkforceConcept;
