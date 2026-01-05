// app/actions/authActions.ts
"use server";

import mongoose from "mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import { SignJWT } from "jose";
import { cookies } from "next/headers";

export interface RegisterState {
  error?: string;
}

export interface LoginState {
  error?: string;
  success?: boolean;
}

// Helper to create and set JWT cookie
async function setAuthCookie(user: {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  role: "buyer" | "admin";
}) {
  const payload = {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
  };

  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!);
  const alg = "HS256";

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set("auth_token", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function registerAction(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const data = {
    name: formData.get("name") as string,
    email: (formData.get("email") as string)?.toLowerCase() ?? "",
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    homeAddress: formData.get("homeAddress") as string,
    workAddress: (formData.get("workAddress") as string) || undefined,
    courierAddress: (formData.get("courierAddress") as string) || undefined,
  };

  // Validation
  if (!data.name || !data.email || !data.phone || !data.password || !data.homeAddress) {
    return { error: "Please fill all required fields" };
  }
  if (data.password !== data.confirmPassword) {
    return { error: "Passwords do not match" };
  }
  if (data.password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (existingUser) {
      return { error: "Email or phone already registered" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const addresses: { type: "home" | "work" | "courier"; address: string }[] = [
      { type: "home", address: data.homeAddress },
    ];

    if (data.workAddress) addresses.push({ type: "work", address: data.workAddress });
    if (data.courierAddress) addresses.push({ type: "courier", address: data.courierAddress });

    const newUser = await User.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: "buyer",
      addresses,
    });

    await setAuthCookie(newUser);
    redirect("/");
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Registration failed. Please try again." };
  }
}

export async function loginAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  if (!identifier || !password) {
    return { error: "Please enter email/phone and password" };
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }],
    });

    if (!user) {
      return { error: "Invalid credentials" };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return { error: "Invalid credentials" };
    }

    await setAuthCookie(user);
    redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Login failed. Please try again." };
  }
}

export async function logoutAction() {
  "use server";

  const cookieStore = await cookies();
  cookieStore.delete("auth_token");

  redirect("/");
}