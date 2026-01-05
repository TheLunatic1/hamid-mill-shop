// app/api/auth/me/route.ts
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  console.log("=== /api/auth/me called ===");
  console.log("Token present:", !!token);
  console.log("Token length:", token ? token.length : 0);
  console.log("Token preview:", token ? token.substring(0, 50) + "..." : "none");
  console.log("NEXTAUTH_SECRET present:", !!process.env.NEXTAUTH_SECRET);

  if (!token) {
    return Response.json({ error: "No token" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    console.log("Token verified successfully");
    console.log("Payload:", payload);

    const user = {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      phone: payload.phone as string,
      role: payload.role as "buyer" | "admin",
    };

    return Response.json({ user });
  } catch (error) {
    console.error("JWT verification failed:", error);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}