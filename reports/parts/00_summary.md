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
