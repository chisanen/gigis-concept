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
    theme: "all",
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
      ],
    },
  },
  collections: [
    Users,
    Media,
    Pages,
    BlogPosts,
    GalleryImages,
    Testimonials,
    Inquiries,
    Leads,
    Bookings,
    Packages,
    AddOns,
    Quotes,
    Contracts,
    Invoices,
    Tasks,
    Team,
    Equipment,
    EmailTemplates,
    DiscountCodes,
    Popups,
    Customers,
    Consultations,
    ContractTemplates,
    Automations,
    Broadcasts,
    Questionnaires,
    QuestionnaireResponses,
    ActivityLog,
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
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
