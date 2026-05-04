import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Ticker } from '@/components/ui/Ticker';
import { useStore } from '@/store';

export default function CrossPlatform() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const platforms = useStore((s) => s.platforms);
  const connected = platforms.filter((p) => p.connected);
  const total = connected.reduce((a, p) => a + p.followers, 0) || 1;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ANALYTICS" title="CROSS-PLATFORM" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Your rented audience, weighted by engagement. Every dollar of reach has a different cost per platform.
      </RNText>

      <Section eyebrow="AUDIENCE DISTRIBUTION">
        <View style={styles.bar}>
          {connected.map((p) => (
            <View
              key={p.key}
              style={{
                flex: p.followers / total,
                backgroundColor: p.accent,
                height: '100%',
              }}
            />
          ))}
        </View>
        <View style={{ gap: 12, marginTop: 16 }}>
          {connected.map((p) => (
            <View key={p.key} style={styles.legend}>
              <View style={[styles.dot, { backgroundColor: p.accent }]} />
              <RNText
                style={styles.legendName}
                numberOfLines={1}
                maxFontSizeMultiplier={1.15}
              >
                {p.name}
              </RNText>
              <Ticker value={p.followers} fontSize={18} color={palette.ink} />
              <RNText style={styles.legendShare}>
                {Math.round((p.followers / total) * 100)}%
              </RNText>
            </View>
          ))}
        </View>
      </Section>

      <Section eyebrow="PLATFORM HEALTH">
        {connected.map((p) => (
          <View key={p.key} style={styles.healthRow}>
            <View style={{ flex: 1 }}>
              <RNText style={styles.healthName} maxFontSizeMultiplier={1.15}>
                {p.name}
              </RNText>
              <RNText style={styles.healthMeta}>
                {p.handle} · {p.followers.toLocaleString()} followers
              </RNText>
            </View>
            <View style={[styles.deltaPill, { backgroundColor: p.accent }]}>
              <RNText style={styles.deltaText}>+{p.growth.toFixed(1)}%</RNText>
            </View>
          </View>
        ))}
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 4, maxWidth: 360 },
  bar: {
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: palette.line,
    marginTop: 6,
  },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  legendName: { flex: 1, ...T.bodyMedium, color: palette.ink },
  legendShare: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink, opacity: 0.6, width: 40, textAlign: 'right' },

  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 12,
  },
  healthName: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, letterSpacing: -0.4 },
  healthMeta: { ...T.small, color: palette.ink, opacity: 0.62, marginTop: 3 },
  deltaPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  deltaText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.2, color: staticPalette.ink },
});
