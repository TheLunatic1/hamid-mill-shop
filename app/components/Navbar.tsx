"use client";

import Link from "next/link";
import Image from "next/image";
import { HiShoppingCart, HiSun, HiMoon } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const { cartCount } = useCart();
  const logoUrl = "https://i.imgur.com/RRI2tEI.png";

  // Theme state starts as null → prevents hydration mismatch
  const [theme, setTheme] = useState<"hamidlight" | "hamiddark" | null>(null);

// Load and apply saved theme on client mount (only runs once)
useEffect(() => {
  // Skip on server
  if (typeof window === "undefined") return;

  const savedTheme = localStorage.getItem("theme") as "hamidlight" | "hamiddark" | null;
  const appliedTheme = savedTheme || "hamidlight";

  // Apply theme to DOM (safe synchronization)
  document.documentElement.setAttribute("data-theme", appliedTheme);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  setTheme(appliedTheme); // ← disable warning only here
}, []);
  // Toggle theme (only called on user interaction → safe)
  const toggleTheme = () => {
    if (theme === null) return; // safety during initial mount

    const newTheme = theme === "hamidlight" ? "hamiddark" : "hamidlight";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Don't render interactive parts until theme is ready
  if (theme === null) {
    return (
      <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
        <div className="navbar-start">
          <Link href="/" className="btn btn-ghost text-xl normal-case flex items-center gap-3">
            <Image
              src={logoUrl}
              alt="Hamid Oil Flour and Dal Mill Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
            <div className="hidden sm:block">Hamid Oil Flour and Dal Mill</div>
          </Link>
        </div>
        <div className="navbar-end gap-4">
          {/* Skeleton for cart/auth */}
          <div className="skeleton h-10 w-10 rounded-full"></div>
          <div className="skeleton h-10 w-32 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Left: Logo + Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <AiOutlineMenu size={24} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost text-xl normal-case flex items-center gap-3">
          <Image
            src={logoUrl}
            alt="Hamid Oil Flour and Dal Mill Logo"
            width={48}
            height={48}
            className="object-contain"
            priority
          />
          <div className="hidden sm:block">Hamid Oil Flour and Dal Mill</div>
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Right: Theme + Cart + Auth */}
      <div className="navbar-end gap-2 sm:gap-4">
        {/* Theme Toggle */}
        <button
          className="btn btn-ghost btn-circle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "hamidlight" ? <HiMoon size={20} /> : <HiSun size={20} />}
        </button>

        {/* Cart Icon */}
        <div className="relative">
          <Link href="/cart" className="btn btn-ghost">
            <HiShoppingCart size={24} />
          </Link>
          {cartCount > 0 && (
            <span className="badge badge-primary badge-sm absolute -top-1 -right-1 animate-pulse">
              {cartCount}
            </span>
          )}
        </div>

        {loading ? (
          <div className="skeleton h-10 w-32 rounded-lg"></div>
        ) : user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              Welcome, <span className="font-semibold">{user.name}</span>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-2"
            >
              {user.role === "admin" && (
                <li>
                  <Link href="/admin">Admin Dashboard</Link>
                </li>
              )}
              <li>
                <Link href="/account">My Account</Link>
              </li>
              <li>
                <form action={logout}>
                  <button type="submit" className="w-full text-left">
                    Logout
                  </button>
                </form>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-outline btn-primary">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary hidden sm:inline-flex">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}