import App from "@/App";
import CartPage from "@/features/cart/cart";
import HomePage from "@/features/home/home";
import ProductPage from "@/features/product/product";
import ProductsPage from "@/features/products/products";

export const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "products",
        Component: ProductsPage,
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
