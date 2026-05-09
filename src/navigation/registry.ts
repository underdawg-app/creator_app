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
  '/(onboarding)/complete': { stack: 'Onboarding', screen: 'Complete' },

  '/(modules)/camera': { stack: 'Modules', screen: 'Camera' },

  '/(modules)/settings': { stack: 'Modules', screen: 'SettingsIndex' },
  '/(modules)/settings/account': { stack: 'Modules', screen: 'SettingsAccount' },
  '/(modules)/settings/notifications': { stack: 'Modules', screen: 'SettingsNotifications' },
  '/(modules)/settings/privacy': { stack: 'Modules', screen: 'SettingsPrivacy' },
  '/(modules)/settings/security': { stack: 'Modules', screen: 'SettingsSecurity' },

  '/(modules)/studio': { stack: 'Modules', screen: 'StudioIndex' },
  '/(modules)/studio/drafts': { stack: 'Modules', screen: 'StudioDrafts' },
  '/(modules)/studio/schedule': { stack: 'Modules', screen: 'StudioSchedule' },
  '/(modules)/studio/image-composer': { stack: 'Modules', screen: 'StudioImageComposer' },
  '/(modules)/studio/text-composer': { stack: 'Modules', screen: 'StudioTextComposer' },
  '/(modules)/studio/video-composer': { stack: 'Modules', screen: 'StudioVideoComposer' },

  '/(modules)/art': { stack: 'Modules', screen: 'ArtIndex' },
  '/(modules)/art/list': { stack: 'Modules', screen: 'ArtList' },
  '/(modules)/art/commissions': { stack: 'Modules', screen: 'ArtCommissions' },

  '/(modules)/learning': { stack: 'Modules', screen: 'LearningIndex' },

  '/(modules)/jobs': { stack: 'Modules', screen: 'JobsIndex' },
  '/(modules)/jobs/active-deals': { stack: 'Modules', screen: 'JobsActiveDeals' },
  '/(modules)/jobs/rate-card': { stack: 'Modules', screen: 'JobsRateCard' },
  '/(modules)/jobs/apply': { stack: 'Modules', screen: 'JobsApply' },

  '/(modules)/community': { stack: 'Modules', screen: 'CommunityIndex' },
  '/(modules)/community/events': { stack: 'Modules', screen: 'CommunityEvents' },
  '/(modules)/community/groups': { stack: 'Modules', screen: 'CommunityGroups' },
  '/(modules)/community/challenges': { stack: 'Modules', screen: 'ChallengesIndex' },

  '/(modules)/portfolio': { stack: 'Modules', screen: 'PortfolioIndex' },
  '/(modules)/portfolio/edit': { stack: 'Modules', screen: 'PortfolioEdit' },
  '/(modules)/portfolio/piece-editor': { stack: 'Modules', screen: 'PortfolioPieceEditor' },
  '/(modules)/portfolio/public-preview': { stack: 'Modules', screen: 'PortfolioPublicPreview' },

  '/(modules)/reputation': { stack: 'Modules', screen: 'ReputationIndex' },
  '/(modules)/reputation/badges': { stack: 'Modules', screen: 'ReputationBadges' },
  '/(modules)/reputation/verification': { stack: 'Modules', screen: 'ReputationVerification' },

  '/(modules)/finance': { stack: 'Modules', screen: 'FinanceIndex' },
  '/(modules)/finance/payouts': { stack: 'Modules', screen: 'FinancePayouts' },
  '/(modules)/finance/transactions': { stack: 'Modules', screen: 'FinanceTransactions' },
  '/(modules)/finance/tax': { stack: 'Modules', screen: 'FinanceTax' },
  '/(modules)/finance/invoice': { stack: 'Modules', screen: 'FinanceInvoice' },

  '/(modules)/merch': { stack: 'Modules', screen: 'MerchIndex' },
  '/(modules)/merch/store': { stack: 'Modules', screen: 'MerchStore' },
  '/(modules)/merch/create': { stack: 'Modules', screen: 'MerchCreate' },
  '/(modules)/merch/orders': { stack: 'Modules', screen: 'MerchOrders' },

  '/(modules)/audience': { stack: 'Modules', screen: 'AudienceIndex' },
  '/(modules)/audience/connections': { stack: 'Modules', screen: 'AudienceConnections' },
  '/(modules)/audience/top-fans': { stack: 'Modules', screen: 'AudienceTopFans' },
  '/(modules)/audience/email-list': { stack: 'Modules', screen: 'AudienceEmailList' },
  '/(modules)/audience/landing-page': { stack: 'Modules', screen: 'AudienceLandingPage' },

  '/(modules)/analytics': { stack: 'Modules', screen: 'AnalyticsIndex' },
  '/(modules)/analytics/ai-insights': { stack: 'Modules', screen: 'AnalyticsAiInsights' },
  '/(modules)/analytics/content-performance': { stack: 'Modules', screen: 'AnalyticsContentPerformance' },
  '/(modules)/analytics/cross-platform': { stack: 'Modules', screen: 'AnalyticsCrossPlatform' },
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
