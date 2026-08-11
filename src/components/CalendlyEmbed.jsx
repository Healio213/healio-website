import React, { useEffect, useMemo } from 'react';
import ExternalProviderGate from '@/components/ExternalProviderGate';
import { trackEvent } from '@/lib/analytics';

const CALENDLY_ORIGIN = 'https://calendly.com';
const CALENDLY_PATH = '/healio-info/30min';

const getSafeCalendlyUrl = (value) => {
  try {
    const url = new URL(value);
    if (url.origin !== CALENDLY_ORIGIN || url.pathname !== CALENDLY_PATH) return null;
    url.hash = '';
    return url.toString();
  } catch {
    return null;
  }
};

const CalendlyEmbed = ({
  className = 'h-[600px] md:h-[700px]',
  placement = 'appointment_page',
  title = 'Calendly Terminvereinbarung',
  url,
}) => {
  const safeUrl = useMemo(() => getSafeCalendlyUrl(url), [url]);

  useEffect(() => {
    if (!safeUrl) return undefined;

    const handleCalendlyMessage = (event) => {
      if (event.origin !== CALENDLY_ORIGIN) return;
      if (event.data?.event !== 'calendly.event_scheduled') return;
      trackEvent('appointment_booked', {
        component: 'calendly',
        placement,
      });
    };

    window.addEventListener('message', handleCalendlyMessage);
    return () => window.removeEventListener('message', handleCalendlyMessage);
  }, [placement, safeUrl]);

  if (!safeUrl) return null;

  return (
    <ExternalProviderGate
      provider="calendly"
      externalUrl={safeUrl}
      placeholderClassName={className}
    >
      <iframe
        src={safeUrl}
        title={title}
        aria-label={title}
        className={`w-full border-0 ${className}`}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </ExternalProviderGate>
  );
};

export default CalendlyEmbed;
