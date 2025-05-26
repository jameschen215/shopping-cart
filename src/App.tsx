import { Outlet } from "react-router-dom";
// import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Navbar />
      <main className="flex w-full flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
