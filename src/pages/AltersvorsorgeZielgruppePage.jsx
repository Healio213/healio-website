import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowDownToLine, ArrowRight, Bell, BookOpen, Check, ExternalLink } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import MobileSwipeRow from '@/components/ui/MobileSwipeRow';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import AltersvorsorgeHero from '@/components/sections/altersvorsorge/AltersvorsorgeHero';
import AltersvorsorgeIllustration from '@/components/sections/altersvorsorge/AltersvorsorgeIllustration';
import ZulagenRechner from '@/components/sections/altersvorsorge/ZulagenRechner';
import AltersvorsorgeZuschussCheck from '@/components/sections/altersvorsorge/AltersvorsorgeZuschussCheck';
import AltersvorsorgeVormerkung from '@/components/sections/altersvorsorge/AltersvorsorgeVormerkung';
import { trackAltersvorsorgeFunnel } from '@/lib/altersvorsorgeAnalytics';
import { openAltersvorsorgeStartinfo } from '@/lib/altersvorsorgeArtikelCheck';
import { berechneZulagen, formatEuroDE } from '@/lib/altersvorsorgeZulagen';
import {
  EINGAENGE, QUELLEN, RATGEBER_TITEL, ZIELGRUPPEN_BASIS_PFAD, ZIELGRUPPEN_QUELLENSTAND,
} from '@/content/altersvorsorgeZielgruppen/gemeinsam';
import { zielgruppenCanonical, zielgruppenSchema } from '@/content/altersvorsorgeZielgruppen/seo';
import { friendlyIconAssets } from '@/components/ui/healioSoftClayIcons';
import { EINGANG_MOTIVE } from '@/lib/altersvorsorgeBildmotive';

/**
 * Vorlage der Anfrageseiten unter /altersvorsorgedepot/… (Microsite-Prinzip).
 * Seitenplan: Healio/Altersvorsorgedepot-Funnel/UNTERSEITEN-SEITENPLAN.md
 *
 * Reihenfolge: Kopf mit eigener Zahlenkarte, belegte Zahlen, Rechenbeispiele,
 * Vertiefung, Rechner, Zuschuss-Check, Passt/Passt nicht, Fragen, Quellen.
 * Das Kurzformular (bestehender Einwilligungsweg) öffnet sich erst nach dem
 * Rechnen über „Berechnung speichern“, also nach den Inhalten.
 *
 * Alle Texte kommen aus src/content/altersvorsorgeZielgruppen/<slug>.js.
 * Beispielwerte rechnet die Seite mit derselben Logik wie der Rechner aus.
 */

const scrollToId = (id) => {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
};

const prozent = (anteil) => `${Math.round(anteil * 100)} %`;

const QuellenLink = ({ id }) => {
  const quelle = QUELLEN[id];
  if (!quelle) return null;
  return (
    <a
      href={quelle.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Quelle: ${quelle.kurz} (öffnet in neuem Tab)`}
      className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#076046] underline decoration-emerald-300 underline-offset-4 hover:text-[#054d38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
    >
      Quelle: {quelle.kurz}
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
    </a>
  );
};

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

const STANDARD_BEISPIEL_LABELS = { beitrag: 'Du zahlst im Jahr', zulage: 'Zulage im Jahr', quote: '{quote} Förderquote' };

const BeispielKarte = ({ karte, index, labels: eigeneLabels }) => {
  const labels = { ...STANDARD_BEISPIEL_LABELS, ...(eigeneLabels || {}) };
  if (karte.eingabe) {
    const ergebnis = berechneZulagen({
      monatsbeitrag: karte.eingabe.monatsbeitrag,
      kinder: karte.eingabe.kinder || 0,
      unter25: Boolean(karte.eingabe.unter25),
    });
    return (
      <article className="h-full w-full rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
        <p className="font-display text-base font-bold text-slate-950">{karte.titel}</p>
        <dl className="mt-4 space-y-2">
          <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2">
            <dt className="text-base leading-6 text-slate-500">{labels.beitrag}</dt>
            <dd className="whitespace-nowrap font-display text-2xl font-extrabold leading-tight text-slate-800">{formatEuroDE(ergebnis.jahresbeitrag)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-base leading-6 text-slate-500">{labels.zulage}</dt>
            <dd className="whitespace-nowrap font-display text-2xl font-extrabold leading-tight text-[#076046] sm:text-3xl">{formatEuroDE(ergebnis.zulageJahr)}</dd>
          </div>
        </dl>
        <p className="mt-3 rounded-lg bg-[#f4faf7] px-3 py-2 text-base font-semibold leading-6 text-[#064b3d]">
          {ergebnis.startbonus > 0
            ? `Plus ${formatEuroDE(ergebnis.startbonus)} Startbonus, einmalig`
            : labels.quote.replace('{quote}', prozent(ergebnis.quote))}
        </p>
        <p className="mt-3 text-base leading-7 text-slate-600">{karte.text}</p>
      </article>
    );
  }
  if (karte.festwerte) {
    const { eigenbeitrag, eigenbeitragRest, zulage, zulageRest } = karte.festwerte;
    return (
      <article className="h-full w-full rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <p className="font-display text-base font-bold text-slate-950">{karte.titel}</p>
        <dl className="mt-4 space-y-2">
          <div className="flex items-baseline justify-between gap-3 border-b border-slate-200 pb-2">
            <dt className="text-base leading-6 text-slate-500">{eigenbeitragRest}</dt>
            <dd className="whitespace-nowrap font-display text-2xl font-extrabold leading-tight text-slate-800">{eigenbeitrag}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <dt className="text-base leading-6 text-slate-500">{zulageRest}</dt>
            <dd className="whitespace-nowrap font-display text-2xl font-extrabold leading-tight text-slate-700 sm:text-3xl">{zulage}</dd>
          </div>
        </dl>
        <p className="mt-4 text-base leading-7 text-slate-600">{karte.text}</p>
      </article>
    );
  }
  return (
    <article className="h-full w-full rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25c990] font-display text-base font-extrabold text-[#07111f]" aria-hidden="true">{index + 1}</span>
      <p className="mt-4 font-display text-lg font-extrabold leading-snug text-slate-950">{karte.titel}</p>
      <p className="mt-2 text-base leading-7 text-slate-600">{karte.text}</p>
    </article>
  );
};

const AltersvorsorgeZielgruppePage = ({ inhalt }) => {
  const { hash } = useLocation();
  const herkunft = `${ZIELGRUPPEN_BASIS_PFAD}/${inhalt.slug}`;
  const canonical = zielgruppenCanonical(inhalt);
  const schema = useMemo(() => ({ '@context': 'https://schema.org', '@graph': zielgruppenSchema(inhalt) }), [inhalt]);
  const rechnerTexte = useMemo(() => ({ ...inhalt.rechner.texte, webinarLink: inhalt.startinfo.rechnerLink }), [inhalt]);
  const [rechnerWert, setRechnerWert] = useState(() => ({ ...inhalt.rechner.voreinstellung }));
  const [vormerkungAnfrage, setVormerkungAnfrage] = useState(hash === '#altersvorsorge-vormerkung' ? 1 : 0);
  const calculatorStarted = useRef(false);
  const formOpened = useRef(false);

  const updateRechner = (value) => {
    if (!calculatorStarted.current) calculatorStarted.current = trackAltersvorsorgeFunnel('calculator_start', 'landing_calculator');
    setRechnerWert(value);
  };
  const vormerken = (placement) => {
    if (!formOpened.current) formOpened.current = trackAltersvorsorgeFunnel('form_open', placement);
    setVormerkungAnfrage((number) => number + 1);
  };
  useEffect(() => {
    if (vormerkungAnfrage > 0) scrollToId('altersvorsorge-vormerkung');
  }, [vormerkungAnfrage]);

  // Reihenfolge je Seite: die naheliegenden Eingänge zuerst.
  const andereEingaenge = (inhalt.verwandt || EINGAENGE.map((eingang) => eingang.slug))
    .map((slug) => EINGAENGE.find((eingang) => eingang.slug === slug))
    .filter((eingang) => eingang && eingang.slug !== inhalt.slug)
    .slice(0, 4);
  const variante = { eyebrow: inhalt.hero.eyebrow, h1: inhalt.hero.h1, unterzeile: inhalt.hero.unterzeile, fussnote: inhalt.hero.fussnote };

  return (
    <>
      <SEOHead
        title={inhalt.seo.title}
        description={inhalt.seo.description}
        canonicalUrl={canonical}
        ogImageAlt={inhalt.seo.ogImageAlt}
        schemaMarkup={schema}
      />

      <div data-altersvorsorge-zielgruppe={inhalt.slug} className="min-h-screen bg-[#f4faf7] text-slate-700">
        <AltersvorsorgeHero
          variante={variante}
          brotkrume={inhalt.hero.brotkrume}
          karte={inhalt.hero.karte}
          vertrauenszeile={inhalt.hero.vertrauenszeile}
          onRechner={() => scrollToId('rechner')}
          sekundaer={{ label: inhalt.hero.linkInhalt, href: '#fakten', onClick: () => scrollToId('fakten') }}
        />

        {/* Belegte Zahlen, jede Karte mit Quelle */}
        <Abschnitt id="fakten" labelledBy="fakten-heading">
          <div className="mx-auto max-w-5xl">
            <Ueberschrift id="fakten-heading" intro={inhalt.fakten.intro}>{inhalt.fakten.ueberschrift}</Ueberschrift>
            <MobileSwipeRow
              label={inhalt.fakten.ueberschrift}
              className="mt-8"
              desktopClassName={`md:grid md:gap-5 md:grid-cols-2 ${inhalt.fakten.karten.length === 5 ? 'lg:grid-cols-3' : inhalt.fakten.karten.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
              itemClassName="flex"
            >
              {inhalt.fakten.karten.map((karte) => (
                <article key={karte.titel} className="flex h-full w-full flex-col rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
                  <p className="break-words font-display text-2xl font-extrabold leading-tight text-[#076046] sm:text-3xl">{karte.wert}</p>
                  <p className="mt-1 font-display text-base font-bold leading-snug text-slate-950">{karte.titel}</p>
                  <p className="mt-3 flex-1 text-base leading-7 text-slate-600">{karte.text}</p>
                  <QuellenLink id={karte.quelle} />
                </article>
              ))}
            </MobileSwipeRow>
          </div>
        </Abschnitt>

        {/* Rechenbeispiele aus derselben Rechenlogik wie der Rechner */}
        <Abschnitt id="beispiele" hell labelledBy="beispiele-heading">
          <div className="mx-auto max-w-5xl">
            <Ueberschrift id="beispiele-heading">{inhalt.beispiele.ueberschrift}</Ueberschrift>
            <MobileSwipeRow
              label={inhalt.beispiele.ueberschrift}
              className="mt-8"
              desktopClassName="md:grid md:grid-cols-3 md:gap-5"
              itemClassName="flex"
            >
              {inhalt.beispiele.karten.map((karte, index) => <BeispielKarte key={karte.titel} karte={karte} index={index} labels={inhalt.beispiele.labels} />)}
            </MobileSwipeRow>
            <p className="mt-6 text-base leading-relaxed text-slate-500">{inhalt.beispiele.kleingedruckt}</p>
          </div>
        </Abschnitt>

        {/* Regeln, die nur diese Gruppe betreffen */}
        <Abschnitt id="vertiefung" labelledBy="vertiefung-heading">
          <div className="mx-auto max-w-5xl">
            <Ueberschrift id="vertiefung-heading" intro={inhalt.vertiefung.intro}>{inhalt.vertiefung.ueberschrift}</Ueberschrift>
            <MobileSwipeRow
              label={inhalt.vertiefung.ueberschrift}
              className="mt-8"
              desktopClassName="md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3"
              itemClassName="flex"
            >
              {inhalt.vertiefung.bloecke.map((block) => (
                <div key={block.titel} className="flex h-full w-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-lg font-extrabold leading-snug text-slate-950">{block.titel}</h3>
                  <p className="mt-2 flex-1 text-base leading-7 text-slate-700">{block.text}</p>
                  {block.link && (
                    <Link to={block.link.to} className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-base font-semibold text-[#076046] underline decoration-emerald-300 underline-offset-4 hover:text-[#054d38]">
                      {block.link.label}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              ))}
            </MobileSwipeRow>
          </div>
        </Abschnitt>

        {/* Rechner; das Kurzformular öffnet sich erst über „Berechnung speichern“ */}
        <section className="healio-container bg-white px-4 py-14 sm:px-6 lg:px-8">
          <ZulagenRechner
            value={rechnerWert}
            onChange={updateRechner}
            onCheck={() => vormerken('landing_calculator')}
            onWebinar={() => scrollToId('bescheid')}
            texte={rechnerTexte}
            felder={inhalt.rechner.felder}
            vormerkung={vormerkungAnfrage > 0 ? (
              <AltersvorsorgeVormerkung value={rechnerWert} requestNumber={vormerkungAnfrage} texte={inhalt.vormerkung} herkunft={herkunft} />
            ) : null}
          />
        </section>

        <AltersvorsorgeZuschussCheck
          rechnerWert={rechnerWert}
          onVormerken={() => vormerken('landing_steps')}
          inhalt={inhalt.check}
          utmContent={inhalt.slug}
        />

        {/* Startinfo-Eintragung: erst einmal nur Bescheid bekommen */}
        <Abschnitt id="bescheid" labelledBy="bescheid-heading">
          <div className="mx-auto max-w-4xl rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-base font-semibold text-[#087654]">{inhalt.startinfo.eyebrow}</p>
            <h2 id="bescheid-heading" className="mt-2 font-display text-2xl font-extrabold text-[#07111f] sm:text-3xl">{inhalt.startinfo.ueberschrift}</h2>
            <p className="mt-4 text-base leading-7 text-slate-700">{inhalt.startinfo.text}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button type="button" onClick={openAltersvorsorgeStartinfo} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25c990] px-5 py-3 text-center text-base font-extrabold text-[#07111f] transition hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
                <Bell className="h-5 w-5 shrink-0" aria-hidden="true" />
                {inhalt.startinfo.knopf}
              </button>
              <a href="/downloads/healio-zuschuss-fahrplan-2027.pdf" download="Healio-Zuschuss-Fahrplan-2027.pdf" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl border border-[#087654] px-5 py-3 text-center text-base font-semibold text-[#087654] transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087654]">
                <ArrowDownToLine className="h-5 w-5 shrink-0" aria-hidden="true" />
                {inhalt.startinfo.fahrplan}
              </a>
            </div>
          </div>
        </Abschnitt>

        {/* Ehrlich sagen, für wen es passt und für wen nicht */}
        <Abschnitt id="passt" label={inhalt.passt.passtTitel.replace(/,$/, '')}>
          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6">
              <h3 className="font-display text-lg font-extrabold text-slate-950">{inhalt.passt.passtTitel}</h3>
              <ul className="mt-4 space-y-3">
                {inhalt.passt.passtItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-[#076046]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="font-display text-lg font-extrabold text-slate-950">{inhalt.passt.passtNichtTitel}</h3>
              <ul className="mt-4 space-y-3">
                {inhalt.passt.passtNichtItems.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-slate-600">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Abschnitt>

        {/* Häufige Fragen dieser Gruppe, identisch mit dem FAQ-Schema */}
        <Abschnitt id="fragen" hell labelledBy="fragen-heading">
          <div className="mx-auto max-w-3xl">
            <h2 id="fragen-heading" className="text-center font-display text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">Häufige Fragen</h2>
            <Accordion type="single" collapsible className="mt-8">
              {inhalt.faq.map((item, index) => (
                <AccordionItem key={item.question} value={`zielgruppe-faq-${index}`} className="group">
                  <AccordionTrigger className="text-left font-display text-base font-bold text-slate-950">{item.question}</AccordionTrigger>
                  {/* Antwort bleibt im HTML (für Suchmaschinen), zugeklappt per display:none */}
                  <AccordionContent forceMount className="text-base leading-7 group-data-[state=closed]:hidden">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => scrollToId('rechner')}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#25c990] px-6 py-4 text-center font-display text-base font-extrabold text-[#07111f] transition hover:bg-[#5ee0b1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                {inhalt.abschlussKnopf}
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Abschnitt>

        {/* Quellen, Ratgeber und die anderen Eingänge */}
        <Abschnitt id="quellen" labelledBy="quellen-heading">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 id="quellen-heading" className="font-display text-xl font-extrabold text-slate-950">Quellen dieser Seite</h2>
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
              <p className="mt-4 text-base leading-6 text-slate-500">Prüfstand {ZIELGRUPPEN_QUELLENSTAND}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-display text-xl font-extrabold text-slate-950">{inhalt.weiterlesenTitel || 'Weiterlesen im Ratgeber'}</h2>
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
              <h2 className="mt-8 font-display text-xl font-extrabold text-slate-950">Passende Seiten</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {andereEingaenge.map((eingang) => (
                  <li key={eingang.slug}>
                    <Link to={eingang.path} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200 bg-[#f4faf7] px-4 py-2 text-base font-semibold text-[#064b3d] hover:border-emerald-400">
                      {EINGANG_MOTIVE[eingang.slug] ? <img src={friendlyIconAssets[EINGANG_MOTIVE[eingang.slug].kind]} alt="" aria-hidden="true" width="28" height="28" loading="lazy" decoding="async" className="h-7 w-7 shrink-0 object-contain" /> : <AltersvorsorgeIllustration kind={eingang.motiv} className="h-6 w-6" />}
                      {eingang.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to={ZIELGRUPPEN_BASIS_PFAD} className="inline-flex min-h-11 items-center rounded-full border border-slate-300 px-4 py-2 text-base font-semibold text-slate-700 hover:border-slate-400">
                    Alle Infos zum Altersvorsorgedepot
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Abschnitt>

        <section className="healio-container px-4 pb-16 pt-2 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-500">{inhalt.fussHinweis}</p>
        </section>
      </div>
    </>
  );
};

export default AltersvorsorgeZielgruppePage;
