import React, { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import FormHoneypot, { isHoneypotFilled } from './forms/FormHoneypot.jsx';
import { trackGoogleAdsLead } from '../lib/google-ads.js';
import { getLeadCaptureCopy } from '../lib/lead-capture-copy.js';
import {
  createLeadRequestId,
  hasCapturedLeadThisSession,
  isPersonalOfferUrl,
  isValidLeadEmail,
  markLeadCapturedThisSession,
  navigateApplicationWindow,
  openApplicationWindow,
  reserveApplicationWindow,
  sanitizeLeadSourcePage,
  validateApplicationUrl,
} from '../lib/lead-capture.js';

export type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  trackingCategory?: string;
  onExternalOpen?: () => void;
};

export default function LeadCaptureModal({ isOpen, onClose, targetUrl, trackingCategory, onExternalOpen }: LeadCaptureModalProps) {
  const personalOffer = isPersonalOfferUrl(targetUrl);
  const copy = getLeadCaptureCopy({ sourcePage: typeof window === 'undefined' ? '' : window.location.pathname, trackingCategory, personalOffer });
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [errorField, setErrorField] = useState<'firstName' | 'email' | 'request' | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [shortLoading, setShortLoading] = useState(false);
  const [captured, setCaptured] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const activeRef = useRef(false);
  const generationRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const windowRef = useRef<Window | null>(null);
  const requestIdRef = useRef<string | null>(null);
  const timestampRef = useRef<string | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(typeof document === 'undefined' ? null : document.activeElement as HTMLElement);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    generationRef.current += 1;
    activeRef.current = isOpen;
    if (isOpen && document.activeElement instanceof HTMLElement) returnFocusRef.current = document.activeElement;
    setFirstName('');
    setEmail('');
    setError('');
    setErrorField(null);
    setSubmitting(false);
    setShortLoading(false);
    setCaptured(isOpen && !personalOffer && hasCapturedLeadThisSession());
    requestIdRef.current = null;
    timestampRef.current = null;
    return () => {
      generationRef.current += 1;
      activeRef.current = false;
      abortRef.current?.abort();
      abortRef.current = null;
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      if (windowRef.current && !windowRef.current.closed) windowRef.current.close();
      windowRef.current = null;
    };
  }, [isOpen, targetUrl, personalOffer]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isHoneypotFilled(event.currentTarget)) return;
    if (abortRef.current) return;
    const name = firstName.trim();
    const address = email.trim();
    if (!name || name.length > 80) {
      setError(copy.nameError);
      setErrorField('firstName');
      firstNameRef.current?.focus();
      return;
    }
    if (!isValidLeadEmail(address)) {
      setError(copy.emailError);
      setErrorField('email');
      emailRef.current?.focus();
      return;
    }
    const destination = validateApplicationUrl(targetUrl);
    const sourcePage = sanitizeLeadSourcePage(window.location.pathname);
    if (!destination || !sourcePage) {
      setError(copy.unavailableError);
      setErrorField('request');
      return;
    }

    // Reserve on the submit gesture. The insurer is loaded only after confirmed delivery.
    const reservedWindow = personalOffer ? null : reserveApplicationWindow();
    windowRef.current = reservedWindow;
    const controller = new AbortController();
    const generation = generationRef.current;
    abortRef.current = controller;
    const isCurrentRequest = () => activeRef.current && generationRef.current === generation && abortRef.current === controller;
    requestIdRef.current ??= createLeadRequestId();
    timestampRef.current ??= new Date().toISOString();
    setError('');
    setErrorField(null);
    setSubmitting(true);
    setShortLoading(true);
    const labelTimer = setTimeout(() => { if (isCurrentRequest()) setShortLoading(false); }, 1000);
    const timeout = setTimeout(() => controller.abort(), 12000);
    timersRef.current = [labelTimer, timeout];

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Idempotency-Key': requestIdRef.current },
        credentials: 'same-origin',
        signal: controller.signal,
        body: JSON.stringify({ firstName: name, email: address, targetUrl: destination, timestamp: timestampRef.current, sourcePage, ...(trackingCategory ? { trackingCategory } : {}) }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error('delivery-unconfirmed');
      if (!isCurrentRequest()) return;
      if (controller.signal.aborted) throw new Error('delivery-aborted');

      const alreadyCaptured = hasCapturedLeadThisSession();
      markLeadCapturedThisSession();
      // CMS acknowledgment is the request success. Opening the calculator is
      // a separate event below. No contact fields enter the consent-gated tag.
      if (!alreadyCaptured) {
        try { trackGoogleAdsLead(); } catch { /* Measurement never blocks delivery. */ }
      }
      setCaptured(true);
      setFirstName('');
      setEmail('');
      if (!personalOffer && navigateApplicationWindow(reservedWindow, destination)) {
        windowRef.current = null;
        onExternalOpen?.();
        onClose();
      }
    } catch {
      if (isCurrentRequest()) {
        setError(copy.deliveryError);
        setErrorField('request');
      }
      if (reservedWindow && !reservedWindow.closed) reservedWindow.close();
      if (windowRef.current === reservedWindow) windowRef.current = null;
    } finally {
      clearTimeout(labelTimer);
      clearTimeout(timeout);
      if (isCurrentRequest()) {
        timersRef.current = [];
        abortRef.current = null;
        setSubmitting(false);
        setShortLoading(false);
      }
    }
  };

  const validDestination = validateApplicationUrl(targetUrl);
  const finishManualOpen = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (validDestination && openApplicationWindow(validDestination)) {
      onExternalOpen?.();
      onClose();
    } else {
      setError(copy.popupError);
      setErrorField('request');
    }
  };

  // Calculator without the guide: no contact data, no lead request, no lead conversion.
  const skipToCalculator = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    if (validDestination && openApplicationWindow(validDestination)) {
      markLeadCapturedThisSession();
      onExternalOpen?.();
      onClose();
    } else {
      setError(copy.popupError);
      setErrorField('request');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-home-midnight/80 backdrop-blur-sm" />
        <Dialog.Content
          lang={copy.lang}
          className="fixed bottom-0 left-1/2 z-[121] max-h-[90dvh] w-full max-w-[460px] -translate-x-1/2 overflow-y-auto rounded-t-2xl border border-[#233044] bg-[#131B26] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-7 font-sans text-white shadow-2xl outline-none sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8"
          onOpenAutoFocus={(event) => { event.preventDefault(); if (!captured) firstNameRef.current?.focus(); }}
          onCloseAutoFocus={(event) => { event.preventDefault(); returnFocusRef.current?.focus(); }}
        >
          <Dialog.Close aria-label={copy.closeLabel} className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">
            <X className="h-5 w-5" aria-hidden="true" />
          </Dialog.Close>
          <img src="/healio-logo-white-web.svg" alt="Healio" width="100" height="40" className="mb-4 h-8 w-auto" />
          <p className="mb-4 pr-8 text-[11px] font-semibold tracking-[0.12em] text-home-mint">{copy.badge}</p>
          <Dialog.Title className="max-w-[20ch] font-display text-[26px] font-bold leading-[1.2] tracking-tight sm:text-[28px]">{copy.title}</Dialog.Title>
          <Dialog.Description className="mt-4 text-sm leading-6 text-slate-300">{copy.description}</Dialog.Description>

          {captured ? (
            <div className="mt-6">
              <p role="status" className="mb-4 text-sm leading-6 text-slate-200">{copy.captured}</p>
              {personalOffer ? <button type="button" onClick={onClose} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-home-mint px-4 py-3 text-sm font-bold text-home-midnight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-home-mint">{copy.returnLabel}</button> : validDestination && <a href={validDestination} target="_blank" rel="noopener noreferrer" onClick={finishManualOpen} className="flex min-h-12 items-center justify-center rounded-xl bg-home-mint px-4 py-3 text-center text-sm font-bold text-home-midnight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-home-mint">{copy.manualOpen}</a>}
              {error && <p role="alert" className="mt-4 text-sm leading-6 text-amber-300">{error}</p>}
            </div>
          ) : (
            <form method="post" action="/kontakt" onSubmit={submit} noValidate className="mt-6 space-y-4">
              <FormHoneypot />
              <div>
                <label htmlFor="lead-capture-first-name" className="mb-2 block text-sm font-medium text-slate-200">{copy.firstNameLabel}</label>
                <input ref={firstNameRef} id="lead-capture-first-name" name="firstName" type="text" required maxLength={80} autoComplete="given-name" placeholder={copy.firstNamePlaceholder} value={firstName} onChange={(event) => { setFirstName(event.target.value); requestIdRef.current = null; timestampRef.current = null; }} disabled={submitting} aria-invalid={errorField === 'firstName'} aria-describedby={errorField === 'firstName' ? 'lead-capture-error' : undefined} className="min-h-12 w-full rounded-xl border border-[#233044] bg-home-midnight px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-home-mint focus:outline-none focus:ring-1 focus:ring-home-mint disabled:opacity-60" />
              </div>
              <div>
                <label htmlFor="lead-capture-email" className="mb-2 block text-sm font-medium text-slate-200">{copy.emailLabel}</label>
                <input ref={emailRef} id="lead-capture-email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" placeholder={copy.emailPlaceholder} value={email} onChange={(event) => { setEmail(event.target.value); requestIdRef.current = null; timestampRef.current = null; }} disabled={submitting} aria-invalid={errorField === 'email'} aria-describedby={errorField === 'email' ? 'lead-capture-error' : undefined} className="min-h-12 w-full rounded-xl border border-[#233044] bg-home-midnight px-4 py-3 text-base text-white placeholder:text-slate-500 focus:border-home-mint focus:outline-none focus:ring-1 focus:ring-home-mint disabled:opacity-60" />
              </div>
              {error && <p id="lead-capture-error" role="alert" className="text-sm leading-6 text-amber-300">{error}</p>}
              <button type="submit" disabled={submitting} aria-busy={submitting} className="flex min-h-12 w-full items-center justify-center rounded-xl bg-home-mint px-4 py-3.5 text-center text-sm font-bold leading-5 text-home-midnight transition-colors hover:bg-home-mint-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-home-mint disabled:cursor-wait disabled:opacity-70">{shortLoading ? copy.loading : copy.submit}</button>
              {submitting && !shortLoading && <p role="status" className="text-sm leading-6 text-slate-300">{copy.pending}</p>}
              {!personalOffer && validDestination && copy.skip && <a href={validDestination} target="_blank" rel="noopener noreferrer" onClick={skipToCalculator} className="block min-h-11 py-2 text-center text-sm font-medium text-slate-300 underline underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">{copy.skip}</a>}
            </form>
          )}
          <p className="mt-4 text-center text-xs leading-5 text-slate-400">{copy.microcopy}</p>
          <p className="mt-3 text-xs leading-5 text-slate-400">{copy.permission} <a href={copy.privacyUrl} className="text-slate-300 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">{copy.privacyLabel}</a></p>
          {copy.languageNote && <p className="mt-3 text-xs leading-5 text-slate-400">{copy.languageNote} <a href={copy.helpUrl} className="text-slate-300 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">{copy.helpLabel}</a></p>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
