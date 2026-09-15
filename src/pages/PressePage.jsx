import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import SEOHead from '@/components/SEOHead';
import { createOrganizationSchema, createWebPageSchema } from '@/lib/createSchemaMarkup';

const PRESSE_CANONICAL = 'https://healio.de/presse';

const PressePage = () => {
  const { t } = useTranslation('presse');
  const { t: tSeo } = useTranslation('seo');
  const { getPath, lang } = useLanguage();

  const profileItems = t('profile.items', { returnObjects: true });
  const factRows = t('facts.rows', { returnObjects: true });
  const vita = t('founder.vita', { returnObjects: true });
  const downloads = t('downloads.items', { returnObjects: true });
  const publications = t('publications.items', { returnObjects: true });

  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@graph': [
      createOrganizationSchema(),
      createWebPageSchema(
        tSeo('presse.title'),
        tSeo('presse.description'),
        PRESSE_CANONICAL,
        lang === 'en' ? 'en-US' : 'de-DE',
      ),
    ],
  };

  return (
    <>
      <SEOHead
        title={tSeo('presse.title')}
        description={tSeo('presse.description')}
        canonicalUrl={PRESSE_CANONICAL}
        ogUrl={PRESSE_CANONICAL}
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
            <h1 className="text-3xl lg:text-4xl font-extrabold text-healio-slate mb-4">{t('title')}</h1>
            <p className="text-sm font-medium text-healio-primary mb-6">{t('updated')}</p>

            <nav aria-label={t('breadcrumb')} className="mb-8 pb-8 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                <Link to={getPath('home')} className="text-healio-primary hover:underline">{t('home')}</Link>
                {' / '}
                <span className="text-gray-700">{t('title')}</span>
              </p>
            </nav>

            <div className="space-y-10 text-gray-700 leading-relaxed">
              <p className="text-base">{t('intro')}</p>

              <section className="bg-gray-50/50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-healio-slate mb-4">{t('profile.title')}</h2>
                <dl className="space-y-2">
                  {profileItems.map((item) => (
                    <div key={item.label} className="sm:flex sm:gap-3">
                      <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none">{item.label}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">{t('nugget.title')}</h2>
                <blockquote className="border-l-4 border-healio-primary bg-emerald-50/50 rounded-r-xl px-5 py-4 text-gray-800">
                  {t('nugget.text')}
                </blockquote>
                <p className="mt-3 text-sm text-gray-500">{t('nugget.note')}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-4">{t('facts.title')}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th scope="col" className="py-3 pr-4 font-bold text-healio-slate align-top w-1/3">{t('facts.topicColumn')}</th>
                        <th scope="col" className="py-3 font-bold text-healio-slate align-top">{t('facts.valueColumn')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {factRows.map((row) => (
                        <tr key={row.topic} className="border-b border-gray-100 align-top">
                          <th scope="row" className="py-3 pr-4 font-medium text-gray-900 text-left">{row.topic}</th>
                          <td className="py-3 leading-relaxed">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-3">{t('founder.title')}</h2>
                <p className="font-medium text-gray-900">{t('founder.name')}</p>
                <p className="text-sm text-gray-500 mb-4">{t('founder.role')}</p>
                <div className="space-y-3">
                  {vita.map((sentence) => (
                    <p key={sentence}>{sentence}</p>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500">{t('founder.photoNote')}</p>
              </section>

              <section className="bg-gray-50/50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-healio-slate mb-4">{t('contact.title')}</h2>
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{t('contact.company')}</p>
                  <p>{t('contact.person')}</p>
                  <p className="pt-2">
                    {t('contact.emailLabel')}{' '}
                    <a href="mailto:info@healio.de" className="text-healio-primary hover:underline font-medium">info@healio.de</a>
                  </p>
                  <p>
                    {t('contact.phoneLabel')}{' '}
                    <a href="tel:+494089755705" className="text-healio-primary hover:underline font-medium">{t('contact.phone')}</a>
                  </p>
                </div>
                <p className="mt-4 text-sm text-gray-500">{t('contact.note')}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-4">{t('downloads.title')}</h2>
                <ul className="space-y-3">
                  {downloads.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        download
                        className="inline-flex min-h-11 items-center gap-2 font-medium text-healio-primary hover:underline"
                      >
                        <Download className="h-4 w-4 flex-none" aria-hidden="true" />
                        {item.label} ({item.format})
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500">{t('downloads.note')}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-healio-slate mb-4">{t('publications.title')}</h2>
                <ul className="space-y-6">
                  {publications.map((item) => (
                    <li key={item.href}>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.outlet} · {item.date}</p>
                      <p className="mt-2">{item.description}</p>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex min-h-11 items-center gap-1 font-medium text-healio-primary hover:underline"
                      >
                        {item.linkLabel}
                        <ExternalLink className="h-4 w-4 flex-none" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-gray-500">{t('publications.note')}</p>
              </section>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default PressePage;
