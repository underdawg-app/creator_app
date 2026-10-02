# Creator monetisation tools for Underdawg: tips, digital downloads, bookings, event tickets and a ₹299 Pro plan (features 12, 13, 14, 15, 18)

Research date: 2026-10-01. Scope: global, with extra depth on India.

How to read these notes:
- **Cited Findings** contains only facts verified on a page I opened. Each one has a source and a date.
- **Inferences** contains analysis. Items are tagged **[Inference]** (reasoned from the cited facts) or **[Assumption]** (not evidenced, so it needs validation).
- Where a source is weak (an SEO blog, a competitor's blog or a company self-claim), the bullet says so.
- **Search budget:** the session's web-search budget ran out partway through. After that, only pages at known URLs could be fetched. Everything that could not be verified is listed under **Gaps** and was not filled with guesses.
- **Country column:** a † after a country means it comes from general knowledge and was not re-verified in this pass.

---

## Feature 12: Tips (fans tip the artist via UPI in one tap, on the link page and in Instagram DMs)

### Takeaway
Tipping is a proven but low-yield, commodity mechanic. Ko-fi creators earned about $100M a year (Stripe data, 2023), and native gifting exists on Instagram, YouTube and Twitch. Most small creators, though, earn very little from any monetisation. In India, one-tap UPI tipping is easy to copy: an artist can already post a personal UPI QR code for free, and Indian creator tools (SuperProfile, Topmate, Instamojo, Razorpay Payment Pages) already take UPI-style payments. Tips do not create discovery on their own. **Preliminary verdict: Modify/Combine.** Ship it as a near-zero-cost "Support" block on the link page, with no platform fee. Use supporter signals only in fairness-normalised discovery. Do not build DM tipping flows until DM automation is proven.

### Cited Findings

#### (A) Problem validation: is there real demand and pain?
- **Demand exists at scale globally.** Stripe data on 50 platforms reported that creators were earning "$100 million a year on Ko-fi. Last year, that number was less than half." — [The Fintech Times, reporting Stripe creator-economy data, 8 Sep 2023](https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/)
- **Buy Me a Coffee** had "over 1 million creators". Its CEO said creators in the Philippines, India and Brazil are where "$100 means a lot". — [Mercury founder Q&A with Jijo Sunny, 6 Sep 2023](https://mercury.com/blog/founder-spotlight-jijo-sunny-buy-me-a-coffee)
- **Indian users already pay small amounts in social apps.** "ShareChat's virtual gifting feature generates $50 million annually." Wikipedia gives no date for this figure. — [Wikipedia: ShareChat, accessed 1 Oct 2026](https://en.wikipedia.org/wiki/ShareChat)
- **Most creators earn very little.** In Linktree's 2022 Creator Report (survey of 9,576 creators, fielded 2021):
  - 46% of full-time creators make less than $1K.
  - 68% of part-time creators make less than $1K.
  - 59% of beginner creators "haven't monetized yet".
  — [Linktree Creator Report 2022](https://linktr.ee/creator-report/)
- **Only a small share earn a living.** Stripe: creators earning a US living wage fell to 2.8% in 2022, from 4% in 2021. — [The Fintech Times / Stripe, 8 Sep 2023](https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/)
- **Musicians' finances are precarious (UK Musicians' Census 2023, 5,867 respondents):**
  - Average annual income from music is £20,700.
  - 29% earn up to £7,000 from music; 43% earn up to £14,000.
  - 44% cite lack of sustainable income as a career barrier.
  — [Musicians' Census 2023 Financial Insight Report (Help Musicians & Musicians' Union), Sep 2023](https://musicianscensus.co.uk/s/Musicians-Census-Financial-Insight-Report-Accessible-Format.docx)
- **The India-specific gap is only partly evidenced.**
  - Buy Me a Coffee's FAQ lists supporter methods as "all major Credit Cards, Apple Pay, and Google Pay". It does not list UPI. Payouts go via Stripe. — [BMC Help FAQ, updated 18 Mar 2026](https://help.buymeacoffee.com/en/articles/4539170-frequently-asked-questions)
  - Conflict: a search-result summary claimed BMC supports UPI in India. I could not verify this on an official page.
  - Stripe's India homepage shows a "Request an invite" call to action. — [Stripe India, accessed 1 Oct 2026](https://stripe.com/in)

#### (B) Competitor table: tips

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Ko-fi | UK† | One-off tips plus shop and memberships | Fans pay on the creator page via PayPal or Stripe. Tips carry 0% platform fee only if "Contributor" status is off; Contributor adds 5% on tips, and new accounts reportedly have it on by default. Shop, memberships and commissions carry 5% on the free plan. | Artists and creators worldwide | Free; Ko-fi Gold reportedly $12/month (search excerpts only) | Creators earned ~$100M/yr (Stripe, 2023) | Zero platform fee on tips if opted out; artist-heavy community | Trustpilot 4.6/5 from 779 reviews. Complaints include account suspension with posts removed (Sep 2026). | Relies on PayPal/Stripe; no UPI-native flow or DM delivery verified; no discovery for unknown artists | [Ko-fi Help: Contributor status](https://help.ko-fi.com/hc/en-us/articles/25143210488477-Contributor-status) (403 when fetched; quotes taken from search excerpt); [Fintech Times 2023](https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/); [Trustpilot](https://www.trustpilot.com/review/ko-fi.com) |
| Buy Me a Coffee | US† | Tips ("coffees"), memberships, shop | 5% platform fee plus Stripe 2.9% + $0.30. Adds +1% for non-US cards and +0.5% for subscriptions; 0.5% payout processing. Minimum payout $10. | Creators worldwide | Free plan; fee-based | 1M+ creators (2023) | Simple, well-known brand | Trustpilot 3.9/5 from 1,649 reviews. Complaints: suspensions, "funds locked", trouble withdrawing (Sep 2026). | Supporter methods listed are cards, Apple Pay and Google Pay only; no UPI listed | [BMC charges, 18 Mar 2026](https://help.buymeacoffee.com/en/articles/8105744-how-to-calculate-charges-on-your-payment); [BMC FAQ](https://help.buymeacoffee.com/en/articles/4539170-frequently-asked-questions); [Mercury 2023](https://mercury.com/blog/founder-spotlight-jijo-sunny-buy-me-a-coffee); [Trustpilot](https://www.trustpilot.com/review/buymeacoffee.com) |
| Instagram Gifts (Meta) | US | Native gifts on Reels, bought with Stars | Viewers buy Stars and send Gifts on Reels. Creator earns USD 0.01 per Star. Needs 500 followers, age 18+ and a professional account. India is eligible. Non-US payout minimum is $100 by wire or $25 by other methods. | Instagram creators | Free to the creator; Meta keeps the spread between Star price and payout | No reliable public data found on India payouts | Zero friction for fans already on Instagram | 500-follower threshold; Reels only | Excludes artists under 500 followers; no UPI; payout in USD | [WebHippo (secondary, cites Meta policies), 29 Jul 2026](https://webhippo.in/blog/instagram-monetization-india) |
| YouTube Super Thanks | US | Tips on uploaded videos | Creators get "70% of Super Thanks revenue recognized by Google… after taxes and fees… (including App Store fees on iOS)". YouTube currently covers card fees. | YouTube Partner Program creators | Free | No reliable public data found | Native and trusted | 30% platform share | YouTube-only; needs YPP | [YouTube Help](https://support.google.com/youtube/answer/10878910?hl=en) |
| Twitch Bits | US | "Cheering" with Bits on live streams | Viewers pay $1.40 for 100 Bits (desktop); the streamer gets $0.01 per Bit | Live streamers | Free | Oct 2021 leak: top earners included Critical Role at $9,626,712 (all revenue types) | Gamified and social | Twitch keeps ~28.6% of what viewers spend (derived) | Live-only; gaming-centric | [Streamlabs, updated 9 Feb 2024](https://streamlabs.com/content-hub/post/what-are-twitch-bits-worth); [Wikipedia: Twitch](https://en.wikipedia.org/wiki/Twitch_(service)) |
| TikTok LIVE Gifts | China/US | Virtual gifts on live streams | Not applicable in India | — | — | TikTok was banned in India on 29 Jun 2020, along with 58 other apps; the ban remains | — | — | Not a competitor for an India launch. Revenue split not verified. | [Wikipedia: Censorship of TikTok](https://en.wikipedia.org/wiki/Censorship_of_TikTok) |
| ShareChat / Moj virtual gifting | India | Virtual gifting in live sessions and chatrooms | Users buy virtual gifts for creators | Vernacular Indian audiences | Free to users; gifts paid | ~$50M/yr from gifting (date unspecified) | Shows Indians will pay small amounts in social contexts | No data gathered | Not artist-specific; closed app | [Wikipedia: ShareChat](https://en.wikipedia.org/wiki/ShareChat) |
| Topmate "Priority DM" | India-focused (Tracxn lists HQ as San Francisco) | Paid DMs (fans pay to message an expert) | Creator sets a price. Topmate takes 10% on direct sales and 20% on marketplace sales. The homepage also promotes "Instagram Auto DM". | Experts (career, tech, finance, astrology and similar) | Commission only | Homepage claims "1mn+ professionals" | Monetises DMs; INR pricing | Trustpilot shows no rating "due to a breach of Trustpilot's guidelines" and says fake reviews were removed | Paid access, not tips; not artist-focused | [Topmate pricing](https://topmate.io/pricing); [Topmate home](https://topmate.io/); [Trustpilot](https://www.trustpilot.com/review/topmate.io) |
| Razorpay Payment Pages | India | Do-it-yourself "support me" or donation page | Payment Pages cost 0.2% plus gateway fees. The standard gateway fee is 2% on UPI, cards and netbanking, plus 18% GST on the fee. Settles T+1. | Indian SMBs and creators | Pay-per-use | No data | UPI support; INR settlement | Generic UX | Generic: no artist identity, no thank-you flow, no discovery | [Razorpay pricing](https://razorpay.com/pricing/) |
| Instamojo Payment Links | India | Payment links usable as a tip link | Free "Quick" plan; transaction fee 2% + ₹3. Payout at T+3. | SMBs and creators | Freemium | No data | Simple | No data gathered | Generic | [Instamojo pricing](https://www.instamojo.com/pricing/) |
| Personal UPI ID or QR (person-to-person) | India | Personal UPI QR in the Instagram bio | Fan scans and pays from any UPI app | Everyone | Free: person-to-person UPI has zero merchant fee (MDR), and stays free under the 15 Oct 2026 framework | UPI processed 24.51 bn transactions in Aug 2026 | Zero fee, instant, universal | No receipts, thank-you or analytics; exposes the payee's personal name (inference) | Underdawg would add attribution, a supporter relationship, records and branding | [MediaNama, 28 Sep 2026](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/); [MediaNama, 17 Sep 2026](https://www.medianama.com/2026/09/223-upi-transactions-august-2026/) |

#### (H) Risks: cited evidence
- **Payout holds and account freezes are a recurring complaint on creator-payment platforms** (seen on at least three platforms, from independent reviewers):
  - Buy Me a Coffee: "My account was suddenly suspended… my legitimate donation funds are currently locked" (Trustpilot, 24 Sep 2026).
  - Gumroad: Trustpilot 1.4/5 from 417 reviews, citing payout holds and suspensions.
  - Ko-fi: "They suspend your account and remove all your posts" (24 Sep 2026).
  - Stan: funds stuck in "Processing Purchases".
  — [Trustpilot BMC](https://www.trustpilot.com/review/buymeacoffee.com); [Trustpilot Gumroad](https://www.trustpilot.com/review/gumroad.com); [Trustpilot Ko-fi](https://www.trustpilot.com/review/ko-fi.com); [Trustpilot Stan](https://www.trustpilot.com/review/stan.store)
- **Card disputes on Razorpay:** a dispute can be a fraud flag, a retrieval request, a chargeback, pre-arbitration or arbitration. "If you lose the dispute, the amount would be deducted from your account." The page shows UPI disputes are not covered. — [Razorpay Docs: Disputes](https://razorpay.com/docs/payments/disputes/)
- **NPCI ended person-to-person UPI "collect requests" from 1 Oct 2025** (circular dated 29 Jul 2025) to reduce fraud. Person-to-person payments must now be started by the payer, for example by scanning a QR code. "Request money" style tip prompts sent by DM are therefore not possible between individuals. — [Outlook Money, 16 Aug 2025](https://www.outlookmoney.com/banking/npci-to-end-upi-p2p-collect-requests-from-october-1-to-reduce-fraud)
- **Platform obligations if Underdawg handles the money:**
  - RBI issued its consolidated Master Direction on Payment Aggregators on 15 Sep 2025.
  - Payment aggregators may settle with marketplaces, which are now inside the "merchant" definition.
  - A payment aggregator must ensure it settles funds "only for sellers onboarded by marketplaces".
  - Lighter alternative KYC is allowed for merchants with annual turnover of ₹40 lakh or less.
  — [Cyril Amarchand Mangaldas client alert, 23 Sep 2025](https://www.cyrilshroff.com/wp-content/uploads/2025/10/Client-Alert-RBI-Introduces-Consolidated-Framework-for-Payment-Aggregators-3.pdf)

#### (J) India specifics: cited
- **UPI scale (Aug 2026):** 24.51 bn transactions worth ₹29.82 lakh crore. Average ticket ≈ ₹1,217 (July: ≈ ₹1,263). Volume +22% and value +20% year on year. 791 M transactions a day. — [MediaNama, 17 Sep 2026](https://www.medianama.com/2026/09/223-upi-transactions-august-2026/)
- **New UPI merchant-fee (MDR) framework from 15 Oct 2026:**
  - Free: person-to-person payments, merchant payments up to ₹2,000, and small merchants receiving up to ₹1 lakh a month.
  - Most merchant payments above ₹2,000: 0.4%, capped at ₹300.
  - Background: Parliament amended Section 10A of the Payment and Settlement Systems Act in Aug 2026 (assent 17 Aug 2026).
  — [MediaNama, 28 Sep 2026](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/); [Tech Times, 4 Aug 2026](https://www.techtimes.com/articles/322958/20260804/india-opens-door-upi-merchant-fees-parliament-amends-six-year-zero-mdr-law.htm)
  - Conflict: Tech Times reported industry proposals of 5–7 basis points before the 0.4% rate was notified.
- **Online gateways still charge on UPI.** Razorpay's standard 2% applies to UPI too, plus 18% GST on the fee. — [Razorpay pricing](https://razorpay.com/pricing/)
- **Instagram's own monetisation in India:** Gifts need 500 followers; Subscriptions need 10,000 followers. — [WebHippo (secondary, cites Meta), 29 Jul 2026](https://webhippo.in/blog/instagram-monetization-india)

### Inferences

#### (A) Problem framing
- **Problem being solved [Inference]:** fans have no low-friction, India-native way to give small amounts of money to an artist they like. Artists have no low-effort way to receive, acknowledge and record that money.
- **Severity: low to moderate [Inference].**
  - Tips are supplementary income. The survey evidence (Linktree 2022, Stripe 2023, Musicians' Census 2023) shows most creators earn little from any monetisation.
  - An unknown artist with a few hundred followers will usually receive few or no tips. [Assumption, consistent with the 59%-not-monetised and 46%-under-$1k figures]
- **Frequency [Inference]:** set up once. Inbound tips are occasional and bunch around releases, live streams and viral posts.
- **Segments most affected [Inference]:** musicians who busk or stream, illustrators and digital artists with engaged followings, performing artists. It is weakest for photographers and designers, who sell services instead.
- **Current workaround in India [Assumption, not verified with community evidence in this pass]:** a personal UPI ID or QR in the bio, link-in-bio payment pages (SuperProfile, Razorpay, Instamojo), or Instagram Gifts once eligible.
- **Why existing solutions fall short [Inference]:**
  - Global tip jars rely on Stripe/PayPal. BMC's FAQ lists no UPI, and Stripe India shows "request an invite".
  - Instagram Gifts exclude accounts under 500 followers and pay in USD.
  - A personal UPI QR gives no receipts, no fan relationship, no thank-you automation and no tax records.

#### (C) Uniqueness
- **Classification: Very common** globally and in India.
- **Functional uniqueness: none.** Tip jars and UPI payment pages already exist.
- **Audience uniqueness: low.** Ko-fi is artist-heavy globally. No India-specific artist tip product was verified.
- **Workflow uniqueness: modest.** Delivering a UPI tip link through Instagram DM automation is possible, but Stan, Topmate, SuperProfile and LinkDM already do Instagram auto-DMs for links.
- **Network uniqueness: weak.** Tips are single-player (one artist, their own fans).
- **Data uniqueness: moderate if designed for it.** "Who supports whom" across many artists would be a fan-intent graph that Instagram does not expose to third parties [Inference].
- **Discovery uniqueness: none by default.** It appears only if supporter data feeds a fair recommendation layer.
- **Combination uniqueness:** artists-only, UPI-native, link-in-bio plus DM, with a supporter graph. This combination appears uncommon, but every part is copyable.

#### (D) Artist value
- **Meaningful outcomes:** small income; a signal of high-intent fans who could be converted into ticket buyers or session clients [Inference].
- **Vanity risk:** a public tip count or leaderboard turns into a popularity contest and could shame unknown artists who receive nothing [Inference].

#### (E) Discovery impact and fair-discovery ideas
- **Direct impact:** none on new-artist discovery, search, local, genre or curator discovery.
- **Bias risk:** if tips or "supporters" feed ranking, money concentrates exposure on already-popular artists. The Twitch leak top earners and Stripe's 2.8% living-wage share both point to heavy concentration [Inference].
- **Fair-discovery mechanisms [Inference]:**
  1. Never rank by raw tip amount. Use supporters per active follower, capped.
  2. Give a "first supporter" boost only to artists below a follower threshold. This is the reverse of Instagram's 500-follower gate.
  3. After a tip, show the fan 2–3 similar emerging artists ("fans who support X also discover Y").
  4. Keep amounts private; show only "N people supported this month" for small artists.

#### (F) Behaviour
- **Why artists use it:** zero-effort, extra income.
- **Usage frequency:** rarely, after setup.
- **New content for it:** occasionally, for example "support my next release" posts.
- **Reason to return:** weak; notifications about a received tip might bring them back.
- **Invites other artists:** unlikely.
- **External sharing:** yes, the link-page "Support" button is shared on Instagram.
- **Network effect:** none, unless fans get a reusable supporter identity across artists.
- **Possible creator loop [Inference]:** fan tips → gets recommendations of similar emerging artists → follows or tips them → those artists see Underdawg-originated supporters → they share their own pages. This loop only works if Underdawg owns the fan-side post-payment experience.

#### (G) Category
- Monetisation (artist side) and light engagement.
- Not an acquisition or discovery feature unless redesigned as above.
- If Underdawg charges 0%, the platform earns nothing from it, which is still the right call to compete with a free personal UPI QR [Inference].

#### (H) Risks and how others handle them
- Refunds and chargebacks: card chargebacks via Razorpay; UPI disputes are separate.
- Fraud and money-mule risk: strangers sending money [Assumption].
- Tax: tips are likely taxable income for the artist. Whether GST applies to voluntary tips needs a CA opinion [Assumption].
- Payment-aggregator compliance: Underdawg must not hold funds. Use a licensed aggregator's split-settlement product such as Razorpay Route (0.1% + gateway fee).
- Low adoption: most artists receive nothing.
- How competitors handle it:
  - Ko-fi and BMC route money through Stripe/PayPal and review payouts, which produces "frozen funds" complaints.
  - YouTube keeps 30% and absorbs card fees.
  - Meta pays a fixed per-Star value.
- **Instagram DM tipping risk [Assumption]:** whether UPI deep links (`upi://`) are clickable inside Instagram DMs, and Meta's rules on automated messages that solicit payment, were not verified. Test before building.

#### (I) Scale dependency
- **Works at 1,000 artists** as a single-player tool.
- **Supporter-graph discovery** needs about 10k+ artists and enough repeat fans; it only becomes valuable at 100k+ [Inference].

#### (K) Preliminary verdict: Modify / Combine (lightweight build early; DM tipping is Experiment)
- Build as a zero-fee "Support" block on the link page that uses a UPI intent/QR plus gateway fallback. Tips alone will not attract or retain artists.
- Do not market tips as a reason to join.
- Make DM tipping an Experiment once DM automation is proven.
- Reason: very common, low yield for small audiences, and no inherent discovery value. The only differentiation is a fairness-aware supporter graph.

### Gaps
- No community discussions (Reddit or Discord) were collected on artists receiving zero tips, or on Indian creators' UPI-QR workarounds, because the search budget ran out. The "personal UPI QR" workaround is therefore an assumption.
- Ko-fi Gold price and Ko-fi's 2025–26 creator numbers could not be opened on official pages (403).
- No data found on average tip size in India, or on Instagram Gifts payouts in India.
- Not verified: Meta rules and API limits for DM payment links; UPI deep-link behaviour inside Instagram.
- Not verified: the TikTok gift revenue split. Irrelevant for India while the ban stands.

---

## Feature 13: Digital downloads (free assets for an email, or paid presets, brushes, beats, wallpapers, sample packs)

### Takeaway
Selling digital files is a large, proven category (Gumroad, Bandcamp, Stan, Payhip, Lemon Squeezy, Ko-fi Shop, and Topmate, SuperProfile and Instamojo in India). Fees range from 0% (on paid plans) to 10% + $0.50, and up to 30% when the platform itself brings the buyer. The part most aligned with Underdawg is **free downloads in exchange for an email or follow**, because it builds an audience the artist owns. Paid file sales are a commodity. A cross-artist asset marketplace, where artists discover and buy each other's brushes, presets or samples, is the one design that could create discovery. **Preliminary verdict: Modify.** Ship free-download-for-follow/email first (activation and audience growth); add paid files after product-market fit.

### Cited Findings

#### (A) Problem validation
- **The category is large:**
  - Bandcamp: "Fans have paid artists and their labels $1.81 billion". In the past year fans spent "$225 million on 15.7 million digital albums, 11.5 million tracks…". "An average of 82%" of each sale reaches the artist or label. — [Bandcamp About, accessed 1 Oct 2026](https://bandcamp.com/about)
  - Gumroad: "$1,964,052 … earned by Gumroad digital entrepreneurs last week". — [Gumroad About, accessed 1 Oct 2026](https://gumroad.com/about)
  - Stan: creators have generated "over $400 million" on the platform. — [Stan blog, updated 22 Jul 2026](https://stan.store/blog/stan-store-pricing/)
- **Selling downloads is a minority activity.** Among niche creators, 10% monetise through "Paid downloadable resources" and 10% through e-courses. — [Linktree Creator Report 2022](https://linktr.ee/creator-report/)
- **Fees and trust are real pain points:**
  - Gumroad charges "10% + $0.50" on direct sales and "30%" when the buyer finds the product through Gumroad Discover. — [Gumroad pricing](https://gumroad.com/pricing)
  - Gumroad's Trustpilot rating is 1.4/5 from 417 reviews. Complaints include payout holds, threshold increases from $10 to $100, suspensions and lost disputes, for example "$6,457.65 in total funds at issue… my account was suspended" (30 Aug 2026). — [Trustpilot Gumroad](https://www.trustpilot.com/review/gumroad.com)
- **India-specific fees:**
  - Instamojo online store: "5% + ₹3" on Lite/Starter and "2% + ₹3" on Growth (₹14,999/yr); digital products carry "higher rates". — [Instamojo pricing](https://www.instamojo.com/pricing/)
  - A 2026 comparison by Peerseek (a competitor's blog) puts Instamojo digital goods at "5% + ₹3". — [Peerseek, 24 Jul 2026](https://peerseek.io/blogs/creator-platform-fees-india-compared)

#### (B) Competitor table: digital downloads

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Gumroad | US† | Paid and free digital products | 10% + $0.50 per direct sale; 30% via Discover; payment processing included. Merchant of record from 1 Jan 2025, handling global sales tax. | Indie creators | No monthly fee; per-sale fee | ~$1.96M earned by creators in one week (observed Oct 2026) | Handles global tax; has a discovery marketplace | Trustpilot 1.4/5: payouts, suspensions, disputes. Banned sexually explicit content in Mar 2024. | Charges 30% for platform-driven discovery; USD-first; not artist-only | [Gumroad pricing](https://gumroad.com/pricing); [About](https://gumroad.com/about); [Wikipedia](https://en.wikipedia.org/wiki/Gumroad); [Trustpilot](https://www.trustpilot.com/review/gumroad.com) |
| Payhip | UK† | Digital downloads, coaching, memberships | Free plan 5% fee; Plus $29/mo at 2%; Pro $99/mo at 0%. PayPal/Stripe fees extra. All plans get the same features. | Creators | Freemium | No reliable public data found | No feature-gating | No data gathered | No UPI or discovery verified | [Payhip pricing](https://payhip.com/pricing) |
| Lemon Squeezy | US (now with Stripe) | Digital products, SaaS | 5% + 50¢ per transaction; merchant of record. Page notes a "2026 Update: Lemon Squeezy + Stripe Managed Payments". | Software and digital sellers | Fee-based | No reliable public data found | Global tax handled | No data gathered | Not creator-community oriented | [Lemon Squeezy pricing](https://www.lemonsqueezy.com/pricing) |
| Stan Store | US† | Link-in-bio store: digital products, email lead magnets, Stan AutoDM | Creator $29/mo ($300/yr); Creator Pro $99/mo ($948/yr). "Zero transaction fees" (official); Stripe/PayPal fees apply. 14-day trial. | Creators and coaches | Paid only | "Over $400 million" generated (2026). Trustpilot 4.7/5 from 2,180 reviews. | Lead magnets plus Instagram AutoDM in one tool, the closest analogue to Underdawg | Funds stuck in "Processing Purchases"; support delays (Trustpilot, Sep 2026). Conflict: some third-party reviews say the Creator plan charges 5% (not verified). | Generic creator tool; USD; no artist network | [Stan blog](https://stan.store/blog/stan-store-pricing/); [Trustpilot](https://www.trustpilot.com/review/stan.store) |
| Beacons | US† | Link-in-bio store | Free with 9% fee; Creator Pro $10/mo with 9% fee; Store Pro $30/mo at 0%; Business Pro $90/mo at 0% | Creators | Freemium | No reliable public data found (official page returned 403) | Cheap entry plan | 9% fee on lower plans | Not artist-only; no UPI | [The Leap review (competitor), 3 May 2024, updated Mar 2025](https://www.theleap.co/blog/beacons-pricing/) |
| Ko-fi Shop | UK† | Shop for digital files and commissions | 5% fee on the free plan; 0% with Gold | Artists | Freemium | See tips row | Artist community | See tips row | No UPI | [Ko-fi Help (search excerpt)](https://help.ko-fi.com/hc/en-us/articles/25143210488477-Contributor-status) |
| Kit (ConvertKit) | US† | Email list plus digital product commerce | "Free—up to 10,000 subscribers". Creator $33/mo, Pro $66/mo. Commerce fee "3.5% + 30c". | Newsletter creators | Freemium | No data | Email capture is the core | No data gathered | Not a link-in-bio for artists | [Kit pricing](https://kit.com/pricing) |
| Bandcamp | US | Music downloads and merch, with discovery | 15% on digital sales (10% after $5k in sales); 10% on physical; artist gets 82% on average | Musicians and labels | Free; revenue share | $1.81B paid to artists cumulatively; $225M in the past year | Fan collections and discovery; trusted by indie musicians | Ownership churn: Epic (2022), then Songtradr (2023), when about half of staff were not offered jobs | Music-only; not UPI | [Bandcamp About](https://bandcamp.com/about); [Wikipedia](https://en.wikipedia.org/wiki/Bandcamp) |
| Topmate (digital products/courses) | India-focused | Sell courses and products | 10% direct; 20% via marketplace | Experts | Commission | "1mn+ professionals" (company claim) | INR; has a marketplace | Trustpilot flags removed fake reviews | Career/tech categories; not artists | [Topmate pricing](https://topmate.io/pricing); [Topmate home](https://topmate.io/) |
| SuperProfile (by Cosmofeed) | India (Gurgaon) | Link-in-bio, digital products, payments, AutoDM | Starter free at 10%; Premium ₹11,999/yr at 5%; Pro ₹49,999/yr with custom fee. Branding removal only on Pro. | Indian creators | Freemium | "Roughly 50,000 creators" (secondary, 2026). Cosmofeed had 3,000 creators in Nov 2022. | INR-native; AutoDM | Payout delays reported (secondary). AutoDM is single-trigger, with no multi-step flows (secondary). | Generic creator tool; not artists-only | [SuperProfile plans (help)](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro); [CreatorLane (secondary), Jul 2026](https://creatorlanehq.com/learn/superprofile); [Entrackr, 18 Nov 2022](https://entrackr.com/2022/11/cosmofeed-helps-creators-monetize-content-more-efficiently/) |
| Instamojo | India† | Online store and digital products | Lite (₹0) and Starter (₹6,999/yr) at 5% + ₹3; Growth (₹14,999/yr) at 2% + ₹3; GST extra; payout T+3 | SMBs and creators | Freemium | No data | INR/UPI | No data gathered | Generic | [Instamojo pricing](https://www.instamojo.com/pricing/) |

#### (H) Risks: cited
- Refunds and chargebacks: Gumroad sellers report losing disputes and payout suspensions (Trustpilot, above).
- Tax handling as a differentiator: Gumroad (from 2025) and Lemon Squeezy are merchants of record that collect and remit global sales tax. — [Gumroad pricing](https://gumroad.com/pricing); [Lemon Squeezy](https://www.lemonsqueezy.com/pricing)
- **India TDS (Section 194-O):** e-commerce operators deduct TDS at 0.1% (cut from 1% on 1 Oct 2024). No deduction is required for individual/HUF sellers whose gross sales do not exceed ₹5 lakh. The rule covers "goods, services, or both". — [ClearTax: Section 194-O](https://cleartax.in/s/section-194o)
- Content-policy risk: Gumroad banned sexually explicit content in March 2024. — [Wikipedia: Gumroad](https://en.wikipedia.org/wiki/Gumroad)

### Inferences
- **(A) Problem framing [Inference]:**
  - Artists who make reusable assets (presets, brushes, beats, LUTs, wallpapers, sample packs) need a cheap, India-native checkout and a way to turn followers into an owned audience.
  - Severity is moderate for asset-making segments (music producers, photographers, illustrators, designers) and low for performers.
  - Frequency: occasional product launches; ongoing passive sales.
  - Workaround: Gumroad, Instamojo, Topmate, SuperProfile, or Google Drive links plus a UPI QR [Assumption].
  - Why existing tools fall short: fees, payout holds and USD-first checkout (Gumroad); generic creator tools (SuperProfile, Topmate) with no artist audience to sell into.
- **(C) Uniqueness:**
  - Classification: **Very common.**
  - Functional uniqueness: none.
  - Audience uniqueness: low. Bandcamp is musician-specific; ArtStation-type marketplaces exist but were not verified this pass.
  - Workflow uniqueness: free download in exchange for an Instagram DM opt-in plus email is already done by Stan (lead magnets plus AutoDM).
  - Network uniqueness: **real potential.** Artists are buyers of other artists' assets (brushes, presets, samples), so an artists-only network has a built-in buyer pool [Inference].
  - Data uniqueness: download-for-follow data shows which assets convert strangers into fans. That is a useful discovery signal [Inference].
  - Combination uniqueness: artists-only asset discovery plus 0% free downloads plus UPI. Uncommon in India.
- **(D) Artist value:** free-for-email gives a **meaningful** owned audience, resilient to Instagram's algorithm. Paid files give meaningful but small income for most. Download counts alone are vanity unless tied to follows and emails.
- **(E) Discovery:**
  - Free asset packs can act as a discovery surface. Searchable by style, skill and tool, they help skill, style and cross-discipline discovery: a photographer finds a colourist's LUTs.
  - Bias risk: best-seller lists favour incumbents. Gumroad and Topmate even charge more (30% and 20%) for marketplace-driven sales, which shows platforms treat discovery as a premium.
  - Fair-discovery ideas:
    1. Rotate "new and under-1k-follower" packs into every category page.
    2. Charge 0% extra for Underdawg-driven sales to emerging artists; the reverse of Gumroad Discover.
    3. Bundle packs from several emerging artists ("starter kits").
- **(F) Behaviour:**
  - Why artists use it: to grow a list and earn.
  - Frequency: occasional launches, with weekly checks of downloads.
  - Creates content for it: **yes.** Artists make freebies and promote them with Reels.
  - Reasons to return: download notifications.
  - Invites other artists: possibly, through collaborative bundles.
  - External sharing: **yes**, download links shared on Instagram.
  - Network effect: weak to moderate, through the artist-to-artist asset market.
  - Creator loop: artist posts a free pack → Instagram audience and other artists download (with follow/email) → downloaders see related emerging artists' packs → some upload their own packs → catalogue grows → more search traffic.
- **(G) Category:** acquisition (free downloads pull people in via shared links), activation (a quick first win), monetisation, and possible discovery.
- **(H) Risks [Inference/Assumption]:**
  - Piracy and resharing of paid files.
  - Copyright: uploading others' samples or fonts, and AI-generated packs.
  - Refunds on digital goods.
  - TDS/GST once sales exceed thresholds.
  - Fake or low-quality packs: needs moderation.
  - Storage and bandwidth costs.
  - How competitors handle it: becoming merchant of record (Gumroad, Lemon Squeezy), content bans (Gumroad, 2024), payout reviews.
- **(I) Scale:**
  - Single-player sales work at 1,000 artists.
  - Cross-artist asset discovery needs about 10k+ artists with enough packs per style.
  - A self-sustaining marketplace needs 100k+ [Inference].
- **(J) India:**
  - Indian alternatives already charge 5–10% (SuperProfile, Topmate, Instamojo, Graphy, Exly).
  - Payments of ₹2,000 or less carry zero MDR even after 15 Oct 2026, but gateways still charge about 2% + GST (Razorpay).
  - A 0% platform fee on free and low-priced packs would stand out [Inference].
- **(K) Preliminary verdict: Modify.**
  - Build early: free-download-for-follow/email, because it serves audience building and activation.
  - Build after product-market fit: paid files, with UPI and 0–5% fees.
  - Experiment: an artists-only asset discovery page.

### Gaps
- No verified data on typical or median earnings per digital-product seller on Gumroad, Payhip or Indian platforms.
- BeatStars, Splice and ArtStation Marketplace fees could not be verified (pages truncated or not fetched).
- Etsy digital-download fees: page blocked (403).
- No Indian community evidence gathered on piracy, or on preset and brush selling.

---

## Feature 14: Bookings and 1:1 sessions (fans pick a slot, pay a deposit, get a meeting link)

### Takeaway
Paid 1:1 time has the strongest monetisation evidence of the five features.
- Topmate's creators earned ₹1.80 crore in Sept 2023, of which 1:1 calls were ₹70.5 lakh (about 39%).
- Teaching is a core income line for musicians: 36% of UK musicians are private music teachers, and 19% lead community music or workshops.

But the market is crowded: Topmate, Calendly, Cal.com (free, with payments), Stan, Beacons, Exly, Payhip and Intro. India already has a dominant player (Topmate), though its categories are career, tech, finance and astrology rather than art. The artists-only twist is portfolio reviews, lessons and peer critique with a discovery directory. **Preliminary verdict: Experiment, then build after PMF.**

### Cited Findings

#### (A) Problem validation
- **Topmate, Sept 2023:** creators earned "₹1,79,87,317"; "1:1 Calls Revenue: ₹70.5 lakh"; "13.6 lakh minutes" of interaction; "12.1k" new creators onboarded that month. — [Ankit Agarwal (Topmate co-founder) on LinkedIn, ~Oct 2023](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O)
- **Teaching and workshops are major roles for musicians:**
  - 36% of respondents work as private music teachers; 20% as peripatetic teachers; 19% as community musicians or workshop leaders; 80% as performers.
  - "On average, a working musician holds 3-4 different roles."
  - "25% of respondents reported not knowing anyone in the industry as a barrier."
  — [Musicians' Census 2023 (UK), Sep 2023](https://musicianscensus.co.uk/s/Musicians-Census-Financial-Insight-Report-Accessible-Format.docx)
- **Demand-side marketplace precedent:** Intro sells video calls with "the world's most in‑demand experts". Example prices: $79–$125 for entry-level experts, $900 for interior designer Nate Berkus, $2,500 for Neil Parikh. It offers a "money back" guarantee. Categories: Career & Business, Home Decor, Style & Beauty, Wellness, Astrology. **No art or music categories.** — [Intro homepage, accessed 1 Oct 2026](https://intro.co/)
- **Topmate's creator categories:** Career, Data & AI, Study Abroad, Software, HR, Finance, Startup Mentor, Astrology, Marketing, Product & Design, Others. Product & Design is the only creative-adjacent category. — [Topmate homepage](https://topmate.io/)
- **Earnings skew on Topmate (low confidence):** a payments company's blog claims the bottom 80% of Topmate creators earn under ₹5,000/month, and that "nearly everyone making ₹5,000+ monthly was already successful elsewhere". It cites **no data source**. — [EximPe blog, 2 Feb 2026, updated 28 Mar 2026](https://eximpe.com/blog/payments/topmate-io-the-complete-guide-to-getting-started-earning-money-avoiding-pitfalls)
- **Standalone paid-call platforms have struggled:** superpeer.com now redirects (301) to skillshare.com (observed 1 Oct 2026). Superpeer no longer operates as a standalone product. — [superpeer.com redirect](https://superpeer.com/)

#### (B) Competitor table: bookings and 1:1 sessions

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Topmate | India-focused (Tracxn lists HQ as San Francisco) | 1:1 sessions, Priority DM, webinars, packages, products, Instagram Auto DM | Creator lists services and fans book and pay. 10% fee on direct sales, 20% on marketplace sales. Custom pricing above ₹10L/month. | Experts and mentors | Commission only, no subscription | ₹1.80 cr creator earnings in Sept 2023 (₹70.5 lakh from 1:1). Homepage claims "1mn+ professionals". Tracxn: $1.13M raised over 4 rounds (Tracxn's round-level detail looked inconsistent). | INR checkout; marketplace demand; bundled Auto DM | Trustpilot shows no rating due to a guideline breach, with fake reviews removed. Secondary sources put the all-in fee at ~13–18% including gateway and FX (low confidence). | Not artist-focused; ranks by bookings and reviews (inference) | [Pricing](https://topmate.io/pricing); [Home](https://topmate.io/); [LinkedIn](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O); [Tracxn](https://tracxn.com/d/companies/topmate/__0feQnNqxu633GVIOYt_LQu9YkfyWhOqrZyDJy8IiSew/funding-and-investors); [Trustpilot](https://www.trustpilot.com/review/topmate.io) |
| Calendly | US | Scheduling with payment collection | Standard plan $10/seat/mo can "Collect payments at booking via Stripe and PayPal". Teams $16. Free plan exists. | Professionals and teams | Freemium | "Join 20 million professionals". Valued at $3B in Jan 2021. | Ubiquitous; reliable | No complaint data gathered | No storefront or discovery; Stripe/PayPal only | [Calendly pricing](https://calendly.com/pricing); [Home](https://calendly.com/); [Wikipedia](https://en.wikipedia.org/wiki/Calendly) |
| Cal.com | US† (open source) | Scheduling with payments and video links | Free plan includes "Accept Stripe & PayPal payments" and adds Google Meet, Zoom or Cal Video links automatically. Teams $12/user/mo. | Individuals and teams | Free core | No reliable public data found | Free; open source | No data gathered | No UPI verified; no discovery | [Cal.com pricing](https://cal.com/pricing) |
| Stan Store | US† | Coaching calls and 1:1 booking calendar | Included in the $29/mo Creator plan | Coaches and creators | Paid | See downloads row | Bundled with store and AutoDM | Support delays (Trustpilot) | USD; generic | [Stan blog](https://stan.store/blog/stan-store-pricing/) |
| Beacons | US† | Appointment booking | Booking only on Store Pro ($30/mo) and above | Creators | Paid tiers | No data | — | — | — | [The Leap review](https://www.theleap.co/blog/beacons-pricing/) |
| Exly | India† | 1:1 consultations, workshops (online and offline), digital products | Starter 10% commission; Pro ₹2,500/mo at 6%; Premium ₹9,000/mo at 3% | Coaches and creators | Freemium | No reliable public data found | Supports offline sessions | No data gathered | Generic | [Exly pricing](https://exlyapp.com/pricing) |
| Intro | US† | Curated expert video-call marketplace | Experts set the price (examples $79–$2,500); money-back guarantee | Buyers seeking famous experts | Paid per session | No reliable public data found | The marketplace brings the buyers | Commission not disclosed | Celebrity-skewed; no art or music categories | [Intro](https://intro.co/) |
| Payhip (coaching) | UK† | Coaching on all plans | Fees 5% / 2% / 0% by plan | Creators | Freemium | No data | — | — | — | [Payhip pricing](https://payhip.com/pricing) |
| Superpeer (former) | US† | Paid 1:1 video calls and streams for creators | Domain now redirects to Skillshare | — | — | No longer a standalone product | — | — | A cautionary precedent | [superpeer.com](https://superpeer.com/) |

#### (H) Risks: cited
- India TDS 0.1% under Section 194-O applies to services sold via e-commerce operators above the ₹5 lakh threshold. — [ClearTax](https://cleartax.in/s/section-194o)
- Session prices above ₹2,000 paid to non-small merchants will carry 0.4% MDR from 15 Oct 2026. — [MediaNama, 28 Sep 2026](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/)
- Trust in experts can be manipulated: Trustpilot removed fake reviews for Topmate. — [Trustpilot](https://www.trustpilot.com/review/topmate.io)

### Inferences
- **(A) Problem framing [Inference]:**
  - Artists who teach or consult (music lessons, portfolio reviews, design or photo critiques, dance classes, production feedback) need booking, deposit and payment, and a meeting link in one flow.
  - On the demand side, emerging artists want affordable feedback and mentorship.
  - Severity: moderate to high for teaching musicians and design or illustration mentors; low for others.
  - Frequency: weekly for active teachers.
  - Workaround: Instagram DMs, then WhatsApp, then a UPI QR and a Google Meet link [Assumption, not verified with community evidence]; or Topmate or Calendly.
  - Why existing tools fall short:
    - Topmate's categories and marketplace are career/tech-led.
    - Calendly and Cal.com take Stripe/PayPal, not native UPI [Assumption for UPI].
    - None of them give artists discovery among other artists or brands.
- **(C) Uniqueness:**
  - Classification: **Very common.**
  - Functional uniqueness: none. "Deposit" logic specifically was not verified at competitors.
  - Audience uniqueness: **moderate opportunity.** No verified art- or music-focused 1:1 marketplace in India in this pass.
  - Workflow uniqueness: low.
  - Network uniqueness: **high potential.** Artist-to-artist sessions (peer portfolio reviews, mentorship from slightly more established artists) use both sides of an artists-only network.
  - Data uniqueness: session ratings would give credibility and skill data (who gives good feedback in which discipline) [Inference].
  - Discovery uniqueness: a "Get a review from…" directory ranked fairly could expose unknown but skilled artists.
  - Combination uniqueness: artists-only plus skill-verified sessions plus UPI plus discovery appears rare in India.
- **(D) Artist value:**
  - Meaningful: paid work, constructive feedback (for the buyer), credibility through ratings, and professional relationships that lead to collaborations.
  - Vanity risk is low, except "number of bookings" badges.
- **(E) Discovery:**
  - Good potential for skill discovery and collaboration discovery.
  - Bias risk: review-count ranking favours early or popular mentors (Topmate's marketplace is plausibly like this; not verified).
  - Fair-discovery ideas:
    1. A new-mentor lane with exposure quotas.
    2. Rank by rating quality, with Bayesian smoothing, not volume.
    3. Price-band filters so affordable emerging mentors surface.
    4. "First 3 sessions free of platform fee".
- **(F) Behaviour:**
  - Frequency: weekly for teachers, rarely for others.
  - Creates content for it: yes, for example "I'm opening 5 portfolio-review slots" posts.
  - Reasons to return: calendar and booking notifications. This is a real retention driver for the teaching segment.
  - Invites other artists: yes, mentees become users.
  - Network effect: moderate (artist-to-artist).
  - Creator loop: an established-but-small artist offers ₹499 reviews → emerging artists book → mentees publish improved work on Underdawg → mentor and mentee both gain credibility signals → some mentees later offer sessions.
- **(G) Category:** monetisation, retention (for teachers), engagement (artist-to-artist), and discovery (if there is a directory).
- **(H) Risks:**
  - No-shows, refunds and disputes over quality.
  - Safety for 1:1 calls: harassment, minors taking lessons [Assumption].
  - Fake mentors and fake reviews (Topmate precedent).
  - Video-link reliability.
  - Tax: 194-O TDS above ₹5 lakh, and GST if the artist exceeds thresholds (thresholds not verified this pass).
  - MDR on sessions above ₹2,000 from Oct 2026.
- **(I) Scale:**
  - Single-player booking works at 1,000 artists.
  - A peer-review marketplace needs about 10k artists across disciplines for liquidity, and 100k for strong matching [Inference].
- **(J) India:**
  - Topmate is the reference product and charges 10%.
  - Exly offers a 10% commission tier, or 3–6% on paid plans.
  - Underdawg would compete on artist focus and discovery, not on fees alone.
  - Payment to Calendly/Cal.com depends on Stripe or PayPal. Stripe India shows "request an invite" [Inference: friction for Indian artists].
- **(K) Preliminary verdict: Experiment, then build after PMF.**
  - Run a narrow pilot: paid portfolio reviews for visual artists, plus music lessons.
  - Use a deposit or full prepayment through the payment aggregator, with an auto-generated Meet link.
  - Measure repeat bookings and whether mentees publish work and stay.
  - If artist-to-artist demand is real, combine it with collaboration and credibility features (feature dependency).

### Gaps
- No verified data on no-show rates for creator sessions.
- Not verified: whether Calendly or Topmate support deposits (part-payments).
- Not verified: UPI support on Calendly or Cal.com.
- Intro's commission and Clarity.fm's fee could not be verified.
- Superpeer's acquisition or shutdown terms were not verified; only the redirect was observed.
- No Indian data on music-lesson or portfolio-review pricing.

---

## Feature 15: Event tickets (sell tickets for shows, workshops and gigs)

### Takeaway
Ticketing is mature and capital-intensive.
- Globally: Eventbrite (3.7% + $1.79 per ticket, plus 2.9% processing; acquired by Bending Spoons for ~$500M, closing Mar 2026), Luma (5% on the free plan), Allevents ($1 per ticket) and Ticket Tailor (£0.60 per ticket).
- India: District by Zomato (which absorbed Paytm Insider for ₹2,048 crore in 2024) and BookMyShow, with Skillbox, Townscript, Allevents and Exly for niche or small events.

For emerging artists the bottleneck is filling the room (discovery and audience), not issuing tickets. The ops burden is high: refunds, cancellations, venue disputes, payouts that arrive after the event, GST, and 0.4% MDR above ₹2,000. **Preliminary verdict: Deprioritise ticketing. Combine instead into a local gigs/workshops discovery calendar** that links out to existing ticketing (with an optional simple RSVP or ticket for small workshops later).

### Cited Findings

#### (A) Problem validation
- **Live performance is central for musicians, but pay is stagnant:**
  - 80% of musicians work as performers.
  - "Fees for most performance opportunities [are] the same as they were 20 years ago" (respondent quote).
  - "Rehearsals are often unpaid".
  - The average income from music is £20,700.
  — [Musicians' Census 2023 (UK)](https://musicianscensus.co.uk/s/Musicians-Census-Financial-Insight-Report-Accessible-Format.docx)
- **Eventbrite fees and payout timing are frequent complaints:**
  - Trustpilot lists "Service Fees" as the most common complaint, alongside payout delays: "Pay out is days after the event" (Sep 2026).
  - Rating: 4.4/5 from 12,454 reviews.
  — [Trustpilot Eventbrite](https://www.trustpilot.com/review/www.eventbrite.com)
- **Eventbrite fees (US):** "3.7% + $1.79 service fee per ticket" plus "2.9% payment processing fee per order". Free events have no fees. Buyers pay the fees by default. — [Eventbrite organizer pricing](https://www.eventbrite.com/organizer/pricing/)
- **Indian market consolidation:**
  - Zomato acquired Paytm's entertainment ticketing business (Paytm Insider and TicketNew) for about ₹2,048 crore (US$244M) in Aug 2024, to be integrated into the District app. — [Wikipedia: Paytm](https://en.wikipedia.org/wiki/Paytm)
  - insider.in now 301-redirects to district.in (observed 1 Oct 2026). District offers "List your events" for organisers. — [District](https://www.district.in/)

#### (B) Competitor table: event tickets

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Eventbrite | US | Ticketing plus an event marketplace | 3.7% + $1.79 per ticket, plus 2.9% processing (US). Free events cost nothing. Eventbrite Pro email marketing from $15/mo. | Organisers worldwide | Free plus per-ticket fees | 2023 revenue US$326M. Bending Spoons deal of ~$500M announced 2 Dec 2025, closed 10 Mar 2026. | Discovery marketplace; mature tooling | Trustpilot 4.4/5 (12,454 reviews): fees, payouts after the event, navigation | Fees are heavy on cheap tickets (derived: ~15.6% on a $20 ticket); not India-focused | [Pricing](https://www.eventbrite.com/organizer/pricing/); [Wikipedia](https://en.wikipedia.org/wiki/Eventbrite); [Trustpilot](https://www.trustpilot.com/review/www.eventbrite.com) |
| Luma | US† | Event pages, ticketing, calendars, invites | Free plan: "5% platform fee for paid events" plus Stripe ~2.9% + 30¢. Luma Plus: $59/mo billed annually, 0% platform fee. Email, SMS, push and WhatsApp blasts; regional payment methods. | Communities, tech, creators | Freemium | No reliable public data found | Beautiful pages; invite blasts; calendars | No data gathered | Not artist-specific; Stripe-based | [Luma pricing](https://luma.com/pricing) |
| District (Zomato / Eternal) | India | Movies, events, dining; self-serve "List your events" | Organiser fees not publicly listed | Mass consumers and organisers | — | Absorbed Paytm Insider and TicketNew (₹2,048 cr, Aug 2024) | Mass consumer reach (inference) | No public organiser fee data | Indie artists compete with big events for attention (inference) | [District](https://www.district.in/); [Wikipedia: Paytm](https://en.wikipedia.org/wiki/Paytm) |
| Allevents | India/global† | Event discovery plus ticketing | Free listing and ticketing; $1 per ticket attendee fee, which the organiser can absorb. Paid plans $12, $60 and $200 a month for more active events. INR payouts "3-4 business days after the event". | Organisers | Freemium | Claims "20M+ event-goers" and "10M+ users" | Discovery plus low fees | Payout only after the event (INR) | Not artist-specific | [Allevents pricing](https://allevents.in/pages/pricing) |
| Ticket Tailor | UK† | Flat-fee ticketing | £0.60/ticket pay-as-you-go, from £0.22 prepaid. No fee on up to 5,000 free tickets a year. Processing is separate. No INR listed. | Independent organisers | Per-ticket fee | No data | Low flat fees | No INR | Not usable for INR | [Ticket Tailor pricing](https://www.tickettailor.com/pricing/) |
| Exly | India† | Workshops (online or offline sessions) | Commission 3–10% depending on plan | Coaches and creators | Freemium | No data | Fits workshops | — | Not gig ticketing | [Exly pricing](https://exlyapp.com/pricing) |
| Topmate | India-focused | "Host a webinar" | 10% / 20% commission | Experts | Commission | See bookings row | — | — | Online only | [Topmate](https://topmate.io/) |
| BookMyShow; Skillbox; Townscript | India | Ticketing (mass market; indie gigs; self-serve) | Not verified: BookMyShow blocked fetching, and the Skillbox and Townscript pages returned no content | — | — | No reliable public data retrieved this pass | — | — | — | Fetch attempts failed (see Gaps) |

#### (H) Risks: cited
- Payout timing: Allevents pays INR proceeds 3–4 business days after the event, and Eventbrite reviewers complain about payouts after the event. Both show that platforms hold funds against cancellation and refund risk. — [Allevents](https://allevents.in/pages/pricing); [Trustpilot](https://www.trustpilot.com/review/www.eventbrite.com)
- Fee pass-through norms: Eventbrite and Allevents charge buyers by default and let organisers absorb fees instead. — [Eventbrite](https://www.eventbrite.com/organizer/pricing/); [Allevents](https://allevents.in/pages/pricing)
- India MDR: tickets above ₹2,000 paid to a non-small merchant will carry 0.4% (capped at ₹300) from 15 Oct 2026. — [MediaNama](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/)
- Tax-compliance precedent: Luma Plus includes "tax collection", which suggests tax handling is a paid-tier need. — [Luma](https://luma.com/pricing)

### Inferences
- **(A) Problem framing [Inference]:**
  - Problem: emerging performers and workshop hosts struggle to (a) find audiences for small gigs and (b) collect money without high fees or delays.
  - Severity: high for (a), moderate for (b).
  - Frequency: monthly or occasional, per event.
  - Segments: musicians, comedians, dancers, theatre, and visual artists running workshops.
  - Workaround [Assumption]: venue-run ticketing, Instagram plus a UPI QR, Skillbox, District, Townscript, or Google Forms.
  - Why existing tools fall short: mass marketplaces bury small gigs; fees bite on ₹200–₹500 tickets; payout comes after the event.
- **(C) Uniqueness:**
  - Classification: **Very common.**
  - Functional uniqueness: none.
  - Audience uniqueness: low to moderate. Skillbox reportedly targets indie gigs, but this was not verified.
  - Network uniqueness: **moderate.** An artist network enables co-bills (an emerging artist opening for a known one), venue and curator discovery, and "artists near you this week".
  - Data uniqueness: city × genre × attendance data is a valuable local-scene graph [Inference].
  - Discovery uniqueness: a local gig calendar for under-discovered artists appears rare in India (unverified).
  - Combination uniqueness: artists-only plus local discovery plus a lightweight RSVP.
- **(D) Artist value:**
  - Meaningful: real audience growth, local credibility, and venue or curator relationships.
  - Vanity risk: "interested" counts that don't convert.
- **(E) Discovery:**
  - Strong potential for local, genre and serendipitous discovery, but only with city density.
  - Bias: popularity-sorted event lists favour big acts.
  - Fair-discovery ideas:
    1. A "small rooms" filter (capacity under 150).
    2. An "emerging artists on the lineup" tag.
    3. Follow-based gig alerts for artists you follow, the Bandsintown-style mechanism (Bandsintown not verified in this pass).
    4. Curator-picked weekly local lists.
- **(F) Behaviour:**
  - Frequency: occasional, but intense around events.
  - Creates content for it: yes (event promos).
  - Reasons to return: yes, around events.
  - Invites other artists: yes, co-performers.
  - External sharing: **high**. Event links travel on WhatsApp and Instagram, which makes this an acquisition channel.
  - Network effect: local, so it needs density.
  - Creator loop: artist lists gig → shares the event page → attendees discover other emerging artists' upcoming gigs nearby → attendees follow and attend → venues and curators use the calendar to book → more artists list.
- **(G) Category:** acquisition (shared event pages), discovery (local), monetisation (if ticketing), and some retention.
- **(H) Risks [Inference]:**
  - Cancellations, refunds and fraud (fake events).
  - Venue disputes and capacity or safety obligations.
  - Entertainment tax, GST and TDS, and the 0.4% MDR above ₹2,000.
  - Customer support at event time.
  - Chargebacks on cards.
  - Scalping is unlikely at indie scale.
  - How competitors handle it: hold payouts until after the event (Allevents, Eventbrite), pass fees to buyers, and require organiser verification (not verified).
- **(I) Scale:**
  - Link-out calendar: works at 1,000 artists if they are concentrated in 1–2 cities.
  - Local discovery: needs about 10k artists per metro plus a fan base.
  - In-house ticketing economics: only at 100k+ artists or a large number of events.
- **(J) India:**
  - District is backed by Zomato and absorbed Insider.
  - BookMyShow is the incumbent, but no data was verified this pass.
  - UPI makes small-ticket checkout easy.
  - 0.4% MDR above ₹2,000 (from 15 Oct 2026) adds cost to premium workshop tickets.
- **(K) Preliminary verdict: Deprioritise (ticketing); Combine (event discovery).**
  - Build a local gigs and workshops calendar inside artist profiles, linking out to District, Skillbox or Luma.
  - Add a simple RSVP or small-workshop ticket (under ₹2,000, UPI) only after PMF.

### Gaps
- No verified organiser fee data for BookMyShow, District, Skillbox, Townscript or SortMyScene (pages blocked, empty or not fetched).
- No verified Indian live-events market size (the EY-FICCI report could not be fetched).
- No community evidence gathered on pay-to-play or door deals for Indian indie artists.
- Luma funding and adoption figures not found.
- Bandsintown not verified.

---

## Feature 18: Pro plan (₹299/month: unlimited DM automations, premium templates, full stats, no Underdawg badge, custom domain)

### Takeaway
₹299/month is **cheap against every comparable creator tool**:
- Global: Beacons $10–$90, Stan $29–$99, Later from $18.75, LinkDM $19 for DM automation, Kit $33, Calendly $10, Luma Plus $59.
- India: SuperProfile Premium ₹11,999/yr (about ₹1,000/mo) plus 5% fee, Exly ₹2,500/mo, TagMango ₹5,000/mo.
- It equals Spotify India's Premium Platinum (₹299) and is about twice Spotify Standard (₹139).

There is **no reliable public data on what share of creators pay for tools**. The bundle has design risks:
- Removing the Underdawg badge gives up a free acquisition channel.
- "Unlimited" DM automation conflicts with how DM-tool pricing works (LinkDM caps monthly DMs) and with Meta's limits (not verified).
- Paywalling "full stats" can weaken free-tier value.
- Anything that buys visibility would undermine fair discovery.

**Preliminary verdict: Build after PMF; Modify the bundle.**

### Cited Findings

#### (A) and (B) Pricing benchmarks: competitor table

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Linktree | Australia† | Paid link-in-bio tiers | Tiers: Free, Starter, Pro, Premium. Premium includes "removable Linktree branding". Prices vary by region and could not be retrieved. | Creators and brands | Freemium | "70 million members" | Category leader | — | Prices unverified | [Linktree pricing page](https://linktr.ee/s/pricing); [Wikipedia](https://en.wikipedia.org/wiki/Linktree) |
| Beacons | US† | Paid link-in-bio and store tiers | Free (9% fee); Creator Pro $10/mo (9%), which includes custom domain and branding removal; Store Pro $30/mo (0%), which adds booking and unlimited email; Business Pro $90/mo | Creators | Freemium | No data | Cheap entry to branding removal | 9% fee on low tiers | USD | [The Leap review](https://www.theleap.co/blog/beacons-pricing/) |
| Stan Store | US† | All-in-one store with AutoDM | Creator $29/mo, including Stan AutoDM, lead magnets and booking; Creator Pro $99/mo, adding email flows, upsells and pixels | Creators | Paid only (14-day trial) | ">$400M" generated; Trustpilot 4.7/5 (2,180) | DM automation bundled | Support delays | No free tier | [Stan blog](https://stan.store/blog/stan-store-pricing/) |
| Later | US† | Social scheduling with Link in Bio | Starter $18.75/mo, Growth $37.50/mo, Scale $82.50/mo (billed yearly). Link in Bio included on all tiers. | Social media managers and creators | Paid | No data | Scheduling plus analytics | — | Not monetisation-centric | [Later pricing](https://later.com/pricing/) |
| LinkDM | India-associated† | Instagram DM automation | Free: 1,000 DMs/mo, 1 account. Pro: $19/mo or $182/yr; 25,000 DMs/mo; 3 accounts; adds comment auto-reply. Platinum+: $99/mo; 300,000 DMs/mo. | Instagram creators | Freemium | No data | Specialist DM tool | — | Prices DM volume in tiers, not "unlimited" | [LinkDM pricing](https://linkdm.com/pricing) |
| SuperProfile (Cosmofeed) | India | Paid creator plans plus AutoDM | Starter free at 10%; Premium ₹11,999/yr at 5%; Pro ₹49,999/yr with custom fee, which adds branding removal, email and WhatsApp marketing. Conflict: Peerseek reports a "Creator" plan at ₹99 for the first month, then ₹499/mo. | Indian creators | Freemium | ~50,000 creators (secondary) | INR; AutoDM | AutoDM is single-trigger (secondary) | Branding removal only on the top tier | [SuperProfile plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro); [Peerseek](https://peerseek.io/blogs/creator-platform-fees-india-compared); [CreatorLane](https://creatorlanehq.com/learn/superprofile) |
| Topmate | India-focused | No subscription | 10% / 20% commission; custom pricing for creators earning ₹10L+/mo | Experts | Commission only | "1mn+ professionals" (claim) | No upfront cost | — | Monetises through a take rate, not a subscription | [Topmate pricing](https://topmate.io/pricing) |
| Gumroad | US† | No subscription | 10% + $0.50 per sale | Creators | Fee-only | — | — | — | — | [Gumroad pricing](https://gumroad.com/pricing) |
| Kit | US† | Email plus commerce | Free up to 10k subscribers; Creator $33/mo; Pro $66/mo | Newsletter creators | Freemium | — | — | — | — | [Kit pricing](https://kit.com/pricing) |
| Payhip | UK† | Paid plans reduce fees | $29/mo (2% fee); $99/mo (0%) | Creators | Freemium | — | — | — | — | [Payhip](https://payhip.com/pricing) |
| Instamojo; Exly; TagMango; Graphy | India | Paid plans that cut commission | Instamojo ₹6,999 or ₹14,999 a year. Exly ₹2,500/mo (6%) or ₹9,000/mo (3%). TagMango ₹5,000/mo (5.5%), ₹15,000/mo (3.5%), ₹30,000/mo (0%). Graphy ₹24,999/yr (10%), ₹49,999/yr (7.5%), ₹99,999/yr (5%). | Coaches, educators, SMBs | Freemium or paid | No data | — | — | Aimed at course businesses; far above ₹299 | [Instamojo](https://www.instamojo.com/pricing/); [Exly](https://exlyapp.com/pricing); [TagMango](https://tagmango.com/pricing); [Graphy](https://graphy.com/pricing) |
| Calendly; Luma Plus | US | Tool subscriptions | Calendly Standard $10/seat/mo; Luma Plus $59/mo (annual billing) | Professionals and organisers | Freemium | Calendly: 20M professionals | — | — | — | [Calendly](https://calendly.com/pricing); [Luma](https://luma.com/pricing) |
| Spotify India (consumer benchmark) | Sweden/India | Willingness-to-pay benchmark | Premium Standard ₹139/mo; Platinum ₹299/mo; Student ₹69/mo | Consumers | Paid | — | — | — | Shows ₹299 is a "premium" consumer price point in India | [Spotify India](https://www.spotify.com/in-en/premium/) |

#### Other cited facts
- Linktree's paid "Pro" subscription launched in April 2017, offering customisation, analytics, email integration and logo removal. — [Wikipedia: Linktree](https://en.wikipedia.org/wiki/Linktree)
- Many creator tools now bundle Instagram auto-DM, so DM automation is table stakes:
  - Stan includes AutoDM in its $29 plan. — [Stan](https://stan.store/blog/stan-store-pricing/)
  - Topmate promotes "Instagram Auto DM". — [Topmate](https://topmate.io/)
  - SuperProfile has AutoDM (secondary). — [CreatorLane](https://creatorlanehq.com/learn/superprofile)
  - LinkDM sells DM automation on its own.

### Inferences
- **(A) Problem framing [Inference]:**
  - This is a business-model question more than an artist problem.
  - The artist "problem" it addresses is wanting professional presentation (custom domain, no third-party badge), automation that saves time, and actionable analytics.
  - Severity: low for most emerging artists. Many have no income yet: 59% of beginners haven't monetised (Linktree 2022).
- **Share of creators who pay for tools:** **No reliable public data found.** This includes Linktree's paid conversion and Beacons' or Stan's subscriber counts.
- **(C) Uniqueness:**
  - Classification: **Very common** (freemium creator SaaS).
  - Price uniqueness: ₹299 undercuts all verified competitors.
  - Bundle uniqueness: low. Every element is standard.
- **(D) Artist value:**
  - Meaningful: time saved, and analytics that guide what to post or sell.
  - Vanity: badge removal and premium templates.
  - "Full stats" are only meaningful if they show who the viewers are (curators, brands, other artists). That is Underdawg-unique data [Inference].
- **(E) Discovery:**
  - Pro must never increase ranking or visibility; otherwise discovery becomes pay-to-win.
  - Removing the Underdawg badge reduces the "made with Underdawg" loop that drives link-in-bio virality [Inference; plausible from how link-in-bio brands spread, but no quantitative source found].
- **(F) Behaviour:**
  - Monthly billing.
  - Use frequency depends on the DM automation and stats features.
  - Pro creates no network effect.
- **(G) Category:** monetisation (platform revenue) and retention through lock-in (custom domain, automations).
- **(H) Risks [Inference/Assumption]:**
  - Low conversion among unknown artists.
  - "Unlimited DMs" is exposed to Meta API limits and spam enforcement. Not verified this pass, but competitors cap DM volume by tier.
  - Paywalling stats may weaken activation.
  - Badge removal hurts acquisition.
  - Price anchoring: at ₹299, upgrades to higher tiers later are hard.
- **(I) Scale [Assumption, illustrative only]:**
  - Revenue is negligible at 1k artists: if 5% convert, that is 50 × ₹299 ≈ ₹15k/month. The 5% conversion rate is an assumption.
  - It matters only at 100k+ artists.
- **(J) India:**
  - Indian creator SaaS charges more (₹499–₹5,000+/mo) but targets course sellers and coaches.
  - ₹299 matches Spotify Platinum, a premium consumer price in India.
  - Students and emerging artists may still balk.
  - Consider annual plans and UPI AutoPay (UPI AutoPay was not verified this pass).
- **(K) Preliminary verdict: Build after PMF; Modify.**
  - Keep core stats free.
  - Sell "audience intelligence": who from the industry viewed your work.
  - Make DM automation tiered, not unlimited.
  - Make badge removal a higher-tier perk, or keep a subtle badge.
  - Never sell discovery.
  - Price test ₹149–₹299 with annual discounts.

### Gaps
- Not retrievable: Linktree USD and INR prices (page shows no figures to the fetcher); ManyChat pricing (403); Meta Verified India price (404).
- Not verified: Meta's Instagram messaging API rate limits for automated DMs.
- No data on creator-tool subscription conversion rates, in India or globally.

---

## Cross-feature: fee comparison and Indian payment rules (for the fee chart)

### Takeaway
Platform take rates run from 0% (Ko-fi tips with Contributor off; Stan; paid tiers of Payhip and Luma) through 5% (BMC, Lemon Squeezy, Luma Free, Payhip Free, SuperProfile Premium), 9–10% (Beacons Free, Gumroad, Topmate, SuperProfile Starter, Exly Starter, TagMango Basic) and 20–30% (Topmate and Gumroad marketplace sales; YouTube and Twitch native tipping). In India, gateway costs (~2% + 18% GST at Razorpay) apply even to UPI. Merchant fees (MDR) are zero for person-to-person and sub-₹2,000 payments, and 0.4% above ₹2,000 from 15 Oct 2026.

### Cited Findings
- **Patreon:**
  - Pricing page: "10% of the income you earn on Patreon" plus "payment processing, currency conversion, and payout fees, and applicable taxes". — [Patreon pricing](https://www.patreon.com/pricing)
  - Wikipedia: Patreon announced the 10% change in June 2025. — [Wikipedia: Patreon](https://en.wikipedia.org/wiki/Patreon)
  - Per a secondary source (CartMango, 21 Aug 2026):
    - 10% applies to new creators from 4 Aug 2025.
    - Processing is 2.9% + $0.30 on US cards and 3.9% + $0.30 on non-US PayPal.
    - Payouts cost $0.25 by Stripe, 1% by PayPal, or $1.00 by Payoneer; currency conversion is 2.5%.
    - Apple in-app purchases cost 30% in year 1 and 15% thereafter.
    - A $5 pledge nets $4.05, a 19% all-in cost.
  - Conflict: secondary sources disagree on the legacy tier labels and rates (Lite/Pro/Premium at 5/8/12% vs Founders/Pro/Pro+Merch at 5/8/11%). — [CartMango](https://cartmango.com/patreon-fees/)
- **Stripe India:** "2%" on domestic cards, "3%" on international cards, "3.5%" on international American Express. — [Stripe pricing (redirected to India page)](https://stripe.com/pricing)
- **Razorpay:**
  - 2% on all domestic instruments including UPI; 2.15% on corporate cards; up to 3% on international.
  - 18% GST on the fee. No setup or annual fee; no refund fee.
  - Payment Pages: 0.2% plus gateway fees. Route (split payments): 0.1% plus gateway fees.
  — [Razorpay pricing](https://razorpay.com/pricing/)
- **UPI MDR and policy:** see Feature 12 (J), sourced to [MediaNama, 28 Sep 2026](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/). MediaNama also reports:
  - Government incentives covered only "11% of industry costs (as of March 2026)".
  - The new rates come from the NPCI-led UPI and Services Steering Committee and the DFS FAQ, not a gazette notification.
  - Payments to railways, telecom, insurance and fuel attract a flat ₹5 above ₹2,000.

### Inferences
- **[Derived] Effective cost of a $5 tip:**
  - Ko-fi, Contributor off: ≈8.9% (processor only, assuming 2.9% + $0.30).
  - BMC: ≈13.9% before the 0.5% payout fee and the +1% international surcharge.
  - Patreon: 19%.
  - YouTube Super Thanks: 30%+.
  - Twitch Bits: ≈28.6% of viewer spend.
- **[Derived] Effective cost of a ₹500 UPI tip in India:**
  - Personal UPI QR: 0%.
  - Razorpay standard: ₹11.80 (2.36%, including GST on the fee).
  - Razorpay Payment Pages: ≈₹12.98 (2.6%).
  - Topmate or SuperProfile Starter: ≥10% (gateway charge unclear).
- **[Derived] Effective cost of a $20 ticket:**
  - Eventbrite: ≈$3.11 (15.6%), if all fees fall on the ticket.
  - Luma Free: ≈$1.88 (9.4%).
  - Luma Plus: ≈$0.88 (4.4%) plus $59/mo.
  - Allevents: $1 (5%) plus the gateway fee.
- **[Inference] Platform economics:** a 0% platform fee on small UPI payments is a credible differentiator against Indian creator tools (5–10%). Underdawg would then need revenue from Pro or other features, and gateway costs (~2.36%) must be passed on or absorbed.

### Gaps
- Not verified on any official page: Ko-fi Gold price and processor rates; Instagram Stars purchase prices in India; YouTube Super Thanks price points for India.
- Not verified: Cashfree, PhonePe and Paytm gateway pricing.
- Not verified: UPI P2M dispute and chargeback rules (NPCI's dispute-resolution system).

---

## Cross-feature: adoption, outcomes and how much typical creators earn

### Takeaway
Platforms report big aggregate numbers (Bandcamp $1.81B cumulative; Stan $400M+; Ko-fi ~$100M/yr; Gumroad ~$2M/week). But the average and median creator earns little:
- Patreon's visible payouts average about $74 per paid creator per month (derived from Graphtreon).
- 46% of full-time creators earn under $1k (Linktree 2022).
- 2.8% of US creators earn a living wage (Stripe, 2022 data).
- In India, Topmate's whole creator base earned ₹1.8 crore in one month in 2023, while onboarding 12.1k creators in that same month. This implies small amounts per creator (derived; the creator base was not disclosed).

Monetisation tools mostly monetise existing audiences. For unknown artists with small audiences, tips and downloads will rarely be meaningful income. Sessions are the most realistic early earner for skilled artists.

### Cited Findings
- **Patreon (Graphtreon, accessed 1 Oct 2026):** "345,120" paid creators with at least one paying member; "18,504,736" paid memberships; "$25,650,607" estimated monthly payouts, excluding hidden earnings. Patreon also has "over 80 million users" (Apr 2026) and had "more than 250,000 creators" and "more than eight million active patrons" in Mar 2022. — [Graphtreon](https://graphtreon.com/patreon-stats); [Wikipedia: Patreon](https://en.wikipedia.org/wiki/Patreon)
- **Ko-fi:** ~$100M a year in creator earnings (Stripe, 2023). — [Fintech Times](https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/)
- **Stripe, other figures (2023):** 668,000 creators across 50 platforms in 2021; average monthly recurring revenue $6,600 in Hong Kong, $3,200 in the Netherlands, $2,600 in the UK. — [Fintech Times](https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/)
- **Buy Me a Coffee:** 1M+ creators (2023). — [Mercury](https://mercury.com/blog/founder-spotlight-jijo-sunny-buy-me-a-coffee)
- **Gumroad:** $1,964,052 creator income in one week. Funding history: $1.1M seed (Feb 2012) and a $7M Series A led by KPCB. — [Gumroad About](https://gumroad.com/about); [Wikipedia](https://en.wikipedia.org/wiki/Gumroad)
- **Bandcamp:** $1.81B cumulative and $225M in the past year. — [Bandcamp](https://bandcamp.com/about)
- **Stan:** >$400M generated. — [Stan](https://stan.store/blog/stan-store-pricing/)
- **Linktree:** 70M members. Funding: $10.7M Series A (Oct 2020); $45M Series B (Mar 2021). Wikipedia also states a 2022 round of "$152 million at a valuation of $1.7 billion", which was not cross-checked. — [Wikipedia: Linktree](https://en.wikipedia.org/wiki/Linktree)
- **Calendly:** 20M professionals (homepage); $350M raised at $3B valuation (Jan 2021). — [Calendly](https://calendly.com/); [Wikipedia](https://en.wikipedia.org/wiki/Calendly)
- **Eventbrite:** US$326M revenue (2023); Bending Spoons acquisition for ~$500M ($4.50/share), closed 10 Mar 2026. — [Wikipedia](https://en.wikipedia.org/wiki/Eventbrite)
- **Topmate:** ₹1.80 cr creator earnings in Sept 2023, of which ₹70.5 lakh from 1:1. Tracxn: $1.13M raised over 4 rounds. — [LinkedIn](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O); [Tracxn](https://tracxn.com/d/companies/topmate/__0feQnNqxu633GVIOYt_LQu9YkfyWhOqrZyDJy8IiSew/funding-and-investors)
- **Cosmofeed (2022):** $1.5M seed (GrowX, Waveform, 9 Unicorns and others); 3,000 creators; targeting 10,000 by Mar 2023; 10% commission. Company claim: average creator earnings ₹50,000/month. — [Entrackr, 18 Nov 2022](https://entrackr.com/2022/11/cosmofeed-helps-creators-monetize-content-more-efficiently/)
- **India creator economy:** "2–2.5 million monetized content creators"; "$350–400 billion in consumer spending" influenced; projected "$1 trillion+" of creator-influenced consumption by 2030. The report highlights virtual gifting, subscriptions and live commerce as emerging channels. — [BCG, "From Content to Commerce", 3 May 2025](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy)
- **Income distributions:**
  - Linktree 2022: 46% of full-time and 68% of part-time creators earn under $1K; 12% of full-time creators earn over $50K.
  - Musicians' Census 2023: 3% of musicians earn £70,000+ from music; 29% earn up to £7,000.
  — [Linktree](https://linktr.ee/creator-report/); [Musicians' Census](https://musicianscensus.co.uk/s/Musicians-Census-Financial-Insight-Report-Accessible-Format.docx)

### Inferences
- **[Derived]** Graphtreon's visible Patreon payouts average ≈ $74.3 per paid creator per month. The median is almost certainly lower, given the skew.
- **[Derived]** 1:1 calls were ≈39% of Topmate creator revenue in Sept 2023.
- **[Inference]** For unknown artists, tips and downloads are unlikely to be meaningful income early on. Sessions (lessons and reviews) are the most realistic first earnings for skilled artists. Ticketing pays only once an audience exists.

### Gaps
- No verified median-earnings data for Ko-fi, BMC, Gumroad, Topmate, SuperProfile or Instagram Gifts in India.
- No verified funding data for Stan, Beacons or Luma; the search budget ran out.
- The Superpeer outcome (beyond the redirect) was not verified.

---

## Cross-feature: do monetisation tools create discovery, or only monetise existing audiences?

### Takeaway
The evidence says they mostly monetise existing audiences:
- Native tools exclude small accounts. Instagram Gifts need 500 followers and Instagram Subscriptions need 10,000 in India; Super Thanks needs YouTube Partner Program membership.
- Where platforms do supply discovery, they charge a premium for it: Gumroad charges 30% on Discover sales vs 10% direct; Topmate 20% on marketplace sales vs 10% direct.
- Earnings are concentrated among top creators (Linktree, Stripe, Musicians' Census, the Twitch leak).

Monetisation tools can feed discovery only if they are redesigned: asset, session and gig directories ranked with fairness rules, and money that never buys exposure.

### Cited Findings
- Gumroad: 10% + $0.50 direct vs 30% via Discover. — [Gumroad pricing](https://gumroad.com/pricing)
- Topmate: 10% on direct sales vs 20% "when new customers buy from you through our marketplace". — [Topmate pricing](https://topmate.io/pricing)
- Instagram Gifts need 500 followers; Subscriptions need 10,000 followers (India). — [WebHippo, secondary citing Meta](https://webhippo.in/blog/instagram-monetization-india)
- Twitch leak (Oct 2021): the top three earners took $9.6M, $8.5M and $5.8M; no women in the top third of the top 100 earners. — [Wikipedia: Twitch](https://en.wikipedia.org/wiki/Twitch_(service))
- Bandcamp combines discovery with commerce and still passes "an average of 82%" to artists. — [Bandcamp](https://bandcamp.com/about)
- Allevents positions itself as a discovery layer ("20M+ event-goers") with free ticketing and a $1 attendee fee. — [Allevents](https://allevents.in/pages/pricing)
- A low-confidence claim, with no data source, that Topmate's ₹5k+/month earners "were already successful elsewhere". — [EximPe](https://eximpe.com/blog/payments/topmate-io-the-complete-guide-to-getting-started-earning-money-avoiding-pitfalls)

### Inferences
- **[Inference] Which features can be redesigned into discovery:**
  - Downloads become an artist-to-artist asset directory.
  - Bookings become a "get feedback from" skill directory.
  - Tickets become a local gig calendar.
  - Tips become a supporter graph that drives "similar emerging artists" recommendations.
- **[Inference] Fair-discovery rules for all of them:**
  1. Never rank by money.
  2. Normalise every signal by audience size.
  3. Reserve exposure quotas for new and small artists.
  4. Charge no extra fee for platform-driven sales to emerging artists, the opposite of Gumroad and Topmate.
  5. Hide amounts.
  6. Do not let Pro affect ranking.

### Gaps
- No academic or industry study was found that measures whether creator monetisation tools increase discovery.

---

## CHART-READY NUMBERS

### Takeaway
Numbers below are verified on the cited page unless marked "Derived" or "Secondary". Confidence levels:
- **High:** official page opened.
- **Medium:** reputable secondary source, Wikipedia, or a company claim.
- **Low:** SEO/competitor blog, or an unverified excerpt.

### Cited Findings

| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Platform fee, new creators | 10 | % of income | Patreon | Effective 4 Aug 2025 (announced Jun 2025) | https://www.patreon.com/pricing | High |
| Processing fee, US card | 2.9% + 0.30 | % + USD | Patreon | 21 Aug 2026 | https://cartmango.com/patreon-fees/ | Low (secondary) |
| All-in cost on a $5 pledge | 19 | % | Patreon | 21 Aug 2026 | https://cartmango.com/patreon-fees/ | Low (secondary) |
| Platform fee | 5 | % | Buy Me a Coffee | 18 Mar 2026 | https://help.buymeacoffee.com/en/articles/8105744-how-to-calculate-charges-on-your-payment | High |
| Stripe processing | 2.9% + 0.30 | % + USD | Buy Me a Coffee | 18 Mar 2026 | same | High |
| International surcharge | 1 | % | Buy Me a Coffee | 18 Mar 2026 | same | High |
| Payout processing | 0.5 | % | Buy Me a Coffee | 18 Mar 2026 | same | High |
| Tip platform fee (Contributor off / on) | 0 / 5 | % | Ko-fi | 2026 | https://help.ko-fi.com/hc/en-us/articles/25143210488477-Contributor-status | Medium (excerpt) |
| Shop, membership and commission fee (free plan) | 5 | % | Ko-fi | 2026 | same | Medium (excerpt) |
| Ko-fi Gold price | 12 | USD/month | Ko-fi | 2026 | search excerpts only (knowyourcut.com, schoolmaker.com) | Low |
| Annual creator earnings | ~100 | USD million/yr | Ko-fi | 2023 (Stripe data) | https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/ | Medium |
| Creators on platform | 1,000,000+ | creators | Buy Me a Coffee | 6 Sep 2023 | https://mercury.com/blog/founder-spotlight-jijo-sunny-buy-me-a-coffee | Medium (company claim) |
| Direct sale fee | 10% + 0.50 | % + USD | Gumroad | Oct 2026 | https://gumroad.com/pricing | High |
| Discover marketplace fee | 30 | % | Gumroad | Oct 2026 | https://gumroad.com/pricing | High |
| Creator income in one week | 1,964,052 | USD | Gumroad | Week before 1 Oct 2026 | https://gumroad.com/about | High (company figure) |
| Fee by plan (Free / Plus / Pro) | 5 / 2 / 0 | % | Payhip | Oct 2026 | https://payhip.com/pricing | High |
| Plan price (Plus / Pro) | 29 / 99 | USD/month | Payhip | Oct 2026 | https://payhip.com/pricing | High |
| Transaction fee | 5% + 0.50 | % + USD | Lemon Squeezy | Oct 2026 | https://www.lemonsqueezy.com/pricing | High |
| Plan price (Creator / Creator Pro) | 29 / 99 | USD/month | Stan Store | 22 Jul 2026 | https://stan.store/blog/stan-store-pricing/ | High |
| Transaction fee | 0 | % | Stan Store | 22 Jul 2026 | same | High (official; conflicts with third-party 5% claims) |
| Creator revenue generated (cumulative) | 400+ | USD million | Stan Store | 22 Jul 2026 | same | Medium (company claim) |
| Plan price (Free / Creator Pro / Store Pro / Business Pro) | 0 / 10 / 30 / 90 | USD/month | Beacons | Mar 2025 | https://www.theleap.co/blog/beacons-pricing/ | Medium |
| Transaction fee (Free and Creator Pro / Store and Business Pro) | 9 / 0 | % | Beacons | Mar 2025 | same | Medium |
| Commerce fee | 3.5% + 0.30 | % + USD | Kit | Oct 2026 | https://kit.com/pricing | High |
| Free plan subscriber cap | 10,000 | subscribers | Kit | Oct 2026 | https://kit.com/pricing | High |
| Revenue share, digital (after $5k in sales) | 15 (10) | % | Bandcamp | Wikipedia, accessed Oct 2026 | https://en.wikipedia.org/wiki/Bandcamp | Medium |
| Average share reaching the artist | 82 | % | Bandcamp | Oct 2026 | https://bandcamp.com/about | High |
| Cumulative paid to artists | 1.81 | USD billion | Bandcamp | Oct 2026 | https://bandcamp.com/about | High |
| Fan spend, past year | 225 | USD million | Bandcamp | Oct 2026 | https://bandcamp.com/about | High |
| Platform fee (direct / marketplace) | 10 / 20 | % | Topmate | Oct 2026 | https://topmate.io/pricing | High |
| Creator earnings in one month | 1.80 | ₹ crore | Topmate | Sep 2023 | https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O | Medium (founder post) |
| 1:1 call revenue in one month | 70.5 | ₹ lakh | Topmate | Sep 2023 | same | Medium |
| New creators onboarded in one month | 12,100 | creators | Topmate | Sep 2023 | same | Medium |
| Total funding | 1.13 | USD million | Topmate | 2026 (Tracxn) | https://tracxn.com/d/companies/topmate/__0feQnNqxu633GVIOYt_LQu9YkfyWhOqrZyDJy8IiSew/funding-and-investors | Low–Medium |
| Plan price (Starter / Premium / Pro) | 0 / 11,999 / 49,999 | ₹/year | SuperProfile (Cosmofeed) | 2026 | https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro | High |
| Platform fee (Starter / Premium) | 10 / 5 | % | SuperProfile | 2026 | same | High |
| Seed funding | 1.5 | USD million | Cosmofeed | 2022 | https://entrackr.com/2022/11/cosmofeed-helps-creators-monetize-content-more-efficiently/ | Medium |
| Creators on platform | 3,000 | creators | Cosmofeed | Nov 2022 | same | Medium |
| Store fee (Lite and Starter / Growth) | 5% + ₹3 / 2% + ₹3 | % + ₹ | Instamojo | Oct 2026 | https://www.instamojo.com/pricing/ | High |
| Plan price (Starter / Growth) | 6,999 / 14,999 | ₹/year | Instamojo | Oct 2026 | same | High |
| Plan price (Launch / Grow / Rise) | 24,999 / 49,999 / 99,999 | ₹/year | Graphy | Oct 2026 | https://graphy.com/pricing | High |
| Fee by plan (Launch / Grow / Rise) | 10 / 7.5 / 5 | % | Graphy | Oct 2026 | same | High |
| Plan price (Pro / Premium) | 2,500 / 9,000 | ₹/month | Exly | Oct 2026 | https://exlyapp.com/pricing | High |
| Commission (Starter / Pro / Premium) | 10 / 6 / 3 | % | Exly | Oct 2026 | same | High |
| Plan price (Pro / Advanced / Ultimate) | 5,000 / 15,000 / 30,000 | ₹/month + GST | TagMango | Oct 2026 | https://tagmango.com/pricing | High |
| Gateway fee, standard (all domestic incl. UPI) | 2 | % | Razorpay | Oct 2026 | https://razorpay.com/pricing/ | High |
| GST on gateway fee | 18 | % | Razorpay | Oct 2026 | same | High |
| Payment Pages add-on | 0.2 | % + gateway fee | Razorpay | Oct 2026 | same | High |
| Route (split payments) add-on | 0.1 | % + gateway fee | Razorpay | Oct 2026 | same | High |
| Card fee (domestic / international) | 2 / 3 | % | Stripe India | Oct 2026 | https://stripe.com/pricing (redirects to India page) | High |
| Plan price (Standard / Teams) | 10 / 16 | USD/seat/month | Calendly | Oct 2026 | https://calendly.com/pricing | High |
| Users | 20 | million professionals | Calendly | Oct 2026 | https://calendly.com/ | Medium (company claim) |
| Plan price (Free / Teams) | 0 / 12 | USD/user/month (annual) | Cal.com | Oct 2026 | https://cal.com/pricing | High |
| Service fee per ticket | 3.7% + 1.79 | % + USD | Eventbrite (US) | Oct 2026 | https://www.eventbrite.com/organizer/pricing/ | High |
| Payment processing | 2.9 | % per order | Eventbrite (US) | Oct 2026 | same | High |
| Revenue | 326 | USD million | Eventbrite | 2023 | https://en.wikipedia.org/wiki/Eventbrite | Medium |
| Acquisition price | ~500 | USD million | Eventbrite (by Bending Spoons) | Closed 10 Mar 2026 | same | Medium |
| Platform fee (Free / Plus) | 5 / 0 | % | Luma | Oct 2026 | https://luma.com/pricing | High |
| Luma Plus price | 59 | USD/month (billed annually) | Luma | Oct 2026 | same | High |
| Attendee fee | 1 | USD/ticket | Allevents | Oct 2026 | https://allevents.in/pages/pricing | High |
| Event-goers reached | 20+ | million | Allevents | Oct 2026 | same | Medium (company claim) |
| Per-ticket fee (pay-as-you-go / prepaid from) | 0.60 / 0.22 | GBP + VAT | Ticket Tailor | Oct 2026 | https://www.tickettailor.com/pricing/ | High |
| Acquisition of Paytm Insider + TicketNew | 2,048 (≈244) | ₹ crore (USD million) | Zomato / District | Aug 2024 | https://en.wikipedia.org/wiki/Paytm | Medium |
| Creator share of Super Thanks | 70 | % (after taxes and fees) | YouTube | Oct 2026 | https://support.google.com/youtube/answer/10878910?hl=en | High |
| Creator payout per Star | 0.01 | USD | Instagram Gifts | Jul 2026 | https://webhippo.in/blog/instagram-monetization-india | Medium (secondary citing Meta) |
| Follower threshold (Gifts / Subscriptions), India | 500 / 10,000 | followers | Instagram | Jul–Sep 2026 | same | Medium |
| Streamer payout per Bit | 0.01 | USD | Twitch | 9 Feb 2024 | https://streamlabs.com/content-hub/post/what-are-twitch-bits-worth | Medium |
| Viewer price for 100 Bits | 1.40 | USD | Twitch | 9 Feb 2024 | same | Medium |
| Plan price (Starter / Growth / Scale) | 18.75 / 37.50 / 82.50 | USD/month (billed yearly) | Later | Oct 2026 | https://later.com/pricing/ | High |
| Plan price (Pro / Platinum+) | 19 / 99 | USD/month | LinkDM | Oct 2026 | https://linkdm.com/pricing | High |
| DM cap (Free / Pro / Platinum+) | 1,000 / 25,000 / 300,000 | DMs/month | LinkDM | Oct 2026 | same | High |
| Premium price (Standard / Platinum / Student) | 139 / 299 / 69 | ₹/month | Spotify India | Oct 2026 | https://www.spotify.com/in-en/premium/ | High |
| Members | 70 | million | Linktree | Accessed Oct 2026 | https://en.wikipedia.org/wiki/Linktree | Medium |
| Paid creators | 345,120 | creators | Patreon (Graphtreon) | Accessed 1 Oct 2026 | https://graphtreon.com/patreon-stats | Medium |
| Estimated monthly payouts (visible only) | 25,650,607 | USD/month | Patreon (Graphtreon) | Accessed 1 Oct 2026 | same | Medium |
| Mean payout per paid creator | ≈74 | USD/month | Patreon | Derived, Oct 2026 | derived from Graphtreon | Medium (derived) |
| Virtual gifting revenue | 50 | USD million/yr | ShareChat | Date unspecified | https://en.wikipedia.org/wiki/ShareChat | Low–Medium |
| Monetised creators in India | 2–2.5 | million | India (BCG) | 3 May 2025 | https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy | Medium |
| Full-time creators earning under $1K | 46 | % | Creators (Linktree survey, n=9,576) | 2022 | https://linktr.ee/creator-report/ | Medium |
| Full-time creators earning over $50K | 12 | % | Creators (Linktree) | 2022 | same | Medium |
| US creators earning a living wage | 2.8 | % | Creators on Stripe | 2022 data, published 2023 | https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/ | Medium |
| Average annual music income | 20,700 | GBP | UK musicians (n=5,867) | Sep 2023 | https://musicianscensus.co.uk/s/Musicians-Census-Financial-Insight-Report-Accessible-Format.docx | High |
| Musicians who work as private teachers | 36 | % | UK musicians | Sep 2023 | same | High |
| Musicians earning £14,000 or less from music | 43 | % | UK musicians | Sep 2023 | same | High |
| UPI monthly transactions | 24.51 | billion | UPI (NPCI) | Aug 2026 | https://www.medianama.com/2026/09/223-upi-transactions-august-2026/ | High |
| UPI monthly value | 29.82 | ₹ lakh crore | UPI (NPCI) | Aug 2026 | same | High |
| UPI average ticket size | ≈1,217 | ₹ | UPI | Aug 2026 | same | High |
| UPI volume growth, year on year | 22 | % | UPI | Aug 2026 | same | High |
| UPI daily transactions | 791 | million/day | UPI | Aug 2026 | same | High |
| MDR on merchant payments up to ₹2,000, and on person-to-person | 0 | % | UPI | From 15 Oct 2026 | https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/ | High |
| MDR on merchant payments above ₹2,000 (most categories) | 0.4 (cap ₹300) | % | UPI | From 15 Oct 2026 | same | High |
| Small-merchant exemption threshold | 1 | ₹ lakh/month received | UPI | From 15 Oct 2026 | same | High |
| Person-to-person collect requests discontinued | — | event | UPI (NPCI circular of 29 Jul 2025) | Effective 1 Oct 2025 | https://www.outlookmoney.com/banking/npci-to-end-upi-p2p-collect-requests-from-october-1-to-reduce-fraud | High |
| TDS rate under Section 194-O | 0.1 | % | India (e-commerce operators) | Since 1 Oct 2024 | https://cleartax.in/s/section-194o | High |
| 194-O threshold for individual/HUF sellers | 5 | ₹ lakh/year | India | Since 1 Oct 2024 | same | High |
| RBI Payment Aggregator Master Direction issued | — | event | RBI | 15 Sep 2025 | https://www.cyrilshroff.com/wp-content/uploads/2025/10/Client-Alert-RBI-Introduces-Consolidated-Framework-for-Payment-Aggregators-3.pdf | High |
| Trustpilot score (reviews) | 1.4 (417) | /5 | Gumroad | Accessed 1 Oct 2026 | https://www.trustpilot.com/review/gumroad.com | Medium |
| Trustpilot score (reviews) | 3.9 (1,649) | /5 | Buy Me a Coffee | Accessed 1 Oct 2026 | https://www.trustpilot.com/review/buymeacoffee.com | Medium |
| Trustpilot score (reviews) | 4.6 (779) | /5 | Ko-fi | Accessed 1 Oct 2026 | https://www.trustpilot.com/review/ko-fi.com | Medium |
| Trustpilot score (reviews) | 4.7 (2,180) | /5 | Stan Store | Accessed 1 Oct 2026 | https://www.trustpilot.com/review/stan.store | Medium |
| Trustpilot score (reviews) | 4.4 (12,454) | /5 | Eventbrite | Accessed 1 Oct 2026 | https://www.trustpilot.com/review/www.eventbrite.com | Medium |
| Effective fee on a $20 ticket | ≈15.6 | % | Eventbrite (US) | Derived, Oct 2026 | derived from Eventbrite pricing | Medium (derived) |
| Effective fee on a $20 ticket | ≈9.4 | % | Luma (Free) | Derived, Oct 2026 | derived from Luma pricing | Medium (derived) |
| Effective fee on a ₹500 UPI payment | 2.36 | % | Razorpay standard (incl. GST) | Derived, Oct 2026 | derived from Razorpay pricing | Medium (derived) |

### Inferences
- **[Inference] Most decision-relevant comparisons for the charts:**
  1. Take rates: 0% (personal UPI) vs ~2.4% (gateway) vs 5–10% (Indian creator tools) vs 20–30% (platform marketplaces and native tipping).
  2. Pro price: ₹299 vs ₹1,000–₹5,000/mo Indian creator SaaS vs $10–$99/mo global tools.
  3. The gap between aggregate GMV and average creator earnings: Graphtreon ≈$74/mo; Linktree 46% under $1k.

### Gaps
- Not included because they could not be verified on opened pages:
  - Prices: Linktree (USD/INR), ManyChat, Meta Verified India, Canva India (403), Etsy fees (403).
  - Organiser fees and figures: BookMyShow, District, Skillbox, Townscript.
  - UPI person-to-merchant share and ticket-size distribution; NPCI pages rendered empty.
  - Funding: Beacons, Stan, Luma.
  - Instagram Stars purchase price.
  - TikTok gift revenue split.
