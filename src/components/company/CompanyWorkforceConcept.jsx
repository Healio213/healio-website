import React from 'react';
import { ChevronDown } from 'lucide-react';
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
      className="scroll-mt-24 bg-white py-14 lg:py-20"
      aria-labelledby="company-workforce-title"
    >
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-[#f8faf9] shadow-[0_24px_80px_rgba(15,34,42,0.07)] lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex flex-col justify-between bg-[#10242c] p-7 text-white sm:p-9 lg:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">
                {t('workforce.cardEyebrow')}
              </p>
              <p className="mt-5 max-w-[12ch] font-display text-3xl font-extrabold leading-[1.04] tracking-[-0.04em] sm:text-4xl">
                {t('workforce.cardTitle')}
              </p>
            </div>

            <div className="mt-9 border-t border-white/15 pt-6">
              <p className="font-display text-sm font-extrabold text-[#8ee7ca]">
                {t('workforce.privacyTitle')}
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                {t('workforce.privacyDescription')}
              </p>
            </div>
          </div>

          <div className="p-7 sm:p-9 lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
              {t('workforce.eyebrow')}
            </p>
            <h2
              id="company-workforce-title"
              className="mt-4 max-w-[17ch] font-display text-[2rem] font-extrabold leading-tight tracking-[-0.04em] text-[#10202a] sm:text-4xl"
            >
              {t('workforce.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {t('workforce.description')}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

            <details className="group mt-6 border-t border-slate-200 pt-1">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-5 py-3 font-display text-sm font-extrabold text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="group-open:hidden">{t('workforce.detailsShow')}</span>
                  <span className="hidden group-open:inline">{t('workforce.detailsHide')}</span>
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
              </summary>
              <div className="pb-2 pt-2">
                <ul className="grid gap-2 sm:grid-cols-3 sm:gap-4">
                  {points.map((point) => (
                    <li key={point} className="text-sm font-bold leading-6 text-slate-700">
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 max-w-2xl text-xs leading-5 text-slate-500">
                  {t('workforce.note')}
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyWorkforceConcept;
