// app/login/page.tsx
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Login | Hamid Oil Flour and Dal Mill",
};

export default function LoginPage() {
  const logoUrl = "https://i.imgur.com/RRI2tEI.png";

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
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
            <h1 className="text-3xl font-bold text-primary">Welcome Back</h1>
            <p className="text-base-content/70 mt-2">
              Login to your Hamid Mill account
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email or Phone</span>
              </label>
              <input
                type="text"
                placeholder="your@email.com or +91XXXXXXXXXX"
                className="input input-bordered w-full"
                required
              />
            </div>

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
              <label className="label justify-end">
                <a href="#" className="label-text-alt link link-primary">
                  Forgot password?
                </a>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-8">OR</div>

          {/* Register Link */}
          <p className="text-center text-base-content/70">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="link link-primary font-medium">
              Register here
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