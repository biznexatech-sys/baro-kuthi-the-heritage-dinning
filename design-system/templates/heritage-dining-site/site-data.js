/* SAMPLE CONTENT — replace with the owners' data before launch. One file feeds every page.
   Shape mirrors DESIGN.md §14 (content/site.json · menu.json · rooms.json · courses.json).
   Phone / WhatsApp are the spec's own placeholders. Prices, capacities, lunch & verandah hours and
   "Getting here" details are illustrative. Reviews are placeholders on purpose: real reviews only, quoted exactly. */
export const site = {
  name: 'BARO KUTHI RAJ BARI — The Heritage Dining',
  shortName: 'Baro Kuthi Raj Bari',
  url: 'https://www.barokuthirajbaritheheritagedining.com',
  phone: { display: '+91 82403 83737', href: 'tel:+918240383737' },
  whatsapp: 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table',
  email: 'barokuthi.theheritagedining@gmail.com',
  website: 'https://www.barokuthirajbaritheheritagedining.com',
  address: ['BARO KUTHI RAJ BARI', 'Paikpara, Kolkata'],
  addressLine: 'Paikpara, Kolkata',
  mapHref: 'https://maps.google.com/?q=Paikpara,Kolkata',
  mapEmbed: 'https://www.google.com/maps?q=Paikpara,Kolkata&output=embed',
  hoursLine: 'The house receives guests from 7 pm',
  hours: [
    { label: 'Lunch', value: '12.30 – 3.30 pm' },
    { label: 'Dinner', value: '7 – 11 pm' },
    { label: 'The Verandah', value: '11 am – 7 pm' },
  ],
  gettingHere: [
    { label: 'Metro', value: 'Nearest station to be confirmed' },
    { label: 'Parking', value: 'Within the compound, by arrangement' },
    { label: 'Dress code', value: 'Smart; traditional dress welcome' },
  ],
  banquetHref: 'https://barokuthirajbari.com',
};

export const menu = {
  tables: [
    {
      title: 'The Bengali Table', tab: 'The Bengali Table', subtitle: 'Served course by course, on kansa',
      items: [
        { name: 'Shukto', price: 320, description: 'Bitter gourd and summer vegetables in a light milk gravy.' },
        { name: 'Chingri Malai Curry', price: 980, description: 'Tiger prawns in coconut milk, gently spiced.', speciality: true },
        { name: 'Bhetki Paturi', price: 740, description: 'Bhetki in mustard paste, steamed in banana leaf.' },
        { name: 'Kosha Mangsho', price: 880, description: 'Mutton slow-cooked dark with onion and whole spices.', speciality: true },
        { name: 'Mochar Ghonto', price: 360, description: 'Banana flower with coconut, slow-stirred.' },
        { name: 'Mishti Doi', price: 180, description: 'Sweetened curd, set in an earthen pot.' },
      ],
    },
    {
      title: 'The Sahib’s Table', tab: 'The Sahib’s Table', subtitle: 'Anglo-Indian dishes, on old china',
      items: [
        { name: 'Mulligatawny Soup', price: 290, description: 'Peppered lentil soup, bright with lime.' },
        { name: 'Fish Orly', price: 690, description: 'Bhetki in a light batter, with tartare sauce.' },
        { name: 'Chicken à la Kiev', price: 720, description: 'Butter-filled cutlet, crumbed and fried golden.', speciality: true },
        { name: 'Mutton Stew', price: 760, description: 'A club-style stew with root vegetables.' },
        { name: 'Roast Chicken', price: 780, description: 'With gravy, buttered vegetables and mash.' },
        { name: 'Caramel Custard', price: 220, description: 'Baked custard under a dark caramel.' },
      ],
    },
  ],
  sets: {
    title: 'Set Menus', subtitle: 'The whole meal, in its proper order',
    items: [
      { name: 'The Rajbari Thali · Niramish', price: '1,450', description: 'Eight vegetarian courses, from Shukto to Paan.' },
      { name: 'The Rajbari Thali · Aamish', price: '1,850', description: 'Eight courses with fish and mutton.', speciality: true },
      { name: 'The Sahib’s Supper', price: '1,650', description: 'Soup, fish, roast and pudding, served in courses.' },
    ],
  },
  verandah: {
    title: 'The Verandah', subtitle: 'The café of the house, through the afternoon',
    items: [
      { name: 'Darjeeling Tea, by the Pot', price: 180, description: 'First flush, with milk or lemon.' },
      { name: 'Fish Kobiraji', price: 390, description: 'Bhetki in a lacy egg crust, with kasundi.' },
      { name: 'Chicken Cutlet', price: 340, description: 'Crumbed and fried, with onion salad.' },
      { name: 'Nolen Gur Sandesh', price: 160, description: 'Date-palm jaggery sandesh, in season.' },
    ],
  },
};

export const courses = [
  { numeral: 'I', name: 'Shukto', note: 'A bitter-sweet beginning to wake the palate.', imageAlt: 'Shukto on a kansa thala, top-down, lamp-lit' },
  { numeral: 'II', name: 'Dal & Bhaja', note: 'Lentils poured over rice, with fritters fried crisp.', imageAlt: 'Dal and bhaja in kansa bowls, top-down' },
  { numeral: 'III', name: 'Torkari', note: 'The season’s vegetables, cooked the household way.', imageAlt: 'Torkari on banana leaf, hands serving' },
  { numeral: 'IV', name: 'Maachh', note: 'Fish — the heart of the Bengali table.', imageAlt: 'Bhetki paturi opened on banana leaf, lamp-lit' },
  { numeral: 'V', name: 'Mangsho', note: 'Mutton, slow-cooked for the evening’s main course.', imageAlt: 'Kosha mangsho on a kansa thala, lamp-lit' },
  { numeral: 'VI', name: 'Chutney & Papad', note: 'Sweet-sour chutney to settle the meal.', imageAlt: 'Tomato chutney and papad on kansa, top-down' },
  { numeral: 'VII', name: 'Mishti', note: 'Sweets and mishti doi to close the meal.', imageAlt: 'Mishti doi in an earthen pot, sandesh on brass' },
  { numeral: 'VIII', name: 'Paan', note: 'Betel leaf, folded and offered as the guest departs.', imageAlt: 'Folded paan on a silver tray' },
];

/* action.href "#rooms/<id>" opens The Rooms page at that room's section (ids are set in RajbariRooms.dc.html). */
export const rooms = [
  { name: 'The Verandah', eyebrow: 'The café · Seats 24', description: 'Tea and a light menu along the cast-iron railing.', imageAlt: 'The verandah railing in afternoon light', action: { label: 'See the room', href: '#rooms/verandah' } },
  { name: 'The Jalsaghar', eyebrow: 'Seats 40 · Best at dusk', description: 'The music room, now the main hall, under its Belgian chandeliers.', imageAlt: 'The Jalsaghar under its chandeliers, lamp-lit', action: { label: 'See the room', href: '#rooms/jalsaghar' } },
  { name: 'The Thakur-dalan Courtyard', eyebrow: 'Seats 60 · After dark', description: 'Tables laid before the old pillared pavilion.', imageAlt: 'The Thakur-dalan pillars at night, lamps lit', action: { label: 'See the room', href: '#rooms/courtyard' } },
  { name: 'The Zamindar’s Study', eyebrow: 'Private · Seats 10', description: 'A private room for small dinners, by arrangement.', imageAlt: 'A lamp-lit study with shutters half open', action: { label: 'See the room', href: '#rooms/study' } },
];

export const reviews = [
  { date: 'Date of visit', quote: 'A guest’s words will be set here exactly as written in their Google review.', name: 'Reviewer’s name', href: '#', source: 'Google review' },
  { date: 'Date of visit', quote: 'Real reviews only — pulled by hand or from the Google Places API at build time.', name: 'Reviewer’s name', href: '#', source: 'Google review' },
  { date: 'Date of visit', quote: 'Never invented, never paraphrased; always with a link to the source.', name: 'Reviewer’s name', href: '#', source: 'Google review' },
];
