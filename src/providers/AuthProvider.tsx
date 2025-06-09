import { AuthContext } from "@/context/auth-context";
import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import type { UserType } from "@/lib/types";
import { getStoredToken, getStoredUser, login, logout } from "@/auth/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState<UserType | null>(() => getStoredUser());
  const navigate = useNavigate();

  // Load from localStorage on first render
  useEffect(() => {
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
  }, []);

  async function handleLogin(username: string, password: string) {
    const { token, user } = await login(username, password);

    setToken(token);
    setUser(user);
  }

  function handleLogout() {
    logout();
    setToken(null);
    setUser(null);

    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ token, user, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
