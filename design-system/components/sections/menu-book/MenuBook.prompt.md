"The Two Tables" — the open menu book; left page The Bengali Table, right page The Sahib's Table.

```jsx
<MenuBook pages={menu.tables} limit={4} footer={<TextLink href="#menu">View the full menu</TextLink>} />
<MenuBook pages={[menu.verandah]} />  {/* single page */}
```

- Items: `{ name, price, description, speciality }`. Data only — no prices in code. Narrow → tabs with a page-turn (900ms).
