import { Outlet } from "react-router-dom";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="bg-background container mx-auto flex min-h-screen flex-col shadow-xl">
      <Navbar />

      <main className="flex w-full flex-1 flex-col">
        <Outlet />
      </main>

      <Footer />

      <Toaster position="top-center" className="hidden" />
    </div>
  );
}
