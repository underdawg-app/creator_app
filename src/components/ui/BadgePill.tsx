import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';

const tierColor: Record<string, string> = {
  NEW: staticPalette.mute,
  RISING: '#B07020',
  ESTABLISHED: '#A4A4A4',
  TRUSTED: staticPalette.acid,
  ELITE: staticPalette.electric,
};

type Props = {
  tier?: string;
  label?: string;
  accent?: string;
  inverse?: boolean;
};

export function BadgePill({ tier, label, accent, inverse }: Props) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const txt = label ?? tier ?? 'NEW';
  const fill = accent ?? (tier ? tierColor[tier] ?? palette.mute : palette.mute);
  const fg = inverse ? palette.bone : palette.ink;

  return (
    <View style={[styles.pill, { borderColor: fill }]}>
      <View style={[styles.dot, { backgroundColor: fill }]} />
      <RNText style={[styles.label, { color: fg }]} maxFontSizeMultiplier={1.15}>
        {txt}
      </RNText>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  label: { ...T.micro },
});
