"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, password);
    router.push("/"); // redirect to home
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="w-full max-w-sm p-6 border rounded-md shadow-md flex flex-col gap-4" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
          Register
        </button>
      </form>
    </div>
  );
}
