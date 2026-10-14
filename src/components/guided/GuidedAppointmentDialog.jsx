import React, { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import AppointmentBooking from '@/components/CalendlyEmbed';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { PHONE_APPOINTMENT_BOOKING } from '@/lib/appointmentBooking';
import { GUIDED_CALLBACK_EVENT, GUIDED_CALLBACK_PREVIEW, GUIDED_PRODUCTS } from '@/lib/guided-callback';

export default function GuidedAppointmentDialog() {
  const { pathname } = useLocation();
  const { lang } = useLanguage();
  const de = lang === 'de';
  const [request, setRequest] = useState(null);
  const titleRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const open = (event) => {
      triggerRef.current = document.activeElement;
      setRequest({
        product: GUIDED_PRODUCTS[event.detail?.product] ? event.detail.product : 'any',
        tariff: typeof event.detail?.tariff === 'string' ? event.detail.tariff.slice(0, 140) : '',
      });
    };
    window.addEventListener(GUIDED_CALLBACK_EVENT, open);
    if (GUIDED_CALLBACK_PREVIEW) document.documentElement.classList.add('guided-preview-active');
    return () => {
      window.removeEventListener(GUIDED_CALLBACK_EVENT, open);
      document.documentElement.classList.remove('guided-preview-active');
    };
  }, []);
  useEffect(() => setRequest(null), [pathname]);

  return <>
    {GUIDED_CALLBACK_PREVIEW && <>
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div data-guided-preview-notice className="fixed inset-x-0 top-0 z-[119] flex h-7 items-center justify-center bg-[#DDF5E8] px-3 text-center text-[11px] font-semibold text-[#153C2B]">{de ? 'Vorschau · Es werden keine Termine gebucht.' : 'Preview · No appointments are booked.'}</div>
      <style>{`.guided-preview-active body{padding-top:28px}.guided-preview-active header{top:28px}`}</style>
    </>}
    <Dialog.Root open={Boolean(request)} onOpenChange={(open) => { if (!open) setRequest(null); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-[#061C17]/75" />
        <Dialog.Content className="fixed bottom-0 left-1/2 z-[121] max-h-[95dvh] w-full max-w-3xl -translate-x-1/2 overflow-y-auto rounded-t-2xl bg-[#F8FCF9] p-5 text-home-midnight shadow-[0_24px_80px_rgba(0,0,0,0.3)] outline-none sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8"
          onOpenAutoFocus={(event) => { event.preventDefault(); titleRef.current?.focus(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); if (triggerRef.current?.isConnected) triggerRef.current.focus(); }}>
          <Dialog.Close aria-label={de ? 'Schließen' : 'Close'} className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#355248] hover:bg-[#E6F2EA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#18543B]"><X className="h-5 w-5" aria-hidden="true" /></Dialog.Close>
          <Dialog.Title ref={titleRef} tabIndex={-1} className="pr-8 font-display text-[28px] font-extrabold leading-tight outline-none">{de ? 'Dein Termin mit Healio.' : 'Your appointment with Healio.'}</Dialog.Title>
          <Dialog.Description className="mt-3 text-base leading-7 text-[#355248]">{de ? 'Wähle eine passende Zeit. Wir klären deinen Schutz gemeinsam.' : 'Choose a time that suits you. We discuss your cover together.'}</Dialog.Description>
          {request?.tariff && <p className="mt-3 text-sm leading-6 text-[#355248]" data-guided-selected-tariff>{de ? 'Deine Auswahl: ' : 'Your selection: '}<strong>{request.tariff}</strong></p>}
          <div className="mt-6">
            {GUIDED_CALLBACK_PREVIEW || !PHONE_APPOINTMENT_BOOKING ? <div className="flex flex-col items-center rounded-2xl bg-[#E6F2EA] p-6 text-center">
              <FriendlyIcon kind="calendar" size="lg" />
              <h3 className="mt-4 font-display text-xl font-bold">{de ? 'Hier wählst du deinen Termin.' : 'Choose your appointment here.'}</h3>
              <p className="mt-3 max-w-[42ch] text-base leading-7 text-[#355248]">{de ? 'In der Live-Version wählst du hier deine passende Zeit im Kalender. Diese Vorschau bucht keine Termine.' : 'The live version lets you choose a suitable time in the calendar. This preview does not book appointments.'}</p>
            </div> : <AppointmentBooking booking={PHONE_APPOINTMENT_BOOKING} title={de ? 'Termin mit Healio buchen' : 'Book an appointment with Healio'} />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}
