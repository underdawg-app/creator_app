import React from 'react';
import { Pressable } from 'react-native';
import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
  useRoute,
} from '@react-navigation/native';
import { parsePath, StackName } from './registry';

export const navigationRef = createNavigationContainerRef<any>();

function currentTopLevelStack(): string | null {
  if (!navigationRef.isReady()) return null;
  const state = navigationRef.getRootState();
  if (!state || state.index == null) return null;
  return state.routes[state.index].name;
}

function dispatchNavigate(href: string) {
  if (!navigationRef.isReady()) return;
  const { stack, screen, params } = parsePath(href);
  if (stack === 'Root') {
    navigationRef.dispatch(CommonActions.navigate({ name: screen, params }));
    return;
  }
  navigationRef.dispatch(
    CommonActions.navigate({ name: stack, params: { screen, params } }),
  );
}

function dispatchReplace(href: string) {
  if (!navigationRef.isReady()) return;
  const parsed = parsePath(href);
  const current = currentTopLevelStack();

  // Target is a top-level (Root-stack) screen like Tabs / Onboarding / Modules / Splash.
  if (parsed.stack === 'Root') {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: parsed.screen, params: parsed.params }],
      }),
    );
    return;
  }

  // Target is inside a nested navigator and we're already on that navigator —
  // do an in-stack replace so back history of the parent navigator is preserved.
  if (parsed.stack === current) {
    navigationRef.dispatch(StackActions.replace(parsed.screen, parsed.params));
    return;
  }

  // Cross-navigator replace — reset the root to the target stack with the
  // target screen as its only entry.
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: parsed.stack as StackName,
          state: {
            routes: [{ name: parsed.screen, params: parsed.params }],
          },
        },
      ],
    }),
  );
}

function dispatchBack() {
  if (!navigationRef.isReady()) return;
  if (navigationRef.canGoBack()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export const router = {
  push: (href: string) => dispatchNavigate(href),
  replace: (href: string) => dispatchReplace(href),
  back: () => dispatchBack(),
  navigate: (href: string) => dispatchNavigate(href),
  prefetch: (_href: string) => {},
  canGoBack: () => navigationRef.isReady() && navigationRef.canGoBack(),
  setParams: (params: Record<string, unknown>) => {
    if (!navigationRef.isReady()) return;
    navigationRef.dispatch(CommonActions.setParams(params));
  },
};

export function useRouter() {
  return router;
}

export function useLocalSearchParams<
  T extends Record<string, string> = Record<string, string>,
>(): T {
  const route = useRoute();
  return (route.params as T) || ({} as T);
}

type LinkProps = {
  href: string;
  replace?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
  asChild?: boolean;
  style?: any;
};
export function Link({ href, replace, children, onPress, style }: LinkProps) {
  return React.createElement(
    Pressable,
    {
      onPress: () => {
        onPress?.();
        if (replace) router.replace(href);
        else router.push(href);
      },
      style,
    },
    children,
  );
}

export const Stack: any = () => null;
Stack.Screen = () => null;
export const Tabs: any = () => null;
Tabs.Screen = () => null;
