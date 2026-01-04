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
    // Extract Vercel protection token from document.cookie (it's not httpOnly)
    const vercelJwtMatch = document.cookie.match(/_vercel_jwt=([^;]+)/);
    const vercelJwt = vercelJwtMatch ? vercelJwtMatch[1] : null;

    const headers = new Headers();
    headers.append("credentials", "include"); // Ensure browser sends cookies

    if (vercelJwt) {
      headers.append("Authorization", `Bearer ${vercelJwt}`);
    }

    const res = await fetch("/api/auth/me", {
      credentials: "include",
      cache: "no-store",
      headers,
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      setUser(null);
    }
  } catch (err) {
    console.error("Auth check failed:", err);
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