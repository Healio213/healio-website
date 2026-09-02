export const BLOG_SCHEMA_FALLBACK_IMAGE = 'https://healio.de/og-image.png';

export const BLOG_ARTICLE_IMAGES = Object.freeze({
  'healio-konzept-fuer-hebammen': 'https://healio.de/images/hero-hebammen.webp',
  'healio-konzept-fuer-tcm-praxen': 'https://healio.de/images/video-partner-thumb.jpg',
  'healio-konzept-fuer-osteopathen': 'https://healio.de/images/video-partner-thumb.jpg',
  'healio-konzept-fuer-heilpraktiker': 'https://healio.de/images/video-partner-thumb.jpg',
  'krankenhauszusatzversicherung-sportverein-best-ager': 'https://healio.de/images/erklaervideo-stationaer-poster.jpg',
  'zahnzusatzversicherung-trotz-angeratener-behandlung': 'https://healio.de/images/erklaervideo-zahn-poster.jpg',
  'heilpraktiker-zusatzversicherung-vergleich-2026': 'https://healio.de/images/hero-ambulant.webp',
  'heilpraktiker-kosten-gkv-erstattung-healio': 'https://healio.de/images/hero-ambulant.webp',
  'heilpraktiker-patienten-finanzierung-gesundheitsbudget': 'https://healio.de/images/video-partner-thumb.jpg',
  'digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung': 'https://healio.de/images/healio-app-dashboard-card.webp',
  'gesundheitsbudget-3000-euro': 'https://healio.de/images/healio-health-pass-hero-v3.webp',
  'naturheilkunde-krankenkasse-2026': 'https://healio.de/images/hero-ambulant.webp',
  'osteopathie-krankenkasse-2026': 'https://healio.de/images/hero-ambulant.webp',
  'ikk-classic-bonus-700-euro': 'https://healio.de/images/kassenboost-bridge-og.png',
  'heilpraktiker-kosten-guide-2026': 'https://healio.de/images/hero-ambulant.webp',
});

const RELATED_LINKS = {
  'healio-konzept-fuer-hebammen': [
    { href: '/hebammen', label: 'Healio für Hebammen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'So entsteht das Gesundheitsbudget' },
    { href: '/blog/osteopathie-krankenkasse-2026', label: 'Osteopathie und Krankenkassenzuschüsse' },
  ],
  'healio-konzept-fuer-tcm-praxen': [
    { href: '/partner', label: 'Healio-Partner für Praxen werden' },
    { href: '/blog/naturheilkunde-krankenkasse-2026', label: 'Naturheilkunde und Kassenleistungen' },
    { href: '/blog/heilpraktiker-zusatzversicherung-vergleich-2026', label: 'Zusatzschutz für Naturheilverfahren vergleichen' },
  ],
  'healio-konzept-fuer-osteopathen': [
    { href: '/partner', label: 'Healio-Partner für Praxen werden' },
    { href: '/blog/osteopathie-krankenkasse-2026', label: 'Welche Krankenkasse Osteopathie bezuschusst' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Gesundheitsbudget verständlich erklärt' },
  ],
  'healio-konzept-fuer-heilpraktiker': [
    { href: '/partner', label: 'Das Healio-Partnermodell' },
    { href: '/blog/heilpraktiker-patienten-finanzierung-gesundheitsbudget', label: 'Heilpraktiker-Kosten besser planbar machen' },
    { href: '/blog/heilpraktiker-zusatzversicherung-vergleich-2026', label: 'Heilpraktiker-Zusatzschutz vergleichen' },
  ],
  'krankenhauszusatzversicherung-sportverein-best-ager': [
    { href: '/stationaer', label: 'Stationären Zusatzschutz vergleichen' },
    { href: '/kassenbonus', label: 'Kassenbonus realistisch einordnen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Kassenbonus und Zusatzschutz kombinieren' },
  ],
  'zahnzusatzversicherung-trotz-angeratener-behandlung': [
    { href: '/zahn', label: 'Zahnzusatzversicherung nach Ausgangslage prüfen' },
    { href: '/kassenbonus', label: 'Kassenbonus für den Beitrag nutzen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Das Healio-Gesundheitsbudget verstehen' },
  ],
  'heilpraktiker-zusatzversicherung-vergleich-2026': [
    { href: '/ambulant', label: 'Ambulante Tarifstufen vergleichen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Bis zu 3.000 EUR Gesundheitsbudget erklärt' },
    { href: '/blog/heilpraktiker-kosten-guide-2026', label: 'Heilpraktiker-Kosten im Überblick' },
  ],
  'heilpraktiker-kosten-gkv-erstattung-healio': [
    { href: '/ambulant', label: 'Ambulanten Zusatzschutz ansehen' },
    { href: '/kassenbonus', label: 'Kassenbonus und Bedingungen verstehen' },
    { href: '/blog/heilpraktiker-kosten-guide-2026', label: 'Typische Heilpraktiker-Kosten vergleichen' },
  ],
  'heilpraktiker-patienten-finanzierung-gesundheitsbudget': [
    { href: '/partner', label: 'Healio für Heilpraktiker-Praxen' },
    { href: '/ambulant', label: 'Gesundheitsbudget und Tarifstufen prüfen' },
    { href: '/kassenboost', label: 'Passende Krankenkasse zum Tarif finden' },
  ],
  'digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung': [
    { href: '/ambulant', label: 'Ambulantes Gesundheitsbudget ansehen' },
    { href: '/kassenbonus', label: 'So kann der Kassenbonus den Beitrag reduzieren' },
    { href: '/partner', label: 'Digitale Begleitung für Healio-Partner' },
  ],
  'gesundheitsbudget-3000-euro': [
    { href: '/ambulant', label: 'Bis zu 3.000 EUR Gesundheitsbudget prüfen' },
    { href: '/kassenbonus', label: 'Kassenbonus verständlich erklärt' },
    { href: '/blog/ikk-classic-bonus-700-euro', label: 'IKK Bonus mit 700 EUR+ als Beispiel' },
  ],
  'naturheilkunde-krankenkasse-2026': [
    { href: '/ambulant', label: 'Naturheilkunde mit Zusatzschutz absichern' },
    { href: '/blog/heilpraktiker-kosten-guide-2026', label: 'Kosten für Heilpraktiker-Behandlungen' },
    { href: '/blog/osteopathie-krankenkasse-2026', label: 'Osteopathie-Zuschüsse vergleichen' },
  ],
  'osteopathie-krankenkasse-2026': [
    { href: '/ambulant', label: 'Ambulanten Schutz für Osteopathie prüfen' },
    { href: '/blog/naturheilkunde-krankenkasse-2026', label: 'Kassenleistungen für Naturheilkunde' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Gesundheitsbudget aus Bonus und Zusatzschutz' },
  ],
  'ikk-classic-bonus-700-euro': [
    { href: '/kassenbonus', label: 'Kassenbonus Schritt für Schritt verstehen' },
    { href: '/kassenboost', label: 'Krankenkassen nach Beitrag, Bonus und Leistung vergleichen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Kassenbonus mit Zusatzschutz kombinieren' },
  ],
  'heilpraktiker-kosten-guide-2026': [
    { href: '/ambulant', label: 'Ambulanten Zusatzschutz vergleichen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Bis zu 3.000 EUR Gesundheitsbudget verstehen' },
    { href: '/blog/heilpraktiker-zusatzversicherung-vergleich-2026', label: 'Tarife für Heilpraktiker-Leistungen vergleichen' },
  ],
};

function validDate(value) {
  if (!value) return null;
  const timestamp = Date.parse(value);
  return Number.isNaN(timestamp) ? null : { value, timestamp };
}

export function getBlogArticleDates(article, sourceSchema = {}) {
  const published = validDate(article?.published_at) || validDate(sourceSchema.datePublished);
  const modifiedCandidates = [
    validDate(article?.updated_at),
    validDate(sourceSchema.dateModified),
    published,
  ].filter(Boolean);
  const modified = modifiedCandidates.reduce(
    (latest, candidate) => (!latest || candidate.timestamp > latest.timestamp ? candidate : latest),
    null,
  );

  return {
    datePublished: published?.value,
    dateModified: modified?.value,
  };
}

export function getBlogArticleImage(article, sourceSchema = {}) {
  const schemaImage = Array.isArray(sourceSchema.image)
    ? sourceSchema.image.find(Boolean)
    : sourceSchema.image;
  const schemaImageUrl = typeof schemaImage === 'string'
    ? schemaImage
    : schemaImage?.url || schemaImage?.contentUrl;

  return article?.featured_image_url
    || BLOG_ARTICLE_IMAGES[article?.slug]
    || schemaImageUrl
    || BLOG_SCHEMA_FALLBACK_IMAGE;
}

export function createBlogArticleSchema(article, canonicalUrl) {
  const sourceSchema = article?.structured_data?.article || {};
  const { datePublished, dateModified } = getBlogArticleDates(article, sourceSchema);
  const image = getBlogArticleImage(article, sourceSchema);

  return {
    ...sourceSchema,
    '@context': sourceSchema['@context'] || 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@id': `${canonicalUrl}#webpage` },
    headline: article?.title || sourceSchema.headline,
    description: article?.meta_description || sourceSchema.description,
    image,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: sourceSchema.author || { '@type': 'Organization', name: 'Healio GmbH' },
    publisher: {
      ...(sourceSchema.publisher || {}),
      '@type': 'Organization',
      name: 'Healio GmbH',
      url: 'https://healio.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://healio.de/favicon.png',
      },
    },
  };
}

export function getBlogRelatedLinks(slug) {
  return RELATED_LINKS[slug] || [];
}

export const BLOG_RELATED_LINK_SLUGS = Object.freeze(Object.keys(RELATED_LINKS));
