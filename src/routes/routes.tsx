import App from "@/components/App";
import CartPage from "@/features/cart/CartPage";
import HomePage from "@/features/home/HomePage";
import ProductsPage from "@/features/products/ProductsPage";
import ProductPage from "@/features/product/ProductPage";
import { productsLoader } from "@/features/products/productsLoader";
import ErrorPage from "@/routes/ErrorPage";

export const routes = [
  {
    path: "/",
    Component: App,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        Component: HomePage,
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
      },
      {
        path: "cart",
        Component: CartPage,
      },
    ],
  },
];
