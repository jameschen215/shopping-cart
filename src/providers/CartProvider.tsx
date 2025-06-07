import { getStoredUser } from "@/auth/auth";
import { CartContext } from "@/context/CartContext";
import type { LocalCartType } from "@/data/data-type";
import { getCart, getProduct } from "@/data/products";
import { useEffect, useState, type ReactNode } from "react";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<LocalCartType[]>([]);

  useEffect(() => {
    const user = getStoredUser();

    if (!user) return;

    async function createCartItems(id: number) {
      const cart = await getCart(id);

      const products = await Promise.all(
        cart.products.map(async ({ productId, quantity }) => {
          const product = await getProduct(productId);
          return { product, quantity };
        }),
      );

      setCartItems(products);
    }

    createCartItems(user.id);
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
