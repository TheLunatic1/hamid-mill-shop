import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

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
    url: "https://hamid-mill-shop.vercel.app/",
    siteName: "Hamid Oil Flour and Dal Mill",
    images: [
      {
        url: "https://i.imgur.com/RRI2tEI.png",
        width: 1200,
        height: 675,   // fits the oval badge shape
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

  // Favicon using external logo
  icons: {
    icon: "https://i.imgur.com/RRI2tEI.png",
    shortcut: "https://i.imgur.com/RRI2tEI.png",
    apple: "https://i.imgur.com/RRI2tEI.png",
  },

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
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}