
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Wallet } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const CATEGORY_KEYS = [
  { key: 'heilpraktiker', emoji: '🌿', tone: 'butter' },
  { key: 'sehhilfen', emoji: '👓', tone: 'sky' },
  { key: 'vorsorge', emoji: '🩺', tone: 'mint' },
  { key: 'arzneimittel', emoji: '💊', tone: 'lavender' },
  { key: 'schwangerschaft', emoji: '🤰', tone: 'coral' },
];

const SourceBadge = ({ source }) => {
  if (source === 'ikk') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-sky-100 text-sky-700 border border-sky-200">
        IKK classic
      </span>
    );
  }
  if (source === 'sdk') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700 border border-emerald-200">
        SDK Zusatzvers.
      </span>
    );
  }
  if (source === 'both') {
    return (
      <span className="inline-flex items-center gap-1 flex-wrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-sky-100 text-sky-700 border border-sky-200">
          IKK classic
        </span>
        <span className="text-gray-300 text-[10px]">+</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-emerald-100 text-emerald-700 border border-emerald-200">
          SDK
        </span>
      </span>
    );
  }
  return null;
};

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
        <FriendlyIcon
          emoji={benefit.emoji}
          label={t(`benefits.${benefit.key}.title`)}
          tone={benefit.tone}
          size="lg"
          className="mb-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2"
        />
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
              {/* Legende */}
              <div className="flex flex-wrap gap-3 mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-[11px] text-gray-500 font-medium">SDK Zusatzversicherung</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  <span className="text-[11px] text-gray-500 font-medium">IKK classic Leistung</span>
                </div>
              </div>

              <ul className="space-y-3">
                {detailsList.map((detail, i) => (
                  <li key={i} className={`flex items-start gap-3 rounded-lg p-2.5 -mx-1 ${
                    detail.source === 'ikk' ? 'bg-sky-50/60' :
                    detail.source === 'both' ? 'bg-gradient-to-r from-sky-50/40 to-emerald-50/40' :
                    'bg-emerald-50/40'
                  }`}>
                    <span className={`mt-0.5 flex-shrink-0 ${
                      detail.source === 'ikk' ? 'text-sky-500' : 'text-emerald-500'
                    }`}>✓</span>
                    <div className="text-left flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-900">{detail.name}</span>
                        {detail.amount && (
                          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                            {detail.amount}
                          </span>
                        )}
                        <SourceBadge source={detail.source} />
                      </div>
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
            <HighlightText text={t('benefits.title')} />
          </h2>
          <p className="text-gray-500 mt-4 text-lg">
            <HighlightText text={t('benefits.subtitle')} />
          </p>
          <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-3 text-emerald-950 shadow-sm">
            <Wallet className="h-5 w-5 text-emerald-600" aria-hidden="true" />
            <span className="text-xl font-black tracking-tight sm:text-2xl">
              {t('benefits.budgetBadgeValue')}
            </span>
            <span className="text-sm font-bold sm:text-base">
              {t('benefits.budgetBadgeLabel')}
            </span>
          </div>
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
