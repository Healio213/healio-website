
import React, { Suspense, lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, Clock, ArrowRight, CheckCircle, HelpCircle, FileText, Stethoscope, CalendarCheck, Wallet } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import { IKK_LINK } from '@/lib/sdk-url';

const IkkSwitch3DScene = lazy(() => import('@/components/sections/ambulant/IkkSwitch3DScene'));

const fearKeys = ['leistungen', 'arzt', 'kompliziert', 'luecke', 'behandlungen'];
const reassuranceKeys = ['system', 'doctors', 'coverage', 'oldFund'];

const extraDefs = [
  { key: 'schwangerschaft', emoji: "🤰" },
  { key: 'osteopathie', emoji: "🦴" },
  { key: 'bonus', emoji: "🎁" },
  { key: 'spartarif', emoji: "💰" },
  { key: 'reiseimpfungen', emoji: "✈️" },
  { key: 'gesundheitskurse', emoji: "🧘" },
  { key: 'bonusantrag', emoji: "📅" },
];

const switchStepIcons = [Clock, ArrowRight, Shield];
const switchStepKeys = ['step1', 'step2', 'step3'];
const timelineStepIcons = [FileText, Stethoscope, CalendarCheck, Wallet];
const timelineStepKeys = ['sdk', 'treatment', 'ikkStart', 'bonus'];

const AmbulantIKKWechsel = () => {
  const { t } = useTranslation('ambulant');
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileTimelineOpen, setMobileTimelineOpen] = useState(false);

  const identicalItems = t('ikkWechsel.identicalItems', { returnObjects: true });

  return (
    <section id="ikk-wechsel" className="scroll-mt-24 py-12 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            {t('ikkWechsel.badge')}
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4">
            <HighlightText text={t('ikkWechsel.title')} />
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            <HighlightText text={t('ikkWechsel.subtitle')} />
          </p>
        </div>

        {/* Psychologische Brücke: Wechselangst abbauen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-950 text-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-10 mb-12 overflow-hidden relative"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-500/20 to-transparent pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <Suspense fallback={<div className="h-[420px] sm:h-[520px] lg:h-[560px] rounded-2xl border border-white/10 bg-white/[0.04]" />}>
              <IkkSwitch3DScene />
            </Suspense>

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300 mb-3">
                  {t('ikkWechsel.reassuranceKicker')}
                </p>
                <h3 className="text-2xl md:text-4xl font-extrabold leading-tight mb-4">
                  {t('ikkWechsel.reassuranceTitle')}
                </h3>
                <p className="text-white/75 text-lg leading-relaxed mb-6">
                  {t('ikkWechsel.reassuranceText')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={IKK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-lg shadow-lg shadow-emerald-900/30 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {t('ikkWechsel.ctaBonus')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="#wechselstrecke"
                    className="inline-flex items-center justify-center border border-white/25 hover:border-emerald-300 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    {t('ikkWechsel.ctaTimeline')}
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {reassuranceKeys.map((key) => (
                  <div key={key} className="bg-white/8 border border-white/10 rounded-xl p-4 flex gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white mb-1">{t(`ikkWechsel.reassuranceItems.${key}.title`)}</h4>
                      <p className="text-sm text-white/65 leading-relaxed">{t(`ikkWechsel.reassuranceItems.${key}.desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

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
        <details className="group mb-12 rounded-2xl border border-emerald-100 bg-white shadow-lg md:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 [&::-webkit-details-marker]:hidden">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {t('ikkWechsel.extrasTitle')}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-500">
                {t('ikkWechsel.extrasSubtitle')}
              </p>
            </div>
            <ChevronDown className="h-6 w-6 flex-shrink-0 text-emerald-500 transition-transform group-open:rotate-180" />
          </summary>
          <div className="grid gap-3 px-5 pb-5">
            {extraDefs.map((extra) => (
              <div
                key={extra.key}
                className="rounded-xl border border-gray-100 bg-emerald-50/30 p-4"
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-2xl">{extra.emoji}</span>
                  <h4 className="font-bold text-gray-900">{t(`ikkWechsel.extras.${extra.key}.title`)}</h4>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{t(`ikkWechsel.extras.${extra.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </details>

        <div className="mb-12 hidden md:block">
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

        {/* Konkrete Wechselstrecke */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="wechselstrecke"
          className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-5 md:p-8 mb-12 overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setMobileTimelineOpen((value) => !value)}
            className="flex w-full items-center justify-between gap-4 text-left md:hidden"
          >
            <div>
              <h3 className="text-xl font-extrabold text-gray-900">
                {t('ikkWechsel.timelineTitle')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {t('ikkWechsel.timelineSubtitle')}
              </p>
            </div>
            <ChevronDown className={`h-6 w-6 flex-shrink-0 text-emerald-500 transition-transform ${mobileTimelineOpen ? 'rotate-180' : ''}`} />
          </button>

          <div className="hidden text-center max-w-3xl mx-auto mb-10 md:block">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              {t('ikkWechsel.timelineTitle')}
            </h3>
            <p className="text-gray-600">
              {t('ikkWechsel.timelineSubtitle')}
            </p>
          </div>

          <div className={`${mobileTimelineOpen ? 'block' : 'hidden'} md:block`}>
            <div className="relative mt-6 md:mt-0">
              <div className="hidden lg:block absolute top-10 left-[8%] right-[8%] h-1 bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 rounded-full" />
              <div className="grid gap-4 lg:grid-cols-4 lg:gap-5 relative z-10">
                {timelineStepKeys.map((key, idx) => {
                  const Icon = timelineStepIcons[idx];
                  return (
                    <div
                      key={key}
                      className="bg-gradient-to-b from-white to-emerald-50/60 border border-emerald-100 rounded-xl p-4 md:p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-3 md:mb-4 lg:flex-col lg:items-start">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20 ring-8 ring-white">
                          <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                          {t(`ikkWechsel.timelineSteps.${key}.label`)}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base md:text-lg mb-2">
                        {t(`ikkWechsel.timelineSteps.${key}.title`)}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {t(`ikkWechsel.timelineSteps.${key}.desc`)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 md:mt-8 grid md:grid-cols-[1.4fr_0.8fr] gap-4 md:gap-5 items-stretch">
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 md:p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700 mb-2">
                  {t('ikkWechsel.timelineFinanceLabel')}
                </p>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {t('ikkWechsel.timelineFinanceTitle')}
                </h4>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {t('ikkWechsel.timelineFinanceDesc')}
                </p>
              </div>
              <div className="bg-emerald-600 text-white rounded-xl p-5 md:p-6 flex flex-col justify-center">
                <div className="text-3xl md:text-4xl font-black mb-2">
                  {t('ikkWechsel.timelineBridgeValue')}
                </div>
                <p className="text-white/90 font-medium">
                  {t('ikkWechsel.timelineBridgeLabel')}
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed mt-5">
              {t('ikkWechsel.timelineNote')}
            </p>
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
