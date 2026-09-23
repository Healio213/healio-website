import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownToLine, CalendarCheck } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { APPOINTMENT_BOOKING } from '@/lib/appointmentBooking';
import { trackMetaLead } from '@/lib/meta-pixel';

export const LEITFADEN_DOWNLOAD_PATH = '/downloads/healio-leitfaden-therapieabbruch-stopper-2026.pdf';

// Der Termin fuehrt auf dieselbe Buchung wie /partner. Die Kampagnenmerkmale
// bleiben an der internen Adresse, weil der Google-Kalender sie nicht liest.
const TERMIN_PATH = '/partner?utm_source=leitfaden&utm_medium=danke&utm_campaign=therapieabbruch-stopper#calendly-embed';

const praxisCheck = [
  {
    kind: 'thinking',
    tone: 'mint',
    title: 'Passt das Konzept zu deinen Patienten',
    text: 'Wir schauen uns an, wer bei dir in Behandlung ist und ob das Gesundheitsbudget für diese Menschen überhaupt etwas bringt.',
  },
  {
    kind: 'document',
    tone: 'butter',
    title: 'Material und Ablauf',
    text: 'Welche Karten, Flyer oder QR-Codes du bekommst, wer sie erklärt und an welcher Stelle im Praxisalltag das ohne Umbau funktioniert.',
  },
  {
    kind: 'support',
    tone: 'sky',
    title: 'Deine Fragen',
    text: 'Rollen, Grenzen, Kosten. Du fragst, wir antworten. Danach entscheidest du in Ruhe.',
  },
];

const PraxisLeitfadenDankePage = () => (
  <>
    <SEOHead
      title="Dein Leitfaden ist da | Healio"
      description="Der Praxis-Leitfaden steht zum Herunterladen bereit. Danach kannst du einen Praxis-Check mit Healio buchen."
      canonicalUrl="https://healio.de/partner/leitfaden/danke"
      robots="noindex, nofollow"
      ogImageAlt="Healio Leitfaden für Naturheilpraxen"
    />

    <main className="min-h-screen bg-[#f4faf7] pt-24 text-slate-700 sm:pt-28">
      <section className="healio-container px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FriendlyIcon kind="document" tone="mint" size="lg" className="mx-auto" />
          <h1 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
            Dein Leitfaden ist da
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Lade das PDF direkt hier herunter. Am besten legst du es gleich auf dem Rechner ab, auf
            dem du in der Praxis arbeitest.
          </p>

          <a
            href={LEITFADEN_DOWNLOAD_PATH}
            download="Healio-Leitfaden-Therapieabbruch-Stopper-2026.pdf"
            className="mt-9 inline-flex min-h-16 w-full items-center justify-center gap-3 rounded-xl bg-[#25c990] px-8 py-5 font-display text-lg font-extrabold text-[#07111f] shadow-[0_16px_40px_rgba(37,201,144,0.22)] transition hover:bg-[#1db37f] sm:w-auto"
          >
            <ArrowDownToLine className="h-6 w-6" aria-hidden="true" />
            Leitfaden als PDF herunterladen
          </a>

          {/* Platz für ein kurzes Video von Frank. Es wird hier eingesetzt,
              sobald die Aufnahme fertig ist; bis dahin steht hier bewusst
              kein leerer Rahmen. */}
        </div>
      </section>

      <section className="healio-container px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-9">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950">
            Was dich im Praxis-Check erwartet
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            30 Minuten, per Telefon oder Videocall. Kostenlos und ohne Verpflichtung.
          </p>

          <ul className="mt-8 space-y-6">
            {praxisCheck.map((punkt) => (
              <li key={punkt.title} className="flex gap-4">
                <FriendlyIcon kind={punkt.kind} tone={punkt.tone} size="sm" />
                <div>
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-slate-950">
                    {punkt.title}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-600">{punkt.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to={TERMIN_PATH}
              onClick={() => trackMetaLead()}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#0b4d4a] px-6 py-4 font-display text-base font-extrabold text-white transition hover:bg-[#076046]"
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Praxis-Check buchen
            </Link>
            <a
              href={APPOINTMENT_BOOKING.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMetaLead()}
              className="text-sm font-semibold text-slate-700 underline underline-offset-2"
            >
              Lieber sofort einen Termin wählen
            </a>
          </div>
        </div>
      </section>
    </main>
  </>
);

export default PraxisLeitfadenDankePage;
