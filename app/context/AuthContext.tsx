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
    // Manually read and forward ALL cookies (including _vercel_jwt if protection is on)
    const cookieString = document.cookie;
    const headers = new Headers();
    if (cookieString) {
      headers.append("Cookie", cookieString);
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
    console.error("Auth check error:", err);
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