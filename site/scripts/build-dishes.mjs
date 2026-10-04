// Signature-dish photographs. Drop a photo into  public/images/signature dish/  named after the dish exactly as it
// appears on the menu, e.g. "Kosha Mangsho.png" or "Bhetki Paturi.jpg" (png, jpg, jpeg or webp; any size).
// This script makes a 640 × 640 WebP of each into public/images/dishes/<slug>.webp and writes
// src/content/dish-images.json, which the home page uses to put each photo on its dish card.
// Matching ignores case, spaces and punctuation, so "The Rajbari Thali Aamish.png" matches "The Rajbari Thali · Aamish".
//
// Runs before `npm run dev` and `npm run build`; run `npm run dishes` after adding a photo while the dev server is up.
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, extname, join, parse, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(siteDir, 'public', 'images', 'signature dish');
const OUT = join(siteDir, 'public', 'images', 'dishes');
const MAP = join(siteDir, 'src', 'content', 'dish-images.json');
const EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

/** "The Rajbari Thali · Aamish" → "the-rajbari-thali-aamish" (same rule as signatureDishes in src/lib/content.ts). */
export const slug = (s) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

mkdirSync(OUT, { recursive: true });
const sources = existsSync(SOURCE) ? readdirSync(SOURCE).filter((f) => EXTS.has(extname(f).toLowerCase())) : [];

const map = {};
const keep = new Set();
let made = 0;
for (const file of sources) {
  const key = slug(parse(file).name);
  if (!key) continue;
  const src = join(SOURCE, file);
  const out = join(OUT, `${key}.webp`);
  keep.add(`${key}.webp`);
  map[key] = `/images/dishes/${key}.webp`;
  if (existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs) continue;
  await sharp(src).rotate().resize(640, 640, { fit: 'cover', position: 'attention' }).webp({ quality: 80 }).toFile(out);
  made++;
}

// Remove WebPs whose source photo has been deleted or renamed.
for (const f of readdirSync(OUT)) if (!keep.has(f)) rmSync(join(OUT, f));

const json = JSON.stringify(map, null, 2) + '\n';
if (!existsSync(MAP) || readFileSync(MAP, 'utf8') !== json) writeFileSync(MAP, json);
console.log(`dishes: ${sources.length} photo(s) in "signature dish", ${made} converted → public/images/dishes/`);
