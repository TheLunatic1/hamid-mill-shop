// app/register/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Register | Hamid Oil Flour and Dal Mill",
};

export default function RegisterPage() {
  const logoUrl = "https://i.imgur.com/RRI2tEI.png";

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100">
        <div className="card-body">
          {/* Logo + Title */}
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

          {/* Register Form */}
          <form className="space-y-6">
            {/* Name, Email, Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* 3 Addresses */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Delivery Addresses</h3>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">1. Home Address <span className="text-sm font-normal">(Primary)</span></span>
                </label>
                <textarea
                  placeholder="House no., street, area..."
                  className="textarea textarea-bordered w-full h-24"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">2. Work / Office Address</span>
                </label>
                <textarea
                  placeholder="Office building, floor, landmark..."
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">3. Nearby Courier Point <span className="text-sm font-normal">(e.g., local shop)</span></span>
                </label>
                <textarea
                  placeholder="Name of shop, location, contact if any..."
                  className="textarea textarea-bordered w-full h-24"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary btn-lg w-full">
              Create Account
            </button>
          </form>

          {/* Divider + Login Link */}
          <div className="divider my-8">OR</div>
          <p className="text-center text-base-content/70">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-medium">
              Login here
            </Link>
          </p>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link href="/" className="link link-secondary">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}