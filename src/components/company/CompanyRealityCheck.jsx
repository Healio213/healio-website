import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const CompanyRealityCheck = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();
  const questions = t('realityCheck.questions', { returnObjects: true });

  return (
    <section className="bg-[#06131c] pb-20 text-white lg:pb-24" aria-labelledby="company-reality-check-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-t border-white/10 pt-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:pt-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8ee7ca]">{t('realityCheck.eyebrow')}</p>
            <h2
              id="company-reality-check-title"
              className="mt-4 max-w-[15ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl"
            >
              {t('realityCheck.title')}
            </h2>
          </div>

          <div>
            <ol className="grid gap-px overflow-hidden rounded-2xl bg-white/10 md:grid-cols-3">
              {questions.map((question, index) => (
                <li key={question} className="bg-[#0b202a] p-6">
                  <span className="font-display text-xs font-extrabold tracking-[0.18em] text-[#8ee7ca]">0{index + 1}</span>
                  <p className="mt-5 font-display text-base font-extrabold leading-6 tracking-[-0.015em] text-white">{question}</p>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex flex-col gap-5 border-l-2 border-[#25c990] pl-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-sm leading-6 text-slate-300">{t('realityCheck.conclusion')}</p>
              <Link
                to={getPath('potenzialanalyse')}
                className="inline-flex shrink-0 items-center gap-2 font-display text-sm font-extrabold text-[#8ee7ca] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06131c]"
              >
                {t('realityCheck.cta')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyRealityCheck;
