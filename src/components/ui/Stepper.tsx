import React, { useEffect } from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';

type Props = {
  steps: string[];
  current: number;
  accent?: string;
  inverse?: boolean;
};

export function Stepper({ steps, current, accent = staticPalette.acid, inverse }: Props) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const fg = inverse ? palette.bone : palette.ink;

  return (
    <View style={styles.wrap}>
      {steps.map((s, i) => (
        <Dot key={s} label={s} index={i} current={current} accent={accent} fg={fg} />
      ))}
    </View>
  );
}

function Dot({
  label,
  index,
  current,
  accent,
  fg,
}: {
  label: string;
  index: number;
  current: number;
  accent: string;
  fg: string;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const done = index < current;
  const active = index === current;
  const p = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    p.value = withSpring(active ? 1 : 0, { damping: 16, stiffness: 260 });
  }, [active]);

  const bar = useAnimatedStyle(() => ({
    backgroundColor: done || active ? accent : 'transparent',
    borderColor: done || active ? accent : fg,
    transform: [{ scaleY: 1 + p.value * 0.1 }],
  }));

  return (
    <View style={styles.col}>
      <Animated.View style={[styles.bar, bar]} />
      <RNText
        style={[
          styles.label,
          {
            color: fg,
            opacity: done || active ? 0.95 : 0.4,
          },
        ]}
        numberOfLines={1}
        maxFontSizeMultiplier={1.1}
      >
        {label}
      </RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    marginBottom: 6,
  },
  col: { flex: 1, gap: 6 },
  bar: { height: 3, borderRadius: 2, borderWidth: 1 },
  label: { ...T.micro, letterSpacing: 1.4 },
});
