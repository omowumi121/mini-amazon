"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { loginUser, registerUser } from "@/lib/api";

interface User {
  email: string;
  isAdmin: boolean;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ========================= */
  /* Persist User On Reload    */
  /* ========================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* ========================= */
  /* LOGIN                     */
  /* ========================= */
  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);

      const newUser: User = {
        email: data.email,
        isAdmin: data.email === "admin@mini.com",
        token: data.token,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  /* ========================= */
  /* REGISTER                  */
  /* ========================= */
  const register = async (email: string, password: string) => {
    try {
      const data = await registerUser(email, password);

      const newUser: User = {
        email: data.email,
        isAdmin: false,
        token: data.token,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));

      return true;
    } catch (error) {
      console.error("Register failed:", error);
      return false;
    }
  };

  /* ========================= */
  /* LOGOUT                    */
  /* ========================= */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
