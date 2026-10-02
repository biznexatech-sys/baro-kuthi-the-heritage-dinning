# UI kit — Heritage Dining website

A click-through recreation of the site described in `uploads/DESIGN.md` §10, composed entirely from the design-system components (`window.BaroKuthiDesignSystem_e9f570`). Open `index.html`.

**Routes** (hash): `#home` · `#story` · `#menu` · `#rooms` · `#occasions` · `#visit`. Header links, text links and buttons all navigate. Every page ends with the reservation card and the footer.

**Interactions to try**
- First visit on Home shows the **invitation**; tap the copper seal to open the shutters (remembered for 30 days). Append `?intro` to the URL to replay it.
- Scroll the header past 120px → it condenses to 64px.
- **Course scroll** (Home · III) pins and steps through I–VIII as you scroll; click a dot to jump.
- Narrow the window below 1024px → mobile header with full-screen menu; below 768px → Menu book tabs with page-turn, room swipe row with progress line, sticky Call | WhatsApp bar.
- Visit → **Load the Map** (click-to-load embed).

**Files**
- `index.html` — entry; page-level layout CSS (`kit-*` classes only; all brand styling comes from `styles.css`).
- `Section.jsx` — `PageSection` (padding + container) and `LeaderList` (letterpress rows with copper leaders).
- `HomePage.jsx` · `StoryPage.jsx` · `MenuPage.jsx` · `RoomsPage.jsx` · `OccasionsPage.jsx` · `VisitPage.jsx` · `App.jsx` (router, header, reservation, footer, call bar).
- `data.js` — sample content shaped like `content/site.json`, `menu.json`, `rooms.json`, `courses.json`.
- `ds-fallback.js` — if `_ds_bundle.js` has not been compiled yet, transpiles the component sources in the browser. No-op otherwise.

**Sample content — replace before real use.** Phone and WhatsApp are the spec's `XXXXXXXXXX` placeholders. Prices, room capacities, lunch/café hours, "Getting here" details and FAQ answers are illustrative. History chapters (1858, 1859) are intentionally left as drafts — history must be verified with the owners. Guest-book cards are placeholders because reviews must be real. All photographs are labelled placeholders.
