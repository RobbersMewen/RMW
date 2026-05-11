import type { Metadata } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "@/components/ui/Toast";
import "./globals.css";

const headingFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"]
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
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
        <meta name="theme-color" content="#060d14" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
