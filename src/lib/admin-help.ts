export interface HelpEntry {
  title: string;
  description: string;
  tips: string[];
  howTo?: string[];
}

export const adminHelp: Record<string, HelpEntry> = {
  dashboard: {
    title: "Dashboard",
    description: "Your home base. Everything you need to know at a glance — new inquiries, upcoming events, tasks, and how the business is doing.",
    tips: [
      "Check here first thing each morning to see what needs your attention.",
      "The Setup Checklist at the top walks you through getting everything set up.",
      "Click any number or card to jump straight to that section.",
      "Use the Quick Actions buttons to create new leads, bookings, quotes, or blog posts.",
    ],
    howTo: [
      "The calendar shows your bookings and consultations for the month.",
      "The CRM board shows your leads pipeline — drag cards between columns.",
      "The Reports section shows revenue, leads by source, and bookings by status.",
    ],
  },
  pages: {
    title: "Pages — Edit Your Website",
    description: "This is where you change the words, images, and sections on your website. Each page is made up of blocks (sections) that you can edit independently.",
    tips: [
      "Click on a page name to open it and see all its blocks.",
      "Each block is a section of the page (Hero, About, Services, etc.).",
      "Your changes save as a DRAFT — they won't go live until you click Publish.",
      "You can hide a section by unchecking 'Is Visible' without deleting it.",
    ],
    howTo: [
      "To change text: Click the page → find the block → edit the text fields → Save → Publish.",
      "To change an image: Click the image field → upload a new photo or pick from Media.",
      "To add a section: Click 'Add Block' at the bottom and choose the type.",
      "To reorder sections: Drag the blocks up or down in the list.",
      "To hide a section temporarily: Uncheck 'Is Visible' on that block.",
    ],
  },
  media: {
    title: "Media — Your Image Library",
    description: "All your photos and images live here. Upload event photos, portraits, booth shots, and logos. Every image on your website comes from this library.",
    tips: [
      "Drag and drop images to upload them — or click 'Create New' to upload one at a time.",
      "Always add a description (alt text) — it helps with Google rankings.",
      "Use the ✨ Generate with AI button on any image field to create images from a text description.",
      "Images uploaded here are automatically available on your website.",
    ],
    howTo: [
      "To upload: Click 'Create New' → choose your file → add a description → Save.",
      "To use AI: On any image field, click '✨ Generate with AI' → type what you want → Generate.",
      "To replace a photo on your site: Go to Pages → find the block → click the image field → upload or pick a new one.",
    ],
  },
  packages: {
    title: "Packages & Pricing",
    description: "Your service packages and pricing. Changes here automatically update your website's pricing page and the packages section on the homepage.",
    tips: [
      "The prices you set here are what visitors see on your website — no code changes needed.",
      "Mark a package as 'Featured' to highlight it with a badge like 'Popular' or 'Wedding Favorite'.",
      "The features list becomes bullet points on your website.",
      "Uncheck 'Is Visible' to hide a package without deleting it.",
    ],
    howTo: [
      "To change a price: Click the package → update Price Display (what people see) and Price Cents (for calculations) → Save.",
      "To add a new package: Click 'Create New' → fill in the details → Save.",
      "To reorder packages: Change the Sort Order number (lower = first).",
    ],
  },
  addons: {
    title: "Add-Ons",
    description: "Extra services like backdrops, rush delivery, and additional time. These show as add-ons below your packages on the website.",
    tips: [
      "Set 'Applies To' to control which service type this add-on appears with.",
      "The Price Display field is what visitors see (e.g. '$25' or '$97/hr').",
    ],
  },
  leads: {
    title: "Leads — Your Sales Pipeline",
    description: "Everyone who inquires about your services starts here. Track them from first contact through to booking. The CRM board on your dashboard shows these as draggable cards.",
    tips: [
      "New leads are created automatically when someone fills out your contact form.",
      "An auto-reply email is sent to the client, and you get a notification email too.",
      "Move leads through stages: New → Contacted → Consultation → Quote Sent → Booked.",
      "Add notes to keep track of conversations and follow-ups.",
    ],
    howTo: [
      "When a new lead comes in, check the details and respond within 24 hours.",
      "Set a follow-up date so you don't forget to check back.",
      "When you're ready to send a quote, use the Quote Builder on the dashboard.",
    ],
  },
  bookings: {
    title: "Bookings — Your Events",
    description: "Each confirmed event is a booking. Track the client, service, date, venue, and payment status all in one place.",
    tips: [
      "Bookings show on your calendar — color-coded by status.",
      "When you change a booking status to 'Confirmed', the client gets an automatic email.",
      "When you change it to 'Completed', they get a review request email.",
    ],
  },
  quotes: {
    title: "Quotes — Proposals for Clients",
    description: "Build and send price quotes to potential clients. Use the Quote Builder on the dashboard to create them quickly.",
    tips: [
      "The Quote Builder calculates totals and 50% deposit automatically.",
      "Saved quotes appear here — you can edit and resend them.",
      "Clients can accept quotes at the link you share with them.",
    ],
  },
  invoices: {
    title: "Invoices — Get Paid",
    description: "Track payments from clients. Each booking typically has two invoices: a 50% deposit and a 50% balance.",
    tips: [
      "Invoices can be shared via a link — clients can view and pay online.",
      "Payment by Zelle is also accepted at +1 (832) 873-7776.",
    ],
  },
  testimonials: {
    title: "Testimonials & Reviews",
    description: "Client reviews and testimonials. When someone submits a review on your website, it appears here as 'Pending' — approve it to show it on your site.",
    tips: [
      "Only 'Approved' testimonials show on your website.",
      "Check 'Featured' to show a testimonial on the homepage.",
      "You can also add testimonials manually (set Source to 'Manual').",
    ],
  },
  blog: {
    title: "Blog — Drive Traffic & SEO",
    description: "Your blog posts help people find you on Google. New posts are generated automatically every day, but you can write your own too.",
    tips: [
      "Blog posts are auto-generated daily at 9am targeting Dallas wedding and event keywords.",
      "Review auto-generated posts and edit them to add your personal touch.",
      "Each post should have a featured image — use the ✨ AI button to generate one.",
      "The more posts you have, the better your Google rankings.",
    ],
  },
  gallery: {
    title: "Gallery Images",
    description: "Photos and videos from your events. Set them as Public (everyone can see) or Private (password-protected for specific clients).",
    tips: [
      "Upload your best work here — this is your portfolio.",
      "For client galleries, set category to 'Private' and add a password.",
      "Replace the stock photos with your real event photos for credibility.",
    ],
  },
  discounts: {
    title: "Discount Codes",
    description: "Promo codes for your services. Visitors can enter these on the contact form. Your PHOTO10 code gives 10% off photo booth bookings.",
    tips: [
      "Set a max redemptions limit to control how many times a code can be used.",
      "Set start and end dates for seasonal promotions.",
      "Track how many times each code has been redeemed.",
    ],
  },
  popups: {
    title: "Popups & Offers",
    description: "The popup that greets visitors on your website. Your 10% photo booth offer is already set up.",
    tips: [
      "Set the trigger to 'Delay' with 5 seconds so it doesn't appear immediately.",
      "Turn popups on and off with the 'Is Active' checkbox.",
      "Change the offer, heading, and CTA anytime — it updates instantly.",
    ],
  },
  team: {
    title: "Team Members",
    description: "Your team — second shooters, booth attendants, editors. Assign them to bookings so you know who's working each event.",
    tips: [
      "Set a calendar color for each team member so they're easy to spot.",
      "Assigning team to bookings helps prevent double-scheduling.",
    ],
  },
  equipment: {
    title: "Equipment",
    description: "Your booths, cameras, backdrops, and props. Track what's available and what's assigned to upcoming events.",
    tips: [
      "Mark equipment as 'In Repair' if it's temporarily unavailable.",
      "Assigning equipment to bookings prevents double-allocation.",
    ],
  },
  automations: {
    title: "Automations — Set It and Forget It",
    description: "Automatic emails and tasks that fire when things happen — new inquiry comes in, booking is confirmed, event is completed. You don't need to do anything; they just work.",
    tips: [
      "Toggle each automation on or off with the 'Is Active' checkbox.",
      "The auto-reply to new inquiries is already active — clients get a thank-you email instantly.",
      "When a booking is marked 'Completed', a review request email goes out automatically.",
    ],
  },
  emailTemplates: {
    title: "Email Templates",
    description: "The wording for your automated emails. Edit these to match your voice. Four templates are ready: inquiry reply, booking confirmation, deposit receipt, and review request.",
    tips: [
      "Keep emails warm and personal — they come from Gigi's Concept.",
      "The subject line is what the client sees in their inbox, so make it clear and inviting.",
    ],
  },
  siteSettings: {
    title: "Site Settings",
    description: "Your business details — name, email, phone, social links, pricing rates, colors, and SEO settings. Changes here update across your entire website.",
    tips: [
      "The Social tab is where you enter your Instagram handle for the gallery feed.",
      "The Pricing tab controls the rates used in the quote calculator.",
      "The SEO tab sets what appears when someone shares your site on social media.",
    ],
  },
  consultations: {
    title: "Consultations",
    description: "15-minute consultations booked by potential clients. They show on your calendar alongside bookings.",
    tips: [
      "Clients book these from the public 'Book a Consultation' page.",
      "A confirmation email is sent automatically when someone books.",
      "Set your available hours in the Availability Rules settings.",
    ],
  },
};
