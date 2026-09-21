import React from 'react';
import { useLocation } from 'react-router-dom';
import ExternalProviderGate from '@/components/ExternalProviderGate';
import { APPOINTMENT_BOOKING, getSafeAppointmentEmbedUrl } from '@/lib/appointmentBooking';
import { trackMetaLead } from '@/lib/meta-pixel';

// Keep this file as a compatibility entry point; booking configuration is provider-neutral.
const AppointmentBooking = ({
  className = 'h-[600px] md:h-[700px]',
  title,
}) => {
  const { pathname } = useLocation();
  const english = pathname === '/en' || pathname.startsWith('/en/');
  const frameTitle = title || (english ? 'Google Calendar appointment booking' : 'Google Kalender zur Terminvereinbarung');
  const safeUrl = getSafeAppointmentEmbedUrl(APPOINTMENT_BOOKING.embedUrl);

  return (
    <ExternalProviderGate
      provider={APPOINTMENT_BOOKING.provider}
      externalUrl={APPOINTMENT_BOOKING.url}
      placeholderClassName={className}
      embedAvailable={Boolean(safeUrl)}
    >
      {safeUrl && <div className={`flex w-full flex-col ${className}`}>
        <iframe
          src={safeUrl}
          title={frameTitle}
          aria-label={frameTitle}
          className="min-h-0 w-full flex-1 border-0"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <a
          href={APPOINTMENT_BOOKING.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackMetaLead()}
          className="shrink-0 px-4 py-3 text-center text-sm font-semibold text-slate-700 underline underline-offset-2"
        >
          {english ? 'Calendar not loading? Open directly in Google Calendar.' : 'Kalender lädt nicht? Direkt in Google Kalender öffnen.'}
        </a>
      </div>}
    </ExternalProviderGate>
  );
};

export default AppointmentBooking;
