
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import LeistungenContactForm from '@/components/sections/LeistungenContactForm';
import { createWebPageSchema } from '@/lib/createSchemaMarkup';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, ShieldPlus, Hotel as Hospital, Dog } from 'lucide-react';

const LeistungenPage = () => {
  const { t } = useTranslation('leistungen');
  const { t: tSeo } = useTranslation('seo');
  const { getPath } = useLanguage();

  const insuranceTypes = [
    {
      title: t('cards.ambulant.title'),
      description: t('cards.ambulant.description'),
      icon: Stethoscope,
      link: getPath('ambulant'),
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: t('cards.zahn.title'),
      description: t('cards.zahn.description'),
      icon: ShieldPlus,
      link: getPath('zahn'),
      color: "bg-teal-50 text-teal-600"
    },
    {
      title: t('cards.stationaer.title'),
      description: t('cards.stationaer.description'),
      icon: Hospital,
      link: getPath('stationaer'),
      color: "bg-indigo-50 text-indigo-600"
    },
    {
      title: t('cards.tier.title'),
      description: t('cards.tier.description'),
      icon: Dog,
      link: getPath('tierkrankenversicherung'),
      color: "bg-orange-50 text-orange-600"
    }
  ];

  const schemaMarkup = createWebPageSchema(
    tSeo('leistungen.title'),
    tSeo('leistungen.description')
  );

  return (
    <>
      <SEOHead
        title={tSeo('leistungen.title')}
        description={tSeo('leistungen.description')}
        canonicalUrl="https://www.healio.de/leistungen"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="overflow-x-hidden">
        {/* Full Viewport Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(https://horizons-cdn.hostinger.com/a1cb5eb5-2a0a-4a64-9318-bf32833dca0d/41dc2d4d1a04e6100d26683bb596286d.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          
          <div className="absolute inset-0 bg-slate-900/50 z-[1]" />
          
          <div className="container mx-auto relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 w-full text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 lg:mb-8 leading-tight tracking-tight drop-shadow-md">
                {t('hero.title')}
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-bold mb-4 lg:mb-6 mx-auto drop-shadow-md">
                {t('hero.subtitle')}
              </p>
              <p className="text-base md:text-lg lg:text-xl text-slate-100 leading-relaxed font-medium max-w-3xl mx-auto drop-shadow-md">
                {t('hero.description')}
              </p>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-white/70 flex justify-center p-2 shadow-sm">
              <div className="w-1 h-3 bg-white/70 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* 2x2 Grid Section */}
        <section className="bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-white py-16 md:py-24 lg:py-32">
          <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
                {t('services.title')}
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-medium px-4">
                {t('services.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-6xl mx-auto">
              {insuranceTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-slate-100 group"
                >
                  <div className="p-6 md:p-8 lg:p-10 flex-grow flex flex-col">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${type.color}`}>
                      <type.icon className="w-7 h-7 md:w-8 md:h-8" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">
                      {type.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed font-medium flex-grow">
                      {type.description}
                    </p>
                    
                    <div className="mt-6 md:mt-8 pt-6 border-t border-slate-100">
                      <Link 
                        to={type.link}
                        className="inline-flex items-center text-[#10B981] font-bold hover:text-[#059669] transition-colors"
                      >
                        {t('services.moreInfo')}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <LeistungenContactForm />
        
      </main>
    </>
  );
};

export default LeistungenPage;
