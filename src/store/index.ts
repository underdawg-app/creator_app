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
  merchOrders: typeof merchOrdersSeed;

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
      merchOrders: [...merchOrdersSeed],

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
            toasts: [...s.ui.toasts, { id: ++tid, message, tone }],
          },
        })),
      dismissToast: (id) =>
        set((s) => ({
          ui: { ...s.ui, toasts: s.ui.toasts.filter((t) => t.id !== id) },
        })),
      confetti: () =>
        set((s) => ({ ui: { ...s.ui, confettiAt: Date.now() } })),
      splash: (x, y, color = '#D8FF3D') =>
        set((s) => ({ ui: { ...s.ui, splashAt: { ts: Date.now(), x, y, color } } })),

      themePreference: 'system',
      setThemePreference: (pref) => set({ themePreference: pref }),

      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      onboarded: false,
      setOnboarded: (v) => set({ onboarded: v }),
      logout: () => {
        // Fire-and-forget Firebase sign-out so the next launch lands on
        // Welcome. Wrapped in a require()/try so the store still works in
        // tests / environments where Firebase isn't installed.
        try {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const auth = require('@react-native-firebase/auth').default;
          auth().signOut().catch(() => {});
        } catch {
          // No-op: Firebase not available in this environment.
        }
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
