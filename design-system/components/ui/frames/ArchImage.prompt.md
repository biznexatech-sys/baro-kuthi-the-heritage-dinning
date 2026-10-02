Image primitive with the brand's shapes — arch (3:4, semicircular top) for rooms and portraits, tall 2:3 for courses, wide/cinema for breaks, square for the gallery.

```jsx
<ArchImage src="/images/rooms/jalsaghar.webp" alt="The Jalsaghar under its chandeliers, lamp-lit" shape="arch" parallax />
<ArchImage shape="tall" tone="dark" alt="Shukto on a kansa thala, top-down" />
```

- No `src` → a labelled placeholder that shows the alt text (so the intended shot is always specified).
- `parallax` moves the photo ≤ 8%; off under reduced motion. Always write plain, scene-describing alt text.
