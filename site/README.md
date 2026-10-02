# site/ — Baro Kuthi production website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Lenis — exported as static HTML for Hostinger.
Architecture: [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md).

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Syncs the design system, then serves http://localhost:3000 |
| `npm run build` | Syncs the design system, then writes the static site to `out/` |
| `npm run start` | Serves `out/` locally to check the exported build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run sync:ds` | Copies `../design-system` CSS → `src/styles/ds/` and fonts → `public/fonts/` |

Requires Node 20.9 or later.

## Where things go

| To change… | Edit |
|---|---|
| Words, prices, phone, hours, rooms, reviews, history | `src/content/*.json` ([what is still sample](src/content/README.md)) |
| Colours, type, spacing, a component's look | `../design-system/` (tokens or component CSS), then rebuild |
| Phone-size layout of a component | `src/styles/responsive.css` (keep in step with the design system's `.bk-compact` rules) |
| Page composition (which sections, in what order) | `src/app/**/page.tsx` |
| Photographs | `public/images/` + an `image` field in the content JSON |
| **Favicon / app icon** (every page, both builds) | Replace `public/images/favicon.svg` only. `npm run icons` (runs before every dev and build) generates the PNG sizes into `public/icons/`; never edit those |
| Motif SVGs (crest, railing, alpana …) | `public/motifs/` + the component's motif prop |
| SEO metadata, structured data | `src/lib/seo.ts` |
| Apache rules, caching, headers | `public/.htaccess` |

## Before launch: the Coming Soon page

While the website is being finished, the domain shows a standalone **Coming Soon** page: the client's stamp
artwork (`public/images/coming-soon.jpeg`) rebuilt in HTML, with an animated loading screen made from the crest
(`public/images/baro-kuthi-crest-final.png`). Its source is in `coming-soon/`. It is separate from the Next.js app,
so none of the unfinished pages are ever uploaded.

| Command | Does |
|---|---|
| `npm run build:coming-soon` | Writes the Coming Soon site to `out-coming-soon/` |
| `npm run preview:coming-soon` | Builds it and serves it at http://localhost:4000 |

**Deploy now:** upload **the contents of** `out-coming-soon/` (including `.htaccess`) to `public_html/`.
Every address on the domain (`/`, `/menu/`, …) shows the Coming Soon page.

- The loading screen plays once per browser session (Skip button or Esc ends it). It never plays with reduced motion.
- Telephone and WhatsApp buttons appear automatically once real numbers replace the `XXXXXXXXXX` placeholders
  in `src/content/site.json`. Rebuild after editing.
- Replay the loading screen by opening the page in a new tab or a private window.

## Launch: switch to the full website

1. `npm run build`
2. In Hostinger's File Manager, empty `public_html/` (this removes the Coming Soon files and their `.htaccess`).
3. Upload **the contents of** `out/` (including `.htaccess`) to `public_html/`.
4. Open the site on a phone and test the Call and WhatsApp buttons.

Nothing in the main site depends on the Coming Soon files. After launch, `coming-soon/` and
`scripts/build-coming-soon.mjs` can be deleted.

## House rules (from DESIGN.md)

- The CTA is always **"Reserve by Telephone"**. No booking forms, no pop-ups.
- No exclamation marks, no emoji, no invented reviews or history.
- Never two dark bands next to each other; every page ends with the reservation card, then the footer.
- Never hard-code content or colours in components.
