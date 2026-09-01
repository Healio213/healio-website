import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const StationaerBonusBridge = () => {
  const { t } = useTranslation('stationaer');
  const { getPath } = useLanguage();
  const rows = t('refresh.bonus.example.rows', { returnObjects: true });

  return (
    <section className="relative isolate overflow-hidden bg-[#071726] px-4 py-20 text-white sm:px-6 md:py-24 lg:px-8" aria-labelledby="stationaer-bonus-heading">
      <div className="absolute -left-28 bottom-0 h-96 w-96 rounded-full bg-[#25c990]/13 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-[#e8b94e]/10 blur-3xl" aria-hidden="true" />

      <div className="healio-container relative">
        <div className="grid gap-10 lg:grid-cols-[0.93fr_1.07fr] lg:items-center lg:gap-14">
          <div>
            <div className="flex items-end gap-2 sm:gap-4">
              <img
                src="/images/friendly-icons/decision-weighing.webp"
                alt=""
                width="512"
                height="512"
                loading="lazy"
                decoding="async"
                className="w-32 shrink-0 sm:w-44"
              />
              <p className="mb-4 font-display text-xs font-bold uppercase tracking-[0.22em] text-[#5ee0b1]">
                {t('refresh.bonus.eyebrow')}
              </p>
            </div>
            <h2 id="stationaer-bonus-heading" className="mt-2 max-w-[15ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              {t('refresh.bonus.title')}
            </h2>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-white">
              {t('refresh.bonus.lead')}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {t('refresh.bonus.body')}
            </p>

            <div className="mt-7 rounded-2xl border border-white/12 bg-white/[0.06] p-5">
              <p className="text-sm font-extrabold text-[#5ee0b1]">{t('refresh.bonus.fullPlansTitle')}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{t('refresh.bonus.fullPlansBody')}</p>
            </div>

            <Link
              to={getPath('kassenboost')}
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#5ee0b1] px-5 py-2.5 text-sm font-extrabold text-[#5ee0b1] transition hover:bg-[#5ee0b1] hover:text-[#071726] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1]"
            >
              {t('refresh.bonus.cta')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-[#f1d899]/70 bg-gradient-to-br from-[#fffdf7] via-white to-[#fff4d7] p-6 text-[#071726] shadow-[0_30px_75px_rgba(0,0,0,0.26)] sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9b6a18]">{t('refresh.bonus.example.eyebrow')}</p>
                <h3 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">{t('refresh.bonus.example.title')}</h3>
              </div>
              <span className="rounded-full bg-[#fff1c8] px-3 py-1.5 text-xs font-extrabold text-[#8a5c0e]">
                {t('refresh.bonus.example.badge')}
              </span>
            </div>

            <dl className="mt-7 divide-y divide-slate-200/80">
              {(Array.isArray(rows) ? rows : []).map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 py-3.5 first:pt-0">
                  <dt className="text-sm text-slate-600">{row.label}</dt>
                  <dd className="text-right font-extrabold text-[#071726]">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 rounded-2xl bg-[#e9f9f3] p-5 ring-1 ring-[#bfe6d7]">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#087454]">{t('refresh.bonus.example.resultLabel')}</p>
              <div className="mt-1 flex items-end justify-between gap-4">
                <p className="text-sm font-semibold text-slate-700">{t('refresh.bonus.example.resultText')}</p>
                <p className="font-display text-3xl font-extrabold text-[#087454]">{t('refresh.bonus.example.resultValue')}</p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-slate-500">{t('refresh.bonus.example.disclosure')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StationaerBonusBridge;
