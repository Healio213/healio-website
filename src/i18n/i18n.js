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
import deKassenbonus from './locales/de/kassenbonus.json';
import enKassenbonus from './locales/en/kassenbonus.json';
import deZahn from './locales/de/zahn.json';
import enZahn from './locales/en/zahn.json';
import deStationaer from './locales/de/stationaer.json';
import enStationaer from './locales/en/stationaer.json';
import dePartner from './locales/de/partner.json';
import enPartner from './locales/en/partner.json';
import deHebammen from './locales/de/hebammen.json';
import deZahnaerzte from './locales/de/zahnaerzte.json';
import enHebammen from './locales/en/hebammen.json';
import enZahnaerzte from './locales/en/zahnaerzte.json';
import deUnternehmen from './locales/de/unternehmen.json';
import enUnternehmen from './locales/en/unternehmen.json';
import deHeilberufe from './locales/de/heilberufe.json';
import enHeilberufe from './locales/en/heilberufe.json';
import deLeistungen from './locales/de/leistungen.json';
import enLeistungen from './locales/en/leistungen.json';
import deKassenBoost from './locales/de/kassenboost.json';
import enKassenBoost from './locales/en/kassenboost.json';
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
import deTiktok from './locales/de/tiktok.json';
import enTiktok from './locales/en/tiktok.json';
import deInstagram from './locales/de/instagram.json';
import enInstagram from './locales/en/instagram.json';
import deBlog from './locales/de/blog.json';
import enBlog from './locales/en/blog.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      de: {
        common: deCommon,
        home: deHome,
        ambulant: deAmbulant,
        'ambulant-faq': deAmbulantFaq,
        kassenbonus: deKassenbonus,
        zahn: deZahn,
        stationaer: deStationaer,
        partner: dePartner,
        hebammen: deHebammen,
        zahnaerzte: deZahnaerzte,
        unternehmen: deUnternehmen,
        heilberufe: deHeilberufe,
        leistungen: deLeistungen,
        kassenboost: deKassenBoost,
        about: deAbout,
        contact: deContact,
        legal: deLegal,
        veterinary: deVeterinary,
        seo: deSeo,
        tiktok: deTiktok,
        instagram: deInstagram,
        blog: deBlog,
      },
      en: {
        common: enCommon,
        home: enHome,
        ambulant: enAmbulant,
        'ambulant-faq': enAmbulantFaq,
        kassenbonus: enKassenbonus,
        zahn: enZahn,
        stationaer: enStationaer,
        partner: enPartner,
        hebammen: enHebammen,
        zahnaerzte: enZahnaerzte,
        unternehmen: enUnternehmen,
        heilberufe: enHeilberufe,
        leistungen: enLeistungen,
        kassenboost: enKassenBoost,
        about: enAbout,
        contact: enContact,
        legal: enLegal,
        veterinary: enVeterinary,
        seo: enSeo,
        tiktok: enTiktok,
        instagram: enInstagram,
        blog: enBlog,
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
