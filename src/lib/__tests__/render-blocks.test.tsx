import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { getMediaUrl, getMediaAlt, renderBlock, renderBlocks } from "../render-blocks";

// Mock next/image and next/link
vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => React.createElement("img", props),
}));
vi.mock("next/link", () => ({
  default: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
    React.createElement("a", props, children),
}));

// Mock client components used by render-blocks
vi.mock("@/components/HeroCarousel", () => ({
  HeroCarousel: () => React.createElement("div", { "data-testid": "hero-carousel" }),
}));
vi.mock("@/components/TestimonialCarousel", () => ({
  TestimonialCarousel: () => React.createElement("div", { "data-testid": "testimonial-carousel" }),
}));
vi.mock("@/components/InquiryForm", () => ({
  InquiryForm: () => React.createElement("div", { "data-testid": "inquiry-form" }),
}));
vi.mock("@/components/Gallery", () => ({
  Gallery: () => React.createElement("div", { "data-testid": "gallery" }),
}));
vi.mock("@/components/PackagesDisplay", () => ({
  PackagesDisplay: () => React.createElement("div", { "data-testid": "packages-display" }),
}));
vi.mock("@/components/PackagesSection", () => ({
  PackagesSection: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "packages-section" }, children),
}));

describe("getMediaUrl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null for null input", () => {
    expect(getMediaUrl(null)).toBeNull();
  });

  it("returns null for undefined input", () => {
    expect(getMediaUrl(undefined)).toBeNull();
  });

  it("returns null for non-object input", () => {
    expect(getMediaUrl("string")).toBeNull();
    expect(getMediaUrl(42)).toBeNull();
  });

  it("returns null when object has no url property", () => {
    expect(getMediaUrl({ alt: "photo" })).toBeNull();
  });

  it("returns the url from a media object", () => {
    const media = { url: "/uploads/photo.jpg", alt: "A photo" };
    expect(getMediaUrl(media)).toBe("/uploads/photo.jpg");
  });

  it("strips /api/media/file/ prefix and prepends /", () => {
    const media = { url: "/api/media/file/photo.jpg" };
    expect(getMediaUrl(media)).toBe("/photo.jpg");
  });

  it("does not modify urls that do not start with /api/media/file/", () => {
    const media = { url: "https://cdn.example.com/image.png" };
    expect(getMediaUrl(media)).toBe("https://cdn.example.com/image.png");
  });
});

describe("getMediaAlt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty string for null input", () => {
    expect(getMediaAlt(null)).toBe("");
  });

  it("returns empty string for undefined input", () => {
    expect(getMediaAlt(undefined)).toBe("");
  });

  it("returns empty string for non-object input", () => {
    expect(getMediaAlt("string")).toBe("");
  });

  it("returns alt text from a media object", () => {
    const media = { alt: "A beautiful sunset", url: "/photo.jpg" };
    expect(getMediaAlt(media)).toBe("A beautiful sunset");
  });

  it("returns empty string when media object has no alt property", () => {
    const media = { url: "/photo.jpg" };
    expect(getMediaAlt(media)).toBe("");
  });
});

describe("renderBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when block has isVisible set to false", () => {
    const block = { blockType: "hero", isVisible: false };
    const result = renderBlock(block);
    expect(result).toBeNull();
  });

  it("returns null for an unknown blockType", () => {
    const block = { blockType: "unknownBlockType123" };
    const result = renderBlock(block);
    expect(result).toBeNull();
  });

  it("renders a hero block when blockType is 'hero'", () => {
    const block = { blockType: "hero", heading: "Welcome" };
    const result = renderBlock(block);
    expect(result).not.toBeNull();
  });

  it("renders a cta block when blockType is 'cta'", () => {
    const block = { blockType: "cta", heading: "Get Started" };
    const result = renderBlock(block);
    expect(result).not.toBeNull();
  });

  it("renders a testimonial block when blockType is 'testimonial'", () => {
    const block = { blockType: "testimonial", quote: "Amazing!" };
    const result = renderBlock(block);
    expect(result).not.toBeNull();
  });

  it("does not return null for a visible hero block", () => {
    const block = { blockType: "hero", isVisible: true, heading: "Test" };
    const result = renderBlock(block);
    expect(result).not.toBeNull();
  });
});

describe("renderBlocks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns empty array for null input", () => {
    const result = renderBlocks(null);
    expect(result).toEqual([]);
  });

  it("returns empty array for undefined input", () => {
    const result = renderBlocks(undefined);
    expect(result).toEqual([]);
  });

  it("returns empty array when all blocks are invisible", () => {
    const blocks = [
      { blockType: "hero", isVisible: false },
      { blockType: "cta", isVisible: false },
    ];
    const result = renderBlocks(blocks);
    expect(result).toEqual([]);
  });

  it("filters out unknown block types", () => {
    const blocks = [
      { blockType: "nonexistent" },
      { blockType: "alsoNonexistent" },
    ];
    const result = renderBlocks(blocks);
    expect(result).toEqual([]);
  });

  it("returns rendered nodes for valid visible blocks", () => {
    const blocks = [
      { blockType: "hero", heading: "Welcome" },
      { blockType: "cta", heading: "Contact" },
    ];
    const result = renderBlocks(blocks);
    expect(result).toHaveLength(2);
  });

  it("filters out invisible blocks while keeping visible ones", () => {
    const blocks = [
      { blockType: "hero", heading: "Welcome" },
      { blockType: "cta", isVisible: false },
      { blockType: "testimonial", quote: "Great!" },
    ];
    const result = renderBlocks(blocks);
    expect(result).toHaveLength(2);
  });
});
