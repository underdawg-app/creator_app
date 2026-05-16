# UNDERDAWG — User Stories & Epics

**Scope:** Creator/Artist Flow (covers PROJECT_SPEC.md + UNDERDAWG_CREATOR_FLOW_COMPLETE.md)
**Roles:** Creator (C), Brand (B), Manager (M), Fan (F), Admin (A)
**Story format:** ID | As a [role], I want [action], so that [benefit] | AC = acceptance criteria

---

## EPIC 1 — Onboarding & Identity

**Goal:** New user signs up and reaches a usable profile in <5 min.

| ID | Story | AC |
|----|-------|----|
| US-1.1 | As C, sign up via email/password | Email validated, password ≥8 chars, verification email sent |
| US-1.2 | As C, sign up via Google OAuth | OAuth success creates account, no duplicate email |
| US-1.3 | As C, sign up via Apple Sign-In | Apple ID linked, anonymized email supported |
| US-1.4 | As C, sign up via phone OTP | OTP delivered <30s, 6-digit code, 3 retries |
| US-1.5 | As C, log in with email/social/phone | Session persists across devices |
| US-1.6 | As C, reset forgotten password | Reset link expires in 1hr, single use |
| US-1.7 | As C, log out from one or all devices | Session tokens revoked immediately |
| US-1.8 | As C, pick primary creator type (artist/musician/etc.) | Required field, single select P0, multi-select P1 |
| US-1.9 | As C, set name, username, bio, photo | Username unique check real-time, bio ≤300 chars |
| US-1.10 | As C, pick niche, skills, interest tags | Min 1 niche, ≥3 skills suggested |
| US-1.11 | As C, set location (city/country) | Optional, autocomplete |
| US-1.12 | As C, see onboarding progress % | Updates live as steps complete |
| US-1.13 | As C, skip non-essential steps | Resume later from checklist |
| US-1.14 | As C, grant push notification permission | OS prompt shown after first publish |
| US-1.15 | As C, see welcome tutorial | Dismissable, replayable from settings |

**Edge cases:** username taken, OAuth denied, OTP timeout, duplicate email across providers, network drop mid-signup.

---

## EPIC 2 — Public Portfolio Link (`underdawg.com/username`)

**Goal:** Shareable LinkedIn-style page, no login needed.

| ID | Story | AC |
|----|-------|----|
| US-2.1 | As F, view creator portfolio at clean URL | SEO-friendly, mobile-responsive, <2s load |
| US-2.2 | As C, display cover, photo, name, verified badge, type | All editable in-app |
| US-2.3 | As C, show bio + follower/following/reputation stats | Stats refresh on page load |
| US-2.4 | As C, show portfolio grid (6-12 featured works) | Image/video/audio thumbnails, click to expand |
| US-2.5 | As C, list connected platforms with follower counts | Direct link out, total cross-platform shown |
| US-2.6 | As C, display collab status (deals/collabs/management) | Toggle per type |
| US-2.7 | As C, show optional rates, services, past brands | Hideable per privacy settings |
| US-2.8 | As F, click Follow / Message / Work-With-Me CTAs | Message + Follow require login, Work-With-Me opens inquiry form |
| US-2.9 | As F, share profile (link, socials, QR) | OG image + Twitter card auto-generated |
| US-2.10 | As C, see portfolio analytics (views, sources, geo, time-on-page) | 7d/30d/90d range |
| US-2.11 | As F, see merch store link, upcoming events, press | Sections hide when empty |

**Edge cases:** username changed (301 redirect), private profile, deleted account (410), banned creator.

---

## EPIC 3 — In-App Profile & Portfolio Management

**Goal:** Creator edits everything from app.

| ID | Story | AC |
|----|-------|----|
| US-3.1 | As C, edit photo/cover/name/bio/location/type/skills | Changes live <5s |
| US-3.2 | As C, change username (with availability check) | Old URL redirects 30 days |
| US-3.3 | As C, select 6-12 featured works for portfolio | Drag-drop reorder |
| US-3.4 | As C, add/remove content from portfolio | Confirm on remove |
| US-3.5 | As C, preview public profile view | Renders exact public page |
| US-3.6 | As C, see profile completion % + missing items | Prompts to complete |
| US-3.7 | As C, toggle profile public/private | Private hides from search/feed |
| US-3.8 | As C, hide stats / hide rates per privacy setting | Per-field control |

**Edge cases:** username change while portfolio links shared externally.

---

## EPIC 4 — External Platform Connections

**Goal:** Unified audience across IG/YT/TikTok/etc.

| ID | Story | AC |
|----|-------|----|
| US-4.1 | As C, connect Instagram/YouTube/TikTok via OAuth | Permissions explicit, revocable |
| US-4.2 | As C, connect Twitter, Spotify, SoundCloud, Twitch, LinkedIn, Pinterest, Behance, Dribbble | Per-platform OAuth flows |
| US-4.3 | As C, see connection status (Connected/Disconnected/Error) | Last-synced timestamp shown |
| US-4.4 | As C, disconnect or reconnect platform | Confirm on disconnect |
| US-4.5 | As C, see follower count auto-synced daily | Manual refresh button |
| US-4.6 | As C, see total cross-platform followers + per-platform breakdown | Bar/pie chart |
| US-4.7 | As C, track platform follower growth over time | 7d/30d/90d trend |
| US-4.8 | As C, see top fans identified by AI | Cross-platform engagement scored |
| US-4.9 | As C, see audience demographics (age/gender/geo) | Aggregated, anonymized |
| US-4.10 | As C, export audience data (CSV) | Email link, signed URL |

**Edge cases:** OAuth revoked externally, rate-limited API, platform deprecates endpoint, zombie token.

---

## EPIC 5 — Content Studio

**Goal:** Create and publish content.

| ID | Story | AC |
|----|-------|----|
| US-5.1 | As C, upload single image or carousel (≤10) | JPG/PNG, size limit enforced |
| US-5.2 | As C, upload short or long video (≤60min) | MP4/MOV, progress shown, resumable |
| US-5.3 | As C, upload audio | MP3/WAV |
| US-5.4 | As C, write caption with char count, hashtag suggestions, @mentions | Char count live |
| US-5.5 | As C, tag location, products (merch), collaborators | Search picker |
| US-5.6 | As C, toggle comments/sharing/download/age-restriction/visibility | Per post |
| US-5.7 | As C, preview post before publish | Renders exact feed view |
| US-5.8 | As C, publish now or schedule | Schedule picker, timezone-aware |
| US-5.9 | As C, save as draft and resume later | Drafts list, edit/delete |
| US-5.10 | As C, cross-post to linked platforms with platform-specific captions | Status per platform |
| US-5.11 | As C, view, edit, delete, archive, pin posts | Soft-delete 30d |
| US-5.12 | As C, see per-post analytics | Likes/comments/shares/saves/views/watch-time/engagement % |

**Edge cases:** upload interrupted, file too big, format unsupported, scheduled post fires while account suspended, cross-post fails on one platform.

---

## EPIC 6 — Merchandise Studio

**Goal:** AI mockups → publish to in-app store + standalone site. 80/20 split.

| ID | Story | AC |
|----|-------|----|
| US-6.1 | As C, browse product catalog and multi-select types | Tees/hoodies/caps/mugs/totes/posters/stickers/cases |
| US-6.2 | As C, view product details, sizes, colors, blank preview | Size charts shown |
| US-6.3 | As C, upload artwork (PNG/JPG/SVG/PSD) | Resolution check, transparency supported |
| US-6.4 | As C, save designs to design library for reuse | Per-account |
| US-6.5 | As C, generate 3-5 AI mockups across products + colors | Regenerate option |
| US-6.6 | As C, edit placement, scale, rotate design | Live preview |
| US-6.7 | As C, browse pro designer marketplace and hire | Quote/brief/delivery/revisions |
| US-6.8 | As C, pay designer through platform escrow | Funds released on approval |
| US-6.9 | As C, see base cost, set profit margin, see retail price | Calculator live |
| US-6.10 | As C, compare price to similar market products | Median range shown |
| US-6.11 | As C, set title, description, tags and publish | Publishes to in-app + standalone |
| US-6.12 | As F, browse merch on creator's profile store | Grid, categories, featured items |
| US-6.13 | As C, get auto-generated standalone site at `underdawgstore.com/username` | SSL, mobile, cart/checkout |
| US-6.14 | As C, customize site branding (logo/colors/fonts), connect custom domain | DNS instructions provided |
| US-6.15 | As C, see merch sales dashboard | Revenue/units/top products/geo/conversion |

**Edge cases:** low-res artwork rejected, designer ghosting, price below margin floor, custom domain DNS misconfig, refund/chargeback.

---

## EPIC 7 — Gigs & Brand Deals

**Goal:** Discover, apply, negotiate, deliver, get paid. Includes Get Viral as featured gigs.

| ID | Story | AC |
|----|-------|----|
| US-7.1 | As C, see personalized gig feed + browse all | Categories, featured (Get Viral) |
| US-7.2 | As C, filter by niche/budget/platform/content-type/audience-size/location/deadline | Multi-filter, sort by newest/budget/match |
| US-7.3 | As C, save, get alerts, hide gigs | Per-gig actions |
| US-7.4 | As C, view full gig details (brand, brief, deliverables, guidelines, budget, timeline, requirements, exclusivity, usage rights) | All fields visible pre-apply |
| US-7.5 | As C, see market rate for "creators like me" | Based on followers/engagement/niche/platform |
| US-7.6 | As C, get AI negotiation tips | Suggested talking points |
| US-7.7 | As C, check eligibility auto + apply with pitch, rate, timeline, content ideas, portfolio, auto-attached stats | Templates available |
| US-7.8 | As C, review and submit / withdraw application | Withdraw allowed pre-response |
| US-7.9 | As C, track application status (Pending → Review → Shortlisted → Accepted/Rejected) | Push on each change |
| US-7.10 | As C, chat with brand to negotiate rate, scope, timeline, deliverables | Counter-offers, terms summary, read receipts |
| US-7.11 | As C, walk away from negotiation | Marks gig declined |
| US-7.12 | As C, review auto-generated contract (terms, payment, cancellation, exclusivity, ownership, revisions) | Request changes, e-sign |
| US-7.13 | As C, download signed contract PDF | Stored permanently |
| US-7.14 | As C, see active gigs dashboard with checklist, deadline countdown, reminders | Push reminders |
| US-7.15 | As C, download brand assets (logos/images) | Direct download |
| US-7.16 | As C, upload deliverables (multi-file, captions, links) with submission notes | Preview mode |
| US-7.17 | As C, see review status (Pending/Changes Requested/Approved) + brand feedback | Push on update |
| US-7.18 | As C, submit revisions with counter | Track revision count |
| US-7.19 | As C, get go-live instructions, confirm posted, submit live link, report performance | Required before payout |
| US-7.20 | As C, see payment status, timeline, auto-invoice, fee breakdown, payout method | Escrow until approval |
| US-7.21 | As C, rate brand and get rated post-gig | 1-5 stars + written |
| US-7.22 | As C, auto-add gig content to portfolio | Optional toggle |
| US-7.23 | As C, see gig dashboard tabs (All/Applications/Active/Completed/Earnings) + calendar/kanban view | Quick stats |

**Edge cases:** brand cancels mid-gig, missed deadline, revision loop abuse, payment dispute, contract amendment after sign.

---

## EPIC 8 — Challenges & Competitions

**Goal:** Platform-run contests for visibility/prizes.

| ID | Story | AC |
|----|-------|----|
| US-8.1 | As C, browse active/upcoming/ended challenges by category, filter by type/prize/deadline | Tabbed UI |
| US-8.2 | As C, view challenge theme, rules, eligibility, prizes, timeline, judging criteria, sponsor, entry count | Pre-entry view |
| US-8.3 | As C, join challenge and create entry | Validates eligibility |
| US-8.4 | As C, submit entry meeting format/length requirements | Confirmation receipt |
| US-8.5 | As C, edit/withdraw entry before deadline | Lock after deadline |
| US-8.6 | As F, browse entry gallery, sort, like, comment, share | Engagement counts |
| US-8.7 | As F, vote in community-judged challenges within voting period and limit | Vote tracking |
| US-8.8 | As C, see live leaderboard and own rank | Real-time refresh |
| US-8.9 | As C, get winner notification, prize, badge, showcase | Push + email |
| US-8.10 | As C, see own challenge history (entries, results, badges, win record) | Profile tab |

**Edge cases:** late submission, ineligible entry, vote brigading, prize delivery failure.

---

## EPIC 9 — Tips (Receive)

**Goal:** Fans tip creators.

| ID | Story | AC |
|----|-------|----|
| US-9.1 | As C, enable/disable tips on profile and per-post | Toggle |
| US-9.2 | As C, set min tip, suggested amounts, allow custom, allow message | Per creator |
| US-9.3 | As F, send tip with optional message | Payment processed |
| US-9.4 | As C, get notification with amount, message, tipper info | Push + in-app |
| US-9.5 | As C, view tip history, analytics, top tippers, total | Dashboard |
| US-9.6 | As C, send thank-you reply, auto-response, public shoutout | Optional per tip |

**Edge cases:** payment failure, refund, anonymous tipper, abusive message.

---

## EPIC 10 — Collaboration Features

**Goal:** Creator-to-creator collabs.

| ID | Story | AC |
|----|-------|----|
| US-10.1 | As C, set collab status (open/closed) and interests | Visible on profile |
| US-10.2 | As C, search collaborators by niche/location/audience | Filters |
| US-10.3 | As C, see AI-suggested collabs with compatibility score | Personalized |
| US-10.4 | As C, send/receive collab requests with message | Accept/decline/pending |
| US-10.5 | As C, manage collab inbox, active collabs, planning chat | Threaded |
| US-10.6 | As C, tag collaborator on post, co-post, split attribution, show "Collab with @x" label | Both get credit |
| US-10.7 | As C, see collab history, stats, past partners | Profile tab |

**Edge cases:** spam requests, collab dispute, partner deletes account mid-collab.

---

## EPIC 11 — Community Features

**Goal:** Niche communities on platform.

| ID | Story | AC |
|----|-------|----|
| US-11.1 | As C, browse, search, get suggested communities by category | Filters |
| US-11.2 | As C, view community details (name, description, members, rules, admins) | Pre-join |
| US-11.3 | As C, join/leave community, request join if gated, invite others | Approval flow |
| US-11.4 | As C, post to community, comment, pin posts (if admin) | Moderated |
| US-11.5 | As C, group chat in community channels with notifications | Real-time |
| US-11.6 | As C, browse community events, RSVP, get reminders | Calendar |
| US-11.7 | As C, find creators in directory, follow, message, get/be mentor, see spotlights | Search |

**Edge cases:** banned from community, rule violation, admin abandonment.

---

## EPIC 12 — Insights & Analytics

**Goal:** Unified dashboard for all creator activity.

| ID | Story | AC |
|----|-------|----|
| US-12.1 | As C, see dashboard overview with time range (7d/30d/90d/custom) | Customizable widgets |
| US-12.2 | As C, export data as CSV/PDF | Email link |
| US-12.3 | As C, see profile views/trend, follow/unfollow, growth, demographics | Trend graph |
| US-12.4 | As C, see per-post likes/comments/shares/saves/views/watch-time/engagement | Per content |
| US-12.5 | As C, see top content by likes/comments/shares/reach | Sortable |
| US-12.6 | As C, see audience size/growth/active/location/demographics/active times/best post time | AI suggestion |
| US-12.7 | As C, compare platforms, see unified reach, growth/engagement per platform | Charts |
| US-12.8 | As C, see portfolio views, traffic sources, click-through, conversion | Funnel |
| US-12.9 | As C, see total earnings, by source, trend, top streams, projected | Financial graph |
| US-12.10 | As C, see merch + gig analytics (sales/units/top products/success rate/avg value/top brands) | Tabs |

**Edge cases:** data delay >24h, missing platform data, large-creator pagination.

---

## EPIC 13 — Reputation & Verification

**Goal:** Credibility via score + blue check.

| ID | Story | AC |
|----|-------|----|
| US-13.1 | As C, see reputation score 0-100 and tier (Emerging/Bronze/Silver/Gold/Platinum) | Profile + dashboard |
| US-13.2 | As C, see score factors (quality/consistency/engagement/reliability/community/profile/verification) | Transparent |
| US-13.3 | As C, see score history and tips to improve | Trend graph |
| US-13.4 | As C, see tier benefits, perks, progress to next, get notified on tier change | Push |
| US-13.5 | As C, complete identity verification (ID upload + selfie liveness) | Auto-match |
| US-13.6 | As C, see verification status (Pending/Verified/Rejected) and reason | Re-submit allowed |
| US-13.7 | As C, apply for blue check verification badge | Criteria visible |
| US-13.8 | As C, earn badges (First Sale, First Gig, milestones, Rising Star, Top Creator, etc.) | Auto-awarded |
| US-13.9 | As C, see all badges, progress, display on profile, get achievement notifications | Profile section |

**Edge cases:** ID rejected (forgery), liveness fails, score gaming, badge revoked on violation.

---

## EPIC 14 — Financial Dashboard

**Goal:** Manage earnings and payouts.

| ID | Story | AC |
|----|-------|----|
| US-14.1 | As C, see total/available/pending balance, this/last month, trend | Overview |
| US-14.2 | As C, see earnings breakdown by source (merch/gigs/tips) | Pie/bar chart |
| US-14.3 | As C, view all transactions with details/type/filter/search/export | Paginated |
| US-14.4 | As C, withdraw funds above min threshold, choose method, confirm | Status tracked |
| US-14.5 | As C, see payout status, history, estimated arrival | Push on completion |
| US-14.6 | As C, add/edit/remove bank account (with verification), UPI, PayPal, set default | Micro-deposit verify |
| US-14.7 | As C, see platform fees, fee per stream, management fees, net earnings | Transparent |
| US-14.8 | As C, download tax documents, income summary, link PAN/GST | Annual |
| US-14.9 | As C, create/send/download invoices with templates and history | PDF |

**Edge cases:** bank rejection, payout reversal, fraud hold, currency conversion, KYC required.

---

## EPIC 15 — Notifications

**Goal:** Right notification, right channel, right time.

| ID | Story | AC |
|----|-------|----|
| US-15.1 | As C, see notification center with unread count, mark read, group, deep-link, clear | List view |
| US-15.2 | As C, get notifications: new follower, like, comment, mention, share, DM, collab request, gig match, application update, deal message, payment, order, tip, challenge, milestone, system | Per type |
| US-15.3 | As C, enable/disable push, set sound, preview, quiet hours | Per device |
| US-15.4 | As C, set per-type and channel (push/in-app/email) preferences | Granular |
| US-15.5 | As C, choose frequency (real-time / daily digest) | Per channel |

**Edge cases:** push token expired, OS-level disabled, digest with empty queue.

---

## EPIC 16 — Settings

**Goal:** All preferences in one place.

| ID | Story | AC |
|----|-------|----|
| US-16.1 | As C, view/change email, phone, password | Re-auth required |
| US-16.2 | As C, enable 2FA, see login history, log out all devices | TOTP/SMS |
| US-16.3 | As C, edit profile fields, username, type, niche/skills | From settings |
| US-16.4 | As C, set privacy: visibility, who-can-message/comment/see-activity | Per scope |
| US-16.5 | As C, manage block list, mute list | Add/remove |
| US-16.6 | As C, download my data | GDPR-style export |
| US-16.7 | As C, manage notification settings (push/email/SMS, per-type) | Master + granular |
| US-16.8 | As C, manage connected platforms (add/remove/sync status) | From settings |
| US-16.9 | As C, manage payment methods (bank/UPI/PayPal, default, remove) | From settings |
| US-16.10 | As C, change language, theme (dark/light), autoplay, data saver, download quality, clear cache | App prefs |
| US-16.11 | As C, access help center, contact support, report problem, submit feedback | In-app forms |
| US-16.12 | As C, view community guidelines, ToS, privacy policy | Linked docs |
| US-16.13 | As C, log out, deactivate (temporary), or delete account permanently with confirmation | 30d grace on delete |

**Edge cases:** delete with active gigs/funds, deactivate during active escrow, password change while logged in elsewhere.

---

## CROSS-CUTTING EPICS

### EPIC X1 — Subscription Tiers (Creator)

| ID | Story | AC |
|----|-------|----|
| US-X1.1 | As C, see Free / Creator+ ₹299 / Pro ₹799 / Elite ₹1,999 plans + perks | Comparison table |
| US-X1.2 | As C, subscribe, upgrade, downgrade, cancel | Prorated |
| US-X1.3 | As C, get tier-specific features (analytics, visibility, verification, priority deals, dedicated manager, email list size) | Gated by plan |
| US-X1.4 | As C, see billing history and renewal date | Invoice download |

### EPIC X2 — Discovery Feed (Consumption)

| ID | Story | AC |
|----|-------|----|
| US-X2.1 | As C/F, see personalized feed (algorithmic + chronological) | Ranking |
| US-X2.2 | As C/F, like/comment/share/save content | Counts update |
| US-X2.3 | As C/F, search creators/content/topics with filters | Autocomplete |
| US-X2.4 | As C/F, follow/unfollow creators | Live count |

### EPIC X3 — Direct Messaging

| ID | Story | AC |
|----|-------|----|
| US-X3.1 | As C, send/receive DMs to creators, brands, managers | Real-time |
| US-X3.2 | As C, see read receipts, typing indicator, attachments | Per chat settings |
| US-X3.3 | As C, mute, archive, block, report conversations | Per thread |

### EPIC X4 — Trust, Safety, Moderation

| ID | Story | AC |
|----|-------|----|
| US-X4.1 | As any, report content/user/comment with reason | Triaged to A |
| US-X4.2 | As A, review reports, take action (warn/restrict/ban/remove) | Audit log |
| US-X4.3 | As C, see content takedown notice and appeal | 7d appeal window |
| US-X4.4 | As C, get account warning/strike notifications | 3-strike policy |
| US-X4.5 | As any, report suspected fraud (fake follower, scam gig) | Investigation queue |

### EPIC X5 — Compliance & Disclosure

| ID | Story | AC |
|----|-------|----|
| US-X5.1 | As C in Get Viral / brand deal, see mandatory `#ad`/`#paidcollab` disclosure injected | Pre-publish check |
| US-X5.2 | As C, complete tax/KYC before payout above threshold | Block payout otherwise |
| US-X5.3 | As C, see GDPR/data-rights controls (export/delete) | From settings |

---

## ROLE-COVERAGE MATRIX

| Module | Creator | Brand | Manager | Fan | Admin |
|--------|:-:|:-:|:-:|:-:|:-:|
| 1 Onboarding | ✅ | ✅ | ✅ | ✅ | — |
| 2 Public Portfolio | ✅ | ✅ view | ✅ view | ✅ view | — |
| 3 In-App Profile | ✅ | ✅ | ✅ | ✅ | — |
| 4 External Platforms | ✅ | — | — | — | — |
| 5 Content Studio | ✅ | — | — | — | — |
| 6 Merch Studio | ✅ | — | — | ✅ buy | ✅ fulfillment |
| 7 Gigs / Brand Deals | ✅ apply | ✅ post | ✅ negotiate | — | ✅ moderate |
| 8 Challenges | ✅ enter | ✅ sponsor | — | ✅ vote | ✅ run |
| 9 Tips | ✅ receive | — | — | ✅ send | — |
| 10 Collab | ✅ | — | ✅ broker | — | — |
| 11 Community | ✅ | — | — | ✅ | ✅ moderate |
| 12 Analytics | ✅ | ✅ campaign | ✅ client | — | — |
| 13 Reputation | ✅ | ✅ view | ✅ view | ✅ view | ✅ verify |
| 14 Finance | ✅ | ✅ pay | ✅ commission | ✅ buy | — |
| 15 Notifications | ✅ | ✅ | ✅ | ✅ | — |
| 16 Settings | ✅ | ✅ | ✅ | ✅ | — |

---

## PRIORITY ROLLUP (per spec)

| Priority | Count (approx) | Phase |
|----------|----------------|-------|
| P0 | ~200 stories | Phases 1-4 |
| P1 | ~120 stories | Phases 4-5 |
| P2 | ~60 stories | Phases 5-6 |

---

## DEFINITION OF DONE (applies to every story)

- Functional on iOS, Android, Web (where applicable)
- Unit + integration tests pass
- Analytics events emitted
- Accessibility AA
- Localized (en, hi minimum)
- Error states handled
- Reviewed against acceptance criteria
- Documented in API + user help

---

*Source: PROJECT_SPEC.md + UNDERDAWG_CREATOR_FLOW_COMPLETE.md v1.1*
*Generated: 2026-05-09*
