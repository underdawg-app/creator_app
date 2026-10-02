# Underdawg — App Implementation Plan (New Pages)

**Goal:**
- Build the new features as working demo screens in the current React Native app, on sample data like today.
- Show the demo to artists and investors.
- Then plug in the real backend (Instagram API, payments, server) behind the same screens.

---

## 1. New app layout

**Bottom tabs: Home · Page · + · Club · You**

| Tab | What it shows |
|---|---|
| **Home** | Earnings, next session, work waiting for review, DM automation results, "Ways to earn" grid |
| **Page** | Link-in-bio page editor |
| **+** | Create menu: new session, product, automation, download, club post, Instagram post |
| **Club** | The creator's Fan Club |
| **You** | Instagram profile and stats, Pro plan, settings |

**Removed from the tab bar:** Explore, Gigs and Merch.
- Merch and Gigs move into Home → Ways to earn.

---

## 2. Foundations (do first)

1. **Split the store.** `src/store/index.ts` is already 1,000+ lines.
   - Move each area into `src/store/slices/*.ts` and combine them in `index.ts`.
   - Add these new slices: `page`, `automations`, `sessions`, `club`, `submissions`, `downloads`, `bookings`, `hireRequests`, `plan` (free / pro), `transactions`.
   - Add the new slices to `partialize` so they're saved.
   - Raise the persist `version` to 3, and use `migrate` to fill in default values.
2. **Services layer with mock data.** Create `src/services/instagram.ts`, `payments.ts`, `automations.ts`, `sessions.ts` and `club.ts`.
   - Screens call these functions, never the mock data directly.
   - For now they return mock data. Later they call the real server, and the screens don't change.
3. **Mock data files:** `src/data/instagram.ts` (posts, followers, insights), `club.ts`, `sessions.ts`, `automations.ts`, `hire.ts`.
4. **Navigation.** Every new screen is added in 2 places, plus deep links if needed:
   - `ModulesNavigator.tsx`: import it and add a `Stack.Screen`.
   - `registry.ts`: add the path to `STATIC`, or to `DYNAMIC` for pages with an id.
   - `linking.ts`: only if it needs an `underdawgs://` link.
   - **New pages with an id:** `session/:id`, `club/post/:id`, `automation/:id`, `submission/:id`, `hire/:id`, `board/:id`.
5. **Shared components** (in `src/components/`):
   - `BlockRenderer`: draws page blocks. Used by the editor, the preview and the web page.
   - `VoteButtons`, `StarRating`, `CountdownTimer`, `PriceTag`
   - `MediaPicker`: image, or video up to 60 seconds
   - `ProLock`: lock badge that opens the Pro plan
   - `CheckoutSheet`: demo UPI payment, used everywhere something is paid for
6. **Pro gating helper:** `usePro()` returns whether the user is on Pro. Premium templates and extra automations check it.

---

## 3. Pages to build

**Reading the tables:**
- **New:** a new file.
- **Change:** edit an existing screen.
- **Reuse:** copy from, or build on, an existing screen.

### Onboarding (`src/screens/onboarding/`)
| Page | Type | What it does |
|---|---|---|
| Auth | Change | Continue with Instagram / Google / Apple. Phone OTP removed |
| ConnectInstagram | New | Explains Creator/Business accounts and how to switch; connect button |
| InstagramImport | New | "Building your page…" progress: posts, stats, colours |
| Identity | Change | Pre-filled from Instagram; confirm name, handle, craft |
| UserType | Change | Creator or Fan (Brand later) |

### Home (`src/screens/tabs/Home.tsx`)

Home is the creator's daily dashboard: what they earned, what needs them, and what's coming up. It replaces Explore as the first screen.

**Sections, top to bottom:**

| # | Section | What it shows | Data from | Tap opens |
|---|---|---|---|---|
| 1 | Header | "Hi {name}", profile photo, notification bell, Pro badge | `profile`, `plan` | You tab, Notifications |
| 2 | Earnings card | Today and this month, with chips by source (sessions, merch, tips…) | `transactions` | Withdraw → FinancePayouts |
| 3 | Needs you | Up to 5 to-do items (listed below) | `sessions`, `submissions`, `hireRequests`, `bookings`, `club` | The matching screen |
| 4 | Next session | Title, time, seats sold (24/30) | `sessions` | Share, Start → LiveRoom |
| 5 | DM automation today | Comments → DMs sent → sales (₹), and the best automation | `automations` | AutomationActivity |
| 6 | Instagram snapshot | Followers this week, True ER, best time to post today | `instagram` service | InsightsIndex |
| 7 | Page snapshot | Visits today, most-clicked link | `page` | PageStats, PageEditor |
| 8 | Club activity | New members, new posts, top post | `club` | ClubHome |
| 9 | Ways to earn | Merch, Sessions, Bookings, Downloads, Tips, Fan Club, Hire requests. Tiles not set up yet show "Set up" | All earn slices | Each feature |

**"Needs you" items:**
- session starting soon
- fan work waiting for review
- new brand requests
- new bookings
- club posts without a reply

**Day 1 (new creator):**
- A setup checklist replaces the cards until it's done:
  - Connect Instagram
  - Publish your page
  - Create your first DM automation
  - Add a way to earn
- Home is never empty.

**Fan Home (later, with the Fan role):** clubs they've joined, sessions they've booked, feedback on their work, creators to discover.

**Components:**
- Reuse `MetricCard`, `Section`, `ListCell`.
- New: `SetupChecklist`, `NeedsYouList`, `EarnGrid`.

**When to build:**
- Build Home in M1 with mock data.
- Connect each card to real store data as its feature is built in M2–M8.

**Sketch:**
```
┌─────────────────────────────┐
│ Hi Riya 👋          🔔  (R) │
├─────────────────────────────┤
│ ₹4,850 today · ₹38,200 month│
│ [Withdraw]                  │
│ Sessions · Merch · Tips     │
├─────────────────────────────┤
│ NEEDS YOU                   │
│ • Session in 2 hrs → Start  │
│ • 3 works to review         │
│ • 2 brands want to hire you │
├─────────────────────────────┤
│ NEXT SESSION                │
│ Hip-Hop Basics · Sun 5pm    │
│ 24/30 seats  [Share][Start] │
├─────────────────────────────┤
│ DM AUTOMATION TODAY         │
│ 120 → 118 DMs → 14 sales    │
├─────────────────────────────┤
│ INSTAGRAM  +32 · ER 6.2%    │
│ PAGE       310 visits       │
│ CLUB       +12 members      │
├─────────────────────────────┤
│ WAYS TO EARN                │
│ [Merch][Sessions][Bookings] │
│ [Downloads][Tips][Hire]     │
└─────────────────────────────┘
```

### Instagram profile and stats
| Page | Type | What it does |
|---|---|---|
| Profile (You tab) | Change | Instagram post grid, followers, Follower ER and True ER, "Verified" badge; links to Page, Insights, Pro, Settings |
| InsightsIndex | Reuse AnalyticsIndex | Growth, reach, engagement, top posts |
| InsightsAudience | Reuse AnalyticsAudience | Cities, age, gender |
| InsightsBestTime | New | Best time to post and best content type |
| RateSuggestion | Reuse JobsRateCard | Suggested price for a reel or post |
| ScheduleInstagramPost | Change StudioSchedule | Pick image, caption and time; it posts to Instagram |

### Link-in-bio page (`src/screens/modules/page/`)
| Page | Type | What it does |
|---|---|---|
| PageEditor (Page tab) | New; reuses AudienceLandingPage and MerchIndex section reordering | List of blocks: add, remove, drag to reorder, show/hide |
| PageBlockEditor | New (sheet) | Edit one block: links, shop, book me, tip, sessions, download, signup, reviews, embed |
| PageTemplates | New; reuses Step2Theme palettes and fonts | Free and Pro templates, "Match my Instagram", try Pro before buying |
| PageDesign | New | Colours, fonts, button style, layout, background |
| PagePreview | New; reuses MerchPreview / StorefrontPreview | Full preview with a Fan view / Brand view switch |
| PageStats | New | Visits, clicks and ₹ earned per link |
| PageShare | Change MerchPublished | Copy link, share, QR code |
| Web page | Change `web-store/index.html` and `src/lib/webStore.ts` | Show the page blocks on the web, using the same shareable-link method as today |

### DM automation (`src/screens/modules/automations/`)
| Page | Type | What it does |
|---|---|---|
| AutomationsList | New | All automations, on/off switch, results |
| AutomationEditor | New; step flow like Merch Studio's `_chrome.tsx` | 4 steps, listed below |
| AutomationTemplates | New | Ready-made: booking, freebie, class signup, pre-save, tickets, brand quote |
| AutomationTest | New; reuses InboxThread chat bubbles | Pretend Instagram DM showing exactly what fans receive |
| AutomationActivity | New | Who commented, what was sent, what they bought |

**AutomationEditor steps:**
1. **Where:** a post, all posts, stories, DMs or Live.
2. **Trigger words.**
3. **What to send:** a message, link, image, buttons, booking, payment or ticket.
4. **Extras:** public reply, follower check, send once per person, end date.

### Ways to earn (`src/screens/modules/earn/`)
| Page | Type | What it does |
|---|---|---|
| EarnIndex | New | Grid: Art Shop, Sessions, Bookings, Downloads, Tips, Fan Club, Hire requests, Gigs |
| TipsIndex | Change | Saved in the store; demo UPI checkout |
| DownloadsList / DownloadEditor | New | Upload a file; free in exchange for an email, or paid |
| BookingSettings | New | Services, time slots, price, deposit, meeting link |
| BookingsList | New | Upcoming and past bookings |
| Finance screens | Change | Show transactions from all sales in the store, not sample data |

### Art Shop and AI mockups (`src/screens/modules/merch/studio/`)

"Merch" is now the **Art Shop**: artists sell any art they make (originals, prints, handmade pieces) and ship it themselves. The print partner is optional. New pages needed: ArtListing (photos, type, size, price, shipping), ArtOrders (book pickup, add tracking) and a certificate of authenticity.
| Page | Type | What it does |
|---|---|---|
| Merch Studio steps 1–6 | Keep | Opened from Earn instead of the tab bar |
| Step6Mockups | Change | Renamed "AI mockups"; adds wall art and canvas shown in a room |
| SnapArtwork | New; reuses Camera and `pickImage.ts` | Photograph the artwork, crop it, use it as the design |
| Step5Products | Change | Option for a limited-time drop with a countdown |
| MerchOrders | Keep | Connected to the store later |

**Needed:** room and wall photos for the canvas and print mockups.

### Live Rooms (`src/screens/modules/sessions/`)
| Page | Type | What it does |
|---|---|---|
| SessionsList | New | Upcoming, live now, past |
| SessionCreate | New; reuses StudioLiveComposer | Title, date, length, paid or free, price, seats, level |
| SessionDetail | New | Ticket page. Fan: book and pay. Creator: attendees, share, start |
| LiveRoom | New; reuses InboxThread chat and Camera preview | Video area, chat, raise hand, pinned notes, tip, members, timer, end button |
| SessionEnded | New | "Room closed"; rating, book next session, replay |

**Free session limits** (checked in SessionCreate): 45 minutes, 30 people, 2 a month.

### Fan Club (`src/screens/modules/club/`)
| Page | Type | What it does |
|---|---|---|
| ClubHome (Club tab) | New; reuses CommunityIndex / CommunityGroupDetail | Feed with Hot / New / Top, pinned posts, member tier badge |
| ClubPost | New; reuses PostDetail comments | Post, upvotes, threaded replies, "Mark as Solved" |
| ClubCompose | New; reuses CommunityQA | Post type: Update, Help, Show & Review, Poll |
| ClubTiers | New | Creator sets free and paid tiers and their perks |
| ClubJoin | New | Fan picks a tier and pays |
| ClubMembers | New; reuses CommunityDirectory | Members, badges, leaderboard, moderators |
| ClubModeration | New | Reports; remove posts; ban members |
| Reviews | New | Star ratings from verified buyers |

### Show & Review (`src/screens/modules/club/`)
| Page | Type | What it does |
|---|---|---|
| ReviewQueue | New | Creator: work waiting for review, paid members first |
| SubmissionReview | New | Fan's work, star rating, text or voice feedback, "try again" |
| SubmitWork | New (fan) | Upload an image or 60-second video; pay for a review if not a member |
| MySubmissions | New (fan) | Feedback history and before/after |

### Artist Boards (`src/screens/modules/boards/`)
| Page | Type | What it does |
|---|---|---|
| BoardsIndex | New | Brand Reviews, Scam Alerts, Rate Check, Feedback |
| Board and BoardPost | Reuse ClubHome / ClubPost with a board id | Same system as Fan Club, built once |

### Hire Artists and Gigs (`src/screens/modules/hire/`)

Gigs is an open gig board next to Hire Artists: GigsBoard (filter by craft, city, date, budget), GigPost (for posters), GigApply (portfolio and quote). It reuses JobsIndex, JobDetail and JobsApply.
| Page | Type | What it does |
|---|---|---|
| OpenForWork | New | Switch on/off; services and rates |
| HireRequests | New; reuses JobsApplications | Brand requests: accept, counter-offer, decline |
| Job steps | Reuse GigNegotiation → GigContract → GigDeliver → GigPayment | Linked to the real request id instead of fixed sample data |
| Brand side (optional, later) | New; reuses CommunityDirectory and the JobsApply form | ArtistSearch, PostBrief, BriefApplicants |

### Pro plan (`src/screens/modules/pro/`)
| Page | Type | What it does |
|---|---|---|
| ProPlan | New | Free vs Pro comparison; upgrade (demo) |

### Seeing the fan side in the demo
- Add a "Preview as fan" switch in Settings.
- It shows the fan screens: ClubJoin, SubmitWork, the SessionDetail payment and CheckoutSheet.
- A full Fan login comes later.

---

## 4. Old pages: hide now, delete later

**Hide from tabs and menus now. Delete once the new pages work:**
- Feed, Explore, Arena, Create tab
- Studio composers (Image, Text, Audio, Live), StudioDrafts, StudioContent
- PostDetail, PostsViewer, ReelViewer, SavedIndex, UserProfile
- Learning
- Community (after Club replaces it), Collab, Art marketplace
- Old merch editor: MerchIndex, MerchCreate, MerchMockup
- `onboarding/Complete.tsx` (already unused)
- Unused animation components

**Keep and reuse:**
- Settings, Finance, Merch Studio, Notifications
- Gigs screens (for Hire Artists)
- Inbox (for brand and booking chats)
- Camera (for snapping artwork)
- Analytics (becomes Insights)
- Reputation (later)

---

## 5. Order of work (demo, 1 developer)

| Step | What | Days |
|---|---|---|
| M0 | Foundations: store slices, services, mock data, new tabs, hide old pages | 3 |
| M1 | Onboarding with Instagram, Home, Profile and Insights | 4 |
| M2 | Link-in-bio: editor, blocks, templates, design, preview, share, web page | 6 |
| M3 | DM automation: list, editor, templates, test chat, activity | 5 |
| M4 | Ways to earn: tips, downloads, bookings, CheckoutSheet, Pro plan | 5 |
| M5 | Live Rooms: create, ticket page, room, ended | 5 |
| M6 | Fan Club, Show & Review, Artist Boards | 8 |
| M7 | Merch updates: AI mockups name, wall art, drops, snap artwork | 3 |
| M8 | Hire Artists (artist side) | 4 |
| M9 | Cleanup, bug fixes, testing on iPhone and Android | 3 |

**Total:** about 46 working days, roughly 9–10 weeks for one developer.
- With two developers, M5 to M8 can run in parallel, bringing it down to about 6 weeks.
- Every step ends with something that can be shown.

---

## 6. Bugs to fix along the way

- The app always opens Welcome, because the login is a stub. Use the saved `onboarded` flag until real login exists.
- Confetti never shows, because the confetti layer isn't rendered in `App.tsx`.
- Comments aren't saved, because they're missing from `partialize`.
- Picked images are saved as temporary file paths. Copy them into the app's own storage.
- Android is missing the `RECORD_AUDIO` permission, which Live Rooms and voice feedback need.
- The web store is on Vercel's free plan, which is non-commercial only. Move it to Cloudflare Pages or Firebase Hosting.

---

## 7. After the demo: connecting the real backend

Replace each mock service in `src/services/` with real calls. The screens stay the same.

1. Backend and real login (Instagram, Google, Apple)
2. Instagram sync. Start the Meta app review early, because it takes weeks.
3. Razorpay payments and payouts, which makes CheckoutSheet real
4. DM automation server (Instagram webhooks)
5. Link-in-bio page live at `underdawg.com/username`
6. Fan Club database, image and video storage (Cloudflare R2), push notifications
7. Live Rooms video: creator's own link first, LiveKit later
8. Hire Artists escrow (Razorpay Route)

---

## 8. Decisions needed

| Decision | Recommended |
|---|---|
| Tabs | Home · Page · + · Club · You |
| Fans | One app with Creator and Fan roles. The demo uses "Preview as fan" first |
| Old screens | Hide now, delete after the new pages work |
