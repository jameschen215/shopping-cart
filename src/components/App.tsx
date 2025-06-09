import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import { AuthProvider } from "@/providers/AuthProvider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function App() {
  return (
    <AuthProvider>
      <div className="bg-background mx-auto flex min-h-screen flex-col shadow-xl">
        <Navbar />

        <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center px-4">
          <Outlet />
        </main>

        <Footer />

        <Toaster position="bottom-right" />
      </div>
    </AuthProvider>
  );
}
