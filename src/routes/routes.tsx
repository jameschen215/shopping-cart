import App from "@/components/App";
import CartPage from "@/features/cart/cart";
import HomePage from "@/features/home/home";
import ProductPage from "@/features/product/product";
import ProductsPage from "@/features/products/products";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "product/:productId",
        element: <ProductPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
];
