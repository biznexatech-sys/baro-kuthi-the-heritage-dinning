# DESIGN.md — BARO KUTHI RAJ BARI · The Heritage Dining

> The single source of truth for design and layout. Every page, component and asset must follow this file.
> If something is not covered here, decide it in the spirit of Section 1, then add it to this file.

**Domain:** www.barokuthirajbaritheheritagedining.com
**Telephone:** +91 82403 83737 · **Email:** barokuthi.theheritagedining@gmail.com
**Stack:** Next.js (static export) · Tailwind CSS · GSAP + ScrollTrigger · Lenis · Hostinger shared hosting
**Booking model:** Telephone and WhatsApp only. There is no online booking system.
**Language:** English only.

---

## 1. Concept & Principles

### Concept: "An Invitation to the Rajbari Table"
The site is an evening at a zamindar's mansion in 1880s Calcutta:
**Invitation → Gate → Courtyard → The Table → The Courses → The Rooms → Guest Book → Reservation.**

### Principles
1. **Heritage, not theme park.** Motifs come from the real building and real Bengali dining ritual. Never use cartoon, clip-art or "ethnic" stock ornaments.
2. **Restraint is luxury.** Use 70% parchment, 25% terracotta and 5% copper. Each section gets one or two motifs at most.
3. **Slow and deliberate.** Nothing bounces, pops or rushes. Motion feels like a shutter opening or a page turning.
4. **Real, never generic.** Use only real photos, real reviews, real history and hand-drawn illustration. No stock images and no made-up testimonials.
5. **The telephone is the hero CTA.** Booking by phone is presented as personal and exclusive, not as a missing feature.
6. **Sharp and framed.** Frames have square corners and hairline borders. The only curves are architectural arches.

---

## 2. Colour Tokens

| Token | Hex | Role |
|---|---|---|
| `--terracotta` | `#924B3F` | Primary brand colour: headings, buttons, key text, terracotta bands |
| `--terracotta-deep` | `#5E2E27` | Footer, dark bands, overlays, hover state of terracotta buttons |
| `--ink` | `#3A1F1A` | Long body text (menu descriptions, story paragraphs) |
| `--copper` | `#D7A680` | Ornaments, hairlines, frames, dividers, icons; text only on dark backgrounds |
| `--parchment` | `#F6ECE2` | Default page background |
| `--parchment-dark` | `#EBDCCD` | Alternate section background, card fill |
| `--glow` | `#FFCC99` | Rare highlight: candle-glow gradients, active state dot. Max one use per screen |
| `--white` | `#FFFFFF` | Text on terracotta buttons only |

### Contrast rules (WCAG, calculated)
| Pair | Ratio | Allowed use |
|---|---|---|
| Ink on parchment | ~13:1 | All body text ✅ |
| Terracotta on parchment | ~5.5:1 | Headings, body, links ✅ |
| White on terracotta | ~6.4:1 | Button text ✅ |
| Parchment on terracotta-deep | ~9.5:1 | Footer text ✅ |
| Copper on terracotta-deep | ~5.1:1 | Labels and small text on dark ✅ |
| Copper on terracotta | ~2.9:1 | Large display text (≥ 32px) and ornaments only ⚠️ |
| Copper on parchment | ~1.9:1 | **Never text.** Lines and ornaments only ❌ |

### Colour ratios per section type
- **Light section:** parchment background, terracotta headings, ink body, copper hairlines.
- **Dark band:** terracotta or terracotta-deep background, parchment text, copper ornaments.
- Never place two dark bands next to each other. Always alternate light, then dark.

---

## 3. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / logo / section titles | **Cinzel** | 400, 600 | Uppercase, tracked |
| Body, menu, quotes | **Cormorant Garamond** | 400, 500, 600, italic 400 | Main reading font |
| Labels / eyebrows / buttons | Cormorant Garamond **small caps** | 600 | `font-variant: all-small-caps`, tracking 0.18em |

Load both fonts with `next/font/google` (self-hosted at build time). No other fonts are allowed. No sans-serif anywhere.

### Type scale (desktop / mobile)
| Token | Desktop | Mobile | Font | Line height | Tracking |
|---|---|---|---|---|---|
| `display` | 72px | 40px | Cinzel 400 | 1.05 | 0.06em |
| `h1` | 56px | 34px | Cinzel 400 | 1.1 | 0.05em |
| `h2` | 40px | 28px | Cinzel 400 | 1.15 | 0.04em |
| `h3` | 28px | 22px | Cormorant 600 | 1.2 | 0.01em |
| `eyebrow` | 14px | 13px | Cormorant 600 small caps | 1.4 | 0.22em |
| `lead` | 24px | 20px | Cormorant 400 italic | 1.5 | 0 |
| `body` | 20px | 18px | Cormorant 400 | 1.65 | 0.005em |
| `small` | 16px | 15px | Cormorant 500 | 1.5 | 0.01em |
| `button` | 15px | 15px | Cormorant 600 small caps | 1 | 0.2em |

Cormorant runs small, so body text is never below 18px.

### Typographic conventions
- **Roman numerals** for sections and courses: `I · THE GATE`, `COURSE IV — MAACHH`.
- **Menu leaders:** dish name ····· price, using dotted leaders drawn in copper.
- Dish descriptions are *italic*, in ink, at 18px.
- Use proper typographic quotes (“ ”) and en/em dashes. Never use straight quotes.
- Bengali dish and place names stay in romanised English, with no Bengali script: *Shukto, Kosha Mangsho, Thakur-dalan, Jalsaghar*.
- Headline length: at most 8 words. Paragraph length: at most 60 words.

---

## 4. Spacing, Grid & Layout

### Spacing scale (8px base)
`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`

| Use | Desktop | Mobile |
|---|---|---|
| Section vertical padding | 160px | 96px |
| Space between heading block and content | 64px | 40px |
| Card gap | 32px | 24px |
| Side gutter | 64px | 20px |

### Grid
- **Container:** 1280px max width, centred.
- **Reading column:** 680px max, for story and paragraph text.
- **Columns:** 12 on desktop (≥ 1024), 8 on tablet (768–1023), 4 on mobile (< 768).
- Full-bleed images may break out of the container. Text never does.
- Layouts are **asymmetric** by default (for example image at 7 columns and text at 4 columns with a 1-column gap). Avoid boring centred 50/50 splits except in the reservation section.

### Breakpoints
`sm 480 · md 768 · lg 1024 · xl 1280 · 2xl 1536`

### Section heading block (always the same)
```
[ornament: small copper crest or railing motif, 48px wide]
EYEBROW · ROMAN NUMERAL          ← eyebrow, copper on dark / terracotta on light
Section Title                    ← h2 Cinzel
A single italic lead line.       ← lead, max 20 words
```
Centred on dark bands, left-aligned on light sections.

---

## 5. Shape, Borders, Depth

| Token | Value |
|---|---|
| Border radius | **0** everywhere, except `arch` masks |
| Hairline | 1px solid `--copper` |
| Double frame | 1px copper, 6px gap, 1px copper (inset frames on hero and cards) |
| Arch | Semicircular top: `border-radius: 999px 999px 0 0` (image masks only) |
| Shadow | None by default. Only `0 24px 48px -24px rgba(58,31,26,.25)` on the open menu book |

The **double copper frame** is the signature container. It is used on the hero inset, invitation card, reservation card and menu book.

---

## 6. Motifs (Rajbari Visual System)

All motifs are custom SVGs, traced from the actual Baro Kuthi building where possible, in single-weight 1–1.5px copper lines. Store them in `/public/motifs/`.

| Motif file | Source | Where used | Max per page |
|---|---|---|---|
| `crest.svg` | Baro Kuthi crest | Logo, favicon, wax seal, heading ornament | Unlimited (small) |
| `railing.svg` | Cast-iron veranda railing | Section dividers (horizontal repeat) | 3 |
| `arch.svg` | Fanlight arch | Image crowns, arched masks | 4 |
| `shutter.svg` | Green louvered khorkhori window | Page and intro transition, image edge detail | 1 |
| `chandelier.svg` | Belgian chandelier | Hero only | 1 |
| `alpana.svg` | Alpana border | Reservation section frame | 1 |
| `lalpaar.svg` | Lal-paar sari border band | Very top and very bottom of site, 6px | 2 |
| `terracotta-*.svg` | Bishnupur temple panel figures | Course icons, occasion icons | 1 per item |
| `pillar.svg` | Thakur-dalan pillar | Side frames in "Rooms of the House" | 1 section |
| `checker.svg` | Marble checkerboard floor | Background texture at 4% opacity | 1 section |

**Rules**
- Motifs are copper on parchment, or copper on terracotta-deep. Never fill them with terracotta on terracotta.
- Never mix more than two motifs in one viewport.
- Textures (checker, paper grain) stay at or below 6% opacity.
- Never use generic mandala, paisley or clip-art "Indian" patterns.

---

## 7. Imagery

### Photography
- **Time:** dusk and night; lamp, candle and chandelier light. Warm white balance (about 3200K).
- **Grade:** one Lightroom preset for the whole site: lifted blacks, warm mids, desaturated greens, grain 8–10.
- **Food:** top-down on **kansa thala**, **banana leaf**, and old china for the Sahib's Table. Hands serving in frame. No white studio backgrounds.
- **Spaces:** wide shots of arches, courtyard, staircase and chandeliers, with people as soft silhouettes.
- **Details:** textures such as lime plaster, wooden shutters, brass, fabric and flowers (rajanigandha, marigold).
- **Staff:** dressed in lal-paar or dhoti-kurta in simple, dignified styling.

### Image shapes
| Shape | Ratio | Use |
|---|---|---|
| Arch | 3:4 with arched top | Rooms, story portraits |
| Tall | 2:3 | Course scroll, dish features |
| Wide | 16:9 or 21:9 | Hero, full-bleed breaks |
| Square | 1:1 | Guest book, gallery grid |

### Technical
- WebP (AVIF where possible). Hero ≤ 350KB; all others ≤ 200KB; max width 2000px.
- Always set `width` and `height`. Lazy-load everything below the hero.
- Alt text describes the scene plainly ("Kosha mangsho on a kansa thala, lamp-lit").

### Illustration
Commission hand-drawn line art from a Kolkata illustrator: the façade, arches, railing, chandelier and course icons. It is the site's most distinctive asset. **No AI-generated imagery.**

---

## 8. Motion

| Token | Value |
|---|---|
| `--ease-heritage` | `cubic-bezier(0.22, 0.61, 0.36, 1)` |
| `--dur-fast` | 300ms (hover, links) |
| `--dur-base` | 600ms (reveals) |
| `--dur-slow` | 900ms (shutter, page turn) |

**Allowed motion**
- **Reveal:** fade + 24px rise, 600ms, stagger 80ms. Triggered once per element.
- **Shutter open:** two louvered panels slide apart, 900ms (intro and page transitions only).
- **Page turn:** the menu book flips between the Bengali Table and the Sahib's Table.
- **Line draw:** alpana and railing SVGs draw themselves with `stroke-dashoffset`, 1.6s.
- **Chandelier sway:** ±1.5° rotation tied to scroll velocity.
- **Parallax:** images only, at most 8% movement.
- **Smooth scroll:** Lenis, `lerp: 0.08`.

**Forbidden:** bounce, elastic, scale-pop, spin, typewriter text, cursor trails, auto-playing carousels.

**Accessibility:** under `prefers-reduced-motion: reduce`, disable shutter, parallax, sway and line-draw. Show the final state instantly.

---

## 9. Components

### 9.1 Buttons
| Variant | Style | Use |
|---|---|---|
| **Primary** | Terracotta background, white small-caps text, 0 radius, padding 18×36, 1px copper inset frame at 4px | "Reserve by Telephone" |
| **Secondary** | Transparent, 1px terracotta border, terracotta text | "View the Menu" |
| **On dark** | Transparent, 1px copper border, parchment text | Buttons inside dark bands |
| **Text link** | Terracotta small caps + `→`, copper 1px underline that grows from left on hover | "Read the full story →" |

Hover: primary goes to terracotta-deep. Secondary fills terracotta with white text. Transition 300ms.
Focus: 2px copper outline, 3px offset. Always visible.

### 9.2 Header
- Height 88px desktop, 64px mobile. Parchment background with a copper hairline bottom. `lalpaar` band above it.
- Layout: left nav (The Story · The Menu · The Rooms) | **centred crest + wordmark** | right nav (Occasions · Visit) + phone.
- On scroll > 120px, it shrinks to 64px and the wordmark hides, leaving the crest only.
- Mobile: crest centred, menu icon left (two copper lines), phone icon right. The menu opens full-screen on terracotta-deep with Cinzel links and Roman numerals.

### 9.3 Sticky call bar (mobile only)
- Fixed at the bottom, 64px tall, parchment with a copper hairline top.
- Two equal buttons: **Call** (primary) | **WhatsApp** (secondary). Always visible below 768px.
- Links: `tel:+918240383737` and `https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table`.

### 9.4 Invitation intro (first visit only)
- Full-screen parchment, centred double-framed card, max 560px.
- Copy: *"The Household of Baro Kuthi requests the pleasure of your company at dinner."*
- A copper wax-seal crest; tapping it triggers the shutter-open into the hero.
- "Skip" link top-right. Remember it for 30 days in `localStorage` (inside try/catch). Never show to bots or with reduced motion.

### 9.5 Hero ("The Gate")
- 100svh. Full-bleed dusk façade photo with a terracotta-deep gradient at the bottom (0 → 70%).
- Double copper frame inset 24px from the viewport edges.
- `chandelier.svg` hanging from the top centre.
- Content bottom-left: eyebrow `EST. 1823 · PAIKPARA, KOLKATA`, display title, lead line, then primary and on-dark buttons.

### 9.6 Section divider
`railing.svg` repeated horizontally, 24px tall, copper, centred at max 480px wide, with 96px of space above and below.

### 9.7 Story block ("The Courtyard")
- Asymmetric: arched image (5 cols) + text (5 cols) with a 2-column offset, alternating sides.
- Pull quote: Cormorant italic 32px, terracotta, copper hairline on the left.
- Year markers: Cinzel 56px copper on dark, or terracotta on light, for 1823 · 1858 · 1859 · today.

### 9.8 Menu book ("The Two Tables")
- An open-book component: two facing pages, double copper frame, parchment-dark fill, soft shadow.
- Left page: **THE BENGALI TABLE**. Right page: **THE SAHIB'S TABLE**. On mobile, two tabs switch between them with a page-turn effect.
- **Menu item:**
```
DISH NAME (small caps) ·························· ₹ 000
Italic one-line description, ink colour.
[optional] ✦ House speciality  ← copper crest mark
```
- Data comes from `menu.json` or a Google Sheet CSV. There are no hard-coded prices in components.

### 9.9 Course scroll ("The Course of a Rajbari Meal")
- A pinned section. Each course enters in sequence as you scroll:
  `I Shukto → II Dal & Bhaja → III Torkari → IV Maachh → V Mangsho → VI Chutney & Papad → VII Mishti → VIII Paan`
- Each course: Roman numeral (Cinzel copper), name (h3), one-line ritual note (italic), top-down kansa photo (tall), and a terracotta icon.
- A vertical progress line on the left, in copper, with one dot per course (glow on the active one).
- On mobile or with reduced motion, it becomes a simple vertical stack.

### 9.10 Room card ("The Rooms of the House")
- Arched image (3:4), name in h3 Cinzel, eyebrow line `SEATS 40 · BEST AT DUSK`, one sentence, text link.
- Rooms: *The Verandah* (café) · *The Jalsaghar* (main hall) · *The Thakur-dalan Courtyard* · *The Zamindar's Study* (private).
- Four columns on desktop; horizontal swipe on mobile (no auto-play; copper progress line below).

### 9.11 Occasion band
- Full-bleed terracotta background, `checker.svg` at 4%, centred heading block, three occasion items with terracotta-panel icons, and an on-dark button.

### 9.12 Guest book
- Cards on parchment-dark, styled as ruled guest-book pages: date (small caps), quote (italic, 20px), name, and a "Google review" source link.
- **Real reviews only**, pulled manually or via the Google Places API at build time.

### 9.13 Reservation card
- Centred double-framed card with the `alpana.svg` border drawing itself on scroll.
- Copy: *"Tables at Baro Kuthi are arranged personally. Please telephone our host."*
- Phone number in Cinzel 40px terracotta (tappable), WhatsApp secondary button, and hours as a letterpress list with leaders.

### 9.14 Footer ("The Visitor's Note")
- Terracotta-deep background, parchment text, copper ornaments and `lalpaar` band at the very bottom.
- Four columns: Address + map link | Hours | Getting here (metro, parking, dress code) | Crest + "Visit the Banquet House →" (link to barokuthirajbari.com).
- Bottom line: © year, small caps, copper.

---

## 10. Page Templates

### Home
1. Invitation intro (first visit)
2. Hero — The Gate
3. Info strip — Hours · Address · Call / WhatsApp (3 columns, copper dividers)
4. **I · The Courtyard** — short story + "Read the full story →"
5. **II · The Two Tables** — menu book preview (4 items each side) + "View the full menu →"
6. **III · The Course of a Rajbari Meal** — course scroll
7. **IV · The Rooms of the House** — 4 room cards
8. **V · Occasions of the House** — terracotta band
9. **VI · The Guest Book** — 3 reviews
10. **VII · Reserve a Table** — reservation card
11. Footer

### The Story
Hero (archival illustration) → timeline (1823 → today) with alternating arched images → pull quotes → CTA to menu.

### The Menu
Heading block → Two Tables book (full) → set menus / thali section → café menu (Verandah) → note on seasonal dishes → downloadable PDF menu (same letterpress style) → reservation card.

### The Rooms
One full section per room: wide photo, description, capacity, best time, suitable occasions → reservation card.

### Occasions
Private dining, family celebrations, corporate lunches; how arrangements work (all by phone) → reservation card.

### Visit
Map embed (lazy, click-to-load), address, hours, directions, parking, dress code, house etiquette, FAQs → reservation card.

**Every page ends with the reservation card and then the footer.**

---

## 11. Voice & Copy

- **Tone:** gracious host, quietly proud, never salesy. Write as the house speaking ("The house receives guests from 7 pm").
- **Use:** *receive, host, table, house, evening, arranged, courtyard, tradition*.
- **Avoid:** *best, No.1, luxurious like never before, amazing, wow, near me, unforgettable experience*, and exclamation marks.
- Facts about history must be verified with the owners before publishing.
- The phone CTA always reads **"Reserve by Telephone"**, never "Book Now".

---

## 12. Accessibility & Performance

- WCAG 2.1 AA minimum (see the contrast table in Section 2).
- All interactive elements are keyboard reachable with a visible copper focus ring.
- Minimum touch target 48×48px.
- Motion respects `prefers-reduced-motion`.
- Ambient sound (if used) is **off by default** and has a clear toggle.
- Targets: Lighthouse mobile ≥ 90 on all four scores, LCP < 2.5s, CLS < 0.05.
- Total JS budget: ≤ 150KB gzipped. GSAP is loaded only on pages that use it.

---

## 13. Code Tokens

### CSS variables (`app/globals.css`)
```css
:root {
  --terracotta: #924B3F;
  --terracotta-deep: #5E2E27;
  --ink: #3A1F1A;
  --copper: #D7A680;
  --parchment: #F6ECE2;
  --parchment-dark: #EBDCCD;
  --glow: #FFCC99;

  --ease-heritage: cubic-bezier(0.22, 0.61, 0.36, 1);
  --dur-fast: 300ms;
  --dur-base: 600ms;
  --dur-slow: 900ms;

  --container: 1280px;
  --reading: 680px;
  --hairline: 1px solid var(--copper);
}

html { background: var(--parchment); color: var(--ink); }
.small-caps { font-variant: all-small-caps; letter-spacing: 0.2em; }
.frame-double {
  border: var(--hairline);
  outline: var(--hairline);
  outline-offset: -8px;
}
.arch { border-radius: 999px 999px 0 0; overflow: hidden; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
}
```

### Tailwind (`tailwind.config.js`)
```js
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: { sm: '480px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
    extend: {
      colors: {
        terracotta: { DEFAULT: '#924B3F', deep: '#5E2E27' },
        ink: '#3A1F1A',
        copper: '#D7A680',
        parchment: { DEFAULT: '#F6ECE2', dark: '#EBDCCD' },
        glow: '#FFCC99',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      fontSize: {
        display: ['72px', { lineHeight: '1.05', letterSpacing: '0.06em' }],
        h1: ['56px', { lineHeight: '1.1', letterSpacing: '0.05em' }],
        h2: ['40px', { lineHeight: '1.15', letterSpacing: '0.04em' }],
        h3: ['28px', { lineHeight: '1.2', letterSpacing: '0.01em' }],
        lead: ['24px', { lineHeight: '1.5' }],
        body: ['20px', { lineHeight: '1.65' }],
        eyebrow: ['14px', { lineHeight: '1.4', letterSpacing: '0.22em' }],
      },
      spacing: { section: '160px', 'section-sm': '96px' },
      maxWidth: { container: '1280px', reading: '680px' },
      borderRadius: { none: '0', DEFAULT: '0', arch: '999px 999px 0 0' },
      transitionTimingFunction: { heritage: 'cubic-bezier(0.22, 0.61, 0.36, 1)' },
    },
  },
};
```

### Fonts (`app/layout.tsx`)
```tsx
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
const cinzel = Cinzel({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-cinzel' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'], weight: ['400', '500', '600'], style: ['normal', 'italic'], variable: '--font-cormorant',
});
```

---

## 14. Project Structure

```
/app
  layout.tsx · page.tsx
  /story  /menu  /rooms  /occasions  /visit
/components
  /layout     Header · Footer · StickyCallBar · InvitationIntro
  /ui         Button · TextLink · Eyebrow · SectionHeading · Divider · FrameDouble · ArchImage
  /sections   Hero · InfoStrip · StoryBlock · MenuBook · CourseScroll · RoomCard · OccasionBand · GuestBook · ReservationCard
/content      menu.json · rooms.json · courses.json · site.json (phone, hours, address)
/public
  /motifs     crest · railing · arch · shutter · chandelier · alpana · lalpaar · pillar · checker · terracotta-*
  /images     hero · rooms · courses · story · gallery
```

- Phone, WhatsApp, hours and address live **only** in `content/site.json`.
- Components never hard-code colours. Use tokens only.

---

## 15. Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Parchment backgrounds, terracotta headings, copper hairlines | White or grey backgrounds, black text |
| Square corners, double copper frames, arched image masks | Rounded cards, pill buttons, drop shadows everywhere |
| Cinzel + Cormorant only | Sans-serif fonts, script or "handwritten" fonts |
| Real dusk photography on kansa and banana leaf | Stock photos, white-plate studio shots, AI images |
| Motifs traced from the actual building | Generic mandala, paisley or clip-art ornaments |
| "Reserve by Telephone" | "Book Now", booking forms, pop-ups |
| Slow reveals, shutter and page-turn transitions | Bounce, zoom-pop, auto-sliding carousels |
| Real Google reviews with source links | Invented testimonials |
| Roman numerals, small caps, dotted menu leaders | Emoji, icon fonts, bright badges |
| Alternating light and dark sections | Two dark bands in a row |

---

## 16. Pre-Launch Checklist

- [ ] Every colour used is a token from Section 2
- [ ] No text breaks the contrast table
- [ ] All images follow the grade, format and size rules
- [ ] Phone and WhatsApp links tested on Android and iPhone
- [ ] Reduced motion tested; site is fully usable without animation
- [ ] Menu prices load from data, not code
- [ ] History facts approved by the owners
- [ ] `Restaurant` + `Menu` JSON-LD schema added; sitemap generated
- [ ] Lighthouse mobile ≥ 90; tested on a low-end Android phone
- [ ] Cross-link to and from barokuthirajbari.com is live

---

*Version 1.0 · October 2026 · Prepared by BizNexa*
