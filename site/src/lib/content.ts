// Typed access to src/content/*.json. Assigning each file to its type makes a missing or misspelt key a build error.
import siteJson from '@/content/site.json';
import menuJson from '@/content/menu.json';
import coursesJson from '@/content/courses.json';
import roomsJson from '@/content/rooms.json';
import reviewsJson from '@/content/reviews.json';
import storyJson from '@/content/story.json';
import occasionsJson from '@/content/occasions.json';
import faqsJson from '@/content/faqs.json';

export type Phone = { display: string; href: string; e164: string };
export type LabelValue = { label: string; value: string };
export type Hours = LabelValue & { opens?: string; closes?: string };
export type Action = { label: string; href: string };

export type Site = {
  name: string;
  shortName: string;
  url: string;
  description: string;
  phone: Phone;
  whatsapp: string;
  address: { lines: string[]; short: string; locality: string; region: string; country: string };
  mapHref: string;
  mapEmbed: string;
  hoursLine: string;
  hours: Hours[];
  gettingHere: LabelValue[];
  banquetHref: string;
  menuPdf: string | null;
  servesCuisine: string[];
};

export type MenuItem = { id?: string; name: string; price?: number | string; description?: string; speciality?: boolean };
export type MenuPage = { title: string; tab?: string; subtitle?: string; items: MenuItem[] };
export type Menu = { currency: string; tables: MenuPage[]; sets: MenuPage; verandah: MenuPage; seasonalNote: string };

export type Course = { numeral: string; name: string; note: string; image?: string; imageAlt?: string; icon?: string };

export type Room = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image?: string;
  imageAlt: string;
  capacity: string;
  best: string;
  occasions: string;
  text: string;
};

/** `rating` (1–5) only when the source review shows one — stars are never shown otherwise. */
export type Review = { date?: string; quote: string; name: string; href?: string; source?: string; rating?: number };

export type Chapter = { year: string; title: string; image?: string; imageAlt: string; draft?: boolean; quote?: string; body: string[] };
export type Story = { homeExcerpt: string; chapters: Chapter[] };

export type OccasionItem = { title: string; text: string; icon?: string };
export type OccasionDetail = { title: string; eyebrow: string; image?: string; imageAlt: string; text: string };
export type Step = { numeral: string; title: string; text: string };
export type Occasions = { band: OccasionItem[]; details: OccasionDetail[]; steps: Step[] };

export type Faq = { q: string; a: string };

export const site: Site = siteJson;
export const menu: Menu = menuJson;
export const courses: Course[] = coursesJson;
export const rooms: Room[] = roomsJson;
export const reviews: Review[] = reviewsJson;
export const story: Story = storyJson;
export const occasions: Occasions = occasionsJson;
export const faqs: Faq[] = faqsJson;
