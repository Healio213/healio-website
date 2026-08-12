
import React, { Suspense, lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Shield, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import HighlightText from '@/components/ui/HighlightText';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { IKK_LINK } from '@/lib/sdk-url';

const IkkSwitch3DScene = lazy(() => import('@/components/sections/ambulant/IkkSwitch3DScene'));

const fearKeys = ['leistungen', 'arzt', 'kompliziert', 'luecke', 'behandlungen'];
const reassuranceKeys = ['system', 'doctors', 'coverage', 'oldFund', 'ongoingTreatments'];

const extraDefs = [
  { key: 'schwangerschaft', emoji: "🤰" },
  { key: 'osteopathie', emoji: "🦴" },
  { key: 'bonus', emoji: "🎁" },
  { key: 'spartarif', emoji: "💰" },
  { key: 'reiseimpfungen', emoji: "✈️" },
  { key: 'gesundheitskurse', emoji: "🧘" },
  { key: 'bonusantrag', emoji: "📅" },
];

const switchStepIcons = [
  { emoji: '📝', tone: 'butter' },
  { emoji: '🤝', tone: 'mint' },
  { emoji: '🛡️', tone: 'sky' },
];
const switchStepKeys = ['step1', 'step2', 'step3'];
const timelineStepKeys = ['product', 'switch', 'ikkStart', 'bonus'];

const timelineIcons = {
  ambulant: { emoji: '🩺', tone: 'mint' },
  zahn: { emoji: '🦷', tone: 'sky' },
  stationaer: { emoji: '🏥', tone: 'lavender' },
  switch: { emoji: '🔄', tone: 'sky' },
  ikkStart: { emoji: '🗓️', tone: 'mint' },
  bonus: { emoji: '🎁', tone: 'butter' },
};

const AmbulantIKKWechsel = ({ variant = 'ambulant' }) => {
  const { t } = useTranslation('ambulant');
  const [openIndex, setOpenIndex] = useState(null);
  const [mobileTimelineOpen, setMobileTimelineOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const activeVariant = ['ambulant', 'zahn', 'stationaer'].includes(variant) ? variant : 'ambulant';

  const identicalItems = t('ikkWechsel.identicalItems', { returnObjects: true });
  const timelineText = (key, field) => (
    key === 'product'
      ? t(`ikkWechsel.threeD.variants.${activeVariant}.timeline.${field}`)
      : t(`ikkWechsel.timelineSteps.${key}.${field}`)
  );

  return (
    <section id="ikk-wechsel" className="scroll-mt-24 py-12 md:py-20 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
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

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={IKK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#55bd8b] px-6 py-3 font-bold text-white shadow-[0_12px_26px_rgba(69,158,116,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#48aa7c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {t('ikkWechsel.ctaBonus')}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setDetailsOpen((value) => !value)}
              aria-expanded={detailsOpen}
              aria-controls="ikk-wechsel-details"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 py-3 font-bold text-slate-800 transition-colors hover:border-emerald-400 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {detailsOpen ? t('ikkWechsel.detailsHide') : t('ikkWechsel.detailsShow')}
              <ChevronDown
                className={`ml-2 h-5 w-5 transition-transform ${detailsOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div
          id="ikk-wechsel-details"
          className={detailsOpen ? 'block' : 'hidden'}
          aria-hidden={!detailsOpen}
        >
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 overflow-hidden rounded-[2rem] border border-[#d8d3ec] bg-[linear-gradient(135deg,#f6f2ff_0%,#fffbe8_48%,#edf9f4_100%)] shadow-[0_24px_70px_rgba(49,42,84,0.10)] md:rounded-[2.75rem]"
        >
          <div className="grid items-center gap-4 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="p-7 sm:p-10 lg:py-12 lg:pl-12 lg:pr-4">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-violet-700">
                {t('ikkWechsel.advantagesEyebrow')}
              </p>
              <h3 className="mt-4 max-w-[14ch] font-display text-3xl font-extrabold leading-tight tracking-[-0.035em] text-[#1b1637] sm:text-4xl">
                {t('ikkWechsel.advantagesTitle')}
              </h3>
              <ul className="mt-7 space-y-4">
                {t('ikkWechsel.advantagesItems', { returnObjects: true }).map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base font-semibold leading-7 text-[#4d5274]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/80 text-violet-700 shadow-sm ring-1 ring-violet-200">
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative min-h-[280px] self-stretch sm:min-h-[360px] lg:min-h-[430px]">
              <img
                src="/images/healio-vorteile-illustration-v1.webp"
                alt={t('ikkWechsel.advantagesImageAlt')}
                width="1448"
                height="1086"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center mix-blend-multiply"
              />
            </div>
          </div>
        </motion.article>

        {/* Psychologische Brücke: Wechselangst abbauen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-12 overflow-hidden rounded-[2rem] border border-[#d9d3eb] bg-[linear-gradient(145deg,#fbf9ff_0%,#fffdf3_48%,#edf9f3_100%)] p-4 text-[#211a3e] shadow-[0_26px_75px_rgba(69,53,108,0.12)] sm:p-6 md:rounded-[2.75rem] md:p-10"
        >
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-200/30 to-transparent" />
          <div className="relative z-10 space-y-8">
            {detailsOpen && (
              <Suspense fallback={<div className="h-[420px] rounded-[1.65rem] border border-[#ddd6ef] bg-white/55 sm:h-[520px] sm:rounded-[2rem] lg:h-[560px]" />}>
                <IkkSwitch3DScene variant={activeVariant} />
              </Suspense>
            )}

            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-start">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-violet-700">
                  {t('ikkWechsel.reassuranceKicker')}
                </p>
                <h3 className="mb-4 text-2xl font-extrabold leading-tight text-[#211a3e] md:text-4xl">
                  {t('ikkWechsel.reassuranceTitle')}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-[#5d5b76]">
                  {t('ikkWechsel.reassuranceText')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={IKK_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-[#55bd8b] px-6 py-3 font-bold text-white shadow-[0_12px_26px_rgba(69,158,116,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#48aa7c]"
                  >
                    {t('ikkWechsel.ctaBonus')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="#wechselstrecke"
                    className="inline-flex items-center justify-center rounded-xl border border-[#bdb2df] bg-white/55 px-6 py-3 font-semibold text-[#4e426f] transition-colors hover:border-violet-400 hover:bg-white/80"
                  >
                    {t('ikkWechsel.ctaTimeline')}
                  </a>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {reassuranceKeys.map((key) => (
                  <div key={key} className="flex gap-3 rounded-2xl border border-white/90 bg-white/65 p-4 shadow-[0_10px_28px_rgba(74,58,110,0.07)] backdrop-blur-sm">
                    <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-[#ece6ff] text-violet-700 ring-1 ring-[#d5caef]">
                      <CheckCircle className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="mb-1 font-bold text-[#2e274d]">{t(`ikkWechsel.reassuranceItems.${key}.title`)}</h4>
                      <p className="text-sm leading-relaxed text-[#66647d]">{t(`ikkWechsel.reassuranceItems.${key}.desc`)}</p>
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

        {/* IKK Extras: auf allen Viewports eingeklappt (Frank 06.08.),
            der Rechner belegt den Bonus bereits konkret in Euro */}
        <details className="group mb-12 rounded-2xl border border-emerald-100 bg-white shadow-lg">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 md:px-6 md:py-6 [&::-webkit-details-marker]:hidden">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                {t('ikkWechsel.extrasTitle')}
              </h3>
              <p className="mt-1 text-sm md:text-base leading-relaxed text-gray-500">
                {t('ikkWechsel.extrasSubtitle')}
              </p>
            </div>
            <ChevronDown className="h-6 w-6 flex-shrink-0 text-emerald-500 transition-transform group-open:rotate-180" />
          </summary>
          <div className="grid gap-3 px-5 pb-5 md:grid-cols-2 lg:grid-cols-3 md:gap-4 md:px-6 md:pb-6">
            {extraDefs.map((extra) => (
              <div
                key={extra.key}
                className="rounded-xl border border-gray-100 bg-emerald-50/30 p-4 md:p-5"
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
              const icon = switchStepIcons[idx];
              return (
                <div key={idx} className="text-center">
                  <FriendlyIcon
                    emoji={icon.emoji}
                    tone={icon.tone}
                    size="md"
                    className="mx-auto mb-4"
                  />
                  <div className="text-sm font-bold text-emerald-600 mb-1">
                    {t('ikkWechsel.stepLabel', { number: idx + 1 })}
                  </div>
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
                  const icon = key === 'product' ? timelineIcons[activeVariant] : timelineIcons[key];
                  return (
                    <div
                      key={key}
                      className="bg-gradient-to-b from-white to-emerald-50/60 border border-emerald-100 rounded-xl p-4 md:p-5 shadow-sm"
                    >
                      <div className="flex items-center gap-3 mb-3 md:mb-4 lg:flex-col lg:items-start">
                        <FriendlyIcon emoji={icon.emoji} tone={icon.tone} size="sm" />
                        <div className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
                          {timelineText(key, 'label')}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base md:text-lg mb-2">
                        {timelineText(key, 'title')}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {timelineText(key, 'desc')}
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

      </div>
    </section>
  );
};

export default AmbulantIKKWechsel;
