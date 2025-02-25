import React from 'react';
import Navbar from '@/components/navbar/NavBar';
import {Outlet} from 'react-router-dom';
import TrendingSection from '../../pages/Home/TrendingComp/TrendingComponent';

const MainLayout = () => {
  return (
    <div className='flex justify-between w-full max-w-7xl mx-auto'>
      {/* Left Sidebar */}
      <aside className='w-60 hidden md:flex flex-col'>
        <Navbar />
      </aside>

      {/* Main Content */}
      <main className='flex-1 max-w-2xl'>
        <Outlet />
      </main>

      {/* Right Sidebar (Fixes Overflow) */}
      <aside className='w-80 hidden lg:block'>
        <TrendingSection />
      </aside>
    </div>
  );
};

export default MainLayout;
