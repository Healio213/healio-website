import React from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const StationaerFamily = () => {
  const { t } = useTranslation('stationaer');
  const parentItems = t('refresh.family.parents.items', { returnObjects: true });
  const childItems = t('refresh.family.children.items', { returnObjects: true });

  return (
    <section className="relative overflow-hidden bg-[#fff8e9] px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="stationaer-family-heading">
      <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#25c990]/10 blur-3xl" aria-hidden="true" />
      <div className="healio-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#9a6713]">
            {t('refresh.family.eyebrow')}
          </p>
          <h2 id="stationaer-family-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#071726] sm:text-4xl lg:text-5xl">
            {t('refresh.family.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t('refresh.family.subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
          <article
            className="rounded-[1.9rem] border border-[#f0cfc0] bg-white p-6 shadow-[0_18px_48px_rgba(79,55,35,0.08)] sm:p-8"
          >
            <div className="flex items-center gap-4">
              <FriendlyIcon kind="pregnancy" tone="coral" size="md" />
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#b75f42]">{t('refresh.family.parents.label')}</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-[#071726]">{t('refresh.family.parents.title')}</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">{t('refresh.family.parents.body')}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {(Array.isArray(parentItems) ? parentItems : []).map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#b75f42]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-[#fff4ef] p-4 text-xs font-medium leading-relaxed text-slate-600">
              {t('refresh.family.parents.note')}
            </p>
          </article>

          <article
            className="rounded-[1.9rem] border border-[#c9e7dc] bg-white p-6 shadow-[0_18px_48px_rgba(40,76,62,0.08)] sm:p-8"
          >
            <div className="flex items-center gap-4">
              <FriendlyIcon kind="family" tone="mint" size="md" />
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#087454]">{t('refresh.family.children.label')}</p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-[#071726]">{t('refresh.family.children.title')}</h3>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">{t('refresh.family.children.body')}</p>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              {(Array.isArray(childItems) ? childItems : []).map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#087454]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl bg-[#eefaf5] p-4 text-xs font-medium leading-relaxed text-slate-600">
              {t('refresh.family.children.note')}
            </p>
          </article>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#tarife"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#0a6c50] px-5 py-2.5 text-sm font-extrabold text-[#075f46] transition hover:bg-[#075f46] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075f46]"
          >
            {t('refresh.family.cta')}
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default StationaerFamily;
