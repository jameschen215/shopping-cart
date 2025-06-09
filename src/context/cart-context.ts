import type { LocalCartType } from "@/lib/types";
import { createContext } from "react";

export type CartContextType = {
  cartItems: LocalCartType[];
  setCartItems: React.Dispatch<React.SetStateAction<LocalCartType[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);
