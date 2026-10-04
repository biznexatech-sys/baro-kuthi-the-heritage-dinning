# Content

Every word, price, number and review on the site comes from these files. Components never hard-code content.
Edit a file, run `npm run build`, upload `out/`.

| File | Feeds |
|---|---|
| `site.json` | Phone, WhatsApp, address, hours, getting here, Banquet House link, SEO name/URL/description, menu PDF path |
| `menu.json` | Menu book (both tables), set menus, the Verandah café menu, seasonal note |
| `courses.json` | The eight-course scroll (Home · III) |
| `rooms.json` | Room cards (Home · IV) and the Rooms page |
| `reviews.json` | The Guest Book (Home · VI) |
| `story.json` | Home excerpt (Home · I) and the Story page timeline |
| `occasions.json` | Occasion band (Home · V) and the Occasions page |
| `faqs.json` | Visit page FAQs |

Types for every file live in `src/lib/content.ts`, so a typo in a key fails the build.

## ⚠ Sample content — replace before launch

- **Phone, WhatsApp, email and canonical website URL** are maintained in `site.json`.
- **Prices, room capacities, lunch and Verandah hours, "Getting here"** are illustrative.
- **History chapters** marked `"draft": true` must be written from the family's records and approved by the owners.
- **Reviews** are placeholders on purpose. Use real Google reviews only, quoted exactly, each with its source `href`.
- **Images:** add an `image` path (e.g. `"/images/rooms/jalsaghar.webp"`) to any room, course or chapter. Without one, a labelled placeholder is shown.
- **Menu PDF:** set `site.json` → `menuPdf` to `"/menu.pdf"` and place the file in `public/` to show the download button.
