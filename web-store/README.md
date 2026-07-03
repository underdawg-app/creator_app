# Underdawg — Web Store UI

A self-contained web storefront that mirrors the in-app store (`StorefrontPreview`).
No backend — it renders entirely from the `STORE` object inside `index.html`.

## Run it
Just open the file:
```
open web-store/index.html
```
(or drag it into any browser). No build step, no dependencies.

## What it is
- Header (logo monogram + store name + tagline + cart), menu, search, an auto-rotating
  hero carousel, the product grid (garment-colour tiles + ₹ prices), the story block,
  and the footer with the `underdawgstore.com/{handle}` URL.
- The **top toolbar** lets you preview all 6 themes (Midnight / Bone / Sand / Ocean /
  Bloom / Mono) and 5 font pairings — the same presets the app studio offers. Delete
  that `.toolbar` block to ship the bare store.

## Making it real (later)
This is the **UI only**. To make it a live, per-creator store that updates when a
creator edits in the app, swap the hardcoded `STORE` object for real data (one record
per handle) and host it. See `docs/WEB_STORE_PLAN.md` for the dynamic architecture
(Firestore + Firebase Hosting, path-style `underdawgstore.com/{handle}`).

## Deploy (to get a public link)
Any static host works — drag the `web-store/` folder onto:
- **Netlify** (netlify.com/drop) → instant `*.netlify.app` URL
- **Vercel** / **GitHub Pages** / **Cloudflare Pages**

The data shape matches the app's `storeBuilder` (see `src/store/index.ts`) and the
theme/font presets (`src/screens/modules/merch/studio/themePresets.ts`), so wiring real
data later is a drop-in.
