# Instagram-layer creator tools: market evidence for six proposed Underdawg features (r2)

Research date: 2026-10-01. Scope: the six "Instagram layer" features, each covered under brief sections 1–10 as items A–K.
1. Instagram-connected profile
2. Insights and verified ER
3. Scheduling
4. Link-in-bio page
5. Templates and template marketplace
6. DM automation

Then: platform risk, discovery impact, India specifics, and CHART-READY NUMBERS.

**Evidence labels**

| Label | Meaning |
|---|---|
| [VERIFIED] | I or a sub-researcher opened the official or primary page. Vendor self-claims are marked "vendor claim". |
| [REPORTED] | A secondary page was opened (press, blog, Wikipedia, Trustpilot, competitor-published comparison). |
| [SNIPPET] | Search-result text only; the page was NOT opened. Never used as a number in the chart table. |
| [INFERENCE] / [ASSUMPTION] | My analysis, not a sourced fact. |

**Sources for App Store ratings.** Apple's App Store catalog API (itunes.apple.com/search), India (IN) and US storefronts, pulled 2026-10-01. These are Apple's own catalog values.

**Evidence limits (important for the report writer)**
- **Search budget ran out early.** The session's shared WebSearch budget (200 calls) was used up early, so most evidence comes from opening known official URLs.
- **No Reddit, Product Hunt or Google Play evidence.** reddit.com and old.reddit.com could not be fetched, and Google Play pages did not render.
- **Blocked sites:**

  | Site | Response |
  |---|---|
  | manychat.com/pricing | 403 |
  | superprofile.bio | 429 |
  | collabstr.com | 403 |
  | www.meta.com/meta-verified (via curl) | 400 |
  | help.instagram.com | rendered empty |

- **What "common complaint" rests on.** Labels rest on Trustpilot, vendor community forums and vendor notices, not Reddit.
- **Indian startup data was mostly not captured.** Funding and user numbers for Indian startups (Inc42, YourStory, Entrackr, Tracxn) were largely unavailable.
- **Recommended rerun.** With a higher search budget, prioritise:
  - Reddit (r/Instagram, r/InstagramMarketing, r/artbusiness, r/WeAreTheMusicMakers)
  - Indian press on Topmate, SuperProfile and LinkDM
  - Google Play ratings

---

## Feature 1 — Instagram-connected profile (synced posts + followers shown as the artist's profile/portfolio)

### Takeaway
The demand to reuse Instagram content elsewhere is real, but the evidence is indirect: an entire Instagram-feed widget industry exists, and consumer apps relied on it. Meta's Basic Display shutdown on 2024-12-04 showed both that demand and the danger: personal accounts were cut off with 90 days' notice.

For Underdawg the synced profile is a necessary low-cost activation layer and the content inventory any discovery engine would need. It is not a differentiator on its own. Verdict: **Build early, modified.** Do not make follower count the headline, and let artists add non-Instagram work.

### Cited Findings

#### A. Problem validation
**What use case existed.**
- Meta described the deprecated API's use case as connecting "Instagram accounts to third-party consumer apps (via sharing Profile, Images etc)" — [Meta for Developers, 2024-09-04](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/) [VERIFIED]

**What happened at shutdown.** "Starting on December 4th, 2024, Instagram Basic Display API will no longer be available" and "all Instagram Basic Display API requests will fail from that day onwards" — [Meta, 2024-09-04](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/) [VERIFIED]
- Dating apps (Tinder, Hinge) lost the ability to show users' Instagram posts.
- Journaling app Day One called its Instagram import "a beloved feature" — [TechCrunch, 2024-12-06](https://techcrunch.com/2024/12/06/instagram-locks-out-developers-of-third-party-consumer-apps) [REPORTED]

**A product category exists to show Instagram work on owned sites.** Five vendors and one open-source project published migration notices:
- SnapWidget: users "will need to convert to a professional creator account" — [SnapWidget help, 2024-10-22](https://help.snapwidget.com/en/articles/9952836-deprecation-of-the-instagram-basic-display-api) [VERIFIED]
- LightWidget — [LightWidget](https://lightwidget.com/basic-display-api-deprecation) [VERIFIED]
- Smash Balloon (WordPress) — [Smash Balloon, updated 2026-09-30](https://smashballoon.com/doc/how-to-reconnect-a-personal-instagram-account-basic-display-api-deprecation/) [VERIFIED]
- Spotlight (WordPress): "If your WordPress Instagram feed runs on a personal Instagram account, it broke that day…" — [Spotlight, updated 2026-04-20](https://spotlightwp.com/instagram-basic-display-api-is-ending/) [VERIFIED]
- Behold (feed widgets plus an Admin API "for app/platform access") — [behold.so](https://behold.so/) [VERIFIED]
- Drupal module issue (2024-12-04) — [Drupal instagram_lite #3491784](https://www.drupal.org/project/instagram_lite/issues/3491784) [VERIFIED]

**One artist anecdote, older.** A photographer wanted Instagram-style daily posting on Adobe Portfolio. They were told Portfolio is "a separate website for showcasing examples of your best creative work". Its integrations are Lightroom and Behance, not Instagram — [Adobe Community, 2022-12](https://community.adobe.com/questions-606/instagram-aesthetic-for-adobe-portfolio-578297) [VERIFIED, single anecdote, older than 2023]

**Instagram is not the whole picture for creators.** As of March 2021, Instagram was "less than 40%" of Linktree profile traffic — [Wikipedia: Linktree](https://en.wikipedia.org/wiki/Linktree) [REPORTED, older data]. Creators' audiences are multi-platform.

**Indian creators are heavily on Instagram.**
- Instagram ad reach in India was 481 million in Oct 2025, up 89.5M (+22.9%) year on year — [DataReportal Digital 2026 India, 2025-11-05](https://datareportal.com/reports/digital-2026-india) [REPORTED]
- Instagram's Edits app has 85,857 iOS ratings in India (4.63) vs 89,241 in the US (4.79) — [Apple App Store IN](https://apps.apple.com/in/app/edits-video-editor/id6738967378) / [US](https://apps.apple.com/us/app/edits-video-editor/id6738967378) [VERIFIED catalog data]

**Answers to the brief's problem questions**

| Question | Answer |
|---|---|
| Problem being solved | Removes double work (keeping a portfolio in sync with Instagram) and the empty-profile cold start on a new platform. |
| Severity | Moderate. It is a convenience, not an acute pain. No survey quantifies it. [INFERENCE] |
| Frequency | Once at onboarding, then passive. [INFERENCE] |
| Segments most affected | Visual artists, illustrators, photographers, designers, dancers and fashion creatives whose primary portfolio is Instagram. Less so musicians, whose work lives on Spotify, YouTube and SoundCloud (consistent with the multi-platform Linktree traffic above). [INFERENCE] |
| Current workarounds | The Instagram profile itself; link-in-bio Instagram grids (Linktree Instagram app, Later Linkin.bio); website builders with feed widgets; manual uploads to Behance or ArtStation. |
| Why existing solutions fall short | Widgets only mirror the feed, with no credibility, discovery or opportunity layer. Website builders cost money and need upkeep (Pixpa ₹200–₹600/mo billed yearly, see table). Since Dec 2024 personal accounts cannot be connected anywhere. |

#### B. Competitor table (Feature 1)
| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Linktree (Instagram Link App) | Australia (App Store seller "Linktree Pty Ltd") | Shows Instagram posts and reels on a link page | Marketplace "Link App": "Display your posts and reels" | Creators, businesses | Free tier exists. India: Starter ₹360/mo (₹220/mo billed yearly), Pro ₹650 (₹440), Premium ₹1,450 (₹1,250). Which plan includes the Instagram app: not verified | 70M+ users (Apr 2025); iOS 4.82 from 61,616 ratings (US), 4.67 from 1,426 (IN) | Huge install base; Instagram is one block among many | Support and billing complaints on Trustpilot (see Feature 4) | Generic link page. No artists-only network, verification, discovery or opportunity layer | [linktr.ee/marketplace](https://linktr.ee/marketplace) [VERIFIED]; [TechCrunch 2025-04-23](https://techcrunch.com/2025/04/23/linktree-rolls-out-a-suite-of-monetization-features-for-creators/) [REPORTED]; [App Store](https://apps.apple.com/us/app/linktree-link-in-bio-creator/id1593515263) |
| Later — Linkin.bio | Not verified | Clickable copy of the Instagram grid ("Linked Posts") | Posts tagged with links appear on the page; "up to five links on each Instagram, TikTok, or Snap post" | Creators, e-commerce, social media managers | Bundled with Later: Starter $18.75, Growth $37.50, Scale $82.50 per month, billed yearly; 14-day trial | iOS 4.55 (2,526 US) | Grid-to-link mapping; scheduler bundle | Pricing page shows no free plan; the Linkin.bio page mentions a free option (conflict) | A brand marketing tool, not an artist portfolio or discovery network | [later.com/linkinbio](https://later.com/linkinbio/); [later.com/pricing](https://later.com/pricing/) [VERIFIED] |
| Beacons — Auto-Updating Media Kit | Not verified | Media kit filled from connected social accounts | "Auto-Updating Media Kit" with "daily updates from social accounts", rate cards, past projects, custom domain | Creators, influencers | Free (9% seller fee); Creator $10/mo; Creator Plus $30/mo; Creator Max $100/mo | Seed round $6M (2021, TechCrunch headline); iOS 3.21 (97 US) | Closest existing "brand view" with synced stats | Trustpilot 2.0/5 (42 reviews); support and domain lock-in complaints | Not artist-specific; media kit is a separate product; no artist discovery network | [beacons.ai/i/pricing](https://beacons.ai/i/pricing) [VERIFIED]; [TechCrunch tag](https://techcrunch.com/tag/beacons/) [REPORTED] |
| Smash Balloon (Instagram Feed) | Not verified | Instagram feed on WordPress sites | Connect "Business Basic" (Instagram Login) or "Business Advanced" (Facebook-linked) | Website owners | Not captured | Not captured | Mature plugin | Personal-account feeds "will stop updating"; hashtag and mention feeds need Business Advanced | Widget only, no profile, stats or discovery | [Smash Balloon doc](https://smashballoon.com/doc/how-to-reconnect-a-personal-instagram-account-basic-display-api-deprecation/) [VERIFIED] |
| Spotlight (WordPress) | Not verified | Instagram feed on WordPress | Graph API only | WordPress owners | Not captured | Named by TechCrunch among affected services | n/a | Personal feeds broke; follower and post counts, likes/comments, hashtag and tagged feeds need a Facebook-linked account (per vendor) | Widget only | [spotlightwp.com](https://spotlightwp.com/instagram-basic-display-api-is-ending/) [VERIFIED] |
| SnapWidget | Not verified | Instagram feed widget for any site | Re-auth via business connection | Website owners | Not captured | Named by TechCrunch | Works with any builder | Personal accounts dropped | Widget only | [SnapWidget help](https://help.snapwidget.com/en/articles/9952836-deprecation-of-the-instagram-basic-display-api) [VERIFIED] |
| LightWidget | Not verified | Instagram feed widget | Business connection only | Website owners | Not captured | Not captured | n/a | "ending support for personal Instagram accounts" | Widget only | [lightwidget.com](https://lightwidget.com/basic-display-api-deprecation) [VERIFIED] |
| Behold | Not verified | Feed widgets, JSON feeds, Admin API for platforms | Drop-in widget or JSON | Sites, developers, platforms | No prices on homepage | No counts | Could be build-or-buy infrastructure [INFERENCE] | Account-type support not stated | Infrastructure, not an artist product | [behold.so](https://behold.so/) [VERIFIED] |
| Pixpa | Not verified (INR pricing) | Portfolio website builder; no Instagram-feed feature listed (only "Social Media Connections", "Social sharing widgets") | Templates plus client galleries | Photographers, creatives | Basic ₹200, Creator ₹300, Professional ₹400, Advanced ₹600 per month, billed yearly with a "50% Limited Time Offer" (regular ₹400–₹1,200) | "200+ premium templates" | INR pricing; client albums | Instagram feed status after Dec 2024 not verified | Manual site upkeep. Underdawg fills itself from Instagram | [pixpa.com/pricing](https://www.pixpa.com/pricing) [VERIFIED] |
| Adobe Portfolio | Not verified | Portfolio site (Lightroom and Behance integrations) | Manual pages | Creatives | Not captured | n/a | Adobe ecosystem | Instagram-style posting not supported (2022 thread) | No Instagram sync | [Adobe Community, 2022](https://community.adobe.com/questions-606/instagram-aesthetic-for-adobe-portfolio-578297) [VERIFIED] |
| Meta Instagram Creator Marketplace (brand-facing creator profiles) | US (Meta) | Brands see creator profiles built from first-party Instagram data | API offers "personalized creator recommendations and search using authenticated first-party data": follower growth (30 days), engagement, audience demographics, partnership history, media performance incl. shares | Brands and agencies (creators must be onboarded) | Free to brands; needs `instagram_creator_marketplace_discovery` with Advanced Access | Rate limit raised 240 → 1,000 queries/user/hour (2026-03-30) | Native, authoritative data | India availability not explicit (an example response shows "IN") | Meta's own brand-discovery layer, the strongest substitute for a brand-facing verified profile | [Creator Marketplace API doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md); [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED] |
| Kofluence | India | Influencer platform with a creator app | AI matchmaking; how Instagram is connected is not stated | Brands, creators | Pricing not disclosed | "750,000+ influencers" (page also says "500,000+"); "$4 million led by Nikhil Kamath" (vendor claims) | Large Indian network | Inconsistent counts | Brand-campaign marketplace, not an artist portfolio or discovery | [kofluence.com](https://www.kofluence.com/) [VERIFIED vendor claims] |
| Hobo.Video | India (Delhi) | Influencer/UGC marketplace with a creator database | Brief → match ("144 data points") → campaign | Brands | No prices | "225,187+" influencers, "12,000+ brands" (vendor claims) | Indian scale | n/a | Brand-led, not artist-led | [hobo.video](https://hobo.video/) [VERIFIED vendor claims] |

**Not verified (blocked or not reached):** Behance, ArtStation, Cara, Saatchi Art, VSCO, The Dots and Contra Instagram import; Format, Wix, Squarespace help notices; Elfsight, Juicer, Taggbox. No verified artist platform that builds the profile from an Instagram sync was found, but the search was not exhaustive.

#### H (evidence). Risks seen in the market and how competitors handled them
**Abrupt API removal.**
- 90 days' notice (2024-09-04 → 2024-12-04) — [Meta](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/) [VERIFIED]
- Widget vendors responded by telling users to convert to professional accounts ("free, easy to do", per SnapWidget) and to re-authenticate — [SnapWidget](https://help.snapwidget.com/en/articles/9952836-deprecation-of-the-instagram-basic-display-api) [VERIFIED]

**Account-type gating.** Instagram Login serves "Instagram professionals — businesses and creators". It "does not require a Facebook Page". It "cannot access ads or tagging" — [Meta docs](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login.md) [VERIFIED]

**Profile fields available with Instagram Login:** `followers_count`, `follows_count`, `media_count`, `account_type` ("Business or Media_Creator") and `profile_picture_url`.
- Short-lived tokens last 1 hour and long-lived tokens 60 days; the sample call uses v25.0 — [Meta get-started](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started.md) [VERIFIED]
- This resolves the sub-researcher's open question: follower counts ARE available without a Facebook Page.

**App Review.** A "Tech Provider" whose app "serves multiple businesses" needs Advanced Access via App Review.
- Permissions affected: `instagram_business_basic`, content publishing, manage comments, manage messages.
- Reviewers require step-by-step test instructions and screencasts in an English UI — [Meta App Review](https://developers.facebook.com/documentation/instagram-platform/app-review.md) [VERIFIED]

**Scope churn.** New scope names arrived 2024-09-17; the old ones were deprecated 2025-01-27 — [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED]

**Complaint: personal-account feeds broke on 2024-12-04.**
- COMMON by the 3-source rule: SnapWidget, LightWidget, Smash Balloon, Spotlight, Drupal issue, TechCrunch (sources above).
- Caveat: mostly vendor notices, not end-user threads.

#### J. India specifics (evidence)
- Indian portfolio-builder pricing anchors Underdawg's ₹299 Pro. Pixpa's Creator plan is ₹300/mo billed yearly (discounted from ₹600) — [Pixpa](https://www.pixpa.com/pricing) [VERIFIED]
- Indian creator marketplaces (Kofluence, Hobo.Video) are brand-led and show no Instagram-synced public creator portfolio on their homepages — [Kofluence](https://www.kofluence.com/), [Hobo.Video](https://hobo.video/) [VERIFIED]
- Scale of India's Instagram audience: 481M ad reach (Oct 2025) — [DataReportal](https://datareportal.com/reports/digital-2026-india) [REPORTED]

### Inferences

#### C. Is it unique?
**Classification: Common as a component, rare as a combination.** Feed mirroring is common. A verified profile for an artists-only network is rare.

| Dimension | Assessment |
|---|---|
| Functional | Mirroring an Instagram grid is offered by Linktree, Later, Behold and the widgets. Brand-facing verified profiles exist in Beacons' media kit and Meta's Creator Marketplace. |
| Audience | No verified artists-only product builds its profile from an Instagram sync. Not exhaustive. |
| Workflow | Zero-effort profile at signup ("Login with Instagram"). Useful, but easy to copy. |
| Network | It becomes valuable only if synced posts feed a cross-artist search and browse layer. A single profile has no network value. |
| Data | Owner-authorised media plus insights across many artists would be a unique dataset (by discipline, city, style). Allowed uses under Meta Platform Terms were NOT verified (gap). |
| Discovery | Enabler only. It supplies the inventory; it is not itself a mechanism. |
| Combination | Sync + verified stats + brand view + discovery index is rare. Instagram's Creator Marketplace is the closest substitute for the brand-side part. |

#### D. Artist value
**Meaningful outcomes.**
- A presentable portfolio for brands and curators with no extra work.
- Proof of account ownership via OAuth, which reduces impersonation.
- A foundation for being found by discipline, style and city.

**Vanity.** Big follower numbers on the profile. For under-discovered artists these signal weakness and can deter brands. Default to resonance metrics (see Feature 2), not raw followers.

#### E. Discovery impact
**Impact by discovery type.**
- New/unknown-artist exposure: indirect; it supplies the content to rank.
- Search, genre, style and skill discovery: depend on Underdawg adding structured tags (discipline, medium, city). Instagram captions are noisy.
- Local discovery: needs artist-declared location.
- Brand and curator discovery: strong, if combined with a brand view.

**Popularity bias.** If ranking uses Instagram followers or likes, the largest accounts win. Fair-discovery mechanisms:
- Rank by per-reach resonance with small-sample smoothing (Feature 2).
- Reserve exposure slots for artists under 1k–5k followers.
- Hide follower counts in brand search by default.
- Rotate exposure across new profiles.
- Let curators tag work, not accounts.

#### F. Behaviour

| Question | Assessment |
|---|---|
| Why use it | To get a profile instantly |
| Frequency | Once at onboarding, then passive. Artists check it occasionally. |
| Create content for it | No. They create for Instagram. |
| Return because of it | Only if something happens on Underdawg (profile views by brands, inquiries) |
| Invite other artists | Low |
| Share externally | Via the link-in-bio page (Feature 4) |

**Network effect and loop.** Indirect: more artists means richer search for brands, which means more inquiries, which attracts more artists. That loop needs a brand/curator demand side that the six features alone do not create.

#### G. Category
Primarily an activation feature: profile filled from Instagram, live in minutes. It also supports acquisition (Instagram login lowers friction) and is the foundation discovery builds on.

#### H. Risks (analysis)
- **Platform exposure (high).**
  - Professional accounts only. The share of Indian artists on personal accounts is unknown, so No reliable public data found.
  - App Review and Advanced Access are needed before launch.
  - Long-lived tokens expire after 60 days, so silent reconnect failures are likely.
- **Content risks.**
  - Instagram content is not always the artist's own: reposts, AI-generated work, collaborations. This brings copyright and impersonation questions.
  - Meta added an `is_ai_generated` publish parameter on 2026-06-22 — [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED]. Reading AI labels on existing media was not verified.
- **Moderation.** Lower than a native feed, because content is already moderated by Instagram [INFERENCE].
- **Mitigations:**
  - Snapshot media metadata.
  - Let artists add non-Instagram works and links (Spotify, YouTube, Behance).
  - Monitor token health.

#### I. Scale dependency
Works at **1,000 artists** as a standalone portfolio utility. Discovery value appears at roughly **10,000+ artists**, when there is enough inventory per discipline and city for brands to search.

#### K. Preliminary verdict: **Build early — Modify**
**Why build early.** It is the cheapest way to solve cold start and is the inventory for any discovery or brand-search layer.

**Modifications:**
1. Treat it as "import plus curate", not a mirror. Artists pick featured works and add discipline, medium and city tags.
2. De-emphasise follower counts.
3. Support non-Instagram works.
4. Build an onboarding path for artists who must switch to a Creator account.

### Gaps
- Artist-community evidence (Reddit and similar) on "Instagram as portfolio" pains or "Instagram is a bad portfolio": not collected.
- Share of Indian artists using personal vs professional Instagram accounts: No reliable public data found.
- Whether Behance, ArtStation, Cara, VSCO, The Dots or Contra offer Instagram import: not verified.
- Meta Platform Terms limits on storing or analysing synced media (e.g., for recommendations): not opened.

---

## Feature 2 — Instagram insights and verified engagement rate (Follower ER, "True ER" per reach, growth, best time to post, suggested brand price)

### Takeaway
Raw Instagram stats are free in Instagram. The defensible part is owner-authorised, reach-normalised credibility that a brand can trust.
- Brands' fraud worries are high: 89% expect or have experienced fraud.
- Public tools can only see likes, comments and views. Saves, shares and reach need the creator's login.

But Meta already gives brands first-party creator data through its Creator Marketplace. Accounts under 100 followers get less API data. No INR rate benchmarks exist to support "suggested price".

Verdict:
- **Build early** the verified credibility card, inside the brand view.
- Treat suggested pricing as an **Experiment**.
- **Deprioritise** "best time to post".

### Cited Findings

#### A. Problem validation
**Evidence the problem exists**
- **Brands fear fraud.** "89% of respondents experienced or expect fraud/quality risks". Of the issues reported, 56.5% were fake or bot followers and 10.2% fake or purchased engagement (600+ respondents) — [Influencer Marketing Hub Benchmark Report 2026, 2026-05-04](https://influencermarketinghub.com/influencer-marketing-benchmark-report/) [VERIFIED; publisher survey]
- **Brands are shifting toward small creators.** 51.43% plan to expand nano-creator use and 52.83% micro, while macro is flat (20.59% expanding vs 20.58% contracting) — [IMH 2026](https://influencermarketinghub.com/influencer-marketing-benchmark-report/) [VERIFIED]
- **What brands prioritise.** Among high-growth brands: awareness 89%, engagement 51%, content quality 39%, conversions 35% — [IMH 2026](https://influencermarketinghub.com/influencer-marketing-benchmark-report/) [VERIFIED]. Reach-based metrics matter as much as ER.
- **There is no standard price.** Instagram rates by tier: nano (<10K) $10–100/post; micro (10K–100K) $100–500; mid (100K–500K) $500–5,000; macro (500K–1M) $5,000–10,000; mega (1M+) $10,000+. Rates vary by "engagement, niche, geography, and usage rights" — [IMH rates guide, updated 2026-08-31](https://influencermarketinghub.com/instagram-influencer-rates/) [VERIFIED]
- **Most creators have never done a brand deal.** "67% of creators say they've never collaborated with a brand"; "12% … earned ≤$100 from a single brand collaboration" (survey of 9,576 Linktree users) — [Linktree Creator Report 2022](https://linktr.ee/creator-report) [VERIFIED; older data]
- **India has the same problems.** BCG's India report names "fake engagement" and "ROI measurement gaps" as infrastructure gaps — [BCG, 2025-05-03](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy) [VERIFIED]
- **Brand deals dominate Indian creator income.** They account for "nearly three-quarters" of Indian creator income — [Mediabrief on BCG, 2025-05-06](https://mediabrief.com/inside-the-2bn-surge-of-indias-creator-economy-bcg-report/) [REPORTED]
- **Creators sell rate guides on Gumroad and Substack**, which hints at demand for pricing help — [SNIPPET titles only; low confidence]

**Counter-evidence (why this may not be a gap)**
- **Instagram's free dashboard already covers raw stats.** It shows views, reach, interactions incl. saves and shares, profile activity incl. external link taps, demographics, best times (in the audience tab), and retention and skip rate — [frameos.studio, 2026-08-09](https://frameos.studio/blog/how-to-read-instagram-insights) [REPORTED]
- **Free ER and price calculators already exist.** HypeAuditor's free ER calculator uses the median of the 30 latest posts and (Likes+Comments)/Views, or /Followers when there are too few Reels. It also offers a separate "Instagram Pricing Calculator" — [HypeAuditor](https://hypeauditor.com/free-tools/instagram-engagement-calculator/) [VERIFIED]
- **Meta gives brands first-party creator data.** The Creator Marketplace API offers "personalized creator recommendations and search using authenticated first-party data" (follower growth, engagement, demographics, partnership history, media shares) — [Meta doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md) [VERIFIED]
- **Instagram tested a brand-facing "Creator Insights" panel.** It showed follower growth, accounts reached and accounts engaged over 30 days, to brand accounts, for selected profiles — [Social Media Today, 2024-06-16](https://www.socialmediatoday.com/news/instagram-tests-creator-insights-profile-performance-brands/719065/) [REPORTED]
- **Insight exports may be native now.** "Creators will be able to export insights as a PDF from the Edits app" (Oct 2025) — [HeyOrca update log](https://www.heyorca.com/blog/instagram-social-news) [REPORTED; primary Meta source not found]. Instagram's Edits page mentions "Real-time insights" — [creators.instagram.com/edits](https://creators.instagram.com/edits/) [VERIFIED]
- **Small accounts produce tiny numbers.** For 1–5K-follower accounts, average comments per post are 1–3 and average saves per post are 1 — [Socialinsider 2026 benchmarks](https://www.socialinsider.io/social-media-benchmarks/instagram) [VERIFIED]. True ER for emerging artists will rest on very small counts [INFERENCE].
- **Benchmarks disagree by denominator and sample.** Socialinsider puts average Instagram ER at 0.48% for 2025 (down 24% YoY; mostly brand pages). HypeAuditor's averages by follower tier: 1K–5K 4.8%, 20K–100K 1.2%, 100K–1M 1.0%, 1M+ 1.2%, overall 2.2% — [Socialinsider](https://www.socialinsider.io/social-media-benchmarks/instagram); [HypeAuditor](https://hypeauditor.com/free-tools/instagram-engagement-calculator/) [VERIFIED]

**Answers to the brief's problem questions**

| Question | Answer |
|---|---|
| Problem | Proving real reach and engagement to brands, and knowing what to charge. |
| Severity | High for creators pitching brands. Low for artists not yet doing brand work, which is most of them (67% had never collaborated, 2022). |
| Frequency | Occasional, when pitching. [INFERENCE] |
| Segments | Content-creating artists who do brand work: illustrators, photographers, dancers, fashion creatives, musicians doing promos. |
| Workarounds | Screenshots of Instagram Insights; Beacons/Stan media kits; free ER calculators; rate guides. |
| Why insufficient | Screenshots can be faked [INFERENCE]. Public calculators lack saves, shares and reach. Brand tools cost $199+/mo (Modash). Indian INR rate benchmarks were not found. |

#### B. Competitor table (Feature 2)
| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Instagram Insights / Professional Dashboard | US (Meta) | Native stats | In-app for professional accounts: views, reach, interactions, saves, shares, follows, demographics, best times, retention, skip rate | All professional accounts | Free | No public figure | Free, first-party, newest metrics | "Best times" is buried; caveats for collabs, trials and cross-posts | Underdawg adds follower and reach ER, peer benchmarks, longer history, a shareable verified card and price guidance | [frameos.studio 2026-08-09](https://frameos.studio/blog/how-to-read-instagram-insights) [REPORTED] |
| Meta Creator Marketplace (+ "Creator Insights" test) | US (Meta) | Brands see a creator's first-party performance | Brand search and recommendations; 30-day follower growth, engagement, demographics, partnership history | Brands; onboarded creators | Free | Brand-side rate limit raised to 1,000 queries/user/hour (2026-03-30) | Authoritative; inside Instagram | Brand-side only; onboarding rules not documented in the API doc | Meta already provides "verified stats" to brands. Underdawg must add artist context (discipline, portfolio, rates, availability) | [Meta doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md) [VERIFIED]; [SMT 2024-06-16](https://www.socialmediatoday.com/news/instagram-tests-creator-insights-profile-performance-brands/719065/) [REPORTED] |
| HypeAuditor | Not verified | Free ER calculator, fake-follower checks, pricing calculator; paid brand discovery | Public data; median of 30 latest posts | Brands (paid); anyone (free tools) | Paid prices hidden ("Request demo"); free tools | No figure on fetched pages | Benchmarks; fraud tooling; already suggests prices | Uses public likes and comments only (no saves, shares or reach) [INFERENCE from Meta permissions] | Underdawg uses owner-authorised saves, shares and reach; artist-only; INR | [HypeAuditor calculator](https://hypeauditor.com/free-tools/instagram-engagement-calculator/); [pricing](https://hypeauditor.com/pricing/) [VERIFIED] |
| Modash | Not verified | Creator database and audience data for brands | Search index; profile unlocks | In-house brand teams | Essentials $199/mo; Performance $499/mo; Enterprise $14,700+/yr; 14-day trial | "2600+ in-house teams"; "380M+ creators" (also "350M+") | Huge index | Brand-priced; inconsistent size claim | Buyer-side tool. Underdawg is creator-side and could become a verified source | [modash.io/pricing](https://www.modash.io/pricing) [VERIFIED] |
| Iconosquare | Not verified | Analytics, competitor tracking, scheduling | Dashboards; history retention by plan | Brands, agencies, SMBs | Free €0 (1 month of data); Starter from €9; Launch €33; Scale €69; Custom €116+ /mo | "More than 10,000 brands and agencies" | Free plan; 2-year history on Scale | EUR pricing; ER basis not stated | Generic; no brand-facing proof page or price guidance | [iconosquare.com/pricing](https://www.iconosquare.com/pricing) [VERIFIED] |
| Metricool | Not verified | Analytics, "Best Times", scheduling | Multi-brand dashboard | SMBs, agencies, creators | Free (1 brand, 30 days of analytics); Starter $20–36; Advanced $53–210 /mo | iOS 2.67 (111 US) | Generous free tier | Fair-use cap; low app rating | Not artist-specific | [metricool.com/pricing](https://metricool.com/pricing/) [VERIFIED]; [App Store](https://apps.apple.com/us/app/metricool/id1072510529) |
| Later (analytics) | Not verified | Analytics, best times (Growth plan) | Social sets | Creators, SMBs | $18.75 / $37.50 / $82.50 per month, billed yearly; no free plan | iOS 4.55 (2,526 US) | Analytics history 3 months–2 years | No free plan | Not artist-specific | [later.com/pricing](https://later.com/pricing/) [VERIFIED] |
| Sprout Social | Not verified | Enterprise analytics | Per seat | Mid-market, enterprise | $79–$399 per seat/mo | n/a | Depth | Expensive | Not for artists | [sproutsocial.com/pricing](https://sproutsocial.com/pricing/) [VERIFIED] |
| Hootsuite | Not verified | Analytics and publishing | Per user | Teams | $99 / $199 / $399 per user/mo; no free plan | iOS 4.67 (34,295 US) | Breadth | Expensive | Not for artists | [hootsuite.com/plans](https://www.hootsuite.com/plans) [VERIFIED] |
| Socialinsider | Not verified | Analytics and benchmark reports | Cross-network benchmarking | Agencies, brands | $82 / $124 / $199 per month | n/a | Public benchmarks | ER method not stated on pricing page | Agency tool | [socialinsider.io/pricing](https://www.socialinsider.io/pricing) [VERIFIED] |
| Beacons media kit | Not verified | Auto-updating media kit with rate cards | Connected accounts; daily updates | Creators | Free (9% fee) to $100/mo | Trustpilot 2.0/5 (42) | Rate cards plus kit | Support complaints | Not artist-specific; no peer benchmarks | [beacons.ai/i/pricing](https://beacons.ai/i/pricing) [VERIFIED] |
| Qoruz | India (inferred from client logos) | ER, follower growth, "Creator Authority Score", fraud detection | Database search for brands | Agencies, D2C brands | Free / Premium / Enterprise (no prices) | Client logos (Amazon Mini TV, Dabur, L'Oréal) | Indian authority score | No public prices | Brand-side scoring. Underdawg offers creator-owned, API-verified stats | [qoruz.com/pricing](https://www.qoruz.com/pricing) [VERIFIED] |
| Kofluence | India | "Fraud protection", reporting, creator app | Matchmaking | Indian brands and creators | Not disclosed | "750,000+" (also "500,000+") creators | Indian scale | Inconsistent counts | Campaign marketplace | [kofluence.com](https://www.kofluence.com/) [VERIFIED vendor claims] |
| Influencer Marketing Hub (rates guide) | n/a | Public rate ranges | Editorial | Creators, brands | Free | n/a | Rate anchors (USD) | Very wide ranges; no INR | Underdawg could personalise ranges with verified data | [IMH rates](https://influencermarketinghub.com/instagram-influencer-rates/) [VERIFIED] |

**Which tools compute ER how.**
- By views or by followers: HypeAuditor [VERIFIED].
- By reach: not confirmed for any competitor fetched.
- Modash, Iconosquare, Metricool, Socialinsider: method not stated on the fetched pages.

**Who already suggests prices:** HypeAuditor (calculator) and IMH (ranges).

#### H (evidence). API realities that shape the feature
**Thresholds that hit emerging artists** — [Meta user insights doc](https://developers.facebook.com/documentation/instagram-platform/api-reference/instagram-user/insights.md) [VERIFIED]
- "follower_count and online_followers metrics are not available on Instagram business or creator accounts with fewer than 100 followers".
- `follows_and_unfollows` is not returned under 100 followers.
- `online_followers` (the data behind best time to post) covers "only… the last 30 days".
- "Data… may be delayed up to 48 hours".

**Retention and expiry.**
- Media metrics are stored up to 2 years; user metrics up to 90 days.
- Story metrics are available for 24 hours only, and values below 5 return an error.
- No per-slide carousel stats.
- Source: sub-researcher reading of [Meta insights docs](https://developers.facebook.com/docs/instagram-platform/insights) [VERIFIED]

**Metric churn**
- 2024-10-02: these account metrics were discontinued: `profile_views`, `website_clicks`, `email_contacts`, `get_direction_clicks`, `phone_call_clicks`, `text_message_clicks`.
- 2025-01-21: `views` added; `impressions` and `plays` deprecated for all versions from 2025-04-21.
- 2026-04-22: `saved_count`, `shares_count` and `reposts_count` media fields added, for Facebook Login apps — [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED]

**What public data can and cannot show.** Business Discovery returns other professional accounts' `followers_count`, `media_count`, `like_count`, `comments_count` and `view_count`; age-gated accounts are excluded — [Meta doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/business-discovery.md) [VERIFIED]. Saves, shares and reach are not in that field list, so "True ER" requires the artist's own authorisation [INFERENCE]. That authorisation is the basis of a "verified" claim.

**Permissions:** `instagram_business_basic` + `instagram_business_manage_insights` (Instagram Login) — sub-researcher reading of [Meta docs](https://developers.facebook.com/docs/instagram-platform/insights) [VERIFIED]

#### J. India specifics (evidence)
- **INR per-post rate benchmarks by follower tier:** No reliable public data found this session.
- **Indian tools sell fraud screening to brands** (Kofluence "fraud protection"; Qoruz fraud detection and "Creator Authority Score"): [Kofluence](https://www.kofluence.com/), [Qoruz](https://www.qoruz.com/pricing) [VERIFIED]
- **BCG names "fake engagement" as a gap** in India's creator economy: [BCG 2025](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy) [VERIFIED]

### Inferences

#### C. Is it unique?
**Classification by component.**

| Component | Classification |
|---|---|
| Analytics dashboards | Very common |
| Owner-verified stats shown to brands | Somewhat common (Beacons auto-updating kit; Meta Creator Marketplace) |
| Reach-normalised "True ER" with discipline/city benchmarks for artists | Rare (none found) |
| INR price suggestion for artists | Rare |

**By dimension.**

| Dimension | Assessment |
|---|---|
| Functional | ER calculators are common; verified ER per reach is uncommon among creator-side tools. |
| Audience | No artist-specific product found. |
| Workflow | Auto-computed and shareable, with no screenshots. |
| Network | An artists-only network enables peer benchmarks ("illustrators in Pune with 2–5K followers"). This is the strongest network-dependent angle. |
| Data | High. A consented panel of reach, saves and shares per discipline would be unique, and could later power pricing benchmarks that do not exist publicly in INR. |
| Discovery | Reach-normalised resonance is a fair-discovery signal that does not reward size. |
| Combination | Verified stats + artist portfolio + availability and rates in one brand-facing card is rare. Meta covers stats, not artist context. |

#### D. Artist value
**Meaningful:**
- Credibility with brands (fraud worry is high).
- Pricing confidence.
- Learning which work resonates (saves and shares per reach).

**Vanity:** likes and follower dashboards, which duplicate Instagram and invite toxic comparison.

#### E. Discovery impact
**Positive.** True ER per reach can surface small, high-resonance artists. HypeAuditor shows small accounts have higher ER (4.8% at 1K–5K vs ~1% at 100K+), so ER-based ranking favours emerging artists.

**Caution.** Small denominators are noisy (1–3 comments and about 1 save per post at 1–5K followers).
- Use Bayesian smoothing or minimum-sample rules.
- Show ranges, not precise figures.

**Popularity bias.** Follower-based price formulas and follower displays favour big accounts. Prefer per-reach metrics and audience fit (discipline, city, audience demographics).

#### F. Behaviour

| Question | Assessment |
|---|---|
| Why use it | To understand stats and pitch brands |
| Frequency | Weekly for active pitchers; occasionally for others |
| Return because of it | Possibly, if a weekly "what resonated" digest exists |
| Share externally | Yes. A verified stats card link sent to brands also exposes Underdawg to brands, an acquisition loop. |
| Network effect | Benchmarks improve with more artists |

#### G. Category
- Activation: instant "your verified stats".
- Retention: digest.
- Monetisation: full stats in Pro.
- Discovery: signals.
- Acquisition: shared cards reach brands.

#### H. Risks (analysis)
- **Gaming.** Engagement pods inflate likes and comments. Saves and shares are harder to fake, but no evidence was found either way [INFERENCE].
- **Bad pricing advice.** Price suggestions could anchor artists low. No INR data is available, which creates liability and trust risk.
- **Meta changes.** Metric deprecations break formulas; this has happened 3 times since Oct 2024.
- **Small accounts.** Accounts under 100 followers get less data.
- **Stories.** Story data expires after 24 hours, so it must be snapshotted.
- **Toxic comparison.** Peer leaderboards could create it. Prefer private benchmarks.

#### I. Scale dependency
- Personal verified stats work at **1,000 artists**.
- Discipline/city benchmarks need about **10,000+** artists.
- Credible INR price suggestions need deal data, which means **100,000 artists or a functioning brand marketplace**.

#### K. Preliminary verdict: **Build early (verified credibility card) — Modify; suggested price = Experiment; best time to post = Deprioritise**
**Why build the card early.** It is the most defensible part of the Instagram layer: it needs the artist's own login, and brands care about fraud.

**Modifications:**
- Show "True ER" (saves+shares per reach) with transparent definitions and sample-size caveats.
- Avoid a vanity dashboard that duplicates Instagram.
- Derive best times from the artist's own post-level data, or skip it (native Instagram has it; the API withholds `online_followers` under 100 followers).
- Price guidance should show transparent ranges, labelled with their source (global USD tiers), until Underdawg's own deal data exists.

### Gaps
- Creator discussions on pricing confusion and stats (Reddit): not collected.
- INR rate benchmarks: not found.
- Official Meta source for the "Shareable Insights" PDF export: not found.
- ER definitions used by Modash, Iconosquare, Metricool and Socialinsider: not stated.
- Creator Marketplace onboarding thresholds and India availability: not documented.

---

## Feature 3 — Schedule posts to Instagram

### Takeaway
Scheduling is commoditised and largely free:
- Instagram's own in-app scheduler (up to 75 days ahead, reported).
- Meta Business Suite.
- Free tiers of Buffer, Metricool, Iconosquare, Zoho Social and Planoly.

It has no discovery value. It adds App Review scope, a job queue, publish-failure support and API format gaps (carousels limited to 10 items, JPEG only, music only recently via a Facebook-Login API). The best-available evidence says schedulers do not hurt reach. Linktree buying Plann (2024) shows bundling demand among link-in-bio users. Verdict: **Deprioritise** (revisit after product-market fit as a Pro convenience, or narrowly for brand-deal deliverables).

### Cited Findings

#### A. Problem validation
**Native and free options limit the need**
- **Instagram's in-app scheduler** works "Up to 75 days in advance", "up to 25 posts per day". It covers posts, carousels and Reels, but Stories are not supported. "Since March 2026, any public Instagram account can schedule posts natively" — [Albato, updated 2026-09-09](https://albato.com/blog/publications/how-to-schedule-instagram-posts) [REPORTED, single source; not confirmed by Meta]
- **Meta Business Suite** can schedule Instagram Stories, posts and Reels — [Albato](https://albato.com/blog/publications/how-to-schedule-instagram-posts) [REPORTED]
- **Meta Business Suite's app is widely used:** iOS 4.68 from 503,546 ratings (US) and 4.76 from 40,285 (IN) — [App Store US](https://apps.apple.com/us/app/meta-business-suite/id514643583) [VERIFIED catalog data]
- **Free third-party tiers** — [Buffer](https://buffer.com/pricing), [Metricool](https://metricool.com/pricing/), [Iconosquare](https://www.iconosquare.com/pricing), [Zoho Social](https://www.zoho.com/social/pricing.html), [Planoly](https://www.planoly.com/pricing) [VERIFIED]

  | Tool | Free tier |
  |---|---|
  | Buffer | 3 channels, 10 scheduled posts per channel |
  | Metricool | 20 posts/month |
  | Iconosquare | 10 posts/month per profile |
  | Zoho Social | 1 brand, basic scheduling |
  | Planoly | Mobile only, 10 uploads/month |

**Counter-signal: link-in-bio users want scheduling bundled.** Linktree acquired Plann (Aug 2024) because "Social scheduling was among the most requested features" from its user base — [TechCrunch, 2024-08-15](https://techcrunch.com/2024/08/15/linktree-acquires-plann-social-media-scheduling-tool/) [REPORTED]

**Reach myth**
- Adam Mosseri (2025-03-29 AMA): "if you use something like scheduled posts, it will not affect your reach one way or the other" — via [cadenus.io, 2026-06-30](https://cadenus.io/resources/blog/do-scheduling-tools-hurt-your-reach/) [REPORTED; primary not opened]
- A small Hootsuite test (about 10 posts) found scheduled posts at 8.19% ER vs 6.44% for native (inconclusive) — [poster.ly, 2026-05-12](https://www.poster.ly/blog/does-scheduling-hurt-reach-research) [REPORTED]
- The concern recurs: at least 6 vendor articles exist just to debunk it [SNIPPET titles]

**Answers to the brief's problem questions**

| Question | Answer |
|---|---|
| Problem | Time management and posting consistency. |
| Severity | Low to moderate. |
| Frequency | Weekly for planners; most emerging artists post ad hoc (No reliable public data found). |
| Workarounds | Native scheduler, Meta Business Suite, free third-party tiers. |
| Why insufficient | Native scheduling reportedly lacks Stories; that is a minor gap. |

#### B. Competitor table (Feature 3)
| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Instagram in-app scheduler | US (Meta) | Native scheduling | 75 days ahead; 25 posts/day; posts, carousels, Reels; no Stories | Reportedly all public accounts since Mar 2026 | Free | No figure | Native editing tools, music, free | No Stories (reported) | Underdawg could schedule Stories via API and tie scheduling to analytics; marginal | [Albato 2026-09-09](https://albato.com/blog/publications/how-to-schedule-instagram-posts) [REPORTED] |
| Meta Business Suite / Planner | US (Meta) | Free scheduling for Facebook and Instagram incl. Stories | Desktop and app | Businesses, creators | Free | iOS 503,546 ratings (US), 40,285 (IN) | Free; Stories | Limits not verified | Same as above | [App Store](https://apps.apple.com/in/app/meta-business-suite/id514643583) [VERIFIED catalog]; [Albato](https://albato.com/blog/publications/how-to-schedule-instagram-posts) [REPORTED] |
| Later | Not verified | Visual planner, scheduler, best times | Social sets | Creators, SMBs | No free plan; $18.75 / $37.50 / $82.50 per month billed yearly | iOS 4.55 (2,526 US) | Instagram-first | 30 posts/profile/mo on Starter | General-purpose; costs more than ₹299 | [later.com/pricing](https://later.com/pricing/) [VERIFIED] |
| Buffer | Not verified | Scheduling plus basic analytics | Per-channel pricing | Solo creators, SMBs | Free (3 channels, 10 posts each); $5 / $10 per channel/mo | iOS 4.73 (34,478 US; 949 IN) | Cheapest paid option | Free plan has 30-day insights | General-purpose | [buffer.com/pricing](https://buffer.com/pricing) [VERIFIED] |
| Planoly | Not verified | Visual grid planner; link in bio; DM automation | Social sets | Creators | Free (mobile, 10 uploads/mo); $14 / $24 / $47 per month | iOS 4.71 (26,970 US) | Creator-friendly. Snipfeed's pricing URL now redirects to Planoly | n/a | General-purpose | [planoly.com/pricing](https://www.planoly.com/pricing) [VERIFIED] |
| Hootsuite | Canada (not verified on page) | Enterprise publishing | Per user | Teams | $99 / $199 / $399 per user/mo | iOS 4.67 (34,295 US) | Breadth | Expensive; trial cap 10–20 posts/day | Not for artists | [hootsuite.com/plans](https://www.hootsuite.com/plans) [VERIFIED] |
| Metricool | Not verified | Scheduling plus analytics | Multi-brand | SMBs, creators | Free (20 posts/mo); $20–36; $53–210 | iOS 2.67 (111 US) | Free tier | Low app rating; fair-use cap | General-purpose | [metricool.com/pricing](https://metricool.com/pricing/) [VERIFIED] |
| Sprout Social | Not verified | Enterprise publishing | Per seat | Mid-market | $79–$399 per seat/mo | n/a | Depth | Price | Not for artists | [sproutsocial.com/pricing](https://sproutsocial.com/pricing/) [VERIFIED] |
| SocialPilot | Not verified (brief says India) | Bulk scheduling | By number of accounts | SMBs, agencies | $30 / $50 / $100 / $200 per month; no free plan | n/a | Many accounts | No free plan | Agency tool | [socialpilot.co/plans](https://www.socialpilot.co/plans) [VERIFIED] |
| Zoho Social | Not verified (brief says India) | Scheduling | By brand count | SMBs | Free (1 brand); paid prices not displayed | n/a | Free plan; Zoho suite | INR page returned 404 | Business tool | [zoho.com/social/pricing](https://www.zoho.com/social/pricing.html) [VERIFIED] |
| Predis.ai | Not verified (brief says India) | AI content plus auto-posting | Credits | SMBs | Core $24 (no auto-posting); Rise $55; Enterprise+ $212 per month | "6.4 million businesses", G2 4.7 (vendor claims) | AI creative | Auto-posting only from Rise | AI ad maker | [predis.ai/pricing](https://predis.ai/pricing/) [VERIFIED] |
| Linktree (via Plann acquisition) | Australia | Scheduling bundled into a link-in-bio suite | Planned integration of Plann scheduling for TikTok, Facebook, LinkedIn, Instagram | Linktree users | Not verified | 50M users at the time of the deal | Bundling with link-in-bio | Integration status in 2026 not verified | The same bundle Underdawg proposes, by the category leader | [TechCrunch 2024-08-15](https://techcrunch.com/2024/08/15/linktree-acquires-plann-social-media-scheduling-tool/) [REPORTED] |

#### H (evidence). API constraints
**Publishing limits** — [Meta content publishing](https://developers.facebook.com/documentation/instagram-platform/content-publishing.md) [VERIFIED]
- "Instagram accounts are limited to 100 API-published posts within a 24-hour moving period. Carousels count as a single post."
- Carousels: up to 10 items. JPEG is the only image format.
- Shopping tags and filters are not supported.
- No native scheduled-publish parameter, so Underdawg must run its own job queue.

**Containers.** 400 containers per rolling 24 hours, and containers expire after 24 hours. Collaborators (up to 3), `user_tags`, `alt_text` and `trial_params` are supported — sub-researcher reading of the [IG User media reference](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media) [VERIFIED]

**New publishing capabilities** — [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED]
- 2025-12-03: Trial Reels can be published via API.
- 2026-04-22: "Paid partnership" label parameters (`branded_content_sponsor_ids`, `is_paid_partnership`).
- 2026-06-01: Instagram Audio API (original sounds and royalty-free music).
- 2026-06-22: `is_ai_generated` flag.

Whether Instagram Login apps can attach licensed music is not verified.

**Permissions.** `instagram_business_content_publish` needs Advanced Access and App Review for multi-account apps — [Meta App Review](https://developers.facebook.com/documentation/instagram-platform/app-review.md) [VERIFIED]

#### J. India specifics (evidence)
- India-associated tools (SocialPilot, Statusbrew, Zoho Social, Predis.ai) show USD prices or none; INR prices were not captured — see table.
- Meta Business Suite iOS has 40,285 ratings in India — [App Store IN](https://apps.apple.com/in/app/meta-business-suite/id514643583) [VERIFIED catalog]
- No India-specific survey on scheduling was found.

### Inferences

#### C. Is it unique?
**Classification: Very common.**
- Functional: none unique.
- Audience: none artist-specific.
- Workflow: a possible niche is scheduling brand-deal deliverables with the paid-partnership label, tied to Underdawg's brand/hire flow. Meta added the label parameters in Apr 2026, but for Facebook Login apps.
- Network: none.
- Data: low (posting-time outcomes could feed Feature 2).
- Discovery: none.
- Combination: Linktree (with Plann) and Planoly (with Snipfeed) already bundle scheduling with link-in-bio.

#### D. Artist value
It saves time, which is neither vanity nor a meaningful career outcome. It does not help artists get discovered, hired or paid.

#### E. Discovery impact
- Discovery impact: none.
- Popularity bias: none, but scheduling encourages volume over quality.
- No fair-discovery mechanism is needed.

#### F. Behaviour
| Question | Assessment |
|---|---|
| Frequency | Weekly for planners |
| Create content for it | No |
| Return because of it | Weak (competes with free native tools) |
| Invite other artists | No |
| Share externally | No |
| Network effect | No |

#### G. Category
Mild retention and monetisation (a Pro convenience). Not discovery or acquisition.

#### H. Risks (analysis)
- Publish-failure support burden (token expiry, media format, JPEG conversion).
- App Review scope creep.
- Meta can expand native scheduling at any time; it reportedly did so in Mar 2026.
- Feature clutter in an artists-first product.

#### I. Scale dependency
None. It works at any scale, but its value does not grow with the network.

#### K. Preliminary verdict: **Deprioritise**
**Why:**
- Free native and free-tier alternatives exist.
- Zero discovery impact.
- Added App Review and engineering complexity.

**Revisit after product-market fit:**
- Only if retention data shows demand, or as part of a brand-deal workflow ("schedule the sponsored post with the paid-partnership label").
- Bundled into Pro, never a headline feature.

### Gaps
- An official Meta source for native scheduling specifics (75 days, 25/day, Stories, the Mar 2026 opening): not found.
- Meta Business Suite planner limits: not found.
- Reddit evidence on whether creators still use third-party schedulers: not collected.
- An Instagram-specific large-sample study on scheduler reach: not found. The Buffer 2018 study excluded Instagram.

---

## Feature 4 — Link-in-bio page (underdawg.com/username: blocks, fan/brand views, money-per-link analytics, UPI)

### Takeaway
The need is real and proven at scale:
- Linktree had 24M users (Mar 2022), 50M (May 2024) and 70M+ (Apr 2025).
- Taplink shows 8.8M pages; Milkshake claims 5M+ creators.
- Stan says creators earned $400M+.
- Instagram still rations links: 5 bio links since 2023; "Links in reels" is now sold through Meta Verified tiers.

But the category is very common, and complaints concentrate on support, payouts and lock-in. In India:
- Linktree costs ₹360/₹650/₹1,450 per month (monthly billing).
- Linktree was unreachable for several days in Aug 2025.
- Global tools show Stripe/PayPal, not UPI.

The only plausible edge is an artist-specific combination: verified brand view, hire-me/book-me, UPI tips and payments, and fan contact capture at ₹299. The page also works as Underdawg's viral acquisition channel. Verdict: **Build early — Modify** (narrow MVP block set).

### Cited Findings

#### A. Problem validation
**Instagram rations links**
- Up to 5 bio links since 2023-04-18. Zuckerberg called it "probably one of the most requested features". Meta said it does "not plan to block Linktree links" — [TechCrunch, 2023-04-18](https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/) [REPORTED]
- Link-in-bio tools "came about due to platform limitations" — [Digital Music News, 2023-04-20](https://www.digitalmusicnews.com/2023/04/20/instagram-allows-five-links-bio-smartlink-economy/) [REPORTED]
- Meta Verified now lists "Links in reels (varying by tier)" and "Add images to your links" as paid benefits. Tiers: Standard $14.99, Plus $49.99, Premium $149.99, Max $499.99 per month per profile; "pricing may vary by region" — [meta.com/meta-verified](https://www.meta.com/meta-verified/) [VERIFIED]
- Clickable caption links were tested for verified accounts (Mar 2025) — [HeyOrca](https://www.heyorca.com/blog/instagram-social-news) [REPORTED]

**Meta has throttled outbound links elsewhere.** A Facebook test limited Professional-mode profiles and Pages to "two links" in organic posts per month unless they subscribe to Meta Verified ($14.99/month minimum). Meta: "This is a limited test to understand whether the ability to publish an increased volume of posts with links adds additional value for Meta Verified subscribers." Instagram was named only as an exempt link destination — [TechCrunch, 2025-12-17](https://techcrunch.com/2025/12/17/facebook-is-testing-a-link-posting-limit-for-professional-accounts-and-pages) [REPORTED]

**Musicians in particular.** Hypebot says the Facebook limit affects links to "ticketing platforms, artist websites, merch stores, streaming services". It advises artists to "prioritize owned channels like email lists, websites, Bandsintown, and SMS" — [Hypebot, 2025-12-18](https://www.hypebot.com/hypebot/2025/12/facebook-limits-links-unless-you-pay-what-musicians-venues-music-marketers-need-to-know.html) [REPORTED]

**Scale of demand**
- Linktree: "over 24 million users… close to 40,000 signups per day" (Mar 2022) — [TechCrunch, 2022-03-16](https://techcrunch.com/2022/03/16/linktree-link-in-bio-series-c-valuation/) [REPORTED]
- Linktree: 41M (Dec 2023), 47M (Mar 2024), 50M (May 2024) — [TechCrunch, 2024-05-22](https://techcrunch.com/2024/05/22/linktree-surpasses-50m-users-rolls-out-beta-social-commerce-program/) [REPORTED]
- Linktree: "over 70 million users" (Apr 2025) — [TechCrunch, 2025-04-23](https://techcrunch.com/2025/04/23/linktree-rolls-out-a-suite-of-monetization-features-for-creators/) [REPORTED]
- Taplink counter: 8,830,782 pages created — [taplink.at](https://taplink.at/en/) [VERIFIED]
- Milkshake: "over 5 million creators" — [milkshake.app](https://milkshake.app/) [VERIFIED vendor claim]
- Stan: "Creators have made over $400 million using Stan" — [Stan, updated 2026-07-22](https://stan.store/blog/stan-store-pricing/) [VERIFIED vendor claim]

**Money flows through these pages.** Linktree users drove "upwards of $6 billion in annual GMV" and "over 240 million commerce clicks" in a month (≈ "$300 million in monthly commerce sales"). Its commerce programme pays creators "12% to 15% commission" — [TechCrunch, 2024-05-22](https://techcrunch.com/2024/05/22/linktree-surpasses-50m-users-rolls-out-beta-social-commerce-program/) [REPORTED, company estimates]

**Most creators are not yet monetising** (survey of 9,576 Linktree users) — [Linktree Creator Report 2022](https://linktr.ee/creator-report) [VERIFIED; older]
- "59% of beginner creators haven't monetized yet"
- "68% of part-time creators make less than $1K"
- "25% of creators earn the most income on their website/blog"

**Why existing tools fall short**
- **Fees** — [Beacons](https://beacons.ai/i/pricing), [Topmate](https://topmate.io/pricing), [Instamojo](https://www.instamojo.com/pricing/), [Linktree IN pricing](https://linktr.ee/s/pricing/) [VERIFIED]

  | Tool | Fee |
  |---|---|
  | Beacons Free and Creator | 9% seller fee |
  | Topmate | 10% on profile/link sales, 20% on marketplace sales |
  | Instamojo free plans | 5% + ₹3 |
  | Linktree Starter | "Sell digital products (9% fees)" |

- **Payment rails.** Bio Sites, Stan and Beacons name Stripe/PayPal, and no UPI was seen. Instamojo lists UPI on all plans — [biosites.com](https://biosites.com/), [Stan](https://stan.store/blog/stan-store-pricing/), [Instamojo](https://www.instamojo.com/pricing/) [VERIFIED]
- **Lock-in and shutdowns**
  - Linktree acquired Koji (Dec 2023) and shut it down on 2024-01-31. Koji had raised $36M and served 700,000+ creators — [TechCrunch, 2023-12-14](https://techcrunch.com/2023/12/14/linktree-acquires-link-in-bio-platform-koji-in-its-second-investment-of-the-year/) [REPORTED]
  - Bento (acquired by Linktree in June 2023) shut down 2026-02-13: "all Bento user and profile data will be permanently deleted", and links redirect to Linktree — [AlternativeTo, 2025-12-21](https://alternativeto.net/news/2025/12/bento-to-shut-down-in-2026-as-linktree-takes-over-and-offers-migration-path/) [REPORTED]
- **Domain-level outage in India.** Linktree was inaccessible across India for several days. India was its "fifth-largest market by traffic", "3.5% of its global visits — or about 7.3 million in July" — [TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/) [REPORTED]. linktr.ee returned HTTP 200 from an Indian network on 2026-10-01 [VERIFIED by direct request], so the outage is not ongoing.
- **Past block on Instagram.** Instagram banned Linktree as a "spam website" in 2018 and lifted the ban after user pushback — [Wikipedia](https://en.wikipedia.org/wiki/Linktree) [REPORTED; older]

**Answers to the brief's problem questions**

| Question | Answer |
|---|---|
| Severity | High for any artist selling, booking or being hired via Instagram. |
| Frequency | The link is clicked daily by fans; the artist edits it monthly. [INFERENCE] |
| Segments | Musicians (streams, tickets, merch); visual artists (prints, commissions); dancers and teachers (classes); designers and photographers (hire me). |
| Workaround | Instagram's 5 links; Linktree and others; Instamojo/Razorpay pages for payments; WhatsApp. |

#### B. Competitor table (Feature 4)
| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Linktree | Australia (App Store seller "Linktree Pty Ltd") | Link-in-bio, commerce, affiliate shop, sponsored links, courses (Kajabi), analytics | Hosted linktr.ee/name; "Earn" section; unified wallet | Creators, businesses, artists | **India:** Free ₹0; Starter ₹360/mo (₹220/mo billed yearly; "Sell digital products (9% fees)"); Pro ₹650 (₹440; "Custom themes, fonts, & layouts", remove branding); Premium ₹1,450 (₹1,250; "0% fees", affiliate shop, data export). USD: conflicting secondary sources (see conflicts) | 70M+ users (Apr 2025); $110M at $1.3B valuation (Mar 2022); iOS 4.82 (61,616 US), 4.67 (1,426 IN); Trustpilot 4.0 (7,151) | Category leader; regional pricing; commerce scale | Billing/subscription and support complaints (Trustpilot Sep 2026); India outage Aug 2025; killed Koji and Bento | Generic; no verified artist stats, no brand view, no UPI seen; costs more than ₹299 in India on monthly billing | [linktr.ee/s/pricing](https://linktr.ee/s/pricing/) [VERIFIED via direct request from India, plan mapping inferred from page order]; [TechCrunch](https://techcrunch.com/2025/04/23/linktree-rolls-out-a-suite-of-monetization-features-for-creators/); [Trustpilot](https://www.trustpilot.com/review/linktr.ee) [REPORTED] |
| Beacons | Not verified | Link-in-bio, store, auto-updating media kit, rate cards, "AI Brand Outreach Email Generator", sales analytics | Block page plus a separate media-kit domain | Creators, influencers | Free (9%); Creator $10/mo ($100/yr; 9%); Creator Plus $30 ($300/yr; 0%); Creator Max $100/mo (annual figures inconsistent) | Seed round $6M (2021, headline); iOS 3.21 (97 US); Trustpilot 2.0 (42, 76% 1-star) | Closest to a "brand view" | Support ignored; payouts pending; domain lock-in (Trustpilot) | Media kit separate from the fan page; 9% fees; no UPI seen; not artist-specific | [beacons.ai/i/pricing](https://beacons.ai/i/pricing) [VERIFIED]; [Trustpilot](https://www.trustpilot.com/review/beacons.ai) [REPORTED] |
| Stan Store | Not verified (App Store seller "FindCommunity, Inc.") | Mobile storefront: products, courses, bookings, subscriptions, lead magnets, "Stan AutoDM" | One-tap checkout; Stripe/PayPal/Afterpay/Klarna | Creators selling products and coaching | No free plan (14-day trial); Creator $29/mo or $300/yr; Creator Pro $99/mo or $948/yr; 0% platform fee | Creators earned "$400 million" (vendor claim); iOS 4.87 (12,849 US); Trustpilot 4.7 (2,180) | 0% fee; strong commerce plus DM bundle | Support waits; funds in "Processing" (Trustpilot) | Far above ₹299/mo in list price (USD $29–$99; no exchange-rate conversion sourced); no UPI; no brand view | [Stan pricing](https://stan.store/blog/stan-store-pricing/) [VERIFIED]; [App Store](https://apps.apple.com/us/app/stan-link-in-bio-for-creators/id6478343472) |
| Komi | Not verified | Mini-site plus brand-deal hub; brands get "AI-powered creator discovery" | Two-sided creator/brand product | Celebrity creators; brands | Starter free; Pro $16 or $20/mo (page ambiguous); 0% fee on digital products (Pro) | "100,000+ creators" (vendor claim) | Two-sided brand side | n/a | Celebrity-led; not artists-only; no UPI seen | [komi.io/pricing](https://www.komi.io/pricing) [VERIFIED] |
| Taplink | Not verified | Mini-site with messenger links, payments, CRM | Basic / Pro / Business | Small businesses, creators | Basic free; paid prices not extracted | 8,830,782 pages (site counter) | Messenger-centric (WhatsApp-like flows) | n/a | Generic SMB tool | [taplink.at](https://taplink.at/en/) [VERIFIED] |
| Milkshake | Australia (inferred from seller "Codelbee Pty Ltd") | App-built swipeable mini-site | Mobile "cards" | Instagram creators | Free; Lite $2.99; Pro $6.99/mo or $59.99/yr; Pro+ $99.99/yr | "5M+" (vendor claim); iOS 4.89 (14,745 US), 4.8 (117 IN) | Cheap, mobile-first | n/a | No payments/UPI or brand view seen | [milkshake.app](https://milkshake.app/) [VERIFIED] |
| Squarespace Bio Sites | US | Free link-in-bio with Stripe/PayPal, digital products, bookings, email capture, tip jars | bio.site redirects to biosites.com | Creators, small businesses | "100% free" | No data | Free commerce | n/a | Still operating (2026-10-01); no UPI seen | [biosites.com](https://biosites.com/) [VERIFIED] |
| Hopp by Wix | Not verified | Link-in-bio with "20+ Monetization Tools", bookings, CRM, sales tracking | Free plus Pro | Creators, SMBs | Free; Pro price not shown; "0% Transaction Fees" | "1m+ already launched"; "4.2/5 on Trustpilot" (as quoted on own site) | Tracks "clicks, sales" (nearest to earnings analytics) | n/a | No UPI seen | [hopp.co](https://www.hopp.co/) [VERIFIED] |
| Later — Linkin.bio | Not verified | Clickable Instagram grid plus buttons | Bundled with scheduler | Brands, SMMs | $18.75–$82.50/mo (billed yearly) | iOS 4.55 (2,526 US) | Grid block like Underdawg | Only bundled; costly | No payments/UPI | [later.com/pricing](https://later.com/pricing/) [VERIFIED] |
| Campsite.bio | Not verified | Link-in-bio with tips, requests, email/phone capture | Analytics history by tier | Creators, organisations | Free; Pro $7; Pro+ $24; Org $14/$29 per month | No data | Phone-number capture (close to WhatsApp signup) | n/a | Generic; no UPI | [campsite.bio/pricing](https://campsite.bio/pricing) [VERIFIED] |
| Topmate | Not verified (site lists a San Francisco address) | Single link for 1:1 sessions, webinars, courses, "Priority DM", Instagram Auto DM, "Unlimited Testimonials", WhatsApp scheduling | Commission only | Experts, coaches, creators | No subscription; 10% on profile/link sales, 20% on marketplace sales; custom pricing for "₹10L+ / $20k+" monthly earners | "1mn+ professionals" (vendor claim); Trustpilot TrustScore removed after "fake reviews" were removed | Free start; testimonials and bookings | Review-integrity flag | Coaching-oriented; commission vs a flat ₹299; UPI not confirmed | [topmate.io/pricing](https://topmate.io/pricing) [VERIFIED]; [Trustpilot](https://www.trustpilot.com/review/topmate.io) [REPORTED] |
| Instamojo (Smart Pages / payment links / store) | India | Landing pages with testimonials plus payments | UPI, cards, netbanking, wallets on all plans | Indian SMBs, creators | Smart Pages Basic ₹0 (5% + ₹3); Pro ₹2,499/mo or ₹12,999/yr (2% + ₹3) | No data | UPI-native | High fees on free tier | Not a creator link page; no Instagram data | [instamojo.com/pricing](https://www.instamojo.com/pricing/) [VERIFIED] |
| Razorpay Payment Pages | India | No-code hosted payment page | Custom URL, receipts | Indian businesses | "zero* platform fee for 90 days" (promo); standard fee not shown | No data | Indian rails | n/a | A payments partner rather than a competitor [INFERENCE] | [razorpay.com/payment-pages](https://razorpay.com/payment-pages/) [VERIFIED] |
| Feature.fm | Not verified | Music smart links plus "Artist Bio Link", pre-saves | Landing pages, conversion tracking | Musicians | Free; $8 / $19 / $39 per month | No data | Music-native | n/a | No bookings, brand view or UPI | [feature.fm/pricing](https://www.feature.fm/pricing) [VERIFIED] |
| Linkfire | Not verified | Music "bio" links, streaming analytics | Smart links | Artists, labels | Pro $27/mo ($21 yearly); Teams $55/mo ($45) | No data | Label-grade analytics | n/a | No payments/UPI | [linkfire.com/pricing](https://www.linkfire.com/pricing) [VERIFIED] |
| Hypeddit | Not verified | Download and link gates (follow or email to unlock), pre-saves | Gated fan actions | Independent electronic musicians | Rookie free; Basic $14/mo; Pro $29/mo; Elite $149/mo (garbled page; interpreted) | No data | Growth tactics | n/a | Promotion tool, not an artist hub | [hypeddit.com/pricing](https://hypeddit.com/pricing) [VERIFIED, interpreted] |
| Lnk.bio | Not verified (seller "Gimucco Pte. Ltd.") | Link-in-bio | n/a | Creators | Pricing page 403 | iOS 4.71 (148 US) | n/a | n/a | Not verified | [App Store](https://apps.apple.com/us/app/lnk-bio-link-in-bio/id1643246314) [VERIFIED catalog] |
| Koji / Bento.me / Snipfeed (fates) | — | Former link-in-bio products | Koji shut down 2024-01-31 after Linktree's acquisition; Bento shut down 2026-02-13 with data deleted; snipfeed.co/pricing redirects to Planoly | — | — | Koji had 700,000+ creators, $36M raised; Snipfeed raised $5.5M (2021, headline) | — | Users lost pages and data | Shows consolidation and shutdown risk | [TechCrunch 2023-12-14](https://techcrunch.com/2023/12/14/linktree-acquires-link-in-bio-platform-koji-in-its-second-investment-of-the-year/); [AlternativeTo](https://alternativeto.net/news/2025/12/bento-to-shut-down-in-2026-as-linktree-takes-over-and-offers-migration-path/) [REPORTED] |
| SuperProfile (and Cosmofeed) | India (reported) | Link-in-bio storefront plus AutoDM | Not verified (site returned HTTP 429) | Indian creators | Conflicting secondary figures (see Feature 6) | No reliable public data found | — | — | Closest Indian "creator OS" analogue; unverified | — |
| Instagram native bio links | US (Meta) | Up to 5 links on the profile | Edit profile → Links | All accounts | Free | All Instagram users | Native | Only 5 plain links, no commerce | Baseline alternative | [TechCrunch 2023-04-18](https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/) [REPORTED] |

**Checks for the brief's specific features** (only what the fetched pages show):

| Feature | Finding |
|---|---|
| Separate fan and brand views | Beacons has a separate auto-updating media kit; Komi has a brand hub. No single page with a fan/brand toggle was found. |
| Money earned per link | Not found as such. Nearest: Beacons "Advanced Sales and Earnings Analytics", Hopp "Track clicks, sales", Feature.fm conversion tracking. |
| UPI on the page | Verified only for Instamojo. |
| WhatsApp signup | Not found as a block. Related: Campsite collects phone numbers; Topmate schedules via WhatsApp; Taplink uses messenger links. |
| Reviews / testimonials | Topmate ("Unlimited Testimonials"), Instamojo Smart Pages. |

**Linktree USD price conflict.**
- The Leap (2025-07-18): Starter $5, Pro $9, Premium $24 — [theleap.co](https://www.theleap.co/blog/linktree-pricing/) [REPORTED]
- elev8or (2026-08-21): Starter $8 ($6 annual), Pro $15 ($12), Premium ~$35 — [elev8or.io](https://www.elev8or.io/blog/bio/linktree-pricing) [REPORTED]
- Possibly a price increase. The official page shows regional prices; only INR was verified.

#### H (evidence). Complaints and how competitors handle risks
All complaint quotes below are from Trustpilot (one site), with independent authors. Reddit was not reachable.

**Slow or absent support: COMMON (6 authors, 3 products)** — e.g., Beacons "Customer service will ignore you…" (2026-08-23); Stan "Still waiting for support after 10 days" (2026-09-16); Linktree "Paid business page disappeared while support issue remained unresolved" (2026-09-07) — [Beacons](https://www.trustpilot.com/review/beacons.ai), [Stan](https://www.trustpilot.com/review/stan.store), [Linktree](https://www.trustpilot.com/review/linktr.ee) [REPORTED]

**Delayed payouts: COMMON (3 authors, 2 products)**
- Beacons: "Affiliate payouts (~$728) marked pending for over one year" (2026-02-18).
- Stan: "$310.85… 'Processing Purchases'" (2026-09-06).
- Sources: same pages [REPORTED]

**Domain or URL lock-in after cancelling (Beacons): COMMON (3 authors)** — "they refused to release my artist website address" (2026-06-12) [REPORTED]

**Billing and unwanted charges: borderline common (3 authors)** — Linktree ×2, Beacons ×1 [REPORTED]

**Bans of creator accounts by link-in-bio tools: not found. Instagram blocking link domains:** one historic case (Linktree, 2018).

**How competitors handle risk**
- Bio Sites, Stan and Beacons delegate payment risk to Stripe/PayPal.
- Linktree has moved toward 0%-fee higher tiers plus affiliate and sponsored revenue — [TechCrunch 2025-04-23](https://techcrunch.com/2025/04/23/linktree-rolls-out-a-suite-of-monetization-features-for-creators/) [REPORTED]

#### J. India specifics (evidence)
- **Linktree's Indian price points** (₹360/₹650/₹1,450 monthly; ₹220/₹440/₹1,250 per month billed yearly) were served to an Indian IP on 2026-10-01 — [linktr.ee/s/pricing](https://linktr.ee/s/pricing/) [VERIFIED]
  - Underdawg Pro at ₹299/mo is below Linktree Starter's monthly price, and above its annual-equivalent ₹220. [INFERENCE from verified numbers]
- **Linktree's Indian traffic.** About 7.3M visits in July 2025 (3.5% of global; 5th-largest market), followed by a multi-day India outage of unexplained cause — [TechCrunch 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/) [REPORTED]
- **UPI is the dominant payment rail.** 20 billion UPI transactions worth ₹25 trillion in Aug 2025; UPI "accounts for 84% of digital payments in India" (2025) — [Wikipedia: UPI](https://en.wikipedia.org/wiki/Unified_Payments_Interface) [REPORTED; cites NPCI]
- **Indian commerce options:** Instamojo (UPI on all plans; 5%/2% + ₹3) [VERIFIED]; Topmate (10%/20% commission) [VERIFIED]; Razorpay Payment Pages (promo pricing) [VERIFIED]. SuperProfile could not be verified.
- **Break-even [INFERENCE: arithmetic on verified rates].** Flat ₹299 equals Topmate's 10% commission at ₹2,990/month of sales, and Beacons' 9% at about ₹3,322/month.

### Inferences

#### C. Is it unique?
**Classification: Very common.** Specific elements:

| Element | Classification |
|---|---|
| Brand view or media kit | Somewhat common (Beacons, Komi) |
| UPI on a creator link page | Rare among global tools; available via Indian payment pages |
| Earnings per link | Emerging (partial analytics exist) |
| Fan/brand toggle on one URL | Rare (not found) |

**By dimension.**
- Audience: no artists-only link page with hire, book and verified stats was found.
- Network: a page can link into Underdawg discovery (opt-in "more artists like this" for brands, collaborator credits). Linktree cannot do this, because it has no artist graph.
- Data: brand visits to the brand view, inquiry rates and earnings by block are unique opportunity data for Underdawg.
- Discovery: indirect (see E).
- Combination: verified stats + brand view + hire/book + UPI tips + fan contacts, artists-only, at ₹299, is rare. Each element exists somewhere.

#### D. Artist value
**Meaningful outcomes:**
- Get paid (UPI tips, bookings, downloads).
- Get hired (brand view with rates, availability, verified stats).
- Own the fan relationship (email/WhatsApp capture), which hedges against Meta's link throttling.

**Vanity:** total click counts.

#### E. Discovery impact
**Direct effect:** low. A page converts traffic the artist already has, so it **favours already-popular accounts.**

**Indirect effects:**
1. Acquisition loop. Every page carries an "on Underdawg" footer that brands and other artists see. This is Linktree's own growth model; Linktree grew 2.7M users in 2019 to 50M in 2024 per TechCrunch.
2. The brand view can become the entry point to brand-side search across artists.

**Fair-discovery ideas:**
- Opt-in "featured emerging artists in this discipline" strip on brand views only, not fan views, so the artist's own traffic is not hijacked.
- Rotation and caps.
- Reciprocity: artists who opt in also get featured.

#### F. Behaviour

| Question | Assessment |
|---|---|
| Frequency | Set up once; edited monthly; analytics checked weekly. Fans visit daily. |
| Create content for it | Not content, but artists do add offers (classes, prints). |
| Return because of it | Yes, if earnings or inquiry notifications exist. |
| Invite other artists | Possibly, via collab blocks. |
| Share externally | Constantly (Instagram bio, WhatsApp). This is the strongest external-sharing feature of the six. |
| Network effect | Weak and indirect. |

#### G. Category
Acquisition (viral footer, public URL), activation, monetisation (Pro, payments) and retention (earnings alerts). Discovery only via the brand view.

#### H. Risks (analysis)
**Payments compliance.** UPI via a payment aggregator, merchant KYC, GST, refunds and chargebacks: operational complexity. Mandate requirements were not verified.

**Phishing and scam pages.** Moderation is needed. Linktree was once flagged as spam by Instagram.

**Single-domain risk.** Linktree's Indian outage shows the risk. Mitigations:
- Offer custom domains.
- Make pages fast and static.
- Avoid lock-in: export, and release domains on cancellation (the most common complaint against Beacons).

**Feature clutter.** The 14 proposed blocks risk clutter. Support load is the top complaint category in this market.

#### I. Scale dependency
- Works at **1,000 artists** as a standalone utility.
- The brand-view discovery loop needs **10,000+** artists and some brand demand.
- Cross-artist recommendations need **100,000+**.

#### K. Preliminary verdict: **Build early — Modify (narrow)**
**Why.** Proven demand; it is the main external-sharing and acquisition surface; it carries the brand view and UPI, which matter in India.

**MVP blocks:** links; Instagram grid; verified stats/brand view; hire me / book me (inquiry form); UPI tip; email/WhatsApp capture; YouTube/Spotify embeds.

**Defer:** tickets, sessions, downloads, reviews and shop. Add them when payments are proven.

**Earnings per link:** only once money flows through Underdawg.

**Commercial model.** Flat price, no or low fees. Fees and lock-in are the market's sore points.

### Gaps
- Reddit and app-review evidence on link-in-bio pain among visual artists, dancers and musicians: not collected.
- SuperProfile, bio.link and Shorby details: not verified.
- Linktree official USD prices and seller fee by tier outside India: not verified.
- Whether any tool offers a single-URL fan/brand toggle or earnings-per-link: not found, but not exhaustive.
- Cause of the 2025 Linktree India block: unknown.

---

## Feature 5 — Page templates (free basic; premium on Pro) and a template marketplace (designers sell, Underdawg takes a cut)

### Takeaway
Templates are table stakes:
- Linktree shows about 18 first-party templates and gates "Custom themes, fonts, & layouts" in Pro (₹650/mo monthly in India).
- Carrd includes premium templates from $9/year.

Designers already sell link-in-bio templates off-platform (Creative Market listings at $9–$39). No link-in-bio platform running a designer marketplace was found (search not exhaustive). Big template marketplaces work only at very large scale: Framer paid $6.5M to creators in 2025.

There is no evidence that artists pay for link-page templates. Verdict:
- Free templates: **Build early** (cheap).
- Premium: **Combine** into Pro.
- Marketplace: **Deprioritise** until large scale. A possible later angle is a "designed by" credit that gives designer-artists visibility.

### Cited Findings

#### A. Problem validation
**Supply of paid link-in-bio templates exists off-platform.** A Creative Market search for "link in bio" shows "180,911 assets". Sample listings run $9–$39, e.g., Framer, Canva and Showit link-in-bio templates — [Creative Market](https://creativemarket.com/search?q=link%20in%20bio) [VERIFIED; the count is a loose keyword match, so low confidence as a market size; shows supply, not sales]

**Incumbents treat design as an upgrade.**
- Linktree's Pro tier adds "Custom themes, fonts, & layouts" — [Linktree IN pricing](https://linktr.ee/s/pricing/) [VERIFIED]
- Linktree's gallery shows about 18 named templates in categories including Music, Influencer and Creator, and Fashion, with no designer submission or selling — [linktr.ee/s/templates](https://linktr.ee/s/templates/) [VERIFIED]
- Carrd: "Premium Templates" in every Pro plan from $9/yr — [carrd.com/pro](https://carrd.com/pro) [VERIFIED]
- Pixpa: "200+ premium templates" — [Pixpa](https://www.pixpa.com/pricing) [VERIFIED]

**Template marketplaces can pay designers, at scale**
- Framer: "$6.5M" paid to creators in 2025; "you keep 100% of the revenue from your sales"; referral pays "50% of their subscription for 12 months" — [Framer creators](https://www.framer.com/creators), [Framer help, updated 2026-09-15](https://www.framer.com/help/articles/how-the-creator-program-works/) [VERIFIED vendor claims]
- Notion Marketplace: "8% fee plus 40 cents per transaction"; +1% FX outside the US; $20 minimum payout. India appears not to be eligible for direct payouts, as read by the fetch tool (medium confidence) — [Notion help](https://www.notion.com/help/selling-on-marketplace) [VERIFIED]
- Gumroad: 10% + $0.50 on direct sales; 30% via Discover — [gumroad.com/pricing](https://gumroad.com/pricing) [VERIFIED]
- Shopify App Store: developers keep 100% of the first $1M (from 2025-01-01), then 85% — [Shopify docs](https://shopify.dev/docs/apps/launch/distribution/revenue-share) [VERIFIED; a benchmark for platform cuts]

**Demand from artists to pay for page templates:** No reliable public data found. Complaints that "link pages all look the same" were not found; Reddit was blocked.

**Answers to the brief's problem questions**

| Question | Answer |
|---|---|
| Problem | A page that looks distinct and on-brand without design skills. |
| Severity | Low. |
| Frequency | At setup, plus occasional refreshes. |
| Segments | Visual-identity-driven artists (fashion, illustration, music branding). |
| Workaround | Free first-party themes; Canva/Framer templates bought elsewhere. |
| Why insufficient | Possibly sameness. Unproven. |

#### B. Competitor table (Feature 5)
| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Linktree templates / themes | Australia | First-party template gallery; custom themes in Pro | ~18 named templates by category; Pro unlocks custom themes, fonts, layouts | Creators, businesses | Templates visible free; custom themes in Pro (₹650/mo monthly, India) | 70M+ users | Huge base; music category | No designer marketplace | Underdawg adds a designer marketplace and artist-specific blocks | [templates](https://linktr.ee/s/templates/); [pricing](https://linktr.ee/s/pricing/) [VERIFIED] |
| Carrd | Not verified | Premium templates in Pro | One-page builder | DIY creators | Pro Lite $9/yr; Standard $19/yr; Plus $49/yr | No data | Very cheap | Third-party sellers (Gumroad/Etsy) not verified | No official marketplace | [carrd.com/pro](https://carrd.com/pro) [VERIFIED] |
| Later Linkin.bio | Not verified | Customisation (background, buttons) | In-app design options | Brands | Bundled $18.75+/mo | n/a | Bundle | n/a | No marketplace | [later.com/pricing](https://later.com/pricing/) [VERIFIED] |
| Hopp by Wix | Not verified | "Thousands of layouts" | Free plus Pro | Creators | Free; Pro price not shown | "1m+" | Free variety | n/a | No marketplace | [hopp.co](https://hopp.co/) [VERIFIED] |
| Pixpa | Not verified | 200+ premium portfolio templates | Website builder | Creatives | ₹200–₹600/mo billed yearly (discount) | n/a | INR | n/a | First-party templates only | [pixpa.com/pricing](https://www.pixpa.com/pricing) [VERIFIED] |
| Notion Marketplace | Not verified | Third-party template marketplace | Creators list; Notion processes payments | Template sellers | 8% + $0.40 per sale; +1% FX | n/a | Distribution | India payouts apparently unsupported | Model to copy; Indian payout gap [INFERENCE] | [Notion help](https://www.notion.com/help/selling-on-marketplace) [VERIFIED] |
| Framer Marketplace | Not verified | Templates, components, plugins | 0% commission; referral revenue share | Web designers | 0% on sales | $6.5M paid to creators (2025) | Generous terms | A third-party guide claims ~30% (conflict) | Earns via subscriptions; Underdawg could use Pro the same way | [Framer](https://www.framer.com/creators) [VERIFIED] |
| Gumroad | Not verified | General store used for templates | Direct sales | Indie sellers | 10% + $0.50; 30% via Discover | n/a | Easy | n/a | Off-platform | [gumroad.com/pricing](https://gumroad.com/pricing) [VERIFIED] |
| Creative Market | Not verified | Link-in-bio templates for many builders | Asset marketplace | Designers to creators | $9–$39 per template | "180,911 assets" (loose count) | Catalogue | n/a | Buyer must set the template up on another tool | [Creative Market](https://creativemarket.com/search?q=link%20in%20bio) [VERIFIED] |
| Shopify App Store (benchmark) | Canada | Developer marketplace | Revenue share | Developers | 0% of first $1M, then 15% | n/a | n/a | Theme Store share not verified | Benchmark only | [shopify.dev](https://shopify.dev/docs/apps/launch/distribution/revenue-share) [VERIFIED] |

**Count of comparable link-in-bio template marketplaces: zero found.** Fewer than 5 real implementations of the exact idea exist; the rows above are adjacent models.

**Not verified:** template tiers for Beacons, Stan, Taplink, Milkshake, bio.link, Lnk.bio and SuperProfile; Canva Creators, Webflow and Etsy economics (blocked).

#### J. India specifics (evidence)
- Notion Marketplace direct payouts appear unavailable in India (medium confidence) — [Notion help](https://www.notion.com/help/selling-on-marketplace) [VERIFIED as read]
- Linktree charges ₹650/mo (monthly billing) for custom themes in India — [Linktree](https://linktr.ee/s/pricing/) [VERIFIED]

### Inferences

#### C. Is it unique?
| Component | Classification |
|---|---|
| Templates | Very common |
| Premium templates in a paid tier | Common |
| Designer marketplace for link pages | Rare / none found |

- Network uniqueness: the sellers would be designer-artists. A "designed by @designer" credit on every page could become a discovery and commission channel for designers, a cross-discipline loop competitors cannot replicate without an artist network.
- Data uniqueness: low.
- Combination: marketplace + artist network + INR/UPI payouts is novel, but unproven.

#### D. Artist value
- Low for most artists (cosmetic).
- Meaningful for designer-artists (income and visibility).

#### E. Discovery impact
- Small, positive for designers via credits.
- Popularity bias: best-sellers dominate marketplace rankings. Mitigate with a "new templates" rotation and curated picks.

#### F. Behaviour

| Question | Assessment |
|---|---|
| Frequency | Rare (setup and refresh) |
| Return because of it | Designers might, to track sales |
| Network effect | Two-sided marketplace, but only with large buyer volume |

#### G. Category
Activation (good-looking page fast) and monetisation (Pro). Marginal discovery (designers).

#### H. Risks (analysis)
- Low adoption.
- Template plagiarism and copyright disputes; quality moderation.
- Payout operations (KYC, GST/TDS for Indian sellers; specifics not verified).
- Fragmented page performance.
- Opportunity cost.

#### I. Scale dependency
- Templates: any scale.
- Marketplace: only at large scale (likely 100,000+ active page owners [ASSUMPTION]), since few buy templates.

#### K. Preliminary verdict
- **Free basic templates: Build early.** Cheap and expected.
- **Premium templates: Combine into Pro.** No separate SKU.
- **Template marketplace: Deprioritise.** Revisit after product-market fit as a designer-visibility experiment ("designed by" credit + commission) rather than a revenue line.

### Gaps
- Willingness of artists to pay for templates: No reliable public data found.
- Etsy and Gumroad sales volumes for link-in-bio templates: blocked.
- Whether Beacons, Taplink, Milkshake or bio.link let third parties sell templates: not verified.
- Canva Creators payouts: blocked.
- How template marketplaces (Notion, Framer, Creative Market) police plagiarism and quality: review policies not opened, so "how competitors handle" template risks is unverified.

---

## Feature 6 — Instagram DM automation (any trigger word; comments, story replies, DMs, Live comments → auto-DM with links, files, buttons, bookings, payments, tickets; follower check; once-per-person; templates)

### Takeaway
The behaviour is proven: ManyChat has about 1.5M customers and raised a $140M Series B in 2025, and many clones exist. But the category is crowded and cheap, especially in India, where tools cost ₹99–₹999/month and ReplyKaro's blog lists its Pro at ₹299, the same as Underdawg Pro. Meta also constrains and copies it:

| Meta constraint | Detail |
|---|---|
| Replies per comment | One private reply, within 7 days |
| Hourly cap | 750 private replies/hour per account for posts and Reels |
| Follower check | Only after the user taps or replies |
| Non-followers | DMs land in the Requests folder |
| Payments | No payment message type |
| Native versions | Business Suite keyword automations exist; Meta is testing keyword auto-DMs on ads (Aug 2026) |

It converts existing commenters. It does not create discovery, and it favours accounts that already have comment volume: 1–5K-follower accounts average 1–3 comments per post. Verdict: **Deprioritise for MVP** and don't market "unlimited". At most, a scoped Pro feature after product-market fit (e.g., auto-send rate card or portfolio to brand inquiries, or a free brush pack), or a partnership.

### Cited Findings

#### A. Problem validation
**Demand (behaviour is real)**
- ManyChat: about 1.5 million customers in 170 countries; $140M Series B led by Summit Partners. CEO: "Instagram is by far the most engaged and active platform for the company today" — [TechCrunch, 2025-04-22](https://techcrunch.com/2025/04/22/manychat-taps-140m-to-boost-its-business-messaging-platform-with-ai/) [REPORTED]
- LinkDM (all "as of December 2025") — [linkdm.com](https://linkdm.com) [VERIFIED vendor claim]
  - "60,000+ creators, brands and agencies"
  - "1.5 Million+ DMs sent daily"
  - "35 Million+ Link clicks monthly"
- Other vendors — [instantdm.com/pricing](https://instantdm.com/pricing); [zorcha.com/pricing](https://zorcha.com/pricing); [creatorflow.so/pricing](https://creatorflow.so/pricing); [replykaro.com](https://www.replykaro.com/instagram-dm-automation); [chatfuel.com/pricing](https://chatfuel.com/pricing) [VERIFIED vendor claims]

  | Vendor | Claimed users |
  |---|---|
  | InstantDM | 30,000+ |
  | Zorcha | 60K+ |
  | CreatorFlow | 20,000+ |
  | ReplyKaro | 4,496+ |
  | Chatfuel | 150,000+ businesses (all channels) |

- Inro markets comment-to-DM to "creators, coaches, experts, artists, labels…". Its case study: a Kidnest post "drew 2,000 comments and turned into 100 direct sales" — [Inro blog, 2026-07-15](https://www.inro.social/blog/instagram-comment-to-dm-automation) [VERIFIED vendor claim]
- Meta treats DM load as a creator problem. AI Studio creators can set up an AI that "can quickly answer common DM questions and story replies" (US launch). An update dated 2026-08-10 says people "will no longer be able to create new AI characters or edit existing ones" — [Meta Newsroom, 2024-07-29](https://about.fb.com/news/2024/07/create-your-own-custom-ai-with-ai-studio/) [VERIFIED]

**Meta's native and emerging substitutes**
- Meta Business Suite "Custom Keywords" (up to 5, exact match, "15-minute delay", desktop only) and "Comment to Message" (max 5 keywords) — [CreatorFlow blog, 2026-08-18](https://creatorflow.so/blog/instagram-built-in-automation/) [REPORTED, competitor-published; Meta Help Center not opened]
- "Reply to Keywords" test for Instagram ads: "automatically sending a private message when people comment with a keyword", up to five keywords, ads only — [Social Media Today, 2026-08-25](https://www.socialmediatoday.com/news/meta-tests-auto-dm-response-for-instagram-ad-comments/828791/) [REPORTED]

**Counter-evidence**
- Meta's engagement-bait guideline covers "Posts that explicitly request engagement (such as votes, shares, comments…)", but names Facebook. Whether Instagram demotes "comment LINK" posts: No reliable public data found — [Meta Transparency Center](https://transparency.meta.com/features/approach-to-ranking/content-distribution-guidelines/engagement-bait/) [VERIFIED, Facebook scope]
- Non-followers: private replies go to the Inbox "if the person follows… or to the Request folder, if they do not" — [Meta private replies doc](https://developers.facebook.com/docs/instagram-platform/private-replies) [VERIFIED]
- Small accounts have little to automate: 1–5K-follower accounts average Reels 3, carousels 2, images 1 comments per post — [Socialinsider 2026](https://www.socialinsider.io/social-media-benchmarks/instagram) [VERIFIED]
- Deliverability: a link-first DM "sinks toward 20 to 30%", while a button-first DM holds "70 to 90%" — [Inro, 2026-07-15](https://www.inro.social/blog/instagram-comment-to-dm-automation) [VERIFIED vendor claim]
- Audience annoyance with "comment X" posts: No reliable public data found (Reddit not reachable).

**Answers to the brief's problem questions**

| Question | Answer |
|---|---|
| Problem | Delivering links, files or offers to many commenters without manual DMs, and capturing leads. |
| Severity | High for sellers with volume. Low for emerging artists with few comments. |
| Frequency | Per campaign post. |
| Segments | Artists selling digital goods (brushes, presets, beats), classes, prints; musicians running pre-saves; coaches. |
| Workarounds | ManyChat and clones; Meta native keywords; manual DMs; the link-in-bio page. |
| Why insufficient | USD pricing for Indian users; contact-based billing surprises; reliability complaints; Meta's native tools limited to 5 exact keywords with a 15-minute delay. |

#### B. Competitor table (Feature 6)
| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| ManyChat | US-based (reported) | Full Instagram DM automation plus Messenger, WhatsApp, SMS, TikTok | Visual flows, keyword triggers, contact-based billing | SMBs, agencies, creators, enterprises | Free up to 1,000 contacts; Pro "from $15/month" by active contacts (secondary; other secondary sources conflict: $14 / $15 / $29); official page 403 | ~1.5M customers; $140M Series B (2025); iOS 4.28 (2,120 US), 3.93 (297 IN); Trustpilot 2.1 (304) | Market leader, deep flows | "Automations aren't firing" and billing unpredictability (Trustpilot); community threads on comment-to-DM not triggering | Generic, USD, contact-priced; no artist outcomes | [TechCrunch](https://techcrunch.com/2025/04/22/manychat-taps-140m-to-boost-its-business-messaging-platform-with-ai/); [Trustpilot](https://www.trustpilot.com/review/manychat.com); [chatarmin 2026-09-25](https://chatarmin.com/en/blog/manychat-pricing) [REPORTED]; [App Store](https://apps.apple.com/us/app/manychat/id1460129210) |
| Chatfuel | Not verified | Auto-replies to post/Reel comments; AI | Chatbot builder | Businesses | Business $18/mo billed yearly; Agency S $90/mo | "150,000+ businesses" (vendor claim) | AI credits | n/a | Business-focused | [chatfuel.com/pricing](https://chatfuel.com/pricing) [VERIFIED] |
| LinkDM | Not stated (site copyright "Webdot.club"; brief says India, unverified) | Comment, story, Live and inbox triggers; follower-growth tool; Slow Down Mode; DM queue; templates | Keyword → DM | Creators, brands, agencies | Free (1,000 DMs/mo); Pro $19/mo or $182/yr (25,000 DMs/mo); Platinum+ $99/mo (300,000 DMs/mo) | 60,000+ users; "Certified Meta Business Partner (since 2021)" (vendor claims) | Cheap; Live automation | USD-only billing raises Indian cost (competitor-reported) | Pure DM tool; ₹299 undercuts its Pro | [linkdm.com/pricing](https://linkdm.com/pricing) [VERIFIED] |
| SuperProfile AutoDM | India (reported) | AutoDM bundled with storefront | Keyword → DM plus store | Indian sellers | Conflicting: ~₹499/mo after a ₹99 first month (SNIPPET); ₹1,500–2,000/mo (competitor); ₹11,999/yr (competitor) | No reliable public data found | Commerce bundle | "No Follow-Gate" (competitor claim) | Closest Indian creator-OS; no discovery | [replykaro blog 2026-08-16](https://www.replykaro.com/blog/superprofile-auto-dm-vs-replykaro-2026) [REPORTED, competitor] |
| InstantDM | India (REPLBETTER APP TECHNOLOGIES PVT LTD) | Comments, stories, DMs; "Follow for Link"; Advanced Safety Mode | Keyword → DM with pacing | Creators, SMBs | Legend Pro $9.99/mo ("Unlimited (750/hr)"); Trendsetter $24.99/mo | 30,000+ (vendor claim); iOS 4.36 (39 IN), 4.62 (21 US) | Pacing aligned with Meta's 750/hr limit | n/a | Generic, USD | [instantdm.com/pricing](https://instantdm.com/pricing) [VERIFIED]; [App Store IN](https://apps.apple.com/in/app/comment-to-link-dm-instantdm/id6756658913) |
| Zorcha | India ("Made with ❤️ in India") | DM automation, AI FAQ, link-in-bio, "Ask for Follow" | Flows plus queue | Creators, brands | Free (unlimited DMs); Pro $14.99/mo; Ultimate $39.99; Business $109.99 | 60K+ (vendor claim) | Creator-OS bundle; free tier | ₹1,199/mo quoted by a competitor (conflict) | Closest "creator OS"; not artist-specific | [zorcha.com/pricing](https://zorcha.com/pricing) [VERIFIED] |
| Inro | Not stated (EUR) | Comments, story replies, Live, "Payments in DMs", AI agent | Automations, campaigns, CRM | Creators, coaches, artists, labels | Free (100 contacts); Pro €12.99/mo; Managed €299+/mo | No reliable public data found | Explicitly targets artists and labels | Contact-scaled pricing | Generic, but artist-positioned | [inro.social/pricing](https://www.inro.social/pricing) [VERIFIED] |
| CreatorFlow | Spain (CreatorFlow Labs, S.L.) | Unlimited keyword triggers, follow gate, email gate, templates | Keyword → DM | Creators | Free (500 DMs/mo); Pro $15 ($12 yearly); Growth $30 ($24) | 20,000+ (vendor claim) | Templates on free tier | Automations pause at the cap | Generic | [creatorflow.so/pricing](https://creatorflow.so/pricing) [VERIFIED] |
| Spur | US parent with a New Delhi entity | Instagram/Facebook DM and comment automation plus WhatsApp, AI agents | Flows plus AI | Brands (D2C) | $12 / $31 / $127 / $399 per month | No reliable public data found | WhatsApp | n/a | Brand-focused | [spurnow.com/pricing](https://www.spurnow.com/pricing) [VERIFIED] |
| ReplyKaro | India (₹ pricing) | Comments, story replies and mentions, DM keywords; Follow-Gate | Keyword → DM | Indian creators | Free (1,000 DMs/mo); Starter $3 (₹99); Pro $9 (page) / ₹299 (own blog) | 4,496+ creators (self-reported) | Very cheap | Repeats the unverified "200 DMs/hour" claim | Pro at ₹299 = Underdawg Pro price | [replykaro.com](https://www.replykaro.com/instagram-dm-automation) [VERIFIED] |
| Stan AutoDM / Topmate Instagram Auto DM (bundled) | — | Auto-DM inside link-in-bio suites | Bundled | Creators | Stan $29+/mo; Topmate commission | See Feature 4 | Bundled with storefronts | — | Shows DM automation as a bundle feature, not a standalone product | [Stan](https://stan.store/blog/stan-store-pricing/); [Topmate](https://topmate.io/) [VERIFIED] |
| Meta native (Business Suite) | US (Meta) | FAQs, saved replies, instant reply, Custom Keywords, Comment to Message | Max 5 exact-match keywords; 15-minute delay; desktop | All professional accounts | Free | Built in | No third-party risk | Limited | Underdawg would add any keyword, instant sending, follow check, templates, Live | [CreatorFlow 2026-08-18](https://creatorflow.so/blog/instagram-built-in-automation/) [REPORTED] |
| Meta "Reply to Keywords" (ads test) | US (Meta) | Keyword auto-DM on ad comments | Up to 5 keywords | Advertisers | With ad spend | Limited test | Native | Ads only (so far) | Signals Meta may extend this to organic posts [INFERENCE] | [SMT 2026-08-25](https://www.socialmediatoday.com/news/meta-tests-auto-dm-response-for-instagram-ad-comments/828791/) [REPORTED] |
| Meta AI Studio creator AI | US (Meta) | AI answers DM questions and story replies | Trained on creator content | Creators (US launch) | Free | n/a | Native AI | AI character creation and editing stopped 2026-08-10 | AI chat, not asset delivery | [Meta Newsroom](https://about.fb.com/news/2024/07/create-your-own-custom-ai-with-ai-studio/) [VERIFIED] |

**Feature-support check against Meta's API.** These are what any tool can build; sources: [private replies](https://developers.facebook.com/documentation/instagram-platform/private-replies.md), [messaging](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md), [rate limits](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/) [VERIFIED].

| Proposed capability | What Meta allows |
|---|---|
| Any keyword | Tool-side matching on comment webhooks. Feasible. |
| Comments | One private reply per comment, within 7 days. |
| Story replies and DMs | Via the messages webhook. |
| Live comments | Webhook only during the broadcast; Advanced Access needed. Private replies "only… during the live broadcast". |
| Follower check | `is_user_follow_business` only after user consent (the user messages or taps an icebreaker or menu). |
| Once-per-person | Tool logic. Meta enforces one reply per comment, not per person. |
| Files | PDFs supported (Dec 2025); files ≤25MB, images ≤8MB. |
| Buttons and templates | Supported. |
| Payments, bookings, tickets | No native payment type; must link out (e.g., to a UPI checkout). |
| Text length | ≤1,000 bytes. |

Vendor pages confirming once-per-person or file delivery: none found.

#### H (evidence). Platform limits, policies and complaints
**Rate limits** (per Instagram professional account) — [Meta rate limiting](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/) [VERIFIED]
- Private Replies API, posts and Reels: "750 calls per hour". Live comments: "100 calls per second".
- Send API: "100 calls per second" for text, links, reactions and stickers; 10/second for audio and video.
- Conversations API: "2 calls per second".
- No hourly cap on Instagram DMs is published there.

**The "200 DMs/hour" figure is not a Meta rule.** It is repeated by vendors (e.g., ReplyKaro). One vendor retracted its claim that Meta cut the limit from 5,000 to 200 in Oct 2024: "could not find that change in any Meta documentation or changelog" — [SumGenius, corrected 2026-08-14](https://sumgenius.ai/blog/instagram-dm-bot-ban-wave-2026/) [REPORTED]

**Messaging window.**
- 24-hour window; the user must initiate — [Meta messaging doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md) [VERIFIED]
- The HUMAN_AGENT tag (7 days) is for human replies.
- "One-time notifications", "News messaging" and "Sponsored messages" are "not available for IG Messaging API" — [Messenger Platform policy](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview/) [VERIFIED]

**Access.**
- `instagram_business_manage_messages` requires App Review and Advanced Access to serve accounts you don't own — [Meta permissions](https://developers.facebook.com/docs/permissions) / [messaging doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md) [VERIFIED]
- Live comments webhooks need Advanced Access — [webhooks doc](https://developers.facebook.com/docs/instagram-platform/webhooks) [VERIFIED]

**Complaints**
- **Automations not firing or not triggering: COMMON.** Trustpilot (2026-09-22), plus ManyChat Community threads (English and Spanish) and a connection-failure thread. All involve ManyChat — [Trustpilot](https://www.trustpilot.com/review/manychat.com); [thread 1](https://community.manychat.com/general-q-a-43/comment-to-dm-instagram-10872); [thread 2](https://community.manychat.com/preguntas-y-respuestas-es-58/no-me-funciona-la-automatizacion-en-instagram-10915); [thread 3](https://community.manychat.com/general-q-a-43/instagram-cannot-connect-to-manychat-despite-full-control-full-access-10924) [VERIFIED forum posts]
- **ManyChat billing unpredictability: COMMON on one platform** (3 Trustpilot authors, Jul–Aug 2026) [VERIFIED]
- **Account bans or restrictions caused by automation: NOT verified as common.** One "ban wave" claim rests on a Medium post and blogs — [SumGenius](https://sumgenius.ai/blog/instagram-dm-bot-ban-wave-2026/) [REPORTED, weak]
- **Throttling is real in practice:** vendors ship "Slow Down Mode", "DM Queue" and "Advanced Safety Mode" — [LinkDM](https://linkdm.com/pricing), [InstantDM](https://instantdm.com/pricing) [VERIFIED]

#### J. India specifics (evidence)
**A crowded INR price band** (tool rows above; Kwikzy, LinkPlease and Creator Lane figures are self- or competitor-published) — Kwikzy blog on kwikzy.com (dated 2026-04-11, updated 2026-04-26; exact article URL not recorded by the sub-researcher) / [Creator Lane 2026-06-27](https://creatorlanehq.com/blog/best-instagram-dm-automation-tools-india) [REPORTED]

| Tool | Price |
|---|---|
| ReplyKaro | ₹99 Starter; Pro ₹299 on its blog |
| Kwikzy | ₹399–999/mo |
| LinkPlease | ₹499/mo |
| Creator Lane | Pro ₹1,500/yr |
| SuperProfile | Conflicting ₹499–₹2,000/mo |

**Indian-built tools price in USD:** InstantDM ($9.99) and Zorcha ($14.99) [VERIFIED]. LinkDM bills in USD only; Indian creators reportedly pay about ₹1,580+/mo after FX and GST (competitor-reported).

**Usage rate of comment-to-DM among Indian creators:** No reliable public data found.

**Meta AI Studio availability in India:** No reliable public data found.

### Inferences

#### C. Is it unique?
**Classification: Common globally; very common in India.**
- Functional: everything proposed exists across tools.
  - Follower gates: LinkDM, InstantDM, Zorcha, CreatorFlow, ReplyKaro.
  - Live: LinkDM, Inro.
  - "Payments in DMs": Inro.
  - Templates: LinkDM, CreatorFlow.
- Audience: Inro already targets artists and labels.
- Workflow: integration with Underdawg brand view, UPI checkout and bookings is the only differentiator, and it is copyable.
- Network: none.
- Data: fan-intent data (what fans ask for). Modest.
- Discovery: none.
- Combination: "DM delivers the artist's verified rate card or booking link to brands who comment or DM 'COLLAB'" is a niche twist, not a moat.

#### D. Artist value
**Meaningful:** sales of digital goods, class sign-ups, lead capture, faster responses to brand inquiries. This applies only to artists with comment volume.

**Vanity:** comment counts inflated by "comment X" bait.

#### E. Discovery impact
- None to slightly negative. It converts existing audiences.
- Follower gates push people to follow, which grows follower counts, not discovery by relevant people.
- It **strongly favours already-popular accounts.** The number of DMs scales with comments, and small accounts average 1–3 comments per post.
- Possible engagement-bait perception (Facebook policy; Instagram unknown).
- Fair-discovery mechanisms do not apply, because this is not a discovery feature.

#### F. Behaviour

| Question | Assessment |
|---|---|
| Frequency | Per campaign; results checked weekly |
| Create content for it | Yes, but on Instagram ("comment BRUSH") |
| Return because of it | Via a results dashboard (the planned Home card) |
| Invite other artists | No |
| Share externally | No |
| Network effect | None |
| Loop | A seller loop (post → comments → DMs → sales), entirely on Instagram |

#### G. Category
Monetisation (Pro) and retention (results). Not acquisition or discovery.

#### H. Risks (analysis)
- **Platform enforcement and App Review.**
- **Throttling.** 750/hour means "unlimited" is misleading; queueing is needed.
- **Support burden.** "Not firing" is the most common complaint in the category.
- **Spam and annoyance perceptions.**
- **Privacy.** Collecting emails and phone numbers in DMs needs consent. India's data-protection rules were not verified here.
- **Product dilution.** It pulls Underdawg toward a generic Instagram-marketing tool, the opposite of "artists-first discovery".
- **Meta native expansion risk.** Reply to Keywords on ads (Aug 2026).

#### I. Scale dependency
None. It works for each artist independently, and gives no network benefit as Underdawg grows.

#### K. Preliminary verdict: **Deprioritise (MVP) → possibly Build after PMF as a narrow Pro feature or via partnership; Reject the "unlimited" claim**
**Why:**
- A crowded, cheap category with a ₹299 direct-price competitor.
- Heavy Meta dependency, with native substitutes emerging.
- No discovery impact; it favours popular accounts.
- High support load.

**If built later, scope it to artist outcomes:**
- Auto-reply to brand or collab inquiries with the brand view, rate card and booking link.
- Free-asset delivery with an email/WhatsApp opt-in.
- Ticket or class links to UPI checkout.
- Button-first DMs (deliverability).
- Follow-check only after a tap.

### Gaps
- Reddit, Google Play and App Store review texts on account restrictions and audience annoyance: not collected.
- ManyChat official pricing and feature support: 403.
- SuperProfile primary data: 429.
- Funding for LinkDM, SuperProfile, InstantDM and Zorcha: not found.
- Whether Instagram applies engagement-bait demotion to "comment X" posts: unknown.
- Meta Business Suite automation limits from a primary Meta source: not opened.

---

## Platform risk — Meta API changes, permissions, limits, and Meta's own competing features: how exposed is Underdawg?

### Takeaway
Exposure is **high**. All six features run on Instagram professional-account APIs that require App Review and Advanced Access. Meta has a recent record of:
- Turning off whole APIs at 90 days' notice (Basic Display, Dec 2024).
- Changing scopes and metrics yearly (impressions → views; profile_views and website_clicks removed).
- Shipping native versions of these exact tools: 5 bio links; in-app scheduling; Business Suite keyword automations; Reply to Keywords for ads; AI Studio replies; Creator Marketplace with first-party stats for brands; Meta Verified selling "links in reels" plus search optimisation and featured profile placement (paraphrased from the Meta Verified page).

The safest posture is to treat Instagram as an input. Underdawg's own value should sit in what Meta does not do: artist-specific discovery, brand-to-artist matching, owned fan contacts and UPI payments.

### Cited Findings

**API lifecycle and access**
- **Basic Display API ended 2024-12-04,** announced 2024-09-04; Meta recommended professional-account APIs instead — [Meta blog](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/) [VERIFIED]
- **Instagram API with Instagram Login launched 2024-07-23.** No Facebook Page needed; host graph.instagram.com — [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED]
- **Scope renames** 2024-09-17; old scopes deprecated 2025-01-27 — [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED]
- **Supported account types and capabilities.** The Instagram Login configuration supports messaging, publishing, comment management and mentions, for Business or Creator accounts only. The Facebook Login configuration adds hashtag search and business discovery — [Instagram Platform overview](https://developers.facebook.com/docs/instagram-platform/) [VERIFIED]
- **Advanced Access via App Review** is required for multi-business "Tech Providers": screencasts, step-by-step test instructions, English UI — [App Review doc](https://developers.facebook.com/documentation/instagram-platform/app-review.md) [VERIFIED]. Business Verification requirements and review timelines are not stated there (gap).

**Metric churn**
- 2024-10-02: `video_views` removed, and profile_views, website_clicks and other account metrics discontinued.
- 2025-01-21: `views` added; impressions and plays deprecated (all versions by 2025-04-21).
- 2025-12-03: `reposts`, `reels_skip_rate`, Trial Reels publishing (`trial_params`), Delete Media API.
- 2026-04-22: saved, shares and reposts count fields; Like API (`instagram_manage_engagement`).
- 2026-06-01: Audio API.
- 2026-06-22: `is_ai_generated`; story `link_clicks` (Facebook Login only).
- Source: [changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md) [VERIFIED]

**Rate limits**
- Platform-wide: "Calls within 24 hours = 4800 * Number of Impressions". Messaging and private-reply limits are listed in Feature 6 — [rate limiting](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/) [VERIFIED]
- Content publishing: 100 API posts per 24 hours — [content publishing](https://developers.facebook.com/documentation/instagram-platform/content-publishing.md) [VERIFIED]

**Small-account data thresholds (under 100 followers)** — [user insights](https://developers.facebook.com/documentation/instagram-platform/api-reference/instagram-user/insights.md) [VERIFIED]

**Meta's competing native features**

| Feature | Detail | Source |
|---|---|---|
| Up to 5 bio links | 2023-04-18 | [TechCrunch](https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/) [REPORTED] |
| Native scheduling | Up to 75 days ahead; reportedly open to all public accounts since Mar 2026 | [Albato](https://albato.com/blog/publications/how-to-schedule-instagram-posts) [REPORTED] |
| Business Suite keyword and comment automations | 5 keywords, 15-minute delay | [CreatorFlow](https://creatorflow.so/blog/instagram-built-in-automation/) [REPORTED] |
| Reply to Keywords for ads | Test, 2026-08-25 | [SMT](https://www.socialmediatoday.com/news/meta-tests-auto-dm-response-for-instagram-ad-comments/828791/) [REPORTED] |
| AI Studio creator AI for DMs | 2024; AI character creation halted 2026-08-10 | [Meta](https://about.fb.com/news/2024/07/create-your-own-custom-ai-with-ai-studio/) [VERIFIED] |
| Creator Marketplace API for brands | First-party creator data and "personalized creator recommendations"; brand query limit raised to 1,000/user/hour (2026-03-30) | [Meta doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md) [VERIFIED] |
| Creator Insights panel for brands | Test, 2024-06-16 | [SMT](https://www.socialmediatoday.com/news/instagram-tests-creator-insights-profile-performance-brands/719065/) [REPORTED] |
| Shareable insights PDF from Edits | Oct 2025 | [HeyOrca](https://www.heyorca.com/blog/instagram-social-news) [REPORTED] |
| Trial Reels | Reach non-followers first | [SMT 2025-06-08](https://www.socialmediatoday.com/news/instagram-trial-reels-increase-reach-tests/750121/) [REPORTED] |
| Meta Verified | $14.99–$499.99/mo tiers incl. "Links in reels" and (as summarised by the fetch tool, not verbatim) search optimisation and featured profile placement | [meta.com](https://www.meta.com/meta-verified/) [VERIFIED] |

**Link gating precedent.** Facebook tested 2 link posts per month for non-subscribers (Dec 2025) — [TechCrunch](https://techcrunch.com/2025/12/17/facebook-is-testing-a-link-posting-limit-for-professional-accounts-and-pages) [REPORTED]

**Domain-level risk in India.** Linktree was inaccessible in India for several days in Aug 2025 — [TechCrunch](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/) [REPORTED]

### Inferences

**Exposure by feature** [INFERENCE; ratings are judgments on the evidence above]

| Feature | API dependency | Meta native substitute | Exposure | Main mitigation |
|---|---|---|---|---|
| 1 Synced profile | High (Instagram Login, basic scope, tokens) | Instagram profile itself; Creator Marketplace profiles for brands | High | Snapshot media; allow non-Instagram works; own discovery index |
| 2 Insights / verified ER | High (insights scope; metrics churn; thresholds) | Instagram Insights; Creator Marketplace; Edits PDF export (reported) | High | Artist context + peer benchmarks; definitions resilient to metric renames |
| 3 Scheduling | High (content publish scope; App Review) | Native scheduler, Business Suite | Very high | Don't build early |
| 4 Link-in-bio | Low (a web page; only the Instagram grid and stats use the API) | 5 bio links; Meta Verified link features | Medium (a Meta link-policy change or a domain block would hurt) | Custom domains; multi-platform sharing; owned fan contacts |
| 5 Templates | None | None | Low | — |
| 6 DM automation | Very high (messaging scope, Live webhooks, rate limits, policy) | Business Suite keywords; ads Reply to Keywords; AI Studio | Very high | Defer; scope narrowly; partner |

**Strategic implication.** The more of Underdawg's value sits in Instagram-API features, the more Meta can commoditise or cut it. The features least exposed to Meta are discovery among artists, brand/curator matching, the artist graph, payments (UPI) and owned contacts. They are also the most aligned with the core objective.

### Gaps
- Meta Platform Terms and Developer Policies on storing, analysing or ranking with Instagram data (e.g., using synced posts for recommendations): not opened.
- Business Verification requirements and typical App Review timelines for 2026: not documented in the opened pages.
- Official Meta sources for native scheduling and Business Suite automation limits: not opened.
- Meta Verified INR pricing: page blocked.

---

## Discovery — Does any of this improve DISCOVERY for unknown artists, or only conversion/monetisation of an existing Instagram audience? Does it favour already-popular accounts?

### Takeaway
None of the six features creates discovery for unknown artists on its own. They are creator-side utilities that convert or manage an audience the artist already has on Instagram.
- **Can feed discovery:** Feature 1 (content inventory) and Feature 2 (reach-normalised resonance signals), if Underdawg builds its own search/browse layer for brands, curators and collaborators.
- **Can become a discovery surface:** Feature 4's brand view.
- **No discovery effect:** Features 3, 5 and 6. Feature 5 is a minor exception for designers.

Several elements favour popular accounts by default: follower displays, follower-based pricing, and DM automation scaled by comment volume. Fair-discovery design is required.

### Cited Findings
- **Instagram's own discovery is recommendation-driven.** Explore and Reels prioritise content from accounts users don't follow. Instagram says "we don't suppress content to encourage people to buy ads" — [Instagram, "Instagram Ranking Explained", 2023-05-31](https://about.instagram.com/blog/announcements/instagram-ranking-explained) [VERIFIED]
- **Instagram ships non-follower discovery tools for creators.** "After trying trial reels, 40% of creators started posting reels more often and of those who did, 80% saw an increase in reels reach from non-followers" — [Social Media Today, 2025-06-08](https://www.socialmediatoday.com/news/instagram-trial-reels-increase-reach-tests/750121/) [REPORTED]
  - Access conflict: "Public profiles with at least 1,000 followers should now have access" — [HeyOrca, citing a Threads post](https://www.heyorca.com/blog/instagram-social-news) [REPORTED]. Social Media Today mentions no follower threshold.
- **Meta sells visibility.** Meta Verified lists search optimisation and featured profile placement among its benefits (wording as summarised by the fetch tool, not verbatim) — [meta.com/meta-verified](https://www.meta.com/meta-verified/) [VERIFIED]
- **Meta does brand-side discovery itself.** "personalized creator recommendations and search using authenticated first-party data" — [Creator Marketplace API](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md) [VERIFIED]
- **Small accounts show higher engagement rates:** 1K–5K 4.8% vs 1.0–1.2% at 20K+ — [HypeAuditor](https://hypeauditor.com/free-tools/instagram-engagement-calculator/) [VERIFIED]
  - But small accounts have tiny absolute numbers: 1–3 comments and about 1 save per post at 1–5K — [Socialinsider](https://www.socialinsider.io/social-media-benchmarks/instagram) [VERIFIED]
  - And faster audience growth: 22.00% at 1–5K vs 11.25% at 100K–1M (2025; period assumed annual by the sub-researcher) — [Socialinsider](https://www.socialinsider.io/social-media-benchmarks/instagram) [VERIFIED]
- **API data gaps hit the smallest accounts:** follower_count and online_followers are unavailable under 100 followers — [Meta](https://developers.facebook.com/documentation/instagram-platform/api-reference/instagram-user/insights.md) [VERIFIED]
- **Brands are moving budget to small creators.** 51.43% plan to expand nano and 52.83% micro use — [IMH 2026](https://influencermarketinghub.com/influencer-marketing-benchmark-report/) [VERIFIED]. Demand exists for a way to find good small creators.

### Inferences
**Discovery role by feature**

| Feature | Discovery role | Popularity bias by default | Fair-discovery fix |
|---|---|---|---|
| 1 Synced profile | Inventory enabler | Yes, if ranked by followers or likes | Structured tags (discipline, medium, city); hide follower counts in brand search; new-artist exposure quotas |
| 2 Verified ER | Resonance signal | ER favours small; absolute counts favour big | Rank on reach-normalised resonance with Bayesian smoothing and minimum samples; show ranges |
| 3 Scheduling | None | Neutral | — |
| 4 Link-in-bio | Indirect: viral acquisition plus brand-view entry | Yes (page traffic mirrors Instagram audience) | Opt-in "emerging artists in this discipline" on brand views only; rotation and caps; reciprocity |
| 5 Templates | Minor (designer credit) | Best-sellers dominate | "New" rotation; curated picks |
| 6 DM automation | None | Strongly favours accounts with comment volume | Not applicable |

**Gap Underdawg could own.** Instagram discovery optimises for consumer attention. Meta's brand-side discovery serves brands and sells visibility through Meta Verified. Neither is specifically designed to surface under-discovered artists fairly.
- That positioning could be defensible, but none of these six features delivers it.
- The discovery engine must be built separately: brand briefs matched to artists by fit, not followers; curator picks; local and discipline browsing.
- These six features are best treated as plumbing and monetisation around that core.

**Answers to the brief's research-mindset questions**
- "If this feature disappeared, would artists actually care?"
  - Link-in-bio and verified stats: some would.
  - Scheduling, templates and DM automation: few, because free or cheap alternatives exist.
- "Why can't an artist simply do this on Instagram?"
  - Mostly they can: 5 links, native scheduling, Insights, Business Suite automations.
  - Exceptions: UPI-native payments on an owned page, a verified brand-facing card with artist context, and peer benchmarks.

### Gaps
- No evidence was collected on artists' own reports of discovery via link-in-bio pages or DM automation; no studies were found.
- No data on whether brands browse link-in-bio pages or media kits to discover creators (vs. marketplaces).

---

## India specifics — usage of LinkDM/SuperProfile/Topmate-style tools, UPI-enabled link pages, and what Indian creators pay

### Takeaway
India is a very large Instagram creator market:
- 481M Instagram ad reach (Oct 2025).
- 2–2.5M active creators with over 1,000 followers.
- Only 8–10% of creators monetise effectively.

Indian creators are offered many INR-priced tools: DM tools at ₹99–₹999/mo, Linktree at ₹360–₹1,450/mo on monthly billing, Pixpa at ₹200–₹600/mo. Commission models (Topmate 10–20%, Instamojo 2–5% + ₹3) coexist with subscriptions. UPI dominates payments, but global link-in-bio tools show Stripe/PayPal.

Underdawg's ₹299 is competitive against Linktree's monthly prices. But it equals a pure DM tool's Pro (ReplyKaro), so the ₹299 must buy artist-specific outcomes (verified brand view, opportunities), not commodity tools.

### Cited Findings

**Market size**
- **Instagram reach:** 481 million Instagram ad reach (Oct 2025), 32.8% of the population; +89.5M (+22.9%) YoY — [DataReportal Digital 2026 India, 2025-11-05](https://datareportal.com/reports/digital-2026-india) [REPORTED]
- **Internet and social:** 1.03B internet users; 500M social media user identities — [DataReportal](https://datareportal.com/reports/digital-2026-india) [REPORTED]
- **Creators and monetisation (BCG via DD India, 2025-05-02)** — [DD India](https://ddindia.co.in/2025/05/waves-2025-indias-creator-economy-set-to-influence-over-1-trillion-in-consumer-spending-by-2030-says-bcg-report/) [REPORTED]
  - "between 2 and 2.5 million active creators" with "more than 1,000 followers who regularly produce digital content"
  - "only 8 to 10 percent of creators currently monetize their content effectively"
  - Direct revenues "$20–25 billion", rising to "$100–125 billion" by 2030
  - About $350B of consumer spend influenced, surpassing $1T by 2030
- **Conflicting BCG summaries**
  - The BCG page summary says "over 2–2.5 million monetized content creators" — [BCG](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy) [VERIFIED as summarised]
  - Mediabrief describes "2.5 million serious creators" as 10K–100K-follower mid-tier creators, and says "Only 1% of creators earn consistently" — [Mediabrief, 2025-05-06](https://mediabrief.com/inside-the-2bn-surge-of-indias-creator-economy-bcg-report/) [REPORTED]
  - Definitions conflict; treat as order-of-magnitude.

**Tool usage and pricing**
- **Linktree in India**
  - ₹360/₹650/₹1,450 per month on monthly billing (₹220/₹440/₹1,250 billed yearly) — [linktr.ee/s/pricing](https://linktr.ee/s/pricing/) [VERIFIED from an Indian IP]
  - India was Linktree's 5th-largest market (~7.3M visits, July 2025) before an Aug 2025 outage — [TechCrunch](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/) [REPORTED]
  - iOS India: 4.67 from 1,426 ratings vs 61,616 in the US — [App Store IN](https://apps.apple.com/in/app/linktree-link-in-bio-creator/id1593515263) [VERIFIED catalog]
- **Topmate:** commission only, 10% (profile/link) and 20% (marketplace); "1mn+ professionals" (vendor claim) — [topmate.io/pricing](https://topmate.io/pricing) [VERIFIED]
- **Instamojo:** UPI on all plans; 5% + ₹3 on free tiers, 2% + ₹3 on paid tiers (₹1,499–₹2,999/mo) — [instamojo.com/pricing](https://www.instamojo.com/pricing/) [VERIFIED]
- **DM tools in INR:** ReplyKaro ₹99 Starter / ₹299 Pro (blog); Kwikzy ₹399–999; LinkPlease ₹499; Creator Lane ₹1,500/yr; SuperProfile ₹499–₹2,000/mo (conflicting) — see Feature 6 [VERIFIED/REPORTED as marked there]
- **Indian-built DM tools pricing in USD:** InstantDM, Zorcha — [instantdm.com](https://instantdm.com/pricing), [zorcha.com](https://zorcha.com/pricing) [VERIFIED]
- **Indian creator marketplaces (vendor claims):** Kofluence (750,000+ creators; $4M led by Nikhil Kamath); Hobo.Video (225,187+ influencers; 12,000+ brands) — [Kofluence](https://www.kofluence.com/), [Hobo.Video](https://hobo.video/) [VERIFIED]
- **Instagram tooling usage in India (App Store, IN storefront)** — [Apple App Store](https://apps.apple.com/in/app/edits-video-editor/id6738967378) [VERIFIED catalog]
  - Edits: 85,857 ratings
  - Meta Business Suite: 40,285
  - Instagram: 7,965,813
  - ManyChat: 297
  - Buffer: 949
  - Planoly: 382
  - Later: 19

**Payments.** 20B UPI transactions worth ₹25 trillion in Aug 2025; UPI 84% of digital payments (2025) — [Wikipedia: UPI](https://en.wikipedia.org/wiki/Unified_Payments_Interface) [REPORTED]

### Inferences
- **Pricing pressure.** Indian creators are offered free or cheap native tools plus ₹99–₹999 point solutions. A ₹299 bundle of commodity Instagram tools will be compared directly with ReplyKaro (₹299 Pro) and with free Meta tools. The willingness to pay must come from outcomes: brand inquiries, paid gigs, credibility.
- **UPI matters.** UPI on the link page and for tips is a real local advantage over global link-in-bio tools, which show Stripe/PayPal only. Instamojo, Razorpay and Topmate already serve Indian payments, so it is necessary, not unique.
- **Native tools dominate, third-party schedulers are niche.** In India, Meta's native creator tools (Edits, Business Suite) have far more App Store ratings than any third-party scheduler or DM tool. This supports the view that third-party Instagram utilities are niche there (proxy evidence).

### Gaps
- Topmate, SuperProfile/Cosmofeed and LinkDM funding and user numbers from Inc42, YourStory, Entrackr and Tracxn: not captured (search budget exhausted; Inc42 tag page did not load).
- INR brand-deal rate benchmarks: not found.
- Share of Indian creators using comment-to-DM or link-in-bio tools: No reliable public data found.
- Meta Verified INR pricing: page blocked.

---

## CHART-READY NUMBERS

### Takeaway
The verified numbers below support pricing, adoption, rating, platform-limit and market-context charts. Keep native currencies; do not mix USD and INR without a sourced exchange rate (none was sourced here). SNIPPET-only numbers are excluded.

### Cited Findings
Confidence: High = official doc or pricing page / Apple catalog; Medium = reputable press or vendor self-claim on own site; Low = secondary or competitor-published, or internally inconsistent.

#### Pricing — link-in-bio and storefront (per month unless stated)
| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Starter price, monthly billing (India) | 360 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ | High (plan mapping by page order) |
| Starter price, billed yearly (India) | 220 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ | High |
| Pro price, monthly billing (India) | 650 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ | High |
| Pro price, billed yearly (India) | 440 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ | High |
| Premium price, monthly billing (India) | 1,450 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ | High |
| Premium price, billed yearly (India) | 1,250 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ | High |
| Starter digital-product fee | 9 | % | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ | High |
| Starter / Pro / Premium (US, older) | 5 / 9 / 24 | USD/month | Linktree | 2025-07-18 | https://www.theleap.co/blog/linktree-pricing/ | Low (secondary; conflicts) |
| Starter / Pro / Premium (US, newer) | 8 / 15 / ~35 | USD/month | Linktree | 2026-08-21 | https://www.elev8or.io/blog/bio/linktree-pricing | Low (secondary; conflicts) |
| Free / Creator / Creator Plus / Creator Max | 0 / 10 / 30 / 100 | USD/month | Beacons | 2026-10-01 | https://beacons.ai/i/pricing | High |
| Seller fee, Free and Creator plans | 9 | % | Beacons | 2026-10-01 | https://beacons.ai/i/pricing | High |
| Creator / Creator Pro | 29 / 99 | USD/month | Stan Store | 2026-07-22 | https://stan.store/blog/stan-store-pricing/ | High |
| Lite / Pro (monthly) | 2.99 / 6.99 | USD/month | Milkshake | 2026-10-01 | https://milkshake.app/ | High |
| Pro Lite / Pro Standard / Pro Plus | 9 / 19 / 49 | USD/year | Carrd | 2026-10-01 | https://carrd.com/pro | High |
| Pro / Pro+ | 7 / 24 | USD/month | Campsite.bio | 2026-10-01 | https://campsite.bio/pricing | High |
| Starter / Growth / Scale (billed yearly; includes Linkin.bio) | 18.75 / 37.50 / 82.50 | USD/month | Later | 2026-10-01 | https://later.com/pricing/ | High |
| Basic Artist / Artist / Pro Artist | 8 / 19 / 39 | USD/month | Feature.fm | 2026-10-01 | https://www.feature.fm/pricing | High |
| Pro (monthly) / Teams (monthly) | 27 / 55 | USD/month | Linkfire | 2026-10-01 | https://www.linkfire.com/pricing | High |
| Price | 0 | USD | Squarespace Bio Sites | 2026-10-01 | https://biosites.com/ | High |
| Commission, profile/link sales / marketplace | 10 / 20 | % | Topmate | 2026-10-01 | https://topmate.io/pricing | High |
| Smart Pages Pro (monthly billing) | 2,499 | INR/month | Instamojo | 2026-10-01 | https://www.instamojo.com/pricing/ | High |
| Transaction fee, free / paid plans | 5% + ₹3 / 2% + ₹3 | per transaction | Instamojo | 2026-10-01 | https://www.instamojo.com/pricing/ | High |
| Basic / Creator / Professional / Advanced (billed yearly, 50% offer) | 200 / 300 / 400 / 600 | INR/month | Pixpa | 2026-10-01 | https://www.pixpa.com/pricing | High |
| Standard / Plus / Premium / Max | 14.99 / 49.99 / 149.99 / 499.99 | USD/month per profile | Meta Verified | 2026-10-01 | https://www.meta.com/meta-verified/ | High (region may vary) |
| Pro plan (planned) | 299 | INR/month | Underdawg | plan | brief | — |

#### Pricing — DM automation
| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Pro / Platinum+ | 19 / 99 | USD/month | LinkDM | 2026-10-01 | https://linkdm.com/pricing | High |
| DMs included, Free / Pro / Platinum+ | 1,000 / 25,000 / 300,000 | DMs/month | LinkDM | 2026-10-01 | https://linkdm.com/pricing | High |
| Legend Pro / Trendsetter | 9.99 / 24.99 | USD/month | InstantDM | 2026-10-01 | https://instantdm.com/pricing | High |
| Pro / Ultimate / Business (monthly billing) | 14.99 / 39.99 / 109.99 | USD/month | Zorcha | 2026-10-01 | https://zorcha.com/pricing | High |
| Pro | 12.99 | EUR/month | Inro | 2026-10-01 | https://www.inro.social/pricing | High |
| Pro / Growth (monthly billing) | 15 / 30 | USD/month | CreatorFlow | 2026-10-01 | https://creatorflow.so/pricing | High |
| AI Acquire / AI Start / AI Accelerate / AI Max | 12 / 31 / 127 / 399 | USD/month | Spur | 2026-10-01 | https://www.spurnow.com/pricing | High |
| Business (billed yearly) | 18 | USD/month | Chatfuel | 2026-10-01 | https://chatfuel.com/pricing | High |
| Starter / Pro | 3 / 9 (Starter ₹99) | USD/month | ReplyKaro | 2026-10-01 | https://www.replykaro.com/instagram-dm-automation | High (blog lists Pro ₹299: Medium) |
| Pro entry price | "from 15" | USD/month | ManyChat | 2026-09-25 | https://chatarmin.com/en/blog/manychat-pricing | Low (secondary; official page 403; conflicting) |

#### Pricing — analytics and scheduling
| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Essentials / Performance | 199 / 499 | USD/month | Modash | 2026-10-01 | https://www.modash.io/pricing | High |
| Starter / Launch / Scale / Custom (from) | 9 / 33 / 69 / 116 | EUR/month | Iconosquare | 2026-10-01 | https://www.iconosquare.com/pricing | High |
| Starter / Advanced (ranges) | 20–36 / 53–210 | USD/month | Metricool | 2026-10-01 | https://metricool.com/pricing/ | High |
| Standard / Professional / Advanced | 99 / 199 / 399 | USD/user/month | Hootsuite | 2026-10-01 | https://www.hootsuite.com/plans | High |
| Essentials (annual) to Advanced | 79–399 | USD/seat/month | Sprout Social | 2026-10-01 | https://sproutsocial.com/pricing/ | High |
| Adapt / Optimize / Predict | 82 / 124 / 199 | USD/month | Socialinsider | 2026-10-01 | https://www.socialinsider.io/pricing | High |
| Essentials / Team | 5 / 10 | USD/channel/month | Buffer | 2026-10-01 | https://buffer.com/pricing | High |
| Starter / Growth / Pro | 14 / 24 / 47 | USD/month | Planoly | 2026-10-01 | https://www.planoly.com/pricing | High |
| Essentials / Standard / Premium / Ultimate | 30 / 50 / 100 / 200 | USD/month | SocialPilot | 2026-10-01 | https://www.socialpilot.co/plans | High |
| Core / Rise / Enterprise+ | 24 / 55 / 212 | USD/month | Predis.ai | 2026-10-01 | https://predis.ai/pricing/ | High |
| Professional / Advanced / Scale | 99 / 199 / 449 | USD/month | Vista Social | 2026-10-01 | https://vistasocial.com/pricing/ | High |

#### Pricing — template marketplace commissions
| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Seller fee | 8% + $0.40 | per sale | Notion Marketplace | 2026-10-01 | https://www.notion.com/help/selling-on-marketplace | High |
| Commission on template sales | 0 | % | Framer Marketplace | 2026-09-15 | https://www.framer.com/help/articles/how-the-creator-program-works/ | High (vendor) |
| Direct / Discover sales fee | 10% + $0.50 / 30% | per sale | Gumroad | 2026-10-01 | https://gumroad.com/pricing | High |
| Link-in-bio template prices | 9–39 | USD (one-time) | Creative Market listings | 2026-10-01 | https://creativemarket.com/search?q=link%20in%20bio | Medium |

#### Adoption, funding and business
| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Users | 24M | users | Linktree | 2022-03-16 | https://techcrunch.com/2022/03/16/linktree-link-in-bio-series-c-valuation/ | Medium |
| Users | 41M / 47M / 50M | users | Linktree | Dec 2023 / Mar 2024 / May 2024 | https://techcrunch.com/2024/05/22/linktree-surpasses-50m-users-rolls-out-beta-social-commerce-program/ | Medium |
| Users | 70M+ | users | Linktree | 2025-04-23 | https://techcrunch.com/2025/04/23/linktree-rolls-out-a-suite-of-monetization-features-for-creators/ | Medium |
| Funding | 110 (at 1.3B valuation) | USD million | Linktree | 2022-03-16 | https://techcrunch.com/2022/03/16/linktree-link-in-bio-series-c-valuation/ | Medium-High |
| Monthly commerce sales driven | ~300 | USD million/month | Linktree users | 2024-05-22 | https://techcrunch.com/2024/05/22/linktree-surpasses-50m-users-rolls-out-beta-social-commerce-program/ | Medium (company estimate) |
| India visits | ~7.3M (3.5% of global) | visits/month | Linktree | July 2025 | https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/ | Medium |
| Creators served at acquisition / funding raised | 700,000+ / 36 | creators / USD million | Koji | 2023-12-14 | https://techcrunch.com/2023/12/14/linktree-acquires-link-in-bio-platform-koji-in-its-second-investment-of-the-year/ | Medium |
| Pages created | 8,830,782 | pages | Taplink | 2026-10-01 | https://taplink.at/en/ | Medium (site counter) |
| Creators | 5M+ | creators | Milkshake | 2026-10-01 | https://milkshake.app/ | Medium (vendor) |
| Creator earnings (cumulative) | 400M+ | USD | Stan | 2026-07-22 | https://stan.store/blog/stan-store-pricing/ | Medium (vendor) |
| Creators | 100,000+ | creators | Komi | 2026-10-01 | https://www.komi.io/ | Medium (vendor) |
| Professionals | 1M+ | users | Topmate | 2026-10-01 | https://topmate.io/ | Medium (vendor) |
| Pages launched | 1M+ | pages | Hopp by Wix | 2026-10-01 | https://hopp.co/ | Medium (vendor) |
| Customers / Series B | ~1.5M / 140 | customers / USD million | ManyChat | 2025-04-22 | https://techcrunch.com/2025/04/22/manychat-taps-140m-to-boost-its-business-messaging-platform-with-ai/ | Medium-High |
| Users / DMs per day | 60,000+ / 1.5M+ | users / DMs | LinkDM | Dec 2025 claim | https://linkdm.com | Medium (vendor) |
| Users | 30,000+ / 60K+ / 20,000+ / 4,496+ | users | InstantDM / Zorcha / CreatorFlow / ReplyKaro | 2026-10-01 | vendor pricing pages (see Feature 6) | Medium (vendor) |
| Customers | 2,600+ | in-house teams | Modash | 2026-10-01 | https://www.modash.io/pricing | Medium (vendor) |
| Customers | 10,000+ | brands/agencies | Iconosquare | 2026-10-01 | https://www.iconosquare.com/pricing | Medium (vendor) |
| Creators / funding | 750,000+ / 4 | creators / USD million | Kofluence | 2026-10-01 | https://www.kofluence.com/ | Low-Medium (vendor; inconsistent count) |
| Influencers / brands | 225,187+ / 12,000+ | count | Hobo.Video | 2026-10-01 | https://hobo.video/ | Medium (vendor) |
| Paid to creators | 6.5M | USD (2025) | Framer | 2026-09-30 | https://www.framer.com/creators | Medium (vendor) |

#### Ratings
All Apple App Store values are from Apple's catalog, pulled 2026-10-01, from the app URLs shown or itunes.apple.com.

| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| iOS rating (US / IN) | 4.82 (61,616) / 4.67 (1,426) | stars (ratings count) | Linktree | 2026-10-01 | https://apps.apple.com/us/app/linktree-link-in-bio-creator/id1593515263 | High |
| iOS rating (US) | 4.87 (12,849) | stars (count) | Stan | 2026-10-01 | https://apps.apple.com/us/app/stan-link-in-bio-for-creators/id6478343472 | High |
| iOS rating (US / IN) | 3.21 (97) / 3.88 (8) | stars (count) | Beacons | 2026-10-01 | https://apps.apple.com/us/app/beacons-creator-tools/id6444589346 | High |
| iOS rating (US / IN) | 4.89 (14,745) / 4.8 (117) | stars (count) | Milkshake | 2026-10-01 | https://apps.apple.com/us/app/milkshake-website-builder/id1452719910 | High |
| iOS rating (US) | 4.71 (148) | stars (count) | Lnk.Bio | 2026-10-01 | https://apps.apple.com/us/app/lnk-bio-link-in-bio/id1643246314 | High |
| iOS rating (US / IN) | 4.28 (2,120) / 3.93 (297) | stars (count) | ManyChat | 2026-10-01 | https://apps.apple.com/us/app/manychat/id1460129210 | High |
| iOS rating (IN / US) | 4.36 (39) / 4.62 (21) | stars (count) | InstantDM | 2026-10-01 | https://apps.apple.com/in/app/comment-to-link-dm-instantdm/id6756658913 | High |
| iOS rating (US / IN) | 4.55 (2,526) / 4.58 (19) | stars (count) | Later | 2026-10-01 | https://apps.apple.com/us/app/later-social-media-scheduler/id784907999 | High |
| iOS rating (US / IN) | 4.73 (34,478) / 4.57 (949) | stars (count) | Buffer | 2026-10-01 | https://apps.apple.com/us/app/buffer-plan-schedule-posts/id490474324 | High |
| iOS rating (US / IN) | 4.71 (26,970) / 4.61 (382) | stars (count) | Planoly | 2026-10-01 | https://apps.apple.com/us/app/planoly-social-media-planner/id1014568284 | High |
| iOS rating (US / IN) | 4.67 (34,295) / 4.52 (452) | stars (count) | Hootsuite | 2026-10-01 | https://apps.apple.com/us/app/hootsuite-social-media-tools/id341249709 | High |
| iOS rating (US / IN) | 2.67 (111) / 3.17 (6) | stars (count) | Metricool | 2026-10-01 | https://apps.apple.com/us/app/metricool/id1072510529 | High |
| iOS rating (US) | 4.75 (26,046) | stars (count) | Publer | 2026-10-01 | https://apps.apple.com/us/app/publer-social-media-tools/id1571680865 | High |
| iOS rating (US / IN) | 4.68 (503,546) / 4.76 (40,285) | stars (count) | Meta Business Suite | 2026-10-01 | https://apps.apple.com/us/app/meta-business-suite/id514643583 | High |
| iOS rating (US / IN) | 4.79 (89,241) / 4.63 (85,857) | stars (count) | Edits (Instagram) | 2026-10-01 | https://apps.apple.com/in/app/edits-video-editor/id6738967378 | High |
| Trustpilot | 4.0 (7,151 reviews) | stars | Linktree | 2026-10-01 | https://www.trustpilot.com/review/linktr.ee | Medium |
| Trustpilot | 4.7 (2,180) | stars | Stan | 2026-10-01 | https://www.trustpilot.com/review/stan.store | Medium |
| Trustpilot | 2.0 (42) | stars | Beacons | 2026-10-01 | https://www.trustpilot.com/review/beacons.ai | Medium |
| Trustpilot | 2.1 (304) | stars | ManyChat | 2026-10-01 | https://www.trustpilot.com/review/manychat.com | Medium |

#### Platform limits (Meta)
| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Bio links | 5 | links | Instagram | 2023-04-18 | https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/ | Medium-High |
| Basic Display API end of life | 2024-12-04 (notice 90 days) | date | Meta | 2024-09-04 | https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/ | High |
| API-published posts | 100 | posts per 24h | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/content-publishing.md | High |
| Carousel items via API | 10 | items | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/content-publishing.md | High |
| Media containers | 400 | per rolling 24h | Instagram API | 2026-10-01 | https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media | High |
| Private replies, posts and Reels | 750 | calls/hour/account | Instagram API | 2026-10-01 | https://developers.facebook.com/docs/graph-api/overview/rate-limiting/ | High |
| Private replies, Live comments | 100 | calls/second/account | Instagram API | 2026-10-01 | https://developers.facebook.com/docs/graph-api/overview/rate-limiting/ | High |
| Send API, text and links | 100 | calls/second/account | Instagram API | 2026-10-01 | https://developers.facebook.com/docs/graph-api/overview/rate-limiting/ | High |
| Send API, audio and video | 10 | calls/second/account | Instagram API | 2026-10-01 | https://developers.facebook.com/docs/graph-api/overview/rate-limiting/ | High |
| Conversations API | 2 | calls/second/account | Instagram API | 2026-10-01 | https://developers.facebook.com/docs/graph-api/overview/rate-limiting/ | High |
| Private replies per comment | 1 | message | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/private-replies.md | High |
| Private-reply window | 7 | days after comment (Live: during broadcast only) | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/private-replies.md | High |
| Standard messaging window | 24 | hours | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md | High |
| DM text length | 1,000 | bytes | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md | High |
| DM file / image size | 25 / 8 | MB | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md | High |
| Minimum followers for follower_count and online_followers | 100 | followers | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/api-reference/instagram-user/insights.md | High |
| online_followers history | 30 | days | Instagram API | 2026-10-01 | same | High |
| Insights delay | up to 48 | hours | Instagram API | 2026-10-01 | same | High |
| Long-lived token lifetime | 60 | days | Instagram API | 2026-10-01 | https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started.md | High |
| Creator Marketplace API query limit | 240 → 1,000 | queries/user/hour | Meta | 2026-03-30 | https://developers.facebook.com/documentation/instagram-platform/changelog.md | High |
| Native scheduler horizon / daily cap | 75 / 25 | days / posts per day | Instagram app | 2026-09-09 | https://albato.com/blog/publications/how-to-schedule-instagram-posts | Low (single secondary) |
| Native keyword automations | 5 keywords; 15-minute delay | limits | Meta Business Suite | 2026-08-18 | https://creatorflow.so/blog/instagram-built-in-automation/ | Low (competitor-published) |
| Ad "Reply to Keywords" test | 5 | keywords | Meta (Instagram ads) | 2026-08-25 | https://www.socialmediatoday.com/news/meta-tests-auto-dm-response-for-instagram-ad-comments/828791/ | Medium |
| Facebook link-post test limit (non-Verified) | 2 | link posts/month | Meta (Facebook) | 2025-12-17 | https://techcrunch.com/2025/12/17/facebook-is-testing-a-link-posting-limit-for-professional-accounts-and-pages | Medium |

#### Market context and benchmarks
| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Instagram ad reach | 481M (32.8% of population; +22.9% YoY) | people | India | Oct 2025 | https://datareportal.com/reports/digital-2026-india | Medium-High |
| Internet users | 1.03B | people | India | end 2025 | https://datareportal.com/reports/digital-2026-india | Medium-High |
| Active creators (>1,000 followers) | 2–2.5M | creators | India (BCG) | 2025-05-02 | https://ddindia.co.in/2025/05/waves-2025-indias-creator-economy-set-to-influence-over-1-trillion-in-consumer-spending-by-2030-says-bcg-report/ | Medium (definitions conflict across summaries) |
| Creators monetising effectively | 8–10 | % | India (BCG) | 2025-05-02 | same | Medium |
| Creator economy direct revenue, now → 2030 | 20–25 → 100–125 | USD billion | India (BCG) | 2025-05-02 | same | Medium |
| UPI transactions | 20B (₹25 trillion) | transactions/month | India | Aug 2025 | https://en.wikipedia.org/wiki/Unified_Payments_Interface | Medium (secondary citing NPCI) |
| Average ER by follower tier: 1K–5K / 20K–100K / 100K–1M / 1M+ / overall | 4.8 / 1.2 / 1.0 / 1.2 / 2.2 | % | HypeAuditor (creators) | 2026 | https://hypeauditor.com/free-tools/instagram-engagement-calculator/ | Medium-High (5K–20K tier missing) |
| Average Instagram ER, 2025 (down 24% YoY) | 0.48 | % | Socialinsider (mostly brand pages) | 2026-02-20 | https://www.socialinsider.io/social-media-benchmarks/instagram | Medium-High |
| Average comments per post, 1–5K followers (Reels / carousels / images) | 3 / 2 / 1 | comments | Socialinsider | 2026 | same | Medium-High |
| Audience growth rate, 1–5K vs 100K–1M | 22.00 vs 11.25 | % (2025; period assumed annual) | Socialinsider | 2026 | same | Medium-High |
| Instagram rate per post: nano / micro / mid / macro / mega | 10–100 / 100–500 / 500–5,000 / 5,000–10,000 / 10,000+ | USD/post | IMH | 2026-08-31 | https://influencermarketinghub.com/instagram-influencer-rates/ | Medium |
| Brands that experienced or expect fraud | 89 | % | IMH survey (600+) | 2026-05-04 | https://influencermarketinghub.com/influencer-marketing-benchmark-report/ | Medium |
| Brands planning to expand nano / micro creators | 51.43 / 52.83 | % | IMH | 2026-05-04 | same | Medium |
| Creators who never collaborated with a brand | 67 | % | Linktree survey (n=9,576) | 2022 | https://linktr.ee/creator-report | Medium (older) |
| Beginner creators not yet monetised | 59 | % | Linktree survey | 2022 | same | Medium (older) |
| Trial Reels users who then saw higher non-follower reach | 40 then 80 | % (posting more → saw reach increase) | Instagram (via SMT) | 2025-06-08 | https://www.socialmediatoday.com/news/instagram-trial-reels-increase-reach-tests/750121/ | Medium |

### Inferences
**Pricing chart.** Plot the INR series (Linktree IN, Pixpa, Instamojo, the Underdawg plan) separately from USD/EUR series. If a combined chart is needed, source an RBI reference rate for the chart date first; no rate was sourced here.

**Ratings chart.**
- Show the ratings count next to the star average: Beacons (97) and Metricool (111) have small samples.
- India has far fewer ratings for third-party creator tools than for Meta's native apps.

### Gaps
- Not captured or blocked:
  - Google Play ratings and downloads
  - ManyChat official prices
  - SuperProfile prices
  - Taplink paid prices
  - Hopp Pro price
  - Meta Verified INR prices
  - Indian startup funding (Topmate, SuperProfile, LinkDM, InstantDM, Zorcha)
  - INR brand-deal rate benchmarks
- Linktree's USD prices conflict between two 2025–2026 secondary sources. Only INR prices were verified from the official page.
