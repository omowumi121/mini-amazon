"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/login"); // redirect if not admin
    }
  }, [user, router]);

  if (!user || !user.isAdmin) return null; // optional loader

  return <>{children}</>;
}
