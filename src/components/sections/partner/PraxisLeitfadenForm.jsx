import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import FormHoneypot, { isHoneypotFilled } from '@/components/forms/FormHoneypot';
import { META_LEITFADEN_KEY, trackMetaLead } from '@/lib/meta-pixel';

export const LEITFADEN_ENDPOINT = '/api/partner-lead';
export const LEITFADEN_THANK_YOU_PATH = '/partner/leitfaden/danke';
export const CONSENT_TEXT_VERSION = 'leitfaden-v1-2026-09-23';

export const PRACTICE_TYPES = [
  { value: 'naturheilkunde', label: 'Naturheilkunde oder Heilpraktik' },
  { value: 'osteopathie', label: 'Osteopathie' },
  { value: 'chiropraktik', label: 'Chiropraktik' },
  { value: 'physiotherapie', label: 'Physiotherapie' },
  { value: 'zahnarzt', label: 'Zahnarztpraxis' },
  { value: 'sonstiges', label: 'Sonstiges' },
];

const EMAIL_PATTERN = /^[^\s@]{1,64}@[^\s@.]{1,63}(?:\.[^\s@.]{1,63}){1,4}$/;

const EMPTY_FORM = {
  firstName: '',
  email: '',
  phone: '',
  practiceType: '',
  consent: false,
};

/** Nur die bekannten Kampagnenfelder, nichts Freies aus der Adresszeile. */
const readTracking = () => {
  if (typeof window === 'undefined') return undefined;

  try {
    const params = new URLSearchParams(window.location.search || '');
    const tracking = {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = params.get(key);
      if (value) tracking[key] = value.slice(0, 200);
    }
    if (document.referrer) tracking.referrer = document.referrer.slice(0, 200);
    return Object.keys(tracking).length > 0 ? tracking : undefined;
  } catch {
    return undefined;
  }
};

const fieldClass = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#25c990] focus:outline-none focus:ring-2 focus:ring-[#25c990]/30';
const labelClass = 'block text-sm font-semibold text-slate-800';

const PraxisLeitfadenForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((previous) => ({ ...previous, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isHoneypotFilled(event.currentTarget)) return;
    if (isSubmitting) return;

    const firstName = formData.firstName.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (firstName === '') {
      setErrorMessage('Bitte trag deinen Vornamen ein.');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setErrorMessage('Bitte prüfe deine E-Mail-Adresse.');
      return;
    }
    if (phone !== '' && phone.length < 6) {
      setErrorMessage('Bitte prüfe deine Telefonnummer oder lass das Feld leer.');
      return;
    }
    if (formData.practiceType === '') {
      setErrorMessage('Bitte wähle aus, wie du arbeitest.');
      return;
    }
    if (!formData.consent) {
      setErrorMessage('Ohne dein Einverständnis können wir dir den Leitfaden nicht schicken.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(LEITFADEN_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: firstName,
          email,
          phone,
          practice_type: formData.practiceType,
          consent_contact: true,
          consent_text_version: CONSENT_TEXT_VERSION,
          utm: readTracking(),
        }),
      });

      if (!response.ok) {
        setErrorMessage('Das hat gerade nicht geklappt. Bitte versuch es noch einmal oder schreib uns an info@healio.de.');
        setIsSubmitting(false);
        return;
      }

      // Feuert nur, wenn der Zweck Marketing freigegeben ist. Das prueft das
      // Meta-Modul selbst, hier steht bewusst keine zweite Logik daneben.
      trackMetaLead({ content_name: META_LEITFADEN_KEY });
      setFormData(EMPTY_FORM);
      navigate(LEITFADEN_THANK_YOU_PATH);
    } catch {
      setErrorMessage('Das hat gerade nicht geklappt. Bitte versuch es noch einmal oder schreib uns an info@healio.de.');
      setIsSubmitting(false);
    }
  };

  return (
    <form
      method="post"
      action="/kontakt"
      onSubmit={handleSubmit}
      noValidate
      className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
    >
      <FormHoneypot />

      <div className="space-y-2">
        <label className={labelClass} htmlFor="leitfaden-vorname">Vorname</label>
        <input
          id="leitfaden-vorname"
          name="firstName"
          type="text"
          autoComplete="given-name"
          maxLength={80}
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Anna"
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <label className={labelClass} htmlFor="leitfaden-email">E-Mail</label>
        <input
          id="leitfaden-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          value={formData.email}
          onChange={handleChange}
          placeholder="anna@praxis-beispiel.de"
          className={fieldClass}
        />
      </div>

      <div className="space-y-2">
        <label className={labelClass} htmlFor="leitfaden-telefon">
          Telefon <span className="font-normal text-slate-500">(freiwillig)</span>
        </label>
        <input
          id="leitfaden-telefon"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          value={formData.phone}
          onChange={handleChange}
          placeholder="040 89755705"
          className={fieldClass}
        />
        <p className="text-xs text-slate-500">Für einen kurzen Rückruf, wenn du magst.</p>
      </div>

      <div className="space-y-2">
        <label className={labelClass} htmlFor="leitfaden-praxisart">So arbeitest du</label>
        <select
          id="leitfaden-praxisart"
          name="practiceType"
          value={formData.practiceType}
          onChange={handleChange}
          className={fieldClass}
        >
          <option value="">Bitte wählen</option>
          {PRACTICE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      <label className="flex gap-3 text-sm leading-6 text-slate-600" htmlFor="leitfaden-einwilligung">
        <input
          id="leitfaden-einwilligung"
          name="consent"
          type="checkbox"
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-[#25c990] focus:ring-[#25c990]"
        />
        <span>
          Ich möchte den Leitfaden erhalten und bin einverstanden, dass die Healio GmbH mich dazu per
          E-Mail und, wenn ich meine Nummer angebe, telefonisch kontaktiert. Ich kann das jederzeit
          widerrufen, zum Beispiel per Mail an info@healio.de. Hinweise in der{' '}
          <Link to="/datenschutz" className="font-semibold text-[#0b4d4a] underline underline-offset-2">
            Datenschutzerklärung
          </Link>.
        </span>
      </label>

      {errorMessage !== '' && (
        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#25c990] px-6 py-4 text-base font-extrabold text-[#07111f] shadow-lg shadow-[#25c990]/20 transition hover:bg-[#1db37f] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Wird gesendet
          </>
        ) : (
          <>
            Leitfaden kostenlos anfordern
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-500">
        Vorname, E-Mail und Praxisart brauchen wir. Kein Newsletter, kein Weiterverkauf deiner Daten.
      </p>
    </form>
  );
};

export default PraxisLeitfadenForm;
