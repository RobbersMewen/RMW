import type { Metadata } from "next";
import { Bodoni_Moda, Plus_Jakarta_Sans } from "next/font/google";
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
  title: "Robbers Mewen — Luxury Lifestyle Brand",
  description:
    "Shop premium perfumes, clothes, footwear, and leather goods. Crafted with bold elegance for those who demand more."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
