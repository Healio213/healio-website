
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Check } from 'lucide-react';
import { useReferrer } from '@/hooks/useReferrer';
import { buildSdkUrl, trackSdkClick } from '@/lib/sdk-url';
import HighlightText from '@/components/ui/HighlightText';

// SDK Ambulant-Tarifstufen (AP5 bis AP1): je höher der Erstattungssatz,
// desto höher Budget und Beitrag. Beiträge sind altersabhängig; als Beispiel
// ist nur der verifizierte Beitrag für Ambulant 100 hinterlegt.
const TIERS = [
  { key: 'a50', name: 'Ambulant 50', erstattung: '50 %', budget: 1400 },
  { key: 'a70', name: 'Ambulant 70', erstattung: '70 %', budget: 2000 },
  { key: 'a90', name: 'Ambulant 90', erstattung: '90 %', budget: 2600 },
  { key: 'a100', name: 'Ambulant 100', erstattung: '100 %', budget: 3000, beispielBeitrag: 31.64, beispielBeitragKind: 20.76, empfohlen: true },
];

const AmbulantTarifTabelle = () => {
  const { t, i18n } = useTranslation('ambulant');
  const referrer = useReferrer();
  const sdkUrl = buildSdkUrl({ ref: referrer, tarifTypes: 'Ambulant' });
  const locale = (i18n.resolvedLanguage || i18n.language || '').startsWith('en') ? 'en-US' : 'de-DE';
  const formatEuro = (value) => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);

  return (
    <section id="tarif-tabelle" className="scroll-mt-24 bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-healio-dark mb-4">
            <HighlightText text={t('tarifTable.title')} />
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-medium">
            {t('tarifTable.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch">
          {TIERS.map((tier, index) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`relative flex flex-col rounded-2xl border-2 bg-white p-6 shadow-md ${
                tier.empfohlen ? 'border-healio-primary shadow-xl lg:scale-[1.03]' : 'border-gray-100'
              }`}
            >
              {tier.empfohlen && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-healio-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">
                  {t('tarifTable.recommended')}
                </span>
              )}
              <h3 className="text-xl font-extrabold text-healio-dark mb-4">{tier.name}</h3>
              <dl className="flex-1 space-y-4">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t('tarifTable.refundLabel')}</dt>
                  <dd className="text-2xl font-extrabold text-healio-dark">{tier.erstattung}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t('tarifTable.budgetLabel')}</dt>
                  <dd className="text-2xl font-extrabold text-healio-primary">{t('tarifTable.budgetValue', { budget: formatEuro(tier.budget) })}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t('tarifTable.priceLabel')}</dt>
                  {tier.beispielBeitrag ? (
                    <dd className="text-base font-bold text-healio-dark leading-snug">
                      {t('tarifTable.priceExample', { price: formatEuro(tier.beispielBeitrag) })}
                      <span className="block text-sm font-medium text-gray-500">
                        {t('tarifTable.priceExampleKids', { price: formatEuro(tier.beispielBeitragKind) })}
                      </span>
                    </dd>
                  ) : (
                    <dd className="text-sm font-medium text-gray-500 leading-snug">{t('tarifTable.priceOnRequest')}</dd>
                  )}
                </div>
              </dl>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-healio-dark">
                <Check className="h-4 w-4 flex-shrink-0 text-healio-primary" />
                {t('tarifTable.noWait')}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={sdkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSdkClick('tarif-tabelle', referrer)}
            className="inline-flex items-center justify-center rounded-lg bg-healio-primary px-8 py-4 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Calculator className="mr-2 h-5 w-5" />
            {t('tarifTable.cta')}
          </a>
          <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-gray-400">
            {t('tarifTable.footnote')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AmbulantTarifTabelle;
