import type { MetadataRoute } from 'next';
import { site } from '@/lib/content';

export const dynamic = 'force-static';

const ROUTES = ['/', '/story/', '/menu/', '/rooms/', '/occasions/', '/visit/'];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: new URL(path, site.url).toString(),
    changeFrequency: path === '/menu/' ? 'monthly' : 'yearly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
