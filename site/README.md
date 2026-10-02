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

## Auto-deploy (GitHub Actions)

Every push to `main` builds and deploys to Hostinger through `.github/workflows/deploy.yml`.
You can also run it by hand: GitHub → **Actions → Deploy to Hostinger → Run workflow**.

| `SITE_MODE` | Public domain shows | Team preview subdomain |
|---|---|---|
| `coming-soon` (default) | Coming Soon only, on every address | Full website, password-protected, hidden from Google |
| `live` | Full website | Left as it was (can be deleted) |

### One-time setup

**1. Hostinger (hPanel)**
- **FTP:** Files → FTP Accounts → note the **FTP IP / host**, **username** and **password** (reset it if you don't know it).
  Check which folder the FTP account opens in: for the main account it is normally the domain's `public_html`.
- **Preview subdomain:** Domains → Subdomains → create `preview` (→ `preview.barokuthirajbariheritagedining.com`).
  Note the folder it uses, e.g. `public_html/preview`. Turn on SSL for it (Security → SSL).
- **Absolute path:** open that folder in File Manager and copy the full path shown at the top, e.g.
  `/home/u123456789/domains/barokuthirajbariheritagedining.com/public_html/preview`.

**2. GitHub → repository → Settings → Secrets and variables → Actions**

| Kind | Name | Value |
|---|---|---|
| Secret | `FTP_SERVER` | FTP host / IP from hPanel |
| Secret | `FTP_USERNAME` | FTP username |
| Secret | `FTP_PASSWORD` | FTP password |
| Secret | `PREVIEW_PASSWORD` | Team preview password (10+ characters) |
| Secret | `PREVIEW_USER` | *(optional)* preview login name — default `team` |
| Variable | `SITE_MODE` | `coming-soon` |
| Variable | `FTP_PREVIEW_DIR` | Preview folder **relative to the FTP login folder**, ending in `/` — e.g. `preview/` |
| Variable | `PREVIEW_HTPASSWD_PATH` | Absolute path from step 1 + `/.htpasswd`, e.g. `/home/u123456789/domains/barokuthirajbariheritagedining.com/public_html/preview/.htpasswd` |
| Variable | `FTP_SITE_DIR` | *(optional)* public folder relative to the FTP login folder — default `./` |
| Variable | `FTP_PROTOCOL` / `FTP_SECURITY` | *(optional)* default `ftps` / `strict`. If the run fails with a certificate error, set `FTP_SECURITY` to `loose`; if FTPS is refused, set `FTP_PROTOCOL` to `ftp` |

Until the FTP secrets exist the workflow still builds and type-checks the site but deploys nothing (yellow warning).

**3. First run** — Actions → Deploy to Hostinger → Run workflow. Then check:
the domain shows Coming Soon; `preview.` asks for the password and then shows the full site.

### Safety built in
- The preview is never uploaded without a password: the run fails if `PREVIEW_PASSWORD` or `PREVIEW_HTPASSWD_PATH` is missing.
- The public deploy never touches the preview folder, and vice versa.
- Each deploy uploads only changed files and removes files it uploaded earlier that no longer exist
  (it remembers them in `.ftp-deploy-sync-state.json`, which `.htaccess` keeps private).
- Deploys never run on top of each other.

## Launch: switch to the full website

**With auto-deploy:** GitHub → Settings → Secrets and variables → Actions → Variables → set `SITE_MODE` to `live`,
then run the workflow (or push). The public domain switches from Coming Soon to the full website; the old Coming
Soon files are removed automatically. Delete the preview subdomain afterwards if you no longer need it.

**By hand (without GitHub):**

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
