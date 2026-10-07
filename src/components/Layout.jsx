import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';
import NitaQuickPill from '@/components/sections/shared/NitaQuickPill';

// Seiten, auf denen die Nita-Leiste (mit Sprechblase nach 30 Sekunden) vom
// Layout aus mitläuft, am Handy statt des schwebenden WhatsApp-Knopfs (Vorgabe
// Wunsch 06.10.2026). /zahn bindet die Leiste selbst ein (mit eigenen
// Sprungmarken), dort bitte nicht doppelt.
const NITA_PILL_ROUTES = new Set([
  '/ambulant',
  '/en/outpatient',
  '/stationaer',
  '/en/inpatient',
  '/schwangerschaft',
]);

const Layout = () => {
  const { pathname } = useLocation();
  const showCta = pathname === '/partner' || pathname === '/en/partner';
  const hideCta = !showCta;
  const productSalesRoutes = new Set([
    '/ambulant',
    '/en/outpatient',
    '/zahn',
    '/en/dental',
    '/stationaer',
    '/en/inpatient',
    '/kassenboost',
    '/en/kassenboost',
    '/schwangerschaft',
    // Hebammenseite (08.10.2026): gleicher schmaler App-Hinweis im Fuß wie auf
    // den Produktseiten statt des großen Patienten-Banners.
    '/hebammen',
    '/en/midwives',
  ]);
  const hideAppPromotion = pathname === '/'
    || pathname === '/en'
    || productSalesRoutes.has(pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer hideCta={hideCta} hideAppPromotion={hideAppPromotion} />
      {NITA_PILL_ROUTES.has(pathname) && <NitaQuickPill key={pathname} mobileOnly />}
    </div>
  );
};

export default Layout;
