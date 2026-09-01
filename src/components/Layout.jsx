import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';
import WhatsAppContactButton from '@/components/WhatsAppContactButton';

const Layout = () => {
  const { pathname } = useLocation();
  const appPromotionRoutes = new Set([
    '/ambulant',
    '/heilpraktiker-zusatzversicherung',
    '/kassenbonus',
    '/en/outpatient',
    '/en/health-insurance-bonus',
  ]);
  const hideAppPromotion = !appPromotionRoutes.has(pathname);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <WhatsAppContactButton />
      <Footer hideCta hideAppPromotion={hideAppPromotion} />
    </div>
  );
};

export default Layout;
