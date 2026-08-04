
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const benefitIcons = ['⏱️', '🦷', '✨', '😁', '🧩', '🛡️', '📋'];
const benefitTones = ['butter', 'mint', 'lavender', 'sky', 'coral', 'mint', 'butter'];

const benefitKeys = ['noWait', 'zahnersatz', 'prophylaxe', 'bleaching', 'fehlend', 'unfall', 'gesundheitsfragen'];

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

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {benefitKeys.map((key, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-[#25c990]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              <FriendlyIcon
                emoji={benefitIcons[index]}
                label={t(`benefits.${key}.title`)}
                tone={benefitTones[index]}
                className="mb-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-3">{t(`benefits.${key}.title`)}</h3>
              <p className="text-slate-600 leading-relaxed">{t(`benefits.${key}.desc`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DentalBenefits;
