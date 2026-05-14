import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "@/components/ui/Toast";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { MagneticEffect } from "@/components/MagneticEffect";
import "./globals.css";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"]
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "600"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robbers-mewen.vercel.app"),
  title: {
    default: "Robbers Mewen — Premium Perfumes & Leather Goods",
    template: "%s | Robbers Mewen",
  },
  description: "Shop luxury perfumes and handcrafted leather goods. Arabic perfumes, French fragrances, wallets, belts, and more. Crafted with bold elegance.",
  keywords: ["perfume", "leather goods", "luxury brand", "arabic perfume", "french perfume", "wallets", "belts", "ittar", "body spray", "Robbers Mewen"],
  authors: [{ name: "Robbers Mewen" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Robbers Mewen",
    title: "Robbers Mewen — Premium Perfumes & Leather Goods",
    description: "Shop luxury perfumes and handcrafted leather goods. Crafted with bold elegance for those who demand more.",
    images: [{ url: "/og-image.jpg", width: 1080, height: 1080, alt: "Robbers Mewen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robbers Mewen — Premium Perfumes & Leather Goods",
    description: "Shop luxury perfumes and handcrafted leather goods. Crafted with bold elegance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fafafa" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable} ${displayFont.variable}`}>
        {children}
        <MagneticEffect />
        <ToastContainer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
