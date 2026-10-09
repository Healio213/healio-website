import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { createAltersvorsorgeKontaktState, openAltersvorsorgeStartinfo } from '@/lib/altersvorsorgeArtikelCheck';
import { buildInternalRatgeberUrl } from '@/lib/ratgeber-cta';
import { CHECK_KONTAKT_URL, webinarAnmeldung as content } from '@/content/altersvorsorgedepotContent';

// Solange kein bestätigtes Webinar bereitsteht, keine Anmeldung oder
// Kalenderdatei anbieten. Fahrplan und bestehender Kontaktweg funktionieren.
const AltersvorsorgeWebinarForm = forwardRef(({ rechnerWert, id = 'webinar' }, ref) => {
  const { search } = useLocation();
  const kontaktRef = useRef(null);
  const [purpose, setPurpose] = useState('info');
  const kontaktUrl = buildInternalRatgeberUrl(CHECK_KONTAKT_URL, search, {
    utm_source: 'healio', utm_medium: 'landingpage', utm_campaign: 'altersvorsorgedepot',
  });

  useImperativeHandle(ref, () => ({
    rueckrufVorbereiten: () => {
      setPurpose('rueckruf');
      kontaktRef.current?.focus();
    },
  }), []);

  return (
    <section id={id} className="healio-container scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8" aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-base font-semibold text-[#087654]">{content.eyebrow}</p>
        <h2 id={`${id}-heading`} className="mt-2 font-display text-2xl font-extrabold text-[#07111f] sm:text-3xl">{content.ueberschrift}</h2>
        <p className="mt-4 text-base leading-7 text-slate-700">{content.bonus}</p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-base leading-7 text-slate-700 marker:text-[#087654]">
          {content.punkte.map((punkt) => <li key={punkt}>{punkt}</li>)}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="/downloads/healio-zuschuss-fahrplan-2027.pdf" download="Healio-Zuschuss-Fahrplan-2027.pdf" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25c990] px-5 py-3 text-center text-base font-extrabold text-[#07111f] transition hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
            <ArrowDownToLine className="h-5 w-5 shrink-0" aria-hidden="true" />
            Zuschuss-Fahrplan herunterladen
          </a>
          <button type="button" onClick={openAltersvorsorgeStartinfo} className="inline-flex min-h-14 items-center justify-center rounded-xl border border-[#087654] px-5 py-3 text-center text-base font-semibold text-[#087654] transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
            Den Start nicht verpassen
          </button>
          <Link ref={kontaktRef} to={kontaktUrl} state={createAltersvorsorgeKontaktState(rechnerWert, purpose)} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 text-center text-base font-semibold text-[#07111f] transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
            {purpose === 'rueckruf' ? 'Rückruf anfragen' : content.knopf}
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-4 text-base leading-7 text-slate-600">Webinar-Termine folgen, sobald sie feststehen. Deine Kontaktanfrage ist keine Webinar-Anmeldung und kein Vorsorgevertrag.</p>
      </div>
    </section>
  );
});

AltersvorsorgeWebinarForm.displayName = 'AltersvorsorgeWebinarForm';
export default AltersvorsorgeWebinarForm;
