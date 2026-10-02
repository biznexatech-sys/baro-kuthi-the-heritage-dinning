"The Course of a Rajbari Meal" — pinned dark section; I Shukto → VIII Paan enter one at a time.

```jsx
<CourseScroll courses={courses} heading={{ numeral: 'III', eyebrow: 'The Course of a Rajbari Meal', title: 'Eight Courses, In Order' }} />
<CourseScroll mode="stage" activeIndex={3} courses={courses} />  {/* static, for mocks */}
```

- Each course: `{ numeral, name, note, image, imageAlt, icon }` — icon is a terracotta-panel SVG (empty arch niche until supplied).
