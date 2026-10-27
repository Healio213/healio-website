import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import FormHoneypot, { isHoneypotFilled } from '@/components/forms/FormHoneypot';
import { getAltersvorsorgeArticleSource, trackAltersvorsorgeFunnel } from '@/lib/altersvorsorgeAnalytics';
import { emailjsService } from '@/services/emailjsService';
import { berechneZulagen, formatEuroDE } from '@/lib/altersvorsorgeZulagen';
import { berechneVorsorgeModell, berechneSteuerModell, buildVormerkungMessage, vormerkungConsent } from '@/lib/altersvorsorgeVormerkung';

const Modellrechnung = ({ value }) => {
  const [alter, setAlter] = useState(42);
  const [steuersatz, setSteuersatz] = useState(0.3);
  const modell = berechneVorsorgeModell({ monatsbeitrag: value.monatsbeitrag, alter });
  const steuer = berechneSteuerModell({ ...value, steuersatz });
  return (
    <div data-vorsorge-modell className="mt-6 border-t border-emerald-200 pt-6">
      <h3 className="font-display text-xl font-extrabold text-slate-950">Deine Modellrechnung bis 67</h3>
      <p className="mt-2 text-base leading-7 text-slate-600">Passe die Annahmen an. Die voreingestellten 42 Jahre und 30 % sind Beispiele, keine Angaben zu deiner Person.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-base font-semibold text-slate-800" htmlFor="vorsorge-alter">Alter im Modell
          <input id="vorsorge-alter" type="number" min="18" max="66" value={alter} onChange={(event) => setAlter(event.target.value === '' ? '' : Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus-visible:outline-emerald-700" />
        </label>
        <label className="text-base font-semibold text-slate-800" htmlFor="vorsorge-steuersatz">Angenommener Grenzsteuersatz
          <select id="vorsorge-steuersatz" value={steuersatz} onChange={(event) => setSteuersatz(Number(event.target.value))} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus-visible:outline-emerald-700">
            <option value="0.2">20 %</option><option value="0.3">30 %</option><option value="0.42">42 %</option>
          </select>
        </label>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2" aria-live="polite" aria-atomic="true">
        <div className="rounded-xl bg-[#064b3d] p-5 text-white"><p>ETF-Depot mit 67 im Modell</p><p className="mt-2 text-3xl font-extrabold">{modell ? formatEuroDE(Math.round(modell.endkapital)) : 'Alter 18–66 eingeben'}</p>{modell && <p className="mt-2 text-sm leading-6 text-white/85">Über {modell.jahre} Jahre: {formatEuroDE(modell.eigenbeitraege)} Eigenbeiträge und {formatEuroDE(modell.zulagen)} Grundzulagen.</p>}</div>
        <div className="rounded-xl border border-emerald-200 bg-white p-5"><p className="text-slate-700">Zusätzlicher Steuervorteil im Modelljahr 2027</p><p className="mt-2 text-3xl font-extrabold text-[#064b3d]">{formatEuroDE(steuer)}</p><p className="mt-2 text-sm leading-6 text-slate-600">Reguläre Zulage bereits angerechnet. Der einmalige Startbonus bleibt bei der Günstigerprüfung außer Betracht. Der tatsächliche Vorteil hängt von Einkommen und Günstigerprüfung ab.</p></div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">Depotannahmen: {formatEuroDE(value.monatsbeitrag)} monatlich bis 67, 4 % jährliche Rendite nach angenommenen Kosten; keine Renditezusage. Eigenbeiträge jeweils am Monatsende, heutige Grundzulage unverändert und rechnerisch jeweils zum Jahresende gutgeschrieben. Ohne Kinderzulage, Startbonus und Wiederanlage von Steuerersparnissen. Vor späteren Auszahlungssteuern, ohne Inflationsausgleich. Auch Verluste sind möglich. Das Steuermodell vereinfacht den Tarif mit einem festen Satz und ist keine persönliche Steuerberechnung.</p>
    </div>
  );
};

const AltersvorsorgeVormerkung = ({ value, requestNumber = 0, sourceArticleSlug = null }) => {
  const firstNameRef = useRef(null);
  const pendingRef = useRef(false);
  const mountedRef = useRef(false);
  const formStarted = useRef(false);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle');
  const [savedValue, setSavedValue] = useState(null);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);
  const ergebnis = berechneZulagen(value);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);
  useEffect(() => {
    if (!pendingRef.current) { setStatus('idle'); setSavedValue(null); setError(''); firstNameRef.current?.focus({ preventScroll: true }); }
  }, [requestNumber]);

  const beginForm = (event) => {
    if (['first_name', 'email', 'phone'].includes(event.target.name) && !formStarted.current) {
      formStarted.current = trackAltersvorsorgeFunnel('form_start', 'inline_form');
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (pendingRef.current || isHoneypotFilled(form) || !form.reportValidity()) return;
    const data = new FormData(form);
    const snapshot = { ...value };
    const articleSource = getAltersvorsorgeArticleSource(sourceArticleSlug);
    const mitTelefon = String(data.get('phone') || '').trim() !== '';
    pendingRef.current = true;
    setStatus('sending'); setError('');
    try {
      await emailjsService.sendEmail({
        from_name: String(data.get('first_name')).trim(), from_email: String(data.get('email')).trim(),
        phone: String(data.get('phone') || '').trim(), company: '',
        message: [buildVormerkungMessage(snapshot, mitTelefon), articleSource ? `Ratgeber-Herkunft: /ratgeber/${articleSource}` : ''].filter(Boolean).join('\n\n'),
      }, 'Altersvorsorge Vormerkung', { track: false, campaign: false });
      trackAltersvorsorgeFunnel('lead', 'inline_form');
      if (!mountedRef.current) return;
      setSavedValue(snapshot); setStatus('success'); setPhone(''); setConsent(false);
      form.reset();
    } catch {
      if (!mountedRef.current) return;
      setStatus('idle');
      setError('Deine Anfrage konnte gerade nicht bestätigt werden. Deine Eingaben bleiben erhalten. Bitte versuche es erneut oder nutze unser Kontaktformular.');
    } finally { pendingRef.current = false; }
  };

  return (
    <div id="altersvorsorge-vormerkung" data-altersvorsorge-vormerkung className="mt-8 scroll-mt-28 rounded-2xl border border-emerald-200 bg-[#f4faf7] p-5 sm:p-8" aria-labelledby="vormerkung-heading">
      {status === 'success' ? (
        <div data-vormerkung-erfolg>
          <div role="status"><CheckCircle2 className="h-8 w-8 text-emerald-700" aria-hidden="true" /><h3 id="vormerkung-heading" className="mt-3 font-display text-2xl font-extrabold text-slate-950">Deine Berechnung ist bei uns angekommen.</h3><p className="mt-3 text-base leading-7 text-slate-700">Übernommen: {formatEuroDE(savedValue.monatsbeitrag)} Monatsbeitrag und {formatEuroDE(berechneZulagen(savedValue).zulageJahr)} jährliche Zulage im Beispiel. Healio meldet sich zu deinem Vorabcheck und zur Vorbereitung für Januar 2027. Mit deiner Anfrage gehst du keinen Vertrag ein.</p></div>
          <Modellrechnung value={savedValue} />
        </div>
      ) : (
        <>
          <h3 id="vormerkung-heading" className="font-display text-2xl font-extrabold text-slate-950">Deine Berechnung für Januar vormerken</h3>
          <p className="mt-3 rounded-xl border border-emerald-200 bg-white p-4 text-base font-semibold leading-7 text-[#064b3d]" aria-live="polite">Deine aktuelle Berechnung: {formatEuroDE(value.monatsbeitrag)} Monatsbeitrag, {formatEuroDE(ergebnis.zulageJahr)} jährliche Zulage und {value.kinder} berücksichtigte Kinder.{ergebnis.startbonus > 0 ? ` Dazu ${formatEuroDE(ergebnis.startbonus)} einmaliger Startbonus.` : ''}</p>
          <p className="mt-3 text-base leading-7 text-slate-600">Nach dem Absenden siehst du dein Steuer- und ETF-Modell. Deine persönliche Einschätzung klären wir im unverbindlichen Vorabcheck.</p>
          <form method="post" action="/kontakt" onSubmit={submit} onInput={beginForm} className="mt-5 space-y-4">
            <fieldset disabled={status === 'sending'} className="grid min-w-0 gap-4 sm:grid-cols-2">
              <legend className="sr-only">Deine Kontaktdaten</legend>
              <label htmlFor="vormerkung-name" className="text-base font-semibold text-slate-800">Vorname<input ref={firstNameRef} id="vormerkung-name" name="first_name" required maxLength={80} autoComplete="given-name" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus-visible:outline-emerald-700" /></label>
              <label htmlFor="vormerkung-email" className="text-base font-semibold text-slate-800">E-Mail-Adresse<input id="vormerkung-email" name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus-visible:outline-emerald-700" /></label>
              <label htmlFor="vormerkung-phone" className="text-base font-semibold text-slate-800 sm:col-span-2">Mobilnummer für Rückfragen (optional)<input id="vormerkung-phone" name="phone" type="tel" maxLength={40} pattern={String.raw`[+0-9][0-9\s\/\(\)\.\+\-]{5,39}`} autoComplete="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setConsent(false); }} className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus-visible:outline-emerald-700" /></label>
              <FormHoneypot id="vormerkung-website" />
              <label className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:col-span-2"><input name="consent" type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-emerald-700" /><span>{vormerkungConsent(phone.trim() !== '')} Mehr dazu in der <Link to="/datenschutz" className="font-semibold text-emerald-800 underline">Datenschutzerklärung</Link>.</span></label>
            </fieldset>
            {error && <p role="alert" className="text-base leading-7 text-red-700">{error} <Link to="/kontakt#kontaktformular" className="underline">Zum Kontaktformular</Link></p>}
            <button type="submit" disabled={status === 'sending'} className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-[#25c990] px-5 py-4 text-center font-display text-base font-extrabold text-[#07111f] hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:opacity-60">{status === 'sending' ? 'Berechnung wird gesendet …' : 'Berechnung speichern & für Januar vormerken'}</button>
            <p className="text-sm leading-6 text-slate-500">Unverbindliche Anfrage an Healio. Deine Daten nutzen wir für diese Anfrage. Du gehst keinen Vorsorgevertrag ein.</p>
          </form>
        </>
      )}
    </div>
  );
};

export default AltersvorsorgeVormerkung;
