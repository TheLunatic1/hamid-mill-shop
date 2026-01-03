// app/register/page.tsx
import { Metadata } from "next";
import RegisterForm from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register | Hamid Oil Flour and Dal Mill",
};

export default function RegisterPage() {
  return <RegisterForm />;
}