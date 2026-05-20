import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Home, KeyRound, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const getAuthParams = () => {
  if (typeof window === 'undefined') return { raw: '', hasTokens: false, hasError: false, message: '' };

  const raw = window.location.hash || (window.location.search ? `#${window.location.search.slice(1)}` : '');
  const params = new URLSearchParams(raw.replace(/^#/, ''));
  const error = params.get('error_description') || params.get('error');

  return {
    raw,
    hasTokens: Boolean(params.get('access_token') && params.get('refresh_token')),
    hasError: Boolean(error),
    message: error ? decodeURIComponent(error.replace(/\+/g, ' ')) : '',
  };
};

const cleanAuthParamsFromUrl = () => {
  if (typeof window === 'undefined') return;
  window.history.replaceState({}, document.title, window.location.pathname);
};

const AppPasswordResetPage = () => {
  const authState = useMemo(getAuthParams, []);
  const appUrl = useMemo(
    () => `healio://auth/reset-password${authState.raw || ''}`,
    [authState.raw]
  );

  useEffect(() => {
    if (!authState.hasTokens || authState.hasError) return;

    const openTimer = window.setTimeout(() => {
      window.location.href = appUrl;
    }, 350);
    const cleanTimer = window.setTimeout(cleanAuthParamsFromUrl, 2000);

    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(cleanTimer);
    };
  }, [appUrl, authState.hasError, authState.hasTokens]);

  const title = authState.hasError ? 'Reset-Link ungültig' : 'Passwort zurücksetzen';
  const text = authState.hasError
    ? 'Der Link konnte nicht verwendet werden. Bitte fordere in der HEALIO-App eine neue Passwort-E-Mail an.'
    : 'Wir öffnen jetzt die HEALIO-App, damit du dort ein neues Passwort festlegen kannst.';

  return (
    <main className="min-h-screen bg-[#111b2a] text-white">
      <SEOHead
        title={`${title} | HEALIO`}
        description="Passwort-Reset für dein HEALIO App-Konto."
        canonicalUrl="https://healio.de/reset-password"
        robots="noindex, nofollow"
      />

      <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-10 sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,201,144,0.20),transparent_34%),linear-gradient(145deg,#111b2a_0%,#172637_52%,#0f1724_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/25 to-transparent" />

        <div className="relative mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <img
              src="/healio-logo-white.svg"
              alt="Healio"
              className="mx-auto mb-10 h-16 w-auto lg:mx-0"
            />

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur">
              <KeyRound className="h-4 w-4 text-healio-primary" />
              Healio App-Konto
            </div>

            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-200 lg:mx-0">
              {text}
            </p>

            {authState.hasError && authState.message && (
              <p className="mt-4 text-sm text-slate-400">
                Technischer Hinweis: {authState.message}
              </p>
            )}

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              {!authState.hasError && (
                <a
                  href={appUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-healio-primary px-7 py-4 text-base font-semibold text-[#102032] shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-300"
                >
                  HEALIO-App öffnen
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/14"
              >
                <Home className="h-4 w-4" />
                Zur Startseite
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
            className="rounded-2xl border border-white/12 bg-white/8 p-6 shadow-2xl shadow-black/25 backdrop-blur"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-healio-primary/15">
              <ShieldCheck className="h-8 w-8 text-healio-primary" />
            </div>

            <h2 className="mb-4 text-2xl font-semibold">
              Falls die App nicht automatisch öffnet
            </h2>
            <div className="space-y-4 text-slate-200">
              <p>
                Tippe auf „HEALIO-App öffnen“. Danach kannst du in der App dein neues Passwort speichern.
              </p>
              <p>
                Wenn etwas nicht klappt, fordere bitte in der App erneut eine Passwort-E-Mail an oder schreibe an{' '}
                <a href="mailto:info@healio.de" className="font-semibold text-healio-primary hover:underline">
                  info@healio.de
                </a>
                .
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AppPasswordResetPage;
