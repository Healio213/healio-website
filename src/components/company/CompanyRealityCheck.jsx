import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';

const CompanyRealityCheck = () => {
  const { t } = useTranslation('unternehmen');
  const { getPath } = useLanguage();
  const questions = t('realityCheck.questions', { returnObjects: true });

  return (
    <section className="bg-[#06131c] pb-10 text-white md:pb-14 lg:pb-20" aria-labelledby="company-reality-check-title">
      <div className="healio-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-t border-white/10 pt-8 sm:gap-8 sm:pt-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14 lg:pt-14">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#8ee7ca] md:text-xs">{t('realityCheck.eyebrow')}</p>
            <h2
              id="company-reality-check-title"
              className="mt-4 max-w-[15ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl"
            >
              {t('realityCheck.title')}
            </h2>
          </div>

          <div>
            {/* Mobil Wischreihe (drei Fragen), ab md die bisherige verbundene Dreier-Tafel. */}
            <MobileSwipeRow
              as="ol"
              label={t('realityCheck.title')}
              dotsTone="dark"
              desktopClassName="md:grid md:grid-cols-3 md:gap-px md:!overflow-hidden md:rounded-2xl md:bg-white/10"
              itemClassName="flex"
            >
              {questions.map((question, index) => (
                <div key={question} className="w-full rounded-2xl border border-white/10 bg-[#0b202a] p-5 sm:p-6 md:rounded-none md:border-0">
                  <span className="font-display text-sm font-extrabold tracking-[0.18em] text-[#8ee7ca] md:text-xs">0{index + 1}</span>
                  <p className="mt-3 font-display text-base font-extrabold leading-6 tracking-[-0.015em] text-white">{question}</p>
                </div>
              ))}
            </MobileSwipeRow>

            <div className="mt-3 flex flex-col gap-4 border-l-2 border-[#25c990] pl-5 sm:gap-5 sm:flex-row sm:items-center sm:justify-between md:mt-7">
              <p className="max-w-2xl text-base leading-6 text-slate-300 md:text-sm md:leading-6">{t('realityCheck.conclusion')}</p>
              <Link
                to={getPath('potenzialanalyse')}
                className="inline-flex min-h-11 shrink-0 items-center gap-2 font-display text-sm font-extrabold text-[#8ee7ca] transition md:min-h-0 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06131c]"
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
