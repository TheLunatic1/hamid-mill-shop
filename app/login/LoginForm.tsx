// app/login/LoginForm.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { loginAction, LoginState } from "@/actions/authActions";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [state, formAction, isPending] = useFormState<LoginState, FormData>(
    loginAction,
    { error: undefined }
  );

  const logoUrl = "https://i.imgur.com/RRI2tEI.png";

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <div className="text-center mb-8">
            <Image
              src={logoUrl}
              alt="Hamid Mill Logo"
              width={80}
              height={80}
              className="mx-auto mb-4 object-contain"
              priority
            />
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="text-base-content/70 mt-2">Login to your account</p>
          </div>

          {state?.error && (
            <div className="alert alert-error shadow-lg mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{state.error}</span>
            </div>
          )}

          <form action={formAction} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email or Phone</span>
              </label>
              <input
                name="identifier"
                type="text"
                placeholder="you@example.com or +91XXXXXXXXXX"
                className="input input-bordered w-full"
                required
                disabled={isPending}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                required
                disabled={isPending}
              />
              <label className="label justify-end">
                <a href="#" className="label-text-alt link link-primary">Forgot password?</a>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg"
              disabled={isPending}
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="divider my-8">OR</div>
          <p className="text-center text-base-content/70">
            New customer? <Link href="/register" className="link link-primary font-medium">Create account</Link>
          </p>
          <div className="mt-6 text-center">
            <Link href="/" className="link link-secondary">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}