"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface User {
  email: string;
  password?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const register = (email: string, password: string) => {
    // For demo, new users are not admin
    setUser({ email, password, isAdmin: false });
    return true;
  };

  const login = (email: string, password: string) => {
    // Dummy admin login
    if (email === "admin@mini.com") {
      setUser({ email, isAdmin: true });
      return true;
    }
    // Dummy normal user login
    setUser({ email, password, isAdmin: false });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
