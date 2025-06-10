/** --- context/auth-context.ts --- */

import type { UserType } from "@/lib/types";
import { createContext } from "react";

type AuthContextType = {
  token: string | null;
  user: UserType | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
