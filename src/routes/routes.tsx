import App from "@/components/App";
import CartPage from "@/features/cart/CartPage";
import HomePage from "@/features/home/HomePage";
import ProductsPage from "@/features/products/ProductsPage";
import ProductPage from "@/features/product/ProductPage";

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
