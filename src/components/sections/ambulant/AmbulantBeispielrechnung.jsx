
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle } from 'lucide-react';

const AmbulantBeispielrechnung = () => {
  const { t } = useTranslation('ambulant');

  const bonusItems = [
    { labelKey: 'beispielrechnung.grippeimpfung', amount: "30 €" },
    { labelKey: 'beispielrechnung.zahnvorsorge', amount: "60 €" },
    { labelKey: 'beispielrechnung.checkup', amount: "75 €" },
    { labelKey: 'beispielrechnung.krebsvorsorge', amount: "75 €" },
    { labelKey: 'beispielrechnung.fitnessstudio', amount: "75 €" },
    { labelKey: 'beispielrechnung.bmi', amount: "75 €" },
    { labelKey: 'beispielrechnung.blutdruck', amount: "75 €" },
    { labelKey: 'beispielrechnung.zahnreinigung', amount: "40 €" },
    { labelKey: 'beispielrechnung.gesundheitskurs', amount: "75 €" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            {t('beispielrechnung.title')}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[#10b981] rounded-2xl p-8 md:p-10 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-8">
            <Calculator className="w-8 h-8 text-[#10b981]" />
            <h3 className="text-2xl font-bold text-gray-900">{t('beispielrechnung.example')}</h3>
          </div>

          {/* SDK Beitrag */}
          <div className="space-y-4 text-lg mb-8">
            <div className="flex justify-between items-center pb-3 border-b border-green-200">
              <span className="text-gray-700 font-medium">{t('beispielrechnung.sdkTariff')}</span>
              <span className="text-gray-900 font-bold">{t('beispielrechnung.sdkTariffValue')}</span>
            </div>
          </div>

          {/* IKK Bonus Aufschlüsselung */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">{t('beispielrechnung.ikkBonusTitle')}</h4>
            <div className="space-y-3 ml-4">
              {bonusItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-gray-700">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    {t(item.labelKey)}
                  </span>
                  <span className="font-semibold">{item.amount}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 border-t border-green-300 font-bold text-gray-900">
                <span>{t('beispielrechnung.bonusTotal')}</span>
                <span className="text-[#10b981]">{t('beispielrechnung.bonusTotalValue')}</span>
              </div>
            </div>
          </div>

          {/* Ergebnis */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-gray-900">{t('beispielrechnung.resultTitle')}</span>
              <span className="text-xl font-extrabold text-[#10b981]">{t('beispielrechnung.resultValue')}</span>
            </div>
            <p className="text-gray-600 text-base leading-relaxed">
              {t('beispielrechnung.resultDesc')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmbulantBeispielrechnung;
