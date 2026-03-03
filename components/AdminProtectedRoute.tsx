// components/AdminProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push("/login"); // redirect non-admins
    }
  }, [user, router]);

  if (!user || !user.isAdmin) return null; // render nothing until check passes

  return <>{children}</>;
}
