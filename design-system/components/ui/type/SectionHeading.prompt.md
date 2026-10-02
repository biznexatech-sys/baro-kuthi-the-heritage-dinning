The one heading block every section uses: 48px ornament, eyebrow · numeral, Cinzel title, one italic lead line.

```jsx
<SectionHeading numeral="II" eyebrow="The Two Tables" title="A Bengali Table and a Sahib’s Table" lead="Two kitchens of the house, served side by side." />
<SectionHeading tone="dark" numeral="III" eyebrow="The Course of a Rajbari Meal" title="Eight Courses, In Order" />
```

- Left-aligned on light, centred on dark (override with `align`). `ornament` takes crest.svg / railing.svg; omitted → copper hairline; `false` hides it.
- Titles ≤ 8 words, lead ≤ 20 words. `size="h1"` for page-top headings.
