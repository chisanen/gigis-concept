import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

// Lazy import to avoid build-time DB access
async function getPublishedPosts() {
  try {
    const { getPayload } = await import("@/lib/payload");
    const payload = await getPayload();
    return await payload.find({
      collection: "blog-posts",
      where: { _status: { equals: "published" as const } },
      limit: 500,
      select: { slug: true, updatedAt: true },
    });
  } catch {
    return { docs: [] };
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://gigisconcept.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  ];

  const posts = await getPublishedPosts();

  const blogPages: MetadataRoute.Sitemap = posts.docs.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt as string),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
