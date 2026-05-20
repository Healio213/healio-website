import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, CheckCircle2, Receipt, Sparkles, WalletCards } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import { useReferrer } from '@/hooks/useReferrer';

const nudgeItems = [
  { key: 'selfPay', icon: Receipt },
  { key: 'budget', icon: WalletCards },
  { key: 'bonus', icon: Sparkles },
];

const AmbulantConversionNudge = () => {
  const { t } = useTranslation('ambulant');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer });

  return (
    <section className="relative overflow-hidden border-b border-emerald-100/70 bg-gradient-to-br from-white via-emerald-50/70 to-white py-10 md:py-14">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-healio-primary">
              {t('conversionNudge.kicker')}
            </p>
            <h2 className="mb-4 max-w-3xl text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">
              <HighlightText text={t('conversionNudge.title')} />
            </h2>
            <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
              <HighlightText text={t('conversionNudge.text')} />
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={sdkUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSdkClick('ambulant-conversion-nudge', referrer)}
                className="inline-flex items-center justify-center rounded-lg bg-healio-primary px-6 py-3 font-bold text-white shadow-lg shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Calculator className="mr-2 h-5 w-5" />
                {t('conversionNudge.ctaCalculate')}
              </a>
              <a
                href="#healio-konzept"
                className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-6 py-3 font-bold text-slate-800 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:text-emerald-700"
              >
                {t('conversionNudge.ctaUnderstand')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-3 md:grid-cols-3">
            {nudgeItems.map((item, index) => {
              const Icon = item.icon;
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
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon className="h-5 w-5" />
                  </div>
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
