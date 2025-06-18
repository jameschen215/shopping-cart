/** ---context/AuthProvider.tsx --- */
import { AuthContext } from '@/context/auth-context';
import { useMemo, useState, type ReactNode } from 'react';

import type { UserType } from '@/lib/types';
import { getStoredToken, getStoredUser, login, logout } from '@/lib/auth';

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState<UserType | null>(() => getStoredUser());

  const contextValue = useMemo(
    () => ({
      token,
      user,
      login: handleLogin,
      logout: handleLogout,
    }),
    [token, user],
  );

  async function handleLogin(username: string, password: string) {
    try {
      const { token, user } = await login(username, password);
      setToken(token);
      setUser(user);
    } catch (err) {
      console.error('Login failed', err);
      throw err;
    }
  }

  function handleLogout() {
    logout();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
