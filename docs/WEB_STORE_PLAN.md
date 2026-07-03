# Underdawg — Dynamic Web Store (per-creator) — Architecture & Build Plan

> **Goal.** Every creator builds a merch store in the app; tapping the store's web link opens a **live website** at a per-creator URL (e.g. `…/moontheartist`) that **looks like the in-app store they built** and **updates whenever they republish**. Multi-user, dynamic — not a static one-off.

---

## 1. Why static won't work (the problem)

Today the store lives **only in the phone's local Zustand state** (`storeCustomization`, `storeBuilder`, `products`). Nothing leaves the device. The "URL" shown in the app is a placeholder string; Copy/Share/“View store” just fire toasts or open an in-app React Native preview. There is **no website and no backend**.

A static export would be one frozen store — it can't serve many creators or reflect edits. So we need a **dynamic** system: store data in a database keyed by handle, the app writes on publish, and a web app renders any handle on demand.

---

## 2. Recommended architecture (reuse existing Firebase)

The app already uses **Firebase** (auth, via `src/lib/firebase`). Use the rest of the same project:

```
 App (React Native)                Firebase                     Web store (browser)
 ─────────────────                 ────────                     ───────────────────
 Build store in studio   ──put──▶  Firestore: stores/{handle}   ◀──read──  underdawg-store.web.app/{handle}
 Tap "Publish"                     (products, theme, sections)             renders storefront (matches app)
 Tap "View / Share"  ──opens──────────────────────────────────▶  same URL (Linking.openURL / Share)
 Product images       ──put──▶     Firebase Storage (optional)
```

- **Firestore** = the store database. Document per creator at `stores/{handle}`.
- **Firebase Hosting** = serves the web store (a small static site + JS that reads Firestore with the **client SDK** — no server needed). Rewrite `/(handle)` → `index.html`, which fetches `stores/{handle}` and renders it.
- **Firebase Storage** (optional) = uploaded logos/product art if not already on remote URLs (current mock data already uses Unsplash URLs, so this may be deferrable).
- **Result:** `https://<project>.web.app/moontheartist` (or a custom domain like `underdawgstore.com/moontheartist`) is live and re-reads Firestore on every visit, so republishing updates it.

Why this over a separate Supabase/Next.js stack: no new backend, no second auth system, one deploy command, and the data already has a natural owner (the signed-in Firebase user). A separate stack is viable but doubles the moving parts.

---

## 3. Firestore data model

One document per published store, keyed by the (lowercased, `@`-stripped) handle:

```
stores/{handle}
  handle: "moontheartist"
  ownerUid: "<firebase auth uid>"          // for security rules
  published: true
  publishedAt: <serverTimestamp>
  store: {                                  // = StoreCustomization (src/store/index.ts:166)
    storeName, tagline, headingFont, bodyFont, accent, layout,
    backgroundMode, backgroundValue, logo, siteEnabled,
    sections: [ ... StoreSection[] ],       // marquee/hero/featured/grid/about/shipping/faq/contact/footer
    customCategories: [ ... ]
  }
  products: [                               // = Product[] (src/data/mock.ts:1266), published only
    { id, name, type, baseCost, margin, color, bg, fg, sold }
  ]
  builder: { handle, storeName, tagline }   // light identity from StoreBuilder
```

This is a near-direct serialization of existing types — **no reshaping of the app's store model required**. The web renders straight from `store.sections` + `products` exactly like `StorefrontPreview` does in-app.

---

## 4. App changes (write on publish)

Small, localized. Files:

- **`src/lib/firebase`** — export a Firestore handle (`getFirestore()`); add `firebase/firestore` (already have the SDK for auth).
- **New `src/lib/storePublish.ts`** — `publishStore()`:
  - read `storeCustomization`, `storeBuilder`, `products` from the store,
  - filter `products` to `published === true`,
  - `setDoc(doc(db,'stores',handle), {...}, {merge:true})` with `ownerUid = getAuth().currentUser.uid` and `publishedAt = serverTimestamp()`.
- **Publish trigger** — call `publishStore()` where the store is marked published (the flow that lands on `MerchPublished.tsx`; today it just navigates). On success set `storeCustomization.lastPublishedAt`.
- **Make the link real** — in `MerchPublished.tsx` (and `MerchIndex.tsx` DOMAIN tab):
  - one consistent URL via a single `storeUrlOf(handle)` (pick ONE format — see §6),
  - **Copy** → `@react-native-clipboard/clipboard` (real), **Share** → RN `Share.share({url})`, tapping the URL → `Linking.openURL(url)`.
- Handle collision/availability: handle uniqueness check (Firestore read) when the creator sets it in the studio identity step.

Everything else (the in-app studio + `StorefrontPreview`) stays as-is.

---

## 5. The web store app

A tiny static site deployed to Firebase Hosting (`/web-store`), **re-implementing `StorefrontPreview` for the browser** so it matches the app:

- **Stack:** plain Vite + TypeScript (or Next.js static export). No server. Firebase web SDK (`firestore` read-only).
- **Routing:** Hosting rewrite `** → /index.html`; JS reads the handle from `location.pathname`, fetches `stores/{handle}`.
- **Render:** map each `StoreSection.type` → a web section (marquee, hero, featured, grid, about, shipping, faq, contact, footer) mirroring `src/components/merch/StorefrontPreview.tsx`. Reuse the **same design tokens** — palette (`src/theme/colors.ts`), fonts (Archivo / Space Grotesk / Cabinet Grotesk from `assets/fonts`), accent map, layout keys — so it's visually identical.
- **States:** loading skeleton, `404` for unknown/unpublished handle, `siteEnabled === false` → "store is private".
- **SEO/share:** basic per-store `<title>`/OpenGraph from `storeName`/`tagline`/`logo`.
- **Cart/checkout:** out of scope for v1 (display-only storefront). Buy buttons can deep-link back to the app or a "coming soon" until payments (Razorpay/Stripe) are wired.

---

## 6. Decisions to lock before building

1. **URL format / domain. — LOCKED: path-style.** Canonical URL is `https://underdawgstore.com/{handle}` (custom domain, later) and `https://underdawg-store.web.app/{handle}` (free Firebase URL, used first). `{handle}` = creator handle, lowercased, `@`-stripped (`@MoonTheArtist` → `moontheartist`). One web app serves all creators by reading `stores/{handle}`. Supersedes the two conflicting formats in code (`{handle}.underdawg.store` in `MerchIndex.tsx:202` and `underdawgstore.com/{handle}` in `themePresets.ts:192`) — standardize every call site on a single `storeUrlOf(handle)` returning the path-style URL.
2. **Who can publish a handle** — confirm handle = unique creator identity; add availability check + ownerUid lock.
3. **Images** — keep remote URLs (current) for v1, or add Firebase Storage uploads for logos/art.
4. **Firestore security rules** — public read on `stores/{handle}` (it's a public storefront); writes only by `request.auth.uid == resource.data.ownerUid`.
5. **Access** — I need the Firebase project (or a new one) + Hosting enabled to deploy and test end-to-end.

---

## 7. Build phases

1. **Backend wiring** — Firestore enabled, security rules, `getFirestore` export, `publishStore()`, hook into publish, handle availability. *(app-side, testable: publish → doc appears in Firestore.)*
2. **Web store MVP** — Vite app reading `stores/{handle}`, rendering hero + grid + footer with matching tokens; deploy to Firebase Hosting; 404/private states. *(end-to-end: publish in app → open URL in browser.)*
3. **Full parity** — all section types, fonts, accents, layouts, marquee/about/faq/contact; OpenGraph; polish to match `StorefrontPreview` 1:1.
4. **Make app links real** — clipboard Copy, native Share, `Linking.openURL`; unify the URL format.
5. **(Later)** custom domain, Firebase Storage uploads, buy/checkout.

---

## 8. Effort & cost

- Phases 1–4 are a real but bounded build (backend write + a small web app + deploy). The schema is a direct serialize of existing types, which keeps it contained.
- **Cost:** Firebase Spark (free) covers Firestore reads/writes + Hosting at low volume; Blaze (pay-as-you-go) only if traffic grows. A custom domain is the only guaranteed paid item.
- **Hard dependency:** access to your Firebase project + Hosting; nothing end-to-end can be verified without it.

---

## 9. Verification (once built)

1. In the app: build a store → Publish → confirm `stores/{handle}` document written in the Firebase console.
2. Open `https://<project>.web.app/{handle}` in a browser → storefront renders matching the app.
3. Edit the store in the app → Republish → reload the web URL → changes reflected.
4. Second creator publishes a different handle → their URL shows their own store (multi-user).
5. Unknown handle → 404; `siteEnabled=false` → private message.
6. In the app: Copy copies the real URL, Share opens the native sheet, tapping opens the browser.
