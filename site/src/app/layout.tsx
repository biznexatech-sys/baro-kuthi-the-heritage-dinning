import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { preload } from 'react-dom';
import './globals.css';
import { site } from '@/lib/content';
import { jsonLdScript, restaurantJsonLd } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyCallBar } from '@/components/layout/StickyCallBar';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { TextReveal } from '@/components/layout/TextReveal';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s · ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: true },
  // Source: public/images/favicon.svg → PNG sizes generated into public/icons/ by `npm run icons` (scripts/build-icons.mjs).
  icons: {
    icon: [
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#F6ECE2', // --parchment
  width: 'device-width',
  initialScale: 1,
};

/**
 * The shell every route shares (§10): header → page → footer, plus the mobile Call | WhatsApp bar.
 * The pre-launch Coming Soon page is a separate static build (site/coming-soon/), not part of this app.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  // Self-hosted fonts (design-system/fonts, synced to public/fonts). Preload the two faces above the fold.
  preload('/fonts/cormorant-garamond-normal-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  preload('/fonts/cinzel-normal-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

  return (
    <html lang="en-IN">
      <body>
        <a className="pg-skip" href="#main">
          Skip to content
        </a>
        <Header phone={site.phone} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer address={site.address.lines} mapHref={site.mapHref} hours={site.hours} gettingHere={site.gettingHere} banquetHref={site.banquetHref} phone={site.phone} email={site.email} />
        <StickyCallBar phoneHref={site.phone.href} whatsappHref={site.whatsapp} />
        <SmoothScroll />
        <TextReveal />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(restaurantJsonLd())} />
      </body>
    </html>
  );
}
