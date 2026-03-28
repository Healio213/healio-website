
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, Stethoscope, FileText, ShieldCheck, Sparkles, Shield, Smile, Star } from 'lucide-react';

const benefitIcons = [
  <Clock className="w-8 h-8" />,
  <Shield className="w-8 h-8" />,
  <Sparkles className="w-8 h-8" />,
  <Smile className="w-8 h-8" />,
  <Star className="w-8 h-8" />,
  <ShieldCheck className="w-8 h-8" />,
  <Stethoscope className="w-8 h-8" />,
  <FileText className="w-8 h-8" />,
];

const benefitKeys = ['noWait', 'zahnersatz', 'prophylaxe', 'bleaching', 'kfo', 'fehlend', 'unfall', 'gesundheitsfragen'];

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
          <h2 id="dental-benefits-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
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
              <div className="w-16 h-16 bg-[#25c990]/10 text-[#25c990] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                {benefitIcons[index]}
              </div>
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
