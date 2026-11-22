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
// Zahn (22.11.2026, Franks Vorgabe 19.11.: eine Maske, die Gesellschaft wählt die Weiche):
// Jeder Zahn-Link, ob Bayerische oder UKV, führt in den Einstieg der gemeinsamen Maske
// /antrag/zahn, ohne Tarif und ohne vorab gewählte Gesellschaft (die Definition mit dem
// Pfad zahn ist nur die Adresse; welche Gesellschaft es wird, entscheidet ZahnStrecke).
export function direkteMaske(targetUrl, pathname) {
  const roh = antragAusLink(targetUrl);
  if (!roh || !antragswahlAktiv(roh.sparte) || !antragsmaskeAktiv(roh.sparte) || antragTelefonAktiv(roh.sparte)) return null;
  if (/^\/en(\/|$)/.test(String(pathname || ''))) return null;
  const link = roh.sparte === 'zahn' ? { sparte: 'zahn', versicherer: 'bayerische', tarif: null } : roh;
  const eigene = eigeneMaskeFuer(link, {});
  return eigene ? { link, eigene } : null;
}

// Messung beim Klick in den Antrag (21.11.2026): Bisher lief die Messung des Knopfs
// (trackSdkClick: anonymer Zähler sdk_klick, Meta „RechnerStart“, Google Ads „Antrag
// geöffnet“, GA4 tariff_calculator_click, jeweils mit der Zustimmungsregel des
// jeweiligen Moduls) erst, wenn der Rechner des Versicherers aufging. Beim direkten
// Weg in die Maske läuft sie jetzt beim Klick, mit denselben Mitteln, auf der Seite
// des Knopfs (die Maske selbst misst nie). Mit Zustimmung wartet der Seitenwechsel
// kurz, damit die Ereignisse vor dem Verlassen der Seite hinausgehen.
const MESS_WARTEZEIT_MS = 300;

function zurMaske({ link, eigene }, vorbelegung, { neuerTab = false, beimOeffnen = null } = {}) {
  const letzteSeite = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const herkunft = sammleHerkunft({ sparte: link.sparte, weg: 'allein', letzteSeite });
  zaehle('antragsweg', { ziel: `${link.sparte}-allein` });
  try { beimOeffnen?.(); } catch { /* Messung blockiert nie den Weg in den Antrag. */ }
  merkeVorbelegung({
    sparte: eigene.pfad, tarif: link.tarif, geburtsjahr: vorbelegung?.geburtsjahr ?? null, herkunft: hasConsent('analytics') ? herkunft : null,
  });
  const ziel = adresseMitHerkunft(`/antrag/${eigene.pfad}`, herkunft);
  if (neuerTab) window.open(ziel, '_blank', 'noopener');
  else if (hasConsent('analytics') || hasConsent('marketing')) window.setTimeout(() => window.location.assign(ziel), MESS_WARTEZEIT_MS);
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
      // Nachbesserung 22.11.2026: Ein einfacher Link kann das Geburtsjahr aus einem Rechner der Seite mitgeben
      // (z. B. /ambulant/osteopathie); merkeVorbelegung prüft es wie bei LeadCaptureLink.
      const jahr = Number(anker.getAttribute('data-vorbelegung-geburtsjahr'));
      zurMaske(direkt, Number.isInteger(jahr) && jahr > 0 ? { geburtsjahr: jahr } : null, { neuerTab: event.type === 'auxclick' || event.metaKey || event.ctrlKey });
    };
    document.addEventListener('click', beiKlick);
    document.addEventListener('auxclick', beiKlick);
    return () => { document.removeEventListener('click', beiKlick); document.removeEventListener('auxclick', beiKlick); };
  }, []);

  const requestApplication = useCallback((targetUrl, trackingCategory, onExternalOpen, vorbelegung) => {
    if (!shouldCaptureApplicationLink(targetUrl, pathname)) return false;
    const direkt = direkteMaske(targetUrl, pathname);
    if (direkt) {
      zurMaske(direkt, vorbelegung, { beimOeffnen: onExternalOpen });
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
