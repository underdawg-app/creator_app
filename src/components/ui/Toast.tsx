import React, { useEffect } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { useStore } from '@/store';

// How long the toast sits before auto-dismissing if the user doesn't act.
const AUTO_DISMISS_MS = 4200;
// Swipe distance / velocity that triggers a dismiss instead of springing back.
const DISMISS_DISTANCE = 60;
const DISMISS_VELOCITY = 800;

export function ToastHost() {
  const toasts = useStore((s) => s.ui.toasts);
  const dismiss = useStore((s) => s.dismissToast);

  return (
    <SafeAreaView
      edges={['bottom']}
      pointerEvents="box-none"
      style={StyleSheet.absoluteFill as any}
    >
      <View style={styles.stack} pointerEvents="box-none">
        {toasts.map((t) => (
          <ToastItem
            key={t.id}
            message={t.message}
            tone={t.tone}
            onDone={() => dismiss(t.id)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

function ToastItem({
  message,
  tone,
  onDone,
}: {
  message: string;
  tone: 'default' | 'success' | 'warn';
  onDone: () => void;
}) {
  const palette = useThemedPalette();
  // p: 0 → 1 = fade/translate in on mount.
  const p = useSharedValue(0);
  // dragY: tracks the finger's downward delta; reset to 0 when the user lets
  // go without crossing the dismiss threshold.
  const dragY = useSharedValue(0);

  useEffect(() => {
    p.value = withTiming(1, { duration: 220, easing: Easing.out(Easing.cubic) });
    const auto = setTimeout(() => {
      // Auto-dismiss path — fade out in place.
      p.value = withTiming(0, { duration: 260, easing: Easing.out(Easing.cubic) });
      setTimeout(onDone, 280);
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(auto);
  }, []);

  const dismissNow = () => {
    // Slide the toast off the bottom of the screen, then unmount.
    p.value = withTiming(0, { duration: 180, easing: Easing.out(Easing.cubic) });
    dragY.value = withTiming(220, { duration: 180, easing: Easing.out(Easing.cubic) }, (finished) => {
      if (finished) runOnJS(onDone)();
    });
  };

  // Swipe-DOWN-to-dismiss. Only downward drags count; upward drags pin at 0
  // so the toast can't be pulled into the screen.
  const pan = Gesture.Pan()
    .activeOffsetY([-9999, 6])
    .onUpdate((e) => {
      dragY.value = Math.max(0, e.translationY);
    })
    .onEnd((e) => {
      if (e.translationY > DISMISS_DISTANCE || e.velocityY > DISMISS_VELOCITY) {
        runOnJS(dismissNow)();
      } else {
        dragY.value = withTiming(0, { duration: 200, easing: Easing.out(Easing.cubic) });
      }
    });

  const animStyle = useAnimatedStyle(() => {
    const enterOffset = (1 - p.value) * 40;
    return {
      opacity: p.value,
      transform: [{ translateY: enterOffset + dragY.value }],
    };
  });

  // Bg is always a theme-invariant color (acid/ember/ink), so pin the text
  // color to the contrast that reads on that bg regardless of scheme.
  const bg =
    tone === 'success'
      ? staticPalette.acid
      : tone === 'warn'
      ? staticPalette.ember
      : staticPalette.ink;
  const fg =
    tone === 'success' ? staticPalette.ink : staticPalette.bone;

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.toast, { backgroundColor: bg }, animStyle]}>
        <View style={[styles.dot, { backgroundColor: fg, opacity: 0.85 }]} />
        <RNText
          style={[styles.text, { color: fg }]}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.85}
          maxFontSizeMultiplier={1.2}
        >
          {message}
        </RNText>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    // Sit close to the bottom of the screen. SafeAreaView edges=['bottom']
    // already adds the home-indicator inset; this is the gap above that.
    paddingBottom: 16,
    gap: 10,
  },
  toast: {
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  text: { ...T.bodyMedium, flex: 1, letterSpacing: 0.2 },
});
