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
