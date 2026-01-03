// app/register/RegisterForm.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { registerAction, RegisterState } from "@/actions/authActions";
import { useActionState } from "react";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState<RegisterState, FormData>(
    registerAction,
    { error: undefined }
  );

  const logoUrl = "https://i.imgur.com/RRI2tEI.png";

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
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
            <h1 className="text-3xl font-bold text-primary">Create Account</h1>
            <p className="text-base-content/70 mt-2">
              Join Hamid Oil Flour and Dal Mill for fresh, quality products
            </p>
          </div>

          {/* Error Alert */}
          {state?.error && (
            <div className="alert alert-error shadow-lg mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{state.error}</span>
            </div>
          )}

          <form action={formAction} className="space-y-6">
            {/* All fields exactly as before */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Full Name *</span></label>
                <input name="name" type="text" placeholder="John Doe" className="input input-bordered w-full" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Email *</span></label>
                <input name="email" type="email" placeholder="you@example.com" className="input input-bordered w-full" required />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label"><span className="label-text font-medium">Phone Number *</span></label>
                <input name="phone" type="tel" placeholder="+91 98765 43210" className="input input-bordered w-full" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Password *</span></label>
                <input name="password" type="password" className="input input-bordered w-full" required minLength={6} />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-medium">Confirm Password *</span></label>
                <input name="confirmPassword" type="password" className="input input-bordered w-full" required />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Delivery Addresses</h3>
              <div className="form-control">
                <label className="label"><span className="label-text">1. Home Address * <span className="text-sm font-normal">(Primary)</span></span></label>
                <textarea name="homeAddress" placeholder="House no., street, area..." className="textarea textarea-bordered w-full h-24" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">2. Work / Office Address <span className="text-sm font-normal">(Optional)</span></span></label>
                <textarea name="workAddress" placeholder="Office building, floor, landmark..." className="textarea textarea-bordered w-full h-24" />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text">3. Nearby Courier Point <span className="text-sm font-normal">(Optional)</span></span></label>
                <textarea name="courierAddress" placeholder="Name of shop, location..." className="textarea textarea-bordered w-full h-24" />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isPending}>
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="divider my-8">OR</div>
          <p className="text-center text-base-content/70">
            Already have an account? <Link href="/login" className="link link-primary font-medium">Login here</Link>
          </p>
          <div className="mt-6 text-center">
            <Link href="/" className="link link-secondary">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}