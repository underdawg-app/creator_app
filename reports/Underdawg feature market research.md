# Underdawg Feature Market Research
Prepared 2 October 2026 · India first · 18 features evaluated

*How to read this front part.* It summarises the six detailed parts: Part 01 (artist problems, platform failures, market gaps), Part 02 (features 1–6, the Instagram layer), Part 03 (shop and money features), Part 04 (community, live and hiring features), Part 05 (competitors, startups, failures) and Part 06 (discovery, missing features, MVP, positioning). Indian evidence comes first in every section. Material from other countries sits under "Outside India (background only)". It is used only where no Indian evidence exists, or where it teaches a lesson India has not yet tested. Money is in rupees. Where a source reported dollars, the dollar figure is kept as the source wrote it. 1 lakh = 100,000; 1 crore = 10 million. Every number carries its source and date, here or in the parts. Labels: **[V]** = verified on the cited page; **[CC]** = company's own claim, not checked; **[2nd]** = secondary source (press reports, blogs, and Inc42 Datalabs figures, which are indicative only); **[INF]** = inference by the research team; **[A]** = assumption to test. "PMF" means product-market fit.

## A. Executive summary

- **India has millions of small creators, and most earn little.** Kofluence counts 4.0–4.4 million active creators. 61.1% are nano (1,000–10,000 followers) and 32.5% are micro (10,000–100,000) ([MediaNews4U, 15 May 2026](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/); [Storyboard18, 14 May 2026](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [CC]. BCG counts 2–2.5 million creators with over 1,000 followers and says only 8–10% "monetize effectively" ([PIB, 2 May 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)) [V]. Storyboard18, citing BCG, says most nano and micro creators earn under ₹18,000 a month ([Storyboard18, 4 May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm)) [2nd]. For musicians the data is firm: 69% of authors and composers paid by IPRS received under ₹25,000 a year, and only 60% of surveyed music creators make music full-time ([EY, December 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)) [V]. No Indian income survey exists for visual artists, illustrators, dancers or photographers.

- **The big answer: the current plan does not deliver discovery.** As written, Underdawg is mainly a money and Instagram toolkit. The link page, DM automation, shop, tips, Fan Club, downloads and tickets all reach people who already know the artist. They pay out in proportion to the audience an artist already has, so the already-popular gain most. That inverts the core goal [INF] (Parts 01 and 06). Only three planned features can put an unknown artist in front of new people who can act: Hire Artists, Gigs and a reshaped Show & Review.

- **What should change.** Make Underdawg the place where **curators, bookers, brands and collaborators find unknown artists, ranked by fit, and nobody can pay to jump the queue.** Keep the Instagram profile, a verified credibility card and a narrow link page as the cheap front door. Add a free "first-audience" review queue, verified accounts for opportunity-givers, and one Opportunities marketplace that merges Hire Artists and Gigs. Launch in one city with 3–5 crafts, run partly by hand [INF].

- **In India the gap is matching and trust, and both sides report it.** Instagram reaches 481 million people in India and YouTube 500 million ([DataReportal, 5 Nov 2025](https://datareportal.com/reports/digital-2026-india)) [V]. Attention is not scarce. Yet 50.4% of creators say "limited brand collaboration opportunities" is their main obstacle (Kofluence 2026; Storyboard18, 14 May 2026) [CC]. 83% of marketers say they struggle to discover influencers ([Goat/Kantar via WPP Media, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity)) [V]. In a HashFame survey, 62% of creators did not know brands had tried to reach them, and over 55% lost deals because they had no verified contact route or because fake managers stepped in ([MediaBrief, 27 May 2025](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [CC; method not disclosed].

- **Money is growing in India, but it does not reach small artists.** Influencer-marketing spend for 2024 is ₹2,344 crore by EY's estimate ([EY, April 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) [V] and ₹3,600 crore by Goat/Kantar (WPP Media, 10 Jun 2025) [V]. A creator under 10,000 followers gets about ₹500–5,000 per Reel ([Kofluence via Mediabrief, 10 Jul 2025](https://mediabrief.com/kofluence-influencer-marketing-report-2025/)) [CC]. Smaller creators are often offered products instead of money ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)). Organised live events grew 44% to ₹14,500 crore in 2025 ([FICCI-EY, March 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [V]. But indie musicians say club gigs pay a "token fee" ([Rolling Stone India, 13 Jul 2022](https://rollingstoneindia.com/heres-what-its-really-like-to-be-an-indian-indie-artist-playing-live-gigs/)). No source gives emerging artists' share of live-event revenue.

- **Late payment and scams are documented in India, but nobody has measured them for artists.** Trade reporting says the standard brand payment cycle is 90 days and can stretch to a year ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm); anonymous sources) [2nd]. Karnataka's culture department owed over 1,800 artists more than ₹4 crore ([The Indian Music Diaries, 4 Mar 2026](https://theindianmusicdiaries.com/are-payment-delays-silencing-the-voices-of-independent-music/)). Indians reported ₹22,845.73 crore of cyber-fraud losses in 2024 ([Inc42, 22 Jul 2025](https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/)) and ₹22,495 crore in 2025 ([The420.in, 21 Feb 2026](https://the420.in/india-cybercrime-24pct-rise-22495cr-loss/)) [2nd]. Police cases show fake casting agents on Instagram and WhatsApp taking ₹1,000 to ₹75,000 per victim ([BOOM, 19 Jan 2022](https://www.boomlive.in/explainers/bollywood-casting-director-shares-how-fake-accounts-impersonate-him-to-dupe-actors-16434); [The Tribune, 14 Jan 2024](https://www.tribuneindia.com/news/delhi/man-posing-as-casting-director-dupes-15-aspiring-models-in-delhi-581182)). No Indian survey gives the share of artists who are paid late or scammed.

- **Feedback and trust boards are the most open spaces.** In a 15-platform matrix, **Artist Boards are offered by none and Show & Review only partly by two** (Part 05). No Indian company offers artist peer boards for scam alerts, rate checks or brand reviews [INF]. No India-specific critique or curator marketplace was found. Indian artists do already pay to be seen: comedians pay ₹200–500 for an open-mic slot ([BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india)) [2nd; blog, low reliability]. Whether Indian artists will pay for curator feedback is untested.

- **Most other features are commodities in India.** The Indian DM tool ReplyKaro starts at ₹99 a month ([ReplyKaro, 2 Oct 2026](https://replykaro.com/pricing)) and its blog lists "Pro" at **₹299, the same as Underdawg Pro** ([ReplyKaro blog](https://www.replykaro.com/blog/superprofile-auto-dm-vs-replykaro-2026)) [CC]. Zorcha offers "Free Unlimited Instagram DM Automation" ([Zorcha, 2 Oct 2026](https://zorcha.com)) [CC]. Topmate, TagMango, Exly and SuperProfile already sell link pages, downloads and paid sessions with Indian payments. Instagram's creator marketplace has been open to India since **21 Feb 2024** ([TechCrunch](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/)). Link-in-bio, shops, downloads and brand hiring are each offered fully or partly by 10+ of the 15 platforms in the matrix.

- **Tension 1 — discovery vs selling.** Selling tools help artists who have fans; discovery helps those who don't. Do discovery first, with money tools as cheap, zero-fee blocks downstream. **Never sell reach.** Paid reach is already sold to Indian artists: BandLab's "Boost" costs ₹299–₹999 on the India App Store ([App Store India, 1 Oct 2026](https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775)) [V]. A Mumbai musician says visibility is governed by "editorial playlists, paid advertising, and platform partnerships" ([The Indian Music Diaries, 26 Sep 2025](https://theindianmusicdiaries.com/who-gets-to-stay-indie-the-struggles-behind-the-indian-independent-music-scene/)). The backlash against paid reach has so far been tested only outside India (see below).

- **Tension 2 — artists-only vs fans and brands.** An artists-only network with no buyers gives artists nobody to be discovered by. The Indian companies in this space with real revenue all charge a business or a paying learner, not the unknown creator [INF]: Qoruz ₹56.4 crore, Kofluence ₹52.5 crore, Talentrack ₹36.4 crore and Artium Academy ₹28.0 crore in FY25 (Inc42 Datalabs: [Qoruz](https://inc42.com/company/qoruz/), [Kofluence](https://inc42.com/company/kofluence/), [Talentrack](https://inc42.com/company/talentrack/), [Artium](https://inc42.com/company/artium-academy/); indicative) [2nd]. Define "artists-only" as **artists-only supply plus verified opportunity-givers** (brands, bookers, curators, venues, colleges). Build no fan-side product: reject Fan Club.

- **Tension 3 — Instagram/Meta dependence.** Instagram is the main platform for **3.3–3.7M of 4.0–4.4M** active Indian creators ([Kofluence via The Wire, 14 May 2026](https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age)) [CC]. India has seen platform risk at first hand. It banned TikTok on 29 June 2020 ([Al Jazeera, 1 Jul 2020](https://www.aljazeera.com/amp/economy/2020/7/1/indias-tiktok-ban-hurts-content-creators-earnings-prospects)). The Indian apps that replaced it then shrank: Josh fell from 20 million monthly users (July 2023) to 9.4 million (July 2024) ([Inc42 citing data.ai, 24 Jul 2024](https://inc42.com/features/verse-innovations-josh-is-fizzling-out/)). Meta's own rules add risk. It shut the Basic Display API on **4 Dec 2024** ([Meta](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/)); only professional accounts can connect; an app may message a user only after that user messages first ([Meta](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/)); private replies are capped at **750 per hour** ([Meta](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/)). Use Instagram for import and verification, not as the core value. Cache work, allow export, collect fan contacts.

- **Build first:** an Instagram "import and curate" profile; a verified credibility card; a narrow link page (hire/book inquiry, zero-fee UPI support block, free download for email); a free first-audience review queue (Show & Review rebuilt); verified opportunity-giver accounts with fit-based search; one Opportunities board; Rate Check and scam-pattern alerts; published fairness rules.

- **Drop or hold:** **reject Fan Club.** Deprioritise scheduling, DM automation, the template marketplace and in-house ticketing. Hold Live Rooms, the Pro plan, the escrowed Art Shop and paid downloads until after PMF. Run "Shop-lite" and paid 1:1 sessions only as small experiments.

- **The riskiest assumption is on the demand side:** that Indian brands, agencies, venues, cafés, colleges and curators will discover and pay **unknown** artists through Underdawg, again and again, instead of using Instagram DMs, agencies or their own networks. Today "nearly three quarters" of Indian influencer-marketing spend flows directly between brands and creators, outside any organised channel (KlugKlug figure quoted by an OpraahFx co-founder, [MediaNews4U, 4 Apr 2026](https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/)) [CC]. The research found **no direct evidence either way** that these buyers would use an artists-only platform. Test it with a hand-run pilot in one city before building search or escrow. If opportunity-givers will not post briefs and return when the service is free and hand-run, software will not fix it (Part 06).

- **Confidence is moderate.** Indian evidence is firm on creator counts, music incomes, market sizes, and payment, tax and data rules. It is thin on artist incomes outside music, on how often artists are paid late or scammed, and on willingness to pay. Reddit and several Indian press sites could not be opened, the web-search budget ran out partway, and many company figures are self-reported.

**Outside India (background only).** These points have no Indian evidence yet.

- **Reach by account size.** No Indian data on reach per post by follower tier was found. Globally, the median Instagram Reel from a 1–5K-follower account gets about **580 views**; a 100K–1M account gets **16,035** ([Socialinsider, 20 Feb 2026](https://www.socialinsider.io/social-media-benchmarks/instagram)). Instagram has said large accounts "have gotten more reach in recommendations than smaller, original content creators" ([Engadget, 30 Apr 2024](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html)).
- **Artists pay for a gatekeeper's attention.** SubmitHub reports **1.6M users** and a 31% approval rate ([SubmitHub, 1 Oct 2026](https://www.submithub.com/help)) [CC]. Groover reports **600,000+ artists**, paying €2 per curator ([Groover](https://groover.co/en/lp/pricing/)) [CC].
- **Paid reach brings backlash.** Spotify's Discovery Mode drew a "payola" class action ([Digital Music News, 5 Nov 2025](https://www.digitalmusicnews.com/2025/11/05/spotify-accused-of-payola-in-class-action-lawsuit/)). Meta dropped paid "increased reach" from Meta Verified on 17 Mar 2023 ([Meta](https://about.fb.com/news/2023/02/testing-meta-verified-to-help-creators/)).
- **Artists-only networks without buyers.** A review of Cara said "it's all creatives sharing with each other" ([Creative Boom, 6 Jun 2024](https://www.creativeboom.com/resources/everyones-talking-about-cara-but-is-it-any-good/)).

## Verdict for all 18 features

| # | Feature | Verdict | Priority | Why (one line) | Key evidence (Indian first; number + source) |
|---|---|---|---|---|---|
| 1 | Instagram-connected profile | Modify | BUILD EARLY | Cheapest cold-start fix and the inventory discovery needs; must be "import, curate, tag", not a mirror | Main platform for 3.3–3.7M of 4.0–4.4M Indian creators (Kofluence via The Wire, 14 May 2026) [CC]; Instagram reaches 481M in India (DataReportal, 5 Nov 2025) [V]; Basic Display API ended 4 Dec 2024 (Meta) [V] |
| 2 | Instagram insights and verified engagement rate | Modify | BUILD EARLY (credibility card); price suggestion = EXPERIMENT; best time to post = DEPRIORITISE | An owner-verified, reach-normalised card helps brands trust small artists; raw stats are free in Instagram | 74% of Indian brands name fake followers as a concern (BCG via Storyboard18, 4 May 2025) [2nd]; Indian nano creators average about 4% engagement vs about 1.5% for macro (EY, April 2024, p.9) [V] |
| 3 | Schedule posts to Instagram | Deprioritise | DEPRIORITISE | Free inside Instagram; no discovery value; adds App Review scope and failure support | Meta Business Suite has 40,285 Indian iOS ratings vs Buffer's 949 ([App Store India, 1 Oct 2026](https://apps.apple.com/in/app/meta-business-suite/id514643583)) [V]; in-app scheduling for professional accounts since 8 Nov 2022 (TechCrunch) [2nd] |
| 4 | Link-in-bio page | Modify | BUILD EARLY (narrow block set) | Proven demand and the best acquisition surface; only an artist-specific version (brand view, hire/book, UPI, fan contacts) can compete | Linktree had about 7.3M Indian visits in July 2025, its fifth-largest market ([Similarweb via TechCrunch, 18 Aug 2025](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)) [2nd]; Linktree's earning features exclude India (Linktree, ~30 Sep 2026) [V] |
| 5 | Page templates and template marketplace | Combine | COMBINE (free into #4, premium into #18); marketplace = DEPRIORITISE | Table stakes; no evidence artists pay for templates | Link-in-bio template marketplaces found: zero (Part 02); Linktree charges ₹650 a month in India for custom themes ([Linktree, 1 Oct 2026](https://linktr.ee/s/pricing/)) [V]; Indian demand: no reliable public data found |
| 6 | Instagram DM automation | Deprioritise | DEPRIORITISE (narrow Pro feature or partnership after PMF) | Crowded, cheap, Meta-capped; reaches only people who already comment | ReplyKaro from ₹99 a month, blog lists Pro at ₹299 [CC]; Zorcha offers free unlimited DM automation [CC]; 750 private replies/hour (Meta) [V] |
| 7 | Art Shop | Modify | EXPERIMENT ("Shop-lite"), then BUILD AFTER PMF (held payments) | Artist-direct buying is real, but holding buyers' money makes Underdawg a GST e-commerce operator | Indian art auctions reached ₹2,543 crore in 2025, but contemporary art was ₹163 crore ([360 ONE via Business Today, 13 Sep 2026](https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13)) [2nd]; Artflute takes 40% and the artist pays domestic shipping ([Artflute FAQ, 2 Oct 2026](https://www.artflute.com/artist-faqs)) [V]; only 15.2% of Indian creators registered (Kofluence, 14 May 2026) [CC] |
| 8 | Live Rooms | Modify | BUILD AFTER PMF | Crowded and shrinking; reshape into critique and showcase rooms on third-party video | FrontRow shut 30 Jun 2023 after raising about $18M ([TechCrunch, 10 Jul 2023](https://techcrunch.com/2023/07/10/frontrow-shutdown)) or $17.2M ([Entrackr, 14 Jun 2023](https://entrackr.com/2023/06/exclusive-after-mass-layoffs-frontrow-explores-acquisition-deals/)) [V]; Eloelo spent ₹59 crore on ads for ₹69.5 crore of FY25 revenue, then pivoted ([Entrackr](https://entrackr.com/fintrackr/eloelo-burns-rs-59-cr-on-ads-to-generate-rs-69-cr-revenue-in-fy25-11439432)) [V] |
| 9 | Fan Club | Reject | REJECT | Needs fans under-discovered artists lack; contradicts the artists-only, no-feed design | Only 14.4M of about 178M Indian music streamers pay (FICCI-EY, March 2026) [V]; Rigi raised ₹100 crore for paid creator communities, then pivoted ([Entrackr, Jan 2023](https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/); [Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/)) [2nd] |
| 10 | Show & Review | Modify | BUILD EARLY | Best-validated need; rebuild as artist-to-artist and curator review that feeds discovery | No India-specific critique or curator marketplace found (Part 04); 73% of 500 Indian music creators strongly feel they have much to learn about production (EY, December 2023) [V]; 0 full / 2 partial of 15 platforms (Part 05). Outside India: SubmitHub 1.6M users, 31% approval (1 Oct 2026) [CC] |
| 11 | Artist Boards | Modify | BUILD EARLY (narrow: Rate Check, scam-pattern alerts) | Strong trust need that fits artists-only; open brand reviews carry defamation risk in India | Indians reported ₹22,845.73 crore of cyber-fraud losses in 2024 (Inc42, 22 Jul 2025) [2nd]; fake casting agents took ₹1,000–75,000 per victim (BOOM, 19 Jan 2022; The Tribune, 14 Jan 2024) [2nd]; 0 of 15 platforms (Part 05) |
| 12 | Tips (UPI) | Combine | BUILD EARLY as a zero-fee "Support" block on #4; DM tipping = EXPERIMENT | Proven but low-yield; a free personal UPI QR already does the basics | 86% of person-to-merchant UPI payments are below ₹500 ([PIB, Aug 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2)) [V]; Instagram Gifts need 500 followers ([WebHippo citing Meta, 29 Jul 2026](https://webhippo.in/blog/instagram-monetization-india)) [2nd]; Indian data on tip income: none found |
| 13 | Digital downloads | Modify | BUILD EARLY (free download for email); paid files BUILD AFTER PMF; asset directory = EXPERIMENT | Free downloads build an owned audience; paid files are a commodity | Linktree's downloads are not available in India [V]; Indian tools charge 5–10% ([Instamojo](https://www.instamojo.com/pricing/) 5% + ₹3; [Topmate](https://topmate.io/pricing) 10% direct, 20% via its marketplace) [V]; Instagram has no download feature [V] |
| 14 | Bookings and 1:1 sessions | Experiment | EXPERIMENT (paid portfolio reviews, music lessons), then BUILD AFTER PMF | Strongest income evidence of the money tools; real artist-to-artist potential; Topmate leads | 1:1 calls ≈ 39% of Topmate creator earnings, Sep 2023 (co-founder on LinkedIn) [CC]; Artium Academy earned ₹28.0 crore in FY25 from live music teaching (Inc42 Datalabs, indicative) [2nd] |
| 15 | Event tickets | Deprioritise ticketing; Combine listings | DEPRIORITISE | The bottleneck is filling the room, not issuing tickets; strong incumbents | District bought Insider and TicketNew for ~₹2,048 crore (2024) [2nd]; BookMyShow listed 34,086 events in 2025 ([Music Ally, 11 Dec 2025](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/)) [CC] |
| 16 | Hire Artists | Combine (with #17) | EXPERIMENT — central to the MVP as a hand-run pilot | Real problem, but escrowed direct hire is very common and paying demand is the scarce side | 50.4% of Indian creators say too few brand collaborations is their main obstacle (Kofluence 2026) [CC]; 83% of marketers struggle to find creators (Goat/Kantar 2025) [V]; StarClinch, founded 2015, earned ₹2.4 crore in FY25 ([Inc42 Datalabs](https://inc42.com/company/starclinch/), indicative) [2nd] |
| 17 | Gigs | Combine (with #16) | EXPERIMENT — central to the MVP as a curated board in one city | Open calls help unknown artists most, if ranking is fair | India's organised live events +44% in 2025 (FICCI-EY, 24 Mar 2026) [V]; cafés pay emerging musicians ₹3,000–15,000 a gig ([StarClinch blog, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/)) [CC]; StarClinch charges artists 15% and "does not guarantee you any work" ([StarClinch terms](https://starclinch.com/terms-of-use)) [V] |
| 18 | Pro plan (₹299/month) | Modify | BUILD AFTER PMF | Fair price, commodity bundle; must never sell visibility or promise "unlimited" DMs | ReplyKaro Pro ₹299 [CC]; Meta Verified ₹699 in India (Meta, 7 Jun 2023) [V]; 5% of 1,000 artists ≈ ₹15,000 a month [A] |

**Disagreements between parts, and how they were resolved.**
1. **Art Shop timing.** Part 03 runs Shop-lite now; Part 06 keeps the shop out of the MVP. *Resolved:* Shop-lite is an experiment that starts after the MVP core is live; it adds little discovery and still needs a CA's tax opinion.
2. **Bookings timing.** Part 03 pilots sessions now; Part 06 lists bookings as "out". *Resolved:* an experiment outside the MVP core, starting with paid portfolio reviews that double as Show & Review's paid pro queue.
3. **Escrow in Hire Artists and Gigs.** Part 06's MVP table includes aggregator escrow; Part 04, and Part 06's own pilot test, say run by hand first, with payments off-platform at ~1,000 artists. *Resolved:* hand-run pilot without escrow; add escrow through an RBI-authorised payment aggregator once posters return.
4. **Free downloads.** Part 03 says build early; Part 06 lists "email/WhatsApp capture" on the link page. *Resolved:* the same block.
5. **Artist Boards' uniqueness.** Part 04: "somewhat common globally; rare for artists in India". Part 05: 0 of 15 platforms. Both hold: no platform runs it. Off-platform versions exist in India, such as the "Scam Alert" flair on r/pune.
6. **Conflicting Indian numbers.** Both values are kept, with their sources:

| Topic | Value A | Value B |
|---|---|---|
| Influencer-marketing spend, 2024 | ₹2,344 crore (EY estimate, April 2024) | ₹3,600 crore (Goat/Kantar via WPP Media, 10 Jun 2025). Kofluence gives ₹3,000–3,500 crore for 2025 [CC] |
| Number of Indian creators | 2–2.5 million with over 1,000 followers (BCG via PIB, 2 May 2025) | 4.0–4.4 million (Kofluence 2026) [CC]; 40.6 lakh in 2024 ([Goat/Kantar via MediaBrief, 24 Jun 2025](https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/)); "over 8 million" ([Outlook Business citing Mint](https://www.outlookbusiness.com/ampstories/news/india-loses-2-lakh-creators-amid-burnout-low-payheres-what-you-need-to-know); original not opened) |
| StarClinch artists | 17,000+ (its "our story" page as recorded on 1 Oct 2026) [CC] | "10K+" ([same page](https://starclinch.com/our-story) on 2 Oct 2026) [CC]; 15,000+ in Dec 2021 (Siliconindia) |
| Live-events market | ₹10,100 crore in 2024 and ₹14,500 crore in 2025, organised segment (FICCI-EY, March 2026) | ₹13,000 crore ([BookMyShow–EY-Parthenon, 12 Mar 2026](https://www.ey.com/en_in/newsroom/2026/03/india-s-13-000-crore-live-events-market-fuels-shift-to-experiential-marketing-bookmyshow-ey-parthenon-report)); the two use different scopes |
| FrontRow money raised | about $18M (TechCrunch, 10 Jul 2023) | $17.2M (Entrackr, 14 Jun 2023); $20.29M ([Inc42 Datalabs](https://inc42.com/company/frontrow/)) |
| Koo money raised | $65M ([Moneycontrol, 2024](https://www.moneycontrol.com/news/technology/future-salaries-can-only-be-paid-out-once-koo-finds-a-buyer-co-founder-mayank-bidawatka-12708326.html)) | $63.99M ([Inc42 Datalabs](https://inc42.com/company/koo/)) |
| Cash-on-delivery returns | about 26% for COD vs under 2% for prepaid ([Shipway via MediaBrief, 2025](https://mediabrief.com/shipnotes-reveals-26-rto-rate-on-cod-orders-across-india/)) | 25–30% for COD vs 2–3% for prepaid ([Razorpay blog](https://razorpay.com/blog/cash-on-delivery/)); other sources in Part 03 give up to 35% and up to 8% |

## What should change in the plan

**Keep:** the Instagram connection (as import, curate and tag, and proof of ownership); the link page as the main sharing surface; Hire Artists and Gigs, the plan's one real discovery lever; Show & Review and Artist Boards, the least-served spaces; UPI-first payments with web checkout (avoiding Apple and Google billing).

**Change**
- **Show & Review:** from "fans pay artists ₹99" to artist-to-artist critique with "give 3, get 1" credits plus a curator queue. Drop "paid members reviewed first".
- **Insights:** from a dashboard to a reach-normalised **verified credibility card**; hide follower counts in brand search by default.
- **Artist Boards:** Rate Check and scam-pattern alerts now; brand reviews only from completed Underdawg jobs, after PMF.
- **Live Rooms:** from fan classes with a blanket free tier to scheduled critique and showcase rooms on third-party video.
- **Art Shop:** Shop-lite first (prepaid, money into the artist's own payment-aggregator account, digital certificate of authenticity); no cash on delivery for originals; drop the planned visible 20% cut of print-on-demand margins.
- **Pro:** sell tools, audience intelligence and fee waivers; never ranking, featured placement or contact access; no "unlimited DMs"; core stats free; price-test ₹149–₹299.
- **Hiring fees:** the brand or poster pays; the artist pays 0%.
- **UPI costs:** plan for the new merchant fee. From 15 October 2026, merchant UPI payments above ₹2,000 carry 0.4%, capped at ₹300. Person-to-person transfers, payments up to ₹2,000, and small merchants receiving up to ₹1 lakh a month by QR stay free ([The Indian Eye, 18 Sep 2026](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/); [MediaNama, Sep 2026](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/)) [2nd]. Paying the artist directly is cheaper than collecting centrally [INF].

**Combine:** Hire Artists + Gigs → one **Opportunities** marketplace with two doors ("hire this artist / send a brief" and "post a gig / open call"); templates → link page (free) and Pro (premium); tips → a zero-fee Support block; event listings → an "Upcoming" block that links out; the Boards' Feedback board → Show & Review.

**Add** (Part 06): **M1** first-audience queue; **M2** newcomer bonus, caps and rotation; **M3** curator review queue without artist pay-per-pitch; **M4** India-first opportunity board; **M5** opportunity-giver search ranked by fit; **M9** light human-made evidence; **M15** published no-pay-for-reach policy; **M16** portable portfolio and owned contacts.

**Drop:** Fan Club; the "unlimited DMs" promise; scheduling and DM automation from the MVP; the template marketplace; in-house ticketing for large gigs; any paid visibility.

## 13. Feature prioritisation

Words, not scores. Each cell names its main evidence, Indian where it exists; sources are in section 24 below and in the parts. "x / y of 15" = full / partial offers in Part 05's 15-platform matrix.

| Feature | Artist Need | Discovery Impact | Artist Value | Differentiation | Retention | Network Effect | Virality | Monetisation Potential | Complexity | Competitive Saturation |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 Instagram profile | Moderate — convenience; no Indian survey | Enabler only — supplies inventory | Meaningful if curated; follower counts vanity | Low as mirror; rare as artist combo — Kofluence and Hobo.Video show no synced public portfolio | Low — passive after onboarding | Only via cross-artist search (~10K artists) | Low | None direct | Medium — App Review, 60-day tokens | Common — 2 / 2 of 15 |
| 2 Verified card | High for brand pitchers; 50.4% of Indian creators cite too few brand collaborations [CC] | Positive if reach-normalised — Indian nano ~4% engagement vs macro ~1.5% (EY) | Credibility, pricing | Rare — no artist version found | Medium — weekly digest | Mild — peer benchmarks | Medium — card sent to brands | Medium; core must stay free | Medium — 3 Meta metric changes since Oct 2024 | Dashboards very common; 4 / 6 of 15; Kofluence and Qoruz sell fraud checks to brands |
| 3 Scheduling | Low–moderate; no Indian survey | None | Time saved only | None | Weak — free native rivals | None | None | Low | Medium–high — own queue; 100 posts/24h | Very common — free in Instagram and Meta Business Suite |
| 4 Link page | High for artists who sell or get booked | Low direct; brand view indirect | Paid, hired, owned contacts | Low generic; rare artist combo with UPI | Medium — inquiry alerts | Weak | High — main sharing surface | Medium | Low–medium — payments compliance | Very common — Linktree ~7.3M Indian visits a month; Topmate, Instamojo, SuperProfile |
| 5 Templates | Low — no Indian demand data | Small — designer credits | Cosmetic | Marketplace: none found | Low | Only at ~100K page owners [A] | Low | Low | Medium — payouts, plagiarism | Templates very common |
| 6 DM automation | Low for emerging artists — small accounts get few comments; no Indian usage data | None to negative | Real only with comment volume | None | Medium for sellers | None | None | Low — Indian DM tools cost ₹99–₹999/month, some free | High — App Review, 750/hour | Very common in India |
| 7 Art Shop | Medium–high with "price?" DMs; low without audience | Low; medium with fair buyer pages | Sales, verified sales record | Emerging in India (DM checkout) | Medium for sellers | Weak | Medium–high — shop links | High — most direct revenue | High — GST, RBI, COD returns | Very common — 6 / 4 of 15; Artflute, Mojarto, MeMeraki, Blinkstore, Qikink |
| 8 Live Rooms | Medium for teachers (Artium: 45,000+ learners [CC]); low otherwise | Low as written | Income for teachers | Low | Calendar-driven, hosts only | Weak | Medium | Medium | High — ~$5.40 per free room; Apple rules | Very common — 5 / 2 of 15 |
| 9 Fan Club | Low for core segment | Very low | Only with existing fans | None | Content treadmill | Inside each club only | Low | Popular artists only — about 8% of Indian music streamers pay | High — forum, payments, moderation | Very common — 4 / 4 of 15; free WhatsApp and Telegram groups |
| 10 Show & Review | High — 73% of Indian music creators say they have much to learn about production (EY); comedians pay for open-mic slots | High if picks feed exposure | Skill, credibility, curator access | Rare — 0 / 2 of 15; none found in India | High — weekly revision loop | High — artists review artists | Medium — before/after cards | Medium — paid pro queue | Medium — reviewer quality | Common in music outside India only |
| 11 Artist Boards | High per incident — casting scams take ₹1,000–75,000 per victim; no Indian rate guide | Low | Avoid scams; price confidence | High — 0 / 0 of 15; no Indian company offers it | Medium — spikes with offers | Data effect — rate benchmarks | Medium–high — shareable alerts | Low direct; lifts Opportunities | Medium + legal (BNS §356) | Rare on platforms |
| 12 Tips | Low–moderate | None | Small income | None | Weak | Weak | Low | None at 0% fee | Low (simple mode) | Very common — 6 / 0 of 15; a personal UPI QR is free |
| 13 Downloads | Moderate for asset makers | Possible via asset directory | Owned email list | Low | Medium — download alerts | Weak–moderate — artists buy assets | Medium — promoted freebies | Low–medium | Low (free); medium (paid) | Very common — 7 / 3 of 15 |
| 14 Bookings / 1:1 | Moderate–high for teachers — Indian indie musicians rely on teaching and session work | Good for skill discovery with fair directory | Paid work, feedback | Moderate — no Indian art/music 1:1 marketplace found | High for teachers | High potential, artist-to-artist | Medium | Medium–high — ~39% of Topmate earnings [CC] | Medium — no-shows, minors | Very common — 2 / 5 of 15 |
| 15 Event tickets | High to fill rooms; moderate to ticket | Strong local, only with density | Audience, local credibility | Low | Event-driven | Local; needs density | High — event pages shared | Low–medium | High for in-house ticketing | Very common — 0 / 7 of 15; BookMyShow, District, Skillbox |
| 16 Hire Artists | High — 50.4% of Indian creators cite too few brand collaborations [CC] | Positive if fit-ranked; follower filters add bias | Paid work, protection | Low (StarClinch, Kofluence, Instagram's marketplace); moderate as artist taxonomy | Only if briefs arrive | Cross-side | Low | High — brand fee | High — RBI, GST TCS, disputes | Very common — 6 / 5 of 15 |
| 17 Gigs | High — club gigs pay a "token fee"; fees "delayed, only partially paid, or not paid at all" | High for unknowns if fair | Paid gigs, local reputation | Rare in India across crafts | High if liquidity | Local cross-side | Medium–high — WhatsApp | Medium–high — poster fee | High | Common — 6 / 1 of 15 |
| 18 Pro plan | Low — willingness to pay unknown in India | Neutral; harmful if it sells reach | Time saved, audience intelligence | Low — but no flat-fee artist plan in India | Lock-in only | None | Negative if badge removed | Low until ~100K artists | Low–medium — web billing | Very common — 8 / 0 of 15 |

### BUILD EARLY
- **1 Instagram profile (modified):** cheapest inventory; Indian creators are Instagram-first.
- **2 Verified credibility card:** Indian brands fear fake followers; reach-normalised engagement favours small accounts.
- **4 Link page (narrow):** main sharing surface; global rivals' earning tools skip India and UPI.
- **10 Show & Review (rebuilt):** best-validated need and the seed of the first-audience queue.
- **11 Artist Boards (narrow):** scams and missing rate cards are documented in India; no Indian platform serves them.
- Plus missing mechanisms M1, M2, M3, M5, M9 (light), M15, M16.

### BUILD AFTER PRODUCT-MARKET VALIDATION
- **7 Art Shop with held payments:** needs CA sign-off and an RBI-authorised aggregator.
- **8 Live Rooms as critique rooms:** narrow demand; costly video.
- **13 Paid downloads** and **14 full bookings:** commodities until payments are proven.
- **18 Pro plan:** negligible revenue at small scale; price-test first.

### EXPERIMENT
- **16 + 17 Opportunities pilot:** hand-run in one city and 3–5 crafts; the core test of the business.
- **7 Shop-lite:** prepaid, no money held, 0% fee; measure the share of shop-enabled artists with a sale within 90 days.
- **14 Paid portfolio reviews and music lessons:** strongest income evidence among money tools.
- **2 Price suggestions:** labelled ranges until Underdawg has its own deal data.
- **12 DM tipping; 13 asset directory:** cheap tests once the core works.

### MODIFY
- **1, 2, 4, 7, 8, 10, 11, 13, 18:** each solves a real problem, but the planned version mirrors a commodity, favours big accounts, carries legal risk, or sells visibility. See "What should change".

### COMBINE
- **5 → 4 and 18; 12 → 4; 15 listings → profile and 4; 16 + 17 → Opportunities** (same verification, contracts, payments and ratings; splitting scarce demand would halve liquidity); **11's Feedback board → 10.**

### DEPRIORITISE
- **3 Scheduling:** free natively; no discovery value.
- **6 DM automation:** crowded, cheap or free in India, Meta-capped, favours big accounts.
- **5 Template marketplace:** needs very large scale; no demand evidence.
- **15 In-house ticketing:** strong Indian incumbents; refund and tax work.
- **2 "Best time to post":** Instagram shows it; the API withholds the data under 100 followers.

### REJECT
- **9 Fan Club:** needs fans unknown artists lack; a fan feed contradicts the no-feed design.
- Also reject three planned *elements*: "paid members reviewed first", "unlimited DMs", and any paid ranking or featured placement.

## 24. Final strategic output

### B. Biggest artist problems

Ranked as in Part 01, by how many artists are affected, how much harm is done, and how strong the evidence is. The strength label covers all evidence; a note says how strong the Indian evidence is. For **under-discovered** artists, three hurt most: discovery gated by scale, scams, and weak access to paid work [INF].

1. **Low, unstable income — Strong.** *Indian evidence: strong for musicians, missing for other crafts.* Only 8–10% of India's creators "monetize effectively" (BCG via PIB, 2 May 2025). 88% of creators get less than three-quarters of their income from social media (Kofluence 2026; Storyboard18, 14 May 2026) [CC]. 69% of IPRS-paid authors and composers received under ₹25,000 a year, and only 60% of music creators work at it full-time (EY, December 2023). Live performance is musicians' top-ranked income source (139 of 500 surveyed; EY, December 2023). Bollywood background dancers earned ₹4,000–4,500 for a day of song shooting in 2020 ([The Tribune, 20 May 2020](https://www.tribuneindia.com/news/entertainment/as-music-fades-bollywoods-background-dancers-look-for-help-to-survive-87450/)). No Indian income data was found for visual artists, illustrators or photographers. The limit is demand, not payout tools [INF].
2. **Discovery gated by algorithms that favour scale — Strong.** *Indian evidence: moderate.* The number of Indian influencers grew from 9.6 lakh in 2020 to 40.6 lakh in 2024 (Goat/Kantar via MediaBrief, 24 Jun 2025), so more creators compete for each viewer. On YouTube, "90% of subscriptions" come "from under 5% of channels" (attributed to Citi by [Kotak Mutual Fund, 27 Nov 2025](https://www.kotakmf.com/Information/blogs/inside-india-creator-economy); original not opened) [2nd]. YouTube launched Hype in India in July 2025 for channels with 500 to 500,000 subscribers ([Business Today, 17 Jul 2025](https://www.businesstoday.in/technology/news/story/small-content-creators-just-got-a-big-boost-with-youtubes-hype-485045-2025-07-17)), which shows the platform itself sees the problem. No Indian data on reach per post by follower tier was found.
3. **AI: training without consent, mimicry, flooding — Strong.** *Indian evidence: strong on policy, anecdotal on harm.* A government committee has proposed "a mandatory blanket license" letting AI firms train on all lawfully accessed Indian works; "the rights holders will not have the option to withhold their works" ([DPIIT Working Paper, December 2025](https://www.dpiit.gov.in/static/uploads/2025/12/ff266bbeed10c48e3479c941484f3525.pdf)) [V]. Indian music labels have sought to join a Delhi High Court case against OpenAI ([Business Today, 14 Feb 2025](https://www.businesstoday.in/technology/artificial-intelligence/story/why-t-series-saregama-sony-want-to-join-a-copyright-lawsuit-against-openai-in-india-464747-2025-02-14)). Users in India could not object to Meta's AI training in 2024; only EU users could ([Social Media Today, 9 Jun 2024](https://www.socialmediatoday.com/news/meta-posts-for-ai-training-cannot-opt-out/718410/)). An Indian jingle writer says clients used AI as leverage to cut fees ([The Established, 21 Apr 2025](https://www.theestablished.com/culture/living/who-can-really-claim-to-be-an-artist-when-the-medium-is-a-machine)). No Indian survey gives the share of artists who lost work to AI.
4. **Platform dependency — Strong (documented events).** *Indian evidence: strong.* India banned TikTok on 29 June 2020. Its Indian replacements shrank: Josh fell from 20 million to 9.4 million monthly users in a year (Inc42 citing data.ai, 24 Jul 2024); Moj's daily users fell from 9.24 million (Jan 2021) to 2.16 million (Jan 2023) (Apptopia figures in [MediaNews4U, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/)). Koo shut on 3 July 2024 ([Business Today, 3 Jul 2024](https://www.businesstoday.in/technology/news/story/little-yellow-bird-says-final-goodbye-indias-twitter-rival-koo-shuts-down-435555-2024-07-03)). Meta ended the Basic Display API on 4 Dec 2024. A creator in Jabalpur lost ₹50 lakh to fraudsters who filed fake copyright strikes against his Instagram pages ([The Tribune, 23 Oct 2025](https://www.tribuneindia.com/news/trending/pay-rs-50-lakh-or-lose-instagram-page-in-a-first-influencer-with-57-million-followers-falls-victim-to-fake-copyright-scam)).
5. **Pay-to-play visibility — Moderate to strong.** *Indian evidence: moderate, mostly examples.* BandLab sells Boost at ₹299–₹999 in India (App Store India, 1 Oct 2026). Indian comedians pay ₹200–500 per open-mic slot (BuddyOnStage, 2026) [2nd]. Mojarto asks artists to "pay the nominal registration fee" before curators decide ([Mojarto seller FAQ, 2 Oct 2026](https://www.mojarto.com/sellerFaq)). Opening acts perform for little or nothing "in the promise of exposure" ([Rolling Stone India, 12 Sep 2025](https://rollingstoneindia.com/what-the-music-industry-doesnt-talk-about-enough-minimum-wage-for-musicians)).
6. **Non-payment and scams — Moderate (official data, case reports).** *Indian evidence: documented, not measured for artists.* Brand payment cycles run 90 days and up to a year; creators now ask for a 25–50% advance (Storyboard18, 28 Jul 2025; anonymous sources). Musicians report fees "delayed, only partially paid, or not paid at all" (The Indian Music Diaries, 4 Mar 2026). The government's delayed-payment portal has taken 2,56,892 applications ([SMEStreet, 29 Jul 2026](https://smestreet.in/smestreet-exclusive/msme-development-amendment-bill-2026-delayed-payments-analysis-12208060)), but it is open only to Udyam-registered enterprises ([My Legal Pal](https://mylegalpal.com/articles/how-to-recover-payments-from-clients-in-india-msme-odr/)), and only 15.2% of creators are registered (Kofluence 2026) [CC]. Work-from-home and part-time job scams were India's most-reported cybercrime in 2023 ([I4C via Global Kashmir, 4 Jan 2024](https://globalkashmir.net/work-from-home-or-part-time-job-scams-top-cyber-crimes-in-india-says-i4c/)). A fake casting agent in Delhi cheated at least 17 aspiring artistes ([The Tribune, 14 May 2025](https://www.tribuneindia.com/news/delhi/cyber-fraudster-arrested-for-cheating-aspiring-artistes)). Only 55,484 FIRs were filed against 28.15 lakh cybercrime cases in 2025 (The420.in, 21 Feb 2026), so small victims rarely get police action. (Part 01 ranks these 6th and 7th separately.)
7. **Weak access to good paid work — Moderate.** *Indian evidence: moderate, survey-based.* 50.4% of creators cite too few brand collaborations [CC]; 83% of marketers struggle to find creators; 62% of surveyed creators did not know brands had tried to reach them [CC]. 70% of surveyed Indian brands plan to raise creator budgets 1.5–3x (BCG via Storyboard18, 4 May 2025) [2nd]. Yet brands "give smaller creators barter collaborations" (The Nod Mag, 7 Aug 2026). India has no illustration agencies and no India-specific rate guide ([Aparajitha Vaasudev, 19 Aug 2026](https://studioapara.substack.com/p/india-has-no-illustration-agents); essay). This looks like broken matching and trust, not missing demand [INF].

**What India still lacks data on.** No source counts independent artists separately from lifestyle influencers. No Indian income survey covers visual artists, illustrators, dancers or photographers. No survey measures how many Indian artists are paid late or scammed, or what share of brand money reaches small creators. Bots aimed at artists, "generic audiences", missing collaboration tools and lack of community were **not verified** as common complaints.

**Outside India (background only).** Globally, the top 10% of creators got 62% of brand payments in 2025, up from 53% in 2023 ([Business Insider/CreatorIQ, 14 Jan 2026](https://www.businessinsider.com/creator-income-inequality-grows-top-earners-paydays-rise-2026-1)) [2nd]. Fully AI tracks passed 50% of Deezer's daily uploads in June 2026 ([Deezer, 21 Jul 2026](https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/)). No Indian figure exists for either point.

### C. Biggest competitor weaknesses

Incumbents do fix problems under pressure. The weaknesses that last are tied to business models [INF]. Indian competitors and the Indian arms of global platforms come first.

- **Instagram in India:** has said big accounts got more reach (Engadget, 30 Apr 2024); gives Indian users no AI-training opt-out; does not vet commercial offers; its Subscriptions do not list India ([TechCrunch, 24 Jul 2023](https://techcrunch.com/2023/07/24/instagram-launching-creator-subscriptions-australia-canada-uk-and-more/)). Its creator marketplace is open to India by invitation, but no data shows how many Indian creators or brands use it. Its strength: it copies fast and owns the API.
- **YouTube in India:** its answer to under-discovery is a leaderboard (Hype), not paid work. YouTube's revenue to Indian music fell 8% in 2025 "as the platform prioritized YouTube Shorts" (FICCI-EY, March 2026).
- **StarClinch:** takes 15% of the artist's fee, charges a ₹7.5 lakh penalty for direct deals, and "does not guarantee you any work" (StarClinch terms, 2 Oct 2026) [V]. FY25 revenue was about ₹2.4 crore, down 10.2% (Inc42 Datalabs, indicative). It does not publish how many listed artists get booked.
- **Brand-side platforms (Kofluence, Qoruz, Talentrack, WYLD, Hobo.Video):** built for brands, not artists. Rosters far exceed paid work: Kofluence lists 750,000+ influencers ([Kofluence](https://www.kofluence.com)) [CC], but estimates only 450,000–600,000 creators monetise anywhere in India ([IBTimes India, 8 Jul 2025](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [CC]. Their fees are not published.
- **Indian money tools (Topmate, TagMango, Exly, Graphy, SuperProfile/Cosmofeed):** built for coaches; no artist discovery. Topmate takes 10–20%; [TagMango](https://tagmango.com/pricing) Pro costs ₹5,000 a month plus 5.5%; [Graphy](https://graphy.com/pricing) costs ₹24,999 a year plus 10%. App Store India reviews of Cosmofeed allege withdrawal problems ([App Store India](https://apps.apple.com/in/app/id1592830857); single reviews).
- **Indian DM tools (ReplyKaro, Zorcha, InstantDM):** cheap or free, so no moat for anyone. Their claimed users (60K+, 30,000+, 10,000+) are small against 3.3–3.7 million Indian Instagram creators [CC].
- **Indian art marketplaces:** Artflute takes 40%, the artist pays domestic shipping, and payment comes within 15 working days of delivery (Artflute FAQ). Mojarto pays within 21 working days of the buyer's confirmation (Mojarto seller FAQ). Etsy lets Indian sellers make international sales only ([ShipGlobal](https://shipglobal.in/blogs/etsy-new-sellers/)) [2nd].
- **Indian ticketing (BookMyShow, District):** focused on large tours and listed events; organiser fees are not public.
- **Indian music streaming:** only 14.4 million of about 178 million streamers pay; "reduced per-stream rates and higher minimum stream count thresholds reduced revenues for some creators" in 2025 (FICCI-EY, March 2026). JioSaavn shut its in-house indie label in 2022 ([Music Ally, 13 Aug 2025](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/)).
- **Global toolkits in India:** Linktree's downloads, bookings and Brand Deals are not available in India, and it went dark across India for days in August 2025. Behance pays Indian users through PayPal. BandLab sells paid reach in India (Boost, ₹299–₹999).

**Outside India (background only).** Two lessons India has not yet tested. Dribbble gated contact between designers and clients from 17 Mar 2025 and banned "dozens" of designers ([TechCrunch, 4 Aug 2025](https://techcrunch.com/2025/08/04/a-top-designer-was-banned-from-dribbble-now-hes-building-his-own-competitor)): contact gating breeds revolt. Cara has trust but no buyers and no artist earnings, and scrapers still took 12M images ([Cara blog, 27 Aug 2026](https://blog.cara.app/blog/scraping-legal-fund-faq)): an artists-only promise is not enough.

### D. Best market opportunities

Ordered by strength of evidence that the gap is real. All are hypotheses until the pilot tests them.

1. **Fair discovery by the people who create opportunities.** In India both sides report the gap: creators cannot find deals, marketers cannot find creators, and brands' messages do not reach creators (Kofluence 2026; Goat/Kantar 2025; HashFame 2025). Nobody's core promise is to fix it (Part 06). *Real but unproven* — needs a demand side.
2. **A trust-and-transaction layer for small paid work in India:** verified posters, budgets shown, contracts, aggregator escrow, GST-ready invoices. Indian creators already demand 25–50% advances (Storyboard18, 28 Jul 2025), and 85% of creators lack the registration that the legal late-payment remedy requires [CC]. *Partial gap* — escrow alone is not a gap (StarClinch has it), but no cross-discipline, India-local, fit-ranked version was found.
3. **Curator access without pay-per-pitch, in India and outside music.** No data on Indian curator marketplaces or playlist curators was found. Indian curator supply is untested.
4. **An India-first, fee-transparent opportunity board.** ArtConnect's India filter showed listings in the US, France and Iceland ([ArtConnect, 1 Oct 2026](https://www.artconnect.com/opportunities?country=IN)) [V]. Indian artists find work through Instagram, WhatsApp and Facebook groups, agencies and a few booking sites (StarClinch blog, 16 Dec 2025) [CC]. *Plausible, unproven.*
5. **Rate and scam data for Indian artists.** 0 of 15 platforms. Published Indian anchors are few: ₹500–5,000 per Reel under 10K followers in 2025 and ₹1,000–12,000 in 2026 ([Kofluence blog, 22 Jul 2026](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/)) [CC]. Over 60% of brands say the lack of pricing standards is a major challenge (Kofluence 2025, quoted in MediaNews4U, 4 Apr 2026) [CC].
6. **Bookers finding unknown local acts.** Indian event companies name "unorganized competition, talent scarcity and a trust deficit" as their key challenges (FICCI-EY, March 2026) [V]. *Plausible, untested.*
7. **Human-made evidence and consent-first AI policy.** India's 2026 IT Rules require "a clear and noticeable label" on AI-generated visual content ([SCC Online, 12 Feb 2026](https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/)). If the DPIIT proposal becomes law, artists cannot keep work out of AI training, so a dated record of authorship gains practical value [INF]. *A window, not a moat.*
8. **A "no pay-for-reach" position.** No checked competitor brands itself this way; it limits how Pro can earn.

**No clear gap:** link-in-bio, portfolio hosting, DM automation, fan money tools, fan music discovery. Spotify logged **12.8 billion "discoveries" of unfamiliar Indian artists in 2025** ([Spotify, 2 Sep 2026](https://newsroom.spotify.com/2026-09-02/india-loud-and-clear-report/)); fan discovery already works.

### E. Feature recommendations

In each feature, Indian evidence and Indian competitors come first. "Outside India" marks background from other countries.

**Feature 1 — Instagram-connected profile** *(Part 02)*
- **Artist problem:** a new platform starts empty; artists must re-upload work.
- **Evidence problem exists:** indirect. Instagram is the main platform for 3.3–3.7M of 4.0–4.4M Indian creators [CC] and reaches 481M people in India. Indian brand marketplaces (Kofluence, Hobo.Video) show no Instagram-synced public portfolio on their homepages [V]. Direct evidence from Indian artists that re-uploading is a pain: none found.
- **Competitors offering it:** in India, Instagram's own grid and creator marketplace, and Pixpa portfolio sites (₹200–₹600 a month billed yearly, [Pixpa](https://www.pixpa.com/pricing)). Outside India: Linktree, Later, Beacons, feed widgets.
- **How competitors implement it:** grid mirroring; media kits from connected accounts; Meta shows brands first-party data.
- **Artist benefit:** a portfolio with no extra work; proof of ownership.
- **Discovery impact:** none alone; supplies what search ranks. Ranking by followers would import Instagram's bias.
- **Uniqueness:** common component; rare artists-only combination.
- **Weaknesses:** professional accounts only (the share of Indian artists on personal accounts is unknown); 60-day tokens; App Review; at least 4 App Store India reviews on 29 Sep 2026 describe Instagram accounts disabled by mistake ([App Store India](https://apps.apple.com/in/app/id389801252)).
- **Recommended implementation:** import, curate, tag (discipline, medium, style, city); accept non-Instagram work; lead with work; cache and export.
- **Priority:** BUILD EARLY. **Verdict:** Modify.

**Feature 2 — Instagram insights and verified engagement rate** *(Part 02)*
- **Artist problem:** artists pitching brands must prove real reach and know what to charge.
- **Evidence problem exists:** 74% of surveyed Indian brands name fake followers as a concern (BCG via Storyboard18, 4 May 2025) [2nd]. A Mumbai fashion founder could not find typical creator rates ([r/mumbai, 23 Sep 2024](https://web.archive.org/web/20250710022556/https://www.reddit.com/r/mumbai/comments/1fndnzi/what_are_the_typical_fees_for_paying_influencers/)). But 50.4% of creators say they get too few brand collaborations [CC], so many artists have no deal to price.
- **Competitors offering it:** in India, Instagram Insights, Instagram's creator marketplace, YouTube Creator Partnerships, Kofluence ("fraud protection") and Qoruz ("Creator Authority Score"). Outside India: HypeAuditor, Modash ($199/month).
- **How competitors implement it:** brand-side databases on public data; Meta's first-party data inside Instagram.
- **Artist benefit:** credibility, pricing confidence, learning what resonates.
- **Discovery impact:** positive if reach-normalised. Indian nano creators average about 4% engagement against about 1.5% for macro (EY, April 2024, p.9). Kofluence gives 5–10% for nano and 0.5–1.5% for mega [CC], and 4.5–5.5% in Tier 3–4 cities against 3–4% in metros (MediaNews4U, 15 May 2026) [CC].
- **Uniqueness:** a reach-normalised, owner-verified artist card — rare (none found).
- **Weaknesses:** tiny samples; three Meta metric changes since Oct 2024; no follower data under 100 followers; rupee rates for one tier vary up to 40 times in a single source (micro: ₹2,000–80,000 per Reel) [CC].
- **Recommended implementation:** card with ranges and sample size; private benchmarks; no leaderboards.
- **Priority:** BUILD EARLY (card); price EXPERIMENT; best time DEPRIORITISE. **Verdict:** Modify.

**Feature 3 — Schedule posts to Instagram** *(Part 02)*
- **Artist problem:** time and posting consistency.
- **Evidence problem exists:** weak. No India-specific survey on scheduling was found. Native tools dominate in India: Meta Business Suite has 40,285 Indian iOS ratings against Buffer's 949 [V].
- **Competitors offering it:** Instagram's native scheduler and Meta Business Suite (both free in India); India-linked tools such as SocialPilot, Zoho Social and Predis.ai; Later, Buffer, Planoly.
- **How competitors implement it:** native scheduling; third-party queues with free tiers.
- **Artist benefit:** time saved only.
- **Discovery impact:** none; Instagram's head said scheduling "will not affect your reach" [2nd].
- **Uniqueness:** very common.
- **Weaknesses:** 100 API posts per 24 hours; JPEG only; own job queue; App Review.
- **Recommended implementation:** not in MVP; deep-link to Instagram's scheduler; revisit only for brand-deal posts.
- **Priority:** DEPRIORITISE. **Verdict:** Deprioritise.

**Feature 4 — Link-in-bio page** *(Part 02)*
- **Artist problem:** Instagram allows 5 bio links (since 18 Apr 2023); artists need one place to be paid, booked and hired.
- **Evidence problem exists:** Linktree had about 7.3M Indian visits in July 2025, its fifth-largest market [2nd], yet its earning features exclude India [V]. Global tools show Stripe or PayPal, not UPI; Stripe India is invite-only since June 2024; PayPal India charges 4.40% + $0.30. UPI handled 24,162 crore transactions worth ₹314 lakh crore in FY2025–26 ([Lok Sabha reply via IANS, 20 Jul 2026](https://english.punjabkesari.com/business/nearly-555-crore-users-onboarded-on-upi-by-june-fy26-transactions-cross-24161-crore-centre)) [2nd].
- **Competitors offering it:** in India, Topmate (10–20% commission), Instamojo (UPI on all plans; 5% or 2% + ₹3), Razorpay Payment Pages, SuperProfile, and Linktree India (₹360, ₹650 or ₹1,450 a month). Outside India: Beacons, Stan, Komi, Feature.fm.
- **How competitors implement it:** hosted block pages; commission on low tiers or flat subscriptions.
- **Artist benefit:** getting paid and hired; owned fan contacts.
- **Discovery impact:** low direct (visitors already follow the artist); indirect via brand view and footer.
- **Uniqueness:** very common; fan/brand views plus UPI plus verified stats — rare.
- **Weaknesses:** rivals' support, payout and lock-in complaints; Linktree's Indian outage shows domain risk.
- **Recommended implementation:** MVP blocks only (links, grid, card, hire/book form, UPI support, email capture, free download); export; no lock-in.
- **Priority:** BUILD EARLY (narrow). **Verdict:** Modify.

**Feature 5 — Page templates and template marketplace** *(Part 02)*
- **Artist problem:** an on-brand page without design skills.
- **Evidence problem exists:** none for paying; no Indian demand data and no "pages look the same" complaints found. Templates are already bundled in India: Linktree charges ₹650 a month for custom themes, and Pixpa includes "200+ premium templates" in plans from ₹200 a month billed yearly [V].
- **Competitors offering it:** in India, Linktree (custom themes in Pro, ₹650), Pixpa, and Instagram's free templates. Outside India: Carrd ($9/year), Notion Marketplace (direct payouts appear unavailable in India), Framer.
- **How competitors implement it:** first-party templates, premium in paid tiers; marketplaces only at large scale (Framer "$6.5M" paid in 2025) [CC].
- **Artist benefit:** cosmetic; income for designer-artists.
- **Discovery impact:** small (designer credits).
- **Uniqueness:** link-in-bio template marketplaces found: zero.
- **Weaknesses:** needs ~100,000+ page owners [A]; plagiarism; Indian payouts (KYC, GST, TDS).
- **Recommended implementation:** free templates in #4; premium in Pro; later test "designed by" credits.
- **Priority:** COMBINE; marketplace DEPRIORITISE. **Verdict:** Combine.

**Feature 6 — Instagram DM automation** *(Part 02)*
- **Artist problem:** sending links and files to many commenters; capturing leads.
- **Evidence problem exists:** real behaviour among Indian sellers — Zorcha claims 60K+ creators; InstantDM 30,000+ ([InstantDM](https://instantdm.com/pricing)); ReplyKaro's page shows both "10,000+" and "7,576+" [all CC]. These counts are under 5% of India's 3.3–3.7 million Instagram creators [INF]. No reliable data shows how many Indian creators use comment-to-DM. Outside India, 1–5K accounts average about 3 comments per Reel (Socialinsider 2026), so small accounts have little to automate.
- **Competitors offering it:** in India, Zorcha (free unlimited DMs), ReplyKaro (from ₹99), InstantDM ($9.99), Topmate's Auto DM, SuperProfile's AutoDM, and Meta's own keyword tools. Outside India: ManyChat, LinkDM, Inro, Laylo.
- **How competitors implement it:** comment keyword → private-reply DM; follow checks after a tap; pacing.
- **Artist benefit:** real only with comment volume.
- **Discovery impact:** none to negative; cannot reach new people; favours big accounts.
- **Uniqueness:** very common in India.
- **Weaknesses:** 750 replies/hour; one reply per comment within 7 days; Meta testing "Reply to Keywords" (Aug 2026).
- **Recommended implementation:** not in MVP; never "unlimited"; later, partner or build narrow artist flows.
- **Priority:** DEPRIORITISE. **Verdict:** Deprioritise.

**Feature 7 — Art Shop** *(Part 03)*
- **Artist problem:** turning "price?" DMs into a trusted, low-fee sale.
- **Evidence problem exists:** India's art auctions hit ₹2,543 crore in 2025, but contemporary art was only ₹163 crore of that (Business Today, 13 Sep 2026). Indian marketplaces are costly for the artist (Artflute: 40% plus shipping). Artists sell by Instagram DM and UPI with no buyer protection [INF]. No reliable Indian data on Instagram or affordable-art sales was found. Outside India, artist-direct buying rose from 10% to 20% of collector spending, 2021–2025 (Art Basel & UBS, Mar 2026).
- **Competitors offering it:** in India, Artflute, Mojarto, MeMeraki ("7+ Cr INR paid out to our artists in the last 5 years", [MeMeraki](https://www.memeraki.com)) [CC], Qikink, Blinkstore, Printrove, Instamojo, and Etsy (international sales only). Outside India: Saatchi Art (40%), Artfinder (40–45%), Singulart.
- **How competitors implement it:** hold funds until after delivery; control shipping; curate sellers.
- **Artist benefit:** sales plus a verified sales record and certificate.
- **Discovery impact:** low.
- **Uniqueness:** very common; DM-native art checkout in India emerging.
- **Weaknesses:** held money triggers GST e-commerce rules (0.5% TCS, [ClearTax](https://cleartax.in/s/tcs-under-goods-and-services-tax)) and limits unregistered artists to buyers in their own state ([TaxGuru](https://taxguru.in/goods-and-service-tax/facility-enrolment-supply-goods-e-commerce-operators-gst-un-registered-suppliers.html)); only an RBI-authorised payment aggregator may hold funds, and its escrow "shall not be operated for 'Cash-on-Delivery' transactions" ([RBI Directions, 15 Sep 2025](https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html)); COD orders return about 26% of the time against under 2% for prepaid (Shipway, 2025).
- **Recommended implementation:** Shop-lite — prepaid into the artist's own aggregator account, 0% fee, courier pickup, digital certificate; escrow later.
- **Priority:** EXPERIMENT, then BUILD AFTER PMF. **Verdict:** Modify.

**Feature 8 — Live Rooms** *(Part 04)*
- **Artist problem:** teaching artists stitch together Calendly, Razorpay, Zoom and WhatsApp ([Topmate blog, 13 May 2026](https://topmate.io/blog/online-session-platform-solutions)) [CC].
- **Evidence problem exists:** narrow — Artium Academy claims 45,000+ learners for 1:1 music classes ([Artium](https://artiumacademy.com)) [CC] and earned ₹28.0 crore in FY25 (Inc42 Datalabs). Against: FrontRow shut in 2023; Eloelo spent ₹59 crore on ads for ₹69.5 crore FY25 revenue, then pivoted to micro-dramas; Leher's revenue fell from ₹36.4 lakh to ₹1.5 thousand in a year ([Inc42 Datalabs](https://inc42.com/company/leher/)).
- **Competitors offering it:** in India, Topmate (webinars), TagMango (live workshops), Graphy, Exly, Artium and YouTube memberships. Paid live on Instagram in India is unverified. Outside India: Patreon Live, Circle.
- **How competitors implement it:** member-only streams; ticketed webinars on external video.
- **Artist benefit:** income for teachers.
- **Discovery impact:** low; learners buy famous names (FrontRow, Unlu and Artium all led with celebrity names).
- **Uniqueness:** very common.
- **Weaknesses:** Apple in-app purchase for group live; ~$5.40 per free 30-person room [calculated]; minors, since anyone under 18 needs verifiable parental consent ([PIB on the DPDP Rules, 17 Nov 2025](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)); harassment; piracy of paid classes on Telegram ([Scroll, 31 Aug 2022](https://scroll.in/latest/1031759/delhi-high-court-directs-telegram-to-disclose-details-about-channels-violating-copyright-law)).
- **Recommended implementation:** "Sessions" with third-party video; hot-seat portfolio reviews and curator Q&As; earned free rooms; 18+.
- **Priority:** BUILD AFTER PMF. **Verdict:** Modify.

**Feature 9 — Fan Club** *(Part 04)*
- **Artist problem:** no owned, paid home for superfans.
- **Evidence problem exists:** demand sits with established acts. In India only 14.4 million of about 178 million music streamers pay. YouTube memberships start at ₹59 a month ([YouTube Help India](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN)). Rigi raised ₹100 crore for paid WhatsApp and Telegram communities, then cut 60% of staff and pivoted. Qoohoo's revenue fell 95.5% to ₹5.3 lakh in FY25 ([Inc42 Datalabs](https://inc42.com/company/qoohoo/)). No Indian data on turning followers into ₹49 or ₹199 members was found.
- **Competitors offering it:** in India, free WhatsApp and Telegram groups, TagMango, Cosmofeed, Exly, Graphy and YouTube Memberships. Not available or not listed in India: Instagram Subscriptions, Discord server subscriptions. Outside India: Patreon, Weverse, pixivFANBOX.
- **How competitors implement it:** tiers, gated chats, paid channels.
- **Artist benefit:** only with existing fans; ₹10,000 a month needs ~205 members at ₹49 [INF].
- **Discovery impact:** very low.
- **Uniqueness:** very common.
- **Weaknesses:** recurring UPI mandates need a notice 24 hours before each debit ([Razorpay docs](https://razorpay.com/docs/payments/recurring-payments/upi/)); dead clubs; moderation; minors; Apple's 30%; breaks the no-feed design.
- **Recommended implementation:** do not build; maybe "Supporters-lite" after PMF.
- **Priority:** REJECT. **Verdict:** Reject.

**Feature 10 — Show & Review** *(Part 04)*
- **Artist problem:** no credible feedback and no path from better work to being seen.
- **Evidence problem exists:** in India, 73% of 500 surveyed music creators strongly feel they have much to learn about production (EY, December 2023). Artium sells teacher feedback to 45,000+ learners [CC]. Comedians pay ₹200–500 per open-mic slot [2nd]. But no India-specific critique or curator marketplace was found, and no Indian survey tests a ₹99 critique. Outside India, artists pay at scale: SubmitHub 48.5M submissions, 1.6M users [CC]; Groover €2 per curator [CC]. No data anywhere on fans paying artists for critiques.
- **Competitors offering it:** in India, Topmate's "Priority DM" (a paid question), Artium's teacher feedback, JioSaavn's ArtistOne Finds and Instagram's Edits Film Festival for India ([Meta, 24 Aug 2026](https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/)). Outside India: Groover, SubmitHub, Musosoup, Stage 32, Critique Circle.
- **How competitors implement it:** pay per pitch with guaranteed reply or refund; peer credits; jury contests.
- **Artist benefit:** skill, credibility, curator exposure.
- **Discovery impact:** high if picks feed fair exposure.
- **Uniqueness:** cross-discipline artist and curator critique — rare; none found in India.
- **Weaknesses:** generic reviews; payola risk; minors; cover-song licensing; untested Indian curator supply.
- **Recommended implementation:** goal-based posts; rubric; "give 3, get 1" credits; before/after cards; paid pro queue as experiment.
- **Priority:** BUILD EARLY. **Verdict:** Modify.

**Feature 11 — Artist Boards** *(Part 04)*
- **Artist problem:** scams, non-payment and price uncertainty, with help scattered.
- **Evidence problem exists:** Indian cyber-fraud losses were about ₹22,500 crore in each of 2024 and 2025. Fake casting agents charged ₹20,000 for a portfolio and ₹75,000 for a "selection shoot" (The Tribune, 14 Jan 2024). A Pune thread warns of an "agency" that posts "urgent shoot" gigs, then ghosts "when it's time to pay" ([r/pune, 4 Jun 2025](https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/)). 45% of surveyed creators said unverified managers quoted inflated rates in their name (HashFame) [CC]. India has no rate guide for illustrators. There is no official count of fake casting or brand-collaboration scams.
- **Competitors offering it:** no platform in India. Off-platform: city subreddit "Scam Alert" flairs. Outside India: FYPM, Writer Beware, Musicians' Union rate cards.
- **How competitors implement it:** crowd-shared rates; expert watchdogs; reviews only after orders.
- **Artist benefit:** avoiding scams; pricing confidence.
- **Discovery impact:** low.
- **Uniqueness:** 0 of 15 platforms; rare for Indian artists.
- **Weaknesses:** criminal defamation (BNS §356); IT Rules duties — a Grievance Officer who acknowledges complaints within 24 hours and resolves them within 15 days ([PIB, 25 Feb 2021](https://pib.gov.in/PressReleseDetailm.aspx?PRID=1700749)), and removal of unlawful content within 3 hours under the 2026 amendment (SCC Online, 12 Feb 2026); brigading.
- **Recommended implementation:** Rate Check (anonymous, ranges once data suffices); moderated scam-pattern alerts; brand reviews only from completed jobs; grievance officer.
- **Priority:** BUILD EARLY (narrow). **Verdict:** Modify.

**Feature 12 — Tips (UPI)** *(Part 03)*
- **Artist problem:** no simple Indian way for fans to give small amounts, or for artists to thank and record them.
- **Evidence problem exists:** small digital payments are normal in India: 86% of person-to-merchant UPI payments are below ₹500 (PIB, Aug 2026). Instagram Gifts need 500 followers and pay in dollars [2nd]; Buy Me a Coffee lists no UPI. But only about 8% of Indian music streamers pay, and no Indian data on artists' tip income was found.
- **Competitors offering it:** in India, a personal UPI QR (free), Instamojo, Razorpay Payment Pages, SuperProfile, YouTube Super Thanks, ShareChat gifts and Instagram Gifts. Outside India: Ko-fi, Buy Me a Coffee.
- **How competitors implement it:** gateway checkout or virtual gifts; 0–10% fees.
- **Artist benefit:** small income; a list of high-intent fans.
- **Discovery impact:** none.
- **Uniqueness:** very common.
- **Weaknesses:** a free QR does the basics; UPI "collect requests" ended 1 Oct 2025; Apple tip rules.
- **Recommended implementation:** zero-fee Support block; own QR or gateway mode (≈2.36%); private amounts; web only.
- **Priority:** BUILD EARLY (block). **Verdict:** Combine.

**Feature 13 — Digital downloads** *(Part 03)*
- **Artist problem:** asset makers need cheap Indian checkout and an owned audience.
- **Evidence problem exists:** Linktree's downloads are not available in India. Indian tools charge 5–10% (Instamojo, Topmate, SuperProfile). Instagram has no download feature. No Indian data shows how many artists sell files.
- **Competitors offering it:** in India, Topmate, SuperProfile, Instamojo, Graphy and Exly. Outside India: Gumroad, Stan, Payhip, Beacons, Kit, Bandcamp.
- **How competitors implement it:** per-sale fees, higher when the platform brings the buyer (Topmate: 10% direct, 20% via its marketplace); email-gated lead magnets.
- **Artist benefit:** an owned contact list that survives shocks like India's 2020 TikTok ban.
- **Discovery impact:** possible via an asset directory.
- **Uniqueness:** very common.
- **Weaknesses:** piracy; sample and font copyright; Google Play billing; DPDP consent.
- **Recommended implementation:** free download for email, 0% fee, exportable list; paid files later at 0–5%.
- **Priority:** BUILD EARLY (free); paid after PMF. **Verdict:** Modify.

**Feature 14 — Bookings and 1:1 sessions** *(Part 03)*
- **Artist problem:** teachers need booking, deposit and meeting link in one flow; emerging artists want affordable feedback.
- **Evidence problem exists:** Topmate creators earned ₹1.80 crore in Sep 2023, ~39% from 1:1 calls ([co-founder on LinkedIn](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O)) [CC]. Live teaching by working musicians earns at modest scale: Artium ₹28.0 crore and Muzigal ₹13.7 crore in FY25 ([Inc42 Datalabs](https://inc42.com/company/muzigal/), indicative). Indian indie musicians keep teaching, session work and jingles as side income (Rolling Stone India, 13 Jul 2022; The Indian Music Diaries, 26 Sep 2025).
- **Competitors offering it:** in India, Topmate (10–20%), [Exly](https://exlyapp.com/pricing) (₹2,500 a month, or commission), TagMango, Graphy and Artium. Outside India: Calendly, Cal.com, Stan, Intro.
- **How competitors implement it:** slot booking with prepayment; 3–20% commission.
- **Artist benefit:** paid work, feedback, ratings.
- **Discovery impact:** good for skill discovery via a fair "new mentor" lane.
- **Uniqueness:** very common; no Indian art/music 1:1 marketplace verified.
- **Weaknesses:** Topmate leads; FrontRow closed; no-shows; minors; 0.4% UPI merchant fee on sessions above ₹2,000 from 15 Oct 2026.
- **Recommended implementation:** pilot paid portfolio reviews and lessons; UPI to the artist; 18+; 0% fee.
- **Priority:** EXPERIMENT, then BUILD AFTER PMF. **Verdict:** Experiment.

**Feature 15 — Event tickets** *(Part 03)*
- **Artist problem:** filling small rooms (high severity); collecting money cheaply (moderate).
- **Evidence problem exists:** Indian organised live events grew 44% in 2025, but the growth is headliner-led: 130 concert days drew over 10,000 people each, and ticket sales "were concentrated in the top 10 Indian metros" (FICCI-EY, March 2026). BookMyShow listed 34,086 events, with growth slowing from 16% to 11% (Music Ally, 11 Dec 2025). Share reaching emerging acts: no reliable public data.
- **Competitors offering it:** in India, BookMyShow, District, Skillbox (FY25 revenue ₹29.9 crore, [Inc42 Datalabs](https://inc42.com/company/skillbox/)), Allevents and Townscript. Outside India: Eventbrite, Luma, Laylo.
- **How competitors implement it:** buyer fees; payouts after the event.
- **Artist benefit:** audience and local credibility (from listings).
- **Discovery impact:** strong local, only with density.
- **Uniqueness:** very common.
- **Weaknesses:** refunds, fake events, tax, Apple rules for online workshops.
- **Recommended implementation:** "Upcoming" link-out block; "Remind me" RSVP; city pages later; small workshop tickets under ₹2,000 only after PMF.
- **Priority:** DEPRIORITISE. **Verdict:** Deprioritise ticketing; Combine listings.

**Feature 16 — Hire Artists** *(Part 04)*
- **Artist problem:** landing paid work is hard; small brands cannot find or price talent.
- **Evidence problem exists:** reported from both sides in India. 50.4% of creators cite too few brand collaborations [CC]; 83% of marketers struggle to find creators; 62% of creators did not know brands had tried to reach them [CC]. Illustrators negotiate their own contracts and chase their own payments, because "India has zero illustration agencies" (Aparajitha Vaasudev, 19 Aug 2026).
- **Competitors offering it:** in India, Instagram's creator marketplace, YouTube BrandConnect, Kofluence (750,000+ influencers), Talentrack ([50K+](https://www.talentrack.in)), IndieFolio ([70,000+](https://home.indiefolio.com)), WYLD ([100,000+](https://getwyld.in)), Hobo.Video ([225,187+](https://hobo.video)) and StarClinch [all CC]. Outside India: Collabstr, Fiverr, Upwork, Behance, Contra.
- **How competitors implement it:** audience-data search; managed briefs; escrow; fees on one or both sides (StarClinch: 15% from the artist).
- **Artist benefit:** paid work, protection, credibility from completed jobs.
- **Discovery impact:** positive if fit-ranked; follower filters reproduce bias.
- **Uniqueness:** very common; artists-only multi-craft taxonomy a moderate difference.
- **Weaknesses:** scarce demand; off-platform deals; RBI aggregator rules (₹15 crore net worth, rising to ₹25 crore); GST TCS 0.5%, TDS 0.1% ([ClearTax](https://cleartax.in/s/section-194o)); payout trust, after delayed payments at VerSe, the owner of Josh ([Inc42](https://inc42.com/features/josh-in-jeopardy-funds-run-dry-for-dailyhunt-can-ai-get-verse-back-in-rhymes/)).
- **Recommended implementation:** one door of Opportunities; verified brands; brief-first; click-to-accept contracts; brand pays; newcomer slots.
- **Priority:** EXPERIMENT (central to MVP). **Verdict:** Combine.

**Feature 17 — Gigs** *(Part 04)*
- **Artist problem:** performers struggle to get booked and meet fake gigs.
- **Evidence problem exists:** Indian musicians say club gigs pay a "token fee" (Rolling Stone India, 13 Jul 2022) and that fees are "delayed, only partially paid, or not paid at all" (The Indian Music Diaries, 4 Mar 2026). Fake "urgent shoot" agencies operate in Pune (r/pune, 4 Jun 2025), and a fake casting agent cheated at least 17 aspiring artistes in Delhi (The Tribune, 14 May 2025). Demand exists: organised live events were ₹14,500 crore in 2025 (FICCI-EY) or ₹13,000 crore on a different scope (BookMyShow–EY-Parthenon, 12 Mar 2026). Weddings, religious and personal events are a further ₹1,11,800 crore that the organised figure leaves out (FICCI-EY, March 2026).
- **Competitors offering it:** in India, StarClinch (jobs board and booking), Skillbox, Talentrack, agencies such as Hire4Event (budgets ₹1 lakh–₹20 lakh+, [Hire4Event](https://web.archive.org/web/20260708083739/https://www.hire4event.com/)), WhatsApp and Facebook groups, and Instagram DMs. Outside India: GigSalad, The Bash, Encore, Gigmit, Bark, ArtConnect.
- **How competitors implement it:** lead selling, quotes, paid ranking, escrowed bookings.
- **Artist benefit:** paid gigs, repeat bookings.
- **Discovery impact:** open calls show posters applicants they would never search for — if ranking is fair.
- **Uniqueness:** common; performance plus freelance in one Indian board — rare.
- **Weaknesses:** infrequent buyers; scams; pay-to-win; seasonality (wedding and college-fest seasons).
- **Recommended implementation:** verified posters; mandatory budget; paid only; free capped applications; blind first round; newcomer slots.
- **Priority:** EXPERIMENT (central to MVP). **Verdict:** Combine.

**Feature 18 — Pro plan (₹299/month)** *(Part 03)*
- **Artist problem:** mainly a business-model question.
- **Evidence problem exists:** willingness to pay: no reliable Indian data found. Only 8% of India's 178M music streamers pay ([MBW citing EY-FICCI, 15 Apr 2026](https://www.musicbusinessworldwide.com/india-added-nearly-4m-paid-music-streaming-subscriptions-in-2025-taking-its-total-to-14-4m-according-to-new-report/)). The Indian platforms with real revenue charge brands or learners, not unknown creators.
- **Competitors offering it:** Linktree India (₹360/₹650/₹1,450), ReplyKaro (₹99; blog lists Pro at ₹299), Pixpa (₹300 a month billed yearly), Exly (₹2,500), TagMango (₹5,000), Meta Verified (₹699 at launch), BandLab Pro (₹1,499). Spotify's Premium Platinum also costs ₹299 in India ([Spotify India](https://www.spotify.com/in-en/premium/)), so ₹299 is a premium consumer price.
- **How competitors implement it:** paid tiers waive fees, remove branding, add analytics or DM volume.
- **Artist benefit:** time saved; audience intelligence.
- **Discovery impact:** neutral; harmful if it sells reach.
- **Uniqueness:** very common; no flat-fee artist plan in India (incumbents take commission: Topmate 10–20%, StarClinch 15%).
- **Weaknesses:** commodity bundle; "unlimited DMs" impossible; paywalled stats hurt activation.
- **Recommended implementation:** after PMF; test ₹149–₹299; core stats free; 0% fees on artist-driven sales; never ranking; test charging opportunity-givers.
- **Priority:** BUILD AFTER PMF. **Verdict:** Modify.

### F. Features Underdawg is missing

Each answers an evidenced artist problem (Part 06, section 14). Indian evidence is given first. "Discovery value" is an inference.

| # | Missing feature | Problem | Key evidence | Discovery value [INF] | Works from |
|---|---|---|---|---|---|
| M1 | **First-audience queue**: each new work shown free to matched peers plus at least one curator, booker or brand scout | New work gets no audience | 50.4% of Indian creators cite too few brand collaborations [CC]; 62% did not know brands had tried to reach them (HashFame) [CC]. No Indian data on reach per post by follower tier | Very high | 1,000 artists, hand-run |
| M2 | **Newcomer bonus, caps, rotation**, published | Big accounts dominate | YouTube Hype in India gives smaller channels more bonus points (Business Today, 17 Jul 2025), so the method is accepted; YouTube "90% of subscriptions from under 5% of channels" (Citi via Kotak MF) [2nd] | High | 1,000 (caps) |
| M3 | **Curator review queue**, deadlines, no artist pay-per-pitch | Gatekeeper access costs money | No Indian curator marketplace found; JioSaavn's ArtistOne Finds takes artist submissions, with no artist above 30,000 monthly listeners (Music Ally, 13 Aug 2025). Outside India: Groover €2 per curator; SubmitHub 31% approval [CC] | Very high | 10,000; Indian curator supply untested |
| M4 | **India-first opportunity board**, verified organisers, "free to apply" filter | Opportunities scattered and fee-laden | ArtConnect's India filter showed foreign listings [V]; Indian artists rely on WhatsApp and Facebook groups and agencies (StarClinch blog) [CC] | High | 1,000, staff-curated |
| M5 | **Opportunity-giver search** by skill, style, city, language, availability, budget | Brands cannot find unknown talent | 83% of Indian marketers struggle to discover creators (Goat/Kantar 2025); 70% of Indian brands plan bigger creator budgets (BCG via Storyboard18) [2nd] | Very high | 10,000 |
| M9 | **Human-made evidence** and a buyer filter | AI flooding | India's 2026 IT Rules require labels on AI-generated visuals (SCC Online, 12 Feb 2026); DPIIT proposes AI training with no opt-out (December 2025). No Indian platform verifies human-made work | Medium–high | 1,000 (light) |
| M11 | **Paid challenges** with transparent judging | Unpaid spec work | Indian creators describe barter offers as "free labour" (The Nod Mag, 7 Aug 2026); Instagram's India Edits Film Festival (Aug 2026) has no stated cash prize | High | 10,000 (sponsored) |
| M12 | **Local scene layer**: city pages, booker search by city | Local discovery runs on word of mouth | Live-event ticket sales concentrate in the top 10 metros; event firms see the highest growth in "the next 10 large cities" (FICCI-EY, March 2026); artists outside Delhi, Mumbai and Bengaluru lack venues (The Indian Music Diaries, 26 Sep 2025) | High, local | ~10,000 per metro |
| M15 | **No-pay-for-reach policy** | Distrust of paid placement | Paid reach is already sold in India (BandLab Boost, ₹299–₹999). Outside India: Dribbble's 2025 gating led to bans and backlash | Indirect, high (trust) | Day one |
| M16 | **Portable portfolio, owned contacts** | Platform dependency | India's TikTok ban (29 Jun 2020); Linktree dark in India (Aug 2025); Basic Display API ended 4 Dec 2024 | Protects inventory | Day one |

Later, once dense: **M6** talent-scouting dashboard (possible B2B revenue), **M7** cross-discipline collaboration briefs (**least-evidenced need**; validate first), **M8** credits graph, **M10** peer and pro portfolio reviews (folded into Show & Review), **M13** paid showcases, **M14** capped boosts for small artists only. Design note [INF]: M3, M10 and M11 can share one "review" primitive — a credible person reviews a work and can nominate it into M1.

### G. MVP

**The MVP must prove one sentence, in one city:** artists can receive meaningful discovery and opportunity through Underdawg that they are not receiving elsewhere.

**Why this shape.** In India, demand is scarce and supply is not. Kofluence lists 750,000+ influencers but estimates only 450,000–600,000 creators monetise anywhere in the country [CC]. StarClinch, founded in 2015, earns about ₹2.4 crore a year, so an open artist-booking marketplace has not scaled in ten years (Inc42 Datalabs, indicative). Individual wedding and party clients hire rarely, so target repeat posters: cafés, venues, colleges, agencies, D2C brands [INF]. Sign-ups are not retention: Koo claimed 60 million users against a peak of 10 million monthly users, and still shut (Business Today, 3 Jul 2024).

*Outside India (background only):* most marketplaces Lenny Rachitsky studied limited launch by geography or category, and about 60% relied on one-to-one direct sales ([Lenny's Newsletter, Nov 2019](https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace)). "Many failed marketplaces attack purchasing cycles that are simply way too infrequent" ([Bill Gurley, 13 Nov 2012](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)).

**Scope [INF]:** one city, 3–5 crafts (for example, illustrators and photographers in Mumbai), invite-only.

**In:**
| Component | From | Why |
|---|---|---|
| Profile: Instagram import and curation, tags, non-Instagram work, cache, export | F1, M16 | Cheapest inventory; survives API changes |
| Verified credibility card, no follower-first display | F2 | Indian brands fear fake followers |
| Narrow link page: brand view, "hire me", zero-fee UPI support, free download for email, free templates | F4, F12, F13, F5 | Main sharing surface |
| Free first-audience review queue with recruited curators, bookers or brand scouts; deadlines; peer credits | M1, M3, F10 | The discovery engine |
| Verified opportunity-giver accounts; fit-based search; blind first view; newcomer slots | M5, M2 | The audience that matters |
| One Opportunities board: Hire + Gigs + curated open calls; budgets shown; free to apply | F16, F17, M4 | Turns exposure into paid work |
| Aggregator escrow — added once posters return | F16/F17 | Protected payment makes opportunities credible; Indian creators already ask for 25–50% advances |
| Rate Check, scam alerts, AI declaration, no-training policy, published fairness rules | F11, M9, M15 | Trust |

**Out for now:** scheduling, DM automation, template marketplace, escrowed shop, Live Rooms, Fan Club, fan-paid critique, free-text brand reviews, paid downloads, full bookings, ticketing, Pro.

**Core user journey**
| Step | What the MVP provides | What could break it [INF] |
|---|---|---|
| 1. Artist joins | Invite; Instagram connection or manual upload | Personal accounts must switch to professional |
| 2. Creates profile | Import, curation, card, link page | Feels like "another Linktree" unless step 4 comes fast |
| 3. Uploads work | Submits to the queue with a goal | Low-effort or AI uploads |
| 4. Discovery activates | Matched peers plus at least one opportunity-giver, with a deadline; newcomer bonus and caps | Too few reviewers |
| 5. Relevant users discover the artist | Queue items, weekly digest, fit-ranked search | Opportunity-givers don't log in or insist on follower counts |
| 6. Opportunity occurs | Pick, shortlist, brief, gig invitation, open-call selection | Deals move to WhatsApp; scams |
| 7. Artist experiences value | Feedback, a pick or a paid job; verified completion; Rate Check | Generic feedback; low pay |
| 8. Artist returns | Alerts for briefs and gigs in their city and craft; review credits | An empty inbox; artists may need about one relevant paid opportunity a month [A] |

**Success metrics** (set targets before the pilot): share of active artists with at least one meaningful opportunity within 90 days from someone with no prior connection (**the core hypothesis**); "Would you have got this elsewhere?" with follower count recorded; share of works reaching enough relevant reviewers within 72 hours; share of views, shortlists and paid jobs going to artists below a follower threshold; active opportunity-givers per city and craft and their **repeat posting rate**; non-payment, dispute and scam rates; week-4 and week-12 retention. Measure outcomes, not sign-ups.

**First test.** A concierge pilot before building search or escrow: hand-recruit repeat opportunity-givers, ask for real briefs with real budgets, run weekly shortlists by hand, and measure briefs posted, posters who return, and hires of artists below a follower threshold — with continue-or-stop thresholds fixed in advance.

### H. Competitive moat

**Honest answer: today there is no moat.** No single feature is hard to copy. Instagram already offers 5 bio links, scheduling, Trial Reels and a creator marketplace in India. It also controls the API Underdawg depends on. The tool bundle is a commodity in India (Topmate, Exly, TagMango, Zorcha) and abroad (Linktree, Beacons, Stan). "India-first" is not a moat: Koo raised about $65M, FrontRow about $18M and Rigi ₹100 crore, and each shut or pivoted (Part 05).

**What could become hard to copy, if the pilot works [INF]:**
1. **A network of verified opportunity-givers per city and craft.** Two-sided liquidity is slow to build and cannot be copied as a feature. The main candidate.
2. **Trust rules that conflict with rivals' business models:** no pay-for-reach, no AI training on artists' work, no contact gating. Rivals earn from the opposite. In India: BandLab Boost (₹299–₹999) and StarClinch's penalty on direct deals. Outside India: Spotify Discovery Mode, Behance Boost, Saatchi Sponsored Listings (Mar 2026), Dribbble's gating.
3. **Pre-traction data:** curator picks, critique scores, "most improved", completed jobs, payment records, Indian rates by craft and city. Meta, Kofluence and Qoruz hold engagement data on creators who already have an audience; they do not hold completed-job or payment-timeliness records for unknown artists.
4. **India-native rails** (UPI, GST invoices): a convenience, not a moat.

**By competitor [INF]:** *Instagram* could copy any feature, but selling reach and training AI are central to Meta's model, and its marketplace ranks by audience size. *YouTube* markets a small-creator boost in India (Hype) but routes nobody to paid work. *Topmate* and *Kofluence* are the nearest Indian threats: either could add an artists-only brand marketplace. *StarClinch* already combines a jobs board with booking for performers. *BandLab* could assemble a similar stack fastest and already prices in rupees. *Linktree* could switch on its money features in India. *Behance* could add Instagram import and UPI quickly; its weak spots are a designer skew, traction-weighted curation and paid Boost. *Cara* has trust but no buyers. *Spotify and JioSaavn* own listening; the opening is non-streaming outcomes. *TikTok* has been banned in India since 29 June 2020, so it is not a competitor there.

### I. Three-year direction

The steps follow Part 06's scale thresholds (~1,000 / ~10,000 / ~100,000 artists). These are **researcher estimates** [A], and mapping them to years is an inference. Move on when the metrics are met, not when the calendar says so. The binding constraint is opportunity-givers per city and craft.

**Year 1 — prove it in one city (~1,000 artists), partly by hand.** Profile, card and narrow link page with tips and free downloads; hand-run first-audience queue with recruited reviewers; peer critique credits; staff-curated opportunity board and concierge Hire/Gigs (perhaps 20–50 real gigs a month [A]); Rate Check prompts and a scam-pattern library; fairness rules; export; an "Upcoming" link-out block.

**Year 2 — density in 1–2 metros and 3–5 crafts (~10,000 artists).** Self-serve Opportunities with aggregator escrow (a brand needs roughly 30–100 relevant artists per craft per city [A]); algorithmic first-audience matching; newcomer bonus; discipline and city benchmarks; paid pro and curator queue (~50 reviewers for 10,000 artists, by Groover's ratio, an outside-India benchmark [INF]); rate benchmarks (~30+ data points per cell [A]). Graduate experiments that work: Shop-lite → protected checkout, 1:1 sessions, Live as critique rooms, Pro, charging opportunity-givers. Collaboration briefs, credits graph, sponsored challenges and city showcases if density allows.

**Year 3 — national scale (~100,000 artists).** National self-serve marketplace with ranking, fraud and dispute teams; brand reputation scores from completed jobs; rupee price suggestions from deal data; a talent-scouting dashboard (possible B2B revenue); capped boosts for small artists only; supporter graph; Pro as meaningful revenue.

**Only at large scale:** a template marketplace, international shipping and instalments, a public India rate index, fully personalised ranking with an adaptive fairness dose, and machine learning on critique data.

## Research method and limitations

- **Scope: India first.** Indian creators, artists, markets, platforms, failures and rules were researched in their own right. Evidence from other countries is background only. Sources are dated; most pages were checked on 1 or 2 October 2026.
- **Research tracks.** Two India-only tracks: (a) Indian creators and artists — income, counts, reach, brand deals, payment delays, scams, AI rules; (b) Indian markets and platforms — live events, booking platforms, art, music, learning, tools, failures, UPI, RBI, GST and DPDP rules. Eight feature tracks plus a competitor addendum: (1) artist pain points; (2) Instagram-layer tools; (3) money tools; (4) the Art Shop; (5) hiring, gigs and trust; (6) community, live and feedback; (7) competitors, startups and failures; (8) discovery and missing features.
- **Indian primary documents opened in full:** EY's "State of influencer marketing in India" (April 2024); EY-IPRS "The music creator economy" (December 2023); the IPRS Annual Report FY2025–26; the FICCI-EY media and entertainment report (March 2026); the DPIIT working paper on generative AI and copyright (December 2025); PIB releases; DataReportal's India pages; the RBI payment-aggregator directions (as reproduced).
- **Vendor figures are company claims.** Kofluence, Qoruz, HashFame, KlugKlug, StarClinch and OpraahFx sell services in this market; their numbers are labelled [CC]. Inc42 Datalabs revenue figures are indicative only.
- **Blocked or missing Indian sources.** The BCG report PDF and several press sites (including Mint, Forbes and exchange4media) blocked access, so some BCG figures are known only through PIB and press. NPCI's statistics page, Hire4Event, SuperProfile and Winkl could not be opened. Storyboard18's payment-delay sources are anonymous.
- **The shared web-search budget ran out partway.** Researchers then opened only known URLs. The main competitor pass had no web search, so small or stealth Indian startups may be missing. Product Hunt, Crunchbase, Tracxn and Google Play blocked access in some tracks.
- **reddit.com could not be opened directly.** The hiring research read Reddit threads through Internet Archive (Wayback) copies, including Indian city threads from Pune, Mumbai and Chennai. Forum discussions by Indian artists were not searched in full.
- **India gaps.** No source separates independent artists from lifestyle influencers. No Indian income survey covers visual artists, illustrators, dancers or photographers. No Indian survey measures late payment or scams among artists. No Indian data gives reach per post by follower tier, the share of brand spend reaching small creators, willingness to pay, or whether Indian opportunity-givers would use an artists-only platform.
- **What this means for confidence.** *High:* the plan as written does not deliver discovery; most planned tools are commodities in India; Meta's API limits are real; Indian payment, tax and data rules shape the shop and escrow design. *Moderate:* the trust-and-opportunity gap in India; the value of Show & Review and narrow Artist Boards; that no exact Underdawg competitor exists in India; that paid reach damages trust (shown outside India, not yet tested in India). *Low:* artist incomes outside music, willingness to pay, scale thresholds. *Untested:* the demand-side assumption. Treat the recommendations as a plan for a pilot, not as proof.

## Charts in this report

The 38 CHART blocks in Parts 01–06, Indian charts first. When a chart id appears in two parts, render it once.

**India**

| Chart id | Title | Part |
|---|---|---|
| india-creator-informality | Only 15.2% of Indian creators are GST- or business-registered, and only 8% of music streamers pay | 01 |
| india-iprs-royalty-bands | 69% of authors and composers paid by IPRS received under ₹25,000 a year | 01 |
| india-instagram-reach | Instagram's ad reach in India roughly doubled, from 229.6 million in early 2023 to 481 million in late 2025 | 01 |
| india-discovery-gap | Both sides report the gap: 83% of Indian marketers struggle to find creators, and 50.4% of creators cannot find enough brand work | 01 |
| india-moj-daily-users | Moj, a funded Indian short-video app, fell from 9.24 million daily users to 2.16 million in two years | 01 |
| india-payment-delay | Brands' official payment cycle for creator campaigns is 90 days, twice the 45-day legal norm, and the worst delays reach a year | 01 |
| india-cyber-fraud-losses | Cyber-fraud losses reported in India rose about tenfold, from ₹2,290 crore in 2022 to ₹22,845.73 crore in 2024 | 01 |
| india-live-events | India's organised live-events segment doubled from ₹7,300 crore in 2022 to ₹14,500 crore in 2025 | 01 |
| india-app-ratings | In India, Meta's own creator apps have 40,285 and 85,857 iOS ratings; third-party Instagram tools have 17 to 1,426 | 02 |
| inr-tool-prices | Underdawg Pro at ₹299 sits below Linktree India Starter (₹360) but equals ReplyKaro's DM-tool Pro | 02 |
| dm-tool-usd-prices | Indian-built Instagram DM tools list paid plans at $3–$15 a month to visitors outside India | 02 |
| dm-tool-users | Indian creator tools claim between 4,496 and 60,000 users each; Topmate claims 1M+ professionals (all company claims) | 02 |
| er-by-tier | In India, nano creators show about 4% engagement against about 1.5% for macro creators (EY, 2023 data) | 02 |
| art-cut | Artflute takes 40% of an artwork sale in India; Etsy and Instamojo take 2–6.5% plus fixed fees | 03 |
| creator-fee | Indian creator tools charge 2–20% on sessions, downloads and courses, and the rate is highest when the platform supplies the buyer | 03 |
| ticket-cost | Indian ticketing platforms do not publish organiser fees; the one listed fee is Allevents' $1 per attendee, about 5% of a $20 ticket | 03 |
| pro-price | Underdawg Pro at ₹299/month sits below most Indian creator-tool prices but equals a pure DM tool | 03 |
| cod-rto | Cash-on-delivery orders in India return to origin 24–35% of the time, versus 2–8% for prepaid | 03 |
| online-art | India has no online-art sales figure; of ₹2,543 crore of auction turnover in 2025, contemporary art was only ₹163 crore | 03 |
| india-live-events | India's organised live-events segment doubled from ₹7,300 crore (2022) to ₹14,500 crore (2025); FICCI-EY expects a small dip in 2026 (duplicate) | 04 |
| india-gig-fees | An emerging musician in India is paid ₹3,000–15,000 for a café gig and ₹5,000–30,000 for a college fest (StarClinch estimates) | 04 |
| india-platform-revenue | Indian platforms that charge brands, ticket buyers or learners earn ₹14–56 crore a year; the artist-booking marketplace StarClinch earns ₹2.4 crore (Inc42 Datalabs, indicative) | 04 |
| marketplace-fees | Indian platforms take 10–20%: StarClinch charges the artist 15% and Topmate 10–20%; outside India, artist-side fees run from 0% to 20% | 04 |
| india-payment-delay | Indian influencer campaigns officially pay in 90 days against a 45-day legal norm; the worst reported delays reach a year (anonymous agency sources) (duplicate) | 04 |
| india-cyber-fraud-losses | Cyber-fraud losses reported in India rose about tenfold, from ₹2,290 crore in 2022 to about ₹22,500 crore in 2024 and 2025 (duplicate) | 04 |
| india-artist-scam-cases | Fake casting agents in India took ₹1,000 to ₹75,000 per aspiring artist; one creator lost ₹50 lakh to fake copyright strikes | 04 |
| india-live-community-funding | Funding did not save Indian live, community and booking startups: FrontRow (~$18M), Rigi ($25M) and Eloelo ($50M+) all shut or changed business | 04 |
| feedback-market-scale | Outside India (background only): artists already pay for curator feedback at scale — SubmitHub reports 1.6M users and Groover 600,000+ artists (company claims); no Indian equivalent was found | 04 |
| india-revenue | The five highest-revenue Indian platforms here are paid by brands, ticket buyers or learners (₹28–56 crore a year); StarClinch, which charges artists 15%, earns ₹2.4 crore | 05 |
| india-scale | Topmate claims 1M+ users and Kofluence 750,000+; India's artist-hiring pools hold 10,000–70,000 talent (all company claims) | 05 |
| take-rates | Indian incumbents take 5–40% of each sale on their entry plans; no flat-fee artist plan like ₹299/month was found in India | 05 |
| failed-funding | Funding did not buy survival in India: Chingari ($88M), Koo ($65M), Trell ($64M), Eloelo ($50M+), Rigi ($25M) and FrontRow ($18M) all shut, shrank or pivoted | 05 |
| india-yt-monetise-by-tier-s6 | In India, 10% of nano YouTube creators monetise, against 95% of mega creators (Kofluence, company claim) | 06 |
| india-short-video-dau-s6 | India's replacement feed apps lost most of their daily users within two years: Moj fell from 9.24M to 2.16M | 06 |
| india-discovery-gap-s14 | Both sides of the Indian market say they cannot find each other: 83% of marketers struggle to discover creators, and 50.4% of creators cite too few brand opportunities | 06 |
| india-platform-revenue-s22 | Indian platforms that sell to brands and ticket buyers earn ₹30–56 crore a year; StarClinch, which takes 15% from artists, earns ₹2.4 crore (FY25, Inc42 Datalabs, indicative) | 06 |

**Outside India or mixed (background only)**

| Chart id | Title | Part |
|---|---|---|
| live-video-cost | Live video costs $0.0004–$0.004 per participant-minute at vendor list prices; one free 45-minute, 30-person room is about $5.40 at 100ms (calculated) | 04 |
| feature-coverage | Artist Boards are offered by 0 of 14 competitors; Show & Review only partly by 2 | 05 |

---

## 1. The biggest problems under-discovered artists face

Four artist problems are large, common and well documented, and each has Indian evidence. **Artists earn too little. Discovery is controlled by algorithms that favour big accounts. Generative AI threatens income and floods feeds. And artists depend on platforms that change the rules without warning.** In India, only 8–10% of creators "monetize effectively", a ban removed creators' main short-video audience overnight, and a government committee has proposed AI training on Indian works with no opt-out. Below these sits a "money and trust" group: pay-to-play visibility, late payment, scams and weak access to good paid work. The evidence here is moderate, but each incident does serious harm. For under-discovered artists, three problems hurt most: algorithm-gated discovery, scams and weak access to paid work. They have no audience to cushion them, and they are the ones looking for a first paid job (inference; Indian police cases show fake casting agents cheating aspiring artists, but no data on who scammers target overall was found). This matters for Underdawg. Incumbents are strongest, and still improving, on discovery for fans. They are weakest, or conflicted, on the money-and-trust layer.

**How to read the evidence.** Research dates: 1–2 October 2026. Indian evidence comes first in every section. The main Indian sources are government documents (PIB, DPIIT, MSME Samadhaan, Home Ministry replies to Parliament), EY and FICCI-EY reports, IPRS, DataReportal and Indian trade press. Kofluence, HashFame, StarClinch and similar firms sell services in this market, so their numbers are labelled "company claim". No Indian source separates artists from lifestyle and beauty influencers, so creator-wide data stands in for artists in several places. Where no reliable Indian data exists, the text says so. Facts from other countries sit under the label "Outside India (background only)"; they are not Indian numbers. The research tools could not open reddit.com; a few Indian threads were read through Internet Archive (Wayback) copies. Evidence labels are not scores. **Strong** = at least three independent quantitative sources, or platform-documented events, plus qualitative support. **Moderate** = one or two quantitative sources, or several documented qualitative sources. **Weak** = indirect or single-source evidence.

### Ranked problem table

The ranking is qualitative. It reflects how many artist types are affected, how much careers are damaged, and how strong the independent evidence is. The "Evidence strength" column gives the overall label first, then says what the Indian evidence is.

| Rank | Problem | Evidence strength | Key Indian evidence with numbers, source and date | Segments most affected | Current workaround | Why existing solutions fall short |
|---|---|---|---|---|---|---|
| 1 | Low, unstable income | Strong. India: creator-wide and musician data; no income survey for visual artists, illustrators, dancers or photographers | Only **8–10% of India's 2–2.5 million creators "monetize effectively"** ([BCG via PIB, 2 May 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)). **69% of authors and composers paid by IPRS received under ₹25,000 a year** ([EY-IPRS, Dec 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)). 88% of creators get less than three-quarters of their income from social media ([Kofluence via Storyboard18, 14 May 2026](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm), company survey) | All; worst for nano and micro creators, emerging musicians, dancers and illustrators | Second jobs and side work: only 60% of surveyed music creators do music full-time (EY-IPRS); indie musicians keep teaching, ad and voiceover work ([Rolling Stone India, 13 Jul 2022](https://rollingstoneindia.com/heres-what-its-really-like-to-be-an-indian-indie-artist-playing-live-gigs/)) | Tips, shops and memberships need an audience the artist lacks. The limit is demand, not payout tools (inference) |
| 2 | Discovery gated by algorithms that favour scale | Strong. India: both creators and brands report the gap; no Indian data on reach per post by account size | **50.4% of creators** say too few brand collaborations is their main obstacle (Kofluence via Storyboard18, above, company survey). **83% of marketers** struggle to find creators ([Goat/Kantar via WPP Media, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity)). Influencers grew from **9.6 lakh (2020) to 40.6 lakh (2024)** ([Goat/Kantar via MediaBrief, 24 Jun 2025](https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/)) | Small accounts; still-image artists; musicians outside Delhi, Mumbai and Bengaluru | Post more; DM past clients; YouTube Hype (India since Jul 2025); Trial Reels; paid boosts | Fixes target fan feeds, not curators, bookers or brands. No platform publishes newcomer-exposure data. In India the platforms' answer is leaderboards and contests, not paid work |
| 3 | AI: training without consent, mimicry, flooding, lost work, false accusations | Strong. India: policy papers, court cases and interviews; no artist survey | A DPIIT committee proposed that AI firms may train on all lawfully accessed works under a **mandatory licence with royalties and no opt-out** ([DPIIT Working Paper, Dec 2025](https://www.dpiit.gov.in/static/uploads/2025/12/ff266bbeed10c48e3479c941484f3525.pdf)). Indian music labels sought to join a copyright case against OpenAI ([Business Today, 14 Feb 2025](https://www.businesstoday.in/technology/artificial-intelligence/story/why-t-series-saregama-sony-want-to-join-a-copyright-lawsuit-against-openai-in-india-464747-2025-02-14)). An animator and a jingle writer report clients using AI to cut fees ([The Established, 21 Apr 2025](https://www.theestablished.com/culture/living/who-can-really-claim-to-be-an-artist-when-the-medium-is-a-machine)) | Illustrators, animators, 3D artists, jingle and production musicians | Contract clauses that bar AI use of voice and likeness; personality-rights suits; treating a client's request to use AI as a red flag | India got no Meta AI-training opt-out ([Social Media Today, 9 Jun 2024](https://www.socialmediatoday.com/news/meta-posts-for-ai-training-cannot-opt-out/718410/)). Labelling rules are weakly enforced. Visual artists have no collecting society in these proceedings (inference) |
| 4 | Platform dependency and sudden rule changes | Strong (documented Indian events) | India banned TikTok on **29 Jun 2020** ([Al Jazeera, 1 Jul 2020](https://www.aljazeera.com/amp/economy/2020/7/1/indias-tiktok-ban-hurts-content-creators-earnings-prospects)). Its Indian replacements shrank: Josh fell from **20M to 9.4M** monthly users in a year (data.ai via [Inc42](https://inc42.com/features/verse-innovations-josh-is-fizzling-out/)). Linktree went dark in India in Aug 2025 ([TechCrunch, 18 Aug 2025](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)). Meta shut the Instagram Basic Display API on 4 Dec 2024 ([Meta for Developers](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/)) | All; acute for the 3.3–3.7 million creators who are Instagram-first | Spread across several platforms | No platform removes another's risk. India's own replacements (Josh, Moj, Koo) shrank or shut |
| 5 | Pay-to-play visibility and rent extraction | Moderate–Strong. India: company terms and blogs; no survey | StarClinch charges artists **15%** and sets a **₹7.5 lakh penalty** for direct deals ([StarClinch terms](https://starclinch.com/terms-of-use)). Artflute takes **40%** and the artist pays domestic shipping ([Artflute FAQ](https://www.artflute.com/artist-faqs)). New comedians pay **₹200–500 per open-mic slot** ([BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india), blog). Meta Verified costs ₹699 a month in India ([Meta, 7 Jun 2023](https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/)) | Performers, visual artists, comedians, musicians | Pay the fee; play for "exposure"; deal directly by DM | Platforms earn from these fees. The artist pays for access, not results |
| 6 | Late payment or non-payment | Moderate. India: trade press and named cases; no survey of how many artists are paid late | Brands' payment cycle for creator campaigns is **90 days against a 45-day legal norm, and stretches to a year** ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm), anonymous sources). Karnataka's culture department owed **over 1,800 artists more than ₹4 crore** ([The Indian Music Diaries, 4 Mar 2026](https://theindianmusicdiaries.com/are-payment-delays-silencing-the-voices-of-independent-music/)). A Pune "urgent shoot" agency ghosted creators at payment ([r/pune, 4 Jun 2025, archived](https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/)) | Creators, musicians, folk performers, illustrators, photographers, videographers | 25–50% advance before work; daily follow-up messages; write-offs | Only 15.2% of creators are formally registered; India's MSME payment fast-track needs Udyam registration ([MSME Samadhaan](https://samadhaan.msme.gov.in/)). Invoices of ₹5,000–40,000 are too small for a civil suit (inference) |
| 7 | Scams and fake opportunities | Moderate. India: official cyber-fraud totals and police cases; no official count of artist scams | Reported cyber-fraud losses rose from **₹2,290 crore (2022) to ₹22,845.73 crore (2024)** ([CyberPeace, 19 May 2026](https://cyberpeace.org/resources/blogs/cyberpeace-analysis-indias-cybercrime-surge-signals-a-growing-digital-security-challenge-an-assessment-based-on-rajya-sabha-proceedings-and-mha-data); [Inc42, 22 Jul 2025](https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/)). Fake casting agents on Instagram and WhatsApp took **₹1,000–75,000 per victim** in four reported cases, 2022–2025 (sources below) | Aspiring performers, models and actors; creators without managers | City "Scam Alert" threads; warnings shared between creators | Platforms do not vet who posts offers. Only 55,484 FIRs followed 28.15 lakh cyber-crime cases in 2025 ([The420, 21 Feb 2026](https://the420.in/india-cybercrime-24pct-rise-22495cr-loss/)) |
| 8 | Weak access to good paid work, brands and curators | Moderate | **62% of surveyed creators did not know brands had tried to reach them** ([HashFame via MediaBrief, 27 May 2025](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/), company claim). Creators under 10K followers get **₹500–5,000 per Reel** ([Kofluence via Mediabrief, 10 Jul 2025](https://mediabrief.com/kofluence-influencer-marketing-report-2025/)). "India has zero illustration agencies" ([Aparajitha Vaasudev, 19 Aug 2026](https://studioapara.substack.com/p/india-has-no-illustration-agents)) | Emerging artists, students, designers, illustrators, performers | Instagram DMs, personal networks, WhatsApp and Facebook groups, event agencies ([StarClinch blog, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/)) | StarClinch "does not guarantee you any work" (terms, above). An Indian design student: "Fiverr and Upwork have just simply not worked" ([r/graphic_design, 29 Jan 2024, archived](https://web.archive.org/web/20250329214617/https://www.reddit.com/r/graphic_design/comments/1adwmgf/indian_graphic_designer_need_help_with_freelance/)) |
| 9 | Art theft, reposting and lost credit | Moderate–Weak. India: interviews only | "I've already seen elements of my own work being lifted" (artist Viraj Khanna, [The Nod Mag, 19 Dec 2025](https://thenodmag.com/content/artificial-intelligence-creative-industry-backlash)). A 3D artist reports "multiple instances of my work plagiarised" ([Homegrown, 5 Aug 2025](https://homegrown.co.in/homegrown-voices/we-spoke-to-5-artists-about-generative-ais-place-in-the-indian-creative-landscape)). Commissioned work can default to client ownership under Section 17(b) of the Copyright Act 1957 (Vaasudev, above) | Visual artists, illustrators, 3D artists, photographers, designers | Watermarks, credits, reporting reposts | No Indian prevalence data. Instagram now drops repeat reposters from recommendations ([Engadget, 30 Apr 2024](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html)), so this weakness is shrinking |
| 10 | Burnout; little meaningful community | Moderate (qualitative) | "Nearly 200,000 have exited since 2024" amid burnout and low pay ([Outlook Business citing Mint](https://www.outlookbusiness.com/ampstories/news/india-loses-2-lakh-creators-amid-burnout-low-payheres-what-you-need-to-know), secondary; original not opened). EY's creator survey scores "pressure to constantly produce content" at 115 against an average of 100 ([EY, Apr 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) | All social-dependent artists | Side income; regional WhatsApp and Facebook groups | No Indian survey of artists' community needs. Engagement-ranked feeds reward volume |
| 11 | Bots, fake engagement, "generic" audiences | Weak | **74% of brands** surveyed by BCG worry about fake followers ([Storyboard18 citing BCG, 4 May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm), secondary). BCG names "fake engagement" as an India challenge, without figures ([BCG, 3 May 2025](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy)) | Musicians; Instagram artists | Brand-side fraud screening sold by Kofluence and Qoruz; no artist-side tool was found | Bot comments aimed at artists on Instagram were not verified |

### India: Instagram-first, informal and thinly paid

India is Instagram's largest market. Instagram's ad reach in India was **481 million in late 2025, up 22.9%**; YouTube's was 500 million ([DataReportal, 5 Nov 2025](https://datareportal.com/reports/digital-2026-india)). In January 2025 India was about **23.8% of Instagram's global ad reach** (share derived by the researchers, [DataReportal](https://datareportal.com/essential-instagram-stats)). Indian creators are Instagram-first: **3.3–3.7 million of 4.0–4.4 million** active creators use it as their main platform ([Kofluence via PTI/The Wire, 14 May 2026](https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age), company release). Brands agree: 93.1% name Instagram their top influencer platform ([Kofluence via Storyboard18, 14 May 2026](https://www.storyboard18.com/amp/how-it-works/93-brands-prioritise-instagram-as-84-creators-monetise-best-through-short-form-video-kofluence-report-98028.htm)). That supports an Instagram-connected product, and concentrates platform risk.

Counts of Indian creators differ by definition. Every source agrees the base is small creators.

| Source | Count | What is counted | Date |
|---|---|---|---|
| Goat/Kantar ([MediaBrief](https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/)) | 40.6 lakh (9.6 lakh in 2020) | Influencers | 2024 |
| Kofluence ([MediaNews4U](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/), company claim) | 4.0–4.4 million | Active creator professionals | May 2026 |
| BCG ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)) | 2–2.5 million | Active creators with over 1,000 followers | May 2025 |
| Mint via [Outlook Business](https://www.outlookbusiness.com/ampstories/news/india-loses-2-lakh-creators-amid-burnout-low-payheres-what-you-need-to-know) (original not opened) | Over 8 million | Creators | Undated |

Kofluence puts 61.1% of creators in the nano tier (1,000–10,000 followers) and 32.5% in micro (10,000–100,000) (Storyboard18, 14 May 2026, company claim). So about 94% of Indian creators have under 100,000 followers (derived). This is Underdawg's base.

Money is thin and informal. Nano and micro creators are reported to earn **under ₹18,000 a month** (BCG via [Storyboard18](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm), secondary; not found in the PIB release). **Only 8% of India's 178 million music streamers pay** ([MBW citing EY-FICCI, 15 Apr 2026](https://www.musicbusinessworldwide.com/india-added-nearly-4m-paid-music-streaming-subscriptions-in-2025-taking-its-total-to-14-4m-according-to-new-report/)). Only **15.2%** of creators are registered as a business or for GST (Kofluence, above).

Payment rails are changing.

- PayPal India handles only international payments and charges **4.40% + $0.30 plus a 3.0% currency spread** ([PayPal India](https://www.paypal.com/in/webapps/mpp/merchant-fees)).
- Stripe India went invite-only in June 2024 ([MediaNama](https://www.medianama.com/2024/06/223-stripe-invite-only-services-in-india-temporarily-citing-regulations/)).
- From 15 October 2026, UPI merchant payments above ₹2,000 carry a 0.4% fee, capped at ₹300 ([The Indian Eye, 18 Sep 2026](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/)). Most artist bookings sit above ₹2,000 (inference).
- Only an RBI-authorised payment aggregator may hold other people's money in escrow ([RBI Directions, 15 Sep 2025, text via TaxGuru](https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html)).

India's Instagram ad audience is about 70% male (DataReportal, above). This may raise harassment risk for women artists in DMs and live features (inference; not checked).

CHART: india-creator-informality — Only 15.2% of Indian creators are GST- or business-registered, and only 8% of music streamers pay
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Surveyed creators who are nano-tier (1K–10K followers) | 61.1 | % | Kofluence (press release) | 14 May 2026 | https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age |
| Surveyed creators GST- or business-registered | 15.2 | % | Kofluence (press release) | 14 May 2026 | https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age |
| Music streamers who pay (of 178M) | 8 | % | EY-FICCI via MBW | 15 Apr 2026 | https://www.musicbusinessworldwide.com/india-added-nearly-4m-paid-music-streaming-subscriptions-in-2025-taking-its-total-to-14-4m-according-to-new-report/ |

**India evidence gaps.** These hold for the whole section.

- No source separates India's independent artists from lifestyle and beauty influencers, or counts artists by discipline.
- No Indian income survey exists for visual artists, illustrators, dancers or photographers.
- No Indian data shows reach per post by account size.
- No Indian survey measures what share of creators, artists or freelancers are paid late.
- No official count of fake casting or fake brand-collaboration scams exists.
- No Indian survey measures artists' losses to AI.
- BCG's page calls the 2–2.5 million creators "monetized", while PIB says 2–2.5 million is the active base and only 8–10% monetise effectively. Check the BCG PDF before citing either.

### Income: only 8–10% of Indian creators monetise effectively

**Severity: high. Frequency: constant.** Low income is structural in India. BCG says only 8–10% of 2–2.5 million creators "monetize effectively" ([PIB, 2 May 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)). Kofluence estimates that 450,000–600,000 of 3.5–4.5 million creators monetise "in some form", about 10–17% (derived; [IBTimes India, 8 Jul 2025](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077), company claim). So roughly one Indian creator in ten earns from the work.

Musicians have the best Indian artist-income data. EY's report with IPRS combines a 2022 survey of 500 music creators with IPRS payout data ([EY-IPRS, Dec 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)).

- 87% want to live off music alone. Only 60% do music full-time.
- **69% of authors and composers paid by IPRS received under ₹25,000 a year.** About 6% received more than ₹6 lakh.
- "Most Indian authors currently have almost no social security net."
- In FY 2025–26 IPRS paid ₹628.3 crore to "more than 13,700 members" out of 23,943 ([IPRS Annual Report, Sep 2026](https://iprs.org/wp-content/uploads/2026/09/Annual_Report_FY2025-26.pdf)). So about 57% of members received any royalty (derived).

Other disciplines have only single data points.

- **Live gigs.** A beginner musician gets ₹3,000–10,000 per gig ([StarClinch blog, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/), company estimate). Indie musicians say club gigs pay a "token fee" that does not cover gear ([Rolling Stone India, 13 Jul 2022](https://rollingstoneindia.com/heres-what-its-really-like-to-be-an-indian-indie-artist-playing-live-gigs/)).
- **Dancers.** Bollywood background dancers earned ₹4,000–4,500 for a day of song shooting ([The Tribune, 20 May 2020](https://www.tribuneindia.com/news/entertainment/as-music-fades-bollywoods-background-dancers-look-for-help-to-survive-87450/)). This is the only dancer pay figure found, and it is from 2020.
- **Illustrators.** India has no illustration agencies and no India-specific rate guide ([Aparajitha Vaasudev, 19 Aug 2026](https://studioapara.substack.com/p/india-has-no-illustration-agents), qualitative).
- **Visual artists, photographers.** No reliable Indian income data was found.

There is counter-evidence. Royalties generated by Indian artists on Spotify grew **29%** in 2025, and artists generating over ₹1 crore a year rose 21% ([Spotify, 2 Sep 2026](https://newsroom.spotify.com/2026-09-02/india-loud-and-clear-report/)). YouTube says it paid over **₹21,000 crore** to Indian creators, artists and media companies in three years ([YouTube, 5 May 2025](https://blog.youtube/news-and-events/neal-mohan-creator-economy-waves-2025/)). This sum includes media companies, so it overstates what small creators receive. In EY's survey of 556 creators, 77% reported income growth in the past two years ([EY, Apr 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)).

One finding shapes product choices. Indian artists earn mainly from one-off paid work, not from fans. In the IPRS-EY survey, **live performances** were the top income source for 139 of 500 music creators, and upfront fees from labels and film producers for 129. Brand sponsorships came first for only 8. Sponsored collaborations are the main income for about 50% of creators, and platform revenue for about 15% (Kofluence via IBTimes India, company claim). So tools that create or protect paid work reach more artist income than tips do (inference).

CHART: india-iprs-royalty-bands — 69% of authors and composers paid by IPRS received under ₹25,000 a year
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Under ₹25,000 a year | 69 | % of recipients | EY-IPRS, "The music creator economy" | Dec 2023 | https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf |
| ₹25,000–50,000 | 7 | % of recipients | EY-IPRS | Dec 2023 | https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf |
| ₹50,000–6 lakh | 17 | % of recipients | EY-IPRS | Dec 2023 | https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf |
| Over ₹6 lakh (three bands combined, approx.) | 6 | % of recipients | EY-IPRS | Dec 2023 | https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf |

Note: royalty income of registered authors and composers only. It is not total income, and it does not cover performers.

**Outside India (background only).** No Indian survey covers visual artists, so two foreign figures are kept as context. They are not Indian numbers.

- UK visual artists' median income from art was GBP 12,500, down from GBP 16,000 in 2010 ([Univ. of Glasgow/DACS, 25 Nov 2024](https://www.gla.ac.uk/news/archiveofnews/2024/november/headline_1130637_en.html)).
- For surveyed US visual artists, the top income source was freelance or contract work (61%), not fan payments ([The Creative Independent, 2018](https://thecreativeindependent.com/artist-survey/)). This matches the Indian musician finding above.

### Discovery: 481 million Indians are on Instagram, yet half of creators cannot find enough brand work

**Severity: high. Frequency: every post.** Attention is not scarce in India. Matching is. Instagram's Indian ad reach grew from 229.6 million (early 2023) to 481 million (late 2025). Over 2020–2024 the number of influencers grew about fourfold (Goat/Kantar, above). More creators now compete for each viewer (inference).

The same gap is reported from both sides.

- **Creators.** 50.4% say "limited brand collaboration opportunities" is their main obstacle (Kofluence via Storyboard18, 14 May 2026, company survey). In EY's creator survey, "building and growing a loyal audience" scored 151 and "finding and securing brand partnerships" 142, against an average of 100 (EY, Apr 2024, above).
- **Brands.** 83% of marketers struggle with influencer discovery ([Goat/Kantar via WPP Media, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity)).
- **The broken link.** 62% of surveyed creators did not know brands had tried to reach them. Over 55% lost deals because they had no verified contact route or a fake manager stepped in ([HashFame via MediaBrief, 27 May 2025](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/), company claim; method not disclosed).

Small Indian accounts do get engagement. Nano creators have the highest engagement rate, about 4%, against about 1.5% for macro creators (EY citing Brand Equity and BW, 2023; EY, Apr 2024, above). The problem is turning that into paid work. Aarja Bedi (38.6K followers, Delhi) used to get sponsored offers every few days and now gets "only a couple" a month ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)). A Mumbai musician says visibility is governed by "editorial playlists, paid advertising, and platform partnerships"; artists outside Delhi, Mumbai and Bengaluru also lack venues and studios ([The Indian Music Diaries, 26 Sep 2025](https://theindianmusicdiaries.com/who-gets-to-stay-indie-the-struggles-behind-the-indian-independent-music-scene/)).

Attention also concentrates. On YouTube, "90% of subscriptions from under 5% of channels" is a figure attributed to Citi in a note on India's creator economy by [Kotak MF, 27 Nov 2025](https://www.kotakmf.com/Information/blogs/inside-india-creator-economy) (original not opened).

The platforms are already acting in India, so the data conflicts.

- YouTube Hype launched in India in July 2025 for channels with 500 to 500,000 subscribers; smaller channels get bonus points ([BuzzInContent, 15 Jul 2025](https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785)). Meta's Edits Film Festival for India screens the top 10–20 Reels, with no cash prize stated ([Meta, 24 Aug 2026](https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/)).
- Instagram now shows new content to a small audience first, demotes aggregators, and offers Trial Reels, with a reported **80% rise in non-follower Reels reach** (company figure, global; [Social Media Today, 2 Apr 2026](https://www.socialmediatoday.com/news/instagram-allows-creators-to-schedule-trial-reels/816549/)).
- Fan discovery of music already works. Spotify logged **12.8 billion "discoveries" of unfamiliar Indian artists** in 2025 (Spotify, above). Non-film music was 43% of Indian streams in 2025 ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)).

So "fairer reach than Instagram" is a weak promise on its own. Underdawg needs a different discovery: by bookers, brands, curators and collaborators, by city and scene (inference).

CHART: india-instagram-reach — Instagram's ad reach in India roughly doubled, from 229.6 million in early 2023 to 481 million in late 2025
Type: line
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Early 2022 | 230.3 | million | DataReportal (ad reach) | Jan 2022 | https://datareportal.com/reports/digital-2022-india |
| Early 2023 | 229.6 | million | DataReportal (ad reach) | Jan 2023 | https://datareportal.com/reports/digital-2023-india |
| Early 2024 | 362.9 | million | DataReportal (ad reach) | Jan 2024 | https://datareportal.com/reports/digital-2024-india |
| Early 2025 | 414 | million | DataReportal (ad reach) | Jan 2025 | https://datareportal.com/reports/digital-2025-india |
| Late 2025 | 481 | million | DataReportal (ad reach) | Oct 2025 | https://datareportal.com/reports/digital-2026-india |

Note: DataReportal warns that revisions make figures "not comparable with equivalent figures published in previous years". Read the line as a direction, not an exact series.

CHART: india-discovery-gap — Both sides report the gap: 83% of Indian marketers struggle to find creators, and 50.4% of creators cannot find enough brand work
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Marketers struggling with influencer discovery | 83 | % | Goat/Kantar | Jun 2025 | https://www.wppmedia.com/news/influencing-with-integrity |
| Creators unaware brands tried to reach them | 62 | % | HashFame (company claim) | May 2025 | https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/ |
| Creators who lost deals to fake managers or unverified contacts | 55 | % | HashFame (company claim) | May 2025 | https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/ |
| Creators citing limited brand collaborations as main obstacle | 50.4 | % | Kofluence (company survey) | May 2026 | https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm |
| Brands preferring micro and nano influencers | 47 | % | EY | Apr 2024 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf |

Note: four different surveys with different samples. The bars show a pattern, not a like-for-like comparison.

**Outside India (background only).** No reliable Indian data exists on reach per post by account size. The only benchmark is global.

- "Small accounts get no reach" is false in the global data. A 1–5K-follower Instagram account reaches 6.65% of its followers, more than a 100K–1M account (3.50%) ([Socialinsider, 3 Sep 2026](https://www.socialinsider.io/blog/social-media-reach/)). The problem is absolute reach: the median Reel from a 1–5K account gets 580 views, against 16,035 for a 100K–1M account ([Socialinsider, 20 Feb 2026](https://www.socialinsider.io/social-media-benchmarks/instagram)).
- Instagram's head said smaller creators "haven't gotten their fair share of reach" ([Threads, 1 May 2024](https://www.threads.com/@mosseri/post/C6bd8O3xyCj?hl=en)). This is a platform-wide statement, so it covers Indian accounts too.

### AI: a government committee proposes training on Indian works with no opt-out

**Severity: high for illustrators and production musicians. Frequency: rising fast.** No Indian survey measures how many artists have lost work to AI. The Indian evidence is institutional and qualitative, and it is strong.

**The rules are moving against opt-out.**

- A DPIIT committee recommended, by majority, "a mandatory blanket license in favour of AI Developers for the use of all lawfully accessed copyright-protected works", with a statutory royalty. "The rights holders will not have the option to withhold their works." Nasscom dissented ([DPIIT Working Paper, Dec 2025](https://www.dpiit.gov.in/static/uploads/2025/12/ff266bbeed10c48e3479c941484f3525.pdf)).
- The same paper says an opt-out model "leaves small creators largely unprotected".
- Indian Instagram users got no opt-out from Meta's AI training in 2024; only EU users could object ([Social Media Today, 9 Jun 2024](https://www.socialmediatoday.com/news/meta-posts-for-ai-training-cannot-opt-out/718410/), international coverage; no Indian source was found).
- The Delhi High Court refused ANI an interim injunction against OpenAI on 24 July 2026. Its first view was that storing works for training falls under fair dealing ([MediaNama](https://www.medianama.com/2026/07/223-ani-openai-copyright-dispute-delhi-high-court-interim-relief/)). The Indian Music Industry, T-Series and Saregama had asked to join that case ([Business Today, 14 Feb 2025](https://www.businesstoday.in/technology/artificial-intelligence/story/why-t-series-saregama-sony-want-to-join-a-copyright-lawsuit-against-openai-in-india-464747-2025-02-14)).
- India's Copyright Office says AI cannot be an author ([MediaNama, 1 Sep 2026](https://www.medianama.com/2026/09/223-ai-art-copyright-india-author-dabus/)).

**Some protection exists.** Courts have protected voice and likeness: in Arijit Singh v. Codible Ventures, an AI tool that copied a singer's voice was held to violate personality rights ([FICCI-EY, Mar 2026](https://aidcf.com/wp-content/uploads/FICCI-EY-Media-and-Entertainment-Report-2026_reduced.pdf)). India's synthetic-media rules (from 20 Feb 2026) require labels on AI content, but enforcement is weak: at least 19 unlabelled AI videos circulated in the 2026 state elections ([MediaNama, Jun 2026](https://www.medianama.com/2026/06/223-10-instances-india-deepfake-rules-enforcement-failures/)).

**Working artists report harm.** Animator Nayanika Chatterjee says clients suggest AI to cut costs. Jingle writer Naveen Koomar stopped making music for months after AI displaced his work, and says clients used AI as leverage on fees ([The Established, 21 Apr 2025](https://www.theestablished.com/culture/living/who-can-really-claim-to-be-an-artist-when-the-medium-is-a-machine)). 3D artist ROHO calls AI training "a fully unethical scheme" ([Homegrown, 5 Aug 2025](https://homegrown.co.in/homegrown-voices/we-spoke-to-5-artists-about-generative-ais-place-in-the-indian-creative-landscape)). The film Raanjhanaa was re-released in August 2025 with an AI-altered ending, without the director's consent ([The Nod Mag, 19 Dec 2025](https://thenodmag.com/content/artificial-intelligence-creative-industry-backlash)).

"Artists reject AI" is too simple. **59% of Indian creators use AI tools** regularly or sometimes, and 17.3% never do ([Kofluence via MediaNews4U, 15 May 2026](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/), company survey). Kofluence's CEO earlier put the figure at 76% (IBTimes India, 8 Jul 2025). 29–30% of brands have adopted generative AI for creative work ([Kofluence via Storyboard18, 8 Jul 2025](https://www.storyboard18.com/how-it-works/creator-economy-in-india-hits-rs-3500-crore-fueled-by-ecomm-fmcg-sectors-kofluence-73457.htm), company claim).

If the DPIIT view becomes law, Indian artists will not be able to keep work out of AI training. Their lever will be registering works to receive royalties. A platform that records authorship and dates would have practical value (inference).

**Outside India (background only).** Four foreign facts are kept because India has no data on these points.

- **Lost work.** 26% of UK illustrators lost work to generative AI ([Society of Authors via EWC, Jan 2024](https://europeanwriterscouncil.eu/soa-survey-uk-ai-2024/), secondary). CISAC projects music creators could lose up to 24% of revenue by 2028; IPRS backs CISAC's call for consent and pay, but there is no India-specific estimate ([MediaBrief, 30 May 2025](https://mediabrief.com/iprs-cisac-2025-royalty-growth-ai-regulation/)).
- **Flooding.** Fully AI tracks passed 50% of Deezer's daily uploads in June 2026, yet were only 1–3% of streams. 80% of listeners want AI music labelled, and 97% could not tell it apart (Deezer-commissioned Ipsos survey; [Deezer, 21 Jul 2026](https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/)).
- **Migration.** Cara grew from 40,000 to 650,000 users in one week on a no-AI promise ([TechCrunch, 6 Jun 2024](https://techcrunch.com/2024/06/06/a-social-app-for-creatives-cara-grew-from-40k-to-650k-users-in-a-week-because-artists-are-fed-up-with-metas-ai-policies/)). It was then mass-scraped in 2026. A no-AI promise attracts artists but cannot stop scraping.
- **False accusations.** An illustrator was banned from r/Art after 100+ hours on a work, and the moderator refused to check his layer files ([BuzzFeed News, 6 Jan 2023](https://www.buzzfeednews.com/article/chrisstokelwalker/art-subreddit-illustrator-ai-art-controversy)). Any "human-made" badge needs an appeal path.

### Platform dependency: one ban erased India's largest short-video audience

**Severity: high but episodic. Frequency: rare events with long effects.** India has lived through this risk. The government banned TikTok on 29 June 2020, and creators lost their main audience overnight. The funded Indian replacements then shrank.

| Indian platform | What happened | Source |
|---|---|---|
| Josh (VerSe) | Monthly users fell from 20M (Jul 2023) to 9.4M (Jul 2024). VerSe cut about 30% of staff in May 2025 and delayed publisher payments | data.ai via [Inc42](https://inc42.com/features/verse-innovations-josh-is-fizzling-out/); [Inc42, 8 Jul 2025](https://inc42.com/features/josh-in-jeopardy-funds-run-dry-for-dailyhunt-can-ai-get-verse-back-in-rhymes/) |
| Moj (ShareChat) | Daily users fell from 9.24M (Jan 2021) to 2.16M (Jan 2023, including MX TakaTak) | Apptopia via Inc42, in [MediaNews4U, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/) |
| Chingari | FY25 revenue ₹43.6 crore, down 53.1% | [Inc42 Datalabs](https://inc42.com/company/chingari/) (indicative) |
| Koo | Shut on 3 July 2024 after raising $65 million | [Wikipedia](https://en.wikipedia.org/wiki/Koo_%28social_network%29), secondary; [Moneycontrol, 2024](https://www.moneycontrol.com/news/technology/future-salaries-can-only-be-paid-out-once-koo-finds-a-buyer-co-founder-mayank-bidawatka-12708326.html) |
| Wynk, Resso, Hungama Music | Shut down | [FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf) |

Other Indian events show the same risk.

- **Access.** Linktree was "inaccessible in India for several days" in August 2025. India was its fifth-largest market, with about 7.3 million visits in July ([TechCrunch, 18 Aug 2025](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)). Etsy paused onboarding of new Indian sellers from November 2023 to June 2025 ([ShipGlobal](https://shipglobal.in/blogs/etsy-new-sellers/), blog).
- **Pay-outs.** YouTube's revenue to Indian music fell 8% in 2025 "as the platform prioritized YouTube Shorts". On streaming, "reduced per-stream rates and higher minimum stream count thresholds reduced revenues for some creators" ([FICCI-EY, Mar 2026](https://aidcf.com/wp-content/uploads/FICCI-EY-Media-and-Entertainment-Report-2026_reduced.pdf)).
- **Regulation.** Rigi shut its core business and let go 60% of staff after "a SEBI crackdown on unregistered finfluencers" ([Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/)). UPI merchant payments above ₹2,000 carry a new fee from 15 October 2026.

This risk applies to Underdawg too. Since 4 December 2024 Instagram's APIs serve professional accounts only. Instagram's Messaging API lets an app message a user **only after that user messages first**, mostly within 24 hours, and needs Meta's app review ([Meta for Developers](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/)).

CHART: india-moj-daily-users — Moj, a funded Indian short-video app, fell from 9.24 million daily users to 2.16 million in two years
Type: line
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Jan 2021 | 9.24 | million daily active users | Apptopia via Inc42 | Jan 2021 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| Jan 2022 | 3.14 | million daily active users | Apptopia via Inc42 | Jan 2022 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| Jan 2023 (including MX TakaTak) | 2.16 | million daily active users | Apptopia via Inc42 | Jan 2023 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |

Note: third-party estimates. Company claims for the same apps were far higher and are not used.

**Outside India (background only).** One app-store rule is untested for Indian artist apps. Apple takes 30% of new Patreon memberships bought in its iOS app from November 2024 ([Patreon, 12 Aug 2024](https://news.patreon.com/articles/understanding-apple-requirements-for-patreon)). Any membership sold inside an iOS app faces the same rule.

### Pay-to-play: a 15% booking fee, a 40% art commission and paid open-mic slots

**Severity: medium. Frequency: whenever an artist promotes or sells.** No Indian survey measures how many artists pay for visibility. The evidence is the platforms' own terms.

| Where the artist pays | What it costs | Source |
|---|---|---|
| StarClinch (bookings) | 15% of the fee. ₹7.5 lakh penalty if artist and client deal directly. "StarClinch does not guarantee you any work" | [StarClinch terms](https://starclinch.com/terms-of-use) |
| Artflute (art sales) | 40% commission. The artist pays domestic shipping and packaging | [Artflute FAQ](https://www.artflute.com/artist-faqs) |
| Mojarto (art sales) | A registration fee to apply. Commission is not stated | [Mojarto seller FAQ](https://www.mojarto.com/sellerFaq) |
| Comedy open mics | The comedian pays ₹200–500 per slot (₹500–1,000 at premium venues) | [BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india) (blog) |
| BandLab Boost | ₹299 to ₹999 | [App Store India](https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775) |
| Meta Verified | ₹699 a month on mobile. Meta dropped paid "increased reach" from the product on 17 Mar 2023 | [Meta, 7 Jun 2023](https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/); [Meta](https://about.fb.com/news/2023/02/testing-meta-verified-to-help-creators/) |

Unpaid "exposure" is the other form. Opening acts "rehearse, travel, and perform" for little or nothing "in the promise of exposure" ([Rolling Stone India, 12 Sep 2025](https://rollingstoneindia.com/what-the-music-industry-doesnt-talk-about-enough-minimum-wage-for-musicians)). Smaller creators are offered products instead of money: "You can't pay bills with lipstick or perfume" (Sakshi Rawte-Dhar, 54.6K followers; The Nod Mag, 7 Aug 2026). No reliable Indian data gives the share of deals that are barter.

**Outside India (background only).** India has not yet tested the legal risk of paid reach. A US class action filed on 5 November 2025 called Spotify's Discovery Mode "modern payola" ([Digital Music News](https://www.digitalmusicnews.com/2025/11/05/spotify-accused-of-payola-in-class-action-lawsuit/)). On 30 April 2026 a judge sent the claims to individual arbitration ([Music Ally, 5 May 2026](https://musically.com/2026/05/05/spotify-discovery-mode-payola-lawsuit-to-move-into-arbitration/)). Counter-evidence: the scheme is opt-in, and Spotify claims a 106% average rise in monthly listeners (company figure). The lesson is about trust. Paid reach brings backlash and legal risk, so a Pro plan should sell tools, not ranking (inference).

### Late payment and scams: a 90-day payment cycle that stretches to a year

**Severity: high per incident. Frequency: occasional per artist, frequent across the community.** One non-payment can wipe out a job's income. No Indian survey measures what share of creators or artists are paid late. Trade press and named cases show the pattern.

**Creators.** The official payment cycle for influencer campaigns is 90 days, against a 45-day legal norm for small suppliers. Delays run up to a year. Agencies in the middle hold payments 90–120 days. Creators now ask for a 25–50% advance ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm); all sources anonymous). Named creators confirm it ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)):

- Neha Tanti (101K followers): ₹3,50,000 pending out of about ₹8,00,000 in deals. One invoice was chased for 1.5 years.
- Sakshi Rawte-Dhar (54.6K): ₹2,20,000 owed for work done 3 to 9 months earlier. She wrote off ₹20,000.
- Aarja Bedi (38.6K): ₹40,000 owed for content posted a year ago.

**Performers.** Karnataka's Department of Kannada and Culture had not paid over 1,800 artists by March 2025. Total dues were above ₹4 crore, typically ₹20,000–25,000 per performer, and some waited 2–3 years. Musician Silheiba Ningombam says fees were "delayed, only partially paid, or not paid at all" ([The Indian Music Diaries, 4 Mar 2026](https://theindianmusicdiaries.com/are-payment-delays-silencing-the-voices-of-independent-music/)). In Pune, an "agency" posted "urgent shoot" gigs and ghosted videographers "when it's time to pay", with "no contracts" (r/pune, archived, above).

**The legal remedy does not fit.** The MSMED Act requires payment within 45 days and adds compound interest. It is open only to Udyam-registered enterprises ([MSME Samadhaan](https://samadhaan.msme.gov.in/); [My Legal Pal](https://mylegalpal.com/articles/how-to-recover-payments-from-clients-in-india-msme-odr/)). Only 15.2% of creators are registered. The portal shows 2,56,892 delayed-payment applications. Two amounts are recorded: ₹55,244.31 crore to 31 December 2025 ([SMEStreet, 29 Jul 2026](https://smestreet.in/smestreet-exclusive/msme-development-amendment-bill-2026-delayed-payments-analysis-12208060)) and ₹31,692.74 crore "payable" on the portal itself on 1 October 2026 (no as-of date). The average claim is about ₹21.5 lakh (derived from the SMEStreet figures), far above an artist's invoice. A widely quoted line that "58% of freelancers" have gone unpaid names no study ([Razorpay Learn](https://razorpay.com/learn/scope-and-challenges-of-freelancers/)); it is not used here.

CHART: india-payment-delay — Brands' official payment cycle for creator campaigns is 90 days, twice the 45-day legal norm, and the worst delays reach a year
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Legal norm for paying small suppliers (MSMED Act) | 45 | days | Storyboard18 | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Official brand payment cycle | 90 | days | Storyboard18 (anonymous agency sources) | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Agency hold, upper end | 120 | days | Storyboard18 (anonymous agency sources) | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Audit disputes, upper end (8 months, approx.) | 240 | days | Storyboard18 (anonymous agency sources) | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Worst reported delays (one year) | 365 | days | Storyboard18 (anonymous agency sources) | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |

Note: creator campaigns, as described by anonymous agency sources. This is not a survey.

**Scams.** Indians reported about ₹22,500 crore of cyber-fraud losses in each of 2024 and 2025, about ten times the 2022 level. I4C said work-from-home and part-time job scams were the most-reported cybercrime of 2023 ([Global Kashmir, 4 Jan 2024](https://globalkashmir.net/work-from-home-or-part-time-job-scams-top-cyber-crimes-in-india-says-i4c/)). There is no official count of fake casting or fake brand-deal scams. Reported cases show how they work.

| Case | What the victim paid | Source |
|---|---|---|
| Mumbai, 2022: fake Instagram account of a casting director | ₹1,000 per audition | [BOOM, 19 Jan 2022](https://www.boomlive.in/explainers/bollywood-casting-director-shares-how-fake-accounts-impersonate-him-to-dupe-actors-16434) |
| Delhi, Jan 2024: fake casting director on Instagram, 15 aspiring models | ₹20,000 for a portfolio, ₹75,000 for a "selection shoot" | [The Tribune, 14 Jan 2024](https://www.tribuneindia.com/news/delhi/man-posing-as-casting-director-dupes-15-aspiring-models-in-delhi-581182) |
| Delhi, May 2025: fake music-video casting agent, at least 17 aspiring artistes | ₹20,462 from one victim for "flight bookings" | [The Tribune, 14 May 2025](https://www.tribuneindia.com/news/delhi/cyber-fraudster-arrested-for-cheating-aspiring-artistes) |
| Mumbai, Jun 2025: fake web-series "producer" on WhatsApp | ₹2,000, then ₹7,836, then a ₹40,000 blackmail demand | [Free Press Journal, 19 Jun 2025](https://www.freepressjournal.in/mumbai/mumbai-crime-18-year-old-aspiring-actress-duped-with-fake-web-series-offer-blackmailed-with-morphed-photos-case-registered) |
| Jabalpur, Oct 2025: fake copyright strikes against a creator | ₹50 lakh over about a year | [The Tribune, 23 Oct 2025](https://www.tribuneindia.com/news/trending/pay-rs-50-lakh-or-lose-instagram-page-in-a-first-influencer-with-57-million-followers-falls-victim-to-fake-copyright-scam) |

The casting cases share one method: an identity nobody can check on Instagram or WhatsApp, plus an upfront fee. Fake managers are a second route. 45% of surveyed creators said unverified managers quoted inflated rates in their name, and an estimated ₹350 crore of deals was lost in a year (HashFame via MediaBrief, company claim). Only about 2% of 2025 cyber-crime complaints became FIRs (derived from The420 figures). So prevention matters more than recourse (inference).

CHART: india-cyber-fraud-losses — Cyber-fraud losses reported in India rose about tenfold, from ₹2,290 crore in 2022 to ₹22,845.73 crore in 2024
Type: line
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| 2022 | 2290 | ₹ crore | Rajya Sabha reply via CyberPeace | 2022 | https://cyberpeace.org/resources/blogs/cyberpeace-analysis-indias-cybercrime-surge-signals-a-growing-digital-security-challenge-an-assessment-based-on-rajya-sabha-proceedings-and-mha-data |
| 2023 | 7465.18 | ₹ crore | Lok Sabha reply via Inc42 | 2023 | https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/ |
| 2024 | 22845.73 | ₹ crore | Lok Sabha reply via Inc42 | 2024 | https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/ |
| 2025 | 22495 | ₹ crore | MHA and I4C data via The420 | 2025 | https://the420.in/india-cybercrime-24pct-rise-22495cr-loss/ |

Note: all cyber fraud, not artist scams. No Indian figure for artist scams exists.

**Outside India (background only).** No Indian law like New York's Freelance Isn't Free Act was found, and no Indian survey of freelancer late payment exists. New York's record shows the limit of a law alone. Of 2,542 freelancer complaints in FY2019–23, about 86% were about late or non-payment. 49% of surveyed complainants still got nothing, and 51% of complaints were on contracts of $5,000 or less ([NYC DCWP, 1 Nov 2023](https://www.nyc.gov/assets/dca/downloads/pdf/workers/DCWP-Freelance-Isnt-Free-Act-Five-YearReport-2023.pdf)).

### Paid work: demand exists, but it flows to the top

**Severity: high. Frequency: continuous for early-career artists.** Indian demand is real and growing.

- **Brands.** 70% of brands surveyed plan to raise creator budgets 1.5–3x in two to three years ([Storyboard18 citing BCG, 4 May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm), secondary). Estimates of influencer-marketing spend conflict: EY estimated 2024 at ₹2,344 crore ([EY, Apr 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)); Goat/Kantar put 2024 at ₹3,600 crore ([WPP Media, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity)); Kofluence puts 2025 at ₹3,000–3,500 crore (MediaNews4U, 15 May 2026, company claim).
- **Live events.** The organised segment grew 44% in 2025 to ₹14,500 crore ([EY India, 24 Mar 2026](https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report)). Weddings, religious and personal events are a further ₹1,11,800 crore, which FICCI-EY calls "unaddressable" ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)). Unknown artists earn mostly in that part (inference).

But the money concentrates.

- **Brand deals.** 47% of brands say they prefer micro and nano influencers (EY, Apr 2024). Yet smaller creators are often given barter, and a creator under 10K followers gets ₹500–5,000 per Reel. 71% of brands pay a fixed fee, and there is no standard rate card (EY). No reliable Indian data gives the share of rupee spend that reaches nano and micro creators.
- **Live.** The 2025 growth came from the Kumbh Mela (₹2,500 crore of event spend) and large concerts. Concert days with 10,000 or more paid attendees rose from 75 to 130. Ticket sales "were concentrated in the top 10 Indian metros". EY expects "a slight dip in 2026", after several concerts "did not sell out and were canceled or postponed" (FICCI-EY, Mar 2026). No source gives emerging artists' share of live revenue.
- **Art.** Auctions reached ₹2,543 crore in 2025, but contemporary art was only ₹163 crore ([Business Today, 13 Sep 2026](https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13)), about 6.4% (derived).

Fees at the bottom are small. An emerging musician gets ₹3,000–15,000 for a café gig, ₹5,000–30,000 for a college fest and ₹20,000–80,000 for a corporate event ([StarClinch blog, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/); company estimates, not survey data).

The supply side is informal. Artists find work through Instagram DMs, personal networks, WhatsApp and Facebook groups, event agencies and a few booking marketplaces (StarClinch blog). "Nearly three quarters of influencer marketing spends in India still flow directly between brands and creators, outside of any organised channel" (KlugKlug figure quoted by an OpraahFx co-founder; [MediaNews4U, 4 Apr 2026](https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/); company claims). Event companies name their three problems as "unorganized competition, talent scarcity and a trust deficit" (EEMA-EY survey in FICCI-EY, Mar 2026).

The live-events market doubled in three years while small acts still report token fees and non-payment. This looks like broken matching and trust, not missing demand (inference).

CHART: india-live-events — India's organised live-events segment doubled from ₹7,300 crore in 2022 to ₹14,500 crore in 2025
Type: line
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| 2022 | 7300 | ₹ crore | FICCI-EY | 2022 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2023 | 8800 | ₹ crore | FICCI-EY | 2023 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2024 | 10100 | ₹ crore | FICCI-EY | 2024 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2025 | 14500 | ₹ crore | FICCI-EY | 2025 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2026 (estimate) | 14000 | ₹ crore | FICCI-EY | 2026E | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2028 (estimate) | 19600 | ₹ crore | FICCI-EY | 2028E | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |

Note: FICCI-EY publishes in ₹ billion; ₹1 billion = ₹100 crore. The organised figure leaves out "unorganized" event companies and personal events paid in cash. The 2025 figure includes ₹2,500 crore from the Kumbh Mela.

**Outside India (background only).** No Indian data shows how brand payments are split between large and small creators. In one global data set, the top 10% of creators got 62% of brand payments in 2025, up from 53% in 2023 ([Business Insider/CreatorIQ, 14 Jan 2026](https://www.businessinsider.com/creator-income-inequality-grows-top-earners-paydays-rise-2026-1)).

### Theft, burnout and bots: real, but thinly measured

**Art theft. Severity: medium. Frequency: unknown.** No Indian prevalence data exists. Indian artists describe copying in interviews (Viraj Khanna; 3D artist Jishnu; sources in the table above). Illustrators also lose rights by default: commissioned work can pass to the client under Section 17(b) of the Copyright Act 1957, and they vet their own contract clauses (Vaasudev, above). Instagram now drops accounts that repost others' content 10+ times in 30 days from recommendations (Engadget, above), and extended this to all formats ([PetaPixel, 30 Apr 2026](https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/)). Copyright tools can also be used against creators, as the Jabalpur fake-strike case shows.

**Burnout. Severity: medium to high. Frequency: continuous.** The Indian evidence is secondary and qualitative. One press report says about 2 lakh creators have left since 2024 amid burnout and low pay (Outlook Business citing Mint; original not opened). Creators stay silent about brand misconduct for fear of losing work (The Nod Mag, 7 Aug 2026). There is counter-evidence: 73% of creators in EY's survey work under 10 hours a week on content (EY, Apr 2024), so many are part-time.

**Bots and fake engagement. Severity and frequency: unknown for artists.** The Indian evidence is on the brand side: 74% of brands worry about fake followers (BCG via Storyboard18). Instagram bot comments ("promote it on @…"), follower-selling and "generic audience" complaints aimed at artists were **not verified**.

## 11. Why existing platforms fail artists

Each major platform fails artists differently. The common thread is misaligned incentives: each optimises for its own revenue (ads, subscriptions, fees or AI data) and treats artists as content supply (inference). In India the bigger "talent" businesses grew by serving brands and ticket buyers, not by finding work for unknown artists (inference from their own pages and Inc42 figures). But platforms do respond to organised backlash. No Indian case of a platform reversing under artist pressure was found. Outside India, Instagram rolled back changes in 2022, SoundCloud fixed its AI terms within days in 2025, and Pinterest restored wrongly banned accounts. So the claim that incumbents "cannot" fix these problems is weak.

Labels: **Common** = at least 3 independent sources. **Recurring** = 2 sources. For Indian platforms, most evidence is the company's own terms and pages, plus Inc42 Datalabs figures (indicative only). No reliable Indian data on complaint volumes was found for StarClinch or Talentrack. Items seen only in search snippets are marked "snippet-level".

### Platforms Indian artists use

| Platform | Recurring complaints | Evidence (sources, dates) | Evidence strength |
|---|---|---|---|
| Instagram (India: 481M ad reach) | Brands cannot reach small creators and creators cannot find brands; fake managers and fake casting accounts; no AI-training opt-out; video-first monetisation | 62% of creators unaware brands tried to reach them; 55%+ lost deals to unverified contacts (HashFame, company claim, May 2025); fake casting accounts in reported Mumbai and Delhi cases (2022–2024); fake copyright strikes "exploiting social media's automated systems" (Jabalpur Cyber Cell, The Tribune, 23 Oct 2025); 84.4% of creators say short-form video is their highest-monetising format (Kofluence via Storyboard18, 14 May 2026); creator marketplace is invite-only in India, with no adoption data ([TechCrunch, 21 Feb 2024](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/)) | Common (matching, impersonation). No Indian data on reach by account size. Bot comments aimed at artists: not verified |
| YouTube (India: 500M ad reach) | Pay per view is low; few small channels monetise; attention concentrated at the top; Shorts push cut music revenue | Indian creators earn USD 0.40–3 per 1,000 views (Outlook Business citing Mint, secondary); 10% of nano channels monetise against 95% of channels over 500K ([Kofluence blog, 3 May 2024](https://www.kofluence.com/blog/how-much-money-indian-creators-really-make/), company claim); "90% of subscriptions from under 5% of channels" (Citi via Kotak MF, not opened); YouTube revenue to music fell 8% in 2025 (FICCI-EY, Mar 2026). Counter: ₹21,000 crore paid in three years | Moderate. No Indian community complaints verified |
| Spotify and Indian streaming | Few listeners pay; per-stream rates fell and thresholds rose; services shut | Only 14.4M of about 178M streamers pay (FICCI-EY, Mar 2026); "reduced per-stream rates and higher minimum stream count thresholds reduced revenues for some creators" (FICCI-EY); Wynk, Resso and Hungama Music shut; JioSaavn closed its in-house indie label in 2022 ([Music Ally, 13 Aug 2025](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/)); tracks need 1,000 streams a year to earn Spotify royalties ([Spotify, 21 Nov 2023](https://artists.spotify.com/en/blog/modernizing-our-royalty-system)) | Common. Counter: Indian artists' Spotify royalties rose 29% in 2025 |
| TikTok (banned) and its Indian replacements (Josh, Moj, Chingari) | Audiences collapsed; pay-outs delayed | India banned TikTok on 29 Jun 2020, so it is not a channel; Josh 20M → 9.4M monthly users; Moj 9.24M → 2.16M daily users; VerSe delayed publisher payments (sources in section 1) | Common (decline). Not a reliable channel |
| StarClinch (booking) | 15% fee; ₹7.5 lakh penalty for direct deals; no guarantee of work; no public data on how many artists get booked | [StarClinch terms](https://starclinch.com/terms-of-use); revenue ₹2.4 crore in FY25, down 10.2% ([Inc42 Datalabs](https://inc42.com/company/starclinch/), indicative); artist count shown as "17,000+ artists across 14 categories and 450+ cities" on 1 Oct 2026 and as "10K+" on 2 Oct 2026 on the same page ([StarClinch](https://starclinch.com/our-story), company claims) | Documented in company terms. Artist complaints: not verified |
| Talentrack, IndieFolio (hiring) | Managed, brand-side services; the artist cannot be found directly | Talentrack: "50K+ artists, experts, and influencers", brand budgets from "Up to ₹2L" to "₹10L+" ([Talentrack](https://www.talentrack.in), company claim); IndieFolio is now a managed brand-to-freelancer service, not an open portfolio network ([IndieFolio](https://home.indiefolio.com)) | Inference from company pages. Complaints: not verified |
| Kofluence, Hobo.Video, WYLD (brand deals) | Rosters far exceed paid work; fees not published | Kofluence lists "750,000+ Influencers" (another part of the same page says 500,000+; [Kofluence](https://www.kofluence.com), company claim), while it estimates only 450,000–600,000 creators monetise anywhere in India; [Hobo.Video](https://hobo.video) "225,187+", [WYLD](https://getwyld.in) "100,000+" (company claims) | Inference from company claims |
| Topmate, TagMango, Graphy, Cosmofeed (storefronts) | Help only artists who already have fans; fees suit coaches, not small artists; pay-out complaints | Topmate 10–20% commission ([Topmate](https://topmate.io/pricing)); TagMango Pro ₹5,000 + GST a month plus 5.5% ([TagMango](https://tagmango.com/pricing)); Graphy ₹24,999 a year plus 10% ([Graphy](https://graphy.com/pricing)); three 1-star reviews of Cosmofeed allege blocked withdrawals ([App Store India](https://apps.apple.com/in/app/id1592830857), 2025–2026; user allegations, one venue) | Fees verified. Pay-out complaints: recurring in one venue only |
| Artflute, Mojarto, Etsy India (art sales) | High commission; slow pay-out; artist bears shipping; onboarding paused | Artflute 40%, artist pays domestic shipping, paid within 15 working days of delivery; Mojarto pays within 21 working days; Etsy paused new Indian sellers Nov 2023–Jun 2025 (sources in section 1) | Documented in company FAQs. Artist complaints: not verified |
| LinkedIn (India: 170M members) | — | **No reliable public data found** on artists' complaints. 24.1% of brands prioritise LinkedIn for influencer work (Kofluence via Storyboard18, 14 May 2026). That it is weak for performers and visual artists is an inference only ([DataReportal](https://datareportal.com/reports/digital-2026-india)) | Not verified |
| Informal channels (Instagram DMs, WhatsApp groups, agencies) | No contracts; ghosting at payment; scams; middlemen | r/pune "urgent shoot" thread (4 Jun 2025, archived); [r/Chennai thread on DM paid collaborations, 12 Apr 2025, archived](https://web.archive.org/web/20250706091905/https://www.reddit.com/r/Chennai/comments/1jx7bfr/whats_really_happening_with_dm_paid_collaborations/); Hire4Event takes briefs of ₹1 lakh–₹20 lakh+ and books artists itself ([Hire4Event, 8 Jul 2026, archived](https://web.archive.org/web/20260708083739/https://www.hire4event.com/)) | Recurring. The real incumbent Underdawg must beat on trust |

### Outside India (background only)

These global platforms are open to Indian artists, but no Indian complaint data was found for them. Each row is kept for one lesson.

| Platform | Recurring complaints | Evidence (sources, dates) | Evidence strength |
|---|---|---|---|
| Behance | Scams via messages and job posts; low-paid jobs; poor support | Trustpilot 1.6/5 from 46 reviews: $500 scam loss, "$5–$10 per hour" jobs ([Trustpilot](https://www.trustpilot.com/review/www.behance.net), small negative sample). Pays Indian users through PayPal ([Behance Help](https://help.behance.net/hc/en-us/articles/13824610641179-FAQ-Why-isn-t-my-country-supported)) | Likely common, partly verified; treat as moderate |
| Dribbble | Contact-gating; mandatory fees; bans | From 17 Mar 2025 designers could not share contact details until clients paid via Dribbble; **"dozens" banned**, including a designer with 210,000+ followers ([TechCrunch, 4 Aug 2025](https://techcrunch.com/2025/08/04/a-top-designer-was-banned-from-dribbble-now-hes-building-his-own-competitor)). It shows the backlash that contact-gating can bring; India has not tested this | Common |
| DeviantArt | AI opt-in by default | DreamUp opted all art into AI training; reversed within days ([Popular Science, Nov 2022](https://www.popsci.com/technology/deviantart-ai-generator-dreamup/)) | Common (AI distrust) |
| ArtStation | AI images in trending; trending favoured big accounts | Dec 2022 "No to AI" protest ([Kotaku, 13 Dec 2022](https://kotaku.com/artstation-ai-art-generated-images-epic-games-protest-1849891085)); AI-training protection made default only on 2 Sep 2026 ([ArtStation Magazine](https://magazine.artstation.com/2026/09/ai-updates-from-artstation/)) | Common (AI) |
| SoundCloud | AI-training terms; "fair shot" tools behind paid tiers | Terms revised after May 2025 backlash ([Digital Music News, 14 May 2025](https://www.digitalmusicnews.com/2025/05/14/soundcloud-ai-training-terms/)); First Fans gated by $3.25 and $8.25/month tiers ([MBW, 17 Dec 2024](https://www.musicbusinessworldwide.com/soundcloud-launches-3-25-a-month-artist-tier-targeting-emerging-and-aspiring-musicians/)) | Common (AI terms), fixed within days |
| Pinterest | AI content flooding feeds; mass false bans | AI "slop" ([404 Media, 19 Feb 2026](https://www.404media.co/pinterest-is-drowning-in-a-sea-of-ai-slop-and-auto-moderation/)); wrongly banned accounts restored ([Slashdot citing The Verge, 2 May 2025](https://it.slashdot.org/story/25/05/02/1724245/pinterest-users-left-confused-by-mass-account-suspensions)) | Common |
| Patreon | Apple's 30% in-app fee; helps only artists who already have fans | Apple told Patreon to move creators to in-app purchase by 1 Nov 2026 ([TechCrunch, 28 Jan 2026](https://techcrunch.com/2026/01/28/apple-tells-patreon-to-move-creators-to-in-app-purchase-for-subscriptions-by-november/)). Terms for Indian creators were not verified | Common (Apple fee) |
| Cara | Audience is mostly other artists; no way to earn; scraped despite anti-AI promise | "Other creatives aren't my clients" ([Creative Boom, 6 Jun 2024](https://www.creativeboom.com/resources/everyones-talking-about-cara-but-is-it-any-good/)); scrapes of 12M images and 9M URLs ([Cara blog, 27 Aug 2026](https://blog.cara.app/blog/scraping-legal-fund-faq)). The closest test of an artists-only network | Recurring (2 sources) |
| Saatchi Art | No sales, low visibility; paid "Sponsored Listings" ([Saatchi Help](https://support.saatchiart.com/hc/en-us/articles/47701155135003-Getting-Started-with-Saatchi-Art-Sponsored-Listings)) | Six threads on Saatchi's own forum, Mar–Sep 2026: "all these years of consistency, yet no sales, no promotion" ([Saatchi forum](https://support.saatchiart.com/hc/en-us/community/posts/48436730698523-Why-no-sales)); many posters appear to be South Asian (inference) | Recurring (one forum) |

**Which complaint types the evidence supports.** Across all sources, evidence is strong for poor organic reach, algorithm changes, big accounts dominating, pay-to-play, AI content and AI training without consent. It is moderate for weak networking, poor career opportunities, poor still-image presentation and overcrowding. The Indian evidence has a different shape. It is strongest for weak access to paid work (reported by both creators and brands), platform dependence and AI training without consent (policy record). It rests on trade press and named cases for late payment and scams, and on company terms for pay-to-play fees. No Indian data exists on organic reach by account size. Evidence is **not verified** for bots and engagement bait aimed at artists, "generic audiences", missing collaboration tools and lack of community. Do not present these four as proven.

### Weaknesses Underdawg can realistically exploit

The "What Underdawg could do" column is a hypothesis, not a validated plan.

| Incumbent weakness | Indian evidence | Why incumbents are unlikely to fix it soon | What Underdawg could do | Caveat |
|---|---|---|---|---|
| Unsafe, low-quality opportunity layer | Fake casting agents in four reported cases; 55%+ of creators lost deals to fake managers or unverified contacts (HashFame, company claim); job scams were the most-reported cybercrime of 2023 (I4C); Pune "urgent shoot" thread | Social apps do not vet commercial counterparties; job boards earn from posting volume | Verified brands, agencies and bookers; briefs with budgets shown; one-tap scam reports; a "never pay to audition" rule | Needs demand-side users; moderation cost; liability if a "verified" client defaults |
| Non-payment and informality | 90-day payment cycles that reach a year; Karnataka owed 1,800+ artists; 15.2% of creators registered; MSME remedy needs Udyam | Social platforms are not party to the deal; booking marketplaces charge 15% and penalise direct deals (StarClinch) | Simple contracts, GST-ready invoices, UPI deposits, payment records as proof of track record | Indian escrow must run through an RBI-authorised payment aggregator; disputes cost money; deals may move off-platform |
| Charging for reach or access to artists | StarClinch's 15% and ₹7.5 lakh penalty; Artflute's 40%; paid open-mic slots; outside India, Dribbble's bans and the Discovery Mode suit | Their business models depend on these fees | Never sell ranking or contact access; charge for tools or a clear booking fee | Lower short-term revenue; must explain why ₹299 Pro is not pay-to-win |
| AI consent and provenance gap | DPIIT proposal with no opt-out; no Meta opt-out in India; labelling rules weakly enforced; clients using AI to cut fees | Incumbents train on content or sell AI tools; they prefer labels to bans | No training on or licensing of artist content; AI-assisted labels; optional "process-verified" badge with appeals; dated authorship records | Cannot protect content mirrored from Instagram; Cara was scraped; a blanket ban alienates the 59% of creators who use AI tools |
| Discovery built for engagement, not opportunity | 83% of marketers struggle to find creators; 50.4% of creators cannot find enough brand work; 62% never saw brands' approaches | Feeds optimise watch time and ads, not matching artists with buyers | Search by discipline, city, budget, availability and verified credits; rotation for new artists | Needs demand-side users; Instagram copies features fast (Trial Reels) |
| Instagram sidelines still images and portfolio context | 84.4% of Indian creators say short-form video monetises best (Kofluence, company survey). Outside India: 2022 petition against the video pivot passed 170,000 signatures ([Deseret News, 27 Jul 2022](https://www.deseret.com/entertainment/2022/7/27/23279691/instagram-changes-user-feed-copying-tiktok-kim-kardashian-kylie-jenner-video-post-petition-recommend/)) | Instagram is video-first | Portfolio pages with series, process, credits and rates, built from Instagram posts | **Not a gap on its own**: Behance, Cara and ArtStation host portfolios well |

### Structural problems Underdawg cannot fix

| Structural problem | Indian evidence | Implication for Underdawg |
|---|---|---|
| Attention lives on Instagram and YouTube | 481M and 500M ad reach in India; India's own short-video apps lost users to Reels and Shorts (inference) | Be a complement that turns attention into outcomes (bookings, commissions, credibility), not a new audience destination |
| Oversupply against paying demand | Influencers up from 9.6 lakh to 40.6 lakh in four years; only 8–10% monetise effectively; Kofluence's roster exceeds all monetising creators | Promise outcomes carefully; target segments with paying demand (weddings, college and corporate events, commissions, brand content) |
| "Rich get richer" in any engagement-ranked system | "90% of subscriptions from under 5% of channels" (Citi via Kotak MF, not opened); Post-War and Modern art took ₹2,348 crore of ₹2,543 crore at auction | Underdawg's own ranking will concentrate attention unless fair-exposure rules exist from day one |
| Dependence on Meta APIs and Apple's in-app rules | Basic Display API shutdown; user-initiated DMs only; Linktree's outage in India; outside India, Apple's 30% on Patreon | Keep core value portable (profiles, bookings, payment history, contacts); do not make DM automation the moat |
| AI flood and scraping | Labelling rules weakly enforced (19 unlabelled AI videos in the 2026 state elections); DPIIT proposes no opt-out; outside India, Cara was scraped | Promise transparency and verification, not exclusion |
| Low willingness to pay and informality in India | 8% of music streamers pay; about 85% of creators unregistered; the Indian creator businesses with revenue charge a brand or a learner, not the unknown creator (inference from Inc42 figures) | Test ₹299/month against a booking fee; the free tier must deliver outcomes |
| Top-heavy paid demand and adversarial scams | Live growth led by the Kumbh Mela and large concerts; contemporary art about 6.4% of auctions; ₹22,495 crore of cyber fraud in 2025 | Focus on long-tail paid markets; budget trust and safety as a core cost |

**The current plan does not yet exploit these weaknesses.** Link-in-bio, DM automation, Art Shop, tips, Fan Club and downloads all reach people who already know the artist, and Instagram's API only allows replies after a user messages first. These tools deliver value roughly in proportion to an existing audience, so the already-popular gain most (inference). Without an in-app discovery surface, Underdawg leaves discovery to Instagram's algorithm, which Instagram admits favoured large accounts. Only Hire Artists, Gigs and Bookings can create discovery, and only if brands and bookers are on the platform and ranking is by fit, not followers. As planned, the product helps the already-discovered more than the under-discovered. That inverts the core goal.

## 12. Market gap analysis

A real gap needs an evidenced artist problem and evidence that competitors do not already solve it well. Several popular assumptions fail the second test; they are marked **"No clear gap"**. Indian solutions are listed first in each row. The last column is a hypothesis.

| Artist Problem | Existing Solutions | Why Current Solutions Fail | Market Gap | Underdawg Opportunity |
|---|---|---|---|---|
| New work gets no first audience | In India: YouTube Hype (since Jul 2025); Instagram small-audience-first ranking and Trial Reels; Meta's Edits Film Festival; JioSaavn "ArtistOne Finds" (30 songs, picked from artist submissions). Outside India: SoundCloud First Fans | The first audience is fans, not opportunity-givers. The Indian programmes are leaderboards, contests and one playlist, not paid work. SoundCloud gates it by paid tier. No controlled evidence of effect is published | **Partial gap.** A fan "first audience" is now standard. A free, cross-discipline first audience that includes curators, bookers and brands does not exist | Fair-exposure queue with newcomer bonus, exposure caps and rotation. Requires an in-app discovery surface, which the plan lacks |
| Being found by people who pay | In India: StarClinch, Talentrack, IndieFolio; Kofluence, Qoruz, Hobo.Video, WYLD; Instagram creator marketplace (invite-only since Feb 2024, [TechCrunch](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/)). Outside India: Behance, Dribbble, Contra | Indian players are managed agencies, brand-side databases, or charge 15% ([StarClinch](https://starclinch.com/terms-of-use)). Search uses audience data, so it favours followers. 83% of Indian marketers still struggle to find creators. No Indian adoption data exists for Instagram's marketplace; early US testers said it was "failing to deliver brand deals" ([Business Insider, 29 Sep 2022](https://www.businessinsider.com/influencers-testing-instagram-creator-marketplace-waiting-brand-deals-money-2022-9)) | **Real but unproven.** No cross-discipline, India-local search ranked by fit rather than followers was found | Search by skill, style, city, language, availability and budget, with verified credits. Demand-side willingness is untested |
| Finding trustworthy paid work | In India: StarClinch (jobs board; describes "secure, escrow-style payments", a company claim recorded on 1 Oct 2026 and not found on the pages opened on 2 Oct 2026); agencies such as Hire4Event; city "Scam Alert" threads. Outside India: Behance and Dribbble jobs; Fiverr, Upwork; Collabstr (payment held until done); FYPM brand reviews | Fake casting agents and fake managers work through Instagram and WhatsApp, where nobody is verified. No India-specific, artist-focused source of brand reviews or rates was found. FYPM is influencer-focused and US-centred. **Escrow itself is not a gap: StarClinch describes it in India, and Collabstr runs almost the same workflow abroad** | **Partial gap:** verified opportunity-givers plus artist-specific scam and rate knowledge for India | Verified briefs and gigs tied to artist profiles, with scam alerts and rate checks |
| Getting paid on time | In India: MSME Samadhaan (needs Udyam); advances of 25–50%; StarClinch's escrow-style payments. Outside India: New York's freelancer law; escrow on Dribbble, Contra, Collabstr | Most Indian artists are informal (15.2% registered). Booking marketplaces charge high fees or penalise direct deals. Holding funds in India needs an RBI-authorised aggregator | **Partial gap:** light contracts, deposits and GST-ready invoices for informal artists. StarClinch already covers part of this for performers | Booking and commission flow with UPI deposits through an authorised aggregator |
| Opportunities (open calls, grants, competitions) are scattered | In India: India Foundation for the Arts (grants, on its own site, [IFA](https://indiaifa.org/india-foundation-arts.html)); India Art Fair (133 exhibitors in 2026 per the fair, [Art Info India](https://artinfoindia.com/india-art-fair-2026-returns-with-record-breaking-133-exhibitors-in-new-delhi/); 135 per [ArtAsiaPacific](https://www.artasiapacific.com/market/durability-in-the-global-circuit-india-art-fair-2026/)); Kyoorius (advertising and design); college fests; festivals. Outside India: ArtConnect (100,000+ artists, self-reported), CaFÉ | Each Indian source sits on a separate site. ArtConnect's India filter showed opportunities in the US, France and Iceland ([ArtConnect](https://www.artconnect.com/opportunities?country=IN)). Talenthouse stopped paying creatives in 2023 ([Wikipedia](https://en.wikipedia.org/wiki/Talenthouse), secondary), which shows why organisers must be verified | **Plausible but unproven.** No India-first, cross-discipline, fee-transparent board was found | Board with verified organisers, a "free to apply" filter and one-click apply. Needs listing partners |
| Reaching gatekeepers costs money | In India: JioSaavn "ArtistOne Finds" (artists submit directly); India Art Fair's selection committee; open mics where the comedian pays ₹200–500 a slot. Outside India: Groover (€2 per curator, [Groover](https://groover.co/en/)); SubmitHub (31% approval, [SubmitHub](https://www.submithub.com/help)); free Spotify editorial pitching | Outside India, artists pay per pitch, which carries a payola stigma. No Indian or visual-art curator marketplace was found | **Gap in India and outside music.** Global music curator access is well served | Curator review queue paid for by the platform, fans or brands, with response deadlines and rotation |
| AI consent and human-made proof | In India: IT Rules labels on AI content (from 20 Feb 2026); personality-rights rulings; contract clauses. No Indian platform was found that verifies human-made work. Outside India: Cara (no AI); Bandcamp ban (Jan 2026); ArtStation NoAI default (Sep 2026); C2PA and Adobe Content Credentials | Indian labelling rules are weakly enforced; no Meta opt-out in India; the DPIIT proposal removes opt-out. Cara was scraped; detection is fragile; false accusations harm humans | **Partial and closing.** Many players are moving; Instagram's head says it will be "more practical to fingerprint real media than fake media" ([Music Ally, 5 Jan 2026](https://musically.com/2026/01/05/instagram-boss-authenticity-is-becoming-infinitely-reproducible/)) | Consent-first policy plus a process-verified badge with appeals, usable as a buyer filter. A window, not a moat |
| Pay-to-play visibility | In India: BandLab Boost (₹299–₹999); paid open-mic slots; registration fees on art marketplaces. Outside India: Spotify Discovery Mode, SoundCloud tiers, YouTube paid-hype tests, Saatchi Sponsored Listings | It erodes trust and draws legal challenges | **Positioning gap, not a product gap.** No checked competitor brands itself on "no pay-for-reach" | A published fairness policy. It limits how Pro can be sold |
| A booker finding an unknown local act | In India: StarClinch; agencies (Hire4Event); BookMyShow (34,086 events listed in 2025, [Music Ally](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/)) and District; college fests | BookMyShow and District sell tickets to fans; they do not match bookers with acts. Event companies report "talent scarcity and a trust deficit" (FICCI-EY, Mar 2026). No survey shows how Indian organisers find artists | **Plausible, untested.** The booker-to-unknown-artist direction is unserved | City and scene pages; booker search by city, genre and budget. Needs venue and fest partners |
| Collaborators across disciplines | In India: Songdew (music; "collaborate, create, publish", [Inc42](https://inc42.com/company/songdew-media/)); BandLab (music; Pro at ₹1,499 a month in India). Outside India: Vampr; Behance co-owners | Single-discipline | **Least evidenced need.** No survey measures it | Validate before building |
| Earning from fans (tips, shop, memberships, downloads) | In India: Topmate, TagMango, Cosmofeed, Exly, Graphy; Instagram and YouTube memberships. Outside India: Linktree, Beacons, Stan, Patreon | Linktree's earning features exclude India ([Linktree](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features)), but Indian UPI storefronts already fill that gap (Topmate charges 10–20%, [Topmate](https://topmate.io/pricing)) | **No clear gap.** Useful only for artists who already have fans | Downstream conversion, not a differentiator |
| Link-in-bio, portfolio hosting, DM automation, fan music discovery | In India: Zorcha (60K+ creators, free DM automation), InstantDM (30K+), ReplyKaro (from ₹99 a month) (company claims); Spotify (12.8B discoveries of Indian artists). Outside India: Linktree, Beacons; Behance, Cara, ArtStation | These broadly work | **No clear gap** | Hygiene features only |

**Where the real gap is.** The strongest gap is the trust-and-transaction layer for emerging artists' paid work, joined to discovery by the people who pay, especially in India. Indian official and press sources document the harm there: the MSME Samadhaan rules, Home Ministry cyber-fraud data, police cases against fake casting agents, and unpaid government dues to performers. Incumbents have conflicting incentives to fix it. In India the pieces exist but sit with different companies: Topmate for money tools, StarClinch for escrow-style bookings, Talentrack and IndieFolio for brand hiring, Zorcha and InstantDM for DM automation. The Indian competitor scan found no company that combines artist-only discovery, verified Instagram stats, brand hiring with payment protection and artist peer boards (inference from that scan). It also found no flat-fee artist plan like ₹299 Pro; incumbents take commission instead.

**Why the gap may be empty.** It needs a two-sided network. Demand-side users (brands, bookers, curators) are hard to recruit. India shows this: StarClinch's revenue was about ₹2.4 crore in FY25, ten years after launch (Inc42 Datalabs, indicative), and Kofluence lists more creators than monetise anywhere in the country. Outside India, Cara shows what an artists-only network looks like without buyers: "all creatives sharing with each other" ([Creative Boom](https://www.creativeboom.com/resources/everyones-talking-about-cara-but-is-it-any-good/)). Instagram also copies features fast, so features alone are not a moat. The key question is still open: **would Indian brands, agencies, wedding planners and curators use an artists-only platform to find and hire talent?** No evidence answers it yet. There is also no evidence on how often artists move bookings off-platform, or on Indian artists' willingness to pay for tools. These need direct testing before the gap is treated as proven.

---

## The Instagram layer: two features to build early, four to hold back

Only two of the six Instagram-layer features should be built early. The first is the **Instagram-connected profile**, built as "import and curate", not as a mirror. The second is a **narrow link-in-bio page** that carries a verified brand view and UPI payments. The verified credibility card from Feature 2 belongs inside that brand view. **Scheduling and DM automation should wait.** They are crowded, cheap or free in India, and heavily exposed to Meta. Templates should be folded into the link page and the Pro plan. A designer template marketplace only makes sense at a large scale.

The most important finding is negative. **None of the six features creates discovery for unknown artists on its own.** They convert or manage an audience the artist already has on Instagram. In India that audience is large. Instagram reached 481 million people in India in October 2025, and it is the primary platform for 3.3–3.7 million of India's 4.0–4.4 million active creators (Kofluence, a company report). But 61.1% of those creators are nano creators with 1,000–10,000 followers. Several of the six features favour accounts that are already big by default: follower displays, follower-based pricing, and DM automation that scales with comment volume.

Instagram already offers native versions of most of these tools in India: 5 bio links, in-app scheduling, Insights, keyword automations, free templates, and a brand-facing creator marketplace that has invited Indian creators and brands since February 2024. Indian tools cover the rest at very low prices. ReplyKaro starts at ₹99 a month. Zorcha gives unlimited DM automation free. Topmate and SuperProfile sell link pages with rupee checkout. So Underdawg must put its own value where Meta and the Indian tools do not: fair, artist-specific discovery by brands, curators and collaborators; peer benchmarks; owned fan contacts; and a flat rupee price.

**Evidence limits.** Indian evidence in this part comes from company reports (Kofluence, HashFame), industry surveys (EY, BCG, Goat/Kantar), Indian trade press, government releases, official pricing pages and Apple's India App Store catalog. Kofluence sells influencer marketing, and several findings rest on its reports alone. No audited user numbers exist for any Indian tool named here. No Indian survey asks artists about any of these six features. Reddit and Google Play could not be accessed, so "common complaint" labels rest on App Store and Trustpilot reviews, not artist forums. Tags: [VERIFIED] means the primary page was opened. [REPORTED] means press or a secondary source. [COMPANY CLAIM] means a company's own number or survey. [INFERENCE] means analysis, not a sourced fact.

---

### Feature 1 — Instagram-connected profile

**Verdict:** Modify · **Priority:** BUILD EARLY · It is the cheapest fix for the empty-profile cold start and the content inventory any discovery layer needs, but it differentiates nothing as a plain mirror, so it must become "import, curate and tag".

**1. Problem being solved**

A new platform starts empty. The artist must re-upload work that already lives on Instagram. A synced profile removes this double work.

**Indian artists already keep their work on Instagram.**

- Instagram is the primary platform for **3.3–3.7M of 4.0–4.4M active Indian creators** ([Kofluence "Decoding Influence 2026" via The Wire, 2026-05-14](https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age)) [COMPANY CLAIM]. Kofluence's 2025 report counted 1.8–2.3M Instagram creators out of 3.5–4.5M ([IBTimes India, 2025-07-08](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [COMPANY CLAIM]. The definitions changed between the two reports, so the two figures are not a growth trend.
- Instagram's ad reach in India was **481M in Oct 2025** (32.8% of the population), up 22.9% year on year ([DataReportal, 2025-11-05](https://datareportal.com/reports/digital-2026-india)) [REPORTED].
- Brands look there first. 93.1% of brands name Instagram as their top influencer platform ([Kofluence 2026 via Storyboard18, 2026-05-14](https://www.storyboard18.com/amp/how-it-works/93-brands-prioritise-instagram-as-84-creators-monetise-best-through-short-form-video-kofluence-report-98028.htm)) [COMPANY CLAIM]. Goat/Kantar puts the figure at 98% ([MediaBrief, 2025-06-24](https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/)) [REPORTED].
- Most creators are small: 61.1% are nano (1,000–10,000 followers) and 32.5% are micro (10,000–100,000) ([Kofluence 2026 via Storyboard18, 2026-05-14](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [COMPANY CLAIM].

**How bad is the problem?**

- **Severity:** moderate [INFERENCE]. It is a convenience, not an acute pain. No Indian survey measures it.
- **Frequency:** once at onboarding, then passive.
- **Segments most affected:** visual artists, illustrators, photographers, designers, dancers and fashion creatives whose main portfolio is Instagram. Musicians are less affected, because their work lives on YouTube and streaming apps [INFERENCE].

**Still images are losing ground.** 84.4% of Indian creators say short-form video (Reels, Shorts) is their highest-monetising format ([Kofluence 2026 via Storyboard18, 2026-05-14](https://www.storyboard18.com/amp/how-it-works/93-brands-prioritise-instagram-as-84-creators-monetise-best-through-short-form-video-kofluence-report-98028.htm)) [COMPANY CLAIM]. Illustrators, painters and photographers work in a format the platform rewards less [INFERENCE]. No reliable Indian data exists on reach per post by format or by follower tier.

**Only professional accounts can be connected.** Meta switched off its consumer Instagram API on **4 Dec 2024, after 90 days' notice**; from that day "all Instagram Basic Display API requests will fail" ([Meta for Developers, 2024-09-04](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/)) [VERIFIED]. This rule applies in India as everywhere. Share of Indian artists on personal accounts: no reliable public data found.

**Current workarounds in India:** the Instagram profile itself; a portfolio site from Pixpa, an Indian-founded builder; Linktree's Instagram app; manual uploads to Behance or ArtStation. **Why they fall short:** widgets only mirror the feed and add no credibility, discovery or opportunity layer. Website builders cost money and need upkeep (Pixpa ₹200–₹600/month billed yearly on a 50% offer, regular prices ₹400–₹1,200, [Pixpa](https://www.pixpa.com/pricing)) [VERIFIED]. Indian creator marketplaces (Kofluence, Hobo.Video) are brand-led and show no Instagram-synced public artist portfolio ([kofluence.com](https://www.kofluence.com/); [hobo.video](https://hobo.video/)) [VERIFIED].

**2. Competitors**

*In India (Indian companies, and Meta or global tools with verified Indian availability or rupee prices)*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Instagram creator marketplace (Meta) | US; **India invited since 21 Feb 2024** | Brands see creator profiles built from first-party data | Brands filter by engaged-audience demographics, message creators, post briefs; API shows 30-day growth, engagement, partnership history | Brands; invited creators | Free | Invitation-based in India; no Indian adoption data found; brand API limit raised 240 → 1,000 queries/user/hour (2026-03-30) | Native, authoritative data | Onboarding rules not documented; project briefs in India unverified | Meta's own brand-facing verified profile; the strongest substitute | [TechCrunch 2024-02-21](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/); [afaqs, Feb 2024](https://www.afaqs.com/news/social-media/instagram-creator-marketplace-launches-in-india) [REPORTED]; [Meta API doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md) [VERIFIED] |
| Kofluence | India (Bengaluru, 2019) | Creator app with verified stats and campaign payments, inside an influencer platform | AI matchmaking for brands; how Instagram connects is not stated | Brands, creators | Not disclosed | "750,000+ influencers" (page also says "500,000+") [COMPANY CLAIM]; revenue ₹52.5 crore in FY25 (Inc42 Datalabs, indicative); $4M pre-Series A led by Nikhil Kamath (Feb 2022) | Large Indian network | Inconsistent counts | Brand-campaign marketplace, not an artist portfolio | [kofluence.com](https://www.kofluence.com/) [VERIFIED]; [Inc42](https://inc42.com/company/kofluence/); [Entrackr, Feb 2022](https://entrackr.com/2022/02/kofluence-raises-4-mn-in-pre-series-a-round) [REPORTED] |
| Hobo.Video | India (Delhi) | Influencer and UGC marketplace with a creator database | Brief → match ("144 data points") → campaign | Brands | No prices shown | "225,187+" influencers, "12,000+ brands" [COMPANY CLAIM] | Indian roster | Brand-led | No public artist portfolio | [hobo.video](https://hobo.video/) [VERIFIED] |
| Pixpa | India (founded 2013 by Gurpreet Singh) | Portfolio site builder; no Instagram-feed feature listed | Templates, client galleries, zero-commission store | Photographers, artists, designers | ₹200 / ₹300 / ₹400 / ₹600 per month, billed yearly (50% offer; regular ₹400–₹1,200) | "200+ premium templates" | Rupee pricing | Manual upkeep | Underdawg would fill itself from Instagram | [pixpa.com/pricing](https://www.pixpa.com/pricing); [Pixpa About](https://www.pixpa.com/about) [VERIFIED] |
| Linktree (Instagram Link App) | Australia; sold in India in rupees | Shows Instagram posts and Reels on a link page | Marketplace "Link App": "Display your posts and reels" | Creators, businesses | Free tier; India Starter ₹360, Pro ₹650, Premium ₹1,450 per month (app's plan not verified) | iOS 4.67 from 1,426 ratings in India; about 7.3M Indian visits in July 2025 | Huge base | Unreachable in India for several days in Aug 2025 | Generic link page; no artist network, verification or opportunity layer | [linktr.ee/marketplace](https://linktr.ee/marketplace) [VERIFIED]; [TechCrunch 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/) [REPORTED] |

*Outside India (background only)*

| Platform | Country | Similar Feature | Why it still matters | Source |
|---|---|---|---|---|
| Beacons — Auto-Updating Media Kit | US | Media kit filled from connected social accounts, with rate cards and past projects | Closest existing "brand view" with synced stats. No UPI seen; iOS 3.88 from only 8 ratings in India; Trustpilot 2.0/5 (42 reviews) with support, payout and domain lock-in complaints | [beacons.ai/i/pricing](https://beacons.ai/i/pricing) [VERIFIED]; [Trustpilot](https://www.trustpilot.com/review/beacons.ai) [REPORTED] |
| Feed widgets (SnapWidget, LightWidget, Smash Balloon, Spotlight, Behold) | Not verified | Instagram feed on any website | Personal-account feeds broke on 2024-12-04, and the app Day One lost what it called "a beloved feature". Shows what happens to a plain mirror when Meta changes the API. No Indian case was found | [SnapWidget](https://help.snapwidget.com/en/articles/9952836-deprecation-of-the-instagram-basic-display-api); [LightWidget](https://lightwidget.com/basic-display-api-deprecation); [behold.so](https://behold.so/) [VERIFIED]; [TechCrunch, 2024-12-06](https://techcrunch.com/2024/12/06/instagram-locks-out-developers-of-third-party-consumer-apps) [REPORTED] |

**No Indian company was found that combines artist-only discovery with verified Instagram stats** [INFERENCE]. Topmate, Zorcha and StarClinch offer no profile built from real Instagram posts ([topmate.io](https://topmate.io); [zorcha.com](https://zorcha.com); [starclinch.com](https://starclinch.com)) [VERIFIED]. The search was not exhaustive. Instagram import on Behance, ArtStation, Cara, VSCO, The Dots and Contra was not verified.

**3. Uniqueness**

**Classification: Common as a component, rare as a combination.**

**Functional:** grid mirroring is common (Linktree, widgets); brand-facing verified profiles exist (Meta's creator marketplace in India, Kofluence's creator app). **Audience:** no artists-only version found in India. **Workflow:** "log in with Instagram, profile ready" is useful but easy to copy. **Network:** none for a single profile; value appears only if synced work feeds cross-artist search. **Data:** owner-authorised media and insights by discipline and city would be unique, but whether Meta's Platform Terms allow ranking with it was **not verified**. Kofluence, Qoruz and Meta itself also hold engagement data, which limits this edge [INFERENCE]. **Discovery:** enabler only. **Combination:** sync + verified stats + brand view + discovery index is rare; Meta's creator marketplace is the closest brand-side substitute.

**4. Artist value**

**Meaningful:** a presentable portfolio for brands and curators with no extra work; a base for being found by discipline, style and city; proof of account ownership through OAuth, which reduces impersonation. Impersonation costs Indian creators real money: in a HashFame survey of "over 32,000 top creators", 55%+ said they lost brand deals because there was no verified contact route or because fake managers represented them ([MediaBrief, 2025-05-27](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [COMPANY CLAIM; method not disclosed]. **Vanity:** large follower numbers on the profile. For under-discovered artists, small numbers signal weakness and can put brands off [INFERENCE].

**5. Discovery impact**

The profile exposes no one to new people by itself; it supplies the content a discovery layer ranks. Search, style, skill and local discovery depend on structured tags (discipline, medium, city), because Instagram captions are noisy. Brand and curator discovery can be strong when combined with a brand view.

**Popularity bias is the main danger.** Indian creators report that brands "allocate larger budgets to creators with larger followings and give smaller creators barter collaborations" ([The Nod Mag, 2026-08-07](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [REPORTED]. Instagram itself admitted that "creators with large followings and aggregators of reposted content have gotten more reach in recommendations than smaller, original content creators" ([Engadget, 2024-04-30](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html)) [VERIFIED]. If Underdawg ranks synced work by followers or likes, it imports that bias.

**City tags have a commercial case in India.** Kofluence reports that a Tier-2 campaign costs ₹1.3–1.6 lakh against ₹3.8–4.5 lakh in metros, with higher engagement (3.5–4.5% against 3–4%) ([MediaNews4U, 2026-05-15](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/)) [COMPANY CLAIM].

**Fair-discovery mechanisms** [INFERENCE]: rank by reach-normalised resonance (Feature 2); hide follower counts in brand search by default; reserve exposure for artists under 1K–5K followers and rotate it; let curators tag works, not accounts; sort brand searches by skill, discipline and location fit, not size.

**6. Artist behaviour**

[INFERENCE] Artists use it to get a profile instantly, once at onboarding, then check it occasionally. They create no content for it; they create for Instagram. They return only if something happens on Underdawg, such as brand profile views or inquiries. Invites are unlikely, and external sharing happens through the link page (Feature 4). **Loop:** more artists → richer search for brands → more inquiries → more artists. This loop needs a brand and curator demand side that these six features do not create.

**7. Role:** activation (primary); acquisition (Instagram login lowers sign-up friction); the foundation that discovery is built on.

**8. Risks and how competitors handle them**

**Meta dependence is high.** The Instagram API with Instagram Login (launched 2024-07-23) serves only "Instagram professionals — businesses and creators"; it needs no Facebook Page ([Meta docs](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login.md)) [VERIFIED]. It returns `followers_count` and `media_count`. Long-lived tokens last **60 days**, so silent reconnect failures are likely ([Meta get-started](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started.md)) [VERIFIED]. A multi-account app needs **Advanced Access through App Review**, with screencasts in an English UI ([Meta App Review](https://developers.facebook.com/documentation/instagram-platform/app-review.md)) [VERIFIED]. Scope names changed on 2024-09-17 and the old ones died on 2025-01-27 ([changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md)) [VERIFIED].

**India has already lost a platform overnight.** India banned TikTok and 58 other apps on 29 June 2020 ([Wikipedia: Censorship of TikTok](https://en.wikipedia.org/wiki/Censorship_of_TikTok)) [REPORTED]. The Indian replacements did not hold their users. Moj's daily active users fell from 9.24M (Jan 2021) to 2.16M (Jan 2023, including MX TakaTak), and Josh fell from 5.77M to 1.11M in the same data set (Apptopia via Inc42, in [MediaNews4U, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/)) [REPORTED]. Chingari's revenue fell 53.1% to ₹43.6 crore in FY25 ([Inc42 Datalabs](https://inc42.com/company/chingari/)) [REPORTED; indicative]. Creators moved to Instagram. An Indian artist's profile, contacts and booking history must therefore survive a change at Instagram too [INFERENCE].

**Accounts get disabled.** At least four separate App Store India reviews on 29 September 2026 describe Instagram accounts "disabled" for "Account Integrity" or by mistake ([App Store India](https://apps.apple.com/in/app/id389801252)) [VERIFIED; single venue]. A disabled account means a broken synced profile. A 1-star review of the Indian music-licensing app Hoopr says "You cannot connect your insta" ([Apple lookup](https://itunes.apple.com/search?term=hoopr&entity=software&country=in)) [VERIFIED; single review].

**How competitors coped with the 2024 API shutdown:** widget vendors told users to switch to professional accounts ("free, easy to do") and re-authenticate ([SnapWidget](https://help.snapwidget.com/en/articles/9952836-deprecation-of-the-instagram-basic-display-api)) [VERIFIED].

**Content and AI risks.**

- Instagram content is not always the artist's own (reposts, AI work, collaborations). Meta added an `is_ai_generated` publishing flag on 2026-06-22 ([changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md)) [VERIFIED].
- India's IT Amendment Rules 2026 require AI-generated visual content to carry "a clear and noticeable label" ([SCC Online, 2026-02-12](https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/)) [REPORTED].
- A government committee (DPIIT, December 2025) has proposed, by majority, a mandatory blanket licence for AI training on all lawfully accessed works, under which "the rights holders will not have the option to withhold their works" ([DPIIT Working Paper](https://www.dpiit.gov.in/static/uploads/2025/12/ff266bbeed10c48e3479c941484f3525.pdf)) [VERIFIED]. This is a proposal, not law.
- International reporting says users outside the EU and UK, India included, had no opt-out from Meta's AI training on public posts ([Social Media Today, 2024-06-09](https://www.socialmediatoday.com/news/meta-posts-for-ai-training-cannot-opt-out/718410/)) [VERIFIED]. No Indian source on this point was found.
- So Underdawg cannot promise "safe from AI" for mirrored content. Moderation load is lower than for native uploads, because Instagram already moderates the content [INFERENCE].

**Meta's competing feature:** its creator marketplace already shows brands first-party creator profiles in India.

**9. Scale dependency**

Works at **1,000 artists** as a standalone portfolio utility. Discovery value appears at about **10,000+ artists**, when each discipline and city has enough inventory for brands to search [INFERENCE].

**10. India specifics**

- **Creator marketplace status.** Instagram announced in February 2024 that it would invite creators and brands in India; brands reach it through Meta Business Suite ([afaqs, Feb 2024](https://www.afaqs.com/news/social-media/instagram-creator-marketplace-launches-in-india)) [REPORTED]. No Indian data was found on how many creators or brands are enrolled.
- **Indian marketplaces are brand-led.** Kofluence, Hobo.Video and WYLD ("100,000+ Creators", [getwyld.in](https://getwyld.in)) [COMPANY CLAIM] list creators for brand campaigns. None shows a public, Instagram-synced artist portfolio.
- **Rosters far exceed paid work.** Kofluence lists 750,000+ influencers, while its own estimate is that only 450,000–600,000 Indian creators earn anything from content ([IBTimes India, 2025-07-08](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [COMPANY CLAIM]. A profile alone does not bring work [INFERENCE].
- **Data rules.** Storing synced profile data brings Underdawg under the DPDP Act [INFERENCE]. The DPDP Rules were notified on 14 November 2025 with an 18-month phased compliance period. Users under 18 need verifiable parental consent ([PIB, 2025-11-17](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)) [VERIFIED].

**11. Recommended implementation**

1. "Import and curate", not a mirror: the artist picks featured works and adds discipline, medium, style and city tags.
2. Support non-Instagram work (Spotify, YouTube, Behance, direct uploads), so the profile survives an API change and serves musicians.
3. Lead with work, discipline and resonance, not follower count.
4. Guide artists who must switch to a Creator account.
5. Snapshot media metadata; nudge reconnection before the 60-day token expiry.
6. Check Meta's Platform Terms before using synced media in any ranking.

---

### Feature 2 — Instagram insights and verified engagement rate

**Verdict:** Modify · **Priority:** BUILD EARLY for the verified credibility card only (suggested price = EXPERIMENT; best time to post = DEPRIORITISE) · Brands worry about fraud and public tools cannot see saves, shares or reach, but Instagram's free dashboard and Meta's brand-side creator marketplace already cover raw stats.

**1. Problem being solved**

Artists who do brand work must prove real reach and engagement, and must know what to charge.

**Indian brands fear fraud and cannot find the right creators.**

- BCG's India report lists brands' top concerns as fake followers (74%), uncertain ROI (40%) and brand risk (38%) ([Storyboard18 on BCG, May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm)) [REPORTED]. BCG names "fake engagement" and "ROI measurement gaps" as infrastructure gaps ([BCG, 2025-05-03](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy)) [VERIFIED].
- 83% of marketers struggle with influencer discovery (Goat/Kantar, [WPP Media, 2025-06-10](https://www.wppmedia.com/news/influencing-with-integrity)) [REPORTED].
- 62% of surveyed creators did not know that brands had tried to reach them, and 45% said unverified managers quoted inflated rates without permission (HashFame, [MediaBrief, 2025-05-27](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [COMPANY CLAIM; method not disclosed].

**Indian brands say they want small creators.** 47% of brands preferred micro and nano influencers "due to lower cost per reach" ([EY, April 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf); 2,053 respondents, 86 of them brands) [VERIFIED]. 51% of marketers expect a rise of niche micro-influencers (Goat/Kantar, [MediaBrief, 2025-06-24](https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/)) [REPORTED]. Hindustan Unilever worked with 12,000 creators in FY25 ([Storyboard18, 2025-07-28](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm)) [REPORTED].

**How large is the spend?** The sources conflict. EY estimated ₹2,344 crore for 2024 ([EY, April 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) [VERIFIED]. Goat/Kantar put 2024 at ₹3,600 crore ([WPP Media, 2025-06-10](https://www.wppmedia.com/news/influencing-with-integrity)) [REPORTED]. Kofluence puts 2025 at ₹3,000–3,500 crore ([MediaNews4U, 2026-05-15](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/)) [COMPANY CLAIM].

**There is no standard price in rupees.**

- 71% of Indian brands pay a fixed fee ([EY, April 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) [VERIFIED]. "More than 60% of brands themselves acknowledge that the lack of pricing standardization is a major challenge" (attributed to Kofluence's 2025 report in an op-ed, [MediaNews4U, 2026-04-04](https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/)) [COMPANY CLAIM].
- The only rupee rate ranges found come from one vendor, Kofluence. They are wide: a micro creator's Reel is quoted at ₹2,000 to ₹80,000, a 40-fold spread (see the table in section 10).
- Illustrators have no India-specific rate guide at all ([Aparajitha Vaasudev, Substack, 2026-08-19](https://studioapara.substack.com/p/india-has-no-illustration-agents)) [REPORTED; one designer's essay].
- No independent Indian benchmark of rates per post by follower tier was found.

**But most Indian artists do not yet do brand work.**

- Only 8–10% of India's 2–2.5 million active creators "monetize their content effectively" (BCG, via [PIB, 2025-05-02](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)) [VERIFIED].
- 50.4% of creators cite "limited brand collaboration opportunities" as their main obstacle ([Kofluence 2026 via Storyboard18, 2026-05-14](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [COMPANY CLAIM].
- Among 500 Indian music creators, only 8 ranked brand sponsorships as their top revenue source; 139 ranked live performance first ([IPRS-EY, December 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)) [VERIFIED].
- Smaller creators are often offered products, not money. "You can't pay bills with lipstick or perfume," says creator Sakshi Rawte-Dhar (54.6K followers) ([The Nod Mag, 2026-08-07](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [REPORTED]. No reliable Indian data exists on the share of deals that are barter.
- For those who do earn, brand work matters most. One summary of BCG says brand deals make up "nearly three-quarters" of Indian creator income ([Mediabrief on BCG, 2025-05-06](https://mediabrief.com/inside-the-2bn-surge-of-indias-creator-economy-bcg-report/)) [REPORTED]. Kofluence says sponsored collaborations are the primary income for about 50% of creators ([IBTimes India, 2025-07-08](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [COMPANY CLAIM]. The two figures measure different things.

**Counter-evidence: raw stats are already free in India.**

- Instagram's free dashboard already shows views, reach, saves, shares, demographics and best times ([frameos.studio, 2026-08-09](https://frameos.studio/blog/how-to-read-instagram-insights)) [REPORTED].
- Brands in India can see first-party creator data inside Instagram's creator marketplace (by invitation since February 2024) and through YouTube's Creator Partnerships, which covers India ([YouTube Help](https://support.google.com/youtube/answer/9385307)) [VERIFIED].
- Kofluence's creator app already shows verified stats and handles campaign payments, inside its own campaign marketplace ([kofluence.com](https://www.kofluence.com/)) [COMPANY CLAIM].
- Instagram tested a "Creator Insights" panel showing brands a creator's 30-day growth and reach ([Social Media Today, 2024-06-16](https://www.socialmediatoday.com/news/instagram-tests-creator-insights-profile-performance-brands/719065/)) [REPORTED], and creators can reportedly export insights as a PDF from Edits ([HeyOrca](https://www.heyorca.com/blog/instagram-social-news)) [REPORTED; no primary Meta source].

**Severity:** high for artists pitching brands; low for the majority not yet doing brand work. **Frequency:** occasional, when pitching [INFERENCE]. **Segments:** illustrators, photographers, dancers, fashion creatives and musicians who do brand work. **Workarounds:** screenshots of Insights; media kits; free engagement calculators; Kofluence's blog rate ranges. **Why insufficient:** screenshots can be faked [INFERENCE]; public calculators lack saves, shares and reach; Indian brand tools (Qoruz, Kofluence) score creators for brands and publish no prices; rupee benchmarks come from one vendor.

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Instagram Insights / Professional Dashboard | US (Meta); built into every professional account | Native stats | Views, reach, saves, shares, demographics, best times, retention | All professional accounts | Free | Instagram app: 7,965,813 ratings on the India App Store | Free, first-party, newest metrics | "Best times" is buried | Underdawg adds reach-based ER, peer benchmarks, a shareable verified card | [frameos.studio 2026-08-09](https://frameos.studio/blog/how-to-read-instagram-insights) [REPORTED]; [App Store IN](https://apps.apple.com/in/app/edits-video-editor/id6738967378) [VERIFIED catalog] |
| Instagram creator marketplace + "Creator Insights" test | US (Meta); India invited since 2024-02-21 | Brands see first-party creator performance | Brand search; 30-day follower growth, engagement, demographics, partnership history | Brands; invited creators | Free | Invitation-based; no Indian adoption data found | Authoritative; inside Instagram | Onboarding rules not documented | Meta already gives brands "verified stats". Underdawg must add artist context. | [Meta Newsroom, Feb 2024](https://about.fb.com/news/2024/02/creator-marketplace-for-brands-and-creators-to-collaborate-on-instagram/) [REPORTED]; [Meta doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md) [VERIFIED] |
| YouTube Creator Partnerships | US (Google); covers India | Opt-in sharing of first-party metrics with brands | Brand partnerships hub | YouTube creators, brands | Free | 23 countries/regions, including India | First-party data | YouTube-only | Shows big platforms keep building this | [YouTube Help](https://support.google.com/youtube/answer/16261569); [YouTube Help](https://support.google.com/youtube/answer/9385307) [VERIFIED] |
| Kofluence | India (Bengaluru, 2019) | "Fraud protection", reporting; creator app with verified stats and campaign payments | AI matchmaking for brand campaigns | Indian brands, creators | Not disclosed | 750,000+ (also 500,000+) creators [COMPANY CLAIM]; revenue ₹52.5 crore in FY25 (Inc42 Datalabs, indicative) | Indian scale; fraud checks | Inconsistent counts | Stats sit inside its own campaign marketplace, not on a card the artist can share anywhere | [kofluence.com](https://www.kofluence.com/) [VERIFIED]; [Inc42](https://inc42.com/company/kofluence/) [REPORTED] |
| Qoruz | India (Bengaluru, 2015) | ER, growth, "Creator Authority Score", fraud detection | Database search for brands | Agencies, D2C brands | Free / Premium / Enterprise (no prices) | Client logos (Amazon Mini TV, Dabur, L'Oréal); revenue ₹56.4 crore in FY25 (Inc42 Datalabs, indicative) | Indian authority score | No public prices | Brand-side scoring; Underdawg offers creator-owned verified stats | [qoruz.com/pricing](https://www.qoruz.com/pricing) [VERIFIED]; [Inc42](https://inc42.com/company/qoruz/) [REPORTED] |
| WYLD | India | Campaign marketplace for small creators | Campaign cards (one shows "₹5,000 – ₹15,000"); creators "receive direct bank transfers via UPI" | Brands, creators | Not disclosed | "100,000+ Creators", "500+ Brands Partnered" [COMPANY CLAIM] | UPI payouts | Fees not published | Campaign marketplace, not a verified card | [getwyld.in](https://getwyld.in) [VERIFIED], accessed 2026-10-02 |
| Linktree Brand Deals profile | Australia | Shows brands engagement rate and audience reach from a connected Instagram professional account | Tab on the Linktree profile | Linktree users | Not captured | **US-only: not available in India** | Sits on the link page | Not offered in India | Leaves the Indian link-page brand view open | [Linktree help, 2025-09-02](https://linktr.ee/help/en/articles/12135302-create-your-brand-deals-profile) [VERIFIED] |

*Outside India (background only)*

| Platform | Country | Similar Feature | Why it still matters | Source |
|---|---|---|---|---|
| HypeAuditor | Not verified | Free ER calculator, fake-follower checks, pricing calculator | Uses public likes and comments only; cannot see saves, shares or reach [INFERENCE from Meta permissions]. Shows what a public-data tool cannot do | [HypeAuditor](https://hypeauditor.com/free-tools/instagram-engagement-calculator/) [VERIFIED] |

**ER methods differ.** HypeAuditor divides by views or followers. No fetched competitor was confirmed to divide by reach. Qoruz and Kofluence do not publish their method.

**3. Uniqueness**

| Component | Classification |
|---|---|
| Analytics dashboards | Very common |
| Owner-verified stats shown to brands | Somewhat common (Meta's creator marketplace and YouTube in India; Kofluence's creator app) |
| Reach-normalised "True ER" with discipline/city benchmarks for artists | Rare (none found) |
| INR price suggestion for artists | Rare |

**Audience:** no artist-specific product found in India. **Workflow:** computed automatically and shared as a link, no screenshots. **Network:** the strongest network angle of the six: peer benchmarks such as "illustrators in Pune with 2–5K followers" [INFERENCE]. **Data:** high; a consented panel of reach, saves and shares by discipline could later power INR price benchmarks that do not exist publicly. **Discovery:** reach-normalised resonance does not reward size. **Combination:** verified stats + portfolio + rates and availability in one brand card is rare; Meta covers stats, not artist context.

**4. Artist value**

**Meaningful:** credibility with brands; pricing confidence; a verified contact route; learning which work resonates (saves and shares per reach). **Vanity:** follower and like dashboards. They duplicate Instagram and invite toxic comparison.

**5. Discovery impact**

**Positive, if designed correctly.** In India, small accounts show higher engagement rates than big ones.

| Tier | EY, citing Brand Equity and BW (2023) | Kofluence (2026, company claim) |
|---|---|---|
| Nano | about 4% | 5–10% |
| Micro | about 2.5% | 3–7% |
| Macro | about 1.5% | 1–3% |
| Mega | about 2% | 0.5–1.5% |

Sources: [EY, April 2024, p.9](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf) [VERIFIED]; [Kofluence blog, 2026-07-22](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/) [COMPANY CLAIM]. Tier definitions differ slightly between the two.

Small cities also score higher: metro 3–4%, Tier 2 3.5–4.5%, Tier 3–4 4.5–5.5% ([Kofluence 2026 via MediaNews4U, 2026-05-15](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/)) [COMPANY CLAIM]. So ranking by engagement rate favours emerging artists and artists outside the metros.

**Caution: no Indian data exists on reach, saves or comments per post by follower tier.** Only engagement-rate benchmarks were found.

**Outside India (background only).** A global panel shows why small-account numbers are fragile. Accounts with 1–5K followers reach 6.65% of their followers against 3.50% for 100K–1M accounts ([Socialinsider, 2026-09-03](https://www.socialinsider.io/blog/social-media-reach/)) [VERIFIED], but they average only 1–3 comments and about 1 save per post ([Socialinsider 2026](https://www.socialinsider.io/social-media-benchmarks/instagram)) [VERIFIED; brand-heavy panel]. One extra save can swing a small artist's True ER sharply [INFERENCE]. This must be tested on Indian accounts.

**Fair-discovery mechanisms:** Bayesian smoothing or minimum-sample rules; show ranges, not precise figures; never build price formulas on followers alone; match brands on audience fit (discipline, city, demographics), not size.

**6. Artist behaviour**

[INFERENCE] Artists use it to understand their stats and pitch brands: weekly if they pitch actively, occasionally otherwise. They create no content for it. A weekly "what resonated" digest could bring them back. **They would share it externally:** a verified card sent to a brand also shows Underdawg to that brand. **Loop:** card shared → brand sees Underdawg → brand searches other artists (needs a brand side). Benchmarks improve as more artists join, which is a mild network effect.

**7. Role:** activation ("your verified stats" on day one); retention (digest); monetisation (full stats in Pro); discovery (fair signals); acquisition (shared cards reach brands).

**8. Risks and how competitors handle them**

**API thresholds hit emerging artists.** "follower_count and online_followers metrics are not available on Instagram business or creator accounts with fewer than 100 followers". `online_followers` (behind "best time to post") covers only 30 days, and data "may be delayed up to 48 hours" ([Meta user insights](https://developers.facebook.com/documentation/instagram-platform/api-reference/instagram-user/insights.md)) [VERIFIED]. Story metrics last 24 hours, and values below 5 return an error ([Meta insights docs](https://developers.facebook.com/docs/instagram-platform/insights)) [VERIFIED].

**Metric churn breaks formulas.** Meta dropped `profile_views` and `website_clicks` (2024-10-02), replaced impressions with `views` (2025-01-21), and added `saved_count` and `shares_count` for Facebook Login apps (2026-04-22) ([changelog](https://developers.facebook.com/documentation/instagram-platform/changelog.md)) [VERIFIED]: three major changes since Oct 2024.

**Public data cannot show saves, shares or reach.** Business Discovery returns other accounts' followers, likes, comments and views only ([Meta doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/business-discovery.md)) [VERIFIED]. True ER therefore needs the artist's own login, which is what makes "verified" meaningful [INFERENCE].

**Bad pricing advice.** Every rupee rate range found comes from one vendor's estimates. A price suggestion built on them could anchor artists low and create liability [INFERENCE].

**Other risks** [INFERENCE]: engagement pods inflate likes and comments (saves and shares may be harder to fake; no evidence either way); public leaderboards breed toxic comparison. **How Indian competitors handle fraud:** Kofluence and Qoruz sell fraud screening to brands. **Meta's competing features:** the creator marketplace in India, the Creator Insights test, the Edits PDF export.

**9. Scale dependency**

The personal verified card works at **1,000 artists**. Discipline and city benchmarks need about **10,000+ artists**. Credible INR price suggestions need real deal data, so roughly **100,000 artists or a working brand marketplace** [INFERENCE].

**10. India specifics**

**Rupee rates by tier (Kofluence, company claims; GST extra).**

| Tier | 2025 | 2026, per Instagram Reel |
|---|---|---|
| Nano (1K–10K) | ₹500–5,000 per Reel | ₹1,000–12,000 |
| Micro (10K–100K) | ₹2,500–80,000 per campaign | ₹2,000–80,000 |
| Macro (100K–1M) | not given | ₹84,000–7.9 lakh |
| Mega (1M+) | ₹2 lakh+ per collaboration | ₹8 lakh+ |

Sources: [Kofluence blog, 2025-06-27](https://www.kofluence.com/blog/2025-influencer-marketing-report-sneak-peek/); [Kofluence report via Mediabrief, 2025-07-10](https://mediabrief.com/kofluence-influencer-marketing-report-2025/); [Kofluence blog, 2026-07-22](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/) [COMPANY CLAIM]. Kofluence adds that finance and tech creators command 30–50% more.

- **Most spend is informal.** "Nearly three quarters of influencer marketing spends in India still flow directly between brands and creators, outside of any organised channel" (KlugKlug figure quoted in an op-ed, [MediaNews4U, 2026-04-04](https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/)) [COMPANY CLAIM]. A card that an artist can send directly to a brand fits this habit [INFERENCE].
- **The opening.** Indian brands can already search creators with first-party data inside Instagram and YouTube. Indian tools (Qoruz, Kofluence) score creators for brands. None was found that gives artists a portable verified card they own.

**11. Recommended implementation**

1. Build a **verified credibility card** inside the brand view: Follower ER, True ER ((likes+comments+saves+shares)/reach) and a "resonance" sub-metric (saves+shares per reach), with clear definitions and sample size.
2. Show ranges, not two-decimal precision. Flag accounts under 100 followers as "limited data". Snapshot story and media metrics before Meta expires them.
3. Keep peer benchmarks private to the artist. No public leaderboards.
4. **Suggested price: experiment only,** with transparent ranges labelled by source (the Kofluence rupee ranges, marked as one vendor's estimate) until Underdawg has its own deal data.
5. **Best time to post: skip it,** or derive it from the artist's own post results. Instagram already shows it, and the API withholds `online_followers` under 100 followers.

---

### Feature 3 — Schedule posts to Instagram

**Verdict:** Deprioritise · **Priority:** DEPRIORITISE · Scheduling is free inside Instagram and Meta Business Suite, has no discovery value, and adds App Review scope, a job queue and failure support.

**1. Problem being solved**

Time management and posting consistency. **Severity:** low to moderate. **Frequency:** weekly for planners. **Segments:** artists who post often and run campaigns.

**No Indian survey on scheduling was found.** The nearest Indian fact suggests the need is small: 73% of surveyed influencers work less than 10 hours a week on content ([EY, April 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf); 556 creators) [VERIFIED]. Most emerging artists probably post ad hoc [INFERENCE].

**In India, Meta's free tools dominate.** Counts of iOS ratings on Apple's Indian storefront, pulled 2026-10-01 [VERIFIED catalog]:

| App | Indian iOS ratings | Type |
|---|---|---|
| Edits (Instagram) | 85,857 | Meta, free |
| Meta Business Suite | 40,285 | Meta, free |
| Buffer | 949 | Third-party scheduler |
| Hootsuite | 452 | Third-party scheduler |
| Planoly | 382 | Third-party scheduler |
| Later | 19 | Third-party scheduler |

Sources: [App Store IN: Meta Business Suite](https://apps.apple.com/in/app/meta-business-suite/id514643583); [App Store IN: Edits](https://apps.apple.com/in/app/edits-video-editor/id6738967378). This is proxy evidence that third-party schedulers are niche in India [INFERENCE].

**Native and free options already cover most of the need.** Instagram brought in-app scheduling to all professional accounts on **8 Nov 2022** ([TechCrunch, 2022-11-08](https://techcrunch.com/2022/11/08/instagram-scheduling-tool-all-professional-accounts/)) [REPORTED]; one secondary source says it now reaches "Up to 75 days in advance" and, "since March 2026, any public Instagram account" ([Albato, 2026-09-09](https://albato.com/blog/publications/how-to-schedule-instagram-posts)) [REPORTED; not confirmed by Meta]. Meta Business Suite also schedules Stories. Meta's paid "Advanced" plan adds 30-day Story scheduling ([TechCrunch, 2026-09-15](https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/)) [REPORTED]; its rupee price was not captured. Mosseri said scheduled posts "will not affect your reach one way or the other" ([via cadenus.io, 2026-06-30](https://cadenus.io/resources/blog/do-scheduling-tools-hurt-your-reach/)) [REPORTED; primary not opened].

**Workarounds:** native scheduler, Business Suite, free tiers of third-party tools. **Why insufficient:** only minor gaps (native scheduling reportedly lacks Stories; Business Suite covers them).

**Outside India (background only).** Linktree bought the scheduler Plann in Aug 2024 because "Social scheduling was among the most requested features" from its users ([TechCrunch, 2024-08-15](https://techcrunch.com/2024/08/15/linktree-acquires-plann-social-media-scheduling-tool/)) [REPORTED]. This is the only demand signal for bundling scheduling with a link page. No Indian equivalent was found.

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Instagram in-app scheduler | US (Meta) | Native scheduling | Schedule posts, carousels, Reels; reportedly 75 days ahead, 25/day | Professional accounts (2022); reportedly all public accounts (2026) | Free | No figure | Native editing and music; free | No Stories (reported) | Underdawg adds almost nothing | [TechCrunch 2022-11-08](https://techcrunch.com/2022/11/08/instagram-scheduling-tool-all-professional-accounts/); [Albato](https://albato.com/blog/publications/how-to-schedule-instagram-posts) [REPORTED] |
| Meta Business Suite | US (Meta) | Free scheduling incl. Stories | Desktop and app | Businesses, creators | Free | 40,285 Indian iOS ratings (4.76) | Free; Stories | Limits not verified | Same as above | [App Store IN](https://apps.apple.com/in/app/meta-business-suite/id514643583) [VERIFIED] |
| InstantDM | India (Replbetter App Technologies) | DM automation plus scheduling | Keyword DMs and post scheduling | Creators, brands | From $9.99/month | 30,000+ creators and brands [COMPANY CLAIM] | Indian, cheap; shows Indian tools already bundle scheduling | USD pricing | Generic tool, not artist-specific | [instantdm.com](https://instantdm.com/pricing) [VERIFIED] |
| SocialPilot, Zoho Social, Predis.ai | Associated with India; country not verified | Bulk scheduling; AI content plus auto-posting | Multi-network tools | Agencies, SMBs | SocialPilot $30–$200/month; Predis.ai $24 / $55 / $212; Zoho Social free for 1 brand, paid prices not shown | Predis.ai claims "6.4 million businesses" [COMPANY CLAIM] | Many networks | Rupee prices not captured; Zoho Social's INR page returned 404 | Built for agencies and brands, not artists | [socialpilot.co/plans](https://www.socialpilot.co/plans); [zoho.com/social/pricing](https://www.zoho.com/social/pricing.html); [predis.ai/pricing](https://predis.ai/pricing/) [VERIFIED] |

*Outside India (background only)*

| Platform | Similar Feature | Free/Paid | Indian iOS ratings | Why it still matters | Source |
|---|---|---|---|---|---|
| Buffer | Scheduling plus basic analytics | Free (3 channels); $5 / $10 per channel/month | 949 | Cheapest paid option; free tier competes with any Underdawg scheduler | [buffer.com/pricing](https://buffer.com/pricing) [VERIFIED] |
| Planoly | Grid planner, link in bio, auto-DMs, creator store | Free (10 uploads/month); $14 / $24 / $47 per month | 382 | The same bundle Underdawg proposes, already live | [planoly.com/pricing](https://www.planoly.com/pricing) [VERIFIED] |
| Later | Visual planner, scheduler, best times | $18.75 / $37.50 / $82.50 per month, billed yearly; no free plan | 19 | Instagram-first tool with almost no Indian footprint | [later.com/pricing](https://later.com/pricing/) [VERIFIED] |
| Linktree + Plann | Scheduling bundled into link-in-bio | Not verified | n/a | Proves the bundle idea; also proves it is not unique | [TechCrunch 2024-08-15](https://techcrunch.com/2024/08/15/linktree-acquires-plann-social-media-scheduling-tool/) [REPORTED] |

**3. Uniqueness**

**Classification: Very common.** **Functional:** nothing new. **Audience:** no artist-specific scheduler found. **Workflow:** one possible niche is scheduling brand-deal deliverables with the paid-partnership label. Meta added those label parameters in Apr 2026, but for Facebook Login apps. **Network:** none. **Data:** low (posting outcomes could feed Feature 2). **Discovery:** none. **Combination:** InstantDM in India, and Linktree (with Plann) and Planoly abroad, already bundle scheduling with other creator tools.

**4. Artist value**

It saves time. That is neither vanity nor a career outcome. It does not help artists get discovered, hired or paid.

**5. Discovery impact**

None. It is neutral on popularity. It may encourage volume over quality [INFERENCE]. No fair-discovery mechanism is needed.

**6. Artist behaviour**

Used weekly by planners. Artists would not create content for it, invite others or share it. It is a weak reason to return, because free native tools compete. No network effect and no creator loop [INFERENCE].

**7. Role:** mild retention and monetisation (a Pro convenience). Not acquisition, activation or discovery.

**8. Risks and how competitors handle them**

**API limits** ([Meta content publishing](https://developers.facebook.com/documentation/instagram-platform/content-publishing.md)) [VERIFIED]: "100 API-published posts within a 24-hour moving period"; carousels up to 10 items; JPEG only; no shopping tags or filters; no scheduled-publish parameter, so Underdawg must run its own job queue. Containers are capped at 400 per 24 hours and expire after 24 hours ([IG User media](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media)) [VERIFIED]. Whether Instagram Login apps can attach licensed music was not verified. Publishing needs Advanced Access through App Review ([Meta App Review](https://developers.facebook.com/documentation/instagram-platform/app-review.md)) [VERIFIED].

**Other risks** [INFERENCE]: publish-failure support (token expiry, format conversion); App Review scope creep; feature clutter. **Meta's competing features:** the native scheduler (reportedly widened again in Mar 2026), Business Suite and the paid Advanced plan. **Exposure: very high.** General schedulers survive by covering many networks, which Underdawg would not do [INFERENCE].

**9. Scale dependency**

None. It works at any scale, but its value does not grow with the network.

**10. India specifics**

- **Usage.** Meta's free apps have far more Indian iOS ratings than any third-party scheduler (table in section 1).
- **Prices.** No rupee prices were found for any scheduler. Tools associated with India (SocialPilot, Zoho Social, Predis.ai) show dollar prices or none.
- **Surveys.** No India-specific survey on scheduling was found.

**11. Recommended implementation**

1. Do not build for the MVP. Deep-link artists to Instagram's own scheduler instead.
2. After product-market fit, revisit only if retention data shows demand, as a Pro convenience, never a headline.
3. If built, scope it to brand-deal deliverables: "schedule the sponsored post with the paid-partnership label", linked to the Underdawg brand flow.

---

### Feature 4 — Link-in-bio page (underdawg.com/username)

**Verdict:** Modify · **Priority:** BUILD EARLY (narrow block set) · Demand is proven and the page is Underdawg's best acquisition surface, but the category is very common, so only an artist-specific version (brand view, hire/book, UPI, fan contacts) can compete.

**1. Problem being solved**

**Instagram rations links.** It has allowed up to 5 bio links since **18 Apr 2023** ([TechCrunch, 2023-04-18](https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/)) [REPORTED]. Meta's paid plans now list "Links in reels (varying by tier)" as a benefit ([meta.com/meta-verified](https://www.meta.com/meta-verified/)) [VERIFIED]. Rupee prices for those tiers could not be read. Meta Verified launched in India at ₹699 a month on mobile ([Meta Newsroom, 2023-06-07](https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/)) [VERIFIED].

**Demand in India is proven.**

- India was Linktree's "fifth-largest market by traffic": about **7.3M visits in July 2025**, 3.5% of its global visits ([TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)) [REPORTED].
- Topmate, an Indian one-link storefront, claims "1mn+ professionals" ([topmate.io](https://topmate.io/)) [COMPANY CLAIM]. Its co-founder reported creator earnings of ₹1,79,87,317 (about ₹1.80 crore) in September 2023 ([LinkedIn post](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O)) [COMPANY CLAIM].
- SuperProfile, by Cosmofeed, has "roughly 50,000 creators" ([CreatorLane, Jul 2026](https://creatorlanehq.com/learn/superprofile)) [REPORTED; secondary].
- Share of Indian creators who use any link-in-bio tool: no reliable public data found.

**Yet few Indian creators earn through any page.** Only 8–10% of India's 2–2.5 million active creators "monetize their content effectively" (BCG, via [PIB, 2025-05-02](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)) [VERIFIED].

**Why existing tools fall short in India.**

- **Global tools do not sell their earning features in India.** Linktree sells digital products, courses and bookings only in a list of 35 countries, and "India is not on the list". Its Shops, sponsored links and Rewards are US-only ([Linktree help, updated about 2026-09-30](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features)) [VERIFIED]. Stan's Stripe accounts are not available in India ([Stan help, 2026-09-28](https://help.stan.store/article/217-countries-available-for-stripe-custom-accounts)) [VERIFIED].
- **Global payment rails are constrained.** Stripe India made new accounts invite-only from June 2024 ([MediaNama, 2024-06](https://www.medianama.com/2024/06/223-stripe-invite-only-services-in-india-temporarily-citing-regulations/)) [VERIFIED]. PayPal India supports only international payments, at 4.40% + $0.30 ([PayPal India, 2024-03-28](https://www.paypal.com/in/webapps/mpp/merchant-fees)) [VERIFIED].
- **Indian tools take commission.** Topmate 10% on profile sales and 20% on marketplace sales; SuperProfile 10% on its free plan and 5% on its ₹11,999-a-year plan; TagMango 10% on its free Basic plan; Instamojo free plans 5% + ₹3; Linktree India Starter "Sell digital products (9% fees)" ([Topmate](https://topmate.io/pricing); [SuperProfile plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro); [TagMango](https://tagmango.com/pricing); [Instamojo](https://www.instamojo.com/pricing/); [Linktree IN](https://linktr.ee/s/pricing/)) [VERIFIED].
- **Indian tools are not built for artists.** Topmate's categories are career, data and AI, study abroad, software, HR, finance, startup mentoring, astrology and marketing. Product & Design is the only creative-adjacent one ([topmate.io](https://topmate.io/)) [VERIFIED]. TagMango's Pro plan costs ₹5,000 a month plus GST ([TagMango](https://tagmango.com/pricing)) [VERIFIED].
- **Outages and shutdowns.** Linktree was unreachable across India for several days in August 2025 ([TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)) [REPORTED]. The link tool Hypage now returns an HTTP 410 notice and appears discontinued under that name ([hypage.com](https://hypage.com), accessed 2026-10-02) [VERIFIED].

**The counter-view.** A basic link list is not an unmet need: Linktree and the Indian storefronts broadly work, so it is hygiene, not a differentiator [INFERENCE]. Indian UPI storefronts (Topmate, Exly, TagMango, Cosmofeed) already fill the gap that global tools leave [INFERENCE]. The open space is the artist-specific layer on top.

**Severity:** high for any artist selling, booking or being hired through Instagram. **Frequency:** fans click daily; the artist edits monthly [INFERENCE]. **Segments:** musicians (streams, tickets, merch); visual artists (prints, commissions); dancers and teachers (classes); designers and photographers (hire me). **Workarounds:** Instagram's 5 links; Linktree; Topmate or SuperProfile; Instamojo or Razorpay payment pages; a UPI ID sent over WhatsApp or DM.

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Instagram native bio links | US (Meta) | Up to 5 links on the profile | Edit profile → Links | All accounts | Free | All Instagram users | Native | Plain links, no commerce | The baseline every artist already has | [TechCrunch 2023-04-18](https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/) [REPORTED] |
| Topmate | India (Kavalry Technologies, Bengaluru, launched 2021; Tracxn lists a San Francisco HQ) | One link for 1:1 sessions, webinars, digital products, Priority DM, Instagram Auto DM | Commission only; rupee checkout | Experts, coaches, creators | No subscription; 10% (own link) / 20% (marketplace); custom pricing above ₹10 lakh a month | "1mn+ professionals"; "100k+ reviews" [COMPANY CLAIM]; $1.13M raised (Tracxn, low confidence) | Free start; bookings | Trustpilot score removed after "fake reviews" were removed; UPI not confirmed | Coaching-oriented; commission vs flat ₹299; no artist discovery | [topmate.io/pricing](https://topmate.io/pricing); [topmate.io/about](https://topmate.io/about) [VERIFIED]; [Trustpilot](https://www.trustpilot.com/review/topmate.io) [REPORTED] |
| SuperProfile (by Cosmofeed) | India (Gurgaon) | Link-in-bio, digital products, payments, AutoDM | Freemium storefront | Indian creators | Starter ₹0 with 10% fee; Premium ₹11,999/year with 5% fee; Pro ₹49,999/year, custom fee, adds branding removal. A third-party blog reports a ₹499/month plan after a ₹99 first month (conflict) | "Roughly 50,000 creators" (secondary); Trustpilot 4.2 from 91 reviews; Cosmofeed raised $1.5M seed (Mar 2022) | Rupee-native; AutoDM | Payout delays reported (secondary); branding removal only on the top tier; site blocked automated access (HTTP 429) | Generic creator tool, not artists-only; no discovery | [SuperProfile plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro) [VERIFIED]; [CreatorLane](https://creatorlanehq.com/learn/superprofile); [Peerseek 2026-07-24](https://peerseek.io/blogs/creator-platform-fees-india-compared); [Trustpilot](https://www.trustpilot.com/review/superprofile.bio) [REPORTED] |
| Instamojo / Razorpay Payment Pages | India | Hosted payment pages with UPI | UPI, cards, netbanking | Indian SMBs, creators | Instamojo: free (5% + ₹3) or Pro ₹2,499/month (2% + ₹3). Razorpay: Payment Pages 0.2% plus a 2% gateway fee and 18% GST on the fee; promo "zero* platform fee for 90 days" | No data | UPI-native; Razorpay settles T+1, Instamojo T+3 | High fees on Instamojo's free tier; generic pages | Payment rails; likely partners, not rivals [INFERENCE] | [instamojo.com/pricing](https://www.instamojo.com/pricing/); [razorpay.com/payment-pages](https://razorpay.com/payment-pages/); [razorpay.com/pricing](https://razorpay.com/pricing/) [VERIFIED] |
| TagMango / Exly | India | Storefronts for courses, sessions and paid communities, with a link page | Subscription plus commission | Coaches, educators | TagMango: Basic free at 10%; Pro ₹5,000/month + GST at 5.5%. Exly: commission 10% on the entry tier; Pro ₹2,500/month | TagMango "10,000+ Creators"; Exly "100,000+ creators strong" [COMPANY CLAIMS] | Rupee checkout | Priced for course businesses | Far above ₹299; not for artists | [tagmango.com/pricing](https://tagmango.com/pricing); [exlyapp.com/pricing](https://exlyapp.com/pricing) [VERIFIED], accessed 2026-10-02 |
| Linktree | Australia; sold in India in rupees | Link-in-bio, analytics; commerce features not sold in India | Hosted linktr.ee/name | Creators, businesses, artists | **India:** Free; Starter ₹360/month (₹220 billed yearly); Pro ₹650 (₹440); Premium ₹1,450 (₹1,250) | About 7.3M Indian visits in July 2025; iOS 4.67 from 1,426 Indian ratings | Category leader; regional pricing | Earn features, Shops and Brand Deals not available in India; India outage Aug 2025 | Generic; no verified artist stats, brand view or UPI seen | [linktr.ee/s/pricing](https://linktr.ee/s/pricing/) [VERIFIED from India]; [Linktree help](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features) [VERIFIED] |

*Outside India (background only)*

| Platform | Country | Similar Feature | Why it still matters | Source |
|---|---|---|---|---|
| Beacons | US | Link-in-bio, store, media kit, rate cards | Closest to a brand view, but the kit sits on a separate domain. 9% fee on free plan; no UPI seen; only 8 Indian iOS ratings | [beacons.ai/i/pricing](https://beacons.ai/i/pricing) [VERIFIED] |
| Stan Store | US | Mobile storefront with Stan AutoDM | $29 or $99 per month, 0% fee. Shows a flat-fee, zero-commission model can work, but it has no UPI and no Stripe accounts for India | [Stan pricing](https://stan.store/blog/stan-store-pricing/) [VERIFIED] |
| Komi | Not verified | Mini-site plus brand-deal hub with "AI-powered creator discovery" for brands | The only link tool found with a real brand side. Celebrity-led; no UPI seen | [komi.io/pricing](https://www.komi.io/pricing) [VERIFIED]; [TechCrunch 2023-07-18](https://techcrunch.com/2023/07/18/komi-rolls-out-to-the-public-with-new-creator-tools/) [REPORTED] |
| Feature.fm / Linkfire | Not verified | Music smart links, pre-saves, conversion tracking | Music-native link pages exist; no payments or UPI, no bookings, no brand view | [feature.fm/pricing](https://www.feature.fm/pricing); [linkfire.com/pricing](https://www.linkfire.com/pricing) [VERIFIED] |

**Checks on the brief's specific ideas** (fetched pages only). **Separate fan and brand views:** not found in any Indian tool. Abroad, Beacons has a separate media kit and Komi has a brand hub; no single page with a fan/brand toggle was found. **Money earned per link:** not found as such in India; nearest abroad are Beacons sales analytics and Feature.fm conversion tracking. **UPI on the page:** verified only for Instamojo; Topmate and SuperProfile take rupee payments but UPI was not confirmed on their pages. **WhatsApp sign-up block:** not found; Topmate schedules through WhatsApp, and SuperProfile's top plan adds WhatsApp marketing.

**3. Uniqueness**

**Classification: Very common.** By element: brand view — rare in India (Linktree's Brand Deals profile is US-only), somewhat common abroad (Beacons, Komi); UPI on a creator link page — common among Indian tools, rare among global tools; earnings per link — emerging; fan/brand toggle on one URL — rare (not found). **Audience:** no artists-only page with hire, book and verified stats found in India. **Network:** the page can link into Underdawg discovery ("more artists like this" for brands, collaborator credits); Topmate and Linktree have no artist graph to do this. **Data:** brand visits, inquiry rates and earnings by block would be unique opportunity data. **Combination:** verified stats + brand view + hire/book + UPI + fan contacts, artists-only, at a flat ₹299, is rare, though each element exists somewhere. No flat-fee artist plan like it was found in India; incumbents take commission [INFERENCE].

**4. Artist value**

**Meaningful:** getting paid (UPI tips, bookings); getting hired (brand view with rates, availability and verified stats); owning the fan relationship through email or WhatsApp capture, which hedges against Meta's link rationing and against account loss. **Vanity:** total click counts.

**5. Discovery impact**

**Direct effect: low.** A link page converts traffic the artist already has: its visitors are people already on the artist's Instagram profile [INFERENCE]. It therefore **favours already-popular accounts**. The Indian market positions these pages on money, not discovery. Topmate's own line is "Make money from your content. Sell products, host sessions, and grow your business — all from a single link" ([topmate.io](https://topmate.io)) [VERIFIED], and it offers no discovery beyond the creator's own audience, except a marketplace that charges 20% [INFERENCE].

**Indirect effects** [INFERENCE]: every page can carry an "on Underdawg" footer that brands and other artists see. The brand view can become the entry point to brand-side search across artists. **Fair-discovery mechanisms:** an opt-in "emerging artists in this discipline" strip on brand views only (never on fan views, so the artist's own traffic is not taken); rotation and caps on that strip; reciprocity (artists who opt in also get featured).

**6. Artist behaviour**

[INFERENCE] Artists use it as one link for everything, to get paid and hired. They set it up once, edit it monthly and check analytics weekly; fans visit daily. They add offers (classes, prints) rather than content. They return if earnings and inquiry alerts exist, and may invite collaborators through collaboration blocks. **They share it constantly** (Instagram bio, WhatsApp), so it is **the strongest external-sharing feature of the six**. **Loop** (weak, indirect): page shared → visitors see the "on Underdawg" footer → artists and brands sign up.

**7. Role:** acquisition (public URL, viral footer); activation; monetisation (Pro, payments); retention (earnings alerts). Discovery only through the brand view.

**8. Risks and how competitors handle them**

**Payout trust is the main Indian complaint.** Three App Store India reviews of Cosmofeed allege withdrawal problems, for example "when withdrawal time they suspend my account" (2026-03-02) ([App Store India](https://apps.apple.com/in/app/id1592830857)) [VERIFIED; single venue, user allegations]. Cosmofeed's Trustpilot score is 1.8/5 [REPORTED]. Payout delays are reported for SuperProfile ([CreatorLane, Jul 2026](https://creatorlanehq.com/learn/superprofile)) [REPORTED; secondary]. Topmate's Trustpilot score was removed after "fake reviews" were removed ([Trustpilot](https://www.trustpilot.com/review/topmate.io)) [REPORTED]. Reddit could not be reached, so none of these counts as a common complaint yet.

**Domain risk.** Linktree was unreachable across India for several days in Aug 2025; the cause is unknown ([TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)) [REPORTED]. It answered normally from an Indian network on 2026-10-01 [VERIFIED by direct request].

**Payments compliance.**

- **Underdawg cannot hold other people's money itself.** Under the RBI's Payment Aggregator Directions of September 2025, only an authorised payment aggregator (net worth ₹15 crore at application) may pool funds in escrow, and "a PA business shall not carry out marketplace business" ([TaxGuru, text of the Directions](https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html)) [VERIFIED]. Payments must run through a licensed aggregator such as Razorpay or Instamojo [INFERENCE].
- **UPI is no longer free for larger merchant payments.** From 15 October 2026, merchant payments above ₹2,000 carry a 0.4% fee, capped at ₹300. Person-to-person transfers, merchant payments up to ₹2,000, and small merchants receiving up to ₹1 lakh a month by QR stay free ([The Indian Eye, 2026-09-18](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/); [MediaNama, Sep 2026](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/)) [REPORTED].
- **Tax.** A platform that collects payments for sellers is an e-commerce operator: it must register for GST with no threshold and collect 0.5% TCS ([ClearTax](https://cleartax.in/s/tcs-under-goods-and-services-tax)) [REPORTED]. Income-tax TDS of 0.1% applies above ₹5 lakh a year per seller ([ClearTax](https://cleartax.in/s/section-194o)) [REPORTED].
- **Data.** Email and WhatsApp capture falls under the DPDP Act; penalties reach ₹250 crore for weak security safeguards ([PIB, 2025-11-17](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)) [VERIFIED].

**Other risks** [INFERENCE]: scam pages needing moderation; clutter from the 14 proposed blocks; support load. **How Indian competitors handle payment risk:** they route money through Indian gateways and charge commission. TagMango's 10% includes the Indian gateway ([TagMango](https://tagmango.com/pricing)) [VERIFIED]; a third-party comparison puts Topmate at 10% plus about 2.9% for the gateway ([Peerseek, 2026-07-24](https://peerseek.io/blogs/creator-platform-fees-india-compared)) [REPORTED]. **Meta dependence: medium.** The page is a normal website; only the grid and stats use the API, but a link-policy change or domain block would hurt. **Meta's competing features:** 5 bio links; paid "Links in reels".

**Outside India (background only).** Two lessons that India has not yet tested at scale. First, link pages die with their owners: Linktree bought Koji and shut it on 2024-01-31 with 700,000+ creators ([TechCrunch, 2023-12-14](https://techcrunch.com/2023/12/14/linktree-acquires-link-in-bio-platform-koji-in-its-second-investment-of-the-year/)) [REPORTED], and Bento shut on 2026-02-13 with "all Bento user and profile data … permanently deleted" ([AlternativeTo, 2025-12-21](https://alternativeto.net/news/2025/12/bento-to-shut-down-in-2026-as-linktree-takes-over-and-offers-migration-path/)) [REPORTED]. Second, custom domains can become a trap: Beacons reviewers say "they refused to release my artist website address" (2026-06-12) ([Trustpilot](https://www.trustpilot.com/review/beacons.ai)) [REPORTED]. Both support the "no lock-in" rule below.

**9. Scale dependency**

Works at **1,000 artists** as a standalone tool. The brand-view discovery loop needs **10,000+ artists** and some brand demand. Cross-artist recommendations need **100,000+** [INFERENCE].

**10. India specifics**

- **Price.** Linktree India charges ₹360 / ₹650 / ₹1,450 per month (monthly billing) or ₹220 / ₹440 / ₹1,250 (billed yearly) ([linktr.ee/s/pricing](https://linktr.ee/s/pricing/), 2026-10-01) [VERIFIED]. SuperProfile Premium costs ₹11,999 a year plus 5% of sales. Underdawg Pro at ₹299 is below Linktree Starter's monthly price but above its yearly ₹220 [INFERENCE].
- **Break-even** [INFERENCE: arithmetic on verified rates]. A flat ₹299 equals a 10% commission (Topmate, SuperProfile Starter, TagMango Basic) at ₹2,990 of monthly sales. Below that level, a commission tool is cheaper for the artist.
- **UPI scale.** UPI handled 24,161.69 crore transactions worth ₹314.23 lakh crore in FY2025–26 (Lok Sabha reply, via [Punjab Kesari/IANS, 2026-07-20](https://english.punjabkesari.com/business/nearly-555-crore-users-onboarded-on-upi-by-june-fy26-transactions-cross-24161-crore-centre)) [REPORTED]. It "accounts for 84% of digital payments in India" ([Wikipedia: UPI](https://en.wikipedia.org/wiki/Unified_Payments_Interface), citing NPCI) [REPORTED].
- **UPI ticket size.** 86% of person-to-merchant UPI payments are below ₹500 ([PIB, Aug 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2)) [VERIFIED]. Small tips fit the rail and stay free of the new fee. A ₹3,000 booking paid to Underdawg as merchant would cost about ₹12 in fee [INFERENCE: arithmetic].
- **No "request money" by UPI.** NPCI ended person-to-person UPI collect requests from 1 October 2025 ([Outlook Money, 2025-08-16](https://www.outlookmoney.com/banking/npci-to-end-upi-p2p-collect-requests-from-october-1-to-reduce-fraud)) [REPORTED]. A tip block must use a pay link or QR, not a collect request.
- **So UPI is necessary, but not unique.** Instamojo, Razorpay, Topmate and SuperProfile already serve rupee payments.

**11. Recommended implementation**

1. **MVP blocks only:** links; Instagram grid; verified stats card; hire/book inquiry form; UPI tip; email and WhatsApp capture; YouTube and Spotify embeds.
2. **One URL, two views.** Fans see links, tips and work. Brands see the credibility card, rates, availability and an inquiry button.
3. **Defer** tickets, sessions, downloads, reviews and shop until payments are proven; add earnings per link only once money flows through Underdawg.
4. **Flat price, no or low fees; no lock-in:** data export, custom domains, domains released on cancellation, fast static pages.
5. **Growth:** an "on Underdawg" footer, and an opt-in emerging-artist strip on brand views only.

---

### Feature 5 — Page templates and template marketplace

**Verdict:** Combine · **Priority:** COMBINE (free templates into Feature 4; premium templates into Pro; marketplace = DEPRIORITISE) · Templates are expected table stakes, but there is no evidence that artists pay for link-page templates and no link-in-bio platform runs a designer marketplace.

**1. Problem being solved**

Artists want a page that looks distinct and on-brand without design skills. **Severity: low.** **Frequency:** at setup, plus occasional refreshes. **Segments:** artists driven by visual identity (fashion, illustration, music branding). **Workarounds:** free first-party themes; Canva or other templates bought elsewhere. **Why insufficient:** possibly sameness, but this is unproven.

**Demand from Indian artists to pay for page templates: no reliable Indian data found.** Complaints that link pages "all look the same" were not found either.

**In India, design is sold as a plan upgrade, not as a product.**

- Linktree's gallery has about 18 named templates and no designer selling. Its Pro tier adds "Custom themes, fonts, & layouts" at **₹650 a month in India** ([templates](https://linktr.ee/s/templates/); [pricing](https://linktr.ee/s/pricing/)) [VERIFIED].
- SuperProfile removes its own branding only on its top Pro plan at ₹49,999 a year ([SuperProfile plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro)) [VERIFIED]. Its template tiers were not verified.
- Pixpa includes "200+ premium templates" in plans from ₹200 to ₹600 a month, billed yearly ([Pixpa](https://www.pixpa.com/pricing)) [VERIFIED].
- Instagram's own Reels and Edits templates are free in India, and Meta runs no paid template marketplace ([Meta Newsroom](https://about.fb.com/news/2025/04/introducing-edits-streamlined-video-creation-app/)) [VERIFIED]. These are video-editing templates, a different product.
- Topmate, Zorcha and StarClinch show no template offer ([topmate.io](https://topmate.io); [zorcha.com](https://zorcha.com); [starclinch.com](https://starclinch.com)) [VERIFIED].

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Linktree templates/themes | Australia; sold in India in rupees | First-party gallery; custom themes in Pro | ~18 templates by category incl. Music | Creators, businesses | Templates free; custom themes in Pro (₹650/month, India) | 1,426 Indian iOS ratings | Huge base | No designer marketplace | Underdawg would add designer sellers and artist blocks | [linktr.ee/s/templates](https://linktr.ee/s/templates/) [VERIFIED] |
| Pixpa | India | 200+ premium portfolio templates | Website builder | Creatives | ₹200–₹600/month billed yearly | n/a | Rupee pricing | First-party templates only | No designer sellers | [pixpa.com/pricing](https://www.pixpa.com/pricing) [VERIFIED] |
| Instagram / Edits templates | US (Meta); available in India | Free video-editing templates | In-app | All creators | Free | Edits: 85,857 Indian iOS ratings | Free, native | Not page templates | Sets the expectation that templates are free | [Meta Newsroom](https://about.fb.com/news/2025/04/introducing-edits-streamlined-video-creation-app/) [VERIFIED] |
| SuperProfile | India (Gurgaon) | Branding removal on the top plan | Plan upgrade | Indian creators | Pro ₹49,999/year | "Roughly 50,000 creators" (secondary) | Rupee-native | Template tiers not verified | No marketplace | [SuperProfile plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro) [VERIFIED] |

*Outside India (background only).* No Indian template marketplace exists, so the only working models are foreign.

| Platform | Model | Lesson for India | Source |
|---|---|---|---|
| Notion Marketplace | Third-party templates; Notion takes 8% + $0.40 per sale | India appears not eligible for direct payouts (medium confidence): Indian designers lack a payout route | [Notion help](https://www.notion.com/help/selling-on-marketplace) [VERIFIED] |
| Framer Marketplace | 0% commission; referral share "50% of their subscription for 12 months" | "$6.5M" paid to creators in 2025 [COMPANY CLAIM]. It earns through subscriptions, at a large scale. Underdawg could do the same through Pro, but only at scale | [framer.com/creators](https://www.framer.com/creators) [VERIFIED] |
| Creative Market | Link-in-bio templates for other builders at $9–$39 each | "180,911 assets" on a loose keyword search. Shows supply, not sales | [Creative Market](https://creativemarket.com/search?q=link%20in%20bio) [VERIFIED] |
| Carrd | Premium templates inside every Pro plan, from $9/year | Design bundled into a cheap plan, not sold separately | [carrd.com/pro](https://carrd.com/pro) [VERIFIED] |

**Link-in-bio template marketplaces found: zero, in India or abroad.** Fewer than 5 real implementations of the exact idea exist; the rows above are adjacent models.

**3. Uniqueness**

Templates: **very common**. Premium templates in a paid tier: **common**. Designer marketplace for link pages: **rare / none found**. **Network:** the sellers would be designer-artists. A "designed by @designer" credit on every page could become a discovery and commission channel for designers, a cross-discipline loop that needs an artist network [INFERENCE]. **Data:** low. **Combination:** marketplace + artist network + INR/UPI payouts is novel but unproven.

**4. Artist value**

Low for most artists, because it is cosmetic. Meaningful for designer-artists, who could earn income and visibility.

**5. Discovery impact**

Small and positive for designers, through credits. **Popularity bias:** best-sellers dominate marketplace rankings. **Fair-discovery mechanisms:** a "new templates" rotation and curated picks [INFERENCE].

**6. Artist behaviour**

Used rarely (setup and refresh). Designers might return to track sales. A two-sided marketplace effect appears only with large buyer volume. Artists would share their page, not the template [INFERENCE].

**7. Role:** activation (a good-looking page fast) and monetisation (Pro). Marginal discovery for designers.

**8. Risks and how competitors handle them**

Low adoption; template plagiarism and copyright disputes; quality moderation; fragmented page performance; opportunity cost [INFERENCE]. **Payout operations in India:** a marketplace that pays designers is an e-commerce operator. It must register for GST with no threshold, collect 0.5% TCS, and deduct 0.1% TDS above ₹5 lakh a year per seller ([ClearTax: TCS](https://cleartax.in/s/tcs-under-goods-and-services-tax); [ClearTax: Section 194-O](https://cleartax.in/s/section-194o)) [REPORTED]. Whether unregistered designers who sell a service through a platform must register for GST needs a tax adviser; the explainers opened cover goods. **How competitors police plagiarism and quality: not verified.** **Meta dependence: none.**

**9. Scale dependency**

Templates work at any scale. A marketplace needs a large scale, likely **100,000+ active page owners** [ASSUMPTION], because few people buy templates.

**10. India specifics**

- No India-specific demand data was found.
- The Indian price signal for design is a plan upgrade: ₹650 a month on Linktree, ₹49,999 a year on SuperProfile's top plan.
- Notion's marketplace appears not to pay out directly to India (medium confidence), a hint that Indian designers lack rupee payout routes for templates.
- Canva's India price could not be verified.

**11. Recommended implementation**

1. **Build a small set of free templates by discipline** (musician, illustrator, photographer, dancer) as part of Feature 4.
2. **Fold premium templates into Pro.** No separate product.
3. **Deprioritise the marketplace.** After product-market fit, test a "designed by" credit with a few commissioned designer-artists, as a visibility experiment rather than a revenue line.

---

### Feature 6 — Instagram DM automation with any trigger word

**Verdict:** Deprioritise · **Priority:** DEPRIORITISE (possible narrow Pro feature or partnership after PMF; reject the "unlimited" claim) · The behaviour is proven, but the category is crowded and cheap in India, Meta limits and copies it, and it converts existing commenters rather than creating discovery.

**1. Problem being solved**

Delivering links, files or offers to many commenters without manual DMs, and capturing leads.

**The behaviour is real in India, and Indian tools already serve it.**

- Zorcha, made in India, advertises "Free Unlimited Instagram DM Automation" and claims "60K+ creators" and "100 million messages sent every month" ([zorcha.com](https://zorcha.com/), accessed 2026-10-02) [COMPANY CLAIM].
- InstantDM claims "30,000+ creators and brands" ([instantdm.com](https://instantdm.com/pricing)) [COMPANY CLAIM].
- ReplyKaro's own counts conflict: "4,496+ creators" on its product page on 2026-10-01, and both "Join 10,000+ creators" and "Join over 7,576+ creators" on its home page on 2026-10-02 ([product page](https://www.replykaro.com/instagram-dm-automation); [replykaro.com](https://replykaro.com)) [COMPANY CLAIM].
- Indian storefronts bundle it: Topmate promotes "Instagram Auto DM" and SuperProfile has AutoDM ([Topmate](https://topmate.io/pricing); [CreatorLane](https://creatorlanehq.com/learn/superprofile)) [VERIFIED; REPORTED].
- Indian affiliate platforms Faym and Wishlink also share links through DMs ([faym.co](https://faym.co); [wishlink.com](https://wishlink.com)) [VERIFIED].

**But use is still small.** The vendors' own counts (60K+, 30,000+, 10,000+) are well under 5% of India's 3.3–3.7 million Instagram creators, even if every claimed user were Indian [INFERENCE: arithmetic]. On Apple's Indian storefront, ManyChat has 297 ratings, InstantDM 39 and ReplyRush 17, against 40,285 for Meta Business Suite ([App Store IN](https://apps.apple.com/in/app/meta-business-suite/id514643583); [Apple lookup](https://itunes.apple.com/search?term=linkdm&entity=software&country=in)) [VERIFIED catalog]. **Share of Indian creators using comment-to-DM: no reliable public data found.**

**Counter-evidence.**

- **Small accounts have little to automate.** 61.1% of Indian creators are nano creators ([Kofluence 2026 via Storyboard18, 2026-05-14](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [COMPANY CLAIM]. No Indian data exists on comments per post by follower tier.
- **Non-followers' DMs land in Requests.** Private replies go to the Inbox "if the person follows… or to the Request folder, if they do not" ([Meta private replies](https://developers.facebook.com/docs/instagram-platform/private-replies)) [VERIFIED].
- **A DM cannot ask for money by UPI.** NPCI ended person-to-person UPI collect requests from 1 October 2025 ([Outlook Money, 2025-08-16](https://www.outlookmoney.com/banking/npci-to-end-upi-p2p-collect-requests-from-october-1-to-reduce-fraud)) [REPORTED]. Whether `upi://` links are clickable inside Instagram DMs was not verified.
- **Engagement-bait rules exist for Facebook** ([Meta Transparency Center](https://transparency.meta.com/features/approach-to-ranking/content-distribution-guidelines/engagement-bait/)) [VERIFIED]. Whether Instagram demotes "comment LINK" posts, and whether audiences find them annoying: no reliable public data found.

**Severity:** high for sellers with comment volume; low for emerging artists. **Frequency:** per campaign post. **Segments:** artists selling digital goods (brushes, presets, beats), classes and prints; musicians running pre-saves. **Workarounds:** Zorcha, ReplyKaro, InstantDM and similar tools; Meta's native keyword tools; manual DMs; the link page. **Why insufficient:** several Indian-built tools price in dollars; "not firing" complaints about the global leader, ManyChat; Meta's native tools reportedly limited to 5 exact keywords with a 15-minute delay.

**Outside India (background only).** Two facts with no Indian equivalent. Accounts with 1–5K followers average 3 comments per Reel, 2 per carousel and 1 per image in a global panel ([Socialinsider 2026](https://www.socialinsider.io/social-media-benchmarks/instagram)) [VERIFIED]. And a link-first DM "sinks toward 20 to 30%" deliverability while a button-first DM holds "70 to 90%" ([Inro, 2026-07-15](https://www.inro.social/blog/instagram-comment-to-dm-automation)) [COMPANY CLAIM]. Both should be tested on Indian accounts.

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Zorcha | India (Zorcha Software Pvt Ltd) | DM automation, AI FAQ, link-in-bio, "Ask for Follow" | Flows plus queue | Creators, brands | Free (unlimited DMs); $14.99 / $39.99 / $109.99 per month as shown outside India; rupee prices not visible | 60K+ creators; 100 million messages a month; Meta Verified Tech Provider [COMPANY CLAIM] | Free tier; creator-OS bundle | A competitor quotes ₹1,199/month (conflict) | Closest "creator OS"; not artist-specific | [zorcha.com/pricing](https://zorcha.com/pricing) [VERIFIED] |
| ReplyKaro | India (₹ pricing; UPI and Razorpay billing) | Comments, story replies, DM keywords; follow gate | Keyword → DM | Indian creators | Free (1,000 DMs/month); Starter ₹99; Pro $9 on its page and **₹299 on its own blog**; Pro Bundle (Instagram + Facebook) ₹399 | 4,496+, 7,576+ and 10,000+ creators on its own pages (conflict) [COMPANY CLAIM] | Very cheap | "All payments are final and non-refundable"; repeats the unverified "200 DMs/hour" claim | **Same price as Underdawg Pro** | [replykaro.com](https://www.replykaro.com/instagram-dm-automation); [pricing](https://replykaro.com/pricing) [VERIFIED]; [ReplyKaro blog](https://www.replykaro.com/blog/superprofile-auto-dm-vs-replykaro-2026) |
| InstantDM | India (Replbetter App Technologies) | Comments, stories, DMs; "Follow for Link"; Advanced Safety Mode | Keyword → DM with pacing | Creators, SMBs | $9.99/month ("Unlimited (750/hr)"); $24.99 | 30,000+ [COMPANY CLAIM]; iOS 4.36 from 39 Indian ratings | Pacing matches Meta's 750/hour limit | USD pricing | Generic | [instantdm.com/pricing](https://instantdm.com/pricing) [VERIFIED] |
| SuperProfile AutoDM | India (Gurgaon) | AutoDM bundled with a storefront | Keyword → DM plus store; single trigger, no multi-step flows | Indian sellers | Price conflicts: about ₹499/month after a ₹99 first month; ₹1,500–2,000/month; ₹11,999/year | "Roughly 50,000 creators" (secondary) | Commerce bundle | "No Follow-Gate" (competitor claim) | Closest Indian creator-OS; no discovery | [CreatorLane](https://creatorlanehq.com/learn/superprofile); [ReplyKaro blog](https://www.replykaro.com/blog/superprofile-auto-dm-vs-replykaro-2026) [REPORTED, competitor] |
| Topmate (Instagram Auto DM) | India (Bengaluru) | Auto DM bundled into a one-link storefront | Part of the commission product | Experts, creators | No subscription; 10% / 20% commission | "1mn+ professionals" [COMPANY CLAIM] | No extra cost | Not artist-focused | Shows DM automation is a bundle feature, not a product | [topmate.io/pricing](https://topmate.io/pricing) [VERIFIED] |
| Spur | US parent with a New Delhi entity | Instagram and Facebook DM and comment automation, WhatsApp, AI agents | Flows for brands | D2C brands | $12 / $31 / $127 / $399 per month | No reliable public data found | WhatsApp included | Brand-focused | Not for artists | [spurnow.com/pricing](https://www.spurnow.com/pricing) [VERIFIED] |
| Meta native tools | US (Meta) | Business Suite "Custom Keywords" and "Comment to Message"; "Reply to Keywords" ad test | Max 5 exact keywords; 15-minute delay; desktop | All professional accounts; advertisers | Free (ads test needs ad spend) | Built in; Business Suite has 40,285 Indian iOS ratings | No third-party risk | Limited | Meta can widen this at any time | [CreatorFlow 2026-08-18](https://creatorflow.so/blog/instagram-built-in-automation/) [REPORTED, competitor-published]; [SMT 2026-08-25](https://www.socialmediatoday.com/news/meta-tests-auto-dm-response-for-instagram-ad-comments/828791/) [REPORTED] |

*Outside India (background only)*

| Platform | Country | Similar Feature | Why it still matters | Source |
|---|---|---|---|---|
| ManyChat | US (reported) | Full DM automation on Instagram, Messenger and WhatsApp; billed by contacts | The global leader (~1.5M customers), yet only 297 iOS ratings in India (3.93). Its main complaint, "Automations aren't firing", warns of the support load | [TechCrunch](https://techcrunch.com/2025/04/22/manychat-taps-140m-to-boost-its-business-messaging-platform-with-ai/); [Trustpilot](https://www.trustpilot.com/review/manychat.com) [REPORTED] |
| LinkDM | Australia (Webdot, Melbourne); Indian origin unverified | Comment, story, Live and inbox triggers; Slow Down Mode; DM queue | Free (1,000 DMs/month); Pro $19/month (25,000 DMs). Prices DM volume in tiers, not "unlimited". Indian creators reportedly pay about ₹1,580+/month after FX and GST (competitor-reported) | [linkdm.com/pricing](https://linkdm.com/pricing) [VERIFIED] |
| Inro | Not stated (EUR pricing) | Comments, story replies, Live, "Payments in DMs" | Already targets artists and labels; Pro €12.99/month | [inro.social/pricing](https://www.inro.social/pricing) [VERIFIED] |
| Laylo | US (YC S20) | Drops CRM; Instagram comment/DM capture; SMS/email | Music-native fan capture already exists; 10,000+ users [COMPANY CLAIM]. No Indian artist-specific DM tool was found | [laylo.com](https://laylo.com); [YC](https://www.ycombinator.com/companies/laylo) [VERIFIED] |

**What Meta's API allows for each proposed capability** ([private replies](https://developers.facebook.com/documentation/instagram-platform/private-replies.md); [messaging](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md); [rate limits](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/)) [VERIFIED]. These rules are the same in India.

| Proposed capability | What Meta allows |
|---|---|
| Any keyword | Feasible: matching happens in the tool, on comment webhooks |
| Comments | One private reply per comment, within 7 days |
| Story replies and DMs | Through the messages webhook |
| Live comments | Only during the broadcast; needs Advanced Access |
| Follower check | Only after the user messages or taps a button or menu |
| Once-per-person | Tool logic; Meta enforces one reply per comment, not per person |
| Files | PDFs supported; files ≤25MB, images ≤8MB |
| Payments, bookings, tickets | No native payment type; must link out (e.g., to UPI checkout) |
| Text length | ≤1,000 bytes |

**3. Uniqueness**

**Classification: Very common in India; common globally.** **Functional:** everything proposed already exists in Indian tools. Follower gates: Zorcha, InstantDM and ReplyKaro. Pacing and queues: InstantDM, Zorcha. Bundled storefront: SuperProfile, Topmate. Live triggers and payments in DMs exist abroad (LinkDM, Inro). **Audience:** no Indian DM tool targets artists; Inro and Laylo do so abroad. **Workflow:** linking DMs to the Underdawg brand view, UPI checkout and bookings is the only difference, and it is easy to copy. **Network:** none. **Data:** modest fan-intent data. **Discovery:** none. **Combination:** "a brand comments COLLAB and receives the artist's verified rate card and booking link" is a niche twist, not a moat [INFERENCE].

**4. Artist value**

**Meaningful,** but only for artists with comment volume: digital-goods sales, class sign-ups, lead capture, and faster replies to brand inquiries. The last point has Indian support: 62% of surveyed creators did not know brands had tried to reach them (HashFame, [MediaBrief, 2025-05-27](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [COMPANY CLAIM]. **Vanity:** comment counts inflated by "comment X" bait.

**5. Discovery impact**

**None to slightly negative.** Meta's messaging API lets an app message a user only after that user has messaged first ([Meta Messaging API](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/)) [VERIFIED]. So DM automation cannot reach new people. It **strongly favours already-popular accounts**, because DM volume scales with comments. Follower gates grow follower counts, not discovery by relevant people [INFERENCE]. Fair-discovery mechanisms do not apply, because this is not a discovery feature.

**6. Artist behaviour**

[INFERENCE] Artists use it to deliver assets and links automatically and to capture leads, per campaign, checking results weekly. They create content for it, but on Instagram ("comment BRUSH"). A results dashboard could bring them back. They would not invite others or share it. **No network effect.** The only loop is a seller loop (post → comments → DMs → sales) that runs entirely on Instagram.

**7. Role:** monetisation (Pro) and retention (results). Not acquisition, activation or discovery.

**8. Risks and how competitors handle them**

**Rate limits** ([Meta rate limiting](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/)) [VERIFIED]: private replies on posts and Reels, **750 calls per hour** per account; Live comments, 100 calls per second; Send API, 100 per second for text and links, 10 per second for audio and video; Conversations API, 2 per second. So "unlimited" is misleading. **The "200 DMs/hour" figure is not a Meta rule.** Indian vendors such as ReplyKaro repeat it. One vendor retracted its claim of a cut from 5,000 to 200, saying it "could not find that change in any Meta documentation or changelog" ([SumGenius, corrected 2026-08-14](https://sumgenius.ai/blog/instagram-dm-bot-ban-wave-2026/)) [REPORTED].

**Access and policy.** Messaging needs `instagram_business_manage_messages` with App Review and Advanced Access. Live webhooks also need Advanced Access ([webhooks](https://developers.facebook.com/docs/instagram-platform/webhooks)) [VERIFIED]. The standard window is 24 hours after the user's message, and automated experiences must be disclosed ([Meta Messaging API](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/)) [VERIFIED].

**Price pressure.** DM automation is often free in India, so it cannot be a paid differentiator. An "unlimited DM automations" promise in a ₹299 plan competes with tools that are free [INFERENCE].

**Privacy.** Capturing emails and phone numbers in DMs needs consent under the DPDP Act. The DPDP Rules were notified on 14 November 2025; a child's data needs verifiable parental consent, and the Act defines a child as anyone under 18 ([PIB, 2025-11-17](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf); [DPDP Act 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)) [VERIFIED].

**Safety.** India's Instagram ad audience is 69.7% male ([DataReportal, 2025-11-05](https://datareportal.com/reports/digital-2026-india)) [REPORTED]. Female artists and dancers may face harassment through open DM flows [INFERENCE]; harassment data was not checked.

**Complaints.** No Indian complaint data on DM tools was found. Abroad, automations "not firing" is a common complaint about ManyChat (Trustpilot plus three community threads, e.g. [this one](https://community.manychat.com/general-q-a-43/comment-to-dm-instagram-10872)) [VERIFIED forum posts]. **Account bans from automation: not verified as common.** **How Indian competitors handle throttling:** "Advanced Safety Mode" with pacing at 750 per hour ([InstantDM](https://instantdm.com/pricing)) and flows with a queue ([Zorcha](https://zorcha.com/pricing)) [VERIFIED].

**Meta's competing features:** Business Suite keyword automations; the "Reply to Keywords" ad test (Aug 2026), which may later reach organic posts [INFERENCE]; paid plans with automatic follow invitations ([TechCrunch, 2026-09-15](https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/)) [REPORTED]. Meta AI Studio availability in India: no reliable public data found.

**Other risks** [INFERENCE]: support burden; spam perception; dilution toward a generic Instagram-marketing tool. **Meta exposure: very high.**

**9. Scale dependency**

None. It works for each artist alone and gives no network benefit as Underdawg grows.

**10. India specifics**

**A crowded rupee price band.**

| Tool | Price in India | Confidence |
|---|---|---|
| Zorcha | Free, unlimited DMs | Company page |
| ReplyKaro Starter | ₹99/month | Company page |
| ReplyKaro Pro | ₹299/month (own blog); $9 (page) | Blog vs page conflict |
| ReplyKaro Pro Bundle | ₹399/month | Company page |
| Kwikzy | ₹399–999/month | Self- or competitor-published |
| LinkPlease | ₹499/month | Self- or competitor-published |
| SuperProfile AutoDM | ₹499–₹2,000/month (conflicting) | Competitor-reported |
| Creator Lane Pro | ₹1,500/year | Self-published |
| **Underdawg Pro (planned)** | **₹299/month for the whole plan** | Plan |

Sources: [replykaro.com/pricing](https://replykaro.com/pricing); [zorcha.com](https://zorcha.com); [Creator Lane, 2026-06-27](https://creatorlanehq.com/blog/best-instagram-dm-automation-tools-india); Kwikzy blog on kwikzy.com, 2026-04, exact URL not recorded [REPORTED].

- **Dollar pricing.** Indian-built InstantDM ($9.99) and Zorcha ($14.99) show dollar prices to a visitor outside India [VERIFIED]. Rupee prices, if different, were not visible.
- **Funding.** No funding data was found for Zorcha, InstantDM, ReplyKaro or SuperProfile.

**11. Recommended implementation**

1. **Not in the MVP.** Do not market "unlimited" or "any number of DMs".
2. After product-market fit, either partner with an existing Indian DM tool or build a **narrow, artist-outcome Pro feature:**
   - auto-reply to "COLLAB" or brand inquiries with the brand view, rate card and booking link;
   - free-asset delivery (for example, a brush pack) with an email or WhatsApp opt-in;
   - ticket or class links to UPI checkout.
3. Use button-first DMs, follow-checks only after a tap, pacing well under 750 per hour, and clear disclosure that replies are automated.

---

#### Verdict summary (features 1–6)

| # | Feature | Verdict | Priority | One-line reason | Key Indian evidence |
|---|---|---|---|---|---|
| 1 | Instagram-connected profile | Modify | BUILD EARLY | Cheapest fix for cold start and the inventory for discovery; must be "import, curate, tag", not a mirror | Instagram is primary for 3.3–3.7M of 4.0–4.4M Indian creators (company claim); 93.1% of brands prioritise Instagram; Meta's creator marketplace has invited India since 2024-02-21; TikTok banned on 2020-06-29 and its Indian replacements shrank |
| 2 | Insights and verified ER | Modify | BUILD EARLY (card); price = EXPERIMENT; best time = DEPRIORITISE | Owner-authorised, reach-normalised credibility is the defensible part; raw stats are free in Instagram | 74% of brands worry about fake followers (BCG); 83% of marketers struggle to find creators; nano engagement about 4% vs macro about 1.5% (EY); rupee rates come from one vendor and vary up to 40 times within a tier |
| 3 | Schedule posts | Deprioritise | DEPRIORITISE | Free native scheduling; zero discovery value; adds App Review scope and failure support | Meta Business Suite 40,285 Indian iOS ratings vs Buffer 949 and Later 19; no rupee prices or Indian survey found; 100 API posts/24h; JPEG only |
| 4 | Link-in-bio page | Modify | BUILD EARLY (narrow) | Proven demand and the best acquisition surface; only an artist-specific brand view + UPI + hire/book version can compete | Linktree: about 7.3M Indian visits a month, earn features not sold in India, outage Aug 2025; Topmate takes 10–20%, SuperProfile 5–10%; UPI ₹314 lakh crore in FY2025–26; 0.4% UPI fee above ₹2,000 from 2026-10-15 |
| 5 | Templates and marketplace | Combine | COMBINE (marketplace = DEPRIORITISE) | Templates are table stakes; no evidence artists pay; zero link-in-bio template marketplaces found | Linktree gates custom themes at ₹650/month; SuperProfile removes branding only at ₹49,999/year; Instagram templates free in India; Indian demand data: none found |
| 6 | DM automation | Deprioritise | DEPRIORITISE (narrow Pro or partnership after PMF) | Crowded, cheap, Meta-limited; converts existing commenters only; favours big accounts | Zorcha free and unlimited; ReplyKaro ₹99 Starter and ₹299 Pro = Underdawg Pro; 61.1% of Indian creators are nano; 750 private replies/hour; 1 reply per comment within 7 days |

CHART: india-app-ratings — In India, Meta's own creator apps have 40,285 and 85,857 iOS ratings; third-party Instagram tools have 17 to 1,426
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Edits (Instagram) | 85,857 | iOS ratings, India storefront | Meta | 2026-10-01 | https://apps.apple.com/in/app/edits-video-editor/id6738967378 |
| Meta Business Suite | 40,285 | iOS ratings, India storefront | Meta | 2026-10-01 | https://apps.apple.com/in/app/meta-business-suite/id514643583 |
| Linktree | 1,426 | iOS ratings, India storefront | Linktree | 2026-10-01 | https://apps.apple.com/in/app/linktree-link-in-bio-creator/id1593515263 |
| Buffer | 949 | iOS ratings, India storefront | Buffer | 2026-10-01 | https://apps.apple.com/us/app/buffer-plan-schedule-posts/id490474324 |
| Hootsuite | 452 | iOS ratings, India storefront | Hootsuite | 2026-10-01 | https://apps.apple.com/us/app/hootsuite-social-media-tools/id341249709 |
| Planoly | 382 | iOS ratings, India storefront | Planoly | 2026-10-01 | https://apps.apple.com/us/app/planoly-social-media-planner/id1014568284 |
| ManyChat | 297 | iOS ratings, India storefront | ManyChat | 2026-10-01 | https://apps.apple.com/us/app/manychat/id1460129210 |
| Cosmofeed | 222 | iOS ratings, India storefront | Cosmofeed | not stated | https://apps.apple.com/in/app/id1592830857 |
| InstantDM | 39 | iOS ratings, India storefront | InstantDM | 2026-10-01 | https://apps.apple.com/in/app/comment-to-link-dm-instantdm/id6756658913 |
| Later | 19 | iOS ratings, India storefront | Later | 2026-10-01 | https://apps.apple.com/us/app/later-social-media-scheduler/id784907999 |
| ReplyRush | 17 | iOS ratings, India storefront | ReplyRush | not stated | https://itunes.apple.com/search?term=linkdm&entity=software&country=in |

CHART: inr-tool-prices — Underdawg Pro at ₹299 sits below Linktree India Starter (₹360) but equals ReplyKaro's DM-tool Pro
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| ReplyKaro Starter | 99 | INR/month | ReplyKaro | 2026-10-01 | https://www.replykaro.com/instagram-dm-automation |
| Linktree Starter (billed yearly) | 220 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ |
| Underdawg Pro (planned) | 299 | INR/month | Underdawg | plan | brief |
| ReplyKaro Pro (own blog) | 299 | INR/month | ReplyKaro | 2026-08-16 | https://www.replykaro.com/blog/superprofile-auto-dm-vs-replykaro-2026 |
| Pixpa Creator (billed yearly, 50% offer) | 300 | INR/month | Pixpa | 2026-10-01 | https://www.pixpa.com/pricing |
| Linktree Starter (monthly billing) | 360 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ |
| ReplyKaro Pro Bundle (Instagram + Facebook) | 399 | INR/month | ReplyKaro | 2026-10-02 | https://replykaro.com/pricing |
| LinkPlease (competitor-published) | 499 | INR/month | LinkPlease | 2026-06-27 | https://creatorlanehq.com/blog/best-instagram-dm-automation-tools-india |
| Linktree Pro (monthly billing) | 650 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ |
| Meta Verified India (mobile, launch price) | 699 | INR/month | Meta | 2023-06-07 | https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/ |
| Linktree Premium (monthly billing) | 1,450 | INR/month | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ |
| Instamojo Smart Pages Pro (monthly billing) | 2,499 | INR/month | Instamojo | 2026-10-01 | https://www.instamojo.com/pricing/ |
| Exly Pro (billed ₹30,000 a year) | 2,500 | INR/month | Exly | 2026-10-02 | https://exlyapp.com/pricing |
| TagMango Pro (plus GST and 5.5%) | 5,000 | INR/month | TagMango | 2026-10-02 | https://tagmango.com/pricing |

CHART: dm-tool-usd-prices — Indian-built Instagram DM tools list paid plans at $3–$15 a month to visitors outside India
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| ReplyKaro Starter (₹99 in India) | 3 | USD/month | ReplyKaro | 2026-10-01 | https://www.replykaro.com/instagram-dm-automation |
| ReplyKaro Pro (pricing page) | 9 | USD/month | ReplyKaro | 2026-10-01 | https://www.replykaro.com/instagram-dm-automation |
| InstantDM Legend Pro | 9.99 | USD/month | InstantDM | 2026-10-01 | https://instantdm.com/pricing |
| Spur AI Acquire (US parent, New Delhi entity) | 12 | USD/month | Spur | 2026-10-01 | https://www.spurnow.com/pricing |
| Zorcha Pro (monthly billing) | 14.99 | USD/month | Zorcha | 2026-10-01 | https://zorcha.com/pricing |

CHART: dm-tool-users — Indian creator tools claim between 4,496 and 60,000 users each; Topmate claims 1M+ professionals (all company claims)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Topmate | 1,000,000 | professionals (company claim, "1mn+") | Topmate | 2026-10-01 | https://topmate.io/ |
| Zorcha | 60,000 | creators (company claim, 60K+) | Zorcha | 2026-10-01 | https://zorcha.com/pricing |
| SuperProfile | 50,000 | creators (secondary source, "roughly 50,000") | SuperProfile | Jul 2026 | https://creatorlanehq.com/learn/superprofile |
| InstantDM | 30,000 | creators and brands (company claim, 30,000+) | InstantDM | 2026-10-01 | https://instantdm.com/pricing |
| Wishlink | 15,000 | creators (company claim, 15,000+) | Wishlink | 2026-10-01 | https://wishlink.com |
| Faym | 10,000 | creator stores (company claim, 10,000+) | Faym | 2026-10-01 | https://faym.co |
| ReplyKaro (home page, higher claim) | 10,000 | creators (company claim, 10,000+; page also says 7,576+) | ReplyKaro | 2026-10-02 | https://replykaro.com |
| ReplyKaro (product page) | 4,496 | creators (company claim, 4,496+) | ReplyKaro | 2026-10-01 | https://www.replykaro.com/instagram-dm-automation |

CHART: er-by-tier — In India, nano creators show about 4% engagement against about 1.5% for macro creators (EY, 2023 data)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Nano (100–10,000 followers) | 4 | % engagement rate (about) | EY, citing Brand Equity and BW | 2023 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf |
| Micro (10,000–100,000) | 2.5 | % engagement rate (about) | EY, citing Brand Equity and BW | 2023 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf |
| Macro (100,000–1 million) | 1.5 | % engagement rate (about) | EY, citing Brand Equity and BW | 2023 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf |
| Mega (1 million+) | 2 | % engagement rate (about) | EY, citing Brand Equity and BW | 2023 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf |

---

## Part 3 — Money tools earn from attention but rarely create it (features 7, 12–15, 18)

**Bottom line.** These six features help artists earn from attention they already have. They do little to help unknown artists get discovered, which is Underdawg's purpose. The Indian evidence supports building only the cheap, low-risk parts early: a free-download-for-email block, a zero-fee UPI "Support" block, and a small "Shop-lite" experiment that turns Instagram "price?" messages into prepaid, tracked sales. Paid 1:1 sessions deserve a narrow pilot: they have the strongest Indian income evidence (1:1 calls were about 39% of Topmate creators' earnings in September 2023). Full escrow selling, in-house ticketing and the ₹299 Pro plan should wait until after product-market fit (PMF). In India, holding buyers' money makes Underdawg a GST "e-commerce operator", and unregistered artists can then sell only inside their own state. Only 15.2% of Indian creators are business- or GST-registered. Every money feature already exists in India (Artflute, Topmate, SuperProfile, Instamojo, Blinkstore, Qikink, District). Underdawg can only differentiate by being artist-specific, charging fair fees (Artflute takes 40% of a sale), and feeding money signals into fair discovery. It should never sell visibility.

**How to read this part.** Research dates: 1–2 October 2026. Indian evidence comes first in every section. Facts from other countries appear only under the label "Outside India (background only)" and are not Indian facts. **[Verified]** = page opened, fact seen. **[Reported]** = third-party figure, not checked. **[Company claim]** = a number the company published about itself. **[Derived]** = arithmetic on verified numbers. **[Inference]** = analysis. **[Assumption]** = not evidenced; test it. Inc42 Datalabs revenue figures are indicative only. Reddit could not be fetched and the search budget ran out, so **no complaint is called "common" without three or more independent sources.**

---

### Feature 7 — Art Shop

**Verdict:** Modify · **Priority:** EXPERIMENT now ("Shop-lite" in the link page and DMs), then BUILD AFTER PMF (held payments) · Buyers already buy art from artists on Instagram (measured outside India; no Indian figure exists), but a full Indian escrow marketplace is legally heavy, weak for discovery, and built from parts that exist cheaply elsewhere.

**1. Problem being solved**

The problem is not "a place to list art". Indian artists already sell through Instagram DMs and UPI [Inference; no Indian survey]. The problem is turning interest into a trusted, simple, low-fee sale: payment, shipping, returns and proof of authenticity.

*The Indian art market is growing, but the growth does not reach living, unknown artists.*
- Auction turnover reached **₹2,543 crore in 2025**, up from ₹792 crore in 2015 (360 ONE, "The Collector's Guide 2026", via [Business Today, 2026-09-13](https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13)) [Reported].
- Contemporary art was only **₹163 crore** of that, about 6.4% [Derived]. Post-War art was ₹1,647 crore and Modern art ₹701 crore. Three artists (M.F. Husain, Tyeb Mehta, F.N. Souza) sold ₹490.3 crore, ₹307.5 crore and ₹274.6 crore (same source).
- Most lots are cheaper than the headlines suggest. Of 4,057 lots sold in 2025, 700 sold under ₹1 lakh and 1,699 at ₹1–10 lakh, so 59% sold under ₹10 lakh (same source).
- An older series gives ₹1,146 crore ($144.3M) for FY23 (Grant Thornton Bharat and Indian Art Investor, via [Business Standard, 2023-10-09](https://www.business-standard.com/india-news/young-collectors-global-recognition-fuelling-indian-art-astaguru-ceo-123100900622_1.html)). A later article converts the same $144.3M to "about Rs 1,253 crore" and says growth is strongest at ₹5–25 lakh ([Business Standard, 2025-09-24](https://www.business-standard.com/economy/news/gst-rate-cut-from-12-to-5-poised-to-brighten-india-s-art-landscape-125092400909_1.html)). Both rupee figures are shown because the sources differ. This bracket is above most emerging artists' prices.
- Price signals for emerging work: MeMeraki shows a mid-range band of ₹10,000–35,000 ([MeMeraki, 2026-10-01](https://www.memeraki.com/)); AstaGuru's no-reserve online auction opens bidding at ₹20,000 ([Business Standard, 2023-10-09](https://www.business-standard.com/india-news/young-collectors-global-recognition-fuelling-indian-art-astaguru-ceo-123100900622_1.html)); StarClinch's guide puts emerging artists' works at ₹50,000–₹5 lakh ([StarClinch blog, 2026-02-19](https://starclinch.com/blog/guide-artist-booking-prices-in-india/); company blog).
- **No reliable Indian data exists** on the size of the online or affordable art market, on Instagram art selling, or on gallery commission rates.

*Pain 1: Indian online galleries take a large cut, are curated, and pay weeks later* [Verified].
- **Artflute** takes **40%** commission, with taxes on top. For shipments inside India the artist pays shipping and packaging. The artist is "paid within 15 working days from the date the buyer receives his order" ([Artflute artist FAQs, accessed 2026-10-02](https://www.artflute.com/artist-faqs)). On a ₹20,000 work the artist keeps ₹12,000 before shipping and packaging [Derived].
- **Mojarto** asks artists to apply with five sample images and "pay the nominal registration fee". Curators decide within 21 days. Payment arrives "within 21 working days of confirmation from the buyer". The commission rate is not stated ([Mojarto seller FAQ, accessed 2026-10-02](https://www.mojarto.com/sellerFaq)).
- **Etsy** charges Indian sellers ₹19 per listing, 6.5% per sale, 3–5% + ₹25 for processing, and 15% on sales from its offsite ads ([Etsy India sell page, accessed 2026-10-02](https://www.etsy.com/in-en/sell)). Indian shops can sell only to buyers abroad (section 10).

*Pain 2: the free route has no protection* [Inference]. Selling by Instagram DM means long message threads, UPI screenshots and a courier booked by hand. The buyer has no protection. There is no shipping workflow and no certificate of authenticity (COA).

*Pain 3: foreign platforms can shut Indian sellers out.* Etsy stopped taking new Indian sellers in November 2023 (section 10). Linktree does not offer its selling features in India and was unreachable there for several days in August 2025 ([Linktree help, updated ~2026-09-30](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features); [TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)).

*Severity:* Medium-High for artists who already get "price?" DMs. Low for artists with no audience, whose problem is demand [Inference]. Only 8–10% of India's creators "monetize their content effectively" (BCG, via [PIB, 2025-05-02](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)). No Indian income survey exists for visual artists, illustrators or photographers. *Frequency:* occasional [Inference]; no Indian data on how often buyers purchase art. *Segments:* painters, illustrators, photographers, craft makers, fashion one-offs; musicians mainly need merchandise. *Workaround:* Instagram DM → UPI → manually booked courier; Etsy for export; free Indian POD stores (Blinkstore, Qikink, Printrove) for prints and merchandise, but not originals [Inference; no India survey]. *Why insufficient:* a 40% gallery cut; no buyer protection on DM sales; Etsy India is export-only. *Gaps:* no India data on how artists sell; complaints about shipping damage, DM scams and POD copycats are **not verified as common**.

*Outside India (background only).* No Indian survey measures how buyers purchase art, so these figures are context only.
- Among high-net-worth collectors worldwide, artist-direct sales ("including studio sales, Instagram-based purchases, and direct commissions") rose from **10% of spending in 2021 to 20% in 2025**; 42% of collectors active two years or less prefer buying direct ([Art Basel & UBS Art Market Report 2026, p.77, March 2026](https://theartmarket.artbasel.com/download/The-Art-Basel-and-UBS-Art-Market-Report-2026-by-Arts-Economics.pdf)).
- In 2023, **29% of online art buyers had bought directly through Instagram** (42% of under-35s). Non-buyers feared the work would look different (70%), doubted seller reputation (63%), authenticity (52%), returns (50%) and shipping (42%) ([Hiscox Online Art Trade Report 2023, pp.15–19](https://www.hiscox.co.uk/sites/default/files/documents/2023-04/Hiscox%20online%20art%20trade%20report%202023.pdf)).
- Global online art sales were $9.2B in 2025, the lowest since 2019 ([Art Basel & UBS 2026](https://theartmarket.artbasel.com/global-sales)). Online art is not a growing channel worldwide.

**2. Competitors**

*In India (Indian companies, and what foreign tools offer inside India)*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Instagram DM + UPI | India | Informal workaround | DM, UPI ID or QR, courier booked by hand | All artists | Free | No Indian data on Instagram art selling. Instagram is the primary platform for 3.3–3.7M Indian creators (Kofluence 2026, company claim) | No fees | No protection; manual; no COA | The flow to formalise | [Adgully on Kofluence 2026](https://www.adgully.com/post/15568/kofluence-launches-2026-influencer-marketing-report) |
| Artflute | India (Bengaluru) | Curated online gallery for originals | 40% commission, taxes on top; artist packs and pays domestic shipping; paid within 15 working days after delivery; COA "with every piece" | Emerging and senior Indian artists; collectors | Free to list; 40% | "Since 2008" (company claim); artist count not found | COA; Indian collector base; ships to AU, SG, US, UK, UAE | Curated (gatekept); 40% cut; artist bears shipping | Open, social-first, lower fee | [Artflute artist FAQs](https://www.artflute.com/artist-faqs); [Artflute](https://www.artflute.com/) |
| Mojarto | India (New Delhi) | Curated marketplace for originals and prints | Apply with five images and a registration fee; curators decide in 21 days; artist couriers within 3 working days; paid within 21 working days of buyer confirmation; Mojarto makes and ships prints | Indian artists and collectors | Registration fee; commission not stated | About 10,099 paintings listed (2026-10-01). FY25 revenue ₹84.6 lakh, down 62% [Reported, Inc42; the figure could not be reproduced on 2026-10-02] | Breadth of Indian art; print service | Opaque fees; slow payout | Open; DM-native | [Mojarto seller FAQ](https://www.mojarto.com/sellerFaq); [Mojarto](https://www.mojarto.com/); [Inc42](https://inc42.com/company/mojarto/) |
| MeMeraki | India (Gurugram) | Traditional and folk art marketplace, plus masterclasses | Works with master artists; handles export, customs and packaging | Traditional artists; buyers worldwide | Commission not public | "500+ Master Artists", "10,000+ Products", "7+ Cr INR paid out to our artists in the last 5 years", buyers in "40+ countries" (company claims) | Handles export | Heritage crafts only | Contemporary emerging artists | [MeMeraki](https://www.memeraki.com/) |
| Etsy (Indian sellers) | USA | Open marketplace, export only from India | ₹19 listing; 6.5% per sale; 3–5% + ₹25 processing; 15% on sales from offsite ads | Makers | Fees per sale | New Indian sellers paused Nov 2023; reportedly resumed June 2025. No reliable count of Indian sellers | Buyers abroad; trusted checkout | Indian shops "cannot accept domestic sales"; ads fee | Domestic India; artist owns audience | [Etsy India](https://www.etsy.com/in-en/sell); [Etsy Help India](https://help.etsy.com/hc/en-in/articles/6742925359255-How-to-Accept-Payments-as-a-Seller-in-India) |
| Instamojo | India | Store + payment links | UPI built in; payout at T+3 | Micro-sellers | Store Lite ₹0 and Starter ₹6,999/yr at 5% + ₹3; Growth ₹14,999/yr at 2% + ₹3 | "Chosen by 70% businesses" (company claim) | India-native | No art features | DM-checkout alternative | [Instamojo](https://www.instamojo.com/pricing/) |
| Qikink (and Printrove) | India | POD fulfilment | Ships under seller brand; COD across 29,000+ pincodes with "zero RTO charges". Printrove ships to 220+ countries | D2C brands, creators | No subscription; partner earns on base price | Qikink: 25,000+ brands; 5M+ orders (snapshot 2026-07-29) vs "7M+" later (conflict; company claims). Printrove FY25 revenue ₹4.8 crore [Reported] | Solves COD and stock | Merch and prints only | Planned POD partner | [Qikink](https://qikink.com/); [Printrove](https://printrove.com/) |
| Blinkstore | India | Free POD storefront | Free store, 50+ products; dispatch in 24–48 hours | Creators | Free | "10K+ creators & brands"; a ₹599 tee pays the creator up to ₹200 (company claims) | Zero cost | Merch only | Closest Indian substitute | [Blinkstore](https://blinkstore.in/) |
| Pixpa | India | Portfolio site with zero-commission store | Subscription site builder | Photographers, artists | ₹200 / ₹300 / ₹400 per month, billed yearly | No data | No commission | No data gathered | Hosted page with DM checkout | [Pixpa](https://www.pixpa.com/pricing) |
| Instagram Shops (India) | USA | Native shop | India kept website-redirect shops "until further notice" (Apr 2023) | Businesses | Free | India status not re-verified | Native | No native checkout seen in India | Underdawg supplies checkout | [TechCrunch, 2023-04-27](https://techcrunch.com/2023/04/27/instagram-facebook-force-checkout-experience-shops-soon/) |
| Linktree (India) | Australia | Link-in-bio shop | Selling of digital products, courses and bookings is limited to 35 listed countries; "India is not on the list". Shops are US-only | Creators | India plans ₹360–1,450/month | 7.3 million Indian visits in July 2025 (Similarweb via TechCrunch) | Known brand | Selling features not offered in India; outage in Aug 2025 | Rupee and UPI selling | [Linktree help](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features); [TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/) |

*Outside India (background only)*
- **Saatchi Art** (USA) takes 40% of an original and pays 14–19 days after delivery. It charges commission even on buyers the artist brought and shows them other artists: "You risk losing your collectors" ([Saatchi, snapshot 2026-09-07](https://www.saatchiart.com/whysell); [Very Private Gallery, undated](https://veryprivategallery.com/what-is-saatchi-art/)). Underdawg should never show rivals on an artist's own page.
- **Singulart** (France) is a curated gallery with full logistics and few sales per artist (section 4) ([Wikipedia](https://en.wikipedia.org/wiki/Singulart)).

**3. Uniqueness**

**Very common** for selling art online; **Emerging** for Instagram-DM-native art checkout in India [Inference]. *Functional:* Low. Every part exists in India: marketplaces for originals (Artflute, Mojarto), a COA with every piece (Artflute), a print service (Mojarto), free POD stores (Blinkstore, Qikink). Outside India, Saatchi offers an AR room view. *Audience:* Low-Moderate. Blinkstore and Qikink serve merchandise, not originals. *Workflow:* Moderate. DM → checkout → tracked delivery → automatic COA was not found end to end in India, but Instamojo + Shiprocket + manual DMs comes close. *Network:* Low; buyers are not in an artists-only network. *Data:* Moderate-High potential: a verified sales record is credibility that portfolio sites lack. *Discovery:* Low by default. *Combination:* Moderate; rare in India but easy to copy. **The moat is the verified-sales record, not the checkout** [Inference].

**4. Artist value**

*Meaningful:* sales, repeat collectors, commission requests, a verified sales and COA history usable for grants, galleries and brands, price discovery, local sales. *Vanity:* listings, shop views, saves.

The risk is empty shops. Indian evidence is thin but points the same way: Mojarto lists about 10,099 paintings and reported FY25 revenue of ₹84.6 lakh, down 62% [Reported, Inc42; not reproduced on 2026-10-02]. MeMeraki says it paid "7+ Cr INR" to its artists over five years across "500+ Master Artists" (company claim). No Indian marketplace publishes sales per artist.

*Outside India (background only).* Singulart sells about 1,700 works a month across about 12,000 artists ([Wikipedia, 2025](https://en.wikipedia.org/wiki/Singulart)), about 0.14 sales per artist per month [Derived]. Custom or made-to-order items are about 30% of Etsy's sales ([Etsy 10-K FY2025, filed 2026-02-19](https://www.sec.gov/Archives/edgar/data/1370637/000137063726000019/etsy-20251231.htm)), so pair the shop with commission requests [Inference].

**5. Discovery impact**

A **monetisation feature with weak discovery impact**: it converts Instagram attention into sales. Indian galleries are curated (Mojarto's curators decide who is listed; Artflute is curated), so they do not help an unknown artist get found. *Popularity bias: High* if buyer pages rank by sales. Etsy's Indian seller page already charges 15% on sales from its own ads, which shows how marketplaces sell visibility [Inference]. *Possible gains* [Inference]: local discovery (city and pickup feeds in metros and tier-2 cities), medium and style search, curator and brand trust via verified sales. *Fair-discovery mechanisms* [Inference]: no sales leaderboards; boost artists with few impressions; rotating "First sale" and "Under ₹5,000 by emerging artists" collections with per-artist caps; no paid placement; **never show other artists on an artist's own shop page**; show other emerging artists only on the buyer's thank-you page.

*Outside India (background only).* "If you are not getting likes and shares on Instagram or YouTube, you will likely not get discovered on Saatchi Art" ([Very Private Gallery](https://veryprivategallery.com/what-is-saatchi-art/)).

**6. Artist behaviour**

*Why:* get paid without long DM threads; look professional; sell prints without stock; sell locally. *Frequency:* listing occasionally; orders rare to weekly. *Content:* yes (product photos, "comment SHOP" Reels). Small Indian accounts have the highest engagement rate: about 4% for nano creators (EY, citing Brand Equity and BW, [April 2024, p.9](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) or 5–10% ([Kofluence blog, 2026-07-22](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/); company claim). No Indian data on comments per post was found. *Return:* only when orders arrive. *Invite:* low. *Share:* high; each shop link is a branded page seen by buyers. *Network effect:* weak. *Loop* [Inference]: Instagram post → DM sends shop link → prepaid, tracked sale with COA → thank-you page shows emerging artists in the same style or city → buyer follows or buys another artist → that artist sees Underdawg-originated sales → more artists open shops.

*Outside India (background only).* Accounts with 1–5K followers average only 1–3 comments per post ([Socialinsider 2026](https://www.socialinsider.io/social-media-benchmarks/instagram)), so comment-triggered selling starts small.

**7. Role**

Monetisation High (most direct revenue line); Retention Medium for sellers, Low otherwise; Activation Medium (mockup "wow", first listing); Acquisition Low-Medium; Engagement Low; Discovery Low by default, Medium with fair buyer pages [Inference].

**8. Risks and how competitors handle them**

*RBI payment rules.* The RBI (Regulation of Payment Aggregators) Directions were issued on 15 September 2025 ([full text via TaxGuru, Sept 2025](https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html)).
- Only an RBI-authorised payment aggregator (PA) may pool money for merchants. It needs a net worth of ₹15 crore at application and ₹25 crore by the end of its third financial year.
- The PA must keep the money "in a separate escrow account with any Scheduled Commercial Bank".
- "The escrow account shall not be operated for 'Cash-on-Delivery' transactions."
- "A PA business shall not carry out marketplace business." A marketplace must not accept payments for a seller who is not onboarded on it.
- Marketplaces fall inside the "merchant" definition; lighter KYC applies below ₹40 lakh turnover ([Cyril Amarchand Mangaldas, 2025-09-23](https://www.cyrilshroff.com/wp-content/uploads/2025/10/Client-Alert-RBI-Introduces-Consolidated-Framework-for-Payment-Aggregators-3.pdf)).
- **Held money must sit with a licensed PA, never in Underdawg's account** [Inference].

*GST, TCS, TDS — the rule that shapes the design.*
- If Underdawg collects the money, it is an e-commerce operator (ECO). It must register for GST whatever its turnover, collect **0.5% GST TCS** (from 10 July 2024; 1% before) and file GSTR-8 ([ClearTax](https://cleartax.in/s/tcs-under-goods-and-services-tax); [ClearTax](https://cleartax.in/s/tds-and-tcs-under-gst)).
- It must deduct **0.1% income-tax TDS** (Section 194-O, now Section 393(1) of the Income Tax Act 2025). Individual sellers with gross sales up to ₹5 lakh a year who give a PAN or Aadhaar are exempt; the rate is 5% without one ([ClearTax](https://cleartax.in/s/section-194o); [Tax Garden](https://taxgarden.in/blog/tds-on-ecommerce-payments-section-194o-393-guide-india-fy-2026-27)).
- **Unregistered sellers may sell goods through an ECO only within their own state**, after enrolling on the GST portal with a PAN (Notification 34/2023; in force from 1 Oct 2023) ([TaxGuru](https://taxguru.in/goods-and-service-tax/facility-enrolment-supply-goods-e-commerce-operators-gst-un-registered-suppliers.html); [ONDC GST note, c. late 2023](https://ondc-static-website-media.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/files/ONDC_Guidance_On_Tax/ondc_note_on_unregistered_and_composition_sellers_1.pdf)).
- The GST registration threshold for goods is ₹40 lakh turnover ([ClearTax](https://cleartax.in/s/gst-registration-limits-increased)). Most emerging artists are below it, and only **15.2% of Indian creators** are business- or GST-registered ([Kofluence 2026 via The Wire, 2026-05-14](https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age); company claim). Under escrow, most artists could sell only in their own state [Inference].
- GST on paintings fell from 12% to **5%** on 22 Sept 2025 ([PIB](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/sep/doc202594628401.pdf)), "without ITC" per a lawyer ([ArtSceneIndia, Sept 2025](https://www.artsceneindia.com/2025/09/GST-on-FineArt-Benefits-and-Implications.html)).
- *Gap:* a possible handicraft inter-state exemption for paintings was not verified; get a chartered accountant's (CA) opinion.

*COD and return-to-origin (RTO).* COD is 60–65% of Indian e-commerce orders ([ET Prime via Razorpay](https://razorpay.com/blog/cash-on-delivery/)). Four Indian sources agree that COD orders come back far more often than prepaid ones:

| Source | COD orders returned | Prepaid orders returned |
|---|---|---|
| Shipway "ShipNotes", D2C shipments, FY25 ([MediaBrief, 2025](https://mediabrief.com/shipnotes-reveals-26-rto-rate-on-cod-orders-across-india/)) | nearly 26% (Vadodara 18%, Patna 35%) | less than 2% |
| [ProfitBox360, 2026-09-19](https://www.profitbox360.com/research/india/ecommerce/cod-prepaid-rto-rates-india) | 24.3% | 2.8% |
| Pragma via [Amazon Shipping India, 2026-08-25](https://shipping.amazon.in/blog/cod-vs-prepaid-festive-season-surge-india) | 28–35% | 4–8% |
| [Razorpay](https://razorpay.com/blog/cash-on-delivery/) | 25–30% | 2–3% |

Slow delivery makes it worse: Shipway found 35% of COD orders returned when delivery took more than five days. Each RTO costs the seller ₹172.50 (ProfitBox360) or ₹180–240 ([EasySell citing Shipway, 2026-04-20](https://easysellapp.com/blogs/wiki/cod-order-value-rto-rate-price-range-delivery)). A returned original also travels twice [Inference]. These are general e-commerce figures; no art-specific Indian data exists. **No COD for originals.**

*Damage, returns, fraud, IP.* No Indian data exists on shipping damage or return rates for artworks. Lost card chargebacks are deducted from the seller ([Razorpay Docs](https://razorpay.com/docs/payments/disputes/)). India's IT Rules require a platform with user content to name a Grievance Officer, acknowledge complaints within 24 hours and resolve them within 15 days ([PIB, 2021-02-25](https://pib.gov.in/PressReleseDetailm.aspx?PRID=1700749)). The 2026 amendment requires AI-generated images to carry "a clear and noticeable label" ([SCC Online, 2026-02-12](https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/)), which covers AI wall mockups. Fake sales could be staged to earn "verified" badges, and AI mockups could worsen a buyer's fear that the work looks different [Inference].

*Meta and app stores (global platform rules that apply in India).* Instagram messaging has **no payment message type**; one private reply per comment within 7 days; non-followers land in Requests ([Meta docs](https://developers.facebook.com/docs/instagram-platform/private-replies)). Google Play exempts physical goods from its billing ([Google Play policy](https://support.google.com/googleplay/android-developer/answer/9858738)); Apple's physical-goods rule was not recorded (gap). Web checkout avoids both [Inference].

*How Indian competitors handle it:* they hold the artist's money until after delivery (Artflute 15 working days, Mojarto 21 working days), curate sellers (Artflute, Mojarto), and absorb COD returns on POD (Qikink).

*Outside India (background only).* 11% of online art buyers reported transit damage in 2020 (31% in 2019), and 56% were put off by return policies ([Hiscox 2020](https://www.hiscox.co.uk/sites/default/files/documents/2021-04/hoatr_report_2020_part3.pdf)).

**9. Scale dependency** [Inference]

*1,000 artists:* Shop-lite works as a single-player tool; disputes handled by hand. *10,000:* thank-you-page recommendations and local-pickup feeds in the top 5–8 metros; a dedicated dispute person; automated GST if escrow. *100,000:* a buyer-facing "emerging art" destination if buyer acquisition works. *Large:* international shipping, EMI and advisory services. No Indian data supports these last three; outside India, 37% of hesitant buyers want interest-free plans and 79% of new buyers want an advisor ([Hiscox 2023, p.16](https://www.hiscox.co.uk/sites/default/files/documents/2023-04/Hiscox%20online%20art%20trade%20report%202023.pdf)).

**10. India specifics**

- *Shipping.* Shiprocket's average shipment cost is ₹45 on the free plan, falling to ₹41, ₹39 and ₹36 on the ₹199, ₹499 and ₹799 monthly plans; it covers 19,000+ pincodes ([Shiprocket, 2026-10-01](https://www.shiprocket.in/pricing/)). The weight basis is not stated. A framed painting is billed on volume and will cost more (gap).
- *Etsy is export-only.* Etsy stopped taking new Indian sellers in November 2023, and Indian shops "cannot accept domestic sales" ([Etsy Help India, snapshot 2024-07-21](https://help.etsy.com/hc/en-in/articles/6742925359255-How-to-Accept-Payments-as-a-Seller-in-India)). Onboarding reportedly resumed in June 2025 for exports only ([ShipGlobal](https://shipglobal.in/blogs/etsy-new-sellers/); Reported). A domestic art checkout complements Etsy [Inference].
- *Payment cost.* From 15 Oct 2026, UPI merchant payments above ₹2,000 carry 0.4% (capped at ₹300) ([MediaNama, 2026-09-28](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/)). Person-to-person transfers stay free, and so do small merchants who receive up to ₹1 lakh a month by QR into their own account ([The Indian Eye, 2026-09-18](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/)). Gateways charge 2% + 18% GST even on UPI ([Razorpay](https://razorpay.com/pricing/)).
- *Gaps:* India online art and craft market size; courier cost and damage rates for framed work; export rules for contemporary art.

**11. Recommended implementation — how the Art Shop should work**

The proposed default (buyer pays, money held, artist books pickup, release after delivery) is the right **end state**. Indian online galleries already work this way: Artflute and Mojarto pay the artist only after the buyer has the work. It answers a buyer's doubts about seller reputation, returns and shipping. In India it triggers ECO tax duties, PA rules and an intra-state limit for unregistered artists, so build it in phases.

*Phase 0 — "Shop-lite" experiment (now, ~1,000 artists), self-shipped work:*
1. **List.** Type: original (1 of 1), limited edition (e.g. 3/25), open print, photo print or craft. **At least 3 real photos** (front, angle, texture close-up). Medium, size, packed size and weight, price, quantity, dispatch time, shipping by zone or local pickup, returns rule, and an "AI used?" declaration.
2. **Preview.** Optional AI wall mockup at true scale, labelled "visualisation". Never a replacement for photos.
3. **Sell.** Shop block on the link page; a keyword comment or DM triggers a **button-first** DM with the checkout link. A vendor reports 20–30% delivery for link-first DMs against 70–90% for button-first DMs ([Inro, 2026-07-15](https://www.inro.social/blog/instagram-comment-to-dm-automation); vendor claim, not India-specific).
4. **Pay.** **Prepaid only** (UPI or card), into a PA account **in the artist's name**; Underdawg holds nothing, avoiding ECO status until a CA confirms (gap). **0% platform fee** in the experiment; the artist pays gateway cost (≈2.36% incl. GST [Derived]) and shipping.
5. **Ship.** Packing checklist; "packed item" photo; **book a Shiprocket pickup in the flow** or enter own courier's tracking number. Buyer sees the dispatch deadline.
6. **Certify.** At "delivered", the order becomes a **verified sale**. Originals and editions get an automatic **digital COA** (unique ID, signature, QR to the sale record). Artflute already promises a COA "with every piece", so Indian buyers of originals will expect one. Outside India, 78% of hesitant buyers would trust a COA more and 72% want shipping and packing information ([Hiscox 2023](https://www.hiscox.co.uk/sites/default/files/documents/2023-04/Hiscox%20online%20art%20trade%20report%202023.pdf)).
7. **Cross-sell fairly.** Thank-you page and email show 2–3 emerging artists in the same style or city.
8. **Problems.** Damage claims need an unboxing video; originals returnable only if damaged or not as described. Underdawg mediates, warns and removes bad sellers.

*Phase 0 — optional POD path (prints, tees, mugs):* the artist uploads a file, picks Qikink or Printrove products (partner mockups), and prices above base. The partner prints, ships and acts as seller [Inference; confirm terms]. **COD only on this path**, because Qikink advertises "zero RTO charges". The artist keeps the margin. **Drop the planned visible "20% of margin"** (`LAUNCH_FEATURES_AND_COSTS.md`): Blinkstore's free stores pay up to ₹200 on a ₹599 tee, so a 20% cut looks worse than free. Seek a partner revenue share instead [Inference].

*Phase 1 — protected checkout (after PMF, ~10,000 artists):*
- **Holder:** a licensed PA's escrow or split-settlement product.
- **Release:** **5–7 days after courier-confirmed delivery** if undisputed — faster than Artflute (15 working days) and Mojarto (21 working days). Local pickup: buyer's OTP at handover releases money at once. Missed dispatch deadline: automatic refund.
- **Disputes:** unboxing video, packed photo, declared value or insurance above a price threshold; "verified" badges only after the no-dispute window.
- **Tax:** automated TCS and GSTR-8; GSTIN check for inter-state sellers; unregistered artists **intra-state only** with an enrolment number. CA sign-off first.
- **Fee:** about **8–10% all-in** on sales via the artist's own links. This sits beside Etsy's Indian rate (6.5% + 3–5% + ₹25), Instamojo (2–5% + ₹3) and Topmate (10%). On a ₹10,000 original: ₹800–1,000 against ₹4,000 at Artflute [Derived]. Pro subscribers: 0% on self-driven sales (Feature 18).
- **Open decision (the research notes disagree):** one suggests 15–20% on sales Underdawg's own pages originate; another says no extra fee for platform-driven sales to emerging artists. To stay fair, charge **no extra fee below a follower threshold** [Inference].

*Phase 2 (~100,000 artists):* a buyer-facing emerging-art destination with fair rotation; insurance partners; international prints via POD (Printrove ships to 220+ countries) before exporting originals.

*Do not:* allow COD on originals, rank by sales, sell boosts, show rivals on an artist's shop page, or let mockups replace photos. *North-star metric:* **share of shop-enabled artists with ≥1 sale in 90 days**; also DM-to-checkout conversion, on-time dispatch, dispute rate, and buyers who buy a second artist.

---

### Feature 12 — Tips via UPI (link page and DMs)

**Verdict:** Combine · **Priority:** BUILD EARLY as a zero-fee "Support" block on the link page; DM tipping = EXPERIMENT · Tipping is proven but low-yield, and a free personal UPI QR already does the basics, so it only justifies a cheap block that adds thanks, records and a fair supporter signal.

**1. Problem being solved**

Fans lack a low-friction, India-native way to give small amounts to an artist. Artists lack an easy way to receive, thank and record them [Inference].

*Indians already make small digital payments at huge scale.*
- UPI handled **24,161.69 crore transactions worth ₹314.23 lakh crore in FY2025–26**; 55.49 crore users were onboarded by June 2026 (Lok Sabha reply via [Punjab Kesari/IANS, 2026-07-20](https://english.punjabkesari.com/business/nearly-555-crore-users-onboarded-on-upi-by-june-fy26-transactions-cross-24161-crore-centre)).
- **86% of UPI payments to merchants are below ₹500** ([PIB, Aug 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2)).
- Indian users pay small amounts inside social apps: ShareChat's virtual gifting earns "$50 million annually" ([Wikipedia, undated](https://en.wikipedia.org/wiki/ShareChat); Low-Medium confidence).

*But fan money is a small part of Indian creator income.*
- Only 8–10% of India's creators "monetize their content effectively" (BCG via [PIB, 2025-05-02](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)).
- Sponsored collaborations are the main income for about 50% of creators; platform revenue (AdSense, Super Thanks) is the main income for about 15% ([Kofluence CEO, IBTimes India, 2025-07-08](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077); company claim).
- Indian audiences rarely pay for music: only 38% of smartphone owners have ever paid for music streaming, and 49% of those who never paid say it "isn't worth paying for" (EY-IMI via [Variety, July 2026](https://variety.com/2026/music/asia/india-paid-music-subscribers-30-million-2028-1236820218/)).
- Qoohoo, an Indian creator–fan engagement app, raised $800,000; its revenue fell 95.5% to ₹5.3 lakh in FY25 ([Inc42 Datalabs](https://inc42.com/company/qoohoo/); indicative).
- **No Indian data exists** on average tip size or on Instagram Gifts payouts in India.

*Severity:* low to moderate (extra income). *Frequency:* set up once; tips cluster around releases. *Segments:* streaming or busking musicians, illustrators with engaged fans, performers; weakest for photographers and designers. *Workaround* [Assumption; not checked with Indian artists]: personal UPI QR in the bio, Indian payment pages (SuperProfile, Razorpay, Instamojo), Instagram Gifts.

*Why the existing options fall short in India.*
- A personal UPI QR gives no receipt, thanks or records [Inference].
- Foreign tip jars do not use UPI. Buy Me a Coffee lists cards, Apple Pay and Google Pay but **not UPI** ([BMC FAQ, 2026-03-18](https://help.buymeacoffee.com/en/articles/4539170-frequently-asked-questions)). Ko-fi relies on PayPal and Stripe. Stripe India went invite-only in June 2024 ([MediaNama](https://www.medianama.com/2024/06/223-stripe-invite-only-services-in-india-temporarily-citing-regulations/)). PayPal India charges 4.40% + $0.30 + 3.0% conversion and handles international payments only ([PayPal, 2024-03-28](https://www.paypal.com/in/webapps/mpp/merchant-fees)).
- Instagram Gifts need **500 followers** and pay in dollars ([WebHippo, 2026-07-29](https://webhippo.in/blog/instagram-monetization-india); secondary). *Conflict:* WebHippo says India is eligible; the competitor-matrix check could not verify that. Instagram Badges "may not be available in your region" ([Instagram](https://creators.instagram.com/earn-money/badges)).

*Outside India (background only).* Creators earned about $100M a year on Ko-fi (Stripe data via [The Fintech Times, 2023-09-08](https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/)). Buy Me a Coffee's CEO named India among markets where "$100 means a lot" ([Mercury, 2023-09-06](https://mercury.com/blog/founder-spotlight-jijo-sunny-buy-me-a-coffee)).

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Personal UPI QR | India | QR in bio | Fan scans and pays | Everyone | Free (person-to-person has no merchant fee) | UPI: 24.51bn transactions, Aug 2026 | Zero fee | No receipts or records | Adds records, thanks, supporter graph | [MediaNama, 2026-09-17](https://www.medianama.com/2026/09/223-upi-transactions-august-2026/) |
| Razorpay Payment Pages | India | DIY support page | 0.2% + 2% gateway + 18% GST on fee; T+1 | Small businesses | Pay per use | No data | UPI, rupees | Generic | No artist identity | [Razorpay](https://razorpay.com/pricing/) |
| Instamojo payment links | India | Payment link usable as a tip link | 2% + ₹3; payout at T+3 | Small sellers, creators | Free plan + fee | No data | UPI built in | Generic | No artist identity | [Instamojo](https://www.instamojo.com/pricing/) |
| SuperProfile, Exly, TagMango (UPI storefronts) | India | Payment pages on a creator's link | 3–10% commission by plan (see Feature 13) | Creators, coaches | Freemium | Company claims only (see Feature 13) | Rupees and UPI | Commission even on small amounts | 0% fee; artist focus | [SuperProfile plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro); [Exly](https://exlyapp.com/pricing); [TagMango](https://tagmango.com/pricing) |
| Topmate "Priority DM" | India-focused | Paid DMs | 10% direct, 20% marketplace | Experts | Commission | "1mn+ professionals" (company claim) | Rupee pricing | Trustpilot removed fake reviews | Paid access, not tips | [Topmate](https://topmate.io/pricing) |
| ShareChat / Moj | India | Virtual gifts | Fans buy gifts in live sessions | Vernacular audiences | Paid gifts | ~$50M a year (undated) | Indian small payments proven | Not artist-specific | Artist-only, UPI | [Wikipedia](https://en.wikipedia.org/wiki/ShareChat) |
| Instagram Gifts (India status unverified) | USA | Gifts on Reels | $0.01 per Star to creator; 500 followers, 18+ | Instagram creators | Free; Meta keeps the spread | No India payout data | Zero friction | Excludes small accounts; paid in dollars | Open to the smallest artists | [WebHippo](https://webhippo.in/blog/instagram-monetization-india) |
| YouTube Super Thanks (India listed) | USA | Tips on videos | Creator gets 70% after fees | Partner Programme creators | Free | No India data | Native | 30% share | Not gated | [YouTube Help](https://support.google.com/youtube/answer/10878910?hl=en); [YouTube Help, India list](https://support.google.com/youtube/answer/10879035) |

*Outside India (background only)*
- **Ko-fi** (UK) takes 0% on tips if "Contributor" is off and 5% if on; payments run through PayPal or Stripe, with no UPI ([Ko-fi Help](https://help.ko-fi.com/hc/en-us/articles/25143210488477-Contributor-status)). It is the benchmark for a 0% tip fee.
- **Buy Me a Coffee** (USA) takes 5% + Stripe 2.9% + $0.30 and a 0.5% payout fee; no UPI; Trustpilot 3.9/5 (1,649 reviews) with "funds locked" complaints ([BMC fees](https://help.buymeacoffee.com/en/articles/8105744-how-to-calculate-charges-on-your-payment); [Trustpilot](https://www.trustpilot.com/review/buymeacoffee.com)).

**3. Uniqueness**

**Very common**, in India and elsewhere. No India-specific artist tip product was verified. *Functional:* none. *Audience:* low. *Workflow:* modest; Topmate and SuperProfile already send links by auto-DM. *Network:* weak (single-player). *Data:* moderate if designed: a cross-artist "who supports whom" graph Instagram does not share [Inference]. *Discovery:* none by default. *Combination:* artists-only + UPI + supporter graph is uncommon but copyable.

**4. Artist value**

*Meaningful:* small income and a list of high-intent fans for later tickets or sessions. *Vanity:* public tip counts and leaderboards, which shame artists who get nothing [Inference].

**5. Discovery impact**

No direct effect. *Bias:* money follows existing fame. In India, "most of the earnings go to the top 1%" of creators ([Outlook Business, citing Mint, undated](https://www.outlookbusiness.com/ampstories/news/india-loses-2-lakh-creators-amid-burnout-low-payheres-what-you-need-to-know); secondary), and 69% of authors and composers paid by IPRS received under ₹25,000 a year ([EY, "The music creator economy", Dec 2023, p.27](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)). *An Indian precedent for a fair signal:* YouTube Hype launched in India in July 2025 for channels with 500 to 500,000 subscribers; viewers get three free hypes a week and smaller channels get bonus points ([BuzzInContent, 2025-07-15](https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785)). *Fair-discovery mechanisms* [Inference]: never rank by amount; supporters per active follower, capped; a "first supporter" highlight only below a follower threshold (the reverse of Instagram's 500 gate); after a tip, show 2–3 similar emerging artists; keep amounts private.

**6. Artist behaviour**

Zero-effort extra income; rarely touched after setup; occasional "support my release" posts; weak reason to return; few invites; the button is shared on Instagram; no network effect. *Loop* [Inference]: fan tips → sees similar emerging artists → supports them → they share their pages. It works only if Underdawg owns the after-payment screen.

**7. Role**

Artist-side monetisation and light engagement. At 0% fee Underdawg earns nothing — still right against a free QR [Inference].

**8. Risks and how competitors handle them**

- *UPI rules.* NPCI ended person-to-person "collect requests" on 1 Oct 2025, so "request money" prompts by DM are impossible; the payer must start the payment ([Outlook Money, 2025-08-16](https://www.outlookmoney.com/banking/npci-to-end-upi-p2p-collect-requests-from-october-1-to-reduce-fraud)). Whether `upi://` links open inside Instagram DMs is **not verified** [Assumption].
- *Holding funds.* Not allowed for Underdawg (see Feature 7, RBI rules). Use a PA split product such as Razorpay Route (0.1% + gateway fee) ([Razorpay](https://razorpay.com/pricing/)).
- *Disputes.* Card chargebacks can be lost; Razorpay's dispute page does not cover UPI ([Razorpay Docs](https://razorpay.com/docs/payments/disputes/)).
- *Payout delays.* SuperProfile payout delays are reported by a secondary source ([CreatorLane](https://creatorlanehq.com/learn/superprofile)). No Indian complaint data was gathered for Razorpay Payment Pages or Instamojo.
- *Tax.* Tips are likely taxable for the artist; whether GST applies to voluntary tips needs a CA [Assumption]. *Money-mule risk* [Assumption].
- *App stores (global rules that apply in India).* Apple Guideline 3.1.1: "Apps may use in-app purchase currencies to enable customers to 'tip'…" ([Apple](https://developer.apple.com/app-store/review/guidelines/)). **Keep tipping on the web page** [Inference].
- *Competitors:* YouTube keeps 30% of Super Thanks; Meta pays a fixed $0.01 per Star.

*Outside India (background only).* Frozen payouts are a repeated Trustpilot complaint at foreign payment tools (Buy Me a Coffee above; [Gumroad](https://www.trustpilot.com/review/gumroad.com) 1.4/5). Apple took 30% of new Patreon iOS memberships from Nov 2024 ([Patreon, 2024-08-12](https://news.patreon.com/articles/understanding-apple-requirements-for-patreon)).

**9. Scale dependency**

Works at **1,000 artists** alone. A supporter graph for recommendations needs ~10,000+ artists with repeat fans; valuable at 100,000+ [Inference].

**10. India specifics**

- *Scale.* UPI handled **24.51bn transactions worth ₹29.82 lakh crore in August 2026** (average ≈ ₹1,217; +22% year on year) ([MediaNama, 2026-09-17](https://www.medianama.com/2026/09/223-upi-transactions-august-2026/)). The average UPI payment has fallen every year, to about ₹1,301 in FY2025–26 [Derived].
- *The new merchant fee.* From **15 Oct 2026**, merchant payments above ₹2,000 pay 0.4%, capped at ₹300 for payments above ₹75,000. Person-to-person payments, merchant payments up to ₹2,000, and small merchants receiving up to ₹1 lakh a month by QR stay free. Merchants may not pass the charge to customers ([The Indian Eye, 2026-09-18](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/); [MediaNama, 2026-09-28](https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/)). *Conflict:* proposals of 5–7 basis points were reported earlier ([Tech Times, 2026-08-04](https://www.techtimes.com/articles/322958/20260804/india-opens-door-upi-merchant-fees-parliament-amends-six-year-zero-mdr-law.htm)). Trader bodies called a "No UPI Day" on 2 October 2026 in protest (MediaNama).
- *What a ₹500 tip costs* [Derived]:

| Route | Cost on a ₹500 tip |
|---|---|
| Personal UPI QR | ₹0 |
| Razorpay standard gateway | ₹11.80 (2.36%, incl. GST on the fee) |
| Razorpay Payment Pages | ≈ ₹12.98 (2.6%) |
| Topmate or SuperProfile Starter | 10% or more (gateway charge unclear) |
| YouTube Super Thanks | 30% platform share |

**11. Recommended implementation**

1. A **"Support" block** on the link page with suggested amounts (₹50 / ₹100 / ₹250) and a note field.
2. *Simple mode:* the artist's own UPI QR or intent link — payer-initiated, zero merchant fee, no money touched by Underdawg, but unverifiable. *Verified mode:* gateway checkout into the artist's PA account (≈2.36% cost) with receipts, automatic thanks and supporter records [Inference].
3. **0% platform fee** in both modes. Amounts private. After a tip, show 2–3 similar emerging artists.
4. **DM tipping** only as an experiment after DM automation is proven: a button-first DM to the Support page; test UPI deep links first.
5. Web only. Do not market tips as a reason to join.

---

### Feature 13 — Digital downloads (free for email, or paid presets, brushes, beats, wallpapers)

**Verdict:** Modify · **Priority:** BUILD EARLY (free download for email or follow); paid files BUILD AFTER PMF; asset directory = EXPERIMENT · Selling files is a commodity, but free downloads build an audience the artist owns, and artists buying other artists' assets is a real network angle.

**1. Problem being solved**

Asset makers (presets, brushes, beats, LUTs, wallpapers, sample packs) need cheap India-native checkout and a way to turn followers into an owned audience [Inference].

*Selling files is an established business in India, but it serves coaches, not artists.*
- Topmate, SuperProfile, Instamojo, TagMango, Graphy and Exly all sell digital products in rupees (table below).
- TagMango claims "10,000+ Creators" and "₹1,000 Cr+ yearly creator earnings" ([TagMango](https://tagmango.com); company claims). Its own revenue rose 162.9% to ₹20.9 crore in FY25 ([Inc42 Datalabs](https://inc42.com/company/tagmango/)). Graphy claims "200,000+ Creators Worldwide" and "₹1,500 Crore+ Creator Revenue" ([Graphy](https://graphy.com); company claims).
- These tools are funded by a small number of high-earning coaches and are not built for low-earning artists [Inference]. Topmate's categories are career and tech, not art.
- Indian fees are 5–10% on the entry plans: Instamojo "5% + ₹3" (Lite, Starter) or "2% + ₹3" (Growth, ₹14,999 a year), with "higher rates" for digital products ([Instamojo](https://www.instamojo.com/pricing/)); Topmate 10% direct and 20% through its marketplace ([Topmate](https://topmate.io/pricing)).

*Foreign file-selling tools mostly do not work for Indian sellers.*
- Linktree sells digital products, courses and bookings only in 35 listed countries; "India is not on the list" ([Linktree help, updated ~2026-09-30](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features)).
- Stan Store's Stripe custom accounts are not available in India, though Stan also supports PayPal ([Stan help, 2026-09-28](https://help.stan.store/article/217-countries-available-for-stripe-custom-accounts)).
- **Instagram has no download feature**; its earn-money hub lists only Subscriptions, Partnership ads, Creator marketplace, Gifts, Badges and Bonuses ([Instagram](https://creators.instagram.com/earn-money)).

*Indian artists do spend on tools.* In a survey of 500 Indian music creators, 35% reinvest more than half of their music earnings in equipment, and 73% strongly feel they have much to learn about production ([EY, "The music creator economy", Dec 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)).

*No reliable Indian data exists* on earnings per digital-product seller, on piracy of such files, or on preset and brush selling.

*Severity:* moderate for producers, photographers, illustrators, designers; low for performers. *Frequency:* occasional launches, passive sales. *Workaround* [Assumption]: Instamojo, Topmate, SuperProfile, or a Drive link + UPI QR. *Why insufficient:* 5–10% fees on small sales; generic Indian tools with no artist audience; foreign tools that do not pay out in India.

*Outside India (background only).* Fans have paid $1.81 billion to artists on Bandcamp, with "an average of 82%" reaching the artist ([Bandcamp, accessed 2026-10-01](https://bandcamp.com/about)). Selling files is still a minority activity: 10% of niche creators sell "paid downloadable resources" ([Linktree Creator Report 2022, n=9,576](https://linktr.ee/creator-report/)).

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Topmate | India-focused | Products, courses | 10% direct; 20% marketplace | Experts | Commission | "1mn+ professionals" (company claim) | Rupee pricing; marketplace | Fake reviews removed by Trustpilot | Career and tech, not art | [Topmate](https://topmate.io/pricing) |
| SuperProfile (Cosmofeed) | India | Link-in-bio, products, AutoDM | Free at 10%; ₹11,999/yr at 5%; ₹49,999/yr custom | Indian creators | Freemium | ~50,000 creators (secondary); company revenue ₹11.7 crore in FY25 (Inc42 Datalabs) | Rupees; AutoDM | Payout delays (secondary) | Generic | [Plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro); [CreatorLane](https://creatorlanehq.com/learn/superprofile); [Inc42](https://inc42.com/company/cosmofeed/) |
| Instamojo | India | Store, digital products | 5% + ₹3 or 2% + ₹3 (₹14,999/yr); "higher rates" for digital | Small businesses | Freemium | No data | Rupees and UPI | No data | Generic | [Instamojo](https://www.instamojo.com/pricing/) |
| TagMango | India | Courses, digital products, communities | Basic: no fixed fee + 10% (200 students); Pro ₹5,000 + GST a month + 5.5%; Advanced ₹15,000 + 3.5%; Ultimate ₹30,000, zero commission | Coaches | Freemium | "10,000+ Creators"; "₹1,000 Cr+ yearly creator earnings" (company claims); revenue ₹20.9 crore FY25 (Inc42 Datalabs) | Indian gateway included | Built for course businesses | Artist assets, 0% on free packs | [TagMango pricing](https://tagmango.com/pricing); [Inc42](https://inc42.com/company/tagmango/) |
| Graphy (Unacademy group) | India | Courses, digital products | ₹24,999/yr + 10% per sale; ₹49,999/yr + 7.5%; ₹99,999/yr + 5% | Course sellers | Paid | "200,000+ Creators Worldwide" (company claim) | Full course tools | High fixed fee | Not priced for small artists | [Graphy pricing](https://graphy.com/pricing) |
| Exly | India | Digital products, workshops | 10%; ₹2,500/mo at 6%; ₹9,000/mo at 3% | Coaches | Freemium | "100,000+ creators strong" (site claim) vs 10,000+ customers in Mar 2024 (Entrackr) | UPI, cards, net banking | Generic | Artist focus | [Exly](https://exlyapp.com/pricing); [Entrackr](https://entrackr.com/2024/03/y-combinator-backed-exly-raises-6-2-mn-led-by-chiratae/) |
| Drive link + UPI QR | India | Informal workaround | Share a file link after a UPI payment | All artists | Free | Not evidenced [Assumption] | Zero fee | No delivery control, no email list | Adds gating, list and records | — |
| Linktree (India) | Australia | Digital downloads | Native, but not available in India | Creators | — | See Feature 7 | — | Not offered in India | Rupee and UPI selling | [Linktree help](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features) |

*Outside India (background only)*
- **Stan Store** (USA; $29 or $99 a month, "zero transaction fees") pairs a free lead magnet with an auto-DM and email capture. It is the closest model for the free-download block, but it is dollar-priced and generic ([Stan](https://stan.store/blog/stan-store-pricing/)).
- **Bandcamp** (USA) takes 15% on digital sales (10% after $5k) and is music-only, with no UPI ([Bandcamp](https://bandcamp.com/about)).

**3. Uniqueness**

**Very common.** *Functional:* none. *Audience:* low. *Workflow:* free-for-DM-opt-in plus email already exists abroad (Stan). *Network:* **real potential** — artists buy other artists' brushes, presets and samples [Inference]. *Data:* which assets turn strangers into fans. *Combination:* artists-only asset directory + 0% free downloads + UPI is uncommon in India.

**4. Artist value**

*Meaningful:* a **free-for-email download builds an owned audience** that survives algorithm and platform shocks. India has lived through such a shock. India banned TikTok on 29 June 2020 ([Wikipedia](https://en.wikipedia.org/wiki/Censorship_of_TikTok); secondary), and creators lost their audience and earnings overnight ([Al Jazeera, 2020-07-01](https://www.aljazeera.com/amp/economy/2020/7/1/indias-tiktok-ban-hurts-content-creators-earnings-prospects)). The Indian replacements then shrank: Moj's daily active users fell from 9.24 million (Jan 2021) to 2.16 million (Jan 2023), and Josh's from 5.77 million to 1.11 million (Apptopia via [MediaNews4U, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/)). An email list is the one audience an artist keeps. Paid files give small income for most. *Vanity:* download counts not tied to follows or emails.

**5. Discovery impact**

Free packs searchable by style, skill and tool can surface artists across disciplines (a photographer finds a colourist's LUTs) [Inference]. *Bias:* best-seller lists favour incumbents. Topmate charges 20% on marketplace sales against 10% on direct sales, so it treats discovery as a premium. *Fair-discovery mechanisms* [Inference]: rotate new and under-1k-follower packs into every category; **no extra fee** on platform-driven sales to emerging artists; multi-artist "starter kit" bundles.

*Outside India (background only).* Gumroad does the same at a higher rate: 10% + $0.50 direct, 30% through its Discover marketplace ([Gumroad](https://gumroad.com/pricing)).

**6. Artist behaviour**

Used to grow a list and earn; occasional launches, weekly checks. Artists **do create content for it** (freebies promoted with Reels). Download alerts bring them back; collaborative bundles may drive invites; links are shared externally. Network effect weak to moderate. *Loop* [Inference]: free pack → downloads with follow or email → downloaders see related emerging artists' packs → some upload their own → catalogue and search traffic grow.

**7. Role**

Acquisition (shared links), activation (quick first win), monetisation, possible discovery.

**8. Risks and how competitors handle them**

- *Content risks* [Inference]: piracy, copyright (others' samples or fonts; AI packs), refunds, low-quality packs, storage costs.
- *Tax.* TDS of 0.1% covers "goods, services, or both", but not individual sellers up to ₹5 lakh a year ([ClearTax](https://cleartax.in/s/section-194o)).
- *Privacy.* India's DPDP Act defines a child as anyone under 18 and bars tracking or targeted ads aimed at children ([DPDP Act 2023, MeitY](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)). A child's data needs verifiable parental consent. The Rules were notified on 14 November 2025 with an eighteen-month phased compliance period; penalties reach ₹200 crore for breaking children's obligations ([PIB, 2025-11-17](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf); [Wikipedia](https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Act,_2023) gives 13 November). Email capture needs clear consent [Inference].
- *AI labels.* The 2026 IT Rules amendment requires a clear label on AI-generated visual content ([SCC Online, 2026-02-12](https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/)).
- *App stores (global rules that apply in India).* Google Play requires its billing for in-app digital content ([Google Play](https://support.google.com/googleplay/android-developer/answer/9858738)), and Apple forced Patreon onto in-app purchase ([Patreon](https://news.patreon.com/articles/understanding-apple-requirements-for-patreon)) — **sell files on the web page** [Inference].
- *Competitors:* content bans and payout reviews. Outside India, Gumroad and [Lemon Squeezy](https://www.lemonsqueezy.com/pricing) act as merchant of record and handle tax.

**9. Scale dependency**

Single-player at **1,000**; cross-artist discovery at **~10,000+** with enough packs per style; self-sustaining marketplace at **100,000+** [Inference].

**10. India specifics**

Indian tools charge 5–10% on entry plans (SuperProfile, Topmate, Instamojo, TagMango; Exly 10/6/3%; Graphy 10/7.5/5% ([Exly](https://exlyapp.com/pricing); [Graphy](https://graphy.com/pricing))). Payments up to ₹2,000 keep zero UPI merchant fee after 15 Oct 2026, but gateways charge ~2% + GST. Most UPI merchant payments are small (86% below ₹500), so low-priced packs fit Indian payment habits. **A 0% fee on free and low-priced packs would stand out** [Inference]. *Gaps:* Indian piracy evidence; Indian seller earnings; BeatStars, Splice and ArtStation fees.

**11. Recommended implementation**

1. **Build early — "Free download" block.** Upload a file; gate by email (consent tick) and/or Instagram follow. Meta lets a tool check "follows you" only after the user messages or taps ([Meta messaging doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md)), so the follow gate runs in DMs: "comment PACK" → button-first DM → download page. Expiring links. **Exportable email list.** 0% fee. Show 2–3 related free packs after download.
2. **After PMF — paid files:** UPI checkout into the artist's PA account; **0–5% fee** + gateway; per-buyer links and download limits; licence template; refunds only for broken files; ownership declaration for samples and fonts; "AI-generated" label.
3. **Experiment — artists-only asset directory** by tool, style and skill, with fair rotation and no extra fee on platform-driven sales to emerging artists.

---

### Feature 14 — Bookings and 1:1 sessions (slots, deposit, meeting link)

**Verdict:** Experiment · **Priority:** EXPERIMENT (pilot: paid portfolio reviews and music lessons), then BUILD AFTER PMF · Paid 1:1 time has the strongest income evidence of the money tools and real artist-to-artist potential, but Topmate leads in India and stand-alone call products have failed.

**1. Problem being solved**

Teaching and advising artists need booking, deposit, payment and a meeting link in one flow; emerging artists want affordable feedback [Inference].

*Indian evidence that paid 1:1 time earns money.*
- Topmate creators earned **₹1,79,87,317 in September 2023**, of which **₹70.5 lakh came from 1:1 calls** (~39% [Derived]), with 12.1k new creators that month ([Topmate co-founder on LinkedIn, ~Oct 2023](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O); founder post).
- Live teaching by working musicians is a real Indian business. Artium Academy claims "45,000+ Learners" and "400+ Teachers" ([Artium Academy](https://artiumacademy.com); company claims); its revenue was ₹28.0 crore in FY25, up 46.3% ([Inc42 Datalabs](https://inc42.com/company/artium-academy/)). Muzigal's was ₹13.7 crore, down 8.6% ([Inc42 Datalabs](https://inc42.com/company/muzigal/)).
- Indian artists want to learn. 73% of 500 Indian music creators strongly feel they have much to learn about production, and 56% about monetisation ([EY, "The music creator economy", Dec 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)).
- Indian artists already teach on the side. Musicians say survival relies on session work, teaching, ad jingles and commercial gigs ([The Indian Music Diaries, 2025-09-26](https://theindianmusicdiaries.com/who-gets-to-stay-indie-the-struggles-behind-the-indian-independent-music-scene/)).
- Indian illustrators have no agents and no rate guide: "India has zero illustration agencies" ([Aparajitha Vaasudev, Substack, 2026-08-19](https://studioapara.substack.com/p/india-has-no-illustration-agents)). Paid advice from an experienced artist fills that gap [Inference].

*The gap.* Topmate's only creative category is "Product & Design" ([Topmate](https://topmate.io/)); its categories are career, tech, finance and astrology. No art- or music-focused 1:1 marketplace was verified in India.

*Indian counter-evidence.*
- An unsourced blog claims Topmate's bottom 80% earn under ₹5,000 a month ([EximPe, 2026-03-28](https://eximpe.com/blog/payments/topmate-io-the-complete-guide-to-getting-started-earning-money-avoiding-pitfalls); Low confidence).
- FrontRow (celebrity-led hobby classes) shut on 30 June 2023 ([TechCrunch, 2023-07-10](https://techcrunch.com/2023/07/10/frontrow-shutdown)). It had raised about $18 million (TechCrunch) or $20.29 million ([Inc42 Datalabs](https://inc42.com/company/frontrow/)) and reached $3–4 million of annualised revenue, but was "not venture-scalable". Marketing exceeded 100% of revenue in mid-2021 and the market was "way smaller than anticipated" ([The Runway, 2025-02-02](https://www.therunway.ventures/p/frontrow)).
- The lesson from Artium, Muzigal and FrontRow together: recorded celebrity classes failed; live teaching by ordinary working artists earns ₹14–28 crore a year [Inference].
- **No Indian price data** exists for music lessons or portfolio reviews.

*Severity:* moderate-high for teaching musicians and design or illustration mentors; low for others. *Frequency:* weekly for active teachers. *Workaround* [Assumption; not checked with Indian artists]: DM → WhatsApp → UPI QR → Google Meet, or Topmate. *Why insufficient:* Topmate is career-led; Calendly and Cal.com rely on Stripe or PayPal, and Stripe India is invite-only; Linktree's booking feature is not offered in India; none offer discovery among artists.

*Outside India (background only).* No Indian figure exists for the share of musicians who teach; in the UK, 36% of musicians are private teachers ([Musicians' Census 2023](https://musicianscensus.co.uk/s/Musicians-Census-Financial-Insight-Report-Accessible-Format.docx)). India has no case yet of a stand-alone paid-call product; in the US, Superpeer ($10M raised, 2020) was bought by Skillshare in March 2024 and closed as a stand-alone ([Dealroom](https://dealroom.co/companies/superpeer)).

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Topmate | India-focused | 1:1 sessions, webinars, Auto DM | 10% direct, 20% marketplace; transaction fees "2%/3%" and "2.9%" shown | Experts | Commission only | ₹1.80 crore earned by creators (Sep 2023); "1mn+ professionals", "100k+ reviews" (company claims) | Rupee pricing; marketplace | Fake reviews removed; all-in ~13–18% (secondary, Low) | Not artist-focused | [Pricing](https://topmate.io/pricing); [About](https://topmate.io/about) |
| Exly | India | 1:1 consultations, workshops | 10%; ₹2,500/mo at 6%; ₹9,000/mo at 3% | Coaches | Freemium | $6.2M raised (Mar 2024); "100,000+ creators strong" (site claim) vs 10,000+ customers in Mar 2024 (Entrackr) | Offline sessions; UPI | No data | Generic | [Exly](https://exlyapp.com/pricing); [Entrackr](https://entrackr.com/2024/03/y-combinator-backed-exly-raises-6-2-mn-led-by-chiratae/) |
| TagMango / Graphy | India | Paid sessions, courses, webinars | TagMango Basic 10%; Graphy ₹24,999/yr + 10% | Coaches, course sellers | Freemium / paid | Company claims (see Feature 13) | Full course tools | High fixed fees | Not priced for small artists | [TagMango](https://tagmango.com/pricing); [Graphy](https://graphy.com/pricing) |
| Artium Academy | India (Mumbai) | 1:1 live online music classes | Platform-run certified teachers; free trial | Learners of all ages | Paid | "45,000+ Learners", "400+ Teachers" (company claims); revenue ₹28.0 crore FY25 (Inc42 Datalabs) | Proven Indian live-learning model | Teachers are hired by the platform | Any artist can offer sessions | [Artium](https://artiumacademy.com); [Inc42](https://inc42.com/company/artium-academy/) |
| MeMeraki | India | Masterclasses and workshops by traditional artists | Sold beside its art shop | Learners | Paid | Company claims (see Feature 7) | Artist-taught | Heritage crafts only | All disciplines | [MeMeraki](https://www.memeraki.com/) |
| StarClinch | India | Event booking of performers | 15% of the artist's fee; ₹7.5 lakh penalty for off-platform deals. "Escrow-style payments" was recorded on 1 Oct 2026 but not found on the pages opened on 2 Oct | Performers | 15% of fee | "17,000+ artists" in 450+ cities (page as read 2026-10-01) vs "10K+" (same page, 2026-10-02); company claims. Revenue ₹2.4 crore FY25 (Inc42 Datalabs) | India-native | 15% fee; penalty; "does not guarantee you any work" | Client event bookings, not fan sessions | [Our story](https://starclinch.com/our-story); [Terms](https://starclinch.com/terms-of-use); [Inc42](https://inc42.com/company/starclinch/) |
| FrontRow (closed) | India | Celebrity-led hobby classes | Recorded classes | Hobby learners | — | Shut 30 June 2023 | — | "Not venture-scalable" | Warning precedent | [TechCrunch](https://techcrunch.com/2023/07/10/frontrow-shutdown) |
| Calendly / Cal.com (in India) | USA | Scheduling + payment | Collect through Stripe or PayPal; add Meet or Zoom links | Professionals | Freemium | "20 million professionals" (Calendly claim, global) | Reliable | UPI not verified; Stripe India invite-only | UPI and discovery | [Calendly](https://calendly.com/pricing); [Cal.com](https://cal.com/pricing) |
| DM → WhatsApp → UPI QR → Google Meet | India | Informal workaround | Manual | All artists | Free | Not evidenced [Assumption] | Zero fee | No calendar, reminders or ratings | One flow | — |

**3. Uniqueness**

**Very common.** *Functional:* none (competitor deposit logic not verified). *Audience:* **moderate opportunity** — no verified art or music 1:1 marketplace in India. No big platform has native paid 1:1 booking; Instagram's "Book" buttons hand off to partners ([TechCrunch, 2018-05-08](https://techcrunch.com/2018/05/08/instagram-action-buttons/)). *Network:* **high potential** for artist-to-artist reviews and mentoring [Inference]. *Data:* ratings show who gives good feedback in which discipline. *Discovery:* a fair "get a review from…" directory. *Combination:* rare in India.

**4. Artist value**

*Meaningful:* paid work, real feedback, credibility via ratings, relationships that lead to collaborations. *Vanity:* low, except "bookings count" badges.

**5. Discovery impact**

Good for skill and collaboration discovery. *Bias:* review-count ranking favours early mentors. *Fair-discovery mechanisms* [Inference]: a new-mentor lane with exposure quotas; rank by smoothed rating quality, not volume; price-band filters; first 3 sessions fee-free.

**6. Artist behaviour**

Weekly for teachers, rare for others. Artists post "opening 5 review slots" content. Calendar alerts are a **real retention driver for teachers**; mentees become users. *Loop* [Inference]: small established artist offers ₹499 reviews → emerging artists book → mentees post improved work → both gain credibility → some mentees later offer sessions. (₹499 is an illustration, not a market price.)

**7. Role**

Monetisation, retention (teachers), artist-to-artist engagement, discovery (with a directory).

**8. Risks and how competitors handle them**

- *No-shows, refunds, quality disputes.* No Indian no-show data was found.
- *Fake mentors and reviews.* Trustpilot removed fake Topmate reviews ([Trustpilot](https://www.trustpilot.com/review/topmate.io)).
- *Regulated advice.* Rigi, an Indian paid-community tool that raised $25 million ([Entrackr, Jan 2023](https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/)), shut its core business after "a SEBI crackdown on unregistered finfluencers" and let go of 60% of its staff ([Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/)). Keep sessions to art skills; exclude regulated advice [Inference].
- *Safety and minors.* Harassment and minors on video [Assumption]. Under the DPDP Act any user under 18 needs verifiable parental consent ([PIB, 2025-11-17](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)). Instagram blocks under-16s from Live without parental permission ([Meta, 2025-04-10 update](https://about.fb.com/news/2024/09/instagram-teen-accounts/)).
- *Tax and fees.* TDS of 0.1% above ₹5 lakh a year; 0.4% UPI merchant fee on sessions above ₹2,000 from 15 Oct 2026. Whether unregistered artists selling services through a platform must register for GST below ₹20 lakh needs a tax adviser.
- *App stores (global rules that apply in India).* Apple Guideline 3.1.3(d) lets one-to-one real-time services "use purchase methods other than in-app purchase", but "one-to-few and one-to-many real-time services must use in-app purchase" ([Apple](https://developer.apple.com/app-store/review/guidelines/)) — **1:1 is safe; group sessions sold in an iOS app are not** [Inference]. Google Play does not list online classes as exempt ([Google Play](https://support.google.com/googleplay/android-developer/answer/9858738)).
- *Competitors:* Topmate takes 10% or 20%; StarClinch takes 15% and fines off-platform deals ₹7.5 lakh; Artium hires and certifies its own teachers.

**9. Scale dependency**

Single-player at **1,000**; peer-review marketplace at **~10,000** across disciplines; strong matching at **100,000** [Inference].

**10. India specifics**

Topmate (10%) is the reference; Exly takes 3–10%; TagMango Basic 10%; StarClinch 15%. For an artist earning ₹10,000 a month from sessions, Topmate costs ₹1,000–2,000, TagMango Basic ₹1,000, and Graphy ₹1,000 plus about ₹2,083 a month of fixed fee [Derived]. Calendly and Cal.com depend on Stripe or PayPal. Compete on artist focus and discovery, not fees alone [Inference]. *Gap:* no Indian price data for lessons or portfolio reviews; no earnings distribution for any Indian session platform.

**11. Recommended implementation (pilot)**

1. Two session types: **paid portfolio review** and **music lesson**.
2. Artist sets duration, price, deposit or full prepayment, buffer, weekly cap and availability (Google Calendar sync).
3. Buyer picks a slot and pays by UPI into the artist's PA account; Meet link and reminders (24h, 1h) are automatic.
4. Only verified buyers can rate.
5. Cancel 24+ hours ahead for a full refund; late cancel or no-show forfeits the deposit; artist no-show = full refund + strike [Inference; test].
6. **18+ only** for 1:1 video at launch; web checkout.
7. **0% fee in the pilot**; after PMF at most 10% (Topmate level), first 3 sessions fee-free, no extra fee on directory bookings for emerging mentors.
8. Measure repeat bookings, no-shows, and whether mentees post work and stay; if artist-to-artist demand is real, combine with collaboration and credibility features.

---

### Feature 15 — Event tickets (shows, workshops, gigs)

**Verdict:** Deprioritise ticketing; Combine event listings into profiles and the link page · **Priority:** DEPRIORITISE · The emerging artist's bottleneck is filling the room, not issuing tickets; India has strong incumbents; in-house ticketing adds refund, payout and tax work.

**1. Problem being solved**

Performers and workshop hosts struggle (a) to find audiences for small gigs (high severity) and (b) to collect money without high fees or delays (moderate) [Inference].

*India's live market is large and growing, but it is led by headliners and big cities.*
- Organised live events were **₹14,500 crore in 2025, up 44%**, helped by the Kumbh Mela and by "a significant growth in concerts and ticketed events" ([FICCI-EY, March 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf); [EY, 2026-03-24](https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report)). *Conflict:* BookMyShow and EY-Parthenon put the segment at over ₹12,000 crore in 2024 ([EY-Parthenon/BookMyShow, 2025](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-india-s-rising-concert-economy.pdf)); FICCI-EY's 2024 figure is ₹10,100 crore. The two use different scopes.
- BookMyShow listed 26,359 live events in 2023, 30,687 in 2024 and **34,086 in 2025**. Growth slowed from 16% to 11%. Its year was headlined by Coldplay and Ed Sheeran ([Music Ally, 2025-12-11](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/); company claim).
- Ticket sales "were concentrated in the top 10 Indian metros" (FICCI-EY 2026).
- EY warns of over-supply: in the last quarter of 2025 "several concerts did not sell out and were canceled or postponed", and it expects "a slight dip in 2026" (FICCI-EY 2026).
- **No source gives emerging or independent artists' share of live revenue or of event count.**

*What small Indian acts actually face.*
- Live performance is the top income source for Indian music creators: 139 of 500 ranked it first ([EY, "The music creator economy", Dec 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)).
- Pay is low. Cafés and lounges pay emerging musicians ₹3,000–15,000 a gig and college fests ₹5,000–30,000 ([StarClinch blog, 2025-12-16](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/); company estimates). Club gigs pay a "token fee" ([Rolling Stone India, 2022-07-13](https://rollingstoneindia.com/heres-what-its-really-like-to-be-an-indian-indie-artist-playing-live-gigs/)), and opening acts "are rarely paid fairly" ([Rolling Stone India, 2025-09-12](https://rollingstoneindia.com/what-the-music-industry-doesnt-talk-about-enough-minimum-wage-for-musicians); opinion).
- Beginners sometimes pay to perform. Comedy open mics cost the comedian ₹200–500 a slot ([BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india); blog).
- Money arrives late or not at all: "performance fees were delayed, only partially paid, or not paid at all" ([The Indian Music Diaries, 2026-03-04](https://theindianmusicdiaries.com/are-payment-delays-silencing-the-voices-of-independent-music/)).
- Artists outside Delhi, Mumbai and Bengaluru lack venues ([The Indian Music Diaries, 2025-09-26](https://theindianmusicdiaries.com/who-gets-to-stay-indie-the-struggles-behind-the-indian-independent-music-scene/)).

None of these problems is solved by a ticketing tool. They are audience and payment problems [Inference].

*Frequency:* per event. *Segments:* musicians, comedians, dancers, theatre, workshop-running visual artists. *Workaround* [Assumption]: venue ticketing, Instagram + UPI QR, Skillbox, District, Townscript, Google Forms. *Why insufficient:* mass marketplaces bury small gigs; fees bite on ₹200–500 tickets; payouts arrive after the event [Inference]. *Gap:* organiser fees for BookMyShow, District, Skillbox, Townscript and SortMyScene are not public.

*Outside India (background only).* Because Indian organiser fees are not published, the only fee benchmark is foreign. Eventbrite charges 3.7% + $1.79 per ticket + 2.9% in the US, about 15.6% of a $20 ticket [Derived]; its top Trustpilot complaint is "Service Fees", plus "Pay out is days after the event" ([Eventbrite pricing](https://www.eventbrite.com/organizer/pricing/); [Trustpilot](https://www.trustpilot.com/review/www.eventbrite.com)).

**2. Competitors**

*In India*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| District (Zomato / Eternal) | India | Events; "List your events" | Organiser fees not public | Mass market | — | Launched Nov 2024 after buying Paytm Insider + TicketNew (~₹2,048 crore, Aug 2024) | Mass reach | No fee data; small gigs compete with big events | Small gigs vs big events | [District](https://www.district.in/); [Wikipedia: Paytm](https://en.wikipedia.org/wiki/Paytm); [Wikipedia: Eternal](https://en.wikipedia.org/wiki/Eternal_Limited) |
| BookMyShow | India | Mass ticketing; promoter of large tours | Fees not verified (page blocked) | Mass market | — | 34,086 events (2025); company revenue ₹1,869 crore and live revenue ₹756 crore (FY25) | Incumbent | No fee data | Headliner-led | [Music Ally](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/); [Angel One, 2026-01-16](https://www.angelone.in/news/unlisted-companies/bookmyshow-parent-reports-192-crore-profit-as-live-events-scale-up) |
| Skillbox | India (Gurugram) | Ticketing + artist booking; began as a musicians' platform | Concerts, comedy, nightlife, festivals | Organisers | Fees not verified | FY25 revenue ₹29.9 crore, up 19.0% (Inc42 Datalabs) | Indie roots | No data | Closest indie-gig player | [Skillbox](https://skillboxes.com); [Inc42](https://inc42.com/company/skillbox/) |
| SortMyScene | India (Mumbai) | Event ticketing, electronic music | Launched 2021; bootstrapped | Organisers | Fees not verified | 12 employees (Inc42; indicative) | Niche scene | No data | Niche ticketing | [Inc42](https://inc42.com/company/sortmyscene/) |
| Townscript | India | Self-serve ticketing | Page returned no content | Organisers | Not verified | No reliable data | — | — | — | — |
| Allevents | India / global | Discovery + ticketing | $1 attendee fee per ticket; rupee payout 3–4 business days after the event | Organisers | Freemium | "20M+ event-goers" (company claim) | Low fees | Payout after event | Not artist-specific | [Allevents](https://allevents.in/pages/pricing) |
| Exly / Topmate | India | Workshop and webinar tickets | Exly 3–10% (online or offline); Topmate webinars 10% / 20% (online only) | Coaches | Commission | See Feature 13 | Rupees and UPI | Not gig ticketing | Artist events | [Exly](https://exlyapp.com/pricing); [Topmate](https://topmate.io/) |
| YouTube ticket shelf (India supported) | USA | Tickets under videos | Via Bandsintown | Official artist channels | Free | No data | Native | Official channels only | Link-out works | [YouTube Help](https://support.google.com/youtube/answer/7570245) |
| Instagram + UPI QR / Google Forms | India | Informal workaround | Post, collect by UPI, keep a list by hand | Small organisers | Free | Not evidenced [Assumption] | Zero fee | No refunds, no door list | Adds RSVP and reminders | — |

*Outside India (background only)*
- **Laylo** (USA): fans RSVP on a drop page and get SMS or email alerts; 10,000+ artists (company claim). It is the RSVP model to copy; no Indian equivalent was found ([Laylo](https://laylo.com); [YC](https://www.ycombinator.com/companies/laylo)).
- **Luma** (USA): event pages and tickets; Free plan 5% + Stripe, Plus $59 a month at 0% ([Luma](https://luma.com/pricing)). A link-out target and a fee benchmark.
- **Eventbrite** (USA): fee benchmark only (section 1).

**3. Uniqueness**

**Very common.** *Functional:* none. *Audience:* low-moderate. Small artist-run workshops and house gigs sit below District's and BookMyShow's focus [Inference]. *Network:* **moderate** — co-bills, venue and curator discovery, "artists near you this week" [Inference]. *Data:* a city × genre × attendance scene graph. *Discovery:* a local gig calendar for under-discovered artists appears rare in India (unverified). *Combination:* artists-only + local discovery + light RSVP.

**4. Artist value**

*Meaningful:* audience growth, local credibility, venue and curator ties. *Vanity:* "interested" counts that do not attend.

**5. Discovery impact**

Strong local, genre and chance discovery — **only with city density**. Demand is spreading beyond the metros: BookMyShow reported 682% growth in live events in Tier 2 cities in 2024 ([EventFAQs, 2024-12-20](https://in.eventfaqs.com/2024/12/20/bookmyshowthrowback-unveiling-the-2024-year-end-report-a-year-of-entertainment-experiences/); company claim), and event-company CEOs say "the highest growth potential lies with the next 10 large cities" (FICCI-EY 2026). *Bias:* popularity sorting favours big acts. *Fair-discovery mechanisms* [Inference]: "small rooms" filter (under 150 capacity); "emerging artists on the lineup" tag; follow-based gig alerts; curator-picked weekly local lists.

**6. Artist behaviour**

Occasional but intense use; promo content; returns around events; co-performers invited. **External sharing is high** (WhatsApp, Instagram), making it an acquisition channel. Local network effect needs density. *Loop* [Inference]: gig listed → event page shared → attendees find other emerging artists' gigs nearby → venues and curators use the calendar → more artists list.

**7. Role**

Acquisition (shared pages), local discovery, some retention; monetisation only with ticketing.

**8. Risks and how competitors handle them**

- *Operations* [Inference]: cancellations, refunds and fake events; venue and safety duties; event-time support; chargebacks.
- *Tax and fees.* GST, TDS and the 0.4% UPI merchant fee above ₹2,000. FICCI-EY notes "the recent increase in GST on event tickets to 28% (including for the IPL)"; this was not checked against government notifications. Entertainment tax not verified [Assumption].
- *Music licensing.* IPRS asks members to check that event organisers hold an IPRS licence and to submit set lists ([IPRS Annual Report FY2025–26](https://iprs.org/wp-content/uploads/2026/09/Annual_Report_FY2025-26.pdf)). An organiser tool would inherit that duty [Inference].
- *Paid online events look thin in India* [Inference]. Leher, an Indian live audio and video rooms app, saw revenue fall from ₹36.4 lakh in FY24 to about ₹1,500 in FY25 ([Inc42 Datalabs](https://inc42.com/company/leher/); indicative).
- *App stores (global rules that apply in India).* Google Play exempts "tickets for live events" ([Google Play](https://support.google.com/googleplay/android-developer/answer/9858738)), but Apple requires in-app purchase for one-to-many real-time services ([Apple](https://developer.apple.com/app-store/review/guidelines/)), so **online workshops sold in an iOS app pay Apple's fee** [Inference].
- *Competitors:* Allevents pays out 3–4 business days after the event. Organiser fees and payout terms at BookMyShow, District and Skillbox were not found on an open page.

**9. Scale dependency**

Link-out calendar at **1,000 artists** in 1–2 cities; local discovery at **~10,000 per metro** plus fans; in-house ticketing only at **100,000+** [Inference].

**10. India specifics**

- Zomato bought Paytm's Insider and TicketNew for about **₹2,048 crore** (US$244M) in August 2024 ([Wikipedia: Paytm](https://en.wikipedia.org/wiki/Paytm)); insider.in now redirects to district.in (observed 2026-10-01).
- BookMyShow's live revenue rose from ₹455 crore to **₹756 crore** in FY25 ([Angel One](https://www.angelone.in/news/unlisted-companies/bookmyshow-parent-reports-192-crore-profit-as-live-events-scale-up)).
- The tracked market is the small part. FICCI-EY sizes organised events at ₹14,500 crore against ₹1,11,800 crore of "unaddressable" weddings, religious and personal events. Unknown artists mostly work in the untracked part [Inference].
- EY counts 14,470 concerts in India in 2024 and forecasts 24,520 by 2030 (cited in District's "Touching Grass" report, via [Music Ally, 2026-02-04](https://musically.com/2026/02/04/district-by-zomatos-touching-grass-report-tracks-trends-in-indias-concert-going-culture/)). Only 130 days in 2025 had concerts with 10,000 or more paid attendees (FICCI-EY 2026). Most events are therefore small [Inference].
- UPI makes small tickets easy: 86% of UPI merchant payments are below ₹500 ([PIB, Aug 2026](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2)).
- *Gaps:* organiser fees at BookMyShow, District, Skillbox, Townscript, SortMyScene; District's own event and ticket counts; door-deal practice for Indian indie artists.

**11. Recommended implementation**

1. **Now:** an "Upcoming" block on profile and link page (date, city, venue, lineup tags, price band) that **links out** to District, BookMyShow, Skillbox, Luma or the venue. Free.
2. **"Remind me" RSVP** (email or DM opt-in), the Laylo pattern, to build each artist's local fan list.
3. **City pages** ("this week in Pune") with "small rooms" and "emerging lineup" filters once a city has density.
4. **After PMF only:** simple tickets for **small workshops under ₹2,000** (no UPI merchant fee), payout after the event, automatic refunds on cancellation, organiser verification, capacity caps, web only. The plan's 10% fee (`LAUNCH_FEATURES_AND_COSTS.md`) equals Topmate's webinar rate and Exly's entry tier, and is above Allevents ($1 per attendee) and, outside India, Luma Free (5%); test lower.
5. Never build in-house ticketing for large gigs.

---

### Feature 18 — Pro plan at ₹299/month

**Verdict:** Modify · **Priority:** BUILD AFTER PMF · ₹299 is cheap against comparable tools, but the bundle sells commodity features, gives away the acquisition badge, promises "unlimited" DMs Meta caps, and risks paywalling the stats that create activation.

**1. Problem being solved**

Mainly a business-model question. The artist "problem" is a professional look, time-saving automation and useful analytics [Inference]. *Severity: low for most emerging artists.*

*Most Indian creators earn too little to pay for tools.*
- "Only 8–10% of creators monetize effectively", and nano and micro creators earn "less than INR 18,000 per month" ([Storyboard18 on BCG, 2025-05-04](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm); secondary). *Conflict:* BCG's own page says "2–2.5 million monetized creators", while the government summary says 2–2.5 million is the active base and only 8–10% monetise ([PIB, 2025-05-02](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)).
- Kofluence estimates 450,000–600,000 monetising creators out of 3.5–4.5 million ([IBTimes India, 2025-07-08](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077); company claim).
- 61.1% of surveyed creators are nano-tier ([Kofluence 2026](https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age); company claim).

*Indians pay little for subscriptions.*
- Only 14.4 million of about 178 million music streamers pay, about 8% [Derived] ([MBW, 2026-04-15](https://www.musicbusinessworldwide.com/india-added-nearly-4m-paid-music-streaming-subscriptions-in-2025-taking-its-total-to-14-4m-according-to-new-report/)), spending roughly ₹715 a year [Derived].
- ₹299 equals Spotify India's Premium Platinum and is about twice Standard (₹139) ([Spotify India](https://www.spotify.com/in-en/premium/)). Spotify raised Premium from ₹119 to ₹139 in August 2025, its first rise since 2019 ([Music Ally, 2025-12-18](https://musically.com/2025/12/18/25-insights-about-indias-music-industry-in-2025/)).

*An artist-paid subscription is the less-proven model in India.* The Indian creator companies with real revenue charge a business or a paying learner, not the unknown creator: Qoruz ₹56.4 crore, Kofluence ₹52.5 crore, Talentrack ₹36.4 crore, Skillbox ₹29.9 crore, Artium ₹28.0 crore, TagMango ₹20.9 crore in FY25 (Inc42 Datalabs; indicative) [Inference]. No flat-fee artist plan like ₹299 a month was found in India; incumbents take commission (Topmate 10–20%, StarClinch 15%).

*Willingness to pay:* **No reliable public data found**, in India or elsewhere, on the share of creators who pay for tools.

**2. Competitors (price benchmarks)**

*In India (Indian tools, and rupee prices of foreign tools sold in India)*

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| ReplyKaro | India | DM automation | Free forever; Starter ₹99/mo; Pro $9 on its page and ₹299 on its blog; Pro Bundle (Instagram + Facebook) ₹399; UPI billing | Indian creators | Freemium | 4,496+ (2026-10-01) vs "7,576+" and "10,000+" on the same site (2026-10-02); company claims | Very cheap | Repeats unverified "200 DMs/hour"; payments non-refundable | **Same ₹299** for a pure DM tool | [ReplyKaro](https://www.replykaro.com/instagram-dm-automation); [ReplyKaro pricing](https://replykaro.com/pricing) |
| Zorcha / InstantDM | India | DM automation | Zorcha: "Free Unlimited Instagram DM Automation"; paid $14.99 / $39.99 / $109.99. InstantDM: $9.99 / $24.99 ("Unlimited (750/hr)") | Creators | Freemium | "60K+" / "30,000+" (company claims) | Free tier; paced to Meta limits | Prices shown in dollars | Sets the price of DM automation near zero | [Zorcha](https://zorcha.com/pricing); [InstantDM](https://instantdm.com/pricing) |
| Kwikzy / LinkPlease / Creator Lane | India | DM automation | ₹399–999/mo; ₹499/mo; ₹1,500/yr | Creators | Paid | No data | Rupee pricing | Self- or competitor-published prices | Point tools | [Creator Lane, 2026-06-27](https://creatorlanehq.com/blog/best-instagram-dm-automation-tools-india) |
| LinkDM | India-linked (Webdot; country not confirmed) | DM automation | Free 1,000 DMs/mo; $19 for 25,000; $99 for 300,000 | Creators | Freemium | 60,000+ users (company claim) | Specialist | Dollar billing: ~₹1,580+/mo after FX and GST (competitor-reported) | Caps DMs by tier | [LinkDM](https://linkdm.com/pricing) |
| SuperProfile | India | Creator plans + AutoDM | Free 10%; ₹11,999/yr 5%; ₹49,999/yr removes branding. Conflict: ₹499/mo (Peerseek) | Indian creators | Freemium | ~50,000 creators (secondary) | Rupees | Single-trigger AutoDM (secondary) | Branding removal only at top | [Plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro); [Peerseek](https://peerseek.io/blogs/creator-platform-fees-india-compared) |
| Exly / TagMango / Graphy | India | Plans that cut commission | Exly ₹2,500–9,000/mo (6% → 3%); TagMango ₹5,000–30,000/mo + GST (5.5% → 0%); Graphy ₹24,999–99,999/yr (10% → 5%) | Coaches | Paid | TagMango "10,000+ creators" (company claim) | Fee falls as the plan rises | Far above ₹299 | Course businesses | [Exly](https://exlyapp.com/pricing); [TagMango](https://tagmango.com/pricing); [Graphy](https://graphy.com/pricing) |
| Topmate | India-focused | No subscription | 10% / 20% commission; custom above ₹10 lakh a month | Experts | Commission | "1mn+ professionals" (company claim) | No upfront cost | — | Take rate, not subscription | [Topmate](https://topmate.io/pricing) |
| Pixpa | India | Portfolio site plans | ₹200 / ₹300 / ₹400 per month, billed yearly | Photographers, artists | Paid | No data | Zero-commission store | — | ₹300 Creator plan sits at the same price | [Pixpa](https://www.pixpa.com/pricing) |
| Linktree (India prices) | Australia | Paid link-in-bio | Starter ₹360/mo (₹220 yearly; 9% fees); Pro ₹650 (₹440; remove branding); Premium ₹1,450 (₹1,250; 0% fees) | Creators | Freemium | 7.3 million Indian visits in July 2025 | Category leader | Selling features not offered in India; India outage Aug 2025 | ₹299 undercuts monthly Starter | [Pricing, Indian IP, 2026-10-01](https://linktr.ee/s/pricing/); [TechCrunch, 2025-08-18](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/) |
| Meta Verified (India) | USA | Instagram's own paid plan | India ₹699/mo on mobile (2023); badge, "Links in reels", analytics, scheduling | Creators | Paid | — | Native | Withdrew paid "increased reach" (Mar 2023) | Competes for the same rupees | [Meta, 2023-06-07](https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/); [meta.com](https://www.meta.com/meta-verified/) |
| Behance Pro / BandLab (India storefronts) | Outside India | Creative-tool subscriptions | Behance Pro shown as ₹797.68/mo; BandLab Pro ₹1,499/mo on the India App Store | Designers; musicians | Paid | — | — | Far above ₹299 | Rupee price anchors | [Behance Pro](https://www.behance.net/pro); [App Store India](https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775) |

*Conflict:* Meta's page lists Standard/Plus/Premium/Max at $14.99/$49.99/$149.99/$499.99; TechCrunch lists "Meta One" Essential/Advanced/Expert/Max at $14.99/$49.99/$149/$499 ([TechCrunch, 2026-09-15](https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/)). 2026 rupee prices were not retrieved.

**3. Uniqueness**

**Very common** (freemium creator SaaS). *Price:* ₹299 undercuts the verified Indian competitors except ReplyKaro (₹99 Starter; ₹299 Pro on its blog, Medium confidence), Pixpa's yearly plans and Linktree's yearly ₹220 Starter. No flat-fee artist plan was found in India. *Bundle:* low uniqueness; Zorcha gives unlimited DM automation free. *The only unique element* would be **audience intelligence** — which curators, brands and artists viewed the work — data only an artists-and-industry network produces [Inference].

**4. Artist value**

*Meaningful:* time saved; analytics that guide what to post or sell; "who from the industry viewed me". *Vanity:* badge removal, premium templates.

**5. Discovery impact**

**Pro must never raise ranking or visibility.** Meta marketed Meta Verified with "increased visibility and reach" and removed it on 17 March 2023 ([Meta Newsroom](https://about.fb.com/news/2023/02/testing-meta-verified-to-help-creators/)); Meta Verified, sold in India since June 2023, now sells "Links in reels" ([meta.com](https://www.meta.com/meta-verified/)). Selling reach would make Underdawg pay-to-win [Inference]. Removing the badge weakens the "made with Underdawg" loop [Inference; no quantitative source]; competitors selling in India place badge removal at mid or top tiers (Linktree ₹650, SuperProfile ₹49,999/yr).

**6. Artist behaviour**

Monthly billing; use depends on automation and stats; no network effect or invites.

**7. Role**

Platform monetisation and retention through lock-in (custom domain, automations).

**8. Risks and how competitors handle them**

- *Low conversion* [Inference]. No Indian conversion data exists.
- *"Unlimited DMs" cannot be delivered.* Meta allows **750 private replies per hour** per account for posts and Reels ([Meta rate limits](https://developers.facebook.com/docs/graph-api/overview/rate-limiting/)), one private reply per comment within 7 days, and a 24-hour messaging window ([Meta messaging doc](https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md)). Indian tools already work inside this: InstantDM's "Unlimited" means 750 an hour, and LinkDM caps by tier. The "200 DMs/hour" figure is not a Meta rule ([SumGenius, 2026-08-14](https://sumgenius.ai/blog/instagram-dm-bot-ban-wave-2026/)).
- *Commoditisation.* Meta is testing keyword auto-DMs on ad comments ([Social Media Today, 2026-08-25](https://www.socialmediatoday.com/news/meta-tests-auto-dm-response-for-instagram-ad-comments/828791/)). Free and ₹99 Indian DM tools set the price ceiling for stand-alone DM automation near zero [Inference].
- *Design risks* [Inference]: paywalling stats weakens activation; badge removal hurts acquisition; ₹299 anchors price low.
- *Recurring payments.* UPI AutoPay needs a pre-debit notification at least 24 hours before each debit, and the customer sets the maximum amount and frequency ([Razorpay docs](https://razorpay.com/docs/payments/recurring-payments/upi/)). Failure rates were not found.
- *App stores (global rules that apply in India).* Google Play requires its billing for in-app subscriptions ([Google Play](https://support.google.com/googleplay/android-developer/answer/9858738)); Apple moved Patreon to in-app purchase ([TechCrunch, 2026-01-28](https://techcrunch.com/2026/01/28/apple-tells-patreon-to-move-creators-to-in-app-purchase-for-subscriptions-by-november/)). **Sell Pro on the web** [Inference].

**9. Scale dependency**

Illustration [Assumption]: 5% of 1,000 artists at ₹299 ≈ ₹15,000/month. Pro matters only at **100,000+ artists**. *Break-even for an artist* [Derived]: ₹299 equals Topmate's 10% on ₹2,990 of monthly sales. A flat ₹299 is cheaper than every listed Indian session tool above roughly ₹3,000 of monthly sales. A 15% booking fee on a café gig (₹3,000–15,000) is ₹450–4,500, so ₹299 is less than the commission on one small gig.

**10. India specifics**

Indian DM tools cost ₹0–₹999 a month (Zorcha free, ReplyKaro ₹99–399, Kwikzy ₹399–999, LinkPlease ₹499, Creator Lane ₹1,500 a year) ([Creator Lane, 2026-06-27](https://creatorlanehq.com/blog/best-instagram-dm-automation-tools-india); Reported). Portfolio plans cost ₹200–400 (Pixpa). Course-seller tools cost ₹2,500–₹30,000 a month. Linktree costs ₹360–₹1,450 a month; Meta Verified launched at ₹699. **₹299 is fair but equals a pure DM tool**, so it must buy artist-specific outcomes: brand inquiries, paid gigs, credibility [Inference]. Test annual plans for students.

**11. Recommended implementation**

1. **Launch after PMF**; price-test ₹149–₹299 with an annual discount.
2. **Keep core stats free** (verified Instagram stats, link clicks); they drive activation and trust.
3. Pro sells **audience intelligence**, custom domain, **tiered DM volumes paced under Meta's limits** (never "unlimited"), premium templates, data export.
4. **Make a fee waiver the main value** [Inference]: 0% platform fee on shop, download and session sales the artist drives. Indian tools already sell this trade at far higher prices (TagMango's ₹30,000 plan has zero commission; Exly's ₹9,000 plan cuts commission to 3%; Linktree's ₹1,450 India plan has 0% fees). It pays for itself above ~₹3,000 of monthly sales.
5. Keep a small "Made with Underdawg" mark, or move removal to a higher tier.
6. **Never** sell ranking, featured placement or contact access. Sell on the web; test UPI AutoPay.

---

#### Verdict summary (features 7, 12–15, 18)

| # | Feature | Verdict | Priority | One-line reason | Key evidence |
|---|---|---|---|---|---|
| 7 | Art Shop | Modify | EXPERIMENT now (Shop-lite); BUILD AFTER PMF (held payments) | Real artist-direct demand (measured outside India), but escrow makes Underdawg a GST e-commerce operator and limits unregistered artists to their own state | Artflute takes 40% and pays 15 working days after delivery; contemporary art was ₹163 crore of ₹2,543 crore auction turnover (2025); COD returns 24–35% vs 2–8% prepaid; 0.5% TCS; 15.2% of creators registered; no Indian data on Instagram art sales |
| 12 | Tips via UPI | Combine (into link page) | BUILD EARLY (zero-fee block); DM tips = EXPERIMENT | Proven but low-yield; a free UPI QR does the basics | UPI: 24,162 crore transactions in FY2025–26; 86% of merchant payments under ₹500; only 8–10% of creators monetise effectively; person-to-person UPI free; collect requests ended Oct 2025; no Indian tip-size data |
| 13 | Digital downloads | Modify | BUILD EARLY (free-for-email); paid BUILD AFTER PMF | Free downloads build an owned audience; paid files are a commodity | Indian tools charge 5–10%; Topmate 10% direct vs 20% marketplace; Linktree's selling features not offered in India; TikTok ban of 29 June 2020 shows platform risk; Instagram has no downloads |
| 14 | Bookings and 1:1 sessions | Experiment | EXPERIMENT, then BUILD AFTER PMF | Best income evidence and artist-to-artist potential, but Topmate leads and stand-alone call apps failed | 1:1 ≈ 39% of Topmate earnings (Sep 2023); Artium Academy revenue ₹28.0 crore (FY25); FrontRow shut in 2023; no Indian price data for lessons |
| 15 | Event tickets | Deprioritise ticketing; Combine listings | DEPRIORITISE | Bottleneck is audience, not ticketing; strong incumbents | Organised live events ₹14,500 crore (2025); BookMyShow 34,086 events; District bought Insider (~₹2,048 crore); Indian organiser fees not public; cafés pay ₹3,000–15,000 a gig |
| 18 | Pro plan ₹299/month | Modify | BUILD AFTER PMF | Price fine, bundle commodity; never sell visibility; no "unlimited" DMs | ReplyKaro ₹99–299; Zorcha free; Linktree India ₹360–1,450; Meta Verified ₹699; no flat-fee artist plan found in India; Meta cap 750 replies/hour |

CHART: art-cut — Artflute takes 40% of an artwork sale in India; Etsy and Instamojo take 2–6.5% plus fixed fees
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Artflute commission on an artwork sale (artist also pays domestic shipping) | 40 | % of sale price | Artflute (India) | 2026-10-02 | https://www.artflute.com/artist-faqs |
| Etsy offsite-ads fee, India seller page (only on ad-driven sales) | 15 | % of sale price | Etsy (Indian sellers, export only) | 2026-10-02 | https://www.etsy.com/in-en/sell |
| Etsy transaction fee, India seller page (plus 3–5% + ₹25 processing) | 6.5 | % of sale price | Etsy (Indian sellers, export only) | 2026-10-02 | https://www.etsy.com/in-en/sell |
| Instamojo store, Lite and Starter plans (plus ₹3) | 5 | % of sale price | Instamojo (India) | 2026-10 | https://www.instamojo.com/pricing/ |
| Instamojo store, Growth plan ₹14,999/yr (plus ₹3) | 2 | % of sale price | Instamojo (India) | 2026-10 | https://www.instamojo.com/pricing/ |
| Blinkstore free POD storefront (partner earns on base price) | 0 | % platform fee | Blinkstore (India) | 2026-10-01 | https://blinkstore.in/ |
| Outside India (background): Saatchi Art, originals | 40 | % of sale price | Saatchi Art (USA) | snapshot 2026-09-07 | https://www.saatchiart.com/whysell |

CHART: creator-fee — Indian creator tools charge 2–20% on sessions, downloads and courses, and the rate is highest when the platform supplies the buyer
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Topmate marketplace sale | 20 | % platform fee | Topmate | 2026-10 | https://topmate.io/pricing |
| Topmate direct sale (own link) | 10 | % platform fee | Topmate | 2026-10 | https://topmate.io/pricing |
| TagMango Basic (no fixed fee) | 10 | % platform fee | TagMango | 2026-10 | https://tagmango.com/pricing |
| Graphy entry plan (plus ₹24,999/yr) | 10 | % platform fee | Graphy | 2026-10 | https://graphy.com/pricing |
| Exly entry tier | 10 | % platform fee | Exly | 2026-10 | https://exlyapp.com/pricing |
| SuperProfile Starter (free plan) | 10 | % platform fee | SuperProfile | 2026 | https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro |
| Exly Pro (₹2,500/month) | 6 | % platform fee | Exly | 2026-10 | https://exlyapp.com/pricing |
| TagMango Pro (₹5,000/month + GST) | 5.5 | % platform fee | TagMango | 2026-10 | https://tagmango.com/pricing |
| SuperProfile Premium (₹11,999/yr) | 5 | % platform fee | SuperProfile | 2026 | https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro |
| Instamojo store, Lite and Starter (plus ₹3) | 5 | % platform fee | Instamojo | 2026-10 | https://www.instamojo.com/pricing/ |
| Exly Premium (₹9,000/month) | 3 | % platform fee | Exly | 2026-10 | https://exlyapp.com/pricing |
| Instamojo store, Growth (plus ₹3) | 2 | % platform fee | Instamojo | 2026-10 | https://www.instamojo.com/pricing/ |
| TagMango Ultimate (₹30,000/month + GST) | 0 | % platform fee | TagMango | 2026-10 | https://tagmango.com/pricing |
| YouTube Super Thanks (platform share; available in India) | 30 | % platform share | YouTube | 2026-10 | https://support.google.com/youtube/answer/10878910?hl=en |

CHART: ticket-cost — Indian ticketing platforms do not publish organiser fees; the one listed fee is Allevents' $1 per attendee, about 5% of a $20 ticket
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Allevents ($1 attendee fee, plus gateway) | 5 | % of a $20 ticket | Allevents (India / global) | 2026-10 | https://allevents.in/pages/pricing |
| Outside India (background): Luma Free (5% + Stripe ~2.9% + 30¢, derived) | 9.4 | % of a $20 ticket | Luma (USA) | 2026-10 | https://luma.com/pricing |
| Outside India (background): Eventbrite (3.7% + $1.79 + 2.9%, derived) | 15.6 | % of a $20 ticket | Eventbrite (USA) | 2026-10 | https://www.eventbrite.com/organizer/pricing/ |

CHART: pro-price — Underdawg Pro at ₹299/month sits below most Indian creator-tool prices but equals a pure DM tool
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| TagMango Pro | 5,000 | ₹/month (+GST) | TagMango | 2026-10 | https://tagmango.com/pricing |
| Exly Pro | 2,500 | ₹/month | Exly | 2026-10 | https://exlyapp.com/pricing |
| Graphy entry plan (₹24,999/yr ÷ 12, plus 10% per sale) | 2,083 | ₹/month (approx.) | Graphy | 2026-10 | https://graphy.com/pricing |
| Linktree Premium (monthly billing) | 1,450 | ₹/month | Linktree India | 2026-10-01 | https://linktr.ee/s/pricing/ |
| SuperProfile Premium (₹11,999/yr ÷ 12) | 1,000 | ₹/month (approx.) | SuperProfile | 2026 | https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro |
| Meta Verified (mobile, launch price) | 699 | ₹/month | Meta | 2023-06-07 | https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/ |
| Linktree Pro (monthly billing) | 650 | ₹/month | Linktree India | 2026-10-01 | https://linktr.ee/s/pricing/ |
| ReplyKaro Pro Bundle (Instagram + Facebook) | 399 | ₹/month | ReplyKaro | 2026-10-02 | https://replykaro.com/pricing |
| Linktree Starter (monthly billing) | 360 | ₹/month | Linktree India | 2026-10-01 | https://linktr.ee/s/pricing/ |
| Pixpa Creator (billed yearly) | 300 | ₹/month | Pixpa | 2026-10-01 | https://www.pixpa.com/pricing |
| Underdawg Pro (proposed) | 299 | ₹/month | Underdawg | 2026 | /Volumes/Moon/underdawg/creator_app/research.md |
| ReplyKaro Pro (own blog; Medium confidence) | 299 | ₹/month | ReplyKaro | 2026-10-01 | https://www.replykaro.com/instagram-dm-automation |
| Spotify Premium Platinum (consumer benchmark) | 299 | ₹/month | Spotify India | 2026-10 | https://www.spotify.com/in-en/premium/ |
| Linktree Starter (yearly billing) | 220 | ₹/month | Linktree India | 2026-10-01 | https://linktr.ee/s/pricing/ |
| ReplyKaro Starter | 99 | ₹/month | ReplyKaro | 2026-10-02 | https://replykaro.com/pricing |
| Zorcha Free (unlimited DM automation) | 0 | ₹/month | Zorcha | 2026-10-02 | https://zorcha.com |

CHART: cod-rto — Cash-on-delivery orders in India return to origin 24–35% of the time, versus 2–8% for prepaid
Type: grouped bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| COD RTO (Shipway, D2C shipments) | 26 | % of non-prepaid orders | India D2C | FY25 | https://mediabrief.com/shipnotes-reveals-26-rto-rate-on-cod-orders-across-india/ |
| Prepaid RTO (Shipway, D2C shipments) | under 2 | % of prepaid orders | India D2C | FY25 | https://mediabrief.com/shipnotes-reveals-26-rto-rate-on-cod-orders-across-india/ |
| COD RTO (ProfitBox360) | 24.3 | % of shipped orders | India e-commerce | 2026-09-19 | https://www.profitbox360.com/research/india/ecommerce/cod-prepaid-rto-rates-india |
| Prepaid RTO (ProfitBox360) | 2.8 | % of shipped orders | India e-commerce | 2026-09-19 | https://www.profitbox360.com/research/india/ecommerce/cod-prepaid-rto-rates-india |
| COD RTO (Pragma, 142 D2C brands) | 28–35 | % of shipped orders | India D2C | 2026-08-25 | https://shipping.amazon.in/blog/cod-vs-prepaid-festive-season-surge-india |
| Prepaid RTO (Pragma, 142 D2C brands) | 4–8 | % of shipped orders | India D2C | 2026-08-25 | https://shipping.amazon.in/blog/cod-vs-prepaid-festive-season-surge-india |
| COD RTO (Razorpay) | 25–30 | % of COD orders | India e-commerce | 2025/26 | https://razorpay.com/blog/cash-on-delivery/ |
| Prepaid RTO (Razorpay) | 2–3 | % of prepaid orders | India e-commerce | 2025/26 | https://razorpay.com/blog/cash-on-delivery/ |

CHART: online-art — India has no online-art sales figure; of ₹2,543 crore of auction turnover in 2025, contemporary art was only ₹163 crore
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Post-War art | 1,647 | ₹ crore | Indian art auctions (360 ONE) | 2025 | https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13 |
| Modern art | 701 | ₹ crore | Indian art auctions (360 ONE) | 2025 | https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13 |
| Contemporary art | 163 | ₹ crore | Indian art auctions (360 ONE) | 2025 | https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13 |
| 19th-century art | 32 | ₹ crore | Indian art auctions (360 ONE) | 2025 | https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13 |

---

## Part 4 — Community, live and hiring features (8, 9, 10, 11, 16, 17)

**Bottom line.** None of these six features should be built exactly as written.

- **Show & Review** is the strongest, once reshaped. In India, 73% of 500 surveyed music creators strongly feel they have much to learn about production ([EY–IPRS, Dec 2023](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/documents/ey-the-music-creator-economy.pdf)) [Verified; 2022 survey], and no Indian critique or curator marketplace was found. Outside India, artists pay for feedback at scale, but the money flows from artists to curators, not from fans to artists. Build it early as artist-to-artist and curator review that feeds discovery.
- A **narrow Artist Boards** (Rate Check plus Scam-pattern Alerts) is cheap trust infrastructure worth building early. Indian brand payments officially take 90 days and can stretch to a year ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm)) [Verified; anonymous sources]. Fake casting agents take ₹1,000 to ₹75,000 per victim (police cases, see Feature 11). Open "Brand Reviews" must wait for verified transactions because India keeps criminal defamation.
- **Hire Artists** and **Gigs** solve measured problems and are the only features here that put artists in front of people who pay. India's organised live-events segment reached ₹14,500 crore in 2025, up 44% ([FICCI-EY, 24 Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [Verified]. But paying demand is scarce. StarClinch, India's artist-booking marketplace founded in 2015, shows about ₹2.4 crore of FY25 revenue, down 10.2% ([Inc42](https://inc42.com/company/starclinch/)) [Inc42 Datalabs]. And 50.4% of Indian creators name too few brand collaborations as their main obstacle ([Storyboard18 on Kofluence, 14 May 2026](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [Company claim]. Merge the two features into one "Opportunities" marketplace and pilot it by hand in one or two cities.
- **Live Rooms** should wait until after product-market fit (PMF) and become critique and showcase rooms. Live teaching by working musicians earns money in India (Artium Academy: ₹28.0 crore in FY25). Celebrity-led classes failed (FrontRow shut in 2023 after raising about $18M).
- **Reject Fan Club**: it needs fans under-discovered artists do not have, and it breaks the artists-only, no-feed design. Rigi raised ₹100 crore in January 2023 for paid creator communities and has since left that business.

**Evidence labels.** [Verified] = read on the cited official page or reputable press. [Company claim] = the company's own figure, not audited. [Inc42 Datalabs] = a third-party database of company filings, indicative only. [Secondary] = Wikipedia or a third party reporting someone else's data. [Blog] = a commercial blog, low reliability. [Unverified] = seen only in a search snippet. [Inference] = our reasoning, not a sourced fact. Reddit threads were read through Internet Archive copies. A complaint is called "common" only when at least three independent discussions show it. Amounts are in rupees. Where a source reported dollars, the dollar figure is kept as the source wrote it.

---

### Feature 8 — Live Rooms

**Verdict:** Modify · **Priority:** BUILD AFTER PMF · Learners do pay for live teaching, but the tools are cheap and crowded, paid-live products shrank after COVID, and as written the feature mainly earns money for artists who already have an audience.

**1. Problem being solved**

The real problem is operational. An artist who sells a group class glues many tools together. Topmate's own blog describes an Indian creator who "uses Calendly for scheduling, Razorpay for payments, Zoom for video, Google Sheets for tracking, and WhatsApp for follow-ups", with buyers dropping off "between the booking page and the Razorpay checkout link" ([Topmate blog, 13 May 2026](https://topmate.io/blog/online-session-platform-solutions)) [Company claim]. Paid teaching gets pirated: in Aug 2022 the Delhi High Court ordered Telegram to reveal who ran channels reselling a teacher's lectures ([Scroll, 31 Aug 2022](https://scroll.in/latest/1031759/delhi-high-court-directs-telegram-to-disclose-details-about-channels-violating-copyright-law)) [Verified].

Indian demand exists but is narrow. It sits in live teaching by working musicians, paid for by learners. Artium Academy sells 1:1 live music classes and claims "45,000+ Learners" and "400+ Teachers" ([artiumacademy.com](https://artiumacademy.com/)) [Company claim]; its FY25 revenue was ₹28.0 crore, up 46.3% ([Inc42](https://inc42.com/company/artium-academy/)) [Inc42 Datalabs]. Muzigal, a second live music-teaching company, earned ₹13.7 crore in FY25, down 8.6% ([Inc42](https://inc42.com/company/muzigal/)) [Inc42 Datalabs].

Learners also say they want it. In a 2022 survey of 500 Indian music creators, 73% strongly believed they needed to learn more about music production ([EY–IPRS, Dec 2023](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/documents/ey-the-music-creator-economy.pdf)) [Verified; older].

**Severity:** medium for artists who already teach; low for under-discovered artists, whose limit is audience, not tooling [Inference]. **Frequency:** weekly to monthly for teachers; rare for others. **Segments:** dance and music teachers, illustrators and designers selling portfolio reviews, photography workshop hosts. **Workarounds:** Zoom plus UPI links plus WhatsApp; Topmate, TagMango, Graphy, Exly, Cosmofeed; YouTube memberships. **Why existing solutions fall short:** mostly, they do not. Indian tools already exist and charge a commission (Topmate 10–20%) or a fixed fee plus commission (TagMango Pro ₹5,000 + GST a month + 5.5%; Graphy ₹24,999 a year + 10%); the competitor table gives the details. None is priced for a small artist at a few hundred rupees a month [Inference]. "Most platforms add 18% GST on top of their cut" ([Peerseek, 24 Jul 2026](https://peerseek.io/blogs/creator-platform-fees-india-compared)) [Secondary]. What is missing is an artist-specific format (critique, portfolio "hot seat") linked to discovery. That is a positioning gap, not a tooling gap [Inference].

The Indian evidence against the feature is strong. Four Indian live products shut, shrank or changed business:

| Indian product | What it was | Money raised (as sources report) | What happened | Source |
|---|---|---|---|---|
| FrontRow | Celebrity-led music and dance classes | About $18M (TechCrunch); $17.2M (Entrackr); $20.29M (Inc42). The sources differ. | Shut on 30 Jun 2023 at $3–4M of annualised revenue; "not venture-scalable"; its growth was "a lockdown false positive" | [TechCrunch, 10 Jul 2023](https://techcrunch.com/2023/07/10/frontrow-shutdown); [Entrackr, Jun 2023](https://entrackr.com/2023/06/exclusive-after-mass-layoffs-frontrow-explores-acquisition-deals/); [Inc42](https://inc42.com/company/frontrow/); [The Runway, 2 Feb 2025](https://www.therunway.ventures/p/frontrow) [Secondary] |
| Unluclass | Celebrity classes | $1.2M seed (2021) | Domains parked or not resolving (checked 1 Oct 2026) | [Inc42, 2021](https://inc42.com/buzz/celebrity-focussed-skilling-engagement-platform-unlu-bags-seed-round-from-nexus-others/) |
| Leher | Live audio and video rooms | Not found | FY25 revenue ₹1.5 thousand, from ₹36.4 lakh in FY24 | [Inc42](https://inc42.com/company/leher/) [Inc42 Datalabs] |
| Eloelo | Live rooms with fan gifts | $50M+ in total | Spent ₹59 crore on ads to earn ₹69.5 crore in FY25, then moved to micro-dramas | [Entrackr](https://entrackr.com/fintrackr/eloelo-burns-rs-59-cr-on-ads-to-generate-rs-69-cr-revenue-in-fy25-11439432); [Entrackr, Series B](https://entrackr.com/exclusive/exclusive-eloelo-kicks-off-series-b-round-with-13-mn-8933673) [Verified] |

No reliable Indian data was found on no-show rates for paid sessions.

*Outside India (background only).* Across 860+ events, the median no-show rate was about 28% for free events and 17% for paid ones ([PheedLoop, 26 May 2026](https://web.pheedloop.com/blog/event-data-lab-report-06)) [Verified]. This is not Indian data.

**2. Competitors**

Indian platforms and platforms available in India:

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Topmate | India | Paid calls, webinars | One link; external video | Indian experts | 10% own link / 20% marketplace | "1mn+ professionals" [Company claim] | One link; no fixed fee | Fragmented stacks (own blog) | No artist discovery | [Topmate pricing](https://topmate.io/pricing) |
| TagMango | India | Communities, live workshops | Creator SaaS | Edutainment creators | Basic 10%; Pro ₹5,000 + GST a month + 5.5% | "10,000+ creators" (site) vs "5,000+" (YC) [Company claims, conflict]; FY25 revenue ₹20.9 crore, up 162.9% [Inc42 Datalabs] | Indian payments | Fixed-fee plans suit high earners [Inference] | No discovery | [tagmango.com](https://tagmango.com); [YC](https://www.ycombinator.com/companies/tagmango); [Inc42](https://inc42.com/company/tagmango/) |
| Graphy | India (Unacademy group) | Course and webinar tool | Yearly plans plus a fee per sale | Course creators | ₹24,999 a year + 10% | "200,000+ Creators Worldwide" [Company claim] | Rupee pricing | High fixed fee for a small artist [Inference] | No discovery | [graphy.com](https://graphy.com); [Graphy pricing](https://graphy.com/pricing) |
| Exly | India | Course and session tool | Monthly plans plus commission | Creators | Pro ₹2,500 a month; commission 3–10% | "100,000+ creators strong" [Company claim] | Rupee pricing | High fixed fee for a small artist [Inference] | No discovery | [exlyapp.com](https://exlyapp.com); [Exly pricing](https://exlyapp.com/pricing) |
| Cosmofeed (now SuperProfile) | India | Paid Telegram groups, webinars | Bot adds and removes paid members | Indian creators | ~10% [Unverified] | 50,000 creators, 25% paid (Business Today, Mar 2022) vs 3,000 creators (Entrackr, Nov 2022) [conflict]; FY25 revenue ₹11.7 crore [Inc42 Datalabs] | Rides on Telegram | 3 App Store India reviews allege blocked withdrawals | No video rooms | [Business Today 2022-03-17](https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17); [Entrackr 2022-11](https://entrackr.com/2022/11/cosmofeed-helps-creators-monetize-content-more-efficiently/); [App Store India](https://apps.apple.com/in/app/id1592830857); [Inc42](https://inc42.com/company/cosmofeed/) |
| Artium Academy | India | 1:1 live music classes | Certified teachers; celebrity masterclasses | Kids, adults, diaspora | Paid | 45k+ learners [Company claim]; FY25 revenue ₹28.0 crore [Inc42 Datalabs]; $3M raised (Oct 2022) | Proven Indian model | 1:1, not group | Platform faculty, not artists' own rooms | [artiumacademy.com](https://artiumacademy.com/); [Inc42 2022](https://inc42.com/buzz/online-music-learning-platform-artium-academy-bags-funding-from-chiratae-ventures-others/); [Inc42](https://inc42.com/company/artium-academy/) |
| Muzigal | India | Live music teaching | Not described in our sources | Music learners | Paid | FY25 revenue ₹13.7 crore, down 8.6% [Inc42 Datalabs] | Second proof of the teaching model | Revenue fell | A music school, not artists' own rooms | [Inc42](https://inc42.com/company/muzigal/) |
| Eloelo | India | Live rooms with gifts | Hosts stream; fans gift | Mass-market users | Free + gifts | 1,000+ streams a day [Verified] | Live gifting scale | Ad-funded growth; pivot to micro-dramas | Entertainment, not teaching | [Entrackr](https://entrackr.com/exclusive/exclusive-eloelo-kicks-off-series-b-round-with-13-mn-8933673) |
| YouTube Live + memberships | US; live in India | Members-only lives; Super Chat | Creator keeps 70% of net; India from ₹59 | YouTubers | Paid tiers | Live in India [Verified] | Reach; low price | Broadcast, not class | No seats or refunds | [YouTube Help](https://support.google.com/youtube/answer/72902); [India pricing](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN) |
| Instagram Live + Subscriptions + Badges | US; India availability not confirmed | Subscriber lives; tips | Monthly subs; $0.99–$4.99 badges | IG creators | Paid; app stores take 30% of badges | No public data | Fans already there | Badges "may not be available in your region"; Subscriptions not listed for India (Jul 2023) | No ticketed classes or seat caps | [IG Badges](https://creators.instagram.com/earn-money/badges); [TechCrunch 2023-07-24](https://techcrunch.com/2023/07/24/instagram-launching-creator-subscriptions-australia-canada-uk-and-more/) |

**3. Uniqueness**

**Classification: Very common.** In India, YouTube already sells members-only lives and Super Chat, and Topmate, TagMango, Graphy and Exly sell paid webinars and workshops. *Functional:* low; seats, chat, moderators and recordings exist widely; auto-remove mirrors Cosmofeed's Telegram bot. *Audience:* low to medium; Artium runs music classes, but with its own teachers, not "any artist's own room". *Workflow:* medium; UPI plus DM reminders plus auto-refund is a local edge Topmate or TagMango could copy [Inference]. *Network:* low for fan classes, medium for artist-to-artist rooms. *Data:* medium (teaching history, ratings). *Discovery:* low as written. *Combination:* somewhat distinctive in India, no moat.

**4. Artist value**

*Meaningful:* income for teaching artists; instructor credibility; pro portfolio reviews that can lead to work. *Vanity:* tips, badges, member counts, "live now". Those who gain most already have followers. Unknown artists gain mainly as *participants* reviewed by established artists or curators [Inference].

**5. Discovery impact**

Low as written: sessions sell to the host's existing Instagram audience. Indian learners buy famous names. FrontRow, Unluclass and Artium all led with celebrities ([Inc42 on Unluclass, 2021](https://inc42.com/buzz/celebrity-focussed-skilling-engagement-platform-unlu-bags-seed-round-from-nexus-others/); [Inc42 on Artium, 2022](https://inc42.com/buzz/online-music-learning-platform-artium-academy-bags-funding-from-chiratae-ventures-others/)). Ranking by attendance or revenue would entrench big accounts. Fair-discovery levers [Inference]: rotate featured slots; reserve part of a session directory for first-time or small hosts; rank by fit (craft, city, level); cap promoted sessions; run "open review nights" where 5–10 emerging artists are reviewed live.

**6. Artist behaviour**

Hosts use it monthly to weekly; attendees occasionally. Retention is calendar-driven. Ticket links in Instagram stories bring buyers to Underdawg. Network effect is weak: each audience belongs to one artist. The loop (promote → followers buy → host earns → schedule again) is a money loop, not a discovery loop, unless rooms feature emerging artists [Inference].

**7. Role**

Monetisation first; engagement and retention for hosts; acquisition medium; activation low; discovery low unless redesigned.

**8. Risks and how competitors handle them**

- **Minors.** India's DPDP Act treats under-18s as children and bars tracking or targeted ads aimed at them ([DPDP Act 2023, MeitY](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)) [Verified]. The DPDP Rules were notified on 14 November 2025 with an 18-month phase-in. A child's data needs verifiable consent from a parent. Penalties for breaking children's obligations reach ₹200 crore ([PIB, 17 Nov 2025](https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf)) [Verified]. Wikipedia gives 13 May 2027 as the end of the phase-in ([Wikipedia: DPDP Act](https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Act,_2023)) [Secondary]. Instagram requires parental permission for under-16s to go Live ([Meta, 10 Apr 2025](https://about.fb.com/news/2024/09/instagram-teen-accounts/)) [Verified].
- **Piracy.** Paid lectures were resold on Telegram (Delhi High Court case above).
- **Harassment.** India's Instagram ad audience is 69.7% male ([DataReportal, 5 Nov 2025](https://datareportal.com/reports/digital-2026-india)), so women hosts may face more risk [Inference].
- **Regulated advice.** Rigi built paid communities around finance influencers and shut that business after "a SEBI crackdown on unregistered finfluencers" ([Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/)) [Verified]. Paid sessions should exclude regulated advice categories [Inference].
- **Payout trust.** Three App Store India reviews of Cosmofeed allege blocked withdrawals ([App Store India](https://apps.apple.com/in/app/id1592830857)) [single venue; user allegations]. Automatic refunds on host cancellation are the right default. No reliable Indian data was found on refund complaints for live classes.
- **Video cost.** 100ms charges $0.004 per participant-minute after 10,000 free minutes a month; LiveKit $0.0004–$0.0005 plus bandwidth ([100ms](https://www.100ms.live/pricing); [LiveKit](https://livekit.com/pricing)) [Verified; vendor list prices in dollars]. *Calculated:* one free room (45 minutes × 30 people) costs about **$5.40** at 100ms; two a month for 10,000 artists, fully used, about **$108,000 a month** (about $49,000 on LiveKit with estimated bandwidth) [Inference].
- **Apple and Google billing.** These store rules apply in India too. Apple: "One-to-few and one-to-many real-time services must use in-app purchase", and tips too ([Apple guidelines](https://developer.apple.com/app-store/review/guidelines/)) [Verified]. Google Play exempts "tickets for live events", not online classes ([Google Play policy](https://support.google.com/googleplay/android-developer/answer/9858738)). Web UPI checkout needs legal review.

*Outside India (background only).* Patreon had to adopt Apple's 30% in-app purchase for new iOS memberships from Nov 2024 ([Patreon, 12 Aug 2024](https://news.patreon.com/articles/understanding-apple-requirements-for-patreon)) and must move all creators by 1 Nov 2026 ([TechCrunch, 28 Jan 2026](https://techcrunch.com/2026/01/28/apple-tells-patreon-to-move-creators-to-in-app-purchase-for-subscriptions-by-november/)). Circle caps live rooms at 15, 20 or 50 people by plan, and Mighty Networks also caps capacity, to control video cost ([Circle](https://circle.so/pricing); [Mighty](https://www.mightynetworks.com/pricing)). MasterClass is rated 1.6/5 from 1,178 Trustpilot reviews, with repeated refund complaints ([Trustpilot](https://www.trustpilot.com/review/masterclass.com)) [Verified].

**9. Scale dependency**

**1,000 artists:** a tool for the minority who teach; no network needed. **10,000:** a cross-artist session directory has enough supply per city and craft. **100,000:** recommendations. **Large scale only:** live discovery events and brand-sponsored rooms [Inference].

**10. India specifics**

- **What works:** live teaching by working musicians, paid by the learner (Artium ₹28.0 crore, Muzigal ₹13.7 crore). **What failed:** celebrity-led classes at venture scale (FrontRow).
- **Who pays:** the Indian platforms that survive charge a business or a paying learner, not the unknown creator [Inference from the revenue table in the Charts section].
- **Market size claim:** an investor says 15M+ Indian households learn music ([Chiratae, 12 Dec 2022](https://www.chiratae.com/from-passion-to-music-education-why-we-backed-artium-academy/)) [Company claim, low confidence].
- **UPI:** UPI AutoPay needs a 24-hour pre-debit notice ([Razorpay](https://razorpay.com/docs/payments/recurring-payments/upi/)), so one-off tickets fit better than subscriptions. From 15 October 2026, merchant UPI payments above ₹2,000 carry a 0.4% fee; payments up to ₹2,000 stay free ([The Indian Eye, 18 Sep 2026](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/)) [Verified press report]. A typical session ticket sits below that line [Inference].
- **Tax:** platforms add 18% GST on top of their cut (Peerseek, above).
- **Gaps:** no reliable Indian data was found on live-class attendance or prices, on earnings by creator on any Indian session platform, or on revenue of Indian dance and visual-art learning platforms.

**11. Recommended implementation**

1. **"Sessions" on the artist page.** Title, date, seats, price; UPI checkout on the web (after legal review); single-use join links; Instagram DM reminders; automatic refund if the host cancels; attendance capture.
2. **Embed third-party video** (100ms or LiveKit); do not build video in-house.
3. **Lead with artist-to-artist formats:** hot-seat portfolio reviews, curator and brand Q&As, group critiques in the style of Proko ([Proko](https://www.proko.com/course-lesson/gesture-critique)). Link them to Show & Review.
4. **Replace the blanket free tier** (45 minutes, 30 people, 2 a month) with earned or sponsored free rooms, with hard caps.
5. **Safety:** 18+ at launch; recording off by default; waiting room, moderators, report and block.
6. **Fair directory** with rotation, a share for new hosts, fit-based ranking and no paid placement.
7. **Measure** whether *participating* emerging artists gain follows or opportunities, not only revenue.

*Artists-only tension:* fans paying for classes would make Underdawg a two-sided fan platform competing with Instagram, Patreon and YouTube. Keep it as "artists teaching or reviewing artists"; the brief names "student artists", so learners join as aspiring artists with profiles.

---

### Feature 9 — Fan Club

**Verdict:** Reject · **Priority:** REJECT · Fan communities are one of the most crowded creator categories, they need fans that under-discovered artists do not have yet, they carry dead-community and moderation burdens during a period of subscription fatigue, and a Reddit-style fan feed contradicts the artists-only, no-feed design.

**1. Problem being solved**

The stated problem: artists lack an owned, paid home for superfans, and Discord or WhatsApp groups are hard to run. In India the evidence runs against the feature for Underdawg's segment.

- **Few Indians pay for music or fandom.** Only 38% of Indian smartphone owners have ever paid for music streaming, against 86% for video. Among those who never paid, 49% say streaming "isn't worth paying for" (EY–IMI, "How India Listens, Streams and Pays for Music", via [Variety, Jul 2026](https://variety.com/2026/music/asia/india-paid-music-subscribers-30-million-2028-1236820218/)) [Secondary]. India had 14.4 million paid music subscribers in 2025 out of about 178 million streaming users ([FICCI-EY, 24 Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [Verified].
- **Under-discovered artists have few fans to convert.** 61.1% of surveyed Indian creators have 1,000–10,000 followers ([Adgully on Kofluence, 2026](https://www.adgully.com/post/15568/kofluence-launches-2026-influencer-marketing-report)) [Company claim]. *Arithmetic* [Inference]: ₹10,000 a month needs about 205 members at ₹49 or 51 at ₹199, before fees, GST and app-store cuts. For a creator with 1,000–10,000 followers, 205 paying members is about 2% to 20% of all followers.
- **Indian paid-community startups struggled.** Rigi raised ₹100 crore in Jan 2023 for paid WhatsApp and Telegram communities, "$25 Mn across 3 rounds in 14 months of inception" ([Entrackr](https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/)) [Verified]. It later "shut down its core finfluencer business", "had to let go of 60% of its staff" and now sells paywalled video "starting at INR 49", with "limited cash runway" ([Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/)) [Verified]. Our scan on 1 Oct 2026 found its site showing short dramas [Unverified observation]. Qoohoo, a creator–fan engagement app, raised $800,000; its FY25 revenue was ₹5.3 lakh, down 95.5% ([Inc42](https://inc42.com/company/qoohoo/)) [Inc42 Datalabs].
- **The tools that survive serve high earners.** TagMango claims "₹1,000 Cr+ yearly creator earnings" from "10,000+ Creators" ([tagmango.com](https://tagmango.com)) [Company claim]. A small number of high-earning coaches fund these tools; they are not built for low-earning artists [Inference].
- **No conversion data.** No Indian data was found on how many followers convert to ₹49 or ₹199 memberships.

*Outside India (background only).* These facts cover points India has not measured. Patreon has **25M paid and 100M free memberships** ([NetInfluencer, 6 Aug 2025](https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/)) [Secondary]: four free members for each paid one. One-time payments grow 3x faster than recurring ones, and Vault dropped subscriptions in Dec 2025 because "Subscriptions force artists into a schedule that doesn't match how they create music" ([Water & Music, 30 Apr 2026](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/)) [Verified]. Participation is unequal: "90% of users are lurkers" and 1% create most content ([NN/g, 2006, older](https://www.nngroup.com/articles/participation-inequality/)) [Verified]. Weverse averaged 11.2M monthly users in 2025, all around label-backed K-pop acts ([Franvia, 23 Apr 2026](https://www.franvia.com/2026/04/k-pop-fandom-platform-weverse-d2c-retail.html)) [Secondary]. Clubs need fan density.

**Severity:** low for under-discovered artists; medium for mid-tier artists [Inference]. **Frequency:** clubs need daily or weekly posts, which drives fatigue. **Segments:** established illustrators, musicians with superfans, educators. **Workarounds:** Instagram close friends and broadcast channels, YouTube memberships, paid Telegram and WhatsApp groups through Cosmofeed, TagMango or Exly. **Why insufficient:** cheap tools already exist, so the gap is small.

**2. Competitors**

Indian platforms and platforms available in India:

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| YouTube channel memberships | US; listed for India | Paid channel memberships | Monthly tiers ₹59, ₹119, ₹179, ₹239 (May 2025) | YouTubers | Paid | Listed for India [Verified] | Reach; low price | Needs an existing channel audience | Sets the Indian price anchor | [YouTube India pricing](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN) |
| Telegram paid subscriptions | — | Paid channels via Stars | Monthly paid invite links | Channel owners | Paid | India is Telegram's largest market [Secondary] | Where Indian paid groups live | Fee undisclosed vs "100% to creators" claim (conflict); piracy hub | Channel, not artist profile | [afaqs 2024-08](https://www.afaqs.com/news/digital/telegram-introduces-paid-subscriptions-and-star-reactions-to-enhance-creator-revenue); [Wikipedia: Telegram](https://en.wikipedia.org/wiki/Telegram_(software)) |
| TagMango | India | Memberships, paid communities | Creator SaaS; 10% on the Basic plan | Coaches, edutainment creators | Paid | "10,000+ Creators"; "₹1,000 Cr+ yearly creator earnings" [Company claims]; FY25 revenue ₹20.9 crore [Inc42 Datalabs] | Indian payments | Built around high earners [Inference] | Groups, not artist profiles | [tagmango.com](https://tagmango.com); [Inc42](https://inc42.com/company/tagmango/) |
| Cosmofeed (now SuperProfile) | India | Paid Telegram and WhatsApp groups | Bot adds and removes paid members | Indian creators | ~10% [Unverified] | 50,000 creators, 25% paid (Mar 2022) [Verified] | Uses groups fans already have | 3 App Store India reviews allege blocked withdrawals | No artist network | [Business Today 2022-03-17](https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17); [App Store India](https://apps.apple.com/in/app/id1592830857) |
| Rigi | India | Paid WhatsApp and Telegram communities, courses | Creator tools | Finance influencers first | — | Raised ₹100 crore (Jan 2023) | Strong backers | Shut its core business after a SEBI crackdown; cut 60% of staff | Shows category and regulatory risk | [Entrackr](https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/); [Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/) |
| Qoohoo | India | Creator–fan engagement | — | Creators | — | $800,000 raised; FY25 revenue ₹5.3 lakh, down 95.5% [Inc42 Datalabs] | — | Revenue collapsed | Shows weak fan-payment demand | [Inc42](https://inc42.com/company/qoohoo/) |
| Instagram Subscriptions | US; India not in Jul 2023 list | Paid subscriber content | Exclusive posts, lives, DMs | IG creators | Paid | No public data | Fans already there | India not in Jul 2023 list | Overlaps Underdawg's host platform | [IG Subscriptions](https://creators.instagram.com/earn-money/subscriptions); [TechCrunch 2023-07-24](https://techcrunch.com/2023/07/24/instagram-launching-creator-subscriptions-australia-canada-uk-and-more/) |
| Discord Server Subscriptions | US | Chat + paid roles | $2.99–$199.99 tiers; owner keeps 90% | Communities | Free + paid | 90M+ daily users (Q4 2025) [Verified]; launched for US owners only | Free, powerful | Volunteer moderator burnout | Not open to Indian owners (current status unverified) | [Discord blog](https://discord.com/blog/server-and-creator-subscriptions); [discord.com/company](https://discord.com/company) |

**3. Uniqueness**

**Classification: Very common.** Every piece exists. In India, Cosmofeed, TagMango and Exly sell paid WhatsApp and Telegram communities, and YouTube sells memberships from ₹59. Upvotes, Hot/New/Top sorting, polls, streak badges, moderators and tiers are standard. Artist-specific fan platforms exist outside India: Weverse for K-pop, and Japan's pixivFANBOX with 12M+ users and 220k creators ([Yahoo Finance, 25 Apr 2024](https://finance.yahoo.com/news/creator-support-platform-pixivfanbox-celebrates-140000007.html)) [Secondary]. No artist-specific fan platform was found in India. A Reddit-style forum in a "no in-app feed" app is a contradiction, not a difference. An artists-only network adds nothing: fans follow artists, not platforms. Fan data favours popular artists; discovery value for unknowns is nil. The bundle is unusual but heavy and easy to copy [Inference].

**4. Artist value**

*Meaningful:* recurring income, only for artists who already have fans. *Vanity:* upvotes, leaderboards, points, member counts. Low value for the core segment [Inference].

**5. Discovery impact**

Very low. Leaderboards and Hot sorting push attention to the most active 1% and to popular artists — the "rich get richer" effect a 123-paper review describes in recommender systems ([Klimashevskaia et al., 2024](https://arxiv.org/pdf/2308.01118)) [Verified]. If a lite version is ever built: no global club rankings, leaderboards only inside one club, cross-club suggestions that favour small artists [Inference].

**6. Artist behaviour**

Fans return only if the artist posts often — a content treadmill. Network effects stay inside each club. The loop "post → fans engage → artist earns" brings in no new artists and no discovery [Inference].

**7. Role**

Monetisation for popular artists; engagement and retention for fans. Weak acquisition; minimal activation and discovery.

**8. Risks and how competitors handle them**

- **Dead clubs:** small fan bases plus the 90-9-1 pattern. NN/g also warns against over-rewarding hyperactive users ([NN/g](https://www.nngroup.com/articles/participation-inequality/)).
- **Regulatory shock:** Rigi lost its core business to a SEBI crackdown (Inc42, above).
- **Minors among fans:** DPDP duties and penalties up to ₹200 crore (see Feature 8).
- **Moderation duties under Indian law:** every intermediary must name a Grievance Officer who acknowledges complaints within 24 hours and resolves them within 15 days, and must remove intimate or impersonation content within 24 hours of a complaint ([PIB, 25 Feb 2021](https://pib.gov.in/PressReleseDetailm.aspx?PRID=1700749)) [Verified].
- **Recurring payments:** UPI AutoPay mandates add friction (24-hour pre-debit notice).
- **App stores:** Apple's 30% on iOS subscriptions.
- **Build cost:** a heavy build — forum, payments and a reputation system.

No Indian data was found on moderation burden in paid fan communities.

**9. Scale dependency**

At 1,000, 10,000 or 100,000 artists, the limit is each artist's own fan base, not platform size. Clubs work only for artists with thousands of engaged fans; cross-club discovery needs large scale [Inference].

**10. India specifics**

- **Where fans already are:** Telegram is huge in India. India was its largest market by installs (22%, Aug 2021) and "the country with the most users" in Mar 2025 ([Wikipedia: Telegram](https://en.wikipedia.org/wiki/Telegram_(software))) [Secondary]. Cosmofeed and TagMango already sell paid groups there.
- **Price anchors are low:**

| Indian price anchor | Price | Source |
|---|---|---|
| YouTube channel membership, lowest tier | ₹59 a month | [YouTube India pricing](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN) |
| WhatsApp Plus (Meta) | ₹79 a month | [Best Media Info, 16 Sep 2026](https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837) [Verified] |
| Instagram Plus (Meta) | ₹99 a month | Same |
| Spotify Premium (after Aug 2025 rise from ₹119) | ₹139 a month | [Music Ally, 18 Dec 2025](https://musically.com/2025/12/18/25-insights-about-indias-music-industry-in-2025/) [Verified] |
| Rigi's paywalled video | From ₹49 | [Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/) |

- **What subscribers really pay:** paying Indian music subscribers spend roughly ₹60–70 a month (derived from ₹10.3B ÷ 14.4M subscribers; [MBW, 15 Apr 2026](https://www.musicbusinessworldwide.com/india-added-nearly-4m-paid-music-streaming-subscriptions-in-2025-taking-its-total-to-14-4m-according-to-new-report/)) [Inference], so ₹199 for one emerging artist is a big ask.
- **Recurring UPI mandates add friction.**
- **Gap:** no reliable public data was found on Indian willingness to pay ₹49 or ₹199 a month for artist memberships.

**11. Recommended implementation**

Do not build it. Also drop "paid members reviewed first" from Show & Review, because it depends on Fan Club. If the idea returns after PMF, test a **"Supporters-lite"**: a supporter list, one-time support and drops, and early access to an artist's sessions or review queue, delivered through Instagram DMs and broadcast channels. This fits the shift to being "reachable, recognized, and ready when something meaningful happens" ([Water & Music](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/)). No Reddit clone, no global leaderboards, no recurring mandates at first. *Artists-only tension:* a fan club needs a fan-side social product. This is the clearest conflict with Underdawg's positioning in this part.

---

### Feature 10 — Show & Review

**Verdict:** Modify · **Priority:** BUILD EARLY · Feedback is the best-validated need in this part, but the proven payers are artists paying curators and pros, and artists swapping peer critiques — not fans paying artists — so rebuild it as artist-to-artist and curator review whose results feed discovery.

**1. Problem being solved**

Emerging artists lack credible, specific feedback and a path from "better work" to "being seen". The Indian evidence:

- **Artists say they need to learn.** In a 2022 survey of 500 Indian music creators, 73% strongly felt they had much to learn about production and 56% about monetisation ([EY–IPRS, Dec 2023](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/documents/ey-the-music-creator-economy.pdf)) [Verified; older].
- **Indians pay for structured feedback inside lessons.** Artium Academy sells 1:1 lessons with teacher feedback, assignment tracking and progress reports to "45,000+ Learners" ([artiumacademy.com](https://artiumacademy.com/)) [Company claim]. Its FY25 revenue was ₹28.0 crore ([Inc42](https://inc42.com/company/artium-academy/)) [Inc42 Datalabs].
- **Indian platforms answer with contests and picks, not critique.** JioSaavn's "ArtistOne Finds" playlist is "curated exclusively from submissions made by artists": 30 songs, with over a dozen artists under 1,000 monthly listeners and none above 30,000 ([Music Ally, 13 Aug 2025](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/)) [Verified]. Meta's Edits Film Festival takes jury-reviewed submissions from Indian creators ([Meta, 24 Aug 2026](https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/)) [Verified]. YouTube Hype reached India in July 2025 for channels with 500 to 500,000 subscribers ([BuzzInContent, 15 Jul 2025](https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785)) [Verified]. None is described as giving written feedback or a revision loop [Inference].
- **No Indian critique market exists yet.** No India-specific critique or curator marketplace was found. No Indian survey was found on willingness to pay ₹99 per critique. Whether Indian curators (playlisters, blogs, festival programmers, gallery scouts) would join is untested [Inference].

*Outside India (background only).* India has no paid-critique market to study, so the proof that artists pay comes from abroad.

- Groover charges €2 per curator (€4–6 for top curators), pays the curator €1 "whatever their decision is", and returns credits if a curator does not reply within 7 days ([Groover pricing](https://groover.co/en/lp/pricing/); [Groover help](https://help.groover.co/en/articles/2950583-groover-in-a-few-words)) [Verified]. It reports **600,000+ artists** [Company claim].
- SubmitHub reports **1.6M users**, 1,776 curators, **48.5M submissions** and a **31% approval rate** for the trailing month ([SubmitHub FAQ, 1 Oct 2026](https://www.submithub.com/help)) [Company claim]; earlier third-party estimates of 5–30% conflict with this and are unverified.
- Peer critique runs without any fans: Critique Circle, where you earn credits by critiquing others, is approaching "one million served critiques" since 2003 ([critiquecircle.com](https://www.critiquecircle.com/)) [Company claim].
- Quality is the weak link. Groover is rated 4.2/5 from 1,599 Trustpilot reviews, with recurring complaints of "generic, copy-and-paste reviews" (Sep 2026) ([Trustpilot: Groover](https://www.trustpilot.com/review/groover.co)) [Verified]. SubmitHub users report vague rejections and AI-detector false positives ([Trustpilot: SubmitHub](https://www.trustpilot.com/review/submithub.com)) [Verified].

**Severity:** high for emerging artists [Inference]. **Frequency:** per piece or release — weekly to monthly. **Segments:** independent musicians (strongest evidence), illustration learners, dancers, singers. **Workarounds in India:** paid lessons (Artium), Topmate "Priority DM", platform contests, Reddit and Discord critique channels. **Why insufficient:** feedback is split by discipline (mostly music), often generic, has no before/after tracking, and does not build a portable record of credibility [Inference]. **The proposed model is the unproven part:** we found no data, in India or elsewhere, on fans or students paying artists ₹99 for critiques specifically. "Paid members reviewed first" also depends on Fan Club, which we reject.

**2. Competitors**

Indian platforms and programmes for Indian creators:

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Artium Academy | India | Teacher feedback, progress reports | 1:1 lessons plus assignment tracking | Music learners | Paid | 45k+ learners [Company claim]; FY25 revenue ₹28.0 crore [Inc42 Datalabs] | Structured progress | — | Platform teachers, not artists you follow | [artiumacademy.com](https://artiumacademy.com/); [Inc42](https://inc42.com/company/artium-academy/) |
| Topmate "Priority DM" | India | Paid question to a creator | Fan pays to message | Indian creators | 10% / 20% fee | "1mn+ professionals" [Company claim] | One link | — | Unstructured; no before/after; no discovery | [topmate.io](https://topmate.io/about) |
| JioSaavn ArtistOne Finds | India | Playlist picked from artist submissions | Curated only from artists' own submissions; 30 songs | Indie musicians | Free | Over a dozen artists under 1,000 monthly listeners; none above 30,000 (Aug 2025) | Favours small artists | — | A playlist pick, not a critique; music only | [Music Ally, 13 Aug 2025](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/) |
| Instagram Edits Film Festival | US / India | Jury-reviewed submissions | Submissions judged by a jury (24 Aug–8 Oct 2026) | Indian emerging creators | Free | — | Meta's reach | One-off event | Nearest big-platform analogue | [Meta, 24 Aug 2026](https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/) |
| YouTube Hype | US; in India since Jul 2025 | Viewer votes lift small channels | Viewers get three free hypes a week; smaller channels get bonus points | Channels with 500–500,000 subscribers | Free | Beta outside India: 5M+ hypes across 50,000+ channels in four weeks | Built-in boost for small creators | A popularity vote | Leaderboard, no feedback | [BuzzInContent, 15 Jul 2025](https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785) |

*Outside India (background only).* Besides Groover, SubmitHub and Critique Circle (above), two more foreign models are shown because India has no equivalent.

| Platform | Country | Model it proves | How It Works | Adoption Evidence | Source |
|---|---|---|---|---|---|
| Skeb "Advice" | Japan | Paid critique of a client's own drawing — closest to fan→artist critique | Client attaches a drawing; fee held first; auto-refund if late | 4M registrants, 260k creators (Aug 2026) [Company claim] | [Skeb About](https://skeb.jp/about); [Skeb note](https://note.com/skeb/n/n1a177b2338bf) |
| Proko / Drawabox | US / online | Batch critique saves teacher time | Batch critique videos; paid critique credits | No verified totals; free critique "not guaranteed" [Unverified] | [Proko](https://www.proko.com/course-lesson/gesture-critique); [Patreon](https://www.patreon.com/uncomfortable) |

**3. Uniqueness**

**Classification:** as written (fan→artist paid critique), **somewhat common**, mostly inside education products. Artist→curator paid feedback is **common** in music outside India and **not found** in India. Cross-discipline artist-to-artist and curator critique with before/after tracking, "Solved" help threads and discovery links is **rare**. Our matrix found no native paid Show & Review on Instagram, YouTube, Patreon or Discord, and none on Topmate, Zorcha, LinkDM or StarClinch beyond Topmate's paid DM [Inference]. *Functional:* ratings with text or voice notes exist. *Audience:* artists-only, cross-discipline critique is uncommon. *Workflow:* a before/after loop is not standard. *Network:* high — artists supply the reviewers, so no fans are needed. *Data:* high; rubric scores, improvement and curator picks are pre-traction signals that scouting tools tracking artists already on major platforms cannot see ([Chartmetric](https://chartmetric.com/)). *Discovery:* high if outcomes feed discovery. *Combination:* different as a bundle, though each piece exists [Inference].

**4. Artist value**

*Meaningful:* skill growth, credibility (curator picks, "most improved"), exposure to curators and brands, a better portfolio, artist-to-artist contact. *Vanity:* star averages without context, review counts, "Solved" counts. Be honest about outcomes. No Indian data was found on how often critique leads to exposure or paid work.

*Outside India (background only).* Groover reports 50K+ playlist adds against 6M+ feedbacks (pricing page) but 1M+ "shares" against 4M+ feedbacks (homepage). The derived ratios (about 1% versus about 1 in 4) conflict, but both say most paid feedback does not become exposure [Inference].

**5. Discovery impact**

High potential, because work is judged on merit, not follower count. It creates skill, style, curator and collaboration signals. JioSaavn's submission-based playlist shows the idea can surface Indian artists with fewer than 1,000 monthly listeners (Music Ally, above). "Paid members first" and pay-per-review are pay-to-win risks. Fair-discovery rules [Inference]: blind queues; free credits earned by critiquing peers; reviewer capacity reserved for low-follower artists; per-artist caps; normalising harsh and lenient reviewers; "most improved" over "most liked"; payment never a ranking signal.

*Outside India (background only).* Two design lessons have no Indian example. Never weight endorsements by follower count — ArtStation's 2017 fix ("1 Raphael Lacoste vote > 1 Fan vote") hard-coded popularity bias ([ArtStation Magazine, 3 May 2017](https://magazine.artstation.com/2017/05/updated-trending-algorithm-diversity-quality/)) [Verified]. Cap repeat features, as DeviantArt does with one Daily Deviation per artist per year ([DeviantArt Help](https://www.deviantartsupport.com/kb/en/article/what-are-daily-deviations-and-how-can-i-suggest-art-for-a-daily-deviation-feature)) [Verified].

**6. Artist behaviour**

Artists use it about weekly and create content for it (submissions, revisions). Checking feedback is a strong return trigger. They invite peers to swap critiques, and before/after cards are shareable on Instagram. The network effect is two-sided. **Loop** [Inference]: critique 3 peers → earn a credit → submit → get structured feedback → revise → share the before/after on Instagram with an Underdawg link → new artists join → more reviewers → curators find improving talent → opportunities → artists return.

**7. Role**

Activation (a first critique within 48 hours is the "aha" moment), engagement and retention (revision loop), discovery (if tied to curators); monetisation medium (pro queue); acquisition medium (shared before/after posts).

**8. Risks and how competitors handle them**

- **Low-effort reviews:** Groover (outside India) guarantees a reply, not effort. Require a rubric, at least one actionable fix and a timestamp or image region; let recipients rate reviewers; refund flagged paid reviews.
- **Harsh critique:** guidelines, report and block, private by default.
- **Minors** posting dance or singing videos: 18+ at launch; parental consent later (DPDP, see Feature 8).
- **Copyright:** covers and dance to commercial tracks need music licences Underdawg likely lacks [Inference]; use private review links or originals-only public galleries.
- **AI submissions:** India's IT Amendment Rules 2026 say AI-generated visual content must carry "a clear and noticeable label" ([SCC Online, 12 Feb 2026](https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/)) [Verified legal press]. Use disclosure labels. SubmitHub's detector (outside India) shows the cost of false positives.
- **App-store billing:** a paid review bought in the iOS app is likely a digital purchase under Apple's rules [Inference; not verified]; sell on the web via UPI after legal review.
- **Reviewer economics** [Inference]: at ₹99 with a 50% split, a reviewer earns about ₹50 — viable only for short, structured reviews by peers or mid-tier pros.

**9. Scale dependency**

**1,000 artists:** the peer loop works if focused on 2–3 disciplines with credits enforcing give-and-take. **10,000:** a paid pro and curator queue becomes viable; Groover's ratio (outside India) of about 1 curator per 200 artists implies roughly 50 reviewers [Inference]. **100,000:** discovery rankings and talent search become robust. **Large scale:** skill-progress models trained on critique data.

**10. India specifics**

- India has a large learner base (an investor claim, see Feature 8), and the brief targets student artists.
- ₹99 sits near local price anchors (₹59–₹99), and one-off UPI payments suit pay-per-review [Inference]. UPI payments up to ₹2,000 stay free of the new merchant fee (see Feature 8).
- Indian platforms already run jury or submission showcases (Edits Film Festival, ArtistOne Finds) but offer no critique.
- No India-specific critique or curator marketplace was found. No reliable public data was found on Indian curators, playlist curators or scouting practices.
- Watch DPDP rules on minors, cover-song licensing and the AI-label rule.

**11. Recommended implementation**

1. **Post work** (image, ≤60-second video, audio) with a goal: "what I want feedback on".
2. **Structured review:** rubric stars plus "fix this first" (text or voice).
3. **"Give 3, get 1" credits**, so money is never the only route.
4. **Revise → before/after post**, with a shareable Instagram card; help threads marked "Solved".
5. **Experiment with a paid pro and curator queue** (for example ₹99–₹299): guaranteed reply within N days or automatic refund, reviewer quality scores, transparent outcomes.
6. **Feed discovery:** curator picks and "most improved" go into fair-exposure surfaces, with caps.
7. **Later:** teaching artists can open fan or student review queues and batch "critique rooms" (links Features 8 and 10).

*Artists-only tension and a payola risk:* reviewers should be artists, curators and pros, and curators must be verified opportunity-givers. Making artists pay per curator pitch imports the "payola" criticism aimed at Spotify Discovery Mode ([Music Ally, 13 Mar 2023](https://musically.com/2023/03/13/future-of-music-coalition-slams-spotify-discovery-mode-expansion/)). Keep an earned free route, keep prices low and refundable, and keep payment out of ranking.

---

### Feature 11 — Artist Boards

**Verdict:** Modify · **Priority:** BUILD EARLY (narrow version only) · Demand for scam checks and price benchmarks is strongly validated and fits artists-only, but open "Brand Reviews" carry real defamation risk in India and need transaction data, and the "Feedback" board duplicates Show & Review.

**1. Problem being solved**

Indian artists face late payment, scams and price uncertainty, and the help is scattered.

**Late payment and non-payment.**

- The official payment cycle for influencer campaigns is 90 days, against a 45-day government norm for small businesses. Delays run up to one year. Agencies in the middle hold payments 90–120 days. Creators now ask for a 25–50% advance ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm)) [Verified; all sources anonymous].
- Named creators are owed money: Neha Tanti (101K followers) had ₹3,50,000 pending out of about ₹8,00,000 in deals and chased one invoice for 1.5 years; Sakshi Rawte-Dhar (54.6K) was owed ₹2,20,000 for deals 3 to 9 months old; Aarja Bedi (38.6K) was owed ₹40,000 for content posted a year earlier ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [Verified].
- Performers are hit too. Karnataka's Department of Kannada and Culture had not paid over 1,800 artists, with total dues above ₹4 crore, typically ₹20,000–25,000 per performer. A musician said fees were "delayed, only partially paid, or not paid at all" ([The Indian Music Diaries, 4 Mar 2026](https://theindianmusicdiaries.com/are-payment-delays-silencing-the-voices-of-independent-music/)) [Verified].
- The legal remedy misses most artists. The MSMED Act gives a 45-day rule and compound interest, but only to Udyam-registered micro or small enterprises ([My Legal Pal](https://mylegalpal.com/articles/how-to-recover-payments-from-clients-in-india-msme-odr/)) [Secondary]. Only 15.2% of creators are registered as a business or for GST ([Kofluence via The Wire, 14 May 2026](https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age)) [Company claim].
- No Indian survey measures what share of creators, artists or freelancers are paid late. The most-quoted figure ("58% of freelancers have experienced not getting payments") is an unattributed line on a payments company's blog ([Razorpay Learn](https://razorpay.com/learn/scope-and-challenges-of-freelancers/)) [Blog; low reliability].

**Scams.**

- Indians reported cyber-fraud losses of ₹7,465.18 crore in 2023 and ₹22,845.73 crore in 2024 ([Inc42, 22 Jul 2025](https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/)) [Verified; Lok Sabha reply], and ₹22,495 crore in 2025 across 28.15 lakh cases ([The420.in, 21 Feb 2026](https://the420.in/india-cybercrime-24pct-rise-22495cr-loss/)) [Secondary]. Only 55,484 FIRs were filed in 2025.
- "Work from Home or Part-time job scams contribute to the highest number of cyber crimes reported in the country" in 2023 (I4C, via [Global Kashmir, 4 Jan 2024](https://globalkashmir.net/work-from-home-or-part-time-job-scams-top-cyber-crimes-in-india-says-i4c/)) [Secondary].
- Police cases show the pattern aimed at aspiring artists:

| Case | Method | Money taken | Source |
|---|---|---|---|
| Delhi, May 2025 | Fake casting agent for a music company; at least 17 aspiring artistes cheated | One victim paid ₹20,462 for "flight bookings" | [The Tribune, 14 May 2025](https://www.tribuneindia.com/news/delhi/cyber-fraudster-arrested-for-cheating-aspiring-artistes) |
| Delhi, Jan 2024 | Fake casting director on Instagram; 15 aspiring models cheated | ₹20,000 for a portfolio and ₹75,000 for a "selection shoot" | [The Tribune, 14 Jan 2024](https://www.tribuneindia.com/news/delhi/man-posing-as-casting-director-dupes-15-aspiring-models-in-delhi-581182) |
| Mumbai, Jun 2025 | Fake web-series "producer" on WhatsApp; 18-year-old aspiring actress | ₹2,000, then ₹7,836; then a demand for ₹40,000 with a morphed image | [Free Press Journal, 19 Jun 2025](https://www.freepressjournal.in/mumbai/mumbai-crime-18-year-old-aspiring-actress-duped-with-fake-web-series-offer-blackmailed-with-morphed-photos-case-registered) |
| Mumbai, 2022 | Fake Instagram account copying a casting director | ₹1,000 per audition by Google Pay | [BOOM, 19 Jan 2022](https://www.boomlive.in/explainers/bollywood-casting-director-shares-how-fake-accounts-impersonate-him-to-dupe-actors-16434) |
| Jabalpur, Oct 2025 | Fake copyright strikes against a creator with 96 Instagram pages | ₹50 lakh over about a year | [The Tribune, 23 Oct 2025](https://www.tribuneindia.com/news/trending/pay-rs-50-lakh-or-lose-instagram-page-in-a-first-influencer-with-57-million-followers-falls-victim-to-fake-copyright-scam) |

- Fake managers cost deals. In a HashFame survey of "over 32,000 top creators", 55%+ lost brand deals because of unverified contact routes or fake managers, and 45% said unverified managers quoted inflated rates ([MediaBrief, 27 May 2025](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [Company claim; method not disclosed].
- A Pune thread describes an "agency" that ghosts photographers at payment time ([r/pune, 4 Jun 2025](https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/)).
- No official count exists of fake brand-collaboration or fake casting scams in India. The evidence is case-level only.

**Price uncertainty.**

- "More than 60% of brands themselves acknowledge that the lack of pricing standardization is a major challenge" (Kofluence 2025 report, quoted in an op-ed; [MediaNews4U, 4 Apr 2026](https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/)) [Company claim].
- Quoted rates for one tier vary 40 times: an Instagram Reel by a micro creator (10K–100K followers) costs ₹2,000–80,000 ([Kofluence blog, 22 Jul 2026](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/)) [Company claim].
- "India has zero illustration agencies", and no India-specific rate guide exists; illustrators negotiate contracts and chase payments alone ([Aparajitha Vaasudev, Substack, 19 Aug 2026](https://studioapara.substack.com/p/india-has-no-illustration-agents)) [Essay; qualitative].
- A Mumbai founder could not find typical creator fees ([r/mumbai, 23 Sep 2024](https://web.archive.org/web/20250710022556/https://www.reddit.com/r/mumbai/comments/1fndnzi/what_are_the_typical_fees_for_paying_influencers/)).

*Outside India (background only).* No Indian survey gives a late-payment rate, so one foreign benchmark is given: 35% of UK freelancers were paid late in a year, owed £5,230 on average ([IPSE, 20 Jul 2022](https://web.archive.org/web/20240425074016/https://www.ipse.co.uk/resource/late-payment-within-the-self-employed-sector.html)) [Verified]. This is not Indian data.

**Severity:** high per incident. **Frequency:** occasional per artist, constant across the community. **Segments:** new performers, UGC and micro-creators, illustrators, designers, event photographers. **Workarounds:** Reddit city threads, WhatsApp and Facebook groups, advances and deposits, company fee blogs. **Why insufficient:** scattered, unstructured and unverified; no India artist rate data from a neutral source was found [Inference].

**2. Competitors**

Indian sources of scam, rate and review information:

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Reddit city communities | India | Scam checks, scam alerts, rate checks | Flairs; r/pune "Scam Alert" requires date, place, details | All creators | Free | Repeated threads | Fast answers | Unstructured; posts removed | No India-wide data | [r/pune](https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/) |
| MouthShut | India | Consumer reviews | Will not reveal reviewer identity unless a court orders | Indian consumers | Free | 800,000+ products [Secondary] | Indian legal precedent | Legal challenges, brand threats | Shows Indian review reality | [Wikipedia: MouthShut](https://en.wikipedia.org/wiki/MouthShut.com) |
| StarClinch and Kofluence fee guides | India | Published rupee fee ranges | Company blogs list ranges by event type, craft and follower tier | Artists, clients, brands | Free | The only rupee fee data found for emerging artists | Rupee ranges exist | Company estimates, not survey data; very wide ranges | Underdawg: artist-submitted data by craft and city | [StarClinch price guide, 19 Feb 2026](https://starclinch.com/blog/guide-artist-booking-prices-in-india/); [Kofluence blog, 22 Jul 2026](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/) |
| MSME Samadhaan and MSME ODR portal | India (government) | Legal route for delayed payments | 45-day rule; compound interest at three times the RBI bank rate | Udyam-registered micro and small enterprises | Free | 2,56,892 applications worth ₹55,244.31 crore to 31 Dec 2025 (SMEStreet); the portal itself displayed ₹31,692.74 crore payable on 1 Oct 2026 (the figures differ). ODR portal: 17 cases disposed in eight months | Statutory force | Needs Udyam registration before the invoice | A remedy after the fact, not a warning system | [SMEStreet, 29 Jul 2026](https://smestreet.in/smestreet-exclusive/msme-development-amendment-bill-2026-delayed-payments-analysis-12208060); [MSME Samadhaan](https://samadhaan.msme.gov.in/) |

No Indian company was found that offers artist peer boards (brand reviews, scam alerts, rate checks) [Inference]. "Artists Beware" Facebook groups and artist Discord servers could not be verified (login walls).

*Outside India (background only).* Four foreign models are shown because India has no equivalent.

| Platform | Country | Model it proves | How It Works | Evidence | Source |
|---|---|---|---|---|---|
| FYPM | US | Brand-deal rate database plus brand reputation — closest match to Brand Reviews + Rate Check | Creators submit deal data; see what brands pay and who ghosts | "100,000+ global creators" (site) vs 38,000 (TechCrunch, Jan 2024) [conflict]; verification method not public | [fypm.vip](https://www.fypm.vip/); [TechCrunch 2024-01-19](https://techcrunch.com/2024/01/19/how-fypm-used-instagram-stories-and-thirst-traps-to-raise-275k/) |
| Writer Beware | US | Expert-run scam watchdog — model for Scam Alerts | Tracks publishing scams | Since 1998 | [Writer Beware](https://writerbeware.blog/about/) |
| Musicians' Union rate cards | UK | Official minimum rates — model for Rate Check output | £167.16 per musician, pub gig ≤3h (Apr 2026) | Updated yearly | [MU](https://musiciansunion.org.uk/working-performing/gigs-and-live-performances/live-engagement-rates-of-pay/national-gig-rates) |
| Fiverr / Upwork ratings | Global | Reviews only after a completed order — the safest form of Brand Reviews | Verified-transaction reviews | Fiverr levels need 4.4–4.7+ ratings | [Fiverr levels](https://web.archive.org/web/20260510163049/https://help.fiverr.com/hc/en-us/articles/360010560118-Understanding-Fiverr-s-freelancer-levels); [Upwork badges](https://web.archive.org/web/20251123131903/https://support.upwork.com/hc/en-us/articles/360049702614-Learn-about-Upwork-s-talent-badges) |

**3. Uniqueness**

**Classification: Somewhat common globally; rare for artists in India.** No Indian company offers artist-only boards, and our matrix found no big platform hosting vetted artist-only boards; Meta's new Forum app for Facebook Groups is US-only ([Meta, 29 Sep 2026](https://about.fb.com/news/2026/09/find-community-forum-dedicated-app-facebook-groups/)). *Functional:* Reddit city threads cover scam checks in India; FYPM covers rates outside India. *Audience:* artists-only across crafts is less common. *Workflow:* transaction-linked Brand Reviews differ from free-text boards. *Network:* verified-artist posting reduces brand astroturfing. *Data:* structured rate and payment-timeliness data by craft and city in India would be **unique** and would power pricing in Hire and Gigs [Inference]. *Discovery:* little. *Combination:* rare.

**4. Artist value**

*Meaningful:* avoiding scams and non-payment, pricing confidence, and a safe way to share what artists now keep quiet. Indian creators stay silent about brand misconduct for fear of losing work, and there are no standard contracts ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [Verified]. Anonymous, structured data answers that. *Negative:* venting, pile-ons, upvote contests.

**5. Discovery impact**

Low for brand discovery; moderate for peer discovery via the Feedback board, which we move to Show & Review. Upvote-ranked threads favour big accounts; use "new" and "unanswered" queues and expert-verified answers [Inference].

**6. Artist behaviour**

Weekly for engaged users, with spikes when an offer arrives. Artists post, submit rates and return for answers and alerts. Scam alerts spread easily on WhatsApp and Instagram, which can drive acquisition. **Loop** (data network effect): offer arrives → Rate Check → benchmark → negotiate → complete job → submit outcome → better benchmarks [Inference].

**7. Role**

Engagement, retention and acquisition (shareable alerts), and a trust layer that should raise conversion in Hire and Gigs. Weak as a discovery feature.

**8. Risks and how competitors handle them**

**Defamation for brand reviews is the main risk.**

- India keeps criminal defamation (Bharatiya Nyaya Sanhita §356) ([Wikipedia: BNS](https://en.wikipedia.org/wiki/Bharatiya_Nyaya_Sanhita)) [Secondary].
- Under the IT Rules 2021, intermediaries must run a grievance system and remove content within 36 hours of a court or government order ([PRS India](https://prsindia.org/billtrack/the-information-technology-intermediary-guidelines-and-digital-media-ethics-code-rules-2021)) [Verified]. The Grievance Officer must acknowledge complaints within 24 hours and resolve them within 15 days ([PIB, 25 Feb 2021](https://pib.gov.in/PressReleseDetailm.aspx?PRID=1700749)) [Verified]. The 2026 amendment cut the removal time for unlawful information to "within 3 hours, which was earlier 36 hours" ([SCC Online, 12 Feb 2026](https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/)) [Verified legal press].
- The government said Twitter lost liability protection for non-compliance in July 2021 ([Wikipedia: IT Rules 2021](https://en.wikipedia.org/wiki/Information_Technology_(Intermediary_Guidelines_and_Digital_Media_Ethics_Code)_Rules,_2021)) [Secondary].
- Shreya Singhal (2015) limits takedown duties to court or government orders ([Wikipedia](https://en.wikipedia.org/wiki/Shreya_Singhal_v._Union_of_India)).

Other risks: false accusations, brigading, brand astroturfing, moderation cost, doxxing, and boards turning into venting.

**How Indian platforms cope:** refusing to reveal identity without a court order (MouthShut); required-field templates for scam alerts (r/pune).

*Outside India (background only).* Even in the US, Glassdoor had to unmask reviewers (2017, 2022); it screens out about 20% of reviews and added ID verification in 2024 ([Wikipedia: Glassdoor](https://en.wikipedia.org/wiki/Glassdoor)) [Secondary]. Other proven methods: expert curation (Writer Beware) and transaction-only reviews (Fiverr, Upwork).

**9. Scale dependency**

**1,000 artists:** a staff-seeded scam-pattern library plus Rate Check prompts; brand reviews too sparse. **10,000:** rate benchmarks per craft in 1–2 cities [Assumption: about 30+ data points per craft-city cell]. **100,000:** brand reputation scores become statistically defensible. **Large scale:** a public India artist rate index and brand trust scores.

**10. India specifics**

- Indian city subreddits already run "Scam Alert" flairs, which shows demand.
- Few creators are formal: only 15.2% are registered as a business or for GST (Kofluence 2026, above). The rest cannot use the MSME delayed-payment route, and a legal notice costs more than a typical small invoice [Inference].
- Published rupee benchmarks exist only from vendors. Creators under 10K followers earn ₹500–5,000 per Reel ([Mediabrief, 10 Jul 2025](https://mediabrief.com/kofluence-influencer-marketing-report-2025/)) [Verified]. StarClinch estimates ₹3,000–15,000 for an emerging musician's café gig ([StarClinch, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/)) [Company claim]. Features 16 and 17 give the full tables.
- India's legal setting (criminal defamation, grievance duties, 3-hour takedown) makes open naming-and-shaming boards riskier than in the US [Inference].
- Gaps: no Indian creator brand-review community was found. No reliable public data exists on Indian artist scam losses or on the share of artists paid late. India's BIS online-review standard was not verified.

**11. Recommended implementation**

1. **Rate Check (build early):** structured, anonymous submissions (craft, city, deliverable, fee, client type, paid on time?), shown only as ranges once a cell has enough data; a "what should I charge?" prompt inside Hire and Gigs.
2. **Scam-pattern Alerts (build early):** template-based posts (message text, payment request, channel), staff-moderated, evidence sent privately to moderators, shown as patterns; a brand is named only when verified; shareable alert cards.
3. **Brand Reviews (after PMF):** only from completed Underdawg jobs; two-way and structured (paid on time, days late, communication); brand right of reply; no naming of private individuals.
4. **Feedback board:** move into Show & Review.
5. **Compliance:** a grievance officer and takedown process under the IT Rules; legal review before launch.
6. **Ranking:** new and unanswered queues and verified expert answers; never weight by follower count.

Only artists post, so boards fit the positioning; they are structured Q&A and data, not a social feed.

---

### Feature 16 — Hire Artists

**Verdict:** Combine · **Priority:** EXPERIMENT · Non-payment, scams and unclear rates are real problems, but "direct hire with escrow" is very common (Collabstr is nearly identical) and paying brand demand — not artist supply — is the scarce side, so run it together with Gigs as one Opportunities marketplace, piloted by hand in one or two cities before building full escrow.

**1. Problem being solved**

Landing paid work is hard in India, and marketplaces alone do not fix it.

- **Few creators earn.** Only 8–10% of India's 2–2.5 million creators "monetize their content effectively" (BCG, via [PIB, 2 May 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)) [Verified]. Kofluence estimates 450,000–600,000 monetising creators out of 3.5–4.5 million ([IBTimes India, 8 Jul 2025](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [Company claim]. The two creator counts differ because the definitions differ.
- **Both sides say they cannot find each other.** 50.4% of creators cite "limited brand collaboration opportunities" as their main obstacle ([Storyboard18 on Kofluence, 14 May 2026](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [Company claim]. 83% of marketers struggle with influencer discovery ([WPP Media on Goat/Kantar, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity)) [Verified]. 62% of surveyed creators did not know brands had tried to reach them ([MediaBrief on HashFame, 27 May 2025](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [Company claim].
- **Global freelance sites do not work for them.** An Indian student designer wrote that "Fiverr and Upwork have just simply not worked" ([r/graphic_design, 29 Jan 2024](https://web.archive.org/web/20250329214617/https://www.reddit.com/r/graphic_design/comments/1adwmgf/indian_graphic_designer_need_help_with_freelance/)).
- **Small creators get products, not money.** Brands "allocate larger budgets to creators with larger followings and give smaller creators barter collaborations". One creator said: "You can't pay bills with lipstick or perfume." ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [Verified].
- **Illustrators have no agents.** "India has zero illustration agencies" ([Aparajitha Vaasudev, Substack, 19 Aug 2026](https://studioapara.substack.com/p/india-has-no-illustration-agents)) [Essay; qualitative].
- **Brands struggle too.** A Mumbai founder could not find typical creator fees and was told to check "demographics and engagement rate" ([r/mumbai, 23 Sep 2024](https://web.archive.org/web/20250710022556/https://www.reddit.com/r/mumbai/comments/1fndnzi/what_are_the_typical_fees_for_paying_influencers/)). Brands' top fear is fake followers (74%) (BCG, via [Storyboard18, 4 May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm)) [Secondary].
- **Most deals happen outside any platform.** "Nearly three quarters of influencer marketing spends in India still flow directly between brands and creators, outside of any organised channel" (KlugKlug figure in an op-ed; [MediaNews4U, 4 Apr 2026](https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/)) [Company claim].

How much of India's brand spend reaches small creators: no reliable Indian data found.

*Outside India (background only).* Brand payments are concentrating: the top 10% of creators received **62%** of brand ad payments in 2025, up from 53% in 2023 ([Business Insider / CreatorIQ, 14 Jan 2026](https://www.businessinsider.com/creator-income-inequality-grows-top-earners-paydays-rise-2026-1)) [Secondary]. This is not Indian data.

**Severity:** high when a job goes unpaid. **Frequency:** occasional per artist. **Segments:** illustrators, designers, photographers, UGC creators, performers. **Workarounds:** networks, Instagram DMs, agencies, StarClinch, advances and deposits. **Why insufficient:** the Indian platforms serve brands and rosters far exceed paid work; no Indian artist-hiring source with brand reputation data was found [Inference].

**2. Competitors**

Indian platforms and platforms operating in India:

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| StarClinch | India | Book performers + job board | Clients browse categories and book; payment released after the client confirms (2021 report) | Corporates, weddings, colleges | 15% of artist fee [Verified] | "17,000+ artists", 450+ cities (seen 1 Oct 2026) vs "10K+" (same page, 2 Oct 2026) vs 15,000+ (Dec 2021) [Company claims, conflict]; FY25 revenue ₹2.4 crore, down 10.2% [Inc42 Datalabs] | India-native trust layer | ₹7.5 lakh penalty for off-platform deals; "does not guarantee you any work" | Adds visual crafts, verified IG data | [StarClinch terms](https://starclinch.com/terms-of-use); [Our story](https://starclinch.com/our-story); [Siliconindia, 23 Dec 2021](https://www.siliconindia.com/startup/startup-funding/starclinch-raises-seed-round-from-artha-venture-fund-nitish-mittersain-nwid-30837.html); [Inc42](https://inc42.com/company/starclinch/) |
| Talentrack | India | Brand content marketplace | Project briefs | Brands; talent | Brand budgets "Up to ₹2L" to "₹10L+" | "50K+ artists, experts, and influencers" [Company claim]; FY25 revenue ₹36.4 crore, up 17.6% [Inc42 Datalabs] | Managed delivery | Agency-like | Leans to casting and ads | [talentrack.in](https://www.talentrack.in); [Inc42](https://inc42.com/company/talentrack/) |
| IndieFolio | India | Managed design hiring | Brands hire designers, illustrators, animators | Brands | Managed service | "70,000+ Talent Pool" [Company claim] | Curated | No longer an open portfolio network | Managed B2B | [IndieFolio](https://home.indiefolio.com) |
| Kofluence | India | Influencer matching "with fraud protection" | Brand-side campaigns | Brands; influencers | Not public | "750,000+ influencers" [Company claim]; FY25 revenue ₹52.5 crore [Inc42 Datalabs]; $4M (2022) | Indian scale | Roster far larger than paid work [Inference] | Influencer-centric | [kofluence.com](https://www.kofluence.com/); [Entrackr 2022-02-08](https://entrackr.com/2022/02/kofluence-raises-4-mn-in-pre-series-a-round); [Inc42](https://inc42.com/company/kofluence/) |
| Qoruz | India | Creator analytics and discovery | Tool for brands and agencies | Brands, agencies | Not public | FY25 revenue ₹56.4 crore [Inc42 Datalabs] | Data depth | Brand-side only | Not an artist marketplace | [qoruz.com](https://qoruz.com); [Inc42](https://inc42.com/company/qoruz/) |
| WYLD | India | Brand campaigns for small creators | Creators "receive direct bank transfers via UPI"; a campaign card shows "₹5,000 – ₹15,000" | Brands; creators | Not public | "100,000+ Creators", "500+ Brands Partnered" [Company claim] | UPI payouts | Not verified | Influencer-centric | [getwyld.in](https://getwyld.in) |
| Hobo.Video | India | Influencer campaigns | Brand-side platform | Brands; influencers | Not public | "225,187+" influencers, "12,000+ brands" [Company claim] | Roster size | Not verified | Influencer-centric | [hobo.video](https://hobo.video) |
| Instagram Creator Marketplace | US; India since Feb 2024 | Native brand–creator discovery | Brands search by audience data, message creators | Brands; IG creators | Free | Expanded to 8 markets incl. India [Verified]; no Indian adoption data found | First-party data, no extra app | Testers "waiting" for deals (2022) | Underdawg adds escrow, contracts, artist taxonomy | [Meta 2024-02-21](https://about.fb.com/news/2024/02/creator-marketplace-for-brands-and-creators-to-collaborate-on-instagram/); [afaqs, Feb 2024](https://www.afaqs.com/news/social-media/instagram-creator-marketplace-launches-in-india); [BI 2022-09-29](https://www.businessinsider.com/influencers-testing-instagram-creator-marketplace-waiting-brand-deals-money-2022-9) |

Two Indian influencer marketplaces shrank or changed business: Wobb's revenue fell 72.4% to ₹56.1 lakh in FY25 ([Inc42](https://inc42.com/company/wobb/)) [Inc42 Datalabs]; One Impression raised $11.0 million and its site now reads "Amplify — reimagined for an AI-native world" ([Inc42](https://inc42.com/company/one-impression/); [oneimpression.io](https://www.oneimpression.io)).

*Outside India (background only).* Three foreign marketplaces are shown for lessons Indian platforms do not yet teach.

| Platform | Country | Lesson | How It Works | Evidence | Source |
|---|---|---|---|---|---|
| Collabstr | US/Canada (sources differ) | A nearly identical workflow already exists | Payment held until done; 72-hour revision or dispute window; brand pays 10%, creator 15% | "950,000+ creators" (Jul 2026) [Company claim]; a Feb 2025 press release gave far lower figures (no link in our notes) | [Collabstr pricing](https://web.archive.org/web/20260704044017/https://collabstr.com/pricing); [FAQ](https://web.archive.org/web/20260526235902/https://collabstr.com/faq) |
| Fiverr | Israel | Buyers are leaving generalist marketplaces; ranking is for sale | Ranking uses levels, reviews and paid Promoted Gigs | 2.7M active buyers (Jun 2026), −21.9% year on year; take rate 28.0% [Verified] | [Fiverr 6-K](https://www.sec.gov/Archives/edgar/data/0001762301/000117891326003624/exhibit_99-1.htm) |
| Contra | US | "Artist pays 0%" is already offered | Commission-free profiles and projects | "$250M+ earned by 1.5M+" [Company claim] | [Contra Labs 2026-03-31](https://contra.com/blog/introducing-contra-labs) |

**3. Uniqueness**

**Classification: Very common.** Instagram and YouTube already offer brand–creator matching in India ([Meta](https://about.fb.com/news/2024/02/creator-marketplace-for-brands-and-creators-to-collaborate-on-instagram/); [YouTube Help](https://support.google.com/youtube/answer/9385307)) [Verified]. StarClinch, Talentrack, IndieFolio and Kofluence cover performers, casting, design and influencers. *Functional:* low; counter-offers and click-to-accept contracts are details. *Audience:* moderate; Indian platforms split by discipline (performers on StarClinch, influencers on Kofluence, designers on IndieFolio), so one taxonomy across visual and performing crafts is less common [Inference]. *Workflow:* low; "brand pays the fee" matches Contra's 0% outside India. *Network:* moderate; brands buy *vetting* (Kofluence "fraud protection"), not exclusivity. *Data:* moderate to high if verified engagement, job ratings, brands' payment records and India rates are combined — but Meta, Qoruz and Kofluence also hold engagement data. *Discovery:* low by default. *Combination:* moderate; no Indian company combines brand hiring with escrow, artist-only discovery and verified Instagram stats [Inference].

**4. Artist value**

*Meaningful:* paid work, escrow protection, credibility from completed jobs, price discovery from brand budgets. *Vanity:* "Open for work" badges and profile views that lead to no jobs. Value depends almost entirely on brand demand density [Inference].

**5. Discovery impact**

Positive for brand, local, craft and skill discovery. But the proposed filters — **followers and engagement rate** — reproduce popularity bias. In India, smaller creators already get barter while budgets go to larger accounts (The Nod Mag, above). Fair rules [Inference]: sort by fit (craft, city, budget, availability); show engagement *quality*, not raw counts; reserve newcomer slots on every results page; rotate equally good artists; cap open briefs per artist; never sell ranking; track the share of jobs going to the top 10%.

Small-city artists have a case to make to brands. Kofluence reports engagement of 3–4% in metros, 3.5–4.5% in Tier 2 and 4.5–5.5% in Tier 3–4 cities, while a Tier 2 campaign costs about one-third of a metro one ([MediaNews4U, 15 May 2026](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/)) [Company claim].

*Outside India (background only).* Upwork's "Rising Talent" badge is a working newcomer slot ([Upwork badges](https://web.archive.org/web/20251123131903/https://support.upwork.com/hc/en-us/articles/360049702614-Learn-about-Upwork-s-talent-badges)). Fiverr's Promoted Gigs and Upwork's Boosted Proposals show what selling ranking looks like.

**6. Artist behaviour**

Occasional for most artists; per campaign for brands. No special content. Artists return only if briefs arrive — an empty inbox drives churn. They share "hire me" links. The network effect is cross-side. **Loop** [Inference]: paid job → rating and case study → better match for similar briefs → brands return; fairness rules must stop it becoming winner-takes-all.

**7. Role**

Monetisation (brand fee), activation (first paid job), retention (if demand exists), discovery (brand to artist). Weak for acquisition.

**8. Risks and how competitors handle them**

- **Cold start and scarce demand.** StarClinch, founded in 2015, earns about ₹2.4 crore a year. At a 15% fee that implies about ₹16 crore of bookings a year if all revenue were commission [Inference]. Gigstart, an earlier Indian artist-booking startup, raised $210,000 and last reported ₹11.7 lakh of revenue in FY16 ([Inc42](https://inc42.com/company/gigstart/)) [Inc42 Datalabs].
- **AI pressure on fees.** Indian illustrators and musicians report clients using AI as leverage to cut fees ([The Established, 21 Apr 2025](https://www.theestablished.com/culture/living/who-can-really-claim-to-be-an-artist-when-the-medium-is-a-machine)) [Verified; qualitative]. No Indian survey measures the loss.
- **Deals leaving the platform.** StarClinch sets a ₹7.5 lakh penalty on artist and client. Win on protection, not on blocking contact [Inference].
- **Fake brands and fake managers** (the casting-scam and HashFame patterns in Feature 11): verify every brand.
- **Disputes over "2 revisions".** Indian creators already ask for 25–50% advances (Storyboard18, Feature 11), so staged payment is accepted practice [Inference].
- **RBI payment-aggregator rules.** A non-bank aggregator needs RBI authorisation and ₹15 crore net worth (₹25 crore by the end of the third year). Funds must sit in an escrow account at a scheduled commercial bank ([RBI guidelines, 2020](https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11822&Mode=0)) [Verified]. The RBI's 2025 Directions (15 Sep 2025) keep these rules and add that "a PA business shall not carry out marketplace business" and that escrow "shall not be operated for 'Cash-on-Delivery' transactions" ([TaxGuru, full text, Sep 2025](https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html)) [Verified]. Use an authorised aggregator's escrow or split product; never hold funds directly.
- **Tax.** As an e-commerce operator, Underdawg likely collects GST TCS at 0.5% and TDS under 194-O at 0.1% ([ClearTax TCS](https://cleartax.in/s/tcs-under-goods-and-services-tax); [ClearTax 194-O](https://cleartax.in/s/section-194o)) [Verified explainers]. Resident individuals with up to ₹5 lakh of yearly sales who give PAN or Aadhaar are exempt from the TDS; the rule is now Section 393(1) of the Income Tax Act 2025 ([Tax Garden](https://taxgarden.in/blog/tds-on-ecommerce-payments-section-194o-393-guide-india-fy-2026-27)) [Explainer]. Needs tax counsel.
- **UPI fee.** From 15 October 2026, merchant UPI payments above ₹2,000 carry a 0.4% fee, capped at ₹300 ([The Indian Eye, 18 Sep 2026](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/)) [Verified press report]. Most hiring payments sit above that line [Inference].
- **Payout trust.** At VerSe (Dailyhunt, Josh) "delayed publisher payments have sent shockwaves to the platform" ([Inc42](https://inc42.com/features/josh-in-jeopardy-funds-run-dry-for-dailyhunt-can-ai-get-verse-back-in-rhymes/)) [Verified]. Cosmofeed has App Store reviews alleging blocked withdrawals. Escrow brand money before work starts; never let payouts depend on the platform's own cash.

*Outside India (background only).* Fiverr's buyers fell 21.9% and Fiverr says AI "absorbs high-volume, low-value, transactional tasks" ([Fiverr 6-K, 29 Jul 2026](https://www.sec.gov/Archives/edgar/data/0001762301/000117891326003624/exhibit_99-1.htm)) [Verified]. Dribbble's 2025 contact-gating got "dozens" of designers banned and caused a backlash ([TechCrunch, 4 Aug 2025](https://techcrunch.com/2025/08/04/a-top-designer-was-banned-from-dribbble-now-hes-building-his-own-competitor)). Collabstr uses a 72-hour revision window; China's Mihuashi takes deposits per stage (draft, line, colour, final) ([App Store CN](https://apps.apple.com/cn/app/id1146790989)).

**9. Scale dependency**

**1,000 artists:** concierge only — staff source briefs from a few brands in one city and craft. **10,000:** a self-serve pilot in 1–2 cities and 3–5 crafts. A similar 50–100 available artists per craft per city is an assumption to test. **100,000:** national self-serve. **Large scale:** algorithmic matching, verified-brand programmes.

*Outside India (background only).* All but one of the successful marketplaces Lenny interviewed constrained geography or category at launch; OpenTable's rule was 50–100 restaurants per city ([Lenny's Newsletter, 20 Nov 2019](https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace)) [Verified].

**10. India specifics**

- **Where brand money goes.** India banned TikTok on 29 June 2020 ([Wikipedia](https://en.wikipedia.org/wiki/Censorship_of_TikTok)) [Secondary]. Its Indian replacements shrank: Moj's daily users fell from 9.24 million (Jan 2021) to 2.16 million (Jan 2023) ([MediaNews4U, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/)) [Secondary]. So brand budgets go to Instagram, YouTube and agencies. 93.1% of brands prioritise Instagram ([Adgully on Kofluence, 2026](https://www.adgully.com/post/15568/kofluence-launches-2026-influencer-marketing-report)) [Company claim].
- **How big the spend is.** Estimates conflict. EY: ₹2,344 crore in 2024 (estimate) ([EY, Apr 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) [Verified]. Goat/Kantar: ₹3,600 crore in 2024 ([WPP Media, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity)) [Verified]. Kofluence: ₹3,000–3,500 crore in 2025 ([MediaNews4U, 15 May 2026](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/)) [Company claim].
- **What small creators are paid** (Kofluence, company claims):

| Tier | 2025 report | 2026: one Instagram Reel |
|---|---|---|
| Nano (1K–10K followers) | ₹500–5,000 per Reel | ₹1,000–12,000 |
| Micro (10K–100K) | ₹2,500–80,000 per campaign | ₹2,000–80,000 |
| Macro (100K–1M) | — | ₹84,000–7.9 lakh |
| Mega (1M+) | ₹2 lakh+ per collaboration | ₹8 lakh+ |

Sources: [Mediabrief, 10 Jul 2025](https://mediabrief.com/kofluence-influencer-marketing-report-2025/); [Kofluence blog, 27 Jun 2025](https://www.kofluence.com/blog/2025-influencer-marketing-report-sneak-peek/); [Kofluence blog, 22 Jul 2026](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/).

- **What a campaign costs by city** (Kofluence 2026): metro ₹3.8–4.5 lakh; Tier 2 ₹1.3–1.6 lakh; Tier 3–4 ₹35,000–90,000 ([MediaNews4U, 15 May 2026](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/)) [Company claim].
- **Demand may grow.** 70% of brands surveyed by BCG plan to raise creator budgets 1.5–3x within 2–3 years ([Storyboard18 citing BCG, 4 May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm)) [Secondary]. 47% of brands prefer micro and nano influencers, and 71% pay a fixed fee (EY, Apr 2024, above) [Verified].
- **Formality is a barrier.** Only 15.2% of creators are business- or GST-registered (Kofluence 2026; see Feature 11). A platform that invoices for artists would remove that barrier, subject to legal review [Inference].
- **Who earns today.** The Indian platforms with revenue charge brands (Qoruz ₹56.4 crore, Kofluence ₹52.5 crore, Talentrack ₹36.4 crore). This supports charging brands for Hire Artists [Inference].
- **The likely gap** is **artists-only, multi-craft, verified, protected small-ticket hiring** (for example ₹5,000–₹50,000 briefs from D2C brands, cafés and agencies) [Inference].
- **Gaps.** No direct evidence yet that Indian brands, agencies or wedding planners would use an artists-only platform to hire. No Indian data on Instagram creator marketplace adoption, or on fees charged by Kofluence, Qoruz, WYLD or Hobo.Video.

**11. Recommended implementation**

Build it as one entry point of the Opportunities marketplace described under Feature 17. Rules: "Open for work" off by default; every brand verified; brief-first ("request a quote") in the pilot, with payments added once volume justifies compliance; click-to-accept contracts stating deliverables and the 2 included revisions, with optional milestones; **the brand pays the fee, the artist pays 0%** (total take of about 10–20% is market-normal: StarClinch 15% in India; Collabstr 10% + 15% and Encore 20% outside India) [Inference]; two-way ratings feeding Rate Check and Brand Reviews; fit-first search with newcomer slots. *Artists-only tension:* brands are not artists. Treat "artists-only" as **artists-only supply plus verified opportunity-givers**; without a demand side, artist networks end up as "all creatives sharing with each other" ([Creative Boom on Cara, 6 Jun 2024](https://www.creativeboom.com/resources/everyones-talking-about-cara-but-is-it-any-good/)) [Verified].

---

### Feature 17 — Gigs

**Verdict:** Combine · **Priority:** EXPERIMENT · Performers and freelancers clearly need verified paid gigs and Indian live-event demand is growing, but gig boards are common, lead-selling models are widely disliked, and liquidity is local and seasonal, so Gigs should be the open-call side of one Opportunities marketplace with Hire Artists, piloted as a curated board in one city.

**1. Problem being solved**

For Indian musicians, the live gig is the main income. In a 2022 survey of 500 music creators, "live performances (incl. DJing)" was ranked the top revenue source by 139 respondents, more than any other source ([EY–IPRS, Dec 2023](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/documents/ey-the-music-creator-economy.pdf)) [Verified; older]. But small acts report low and unreliable pay:

- Club gigs pay a "token fee" that is "not enough to cover costs spent on gear" ([Rolling Stone India, 13 Jul 2022](https://rollingstoneindia.com/heres-what-its-really-like-to-be-an-indian-indie-artist-playing-live-gigs/)) [Verified; 2022].
- Opening acts "are rarely paid fairly"; a columnist proposes a floor such as ₹10,000 for a club slot ([Rolling Stone India, 12 Sep 2025](https://rollingstoneindia.com/what-the-music-industry-doesnt-talk-about-enough-minimum-wage-for-musicians)) [Opinion].
- Beginner comedians pay to perform: open mics cost the comedian ₹200–500 per slot ([BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india)) [Blog].
- Fees are "delayed, only partially paid, or not paid at all" (The Indian Music Diaries, Feature 11).
- Fake "urgent shoot" gigs ghost at payment, a pattern also reported in Delhi NCR ([r/pune, 4 Jun 2025](https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/)). Fake casting agents charge audition and portfolio fees (police cases, Feature 11).

Indian demand is real and growing.

| Organised live events in India (FICCI-EY) | ₹ crore |
|---|---|
| 2022 | 7,300 |
| 2023 | 8,800 |
| 2024 | 10,100 |
| 2025 | 14,500 (up 44%) |
| 2026 (estimate) | 14,000 |
| 2028 (estimate) | 19,600 |

Source: [FICCI-EY, 24 Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf) [Verified]; summary in [EY India, 24 Mar 2026](https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report).

- **A second estimate differs.** A BookMyShow–EY-Parthenon report sizes the live-events market at **₹13,000 crore** and says over half of brands ran on-ground activations last year ([EY India, 12 Mar 2026](https://www.ey.com/en_in/newsroom/2026/03/india-s-13-000-crore-live-events-market-fuels-shift-to-experiential-marketing-bookmyshow-ey-parthenon-report)) [Verified]. An earlier report from the same pair put 2024 at "surpassing the INR12,000 crore mark" ([EY-Parthenon/BookMyShow, 2025](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-india-s-rising-concert-economy.pdf)). FICCI-EY's 2024 figure is ₹10,100 crore. The two EY outputs use different scopes.
- **Part of the 2025 jump is a one-off.** The 44% growth was "supported by the Kumbh Mela that added INR25 billion of direct event production spend". EY expects "a slight dip in 2026 due to a rationalisation in concerts", and notes that in late 2025 "several concerts did not sell out and were canceled or postponed" (FICCI-EY, above).
- **Most of the money is not tracked.** FICCI-EY sizes "unaddressable" events (weddings, religious, personal) at ₹1,11,800 crore in 2025, against ₹14,500 crore of organised events. That is where unknown artists work [Inference].
- **Weddings.** India has about 10M weddings a year ([Wikipedia](https://en.wikipedia.org/wiki/Weddings_in_India)) [Secondary]. WedMeGood reports an average wedding budget of ₹39.5 lakh; it gives no artist share ([BW Travel, late 2025](https://www.bwtravel.com/industry-insights/wedmegood-report-2025-shows-rise-in-wedding-spends-and-shift-towards-local-destination-weddings-10901110)) [Company survey]. 92% of event companies expect weddings and personal events to grow (EEMA-EY survey in FICCI-EY, above).
- **College fests** pay artists ([r/IndianHipHopHeads, 17 Mar 2024](https://web.archive.org/web/20250805034819/https://www.reddit.com/r/IndianHipHopHeads/comments/1bgpybf/india_tour_or_college_fest/)). Mood Indigo (IIT Bombay) "reportedly operates on a budget north of ₹10–12 crore annually" ([KSverse, 16 Jul 2026](https://ksverse.in/blogs/culture/iit-fest-budgets-mood-indigo-shaastra)) [Blog; unaudited].
- **Growth is uneven.** BookMyShow events rose to 34,086 in 2025, only +11% after +16% the year before, led by headliners ([Music Ally, 11 Dec 2025](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/)) [Verified].
- **Growth is moving to smaller cities.** Event-company CEOs say "the highest growth potential lies with the next 10 large cities" ([MediaNews4U on FICCI-EY, Mar 2026](https://www.medianews4u.com/live-events-growth-shifts-beyond-metros-next-10-cities-lead-expansion-wave-ficci-ey-report/)) [Secondary].
- **The industry names trust as a problem.** Event companies' "key challenges faced were unorganized competition, talent scarcity and a trust deficit" (FICCI-EY, above).

How much of this reaches emerging artists: no reliable public data found. No source gives independent or emerging artists' share of live revenue.

**Severity:** high. **Frequency:** weekly in wedding and fest seasons for performers [Assumption]; occasional for others. **Segments:** DJs, bands, singers, dancers, comedians, event photographers, designers. **Workarounds:** agencies, StarClinch, Instagram DMs, WhatsApp and Facebook groups, café managers and open mics, fest circuits, networks ([StarClinch blog, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/)) [Company claim]. **Why insufficient:** informal channels have no contracts, agencies sit in the middle, and the one booking marketplace charges the artist 15% without guaranteeing work.

**2. Competitors**

Indian platforms and channels:

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| StarClinch | India | "Artist Jobs" board + booking | Clients post a requirement or book; payment released on confirmation (2021 report) | Corporates, weddings, colleges | 15% of artist fee | "17,000+ artists" (1 Oct 2026) vs "10K+" (2 Oct 2026) [Company claims, conflict]; FY25 revenue ₹2.4 crore [Inc42 Datalabs] | **Already combines** board and booking | ₹7.5 lakh off-platform penalty; no guarantee of work | Adds visual crafts, IG data, fair ranking | [StarClinch](https://starclinch.com/); [terms](https://starclinch.com/terms-of-use); [Inc42](https://inc42.com/company/starclinch/) |
| Skillbox | India | Ticketing + artist booking | Began as a musician platform | Concerts, nightlife | Not public | FY25 revenue ₹29.9 crore, up 19.0% [Inc42 Datalabs] | Live-scene links | Moved to ticketing | Ticketing-first | [skillboxes.com](https://skillboxes.com); [Inc42](https://inc42.com/company/skillbox/) |
| Hire4Event | India | Agency booking | Client sends brief and budget (₹1 lakh–₹20 lakh+) | Corporate buyers | Agency fees | "10,000+ Events Managed" [Company claim] | Full service | Middleman | Shows agencies are the incumbent | [Hire4Event](https://web.archive.org/web/20260708083739/https://www.hire4event.com/) |
| BookMyShow | India | Ticketing and promotion for large events | Lists events; promotes large tours | Ticket buyers, promoters | Not public | 34,086 events listed in 2025 [Company claim] | Dominant listing | Serves headliners, not small-act hiring | Not a gig board | [Music Ally, 11 Dec 2025](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/) |
| Gigstart | India | Artist booking | Artist-booking marketplace | Event clients | — | $210,000 raised; last revenue ₹11.7 lakh in FY16 [Inc42 Datalabs] | — | Did not scale | Warning on booking marketplaces | [Inc42](https://inc42.com/company/gigstart/) |
| Instagram posts and DMs | India | Informal gig posts | "Urgent shoot" posts; "DM for collab" | Everyone | Free | Not measurable | Zero friction | No contracts; ghosting | The real incumbent to beat on trust | [r/Chennai 2025-04-12](https://web.archive.org/web/20250706091905/https://www.reddit.com/r/Chennai/comments/1jx7bfr/whats_really_happening_with_dm_paid_collaborations/) |
| ArtConnect (India filter) | Germany | Open calls, grants, residencies | Artists browse and apply | Visual artists | Free (5 views a month) / $5 a month (annual) | 100,000+ artists; 350 open listings (1 Oct 2026) [Company claim] | Curated calls | "India" filter shows foreign calls | Model for verified open calls | [ArtConnect](https://www.artconnect.com/opportunities?country=IN); [plans](https://artconnect.zendesk.com/hc/en-us/articles/7886405974802-What-membership-plans-are-available-for-artists-and-curators) |

*Outside India (background only).* Three foreign models are shown because they reveal failure modes no Indian platform has yet tested at scale.

| Platform | Country | Lesson | How It Works | Evidence | Source |
|---|---|---|---|---|---|
| Gigmit | Germany | Paid ranking captures open calls | Artists apply to promoters; PRO (€228 a year) ranks higher; 0% commission | "90% of the opportunities… go to gigmit PRO users" [Company claim] | [Gigmit FAQ 2024-01-25](https://blog.gigmit.com/en/faq-gigmit-pro-costs/) |
| Bark | UK | Selling leads angers artists | Pros pay to respond to leads | "Hella fake leads"; low-paying clients | [r/DJs 2023-01-10](https://web.archive.org/web/20250115112950/https://www.reddit.com/r/DJs/comments/108d88t/what_source_do_you_use_for_leads_barkcom_is_trash/) |
| GigSalad | US | Paid tiers buy exposure; off-platform bookings are charged | Vendors quote on leads; 5% booking fee (free) / 2.5% (paid); Featured $479 a year; 10–12.5% on bookings marked off-platform | Paid tiers get "the most exposure"; "low quotes… cheap gigs" | [GigSalad Help](https://help.gigsalad.com/article/19-signing-up); [GigSalad Help, 15 Jun 2026](https://help.gigsalad.com/article/177-booking-requirements-for-all-members); [r/musicians 2024-09-06](https://web.archive.org/web/20250305011756/https://www.reddit.com/r/musicians/comments/1faev3b/gigsalad_or_partyslate/) |

**3. Uniqueness**

**Classification: Common.** StarClinch already runs a gig board with booking in India, and agencies such as Hire4Event serve corporate buyers. Instagram lets brands publish projects creators can apply to, though whether this works in India is unverified ([TechCrunch, 11 Apr 2023](https://techcrunch.com/2023/04/11/instagram-adds-new-features-to-its-creator-marketplace-expands-access-to-brand-agencies/)). Covering both **live performance and freelance creative work** for Indian cafés, colleges and SMBs looks **rare** [Inference; no exhaustive scan]. Verified posters plus escrowed advances plus fair application rules would differ from StarClinch's penalty model and, outside India, from lead-selling (Bark) and pay-to-rank (Gigmit PRO). Gig budgets by craft and city would also feed Rate Check.

**4. Artist value**

*Meaningful:* paid gigs, local reputation, repeat bookings from venues and cafés. *Vanity:* dozens of applications with no reply.

**5. Discovery impact**

Open calls help unknown artists more than search-based hiring, because posters see applicants they would never have searched for — **if** ranking is fair. Fair rules [Inference]: free applications with a weekly cap per artist; a blind first round (portfolio and quote, no follower counts); newcomer slots in every shortlist; local-first ranking; invite rotation; budget-band matching; a minimum fee per craft and city. India has no official minimum gig fee; the nearest Indian reference is a columnist's proposed ₹10,000 floor for a club slot (Rolling Stone India, above).

*Outside India (background only).* Gigmit's "90% to PRO" shows how paid ranking captures open calls. The Bash reports about 90% of bookings within 100 miles ([The Bash](https://itg.thebash.com/top-questions)) [Company claim], which supports local-first ranking. The UK Musicians' Union publishes a floor of £167.16 per musician for a pub gig of up to 3 hours ([MU, 24 Mar 2026](https://musiciansunion.org.uk/working-performing/gigs-and-live-performances/live-engagement-rates-of-pay/national-gig-rates)) [Verified], a model for a per-craft minimum.

**6. Artist behaviour**

Artists update showreels to apply, and city-and-craft gig alerts bring them back. They invite bandmates; cafés and colleges post repeatedly. Gig posts spread on WhatsApp and Instagram. The network effect is local and cross-side. **Loop** [Inference]: complete a gig → verified review plus event photos on the profile → invitations to similar gigs → posters return each season.

**7. Role**

Engagement and retention (alerts), monetisation (poster fee), local discovery, acquisition (shareable posts).

**8. Risks and how competitors handle them**

- **Fake gigs and scams:** the casting and "urgent shoot" patterns above.
- **Pay-to-play:** open mics that charge the performer; unpaid opening slots.
- **Poster cancellations and no-shows; disputes over "performed as agreed".**
- **Race-to-the-bottom pricing.**
- **A market correction:** FICCI-EY expects a dip in 2026 after cancelled and unsold concerts. The wedding, college and corporate circuit looks steadier [Inference].
- **Low frequency per buyer:** individual wedding and party clients hire rarely.
- **Physical safety at late-night venues** (not researched).
- **Payments and tax** as in Feature 16. Google Play exempts "tickets for live events" and physical services from its billing ([Google Play policy](https://support.google.com/googleplay/android-developer/answer/9858738)); Apple's treatment of real-world services was not verified in our notes.

*Outside India (background only).* "Many failed marketplaces attack purchasing cycles that are simply way too infrequent", and a good match can end the need to return ([Bill Gurley, 13 Nov 2012](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)) [Verified].

**9. Scale dependency**

**1,000 artists:** a curated board in one city; staff source 20–50 real gigs a month [Assumption]; no self-serve escrow. **10,000:** self-serve posting by verified posters in 1–2 metros, with escrowed advances. **100,000:** multi-city, with ranking and fraud systems. **Large scale:** national, tuned to wedding and fest seasons.

**10. India specifics**

**What gigs pay in rupees.** The only rupee fee data for emerging artists comes from booking-platform blogs. These are estimates, not survey data.

| Event type (emerging musician) | Fee per gig |
|---|---|
| Cafés and lounges | ₹3,000–15,000 |
| College fests | ₹5,000–30,000 |
| Private parties | ₹10,000–50,000 |
| Weddings and sangeets | ₹15,000–1,00,000+ |
| Corporate events | ₹20,000–80,000 |

Source: [StarClinch gig guide, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/) [Company claim]. By experience: beginner (0–1 year) ₹3,000–10,000 per gig; intermediate (1–3 years) ₹10,000–40,000.

| Artist type, lowest ("emerging/local") tier | Booking price per event |
|---|---|
| Local and aspiring DJs | ₹20,000–45,000 |
| Emerging comedians | ₹20,000–60,000 |
| Emerging or local singers | ₹25,000–75,000 |
| Solo or small local dance troupes (4–6 dancers) | ₹25,000–80,000 |
| 3–4 piece local bands | ₹40,000–1,00,000 |
| Solo instrumentalists | ₹15,000–50,000 |
| Traditional photo and video | ₹40,000–90,000 a day |

Source: [StarClinch price guide, 19 Feb 2026](https://starclinch.com/blog/guide-artist-booking-prices-in-india/) [Company claim; "prices are estimates"]. Comedy line-up shows pay newer comics ₹2,000–5,000 ([BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india)) [Blog].

- **Fee arithmetic.** At fee floors of ₹3,000–15,000 (café) and ₹5,000–30,000 (college), a 15% platform fee yields ₹450–4,500 per booking [Inference].
- **How demand is served today.** Demand is spread across weddings, corporates, colleges and cafés, and served by agencies (Hire4Event), StarClinch and Instagram DMs. The trust gap — ghosting and fake gigs — is the wedge, not discovery alone [Inference].
- **The incumbent is small on mobile.** StarClinch's iOS artist app had only 6 Indian ratings ([Apple lookup](https://itunes.apple.com/search?term=starclinch&entity=software&country=in)) [Verified], so the incumbent does not look dominant on mobile [Inference].
- **Royalties at gigs.** IPRS public-performance income rose 48.2% to ₹150.8 crore in FY2025–26, and IPRS asks members to check that organisers hold a licence and to submit set lists ([IPRS Annual Report FY2025–26, Sep 2026](https://iprs.org/wp-content/uploads/2026/09/Annual_Report_FY2025-26.pdf)) [Verified]. A set-list reminder would be cheap and useful [Inference].
- **Gaps.** No reliable Indian data was found on: the share of gigs found via WhatsApp, Instagram DMs or agencies; the number of college fests or their total entertainment budgets; the number of cafés and pubs hosting live music; the entertainment share of wedding budgets; corporate-event entertainment spend; or GST treatment of artist performances.

**11. Recommended implementation — how Gigs should work, and why it should merge with Hire Artists**

**How it should work** (based on the evidence above):

1. **Who can post:** only verified posters — a business check (GST or company) or individual KYC. Prioritise repeat posters (cafés, venues, colleges, agencies, D2C brands), because one-off party clients hire rarely.
2. **The post form:** craft, city, date and time, duration, deliverables, and a **mandatory budget band**. Paid only: no "exposure" gigs, no ticket-selling requirements. A built-in scam checklist blocks requests for fees from artists or off-platform payment.
3. **Applying:** artists filter by craft, city, date and budget, and apply free with their Instagram-verified portfolio and a quote. A weekly application cap stops spray-applying. Posters can also invite artists, with invite rotation.
4. **Shortlisting:** a blind first round (portfolio and quote, followers hidden), newcomer slots, local-first and fit-first ranking. Never sell leads or boosts.
5. **Booking:** the poster accepts a quote; both sides click to accept a short contract (date, set length, deliverables, cancellation terms, what "performed as agreed" means). The poster pays the advance into escrow held by an RBI-authorised payment aggregator, not by Underdawg.
6. **Release:** after the gig, the poster confirms, or funds release automatically after a short dispute window (Collabstr uses 72 hours). If the artist cancels, the poster is refunded; late cancellation by the poster should pay the artist a fee [Inference].
7. **Ratings:** two-way and structured (on time, as described, paid on time). They feed Rate Check and transaction-linked Brand Reviews.
8. **Fees:** the poster pays; artists pay 0%.
9. **Extension:** list verified open calls (competitions, grants) with a "free to apply" filter — ArtConnect's India filter mostly shows foreign calls [Verified observation].

**Phasing** follows section 9: at ~1,000 artists the board is curated and staff-sourced, with verified posters and contract templates but payments off-platform; escrowed advances arrive at ~10,000.

**Should Gigs combine with Hire Artists? Yes.** Both need the same expensive parts: verification, aggregator escrow, contracts, ratings, disputes and tax compliance. Both depend on the same scarce side — paying demand — and splitting it across two products would halve liquidity [Inference]. Competitors already run **one marketplace with two entry points**: StarClinch in India ("Artist Jobs" plus booking), and Collabstr (direct hire plus "post a campaign") and Upwork (job posts plus direct offers) outside India ([StarClinch](https://starclinch.com/); [Collabstr pricing](https://web.archive.org/web/20260704044017/https://collabstr.com/pricing)). So build one **"Opportunities"** marketplace — one inbox, contract flow, payment rail and rating system — with two doors: **"Hire this artist / send a brief"** (search-led, from a profile) and **"Post a gig / open call"** (application-led). The doors serve different buyers: brands who know whom they want, and venues or colleges who want applicants. The open-call door is the fairer one for unknown artists.

---

#### Verdict summary (features 8–11, 16, 17)

| # | Feature | Verdict | Priority | One-line reason | Key evidence |
|---|---|---|---|---|---|
| 8 | Live Rooms | Modify | BUILD AFTER PMF | Real teaching demand, but a crowded, shrinking category with little discovery value; reshape into critique and showcase rooms on third-party video, with no blanket free tier | Artium ₹28.0 crore FY25 from live teaching; FrontRow shut in 2023 after ~$18M; Leher and Eloelo left live rooms; Apple requires in-app purchase for one-to-many live; ~$5.40 per free room at 100ms (calculated) |
| 9 | Fan Club | Reject | REJECT | Needs fans under-discovered artists lack; very crowded; contradicts artists-only, no-feed design | Only 38% of Indian smartphone owners have ever paid for music streaming; 61.1% of creators have 1K–10K followers; Rigi raised ₹100 crore and left paid communities; outside India, Patreon free:paid is 4:1 |
| 10 | Show & Review | Modify | BUILD EARLY | Best-validated need; rebuild as artist-to-artist plus curator review with credits, before/after and discovery links | 73% of Indian music creators want to learn production; no Indian critique or curator marketplace found; Indian platforms offer contests, not critique; outside India, Groover 600k+ artists and SubmitHub 1.6M users |
| 11 | Artist Boards | Modify | BUILD EARLY (narrow) | Rate Check and Scam-pattern Alerts now; Brand Reviews only from verified jobs after PMF; Feedback board moves to Show & Review | 90-day brand payment cycles stretching to a year; casting scams of ₹1,000–75,000 per victim; no Indian rate standard; India criminal defamation (BNS §356); IT Rules duties |
| 16 | Hire Artists | Combine | EXPERIMENT | Real problems but very common; brand demand is scarce; merge with Gigs and pilot by hand before building escrow | 50.4% of creators cite too few brand deals; 83% of marketers struggle to find creators; StarClinch (founded 2015) ₹2.4 crore revenue; Kofluence, Talentrack and Qoruz earn from brands; RBI aggregator rules |
| 17 | Gigs | Combine | EXPERIMENT | The open-call door of one Opportunities marketplace: verified posters, escrowed advances, free and fair applications, one city first | India organised live events ₹14,500 crore, +44% (2025); café gigs pay ₹3,000–15,000; StarClinch already combines board and booking; outside India, Gigmit "90%" to PRO and Bark lead complaints |

#### Charts

CHART: india-live-events — India's organised live-events segment doubled from ₹7,300 crore (2022) to ₹14,500 crore (2025); FICCI-EY expects a small dip in 2026
Type: line
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| 2019 | 8,300 | ₹ crore | FICCI-EY | CY2019 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/documents/ey-shape-the-future-indian-media-and-entertainment-is-scripting-a-new-story.pdf |
| 2022 | 7,300 | ₹ crore | FICCI-EY | CY2022 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2023 | 8,800 | ₹ crore | FICCI-EY | CY2023 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2024 | 10,100 | ₹ crore | FICCI-EY | CY2024 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2025 | 14,500 | ₹ crore | FICCI-EY | CY2025 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2026 (estimate) | 14,000 | ₹ crore | FICCI-EY | CY2026E | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |
| 2028 (estimate) | 19,600 | ₹ crore | FICCI-EY | CY2028E | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf |

CHART: india-gig-fees — An emerging musician in India is paid ₹3,000–15,000 for a café gig and ₹5,000–30,000 for a college fest (StarClinch estimates)
Type: grouped bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Cafés and lounges — low | 3,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| Cafés and lounges — high | 15,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| College fests — low | 5,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| College fests — high | 30,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| Private parties — low | 10,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| Private parties — high | 50,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| Weddings and sangeets — low | 15,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| Weddings and sangeets — high | 1,00,000 | ₹ per gig (and above) | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| Corporate events — low | 20,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |
| Corporate events — high | 80,000 | ₹ per gig | StarClinch (company estimate) | Dec 2025 | https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/ |

CHART: india-platform-revenue — Indian platforms that charge brands, ticket buyers or learners earn ₹14–56 crore a year; the artist-booking marketplace StarClinch earns ₹2.4 crore (Inc42 Datalabs, indicative)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Qoruz (brand-side analytics) | 56.4 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/qoruz/ |
| Kofluence (brand-side influencer matching) | 52.5 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/kofluence/ |
| Talentrack (brand content marketplace) | 36.4 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/talentrack/ |
| Skillbox (ticketing and booking) | 29.9 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/skillbox/ |
| Artium Academy (live music classes) | 28.0 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/artium-academy/ |
| TagMango (creator tools) | 20.9 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/tagmango/ |
| Muzigal (live music classes) | 13.7 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/muzigal/ |
| Cosmofeed / SuperProfile (paid groups) | 11.7 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/cosmofeed/ |
| StarClinch (artist booking) | 2.4 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/starclinch/ |
| FrontRow (celebrity classes, shut 2023) | 0.535 | ₹ crore | Inc42 Datalabs | FY25 | https://inc42.com/company/frontrow/ |

CHART: marketplace-fees — Indian platforms take 10–20%: StarClinch charges the artist 15% and Topmate 10–20%; outside India, artist-side fees run from 0% to 20%
Type: grouped bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| StarClinch — artist side (India) | 15 | % of remuneration | StarClinch | accessed 2026-10-01 | https://starclinch.com/terms-of-use |
| Topmate — own link (India) | 10 | % | Topmate | 2026 | https://topmate.io/pricing |
| Topmate — marketplace (India) | 20 | % | Topmate | 2026 | https://topmate.io/pricing |
| TagMango — Basic plan (India) | 10 | % | TagMango | accessed 2026-10-02 | https://tagmango.com/pricing |
| Graphy — entry plan (India; plus ₹24,999 a year) | 10 | % | Graphy | accessed 2026-10-02 | https://graphy.com/pricing |
| Exly — entry tier (India) | 10 | % | Exly | accessed 2026-10-02 | https://exlyapp.com/pricing |
| Outside India: Collabstr — creator side | 15 | % of order | Collabstr | 2026-05-26 (snapshot) | https://web.archive.org/web/20260526235902/https://collabstr.com/faq |
| Outside India: Collabstr — brand side (Free plan) | 10 | % of order | Collabstr | 2026-07-04 (snapshot) | https://web.archive.org/web/20260704044017/https://collabstr.com/pricing |
| Outside India: Encore Musicians — musician side | 20 | % of quote | Encore Musicians | 2021-12-23 | https://encoremusicians.com/blog/why-does-encore-have-a-service-fee/ |
| Outside India: GigSalad — booking fee (free members) | 5 | % | GigSalad | 2026-06-15 | https://help.gigsalad.com/article/177-booking-requirements-for-all-members |
| Outside India: Gigmit — commission (PRO costs €228/yr) | 0 | % | Gigmit | 2024-01-25 | https://blog.gigmit.com/en/faq-gigmit-pro-costs/ |
| Outside India: Contra — freelancer side (claim) | 0 | % | Contra | accessed 2026-10-01 | https://contra.com/ |

CHART: india-payment-delay — Indian influencer campaigns officially pay in 90 days against a 45-day legal norm; the worst reported delays reach a year (anonymous agency sources)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Legal norm for paying small suppliers (MSMED Act) | 45 | days | Storyboard18 | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Official brand payment cycle | 90 | days | Storyboard18 | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Intermediary agency hold, upper end | 120 | days | Storyboard18 | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Audit disputes, upper end (8 months) | 240 | days (approx.) | Storyboard18 | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |
| Worst reported delays (one year) | 365 | days | Storyboard18 | Jul 2025 | https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm |

CHART: india-cyber-fraud-losses — Cyber-fraud losses reported in India rose about tenfold, from ₹2,290 crore in 2022 to about ₹22,500 crore in 2024 and 2025
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| 2022 | 2,290 | ₹ crore | Rajya Sabha reply via CyberPeace | 2022 | https://cyberpeace.org/resources/blogs/cyberpeace-analysis-indias-cybercrime-surge-signals-a-growing-digital-security-challenge-an-assessment-based-on-rajya-sabha-proceedings-and-mha-data |
| 2023 | 7,465.18 | ₹ crore | Lok Sabha reply via Inc42 | 2023 | https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/ |
| 2024 | 22,845.73 | ₹ crore | Lok Sabha reply via Inc42 | 2024 | https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/ |
| 2025 | 22,495 | ₹ crore | MHA and I4C data via The420.in | 2025 | https://the420.in/india-cybercrime-24pct-rise-22495cr-loss/ |

CHART: india-artist-scam-cases — Fake casting agents in India took ₹1,000 to ₹75,000 per aspiring artist; one creator lost ₹50 lakh to fake copyright strikes
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Fake casting director on Instagram, Mumbai: audition fee | 1,000 | ₹ per victim | BOOM | Jan 2022 | https://www.boomlive.in/explainers/bollywood-casting-director-shares-how-fake-accounts-impersonate-him-to-dupe-actors-16434 |
| Fake web-series producer on WhatsApp, Mumbai: fees paid before extortion (calculated: 2,000 + 7,836) | 9,836 | ₹ | Free Press Journal | Jun 2025 | https://www.freepressjournal.in/mumbai/mumbai-crime-18-year-old-aspiring-actress-duped-with-fake-web-series-offer-blackmailed-with-morphed-photos-case-registered |
| Fake music-video casting agent, Delhi: paid by one victim (17 victims) | 20,462 | ₹ | The Tribune | May 2025 | https://www.tribuneindia.com/news/delhi/cyber-fraudster-arrested-for-cheating-aspiring-artistes |
| Fake casting director on Instagram, Delhi: "selection shoot" fee (15 victims) | 75,000 | ₹ per victim | The Tribune | Jan 2024 | https://www.tribuneindia.com/news/delhi/man-posing-as-casting-director-dupes-15-aspiring-models-in-delhi-581182 |
| Fake copyright-strike extortion of a creator, Jabalpur | 50,00,000 | ₹ total | The Tribune | Oct 2025 | https://www.tribuneindia.com/news/trending/pay-rs-50-lakh-or-lose-instagram-page-in-a-first-influencer-with-57-million-followers-falls-victim-to-fake-copyright-scam |

CHART: india-live-community-funding — Funding did not save Indian live, community and booking startups: FrontRow (~$18M), Rigi ($25M) and Eloelo ($50M+) all shut or changed business
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Eloelo (live rooms; now micro-dramas) | 50 | USD million (more than) | Entrackr | accessed 2026-10-01 | https://entrackr.com/exclusive/exclusive-eloelo-kicks-off-series-b-round-with-13-mn-8933673 |
| Rigi (paid communities; left the business) | 25 | USD million | Entrackr | to Jan 2023 | https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/ |
| FrontRow (celebrity classes; shut 2023) | 18 | USD million (about; $17.2M per Entrackr, $20.29M per Inc42) | TechCrunch | 2023-07-10 | https://techcrunch.com/2023/07/10/frontrow-shutdown |
| Qoohoo (creator–fan engagement; revenue down 95.5%) | 0.8 | USD million | Inc42 Datalabs | to Apr 2023 | https://inc42.com/company/qoohoo/ |
| Gigstart (artist booking; last revenue FY16) | 0.21 | USD million | Inc42 Datalabs | Dec 2014 | https://inc42.com/company/gigstart/ |

CHART: live-video-cost — Live video costs $0.0004–$0.004 per participant-minute at vendor list prices; one free 45-minute, 30-person room is about $5.40 at 100ms (calculated)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| 100ms video conferencing | 0.004 | USD per participant-minute | 100ms | accessed 2026-10 | https://www.100ms.live/pricing |
| 100ms live streaming | 0.0012 | USD per viewer-minute | 100ms | accessed 2026-10 | https://www.100ms.live/pricing |
| LiveKit Cloud (Ship) | 0.0005 | USD per participant-minute (+ $0.12/GB bandwidth) | LiveKit | accessed 2026-10 | https://livekit.com/pricing |
| LiveKit Cloud (Scale) | 0.0004 | USD per participant-minute (+ $0.10/GB bandwidth) | LiveKit | accessed 2026-10 | https://livekit.com/pricing |

CHART: feedback-market-scale — Outside India (background only): artists already pay for curator feedback at scale — SubmitHub reports 1.6M users and Groover 600,000+ artists (company claims); no Indian equivalent was found
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| SubmitHub | 1,600,000 | users | SubmitHub | 2026-10-01 | https://www.submithub.com/help |
| Groover | 600,000 | artists and pros | Groover | accessed 2026-10 | https://groover.co/en/lp/pricing/ |

**Main gaps for this part.** No reliable public data found on: Indian willingness to pay ₹49–₹199 a month for artist memberships or ₹99 per critique; fan willingness to pay artists for critiques; Indian live-class attendance, prices or no-show rates; how often critique leads to paid opportunities; whether Indian curators would join a review queue; the share of Indian artists or creators paid late, or their average delay in days; the number or value of fake casting and fake brand-collaboration scams; the share of Indian brand spend that reaches small creators; the share of live-event money that reaches emerging artists; the share of Indian gigs found via WhatsApp, Instagram DMs or agencies; college-fest and café-circuit sizes; GST treatment of artist performances; and whether Indian brands, agencies or wedding planners would hire through an artists-only platform. Reddit evidence was read through archived copies, and several Indian creator sites blocked automated access, so some Indian competitors may be missing.

---

<!-- Part 5 of the Underdawg feature-validation report: brief sections 15-19. India first. Sources: the Indian research notes (creators and artists; markets and platforms; India fact pack) and research notes r7 (primary) and r9 (verified addendum), with r1, r2, r3, r5 and r6 used only to confirm specific marks and facts. Pages were checked on 1 or 2 Oct 2026 unless a date is given. Inc42 Datalabs revenue and funding figures are third-party filings data and are indicative only. -->

**Part summary.** No Indian company was found that builds Underdawg's exact mix: artists only, an Instagram-connected verified profile, fan-money tools, artist-only trust boards and brand hiring with escrow. None was found outside India either. But in India the pieces already exist, split across companies. Topmate sells money tools for a 10–20% commission. StarClinch books performers for a 15% fee. Talentrack and IndieFolio run brand hiring. TagMango, Cosmofeed and Exly sell paid communities and sessions. Zorcha, ReplyKaro and InstantDM sell Instagram DM automation, free or from ₹99 a month. BlinkStore and Qikink do print-on-demand. In the 14-platform matrix below, **link-in-bio is offered (fully or partly) by 13 platforms, brand hiring by 10, and shops and digital downloads by 9 each**. **Artist Boards are offered by none, and Show & Review only partly by two.** The strongest threat is Instagram itself, with 481 million ad-reach users in India and a creator marketplace open there since February 2024. Next come the Indian money tools. The Indian failure record is clear. India-made feeds lost to Instagram Reels (Koo, Moj, Josh, Chingari, Trell). Creator tools built on hype or on one creator category shut or pivoted (FrontRow, Rigi, Eloelo, Leher). The Indian platforms with real revenue charge brands, ticket buyers or learners, not unknown artists. TikTok is not in the matrix because India banned it on 29 June 2020. Research limits matter here. The main competitor pass had no web search, and Crunchbase, Reddit, Product Hunt and several Indian media and company sites blocked access, so small or stealth Indian startups may be missing.

## 15. Competitor feature matrix

The matrix compares Underdawg's 18 planned features with 14 platforms. **Table 15A** puts the two Indian competitors first (Topmate and StarClinch), then the two platforms with the largest confirmed reach in India (Instagram and YouTube). **Table 15B** holds ten platforms from outside India, as background. **Table 15C** lists Indian tools that sell single features but are not counted in the 14. Marks for Instagram, YouTube and Patreon come from a dedicated verification pass that opened official help pages and TechCrunch reports. Marks for the other platforms come from the competitor notes (official sites, help centres and App Store data). Artfol and Beacons are included because Artfol is the closest artists-only network with money tools, and Beacons is the closest toolkit for "verified stats" (a media kit built from connected accounts).

**TikTok is not in the matrix.** India banned TikTok on 29 June 2020, so none of its features reach Indian artists ([Wikipedia: Censorship of TikTok](https://en.wikipedia.org/wiki/Censorship_of_TikTok)).

**Legend:** ✓ strong or native. △ partial, limited, region-limited, or through a partner. ✕ not offered or not found. ? could not be verified. **P** = planned by Underdawg, not yet live. **(IN)** = Indian company. **(IN ✓)** = confirmed in India. **(IN ?)** = India not confirmed. **(US)** = US only. **(not IN)** = confirmed not available in India.

**Table 15A: Indian competitors and the two platforms with the largest Indian reach** (the last column counts all 14 platforms in Tables 15A and 15B)

| # | Feature | Underdawg | Topmate (IN) | StarClinch (IN) | Instagram | YouTube | Offered by (✓ / △, of 14) |
|---|---|---|---|---|---|---|---|
| 1 | Instagram-connected profile | P | ✕ | ✕ | ✓ | △ | 2 / 2 |
| 2 | Verified insights / ER for brands | P | ✕ | ? | ✓ (IN ✓) | ✓ (IN ✓) | 3 / 6 |
| 3 | Schedule posts to Instagram | P | ✕ | ✕ | ✓ | △ | 2 / 2 |
| 4 | Link-in-bio page | P | ✓ | △ | ✓ | ✓ | 5 / 8 |
| 5 | Templates and template marketplace | P | ✕ | ✕ | ✓ | ✕ | 1 / 4 |
| 6 | DM automation | P | ✓ | ✕ | △ | ✕ | 3 / 2 |
| 7 | Art Shop (shop / merch) | P | ✕ | ✕ | △ | ✓ (IN ✓) | 5 / 4 |
| 8 | Live Rooms | P | △ | ✕ | ✓ (IN ?) | ✓ (IN ✓) | 4 / 2 |
| 9 | Fan Club / paid membership | P | ? | ✕ | ✓ (IN ?) | ✓ (IN ✓) | 3 / 4 |
| 10 | Show & Review (paid critique) | P | △ | ✕ | ✕ | ✕ | **0 / 2** |
| 11 | Artist Boards (brand reviews, scam alerts, rates) | P | ✕ | ✕ | ✕ | ✕ | **0 / 0** |
| 12 | Tips | P | ? | ✕ | ✓ (IN ?) | ✓ (IN ✓) | 5 / 0 |
| 13 | Digital downloads | P | ✓ | ✕ | ✕ | ✕ | 7 / 2 |
| 14 | Bookings / paid 1:1 | P | ✓ | △ | △ | ✕ | 2 / 4 |
| 15 | Event tickets | P | △ | ✕ | △ | △ (IN ✓) | 0 / 6 |
| 16 | Hire Artists (brands search and hire) | P | ✕ | ✓ | ✓ (IN ✓) | ✓ (IN ✓) | 5 / 5 |
| 17 | Gigs / job board | P | ✕ | ✓ | ✓ (IN ?) | ✕ | 6 / 0 |
| 18 | Paid Pro plan for creators | P (₹299/mo) | ✕ | ? | ✓ (IN ✓) | ✕ | 8 / 0 |

**Table 15B: Outside India (background only): artist networks, music platforms and creator toolkits**

| # | Feature | Behance | Dribbble | Cara | ArtStation | Artfol | SoundCloud | Bandcamp | Linktree | Beacons | Patreon |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Instagram-connected profile | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✓ | △ | ? |
| 2 | Verified insights / ER for brands | △ | △ | ✕ | △ | ✕ | △ | △ | △ (US) | ✓ | ✕ |
| 3 | Schedule posts to Instagram | △ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✓ | ? | ? |
| 4 | Link-in-bio page | △ | △ | △ | △ | △ | △ | △ | ✓ | ✓ | ? |
| 5 | Templates and template marketplace | △ | △ | ✕ | △ | ✕ | ✕ | ✕ | △ | ? | ✕ |
| 6 | DM automation | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✓ | ✓ | △ |
| 7 | Art Shop (shop / merch) | ✕ | ✕ | ✕ | ✓ | ✓ | ✓ | ✓ | △ | △ | △ |
| 8 | Live Rooms | ✕ | ✕ | ✕ | ✕ | ✕ | △ | ✓ | ✕ | ? | ✓ |
| 9 | Fan Club / paid membership | △ | ✕ | ✕ | ✕ | ✕ | △ | △ | ✕ | △ | ✓ |
| 10 | Show & Review (paid critique) | ✕ | ✕ | ✕ | △ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| 11 | Artist Boards (brand reviews, scam alerts, rates) | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| 12 | Tips | ✕ | ✕ | ✕ | ✕ | ✓ | ✓ | ✓ | ? | ? | ✕ |
| 13 | Digital downloads | ✓ | △ | ✕ | ✓ | ? | △ | ✓ | ✓ (not IN) | ✓ | ✓ |
| 14 | Bookings / paid 1:1 | △ | △ | ✕ | ✕ | ✕ | ✕ | ✕ | ✓ (not IN) | ? | ✕ |
| 15 | Event tickets | ✕ | ✕ | ✕ | ✕ | ✕ | △ | △ | ? | ? | △ |
| 16 | Hire Artists (brands search and hire) | ✓ | ✓ | △ | △ | △ | ✕ | ✕ | △ (US) | △ | ✕ |
| 17 | Gigs / job board | ✓ | ✓ | ✓ | ✓ | ✕ | ✕ | ✕ | ✕ | ✕ | ✕ |
| 18 | Paid Pro plan for creators | ✓ | ✓ | ✕ | ✓ | ? | ✓ | ✓ | ✓ | ✓ | ✕ |

**Table 15C: Indian tools that sell each feature but sit outside the 14-platform count**

| # | Feature | Indian tools found | What they charge or claim (company claims unless marked) |
|---|---|---|---|
| 1 | Instagram-connected profile | Kofluence creator app; Pixpa portfolio sites | Indian brand marketplaces show no Instagram-synced public creator portfolio on their homepages ([Kofluence](https://www.kofluence.com/); [Hobo.Video](https://hobo.video/), 1 Oct 2026). Pixpa costs ₹200–₹600 a month billed yearly on its current offer (regular prices ₹400–₹1,200) and lists no Instagram-feed feature ([Pixpa pricing](https://www.pixpa.com/pricing), 1 Oct 2026). |
| 2 | Verified insights for brands | Kofluence; Qoruz | Kofluence says its creator app has verified stats. Qoruz sells brands a "Creator Authority Score" and fraud detection; it shows no prices ([Qoruz](https://www.qoruz.com/pricing), 1 Oct 2026). |
| 3 | Schedule posts to Instagram | None with rupee prices verified | Meta's own Business Suite schedules for free and has 40,285 ratings on the Indian App Store ([App Store India](https://apps.apple.com/in/app/meta-business-suite/id514643583), 1 Oct 2026). |
| 4 | Link-in-bio page | SuperProfile (by Cosmofeed); Instamojo Smart Pages; TagMango; Faym; Wishlink | SuperProfile Starter is ₹0 with a 10% fee ([SuperProfile plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro), 2026). Instamojo Smart Pages Basic is ₹0 with a 5% + ₹3 fee ([Instamojo](https://www.instamojo.com/pricing/), 1 Oct 2026). |
| 5 | Templates | Pixpa ("200+ premium templates") | No Indian template marketplace for creator pages was found. |
| 6 | DM automation | Zorcha; ReplyKaro; InstantDM; SuperProfile AutoDM; Kwikzy; LinkPlease | Zorcha: "Free Unlimited Instagram DM Automation" ([Zorcha](https://zorcha.com), 2 Oct 2026). ReplyKaro: "Plans start from ₹99/mo" ([ReplyKaro](https://replykaro.com/pricing), 2 Oct 2026). Vendor blogs put Indian DM tools at ₹99–₹999 a month ([Creator Lane, 27 Jun 2026](https://creatorlanehq.com/blog/best-instagram-dm-automation-tools-india)). |
| 7 | Art Shop | BlinkStore, Qikink, Printrove (print-on-demand); Artflute, Mojarto, MeMeraki (originals) | Artflute takes 40% and the artist pays domestic shipping ([Artflute artist FAQs](https://www.artflute.com/artist-faqs), 2 Oct 2026). Mojarto pays "within 21 working days of confirmation from the buyer" ([Mojarto seller FAQ](https://www.mojarto.com/sellerFaq), 2 Oct 2026). |
| 8 | Live Rooms | TagMango; Exly; Graphy; Artium Academy; Muzigal | Artium claims 45,000+ learners and 400+ teachers ([Artium Academy](https://artiumacademy.com), 2 Oct 2026). TagMango Basic takes 10% ([TagMango pricing](https://tagmango.com/pricing), 2 Oct 2026). |
| 9 | Fan Club | TagMango; Cosmofeed (paid Telegram and WhatsApp groups) | Cosmofeed charged 10% in 2022 ([Entrackr, 18 Nov 2022](https://entrackr.com/2022/11/cosmofeed-helps-creators-monetize-content-more-efficiently/)). |
| 10 | Show & Review | None found | Kyoorius and college fests run challenges and briefs ([Kyoorius](https://www.kyoorius.com/)). No trusted, paid, cross-discipline critique or challenge platform was verified in India [Inference]. |
| 11 | Artist Boards | None found | Only informal substitutes exist: city subreddits (r/pune has a "Scam Alert" flair) and the general review site MouthShut.com. |
| 12 | Tips | Instamojo payment links; Razorpay Payment Pages | Instamojo charges 2% + ₹3 and pays out at T+3 ([Instamojo](https://www.instamojo.com/pricing/), Oct 2026). Razorpay Payment Pages cost 0.2% plus gateway fees and settle at T+1 ([Razorpay](https://razorpay.com/pricing/), Oct 2026). |
| 13 | Digital downloads | SuperProfile; Instamojo; Exly; Graphy | Instamojo's free store plan takes 5% + ₹3 ([Instamojo](https://www.instamojo.com/pricing/), Oct 2026). |
| 14 | Bookings / paid 1:1 | Exly; TagMango | Exly's entry tier takes 10%; Pro is ₹2,500 a month at 6% ([Exly pricing](https://exlyapp.com/pricing), 2 Oct 2026). |
| 15 | Event tickets | BookMyShow; District; Skillbox; SortMyScene; Allevents | BookMyShow listed 34,086 live events in 2025 ([Music Ally, 11 Dec 2025](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/)). Allevents charges $1 per ticket ([Allevents](https://allevents.in/pages/pricing), Oct 2026). No reliable Indian data was found on BookMyShow or District organiser fees. |
| 16 | Hire Artists | Talentrack; IndieFolio; Kofluence; Qoruz; WYLD; Hobo.Video; Tring | Fees and take rates for Kofluence, Qoruz, WYLD and Hobo.Video are not published. |
| 17 | Gigs / job board | Hire4Event (an agency); informal Instagram posts and WhatsApp groups | Hire4Event claims "10,000+ Events Managed" and takes briefs of ₹1 lakh to ₹20 lakh+ ([Hire4Event, archived 8 Jul 2026](https://web.archive.org/web/20260708083739/https://www.hire4event.com/)). |
| 18 | Paid Pro plan | TagMango; Exly; Graphy; SuperProfile | TagMango Pro is ₹5,000 + GST a month plus 5.5%. Graphy starts at ₹24,999 a year plus 10% ([Graphy pricing](https://graphy.com/pricing), 2 Oct 2026). SuperProfile Premium is ₹11,999 a year plus 5%. |

### What the matrix shows: commodity tools, contested fan money, two open gaps

**India first.** Three things are confirmed for Indian artists today. Topmate sells link-in-bio, DM automation, downloads and bookings in rupees. StarClinch runs hiring and a jobs board for performers. YouTube runs memberships, Super Chat, Shopping and brand partnerships in India. Much of the rest does not reach India. Linktree's downloads, bookings and Brand Deals are not available there. Instagram Subscriptions do not list India, and paid Live badges are not confirmed. Discord server subscriptions were US only when last checked. That leaves a gap for **INR- and UPI-native artist commerce**, but Indian tools (Topmate, TagMango, Exly, Cosmofeed, Zorcha) already fill much of it [Inference].

The features fall into three groups.

- **Commodity tools:** link-in-bio, downloads, tips, shops, a Pro plan and the Instagram-native tools (connected profile, scheduling, DM automation). Strong, cheap or free incumbents sell them. The Instagram tools look rare in the matrix only because artist networks skip them. In India, Zorcha, ReplyKaro, InstantDM and SuperProfile all sell DM automation, and Zorcha's is free ([Zorcha](https://zorcha.com)).
- **Contested by Instagram and YouTube natively:** Live, fan subscriptions, gifts and brand hiring already sit inside the two platforms Indian artists use most.
- **Relatively open:** no platform runs Artist Boards, and Show & Review exists only in partial forms (Topmate's paid "Priority DM" in India; ArtStation's judged challenges outside India).

A template marketplace for creator pages has no precedent, in India or elsewhere, and demand for it is unproven [Inference].

**Outside India (background only).** No Indian product built for paid critique was found, so the only proof that artists pay for critique is foreign: Skeb's "Advice" genre in Japan, Stage 32 coverage from $49, Groover's €2 curator pitches with "over 4 million personalized reviews", and Notefolio's paid feedback in Korea ([Skeb About](https://skeb.jp/about); [Stage 32](https://www.stage32.com/scriptservices); [MBW, 13 Feb 2024](https://www.musicbusinessworldwide.com/music-promotion-startup-groover-raises-8m-in-series-a-funding/)).

### Notes on non-obvious marks

**Indian competitors and platforms in India**

1. **Topmate, a correction:** the first competitor pass marked DM automation ✕. Two later passes found "Instagram Auto DM" on Topmate's pricing page, so it is ✓ ([topmate.io/pricing](https://topmate.io/pricing)). Show & Review △ through "Priority DM" (fans pay to ask a question). Pro ✕ because Topmate is commission-only (10% on own-link sales, 20% on marketplace sales).
2. **StarClinch:** Hire ✓ through escrow-style booking. Gigs ✓ through an "Artist Jobs" board plus "Post Your Requirement" (an earlier pass rated it △; two later passes confirmed the board). Link-in-bio △ through artist websites. Bookings △ because they are event bookings, not fan 1:1 calls ([StarClinch](https://starclinch.com); [Siliconindia, 23 Dec 2021](https://www.siliconindia.com/startup/startup-funding/starclinch-raises-seed-round-from-artha-venture-fund-nitish-mittersain-nwid-30837.html)). The "escrow-style" wording was recorded on 1 Oct 2026 but was not on the pages opened on 2 Oct 2026.
3. **Instagram Hire Artists and Gigs ✓ (India):** the creator marketplace lets brands filter creators by "demographics of their engaged audience" and "publish discoverable projects" ([TechCrunch, 11 Apr 2023](https://techcrunch.com/2023/04/11/instagram-adds-new-features-to-its-creator-marketplace-expands-access-to-brand-agencies/)). India was added on 21 Feb 2024, by invitation ([TechCrunch](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/); [afaqs, Feb 2024](https://www.afaqs.com/news/social-media/instagram-creator-marketplace-launches-in-india)). Project briefs in India are unverified. No Indian data was found on how many Indian creators or brands are enrolled.
4. **Instagram Pro plan ✓ (India):** Meta Verified costs ₹699/month on mobile in India ([Meta, 7 Jun 2023](https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/)). Consumer Instagram Plus is ₹99/month in India ([Best Media Info, 16 Sep 2026](https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837)). TechCrunch reports Meta One creator plans at $14.99 to $499/month ([TechCrunch, 15 Sep 2026](https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/)).
5. **Instagram Live, Fan Club and Tips (IN ?):** Subscriptions launched in 10 countries and India was not listed ([TechCrunch, 24 Jul 2023](https://techcrunch.com/2023/07/24/instagram-launching-creator-subscriptions-australia-canada-uk-and-more/)). Live Badges "may not be available in your region" ([Instagram](https://creators.instagram.com/earn-money/badges)). For Gifts, a secondary source says India is eligible (500 followers, age 18+, a professional account), with payout in US dollars and no UPI ([WebHippo, 29 Jul 2026](https://webhippo.in/blog/instagram-monetization-india)). This was not confirmed on a Meta page.
6. **Instagram link-in-bio ✓:** up to 5 bio links ([TechCrunch, 18 Apr 2023](https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/)). They are plain links with no checkout, so an earlier pass rated this △.
7. **Instagram templates ✓:** free Reels templates and Edits app templates; there is no paid template marketplace ([TechCrunch, 18 Jul 2023](https://techcrunch.com/2023/07/18/instagram-making-easier-create-reels-using-templates/); [Meta, 22 Apr 2025](https://about.fb.com/news/2025/04/introducing-edits-streamlined-video-creation-app/)).
8. **Instagram DM automation △:** comment-to-DM works only through the API's Private Replies: one DM per commenter, within 7 days ([Meta developers](https://developers.facebook.com/docs/instagram-platform/private-replies)). **This same limit applies to Underdawg.**
9. **Instagram shop △:** the Shop tab was removed in Jan 2023 and live shopping ended on 16 Mar 2023; India kept website-redirect shops ([TechCrunch, 14 Feb 2023](https://techcrunch.com/2023/02/14/instagram-is-killing-live-shopping-in-march-will-focus-on-ads-instead/); [TechCrunch, 27 Apr 2023](https://techcrunch.com/2023/04/27/instagram-facebook-force-checkout-experience-shops-soon/)).
10. **Instagram bookings and tickets △:** profile buttons (Book, Reserve, Get Tickets) hand off to partners such as Acuity and Eventbrite ([TechCrunch, 8 May 2018](https://techcrunch.com/2018/05/08/instagram-action-buttons/); current partner list unverified).
11. **YouTube (India):** Creator Partnerships run in 23 countries including India ([Google](https://support.google.com/youtube/answer/9385307)). Channel memberships in India start at ₹59 a month, and the creator gets 70% of net ([YouTube Help, India pricing, May 2025](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN)). No Indian data was found on how many fans buy memberships. YouTube allows up to 14 channel links ([Google](https://support.google.com/youtube/answer/2657964)). Scheduling △ because YouTube schedules only its own uploads. Gigs ✕ because the self-service FameBit marketplace closed in 2020 ([TechCrunch, 16 Jun 2020](https://techcrunch.com/2020/06/16/youtubes-famebit-rebrands-as-youtube-brandconnect-shuts-down-its-self-service-program/)).
12. **Artist Boards ✕ everywhere.** In India the nearest substitutes are informal. The r/pune subreddit has a "Scam Alert" flair with required fields, used for a 2025 warning to videographers and photographers ([r/pune, archived 7 Jun 2025](https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/)). MouthShut.com, a general Indian review site, says it will not reveal a reviewer's identity unless a court orders it, and it challenged the IT Rules 2011 in the Supreme Court in 2013 ([Wikipedia: MouthShut.com](https://en.wikipedia.org/wiki/MouthShut.com)). That shows the legal pressure a review board faces in India. Outside India, the nearest analogues are FYPM (creators review brands and share pay data) ([fypm.vip](https://www.fypm.vip)), a small Artists-Beware group on DeviantArt with 379 members ([DeviantArt](https://www.deviantart.com/artists-beware)) and Writer Beware for authors ([SFWA](https://www.sfwa.org/other-resources/for-authors/writer-beware/)). Meta's new Forum app for Facebook Groups is US only (29 Sep 2026) ([Meta](https://about.fb.com/news/2026/09/find-community-forum-dedicated-app-facebook-groups/)).

**Outside India (background only)**

13. **Linktree:** downloads and bookings are native, but India is not among the 35 eligible countries; Brand Deals and Shops are US only ([eligibility, updated ~30 Sep 2026](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features)). Linktree has themes only, not a template marketplace ([help](https://linktr.ee/help/en/articles/5434137-choose-a-theme-for-your-linktree)).
14. **Behance:** scheduling △ because Pro schedules publishing on Behance only ([Behance Pro](https://www.behance.net/pro)). Live ✕ because livestreaming ended on 16 Dec 2024 ([Behance help](https://help.behance.net/hc/en-us/articles/30260603621787-Learn-More-Sunsetting-Livestreaming-on-Behance)). Fan Club △ because paid subscriptions launched in Oct 2021 but their status is unclear ([TechCrunch, 26 Oct 2021](https://techcrunch.com/2021/10/26/adobes-behance-adds-support-for-nfts-and-paid-subscriptions/)).
15. **Dribbble, Cara, ArtStation:** Dribbble "holds project funds while you complete the work" ([help](https://help.dribbble.com/articles/11083653)). Cara has a Jobs Board but no payments or plans ([About](https://blog.cara.app/about)). ArtStation sells Prints and runs Challenges judged by industry professionals ([About](https://www.artstation.com/about)).
16. **Artfol:** shop, commissions, tips, a pay link and sponsored brand partnerships ([artfol.app](https://artfol.app)). No fees or plans were found, so downloads and Pro are "?".
17. **SoundCloud:** Fan Support tips at "zero commission" ([SoundCloud, 30 Oct 2025](https://soundcloud.com/playbook-articles/soundcloud-unveils-all-in-one-artist-subscription-more-ways-to-earn-all-in-one-place)). Downloads △ because direct purchases are a beta for about 200 US Artist Pro creators ([SoundCloud, 26 Aug 2026](https://soundcloud.com/playbook-articles/soundcloud-introduces-direct-music-purchases-with-zero-commission)). Tickets △ (Artist Pro only, through Universe/Ticketmaster) ([SoundCloud, 24 Feb 2025](https://soundcloud.com/playbook-articles/soundcloud-ticketmaster-universe-empowering-artists-to-easily-create-ticket-and-share-their-live-shows)).
18. **Bandcamp:** Live ✓ (ticketed Bandcamp Live); tickets △ because they cover streams only ([Bandcamp](https://bandcamp.com/artists)).
19. **Beacons:** verified stats ✓ through media kits built "from your connected social accounts" ([help](https://help.beacons.ai/en/categories/1088065-brand-collabs-%F0%9F%92%B8)); a profile that shows Instagram posts was not verified (△).
20. **Patreon:** DM automation △ through Autopilot discount emails ([TechCrunch, 17 Sep 2024](https://techcrunch.com/2024/09/17/patreon-launches-features-to-automate-away-creators-administrative-workload-and-help-them-make-more-money/)). Tickets △ through its purchase of Moment ([TechCrunch, 17 Oct 2023](https://techcrunch.com/2023/10/17/patreon-acquires-livestream-ticketed-events-startup-moment/)). Pro ✕ because Patreon takes a flat 10% from new creators instead ([pricing](https://www.patreon.com/pricing)). Patreon's terms and availability for Indian creators were not verified.

CHART: feature-coverage — Artist Boards are offered by 0 of 14 competitors; Show & Review only partly by 2
Type: stacked bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Instagram-connected profile | 2 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Instagram-connected profile | 2 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Verified insights / ER | 3 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Verified insights / ER | 6 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Schedule to Instagram | 2 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Schedule to Instagram | 2 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Link-in-bio | 5 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Link-in-bio | 8 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Templates & marketplace | 1 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Templates & marketplace | 4 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| DM automation | 3 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| DM automation | 2 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Art Shop | 5 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Art Shop | 4 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Live Rooms | 4 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Live Rooms | 2 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Fan Club | 3 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Fan Club | 4 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Show & Review | 0 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Show & Review | 2 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Artist Boards | 0 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Artist Boards | 0 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Tips | 5 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Tips | 0 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Digital downloads | 7 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Digital downloads | 2 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Bookings / 1:1 | 2 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Bookings / 1:1 | 4 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Event tickets | 0 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Event tickets | 6 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Hire Artists | 5 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Hire Artists | 5 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Gigs | 6 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Gigs | 0 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |
| Pro plan | 8 | competitors (of 14) | Strong (✓) | 2026-10-01 | Section 15 matrix, this report |
| Pro plan | 0 | competitors (of 14) | Partial (△) | 2026-10-01 | Section 15 matrix, this report |

## 16. Direct competitors

The closest competitors were chosen by overlap with Underdawg's planned product, not by size. **Indian money and hiring tools come first** (Topmate, StarClinch, TagMango, Talentrack and IndieFolio) because they serve the launch market. Companies from outside India follow as background: creator toolkits (Linktree, Beacons, Planoly Creator Store, Passes) and artist networks (Artfol, Cara, Behance, BandLab). Most user and funding numbers below are the company's own claims and are labelled. Where nothing reliable was found, the profile says so.

**Indian direct competitors**

| # | Company | City | Launch | Public scale (label) | Main overlap with Underdawg | Threat [Inference] |
|---|---|---|---|---|---|---|
| 1 | Topmate | Bengaluru | 2021 [Reported] | "1mn+ professionals" [Company claim] | Bookings, downloads, webinars, Priority DM, Instagram Auto DM | High |
| 2 | StarClinch | New Delhi | 2015 | 17,000+ artists (seen 1 Oct 2026) or "10K+" (seen 2 Oct 2026) [Company claim]; FY25 revenue ₹2.4 crore [Inc42 Datalabs] | Hire Artists, Gigs, escrow | High (performers) |
| 3 | TagMango (+ Cosmofeed, Exly) | Kolkata | 2019 [Reported] | 10,000+ creators [Company claim]; FY25 revenue ₹20.9 crore [Inc42 Datalabs] | Fan Club, Live Rooms, downloads | Medium |
| 4 | Talentrack and IndieFolio | New Delhi; Mumbai | 2015 | 50K+ and 70,000+ talent [Company claims]; Talentrack FY25 revenue ₹36.4 crore [Inc42 Datalabs] | Hire Artists | Medium-High |

**Outside India (background only)**

| # | Company | Country | Launch | Public scale (label) | Main overlap with Underdawg | Threat [Inference] |
|---|---|---|---|---|---|---|
| 5 | Linktree | Australia/USA | 2016 | "70M+ users" [Company claim] | Profile, scheduling, DM automation, bookings, downloads | High (global) |
| 6 | Beacons | USA | 2019 | 7M+ creators [Company claim] | Media kit (verified stats), DMs, store | Medium-High |
| 7 | Planoly Creator Store | n/a | Snipfeed seed 2021 | 8M+ small businesses and creators [Company claim] | Closest tool bundle | Medium-High |
| 8 | Passes | USA | 2022 | 10,000+ creators [Company claim] | Fan Club, paid DMs, 1:1, live, merch | Medium |
| 9 | Artfol | n/a (Artfol Ltd) | 2021 (iOS) | "half a million artists" [Company claim] | Artists-only network with money tools | High (concept) |
| 10 | Cara | Cara Project, Inc. | 2022–2023 | "over a million people" [Company claim] | Artists-only audience | Medium |
| 11 | Behance | USA (Adobe) | 2005/2006 | "over 65 million" members [Company claim] | Portfolio, hiring with payments, Pro | Medium-High |
| 12 | BandLab | Singapore | 2015 | 100M+ registered users | Gigs, tips, Pro, verification (music) | Medium-High (music) |

Profile rows use short labels: **Learn** = what Underdawg can learn; **Do NOT copy** = what Underdawg should not copy; **Model / money** = business model and monetisation.

### 16.1 Topmate: six Underdawg money modules in one Indian product

| Field | Detail |
|---|---|
| Basics | Bengaluru (Kavalry Technologies; Tracxn lists a San Francisco HQ) · [topmate.io](https://topmate.io) · 2021 [Reported] · experts, coaches and creators of every kind, not artists only. Its creator categories are Career, Data & AI, Study Abroad, Software, HR, Finance, Startup Mentor, Astrology, Marketing, Product & Design and Others. Product & Design is the only creative one. |
| Core proposition | "Make money from your content. Sell products, host sessions, and grow your business — all from a single link." |
| Major features | 1:1 sessions, webinars, courses, digital products, "Priority DM" (fans pay to message), testimonials, Instagram Auto DM, WhatsApp scheduling ([topmate.io](https://topmate.io); [pricing](https://topmate.io/pricing)). |
| Discovery | Mostly the creator's own audience. A Topmate marketplace also exists; sales made there carry a 20% fee. |
| Model / money | Commission only, no subscription: **10% on own-link sales, 20% on marketplace sales**; custom pricing for creators earning "₹10L+ / $20k+" a month ([pricing](https://topmate.io/pricing); [terms](https://topmate.io/terms)) [Verified]. A third-party comparison adds about 2.9% for the payment gateway ([Peerseek, 24 Jul 2026](https://peerseek.io/blogs/creator-platform-fees-india-compared)). A flat ₹299 equals Topmate's 10% at ₹2,990 of monthly sales [arithmetic in the notes]. |
| Funding | Titan Capital logo and 20+ angels on the site; listed in India Quotient's portfolio ([India Quotient](https://indiaquotient.in/portfolio)). Round sizes are not on company pages. Tracxn lists $1.13M over 4 rounds, but its round detail looked inconsistent (low to medium confidence) ([Tracxn](https://tracxn.com/d/companies/topmate/__0feQnNqxu633GVIOYt_LQu9YkfyWhOqrZyDJy8IiSew/funding-and-investors)). |
| Users and earnings | "1mn+ professionals" and "100k+ reviews" ([About](https://topmate.io/about), seen 1 Oct 2026) [Company claim]. On 2 Oct 2026 the About page showed only "20+ angels", so the count could not be checked again. Topmate creators earned ₹1,79,87,317 (about ₹1.80 crore) in September 2023, of which 1:1 calls were ₹70.5 lakh, and 12.1k new creators joined that month ([co-founder's LinkedIn post, about Oct 2023](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O)) [Company claim]. That implies small sums per creator [Derived in the notes]. No reliable Indian data was found on how earnings are spread across Topmate creators. |
| Strengths | Free to start; many money tools in one Indian product; rupee checkout [Inference]. |
| Weaknesses | Not built for artists; coaching-oriented; no artist discovery, verified stats, print-on-demand, gigs, brand escrow or peer boards [Inference]. UPI support was not confirmed. |
| Artist complaints | No artist-specific complaints found. Trustpilot removed Topmate's TrustScore after removing "fake reviews" ([Trustpilot](https://www.trustpilot.com/review/topmate.io)) [Reported]. |
| Learn | A free, commission-only start removes the payment barrier for beginners. |
| Do NOT copy | A 20% marketplace fee on emerging artists; weak review integrity [Inference]. |

### 16.2 StarClinch: India's incumbent for booking performers

| Field | Detail |
|---|---|
| Basics | New Delhi (VINSM Globe Pvt Ltd) · [starclinch.com](https://starclinch.com) · 2015 · event buyers (corporate, wedding, college) and performers in 14–15 categories, from singers and DJs to comedians and anchors. |
| Core proposition | "India's Leading Artist Booking Platform for All Events and Celebrations". |
| Major features | "Express Booking"; "Post Your Requirement"; an "Artist Jobs" board; the artist-side "Artist Cockpit" app; artist websites; escrow-style payments released "after the talent buyer confirms that the artist served as agreed" ([Siliconindia, 23 Dec 2021](https://www.siliconindia.com/startup/startup-funding/starclinch-raises-seed-round-from-artha-venture-fund-nitish-mittersain-nwid-30837.html)). |
| Discovery | Buyers browse by category and city; it serves the buyer, not the artist's audience [Inference]. |
| Model / money | **Fee of 15% of the artist's remuneration**; **₹7.5 lakh penalty for off-platform deals**; the terms also say "StarClinch does not guarantee you any work" ([terms of use](https://starclinch.com/terms-of-use)) [Verified]. |
| Funding and revenue | ₹1.75 crore seed in Dec 2021 ([Siliconindia](https://www.siliconindia.com/startup/startup-funding/starclinch-raises-seed-round-from-artha-venture-fund-nitish-mittersain-nwid-30837.html)); Inc42 records the same round as $233,120. FY25 revenue ₹2.4 crore, down 10.2% from ₹2.7 crore in FY24; 38 employees ([Inc42, 2 Oct 2026](https://inc42.com/company/starclinch/)) [Inc42 Datalabs]. |
| Users | The two checks differ. "17,000+ artists across 14 categories and 450+ cities" was recorded on 1 Oct 2026; the same page showed "10K+" on 2 Oct 2026 ([our story](https://starclinch.com/our-story)) [Company claim]. It claimed 15,000+ in Dec 2021. The artist app has only 1K+ Play Store downloads (updated 26 Aug 2026) and 6 Indian iOS ratings ([Apple lookup](https://itunes.apple.com/search?term=starclinch&entity=software&country=in)). No Indian platform publishes how many of its registered artists actually got booked. |
| What its own guide says artists earn | Cafés and lounges ₹3,000–15,000 a gig; college fests ₹5,000–30,000; corporate events ₹20,000–80,000 ([StarClinch gig guide, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/)) [Company blog; estimates]. |
| Strengths | India-native; jobs board, booking and escrow in one marketplace. |
| Weaknesses | Weak artist-app traction; no fan, Instagram or audience tools; harsh anti-bypass rules. Revenue is small after ten years. At a 15% fee, ₹2.4 crore implies about ₹16 crore of bookings a year if all revenue were commission [Inference in the notes]. |
| Artist complaints | No reliable public data found. |
| Learn | Run Hire Artists and Gigs as **one marketplace with two entry points**, with escrow, as StarClinch does [Inference]. |
| Do NOT copy | Large penalties for contact outside the platform. Outside India, Dribbble's similar rule led to bans and a public backlash ([TechCrunch, 4 Aug 2025](https://techcrunch.com/2025/08/04/a-top-designer-was-banned-from-dribbble-now-hes-building-his-own-competitor/)). |

### 16.3 TagMango, with Cosmofeed and Exly: India's paid-community stack

| Field | Detail |
|---|---|
| Basics | Kolkata · [tagmango.com](https://tagmango.com) · 2019 [Reported] · coaches, educators and creators. |
| Core proposition | Help creators earn from courses, communities and live sessions. |
| Major features | Courses, gamified communities, live workshops, memberships, 1:1 booking, white-label branded apps, creator collaborations. |
| Discovery | None beyond the creator's own audience [Inference]. |
| Model / money | Basic: no fixed fee, 10% commission, 200 students. Pro: ₹5,000 + GST a month plus 5.5%. Advanced: ₹15,000 + GST a month plus 3.5%. Ultimate: ₹30,000 + GST a month, no commission ([TagMango pricing](https://tagmango.com/pricing), 2 Oct 2026). |
| Funding and revenue | $750K raised [Reported]. FY25 revenue ₹20.9 crore, up 162.9% from ₹8.0 crore ([Inc42](https://inc42.com/company/tagmango/)) [Inc42 Datalabs]. |
| Users | Its site claims "10,000+ Creators" and "₹1,000 Cr+ yearly creator earnings". Its Y Combinator profile claims "5,000+ creators" earning "over $100 million annually" ([Y Combinator](https://www.ycombinator.com/companies/tagmango)) [Company claims; the two differ]. iOS 4.39 from 241 Indian ratings. |
| Peers | **Cosmofeed, now SuperProfile** (Gurugram, 2021): $1.5M seed; 50K users, 25% of them paid, in Mar 2022 ([Entrackr, 16 Mar 2022](https://entrackr.com/2022/03/cosmofeed-raises-1-5-mn-in-seed-round/)); a later report gives 3,000 creators in Nov 2022 ([Entrackr, 18 Nov 2022](https://entrackr.com/2022/11/cosmofeed-helps-creators-monetize-content-more-efficiently/)). FY25 revenue ₹11.7 crore ([Inc42](https://inc42.com/company/cosmofeed/)) [Inc42 Datalabs]. SuperProfile plans: Starter ₹0 at 10%, Premium ₹11,999 a year at 5%, Pro ₹49,999 a year ([plans](https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro)); a competitor's blog instead reports ₹99 for the first month, then ₹499 a month ([Peerseek, 24 Jul 2026](https://peerseek.io/blogs/creator-platform-fees-india-compared)). **Exly** (YC): $6.2M raised; 10,000+ customers in Mar 2024 ([Entrackr](https://entrackr.com/2024/03/y-combinator-backed-exly-raises-6-2-mn-led-by-chiratae/)), while its site says "100,000+ creators"; UPI checkout ([exlyapp.com](https://exlyapp.com)); Pro ₹2,500 a month at 6%, Premium ₹9,000 a month at 3% ([Exly pricing](https://exlyapp.com/pricing)). **Graphy** (Unacademy): from ₹24,999 a year plus 10% per sale ([Graphy pricing](https://graphy.com/pricing)). |
| Strengths | UPI-native; proven paid communities and live sessions for Indian educators. |
| Weaknesses | Built for teaching, not for artist discovery or brand work. The fixed fees are far above ₹299 a month. A small number of high-earning coaches fund these tools [Inference in the notes]. |
| Artist complaints | Payout trust: three Indian App Store reviews of Cosmofeed allege blocked withdrawals, e.g. "when withdrawal time they suspend my account" (2 Mar 2026) ([App Store India](https://apps.apple.com/in/app/id1592830857)). One venue only; these are user allegations. A secondary source also reports payout delays at SuperProfile ([CreatorLane, Jul 2026](https://creatorlanehq.com/learn/superprofile)). |
| Learn | Paid communities and live sessions do sell in India when they teach a skill. |
| Do NOT copy | Payout friction and KYC at withdrawal time. Do KYC up front and publish payout timelines. |

### 16.4 Talentrack and IndieFolio: brands pay, so these grew as managed services

| Field | Detail |
|---|---|
| Basics | **Talentrack:** New Delhi · [talentrack.in](https://www.talentrack.in) · 2015 · actors, models, voice artists and influencers. **IndieFolio:** Mumbai · [home.indiefolio.com](https://home.indiefolio.com) · 2015 · designers, illustrators and animators. |
| Core proposition | Talentrack, once a casting registry, now calls itself "India's Leading Content Marketplace". IndieFolio now sells "Access India's top UX/UI talent on demand". It is a managed service with "50+ services" and is no longer an open portfolio network. |
| Major features | Brand project briefs, curated shortlists, managed delivery. Talentrack lists brand budgets from "Up to ₹2L" to "₹10L+" and clients such as Realme, Haier and Kent. |
| Discovery | A managed team matches talent to briefs. Artists do not gain a public audience [Inference]. |
| Model / money | Brands pay for managed projects. |
| Funding | IndieFolio is bootstrapped [Reported] ([Inc42](https://inc42.com/company/indiefolio/)). Talentrack: No reliable public data found. |
| Revenue | Talentrack FY25 ₹36.4 crore, up 17.6% from ₹30.9 crore ([Inc42](https://inc42.com/company/talentrack/)); IndieFolio FY24 ₹7.2 crore ([Inc42](https://inc42.com/company/indiefolio/)) [Inc42 Datalabs]. |
| Users | Talentrack: "50K+ artists, experts, and influencers", "20K+ curated Influencers", "3,000+ voiceover artists" [Company claim]. IndieFolio: "70,000+ Talent Pool" [Company claim]. |
| Peers on the brand side | Qoruz: FY25 revenue ₹56.4 crore ([Inc42](https://inc42.com/company/qoruz/)). Kofluence: FY25 revenue ₹52.5 crore, "750,000+ Influencers" ([Inc42](https://inc42.com/company/kofluence/); [Kofluence](https://www.kofluence.com)) [Inc42 Datalabs; company claim]. |
| Strengths | Real brand demand and real revenue. |
| Weaknesses | Agency model; not a community; little visibility for the artist. |
| Artist complaints | No reliable public data found. |
| Learn | **The demand side pays more reliably than artists do.** Talentrack's move from talent network to content marketplace supports charging brands for Hire Artists [Inference]. |
| Do NOT copy | A fully managed agency model that does not scale artist discovery [Inference]. |

**Outside India (background only): profiles 16.5 to 16.12.** These are shorter. Each one records what the product ships, whether it works in India, and what Underdawg should learn or avoid.

### 16.5 Linktree: the default bio link already ships most of the Instagram layer, but not in India

| Field | Detail |
|---|---|
| Basics | Australia/USA · [linktr.ee](https://linktr.ee) · 2016 · all creators and businesses. One link for everything, now with scheduling, auto-posting, monetisation and analytics ([About](https://linktr.ee/s/about)). |
| India status | **Downloads, courses and bookings are sold in 35 listed countries, and India is not one of them.** Shops, sponsored links, Rewards and Brand Deals are US only ([eligibility, ~30 Sep 2026](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features)). Linktree was unreachable across India for days in Aug 2025. India is its "fifth-largest market by traffic", with about 7.3 million visits in July 2025 ([TechCrunch, 18 Aug 2025](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)). The site loaded from an Indian network on 1 Oct 2026. |
| India prices | Free ₹0; Starter ₹360/month (₹220 billed yearly) with "9% fees" on digital products; Pro ₹650 (₹440 billed yearly); Premium ₹1,450 (₹1,250 billed yearly) with "0% fees" ([pricing, checked from India](https://linktr.ee/s/pricing/)). |
| What it ships | Instagram grid with clickable posts ([help](https://linktr.ee/help/en/articles/10143051-replicate-your-instagram-grid-on-linktree-with-clickable-posts)); Instagram comment-to-DM auto-reply with monthly caps of 1,000 (Free), 1,500, 2,500 and unlimited ([help](https://linktr.ee/help/en/articles/9758234-use-instagram-auto-reply-to-automatically-share-links-with-your-audience)); auto-posting to Instagram ([help](https://linktr.ee/help/en/articles/9885339-plan-and-schedule-social-media-posts-using-social-planner)); a US-only Brand Deals tab showing "engagement rates and audience reach" ([help](https://linktr.ee/help/en/articles/12135302-create-your-brand-deals-profile)). |
| Scale | "70M+ users worldwide" [Company claim]. Indian App Store: 4.67 from 1,426 ratings ([App Store India](https://apps.apple.com/in/app/linktree-link-in-bio-creator/id1593515263), 1 Oct 2026). |
| Weaknesses | Not artist-specific; no discovery; money features and brand deals exclude India. |
| Learn | Free DM automation must be generous. Instagram grid import is table stakes. |
| Do NOT copy | US-only rollouts that leave emerging markets with a hollow free product. Closing acquired products and deleting user data (Bento, 13 Feb 2026) ([AlternativeTo, 21 Dec 2025](https://alternativeto.net/news/2025/12/bento-to-shut-down-in-2026-as-linktree-takes-over-and-offers-migration-path/)). |

### 16.6 Beacons: the media kit is today's version of "verified stats"

| Field | Detail |
|---|---|
| Basics | USA · [beacons.ai](https://beacons.ai) · 2019 (Y Combinator S19) · all creators. An AI-powered all-in-one creator toolkit ([help centre](https://help.beacons.ai)). |
| India status | No UPI was seen; payments run on Stripe and PayPal ([help](https://help.beacons.ai/en/categories/1087105-products-%F0%9F%92%B0)). Prices are in dollars: Free (9% seller fee); Creator $10/month (9%); Creator Plus $30 (0%); Creator Max $100/month ([pricing](https://beacons.ai/i/pricing)). No Indian usage data was found. |
| What it ships | Link-in-bio, store, email; "Smart Reply" Instagram DMs ([help](https://help.beacons.ai/en/categories/1466945-smart-reply-%F0%9F%8E%A9)); media kits built "from your connected social accounts"; AI brand outreach; a Brand Deal Profile ([help](https://help.beacons.ai/en/categories/1088065-brand-collabs-%F0%9F%92%B8)). |
| Scale | 7M+ creators (PR Newswire, 8 Apr 2025; exact URL not recorded in the notes) [Company claim]. |
| Complaints | App Store reviews describe social-account connection that "repeatedly froze or failed" ([App Store](https://apps.apple.com/us/app/id6444589346)). Trustpilot 2.0 (42 reviews) cites ignored support and pending payouts ([Trustpilot](https://www.trustpilot.com/review/beacons.ai)) [Reported]. |
| Learn | Build the brand view from connected accounts, as Beacons' media kit does. |
| Do NOT copy | An unreliable social-account connection. It is the top cause of 1-star reviews for Instagram-dependent tools. India shows the same: a 1-star review of Hoopr reads "You cannot connect your insta" ([Apple lookup](https://itunes.apple.com/search?term=hoopr&entity=software&country=in)). |

### 16.7 Planoly Creator Store: the closest tool bundle, with no artist community

| Field | Detail |
|---|---|
| Basics | Country not recorded · [planoly.com/creator-store](https://www.planoly.com/creator-store?from=snipfeed) · Snipfeed (seed 2021) now redirects here · small businesses and creators. |
| India status | The app is on the Indian App Store: 4.61 from 382 Indian ratings ([App Store](https://apps.apple.com/us/app/planoly-social-media-planner/id1014568284)). Prices are in dollars: Free (mobile only, 10 uploads a month); paid plans at $14, $24 and $47 a month ([pricing](https://www.planoly.com/pricing)). Print-on-demand runs through Printful. |
| What it ships | Visual scheduling; link-in-bio store; print-on-demand; 1:1 calls; memberships; automatic DMs ([Planoly](https://www.planoly.com/creator-store?from=snipfeed)). |
| Scale | "8M+ small businesses and creators" [Company claim]. |
| Learn | The tool bundle alone is already a product. Underdawg cannot win on the bundle [Inference]. |
| Do NOT copy | Generic small-business positioning that serves no group deeply [Inference]. |

### 16.8 Passes: fan money for big names, with a trust-and-safety warning

| Field | Detail |
|---|---|
| Basics | USA · [passes.com](https://passes.com) · 2022 · creators, skewed towards celebrities. Memberships, paid DMs, 1:1 calls, livestreams and merch for a 10% fee. |
| India status | No Indian data was found. |
| Scale and funding | 10,000+ creators [Company claim]; $40M Series A [Reported]. |
| Complaints | Passes was sued in Feb 2025 over alleged distribution of child sexual abuse material; the company calls the claim meritless ([TechCrunch, 3 Mar 2025](https://techcrunch.com/2025/03/03/creator-monetization-platform-passes-sued-over-alleged-distribution-of-csam/)). |
| Learn | Paid DMs and calls work for creators with real fans. |
| Do NOT copy | Weak moderation of paid one-to-one content, especially where minors may be present [Inference]. |

### 16.9 Artfol: the closest artists-only network with money tools, but small

| Field | Detail |
|---|---|
| Basics | Artfol Ltd · [artfol.app](https://artfol.app) · iOS launch 3 Apr 2021 · visual artists. An AI-free social network; AI-made content "is not permitted" ([guidelines](https://artfol.app/legal/content-guidelines)). |
| India status | No Indian data was found. |
| What it ships | "Over 10,000 art challenges"; a user-controlled algorithm; shop; commissions; tips; a pay link; sponsored brand partnerships. Fees and plans: No reliable public data found. |
| Scale | "Join half a million artists" [Company claim]. Funding: No reliable public data found. |
| Weaknesses | Small; no Instagram layer, verified stats, DM automation, fan-club tiers, brand escrow or boards were seen. |
| Learn | Challenges give unknown artists a reason to post and a chance to be seen. |
| Do NOT copy | Relying on artist-to-artist activity alone; challenges do not bring buyers [Inference]. |

### 16.10 Cara: artists flock in during trust shocks, but nobody earns

| Field | Detail |
|---|---|
| Basics | Cara Project, Inc. · [cara.app](https://cara.app) · founded late 2022; iOS Oct 2023 · artists. "A social and portfolio platform for artists and people who love art" that filters out generative AI ([About](https://cara.app/about)). |
| India status | No Indian data was found. |
| Model / money | Volunteer-run and bootstrapped; "Cara Coffee" supporter tiers at $5–$50 a month. **There is no way for artists to earn on Cara** ([About](https://blog.cara.app/about)). |
| Scale | **"Grown from 40,000 to 650,000 users within the last week"** after Meta's AI-training notice ([TechCrunch, 6 Jun 2024](https://techcrunch.com/2024/06/06/a-social-app-for-creatives-cara-grew-from-40k-to-650k-users-in-a-week-because-artists-are-fed-up-with-metas-ai-policies/)); "over a million people using Cara" ([FAQ](https://blog.cara.app/faq)) [Company claim]. |
| Weaknesses | The surge produced a **$96,280 hosting bill for one week**. In 2026, scrapers took 12M images and 9M URLs despite its protections ([Cara blog, 27 Aug 2026](https://blog.cara.app/blog/scraping-legal-fund-faq)). |
| Complaints | Artists post "for... other artists" ([David Revoy, 3 Jun 2024](https://www.davidrevoy.com/article1032/a-critique-of-caraapp-the-no-ai-instagram-and-artstation-copycat-child)); "Other creatives aren't my clients" ([Creative Boom](https://www.creativeboom.com/resources/everyones-talking-about-cara-but-is-it-any-good/)). Two sources. |
| Learn | Trust shocks at big platforms move artists fast. A human-made stance attracts them. |
| Do NOT copy | Usage-priced hosting without spending caps; no revenue model; an audience of artists with no buyers, brands or curators. |

### 16.11 Behance: the portfolio-plus-hiring incumbent, with high fees and scam complaints

| Field | Detail |
|---|---|
| Basics | USA (Adobe) · [behance.net](https://www.behance.net) · 2005 per Wikipedia, 2006 per its About page · designers, illustrators, 3D artists, photographers and hirers. |
| India status | Pro is shown in India as ₹797.68/month ([Pro](https://www.behance.net/pro)). India payouts go through PayPal ([country FAQ](https://help.behance.net/hc/en-us/articles/13824610641179-FAQ-Why-isn-t-my-country-supported)). |
| What it ships | Portfolios; freelance services with payments; job board; Pro with 0% fees, Boost, analytics and scheduled publishing; Recruiter Pro at $399/month ([help](https://help.behance.net/hc/en-us/articles/51497046899227-Behance-Recruiter-Pro-Overview)). Free-tier transactions carry "15-30% platform fees" (another FAQ conflicts) ([fees FAQ](https://help.behance.net/hc/en-us/articles/10770324288923-FAQ-What-are-the-fees)). |
| Scale | "Over 65 million artists" ([Year in Review, 18 Dec 2025](https://www.behance.net/blog/year-in-review-2025)) [Company claim]. |
| Complaints | Trustpilot 1.6/5 (46 reviews, small sample): a $500 scam where the platform "does nothing"; job posts paying "$5-$10 per hour" ([Trustpilot](https://www.trustpilot.com/review/www.behance.net)); fake-recruiter scams ([DIYPhotography](https://www.diyphotography.net/beware-of-this-elaborate-scam-targeting-behance-users/)). |
| Learn | Fees that fall to 0% with a subscription; a hirer subscription; an "available for work" flag for hirer search; merit-based galleries. |
| Do NOT copy | A 15–30% take on emerging artists; launching live features without an audience to sustain them; job boards without client vetting. |

### 16.12 BandLab: the music group that could assemble an Underdawg-like stack fastest

| Field | Detail |
|---|---|
| Basics | Singapore · [bandlab.com](https://www.bandlab.com) · Nov 2015 · musicians and producers. A "social music platform" with a free studio, a feed and distribution. |
| India status | Rupee pricing on the Indian App Store: Pro ₹1,499/month, Max ₹2,999/month, Boost ₹299–₹999; rated 4.66 from 11,674 Indian ratings ([App Store India](https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775)). No reliable Indian data was found on BandLab's users in India. |
| What it ships | Tip Jar with no BandLab commission ([BandLab blog, 8 Jun 2023](https://blog.bandlab.com/make-money-with-your-music-the-brand-new-tip-jar/)); "Opportunities" for "live gigs, record deals, artist features" ([BandLab blog, 30 Sep 2026](https://blog.bandlab.com/bandlab-opportunities-picks/)); paid Boost; a paid Verified badge. |
| Scale | **"Surpassed 100 million registered users"** ([MBW, 21 Mar 2024](https://www.musicbusinessworldwide.com/music-making-app-bandlab-surpasses-100-million-users/)). |
| Weaknesses | Music only; Pro is about 5 times Underdawg's ₹299 price. |
| Learn | Opportunities plus verification plus tips is a working combination for one craft. |
| Do NOT copy | Pay-to-Boost discovery, which attracts bots; "registered users" as the headline metric. |

### What the direct competitors teach

Three lessons cut across the profiles.

**First, the business-tool bundle is a commodity in India.** Topmate, Exly, TagMango, SuperProfile, Zorcha, ReplyKaro and InstantDM already sell it. Zorcha advertises "Free Unlimited Instagram DM Automation" and claims 60K+ creators ([zorcha.com](https://zorcha.com)). ReplyKaro starts at ₹99 a month, and its own blog lists a Pro plan at ₹299, the same price as Underdawg Pro ([ReplyKaro](https://replykaro.com/pricing), 2 Oct 2026). A ₹299 Pro plan built on "unlimited DM automations, premium templates, full stats" competes on price with free Indian tools [Inference]. Outside India, Linktree, Beacons, Stan and Planoly sell the same bundle, but Linktree's money features exclude India and Stan cannot open Stripe accounts for Indian creators.

**Second, the demand side pays.** The Indian evidence is direct. The Indian platforms with the most revenue are paid by brands, ticket buyers or learners: Qoruz ₹56.4 crore, Kofluence ₹52.5 crore, Talentrack ₹36.4 crore, Skillbox ₹29.9 crore and Artium Academy ₹28.0 crore in FY25 (Inc42 Datalabs, indicative). StarClinch, which charges artists 15%, earned ₹2.4 crore. An artist-paid subscription is the less-proven model in India [Inference in the notes]. Outside India, the only added lesson is that hirer fees can be explicit: Behance charges recruiters $399/month, VSCO Hub charges hirers $19.99/month and Dribbble charges $150/month per job listing ([Behance](https://help.behance.net/hc/en-us/articles/51497046899227-Behance-Recruiter-Pro-Overview); [VSCO Hub](https://vsco.co/vsco-hub); [Dribbble](https://help.dribbble.com/en/articles/11062025-dribbble-pricing-and-payment-terms)). No Indian hirer-subscription price was found.

**Third, artists-only networks win attention but struggle to pay anyone.** No Indian cross-discipline artists-only network was found, so Indian evidence is thin. The nearest Indian case is a single-craft one: YourQuote, a writers' network, claims 3M+ creators and ₹5 lakh+ in royalties ([yourquote.in](https://yourquote.in), 1 Oct 2026) [Company claim]. Outside India, Cara runs on donations, Artfol is small, and Behance and DeviantArt make money through a parent company and fees.

CHART: india-revenue — The five highest-revenue Indian platforms here are paid by brands, ticket buyers or learners (₹28–56 crore a year); StarClinch, which charges artists 15%, earns ₹2.4 crore
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Qoruz (brands pay) | 56.4 | ₹ crore revenue (Inc42 Datalabs, indicative) | Qoruz | FY25 | https://inc42.com/company/qoruz/ |
| Kofluence (brands pay) | 52.5 | ₹ crore revenue (Inc42 Datalabs, indicative) | Kofluence | FY25 | https://inc42.com/company/kofluence/ |
| Talentrack (brands pay) | 36.4 | ₹ crore revenue (Inc42 Datalabs, indicative) | Talentrack | FY25 | https://inc42.com/company/talentrack/ |
| Skillbox (ticket buyers pay) | 29.9 | ₹ crore revenue (Inc42 Datalabs, indicative) | Skillbox | FY25 | https://inc42.com/company/skillbox/ |
| Artium Academy (learners pay) | 28.0 | ₹ crore revenue (Inc42 Datalabs, indicative) | Artium Academy | FY25 | https://inc42.com/company/artium-academy/ |
| TagMango (coaches pay) | 20.9 | ₹ crore revenue (Inc42 Datalabs, indicative) | TagMango | FY25 | https://inc42.com/company/tagmango/ |
| Muzigal (learners pay) | 13.7 | ₹ crore revenue (Inc42 Datalabs, indicative) | Muzigal | FY25 | https://inc42.com/company/muzigal/ |
| Cosmofeed / SuperProfile (creators pay) | 11.7 | ₹ crore revenue (Inc42 Datalabs, indicative) | Cosmofeed | FY25 | https://inc42.com/company/cosmofeed/ |
| Hoopr (licensees pay) | 3.4 | ₹ crore revenue (Inc42 Datalabs, indicative) | Hoopr | FY25 | https://inc42.com/company/hoopr/ |
| StarClinch (artists pay 15%) | 2.4 | ₹ crore revenue (Inc42 Datalabs, indicative) | StarClinch | FY25 | https://inc42.com/company/starclinch/ |

CHART: india-scale — Topmate claims 1M+ users and Kofluence 750,000+; India's artist-hiring pools hold 10,000–70,000 talent (all company claims)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Topmate | 1000000 | professionals (company claim) | Topmate | 2026-10-01 | https://topmate.io/about |
| Kofluence (page also says 500,000+) | 750000 | influencers (company claim) | Kofluence | 2026-10-02 | https://www.kofluence.com |
| Hobo.Video | 225187 | influencers (company claim) | Hobo.Video | 2026-10-02 | https://hobo.video |
| Graphy | 200000 | creators worldwide (company claim) | Graphy | 2026-10-02 | https://graphy.com |
| Exly | 100000 | creators (company claim) | Exly | 2026-10-01 | https://exlyapp.com |
| WYLD | 100000 | creators (company claim) | WYLD | 2026-10-02 | https://getwyld.in |
| IndieFolio | 70000 | talent pool (company claim) | IndieFolio | 2026-10-01 | https://home.indiefolio.com |
| Zorcha | 60000 | creators (company claim) | Zorcha | 2026-10-01 | https://zorcha.com |
| Talentrack | 50000 | artists, experts, influencers (company claim) | Talentrack | 2026-10-01 | https://www.talentrack.in |
| Artium Academy | 45000 | learners (company claim) | Artium Academy | 2026-10-02 | https://artiumacademy.com |
| InstantDM | 30000 | creators and brands (company claim) | InstantDM | 2026-10-02 | https://instantdm.com/pricing |
| StarClinch (as recorded 1 Oct 2026) | 17000 | artists (company claim) | StarClinch | 2026-10-01 | https://starclinch.com/our-story |
| StarClinch ("10K+" as seen 2 Oct 2026) | 10000 | artists (company claim) | StarClinch | 2026-10-02 | https://starclinch.com/our-story |
| TagMango | 10000 | creators (company claim) | TagMango | 2026-10-01 | https://tagmango.com |
| BlinkStore | 10000 | creators and brands (company claim) | BlinkStore | 2026-10-01 | https://www.blinkstore.in |

CHART: take-rates — Indian incumbents take 5–40% of each sale on their entry plans; no flat-fee artist plan like ₹299/month was found in India
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Artflute commission on an artwork sale | 40 | % of sale | Artflute | 2026-10-02 | https://www.artflute.com/artist-faqs |
| Topmate marketplace sales | 20 | % of sale | Topmate | 2026-10-01 | https://topmate.io/pricing |
| StarClinch booking fee | 15 | % of remuneration | StarClinch | 2026-10-01 | https://starclinch.com/terms-of-use |
| Topmate own-link sales | 10 | % of sale | Topmate | 2026-10-01 | https://topmate.io/pricing |
| TagMango Basic | 10 | % of revenue | TagMango | 2026-10-02 | https://tagmango.com/pricing |
| Exly entry tier | 10 | % of sale | Exly | 2026-10-02 | https://exlyapp.com/pricing |
| Graphy entry plan (plus ₹24,999 a year) | 10 | % of sale | Graphy | 2026-10-02 | https://graphy.com/pricing |
| SuperProfile Starter | 10 | % of sale | SuperProfile | 2026 | https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro |
| Linktree Starter (India price page) | 9 | % of digital-product sale | Linktree | 2026-10-01 | https://linktr.ee/s/pricing/ |
| Etsy India transaction fee (plus 3–5% + ₹25 processing) | 6.5 | % of sale | Etsy | 2026-10-02 | https://www.etsy.com/in-en/sell |
| Instamojo free plans (plus ₹3) | 5 | % of sale | Instamojo | 2026-10-01 | https://www.instamojo.com/pricing/ |

The nearest flat fees in India are Pixpa's portfolio sites (₹200–₹600 a month on offer, billed yearly) and ReplyKaro's DM tool (from ₹99 a month). Neither bundles money tools, hiring or discovery ([Pixpa](https://www.pixpa.com/pricing); [ReplyKaro](https://replykaro.com/pricing)).

## 17. Indirect competitors

Indirect competitors take the artist's time, content, portfolio, audience, community or career opportunities without copying Underdawg. **The biggest is Instagram itself**, which is both host and rival. Its ad reach in India grew from 230.3 million in early 2022 to 481 million in late 2025 ([DataReportal 2022](https://datareportal.com/reports/digital-2022-india); [DataReportal 2026](https://datareportal.com/reports/digital-2026-india); the publisher warns that revisions limit year-to-year comparison). With no feed of its own, Underdawg does not compete for scrolling time. It competes for the business layer on top of Instagram (links, DMs, payments, bookings, brand work), and that is where Instagram and the Indian tools are moving fastest.

**In India**

| Platform | Competes for | Scale in India (dated) | Overlap with Underdawg | Opening left for Underdawg [Inference] |
|---|---|---|---|---|
| Instagram | Time, content, portfolio, audience, community, opportunities | **481M ad-reach users in India, up 22.9% in a year** ([DataReportal, 5 Nov 2025](https://datareportal.com/reports/digital-2026-india)) | Creator Marketplace (India since Feb 2024), Partnership ads, Gifts, Subscriptions and Badges where available ([Instagram](https://creators.instagram.com/earn-money)); Edits app; 5 bio links; native scheduling; Meta Verified at ₹699/month | No artist-only trust layer (brand reviews, rate checks); no escrowed hiring for small artists; INR/UPI commerce only through third parties |
| YouTube | Time, content, audience, income | 500M ad-reach users in India ([DataReportal](https://datareportal.com/reports/digital-2026-india)); paid "INR 21,000 crore to Indian creators, artists and media companies over the last three years" ([Free Press Journal, 2 May 2025](https://www.freepressjournal.in/business/youtube-to-invest-850-crore-pays-21000-crore-to-indian-creators)) | Memberships from ₹59, Super Chat and Super Thanks, Shopping, Creator Partnerships, all available in India ([Google](https://support.google.com/youtube/answer/9385307)) | Discovery for unknowns is slow; Underdawg can be the brand and booking layer |
| Informal channels (Instagram DM plus UPI, WhatsApp groups, city subreddits) | Hiring, gigs, direct sales | Not measurable. "More than 68% of freelancers depend upon social media to find suitable work opportunities" ([Wikipedia: Freelancing in India](https://en.wikipedia.org/wiki/Freelancing_in_India), citing a 2023 report) | Hire Artists, Gigs, Art Shop, Tips | This is the real incumbent Underdawg must beat on trust: zero fees, but no contracts, ghosting at payment and scams |
| WhatsApp and Telegram | Community, fan relationship, direct sales | No India-specific WhatsApp user figure was opened. India is Telegram's largest market ([afaqs, Aug 2024](https://www.afaqs.com/news/digital/telegram-introduces-paid-subscriptions-and-star-reactions-to-enhance-creator-revenue)) | Cosmofeed, TagMango and Exly already sell paid WhatsApp and Telegram groups | Fan Club competes with free groups fans already use; a structured club helps only artists with 1,000+ true fans |
| Influencer and brand marketplaces (Kofluence, Qoruz, WYLD, Hobo.Video, Tring) | Brand budgets | Kofluence 750,000+ influencers, $4M pre-Series A ([Entrackr](https://entrackr.com/2022/02/kofluence-raises-4-mn-in-pre-series-a-round/)); WYLD 100,000+ creators, 500+ brands, pays by UPI ([getwyld.in](https://getwyld.in)); Hobo.Video 225,187+ influencers, 12,000+ brands ([hobo.video](https://hobo.video)); Tring 15,000+ celebrities, 1,500+ brands ([tring.co.in](https://tring.co.in)) [Company claims] | Hire Artists | Built for influencers and led by brands; an artist taxonomy is open. Their fees are not published |
| Ticketing (BookMyShow, District, Skillbox, SortMyScene) | Event tickets, gig discovery | BookMyShow: 34,086 live events listed in 2025, up from 26,359 in 2023 ([Music Ally, 11 Dec 2025](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/)); live-events revenue ₹756 crore in FY25, up from ₹455 crore ([Angel One, 16 Jan 2026](https://www.angelone.in/news/unlisted-companies/bookmyshow-parent-reports-192-crore-profit-as-live-events-scale-up)). Eternal paid US$244.2M (about ₹2,048 crore) for Paytm's ticketing and launched District in Nov 2024 ([Wikipedia: Eternal](https://en.wikipedia.org/wiki/Eternal_Limited); [Wikipedia: Paytm](https://en.wikipedia.org/wiki/Paytm)). Skillbox FY25 revenue ₹29.9 crore ([Inc42](https://inc42.com/company/skillbox/)) [Inc42 Datalabs] | Event tickets | Small artist workshops and house gigs sit below these platforms' focus |
| Booking marketplaces and agencies (StarClinch, Hire4Event) | Paid gigs for performers | StarClinch FY25 revenue ₹2.4 crore ([Inc42](https://inc42.com/company/starclinch/)) [Inc42 Datalabs]; Hire4Event "10,000+ Events Managed" ([archived 8 Jul 2026](https://web.archive.org/web/20260708083739/https://www.hire4event.com/)) [Company claim] | Hire Artists, Gigs | Agencies and middlemen are the incumbent channel; an open, verified marketplace is rare |
| Print-on-demand (BlinkStore, Qikink, Printrove) | Merch income | BlinkStore "10K+ Creators & Brands" ([blinkstore.in](https://www.blinkstore.in)); Qikink 25,000+ brands and 7M+ orders on 1 Oct 2026 (a July 2026 snapshot showed 5M+) ([qikink.com](https://qikink.com)) [Company claims] | Art Shop | Better as partners than rivals |
| Indian art marketplaces (Artflute, Mojarto, MeMeraki) | Sales of originals | Artflute takes 40% ([Artflute](https://www.artflute.com/artist-faqs)); MeMeraki "7+ Cr INR paid out to our artists in the last 5 years", 500+ master artists ([MeMeraki](https://www.memeraki.com)) [Company claim]; Mojarto FY25 revenue ₹84.6 lakh, down 62% ([Inc42](https://inc42.com/company/mojarto/)) [Reported; not confirmed on a second check] | Art Shop | Curated, costly for the artist, or limited to heritage crafts; contemporary emerging artists are open |
| Learning platforms (Artium Academy, Muzigal) | Paid live sessions | Artium FY25 revenue ₹28.0 crore, 45,000+ learners; Muzigal ₹13.7 crore ([Inc42](https://inc42.com/company/artium-academy/); [Inc42](https://inc42.com/company/muzigal/)) [Inc42 Datalabs; company claim] | Live Rooms, Show & Review | They use platform teachers, not artists a fan follows |
| Music platforms (Spotify, JioSaavn ArtistOne, Hoopr, Songdew) | Musicians' audience and royalties | 14.4 million paid music subscribers in India in 2025 ([EY, 24 Mar 2026](https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report)). Spotify pays no royalties below 1,000 streams per track per year (from 1 Apr 2024) ([Spotify for Artists, 21 Nov 2023](https://artists.spotify.com/en/blog/modernizing-our-royalty-system)) | Artist profiles, discovery | The long tail earns nothing from streams, which strengthens direct fan income and gigs |
| LinkedIn | Career, professional identity | 170M members in India, +21.4% ([DataReportal](https://datareportal.com/reports/digital-2026-india)) | Jobs, service pages | Weak for performing and visual artists and for gig-sized work |
| Etsy (India) | Art and craft sales | New Indian sellers could not open shops from Nov 2023 ([Etsy Help India](https://help.etsy.com/hc/en-in/articles/6742925359255-How-to-Accept-Payments-as-a-Seller-in-India)); onboarding resumed in June 2025, for international sales only ([ShipGlobal, 2026](https://shipglobal.in/blogs/etsy-new-sellers/)) [Reported]. India fees: ₹19 listing, 6.5% transaction, 3–5% + ₹25 processing ([Etsy India](https://www.etsy.com/in-en/sell)) | Art Shop, downloads | Domestic sales inside India are not served |
| Indian short-video apps (Moj, Josh) | Time, content | Moj daily users fell from 9.24 million (Jan 2021) to 2.16 million (Jan 2023) ([MediaNews4U, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/)) | Short-video creator programmes | Not a factor; creators moved to Reels and Shorts |

**Outside India (background only)**

| Platform | What it teaches that India has not yet tested | Source |
|---|---|---|
| Discord | Communities already run role-gated critique and scam channels themselves, with no vetting and no outside discovery. Its server subscriptions were US only at launch (current status unverified) | [TechCrunch, 1 Dec 2022](https://techcrunch.com/2022/12/01/discord-opens-up-paid-subscriptions-so-servers-can-sell-premium-perks/) |
| Pinterest and DeviantArt | Artists complain about AI "slop" and about AI tools switched on by default. A "verified human" filter is an opening | [404 Media, 19 Feb 2026](https://www.404media.co/pinterest-is-drowning-in-a-sea-of-ai-slop-and-auto-moderation/); [Ars Technica, 11 Nov 2022](https://arstechnica.com/information-technology/2022/11/deviantart-upsets-artists-with-its-new-ai-art-generator-dreamup/) |
| Patreon | App-store rules can change a fan-club's costs: Apple requires in-app purchase for Patreon subscriptions by 1 Nov 2026 | [TechCrunch, 28 Jan 2026](https://techcrunch.com/2026/01/28/apple-tells-patreon-to-move-creators-to-in-app-purchase-for-subscriptions-by-november/) |
| Fiverr | Open gig marketplaces are criticised for "pushing down prices"; fair-rate transparency is an opening | [Wikipedia: Fiverr](https://en.wikipedia.org/wiki/Fiverr) |

### Instagram's 2024–2026 launches overlap Underdawg directly

Five recent launches by Instagram and YouTube overlap the planned features in India.

1. **Instagram's creator marketplace** reached India on 21 Feb 2024, by invitation, with brand search on audience data, project briefs and a brand-deal inbox ([TechCrunch](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/); [Meta](https://about.fb.com/news/2024/02/creator-marketplace-for-brands-and-creators-to-collaborate-on-instagram/)). It overlaps Hire Artists, Insights and Gigs. No Indian adoption data was found.
2. **Meta's paid plans.** Meta Verified costs ₹699/month on mobile in India ([Meta, 7 Jun 2023](https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/)). Meta One creator plans (15 Sep 2026) bundle 30-day Story scheduling, exportable analytics, audience insights, a verified badge and automatic follow invitations at $14.99–$499 a month, as TechCrunch reports them ([TechCrunch](https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/)). In India, Meta prices consumer Instagram Plus at ₹99 a month and WhatsApp Plus at ₹79 a month ([Best Media Info, 16 Sep 2026](https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837)). The rupee prices of the creator plans were not recorded. These plans directly rival the ₹299 Pro plan.
3. **The India Edits Film Festival** (24 Aug–8 Oct 2026) uses jury-reviewed submissions "to spotlight India's emerging creator talent". It is the closest big-platform analogue to Show & Review ([Meta, 24 Aug 2026](https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/)).
4. **YouTube Creator Partnerships** let creators share first-party metrics with brands, India included ([Google](https://support.google.com/youtube/answer/16261569); [YouTube CEO letter, 21 Jan 2026](https://blog.youtube/inside-youtube/the-future-of-youtube-2026/)).
5. **YouTube Hype** launched in India on 17 Jul 2025 for creators with 500 to 500,000 subscribers. Viewers can hype up to three videos a week ([Business Today, 17 Jul 2025](https://www.businesstoday.in/technology/news/story/small-content-creators-just-got-a-big-boost-with-youtubes-hype-485045-2025-07-17)). It is a discovery tool aimed at small creators.

Both platforms now run visibility programmes for small Indian creators. Their answer is leaderboards and contests, not paid work [Inference in the notes].

Instagram can ship any successful Underdawg feature, and it controls the API that Underdawg depends on: professional accounts only, and one private reply per comment within 7 days ([Meta](https://developers.facebook.com/docs/instagram-platform/overview); [Meta](https://developers.facebook.com/docs/instagram-platform/private-replies)). The openings it leaves are structural: an artist-only trust layer (brand reviews, scam alerts, rate data), escrowed small-brand hiring, India-native payments, and fan contacts that live outside Instagram [Inference]. **No big platform has native paid Show & Review, vetted artist-only boards or paid 1:1 booking** [Inference from the section 15 matrix].

## 18. Global startup search

The search covered startups launched roughly in 2021–2026, plus a few older products that remain the closest analogues. India comes first and in the most detail. Sources were official sites, Entrackr, Inc42, TechCrunch, Music Business Worldwide, App Store data and investor or accelerator portfolios. **Limits:** the main pass had no web search, and Product Hunt, Crunchbase, Reddit and several Indian startup media sites were blocked. A later portfolio pass (Indian investors; YC, Techstars, a16z, Antler, Seedcamp) filled part of the gap. The Middle East was not checked, and Africa and Latin America gave few verified rows. Most traction figures are the companies' own claims and are labelled.

Indian entrants cluster into three camps. **Creator money and DM tools** (Topmate, Exly, TagMango, SuperProfile, Zorcha, ReplyKaro, InstantDM) are crowded and cheap. **Brand-side marketplaces** (Kofluence, Qoruz, WYLD, Hobo.Video, Tring) include the two highest-revenue companies found, Qoruz and Kofluence. **Booking, ticketing, shop and learning companies** (StarClinch, Skillbox, District, BlinkStore, Artium Academy) each own one feature. **No Indian anti-AI artist network and no Indian cross-discipline artists-only network was found.** The nearest Indian networks serve one craft each: YourQuote for writers and Songdew for musicians.

### India

**Creator money, link-in-bio and DM tools**

| Name | City | Launch | What it does | Traction (label) | Source |
|---|---|---|---|---|---|
| Topmate | Bengaluru | 2021 [Reported] | One-link storefront: 1:1, webinars, downloads, Priority DM, Instagram Auto DM | "1mn+ professionals" [Company claim] | [topmate.io/about](https://topmate.io/about) |
| Cosmofeed / SuperProfile | Gurugram | 2021 | Paid groups, gated content, courses, events; link-in-bio store with AutoDM | $1.5M seed; 50K users (Mar 2022); FY25 revenue ₹11.7 crore [Inc42 Datalabs] | [Entrackr, 16 Mar 2022](https://entrackr.com/2022/03/cosmofeed-raises-1-5-mn-in-seed-round/); [Inc42](https://inc42.com/company/cosmofeed/) |
| Exly (YC) | n/a | 2021 | Courses, webinars, scheduler, CRM, UPI checkout | $6.2M (Chiratae); 10,000+ customers (Mar 2024); site says "100,000+ creators" | [Entrackr](https://entrackr.com/2024/03/y-combinator-backed-exly-raises-6-2-mn-led-by-chiratae/) |
| Graphy (Unacademy) | n/a | 2020 | Creator websites, courses, memberships | "200,000+ Creators Worldwide", "₹1,500 Crore+ Creator Revenue" [Company claims]; bought Spayee for $25M | [Graphy](https://graphy.com); [Entrackr](https://entrackr.com/2021/10/unacademys-graphy-acquires-edtech-startup-spayee-for-25-mn/) |
| TagMango (YC W20) | Kolkata | 2019 [Reported] | Courses, communities, live workshops, branded apps | "10,000+ Creators" [Company claim]; FY25 revenue ₹20.9 crore [Inc42 Datalabs] | [tagmango.com](https://tagmango.com); [Inc42](https://inc42.com/company/tagmango/) |
| Zorcha | India | n/a | Instagram comment-to-DM, follow-gating, AI FAQ; Meta Verified Tech Provider | "60K+" creators; "100 million messages sent every month" [Company claims] | [zorcha.com](https://zorcha.com) |
| ReplyKaro | India | n/a | Instagram DM automation from ₹99 a month, billed by UPI | Its page shows both "Join 10,000+ creators" and "Join over 7,576+ creators" (2 Oct 2026); it showed 4,496+ on 1 Oct 2026 [Company claims; they differ] | [ReplyKaro](https://replykaro.com) |
| InstantDM | India | n/a | Instagram DM automation and scheduling; from $9.99/month | 30,000+ creators and brands [Company claim]; 4.36 from 39 Indian iOS ratings | [instantdm.com](https://instantdm.com/pricing) |
| Faym | Gurugram | 2022 | Creator stores, affiliate links, auto link sharing by DM | 10,000+ creator stores [Company claim] | [faym.co](https://faym.co) |
| Wishlink | Gurugram | 2022 | Affiliate storefronts and DM links | 15,000+ creators, 250+ brands [Company claim]; raised $7M | [Entrackr, Feb 2024](https://entrackr.com/2024/02/exclusive-wishlink-raises-7-mn-from-fundamentum-and-elevation/) |
| HYPD | India | ~2022 | Multi-brand creator storefronts | $4M pre-Series A | [Entrackr, May 2023](https://entrackr.com/2023/05/creator-tech-startup-hypd-raises-4-mn-in-pre-series-a) |

No audited user numbers exist for any of these tools. Zorcha and InstantDM show prices in US dollars; their rupee prices, if different, were not visible.

**Brand deals, hiring, events, music, shop and learning**

| Name | City | Launch | What it does | Traction (label) | Source |
|---|---|---|---|---|---|
| Kofluence | Bengaluru | 2019 | Influencer marketplace for brands; creator app | "750,000+ Influencers" (the page also says 500,000+) [Company claim]; $4M pre-Series A; FY25 revenue ₹52.5 crore [Inc42 Datalabs] | [Kofluence](https://www.kofluence.com); [Inc42](https://inc42.com/company/kofluence/) |
| Qoruz | Bengaluru | 2015 | Creator search and analytics for brands and agencies | FY25 revenue ₹56.4 crore; $500,000 raised over 3 rounds [Inc42 Datalabs] | [Inc42](https://inc42.com/company/qoruz/) |
| WYLD | Mumbai | n/a | Paid UGC brand campaigns, paid by UPI or bank | 100,000+ creators; 500+ brands [Company claim] | [getwyld.in](https://getwyld.in) |
| Hobo.Video | Delhi | n/a | Influencer and UGC campaigns | 225,187+ influencers; 12,000+ brands [Company claim] | [hobo.video](https://hobo.video) |
| Tring | Mumbai | 2019 | Brand–celebrity marketplace (pivoted from shout-outs) | 15,000+ celebrities; 1,500+ brands [Company claim] | [tring.co.in](https://tring.co.in) |
| Skillbox | Gurugram | 2017 | Began as a musician platform; now event ticketing and artist booking | FY25 revenue ₹29.9 crore [Inc42 Datalabs] | [Inc42](https://inc42.com/company/skillbox/) |
| District (Eternal) | India | Nov 2024 | Events, movies and dining tickets | Built on the US$244.2M purchase of Paytm's ticketing | [Wikipedia: Eternal](https://en.wikipedia.org/wiki/Eternal_Limited) |
| SortMyScene | Mumbai | 2021 | Event ticketing for electronic music | Bootstrapped; 12 employees [Inc42 Datalabs] | [Inc42](https://inc42.com/company/sortmyscene/) |
| Hoopr | Mumbai | 2021 | Licenses indie artists' music to creators and brands | 30,000+ creators and Rs 18 Cr raised (Entrackr, Nov 2025); its site claims "4.5L+ creators" (the two differ); FY25 revenue ₹3.4 crore [Inc42 Datalabs] | [Entrackr, 17 Nov 2025](https://entrackr.com/snippets/music-licensing-platform-hoopr-raises-funds-in-extended-pre-series-a-round-10782011); [Inc42](https://inc42.com/company/hoopr/) |
| Eloelo | Bengaluru | 2020 | Live rooms with virtual gifting; now EloTV micro-dramas | $50M+ raised; FY25 revenue Rs 69.5 Cr with Rs 59 Cr spent on ads | [Entrackr](https://entrackr.com/fintrackr/eloelo-burns-rs-59-cr-on-ads-to-generate-rs-69-cr-revenue-in-fy25-11439432) |
| BlinkStore | Bengaluru | 2022 | Free print-on-demand stores; a ₹599 tee earns the creator up to ₹200 | "10K+ Creators & Brands" [Company claim] | [blinkstore.in](https://www.blinkstore.in) |
| MeMeraki | Gurugram | n/a | Traditional-art marketplace and masterclasses | "7+ Cr INR paid out to our artists in the last 5 years"; 500+ master artists [Company claim] | [MeMeraki](https://www.memeraki.com) |
| Artium Academy | Mumbai | 2020 | 1:1 live online music classes | 45,000+ learners [Company claim]; FY25 revenue ₹28.0 crore [Inc42 Datalabs] | [Artium Academy](https://artiumacademy.com); [Inc42](https://inc42.com/company/artium-academy/) |
| Songdew | Gurugram | 2014 | Musicians collaborate, publish, promote and distribute music | FY25 revenue ₹4.0 crore; bootstrapped [Reported on 1 Oct 2026; the figure was not on the page text fetched on 2 Oct 2026]. Artist count: no reliable data found | [Inc42](https://inc42.com/company/songdew-media/) |
| Peerlist | n/a | 2021 | Proof-of-work profiles and jobs for tech and design | $1.13M across 2 rounds [Inc42 Datalabs]; 22 Indian iOS ratings | [Inc42](https://inc42.com/company/peerlist/) |
| Pixpa | India | 2013 | Portfolio website builder for photographers, artists and designers; zero-commission store | ₹200–₹600 a month billed yearly; user numbers not found | [Pixpa](https://www.pixpa.com/pricing) |
| YourQuote | Bengaluru | 2016 | Writers' posting and self-publishing | 3M+ creators; ₹5 lakh+ royalties [Company claim] | [yourquote.in](https://yourquote.in) |

### Outside India (background only)

Only startups that teach something India has not yet tested are kept here.

| Name | Country | What it does | Why it matters for Underdawg | Source |
|---|---|---|---|---|
| Cara | Undisclosed HQ | Anti-AI artist portfolio network; jobs board; no artist earnings | 40,000 → 650,000 users in one week (Jun 2024) [Verified]. No Indian artists-only network exists to compare | [TechCrunch, 6 Jun 2024](https://techcrunch.com/2024/06/06/a-social-app-for-creatives-cara-grew-from-40k-to-650k-users-in-a-week-because-artists-are-fed-up-with-metas-ai-policies/) |
| Cohart | USA | Social art marketplace plus artist business tools (CRM, payments, newsletters) | The nearest "business tools for artists" product; 25% commission; "$1.6 million in sales" in beta | [TechCrunch, 2 Aug 2023](https://techcrunch.com/2023/08/02/cohart-art-marketplace-commerce/) |
| Contra | USA | Commission-free creative network with escrow and milestones | Shows escrowed hiring can be free for the creative; "$250M+ earned by 1.5M+ creative experts" [Company claim] | [Contra, 31 Mar 2026](https://contra.com/blog/introducing-contra-labs) |
| VGen | Canada | Artist commission marketplace; verified reviews; "No Generative AI" | "380,000+ commission services" [Company claim] | [vgen.co](https://vgen.co) |
| Crepe | South Korea | Escrowed commissions; generative AI banned with metadata checks, AI detection and human review | A working model for enforcing a no-AI rule | [Crepe terms](https://crepe.cm/ko/terms) |
| FYPM | USA | Creators review brands and share pay and payment-timing data | The nearest product to Artist Boards; 38,000 creators; $275K raised [Reported] | [TechCrunch, 19 Jan 2024](https://techcrunch.com/2024/01/19/how-fypm-used-instagram-stories-and-thirst-traps-to-raise-275k/) |
| Groover | France | Artists pay €2 per pitch to curators; feedback within 7 days or a refund | The nearest product to Show & Review; "more than 600,000 artists & pros" [Company claim] | [MBW, 13 Feb 2024](https://www.musicbusinessworldwide.com/music-promotion-startup-groover-raises-8m-in-series-a-funding/) |
| Collabstr | Canada | Brand–creator marketplace; payment held until work is done | 40,000+ advertisers and 100,000 creators (Feb 2025); its pricing page later claimed "950,000+ creators" (the two differ) | [Collabstr pricing (archive)](https://web.archive.org/web/20260704044017/https://collabstr.com/pricing) |
| BintanGO | Indonesia | Creator brand-deal tools and invoice financing | Invoice financing answers late brand payments, a known Indian problem; $2.1M seed [Reported] | [TechCrunch, 26 Apr 2022](https://techcrunch.com/2022/04/26/bintango-wants-to-boost-indonesias-creator-economy/) |
| Fastwork | Thailand | Services marketplace with "Fastwork Guarantee" escrow | Escrow at scale in an emerging market; 200,000+ providers [Company claim] | [fastwork.co](https://fastwork.co) |
| Xfolio | Japan | Portfolio templates, shop, downloads, tips, tiered fan communities | The closest single bundle to Underdawg's artist page; no numbers published | [Xfolio About](https://xfolio.jp/about) |
| Stan | USA | Creator store, "AI powered creator OS" | Stripe custom accounts are not available in India, so its money tools do not serve Indian creators well ([Stan help, 28 Sep 2026](https://help.stan.store/article/217-countries-available-for-stripe-custom-accounts)); 80,000+ active users [Company claim] | [PR Newswire, 17 Mar 2026](https://www.prnewswire.com/news-releases/stan-the-creator-platform-powering-80-000-active-users-launches-stanley-an-ai-head-of-content-for-linkedin-302716013.html) |
| LinkDM | Australia (Melbourne) | Instagram comment-to-DM; free up to 1,000 DMs/month | Sets the free tier that Indian DM tools match; 60,000+ users [Company claim] | [linkdm.com](https://www.linkdm.com) |

### Is anyone building something extremely close to Underdawg? No, but the pieces are crowded

**The short answer is no.** No company was found, in India or elsewhere, that is artists-only, India-first and combines an Instagram-connected verified profile, a fan-money stack, artist-only trust boards and escrowed brand hiring. Confidence is moderate, because web search was limited and small Indian seed-stage apps may be missing.

**The longer answer: the product is much less unique than its feature list suggests.** In India the pieces are split: Topmate (money tools), StarClinch (escrowed bookings), Talentrack and IndieFolio (brand hiring), TagMango and Cosmofeed (paid communities), Zorcha, ReplyKaro and InstantDM (DM automation), BlinkStore and Qikink (print-on-demand). About 60% of the 18 features (the Instagram business layer plus fan money tools) already exist together in Topmate, Exly, TagMango, Cosmofeed and Zorcha in India, and in Linktree, Beacons, Stan and Planoly outside it [Inference]. **No flat-fee artist plan like ₹299/month was found; Indian incumbents take commission** (Topmate 10–20%, StarClinch 15%). The artists-only layer has no cross-discipline Indian builder; YourQuote (writers) and Songdew (musicians) each serve one craft. Outside India it exists separately in Behance, DeviantArt, Artfol, Cara, pixiv and Xfolio. The closest single analogues are all foreign: **Artfol**, **Planoly Creator Store**, **Cohart** (business tools for artists), **Xfolio** (templates, shop, downloads, tips and fan clubs in Japan) and Japan's **THECOO**, which pairs a fan-club app (Fanicon) with a brand tool that "visualises influencers' value" ([THECOO](https://thecoo.co.jp/)).

**The bundle mainly helps artists who already have fans.** DM automation, tips, fan clubs, tickets and downloads monetise existing followers. The Indian numbers point the same way. Topmate's whole creator base earned about ₹1.80 crore in September 2023 while 12.1k new creators joined in that month alone. Kofluence lists 750,000+ influencers, while its own chief executive estimates that only "450K to 600K creators are currently monetising their content in some form" in India ([IBTimes India, 2025](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [Company claim]. With no in-app feed, an unknown artist's only discovery surfaces are Instagram and brands searching Hire Artists. **The risk is that Underdawg becomes "Linktree or Stan for Indian artists": crowded, with a weak moat, while the discovery promise goes undelivered** [Inference].

**The open territory** is an artists-only trust and opportunity layer (brand reviews, scam alerts, rate floors), escrowed hiring of Indian artists in INR and UPI, and merit-based discovery for unknowns. Indian models for merit-based discovery exist. JioSaavn's "ArtistOne Finds" playlist is "curated exclusively from submissions made by artists", and more than a dozen of its artists had fewer than 1,000 monthly listeners ([Music Ally, 13 Aug 2025](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/)). YouTube Hype gives bonus points to smaller channels ([BuzzInContent, 15 Jul 2025](https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785)). Outside India, SoundCloud's "First Fans" sends each new upload "to up to 100 listeners most likely to love it" ([SoundCloud, 2 May 2024](https://soundcloud.com/playbook-articles/introducing-buzzing-playlists-from-first-fans-to-fan-powered-playlists)). All of them need enough artists and listeners or brands first.

**Moves that would create an "extremely close" competitor quickly** [Inference]: Topmate or Kofluence adding an artists-only brand marketplace; Linktree enabling its money features and Brand Deals in India; BandLab extending Opportunities and Verified to visual and performing artists; or Behance adding Instagram import and INR/UPI payouts. Each is a plausible near-term move by a company that already has distribution.

### Naming check: underdawg.in is live in Mumbai; the Lisbon "Underdogs" gallery is the main conflict outside India

| Name or domain | Status (DNS/WHOIS, 1 Oct 2026) |
|---|---|
| underdawg.in | Live: "Underdawg \| The Creator OS", "Get Discovered. Get Connected. Get Paid.", Mumbai, "Beta Vol. 01". Probably the founder's own site [Inference] |
| underdawg.com | Registered in 1999 at GoDaddy; expires 2027-03-08; no live site |
| underdawgs.com, underdawg.co | Parked; appear to be held for resale |
| under-dogs.net ("Underdogs") | **Strongest art-world conflict:** a Lisbon cultural platform and gallery established in 2010 |
| underdogs.fans | A FlutterFlow fan-support app; owner unknown |

**Verdict:** no verified artist or creator platform named Underdawg or Underdog was found outside India. The Lisbon gallery is the brand most likely to cause confusion in the art world. Note also that "Creator OS" on underdawg.in echoes Stan's "AI powered creator OS" positioning ([PR Newswire, 17 Mar 2026](https://www.prnewswire.com/news-releases/stan-the-creator-platform-powering-80-000-active-users-launches-stanley-an-ai-head-of-content-for-linkedin-302716013.html)).

## 19. Failed or shut-down products

Artist and creator networks rarely die from a lack of artists. They die for four main reasons, in this order of frequency [Inference]. The Indian record shows all four.

- **One: no lasting reason to return** once launch hype fades. In India: Koo, Moj, Josh, Leher. Outside India: Ello, Clubhouse.
- **Two: creators are not paid,** or the platform loses money while creators are owed. In India: Koo halted salaries; VerSe (Josh) delayed publisher payments. Outside India: Talenthouse, Paddle8.
- **Three: a parent or buyer loses interest.** In India: MX TakaTak under ShareChat; JioSaavn's Artist Originals label. Outside India: Koji and Bento under Linktree.
- **Four: dependence on another company's platform or API, or on a regulator.** In India: the TikTok ban of 29 June 2020; Rigi after a SEBI crackdown; Linktree unreachable for days in August 2025. Outside India: Twitter clients in 2023 and Instagram Basic Display API apps in 2024.

The fourth applies directly to Underdawg, whose core profile is built on Meta's Instagram API. Every Underdawg pillar maps to at least one documented failure.

### 19a. Indian failures, shutdowns and pivots

| Product | City | What it tried | What happened (dates) | Why it failed | Lesson for Underdawg | Source |
|---|---|---|---|---|---|---|
| Koo | India | Indian-language microblogging (X alternative) | $30M Series B (May 2021); "has raised $65 million so far" (Inc42 lists $63.99M); ~$275M valuation (Nov 2022); peak 2.1M daily and 10M monthly users against a claimed 60M "users"; salaries halted Apr 2024; shut 3 Jul 2024 | "Failed partnership talks and high technology costs"; an "unpredictable" capital market | **"Made in India" is not a moat;** reach a self-funding model before capital dries up | [Business Today, 3 Jul 2024](https://www.businesstoday.in/technology/news/story/little-yellow-bird-says-final-goodbye-indias-twitter-rival-koo-shuts-down-435555-2024-07-03); [The Hindu, 26 May 2021](https://www.thehindu.com/business/koo-raises-30mn-funding-led-by-tiger-global/article34647225.ece); [Moneycontrol, 2024](https://www.moneycontrol.com/news/technology/future-salaries-can-only-be-paid-out-once-koo-finds-a-buyer-co-founder-mayank-bidawatka-12708326.html) |
| Post-ban short-video wave (Moj, MX TakaTak, Josh, Chingari, Roposo) | India | Indian replacements after TikTok was banned on 29 June 2020 | Moj daily users fell from 9.24M (Jan 2021) to 2.16M (Jan 2023, including MX TakaTak). ShareChat paid "$700 million" for MX TakaTak (Feb 2022), then cut ~20% (Jan 2023) and ~15% (Dec 2023) of staff, and now bets on micro-dramas. Josh saw "more than 80% monthly downloads decline and 50% MAU drop since July 2023"; its parent VerSe raised "nearly $1.5 Bn in its lifetime" (a later report says INR 14,195 crore, about $1.7B). Chingari raised $88.34M; its FY25 revenue fell 53.1% to ₹43.6 crore. Instagram's India reach rose to 481M | Lost to Instagram Reels and YouTube Shorts [Inference] | **Indian creators follow reach; complement Instagram rather than compete with it as a feed** | [MediaNews4U, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/); [Wikipedia: ShareChat](https://en.wikipedia.org/wiki/ShareChat); [Inc42, 24 Jul 2024](https://inc42.com/features/verse-innovations-josh-is-fizzling-out/); [Inc42, 8 Jul 2025](https://inc42.com/features/josh-in-jeopardy-funds-run-dry-for-dailyhunt-can-ai-get-verse-back-in-rhymes/); [Inc42: Chingari](https://inc42.com/company/chingari/); [DataReportal](https://datareportal.com/reports/digital-2026-india) |
| Trell | India | Lifestyle short video and commerce | Raised $63.64M (Inc42); laid off about half its staff (Mar 2022); revenue fell 94% to Rs 4.77 crore in FY23 from Rs 80.6 crore; loss about ₹59 crore | Not documented | Shrinking, not formally shut; creator commerce without a payer base can collapse fast [Inference] | [Entrackr, Mar 2024](https://entrackr.com/2024/03/trell-revenue-plummeted-94-to-rs-5-cr-in-fy23-losses-stood-at-rs-59-cr/); [Inc42](https://inc42.com/company/trell/) |
| FrontRow | Bengaluru | Celebrity- and artist-led hobby classes (music, dance) | "About $18 million" raised (TechCrunch); $17.2M (Entrackr); $20.29M (Inc42). Fired nearly 90% of staff in 2022; $3–4M ARR; shut 30 Jun 2023 | Marketing above 100% of revenue in mid-2021; the market was "way smaller than anticipated"; "a lockdown false positive"; "not venture-scalable" | Live learning needs a real paying market; learners buy famous names, not emerging artists | [TechCrunch, 10 Jul 2023](https://techcrunch.com/2023/07/10/frontrow-shutdown); [The Runway, 2 Feb 2025](https://www.therunway.ventures/p/frontrow); [Entrackr, Jun 2023](https://entrackr.com/2023/06/exclusive-after-mass-layoffs-frontrow-explores-acquisition-deals/); [Inc42](https://inc42.com/company/frontrow/) |
| Unluclass (Unlu) | India | Celebrity classes | $1.2M seed; claimed "over 1 Mn users… 2000+ celebrities"; domains parked or not resolving (2026) | Same celebrity-class pattern as FrontRow [Inference] | Same as FrontRow | [Inc42, 2021](https://inc42.com/buzz/celebrity-focussed-skilling-engagement-platform-unlu-bags-seed-round-from-nexus-others/) |
| Rigi | India | Paid WhatsApp and Telegram creator communities and courses | **Raised Rs 100 Cr (Jan 2023)**, "$25 Mn across 3 rounds in 14 months". It "shut down its core finfluencer business" after "a SEBI crackdown on unregistered finfluencers", "had to let go of 60% of its staff" and now sells paywalled video "starting at INR 49"; an earlier check found it renamed "Rigi TV" for short dramas | Dependence on one creator category; regulation | Big funding did not make paid-community tooling a lasting business; do not depend on one artist category, and keep regulated advice out of paid sessions [Inference] | [Entrackr, Jan 2023](https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/); [Inc42, 2025](https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/) |
| Eloelo | Bengaluru | Live rooms and games with virtual gifting | Raised $50M+; now "EloTV \| India's Drama App"; FY25 revenue Rs 69.5 Cr with Rs 59 Cr spent on ads | Pivot away from live rooms | Live gifting needed heavy ad spend to grow | [Entrackr](https://entrackr.com/fintrackr/eloelo-burns-rs-59-cr-on-ads-to-generate-rs-69-cr-revenue-in-fy25-11439432) |
| Leher | India | Live audio and video rooms | leher.ai does not resolve; revenue fell from ₹36.4 lakh in FY24 to ₹1.5 thousand in FY25 [Inc42 Datalabs] | Not documented [Inference: novelty faded] | Live rooms are not a standalone business | [Inc42](https://inc42.com/company/leher/) |
| Qoohoo | India | Creator–fan engagement | Raised $800,000; domain parked; FY25 revenue ₹5.3 lakh, down 95.5% from ₹1.2 crore [Inc42 Datalabs] | Not documented | Fan engagement without fan density fails [Inference] | [Inc42](https://inc42.com/company/qoohoo/) |
| Gigstart | Mumbai | Artist booking (founded 2013) | Raised $210,000 (Dec 2014); site does not respond; last revenue ₹11.7 lakh in FY16, down from ₹23.7 lakh [Inc42 Datalabs] | Not documented | Booking marketplaces need local liquidity | [Inc42](https://inc42.com/company/gigstart/) |
| One Impression | Gurugram | Influencer marketplace (founded 2018) | Raised $11.0M (latest round 15 Mar 2023); site now reads "Amplify — reimagined for an AI-native world" | Not documented | Even funded brand–creator marketplaces pivot away | [Inc42](https://inc42.com/company/one-impression/); [oneimpression.io](https://www.oneimpression.io) |
| Wobb | Gurugram | Barter influencer campaigns | FY25 revenue ₹56.1 lakh, down 72.4% from ₹2.0 crore [Inc42 Datalabs] | Shrinking demand [Inference] | Barter campaigns did not hold their revenue [Inference] | [Inc42](https://inc42.com/company/wobb/) |
| Mojarto; Castiko | India | Art marketplace; casting marketplace | Mojarto FY25 revenue ₹84.6 lakh, down 62% [Reported; not confirmed on a second check]; Castiko is now a free personal tool "made for myself" | Shrinking demand [Inference] | Marketplaces shrink without steady buyer demand | [Inc42: Mojarto](https://inc42.com/company/mojarto/); [castiko.com](https://www.castiko.com) |
| JioSaavn Artist Originals; Wynk, Resso, Hungama Music | India | In-house indie label; music streaming apps | Artist Originals was shut in the first half of 2022; Wynk, Resso and Hungama Music shut down (full-year impact in 2025) | Parent priorities; consolidation | A platform an indie musician relies on can close; keep fan contacts and work portable [Inference] | [Music Ally, 13 Aug 2025](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/); [FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf) |
| Hypage | India | Link-in-bio tool | hypage.com returns HTTP 410 and tells users to migrate; it appears discontinued under that name | Not documented | Standalone link-in-bio tools get absorbed or die | [hypage.com](https://hypage.com) |

Two Indian pivots held their revenue, and both moved toward the paying side [Inference]. Talentrack went from a talent network to a brand content marketplace. Skillbox went from a musician platform to ticketing and booking. Paytm's sale of Insider and TicketNew to Eternal was consolidation, not a failure.

### 19b. Outside India (background only)

These cases are kept because no Indian case teaches the same lesson yet.

| Product | Country | What happened (dates) | Lesson India has not yet tested | Source |
|---|---|---|---|---|
| Talenthouse | USA/Switzerland | Paid brand briefs for artists; Feb 2023: creatives unpaid for finished work; restructured Jul 2023 | **Brand money must sit in escrow before work starts;** payouts must never depend on the platform's own cash | [Wikipedia: Talenthouse](https://en.wikipedia.org/wiki/Talenthouse); [Guardian, 4 Feb 2023](https://www.theguardian.com/media/2023/feb/04/ive-given-up-getting-paid-design-agency-accused-of-exploiting-artists) |
| Paddle8 | USA | Online art auctions; raised $44M by 2015; Chapter 11 (Mar 2020) owing consignors | Art transactions need ring-fenced client money | [Wikipedia: Paddle8](https://en.wikipedia.org/wiki/Paddle8) |
| EyeEm | Germany | Photographer community; bankrupt Apr 2023; new terms (Apr 2024) took AI-training rights; closed 13 Jan 2026 | **Never take AI-training rights over artists' work** | [Wikipedia: EyeEm](https://en.wikipedia.org/wiki/EyeEm) |
| Ello | USA | Artist-friendly "anti-Facebook" network; 2014 surge of "more than 30,000 signup requests an hour", but only ~20% active one week later; offline Jul 2023 | An artist-community promise is not a retention loop; make portfolios exportable | [Wikipedia: Ello](https://en.wikipedia.org/wiki/Ello_(social_network)) |
| Instagram Basic Display API apps | Global (includes India) | API ended 4 Dec 2024; only professional accounts can connect now | **Underdawg works only for professional accounts, and only while Meta allows it** | [Meta, 4 Sep 2024](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/) |
| Twitter third-party clients | USA | Cut off 12 Jan 2023; Tweetbot pulled 19 Jan 2023 | An API can be switched off overnight | [Wikipedia: Tweetbot](https://en.wikipedia.org/wiki/Tweetbot) |
| Koji; Bento.me | USA; n/a | Koji (link-in-bio mini-apps, $36M raised, 700,000+ creators) was bought by Linktree in Dec 2023 and shut 31 Jan 2024. Bento was bought in Jun 2023 and shut 13 Feb 2026; "all Bento user and profile data will be permanently deleted" | Standalone link-in-bio tools get bought or die; promise continuity and export | [TechCrunch, 14 Dec 2023](https://techcrunch.com/2023/12/14/linktree-acquires-link-in-bio-platform-koji-in-its-second-investment-of-the-year/); [AlternativeTo, 21 Dec 2025](https://alternativeto.net/news/2025/12/bento-to-shut-down-in-2026-as-linktree-takes-over-and-offers-migration-path/) |
| Behance Live; Clubhouse; Spotify Live | USA | Behance ended livestreaming on 16 Dec 2024. Clubhouse laid off over 50% of staff (Apr 2023). Spotify Live closed on 30 Apr 2023 | Live inside an artist network did not become a habit, even with a large audience | [Behance help](https://help.behance.net/hc/en-us/articles/30260603621787-Learn-More-Sunsetting-Livestreaming-on-Behance); [SF Standard, 27 Apr 2023](https://sfstandard.com/2023/04/27/whos-listening-once-buzzy-clubhouse-lays-off-half-its-employees/); [Wikipedia: Spotify Live](https://en.wikipedia.org/wiki/Spotify_Live) |

### Corrections and open items the notes found

Several points about the Indian cases are uncertain and should be read with care.

- **Chingari and Trell have not announced formal shutdowns.** They are best described as shrinking.
- **Funding totals differ by source:** FrontRow ($18 million, $17.2M or $20.29M), Koo ($65 million or $63.99M) and VerSe (nearly $1.5B or about $1.7B).
- **Rigi's pivot is described two ways:** "Rigi TV" short dramas on one check, and beauty and lifestyle paywalled video (Lit Vibes) in Inc42's report.
- **StarClinch's artist count** read 17,000+ on 1 Oct 2026 and "10K+" on 2 Oct 2026.
- **Mojarto's revenue figure** was recorded from Inc42 on 1 Oct 2026 but did not appear on the page text fetched on 2 Oct 2026.
- **For Unluclass, Mitron, Winkl and Plixxo, no reliable current data was found.** Winkl now redirects to The Good Creator Co; Plixxo's site returns a blank page.
- **Outside India:** Koji was bought by Linktree in Dec 2023 and shut on 31 Jan 2024; one early source said 2021 ([TechCrunch](https://techcrunch.com/2023/12/14/linktree-acquires-link-in-bio-platform-koji-in-its-second-investment-of-the-year/)). Bento was bought in Jun 2023 but stayed live until 13 Feb 2026.

### The failure record maps onto every Underdawg pillar

Each planned pillar has a documented failure behind it, and most have an Indian one.

- **Live Rooms** echo Leher, Eloelo and FrontRow in India, and Clubhouse, Spotify Live and Behance Live outside it.
- **Hire Artists and Gigs** echo Gigstart, One Impression and Wobb in India, and Talenthouse outside it. StarClinch survives but earns only ₹2.4 crore after ten years.
- **Fan Club** echoes Rigi and Qoohoo.
- **Art Shop** echoes Mojarto's shrinking revenue.
- **The link-in-bio page** echoes Hypage in India, and Koji, Bento and Snipfeed outside it, all absorbed by bigger players.
- **The Instagram-connected profile and DM automation** echo the TikTok ban, which removed a platform from every Indian creator in one day, and Meta's 2024 API shutdown. Instagram-dependent tools already earn 1-star reviews for broken connections: Hoopr in India ("You cannot connect your insta"), and Stan ("Auto DMs do not work and no human can help") and Beacons ("repeatedly froze or failed") outside it ([Hoopr](https://itunes.apple.com/search?term=hoopr&entity=software&country=in); [Stan](https://apps.apple.com/us/app/id6478343472); [Beacons](https://apps.apple.com/us/app/id6444589346)). Indian users also posted several 1-star reviews on a single day (29 Sep 2026) saying Instagram had disabled their accounts for "Account Integrity" ([App Store India](https://apps.apple.com/in/app/id389801252)). When that happens, an Instagram-based Underdawg page breaks.
- **The artists-only community** has no cross-discipline Indian test. Outside India it echoes Ello and Cara.

Vanity metrics mislead too. Koo claimed 60M "users" against 10M monthly users at its peak.

CHART: failed-funding — Funding did not buy survival in India: Chingari ($88M), Koo ($65M), Trell ($64M), Eloelo ($50M+), Rigi ($25M) and FrontRow ($18M) all shut, shrank or pivoted
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Chingari (shrinking; ≈ ₹733 crore at ₹83 per US$) | 88.34 | USD million raised | Chingari | 2023-02 | https://inc42.com/company/chingari/ |
| Koo (shut Jul 2024; ≈ ₹540 crore) | 65 | USD million raised | Koo | 2024 | https://www.moneycontrol.com/news/technology/future-salaries-can-only-be-paid-out-once-koo-finds-a-buyer-co-founder-mayank-bidawatka-12708326.html |
| Trell (shrinking; ≈ ₹528 crore) | 63.64 | USD million raised | Trell | 2021-07 | https://inc42.com/company/trell/ |
| Eloelo (pivoted to micro-dramas; "$50M+") | 50 | USD million raised | Eloelo | 2026-10-01 | https://entrackr.com/exclusive/exclusive-eloelo-kicks-off-series-b-round-with-13-mn-8933673 |
| Rigi (pivoted; ≈ ₹208 crore) | 25 | USD million raised | Rigi | 2023-01 | https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/ |
| FrontRow (shut Jun 2023; ≈ ₹149 crore) | 18 | USD million raised | FrontRow | 2023-07-10 | https://techcrunch.com/2023/07/10/frontrow-shutdown |
| One Impression (pivoted; ≈ ₹91 crore) | 11 | USD million raised | One Impression | 2023-03 | https://inc42.com/company/one-impression/ |
| Unluclass (seed; domains parked) | 1.2 | USD million raised | Unluclass | 2021 | https://inc42.com/buzz/celebrity-focussed-skilling-engagement-platform-unlu-bags-seed-round-from-nexus-others/ |
| Qoohoo (domain parked; ≈ ₹6.6 crore) | 0.8 | USD million raised | Qoohoo | 2023-04 | https://inc42.com/company/qoohoo/ |
| Gigstart (site down; ≈ ₹1.7 crore) | 0.21 | USD million raised | Gigstart | 2014-12 | https://inc42.com/company/gigstart/ |

The sources report these sums in US dollars. The rupee figures are the notes' approximations at ₹83 per US$. VerSe, the parent of Josh, is left out because its "nearly $1.5 Bn" covers the whole group, not Josh alone.

### Lessons Underdawg should learn

- **Payout trust matters more than feature count.** In India the standard brand payment cycle is 90 days and delays run up to a year, by trade reporting with anonymous sources ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm)). Reviews of one Indian creator tool allege blocked withdrawals. Outside India, Talenthouse and Paddle8 failed artists on money. Hold brand money in escrow before work starts, ring-fence client funds, publish payout timelines, and do KYC at sign-up. Under the RBI's 2025 Directions only an authorised payment aggregator may hold merchant funds in escrow, so the escrow must run through a licensed partner ([RBI Directions, full text via TaxGuru](https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html)).
- **Never make the Instagram API the only source of value.** India has already lost one platform to a ban and saw Linktree go dark for days. Require professional accounts at onboarding. Cache each artist's portfolio so the page survives an Instagram outage or ban. Collect fan contacts (email, phone, WhatsApp opt-in) so the audience relationship also lives on Underdawg.
- **Novelty is not retention.** Koo claimed 60M users but peaked at 10M a month. Moj's daily users fell from 9.24 million to 2.16 million in two years. Outside India, Ello kept about 20% of sign-ups after one week. Measure week-4 retention and real outcomes (bookings, gigs, paid deals), not sign-ups.
- **Artists leave where they cannot earn, and beginners resent paywalls.** The Indian platforms that earn real revenue charge brands, ticket buyers or learners. Cara, outside India, has no artist income at all. Charge the demand side (brands, hirers, organisers) or take a small cut of success, rather than charging unknown artists first.
- **Keep Live Rooms as scheduled, ticketed sessions** (classes, workshops, critiques) that end when they end. Leher, Eloelo and FrontRow show that always-on live and celebrity content did not last in India, while Artium and Muzigal earn ₹14–28 crore a year from live teaching by working musicians. Instagram and YouTube will stay the default for free live.
- **Never take AI-training rights, and make "no AI training" the default.** Instagram gave users in India no opt-out from AI training in 2024 ([Social Media Today, 9 Jun 2024](https://www.socialmediatoday.com/news/meta-posts-for-ai-training-cannot-opt-out/718410/)). EyeEm pushed artists away with a policy shock, and Cara's surge shows how fast artists move. Publish stable policies early, and cap hosting costs before any surge.
- **Promise portability and continuity.** Bento deleted user data when its buyer closed it, and JioSaavn closed its indie label. Offer one-click export, backups and a public pledge on what happens to artists' work if the company is sold.
- **India-first is not a moat.** Koo, FrontRow, Rigi and the short-video apps all raised large sums and still shut, shrank or pivoted, while Instagram's Indian reach grew 22.9% in a year. Complement Instagram, stay capital-light, and earn revenue early.

---

*Evidence labels used in this part: **[V]** = verified on the cited page. **[CC]** = company claim, seen on the page but not independently checked. **[2nd]** = secondary source (press or Wikipedia reporting another source). **[INF]** = inference by the research team, not a fact. **[A]** = assumption that must be tested. Dates are publication or data dates. Where nothing reliable was found, the text says "No reliable public data found."*

## 6. Discovery principles

### Every large platform now gives new work a first audience, but none proves it helps newcomers

In India, discovery for small creators runs on two platforms. Instagram's ad reach in India is **481 million**, up 22.9% in a year. YouTube's is **500 million** ([DataReportal, 5 Nov 2025](https://datareportal.com/reports/digital-2026-india)) [V]. Both now show each new piece to a small audience first. If that audience responds, more people see it. Both also run programmes for small Indian creators.

Instagram changed its ranking on 30 April 2024. It admitted then that **"creators with large followings and aggregators of reposted content have gotten more reach in recommendations than smaller, original content creators"** ([Engadget, 30 Apr 2024](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html)) [V].

Two facts limit what we can learn. **No platform publishes a controlled measure of newcomer exposure, in India or anywhere else.** No reliable Indian data was found on organic reach per post by follower tier. And some platforms now **charge for the fair shot**, including in India.

| Platform in India | Mechanism | How it exposes new creators | Evidence of effect in India | Criticism / limits | Source |
|---|---|---|---|---|---|
| Instagram | Ranking change (30 Apr 2024) | New content shown "to a small audience... regardless of whether they follow the account", then widened [V] | No outcome data published | Instagram's own admission that big accounts got more reach [V] | [Engadget, 30 Apr 2024](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html) |
| Instagram | Trial Reels (10 Dec 2024) | Reels shown first only to non-followers [V] | No Indian data. Globally, 40% of creators who tried it posted more Reels; of those, 80% saw more non-follower reach [CC, via press] | Eligibility rules unclear | [Instagram, 10 Dec 2024](https://creators.instagram.com/blog/instagram-trial-reels); [Social Media Today, 8 Jun 2025](https://www.socialmediatoday.com/news/instagram-trial-reels-increase-reach-tests/750121/) |
| Instagram | Creator marketplace (India added 21 Feb 2024) | Brands filter creators by audience and message them about paid work [V] | No Indian adoption data found | Invitation-only | [TechCrunch, 21 Feb 2024](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/); [afaqs, Feb 2024](https://www.afaqs.com/news/social-media/instagram-creator-marketplace-launches-in-india) |
| Meta | Edits Film Festival for India (24 Aug to 8 Oct 2026) | A jury picks the top 10–20 Reels for a screening and a showcase on @metaindia [V] | Not yet known | No cash prize stated. A contest, not paid work [INF] | [Meta, 24 Aug 2026](https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/) |
| YouTube | Hype (India launch 17 Jul 2025) | Viewers hype up to 3 videos a week in the first 7 days; channels with 500–500,000 subscribers; "the fewer the subscribers... the more bonus points" [V] | No Indian outcome data. The 4-week beta in Turkey, Taiwan and Brazil logged 5M+ hypes across 50,000+ channels [CC]: participation, not outcomes | **Paid hypes tested** in Brazil and Turkey [V] | [Business Today, 17 Jul 2025](https://www.businesstoday.in/technology/news/story/small-content-creators-just-got-a-big-boost-with-youtubes-hype-485045-2025-07-17); [BuzzInContent, 15 Jul 2025](https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785); [TechCrunch, 26 Aug 2025](https://techcrunch.com/2025/08/26/youtubes-hype-feature-that-boosts-smaller-creators-launches-globally) |
| JioSaavn | ArtistOne Finds playlist (Aug 2025) | A playlist "curated exclusively from submissions made by artists"; over a dozen artists had fewer than 1,000 monthly listeners and none had more than 30,000 [2nd] | No outcome data | One playlist of 30 songs. JioSaavn shut its own indie label, Artist Originals, in the first half of 2022 [2nd] | [Music Ally, 13 Aug 2025](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/) |
| Spotify | Recommendations (India, 2025 data) | Listeners "discovered" unfamiliar Indian artists 12.8 billion times [V] | Fan discovery works at scale | Listeners only, not bookers or brands [INF]. In 2025, "higher minimum stream count thresholds reduced revenues for some creators" [V] | [Spotify, 2 Sep 2026](https://newsroom.spotify.com/2026-09-02/india-loud-and-clear-report/); [FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf) |
| BandLab | "Boost" (sold in India) | Paid promotion of a track | No reliable public data found | **Pay-for-reach**: ₹299 to ₹999 [V] | [App Store India](https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775) |

Three lessons follow [INF].

1. A "first audience" is now standard in India. Having one is not a differentiator. **Who the first audience is** can be.
2. Human selection for newcomers exists in India only in very small lanes: one 30-song playlist and a festival of 10–20 Reels. None leads to paid work.
3. The industry is **monetising the fair shot**. In India, BandLab sells "Boost" for ₹299 to ₹999, and YouTube has tested paid hypes in other countries.

**Outside India (background only).** These examples show design choices that no Indian platform has tested yet.

| Platform | What it does | Lesson for Underdawg [INF] | Source |
|---|---|---|---|
| SoundCloud First Fans | Plays a new track to about 100 taste-matched listeners, up to 1,000 if it performs. Sits behind paid tiers ($3.25 and $8.25 a month) [V] | A first audience can be built, but it has been put behind a paywall | [MBW, 29 Jun 2023](https://www.musicbusinessworldwide.com/soundcloud-tackles-zero-plays-problem-with-ai-powered-first-fans-feature/); [MBW, 17 Dec 2024](https://www.musicbusinessworldwide.com/soundcloud-launches-3-25-a-month-artist-tier-targeting-emerging-and-aspiring-musicians/) |
| Spotify Discovery Mode | Artist accepts a commission on streams for an algorithmic boost [V] | Paid reach was called "payola" by the Future of Music Coalition [V]; a class action went to arbitration on 30 Apr 2026 [V] | [Spotify](https://artists.spotify.com/discovery-mode); [Music Ally, 13 Mar 2023](https://musically.com/2023/03/13/future-of-music-coalition-slams-spotify-discovery-mode-expansion/); [Music Ally, 5 May 2026](https://musically.com/2026/05/05/spotify-discovery-mode-payola-lawsuit-to-move-into-arbitration/) |
| DeviantArt Daily Deviations | Staff and volunteers feature work daily; **one feature per artist per year** [V] | Human curation works with an anti-concentration rule | [DeviantArt Help](https://www.deviantartsupport.com/kb/en/article/what-are-daily-deviations-and-how-can-i-suggest-art-for-a-daily-deviation-feature) |
| Behance curated galleries | Curators review each project once; criteria include "traction" [V]; Pro includes a paid "Boost" [V] | Curation fails when it keys off traction | [Behance Help](https://help.behance.net/hc/en-us/articles/204483974-How-are-the-Best-of-Behance-aka-Featured-Projects-Selected-); [Behance Pro](https://www.behance.net/pro) |
| ArtStation Trending (2017) | Votes weighted by the voter's follower count [V] | Follower-weighted votes build popularity into "quality" | [ArtStation, 3 May 2017](https://magazine.artstation.com/2017/05/updated-trending-algorithm-diversity-quality/) |

### Popularity bias is measured, admitted, and growing in paid work

Indian evidence shows the same pattern at every level: a few earn, most do not.

- **Who earns at all.** India has 2 to 2.5 million active creators with over 1,000 followers. Only **8–10%** "monetize their content effectively" ([PIB on the BCG report, 2 May 2025](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)) [V]. BCG's own page words it differently and calls the 2 to 2.5 million "monetized content creators" ([BCG, 3 May 2025](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy)) [V]. Kofluence estimates 450,000 to 600,000 monetising creators out of 3.5 to 4.5 million ([IBTimes India, 8 Jul 2025](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [CC].
- **Size decides.** In India, 10% of nano YouTube creators monetise against 95% of mega creators ([Kofluence, 3 May 2024](https://www.kofluence.com/blog/how-much-money-indian-creators-really-make/)) [CC]. On YouTube, "90% of subscriptions" come "from under 5% of channels" ([Kotak MF citing Citi, 27 Nov 2025](https://www.kotakmf.com/Information/blogs/inside-india-creator-economy)) [2nd; original not opened].
- **Most creators are small.** 61.1% of Indian creators are nano (1,000–10,000 followers) and 32.5% are micro ([Storyboard18 on Kofluence, 14 May 2026](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [CC, via press].
- **Musicians.** 69% of authors and composers paid by IPRS received under ₹25,000 a year. About 6% received more than ₹6 lakh ([EY, Dec 2023, p.27](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)) [V].
- **Visual art.** Indian art auctions reached ₹2,543 crore in 2025. Contemporary art was only ₹163 crore of that. Post-War art took ₹1,647 crore and Modern art ₹701 crore ([Business Today on 360 ONE, 13 Sep 2026](https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13)) [2nd]. The auction boom is not income for living, unknown artists [INF].

CHART: india-yt-monetise-by-tier-s6 — In India, 10% of nano YouTube creators monetise, against 95% of mega creators (Kofluence, company claim)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Nano (1K–10K subscribers) | 10 | % of creators who monetise | Kofluence (company claim) | May 2024 | https://www.kofluence.com/blog/how-much-money-indian-creators-really-make/ |
| Micro (10K–100K) | 30 | % of creators who monetise | Kofluence (company claim) | May 2024 | https://www.kofluence.com/blog/how-much-money-indian-creators-really-make/ |
| Macro (100K–500K) | 85 | % of creators who monetise | Kofluence (company claim) | May 2024 | https://www.kofluence.com/blog/how-much-money-indian-creators-really-make/ |
| Mega (over 500K) | 95 | % of creators who monetise | Kofluence (company claim) | May 2024 | https://www.kofluence.com/blog/how-much-money-indian-creators-really-make/ |

Small Indian accounts are not ignored by their followers. Nano creators have the highest engagement rate in India, about 4%, against about 2% for mega creators ([EY, Apr 2024, p.9](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) [V]. So "small accounts get no response" is false. "Small accounts get too little reach and money to build a career" is supported [INF].

The same concentration shows up in **paid work**, which matters most for Underdawg.

- Brands "allocate larger budgets to creators with larger followings and give smaller creators barter collaborations" ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [2nd]. One creator with 54,600 followers said: "You can't pay bills with lipstick or perfume."
- A nano creator gets ₹500 to ₹5,000 per Reel. A mega creator starts at ₹2 lakh per collaboration ([Kofluence, 27 Jun 2025](https://www.kofluence.com/blog/2025-influencer-marketing-report-sneak-peek/)) [CC].
- 50.4% of creators say "limited brand collaboration opportunities" are their main obstacle ([Storyboard18 on Kofluence, 14 May 2026](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [CC, via press].
- Yet 47% of Indian brands say they prefer micro and nano influencers ([EY, Apr 2024](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf)) [V]. Stated preference and actual money do not match [INF].

No reliable Indian data was found on the share of rupee spend that goes to nano and micro creators, or on how that share is changing.

There is real counter-evidence. Spotify logged **12.8 billion discovery events for unfamiliar Indian artists in 2025**, and 11 of the 15 most exported Indian songs came from artists outside film soundtracks ([Spotify, 2 Sep 2026](https://newsroom.spotify.com/2026-09-02/india-loud-and-clear-report/)) [V]. Non-film music was 43% of Indian streams in 2025 ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [V]. Fan discovery works at scale in India. Underdawg should not compete with it. It should add what streaming and Reels lack: being found by bookers, brands, curators and collaborators [INF].

**Outside India (background only).** Three points have no Indian measurement yet.

- **Trend in brand money.** CreatorIQ data on 65,000 payments shows the top 10% of creators received 62% of brand ad payments in 2025, up from 53% in 2023 ([Business Insider, 14 Jan 2026](https://www.businessinsider.com/creator-income-inequality-grows-top-earners-paydays-rise-2026-1)) [2nd]. This is not Indian data.
- **Reach by account size.** An Instagram benchmark panel shows the median Reel from a 1–5K account gets about 580 views, against 16,035 for a 100K–1M account ([Socialinsider, 20 Feb 2026](https://www.socialinsider.io/social-media-benchmarks/instagram)) [V]. This is not Indian data.
- **Research on fixes.** A survey of 123 papers on popularity bias found only one field test ([Klimashevskaia et al., 2024](https://arxiv.org/pdf/2308.01118)) [V]. Spotify research found fairness-aware ranking gave 9–21% gains in satisfaction estimates, but only offline ([Spotify Research, Oct 2018](https://research.atspotify.com/towards-a-fair-marketplace-trade-off-between-relevance-fairness-satisfaction-in-recsys/)) [V]. Fair exposure need not destroy relevance. Underdawg must still run its own tests in India.

### Fair-discovery mechanisms Underdawg should use

Each mechanism below has a working precedent. None has published proof of outcomes. The second column is our recommendation [INF].

| Mechanism | How Underdawg would apply it [INF] | Precedent (India first) | Main risk |
|---|---|---|---|
| **First-audience queue** | Every new work goes free to a small matched group: peers in the discipline **plus at least one opportunity-giver** (curator, booker, brand scout). It widens on saves, shares and curator picks, never on follower count | Instagram small-audience-first ranking (used in India). Outside India: SoundCloud First Fans | Reviewer time; needs bot and quality checks; must never be paywalled |
| **Newcomer bonus with a ceiling** | A boost that is larger for smaller artists and switches off above a size limit | YouTube Hype, in India since 17 Jul 2025 ([Business Today](https://www.businesstoday.in/technology/news/story/small-content-creators-just-got-a-big-boost-with-youtubes-hype-485045-2025-07-17)) | Fake accounts gaming it |
| **Exposure caps and rotation** | One featured slot per artist per period on any featured surface; rules published | JioSaavn ArtistOne Finds: no artist above 30,000 monthly listeners ([Music Ally](https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/)). Outside India: DeviantArt yearly cap | Frustrates top artists |
| **No paid reach in organic discovery** | Pro sells tools, never ranking or contact access; any paid promotion labelled and separate | Meta withdrew "increased reach" from Meta Verified on 17 Mar 2023 ([Meta](https://about.fb.com/news/2023/02/testing-meta-verified-to-help-creators/)), before it launched in India at ₹699 a month on mobile ([Meta, 7 Jun 2023](https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/)) [V] | Limits Pro revenue |
| **No follower-weighted votes** | Endorsements count equally, or are weighted by verified expertise with a cap | No Indian example found. Outside India, an anti-pattern: ArtStation 2017 | Expertise weighting can create a new elite |
| **Blind first round; newcomer slots** | Opportunity-givers first see work and quote, not follower counts; every shortlist reserves slots for artists with few completed jobs | No Indian example found. Outside India: Upwork "Rising Talent" ([Upwork Help](https://web.archive.org/web/20251123131903/https://support.upwork.com/hc/en-us/articles/360049702614-Learn-about-Upwork-s-talent-badges)) | Buyers may resist hidden metrics |
| **Fit-based default sorting** | Search defaults to craft, style, city, language, availability and budget | 83% of Indian marketers struggle with influencer discovery, and 51% expect a rise of niche micro-influencers ([WPP Media on Goat/Kantar, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity); [MediaBrief, 24 Jun 2025](https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/)) [2nd] | "Less safe" results for nervous buyers |
| **Fairness as a KPI; live tests** | Track the share of views, shortlists and income going to artists below a follower threshold; A/B test outcomes, not views | No Indian example found. Outside India: Spotify adaptive policies (offline only) | Over-correction hurts relevance |

### Does the current plan deliver discovery? No.

**The current plan does not deliver discovery for under-discovered artists.** It is a monetisation toolkit for artists who already have an Instagram audience. It leaves discovery to Instagram's algorithm, which Instagram says favoured large accounts [INF, based on the facts below].

| Planned feature | Reaches people who don't know the artist? | Why |
|---|---|---|
| Link-in-bio page | No | Visitors come from the artist's own profile. Indian tools already sell this: Topmate puts sessions and products behind one link for a 10% commission ([Topmate](https://topmate.io/pricing)) [V]. Linktree had about 7.3 million Indian visits in July 2025 ([TechCrunch, 18 Aug 2025](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)) [2nd] |
| DM automation | No | Meta lets an app message a user only after that user has messaged first, within 24 hours ([Meta for Developers](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/)) [V] |
| Shop, downloads, tips, Fan Club, tickets | No | They monetise existing fans. Even Instagram Gifts need 500 followers in India ([WebHippo, citing Meta](https://webhippo.in/blog/instagram-monetization-india)) [2nd] |
| Live Rooms | Only with a discovery surface | Followers are the default audience |
| Bookings, Hire Artists, Gigs | **Yes, conditionally** | Only if opportunity-givers are on the platform and ranking is by fit. The plan's one real lever |
| Pro plan | Neutral; harmful if it sells reach | Must sell tools, not visibility |

**Monetisation tools pay out in proportion to the audience an artist already has.** So the already-popular gain most. Without a discovery layer, Underdawg becomes "a better Linktree for Indian artists". That market is crowded, and it inverts the brand promise [INF].

A discovery surface does **not** need to be a consumer feed. India has already tested that idea. India banned TikTok on 29 June 2020 ([Wikipedia](https://en.wikipedia.org/wiki/Censorship_of_TikTok)) [2nd]. Indian feed apps were built to replace it and raised large sums; Chingari alone raised $88.34 million ([Inc42](https://inc42.com/company/chingari/)) [2nd; indicative]. They then lost most of their users. Moj fell from 9.24 million daily users in January 2021 to 2.16 million in January 2023, and Josh from 5.77 million to 1.11 million ([MediaNews4U, citing Apptopia via Inc42, 2023](https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/)) [2nd]. Instagram launched Reels in India in July 2020 ([Wikipedia: Instagram](https://en.wikipedia.org/wiki/Instagram)) [2nd] and now reaches 481 million Indians. Indian creators follow reach [INF]. Underdawg should build discovery **for opportunity-givers**: a review queue, a digest of new work, and fit-based search [INF].

CHART: india-short-video-dau-s6 — India's replacement feed apps lost most of their daily users within two years: Moj fell from 9.24M to 2.16M
Type: grouped bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Moj | 9.24 | million daily active users | Apptopia via Inc42 (reported by MediaNews4U) | Jan 2021 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| Moj | 3.14 | million daily active users | Apptopia via Inc42 (reported by MediaNews4U) | Jan 2022 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| Moj | 2.16 | million daily active users (including MX TakaTak) | Apptopia via Inc42 (reported by MediaNews4U) | Jan 2023 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| Josh | 5.77 | million daily active users | Apptopia via Inc42 (reported by MediaNews4U) | Jan 2021 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| Josh | 1.11 | million daily active users | Apptopia via Inc42 (reported by MediaNews4U) | Jan 2023 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| ShareChat | 8.27 | million daily active users | Apptopia via Inc42 (reported by MediaNews4U) | Jan 2021 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |
| ShareChat | 5.33 | million daily active users | Apptopia via Inc42 (reported by MediaNews4U) | Jan 2023 | https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/ |

## 14. Features Underdawg is missing

### Each missing feature answers a ranked, evidenced artist problem

The research team ranked artist problems by evidence. The ones these features address are: (2) discovery gated by algorithms that favour scale, **strong evidence**; (3) AI scraping and flooding, **strong**; (4) platform dependency, **strong**; (5) pay-to-play visibility, **moderate to strong**; (7) scams and fake opportunities, **moderate**; (8) weak access to paid opportunities, **moderate to weak**; and (9) art theft, **moderate to weak**.

Indian sources confirm five complaints.

| Complaint | Indian evidence |
|---|---|
| Hard to land paid work | 50.4% of creators name "limited brand collaboration opportunities" as their main obstacle ([Storyboard18 on Kofluence, 14 May 2026](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [CC, via press] |
| Late payment and non-payment | The standard brand payment cycle is 90 days and delays run up to a year, per anonymous agency sources ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm)) [2nd]. Karnataka's culture department owed over 1,800 artists more than ₹4 crore ([The Indian Music Diaries, 4 Mar 2026](https://theindianmusicdiaries.com/are-payment-delays-silencing-the-voices-of-independent-music/)) [2nd] |
| Unpaid "exposure" work and barter | Opening acts "rehearse, travel, and perform" for little or nothing "in the promise of exposure" ([Rolling Stone India, 12 Sep 2025](https://rollingstoneindia.com/what-the-music-industry-doesnt-talk-about-enough-minimum-wage-for-musicians)) [2nd]. Small creators are offered barter instead of money (section 6) |
| Scams aimed at artists | A fake casting director on Instagram cheated 15 aspiring models in Delhi, charging ₹20,000 for a portfolio and ₹75,000 for a "selection shoot" ([The Tribune, 14 Jan 2024](https://www.tribuneindia.com/news/delhi/man-posing-as-casting-director-dupes-15-aspiring-models-in-delhi-581182)) [2nd]. Pune videographers warned each other about fake "urgent shoot" gigs ([r/pune, 4 Jun 2025](https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/)) |
| Rate uncertainty | A micro creator's Reel is quoted anywhere from ₹2,000 to ₹80,000 ([Kofluence, 22 Jul 2026](https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/)) [CC]. There is no India-specific rate guide for illustrators ([Aparajitha Vaasudev, 19 Aug 2026](https://studioapara.substack.com/p/india-has-no-illustration-agents)) [V; a practitioner's essay] |

**No Indian survey ranks these needs against each other.** No reliable Indian data was found on the incomes of visual artists, illustrators, photographers or dancers, or on how they find clients. In the table below, "Indian evidence" and "Who does it today" are cited facts. "Gap" and "Discovery value" are inferences [INF].

| # | Feature | Artist problem | Indian evidence | Who does it today (India first) | Gap [INF] | Discovery value [INF] |
|---|---|---|---|---|---|---|
| M1 | **First-audience queue**: each new work shown free to matched peers and opportunity-givers | New work gets no audience (2) | 61.1% of Indian creators are nano ([Storyboard18](https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm)) [CC, via press]; only 8–10% monetise effectively ([PIB](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106)) [V]. No Indian data on reach per post by tier | Instagram (small audience first); YouTube Hype; JioSaavn ArtistOne Finds (music, 30 songs). Outside India: SoundCloud (paid tiers) | No free, cross-discipline version whose first audience includes curators and bookers | **Very high**: unknown work reaches people who can act |
| M2 | **Newcomer bonus, caps, rotation**, published | Big accounts dominate (2, 5) | Instagram admits large accounts got more reach ([Engadget](https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html)) [V]; Indian brands give bigger budgets to bigger followings and barter to small creators ([The Nod Mag](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [2nd] | YouTube Hype (India); JioSaavn ArtistOne Finds. Outside India: DeviantArt; Upwork Rising Talent | No artist-first platform publishes a full fairness policy | **High**: stops "rich get richer" on Underdawg |
| M3 | **Curator review queue** (playlisters, bloggers, gallery scouts, festival programmers); response deadline; **no artist pay-per-pitch** | Gatekeeper access costs money (5) | A Mumbai musician says visibility is governed by "editorial playlists, paid advertising, and platform partnerships" ([The Indian Music Diaries, 26 Sep 2025](https://theindianmusicdiaries.com/who-gets-to-stay-indie-the-struggles-behind-the-indian-independent-music-scene/)) [2nd]. Comedy open mics charge the comedian ₹200–500 a slot ([BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india)) [2nd; blog]. No Indian curator-marketplace data found | JioSaavn ArtistOne Finds (free submissions, music only); India Art Fair's selection committee ([India Art Fair](https://indiaartfair.in/about)) [V]. Outside India: Groover, SubmitHub, Musosoup (artist pays) | None India-focused or multi-discipline. **Indian curator supply untested** | **Very high**: curator discovery, credibility |
| M4 | **India-first opportunity board**: open calls, grants, fest competitions, brand briefs; verified organisers; "free to apply" filter | Opportunities scattered, fee-laden, unsafe (7, 8) | ArtConnect's India filter showed listings in the US, France and Iceland ([ArtConnect, 1 Oct 2026](https://www.artconnect.com/opportunities?country=IN)) [V]. IFA lists its grants on its own site ([IFA](https://indiaifa.org/india-foundation-arts.html)) [V]. British Council India's arts page listed no open calls ([British Council](https://www.britishcouncil.in/programmes/arts)) [V]. Fake auditions took ₹1,000 each by Google Pay ([BOOM, 19 Jan 2022](https://www.boomlive.in/explainers/bollywood-casting-director-shares-how-fake-accounts-impersonate-him-to-dupe-actors-16434)) [2nd] | IFA, festivals and college fests on separate sites; StarClinch's "Artist Jobs" board (performers); WhatsApp and Facebook groups. Outside India: ArtConnect | No verified India aggregator. **Plausible, not proven** | **High**: organisers can also invite artists |
| M5 | **Opportunity-giver search** by skill, style, city, language, availability, budget; ranked by fit | Brands can't find unknown talent (8) | 83% of Indian marketers struggle with influencer discovery ([WPP Media on Goat/Kantar, 10 Jun 2025](https://www.wppmedia.com/news/influencing-with-integrity)) [2nd]; 62% of surveyed creators did not know brands had tried to reach them ([MediaBrief on HashFame, 27 May 2025](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [CC]; 70% of Indian brands plan bigger creator budgets ([Storyboard18 citing BCG, 4 May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm)) [2nd] | Kofluence, Qoruz (brand-side); Talentrack, IndieFolio (managed); StarClinch (performers); Instagram creator marketplace (India since 21 Feb 2024) ([TechCrunch](https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/)). Outside India: Behance Recruiter Pro, Contra | Cross-discipline, India-local, fit-ranked search for small artists is unserved | **Very high**: skill, local, brand discovery |
| M6 | **Talent-scouting dashboard** with pre-traction signals | Scouts see only artists with traction (2) | Qoruz and Kofluence sell creator analytics to brands and earned ₹56.4 crore and ₹52.5 crore in FY25 ([Inc42](https://inc42.com/company/qoruz/); [Inc42](https://inc42.com/company/kofluence/)) [2nd; indicative] | Qoruz, Kofluence. Outside India: Chartmetric, Soundcharts | Pre-traction signals uncaptured; possible B2B revenue | **High, only with density** |
| M7 | **Cross-discipline collaboration briefs** | Collaborators found via personal networks | Indian artists use "Facebook groups and WhatsApp networks for regional artist circles" ([StarClinch blog, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/)) [CC]. No Indian data on demand for cross-discipline collaboration | BandLab (music only; Pro sold in India at ₹1,499 a month) ([App Store India](https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775)) [V] | Unclaimed, but **the least-evidenced need**; validate first | Medium to high |
| M8 | **Credits graph** linking each work to all contributors | Reposts strip credit (9) | Indian session musicians often get neither royalty nor credit ([Rolling Stone India, 12 Sep 2025](https://rollingstoneindia.com/what-the-music-industry-doesnt-talk-about-enough-minimum-wage-for-musicians)) [2nd]. IPRS paid royalties to "more than 13,700" of its 23,943 members in FY2025–26 ([IPRS, Sep 2026](https://iprs.org/wp-content/uploads/2026/09/Annual_Report_FY2025-26.pdf)) [V] | Instagram repost labels and originality rules ([PetaPixel, 30 Apr 2026](https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/)); IPRS set lists (music only). Outside India: Bandcamp | No cross-discipline graph routes discovery to contributors | Medium to high |
| M9 | **Human-made evidence** (process files, C2PA credentials, attestation, reporting) and a filter for opportunity-givers | AI flooding (3) | India's 2026 IT Rules require "a clear and noticeable label" on AI-generated visual content ([SCC Online, 12 Feb 2026](https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/)) [2nd]. A government committee proposes that AI firms may train on all lawfully accessed works, and rights holders "will not have the option to withhold their works" ([DPIIT, Dec 2025](https://www.dpiit.gov.in/static/uploads/2025/12/ff266bbeed10c48e3479c941484f3525.pdf)) [V]. Indian illustrators and musicians report clients using AI to cut fees ([The Established, 21 Apr 2025](https://www.theestablished.com/culture/living/who-can-really-claim-to-be-an-artist-when-the-medium-is-a-machine)) [2nd]. No Indian survey of artists' losses to AI was found | No Indian platform was found that verifies human-made work. Outside India: Cara, Bandcamp's ban (Jan 2026), Adobe Content Credentials | Detection alone is fragile. Claim "evidence of human process", not "no AI". Dated records of authorship would help artists claim royalties if the DPIIT proposal becomes law | Medium to high: trust filter |
| M10 | **Peer critique and pro portfolio reviews** ("give 3, get 1"); reviewers can nominate into M1 | Lack of credible feedback | 73% of 500 Indian music creators strongly feel they have much to learn about production, and 56% about monetisation ([EY, Dec 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)) [V]. "India has zero illustration agencies" ([Aparajitha Vaasudev](https://studioapara.substack.com/p/india-has-no-illustration-agents)) [V; a practitioner's essay]. No India-specific critique marketplace was found | Artium Academy (teacher feedback inside paid music lessons; 45,000+ learners [CC]) ([Artium](https://artiumacademy.com)); Topmate "Priority DM" (paid questions; career and tech experts). Outside India: Groover, ADPList, Skeb | **Modifies the planned Show & Review** | Medium; high if linked to nominations |
| M11 | **Challenges** with transparent judging and guaranteed pay or prizes | Spec work without pay | Unpaid "exposure" slots and barter are reported by Indian musicians and creators (table above). Mood Indigo's Livewire drew 200+ bands in 2012 ([Wikipedia](https://en.wikipedia.org/wiki/Mood_Indigo_(festival))) [2nd]. Meta's Edits Film Festival states no cash prize | College fests; Kyoorius; Instagram's India Edits Film Festival ([Meta, 24 Aug 2026](https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/)) | No trusted paid cross-discipline platform in India | High: merit-based surfacing |
| M12 | **Local scene layer**: city pages, gig calendar, booker search by city | Local discovery runs on word of mouth | BookMyShow listed 34,086 live events in 2025 ([Music Ally, 11 Dec 2025](https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/)) [CC, via press]. Ticket sales are concentrated in the top 10 metros ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [V]. No Indian survey shows how organisers find artists | BookMyShow, District (fan-to-show); StarClinch (bookings). Outside India: Bandsintown | Booker-to-unknown-artist direction unserved | High for local discovery |
| M13 | **Showcases** with paid slots | Hard to get stage time | Indian club gigs pay a "token fee" ([Rolling Stone India, 13 Jul 2022](https://rollingstoneindia.com/heres-what-its-really-like-to-be-an-indian-indie-artist-playing-live-gigs/)) [2nd]. New comedians pay ₹200–500 to perform ([BuddyOnStage](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india)) [2nd; blog] | College fests; open mics; Ziro Festival, which stresses "emerging acts from Northeast India" ([Wikipedia](https://en.wikipedia.org/wiki/Ziro_Festival_of_Music)) [2nd]. Outside India: Sofar Sounds | No India pipeline found; must pay artists | Medium to high |
| M14 | **Capped boosts** for small artists only | Likes move nothing | YouTube Hype gives Indian viewers three free hypes a week, and smaller channels get bonus points ([BuzzInContent, 15 Jul 2025](https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785)) [V]. No Indian outcome data | YouTube Hype | Not on artist-first platforms | Medium; favours artists with fans |
| M15 | **Published no-pay-for-reach policy** | Distrust of paid placement (5) | BandLab sells "Boost" in India for ₹299–₹999 ([App Store India](https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775)) [V]. Indian musicians name "paid advertising" as a gate to visibility ([The Indian Music Diaries](https://theindianmusicdiaries.com/who-gets-to-stay-indie-the-struggles-behind-the-indian-independent-music-scene/)) [2nd] | No checked competitor | A policy; limits Pro revenue | Indirect but high: trust |
| M16 | **Portable portfolio and owned contacts** (cache, export, email and WhatsApp opt-in) | Platform dependency (4) | India banned TikTok on 29 June 2020 and its Indian replacements later shrank (section 6). Linktree was unreachable in India for several days in August 2025 ([TechCrunch, 18 Aug 2025](https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/)) [2nd]. A Jabalpur creator lost ₹50 lakh to fake copyright strikes on Instagram ([The Tribune, 23 Oct 2025](https://www.tribuneindia.com/news/trending/pay-rs-50-lakh-or-lose-instagram-page-in-a-first-influencer-with-57-million-followers-falls-victim-to-fake-copyright-scam)) [2nd]. Meta ended the Basic Display API on 4 Dec 2024 ([Meta](https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/)) [V] | Link-in-bio tools | An Instagram-only profile breaks if the account is disabled | Low directly; protects inventory |

CHART: india-discovery-gap-s14 — Both sides of the Indian market say they cannot find each other: 83% of marketers struggle to discover creators, and 50.4% of creators cite too few brand opportunities
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Marketers struggling with influencer discovery | 83 | % | Goat Agency / Kantar (via WPP Media) | Jun 2025 | https://www.wppmedia.com/news/influencing-with-integrity |
| Creators unaware brands tried to reach them | 62 | % | HashFame (company claim, via MediaBrief) | May 2025 | https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/ |
| Creators who lost deals to fake managers or unverified contacts | 55 | % | HashFame (company claim, via MediaBrief) | May 2025 | https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/ |
| Creators citing limited brand-collaboration opportunities as main obstacle | 50.4 | % | Kofluence (company survey, via Storyboard18) | May 2026 | https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm |
| Brands preferring micro and nano influencers | 47 | % | EY | Apr 2024 | https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf |

The chart shows why M5 and M3 matter. Indian marketers say they cannot find creators. Indian creators say they cannot find deals. Brand messages do not reach the creators they are meant for. The pain is **"nobody with influence sees my work, and I cannot tell who is real"**, not a lack of places to upload [INF]. The HashFame figures are a company survey with no published method, so treat them as indicative.

**Outside India (background only).** Two lessons come from markets that India has not tested.

- **Artists pay gatekeepers to be considered.** SubmitHub reports 1.6 million users and 1,776 curators, with 31% of submissions approved in the trailing month ([SubmitHub](https://www.submithub.com/help)) [CC]. Groover reports 600,000+ artists and 3,000+ curators and charges €2 per curator ([Groover](https://groover.co/en/)) [CC]. These services sell consideration, not exposure. Groover guarantees a reply, not effort, and generic feedback is a recurring complaint ([Trustpilot](https://www.trustpilot.com/review/groover.co)) [V]. An Underdawg queue would need reviewer quality scores [INF].
- **Open upload systems fill with AI work.** On Deezer, fully AI-generated tracks passed 50% of daily uploads in June 2026 ([Deezer, Jul 2026](https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/)) [CC]. No Indian upload data was found.

### The smallest set that would make discovery work

Discovery needs four builds and one policy. Remove any one and the loop breaks [INF].

1. **A fair-exposure surface (M1 + M2).** This creates exposure inside Underdawg.
2. **Verified opportunity-giver accounts with fit-based search (M5) and a curator queue (M3).** This creates the audience that matters. Without it, Underdawg becomes one more roster. Kofluence lists 750,000+ influencers (its page also shows 500,000+) ([Kofluence](https://www.kofluence.com)) [CC]. Its own CEO estimates that only 450,000 to 600,000 Indian creators monetise anywhere ([IBTimes India, 8 Jul 2025](https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077)) [CC]. Rosters in India are larger than paid work [INF].
3. **An India-first opportunity board (M4), merged with Hire Artists and Gigs.** This creates outcomes. Exposure without opportunity is vanity.
4. **A light human-made trust layer (M9).** Curators and brands need to trust what they find.
5. **The no-pay-for-reach policy (M15).** It costs nothing to build but limits how Pro earns.

Two design notes [INF]. M3, M10 and M11 can share **one "review" primitive**: a credible person looks at a work and can nominate it into M1. And **"artists-only" must mean artists-only supply plus verified opportunity-givers.** Otherwise M3, M4 and M5 cannot work. The other missing features (M6–M8, M12–M14) add value only once the network is dense.

## 20. Feature dependencies by scale

Each feature is listed where it **first delivers its intended value**. Some appear twice: a single-player version works early, and a network version later. F-numbers are the 18 planned features. M-numbers are the missing features from section 14. Dependency types are **liquidity** (enough opportunities and artists in the same city and craft), **community** (enough active givers and receivers), **ranking data**, and **curator supply**.

These thresholds are researcher estimates, **not measured facts** [A]. One Indian finding shapes them all: artists are abundant, and paying demand is scarce.

- StarClinch has booked artists since 2015. It reported about ₹2.4 crore of revenue in FY25, down 10.2% ([Inc42](https://inc42.com/company/starclinch/)) [2nd; indicative]. At its 15% fee, that implies about ₹16 crore of bookings a year [INF]. India's organised live-events segment was ₹14,500 crore in 2025 ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [V].
- Gigstart, an earlier Mumbai artist-booking startup, last reported revenue of ₹11.7 lakh in FY16 ([Inc42](https://inc42.com/company/gigstart/)) [2nd; indicative].
- Half of Indian creators say too few brand opportunities is their main obstacle (section 6).

So the real constraint is **opportunity-givers per city and craft**, not the number of artists [INF].

**Works at 1,000 artists** (single-player tools, rules, or hand-run services in one city)
- **F1 Instagram profile (import and curate):** a portfolio utility; no network needed.
- **F2 Verified credibility card:** needs only the artist's own login.
- **F3 Scheduling; F5 free templates; F6 DM automation:** work at any scale, but their value never grows with the network.
- **F4 Link-in-bio:** standalone; the main sharing surface.
- **F7 Shop-lite seller tools; F12 tips; F13 free downloads; F14 bookings:** single-player.
- **F8 Live Rooms as paid sessions:** only for the minority who teach.
- **F10 Show & Review peer loop:** works if artists sit in 2–3 disciplines and credits enforce "give to get" (community).
- **F11 Artist Boards, narrow:** staff-seeded scam-pattern library and Rate Check prompts; brand reviews would be too sparse.
- **F15 Event calendar linking out:** works if artists cluster in 1–2 cities.
- **F16 + F17 Hire Artists and Gigs as concierge:** staff source real briefs in one city and craft (liquidity); perhaps 20–50 gigs a month [A]. Typical small tickets are ₹3,000–15,000 for a café gig and ₹5,000–30,000 for a college fest ([StarClinch blog, 16 Dec 2025](https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/)) [CC].
- **M1 First-audience queue, hand-run:** recruited reviewers in a few disciplines (curator supply); no algorithm needed yet.
- **M4 Opportunity board, staff-curated:** seeded through partners such as IFA, festivals and college fests.
- **M2 caps, M15 policy, M9 light (AI declaration, no-training policy, reporting), M16 export:** rules and per-artist tools.

**Works at 10,000 artists** (density in 1–2 metros and 3–5 crafts, with seeded demand)
- **F1 and M5 as searchable inventory:** enough work per discipline and city for opportunity-givers to search.
- **F2 discipline and city benchmarks; M2 newcomer bonus:** need enough comparable artists (ranking data).
- **F4 brand-view loop; F7 cross-artist shop recommendations; F8 session directory; F13 asset discovery; F14 review and lesson marketplace:** need cross-artist inventory.
- **F10 paid pro and curator queue:** needs perhaps 50 reviewers for 10,000 artists (curator supply) [INF]. No Indian curator-marketplace data exists, so this ratio comes from outside India (see below).
- **F11 Rate Check benchmarks:** about 30+ data points per craft-city cell [A].
- **F15 and M12 local discovery:** need about 10,000 artists **per metro**, so nationally closer to the next tier.
- **F16 + F17 self-serve pilot:** viable in 1–2 cities and 3–5 crafts. A brand needs roughly 30–100 relevant artists per craft per city [A].
- **M1 algorithmic matching:** needs enough uploads and reviewer signals (ranking data).
- **M7 collaboration briefs; M8 credits graph; M11 sponsored challenges; M13 city showcases:** need cross-discipline density or sponsor partners.

**Works at 100,000 artists** (national scale; enough transaction and review data)
- **F2 rupee price suggestions:** need real deal data (ranking data).
- **F4 cross-artist link-page recommendations; F12 supporter graph; F13 self-sustaining asset marketplace; F15 in-house ticketing.**
- **F7 "shop emerging art" destination:** only with separate buyer acquisition. Even MeMeraki, with 500+ artists and 10,000+ products, reports "7+ Cr INR paid out to our artists in the last 5 years" ([MeMeraki](https://www.memeraki.com)) [CC].
- **F10 robust talent rankings from critique data; F11 brand reputation scores** (statistically defensible only now).
- **F16 + F17 national self-serve marketplace:** needs ranking, fraud and dispute teams.
- **F18 Pro as meaningful revenue:** at 1,000 artists, 5% conversion gives about ₹15,000 a month [A, illustrative].
- **M6 talent-scouting dashboard; M14 capped boosts.**

**Works only at large scale**
- **F5 template marketplace:** likely 100,000+ active page owners, since few buy templates [A].
- **F9 Fan Club:** at every scale its limit is each artist's own fan base. Cross-club discovery needs very large scale.
- **F8 live discovery events; F7 international shipping and instalments; F11 a public India rate index; F16 + F17 algorithmic matching and rate intelligence.**
- **M1 + M2 fully personalised ranking with an adaptive fairness dose; machine learning on critique data.**

The implication [INF]: at launch, every discovery feature must run **partly by hand**. The MVP should be built for concierge operation in one city, not for algorithms.

**Outside India (background only).** Two of the estimates above borrow ratios from abroad, because India has no data for them. Groover runs about 1 curator per 200 artists ([Groover](https://groover.co/en/)) [CC], which gives the 50-reviewer estimate. OpenTable needed 50–100 restaurants per city ([Lenny's Newsletter, 20 Nov 2019](https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace)), which informs the 30–100 artists per craft per city [A]. Neither has been tested in India.

## 21. MVP

### The MVP must prove one sentence, in one city

The MVP must prove that **artists can receive meaningful discovery and opportunity through Underdawg that they aren't receiving elsewhere.** Four findings shape it.

- **Demand is scarce, supply is not.** Indian platforms hold far more artists than paid work (sections 14 and 20). StarClinch's own terms say it "does not guarantee you any work" ([StarClinch terms](https://starclinch.com/terms-of-use)) [V]. For Underdawg, the scarce side is opportunity-givers [INF].
- **Infrequent buyers kill marketplaces.** A family books a wedding band once [INF]. Ten years of artist booking has brought StarClinch about ₹2.4 crore of yearly revenue (section 20). Target **repeat posters**: cafés, venues, colleges, agencies and D2C brands [INF]. Repeat buyers exist: Hindustan Unilever worked with 12,000 creators in FY25 ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm)) [2nd], and 91% of Indian event companies expect corporate events to grow ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [V].
- **Novelty is not retention.** Koo claimed 60 million users. Its peak was 10 million monthly and 2.1 million daily users, and it shut on 3 July 2024 ([Business Today, 3 Jul 2024](https://www.businesstoday.in/technology/news/story/little-yellow-bird-says-final-goodbye-indias-twitter-rival-koo-shuts-down-435555-2024-07-03)) [V].
- **Artists need value on day one.** Single-player tools carry them until opportunities arrive [INF].

Recommended scope [INF]: **one city and 3–5 crafts** (for example, illustrators and photographers in Mumbai), with invite-only supply so each opportunity-giver sees a dense, relevant pool.

**Outside India (background only).** No Indian study of marketplace launches was found. Abroad, most marketplaces Lenny Rachitsky studied limited their launch by geography or category ([Part 1, 20 Nov 2019](https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace)), and about 60% relied on one-to-one direct sales ([Part 3, 25 Nov 2019](https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace-911)) [V]. Bill Gurley wrote that "many failed marketplaces attack purchasing cycles that are simply way too infrequent" ([13 Nov 2012](https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/)) [V].

### What is IN

| MVP component | Built from | Why it is in |
|---|---|---|
| **Artist profile**: Instagram import and curation, discipline/city/availability tags, non-Instagram works, cached copies, export | F1 (modified), M16 | Cheapest inventory. 3.3 to 3.7 million Indian creators use Instagram as their primary platform ([MediaNews4U on Kofluence, 15 May 2026](https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/)) [CC, via press]. Only professional Instagram accounts can connect ([Meta](https://developers.facebook.com/docs/instagram-platform/overview)) [V], so caching protects against outages |
| **Verified credibility card**: reach-normalised engagement, no follower-first display | F2 (modified) | Indian brands fear fake engagement: 74% name fake followers as a concern ([Storyboard18 citing BCG, 4 May 2025](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm)) [2nd]; see also ([BCG, 3 May 2025](https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy)) [V] |
| **Narrow link-in-bio**: links, grid, brand view, "hire me" inquiry, zero-fee UPI support block, email/WhatsApp capture, free templates | F4, F12 (light), F5 (basic) | Main sharing surface. Linktree's earning features exclude India ([Linktree](https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features)) [V]. Person-to-person UPI stays free; from 15 October 2026 merchant payments above ₹2,000 carry a 0.4% fee ([The Indian Eye, 18 Sep 2026](https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/)) [2nd] |
| **First-audience review queue**: free; matched peers plus at least one recruited curator, booker or brand scout; response deadline; picks and shortlists; peer credits | M1 + M3; F10 (modified) | The discovery engine. Free to the artist. Indian beginners already pay to be seen: comedy open mics cost ₹200–500 a slot ([BuddyOnStage, 2026](https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india)) [2nd; blog] |
| **Verified opportunity-giver accounts and fit-based search** with a blind first view and newcomer slots | M5 + M2 | The audience that matters, without follower bias. Over 55% of surveyed Indian creators lost deals because of unverified contacts or fake managers ([MediaBrief on HashFame, 27 May 2025](https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/)) [CC] |
| **One Opportunities board**: Hire Artists and Gigs combined, plus curated local open calls; verified posters; budgets shown; free to apply | F16 + F17, M4 | Converts exposure into paid work. StarClinch also runs one marketplace with two entry points: a jobs board and direct booking ([StarClinch](https://starclinch.com/)) [V] |
| **Payment protection** via an RBI-authorised payment aggregator's escrow product, not Underdawg's own funds | F16/F17 (light) | Indian creators wait 90 days to a year for brand payments, and now ask for a 25–50% advance ([Storyboard18, 28 Jul 2025](https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm)) [2nd]. Only an authorised aggregator may hold client money, and it needs ₹15 crore net worth ([RBI Directions, 15 Sep 2025](https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html)) [V] |
| **Trust basics**: Rate Check, scam-pattern alerts, AI declaration, no-training policy, reporting | F11 (narrow), M9 (light) | Fake casting agents in India collect ₹1,000 to ₹75,000 per victim ([The Tribune, 14 Jan 2024](https://www.tribuneindia.com/news/delhi/man-posing-as-casting-director-dupes-15-aspiring-models-in-delhi-581182); [BOOM, 19 Jan 2022](https://www.boomlive.in/explainers/bollywood-casting-director-shares-how-fake-accounts-impersonate-him-to-dupe-actors-16434)) [2nd]. Only 55,484 police cases were filed against 28.15 lakh reported cybercrime cases in 2025 ([The420.in, 21 Feb 2026](https://the420.in/india-cybercrime-24pct-rise-22495cr-loss/)) [2nd], so prevention matters more than recourse [INF]. No Indian count of fake casting or brand-deal scams was found |
| **Published fairness rules** | M15 + M2 | The trust promise; nothing to build |

### What is OUT (for now)

| Feature | Reason |
|---|---|
| F3 Scheduling | Free native alternatives; no discovery value |
| F5 Template marketplace | Needs very large scale |
| F6 DM automation | Crowded and cheap in India: Zorcha claims 60K+ creators and offers it free ([Zorcha](https://zorcha.com)) [CC]; ReplyKaro starts at ₹99 a month ([ReplyKaro](https://replykaro.com/pricing)) [V]. Meta-dependent; no discovery value |
| F7 Art Shop with escrow | Escrow makes Underdawg a GST e-commerce operator, and unregistered artists could then sell only within their own state ([ONDC GST note](https://ondc-static-website-media.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/files/ONDC_Guidance_On_Tax/ondc_note_on_unregistered_and_composition_sellers_1.pdf)) [V]. A Shop-lite test can come later |
| F8 Live Rooms | Spiky and unproven in India: Leher, an Indian live audio and video rooms app, fell to almost no revenue in FY25 ([Inc42](https://inc42.com/company/leher/)) [2nd; indicative]. Later as paid critique sessions |
| F9 Fan Club | Rejected as specified: needs a fan-side product; no discovery value. Qoohoo, an Indian creator–fan app, saw revenue fall 95.5% to ₹5.3 lakh in FY25 ([Inc42](https://inc42.com/company/qoohoo/)) [2nd; indicative] |
| F10 fan-to-artist paid critique | Proven demand is artists paying gatekeepers, not fans paying artists. That proof comes from outside India; no Indian critique marketplace was found |
| F11 free-text Brand Reviews | Defamation risk: criminal defamation remains law in India under BNS §356 ([Wikipedia](https://en.wikipedia.org/wiki/Bharatiya_Nyaya_Sanhita)). Later only as transaction-linked ratings |
| F13 paid downloads, F14 bookings, F15 ticketing | Commodity tools exist (Topmate, Exly, District); no discovery value |
| F18 Pro plan | Negligible revenue at this scale; must never sell reach. Test charging opportunity-givers later. In India the money comes from the business side: Talentrack sells brand budgets from "Up to ₹2L" to "₹10L+" ([Talentrack](https://www.talentrack.in)) [CC] |
| M6–M8, M11–M14 | Need density; M7 also lacks evidence of need |

### The core user journey, and how the MVP enables each step

| Step | What the MVP provides | What could break it [INF] |
|---|---|---|
| 1. **Artist joins** | Invite in the launch city and crafts; Instagram connection or manual upload | Personal (non-professional) Instagram accounts must switch first |
| 2. **Creates profile and portfolio** | Import and curation, credibility card, link page | Feels like "another Linktree" unless step 4 comes fast |
| 3. **Uploads work** | Submits a work to the queue with a goal ("what I want feedback on") | Low-effort or AI-generated uploads (declaration and reporting) |
| 4. **Discovery activates** | Work goes to matched peers and at least one opportunity-giver, with a deadline; newcomer bonus and caps apply | Too few reviewers; missed deadlines |
| 5. **Relevant users discover the artist** | Curators, bookers and brands see queue items, a weekly digest and fit-ranked search | Opportunity-givers don't log in, or insist on follower counts |
| 6. **Opportunity occurs** | Pick, shortlist, brief, gig invitation or open-call selection; protected payment | Deals move to WhatsApp; scams. StarClinch answers this with a ₹7.5 lakh penalty for direct deals ([StarClinch terms](https://starclinch.com/terms-of-use)) [V] |
| 7. **Artist experiences value** | Useful feedback, a pick or a paid job; a verified completion on the profile; Rate Check | Generic feedback; low pay |
| 8. **Artist returns** | Alerts for new briefs and gigs in their city and craft; review credits to spend | An empty inbox. Artists may need **about one relevant paid opportunity a month** to stay [A] |

### Success metrics

Measure outcomes, not sign-ups. Indian apps show why. Koo claimed 60 million users against a peak of 10 million monthly users ([Business Today, 3 Jul 2024](https://www.businesstoday.in/technology/news/story/little-yellow-bird-says-final-goodbye-indias-twitter-rival-koo-shuts-down-435555-2024-07-03)) [V]. Josh claimed 350 million monthly users, while third-party data showed 20 million in July 2023 and 9.4 million in July 2024 ([Inc42, 24 Jul 2024](https://inc42.com/features/verse-innovations-josh-is-fizzling-out/)) [V]. Set targets before the pilot starts; the research does not support specific numbers yet.

| Metric | What it proves |
|---|---|
| **Share of active artists who get at least one meaningful opportunity within 90 days, from someone with no prior connection** | The core hypothesis |
| **"Would you have got this elsewhere?"**, asked after each opportunity, with the artist's follower count at the time | Value is new, not moved from Instagram |
| Share of new works reaching the target number of relevant reviewers within 72 hours | The queue works |
| Share of views, shortlists and paid jobs going to artists below a follower threshold; share of income to the top 10% | Fair discovery is real |
| Active opportunity-givers per city and craft; briefs per month; **repeat posting rate**; time to shortlist | Demand is real and repeatable |
| Reviewer response within deadline; feedback usefulness rating | Curator supply and quality |
| Non-payment, dispute and scam-report rates | Trust layer works |
| Week-4 and week-12 artist retention | Value, not novelty |

### The riskiest assumption: will Indian opportunity-givers use it, repeatedly?

**The riskiest assumption is on the demand side**: that Indian brands, agencies, venues, cafés, colleges and curators will discover and pay **unknown** artists through Underdawg, again and again, instead of using Instagram DMs, agencies, StarClinch or their own networks. The research found **no direct evidence** either way. No reliable public data found.

Signs that demand exists:

- 70% of surveyed Indian brands plan to raise creator budgets 1.5–3x ([Storyboard18 citing BCG](https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm)) [2nd]. 92% of Indian brands are expanding influencer investment ([MediaBrief on Goat/Kantar, 24 Jun 2025](https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/)) [2nd].
- 83% of Indian marketers say they struggle to discover influencers (section 14).
- India's organised live events grew 44% in 2025 ([EY India, 24 Mar 2026](https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report)) [V]. Part of that was the Kumbh Mela, and EY expects "a slight dip in 2026" ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [V].
- Event companies name "unorganized competition, talent scarcity and a trust deficit" as their key challenges (same FICCI-EY report) [V].
- A new Mumbai brand asked publicly what influencers charge, showing small brands lack price and quality signals ([r/mumbai, 23 Sep 2024](https://web.archive.org/web/20250710022556/https://www.reddit.com/r/mumbai/comments/1fndnzi/what_are_the_typical_fees_for_paying_influencers/)).

Signs against:

- "Nearly three quarters of influencer marketing spends in India still flow directly between brands and creators, outside of any organised channel" ([MediaNews4U, 4 Apr 2026](https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/)) [CC; a KlugKlug figure quoted by an OpraahFx co-founder].
- StarClinch has not scaled in ten years (section 20).
- Small creators are offered barter, not money, and one Delhi creator with 38,600 followers saw offers fall from every few days to "only a couple" a month ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [2nd].
- No Indian data was found on how many brands or creators use Instagram's creator marketplace. Outside India, it was reported in 2022 to be "failing to deliver brand deals for many influencers testing the product" ([Business Insider, 29 Sep 2022](https://www.businessinsider.com/influencers-testing-instagram-creator-marketplace-waiting-brand-deals-money-2022-9)) [2nd].

Two assumptions sit just behind it. **Will Indian curators and programmers review work, and for what reward?** No data on Indian curator marketplaces was found. **Will opportunity-givers accept fair ranking**, such as hidden follower counts in the first round?

How to test first [INF]: run a **concierge pilot before building search or escrow**. Hand-recruit repeat opportunity-givers in one city and 3–5 crafts. Ask them to post real briefs with real budgets. Run the queue by hand, for example with weekly shortlists. Measure three things: briefs posted with budgets, posters who return, and hires of artists below a follower threshold. Fix the continue-or-stop thresholds before starting. If opportunity-givers will not post and return when the service is free and hand-run, software will not fix it.

## 22. Differentiation

### Why would an artist join Underdawg if they already use Instagram?

**Honest answer today: no strong reason under the current plan.** Instagram is Underdawg's host and its biggest competitor. Its **ad reach in India is 481 million**, up 22.9% in a year ([DataReportal, 5 Nov 2025](https://datareportal.com/reports/digital-2026-india)) [V]. 93.1% of Indian brands name it their top influencer platform ([Storyboard18 on Kofluence, 14 May 2026](https://www.storyboard18.com/amp/how-it-works/93-brands-prioritise-instagram-as-84-creators-monetise-best-through-short-form-video-kofluence-report-98028.htm)) [CC, via press]. It already has five bio links ([TechCrunch, 18 Apr 2023](https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/)), native scheduling, a creator marketplace in India, small-creator ranking and Trial Reels. The planned tools sit on top of Instagram and replace nothing it does. And Instagram moves fast in India: it launched Reels there in July 2020, right after India banned TikTok ([Wikipedia: Instagram](https://en.wikipedia.org/wiki/Instagram)) [2nd], and the Indian feed apps then lost their users (section 6).

**How to create a strong answer [INF]:** do what Instagram structurally does not. Promise that *your work is seen by real curators, bookers and brands in your field and city, ranked by fit, and nobody can pay to jump ahead of you.* Add payment-protected small-ticket hiring and artist-only trust data (rate checks, scam alerts). No single feature is hard to copy. The defensible part is the **opportunity-giver network** plus **trust rules that conflict with an advertising business**.

### Why would an artist use Underdawg instead of StarClinch, Talentrack or Topmate?

**Honest answer today: for the tools alone, no. Each planned tool is already sold in India by one of these three.** StarClinch covers Hire Artists, Gigs and Bookings for performers. Talentrack covers brand hiring. Topmate covers bookings, downloads and paid questions. The opening is what none of them offers: fair discovery of unknown artists by opportunity-givers, across crafts [INF].

| | StarClinch | Talentrack | Topmate |
|---|---|---|---|
| **What it is** | Artist-booking marketplace, New Delhi, since 2015. Clients book performers or post a requirement; artists apply to jobs ([StarClinch](https://starclinch.com/)) [V] | "India's Leading Content Marketplace", New Delhi, since 2015. Brands post project briefs; a managed service ([Talentrack](https://www.talentrack.in)) [CC] | One-link storefront for 1:1 sessions, webinars, digital products and "Priority DM". Its about page says Bengaluru; its site also lists a San Francisco address ([Topmate](https://topmate.io/)) [V] |
| **Scale (company claims)** | "17,000+ artists" in 450+ cities seen on its story page on 1 Oct 2026; "10K+" seen on the same page on 2 Oct 2026; 15,000+ in Dec 2021 ([StarClinch](https://starclinch.com/our-story); [Siliconindia, 23 Dec 2021](https://www.siliconindia.com/startup/startup-funding/starclinch-raises-seed-round-from-artha-venture-fund-nitish-mittersain-nwid-30837.html)) [CC] | "50K+ artists, experts, and influencers"; "20K+ curated Influencers" [CC] | "1mn+ professionals" [CC] |
| **Revenue** | ₹2.4 crore in FY25, down 10.2% ([Inc42](https://inc42.com/company/starclinch/)) [2nd; indicative] | ₹36.4 crore in FY25, up 17.6% ([Inc42](https://inc42.com/company/talentrack/)) [2nd; indicative] | No reliable public data found. Creators earned ₹1.80 crore in September 2023, per a co-founder's post ([LinkedIn](https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O)) [CC] |
| **What the artist pays** | 15% of the fee. A ₹7.5 lakh penalty for dealing directly with a client ([StarClinch terms](https://starclinch.com/terms-of-use)) [V] | Not published | 10% on own-link sales, 20% on marketplace sales ([Topmate pricing](https://topmate.io/pricing)) [V] |
| **Who pays for work** | Event buyers: corporates, weddings, colleges | Brands, with budgets from "Up to ₹2L" to "₹10L+"; clients include Realme, Haier and Kent [CC] | Mostly the creator's own followers; a sale through Topmate's marketplace costs 20% |
| **Who it suits** | Performers, DJs, anchors, photographers, influencers | Actors, models, voice artists, influencers; film and ad casting | Career, tech, finance and astrology experts. "Product & Design" is the only creative-adjacent category [V] |
| **Discovery for unknown artists** | "StarClinch does not guarantee you any work" [V]. It publishes no figure for how many artists get booked | A managed model: the platform, not the artist, wins the brief [INF] | Little beyond the creator's own audience [INF]; its categories are built for career and tech experts |
| **What Underdawg must do better [INF]** | Fair, fit-based ranking; visual and digital crafts; no penalty; small ₹5,000–₹50,000 briefs | Artist-side tools and control; open, verified briefs for small brands | Artist-specific outcomes; reach to people who do not follow the artist |

CHART: india-platform-revenue-s22 — Indian platforms that sell to brands and ticket buyers earn ₹30–56 crore a year; StarClinch, which takes 15% from artists, earns ₹2.4 crore (FY25, Inc42 Datalabs, indicative)
Type: bar
| Label | Value | Unit | Entity | Date | Source URL |
|---|---|---|---|---|---|
| Qoruz (creator analytics for brands) | 56.4 | ₹ crore revenue | Inc42 Datalabs (indicative) | FY25 | https://inc42.com/company/qoruz/ |
| Kofluence (brand–creator marketplace) | 52.5 | ₹ crore revenue | Inc42 Datalabs (indicative) | FY25 | https://inc42.com/company/kofluence/ |
| Talentrack (brand content marketplace) | 36.4 | ₹ crore revenue | Inc42 Datalabs (indicative) | FY25 | https://inc42.com/company/talentrack/ |
| Skillbox (event ticketing) | 29.9 | ₹ crore revenue | Inc42 Datalabs (indicative) | FY25 | https://inc42.com/company/skillbox/ |
| StarClinch (artist booking, 15% from artists) | 2.4 | ₹ crore revenue | Inc42 Datalabs (indicative) | FY25 | https://inc42.com/company/starclinch/ |

The chart carries one lesson [INF]. In India, the platforms with real revenue charge the business side. Talentrack began as a talent network and became a brand content marketplace. A plan that depends on unknown artists paying ₹299 a month is the less-proven model.

**How to create an answer [INF]:** combine what these three keep apart. Put artists of all crafts in one verified pool. Let opportunity-givers search by fit, not followers. Protect small payments. Add artist-only trust data. No Indian company was found that combines artist-only discovery, verified Instagram statistics, protected brand hiring and artist peer boards. Each piece exists alone, so the combination only matters **once opportunity-givers are actually on Underdawg**.

### Why would a musician use Underdawg if they already use SoundCloud or Spotify?

**Honest answer: not for listening.** Streaming platforms own listening, and fan discovery works there: 12.8 billion discovery events for unfamiliar Indian artists in 2025 ([Spotify](https://newsroom.spotify.com/2026-09-02/india-loud-and-clear-report/)) [V]. But streaming is not a living for an unknown Indian musician.

- Only 14.4 million of about 178 million Indian music streamers pay ([FICCI-EY, Mar 2026](https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf)) [V].
- In 2025, "reduced per-stream rates and higher minimum stream count thresholds reduced revenues for some creators" (same report) [V]. On Spotify, tracks under 1,000 annual streams have earned no recorded royalties since 2024 ([Spotify for Artists](https://artists.spotify.com/en/blog/modernizing-our-royalty-system)) [V].
- 69% of IPRS-paid authors received under ₹25,000 a year (section 6).
- Live performance is the top income source for Indian music creators: 139 of 500 ranked it first ([EY, Dec 2023](https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf)) [V].
- The Indian fair-shot tool is tiny: JioSaavn's ArtistOne Finds is one 30-song playlist (section 6).

**How to create an answer [INF]:** focus on **non-streaming outcomes**: gigs, venue and college-fest bookings, brand and sync briefs, collaborations, local shows, and curator attention without paying per pitch. India's organised live events grew 44% in 2025 ([EY India](https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report)) [V], which supports this. How much of that growth reaches emerging acts is unknown.

**Outside India (background only).** SoundCloud's First Fans sits behind paid tiers ([MBW, 17 Dec 2024](https://www.musicbusinessworldwide.com/soundcloud-launches-3-25-a-month-artist-tier-targeting-emerging-and-aspiring-musicians/)) [V], and Spotify's Discovery Mode is pay-for-reach (section 6). No Indian usage data for either was found.

### Why would creative professionals keep another app installed?

**Only if it reliably brings money, relevant contacts or credible feedback.** Indian evidence is discouraging for single-purpose artist apps. StarClinch's artist app has only 6 ratings on the Indian App Store ([Apple](https://itunes.apple.com/search?term=starclinch&entity=software&country=in)) [V]. Qoohoo and Leher, two Indian creator apps, have almost no revenue left (section 21). Hiring is also infrequent for most artists; the research expects weekly checking at most, more for performers in the wedding and college-fest seasons [A].

**How to create an answer [INF]:** make it the place where **alerts about money** arrive: new briefs and gigs in your city and craft, curator picks, open-call deadlines. A feed of other artists' work would not earn the slot.

### What would make an artist say "You need to be on Underdawg"?

**The current plan does not create this sentence.** Nobody recommends an app for a link page or DM automation. Linktree, Instagram and free Indian tools already do that.

The sentence would follow **outcomes** [INF]: "I got booked through it." "A curator picked my work in the first week." "Every piece I post is seen by real people in my field." "It told me what to charge, and warned me the brand was a scam." Each maps to an MVP component in section 21. Indian artists describe the opposite today. One creator said: "Every day, at 11 am, I message every brand I've worked with for money I have earned" ([The Nod Mag, 7 Aug 2026](https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles)) [2nd]. That is the real test. If the pilot cannot produce these sentences from real artists, Underdawg has no differentiation yet.

### Outside India (background only): two global artist platforms

Behance and Cara are not Indian platforms, and no count of their Indian users was found. They matter as lessons: one shows what a large portfolio network does for hiring, the other what an artists-only network lacks.

### Why would an artist use Underdawg instead of Behance?

**Honest answer today: weak.** In India, Behance Pro is shown at ₹797.68 a month ([Behance Pro](https://www.behance.net/pro)) [V], and Indian payouts go through PayPal ([Behance Help](https://help.behance.net/hc/en-us/articles/13824610641179-FAQ-Why-isn-t-my-country-supported)) [V]. Globally it claims **65 million members** and **$80M in job opportunities in 2025** ([Behance, 18 Dec 2025](https://www.behance.net/blog/year-in-review-2025)) [CC]. But it reviews a project only once and weighs "traction" and polish, and Pro includes a paid "Boost" (section 6). It leans towards designers, not dancers, musicians or comedians.

**How to create an answer [INF]:** cover performing and visual artists together, offer India-local opportunities with UPI payments, and guarantee newcomer rotation with no paid boosts. It stays weak **until opportunity-givers are actually on Underdawg**.

### Why would an artist use Underdawg instead of Cara?

**Honest answer today: only if Underdawg builds the demand side.** Cara is artist-first and anti-AI. It grew from **40,000 to 650,000 users in one week** in June 2024, after Meta's AI-training notice ([TechCrunch, 6 Jun 2024](https://techcrunch.com/2024/06/06/a-social-app-for-creatives-cara-grew-from-40k-to-650k-users-in-a-week-because-artists-are-fed-up-with-metas-ai-policies/)) [V]. But users say "it's all creatives sharing with each other" ([Creative Boom, 6 Jun 2024](https://www.creativeboom.com/resources/everyones-talking-about-cara-but-is-it-any-good/)) [V], and its protections were bypassed: about 12 million works were scraped in August 2026 ([Wikipedia: Cara](https://en.wikipedia.org/wiki/Cara_(app))) [2nd], and featured Glaze support ended in September 2026 ([Cara blog](https://blog.cara.app/blog/cara-glaze-about/)) [V].

The Indian context is harder for an anti-AI promise. A government committee has proposed that rights holders "will not have the option to withhold their works" from AI training ([DPIIT, Dec 2025](https://www.dpiit.gov.in/static/uploads/2025/12/ff266bbeed10c48e3479c941484f3525.pdf)) [V].

**How to create an answer [INF]:** verified opportunity-givers, India focus, many disciplines and opportunity routing. An artists-only Underdawg without opportunity-givers would inherit Cara's weakness. It should also not over-promise AI protection.

## 23. Positioning

### How competing platforms describe themselves

Indian platforms and organisations come first. They describe themselves as booking, content or tool businesses. None claims fair discovery of unknown artists.

| Indian platform or organisation | Stated positioning (quote) | Territory | Source |
|---|---|---|---|
| StarClinch | "India's Leading Artist Booking Platform" | Opportunity (bookings) | [StarClinch](https://starclinch.com/) |
| Talentrack | "India's Leading Content Marketplace" | Opportunity (brand content) | [Talentrack](https://www.talentrack.in) |
| Topmate | "Make money from your content. Sell products, host sessions, and grow your business — all from a single link." | Monetisation tools | [Topmate](https://topmate.io) |
| IndieFolio | "Access India's top UX/UI talent on demand" | Opportunity (managed design hiring) | [IndieFolio](https://home.indiefolio.com) |
| Kofluence | Influencer discovery for brands "with fraud protection"; "750,000+ Influencers" | Opportunity (brand side) | [Kofluence](https://www.kofluence.com) |
| Zorcha | "Free Unlimited Instagram DM Automation" | Monetisation tools | [Zorcha](https://zorcha.com) |
| India Art Fair | "the leading platform to discover Modern and Contemporary art from South Asia" | Discovery (collectors) | [India Art Fair](https://indiaartfair.in/about) |
| Kyoorius | "to raise, reward, and recognise the talent in advertising, media, marketing, and design" | Talent recognition (advertising, design) | [Kyoorius](https://www.kyoorius.com/) |
| India Foundation for the Arts | "an independent, nationwide, not-for-profit organisation that makes grants and implements projects across research, practice and education in the arts" | Opportunity (grants) | [IFA](https://indiaifa.org/india-foundation-arts.html) |
| underdawg.in (beta) | "The Creator OS"; "Get Discovered. Get Connected. Get Paid." | Tools (stated); discovery and opportunity (claimed) | [underdawg.in](https://underdawg.in), checked 1 Oct 2026; probably Underdawg's own site [INF] |

**Outside India (background only).** These global platforms are open to Indian artists. Their wording shows which territories are already claimed worldwide.

| Platform | Stated positioning (quote) | Territory | Source |
|---|---|---|---|
| Behance (Adobe) | "Showcase your work and discover inspiration from the world's best creative community"; "Hire freelancers and get hired" | Community; opportunity | [Google Play](https://play.google.com/store/apps/details?id=com.behance.behance&hl=en) |
| Cara | "a creator-first space for connecting artists with clients, fans, enthusiasts, and industry peers" | Artist-first; authenticity | [Cara](https://cara.app/about) |
| VSCO | "exposure for all photographers" | Community; exposure; identity | [Google Play](https://play.google.com/store/apps/details?id=com.vsco.cam&hl=en) |
| SoundCloud | "the world's largest online community of artists, bands, DJs, and audio creators" | Listener discovery; community | [SoundCloud](https://soundcloud.com/) |
| BandLab | "connect and collaborate with like-minded creators" | Collaboration (music) | [Google Play](https://play.google.com/store/apps/details?id=com.bandlab.bandlab&hl=en) |
| Audiomack | "a youth-driven, artist-first music streaming platform" | Artist-first; emerging | [Audiomack](https://audiomack.com/) |
| Linktree | "Everything you are, in one simple link" | Identity; monetisation | [Linktree](https://linktr.ee/) |
| Contra | "A professional network for the jobs and skills of the future" | Opportunity | [Contra](https://contra.com/) |
| ArtConnect | "Artist opportunities made easy" | Opportunity (open calls) | [ArtConnect](https://www.artconnect.com/) |
| Groover | "Get your music heard by the right people" | Curator access | [Groover](https://groover.co/en/) |

### Territory map

Occupancy is counted from the tables above and the competitor research. The labels describe how many platforms claim a territory; they are not scores [INF].

| Territory | Occupancy in India | Indian occupants (global ones after) | What is left open |
|---|---|---|---|
| **Monetisation tools** | Heavy, commoditised | Topmate, Exly, TagMango, Cosmofeed, Zorcha, ReplyKaro. Global: Linktree, Beacons, Stan, Patreon | Little; Indian UPI storefronts already fill the India gap |
| **Opportunity** | Moderate | StarClinch, Talentrack, IndieFolio, Kofluence, Qoruz; Instagram's creator marketplace. Global: Behance, Dribbble, Contra, ArtConnect | Serves hire-ready performers, influencers and designers; sells to brands; no verified India open-call aggregator |
| **Discovery** | Occupied, but viewer-facing | Instagram, YouTube, Spotify, JioSaavn; India Art Fair (collectors); BookMyShow and District (ticket buyers). Global: SoundCloud, Bandcamp | "Discovered by opportunity-givers" is nobody's core promise |
| **Emerging talent** | Features, not positioning | YouTube Hype (India, Jul 2025); Meta's Edits Film Festival; JioSaavn ArtistOne Finds; Ziro Festival. Global: First Fans, Trial Reels; VSCO and Audiomack closest in wording | Nobody makes fair exposure their core promise |
| **Creative communities** | Heavy | Instagram and YouTube; the Indian feed apps Moj, Josh and ShareChat, now shrunk. Global: Behance, DeviantArt, SoundCloud, Cara, BandLab | Little |
| **Creative identity** | Heavy | Topmate and other one-link pages. Global: Linktree, Beacons, VSCO | Little |
| **Artist-first networks** | Niche; none found in India | No India-first, artists-only startup that combines discovery, Instagram tools and protected brand hiring was found (moderate confidence). Global: Cara, Audiomack, Artfol ("half a million artists" [CC]) | Strong values abroad, but no demand side |
| **Collaboration** | Light, single-discipline | BandLab (music; sold in India) | Cross-discipline unclaimed, but least-evidenced need |

### The least-occupied territory: fair discovery by the people who create opportunities

The least-occupied territory is **fair discovery of under-discovered artists by the people who create opportunities (curators, bookers, brands and collaborators), across disciplines, India-first** [INF]. It combines three territories that competitors keep separate: emerging talent, opportunity and collaboration. Discovery claims today face listeners and viewers. Fair exposure exists only as features of big platforms. Indian opportunity platforms serve hire-ready talent and earn from brands.

**Why it may be empty.** It is hard, not overlooked. It needs a two-sided network, and the demand side does not exist yet. In India, finding work for unknown artists has not paid for itself before. Gigstart's last reported revenue was ₹11.7 lakh. StarClinch earns about ₹2.4 crore after ten years. Talentrack moved from a talent network to brand content. JioSaavn shut its indie label, Artist Originals, in 2022 (sections 6 and 20). Incumbents can copy fairness features cheaply. In India, Meta and YouTube are already moving this way with the creator marketplace, the Edits Film Festival and Hype.

**What would make it defensible [INF]:** a network of verified opportunity-givers in Indian cities and crafts; trust rules that ad- and royalty-funded incumbents find hard to adopt (no pay-for-reach, human-made evidence); and pre-traction signals (curator picks, peer endorsements, completed jobs) that brand-side tools such as Qoruz and Kofluence, and global ones such as Chartmetric, cannot see.

**One positioning warning [INF].** The beta site's wording claims two territories at once. "The Creator OS" places Underdawg in the crowded tools territory, where the current feature plan actually sits. "Get Discovered" claims the empty territory, which the current plan does not deliver (section 6). The positioning becomes credible only once the product delivers discovery to opportunity-givers, which is what the MVP in section 21 is designed to test.

---

## Sources

Every link cited in this report (deduplicated). Dates and context appear next to each citation in the text.

- https://about.fb.com/news/2023/02/testing-meta-verified-to-help-creators/
- https://about.fb.com/news/2023/06/expanding-meta-verified-to-india/
- https://about.fb.com/news/2024/02/creator-marketplace-for-brands-and-creators-to-collaborate-on-instagram/
- https://about.fb.com/news/2024/09/instagram-teen-accounts/
- https://about.fb.com/news/2025/04/introducing-edits-streamlined-video-creation-app/
- https://about.fb.com/news/2026/08/introducing-the-edits-film-festival-to-spotlight-indias-emerging-creator-talent/
- https://about.fb.com/news/2026/09/find-community-forum-dedicated-app-facebook-groups/
- https://abovethecrowd.com/2012/11/13/all-markets-are-not-created-equal-10-factors-to-consider-when-evaluating-digital-marketplaces/
- https://aidcf.com/wp-content/uploads/FICCI-EY-Media-and-Entertainment-Report-2026_reduced.pdf
- https://albato.com/blog/publications/how-to-schedule-instagram-posts
- https://allevents.in/pages/pricing
- https://alternativeto.net/news/2025/12/bento-to-shut-down-in-2026-as-linktree-takes-over-and-offers-migration-path/
- https://apps.apple.com/cn/app/id1146790989
- https://apps.apple.com/in/app/bandlab-music-making-studio/id968585775
- https://apps.apple.com/in/app/edits-video-editor/id6738967378
- https://apps.apple.com/in/app/id1592830857
- https://apps.apple.com/in/app/id389801252
- https://apps.apple.com/in/app/linktree-link-in-bio-creator/id1593515263
- https://apps.apple.com/in/app/meta-business-suite/id514643583
- https://apps.apple.com/us/app/id6444589346
- https://apps.apple.com/us/app/id6478343472
- https://apps.apple.com/us/app/planoly-social-media-planner/id1014568284
- https://arstechnica.com/information-technology/2022/11/deviantart-upsets-artists-with-its-new-ai-art-generator-dreamup/
- https://artconnect.zendesk.com/hc/en-us/articles/7886405974802-What-membership-plans-are-available-for-artists-and-curators
- https://artfol.app
- https://artfol.app/legal/content-guidelines
- https://artinfoindia.com/india-art-fair-2026-returns-with-record-breaking-133-exhibitors-in-new-delhi/
- https://artists.spotify.com/discovery-mode
- https://artists.spotify.com/en/blog/modernizing-our-royalty-system
- https://artiumacademy.com
- https://artiumacademy.com/
- https://arxiv.org/pdf/2308.01118
- https://audiomack.com/
- https://bandcamp.com/about
- https://bandcamp.com/artists
- https://beacons.ai
- https://beacons.ai/i/pricing
- https://behold.so/
- https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837
- https://blinkstore.in/
- https://blog.bandlab.com/bandlab-opportunities-picks/
- https://blog.bandlab.com/make-money-with-your-music-the-brand-new-tip-jar/
- https://blog.cara.app/about
- https://blog.cara.app/blog/cara-glaze-about/
- https://blog.cara.app/blog/scraping-legal-fund-faq
- https://blog.cara.app/faq
- https://blog.gigmit.com/en/faq-gigmit-pro-costs/
- https://blog.youtube/inside-youtube/the-future-of-youtube-2026/
- https://blog.youtube/news-and-events/neal-mohan-creator-economy-waves-2025/
- https://buddyonstage.com/blogs/how-much-do-stand-up-comedians-earn-in-india
- https://buffer.com/pricing
- https://cadenus.io/resources/blog/do-scheduling-tools-hurt-your-reach/
- https://cal.com/pricing
- https://calendly.com/pricing
- https://cara.app
- https://cara.app/about
- https://carrd.com/pro
- https://chartmetric.com/
- https://circle.so/pricing
- https://cleartax.in/s/gst-registration-limits-increased
- https://cleartax.in/s/section-194o
- https://cleartax.in/s/tcs-under-goods-and-services-tax
- https://cleartax.in/s/tds-and-tcs-under-gst
- https://community.manychat.com/general-q-a-43/comment-to-dm-instagram-10872
- https://contra.com/
- https://contra.com/blog/introducing-contra-labs
- https://creativemarket.com/search?q=link%20in%20bio
- https://creatorflow.so/blog/instagram-built-in-automation/
- https://creatorlanehq.com/blog/best-instagram-dm-automation-tools-india
- https://creatorlanehq.com/learn/superprofile
- https://creators.instagram.com/blog/instagram-trial-reels
- https://creators.instagram.com/earn-money
- https://creators.instagram.com/earn-money/badges
- https://creators.instagram.com/earn-money/subscriptions
- https://crepe.cm/ko/terms
- https://cyberpeace.org/resources/blogs/cyberpeace-analysis-indias-cybercrime-surge-signals-a-growing-digital-security-challenge-an-assessment-based-on-rajya-sabha-proceedings-and-mha-data
- https://datareportal.com/essential-instagram-stats
- https://datareportal.com/reports/digital-2022-india
- https://datareportal.com/reports/digital-2026-india
- https://dealroom.co/companies/superpeer
- https://developer.apple.com/app-store/review/guidelines/
- https://developers.facebook.com/blog/post/2024/09/04/update-on-instagram-basic-display-api/
- https://developers.facebook.com/docs/graph-api/overview/rate-limiting/
- https://developers.facebook.com/docs/instagram-platform/insights
- https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api/
- https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-user/media
- https://developers.facebook.com/docs/instagram-platform/overview
- https://developers.facebook.com/docs/instagram-platform/private-replies
- https://developers.facebook.com/docs/instagram-platform/webhooks
- https://developers.facebook.com/documentation/instagram-platform/api-reference/instagram-user/insights.md
- https://developers.facebook.com/documentation/instagram-platform/app-review.md
- https://developers.facebook.com/documentation/instagram-platform/changelog.md
- https://developers.facebook.com/documentation/instagram-platform/content-publishing.md
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/business-discovery.md
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-facebook-login/creator-marketplace.md
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login.md
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/get-started.md
- https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api.md
- https://developers.facebook.com/documentation/instagram-platform/private-replies.md
- https://discord.com/blog/server-and-creator-subscriptions
- https://discord.com/company
- https://easysellapp.com/blogs/wiki/cod-order-value-rto-rate-price-range-delivery
- https://en.wikipedia.org/wiki/Bharatiya_Nyaya_Sanhita
- https://en.wikipedia.org/wiki/Cara_(app
- https://en.wikipedia.org/wiki/Censorship_of_TikTok
- https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Act,_2023
- https://en.wikipedia.org/wiki/Ello_(social_network
- https://en.wikipedia.org/wiki/Eternal_Limited
- https://en.wikipedia.org/wiki/EyeEm
- https://en.wikipedia.org/wiki/Fiverr
- https://en.wikipedia.org/wiki/Freelancing_in_India
- https://en.wikipedia.org/wiki/Glassdoor
- https://en.wikipedia.org/wiki/Information_Technology_(Intermediary_Guidelines_and_Digital_Media_Ethics_Code
- https://en.wikipedia.org/wiki/Instagram
- https://en.wikipedia.org/wiki/Koo_%28social_network%29
- https://en.wikipedia.org/wiki/Mood_Indigo_(festival
- https://en.wikipedia.org/wiki/MouthShut.com
- https://en.wikipedia.org/wiki/Paddle8
- https://en.wikipedia.org/wiki/Paytm
- https://en.wikipedia.org/wiki/ShareChat
- https://en.wikipedia.org/wiki/Shreya_Singhal_v._Union_of_India
- https://en.wikipedia.org/wiki/Singulart
- https://en.wikipedia.org/wiki/Spotify_Live
- https://en.wikipedia.org/wiki/Talenthouse
- https://en.wikipedia.org/wiki/Telegram_(software
- https://en.wikipedia.org/wiki/Tweetbot
- https://en.wikipedia.org/wiki/Unified_Payments_Interface
- https://en.wikipedia.org/wiki/Weddings_in_India
- https://en.wikipedia.org/wiki/Ziro_Festival_of_Music
- https://english.punjabkesari.com/business/nearly-555-crore-users-onboarded-on-upi-by-june-fy26-transactions-cross-24161-crore-centre
- https://entrackr.com/2021/10/unacademys-graphy-acquires-edtech-startup-spayee-for-25-mn/
- https://entrackr.com/2022/02/kofluence-raises-4-mn-in-pre-series-a-round
- https://entrackr.com/2022/02/kofluence-raises-4-mn-in-pre-series-a-round/
- https://entrackr.com/2022/03/cosmofeed-raises-1-5-mn-in-seed-round/
- https://entrackr.com/2022/11/cosmofeed-helps-creators-monetize-content-more-efficiently/
- https://entrackr.com/2023/01/rigi-raises-100-cr-from-elevation-sequoia-ms-dhoni-and-others/
- https://entrackr.com/2023/05/creator-tech-startup-hypd-raises-4-mn-in-pre-series-a
- https://entrackr.com/2023/06/exclusive-after-mass-layoffs-frontrow-explores-acquisition-deals/
- https://entrackr.com/2024/02/exclusive-wishlink-raises-7-mn-from-fundamentum-and-elevation/
- https://entrackr.com/2024/03/trell-revenue-plummeted-94-to-rs-5-cr-in-fy23-losses-stood-at-rs-59-cr/
- https://entrackr.com/2024/03/y-combinator-backed-exly-raises-6-2-mn-led-by-chiratae/
- https://entrackr.com/exclusive/exclusive-eloelo-kicks-off-series-b-round-with-13-mn-8933673
- https://entrackr.com/fintrackr/eloelo-burns-rs-59-cr-on-ads-to-generate-rs-69-cr-revenue-in-fy25-11439432
- https://entrackr.com/snippets/music-licensing-platform-hoopr-raises-funds-in-extended-pre-series-a-round-10782011
- https://europeanwriterscouncil.eu/soa-survey-uk-ai-2024/
- https://eximpe.com/blog/payments/topmate-io-the-complete-guide-to-getting-started-earning-money-avoiding-pitfalls
- https://exlyapp.com
- https://exlyapp.com/pricing
- https://fastwork.co
- https://faym.co
- https://finance.yahoo.com/news/creator-support-platform-pixivfanbox-celebrates-140000007.html
- https://frameos.studio/blog/how-to-read-instagram-insights
- https://getwyld.in
- https://globalkashmir.net/work-from-home-or-part-time-job-scams-top-cyber-crimes-in-india-says-i4c/
- https://graphy.com
- https://graphy.com/pricing
- https://groover.co/en/
- https://groover.co/en/lp/pricing/
- https://gumroad.com/pricing
- https://help.beacons.ai
- https://help.beacons.ai/en/categories/1087105-products-%F0%9F%92%B0
- https://help.beacons.ai/en/categories/1088065-brand-collabs-%F0%9F%92%B8
- https://help.beacons.ai/en/categories/1466945-smart-reply-%F0%9F%8E%A9
- https://help.behance.net/hc/en-us/articles/10770324288923-FAQ-What-are-the-fees
- https://help.behance.net/hc/en-us/articles/13824610641179-FAQ-Why-isn-t-my-country-supported
- https://help.behance.net/hc/en-us/articles/204483974-How-are-the-Best-of-Behance-aka-Featured-Projects-Selected-
- https://help.behance.net/hc/en-us/articles/30260603621787-Learn-More-Sunsetting-Livestreaming-on-Behance
- https://help.behance.net/hc/en-us/articles/51497046899227-Behance-Recruiter-Pro-Overview
- https://help.buymeacoffee.com/en/articles/4539170-frequently-asked-questions
- https://help.buymeacoffee.com/en/articles/8105744-how-to-calculate-charges-on-your-payment
- https://help.cosmofeed.com/portal/en/kb/articles/superprofile-plans-passion-pro
- https://help.dribbble.com/articles/11083653
- https://help.dribbble.com/en/articles/11062025-dribbble-pricing-and-payment-terms
- https://help.etsy.com/hc/en-in/articles/6742925359255-How-to-Accept-Payments-as-a-Seller-in-India
- https://help.gigsalad.com/article/177-booking-requirements-for-all-members
- https://help.gigsalad.com/article/19-signing-up
- https://help.groover.co/en/articles/2950583-groover-in-a-few-words
- https://help.ko-fi.com/hc/en-us/articles/25143210488477-Contributor-status
- https://help.snapwidget.com/en/articles/9952836-deprecation-of-the-instagram-basic-display-api
- https://help.stan.store/article/217-countries-available-for-stripe-custom-accounts
- https://hobo.video
- https://hobo.video/
- https://home.indiefolio.com
- https://homegrown.co.in/homegrown-voices/we-spoke-to-5-artists-about-generative-ais-place-in-the-indian-creative-landscape
- https://hypage.com
- https://hypeauditor.com/free-tools/instagram-engagement-calculator/
- https://in.eventfaqs.com/2024/12/20/bookmyshowthrowback-unveiling-the-2024-year-end-report-a-year-of-entertainment-experiences/
- https://inc42.com/buzz/celebrity-focussed-skilling-engagement-platform-unlu-bags-seed-round-from-nexus-others/
- https://inc42.com/buzz/indians-lost-inr-22845-cr-to-cyber-fraud-in-2024-govt/
- https://inc42.com/buzz/online-music-learning-platform-artium-academy-bags-funding-from-chiratae-ventures-others/
- https://inc42.com/buzz/rigis-new-lifeline-reliance-reboots-esports-play-more/
- https://inc42.com/company/artium-academy/
- https://inc42.com/company/chingari/
- https://inc42.com/company/cosmofeed/
- https://inc42.com/company/frontrow/
- https://inc42.com/company/gigstart/
- https://inc42.com/company/hoopr/
- https://inc42.com/company/indiefolio/
- https://inc42.com/company/kofluence/
- https://inc42.com/company/koo/
- https://inc42.com/company/leher/
- https://inc42.com/company/mojarto/
- https://inc42.com/company/muzigal/
- https://inc42.com/company/one-impression/
- https://inc42.com/company/peerlist/
- https://inc42.com/company/qoohoo/
- https://inc42.com/company/qoruz/
- https://inc42.com/company/skillbox/
- https://inc42.com/company/songdew-media/
- https://inc42.com/company/sortmyscene/
- https://inc42.com/company/starclinch/
- https://inc42.com/company/tagmango/
- https://inc42.com/company/talentrack/
- https://inc42.com/company/trell/
- https://inc42.com/company/wobb/
- https://inc42.com/features/josh-in-jeopardy-funds-run-dry-for-dailyhunt-can-ai-get-verse-back-in-rhymes/
- https://inc42.com/features/verse-innovations-josh-is-fizzling-out/
- https://indiaartfair.in/about
- https://indiaifa.org/india-foundation-arts.html
- https://indiaquotient.in/portfolio
- https://instantdm.com/pricing
- https://iprs.org/wp-content/uploads/2026/09/Annual_Report_FY2025-26.pdf
- https://iprs.org/wp-content/uploads/ey-the-music-creator-economy.pdf
- https://it.slashdot.org/story/25/05/02/1724245/pinterest-users-left-confused-by-mass-account-suspensions
- https://itg.thebash.com/top-questions
- https://itunes.apple.com/search?term=hoopr&entity=software&country=in
- https://itunes.apple.com/search?term=linkdm&entity=software&country=in
- https://itunes.apple.com/search?term=starclinch&entity=software&country=in
- https://kotaku.com/artstation-ai-art-generated-images-epic-games-protest-1849891085
- https://ksverse.in/blogs/culture/iit-fest-budgets-mood-indigo-shaastra
- https://later.com/pricing/
- https://laylo.com
- https://lightwidget.com/basic-display-api-deprecation
- https://linkdm.com/pricing
- https://linktr.ee
- https://linktr.ee/
- https://linktr.ee/creator-report/
- https://linktr.ee/help/en/articles/10143051-replicate-your-instagram-grid-on-linktree-with-clickable-posts
- https://linktr.ee/help/en/articles/11126119-who-can-use-linktree-s-earn-features
- https://linktr.ee/help/en/articles/12135302-create-your-brand-deals-profile
- https://linktr.ee/help/en/articles/5434137-choose-a-theme-for-your-linktree
- https://linktr.ee/help/en/articles/9758234-use-instagram-auto-reply-to-automatically-share-links-with-your-audience
- https://linktr.ee/help/en/articles/9885339-plan-and-schedule-social-media-posts-using-social-planner
- https://linktr.ee/marketplace
- https://linktr.ee/s/about
- https://linktr.ee/s/pricing/
- https://linktr.ee/s/templates/
- https://livekit.com/pricing
- https://luma.com/pricing
- https://m.thewire.in/article/ptiprnews/the-era-of-informal-influence-is-over-indias-creator-economy-is-entering-its-institutional-age
- https://magazine.artstation.com/2017/05/updated-trending-algorithm-diversity-quality/
- https://magazine.artstation.com/2026/09/ai-updates-from-artstation/
- https://mediabrief.com/india-influencer-report-2025-goat-kantar-growth/
- https://mediabrief.com/indian-influencers-lost-over-%E2%82%B9350-cr-in-brand-deals-hashfame/
- https://mediabrief.com/inside-the-2bn-surge-of-indias-creator-economy-bcg-report/
- https://mediabrief.com/iprs-cisac-2025-royalty-growth-ai-regulation/
- https://mediabrief.com/kofluence-influencer-marketing-report-2025/
- https://mediabrief.com/shipnotes-reveals-26-rto-rate-on-cod-orders-across-india/
- https://mercury.com/blog/founder-spotlight-jijo-sunny-buy-me-a-coffee
- https://musically.com/2023/03/13/future-of-music-coalition-slams-spotify-discovery-mode-expansion/
- https://musically.com/2025/08/13/jiosaavn-launches-artistone-finds-playlist-to-showcase-upcoming-artists/
- https://musically.com/2025/12/11/over-34k-events-mous-and-record-breaking-gigs-bookmyshows-year-in-live-entertainment/
- https://musically.com/2025/12/18/25-insights-about-indias-music-industry-in-2025/
- https://musically.com/2026/01/05/instagram-boss-authenticity-is-becoming-infinitely-reproducible/
- https://musically.com/2026/02/04/district-by-zomatos-touching-grass-report-tracks-trends-in-indias-concert-going-culture/
- https://musically.com/2026/05/05/spotify-discovery-mode-payola-lawsuit-to-move-into-arbitration/
- https://musicianscensus.co.uk/s/Musicians-Census-Financial-Insight-Report-Accessible-Format.docx
- https://musiciansunion.org.uk/working-performing/gigs-and-live-performances/live-engagement-rates-of-pay/national-gig-rates
- https://mylegalpal.com/articles/how-to-recover-payments-from-clients-in-india-msme-odr/
- https://news.patreon.com/articles/understanding-apple-requirements-for-patreon
- https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/
- https://newsroom-deezer.com/2026/07/ai-music-exceeds-50-percent-daily-uploads-deezer/
- https://newsroom.spotify.com/2026-09-02/india-loud-and-clear-report/
- https://note.com/skeb/n/n1a177b2338bf
- https://ondc-static-website-media.s3.ap-south-1.amazonaws.com/res/daea2fs3n/image/upload/ondc-website/files/ONDC_Guidance_On_Tax/ondc_note_on_unregistered_and_composition_sellers_1.pdf
- https://passes.com
- https://peerseek.io/blogs/creator-platform-fees-india-compared
- https://petapixel.com/2026/04/30/new-instagram-policies-target-reposted-content/
- https://pib.gov.in/PressReleseDetailm.aspx?PRID=1700749
- https://play.google.com/store/apps/details?id=com.bandlab.bandlab&hl=en
- https://play.google.com/store/apps/details?id=com.behance.behance&hl=en
- https://play.google.com/store/apps/details?id=com.vsco.cam&hl=en
- https://predis.ai/pricing/
- https://printrove.com/
- https://prsindia.org/billtrack/the-information-technology-intermediary-guidelines-and-digital-media-ethics-code-rules-2021
- https://qikink.com
- https://qikink.com/
- https://qoruz.com
- https://razorpay.com/blog/cash-on-delivery/
- https://razorpay.com/docs/payments/disputes/
- https://razorpay.com/docs/payments/recurring-payments/upi/
- https://razorpay.com/learn/scope-and-challenges-of-freelancers/
- https://razorpay.com/payment-pages/
- https://razorpay.com/pricing/
- https://replykaro.com
- https://replykaro.com/pricing
- https://research.atspotify.com/towards-a-fair-marketplace-trade-off-between-relevance-fairness-satisfaction-in-recsys/
- https://rollingstoneindia.com/heres-what-its-really-like-to-be-an-indian-indie-artist-playing-live-gigs/
- https://rollingstoneindia.com/what-the-music-industry-doesnt-talk-about-enough-minimum-wage-for-musicians
- https://samadhaan.msme.gov.in/
- https://scroll.in/latest/1031759/delhi-high-court-directs-telegram-to-disclose-details-about-channels-violating-copyright-law
- https://sfstandard.com/2023/04/27/whos-listening-once-buzzy-clubhouse-lays-off-half-its-employees/
- https://shipglobal.in/blogs/etsy-new-sellers/
- https://shipping.amazon.in/blog/cod-vs-prepaid-festive-season-surge-india
- https://skeb.jp/about
- https://skillboxes.com
- https://smestreet.in/smestreet-exclusive/msme-development-amendment-bill-2026-delayed-payments-analysis-12208060
- https://soundcloud.com/
- https://soundcloud.com/playbook-articles/introducing-buzzing-playlists-from-first-fans-to-fan-powered-playlists
- https://soundcloud.com/playbook-articles/soundcloud-introduces-direct-music-purchases-with-zero-commission
- https://soundcloud.com/playbook-articles/soundcloud-ticketmaster-universe-empowering-artists-to-easily-create-ticket-and-share-their-live-shows
- https://soundcloud.com/playbook-articles/soundcloud-unveils-all-in-one-artist-subscription-more-ways-to-earn-all-in-one-place
- https://stan.store/blog/stan-store-pricing/
- https://starclinch.com
- https://starclinch.com/
- https://starclinch.com/blog/guide-artist-booking-prices-in-india/
- https://starclinch.com/blog/how-to-find-live-music-gigs-in-india-complete-guide-for-emerging-artists/
- https://starclinch.com/our-story
- https://starclinch.com/terms-of-use
- https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/nov/doc20251117695301.pdf
- https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/sep/doc202594628401.pdf
- https://studioapara.substack.com/p/india-has-no-illustration-agents
- https://sumgenius.ai/blog/instagram-dm-bot-ban-wave-2026/
- https://support.google.com/googleplay/android-developer/answer/9858738
- https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN
- https://support.google.com/youtube/answer/10878910?hl=en
- https://support.google.com/youtube/answer/10879035
- https://support.google.com/youtube/answer/16261569
- https://support.google.com/youtube/answer/2657964
- https://support.google.com/youtube/answer/72902
- https://support.google.com/youtube/answer/7570245
- https://support.google.com/youtube/answer/9385307
- https://support.saatchiart.com/hc/en-us/articles/47701155135003-Getting-Started-with-Saatchi-Art-Sponsored-Listings
- https://support.saatchiart.com/hc/en-us/community/posts/48436730698523-Why-no-sales
- https://tagmango.com
- https://tagmango.com/pricing
- https://taxgarden.in/blog/tds-on-ecommerce-payments-section-194o-393-guide-india-fy-2026-27
- https://taxguru.in/goods-and-service-tax/facility-enrolment-supply-goods-e-commerce-operators-gst-un-registered-suppliers.html
- https://taxguru.in/rbi/rbi-regulation-payment-aggregators-directions-2025.html
- https://techcrunch.com/2018/05/08/instagram-action-buttons/
- https://techcrunch.com/2020/06/16/youtubes-famebit-rebrands-as-youtube-brandconnect-shuts-down-its-self-service-program/
- https://techcrunch.com/2021/10/26/adobes-behance-adds-support-for-nfts-and-paid-subscriptions/
- https://techcrunch.com/2022/04/26/bintango-wants-to-boost-indonesias-creator-economy/
- https://techcrunch.com/2022/11/08/instagram-scheduling-tool-all-professional-accounts/
- https://techcrunch.com/2022/12/01/discord-opens-up-paid-subscriptions-so-servers-can-sell-premium-perks/
- https://techcrunch.com/2023/02/14/instagram-is-killing-live-shopping-in-march-will-focus-on-ads-instead/
- https://techcrunch.com/2023/04/11/instagram-adds-new-features-to-its-creator-marketplace-expands-access-to-brand-agencies/
- https://techcrunch.com/2023/04/18/instagram-takes-on-linktree-and-others-with-support-for-up-to-5-links-in-bio/
- https://techcrunch.com/2023/04/27/instagram-facebook-force-checkout-experience-shops-soon/
- https://techcrunch.com/2023/07/10/frontrow-shutdown
- https://techcrunch.com/2023/07/18/instagram-making-easier-create-reels-using-templates/
- https://techcrunch.com/2023/07/18/komi-rolls-out-to-the-public-with-new-creator-tools/
- https://techcrunch.com/2023/07/24/instagram-launching-creator-subscriptions-australia-canada-uk-and-more/
- https://techcrunch.com/2023/08/02/cohart-art-marketplace-commerce/
- https://techcrunch.com/2023/10/17/patreon-acquires-livestream-ticketed-events-startup-moment/
- https://techcrunch.com/2023/12/14/linktree-acquires-link-in-bio-platform-koji-in-its-second-investment-of-the-year/
- https://techcrunch.com/2024/01/19/how-fypm-used-instagram-stories-and-thirst-traps-to-raise-275k/
- https://techcrunch.com/2024/02/21/instagram-launches-its-marketplace-to-connect-brands-and-creators-in-8-new-countries/
- https://techcrunch.com/2024/06/06/a-social-app-for-creatives-cara-grew-from-40k-to-650k-users-in-a-week-because-artists-are-fed-up-with-metas-ai-policies/
- https://techcrunch.com/2024/08/15/linktree-acquires-plann-social-media-scheduling-tool/
- https://techcrunch.com/2024/09/17/patreon-launches-features-to-automate-away-creators-administrative-workload-and-help-them-make-more-money/
- https://techcrunch.com/2024/12/06/instagram-locks-out-developers-of-third-party-consumer-apps
- https://techcrunch.com/2025/03/03/creator-monetization-platform-passes-sued-over-alleged-distribution-of-csam/
- https://techcrunch.com/2025/04/22/manychat-taps-140m-to-boost-its-business-messaging-platform-with-ai/
- https://techcrunch.com/2025/08/04/a-top-designer-was-banned-from-dribbble-now-hes-building-his-own-competitor
- https://techcrunch.com/2025/08/04/a-top-designer-was-banned-from-dribbble-now-hes-building-his-own-competitor/
- https://techcrunch.com/2025/08/18/linktree-goes-dark-in-india-and-the-company-isnt-sure-why/
- https://techcrunch.com/2025/08/26/youtubes-hype-feature-that-boosts-smaller-creators-launches-globally
- https://techcrunch.com/2026/01/28/apple-tells-patreon-to-move-creators-to-in-app-purchase-for-subscriptions-by-november/
- https://techcrunch.com/2026/09/15/meta-expands-subscription-push-with-new-ai-focused-plans/
- https://the420.in/india-cybercrime-24pct-rise-22495cr-loss/
- https://theartmarket.artbasel.com/download/The-Art-Basel-and-UBS-Art-Market-Report-2026-by-Arts-Economics.pdf
- https://theartmarket.artbasel.com/global-sales
- https://thecoo.co.jp/
- https://thecreativeindependent.com/artist-survey/
- https://thefintechtimes.com/creator-economy-still-thrives-globally-despite-a-drop-in-us-creators-finds-stripe/
- https://theindianeye.com/2026/09/18/upi-charges-to-apply-on-large-merchant-payments-from-october-15/
- https://theindianmusicdiaries.com/are-payment-delays-silencing-the-voices-of-independent-music/
- https://theindianmusicdiaries.com/who-gets-to-stay-indie-the-struggles-behind-the-indian-independent-music-scene/
- https://thenodmag.com/content/artificial-intelligence-creative-industry-backlash
- https://thenodmag.com/content/indian-content-creator-influencer-economy-struggles
- https://topmate.io
- https://topmate.io/
- https://topmate.io/about
- https://topmate.io/blog/online-session-platform-solutions
- https://topmate.io/pricing
- https://topmate.io/terms
- https://tracxn.com/d/companies/topmate/__0feQnNqxu633GVIOYt_LQu9YkfyWhOqrZyDJy8IiSew/funding-and-investors
- https://transparency.meta.com/features/approach-to-ranking/content-distribution-guidelines/engagement-bait/
- https://tring.co.in
- https://underdawg.in
- https://variety.com/2026/music/asia/india-paid-music-subscribers-30-million-2028-1236820218/
- https://veryprivategallery.com/what-is-saatchi-art/
- https://vgen.co
- https://vsco.co/vsco-hub
- https://web.archive.org/web/20240425074016/https://www.ipse.co.uk/resource/late-payment-within-the-self-employed-sector.html
- https://web.archive.org/web/20250115112950/https://www.reddit.com/r/DJs/comments/108d88t/what_source_do_you_use_for_leads_barkcom_is_trash/
- https://web.archive.org/web/20250305011756/https://www.reddit.com/r/musicians/comments/1faev3b/gigsalad_or_partyslate/
- https://web.archive.org/web/20250329214617/https://www.reddit.com/r/graphic_design/comments/1adwmgf/indian_graphic_designer_need_help_with_freelance/
- https://web.archive.org/web/20250607013454/https://www.reddit.com/r/pune/comments/1l2u0q0/scam_alert_for_pune_videographersphotographers/
- https://web.archive.org/web/20250706091905/https://www.reddit.com/r/Chennai/comments/1jx7bfr/whats_really_happening_with_dm_paid_collaborations/
- https://web.archive.org/web/20250710022556/https://www.reddit.com/r/mumbai/comments/1fndnzi/what_are_the_typical_fees_for_paying_influencers/
- https://web.archive.org/web/20250805034819/https://www.reddit.com/r/IndianHipHopHeads/comments/1bgpybf/india_tour_or_college_fest/
- https://web.archive.org/web/20251123131903/https://support.upwork.com/hc/en-us/articles/360049702614-Learn-about-Upwork-s-talent-badges
- https://web.archive.org/web/20260510163049/https://help.fiverr.com/hc/en-us/articles/360010560118-Understanding-Fiverr-s-freelancer-levels
- https://web.archive.org/web/20260526235902/https://collabstr.com/faq
- https://web.archive.org/web/20260704044017/https://collabstr.com/pricing
- https://web.archive.org/web/20260708083739/https://www.hire4event.com/
- https://web.pheedloop.com/blog/event-data-lab-report-06
- https://webhippo.in/blog/instagram-monetization-india
- https://wishlink.com
- https://writerbeware.blog/about/
- https://www.100ms.live/pricing
- https://www.404media.co/pinterest-is-drowning-in-a-sea-of-ai-slop-and-auto-moderation/
- https://www.adgully.com/post/15568/kofluence-launches-2026-influencer-marketing-report
- https://www.afaqs.com/news/digital/telegram-introduces-paid-subscriptions-and-star-reactions-to-enhance-creator-revenue
- https://www.afaqs.com/news/social-media/instagram-creator-marketplace-launches-in-india
- https://www.aljazeera.com/amp/economy/2020/7/1/indias-tiktok-ban-hurts-content-creators-earnings-prospects
- https://www.angelone.in/news/unlisted-companies/bookmyshow-parent-reports-192-crore-profit-as-live-events-scale-up
- https://www.artasiapacific.com/market/durability-in-the-global-circuit-india-art-fair-2026/
- https://www.artconnect.com/
- https://www.artconnect.com/opportunities?country=IN
- https://www.artflute.com/
- https://www.artflute.com/artist-faqs
- https://www.artsceneindia.com/2025/09/GST-on-FineArt-Benefits-and-Implications.html
- https://www.artstation.com/about
- https://www.bandlab.com
- https://www.bcg.com/publications/2025/india-from-content-to-commerce-mapping-indias-creator-economy
- https://www.behance.net
- https://www.behance.net/blog/year-in-review-2025
- https://www.behance.net/pro
- https://www.blinkstore.in
- https://www.boomlive.in/explainers/bollywood-casting-director-shares-how-fake-accounts-impersonate-him-to-dupe-actors-16434
- https://www.britishcouncil.in/programmes/arts
- https://www.business-standard.com/economy/news/gst-rate-cut-from-12-to-5-poised-to-brighten-india-s-art-landscape-125092400909_1.html
- https://www.business-standard.com/india-news/young-collectors-global-recognition-fuelling-indian-art-astaguru-ceo-123100900622_1.html
- https://www.businessinsider.com/creator-income-inequality-grows-top-earners-paydays-rise-2026-1
- https://www.businessinsider.com/influencers-testing-instagram-creator-marketplace-waiting-brand-deals-money-2022-9
- https://www.businesstoday.in/india/story/indian-art-market-hits-decade-high-rs2543-crore-turnover-in-2025-555221-2026-09-13
- https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17
- https://www.businesstoday.in/technology/artificial-intelligence/story/why-t-series-saregama-sony-want-to-join-a-copyright-lawsuit-against-openai-in-india-464747-2025-02-14
- https://www.businesstoday.in/technology/news/story/little-yellow-bird-says-final-goodbye-indias-twitter-rival-koo-shuts-down-435555-2024-07-03
- https://www.businesstoday.in/technology/news/story/small-content-creators-just-got-a-big-boost-with-youtubes-hype-485045-2025-07-17
- https://www.buzzfeednews.com/article/chrisstokelwalker/art-subreddit-illustrator-ai-art-controversy
- https://www.buzzincontent.com/news/youtube-launches-hype-feature-in-india-to-boost-small-creators-visibility-9498785
- https://www.bwtravel.com/industry-insights/wedmegood-report-2025-shows-rise-in-wedding-spends-and-shift-towards-local-destination-weddings-10901110
- https://www.castiko.com
- https://www.chiratae.com/from-passion-to-music-education-why-we-backed-artium-academy/
- https://www.creativeboom.com/resources/everyones-talking-about-cara-but-is-it-any-good/
- https://www.critiquecircle.com/
- https://www.cyrilshroff.com/wp-content/uploads/2025/10/Client-Alert-RBI-Introduces-Consolidated-Framework-for-Payment-Aggregators-3.pdf
- https://www.davidrevoy.com/article1032/a-critique-of-caraapp-the-no-ai-instagram-and-artstation-copycat-child
- https://www.deseret.com/entertainment/2022/7/27/23279691/instagram-changes-user-feed-copying-tiktok-kim-kardashian-kylie-jenner-video-post-petition-recommend/
- https://www.deviantart.com/artists-beware
- https://www.deviantartsupport.com/kb/en/article/what-are-daily-deviations-and-how-can-i-suggest-art-for-a-daily-deviation-feature
- https://www.digitalmusicnews.com/2025/05/14/soundcloud-ai-training-terms/
- https://www.digitalmusicnews.com/2025/11/05/spotify-accused-of-payola-in-class-action-lawsuit/
- https://www.district.in/
- https://www.diyphotography.net/beware-of-this-elaborate-scam-targeting-behance-users/
- https://www.dpiit.gov.in/static/uploads/2025/12/ff266bbeed10c48e3479c941484f3525.pdf
- https://www.engadget.com/instagrams-algorithm-overhaul-will-reward-original-content-and-penalize-aggregators-130018977.html
- https://www.etsy.com/in-en/sell
- https://www.eventbrite.com/organizer/pricing/
- https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/2026/03/ey-stories-scale-and-impact-un-locking-indias-media-and-entertainment-economy.pdf
- https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/documents/ey-the-music-creator-economy.pdf
- https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-india-s-rising-concert-economy.pdf
- https://www.ey.com/content/dam/ey-unified-site/ey-com/en-in/insights/media-entertainment/ey-state-of-influencer-marketing-in-india-03-04-2024.pdf
- https://www.ey.com/en_in/newsroom/2026/03/india-s-13-000-crore-live-events-market-fuels-shift-to-experiential-marketing-bookmyshow-ey-parthenon-report
- https://www.ey.com/en_in/newsroom/2026/03/india-s-media-and-entertainment-sector-grew-9-percent-to-inr-2-point-78-trillion-in-2025-driven-by-digital-and-live-experiences-ficci-ey-report
- https://www.feature.fm/pricing
- https://www.framer.com/creators
- https://www.franvia.com/2026/04/k-pop-fandom-platform-weverse-d2c-retail.html
- https://www.freepressjournal.in/business/youtube-to-invest-850-crore-pays-21000-crore-to-indian-creators
- https://www.freepressjournal.in/mumbai/mumbai-crime-18-year-old-aspiring-actress-duped-with-fake-web-series-offer-blackmailed-with-morphed-photos-case-registered
- https://www.fypm.vip
- https://www.fypm.vip/
- https://www.gla.ac.uk/news/archiveofnews/2024/november/headline_1130637_en.html
- https://www.heyorca.com/blog/instagram-social-news
- https://www.hiscox.co.uk/sites/default/files/documents/2021-04/hoatr_report_2020_part3.pdf
- https://www.hiscox.co.uk/sites/default/files/documents/2023-04/Hiscox%20online%20art%20trade%20report%202023.pdf
- https://www.ibtimes.co.in/how-much-do-creators-really-earn-kofluence-ceo-decodes-indias-influencer-economy-interview-885077
- https://www.inro.social/blog/instagram-comment-to-dm-automation
- https://www.inro.social/pricing
- https://www.instamojo.com/pricing/
- https://www.kofluence.com
- https://www.kofluence.com/
- https://www.kofluence.com/blog/2025-influencer-marketing-report-sneak-peek/
- https://www.kofluence.com/blog/how-much-money-indian-creators-really-make/
- https://www.kofluence.com/blog/micro-vs-nano-vs-macro-influencers/
- https://www.komi.io/pricing
- https://www.kotakmf.com/Information/blogs/inside-india-creator-economy
- https://www.kyoorius.com/
- https://www.lemonsqueezy.com/pricing
- https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace
- https://www.lennysnewsletter.com/p/how-to-kickstart-and-scale-a-marketplace-911
- https://www.linkdm.com
- https://www.linkedin.com/posts/ankitagarwal6_celebration-milestone-topmate-activity-7115660627351678976-_27O
- https://www.linkfire.com/pricing
- https://www.medianama.com/2024/06/223-stripe-invite-only-services-in-india-temporarily-citing-regulations/
- https://www.medianama.com/2026/06/223-10-instances-india-deepfake-rules-enforcement-failures/
- https://www.medianama.com/2026/07/223-ani-openai-copyright-dispute-delhi-high-court-interim-relief/
- https://www.medianama.com/2026/09/223-ai-art-copyright-india-author-dabus/
- https://www.medianama.com/2026/09/223-govt-role-upi-mdr-gst/
- https://www.medianama.com/2026/09/223-upi-transactions-august-2026/
- https://www.medianews4u.com/15-of-indias-creators-are-now-registered-business-entities-as-influencer-marketing-crosses-a-structural-threshold-kofluence/
- https://www.medianews4u.com/75-of-indias-influencer-marketing-happens-in-the-dark-thats-not-a-stat-thats-a-structural-failure/
- https://www.medianews4u.com/as-indian-short-video-apps-slide-reels-and-shorts-to-ride-10bn-opportunity-experts/
- https://www.medianews4u.com/live-events-growth-shifts-beyond-metros-next-10-cities-lead-expansion-wave-ficci-ey-report/
- https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf
- https://www.memeraki.com
- https://www.memeraki.com/
- https://www.meta.com/meta-verified/
- https://www.mightynetworks.com/pricing
- https://www.mojarto.com/
- https://www.mojarto.com/sellerFaq
- https://www.moneycontrol.com/news/technology/future-salaries-can-only-be-paid-out-once-koo-finds-a-buyer-co-founder-mayank-bidawatka-12708326.html
- https://www.musicbusinessworldwide.com/india-added-nearly-4m-paid-music-streaming-subscriptions-in-2025-taking-its-total-to-14-4m-according-to-new-report/
- https://www.musicbusinessworldwide.com/music-making-app-bandlab-surpasses-100-million-users/
- https://www.musicbusinessworldwide.com/music-promotion-startup-groover-raises-8m-in-series-a-funding/
- https://www.musicbusinessworldwide.com/soundcloud-launches-3-25-a-month-artist-tier-targeting-emerging-and-aspiring-musicians/
- https://www.musicbusinessworldwide.com/soundcloud-tackles-zero-plays-problem-with-ai-powered-first-fans-feature/
- https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/
- https://www.nngroup.com/articles/participation-inequality/
- https://www.notion.com/help/selling-on-marketplace
- https://www.nyc.gov/assets/dca/downloads/pdf/workers/DCWP-Freelance-Isnt-Free-Act-Five-YearReport-2023.pdf
- https://www.oneimpression.io
- https://www.outlookbusiness.com/ampstories/news/india-loses-2-lakh-creators-amid-burnout-low-payheres-what-you-need-to-know
- https://www.outlookmoney.com/banking/npci-to-end-upi-p2p-collect-requests-from-october-1-to-reduce-fraud
- https://www.patreon.com/pricing
- https://www.patreon.com/uncomfortable
- https://www.paypal.com/in/webapps/mpp/merchant-fees
- https://www.pib.gov.in/PressReleasePage.aspx?PRID=2126106
- https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2
- https://www.pixpa.com/about
- https://www.pixpa.com/pricing
- https://www.planoly.com/creator-store?from=snipfeed
- https://www.planoly.com/pricing
- https://www.popsci.com/technology/deviantart-ai-generator-dreamup/
- https://www.prnewswire.com/news-releases/stan-the-creator-platform-powering-80-000-active-users-launches-stanley-an-ai-head-of-content-for-linkedin-302716013.html
- https://www.profitbox360.com/research/india/ecommerce/cod-prepaid-rto-rates-india
- https://www.proko.com/course-lesson/gesture-critique
- https://www.qoruz.com/pricing
- https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11822&Mode=0
- https://www.replykaro.com/blog/superprofile-auto-dm-vs-replykaro-2026
- https://www.replykaro.com/instagram-dm-automation
- https://www.saatchiart.com/whysell
- https://www.scconline.com/blog/post/2026/02/12/it-rules-2026-ai-and-intermediary-compliance/
- https://www.sec.gov/Archives/edgar/data/0001762301/000117891326003624/exhibit_99-1.htm
- https://www.sec.gov/Archives/edgar/data/1370637/000137063726000019/etsy-20251231.htm
- https://www.sfwa.org/other-resources/for-authors/writer-beware/
- https://www.shiprocket.in/pricing/
- https://www.siliconindia.com/startup/startup-funding/starclinch-raises-seed-round-from-artha-venture-fund-nitish-mittersain-nwid-30837.html
- https://www.socialinsider.io/blog/social-media-reach/
- https://www.socialinsider.io/social-media-benchmarks/instagram
- https://www.socialmediatoday.com/news/instagram-allows-creators-to-schedule-trial-reels/816549/
- https://www.socialmediatoday.com/news/instagram-tests-creator-insights-profile-performance-brands/719065/
- https://www.socialmediatoday.com/news/instagram-trial-reels-increase-reach-tests/750121/
- https://www.socialmediatoday.com/news/meta-posts-for-ai-training-cannot-opt-out/718410/
- https://www.socialmediatoday.com/news/meta-tests-auto-dm-response-for-instagram-ad-comments/828791/
- https://www.socialpilot.co/plans
- https://www.spotify.com/in-en/premium/
- https://www.spurnow.com/pricing
- https://www.stage32.com/scriptservices
- https://www.storyboard18.com/amp/how-it-works/93-brands-prioritise-instagram-as-84-creators-monetise-best-through-short-form-video-kofluence-report-98028.htm
- https://www.storyboard18.com/brand-makers/payment-delays-plague-influencer-marketing-agencies-as-major-brands-lag-behind-77033.htm
- https://www.storyboard18.com/how-it-works/46-creators-are-full-time-influencers-but-most-still-rely-on-side-income-streams-kofluence-report-98018.htm
- https://www.storyboard18.com/how-it-works/creator-economy-in-india-hits-rs-3500-crore-fueled-by-ecomm-fmcg-sectors-kofluence-73457.htm
- https://www.storyboard18.com/how-it-works/indias-creator-economy-influences-400-bn-in-consumer-spend-set-to-drive-1-tn-by-2030-bcg-64390.htm
- https://www.submithub.com/help
- https://www.talentrack.in
- https://www.techtimes.com/articles/322958/20260804/india-opens-door-upi-merchant-fees-parliament-amends-six-year-zero-mdr-law.htm
- https://www.theestablished.com/culture/living/who-can-really-claim-to-be-an-artist-when-the-medium-is-a-machine
- https://www.theguardian.com/media/2023/feb/04/ive-given-up-getting-paid-design-agency-accused-of-exploiting-artists
- https://www.thehindu.com/business/koo-raises-30mn-funding-led-by-tiger-global/article34647225.ece
- https://www.therunway.ventures/p/frontrow
- https://www.threads.com/@mosseri/post/C6bd8O3xyCj?hl=en
- https://www.tribuneindia.com/news/delhi/cyber-fraudster-arrested-for-cheating-aspiring-artistes
- https://www.tribuneindia.com/news/delhi/man-posing-as-casting-director-dupes-15-aspiring-models-in-delhi-581182
- https://www.tribuneindia.com/news/entertainment/as-music-fades-bollywoods-background-dancers-look-for-help-to-survive-87450/
- https://www.tribuneindia.com/news/trending/pay-rs-50-lakh-or-lose-instagram-page-in-a-first-influencer-with-57-million-followers-falls-victim-to-fake-copyright-scam
- https://www.trustpilot.com/review/beacons.ai
- https://www.trustpilot.com/review/buymeacoffee.com
- https://www.trustpilot.com/review/groover.co
- https://www.trustpilot.com/review/gumroad.com
- https://www.trustpilot.com/review/manychat.com
- https://www.trustpilot.com/review/masterclass.com
- https://www.trustpilot.com/review/submithub.com
- https://www.trustpilot.com/review/superprofile.bio
- https://www.trustpilot.com/review/topmate.io
- https://www.trustpilot.com/review/www.behance.net
- https://www.trustpilot.com/review/www.eventbrite.com
- https://www.wppmedia.com/news/influencing-with-integrity
- https://www.ycombinator.com/companies/laylo
- https://www.ycombinator.com/companies/tagmango
- https://www.zoho.com/social/pricing.html
- https://xfolio.jp/about
- https://yourquote.in
- https://zorcha.com
- https://zorcha.com/
- https://zorcha.com/pricing
