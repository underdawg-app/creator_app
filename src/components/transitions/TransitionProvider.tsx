import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  CategoryTransition,
  TRANSITION_MS,
  type TransitionKey,
} from './CategoryTransition';
import { palette as staticPalette } from '@/theme/colors';

type PlayOpts = {
  category: TransitionKey;
  color: string;
  /**
   * Called once, as soon as the overlay is fully covering the screen.
   * This is where you run router.push — the destination mounts behind the
   * still-visible overlay, then is revealed when the panel slides off.
   */
  onMid: () => void;
};

type Ctx = {
  play: (opts: PlayOpts) => void;
  isPlaying: boolean;
};

const TransitionContext = createContext<Ctx | null>(null);

/**
 * App-level provider. The CategoryTransition overlay is a sibling of the
 * screen stack — it stays visible across navigations, so calling
 * `router.push` inside `onMid` pushes the destination screen behind the
 * still-covering overlay. The exit phase then slides the overlay off to
 * reveal the new screen cleanly.
 */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    active: boolean;
    category: TransitionKey | null;
    color: string;
  }>({ active: false, category: null, color: staticPalette.acid });

  const midCbRef = useRef<(() => void) | null>(null);
  const midFiredRef = useRef(false);

  const play = useCallback((opts: PlayOpts) => {
    midCbRef.current = opts.onMid;
    midFiredRef.current = false;
    setState({ active: true, category: opts.category, color: opts.color });
  }, []);

  const ctxValue = useMemo(
    () => ({ play, isPlaying: state.active }),
    [play, state.active]
  );

  return (
    <TransitionContext.Provider value={ctxValue}>
      {children}
      <CategoryTransition
        active={state.active}
        category={state.category}
        color={state.color}
        onMid={() => {
          // Run only once per transition, no matter how it was triggered.
          if (midFiredRef.current) return;
          midFiredRef.current = true;
          midCbRef.current?.();
        }}
        onComplete={() => {
          // Safety net — if the mid timer somehow didn't fire, run the
          // navigation here so we never end the animation back on the
          // original page.
          if (!midFiredRef.current) {
            midFiredRef.current = true;
            midCbRef.current?.();
          }
          setState((s) => ({ ...s, active: false }));
          midCbRef.current = null;
        }}
      />
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error('useTransition must be used within <TransitionProvider>');
  }
  return ctx;
}

export { TRANSITION_MS };
