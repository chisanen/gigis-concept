import { getPayload } from "payload";
import config from "./payload.config";

async function seed() {
  const payload = await getPayload({ config });

  // Create admin user
  try {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@gigisconcept.com",
        password: "admin123",
        name: "Gigi",
        role: "admin",
      },
    });
    console.log("Admin user created: admin@gigisconcept.com");
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (msg.includes("duplicate") || msg.includes("unique")) {
      console.log("Admin user already exists");
    } else {
      console.error("Error creating admin:", msg);
    }
  }

  // Create testimonial
  try {
    await payload.create({
      collection: "testimonials",
      data: {
        quote:
          "My mom started crying! She loves it so much — thank you so much. You are amazing at what you do.",
        authorName: "Latoya E.",
        eventDescription: "60th Birthday Celebration",
        featured: true,
        sortOrder: 1,
      },
    });
    console.log("Testimonial created");
  } catch (e: unknown) {
    console.log("Testimonial may already exist");
  }

  // Update site settings
  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteName: "Gigi's Concept",
        tagline: "Content Creation & Luxury Photo Booth",
        contactEmail: "hello@gigisconcept.com",
        instagramUrl: "https://instagram.com",
        facebookUrl: "https://facebook.com",
        tiktokUrl: "https://tiktok.com",
        boothRatePerHour: 150,
        basicRatePerHour: 50,
        storytellerPrice: 450,
        shortEditPrice: 30,
        longEditPrice: 40,
        primaryColor: "#3A2D28",
        accentColor: "#76220B",
        backgroundColor: "#F8F5F1",
        defaultMetaTitle:
          "Gigi's Concept | Content Creation & Luxury Photo Booth — Dallas TX",
        defaultMetaDescription:
          "Editorial content and a timeless photo-booth experience in Dallas, Texas. Quietly crafted, beautifully delivered.",
      },
    });
    console.log("Site settings updated");
  } catch (e: unknown) {
    console.error("Error updating settings:", e instanceof Error ? e.message : e);
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed();
