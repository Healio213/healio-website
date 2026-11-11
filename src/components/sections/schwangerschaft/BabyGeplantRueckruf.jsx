import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Loader2 } from 'lucide-react';
import FormHoneypot, { isHoneypotFilled } from '@/components/forms/FormHoneypot';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { emailjsService } from '@/services/emailjsService';
import { useLanguage } from '@/hooks/useLanguage';

/**
 * Kleiner Rückruf-Abschnitt auf /schwangerschaft/baby-geplant (Seitenplan 3.9
 * und 5.3). Bewusst schlank: nur Vorname, Telefonnummer und Wunschzeit, keine
 * E-Mail, kein Thema, kein Freitext, damit keine Gesundheitsangaben ins
 * Formular gelangen. Die Herkunft steht fest im Code. Keine Messung: weder
 * trackEvent noch Zähler, und der Versand läuft ohne die Lead-Ereignisse
 * von Google Analytics, Meta und Google Ads (track: false).
 */
const HERKUNFT = '/schwangerschaft/baby-geplant';

const ZEITEN = [
  { value: 'vormittags', label: 'Vormittags' },
  { value: 'nachmittags', label: 'Nachmittags' },
  { value: 'egal', label: 'Egal' },
];

const inputClass = 'block min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-base text-[#07111f] placeholder:text-slate-400 transition focus:border-home-mint focus:outline-none focus:ring-4 focus:ring-home-mint/20 aria-[invalid=true]:border-[#c2412d] md:min-h-14';

const BabyGeplantRueckruf = ({ ueberschrift, text }) => {
  const { getPath } = useLanguage();
  const [form, setForm] = useState({ vorname: '', telefon: '', zeit: 'egal' });
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
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isHoneypotFilled(event.currentTarget)) return;
    const nextErrors = validate();
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      document.getElementById(`baby-rueckruf-${firstError}`)?.focus();
      return;
    }

    setStatus('sending');
    const zeit = ZEITEN.find((item) => item.value === form.zeit)?.label || 'Egal';
    try {
      await emailjsService.sendEmail({
        from_name: form.vorname.trim(),
        from_email: '',
        phone: form.telefon.trim(),
        message: `Rückrufwunsch von healio.de${HERKUNFT}\nBeste Zeit: ${zeit}`,
      }, 'Baby geplant Rückruf', { track: false });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="rueckruf" className="healio-container scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="baby-rueckruf-heading">
      <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-slate-200 bg-white p-5 sm:p-8">
        <FriendlyIcon kind="support" tone="mint" size="md" className="mb-3" />
        <h2 id="baby-rueckruf-heading" className="font-display text-2xl font-extrabold tracking-tight text-slate-950">{ueberschrift}</h2>
        <p className="mt-3 text-base leading-7 text-slate-600">{text}</p>

        {status === 'sent' ? (
          <div role="status" className="mt-6 flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-home-mint text-home-midnight" aria-hidden="true">
              <Check className="h-6 w-6" />
            </span>
            <p className="text-base leading-7 text-slate-700">
              Danke, {form.vorname.trim()}. Deine Rückrufbitte ist angekommen. Wir melden uns unter der Nummer, die du angegeben hast.
            </p>
          </div>
        ) : (
          <form method="post" action="/kontakt" onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
            <FormHoneypot id="baby-rueckruf-honeypot" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="baby-rueckruf-vorname" className="text-base font-bold text-[#07111f]">Vorname</label>
                <input
                  id="baby-rueckruf-vorname"
                  name="vorname"
                  autoComplete="given-name"
                  value={form.vorname}
                  onChange={(event) => setField('vorname', event.target.value)}
                  aria-invalid={errors.vorname ? 'true' : undefined}
                  aria-describedby={errors.vorname ? 'baby-rueckruf-vorname-fehler' : undefined}
                  className={`mt-2 ${inputClass}`}
                />
                {errors.vorname ? <p id="baby-rueckruf-vorname-fehler" role="alert" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.vorname}</p> : null}
              </div>
              <div>
                <label htmlFor="baby-rueckruf-telefon" className="text-base font-bold text-[#07111f]">Telefonnummer</label>
                <input
                  id="baby-rueckruf-telefon"
                  name="telefon"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.telefon}
                  onChange={(event) => setField('telefon', event.target.value)}
                  aria-invalid={errors.telefon ? 'true' : undefined}
                  aria-describedby={errors.telefon ? 'baby-rueckruf-telefon-fehler' : undefined}
                  className={`mt-2 ${inputClass}`}
                />
                {errors.telefon ? <p id="baby-rueckruf-telefon-fehler" role="alert" className="mt-2 text-sm font-semibold text-[#c2412d]">{errors.telefon}</p> : null}
              </div>
            </div>

            <fieldset>
              <legend className="text-base font-bold text-[#07111f]">Wann passt es dir?</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {ZEITEN.map((option) => {
                  const checked = form.zeit === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-base font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-home-mint has-[:focus-visible]:ring-offset-2 ${checked ? 'border-home-midnight bg-home-midnight text-white' : 'border-slate-300 bg-white text-[#07111f] hover:border-[#07111f]'}`}
                    >
                      <input type="radio" name="zeit" value={option.value} checked={checked} onChange={() => setField('zeit', option.value)} className="sr-only" />
                      {checked ? <Check className="h-4 w-4 text-home-mint-active" aria-hidden="true" /> : null}
                      {option.label}
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {status === 'error' ? (
              <p role="alert" className="rounded-2xl bg-[#fff1ed] p-4 text-sm font-semibold leading-6 text-[#934638]">
                Das hat nicht geklappt. Ruf uns gern direkt an oder versuch es gleich noch einmal.
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
              Wir nutzen deine Angaben nur, um dich zurückzurufen. Mehr dazu in der{' '}
              <Link to={getPath('datenschutz')} className="font-semibold text-[#07111f] underline decoration-home-mint decoration-2 underline-offset-4">
                Datenschutzerklärung
              </Link>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default BabyGeplantRueckruf;
