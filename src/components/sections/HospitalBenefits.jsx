
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Building2, User, Clock, Wallet, Globe, Baby, Coffee, MapPin } from 'lucide-react';

const mainBenefitKeys = ['spitzenversorgung', 'privatsphaere', 'wartezeiten', 'familienfreundlich'];

const featureKeys = ['einbettzimmer', 'chefarzt', 'klinikwahl', 'keineWartezeit', 'tagegeld', 'ambulanteOps', 'familienzimmer', 'vorNachStationaer'];

const featureIcons = [
  <Building2 className="w-8 h-8" />,
  <User className="w-8 h-8" />,
  <MapPin className="w-8 h-8" />,
  <Clock className="w-8 h-8" />,
  <Wallet className="w-8 h-8" />,
  <Globe className="w-8 h-8" />,
  <Baby className="w-8 h-8" />,
  <Coffee className="w-8 h-8" />,
];

const HospitalBenefits = () => {
  const { t } = useTranslation('stationaer');

  return (
    <section className="py-24 bg-white" aria-labelledby="hospital-benefits-heading" id="leistungen">
      <div className="healio-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 id="hospital-benefits-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {t('benefits.title')}
          </h2>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {mainBenefitKeys.map((key, idx) => (
              <article key={key} className="bg-[#25c990]/5 p-6 rounded-xl border border-[#25c990]/20 flex flex-col justify-center text-left">
                <h4 className="text-xl font-bold text-slate-900 mb-2">{t(`benefits.mainBenefits.${key}.title`)}</h4>
                <p className="text-slate-600">{t(`benefits.mainBenefits.${key}.desc`)}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {featureKeys.map((key, index) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-[#25c990]/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-[#25c990]/10 text-[#25c990] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                {featureIcons[index]}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{t(`benefits.features.${key}.title`)}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t(`benefits.features.${key}.desc`)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalBenefits;
