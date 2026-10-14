export const BLOG_SCHEMA_FALLBACK_IMAGE = 'https://healio.de/images/healio-linkvorschau-v2.png';

export const BLOG_ARTICLE_IMAGES = Object.freeze({
  'healio-konzept-fuer-hebammen': 'https://healio.de/images/hero-hebammen.webp',
  'healio-konzept-fuer-tcm-praxen': 'https://healio.de/images/video-partner-thumb.jpg',
  'healio-konzept-fuer-osteopathen': 'https://healio.de/images/video-partner-thumb.jpg',
  'healio-konzept-fuer-heilpraktiker': 'https://healio.de/images/video-partner-thumb.jpg',
  'krankenhauszusatzversicherung-sportverein-best-ager': 'https://healio.de/images/erklaervideo-stationaer-poster.jpg',
  'zahnzusatzversicherung-trotz-angeratener-behandlung': 'https://healio.de/images/erklaervideo-zahn-poster.jpg',
  'heilpraktiker-patienten-finanzierung-gesundheitsbudget': 'https://healio.de/images/video-partner-thumb.jpg',
  'digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung': 'https://healio.de/images/healio-app-dashboard-card.webp',
  'gesundheitsbudget-3000-euro': 'https://healio.de/images/healio-gesundheitsbudget-v2.png',
  'naturheilkunde-krankenkasse-2026': 'https://healio.de/images/hero-ambulant.webp',
  'kassenbonus-was-ist-drin': 'https://healio.de/images/kassenboost-bridge-og.png',
  'krankenkasse-wechseln-laufende-behandlung': 'https://healio.de/images/hero-ambulant.webp',
  'zahnersatz-beitrag-vom-bonus': 'https://healio.de/images/erklaervideo-zahn-poster.jpg',
  'ikk-classic-bonus-schritt-fuer-schritt': 'https://healio.de/images/kassenboost-bridge-og.png',
  'bkv-und-kassenbonus-fuer-arbeitgeber': 'https://healio.de/images/hero-unternehmen-b2b.png',
  'kassenbonus-schwangerschaft-vorsorge': 'https://healio.de/images/hero-hebammen.webp',
  'hebammen-gesundheitsbudget-erklaeren': 'https://healio.de/images/hero-hebammen.webp',
});

const RELATED_LINKS = {
  'healio-konzept-fuer-hebammen': [
    { href: '/hebammen', label: 'Healio für Hebammen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'So entsteht das Gesundheitsbudget' },
    { href: '/ratgeber/osteopathie-krankenkasse', label: 'Osteopathie und Krankenkassenzuschüsse' },
  ],
  'healio-konzept-fuer-tcm-praxen': [
    { href: '/partner', label: 'Healio-Partner für Praxen werden' },
    { href: '/blog/naturheilkunde-krankenkasse-2026', label: 'Naturheilkunde und Kassenleistungen' },
    { href: '/ratgeber/heilpraktiker-zusatzversicherung', label: 'Zusatzschutz für Naturheilverfahren vergleichen' },
  ],
  'healio-konzept-fuer-osteopathen': [
    { href: '/partner', label: 'Healio-Partner für Praxen werden' },
    { href: '/ratgeber/osteopathie-krankenkasse', label: 'Welche Krankenkasse Osteopathie bezuschusst' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Gesundheitsbudget verständlich erklärt' },
  ],
  'healio-konzept-fuer-heilpraktiker': [
    { href: '/partner', label: 'Das Healio-Partnermodell' },
    { href: '/blog/heilpraktiker-patienten-finanzierung-gesundheitsbudget', label: 'Heilpraktiker-Kosten besser planbar machen' },
    { href: '/ratgeber/heilpraktiker-zusatzversicherung', label: 'Heilpraktiker-Zusatzschutz vergleichen' },
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
    { href: '/ratgeber/ikk-classic-bonusprogramm-2026', label: 'IKK classic Bonusprogramm 2026 erklärt' },
  ],
  'naturheilkunde-krankenkasse-2026': [
    { href: '/ambulant', label: 'Naturheilkunde mit Zusatzschutz absichern' },
    { href: '/ratgeber/heilpraktiker-kosten', label: 'Kosten für Heilpraktiker-Behandlungen' },
    { href: '/ratgeber/osteopathie-krankenkasse', label: 'Osteopathie-Zuschüsse vergleichen' },
  ],
  'kassenbonus-was-ist-drin': [
    { href: '/kassenbonus', label: 'Kassenbonus auf der Healio-Seite verstehen' },
    { href: '/blog/ikk-classic-bonus-schritt-fuer-schritt', label: 'IKK-Bonus Schritt für Schritt beantragen' },
    { href: '/blog/gesundheitsbudget-3000-euro', label: 'Gesundheitsbudget von bis zu 3.000 EUR verstehen' },
  ],
  'krankenkasse-wechseln-laufende-behandlung': [
    { href: '/kassenbonus', label: 'Kassenbonus realistisch einordnen lassen' },
    { href: '/ambulant', label: 'Ambulanten Zusatzschutz vor dem Wechsel prüfen' },
    { href: '/blog/kassenbonus-was-ist-drin', label: 'Kassenbonus: Was wirklich drin ist' },
  ],
  'zahnersatz-beitrag-vom-bonus': [
    { href: '/zahn', label: 'Zahnzusatzversicherung nach Ausgangslage prüfen' },
    { href: '/blog/zahnzusatzversicherung-trotz-angeratener-behandlung', label: 'Sofortschutz bei angeratener Behandlung verstehen' },
    { href: '/blog/kassenbonus-was-ist-drin', label: 'Kassenbonus als Zuschuss zum Beitrag nutzen' },
  ],
  'ikk-classic-bonus-schritt-fuer-schritt': [
    { href: '/kassenbonus', label: 'Kassenbonus auf der Healio-Seite einordnen' },
    { href: '/blog/kassenbonus-was-ist-drin', label: 'Kassenbonus: Was ist wirklich drin?' },
    { href: '/ambulant', label: 'Zuschuss für ambulanten Zusatzschutz nutzen' },
  ],
  'bkv-und-kassenbonus-fuer-arbeitgeber': [
    { href: '/unternehmen', label: 'Healio-Vorsorge-Check für Unternehmen ansehen' },
    { href: '/kassenbonus', label: 'Kassenbonus für Mitarbeiter erklärt finden' },
    { href: '/blog/kassenbonus-was-ist-drin', label: 'Kassenbonus einfach erklärt für Mitarbeiter' },
  ],
  'kassenbonus-schwangerschaft-vorsorge': [
    { href: '/schwangerschaft', label: 'Healio-Seite zur Schwangerschaft ansehen' },
    { href: '/blog/kassenbonus-was-ist-drin', label: 'Kassenbonus: Was wirklich drin ist' },
    { href: '/blog/ikk-classic-bonus-schritt-fuer-schritt', label: 'IKK-Bonus Schritt für Schritt beantragen' },
  ],
  'hebammen-gesundheitsbudget-erklaeren': [
    { href: '/hebammen', label: 'Healio-Konzept für Hebammen ansehen' },
    { href: '/blog/healio-konzept-fuer-hebammen', label: 'Das Healio-Konzept für Hebammen lesen' },
    { href: '/blog/kassenbonus-schwangerschaft-vorsorge', label: 'Kassenbonus in der Schwangerschaft verstehen' },
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
  // Das freigegebene Markenmotiv gilt auch für ältere Bildangaben aus der Content-API.
  if (article?.slug === 'gesundheitsbudget-3000-euro') {
    return BLOG_ARTICLE_IMAGES[article.slug];
  }

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
