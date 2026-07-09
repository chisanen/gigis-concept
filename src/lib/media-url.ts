/**
 * Resolves a Payload media URL to a publicly accessible URL.
 *
 * Payload returns URLs like /api/media/file/filename.png which go through
 * Payload's file serve route. On Vercel serverless, local files don't persist,
 * so these 403. If the file also exists in /public/, we can serve it from there.
 * If it's a Vercel Blob URL, it works directly.
 */
export function resolveMediaUrl(url: string | undefined | null): string | null {
  if (!url) return null;

  // Already a full URL (Blob, Unsplash, etc.)
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  // Payload local media path — map to /public/ fallback
  if (url.startsWith("/api/media/file/")) {
    const filename = url.replace("/api/media/file/", "");
    return `/${filename}`;
  }

  // Already a root-relative path
  if (url.startsWith("/")) return url;

  return url;
}

/**
 * Extract a usable image URL from a Payload media relation (depth=1+)
 */
export function getMediaSrc(media: unknown): string | null {
  if (!media || typeof media !== "object") return null;
  const m = media as Record<string, unknown>;
  return resolveMediaUrl(m.url as string);
}
