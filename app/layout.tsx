// app/layout.tsx
import type { Metadata } from "next";
import type { Viewport } from "next";  // ← Add this import
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

// Keep metadata as before (but without themeColor)
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

  // Open Graph / Social Media
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
      {
        url: "https://i.imgur.com/RRI2tEI.png",
        width: 800,
        height: 800,
        alt: "Hamid Oil Flour and Dal Mill Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Hamid Oil Flour and Dal Mill",
    description: "Premium quality oil, flour, and dal products",
    images: ["https://i.imgur.com/RRI2tEI.png"],
  },

  // Favicon
  icons: {
    icon: "https://i.imgur.com/RRI2tEI.png",
    shortcut: "https://i.imgur.com/RRI2tEI.png",
    apple: "https://i.imgur.com/RRI2tEI.png",
  },
};

// ← New viewport export with themeColor
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
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}