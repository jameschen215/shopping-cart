import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="bg-background container mx-auto flex min-h-screen flex-col shadow-xl">
      <Navbar />

      <main className="flex w-full flex-1 flex-col items-center px-4">
        <Outlet />
      </main>

      <Footer />

      <Toaster position="top-center" className="hidden" />
    </div>
  );
}
