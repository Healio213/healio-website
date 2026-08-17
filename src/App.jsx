
import React, { useEffect, useRef, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import Layout from '@/components/Layout';
import RouteNormalizer from '@/components/RouteNormalizer';
import VeterinaryLayout from '@/components/sections/veterinary/VeterinaryLayout';
import PerformanceMetrics from '@/components/PerformanceMetrics';
import { ConsentManager } from '@/components/ConsentManager';
import { NitaConsentWidget } from '@/components/NitaConsentWidget';
import { useReferrer } from '@/hooks/useReferrer';
import { getConsentState, hasConsent, subscribeConsent } from '@/lib/consent';
import { trackPageView } from '@/lib/analytics';

// Dynamic Lazy Imports for Code Splitting based on routes
const MainHomePage = React.lazy(() => import('@/pages/MainHomePage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const LeistungenPage = React.lazy(() => import('@/pages/LeistungenPage'));
const AmbulantPage = React.lazy(() => import('@/pages/AmbulantPage'));
const StationaerPage = React.lazy(() => import('@/pages/StationaerPage'));
const ZahnPage = React.lazy(() => import('@/pages/ZahnPage'));
const ImpressumPage = React.lazy(() => import('@/pages/ImpressumPage'));
const AgbPage = React.lazy(() => import('@/pages/AgbPage'));
const DatenschutzPage = React.lazy(() => import('@/pages/DatenschutzPage'));
const ErstinformationPage = React.lazy(() => import('@/pages/ErstinformationPage'));
const KontoLoeschenPage = React.lazy(() => import('@/pages/KontoLoeschenPage'));
const VeterinaryHomePage = React.lazy(() => import('@/pages/VeterinaryHomePage'));
const UnternehmenPage = React.lazy(() => import('@/pages/UnternehmenPage'));
const PartnerPage = React.lazy(() => import('@/pages/PartnerPage'));
const HebammenPage = React.lazy(() => import('@/pages/HebammenPage'));
const ZahnaerztePage = React.lazy(() => import('@/pages/ZahnaerztePage'));
const HeilberufeVorsorgePage = React.lazy(() => import('@/pages/HeilberufeVorsorgePage'));
const LebenshilfePage = React.lazy(() => import('@/pages/LebenshilfePage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const KontaktPage = React.lazy(() => import('@/pages/KontaktPage'));
const PotenzialanalysePage = React.lazy(() => import('@/pages/PotenzialanalysePage'));
const ConfirmationPage = React.lazy(() => import('@/pages/ConfirmationPage'));
const AppEmailConfirmedPage = React.lazy(() => import('@/pages/AppEmailConfirmedPage'));
const AppPasswordResetPage = React.lazy(() => import('@/pages/AppPasswordResetPage'));
const TerminvereinbarungPage = React.lazy(() => import('@/pages/TerminvereinbarungPage'));
const BlogPage = React.lazy(() => import('@/pages/BlogPage'));
const BlogArticlePage = React.lazy(() => import('@/pages/BlogArticlePage'));
const TikTokPage = React.lazy(() => import('@/pages/TikTokPage'));
const InstagramPage = React.lazy(() => import('@/pages/InstagramPage'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-8 h-8 border-4 border-[#25c990] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();
  const lastTrackedPathRef = useRef(null);
  // Ref-Code auf jeder Seite einfangen (z.B. healio.de/leistungen?ref=A7K2M9B4)
  useReferrer();

  useEffect(() => {
    // Performance monitoring for slow image load times
    if (window.PerformanceObserver) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.initiatorType === 'img' && entry.duration > 500) {
              console.warn(`[Perf] Slow image load detected: ${entry.name} took ${Math.round(entry.duration)}ms`);
            }
          });
        });
        observer.observe({ entryTypes: ['resource'] });
        return () => observer.disconnect();
      } catch (e) {
        console.error("PerformanceObserver error:", e);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = location.pathname.startsWith('/en') ? 'en' : 'de';
  }, [location.pathname]);

  useEffect(() => {
    const trackCurrentPage = (state) => {
      if (!hasConsent('analytics', state)) {
        lastTrackedPathRef.current = null;
        return;
      }
      if (lastTrackedPathRef.current === location.pathname) return;
      if (trackPageView(location.pathname)) lastTrackedPathRef.current = location.pathname;
    };

    trackCurrentPage(getConsentState());
    return subscribeConsent(trackCurrentPage);
  }, [location.pathname]);

  return (
    <>
      <PerformanceMetrics />
      <ScrollToTop />
      <ConsentManager />
      <NitaConsentWidget />
      <RouteNormalizer>
        <Toaster />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* German routes (default) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<MainHomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="leistungen" element={<LeistungenPage />} />
              <Route path="unternehmen" element={<UnternehmenPage />} />
              <Route path="betriebliche-vorsorge" element={<Navigate to="/unternehmen" replace />} />
              <Route path="bav-bkv" element={<Navigate to="/unternehmen" replace />} />
              <Route path="partner" element={<PartnerPage />} />
              <Route path="hebammen" element={<HebammenPage />} />
              <Route path="zahnaerzte" element={<ZahnaerztePage />} />
              <Route path="heilberufe-vorsorge" element={<HeilberufeVorsorgePage />} />
              <Route path="lebenshilfe" element={<LebenshilfePage />} />
              <Route path="heilpraktiker-vorsorge" element={<Navigate to="/heilberufe-vorsorge" replace />} />
              <Route path="osteopathen-vorsorge" element={<Navigate to="/heilberufe-vorsorge" replace />} />
              <Route path="praxis-absicherung" element={<Navigate to="/heilberufe-vorsorge" replace />} />
              <Route path="kontakt" element={<KontaktPage />} />
              <Route path="terminvereinbarung" element={<TerminvereinbarungPage />} />
              <Route path="ambulant" element={<AmbulantPage />} />
              <Route path="heilpraktiker-zusatzversicherung" element={<Navigate to="/ambulant" replace />} />
              <Route path="Ambulante-zusatzversicherung" element={<Navigate to="/ambulant" replace />} />
              <Route path="zahn" element={<ZahnPage />} />
              <Route path="healio-zahnzusatz" element={<Navigate to="/zahn" replace />} />
              <Route path="stationaer" element={<StationaerPage />} />
              <Route path="klinik-upgrade" element={<Navigate to="/stationaer" replace />} />
              <Route path="impressum" element={<ImpressumPage />} />
              <Route path="agb" element={<AgbPage />} />
              <Route path="datenschutz" element={<DatenschutzPage />} />
              <Route path="erstinformation" element={<ErstinformationPage />} />
              <Route path="konto-loeschen" element={<KontoLoeschenPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogArticlePage />} />
            </Route>

            {/* English routes */}
            <Route path="/en" element={<Layout />}>
              <Route index element={<MainHomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<LeistungenPage />} />
              <Route path="companies" element={<UnternehmenPage />} />
              <Route path="corporate-benefits" element={<Navigate to="/en/companies" replace />} />
              <Route path="partner" element={<PartnerPage />} />
              <Route path="midwives" element={<HebammenPage />} />
              <Route path="contact" element={<KontaktPage />} />
              <Route path="appointment" element={<TerminvereinbarungPage />} />
              <Route path="outpatient" element={<AmbulantPage />} />
              <Route path="dental" element={<ZahnPage />} />
              <Route path="healio-dental" element={<Navigate to="/en/dental" replace />} />
              <Route path="inpatient" element={<StationaerPage />} />
              <Route path="hospital-upgrade" element={<Navigate to="/en/inpatient" replace />} />
              <Route path="legal-notice" element={<ImpressumPage />} />
              <Route path="terms" element={<AgbPage />} />
              <Route path="privacy" element={<DatenschutzPage />} />
              <Route path="initial-information" element={<ErstinformationPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogArticlePage />} />
            </Route>

            {/* TikTok Bio-Link — standalone, ohne Layout/Header/Footer */}
            <Route path="/tiktok" element={<TikTokPage />} />
            <Route path="/en/tiktok" element={<TikTokPage />} />

            {/* Instagram Bio-Link — standalone, ohne Layout/Header/Footer */}
            <Route path="/instagram" element={<InstagramPage />} />
            <Route path="/en/instagram" element={<InstagramPage />} />

            <Route path="/potenzialanalyse" element={<PotenzialanalysePage />} />
            <Route path="/en/potential-analysis" element={<PotenzialanalysePage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/en/confirmation" element={<ConfirmationPage />} />
            <Route path="/app-bestaetigt" element={<AppEmailConfirmedPage />} />
            <Route path="/reset-password" element={<AppPasswordResetPage />} />
            <Route path="/auth/confirmed" element={<Navigate to="/app-bestaetigt" replace />} />

            <Route element={<VeterinaryLayout />}>
               <Route path="/tierkrankenversicherung" element={<VeterinaryHomePage />} />
               <Route path="/en/pet-insurance" element={<VeterinaryHomePage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </RouteNormalizer>
    </>
  );
}

export default App;
