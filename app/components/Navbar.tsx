// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { HiShoppingCart } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const logoUrl = "https://i.imgur.com/RRI2tEI.png";

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
          <div className="hidden sm:block">
            <span className="font-bold text-primary">Hamid</span>
            <span className="text-secondary"> Mill</span>
          </div>
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/" className="text-lg font-medium">Home</Link></li>
          <li><Link href="/products" className="text-lg font-medium">Products</Link></li>
          <li><Link href="/about" className="text-lg font-medium">About</Link></li>
          <li><Link href="/contact" className="text-lg font-medium">Contact</Link></li>
        </ul>
      </div>

      {/* Right: Cart + Auth */}
      <div className="navbar-end gap-4">
        {/* Cart Icon */}
        <button className="btn btn-ghost btn-circle relative">
          <HiShoppingCart size={28} />
          <div className="badge badge-primary badge-sm absolute -top-1 -right-1">0</div>
        </button>

        {/* Auth Section */}
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
              {/* Admin Dashboard - only for admins */}
              {user.role === "admin" && (
                <li>
                  <Link href="/admin">Admin Dashboard</Link>
                </li>
              )}
              
              {/* My Account - for all logged-in users */}
              <li>
                <Link href="/account">My Account</Link>
              </li>

              {/* Logout */}
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