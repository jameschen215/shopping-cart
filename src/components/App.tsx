// @/components/App.tsx

import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/others/Footer';

export default function App() {
  return (
    <div className="bg-background mx-auto flex min-h-screen flex-col shadow-xl">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-4">
        <Outlet />
      </main>

      <Footer />

      <Toaster position="bottom-right" />
    </div>
  );
}
