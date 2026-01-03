// app/login/page.tsx
import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login | Hamid Oil Flour and Dal Mill",
};

export default function LoginPage() {
  return <LoginForm />;
}