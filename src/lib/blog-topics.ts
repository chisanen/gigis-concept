export const blogTopics = {
  wedding: [
    "Top 10 Dallas Wedding Photo Booth Ideas for Your Dream Reception",
    "How to Choose the Perfect Wedding Content Creator in Dallas TX",
    "Dallas Wedding Trends: Luxury Photo Booths That Wow Your Guests",
    "Why Every Dallas Wedding Needs Professional Content Creation",
    "Nigerian-American Wedding Photography Tips for Dallas Couples",
    "Best Wedding Venues in Dallas for Photo Booth Setups",
    "How to Make Your Dallas Wedding Go Viral on Social Media",
    "Wedding Photo Booth vs Traditional Photographer: Why You Need Both",
    "Creating Timeless Wedding Content That Lasts a Lifetime",
    "The Ultimate Guide to Planning a Luxury Wedding in Dallas Texas",
  ],
  events: [
    "How to Plan a Luxury Birthday Celebration in Dallas TX",
    "Corporate Event Photo Booth Ideas That Impress in Dallas",
    "Dallas Event Planning: Content Creation Tips for Memorable Events",
    "Baby Shower Photo Booth Ideas for Dallas Moms-to-Be",
    "Graduation Party Content Creation: Capturing Milestones in Dallas",
    "Anniversary Celebration Ideas with Photo Booth in Dallas TX",
    "How to Document Your Dallas Event Like a Pro",
    "Event Social Media Strategy: Tips from a Dallas Content Creator",
    "Planning a Milestone Birthday Party in Dallas: A Complete Guide",
    "Why Dallas Event Planners Recommend Photo Booths",
  ],
  "photo-booth": [
    "Why Every Dallas Event Needs a Luxury Photo Booth",
    "Photo Booth Trends 2026: What Dallas Event Hosts Need to Know",
    "How to Choose the Best Photo Booth Rental in Dallas TX",
    "Luxury Photo Booth Experience: What Makes Gigi's Concept Different",
    "Photo Booth Props and Backdrops: Elevating Your Dallas Event",
    "Instant Prints vs Digital Gallery: Photo Booth Options in Dallas",
    "The Rise of Cinematic Photo Booths at Dallas Weddings",
    "Custom Photo Booth Backdrops for Dallas Corporate Events",
    "Photo Booth Etiquette: Making the Most of Your Dallas Event",
    "Open Air vs Enclosed Photo Booths: Which Is Right for Your Dallas Event",
  ],
  "content-creation": [
    "Finding the Right Wedding Content Editor in Dallas TX",
    "Event Social Media Editors: Why Dallas Brands Need One",
    "Behind the Scenes: A Content Creation Day at Gigi's Concept",
    "How to Prepare for a Brand Content Shoot in Dallas",
    "Social Media Content Strategy for Dallas Small Businesses",
    "Short-Form vs Long-Form Video: What Dallas Brands Should Know",
    "Content Creation Packages: What to Expect from a Dallas Studio",
    "How Dallas Influencers Use Professional Content Creation",
    "The Importance of Editorial Content for Your Dallas Brand",
    "Content Creation for Weddings: Capturing Your Dallas Love Story",
  ],
};

export function getNextTopic(): { topic: string; category: string } {
  const cats = Object.keys(blogTopics) as (keyof typeof blogTopics)[];
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const catIndex = dayOfYear % cats.length;
  const category = cats[catIndex];
  const topics = blogTopics[category];
  const topicIndex = Math.floor(dayOfYear / cats.length) % topics.length;
  return { topic: topics[topicIndex], category };
}
