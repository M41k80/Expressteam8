"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Simula persistencia en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("mockUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (username: string, _password: string) => {
    // Simulación de login exitoso
    const fakeUser = { username };
    localStorage.setItem("mockUser", JSON.stringify(fakeUser));
    setUser(fakeUser);
    router.push("/dashboard");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const register = async (username: string, password: string) => {
    // Simulación de registro exitoso
    const fakeUser = { username };
    localStorage.setItem("mockUser", JSON.stringify(fakeUser));
    setUser(fakeUser);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("mockUser");
    setUser(null);
    router.push("/auth/login");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  }
  return context;
};