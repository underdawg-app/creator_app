import React, { useEffect } from 'react';
import { StyleSheet, Text as RNText, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { useStore } from '@/store';

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
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = withSpring(1, { damping: 16, stiffness: 220 });
    const out = setTimeout(() => {
      p.value = withTiming(0, { duration: 260, easing: Easing.out(Easing.cubic) }, (done) => {
        if (done) {
          // runOnJS-free: simple setTimeout already on JS thread
        }
      });
      setTimeout(onDone, 320);
    }, 4200);
    return () => clearTimeout(out);
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ translateY: (1 - p.value) * 40 }],
  }));

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
  );
}

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 96,
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
