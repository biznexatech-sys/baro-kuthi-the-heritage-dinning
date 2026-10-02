Square small-caps action; use primary for the phone CTA ("Reserve by Telephone"), secondary for "View the Menu", on-dark inside terracotta bands.

```jsx
<Button variant="primary" href="tel:+91XXXXXXXXXX">Reserve by Telephone</Button>
<Button variant="secondary" href="#menu">View the Menu</Button>
<Button variant="on-dark" href="#occasions">Arrange an Occasion</Button>
```

- `variant`: primary (terracotta + copper inset frame at 4px; hover terracotta-deep) · secondary (terracotta hairline; hover fills) · on-dark (copper hairline, parchment text; hover fills copper).
- Padding is fixed at 18×36; `fullWidth` for stacked mobile layouts. Never "Book Now", never pills.
