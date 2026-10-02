import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export const dynamic = 'force-static';

/** Web app manifest — the home-screen icon on Android. Icons come from public/images/favicon.svg via `npm run icons`. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: '#F6ECE2', // --parchment
    theme_color: '#5E2E27', // --terracotta-deep
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
