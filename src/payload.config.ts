import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { BlogPosts } from "./collections/BlogPosts";
import { GalleryImages } from "./collections/GalleryImages";
import { Testimonials } from "./collections/Testimonials";
import { Inquiries } from "./collections/Inquiries";
import { Users } from "./collections/Users";
import { Customers } from "./collections/Customers";
import { Consultations } from "./collections/Consultations";
import { Leads } from "./collections/Leads";
import { Bookings } from "./collections/Bookings";
import { Packages } from "./collections/Packages";
import { AddOns } from "./collections/AddOns";
import { Quotes } from "./collections/Quotes";
import { Contracts } from "./collections/Contracts";
import { Invoices } from "./collections/Invoices";
import { Tasks } from "./collections/Tasks";
import { Team } from "./collections/Team";
import { Equipment } from "./collections/Equipment";
import { EmailTemplates } from "./collections/EmailTemplates";
import { DiscountCodes } from "./collections/DiscountCodes";
import { Popups } from "./collections/Popups";
import { ContractTemplates } from "./collections/ContractTemplates";
import { Automations } from "./collections/Automations";
import { Broadcasts } from "./collections/Broadcasts";
import { Questionnaires } from "./collections/Questionnaires";
import { QuestionnaireResponses } from "./collections/QuestionnaireResponses";
import { ActivityLog } from "./collections/ActivityLog";
import { SiteSettings } from "./globals/SiteSettings";
import { Navigation } from "./globals/Navigation";
import { ServiceArea } from "./globals/ServiceArea";
import { AvailabilityRules } from "./globals/AvailabilityRules";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    meta: {
      titleSuffix: " — Gigi's Concept Studio",
    },
    components: {
      beforeNavLinks: ["@/components/admin/NavLinks#NavLinks"],
      afterDashboard: [
        "@/components/admin/Dashboard#StudioDashboard",
        "@/components/admin/Calendar#StudioCalendar",
        "@/components/admin/LeadsCRM#LeadsCRM",
        "@/components/admin/Reports#StudioReports",
        "@/components/admin/QuoteBuilder#QuoteBuilder",
        "@/components/admin/AIImageGallery#AIImageGallery",
        "@/components/admin/PageBuilder#PageBuilder",
        "@/components/admin/GalleryManager#GalleryManager",
      ],
    },
    livePreview: {
      url: ({ data }) => {
        const slug = (data as Record<string, unknown>)?.slug as string || '';
        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        if (slug === 'home' || !slug) return baseUrl;
        return `${baseUrl}/${slug}`;
      },
      collections: ['pages'],
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    // Website
    Pages,
    BlogPosts,
    Media,
    GalleryImages,
    Testimonials,
    Popups,
    DiscountCodes,
    // Studio
    Leads,
    Bookings,
    Inquiries,
    Packages,
    AddOns,
    Quotes,
    Contracts,
    Invoices,
    Tasks,
    Customers,
    Consultations,
    // Operations
    Team,
    Equipment,
    EmailTemplates,
    Automations,
    Broadcasts,
    ContractTemplates,
    Questionnaires,
    QuestionnaireResponses,
    ActivityLog,
    // Settings
    Users,
  ],
  globals: [SiteSettings, Navigation, ServiceArea, AvailabilityRules],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "default-secret-change-me",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
    push: true,
  }),
  plugins: [
    seoPlugin({
      collections: ["pages", "blog-posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }: { doc: Record<string, unknown> }) =>
        `${doc?.title || "Page"} | Gigi's Concept — Dallas TX`,
      generateDescription: ({ doc }: { doc: Record<string, unknown> }) =>
        (doc?.excerpt as string) || "Luxury content creation & photo booth services in Dallas, Texas.",
    }),
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
