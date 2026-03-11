"use client"

import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  token: string | null
  loading: boolean // Added loading state
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true) // Start as true

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
    }
    setLoading(false) // Check is complete
  }, [])

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}