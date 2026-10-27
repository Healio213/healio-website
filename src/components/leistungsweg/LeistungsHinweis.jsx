import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { withAdClickIds } from '@/lib/ratgeber-cta';
import { LEISTUNGEN_PFAD } from '@/content/leistungsweg';
import {
  ALLE_BAUSTEINE_LABEL,
  BAUSTEIN_FIGUREN,
  LEISTUNGSWEG_KLASSEN as K,
} from '@/lib/leistungswegMarkup';

/**
 * Leistungsweg in Ratgeber und Blog (Auftrag Frank, 27.10.2026).
 *
 * - LeistungsHinweisMitte: schmale, ganz klickbare Karte im Textverlauf mit
 *   Baustein-Figur, Frage, einem Satz und dem Knopf „Baustein ansehen“.
 * - LeistungsHinweisEnde: Abschluss-Block „Welcher Baustein passt zu dir?“
 *   mit Hauptknopf zur Leistungsseite und Textlink auf alle Bausteine.
 * - AlleBausteineLink: der Textlink allein, für Rechner-Karte, Schlussknopf
 *   und Ziel-Kasten im Blog, wenn die schon auf dieselbe Seite zeigen.
 *
 * Ziel und Texte kommen aus src/content/leistungsweg.js, die Klassen aus
 * src/lib/leistungswegMarkup.js (gleich wie im statischen Blog-HTML).
 * Interne Links per React Router, nur eine gültige Google-Klick-Kennung
 * wandert mit (withAdClickIds). Kein Ereignis, kein Pixel.
 */

const Pfeil = ({ className }) => (
  <span className={className} aria-hidden="true">
    <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
  </span>
);

const BausteinStapel = ({ ton }) => (
  <span className={K.stapel} aria-hidden="true">
    {BAUSTEIN_FIGUREN.map(({ kind, src }) => (
      <span key={kind} className={K.stapelFigur[ton]}>
        <img src={src} alt="" width="64" height="64" loading="lazy" decoding="async" className={K.stapelBild} />
      </span>
    ))}
  </span>
);

export const AlleBausteineLink = ({ ton = 'hell', className = '' }) => {
  const { search } = useLocation();
  return (
    <Link
      to={withAdClickIds(LEISTUNGEN_PFAD, search)}
      data-leistungsweg="alle"
      className={`${K.alleLink[ton] || K.alleLink.hell} ${className}`.trim()}
    >
      <BausteinStapel ton={ton} />
      <span className={K.alleText[ton] || K.alleText.hell}>{ALLE_BAUSTEINE_LABEL}</span>
    </Link>
  );
};

export const LeistungsHinweisMitte = ({ ziel }) => {
  const { search } = useLocation();
  if (!ziel?.mitte) return null;
  const { frage, text, label } = ziel.mitte;
  return (
    <aside aria-label="Passender Baustein" data-leistungsweg="mitte" data-leistungsziel={ziel.id} className={K.mitteRahmen}>
      <Link to={withAdClickIds(ziel.link || ziel.to, search)} className={K.mitteKarte}>
        <span className={K.mitteSchein} aria-hidden="true" />
        <FriendlyIcon kind={ziel.icon} tone="mint" size="sm" className={K.mitteIcon} />
        <span className={K.mitteFrage}>{frage}</span>
        <span className={K.mitteSatz}>{text}</span>
        <span className={K.mitteKnopf}>
          {label}
          <Pfeil className={K.pfeilKreisKlein} />
        </span>
      </Link>
    </aside>
  );
};

export const LeistungsHinweisEnde = ({ ziel, alleBausteine = ziel?.alleBausteine }) => {
  const { search } = useLocation();
  if (!ziel?.ende) return null;
  const { titel, text, label } = ziel.ende;
  return (
    <section aria-labelledby="leistungsweg-heading" data-leistungsweg="ende" data-leistungsziel={ziel.id} className={K.endeRahmen}>
      <span className={K.endeScheinOben} aria-hidden="true" />
      <span className={K.endeScheinUnten} aria-hidden="true" />
      <div className={K.endeKopf}>
        <h2 id="leistungsweg-heading" className={K.endeTitel}>{titel}</h2>
        <FriendlyIcon kind={ziel.icon} tone="mint" size="md" className={K.endeIcon} />
        <p className={K.endeSatz}>{text}</p>
      </div>
      <div className={K.endeAktionen}>
        <Link to={withAdClickIds(ziel.link || ziel.to, search)} className={K.endeKnopf}>
          {label}
          <Pfeil className={K.pfeilKreis} />
        </Link>
        {alleBausteine && <AlleBausteineLink ton="hell" />}
      </div>
    </section>
  );
};

export default LeistungsHinweisMitte;
