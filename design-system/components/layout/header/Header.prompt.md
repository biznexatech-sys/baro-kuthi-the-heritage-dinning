Site header — lal-paar band, left nav | centred name/crest | right nav + phone; condenses on scroll; full-screen terracotta-deep menu when narrow.

```jsx
<Header activeHref="#menu" onNavigate={(href) => setRoute(href)} phone={{ display: '+91 XXXXX XXXXX', href: 'tel:+91XXXXXXXXXX' }} />
```

- `layout` auto-measures its own width (mobile below 1200px); force `"mobile"` inside phone mocks.
- `crest` / `lalpaar` take the commissioned SVGs; until then the brand name is set in Cinzel and the band is solid terracotta.
