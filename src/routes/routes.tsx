import App from "@/components/App";
import HomePage from "@/routes/home/HomePage";
import CartPage from "@/routes/cart/CartPage";
import ErrorPage from "@/routes/error/ErrorPage";
import ProductPage from "@/routes/product/ProductPage";
import ProductsPage from "@/routes/products/ProductsPage";
import { productsLoader } from "@/routes/products/productsLoader";
import productLoader from "@/routes/product/productLoader";

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
        ErrorBoundary: ErrorPage,
        loader: productLoader,
      },
      {
        path: "cart",
        Component: CartPage,
      },
    ],
  },
];
