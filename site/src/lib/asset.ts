/**
 * Cache-busting for images that keep their name when replaced (slide1.webp, the dish photos, the logo …).
 * The server lets browsers keep images for 30 days (public/.htaccess), so a swapped file would otherwise stay stale on
 * devices that visited before. `v('/images/slide1.webp')` → '/images/slide1.webp?v=3f9a2c1b', where the hash is taken
 * from the file's contents at build time: replace the file and its URL changes, so every device fetches the new one.
 *
 * Server-side only (reads public/ from disk) — call it in pages, layouts and content.ts, and pass the result as props.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const cache = new Map<string, string>();

export function v(src: string | undefined): string | undefined {
  if (!src || !src.startsWith('/') || src.includes('?')) return src;
  const hit = cache.get(src);
  if (hit && process.env.NODE_ENV === 'production') return hit;
  try {
    const file = join(process.cwd(), 'public', decodeURI(src));
    const hash = createHash('md5').update(readFileSync(file)).digest('hex').slice(0, 8);
    const out = `${src}?v=${hash}`;
    cache.set(src, out);
    return out;
  } catch {
    return src;
  }
}
