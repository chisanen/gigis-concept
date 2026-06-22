import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "@/lib/payload";
import { RichText } from "@payloadcms/richtext-lexical/react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getPayload();
  const posts = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  const post = posts.docs[0];
  if (!post) return { title: "Not Found" };

  const image =
    post.featuredImage && typeof post.featuredImage === "object"
      ? post.featuredImage.url
      : undefined;

  return {
    title: `${post.title} | Gigi's Concept Blog — Dallas TX`,
    description: post.excerpt || `${post.title} — wedding and event tips from Gigi's Concept, Dallas Texas.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      type: "article",
      images: image ? [image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload();
  const posts = await payload.find({
    collection: "blog-posts",
    where: { slug: { equals: slug }, _status: { equals: "published" } },
    limit: 1,
  });

  const post = posts.docs[0];
  if (!post) notFound();

  const image =
    post.featuredImage && typeof post.featuredImage === "object"
      ? post.featuredImage
      : null;

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: image?.url,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: post.author || "Gigi" },
    publisher: {
      "@type": "Organization",
      name: "Gigi's Concept",
      url: "https://gigisconcept.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Link
              href="/blog"
              className="text-[10px] tracking-[0.3em] text-brand-500 uppercase hover:text-brand-700 transition-colors"
            >
              &larr; Back to Blog
            </Link>
            <p className="text-[10px] tracking-[0.2em] text-brand-500 uppercase mt-6 mb-4">
              {post.category?.replace("-", " ")}
            </p>
            <h1 className="font-script text-4xl md:text-5xl text-brand-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-[13px] text-brand-500">
              By {post.author || "Gigi"} &middot;{" "}
              {post.publishedDate
                ? new Date(post.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>
          </div>

          {/* Featured image */}
          {image?.url && (
            <div className="relative aspect-[16/9] overflow-hidden mb-12">
              <Image
                src={image.url}
                alt={image.alt || post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none text-brand-900 leading-[2]">
            {post.content && <RichText data={post.content} />}
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-brand-200 text-center">
            <p className="font-script text-3xl text-brand-900 mb-4">
              Ready to create something timeless?
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brand-900 text-white px-10 py-3.5 text-[10px] tracking-[0.25em] hover:bg-brand-700 transition-colors"
            >
              GET YOUR QUOTE
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
