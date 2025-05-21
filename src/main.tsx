import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/assets/styles/global.css";
import { ThemeProvider } from "./components/theme-provider/theme-provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
