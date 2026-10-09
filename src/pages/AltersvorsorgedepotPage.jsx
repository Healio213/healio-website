import React, { useMemo, useRef, useState } from 'react';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { createFAQSchema } from '@/lib/createSchemaMarkup';
import ZulagenRechner from '@/components/sections/altersvorsorge/ZulagenRechner';
import AltersvorsorgeWebinarForm from '@/components/sections/altersvorsorge/AltersvorsorgeWebinarForm';
import AltersvorsorgeHero from '@/components/sections/altersvorsorge/AltersvorsorgeHero';
import AltersvorsorgeBegleitung from '@/components/sections/altersvorsorge/AltersvorsorgeBegleitung';
import AltersvorsorgeZuschussCheck from '@/components/sections/altersvorsorge/AltersvorsorgeZuschussCheck';
import { readArtikelCheckState } from '@/lib/altersvorsorgeArtikelCheck';
import { formatEuroDE } from '@/lib/altersvorsorgeZulagen';
import {
  CANONICAL_URL,
  FUER_WERTE,
  getVariante,
  beispiele,
  problemLoesung,
  neuerungen,
  fuerWenEs,
  ablauf,
  faq,
  fussHinweis,
} from '@/content/altersvorsorgedepotContent';

const scrollToId = (id) => {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
};

/**
 * Landingpage /altersvorsorgedepot. Aufbau nach Eisert (Q23): Eyebrow, H1
 * mit Ergebnis, Unterzeile, Angebotskarte, Rechner ohne Anmeldung,
 * Zuschuss-Check (Ziel der Seite: der Termin), Problem/Verstärkung/Lösung,
 * Ablauf, Webinar-Anmeldung als weicher Weg, Begleitung durch Healio, FAQ.
 * Reihenfolge und Texte siehe
 * Healio/Altersvorsorgedepot-Funnel/LANDINGPAGE-TEXT.md.
 *
 * Healio ist der Absender. Der Hero nutzt das vorhandene Markenrelief der
 * Unternehmensseite, darunter bleibt die vollständige Zulagenkarte erhalten.
 *
 * ?fuer= tauscht nur Eyebrow, H1, Unterzeile, Fußnote, die Kachelreihenfolge
 * der Angebotskarte und die Rechner-Voreinstellung. Ein unbekannter oder
 * fehlender Wert zeigt die Standardvariante.
 */
// Trennt „25 EUR im Monat von ihr.“ in den großen Betrag und die kleine Erläuterung,
// damit die Zahl in der Beispielkarte sofort ins Auge fällt.
function splitBetrag(text) {
  const match = /^([\d.,]+\s*EUR)\s*(.*)$/.exec(text || '');
  if (!match) return { betrag: text, rest: '' };
  return { betrag: match[1], rest: match[2].replace(/\.$/, '') };
}

const AltersvorsorgedepotPage = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const fuerRoh = searchParams.get('fuer');
  const fuerParam = FUER_WERTE.includes(fuerRoh) ? fuerRoh : null;
  const variante = useMemo(() => getVariante(fuerParam), [fuerParam]);

  const artikelCheck = useMemo(() => readArtikelCheckState(state), [state]);
  const [rechnerWert, setRechnerWert] = useState(() => ({ ...variante.voreinstellung, ...(artikelCheck?.value || {}) }));
  // "Lieber anrufen lassen" im Zuschuss-Check bereitet den Rückruf im Formular vor.
  const formRef = useRef(null);

  return (
    <>
      <SEOHead
        title="Altersvorsorgedepot 2027: Zulage berechnen | Healio"
        description="Bis zu 540 EUR Grundzulage im Jahr, bis zu 300 EUR je zugeordnetem zulagenberechtigten Kind. Rechne in einer Minute aus, wie viel Staatszuschuss beim neuen Altersvorsorgedepot für Selbstständige und Familien drin ist."
        canonicalUrl={CANONICAL_URL}
        ogImageAlt="Healio Altersvorsorgedepot: Zulagen-Rechner"
        schemaMarkup={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'WebPage',
              '@id': `${CANONICAL_URL}#webpage`,
              url: CANONICAL_URL,
              name: 'Altersvorsorgedepot 2027: Zulage berechnen',
              description: 'Bis zu 540 EUR Grundzulage im Jahr, bis zu 300 EUR je zugeordnetem zulagenberechtigten Kind. Der Zulagen-Rechner für das neue Altersvorsorgedepot ab 2027.',
              inLanguage: 'de-DE',
              isPartOf: { '@id': 'https://healio.de/#website' },
              about: { '@id': 'https://healio.de/#organization' },
            },
            createFAQSchema(faq),
          ],
        }}
      />

      <main className="min-h-screen bg-[#f4faf7] text-slate-700">
        <AltersvorsorgeHero
          variante={variante}
          onRechner={() => scrollToId('rechner')}
          onCheck={() => scrollToId('zuschuss-check')}
        />

        {/* Abschnitt 2: Drei Beispielkarten */}
        <section className="healio-container px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              {beispiele.ueberschrift}
            </h2>
            <MobileSwipeRow
              label={beispiele.ueberschrift}
              className="mt-8"
              desktopClassName="md:grid md:grid-cols-3 md:gap-5"
              itemClassName="flex"
            >
              {beispiele.karten.map((karte) => (
                <article key={karte.titel} className="h-full w-full rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="font-display text-base font-bold text-slate-950">{karte.titel}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div>
                      <p className="text-base uppercase tracking-wide text-slate-500">Eigenbeitrag</p>
                      <p className="font-display text-2xl font-extrabold leading-tight text-slate-800 sm:text-3xl">{splitBetrag(karte.eigenbeitrag).betrag}</p>
                      <p className="text-base leading-5 text-slate-500">{splitBetrag(karte.eigenbeitrag).rest}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                    <div className="text-right">
                      <p className="text-base uppercase tracking-wide text-slate-500">Zulage</p>
                      <p className="font-display text-2xl font-extrabold leading-tight text-[#076046] sm:text-3xl">{splitBetrag(karte.zulage).betrag}</p>
                      <p className="text-base leading-5 text-slate-500">{splitBetrag(karte.zulage).rest}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-base leading-7 text-slate-600">{karte.detail}</p>
                </article>
              ))}
            </MobileSwipeRow>
            <p className="mt-6 text-base leading-relaxed text-slate-500">{beispiele.kleingedruckt}</p>
          </div>
        </section>

        {/* Abschnitt 3: Rechner ohne Anmeldung */}
        <section className="healio-container bg-white px-4 py-14 sm:px-6 lg:px-8">
          <ZulagenRechner
            value={rechnerWert}
            onChange={setRechnerWert}
            onCheck={() => scrollToId('zuschuss-check')}
            onWebinar={() => scrollToId('webinar')}
          />
        </section>

        {/* Abschnitt 3a: Zuschuss-Check, Ziel der Seite (Anker #zuschuss-check) */}
        {artikelCheck && (
          <div data-artikel-check-uebernahme className="mx-auto mt-6 max-w-5xl px-4 sm:px-6">
            <p className="rounded-2xl border border-emerald-200 bg-white p-5 text-base leading-7 text-slate-700">
              Deine Beispielrechnung ist übernommen: {formatEuroDE(rechnerWert.monatsbeitrag)} Monatsbeitrag und {rechnerWert.kinder} berücksichtigte Kinder. Die persönliche Berechtigung und Kinderzuordnung klären wir im Zuschuss-Check.
            </p>
          </div>
        )}
        <AltersvorsorgeZuschussCheck rechnerWert={rechnerWert} />

        {/* Abschnitt 4: Problem, Verstärkung, Lösung */}
        <section className="healio-container px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              {problemLoesung.ueberschrift}
            </h2>
            <div className="mt-8 space-y-5">
              {problemLoesung.bloecke.map((block) => (
                <div key={block.titel} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="font-display text-base font-bold uppercase tracking-wide text-[#0b4d4a]">{block.titel}</p>
                  <p className="mt-2 leading-7 text-slate-700">{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Abschnitt 5: Das ist neu */}
        <section className="healio-container bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              {neuerungen.ueberschrift}
            </h2>
            <MobileSwipeRow
              label={neuerungen.ueberschrift}
              className="mt-8"
              desktopClassName="md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3"
              itemClassName="flex"
            >
              {neuerungen.punkte.map((punkt) => (
                <div key={punkt.titel} className="h-full w-full rounded-2xl border border-slate-100 bg-[#f4faf7] p-5">
                  <p className="font-display text-base font-extrabold leading-snug text-slate-950">{punkt.titel}</p>
                  <p className="mt-2 text-base leading-7 text-slate-600">{punkt.text}</p>
                </div>
              ))}
            </MobileSwipeRow>
          </div>
        </section>

        {/* Abschnitt 6: Für wen es passt und für wen nicht */}
        <section className="healio-container px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6">
              <h2 className="font-display text-lg font-extrabold text-slate-950">{fuerWenEs.passtTitel}</h2>
              <ul className="mt-4 space-y-3">
                {fuerWenEs.passtItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#076046]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="font-display text-lg font-extrabold text-slate-950">{fuerWenEs.passtNichtTitel}</h2>
              <ul className="mt-4 space-y-3">
                {fuerWenEs.passtNichtItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-600">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Abschnitt 7: Ablauf als Zeitstrahl */}
        <section className="healio-container bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              {ablauf.ueberschrift}
            </h2>
            <div className="relative mt-10 grid gap-8 sm:grid-cols-4">
              <div className="absolute left-0 right-0 top-6 hidden h-0.5 bg-emerald-200 sm:block" aria-hidden="true" />
              {ablauf.schritte.map((schritt, index) => (
                <div key={schritt.titel} className="relative z-10 text-center sm:text-left">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25c990] font-display text-lg font-extrabold text-[#07111f] sm:mx-0">
                    {index + 1}
                  </div>
                  <p className="mt-3 font-display text-base font-extrabold text-slate-950">{schritt.titel}</p>
                  <p className="mt-2 text-base leading-7 text-slate-600">{schritt.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Abschnitt 8: Webinar-Anmeldung + Fahrplan, der weiche Weg ("Noch nicht so weit?") */}
        <section className="healio-container px-4 py-14 sm:px-6 lg:px-8">
          <AltersvorsorgeWebinarForm ref={formRef} rechnerWert={rechnerWert} segment={fuerParam} />
        </section>

        {/* Abschnitt 9: Wer dich begleitet. Healio als Absender, zwei Rollenkarten.
            Porträts nur, wenn werDahinter.team gefüllt ist (siehe Content). */}
        <section className="healio-container bg-white px-4 py-14 sm:px-6 lg:px-8">
          <AltersvorsorgeBegleitung />
        </section>

        {/* Abschnitt 10: Häufige Fragen */}
        <section className="healio-container px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="altersvorsorge-faq-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="altersvorsorge-faq-heading" className="text-center font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Häufige Fragen
            </h2>
            <Accordion type="single" collapsible className="mt-8">
              {faq.map((item, index) => (
                <AccordionItem key={item.question} value={`altersvorsorge-faq-${index}`}>
                  <AccordionTrigger className="text-left font-display text-base font-bold text-slate-950">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-7">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Abschnitt 11: Fuß-Hinweis */}
        <section className="healio-container px-4 pb-16 pt-2 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-500">{fussHinweis}</p>
        </section>
        <section className="mx-auto max-w-5xl px-6 pb-16 text-center">
          <h2 className="font-display text-2xl font-extrabold text-slate-950">Du möchtest ein Thema genauer verstehen?</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Unsere Ratgeber erklären Förderung, Riester-Wechsel, Kinderzulage, Kosten und Auszahlung mit konkreten Beispielen.</p>
          <Link to="/ratgeber/altersvorsorgedepot" className="mt-6 inline-flex min-h-12 items-center rounded-full border border-emerald-700 px-6 py-3 font-semibold text-emerald-800">Altersvorsorge-Ratgeber lesen</Link>
        </section>
      </main>
    </>
  );
};

export default AltersvorsorgedepotPage;
