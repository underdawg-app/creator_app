import React from 'react';
import { StyleSheet, View, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { Ticker } from './Ticker';

type Props = {
  label: string;
  value: number;
  delta?: number;
  accent?: string;
  inverse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  prefix?: string;
  suffix?: string;
};

export function MetricCard({
  label,
  value,
  delta,
  accent = staticPalette.acid,
  inverse,
  size = 'md',
  prefix,
  suffix,
}: Props) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const fg = inverse ? palette.bone : palette.ink;
  const bg = inverse ? palette.ink : palette.paper;
  const border = inverse ? palette.lineDark : palette.line;

  const fontSize = size === 'lg' ? 48 : size === 'md' ? 34 : 24;
  const lh = fontSize * 0.98;

  return (
    <View style={[styles.card, { backgroundColor: bg, borderColor: border }]}>
      <RNText
        style={[styles.label, { color: fg, opacity: 0.65 }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
        maxFontSizeMultiplier={1.1}
      >
        {label}
      </RNText>
      <View style={styles.valueRow}>
        {prefix ? (
          <RNText
            style={[styles.prefix, { color: fg }]}
            maxFontSizeMultiplier={1.1}
          >
            {prefix}
          </RNText>
        ) : null}
        <Ticker
          value={value}
          style={{
            fontFamily: T.numeric.fontFamily,
            color: fg,
            fontSize,
            lineHeight: lh,
            letterSpacing: -1.2,
          }}
        />
        {suffix ? (
          <RNText
            style={[styles.suffix, { color: fg }]}
            maxFontSizeMultiplier={1.1}
          >
            {suffix}
          </RNText>
        ) : null}
      </View>
      {typeof delta === 'number' ? (
        <View style={styles.deltaRow}>
          <View style={[styles.dot, { backgroundColor: delta >= 0 ? accent : staticPalette.ember }]} />
          <RNText
            style={[styles.delta, { color: delta >= 0 ? fg : staticPalette.ember }]}
            maxFontSizeMultiplier={1.1}
          >
            {delta >= 0 ? '+' : ''}
            {delta.toFixed(1)}%
          </RNText>
        </View>
      ) : null}
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    minHeight: 120,
    justifyContent: 'space-between',
    gap: 10,
  },
  label: { ...T.label },
  valueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  prefix: { ...T.title3, marginBottom: 2 },
  suffix: { ...T.title3, marginBottom: 2 },
  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  delta: { ...T.label, opacity: 0.9 },
});
