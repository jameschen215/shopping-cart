/** ---context/AuthProvider.tsx --- */
import { AuthContext } from "@/context/auth-context";
import { useState, type ReactNode } from "react";

import type { UserType } from "@/lib/types";
import { getStoredToken, getStoredUser, login, logout } from "@/lib/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState<UserType | null>(() => getStoredUser());

  async function handleLogin(username: string, password: string) {
    const { token, user } = await login(username, password);

    setToken(token);
    setUser(user);
  }

  function handleLogout() {
    logout();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
