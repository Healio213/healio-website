import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2, Phone } from 'lucide-react';
import FormHoneypot, { isHoneypotFilled } from '@/components/forms/FormHoneypot';
import { HEALIO_PHONE_DISPLAY, HEALIO_PHONE_TEL } from '@/config/contactChannels';
import { emailjsService } from '@/services/emailjsService';
import { useLanguage } from '@/hooks/useLanguage';
import { trackEvent } from '@/lib/analytics';

// Experiment 05.10.2026 nach dem Kontaktformular am Ende der Modellseiten auf
// mercedes-benz.de: ganz unten auf /zahn ein kurzes Rückruf-Formular als
// Auffangnetz für alle, die nach dem Lesen lieber sprechen wollen. Pflicht
// sind nur Vorname und Telefonnummer.
const TOPICS = [
  { value: 'angeraten', label: 'Eine Behandlung ist angeraten' },
  { value: 'luecke', label: 'Mir fehlen Zähne' },
  { value: 'familie', label: 'Familie und Kinder' },
  { value: 'anderes', label: 'Etwas anderes' },
];

const TIMES = [
  { value: 'vormittags', label: 'Vormittags' },
  { value: 'nachmittags', label: 'Nachmittags' },
  { value: 'egal', label: 'Egal' },
];

const INITIAL = { vorname: '', telefon: '', email: '', thema: '', zeit: 'egal', nachricht: '' };

const inputClass = 'block min-h-14 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-[#07111f] placeholder:text-slate-400 transition focus:border-home-mint focus:outline-none focus:ring-4 focus:ring-home-mint/20 aria-[invalid=true]:border-[#c2412d]';

const ChoiceGroup = ({ legend, name, options, value, onChange }) => (
  <fieldset>
    <legend className="text-base font-bold text-[#07111f]">{legend}</legend>
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <label
            key={option.value}
            className={`inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full border px-4 text-base font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-home-mint has-[:focus-visible]:ring-offset-2 ${checked ? 'border-home-midnight bg-home-midnight text-white' : 'border-slate-300 bg-white text-[#07111f] hover:border-[#07111f]'}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(name, option.value)}
              className="sr-only"
            />
            {checked ? <Check className="h-4 w-4 text-home-mint-active" aria-hidden="true" /> : null}
            {option.label}
          </label>
        );
      })}
    </div>
  </fieldset>
);

const DentalCallbackForm = () => {
  const { getPath } = useLanguage();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.vorname.trim()) next.vorname = 'Bitte gib deinen Vornamen an.';
    if (form.telefon.replace(/\D/g, '').length < 6) next.telefon = 'Bitte gib eine Telefonnummer an, unter der wir dich erreichen.';
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Diese E-Mail-Adresse sieht unvollständig aus.';
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isHoneypotFilled(event.currentTarget)) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`zahn-rueckruf-${firstError}`)?.focus();
      return;
    }

    setStatus('sending');
    const topic = TOPICS.find((item) => item.value === form.thema)?.label || 'nicht angegeben';
    const time = TIMES.find((item) => item.value === form.zeit)?.label || 'Egal';
    try {
      await emailjsService.sendEmail({
        from_name: form.vorname.trim(),
        from_email: form.email.trim(),
        phone: form.telefon.trim(),
        message: `Rückrufwunsch von healio.de/zahn\nThema: ${topic}\nBeste Zeit: ${time}\n\n${form.nachricht.trim()}`,
      }, 'Zahnseite Rückruf');
      trackEvent('zahn_rueckruf_gesendet', { thema: form.thema || 'keins' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="zahn-kontakt" className="scroll-mt-28 bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8 lg:py-28" aria-labelledby="zahn-kontakt-heading">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <p className="font-display text-base font-bold text-[#0b7a5a]">Rückruf</p>
          <h2 id="zahn-kontakt-heading" className="mt-3 max-w-[14ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.04em] text-[#07111f] [text-wrap:balance] sm:text-4xl lg:text-5xl">
            Lieber kurz sprechen?
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
            Hinterlass deinen Namen und deine Nummer. Wir rufen dich zurück und gehen deine Zahn-Situation in Ruhe mit dir durch.
          </p>
          <ul className="mt-7 space-y-3">
            {['Registrierter Versicherungsmakler', 'Deine Angaben nutzen wir nur für den Rückruf', 'Die Entscheidung bleibt bei dir'].map((point) => (
              <li key={point} className="flex items-center gap-3 text-base font-semibold text-[#07111f]">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e7f8f0] text-[#0b7a5a]" aria-hidden="true">
                  <Check className="h-4 w-4" />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <a
            href={HEALIO_PHONE_TEL}
            className="home-focus mt-8 inline-flex items-center gap-3 rounded-full border border-slate-300 px-5 py-3 text-base font-bold text-[#07111f] transition hover:border-[#07111f]"
          >
            <Phone className="h-5 w-5 text-[#0b7a5a]" aria-hidden="true" />
            <span>Oder direkt mit Nita sprechen: <span className="whitespace-nowrap">{HEALIO_PHONE_DISPLAY}</span></span>
          </a>
        </div>

        <div className="rounded-[1.75rem] border border-slate-200 bg-[#f8faf9] p-6 sm:p-8">
          {status === 'sent' ? (
            <div role="status" className="flex min-h-[22rem] flex-col items-start justify-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-home-mint text-home-midnight" aria-hidden="true">
                <Check className="h-7 w-7" />
              </span>
              <p className="mt-6 font-display text-2xl font-extrabold text-[#07111f]">Danke, {form.vorname.trim()}.</p>
              <p className="mt-3 max-w-md text-base leading-7 text-slate-700">
                Deine Rückrufbitte ist bei uns angekommen. Wir melden uns unter der Nummer, die du angegeben hast.
              </p>
            </div>
          ) : (
            <form method="post" onSubmit={handleSubmit} noValidate className="space-y-6">
              <FormHoneypot />
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="zahn-rueckruf-vorname" className="text-base font-bold text-[#07111f]">Vorname</label>
                  <input
                    id="zahn-rueckruf-vorname"
                    name="vorname"
                    autoComplete="given-name"
                    value={form.vorname}
                    onChange={(event) => setField('vorname', event.target.value)}
                    aria-invalid={errors.vorname ? 'true' : undefined}
                    aria-describedby={errors.vorname ? 'zahn-rueckruf-vorname-fehler' : undefined}
                    className={`mt-2 ${inputClass}`}
                  />
                  {errors.vorname ? <p id="zahn-rueckruf-vorname-fehler" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.vorname}</p> : null}
                </div>
                <div>
                  <label htmlFor="zahn-rueckruf-telefon" className="text-base font-bold text-[#07111f]">Telefonnummer</label>
                  <input
                    id="zahn-rueckruf-telefon"
                    name="telefon"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.telefon}
                    onChange={(event) => setField('telefon', event.target.value)}
                    aria-invalid={errors.telefon ? 'true' : undefined}
                    aria-describedby={errors.telefon ? 'zahn-rueckruf-telefon-fehler' : undefined}
                    className={`mt-2 ${inputClass}`}
                  />
                  {errors.telefon ? <p id="zahn-rueckruf-telefon-fehler" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.telefon}</p> : null}
                </div>
              </div>

              <div>
                <label htmlFor="zahn-rueckruf-email" className="text-base font-bold text-[#07111f]">
                  E-Mail <span className="font-normal text-slate-500">(freiwillig)</span>
                </label>
                <input
                  id="zahn-rueckruf-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setField('email', event.target.value)}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'zahn-rueckruf-email-fehler' : undefined}
                  className={`mt-2 ${inputClass}`}
                />
                {errors.email ? <p id="zahn-rueckruf-email-fehler" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.email}</p> : null}
              </div>

              <ChoiceGroup legend="Worum geht es?" name="thema" options={TOPICS} value={form.thema} onChange={setField} />
              <ChoiceGroup legend="Wann passt es dir am besten?" name="zeit" options={TIMES} value={form.zeit} onChange={setField} />

              <div>
                <label htmlFor="zahn-rueckruf-nachricht" className="text-base font-bold text-[#07111f]">
                  Nachricht <span className="font-normal text-slate-500">(freiwillig)</span>
                </label>
                <textarea
                  id="zahn-rueckruf-nachricht"
                  name="nachricht"
                  rows={3}
                  value={form.nachricht}
                  onChange={(event) => setField('nachricht', event.target.value)}
                  className={`mt-2 py-3 ${inputClass}`}
                />
              </div>

              {status === 'error' ? (
                <p role="alert" className="rounded-2xl bg-[#fff1ed] p-4 text-sm font-semibold leading-6 text-[#934638]">
                  Die Anfrage ist nicht angekommen. Bitte versuch es noch einmal oder ruf uns an: {HEALIO_PHONE_DISPLAY}.
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-home-mint px-7 font-display text-base font-extrabold text-home-midnight shadow-[0_14px_34px_rgba(37,201,144,0.25)] transition hover:bg-home-mint-active focus:outline-none focus-visible:ring-2 focus-visible:ring-home-mint focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : null}
                {status === 'sending' ? 'Wird gesendet' : 'Rückruf anfordern'}
              </button>

              <p className="text-sm leading-6 text-slate-600">
                Wir nutzen deine Angaben nur, um dich zu deiner Anfrage zurückzurufen. Mehr dazu in der{' '}
                <Link to={getPath('datenschutz')} className="font-semibold text-[#07111f] underline decoration-home-mint decoration-2 underline-offset-4">
                  Datenschutzerklärung
                </Link>.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default DentalCallbackForm;
