import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Ticker } from '@/components/ui/Ticker';
import { analyticsSeed } from '@/data/mock';

export default function ContentPerformance() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ANALYTICS" title="CONTENT" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Each post, ranked by engagement rate. What worked. What to do more of.
      </RNText>

      <Section eyebrow="TOP CONTENT / LAST 30 DAYS">
        <View style={{ gap: 14, marginTop: 4 }}>
          {analyticsSeed.topContent.map((c, i) => (
            <View key={c.id} style={styles.row}>
              <RNText style={styles.rank} maxFontSizeMultiplier={1.1}>
                {String(i + 1).padStart(2, '0')}
              </RNText>
              <View style={{ flex: 1 }}>
                <RNText
                  style={styles.title}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.75}
                  maxFontSizeMultiplier={1.15}
                >
                  {c.title}
                </RNText>
                <View style={styles.metricsRow}>
                  <View style={styles.metricCol}>
                    <Ticker value={c.views} fontSize={18} color={palette.ink} />
                    <RNText style={styles.metricLabel}>VIEWS</RNText>
                  </View>
                  <View style={styles.metricCol}>
                    <Ticker value={c.likes} fontSize={18} color={palette.ink} />
                    <RNText style={styles.metricLabel}>LIKES</RNText>
                  </View>
                  <View style={styles.metricCol}>
                    <RNText style={styles.rate} maxFontSizeMultiplier={1.1}>
                      {c.rate}%
                    </RNText>
                    <RNText style={styles.metricLabel}>RATE</RNText>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </Section>

      <Section eyebrow="AUDIENCE / AGE">
        <View style={{ gap: 10, marginTop: 6 }}>
          {analyticsSeed.audience.ages.map((a) => (
            <View key={a.label} style={styles.distRow}>
              <RNText style={styles.distLabel} maxFontSizeMultiplier={1.15}>
                {a.label}
              </RNText>
              <View style={styles.distTrack}>
                <View style={[styles.distFill, { width: `${a.value}%` }]} />
              </View>
              <RNText style={styles.distPct}>{a.value}%</RNText>
            </View>
          ))}
        </View>
      </Section>

      <Section eyebrow="AUDIENCE / LOCATIONS">
        <View style={{ gap: 10, marginTop: 6 }}>
          {analyticsSeed.audience.locations.map((a) => (
            <View key={a.label} style={styles.distRow}>
              <RNText style={styles.distLabel} maxFontSizeMultiplier={1.15}>
                {a.label}
              </RNText>
              <View style={styles.distTrack}>
                <View
                  style={[styles.distFill, { width: `${a.value * 4}%`, backgroundColor: palette.electric }]}
                />
              </View>
              <RNText style={styles.distPct}>{a.value}%</RNText>
            </View>
          ))}
        </View>
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 4, maxWidth: 360 },
  row: { flexDirection: 'row', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: palette.line },
  rank: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    color: palette.ink,
    opacity: 0.35,
    width: 40,
  },
  title: { fontFamily: fonts.displayBold, fontSize: 20, color: palette.ink, letterSpacing: -0.5 },
  metricsRow: { flexDirection: 'row', gap: 20, marginTop: 10 },
  metricCol: { gap: 4 },
  metricLabel: { ...T.micro, color: palette.ink, opacity: 0.55 },
  rate: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.electric },
  distRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  distLabel: { ...T.label, color: palette.ink, width: 80 },
  distTrack: { flex: 1, height: 10, backgroundColor: palette.line, borderRadius: 5, overflow: 'hidden' },
  distFill: { height: '100%', backgroundColor: palette.acid, borderRadius: 5 },
  distPct: { fontFamily: fonts.bodyBold, fontSize: 12, color: palette.ink, width: 40, textAlign: 'right' },
});
