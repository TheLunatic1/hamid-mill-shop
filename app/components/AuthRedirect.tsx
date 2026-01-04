// app/components/AuthRedirect.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRedirect({ to = "/account" }: { to?: string }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(to);
    }
  }, [user, loading, router, to]);

  // Show nothing or a subtle loader while checking
  if (loading || user) return null;

  return null;
}