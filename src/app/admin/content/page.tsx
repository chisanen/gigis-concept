"use client";

import { useState, useEffect } from "react";

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  aboutHeading1: string;
  aboutHeading2: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutSignature: string;
  contentCreationTitle: string;
  contentCreationDescription: string;
  photoBoothTitle: string;
  photoBoothDescription: string;
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialEvent: string;
  contactEmail: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  boothRatePerHour: string;
  basicRatePerHour: string;
  storytellerPrice: string;
  shortEditPrice: string;
  longEditPrice: string;
}

const defaultContent: SiteContent = {
  heroTitle: "Capturing",
  heroSubtitle: "Moments",
  heroTagline: "Editorial content and a timeless photo-booth experience — quietly crafted, beautifully delivered.",
  aboutHeading1: "Quiet luxury,",
  aboutHeading2: "captured on camera.",
  aboutParagraph1: "Gigi's Concept is a boutique content & photo-booth studio based in Dallas, serving clients across Texas and beyond. We shoot with an editorial eye so your brand, your wedding, or your milestone feels exactly like the one you've been dreaming about.",
  aboutParagraph2: "Every shoot is treated like a small cover story — because the best moments rarely shout. They whisper.",
  aboutSignature: "— Gigi",
  contentCreationTitle: "Content Creation",
  contentCreationDescription: "Editorial content days for founders, brands, and tastemakers. Directed shoots with short-form and long-form deliverables, returned to you within forty-eight hours.",
  photoBoothTitle: "Photo Booth",
  photoBoothDescription: "A slow, cinematic take on the classic photo booth — custom backdrops, heavyweight prints on-site, and a digital gallery the next day.",
  testimonialQuote: "My mom started crying! She loves it so much — thank you so much. You are amazing at what you do.",
  testimonialAuthor: "Latoya E.",
  testimonialEvent: "60th Birthday Celebration",
  contactEmail: "hello@gigisconcept.com",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  tiktokUrl: "https://tiktok.com",
  boothRatePerHour: "150",
  basicRatePerHour: "50",
  storytellerPrice: "450",
  shortEditPrice: "30",
  longEditPrice: "40",
};

const sections = [
  {
    id: "hero",
    label: "Hero Section",
    fields: [
      { key: "heroTitle", label: "Title (Script)", type: "text" },
      { key: "heroSubtitle", label: "Subtitle", type: "text" },
      { key: "heroTagline", label: "Tagline", type: "textarea" },
    ],
  },
  {
    id: "about",
    label: "About Section",
    fields: [
      { key: "aboutHeading1", label: "Heading Line 1", type: "text" },
      { key: "aboutHeading2", label: "Heading Line 2", type: "text" },
      { key: "aboutParagraph1", label: "Paragraph 1", type: "textarea" },
      { key: "aboutParagraph2", label: "Paragraph 2", type: "textarea" },
      { key: "aboutSignature", label: "Signature", type: "text" },
    ],
  },
  {
    id: "services",
    label: "Services",
    fields: [
      { key: "contentCreationTitle", label: "Content Creation Title", type: "text" },
      { key: "contentCreationDescription", label: "Content Creation Description", type: "textarea" },
      { key: "photoBoothTitle", label: "Photo Booth Title", type: "text" },
      { key: "photoBoothDescription", label: "Photo Booth Description", type: "textarea" },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    fields: [
      { key: "boothRatePerHour", label: "Photo Booth Rate ($/hr)", type: "text" },
      { key: "basicRatePerHour", label: "Basic Package Rate ($/hr)", type: "text" },
      { key: "storytellerPrice", label: "Storyteller Package Price ($)", type: "text" },
      { key: "shortEditPrice", label: "Short Edit Price ($)", type: "text" },
      { key: "longEditPrice", label: "Long Edit Price ($)", type: "text" },
    ],
  },
  {
    id: "testimonial",
    label: "Testimonial",
    fields: [
      { key: "testimonialQuote", label: "Quote", type: "textarea" },
      { key: "testimonialAuthor", label: "Author Name", type: "text" },
      { key: "testimonialEvent", label: "Event", type: "text" },
    ],
  },
  {
    id: "contact",
    label: "Contact & Social",
    fields: [
      { key: "contactEmail", label: "Email Address", type: "text" },
      { key: "instagramUrl", label: "Instagram URL", type: "text" },
      { key: "facebookUrl", label: "Facebook URL", type: "text" },
      { key: "tiktokUrl", label: "TikTok URL", type: "text" },
    ],
  },
];

export default function ContentEditorPage() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [activeSection, setActiveSection] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("gigis-site-content");
    if (stored) {
      setContent({ ...defaultContent, ...JSON.parse(stored) });
    }
  }, []);

  function handleChange(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    localStorage.setItem("gigis-site-content", JSON.stringify(content));
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const currentSection = sections.find((s) => s.id === activeSection);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Site Content Editor</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-6 py-2.5 text-sm tracking-wider transition-colors ${
            saved
              ? "bg-green-600 text-white"
              : "bg-brand-900 text-white hover:bg-brand-700"
          } disabled:opacity-50`}
        >
          {saving ? "SAVING..." : saved ? "SAVED" : "SAVE CHANGES"}
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <nav className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`block w-full text-left px-4 py-3 text-sm border-b border-gray-100 last:border-0 transition-colors ${
                  activeSection === section.id
                    ? "bg-brand-900 text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Editor */}
        <div className="md:col-span-3">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {currentSection?.label}
            </h2>
            <div className="space-y-5">
              {currentSection?.fields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={content[field.key as keyof SiteContent]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      rows={4}
                      className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700 resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[field.key as keyof SiteContent]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-brand-700/20 focus:border-brand-700"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Preview hint */}
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              <strong>Note:</strong> Changes are saved to local storage for now.
              To connect to a production database for persistent storage across
              deployments, add Neon Postgres via{" "}
              <code className="bg-amber-100 px-1 rounded">vercel integration add neon</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
