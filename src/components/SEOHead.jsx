import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const SITE_URL = 'https://healio.de';

const normalizeHealioUrl = (url) => {
  if (!url) return url;
  const normalized = url
    .replace(/^https?:\/\/www\.healio\.de/i, SITE_URL)
    .replace(/^http:\/\/healio\.de/i, SITE_URL);

  return normalized.length > SITE_URL.length
    ? normalized.replace(/\/$/, '')
    : SITE_URL;
};

const HREFLANG_BY_CANONICAL = {
  [SITE_URL]: { de: SITE_URL, en: `${SITE_URL}/en` },
  [`${SITE_URL}/en`]: { de: SITE_URL, en: `${SITE_URL}/en` },
  [`${SITE_URL}/unternehmen`]: { de: `${SITE_URL}/unternehmen`, en: `${SITE_URL}/en/companies` },
  [`${SITE_URL}/en/companies`]: { de: `${SITE_URL}/unternehmen`, en: `${SITE_URL}/en/companies` },
  [`${SITE_URL}/unternehmen/vorsorge-rechner`]: { de: `${SITE_URL}/unternehmen/vorsorge-rechner`, en: `${SITE_URL}/en/companies/pension-calculator` },
  [`${SITE_URL}/en/companies/pension-calculator`]: { de: `${SITE_URL}/unternehmen/vorsorge-rechner`, en: `${SITE_URL}/en/companies/pension-calculator` },
  [`${SITE_URL}/kassenboost`]: { de: `${SITE_URL}/kassenboost`, en: `${SITE_URL}/en/kassenboost` },
  [`${SITE_URL}/en/kassenboost`]: { de: `${SITE_URL}/kassenboost`, en: `${SITE_URL}/en/kassenboost` },
  [`${SITE_URL}/kassenbonus`]: { de: `${SITE_URL}/kassenbonus`, en: `${SITE_URL}/en/health-insurance-bonus` },
  [`${SITE_URL}/en/health-insurance-bonus`]: { de: `${SITE_URL}/kassenbonus`, en: `${SITE_URL}/en/health-insurance-bonus` },
  [`${SITE_URL}/ambulant`]: { de: `${SITE_URL}/ambulant`, en: `${SITE_URL}/en/outpatient` },
  [`${SITE_URL}/en/outpatient`]: { de: `${SITE_URL}/ambulant`, en: `${SITE_URL}/en/outpatient` },
  [`${SITE_URL}/partner`]: { de: `${SITE_URL}/partner`, en: `${SITE_URL}/en/partner` },
  [`${SITE_URL}/en/partner`]: { de: `${SITE_URL}/partner`, en: `${SITE_URL}/en/partner` },
  [`${SITE_URL}/zahn`]: { de: `${SITE_URL}/zahn`, en: `${SITE_URL}/en/dental` },
  [`${SITE_URL}/en/dental`]: { de: `${SITE_URL}/zahn`, en: `${SITE_URL}/en/dental` },
  [`${SITE_URL}/stationaer`]: { de: `${SITE_URL}/stationaer`, en: `${SITE_URL}/en/inpatient` },
  [`${SITE_URL}/en/inpatient`]: { de: `${SITE_URL}/stationaer`, en: `${SITE_URL}/en/inpatient` },
  [`${SITE_URL}/leistungen`]: { de: `${SITE_URL}/leistungen`, en: `${SITE_URL}/en/services` },
  [`${SITE_URL}/en/services`]: { de: `${SITE_URL}/leistungen`, en: `${SITE_URL}/en/services` },
  [`${SITE_URL}/about`]: { de: `${SITE_URL}/about`, en: `${SITE_URL}/en/about` },
  [`${SITE_URL}/en/about`]: { de: `${SITE_URL}/about`, en: `${SITE_URL}/en/about` },
  [`${SITE_URL}/kontakt`]: { de: `${SITE_URL}/kontakt`, en: `${SITE_URL}/en/contact` },
  [`${SITE_URL}/en/contact`]: { de: `${SITE_URL}/kontakt`, en: `${SITE_URL}/en/contact` },
  [`${SITE_URL}/hebammen`]: { de: `${SITE_URL}/hebammen`, en: `${SITE_URL}/en/midwives` },
  [`${SITE_URL}/en/midwives`]: { de: `${SITE_URL}/hebammen`, en: `${SITE_URL}/en/midwives` },
  [`${SITE_URL}/terminvereinbarung`]: { de: `${SITE_URL}/terminvereinbarung`, en: `${SITE_URL}/en/appointment` },
  [`${SITE_URL}/en/appointment`]: { de: `${SITE_URL}/terminvereinbarung`, en: `${SITE_URL}/en/appointment` },
  [`${SITE_URL}/potenzialanalyse`]: { de: `${SITE_URL}/potenzialanalyse`, en: `${SITE_URL}/en/potential-analysis` },
  [`${SITE_URL}/en/potential-analysis`]: { de: `${SITE_URL}/potenzialanalyse`, en: `${SITE_URL}/en/potential-analysis` },
  [`${SITE_URL}/tierkrankenversicherung`]: { de: `${SITE_URL}/tierkrankenversicherung`, en: `${SITE_URL}/en/pet-insurance` },
  [`${SITE_URL}/en/pet-insurance`]: { de: `${SITE_URL}/tierkrankenversicherung`, en: `${SITE_URL}/en/pet-insurance` },
  [`${SITE_URL}/impressum`]: { de: `${SITE_URL}/impressum`, en: `${SITE_URL}/en/legal-notice` },
  [`${SITE_URL}/en/legal-notice`]: { de: `${SITE_URL}/impressum`, en: `${SITE_URL}/en/legal-notice` },
  [`${SITE_URL}/agb`]: { de: `${SITE_URL}/agb`, en: `${SITE_URL}/en/terms` },
  [`${SITE_URL}/en/terms`]: { de: `${SITE_URL}/agb`, en: `${SITE_URL}/en/terms` },
  [`${SITE_URL}/datenschutz`]: { de: `${SITE_URL}/datenschutz`, en: `${SITE_URL}/en/privacy` },
  [`${SITE_URL}/en/privacy`]: { de: `${SITE_URL}/datenschutz`, en: `${SITE_URL}/en/privacy` },
  [`${SITE_URL}/erstinformation`]: { de: `${SITE_URL}/erstinformation`, en: `${SITE_URL}/en/initial-information` },
  [`${SITE_URL}/en/initial-information`]: { de: `${SITE_URL}/erstinformation`, en: `${SITE_URL}/en/initial-information` },
  [`${SITE_URL}/blog`]: { de: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` },
  [`${SITE_URL}/en/blog`]: { de: `${SITE_URL}/blog`, en: `${SITE_URL}/en/blog` }
};

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = `${SITE_URL}/og-image.png`,
  ogImageAlt = 'Healio Gesundheitsbudget und Zusatzversicherungen',
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  alternateUrls = null,
  robots = 'index, follow',
  schemaMarkup = null
}) => {
  const { t } = useTranslation('seo');
  const { lang } = useLanguage();

  const defaultTitle = t('defaults.title');
  const defaultDescription = t('defaults.description');

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalOgTitle = ogTitle || finalTitle;
  const finalOgDescription = ogDescription || finalDescription;
  const finalCanonicalUrl = normalizeHealioUrl(canonicalUrl);
  const finalOgUrl = normalizeHealioUrl(ogUrl || finalCanonicalUrl || SITE_URL);
  const finalOgImage = normalizeHealioUrl(ogImage);
  const finalAlternateUrls = alternateUrls || HREFLANG_BY_CANONICAL[finalCanonicalUrl];

  const locale = lang === 'de' ? 'de_DE' : 'en_US';
  const altLocale = lang === 'de' ? 'en_US' : 'de_DE';
  const language = lang === 'de' ? 'de-DE' : 'en-US';

  return (
    <Helmet>
      <html lang={lang} />
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />

      {/* Canonical URL */}
      {finalCanonicalUrl && <link rel="canonical" href={finalCanonicalUrl} />}
      {finalAlternateUrls && Object.entries(finalAlternateUrls).map(([hreflang, href]) => (
        <link key={hreflang} rel="alternate" hrefLang={hreflang} href={normalizeHealioUrl(href)} />
      ))}
      {finalAlternateUrls && (
        <link rel="alternate" hrefLang="x-default" href={normalizeHealioUrl(finalAlternateUrls.de || finalCanonicalUrl)} />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="Healio" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={altLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={finalOgUrl} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content={robots} />
      <meta name="language" content={language} />
      <meta name="author" content="Healio" />

      {/* Schema Markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
