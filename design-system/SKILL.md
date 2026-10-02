---
name: baro-kuthi-design
description: Use this skill to generate well-branded interfaces and assets for Baro Kuthi Rajbari · The Heritage Dining, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill (`readme.md`), and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `styles.css` is the single stylesheet entry (tokens, fonts, component CSS). `tokens/` holds the raw values; `uploads/DESIGN.md` is the original brand spec.
- Components live in `components/**/Name.jsx` with a `Name.d.ts` contract and `Name.prompt.md` usage note. In HTML, load `_ds_bundle.js` and read them from `window.BaroKuthiDesignSystem_e9f570`.
- `ui_kits/website/` is a full click-through of the site (Home, Story, Menu, Rooms, Occasions, Visit) — start there for page composition.
- Non-negotiables: parchment / terracotta / copper only (70/25/5), Cinzel + Cormorant only, radius 0, double copper frames, no shadows (except the menu book), slow heritage easing, "Reserve by Telephone" (never "Book Now"), no emoji, no invented reviews, history or artwork.
