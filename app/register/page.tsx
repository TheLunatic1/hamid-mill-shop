// app/register/page.tsx
import { Metadata } from "next";
import RegisterForm from "./RegisterForm";
import AuthRedirect from "@/components/AuthRedirect";

export const metadata: Metadata = {
  title: "Register | Hamid Oil Flour and Dal Mill",
};

export default function RegisterPage() {
  return (
  <>
    <AuthRedirect to="/" />  {/* Or /account */}
    <RegisterForm />
  </>
);
}