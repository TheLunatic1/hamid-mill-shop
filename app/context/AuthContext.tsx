// app/context/AuthContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType } from "@/types/auth";
import { logoutAction } from "@/actions/authActions";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
  try {
    const vercelJwt = document.cookie
      .split('; ')
      .find(row => row.startsWith('_vercel_jwt='))
      ?.split('=')[1];

    const headers = new Headers();
    headers.append('Cookie', document.cookie);  // Send all cookies
    if (vercelJwt) {
      headers.append('Authorization', `Bearer ${vercelJwt}`);  // Some cases need this
    }

    const res = await fetch("/api/auth/me", { 
      credentials: "include",
      cache: "no-store",
      headers,
    });
    // ... rest unchanged
  } catch {
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  // Initial check
  useEffect(() => {
    verifyToken();
  }, []);

  // Re-check when page becomes visible (after login redirect)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        verifyToken();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", verifyToken);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", verifyToken);
    };
  }, []);

  const logout = async () => {
    await logoutAction();
    setUser(null); // Immediate UI update
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}