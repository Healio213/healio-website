import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Laptop, Phone, X } from 'lucide-react';
import { HEALIO_ANTRAGSMASKE_AKTIV, HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV, HEALIO_ANTRAG_GESPRAECH_AKTIV } from '@/config/contactChannels';
import { eigeneMaskeFuer } from '@/data/antrag';
import { zaehle } from '@/lib/anonyme-zaehler';
import { merkeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { sammleHerkunft } from '@/lib/antragsmaske/herkunft';
import { hasConsent } from '@/lib/consent';
import { openApplicationWindow } from '@/lib/lead-capture';
import { TERMIN_LINK, telefonLink } from './teile';

// Wahl der zwei Wege vor dem Abschluss (12.11.2026): „Allein abschließen“
// oder „Antrag zusammen am Telefon“. Ersetzt bei HEALIO_ANTRAGSWAHL_AKTIV das
// E-Mail-Fenster (LeadCaptureProvider.jsx). Beide Wege öffnen als echte
// Seitennavigation, damit auf der Antragsseite keine Mess-Skripte dieser
// Seite weiterlaufen. Gezählt wird nur anonym: Wahl gezeigt, Weg gewählt.
//
// Allein: Gibt es für Sparte und Versicherer eine fertige eigene Maske, geht
// es nach /antrag/<sparte> (Tarifstufe und Geburtsjahr vorbelegt), sonst wie
// heute direkt zum Online-Abschluss des Versicherers.

const TEXTE = {
  ambulant: { telefon: 'Nita geht alle Fragen mit dir durch und nennt dir den Beitrag.' },
  zahn: { telefon: 'Nita nimmt deinen Wunsch auf.' },
  stationaer: { telefon: 'Nita nimmt deinen Wunsch auf.' },
};

function Weg({
  icon: Icon, titel, text, onClick, href, data,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...data}
      className="flex min-h-12 items-start gap-3 rounded-xl border border-[#233044] bg-home-midnight p-4 text-left text-white transition-colors hover:border-home-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-home-mint"
    >
      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-home-mint/15 text-home-mint"><Icon className="h-5 w-5" /></span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2 font-display text-lg font-bold leading-snug">{titel}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></span>
        <span className="mt-0.5 block text-base leading-6 text-slate-300">{text}</span>
      </span>
    </a>
  );
}

export default function WegeWahl({
  link, targetUrl, vorbelegung, onClose, onExternalOpen,
}) {
  const sparte = link.sparte;
  const eigene = HEALIO_ANTRAGSMASKE_AKTIV ? eigeneMaskeFuer(link, { ukvZahn: HEALIO_ANTRAGSMASKE_UKV_ZAHN_AKTIV }) : null;
  const telefon = HEALIO_ANTRAG_GESPRAECH_AKTIV;
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
        sparte: eigene.pfad, tarif: link.tarif, geburtsjahr: vorbelegung?.geburtsjahr ?? null, herkunft: hasConsent('analytics') ? sammleHerkunft({ sparte, weg: 'allein' }) : null,
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
        <Dialog.Overlay className="fixed inset-0 z-[120] bg-home-midnight/80 backdrop-blur-sm" />
        <Dialog.Content
          lang="de"
          data-wegewahl={sparte}
          className="fixed bottom-0 left-1/2 z-[121] max-h-[90dvh] w-full max-w-[460px] -translate-x-1/2 overflow-y-auto rounded-t-2xl border border-[#233044] bg-[#131B26] px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-7 font-sans text-white shadow-2xl outline-none sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-8"
          onOpenAutoFocus={(event) => { event.preventDefault(); ersterWeg.current?.querySelector('a')?.focus(); }}
        >
          <Dialog.Close aria-label="Fenster schließen" className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">
            <X className="h-5 w-5" aria-hidden="true" />
          </Dialog.Close>
          <img src="/healio-logo-white-web.svg" alt="Healio" width="100" height="40" className="mb-4 h-8 w-auto" />
          <Dialog.Title className="pr-8 font-display text-[26px] font-bold leading-[1.2] tracking-tight sm:text-[28px]">Wie möchtest du abschließen?</Dialog.Title>
          <Dialog.Description className="mt-3 text-base leading-6 text-slate-300">Gleicher Tarif, gleicher Beitrag. Du entscheidest, wie.</Dialog.Description>
          <div ref={ersterWeg} className="mt-6 grid gap-3">
            <Weg
              icon={Laptop}
              titel="Allein abschließen"
              text={eigene ? 'Du beantwortest die Fragen in Ruhe selbst, direkt hier bei Healio.' : 'Du füllst den Antrag selbst online beim Versicherer aus.'}
              href={eigene ? `/antrag/${eigene.pfad}` : targetUrl}
              onClick={allein}
              data={{ 'data-weg': 'allein' }}
            />
            {telefon && (
              <Weg
                icon={Phone}
                titel="Antrag zusammen am Telefon"
                text={TEXTE[sparte]?.telefon}
                href={telefonLink(sparte)}
                onClick={() => {
                  zaehle('antragsweg', { ziel: `${sparte}-telefon` });
                  if (hasConsent('analytics')) merkeVorbelegung({ sparte, herkunft: sammleHerkunft({ sparte, weg: 'telefon' }) });
                }}
                data={{ 'data-weg': 'telefon' }}
              />
            )}
          </div>
          <p className="mt-5 text-center text-base leading-6 text-slate-300">
            Lieber persönlich beraten?{' '}
            <a href={TERMIN_LINK} className="text-white underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-home-mint">Termin vereinbaren</a>
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
