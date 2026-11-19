import React, { useEffect, useMemo, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Lock, X } from 'lucide-react';
import FriendlyIcon from '@/components/ui/FriendlyIcon';
import { HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV, antragTelefonAktiv, antragsmaskeAktiv } from '@/config/contactChannels';
import { eigeneMaskeFuer } from '@/data/antrag';
import { zaehle } from '@/lib/anonyme-zaehler';
import { merkeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { adresseMitHerkunft, sammleHerkunft } from '@/lib/antragsmaske/herkunft';
import { hasConsent } from '@/lib/consent';
import { openApplicationWindow } from '@/lib/lead-capture';
import { TERMIN_LINK, telefonLink } from './teile';

// Wahl der zwei Wege vor dem Abschluss (12.11.2026): „Allein abschließen“
// oder „Antrag zusammen am Telefon“. Ersetzt bei eingeschalteter Wahl der Sparte das
// E-Mail-Fenster (LeadCaptureProvider.jsx). Beide Wege öffnen als echte
// Seitennavigation, damit auf der Antragsseite keine Mess-Skripte dieser
// Seite weiterlaufen. Gezählt wird nur anonym: Wahl gezeigt, Weg gewählt.
//
// Allein: Gibt es für Sparte und Versicherer eine fertige eigene Maske und ist
// die Sparte eingeschaltet (contactChannels.js), geht es nach /antrag/<sparte>
// (Tarifstufe und Geburtsjahr vorbelegt), sonst wie heute direkt zum
// Online-Abschluss des Versicherers. Telefon: nur, wenn der Telefonweg dieser
// Sparte eingeschaltet ist.
//
// Herkunft (19.11.2026): Die Links zur Maske und zum Antragsgespräch tragen
// ref, utm_*, Einstiegsseite, letzte Seite (diese Seite) und Verweiser in der
// Adresse, damit sie auch ohne Zustimmung zur Messung ankommen.

const TEXTE = {
  ambulant: { telefon: 'Nita geht alle Fragen mit dir durch und nennt dir den Beitrag.' },
  zahn: { telefon: 'Nita nimmt deinen Wunsch auf.' },
  stationaer: { telefon: 'Nita nimmt deinen Wunsch auf.' },
};

function Weg({
  icon, titel, text, onClick, href, data, hervor = false,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...data}
      className={`group flex min-h-12 items-center gap-4 rounded-[1.4rem] p-4 text-left outline-none transition focus-visible:ring-[3px] focus-visible:ring-home-mint focus-visible:ring-offset-2 focus-visible:ring-offset-home-midnight ${hervor ? 'bg-white text-home-midnight [@media(hover:hover)]:hover:bg-home-ice' : 'border border-white/15 bg-white/[0.04] text-white [@media(hover:hover)]:hover:border-home-mint'}`}
    >
      <FriendlyIcon kind={icon} size="sm" tone="mint" />
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg font-extrabold leading-snug">{titel}</span>
        <span className={`mt-0.5 block text-base leading-6 ${hervor ? 'text-home-slate' : 'text-slate-300'}`}>{text}</span>
      </span>
      <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition group-hover:translate-x-0.5 motion-reduce:transition-none ${hervor ? 'bg-home-mint text-home-midnight' : 'bg-white/10 text-home-mint'}`}>
        <ArrowRight className="h-5 w-5" />
      </span>
    </a>
  );
}

export default function WegeWahl({
  link, targetUrl, vorbelegung, onClose, onExternalOpen,
}) {
  const sparte = link.sparte;
  const eigene = antragsmaskeAktiv(sparte) ? eigeneMaskeFuer(link, { ukvZahn: HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV }) : null;
  const telefon = antragTelefonAktiv(sparte);
  const letzteSeite = typeof window !== 'undefined' ? window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/' : null;
  const herkunftAllein = useMemo(() => sammleHerkunft({ sparte, weg: 'allein', letzteSeite }), [sparte, letzteSeite]);
  const herkunftTelefon = useMemo(() => sammleHerkunft({ sparte, weg: 'telefon', letzteSeite }), [sparte, letzteSeite]);
  const ersterWeg = useRef(null);
  const gezaehlt = useRef(false);

  useEffect(() => {
    if (gezaehlt.current) return;
    gezaehlt.current = true;
    zaehle('antragsweg', { ziel: `${sparte}-gezeigt` });
  }, [sparte]);

  const allein = (event) => {
    zaehle('antragsweg', { ziel: `${sparte}-allein` });
    if (eigene) {
      merkeVorbelegung({
        // Herkunft nur mit Zustimmung zur Messung über den Seitenwechsel tragen (Gate 3); ref kommt sonst über den Link.
        sparte: eigene.pfad, tarif: link.tarif, geburtsjahr: vorbelegung?.geburtsjahr ?? null, herkunft: hasConsent('analytics') ? herkunftAllein : null,
      });
      return; // Der Link selbst navigiert nach /antrag/<sparte>.
    }
    event.preventDefault();
    if (openApplicationWindow(targetUrl)) {
      onExternalOpen?.();
      onClose();
    }
  };

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-home-midnight/80 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in motion-safe:duration-150" />
        <Dialog.Content
          lang="de"
          data-wegewahl={sparte}
          className="fixed bottom-0 left-1/2 z-[121] max-h-[90dvh] w-full max-w-[460px] -translate-x-1/2 lg:max-w-3xl lg:p-12 overflow-y-auto rounded-t-[1.75rem] border border-white/10 bg-home-midnight px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-7 font-sans text-white shadow-2xl outline-none sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-[1.75rem] sm:p-8"
          onOpenAutoFocus={(event) => { event.preventDefault(); ersterWeg.current?.querySelector('a')?.focus(); }}
        >
          <Dialog.Close aria-label="Fenster schließen" className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">
            <X className="h-5 w-5" aria-hidden="true" />
          </Dialog.Close>
          <img src="/healio-logo-white-web.svg" alt="Healio" width="100" height="40" className="mb-4 h-8 w-auto" />
          <Dialog.Title className="pr-8 font-display text-[26px] font-bold leading-[1.2] tracking-tight sm:text-[28px]">Wie möchtest du abschließen?</Dialog.Title>
          <Dialog.Description className="mt-3 text-base leading-6 text-slate-300">Gleicher Tarif, gleicher Beitrag. Du entscheidest, wie.</Dialog.Description>
          <div ref={ersterWeg} className="mt-6 grid gap-3 lg:mt-8 lg:grid-cols-2 lg:gap-4">
            <Weg
              icon="document"
              hervor
              titel="Allein abschließen"
              text={eigene ? 'Du beantwortest die Fragen in Ruhe selbst, direkt hier bei Healio.' : 'Du füllst den Antrag selbst online beim Versicherer aus.'}
              href={eigene ? adresseMitHerkunft(`/antrag/${eigene.pfad}`, herkunftAllein) : targetUrl}
              onClick={allein}
              data={{ 'data-weg': 'allein' }}
            />
            {telefon && (
              <Weg
                icon="support"
                titel="Antrag zusammen am Telefon"
                text={TEXTE[sparte]?.telefon}
                href={adresseMitHerkunft(telefonLink(sparte), herkunftTelefon)}
                onClick={() => {
                  zaehle('antragsweg', { ziel: `${sparte}-telefon` });
                  if (hasConsent('analytics')) merkeVorbelegung({ sparte, herkunft: herkunftTelefon });
                }}
                data={{ 'data-weg': 'telefon' }}
              />
            )}
          </div>
          <p className="mt-5 flex items-center justify-center gap-1.5 text-base leading-6 text-slate-300">
            <Lock className="h-4 w-4 text-home-mint" aria-hidden="true" />
            Deine Angaben werden sicher übertragen.
          </p>
          <p className="mt-2 text-center text-base leading-6 text-slate-300">
            Lieber persönlich beraten?{' '}
            <a href={TERMIN_LINK} className="text-white underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">Termin vereinbaren</a>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
