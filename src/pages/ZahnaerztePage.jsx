import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Scale, MessageCircle, FileText, QrCode, ShieldCheck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';

const ZahnaerztePage = () => {
  const { t } = useTranslation('zahnaerzte');
  const { t: tSeo } = useTranslation('seo');

  const scrollToCalendly = () => {
    document.getElementById('calendly-zahnaerzte')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = t('stats.items', { returnObjects: true }) || [];
  const legalItems = t('legal.items', { returnObjects: true }) || [];
  const benefits = t('benefits.items', { returnObjects: true }) || [];
  const faqItems = t('faq.items', { returnObjects: true }) || [];

  const schemaMarkup = createWebPageSchema(
    tSeo('zahnaerzte.title'),
    tSeo('zahnaerzte.description')
  );

  return (
    <>
      <SEOHead
        title={tSeo('zahnaerzte.title')}
        description={tSeo('zahnaerzte.description')}
        canonicalUrl="https://healio.de/zahnaerzte"
        schemaMarkup={schemaMarkup}
      />

      <main className="bg-white overflow-hidden w-full">

        {/* HERO */}
        <section className="relative flex items-center pt-36 pb-20 lg:pt-44 lg:pb-28 bg-[#06131c] overflow-hidden">
          <img
            src="/images/healio-hero-markenrelief-v1.webp"
            alt=""
            width="1586"
            height="992"
            loading="eager"
            decoding="async"
            draggable="false"
            className="absolute inset-0 z-0 hidden h-full w-full select-none object-cover object-[62%_center] md:block"
            aria-hidden="true"
          />
          <div className="absolute inset-0 z-10 hidden bg-[linear-gradient(90deg,rgba(3,12,21,0.97)_0%,rgba(3,12,21,0.88)_38%,rgba(3,12,21,0.48)_58%,rgba(3,12,21,0.08)_78%)] md:block" />
          <div className="container mx-auto relative z-20 w-full px-4 sm:px-6 md:px-8">
            <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block bg-emerald-100 text-emerald-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                {t('hero.badge')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6 break-words hyphens-auto">
                {t('hero.title')}
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

        {/* ZAHLEN */}
        <section className="py-16 sm:py-20 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12"
            >
              {t('stats.title')}
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 p-8 text-center"
                >
                  <p className="text-4xl font-extrabold text-[#25c990] mb-3">{item.value}</p>
                  <p className="text-slate-700 leading-relaxed mb-3">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.source}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROBLEM & LÖSUNG */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-5">{t('problem.title')}</h2>
                <p className="text-slate-600 leading-relaxed">{t('problem.text')}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-8 h-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{t('solution.title')}</h3>
                  <p className="text-3xl sm:text-4xl font-bold text-[#25c990] mb-2">{t('solution.amount')}</p>
                  <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600 mb-4">{t('solution.amountLabel')}</p>
                  <p className="text-slate-600 leading-relaxed">{t('solution.text')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* BERUFSRECHT */}
        <section className="py-16 sm:py-20 bg-slate-900">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <Scale className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{t('legal.title')}</h2>
                <p className="text-lg text-white/80">{t('legal.subtitle')}</p>
              </motion.div>
              <div className="grid sm:grid-cols-2 gap-6">
                {legalItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                  >
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-white/70 leading-relaxed text-sm">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-white/40 text-center mt-8">{t('legal.disclaimer')}</p>
            </div>
          </div>
        </section>

        {/* NUTZEN */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12"
              >
                {t('benefits.title')}
              </motion.h2>
              <div className="space-y-6">
                {benefits.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-start gap-4"
                  >
                    <Check className="w-6 h-6 text-[#25c990] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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

        {/* ABLAUF */}
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
                  { icon: MessageCircle, num: '1', titleKey: 'steps.step1Title', descKey: 'steps.step1Desc' },
                  { icon: FileText, num: '2', titleKey: 'steps.step2Title', descKey: 'steps.step2Desc' },
                  { icon: QrCode, num: '3', titleKey: 'steps.step3Title', descKey: 'steps.step3Desc' },
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
                className="mt-10 bg-emerald-50 border border-emerald-200 rounded-xl p-6"
              >
                <p className="text-slate-700 leading-relaxed font-medium text-center">{t('steps.easeNote')}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12"
              >
                {t('faq.title')}
              </motion.h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="border border-slate-200 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.q}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA + CALENDLY */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-[#25c990] to-emerald-600">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
                <p className="text-lg text-white/90 mb-10">{t('cta.subtitle')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-4 sm:p-6"
              >
                <div id="calendly-zahnaerzte">
                  <iframe
                    src="https://calendly.com/healio-info/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=25c990&utm_source=website&utm_campaign=zahnaerzte"
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

export default ZahnaerztePage;
