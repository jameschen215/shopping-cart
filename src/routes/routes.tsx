/** --- routes/routes.tsx --- */

import App from "@/components/App";
import ErrorPage from "@/pages/error";
import LandingPage from "@/pages/landing-page";
import productLoader from "@/pages/product/product-loader";
import LoginPage from "@/pages/login";

import { productsLoader } from "@/pages/products/products-loader";
import landingPageLoader from "@/pages/landing-page/landing-page-loader";
import { lazy, Suspense } from "react";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import CartSkeleton from "@/components/skeletons/CartSkeleton";

const ProductsPage = lazy(() => import("@/pages/products"));
const ProductPage = lazy(() => import("@/pages/product"));
const CartPage = lazy(() => import("@/pages/cart"));

export const routes = [
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: LandingPage,
        ErrorBoundary: ErrorPage,
        loader: landingPageLoader,
      },
      {
        path: "products",
        ErrorBoundary: ErrorPage,
        children: [
          {
            index: true,
            loader: productsLoader,
            Component: () => (
              <Suspense fallback={<ProductsSkeleton />}>
                <ProductsPage />
              </Suspense>
            ),
          },
          {
            path: "category/:category",
            loader: productsLoader,
            Component: () => (
              <Suspense fallback={<ProductsSkeleton />}>
                <ProductsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "product/:productId",
        ErrorBoundary: ErrorPage,
        loader: productLoader,
        Component: () => (
          <Suspense fallback={<ProductSkeleton />}>
            <ProductPage />
          </Suspense>
        ),
      },
      {
        path: "cart",
        Component: () => (
          <Suspense fallback={<CartSkeleton />}>
            <CartPage />
          </Suspense>
        ),
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
];
