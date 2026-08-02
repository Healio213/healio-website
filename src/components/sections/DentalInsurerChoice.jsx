import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Zap, ShieldCheck, ExternalLink, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BAYERISCHE_URL, UKV_URL, trackZahnEvent } from './dental/dentalLinks';

const trackInsurerClick = (insurer) => trackZahnEvent('zahnzusatz_versicherer_click', insurer);

const DentalInsurerChoice = () => {
  const { t } = useTranslation('zahn');

  const sofortBullets = t('insurerChoice.sofort.bullets', { returnObjects: true }) || [];
  const vorsorgeBullets = t('insurerChoice.vorsorge.bullets', { returnObjects: true }) || [];
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

          {/* Zwei Wege */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
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
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-emerald-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{t('insurerChoice.sofort.label')}</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {t('insurerChoice.sofort.insurer')} · {t('insurerChoice.sofort.tariff')}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{t('insurerChoice.sofort.text')}</p>
              <ul className="space-y-3 mb-8">
                {sofortBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 sm:p-5 mb-8">
                <span className="inline-block bg-[#25c990] text-white text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1 mb-2">
                  {t('insurerChoice.sofort.highlight.badge')}
                </span>
                <p className="font-extrabold text-slate-900 mb-1">{t('insurerChoice.sofort.highlight.title')}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{t('insurerChoice.sofort.highlight.text')}</p>
              </div>
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
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-slate-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">{t('insurerChoice.vorsorge.label')}</h3>
                  <p className="text-sm text-slate-500 font-medium">
                    {t('insurerChoice.vorsorge.insurer')} · {t('insurerChoice.vorsorge.tariff')}
                  </p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">{t('insurerChoice.vorsorge.text')}</p>
              <ul className="space-y-3 mb-8">
                {vorsorgeBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-5 h-5 text-healio-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 sm:p-5 mb-8">
                <span className="inline-block bg-blue-500 text-white text-xs font-bold uppercase tracking-wide rounded-full px-3 py-1 mb-2">
                  {t('insurerChoice.vorsorge.highlight.badge')}
                </span>
                <p className="font-extrabold text-slate-900 mb-1">{t('insurerChoice.vorsorge.highlight.title')}</p>
                <p className="text-sm text-slate-700 leading-relaxed">{t('insurerChoice.vorsorge.highlight.text')}</p>
              </div>
              <div className="mt-auto">
                <Button asChild variant="outline" className="w-full border-2 border-slate-300 hover:border-healio-primary hover:bg-emerald-50 text-slate-900 text-base px-6 py-6 h-auto rounded-xl transition-all duration-300">
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
          </div>

          {/* Bedarfs-Finder: welcher Tarif für welche Situation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{t('insurerChoice.finder.title')}</h3>
              <p className="text-slate-600">{t('insurerChoice.finder.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {finderItems.map((item, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl border border-slate-200 p-5 border-l-4 ${
                    item.weg === 'bayerische' ? 'border-l-[#25c990]' : item.weg === 'ukv' ? 'border-l-blue-500' : 'border-l-slate-400'
                  }`}
                >
                  <p className="font-bold text-slate-900 mb-2">{item.situation}</p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">{t('insurerChoice.finder.recommendation')}</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.empfehlung}</p>
                </div>
              ))}
            </div>
          </motion.div>

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
