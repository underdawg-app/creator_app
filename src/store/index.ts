import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  profileMock,
  platformSeed,
  emailSubscribersSeed,
  dealsSeed,
  productsSeed,
  merchOrdersSeed,
  artSeed,
  commissionsSeed,
  transactionsSeed,
  threadsSeed,
  groupsSeed,
  verificationSteps,
  badgesSeed,
  defaultSettings,
  feedPosts,
  type Platform,
  type Deal,
  type Product,
  type Artwork,
  type Transaction,
  type Thread,
} from '@/data/mock';

// --------------------------------------------------------------------------
// Types
// --------------------------------------------------------------------------

type Profile = {
  name: string;
  handle: string;
  bio: string;
  type: string;
  location: string;
  avatar: string;
  niches: string[];
  openTo: string[];
  reputation: number;
  uid: string | null;
  phone: string | null;
};

type ContentPost = {
  id: string;
  kind: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'TEXT' | 'STORY';
  caption: string;
  tags: string[];
  color: string;
  bg: string;
  fg: string;
  scheduledFor?: string;
  status: 'DRAFT' | 'SCHEDULED' | 'PUBLISHED';
  createdAt: number;
  likes: number;
  comments: number;
  reposts: number;
};

type Application = {
  id: string;
  jobId: string;
  pitch: string;
  rate: number;
  timeline: string;
  status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED';
  submittedAt: number;
};

type Toast = {
  id: number;
  message: string;
  tone: 'default' | 'success' | 'warn';
};

type UIState = {
  toasts: Toast[];
  confettiAt: number;
  splashAt: { ts: number; x: number; y: number; color: string } | null;
};

export type ThemePreference = 'system' | 'light' | 'dark';

// --------------------------------------------------------------------------
// Store Customization (creator storefront)
// --------------------------------------------------------------------------

export type StoreHeadingFontKey =
  | 'archivo-black'
  | 'archivo-extrabold'
  | 'archivo-black-italic'
  | 'anton'
  | 'instrument-italic'
  | 'space-bold';

export type StoreBodyFontKey =
  | 'space-regular'
  | 'space-medium'
  | 'space-bold'
  | 'instrument-regular';

export type StoreAccentKey = 'acid' | 'electric' | 'blush' | 'ember' | 'ink';

export type StoreLayoutKey = 'grid' | 'stack' | 'mag';

export type StoreBackgroundMode = 'image' | 'video' | 'color';

export type StoreSectionType =
  | 'hero'
  | 'marquee'
  | 'featured'
  | 'grid'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'footer';

export type StoreSection = {
  id: string;
  type: StoreSectionType;
  enabled: boolean;
  // shared
  title?: string;
  body?: string;
  // hero
  eyebrow?: string;
  ctaLabel?: string;
  // marquee
  marqueeItems?: string[];
  // featured
  featuredProductId?: string;
  featuredLabel?: string;
  // contact
  email?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  // faq
  items?: { q: string; a: string }[];
  // footer
  footerTagline?: string;
  copyright?: string;
};

export type CustomCategory = {
  key: string;
  name: string;
  baseCost: number;
  custom: true;
};

export type StoreCustomization = {
  storeName: string;
  tagline: string;
  headingFont: StoreHeadingFontKey;
  bodyFont: StoreBodyFontKey;
  accent: StoreAccentKey;
  layout: StoreLayoutKey;
  backgroundMode: StoreBackgroundMode;
  backgroundValue: string;
  logo: string;
  sections: StoreSection[];
  customCategories: CustomCategory[];
  siteEnabled: boolean;
  lastPublishedAt: number | null;
};

const defaultSections: StoreSection[] = [
  {
    id: 'sec-marquee',
    type: 'marquee',
    enabled: true,
    marqueeItems: ['LIVE · SHIPS WORLDWIDE', 'TAP TO VISIT', 'NEW DROP THIS WEEK'],
  },
  {
    id: 'sec-hero',
    type: 'hero',
    enabled: true,
    eyebrow: 'STOREFRONT',
    ctaLabel: 'SHOP THE DROP',
  },
  {
    id: 'sec-featured',
    type: 'featured',
    enabled: true,
    eyebrow: 'FEATURED',
    featuredLabel: 'NEW · LIMITED',
  },
  { id: 'sec-grid', type: 'grid', enabled: true, title: 'ALL PRODUCTS' },
  {
    id: 'sec-about',
    type: 'about',
    enabled: true,
    title: 'ABOUT THE STORE',
    body:
      'Made by a creator, for the people who get it. Every drop ships from a real studio — not a warehouse.',
  },
  {
    id: 'sec-shipping',
    type: 'shipping',
    enabled: true,
    title: 'SHIPPING',
    body: 'Ships in 3–5 days. Returns within 14 days. Worldwide via DHL.',
  },
  {
    id: 'sec-faq',
    type: 'faq',
    enabled: false,
    title: 'FAQ',
    items: [
      { q: 'When will I get it?', a: '3–5 business days within India, 7–14 international.' },
      { q: 'Returns?', a: 'Yes — within 14 days, original condition.' },
    ],
  },
  {
    id: 'sec-contact',
    type: 'contact',
    enabled: true,
    title: 'GET IN TOUCH',
    email: 'hi@yourstore.com',
    instagram: '',
    twitter: '',
    whatsapp: '',
  },
  {
    id: 'sec-footer',
    type: 'footer',
    enabled: true,
    footerTagline: 'POWERED BY UNDERDAWG · MMXXVI',
    copyright: '',
  },
];

const initialStoreCustomization: StoreCustomization = {
  storeName: 'SOLA.STORE',
  tagline: 'For the ones still climbing.',
  headingFont: 'archivo-black',
  bodyFont: 'space-regular',
  accent: 'acid',
  layout: 'grid',
  backgroundMode: 'image',
  backgroundValue:
    'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=900&q=80&auto=format&fit=crop',
  logo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&crop=faces',
  sections: defaultSections,
  customCategories: [],
  siteEnabled: true,
  lastPublishedAt: null,
};

// --------------------------------------------------------------------------
// Store Builder — guided storefront wizard (Merch studio)
// A focused, self-contained slice that drives every live preview in the
// step-by-step store builder. Kept separate from `storeCustomization` so the
// guided flow stays simple and never collides with the advanced editor.
// --------------------------------------------------------------------------

export type ProductPlacement = 'FRONT' | 'BACK' | 'LEFT' | 'RIGHT';

export type BuilderProduct = {
  id: string;
  type: string; // PRODUCT_TYPES key — 'TEE' | 'HOODIE' | 'MUG' | 'TOTE' | 'POSTER' | 'CAP'
  color: string; // garment hex
  design: string; // tile label — print method, or AI mockup design name
  name: string;
  price: number;
  method?: string; // print/decoration method label (DTG, DTF, EMBROIDERY …)
  artworkUri?: string | null; // uploaded design image (cropped)
  placement?: ProductPlacement; // which side the artwork sits on
  // Free transform of the artwork within the print area (print-on-demand placer):
  artX?: number; // normalized x offset from print-area centre (-… to …)
  artY?: number; // normalized y offset
  artScale?: number; // scale multiplier (1 = fit print-area width)
  mockupUrl?: string; // photoreal mockup image (Printful via backend) — shown as the product image when present
};

export type StoreBannerStyle = 'GRADIENT' | 'SOLID' | 'PATTERN' | 'MINIMAL';

// One slide of the auto-rotating hero carousel.
export type BannerItem = {
  id: string;
  imageUri: string | null; // cropped hero image; falls back to bannerStyle fill
  headline: string;
  subtext: string;
  buttonLabel: string;
};

// A storefront nav link (e.g. "ALL PRODUCTS", "NEW IN").
export type StoreMenuLink = {
  id: string;
  label: string;
  target: 'all' | 'selected';
};

export type StoreBuilder = {
  built: boolean; // has the user finished building at least once
  published: boolean;
  publishedAt: number | null;
  step: number; // furthest wizard step reached (for resume)
  // identity
  name: string;
  handle: string;
  tagline: string;
  logoUri: string | null; // uploaded logo (gallery), overrides the monogram
  headerImageUri: string | null; // header background image (gallery)
  // theme
  themeKey: string;
  fontKey: string;
  // banner / hero carousel
  bannerStyle: StoreBannerStyle; // fill style for banners without an image
  banners: BannerItem[]; // auto-rotating hero carousel (2–3 slides)
  // layout toggles
  showSearch: boolean;
  showGrid: boolean;
  showStory: boolean;
  showFooter: boolean;
  storyTitle: string;
  storyBody: string;
  // navigation + footer
  menuLinks: StoreMenuLink[];
  footerNote: string;
  footerLinks: string[];
  // catalog
  products: BuilderProduct[];
};

const defaultBuilder: StoreBuilder = {
  built: false,
  published: false,
  publishedAt: null,
  step: 0,
  name: '',
  handle: '',
  tagline: '',
  logoUri: null,
  headerImageUri: null,
  themeKey: 'midnight',
  fontKey: 'grotesk',
  bannerStyle: 'GRADIENT',
  banners: [
    { id: 'b1', imageUri: null, headline: 'THE NEW DROP', subtext: 'Limited run. Ships worldwide.', buttonLabel: 'SHOP NOW' },
    { id: 'b2', imageUri: null, headline: 'SEASON 01', subtext: 'Made in small batches.', buttonLabel: 'EXPLORE' },
  ],
  showSearch: true,
  showGrid: true,
  showStory: true,
  showFooter: true,
  storyTitle: 'THE STORY',
  storyBody:
    'Made by a creator, for the people who get it. Every piece ships from a real studio — not a warehouse.',
  menuLinks: [
    { id: 'm1', label: 'ALL PRODUCTS', target: 'all' },
    { id: 'm2', label: 'NEW IN', target: 'selected' },
  ],
  footerNote: 'Thanks for supporting an independent creator.',
  footerLinks: ['SHIPPING', 'RETURNS', 'CONTACT'],
  products: [],
};

type StoreState = {
  profile: Profile;
  setProfile: (patch: Partial<Profile>) => void;

  platforms: Platform[];
  togglePlatform: (key: string) => void;

  subscribers: typeof emailSubscribersSeed;
  addSubscriber: (email: string) => void;

  // content
  drafts: ContentPost[];
  published: ContentPost[];
  scheduled: ContentPost[];
  addDraft: (p: Omit<ContentPost, 'id' | 'status' | 'createdAt' | 'likes' | 'comments' | 'reposts'>) => string;
  publishDraft: (id: string) => void;
  scheduleDraft: (id: string, when: string) => void;
  publishImmediate: (p: Omit<ContentPost, 'id' | 'status' | 'createdAt' | 'likes' | 'comments' | 'reposts'>) => string;

  // social (likes / saves / follows) — keyed by post id / user handle
  likes: Record<string, boolean>;
  saves: Record<string, boolean>;
  following: Record<string, boolean>;
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  toggleFollow: (handle: string) => void;

  // jobs
  applications: Application[];
  applyToJob: (a: Omit<Application, 'id' | 'status' | 'submittedAt'>) => void;
  deals: Deal[];
  advanceDeal: (id: string) => void;
  rateCardCustom: Record<string, number>;
  setRate: (key: string, base: number) => void;

  // merch
  products: Product[];
  addProduct: (p: Omit<Product, 'id' | 'sold'>) => void;
  toggleProductPublished: (id: string) => void;
  updateProduct: (id: string, patch: Partial<Omit<Product, 'id'>>) => void;
  removeProduct: (id: string) => void;
  merchOrders: typeof merchOrdersSeed;

  // store customization (creator storefront)
  storeCustomization: StoreCustomization;
  setStoreField: <K extends keyof StoreCustomization>(key: K, value: StoreCustomization[K]) => void;
  reorderStoreSection: (id: string, direction: 'up' | 'down') => void;
  toggleStoreSection: (id: string) => void;
  updateStoreSection: (id: string, patch: Partial<StoreSection>) => void;
  addCustomCategory: (cat: Omit<CustomCategory, 'custom'>) => void;
  removeCustomCategory: (key: string) => void;
  publishStore: () => void;
  resetStoreCustomization: () => void;

  // store builder (guided storefront wizard)
  storeBuilder: StoreBuilder;
  setBuilder: (patch: Partial<StoreBuilder>) => void;
  addBuilderProduct: (p: Omit<BuilderProduct, 'id'>) => void;
  removeBuilderProduct: (id: string) => void;
  publishBuilder: () => void;
  resetBuilder: () => void;

  // art
  artworks: Artwork[];
  addArtwork: (a: Omit<Artwork, 'id' | 'available'>) => void;
  commissions: typeof commissionsSeed;

  // finance
  transactions: Transaction[];
  requestPayout: (amount: number) => void;

  // messages
  threads: Thread[];
  sendMessage: (threadId: string, body: string) => void;
  markThreadRead: (threadId: string) => void;
  setTyping: (threadId: string, on: boolean) => void;
  receiveMessage: (threadId: string, body: string) => void;
  archiveThread: (threadId: string) => void;
  unarchiveThread: (threadId: string) => void;
  deleteThread: (threadId: string) => void;

  // community
  groups: typeof groupsSeed;
  toggleGroup: (id: string) => void;

  // reputation
  verification: typeof verificationSteps;
  advanceVerification: () => void;
  badges: typeof badgesSeed;

  // learning
  lessonProgress: Record<string, number>; // course id -> lesson count done
  markLessonDone: (courseId: string, idx: number) => void;

  // settings
  settings: typeof defaultSettings;
  updateSetting: <K extends keyof typeof defaultSettings>(
    section: K,
    patch: Partial<typeof defaultSettings[K]>
  ) => void;

  // ui
  ui: UIState;
  toast: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: number) => void;
  confetti: () => void;
  splash: (x: number, y: number, color?: string) => void;

  // theme
  themePreference: ThemePreference;
  setThemePreference: (pref: ThemePreference) => void;

  hydrated: boolean;
  markHydrated: () => void;
  onboarded: boolean;
  setOnboarded: (v: boolean) => void;
  logout: () => void;
  resetDemo: () => void;
};

// --------------------------------------------------------------------------
// Seed
// --------------------------------------------------------------------------

const initialProfile: Profile = {
  name: profileMock.name,
  handle: profileMock.handle,
  bio: profileMock.bio,
  type: profileMock.type,
  location: profileMock.location,
  avatar: profileMock.avatar,
  niches: [...profileMock.niches],
  openTo: ['BRAND DEALS', 'COMMISSIONS', 'COLLABS'],
  reputation: profileMock.stats.reputation,
  uid: null,
  phone: null,
};

const initialLikes: Record<string, boolean> = {};
const initialSaves: Record<string, boolean> = {};
feedPosts.slice(0, 2).forEach((p) => {
  initialLikes[p.id] = true;
});

let tid = 1;

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      profile: initialProfile,
      setProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),

      platforms: platformSeed.map((p) => ({ ...p })),
      togglePlatform: (key) =>
        set((s) => ({
          platforms: s.platforms.map((p) =>
            p.key === key
              ? {
                  ...p,
                  connected: !p.connected,
                  followers: !p.connected && p.followers === 0 ? Math.floor(1_200 + Math.random() * 8_000) : p.followers,
                  growth: !p.connected && p.growth === 0 ? Number((2 + Math.random() * 10).toFixed(1)) : p.growth,
                }
              : p
          ),
        })),

      subscribers: [...emailSubscribersSeed],
      addSubscriber: (email) =>
        set((s) => ({
          subscribers: [
            { id: `s${Date.now()}`, email, tag: 'New', joinedAgo: 'just now' },
            ...s.subscribers,
          ],
        })),

      drafts: [],
      published: [],
      scheduled: [],
      addDraft: (p) => {
        const id = `d${Date.now()}`;
        set((s) => ({
          drafts: [
            {
              ...p,
              id,
              status: 'DRAFT',
              createdAt: Date.now(),
              likes: 0,
              comments: 0,
              reposts: 0,
            },
            ...s.drafts,
          ],
        }));
        return id;
      },
      publishDraft: (id) =>
        set((s) => {
          const d = s.drafts.find((x) => x.id === id);
          if (!d) return s;
          return {
            drafts: s.drafts.filter((x) => x.id !== id),
            published: [{ ...d, status: 'PUBLISHED' }, ...s.published],
          };
        }),
      scheduleDraft: (id, when) =>
        set((s) => {
          const d = s.drafts.find((x) => x.id === id);
          if (!d) return s;
          return {
            drafts: s.drafts.filter((x) => x.id !== id),
            scheduled: [{ ...d, status: 'SCHEDULED', scheduledFor: when }, ...s.scheduled],
          };
        }),
      publishImmediate: (p) => {
        const id = `pub${Date.now()}`;
        set((s) => ({
          published: [
            {
              ...p,
              id,
              status: 'PUBLISHED',
              createdAt: Date.now(),
              likes: 0,
              comments: 0,
              reposts: 0,
            },
            ...s.published,
          ],
        }));
        return id;
      },

      likes: initialLikes,
      saves: initialSaves,
      following: {},
      toggleLike: (id) => set((s) => ({ likes: { ...s.likes, [id]: !s.likes[id] } })),
      toggleSave: (id) => set((s) => ({ saves: { ...s.saves, [id]: !s.saves[id] } })),
      toggleFollow: (handle) =>
        set((s) => ({ following: { ...s.following, [handle]: !s.following[handle] } })),

      applications: [],
      applyToJob: (a) =>
        set((s) => ({
          applications: [
            {
              ...a,
              id: `ap${Date.now()}`,
              status: 'APPLIED',
              submittedAt: Date.now(),
            },
            ...s.applications,
          ],
        })),
      deals: dealsSeed.map((d) => ({ ...d })),
      advanceDeal: (id) =>
        set((s) => ({
          deals: s.deals.map((d) => {
            if (d.id !== id) return d;
            const order: Deal['status'][] = [
              'APPLIED',
              'SHORTLISTED',
              'NEGOTIATING',
              'CONTRACT',
              'ACTIVE',
              'IN REVIEW',
              'COMPLETED',
            ];
            const idx = order.indexOf(d.status);
            const nextStatus = order[Math.min(idx + 1, order.length - 1)];
            return {
              ...d,
              status: nextStatus,
              progress: Math.min(1, d.progress + 0.15),
            };
          }),
        })),
      rateCardCustom: {},
      setRate: (key, base) =>
        set((s) => ({ rateCardCustom: { ...s.rateCardCustom, [key]: base } })),

      products: productsSeed.map((p) => ({ ...p })),
      addProduct: (p) =>
        set((s) => ({
          products: [{ ...p, id: `p${Date.now()}`, sold: 0 }, ...s.products],
        })),
      toggleProductPublished: (id) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, published: !p.published } : p
          ),
        })),
      updateProduct: (id, patch) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id ? { ...p, ...patch } : p
          ),
        })),
      removeProduct: (id) =>
        set((s) => ({
          products: s.products.filter((p) => p.id !== id),
        })),
      merchOrders: [...merchOrdersSeed],

      storeCustomization: { ...initialStoreCustomization, sections: defaultSections.map((sx) => ({ ...sx })) },
      setStoreField: (key, value) =>
        set((s) => ({
          storeCustomization: { ...s.storeCustomization, [key]: value },
        })),
      reorderStoreSection: (id, direction) =>
        set((s) => {
          const list = [...s.storeCustomization.sections];
          const idx = list.findIndex((sx) => sx.id === id);
          if (idx < 0) return s;
          const next = direction === 'up' ? idx - 1 : idx + 1;
          if (next < 0 || next >= list.length) return s;
          [list[idx], list[next]] = [list[next], list[idx]];
          return { storeCustomization: { ...s.storeCustomization, sections: list } };
        }),
      toggleStoreSection: (id) =>
        set((s) => ({
          storeCustomization: {
            ...s.storeCustomization,
            sections: s.storeCustomization.sections.map((sx) =>
              sx.id === id ? { ...sx, enabled: !sx.enabled } : sx,
            ),
          },
        })),
      updateStoreSection: (id, patch) =>
        set((s) => ({
          storeCustomization: {
            ...s.storeCustomization,
            sections: s.storeCustomization.sections.map((sx) =>
              sx.id === id ? { ...sx, ...patch } : sx,
            ),
          },
        })),
      addCustomCategory: (cat) =>
        set((s) => {
          // dedupe on key
          if (s.storeCustomization.customCategories.find((c) => c.key === cat.key)) return s;
          return {
            storeCustomization: {
              ...s.storeCustomization,
              customCategories: [
                ...s.storeCustomization.customCategories,
                { ...cat, custom: true as const },
              ],
            },
          };
        }),
      removeCustomCategory: (key) =>
        set((s) => ({
          storeCustomization: {
            ...s.storeCustomization,
            customCategories: s.storeCustomization.customCategories.filter((c) => c.key !== key),
          },
        })),
      publishStore: () =>
        set((s) => ({
          storeCustomization: {
            ...s.storeCustomization,
            siteEnabled: true,
            lastPublishedAt: Date.now(),
          },
        })),
      resetStoreCustomization: () =>
        set({
          storeCustomization: {
            ...initialStoreCustomization,
            sections: defaultSections.map((sx) => ({ ...sx })),
          },
        }),

      storeBuilder: { ...defaultBuilder, products: [] },
      setBuilder: (patch) =>
        set((s) => ({ storeBuilder: { ...s.storeBuilder, ...patch } })),
      addBuilderProduct: (p) =>
        set((s) => ({
          storeBuilder: {
            ...s.storeBuilder,
            products: [
              { ...p, id: `bp${Date.now()}${Math.floor(p.price)}` },
              ...s.storeBuilder.products,
            ],
          },
        })),
      removeBuilderProduct: (id) =>
        set((s) => ({
          storeBuilder: {
            ...s.storeBuilder,
            products: s.storeBuilder.products.filter((x) => x.id !== id),
          },
        })),
      publishBuilder: () =>
        set((s) => ({
          storeBuilder: {
            ...s.storeBuilder,
            built: true,
            published: true,
            publishedAt: Date.now(),
          },
        })),
      resetBuilder: () => set({ storeBuilder: { ...defaultBuilder, products: [] } }),

      artworks: artSeed.map((a) => ({ ...a })),
      addArtwork: (a) =>
        set((s) => ({
          artworks: [{ ...a, id: `art${Date.now()}`, available: true }, ...s.artworks],
        })),
      commissions: [...commissionsSeed],

      transactions: transactionsSeed.map((t) => ({ ...t })),
      requestPayout: (amount) =>
        set((s) => ({
          transactions: [
            {
              id: `t${Date.now()}`,
              kind: 'PAYOUT',
              source: 'HDFC ****4821',
              amount,
              direction: 'OUT',
              date: 'now',
              status: 'PENDING',
            },
            ...s.transactions,
          ],
        })),

      threads: threadsSeed.map((t) => ({ ...t, messages: [...t.messages] })),
      sendMessage: (threadId, body) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  preview: body,
                  updatedAgo: 'now',
                  messages: [...t.messages, { from: 'me', body, ts: 'now' }],
                }
              : t
          ),
        })),
      markThreadRead: (threadId) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id === threadId ? { ...t, unread: 0 } : t,
          ),
        })),
      setTyping: (threadId, on) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id === threadId ? { ...t, typing: on } : t,
          ),
        })),
      receiveMessage: (threadId, body) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  preview: body,
                  updatedAgo: 'now',
                  typing: false,
                  messages: [...t.messages, { from: 'them', body, ts: 'now' }],
                }
              : t,
          ),
        })),
      archiveThread: (threadId) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id === threadId ? { ...t, archived: true } : t,
          ),
        })),
      unarchiveThread: (threadId) =>
        set((s) => ({
          threads: s.threads.map((t) =>
            t.id === threadId ? { ...t, archived: false } : t,
          ),
        })),
      deleteThread: (threadId) =>
        set((s) => ({
          threads: s.threads.filter((t) => t.id !== threadId),
        })),

      groups: groupsSeed.map((g) => ({ ...g })),
      toggleGroup: (id) =>
        set((s) => ({
          groups: s.groups.map((g) => (g.id === id ? { ...g, joined: !g.joined } : g)),
        })),

      verification: verificationSteps.map((v) => ({ ...v })),
      advanceVerification: () =>
        set((s) => {
          const idx = s.verification.findIndex((v) => !v.done);
          if (idx < 0) return s;
          const next = [...s.verification];
          next[idx] = { ...next[idx], done: true };
          return { verification: next };
        }),
      badges: badgesSeed.map((b) => ({ ...b })),

      lessonProgress: {},
      markLessonDone: (courseId, idx) =>
        set((s) => ({
          lessonProgress: {
            ...s.lessonProgress,
            [courseId]: Math.max(s.lessonProgress[courseId] ?? 0, idx + 1),
          },
        })),

      settings: JSON.parse(JSON.stringify(defaultSettings)),
      updateSetting: (section, patch) =>
        set((s) => ({
          settings: {
            ...s.settings,
            [section]: { ...s.settings[section], ...patch },
          },
        })),

      ui: { toasts: [], confettiAt: 0, splashAt: null },
      toast: (message, tone = 'default') =>
        set((s) => ({
          ui: {
            ...s.ui,
            // Only ever one toast at a time: a new one replaces the current
            // one in the same spot instead of stacking up the screen.
            toasts: [{ id: ++tid, message, tone }],
          },
        })),
      dismissToast: (id) =>
        set((s) => ({
          ui: { ...s.ui, toasts: s.ui.toasts.filter((t) => t.id !== id) },
        })),
      confetti: () =>
        set((s) => ({ ui: { ...s.ui, confettiAt: Date.now() } })),
      splash: (x, y, color = '#9CA3AF') =>
        set((s) => ({ ui: { ...s.ui, splashAt: { ts: Date.now(), x, y, color } } })),

      themePreference: 'system',
      setThemePreference: (pref) => set({ themePreference: pref }),

      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      onboarded: false,
      setOnboarded: (v) => set({ onboarded: v }),
      logout: () => {
        set({ onboarded: false, profile: initialProfile });
      },
      resetDemo: () => {
        set({
          profile: initialProfile,
          platforms: platformSeed.map((p) => ({ ...p })),
          subscribers: [...emailSubscribersSeed],
          drafts: [],
          published: [],
          scheduled: [],
          likes: { ...initialLikes },
          saves: {},
          following: {},
          applications: [],
          deals: dealsSeed.map((d) => ({ ...d })),
          rateCardCustom: {},
          products: productsSeed.map((p) => ({ ...p })),
          merchOrders: [...merchOrdersSeed],
          storeCustomization: {
            ...initialStoreCustomization,
            sections: defaultSections.map((sx) => ({ ...sx })),
          },
          storeBuilder: { ...defaultBuilder, products: [] },
          artworks: artSeed.map((a) => ({ ...a })),
          commissions: [...commissionsSeed],
          transactions: transactionsSeed.map((t) => ({ ...t })),
          threads: threadsSeed.map((t) => ({ ...t, messages: [...t.messages] })),
          groups: groupsSeed.map((g) => ({ ...g })),
          verification: verificationSteps.map((v) => ({ ...v })),
          badges: badgesSeed.map((b) => ({ ...b })),
          lessonProgress: {},
          settings: JSON.parse(JSON.stringify(defaultSettings)),
        });
      },
    }),
    {
      name: 'underdawg-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      // Bumped to clear a sticky `storeBuilder.built/published` flag that was
      // persisted in older installs and trapped users on the one-page review
      // instead of the welcome → wizard flow. Resets ONLY the store builder;
      // all other saved data is preserved. v2: new builder shape (header image,
      // banner carousel, menu links, customizable footer).
      version: 2,
      migrate: (persisted: any) =>
        persisted
          ? { ...persisted, storeBuilder: { ...defaultBuilder, products: [] } }
          : persisted,
      partialize: (s) => ({
        profile: s.profile,
        platforms: s.platforms,
        subscribers: s.subscribers,
        drafts: s.drafts,
        published: s.published,
        scheduled: s.scheduled,
        likes: s.likes,
        saves: s.saves,
        following: s.following,
        applications: s.applications,
        deals: s.deals,
        rateCardCustom: s.rateCardCustom,
        products: s.products,
        storeCustomization: s.storeCustomization,
        storeBuilder: s.storeBuilder,
        artworks: s.artworks,
        commissions: s.commissions,
        transactions: s.transactions,
        threads: s.threads,
        groups: s.groups,
        verification: s.verification,
        badges: s.badges,
        lessonProgress: s.lessonProgress,
        settings: s.settings,
        themePreference: s.themePreference,
        onboarded: s.onboarded,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    }
  )
);
