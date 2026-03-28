import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, CheckCircle2, Home, ArrowLeft, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';

const ConfirmationPage = () => {
  const { t } = useTranslation('contact');
  const { t: tSeo } = useTranslation('seo');
  const { getPath } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isAppointment = location.state?.type === 'appointment';

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const calendarUrl = "https://calendar.app.google/N1VP48fSdkHzjwQZ6";

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col items-center py-20 px-6">
      <SEOHead
        title={tSeo('confirmation.title')}
        description={tSeo('confirmation.description')}
        canonicalUrl="https://www.healio.de/confirmation"
      />
      <div className="max-w-4xl w-full pt-12">
        
        {/* SECTION 1 - CONFIRMATION MESSAGE */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            >
              <CheckCircle2 className="w-16 h-16 text-healio-primary" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            {isAppointment ? t('confirmation.title') : t('confirmation.subtitle')}
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {isAppointment
              ? t('confirmation.text1')
              : t('confirmation.text2')}
          </p>
        </motion.div>

        {/* SECTION 1.5 - CALENDLY EMBED */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.15 }}
          className="w-full mb-16 py-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Clock className="w-8 h-8 text-healio-primary" />
              {t('confirmation.bookSlot')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('confirmation.bookSlotDesc')}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 sm:p-4 overflow-hidden h-[700px] w-full max-w-4xl mx-auto">
            <iframe
              src="https://calendly.com/healio-info/30min?hide_event_type_details=1&hide_gdpr_banner=1"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Calendly Terminvereinbarung"
              aria-label="Kalender zur Terminvereinbarung"
              className="rounded-xl w-full h-full"
            ></iframe>
          </div>
        </motion.div>

        {/* SECTION 2 - DYNAMIC CONTENT BASED ON SOURCE */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
          className="bg-gray-50 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-sm border border-gray-100 mb-12"
        >
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3">
              <Calendar className="w-8 h-8 text-healio-primary" />
              {isAppointment ? t('confirmation.nextSteps') : t('confirmation.yourAppointment')}
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              {isAppointment
                ? t('confirmation.appointmentDesc')
                : t('confirmation.alternativeCalendar')}
            </p>
            
            {!isAppointment && (
              <>
                <Button 
                  onClick={() => window.open(calendarUrl, '_blank', 'noopener,noreferrer')}
                  className="bg-healio-primary hover:bg-healio-primary-dark text-white rounded-full px-10 py-7 text-lg font-semibold shadow-lg shadow-healio-primary/20 transition-all hover:scale-105 active:scale-95 border-0 flex items-center gap-3 mx-auto"
                >
                  {t('confirmation.openCalendar')}
                  <ExternalLink className="w-5 h-5" />
                </Button>
                
                <p className="mt-8 text-sm text-gray-400">
                  {t('confirmation.calendarRedirect')}
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* SECTION 3 - NAVIGATION BUTTONS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigate(getPath('home'))}
            variant="outline"
            className="rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 w-full sm:w-auto"
          >
            <Home className="w-4 h-4" />
            {t('confirmation.backToHome')}
          </Button>

          <Button
            onClick={() => navigate(getPath('terminvereinbarung'))}
            variant="ghost"
            className="rounded-full px-8 py-6 text-base font-medium flex items-center gap-2 w-full sm:w-auto text-healio-primary hover:text-healio-primary-dark hover:bg-healio-primary/10"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('confirmation.newAppointment')}
          </Button>
        </motion.div>

      </div>
    </div>
  );
};

export default ConfirmationPage;