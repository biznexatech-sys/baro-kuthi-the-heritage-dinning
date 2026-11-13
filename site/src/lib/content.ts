// Typed access to src/content/*.json. Assigning each file to its type makes a missing or misspelt key a build error.
import { v } from '@/lib/asset';
import siteJson from '@/content/site.json';
import menuJson from '@/content/menu.json';
import coursesJson from '@/content/courses.json';
import roomsJson from '@/content/rooms.json';
import signatureJson from '@/content/signature.json';
import dishImagesJson from '@/content/dish-images.json';
import reviewsJson from '@/content/reviews.json';
import storyJson from '@/content/story.json';
import occasionsJson from '@/content/occasions.json';
import faqsJson from '@/content/faqs.json';
import houseJson from '@/content/house.json';

export type Phone = { display: string; href: string; e164: string };
export type LabelValue = { label: string; value: string };
export type Hours = LabelValue & { opens?: string; closes?: string };
export type Action = { label: string; href: string };

export type Site = {
  social?: { label: string; href: string }[];
  name: string;
  shortName: string;
  url: string;
  description: string;
  phone: Phone;
  whatsapp: string;
  email: string;
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

/** One line of the printed menu: Bengali name, portion (as printed, e.g. "২ পিস"), English name, price.
 *  Thalis add a Bengali `note`; the special thalis add a `priceLabel` (as printed) and their `courses`. */
export type MenuItem = { bn: string; qty?: string; en?: string; price?: number; priceLabel?: string; note?: string; courses?: string[] };
export type MenuSection = { bn?: string; en?: string; columns?: number; items: MenuItem[] };
export type MenuCategory = {
  id: string;
  /** English label for navigation (the printed category titles are Bengali). */
  label: string;
  bn: string;
  en?: string;
  /** Sketch from the printed menu, in /images/menu/<name>.webp. */
  illustration?: string;
  intro?: { bnTitle?: string; bn?: string; en?: string };
  footnotes?: string[];
  sections: MenuSection[];
};
/** The printed menu's text pages (the house introduction, the stories behind the room names) — shown on the Rooms page. */
export type HousePage = {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  closing?: { title: string; line: string };
  entries?: { bn: string; en: string; text: string }[];
};
export type Menu = { currency: string; gstNote: string; source?: string; categories: MenuCategory[] };
/** The shape the open-book component (home page) and the dish cards read. */
export type MenuBookItem = { id?: string; name: string; price?: number | string; description?: string; speciality?: boolean };
export type MenuBookPage = { title: string; tab?: string; subtitle?: string; items: MenuBookItem[] };

export type Course = { numeral: string; name: string; note: string; image?: string; imageAlt?: string; icon?: string };

export type Room = {
  slug: string;
  name: string;
  /** The room's name in Bengali, as on the house's own room cards. */
  bn?: string;
  eyebrow: string;
  description: string;
  image?: string;
  imageAlt: string;
  /** The room's story (Bengali), one string per paragraph. */
  paragraphs?: string[];
  text?: string;
  capacity?: string;
  best?: string;
  occasions?: string;
};

/** `rating` (1–5) only when the source review shows one — stars are never shown otherwise. */
export type Review = { date?: string; quote: string; name: string; href?: string; source?: string; rating?: number };

export type Chapter = { year: string; title: string; image?: string; imageAlt: string; draft?: boolean; quote?: string; body: string[] };
export type Story = { homeExcerpt: string; chapters: Chapter[] };

export type OccasionItem = { title: string; text: string; icon?: string; image?: string; imageAlt?: string };
export type OccasionDetail = { title: string; slug: string; eyebrow: string; image?: string; imageAlt: string; text: string; facts?: LabelValue[] };
export type Step = { numeral: string; title: string; text: string };
export type Occasions = { band: OccasionItem[]; details: OccasionDetail[]; steps: Step[] };

export type Faq = { q: string; a: string };

export const site: Site = siteJson;
export const menu: Menu = menuJson;
export const housePages: HousePage[] = houseJson.pages;
export const courses: Course[] = coursesJson;
export const rooms: Room[] = roomsJson.map((r: Room) => ({ ...r, image: v(r.image) }));
export const reviews: Review[] = reviewsJson;
export const story: Story = storyJson;
export const occasions: Occasions = {
  ...occasionsJson,
  band: occasionsJson.band.map((o: OccasionItem) => ({ ...o, image: v(o.image) })),
  details: occasionsJson.details.map((o: OccasionDetail) => ({ ...o, image: v(o.image) })),
};
export const faqs: Faq[] = faqsJson;

/** Every item on the menu with its category and section, in printed order. */
export const menuItems = menu.categories.flatMap((c) => c.sections.flatMap((sec) => sec.items.map((item) => ({ item, category: c, section: sec }))));

/** "মোচার চপ" + "২ পিস" → "মোচার চপ (২ পিস)" — the Bengali line as printed. */
export const bnLine = (i: MenuItem) => (i.qty ? `${i.bn} (${i.qty})` : i.bn);

/** A menu category as open-book pages (English name, the Bengali line beneath, price). */
export function menuBookPage(id: string, tab?: string): MenuBookPage {
  const c = menu.categories.find((x) => x.id === id);
  if (!c) return { title: id, items: [] };
  return {
    title: c.en || c.label,
    tab: tab || c.label,
    subtitle: c.bn,
    items: c.sections.flatMap((sec) => sec.items).map((i) => ({ name: i.en || i.bn, description: i.note || bnLine(i), price: i.price })),
  };
}

/** A signature dish resolved against the menu: its section, the Bengali line, and its photograph if one has been added
 *  to public/images/signature dish/ (see scripts/build-dishes.mjs). `photo` names the photo file when it differs. */
export type SignatureDish = MenuBookItem & { table: string; image?: string };
const dishSlug = (s: string) =>
  s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const dishImages: Record<string, string> = dishImagesJson;
/** The photograph for any dish on the menu, if one has been added to public/images/signature dish/ (versioned URL). */
export const dishImage = (name: string) => v(dishImages[dishSlug(name)]);
export const signatureDishes: SignatureDish[] = (signatureJson.dishes as { name: string; photo?: string; image?: string }[]).flatMap((d) => {
  const hit = menuItems.find((m) => m.item.en === d.name);
  if (!hit) return [];
  const { item, category, section } = hit;
  return [
    {
      name: item.en || item.bn,
      description: bnLine(item),
      price: item.price,
      table: section.en || category.en || category.label,
      image: v(d.image || dishImages[dishSlug(d.photo || d.name)]),
    },
  ];
});
