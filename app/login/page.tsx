// src/app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, AuthResponse } from "@/lib/api";
import { useAuth } from "@/context/AuthContext"; // 1. Import the hook
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // 2. Destructure login from context
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiRequest<AuthResponse>("/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      if (data.token) {
        // 3. Use the context login function
        // This sets localStorage AND updates the global 'token' state
        login(data.token); 
        
        router.push("/products");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center text-black">Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          required
          className="w-full rounded border p-2 text-black focus:ring-2 focus:ring-green-500 outline-none"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          className="w-full rounded border p-2 text-black focus:ring-2 focus:ring-green-500 outline-none"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button 
          disabled={loading}
          className="w-full rounded bg-green-600 py-2 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center text-sm text-gray-600">
          New user? <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
}