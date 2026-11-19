import React, { createContext, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hasCapturedLeadThisSession, isPersonalOfferUrl, openApplicationWindow, shouldCaptureApplicationLink } from '@/lib/lead-capture';
import { GUIDED_CALLBACK_PREVIEW, getGuidedProduct, openGuidedCallback } from '@/lib/guided-callback';
import {
  HEALIO_ANTRAGSWAHL_SPARTEN, antragTelefonAktiv, antragsmaskeAktiv, antragswahlAktiv,
} from '@/config/contactChannels';
import { antragAusLink, eigeneMaskeFuer } from '@/data/antrag';
import { zaehle } from '@/lib/anonyme-zaehler';
import { adresseMitHerkunft, sammleHerkunft } from '@/lib/antragsmaske/herkunft';
import { merkeVorbelegung } from '@/lib/antragsmaske/vorbelegung';
import { hasConsent } from '@/lib/consent';

const LeadCaptureModal = lazy(() => import('./LeadCaptureModal.tsx'));
// Wahl „Allein abschließen“ oder „Antrag zusammen am Telefon“ (12.11.2026), je Sparte nur bei eingeschalteter Wahl.
const WegeWahl = lazy(() => import('./antragsmaske/WegeWahl.jsx'));
// Die Wahl gibt es nur auf den deutschen Produktseiten; die Maske ist deutsch.
const WAHL_SEITEN = { '/ambulant': 'ambulant', '/zahn': 'zahn', '/stationaer': 'stationaer' };
export const LeadCaptureContext = createContext(null);

// Direkt in die eigene Maske (19.11.2026): Sind für eine Sparte Wahl und eigene
// Maske an und gibt es keinen Telefonweg, bleibt nichts zu wählen. Dann führt
// jeder Abschlussknopf dieser Sparte auf deutschen Seiten gleich nach
// /antrag/<sparte>, mit Tarif und Herkunft wie bei „Allein abschließen“ in der
// Wahl (WegeWahl.jsx). Englische Seiten bleiben wie heute (die Maske ist deutsch).
export function direkteMaske(targetUrl, pathname) {
  const link = antragAusLink(targetUrl);
  if (!link || !antragswahlAktiv(link.sparte) || !antragsmaskeAktiv(link.sparte) || antragTelefonAktiv(link.sparte)) return null;
  if (/^\/en(\/|$)/.test(String(pathname || ''))) return null;
  const eigene = eigeneMaskeFuer(link, {});
  return eigene ? { link, eigene } : null;
}

function zurMaske({ link, eigene }, vorbelegung, { neuerTab = false } = {}) {
  const letzteSeite = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const herkunft = sammleHerkunft({ sparte: link.sparte, weg: 'allein', letzteSeite });
  zaehle('antragsweg', { ziel: `${link.sparte}-allein` });
  merkeVorbelegung({
    sparte: eigene.pfad, tarif: link.tarif, geburtsjahr: vorbelegung?.geburtsjahr ?? null, herkunft: hasConsent('analytics') ? herkunft : null,
  });
  const ziel = adresseMitHerkunft(`/antrag/${eigene.pfad}`, herkunft);
  if (neuerTab) window.open(ziel, '_blank', 'noopener');
  else window.location.assign(ziel);
}

export default function LeadCaptureProvider({ children }) {
  const { pathname } = useLocation();
  const [request, setRequest] = useState(null);
  const close = useCallback(() => setRequest(null), []);

  useEffect(() => { setRequest(null); }, [pathname]);

  // Auch einfache Links (ohne LeadCaptureLink) zum Online-Abschluss einer Sparte
  // mit direkter Maske führen in die Maske. Läuft nach den React-Handlern;
  // was LeadCaptureLink schon behandelt hat (defaultPrevented), bleibt unberührt.
  useEffect(() => {
    if (!Object.values(HEALIO_ANTRAGSWAHL_SPARTEN).some(Boolean)) return undefined;
    const beiKlick = (event) => {
      if (event.defaultPrevented || (event.type === 'click' && event.button !== 0) || (event.type === 'auxclick' && event.button !== 1)) return;
      const anker = event.target?.closest?.('a[href]');
      if (!anker) return;
      const direkt = direkteMaske(anker.href, window.location.pathname);
      if (!direkt) return;
      event.preventDefault();
      zurMaske(direkt, null, { neuerTab: event.type === 'auxclick' || event.metaKey || event.ctrlKey });
    };
    document.addEventListener('click', beiKlick);
    document.addEventListener('auxclick', beiKlick);
    return () => { document.removeEventListener('click', beiKlick); document.removeEventListener('auxclick', beiKlick); };
  }, []);

  const requestApplication = useCallback((targetUrl, trackingCategory, onExternalOpen, vorbelegung) => {
    if (!shouldCaptureApplicationLink(targetUrl, pathname)) return false;
    const direkt = direkteMaske(targetUrl, pathname);
    if (direkt) {
      zurMaske(direkt, vorbelegung);
      return true;
    }
    if (Object.values(HEALIO_ANTRAGSWAHL_SPARTEN).some(Boolean)) {
      const link = antragAusLink(targetUrl);
      if (link && antragswahlAktiv(link.sparte) && WAHL_SEITEN[pathname.replace(/\/+$/, '')] === link.sparte) {
        setRequest({ wahl: link, targetUrl, onExternalOpen, vorbelegung });
        return true;
      }
    }
    if (GUIDED_CALLBACK_PREVIEW) {
      openGuidedCallback({ product: getGuidedProduct(pathname) });
      return true;
    }
    if (!isPersonalOfferUrl(targetUrl) && hasCapturedLeadThisSession() && openApplicationWindow(targetUrl)) {
      onExternalOpen?.();
      return true;
    }
    setRequest({ targetUrl, trackingCategory, onExternalOpen });
    return true;
  }, [pathname]);

  return (
    <LeadCaptureContext.Provider value={{ pathname, requestApplication }}>
      {children}
      {request?.wahl && (
        <Suspense fallback={null}>
          <WegeWahl link={request.wahl} targetUrl={request.targetUrl} vorbelegung={request.vorbelegung} onClose={close} onExternalOpen={request.onExternalOpen} />
        </Suspense>
      )}
      {request && !request.wahl && (
        <Suspense fallback={null}>
          <LeadCaptureModal
            isOpen
            onClose={close}
            targetUrl={request.targetUrl}
            trackingCategory={request.trackingCategory}
            onExternalOpen={request.onExternalOpen}
          />
        </Suspense>
      )}
    </LeadCaptureContext.Provider>
  );
}
