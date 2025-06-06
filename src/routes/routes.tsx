import App from "@/components/App";
import CartPage from "@/pages/cart/CartPage";
import ErrorPage from "@/pages/error/ErrorPage";
import HomePage from "@/pages/home/HomePage";
import { homepageLoader } from "@/pages/home/homepage-loader";
import productLoader from "@/pages/product/productLoader";
import ProductPage from "@/pages/product/ProductPage";
import { productsLoader } from "@/pages/products/productsLoader";
import ProductsPage from "@/pages/products/ProductsPage";
import LoginPage from "@/pages/login/LoginPage";
import cartLoader from "@/pages/cart/cartLoader";
import SignUpPage from "@/pages/sign-up/SignUpPage";

export const routes = [
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homepageLoader,
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
        loader: cartLoader,
      },
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "sign-up",
        Component: SignUpPage,
      },
    ],
  },
];
