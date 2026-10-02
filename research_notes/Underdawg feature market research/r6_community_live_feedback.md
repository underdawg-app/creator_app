# R6: Creator-led live sessions, paid fan communities and creator-to-fan feedback (market validation of Underdawg Features 8 Live Rooms, 9 Fan Club, 10 Show & Review)

Researcher notes compiled 2026-10-01. **Evidence tags used throughout:**
- **[V]** I opened the page and confirmed the figure or claim.
- **[V2]** Confirmed on a secondary page I opened, which reports a primary source.
- **[C]** A company's or investor's own claim. I opened the page, but the claim is self-reported.
- **[S]** Seen only in a search-result snippet. The page was not opened or failed to load, so treat it as unverified.
- **(Inference)** My reasoning, not a sourced fact.

**Method limits:** the session's shared web-search quota (200 searches) ran out partway through the research, and our fetch tool cannot reach reddit.com. That means Reddit and Discord community sentiment is under-sampled. I say "recurring/common complaint" only where I opened at least 3 independent reviewers or discussions.

---

## Q0. Summary: do the three features survive validation?

### Takeaway
None of the three features should be built as specified.
- **Live Rooms:** validated demand but a saturated category that declined after COVID. **Modify** it and build after PMF.
- **Fan Club:** crowded, needs fans an artist doesn't yet have, carries a dead-community and moderation burden, and contradicts the "no in-app feed, artists-only" design. **Reject as specified.**
- **Show & Review:** the best-validated, but the side proven to pay is *artists* paying curators/pros for feedback plus a shot at exposure, and artists swapping peer critiques. Fans paying artists is not the proven model. **Modify** it into artist-to-artist + curator/pro critique linked to discovery, and **build early**.

### Cited Findings
- Paid live audio/video products for creators repeatedly failed or folded:
  - Twitter Ticketed Spaces: launched Aug 2021, discontinued about Nov 2022 because "few are willing to pay to listen to an audio chat" [V]. [AndroidHeadlines, 2022-11-01](https://www.androidheadlines.com/2022/10/twitter-ditches-paid-live-audio-feature-ticketed-spaces.html)
  - Superpeer (paid 1:1 calls and ticketed livestreams): acquired by Skillshare in Mar 2024, standalone product sunset at end-2024 [V2]. [Dealroom](https://dealroom.co/companies/superpeer)
  - FrontRow (India, artist/celebrity-led hobby learning): about $18M raised, shut 30 Jun 2023 [V]. [TechCrunch, 2023-07-10](https://techcrunch.com/2023/07/10/frontrow-shutdown)
- Subscription fan memberships are under pressure:
  - Patreon has 4x more free memberships than paid (100M vs 25M), and one-time payments are growing 3x faster than recurring ones.
  - Vault dropped subscriptions in Dec 2025; its CEO said "Subscriptions force artists into a schedule that doesn't match how they create music" [V].
  - Source: [Water & Music, 2026-04-30](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/)
- Paid feedback marketplaces where **artists pay** curators work at scale:
  - Groover: 600,000+ artists, 3,000+ curators, 6M+ pieces of feedback, €2 per curator [V]. [Groover pricing page](https://groover.co/en/lp/pricing/)
  - Playlist Push: 50,000+ artists [V]. [playlistpush.com](https://playlistpush.com/)
  - SubmitHub: "More than one million artists, publicists and labels" have used it [V]. [submithub.com](https://www.submithub.com/)
- Peer critique economies work without fans. Critique Circle (credits earned by critiquing others) is approaching "one million served critiques" since 2003 [V]. [critiquecircle.com](https://www.critiquecircle.com/)

### Inferences
- Preliminary verdict table (Inference, built on evidence in Q1–Q6):

| Feature | Verdict | Main evidence-based reason | Recommended shape |
|---|---|---|---|
| 8 Live Rooms | **Modify + Combine (critique/showcase rooms with Show & Review) + Build after PMF (Experiment)** | Real demand from teaching artists, but a very common category. Post-COVID decline (Clubhouse, Ticketed Spaces, FrontRow, Superpeer). Little discovery value for unknown artists. Material costs (video, refunds, piracy, minors, Apple in-app purchase rule for one-to-many sessions). | A ticketing + access + refund layer on the artist link page, using third-party/embedded video. Prioritise artist-to-artist formats (portfolio "hot-seat" reviews, curator AMAs, group critiques). 18+ at launch. |
| 9 Fan Club | **Reject as specified (Deprioritise a "Supporters-lite")** | Very common. Serves only artists who already have fans. 90-9-1 participation inequality. Moderation burnout. Subscription fatigue. Duplicates Instagram Subscriptions, Patreon, Discord and Telegram. Contradicts the no-feed design. | At most later: supporter list + one-time support/drops + members-only access to Live Rooms, delivered via Instagram DMs. No Reddit clone, no global leaderboards. |
| 10 Show & Review | **Modify → Build early (core peer loop); Experiment (paid pro/curator reviews)** | Artists demonstrably pay for feedback and exposure. Peer-critique credit systems sustain supply. Produces unique skill/talent data and discovery signals. | Artist-to-artist critique with a "give 3 to get 1" credit economy. Paid curator/pro queue with guaranteed reply or auto-refund. Before/after improvement loop. Curator picks feed discovery, with fairness caps. Fan→artist paid critique only as a later add-on for teaching artists. |

### Gaps
- No India-specific survey was found on willingness to pay ₹49–₹199/month for artist memberships or ₹99 per critique.
- Reddit, Discord-community and app-store review sentiment could not be sampled (tool limits).

---

## Q1. Feature 8: Live Rooms (scheduled paid/free artist sessions with video, chat, raise hand, tips, seats, auto-close, auto-refund, capped free tier)

### Takeaway
Artists do run paid sessions and learners do buy them, especially music and dance lessons and expert workshops. But the tooling is already abundant and cheap: Patreon Live, Instagram subscriber-only lives and badges, YouTube, Topmate/TagMango/Cosmofeed in India, Luma, Circle/Mighty/Skool, and Zoom. Standalone "paid live" products have a poor survival record after COVID. Live Rooms mainly monetises artists who already have an audience and does little for under-discovered artists unless redesigned around artist-to-artist review and showcase formats. Verdict: **Modify; build after PMF as an experiment.**

### Cited Findings

#### A. Problem validation: evidence that artists run paid sessions, that learners buy them, and pains with existing tools
- **Supply exists (artists teach):**
  - CLI Studios (dance) includes "weekly interactive Zoom classes with top instructors" that give "real time feedback", plus 1,000+ on-demand classes for $199/yr, ages 8+ [V]. [CLI Studios (accessed 2026-10)](https://www.clistudios.com/online-dance-classes/for-parents/)
  - Artium Academy (India): "1:1 Live Online music classes for all ages", 45,000+ learners, 400+ teachers, 18+ countries, 14 lakh+ learning hours [C]. [artiumacademy.com (accessed 2026-10)](https://artiumacademy.com/)
  - At its 2022 peak, FrontRow had 750 teachers [V2]. [The Runway, 2025-02-02](https://www.therunway.ventures/p/frontrow)
  - Patreon's top music creators are "educators/reviewers, not recording artists" [V]. [Water & Music, 2026-04-30](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/)
- **Demand exists (learners/fans pay):**
  - Artium: 45,000+ learners [C]. [artiumacademy.com](https://artiumacademy.com/)
  - FrontRow sold a live course subscription at $200 for 6 months and reached $1M annualised revenue within 3 months, but only broke even at $1.5M ARR [V2]. [The Runway, 2025-02-02](https://www.therunway.ventures/p/frontrow)
  - Weverse artists ran 6,558 LIVE broadcasts with over 1 billion total views in 2025. These are free fan lives by established K-pop acts [V2]. [Outlook Respawn, 2026-02-13 (Weverse 2025 Fandom Trend Report)](https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m)
- **Pain: fragmented tool stacks.**
  - Topmate's own blog describes an Indian creator who "uses Calendly for scheduling, Razorpay for payments, Zoom for video, Google Sheets for tracking, and WhatsApp for follow-ups". It says customers drop off "between the booking page and the Razorpay checkout link" [C, vendor content]. [Topmate blog, 2026-05-13](https://topmate.io/blog/online-session-platform-solutions)
  - Patreon launched native livestreaming so creators could stop relying on "Crowdcast, YouTube, OBS, Vimeo, and others" [V]. [TechCrunch, 2025-04-16](https://techcrunch.com/2025/04/16/patreon-tests-a-native-live-video-feature-where-creators-can-stream-24-7)
  - Fourthwall delivers "private livestreams via embedded unlisted YouTube streams" (a link-based workaround) [V]. [Fourthwall memberships](https://fourthwall.com/memberships)
- **Pain: link sharing and intrusions.**
  - Zoombombing surged in 2020 because meeting links and IDs were "shared publicly on Twitter, Reddit, and Discord". Some students deliberately shared passwords with raiders.
  - Zoom made passwords and waiting rooms default in April 2020 [V2].
  - Source: [Wikipedia: Zoombombing](https://en.wikipedia.org/wiki/Zoombombing)
- **Pain: piracy of paid teaching content (India).**
  - Teacher Neetu Singh's lecture videos and books were redistributed through Telegram channels "at discounted rates". On 30–31 Aug 2022 the Delhi High Court ordered Telegram to disclose channel operators' IPs and phone numbers [V]. [Scroll, 2022-08-31](https://scroll.in/latest/1031759/delhi-high-court-directs-telegram-to-disclose-details-about-channels-violating-copyright-law)
  - Telegram later disclosed the details (24 Nov 2022) [S]. [Business Standard](https://www.business-standard.com/article/current-affairs/telegram-discloses-copyright-infringing-materials-to-delhi-hc-122120101023_1.html)
- **Pain: no-shows.**
  - Across 860+ events, the median no-show rate was about 28% for free events and about 17% for paid events. "Payment, not friction, is the commitment filter." The report does not split virtual from in-person [V]. [PheedLoop Event Data Lab #06, 2026-05-26](https://web.pheedloop.com/blog/event-data-lab-report-06)
  - Average B2B webinar attendance was 33% of registrants in 2024 (about 29% in 2023), across 19,531 webinars. Average watch time was 29 minutes, and nearly a third of attendees rewatch on demand [V]. [Goldcast 2025 B2B Webinar Benchmark](https://www.goldcast.io/reports/b2b-webinar-benchmark-report-2025)
  - A Livestorm figure of 47.7% show-up in 2025 [S] could not be opened. [wavecnct aggregator](https://wavecnct.com/blogs/webinar-statistics)
- **Post-COVID collapse in demand for paid live and social audio** (4 independent sources):
  - Clubhouse founders: "as the world has opened up post-Covid, it's become harder for many people... to fit long conversations into their daily lives". The company laid off more than 50% of staff; downloads fell 80% YoY from H1 2021 to H1 2022; peak was about 10M weekly active users [V2]. [SF Standard, 2023-04-27](https://sfstandard.com/2023/04/27/whos-listening-once-buzzy-clubhouse-lays-off-half-its-employees/)
  - FrontRow's growth was "a lockdown false positive" [V2]. [The Runway, 2025-02-02](https://www.therunway.ventures/p/frontrow)
  - Ticketed Spaces closed because "few are willing to pay to listen to an audio chat" [V]. [AndroidHeadlines, 2022-11-01](https://www.androidheadlines.com/2022/10/twitter-ditches-paid-live-audio-feature-ticketed-spaces.html)
  - Patreon's COVID boom (musician revenue up 60% in Mar–May 2020) was followed by 17% layoffs in late 2022 [V]. [Water & Music, 2026-04-30](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/)

#### B. Competitor table: Live Rooms (live/paid sessions)

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Patreon Live | US | Native livestreams for members | Stream from Patreon app/web. Mark free or paid-members-only. Chat with emoji, scheduling, chat moderators, no time limit. Recordings can be paywalled. No native co-hosting at launch. | Creators with paying members | Included in membership (Patreon fee 10% for new creators from Aug 2025) | Patreon: 300k creators, 25M paid and 100M free memberships, $2B/yr to creators [V2]. No live-specific usage data. | Billing, membership and live in one place | No co-hosting at launch. Apple charges 30% on new iOS memberships (from Nov 2024). | Membership-gated streams, not per-session tickets with seats, raise hand, timer, auto-close or auto-refund. No UPI focus. | [TechCrunch 2025-04-16](https://techcrunch.com/2025/04/16/patreon-tests-a-native-live-video-feature-where-creators-can-stream-24-7); [NetInfluencer 2025-08-06](https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/); [Patreon 2024-08-12](https://news.patreon.com/articles/understanding-apple-requirements-for-patreon) |
| Instagram Live + Subscriptions + Badges | US (global) | Subscriber-only lives; tips (badges) during Live | Subscribers pay monthly for exclusive posts, stories, lives and DMs. Viewers buy badges at $0.99/$1.99/$4.99, up to $250 per live. | Creators already on Instagram (where Underdawg artists already are) | Paid. App stores take 30% of badges; "Instagram receives no portion" | No public usage data found | Zero switching cost for the audience | Badges "may not be available in your region" (India availability not confirmed). Teens under 16 can't go Live without parental permission (since 2025-04-10). | No ticketed one-off classes, seat caps, raise hand or structured class tools. Lives sit inside Instagram, so Underdawg would be competing with the host platform. | [Instagram Subscriptions](https://creators.instagram.com/earn-money/subscriptions); [Instagram Badges](https://creators.instagram.com/earn-money/badges); [Meta Newsroom 2024-09-17, updated 2025-04-10](https://about.fb.com/news/2024/09/instagram-teen-accounts/) |
| YouTube Live (memberships, Super Chat) | US | Members-only content; paid chat during lives | Creator receives 70% of net revenue from memberships, Super Chat, Super Stickers and Super Thanks. India membership prices start at ₹59. | YouTube creators | Free to watch; paid tiers | No live-class usage data found | Massive reach, cheap entry price | Broadcast format, not an interactive classroom | Not seat-limited classes; no refunds or auto-close | [YouTube Help 72902](https://support.google.com/youtube/answer/72902); [YouTube Help India pricing](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN) |
| Twitch | US | Live streaming with subscriptions | Default sub split 50/50. Partner Plus gives 70/30 on the first $100k/yr to streamers with 350+ paid subs for 3 months (2023 terms). | Streamers | Free to watch; subs | Only an [S] claim that 2.5% of partners qualify for 70/30 | Mature live tooling | Monetisation is skewed to big streamers by design | Entertainment broadcast, not classes | [TechCrunch 2023-06-15](https://techcrunch.com/2023/06/15/twitch-partner-plus) |
| Weverse LIVE | South Korea | Artist livestreams to fan community | Label-backed artists go live in the Weverse app. Commerce and memberships are separate. | K-pop and other label artists and their fans | Free to watch | 6,558 lives and 1B+ views in 2025. Average 11.2M MAU in 2025, peaking at 12M [V2]. | Huge engagement | Only for already-famous acts | Fan broadcast; no paid seats or teaching | [Outlook Respawn 2026-02-13](https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m); [Franvia 2026-04-23](https://www.franvia.com/2026/04/k-pop-fandom-platform-weverse-d2c-retail.html) |
| Maven Lightning Lessons | US | Free short live sessions as a funnel | Free 30–60 minute live lessons by experts that feed paid cohort courses. One listing shows "896 Students". | Professional upskilling | Free (funnel) | The listing counts above. No aggregate data found. | Proven top-of-funnel for paid courses (analogous to Underdawg's free capped sessions) | No public data on conversion | Non-artist, B2B topics; no tips or seats | [Maven for creators](https://maven.com/courses/for-creators); [Maven on X, 2025-08](https://x.com/MavenHQ/status/1956115677938319844) [S] |
| Topmate | India / US | 1:1 calls, webinars and digital products from one link | Profile link sells sessions and webinars. Fee about 10% plus about 2.9% payment gateway. | Indian experts and creators | Paid per transaction | No verified user numbers. Funding $1.13M [S]. | One link, no subscription fee | Third-party fee comparison; the vendor itself describes creators' fragmented stacks | Generic expert tool, not artist-specific; uses external video | [Peerseek 2026-07-24](https://peerseek.io/blogs/creator-platform-fees-india-compared); [Topmate blog 2026-05-13](https://topmate.io/blog/online-session-platform-solutions) |
| TagMango | India | Paid communities, workshops, courses | SaaS for creators to run paid communities and workshops | Indian edutainment creators | Paid (SaaS) | "5,000+ creators" collectively earning "over $100 million annually"; YC W20; profitable [C] | Built for Indian payments and creators | No verified complaint data | Tool for already-monetising creators; no discovery | [Y Combinator profile](https://www.ycombinator.com/companies/tagmango) |
| Cosmofeed | India | Paid Telegram groups and webinars | Bot adds and removes Telegram members on payment or expiry. Also webinars and gated content. | Indian creators | Fee 10% [S] | 50,000 creators, 25% of them paid users (Mar 2022) [V] | Rides on Telegram, India's biggest Telegram market | No verified complaint data | Delivered through Telegram, not an artist profile; no video rooms | [Business Today 2022-03-17](https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17) |
| Luma | US | Event pages with paid tickets | Event and ticket pages. 5% platform fee on the free plan, 0% on Luma Plus ($59/mo billed annually), plus Stripe fees. | Event organisers | Free / Plus | No verified usage data | Simple ticketing | Video is external | Ticketing only; no in-room class tools | [Luma pricing](https://luma.com/pricing) |
| Circle / Mighty Networks | US | Community SaaS with built-in live rooms and streams | Circle: live room participants capped at 15/20/50 and stream attendees at 100/200/500 by plan. Mighty: 20–50 streaming hours/month; 100–3,000 event viewers. | Course and community businesses | $79–$419/mo plus 0.5–2% transaction fee | No public usage data | All-in-one | Live is capped by plan to control cost (same logic as Underdawg's free-tier caps) | Generic, not artist-specific; no discovery network | [Circle pricing](https://circle.so/pricing); [Mighty Networks pricing](https://www.mightynetworks.com/pricing) |
| CLI Studios | US | Interactive dance classes | Weekly interactive Zoom classes with "real time feedback" plus 1,000+ on-demand classes | Young dancers (8+) and dance teachers | $199/yr | Faculty of name choreographers. No subscriber count verified. | Strong curation | Page lists no child-safety features | Platform-run faculty, not each artist's own rooms | [CLI Studios](https://www.clistudios.com/online-dance-classes/for-parents/) |
| STEEZY Studio | US | Online dance learning (on-demand only) | 1,500+ classes, 150+ instructors, camera "mirror" mode. No live classes listed. | Hobby dancers | Subscription (7-day trial) | 1M+ downloads, 12K+ ratings at 4.7, 100+ countries [C] | Polished on-demand | No live classes; no instructor feedback listed | Shows a large dance-learning player chose on-demand over live | [steezy.co](https://www.steezy.co/) |
| Artium Academy | India | 1:1 live music classes | Certified teachers. Celebrity masterclasses (Sonu Nigam, KS Chithra, Aruna Sairam). Assignment tracking, recordings, progress reports. | Kids and adults; Indian diaspora | Paid (free trial) | 45k+ learners [C]; raised $3M in Oct 2022 [V] | Proven Indian live-learning model | 1:1, not group, live | Platform-run teachers; 1:1 rather than 1-to-many rooms | [artiumacademy.com](https://artiumacademy.com/); [Inc42 2022](https://inc42.com/buzz/online-music-learning-platform-artium-academy-bags-funding-from-chiratae-ventures-others/) |
| Zoom (with payment links and WhatsApp) | US | The default workaround | Links shared after payment | Everyone | Freemium | No artist-specific data | Familiar | Link sharing and Zoombombing; manual refunds and reminders | Underdawg would bundle ticket, access, refund and reminder | [Wikipedia: Zoombombing](https://en.wikipedia.org/wiki/Zoombombing) |

**B2. Failed or declined live products (lessons):**

| Platform | Country | What it was | Outcome | Lesson | Source |
|---|---|---|---|---|---|
| Twitter/X Ticketed Spaces | US | Paid live audio rooms (Twitter took 3% below $50k and 20% above) | Launched Aug 2021; discontinued about Nov 2022; "brought little profit" | Paying to attend live talk is a thin market outside teaching | [AndroidHeadlines 2022-11-01](https://www.androidheadlines.com/2022/10/twitter-ditches-paid-live-audio-feature-ticketed-spaces.html) |
| Clubhouse | US | Live audio rooms | Over 50% layoffs in Apr 2023; downloads down 80% YoY | Live formats lose to people's daily time constraints once lockdowns end | [SF Standard 2023-04-27](https://sfstandard.com/2023/04/27/whos-listening-once-buzzy-clubhouse-lays-off-half-its-employees/) |
| Superpeer | US | Paid 1:1 calls, ticketed livestreams, subscriptions ($10M raised in 2020) | Acquired by Skillshare Mar 2024; standalone sunset end-2024 | "Creator live-session tool" is not a standalone business; it became a feature of a bigger platform | [Dealroom](https://dealroom.co/companies/superpeer) |
| FrontRow | India | Celebrity/artist-led hobby learning (music, dance, etc.) | About $18M raised; $3–4M ARR; shut 30 Jun 2023 | Marketing exceeded 100% of revenue in mid-2021; the hobby-learning market was "way smaller than anticipated" [V2] | [TechCrunch 2023-07-10](https://techcrunch.com/2023/07/10/frontrow-shutdown); [The Runway 2025-02-02](https://www.therunway.ventures/p/frontrow) |
| Unluclass (Unlu) | India | Celebrity classes (Johnny Lever, Ruskin Bond, Guru Randhawa…) | $1.2M seed. Claimed "over 1 Mn users… 2000+ celebrities" [C]. No current status found. | Celebrity-led learning, like FrontRow | [Inc42 (2021)](https://inc42.com/buzz/celebrity-focussed-skilling-engagement-platform-unlu-bags-seed-round-from-nexus-others/) |

#### H. Risk evidence and how competitors handle it
- **App-store billing.**
  - Apple App Store Guideline 3.1.3(d) [V]: one-to-one real-time services "may use purchase methods other than in-app purchase… One-to-few and one-to-many real-time services must use in-app purchase."
  - Guideline 3.1.1 [V]: tips must use in-app purchase currencies ("Apps may use in-app purchase currencies to enable customers to 'tip'…").
  - Source: [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
  - Google Play requires its billing for in-app digital content and subscriptions. Exemptions are physical goods and services, including "gym memberships" and "tickets for live events". Online classes are not listed as exempt. Alternative billing is allowed "in eligible countries/regions" [V]. [Google Play Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738)
  - Patreon was forced to use Apple in-app purchase for new iOS memberships from Nov 2024, at 30% [V]. [Patreon, 2024-08-12](https://news.patreon.com/articles/understanding-apple-requirements-for-patreon)
- **Minors.**
  - Instagram Teen Accounts: "teens under 16 can't access Live without a parent's permission" (update 2025-04-10). Rolled out worldwide in Jan 2025 [V]. [Meta Newsroom](https://about.fb.com/news/2024/09/instagram-teen-accounts/)
  - India's DPDP Act defines a child as under 18. It bars processing that "involves their tracking, behavioral monitoring or targeted advertising". DPDP Rules 2025 were notified 13 Nov 2025, with phased dates to 13 May 2027 [V2]. [Wikipedia: DPDP Act 2023](https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Act,_2023)
  - CLI Studios targets ages 8+ and lists no safety features on its parents' page [V]. [CLI Studios](https://www.clistudios.com/online-dance-classes/for-parents/)
- **Intrusion and harassment.** Zoom's response was default passwords and waiting rooms (Apr 2020); the FBI advised private meetings and host-only screen sharing [V2]. [Wikipedia: Zoombombing](https://en.wikipedia.org/wiki/Zoombombing)
- **Moderation tooling.**
  - Patreon Live lets creators "assign moderators to the chat" [V]. [TechCrunch 2025-04-16](https://techcrunch.com/2025/04/16/patreon-tests-a-native-live-video-feature-where-creators-can-stream-24-7)
  - Mighty Networks sells moderator seats by plan (10/15/100) [V]. [Mighty pricing](https://www.mightynetworks.com/pricing)
- **Video cost (list prices).**
  - 100ms: $0.004 per participant-minute after 10,000 free minutes/month; recording $0.0135/min; live streaming $0.0012 per viewer-minute [V]. [100ms pricing](https://www.100ms.live/pricing)
  - LiveKit Cloud: $0.0005 per participant-minute (Build/Ship) or $0.0004 (Scale), plus bandwidth at $0.12/GB (Ship) or $0.10/GB (Scale) beyond included amounts [V]. [LiveKit pricing](https://livekit.com/pricing)
  - Agora: "starts at $0.59 per 1000 minutes"; resolution tiers not shown [V]. [Agora pricing](https://www.agora.io/en/pricing/)
  - Competitors cap live capacity by plan (Circle, Mighty) [V].
- **Refunds and billing trust.**
  - MasterClass is rated 1.6/5 from 1,178 Trustpilot reviews. Recurring complaints (4 separate reviewers, Sep 2026) are about auto-renewal, cancellation barriers and refusals to refund [V]. [Trustpilot MasterClass](https://www.trustpilot.com/review/masterclass.com)
  - Groover's model: if a curator doesn't reply within 7 days, the artist automatically gets credits back [V]. [Groover help](https://help.groover.co/en/articles/2950583-groover-in-a-few-words)
- **Piracy.** Lecture videos are resold via Telegram (Delhi HC case above) [V]. Cosmofeed removes Telegram members automatically when a subscription ends [S]. [Cosmofeed](https://cosmofeed.com/monetise-your-existing-telegram-groups)

#### J. India facts for Live Rooms
- Music-learning investor claims (Chiratae, Artium's lead investor):
  - More than 15M Indian households are music learners, projected to exceed 21M by 2025.
  - Music education is "almost a $2 Billion market"; extracurriculars are a "$10 Billion opportunity".
  - Over 75% of Indian parents prefer performing arts for their children.
  - Existing online options were limited to "1 teacher: many students or recorded sessions" [C].
  - Source: [Chiratae, 2022-12-12](https://www.chiratae.com/from-passion-to-music-education-why-we-backed-artium-academy/)
- Indian session-tool fees [V2, third-party comparison]: Topmate 10% + ~2.9%; SuperProfile 5% + GST and ₹499/mo; Graphy 10% + GST and ₹1,999–₹8,400/mo; Instamojo 5% + ₹3. "Most platforms add 18% GST on top of their cut." [Peerseek, 2026-07-24](https://peerseek.io/blogs/creator-platform-fees-india-compared)
- UPI AutoPay (relevant if sessions are bundled into subscriptions) requires a pre-debit notification at least 24 hours before each debit. Customers set the maximum amount and frequency when registering a mandate [V]. [Razorpay docs](https://razorpay.com/docs/payments/recurring-payments/upi/)

### Inferences

#### A. Problem statement (per the brief's fields)
- **Problem being solved:** running a paid group session takes a stack of separate tools (scheduler, payment link, video link, WhatsApp/Telegram group, manual refunds and reminders). This creates checkout drop-off, link leakage, no-shows and refund admin. Evidence: Topmate blog, Patreon's rationale, Fourthwall's unlisted-YouTube workaround, Zoombombing, PheedLoop.
- **Severity:**
  - Medium for artists who already teach (dance, music, art instructors, portfolio reviewers).
  - Low for under-discovered artists, whose binding constraint is audience, not tooling. (Inference: FrontRow, Unlu and Artium all led with celebrity names to attract learners.)
- **Frequency:** weekly to monthly for teaching artists; rare for everyone else (Inference).
- **Segments most affected:** dance teachers, music teachers (India: vocal and instrumental), illustrators/designers offering portfolio reviews, photography workshop hosts (Inference, supported by CLI, Artium and Proko-style offerings).
- **Current workarounds:**
  - India: Zoom/Meet + Razorpay/UPI links + WhatsApp/Telegram groups, or Topmate/TagMango/Cosmofeed/Graphy/SuperProfile.
  - Global: Patreon Live, Instagram subscriber-only lives, YouTube memberships, Luma + Zoom, Circle/Mighty/Skool.
- **Why existing solutions are insufficient:** the gap is narrow. Integrated tools already exist cheaply in India (5–10% fees). What's missing is an *artist-specific* format (critique/hot-seat/portfolio review) connected to discovery and opportunity. That is a positioning gap, not a tooling gap.

#### C. Uniqueness
- **Classification: Very common.**
- **Functional:** low. Seats, chat, raise hand, moderators and recordings exist across Zoom, Circle, Mighty, Patreon Live and Instagram. Auto-close and auto-remove mirror Cosmofeed's Telegram automation; auto-refund mirrors Groover's credit refunds.
- **Audience:** low to medium. Dance (CLI, STEEZY) and music (Artium) platforms exist, but they are platform-run faculty, not "any artist's own room".
- **Workflow:** medium. Instagram DM-native ticketing, reminders and UPI on the artist link page is a plausible local workflow edge, and easy for Topmate or TagMango to copy.
- **Network:** low for fan classes (one-to-many with no cross-artist benefit). Medium if rooms are artist-to-artist (masterclasses, collab sessions, curator AMAs).
- **Data:** medium. Who teaches what, attendance, ratings and completion can become credibility signals ("taught 20 sessions, 4.8 rating").
- **Discovery:** low as specified. Medium if there is a cross-artist "upcoming sessions" directory with fair exposure and "open review nights" where unknown artists are reviewed live.
- **Combination:** artist-only network + IG-DM ticketing + UPI + critique formats is somewhat distinctive in India, but there is no defensible moat.

#### D. Artist value
- **Meaningful outcomes:**
  - Direct income for teaching artists. Teaching is the most monetisable activity on Patreon for musicians (Water & Music).
  - Credibility as an instructor.
  - Portfolio reviews by pros can lead to opportunities.
- **Vanity:** tips/badges, member counts, "live now" presence.
- **Who benefits:** mostly artists who already have followers. Unknown artists gain mainly if they are *participants* reviewed by established artists or curators.

#### E. Discovery impact
- **New or unknown artist exposure:** low as specified. Sessions sell to the host's existing Instagram audience.
- **Search, skill and genre discovery:** a directory of sessions by skill, city and genre could surface instructors (skill discovery) at 10k+ artists.
- **Curator, brand and collaboration discovery:** possible with formats like "curator listening session" or "brand brief AMA".
- **Popularity bias:** ranking sessions by attendance or revenue entrenches big accounts. The celebrity-faculty pattern (FrontRow, Unlu, Artium masterclasses) shows learners buy famous names.
- **Fair-discovery ideas (Inference):**
  - Rotate featured session slots.
  - Reserve a share of directory exposure for first-time hosts or hosts with fewer than ~2k followers.
  - Cap promoted sessions per artist per month.
  - Run "open stage / hot-seat" rooms where 5–10 emerging artists get reviewed (merges with Show & Review).
  - Rank by fit (discipline, city, level) rather than popularity.

#### F. Behaviour
- **Why use it:** income and convenience for teaching artists.
- **Frequency:** monthly to weekly for hosts; occasional for attendees.
- **Content creation:** yes. Hosts prepare sessions, and sessions produce recordings and clips.
- **Return:** yes, around scheduled events (calendar-driven retention).
- **Invite and share:** hosts share ticket links in Instagram stories and DMs, which brings buyers to Underdawg pages (acquisition loop).
- **Network effect:** weak (per-artist audience).
- **Creator loop (Inference):** host promotes on Instagram → followers buy via Underdawg → host earns → host schedules again. This is a monetisation loop, not a discovery loop, unless rooms also feature emerging artists or cross-promote other hosts.

#### G. Category
- Primary: **Monetisation**, then **Engagement** and **Retention** (for hosts).
- **Acquisition:** medium (shared ticket links).
- **Activation:** low.
- **Discovery:** low unless redesigned.

#### H. Risk assessment
- **Highest risks:**
  - Apple in-app purchase for one-to-many sessions and tips (30%, per Patreon's experience).
  - Minors in dance and music classes (DPDP rules on under-18s; Instagram's under-16 Live restriction shows the platform norm).
  - Piracy and link sharing.
  - Video cost of the free tier.
  - Refund disputes.
  - Low adoption, given post-COVID decline.
- **Free-tier cost estimate (Inference, list prices):**
  - One free session (45 min × 30 people = 1,350 participant-minutes) costs about $5.40 at 100ms.
  - Two per artist per month for 10,000 artists, fully used, would be about $108k/month.
  - On LiveKit, the same session costs about $0.68 in participant-minutes plus bandwidth. Assuming ~1.5 Mbps × 29 viewers × 45 min ≈ 14.7 GB ≈ $1.76, the total is about $2.4 per session, or about $49k/month at the same scale.
  - Realistic usage would be far lower (PheedLoop's 28% free no-shows; Goldcast's ~33% webinar attendance).
- **Paid-session economics (Inference):**
  - 30 seats × ₹199 = ₹5,970 gross.
  - A 2-hour, 30-person room costs about $14.40 at 100ms (about ₹1,220 at an assumed ₹85/$), roughly 20% of gross.
  - If bought through the iOS app, add Apple's commission.
- **NSFW and AI:** NSFW streams need live moderation; AI-generated content risk is low for live sessions.

#### I. Scale dependency
- **1k artists:** works only as a per-artist tool for the minority who teach. No network needed.
- **10k:** a cross-artist session directory has enough inventory per city and discipline.
- **100k:** recommendations and marketplace dynamics.
- **Large scale:** live discovery events and brand-sponsored rooms.

#### J. India implications
- India has mature, cheap competitors (Topmate, TagMango, Cosmofeed, Graphy, SuperProfile).
- The successful music-learning model is **1:1 live** (Artium).
- Celebrity-led group learning failed (FrontRow).
- Telegram piracy of teaching content is documented.
- UPI works for one-off tickets on the web. In-app digital purchases face Apple and Google billing rules, so the UPI-on-web route needs legal review (Inference).

#### K. Preliminary verdict: **Modify + Combine with Show & Review (critique/showcase rooms); Build after PMF (as an experiment)**
- **Reason:** validated but saturated. It mainly serves already-followed artists, carries material cost and safety risk, and has little discovery value as specified.
- **Recommended implementation:**
  1. v0 = "Sessions" on the artist link page: title, date, length, seats, price; UPI checkout on the web; single-use join tokens; Instagram DM reminders; automatic refund if the host cancels; attendance capture. Use third-party or embedded video (100ms/LiveKit) rather than building in-house.
  2. Prioritise artist-to-artist formats that create discovery: portfolio "hot-seat" reviews of emerging artists, curator and brand AMAs, group critiques (Proko-style).
  3. Make free sessions credit-based or sponsored, not a blanket subsidy.
  4. 18+ only at launch. Recording off by default. Host controls, report/block.
  5. Success metrics: share of artists hosting at least one session; paid attendance rate; repeat purchase; and whether *participating* emerging artists gain follows or opportunities.

### Gaps
- No reliable public data found on:
  - Live-session no-show rates specific to creator classes (only event and webinar benchmarks).
  - Patreon Live or Instagram subscriber-live adoption.
  - Refund or chargeback rates for creator sessions.
- STEEZY subscriber counts and CLI Studios membership numbers could not be verified (Billboard paywall).
- Indian behaviour data for live group classes (attendance, price points) was not found.
- Whether Instagram Subscriptions and Badges are live in India was not confirmed.
- Exact DPDP verifiable-parental-consent mechanics were not confirmed on a page I opened.

---

## Q2. Feature 9: Fan Club (per-artist Reddit-style community with free and paid tiers ₹49/₹199, posts, upvotes, Hot/New/Top, polls, ratings, points/badges/leaderboards, perks, moderators)

### Takeaway
This is one of the most saturated creator categories worldwide and in India. It monetises artists who *already* have fans, and the K-pop/Japan successes (Weverse, bubble, pixivFANBOX) depend on established fandoms. It is structurally exposed to participation inequality, moderation burden and 2025–26 subscription fatigue. It also contradicts Underdawg's "artists-only, no separate in-app feed" design. Verdict: **Reject as specified**; at most a "Supporters-lite" after PMF.

### Cited Findings

#### A. Problem validation (for and against)
- **For (fans pay for artist access):**
  - Patreon: 300,000 creators; 25M paid and 100M free memberships; $10B paid to creators since 2013; "$2 billion flows to creators annually" [V2]. [NetInfluencer, 2025-08-06](https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/)
  - Weverse: average 11.2M MAU in 2025, peaking at 12M in June. First annual profit in 2025 [V2]. [Franvia, 2026-04-23 citing HYBE Q4 2025](https://www.franvia.com/2026/04/k-pop-fandom-platform-weverse-d2c-retail.html)
  - Weverse engagement: 263 minutes/month per user, 303M posts and comments, about 90% of traffic from outside Korea [V2]. [Outlook Respawn, 2026-02-13](https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m)
  - bubble (DearU): 4,500 won per artist per month; over 1.2M subscriptions about a year after its Feb 2020 launch; 36% operating margin in H1 2021 [V]. [KED Global, 2021-10-18](https://www.kedglobal.com/entertainment/newsView/ked202110180002)
  - DearU Q3 2025 revenue ₩22.3B [V2]. [Franvia citing MBW](https://www.franvia.com/2026/04/k-pop-fandom-platform-weverse-d2c-retail.html)
  - About 2M paid bubble subscribers and 600 artists (Q3 2025) [S]. [Billboard](https://www.billboard.com/business/tech/j-balvin-peso-pluma-dear-u-bubble-app-exclusive-interview-1235787891/)
  - pixivFANBOX: 12M+ users, 220,000 creators, ¥50B+ cumulative payouts (25 Apr 2024). Illustrators are nearly half of creators. Many successful creators price their lowest tier around 500 JPY [V2]. [Yahoo Finance press release 2024-04-25](https://finance.yahoo.com/news/creator-support-platform-pixivfanbox-celebrates-140000007.html)
  - 7th anniversary: 13.5M users and 250k creators [S]. [AccessNewswire](https://www.accessnewswire.com/newsroom/en/computers-technology-and-internet/pixivfanbox-the-service-that-supports-creators-celebrates-its-7th-1015473)
  - Luminate: 15% of the US general population are superfans, who spend 80% more on music monthly [V2]. [MBW, 2023-07-19](https://www.musicbusinessworldwide.com/15-of-the-general-population-of-the-us-are-superfans-heres-what-that-means-for-the-music-business1/)
- **Against (fatigue, dead communities, burden):**
  - Patreon has 4x more free than paid memberships, and one-time payments are growing 3x faster than recurring.
  - Vault removed subscriptions in Dec 2025 ("adds pressure instead of creating space").
  - Spotify could not settle on superfan-tier features.
  - The emerging model is "be reachable, recognized, and ready when something meaningful happens" (drops and events) rather than monthly access [V].
  - Source: [Water & Music, 2026-04-30](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/)
  - Participation inequality: "90% of users are lurkers… 9%… contribute from time to time… 1%… account for most contributions". Fewer than 1% of Amazon book buyers write reviews [V]. [Nielsen Norman Group, 2006-10-08 (older, foundational)](https://www.nngroup.com/articles/participation-inequality/)
  - Geneva, a community/group-chat app, was acquired by Bumble in May 2024, "had not generated any revenue as of June 30, 2025", and was shut in Sept 2025 [V]. [TechCrunch, 2025-09-18](https://techcrunch.com/2025/09/18/bumble-bffs-revamped-app-is-here-focusing-on-friend-groups-and-community-building)
  - Moderation burden (2 independent verified sources; not enough under my 3-source rule to call it "common"):
    - A creator closing their Discord: "running and moderating a discord is more than I have time for right now… let it become a toxic place without moderators" [V]. [itch.io post (~2020, older)](https://itch.io/post/1916698)
    - A study of teen Discord moderators found "work-life balance" was the most common challenge, along with harmful-content exposure and harassment of moderators (n=13) [V]. [arXiv, 2025-02-10](https://arxiv.org/html/2502.06985v1)
  - Patreon built native chats because "Some creators will want an in-the-box solution… Their fans don't have to download another app." That is evidence of friction in running communities on Discord [V]. [TechCrunch, 2023-09-07](https://techcrunch.com/2023/09/07/patreon-pilots-discord-like-chatroom-feature/)

#### B. Competitor table: Fan Club (paid/free fan communities and memberships)

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Patreon (memberships, community chats, Live) | US | Paid tiers + creator posts + members' chat + live | Tiered memberships. Up to 4 chats per creator, gated by tier (2023). Creator-managed moderation with fan reporting. | Creators of all kinds | 10% fee for new creators from Aug 2025 (+3% Premium); legacy 8%/12% | 300k creators, 25M paid and 100M free memberships [V2] | Mature payments and brand | Free:paid is 4:1; Apple 30% on iOS (Nov 2024); fee increases | No upvotes or Hot sorting, leaderboards or verified-buyer reviews; not discovery-oriented | [AlternativeTo 2025-06](https://alternativeto.net/news/2025/6/patreon-is-increasing-platform-fees-for-new-creators-starting-august-2025/); [TechCrunch 2023-09-07](https://techcrunch.com/2023/09/07/patreon-pilots-discord-like-chatroom-feature/); [Water & Music 2026-04-30](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/) |
| Discord (servers + Server Subscriptions) | US | Community chat + paid roles | Server owners sell tiers at $2.99–$199.99 and keep 90% (US-only at Dec 2022 launch) | Gaming, creators, communities | Free; paid tiers | 90M+ daily active users (Q4 2025) [V] | Free, powerful, familiar | Volunteer moderation burden [V] | Chat-first, not per-artist profile communities; not artist-specific | [Discord blog 2022-12-01](https://discord.com/blog/server-and-creator-subscriptions); [discord.com/company](https://discord.com/company) |
| Instagram Subscriptions | US (global) | Paid subscriber content inside Instagram | Exclusive posts, stories, lives and DMs; subscriber badge; payout on the 21st of the following month | Instagram creators | Paid | No public subscriber data found | Sits where the audience already is (Underdawg artists use Instagram) | India availability not confirmed | Direct overlap with the host platform Underdawg piggybacks on | [Instagram Subscriptions](https://creators.instagram.com/earn-money/subscriptions) |
| YouTube channel memberships | US | Paid tiers, members-only posts and lives | Creator gets 70% of net. India tiers from ₹59, ₹119, ₹179, ₹239 (May 2025). | YouTubers | Paid | No India membership adoption data found | Low India price anchors | Tied to YouTube audience | Not artist-specific; no Reddit-style mechanics | [YouTube Help 72902](https://support.google.com/youtube/answer/72902); [YouTube Help India pricing](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN) |
| Twitch subscriptions | US | Paid subs, emotes, sub-only chat | 50/50 default; 70/30 for Partner Plus (350+ subs) | Streamers | Paid | — | Habitual live viewing | Splits skewed toward large streamers | Streaming-centric | [TechCrunch 2023-06-15](https://techcrunch.com/2023/06/15/twitch-partner-plus) |
| Substack (+ Chat) | US | Paid newsletter + subscriber chat | 10% fee. Substack Chat launched Nov 2022. | Writers, podcasters | Paid / free | 5M paid subscriptions (Mar 2025) [V2] | Owned email list | — | Writing-centric | [Wikipedia: Substack](https://en.wikipedia.org/wiki/Substack) |
| Fourthwall memberships | US | Memberships, DMs, polls, streak badges | 5% fee plus 2.9% + $0.30. Discord role sync. Private lives via unlisted YouTube. Branded apps. | Creators selling merch and memberships | Paid | Anecdotal case studies only | Badges and polls like Fan Club | Livestreams leak-prone (unlisted links) (Inference) | Similar perks; no artist-discovery network | [Fourthwall memberships](https://fourthwall.com/memberships) |
| Weverse | South Korea | Artist fan community + LIVE + memberships/DM + commerce | Label-operated communities for big acts | K-pop fans globally | Free + paid memberships/DM | Average 11.2M MAU (2025); peak 12M; profitable 2025 [V2] | Deep engagement | Only established acts | Fandom for stars, not emerging artists | [Franvia 2026-04-23](https://www.franvia.com/2026/04/k-pop-fandom-platform-weverse-d2c-retail.html); [Outlook Respawn 2026-02-13](https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m) |
| bubble (DearU) | South Korea | Paid artist-to-fan messaging | 4,500 won per artist per month; artists send voice, photo and text to subscribers | K-pop, and expanding to Latin music (J Balvin, Peso Pluma) [S] | Paid | 1.2M subscriptions (2021) [V]; about 2M (2025) [S] | Very low cost to run; 36% margin (H1 2021) | Needs famous artists | Paid intimacy with stars, not community for unknowns | [KED Global 2021-10-18](https://www.kedglobal.com/entertainment/newsView/ked202110180002) |
| pixivFANBOX | Japan | Creator support plans | Monthly plans; posts for supporters; illustrators about half of creators | Illustrators, VTubers, 3DCG artists, writers | 10% fee (higher for R-18) [S] | 12M+ users, 220k creators, ¥50B+ payouts (Apr 2024) [V2] | Artist-native (illustration) | NSFW handling and pricing [S] | Plans, not Reddit-style community; Japan-centric | [Yahoo Finance 2024-04-25](https://finance.yahoo.com/news/creator-support-platform-pixivfanbox-celebrates-140000007.html); [pixivFANBOX fee help (403)](https://fanbox.pixiv.help/hc/en-us/articles/360003726293-How-much-is-the-handling-fees) |
| Afdian | China | Creator sponsorship | Fans sponsor creators monthly | Chinese creators | 6% total fee (5% platform + 1% payments) | No reliable public data found | Low fee | — | China-only payments | [Afdian creator FAQ](https://guide.afdian.com/faq/faq-for-creators) |
| Skool | US | Community + courses + live calls | Hobby plan $9/mo + 10%; Pro $99/mo + 2.9%; "unlimited… live calls" | Coaches, info-product creators | Paid SaaS | No public community counts (third-party estimates only) [S] | All-in-one community + courses + live calls at a low entry price | — | Generic; no discovery network | [Skool pricing](https://www.skool.com/pricing) |
| Circle | US | Branded community + live | $89–$419/mo + 2%–0.5% | Course and community businesses | Paid SaaS | No public data | Full-featured | Cost for small artists | Generic SaaS | [Circle pricing](https://circle.so/pricing) |
| Mighty Networks | US | Community + courses + live | $79–$354/mo + 2%–0.5%; 10–100 moderators by plan | Community businesses | Paid SaaS | No public data | Branded apps | Cost | Generic SaaS | [Mighty pricing](https://www.mightynetworks.com/pricing) |
| Telegram paid subscriptions | UAE (not verified here) | Paid channels via Stars | Monthly subscription invite links paid in Stars (Aug 2024) | Channel owners | Paid | Telegram has 1B+ MAU (Mar 2025); India is its largest market [V2] | Where Indian paid groups already live | Telegram's cut was "not disclosed" [V]; a third party claims 100% to creators minus a 30% app-store cut on Star purchases [S]. Conflict noted. Piracy hub (Delhi HC). | Channel broadcast, not artist profile | [afaqs 2024-08](https://www.afaqs.com/news/digital/telegram-introduces-paid-subscriptions-and-star-reactions-to-enhance-creator-revenue); [Wikipedia: Telegram](https://en.wikipedia.org/wiki/Telegram_(software)) |
| TagMango | India | Paid communities | Branded learning communities, workshops, memberships | Indian edutainment creators | Paid | 5,000+ creators earning $100M+/yr [C] | India payments | — | For monetising creators; no discovery | [YC profile](https://www.ycombinator.com/companies/tagmango) |
| Cosmofeed | India | Paid Telegram/WhatsApp groups | Bot-managed paid access | Indian creators | 10% fee [S] | 50,000 creators, 25% paid (2022) [V] | Uses existing Telegram groups | — | No artist network | [Business Today 2022-03-17](https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17) |
| Geneva (failed) | US | Group community app | Group chats, forums, audio | Communities | Free | Zero revenue by Jun 2025; shut Sept 2025 [V] | — | Couldn't monetise community | Cautionary tale | [TechCrunch 2025-09-18](https://techcrunch.com/2025/09/18/bumble-bffs-revamped-app-is-here-focusing-on-friend-groups-and-community-building) |

Fantia and Ci-en (Japan) are named in the brief, but their pages could not be opened (403). Search snippets claim Fantia has 18M users and a 10–30% fee by content type [S]; these are unverified and excluded from the table.

#### H. Risk evidence and how competitors handle it
- **Moderation:**
  - Patreon chats are creator-managed with fan reporting, and a moderators feature was planned [V]. [TechCrunch 2023-09-07](https://techcrunch.com/2023/09/07/patreon-pilots-discord-like-chatroom-feature/)
  - Mighty Networks sells moderator capacity by plan [V].
  - Discord relies on volunteer moderators, who face burnout and harassment [V]. [arXiv 2025](https://arxiv.org/html/2502.06985v1)
- **Payments:** Apple in-app purchase at 30% applies to Patreon's iOS memberships [V].
- **Subscription billing trust:** MasterClass's recurring complaints about cancellation and refunds [V] show reputational risk for any recurring plan. [Trustpilot](https://www.trustpilot.com/review/masterclass.com)
- **Reputation and leaderboards:** NN/g advises reputation systems but warns against over-rewarding hyperactive users [V]. [NN/g](https://www.nngroup.com/articles/participation-inequality/)
- **NSFW:** pixivFANBOX reportedly charges higher fees for R-18 content [S], showing that NSFW needs separate economics and policy.

#### J. India facts for Fan Club
- Telegram: India was its largest market (22% of installs, Aug 2021) and is "the country with the most users" (Mar 2025) [V2]. [Wikipedia: Telegram](https://en.wikipedia.org/wiki/Telegram_(software))
- An investor quote around Cosmofeed's seed round: "1.5 billion WhatsApp and Telegram groups globally with a $50 billion opportunity but creators are unable to monetise" [C]. [Business Today 2022-03-17](https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17)
- **Price anchors:**
  - YouTube memberships start at ₹59/month [V].
  - Meta's consumer Instagram Plus is ₹99/month and WhatsApp Plus ₹79/month. Meta reports "15 million subscriptions and trials to date" (not split by paid or trial) [V]. [Best Media Info, 2026-09-16](https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837)
- UPI AutoPay mandates require a 24-hour pre-debit notification [V]. [Razorpay](https://razorpay.com/docs/payments/recurring-payments/upi/)

### Inferences

#### A. Problem statement
- **Problem being solved:** artists lack an owned, monetisable home for superfans, and Discord or WhatsApp groups are hard to run.
- **Severity:**
  - Low for under-discovered artists: you can't build a paid club without fans, and 90-9-1 means a 100-member club yields about 1 heavy contributor.
  - Medium for mid-tier artists with engaged followings.
- **Frequency:** daily or weekly posting is required to keep a club alive, which drives creator fatigue (Vault CEO quote).
- **Segments most affected:** established illustrators/VTubers (pixivFANBOX), musicians with superfans, educators.
- **Current workarounds:** Instagram close friends, broadcast and subscriptions; Patreon; YouTube memberships; Discord; Telegram/WhatsApp paid groups via Cosmofeed/TagMango.
- **Why insufficient:** fees, app switching and moderation load. But these pains are already addressed by many cheap tools, so the gap is small.

#### C. Uniqueness
- **Classification: Very common.**
- **Functional:** the individual pieces all exist:
  - Upvotes and Hot/New/Top sorting (Reddit, Weverse feeds).
  - Polls and streak badges (Fourthwall).
  - Moderators (Patreon, Mighty).
  - Tiers everywhere.
- **Audience:** artist-specific fan platforms already exist (pixivFANBOX for illustrators; Weverse and bubble for musicians).
- **Workflow:** a Reddit-style per-artist forum inside an app whose positioning is "no separate in-app feed" is a contradiction, not a differentiation.
- **Network:** an artists-only network does not make fan clubs more valuable. Fans follow artists, not the platform.
- **Data:** fan engagement data has some value to brands, but is biased toward popular artists.
- **Discovery:** none for unknown artists.
- **Combination:** tiers + Reddit sorting + verified-buyer reviews + leaderboards is an unusual bundle, but heavy to build and easy to copy.

#### D. Artist value
- **Meaningful outcomes:** recurring income for artists who already have fans.
- **Vanity:** upvotes, leaderboards, points, Hot sorting, member counts.
- **Net:** low artist value for Underdawg's core segment (under-discovered artists).

#### E. Discovery impact
- **Very low.** Leaderboards and "Hot" sorting concentrate attention on the 1% and on already-popular artists.
- **Fair-discovery ideas, if a lite version is ever built (Inference):**
  - No global "top clubs" rankings.
  - Cross-club recommendations that guarantee exposure to small artists.
  - Leaderboards scoped within a club only.
  - Supporter actions (e.g., "fans of A also support B") weighted toward artists with small followings.

#### F. Behaviour
- **Why use:** income (artists), status and access (fans).
- **Frequency:** fans visit daily or weekly only if creators post often.
- **Content creation:** yes, which means an extra content treadmill for the creator.
- **Return:** a fan-side retention driver only.
- **Invite and share:** creators share join links on Instagram (weak acquisition).
- **Network effect:** confined within each club.
- **Creator loop:** post → fans engage → creator earns. No loop that brings in *artists* or improves discovery.

#### G. Category
- **Monetisation:** for popular artists.
- **Engagement and retention:** for fans.
- **Acquisition:** weak.
- **Activation and discovery:** minimal.

#### H. Risk assessment
- Dead clubs: participation inequality, plus most small artists having few fans.
- Moderation and harassment load on artists (Discord evidence).
- Minors among fans.
- NSFW.
- Fake reviews (mitigated by "verified-buyer" only, but reviews will be sparse: fewer than 1% of Amazon buyers review).
- Leaderboard gaming.
- App-store 30%.
- Subscription billing trust (MasterClass).
- Subscription fatigue (Water & Music).
- Feature clutter and build complexity (a forum + payments + reputation system).

#### I. Scale dependency
- At every platform scale (1k, 10k or 100k artists) the binding constraint is each artist's own fan base, not platform size.
- Clubs only work for artists with thousands of engaged fans.
- Cross-club discovery would need large scale.

#### J. India implications
- India already has Telegram/WhatsApp paid groups with tooling (Cosmofeed, TagMango) and low price anchors (₹59 YouTube).
- Recurring UPI mandates add friction (24-hour pre-debit notices).
- No India data on conversion of followers to ₹49/₹199 members was found.
- Arithmetic (Inference): ₹10,000/month gross needs about 205 members at ₹49 or about 51 at ₹199, before fees, GST and app-store cuts.

#### K. Preliminary verdict: **Reject as specified; Deprioritise a "Supporters-lite" until after PMF**
- **Reasons:**
  - Very common category.
  - Weak artist value for the core segment.
  - No discovery value.
  - Contradicts no-feed and artists-only positioning.
  - High moderation and build cost.
  - Evidence of subscription fatigue (Vault, Patreon free:paid 4:1, one-time payments outgrowing recurring).
  - A community-app failure (Geneva).
- **If revisited:** a supporter list + one-time support and drops + early access to an artist's Live Rooms or releases, communicated through Instagram DMs and broadcast. This is event-based, matching the shift Water & Music describes. No Reddit clone, no global leaderboards.

### Gaps
- No verified data on:
  - Patreon chat adoption or engagement.
  - Discord server-subscription adoption.
  - Instagram Subscriptions' India availability or adoption.
  - Skool community counts.
  - Fantia/Ci-en scale.
  - Weverse membership prices.
- No public churn rates for paid fan memberships were found.
- Reddit evidence on "dead Discord/Patreon communities" could not be sampled.

---

## Q3. Feature 10: Show & Review (fans/students post work; the artist rates it and says what to fix; re-post before/after; paid members reviewed first; pay-per-review such as ₹99; "Help → Solved")

### Takeaway
Demand for feedback is the strongest-validated need in this research, but the proven willingness to pay sits with **artists paying gatekeepers (curators, pros, instructors) for feedback plus a shot at exposure**:
- Groover: 600k+ artists, 6M+ pieces of feedback.
- Playlist Push: 50k+ artists.
- SubmitHub: 1M+ users.
- Learners paying for structured critique inside education businesses (Drawabox, Proko, CLI Studios, Artium).

Free peer-critique economies also sustain themselves without fans (Critique Circle, nearly 1M critiques). The weak link is quality: generic, copy-paste feedback is a recurring complaint on Groover.

Verdict: **Modify.** Make it artist-to-artist peer critique plus a curator/pro review queue whose outcomes feed discovery. **Build the peer loop early**; experiment with paid pro reviews. Fan→artist paid critique can come later as a teaching-artist add-on.

### Cited Findings

#### A. Problem validation
- **Artists pay for feedback from pros or curators:**
  - Groover: €2 (2 Grooviz) per curator, 4–6 for top curators; "90% reply rate"; "Most reply in <72h"; credits back if no reply within 7 days; 3,000+ curators and pros; 600,000+ artists; "6M+ pieces of feedback"; "50K+ songs added on playlists"; packs from €46 [V]. [Groover pricing](https://groover.co/en/lp/pricing/)
  - Curators receive "€1 per feedback, whatever their decision is"; "1 million+ shares (reviews, playlist adds etc.)" [V]. [Groover help](https://help.groover.co/en/articles/2950583-groover-in-a-few-words)
  - Groover raised an $8M Series A; uses a 50/50 curator/platform split; the US is its largest market; founded in Paris in 2018 [V]. [TechCrunch, 2024-02-17](https://techcrunch.com/2024/02/17/groover-independent-artists-song-discovery/)
  - Playlist Push: campaigns from $280 (Spotify) and $350 (TikTok); "the review fee covers their time and feedback"; 4,000+ playlists; 50,000+ artists; 1M+ playlist adds; 4.6/5 from 5,982 reviews [C]. [playlistpush.com](https://playlistpush.com/)
  - SubmitHub: "1,700+ quality-checked" curators; "More than one million artists, publicists and labels have used SubmitHub" [C]. [submithub.com](https://www.submithub.com/)
  - Musosoup: campaign fee rose from £36 to £42 on 1 Jan 2026 [V]. [Musosoup blog](https://musosoup.com/blog/campaign-fees-are-changing-from-january-2026)
- **Learners value critique from instructors:**
  - Proko publishes long instructor critiques of student submissions (e.g., a 2:07:07 "Gesture Critique") inside a $119, 90-lesson course. A student comment: "Great critique, with many many helpful advices!" [V]. [Proko](https://www.proko.com/course-lesson/gesture-critique)
  - Drawabox: paid Patreon student tiers grant critique "credits" that "expire two months after their receipt" [V]. [Drawabox/Uncomfortable Patreon](https://www.patreon.com/uncomfortable)
  - Drawabox community critique is free but not guaranteed; official critique is priced "as cheaply as possible", and TAs are paid more than students pay [S]. [drawabox.com (page did not render on fetch)](https://drawabox.com/lesson/0/3/officialcritiquesignup)
  - CLI Studios' interactive classes give "real time feedback" [V].
  - Artium offers "assignment tracking, class recordings and progress reports" [C].
  - STEEZY lists peer feedback among members, with no instructor feedback [C]. [steezy.co](https://www.steezy.co/)
- **Peer critique without fans:**
  - Critique Circle: "Earn credits" by critiquing, spend credits to submit; nearly 1M critiques since Oct 2003; free with optional premium [V]. [critiquecircle.com](https://www.critiquecircle.com/)
  - Scribophile: karma points for critiques; "hundreds of thousands of writers" [C]. [scribophile.com](https://www.scribophile.com/)
- **Quality complaints (recurring complaint = 3 or more independent reviewers):**
  - Groover is rated 4.2/5 from 1,599 Trustpilot reviews, with 11% one-star.
  - "Almost none of them listened to my song… generic, copy-and-paste reviews" (Sep 2026).
  - "I paid $140 and have gotten 15 streams" (Sep 2026).
  - "Curators… fake pretending they are real" (Apr 2026).
  - Praise: "The feedback we receive… is incredibly professional" (Sep 2026) [V].
  - Source: [Trustpilot Groover](https://www.trustpilot.com/review/groover.co)
  - SubmitHub is rated 4.2/5 from 1,107 reviews. Reported issues include high rejection rates, outdated curator bios and vague rejections, and AI-detector false positives: "The detector ends up giving it a higher AI score" (Sep 2026) [V]. [Trustpilot SubmitHub](https://www.trustpilot.com/review/submithub.com)
  - TechCrunch's author: "it bums me out that pay-to-play has become the best option for these independent artists" [V]. [TechCrunch 2024-02-17](https://techcrunch.com/2024/02/17/groover-independent-artists-song-discovery/)

#### B. Competitor table: Show & Review (feedback and critique)

| Platform | Country | Similar Feature | How It Works | Target User | Free/Paid | Popularity/Adoption Evidence | Advantages | Problems/Complaints | Difference vs Underdawg Idea | Source |
|---|---|---|---|---|---|---|---|---|---|---|
| Groover | France | Paid curator/pro feedback with guaranteed reply | €2 per curator; curator paid €1; reply within 7 days or credits refunded | Independent musicians | Paid per submission | 600k+ artists, 3,000+ curators, 6M+ feedback, 50K+ playlist adds [V] | Guaranteed response; linked to exposure (playlists, radio, blogs) | Recurring complaint about generic feedback; pay-to-play concerns | Artist→curator (pro), music only; Underdawg proposes fan→artist | [Groover pricing](https://groover.co/en/lp/pricing/); [Groover help](https://help.groover.co/en/articles/2950583-groover-in-a-few-words); [TechCrunch 2024-02-17](https://techcrunch.com/2024/02/17/groover-independent-artists-song-discovery/); [Trustpilot](https://www.trustpilot.com/review/groover.co) |
| SubmitHub | US (not verified) | Paid/free submissions to curators with feedback on decline | Artists use credits to submit to curators, blogs and influencers | Independent musicians, PR, labels | Free + premium credits ($1–3 per curator [S]) | 1M+ users; 1,700+ quality-checked curators [C] | Transparency; choice of curators | Rejections, vague feedback, AI-detector false positives (reported) | Music only; curator, not fan | [submithub.com](https://www.submithub.com/); [Trustpilot](https://www.trustpilot.com/review/submithub.com) |
| Playlist Push | US (not verified) | Paid playlist/TikTok campaigns with written curator feedback | Budgeted campaigns; curators paid review fees | Musicians | From $280 / $350 | 50k+ artists, 1M+ playlist adds [C] | Scale of playlists | Price | Campaign promo, not skill critique | [playlistpush.com](https://playlistpush.com/) |
| Musosoup | UK | Curated promo marketplace | Flat campaign fee (£42 from 2026); curators offer free or paid coverage | Musicians | Paid | No verified scale data | Flat fee | Average paid-coverage prices unverified [S] | Promotion, not critique | [Musosoup blog](https://musosoup.com/blog/campaign-fees-are-changing-from-january-2026) |
| Proko | US (not verified) | Instructor critique videos of student work | Students submit assignments; instructor critiques many in one long video | Drawing learners | Course $119 (critique video shown free) | No user totals verified | Group critique scales an instructor's time | — | One-to-many critique as content (Proko). Underdawg's idea is one-to-one reviews. | [Proko](https://www.proko.com/course-lesson/gesture-critique) |
| Drawabox | Online (country not verified) | Paid "official critique" credits + free community critique | Patreon tiers grant credits (expire after 2 months); TAs critique | Drawing learners | Free lessons; paid critique | No verified totals | Cheap, structured | Free community critique "not guaranteed" [S] | Subsidised TA model; the artist doesn't review personally | [Patreon](https://www.patreon.com/uncomfortable); [drawabox.com [S]](https://drawabox.com/lesson/0/3/officialcritiquesignup) |
| CLI Studios | US | Real-time instructor feedback in live classes | Weekly interactive Zoom classes | Young dancers | $199/yr | — | Live correction | — | Feedback inside live classes, not async posts | [CLI Studios](https://www.clistudios.com/online-dance-classes/for-parents/) |
| Artium Academy | India | Teacher feedback, assignment tracking, progress reports | 1:1 live lessons + practice tools | Music learners (kids and adults) | Paid | 45k+ learners [C] | Structured progress | — | Platform teachers, not artists you follow | [artiumacademy.com](https://artiumacademy.com/) |
| STEEZY | US | Peer feedback and challenges in the community | Members "give feedback, share tips, and take on dance challenges" | Hobby dancers | Subscription | 1M+ downloads [C] | Peer loop | No instructor review | Peer-only | [steezy.co](https://www.steezy.co/) |
| Critique Circle | Online (since 2003) | Peer critique exchange (credits) | Critique others to earn credits; spend credits to get critiqued | Writers | Free + premium | About 1M critiques [C] | Self-sustaining supply | — | Model for artist-to-artist critique | [critiquecircle.com](https://www.critiquecircle.com/) |
| Scribophile | Online | Karma-for-critique | Same reciprocal model | Writers | Free + premium | "Hundreds of thousands of writers" [C] | Proven reciprocity | — | Same | [scribophile.com](https://www.scribophile.com/) |

Not verified, so excluded from the table rather than padded:
- Schoolism's paid "feedback" courses (a secondary source quotes $998 [S]).
- Domestika project feedback.
- Fiverr critique gigs (page 403).
- r/ArtCrit and r/IndieMusicFeedback (Reddit not reachable by our tools).
- DeviantArt critiques.

#### H. Risk evidence and how competitors handle it
- **Quality and effort:**
  - Groover guarantees a reply (refund if none) but not effort, hence the generic-feedback complaints [V].
  - Proko solves effort economics with batch critiques [V].
  - Drawabox pays TAs more than students pay [S], which implies feedback is costly to supply well.
- **AI content:** SubmitHub runs an AI detector, which creates false-positive disputes [V].
- **Pay-to-play:** a reputational risk (TechCrunch) [V].
- **Minors and safety:** Instagram's teen protections [V] and DPDP's under-18 rules [V2] apply to young dancers and singers posting videos (see Q1 sources).

### Inferences

#### A. Problem statement
- **Problem being solved:** emerging artists and learners lack credible, specific, timely feedback, and lack a path from "improved work" to "being seen".
- **Severity:** high for emerging artists. Paying for curator feedback at €2 a time across 50–100 curators per campaign (Groover's "most successful campaigns" contact at least 50) shows real spending.
- **Frequency:** per piece or per release, i.e., weekly to monthly.
- **Segments most affected:** independent musicians (strongest evidence), illustration and drawing learners, dancers (CLI, STEEZY), singers (Artium).
- **Current workarounds:** Groover, SubmitHub, Playlist Push, Musosoup, Reddit critique subs, Discord critique channels, course critiques (Proko, Drawabox), peer critique sites.
- **Why insufficient:**
  - Feedback is siloed by discipline (mostly music).
  - Feedback is often generic.
  - Feedback is pay-to-play.
  - There is no improvement tracking (before/after).
  - There is no visual/dance/music cross-discipline network.
  - Outcomes don't accumulate into credibility (no portable record of improvement or curator picks).

#### C. Uniqueness
- **Classification:**
  - As specified (fan→artist paid critique): **Somewhat common**, mostly inside education products.
  - Artist→curator paid feedback: **Common** in music.
  - Cross-discipline artist-to-artist + curator critique, with before/after revision tracking, "Solved" help threads and discovery linkage: **Rare**.
- **Functional:** star ratings plus text/voice notes exist; timestamped and draw-over critiques exist (Schoolism-style paintovers [S], Proko videos).
- **Audience:** artists-only, cross-discipline critique is uncommon.
- **Workflow:** the revise → re-post → before/after loop is not a standard feature in the marketplaces reviewed.
- **Network:** high. An artists-only network supplies reviewers, so the platform doesn't need fans.
- **Data:** high. Rubric scores, improvement deltas and curator picks are unique talent signals for brands and curators.
- **Discovery:** high, if curator and pro outcomes feed discovery surfaces.
- **Combination:** genuinely differentiated as a bundle (peer credits + pro queue + improvement record + discovery), though individual pieces exist.

#### D. Artist value
- **Meaningful outcomes:** skill improvement; credibility (curator picks, "most improved"); exposure to curators and brands; portfolio development; artist-to-artist interaction.
- **Vanity:** star averages without context, "Solved" counts, review counts.

#### E. Discovery impact
- **High potential for unknown artists:** unlike Live Rooms and Fan Club, work is judged on merit by reviewers.
- **Signals created:** skill and style discovery via rubric tags; curator discovery via the review queue; collaboration discovery via helpful reviewers.
- **Popularity bias risks:** paid priority ("paid members reviewed first") and pay-per-review favour artists with money (pay-to-win).
- **Groover conversion (Inference):** 50K playlist adds against 6M feedback is about 0.8%; 1M+ "shares" is about 1 in 6. The two figures come from different pages and possibly different dates. Either way, most paid feedback does not lead to exposure, so Underdawg must not oversell discovery.
- **Fair-discovery ideas (Inference):**
  - Blind or anonymised review queues.
  - Free review credits earned by critiquing peers (Critique Circle model), so money isn't the only route.
  - Reserved reviewer capacity for zero- or low-follower artists.
  - Curator rewards for early discovery of small artists.
  - Per-artist submission caps.
  - Rubric scoring normalised for harsh or lenient reviewers.
  - "Most improved" spotlights based on before/after deltas rather than likes.
  - Keep paid priority out of discovery ranking signals.

#### F. Behaviour
- **Why use:** to get better and get seen.
- **Frequency:** weekly for active artists.
- **Content creation:** yes (submissions and revisions).
- **Return:** yes, to check feedback and re-post (a strong return trigger).
- **Invite:** artists invite peers to review or swap critiques.
- **Share:** before/after transformations are naturally shareable on Instagram (acquisition).
- **Network effect:** two-sided. More reviewers → faster, better feedback → more submissions → better data → better discovery.
- **Creator loop (Inference):** artist critiques 3 peers → earns a credit → submits work → gets structured feedback → revises → posts before/after on Instagram with an Underdawg link → new artists join to get feedback → reviewer supply grows → curators find improving talent → opportunities → artists return.

#### G. Category
- **Activation:** high (a first critique within 48 hours is the "aha" moment).
- **Engagement and retention:** high (revision loop).
- **Discovery:** high (if tied to curators).
- **Monetisation:** medium (pro/curator queue).
- **Acquisition:** medium (shared before/after posts).

#### H. Risk assessment
- **Low-effort, generic reviews.**
  - Mitigations: minimum structure (rubric + at least one actionable fix + timestamp or region); reviewer ratings by recipients; refunds for flagged low-effort reviews.
- **Harsh or toxic critique.** Mitigations: feedback guidelines, report/block, private-by-default reviews.
- **Minors posting dance or singing videos.** Mitigations: 18+ at launch; parental consent flows later (DPDP).
- **Copyright of singing covers and dance to commercial tracks (Inference).** Underdawg likely lacks music licences the way Instagram has them. Consider private review links or originals-only for public galleries; get legal review.
- **AI-generated submissions.** Mitigations: disclosure labels (SubmitHub's detector shows the false-positive cost).
- **Pay-to-win:** see fair-discovery ideas above.
- **Reviewer economics (Inference):** at ₹99 per review with a Groover-like 50% split, a reviewer earns about ₹50. That only works for short, structured reviews by peers or mid-tier pros, not top artists.

#### I. Scale dependency
- **1k artists:** the peer loop works if concentrated in 2–3 disciplines and a credit economy enforces reciprocity (Critique Circle runs on "thousands of members").
- **10k:** a paid pro/curator queue becomes viable. Groover's ratio is about 3,000 curators to 600,000 artists (1:200), which would imply roughly 50 reviewers for 10k artists (Inference).
- **100k:** discovery rankings and talent search become robust.
- **Large scale:** machine learning on critique data (skill-progress models).

#### J. India implications
- Supports India's large learner base (Chiratae's music-household claims [C]) and student artists.
- A ₹99 per-review price sits near Indian creator price anchors (₹59–₹99 subscriptions) (Inference).
- UPI one-off payments suit pay-per-review.
- Watch for DPDP rules on minors' data and for cover-song licensing.

#### K. Preliminary verdict: **Modify → Build early (artist-to-artist + curator/pro critique core); Experiment with paid pro reviews; fan→artist paid critique later**
- **Reasons:**
  - Strongest validated need, with artists already paying.
  - Fits artists-only positioning.
  - Generates unique data and discovery signals.
  - Peer-credit design solves cold start without fans.
- **Recommended implementation:**
  1. Post work (image, video ≤60s, audio clip) with a goal ("what I want feedback on").
  2. Reviewers give rubric stars + "fix this first" (text or voice); draw-over and timestamps later.
  3. "Give 3, get 1" credits.
  4. Revise → before/after post (shareable card for Instagram).
  5. "Help" threads marked "Solved" by the asker.
  6. Paid "Pro/Curator review" queue (e.g., ₹99–₹299): guaranteed reply within N days or auto-refund; reviewer quality scores; transparent outcomes (shortlist, opportunity referral).
  7. Curator picks and "Most improved" feed discovery surfaces, with fairness caps.
  8. Later: established artists can run fan/student review queues and batch "critique Live Rooms" (Proko-style), linking Features 8 and 10.

### Gaps
- No verified data on:
  - Fan willingness to pay artists for critiques specifically (vs. paying instructors or platforms).
  - Fiverr critique-gig volumes.
  - r/ArtCrit or r/IndieMusicFeedback activity.
  - Schoolism pricing.
  - Domestika feedback mechanics.
  - SubmitHub's official approval rates. Secondary sources conflict: about 5%, about 19% and about 30% [S], so "No reliable public data found."
- No dance- or singing-specific critique marketplace with public data was found.
- No India-specific critique marketplace was found.

---

## Q4. Is an artists-only platform a fit for fan-facing features, or does it dilute positioning? Could Show & Review become artist-to-artist or curator review that drives discovery?

### Takeaway
- **Fan Club:** cannot be reconciled with "artists-only, no in-app feed". It needs a fan-side social product.
- **Live Rooms:** stays on-positioning only if framed as *artists teaching or reviewing artists*. The brief's target segments explicitly include "student artists".
- **Show & Review:** fits best when reviewers are artists, curators and pros. Market evidence shows that is where payment and repeat behaviour already exist.

### Cited Findings
- Successful fan platforms are built around already-famous artists and label operators:
  - Weverse is for K-pop acts (12M MAU peak; about 90% non-Korean traffic) [V2]. [Outlook Respawn 2026-02-13](https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m)
  - bubble is subscription messaging with idols [V]. [KED Global 2021](https://www.kedglobal.com/entertainment/newsView/ked202110180002)
- Patreon's top music creators are educators and reviewers, and fans prefer lighter commitments (free memberships 4x paid; one-time payments 3x faster growth) [V]. [Water & Music 2026-04-30](https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/)
- Artist-paid feedback marketplaces at scale: Groover (600k+ artists) [V], Playlist Push (50k+) [C], SubmitHub (1M+) [C].
- Peer critique economies run without any fan side (Critique Circle about 1M critiques) [V].
- The original brief lists "Student artists" among target segments and says Underdawg "should NOT become another generic social media platform filled with unrelated features" (brief file `/Volumes/Moon/underdawg/creator_app/research.md`).

### Inferences
- **Fans buying from artists** (Fan Club; fan-entertainment Live Rooms) would turn Underdawg into a two-sided fan/creator platform. That means competing with Instagram (where Underdawg artists already live), Patreon, YouTube, Telegram and Discord. It dilutes positioning and adds consumer-grade trust and safety for minors.
- **Artists buying from or serving artists** (masterclasses, portfolio reviews, peer critique, curator queues) keeps the network artists-only while still allowing payments. "Students" can be treated as aspiring artists with artist profiles, which is consistent with the brief.
- **Recommended reframe:** Show & Review becomes the core "get better + get seen" loop. Live Rooms becomes a later monetisation and event layer for critique and showcase sessions. Fan Club is dropped.

### Gaps
- No direct evidence measured whether adding fan features to artist-network products hurt artist retention. This is a reasoned inference only.

---

## Q5. Discovery: do these features help unknown artists get discovered, or only serve artists who already have fans? Popularity bias and fair-discovery ideas

### Takeaway
As specified, Live Rooms and Fan Club monetise existing audiences and structurally favour popular artists:
- Learners are drawn by famous names (FrontRow, Unlu and Artium all used celebrity faculty).
- Platform economics reward scale (Twitch's 70/30 tier requires 350+ paid subs).

Only a curator/peer version of Show & Review creates merit-based exposure for unknown artists, and even then paid feedback rarely converts to placement. Fairness must be designed in.

### Cited Findings
- Celebrity-led learning products:
  - FrontRow ("celebrities, artists, and athletes taught their crafts") [V]. [TechCrunch 2023-07-10](https://techcrunch.com/2023/07/10/frontrow-shutdown)
  - Unluclass (Johnny Lever, Ruskin Bond, Manoj Bajpayee, Guru Randhawa…) [V]. [Inc42](https://inc42.com/buzz/celebrity-focussed-skilling-engagement-platform-unlu-bags-seed-round-from-nexus-others/)
  - Artium's faculty heads include Sonu Nigam, Shubha Mudgal and KS Chithra [V]. [Inc42 2022](https://inc42.com/buzz/online-music-learning-platform-artium-academy-bags-funding-from-chiratae-ventures-others/)
- Twitch Partner Plus 70/30 requires 350 paid subscribers for 3 consecutive months (2023 terms) [V]. [TechCrunch 2023-06-15](https://techcrunch.com/2023/06/15/twitch-partner-plus)
- Groover: 6M+ feedback vs 50K+ songs added on playlists (pricing page) and 1M+ shares (help page) [V]. [Groover pricing](https://groover.co/en/lp/pricing/); [Groover help](https://help.groover.co/en/articles/2950583-groover-in-a-few-words)
- Participation inequality concentrates contributions in about 1% of users [V]. [NN/g 2006](https://www.nngroup.com/articles/participation-inequality/)
- Pay-to-play concern in music feedback marketplaces [V]. [TechCrunch 2024-02-17](https://techcrunch.com/2024/02/17/groover-independent-artists-song-discovery/)

### Inferences
- **Live Rooms discovery impact:** low.
  - Fair-discovery levers: an "open review night" format featuring emerging artists; directory slots reserved for first-time hosts or small accounts; fit-based ranking; per-artist promotion caps.
- **Fan Club discovery impact:** very low, and it amplifies popularity (Hot sorting, leaderboards). Avoid global rankings.
- **Show & Review discovery impact:** high if outcomes (curator picks, rubric strengths, improvement) feed discovery for brands and curators.
  - Required fairness levers: blind queues; earned (not only bought) review credits; zero-follower quotas; harshness normalisation; "most improved" over "most liked"; paid priority excluded from ranking.
  - Set expectations honestly: in Groover's data, most feedback does not become placement.

### Gaps
- No public data on how often critique or feedback interactions lead to opportunities (gigs, commissions, collaborations) for unknown artists.
- No research found that quantifies popularity concentration in creator live or membership platforms (e.g., the share of revenue going to the top 1% of creators).

---

## Q6. India: online learning of dance/music/art, Telegram/WhatsApp paid groups, willingness to pay ₹49–₹199, live-class behaviour, payments and compliance

### Takeaway
India has an active, cheap creator-monetisation stack for live sessions and paid groups (Topmate, TagMango, Cosmofeed, Graphy, SuperProfile). Telegram is huge there and a piracy channel. The visible music-learning success is **1:1 live** (Artium), while celebrity-led group hobby learning failed (FrontRow). ₹49–₹199 fits local price anchors (YouTube from ₹59; Instagram Plus ₹99), but no India data on willingness to pay for *emerging-artist* memberships or critiques was found. App-store billing, UPI mandate rules and DPDP children's-data rules are material constraints.

### Cited Findings
- **Market claims (investor):** >15M music-learner households (→21M by 2025); music education about $2B; extracurriculars $10B; >75% of parents prefer performing arts [C]. [Chiratae 2022-12-12](https://www.chiratae.com/from-passion-to-music-education-why-we-backed-artium-academy/)
- **Artium:**
  - $3M raised in Oct 2022, Chiratae-led; plans to target the diaspora [V]. [Inc42](https://inc42.com/buzz/online-music-learning-platform-artium-academy-bags-funding-from-chiratae-ventures-others/)
  - 45k+ learners, 400+ teachers, 1:1 live [C]. [artiumacademy.com](https://artiumacademy.com/)
  - Total funding of $6.74M [S]. [Tracxn](https://tracxn.com/d/companies/artium-academy/__d-eZKiDCe2lNx0RyNCmjLrBVRuDukLEGQtTFfXFIdhM)
- **FrontRow (failure):**
  - About $18M raised; $3–4M ARR; shut 30 Jun 2023 [V]. [TechCrunch](https://techcrunch.com/2023/07/10/frontrow-shutdown)
  - Live course subscription $200 per 6 months; marketing >100% of revenue in mid-2021; "lockdown false positive"; the hobby-learning market was "way smaller than anticipated".
  - The same analysis cites both "200,000+ downloads" and "270,000 paid users", which are internally inconsistent, so treat with caution [V2]. [The Runway 2025-02-02](https://www.therunway.ventures/p/frontrow)
- **Paid groups:**
  - Cosmofeed: 50,000 creators, 25% paid, $1.5M seed (Mar 2022) [V]. [Business Today](https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17)
  - TagMango: 5,000+ creators earning $100M+/yr [C]. [YC](https://www.ycombinator.com/companies/tagmango)
  - Telegram: India is its largest market [V2]. [Wikipedia](https://en.wikipedia.org/wiki/Telegram_(software))
- **Piracy:** Delhi HC v Telegram over pirated lecture videos (Aug 2022) [V]. [Scroll](https://scroll.in/latest/1031759/delhi-high-court-directs-telegram-to-disclose-details-about-channels-violating-copyright-law)
- **Fees in India:** Topmate 10% + ~2.9%; Graphy 10% + GST plus ₹1,999–₹8,400/mo; SuperProfile 5% + GST plus ₹499/mo; 18% GST typical on top [V2]. [Peerseek 2026-07-24](https://peerseek.io/blogs/creator-platform-fees-india-compared)
- **Fragmented workflow:** Calendly + Razorpay + Zoom + Sheets + WhatsApp, with drop-off at checkout [C]. [Topmate blog 2026-05-13](https://topmate.io/blog/online-session-platform-solutions)
- **Price anchors:**
  - YouTube memberships from ₹59 (May 2025) [V]. [YouTube Help](https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN)
  - Instagram Plus ₹99/mo; WhatsApp Plus ₹79/mo (Sep 2026) [V]. [Best Media Info](https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837)
- **Payments and compliance:**
  - UPI AutoPay requires a 24-hour pre-debit notification [V]. [Razorpay](https://razorpay.com/docs/payments/recurring-payments/upi/)
  - Apple requires in-app purchase for one-to-many live services and tips [V]. [Apple](https://developer.apple.com/app-store/review/guidelines/)
  - Google requires Play billing for digital content, with alternative billing in eligible regions [V]. [Google Play](https://support.google.com/googleplay/android-developer/answer/9858738)
  - DPDP: child means under 18; no tracking, behavioural monitoring or targeted ads directed at children; Rules notified 13 Nov 2025, phased to 13 May 2027 [V2]. [Wikipedia](https://en.wikipedia.org/wiki/Digital_Personal_Data_Protection_Act,_2023)
  - Instagram Teen Accounts (worldwide since Jan 2025): under-16s need parental permission to go Live [V]. [Meta](https://about.fb.com/news/2024/09/instagram-teen-accounts/)

### Inferences
- Indian artists who teach already have cheap tools. Underdawg's advantage would be artist-specific formats plus discovery, not payments plumbing.
- Many Indian dance and music learners are minors. Launching any video or learning feature 18+ only avoids DPDP child-consent complexity at MVP. Add guardian flows later.
- Payment strategy (needs legal confirmation): sell tickets and reviews on the web link page via UPI, rather than as in-app digital purchases.
- One-off payments (tickets, per-review) are a better fit than recurring ₹49/₹199 mandates, given mandate friction and the subscription-fatigue evidence.

### Gaps
- No reliable public data found on:
  - India-specific dance or visual-art online learning market size.
  - India live-class attendance or no-show rates.
  - UPI AutoPay failure or churn rates for creator subscriptions.
  - Willingness to pay ₹49–₹199/month for artist memberships.
  - Whether Instagram Subscriptions or Badges are available to Indian creators.
  - Google's user-choice-billing fee terms in India (not opened).

---

## Q7. CHART-READY NUMBERS (adoption, take rates, prices, video costs, attendance and participation)

### Takeaway
- **Take rates:**
  - Independent creator tools: about 5–12% (Patreon 10%, Substack 10%, Discord 10%, Fourthwall 5%, Afdian 6%, Topmate 10%, Skool Hobby 10%).
  - Platform-native tools: 30–50% (YouTube 30%, Twitch 50% default, app stores 30%).
- **Feedback marketplaces:** about €2 per curator, 50% to the curator.
- **Live video:** about $0.0004–$0.004 per participant-minute.
- **Attendance:** paid events about 17% median no-show vs about 28% for free; B2B webinars about 33% attendance.

### Cited Findings

| Metric | Value | Unit | Entity | Date | Source URL | Confidence |
|---|---|---|---|---|---|---|
| Platform fee, new creators (standard) | 10 | % of revenue | Patreon | Aug 2025 | https://alternativeto.net/news/2025/6/patreon-is-increasing-platform-fees-for-new-creators-starting-august-2025/ | High [V2] |
| Platform fee with Premium add-on | 13 | % | Patreon | Aug 2025 | https://alternativeto.net/news/2025/6/patreon-is-increasing-platform-fees-for-new-creators-starting-august-2025/ | High [V2] |
| Legacy plan fees (Pro / Premium) | 8 / 12 | % | Patreon | pre-Aug 2025 | https://alternativeto.net/news/2025/6/patreon-is-increasing-platform-fees-for-new-creators-starting-august-2025/ | High [V2] |
| Apple fee on new iOS memberships | 30 | % | Patreon (Apple IAP) | from Nov 2024 | https://news.patreon.com/articles/understanding-apple-requirements-for-patreon | High [V] |
| Creators on platform | 300,000 | creators | Patreon | 2025-08-06 | https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/ | Medium-High [V2] |
| Paid memberships | 25 | million | Patreon | 2025-08-06 | https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/ | Medium-High [V2] |
| Free memberships | 100 | million | Patreon | 2025-08-06 | https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/ | Medium-High [V2] |
| Cumulative creator payouts | 10 | USD billion | Patreon | 2025-08-06 | https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/ | Medium-High [V2] |
| Annual creator payouts | 2 | USD billion/yr | Patreon | 2025-08-06 | https://www.netinfluencer.com/patreon-surpasses-10-billion-in-creator-payments/ | Medium-High [V2] |
| Creator share of memberships, Super Chat, Super Thanks | 70 | % of net revenue | YouTube | accessed 2026-10 | https://support.google.com/youtube/answer/72902 | High [V] |
| Lowest channel-membership price, India | 59 | INR/month | YouTube | May 2025 | https://support.google.com/youtube/answer/10120158?hl=en&co=GENIE.CountryCode%3DIN | High [V] |
| Creator share of Server Subscriptions | 90 | % | Discord | 2022-12-01 | https://discord.com/blog/server-and-creator-subscriptions | High [V] |
| Server Subscription price range | 2.99–199.99 | USD/month | Discord | 2022-12-01 | https://discord.com/blog/server-and-creator-subscriptions | High [V] |
| Daily active users | 90+ | million | Discord | Q4 2025 | https://discord.com/company | High [V] |
| Default subscription split (creator share) | 50 | % | Twitch | 2023-06-15 | https://techcrunch.com/2023/06/15/twitch-partner-plus | High [V] |
| Partner Plus creator share (threshold 350 subs) | 70 | % | Twitch | 2023-06-15 | https://techcrunch.com/2023/06/15/twitch-partner-plus | High [V] |
| Subscription fee | 10 | % | Substack | accessed 2026-10 | https://en.wikipedia.org/wiki/Substack | Medium [V2] |
| Paid subscriptions | 5 | million | Substack | Mar 2025 | https://en.wikipedia.org/wiki/Substack | Medium [V2] |
| Memberships platform fee | 5 | % (+2.9% + $0.30 processing) | Fourthwall | accessed 2026-10 | https://fourthwall.com/memberships | High [V] |
| Total fee (5% platform + 1% payment) | 6 | % | Afdian | accessed 2026-10 | https://guide.afdian.com/faq/faq-for-creators | High [V] |
| Hobby plan | 9 USD/mo + 10 | USD/% fee | Skool | accessed 2026-10 | https://www.skool.com/pricing | High [V] |
| Pro plan | 99 USD/mo + 2.9 | USD/% fee | Skool | accessed 2026-10 | https://www.skool.com/pricing | High [V] |
| Professional plan (annual billing) | 89 USD/mo + 2 | USD/% fee | Circle | accessed 2026-10 | https://circle.so/pricing | High [V] |
| Live room participant cap (Prof/Bus/Scale) | 15 / 20 / 50 | participants | Circle | accessed 2026-10 | https://circle.so/pricing | High [V] |
| Launch plan | 79 USD/mo + 2 | USD/% fee | Mighty Networks | accessed 2026-10 | https://www.mightynetworks.com/pricing | High [V] |
| Ticket platform fee (free plan / Plus) | 5 / 0 | % | Luma | accessed 2026-10 | https://luma.com/pricing | High [V] |
| Badge price points | 0.99 / 1.99 / 4.99 | USD | Instagram Live | accessed 2026-10 | https://creators.instagram.com/earn-money/badges | High [V] |
| App-store fee on badges (Instagram takes 0%) | 30 | % | Instagram | accessed 2026-10 | https://creators.instagram.com/earn-money/badges | High [V] |
| Ticketed Spaces take (below / above $50k) | 3 / 20 | % | Twitter | 2021–2022 (discontinued) | https://www.androidheadlines.com/2022/10/twitter-ditches-paid-live-audio-feature-ticketed-spaces.html | High [V] |
| Platform fee (+~2.9% payment gateway) | 10 | % | Topmate (India) | 2026-07-24 | https://peerseek.io/blogs/creator-platform-fees-india-compared | Medium [V2] |
| Platform fee | 10 + GST | % | Graphy (India) | 2026-07-24 | https://peerseek.io/blogs/creator-platform-fees-india-compared | Medium [V2] |
| Platform fee | 10 | % | Cosmofeed (India) | 2022 | https://yourstory.com/2022/08/gurugram-startup-cosmofeed-content-creators-monetisation | Low [S] |
| Creators (25% paid) | 50,000 | creators | Cosmofeed | 2022-03-17 | https://www.businesstoday.in/latest/corporate/story/content-monetisation-start-up-cosmofeed-raises-15-mn-in-seed-round-326426-2022-03-17 | Medium [V/C] |
| Creators / annual creator earnings | 5,000+ / 100M+ | creators / USD per yr | TagMango | accessed 2026-10 | https://www.ycombinator.com/companies/tagmango | Low-Medium [C] |
| Average MAU | 11.2 | million | Weverse | 2025 | https://www.franvia.com/2026/04/k-pop-fandom-platform-weverse-d2c-retail.html | Medium [V2] |
| Peak MAU | 12 | million | Weverse | Jun 2025 | https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m | Medium-High [V2] |
| Time spent per user | 263 | minutes/month | Weverse | 2025 | https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m | Medium-High [V2] |
| LIVE broadcasts / total views | 6,558 / 1B+ | count / views | Weverse | 2025 | https://respawn.outlookindia.com/pop-culture/pop-culture-news/bts-return-lifts-weverses-active-users-to-12m | Medium-High [V2] |
| Price per artist subscription | 4,500 | KRW/month | bubble (DearU) | 2021-10-18 | https://www.kedglobal.com/entertainment/newsView/ked202110180002 | High [V] |
| Subscriptions | 1.2 | million | bubble (DearU) | 2021 | https://www.kedglobal.com/entertainment/newsView/ked202110180002 | High [V] |
| Paid subscribers | ~2 | million | bubble (DearU) | Q3 2025 | https://www.billboard.com/business/tech/j-balvin-peso-pluma-dear-u-bubble-app-exclusive-interview-1235787891/ | Low [S] |
| Registered users | 12+ | million | pixivFANBOX | 2024-04-25 | https://finance.yahoo.com/news/creator-support-platform-pixivfanbox-celebrates-140000007.html | Medium-High [V2] |
| Registered creators | 220,000 | creators | pixivFANBOX | 2024-04-25 | https://finance.yahoo.com/news/creator-support-platform-pixivfanbox-celebrates-140000007.html | Medium-High [V2] |
| Cumulative payouts | 50+ | JPY billion | pixivFANBOX | 2024-04-25 | https://finance.yahoo.com/news/creator-support-platform-pixivfanbox-celebrates-140000007.html | Medium-High [V2] |
| Platform fee (all-ages) | 10 | % | pixivFANBOX | accessed via snippet | https://fanbox.pixiv.help/hc/en-us/articles/360003726293-How-much-is-the-handling-fees | Low [S] |
| Price per curator (standard) | 2 | EUR | Groover | accessed 2026-10 | https://groover.co/en/lp/pricing/ | High [V] |
| Curator payout per feedback (≈50% split) | 1 | EUR | Groover | accessed 2026-10 | https://help.groover.co/en/articles/2950583-groover-in-a-few-words | High [V] |
| Artists / curators | 600,000+ / 3,000+ | count | Groover | accessed 2026-10 | https://groover.co/en/lp/pricing/ | Medium [C] |
| Feedback delivered / songs added to playlists | 6M+ / 50K+ | count | Groover | accessed 2026-10 | https://groover.co/en/lp/pricing/ | Medium [C] |
| Reply rate (within 7 days) | 90 | % | Groover | accessed 2026-10 | https://groover.co/en/lp/pricing/ | Medium [C] |
| Series A | 8 | USD million | Groover | 2024-02-17 | https://techcrunch.com/2024/02/17/groover-independent-artists-song-discovery/ | High [V] |
| Users / quality-checked curators | 1M+ / 1,700+ | count | SubmitHub | accessed 2026-10 | https://www.submithub.com/ | Medium [C] |
| Premium credit price per curator | 1–3 | USD | SubmitHub | 2026 | https://www.musicpulse.app/blog/is-submithub-still-worth-it-in-2026-an-honest-review | Low [S] |
| Campaign starting price (Spotify / TikTok) | 280 / 350 | USD | Playlist Push | accessed 2026-10 | https://playlistpush.com/ | High [V] |
| Artists / playlist adds | 50,000+ / 1M+ | count | Playlist Push | accessed 2026-10 | https://playlistpush.com/ | Medium [C] |
| Campaign fee | 42 (was 36) | GBP | Musosoup | from 2026-01-01 | https://musosoup.com/blog/campaign-fees-are-changing-from-january-2026 | High [V] |
| Peer critiques served | ~1 | million | Critique Circle | since 2003 | https://www.critiquecircle.com/ | Medium [C] |
| Annual membership | 199 | USD/yr | CLI Studios | accessed 2026-10 | https://www.clistudios.com/online-dance-classes/for-parents/ | High [V] |
| Learners / teachers | 45,000+ / 400+ | count | Artium Academy | accessed 2026-10 | https://artiumacademy.com/ | Medium [C] |
| Funding round | 3 | USD million | Artium Academy | Oct 2022 | https://inc42.com/buzz/online-music-learning-platform-artium-academy-bags-funding-from-chiratae-ventures-others/ | High [V] |
| Total raised / ARR at shutdown | ~18 / 3–4 | USD million | FrontRow (India) | 2023-07-10 | https://techcrunch.com/2023/07/10/frontrow-shutdown | High [V] |
| Indian music-learner households | 15+ (→21 by 2025) | million households | India (Chiratae claim) | 2022-12-12 | https://www.chiratae.com/from-passion-to-music-education-why-we-backed-artium-academy/ | Low [C] |
| Music education market, India | ~2 | USD billion | India (Chiratae claim) | 2022-12-12 | https://www.chiratae.com/from-passion-to-music-education-why-we-backed-artium-academy/ | Low [C] |
| Video conferencing price | 0.004 | USD per participant-minute | 100ms | accessed 2026-10 | https://www.100ms.live/pricing | High [V] |
| Live-streaming price | 0.0012 | USD per viewer-minute | 100ms | accessed 2026-10 | https://www.100ms.live/pricing | High [V] |
| WebRTC participant-minute overage (Ship / Scale) | 0.0005 / 0.0004 | USD | LiveKit Cloud | accessed 2026-10 | https://livekit.com/pricing | High [V] |
| Bandwidth overage (Ship / Scale) | 0.12 / 0.10 | USD per GB | LiveKit Cloud | accessed 2026-10 | https://livekit.com/pricing | High [V] |
| Median no-show, free events | 28 | % | PheedLoop dataset (860+ events) | 2026-05-26 | https://web.pheedloop.com/blog/event-data-lab-report-06 | Medium-High [V] |
| Median no-show, paid events | 17 | % | PheedLoop dataset | 2026-05-26 | https://web.pheedloop.com/blog/event-data-lab-report-06 | Medium-High [V] |
| Webinar attendance rate (registrant→attendee) | 33 (2024), ~29 (2023) | % | Goldcast (19,531 B2B webinars) | 2025 report | https://www.goldcast.io/reports/b2b-webinar-benchmark-report-2025 | Medium-High [V] |
| Average live watch time | 29 | minutes | Goldcast | 2025 report | https://www.goldcast.io/reports/b2b-webinar-benchmark-report-2025 | Medium-High [V] |
| Lurkers / occasional / heavy contributors | 90 / 9 / 1 | % of users | NN/g participation inequality | 2006 (older) | https://www.nngroup.com/articles/participation-inequality/ | High as heuristic [V] |
| Ratio of free to paid memberships | 4 : 1 | ratio | Patreon (Water & Music) | Dec 2025 | https://newsletter.waterandmusic.com/archive/why-superfan-subscriptions-are-dying-out/ | Medium [V2] |
| US superfans (share of general population) | 15 | % | Luminate (via MBW) | 2023-07-19 | https://www.musicbusinessworldwide.com/15-of-the-general-population-of-the-us-are-superfans-heres-what-that-means-for-the-music-business1/ | Medium [V2] |
| Superfans' extra monthly music spend | 80 | % more | Luminate (via MBW) | 2023-07-19 | https://www.musicbusinessworldwide.com/15-of-the-general-population-of-the-us-are-superfans-heres-what-that-means-for-the-music-business1/ | Medium [V2] |
| Meta subscriptions & trials (not split by paid/trial) | 15 | million | Meta One / Plus | 2026-09-16 | https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837 | Medium [V2] |
| Instagram Plus price, India | 99 | INR/month | Meta | 2026-09-16 | https://bestmediainfo.com/mediainfo/mediainfo-digital/meta-expands-subscription-play-in-india-meta-one-plans-priced-from-rs-79-to-rs-20990-a-month-12538837 | Medium-High [V2] |

### Inferences
- Derived figures for charts (label as calculated, not sourced):
  - Free Live Room (45 min × 30 people) ≈ $5.40 at 100ms list price, or about $2.4 on LiveKit including an estimated bandwidth of ~14.7 GB (assumes ~1.5 Mbps per received stream).
  - Paid 2-hour × 30-person room ≈ $14.40 at 100ms.
  - Groover playlist-add to feedback ratio ≈ 0.8% (50K/6M).
  - Groover curator to artist ratio ≈ 1:200.
- For a "fee chart": separate independent tools (5–12%) from platform-native and app-store cuts (30–50%), and note that GST (18%) and payment-gateway fees (~2–3%) stack on top in India.

### Gaps
- Conflicting or unverified data, excluded or marked Low:
  - Discord MAU (200M+ company statements vs 250–260M third-party estimates [S]).
  - SubmitHub approval rates (conflicting 5–30% [S]).
  - Telegram's subscription commission (undisclosed per afaqs vs "100% to creators" per a third party [S]).
  - Twitch Partner Plus cap removal in Jan 2024 [S].
  - Skool revenue and community counts (estimates only).
  - Fantia user counts [S].
  - STEEZY subscriber counts (paywalled).
  - Livestorm's 47.7% show-up figure [S].
- No reliable public data found on:
  - Churn rates for paid fan memberships.
  - Creator-class no-show rates.
  - India-specific willingness to pay for artist memberships or critiques.
