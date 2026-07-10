import type { Metadata } from "next";
import { getPayload } from "@/lib/payload";
import { ReviewForm } from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Leave a Review | Gigi's Concept",
  description:
    "Share your experience with Gigi's Concept. Your feedback means the world to us.",
};

export const dynamic = "force-dynamic";

async function getReviewPage() {
  try {
    const payload = await getPayload();
    const result = await payload.find({
      collection: "pages",
      where: { slug: { equals: "review" } },
      limit: 1,
      depth: 1,
    });
    if (result.docs.length > 0) {
      const page = result.docs[0] as Record<string, unknown>;
      const blocks = page.layout as Record<string, unknown>[] | undefined;
      if (blocks) {
        return blocks.find((b) => b.blockType === "reviewForm") || null;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export default async function ReviewPage() {
  const block = await getReviewPage();

  return (
    <ReviewForm
      eyebrow={(block?.eyebrow as string) || undefined}
      heading={(block?.heading as string) || undefined}
      description={(block?.description as string) || undefined}
      successHeading={(block?.successHeading as string) || undefined}
      successMessage={(block?.successMessage as string) || undefined}
    />
  );
}
