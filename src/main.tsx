// @/main.tsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import '@/assets/styles/global.css';

import { routes } from '@/routes/routes';
import ThemeProvider from '@/context/ThemeProvider';
import CartProvider from '@/context/CartProvider';
import AuthProvider from '@/context/AuthProvider';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
