// Builds the standalone pre-launch Coming Soon site into out-coming-soon/ (upload its contents to public_html/).
// Source: coming-soon/ (HTML, CSS, JS) + public/images (client artwork) + fonts. Content comes from src/content/site.json,
// so the phone, WhatsApp, name and URL have one source of truth. When the real site is ready, deploy out/ instead.
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { buildIcons } from './build-icons.mjs';

const siteDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(siteDir, 'coming-soon');
const out = join(siteDir, 'out-coming-soon');
const assets = join(out, 'assets');
const site = JSON.parse(readFileSync(join(siteDir, 'src', 'content', 'site.json'), 'utf8'));

const CREST = join(siteDir, 'public', 'images', 'baro-kuthi-crest-final.png'); // gold crest on transparent, 3334²
const POSTER = join(siteDir, 'public', 'images', 'coming-soon.jpeg'); // the client's coming-soon artwork (reference)
const STAMP = '#7A3526';
const NIGHT = '#2E1510';

for (const f of [CREST, POSTER, join(src, 'index.html')]) {
  if (!existsSync(f)) throw new Error(`build-coming-soon: missing ${f}`);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(join(assets, 'fonts'), { recursive: true });

const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);
const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ── Images ─────────────────────────────────────────────────────────────────────────────────────────
const trimmed = await sharp(CREST).trim({ threshold: 10 }).toBuffer(); // 2599 × 1571: crest without its empty margin
const crestWebp = await sharp(trimmed).resize({ width: 1300 }).webp({ quality: 84, alphaQuality: 90, effort: 6 }).toBuffer();
const crestName = `crest.${hash(crestWebp)}.webp`;
writeFileSync(join(assets, crestName), crestWebp);

// Favicons: the client's public/images/favicon.svg — the same icons the main site uses (scripts/build-icons.mjs).
await buildIcons(join(out, 'icons'));

// Share image (WhatsApp, Facebook, X): 1200 × 630, crest on the stamp ground.
const ogCrest = await sharp(trimmed).resize({ width: 820 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: STAMP } })
  .composite([{ input: ogCrest, gravity: 'centre' }])
  .flatten({ background: STAMP })
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(join(assets, 'og.jpg'));
copyFileSync(POSTER, join(assets, 'coming-soon-poster.jpg')); // the original artwork, kept for sharing

// ── Fonts (latin subsets of the brand faces + the Bengali tagline face) ──────────────────────────────
const brandFonts = join(siteDir, '..', 'design-system', 'fonts');
for (const f of ['cinzel-normal-latin.woff2', 'cormorant-garamond-normal-latin.woff2', 'cormorant-garamond-italic-latin.woff2']) {
  copyFileSync(join(brandFonts, f), join(assets, 'fonts', f));
}
copyFileSync(
  join(siteDir, 'node_modules', '@fontsource', 'noto-serif-bengali', 'files', 'noto-serif-bengali-bengali-500-normal.woff2'),
  join(assets, 'fonts', 'noto-serif-bengali-500.woff2'),
);

// ── CSS / JS (content-hashed names, so they can be cached for a year) ───────────────────────────────
const css = readFileSync(join(src, 'coming-soon.css'), 'utf8') + `\n:root { --crest-mask: url('/assets/${crestName}'); }\n`;
const cssName = `cs.${hash(css)}.css`;
writeFileSync(join(assets, cssName), css);
const js = readFileSync(join(src, 'coming-soon.js'), 'utf8');
const jsName = `cs.${hash(js)}.js`;
writeFileSync(join(assets, jsName), js);

// ── HTML ───────────────────────────────────────────────────────────────────────────────────────────
// Nine fanlight rays (18°…162°), drawn over the arch in the crest.
const rays = Array.from({ length: 9 }, (_, i) => {
  const a = ((18 + i * 18) * Math.PI) / 180;
  const p = (r) => `${(-Math.cos(a) * r).toFixed(2)} ${(-Math.sin(a) * r).toFixed(2)}`;
  return `<path d="M${p(10)} L${p(86)}" pathLength="1" style="--i:${i}"/>`;
}).join('');

// Contact links appear only once real numbers are in site.json (the spec's XXXXXXXXXX placeholders are hidden).
const real = (s) => s && !/X{4,}/i.test(s);
const links = [];
if (real(site.phone?.href)) links.push(`<a href="${escapeHtml(site.phone.href)}">Telephone the House</a>`);
if (real(site.email)) links.push(`<a href="mailto:${escapeHtml(site.email)}">Email the House</a>`);
if (real(site.whatsapp)) links.push(`<a href="${escapeHtml(site.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`);
const contacts = links.length ? `<p class="stamp__contact reveal" style="--d:8">${links.join('')}</p>` : '';

const jsonld = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.name,
  description: site.description,
  url: site.url,
  servesCuisine: site.servesCuisine,
  address: { '@type': 'PostalAddress', addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: site.address.country },
  ...(real(site.phone?.e164) ? { telephone: site.phone.e164 } : {}),
  sameAs: [site.banquetHref],
}).replace(/</g, '\\u003c');

const vars = {
  name: escapeHtml(site.name),
  description: escapeHtml('Coming soon to Paikpara, Kolkata: a restaurant in a zamindar’s house of 1823, serving the Bengali Table and the Sahib’s Table.'),
  url: site.url.replace(/\/$/, ''),
  banquetHref: escapeHtml(site.banquetHref),
  year: String(new Date().getFullYear()),
  crest: crestName,
  css: cssName,
  js: jsName,
  rays,
  contacts,
  jsonld,
};
let html = readFileSync(join(src, 'index.html'), 'utf8');
html = html.replace(/\{\{(\w+)\}\}/g, (m, k) => {
  if (!(k in vars)) throw new Error(`build-coming-soon: unknown placeholder ${m}`);
  return vars[k];
});
writeFileSync(join(out, 'index.html'), html);

// ── Server files ───────────────────────────────────────────────────────────────────────────────────
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n`);
writeFileSync(
  join(out, '.htaccess'),
  `# Coming Soon (pre-launch). Every address on the domain shows the coming-soon page.
# At launch, replace the contents of public_html/ with site/out/ — that build has its own .htaccess.
Options -Indexes
# Deploy bookkeeping written by GitHub Actions (FTP-Deploy-Action) — never served
<Files ".ftp-deploy-sync-state.json">
  Require all denied
</Files>
DirectoryIndex index.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  # Any page that does not exist yet (e.g. /menu/) → the coming-soon page, with a temporary redirect
  RewriteRule ^favicon\\.ico$ /icons/favicon-48.png [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_URI} !^/$
  RewriteRule ^ / [L,R=302]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  <FilesMatch "^cs\\.[0-9a-f]+\\.(css|js)$|^crest\\.[0-9a-f]+\\.webp$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(woff2|png|jpg)$">
    Header set Cache-Control "public, max-age=2592000"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml text/plain
</IfModule>
`,
);

console.log(`build-coming-soon: wrote ${out}`);
console.log(`  contact links: ${links.length ? 'shown' : 'hidden (site.json still has placeholder numbers)'}`);
