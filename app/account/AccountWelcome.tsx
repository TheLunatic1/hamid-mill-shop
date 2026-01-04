// app/account/AccountWelcome.tsx
"use client";

import { useAuth } from "@/context/AuthContext";

export default function AccountWelcome() {
  const { user } = useAuth();

  return (
    <h1 className="text-4xl font-bold text-primary mb-8">
      Welcome back, {user?.name || "User"}!
    </h1>
  );
}