"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://go-ecommerce-d46r.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      console.log("Registered:", data);
      router.push("/login");

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border rounded-md shadow-md flex flex-col gap-4 bg-white"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

        {error && <p className="text-red-500">{error}</p>}

        {/* NAME */}
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />

        {/* EMAIL */}
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
