export interface HelpEntry {
  title: string;
  description: string;
  tips: string[];
}

export const adminHelp: Record<string, HelpEntry> = {
  dashboard: {
    title: "Dashboard",
    description:
      "Your home base. See upcoming shoots, recent inquiries, and a quick snapshot of how the studio is doing this month.",
    tips: [
      "Check here first thing each morning to see what needs your attention.",
      "The calendar widget shows your next 7 days at a glance.",
      "Click any card to jump straight to the full detail view.",
    ],
  },
  pages: {
    title: "Pages",
    description:
      "Build and edit the pages on your website using drag-and-drop blocks. Each block maps to a section visitors see on the live site.",
    tips: [
      "Use the Hero block for big, bold first impressions.",
      "Toggle 'isVisible' off to hide a section without deleting it.",
      "Save as draft first, then publish when you are happy with the preview.",
    ],
  },
  theme: {
    title: "Theme & Branding",
    description:
      "Control the look and feel of your site — colors, fonts, logos, and overall vibe. Changes here show up everywhere.",
    tips: [
      "Stick to two or three brand colors for a clean, consistent look.",
      "Upload your logo in SVG format for the sharpest display.",
      "Preview on mobile before saving — most visitors browse on their phones.",
    ],
  },
  typography: {
    title: "Typography",
    description:
      "Choose the fonts that represent your brand. Headings, body text, and accent fonts can each be set independently.",
    tips: [
      "Pair a serif heading font with a clean sans-serif body font for an editorial feel.",
      "Keep body text at 16px or larger for easy reading.",
      "Less is more — two fonts is usually plenty.",
    ],
  },
  media: {
    title: "Media Library",
    description:
      "All your images, videos, and files live here. Upload once, reuse anywhere across pages, galleries, and packages.",
    tips: [
      "Name files descriptively before uploading — it helps with search later.",
      "Compress large images to keep the site fast.",
      "Use the alt text field for accessibility and better SEO.",
    ],
  },
  galleries: {
    title: "Galleries",
    description:
      "Curate collections of your best work. Galleries show up on the site and give potential clients a feel for your style.",
    tips: [
      "Lead with your strongest image — it sets the tone.",
      "Group by event type or aesthetic for easy browsing.",
      "Update regularly so returning visitors always see something fresh.",
    ],
  },
  packages: {
    title: "Packages",
    description:
      "Define and price your service packages. These feed into quotes and invoices automatically.",
    tips: [
      "Give each package a clear, memorable name.",
      "Include a short description that tells clients exactly what they get.",
      "Mark your most popular package so it stands out on the site.",
    ],
  },
  inquiries: {
    title: "Inquiries",
    description:
      "Every message that comes in through your contact form lands here. Review, reply, and convert the good ones into leads.",
    tips: [
      "Respond within 24 hours — speed matters for bookings.",
      "Use the status field to track which inquiries you have replied to.",
      "Convert promising inquiries into leads to start the booking workflow.",
    ],
  },
  popups: {
    title: "Popups",
    description:
      "Create announcement banners and promotional popups for your site. Great for limited-time offers or important updates.",
    tips: [
      "Keep popup text short and action-oriented.",
      "Set a start and end date so popups turn off automatically.",
      "One popup at a time — you do not want to overwhelm visitors.",
    ],
  },
  discounts: {
    title: "Discount Codes",
    description:
      "Create promo codes your clients can apply to quotes and invoices. Set percentage or flat-dollar discounts with optional expiration dates.",
    tips: [
      "Use memorable codes like SUMMER25 or FIRSTBOOTH.",
      "Set usage limits to control how many times a code can be redeemed.",
      "Check the report section to see which codes are driving bookings.",
    ],
  },
  settings: {
    title: "Site Settings",
    description:
      "Global settings for your studio — business name, contact info, social links, SEO defaults, and more.",
    tips: [
      "Double-check your phone number and email — clients use these to reach you.",
      "Fill in the SEO fields so search engines show the right info.",
      "Update your timezone so all dates and times display correctly.",
    ],
  },
  users: {
    title: "Users",
    description:
      "Manage who has access to this admin panel. Add team members, set roles, and control permissions.",
    tips: [
      "Give each person their own account — never share logins.",
      "Use the Editor role for people who only need to update content.",
      "Remove accounts promptly when someone leaves the team.",
    ],
  },
  calendar: {
    title: "Calendar",
    description:
      "See all your shoots, consultations, and deadlines in one place. Drag events to reschedule or click to edit details.",
    tips: [
      "Color-code events by type so you can scan your week at a glance.",
      "Block out travel time before and after on-location shoots.",
      "Sync with Google Calendar to avoid double-bookings.",
    ],
  },
  leads: {
    title: "Leads & CRM",
    description:
      "Track every potential client from first contact to signed contract. Move leads through stages and never let one slip through the cracks.",
    tips: [
      "Add notes after every conversation so you remember context.",
      "Use the pipeline view to spot leads that have gone quiet.",
      "Set follow-up reminders so nothing falls off your radar.",
    ],
  },
  quotes: {
    title: "Quotes",
    description:
      "Build and send professional quotes to your clients. Pull in packages, add-ons, and discounts to create a clear breakdown.",
    tips: [
      "Personalize the intro line — a small touch goes a long way.",
      "Set an expiration date to create gentle urgency.",
      "Duplicate a past quote to save time on similar bookings.",
    ],
  },
  contracts: {
    title: "Contracts",
    description:
      "Generate contracts from templates, send for e-signature, and track signing status. Everything stays linked to the booking.",
    tips: [
      "Review your template once a quarter to keep terms current.",
      "Send the contract right after the quote is accepted while momentum is high.",
      "Store signed copies here so you always have a record.",
    ],
  },
  invoices: {
    title: "Invoices",
    description:
      "Create, send, and track invoices. See what has been paid, what is outstanding, and send friendly reminders.",
    tips: [
      "Set up automatic payment reminders to save yourself the awkward follow-up.",
      "Offer a deposit option so clients can lock in their date.",
      "Mark invoices as paid promptly to keep your records accurate.",
    ],
  },
  portal: {
    title: "Client Portal",
    description:
      "A private space where clients can view their quotes, contracts, invoices, and galleries. Less back-and-forth email for everyone.",
    tips: [
      "Share the portal link right after booking so clients feel taken care of.",
      "Upload galleries to the portal before announcing delivery.",
      "Keep the portal tidy — archive old projects when they are complete.",
    ],
  },
  questionnaires: {
    title: "Questionnaires",
    description:
      "Collect information from clients before a shoot — preferences, vision, must-have shots. Answers feed into the booking details.",
    tips: [
      "Keep questionnaires short — 8 to 10 questions is the sweet spot.",
      "Send the questionnaire at least a week before the event.",
      "Use the select field type when you want consistent, easy-to-scan answers.",
    ],
  },
  consultations: {
    title: "Consultations",
    description:
      "Schedule and manage discovery calls or planning sessions. Track notes, outcomes, and next steps in one place.",
    tips: [
      "Offer two or three time slots so clients can pick what works for them.",
      "Jot down notes right after the call while details are fresh.",
      "Link the consultation to the lead record so everything stays connected.",
    ],
  },
  team: {
    title: "Team",
    description:
      "Manage your crew — photographers, assistants, booth operators. Track availability, roles, and assignments.",
    tips: [
      "Keep headshots and bios updated — clients like knowing who they will meet.",
      "Tag team members with their specialties for quick assignment.",
      "Check availability before assigning someone to a new booking.",
    ],
  },
  equipment: {
    title: "Equipment",
    description:
      "Inventory of your gear — cameras, backdrops, booth setups, lighting kits. Know what you have and where it is.",
    tips: [
      "Log serial numbers for insurance purposes.",
      "Set a maintenance reminder for gear that needs regular upkeep.",
      "Note which equipment goes to each shoot so nothing gets left behind.",
    ],
  },
  automations: {
    title: "Automations",
    description:
      "Set up triggers that do things for you — send an email when a quote is accepted, create a task when a deposit lands, and more.",
    tips: [
      "Start simple: a welcome email on new lead is a great first automation.",
      "Test each automation with a dummy record before going live.",
      "Use the 'days before event' trigger for pre-shoot reminders.",
    ],
  },
  broadcasts: {
    title: "Broadcasts",
    description:
      "Send one-time emails to groups of clients — past clients, current leads, or everyone. Perfect for announcements and seasonal promos.",
    tips: [
      "Write a clear subject line — it is the main reason people open or skip.",
      "Schedule sends for Tuesday or Wednesday mornings for best open rates.",
      "Segment your audience so messages feel relevant, not spammy.",
    ],
  },
  reports: {
    title: "Reports",
    description:
      "See how the studio is performing — revenue, bookings, lead conversion, and more. Data helps you make smarter decisions.",
    tips: [
      "Check the monthly revenue chart to spot trends early.",
      "Compare lead sources to see where your best clients come from.",
      "Export data to a spreadsheet if you need to dig deeper.",
    ],
  },
};
