import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/sections/Footer';

const VeterinaryLayout = () => {
  return (
    <div className="veterinary-portal min-h-screen flex flex-col font-sans relative">
      {/* 
        Reusing main Header. The header uses fixed positioning and transparent background,
        allowing the hero section to seamlessly underlay it.
      */}
      <Header />
      
      {/* Removed pt-[80px] to allow hero to hit the absolute top of the viewport */}
      <main className="flex-grow bg-slate-50 w-full">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default VeterinaryLayout;