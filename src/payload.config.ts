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
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — Gigi's Concept Admin",
    },
  },
  collections: [Users, Media, Pages, BlogPosts, GalleryImages, Testimonials, Inquiries],
  globals: [SiteSettings],
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
