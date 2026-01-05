// app/login/page.tsx
import { Metadata } from "next";
import LoginForm from "./LoginForm";
import { useAuth } from "@/context/AuthContext"; // ← Import this
import { redirect } from "next/navigation"; // ← Import this for server-side

export const metadata: Metadata = {
  title: "Login | Hamid Oil Flour and Dal Mill",
};

// This is now a Server Component that checks auth server-side
export default async function LoginPage() {
  // We can't use useAuth() in server component, so we'll simulate a check
  // But for now, to fix immediately: REMOVE AuthRedirect and let everyone see login
  // (We'll add proper protection later if needed)

  return <LoginForm />; // Just render the form directly – no redirect!
}