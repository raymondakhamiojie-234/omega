import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-[#263746]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
