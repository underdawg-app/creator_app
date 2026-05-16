# Underdawgs — UI Audit (UI flow + UI items only)

**Scope:** UI flow, screen sequences, IA, components, copy/labels, visual tokens, and UX micro-flows.
**Out of scope:** auth, backend, payments, push, analytics, i18n, performance, tests — those live in [`PRODUCTION_AUDIT.md`](./PRODUCTION_AUDIT.md).

Compared against [`USER_STORIES_EPICS.md`](./USER_STORIES_EPICS.md). Date: 2026-05-11.

---

## 0. TL;DR (UI-only)

- **3 different UIs claim the same URL** (`underdawg.com/username`): LinkedIn-style portfolio (spec), Linktree-style block builder (app), in-app portfolio preview (app).
- **Onboarding flow has a fork the spec doesn't authorize** (creator vs business), then asks the spec's question on the next screen.
- **Step counter math is broken** — `STEP 01/05` on Auth and `STEP 04/05` on Identity, with the steps in between inconsistent.
- **Skip is a one-way exit** — spec says "resume from checklist." There's no checklist UI anywhere.
- **5 competing button primitives** (`TapBurst`, `Tap`, `PressableScale`, `MagneticButton`, raw `Pressable`) used interchangeably — celebratory burst loses meaning.
- **Toasts are the universal "I did something"** — used for destructive, financial, success, and error events alike.
- **EmptyState component exists but is never used.** No standard ErrorState/Loading component at all.
- **Same naming, different meaning:** Portfolio (3 places), Verification (2 things conflated), Rate Card (inverse direction from spec), Inbox (DM + deal negotiation collapsed).
- **No country picker.** Phone signup hard-coded to `+91`.

---

## 1. UI FLOW misalignments (screen sequence & IA)

| # | Where | Current | Spec / expected | Fix |
|---|---|---|---|---|
| F-1 | Onboarding sequence | Auth → **UserType (creator/business)** → CreatorType → Identity → Complete | Spec scope is "Creator/Artist Flow" only. US-1.8 is the **CreatorType** question. UserType (top-level role fork) is not authorized. | Remove `UserType.tsx`, OR build the Business branch and the spec stories for it. |
| F-2 | Step counter | `STEP 01/05` on Auth, `STEP 04/05` on Identity. Welcome/Splash uncounted. UserType + CreatorType not visibly numbered. | Shared, deterministic step indicator. | One `<StepBadge index total/>` component fed by a single source of truth. Audit step count to match actual stack length. |
| F-3 | Skip behavior | Skip on Identity → jumps to Complete. Skip on Auth (just added) → jumps to UserType. Both are one-way. | US-1.13: "Skip non-essential — resume later from checklist." | Build a Profile "completion checklist" surface; route Skip to a "mark step skipped + resume later" flow. |
| F-4 | `underdawg.com/username` UI | Three UIs in the same app: `AudienceLandingPage` (Linktree-style blocks) + `PortfolioPublicPreview` (in-app facsimile) + Profile screen content. | One canonical public profile UI. | Delete two of the three. Pick one model (LinkedIn-style grid per spec OR Linktree-style blocks). |
| F-5 | Platform-connections IA | Same screen reached two ways: from Audience module and from Settings menu. | Spec implies a Connection wizard (Epic 4) + a Settings list (US-16.8). | Two distinct surfaces, or one surface with a deduped entry path. |
| F-6 | Settings hierarchy | Settings index → Account / Notifications / Privacy / Security. No "Help", "Legal", "Block list", "Data export", "Deactivate", "Delete" — all spec items. | Spec lists 13 settings sub-areas (US-16.1–16.13). | Flesh out the Settings list to match the spec, even if some screens are stubs. |
| F-7 | Tabs nav | `Create` and `Inbox` are hidden tabs reached from the header. | Spec is silent, but inboxes are usually first-class tabs in spec X3. | Promote Inbox to a visible tab; route Create from a center FAB. |
| F-8 | Module headers | Each module rolls its own header (`ModuleHeader` is inconsistently applied). | Single header pattern across Modules. | Mandate `<ScreenFrame header={<ModuleHeader/>}>` on every module index. |
| F-9 | Verification flow | One linear 3-step checklist (email/phone/ID) advancing locally. | Spec splits into US-13.5 (Identity verification: ID + liveness) and US-13.7 (Blue check application). | Two flows: "Identity Verification" + "Apply for Blue Check". |
| F-10 | Studio compose flow | Compose → publish (toast). | US-5.7 requires a **Preview** step before publish. | Insert a Preview screen before Publish, with edit-back. |
| F-11 | Job apply flow | Pitch → Submit → toast. | US-7.8 requires a **Review & Submit** step with withdraw option. | Add a Review screen between Apply and Submit; allow Withdraw afterward. |
| F-12 | Payout / withdraw flow | Amount field → button → toast. | US-14.4–14.5 require: choose method → confirm → status tracker. | Add method picker → confirmation screen → status card with ETA. |
| F-13 | Merch create flow | Form → Publish (toast). | US-6.5 requires AI mockup step + US-6.9 margin calculator + US-6.11 publish target picker. | Insert mockup generation step, margin calculator block, publish-target row. |
| F-14 | Destructive actions | Disconnect platform / remove portfolio piece / delete account fire a toast. | US-3.4 / 4.4 / 16.13 require explicit confirm. | Use `Sheet` for destructive confirmations with destructive-styled CTA. |
| F-15 | Notification center | None. Only `Settings/Notifications` toggles 4 booleans. | US-15.1 requires a Notification Center route with unread count, grouping, deep-link, clear. | Add `/(modules)/notifications` route. |
| F-16 | Inbox tap action | Generic chat opens. | US-7.10 expects deal-negotiation thread with offer cards / counter-offers / terms summary. | Inbox thread should branch UI: generic vs deal-thread when bound to an active gig. |

---

## 2. UI TERMS / COPY misalignments

| # | Term | Spec uses it as | App uses it as | Conflict / fix |
|---|---|---|---|---|
| T-1 | **Portfolio** | LinkedIn-style public page (E2) + curated featured works (E3) | In-app Portfolio module + PortfolioPublicPreview + Profile content + AudienceLandingPage all reference it | 3-way overlap. Reserve "Portfolio" for E3 (in-app management) + "Public Profile" for E2. |
| T-2 | **Landing Page** | Not used | Linktree-style block builder | Spec silence + app concept. Either spec it or rename to "Public Profile" if it's meant to be E2. |
| T-3 | **Audience** | Not a top-level concept; lives inside E4/E12 | Top-level pillar with own module + slogans ("OWN the room") | Pillar invisible in spec. Either add to spec or remove the pillar framing. |
| T-4 | **Verification** | Two things: ID verification + Blue check | One conflated 3-step checklist | Split visually + textually into two flows. |
| T-5 | **Rate Card** | Market rate *for* a creator (US-7.5) — i.e. benchmark | Creator authors their *own* rate card | Either rename app's screen to "My Rates" or merge into negotiation tooling. |
| T-6 | **OPEN TO** | Spec text: "collab status (deals/collabs/management)" (US-2.6) | Profile.tsx uses "OPEN TO" tags | Acceptable alias but make it a configurable per-type toggle per spec. |
| T-7 | **Get Viral** | Featured gigs category (US-7.1) | Not surfaced anywhere in Jobs tab | Add a "Get Viral" feature row in Jobs index. |
| T-8 | **Drafts / Scheduled / Published** | Spec uses "draft" only | Studio uses three tabs | Acceptable expansion; document in spec. |
| T-9 | **OWNED vs RENTED audience** | Not used in spec | Strong UI framing on Audience screens | Either elevate to spec narrative or strip. |
| T-10 | **Skip** | Implies "resumable from checklist" | Bare `SKIP →` pill | Add helper text or rename: `Skip — finish later`. |
| T-11 | **Step 01 / 05** | Spec doesn't enumerate steps this way | Used inconsistently | Move to a single source of truth; ensure number = actual position in stack. |
| T-12 | Casing | Spec uses sentence case | App mixes ALL-CAPS labels (`STEP 01 / 05`, `PULL UP A CHAIR.`) with sentence-case bodies in unpredictable ways | One rule per typographic role (`label = caps`, `title/body = sentence`). Lock in `theme/typography.ts`. |
| T-13 | **AI Insights** | Spec scatters AI hints (4.8, 7.6, 12.6) | Standalone tab | Distribute insights into parent surfaces, or formally spec the dedicated tab. |
| T-14 | Hero copy ("pull up a chair", "get better, on purpose") | Spec is silent on tone/voice | Strong editorial voice | Add a voice & tone section to spec to make this intentional. |
| T-15 | **Inbox** | DMs (X3) + deal chat (7.10) — two products | Generic threaded chat | Visually distinguish thread types in list (badge: DM vs Deal vs Collab). |
| T-16 | Bio char limit | US-1.9 says "≤300 chars" | App's Identity screen has no counter | Add live counter `n/300`. |
| T-17 | Handle prefix | App uses `@solaroux` and `underdawgs.com/solaroux` mixed | Consistent prefix everywhere | Decide once: with @ for in-app, without @ for the public URL. |

---

## 3. UI COMPONENT / PRIMITIVE misalignments

| # | Component | Issue | Fix |
|---|---|---|---|
| K-1 | Buttons | 5 primitives in use (`TapBurst`, `Tap`, `PressableScale`, `MagneticButton`, raw `Pressable`). No variants doc. | Consolidate into one `<Button variant="primary|secondary|ghost|danger">` API. Keep TapBurst as `variant="celebratory"` for publish/payout/win only. |
| K-2 | Skip pill | Pattern duplicated between [`Identity.tsx`](./src/screens/onboarding/Identity.tsx) and [`Auth.tsx`](./src/screens/onboarding/Auth.tsx) | Promote to `<SkipPill onPress label="Skip" />`. |
| K-3 | Step badge | Inline styles in each onboarding screen | Promote to `<StepBadge index={1} total={5}/>`. |
| K-4 | EmptyState | `EmptyState` exists but is never used on lists (Drafts, Scheduled, Active Deals, Transactions, etc.) | Apply on every list/detail page. |
| K-5 | ErrorState | Does not exist | Add `<ErrorState message retry/>`. |
| K-6 | Loading | No standard component | Add `<Loading size="screen|inline"/>`. |
| K-7 | Field | `TextInput` used raw across Auth/Identity/JobsApply/Settings/Studio/Finance | Add `<Field label helper error required/>` with consistent focus/error styles. |
| K-8 | Country picker | Hard-coded `+91` in [Auth.tsx:202](./src/screens/onboarding/Auth.tsx#L202) | Add `<CountryPicker/>` with intl-tel-input pattern; detect from locale. |
| K-9 | Toast | Used for everything — success, error, destructive confirm, "I did something" placeholder | Reserve for transient system feedback. Use modal + receipt screen for financial/destructive actions. |
| K-10 | Sheet | `Sheet.tsx` exists; not used for destructive confirms | Use for confirmations (disconnect platform, remove portfolio piece, delete account). |
| K-11 | Section header | "Eyebrow + title" pattern applied inconsistently | Standardize via `<Section eyebrow title/>`. |
| K-12 | Card | Per-screen radius/padding/elevation choices | Define `<Card variant>` in theme. |
| K-13 | Chip | `Chip.tsx` exists; toggle vs select-only semantics not standardized | Add explicit `selected` vs `interactive` modes. |
| K-14 | KeyboardAvoidingView | Inconsistent — [`Identity.tsx`](./src/screens/onboarding/Identity.tsx) has it, [`Auth.tsx`](./src/screens/onboarding/Auth.tsx) does not | Wrap every form screen. |
| K-15 | SafeArea | Mixed — some use `SafeAreaView edges={['top']}`, some none | Wrap all screens with one `ScreenFrame`. |
| K-16 | Step indicator inside flows | Drafts/Schedule/Verification each draw their own progress | Promote to `<ProgressDots count current/>`. |
| K-17 | Bottom CTA / sticky buttons | Some forms put CTA at bottom of scroll, others inline | Define `<StickyCTA/>` slot for forms. |
| K-18 | Modal vs Sheet | No consistency on when to use which | Document: Sheet for context actions, Modal for full-screen flows. |

---

## 4. VISUAL TOKEN misalignments

| # | Token | Issue | Fix |
|---|---|---|---|
| V-1 | Colors | `palette.acid`/`electric`/`bone`/`ink` used without semantic mapping | Add semantic tokens: `success`, `warn`, `error`, `info`, `accent`. Lint against ad-hoc usage. |
| V-2 | Type scale | `displayBold` 78pt on Auth heading, 82pt on Identity, 56pt italic on others — sizes per-screen, not via scale | Define scale (e.g. `display-1` 82 / `display-2` 64 / `title` 32 / `body` 16 / `label` 12) and reference everywhere. |
| V-3 | Spacing | Padding values 22 / 24 / 28 / 36 used unpredictably | Define spacing tokens (`xs`/`sm`/`md`/`lg`/`xl`) and use them. |
| V-4 | Border radius | Pill `28` on primary button, `18` on skip, `24` on dial, `0` on inputs | Define `radius.xs/sm/md/full` and use them. |
| V-5 | HitSlop | Inconsistent (`hitSlop={12}` on some, none on others, missing on small icons) | Minimum `hitSlop={12}` on every interactive target <44pt. |
| V-6 | Contrast | `palette.mute` at 0.65 opacity may fail WCAG AA in some palettes | Run contrast check on every text token against every background token. |
| V-7 | Stroke width on SVG marks | `Asterisk` / `ArrowMark` use stroke 1.2 / 1.6 / 1.5 / 1.6 across screens | Pick one stroke per icon size. |
| V-8 | Casing in labels | Mixed (`STEP 01 / 05` vs `CONTINUE WITH PHONE` vs `Skip — finish later`) | Single rule per role; enforce. |
| V-9 | Letter spacing | `letterSpacing: -3.4` on Identity hero, `-3.2` on Auth, `-0.4` on phone input | Token: `tracking.tight/normal/wide`. |

---

## 5. UX MICRO-FLOW issues

| # | Where | Current | Expected | Fix |
|---|---|---|---|---|
| X-1 | Inline validation | Identity / Auth / Settings show errors only as toasts | Inline error under each field | Add `error` slot to `<Field/>`. |
| X-2 | Bio char counter | Missing | "n/300 chars" live | Add to Identity bio input. |
| X-3 | Handle uniqueness | No live check | Real-time green/red indicator | Add async validator stub (even if mock for now). |
| X-4 | OTP invalid code | Generic toast | Inline error + shake animation on input | Add error state inside OTP input. |
| X-5 | OTP resend cooldown | Visible | Spec demands 30s delivery / 3 retries | Surface retry count: "Resend 2/3". |
| X-6 | Publish preview | Missing | Spec US-5.7 demands preview before publish | Add Preview screen with edit-back. |
| X-7 | Withdraw confirm | Missing | Modal: "Withdraw ₹4,200 to ICICI ****1234?" | Add `Sheet` confirm + receipt screen. |
| X-8 | Apply review step | Missing | Spec US-7.8 demands review/submit/withdraw | Add Review screen between Apply and Submit. |
| X-9 | Disconnect confirm | Missing | Spec US-4.4 demands confirm | `Sheet` confirm. |
| X-10 | Remove portfolio piece | Missing confirm | Spec US-3.4 demands confirm | `Sheet` confirm. |
| X-11 | Hashtag suggester | Missing | Spec US-5.4 | Inline suggester chip row below caption. |
| X-12 | @Mention picker | Missing | Spec US-5.4 | Pop-up picker on `@`. |
| X-13 | Empty list rendering | Drafts/Schedule/Deals/Transactions render blank when empty | Use `EmptyState` w/ CTA | Apply across all list screens. |
| X-14 | Network error rendering | None | `ErrorState` with retry | Add `<ErrorState/>` to wrap async data screens. |
| X-15 | Form submit loading | Submit fires immediately + toast | Button spinner + disabled state during async | Add `loading` prop to Button. |
| X-16 | Success after submit | Toast | Receipt screen with details + share | Add Receipt screen variant per flow type. |
| X-17 | Profile completion % | Missing | Spec US-1.12 / US-3.6 | Progress bar on Profile + onboarding. |
| X-18 | Share profile sheet + QR | Missing | Spec US-2.9 | Add Share sheet with link/socials/QR. |
| X-19 | Last-synced timestamp on platform tile | Missing | Spec US-4.3 | Surface `lastSyncedAt` on each tile. |
| X-20 | Achievement / tier-change UX | Missing | Spec US-13.4 / US-13.8 | Add full-screen achievement modal with celebratory motion. |

---

## 6. Per-screen quick hits

### Onboarding
- **Splash.tsx** — over-animated; loses purpose. Consider trimming.
- **Welcome.tsx** — carousel exists but not replayable from Settings (US-1.15). Add replay entry.
- **Auth.tsx** — `+91` hard-coded (K-8); no `KeyboardAvoidingView` (K-14); no inline validation (X-1); subtitle promises privacy with no control nearby (T-10).
- **Otp.tsx** — no inline error (X-4), no retry counter (X-5).
- **UserType.tsx** — un-specced fork (F-1); business branch dead-ends.
- **CreatorType.tsx** — fine semantically; visually heavy; consider lighter cards.
- **Identity.tsx** — no bio counter (X-2), no handle uniqueness check (X-3), no avatar upload (spec wants it).
- **Complete.tsx** — confetti good; should also create the "Onboarding Checklist" surface for Skip-resumes (F-3).

### Tabs
- **Feed.tsx** — 1,071 LOC monolith. Split into sub-cards. Add `EmptyState` for empty FOR YOU / FOLLOWING / RISING.
- **Explore.tsx** — search has no autocomplete; trending list has no time range.
- **Profile.tsx** — 1,421 LOC; surfaces 3 different "portfolio" concepts (T-1). Show profile completion % (X-17). Add Share sheet (X-18).
- **Inbox.tsx** — generic; doesn't distinguish DM vs Deal vs Collab threads (T-15, F-16).

### Studio
- Composers have no live char counter (X-2), no hashtag/mention picker (X-11/X-12), no Preview step (X-6, F-10).
- Drafts/Schedule lists render blank when empty (X-13).

### Jobs
- Apply flow has no Review step (X-8, F-11).
- Active Deals shows status but no countdown (US-7.14 demands it).
- Rate Card naming clash with spec (T-5).
- No "Get Viral" featured row (T-7).

### Merch
- Create has no AI mockup step (F-13).
- No margin calculator block; no publish-target picker.

### Finance
- Withdraw has no method picker or confirmation (X-7, F-12).
- Transactions list has no filter/search/export UI (US-14.3).
- Invoice screen produces no PDF preview.

### Audience
- "Email List" UI is functional but rest of the app has no email-related affordance — it's an orphan surface (T-9).
- "Landing Page" claims `underdawgs.com/{handle}` URL — clashes with Profile preview (F-4).

### Reputation
- Verification conflates ID + Blue Check (F-9, T-4).
- Badges grid has no celebration when earned (X-20).

### Settings
- Many spec items missing as menu entries (F-6: block list, GDPR export, help, ToS, deactivate, delete).
- Notifications shows only 4 booleans (spec lists ~16 event types).

---

## 7. UI fix checklist (priority order)

### P0 — visible, painful, cheap

1. **Decide one model for `underdawg.com/username`** and delete the other two screens.
2. **Add country picker** to phone signup.
3. **Apply `EmptyState`** to every list (Drafts, Schedule, Deals, Transactions, Subscribers, etc.).
4. **Replace toasts on destructive/financial actions with `Sheet` confirm + receipt screen.**
5. **Promote `<Button>`, `<Field>`, `<StepBadge>`, `<SkipPill>`** to shared primitives; deprecate inline duplicates.
6. **Add `KeyboardAvoidingView`** to Auth + every form screen.
7. **Fix step counter** to be deterministic (`<StepBadge/>` from a single source).
8. **Inline form errors** on Auth/Identity/Otp/Settings.

### P1 — IA repairs

9. **Remove UserType fork** or build the Business branch.
10. **Build the Onboarding Checklist** screen so Skip can resume.
11. **Split Verification** into Identity Verification + Blue Check Application.
12. **Add Notification Center** route.
13. **Add Preview step** before publish in Studio.
14. **Add Review step** before submit in JobsApply.
15. **Add Share sheet + QR** on Profile.

### P2 — polish

16. **Profile completion %** bar on Profile and onboarding.
17. **Hashtag + @mention pickers** in composers.
18. **Bio char counter** + handle uniqueness check.
19. **OTP inline error + retry counter**.
20. **Semantic color tokens + typography scale lock-in**.
21. **Achievement modal** for badge/tier changes.

---

*UI-only audit, 2026-05-11. Backend/auth/perf/i18n/a11y findings live in [`PRODUCTION_AUDIT.md`](./PRODUCTION_AUDIT.md).*
