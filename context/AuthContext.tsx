"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface User {
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  register: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    if (email === "admin@mini.com") {
      setUser({ email, isAdmin: true });
      return true;
    } else {
      setUser({ email, isAdmin: false });
      return true;
    }
  };

  const register = (email: string, password: string) => {
    // dummy register logic
    setUser({ email, isAdmin: false });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
