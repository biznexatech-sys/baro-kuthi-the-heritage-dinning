# Baro Kuthi Rajbari · The Heritage Dining — Design System

A design system for the website of **Baro Kuthi Rajbari · The Heritage Dining**, a restaurant set in a zamindar's mansion in Paikpara, Kolkata (est. 1823). The site is conceived as *an evening at the Rajbari table*: **Invitation → Gate → Courtyard → The Table → The Courses → The Rooms → Guest Book → Reservation.** Tables are booked **by telephone and WhatsApp only** — there is no online booking — so the phone is the hero call to action.

## Sources

- **`uploads/DESIGN.md`** — *DESIGN.md · Baro Kuthi Rajbari · The Heritage Dining*, v1.0, October 2026, prepared by BizNexa. The single source of truth; every value here is lifted from it.
- Working domain: `barokuthirajbariheritagedining.com`. Sister site (the Banquet House, cross-linked from the footer): `https://barokuthirajbari.com`.
- Intended production stack (from the spec): Next.js static export · Tailwind · GSAP + ScrollTrigger · Lenis · Hostinger.
- No codebase, Figma, logo, photography or illustration files were provided. See **Asset status**.

## Index

| Path | What |
|---|---|
| `styles.css` | Entry point — `@import`s only. Link this one file. |
| `tokens/` | `fonts.css` (@font-face) · `colors.css` · `typography.css` · `spacing.css` · `shape.css` · `motion.css` · `base.css` (globals + `.t-*` text utilities, `.frame-double`, `.arch`, reveal, reduced motion) |
| `fonts/` | Self-hosted Cinzel + Cormorant Garamond (woff2, latin + latin-ext) |
| `components/ui/` | `actions/` Button, TextLink · `type/` Eyebrow, SectionHeading · `frames/` Divider, FrameDouble, ArchImage |
| `components/layout/` | `header/` Header · `footer/` Footer · `call-bar/` StickyCallBar · `invitation/` InvitationIntro |
| `components/sections/` | `hero/` Hero · `info-strip/` InfoStrip · `story/` StoryBlock · `menu-book/` MenuBook · `course-scroll/` CourseScroll · `rooms/` RoomCard, RoomRow · `occasions/` OccasionBand · `guest-book/` GuestBook · `reservation/` ReservationCard |
| `components/lib/` | Internal helpers (`helpers.js`: width-based compact layout, reveal, line-draw, motif slots, wordmark, phone icon) and `shared.css` |
| `ui_kits/website/` | Click-through recreation of the site: Home · Story · Menu · Rooms · Occasions · Visit |
| `templates/heritage-dining-site/` | **Website template** (start here to build the site): `HeritageDiningSite.dc.html` shell + one `Rajbari*.dc.html` per page; all content in `site-data.js` |
| `guidelines/` | Foundation specimen cards (Colors, Type, Spacing, Shape, Motion, Brand) |
| `assets/icons/phone.svg` | The only UI glyph (Lucide `phone`, re-stroked to 1.25px) |
| `SKILL.md` | Agent-skill entry point |

Each component directory holds `Name.jsx` + `Name.d.ts` (props contract) + `Name.prompt.md` (usage) + its CSS + one `*.card.html` preview.

## Components

All 21 exports are on `window.BaroKuthiDesignSystem_e9f570` once `_ds_bundle.js` is loaded (plus `styles.css`).

- **UI:** `Button` · `TextLink` · `Eyebrow` · `SectionHeading` · `Divider` · `FrameDouble` · `ArchImage`
- **Layout:** `Header` · `Footer` · `StickyCallBar` · `InvitationIntro`
- **Sections:** `Hero` · `InfoStrip` · `StoryBlock` · `MenuBook` · `CourseScroll` · `RoomCard` · `RoomRow` · `OccasionBand` · `GuestBook` · `ReservationCard`

This is exactly the inventory in DESIGN.md §14, plus:

**Intentional additions**
- `RoomRow` — §9.10 specifies the four-column / swipe-with-progress-line row, but §14 lists only `RoomCard`; the row behaviour needed a home.
- `ArchImage` takes a `shape` prop (arch · tall · wide · cinema · square) so the §7 image shapes share one primitive; with no `src` it shows a labelled placeholder carrying the alt text.
- Responsive components take `layout="auto|desktop|mobile"`. `auto` measures the component's **own** width (mobile below 768px; the header below 1024px) and adds the `.bk-compact` scope, which swaps type and spacing tokens to their mobile values — so components render correctly inside phone frames on a desktop screen.
- Motif props (`crest`, `lalpaar`, `ornament`, `motif`, `chandelier`, `alpana`, `checker`, `seal`, `shutter`, `icon`) accept the commissioned SVG as a URL or inline node. Until supplied, each slot falls back to the plainest brand primitive (type, a copper hairline, a solid band, an empty arch niche) — never an invented drawing.

## Products

One surface: the **Heritage Dining website** (`ui_kits/website/`). Six page templates from §10 — Home, The Story, The Menu, The Rooms, Occasions, Visit. **Every page ends with the reservation card, then the footer.** Mobile adds the sticky Call | WhatsApp bar.

---

## CONTENT FUNDAMENTALS

**Voice.** A gracious host, quietly proud, never salesy. *The house speaks*: "The house receives guests from 7 pm." Third person for the house ("Tables at Baro Kuthi are arranged personally"), second person only when addressing the guest directly ("Please telephone our host", "your company at dinner"). Never "we're excited", never hype.

**Vocabulary.** Use *receive, host, table, house, evening, arranged, courtyard, tradition*. Avoid *best, No.1, luxurious like never before, amazing, wow, near me, unforgettable experience* — and **no exclamation marks, ever**.

**The CTA is fixed.** The phone call to action always reads **"Reserve by Telephone"** — never "Book Now". No booking forms, no pop-ups. WhatsApp is the secondary path ("Message on WhatsApp", pre-filled "I would like to reserve a table").

**Casing.** Cinzel headings are uppercase and tracked (set via CSS, written in Title Case in source). Labels, eyebrows, buttons and dish names are small caps. Body copy is sentence case.

**Length.** Headlines ≤ 8 words. Lead lines ≤ 20 words, one sentence, italic. Paragraphs ≤ 60 words.

**Typographic manners.** Curly quotes (“ ”), real en/em dashes (7–11 pm; "Fish — the heart of the table"), middle dots as separators (`SEATS 40 · BEST AT DUSK`, `EST. 1823 · PAIKPARA, KOLKATA`). Roman numerals for sections and courses (`I · THE GATE`, `COURSE IV — MAACHH`). Menus use dotted copper leaders: `DISH NAME ········ ₹ 000`.

**Names.** Bengali dish and place names stay romanised, never in Bengali script: *Shukto, Kosha Mangsho, Thakur-dalan, Jalsaghar*. English only.

**Truth.** Real photos, real reviews (quoted exactly, with source link), real history (verified by the owners before publishing). No invented testimonials. Prices come from data (`menu.json`), never code.

**Emoji.** Never. The only symbols are `→` (text links), `✦` (house speciality mark), `·` and Roman numerals.

Examples from the spec: *"The Household of Baro Kuthi requests the pleasure of your company at dinner."* · *"Tables at Baro Kuthi are arranged personally. Please telephone our host."* · *"Read the full story →"*

---

## VISUAL FOUNDATIONS

**Mood.** Heritage, not theme park. Restraint is luxury. Everything is slow, framed and lamp-lit.

**Colour.** Seven tokens and a strict ratio — **70% parchment, 25% terracotta, 5% copper.** Parchment `#F6ECE2` is the page; parchment-dark `#EBDCCD` alternates sections and fills cards; terracotta `#924B3F` carries headings, buttons and key text; terracotta-deep `#5E2E27` is the footer, dark bands and hover; ink `#3A1F1A` sets long reading text; copper `#D7A680` draws hairlines, frames, ornaments and icons — and is **never text on parchment** (1.9:1). Glow `#FFCC99` is a rare candle-light highlight, max once per screen (the active course dot, the seal's halo, the hero placeholder). White appears only as text on terracotta buttons. No greys, no black, no white backgrounds. See `guidelines/colors-contrast.html` for what each pairing may carry.

**Section rhythm.** Light sections: parchment ground, terracotta headings, ink body, copper hairlines. Dark bands: terracotta or terracotta-deep ground, parchment text, copper ornaments. Always alternate; **never two dark bands in a row.** On plain terracotta, copper is too weak for small text (2.9:1), so eyebrows turn parchment there.

**Type.** Cinzel (400/600) for display, logo and section titles — uppercase, tracked 0.04–0.06em. Cormorant Garamond for everything else: body 20/1.65, lead 24 italic, h3 28/600, and small caps (600, 0.18–0.22em) for eyebrows, labels and buttons. No sans-serif anywhere; no script or "handwritten" faces. Cormorant runs small — body never below 18px. Old-style numerals in running text, lining numerals for prices. Header navigation links are the one exception: Playfair Display 600 small caps (client request).

**Layout.** 1280px container, 680px reading column, 12/8/4 columns. Asymmetric by default (image 7 cols + text 4; story arch 5 + offset 2 + text 5); centred 50/50 only in the reservation section. Generous air: 160px section padding (96 mobile), 64px from heading block to content, 32px card gaps, 64px gutters (20 mobile). Full-bleed imagery may leave the container; text never does. The section heading block is always the same: 48px ornament → eyebrow · numeral → Cinzel title → one italic lead; left on light, centred on dark.

**Shape & borders.** Sharp and framed: **radius 0 everywhere**, 1px copper hairlines. The signature container is the **double copper frame** — 1px, 6px gap, 1px (hero inset, invitation, reservation card, menu book). The only curves are architectural: arched image masks (`border-radius: 999px 999px 0 0`), plus the round wax seal and progress dots.

**Depth.** No shadows, except one: `0 24px 48px -24px rgba(58,31,26,.25)` under the open menu book. No inner shadows, no glassmorphism, no blur. Depth comes from frames, alternating grounds and photography.

**Backgrounds & texture.** Flat parchment or terracotta grounds. Textures (marble checker, paper grain) stay ≤ 6% opacity; the checker sits at 4% on the occasion band only. The one gradient family is warm: terracotta-deep rising from the bottom of the hero (for legibility), and the candle-glow radial. No decorative gradients.

**Motifs.** Hand-drawn, single-weight 1–1.5px copper line art traced from the real building: crest, veranda railing, fanlight arch, khorkhori shutter, Belgian chandelier, alpana, lal-paar band, Bishnupur terracotta panels, Thakur-dalan pillar, marble checker. One or two per section, never more than two per viewport, never terracotta-on-terracotta, never mandala/paisley/clip-art.

**Imagery.** Dusk and night, lamp/candle/chandelier light, warm ~3200K, lifted blacks, desaturated greens, grain 8–10 — one preset site-wide. Food top-down on kansa thala, banana leaf, or old china for the Sahib's Table, with hands serving; spaces wide with people as soft silhouettes; details of lime plaster, shutters, brass, rajanigandha and marigold. Shapes: arch 3:4 (rooms, portraits), tall 2:3 (courses), wide 16:9/21:9 (hero, breaks), square (guest book). No stock, no white studio plates, no AI images.

**Motion.** Slow and deliberate, one easing: `cubic-bezier(0.22, 0.61, 0.36, 1)`. 300ms hover/links, 600ms reveals (fade + 24px rise, 80ms stagger, once), 900ms shutter and page turn, 1.6s line-draw. Chandelier sway ±1.5° with scroll velocity; parallax on images only, ≤ 8%. **Forbidden:** bounce, elastic, scale-pop, spin, typewriter, cursor trails, auto-playing carousels. Under `prefers-reduced-motion`, everything shows its final state instantly.

**Hover & press.** Primary buttons deepen to terracotta-deep; secondary buttons fill terracotta with white text; on-dark buttons fill copper with terracotta-deep text; text links grow a copper underline from the left and nudge the arrow 4px. Nav links take the same underline (it stays on the active page). No scale or shrink on press. **Focus** is always visible: 2px copper outline, 3px offset.

**Fixed elements.** The header is sticky (88px → 64px after 120px of scroll; the tagline drops away). On mobile the Call | WhatsApp bar is fixed to the bottom. Nothing else floats.

**Cards.** Square, parchment-dark, 1px copper hairline (guest book cards add copper page rules); feature cards use the double frame. No rounded cards, no coloured left borders, no badges.

---

## ICONOGRAPHY

The brand is almost icon-free by design — **"Roman numerals, small caps, dotted menu leaders"** instead of **"emoji, icon fonts, bright badges"** (§15). Meaning is carried by type and by the hand-drawn motifs.

- **UI glyphs:** only a telephone (mobile header) and a two-line copper menu button (drawn with two 1px spans; it folds into × when open). The phone is **Lucide `phone`** (ISC), copied into `assets/icons/phone.svg` and rendered inline at a 1.25px stroke to match the motif line weight. *Substitution:* no icon set was specified; Lucide is the closest thin-line match. If the illustrator draws a phone mark, swap it in `components/lib/helpers.js` (`renderIcon`).
- **Unicode as icons:** `→` after text links; `✦` in copper for "House speciality"; `·` as separator. Nothing else.
- **Numerals as icons:** Roman numerals mark sections, courses and steps (Cinzel, copper on dark / terracotta on light).
- **Illustrative icons:** course and occasion icons are Bishnupur terracotta-panel figures (`terracotta-*.svg`) — pending; each shows an empty copper arch niche until supplied.
- **No** icon fonts, no emoji, no filled/brand icons (WhatsApp is a text button, not a logo).

## Asset status (please supply)

**No logo, crest, motif SVG, photograph or illustration was provided**, and none has been drawn. Where they belong:

- **Crest / logo** → the brand name is set in plain Cinzel ("BARO KUTHI" + small-caps "Rajbari · The Heritage Dining") in the header, footer and invitation. The wax seal is a plain copper disc labelled "Enter".
- **Motifs** (`crest, railing, arch, shutter, chandelier, alpana, lalpaar, pillar, checker, terracotta-*`) → props on the relevant components; fallbacks are hairlines, a solid 6px terracotta band, empty niches, or nothing.
- **Photography** → `ArchImage` / `Hero` placeholders that print the intended shot (the alt text) and ratio.

## Fonts

Cinzel and Cormorant Garamond are the exact families named in the spec; the woff2 files were downloaded from Google Fonts (variable, latin + latin-ext) into `fonts/` and declared in `tokens/fonts.css`. `₹` is covered; `→` and `✦` fall back to the system serif.

## Known tensions in the spec

- Copper icons and the copper menu lines on parchment are 1.9:1 — below WCAG's 3:1 for UI graphics, although the spec asks for AA. The phone icon uses terracotta; the menu lines follow the spec (copper).
- Eyebrows (14px) and buttons (15px) in `all-small-caps` Cormorant render at roughly 6–7px letter height. They follow the spec exactly; consider 16px if legibility testing suggests it.
