# Underdawg — Context for the Brands & Agencies Web Portal

> **Purpose of this document.** The Underdawg **creator mobile app** already exists (React Native, iOS + Android, in this repo). We now need a **web portal for Brands and Agencies** that connects to the same backend, lets them discover and hire creators, run the deal lifecycle, pay them, and run campaigns. This file is the single source of truth to hand to Claude when designing that portal — user personas, IA, screens, data model, and the API surface. Everything below was extracted directly from the app's spec, code, and mock data.
>
> **Key framing:** the mobile app is built **entirely from the creator's point of view**. Brands and agencies exist only as *counterparties* inside creator flows (the "other side" of a deal, a name on a job, a thread in the inbox). **The portal is the missing other half of every brand/agency interaction.** The status enums and data shapes are already defined by the app — the portal must mirror them exactly so both sides stay in sync.

---

## 1. What Underdawg Is

**Tagline:** *"The operating system for the creator economy. Get Discovered. Get Connected. Get Paid."*

Underdawg is not a social app — it's a pipeline that turns unknown talent into monetizable assets and sits in the middle of that transformation. It fuses five products into one:

- **Instagram** — content & discovery
- **LinkedIn** — professional identity & public portfolio
- **Upwork** — job marketplace / brand deals
- **Shopify** — merch stores
- **CAA / WME** — talent management

**The core thesis:** every other platform monetizes creators *after* they're already valuable and expensive. Underdawg monetizes them *before* — capturing value during the rise from unknown → established. The feed algorithm even has an explicit **"Growth Potential" boost** for promising emerging creators.

**Market:** India-first (₹ pricing, GST/TDS/PAN, Razorpay/UPI) with international support via Stripe.

### The 4-Layer Business Model (how money flows — critical for the portal)

| Layer | What it is | Underdawg revenue | Portal relevance |
|---|---|---|---|
| **L1 — Discovery & Community** | Entry point, data engine, talent funnel; public portfolios; reputation scoring | Indirect (feeds the funnel) | Brands **discover & vet** creators here |
| **L2 — Monetization** | Merch, art, brand deals, subscriptions, tips | Commission + subscription fees | Brand deals run here |
| **L3 — Amplification ("Get Viral")** | Invite-only, curated, coordinated creator amplification campaigns. **₹75K – ₹20L+ per campaign.** Mandatory `#ad`/`#paidcollab` disclosure. | High-margin campaign fees | **Core B2B product brands buy** |
| **L4 — Artist Management** | Underdawg manages the top 1–5% of creators | **15–25% of creator earnings** | Overlaps with the Agency persona — see §9 |

Eight revenue streams overall: merch, art marketplace, brand deals, subscriptions, tips, Get Viral campaigns, management fees, affiliate/challenge prizes.

---

## 2. User Roles (selected at onboarding)

The app defines four account types (`mock.ts` → `userTypes`), plus an internal admin. Only **Creator** is built in the mobile app today.

| Role | Self-description in app | What they do | Built? |
|---|---|---|---|
| **Creator** | "I MAKE THINGS" | Portfolio, content, owns audience, applies to gigs, sells merch/art, gets paid, builds reputation | ✅ Mobile app |
| **Brand** | "I HIRE CREATORS / Run deals, find talent, launch campaigns" | Post gigs, review & shortlist applicants, negotiate, sign contracts, review deliverables, pay via escrow, rate creators, run campaign analytics, sponsor challenges, buy Get Viral | ❌ **← Portal** |
| **Manager / Agency** | "I REP TALENT" | Represent creators, negotiate deals on their behalf, broker collabs, take commission, view client dashboards | ❌ **← Portal** |
| **Fan** | "I CHAMPION CREATORS" | Consume content, follow, tip, buy merch/art, vote in challenges, request commissions | Partial (mobile) |
| **Admin** | — | Run challenges, moderate, verify creators, trust/safety, fulfillment | ❌ (separate) |

**The portal serves Brand + Manager/Agency.** Their full task surface is §6 and §9.

---

## 3. Everything Known About Brands & Agencies

Because the app is creator-facing, brand/agency behavior is described only as the counterparty side of creator flows. Collected here:

### 3.1 How brands relate to the product
- The job board's stated purpose: *"Connect creators with paid opportunities from brands and agencies in a transparent marketplace built for creators, not brands."* The platform stance is **creator-first** (contracts use "Underdawg-standard creator-protective terms") — the portal must still serve brands well within that framing.
- **Get Viral** (Layer 3) is the curated, invite-only premium amplification product brands buy.

### 3.2 The Brand Deal lifecycle (the central B2B flow)
Brand-side actions **bolded** — these are what the portal must build:
```
CREATOR APPLIES (pitch, rate, timeline, portfolio auto-attached)
 → BRAND REVIEWS APPLICATION → (REJECT / SHORTLIST)
 → NEGOTIATION (chat: rate, scope, timeline, usage rights)
 → CONTRACT GENERATED → BOTH PARTIES E-SIGN → DEAL ACTIVE
 → creator submits deliverables → BRAND REVIEW → REVISION REQUESTS → APPROVAL
 → creator posts go-live link → PAYMENT RELEASED FROM ESCROW → COMPLETE
 → both parties leave reviews
```

### 3.3 Job listing fields a brand defines
Title · Brand (company name + logo) · Type · Niche/Category · Budget Range (min–max) · Payment Structure (flat / per post / affiliate) · Creator Requirements (min followers, niche, location) · Deliverables · Timeline · Usage Rights · Exclusivity · Application Deadline · `verified` flag · Applicant count.

**Job/gig types:** Sponsored Post · Story/Reel · Video Integration · Brand Ambassador (monthly retainer) · Product Review · Event Coverage · UGC Creation · Affiliate (% of sales) · Account Takeover · **Get Viral Campaign** · Custom.

### 3.4 How brands discover & vet creators
- **Public portfolios** are the discovery surface (`underdawg.com/username`, LinkedIn-style). Exposes: stats, niche/skills, connected platforms + follower counts, rates, collab status, reviews, **reputation score**, past brands.
- **"Verified Brand"** is a referenced concept that gates creator privacy: creators can set *Contact Info Visibility* and *Rates Visibility* to **"Verified Brands Only."** → The portal needs a **brand verification / KYC** step.
- Creators set **Collaboration Status** flags brands filter on: Open to Brand Deals · Open to Collaborations · Available for Hire · Taking Commissions · Open to Management · Not Available.
- A **"Work With Me"** CTA on portfolios opens an inquiry form (inbound brand lead). **Brand Inquiry** is a defined message type.
- Brands consume the **portable reputation score** (0–100) and reviews to vet applicants. The score has a **"Brand Reliability"** factor (weight 15).

### 3.5 Brands rate creators (referenced, not yet built anywhere)
Post-gig, brands leave a structured review: Overall · Communication · Timeliness · Content Quality · Professionalism (1–5 each) + written + "Would Work Again." A **"BRAND FAVORITE"** badge requires *"5 deals at 4.5+ rating."* This rating system **does not exist in the app yet — the portal likely owns it.**

### 3.6 Agencies / Managers
- Only one explicit agency in the app: a `LUMA AGENCY` inbox thread (`kind: 'REQUEST'`) — *"We represent a detergent brand. Hear us out."* Agencies currently use the cold-outreach REQUEST channel.
- The spec defines a **Manager Connection** module: manager discovery, manager profiles (roster + specialties), request representation, standard management agreements, and a **Manager Dashboard** where *"the manager sees your data (with permission)."*
- **Team Management** model already exists conceptually: roles **Manager / Assistant / Editor** with a granular permission grid (View Analytics · Reply to DMs · Accept Deals · Post Content · Edit Profile · View Financials · Manage Merch). This is the closest existing model for **multi-seat agency access** → reuse it for an agency managing multiple creators + multiple staff seats.

---

## 4. The Data Model (shared backend)

> ⚠️ The app uses a **mock/seed layer** (`src/data/mock.ts`, `src/data/people.ts`) and a Zustand store (`src/store/index.ts`), **not a real schema**. Entities are keyed by `handle` (`@name`) or `uid` (`u_name`) string, not FK IDs. The portal's backend must **formalize these into real entities.** Explicit TypeScript types are noted; the rest are inferred from seed object shapes.

### Core entities that exist

**Creator / Person** (`people.ts` — derived from feed posts, no real user table):
`handle` (PK) · name · avatar · category (niche) · location · color (accent) · rep (0–100) · rising · posts[]. The richer profile shape (`profileMock`): name · handle · type · location · avatar · bio · stats{followers, following, reputation, earned} · tier · niches[] · platforms[{key,name,value}] · portfolio[] · openTo[] (e.g. `['BRAND DEALS','COMMISSIONS','COLLABS']`).

**Job** (explicit type — what a brand posts):
`id · title · brand (string!) · type · niche · budgetMin · budgetMax · deliverable · deadline (ISO) · applicants (count) · location · accent · verified (bool) · description`

**Application** (creator → job; store action `applyToJob`):
`id · jobId · pitch · rate · timeline · status: APPLIED | SHORTLISTED | REJECTED · submittedAt`

**Deal** (the live engagement = Application + Contract combined):
`id · jobId · title · brand · amount · progress (0–1) · nextAction · accent · status: APPLIED → SHORTLISTED → NEGOTIATING → CONTRACT → ACTIVE → IN REVIEW → COMPLETED`

**Transaction:** `kind: BRAND DEAL | MERCH | ART SALE | TIP | PAYOUT | FEE | GET VIRAL | COMMISSION · source · amount · direction: IN|OUT · date · status: CLEARED | PENDING | SCHEDULED`

**Thread** (messaging): `id · kind: PRIMARY | REQUEST | COLLAB | DEAL · handle · name · preview · unread · verified? · typing? · archived? · messages[{from,body,ts}]`. Brand chats = `DEAL`; agency outreach = `REQUEST`.

**RateCard:** creator's price list `{key, name, base, desc}` — FEED POST · SHORT VIDEO · STORY · VIDEO INTEGRATION · UGC · AMBASSADOR.

**Reputation:** weighted breakdown — quality(20) · consistency(15) · authenticity(15) · community(15) · **brand reliability(15)** · growth(10) · tenure(10). Badges incl. RISING STAR, **BRAND FAVORITE**, COMMUNITY PILLAR, etc. Verification steps: email → phone → government ID → liveness → manual review (gates blue check).

Other entities present: Product (merch), Order, Artwork, Commission, Platform (connected social), Subscriber, Analytics object, Challenge/ChallengeEntry, Community Group/Event/Mentor/Poll/Q&A, Course/Lesson, Settings.

### Canonical state machines (share verbatim across both apps)
- **Deal:** `APPLIED → SHORTLISTED → NEGOTIATING → CONTRACT → ACTIVE → IN REVIEW → COMPLETED` (also CANCELLED, DISPUTED)
- **Application:** `APPLIED | SHORTLISTED | REJECTED | WITHDRAWN`
- **Delivery phase:** `SUBMIT → IN REVIEW → REVISION → APPROVED → GO LIVE`
- **Payment (escrow):** `PENDING → PROCESSING → PAID`

### Gaps the portal MUST close (most important section)
1. **No Brand or Agency entity exists** — brands are free-text name strings on jobs/deals/threads (e.g. `"CITYLINE × RED CIRCLE"`). The portal has nothing to attach to. **Define `Brand` and `Agency` with IDs, profiles, verification status, billing, team seats; link Jobs/Deals to them by FK.**
2. **No real Creator/User table** — identity derived from posts, keyed inconsistently (`handle` vs `uid`). **Unify on a stable creator ID.**
3. **No standalone Application list per job** — `Job.applicants` is just a count. **Build a real Application join entity (Creator ↔ Job)** so the brand can see and triage its applicant pipeline (an ATS).
4. **No Campaign entity** — "Get Viral" exists only as a job type + transaction kind. **Model multi-creator campaigns.**
5. **No Invoice entity** — referenced in chat copy only.
6. **No currency field** — all money is a plain number (mixed ₹/$). Add currency.
7. **No brand→creator rating storage** — the 1–5 review system is referenced but unbuilt.

---

## 5. The Deal / Contract lifecycle in detail (mirror these screens)

From `src/screens/modules/jobs/`. Each creator screen has a brand-side counterpart the portal must build:

| Creator screen | What it does | Brand-side portal screen to build |
|---|---|---|
| JobsIndex / JobDetail | Browse jobs from "verified brands," see brief/budget/deliverables | **Job authoring & posting CMS**, manage live/closed listings |
| JobsApply | Submit pitch + rate + timeline (portfolio auto-attached) | **Applicant inbox** receiving pitch/rate/timeline/portfolio/rep |
| JobsApplications | See outcomes + brand response messages | **ATS: shortlist / reject / send responses**, see applicant metrics |
| GigNegotiation | Haggle on rate/deliverables/timeline/usage in chat | **Counter-offer & negotiation console**; accept → CONTRACT |
| GigContract | E-sign 9-term contract, request changes | **Generate contract from terms, counter-sign, store PDF** |
| GigDeliver | Upload deliverables, get brief + brand assets | **Supply brief + assets; review → approve / request revision w/ notes; confirm go-live link** |
| GigPayment | Escrow PENDING→PROCESSING→PAID, 12% platform fee | **Fund escrow on sign, release on approval; gross→net accounting** |
| JobsRateCard | Published creator prices | Read-only when sizing an offer |

**Contract schema (the 9 `TERMS`):** Parties · Rate · Payment terms ("50% on signing / 50% on approval") · Deliverables · Timeline · Usage rights ("Organic, 90 days") · Exclusivity ("No competing brand, 30 days") · Content ownership ("Creator retains, brand licensed") · Revisions ("2 included"). Clauses cover Scope, Payment, Revisions, Usage & ownership. E-sign via **Digio**.

**Money math:** GigPayment shows GROSS → **platform fee 12%** → NET. Invoices add **GST 18%** (separate). Funds held in **escrow** until the public go-live link is posted.

**Active-deal buckets** (JobsActiveDeals): **PROPOSED** (APPLIED/SHORTLISTED/NEGOTIATING/CONTRACT) · **ACTIVE** (ACTIVE/IN REVIEW) · **CLOSED** (COMPLETED) — a good kanban shape for the brand dashboard.

---

## 6. What the Brand Portal must implement (the mirror, summarized)

1. **Brand onboarding + verification/KYC** (unlocks creator contact info & rates).
2. **Creator discovery & search** — filter by niche, followers, location, rates, collab status, reputation; view public portfolios; match-score pattern (the app uses a "fit %" for collab matches).
3. **Job authoring & posting** (the `Job` shape) + manage listings.
4. **Applicant pipeline / ATS** — receive applications with pitch + rate + timeline + portfolio + rep score; shortlist/reject; respond.
5. **Negotiation console** — counter on rate/deliverables/timeline/usage; accept → contract.
6. **Contract generation, change-requests, e-signature, PDF storage.**
7. **Deal workspace** — brief + brand-asset delivery, review/approve/request-revision with notes, confirm go-live link.
8. **Escrow funding & release** + platform-fee (12%) + GST (18%) accounting; receive/pay invoices.
9. **Messaging** on the DEAL channel (and REQUEST for outreach).
10. **Creator ratings** (1–5 across 5 dimensions + "Would Work Again") feeding the portable reputation score.
11. **Campaign management** for Get Viral (multi-creator), challenge sponsorship.
12. **Campaign analytics** dashboards.
13. **Billing** (Razorpay/Stripe), team seats.

---

## 7. Full creator-app module map (for shared context)

15 modules / ~200 screens: **1** Onboarding & Identity · **2** Profile & Portfolio · **3** Content Studio · **4** Feed & Discovery (+ Challenges) · **5** Audience Ownership (migrate followers → owned email/SMS) · **6** Analytics & Intelligence · **7** Job Board & Brand Deals · **8** Merchandise Studio (print-on-demand + auto-generated e-commerce site) · **9** Art Marketplace (+ commissions) · **10** Financial Dashboard · **11** Collaboration Hub (messaging, Team Management, Manager Connection) · **12** Reputation & Verification · **13** Community & Engagement · **14** Learning & Growth · **15** Settings.

Creator subscription tiers: Free / Creator+ ₹299 / Pro ₹799 / Elite ₹1,999.

---

## 8. Tech stack & API surface

**Architecture:** mobile (RN) + web portal + public web profiles + auto-generated e-commerce sites → Underdawg backend over **REST/GraphQL + WebSocket**. Services: User, Content, Analytics, Payments, AI.

**API groups** (`/api/v1/...`) relevant to the portal: `auth · users · creators · jobs · deals · merch · art · finance · messages · notifications · reputation · search · analytics · ai`.

**Webhooks:** `deal.status_changed · payment.received · verification.completed · content.published · order.placed`.

**Third-party stack:** Payments **Razorpay** (India) + **Stripe** (intl) · Media **AWS S3 + CloudFront** · Auth/Push **Firebase** · Email **SendGrid** · SMS **Twilio** · E-sign **Digio** · Errors **Sentry** · Product analytics **Mixpanel** · AI **Claude / OpenAI**. External social: Instagram, YouTube, TikTok, Twitter, Spotify, Twitch APIs.

**Merch mockups:** backend proxy to Printful's async Mockup Generator (`POST /mockups/upload`, `POST /mockups/create`, `GET /mockups/task`). See `docs/mockups-backend.md`.

**Non-functional targets:** 1M creators / 10M content / 100K DAU · 99.9% uptime · HTTPS/AES-256/OAuth2/2FA · GDPR + data export · en + hi · WCAG 2.1 AA.

---

## 9. Open decisions to resolve before/while designing

1. **Agency vs. Underdawg-run management (L4) overlap.** The platform itself manages top creators (15–25% fee). An external *agency* portal is a parallel or partner concept. Decide: are agencies independent third parties who bring their own creators, Underdawg's own management arm, or both? The existing manager-representation + permission-grid model can be reused either way.
2. **"Verified Brand" definition** — what KYC unlocks contact/rates. Undefined; the portal will specify it.
3. **Brand vs Agency feature split** — a brand hires for itself; an agency manages a *roster* of creators and/or runs deals on behalf of *brand clients*. These are two different IA trees — confirm both are in scope for v1.

---

## 10. Design language (match the app)

Editorial, brutalist-leaning, high-contrast, dark-first. Reuse for the portal so it feels like one product.

**Palette** (`src/theme/colors.ts`):
- Ink `#0A0A0A` / inkSoft `#141414` / inkMuted `#1E1E1E` (dark surfaces)
- Bone `#F2EFE6` / boneSoft `#E7E2D4` (light surfaces) · paper `#FFFFFF`
- Accents: **acid `#9CA3AF`** (primary) · **electric `#2E5BFF`** (secondary) · **blush `#FF6BB5`** (tertiary) · **ember `#FF5A1F`** (warning) · mute `#9C988A`
- Both light & dark themes defined (role-aware tokens: surface/text/hairline/accent…).

**Type** (`src/theme/typography.ts`): Display **Anton** + **Cabinet Grotesk Black/Extrabold** (stacked hero type, tight negative tracking). Body/editorial **Space Grotesk** (Regular/Medium/Bold). Modular scale ratio ≈1.25, 14px body base. Uppercase wide-tracked labels are a signature.

Brand guidelines PDF: `brand-guidelines/Underdawg-Brand-Guidelines-v1.0.pdf`.

---

## 11. Prompt-ready starter for personas & portal design

When you hand this to Claude, you can say:

> "Using `docs/BRAND_AGENCY_PORTAL_CONTEXT.md` as the product context, produce: (a) 3–4 detailed user personas for the Brand portal and 2–3 for the Agency portal — goals, frustrations, jobs-to-be-done, and the exact screens each needs; (b) the portal's information architecture / sitemap split by Brand vs Agency; (c) the priority of screens for an MVP that covers the deal lifecycle end-to-end (post job → review applicants → negotiate → contract → deliverables → escrow payout); (d) the new backend entities (Brand, Agency, Application list, Campaign, Invoice, Rating, currency) needed to close the §4 gaps, with fields and relationships. Keep the canonical status enums from §4 verbatim and match the design language in §10."

**Source files referenced:** spec `1775475366898-UNDERDAWG_CREATOR_APP_V2.md` · `USER_STORIES_EPICS.md` · `docs/mockups-backend.md` · data `src/data/mock.ts`, `src/data/people.ts` · store `src/store/index.ts` · deal flow `src/screens/modules/jobs/` · theme `src/theme/`.
