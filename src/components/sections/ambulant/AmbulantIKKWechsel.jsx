
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Clock, ArrowRight, CheckCircle, Heart, Leaf, HelpCircle } from 'lucide-react';

const fearKeys = ['leistungen', 'arzt', 'kompliziert', 'luecke', 'behandlungen'];

const extraDefs = [
  { key: 'schwangerschaft', emoji: "🤰" },
  { key: 'osteopathie', emoji: "🦴" },
  { key: 'bonus', emoji: "🎁" },
  { key: 'spartarif', emoji: "💰" },
  { key: 'reiseimpfungen', emoji: "✈️" },
  { key: 'gesundheitskurse', emoji: "🧘" },
  { key: 'bonusantrag', emoji: "📅" },
  { key: 'umwelt', emoji: "🌿" },
];

const switchStepIcons = [Clock, ArrowRight, Shield];
const switchStepKeys = ['step1', 'step2', 'step3'];

const AmbulantIKKWechsel = () => {
  const { t } = useTranslation('ambulant');
  const [openIndex, setOpenIndex] = useState(null);

  const identicalItems = t('ikkWechsel.identicalItems', { returnObjects: true });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            {t('ikkWechsel.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t('ikkWechsel.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('ikkWechsel.subtitle')}
          </p>
        </div>

        {/* 98% identisch Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border-2 border-emerald-200 p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
            <div className="text-5xl md:text-6xl font-black text-emerald-600 flex-shrink-0">{t('ikkWechsel.identicalPercent')}</div>
            <div>
              <p className="text-xl font-bold text-gray-900">{t('ikkWechsel.identicalTitle')}</p>
              <p className="text-gray-500">{t('ikkWechsel.identicalSubtitle')}</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.isArray(identicalItems) && identicalItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6">
            {t('ikkWechsel.identicalNote')}
          </p>
        </motion.div>

        {/* IKK Extras */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            {t('ikkWechsel.extrasTitle')}
          </h3>
          <p className="text-gray-500 text-center mb-8">{t('ikkWechsel.extrasSubtitle')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {extraDefs.map((extra, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-emerald-300 hover:shadow-lg transition-all"
              >
                <span className="text-3xl mb-3 block">{extra.emoji}</span>
                <h4 className="font-bold text-gray-900 text-lg mb-2">{t(`ikkWechsel.extras.${extra.key}.title`)}</h4>
                <p className="text-gray-600 text-sm">{t(`ikkWechsel.extras.${extra.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* So funktioniert der Wechsel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('ikkWechsel.switchTitle')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {switchStepKeys.map((key, idx) => {
              const Icon = switchStepIcons[idx];
              return (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div className="text-sm font-bold text-emerald-600 mb-1">Schritt {idx + 1}</div>
                  <h4 className="font-bold text-gray-900 mb-2">{t(`ikkWechsel.switchSteps.${key}.title`)}</h4>
                  <p className="text-gray-600 text-sm">{t(`ikkWechsel.switchSteps.${key}.desc`)}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Häufige Bedenken */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('ikkWechsel.fearsTitle')}
          </h3>
          <div className="space-y-3 max-w-3xl mx-auto">
            {fearKeys.map((key, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-900">{t(`ikkWechsel.fears.${key}.q`)}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-gray-600 pl-13 text-sm leading-relaxed">{t(`ikkWechsel.fears.${key}.a`)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AmbulantIKKWechsel;
