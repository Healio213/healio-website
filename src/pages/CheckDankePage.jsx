import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CalendarCheck, Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import CampaignShell from '@/components/campaign/CampaignShell';
import { META_CHECKS } from '@/content/meta-checks';
import { APPOINTMENT_BOOKING } from '@/lib/appointmentBooking';
import { consumeCheckLeadPending } from '@/lib/campaign-landing';
import { trackMetaLead } from '@/lib/meta-pixel';
import { trackGoogleAdsLead } from '@/lib/google-ads';
import { trackEvent } from '@/lib/analytics';

const NAME_PATTERN = /^[\p{L}][\p{L}\s'-]{0,39}$/u;

const naechsteSchritte = [
  'Wir prüfen, was deine Krankenkasse laut Satzung als Bonus zahlt.',
  'Wir suchen den Tarif, der zu dir passt, und rechnen den Beitrag gegen.',
  'Du bekommst die Auswertung und entscheidest in Ruhe.',
];

const CheckDankePage = ({ variant }) => {
  const config = META_CHECKS[variant];
  const location = useLocation();
  const counted = useRef(false);
  const rawName = typeof location.state?.firstName === 'string' ? location.state.firstName.trim() : '';
  const firstName = NAME_PATTERN.test(rawName) ? rawName : '';

  // Der Lead zählt erst hier und nur nach einer echten Anfrage. Die
  // Messfunktionen prüfen Einwilligung und gesperrte Seiten selbst; die
  // Schwangeren-Strecke ist für Meta, Google und Analyse gesperrt.
  useEffect(() => {
    if (counted.current) return;
    counted.current = true;
    if (!consumeCheckLeadPending(config.key)) return;
    try { trackEvent('generate_lead', { component: 'meta_check', placement: config.key }); } catch { /* Messung ist optional. */ }
    if (config.metaContentName) {
      try { trackMetaLead({ content_name: config.metaContentName }); } catch { /* Messung ist optional. */ }
      try { trackGoogleAdsLead(); } catch { /* Messung ist optional. */ }
    }
  }, [config]);

  return (
    <CampaignShell trustNote={null}>
      <SEOHead
        title="Deine Auswertung kommt | Healio"
        description="Bestätigung deiner Anfrage aus dem Healio Kurzcheck."
        canonicalUrl={`https://healio.de${config.thankYouPath}`}
        robots="noindex, nofollow"
      />

      <section className="bg-home-midnight pb-16 pt-10 text-white sm:pb-20 sm:pt-14">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-home-mint text-home-midnight" aria-hidden="true">
            <Check className="h-8 w-8" />
          </span>
          <h1 className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] [text-wrap:balance] sm:text-5xl">
            {firstName ? `Danke, ${firstName}. Deine Auswertung kommt.` : 'Danke. Deine Auswertung kommt.'}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            {config.thankYou.text}
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-8 max-w-2xl space-y-6 px-4 pb-12 sm:-mt-10 sm:px-6 sm:pb-16">
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_24px_60px_rgba(7,17,31,0.10)] sm:p-8">
          <h2 className="font-display text-xl font-extrabold tracking-tight text-home-midnight sm:text-2xl">So geht es weiter</h2>
          <ol className="mt-5 space-y-4">
            {naechsteSchritte.map((schritt, index) => (
              <li key={schritt} className="flex gap-4">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e7f8f0] font-display text-base font-extrabold text-[#0b7a5a]">
                  {index + 1}
                </span>
                <span className="pt-1 text-base leading-7 text-slate-700">{schritt}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8">
          <h2 className="font-display text-xl font-extrabold tracking-tight text-home-midnight sm:text-2xl">Lieber gleich sprechen?</h2>
          <p className="mt-3 text-base leading-7 text-slate-600">{config.thankYou.termin}</p>
          <a
            href={APPOINTMENT_BOOKING.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-home-midnight px-6 font-display text-base font-extrabold text-white transition hover:bg-[#0b4d4a] sm:w-auto"
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Gesprächstermin wählen
          </a>
        </section>
      </div>
    </CampaignShell>
  );
};

export default CheckDankePage;
