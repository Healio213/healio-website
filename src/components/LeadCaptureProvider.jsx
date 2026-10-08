import React, { createContext, lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { hasCapturedLeadThisSession, openApplicationWindow, shouldCaptureApplicationLink } from '@/lib/lead-capture';

const LeadCaptureModal = lazy(() => import('./LeadCaptureModal.tsx'));
export const LeadCaptureContext = createContext(null);

export default function LeadCaptureProvider({ children }) {
  const { pathname } = useLocation();
  const [request, setRequest] = useState(null);
  const close = useCallback(() => setRequest(null), []);

  useEffect(() => { setRequest(null); }, [pathname]);

  const requestApplication = useCallback((targetUrl, trackingCategory, onExternalOpen) => {
    if (!shouldCaptureApplicationLink(targetUrl, pathname)) return false;
    if (hasCapturedLeadThisSession() && openApplicationWindow(targetUrl)) {
      onExternalOpen?.();
      return true;
    }
    setRequest({ targetUrl, trackingCategory, onExternalOpen });
    return true;
  }, [pathname]);

  return (
    <LeadCaptureContext.Provider value={{ pathname, requestApplication }}>
      {children}
      {request && (
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
