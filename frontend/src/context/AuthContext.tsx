import React, { createContext, useContext, useState, useEffect } from "react";
import type { AuthTokens, User } from "../types";
import { authApi } from "../api/auth";
import type { LoginPayload, RegisterPayload } from "../api/auth";

interface AuthContextType {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedTokens = localStorage.getItem("pulseguard_tokens");
      if (storedTokens) {
        try {
          const parsedTokens = JSON.parse(storedTokens);
          setTokens(parsedTokens);
          const profile = await authApi.getProfile();
          setUser(profile);
        } catch {
          localStorage.removeItem("pulseguard_tokens");
          setTokens(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (payload: LoginPayload) => {
    const receivedTokens = await authApi.login(payload);
    localStorage.setItem("pulseguard_tokens", JSON.stringify(receivedTokens));
    setTokens(receivedTokens);
    const profile = await authApi.getProfile();
    setUser(profile);
  };

  const register = async (payload: RegisterPayload) => {
    await authApi.register(payload);
    await login({ email: payload.email, password: payload.password });
  };

  const logout = () => {
    localStorage.removeItem("pulseguard_tokens");
    setTokens(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tokens,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
