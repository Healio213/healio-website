import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, CheckCircle2, X } from 'lucide-react';
import FormHoneypot, { HONEYPOT_FIELD_NAME, isHoneypotFilled } from '@/components/forms/FormHoneypot';
import { STARTINFO_CONSENT_TEXT, STARTINFO_CONSENT_VERSION, STARTINFO_EVENT } from '@/lib/altersvorsorgeStartinfo';

const SESSION_KEY = 'healio-altersvorsorge-startinfo-dismissed';
const sessionValue = () => { try { return sessionStorage.getItem(SESSION_KEY); } catch { return null; } };
const remember = () => { try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* Nur für diese Sitzung. */ } };

const AltersvorsorgeStartinfoPopup = () => {
  const { pathname } = useLocation();
  const dialogRef = useRef(null);
  const openedAtRef = useRef(0);
  const requestRef = useRef(null);
  const mountedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [ready, setReady] = useState(null);

  const close = () => { remember(); setOpen(false); };

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; requestRef.current?.abort(); };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      if (mountedRef.current) setReady(false);
      controller.abort();
    }, 15000);
    fetch('/api/altersvorsorge-startinfo', { signal: controller.signal, cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setReady(data?.ready === true))
      .catch(() => { if (!controller.signal.aborted && mountedRef.current) setReady(false); })
      .finally(() => window.clearTimeout(timeout));
    return () => { window.clearTimeout(timeout); controller.abort(); };
  }, []);

  useEffect(() => {
    const manual = () => setOpen(true);
    window.addEventListener(STARTINFO_EVENT, manual);
    return () => window.removeEventListener(STARTINFO_EVENT, manual);
  }, []);

  useEffect(() => {
    if (ready !== true || sessionValue()) return undefined;
    const started = Date.now();
    const check = () => {
      if (sessionValue() || Date.now() - started < 35000 || document.visibilityState !== 'visible') return;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable < 0.25) return;
      if (document.querySelector('[role="dialog"], [role="alertdialog"], dialog[open]')) return;
      setOpen(true);
      remember();
    };
    const timer = window.setInterval(check, 1000);
    window.addEventListener('scroll', check, { passive: true });
    return () => { window.clearInterval(timer); window.removeEventListener('scroll', check); };
  }, [pathname, ready]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    if (open && !dialog.open) {
      openedAtRef.current = Date.now();
      dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = previousOverflow; dialog.close(); };
    }
    return undefined;
  }, [open]);

  const submit = async (event) => {
    event.preventDefault();
    if (isHoneypotFilled(event.currentTarget)) return;
    if (status === 'sending' || ready !== true) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    setStatus('sending');
    setError('');
    const controller = new AbortController();
    requestRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/api/altersvorsorge-startinfo', {
        signal: controller.signal,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: data.get('first_name'), email: data.get('email'),
          consent: data.get('consent') === 'on', consent_version: STARTINFO_CONSENT_VERSION,
          source_path: pathname, website: data.get(HONEYPOT_FIELD_NAME),
          elapsed_ms: Date.now() - openedAtRef.current,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.accepted !== true) throw new Error(response.status === 429 ? 'rate' : 'failed');
      if (!mountedRef.current) return;
      setStatus('success');
      remember();
      form.reset();
    } catch (caught) {
      if (!mountedRef.current) return;
      setStatus('idle');
      setError(caught.message === 'rate' ? 'Bitte warte einige Minuten und versuche es erneut.' : 'Wir konnten die Anmeldung gerade nicht bestätigen. Prüfe bitte zuerst dein Postfach, bevor du es erneut versuchst, oder nutze unser Kontaktformular.');
    } finally {
      window.clearTimeout(timeout);
      if (requestRef.current === controller) requestRef.current = null;
    }
  };

  const backdropClick = (event) => {
    if (event.target !== dialogRef.current) return;
    const bounds = dialogRef.current.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close();
  };

  return (
    <dialog ref={dialogRef} aria-labelledby="startinfo-title" aria-describedby="startinfo-description" onCancel={(event) => { event.preventDefault(); close(); }} onClick={backdropClick} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border-0 bg-white p-6 text-[#07111f] shadow-2xl backdrop:bg-slate-950/60 sm:p-8" data-altersvorsorge-startinfo="">
      <button type="button" onClick={close} aria-label="Fenster schließen" className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700"><X className="h-5 w-5" aria-hidden="true" /></button>
      {status === 'success' ? (
        <div role="status">
          <CheckCircle2 className="h-9 w-9 text-emerald-700" aria-hidden="true" />
          <h2 id="startinfo-title" className="mt-5 pr-6 font-display text-3xl font-extrabold">Ein Klick fehlt noch.</h2>
          <p id="startinfo-description" className="mt-4 text-base leading-7 text-slate-700">Bitte bestätige deine E-Mail-Adresse über den Link in unserer Mail. Erst danach bekommst du die Startinfos. Schau gegebenenfalls auch im Spamordner nach.</p>
          <button type="button" onClick={close} className="mt-6 min-h-12 w-full rounded-full bg-[#25c990] px-5 py-3 font-bold">Weiterlesen</button>
        </div>
      ) : (
        <>
          <Bell className="h-9 w-9 text-emerald-700" aria-hidden="true" />
          <h2 id="startinfo-title" className="mt-5 pr-6 font-display text-3xl font-extrabold leading-tight">Den Start nicht verpassen.</h2>
          <p id="startinfo-description" className="mt-4 text-base leading-7 text-slate-700">Wir informieren dich, sobald es neue Details zum Altersvorsorgedepot und zum Start ab 2027 gibt. Auch passende Webinar-Einladungen bekommst du per E-Mail.</p>
          {ready === false ? <p role="status" className="mt-5 rounded-xl bg-slate-50 p-4 text-base leading-7">Die direkte Anmeldung ist gerade nicht verfügbar. <Link to="/kontakt" onClick={close} className="font-semibold text-emerald-800 underline">Schreib uns über das Kontaktformular.</Link></p> : (
            <form method="post" action="/kontakt" onSubmit={submit} className="mt-6 space-y-4">
              <div><label htmlFor="startinfo-name" className="block text-base font-semibold">Dein Name</label><input id="startinfo-name" name="first_name" autoComplete="given-name" required maxLength={80} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700" /></div>
              <div><label htmlFor="startinfo-email" className="block text-base font-semibold">Deine E-Mail-Adresse</label><input id="startinfo-email" name="email" type="email" autoComplete="email" required maxLength={254} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-4 py-3 text-base focus:border-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-700" /></div>
              <FormHoneypot />
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600"><input name="consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-emerald-700" /><span>{STARTINFO_CONSENT_TEXT} Mehr zur Verarbeitung in unserer <Link to="/datenschutz#altersvorsorge-startinfos" className="text-emerald-800 underline">Datenschutzerklärung</Link>.</span></label>
              {error && <p role="alert" className="text-base leading-7 text-red-700">{error}</p>}
              <button type="submit" disabled={status === 'sending' || ready !== true} className="min-h-12 w-full rounded-full bg-[#25c990] px-5 py-3 text-base font-bold disabled:cursor-wait disabled:opacity-60">{status === 'sending' ? 'Anmeldung wird gesendet …' : 'Über den Start informieren'}</button>
              <p className="text-sm leading-6 text-slate-500">Anschließend erhältst du eine Bestätigungsmail. Du gehst damit keinen Vertrag ein.</p>
            </form>
          )}
        </>
      )}
    </dialog>
  );
};

export default AltersvorsorgeStartinfoPopup;
