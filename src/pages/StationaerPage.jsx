
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { createServiceSchema } from '@/lib/createSchemaMarkup';
import HospitalBenefits from '@/components/sections/HospitalBenefits';
import HospitalConcept from '@/components/sections/HospitalConcept';
import HospitalContactForm from '@/components/sections/HospitalContactForm';
import AmbulantBonusCalculator from '@/components/sections/ambulant/AmbulantBonusCalculator';
import { Button } from '@/components/ui/button';
import { Calculator, Gift, CheckCircle, ChevronDown, Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { FadeInUp } from '@/components/ui/ScrollAnimation';

const StationaerFaq = () => {
  const { t } = useTranslation('stationaer');
  const [openFaq, setOpenFaq] = useState(0);

  const faqItems = t('faq.items', { returnObjects: true });
  const faqs = Array.isArray(faqItems) ? faqItems : [];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <article key={index} className="border border-slate-100 rounded-xl bg-white overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
          <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left">
            <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.q}</h3>
            <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </motion.div>
          </button>
          <AnimatePresence>
            {openFaq === index && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="px-6">
                <p className="pb-6 text-slate-600 leading-relaxed font-medium">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </article>
      ))}
    </div>
  );
};

const StationaerPage = () => {
  const { t } = useTranslation('stationaer');
  const { t: tSeo } = useTranslation('seo');

  const calculatorUrl = "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant,Station%C3%A4r&agentId1=901334&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDE3NjI0MTUzMTg4IiwiZW1haWwiOiJpbmZvQGhlYWxpby5kZSJ9&remarks=IkJlaSBS/GNrZnJhZ2VuIHNpbmQgd2lyIGdlcm5lIGb8ciBTaWUgZGEuIg==&defaultContact=false&employeeInsurance=NOT_BKV";
  const ikkLink = "https://www.ikk-classic.de/formulare/mitglied-werden-vp?dsid=koop_reg&pid=V3700025016";

  const schemaMarkup = createServiceSchema();

  const testimonials = t('testimonials.items', { returnObjects: true });
  const testimonialItems = Array.isArray(testimonials) ? testimonials : [];

  return (
    <>
      <SEOHead
        title={tSeo('stationaer.title')}
        description={tSeo('stationaer.description')}
        canonicalUrl="https://www.healio.de/stationaer"
        ogTitle={tSeo('stationaer.title')}
        ogDescription={tSeo('stationaer.description')}
        ogImage="https://www.healio.de/og-image-stationaer.png"
        ogUrl="https://www.healio.de/stationaer"
        schemaMarkup={schemaMarkup}
      />
      <article>
        {/* Hero Section */}
        <section className="relative min-h-[90svh] flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden w-full" aria-labelledby="stationaer-hero-heading">
          {/* Background Image & Gradient Overlays */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <OptimizedImage
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/89e53e31c640cfd5da7e6cf86c62466b.png"
              alt={t('hero.heroImageAlt')}
              priority={true}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60 z-10" />
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply z-10" aria-hidden="true" />
          </div>

          <div className="healio-container relative z-20 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <h1 id="stationaer-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
                  {t('hero.title').split('<highlight>').map((part, i) => {
                    if (i === 0) return part;
                    const [highlighted, rest] = part.split('</highlight>');
                    return <React.Fragment key={i}><span className="text-healio-primary">{highlighted}</span>{rest}</React.Fragment>;
                  })}
                </h1>

                <p className="mt-4 text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed font-medium drop-shadow-md">
                  {t('hero.subtitle')}
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center sm:items-start gap-4 max-w-2xl mx-auto shadow-xl text-left"
                >
                  <CheckCircle className="w-8 h-8 sm:w-6 sm:h-6 text-[#25c990] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-white text-base sm:text-lg font-medium drop-shadow-sm text-center sm:text-left" dangerouslySetInnerHTML={{ __html: t('hero.ikkNote') }} />
                </motion.div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-xl mx-auto">
                  <Button asChild className="bg-[#25c990] hover:bg-[#1db37f] text-white shadow-[0_4px_14px_rgba(37,201,144,0.4)] hover:shadow-[0_6px_20px_rgba(37,201,144,0.6)] text-lg px-8 py-6 h-auto rounded-xl border-none transition-all duration-300 w-full sm:w-auto">
                    <a href="/ambulant">
                      <Calculator className="w-5 h-5 mr-2" aria-hidden="true" />
                      {t('hero.ctaCalculate')}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md shadow-xl text-lg px-8 py-6 h-auto rounded-xl transition-all duration-300 w-full sm:w-auto">
                    <a href={ikkLink} target="_blank" rel="noopener noreferrer">
                      <Gift className="w-5 h-5 mr-2" aria-hidden="true" />
                      {t('hero.ctaBonus')}
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Qualitätssiegel */}
        <FadeInUp>
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="healio-container px-4">
            <p className="text-center text-xs text-slate-400 mb-6 font-medium uppercase tracking-wider">{t('siegel.title')}</p>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto px-4">
              <img src="/siegel/klinik-siegel.png" alt={t('siegel.alt')} className="w-full h-auto" loading="lazy" />
            </motion.div>
          </div>
        </section>
        </FadeInUp>

        <FadeInUp><HospitalConcept /></FadeInUp>
        <FadeInUp><HospitalBenefits /></FadeInUp>

        <FadeInUp><AmbulantBonusCalculator /></FadeInUp>

        {/* Testimonials */}
        <FadeInUp>
        <section className="py-20 bg-white">
          <div className="healio-container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">
                {t('testimonials.title').split('<highlight>').map((part, i) => {
                  if (i === 0) return part;
                  const [highlighted, rest] = part.split('</highlight>');
                  return <React.Fragment key={i}><span className="text-healio-primary">{highlighted}</span>{rest}</React.Fragment>;
                })}
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">{t('testimonials.subtitle')}</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {testimonialItems.map((item, i) => (
                <motion.article key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 space-y-4 text-center">
                  <div className="flex items-center gap-1 justify-center">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-slate-600 italic leading-relaxed">"{item.text}"</p>
                  <p className="font-bold text-slate-900 pt-2">{item.name}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        </FadeInUp>

        {/* FAQ */}
        <FadeInUp>
        <section className="py-20 bg-slate-50">
          <div className="healio-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{t('faq.title')}</h2>
              <p className="text-lg text-slate-600">{t('faq.subtitle')}</p>
            </div>
            <StationaerFaq />
          </div>
        </section>
        </FadeInUp>

        <FadeInUp><HospitalContactForm /></FadeInUp>
      </article>
    </>
  );
};

export default StationaerPage;
