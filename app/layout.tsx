import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Hamid Oil Flour and Dal Mill",
    template: "%s | Hamid Oil Flour and Dal Mill",
  },
  description: "Premium quality cooking oil, flour, dal and grain products directly from Hamid Mill",
  keywords: ["hamid mill", "cooking oil", "flour", "dal", "mustard oil", "atta", "premium grains"],
  authors: [{ name: "Hamid Oil Flour and Dal Mill" }],
  creator: "Hamid Oil Flour and Dal Mill",
  publisher: "Hamid Oil Flour and Dal Mill",

  openGraph: {
    title: "Hamid Oil Flour and Dal Mill",
    description: "Premium quality oil, flour, and dal products",
    url: "https://hamid-mill-shop.vercel.app/",
    siteName: "Hamid Oil Flour and Dal Mill",
    images: [
      {
        url: "https://i.imgur.com/RRI2tEI.png",
        width: 1200,
        height: 675,
        alt: "Hamid Oil Flour and Dal Mill Logo - HOFDM",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hamid Oil Flour and Dal Mill",
    description: "Premium quality oil, flour, and dal products",
    images: ["https://i.imgur.com/RRI2tEI.png"],
  },

  icons: {
    icon: "https://i.imgur.com/RRI2tEI.png",
    shortcut: "https://i.imgur.com/RRI2tEI.png",
    apple: "https://i.imgur.com/RRI2tEI.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="hamidlight">
      <body className={inter.className}>
        <CustomCursor />
        <AuthProvider>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}