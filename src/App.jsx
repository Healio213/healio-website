
import React, { useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import Layout from '@/components/Layout';
import RouteNormalizer from '@/components/RouteNormalizer';
import VeterinaryLayout from '@/components/sections/veterinary/VeterinaryLayout';
import PerformanceMetrics from '@/components/PerformanceMetrics';

// Dynamic Lazy Imports for Code Splitting based on routes
const MainHomePage = React.lazy(() => import('@/pages/MainHomePage'));
const AboutPage = React.lazy(() => import('@/pages/AboutPage'));
const LeistungenPage = React.lazy(() => import('@/pages/LeistungenPage'));
const AmbulantPage = React.lazy(() => import('@/pages/AmbulantPage'));
const HealioZahnzusatzPage = React.lazy(() => import('@/pages/HealioZahnzusatzPage'));
const KlinikUpgradePage = React.lazy(() => import('@/pages/KlinikUpgradePage'));
const StationaerPage = React.lazy(() => import('@/pages/StationaerPage'));
const ZahnPage = React.lazy(() => import('@/pages/ZahnPage'));
const ImpressumPage = React.lazy(() => import('@/pages/ImpressumPage'));
const AgbPage = React.lazy(() => import('@/pages/AgbPage'));
const DatenschutzPage = React.lazy(() => import('@/pages/DatenschutzPage'));
const VeterinaryHomePage = React.lazy(() => import('@/pages/VeterinaryHomePage'));
const PartnerPage = React.lazy(() => import('@/pages/PartnerPage'));
const KontaktPage = React.lazy(() => import('@/pages/KontaktPage'));
const PotenzialanalysePage = React.lazy(() => import('@/pages/PotenzialanalysePage'));
const ConfirmationPage = React.lazy(() => import('@/pages/ConfirmationPage'));
const TerminvereinbarungPage = React.lazy(() => import('@/pages/TerminvereinbarungPage'));
const BlogPage = React.lazy(() => import('@/pages/BlogPage'));
const BlogArticlePage = React.lazy(() => import('@/pages/BlogArticlePage'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-8 h-8 border-4 border-[#25c990] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();

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

  return (
    <>
      <PerformanceMetrics />
      <ScrollToTop />
      <RouteNormalizer>
        <Toaster />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* German routes (default) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<MainHomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="leistungen" element={<LeistungenPage />} />
              <Route path="partner" element={<PartnerPage />} />
              <Route path="kontakt" element={<KontaktPage />} />
              <Route path="terminvereinbarung" element={<TerminvereinbarungPage />} />
              <Route path="ambulant" element={<AmbulantPage />} />
              <Route path="Ambulante-zusatzversicherung" element={<Navigate to="/ambulant" replace />} />
              <Route path="zahn" element={<ZahnPage />} />
              <Route path="healio-zahnzusatz" element={<HealioZahnzusatzPage />} />
              <Route path="stationaer" element={<StationaerPage />} />
              <Route path="klinik-upgrade" element={<KlinikUpgradePage />} />
              <Route path="impressum" element={<ImpressumPage />} />
              <Route path="agb" element={<AgbPage />} />
              <Route path="datenschutz" element={<DatenschutzPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogArticlePage />} />
            </Route>

            {/* English routes */}
            <Route path="/en" element={<Layout />}>
              <Route index element={<MainHomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="services" element={<LeistungenPage />} />
              <Route path="partner" element={<PartnerPage />} />
              <Route path="contact" element={<KontaktPage />} />
              <Route path="appointment" element={<TerminvereinbarungPage />} />
              <Route path="outpatient" element={<AmbulantPage />} />
              <Route path="dental" element={<ZahnPage />} />
              <Route path="healio-dental" element={<HealioZahnzusatzPage />} />
              <Route path="inpatient" element={<StationaerPage />} />
              <Route path="hospital-upgrade" element={<KlinikUpgradePage />} />
              <Route path="legal-notice" element={<ImpressumPage />} />
              <Route path="terms" element={<AgbPage />} />
              <Route path="privacy" element={<DatenschutzPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogArticlePage />} />
            </Route>

            <Route path="/potenzialanalyse" element={<PotenzialanalysePage />} />
            <Route path="/en/potential-analysis" element={<PotenzialanalysePage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/en/confirmation" element={<ConfirmationPage />} />

            <Route element={<VeterinaryLayout />}>
               <Route path="/tierkrankenversicherung" element={<VeterinaryHomePage />} />
               <Route path="/en/pet-insurance" element={<VeterinaryHomePage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </RouteNormalizer>
    </>
  );
}

export default App;
