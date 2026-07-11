import type { CollectionConfig, Block } from "payload";

const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero", plural: "Heroes" },
  fields: [
    { name: "subtitle", type: "text", defaultValue: "Content Creation · Luxury Photo Booth", admin: { description: "Small text above the main heading" } },
    { name: "heading", type: "text", defaultValue: "Capturing", admin: { description: "The big, bold headline" } },
    { name: "subheading", type: "text", defaultValue: "Moments", admin: { description: "The second line of the headline, usually in script font" } },
    {
      name: "tagline",
      type: "textarea",
      defaultValue:
        "Editorial content and a timeless photo-booth experience — quietly crafted, beautifully delivered.",
      admin: { description: "A short paragraph below the heading that sets the mood" },
    },
    { name: "ctaPrimaryLabel", type: "text", defaultValue: "EXPLORE SERVICES", admin: { description: "Text for the main button" } },
    { name: "ctaPrimaryHref", type: "text", defaultValue: "/services", admin: { description: "Where the main button links to" } },
    { name: "ctaSecondaryLabel", type: "text", defaultValue: "INQUIRE", admin: { description: "Text for the secondary button" } },
    { name: "ctaSecondaryHref", type: "text", defaultValue: "/contact", admin: { description: "Where the secondary button links to" } },
    { name: "backgroundImage", type: "upload", relationTo: "media", admin: { components: { afterInput: ["@/components/admin/AIImageButton#AIImageButton"] }, description: "Single background image (used if no carousel images are added)" } },
    {
      name: "carouselImages",
      type: "array",
      admin: { description: "Hero slideshow images and videos. Add multiple to create a carousel. Drag to reorder. If empty, default images are used." },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true, admin: { description: "Upload or choose an image/video" } },
        { name: "alt", type: "text", admin: { description: "Image description for accessibility" } },
      ],
    },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const AboutSplitBlock: Block = {
  slug: "aboutSplit",
  labels: { singular: "About Split", plural: "About Splits" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "The Studio", admin: { description: "Small label above the heading" } },
    { name: "heading1", type: "text", defaultValue: "Quiet luxury,", admin: { description: "First line of the heading" } },
    { name: "heading2", type: "text", defaultValue: "captured on camera.", admin: { description: "Second line of the heading" } },
    {
      name: "paragraph1",
      type: "textarea",
      defaultValue:
        "Gigi's Concept is a boutique content & photo-booth studio based in Dallas, serving clients across Texas and beyond. We shoot with an editorial eye so your brand, your wedding, or your milestone feels exactly like the one you've been dreaming about.",
      admin: { description: "First paragraph of the about section" },
    },
    {
      name: "paragraph2",
      type: "textarea",
      defaultValue:
        "Every shoot is treated like a small cover story — because the best moments rarely shout. They whisper.",
      admin: { description: "Second paragraph of the about section" },
    },
    { name: "signature", type: "text", defaultValue: "— Gigi", admin: { description: "Your sign-off line (e.g. '— Gigi')" } },
    { name: "image", type: "upload", relationTo: "media", admin: { components: { afterInput: ["@/components/admin/AIImageButton#AIImageButton"] }, description: "Photo displayed alongside the about text" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const TwoWaysBlock: Block = {
  slug: "twoWays",
  labels: { singular: "Two Ways", plural: "Two Ways" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "What We Offer", admin: { description: "Small label above the heading" } },
    { name: "heading", type: "text", defaultValue: "Two Ways To", admin: { description: "Main heading text" } },
    { name: "subheading", type: "text", defaultValue: "work together", admin: { description: "Text after the main heading, usually in script font" } },
    { name: "card1Title", type: "text", defaultValue: "Content Creation", admin: { description: "Title for the first service card" } },
    { name: "card1Description", type: "textarea", admin: { description: "Description for the first service card" } },
    { name: "card1Image", type: "upload", relationTo: "media", admin: { components: { afterInput: ["@/components/admin/AIImageButton#AIImageButton"] }, description: "Image for the first service card" } },
    { name: "card1Link", type: "text", defaultValue: "/services", admin: { description: "Where the first card links to" } },
    { name: "card2Title", type: "text", defaultValue: "Photo Booth", admin: { description: "Title for the second service card" } },
    { name: "card2Description", type: "textarea", admin: { description: "Description for the second service card" } },
    { name: "card2Image", type: "upload", relationTo: "media", admin: { components: { afterInput: ["@/components/admin/AIImageButton#AIImageButton"] }, description: "Image for the second service card" } },
    { name: "card2Link", type: "text", defaultValue: "/services", admin: { description: "Where the second card links to" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const TestimonialBlock: Block = {
  slug: "testimonial",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  fields: [
    { name: "quote", type: "textarea", required: true, admin: { description: "The client's testimonial in their own words" } },
    { name: "authorName", type: "text", required: true, admin: { description: "Name of the person who gave the testimonial" } },
    { name: "eventDescription", type: "text", admin: { description: "Brief event description (e.g. 'Spring Wedding 2025')" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this testimonial without deleting it" } },
  ],
};

const CTABlock: Block = {
  slug: "cta",
  labels: { singular: "CTA Section", plural: "CTA Sections" },
  fields: [
    { name: "eyebrow", type: "text", admin: { description: "Small label above the heading" } },
    { name: "heading", type: "text", admin: { description: "Main call-to-action heading" } },
    { name: "subheading", type: "text", admin: { description: "Supporting text below the heading" } },
    { name: "buttonLabel", type: "text", admin: { description: "Text on the button (e.g. 'Book Now', 'Get Started')" } },
    { name: "buttonHref", type: "text", admin: { description: "Where the button links to (e.g. '/contact')" } },
    {
      name: "style",
      type: "select",
      options: [
        { label: "Dark", value: "dark" },
        { label: "Light", value: "light" },
      ],
      defaultValue: "dark",
      admin: { description: "Dark background with light text, or light background with dark text" },
    },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const GalleryBlock: Block = {
  slug: "gallerySection",
  labels: { singular: "Gallery Section", plural: "Gallery Sections" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Our Work", admin: { description: "Small label above the heading" } },
    { name: "heading", type: "text", defaultValue: "Gallery", admin: { description: "Section heading" } },
    { name: "showFullGalleryLink", type: "checkbox", defaultValue: true, admin: { description: "Show a 'View Full Gallery' link below the photos" } },
    {
      name: "photos",
      type: "array",
      admin: { description: "Gallery photos for this section. Add, remove, or drag to reorder. If empty, default portfolio photos are used." },
      fields: [
        { name: "image", type: "upload", relationTo: "media", required: true, admin: { description: "Upload or choose a photo/video" } },
        { name: "caption", type: "text", admin: { description: "Optional caption" } },
      ],
    },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const ContactBlock: Block = {
  slug: "contactSection",
  labels: { singular: "Contact Section", plural: "Contact Sections" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Get In Touch", admin: { description: "Small label above the heading" } },
    { name: "heading", type: "text", defaultValue: "Contact Us", admin: { description: "Section heading" } },
    { name: "description", type: "textarea", admin: { description: "A short message above the contact form" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const RichTextBlock: Block = {
  slug: "richText",
  labels: { singular: "Rich Text", plural: "Rich Text Blocks" },
  fields: [
    { name: "content", type: "richText", admin: { description: "Free-form content — write anything you want here" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const PackagesBlock: Block = {
  slug: "packagesToggle",
  labels: { singular: "Packages Toggle", plural: "Packages Toggles" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Investment", admin: { description: "Small label above the heading" } },
    { name: "heading", type: "text", defaultValue: "Packages", admin: { description: "Section heading" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const StepsBlock: Block = {
  slug: "steps",
  labels: { singular: "Steps", plural: "Steps" },
  fields: [
    { name: "heading", type: "text", defaultValue: "How to book", admin: { description: "Section heading (e.g. 'How to Book', 'Our Process')" } },
    {
      name: "steps",
      type: "array",
      admin: { description: "Each step in your process — add as many as you need" },
      fields: [
        { name: "title", type: "text", admin: { description: "Step title (e.g. 'Send an Inquiry')" } },
        { name: "description", type: "textarea", admin: { description: "What happens in this step" } },
      ],
    },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section without deleting it" } },
  ],
};

const VideoEmbedBlock: Block = {
  slug: "videoEmbed",
  labels: { singular: "Video Embed", plural: "Video Embeds" },
  fields: [
    { name: "heading", type: "text", admin: { description: "Optional heading above the video" } },
    { name: "videoUrl", type: "text", required: true, admin: { description: "Paste a YouTube or Vimeo URL (e.g. https://youtube.com/watch?v=... or https://vimeo.com/...)" } },
    { name: "caption", type: "text", admin: { description: "Optional caption below the video" } },
    { name: "isVisible", type: "checkbox", defaultValue: true, admin: { description: "Uncheck to hide this section" } },
  ],
};

const FAQBlock: Block = {
  slug: "faq",
  labels: { singular: "FAQ", plural: "FAQs" },
  fields: [
    { name: "heading", type: "text", defaultValue: "FAQ", admin: { description: "Section heading" } },
    {
      name: "questions",
      type: "array",
      admin: { description: "Add your frequently asked questions" },
      fields: [
        { name: "question", type: "text", required: true, admin: { description: "The question" } },
        { name: "answer", type: "textarea", required: true, admin: { description: "The answer" } },
      ],
    },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const ServiceDetailBlock: Block = {
  slug: "serviceDetail",
  labels: { singular: "Service Detail", plural: "Service Details" },
  fields: [
    { name: "eyebrow", type: "text", admin: { description: "Small label above heading (e.g. 'SERVICE ONE')" } },
    { name: "title", type: "text", required: true, admin: { description: "Service title (e.g. 'Content Creation')" } },
    { name: "description", type: "textarea", admin: { description: "Main description of the service" } },
    { name: "secondaryDescription", type: "textarea", admin: { description: "Optional additional paragraph" } },
    { name: "image", type: "upload", relationTo: "media", admin: { description: "Service image" } },
    {
      name: "layoutDirection",
      type: "select",
      defaultValue: "imageLeft",
      options: [
        { label: "Image Left", value: "imageLeft" },
        { label: "Image Right", value: "imageRight" },
      ],
      admin: { description: "Which side the image appears on" },
    },
    {
      name: "includedItems",
      type: "array",
      admin: { description: "List of included features (e.g. 'Custom Backdrop' / 'INCLUDED')" },
      fields: [
        { name: "label", type: "text", admin: { description: "Item name" } },
        { name: "value", type: "text", admin: { description: "Item value (e.g. INCLUDED, UNLIMITED)" } },
      ],
    },
    { name: "includedHeading", type: "text", admin: { description: "Heading above included items (e.g. 'WHAT\\'S INCLUDED')" } },
    { name: "cta1Label", type: "text", admin: { description: "First button text" } },
    { name: "cta1Href", type: "text", admin: { description: "First button link" } },
    { name: "cta2Label", type: "text", admin: { description: "Second button text" } },
    { name: "cta2Href", type: "text", admin: { description: "Second button link" } },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const ValuesGridBlock: Block = {
  slug: "valuesGrid",
  labels: { singular: "Values Grid", plural: "Values Grids" },
  fields: [
    { name: "heading", type: "text", admin: { description: "Optional section heading" } },
    {
      name: "values",
      type: "array",
      admin: { description: "Each value card with a title and description" },
      fields: [
        { name: "title", type: "text", admin: { description: "Value title (e.g. 'Editorial Eye')" } },
        { name: "description", type: "textarea", admin: { description: "Value description" } },
      ],
    },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const FomoStripBlock: Block = {
  slug: "fomoStrip",
  labels: { singular: "Urgency Strip", plural: "Urgency Strips" },
  fields: [
    { name: "text", type: "text", required: true, admin: { description: "Urgency message (e.g. 'Limited Saturdays available')" } },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

const ReviewFormBlock: Block = {
  slug: "reviewForm",
  labels: { singular: "Review Form", plural: "Review Forms" },
  fields: [
    { name: "eyebrow", type: "text", defaultValue: "Share Your Experience", admin: { description: "Small label above heading" } },
    { name: "heading", type: "text", defaultValue: "Leave a Review", admin: { description: "Page heading" } },
    { name: "description", type: "textarea", defaultValue: "We'd love to hear about your experience with Gigi's Concept. Your feedback means the world to us.", admin: { description: "Intro text below heading" } },
    { name: "successHeading", type: "text", defaultValue: "Thank You!", admin: { description: "Heading shown after submission" } },
    { name: "successMessage", type: "textarea", defaultValue: "Your review has been submitted and is pending approval. We truly appreciate you taking the time to share your experience.", admin: { description: "Message shown after submission" } },
    { name: "isVisible", type: "checkbox", defaultValue: true },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    group: "Website",
    description: "Your website pages. HOW TO USE: 1) Click 'Create New' to add a page. 2) Enter a title and slug (the URL path, e.g. 'about' for yoursite.com/about). 3) Click 'Add Block' to add sections like hero banners, text sections, galleries, FAQs, etc. 4) Drag blocks to reorder them. 5) Toggle 'Is Visible' on each block to show/hide it. 6) Click 'Save Draft' to save without publishing, or 'Publish' to make it live. TIP: The 'home' slug is your homepage.",
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "Page title — also used in the browser tab" },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: { description: "URL path for this page (e.g. 'about', 'services'). Must be unique" },
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
        VideoEmbedBlock,
        FAQBlock,
        ServiceDetailBlock,
        ValuesGridBlock,
        FomoStripBlock,
        ReviewFormBlock,
      ],
      admin: { description: "Build your page by adding sections below. Drag to reorder" },
    },
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Check to make this page live on your website" },
    },
  ],
};
