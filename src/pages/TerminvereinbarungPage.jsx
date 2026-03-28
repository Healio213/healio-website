import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SEOHead from '@/components/SEOHead';

const TerminvereinbarungPage = () => {
  const { t } = useTranslation('contact');
  const { t: tSeo } = useTranslation('seo');
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <SEOHead
        title={tSeo('termin.title')}
        description={tSeo('termin.description')}
      />
      
      <div className="healio-container max-w-4xl mx-auto px-4 sm:px-6">
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t('termin.title')}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('termin.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 p-2 sm:p-4"
        >
          <div className="w-full min-h-[600px] md:min-h-[700px] rounded-xl overflow-hidden bg-white">
            <iframe
              src="https://calendly.com/healio-info/30min?hide_event_type_details=1&hide_gdpr_banner=1"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Calendly Terminvereinbarung"
              aria-label="Kalender zur Terminvereinbarung"
              className="w-full h-[600px] md:h-[700px]"
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            {t('termin.confirmation')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TerminvereinbarungPage;