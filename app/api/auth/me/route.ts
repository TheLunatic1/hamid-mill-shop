// app/api/auth/me/route.ts
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return Response.json({ user: null }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const user = {
      id: payload.id as string,
      name: payload.name as string,
      email: payload.email as string,
      phone: payload.phone as string,
      role: payload.role as "buyer" | "admin",
    };

    return Response.json({ user });
  } catch {
    return Response.json({ user: null }, { status: 401 });
  }
}