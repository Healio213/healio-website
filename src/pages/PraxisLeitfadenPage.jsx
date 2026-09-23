import React from 'react';
import { Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import PraxisLeitfadenForm from '@/components/sections/partner/PraxisLeitfadenForm';

const CANONICAL_URL = 'https://healio.de/partner/leitfaden';

const nutzen = [
  {
    kind: 'budget',
    tone: 'mint',
    title: 'Wie aus Kassenbonus und Zusatzschutz ein Budget wird',
    text: 'Mit einem durchgerechneten Beispiel: welcher Betrag aus dem Bonusprogramm der Kasse kommt, welcher Teil aus dem Zusatzschutz, und was in zwei Jahren zusammenkommt.',
  },
  {
    kind: 'calendar',
    tone: 'butter',
    title: 'Der Ablauf für deine Praxis in fünf Schritten',
    text: 'Vom ersten Hinweis im Gespräch bis zur fortgesetzten Behandlungsserie. Du informierst, Healio prüft und berät. Versicherungsberatung durch dich ist dafür nicht nötig.',
  },
  {
    kind: 'protection',
    tone: 'sky',
    title: 'Ehrliche Antworten auf die sechs häufigsten Einwände',
    text: 'Was Patienten fragen, was Kolleginnen und Kollegen einwenden, und wo das Konzept an seine Grenzen kommt. Mit den Stellen, an denen es nicht passt.',
  },
];

const PraxisLeitfadenPage = () => (
  <>
    <SEOHead
      title="Der Therapieabbruch-Stopper: Leitfaden für Naturheilpraxen | Healio"
      description="Kostenloser Leitfaden für Naturheilpraxen: wie aus Kassenbonus und Zusatzschutz bis zu 3.000 EUR Gesundheitsbudget in zwei Jahren werden und wie der Ablauf in fünf Schritten aussieht."
      canonicalUrl={CANONICAL_URL}
      ogImageAlt="Healio Leitfaden für Naturheilpraxen"
      schemaMarkup={{
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: 'Der Therapieabbruch-Stopper: Leitfaden für Naturheilpraxen',
        description: 'Kostenloser Leitfaden für Naturheilpraxen zum Gesundheitsbudget aus Kassenbonus und Zusatzschutz.',
        inLanguage: 'de-DE',
        isPartOf: { '@id': 'https://healio.de/#website' },
        about: { '@id': 'https://healio.de/#organization' },
      }}
    />

    <main className="min-h-screen bg-[#f4faf7] pt-24 text-slate-700 sm:pt-28">
      <section className="healio-container px-4 pb-16 pt-8 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.85fr)] lg:items-start">
          <div className="max-w-2xl">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#0b4d4a]">
              Kostenloser Leitfaden für Praxen
            </p>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-5xl">
              Der Therapieabbruch-Stopper: So machen deine Selbstzahler die Behandlungsserie zu Ende
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Bis zu 3.000 EUR Gesundheitsbudget in zwei Jahren aus Kassenbonus und Zusatzschutz.
              Der Ablauf für Naturheilpraxen in fünf Schritten. Kostenlos als PDF.
            </p>

            <ul className="mt-10 space-y-6">
              {nutzen.map((punkt) => (
                <li key={punkt.title} className="flex gap-4">
                  <FriendlyIcon kind={punkt.kind} tone={punkt.tone} size="sm" />
                  <div>
                    <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-950">
                      {punkt.title}
                    </h2>
                    <p className="mt-2 leading-7 text-slate-600">{punkt.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-emerald-100 bg-white p-6 sm:p-7">
              <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-[#0b4d4a]">
                Für wen der Leitfaden gedacht ist
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Für Praxen mit Selbstzahlern und längeren Behandlungsserien: Naturheilkunde,
                Osteopathie, Chiropraktik. Nicht gedacht für Praxen, die vor allem Kassenpatienten
                mit Verordnung behandeln.
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-6 text-slate-600">
                {[
                  'PDF, sofort nach dem Absenden zum Herunterladen',
                  'Keine Anmeldung, kein Newsletter',
                  'Healio berät und vermittelt, deine Praxis informiert nur',
                ].map((zeile) => (
                  <li key={zeile} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#076046]" aria-hidden="true" />
                    <span>{zeile}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-28">
            <p className="mb-4 font-display text-xl font-extrabold tracking-tight text-slate-950">
              Leitfaden anfordern
            </p>
            <PraxisLeitfadenForm />
          </div>
        </div>
      </section>
    </main>
  </>
);

export default PraxisLeitfadenPage;
