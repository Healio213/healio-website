import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const SEOHead = ({
  title,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = 'https://www.healio.de/og-image.png',
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
  const finalOgUrl = ogUrl || canonicalUrl || 'https://www.healio.de';

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
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Healio" />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={altLocale} />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={finalOgUrl} />
      <meta property="twitter:title" content={finalOgTitle} />
      <meta property="twitter:description" content={finalOgDescription} />
      <meta property="twitter:image" content={ogImage} />

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
