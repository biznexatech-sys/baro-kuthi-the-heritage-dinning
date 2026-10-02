/*
 * Baro Kuthi Rajbari — Coming Soon behaviour.
 * 1. Loader: shows real loading progress (fonts + images), plays its ≈3.4s fanlight sequence, then the shutters part.
 *    Shown once per browser session; Skip button and Esc end it early; never shown under reduced motion.
 * 2. Page: staggered entrance, gold dust inside the stamp, and a gentle tilt that follows the pointer (desktop only).
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var loader = document.getElementById('loader');
  var bar = document.getElementById('loader-bar');
  var skipBtn = document.getElementById('loader-skip');
  var MIN_SHOW = 3400; // ms — the length of the loader's own animation
  var MAX_WAIT = 8000; // ms — never hold a guest longer than this on a slow connection
  var start = performance.now();

  function ready() {
    if (root.classList.contains('is-ready')) return;
    root.classList.add('is-ready');
    setTimeout(function () { root.classList.add('is-settled'); }, 3200);
    startDust();
    startTilt();
  }

  // ─── Loader ────────────────────────────────────────────────────────────────────────────────────
  var showLoader = loader && !root.classList.contains('seen') && !reduced;
  if (!showLoader) {
    if (loader) loader.classList.add('is-gone');
    ready();
  } else {
    var done = false;
    var loaded = false;
    var progress = 0.08;
    var setBar = function (p) { if (bar) bar.style.setProperty('--p', String(p)); };
    setBar(progress);

    // Real progress: images and fonts on the page. A slow creep keeps the line alive meanwhile.
    var assets = Array.prototype.slice.call(document.images);
    var total = assets.length + 1;
    var count = 0;
    var tick = function () { count++; progress = Math.max(progress, 0.08 + 0.82 * (count / total)); setBar(progress); };
    assets.forEach(function (img) {
      if (img.complete) tick();
      else { img.addEventListener('load', tick, { once: true }); img.addEventListener('error', tick, { once: true }); }
    });
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(tick);
    var creep = setInterval(function () { if (progress < 0.9) { progress += 0.015; setBar(progress); } }, 220);

    var leave = function () {
      if (done) return;
      done = true;
      clearInterval(creep);
      setBar(1);
      try { sessionStorage.setItem('bk-cs-seen', '1'); } catch (e) { /* private mode — show again next time */ }
      loader.classList.add('is-leaving');
      setTimeout(ready, 450); // the stamp begins to settle as the shutters part
      setTimeout(function () { loader.classList.add('is-gone'); loader.setAttribute('aria-hidden', 'true'); }, 1400);
    };
    var maybeLeave = function () {
      if (!loaded) return;
      var wait = Math.max(0, MIN_SHOW - (performance.now() - start));
      setTimeout(leave, wait);
    };
    var onLoad = function () { loaded = true; maybeLeave(); };
    if (document.readyState === 'complete') onLoad(); else window.addEventListener('load', onLoad, { once: true });
    setTimeout(leave, MAX_WAIT);

    if (skipBtn) skipBtn.addEventListener('click', leave);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') leave(); });
  }

  // ─── Gold dust: a few motes rising slowly through the candle-light ────────────────────────────────
  function startDust() {
    var canvas = document.getElementById('dust');
    if (!canvas || reduced || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0, h = 0, motes = [], raf = 0, visible = true;

    function size() {
      var r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function mote(fresh) {
      return {
        x: Math.random() * w,
        y: fresh ? Math.random() * h : h + 8,
        r: 0.6 + Math.random() * 1.6,
        vy: 0.12 + Math.random() * 0.28,
        drift: Math.random() * Math.PI * 2,
        a: 0.25 + Math.random() * 0.5,
      };
    }
    size();
    var n = w < 400 ? 18 : 28;
    for (var i = 0; i < n; i++) motes.push(mote(true));

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < motes.length; i++) {
        var m = motes[i];
        m.y -= m.vy;
        m.drift += 0.012;
        m.x += Math.sin(m.drift) * 0.18;
        if (m.y < -8) motes[i] = m = mote(false);
        var fade = Math.min(1, m.y / (h * 0.25)); // fade out towards the top
        var g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 4);
        g.addColorStop(0, 'rgba(255, 220, 160,' + (m.a * fade) + ')');
        g.addColorStop(1, 'rgba(255, 220, 160, 0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      raf = visible ? requestAnimationFrame(frame) : 0;
    }
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', function () { size(); });
    document.addEventListener('visibilitychange', function () {
      visible = !document.hidden;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    });
  }

  // ─── Tilt: the stamp leans a little towards the pointer, with a soft candle glare ──────────────────
  function startTilt() {
    var stamp = document.getElementById('stamp');
    if (!stamp || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    var MAX = 3; // degrees — restraint is luxury
    var pending = null;
    function apply() {
      var e = pending; pending = null;
      var r = stamp.getBoundingClientRect();
      var px = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      var py = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
      stamp.style.setProperty('--ty', ((px - 0.5) * 2 * MAX).toFixed(2) + 'deg');
      stamp.style.setProperty('--tx', ((0.5 - py) * 2 * MAX).toFixed(2) + 'deg');
      stamp.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
      stamp.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
    }
    window.addEventListener('pointermove', function (e) {
      if (!root.classList.contains('is-settled')) return;
      if (!pending) requestAnimationFrame(apply);
      pending = e;
    }, { passive: true });
    document.addEventListener('pointerleave', function () {
      stamp.style.setProperty('--tx', '0deg');
      stamp.style.setProperty('--ty', '0deg');
    });
  }
})();
