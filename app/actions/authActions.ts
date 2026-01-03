// app/actions/authActions.ts
"use server";

import mongoose from "mongoose";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export interface RegisterState {
  error?: string;
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

  let success = false;

  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    const existingUser = await User.findOne({
      $or: [{ email: data.email }, { phone: data.phone }],
    });

    if (existingUser) {
      return { error: "Email or phone already registered" };
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const addresses = [{ type: "home", address: data.homeAddress } as const];
    if (data.workAddress) addresses.push({ type: "work", address: data.workAddress });
    if (data.courierAddress) addresses.push({ type: "courier", address: data.courierAddress });

    await User.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
      role: "buyer",
      addresses,
    });

    success = true; // Only set if everything worked
  } catch (error: unknown) {
    console.error("Registration error:", error);

    if (error && typeof error === "object" && "code" in error && (error as any).code === 11000) {
      return { error: "Email or phone already exists" };
    }

    return { error: "Registration failed. Please try again later." };
  }

  // Redirect ONLY on success (outside try/catch)
  if (success) {
    redirect("/login?registered=true");
  }

  // Fallback (should never reach here)
  return { error: "Unexpected error" };
}