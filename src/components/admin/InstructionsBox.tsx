"use client";

import { useState } from "react";

const instructions: Record<string, string> = {
  pages: "1) Click 'Create New' to add a page. 2) Enter a title and slug (the URL path, e.g. 'about' for yoursite.com/about). 3) Click 'Add Block' to add sections like hero banners, text, galleries, FAQs. 4) Drag blocks to reorder. 5) Toggle 'Is Visible' on each block to show/hide. 6) Click 'Save Draft' to save, or 'Publish' to go live. TIP: The 'home' slug is your homepage.",
  "blog-posts": "1) Click 'Create New'. 2) Write your title, choose a category, add content with the editor. 3) Upload a featured image. 4) Write a short excerpt for Google. 5) Set publish date and click 'Publish'. TIP: Aim for 1-2 posts per week about Dallas weddings, events, and photo tips.",
  media: "1) Click 'Create New' or drag files here to upload. 2) Add a description (alt text) for SEO. 3) Choose type: Photo, Video, or Logo. 4) Images can be selected from any image field on other pages. TIP: Use high-quality images (1600px+ wide).",
  "gallery-images": "1) Click 'Create New'. 2) Upload image/video, give it a title, enter a Collection Name (e.g. 'Smith Wedding 2026') to group photos. 3) Set Category: Public (portfolio), Password Protected (client gallery), or Private. 4) Share the gallery link with clients.",
  testimonials: "1) Reviews from your website appear here as 'Pending'. 2) Click a review, change Status to 'Approved'. 3) Check 'Featured' to show on homepage carousel. 4) To add manually, click 'Create New'. TIP: Feature your 3-5 best reviews.",
  popups: "1) Click 'Create New'. 2) Add heading, message, image. 3) Set offer label and discount code. 4) Set button text and link. 5) Choose trigger: On Page Load, After Delay, After Scrolling, or Exit Intent. 6) Set frequency. 7) Check 'Is Active' to turn on. TIP: Use 'After Delay' with 5 seconds.",
  "discount-codes": "1) Click 'Create New'. 2) Enter code name (e.g. 'PHOTO10'), description, type (percentage or fixed), and amount. 3) Link to a popup to promote. TIP: Use short, memorable codes.",
  leads: "1) New leads appear as 'New'. 2) Click to see details. 3) Update stage: New > Contacted > Consultation > Quote Sent > Booked (or Lost). 4) Add notes. TIP: Follow up within 24 hours.",
  bookings: "1) Click 'Create New' when a client signs their contract. 2) Fill in client info, service, package, event date, venue, guest count. 3) Update status as you go. 4) Assign team members.",
  inquiries: "1) New inquiries appear automatically from the contact form. 2) Click to see the full message. 3) Respond via email, then convert to a Lead. TIP: Auto-reply is set up in Automations.",
  packages: "1) Click 'Create New' or edit existing. 2) Choose category (Content Creation or Photo Booth). 3) Set name, price in cents (29000 = $290), display price. 4) Add features. 5) Check 'Is Featured' for a badge. NOTE: Price is in CENTS.",
  "add-ons": "1) Click 'Create New'. 2) Enter name, price in cents, display price, pricing type (Flat/Per Hour/Per Item). 3) Select which service it applies to. TIP: Common add-ons: extra hours, backdrops, rush delivery.",
  quotes: "1) Use the Quote Builder on the Dashboard for quick quotes. 2) Or click 'Create New' here. 3) Each quote gets a shareable link. 4) Send to clients to review and accept.",
  contracts: "1) Click 'Create New'. 2) Enter client name, email, terms. 3) Save to get a shareable link. 4) Client signs electronically. TIP: Send contract before the invoice.",
  invoices: "1) Click 'Create New'. 2) Add client info and line items. 3) Save for a shareable link. 4) Update 'Amount Paid' as payments come in. TIP: Send deposit invoice after contract is signed.",
  tasks: "1) Click 'Create New'. 2) Enter title, description, due date, priority. 3) Assign to team if needed. 4) Update status when done. TIP: High-priority shows in red on Dashboard.",
  customers: "1) Customers are created from bookings and inquiries. 2) Click to see history and notes. 3) Add private notes about preferences. TIP: Keep notes updated for repeat clients.",
  consultations: "1) Click 'Create New'. 2) Enter client name, email, date/time, meeting type. 3) Add notes during/after the call. 4) Update status. TIP: Schedule within 48 hours of inquiry.",
  team: "1) Click 'Create New'. 2) Enter name, role, email, phone. 3) Set calendar color. 4) Assign to bookings. TIP: Keep contact info updated for event days.",
  equipment: "1) Click 'Create New'. 2) Enter name, type, serial number, condition. 3) Track gear per event. TIP: Review before each season.",
  "email-templates": "1) Click 'Create New'. 2) Name it, write subject and body. 3) Used by Automations for auto-emails. TIP: Write warm, personal emails matching your brand.",
  automations: "1) Click to see trigger and action. 2) Toggle 'Is Active' on/off. 3) Auto-reply for new inquiries is already set up. TIP: Let automations handle routine emails.",
  broadcasts: "1) Click 'Create New'. 2) Write subject and body. 3) Choose recipients. 4) Preview, then send. TIP: Send seasonal promos 4-6 weeks before the season.",
};

export function InstructionsBox() {
  const [open, setOpen] = useState(false);

  // Get collection slug from URL
  const slug = typeof window !== "undefined"
    ? window.location.pathname.split("/collections/")[1]?.split("/")[0]?.split("?")[0] || ""
    : "";

  const text = instructions[slug];
  if (!text) return null;

  return (
    <div style={{
      margin: "0 0 16px",
      border: "1px solid #D1C7BD",
      borderLeft: "4px solid #A48374",
      borderRadius: "0 8px 8px 0",
      overflow: "hidden",
      background: "linear-gradient(135deg, #F8F5F1, #FFFFFF)",
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px 16px",
          cursor: "pointer",
          border: "none",
          background: "transparent",
          userSelect: "none",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", color: "#A48374", textTransform: "uppercase" }}>
          Instructions
        </span>
        <span style={{ fontSize: "18px", color: "#A48374", lineHeight: 1 }}>
          {open ? "\u2212" : "+"}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 16px 14px", fontSize: "13px", lineHeight: 1.8, color: "#5C463B" }}>
          {text}
        </div>
      )}
    </div>
  );
}
