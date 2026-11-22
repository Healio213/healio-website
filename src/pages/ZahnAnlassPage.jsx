import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, ChevronRight, ExternalLink } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import AltersvorsorgeAngebotsKarte from '@/components/sections/altersvorsorge/AltersvorsorgeAngebotsKarte';
import ZahnSofortRechner from '@/components/sections/dental/ZahnSofortRechner';
import DentalCallbackForm from '@/components/sections/dental/DentalCallbackForm';
import { BAYERISCHE_URL } from '@/components/sections/dental/dentalLinks';
import { zaehle } from '@/lib/anonyme-zaehler';
import { direkteMaske } from '@/components/LeadCaptureProvider';
import { QUELLEN, RATGEBER_TITEL, ZAHN_ANLASS_QUELLENSTAND, ZAHN_SEITE_PFAD } from '@/content/zahnAnlaesse/gemeinsam';
import { zahnAnlassCanonical, zahnAnlassSchema } from '@/content/zahnAnlaesse/seo';

/**
 * Vorlage der Zahn-Anlassseiten unter /zahn/… (Microsite-Prinzip), gebaut nach
 * dem Muster der Altersvorsorge-Unterseiten (AltersvorsorgeZielgruppePage).
 * Seitenplan: Healio/Zahn-Mikroseiten/SEITENPLAN-BEHANDLUNG-STEHT-AN.md
 *
 * Reihenfolge: Kopf mit Zahlenkarte, Rechner, Ablauf, Passt/Passt nicht,
 * belegte Zahlen, Fragen, Quellen, Rückruf, Fußhinweis. Alle Texte kommen aus
 * src/content/zahnAnlaesse/<slug>.js.
 *
 * Messung: Die Seite läuft wie /zahn ohne Google Analytics, Meta und Google
 * Ads. Der Klick auf die Abschlussknöpfe zur Bayerischen geht nur als
 * Ereignis „versicherer_klick“ mit dem Namen „bayerische“ an den anonymen
 * Zähler (src/lib/anonyme-zaehler.js). Am Link hängt kein Parameter.
 * Seit 22.11.2026 (Zahn an) führen die Knöpfe direkt in /antrag/zahn; dazu zählt der
 * Weg in die Maske anonym antragsweg zahn-allein (LeadCaptureProvider).
 */

const scrollToId = (id) => {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
};

const zaehleBayerische = () => { zaehle('versicherer_klick', { ziel: 'bayerische' }); };

const BAYERISCHE_ATTR = { href: BAYERISCHE_URL, target: '_blank', rel: 'noopener noreferrer', onClick: zaehleBayerische };
// 22.11.2026 (Zahn an): Mit der gemeinsamen Zahn-Maske fängt LeadCaptureProvider den Link ab und führt im selben Tab
// in den Einstieg von /antrag/zahn (die Weiche wählt die Gesellschaft). Dann kein neuer Tab, kein Außen-Symbol.
// Nachbesserung 22.11.2026: Dann zählt auch kein versicherer_klick mehr, die Gesellschaft steht erst nach der Weiche fest; den Klick
// zählt der Weg in die Maske (antragsweg zahn-allein).
const BAYERISCHE_ATTR_DIREKT = { ...BAYERISCHE_ATTR, target: undefined, rel: undefined, onClick: undefined };

const KNOPF_GRUEN = 'inline-flex min-h-14 max-w-full items-center justify-center gap-2 rounded-full bg-[#25c990] px-6 py-4 text-center font-display text-base font-extrabold leading-6 text-[#07141d] shadow-[0_12px_36px_rgba(37,201,144,0.18)] transition-colors hover:bg-[#5edcaf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087654] focus-visible:ring-offset-4';

const Abschnitt = ({ id, hell = false, children, labelledBy, label }) => (
  <section id={id} aria-labelledby={labelledBy} aria-label={labelledBy ? undefined : label} className={`healio-container scroll-mt-24 px-4 py-12 sm:px-6 sm:py-14 lg:px-8 ${hell ? 'bg-white' : ''}`}>
    {children}
  </section>
);

const Ueberschrift = ({ id, children, intro }) => (
  <div className="mx-auto max-w-3xl text-center">
    <h2 id={id} className="font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">{children}</h2>
    {intro && <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">{intro}</p>}
  </div>
);

const QuellenLinks = ({ quellen }) => (
  <div className="mt-4 flex flex-col">
    {quellen.map(({ id, stelle }) => {
      const quelle = QUELLEN[id];
      if (!quelle) return null;
      return (
        <a
          key={id}
          href={quelle.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Quelle: ${quelle.kurz}${stelle ? `, ${stelle}` : ''} (öffnet in neuem Tab)`}
          className="inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#076046] underline decoration-emerald-300 underline-offset-4 hover:text-[#054d38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          Quelle: {quelle.kurz}{stelle ? `, ${stelle}` : ''}
          <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      );
    })}
  </div>
);

const ZahnAnlassPage = ({ inhalt }) => {
  const canonical = zahnAnlassCanonical(inhalt);
  const schema = useMemo(() => ({ '@context': 'https://schema.org', '@graph': zahnAnlassSchema(inhalt) }), [inhalt]);
  const { hero, rechner, passt, fakten, andereWege, rueckruf } = inhalt;
  const { pathname } = useLocation();
  const direkt = Boolean(inhalt.direkt && direkteMaske(BAYERISCHE_URL, pathname));
  const abschlussAttr = direkt ? BAYERISCHE_ATTR_DIREKT : BAYERISCHE_ATTR;
  const neuerTab = direkt ? '' : ' (öffnet in neuem Tab)';
  const Aussen = direkt ? ArrowRight : ExternalLink;
  const ablauf = direkt
    ? { ...inhalt.ablauf, schritte: inhalt.ablauf.schritte.map((schritt) => (schritt.nr === 3 ? { ...schritt, text: inhalt.direkt.ablaufSchritt3 } : schritt)) }
    : inhalt.ablauf;

  return (
    <>
      <SEOHead
        title={inhalt.seo.title}
        description={inhalt.seo.description}
        canonicalUrl={canonical}
        ogImageAlt={inhalt.seo.ogImageAlt}
        schemaMarkup={schema}
      />

      <div data-zahn-anlass={inhalt.slug} className="min-h-screen bg-[#f4faf7] text-slate-700">
        {/* Kopf mit Kernaussage, Szene und Zahlenkarte */}
        <section aria-labelledby="zahn-anlass-hero-title" className="w-full bg-[#f4faf7]">
          <div className="relative isolate w-full overflow-hidden bg-[#06131c] text-white">
            <img
              src="/images/healio-hero-markenrelief-v1.webp"
              alt=""
              aria-hidden="true"
              width="1586"
              height="992"
              loading="eager"
              {...{ fetchpriority: 'low' }}
              decoding="async"
              draggable="false"
              className="pointer-events-none absolute right-[-7rem] top-12 -z-30 h-auto w-[38rem] max-w-none select-none opacity-60 md:inset-0 md:h-full md:w-full md:object-cover md:object-[64%_center] md:opacity-90"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(6,19,28,0.92)_0%,rgba(6,19,28,0.65)_100%)] md:bg-[linear-gradient(90deg,rgba(3,12,21,0.97)_0%,rgba(3,12,21,0.9)_45%,rgba(3,12,21,0.55)_100%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,transparent_0%,rgba(6,19,28,0.45)_30%,#06131c_70%)] md:bg-[linear-gradient(180deg,rgba(6,19,28,0.15)_0%,transparent_60%,#06131c_100%)]" />

            <div className="mx-auto w-full max-w-[1280px] px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 md:px-8 md:pb-16 lg:grid lg:min-h-[680px] lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:items-center lg:gap-10">
              <div className="w-full min-w-0 text-left">
                <nav aria-label="Brotkrumen" className="mb-4">
                  <ol className="flex flex-wrap items-center gap-1 text-base leading-6 text-[#c4d3da]">
                    <li>
                      <Link to={ZAHN_SEITE_PFAD} className="inline-flex min-h-11 items-center underline decoration-white/30 underline-offset-4 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca]">
                        Zahnzusatzversicherung
                      </Link>
                    </li>
                    <li aria-hidden="true"><ChevronRight className="h-4 w-4 text-[#8ee7ca]" /></li>
                    <li aria-current="page" className="font-semibold text-white">{hero.brotkrume}</li>
                  </ol>
                </nav>
                <p className="max-w-[36rem] text-base font-bold leading-6 text-[#8ee7ca]">{hero.eyebrow}</p>
                <h1 id="zahn-anlass-hero-title" className="mt-4 font-display text-[1.875rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-white [text-wrap:balance] sm:text-[2.75rem] md:mt-5 lg:text-[clamp(2.5rem,3.4vw,3.1rem)]">
                  {hero.h1}
                </h1>
                <p className="mt-5 max-w-[36rem] text-base leading-7 text-[#d5e2e7] sm:text-lg sm:leading-8">{hero.unterzeile}</p>

                <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
                  <button type="button" onClick={() => scrollToId('rechner')} className={KNOPF_GRUEN}>
                    {hero.knopfRechner}
                    <ArrowRight className="hidden h-5 w-5 shrink-0 sm:block" aria-hidden="true" />
                  </button>
                  <a
                    {...abschlussAttr}
                    aria-label={`${hero.knopfAbschluss}${neuerTab}`}
                    className="inline-flex min-h-14 max-w-full items-center justify-center gap-2 rounded-full border border-white/60 px-6 py-4 text-center font-display text-base font-extrabold leading-6 text-white transition-colors hover:border-[#8ee7ca] hover:text-[#8ee7ca] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8ee7ca] focus-visible:ring-offset-4 focus-visible:ring-offset-[#06131c]"
                  >
                    {hero.knopfAbschluss}
                    <Aussen className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
                <p className="mt-3 max-w-[36rem] text-base leading-6 text-[#bdced6]">{hero.fussnote}</p>
                <p className="mt-6 max-w-[36rem] border-t border-white/15 pt-5 text-base font-medium leading-7 text-[#c4d3da] sm:mt-8">{hero.vertrauenszeile}</p>
              </div>

              {/* Szene: vorhandenes Bild, 720 x 480, nie breiter dargestellt */}
              <div className="mt-8 flex justify-center lg:mt-0 lg:justify-end">
                <img
                  src="/images/zahn-cards/sofort.webp"
                  alt={hero.bildAlt}
                  width="720"
                  height="480"
                  loading="eager"
                  {...{ fetchpriority: 'high' }}
                  decoding="async"
                  className="h-auto w-full max-w-[720px] rounded-[2rem] shadow-[0_28px_70px_rgba(0,0,0,0.35)] ring-1 ring-white/15"
                />
              </div>
            </div>
          </div>

          <div className="mx-auto w-full max-w-[1280px] px-4 pb-6 pt-6 sm:px-6 sm:pb-8 sm:pt-8 md:px-8">
            <AltersvorsorgeAngebotsKarte titel={hero.karte.titel} kacheln={hero.karte.kacheln} hinweis={hero.karte.hinweis} />
          </div>
        </section>

        {/* Rechner */}
        <Abschnitt id="rechner" hell labelledBy="rechner-heading">
          <ZahnSofortRechner
            texte={rechner}
            abschluss={(
              <div className="mt-8 flex flex-col items-center gap-3 text-center">
                <a {...abschlussAttr} aria-label={`${direkt ? inhalt.direkt.knopf : rechner.abschluss.knopf}${neuerTab}`} className={KNOPF_GRUEN}>
                  {direkt ? inhalt.direkt.knopf : rechner.abschluss.knopf}
                  <Aussen className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
                <p className="max-w-md text-base leading-6 text-slate-600">{direkt ? inhalt.direkt.abschlussHinweis : rechner.abschluss.hinweis}</p>
                <button
                  type="button"
                  onClick={() => scrollToId('rueckruf')}
                  className="inline-flex min-h-11 items-center px-2 text-base font-semibold text-[#076046] underline decoration-emerald-300 underline-offset-4 hover:text-[#054d38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  {rechner.abschluss.rueckrufLink}
                </button>
                <Link to="/terminvereinbarung" className="inline-flex min-h-11 items-center px-2 text-sm text-slate-500 underline decoration-slate-300 underline-offset-4 hover:text-[#076046]">
                  {rechner.abschluss.terminLink}
                </Link>
              </div>
            )}
          />
        </Abschnitt>

        {/* So läuft es ab */}
        <Abschnitt id="ablauf" labelledBy="ablauf-heading">
          <div className="mx-auto max-w-5xl">
            <Ueberschrift id="ablauf-heading">{ablauf.ueberschrift}</Ueberschrift>
            <MobileSwipeRow
              label={ablauf.ueberschrift}
              className="mt-8"
              desktopClassName="md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-4"
              itemClassName="flex"
            >
              {ablauf.schritte.map((schritt) => (
                <article key={schritt.nr} className="flex h-full w-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25c990] font-display text-base font-extrabold text-[#07111f]" aria-hidden="true">{schritt.nr}</span>
                    <FriendlyIcon kind={schritt.motiv} tone="mint" size="md" />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-slate-950">{schritt.titel}</h3>
                  <p className="mt-2 flex-1 text-base leading-7 text-slate-600">{schritt.text}</p>
                </article>
              ))}
            </MobileSwipeRow>
            <div className="mt-8 flex flex-col items-center gap-3 text-center">
              <a {...abschlussAttr} aria-label={`${direkt ? inhalt.direkt.knopf : ablauf.knopf}${neuerTab}`} className={KNOPF_GRUEN}>
                {direkt ? inhalt.direkt.knopf : ablauf.knopf}
                <Aussen className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
              <p className="max-w-md text-sm leading-6 text-slate-500">{ablauf.kleingedruckt}</p>
            </div>
          </div>
        </Abschnitt>

        {/* Ehrlich sagen, für wen es passt und für wen nicht */}
        <Abschnitt id="passt" hell label={passt.passtTitel.replace(/,$/, '')}>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-[#f4faf7] p-6">
              <h3 className="font-display text-lg font-extrabold text-slate-950">{passt.passtTitel}</h3>
              <ul className="mt-4 space-y-3">
                {passt.passtItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#076046]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-display text-lg font-extrabold text-slate-950">{passt.passtNichtTitel}</h3>
              <ul className="mt-4 space-y-3">
                {passt.passtNichtItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-600">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={passt.anderer.to} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#076046] underline decoration-emerald-300 underline-offset-4 hover:text-[#054d38]">
                {passt.anderer.label}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-5xl text-base leading-relaxed text-slate-500">{passt.kleingedruckt}</p>
        </Abschnitt>

        {/* Belegte Zahlen, jede Karte mit Quelle */}
        <Abschnitt id="fakten" labelledBy="fakten-heading">
          <div className="mx-auto max-w-5xl">
            <Ueberschrift id="fakten-heading" intro={fakten.intro}>{fakten.ueberschrift}</Ueberschrift>
            <MobileSwipeRow
              label={fakten.ueberschrift}
              className="mt-8"
              desktopClassName="md:grid md:gap-5 md:grid-cols-2 lg:grid-cols-3"
              itemClassName="flex"
            >
              {fakten.karten.map((karte) => (
                <article key={karte.titel} className="flex h-full w-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="break-words font-display text-2xl font-extrabold leading-tight text-[#076046] sm:text-3xl">{karte.wert}</p>
                  <p className="mt-1 font-display text-base font-bold leading-snug text-slate-950">{karte.titel}</p>
                  <p className="mt-3 flex-1 text-base leading-7 text-slate-600">{karte.text}</p>
                  <QuellenLinks quellen={karte.quelle} />
                </article>
              ))}
            </MobileSwipeRow>
          </div>
        </Abschnitt>

        {/* Häufige Fragen, identisch mit dem FAQ-Schema */}
        <Abschnitt id="fragen" hell labelledBy="fragen-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="fragen-heading" className="text-center font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Häufige Fragen</h2>
            <Accordion type="single" collapsible className="mt-8">
              {inhalt.faq.map((item, index) => (
                <AccordionItem key={item.question} value={`zahn-anlass-faq-${index}`} className="group">
                  <AccordionTrigger className="text-left font-display text-base font-bold text-slate-950">{item.question}</AccordionTrigger>
                  {/* Antwort bleibt im HTML (für Suchmaschinen), zugeklappt per display:none */}
                  <AccordionContent forceMount className="text-base leading-7 group-data-[state=closed]:hidden">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <button type="button" onClick={() => scrollToId('rechner')} className={KNOPF_GRUEN}>
                {inhalt.abschlussKnopf}
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Abschnitt>

        {/* Quellen, Ratgeber und andere Wege */}
        <Abschnitt id="quellen" labelledBy="quellen-heading">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 id="quellen-heading" className="font-display text-xl font-extrabold text-slate-950">{inhalt.quellenUeberschrift}</h2>
              <ul className="mt-4 space-y-2">
                {inhalt.quellen.map(({ id, wofuer }) => QUELLEN[id] && (
                  <li key={id}>
                    <a href={QUELLEN[id].href} target="_blank" rel="noopener noreferrer" aria-label={`${wofuer}: ${QUELLEN[id].label} (öffnet in neuem Tab)`} className="inline-flex min-h-11 items-start gap-2 py-1 text-base leading-6 text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-[#076046]">
                      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-[#076046]" aria-hidden="true" />
                      <span><span className="font-semibold text-slate-900">{wofuer}:</span> {QUELLEN[id].label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-base leading-6 text-slate-500">Prüfstand {ZAHN_ANLASS_QUELLENSTAND}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-display text-xl font-extrabold text-slate-950">{inhalt.weiterlesenTitel}</h2>
              <ul className="mt-4 space-y-2">
                {inhalt.weiterlesen.map((slug) => RATGEBER_TITEL[slug] && (
                  <li key={slug}>
                    <Link to={`/ratgeber/${slug}`} className="inline-flex min-h-11 items-start gap-2 py-1 text-base leading-6 text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-[#076046]">
                      <BookOpen className="mt-1 h-4 w-4 shrink-0 text-[#076046]" aria-hidden="true" />
                      <span>{RATGEBER_TITEL[slug]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <h2 className="mt-8 font-display text-xl font-extrabold text-slate-950">{andereWege.ueberschrift}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{andereWege.text}</p>
              <Link to={andereWege.to} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#087654] px-5 py-2 text-base font-semibold text-[#087654] transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
                {andereWege.knopf}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Abschnitt>

        {/* Rückruf: das bestehende Formular der Zahnseite, mit fester Seiten-Herkunft */}
        <div id="rueckruf" className="scroll-mt-24">
          <DentalCallbackForm herkunft={rueckruf.herkunft} startThema={rueckruf.startThema} text={rueckruf.text} motiv="support" />
        </div>

        <section className="healio-container px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-500">{inhalt.fussHinweis}</p>
        </section>
      </div>
    </>
  );
};

export default ZahnAnlassPage;
