
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

// Sofortschutz, Zahnersatz, Prophylaxe, Behandlung, fehlende Zähne,
// ausgezeichnete Versicherer, faire Annahme
const benefitIcons = ['switch', 'dental', 'prevention', 'dental', 'dental', 'bonus', 'document'];
const benefitTones = ['butter', 'mint', 'lavender', 'sky', 'coral', 'mint', 'butter'];

const primaryBenefitKeys = ['noWait', 'zahnersatz', 'prophylaxe'];
const additionalBenefitKeys = ['bleaching', 'fehlend', 'unfall', 'gesundheitsfragen'];

const BenefitCard = ({ benefitKey, index, t }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-[#25c990]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
  >
    <FriendlyIcon
      kind={benefitIcons[index]}
      label={t(`benefits.${benefitKey}.title`)}
      tone={benefitTones[index]}
      className="mb-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2"
    />
    <h3 className="text-xl font-bold text-slate-900 mb-3">{t(`benefits.${benefitKey}.title`)}</h3>
    <p className="text-slate-600 leading-relaxed">{t(`benefits.${benefitKey}.desc`)}</p>
  </motion.article>
);

const DentalBenefits = () => {
  const { t } = useTranslation('zahn');

  return (
    <section className="py-24 bg-white" aria-labelledby="dental-benefits-heading" id="leistungen">
      <div className="healio-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 id="dental-benefits-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight break-words hyphens-auto">
            {t('benefits.title')}
          </h2>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {primaryBenefitKeys.map((key, index) => (
            <BenefitCard key={key} benefitKey={key} index={index} t={t} />
          ))}
        </div>

        <details className="group mx-auto mt-8 max-w-7xl rounded-2xl border border-slate-200 bg-white">
          <summary className="mx-auto flex min-h-11 cursor-pointer list-none items-center justify-center gap-2 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-healio-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">{t('benefits.moreShow')}</span>
            <span className="hidden group-open:inline">{t('benefits.moreHide')}</span>
            <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="grid gap-6 border-t border-slate-200 p-5 sm:grid-cols-2 md:p-6 lg:grid-cols-4">
            {additionalBenefitKeys.map((key, offset) => (
              <BenefitCard key={key} benefitKey={key} index={primaryBenefitKeys.length + offset} t={t} />
            ))}
          </div>
        </details>
      </div>
    </section>
  );
};

export default DentalBenefits;
