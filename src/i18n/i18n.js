import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import deCommon from './locales/de/common.json';
import enCommon from './locales/en/common.json';

// Navigation und Kontaktknöpfe liegen außerhalb der Seiten-Suspense. Ihr
// kleiner gemeinsamer Namensraum bleibt sofort verfügbar; die übrigen
// Übersetzungen lädt useTranslation erst für die tatsächlich besuchte Seite.
const localeLoaders = import.meta.glob('./locales/*/*.json');
const initialLanguage = typeof window !== 'undefined' && window.location.pathname.startsWith('/en')
  ? 'en'
  : 'de';

const localeBackend = {
  type: 'backend',
  read(language, namespace, callback) {
    const load = localeLoaders[`./locales/${language}/${namespace}.json`];
    if (!load) {
      callback(new Error(`Unknown translation namespace: ${language}/${namespace}`), false);
      return;
    }

    load().then(
      (module) => callback(null, module.default),
      (error) => callback(error, false),
    );
  },
};

i18n
  .use(localeBackend)
  .use(initReactI18next)
  .init({
    resources: {
      de: { common: deCommon },
      en: { common: enCommon },
    },
    partialBundledLanguages: true,
    ns: ['common'],
    lng: initialLanguage,
    fallbackLng: 'de',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
