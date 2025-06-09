import App from "@/components/App";
import CartPage from "@/pages/cart";
import ErrorPage from "@/pages/error";
import LandingPage from "@/pages/landing-page";
import productLoader from "@/pages/product/product-loader";
import ProductPage from "@/pages/product";
import ProductsPage from "@/pages/products";
import LoginPage from "@/pages/login";

import { ladingPageLoader } from "@/pages/landing-page/landing-page-loader";
import { productsLoader } from "@/pages/products/products-loader";

export const routes = [
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: LandingPage,
        loader: ladingPageLoader,
        ErrorBoundary: ErrorPage,
      },
      {
        path: "products",
        ErrorBoundary: ErrorPage,
        children: [
          {
            index: true,
            loader: productsLoader,
            Component: ProductsPage,
          },
          {
            path: "category/:category",
            loader: productsLoader,
            Component: ProductsPage,
          },
        ],
      },
      {
        path: "product/:productId",
        Component: ProductPage,
        ErrorBoundary: ErrorPage,
        loader: productLoader,
      },
      {
        path: "cart",
        Component: CartPage,
      },
      {
        path: "login",
        Component: LoginPage,
      },
    ],
  },
];
