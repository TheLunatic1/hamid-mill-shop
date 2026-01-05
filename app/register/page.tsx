// app/register/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import RegisterForm from "./RegisterForm";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const metadata: Metadata = {
  title: "Register | Hamid Oil Flour and Dal Mill",
};

async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return { id: payload.id as string };
  } catch {
    return null;
  }
}

export default async function RegisterPage() {
  const user = await getUserFromCookie();

  if (user) {
    redirect("/account");
  }

  return <RegisterForm />;
}