
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle, ChevronDown } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';

const AmbulantBeispielrechnung = () => {
  const { t } = useTranslation('ambulant');
  const [mobileOpen, setMobileOpen] = useState(false);

  const bonusItems = [
    { labelKey: 'beispielrechnung.grippeimpfung', amount: "15 €" },
    { labelKey: 'beispielrechnung.zahnvorsorge', amount: "30 €" },
    { labelKey: 'beispielrechnung.checkup', amount: "30 €" },
    { labelKey: 'beispielrechnung.krebsvorsorge', amount: "30 €" },
    { labelKey: 'beispielrechnung.fitnessstudio', amount: "75 €" },
    { labelKey: 'beispielrechnung.bmi', amount: "75 €" },
    { labelKey: 'beispielrechnung.blutdruck', amount: "75 €" },
    { labelKey: 'beispielrechnung.hautkrebs', amount: "30 €" },
    { labelKey: 'beispielrechnung.gesundheitskurs', amount: "75 €" },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="mb-6 flex w-full items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-white p-5 text-left shadow-lg md:hidden"
        >
          <h2 className="text-2xl font-extrabold leading-tight text-gray-900">
            <HighlightText text={t('beispielrechnung.title')} />
          </h2>
          <ChevronDown className={`h-6 w-6 flex-shrink-0 text-emerald-500 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className="hidden text-center mb-12 md:block">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            <HighlightText text={t('beispielrechnung.title')} />
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`${mobileOpen ? 'block' : 'hidden'} md:block bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-[#10b981] rounded-2xl p-5 md:p-10 shadow-lg`}
        >
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Calculator className="w-7 h-7 md:w-8 md:h-8 text-[#10b981]" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t('beispielrechnung.example')}</h3>
          </div>

          {/* SDK Beitrag */}
          <div className="space-y-4 text-lg mb-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-green-200">
              <span className="text-gray-700 font-medium">{t('beispielrechnung.sdkTariff')}</span>
              <span className="text-gray-900 font-bold">{t('beispielrechnung.sdkTariffValue')}</span>
            </div>
          </div>

          {/* IKK Bonus Aufschlüsselung */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-gray-900 mb-4">{t('beispielrechnung.ikkBonusTitle')}</h4>
            <div className="space-y-3 ml-4">
              {bonusItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-3 text-gray-700">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    {t(item.labelKey)}
                  </span>
                  <span className="font-semibold">{item.amount}</span>
                </div>
              ))}
              <div className="flex justify-between items-center gap-3 pt-3 border-t border-green-300 font-bold text-gray-900">
                <span>{t('beispielrechnung.bonusTotal')}</span>
                <span className="text-[#10b981]">{t('beispielrechnung.bonusTotalValue')}</span>
              </div>
            </div>
          </div>

          {/* Ergebnis */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center mb-2">
              <span className="text-xl font-bold text-gray-900">{t('beispielrechnung.resultTitle')}</span>
              <span className="text-xl font-extrabold text-[#10b981]">{t('beispielrechnung.resultValue')}</span>
            </div>
            <p className="text-left sm:text-right text-lg font-bold text-[#10b981] mb-4">
              {t('beispielrechnung.resultMonthly')}
            </p>
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
