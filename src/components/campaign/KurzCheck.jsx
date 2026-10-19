import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import FormHoneypot, { isHoneypotFilled } from '@/components/forms/FormHoneypot';
import { emailjsService } from '@/services/emailjsService';
import { describeCampaignSource, markCheckLeadPending, readCampaignSearch } from '@/lib/campaign-landing';
import { hasConsent } from '@/lib/consent';

const HEALIO_PHONE_DISPLAY = '040 89755705';
const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@.]{1,63}(?:\.[^\s@.]{1,63}){1,4}$/;
const EMPTY_CONTACT = { vorname: '', telefon: '', email: '', einwilligung: false };

const inputClass = 'mt-2 block min-h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-home-midnight placeholder:text-slate-400 focus:border-home-mint focus:outline-none focus:ring-2 focus:ring-home-mint/30';

const ChoiceStep = ({ step, value, onChoose }) => (
  <div className={step.grid ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
    {step.options.map((option) => {
      const selected = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected}
          onClick={() => onChoose(option.value)}
          className={`flex min-h-16 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left font-display text-base font-bold text-home-midnight transition active:scale-[0.99] sm:text-lg ${
            selected
              ? 'border-home-mint bg-[#e7f8f0]'
              : 'border-slate-200 bg-white hover:border-home-mint/70'
          } ${step.grid ? 'justify-center text-center' : ''}`}
        >
          {!step.grid ? (
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                selected ? 'border-home-mint bg-home-mint text-home-midnight' : 'border-slate-300 bg-white'
              }`}
              aria-hidden="true"
            >
              {selected ? <Check className="h-4 w-4" /> : null}
            </span>
          ) : null}
          <span>{option.label}</span>
        </button>
      );
    })}
  </div>
);

const KurzCheck = ({ config }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const advanceTimer = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const totalSteps = config.steps.length + 1;
  const isContactStep = stepIndex === config.steps.length;
  const step = config.steps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / totalSteps) * 100);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  useEffect(() => {
    if (stepIndex === 0) return;
    const card = cardRef.current;
    // Am Handy rückt die Karte nach oben, damit Frage und Kacheln ohne Scrollen sichtbar sind.
    const top = card?.getBoundingClientRect().top ?? 0;
    if (card && (top < 0 || top > 24)) card.scrollIntoView({ block: 'start', behavior: 'smooth' });
    headingRef.current?.focus({ preventScroll: true });
  }, [stepIndex]);

  const choose = (stepId, value) => {
    setAnswers((previous) => ({ ...previous, [stepId]: value }));
    clearTimeout(advanceTimer.current);
    // Kurz stehen lassen, damit man die Auswahl sieht, dann weiter.
    advanceTimer.current = setTimeout(() => setStepIndex((index) => Math.min(index + 1, config.steps.length)), 220);
  };

  const setField = (name, value) => {
    setContact((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    const telefon = contact.telefon.trim();
    const email = contact.email.trim();
    if (!contact.vorname.trim()) next.vorname = 'Bitte gib deinen Vornamen an.';
    if (!telefon && !email) next.telefon = 'Bitte gib eine Telefonnummer oder eine E-Mail-Adresse an.';
    if (telefon && telefon.replace(/\D/g, '').length < 6) next.telefon = 'Diese Telefonnummer sieht unvollständig aus.';
    if (email && !EMAIL_PATTERN.test(email)) next.email = 'Diese E-Mail-Adresse sieht unvollständig aus.';
    if (!contact.einwilligung) next.einwilligung = 'Ohne dein Einverständnis dürfen wir uns nicht bei dir melden.';
    return next;
  };

  const labelFor = (stepConfig, value) => stepConfig.options.find((option) => option.value === value)?.label || 'nicht angegeben';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isHoneypotFilled(event.currentTarget)) return;
    if (status === 'sending') return;

    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`check-${firstError}`)?.focus();
      return;
    }

    setStatus('sending');
    const firstName = contact.vorname.trim();
    const telefon = contact.telefon.trim();
    const email = contact.email.trim();
    const answerLines = config.steps.map((stepConfig) => `${stepConfig.question} ${labelFor(stepConfig, answers[stepConfig.id])}`);

    try {
      await emailjsService.sendEmail({
        from_name: firstName,
        from_email: email,
        phone: telefon,
        message: [
          `Anfrage über healio.de${config.path} (Meta-Zielseite)`,
          ...answerLines,
          `Erreichbar über: ${[telefon && 'Telefon', email && 'E-Mail'].filter(Boolean).join(' und ')}`,
          config.consent.healthData
            ? `Einwilligung Rückruf und ausdrückliche Einwilligung Gesundheitsangabe (Art. 9 Abs. 2 lit. a DSGVO): ja (${config.consent.version})`
            : `Einwilligung Rückruf: ja (${config.consent.version})`,
          '',
          'Kampagne:',
          describeCampaignSource(location.search),
        ].join('\n'),
      }, config.pageSource, { track: false });
    } catch {
      setStatus('error');
      return;
    }

    // Der Merker im Browser dient nur der Zählung auf der Dankeseite. Er wird
    // deshalb nur gesetzt, wenn die Strecke misst und eine Einwilligung für
    // Analyse oder Marketing vorliegt (§ 25 TDDDG).
    if (config.metaContentName && (hasConsent('marketing') || hasConsent('analytics'))) {
      markCheckLeadPending(config.key);
    }
    navigate(`${config.thankYouPath}${readCampaignSearch(location.search)}`, { state: { firstName } });
  };

  return (
    <section
      ref={cardRef}
      aria-labelledby="check-frage"
      className="scroll-mt-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 text-sm font-semibold text-slate-500">
        <span>Schritt {stepIndex + 1} von {totalSteps}</span>
        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={() => setStepIndex((index) => Math.max(index - 1, 0))}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-2 font-semibold text-slate-600 hover:text-home-midnight"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Zurück
          </button>
        ) : null}
      </div>
      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label="Fortschritt"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="h-full rounded-full bg-home-mint transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {!isContactStep ? (
        <div className="mt-6">
          <h2 id="check-frage" ref={headingRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-tight text-home-midnight focus:outline-none sm:text-3xl">
            {step.question}
          </h2>
          {step.hint ? <p className="mt-2 text-base leading-7 text-slate-600">{step.hint}</p> : null}
          <div className="mt-5">
            <ChoiceStep step={step} value={answers[step.id]} onChoose={(value) => choose(step.id, value)} />
          </div>
        </div>
      ) : (
        <form method="post" action="/kontakt" onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <FormHoneypot />
          <div>
            <h2 id="check-frage" ref={headingRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-tight text-home-midnight focus:outline-none sm:text-3xl">
              Wie erreichen wir dich mit deiner Auswertung?
            </h2>
            <p className="mt-2 text-base leading-7 text-slate-600">
              Telefon oder E-Mail, eins von beidem reicht.
            </p>
          </div>

          <div>
            <label htmlFor="check-vorname" className="text-base font-bold text-home-midnight">Vorname</label>
            <input
              id="check-vorname"
              name="vorname"
              type="text"
              autoComplete="given-name"
              maxLength={80}
              value={contact.vorname}
              onChange={(event) => setField('vorname', event.target.value)}
              aria-invalid={errors.vorname ? 'true' : undefined}
              aria-describedby={errors.vorname ? 'check-vorname-fehler' : undefined}
              className={inputClass}
            />
            {errors.vorname ? <p id="check-vorname-fehler" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.vorname}</p> : null}
          </div>

          <div>
            <label htmlFor="check-telefon" className="text-base font-bold text-home-midnight">Telefon</label>
            <input
              id="check-telefon"
              name="telefon"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={40}
              value={contact.telefon}
              onChange={(event) => setField('telefon', event.target.value)}
              aria-invalid={errors.telefon ? 'true' : undefined}
              aria-describedby={errors.telefon ? 'check-telefon-fehler' : undefined}
              className={inputClass}
            />
            {errors.telefon ? <p id="check-telefon-fehler" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.telefon}</p> : null}
          </div>

          <div>
            <label htmlFor="check-email" className="text-base font-bold text-home-midnight">E-Mail</label>
            <input
              id="check-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={254}
              value={contact.email}
              onChange={(event) => setField('email', event.target.value)}
              aria-invalid={errors.email ? 'true' : undefined}
              aria-describedby={errors.email ? 'check-email-fehler' : undefined}
              className={inputClass}
            />
            {errors.email ? <p id="check-email-fehler" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.email}</p> : null}
          </div>

          <div>
            <label htmlFor="check-einwilligung" className="flex gap-3 text-sm leading-6 text-slate-600">
              <input
                id="check-einwilligung"
                name="einwilligung"
                type="checkbox"
                checked={contact.einwilligung}
                onChange={(event) => setField('einwilligung', event.target.checked)}
                aria-invalid={errors.einwilligung ? 'true' : undefined}
                aria-describedby={errors.einwilligung ? 'check-einwilligung-fehler' : undefined}
                className="mt-0.5 h-6 w-6 shrink-0 rounded border-slate-300 text-home-mint focus:ring-home-mint"
              />
              <span>{config.consent.text}</span>
            </label>
            {errors.einwilligung ? <p id="check-einwilligung-fehler" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.einwilligung}</p> : null}
          </div>

          {status === 'error' ? (
            <p role="alert" className="rounded-2xl bg-[#fff1ed] p-4 text-sm font-semibold leading-6 text-[#934638]">
              Das hat gerade nicht geklappt. Bitte versuch es noch einmal oder ruf uns an: {HEALIO_PHONE_DISPLAY}.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl bg-home-mint px-6 font-display text-lg font-extrabold text-home-midnight shadow-[0_14px_34px_rgba(37,201,144,0.28)] transition hover:bg-[#1db37f] disabled:cursor-wait disabled:opacity-70"
          >
            {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
            {status === 'sending' ? 'Wird gesendet' : 'Auswertung anfordern'}
            {status === 'sending' ? null : <ArrowRight className="h-5 w-5" aria-hidden="true" />}
          </button>

          <p className="text-sm leading-6 text-slate-500">
            Kein Newsletter, kein Weiterverkauf deiner Daten. Mehr dazu in der{' '}
            <a href="/datenschutz#kurzcheck" target="_blank" rel="noopener" className="font-semibold text-home-midnight underline decoration-home-mint decoration-2 underline-offset-4">
              Datenschutzerklärung
            </a>.
          </p>
        </form>
      )}
    </section>
  );
};

export default KurzCheck;
