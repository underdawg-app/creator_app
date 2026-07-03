# Underdawg Visual Generation Master Prompt

Use this document as the single prompt source for Gemini, Claude, Figma AI, Canva, or any visual design generator. It is based on:

- The current React Native app in this repo.
- `1775475366898-UNDERDAWG_CREATOR_APP_V2.md`
- Implemented screens, navigation, mock data, store state, theme, and component system.

Important: the current repo is a mobile-first React Native prototype/demo with mocked local data. It implements 65 screens. The product specification describes the larger target product: 15 modules and 200 screens.

---

## Copy-Paste Master Prompt

Create a complete visual documentation package for a creator-economy app called Underdawg / Underdawgs.

Underdawg is the operating system for emerging creators. Its promise is: "Get Discovered. Get Connected. Get Paid." It is not just a social media app. It is a career pipeline that helps unknown creators become monetizable creator businesses through discovery, audience ownership, analytics, brand deals, merchandise, art sales, finance, reputation, community, learning, and settings.

Design the output as a polished product/technical visual document with multiple diagram pages and image panels. The visuals must look like a serious mobile app architecture and product design deck, not a generic startup pitch. Use a sharp editorial creator-culture visual style.

Use this brand direction:

- Product name: UNDERDAWGS in the app wordmark, Underdawg in product narrative.
- Core line: Get Discovered. Get Connected. Get Paid.
- Philosophy: Growth over popularity.
- Target user: emerging creators, artists, musicians, filmmakers, writers, performers, educators, podcasters, streamers, fashion/lifestyle creators, and multi-hyphenate creators.
- Example current user persona from the app: Sola Roux, `@solaroux`, visual artist, Brooklyn NYC, Rising tier, reputation 82, 12.4K followers, portfolio pieces named SALT / STUDY 04, GLASS HOUSE, BONE PAINT, LAST TRAIN.
- Revenue context: creators earn through brand deals, Get Viral campaigns, merchandise, art marketplace, commissions, tips, subscriptions, and future management fees.

Visual style:

- High contrast editorial mobile UI.
- Colors:
  - Ink black: `#0A0A0A`
  - Bone: `#F2EFE6`
  - Acid green: `#D8FF3D`
  - Electric blue: `#2E5BFF`
  - Blush pink: `#FF6BB5`
  - Ember orange: `#FF5A1F`
  - Mute gray: `#9C988A`
- Fonts to emulate:
  - Heavy compressed display type like Anton / Archivo Black.
  - Clean geometric body type like Space Grotesk.
  - Occasional italic editorial serif accents like Instrument Serif Italic.
- UI texture:
  - Brutalist editorial layout.
  - Thin hairlines, uppercase micro-labels, big stacked type.
  - Acid accent dots, badges, chips, metric cards, modular list cells.
  - Mobile-first 9:16 phone frames.
  - Use product screenshots as realistic mockups, not abstract placeholders.

Current implemented app:

- Platform: React Native 0.81, React 19, TypeScript.
- Navigation: React Navigation native stack plus bottom tabs.
- State: Zustand persisted with AsyncStorage.
- Visuals: React Native SVG, Reanimated, Skia procedural backgrounds, grain, wave fields, animated signet, custom UI components.
- App entry: `App.tsx` with GestureHandlerRootView, SafeAreaProvider, ThemeProvider, TransitionProvider, NavigationContainer, BootSplash hide, ToastHost, ConfettiHost, AcidSplashHost.
- Root navigation: Splash -> Onboarding -> Tabs -> Modules.
- Bottom tabs: Feed, Explore, Create, Inbox, Profile.
- Current data is seeded from `src/data/mock.ts`.
- Current local store includes profile, platforms, subscribers, drafts, published posts, scheduled posts, likes, saves, following, applications, deals, products, artworks, transactions, threads, groups, verification, badges, lesson progress, settings, theme preference, toasts, confetti, and splash effects.

Generate the following visuals in one cohesive document:

1. Cover image / visual overview.
2. System architecture image.
3. Mobile navigation architecture image.
4. Conceptual ER diagram.
5. Creator lifecycle flowchart.
6. Onboarding flowchart.
7. Content publishing flowchart.
8. Audience ownership data flow.
9. Brand deal and monetization flow.
10. Commerce and finance flow.
11. Module map visual.
12. Screenshot storyboard.
13. Tables / matrix visuals for screens, modules, APIs, integrations, and implementation status.

Every diagram must be legible, use consistent labels, and be styled with the Underdawg palette. Do not use random pastel SaaS colors. Do not invent unrelated modules. When showing backend systems, label them as "planned / spec" because the current repo is a frontend prototype.

---

## Product Overview Page Prompt

Create a one-page product overview image titled "Underdawg Creator OS".

Show Underdawg as a four-layer creator pipeline:

1. Discovery and Community
   - Public creator profile
   - Feed and Explore
   - Challenges
   - Reputation score
   - Community groups

2. Monetization
   - Brand deals
   - Merchandise
   - Art marketplace
   - Commissions
   - Tips and subscriptions

3. Amplification Engine
   - Get Viral campaigns
   - Coordinated creator launches
   - Disclosed paid collaborations
   - Trend momentum

4. Artist Management
   - Top 1-5 percent creators
   - Deal negotiation
   - Pricing power
   - Career strategy
   - Long-term revenue share

Show the creator journey across the bottom:

UNKNOWN -> EMERGING -> GROWING -> ESTABLISHED -> PRO / ELITE

Use the headline:

"Get Discovered. Get Connected. Get Paid."

Use the subline:

"Growth over popularity: a creator economy operating system for emerging talent before the market prices them in."

Visual direction:

- Black/bone background.
- Acid green creator pipeline line.
- Electric blue for data and analytics.
- Blush pink for community.
- Ember orange for monetization.
- Include small mobile app panels for Feed, Profile, Jobs, Finance, and Portfolio.

---

## Current Implementation Summary

Use this table when making implementation-status visuals.

| Area | Current repo implementation |
|---|---|
| App type | React Native mobile app prototype |
| Platforms | iOS and Android native projects are present |
| Backend | Not implemented in repo; represented by mock local data |
| Data source | `src/data/mock.ts` |
| Persisted state | Zustand plus AsyncStorage |
| Navigation | Root stack, onboarding stack, bottom tabs, modules stack |
| Current screens | 65 implemented `.tsx` screen files |
| Spec target | 15 modules, 200 screens |
| Main app surfaces | Splash, onboarding, Feed, Explore, Create, Inbox, Profile, modules |
| Design system | Theme tokens, typography, UI primitives, SVG marks, Skia effects |
| Visual personality | Editorial, high-contrast, creator-culture, mobile-first |

---

## System Architecture Image Prompt

Create a system architecture diagram for the current app plus planned backend.

Title: "Underdawg Creator App Architecture"

Use 4 horizontal layers:

Layer 1: Mobile Client Shell

- React Native 0.81
- React 19
- TypeScript
- iOS native project
- Android native project
- Gesture handler
- Safe area provider
- BootSplash
- StatusBar

Layer 2: App Runtime

- ThemeProvider
- TransitionProvider
- NavigationContainer
- RootNavigator
- ToastHost
- ConfettiHost
- AcidSplashHost
- Skia effects
- SVG brand system

Layer 3: Product Screens and State

- Root Stack:
  - Splash
  - Onboarding stack
  - Tabs
  - Modules stack
- Bottom Tabs:
  - Feed
  - Explore
  - Create
  - Inbox
  - Profile
- State:
  - Zustand store
  - AsyncStorage persistence
  - Mock seed data
  - Image cache/prefetch

Layer 4: Planned Platform Backend and Integrations

- Auth service
- User and creator service
- Content service
- Feed and search service
- Audience service
- Analytics service
- Jobs and deals service
- Merch and ecommerce service
- Art marketplace service
- Finance and payouts service
- Messaging service
- Notifications service
- Reputation and verification service
- Community service
- AI service
- External APIs:
  - Instagram
  - YouTube
  - TikTok
  - Twitter/X
  - Spotify
  - Twitch
  - Razorpay
  - AWS S3 + CloudFront
  - Firebase
  - SendGrid
  - Twilio
  - Stripe
  - Digio
  - Sentry
  - Mixpanel
  - OpenAI / Claude

Mark Layer 4 as "planned from product spec, not currently implemented in repo".

Visual layout:

- Use clear boxes and arrows.
- Put current repo pieces in solid boxes.
- Put future backend pieces in dashed boxes.
- Use acid green for app shell, blue for data/analytics, blush for social/community, orange for payments/commerce.

---

## Mobile Navigation Architecture Prompt

Create a navigation map titled "Implemented Mobile Navigation".

Show:

RootNavigator:

- Splash
- OnboardingNavigator
- TabsNavigator
- ModulesNavigator

OnboardingNavigator:

- Welcome
- Auth
- UserType
- CreatorType
- Identity
- Complete

TabsNavigator:

- Feed
- Explore
- Create
- Inbox
- Profile

ModulesNavigator:

- Portfolio:
  - PortfolioIndex
  - PortfolioEdit
  - PortfolioPieceEditor
  - PortfolioPublicPreview
- Content Studio:
  - StudioIndex
  - StudioDrafts
  - StudioSchedule
  - StudioImageComposer
  - StudioTextComposer
  - StudioVideoComposer
- Audience:
  - AudienceIndex
  - AudienceConnections
  - AudienceTopFans
  - AudienceEmailList
  - AudienceLandingPage
- Analytics:
  - AnalyticsIndex
  - AnalyticsCrossPlatform
  - AnalyticsContentPerformance
  - AnalyticsAiInsights
- Jobs:
  - JobsIndex
  - JobsActiveDeals
  - JobsRateCard
  - JobDetail
  - JobsApply
- Merch:
  - MerchIndex
  - MerchStore
  - MerchCreate
  - MerchOrders
- Art Market:
  - ArtIndex
  - ArtList
  - ArtDetail
  - ArtCommissions
- Finance:
  - FinanceIndex
  - FinancePayouts
  - FinanceTransactions
  - FinanceTax
  - FinanceInvoice
- Inbox:
  - InboxThread
- Reputation:
  - ReputationIndex
  - ReputationBadges
  - ReputationVerification
- Community:
  - CommunityIndex
  - CommunityGroups
  - CommunityEvents
  - ChallengesIndex
  - ChallengeDetail
- Learning:
  - LearningIndex
  - LearningCourse
- Settings:
  - SettingsIndex
  - SettingsAccount
  - SettingsNotifications
  - SettingsPrivacy
  - SettingsSecurity

Show route behavior:

- Splash auto-routes to Welcome.
- Complete replaces route to Tabs.
- Feed/Profile/Create/Explore/Inbox can open Modules.
- ModuleHeader handles back navigation.
- Dynamic routes exist for ArtDetail, JobDetail, InboxThread, LearningCourse, ChallengeDetail.

Visual style:

- Draw as a mobile app sitemap.
- Use a dark background and colored module clusters.
- Make bottom tabs prominent as the everyday navigation surface.

---

## Conceptual ER Diagram Prompt

Create a conceptual ER diagram for the full Underdawg product. This is not an implemented database schema yet; it is inferred from the product spec and current mocked state.

Title: "Underdawg Conceptual Data Model"

Use these entity groups and relationships.

Identity and profile:

- User
  - id
  - email
  - phone
  - authProvider
  - userType
  - status
  - createdAt
- CreatorProfile
  - id
  - userId
  - displayName
  - username
  - bio
  - creatorType
  - tier
  - reputationScore
  - location
  - profilePhotoUrl
  - coverUrl
  - publicProfileUrl
- CreatorNiche
  - creatorId
  - nicheId
- Niche
  - id
  - name
- CreatorSkill
  - creatorId
  - skillId
- Skill
  - id
  - name
- PlatformConnection
  - id
  - creatorId
  - platform
  - handle
  - externalId
  - followerCount
  - connected
  - oauthStatus
  - lastSyncedAt

Content and discovery:

- ContentPost
  - id
  - creatorId
  - kind
  - caption
  - category
  - status
  - scheduledFor
  - publishedAt
  - createdAt
- MediaAsset
  - id
  - creatorId
  - postId
  - mediaType
  - url
  - width
  - height
  - duration
- Engagement
  - id
  - postId
  - userId
  - type
  - createdAt
- Follow
  - followerUserId
  - followingCreatorId
  - createdAt
- PortfolioItem
  - id
  - creatorId
  - title
  - type
  - description
  - mediaAssetId
  - externalUrl
  - sortOrder
- Challenge
  - id
  - title
  - rules
  - prize
  - startsAt
  - endsAt
- ChallengeEntry
  - id
  - challengeId
  - creatorId
  - postId
  - score

Audience ownership:

- AudienceContact
  - id
  - creatorId
  - email
  - phone
  - handle
  - source
  - tag
  - consentStatus
  - createdAt
- EmailCampaign
  - id
  - creatorId
  - subject
  - status
  - scheduledFor
  - sentAt
- LandingPage
  - id
  - creatorId
  - slug
  - blocks
  - published

Analytics:

- AnalyticsSnapshot
  - id
  - creatorId
  - platform
  - date
  - reach
  - engagement
  - engagementRate
  - followers
  - profileViews
- AIInsight
  - id
  - creatorId
  - kind
  - title
  - body
  - createdAt
  - status

Jobs and deals:

- Brand
  - id
  - name
  - verified
- Job
  - id
  - brandId
  - title
  - type
  - niche
  - budgetMin
  - budgetMax
  - deliverable
  - deadline
  - status
- JobApplication
  - id
  - jobId
  - creatorId
  - pitch
  - rate
  - timeline
  - status
  - submittedAt
- Deal
  - id
  - jobApplicationId
  - creatorId
  - brandId
  - status
  - amount
  - progress
  - nextAction
- Contract
  - id
  - dealId
  - status
  - signedAt
- Deliverable
  - id
  - dealId
  - title
  - status
  - dueAt

Commerce:

- Product
  - id
  - creatorId
  - name
  - type
  - baseCost
  - margin
  - retailPrice
  - published
- MerchOrder
  - id
  - creatorId
  - buyerUserId
  - status
  - total
  - createdAt
- MerchOrderItem
  - id
  - orderId
  - productId
  - qty
  - price
- Artwork
  - id
  - creatorId
  - title
  - kind
  - medium
  - price
  - edition
  - available
- CommissionRequest
  - id
  - creatorId
  - requesterUserId
  - brief
  - budget
  - status

Finance:

- Transaction
  - id
  - creatorId
  - sourceType
  - sourceId
  - amount
  - direction
  - status
  - createdAt
- Payout
  - id
  - creatorId
  - method
  - amount
  - status
  - requestedAt
- Invoice
  - id
  - creatorId
  - dealId
  - amount
  - status
  - issuedAt

Messaging:

- Conversation
  - id
  - kind
  - creatorId
  - relatedDealId
  - updatedAt
- Message
  - id
  - conversationId
  - senderUserId
  - body
  - createdAt
  - readAt

Reputation and community:

- ReputationEvent
  - id
  - creatorId
  - kind
  - scoreDelta
  - sourceType
  - sourceId
  - createdAt
- Badge
  - id
  - name
  - requirement
- CreatorBadge
  - creatorId
  - badgeId
  - earnedAt
- VerificationCheck
  - id
  - creatorId
  - type
  - status
  - completedAt
- CommunityGroup
  - id
  - name
  - niche
  - city
- GroupMember
  - groupId
  - userId
  - role
  - joinedAt
- CommunityEvent
  - id
  - groupId
  - title
  - host
  - startsAt
- Course
  - id
  - title
  - instructor
  - category
- Lesson
  - id
  - courseId
  - title
  - duration
- UserLessonProgress
  - userId
  - lessonId
  - completedAt
- UserSettings
  - userId
  - notifications
  - privacy
  - security
  - appearance

Cardinality:

- User 1 -> 0..1 CreatorProfile.
- CreatorProfile 1 -> many PlatformConnections.
- CreatorProfile many -> many Niches through CreatorNiche.
- CreatorProfile many -> many Skills through CreatorSkill.
- CreatorProfile 1 -> many ContentPosts.
- ContentPost 1 -> many MediaAssets.
- ContentPost 1 -> many Engagements.
- User many -> many CreatorProfiles through Follow.
- CreatorProfile 1 -> many PortfolioItems.
- Challenge 1 -> many ChallengeEntries.
- CreatorProfile 1 -> many AudienceContacts.
- CreatorProfile 1 -> many AnalyticsSnapshots.
- Brand 1 -> many Jobs.
- Job 1 -> many JobApplications.
- JobApplication 0..1 -> 1 Deal.
- Deal 1 -> 0..1 Contract.
- Deal 1 -> many Deliverables.
- Deal/Product/Artwork/Commission can create Transactions.
- CreatorProfile 1 -> many Products and Artworks.
- MerchOrder 1 -> many MerchOrderItems.
- Conversation 1 -> many Messages.
- CreatorProfile 1 -> many ReputationEvents, CreatorBadges, VerificationChecks.
- CommunityGroup many -> many Users through GroupMember.
- Course 1 -> many Lessons; User many -> many Lessons through UserLessonProgress.

Visual direction:

- Group entities by domain with colored containers.
- Use Crow's Foot notation.
- Keep relationship labels readable.
- Mark financial and identity entities with stronger borders.
- Label the diagram "Conceptual, based on current mock state and product spec."

---

## Creator Lifecycle Flowchart Prompt

Create a flowchart titled "Creator Lifecycle: Unknown to Managed".

Flow:

Start: Unknown creator

-> Onboarding
   - create account
   - select user type
   - select creator type
   - set name and username
   - add niches
   - optional platform connection

-> Active creator
   - post content
   - build profile
   - join challenges
   - engage with community

-> Rising creator
   - reputation grows
   - audience analytics unlock
   - owned audience migration starts
   - portfolio improves

-> Monetizing creator
   - applies to brand deals
   - sells merch
   - lists art
   - accepts commissions
   - tracks finance

-> Verified creator
   - completes email
   - phone
   - government ID
   - liveness
   - manual review

-> Pro / Elite creator
   - priority deals
   - Get Viral campaign eligibility
   - manager matching
   - higher rates

Branch:

- Active creator -> Dormant if inactive for 30 days.
- Dormant -> Active after return.
- Active or Verified -> Suspended if policy issue.
- Pro / Elite -> Managed if represented by Underdawg.

Use status-state boxes with distinct colors:

- Onboarding: acid green
- Active: bone
- Rising: electric blue
- Monetizing: ember orange
- Verified: blush pink
- Managed: black with acid border

---

## Onboarding Flowchart Prompt

Create a mobile onboarding flowchart based on the implemented app.

Title: "Implemented Onboarding Flow"

Flow:

Splash

-> Welcome carousel
   - slide 01: Built for the Dawgs
   - slide 02: Unknown to Unstoppable
   - slide 03: Growth over Popularity

-> Auth
   - email
   - Google
   - Apple
   - phone / OTP concept from spec

-> User Type
   - Creator
   - Brand
   - Manager
   - Fan

-> Creator Type
   - Visual Artist
   - Musician
   - Video Creator
   - Writer
   - Performer
   - Educator
   - Podcaster
   - Streamer
   - Fashion / Life
   - Multi-Hyphenate

-> Identity
   - display name
   - username
   - bio
   - niche / style setup

-> Complete
   - success
   - enter app

-> Tabs
   - Feed as primary landing area

Add optional future steps from spec as dashed nodes:

- Profile photo upload
- Platform OAuth connection
- Interests
- Location
- Notification permissions

Visual direction:

- Show phone-screen thumbnails beside each node.
- Use numbered step badges.
- Keep the path vertical with a clear "enter app" transition.

---

## Content Publishing Flowchart Prompt

Create a flowchart titled "Content Studio: Draft, Schedule, Publish".

Current implemented routes and state:

- Create tab opens creator tools.
- StudioIndex is the module hub.
- Composer options:
  - Image composer
  - Video composer
  - Text / audio composer
- Content types:
  - Image
  - Video
  - Audio
  - Text
  - Story
- The Zustand store tracks:
  - drafts
  - scheduled
  - published

Flow:

Create tab / StudioIndex

-> Select content type

-> Composer
   - media pick or text/audio entry
   - caption
   - tags
   - category
   - cross-post targets

Decision: save draft, schedule, or publish now?

If save draft:

-> addDraft
-> StudioDrafts
-> edit later / schedule / publish

If schedule:

-> StudioSchedule
-> pick day
-> pick time
-> scheduleDraft
-> scheduled queue

If publish:

-> publishImmediate
-> published list
-> Feed
-> engagement events

Future backend/spec extensions as dashed nodes:

- Media upload to S3 / CDN.
- Platform-specific captions.
- Cross-post retry queue.
- AI best posting time.
- Content calendar.

Visual direction:

- Use three state lanes: Draft, Scheduled, Published.
- Use icons for image, video, audio, text, story.
- Use orange for publish, blue for schedule, acid for draft.

---

## Audience Ownership Data Flow Prompt

Create a data-flow diagram titled "Audience Ownership: Rented to Owned".

Narrative:

Underdawg helps creators migrate external-platform followers into owned channels.

Flow:

External platforms:

- Instagram
- TikTok
- YouTube
- Twitter/X
- Spotify
- Twitch

-> Platform Connections
   - OAuth
   - followers
   - growth
   - engagement
   - handles

-> Audience Dashboard
   - rented audience
   - owned audience
   - connected platform count

-> Top Fans Identifier
   - multi-platform follows
   - comment quality
   - share behavior
   - purchase history
   - recency
   - fan score

-> Migration Tools
   - DM templates
   - story templates
   - QR code
   - CTA overlay
   - link-in-bio page

-> Owned Channels
   - email list
   - SMS list
   - landing page subscribers
   - community groups

-> Campaigns and Analytics
   - newsletter
   - open rate
   - click rate
   - subscriber tags
   - export audience

Current mock data examples:

- Instagram: @solaroux, 12,480 followers, connected.
- TikTok: @solaroux, 4,820 followers, connected.
- YouTube, Twitter/X, Spotify, Twitch shown as connectable.
- Top fan examples: @keira.t, @miguel.arte, @sunday_kids, @nyla.collect.

Visual direction:

- Left side: rented platforms as external nodes.
- Middle: Underdawg intelligence engine.
- Right side: owned audience assets.
- Show "creator owns this" around email/SMS/landing page.

---

## Brand Deal Flow Prompt

Create a flowchart titled "Brand Deals: Opportunity to Payment".

Flow:

Brand creates job

-> Job Board
   - title
   - brand
   - type
   - niche
   - budget range
   - deliverables
   - deadline
   - verified flag

-> Creator filters jobs

-> Job Detail
   - brief
   - deliverables
   - budget
   - applicants

-> Apply
   - pitch
   - rate
   - timeline

-> Application submitted

-> Deal pipeline:
   - Applied
   - Shortlisted
   - Negotiating
   - Contract
   - Active
   - In Review
   - Completed

-> Contract / deliverables

-> Brand approval

-> Payment

-> Transaction appears in Finance dashboard

-> Reputation improves after successful completion

Use current mock examples:

- ACID SUMMER CAPSULE - VISUAL LEAD by ODDBIRD STUDIOS.
- NIGHT BUS - SOUND CAMPAIGN by CITYLINE x RED CIRCLE.
- AFTER RAIN - DOC SERIES PILOT by SLOW PRESS.
- GET VIRAL - ACID SUMMER DROP by UNDERDAWG x ODDBIRD.
- COPPERLEAF ambassador.

Visual direction:

- Use a Kanban-like pipeline.
- Use ember orange for money movement.
- Use acid for verified / completed states.
- Add small INR budget callouts.

---

## Commerce and Finance Flow Prompt

Create a combined commerce and finance diagram titled "Creator Commerce and Money Flow".

Show three income streams:

1. Merch
   - MerchCreate
   - Product types: T-shirt, hoodie, mug, cap, tote bag, poster, sticker pack, phone case.
   - Product published in MerchStore.
   - Buyer places order.
   - Order statuses: confirmed, printing, shipped, delivered.
   - Revenue creates transaction.

2. Art Marketplace
   - ArtList creates listing.
   - Artwork types: original, limited print, open print, digital.
   - Buyer purchases artwork.
   - Commission requests create custom work pipeline.
   - Revenue creates transaction.

3. Brand Deals / Get Viral
   - Active deal completed.
   - Brand pays.
   - Revenue creates transaction.

Finance center:

- FinanceIndex dashboard.
- Transactions.
- Payouts.
- Invoice.
- Tax center.

Mock transaction examples:

- Brand deal: CITYLINE x RED CIRCLE.
- Merch: Salt / Study Tee.
- Art sale: GLASS HOUSE print.
- Tip from @keira.t.
- Get Viral: ACID SUMMER campaign.
- Commission deposit from @deepfield.mag.
- Platform fee.
- Payout to HDFC account.

Visual direction:

- Show money arrows converging into Finance.
- Distinguish inflow and outflow.
- Show "creator earnings ledger" as the central finance object.
- Use ember for revenue, acid for completed, gray for pending/scheduled.

---

## Module Map Visual Prompt

Create a module map titled "Underdawg Creator Modules".

Show 15 product-spec modules, but visually mark which are already represented in the current prototype.

Module list:

1. Onboarding and Identity
2. Profile and Portfolio
3. Content Studio
4. Feed and Discovery
5. Audience Ownership
6. Analytics and Intelligence
7. Job Board and Brand Deals
8. Merchandise Studio
9. Art Marketplace
10. Financial Dashboard
11. Collaboration Hub / Inbox
12. Reputation and Verification
13. Community and Engagement
14. Learning and Growth
15. Settings and Preferences

Implementation status:

- Implemented in current repo:
  - Splash
  - Onboarding
  - Feed
  - Explore
  - Create
  - Inbox
  - Profile
  - Portfolio
  - Studio
  - Audience
  - Analytics
  - Jobs
  - Merch
  - Art
  - Finance
  - Reputation
  - Community
  - Learning
  - Settings
- Backend, real APIs, database, media uploads, payment gateway, email/SMS sending, and AI generation are planned/spec, not implemented.

Create a radial or grid module visual with:

- Identity and presence cluster.
- Content and discovery cluster.
- Audience and intelligence cluster.
- Monetization and commerce cluster.
- Finance and operations cluster.
- Reputation, community, learning, settings cluster.

Use mini UI thumbnails for each module.

---

## Screenshot Storyboard Prompt

Create a set of realistic mobile screenshot mockups for the current app. Use 390 x 844 or similar phone frames. These are not web landing pages. They are product screenshots.

Global UI style:

- High contrast black/bone backgrounds.
- Heavy uppercase headers.
- Thin hairline dividers.
- Acid green, electric blue, blush pink, ember orange accents.
- Rounded but not overly soft cards.
- Bottom navigation with Feed, Explore, Create, Inbox, You.
- Use Sola Roux as the signed-in creator.

Generate these screenshot panels:

1. Splash
   - UNDERDAWGS wordmark.
   - Animated signet concept.
   - Top metadata: "UD - CREATOR OS", "N 001", "VERSION MMXXVI".
   - Progress bar.
   - Tagline: "GET DISCOVERED. GET CONNECTED. GET PAID."

2. Welcome
   - Editorial onboarding slide.
   - Large stacked type: "BUILT FOR THE DAWGS".
   - Secondary slide references: "UNKNOWN TO UNSTOPPABLE", "GROWTH OVER POPULARITY".

3. Feed
   - Header with UNDERDAWGS wordmark.
   - Tabs: FOR YOU, FOLLOWING, RISING.
   - Story circles.
   - Creator post card from Sola Roux or Maya Patel.
   - Like, comment, repost, save, share actions.

4. Explore
   - Search field.
   - Trending tags such as #BONETONES, #RESINPOUR, #NIGHTBUS.
   - Featured creators.
   - Rising creators.
   - Categories grid: visual art, music, film, dance, poetry, design, fashion, podcast.
   - Challenge banner.

5. Create / Studio Gateway
   - Content type tiles: Image, Video, Audio, Text, Story.
   - Metrics: Drafts, Scheduled, Published.
   - Manage list: Drafts, Scheduled queue, Published.

6. Profile
   - Sola Roux avatar.
   - Big stacked name: SOLA. ROUX.
   - Handle `@solaroux`.
   - Creator type: Visual Artist.
   - Location: Brooklyn NYC.
   - Rising badge and Verified badge.
   - Stats: followers 12.4K, reputation 82, earned 4.8K INR.
   - Buttons: Portfolio, My Store.
   - Feed tabs: Posts, Videos, Written.

7. Portfolio
   - Portfolio grid.
   - Pieces: SALT / STUDY 04, GLASS HOUSE, BONE PAINT, LAST TRAIN.
   - Actions: Edit profile, Public preview, Add piece, Copy profile link.

8. Content Studio
   - Module header "MODULE 03 - CONTENT STUDIO".
   - Composer links: Image composer, Video composer, Text / audio composer.
   - Manage links: Drafts, Scheduled queue, Published.

9. Audience
   - Module header "MODULE 05 - AUDIENCE".
   - Rented vs owned audience metric cards.
   - Platform connections.
   - Top fans.
   - Email list.
   - Landing page builder.

10. Analytics
   - Module header "MODULE 06 - ANALYTICS".
   - Metrics: total reach, engagement, engagement rate, profile views.
   - Trend line.
   - Links: Cross-platform analytics, Content performance, AI insights.

11. Job Board
   - Module header "MODULE 07 - JOB BOARD".
   - Metrics: applications, active deals, open jobs.
   - Job cards with budgets and verified brand badges.
   - Example: ACID SUMMER CAPSULE - VISUAL LEAD.

12. Merch
   - Module header "MODULE 08 - MERCH".
   - Product cards: Salt / Study Tee, Bone Paint Hoodie, Last Train Poster.
   - Create product / store / orders.

13. Art Market
   - Module header "MODULE 09 - ART MARKET".
   - Listings: SALT / STUDY No. 04, GLASS HOUSE, BONE PAINT, LAST TRAIN.
   - Commission requests.

14. Finance
   - Module header "MODULE 10 - FINANCE".
   - Earnings dashboard.
   - Recent transactions.
   - Payout, transactions, invoice, tax center links.

15. Inbox / Collaboration
   - Threads grouped as Primary, Request, Collab, Deal.
   - Example thread: CITYLINE x RED CIRCLE.
   - Message composer.

16. Reputation
   - Module header "MODULE 12 - REPUTATION".
   - Reputation score 82.
   - Breakdown: content quality, consistency, authenticity, community standing, brand reliability, audience growth, platform tenure.
   - Verification checklist and badges.

17. Community
   - Module header "MODULE 13 - COMMUNITY".
   - Groups, events, challenges, community feed.

18. Learning
   - Module header "MODULE 14 - LEARNING".
   - Course cards:
     - Pricing Your Art, Without Flinching
     - The Algorithm Is a Puzzle
     - Contracts for Creators
     - Filming Vertical Without Looking Like a TikTok

19. Settings
   - Module header "MODULE 15 - SETTINGS".
   - Account, Privacy, Security.
   - Appearance theme selector.
   - Notifications.
   - Support.

Output format:

- 4-column screenshot board for overview.
- Individual full-size phone screenshots for the most important screens: Feed, Profile, Analytics, Jobs, Finance, Studio.
- Add captions under each phone frame.

---

## Tables and Matrix Visual Prompts

Create clean table images using the same design system. Use high-contrast tables with thin hairlines, small uppercase labels, and accent tags.

### Product Modules Table

| Module | Purpose | Current prototype screens |
|---|---|---|
| Onboarding and Identity | Account setup and creator identity | Splash, Welcome, Auth, UserType, CreatorType, Identity, Complete |
| Profile and Portfolio | Public creator presence and best work | Profile, PortfolioIndex, PortfolioEdit, PortfolioPieceEditor, PortfolioPublicPreview |
| Content Studio | Create, draft, schedule, publish | Create, StudioIndex, StudioDrafts, StudioSchedule, ImageComposer, TextComposer, VideoComposer |
| Feed and Discovery | Discover content and creators | Feed, Explore, Challenges |
| Audience Ownership | Move rented followers into owned channels | AudienceIndex, Connections, TopFans, EmailList, LandingPage |
| Analytics and Intelligence | Unified performance insight | AnalyticsIndex, CrossPlatform, ContentPerformance, AIInsights |
| Job Board and Brand Deals | Apply, manage deals, rates | JobsIndex, JobDetail, JobsApply, ActiveDeals, RateCard |
| Merchandise Studio | Product creation and storefront | MerchIndex, MerchCreate, MerchStore, MerchOrders |
| Art Marketplace | Sell art and commissions | ArtIndex, ArtList, ArtDetail, ArtCommissions |
| Financial Dashboard | Earnings, payouts, invoices, tax | FinanceIndex, Payouts, Transactions, Invoice, Tax |
| Collaboration Hub | Messages and deal/collab threads | Inbox, InboxThread |
| Reputation and Verification | Trust, badges, verification | ReputationIndex, Badges, Verification |
| Community and Engagement | Groups, events, challenges | CommunityIndex, Groups, Events, Challenges, ChallengeDetail |
| Learning and Growth | Creator business education | LearningIndex, LearningCourse |
| Settings and Preferences | Account, privacy, notifications, theme | SettingsIndex, Account, Notifications, Privacy, Security |

### API Groups Table

| API group | Purpose | Status |
|---|---|---|
| `/api/v1/auth` | Registration, login, OAuth, sessions | planned |
| `/api/v1/users` | User profile CRUD | planned |
| `/api/v1/creators` | Creator data and portfolio | planned |
| `/api/v1/content` | Posts, media upload, publishing | planned |
| `/api/v1/feed` | Home feed, explore, recommendations | planned |
| `/api/v1/audience` | Platform connections and audience data | planned |
| `/api/v1/analytics` | Analytics endpoints | planned |
| `/api/v1/jobs` | Job board and applications | planned |
| `/api/v1/deals` | Deal management and contracts | planned |
| `/api/v1/merch` | Products, orders, stores | planned |
| `/api/v1/ecommerce` | Standalone ecommerce site | planned |
| `/api/v1/art` | Art listings and commissions | planned |
| `/api/v1/finance` | Earnings, payouts, invoices | planned |
| `/api/v1/messages` | Conversations and DMs | planned |
| `/api/v1/notifications` | Push, email, in-app notifications | planned |
| `/api/v1/reputation` | Scores, verification, badges | planned |
| `/api/v1/community` | Groups, events, posts | planned |
| `/api/v1/search` | Global search | planned |
| `/api/v1/settings` | User preferences | planned |
| `/api/v1/ai` | AI mockups and recommendations | planned |

### External Integrations Table

| Service | Purpose |
|---|---|
| Instagram | Followers, posts, engagement, insights |
| YouTube | Subscribers, videos, views, analytics |
| TikTok | Followers, videos, engagement |
| Twitter/X | Followers, tweets, engagement |
| Spotify | Monthly listeners, tracks, playlists |
| Twitch | Followers, streams, subscribers |
| Razorpay | India payments and payouts |
| Stripe | International payments |
| AWS S3 + CloudFront | Media storage and CDN |
| Firebase | Push notifications and auth support |
| SendGrid | Email delivery |
| Twilio | SMS |
| Digio | E-signatures |
| Sentry | Error tracking |
| Mixpanel | Product analytics |
| OpenAI / Claude | AI insights, mockups, recommendations |

### Non-Functional Requirements Table

| Requirement | Target |
|---|---|
| Cold launch | Under 2 seconds |
| Warm launch | Under 1 second |
| Feed load | Under 1 second |
| Search results | Under 500 ms |
| Analytics load | Under 2 seconds |
| AI mockup generation | Under 10 seconds for 5 products |
| Ecommerce site generation | Under 30 seconds |
| Uptime | 99.9 percent |
| Scale | 1M creators, 10M content pieces, 100K DAU |
| Security | HTTPS, AES-256, OAuth 2.0, 2FA |
| Privacy | GDPR compliant, data export |
| Offline | Cached content and queued posts |
| Accessibility | WCAG 2.1 AA |

---

## Module Visual Prompts

Use these for individual module illustrations.

### Onboarding and Identity

Create a module visual showing a new creator entering the platform. Include user type selection, creator type cards, identity setup, username, bio, niche chips, and completion into the Feed. Use large type: "BUILT FOR THE DAWGS".

### Profile and Portfolio

Create a profile/portfolio visual for Sola Roux. Show avatar, handle, Rising badge, Verified badge, reputation score, public URL, portfolio grid, open-to-collab badges, and platform links.

### Content Studio

Create a creator studio visual with five content types: image, video, audio, text, story. Show draft, scheduled, and published states. Include cross-post toggles and AI best-time suggestion.

### Feed and Discovery

Create a discovery visual with For You, Following, Rising tabs. Show emerging creators boosted by growth potential, trending tags, challenges, categories, and creator cards.

### Audience Ownership

Create a visual showing rented platforms converting into owned channels. Show external platform nodes flowing into top fan intelligence, email list, SMS list, landing page, and exportable audience database.

### Analytics and Intelligence

Create an analytics visual with total reach, engagement, engagement rate, profile views, platform distribution, content performance ranking, demographic charts, and AI insights.

### Job Board and Brand Deals

Create a monetization visual showing creators browsing verified brand opportunities, checking budget ranges, applying with pitch and rate, moving through deal pipeline, signing contract, submitting deliverables, and getting paid.

### Merchandise Studio

Create a merch module visual with product generator, AI mockups, product types, margin controls, store preview, orders, fulfillment statuses, and both in-app store plus standalone ecommerce site.

### Art Marketplace

Create an art commerce visual showing original artwork, limited prints, open prints, digital downloads, commission requests, collector purchase flow, and creator inventory.

### Financial Dashboard

Create a finance visual showing all revenue streams converging into an earnings dashboard. Include transactions, payouts, invoices, tax center, platform fee, and cleared/pending/scheduled status tags.

### Collaboration Hub / Inbox

Create an inbox visual with tabs or filters for primary, requests, collaborations, and deals. Show a verified brand thread, collaborator thread, buyer thread, and composer.

### Reputation and Verification

Create a reputation visual with a central score, weighted breakdown, badges, verification checklist, trust signals, and how successful deals/community behavior/content quality increase reputation.

### Community and Engagement

Create a community visual with groups, events, challenges, challenge entries, community feed, wins/resources/tips, and local/niche community discovery.

### Learning and Growth

Create a learning visual with course cards, lesson progress, creator business curriculum, pricing, algorithms, contracts, vertical filming, and completion badges.

### Settings and Preferences

Create a settings visual with account, privacy, security, notifications, appearance, theme selector, support, legal, and reset demo controls.

---

## Image Generation Style Guardrails

Apply these constraints to every generated visual:

- Make labels readable at normal screen size.
- Use a consistent icon style.
- Use the Underdawg palette; do not introduce unrelated colors unless needed for contrast.
- Do not use generic startup illustrations.
- Do not use soft pastel SaaS styling.
- Do not make the app look like a web landing page; it is a mobile product.
- Do not imply the backend is already built. Use "planned" or dashed outlines for backend/API/database.
- Do not show fake celebrity creators. Use the mock creator names from the app if names are needed.
- Keep all generated text short, uppercase where appropriate, and aligned with the product voice.
- Prefer crisp vector diagrams and real mobile UI panels.
- Use black/bone page backgrounds with accent callouts.

---

## Recommended Final Output Structure

Ask the design generator to produce:

1. A 16:9 architecture deck with 12-16 pages.
2. A separate 4K architecture image.
3. A separate 4K ER diagram image.
4. A separate 4K user-flow image.
5. A 4-column screenshot board of phone mockups.
6. Individual high-resolution phone screenshots for Feed, Profile, Studio, Analytics, Jobs, Finance.
7. Exportable PNGs and SVG/PDF versions for diagrams if supported.

Suggested deck order:

1. Cover: Underdawg Creator OS.
2. Product thesis: Get Discovered, Get Connected, Get Paid.
3. Four-layer creator pipeline.
4. Current app implementation summary.
5. System architecture.
6. Mobile navigation architecture.
7. Conceptual ER diagram.
8. Creator lifecycle.
9. Onboarding flow.
10. Content studio flow.
11. Audience ownership flow.
12. Brand deals flow.
13. Commerce and finance flow.
14. Module map.
15. Screenshot storyboard.
16. API and integration tables.

