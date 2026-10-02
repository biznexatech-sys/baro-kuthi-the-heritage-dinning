# Coming Soon Page & Launch Guide — Baro Kuthi Rajbari

> **Overview:** An animated, royal heritage Coming Soon page designed to be deployed immediately on the domain (`barokuthirajbariheritagedining.com`). When the full website is ready, it can be switched off with a single line change.

---

## 1. What Was Created

### A. Unique Motion Loading Screen
- **Visuals:** Deep royal midnight crimson canvas with radiant amber candle illumination and floating golden dust/embers.
- **Centerpiece:** The royal insignia crest (`baro kuthi rajbari the heritage dining Final.png`).
- **Motion Animation:**
  - Semicircular fanlight arch rays (echoing the 1823 mansion's architecture) draw and pulse softly.
  - Crest emerges with an ambient glow and a dynamic 45° metallic sheen sweep across the gold emblem.
  - "ESTD. 1823 · PAIKPARA, KOLKATA" and liquid gold hairline progress bar.
  - Status updates cycle: *"Opening the Gates of 1823..." → "Lighting the Courtyard Lamps..." → "Preparing the Heritage Table..."*
  - Velvet shutter parting transition into the Coming Soon card.
  - Full keyboard & screen-reader accessibility, plus a **"Skip →"** button.

### B. Animated Coming Soon Experience (Inspired by `ComingSoon.jpeg`)
- **Interactive 3D Postage Stamp Card:**
  - Serrated / scalloped stamp margin on warm parchment paper.
  - Double hairline copper frame with ornamental corner brackets.
  - Deep royal crimson backdrop with subtle heritage banquet photography texture.
  - Golden crest with periodic metallic light glint.
  - Stately **"COMING SOON"** typography with subtle breathing amber glow.
  - Authentic Bengali calligraphy: **"রাজকীয় ঐতিহ্যে, রসনার নতুন অধ্যায়"** ("In royal heritage, a new chapter of dining begins").
  - Tactile 3D tilt responding to cursor movement / device gyro with dynamic glare reflection.

### C. Visitor Actions & Concierge
- **Request an Invitation Modal:** Guests can submit their name and WhatsApp/email to be notified before general bookings open, or initiate an instant WhatsApp reservation inquiry.
- **Direct Concierge CTAs:**
  - 📞 **Reserve by Phone:** `tel:+91XXXXXXXXXX`
  - 💬 **WhatsApp Concierge:** Direct link to chat with the host
  - 📍 **Paikpara, Kolkata:** Direct link to Google Maps
- **Ambient Royal Soundscape:** Synthesized Indian classical tanpura drone & temple bells (generated via Web Audio API, 0 external file dependencies).
- **Replay Motion ⟳:** Re-watch the entrance loader animation anytime.

---

## 2. How to Preview the Full Website Anytime

Even while Coming Soon mode is active, the owner and team can view the full website in two ways:
1. Click the **"Preview Main Website →"** link in the bottom-right corner of the Coming Soon page.
2. Or add `?preview=full` to the URL:
   `https://barokuthirajbariheritagedining.com/?preview=full` (or `http://localhost:3000/?preview=full`)

---

## 3. How to Launch the Full Website (When Ready)

When you are ready to launch the full website and remove the Coming Soon page:

1. Open [`site/src/config/site-mode.ts`](file:///c:/xampp/htdocs/Baro%20Kuthi%20Design%20System/site/src/config/site-mode.ts)
2. Change:
   ```ts
   export const IS_COMING_SOON = false;
   ```
3. Run the build:
   ```bash
   cd site
   npm run build
   ```
4. Upload the contents of `site/out/` to Hostinger `public_html/`.

The Coming Soon page will be deactivated, and the complete website (Hero, Courtyard Story, Menu Book, 8 Courses, Rooms, Occasions, Guest Book, and Reservations) will be displayed.

---

## 4. Standalone Deployment Option

In addition to the Next.js static export in `site/out/`, a completely self-contained standalone HTML file is also provided at:
[`site/public/coming-soon.html`](file:///c:/xampp/htdocs/Baro%20Kuthi%20Design%20System/site/public/coming-soon.html)

If you ever need to deploy the Coming Soon page to a new server in under 10 seconds without running any build commands, simply rename `coming-soon.html` to `index.html` and drop it into your web root!
