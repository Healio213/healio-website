import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import deCommon from './locales/de/common.json';
import enCommon from './locales/en/common.json';
import deHome from './locales/de/home.json';
import enHome from './locales/en/home.json';
import deAmbulant from './locales/de/ambulant.json';
import enAmbulant from './locales/en/ambulant.json';
import deAmbulantFaq from './locales/de/ambulant-faq.json';
import enAmbulantFaq from './locales/en/ambulant-faq.json';
import deZahn from './locales/de/zahn.json';
import enZahn from './locales/en/zahn.json';
import deStationaer from './locales/de/stationaer.json';
import enStationaer from './locales/en/stationaer.json';
import dePartner from './locales/de/partner.json';
import enPartner from './locales/en/partner.json';
import deLeistungen from './locales/de/leistungen.json';
import enLeistungen from './locales/en/leistungen.json';
import deAbout from './locales/de/about.json';
import enAbout from './locales/en/about.json';
import deContact from './locales/de/contact.json';
import enContact from './locales/en/contact.json';
import deLegal from './locales/de/legal.json';
import enLegal from './locales/en/legal.json';
import deVeterinary from './locales/de/veterinary.json';
import enVeterinary from './locales/en/veterinary.json';
import deSeo from './locales/de/seo.json';
import enSeo from './locales/en/seo.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        common: deCommon,
        home: deHome,
        ambulant: deAmbulant,
        'ambulant-faq': deAmbulantFaq,
        zahn: deZahn,
        stationaer: deStationaer,
        partner: dePartner,
        leistungen: deLeistungen,
        about: deAbout,
        contact: deContact,
        legal: deLegal,
        veterinary: deVeterinary,
        seo: deSeo,
      },
      en: {
        common: enCommon,
        home: enHome,
        ambulant: enAmbulant,
        'ambulant-faq': enAmbulantFaq,
        zahn: enZahn,
        stationaer: enStationaer,
        partner: enPartner,
        leistungen: enLeistungen,
        about: enAbout,
        contact: enContact,
        legal: enLegal,
        veterinary: enVeterinary,
        seo: enSeo,
      },
    },
    lng: 'de',
    fallbackLng: 'de',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
