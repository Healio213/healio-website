import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Bed, UserCheck, Shield, HeartPulse } from 'lucide-react';

const cardIcons = [UserCheck, Bed, Shield, HeartPulse];
const cardKeys = ['privatsphaere', 'hotelStandard', 'chefarzt', 'kostendeckung'];

const UnterbringungSection = () => {
  const { t } = useTranslation('stationaer');

  return (
    <section className="py-24 bg-gray-50">
      <div className="healio-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-6">{t('klinikUpgrade.unterbringung.title')}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('klinikUpgrade.unterbringung.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cardKeys.map((key, index) => {
            const Icon = cardIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-[#1E3A5F] hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-[#1E3A5F]/10 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#1E3A5F]" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{t(`klinikUpgrade.unterbringung.${key}.title`)}</h3>
                <p className="text-gray-600 leading-relaxed">{t(`klinikUpgrade.unterbringung.${key}.desc`)}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UnterbringungSection;
