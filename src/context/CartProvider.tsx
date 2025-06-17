import { type ReactNode } from "react";

import { CartContext } from "@/context/cart-context";
import { useCartInitializer } from "@/lib/hooks";

export default function CartProvider({ children }: { children: ReactNode }) {
  const { cartItems, setCartItems } = useCartInitializer();

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}
