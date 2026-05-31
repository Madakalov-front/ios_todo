import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
  type AuthUser,
} from "@/entities/session/lib/authStorage";
import { DEMO_CREDENTIALS } from "@/shared/config/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (login: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  const login = useCallback((loginValue: string, password: string) => {
    const isValid =
      loginValue === DEMO_CREDENTIALS.login &&
      password === DEMO_CREDENTIALS.password;

    if (!isValid) return false;

    const nextUser = { login: loginValue };
    setStoredUser(nextUser);
    setUser(nextUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
