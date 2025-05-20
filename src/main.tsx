import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/assets/styles/global.css";
import App from "@/App";
import { ThemeProvider } from "./components/theme-provider/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
