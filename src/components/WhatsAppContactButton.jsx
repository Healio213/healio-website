import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { HEALIO_WHATSAPP_URL } from '@/config/contactChannels';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';

const WhatsAppContactButton = () => {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const isAmbulant = pathname === '/ambulant' || pathname === '/en/outpatient';
  const ariaLabel = lang === 'en'
    ? 'Open WhatsApp chat with Healio (new tab)'
    : 'WhatsApp-Chat mit Healio öffnen (neuer Tab)';

  return (
    <>
      <style>{`
        .healio-whatsapp-floating {
          position: fixed;
          right: max(0.75rem, env(safe-area-inset-right));
          bottom: calc(1rem + env(safe-area-inset-bottom));
          z-index: 80;
          transition: opacity 180ms ease, transform 180ms ease, visibility 180ms ease;
        }
        .healio-whatsapp-floating--ambulant {
          bottom: calc(5rem + env(safe-area-inset-bottom));
        }
        html.healio-consent-ui-active .healio-whatsapp-floating,
        html.healio-mobile-menu-active .healio-whatsapp-floating {
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transform: translateY(0.5rem);
        }
        @media (min-width: 768px) {
          .healio-whatsapp-floating,
          .healio-whatsapp-floating--ambulant {
            right: max(1.5rem, env(safe-area-inset-right));
            bottom: calc(1.5rem + env(safe-area-inset-bottom));
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .healio-whatsapp-floating {
            transition: none;
          }
        }
        @media print {
          .healio-whatsapp-floating {
            display: none !important;
          }
        }
      `}</style>

      <a
        href={HEALIO_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        data-healio-whatsapp="floating"
        onClick={() => trackEvent('whatsapp_contact_click', {
          component: 'whatsapp',
          destination: 'whatsapp',
          placement: 'floating',
        })}
        className={`healio-whatsapp-floating ${isAmbulant ? 'healio-whatsapp-floating--ambulant' : ''} group inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#075E54] p-0 text-white shadow-[0_10px_30px_rgba(2,44,39,0.28)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#064E47] hover:shadow-[0_12px_34px_rgba(2,44,39,0.34)] active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075E54] motion-reduce:transform-none motion-reduce:transition-none`}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-[#064E47]" aria-hidden="true">
          <MessageCircle className="h-[21px] w-[21px]" strokeWidth={2.4} />
        </span>
      </a>
    </>
  );
};

export default WhatsAppContactButton;
