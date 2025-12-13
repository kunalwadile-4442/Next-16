import { Header } from '@/Shared/components/header';
import React from 'react';
import { Footer } from 'react-day-picker';

function StandardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-3">{children}</main>
      <Footer />
    </div>
  );
}

export default StandardLayout;
