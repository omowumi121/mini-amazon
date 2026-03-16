"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast"; // Recommended for better UX

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Specify the response structure so TypeScript knows about 'user'
      const data = await apiRequest<{ token: string; user: any }>("/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      
      if (data.token) {
        // 2. CRITICAL FIX: Pass both the token AND the user object
        // This ensures the Navbar knows if is_admin is true
        login(data.token, data.user); 
        
        toast.success("Login successful!");
        router.push("/products");
      }
    } catch (err: any) {
      // Use toast instead of alert for a cleaner look
      toast.error(err.message || "Invalid email or password");
      console.error("Login Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            placeholder="example@mail.com" 
            required
            className="w-full rounded border border-gray-300 p-2 text-black focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            required
            className="w-full rounded border border-gray-300 p-2 text-black focus:ring-2 focus:ring-orange-500 outline-none transition-all"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button 
          disabled={loading}
          className="w-full rounded bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600 disabled:bg-gray-400 transition-colors shadow-sm mt-2"
        >
          {loading ? "Verifying..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600 pt-2">
          New user? <Link href="/register" className="text-orange-600 font-medium hover:underline">Register here</Link>
        </p>
      </form>
    </div>
  );
}