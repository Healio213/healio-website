import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const routeMap = {
  de: {
    home: '/',
    about: '/about',
    leistungen: '/leistungen',
    ambulant: '/ambulant',
    zahn: '/zahn',
    'healio-zahnzusatz': '/healio-zahnzusatz',
    stationaer: '/stationaer',
    'klinik-upgrade': '/klinik-upgrade',
    partner: '/partner',
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
    ambulant: '/en/outpatient',
    zahn: '/en/dental',
    'healio-zahnzusatz': '/en/healio-dental',
    stationaer: '/en/inpatient',
    'klinik-upgrade': '/en/hospital-upgrade',
    partner: '/en/partner',
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
  // Prefix match for dynamic routes (e.g., /blog/slug)
  for (const [key, path] of Object.entries(routes)) {
    if (pathname.startsWith(path + '/')) return key;
  }
  return null;
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
    const targetLang = lang === 'de' ? 'en' : 'de';
    const routeKey = findRouteKey(pathname, lang);

    if (routeKey) {
      const targetPath = routeMap[targetLang][routeKey];
      // Preserve sub-paths (e.g., /blog/my-article -> /en/blog/my-article)
      const basePath = routeMap[lang][routeKey];
      const suffix = pathname.slice(basePath.length);
      navigate(targetPath + suffix);
    } else {
      navigate(targetLang === 'en' ? '/en' : '/');
    }
  };

  return { lang, getPath, switchLanguage };
}
