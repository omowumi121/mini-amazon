// src/app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "../../lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiRequest("/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create Account</h2>
        <input 
          type="text" placeholder="Full Name" required
          className="w-full rounded border p-2 text-black"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input 
          type="email" placeholder="Email Address" required
          className="w-full rounded border p-2 text-black"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type="password" placeholder="Password (min 6 chars)" minLength={6} required
          className="w-full rounded border p-2 text-black"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button 
          disabled={loading}
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <Link href="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </form>
    </div>
  );
}