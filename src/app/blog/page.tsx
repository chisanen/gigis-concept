import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "@/lib/payload";

function getImageUrl(img: unknown): string | null {
  if (!img || typeof img !== "object") return null;
  const media = img as Record<string, unknown>;
  const url = media.url as string | undefined;
  if (!url) return null;
  // If it's a relative Payload URL, make it absolute
  if (url.startsWith("/api/media/file/")) {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
    return `${serverUrl}${url}`;
  }
  return url;
}

export const metadata: Metadata = {
  title: "Blog | Gigi's Concept — Dallas TX Wedding & Event Content",
  description:
    "Tips, guides, and inspiration for weddings, events, photo booths, and content creation in Dallas, Texas.",
};

export const dynamic = "force-dynamic";

const categories = [
  { label: "All", value: "" },
  { label: "Wedding", value: "wedding" },
  { label: "Events", value: "events" },
  { label: "Photo Booth", value: "photo-booth" },
  { label: "Content Creation", value: "content-creation" },
];

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const payload = await getPayload();

  const posts = await payload.find({
    collection: "blog-posts",
    where: {
      _status: { equals: "published" as const },
      ...(category ? { category: { equals: category } } : {}),
    },
    sort: "-publishedDate",
    limit: 20,
  });

  return (
    <>
      <section className="bg-brand-200 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[10px] tracking-[0.5em] text-brand-500 mb-4 uppercase">
            Insights &amp; Inspiration
          </p>
          <h1 className="font-script text-5xl md:text-7xl text-brand-900">Blog</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value ? `/blog?category=${cat.value}` : "/blog"}
                className={`px-5 py-2 text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  (category || "") === cat.value
                    ? "bg-brand-900 text-white"
                    : "bg-brand-100 text-brand-900 hover:bg-brand-200"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Posts grid */}
          {posts.docs.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-script text-3xl text-brand-900 mb-4">Coming Soon</p>
              <p className="text-[14px] text-brand-600">
                New blog posts are on the way. Check back soon for wedding tips,
                event guides, and behind-the-scenes content.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.docs.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/2] overflow-hidden mb-5 bg-brand-200">
                    {(() => {
                      const imgUrl = getImageUrl(post.featuredImage);
                      const alt = post.featuredImage && typeof post.featuredImage === "object"
                        ? (post.featuredImage as Record<string, unknown>).alt as string || post.title
                        : post.title;
                      return imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={alt}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : null;
                    })()}
                  </div>
                  <p className="text-[10px] tracking-[0.2em] text-brand-500 uppercase mb-2">
                    {post.category?.replace("-", " ")}
                  </p>
                  <h2 className="text-xl text-brand-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[13px] text-brand-600 leading-[1.8] line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
