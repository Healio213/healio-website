import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Wallet, HeartHandshake, Scale, MessageCircle, FileText, QrCode, Heart, Check, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';

const HebammenPage = () => {
  const { t } = useTranslation('hebammen');
  const { t: tSeo } = useTranslation('seo');

  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      if (window.Calendly) initCalendly();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => initCalendly();
    script.onerror = () => setScriptError(true);
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const initCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/healio-beratung/kennenlernen',
        parentElement: document.getElementById('calendly-hebammen'),
        prefill: {},
        utm: {},
      });
    }
  };

  const scrollToCalendly = () => {
    document.getElementById('calendly-hebammen')?.scrollIntoView({ behavior: 'smooth' });
  };

  const schemaMarkup = createWebPageSchema(
    tSeo('hebammen.title'),
    tSeo('hebammen.description')
  );

  return (
    <>
      <SEOHead
        title={tSeo('hebammen.title')}
        description={tSeo('hebammen.description')}
        canonicalUrl="https://www.healio.de/hebammen"
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white overflow-hidden w-full">

        {/* HERO */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-rose-50 via-white to-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-block bg-rose-100 text-rose-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  {t('hero.badge')}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
                  {t('hero.title')}
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
                  {t('hero.subtitle')}
                </p>
                <Button
                  onClick={scrollToCalendly}
                  className="bg-[#25c990] hover:bg-[#1fb37f] text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  {t('hero.cta')}
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROBLEM & LÖSUNG */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Problem */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5">
                    {t('problem.title')}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {t('problem.text')}
                  </p>
                </motion.div>

                {/* Lösung */}
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 h-full">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                      {t('solution.title')}
                    </h3>
                    <p className="text-3xl sm:text-4xl font-bold text-[#25c990] mb-3">{t('solution.amount')}</p>
                    <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-4">{t('solution.amountLabel')}</p>
                    <p className="text-slate-600 leading-relaxed">
                      {t('solution.text')}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* LEISTUNGEN FÜR SCHWANGERE */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-6">
                  <Baby className="w-8 h-8 text-rose-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t('leistungen.title')}
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  {t('leistungen.subtitle')}
                </p>
              </motion.div>

              {/* Highlight Bullets */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {t('leistungen.highlights', { returnObjects: true }).map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="bg-rose-50 border border-rose-200 rounded-xl p-5"
                  >
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* IKK classic */}
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 sm:p-8"
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-6">{t('leistungen.ikkTitle')}</h3>
                  <div className="space-y-4">
                    {t('leistungen.ikkItems', { returnObjects: true }).map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-blue-700 whitespace-nowrap">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* SDK Zusatzversicherung */}
                <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 sm:p-8"
                >
                  <h3 className="text-xl font-bold text-emerald-900 mb-6">{t('leistungen.sdkTitle')}</h3>
                  <div className="space-y-4">
                    {t('leistungen.sdkItems', { returnObjects: true }).map((item, i) => (
                      <div key={i} className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1">
                          <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-emerald-700 whitespace-nowrap">{item.amount}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Total */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="bg-gradient-to-r from-rose-50 to-amber-50 border-2 border-rose-200 rounded-2xl p-8 text-center"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-600 mb-2">{t('leistungen.totalLabel')}</p>
                <p className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">{t('leistungen.totalAmount')}</p>
                <p className="text-slate-600 leading-relaxed max-w-lg mx-auto">{t('leistungen.totalNote')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VORTEILE & PRÄMIE */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t('benefits.title')}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('benefits.text')}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8"
              >
                <p className="text-lg text-slate-700 leading-relaxed mb-4 font-medium">
                  {t('benefits.premiumText')}
                </p>
                <p className="text-slate-600 mb-6">{t('benefits.controlText')}</p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Option 1: Auszahlung */}
                  <div className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                      <Wallet className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{t('benefits.option1Title')}</h3>
                    <p className="text-slate-600 leading-relaxed">{t('benefits.option1Desc')}</p>
                  </div>

                  {/* Option 2: Spende */}
                  <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center mb-4">
                      <HeartHandshake className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{t('benefits.option2Title')}</h3>
                    <p className="text-slate-600 leading-relaxed">{t('benefits.option2Desc')}</p>
                  </div>
                </div>

                <p className="text-center text-slate-500 mt-6 italic">{t('benefits.flexNote')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* RECHTLICHE SICHERHEIT */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-[#25c990]/10 flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-[#25c990]" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  {t('legal.title')}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {t('legal.subtitle')}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-8 border border-gray-100 mb-6"
              >
                <p className="text-slate-700 leading-relaxed text-lg">
                  {t('legal.text')}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center"
              >
                <p className="text-slate-700 leading-relaxed font-medium">
                  {t('legal.summary')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABLAUF — 3 SCHRITTE */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12"
              >
                {t('steps.title')}
              </motion.h2>

              <div className="space-y-8">
                {[
                  { icon: MessageCircle, num: '1', titleKey: 'steps.step1Title', descKey: 'steps.step1Desc', color: 'emerald' },
                  { icon: FileText, num: '2', titleKey: 'steps.step2Title', descKey: 'steps.step2Desc', color: 'blue' },
                  { icon: QrCode, num: '3', titleKey: 'steps.step3Title', descKey: 'steps.step3Desc', color: 'rose' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start gap-5"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-[#25c990] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{item.num}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{t(item.titleKey)}</h3>
                      <p className="text-slate-600 leading-relaxed">{t(item.descKey)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="mt-10 bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {t('steps.easeNote')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA + CALENDLY */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#25c990] to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                  {t('cta.title')}
                </h2>
                <p className="text-lg text-white/90 mb-10">
                  {t('cta.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
              >
                {scriptError ? (
                  <div className="text-center py-10">
                    <p className="text-slate-600 mb-2">Kalender konnte nicht geladen werden.</p>
                    <p className="text-sm text-slate-400">Bitte überprüfe deine Internetverbindung oder deaktiviere eventuelle Adblocker.</p>
                  </div>
                ) : (
                  <div id="calendly-hebammen" style={{ minHeight: '650px' }} />
                )}
              </motion.div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default HebammenPage;
