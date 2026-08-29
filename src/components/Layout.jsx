import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';

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
    </div>
  );
};

export default Layout;
