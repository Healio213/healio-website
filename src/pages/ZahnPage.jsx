
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SEOHead from '@/components/SEOHead';
import { createServiceSchema } from '@/lib/createSchemaMarkup';
import DentalBenefits from '@/components/sections/DentalBenefits';
import DentalConcept from '@/components/sections/DentalConcept';
import Testimonials from '@/components/sections/Testimonials';
import Faq from '@/components/sections/Faq';
import DentalContactForm from '@/components/sections/DentalContactForm';
import OptimizedImage from '@/components/OptimizedImage';
import { Button } from '@/components/ui/button';
import { Calculator, ArrowDown, CheckCircle } from 'lucide-react';
import { FadeInUp } from '@/components/ui/ScrollAnimation';

const ZahnPage = () => {
  const { t } = useTranslation('zahn');
  const { t: tSeo } = useTranslation('seo');
  const calculatorUrl = "https://insurances-online.levelnine.biz/?mandant=sdk&tarifftypes=Ambulant,Station%C3%A4r&agentId1=901334&agentId2=&insurers=36&tariffs=&customValues=e30=&contactInformation=eyJmaXJzdE5hbWUiOiJIZWFsaW8iLCJsYXN0TmFtZSI6IkdtYkgiLCJjb21wYW55IjoiSGVhbGlvIEdtYkgiLCJzdHJlZXQiOiJBcm5kdHN0ci4gNiIsInppcGNvZGUiOiIyMjA4NSIsImNpdHkiOiJIYW1idXJnIiwibW9iaWxlIjoiMDE3NjI0MTUzMTg4IiwiZW1haWwiOiJpbmZvQGhlYWxpby5kZSJ9&remarks=IkJlaSBS/GNrZnJhZ2VuIHNpbmQgd2lyIGdlcm5lIGb8ciBTaWUgZGEuIg==&defaultContact=false&employeeInsurance=NOT_BKV";

  const schemaMarkup = createServiceSchema();

  const scrollToBenefits = (e) => {
    e.preventDefault();
    const element = document.getElementById('leistungen');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SEOHead
        title={tSeo('zahn.title')}
        description={tSeo('zahn.description')}
        canonicalUrl="https://www.healio.de/zahn"
        ogTitle={tSeo('zahn.title')}
        ogDescription={tSeo('zahn.description')}
        ogImage="https://www.healio.de/og-image-zahn.png"
        ogUrl="https://www.healio.de/zahn"
        schemaMarkup={schemaMarkup}
      />
      <article>
        {/* Hero Section */}
        <section className="relative min-h-[90svh] flex items-center justify-center pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden w-full" aria-labelledby="zahn-hero-heading">
          {/* Background Image & Gradient Overlays */}
          <div className="absolute inset-0 z-0 w-full h-full">
            <OptimizedImage
              src="https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/efb7ca6cdbeec84d1396d195a03aef54.png"
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
                <h1 id="zahn-hero-heading" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
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
                    <a href="#leistungen" onClick={scrollToBenefits}>
                      <ArrowDown className="w-5 h-5 mr-2" aria-hidden="true" />
                      {t('hero.ctaBenefits')}
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
            <p className="text-center text-sm text-slate-400 mb-6 font-medium uppercase tracking-wider">{t('siegel.title')}</p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <img
                src="/siegel/alle-siegel.png"
                alt={t('siegel.alt')}
                className="w-full h-auto"
                loading="lazy"
              />
            </motion.div>
          </div>
        </section>
        </FadeInUp>

        <FadeInUp><DentalConcept /></FadeInUp>
        <FadeInUp><DentalBenefits /></FadeInUp>

        <FadeInUp><Testimonials headline={t('testimonials.headline')} /></FadeInUp>

        <FadeInUp><Faq /></FadeInUp>
        <FadeInUp><DentalContactForm /></FadeInUp>
      </article>
    </>
  );
};

export default ZahnPage;
