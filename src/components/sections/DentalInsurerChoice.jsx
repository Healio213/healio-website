import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, ExternalLink, Calculator, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { BAYERISCHE_URL, UKV_URL, LKH_URLS, trackZahnEvent } from './dental/dentalLinks';

const trackInsurerClick = (insurer) => trackZahnEvent('zahnzusatz_versicherer_click', insurer);

const DentalInsurerChoice = () => {
  const { t } = useTranslation('zahn');

  const sofortBullets = t('insurerChoice.sofort.bullets', { returnObjects: true }) || [];
  const vorsorgeBullets = t('insurerChoice.vorsorge.bullets', { returnObjects: true }) || [];
  const preisBullets = t('insurerChoice.preis.bullets', { returnObjects: true }) || [];
  const finderItems = t('insurerChoice.finder.items', { returnObjects: true }) || [];

  const scrollToBonusCalculator = (e) => {
    e.preventDefault();
    const element = document.getElementById('bonus-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tarif-weiche" className="healio-section bg-white py-20" aria-labelledby="dental-insurer-choice-heading">
      <div className="healio-container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-sm mb-6">
              {t('insurerChoice.badge')}
            </span>
            <h2 id="dental-insurer-choice-heading" className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              {t('insurerChoice.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('insurerChoice.intro')}
            </p>
          </motion.div>

          {/* Entscheidungsfrage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900 text-white rounded-2xl px-6 py-5 md:px-10 md:py-6 text-center mb-10 shadow-lg"
          >
            <p className="text-lg md:text-xl font-bold">{t('insurerChoice.question')}</p>
          </motion.div>

          {/* Drei Wege */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Weg A: Bayerische ZAHN Sofort */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 ring-2 ring-healio-primary flex flex-col relative"
            >
              <div className="absolute -top-3 left-1/2 w-max max-w-[calc(100%-1rem)] -translate-x-1/2 rounded-full bg-healio-primary px-4 py-1 text-center text-xs font-bold leading-tight text-white">
                {t('insurerChoice.sofort.answer')}
              </div>
              <div className="flex items-center gap-3 mt-3 mb-4">
                <FriendlyIcon icon="ongoing-service" tone="mint" size="sm" />
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{t('insurerChoice.sofort.label')}</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {t('insurerChoice.sofort.insurer')} · {t('insurerChoice.sofort.tariff')}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{t('insurerChoice.sofort.text')}</p>
              <details className="group mb-8 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">{t('insurerChoice.details.show')}</span>
                  <span className="hidden group-open:inline">{t('insurerChoice.details.hide')}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-healio-primary transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-emerald-200 px-4 pb-4 pt-4">
                  <ul className="space-y-3">
                    {sofortBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-emerald-950">
                        <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-emerald-50 p-4 sm:p-5">
                    <span className="inline-block bg-[#25c990] text-white text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1 mb-2">
                      {t('insurerChoice.sofort.highlight.badge')}
                    </span>
                    <p className="font-extrabold text-emerald-950 mb-1">{t('insurerChoice.sofort.highlight.title')}</p>
                    <p className="text-sm text-emerald-950 leading-relaxed">{t('insurerChoice.sofort.highlight.text')}</p>
                  </div>
                </div>
              </details>
              <div className="mt-auto">
                <Button asChild className="w-full bg-[#25c990] hover:bg-[#1db37f] text-white text-base px-6 py-6 h-auto rounded-xl shadow-[0_4px_14px_rgba(37,201,144,0.4)] transition-all duration-300">
                  <a
                    href={BAYERISCHE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInsurerClick('bayerische_zahn_sofort')}
                  >
                    {t('insurerChoice.sofort.cta')}
                    <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  </a>
                </Button>
                <p className="text-xs text-slate-400 mt-3 text-center">{t('insurerChoice.sofort.note')}</p>
              </div>
            </motion.div>

            {/* Weg B: UKV ZahnPRIVAT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 ring-1 ring-slate-200 flex flex-col relative"
            >
              <div className="absolute -top-3 left-1/2 w-max max-w-[calc(100%-1rem)] -translate-x-1/2 rounded-full bg-slate-700 px-4 py-1 text-center text-xs font-bold leading-tight text-white">
                {t('insurerChoice.vorsorge.answer')}
              </div>
              <div className="flex items-center gap-3 mt-3 mb-4">
                <FriendlyIcon icon="dental-protection" tone="sky" size="sm" />
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{t('insurerChoice.vorsorge.label')}</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {t('insurerChoice.vorsorge.insurer')} · {t('insurerChoice.vorsorge.tariff')}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{t('insurerChoice.vorsorge.text')}</p>
              <details className="group mb-8 rounded-xl border border-blue-200 bg-blue-50/50">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-blue-950 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">{t('insurerChoice.details.show')}</span>
                  <span className="hidden group-open:inline">{t('insurerChoice.details.hide')}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-blue-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-blue-200 px-4 pb-4 pt-4">
                  <ul className="space-y-3">
                    {vorsorgeBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-blue-950">
                        <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-blue-50 p-4 sm:p-5">
                    <span className="inline-block bg-blue-500 text-white text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1 mb-2">
                      {t('insurerChoice.vorsorge.highlight.badge')}
                    </span>
                    <p className="font-extrabold text-blue-950 mb-1">{t('insurerChoice.vorsorge.highlight.title')}</p>
                    <p className="text-sm text-blue-950 leading-relaxed">{t('insurerChoice.vorsorge.highlight.text')}</p>
                  </div>
                </div>
              </details>
              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full border-2 border-slate-300 hover:border-healio-primary hover:text-healio-primary text-slate-900 text-base px-6 py-6 h-auto rounded-xl transition-all duration-300">
                  <a
                    href={UKV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInsurerClick('ukv_zahnprivat')}
                  >
                    {t('insurerChoice.vorsorge.cta')}
                    <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  </a>
                </Button>
                <p className="text-xs text-slate-400 mt-3 text-center">{t('insurerChoice.vorsorge.note')}</p>
              </div>
            </motion.div>

            {/* Weg C: LKH ZahnUpgrade 90+ (Preis-Leistung) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 ring-1 ring-slate-200 flex flex-col relative md:col-span-2 lg:col-span-1"
            >
              <div className="absolute -top-3 left-1/2 w-max max-w-[calc(100%-1rem)] -translate-x-1/2 rounded-full bg-teal-700 px-4 py-1 text-center text-xs font-bold leading-tight text-white">
                {t('insurerChoice.preis.answer')}
              </div>
              <div className="flex items-center gap-3 mt-3 mb-4">
                <FriendlyIcon icon="health-budget" tone="mint" size="sm" />
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{t('insurerChoice.preis.label')}</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {t('insurerChoice.preis.insurer')} · {t('insurerChoice.preis.tariff')}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{t('insurerChoice.preis.text')}</p>
              <details className="group mb-8 rounded-xl border border-teal-200 bg-teal-50/50">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold text-teal-950 transition-colors hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">{t('insurerChoice.details.show')}</span>
                  <span className="hidden group-open:inline">{t('insurerChoice.details.hide')}</span>
                  <ChevronDown className="h-5 w-5 flex-shrink-0 text-teal-600 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <div className="border-t border-teal-200 px-4 pb-4 pt-4">
                  <ul className="space-y-3">
                    {preisBullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-teal-950">
                        <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-xl bg-teal-50 p-4 sm:p-5">
                    <span className="inline-block bg-teal-600 text-white text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1 mb-2">
                      {t('insurerChoice.preis.highlight.badge')}
                    </span>
                    <p className="font-extrabold text-teal-950 mb-1">{t('insurerChoice.preis.highlight.title')}</p>
                    <p className="text-sm text-teal-950 leading-relaxed">{t('insurerChoice.preis.highlight.text')}</p>
                  </div>
                </div>
              </details>
              <div className="mt-auto">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2 text-center">
                  {t('insurerChoice.preis.chooseLabel')}
                </p>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700 text-white text-base px-6 py-6 h-auto rounded-xl transition-all duration-300">
                  <a
                    href={LKH_URLS.zu90}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackInsurerClick('lkh_zahnupgrade_90')}
                  >
                    {t('insurerChoice.preis.cta90')}
                    <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  </a>
                </Button>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Button asChild variant="outline" className="w-full border-2 border-slate-300 hover:border-teal-600 hover:text-teal-700 text-slate-900 text-sm px-3 py-3 h-auto rounded-xl transition-all duration-300">
                    <a
                      href={LKH_URLS.zu70}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackInsurerClick('lkh_zahnupgrade_70')}
                    >
                      {t('insurerChoice.preis.cta70')}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full border-2 border-slate-300 hover:border-teal-600 hover:text-teal-700 text-slate-900 text-sm px-3 py-3 h-auto rounded-xl transition-all duration-300">
                    <a
                      href={LKH_URLS.zu50}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackInsurerClick('lkh_zahnupgrade_50')}
                    >
                      {t('insurerChoice.preis.cta50')}
                    </a>
                  </Button>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">{t('insurerChoice.preis.note')}</p>
              </div>
            </motion.div>
          </div>

          {/* Bedarfs-Finder: welcher Tarif für welche Situation */}
          <motion.details
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group mb-10 rounded-2xl border border-slate-200 bg-slate-50/60"
          >
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healio-primary focus-visible:ring-offset-2 md:px-7 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="block text-lg font-extrabold text-slate-900 md:text-xl">{t('insurerChoice.finder.title')}</span>
                <span className="mt-1 block text-sm text-slate-600">{t('insurerChoice.finder.subtitle')}</span>
              </span>
              <span className="flex flex-shrink-0 items-center gap-2 text-sm font-bold text-healio-primary">
                <span className="sr-only group-open:hidden sm:not-sr-only sm:inline">{t('insurerChoice.finder.show')}</span>
                <span className="hidden group-open:sr-only sm:group-open:not-sr-only sm:group-open:inline">{t('insurerChoice.finder.hide')}</span>
                <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180" aria-hidden="true" />
              </span>
            </summary>
            <div className="border-t border-slate-200 px-5 pb-6 pt-5 md:px-7 md:pb-7">
              <div className="grid md:grid-cols-2 gap-4">
                {finderItems.map((item, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
                    <p className="font-bold text-slate-900 mb-2">{item.situation}</p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">{t('insurerChoice.finder.recommendation')}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.empfehlung}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.details>

          {/* IKK Bonus Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300/50 rounded-2xl p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-extrabold text-yellow-600 text-center leading-tight px-2">
                {t('insurerChoice.ikk.badge')}
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">{t('insurerChoice.ikk.title')}</h3>
                <p className="text-slate-700 leading-relaxed">{t('insurerChoice.ikk.text')}</p>
              </div>
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-5 h-auto rounded-xl flex-shrink-0 w-full md:w-auto">
                <a href="#bonus-calculator" onClick={scrollToBonusCalculator}>
                  <Calculator className="w-4 h-4 mr-2" aria-hidden="true" />
                  {t('insurerChoice.ikk.cta')}
                </a>
              </Button>
            </div>
          </motion.div>

          <p className="text-xs text-slate-400 mt-6 text-center">{t('insurerChoice.disclaimer')}</p>
        </div>
      </div>
    </section>
  );
};

export default DentalInsurerChoice;
