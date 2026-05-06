import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const SITE_URL = 'https://healio.de';

const normalizeHealioUrl = (url) => {
  if (!url) return url;
  return url
    .replace(/^https?:\/\/www\.healio\.de/i, SITE_URL)
    .replace(/^http:\/\/healio\.de/i, SITE_URL);
};

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = `${SITE_URL}/og-image.png`,
  ogUrl,
  ogType = 'website',
  twitterCard = 'summary_large_image',
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

  const locale = lang === 'de' ? 'de_DE' : 'en_US';
  const altLocale = lang === 'de' ? 'en_US' : 'de_DE';
  const language = lang === 'de' ? 'German' : 'English';

  return (
    <Helmet>
      <html lang={lang} />
      {/* Primary Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />

      {/* Canonical URL */}
      {finalCanonicalUrl && <link rel="canonical" href={finalCanonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:site_name" content="Healio" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={altLocale} />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={finalOgUrl} />
      <meta property="twitter:title" content={finalOgTitle} />
      <meta property="twitter:description" content={finalOgDescription} />
      <meta property="twitter:image" content={finalOgImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
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
