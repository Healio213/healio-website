import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';

const Layout = () => {
  const { pathname } = useLocation();
  const hideCta = pathname === '/ambulant';

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
      <Footer hideCta={hideCta} />
    </div>
  );
};

export default Layout;