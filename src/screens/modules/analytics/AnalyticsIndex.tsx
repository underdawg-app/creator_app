import React from 'react';
import { View, StyleSheet, Text as RNText, Dimensions } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { analyticsSeed } from '@/data/mock';

const { width } = Dimensions.get('window');

export default function AnalyticsHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const t = analyticsSeed.totals;

  return (
    <ScreenFrame header={<ModuleHeader title="ANALYTICS" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        know the <RNText style={styles.italic}>room</RNText>{'\n'}before you walk in.
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Cross-platform metrics, AI-picked windows, and a plain-language read on what to do next.
      </RNText>

      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="TOTAL REACH" value={t.reach} delta={t.growth30d} size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="ENGAGEMENT" value={t.engagement} delta={t.growth7d} size="md" accent={palette.electric} />
        </View>
      </View>
      <View style={styles.metricsRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="ENGAGEMENT RATE" value={Math.round(t.engagementRate * 10) / 10} suffix="%" size="md" accent={palette.blush} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="PROFILE VIEWS" value={t.profileViews} delta={6.4} size="md" accent={palette.ember} />
        </View>
      </View>

      <Section eyebrow="TREND · LAST 12 DAYS">
        <Sparkline />
      </Section>

      <Section eyebrow="GO DEEP">
        <ListCell
          icon="pulse-outline"
          title="Cross-platform analytics"
          subtitle="Unified view across all connected platforms"
          onPress={() => router.push('/(modules)/analytics/cross-platform')}
        />
        <ListCell
          icon="stats-chart-outline"
          title="Content performance"
          subtitle="Every post, ranked by impact"
          onPress={() => router.push('/(modules)/analytics/content-performance')}
        />
        <ListCell
          icon="sparkles-outline"
          title="AI insights"
          subtitle="Recommendations, trends, timing"
          onPress={() => router.push('/(modules)/analytics/ai-insights')}
        />
      </Section>
    </ScreenFrame>
  );
}

function Sparkline() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const trend = analyticsSeed.trend;
  const max = Math.max(...trend);
  const W = width - 48;
  const bar = (W - trend.length * 4) / trend.length;

  return (
    <View style={[styles.sparkBox, { width: W }]}>
      {trend.map((v, i) => (
        <View
          key={i}
          style={{
            width: bar,
            height: (v / max) * 80,
            backgroundColor: i === trend.length - 1 ? palette.acid : palette.ink,
            borderRadius: 3,
          }}
        />
      ))}
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 50,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  body: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 14, maxWidth: 360 },
  metricsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
  sparkBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 90,
  },
});
