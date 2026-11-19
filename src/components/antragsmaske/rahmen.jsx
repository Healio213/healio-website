import React, { useEffect, useRef, useState } from 'react';
import {
  Check, Lock, Phone,
} from 'lucide-react';
import { HEALIO_ANTRAG_GESPRAECH_AKTIV } from '@/config/contactChannels';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { euro } from '@/lib/antragsmaske/regeln';
import { FOKUS, cx, schuetze } from '@/components/antrag/ui';
import { TERMIN_LINK, telefonLink } from './teile';
import { produktAnzeige } from './anzeige';

// Rahmen der Antragsmaske (12.11.2026): schlanker Kopf über die ganze Breite
// mit Logo zurück zur Produktseite, „Sicher übertragen“ und dem Weg ans
// Telefon; ab Desktop eine zweigeteilte Seite (links der Schritt, rechts die
// stehende Nachtblau-Fläche „Dein Schutz“). Keine Navigation, keine Messung.

export const PRODUKTSEITE = { ambulant: '/ambulant', zahn: '/zahn', stationaer: '/stationaer' };

export const KARTE = 'rounded-[1.75rem] bg-white shadow-[0_1px_2px_rgba(7,17,31,0.06),0_24px_48px_-28px_rgba(7,17,31,0.28)] ring-1 ring-home-midnight/[0.06]';
// Dieselbe Karte erst ab Desktop (am Handy liegt der Schritt direkt auf dem Hintergrund).
export const KARTE_LG = 'lg:rounded-[1.75rem] lg:bg-white lg:shadow-[0_1px_2px_rgba(7,17,31,0.06),0_24px_48px_-28px_rgba(7,17,31,0.28)] lg:ring-1 lg:ring-home-midnight/[0.06]';

function TelefonKopf({ sparte }) {
  const telefon = HEALIO_ANTRAG_GESPRAECH_AKTIV;
  return (
    <a
      href={telefon ? telefonLink(sparte) : TERMIN_LINK}
      data-zaehler-ignorieren=""
      data-telefon-ausweg=""
      className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-3.5 text-base font-semibold text-white outline-none transition focus-visible:ring-[3px] focus-visible:ring-home-mint [@media(hover:hover)]:hover:border-home-mint [@media(hover:hover)]:hover:text-home-mint-active"
    >
      <Phone className="h-4 w-4 shrink-0 text-home-mint" aria-hidden="true" />
      <span className="sm:hidden">{telefon ? 'Telefon' : 'Beratung'}</span>
      <span className="hidden sm:inline">{telefon ? 'Lieber zusammen am Telefon' : 'Lieber zusammen besprechen'}</span>
    </a>
  );
}

// Auf breiten Bildschirmen wachsen Schrift und Abstände maßvoll mit (rem-Basis
// nur auf dieser Seite, beim Verlassen zurück): 16 px bis etwa 1560 px Breite,
// 17,6 px bei 1920, höchstens 18,5 px.
const SCHRIFT_FLIESSEND = 'clamp(16px, calc(9px + 0.45vw), 18.5px)';

export function MaskenRahmen({ sparte, children }) {
  useEffect(() => {
    const root = document.documentElement;
    const vorher = root.style.fontSize;
    root.style.fontSize = SCHRIFT_FLIESSEND;
    return () => { root.style.fontSize = vorher; };
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-home-ice text-home-midnight">
      <header className="bg-home-midnight">
        <div className="flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
          <a href={PRODUKTSEITE[sparte] || '/'} data-zaehler-ignorieren="" className={cx(FOKUS, 'rounded-lg focus-visible:ring-home-mint focus-visible:ring-offset-home-midnight')}>
            <img src="/healio-logo-white-web.svg" alt="Healio, zurück zur Produktseite" width="250" height="100" className="h-8 w-auto sm:h-9" />
          </a>
          <div className="flex items-center gap-5">
            <p className="hidden items-center gap-1.5 text-sm font-semibold text-slate-200 md:flex">
              <Lock className="h-4 w-4 text-home-mint" aria-hidden="true" />
              Sicher übertragen
            </p>
            <TelefonKopf sparte={sparte} />
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="border-t border-home-midnight/10 bg-white">
        <div className="flex w-full flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-6 text-sm text-slate-600 sm:px-8 lg:px-12">
          <span className="inline-flex items-center gap-1.5 md:hidden"><Lock className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />Sicher übertragen</span>
          <span>© Healio GmbH</span>
          <a href="/impressum" target="_blank" rel="noopener" className="font-semibold underline underline-offset-2">Impressum</a>
          <a href="/datenschutz" target="_blank" rel="noopener" className="font-semibold underline underline-offset-2">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
}

// Zweigeteilte Seite: links der Arbeitsbereich (hell), rechts ab 1024 px eine
// durchgehende Nachtblau-Fläche bis zum Rand, die beim Scrollen stehen bleibt.
// Der Inhalt links bleibt lesbar breit (zentriert), die Fläche wächst mit.
export function GeteilteSeite({
  rechts, rechtsFuss, children, className, ...props
}) {
  return (
    <div className={cx('flex flex-1 flex-col lg:grid lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-[minmax(0,58fr)_minmax(0,42fr)]', className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col px-4 pt-5 sm:px-8 sm:pt-8 lg:px-12 lg:pt-10 xl:px-16 2xl:px-24">
        <div className="mx-auto flex w-full flex-1 flex-col lg:max-w-[52rem] 2xl:max-w-[60rem]">{children}</div>
      </div>
      {rechts && (
        <aside className="relative hidden bg-home-midnight text-white lg:block">
          {/* Stehende Fläche in Fensterhöhe: oben Beitrag und Tarif (bei Platzmangel kürzt sich
              der Inhalt über Höhen-Abfragen), Nita unten fest und immer vollständig. */}
          <div className="sticky top-0 flex h-[calc(100dvh-4rem)] flex-col px-10 xl:px-14 2xl:px-20">
            <div className="min-h-0 flex-1 overflow-y-auto py-8 [@media(max-height:780px)]:py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 2xl:py-10">
              <div className="mx-auto max-w-[30rem] space-y-6 2xl:space-y-8">{rechts}</div>
            </div>
            {rechtsFuss && <div className="mx-auto w-full max-w-[30rem] shrink-0 pb-8 pt-2 2xl:pb-10">{rechtsFuss}</div>}
          </div>
        </aside>
      )}
    </div>
  );
}

// Vertrauenspunkte und Nita auf der Nachtblau-Fläche.
export function VertrauenPunkte({ definition, className }) {
  const punkte = [
    'Sicher übertragen. Deine Angaben gehen erst mit dem Absenden raus.',
    definition ? `Der Vertrag kommt direkt von ${definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`}.` : 'Der Vertrag kommt direkt vom Versicherer.',
    'Alle Unterlagen bekommst du per E-Mail über einen geschützten Link.',
  ];
  return (
    <ul className={cx('space-y-3', className)} data-vertrauen="">
      {punkte.map((punkt) => (
        <li key={punkt} className="flex gap-3 text-base leading-6 text-slate-200">
          <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-home-mint/15"><Check className="h-3.5 w-3.5 text-home-mint" strokeWidth={3} /></span>
          <span className="min-w-0">{schuetze(punkt)}</span>
        </li>
      ))}
    </ul>
  );
}

export function NitaDunkel({ sparte }) {
  const telefon = HEALIO_ANTRAG_GESPRAECH_AKTIV;
  return (
    <section aria-label="Hilfe" className="flex items-center gap-4 rounded-[1.4rem] bg-white/[0.06] p-4 ring-1 ring-white/10">
      <img src="/nita-avatar.jpg" alt="" width="56" height="56" className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-home-mint/50" />
      <div className="min-w-0">
        <p className="font-display text-base font-extrabold">Lieber gemeinsam?</p>
        <p className="text-base leading-6 text-slate-300">{telefon ? 'Nita geht den Antrag am Telefon mit dir durch.' : 'Wir gehen den Antrag persönlich mit dir durch.'}</p>
        <a href={telefon ? telefonLink(sparte) : TERMIN_LINK} data-zaehler-ignorieren="" className="mt-1 inline-flex min-h-11 items-center font-semibold text-home-mint-active underline underline-offset-4 outline-none focus-visible:ring-[3px] focus-visible:ring-home-mint">
          {telefon ? 'Zusammen am Telefon' : 'Termin vereinbaren'}
        </a>
      </div>
    </section>
  );
}

// „Dein Schutz“ auf der Nachtblau-Fläche: Versicherer, Tarif, Beginn, Beitrag
// groß, darunter die Kernleistungen der gewählten Stufe.
export function SchutzPanel({
  definition, tarif, bausteine = [], beginn, preis, kernzeilen = [],
}) {
  const produkt = produktAnzeige(definition.sparte);
  return (
    <section aria-label="Dein Schutz" data-dein-schutz="">
      <div className="flex items-center gap-4">
        <FriendlyIcon kind={produkt.icon} size="md" tone="mint" />
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-extrabold leading-tight">{produkt.schutz}</h2>
          <p className="text-base leading-6 text-slate-300">bei {schuetze(definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`)}</p>
        </div>
      </div>
      <div className="mt-5" aria-live="polite">
        {preis ? (
          <>
            <p className="text-base text-home-mint-active">{preis.einheit === 'im Jahr' ? 'Dein Beitrag im Jahr' : 'Dein Beitrag im Monat'}</p>
            <p className="mt-1 whitespace-nowrap font-display text-[2.75rem] font-extrabold leading-none tracking-[-0.03em] 2xl:text-[3.25rem]">{euro(preis.betrag)}</p>
            {preis.hinweis && <p className="mt-2 text-base leading-6 text-slate-300">{preis.hinweis}</p>}
          </>
        ) : (
          <p className="text-base leading-7 text-slate-300">Sobald dein Geburtsdatum{definition.beitrag?.art === 'dienst' ? ' und deine Postleitzahl' : ''} da {definition.beitrag?.art === 'dienst' ? 'sind' : 'ist'}, siehst du hier deinen Beitrag.</p>
        )}
      </div>
      <dl className="mt-5 divide-y divide-white/10 border-y border-white/10 text-base">
        <div className="flex justify-between gap-4 py-2.5">
          <dt className="text-slate-300">Tarif</dt>
          <dd className="text-right font-semibold">{tarif ? tarif.name : <span className="font-normal text-slate-400">noch offen</span>}</dd>
        </div>
        {bausteine.map((baustein) => (
          <div key={baustein.id} className="flex justify-between gap-4 py-2.5">
            <dt className="text-slate-300">Dazu</dt>
            <dd className="text-right font-semibold">{baustein.name}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 py-2.5">
          <dt className="text-slate-300">Beginn</dt>
          <dd className="text-right font-semibold">{beginn?.label || <span className="font-normal text-slate-400">noch offen</span>}</dd>
        </div>
      </dl>
      {tarif && kernzeilen.length > 0 && (
        <div className="mt-5 [@media(max-height:780px)]:hidden" data-kernleistungen="">
          <p className="text-base font-semibold text-slate-300">Das steckt in {tarif.name}</p>
          <ul className="mt-2 space-y-1.5">
            {kernzeilen.slice(0, 5).map(([label, wert], stelle) => (
              <li key={label} className={cx('flex items-start justify-between gap-4 text-base leading-6', stelle >= 4 && '[@media(max-height:1180px)]:hidden', stelle >= 3 && '[@media(max-height:1100px)]:hidden', stelle >= 2 && '[@media(max-height:900px)]:hidden', stelle >= 1 && '[@media(max-height:780px)]:hidden')}>
                <span className="flex min-w-0 gap-2 text-slate-200">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-home-mint" strokeWidth={3} aria-hidden="true" />
                  <span className="min-w-0">{label}</span>
                </span>
                {wert && <span className={cx('max-w-[50%] text-right font-semibold', wert === 'nicht enthalten' ? 'font-normal text-slate-400' : 'text-white')}>{wert}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// Schrittleiste. abschnitte: [{ name }], aktuell: 1-basiert.
export function Schrittleiste({ abschnitte, aktuell }) {
  const anzahl = abschnitte.length;
  const name = abschnitte[aktuell - 1]?.name;
  // Breite der Leiste messen: Namen nur zeigen, wenn sie ohne Umbruch im Wort nebeneinander passen.
  const listeRef = useRef(null);
  const [breite, setBreite] = useState(0);
  useEffect(() => {
    const el = listeRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const beobachter = new ResizeObserver(() => setBreite(el.getBoundingClientRect().width));
    beobachter.observe(el);
    setBreite(el.getBoundingClientRect().width);
    return () => beobachter.disconnect();
  }, []);
  const schrift = typeof window !== 'undefined' ? parseFloat(window.getComputedStyle(document.documentElement).fontSize) || 16 : 16;
  const zeichen = schrift * 0.54;
  const spalte = anzahl ? breite / anzahl : 0;
  const laengstesWort = Math.max(...abschnitte.map((a) => Math.max(...String(a.name || '').split(/\s+/).map((w) => w.length))), 1);
  const alleNamen = spalte >= laengstesWort * zeichen + 8;
  const nameBreite = (nummer) => String(abschnitte[nummer - 1]?.name || '').length * zeichen;
  const nachbarnPassen = [aktuell - 1, aktuell].every((links) => links < 1 || links >= anzahl || (nameBreite(links) + nameBreite(links + 1)) / 2 + 12 <= spalte);
  return (
    <div aria-hidden="true" data-schrittleiste="">
      {/* Handy und Tablet: kompakt mit Balken */}
      <div className="lg:hidden">
        <p className="flex items-baseline justify-between gap-3 text-base">
          <span className="font-display font-extrabold text-home-midnight">Schritt {aktuell} von {anzahl} <span className="font-semibold text-emerald-800">· {name}</span></span>
        </p>
        <div className="mt-2 flex gap-1">
          {abschnitte.map((abschnitt, stelle) => (
            <span key={abschnitt.name + stelle} className={cx('h-1.5 flex-1 rounded-full transition-colors duration-300', stelle < aktuell ? 'bg-emerald-600' : 'bg-home-midnight/10')} />
          ))}
        </div>
      </div>
      {/* Desktop: gleich breite Spalten, durchgehende Linie. Namen unter allen Punkten, wenn sie
          nebeneinander ohne Umbruch im Wort passen; sonst nur beim aktuellen Schritt und seinen
          Nachbarn (mittig unter dem Punkt, schieben nichts), alle anderen mit Namen als Tooltip. */}
      <ol ref={listeRef} className={cx('hidden items-start lg:flex', !alleNamen && 'pb-8')}>
        {abschnitte.map((abschnitt, stelle) => {
          const nummer = stelle + 1;
          const fertig = nummer < aktuell;
          const jetzt = nummer === aktuell;
          const nameHier = alleNamen || Math.abs(nummer - aktuell) <= (nachbarnPassen ? 1 : 0);
          return (
            <li key={abschnitt.name + stelle} title={nameHier ? undefined : abschnitt.name} className="relative flex min-w-0 flex-1 flex-col items-center text-center">
              {stelle > 0 && <span className={cx('absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2', nummer <= aktuell ? 'bg-emerald-600' : 'bg-home-midnight/10')} />}
              <span
                className={cx(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full font-display text-base font-extrabold transition-colors duration-300',
                  fertig && 'bg-emerald-600 text-white',
                  jetzt && 'bg-home-midnight text-white ring-4 ring-home-mint/40',
                  !fertig && !jetzt && 'bg-white text-home-slate ring-1 ring-home-midnight/15',
                )}
              >
                {fertig ? <Check className="h-4 w-4" strokeWidth={3} /> : nummer}
              </span>
              {nameHier && (
                <span className={cx(
                  'mt-2 text-base leading-tight [hyphens:none] [overflow-wrap:normal] [word-break:normal]',
                  alleNamen ? 'max-w-full px-0.5' : 'absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap',
                  jetzt ? 'font-bold text-home-midnight' : 'text-home-slate',
                )}>{abschnitt.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// Karte „Dein Schutz“: Versicherer, Tarif, Beginn, Beitrag groß.
// preis: { betrag, einheit, hinweis } oder null.
export function DeinSchutzKarte({
  definition, tarif, bausteine = [], beginn, preis, className,
}) {
  const produkt = produktAnzeige(definition.sparte);
  return (
    <section aria-label="Dein Schutz" data-dein-schutz="" className={cx('overflow-hidden rounded-[1.75rem] bg-home-midnight text-white shadow-[0_24px_48px_-24px_rgba(7,17,31,0.55)]', className)}>
      <div className="flex items-center gap-3 px-5 pt-5">
        <FriendlyIcon kind={produkt.icon} size="sm" tone="mint" />
        <div className="min-w-0">
          <h2 className="font-display text-lg font-extrabold leading-tight">{produkt.schutz}</h2>
          <p className="text-base leading-6 text-slate-300">bei {schuetze(definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`)}</p>
        </div>
      </div>
      <dl className="mx-5 mt-4 divide-y divide-white/10 border-y border-white/10 text-base">
        <div className="flex justify-between gap-3 py-2.5">
          <dt className="text-slate-300">Tarif</dt>
          <dd className="text-right font-semibold">{tarif ? tarif.name : <span className="font-normal text-slate-400">noch offen</span>}</dd>
        </div>
        {bausteine.map((baustein) => (
          <div key={baustein.id} className="flex justify-between gap-3 py-2.5">
            <dt className="text-slate-300">Dazu</dt>
            <dd className="text-right font-semibold">{baustein.name}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-3 py-2.5">
          <dt className="text-slate-300">Beginn</dt>
          <dd className="text-right font-semibold">{beginn?.label || <span className="font-normal text-slate-400">noch offen</span>}</dd>
        </div>
      </dl>
      <div className="px-5 pb-5 pt-4" aria-live="polite">
        {preis ? (
          <>
            <p className="text-base text-home-mint-active">{preis.einheit === 'im Jahr' ? 'Dein Beitrag im Jahr' : 'Dein Beitrag im Monat'}</p>
            <p className="mt-0.5 whitespace-nowrap font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.03em]">{euro(preis.betrag)}</p>
            {preis.hinweis && <p className="mt-2 text-base leading-6 text-slate-300">{preis.hinweis}</p>}
          </>
        ) : (
          <p className="text-base leading-6 text-slate-300">Sobald dein Geburtsdatum{definition.beitrag?.art === 'dienst' ? ' und deine Postleitzahl' : ''} da {definition.beitrag?.art === 'dienst' ? 'sind' : 'ist'}, siehst du hier deinen Beitrag.</p>
        )}
      </div>
    </section>
  );
}

// Hilfe-Karte: Nita und der Weg ans Telefon oder zum Termin.
export function HilfeKarte({ sparte }) {
  const telefon = HEALIO_ANTRAG_GESPRAECH_AKTIV;
  return (
    <section aria-label="Hilfe" className={cx(KARTE, 'flex gap-3 p-5')}>
      <img src="/nita-avatar.jpg" alt="" width="56" height="56" className="h-14 w-14 shrink-0 rounded-full object-cover ring-2 ring-home-mint/40" />
      <div className="min-w-0">
        <h2 className="font-display text-base font-extrabold leading-snug">Lieber gemeinsam?</h2>
        <p className="mt-0.5 text-base leading-6 text-home-slate">
          {telefon ? 'Nita geht den Antrag am Telefon mit dir durch.' : 'Wir gehen den Antrag persönlich mit dir durch.'}
        </p>
        <a href={telefon ? telefonLink(sparte) : TERMIN_LINK} data-zaehler-ignorieren="" className={cx(FOKUS, 'mt-1 inline-flex min-h-11 items-center gap-1.5 rounded font-semibold text-emerald-800 underline underline-offset-4')}>
          {telefon ? 'Zusammen am Telefon' : 'Termin vereinbaren'}
        </a>
      </div>
    </section>
  );
}

// Begrüßung oben im ersten Schritt.
export function Begruessung({ definition }) {
  const produkt = produktAnzeige(definition.sparte);
  const punkte = [
    'Du bleibst die ganze Zeit bei Healio.',
    `Der Vertrag kommt direkt von ${definition.versicherer.beiDer || `der ${definition.versicherer.kurz}`}.`,
    'Die Bestätigung bekommst du per E-Mail.',
  ];
  return (
    <div className="mb-6 flex gap-4 rounded-[1.4rem] bg-home-ice p-4 ring-1 ring-emerald-900/10 sm:mb-8 sm:p-5" data-begruessung="">
      <FriendlyIcon kind={produkt.icon} size="md" tone="mint" className="hidden sm:inline-grid" />
      <div className="min-w-0">
        <p className="font-display text-xl font-extrabold leading-tight text-home-midnight">{produkt.schutz} in wenigen Minuten</p>
        <ul className="mt-2 space-y-1">
          {punkte.map((punkt) => (
            <li key={punkt} className="flex gap-2 text-base leading-6 text-home-midnight">
              <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-700" strokeWidth={3} aria-hidden="true" />
              <span className="min-w-0">{schuetze(punkt)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
