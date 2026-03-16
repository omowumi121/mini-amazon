// "use client"

// import { createContext, useContext, useEffect, useState } from "react"

// interface AuthContextType {
//   token: string | null
//   loading: boolean // Added loading state
//   login: (token: string) => void
//   logout: () => void
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [token, setToken] = useState<string | null>(null)
//   const [loading, setLoading] = useState(true) // Start as true

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token")
//     if (storedToken) {
//       setToken(storedToken)
//     }
//     setLoading(false) // Check is complete
//   }, [])

//   const login = (newToken: string) => {
//     localStorage.setItem("token", newToken)
//     setToken(newToken)
//   }

//   const logout = () => {
//     localStorage.removeItem("token")
//     setToken(null)
//   }

//   return (
//     <AuthContext.Provider value={{ token, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error("useAuth must be used within AuthProvider")
//   }
//   return context
// }



"use client"

import { createContext, useContext, useEffect, useState } from "react"

// 1. Define the User interface
interface User {
  name?: string;
  email?: string;
  is_admin: boolean;
}

interface AuthContextType {
  token: string | null;
  user: User | null; // Added user state
  loading: boolean;
  login: (token: string, userData?: User) => void; // Updated to accept user data
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null) // Added user state
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken) {
      setToken(storedToken)
    }
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user", error)
      }
    }

    setLoading(false)
  }, [])

  // 2. Updated login to handle both token and the user object
  const login = (newToken: string, userData?: User) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user") // Clear user data on logout
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
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