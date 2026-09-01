
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const ImpressumPage = () => {
  const { t } = useTranslation('legal');
  const { t: tSeo } = useTranslation('seo');
  const { getPath, lang } = useLanguage();
  const canonicalUrl = lang === 'en' ? 'https://healio.de/en/legal-notice' : 'https://healio.de/impressum';
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@graph": [createOrganizationSchema(), createWebPageSchema(t('impressum.title'), tSeo('impressum.description'))]
  };

  return (
    <>
      <SEOHead
        title={tSeo('impressum.title')}
        description={tSeo('impressum.description')}
        canonicalUrl={canonicalUrl}
        schemaMarkup={schemaMarkup}
      />
      <main className="min-h-screen bg-gray-50 pt-28 pb-16 sm:pt-32 sm:pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="healio-container"
        >
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-healio-slate mb-6">{t('impressum.title')}</h1>

            <nav aria-label={t('impressum.breadcrumb')} className="mb-8 pb-8 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                <Link to={getPath('home')} className="text-healio-primary hover:underline">{t('impressum.home')}</Link>
                {' / '}
                <span className="text-gray-700">{t('impressum.title')}</span>
              </p>
            </nav>

            <div className="space-y-10 text-gray-700 leading-relaxed">
              <section className="bg-gray-50/50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-healio-slate mb-4">{t('impressum.section1Title')}</h2>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{t('impressum.companyName')}</p>
                  <p>{t('impressum.address1')}</p>
                  <p>{t('impressum.address2')}</p>
                  <p className="pt-2">{t('impressum.representedBy')}</p>
                  <p className="pt-2">{t('impressum.register')}</p>
                  <p>{t('impressum.court')}</p>
                  <p>{t('impressum.taxNumber')}</p>
                  <p className="pt-2">{t('impressum.regNumber')}</p>
                  <p>{t('impressum.regOffice')}</p>
                  <p>{t('impressum.brokerRegistry').split(':')[0]}: <a href="https://www.vermittlerregister.info" target="_blank" rel="noopener noreferrer" className="text-healio-primary hover:underline">www.vermittlerregister.info</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">{t('impressum.responsible')}</h2>
                <p>Frank Steinfurt</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">{t('impressum.contactInfo')}</h2>
                <div className="space-y-2">
                  <p>{t('impressum.phoneLabel')} <a href="tel:+494089755705" className="text-healio-primary hover:underline font-medium">+49 40 89755705</a></p>
                  <p>{t('impressum.emailLabel')} <a href="mailto:info@healio.de" className="text-healio-primary hover:underline font-medium">info@healio.de</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">{t('impressum.dispute')}</h2>
                <p>
                  Für Beschwerden im Zusammenhang mit Versicherungsvermittlung können Sie sich an die folgenden Schlichtungsstellen wenden:
                  Versicherungsombudsmann e.V., Postfach 08 06 32, 10006 Berlin (www.versicherungsombudsmann.de) sowie
                  Ombudsmann Private Kranken- und Pflegeversicherung, Postfach 06 02 22, 10052 Berlin (www.pkv-ombudsmann.de).
                  {' '}Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default ImpressumPage;
