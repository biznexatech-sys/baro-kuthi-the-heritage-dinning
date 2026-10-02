// Favicon pipeline. The ONE source is public/images/favicon.svg (supplied by the client) — replace that file to change
// the icon everywhere. This script derives the PNG sizes that browsers and phones need (iOS and Android ignore SVG icons)
// and writes them, with a copy of the SVG, into a target folder:
//   favicon.svg · favicon-32.png · favicon-48.png · apple-touch-icon.png (180) · icon-192.png · icon-512.png
//
// Used by: `npm run icons` (main site → public/icons/, before dev and build) and scripts/build-coming-soon.mjs.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const FAVICON_SOURCE = join(siteDir, 'public', 'images', 'favicon.svg');

export const ICON_FILES = {
  svg: 'favicon.svg',
  png32: 'favicon-32.png',
  png48: 'favicon-48.png',
  apple: 'apple-touch-icon.png',
  png192: 'icon-192.png',
  png512: 'icon-512.png',
};

/**
 * The supplied SVG wraps a raster image. When it does, rasterise from that embedded image directly: it is sharper
 * than re-rendering the SVG and avoids the SVG's thin white edge. Otherwise render the SVG itself.
 */
async function sourceImage(svgPath) {
  const svg = readFileSync(svgPath, 'utf8');
  const embedded = svg.match(/<image\b[^>]*?(?:xlink:)?href="data:image\/(?:png|jpe?g|webp);base64,([^"]+)"/i);
  if (embedded) return sharp(Buffer.from(embedded[1], 'base64'));
  return sharp(Buffer.from(svg), { density: 1200 });
}

export async function buildIcons(outDir) {
  if (!existsSync(FAVICON_SOURCE)) throw new Error(`build-icons: ${FAVICON_SOURCE} not found — the favicon source is required.`);
  mkdirSync(outDir, { recursive: true });
  copyFileSync(FAVICON_SOURCE, join(outDir, ICON_FILES.svg));
  const master = await (await sourceImage(FAVICON_SOURCE)).resize(1024, 1024, { fit: 'cover' }).png().toBuffer();
  const sizes = [
    [ICON_FILES.png32, 32],
    [ICON_FILES.png48, 48],
    [ICON_FILES.apple, 180],
    [ICON_FILES.png192, 192],
    [ICON_FILES.png512, 512],
  ];
  for (const [file, size] of sizes) {
    await sharp(master).resize(size, size, { kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(join(outDir, file));
  }
  return outDir;
}

// CLI: node scripts/build-icons.mjs [outDir]  (default: public/icons)
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const out = resolve(process.argv[2] || join(siteDir, 'public', 'icons'));
  await buildIcons(out);
  console.log(`build-icons: ${Object.keys(ICON_FILES).length} icons from public/images/favicon.svg → ${out}`);
}
