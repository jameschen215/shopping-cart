import { AuthContext } from "@/context/auth-context";
import { CartContext } from "@/context/cart-context";
import { ThemeProviderContext } from "@/context/theme-context";
import { useContext } from "react";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used inside AuthProvider!");

  return context;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) throw new Error("useCart must be used inside CartProvider!");

  return context;
}
