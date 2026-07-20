import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Wallet, HeartHandshake, Scale, MessageCircle, FileText, QrCode, Heart, Check, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import HighlightText from '@/components/ui/HighlightText';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';

const HebammenPage = () => {
  const { t } = useTranslation('hebammen');
  const { t: tSeo } = useTranslation('seo');

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
        canonicalUrl="https://healio.de/hebammen"
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white overflow-hidden w-full">

        {/* HERO */}
        <section className="relative min-h-[100svh] flex items-center pt-28 pb-16 lg:pt-20 lg:pb-0">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/hero-hebammen.webp"
              alt="Hebamme im Gespräch mit schwangerer Patientin"
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/50 md:bg-black/25 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent md:bg-gradient-to-r md:from-slate-900/80 md:via-slate-900/40 md:to-transparent z-10" />
          </div>

          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8">
            <motion.div className="max-w-2xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block bg-rose-100 text-rose-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                {t('hero.badge')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                <HighlightText text={t('hero.title')} className="bg-[linear-gradient(135deg,#8ee7ca_0%,#25c990_48%,#1aa875_100%)] bg-clip-text text-transparent" />
              </h1>
              <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-8">
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
        </section>

        {/* Qualitätssiegel: SDK + IKK classic */}
        <motion.section className="py-8 bg-white border-b border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="container mx-auto px-4">
            <p className="text-center text-xs text-slate-400 mb-5 font-medium uppercase tracking-wider">Unsere Partner: SDK Süddeutsche Krankenversicherung & IKK classic</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-w-6xl mx-auto">
              <img src="/siegel/sdk/stiftung-warentest.png" alt="Stiftung Warentest SEHR GUT (0,9)" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/sdk/fairnesspreis.png" alt="Deutscher Fairnesspreis 2025" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/sdk/morgen-morgen.png" alt="Morgen und Morgen Ausgezeichnet" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/ikk/schwangere-test.webp" alt="Krankenkassentest für Schwangere und junge Eltern, Note 1,7 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
              <img src="/siegel/ikk/familien-test.webp" alt="Krankenkassentest für Familien, Note 1,6 Gut" className="h-16 md:h-20 w-auto" loading="lazy" />
            </div>
          </div>
        </motion.section>

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

        {/* MORAL */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8">
                {t('moral.title')}
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg text-white/85 leading-relaxed mb-6">
                {t('moral.text1')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-white/85 leading-relaxed mb-6">
                {t('moral.text2')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-lg font-semibold text-emerald-300 leading-relaxed">
                {t('moral.text3')}
              </motion.p>
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
                <div id="calendly-hebammen">
                  <iframe
                    src="https://calendly.com/healio-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=25c990"
                    width="100%"
                    height="700"
                    frameBorder="0"
                    title="Termin buchen"
                    style={{ minHeight: '700px', border: 'none' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>
    </>
  );
};

export default HebammenPage;
