import type { CollectionConfig, Block } from "payload";

const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "subtitle", type: "text", defaultValue: "Content Creation · Luxury Photo Booth" },
    { name: "heading", type: "text", defaultValue: "Capturing" },
    { name: "subheading", type: "text", defaultValue: "Moments" },
    {
      name: "tagline",
      type: "textarea",
      defaultValue:
        "Editorial content and a timeless photo-booth experience — quietly crafted, beautifully delivered.",
    },
    { name: "ctaPrimaryLabel", type: "text", defaultValue: "EXPLORE SERVICES" },
    { name: "ctaPrimaryHref", type: "text", defaultValue: "/services" },
    { name: "ctaSecondaryLabel", type: "text", defaultValue: "INQUIRE" },
    { name: "ctaSecondaryHref", type: "text", defaultValue: "/contact" },
    { name: "backgroundImage", type: "upload", relationTo: "media" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const AboutSplitBlock: Block = {
  slug: "aboutSplit",
  labels: { singular: "About Split", plural: "About Splits" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "The Studio" },
    { name: "heading1", type: "text", defaultValue: "Quiet luxury," },
    { name: "heading2", type: "text", defaultValue: "captured on camera." },
    {
      name: "paragraph1",
      type: "textarea",
      defaultValue:
        "Gigi's Concept is a boutique content & photo-booth studio based in Dallas, serving clients across Texas and beyond. We shoot with an editorial eye so your brand, your wedding, or your milestone feels exactly like the one you've been dreaming about.",
    },
    {
      name: "paragraph2",
      type: "textarea",
      defaultValue:
        "Every shoot is treated like a small cover story — because the best moments rarely shout. They whisper.",
    },
    { name: "signature", type: "text", defaultValue: "— Gigi" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const TwoWaysBlock: Block = {
  slug: "twoWays",
  labels: { singular: "Two Ways", plural: "Two Ways" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "What We Offer" },
    { name: "heading", type: "text", defaultValue: "Two Ways To" },
    { name: "subheading", type: "text", defaultValue: "work together" },
    { name: "card1Title", type: "text", defaultValue: "Content Creation" },
    { name: "card1Description", type: "textarea" },
    { name: "card1Image", type: "upload", relationTo: "media" },
    { name: "card1Link", type: "text", defaultValue: "/services" },
    { name: "card2Title", type: "text", defaultValue: "Photo Booth" },
    { name: "card2Description", type: "textarea" },
    { name: "card2Image", type: "upload", relationTo: "media" },
    { name: "card2Link", type: "text", defaultValue: "/services" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const TestimonialBlock: Block = {
  slug: "testimonial",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "authorName", type: "text", required: true },
    { name: "eventDescription", type: "text" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const CTABlock: Block = {
  slug: "cta",
  labels: { singular: "CTA Section", plural: "CTA Sections" },
  fields: [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "subheading", type: "text" },
    { name: "buttonLabel", type: "text" },
    { name: "buttonHref", type: "text" },
    {
      name: "style",
      type: "select",
      options: [
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
      ],
      defaultValue: "dark",
    },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const GalleryBlock: Block = {
  slug: "gallerySection",
  labels: { singular: "Gallery Section", plural: "Gallery Sections" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Our Work" },
    { name: "heading", type: "text", defaultValue: "Gallery" },
    { name: "showFullGalleryLink", type: "checkbox", defaultValue: true },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const ContactBlock: Block = {
  slug: "contactSection",
  labels: { singular: "Contact Section", plural: "Contact Sections" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Get In Touch" },
    { name: "heading", type: "text", defaultValue: "Contact Us" },
    { name: "description", type: "textarea" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich Text", plural: "Rich Text Blocks" },
  fields: [
    { name: "content", type: "richText" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const PackagesBlock: Block = {
  slug: "packagesToggle",
  labels: { singular: "Packages Toggle", plural: "Packages Toggles" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Investment" },
    { name: "heading", type: "text", defaultValue: "Packages" },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const StepsBlock: Block = {
  slug: "steps",
  labels: { singular: "Steps", plural: "Steps" },
  fields: [
    { name: "heading", type: "text", defaultValue: "How to book" },
    {
      name: "steps",
      type: "array",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Website",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
    },
    {
      name: "layout",
      type: "blocks",
      blocks: [
        HeroBlock,
        AboutSplitBlock,
        TwoWaysBlock,
        TestimonialBlock,
        CTABlock,
        GalleryBlock,
        ContactBlock,
        RichTextBlock,
        PackagesBlock,
        StepsBlock,
      ],
    },
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
