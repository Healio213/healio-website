import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownToLine,
  Check,
} from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FriendlyIcon from '@/components/ui/FriendlyIcon';

const DOWNLOAD_PATH = '/downloads/praxis-checkliste-zahnaerzte-2026-08.pdf';

const konzeptgrenzen = [
  'Die Praxis informiert nur allgemein über eine Möglichkeit.',
  'Sie empfiehlt keinen Versicherer, Tarif oder konkreten Abschluss.',
  'Sie berät nicht zu Versicherungsbedingungen oder zur individuellen Eignung.',
  'Patienten entscheiden selbst und nehmen außerhalb der Praxis freiwillig Kontakt auf.',
  'Die Praxis erhält keine Vergütung oder erfolgsabhängige Gegenleistung.',
];

const ZahnaerztePraxisChecklistePage = () => (
  <>
    <SEOHead
      title="Praxis-Checkliste für Zahnarztpraxen | Healio"
      description="B2B-Arbeitsunterlage mit fünf Konzeptgrenzen für sachliche Patienteninformation in Zahnarztpraxen."
      canonicalUrl="https://healio.de/zahnaerzte/praxis-checkliste"
      robots="noindex, nofollow"
      ogImageAlt="Healio Praxis-Checkliste für Zahnarztpraxen"
    />

    <main className="zahn-checklist-page min-h-screen bg-[#f4faf7] pt-24 text-slate-700 sm:pt-28">
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_45%,rgba(37,201,144,0.16),transparent_55%)]" aria-hidden="true" />
        <div className="healio-container relative grid gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.75fr)] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 font-display text-xs font-bold uppercase tracking-[0.2em] text-[#5ee0b1]">
              B2B-Arbeitsunterlage für Zahnarztpraxen
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
              Die fünf Grenzen für sachliche Patienteninformation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Die 11-seitige Praxis-Checkliste zeigt, wie die Rollen von Praxis und externer Versicherungsberatung im vorgesehenen Healio-Ablauf getrennt werden sollen.
            </p>

            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={DOWNLOAD_PATH}
                download="Healio-Praxis-Checkliste-Zahnaerzte-2026-08.pdf"
                className="inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#25c990] px-6 py-4 font-display text-base font-extrabold text-[#07111f] shadow-[0_16px_40px_rgba(37,201,144,0.2)] transition hover:bg-[#5ee0b1] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#07111f] sm:w-auto"
              >
                <ArrowDownToLine className="h-5 w-5" aria-hidden="true" />
                Praxis-Checkliste herunterladen
              </a>
              <p className="text-sm leading-6 text-slate-400">
                PDF · 11 Seiten · ca. 290 KB<br />
                Version 12. August 2026
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md" aria-label="Fünf Konzeptgrenzen im Überblick">
            <div className="absolute -inset-4 rotate-2 rounded-[2rem] border border-[#25c990]/20" aria-hidden="true" />
            <div className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="font-display text-sm font-bold text-white">Praxis-Check</p>
                  <p className="mt-1 text-xs text-slate-400">Konzeptgrenzen im Arbeitsstand</p>
                </div>
                <FriendlyIcon kind="protection" tone="mint" size="sm" />
              </div>
              <ol className="space-y-4">
                {konzeptgrenzen.map((grenze, index) => (
                  <li key={grenze} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-6 text-slate-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#25c990]/30 bg-[#25c990]/10 font-display text-xs font-extrabold text-[#5ee0b1]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="pt-1">{grenze}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="healio-container px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] sm:p-8">
            <FriendlyIcon kind="document" tone="sky" size="sm" />
            <h2 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-slate-950">
              Was Sie herunterladen
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-6">
              {[
                'Eine allgemeine B2B-Arbeitshilfe für Zahnarztpraxen',
                'Eine Rollenabgrenzung zwischen Praxis und Versicherungsberatung',
                'Prüffragen für Material, Teamansprache und digitalen Folgeweg',
              ].map((punkt) => (
                <li key={punkt} className="flex gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#076046]" aria-hidden="true" />
                  <span>{punkt}</span>
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8" aria-labelledby="pruefstatus-title">
            <p className="font-display text-xs font-bold uppercase tracking-[0.18em] text-amber-800">
              Offenes Kammergate
            </p>
            <h2 id="pruefstatus-title" className="mt-3 font-display text-2xl font-extrabold tracking-tight text-slate-950">
              Fachlicher Arbeitsstand – noch keine berufsrechtliche Freigabe
            </h2>
            <div className="mt-5 space-y-4 leading-7 text-slate-700">
              <p>
                Diese PDF ist keine Patienteninformation, keine Rechtsberatung, keine Versicherungsberatung und keine Freigabe für den Praxiseinsatz.
              </p>
              <p>
                Das beschriebene Patientenmaterial und der gesamte Folgeweg bleiben für Veröffentlichung und Auslage gesperrt, bis das vollständige Paket der zuständigen Landeszahnärztekammer vorgelegt wurde und eine schriftliche berufsrechtliche Einschätzung vorliegt.
              </p>
            </div>
          </aside>
        </div>

        <nav aria-label="Rechtliche Informationen" className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-x-6 gap-y-3 border-t border-emerald-100 pt-7 text-sm font-semibold">
          <Link to="/impressum" className="text-slate-700 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-[#076046] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4">
            Impressum
          </Link>
          <Link to="/datenschutz#linkedin-lead-gen-formulare" className="text-slate-700 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-[#076046] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4">
            Datenschutz für LinkedIn-Formulare
          </Link>
          <Link to="/erstinformation" className="text-slate-700 underline decoration-emerald-300 decoration-2 underline-offset-4 hover:text-[#076046] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25c990] focus-visible:ring-offset-4">
            Erstinformation
          </Link>
        </nav>
      </section>
    </main>
  </>
);

export default ZahnaerztePraxisChecklistePage;
