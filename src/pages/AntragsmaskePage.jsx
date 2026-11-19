import React, { useRef } from 'react';
import { ArrowRight, CalendarDays, Phone } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV, antragTelefonAktiv, antragsmaskeAktiv } from '@/config/contactChannels';
import { definitionFuer } from '@/data/antrag';
import Antragsmaske from '@/components/antragsmaske/Antragsmaske';
import ZahnStrecke from '@/components/antragsmaske/ZahnStrecke';
import { MaskenRahmen, PRODUKTSEITE } from '@/components/antragsmaske/rahmen';
import { TERMIN_LINK, telefonLink } from '@/components/antragsmaske/teile';
import { schuetze } from '@/components/antrag/ui';
import { adresseMitHerkunft, herkunftAusAdresse } from '@/lib/antragsmaske/herkunft';

// Eigene Antragsmaske /antrag/ambulant, /antrag/zahn, /antrag/stationaer
// (12.11.2026). Ohne Layout, noindex, ohne Messung, Nita-Leiste, WhatsApp und
// Cookie-Hinweis (wie /antrag/pruefen). /antrag/zahn beginnt mit der
// Vorabfrage (ZahnStrecke) und führt zur Bayerischen oder zur UKV. Je Sparte
// hinter antragsmaskeAktiv (contactChannels.js, 19.11.2026). Ist die Sparte aus
// oder die Definition noch ein Gerüst, ist hier nichts ausfüllbar: die Seite
// führt zur Produktseite mit dem heutigen Abschluss (Werbercode und utm
// laufen mit) und nennt den Termin, den Telefonweg nur, wenn er für diese
// Sparte eingeschaltet ist.

function AndereWege({ definition, titelRef }) {
  const sparte = definition.sparte;
  const herkunft = herkunftAusAdresse() || {};
  const produktseite = adresseMitHerkunft(PRODUKTSEITE[sparte], { ref: herkunft.ref, utm: herkunft.utm });
  const wege = [
    {
      href: produktseite, icon: ArrowRight, name: 'Weiter zum Online-Abschluss', text: 'Tarif ansehen und wie gewohnt online abschließen.',
    },
    antragTelefonAktiv(sparte) && {
      href: telefonLink(sparte), icon: Phone, name: 'Antrag zusammen am Telefon', text: 'Nita geht die Fragen mit dir durch und nennt dir den Beitrag.',
    },
    {
      href: TERMIN_LINK, icon: CalendarDays, name: 'Termin vereinbaren', text: 'Wir gehen den Antrag persönlich mit dir durch, per Video oder Telefon.',
    },
  ].filter(Boolean);
  return (
    <div className="space-y-6" data-andere-wege="">
      <h1 ref={titelRef} tabIndex={-1} className="font-display text-2xl font-extrabold leading-tight tracking-[-0.02em] text-home-midnight outline-none sm:text-4xl">
        {schuetze(definition.beschreibung)}
      </h1>
      <p className="text-base leading-7 text-home-slate">Hier ist der Antrag gerade nicht online ausfüllbar. Du kannst wie gewohnt abschließen oder einen Termin vereinbaren.</p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {wege.map(({
          href, icon: Icon, name, text,
        }) => (
          <li key={href}>
            <a href={href} data-zaehler-ignorieren="" className="flex min-h-12 items-start gap-3 rounded-[1.2rem] border-2 border-slate-300 bg-white p-4 outline-none transition focus-visible:ring-[3px] focus-visible:ring-home-midnight focus-visible:ring-offset-2 [@media(hover:hover)]:hover:border-emerald-700">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-home-mint/20 text-emerald-800"><Icon className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="block font-display text-base font-extrabold leading-snug text-home-midnight underline decoration-emerald-700/40 underline-offset-4">{name}</span>
                <span className="mt-0.5 block text-base leading-6 text-home-slate">{text}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <a href={produktseite} data-zaehler-ignorieren="" className="inline-flex min-h-11 items-center font-semibold text-emerald-800 underline underline-offset-4">Zurück zur Übersicht</a>
    </div>
  );
}

export default function AntragsmaskePage({ sparte }) {
  const definition = definitionFuer(sparte);
  const titelRef = useRef(null);
  const produktSchalter = { ukvZahn: HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV };
  const aktiv = Boolean(definition && antragsmaskeAktiv(definition.sparte) && definition.bereit && (!definition.schalter || produktSchalter[definition.schalter]));
  return (
    <div className="font-sans text-home-midnight">
      <SEOHead
        title={definition?.seitentitel || 'Antrag | Healio'}
        description={definition?.beschreibung || 'Dein Antrag bei Healio.'}
        robots="noindex, nofollow"
      />
      <MaskenRahmen sparte={definition?.sparte}>
        {aktiv && sparte === 'zahn' && <ZahnStrecke definition={definition} />}
        {aktiv && sparte !== 'zahn' && <Antragsmaske definition={definition} />}
        {!aktiv && <div className="mx-auto w-full max-w-3xl break-words px-4 py-8 sm:py-12"><AndereWege definition={definition} titelRef={titelRef} /></div>}
      </MaskenRahmen>
    </div>
  );
}
