import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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

  // Open Graph / Social Media
  openGraph: {
    title: "Hamid Oil Flour and Dal Mill",
    description: "Premium quality oil, flour, and dal products",
    url: "https://hamid-mill-shop.vercel.app", // we'll update this after deploy
    siteName: "Hamid Oil Flour and Dal Mill",
    images: [
      {
        url: "https://hamid-mill-shop.vercel.app/logo.JPG",           // https://your-site.vercel.app/logo.JPG
        width: 1200,
        height: 630,
        alt: "Hamid Oil Flour and Dal Mill Logo",
      },
      {
        url: "https://hamid-mill-shop.vercel.app/logo.PNG",
        width: 800,
        height: 800,
        alt: "Hamid Oil Flour and Dal Mill Logo Square",
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
    images: ["/logo.JPG"],
  },

  // Favicon
  icons: {
    icon: "/logo.PNG",
    shortcut: "/logo.PNG",
    apple: "/logo.PNG",
  },

  // Theme color (optional - matches our primary green)
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}