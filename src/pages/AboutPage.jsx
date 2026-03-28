
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { createWebPageSchema, createOrganizationSchema } from '@/lib/createSchemaMarkup';
import { ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation('about');
  const { t: tSeo } = useTranslation('seo');
  const { getPath } = useLanguage();
  // SEO Schema
  const schemaMarkup = {
    ...createWebPageSchema(
      tSeo('about.title'),
      tSeo('about.description')
    ),
    ...createOrganizationSchema()
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const values = [
    {
      emoji: "💡",
      title: t('values.transparency'),
      description: t('values.transparencyDesc')
    },
    {
      emoji: "🤝",
      title: t('values.trust'),
      description: t('values.trustDesc')
    },
    {
      emoji: "🚀",
      title: t('values.innovation'),
      description: t('values.innovationDesc')
    },
    {
      emoji: "❤️",
      title: t('values.humanity'),
      description: t('values.humanityDesc')
    }
  ];

  const metrics = [
    { number: "120+", label: t('stats.partners') },
    { number: "2.500€", label: t('stats.budget') },
    { number: "4", label: t('stats.areas') },
    { number: "100%", label: t('stats.satisfaction') }
  ];

  return (
    <>
      <SEOHead
        title={tSeo('about.title')}
        description={tSeo('about.description')}
        canonicalUrl="https://www.healio.de/about"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="bg-white overflow-hidden selection:bg-[#25c990] selection:text-white">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[100svh] flex items-center justify-center bg-gradient-to-b from-[#25c990] via-[#105c42] to-black px-6">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] bg-repeat opacity-50"></div>
          
          <div className="container mx-auto relative z-10 max-w-5xl text-center pt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-slate-100 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Wir glauben daran, dass Gesundheitsvorsorge einfach, transparent und für jeden zugänglich sein sollte.
            </motion.p>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
          >
            <span className="text-sm font-medium tracking-widest uppercase">{t('cta.explore')}</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
          </motion.div>
        </section>

        {/* FOUNDER SECTION */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#25c990]/20 to-transparent rounded-2xl transform rotate-3 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500 z-0"></div>
                <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl z-10 bg-slate-100 border border-slate-200">
                  <img 
                    src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/a513c14bcb75e205a5464b120cca5688.jpg" 
                    alt="Frank Steinfurt - Gründer & Geschäftsführer" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <motion.h2 variants={fadeInUp} className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">
                    {t('hero.founder')}
                  </motion.h2>
                  <motion.p variants={fadeInUp} className="text-[#25c990] font-semibold text-lg uppercase tracking-wide">
                    {t('hero.founderRole')}
                  </motion.p>
                </div>

                <motion.div variants={fadeInUp} className="relative">
                  <span className="absolute -top-6 -left-6 text-6xl text-slate-200 font-serif leading-none">"</span>
                  <p className="text-2xl lg:text-3xl text-slate-800 font-medium leading-snug italic relative z-10">
                    {t('hero.quote1')}
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-4 text-lg text-slate-600 leading-relaxed">
                  <p>
                    {t('hero.quote2')}
                  </p>
                  <p>
                    {t('hero.quote3')}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* VALUES SECTION */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('values.title')}</h2>
              <p className="text-xl text-slate-600">
                {t('values.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col items-center text-center"
                >
                  <div className="text-5xl mb-6 bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center">
                    {value.emoji}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS SECTION */}
        <section className="py-20 lg:py-32 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                {t('stats.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  className="bg-white rounded-xl p-8 text-center border border-slate-100 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl md:text-6xl font-extrabold text-[#25c990] mb-4">
                    {metric.number}
                  </div>
                  <div className="text-lg font-medium text-slate-700">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR PROMISE SECTION */}
        <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[#25c990]/5 z-0"></div>
          <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-6xl animate-pulse inline-block mb-4">❤️</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {t('social.title')}
              </h2>
              <div className="text-xl text-slate-300 leading-relaxed space-y-6">
                <p>
                  {t('social.text1')}
                </p>
                <p>
                  {t('social.text2')}
                </p>
                <p>
                  {t('social.text3')}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-20 lg:py-32 bg-white text-center">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-slate-600 mb-10">
                {t('cta.subtitle')}
              </p>
              <Link
                to={getPath('kontakt')}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-[#25c990] hover:bg-[#1db37f] rounded-xl shadow-lg shadow-[#25c990]/30 hover:shadow-xl hover:shadow-[#25c990]/40 transition-all duration-300 hover:-translate-y-1 group"
              >
                {t('cta.button')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
};

export default AboutPage;
