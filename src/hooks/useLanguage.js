import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const routeMap = {
  de: {
    home: '/',
    about: '/about',
    leistungen: '/leistungen',
    kassenboost: '/kassenboost',
    kassenbonus: '/kassenbonus',
    ambulant: '/ambulant',
    zahn: '/zahn',
    'healio-zahnzusatz': '/healio-zahnzusatz',
    stationaer: '/stationaer',
    'klinik-upgrade': '/klinik-upgrade',
    unternehmen: '/unternehmen',
    vorsorgeRechner: '/unternehmen/vorsorge-rechner',
    partner: '/partner',
    hebammen: '/hebammen',
    heilberufeVorsorge: '/heilberufe-vorsorge',
    kontakt: '/kontakt',
    terminvereinbarung: '/terminvereinbarung',
    impressum: '/impressum',
    agb: '/agb',
    datenschutz: '/datenschutz',
    erstinformation: '/erstinformation',
    blog: '/blog',
    potenzialanalyse: '/potenzialanalyse',
    confirmation: '/confirmation',
    tierkrankenversicherung: '/tierkrankenversicherung',
  },
  en: {
    home: '/en',
    about: '/en/about',
    leistungen: '/en/services',
    kassenboost: '/en/kassenboost',
    kassenbonus: '/en/health-insurance-bonus',
    ambulant: '/en/outpatient',
    zahn: '/en/dental',
    'healio-zahnzusatz': '/en/healio-dental',
    stationaer: '/en/inpatient',
    'klinik-upgrade': '/en/hospital-upgrade',
    unternehmen: '/en/companies',
    vorsorgeRechner: '/en/companies/pension-calculator',
    partner: '/en/partner',
    hebammen: '/en/midwives',
    heilberufeVorsorge: '/en/healthcare-professionals-protection',
    kontakt: '/en/contact',
    terminvereinbarung: '/en/appointment',
    impressum: '/en/legal-notice',
    agb: '/en/terms',
    datenschutz: '/en/privacy',
    erstinformation: '/en/initial-information',
    blog: '/en/blog',
    potenzialanalyse: '/en/potential-analysis',
    confirmation: '/en/confirmation',
    tierkrankenversicherung: '/en/pet-insurance',
  }
};

// Reverse lookup: pathname -> routeKey
function findRouteKey(pathname, lang) {
  const routes = routeMap[lang];
  // Exact match first
  for (const [key, path] of Object.entries(routes)) {
    if (path === pathname) return key;
  }
  // Längsten Präfix zuerst prüfen, damit z. B. /en/blog/:slug nicht
  // irrtümlich als Unterpfad der englischen Startseite /en erkannt wird.
  const routesBySpecificity = Object.entries(routes)
    .sort(([, pathA], [, pathB]) => pathB.length - pathA.length);
  for (const [key, path] of routesBySpecificity) {
    if (key === 'home') continue;
    if (pathname.startsWith(`${path}/`)) return key;
  }
  return null;
}

export function getLanguageSwitchTarget(pathname, lang) {
  const targetLang = lang === 'de' ? 'en' : 'de';
  const routeKey = findRouteKey(pathname, lang);

  if (!routeKey) return targetLang === 'en' ? '/en' : '/';

  const basePath = routeMap[lang][routeKey];
  const suffix = pathname.slice(basePath.length);

  // Die Ratgeberartikel sind derzeit ausschließlich deutsch. Ein Wechsel
  // vom deutschen Artikel führt deshalb zum englischen Hub statt zu einer
  // vermeintlichen Übersetzung. Historische /en/blog/:slug-Aufrufe werden
  // dagegen zur deutschen Original-URL zurückgeführt.
  if (routeKey === 'blog' && suffix) {
    return lang === 'de'
      ? routeMap.en.blog
      : `${routeMap.de.blog}${suffix}`;
  }

  return `${routeMap[targetLang][routeKey]}${suffix}`;
}

export function useLanguage() {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const lang = pathname.startsWith('/en') ? 'en' : 'de';

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  const getPath = (routeKey) => routeMap[lang]?.[routeKey] || routeMap.de[routeKey] || '/';

  const switchLanguage = () => {
    navigate(getLanguageSwitchTarget(pathname, lang));
  };

  return { lang, getPath, switchLanguage };
}
