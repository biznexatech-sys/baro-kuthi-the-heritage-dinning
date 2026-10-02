import type { Metadata } from 'next';
import { menu, site } from './content';

/** Per-page metadata: title, description, canonical URL and Open Graph. Paths end in '/' (trailingSlash export). */
export function pageMetadata({ title, description, path }: { title?: string; description?: string; path: string }): Metadata {
  const desc = description || site.description;
  return {
    title: title ?? { absolute: site.name },
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: title ? `${title} · ${site.shortName}` : site.name,
      description: desc,
      url: path,
      locale: 'en_IN',
    },
  };
}

function abs(path: string) {
  return new URL(path, site.url).toString();
}

/** DESIGN.md §16 — `Restaurant` JSON-LD, built only from content/site.json. */
export function restaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    servesCuisine: site.servesCuisine,
    acceptsReservations: true,
    hasMenu: abs('/menu/'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.lines.join(', '),
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: site.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        name: h.label,
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: [site.banquetHref],
  };
}

const priceOf = (p?: number | string) => (p == null ? undefined : String(p).replace(/[^\d.]/g, ''));

/** DESIGN.md §16 — `Menu` JSON-LD, built from content/menu.json (prices never live in code). */
export function menuJsonLd() {
  const sections = [...menu.tables, menu.sets, menu.verandah];
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${site.shortName} — The Menu`,
    url: abs('/menu/'),
    inLanguage: 'en',
    hasMenuSection: sections.map((s) => ({
      '@type': 'MenuSection',
      name: s.title,
      description: s.subtitle,
      hasMenuItem: s.items.map((it) => ({
        '@type': 'MenuItem',
        name: it.name,
        description: it.description,
        ...(it.price != null ? { offers: { '@type': 'Offer', price: priceOf(it.price), priceCurrency: 'INR' } } : {}),
      })),
    })),
  };
}

/** Serialises JSON-LD safely for an inline <script>. */
export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\\u003c') };
}
