/* Fallback: if _ds_bundle.js is not compiled yet (fresh edits), transpile the component sources in the browser.
   No-op whenever window.BaroKuthiDesignSystem_e9f570 already exists. Load AFTER React + @babel/standalone. */
(function () {
  var NS = 'BaroKuthiDesignSystem_e9f570';
  if (window[NS]) return;
  var script = document.currentScript;
  var root = new URL(script.getAttribute('data-root') || '../../', script.src).href;
  var FILES = [
    'components/ui/actions/Button.jsx', 'components/ui/actions/TextLink.jsx',
    'components/ui/type/Eyebrow.jsx', 'components/ui/type/SectionHeading.jsx',
    'components/ui/frames/Divider.jsx', 'components/ui/frames/FrameDouble.jsx', 'components/ui/frames/ArchImage.jsx',
    'components/layout/header/Header.jsx', 'components/layout/footer/Footer.jsx',
    'components/layout/call-bar/StickyCallBar.jsx', 'components/layout/invitation/InvitationIntro.jsx',
    'components/sections/hero/Hero.jsx', 'components/sections/info-strip/InfoStrip.jsx', 'components/sections/story/StoryBlock.jsx',
    'components/sections/menu-book/MenuBook.jsx', 'components/sections/course-scroll/CourseScroll.jsx',
    'components/sections/rooms/RoomCard.jsx', 'components/sections/rooms/RoomRow.jsx',
    'components/sections/occasions/OccasionBand.jsx', 'components/sections/guest-book/GuestBook.jsx',
    'components/sections/reservation/ReservationCard.jsx'
  ];
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
    spec.split('/').forEach(function (p) { if (p === '..') parts.pop(); else if (p !== '.') parts.push(p); });
    return parts.join('/');
  }
  var mods = {};
  function load(path) {
    if (mods[path]) return mods[path].exports;
    var m = { exports: {} };
    mods[path] = m;
    var code = window.Babel.transform(get(root + path), { presets: ['react'], plugins: ['transform-modules-commonjs'], filename: path }).code;
    new Function('require', 'module', 'exports', code)(function (spec) { return spec === 'react' ? window.React : load(resolve(path, spec)); }, m, m.exports);
    return m.exports;
  }
  try {
    var ns = {};
    FILES.forEach(function (f) { var e = load(f); Object.keys(e).forEach(function (k) { if (/^[A-Z]/.test(k)) ns[k] = e[k]; }); });
    window[NS] = ns;
  } catch (err) { console.error(err); }
})();
