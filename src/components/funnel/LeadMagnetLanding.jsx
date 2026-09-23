import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownToLine, ArrowRight, Check, CalendarClock } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FormHoneypot, { isHoneypotFilled } from '@/components/forms/FormHoneypot';
import { emailjsService } from '@/services/emailjsService';

/**
 * Gemeinsame Landingpage fuer die drei LinkedIn-Funnel (Unternehmen, Heilberufe, Zahnaerzte).
 * Ablauf: Seite lesen, E-Book anfordern, Download erscheint sofort, danach Terminangebot.
 * Der Lead geht ueber die bestehende EmailJS-Strecke an info@healio.de.
 * Bewusst keine Brevo-Liste, damit keine gestoppte Automatisierung anspringt.
 */
const LeadMagnetLanding = ({ config }) => {
  const [form, setForm] = useState({ name: '', email: '', company: '', consent: false });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (isHoneypotFilled(event.currentTarget)) {
      setStatus('done');
      return;
    }
    if (!form.name.trim() || !form.email.trim()) {
      setError('Bitte Name und E-Mail-Adresse angeben.');
      return;
    }
    if (!form.consent) {
      setError('Bitte bestätigen Sie die Einwilligung, damit wir Ihnen antworten dürfen.');
      return;
    }

    setStatus('sending');
    try {
      await emailjsService.sendEmail(
        {
          from_name: form.name,
          from_email: form.email,
          company: form.company,
          message: `E-Book angefordert: ${config.ebookTitle}`,
        },
        config.pageSource,
      );
      setStatus('done');
    } catch (submitError) {
      setStatus('idle');
      setError('Das hat gerade nicht geklappt. Schreiben Sie uns bitte kurz an info@healio.de.');
    }
  };

  const isGated = config.status === 'gesperrt';

  return (
    <>
      <SEOHead
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalUrl={config.canonicalUrl}
        robots="noindex, nofollow"
        ogTitle={config.seoTitle}
        ogDescription={config.seoDescription}
        ogImageAlt={`Healio Material ${config.ebookTitle}`}
      />

      <main className="funnel-page min-h-screen bg-[#f4faf7] pt-24 text-slate-700 sm:pt-28">
        <section className="relative overflow-hidden bg-[#07111f] text-white">
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_45%,rgba(37,201,144,0.16),transparent_55%)]"
            aria-hidden="true"
          />
          <div className="healio-container relative grid gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.8fr)] lg:items-start lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.2em] text-[#5ee0b1]">
                {config.audienceLabel}
              </p>
              <h1 className="font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {config.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">{config.subline}</p>

              {isGated && (
                <p className="mt-7 max-w-2xl rounded-xl border border-amber-200/40 bg-amber-100/10 p-4 text-sm leading-6 text-amber-100">
                  <strong>Fachlicher Arbeitsstand, noch keine berufsrechtliche Freigabe.</strong>{' '}
                  {config.gateNote}
                </p>
              )}

              <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                <h2 className="font-display text-xl font-extrabold tracking-tight text-white">
                  {config.problemTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-300">{config.problemBody}</p>
              </div>
            </div>

            <div id="ebook" className="relative mx-auto w-full max-w-md scroll-mt-28">
              <div className="absolute -inset-4 rotate-2 rounded-[2rem] border border-[#25c990]/20" aria-hidden="true" />
              <div className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
                <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-[#5ee0b1]">
                  Kostenloses E-Book
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold leading-tight text-white">
                  {config.ebookTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{config.ebookSubtitle}</p>
                <p className="mt-3 text-xs text-slate-400">{config.ebookFacts}</p>

                {status === 'done' ? (
                  <div className="mt-6 space-y-5">
                    <p className="rounded-xl border border-[#25c990]/30 bg-[#25c990]/10 p-4 text-sm leading-6 text-[#bff3e0]">
                      Danke. Hier ist Ihr Exemplar.
                    </p>
                    <a
                      href={config.downloadPath}
                      download={config.downloadFileName}
                      className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#25c990] px-6 py-4 font-display text-base font-extrabold text-[#07111f] transition hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f]"
                    >
                      <ArrowDownToLine className="h-5 w-5" aria-hidden="true" />
                      E-Book herunterladen
                    </a>
                    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                      <p className="text-sm leading-6 text-slate-300">{config.appointmentIntro}</p>
                      <a
                        href={config.appointmentUrl}
                        className="mt-4 inline-flex items-center gap-2 font-display text-sm font-bold text-[#5ee0b1] underline decoration-[#25c990]/60 decoration-2 underline-offset-4 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f]"
                      >
                        <CalendarClock className="h-4 w-4" aria-hidden="true" />
                        Wunschtermin finden
                      </a>
                    </div>
                  </div>
                ) : (
                  <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                    <FormHoneypot />

                    <div>
                      <label htmlFor="funnel-name" className="block text-sm font-semibold text-slate-200">
                        Name
                      </label>
                      <input
                        id="funnel-name"
                        type="text"
                        autoComplete="name"
                        value={form.name}
                        onChange={update('name')}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#25c990] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                        placeholder="Vor- und Nachname"
                      />
                    </div>

                    <div>
                      <label htmlFor="funnel-email" className="block text-sm font-semibold text-slate-200">
                        E-Mail
                      </label>
                      <input
                        id="funnel-email"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={update('email')}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#25c990] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                        placeholder="name@beispiel.de"
                      />
                    </div>

                    <div>
                      <label htmlFor="funnel-company" className="block text-sm font-semibold text-slate-200">
                        {config.companyFieldLabel} <span className="font-normal text-slate-400">(optional)</span>
                      </label>
                      <input
                        id="funnel-company"
                        type="text"
                        autoComplete="organization"
                        value={form.company}
                        onChange={update('company')}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#25c990] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990]"
                        placeholder={config.companyFieldPlaceholder}
                      />
                    </div>

                    <label htmlFor="funnel-consent" className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                      <input
                        id="funnel-consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={update('consent')}
                        className="mt-1 h-5 w-5 shrink-0 rounded border-white/30 bg-white/10 text-[#25c990] focus:ring-[#25c990]"
                      />
                      <span>
                        Ich möchte das E-Book erhalten und bin damit einverstanden, dass Healio mich dazu
                        kontaktieren darf. Mehr dazu in der{' '}
                        <Link to="/datenschutz" className="underline decoration-[#25c990]/60 decoration-2 underline-offset-4 hover:text-white">
                          Datenschutzerklärung
                        </Link>
                        .
                      </span>
                    </label>

                    {error && (
                      <p role="alert" className="rounded-xl border border-red-300/30 bg-red-500/10 p-3 text-sm leading-6 text-red-200">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#25c990] px-6 py-4 font-display text-base font-extrabold text-[#07111f] transition hover:bg-[#5ee0b1] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f]"
                    >
                      {status === 'sending' ? 'Wird gesendet' : config.formTitle}
                      {status !== 'sending' && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
                    </button>

                    <p className="text-xs leading-5 text-slate-400">{config.formNote}</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="healio-container px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-8">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950">
                Was drinsteht
              </h2>
              <ul className="mt-5 space-y-4 text-sm leading-6">
                {config.contents.map((punkt) => (
                  <li key={punkt} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#076046]" aria-hidden="true" />
                    <span>{punkt}</span>
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-display text-2xl font-extrabold tracking-tight text-slate-950">
                Für wen es gedacht ist
              </h2>
              <ul className="mt-5 space-y-3 text-sm leading-6">
                {config.forWhom.map((punkt) => (
                  <li key={punkt} className="flex gap-3">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[#076046]" aria-hidden="true" />
                    <span>{punkt}</span>
                  </li>
                ))}
              </ul>
            </article>

            <aside className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8" aria-labelledby="ehrlich-title">
              <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Ehrlich dazugesagt
              </p>
              <h2 id="ehrlich-title" className="mt-3 font-display text-2xl font-extrabold tracking-tight text-slate-950">
                Was es nicht ist
              </h2>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                {config.honesty.map((punkt) => (
                  <li key={punkt}>{punkt}</li>
                ))}
              </ul>

              <a
                href="#ebook"
                className="mt-7 inline-flex items-center gap-2 font-display text-sm font-bold text-[#076046] underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-[#25c990] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4"
              >
                Zum E-Book
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </aside>
          </div>

          <nav
            aria-label="Rechtliche Informationen"
            className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-x-6 gap-y-3 border-t border-emerald-100 pt-7 text-sm font-semibold"
          >
            <Link to="/impressum" className="text-slate-700 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-[#076046]">
              Impressum
            </Link>
            <Link to="/datenschutz" className="text-slate-700 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-[#076046]">
              Datenschutz
            </Link>
            <Link to="/erstinformation" className="text-slate-700 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-[#076046]">
              Erstinformation
            </Link>
          </nav>
        </section>
      </main>
    </>
  );
};

export default LeadMagnetLanding;
