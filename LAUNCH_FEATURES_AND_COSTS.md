# Underdawg — Launch Features & Costs

**Direction:**
- Underdawg is the business side of Instagram for artists.
- Creators connect Instagram. Their Underdawg profile and link-in-bio page show their real posts and stats, with tools to earn money.
- There is no separate social feed.

**Assumptions:**
- Build time is for 1 full-stack developer.
- Prices are approximate as of Sept 2026, at ₹88 = $1. Check current prices before signing up.
- Running costs are for the first ~1,000 creators.

---

## One-time and yearly costs

| Item | Cost |
|---|---|
| Apple Developer account | $99/year ≈ ₹8,700 |
| Google Play account | $25 once ≈ ₹2,200 |
| Domain (underdawg.com) | ~₹1,000–1,500/year, if not already owned |
| Meta developer app and business verification | Free |
| Razorpay account | Free, no setup fee |
| Privacy policy and terms (needed for Meta review) | ₹0 with a template; more with a lawyer |

---

## Phase 1 — Launch (lowest cost, earns from day one)

| # | Feature | Build time | Monthly cost | How it earns |
|---|---|---|---|---|
| 1 | Login with Instagram + Google (+ Apple on iPhone) | 1 week | ₹0 | — |
| 2 | Instagram connect and auto-sync (posts, followers, stats) | 2 weeks, plus 2–4 weeks for Meta review (can run at the same time) | ₹0 (Instagram API is free) | — |
| 3 | Instagram-powered profile: Follower ER, True ER, growth, top posts, audience | 2 weeks | ₹0 | Full stats in Pro |
| 4 | Link-in-bio page (`underdawg.com/username`): blocks, editing, reordering, 5 free templates, "Match my Instagram" | 3 weeks | ₹0 (free hosting tier) | The free-page badge advertises Underdawg |
| 5 | Pro templates (10 to start) and video backgrounds | 1–2 weeks, plus design time | ~₹0 | Pro plan |
| 6 | DM automation (details below) | 3–4 weeks | ₹0–500 (server) | Free: 1 automation. Pro: unlimited |
| 7 | Scam Stopper and Comment Cleaner (simple rules, no AI) | 1 week | ₹0 | Free hook |
| 8 | Tips via UPI, on the page and in DMs | 1 week | ₹0 fixed; ~2% payment fee per tip | 5–10% fee |
| 9 | Digital downloads: free assets (in exchange for email) and paid packs (presets, brushes, beats, wallpapers) | 1–2 weeks | ₹0 plus ~2% per sale | 10% fee |
| 10 | Bookings and 1:1 sessions: calendar, slots, deposit, meeting link | 2–3 weeks | ₹0 plus ~2% per payment | 10% fee |
| 11 | Fan email / WhatsApp number collection and CSV export | 3 days | ₹0 | Pro |
| 12 | Money per link and per post | 1 week | ₹0 | Pro |
| 13 | Pro plan billing (₹299/month) | 1 week | ~2% per payment | ₹299/month |
| 14 | Admin basics: users, refunds, payouts | 1 week | ₹0 | — |
| 15 | Crash reports and usage analytics (Sentry, PostHog) | 2 days | ₹0 (free tiers) | — |
| 16 | Live Rooms using the creator's own Zoom / Meet link: tickets, seats, reminders, room page with chat, auto-close, refunds | 2 weeks | ₹0 | 10% fee on paid sessions |
| 17 | Fan Club (basic, in-app): free and paid tiers, creator posts, fan comments and likes, ratings and reviews, report and block | 3–4 weeks | ₹0–1,000 (database and image storage free tiers) | 10% fee on paid tiers |
| 18 | Show & Review: fans upload work (image, or video up to 60 sec, compressed on the phone); the artist rates it and gives text or voice feedback; help posts marked "Solved"; paid reviews | 2 weeks | ₹0–500 (videos stored on Cloudflare R2, which has no bandwidth fees) | 10% of paid reviews; pushes fans to paid tiers |

**What DM automation (#6) includes:**
- The creator picks any trigger word.
- It works on comments, story replies and DMs.
- It can send text, links, images, buttons and cards.
- It can post a public reply to the comment.
- It can check whether the person follows the creator.
- It can send only once per person.

**Phase 1 total:**
- **Build time:** about 6–7 months for 1 developer, or about 3.5–4 months for 2.
- **Development cost if you hire:** multiply the build time by your developer's monthly pay. For example, at ₹1L/month, Phase 1 costs about ₹6–7L.
- **Running cost:** about ₹0–2,000/month, plus payment fees. Payment fees come out of each payment, so they don't come from our pocket.
- **Break-even on server bills:** about 7 Pro subscribers.

---

## Phase 2 — After the first paying users (still low cost)

| Feature | Build time | Monthly cost | How it earns |
|---|---|---|---|
| Merch store with a print partner (Qikink / Printrove), reusing the existing Merch Studio | 3–4 weeks | ₹0 fixed; print cost per order is paid from the sale | 20% of margin |
| Hire Artists (optional, for brands): artist "Open for work" switch, free brand accounts, artist search, hire from profile or post a brief, accept / counter / decline, escrow (Razorpay Route hold/release), click-to-accept contract, 2 revisions, two-way ratings, verified media kit | 5–6 weeks (reuses the current Gigs screens) | ₹0 plus ~2% payment fee | 10–12% fee, paid by the brand |
| Classes and event tickets | 2 weeks | ₹0 plus ~2% | 10% fee |
| AI replies in Hinglish, and Reply-All | 2 weeks | ~₹0.09 per reply with Claude Haiku 4.5 (~₹900 per 10,000 replies); ~₹0.18 with Sonnet 5.5 | Pro only |
| Viral Alert, best time to post, Fan City Map | 2 weeks | ₹0 | Pro |
| Custom domain for Pro users | 1 week | First 100 domains free (Cloudflare for SaaS), then ~₹9 per domain per month | Pro |
| Schedule posts to Instagram, and Artwork → Carousel | 3 weeks | ₹0, plus a little storage | Pro |
| Email newsletters to collected fans | 2 weeks | Free up to a few thousand emails/month (Resend / Brevo), then ~₹1,700+/month | Pro |
| Template marketplace (designers sell templates) | 2–3 weeks | ₹0 plus ~2% | 20–30% cut |
| Built-in Live Rooms (LiveKit): video, chat, raise hand, replay; paid links can't be shared | 4–6 weeks | ~₹150–400 per 2-hour class of 30 people, after 10,000 free minutes a month | 15% fee, or a ₹10–20 booking fee paid by the buyer |
| Full Reddit-style Fan Club (fan posts, upvote sorting, polls, fan points and badges, fan moderators) plus Artist Boards on the same system | 3–4 weeks | Grows slowly with activity (database and images); no video costs | More paid members; Artist Boards bring in and keep artists |

**Free live session rules:**
- **Limits:** up to 45 minutes, 30 people and 2 sessions a month. Teacher's camera only; no replay.
- **Free plan creators** run free sessions on Instagram Live or their own Meet/Zoom link, which costs us ₹0.
- **Pro creators** can run their 2 free sessions a month in Underdawg rooms, at about ₹50–150 each.
- **Every free session ends with an offer** to book the paid class.

---

## Phase 3 — Later (costs money per use, or big builds)

| Feature | Why later | Cost |
|---|---|---|
| Phone OTP login | Every SMS costs money | ~₹0.15–0.25 per SMS, plus DLT registration |
| WhatsApp alerts (drops, releases, shows) | Every message costs money | ~₹0.12–0.80 per message, depending on type |
| E-sign contracts (Digio or similar) | Charged per signature | ~₹20–60 per signature |
| ID and selfie verification | Charged per check | ~₹10–50 per check |
| Live Drop, and Challenge Runner with brand sponsors | Needs users first | API is free; 3–4 weeks build each |
| YouTube and Spotify connect | More APIs to support | APIs are free; 2–3 weeks each |
| Brand & Agency web portal | Big build | 3–4 months |
| Get Viral, talent management, financial products | Needs scale and licences | — |

---

## Money-saving rules

- **No separate social feed.** Instagram hosts the posts and videos, so we pay nothing for video storage or streaming. This is the biggest saving.
- **No phone OTP at launch.** Instagram and Google login are free.
- **No fixed payment cost.** Payment fees come out of each payment.
- **No stock.** Merch is printed only after an order.
- **Free tiers:** Firebase / Supabase, Cloudflare, Sentry, PostHog, Resend.
- **Move the web store off Vercel's free plan**, which is for non-commercial use only. Options: Cloudflare Pages or Firebase Hosting (both free, commercial use allowed), or Vercel Pro at $20/month.
- **Sell Pro on the website.** Apple and Google take 15–30% of in-app subscriptions. Check the current store rules first.
- **Reuse existing code:** Merch Studio themes become templates, the web store becomes the link-in-bio page, and the rate card, payout and settings screens can be reused.

---

## How we earn early

**Pro plan (₹299/month):**
- unlimited DM automations
- Pro templates
- full stats
- no Underdawg badge
- money per link
- custom domain (from Phase 2)
- 2 free live sessions a month in Underdawg rooms (from Phase 2)

**Fees:**

| Source | Fee |
|---|---|
| Tips | 5–10% |
| Digital downloads | 10% |
| Bookings and sessions | 10% |
| Classes and tickets | 10% |
| Paid live sessions | 10% with the creator's own link; 15% in Underdawg rooms |
| Fan Club memberships | 10% |
| Paid reviews (Show & Review) | 10% |
| Merch | 20% of margin |
| Brand deals | 10–12%, paid by the brand |
| Template marketplace | 20–30% |

---

## Early revenue estimate (Phase 1 features only)

These are estimates, not promises. Real numbers will come after launch.

**Assumptions:**

| Source | Conservative | Realistic | Good |
|---|---|---|---|
| Creators on Pro (₹299/month) | 2% | 5% | 8% |
| Creators getting tips (our fee 5%) | 5% at ₹500/month | 15% at ₹800/month | 25% at ₹1,200/month |
| Creators selling downloads (our fee 10%) | 2% at ₹1,000/month | 5% at ₹2,000/month | 10% at ₹3,000/month |
| Creators taking bookings (our fee 10%) | 2% at ₹3,000/month | 5% at ₹5,000/month | 10% at ₹8,000/month |
| **Average we earn per creator per month** | **~₹15** | **~₹56** | **~₹149** |

**Monthly revenue:**

| Creators | Conservative | Realistic | Good |
|---|---|---|---|
| 100 | ₹1,500 | ₹5,600 | ₹14,900 |
| 500 | ₹7,500 | ₹28,000 | ₹74,500 |
| 1,000 | ₹15,000 | ₹56,000 | ₹1,49,000 |
| 5,000 | ₹75,000 | ₹2,80,000 | ₹7,45,000 |

**What we actually keep:**
- About 80% of these numbers, after 18% GST on our income and payment fees on Pro.

**Break-even** (using what we keep):
- **Server bills (~₹2,000/month):** covered from about 50 creators in the realistic case.
- **One developer at ₹1L/month plus servers:** needs about 2,300 creators in the realistic case, or about 850 in the good case.

**Biggest driver:**
- In the realistic case, bookings bring in about half the money.
- Push bookings and sessions hard at launch, not only Pro.

---

## Remove from the current app

These were built for a separate social network:
- feed
- likes, comments and saves
- content studio composers
- in-app camera posting
- reels viewer
- drafts
