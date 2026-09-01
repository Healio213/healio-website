const ENTRY_POINTS = new Set(['global_launcher', 'delayed_prompt']);

const EXACT_ROUTE_CONTEXTS = new Map([
  ['/', ['home', 'general']],
  ['/en', ['home', 'general']],
  ['/leistungen', ['services', 'general']],
  ['/en/services', ['services', 'general']],
  ['/ambulant', ['outpatient', 'outpatient']],
  ['/en/outpatient', ['outpatient', 'outpatient']],
  ['/heilpraktiker-zusatzversicherung', ['outpatient', 'outpatient']],
  ['/Ambulante-zusatzversicherung', ['outpatient', 'outpatient']],
  ['/zahn', ['dental', 'dental']],
  ['/en/dental', ['dental', 'dental']],
  ['/healio-zahnzusatz', ['dental', 'dental']],
  ['/en/healio-dental', ['dental', 'dental']],
  ['/stationaer', ['inpatient', 'inpatient']],
  ['/en/inpatient', ['inpatient', 'inpatient']],
  ['/klinik-upgrade', ['inpatient', 'inpatient']],
  ['/en/hospital-upgrade', ['inpatient', 'inpatient']],
  ['/about', ['about', 'general']],
  ['/en/about', ['about', 'general']],
  ['/unternehmen', ['companies', 'general']],
  ['/en/companies', ['companies', 'general']],
  ['/partner', ['partner', 'general']],
  ['/en/partner', ['partner', 'general']],
  ['/hebammen', ['midwives', 'inpatient']],
  ['/en/midwives', ['midwives', 'inpatient']],
  ['/zahnaerzte', ['dentists', 'dental']],
  ['/heilberufe-vorsorge', ['healthcare_professionals', 'general']],
  ['/lebenshilfe', ['life_support', 'general']],
  ['/kontakt', ['contact', 'general']],
  ['/en/contact', ['contact', 'general']],
  ['/terminvereinbarung', ['appointment', 'general']],
  ['/en/appointment', ['appointment', 'general']],
  ['/tiktok', ['social', 'general']],
  ['/en/tiktok', ['social', 'general']],
  ['/instagram', ['social', 'general']],
  ['/en/instagram', ['social', 'general']],
  ['/potenzialanalyse', ['potential_analysis', 'general']],
  ['/en/potential-analysis', ['potential_analysis', 'general']],
  ['/confirmation', ['confirmation', 'general']],
  ['/en/confirmation', ['confirmation', 'general']],
  ['/app-bestaetigt', ['account', 'general']],
  ['/reset-password', ['account', 'general']],
  ['/tierkrankenversicherung', ['pet_insurance', 'general']],
  ['/en/pet-insurance', ['pet_insurance', 'general']],
]);

const LEGAL_ROUTES = new Set([
  '/impressum',
  '/en/legal-notice',
  '/agb',
  '/en/terms',
  '/datenschutz',
  '/en/privacy',
  '/erstinformation',
  '/en/initial-information',
  '/konto-loeschen',
]);

const normalizePathname = (value) => {
  if (typeof value !== 'string') return '/';
  const pathname = value.split(/[?#]/, 1)[0] || '/';
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
};

const isPathWithin = (pathname, prefix) => (
  pathname === prefix || pathname.startsWith(`${prefix}/`)
);

export const sanitizeNitaEntryPoint = (value) => (
  ENTRY_POINTS.has(value) ? value : 'global_launcher'
);

export const buildNitaContext = (pathnameValue, entryPoint = 'global_launcher') => {
  const pathname = normalizePathname(pathnameValue);
  const language = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
  let [page, product] = EXACT_ROUTE_CONTEXTS.get(pathname) || ['other', 'general'];

  if (isPathWithin(pathname, '/blog') || isPathWithin(pathname, '/en/blog')) {
    page = 'blog';
    product = 'general';
  } else if (isPathWithin(pathname, '/auth')) {
    page = 'account';
    product = 'general';
  } else if (LEGAL_ROUTES.has(pathname)) {
    page = 'legal';
    product = 'general';
  }

  return Object.freeze({
    healio_language: language,
    healio_product: product,
    healio_page: page,
    healio_entry_point: sanitizeNitaEntryPoint(entryPoint),
  });
};

const FIRST_MESSAGES = {
  de: {
    outpatient: {
      global_launcher: 'Hallo, ich bin Nita. Soll ich dir den ambulanten Schutz kurz erklären, die Tarife einordnen oder dich beim Abschluss begleiten?',
      delayed_prompt: 'Sehr gern. Beim ambulanten Healio-Konzept kombinierst du Zusatzschutz und auf Wunsch den IKK-Bonus. So kann ein Gesundheitsbudget von bis zu 3.000 EUR in 2 Jahren entstehen. Soll ich dir zuerst die Leistungen erklären oder direkt beim Tarifabschluss helfen?',
    },
    dental: {
      global_launcher: 'Hallo, ich bin Nita. Soll ich dir den Zahn-Check erklären, eine allgemeine Tariffrage beantworten oder dich beim Abschluss begleiten?',
      delayed_prompt: 'Sehr gern. Ich erkläre dir den passenden Weg beim Zahnschutz kurz und verständlich. Geht es dir zuerst um die Tarifunterschiede oder um den Online-Abschluss?',
    },
    inpatient: {
      global_launcher: 'Hallo, ich bin Nita. Soll ich dir den Klinikschutz kurz erklären, die Leistungen einordnen oder dich beim Abschluss begleiten?',
      delayed_prompt: 'Sehr gern. Der Klinikschutz kann dir je nach Tarif Chefarztbehandlung, ein besseres Zimmer und freie Krankenhauswahl bieten. Soll ich dir zuerst die Unterschiede erklären oder direkt beim Abschluss helfen?',
    },
    partner: {
      global_launcher: 'Hallo, ich bin Nita, die digitale Healio-Assistentin. Du musst keine Tarife erklären oder empfehlen. Soll ich dir zuerst die drei Rollen oder den Ablauf bis zum Kennenlernen zeigen?',
      delayed_prompt: 'Sehr gern. Deine Praxis informiert neutral, Patienten entscheiden freiwillig und Healio prüft und berät individuell. Soll ich mit den Rollen oder mit dem Ablauf starten?',
    },
    midwives: {
      global_launcher: 'Hallo, ich bin Nita, die digitale Healio-Assistentin. Du musst keine Tarife erklären oder empfehlen. Soll ich dir zuerst zeigen, wie du Familien neutral informierst oder wie Healio die nächsten Schritte übernimmt?',
      delayed_prompt: 'Sehr gern. Du gibst Familien einen neutralen Hinweis; Healio prüft Voraussetzungen und berät individuell. Soll ich zuerst mögliche Bausteine, die Kindernachversicherung oder die Zusammenarbeit erklären?',
    },
    dentists: {
      global_launcher: 'Hallo, ich bin Nita. Soll ich dir das Healio-Konzept für Zahnarztpraxen kurz erklären oder dich direkt zum passenden nächsten Schritt führen?',
      delayed_prompt: 'Sehr gern. Ich erkläre dir kurz, wie Healio Patienten beim passenden Zahnschutz unterstützt und deine Praxis entlastet. Womit möchtest du anfangen?',
    },
    healthcare_professionals: {
      global_launcher: 'Hallo, ich bin Nita. Soll ich dir das Vorsorgekonzept für Heilberufe kurz erklären oder dich direkt zum passenden nächsten Schritt führen?',
      delayed_prompt: 'Sehr gern. Ich erkläre dir das Vorsorgekonzept für Heilberufe kurz und verständlich. Geht es dir zuerst um Leistungen, Kosten oder den nächsten Schritt?',
    },
    general: {
      global_launcher: 'Hallo, ich bin Nita. Soll ich dir diese Seite kurz erklären oder dich direkt zum passenden nächsten Schritt führen?',
      delayed_prompt: 'Sehr gern. Ich erkläre dir das Healio-Konzept kurz und verständlich. Was möchtest du zuerst verstehen?',
    },
  },
  en: {
    outpatient: {
      global_launcher: 'Hi, I’m Nita. Would you like a short explanation of outpatient cover, help comparing plans, or guidance through the online application?',
      delayed_prompt: 'Of course. Healio combines supplementary outpatient cover with the optional IKK bonus, creating a health budget of up to EUR 3,000 over 2 years. Would you like to understand the benefits first or go straight to the online application?',
    },
    dental: {
      global_launcher: 'Hi, I’m Nita. Would you like me to explain the dental check, answer a general plan question, or guide you through the online application?',
      delayed_prompt: 'Of course. I can explain the suitable route to dental cover in a simple way. Would you like to start with the plan differences or the online application?',
    },
    inpatient: {
      global_launcher: 'Hi, I’m Nita. Would you like a short explanation of hospital cover, help comparing benefits, or guidance through the online application?',
      delayed_prompt: 'Of course. Depending on the plan, hospital cover can include specialist treatment, an upgraded room, and free choice of hospital. Would you like the differences explained first or help with the application?',
    },
    partner: {
      global_launcher: 'Hi, I’m Nita, Healio’s digital assistant. You do not need to explain or recommend plans. Would you like to start with the three roles or the path to an introductory meeting?',
      delayed_prompt: 'Of course. Your practice provides neutral information, patients decide freely, and Healio checks eligibility and advises individually. Shall I start with the roles or the process?',
    },
    midwives: {
      global_launcher: 'Hi, I’m Nita, Healio’s digital assistant. You do not need to explain or recommend plans. Would you like to see how to provide neutral information to families or how Healio handles the next steps?',
      delayed_prompt: 'Of course. You give families a neutral pointer; Healio checks eligibility and advises individually. Shall I start with possible components, newborn enrolment, or the partnership process?',
    },
    dentists: {
      global_launcher: 'Hi, I’m Nita. Would you like a short explanation of the Healio concept for dental practices or help with the next step?',
      delayed_prompt: 'Of course. I can briefly explain how Healio helps patients find suitable dental cover and supports the dental practice. Where would you like to start?',
    },
    healthcare_professionals: {
      global_launcher: 'Hi, I’m Nita. Would you like a short explanation of the protection concept for healthcare professionals or help with the next step?',
      delayed_prompt: 'Of course. I can explain the protection concept for healthcare professionals in a simple way. Would you like to start with benefits, costs, or the next step?',
    },
    general: {
      global_launcher: 'Hi, I’m Nita. Would you like a short explanation of this page or help with the next step?',
      delayed_prompt: 'Of course. I can explain the Healio concept in a simple way. What would you like to understand first?',
    },
  },
};

export const buildNitaFirstMessage = (context) => {
  const language = context?.healio_language === 'en' ? 'en' : 'de';
  const entryPoint = sanitizeNitaEntryPoint(context?.healio_entry_point);
  const messages = FIRST_MESSAGES[language];
  const pageMessages = messages[context?.healio_page];
  const productMessages = messages[context?.healio_product];
  return (pageMessages || productMessages || messages.general)[entryPoint];
};
