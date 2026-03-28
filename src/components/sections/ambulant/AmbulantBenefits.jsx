
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CATEGORY_KEYS = [
  { key: 'heilpraktiker', emoji: "🌿", bgColor: "bg-amber-50" },
  { key: 'sehhilfen', emoji: "👓", bgColor: "bg-blue-50" },
  { key: 'vorsorge', emoji: "🩺", bgColor: "bg-teal-50" },
  { key: 'arzneimittel', emoji: "💊", bgColor: "bg-green-50" },
  { key: 'schwangerschaft', emoji: "🤰", bgColor: "bg-pink-50" },
];

const BenefitCard = ({ benefit, index, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  const details = t(`benefits.${benefit.key}.details`, { returnObjects: true });
  const detailsList = details && typeof details === 'object' ? Object.values(details) : [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white border-2 border-gray-100 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-200 hover:border-[#10b981] transition-all duration-300 flex flex-col"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex flex-col items-center text-center cursor-pointer"
      >
        <div className={`${benefit.bgColor} rounded-full p-5 w-fit mb-4`}>
          <span className="text-4xl" role="img" aria-label={t(`benefits.${benefit.key}.title`)}>
            {benefit.emoji}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{t(`benefits.${benefit.key}.title`)}</h3>
        <p className="text-gray-600 text-sm mb-3">{t(`benefits.${benefit.key}.desc`)}</p>
        <p className="text-[#10b981] font-semibold text-sm mb-3">{t(`benefits.${benefit.key}.budget`)}</p>
        <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
          <span>{isOpen ? t('benefits.showLess') : t('benefits.showDetails')}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-gray-100 pt-4">
              <ul className="space-y-3">
                {detailsList.map((detail, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#10b981] mt-0.5 flex-shrink-0">✓</span>
                    <div className="text-left">
                      <span className="text-sm font-semibold text-gray-900">{detail.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{detail.info}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {t(`benefits.${benefit.key}.hint`, { defaultValue: '' }) && (
                <p className="mt-4 text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2 text-left">
                  {t(`benefits.${benefit.key}.hint`)}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AmbulantBenefits = () => {
  const { t } = useTranslation('ambulant');

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            {t('benefits.title')}
          </h2>
          <p className="text-gray-500 mt-4 text-lg">{t('benefits.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_KEYS.map((benefit, index) => (
            <BenefitCard key={benefit.key} benefit={benefit} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbulantBenefits;
