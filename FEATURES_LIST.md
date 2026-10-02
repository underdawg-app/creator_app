# Underdawgs — Feature List

**Status tags:**
- **works**: works, and data stays on the phone after the app closes
- **partly**: some actions are saved, others are not
- **demo**: shows sample data only; buttons don't really do anything

No login, server, payments or AI are connected yet.

---

## Part 1 — Features in the app now

### Onboarding
- Splash animation and welcome slides — demo
- Phone number and OTP login (fake; any code passes) — demo
- Google login (not connected) — demo
- Choose role, craft, name, username and photo — works

### Explore (home feed)
- For You / Following / Rising tabs — works
- Filter by craft — works
- Like, double-tap to like, save, follow — works
- Comments (lost after leaving the screen) — partly
- Sponsored gig cards, "who to follow", challenge cards — demo
- Search, repost, share — demo

### Profile
- Profile page with bio, badges, stats and a setup checklist — works
- Edit profile, with photo picker and crop — works
- Profile visibility settings — works
- Other creators' profiles and follow — works
- Saved posts — works
- Posts / Videos / Written tabs (sample posts only) — demo
- Reels viewer (still images only) — demo

### Portfolio
- Portfolio page and public preview — partly
- Edit availability, tagline, niches, rates — works
- Add pieces and choose featured pieces — demo

### Create / Content Studio
- Camera: photo, video, flash, flip, gallery — works
- Image / video post composer — partly
- Text post (essay, poem, note) — works
- Audio post (recording is fake) — partly
- Drafts — works
- Schedule posts (they never auto-publish) — partly
- My content list — partly
- Go Live (no streaming) — demo

### Inbox / Messages
- Chat list with filters, archive and delete — works
- Chat with typing indicator and auto replies — works

### Gigs (jobs and brand deals)
- Job board with search and filters — works
- Job detail and apply — works
- My applications, my deals — works
- Rate card — works
- Negotiation chat, contract e-sign, deliverables, escrow payment — demo

### Merch Store Studio
- 6-step store builder — works:
  - name, logo and header image
  - theme and fonts
  - banner slides
  - layout, menu and footer
  - products
  - mockups
- Put your design on real product photos (tee, hoodie, mug, tote, poster, cap) — works
- Store preview and cart — demo
- Publish and share a live web store link — works
- Orders, merch analytics, hire a designer — demo

### Finance
- Balance, transactions, payment methods — demo
- Request payout — partly
- Tax estimate and invoice generator — demo

### Analytics
- Overview, audience, content performance, cross-platform, earnings — demo
- AI insights (fixed sample cards) — demo

### Audience
- Connect or disconnect social platforms (the switch saves; no account is really linked) — works
- Reach overview and top fans — demo
- Email list and landing page builder (can't be opened from the app) — partly

### Community
- First-visit setup — works
- Creator directory and follow — works
- Community feed, groups, events and RSVP — demo
- Mentorship, Q&A and polls — demo
- Challenges and the challenge video reel — demo

### Other modules
- Learning: courses and marking lessons done — works
- Art: list new artwork — works
- Art: buy and commissions — demo
- Reputation score, tiers and badges — demo
- ID verification steps — partly
- Tips — demo
- Collab requests — demo
- Notifications list — demo

### Settings
- Light / dark / system theme — works
- Privacy, notification and 2FA switches — partly
- Account, security, blocked users, help — demo
- Log out, reset demo data — works

### Outside the app
- Web storefront (`web-store/`), live on Vercel with a demo checkout
- Brand guidelines (`brand-guidelines/`), HTML and PDF

---

## Part 2 — Planned features (from the docs)

### Foundations
- Real login: email, Google, Apple, phone OTP, 2FA
- Backend server and database
- Payments: Razorpay / UPI and Stripe, with escrow
- Payouts with KYC (PAN / GST)
- Push notifications, email and SMS
- Media upload and storage
- Real AI features
- Crash reports, usage tracking, tests
- Hindi language
- Accessibility
- Web version

### Creator app
- Connect Instagram, YouTube, TikTok, Spotify and others for real
- Public profile website: `underdawg.com/username`
- Photo, video and audio editors
- 24-hour stories
- Cross-posting to other platforms
- Automatic scheduled publishing
- Live streaming (later)
- AI "For You" feed that boosts new creators
- Full search: creators, hashtags, sounds, places, jobs
- Audience sync from other platforms
- AI top-fan finder
- Email campaigns and SMS
- Link-in-bio page with custom domain
- Real analytics
- AI insights and content ideas
- Competitor tracking
- Real brand deals: contracts, e-sign, escrow, ratings, disputes
- Market rate guide and AI negotiation tips
- Get Viral paid campaigns
- Real merch: Printful mockups, checkout, printing and shipping
- Merch designer marketplace
- Own store domain: `underdawgstore.com/username`
- Art buying and commissions with deposit
- Real balance and payouts: bank, UPI, PayPal
- GST / TDS records and tax documents
- Invoices by email and income forecast
- Real-time chat with photos, voice and files
- Group chats
- Team roles: manager, assistant, editor
- Real reputation score
- ID + selfie verification and blue check
- Tips and fan subscriptions with real money
- Creator plans: Free / Creator+ ₹299 / Pro ₹799 / Elite ₹1,999 per month
- Notifications: quiet hours, daily digest
- Report, moderation, bans, appeals
- Automatic #ad label on paid posts
- Data export and delete account

### Other users and products
- Fan features: buy, tip, subscribe, vote
- Brand & Agency web portal:
  - find creators
  - post jobs
  - review applicants
  - deal workspace with escrow
  - Get Viral campaigns
  - analytics
  - team roles
  - agency roster and client tools
- Manager role
- Admin panel

### Web store next steps
- Each store saved online with its own address
- Share previews and a "not found" page
- Later: custom domain, image storage, real checkout

### Roadmap order (from the business plan)
1. Months 1–3: community and discovery
2. Months 4–6: challenges, merch, reputation score
3. Months 7–12: brand deals, Get Viral, subscriptions
4. Months 13–18: talent management
5. Year 4: financial products
