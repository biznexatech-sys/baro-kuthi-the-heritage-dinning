/* @ds-bundle: {"format":4,"namespace":"BaroKuthiDesignSystem_e9f570","components":[{"name":"StickyCallBar","sourcePath":"components/layout/call-bar/StickyCallBar.jsx"},{"name":"Footer","sourcePath":"components/layout/footer/Footer.jsx"},{"name":"Header","sourcePath":"components/layout/header/Header.jsx"},{"name":"InvitationIntro","sourcePath":"components/layout/invitation/InvitationIntro.jsx"},{"name":"CourseScroll","sourcePath":"components/sections/course-scroll/CourseScroll.jsx"},{"name":"GuestBook","sourcePath":"components/sections/guest-book/GuestBook.jsx"},{"name":"Hero","sourcePath":"components/sections/hero/Hero.jsx"},{"name":"InfoStrip","sourcePath":"components/sections/info-strip/InfoStrip.jsx"},{"name":"MenuBook","sourcePath":"components/sections/menu-book/MenuBook.jsx"},{"name":"OccasionBand","sourcePath":"components/sections/occasions/OccasionBand.jsx"},{"name":"ReservationCard","sourcePath":"components/sections/reservation/ReservationCard.jsx"},{"name":"RoomCard","sourcePath":"components/sections/rooms/RoomCard.jsx"},{"name":"RoomRow","sourcePath":"components/sections/rooms/RoomRow.jsx"},{"name":"StoryBlock","sourcePath":"components/sections/story/StoryBlock.jsx"},{"name":"Button","sourcePath":"components/ui/actions/Button.jsx"},{"name":"TextLink","sourcePath":"components/ui/actions/TextLink.jsx"},{"name":"ArchImage","sourcePath":"components/ui/frames/ArchImage.jsx"},{"name":"Divider","sourcePath":"components/ui/frames/Divider.jsx"},{"name":"FrameDouble","sourcePath":"components/ui/frames/FrameDouble.jsx"},{"name":"Eyebrow","sourcePath":"components/ui/type/Eyebrow.jsx"},{"name":"SectionHeading","sourcePath":"components/ui/type/SectionHeading.jsx"}],"sourceHashes":{"components/layout/call-bar/StickyCallBar.jsx":"d57e1a87a1d5","components/layout/footer/Footer.jsx":"74ad7e050f8c","components/layout/header/Header.jsx":"c8dcd7b5950c","components/layout/invitation/InvitationIntro.jsx":"6c11732d419b","components/lib/helpers.js":"f296434f7a35","components/sections/course-scroll/CourseScroll.jsx":"7b72b1f344e2","components/sections/guest-book/GuestBook.jsx":"47c918edae21","components/sections/hero/Hero.jsx":"4832dde22019","components/sections/info-strip/InfoStrip.jsx":"3c182ec022d1","components/sections/menu-book/MenuBook.jsx":"efb411e1de1d","components/sections/occasions/OccasionBand.jsx":"e9ab965b8bd3","components/sections/reservation/ReservationCard.jsx":"10b2af0b0156","components/sections/rooms/RoomCard.jsx":"ca725a213a02","components/sections/rooms/RoomRow.jsx":"9416c341f041","components/sections/story/StoryBlock.jsx":"bb273b694f2d","components/ui/actions/Button.jsx":"aed9baf98113","components/ui/actions/TextLink.jsx":"017272582da1","components/ui/frames/ArchImage.jsx":"f24bb9709fa7","components/ui/frames/Divider.jsx":"d3d694138309","components/ui/frames/FrameDouble.jsx":"cfa78fbf1bf0","components/ui/type/Eyebrow.jsx":"078a4e4c1d68","components/ui/type/SectionHeading.jsx":"9bd067c550cd","ui_kits/website/App.jsx":"e6ebf9437933","ui_kits/website/HomePage.jsx":"70846ec3780a","ui_kits/website/MenuPage.jsx":"82931450ceab","ui_kits/website/OccasionsPage.jsx":"3d0350978fa6","ui_kits/website/RoomsPage.jsx":"f8b5d1e32017","ui_kits/website/Section.jsx":"9f296b03ab63","ui_kits/website/StoryPage.jsx":"c3a47ea72271","ui_kits/website/VisitPage.jsx":"4145c8ef25d8","ui_kits/website/data.js":"06e35075ecdd","ui_kits/website/ds-fallback.js":"5868844a82f1"},"inlinedExternals":[],"unexposedExports":[{"name":"cx","sourcePath":"components/lib/helpers.js"},{"name":"lalpaarStyle","sourcePath":"components/lib/helpers.js"},{"name":"prefersReducedMotion","sourcePath":"components/lib/helpers.js"},{"name":"renderIcon","sourcePath":"components/lib/helpers.js"},{"name":"renderMotif","sourcePath":"components/lib/helpers.js"},{"name":"renderWordmark","sourcePath":"components/lib/helpers.js"},{"name":"romanNumerals","sourcePath":"components/lib/helpers.js"},{"name":"useCompact","sourcePath":"components/lib/helpers.js"},{"name":"useDrawOnView","sourcePath":"components/lib/helpers.js"},{"name":"useReducedMotion","sourcePath":"components/lib/helpers.js"},{"name":"useReveal","sourcePath":"components/lib/helpers.js"}]} */

(() => {

const __ds_ns = (window.BaroKuthiDesignSystem_e9f570 = window.BaroKuthiDesignSystem_e9f570 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/lib/helpers.js
try { (() => {
const h = React.createElement;
function cx(...a) {
  return a.filter(Boolean).join(' ');
}

/* [ref, compact] — compact when the element itself is narrower than 768px (works inside phone frames too). */
function useCompact(layout = 'auto', breakpoint = 768) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(() => typeof window === 'undefined' ? 1280 : window.innerWidth);
  React.useLayoutEffect(() => {
    if (layout !== 'auto') return undefined;
    const el = ref.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.offsetWidth || window.innerWidth);
    measure();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout]);
  const compact = layout === 'mobile' || layout === 'auto' && width < breakpoint;
  return [ref, compact, width];
}
function prefersReducedMotion() {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function useReducedMotion() {
  const [r, setR] = React.useState(prefersReducedMotion);
  React.useEffect(() => {
    if (!window.matchMedia) return undefined;
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setR(m.matches);
    if (m.addEventListener) m.addEventListener('change', on);else m.addListener(on);
    return () => {
      if (m.removeEventListener) m.removeEventListener('change', on);else m.removeListener(on);
    };
  }, []);
  return r;
}

/* Reveal once: fade + 24px rise. Elements already on screen at mount are left alone (no flash, no invisible captures). */
function useReveal(ref, delay = 0, enabled = true) {
  React.useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;
    el.setAttribute('data-reveal', 'pending');
    if (delay) el.style.setProperty('--reveal-delay', delay + 'ms');
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        el.setAttribute('data-reveal', 'done');
        io.disconnect();
      }
    }, {
      rootMargin: '0px 0px -8% 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
}

/* 'idle' (static, drawn) | 'pending' (hidden, waiting) | 'drawn' (animating in). Used for line-draw motifs. */
function useDrawOnView(ref, enabled = true) {
  const [state, setState] = React.useState('idle');
  React.useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;
    setState('pending');
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setState('drawn');
        io.disconnect();
      }
    }, {
      rootMargin: '0px 0px -10% 0px'
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const paths = el.querySelectorAll('svg path, svg line, svg polyline, svg circle, svg rect, svg ellipse');
    paths.forEach(p => {
      if (!p.getTotalLength) return;
      const len = p.getTotalLength();
      if (state === 'pending') {
        p.style.transition = 'none';
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
      }
      if (state === 'drawn') {
        p.getBoundingClientRect();
        p.style.transition = 'stroke-dashoffset var(--dur-draw) var(--ease-heritage)';
        p.style.strokeDashoffset = 0;
      }
    });
  }, [state]);
  return state;
}

/* A motif slot: URL string → <img>, React node → inline (so paths can line-draw), empty → null (caller renders fallback). */
function renderMotif(src, className, alt) {
  if (!src) return null;
  if (typeof src === 'string') return h('img', {
    src,
    alt: alt || '',
    className,
    'aria-hidden': alt ? undefined : true,
    draggable: false
  });
  return h('span', {
    className,
    'aria-hidden': true
  }, src);
}

/* No crest artwork was supplied — the brand name is set in plain type wherever the mark would go. */
function renderWordmark({
  size = 'md',
  tone = 'light',
  tagline = true
} = {}) {
  return h('span', {
    className: cx('bk-wordmark', 'bk-wordmark--' + size, 'bk-wordmark--' + tone)
  }, h('span', {
    className: 'bk-wordmark__name'
  }, 'Baro Kuthi'), tagline ? h('span', {
    className: 'bk-wordmark__tag'
  }, 'Rajbari · The Heritage Dining') : null);
}
function lalpaarStyle(src) {
  return src ? {
    backgroundImage: 'url("' + src + '")',
    backgroundColor: 'transparent'
  } : undefined;
}
const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

/* Icons: copied from Lucide (ISC licence), redrawn at the brand's 1.25px stroke. Only the phone glyph is used. */
const ICONS = {
  phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'
};
function renderIcon(name, className) {
  return h('svg', {
    className: cx('bk-icon', className),
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    focusable: 'false'
  }, h('path', {
    d: ICONS[name]
  }));
}
Object.assign(__ds_scope, { cx, useCompact, prefersReducedMotion, useReducedMotion, useReveal, useDrawOnView, renderMotif, renderWordmark, lalpaarStyle, romanNumerals, renderIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/lib/helpers.js", error: String((e && e.message) || e) }); }

// components/sections/menu-book/MenuBook.jsx
try { (() => {
function MenuPage({
  page,
  limit,
  currency,
  className
}) {
  const items = limit ? (page.items || []).slice(0, limit) : page.items || [];
  return /*#__PURE__*/React.createElement("div", {
    className: __ds_scope.cx('bk-book__page', className)
  }, /*#__PURE__*/React.createElement("header", {
    className: "bk-book__head"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "bk-book__title"
  }, page.title), /*#__PURE__*/React.createElement("span", {
    className: "bk-book__rule",
    "aria-hidden": "true"
  }), page.subtitle && /*#__PURE__*/React.createElement("p", {
    className: "bk-book__subtitle"
  }, page.subtitle)), /*#__PURE__*/React.createElement("ul", {
    className: "bk-book__items"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: (it.id || it.name) + i,
    className: "bk-menuitem"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-menuitem__row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-menuitem__name"
  }, it.name), /*#__PURE__*/React.createElement("span", {
    className: "bk-leader",
    "aria-hidden": "true"
  }), it.price != null && /*#__PURE__*/React.createElement("span", {
    className: "bk-menuitem__price"
  }, currency, " ", it.price)), it.description && /*#__PURE__*/React.createElement("p", {
    className: "bk-menuitem__desc"
  }, it.description), it.speciality && /*#__PURE__*/React.createElement("p", {
    className: "bk-menuitem__mark"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-menuitem__crest",
    "aria-hidden": "true"
  }, "\u2726"), "House speciality")))));
}
function MenuBook({
  pages = [],
  limit,
  currency = '₹',
  defaultPage = 0,
  footer,
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  const [active, setActive] = React.useState(defaultPage);
  const [dir, setDir] = React.useState(null);
  const single = pages.length < 2;
  const turn = i => {
    if (i === active) return;
    setDir(i > active ? 'fwd' : 'back');
    setActive(i);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: __ds_scope.cx('bk-book', single && 'bk-book--single', compact && 'bk-compact bk-book--compact', className),
    style: style
  }, compact && !single ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "bk-book__tabs",
    role: "tablist",
    "aria-label": "The two tables"
  }, pages.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    role: "tab",
    "aria-selected": i === active,
    className: "bk-book__tab",
    onClick: () => turn(i)
  }, p.tab || p.title))), /*#__PURE__*/React.createElement(MenuPage, {
    key: active,
    page: pages[active] || {},
    limit: limit,
    currency: currency,
    className: dir && 'is-turning-' + dir
  })) : /*#__PURE__*/React.createElement("div", {
    className: "bk-book__spread"
  }, pages.map((p, i) => /*#__PURE__*/React.createElement(MenuPage, {
    key: i,
    page: p,
    limit: limit,
    currency: currency
  }))), footer && /*#__PURE__*/React.createElement("div", {
    className: "bk-book__footer"
  }, footer));
}
Object.assign(__ds_scope, { MenuBook });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/menu-book/MenuBook.jsx", error: String((e && e.message) || e) }); }

// components/ui/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  fullWidth = false,
  disabled = false,
  type = 'button',
  target,
  rel,
  className,
  style,
  ...rest
}) {
  const cls = __ds_scope.cx('bk-btn', 'bk-btn--' + variant, fullWidth && 'bk-btn--full', className);
  const label = /*#__PURE__*/React.createElement("span", {
    className: "bk-btn__label"
  }, children);
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      className: cls,
      href: href,
      onClick: onClick,
      target: target,
      rel: rel,
      style: style
    }, rest), label);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    onClick: onClick,
    disabled: disabled,
    style: style
  }, rest), label);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/layout/call-bar/StickyCallBar.jsx
try { (() => {
const WA = 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table';
function StickyCallBar({
  phoneHref = 'tel:+918240383737',
  whatsappHref = WA,
  callLabel = 'Call',
  whatsappLabel = 'WhatsApp',
  position = 'fixed',
  visibility = 'mobile',
  spacer = true,
  className,
  style
}) {
  const only = visibility === 'mobile' && 'bk-mobile-only';
  return /*#__PURE__*/React.createElement(React.Fragment, null, position === 'fixed' && spacer && /*#__PURE__*/React.createElement("div", {
    className: __ds_scope.cx('bk-callbar-spacer', only),
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: __ds_scope.cx('bk-callbar', 'bk-callbar--' + position, only, className),
    style: style,
    role: "region",
    "aria-label": "Reserve by telephone or WhatsApp"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    href: phoneHref,
    fullWidth: true
  }, callLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    href: whatsappHref,
    target: "_blank",
    rel: "noopener",
    fullWidth: true
  }, whatsappLabel)));
}
Object.assign(__ds_scope, { StickyCallBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/call-bar/StickyCallBar.jsx", error: String((e && e.message) || e) }); }

// components/layout/header/Header.jsx
try { (() => {
const LEFT = [{
  label: 'The Story',
  href: '#story'
}, {
  label: 'The Menu',
  href: '#menu'
}, {
  label: 'The Rooms',
  href: '#rooms'
}];
const RIGHT = [{
  label: 'Occasions',
  href: '#occasions'
}, {
  label: 'Visit',
  href: '#visit'
}];
const PHONE = {
  display: '+91 82403 83737',
  href: 'tel:+918240383737'
};
function Header({
  leftLinks = LEFT,
  rightLinks = RIGHT,
  phone = PHONE,
  activeHref,
  homeHref = '#home',
  onNavigate,
  crest,
  lalpaar,
  layout = 'auto',
  condensed,
  sticky = true,
  menuOpen,
  onMenuOpenChange,
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout, 1200);
  const [scrolled, setScrolled] = React.useState(false);
  const [openState, setOpenState] = React.useState(false);
  const open = menuOpen != null ? menuOpen : openState;
  const setOpen = v => {
    setOpenState(v);
    if (onMenuOpenChange) onMenuOpenChange(v);
  };
  React.useEffect(() => {
    if (condensed != null) return undefined;
    const on = () => setScrolled(window.scrollY > 120);
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => window.removeEventListener('scroll', on);
  }, [condensed]);
  React.useEffect(() => {
    if (!open || !compact || menuOpen != null) return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, compact]);
  const shrunk = condensed != null ? condensed : scrolled;
  const go = (e, href) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
    setOpen(false);
  };
  const tab = open ? 0 : -1;
  const navLink = l => /*#__PURE__*/React.createElement("a", {
    key: l.href + l.label,
    href: l.href,
    onClick: e => go(e, l.href),
    className: __ds_scope.cx('bk-header__link', activeHref === l.href && 'is-active'),
    "aria-current": activeHref === l.href ? 'page' : undefined
  }, l.label);
  const brand = (tone, small, tabIndex) => /*#__PURE__*/React.createElement("a", {
    className: "bk-header__brand",
    href: homeHref,
    onClick: e => go(e, homeHref),
    "aria-label": "Baro Kuthi \u2014 home",
    tabIndex: tabIndex
  }, crest ? __ds_scope.renderMotif(crest, 'bk-header__crest') : null, (!crest || !small) && __ds_scope.renderWordmark({
    size: small ? 'sm' : 'md',
    tone,
    tagline: !small
  }));
  const all = [...leftLinks, ...rightLinks];
  return /*#__PURE__*/React.createElement("header", {
    ref: ref,
    className: __ds_scope.cx('bk-header', compact ? 'bk-header--mobile bk-compact' : 'bk-header--desktop', shrunk && 'is-condensed', sticky && 'is-sticky', className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-lalpaar",
    style: __ds_scope.lalpaarStyle(lalpaar),
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-header__bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-header__inner"
  }, compact ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: __ds_scope.cx('bk-header__menu-btn', open && 'is-open'),
    "aria-label": "Open menu",
    "aria-expanded": open,
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), brand('light', true), /*#__PURE__*/React.createElement("a", {
    className: "bk-header__phone-btn",
    href: phone.href,
    "aria-label": 'Telephone ' + phone.display
  }, __ds_scope.renderIcon('phone'))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    className: "bk-header__nav",
    "aria-label": "Primary"
  }, leftLinks.map(navLink)), brand('light', shrunk), /*#__PURE__*/React.createElement("nav", {
    className: "bk-header__nav bk-header__nav--right",
    "aria-label": "Secondary"
  }, rightLinks.map(navLink), /*#__PURE__*/React.createElement("a", {
    className: "bk-header__phone",
    href: phone.href
  }, phone.display))))), compact && /*#__PURE__*/React.createElement("div", {
    className: __ds_scope.cx('bk-menu', open && 'is-open'),
    "aria-hidden": !open,
    role: "dialog",
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-menu__top"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "bk-header__menu-btn is-open",
    "aria-label": "Close menu",
    onClick: () => setOpen(false),
    tabIndex: tab
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), brand('dark', true, tab), /*#__PURE__*/React.createElement("a", {
    className: "bk-header__phone-btn bk-header__phone-btn--dark",
    href: phone.href,
    "aria-label": 'Telephone ' + phone.display,
    tabIndex: tab
  }, __ds_scope.renderIcon('phone'))), /*#__PURE__*/React.createElement("ol", {
    className: "bk-menu__list"
  }, all.map((l, i) => /*#__PURE__*/React.createElement("li", {
    key: l.href + l.label,
    className: "bk-menu__item",
    style: {
      '--i': i
    }
  }, /*#__PURE__*/React.createElement("a", {
    className: __ds_scope.cx('bk-menu__link', activeHref === l.href && 'is-active'),
    href: l.href,
    onClick: e => go(e, l.href),
    tabIndex: tab
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-menu__num"
  }, __ds_scope.romanNumerals[i]), /*#__PURE__*/React.createElement("span", null, l.label))))), /*#__PURE__*/React.createElement("div", {
    className: "bk-menu__foot"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "on-dark",
    href: phone.href,
    fullWidth: true,
    tabIndex: tab
  }, "Reserve by Telephone"), /*#__PURE__*/React.createElement("a", {
    className: "bk-menu__phone",
    href: phone.href,
    tabIndex: tab
  }, phone.display))));
}
Object.assign(__ds_scope, { Header });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/header/Header.jsx", error: String((e && e.message) || e) }); }

// components/ui/actions/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextLink({
  href,
  onClick,
  children,
  arrow = true,
  tone = 'light',
  target,
  rel,
  className,
  style,
  ...rest
}) {
  const cls = __ds_scope.cx('bk-textlink', tone === 'dark' && 'bk-textlink--dark', className);
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "bk-textlink__label"
  }, children), arrow && /*#__PURE__*/React.createElement("span", {
    className: "bk-textlink__arrow",
    "aria-hidden": "true"
  }, "\u2192"));
  if (!href && onClick) {
    return /*#__PURE__*/React.createElement("button", _extends({
      type: "button",
      className: cls,
      onClick: onClick,
      style: style
    }, rest), inner);
  }
  return /*#__PURE__*/React.createElement("a", _extends({
    className: cls,
    href: href || '#',
    onClick: onClick,
    target: target,
    rel: rel,
    style: style
  }, rest), inner);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/actions/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/sections/guest-book/GuestBook.jsx
try { (() => {
function GuestBook({
  reviews = [],
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: __ds_scope.cx('bk-guestbook', compact && 'bk-compact', className),
    style: style
  }, reviews.map((r, i) => /*#__PURE__*/React.createElement("figure", {
    key: i,
    className: "bk-guest"
  }, r.date && /*#__PURE__*/React.createElement("p", {
    className: "bk-guest__date"
  }, r.date), /*#__PURE__*/React.createElement("blockquote", {
    className: "bk-guest__quote"
  }, "\u201C", r.quote, "\u201D"), /*#__PURE__*/React.createElement("figcaption", {
    className: "bk-guest__foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-guest__name"
  }, r.name), r.href && /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: r.href,
    target: "_blank",
    rel: "noopener"
  }, r.source || 'Google review')))));
}
Object.assign(__ds_scope, { GuestBook });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/guest-book/GuestBook.jsx", error: String((e && e.message) || e) }); }

// components/ui/frames/ArchImage.jsx
try { (() => {
const RATIO = {
  arch: '3 / 4',
  tall: '2 / 3',
  wide: '16 / 9',
  cinema: '21 / 9',
  square: '1 / 1'
};
const LABEL = {
  arch: '3:4',
  tall: '2:3',
  wide: '16:9',
  cinema: '21:9',
  square: '1:1'
};
function ArchImage({
  src,
  alt = '',
  shape = 'arch',
  tone = 'light',
  width,
  height,
  loading = 'lazy',
  parallax = false,
  caption,
  className,
  style
}) {
  const frameRef = React.useRef(null);
  const imgRef = React.useRef(null);
  React.useEffect(() => {
    if (!parallax || !src || __ds_scope.prefersReducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const f = frameRef.current,
        img = imgRef.current;
      if (!f || !img) return;
      const r = f.getBoundingClientRect();
      const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      img.style.transform = 'translateY(' + (p * -4).toFixed(2) + '%) scale(1.08)';
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, [parallax, src]);
  return /*#__PURE__*/React.createElement("figure", {
    className: __ds_scope.cx('bk-img', 'bk-img--' + shape, 'bk-img--' + tone, className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    ref: frameRef,
    className: "bk-img__frame",
    style: {
      aspectRatio: RATIO[shape] || RATIO.arch
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    ref: imgRef,
    className: "bk-img__img",
    src: src,
    alt: alt,
    width: width,
    height: height,
    loading: loading
  }) : /*#__PURE__*/React.createElement("div", {
    className: "bk-img__placeholder",
    role: "img",
    "aria-label": alt || 'Photograph to come'
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-img__ph-label"
  }, "Photograph \xB7 ", LABEL[shape] || LABEL.arch), alt && /*#__PURE__*/React.createElement("span", {
    className: "bk-img__ph-alt"
  }, alt))), caption && /*#__PURE__*/React.createElement("figcaption", {
    className: "bk-img__caption"
  }, caption));
}
Object.assign(__ds_scope, { ArchImage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/frames/ArchImage.jsx", error: String((e && e.message) || e) }); }

// components/ui/frames/Divider.jsx
try { (() => {
function Divider({
  motif,
  width = 480,
  space,
  draw = true,
  className,
  style
}) {
  const ref = React.useRef(null);
  const state = __ds_scope.useDrawOnView(ref, draw);
  const vars = {
    '--divider-w': width + 'px'
  };
  if (space != null) vars['--divider-space'] = space + 'px';
  let body;
  if (typeof motif === 'string') body = /*#__PURE__*/React.createElement("span", {
    className: "bk-divider__motif",
    style: {
      backgroundImage: 'url("' + motif + '")'
    }
  });else if (motif) body = /*#__PURE__*/React.createElement("span", {
    className: "bk-divider__motif bk-divider__motif--inline"
  }, motif);else body = /*#__PURE__*/React.createElement("span", {
    className: __ds_scope.cx('bk-divider__rule', 'is-' + state)
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    role: "separator",
    className: __ds_scope.cx('bk-divider', className),
    style: {
      ...vars,
      ...style
    }
  }, body);
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/frames/Divider.jsx", error: String((e && e.message) || e) }); }

// components/ui/frames/FrameDouble.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FILLS = {
  none: 'transparent',
  parchment: 'var(--parchment)',
  'parchment-dark': 'var(--parchment-dark)',
  'terracotta-deep': 'var(--terracotta-deep)'
};
function FrameDouble({
  as: Tag = 'div',
  fill = 'none',
  padding = 48,
  children,
  className,
  style,
  ...rest
}) {
  const pad = typeof padding === 'number' ? padding + 'px' : padding;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: __ds_scope.cx('bk-frame', className),
    style: {
      background: FILLS[fill] || fill,
      padding: pad,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { FrameDouble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/frames/FrameDouble.jsx", error: String((e && e.message) || e) }); }

// components/ui/type/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  numeral,
  tone = 'light',
  as: Tag = 'p',
  className,
  style
}) {
  return /*#__PURE__*/React.createElement(Tag, {
    className: __ds_scope.cx('bk-eyebrow', 'bk-eyebrow--' + tone, className),
    style: style
  }, numeral && /*#__PURE__*/React.createElement("span", {
    className: "bk-eyebrow__numeral"
  }, numeral), numeral && children && /*#__PURE__*/React.createElement("span", {
    className: "bk-eyebrow__sep",
    "aria-hidden": "true"
  }, "\xB7"), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/type/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/layout/footer/Footer.jsx
try { (() => {
function Footer({
  address = ['Baro Kuthi Rajbari', 'Paikpara, Kolkata'],
  mapHref,
  hours = [{
    label: 'Dinner',
    value: 'From 7 pm'
  }],
  gettingHere = [],
  banquetHref = 'https://barokuthirajbari.com',
  banquetLabel = 'Visit the Banquet House',
  year = new Date().getFullYear(),
  crest,
  lalpaar,
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact, width] = __ds_scope.useCompact(layout);
  const mid = !compact && layout === 'auto' && width < 1100;
  const list = rows => /*#__PURE__*/React.createElement("dl", {
    className: "bk-footer__list"
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "bk-footer__row"
  }, /*#__PURE__*/React.createElement("dt", null, r.label), /*#__PURE__*/React.createElement("dd", null, r.value))));
  return /*#__PURE__*/React.createElement("footer", {
    ref: ref,
    className: __ds_scope.cx('bk-footer', compact && 'bk-compact bk-footer--compact', mid && 'bk-footer--mid', className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-footer__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-footer__cols"
  }, /*#__PURE__*/React.createElement("section", {
    className: "bk-footer__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "dark",
    as: "h2"
  }, "Address"), /*#__PURE__*/React.createElement("address", {
    className: "bk-footer__text"
  }, address.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))), mapHref && /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    tone: "dark",
    href: mapHref,
    target: "_blank",
    rel: "noopener"
  }, "Open the map")), /*#__PURE__*/React.createElement("section", {
    className: "bk-footer__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "dark",
    as: "h2"
  }, "Hours"), list(hours)), /*#__PURE__*/React.createElement("section", {
    className: "bk-footer__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "dark",
    as: "h2"
  }, "Getting here"), list(gettingHere)), /*#__PURE__*/React.createElement("section", {
    className: "bk-footer__col bk-footer__col--brand"
  }, crest ? __ds_scope.renderMotif(crest, 'bk-footer__crest', 'Baro Kuthi crest') : __ds_scope.renderWordmark({
    size: 'md',
    tone: 'dark'
  }), /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    tone: "dark",
    href: banquetHref
  }, banquetLabel))), /*#__PURE__*/React.createElement("p", {
    className: "bk-footer__legal"
  }, "\xA9 ", year, " \xB7 BARO KUTHI RAJ BARI \xB7 The Heritage Dining")), /*#__PURE__*/React.createElement("div", {
    className: "bk-lalpaar",
    style: __ds_scope.lalpaarStyle(lalpaar),
    "aria-hidden": "true"
  }));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/footer/Footer.jsx", error: String((e && e.message) || e) }); }

// components/layout/invitation/InvitationIntro.jsx
try { (() => {
const BOT = /bot|crawl|spider|slurp|lighthouse|headless/i;
function seenRecently(key, days) {
  try {
    const t = Number(window.localStorage.getItem(key));
    return !!t && Date.now() - t < days * 864e5;
  } catch (e) {
    return false;
  }
}
function remember(key) {
  try {
    window.localStorage.setItem(key, String(Date.now()));
  } catch (e) {/* storage unavailable — show again next time */}
}
function InvitationIntro({
  open,
  onEnter,
  onSkip,
  storageKey = 'bk-invitation-seen',
  rememberDays = 30,
  seal,
  shutter,
  position = 'fixed',
  className,
  style
}) {
  const [phase, setPhase] = React.useState(() => {
    if (open != null) return open ? 'idle' : 'gone';
    if (typeof window === 'undefined') return 'gone';
    if (navigator.webdriver || BOT.test(navigator.userAgent || '')) return 'gone';
    if (__ds_scope.prefersReducedMotion()) return 'gone';
    return seenRecently(storageKey, rememberDays) ? 'gone' : 'idle';
  });
  const timer = React.useRef(0);
  React.useEffect(() => {
    if (open != null) setPhase(open ? 'idle' : 'gone');
  }, [open]);
  React.useEffect(() => () => window.clearTimeout(timer.current), []);
  React.useEffect(() => {
    if (phase === 'gone' || position !== 'fixed') return undefined;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = prev;
    };
  }, [phase === 'gone', position]);
  const enter = () => {
    remember(storageKey);
    if (__ds_scope.prefersReducedMotion()) {
      setPhase('gone');
      if (onEnter) onEnter();
      return;
    }
    setPhase('opening');
    timer.current = window.setTimeout(() => {
      setPhase('gone');
      if (onEnter) onEnter();
    }, 1200);
  };
  const skip = e => {
    if (e) e.preventDefault();
    remember(storageKey);
    setPhase('gone');
    if (onSkip) onSkip();else if (onEnter) onEnter();
  };
  if (phase === 'gone') return null;
  const panel = shutter ? {
    backgroundImage: 'url("' + shutter + '")'
  } : undefined;
  return /*#__PURE__*/React.createElement("div", {
    className: __ds_scope.cx('bk-invite', 'bk-invite--' + position, phase === 'opening' && 'is-opening', className),
    style: style,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "An invitation from the house"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-invite__panel bk-invite__panel--left",
    style: panel,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-invite__panel bk-invite__panel--right",
    style: panel,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-invite__skip"
  }, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: "#",
    onClick: skip
  }, "Skip")), /*#__PURE__*/React.createElement("div", {
    className: "bk-invite__card bk-frame"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "An Invitation"), /*#__PURE__*/React.createElement("p", {
    className: "bk-invite__line"
  }, "The Household of"), /*#__PURE__*/React.createElement("p", {
    className: "bk-invite__house"
  }, "Baro Kuthi"), /*#__PURE__*/React.createElement("p", {
    className: "bk-invite__line"
  }, "requests the pleasure of your company at dinner."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: __ds_scope.cx('bk-invite__seal', seal && 'bk-invite__seal--art'),
    onClick: enter,
    "aria-label": "Break the seal and enter"
  }, seal ? __ds_scope.renderMotif(seal, 'bk-invite__seal-art') : /*#__PURE__*/React.createElement("span", {
    className: "bk-invite__seal-label"
  }, "Enter")), /*#__PURE__*/React.createElement("p", {
    className: "bk-invite__hint"
  }, "Touch the seal to enter")));
}
Object.assign(__ds_scope, { InvitationIntro });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/invitation/InvitationIntro.jsx", error: String((e && e.message) || e) }); }

// components/sections/hero/Hero.jsx
try { (() => {
function Hero({
  image,
  imageAlt = 'The Baro Kuthi façade at dusk, lamps lit',
  eyebrow = 'Est. 1823 · Paikpara, Kolkata',
  title = 'The Rajbari Table',
  lead = 'The house receives guests for dinner from 7 pm.',
  primaryAction = {
    label: 'Reserve by Telephone',
    href: 'tel:+918240383737'
  },
  secondaryAction = {
    label: 'View the Menu',
    href: '#menu'
  },
  chandelier,
  height,
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  const chRef = React.useRef(null);
  React.useEffect(() => {
    if (!chandelier || __ds_scope.prefersReducedMotion()) return undefined;
    let lastY = window.scrollY,
      lastT = performance.now(),
      settle = 0;
    const on = () => {
      const now = performance.now();
      const v = (window.scrollY - lastY) / Math.max(16, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      const deg = Math.max(-1.5, Math.min(1.5, v * 3));
      if (chRef.current) chRef.current.style.setProperty('--sway', deg.toFixed(2) + 'deg');
      window.clearTimeout(settle);
      settle = window.setTimeout(() => {
        if (chRef.current) chRef.current.style.setProperty('--sway', '0deg');
      }, 160);
    };
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', on);
      window.clearTimeout(settle);
    };
  }, [chandelier]);
  const action = (a, variant) => a && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: variant,
    href: a.href,
    onClick: a.onClick
  }, a.label);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    className: __ds_scope.cx('bk-hero', compact && 'bk-compact bk-hero--compact', className),
    style: {
      minHeight: height,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__media"
  }, image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: imageAlt,
    className: "bk-hero__img",
    fetchpriority: "high"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__placeholder",
    role: "img",
    "aria-label": imageAlt
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-hero__ph"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-hero__ph-label"
  }, "Photograph \xB7 21:9"), /*#__PURE__*/React.createElement("span", {
    className: "bk-hero__ph-alt"
  }, imageAlt)))), /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__shade",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__frame bk-frame",
    "aria-hidden": "true"
  }), chandelier && /*#__PURE__*/React.createElement("div", {
    ref: chRef,
    className: "bk-hero__chandelier"
  }, __ds_scope.renderMotif(chandelier, 'bk-hero__chandelier-art')), /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__content"
  }, eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    tone: "dark"
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "bk-hero__title"
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    className: "bk-hero__lead"
  }, lead), (primaryAction || secondaryAction) && /*#__PURE__*/React.createElement("div", {
    className: "bk-hero__actions"
  }, action(primaryAction, 'primary'), action(secondaryAction, 'on-dark'))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/hero/Hero.jsx", error: String((e && e.message) || e) }); }

// components/sections/info-strip/InfoStrip.jsx
try { (() => {
const PHONE = {
  display: '+91 82403 83737',
  href: 'tel:+918240383737'
};
const WA = 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table';
function InfoStrip({
  hours = 'The house receives guests from 7 pm',
  address = 'Paikpara, Kolkata',
  mapHref,
  phone = PHONE,
  whatsappHref = WA,
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    className: __ds_scope.cx('bk-info', compact && 'bk-compact', className),
    style: style,
    "aria-label": "Hours, address and reservations"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-info__inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-info__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Hours"), /*#__PURE__*/React.createElement("p", {
    className: "bk-info__value"
  }, hours)), /*#__PURE__*/React.createElement("div", {
    className: "bk-info__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Address"), /*#__PURE__*/React.createElement("p", {
    className: "bk-info__value"
  }, address), mapHref && /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: mapHref,
    target: "_blank",
    rel: "noopener"
  }, "Directions")), /*#__PURE__*/React.createElement("div", {
    className: "bk-info__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Call \xB7 WhatsApp"), /*#__PURE__*/React.createElement("a", {
    className: "bk-info__phone",
    href: phone.href
  }, phone.display), /*#__PURE__*/React.createElement("div", {
    className: "bk-info__links"
  }, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: phone.href
  }, "Call"), /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: whatsappHref,
    target: "_blank",
    rel: "noopener"
  }, "WhatsApp")))));
}
Object.assign(__ds_scope, { InfoStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/info-strip/InfoStrip.jsx", error: String((e && e.message) || e) }); }

// components/sections/rooms/RoomCard.jsx
try { (() => {
function RoomCard({
  image,
  imageAlt,
  name,
  eyebrow,
  description,
  action,
  className,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: __ds_scope.cx('bk-room', className),
    style: style
  }, /*#__PURE__*/React.createElement(__ds_scope.ArchImage, {
    src: image,
    alt: imageAlt,
    shape: "arch"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-room__body"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "bk-room__name"
  }, name), eyebrow && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, eyebrow), description && /*#__PURE__*/React.createElement("p", {
    className: "bk-room__desc"
  }, description), action && /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    href: action.href,
    onClick: action.onClick
  }, action.label)));
}
Object.assign(__ds_scope, { RoomCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/rooms/RoomCard.jsx", error: String((e && e.message) || e) }); }

// components/sections/rooms/RoomRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function RoomRow({
  rooms = [],
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact, width] = __ds_scope.useCompact(layout);
  const scroller = React.useRef(null);
  const [bar, setBar] = React.useState({
    left: 0,
    size: 100
  });
  const cols = compact ? 0 : width < 1100 ? 2 : 4;
  const measure = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const size = el.scrollWidth ? el.clientWidth / el.scrollWidth * 100 : 100;
    setBar({
      size,
      left: max > 0 ? el.scrollLeft / max * (100 - size) : 0
    });
  };
  React.useEffect(() => {
    if (compact) measure();
  }, [compact, rooms.length, width]);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: __ds_scope.cx('bk-rooms', compact ? 'bk-rooms--swipe bk-compact' : 'bk-rooms--cols-' + cols, className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    ref: scroller,
    className: "bk-rooms__scroller",
    onScroll: compact ? measure : undefined
  }, rooms.map((r, i) => /*#__PURE__*/React.createElement(__ds_scope.RoomCard, _extends({
    key: r.name + i
  }, r)))), compact && /*#__PURE__*/React.createElement("div", {
    className: "bk-rooms__progress",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-rooms__thumb",
    style: {
      left: bar.left + '%',
      width: bar.size + '%'
    }
  })));
}
Object.assign(__ds_scope, { RoomRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/rooms/RoomRow.jsx", error: String((e && e.message) || e) }); }

// components/ui/type/SectionHeading.jsx
try { (() => {
function SectionHeading({
  eyebrow,
  numeral,
  title,
  lead,
  tone = 'light',
  align,
  ornament,
  as: Tag = 'h2',
  size = 'h2',
  reveal = true,
  className,
  style
}) {
  const ref = React.useRef(null);
  __ds_scope.useReveal(ref, 0, reveal);
  const a = align || (tone === 'light' ? 'left' : 'center');
  return /*#__PURE__*/React.createElement("header", {
    ref: ref,
    className: __ds_scope.cx('bk-heading', 'bk-heading--' + tone, 'bk-heading--' + a, className),
    style: style
  }, ornament !== false && /*#__PURE__*/React.createElement("div", {
    className: "bk-heading__ornament",
    "aria-hidden": "true"
  }, __ds_scope.renderMotif(ornament, 'bk-heading__motif') || /*#__PURE__*/React.createElement("span", {
    className: "bk-heading__rule"
  })), (eyebrow || numeral) && /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, {
    numeral: numeral,
    tone: tone
  }, eyebrow), title && /*#__PURE__*/React.createElement(Tag, {
    className: __ds_scope.cx('bk-heading__title', 'bk-heading__title--' + size)
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    className: "bk-heading__lead"
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/type/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/sections/course-scroll/CourseScroll.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CourseScroll({
  courses = [],
  heading,
  mode = 'auto',
  activeIndex,
  onActiveChange,
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  const reduced = __ds_scope.useReducedMotion();
  const m = mode === 'auto' ? compact || reduced ? 'stack' : 'pinned' : mode;
  const [active, setActive] = React.useState(activeIndex || 0);
  const trackRef = React.useRef(null);
  const n = courses.length;
  React.useEffect(() => {
    if (activeIndex != null) setActive(activeIndex);
  }, [activeIndex]);
  React.useEffect(() => {
    if (onActiveChange) onActiveChange(active);
  }, [active]);
  React.useEffect(() => {
    if (m !== 'pinned' || !n) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(0.9999, Math.max(0, -r.top / total));
      const i = Math.floor(p * n);
      setActive(prev => prev === i ? prev : i);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', on, {
      passive: true
    });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, [m, n]);
  const jump = i => {
    if (m === 'pinned' && trackRef.current) {
      const r = trackRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      window.scrollTo({
        top: window.scrollY + r.top + (i + 0.5) / n * total,
        behavior: reduced ? 'auto' : 'smooth'
      });
    } else setActive(i);
  };
  const c = courses[Math.min(active, n - 1)] || {};
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    className: __ds_scope.cx('bk-courses', 'bk-courses--' + m, compact && 'bk-compact', className),
    style: style
  }, heading && /*#__PURE__*/React.createElement("div", {
    className: "bk-courses__head"
  }, /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, _extends({
    tone: "dark"
  }, heading))), m === 'stack' ? /*#__PURE__*/React.createElement("ol", {
    className: "bk-courses__stack"
  }, courses.map((co, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "bk-course"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-course__dot",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bk-course__numeral"
  }, co.numeral), /*#__PURE__*/React.createElement("h3", {
    className: "bk-course__name"
  }, co.name), /*#__PURE__*/React.createElement("p", {
    className: "bk-course__note"
  }, co.note), /*#__PURE__*/React.createElement("div", {
    className: "bk-course__media"
  }, /*#__PURE__*/React.createElement(__ds_scope.ArchImage, {
    shape: "tall",
    tone: "dark",
    src: co.image,
    alt: co.imageAlt
  }))))) : /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    className: "bk-courses__track",
    style: m === 'pinned' ? {
      height: 'calc(' + n + ' * 55vh + 100vh)'
    } : undefined
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-courses__stage"
  }, /*#__PURE__*/React.createElement("ol", {
    className: "bk-courses__progress",
    "aria-label": "Courses"
  }, courses.map((co, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: __ds_scope.cx('bk-courses__dot', i === active && 'is-active', i < active && 'is-past'),
    onClick: () => jump(i),
    "aria-current": i === active ? 'step' : undefined,
    "aria-label": 'Course ' + co.numeral + ', ' + co.name
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-courses__dot-mark",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bk-courses__dot-label"
  }, co.numeral))))), /*#__PURE__*/React.createElement("div", {
    key: 't' + active,
    className: "bk-courses__text"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-course__numeral"
  }, c.numeral), /*#__PURE__*/React.createElement("h3", {
    className: "bk-course__name"
  }, c.name), /*#__PURE__*/React.createElement("p", {
    className: "bk-course__note"
  }, c.note), /*#__PURE__*/React.createElement("span", {
    className: "bk-niche bk-course__icon",
    "aria-hidden": "true"
  }, __ds_scope.renderMotif(c.icon))), /*#__PURE__*/React.createElement("div", {
    key: 'm' + active,
    className: "bk-courses__media"
  }, /*#__PURE__*/React.createElement(__ds_scope.ArchImage, {
    shape: "tall",
    tone: "dark",
    src: c.image,
    alt: c.imageAlt,
    loading: "eager"
  })))));
}
Object.assign(__ds_scope, { CourseScroll });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/course-scroll/CourseScroll.jsx", error: String((e && e.message) || e) }); }

// components/sections/occasions/OccasionBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const HEADING = {
  numeral: 'V',
  eyebrow: 'Occasions of the House',
  title: 'Celebrations, Arranged by the House',
  lead: 'Private dinners, family gatherings and midday tables for colleagues.'
};
const ITEMS = [{
  title: 'Private Dining',
  text: 'The Zamindar’s Study, arranged for an evening of your own.'
}, {
  title: 'Family Celebrations',
  text: 'Birthdays, anniversaries and annaprashan, hosted in the old manner.'
}, {
  title: 'Corporate Lunches',
  text: 'Midday tables for colleagues and guests, arranged by telephone.'
}];
function OccasionBand({
  heading = HEADING,
  items = ITEMS,
  action = {
    label: 'Arrange an Occasion',
    href: '#occasions'
  },
  checker,
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  return /*#__PURE__*/React.createElement("section", {
    ref: ref,
    className: __ds_scope.cx('bk-occasion', compact && 'bk-compact', className),
    style: style
  }, checker && /*#__PURE__*/React.createElement("div", {
    className: "bk-occasion__texture",
    style: {
      backgroundImage: 'url("' + checker + '")'
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-occasion__inner"
  }, heading && /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, _extends({
    tone: "terracotta",
    align: "center"
  }, heading)), /*#__PURE__*/React.createElement("ul", {
    className: "bk-occasion__items"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: it.title + i,
    className: "bk-occasion__item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-niche",
    "aria-hidden": "true"
  }, __ds_scope.renderMotif(it.icon)), /*#__PURE__*/React.createElement("h3", {
    className: "bk-occasion__title"
  }, it.title), /*#__PURE__*/React.createElement("p", {
    className: "bk-occasion__text"
  }, it.text)))), action && /*#__PURE__*/React.createElement("div", {
    className: "bk-occasion__action"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "on-dark",
    href: action.href,
    onClick: action.onClick
  }, action.label))));
}
Object.assign(__ds_scope, { OccasionBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/occasions/OccasionBand.jsx", error: String((e && e.message) || e) }); }

// components/sections/reservation/ReservationCard.jsx
try { (() => {
const PHONE = {
  display: '+91 82403 83737',
  href: 'tel:+918240383737'
};
const WA = 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table';
function ReservationCard({
  eyebrow = 'Reservations',
  numeral,
  title = 'Reserve a Table',
  message = 'Tables at Baro Kuthi are arranged personally. Please telephone our host.',
  phone = PHONE,
  whatsappHref = WA,
  whatsappLabel = 'Message on WhatsApp',
  hours = [{
    label: 'Dinner',
    value: 'From 7 pm'
  }],
  alpana,
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  const alpanaRef = React.useRef(null);
  __ds_scope.useDrawOnView(alpanaRef, !!alpana && typeof alpana !== 'string');
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: __ds_scope.cx('bk-resv', compact && 'bk-compact', className),
    style: style
  }, alpana && /*#__PURE__*/React.createElement("div", {
    ref: alpanaRef,
    className: "bk-resv__alpana",
    "aria-hidden": "true"
  }, __ds_scope.renderMotif(alpana, 'bk-resv__alpana-art')), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    eyebrow: eyebrow,
    numeral: numeral,
    title: title,
    lead: message,
    tone: "light",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bk-resv__grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-resv__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Reserve by Telephone"), /*#__PURE__*/React.createElement("a", {
    className: "bk-resv__phone",
    href: phone.href
  }, phone.display), whatsappHref && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    href: whatsappHref,
    target: "_blank",
    rel: "noopener"
  }, whatsappLabel)), /*#__PURE__*/React.createElement("div", {
    className: "bk-resv__col"
  }, /*#__PURE__*/React.createElement(__ds_scope.Eyebrow, null, "Hours"), /*#__PURE__*/React.createElement("ul", {
    className: "bk-resv__hours"
  }, hours.map((h, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "bk-resv__hour"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bk-resv__hour-label"
  }, h.label), /*#__PURE__*/React.createElement("span", {
    className: "bk-leader",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "bk-resv__hour-value"
  }, h.value)))))));
}
Object.assign(__ds_scope, { ReservationCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/reservation/ReservationCard.jsx", error: String((e && e.message) || e) }); }

// components/sections/story/StoryBlock.jsx
try { (() => {
function StoryBlock({
  image,
  imageAlt,
  eyebrow,
  numeral,
  year,
  title,
  lead,
  children,
  quote,
  action,
  reverse = false,
  tone = 'light',
  layout = 'auto',
  className,
  style
}) {
  const [ref, compact] = __ds_scope.useCompact(layout);
  const t = tone === 'dark' ? 'dark' : 'light';
  const body = typeof children === 'string' ? /*#__PURE__*/React.createElement("p", null, children) : children;
  return /*#__PURE__*/React.createElement("article", {
    ref: ref,
    className: __ds_scope.cx('bk-story', 'bk-story--' + t, reverse && 'bk-story--reverse', compact && 'bk-compact', className),
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "bk-story__media"
  }, /*#__PURE__*/React.createElement(__ds_scope.ArchImage, {
    src: image,
    alt: imageAlt,
    shape: "arch",
    tone: t,
    parallax: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "bk-story__text"
  }, year && /*#__PURE__*/React.createElement("p", {
    className: "bk-story__year"
  }, year), /*#__PURE__*/React.createElement(__ds_scope.SectionHeading, {
    eyebrow: eyebrow,
    numeral: numeral,
    title: title,
    lead: lead,
    tone: t,
    align: "left",
    ornament: year ? false : undefined
  }), body && /*#__PURE__*/React.createElement("div", {
    className: "bk-story__body"
  }, body), quote && /*#__PURE__*/React.createElement("blockquote", {
    className: "bk-story__quote"
  }, quote), action && /*#__PURE__*/React.createElement("div", {
    className: "bk-story__action"
  }, /*#__PURE__*/React.createElement(__ds_scope.TextLink, {
    tone: t,
    href: action.href,
    onClick: action.onClick
  }, action.label))));
}
Object.assign(__ds_scope, { StoryBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/sections/story/StoryBlock.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
const {
  Header: AHeader,
  Footer: AFooter,
  ReservationCard: AReservationCard,
  StickyCallBar: AStickyCallBar,
  InvitationIntro: AInvitationIntro
} = window.BaroKuthiDesignSystem_e9f570;
const ROUTES = {
  '#home': 'HomePage',
  '#story': 'StoryPage',
  '#menu': 'MenuPage',
  '#rooms': 'RoomsPage',
  '#occasions': 'OccasionsPage',
  '#visit': 'VisitPage'
};
const current = () => ROUTES[location.hash] ? location.hash : '#home';
function App() {
  const D = window.BK_DATA;
  const {
    PageSection
  } = window;
  const [route, setRoute] = React.useState(current);
  const forceIntro = new URLSearchParams(location.search).has('intro');
  React.useEffect(() => {
    const on = () => {
      setRoute(current());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const Page = window[ROUTES[route]];
  const home = route === '#home';
  return /*#__PURE__*/React.createElement(React.Fragment, null, home && /*#__PURE__*/React.createElement(AInvitationIntro, {
    open: forceIntro ? true : undefined
  }), /*#__PURE__*/React.createElement(AHeader, {
    activeHref: route,
    phone: D.site.phone
  }), /*#__PURE__*/React.createElement("main", {
    key: route
  }, /*#__PURE__*/React.createElement(Page, null), /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement(AReservationCard, {
    numeral: home ? 'VII' : undefined,
    eyebrow: home ? 'Reserve a Table' : 'Reservations',
    title: "Telephone the House",
    phone: D.site.phone,
    whatsappHref: D.site.whatsapp,
    hours: D.site.hours
  }))), /*#__PURE__*/React.createElement(AFooter, {
    address: D.site.address,
    mapHref: D.site.mapHref,
    hours: D.site.hours,
    gettingHere: D.site.gettingHere,
    banquetHref: D.site.banquetHref
  }), /*#__PURE__*/React.createElement(AStickyCallBar, {
    phoneHref: D.site.phone.href,
    whatsappHref: D.site.whatsapp
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
const {
  Hero,
  InfoStrip,
  StoryBlock,
  Divider,
  SectionHeading,
  MenuBook,
  TextLink,
  CourseScroll,
  RoomRow,
  OccasionBand,
  GuestBook
} = window.BaroKuthiDesignSystem_e9f570;
function HomePage() {
  const D = window.BK_DATA;
  const {
    PageSection
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement(Hero, {
    primaryAction: {
      label: 'Reserve by Telephone',
      href: D.site.phone.href
    },
    secondaryAction: {
      label: 'View the Menu',
      href: '#menu'
    }
  }), /*#__PURE__*/React.createElement(InfoStrip, {
    hours: D.site.hoursLine,
    address: D.site.addressLine,
    mapHref: D.site.mapHref,
    phone: D.site.phone,
    whatsappHref: D.site.whatsapp
  }), /*#__PURE__*/React.createElement(PageSection, {
    flushBottom: true
  }, /*#__PURE__*/React.createElement(StoryBlock, {
    numeral: "I",
    eyebrow: "The Courtyard",
    title: "A House of 1823",
    imageAlt: "The courtyard and its arches at dusk, lamps lit",
    action: {
      label: 'Read the full story',
      href: '#story'
    }
  }, /*#__PURE__*/React.createElement("p", null, "Baro Kuthi has stood in Paikpara since 1823. Its courtyard, verandah and music room now receive guests for dinner, served in the old order of a Rajbari meal."))), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(PageSection, {
    flushTop: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-stack"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    numeral: "II",
    eyebrow: "The Two Tables",
    title: "A Bengali Table and a Sahib\u2019s Table",
    lead: "Two kitchens of the house, served side by side."
  }), /*#__PURE__*/React.createElement(MenuBook, {
    pages: D.menu.tables,
    limit: 4,
    footer: /*#__PURE__*/React.createElement(TextLink, {
      href: "#menu"
    }, "View the full menu")
  }))), /*#__PURE__*/React.createElement(CourseScroll, {
    courses: D.courses,
    heading: {
      numeral: 'III',
      eyebrow: 'The Course of a Rajbari Meal',
      title: 'Eight Courses, In Order',
      lead: 'A Bengali meal is served in sequence, from bitter to sweet.'
    }
  }), /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement("div", {
    className: "kit-stack"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    numeral: "IV",
    eyebrow: "The Rooms of the House",
    title: "Four Rooms, Four Evenings",
    lead: "Each room of the house keeps its own hour and its own table."
  }), /*#__PURE__*/React.createElement(RoomRow, {
    rooms: D.rooms
  }))), /*#__PURE__*/React.createElement(OccasionBand, {
    action: {
      label: 'Arrange an Occasion',
      href: '#occasions'
    }
  }), /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement("div", {
    className: "kit-stack"
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    numeral: "VI",
    eyebrow: "The Guest Book",
    title: "From the Guest Book",
    lead: "Words left by guests of the house, quoted as written."
  }), /*#__PURE__*/React.createElement(GuestBook, {
    reviews: D.reviews
  }))));
}
window.HomePage = HomePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/MenuPage.jsx
try { (() => {
const {
  SectionHeading: MSectionHeading,
  MenuBook: MMenuBook,
  Button: MButton,
  Divider: MDivider
} = window.BaroKuthiDesignSystem_e9f570;
function MenuPage() {
  const D = window.BK_DATA;
  const {
    PageSection
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement("div", {
    className: "kit-stack"
  }, /*#__PURE__*/React.createElement(MSectionHeading, {
    size: "h1",
    as: "h1",
    eyebrow: "The Menu",
    title: "The Two Tables",
    lead: "The Bengali Table and the Sahib\u2019s Table, from the kitchens of the house."
  }), /*#__PURE__*/React.createElement(MMenuBook, {
    pages: D.menu.tables
  }))), /*#__PURE__*/React.createElement(PageSection, {
    tone: "alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-split"
  }, /*#__PURE__*/React.createElement(MSectionHeading, {
    eyebrow: "Set Menus",
    title: "The Whole Meal, In Order",
    lead: "For a first evening at the house, the thali is the truest introduction."
  }), /*#__PURE__*/React.createElement(MMenuBook, {
    pages: [D.menu.sets]
  }))), /*#__PURE__*/React.createElement(PageSection, {
    flushBottom: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-split"
  }, /*#__PURE__*/React.createElement(MSectionHeading, {
    eyebrow: "The Verandah",
    title: "The Caf\xE9 of the House",
    lead: "Tea and a light menu along the railing, through the afternoon."
  }), /*#__PURE__*/React.createElement(MMenuBook, {
    pages: [D.menu.verandah]
  }))), /*#__PURE__*/React.createElement(MDivider, null), /*#__PURE__*/React.createElement(PageSection, {
    flushTop: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-note"
  }, /*#__PURE__*/React.createElement("p", {
    className: "kit-note__text"
  }, "Some dishes follow the season and the market. The host will describe them at the table."), /*#__PURE__*/React.createElement(MButton, {
    variant: "secondary",
    href: "#menu"
  }, "Download the Menu \xB7 PDF"))));
}
window.MenuPage = MenuPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/MenuPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/OccasionsPage.jsx
try { (() => {
const {
  SectionHeading: OSectionHeading,
  StoryBlock: OStoryBlock
} = window.BaroKuthiDesignSystem_e9f570;
const OCCASIONS = [{
  title: 'Private Dining',
  eyebrow: 'The Zamindar’s Study',
  imageAlt: 'A private table laid in the study, lamp-lit',
  text: 'An evening of your own in the study, for up to ten guests. The menu is chosen with the host beforehand.'
}, {
  title: 'Family Celebrations',
  eyebrow: 'The Courtyard · The Jalsaghar',
  imageAlt: 'A long family table in the courtyard at night',
  text: 'Birthdays, anniversaries and annaprashan, hosted in the courtyard or the Jalsaghar, in the old manner.'
}, {
  title: 'Corporate Lunches',
  eyebrow: 'Midday, by arrangement',
  imageAlt: 'The verandah laid for lunch in daylight',
  text: 'Midday tables for colleagues and guests, with a set menu from either table.'
}];
const STEPS = [{
  n: 'I',
  title: 'Telephone the host',
  text: 'Tell us the date, the number of guests and the occasion.'
}, {
  n: 'II',
  title: 'Settle the room and menu',
  text: 'The host suggests a room and a menu from either table.'
}, {
  n: 'III',
  title: 'Arrive and be received',
  text: 'The house is prepared, and your guests are received at the gate.'
}];
function OccasionsPage() {
  const {
    PageSection
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement(PageSection, {
    flushBottom: true
  }, /*#__PURE__*/React.createElement(OSectionHeading, {
    size: "h1",
    as: "h1",
    eyebrow: "Occasions",
    title: "Occasions of the House",
    lead: "Private dinners, family gatherings and midday tables, all arranged by telephone."
  })), /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement("div", {
    className: "kit-timeline"
  }, OCCASIONS.map((o, i) => /*#__PURE__*/React.createElement(OStoryBlock, {
    key: o.title,
    eyebrow: o.eyebrow,
    numeral: ['I', 'II', 'III'][i],
    title: o.title,
    imageAlt: o.imageAlt,
    reverse: i % 2 === 1
  }, /*#__PURE__*/React.createElement("p", null, o.text))))), /*#__PURE__*/React.createElement(PageSection, {
    tone: "alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-stack"
  }, /*#__PURE__*/React.createElement(OSectionHeading, {
    eyebrow: "How It Works",
    title: "How an Occasion Is Arranged",
    lead: "Everything is settled by telephone, with the host, in person."
  }), /*#__PURE__*/React.createElement("ol", {
    className: "kit-steps"
  }, STEPS.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.n,
    className: "kit-step"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-step__n"
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    className: "kit-step__title"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "kit-step__text"
  }, s.text)))))));
}
window.OccasionsPage = OccasionsPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/OccasionsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/RoomsPage.jsx
try { (() => {
const {
  SectionHeading: RSectionHeading,
  ArchImage: RArchImage,
  Eyebrow: REyebrow
} = window.BaroKuthiDesignSystem_e9f570;
const ROOM_DETAILS = [{
  capacity: '24',
  best: 'Afternoon',
  occasions: 'Tea, small lunches',
  text: 'The café of the house runs the length of the verandah. Tea is poured by the pot and a light menu is served until evening.'
}, {
  capacity: '40',
  best: 'Dusk',
  occasions: 'Dinners, anniversaries',
  text: 'The old music room is now the main hall. Its chandeliers are lit at dusk, and dinner is served course by course.'
}, {
  capacity: '60',
  best: 'After dark',
  occasions: 'Family celebrations',
  text: 'Tables are laid in the open courtyard, before the pillared pavilion, for larger family evenings.'
}, {
  capacity: '10',
  best: 'By arrangement',
  occasions: 'Private dinners',
  text: 'A private room for small dinners. The menu and the evening are arranged with the host in advance.'
}];
const RNUM = ['I', 'II', 'III', 'IV'];
function RoomsPage() {
  const D = window.BK_DATA;
  const {
    PageSection,
    LeaderList
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement(PageSection, {
    flushBottom: true
  }, /*#__PURE__*/React.createElement(RSectionHeading, {
    size: "h1",
    as: "h1",
    eyebrow: "The Rooms",
    title: "The Rooms of the House",
    lead: "Four rooms, each with its own hour, light and table."
  })), D.rooms.map((r, i) => {
    const d = ROOM_DETAILS[i];
    return /*#__PURE__*/React.createElement(PageSection, {
      key: r.name,
      tone: i % 2 ? 'alt' : 'light'
    }, /*#__PURE__*/React.createElement("div", {
      className: "kit-room"
    }, /*#__PURE__*/React.createElement("div", {
      className: "kit-room__head"
    }, /*#__PURE__*/React.createElement(REyebrow, {
      numeral: RNUM[i]
    }, r.eyebrow), /*#__PURE__*/React.createElement("h2", {
      className: "kit-room__name"
    }, r.name)), /*#__PURE__*/React.createElement(RArchImage, {
      shape: "cinema",
      alt: r.imageAlt,
      parallax: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "kit-split kit-split--7-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "kit-prose"
    }, /*#__PURE__*/React.createElement("p", null, d.text)), /*#__PURE__*/React.createElement(LeaderList, {
      rows: [{
        label: 'Seats',
        value: d.capacity
      }, {
        label: 'Best',
        value: d.best
      }, {
        label: 'Suits',
        value: d.occasions
      }]
    }))));
  }));
}
window.RoomsPage = RoomsPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/RoomsPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Section.jsx
try { (() => {
/* Kit-level layout helpers (page composition only — every visual primitive comes from the design system bundle). */
function PageSection({
  tone = 'light',
  id,
  flushTop,
  flushBottom,
  children,
  style,
  className
}) {
  const cls = ['kit-section', 'kit-section--' + tone, flushTop && 'kit-section--flush-top', flushBottom && 'kit-section--flush-bottom', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    className: cls,
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-inner"
  }, children));
}
function LeaderList({
  rows
}) {
  return /*#__PURE__*/React.createElement("ul", {
    className: "kit-leaders"
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("li", {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    className: "k"
  }, r.label), /*#__PURE__*/React.createElement("span", {
    className: "bk-leader",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, r.value))));
}
Object.assign(window, {
  PageSection,
  LeaderList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Section.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/StoryPage.jsx
try { (() => {
const {
  Hero: SHero,
  StoryBlock: SStoryBlock,
  Divider: SDivider,
  Button: SButton
} = window.BaroKuthiDesignSystem_e9f570;
const CHAPTERS = [{
  year: '1823',
  title: 'The House at Paikpara',
  imageAlt: 'Archival drawing of the Baro Kuthi façade',
  quote: null
}, {
  year: '1858',
  title: 'A Chapter of the House',
  imageAlt: 'The Jalsaghar, chandeliers lit',
  quote: '“Pull quote from the family’s account, set in italic.”'
}, {
  year: '1859',
  title: 'A Chapter of the House',
  imageAlt: 'The staircase and its arches, lamp-lit',
  quote: null
}, {
  year: 'Today',
  title: 'The Rajbari Table',
  imageAlt: 'A table laid on the verandah at dusk',
  quote: null
}];
function StoryPage() {
  const {
    PageSection
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement(SHero, {
    height: "72svh",
    eyebrow: "The Story \xB7 Est. 1823",
    title: "The House at Paikpara",
    lead: "A zamindar\u2019s house, and the evenings it has kept.",
    imageAlt: "Archival illustration of the Baro Kuthi fa\xE7ade",
    primaryAction: null,
    secondaryAction: null
  }), /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement("div", {
    className: "kit-timeline"
  }, CHAPTERS.map((c, i) => /*#__PURE__*/React.createElement(SStoryBlock, {
    key: c.year,
    year: c.year,
    title: c.title,
    reverse: i % 2 === 1,
    imageAlt: c.imageAlt,
    quote: c.quote
  }, c.year === 'Today' ? /*#__PURE__*/React.createElement("p", null, "The house now receives guests for dinner, served course by course in its old rooms, and arranged personally by telephone.") : /*#__PURE__*/React.createElement("p", null, "Draft \u2014 this chapter will be written from the family\u2019s own records and approved by the owners before it is published."))))), /*#__PURE__*/React.createElement(SDivider, {
    space: 0
  }), /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement("div", {
    className: "kit-cta"
  }, /*#__PURE__*/React.createElement("p", {
    className: "kit-cta__line"
  }, "The story continues at the table."), /*#__PURE__*/React.createElement(SButton, {
    variant: "secondary",
    href: "#menu"
  }, "View the Menu"))));
}
window.StoryPage = StoryPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/StoryPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/VisitPage.jsx
try { (() => {
const {
  SectionHeading: VSectionHeading,
  FrameDouble: VFrameDouble,
  Button: VButton,
  Eyebrow: VEyebrow
} = window.BaroKuthiDesignSystem_e9f570;
const FAQS = [{
  q: 'How do I reserve a table?',
  a: 'Please telephone our host, or send a message on WhatsApp. Tables are arranged personally.'
}, {
  q: 'Is there a dress code?',
  a: 'Smart dress is requested; traditional dress is warmly welcomed.'
}, {
  q: 'Can the house arrange a private evening?',
  a: 'Yes. The Zamindar’s Study and the courtyard may be arranged for private occasions by telephone.'
}];
function MapEmbed() {
  const [loaded, setLoaded] = React.useState(false);
  const D = window.BK_DATA;
  return /*#__PURE__*/React.createElement(VFrameDouble, {
    fill: "parchment-dark",
    padding: 8,
    className: "kit-map"
  }, loaded ? /*#__PURE__*/React.createElement("iframe", {
    title: "Map to Baro Kuthi",
    src: "https://www.google.com/maps?q=Paikpara,Kolkata&output=embed",
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "kit-map__idle"
  }, /*#__PURE__*/React.createElement(VEyebrow, null, "Map \xB7 click to load"), /*#__PURE__*/React.createElement("p", {
    className: "kit-map__addr"
  }, D.site.address.join(', ')), /*#__PURE__*/React.createElement(VButton, {
    variant: "secondary",
    onClick: () => setLoaded(true)
  }, "Load the Map")));
}
function VisitPage() {
  const D = window.BK_DATA;
  const {
    PageSection,
    LeaderList
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-page"
  }, /*#__PURE__*/React.createElement(PageSection, {
    flushBottom: true
  }, /*#__PURE__*/React.createElement(VSectionHeading, {
    size: "h1",
    as: "h1",
    eyebrow: "Visit",
    title: "Visit the House",
    lead: "The house receives guests from 7 pm. Tables are arranged by telephone."
  })), /*#__PURE__*/React.createElement(PageSection, null, /*#__PURE__*/React.createElement("div", {
    className: "kit-split kit-split--7-4"
  }, /*#__PURE__*/React.createElement(MapEmbed, null), /*#__PURE__*/React.createElement("div", {
    className: "kit-visit"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VEyebrow, null, "Address"), /*#__PURE__*/React.createElement("p", {
    className: "kit-visit__text"
  }, D.site.address.map(l => /*#__PURE__*/React.createElement("span", {
    key: l
  }, l, /*#__PURE__*/React.createElement("br", null))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VEyebrow, null, "Hours"), /*#__PURE__*/React.createElement(LeaderList, {
    rows: D.site.hours
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(VEyebrow, null, "Getting here"), /*#__PURE__*/React.createElement(LeaderList, {
    rows: D.site.gettingHere
  }))))), /*#__PURE__*/React.createElement(PageSection, {
    tone: "alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-split"
  }, /*#__PURE__*/React.createElement(VSectionHeading, {
    eyebrow: "House Etiquette",
    title: "Questions Guests Ask",
    lead: "If your question is not here, the host will be glad to answer it."
  }), /*#__PURE__*/React.createElement("dl", {
    className: "kit-faq"
  }, FAQS.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.q,
    className: "kit-faq__item"
  }, /*#__PURE__*/React.createElement("dt", null, f.q), /*#__PURE__*/React.createElement("dd", null, f.a)))))));
}
window.VisitPage = VisitPage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/VisitPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
/* SAMPLE CONTENT for the UI kit and component cards.
   Shape mirrors DESIGN.md §14: content/site.json · menu.json · rooms.json · courses.json.
   Phone / WhatsApp are the spec's own placeholders. Prices, capacities, lunch & café hours and "Getting here"
   details are ILLUSTRATIVE ONLY — replace with the owners' data. History chapters are left as drafts on purpose
   (history must be verified with the owners). Reviews are NOT invented: the guest book shows placeholders. */
window.BK_DATA = {
  site: {
    phone: {
      display: '+91 82403 83737',
      href: 'tel:+918240383737'
    },
    whatsapp: 'https://wa.me/918240383737?text=I%20would%20like%20to%20reserve%20a%20table',
    email: 'barokuthi.theheritagedining@gmail.com',
    website: 'https://www.barokuthirajbaritheheritagedining.com',
    address: ['BARO KUTHI RAJ BARI', 'Paikpara, Kolkata'],
    addressLine: 'Paikpara, Kolkata',
    mapHref: 'https://maps.google.com/?q=Paikpara,Kolkata',
    hoursLine: 'The house receives guests from 7 pm',
    hours: [{
      label: 'Lunch',
      value: '12.30 – 3.30 pm'
    }, {
      label: 'Dinner',
      value: '7 – 11 pm'
    }, {
      label: 'The Verandah',
      value: '11 am – 7 pm'
    }],
    gettingHere: [{
      label: 'Metro',
      value: 'Nearest station to be confirmed'
    }, {
      label: 'Parking',
      value: 'Within the compound, by arrangement'
    }, {
      label: 'Dress code',
      value: 'Smart; traditional dress welcome'
    }],
    banquetHref: 'https://barokuthirajbari.com'
  },
  menu: {
    tables: [{
      title: 'The Bengali Table',
      tab: 'The Bengali Table',
      subtitle: 'Served course by course, on kansa',
      items: [{
        name: 'Shukto',
        price: 320,
        description: 'Bitter gourd and summer vegetables in a light milk gravy.'
      }, {
        name: 'Chingri Malai Curry',
        price: 980,
        description: 'Tiger prawns in coconut milk, gently spiced.',
        speciality: true
      }, {
        name: 'Bhetki Paturi',
        price: 740,
        description: 'Bhetki in mustard paste, steamed in banana leaf.'
      }, {
        name: 'Kosha Mangsho',
        price: 880,
        description: 'Mutton slow-cooked dark with onion and whole spices.',
        speciality: true
      }, {
        name: 'Mochar Ghonto',
        price: 360,
        description: 'Banana flower with coconut, slow-stirred.'
      }, {
        name: 'Mishti Doi',
        price: 180,
        description: 'Sweetened curd, set in an earthen pot.'
      }]
    }, {
      title: 'The Sahib’s Table',
      tab: 'The Sahib’s Table',
      subtitle: 'Anglo-Indian dishes, on old china',
      items: [{
        name: 'Mulligatawny Soup',
        price: 290,
        description: 'Peppered lentil soup, bright with lime.'
      }, {
        name: 'Fish Orly',
        price: 690,
        description: 'Bhetki in a light batter, with tartare sauce.'
      }, {
        name: 'Chicken à la Kiev',
        price: 720,
        description: 'Butter-filled cutlet, crumbed and fried golden.',
        speciality: true
      }, {
        name: 'Mutton Stew',
        price: 760,
        description: 'A club-style stew with root vegetables.'
      }, {
        name: 'Roast Chicken',
        price: 780,
        description: 'With gravy, buttered vegetables and mash.'
      }, {
        name: 'Caramel Custard',
        price: 220,
        description: 'Baked custard under a dark caramel.'
      }]
    }],
    sets: {
      title: 'Set Menus',
      subtitle: 'The whole meal, in its proper order',
      items: [{
        name: 'The Rajbari Thali · Niramish',
        price: '1,450',
        description: 'Eight vegetarian courses, from Shukto to Paan.'
      }, {
        name: 'The Rajbari Thali · Aamish',
        price: '1,850',
        description: 'Eight courses with fish and mutton.',
        speciality: true
      }, {
        name: 'The Sahib’s Supper',
        price: '1,650',
        description: 'Soup, fish, roast and pudding, served in courses.'
      }]
    },
    verandah: {
      title: 'The Verandah',
      subtitle: 'The café of the house, through the afternoon',
      items: [{
        name: 'Darjeeling Tea, by the Pot',
        price: 180,
        description: 'First flush, with milk or lemon.'
      }, {
        name: 'Fish Kobiraji',
        price: 390,
        description: 'Bhetki in a lacy egg crust, with kasundi.'
      }, {
        name: 'Chicken Cutlet',
        price: 340,
        description: 'Crumbed and fried, with onion salad.'
      }, {
        name: 'Nolen Gur Sandesh',
        price: 160,
        description: 'Date-palm jaggery sandesh, in season.'
      }]
    }
  },
  courses: [{
    numeral: 'I',
    name: 'Shukto',
    note: 'A bitter-sweet beginning to wake the palate.',
    imageAlt: 'Shukto on a kansa thala, top-down, lamp-lit'
  }, {
    numeral: 'II',
    name: 'Dal & Bhaja',
    note: 'Lentils poured over rice, with fritters fried crisp.',
    imageAlt: 'Dal and bhaja in kansa bowls, top-down'
  }, {
    numeral: 'III',
    name: 'Torkari',
    note: 'The season’s vegetables, cooked the household way.',
    imageAlt: 'Torkari on banana leaf, hands serving'
  }, {
    numeral: 'IV',
    name: 'Maachh',
    note: 'Fish — the heart of the Bengali table.',
    imageAlt: 'Bhetki paturi opened on banana leaf, lamp-lit'
  }, {
    numeral: 'V',
    name: 'Mangsho',
    note: 'Mutton, slow-cooked for the evening’s main course.',
    imageAlt: 'Kosha mangsho on a kansa thala, lamp-lit'
  }, {
    numeral: 'VI',
    name: 'Chutney & Papad',
    note: 'Sweet-sour chutney to settle the meal.',
    imageAlt: 'Tomato chutney and papad on kansa, top-down'
  }, {
    numeral: 'VII',
    name: 'Mishti',
    note: 'Sweets and mishti doi to close the meal.',
    imageAlt: 'Mishti doi in an earthen pot, sandesh on brass'
  }, {
    numeral: 'VIII',
    name: 'Paan',
    note: 'Betel leaf, folded and offered as the guest departs.',
    imageAlt: 'Folded paan on a silver tray'
  }],
  rooms: [{
    name: 'The Verandah',
    eyebrow: 'The café · Seats 24',
    description: 'Tea and a light menu along the cast-iron railing.',
    imageAlt: 'The verandah railing in afternoon light',
    action: {
      label: 'See the room',
      href: '#rooms'
    }
  }, {
    name: 'The Jalsaghar',
    eyebrow: 'Seats 40 · Best at dusk',
    description: 'The music room, now the main hall, under its Belgian chandeliers.',
    imageAlt: 'The Jalsaghar under its chandeliers, lamp-lit',
    action: {
      label: 'See the room',
      href: '#rooms'
    }
  }, {
    name: 'The Thakur-dalan Courtyard',
    eyebrow: 'Seats 60 · After dark',
    description: 'Tables laid before the old pillared pavilion.',
    imageAlt: 'The Thakur-dalan pillars at night, lamps lit',
    action: {
      label: 'See the room',
      href: '#rooms'
    }
  }, {
    name: 'The Zamindar’s Study',
    eyebrow: 'Private · Seats 10',
    description: 'A private room for small dinners, by arrangement.',
    imageAlt: 'A lamp-lit study with shutters half open',
    action: {
      label: 'See the room',
      href: '#rooms'
    }
  }],
  reviews: [{
    date: 'Date of visit',
    quote: 'A guest’s words will be set here exactly as written in their Google review.',
    name: 'Reviewer’s name',
    href: '#',
    source: 'Google review'
  }, {
    date: 'Date of visit',
    quote: 'Real reviews only — pulled by hand or from the Google Places API at build time.',
    name: 'Reviewer’s name',
    href: '#',
    source: 'Google review'
  }, {
    date: 'Date of visit',
    quote: 'Never invented, never paraphrased; always with a link to the source.',
    name: 'Reviewer’s name',
    href: '#',
    source: 'Google review'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/ds-fallback.js
try { (() => {
/* Fallback: if _ds_bundle.js is not compiled yet (fresh edits), transpile the component sources in the browser.
   No-op whenever window.BaroKuthiDesignSystem_e9f570 already exists. Load AFTER React + @babel/standalone. */
(function () {
  var NS = 'BaroKuthiDesignSystem_e9f570';
  if (window[NS]) return;
  var script = document.currentScript;
  var root = new URL(script.getAttribute('data-root') || '../../', script.src).href;
  var FILES = ['components/ui/actions/Button.jsx', 'components/ui/actions/TextLink.jsx', 'components/ui/type/Eyebrow.jsx', 'components/ui/type/SectionHeading.jsx', 'components/ui/frames/Divider.jsx', 'components/ui/frames/FrameDouble.jsx', 'components/ui/frames/ArchImage.jsx', 'components/layout/header/Header.jsx', 'components/layout/footer/Footer.jsx', 'components/layout/call-bar/StickyCallBar.jsx', 'components/layout/invitation/InvitationIntro.jsx', 'components/sections/hero/Hero.jsx', 'components/sections/info-strip/InfoStrip.jsx', 'components/sections/story/StoryBlock.jsx', 'components/sections/menu-book/MenuBook.jsx', 'components/sections/course-scroll/CourseScroll.jsx', 'components/sections/rooms/RoomCard.jsx', 'components/sections/rooms/RoomRow.jsx', 'components/sections/occasions/OccasionBand.jsx', 'components/sections/guest-book/GuestBook.jsx', 'components/sections/reservation/ReservationCard.jsx'];
  function get(url) {
    var x = new XMLHttpRequest();
    x.open('GET', url, false);
    x.send();
    if (x.status >= 400) throw new Error('ds-fallback: ' + url + ' ' + x.status);
    return x.responseText;
  }
  function resolve(from, spec) {
    var parts = from.split('/');
    parts.pop();
    spec.split('/').forEach(function (p) {
      if (p === '..') parts.pop();else if (p !== '.') parts.push(p);
    });
    return parts.join('/');
  }
  var mods = {};
  function load(path) {
    if (mods[path]) return mods[path].exports;
    var m = {
      exports: {}
    };
    mods[path] = m;
    var code = window.Babel.transform(get(root + path), {
      presets: ['react'],
      plugins: ['transform-modules-commonjs'],
      filename: path
    }).code;
    new Function('require', 'module', 'exports', code)(function (spec) {
      return spec === 'react' ? window.React : load(resolve(path, spec));
    }, m, m.exports);
    return m.exports;
  }
  try {
    var ns = {};
    FILES.forEach(function (f) {
      var e = load(f);
      Object.keys(e).forEach(function (k) {
        if (/^[A-Z]/.test(k)) ns[k] = e[k];
      });
    });
    window[NS] = ns;
  } catch (err) {
    console.error(err);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ds-fallback.js", error: String((e && e.message) || e) }); }

__ds_ns.StickyCallBar = __ds_scope.StickyCallBar;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Header = __ds_scope.Header;

__ds_ns.InvitationIntro = __ds_scope.InvitationIntro;

__ds_ns.CourseScroll = __ds_scope.CourseScroll;

__ds_ns.GuestBook = __ds_scope.GuestBook;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.InfoStrip = __ds_scope.InfoStrip;

__ds_ns.MenuBook = __ds_scope.MenuBook;

__ds_ns.OccasionBand = __ds_scope.OccasionBand;

__ds_ns.ReservationCard = __ds_scope.ReservationCard;

__ds_ns.RoomCard = __ds_scope.RoomCard;

__ds_ns.RoomRow = __ds_scope.RoomRow;

__ds_ns.StoryBlock = __ds_scope.StoryBlock;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.ArchImage = __ds_scope.ArchImage;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.FrameDouble = __ds_scope.FrameDouble;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

})();
