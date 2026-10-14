const CTA_ROUTES = {
  outpatient: {
    de: '/ambulant',
    en: '/en/outpatient',
  },
  outpatientComparison: {
    de: '/ambulant#tarif-tabelle',
    en: '/en/outpatient#tarif-tabelle',
  },
  healthBudget: {
    de: '/ambulant#bonus-calculator',
    en: '/en/outpatient#bonus-calculator',
  },
  bonus: {
    de: '/ambulant#bonus-calculator',
    en: '/en/outpatient#bonus-calculator',
  },
  healthFund: {
    de: '/ambulant#ikk-wechsel',
    en: '/en/outpatient#ikk-wechsel',
  },
  dental: {
    de: '/zahn#zahn-check',
    en: '/en/dental#zahn-check',
  },
  inpatient: {
    de: '/stationaer',
    en: '/en/inpatient',
  },
  partner: {
    de: '/partner',
    en: '/en/partner',
  },
  midwives: {
    de: '/hebammen',
    en: '/en/midwives',
  },
  employer: {
    de: '/potenzialanalyse',
    en: '/en/potential-analysis',
  },
  services: {
    de: '/leistungen',
    en: '/en/services',
  },
};

const ARTICLE_CTA_KEYS = {
  'krankenhauszusatzversicherung-sportverein-best-ager': 'inpatient',
  'zahnersatz-beitrag-vom-bonus': 'dental',
  'gesundheitsbudget-3000-euro': 'healthBudget',
  'naturheilkunde-krankenkasse-2026': 'healthFund',
  'healio-konzept-fuer-heilpraktiker': 'partner',
  'heilpraktiker-patienten-finanzierung-gesundheitsbudget': 'partner',
  'digitale-erstattung-heilpraktiker-rechnungen-zusatzversicherung': 'partner',
  'healio-konzept-fuer-hebammen': 'midwives',
  'healio-konzept-fuer-tcm-praxen': 'partner',
  'healio-konzept-fuer-osteopathen': 'partner',
};

const TARGET_GROUP_DEFAULTS = {
  endkunden: 'outpatient',
  arbeitgeber: 'employer',
  heilpraktiker: 'partner',
  osteopathen: 'partner',
  tcm: 'partner',
  hebammen: 'midwives',
  optiker: 'partner',
  hoerakustiker: 'partner',
  physiotherapeut: 'partner',
  physiotherapie: 'partner',
};

export const getBlogArticleCta = ({ slug = '', targetGroup = '', lang = 'de' } = {}) => {
  const articleCopyKey = Object.prototype.hasOwnProperty.call(ARTICLE_CTA_KEYS, slug)
    ? ARTICLE_CTA_KEYS[slug]
    : null;
  const targetGroupCopyKey = Object.prototype.hasOwnProperty.call(TARGET_GROUP_DEFAULTS, targetGroup)
    ? TARGET_GROUP_DEFAULTS[targetGroup]
    : null;
  const copyKey = articleCopyKey || targetGroupCopyKey || 'services';
  const locale = lang === 'en' ? 'en' : 'de';

  return {
    href: CTA_ROUTES[copyKey][locale],
    copyKey,
  };
};
