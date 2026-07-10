import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Great_Vibes } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupManager } from "@/components/PopupManager";
import { getPayload } from "@/lib/payload";
import { getMediaUrl } from "@/lib/render-blocks";

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
  title: "Gigi's Concept | Content Creation & Luxury Photo Booth | Dallas TX",
  description:
    "Editorial content and a timeless photo-booth experience in Dallas, Texas. Quietly crafted, beautifully delivered. Weddings, events, brand shoots.",
  openGraph: {
    title: "Gigi's Concept | Your Event. Our Lens. Timeless.",
    description: "Luxury content creation & photo booth services in Dallas, Texas. Weddings, events, brand shoots.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Gigi's Concept | Your Event. Our Lens. Timeless." }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gigi's Concept | Your Event. Our Lens. Timeless.",
    description: "Luxury content creation & photo booth services in Dallas, Texas.",
    images: ["/og-image.png"],
  },
};

async function getLayoutData() {
  try {
    const payload = await getPayload();
    const [nav, settings] = await Promise.all([
      payload.findGlobal({ slug: "navigation" }),
      payload.findGlobal({ slug: "site-settings" }),
    ]);
    return { nav, settings };
  } catch {
    return { nav: null, settings: null };
  }
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { nav, settings } = await getLayoutData();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const n = nav as Record<string, any> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const s = settings as Record<string, any> | null;

  // Build nav links from CMS
  const headerLinks = (n?.headerLinks as { label: string; href: string; visible?: boolean; sortOrder?: number }[] | undefined)
    ?.filter(l => l.visible !== false)
    ?.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    ?.map(l => ({ href: l.href, label: l.label }));

  const footerLinks = (n?.footerLinks as { label: string; href: string; visible?: boolean; sortOrder?: number }[] | undefined)
    ?.filter(l => l.visible !== false)
    ?.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    ?.map(l => ({ href: l.href, label: l.label }));

  const logoUrl = getMediaUrl(n?.logo) || undefined;

  return (
    <html lang="en" className={`${cormorant.variable} ${dancing.variable} ${greatVibes.variable}`}>
      <head>
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dallas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col font-serif antialiased overflow-x-hidden">
        <Navbar
          links={headerLinks}
          logoUrl={logoUrl}
          ctaLabel={n?.ctaLabel || undefined}
          ctaHref={n?.ctaHref || undefined}
          mobileCta={n?.mobileCta || undefined}
          mobileCtaHref={n?.mobileCtaHref || undefined}
          contactEmail={s?.contactEmail || undefined}
          phone={s?.phone || undefined}
        />
        <main className="flex-1">{children}</main>
        <Footer
          links={footerLinks}
          logoUrl={logoUrl}
          tagline={s?.tagline || undefined}
          contactEmail={s?.contactEmail || undefined}
          instagramUrl={s?.instagramUrl || undefined}
          tiktokUrl={s?.tiktokUrl || undefined}
        />
        <PopupManager />
      </body>
    </html>
  );
}
