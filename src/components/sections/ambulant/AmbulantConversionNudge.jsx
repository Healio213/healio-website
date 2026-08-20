import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, CheckCircle2, ChevronDown } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import { useReferrer } from '@/hooks/useReferrer';

const nudgeItems = [
  { key: 'selfPay', icon: 'document-check', tone: 'coral' },
  { key: 'budget', icon: 'health-budget', tone: 'sky' },
  { key: 'bonus', icon: 'bonus-reward', tone: 'butter' },
];

const AmbulantConversionNudge = () => {
  const { t } = useTranslation('ambulant');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });

  return (
    <section className="relative overflow-hidden border-b border-emerald-100/70 bg-gradient-to-br from-white via-emerald-50/70 to-white py-8 md:py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-6 md:gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-healio-primary md:mb-3 md:text-sm md:tracking-[0.18em]">
              {t('conversionNudge.kicker')}
            </p>
            <h2 className="mb-3 max-w-3xl text-2xl font-extrabold leading-tight text-slate-950 md:mb-4 md:text-4xl">
              <HighlightText text={t('conversionNudge.title')} />
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              <HighlightText text={t('conversionNudge.text')} />
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row md:mt-7">
              <a
                href={sdkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSdkClick('ambulant-conversion-nudge', referrer)}
                className="inline-flex items-center justify-center rounded-lg bg-healio-primary px-5 py-3 font-bold text-white shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl md:px-6"
              >
                <Calculator className="mr-2 h-5 w-5" />
                {t('conversionNudge.ctaCalculate')}
              </a>
              <a
                href="#tarif-tabelle"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-5 py-3 font-bold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-700 md:px-6"
              >
                {t('conversionNudge.ctaUnderstand')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-2 md:hidden">
            {nudgeItems.map((item, index) => {
              return (
                <details
                  key={item.key}
                  open={index === 0}
                  className="group rounded-lg border border-emerald-100 bg-white/90 shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-3">
                      <FriendlyIcon icon={item.icon} tone={item.tone} size="sm" />
                      <span className="font-extrabold text-slate-950">
                        {t(`conversionNudge.items.${item.key}.title`)}
                      </span>
                    </span>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-emerald-500 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="px-4 pb-4 pl-[4.25rem] text-sm leading-relaxed text-slate-600">
                    {t(`conversionNudge.items.${item.key}.desc`)}
                  </p>
                </details>
              );
            })}
          </div>

          <div className="hidden gap-3 md:grid md:grid-cols-3">
            {nudgeItems.map((item, index) => {
              return (
                <motion.article
                  key={item.key}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative rounded-lg border border-emerald-100 bg-white/85 p-5 shadow-sm"
                >
                  {index < nudgeItems.length - 1 && (
                    <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-emerald-300 md:block" />
                  )}
                  <FriendlyIcon icon={item.icon} tone={item.tone} size="sm" className="mb-4" />
                  <h3 className="mb-2 text-lg font-extrabold text-slate-950">
                    {t(`conversionNudge.items.${item.key}.title`)}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {t(`conversionNudge.items.${item.key}.desc`)}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <div className="flex items-start gap-3 rounded-lg border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-healio-primary" />
              <span>{t('conversionNudge.note')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmbulantConversionNudge;
