// app/login/page.tsx
import { Metadata } from "next";
import LoginForm from "./LoginForm";
import AuthRedirect from "@/components/AuthRedirect";

export const metadata: Metadata = {
  title: "Login | Hamid Oil Flour and Dal Mill",
};

export default function LoginPage() {
  return (
  <>
    <AuthRedirect to="/account" />  {/* Redirect logged-in users */}
    <LoginForm />
  </>
);
}