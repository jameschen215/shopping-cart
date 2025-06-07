import { createContext } from "react";

import type { LocalCartType } from "@/data/data-type";

export type CartContextType = {
  cartItems: LocalCartType[];
  setCartItems: React.Dispatch<React.SetStateAction<LocalCartType[]>>;
};

export const CartContext = createContext<CartContextType | null>(null);
