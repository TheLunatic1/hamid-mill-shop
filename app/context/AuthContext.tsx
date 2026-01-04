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
  console.log("AuthContext - Starting auth check");  // ← Debug

  try {
    const res = await fetch("/api/auth/me", { 
      credentials: "include",
      cache: "no-store",
    });

    console.log("AuthContext - /api/auth/me status:", res.status);  // ← Debug

    if (res.ok) {
      const data = await res.json();
      console.log("AuthContext - User fetched:", data.user?.name || "No user");  // ← Debug
      setUser(data.user);
    } else {
      console.log("AuthContext - Auth failed (401 or other)");  // ← Debug
      setUser(null);
    }
  } catch (err) {
    console.error("AuthContext - Fetch error:", err);  // ← Debug
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