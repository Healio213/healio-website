import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import {
  HEALIO_PHONE_DISPLAY,
  HEALIO_PHONE_TEL,
  HEALIO_WHATSAPP_HUMAN_REPLY,
  HEALIO_WHATSAPP_URL,
} from '@/config/contactChannels';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';

// Gleicher kurzer Kontaktblock auf /ambulant, /zahn und /stationaer
// (Marktanalyse W6, 06.10.2026): Telefon, WhatsApp und Termin an einer Stelle,
// damit niemand für eine Rückfrage erst die Fußzeile suchen muss. Bewusst ohne
// Formular und ohne ?text= im WhatsApp-Link, damit keine Gesundheitsangaben in
// einer URL landen. Solange zuerst Nita auf WhatsApp antwortet, sagt der
// Hinweis das offen (contactChannels.js).
const COPY = {
  de: {
    title: 'Lieber kurz mit uns sprechen?',
    text: 'Für Fragen zu deiner Situation erreichst du uns per Telefon und WhatsApp. Ein unverbindliches Erstgespräch kannst du direkt online buchen.',
    phoneAria: `Healio anrufen: ${HEALIO_PHONE_DISPLAY}`,
    whatsapp: 'WhatsApp',
    whatsappAria: 'WhatsApp mit Healio öffnen, externer Dienst (neuer Tab)',
    appointment: 'Termin buchen',
    externalService: 'WhatsApp ist ein externer Dienst.',
    nitaFirst: 'Allgemeine Fragen beantwortet dort zuerst Nita, unsere digitale Assistenz.',
    privacy: 'Bitte schick über WhatsApp keine Gesundheitsdaten, Befunde, Versicherungsnummern oder Dokumente.',
    privacyLink: 'Mehr zum Datenschutz',
    privacyPath: '/datenschutz#whatsapp-kontakt',
  },
  en: {
    title: 'Prefer to talk to us?',
    text: 'For questions about your situation, you can reach us by phone and WhatsApp. You can book a non-binding first call directly online.',
    phoneAria: `Call Healio: ${HEALIO_PHONE_DISPLAY}`,
    whatsapp: 'WhatsApp',
    whatsappAria: 'Open WhatsApp with Healio, external service (new tab)',
    appointment: 'Book an appointment',
    externalService: 'WhatsApp is an external service.',
    nitaFirst: 'General questions there are answered first by Nita, our digital assistant.',
    privacy: 'Please do not send health data, medical findings, insurance numbers or documents via WhatsApp.',
    privacyLink: 'More on privacy',
    privacyPath: '/en/privacy',
  },
};

const buttonBase = 'home-focus inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-5 font-display text-base font-extrabold transition sm:w-auto';

const ZielseitenKontakt = ({ placement, className = '' }) => {
  const { lang, getPath } = useLanguage();
  const copy = COPY[lang === 'en' ? 'en' : 'de'];
  const headingId = `zielseiten-kontakt-${placement}`;

  return (
    <section className={`px-4 py-8 sm:px-6 md:py-12 lg:px-8 ${className}`} aria-labelledby={headingId} data-healio-contact-block={placement}>
      <div className="mx-auto grid max-w-7xl items-center gap-6 rounded-[2rem] border border-emerald-900/10 bg-white p-6 shadow-[0_18px_50px_rgba(7,17,31,0.07)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10">
        <div className="min-w-0">
          <h2 id={headingId} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.03em] text-home-midnight sm:text-3xl">
            {copy.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-home-slate">{copy.text}</p>
          <p className="mt-3 max-w-2xl text-xs leading-5 text-slate-500" data-healio-whatsapp-privacy-note="">
            {copy.externalService}{' '}
            {!HEALIO_WHATSAPP_HUMAN_REPLY && `${copy.nitaFirst} `}
            {copy.privacy}{' '}
            <Link to={copy.privacyPath} className="font-semibold text-emerald-800 underline underline-offset-4 hover:text-emerald-950">
              {copy.privacyLink}
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col lg:flex-nowrap">
          <a href={HEALIO_PHONE_TEL} aria-label={copy.phoneAria} className={`${buttonBase} bg-home-midnight text-white hover:bg-[#143247]`}>
            <Phone className="h-5 w-5" aria-hidden="true" />
            {HEALIO_PHONE_DISPLAY}
          </a>
          <a
            href={HEALIO_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.whatsappAria}
            data-healio-whatsapp={`inline-${placement}`}
            onClick={() => trackEvent('whatsapp_contact_click', {
              component: 'whatsapp',
              destination: 'whatsapp',
              placement: `contact-block-${placement}`,
            })}
            className={`${buttonBase} bg-[#075E54] text-white hover:bg-[#064E47]`}
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {copy.whatsapp}
          </a>
          <Link to={getPath('terminvereinbarung')} className={`${buttonBase} border-2 border-home-midnight/15 bg-white text-home-midnight hover:border-home-mint hover:bg-home-ice`}>
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            {copy.appointment}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ZielseitenKontakt;
