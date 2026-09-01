import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Circle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';

const tariffOptions = [
  { key: 'sp2', tone: 'mint', kind: 'hospital', accent: '#25c990', surface: '#eefaf5' },
  { key: 'sp1', tone: 'lavender', kind: 'hospital', accent: '#8176bf', surface: '#f4f1fb' },
  { key: 'spu', tone: 'butter', kind: 'protection', accent: '#c99422', surface: '#fff8e4' },
];

const StationaerTariffSelector = () => {
  const { t } = useTranslation('stationaer');
  const [selected, setSelected] = useState('');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Stationär' });

  return (
    <section id="tarife" className="scroll-mt-24 bg-[#f5faf8] px-4 py-20 sm:px-6 md:py-24 lg:px-8" aria-labelledby="stationaer-tariffs-heading">
      <div className="healio-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-[#087454]">
            {t('refresh.selector.eyebrow')}
          </p>
          <h2 id="stationaer-tariffs-heading" className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[#071726] sm:text-4xl lg:text-5xl">
            {t('refresh.selector.title')}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t('refresh.selector.subtitle')}
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {tariffOptions.map((option) => {
            const features = t(`refresh.selector.options.${option.key}.features`, { returnObjects: true });
            const isSelected = selected === option.key;

            return (
              <article
                key={option.key}
                className={`relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border-2 bg-white p-6 shadow-[0_18px_45px_rgba(29,53,63,0.07)] transition duration-300 sm:p-7 ${
                  isSelected ? 'border-current -translate-y-1 shadow-[0_24px_55px_rgba(29,53,63,0.13)]' : 'border-white hover:-translate-y-1 hover:border-slate-200'
                }`}
                style={{ color: isSelected ? option.accent : undefined }}
              >
                <div className="flex items-start justify-between gap-4">
                  <FriendlyIcon kind={option.kind} tone={option.tone} size="md" />
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-extrabold"
                    style={{ backgroundColor: option.surface, color: option.accent }}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Circle className="h-3.5 w-3.5" aria-hidden="true" />}
                    {t(`refresh.selector.options.${option.key}.code`)}
                  </span>
                </div>

                <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: option.accent }}>
                  {t(`refresh.selector.options.${option.key}.useCase`)}
                </p>
                <h3 className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-[-0.025em] text-[#071726]">
                  {t(`refresh.selector.options.${option.key}.title`)}
                </h3>
                <p className="mt-2 text-sm font-extrabold" style={{ color: option.accent }}>
                  {t(`refresh.selector.options.${option.key}.price`)}
                </p>
                <p className="mt-3 min-h-[3.25rem] text-sm leading-relaxed text-slate-600">
                  {t(`refresh.selector.options.${option.key}.description`)}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {(Array.isArray(features) ? features : []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: option.accent }} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelected(option.key)}
                    className="flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-extrabold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3"
                    style={{
                      borderColor: isSelected ? option.accent : '#dbe4e8',
                      backgroundColor: isSelected ? option.surface : '#ffffff',
                      color: isSelected ? option.accent : '#223044',
                      outlineColor: option.accent,
                    }}
                  >
                    {isSelected ? t('refresh.selector.selected') : t('refresh.selector.choose')}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-8 flex max-w-4xl flex-col items-center justify-between gap-5 rounded-[1.6rem] bg-[#071726] px-6 py-6 text-white shadow-[0_20px_55px_rgba(7,23,38,0.18)] sm:flex-row sm:px-8"
              aria-live="polite"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#5ee0b1]">
                  {t('refresh.selector.resultEyebrow')}
                </p>
                <p className="mt-1 font-display text-xl font-extrabold sm:text-2xl">
                  {t(`refresh.selector.options.${selected}.result`)}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">
                  {t('refresh.selector.resultNote')}
                </p>
              </div>
              <a
                href={sdkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSdkClick(`stationaer-selector-${selected}`, referrer)}
                className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-3 text-sm font-extrabold text-[#071726] transition hover:-translate-y-0.5 hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ee0b1] sm:w-auto"
              >
                {t('refresh.selector.calculate')}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto mt-7 max-w-2xl text-center text-sm font-semibold text-slate-500"
              aria-live="polite"
            >
              {t('refresh.selector.empty')}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-slate-500">
          {t('refresh.selector.disclosure')}
        </p>
      </div>
    </section>
  );
};

export default StationaerTariffSelector;
