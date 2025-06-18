import { type ReactNode } from "react";

import { CartContext } from "@/context/cart-context";
import { useCartInitializer } from "@/lib/hooks";

export default function CartProvider({ children }: { children: ReactNode }) {
  const { cartItems, setCartItems, isLoading } = useCartInitializer();

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}
