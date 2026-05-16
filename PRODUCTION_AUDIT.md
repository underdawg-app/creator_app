# Underdawgs — Production Audit (Bidirectional)

**Spec ↔ App alignment, completeness, and launch-readiness — in one document.**

**Spec:** [`USER_STORIES_EPICS.md`](./USER_STORIES_EPICS.md) (16 epics + 5 cross-cutting, ~380 acceptance criteria)
**App:** `underdawg-app/src` (React Native 0.81.5, Zustand store seeded by `src/data/mock.ts`)
**Date:** 2026-05-11
**Verdict:** **NOT production-ready.** Readiness **1.5 / 10**. Spec-app alignment **~9%**.

---

## 0. TL;DR

The repo is a high-fidelity UI prototype, not a shippable product. The misalignment between spec and app runs in **both directions** simultaneously:

1. **The spec asks for things the app didn't build.** ~80% of acceptance criteria are unmet. 5 entire epics (Tips, Collaboration, Subscriptions, Trust & Safety, Compliance) have **zero** code.
2. **The app builds things the spec never authorized.** Entire modules (Learning, Art, Email List, Landing Page) exist in code with no corresponding user stories.
3. **Where both exist, they often disagree.** 7 concepts (most importantly `underdawg.com/username`) have conflicting models in spec vs code.
4. **Underneath all of it:** no real auth, no backend, no payments, no push, no uploads, no analytics, no error reporting, no tests, no i18n, no accessibility, no web target. Each of these is required by every story per the spec's Definition of Done.

| Metric | Value |
|---|---|
| Spec epics fully implemented | **0 / 21** |
| Spec epics completely missing in app | **5** (Tips, Collab, Subs, X4, X5) |
| App features not in spec | **13** |
| Divergent interpretations of same concept | **7** |
| Spec roles served by the app | **~1 of 5** (Creator only, partial) |
| Definition-of-Done items met globally | **0 / 8** |
| Weighted spec coverage | **~9%** |
| Production readiness | **1.5 / 10** |

---

## 1. Two big lists at a glance

### List A — In SPEC, NOT in App

5 entire epics + ~85% of remaining stories.

| Missing layer | Status |
|---|---|
| Tips (Epic 9) | No code |
| Collaboration (Epic 10) | No code |
| Subscription Tiers (X1) | No code |
| Trust, Safety, Moderation (X4) | No code |
| Compliance & Disclosure (X5) | No code |
| Auth (email/password, Apple, reset, sessions) | Stub |
| Backend / API / persistence | Absent |
| Public web profile at `underdawg.com/username` | Absent |
| Push notifications | Absent |
| File uploads (image/video/audio/ID) | Absent |
| Payments / escrow / payouts | Absent |
| Realtime chat | Absent |
| Identity verification + liveness | Stub |
| Notification center | Absent |
| Accessibility (DoD) | Absent |
| i18n (DoD: en + hi) | Absent |
| Tests (DoD) | Absent |
| Web target (DoD) | Absent |
| Analytics / Sentry (DoD) | Absent |

Full per-story breakdown in [§3](#3-part-1--in-spec-not-in-app-per-epic-detail).

### List B — In APP, NOT in Spec

13 distinct un-specced features built in code.

| # | App feature | Where | Spec coverage |
|---|---|---|---|
| A-1 | Entire **Learning** module (courses + lessons + progress) | `/(modules)/learning` | Zero |
| A-2 | Entire **Art** module (originals, prints, editions, commissions) | `/(modules)/art` | Zero |
| A-3 | Audience > **Email List** (newsletter platform) | `/(modules)/audience/email-list` | Zero |
| A-4 | Audience > **Landing Page builder** (Linktree-style) | `/(modules)/audience/landing-page` | Conflicts w/ Epic 2 |
| A-5 | "**OWNED vs RENTED audience**" pillar | `AudienceIndex.tsx` | Zero |
| A-6 | **Camera** capture module | `/(modules)/camera` | Spec only has "upload" |
| A-7 | **UserType** creator-vs-business fork | `UserType.tsx` | Conflicts with US-1.8 |
| A-8 | Creator-authored **Rate Card** | `/(modules)/jobs/rate-card` | Inverse of US-7.5 |
| A-9 | Heavy **Splash + Welcome carousel** | Onboarding | Under-AC vs US-1.15 |
| A-10 | **Analytics > AI Insights** as standalone tab | `/analytics/ai-insights` | Spec distributes AI hints |
| A-11 | Hidden `Create` and `Inbox` tabs | Tabs nav | Not described |
| A-12 | Full **Theme system** | `theme/ThemeContext.tsx` | Over-delivers vs US-16.10 |
| A-13 | Heavy **motion language** (TapBurst/Magnetic/Reveal/Skia) | `components/ui/*` | Not specified |

Detail in [§4](#4-part-2--in-app-not-in-spec-detail).

---

## 2. Cross-cutting Critical blockers (apply to every epic)

| # | Issue | Severity | Affected | Current | Spec / DoD says | Fix | FE/BE |
|---|---|---|---|---|---|---|---|
| C-1 | No auth provider wired | **Critical** | Whole app | Firebase stub throws ([firebase.ts:46](./src/lib/firebase.ts#L46), [54](./src/lib/firebase.ts#L54)); AuthContext locks to `signedOut` | US-1.1–1.7 | Restore Firebase Auth / Auth0 / Clerk / Supabase. Email + Google + Apple + Phone OTP + Reset + Logout-all | both |
| C-2 | No HTTP / API / backend | **Critical** | Whole app | Zero `fetch`/`axios`/`firestore`. Zustand + `mock.ts` only | Every story needs server data | Backend platform + typed client (`zod` + `tanstack-query`) | both |
| C-3 | Universal links missing | **Critical** | EPIC 2 | `underdawgs://` only ([linking.ts:4](./src/navigation/linking.ts#L4)) | `underdawg.com/username` SEO/<2s/OG/301/410 | Next.js web app + `apple-app-site-association` + `assetlinks.json` + OG worker | both |
| C-4 | No web target | **Critical** | DoD | iOS+Android only | "Functional on iOS, Android, Web" | Decide unified Expo Router or split Next.js + RN | both |
| C-5 | Zero accessibility attributes | **Critical** | Whole app | `grep accessibilityLabel\|accessibilityRole src` → 0 hits | DoD "Accessibility AA" | Add `accessibilityRole`/`Label`/`State`, focus order, dynamic type, contrast | FE |
| C-6 | No i18n infrastructure | **Critical** | Whole app | Strings hard-coded English | DoD "Localized (en, hi minimum)" | `i18next`/`react-intl`; en + hi packs; RTL audit | FE |
| C-7 | No analytics events | **Critical** | EPIC 12 + DoD | Zero `trackEvent` | DoD + Epic 12 demand funnels | Segment/RudderStack; event taxonomy | both |
| C-8 | No error reporting | **Critical** | Whole app | No Sentry/Crashlytics/Bugsnag | DoD "Error states handled" implies observability | Sentry RN + native crash uploads | both |
| C-9 | No tests | **Critical** | Whole app | No `*.test.*`, no Jest/Detox | DoD "Unit + integration tests pass" | Jest + RNTL + Detox/Maestro + CI gate | both |
| C-10 | No env/secrets management | **Critical** | Whole app | No `.env`, no `react-native-config` | Multi-env, API keys | `react-native-config`/Expo config; CI secret injection | both |
| C-11 | No image/video/audio upload | **Critical** | 5/6/7/13 | Mock asset; no picker, no S3/Cloudinary | US-5.1–5.3, 6.3, 7.16, 13.5 | Image picker + Tus/multipart + transcode worker | both |
| C-12 | No payments | **Critical** | 6/7/9/14/X1 | All "Pay/Tip/Withdraw/Subscribe" fire toasts | US-6.8, 7.20, 9.3, 14.4, X1.2 | Stripe / Razorpay / RevenueCat; escrow ledger | both |
| C-13 | No push notifications | **Critical** | 15 + many | No FCM/APNs, no `notifee`, no permission prompt | US-1.14, 7.9, 8.9, 9.4, 13.4, 14.5, 15.* | FCM + Notifee + token storage + topics | both |
| C-14 | Realtime chat backend missing | **Critical** | X3, 7.10, 10.5, 11.5 | Local `store.threads` only | "Real-time", read receipts, typing | Firestore/Stream/Sendbird; or Socket.IO + Postgres | both |
| C-15 | Nav doesn't consult auth state | **Critical** | Whole app | `RootNavigator` always starts at `Splash`; nothing routes on `status` | Onboarding gate, deep-link bounce, session expiry | Switch on `useAuth().status`; route guards on `Modules`; deep-link interceptor | FE |
| C-16 | No form validation library | **Critical** | Onboarding/Studio/Jobs/Merch/Finance/Settings | Raw `useState` + ad-hoc checks | US-1.1 email + ≥8 chars, 1.9 real-time uniqueness, 7.7 eligibility, 14.6 micro-deposit | `react-hook-form` + `zod` schemas shared with API; inline errors | FE |
| C-17 | No empty/error/loading state standard | **Major** | Whole app | `EmptyState` exists but unused | DoD "Error states handled" | Apply `<Loading/>`, `<ErrorState retry/>`, `<EmptyState/>` to every list/detail | FE |
| C-18 | Inconsistent button primitives | **Major** | Whole app | 5 competing: `TapBurst`, `Tap`, `PressableScale`, `MagneticButton`, raw `Pressable` | Design consistency | One `<Button variant>` API; effects as opt-ins | FE |
| C-19 | No semantic color tokens | **Major** | Whole app | Hand-mixed `palette.acid/electric` per file | Status semantics | Extend theme; success/warn/error/info tokens; lint custom colors | FE |
| C-20 | `Dimensions.get('window')` snapshot at import | **Major** | Auth/Welcome/large screens | Won't react to rotation/split/foldable | Mobile responsiveness | Use `useWindowDimensions()` | FE |
| C-21 | Heavy Skia animation on every onboarding screen | **Major** | Onboarding | Wave+Reveal+Burst stack jank on low-end Android | Performance | Gate by Platform/low-end; defer ambient anims until after first interaction | FE |
| C-22 | No moderation/safety surface | **Critical** | EPIC X4 | No "Report", admin tool, takedown notice, appeal | US-X4.1–4.5 | Report flows on UGC + admin queue + appeal | both |
| C-23 | No compliance / disclosure logic | **Critical** | EPIC X5 | No `#ad` injection, KYC gate, GDPR export/delete | US-X5.1–5.3 | Pre-publish lint + KYC pre-payout + GDPR pipeline | both |

---

## 3. PART 1 — In SPEC, NOT in App (per-epic detail)

Legend — **Done:** AC fully met. **Shell:** UI exists, data mocked. **Partial:** some AC met. **Missing:** no code.

### EPIC 1 — Onboarding & Identity

| Story | Status | Notes |
|---|---|---|
| US-1.1 email/password | **Missing** | No email form, no password screen. |
| US-1.2 Google OAuth | **Shell** | Button at `Auth.tsx:243`; `signInWithGoogle()` throws. |
| US-1.3 Apple Sign-In | **Missing** | iOS App Store will reject without it. |
| US-1.4 Phone OTP | **Shell** | `+91` hard-coded at `Auth.tsx:202`; `sendPhoneCode` throws; 30s/3-retries not enforced. |
| US-1.5 Login persistence cross-device | **Missing** | No real auth → no sessions. |
| US-1.6 Password reset | **Missing** | No screen. |
| US-1.7 Logout one/all devices | **Partial** | `signOut()` no-op; no "log out other devices". |
| US-1.8 Primary creator type | **Done (UI)** | `CreatorType.tsx` single-select. Local only. |
| US-1.9 Name/handle/bio/photo + uniqueness | **Shell** | No photo upload, no real-time uniqueness check, no 300-char bio counter. |
| US-1.10 Niches/skills/interests ≥3 | **Partial** | No separate skills/interests pickers. |
| US-1.11 Location autocomplete | **Missing** | No location field. |
| US-1.12 Live progress % | **Missing** | No progress meter. |
| US-1.13 Skip + resume from checklist | **Partial** | Skip jumps forward; no resumable checklist. |
| US-1.14 Push permission after first publish | **Missing** | No notifications subsystem. |
| US-1.15 Welcome tutorial replayable | **Partial** | Carousel exists; not replayable. |

**Edge cases (username taken, OAuth denied, OTP timeout, duplicate email, network drop):** none handled.

**Completeness ~15%**

### EPIC 2 — Public Portfolio (`underdawg.com/username`)

| Story | Status | Notes |
|---|---|---|
| US-2.1 Public clean URL, SEO, <2s, mobile | **Missing** | No web app. |
| US-2.2 Cover/photo/name/verified | **Partial** | No verified badge flow. |
| US-2.3 Bio + stats refresh | **Shell** | Static mocks. |
| US-2.4 Portfolio grid 6–12 | **Partial** | No cap, no expand modal, no mixed-media. |
| US-2.5 Connected platforms + total | **Shell** | Mocked numbers. |
| US-2.6 Collab status per type | **Shell** | Tags exist; not toggleable per type. |
| US-2.7 Rates/services/past brands hideable | **Missing** | Not on public profile. |
| US-2.8 Follow/Message/Work-with-me CTAs | **Missing** | No public surface. |
| US-2.9 Share link/socials/QR + OG card | **Missing** | – |
| US-2.10 Portfolio analytics 7/30/90d | **Missing** | – |
| US-2.11 Merch link / events / press | **Missing** | – |

**Edge cases (rename 301, deleted 410, banned, private):** none handled.

**Completeness ~5% — the headline feature is effectively absent.**

### EPIC 3 — In-App Profile & Portfolio Management

| Story | Status | Notes |
|---|---|---|
| US-3.1 Edit all fields live <5s | **Shell** | Store only. |
| US-3.2 Username change + 30d redirect | **Missing** | No backend. |
| US-3.3 Featured 6–12 drag-drop reorder | **Missing** | No drag-drop. |
| US-3.4 Add/remove with confirm | **Partial** | No destructive-confirm modal. |
| US-3.5 Preview public view | **Partial** | In-app facsimile. |
| US-3.6 Completion % | **Missing** | – |
| US-3.7 Public/private toggle | **Partial** | Toggle present; no real visibility gate. |
| US-3.8 Per-field privacy | **Missing** | – |

**Completeness ~12%**

### EPIC 4 — External Platform Connections

| Story | Status | Notes |
|---|---|---|
| US-4.1–4.2 OAuth (11 platforms) | **Missing** | Local toggles only. |
| US-4.3 Status + last-synced | **Shell** | Mocked. |
| US-4.4 Disconnect/reconnect + confirm | **Partial** | No confirm. |
| US-4.5 Daily auto-sync + manual refresh | **Missing** | No cron/API. |
| US-4.6 Cross-platform total + chart | **Shell** | No chart lib. |
| US-4.7 Growth trend 7/30/90d | **Missing** | – |
| US-4.8 AI top fans | **Shell** | – |
| US-4.9 Demographics | **Shell** | Mock pie. |
| US-4.10 CSV export | **Missing** | – |

**Edge cases (revoked, rate-limited, deprecated, zombie token):** none handled.

**Completeness ~5%**

### EPIC 5 — Content Studio

| Story | Status | Notes |
|---|---|---|
| US-5.1 Image / carousel ≤10 | **Shell** | Single mock; no picker, no carousel, no size check. |
| US-5.2 Video ≤60min, resumable | **Shell** | Mock metadata. |
| US-5.3 Audio | **Missing** | – |
| US-5.4 Caption + count + hashtag + @mention | **Partial** | Caption only; no counter/suggester/picker. |
| US-5.5 Tag location/products/collaborators | **Missing** | – |
| US-5.6 Per-post toggles | **Missing** | – |
| US-5.7 Preview pre-publish | **Missing** | – |
| US-5.8 Schedule timezone-aware | **Partial** | List exists; no picker. |
| US-5.9 Drafts + edit/delete | **Shell** | – |
| US-5.10 Cross-post + per-platform captions + status | **Missing** | – |
| US-5.11 Pin/archive/soft-delete 30d | **Missing** | – |
| US-5.12 Per-post analytics | **Partial** | Lacks watch-time / engagement %. |

**Completeness ~10%**

### EPIC 6 — Merchandise Studio

| Story | Status | Notes |
|---|---|---|
| US-6.1 Catalog multi-select | **Partial** | Single mockup. |
| US-6.2 Variants + size charts | **Missing** | – |
| US-6.3 Artwork upload + resolution check | **Missing** | – |
| US-6.4 Design library | **Missing** | – |
| US-6.5 AI mockups 3–5 | **Missing** | UI label only. |
| US-6.6 Edit placement/scale/rotate | **Missing** | – |
| US-6.7 Designer marketplace | **Missing** | – |
| US-6.8 Escrow pay designer | **Missing** | – |
| US-6.9 Cost + margin + retail calculator | **Missing** | – |
| US-6.10 Market comparison | **Missing** | – |
| US-6.11 Publish in-app + standalone | **Partial** | In-app only. |
| US-6.12 Fan store on profile | **Partial** | In-app only. |
| US-6.13 Auto standalone `underdawgstore.com/username` | **Missing** | – |
| US-6.14 Custom branding + domain | **Missing** | – |
| US-6.15 Sales dashboard | **Shell** | Orders list. |

**Completeness ~6%**

### EPIC 7 — Gigs & Brand Deals (largest epic, 23 stories)

| Story | Status |
|---|---|
| US-7.1 Personalized feed incl. Get Viral | **Partial** — no Get Viral, no personalization. |
| US-7.2 Filters + sort | **Partial** — limited. |
| US-7.3 Save/alerts/hide | **Partial** — save only. |
| US-7.4 Pre-apply detail (exclusivity, usage rights) | **Partial** |
| US-7.5 Market rate "creators like me" | **Missing** |
| US-7.6 AI negotiation tips | **Missing** |
| US-7.7 Eligibility + apply + templates | **Partial** |
| US-7.8 Review/submit/withdraw | **Partial** — no withdraw. |
| US-7.9 Status timeline + push | **Partial** |
| US-7.10 Negotiate chat + counters + terms + receipts | **Shell** |
| US-7.11 Walk away | **Missing** |
| US-7.12 Contract + change request + e-sign | **Missing** |
| US-7.13 Download PDF | **Missing** |
| US-7.14 Active gigs + checklist + countdown + reminders | **Partial** |
| US-7.15 Brand asset download | **Missing** |
| US-7.16 Upload deliverables | **Missing** |
| US-7.17 Review status + feedback + push | **Missing** |
| US-7.18 Revisions + counter | **Missing** |
| US-7.19 Go-live + link + perf | **Missing** |
| US-7.20 Payment + invoice + payout + escrow | **Missing** |
| US-7.21 Two-way rating | **Missing** |
| US-7.22 Auto-add to portfolio | **Missing** |
| US-7.23 Dashboard tabs + calendar/kanban | **Partial** — Active only. |

**Completeness ~8% — most business-critical epic is the thinnest past listing.**

### EPIC 8 — Challenges

| Story | Status |
|---|---|
| US-8.1 Browse by status/category/filter | **Partial** |
| US-8.2 Pre-entry detail | **Partial** |
| US-8.3–8.5 Join/submit/edit/withdraw + lock | **Missing** |
| US-8.6 Fan gallery + engage | **Missing** |
| US-8.7 Voting + limit | **Missing** |
| US-8.8 Live leaderboard | **Missing** |
| US-8.9 Winner notify/prize/badge | **Missing** |
| US-8.10 History tab | **Missing** |

**Completeness ~10%**

### EPIC 9 — Tips

All of US-9.1–9.6 — **Missing entirely.** No Tips route in app.

**Completeness 0%**

### EPIC 10 — Collaboration

| Story | Status |
|---|---|
| US-10.1 Collab status on profile | **Partial** — tags only. |
| US-10.2 Search collaborators w/ filters | **Missing** |
| US-10.3 AI suggestions | **Missing** |
| US-10.4 Send/receive requests | **Missing** |
| US-10.5 Collab inbox + planning chat | **Missing** |
| US-10.6 Tag/co-post/split attribution | **Missing** |
| US-10.7 Collab history | **Missing** |

**Completeness ~5%**

### EPIC 11 — Community

| Story | Status |
|---|---|
| US-11.1 Browse/search/suggested | **Partial** |
| US-11.2 Detail w/ rules/admins | **Missing** |
| US-11.3 Join/leave/gated/invite | **Partial** — toggle only. |
| US-11.4 Post/comment/pin | **Missing** |
| US-11.5 Real-time group chat | **Missing** |
| US-11.6 Events + RSVP + reminders | **Partial** — list only. |
| US-11.7 Directory / mentor / spotlight | **Missing** |

**Completeness ~10%**

### EPIC 12 — Insights & Analytics

| Story | Status |
|---|---|
| US-12.1 Overview + time range + widgets | **Partial** |
| US-12.2 Export CSV/PDF | **Missing** |
| US-12.3 Profile views/trend/demographics | **Shell** |
| US-12.4 Per-post engagement | **Partial** |
| US-12.5 Top content sortable | **Partial** |
| US-12.6 Audience + AI best-time | **Shell** |
| US-12.7 Cross-platform | **Shell** |
| US-12.8 Portfolio funnel | **Missing** |
| US-12.9 Earnings + projected | **Missing** |
| US-12.10 Merch + gigs sub-tabs | **Missing** |

**Completeness ~10%**

### EPIC 13 — Reputation & Verification

| Story | Status |
|---|---|
| US-13.1 Score + tier | **Shell** — no scoring service. |
| US-13.2 Factors transparent | **Partial** |
| US-13.3 History + tips | **Missing** |
| US-13.4 Tier benefits + push | **Missing** |
| US-13.5 ID + liveness | **Shell** — checklist only. |
| US-13.6 Status + reason + resubmit | **Missing** |
| US-13.7 Blue check application | **Missing** |
| US-13.8 Badges auto-awarded | **Shell** |
| US-13.9 Profile section + achievement notifications | **Partial** |

**Completeness ~12%**

### EPIC 14 — Financial Dashboard

| Story | Status |
|---|---|
| US-14.1 Balances + trend | **Shell** |
| US-14.2 Breakdown chart | **Shell** — no chart lib. |
| US-14.3 Transactions filter/search/export | **Partial** |
| US-14.4 Withdraw + threshold/method/status | **Shell** |
| US-14.5 Payout ETA + push | **Missing** |
| US-14.6 Bank/UPI/PayPal + micro-deposit | **Missing** |
| US-14.7 Fee transparency | **Partial** |
| US-14.8 Tax docs / PAN-GST | **Shell** |
| US-14.9 Invoice templates + history | **Partial** |

**Edge cases (KYC, fraud hold, chargeback, currency):** none.

**Completeness ~10%**

### EPIC 15 — Notifications

US-15.1–15.5 — **Missing entirely.** No notification center; `SettingsNotifications` has 4 booleans; spec lists ~16 event types.

**Completeness ~5%**

### EPIC 16 — Settings

| Story | Status |
|---|---|
| US-16.1 Email/phone/password + re-auth | **Partial** |
| US-16.2 2FA + login history + logout-all | **Shell** |
| US-16.3 Edit profile from settings | **Partial** |
| US-16.4 Privacy controls | **Partial** |
| US-16.5 Block/mute lists | **Missing** |
| US-16.6 GDPR export | **Missing** |
| US-16.7 Notification settings granular | **Partial** |
| US-16.8 Manage platforms | **Partial** — duplicated. |
| US-16.9 Payment methods | **Missing** |
| US-16.10 Language / theme / autoplay / data-saver / quality / clear cache | **Partial** — theme only. |
| US-16.11 Help/contact/report/feedback | **Missing** |
| US-16.12 Guidelines / ToS / Privacy linked | **Missing** |
| US-16.13 Logout / deactivate / delete (30d grace) | **Partial** — logout only. |

**Completeness ~15%**

### Cross-cutting epics

| Epic | Status |
|---|---|
| X1 Subscriptions (Free/Creator+/Pro/Elite) | **Missing** — no plans, no gating, no billing. |
| X2 Discovery Feed | **Partial** — UI exists; hard-coded mock ordering. |
| X3 Direct Messaging | **Shell** — see C-14 + Part C-4. |
| X4 Trust/Safety | **Missing** — see C-22. |
| X5 Compliance | **Missing** — see C-23. |

---

## 4. PART 2 — In APP, NOT in Spec (detail)

### A-1. Entire **Learning** module — `/(modules)/learning`

- **Files:** [`LearningIndex.tsx`](./src/screens/modules/learning/LearningIndex.tsx), [`LearningCourse.tsx`](./src/screens/modules/learning/LearningCourse.tsx)
- **What it does:** Course library with categories, instructors, durations, lesson counts, progress tracking (`store.lessonProgress`), "mark lesson done". Tagline: *"get better, on purpose."*
- **Spec coverage:** **Zero.** No Learning/Courses epic exists.
- **Action:** Authorize as a new epic, OR remove the module.

### A-2. Entire **Art** module — `/(modules)/art`

- **Files:** `ArtIndex.tsx`, `ArtList.tsx`, `ArtCommissions.tsx`, `ArtDetail.tsx`
- **What it does:** Art portfolio with categories `ORIGINAL` / `LIMITED PRINT` / `OPEN PRINT` / `DIGITAL`, per-piece INR pricing, sold/available state, commissions queue.
- **Spec coverage:** None directly. Partial overlap with Epic 3 (Portfolio) and Epic 6 (Merch), neither covers original/edition pricing or art commissions.
- **Action:** Fold into Portfolio + Merch, or add an "Art / Original Works" epic.

### A-3. Audience > **Email List** — `/(modules)/audience/email-list`

- **File:** [`AudienceEmailList.tsx`](./src/screens/modules/audience/AudienceEmailList.tsx)
- **What it does:** Subscriber roster, open-rate metric, "send email" composer.
- **Spec coverage:** Zero. No newsletter epic, no compliance plan, no sending backend.
- **Action:** Spec formally (with CAN-SPAM/GDPR/double opt-in/unsubscribe) or strip.

### A-4. Audience > **Landing Page builder** — `/(modules)/audience/landing-page`

- **File:** [`AudienceLandingPage.tsx`](./src/screens/modules/audience/AudienceLandingPage.tsx)
- **What it does:** Linktree-style block builder at `underdawgs.com/{handle}`. Toggleable blocks: BIO/LINKS/SOCIAL/EMAIL SIGNUP/VIDEO/IMAGE/MERCH/ART.
- **Spec coverage:** **Conflicts with Epic 2.** Spec calls the same URL a LinkedIn-style portfolio. See Part 5 (C-1).
- **Action:** Decide one mental model for the URL.

### A-5. "**OWNED vs RENTED audience**" pillar

- **Files:** `AudienceIndex.tsx` and submodules.
- **What it does:** Frames audience as OWNED (email list, landing page) vs RENTED (social).
- **Spec coverage:** None — Epic 4 covers platform connections only.
- **Action:** Elevate to first-class epic in spec, or remove from app messaging.

### A-6. **Camera** capture module — `/(modules)/camera`

- **File:** `Camera.tsx` (~396 lines: capture + filters + crop).
- **Spec coverage:** US-5.1/5.2 say "upload," not "capture." No in-app camera story.
- **Action:** Add story, or rely on OS picker.

### A-7. **UserType** creator-vs-business fork

- **File:** `UserType.tsx`.
- **Spec coverage:** Spec scope is "Creator/Artist Flow." US-1.8 ("primary creator type") is a creator-subtype choice, not a top-level role split. Selecting "business" dead-ends.
- **Action:** Either build the Business flow (Brand role per spec matrix) or remove the fork.

### A-8. Creator-authored **Rate Card** — `/(modules)/jobs/rate-card`

- **File:** `JobsRateCard.tsx`.
- **Spec coverage:** US-7.5 is the inverse — "see market rate for creators like me." No story for the creator authoring their own rate card.
- **Action:** Add a story to Epic 7, or merge into negotiation tooling.

### A-9. **Welcome 3-slide carousel** + heavily animated **Splash**

- **Files:** `Welcome.tsx`, `Splash.tsx`.
- **Spec coverage:** US-1.15 only says "dismissable, replayable from settings." App over-builds the screens AND under-implements the AC ("replayable from settings" is missing).
- **Action:** Add the replayability AC, or trim the screens.

### A-10. **Analytics > AI Insights** as standalone tab — `/analytics/ai-insights`

- **File:** `AnalyticsAiInsights.tsx`.
- **Spec coverage:** Spec scatters AI hints (US-4.8, 7.6, 12.6); no central AI Insights surface.
- **Action:** Spec it, or distribute back into parent surfaces.

### A-11. Tabs nav has **hidden** `Create` and `Inbox` tabs

- **Spec coverage:** Spec doesn't describe nav. Minor.
- **Action:** Document the IA decision in spec.

### A-12. **Theme system** (dark/light + animated tokens)

- **Spec coverage:** US-16.10 mentions theme as one toggle. App over-delivers with full themed palette + `ThemeContext`.
- **Action:** Healthy expansion. No fix.

### A-13. **Heavy motion language** (TapBurst / Magnetic / Reveal / Skia)

- **Spec coverage:** Silent.
- **Action:** Fine, but consolidate primitives (see C-18) and reserve celebratory motion (TapBurst) for celebratory moments (publish, payout, win).

---

## 5. PART 3 — In BOTH but DIVERGENT (interpretation conflicts)

The most dangerous misalignments — both sides *appear* aligned at a glance.

### C-1. `underdawg.com/username` — two products fighting for one URL

| Source | Vision |
|---|---|
| **Spec, Epic 2** | LinkedIn-style **portfolio** page: cover + photo + verified badge + bio + stats + portfolio grid 6–12 + platforms + collab status + rates + merch + events + press. SEO-friendly, OG cards, <2s. |
| **App, `AudienceLandingPage.tsx`** | Linktree-style **block builder**: BIO/LINKS/SOCIAL/EMAIL SIGNUP/VIDEO/IMAGE/MERCH/ART blocks. No SEO, no grid. |
| **App, `PortfolioPublicPreview.tsx`** | A third in-app facsimile of the public profile. |

**Outcome:** Same URL, three content models. Pick one.

### C-2. "Creator type" vs "User type"

| Source | Question |
|---|---|
| **Spec, US-1.8** | "Pick primary creator type (artist/musician/etc.)" — subtype within `creator`. |
| **App, `UserType.tsx`** | "Are you a creator or a business?" — top-level role split. |
| **App, `CreatorType.tsx`** | The spec's question — but now at step *3* of onboarding. |

**Outcome:** Top-level fork the spec doesn't authorize, with a dead-end "business" branch.

### C-3. Platform connections — duplicated surface

| Source | Where |
|---|---|
| **Spec, US-4.1–4.4** | Connection wizard with OAuth, status, disconnect. |
| **Spec, US-16.8** | Manage platforms from settings. |
| **App** | `AudienceConnections.tsx` reached from both Audience AND Settings. |

**Outcome:** Spec implies 2 surfaces; app has 1 reached 2 ways.

### C-4. Inbox / Messaging

| Source | Model |
|---|---|
| **Spec, X3** | Generic DMs (real-time, read receipts, typing, attachments, mute/archive/block/report per thread). |
| **Spec, US-7.10** | Deal-negotiation chat with counter-offers, terms summary, receipts — implies offer cards. |
| **App, `Inbox.tsx` + `InboxThread.tsx`** | Thin generic chat. No offer cards, no read receipts, no attachments, no mute/archive/block/report on thread. |

**Outcome:** App ships a half version that satisfies neither.

### C-5. "Verification"

| Source | Meaning |
|---|---|
| **Spec, US-13.5** | Identity verification (ID upload + liveness, auto-match). |
| **Spec, US-13.7** | Blue check verification (notability application). |
| **App, `ReputationVerification.tsx`** | 3-step checklist (email/phone/ID) that advances locally. Conflates both. |

**Outcome:** Two distinct spec features collapsed into one shallow screen.

### C-6. "Skip" on onboarding

| Source | Behavior |
|---|---|
| **Spec, US-1.13** | Skip non-essential — resume later from checklist. |
| **App** | Skip jumps forward; no checklist to resume from. |

**Outcome:** One-way exit, not a resumable bookmark.

### C-7. Theme / dark mode

| Source | Scope |
|---|---|
| **Spec, US-16.10** | One toggle among prefs. |
| **App** | Full themed palette + ThemeContext. |

**Outcome:** Over-delivery. No conflict, but worth noting.

---

## 6. PART 4 — Role coverage gap

Spec's role matrix demands **Creator, Brand, Manager, Fan, Admin** flows across the modules below:

```
| Module               | C | B | M | F | A |
| 1 Onboarding         | ✅| ✅| ✅| ✅| — |
| 2 Public Portfolio   | ✅| view | view | view | — |
| 6 Merch              | ✅| — | — | ✅ buy | ✅ fulfillment |
| 7 Gigs               | ✅ apply | ✅ post | ✅ negotiate | — | ✅ moderate |
| 8 Challenges         | ✅ enter | ✅ sponsor | — | ✅ vote | ✅ run |
| 9 Tips               | ✅ receive | — | — | ✅ send | — |
| 11 Community         | ✅ | — | — | ✅ | ✅ moderate |
| 14 Finance           | ✅ | ✅ pay | ✅ commission | ✅ buy | — |
```

App implementation:

- **Creator:** partial.
- **Brand:** absent (no Brand onboarding, no "post a gig," no campaign analytics).
- **Manager:** absent (no roster, no commission tracking).
- **Fan:** absent (no fan-side feed/store/voting/tipping).
- **Admin:** absent (no moderation queue, no fulfillment console).

**4 of 5 role flows are entirely absent.** Any AC that requires another role to act end-to-end cannot be exercised.

---

## 7. PART 5 — Naming / concept conflicts

| Term | Spec uses it as | App uses it as | Conflict |
|---|---|---|---|
| Portfolio | Public LinkedIn-style page (E2) + curated featured works (E3) | In-app Portfolio module + PortfolioPublicPreview + AudienceLandingPage at same URL | 3-way overlap |
| Landing page | Not used | Linktree block builder | Spec silence + new app concept |
| Audience | Not a top-level concept | Top-level pillar (OWNED vs RENTED) | Spec lacks the pillar |
| Verification | Two distinct things (ID + Blue Check) | One conflated screen | Loss of fidelity |
| Creator type | Subtype within `creator` (US-1.8) | App's `CreatorType` matches; but `UserType` adds an unrelated fork | OK except for added fork |
| Skip | Resume from checklist | Jump forward, no resume | Behavioral mismatch |
| Inbox | DMs (X3) + deal chat (7.10) | Generic threaded chat | Loses negotiation semantics |
| Rate card | Market rate *for* creators (US-7.5) | Creator's *own* rate card | Inverse direction |
| Insights | Distributed AI hints | Dedicated AI Insights tab | Centralization vs distribution |

---

## 8. PART 6 — UI / UX consistency

| # | Issue | Severity | Where | Fix |
|---|---|---|---|---|
| U-1 | Five competing tap primitives | Major | `components/ui/*` | One `<Button variant>` API |
| U-2 | Skip placement inconsistent across onboarding | Minor | Onboarding | Standardize top-row: back · step · skip |
| U-3 | Step counts vs stack depth mismatch | Minor | Onboarding | Shared `<StepBadge index/>` |
| U-4 | Casing mixed (CAPS labels vs sentence case) | Minor | All | One rule per typographic role |
| U-5 | Acid/electric used without semantic mapping | Major | `theme/colors.ts` | Add success/warn/error/info tokens |
| U-6 | Toasts as universal "I did something" | Major | All | Reserve for system feedback; use inline UI for action results |
| U-7 | No standard list/detail/form skeleton | Major | Modules | Require `ModuleHeader` + `ScreenFrame` |
| U-8 | `EmptyState` exists but unused | Major | Modules | Apply to every list page |
| U-9 | Destructive actions not gated by confirm | Major | Portfolio/Audience/Settings | `Sheet` for confirmations |
| U-10 | Form fields lack label/helper/error contract | Major | All forms | Define `<Field label helper error/>` |
| U-11 | Keyboard avoidance inconsistent (Auth missing it, Identity has it) | Major | Auth.tsx | Add `KeyboardAvoidingView` everywhere |
| U-12 | Safe-area handling inconsistent | Minor | All | Wrap with single `ScreenFrame` |
| U-13 | Auth subtitle mentions privacy with no toggle nearby | Minor | Auth.tsx | Remove or surface |
| U-14 | Dial code hard-coded `+91` | Major | Auth.tsx:202 | Country picker |

---

## 9. PART 7 — Mobile responsiveness / performance

| # | Issue | Severity | Where | Fix |
|---|---|---|---|---|
| P-1 | `Dimensions.get('window')` snapshotted at import | Major | Auth/Welcome/large screens | `useWindowDimensions()` |
| P-2 | Heavy Skia chained on every onboarding screen | Major | Splash/Welcome/Auth | Defer ambient anims; gate on Platform/low-end |
| P-3 | `transform-remove-console` plugin not verified in babel preset | Minor | Build | Confirm enabled in production |
| P-4 | `Profile.tsx` ~1421 lines, monolithic | Major | Profile.tsx | Split into memoized child cards |
| P-5 | `Feed.tsx` ~1071 / `Explore.tsx` ~1125 lines; no FlashList | Major | Feed/Explore | `@shopify/flash-list` |
| P-6 | Many synchronous `require('@/objects/*.png')` | Minor | Onboarding | Lazy load |
| P-7 | No bundle budget, no Sentry sourcemap upload | Minor | Build | Add both |
| P-8 | No image format/CDN strategy | Major | All media | `react-native-fast-image` consistently + CDN |

---

## 10. PART 8 — Edge cases the spec calls out

**0 of ~50 spec-named edge cases are handled.** Including:

- Username taken, OAuth denied, OTP timeout, duplicate email, network drop mid-signup
- Rename 301 / deleted 410 / banned / private
- OAuth revoked / rate-limited / deprecated / zombie token
- Upload interrupted / too big / wrong format / scheduled while suspended / cross-post fail
- Low-res rejected / designer ghosting / DNS misconfig / refund
- Brand cancels mid-gig / missed deadline / revision loop / dispute
- Vote brigading / late submission / prize delivery failure
- Payment failure / refund / anonymous tipper / abusive message
- Spam collab / partner deletes mid-collab
- Banned from community / admin abandonment
- Data delay >24h / pagination
- ID forgery / liveness fail / badge revoke
- Bank rejection / payout reversal / fraud hold / KYC required
- Push token expired / OS disabled / digest empty
- Delete with active gigs/funds / deactivate during escrow / password change elsewhere

---

## 11. Fix checklist

### P0 — Cannot ship without (Top 10 launch blockers)

1. **Real authentication** — Firebase / Auth0 / Clerk / Supabase; email + Google + Apple + Phone OTP + reset + logout-all. Without this, the Skip button is the only path past `Auth.tsx`.
2. **Backend platform** — model users, profiles, content, jobs, payments, notifications, moderation; typed API client.
3. **Auth-gated navigation** — wire `RootNavigator` to `useAuth().status`; gate Skip on Auth if it bypasses required signin.
4. **Universal links + portfolio web app** — `underdawg.com/username` (Next.js + SSR + OG + `apple-app-site-association`/`assetlinks.json`).
5. **Payments + KYC** — Stripe / Razorpay; KYC pre-payout (X5.2); escrow for jobs (7.20) + designer marketplace (6.8).
6. **Media pipeline** — picker + uploader + transcode + CDN; size/format validation; thumbnails.
7. **Push notifications** — FCM + Notifee + token storage + per-type prefs; permission prompt timing per US-1.14.
8. **Moderation & safety (X4)** — report flows + admin queue + takedown + appeal + strikes.
9. **Compliance / disclosure (X5)** — `#ad` injection + KYC pre-payout gate + GDPR export/delete.
10. **Crash & error reporting + analytics** — Sentry + Segment/RudderStack; release health gating.

### P1 — Required by Definition of Done

- Tests (Jest + RNTL + Detox/Maestro + CI)
- a11y AA pass
- i18n (en + hi, RTL audit)
- Real-time chat (X3 + 7.10 + 10.5 + 11.5)
- Identity verification provider (13.5 — Persona/Onfido/SumSub)
- Subscription tiers (X1)

### P2 — Quality / polish

- Drag-drop portfolio reorder (3.3)
- AI features when data exists (6.5 / 7.6 / 4.8 / 12.6)
- Custom domain for standalone store (6.14)
- CSV/PDF exports (12.2 / 14.8)
- Calendar/kanban for gigs (7.23)

### Cleanup of un-specced features (from Part 2)

- Authorize or remove **Learning** (A-1)
- Authorize or fold **Art** (A-2)
- Spec or strip **Email List** (A-3)
- Pick ONE model for `underdawg.com/username` and consolidate **Landing Page** + **PortfolioPublicPreview** (A-4 / C-1)
- Promote **Audience** pillar in spec, or remove the messaging (A-5)
- Spec **Camera** capture, or rely on OS picker (A-6)
- Build the **Business** branch of UserType, or remove the fork (A-7 / C-2)
- Spec the **creator-authored Rate Card** (A-8)
- Add the **"replayable tutorial"** AC to Welcome (A-9)
- Distribute or formally spec **AI Insights** (A-10)

### Cleanup of divergent interpretations (from Part 5)

- Pick one model for each row of the C-table. Update spec + app together.

---

## 12. Scoreboard

### Feature completeness by epic

| Epic | % | Confidence |
|---|---|---|
| 1 Onboarding | ~15% | high |
| 2 Public Portfolio | ~5% | high |
| 3 In-App Profile | ~12% | high |
| 4 External Platforms | ~5% | high |
| 5 Content Studio | ~10% | high |
| 6 Merch Studio | ~6% | high |
| 7 Gigs & Brand Deals | ~8% | high |
| 8 Challenges | ~10% | medium |
| 9 Tips | 0% | high |
| 10 Collaboration | ~5% | high |
| 11 Community | ~10% | high |
| 12 Analytics | ~10% | high |
| 13 Reputation | ~12% | high |
| 14 Finance | ~10% | high |
| 15 Notifications | ~5% | high |
| 16 Settings | ~15% | high |
| X1 Subscriptions | 0% | high |
| X2 Discovery Feed | ~25% | medium |
| X3 DMs | ~10% | high |
| X4 Trust & Safety | 0% | high |
| X5 Compliance | 0% | high |
| **Weighted overall** | **~9%** | — |

UI scaffolding is ~70% built — that's why the app looks deceptively complete.

### Production readiness — 1.5 / 10

| Dimension | Score |
|---|---|
| Visual design / motion | 8/10 |
| Code structure / theming | 6/10 |
| Functional completeness | 1/10 |
| Backend / data integrity | 0/10 |
| Security / auth / compliance | 0/10 |
| Accessibility | 0/10 |
| Observability | 0/10 |
| Internationalization | 0/10 |
| Testing / CI | 0/10 |
| Performance hygiene | 3/10 |
| Spec adherence | 1/10 |

### Top 10 UX wins (highest impact, lowest cost)

1. Make Skip explicit about consequences ("you can finish later from your profile checklist"). US-1.13.
2. Replace toasts on destructive/financial actions with modal + receipt screen.
3. Surface profile completion %. US-1.12 / US-3.6.
4. One canonical Button + Field. Reserve TapBurst for celebratory moments only.
5. Country picker for phone signup. Hard-coded `+91` is a 100% drop for non-IN.
6. Empty states everywhere. `EmptyState` is built — use it.
7. Keyboard avoidance + persistent CTAs on every form.
8. Confirm destructive actions with `Sheet`. Spec demands it in 3.4 / 4.4 / 16.13.
9. Show last-synced timestamps on platform tiles. US-4.3 — honesty builds creator trust.
10. Public profile share sheet + QR. US-2.9 — high-impact differentiator currently absent.

---

## 13. Recommended next move

The repo is exceptional as a **design / interaction prototype** but every Definition-of-Done item is unmet, and the spec ↔ app divergences must be reconciled before further feature work.

1. Freeze new UI screens.
2. Reconcile spec ↔ app — for every row in Parts 2/3/5, decide: extend the spec, or trim the app.
3. Pick the backend platform (Firebase / Supabase / custom). Unblocks ~80% of P0.
4. Restore real auth + add Apple Sign-In.
5. Stand up the public-profile web app — your headline feature.
6. Add Sentry + Segment + a Jest config in one PR — cheap, unblocks every following PR.
7. Re-implement modules behind a real API one epic at a time, beginning with Epic 1 + Epic 2 + Epic X4 (safety) before any monetization.

---

*Bidirectional audit generated 2026-05-11 against `USER_STORIES_EPICS.md` v1.1.*
