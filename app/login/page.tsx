// app/login/page.tsx
import { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export const metadata: Metadata = {
  title: "Login | Hamid Oil Flour and Dal Mill",
};

async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) return null;

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    return { id: payload.id as string }; // minimal – enough to know logged in
  } catch {
    return null;
  }
}

export default async function LoginPage() {
  const user = await getUserFromCookie();

  // If already logged in → redirect to account
  if (user) {
    redirect("/account");
  }

  return <LoginForm />;
}