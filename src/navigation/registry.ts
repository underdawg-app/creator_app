// Maps expo-router style paths to React Navigation (stack, screen, params).
// The shim parses paths from existing call sites without screens needing to change.
//
// Stacks:
//   - "Root"       : top-level native-stack (parent of Onboarding/Tabs/Modules + Splash)
//   - "Onboarding" : nested native-stack of onboarding screens
//   - "Tabs"       : nested bottom-tab navigator
//   - "Modules"    : nested native-stack of module screens

export type StackName = 'Root' | 'Onboarding' | 'Tabs' | 'Modules';

export type ParseResult = {
  stack: StackName;
  screen: string;
  params?: Record<string, string>;
  // When true, a `replace` against this target should perform a cross-stack reset
  // (e.g. router.replace('/(tabs)') from inside Onboarding) instead of an in-stack
  // StackActions.replace.
  crossStack?: boolean;
};

// Static path table. Dynamic routes are handled below via `dynamicEntries`.
const STATIC: Record<string, ParseResult> = {
  '/(tabs)': { stack: 'Root', screen: 'Tabs', crossStack: true },
  '/(tabs)/index': { stack: 'Root', screen: 'Tabs', params: { screen: 'Feed' } as never, crossStack: true },
  '/(tabs)/explore': { stack: 'Root', screen: 'Tabs', params: { screen: 'Explore' } as never, crossStack: true },
  '/(tabs)/create': { stack: 'Root', screen: 'Tabs', params: { screen: 'Create' } as never, crossStack: true },
  '/(tabs)/inbox': { stack: 'Root', screen: 'Tabs', params: { screen: 'Inbox' } as never, crossStack: true },
  '/(tabs)/jobs': { stack: 'Root', screen: 'Tabs', params: { screen: 'Jobs' } as never, crossStack: true },
  '/(tabs)/profile': { stack: 'Root', screen: 'Tabs', params: { screen: 'Profile' } as never, crossStack: true },

  '/(onboarding)/welcome': { stack: 'Onboarding', screen: 'Welcome' },
  '/(onboarding)/auth': { stack: 'Onboarding', screen: 'Auth' },
  '/(onboarding)/otp': { stack: 'Onboarding', screen: 'Otp' },
  '/(onboarding)/user-type': { stack: 'Onboarding', screen: 'UserType' },
  '/(onboarding)/creator-type': { stack: 'Onboarding', screen: 'CreatorType' },
  '/(onboarding)/identity': { stack: 'Onboarding', screen: 'Identity' },

  '/(modules)/camera': { stack: 'Modules', screen: 'Camera' },

  '/(modules)/notifications': { stack: 'Modules', screen: 'NotificationsIndex' },

  '/(modules)/settings': { stack: 'Modules', screen: 'SettingsIndex' },
  '/(modules)/settings/account': { stack: 'Modules', screen: 'SettingsAccount' },
  '/(modules)/settings/notifications': { stack: 'Modules', screen: 'SettingsNotifications' },
  '/(modules)/settings/privacy': { stack: 'Modules', screen: 'SettingsPrivacy' },
  '/(modules)/settings/security': { stack: 'Modules', screen: 'SettingsSecurity' },
  '/(modules)/settings/help': { stack: 'Modules', screen: 'SettingsHelp' },
  '/(modules)/settings/blocked': { stack: 'Modules', screen: 'SettingsBlocked' },

  '/(modules)/studio': { stack: 'Modules', screen: 'StudioIndex' },
  '/(modules)/studio/content': { stack: 'Modules', screen: 'StudioContent' },
  '/(modules)/studio/drafts': { stack: 'Modules', screen: 'StudioDrafts' },
  '/(modules)/studio/schedule': { stack: 'Modules', screen: 'StudioSchedule' },
  '/(modules)/studio/image-composer': { stack: 'Modules', screen: 'StudioImageComposer' },
  '/(modules)/studio/text-composer': { stack: 'Modules', screen: 'StudioTextComposer' },
  '/(modules)/studio/audio-composer': { stack: 'Modules', screen: 'StudioAudioComposer' },
  '/(modules)/studio/live-composer': { stack: 'Modules', screen: 'StudioLiveComposer' },

  '/(modules)/art': { stack: 'Modules', screen: 'ArtIndex' },
  '/(modules)/art/list': { stack: 'Modules', screen: 'ArtList' },
  '/(modules)/art/commissions': { stack: 'Modules', screen: 'ArtCommissions' },

  '/(modules)/learning': { stack: 'Modules', screen: 'LearningIndex' },

  '/(modules)/jobs': { stack: 'Modules', screen: 'JobsIndex' },
  '/(modules)/jobs/active-deals': { stack: 'Modules', screen: 'JobsActiveDeals' },
  '/(modules)/jobs/rate-card': { stack: 'Modules', screen: 'JobsRateCard' },
  '/(modules)/jobs/apply': { stack: 'Modules', screen: 'JobsApply' },
  '/(modules)/jobs/applications': { stack: 'Modules', screen: 'JobsApplications' },
  '/(modules)/jobs/negotiation': { stack: 'Modules', screen: 'GigNegotiation' },
  '/(modules)/jobs/contract': { stack: 'Modules', screen: 'GigContract' },
  '/(modules)/jobs/deliver': { stack: 'Modules', screen: 'GigDeliver' },
  '/(modules)/jobs/payment': { stack: 'Modules', screen: 'GigPayment' },

  '/(modules)/community': { stack: 'Modules', screen: 'CommunityIndex' },
  '/(modules)/community/events': { stack: 'Modules', screen: 'CommunityEvents' },
  '/(modules)/community/event': { stack: 'Modules', screen: 'CommunityEventDetail' },
  '/(modules)/community/groups': { stack: 'Modules', screen: 'CommunityGroups' },
  '/(modules)/community/group': { stack: 'Modules', screen: 'CommunityGroupDetail' },
  '/(modules)/community/directory': { stack: 'Modules', screen: 'CommunityDirectory' },
  '/(modules)/community/mentorship': { stack: 'Modules', screen: 'CommunityMentorship' },
  '/(modules)/community/qa': { stack: 'Modules', screen: 'CommunityQA' },
  '/(modules)/community/challenges': { stack: 'Modules', screen: 'ChallengesIndex' },

  '/(modules)/portfolio': { stack: 'Modules', screen: 'PortfolioIndex' },
  '/(modules)/portfolio/edit': { stack: 'Modules', screen: 'PortfolioEdit' },
  '/(modules)/portfolio/piece-editor': { stack: 'Modules', screen: 'PortfolioPieceEditor' },
  '/(modules)/portfolio/public-preview': { stack: 'Modules', screen: 'PortfolioPublicPreview' },
  '/(modules)/profile/edit': { stack: 'Modules', screen: 'ProfileEdit' },

  '/(modules)/reputation': { stack: 'Modules', screen: 'ReputationIndex' },
  '/(modules)/reputation/badges': { stack: 'Modules', screen: 'ReputationBadges' },
  '/(modules)/reputation/verification': { stack: 'Modules', screen: 'ReputationVerification' },

  '/(modules)/finance': { stack: 'Modules', screen: 'FinanceIndex' },
  '/(modules)/finance/payouts': { stack: 'Modules', screen: 'FinancePayouts' },
  '/(modules)/finance/transactions': { stack: 'Modules', screen: 'FinanceTransactions' },
  '/(modules)/finance/tax': { stack: 'Modules', screen: 'FinanceTax' },
  '/(modules)/finance/invoice': { stack: 'Modules', screen: 'FinanceInvoice' },
  '/(modules)/finance/payment-methods': { stack: 'Modules', screen: 'FinancePaymentMethods' },

  '/(modules)/merch': { stack: 'Modules', screen: 'MerchStudio' },
  '/(modules)/merch/advanced': { stack: 'Modules', screen: 'MerchIndex' },
  '/(modules)/merch/build/identity': { stack: 'Modules', screen: 'MerchStudioStep1' },
  '/(modules)/merch/build/theme': { stack: 'Modules', screen: 'MerchStudioStep2' },
  '/(modules)/merch/build/banner': { stack: 'Modules', screen: 'MerchStudioStep3' },
  '/(modules)/merch/build/layout': { stack: 'Modules', screen: 'MerchStudioStep4' },
  '/(modules)/merch/build/products': { stack: 'Modules', screen: 'MerchStudioStep5' },
  '/(modules)/merch/build/mockups': { stack: 'Modules', screen: 'MerchStudioStep6' },
  '/(modules)/merch/build/review': { stack: 'Modules', screen: 'MerchStudioReview' },
  '/(modules)/merch/build/published': { stack: 'Modules', screen: 'MerchPublished' },
  '/(modules)/merch/preview': { stack: 'Modules', screen: 'MerchPreview' },
  '/(modules)/merch/store': { stack: 'Modules', screen: 'MerchStore' },
  '/(modules)/merch/create': { stack: 'Modules', screen: 'MerchCreate' },
  '/(modules)/merch/orders': { stack: 'Modules', screen: 'MerchOrders' },
  '/(modules)/merch/mockup': { stack: 'Modules', screen: 'MerchMockup' },
  '/(modules)/merch/analytics': { stack: 'Modules', screen: 'MerchAnalytics' },
  '/(modules)/merch/designers': { stack: 'Modules', screen: 'MerchDesigners' },

  '/(modules)/audience': { stack: 'Modules', screen: 'AudienceIndex' },
  '/(modules)/audience/connections': { stack: 'Modules', screen: 'AudienceConnections' },
  '/(modules)/audience/top-fans': { stack: 'Modules', screen: 'AudienceTopFans' },
  '/(modules)/audience/email-list': { stack: 'Modules', screen: 'AudienceEmailList' },
  '/(modules)/audience/landing-page': { stack: 'Modules', screen: 'AudienceLandingPage' },

  '/(modules)/analytics': { stack: 'Modules', screen: 'AnalyticsIndex' },
  '/(modules)/analytics/ai-insights': { stack: 'Modules', screen: 'AnalyticsAiInsights' },
  '/(modules)/analytics/content-performance': { stack: 'Modules', screen: 'AnalyticsContentPerformance' },
  '/(modules)/analytics/cross-platform': { stack: 'Modules', screen: 'AnalyticsCrossPlatform' },
  '/(modules)/analytics/earnings': { stack: 'Modules', screen: 'AnalyticsEarnings' },
  '/(modules)/analytics/audience': { stack: 'Modules', screen: 'AnalyticsAudience' },

  '/(modules)/tips': { stack: 'Modules', screen: 'TipsIndex' },
  '/(modules)/collab': { stack: 'Modules', screen: 'CollabIndex' },
  '/(modules)/collab/send': { stack: 'Modules', screen: 'CollabSend' },
  '/(modules)/collab/request': { stack: 'Modules', screen: 'CollabRequestDetail' },
  '/(modules)/profile/visibility': { stack: 'Modules', screen: 'ProfileVisibility' },
};

type DynamicEntry = {
  test: RegExp;
  paramKeys: string[];
  stack: StackName;
  screen: string;
};

const DYNAMIC: DynamicEntry[] = [
  { test: /^\/\(modules\)\/art\/([^/?]+)$/, paramKeys: ['id'], stack: 'Modules', screen: 'ArtDetail' },
  { test: /^\/\(modules\)\/jobs\/([^/?]+)$/, paramKeys: ['id'], stack: 'Modules', screen: 'JobDetail' },
  { test: /^\/\(modules\)\/inbox\/([^/?]+)$/, paramKeys: ['id'], stack: 'Modules', screen: 'InboxThread' },
  { test: /^\/\(modules\)\/learning\/([^/?]+)$/, paramKeys: ['course'], stack: 'Modules', screen: 'LearningCourse' },
  { test: /^\/\(modules\)\/profile\/post\/([^/?]+)$/, paramKeys: ['id'], stack: 'Modules', screen: 'ProfilePostsViewer' },
  { test: /^\/\(modules\)\/profile\/reel\/([^/?]+)$/, paramKeys: ['id'], stack: 'Modules', screen: 'ProfileReelViewer' },
  // /reel must precede the catch-all /:id so 'reel' isn't parsed as an id.
  { test: /^\/\(modules\)\/community\/challenges\/([^/?]+)\/reel$/, paramKeys: ['id'], stack: 'Modules', screen: 'ChallengeReel' },
  { test: /^\/\(modules\)\/community\/challenges\/([^/?]+)$/, paramKeys: ['id'], stack: 'Modules', screen: 'ChallengeDetail' },
];

// Anything that looks like a known dynamic-route prefix but doesn't match a
// static entry — used to filter out paths we'd otherwise mistake for dynamic.
const DYNAMIC_PREFIXES_TO_CHECK_LAST = [
  '/(modules)/jobs/apply',
  '/(modules)/community/challenges',
  '/(modules)/art/list',
  '/(modules)/art/commissions',
  '/(modules)/learning',
];

export function parsePath(href: string): ParseResult {
  const [pathOnly, query = ''] = href.split('?');
  const queryParams: Record<string, string> = {};
  if (query) {
    for (const pair of query.split('&')) {
      const [k, v = ''] = pair.split('=');
      if (k) queryParams[decodeURIComponent(k)] = decodeURIComponent(v);
    }
  }

  // Static lookup
  const staticHit = STATIC[pathOnly];
  if (staticHit) {
    const merged = { ...(staticHit.params || {}), ...queryParams };
    return {
      stack: staticHit.stack,
      screen: staticHit.screen,
      params: Object.keys(merged).length ? merged : undefined,
      crossStack: staticHit.crossStack,
    };
  }

  // Dynamic route lookup
  for (const dyn of DYNAMIC) {
    const m = pathOnly.match(dyn.test);
    if (m) {
      const params: Record<string, string> = { ...queryParams };
      dyn.paramKeys.forEach((k, i) => {
        params[k] = decodeURIComponent(m[i + 1]);
      });
      return { stack: dyn.stack, screen: dyn.screen, params };
    }
  }

  // Unknown path — return a sentinel so caller can no-op or warn.
  if (__DEV__) {
    console.warn('[router] unknown path:', href);
  }
  return { stack: 'Root', screen: 'Splash' };
}

// Inverse map for building React Navigation `linking` config from one source.
export const SCREEN_TO_PATH: Record<string, string> = (() => {
  const out: Record<string, string> = {};
  for (const [path, info] of Object.entries(STATIC)) {
    out[info.screen] = path;
  }
  for (const dyn of DYNAMIC) {
    out[dyn.screen] = dyn.test.source;
  }
  return out;
})();
