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
  openGraph: {
    title: "Gigi's Concept — Your Event. Our Lens. Timeless.",
    description: "Luxury content creation & photo booth services in Dallas, Texas. Weddings, events, brand shoots.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gigi's Concept — Your Event. Our Lens. Timeless." }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigi's Concept — Your Event. Our Lens. Timeless.",
    description: "Luxury content creation & photo booth services in Dallas, Texas.",
    images: ["/og-image.png"],
  },
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
