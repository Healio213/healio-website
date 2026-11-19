import React, { createContext, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hasCapturedLeadThisSession, isPersonalOfferUrl, openApplicationWindow, shouldCaptureApplicationLink } from '@/lib/lead-capture';
import { GUIDED_CALLBACK_PREVIEW, getGuidedProduct, openGuidedCallback } from '@/lib/guided-callback';
import { HEALIO_ANTRAGSWAHL_SPARTEN, antragswahlAktiv } from '@/config/contactChannels';
import { antragAusLink } from '@/data/antrag';

const LeadCaptureModal = lazy(() => import('./LeadCaptureModal.tsx'));
// Wahl „Allein abschließen“ oder „Antrag zusammen am Telefon“ (12.11.2026), je Sparte nur bei eingeschalteter Wahl.
const WegeWahl = lazy(() => import('./antragsmaske/WegeWahl.jsx'));
// Die Wahl gibt es nur auf den deutschen Produktseiten; die Maske ist deutsch.
const WAHL_SEITEN = { '/ambulant': 'ambulant', '/zahn': 'zahn', '/stationaer': 'stationaer' };
export const LeadCaptureContext = createContext(null);

export default function LeadCaptureProvider({ children }) {
  const { pathname } = useLocation();
  const [request, setRequest] = useState(null);
  const close = useCallback(() => setRequest(null), []);

  useEffect(() => { setRequest(null); }, [pathname]);

  const requestApplication = useCallback((targetUrl, trackingCategory, onExternalOpen, vorbelegung) => {
    if (!shouldCaptureApplicationLink(targetUrl, pathname)) return false;
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
