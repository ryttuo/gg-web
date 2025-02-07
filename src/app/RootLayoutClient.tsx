'use client';

import { Inter } from 'next/font/google';
import { AppStateProvider, useAppState } from './context/appStateContext';
import { useEffect } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import { Header } from './components/Header';
const inter = Inter({ subsets: ['latin'] });

interface RootLayoutClientProps {
  children: React.ReactNode;
}

function AppInitializer() {
  const { loadProfile } = useAppState();

  useEffect(() => {
    loadProfile();
      
    
  }, [loadProfile]);
}

export default function RootLayoutClient({
  children,
}: Readonly<RootLayoutClientProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppStateProvider>
          <AppInitializer />
          <Header />
          {/* <AuthenticatedLayout>{children}</AuthenticatedLayout> */}
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
