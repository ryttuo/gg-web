'use client';

import { AlertCard } from './components/AlerCard';
import { useAppState } from './context/appStateContext';

export default function Home() {
  const { user } = useAppState();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full text-center">
        {user && (
          <p className="text-lg">
            Welcome, {user.first_name} {user.last_name}
          </p>
        )}
      </div>
      <AlertCard />
    </div>
  );
}
