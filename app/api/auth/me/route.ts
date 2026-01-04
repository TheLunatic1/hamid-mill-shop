// app/api/auth/me/route.ts
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  console.log("API /me - Token received:", token ? "Yes (length: " + token.length + ")" : "No");  // ← Debug log

  if (!token) {
    console.log("API /me - No token → 401");  // ← Debug
    return Response.json({ user: null }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    console.log("API /me - Token verified successfully for user:", payload.email);  // ← Debug

    const user = {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      phone: payload.phone as string,
      role: payload.role as "buyer" | "admin",
    };

    return Response.json({ user });
  } catch (error) {
    console.error("API /me - Token verification failed:", error);  // ← Debug
    return Response.json({ user: null }, { status: 401 });
  }
}