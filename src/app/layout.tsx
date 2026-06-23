import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Great_Vibes } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gigi's Concept | Content Creation & Luxury Photo Booth — Dallas TX",
  description:
    "Editorial content and a timeless photo-booth experience in Dallas, Texas — quietly crafted, beautifully delivered. Weddings, events, brand shoots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dancing.variable} ${greatVibes.variable}`}>
      <head>
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas" />
      </head>
      <body className="min-h-screen flex flex-col font-serif antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
