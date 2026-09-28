import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import {
  HEALIO_PHONE_DISPLAY,
  HEALIO_PHONE_TEL,
  HEALIO_VOICE_CONTACT_ENABLED,
  HEALIO_WHATSAPP_HELP_ENABLED,
  HEALIO_WHATSAPP_HUMAN_REPLY,
  HEALIO_WHATSAPP_URL,
} from '@/config/contactChannels';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';

// Inline-Gegenstück zum schwebenden WhatsApp-Kreis. Bewusst ohne ?text= und ohne
// Seitenpfad im Link, damit keine Gesundheitsangaben in einer URL landen.
// Die Texte sind nur auf Deutsch freigegeben, englische Seiten bleiben ohne Baustein.

const NITA_FIRST = 'Allgemeine Fragen beantwortet zuerst Nita, unsere digitale Assistenz.';

export const useWhatsAppHelp = () => {
  const { lang } = useLanguage();
  return HEALIO_WHATSAPP_HELP_ENABLED && lang === 'de';
};

// „persönlich“ nur, wenn ein Mensch die WhatsApp-Nachrichten beantwortet.
export const whatsAppHelpReply = (topic = '') => {
  const about = topic ? ` zu ${topic}` : '';
  return HEALIO_WHATSAPP_HUMAN_REPLY
    ? `Wir beantworten deine Fragen${about} persönlich per WhatsApp.`
    : `Wir beantworten deine Fragen${about} per WhatsApp. ${NITA_FIRST}`;
};

export const WHATSAPP_HELP_TITLE = 'Noch Fragen zu deiner Situation?';
export const WHATSAPP_HELP_TEXT = `Zögere nicht und frag uns. ${whatsAppHelpReply()}`;

const WhatsAppHelpHint = ({
  placement,
  title,
  text = WHATSAPP_HELP_TEXT,
  cta = 'Frage per WhatsApp stellen',
  variant = 'block',
  tone = 'light',
  headingLevel = 'h3',
  surface,
  className = '',
}) => {
  const visible = useWhatsAppHelp();
  if (!visible) return null;

  const dark = tone === 'dark';
  const isBlock = variant === 'block';
  const Heading = headingLevel;
  const muted = dark ? 'text-slate-300' : 'text-slate-600';
  const linkTone = dark
    ? 'text-[#5ee0b1] decoration-[#5ee0b1]/50 hover:decoration-[#5ee0b1] focus-visible:outline-[#5ee0b1]'
    : 'text-[#075E54] decoration-[#075E54]/40 hover:decoration-[#075E54] focus-visible:outline-[#075E54]';
  const focus = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4';
  const textLink = `font-semibold underline underline-offset-4 ${linkTone} ${focus}`;
  const onClick = () => trackEvent('whatsapp_contact_click', {
    component: 'whatsapp',
    destination: 'whatsapp',
    placement,
  });
  const whatsappLink = {
    href: HEALIO_WHATSAPP_URL,
    target: '_blank',
    rel: 'noopener noreferrer',
    'data-healio-whatsapp': `inline-${placement}`,
    'aria-label': `${cta} (WhatsApp, externer Dienst, neuer Tab)`,
    onClick,
  };

  const privacy = (
    <p data-healio-whatsapp-help-privacy="" className={`mt-3 text-xs leading-relaxed ${muted}`}>
      {!isBlock && !HEALIO_WHATSAPP_HUMAN_REPLY && `${NITA_FIRST} `}
      WhatsApp ist ein externer Dienst. Bitte schick dort keine Gesundheitsdaten, Befunde, Versicherungsnummern oder Dokumente.{' '}
      <Link to="/datenschutz#whatsapp-kontakt" className={textLink}>Mehr zum Datenschutz</Link>
    </p>
  );

  if (!isBlock) {
    return (
      <div data-healio-whatsapp-help={placement} className={className}>
        <p className={`text-sm leading-relaxed ${muted}`}>
          {text}{' '}
          <a {...whatsappLink} className={`inline-flex items-center gap-1.5 ${textLink}`}>
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {cta}
          </a>
        </p>
        {privacy}
      </div>
    );
  }

  return (
    <div
      data-healio-whatsapp-help={placement}
      className={`rounded-2xl p-6 sm:p-7 ${surface || (dark ? 'bg-white/10' : 'bg-white')} ${dark ? 'text-white' : 'text-[#071726]'} ${className}`}
    >
      {title && <Heading className="font-display text-xl font-bold">{title}</Heading>}
      <p className={`${title ? 'mt-2 ' : ''}max-w-prose leading-relaxed ${muted}`}>{text}</p>
      <a
        {...whatsappLink}
        className={`mt-5 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#075E54] py-2 pl-2 pr-6 font-semibold text-white transition-colors hover:bg-[#064E47] ${focus} ${dark ? 'focus-visible:outline-white' : 'focus-visible:outline-[#075E54]'}`}
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#064E47]" aria-hidden="true">
          <MessageCircle className="h-5 w-5" strokeWidth={2.4} />
        </span>
        {cta}
      </a>
      {HEALIO_VOICE_CONTACT_ENABLED && (
        <p className={`mt-4 text-sm leading-relaxed ${muted}`}>
          Lieber am Telefon? Ruf uns an unter{' '}
          <a href={HEALIO_PHONE_TEL} className={textLink}>{HEALIO_PHONE_DISPLAY}</a>, wir beantworten deine Fragen direkt am Telefon.
        </p>
      )}
      {privacy}
    </div>
  );
};

export default WhatsAppHelpHint;
