import React from 'react';
import {
  Check, Lock, Phone,
} from 'lucide-react';
import { HEALIO_ANTRAG_GESPRAECH_AKTIV } from '@/config/contactChannels';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { euro } from '@/lib/antragsmaske/regeln';
import { FOKUS, cx, schuetze } from '@/components/antrag/ui';
import { TERMIN_LINK, telefonLink } from './teile';
import { produktAnzeige } from './anzeige';

// Rahmen der Antragsmaske (12.11.2026): schlanker Kopf mit Logo zurück zur
// Produktseite, „Sicher übertragen“ und dem Weg ans Telefon; Schrittleiste;
// Karte „Dein Schutz“ und Hilfe-Karte. Keine Navigation, keine Messung.

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

export function MaskenRahmen({ sparte, children }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-home-ice text-home-midnight">
      <header className="bg-home-midnight">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href={PRODUKTSEITE[sparte] || '/'} data-zaehler-ignorieren="" className={cx(FOKUS, 'rounded-lg focus-visible:ring-home-mint focus-visible:ring-offset-home-midnight')}>
            <img src="/healio-logo-white-web.svg" alt="Healio, zurück zur Produktseite" width="250" height="100" className="h-8 w-auto sm:h-9" />
          </a>
          <div className="flex items-center gap-4">
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
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-6 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5 md:hidden"><Lock className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />Sicher übertragen</span>
          <span>© Healio GmbH</span>
          <a href="/impressum" target="_blank" rel="noopener" className="font-semibold underline underline-offset-2">Impressum</a>
          <a href="/datenschutz" target="_blank" rel="noopener" className="font-semibold underline underline-offset-2">Datenschutz</a>
        </div>
      </footer>
    </div>
  );
}

// Schrittleiste. abschnitte: [{ name }], aktuell: 1-basiert.
export function Schrittleiste({ abschnitte, aktuell }) {
  const anzahl = abschnitte.length;
  const name = abschnitte[aktuell - 1]?.name;
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
      {/* Desktop: alle Schritte mit Namen */}
      <ol className="hidden items-start lg:flex">
        {abschnitte.map((abschnitt, stelle) => {
          const nummer = stelle + 1;
          const fertig = nummer < aktuell;
          const jetzt = nummer === aktuell;
          return (
            <li key={abschnitt.name + stelle} className="relative flex min-w-0 flex-1 flex-col items-center text-center">
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
              <span className={cx('mt-2 px-1 text-base leading-tight', jetzt ? 'font-bold text-home-midnight' : 'text-home-slate')}>{abschnitt.name}</span>
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
