import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, Home, MailCheck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';

const cleanAuthParamsFromUrl = () => {
  if (typeof window === 'undefined') return;
  const hasAuthHash = window.location.hash.includes('access_token') || window.location.hash.includes('error');
  const hasAuthQuery = window.location.search.includes('access_token') || window.location.search.includes('error');
  if (hasAuthHash || hasAuthQuery) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
};

const getAuthState = () => {
  if (typeof window === 'undefined') return { hasError: false, message: '' };
  const rawParams = window.location.hash.slice(1) || window.location.search.slice(1);
  const params = new URLSearchParams(rawParams);
  const error = params.get('error_description') || params.get('error');
  return {
    hasError: Boolean(error),
    message: error ? decodeURIComponent(error.replace(/\+/g, ' ')) : '',
  };
};

const AppEmailConfirmedPage = () => {
  const authState = useMemo(getAuthState, []);

  useEffect(() => {
    cleanAuthParamsFromUrl();
  }, []);

  const title = authState.hasError ? 'Bestätigung nicht abgeschlossen' : 'E-Mail bestätigt';
  const text = authState.hasError
    ? 'Der Bestätigungslink konnte nicht mehr verwendet werden. Bitte öffne die Healio-App und fordere die E-Mail erneut an oder nutze „Passwort vergessen“.'
    : 'Dein Healio-Konto ist jetzt aktiviert. Du kannst die App öffnen und dich mit deiner E-Mail-Adresse und deinem Passwort anmelden.';

  return (
    <main className="min-h-screen bg-[#111b2a] text-white">
      <SEOHead
        title={`${title} | HEALIO`}
        description="Bestätigungsseite für dein HEALIO App-Konto."
        canonicalUrl="https://healio.de/app-bestaetigt"
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
              <MailCheck className="h-4 w-4 text-healio-primary" />
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
                  href="healio://"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-healio-primary px-7 py-4 text-base font-semibold text-[#102032] shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-300"
                >
                  Healio-App öffnen
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
              {authState.hasError ? (
                <ShieldCheck className="h-8 w-8 text-healio-primary" />
              ) : (
                <CheckCircle2 className="h-8 w-8 text-healio-primary" />
              )}
            </div>

            <h2 className="mb-4 text-2xl font-semibold">
              {authState.hasError ? 'Was du jetzt tun kannst' : 'Nächster Schritt'}
            </h2>
            <div className="space-y-4 text-slate-200">
              <p>
                {authState.hasError
                  ? 'Falls du den Link bereits benutzt hast, öffne einfach die App und probiere die Anmeldung erneut.'
                  : 'Wechsle jetzt zurück in die App. Dort meldest du dich mit denselben Zugangsdaten an, die du bei der Registrierung vergeben hast.'}
              </p>
              <p>
                Wenn etwas nicht klappt, hilft dir Healio direkt weiter: Schreib an{' '}
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

export default AppEmailConfirmedPage;
