# BARO KUTHI RAJ BARI — The Heritage Dining

The website for **BARO KUTHI RAJ BARI — The Heritage Dining**, a restaurant in a zamindar's mansion in Paikpara,
Kolkata (est. 1823). Tables are reserved **by telephone and WhatsApp only**.

## Repository

| Folder | What | Start here |
|---|---|---|
| [`site/`](site/) | **Production website**: Next.js static export for Hostinger | [`site/README.md`](site/README.md) |
| [`design-system/`](design-system/) | Brand source of truth: tokens, fonts, reference components, guidelines, prototypes | [`design-system/readme.md`](design-system/readme.md) |
| [`docs/`](docs/) | Architecture | [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) |

The brand spec is [`design-system/uploads/DESIGN.md`](design-system/uploads/DESIGN.md). Every design decision comes
from it.

## Quick start

```bash
cd site
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in site/out/ — upload its contents to public_html/
```

The site copies the design system's CSS and fonts at build time (`npm run sync:ds`), so style changes are made in
`design-system/` and content changes in `site/src/content/`.

## Before launch

Phone numbers, prices, hours, history and reviews are still **sample content**, and no photography or artwork has
been supplied yet. See [`site/src/content/README.md`](site/src/content/README.md) and the open-items table in
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md#10-open-items-before-launch).
