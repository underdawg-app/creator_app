# UNDERDAWG — Brand & Agency Web Portal
## Complete UI Specification (page-start → deep inside)

> **What this is.** The single, end-to-end UI document for the portal: **everything that will be built and every flow**, in the order a user experiences it — from the first public page, through sign-up and onboarding, into the full authenticated portal.
>
> **Scope (final).** Two account types only: **Brand** and **Agency** (Agency = *Management* or *Marketing*). **No Creator role, no Hirer role.** Creators use the existing mobile app, which shares the portal's backend, so discovery, applications, the deal loop, messaging and ratings all sync — but creators never sign up on the portal. "Commissions" exist as a **Brand job type**, not a separate account.
>
> **What's excluded.** No database schema, no data models, no API endpoints, no visual styling (colors, fonts, spacing). Layout is described functionally only — regions, sections, panels, lists, tables, drawers, columns. **Status stages and money rules stay in**, because they drive what the UI shows (kanban columns, status chips, enabled buttons, payment panels).

---

## Table of Contents
1. The three surfaces & who uses them
2. The complete journey (page-start → inside)
3. Full screen inventory (what will be built)
4. Shared UI building blocks (used everywhere)
5. PART A — Public marketing site (logged out)
6. PART B — Auth system
7. PART C — Onboarding
8. PART D — The authenticated portal (every module)
9. PART E — The key flows, step by step
10. Build / delivery order
11. Epics & user stories
12. Cross-cutting UI rules & edge cases

---

## 1. The three surfaces & who uses them

The product is three surfaces:

1. **Public marketing site** *(logged out)* — the front door: landing, For Brands / For Agencies, how-it-works, pricing, browse, about/trust, footer. Built for acquisition + SEO. **Part A.**
2. **Public creator profiles** *(logged out)* — `underdawg.com/username`, powered by the connected app's data (not portal accounts). **Part A.**
3. **Authenticated portal** *(logged in)* — dashboard and everything inward. **Part D.**

**Personas** (compact — they drive the screens):

| Persona | Type | Goal | Lives in |
|---|---|---|---|
| **Aarav** — growth marketer | Brand | Find authentic rising creators, run a measurable push | Discover · Jobs · ATS · Campaigns · Analytics |
| **Meera** — brand/social manager | Brand | Brand-safe coordinated launches, verified-human, `#ad` compliance | Campaigns · Vetting · Contracts · Analytics · Team |
| **Priya** — performance lead | Brand | De-risk and measure creator spend | Discover · Analytics · Ratings · Finance |
| *(Brand commissioner)* | Brand | Hire a specific creator for a brief via a commission job | Discover · Jobs (Commission) · Deal Workspace |
| **Rohan** — talent manager | Agency · Management | Sign & represent creators, negotiate on their behalf, track commission | Talent Discovery · Roster · Deal Desk · Commissions |
| **Sana** — agency lead | Agency · Marketing | Serve many brand clients from one vetted pool | Clients · Talent Pools · Campaigns · Reporting |
| **Dev** — account coordinator | Agency (either) | Move many deals/campaigns through the pipeline, scoped access | Pipeline · ATS · Deal Workspaces · Messages |

---

## 2. The complete journey (page-start → inside)

```
VISITOR LANDS on the public landing page (or a category page / a public creator profile / an ad)
   │
   ├─ Explores freely (logged out): browse creators, view profiles, read For Brands / For Agencies, pricing
   │
   ├─ Acts on something gated (post / contact / invite / rates) ──► prompted to SIGN UP or LOG IN
   │
   ├─ SIGN UP → choose role: BRAND or AGENCY  (Agency → choose Management or Marketing)
   │      → create account (email / Google / Apple) → CONFIRM EMAIL
   │      → "What brings you to Underdawg?" (intent)
   │      → ONBOARDING: welcome + setup meter → profile → phone → tax info → verification prompt
   │      → DASHBOARD (with a first-run checklist)
   │
   └─ INSIDE THE PORTAL — the core loop:
          DISCOVER creators ──► POST A JOB (wizard) ──► receive APPLICATIONS (ATS)
            ──► shortlist ──► NEGOTIATE ──► CONTRACT (e-sign) ──► DEAL ACTIVE
            ──► DELIVERABLES (review → approve / revise → go-live)
            ──► ESCROW released ──► PAID ──► RATE the creator
          (parallel: GET VIRAL campaigns · COMMISSION jobs · AGENCY roster/clients · FINANCE · ANALYTICS)
```

Returning user: Log in → resume onboarding if incomplete → else Dashboard. A logged-out user hitting a gated URL is sent to Log in and **redirected back** after auth.

---

## 3. Full screen inventory (what will be built)

**Public site (logged out)** — Landing · For Brands · For Agencies · How it works · Pricing · Discover/Browse · Public Creator Profile · About · Trust & Safety / Verified-Human · Resources/Blog · Contact · Enterprise · Legal · (logged-out header + footer).

**Auth** — Log in · SSO (Google/Apple) · Forgot/Reset password · Sign-up role select · Create account · Verify email · Agency subtype · (2FA in settings).

**Onboarding** — Brand: welcome/first-run · intent · company profile · phone verify · tax info · verification/KYC prompt. Agency: subtype confirm · agency profile · mode-specific first step · (shared phone/tax/verification).

**Authenticated portal**
- Shell: top bar · left nav (per account type) · drawers.
- **Dashboard** (Brand · Agency).
- **Discover**: Creator Directory · Creator Profile · Saved Lists.
- **Jobs**: Create/Edit Job (wizard) · Manage Listings · Job Detail.
- **Applicants (ATS)**: Pipeline · Applicant Detail · Compare.
- **Deal Workspace**: Overview · Negotiation · Contract · Deliverables · Payment/Escrow · Messages · Activity log.
- **Messages**: Inbox.
- **Ratings**: Leave a Rating · My Reviews.
- **Finance & Billing**: Escrow Ledger · Invoices · Transactions · Payment Methods.
- **Campaigns (Get Viral)**: Campaign List · Create Campaign (wizard) · Tracking · Campaign Analytics.
- **Analytics**: Performance Dashboard.
- **Settings**: Company/Agency Profile · Verification · Team & Permissions · Notifications · Billing.
- **Agency · Management**: Roster · Creator Client Dashboard · Talent Discovery · Representation · Deal Desk · Commissions.
- **Agency · Marketing**: Clients · Talent Pools · Multi-client Campaigns/Jobs · Multi-client ATS · Cross-client Reporting · White-label Settings.

---

## 4. Shared UI building blocks (used everywhere)

Build these once; reuse across all screens. (Behavior only.)

- **Status chip** — read-only stage indicator; one value from a defined set (deal stage, application status, delivery phase, escrow status, job status, contract status, campaign status).
- **Lifecycle stepper** — ordered stages of a deal/campaign with the current one highlighted; off-path states (Cancelled/Disputed) show a notice instead.
- **Kanban board** — columns by status with movable cards along **valid transitions only**; the Deals board columns: **Proposed** (Applied/Shortlisted/Negotiating/Contract) · **Active** (Active/In Review) · **Closed** (Completed).
- **Data table** — sortable, filterable, paginated, multi-select with bulk actions, row-click opens a detail drawer.
- **Filter bar** — combinable filters (multi-select chips, ranges, toggles, search); removable active-filter chips; persists per screen for the session.
- **Detail drawer (slide-over)** — right-side panel for detail/forms without losing the list; closes via button/overlay/Escape.
- **Form & validation** — inline validation, disabled submit until valid, error summary on failed submit, unsaved-changes warning; multi-step forms show step progress with back/next.
- **File upload** — drag-drop or browse; name, size, progress, remove; image preview; multiple files where relevant.
- **Money display** — always shows currency; payment summaries always show the breakdown (gross → platform fee → net; invoices add GST as a separate line).
- **Fit % indicator** — match score for a creator vs a selected job, with a tooltip on top factors.
- **Identity chip** — avatar/logo + name + (where relevant) verified badge, verified-human badge, tier, reputation.
- **Empty / loading / error states** — mandatory for every list and detail view; gated states (verification/permission) are a distinct empty-style state with an explanation.
- **Account-setup meter** — a completion % that fills as profile/verification steps complete (used in onboarding + dashboard).
- **Confirmation dialog** — for destructive/irreversible actions (reject, void, release payment, end representation, delete listing).
- **Toast / inline feedback** — success confirmations and recoverable errors; progress for long actions (contract, payout).
- **Notifications** — bell + unread count → panel of actionable items deep-linking to the right screen; realtime where possible.
- **Global search** — across creators, jobs, deals (and clients/roster for agencies); grouped results.

---

## 5. PART A — Public marketing site (logged out)

Format: **Purpose · Contents · Behavior/CTAs · States.**

### PUB-1 · Landing page (home)
- **Purpose:** Explain the value fast and funnel Brands/Agencies to sign-up.
- **Contents (top → bottom):**
  1. **Announcement bar** — one rotating value line tied to the thesis (discover verified-human talent early); dismissible; one CTA.
  2. **Header / nav** — see §5 footer/header note below (sticky; a search field appears on scroll).
  3. **Hero** — headline + subhead; a primary **"Hire creators / Get started"** CTA; a **brief/search bar** ("Describe the creative work or campaign you need…"); **quick category pills** (Illustration · Music · Design · Video · Photography). *(Optional small "Are you a creator? Get the app" link — marketing only, points to the app.)*
  4. **Social-proof strip** — "Trusted by [N] brands" + logos + a verified-human trust line.
  5. **Why Underdawg** — 3–4 value blocks: *Verified human creators* · *Rising talent before they're expensive* · *Safe end-to-end (contracts + escrow)* · *Get Viral coordinated campaigns*.
  6. **Discover by category** — grid of medium/niche cards → public browse.
  7. **How it works (Brands) — 3 steps** — Post a job (free) → Review verified applicants & shortlist → Pay via escrow on approval. CTA: *Post a job* (→ sign-up).
  8. **For Agencies band** — short pitch + CTA → For Agencies.
  9. **Get Viral band** — what coordinated campaigns are + CTA.
  10. **Pricing preview** — tier cards + *Compare plans* + *Get started free*.
  11. **Testimonials / case studies.**
  12. **Trust & awards** + link to the Verified-Human page.
  13. **Final CTA banner** — *Explore creators* / *Get started*.
  14. **Footer.**
- **Behavior:** every primary CTA leads to Discovery, sign-up, or (optional) the app link.

### PUB-2 · For Brands
- **Contents:** brand hero; problems solved (authentic talent, pre-fame pricing, ROI, compliance); how hiring works in plain language; **Get Viral** explained with tiers; the commission path (any follower size); pricing; testimonials.
- **CTA:** *Get started free* → sign-up (Brand).

### PUB-3 · For Agencies
- **Contents:** agency hero; **two tracks** clearly separated — *Management* (represent a roster, negotiate on creators' behalf, track commission) and *Marketing* (run campaigns for multiple brand clients, reusable vetted pools, cross-client reporting); team-seat pitch; pricing.
- **Behavior:** a toggle/two cards let the visitor self-identify; CTA carries the chosen mode into sign-up.

### PUB-4 · How it works
- **Contents:** the brand flow (post → applicants → shortlist → negotiate → contract → deliverables → escrow → review), each step described; the agency flows; what makes it safe (verified-human, escrow, contracts, disclosure). CTA → sign-up.

### PUB-5 · Pricing
- **Contents:** tier cards (**Brand Free** / **Brand Pro** / **Agency**) with feature lists; a **Compare plans** table; an FAQ (fees, escrow, GST, what verification unlocks).
- **Behavior:** each card CTA → sign-up with that plan preselected. Clearly states platform fee and escrow model in plain terms.

### PUB-6 · Discover / Browse (public)
- **Contents:** category/medium navigation; a filterable creator list (niche, medium, location, reputation, verified-human); result cards (identity, key stats, badges).
- **Behavior:** filters work logged out; opening a creator → Public Creator Profile. Any **action** (invite, contact, see rates) → prompt sign-up/login.
- **States:** empty (loosen filters), loading.

### PUB-7 · Public Creator Profile (`/username`)
- **Contents:** header (identity, badges, verified-human, tier, reputation); bio; stats; connected platforms + follower counts; portfolio grid; past brands & reviews; collaboration-status flags. **Contact info and rates are gated** ("sign in as a verified brand to view").
- **Behavior:** viewable logged out except gated fields; shareable/indexable; powered by the connected app's data. CTAs (*Work with me / Invite to job*, *Message*) → prompt sign-up/login.

### PUB-8 · About · PUB-9 · Trust & Safety / Verified-Human · PUB-10 · Resources/Blog · PUB-11 · Enterprise · PUB-12 · Contact · PUB-13 · Legal
- **About:** mission (early-discovery, verified-human thesis), team/press, careers/contact links.
- **Trust & Safety / Verified-Human:** what "verified human" means and how it's checked; brand-safety + `#ad` disclosure; escrow/dispute protection; privacy basics.
- **Resources/Blog:** SEO + education (campaign guides, commission guides, India GST/TDS/ASCI disclosure).
- **Enterprise:** larger-brand pitch + lead form. **Contact:** support/sales routes. **Legal:** Terms, Privacy, GST/Tax info, Accessibility, Sitemap.

### Header & footer (logged out)
- **Header:** logo · primary nav (For Brands · For Agencies · How it works · Pricing · Discover) · **Log in** · **Sign up**; sticky on scroll with a search field.
- **Footer columns:** **For Brands** (How to hire · Browse creators · Post a job · Get Viral · Commission work · Pricing · Enterprise) · **For Agencies** (How it works · Manage talent · Run client campaigns · Pricing) · **Company** (About · Careers · Press · Contact · Blog) · **Trust & Legal** (Trust & Safety · Verified-Human · Terms · Privacy · GST/Tax info · Accessibility · Sitemap) · social icons · *(optional "Creators → Get the app" link)* · © line.

---

## 6. PART B — Auth system

### AUTH-1 · Log in
- **Contents:** email/username → **Continue**; "or"; **Continue with Google**; **Continue with Apple**; **Forgot password?**; "Don't have an account? **Sign up**."
- **Behavior:** on success → intended destination or Dashboard; incomplete onboarding → resume.
- **States:** invalid credentials; unverified email (prompt to verify); SSO error.

### AUTH-2 · Forgot / Reset password
- **Flow:** enter email → "reset link sent" → reset screen (new password) → Log in. Unknown email handled without leaking existence; expired link → resend.

### AUTH-3 · Sign-up — Role
- **Contents:** **I'm a Brand** · **I'm an Agency**. *(No Creator option; an optional "I'm a creator → get the app" link sits outside the role choice.)*
- **Behavior:** Brand → AUTH-4; Agency → AUTH-6 then AUTH-4.

### AUTH-4 · Create account
- **Contents:** email + password (or Google/Apple); accept Terms & Privacy; plan preselected if arriving from Pricing.
- **Behavior:** on submit → send verification email → AUTH-5.
- **States:** email in use (offer log in); weak password; terms not accepted.

### AUTH-5 · Verify email
- **Contents:** "check your inbox," resend, change-email.
- **Behavior:** on verification → onboarding.

### AUTH-6 · Agency subtype
- **Contents:** **Management** vs **Marketing** (one-line each).
- **Behavior:** carries the mode into onboarding and shapes portal nav.

### AUTH-7 · Session & redirect rules
- Logged-out user opening a gated URL → AUTH-1, then **redirect back**.
- Logged-in user with incomplete onboarding → resume onboarding before the portal.
- Sign-out → public landing page. (2FA setup lives in Settings as an optional prompt.)

---

## 7. PART C — Onboarding

A short guided wizard between account creation and the dashboard, with a setup meter and save-progress.

### Brand onboarding
1. **Welcome / first-run** — "Welcome, [name]! Let's get you set up"; **recommended-action cards** (Complete company profile · Browse creators · Post your first job · Get verified) + **setup meter**.
2. **"What brings you to Underdawg?"** *(intent)* — Hire for a campaign · Commission specific creative work · Run a Get Viral campaign · Just exploring (tailors first-run).
3. **Company profile** — name, legal name, logo, industry, website, location.
4. **Phone verification.**
5. **Tax / identity info** — GSTIN/PAN (India) or tax ID (intl); required before first payout, prompted early.
6. **Verification / KYC prompt** — explains unlocks (contact/rates marked "Verified Brands Only," posting, Get Viral, the Verified-Brand badge); **Verify now** or **Skip** (gated actions stay disabled until verified).
7. **→ Dashboard** with the first-run checklist.
- **Rules:** posting a job needs email-confirmed + verified; paying needs tax info + a payment method.

### Agency onboarding
1. **Welcome / first-run** — cards differ by mode (*Management:* Complete profile · Discover talent to represent · Send a representation request · Get verified. *Marketing:* Complete profile · Add a first client · Build a talent pool · Post a campaign · Get verified).
2. **Subtype confirmation** (from AUTH-6).
3. **Agency profile** — name, logo, specialties; *Management* adds a commission rate.
4. **Mode-specific first step** — *Management:* roster intent. *Marketing:* add a first client/workspace.
5. **Phone + tax/identity + verification** — same gates as Brand.
6. **→ Agency Dashboard.**

---

## 8. PART D — The authenticated portal (every module)

### Shell
- **Top bar:** workspace switcher (for agencies: own workspace + per-client (Marketing) or per-creator client dashboards (Management)) · global search · notifications · messages · profile menu.
- **Left nav (per account type):**
  - **Brand:** Dashboard · Discover · Jobs · Applicants · Deals · Campaigns · Messages · Finance · Analytics · Settings.
  - **Agency · Management:** Dashboard · Roster · Talent Discovery · Representation · Deal Desk · Commissions · Messages · Settings.
  - **Agency · Marketing:** Dashboard · Clients · Talent Pools · Campaigns · Jobs · Applicants · Reporting · Messages · Billing · Settings.
- **Gating:** nav items and actions render per the member's permissions (Owner/Manager/Assistant/Editor) and verification status — gated items are hidden (nav) or disabled with an explanation (in-context).

Format per screen: **Purpose · Contents · Actions/behavior · States · Leads to.**

### Dashboard
**D-Brand** — Purpose: home base. Contents: action-items list (sign contract, review deliverable, release payment, respond to applicant, new applicants); deals kanban (Proposed/Active/Closed); spend & escrow-held snapshot; active campaigns; recent activity; verification banner if unverified; first-run checklist until complete. Leads to: any workspace.
**D-Agency** — Management: roster health, deals in flight, commission due. Marketing: clients, campaigns per client, aggregate performance. Workspace switcher re-scopes.

### Discover
**DSC-1 Creator Directory** — filterable list (niche, follower range, location, rate range, collaboration status, reputation, verified-human, tier); result cards with fit % vs a target job; add-to-shortlist; sort. Respects gating for restricted info. Leads to: profile, lists, invite-to-job.
**DSC-2 Creator Profile** — full evaluation (identity, badges, tier, reputation breakdown, bio, stats, platforms, portfolio, rates [visibility-gated], past brands, reviews, collaboration flags). Actions: Invite to Job / Work With Me, Add to List, (Management) Send Representation Request, Message.
**DSC-3 Saved Lists** — create/rename/delete lists; add/remove; bulk invite / add-to-campaign; (agency) convert to Talent Pool.

### Jobs
**JOB-1 Create/Edit Job (wizard)** — see the full step sequence in §9 (Flow 1). Save as Draft; Publish (requires verification + completeness) → Live; live preview of how creators see it.
**JOB-2 Manage Listings** — table of jobs by status (Draft/Live/Closed/Filled) + applicant counts; Edit/Close/Duplicate/Delete; realtime counts. Leads to: ATS.
**JOB-3 Job Detail** — read the brief; status & metrics; jump to applicants.

### Applicants (ATS)
**ATS-1 Applicant Pipeline** (per job) — columns by application status (Applied/Shortlisted/Rejected/Withdrawn); applicant cards (identity, pitch excerpt, rate, timeline, reputation, fit %); move along valid transitions; bulk shortlist/reject; sort. Actions: Shortlist, Reject (reason → notifies creator), Send Response, Open Detail, Compare, **Accept** (→ Deal).
**ATS-2 Applicant Detail (drawer)** — full pitch, portfolio, reputation breakdown, fit % explanation, respond; actions Shortlist/Reject/Respond/Accept.
**ATS-3 Compare** — 2–3 applicants side by side across comparable rows; act from the comparison.

### Deal Workspace
A workspace per deal with a **lifecycle stepper** header; sections enable as the deal progresses.
**DW-0 Overview** — stepper (Applied → … → Completed); summary (creator, job, amount + currency, current stage, next action); section links; Cancel deal; Raise dispute.
**DW-1 Negotiation** — deal-channel chat + structured counter-offers (rate/deliverables/timeline/usage); current proposed-terms summary; "Accept terms" → Contract.
**DW-2 Contract** — generate from the 9 standard terms (Parties · Rate · Payment terms · Deliverables · Timeline · Usage rights · Exclusivity · Content ownership · Revisions); clause view; e-sign; request changes (→ countered); both sign → Executed, deal → Active, escrow funding triggers; view/download document.
**DW-3 Deliverables** — brand brief + asset uploads; submissions on the delivery phase (Submit → In Review → Revision → Approved → Go Live); Approve / Request Revision (notes; respects included-revision count); confirm go-live link; **`#ad` disclosure check before approving Get Viral deliverables**.
**DW-4 Payment / Escrow** — escrow status (Pending → Processing → Paid); breakdown (gross → platform fee 12% → net); staged-payment view if terms say so; **Release** (enabled only when a deliverable is Approved + go-live confirmed); invoice access (GST 18% separate line); TDS note (India).
**DW-5 Messages** — the deal-channel thread embedded. **DW-6 Activity log** — chronological record of every state change/action.

### Messages
**MSG-1 Inbox** — thread list filterable by type (Deal · Request); unread/verified/typing/archived indicators; deal threads link to their Deal; realtime; reply, archive, jump to deal.

### Ratings
**RAT-1 Leave a Rating** — after Completed: five dimensions (overall, communication, timeliness, content quality, professionalism) + written review + "Would work again"; feeds the creator's reputation. **RAT-2 My Reviews** — ratings given; read-only once submitted.

### Finance & Billing
**FIN-1 Escrow Ledger** — holds with status + related deal + gross/fee/net + release dates. **FIN-2 Invoices** — list by status (Draft/Issued/Paid/Void); detail shows line items, subtotal, GST (18%), total, currency; download; TDS note. **FIN-3 Transactions** — full ledger filtered by type/direction/status. **FIN-4 Payment Methods** — manage payout/payment methods (India + intl); shown only to members with "view financials."

### Campaigns (Get Viral)
**CMP-1 Campaign List** — table by status (Draft/Inviting/Active/Live/Completed) + tier + window + slots filled + progress. **CMP-2 Create Campaign (wizard)** — see §9 (Flow 2). **CMP-3 Tracking** — per-slot status + campaign lifecycle. **CMP-4 Campaign Analytics** — reach, impressions, engagement, clicks, conversions; per-creator contribution.

### Analytics
**ANL-1 Performance Dashboard** — summary metrics, trends, breakdowns by creator/campaign/period, comparison, export; gated without analytics permission.

### Settings & Team
**SET-1 Company/Agency Profile** · **SET-2 Verification** (status + resubmit) · **SET-3 Team & Permissions** (list members; invite by email; assign role Owner/Manager/Assistant/Editor + permission set: view analytics · reply to messages · accept/sign deals · post jobs/campaigns · edit profile · view financials · manage campaigns; edit/revoke; pending invites; applies immediately) · **SET-4 Notifications** · **SET-5 Billing** (Owners only).

### Agency · Management
**AGM-1 Roster** — represented creators with status, performance, commission due. **AGM-2 Creator Client Dashboard** — per-creator view (gated by granted permissions) of their deals/performance/earnings. **AGM-3 Talent Discovery** — discovery oriented to representation; primary action Send Representation Request. **AGM-4 Representation** — requests in/out (Requested/Active/Ended), standard agreements, start/end. **AGM-5 Deal Desk** — pipeline of deals run on behalf of roster creators (same Deal Workspace, as representative). **AGM-6 Commissions** — reconciliation of the agency's cut across completed deals.

### Agency · Marketing
**AGK-1 Clients** — manage brand clients; each opens a per-client workspace re-scoping Jobs/Campaigns/Deals/ATS. **AGK-2 Talent Pools** — reusable vetted lists; build once, reuse per client. **AGK-3 Multi-client Campaigns/Jobs** — campaign/job tools scoped per client via the workspace switcher. **AGK-4 Multi-client ATS** — applicant triage across clients, filterable by client. **AGK-5 Cross-client Reporting** — performance aggregated by client and overall. **AGK-6 White-label Settings** — client-facing branding/access where offered.

---

## 9. PART E — The key flows, step by step

Every wizard step has **Back / Next**, **Save & exit** (Draft), and a **progress indicator**.

### Flow 1 · Post a Job (Brand) — the core
- **Entry:** "Post a job" from dashboard/nav/empty state. *Optional:* AI-assist start ("Describe what you need and we'll draft the brief").
- **Step 1 · Start the brief** — title + "Describe what you need" + optional reference upload.
- **Step 2 · Job type** — Sponsored Post · Story/Reel · Video Integration · Brand Ambassador · Product Review · Event Coverage · UGC Creation · Affiliate · Account Takeover · **Get Viral Campaign** · **Commission** · Custom. *(Get Viral → Flow 2; Commission → continue with commission framing or Flow 3.)*
- **Step 3 · Medium & niche** — Visual Art · Illustration · Music · Design · Video · Photography · Writing · etc. + niche tags.
- **Step 4 · Scope & timeline** — one-off / short / ongoing (ambassador retainer) + deadline.
- **Step 5 · Creator requirements** — min followers (optional, or "Any — judge on craft" for commissions), location, **Verified-Human required (toggle)**, min tier/reputation, language/region (India vernacular).
- **Step 6 · Deliverables** — list deliverables + revisions included (default 2).
- **Step 7 · Budget** — Flat / Per post / Affiliate %; amount range + currency (INR default); transparent market-rate hint.
- **Step 8 · Usage & terms** — usage rights (default "Organic, 90 days"), exclusivity (default "No competing brand, 30 days"), ownership (default "Creator retains, brand licensed"), **disclosure (#ad) auto-on for paid jobs**.
- **Step 9 · Review & post** — full summary, edit any step, **Post this job** (requires email-confirmed + verified) → Live.
- **Step 10 · "What happens after you post?" modal** — verified applicants → shortlist → contract → escrow → deliverables → pay on approval. CTA: View job / Browse creators.
- **After:** applications arrive → ATS + Deal lifecycle take over.

### Flow 2 · Create a Get Viral campaign
1. **Tier** — Spark / Wave / Storm / Takeover (each shows price range, expected creator count, target reach).
2. **Brief & window** — brief, goals, start/end; **mandatory #ad/#paidcollab disclosure + ASCI note**.
3. **Creator selection (slots)** — fill from Discovery / lists / (agency) pool / roster; **Verified-Human filter on**; slots filled vs tier target.
4. **Budget & terms** — total budget + currency; per-slot payout; usage/exclusivity.
5. **Review & launch** — requires verification; Launch → Draft → Inviting.
6. **→ Tracking** (per-slot status + campaign lifecycle).

### Flow 3 · Commission a specific creator (a Brand job type)
1. **Brief** — what you need (style, medium, references); creator preselected if launched from a profile.
2. **Scope & deliverables** — format, quantity, revisions; deadline.
3. **Usage license** — Personal / Monetized / Commercial-merch (standardized rights).
4. **Budget & milestones** — fixed or milestones; **escrow funded on acceptance**; platform fee + GST shown.
5. **Review & send** → commission request → Deal lifecycle. *(Can target any tier, including sub-5k.)*

### Flow 4 · Deal lifecycle (after a job/commission/campaign engages a creator)
`Applied → Shortlisted → Negotiating → Contract → Active → In Review → Completed` (off-path: Cancelled, Disputed), with the delivery phase `Submit → In Review → Revision → Approved → Go Live` and escrow `Pending → Processing → Paid` inside it. Driven through the Deal Workspace (DW-0…DW-6).

### Flow 5 · Escrow & payout
Fund on contract execution → hold → release only when a deliverable is Approved + go-live confirmed → Paid; breakdown gross → 12% fee → net; invoice with GST 18% (separate line) + TDS note. Appears in the Finance ledger; deal → Completed.

### Flow 6 · Rate the creator
After Completed → prompt to rate (five dimensions + review + would-work-again) → feeds reputation and "Brand Favorite" eligibility.

### Flow 7 · Agency posting
- **Marketing:** pick the client workspace first → run Flow 1 or 2 **on behalf of that client**; multi-client ATS aggregates.
- **Management:** pitch/negotiate a deal **on behalf of a roster creator** via the Deal lifecycle as representative; commission tracked.

### Flow 8 · Team seat invite & permissions
Owner/Manager invites by email → assign role + permission set → invitee accepts → access applied across the portal per the grid.

---

## 10. Build / delivery order

1. **Shell + shared building blocks** (§4) — top bar, nav, drawers, tables, kanban, status chips, forms, file upload, money display, empty/loading/error.
2. **Public header + footer + routing skeleton.**
3. **Auth** — Log in + Google/Apple + password reset + sign-up role select (Brand/Agency) + create account + verify email + agency subtype.
4. **Onboarding** — Brand first, then Agency — into the dashboard.
5. **Discover + Creator Profile + Saved Lists.**
6. **Jobs (Create wizard + Manage + Detail).**
7. **ATS (Pipeline + Detail + Compare).**
8. **Deal Workspace (Overview → Negotiation → Contract → Deliverables → Payment) + Messages.**
9. **Ratings + Finance + Dashboard + Settings/Team.**
10. **Landing page + For Brands / For Agencies / How it works / Pricing.**
11. **Discover/Browse + Public Creator Profile (SEO).**
12. **Campaigns (Get Viral) + Campaign Analytics + Analytics.**
13. **Agency · Management.**
14. **Agency · Marketing.**
15. **About / Trust & Safety / Resources / Contact / Enterprise / Legal.**

First usable milestone: after step 9 a verified brand can complete the entire hiring loop end to end.

---

## 11. Epics & user stories

Format: **As a [persona], I want [capability], so that [outcome]** + acceptance criteria (AC).

**EPIC 1 — Public site & acquisition**
- 1.1 As a Visitor, I want a landing page that explains what Underdawg does and for whom, so that I can decide if it fits. AC: hero + value/how-it-works/pricing/trust/footer; clear next action per section.
- 1.2 As Aarav, I want a For Brands page (hiring, Get Viral, commissions), so that I understand the offer before signing up. AC: brand problems/solutions, Get Viral tiers, commission path, pricing, sign-up CTA.
- 1.3 As Sana/Rohan, I want a For Agencies page distinguishing Management vs Marketing, so that I see the right offering. AC: both modes distinct; CTA carries mode into sign-up.

**EPIC 2 — Discovery & public profiles**
- 2.1 As a Visitor, I want to browse and filter creators without an account, so that I can evaluate supply. AC: filters/cards work logged out; verified-human badge shown.
- 2.2 As a Visitor, I want to view a creator's public profile, so that I can assess their work. AC: viewable logged out; contact/rates gated; shareable; data from the connected app.
- 2.3 As a Brand, I want any hire/contact action to prompt sign-up, so that I can act on a creator. AC: invite/contact/rates → sign-up/login then return.

**EPIC 3 — Auth & SSO**
- 3.1 As a returning user, I want email/Google/Apple login, so that access is fast. AC: routes to destination/dashboard; unverified email handled.
- 3.2 As a user, I want password reset, so that I can recover access. AC: request → link → reset → login; no existence leak; expired link resendable.
- 3.3 As a logged-out user hitting a gated link, I want to be sent to login and back, so that I don't lose my place. AC: redirect to login then back.

**EPIC 4 — Role sign-up & onboarding**
- 4.1 As a Visitor, I want to pick Brand or Agency at sign-up, so that the product fits me. AC: role step (Brand/Agency only); Agency picks subtype.
- 4.2 As a new brand, I want guided onboarding (intent → profile → phone → tax → verification) with a setup meter, so that I'm ready to hire. AC: steps + meter + first-run checklist; posting needs verification; paying needs tax info + method; progress saved.
- 4.3 As a new agency, I want onboarding tailored to my mode, so that my first step matches how I work. AC: subtype confirm → profile → mode-specific first step → verification → dashboard.

**EPIC 5 — Jobs & posting**
- 5.1 As Aarav, I want a step-by-step job-posting wizard, so that I can post a complete brief easily. AC: the 10-step Flow 1; save-as-draft + progress; "what happens after you post" modal.
- 5.2 As a brand, I want to manage my listings, so that I can edit/close/duplicate. AC: status filters; close stops applications; realtime counts.
- 5.3 As a commissioner-brand, I want a commission job type, so that I can hire a specific creator for a brief at any follower size. AC: Flow 3; usage license + escrow; sub-5k allowed.

**EPIC 6 — Applicant tracking (ATS)**
- 6.1 As a brand, I want all applicants with pitch/rate/timeline/portfolio/reputation, so that I can triage. AC: pipeline by status; fit %.
- 6.2 As a brand, I want to shortlist/reject/respond, so that I can narrow the field. AC: valid transitions; reject reason; creator notified.
- 6.3 As a brand, I want to compare and accept, so that I choose confidently. AC: 2–3 side by side; accept → deal.
- 6.4 As Dev, I want bulk triage, so that I keep pipelines moving. AC: multi-select bulk actions; sort.

**EPIC 7 — Negotiation & contracting**
- 7.1 As a brand, I want to negotiate terms in one place, so that they're agreed clearly. AC: chat + structured offers; accept → contract.
- 7.2 As a brand, I want to generate and e-sign a contract, so that the deal is binding. AC: 9 terms; both sign → Active; request-changes loop; stored/downloadable.

**EPIC 8 — Deliverables & review**
- 8.1 As a brand, I want to brief and review submissions, so that I control quality. AC: brief/assets; delivery phases; approve/request-revision respecting revision count.
- 8.2 As a brand, I want to confirm the go-live link before payment, so that delivery is verified. AC: go-live captured/confirmed.
- 8.3 As Meera, I want disclosure enforced on Get Viral deliverables, so that campaigns stay compliant. AC: `#ad` check before approval.

**EPIC 9 — Escrow, payments & invoicing**
- 9.1 As a brand, I want funds held until approval, so that both sides are protected. AC: fund on execution; release blocked until approved + go-live.
- 9.2 As a brand, I want the gross/fee/net breakdown, so that costs are transparent. AC: gross + 12% fee + net + currency.
- 9.3 As Priya, I want GST-correct invoices + TDS note, so that finance/compliance is satisfied. AC: GST 18% separate line; TDS note; downloadable.

**EPIC 10 — Messaging, ratings, dashboard, analytics**
- 10.1 As a brand, I want a single inbox for deal/outreach threads, so that I don't lose conversations. AC: grouped/filterable; unread; realtime; deal threads link to deals.
- 10.2 As a brand, I want to rate creators after completion, so that reliability is tracked. AC: five dimensions + would-work-again after Completed; feeds reputation.
- 10.3 As a brand, I want a dashboard of pipeline + action items, so that I know what's next. AC: kanban + action items + money snapshot.
- 10.4 As Priya, I want partnership/campaign analytics, so that I can measure and defend spend. AC: metrics/trends/breakdowns + export + comparison.

**EPIC 11 — Team seats & permissions**
- 11.1 As an Owner, I want to invite members with roles/permissions, so that the right people get the right access. AC: invite + role + permission set; applies immediately.
- 11.2 As Dev, I want to see only what my permissions allow, so that I work in scope. AC: nav hidden/actions disabled without permission; financials hidden without that permission.

**EPIC 12 — Get Viral campaigns & analytics**
- 12.1 As a brand, I want a tiered campaign wizard with slots and mandatory disclosure, so that I can launch a compliant coordinated campaign. AC: Flow 2; verified-human filter; disclosure + verification required.
- 12.2 As a brand, I want campaign reach/engagement/conversion metrics, so that I can judge ROI. AC: reach/impressions/engagement/clicks/conversions + per-creator contribution.

**EPIC 13 — Agency (Management)**
- 13.1 As Rohan, I want to discover and request to represent creators, so that I can grow my roster. AC: representation requests (Requested→Active→Ended) + standard agreement.
- 13.2 As Rohan, I want a client dashboard per creator and deals run on their behalf, so that I manage careers and track commission. AC: gated client view; Deal Desk as representative; commission reconciliation.

**EPIC 14 — Agency (Marketing)**
- 14.1 As Sana, I want per-client workspaces and reusable talent pools, so that work stays organized and I don't re-vet. AC: clients re-scope the portal; pools reusable per client.
- 14.2 As Sana, I want multi-client campaigns/ATS and cross-client reporting, so that I serve many clients and report per client. AC: per-client posting; ATS filterable by client; aggregated reporting; white-label options.

---

## 12. Cross-cutting UI rules & edge cases

- **Invalid stage transitions** are prevented at the UI level and explained when blocked.
- **Cancelled / Disputed deals** replace the stepper with a notice and disable forward actions; disputes are logged in the activity log.
- **Verification- and permission-gated** controls are never silently missing in-context — disabled with an explanation (in-context) or removed from nav.
- **Payment release is hard-blocked** until a deliverable is Approved + the go-live link is confirmed.
- **Get Viral approval is hard-blocked** until the `#ad` disclosure check passes.
- **Unsaved changes** prompt before navigating away; wizards auto-save Drafts.
- **Realtime counters** (unread, new applicants, notifications) update without manual refresh.
- **Empty / loading / error** states are mandatory everywhere; gated states are a distinct empty-style state.
- **Currency is always shown** with money; payment panels always show the full breakdown.
- **Workspace context** (active client/creator/agency workspace) is always visible and re-scopes everything.
- **Activity logs** record every state change/action on a deal/campaign.
- **Creators are never portal accounts** — their data comes from the connected app; the portal only ever shows, hires, messages, and rates them.

*— End of complete UI specification —*
