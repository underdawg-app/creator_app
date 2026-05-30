import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { analyticsSeed } from '@/data/mock';
import { useStore } from '@/store';

type Range = '7D' | '30D' | '90D';
const RANGES: Range[] = ['7D', '30D', '90D'];

// Each range scales the base totals + swaps which growth delta is shown,
// so flipping the tabs produces a visible change.
const FACTOR: Record<Range, number> = { '7D': 0.34, '30D': 1, '90D': 2.7 };

export default function AnalyticsIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [range, setRange] = useState<Range>('30D');
  const t = analyticsSeed.totals;

  const m = useMemo(() => {
    const f = FACTOR[range];
    return {
      reach: Math.round(t.reach * f),
      engagement: Math.round(t.engagement * f),
      rate: Math.round(t.engagementRate * (range === '7D' ? 0.92 : range === '90D' ? 1.14 : 1) * 10) / 10,
      views: Math.round(t.profileViews * f),
      delta: range === '7D' ? t.growth7d : range === '90D' ? t.growth30d * 2.1 : t.growth30d,
    };
  }, [range, t]);

  const deltaRounded = Math.round(m.delta * 10) / 10;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="INSIGHTS" title="ANALYTICS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        the numbers.
      </RNText>
      <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
        Cross-platform performance, summarized.
      </RNText>

      {/* Time-range tabs */}
      <View style={styles.rangeRow}>
        {RANGES.map((r) => (
          <Chip
            key={r}
            label={r}
            size="sm"
            active={range === r}
            accent={palette.ink}
            onPress={() => setRange(r)}
          />
        ))}
        <View style={{ flex: 1 }} />
        <RNText style={styles.rangeNote}>last {range.toLowerCase()}</RNText>
      </View>

      {/* Key metrics */}
      <Section eyebrow="KEY METRICS">
        <View style={styles.grid}>
          <View style={{ flex: 1 }}>
            <MetricCard label="REACH" value={m.reach} delta={deltaRounded} size="md" />
          </View>
          <View style={{ flex: 1 }}>
            <MetricCard label="ENGAGEMENT" value={m.engagement} delta={deltaRounded} size="md" accent={palette.electric} />
          </View>
        </View>
        <View style={styles.grid}>
          <View style={{ flex: 1 }}>
            <MetricCard label="ENG. RATE" value={m.rate} suffix="%" size="md" accent={palette.blush} />
          </View>
          <View style={{ flex: 1 }}>
            <MetricCard label="PROFILE VIEWS" value={m.views} delta={deltaRounded} size="md" accent={palette.ember} />
          </View>
        </View>
      </Section>

      {/* Trend sparkline */}
      <Section eyebrow="TREND · 12 POINTS">
        <View style={styles.trendCard}>
          <Sparkline />
          <View style={styles.trendFoot}>
            <RNText style={styles.trendFootText}>Engagement rate over time</RNText>
            <RNText style={styles.trendDelta}>+{deltaRounded}%</RNText>
          </View>
        </View>
      </Section>

      {/* Deep links */}
      <Section eyebrow="GO DEEPER">
        <ListCell
          icon="sparkles-outline"
          title="AI insights"
          subtitle="What to post next, and when"
          onPress={() => router.push('/(modules)/analytics/ai-insights')}
        />
        <ListCell
          icon="bar-chart-outline"
          title="Content performance"
          subtitle="Every post, ranked by impact"
          onPress={() => router.push('/(modules)/analytics/content-performance')}
        />
        <ListCell
          icon="globe-outline"
          title="Cross-platform"
          subtitle="One view across every channel"
          onPress={() => router.push('/(modules)/analytics/cross-platform')}
        />
        <ListCell
          icon="trending-up-outline"
          title="Earnings"
          subtitle="Revenue tied to reach"
          onPress={() => router.push('/(modules)/analytics/earnings')}
        />
        <ListCell
          icon="people-outline"
          title="Audience"
          subtitle="Ages, places, devices"
          onPress={() => router.push('/(modules)/analytics/audience')}
        />
      </Section>

      <Tap onPress={() => toast('Report exported.', 'success')} style={styles.exportRow} burstColor={palette.ink}>
        <Ionicons name="cloud-upload-outline" size={16} color={palette.ink} />
        <RNText style={styles.exportText}>EXPORT REPORT</RNText>
      </Tap>
    </ScreenFrame>
  );
}

function Sparkline() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const trend = analyticsSeed.trend;
  const max = Math.max(...trend);

  return (
    <View style={styles.sparkRow}>
      {trend.map((v, i) => {
        const last = i === trend.length - 1;
        return (
          <Pressable key={i} style={styles.sparkCol} onPress={() => {}}>
            <View
              style={[
                styles.spark,
                {
                  height: 14 + (v / max) * 64,
                  backgroundColor: last ? palette.acid : palette.ink,
                  opacity: last ? 1 : 0.5,
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    title: {
      fontFamily: fonts.displayBold,
      fontSize: 44,
      lineHeight: 42,
      letterSpacing: -2,
      color: palette.ink,
      marginTop: 4,
    },
    sub: { ...T.body, color: palette.ink, opacity: 0.7, marginTop: 12, maxWidth: 340 },

    rangeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginTop: 20,
    },
    rangeNote: { ...T.label, color: palette.inkMuted },

    grid: { flexDirection: 'row', gap: 10, marginTop: 10 },

    trendCard: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 14,
    },
    sparkRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 5, height: 80 },
    sparkCol: { flex: 1, justifyContent: 'flex-end' },
    spark: { borderRadius: 3 },
    trendFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    trendFootText: { ...T.small, color: palette.inkMuted },
    trendDelta: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },

    exportRow: {
      marginTop: 22,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    exportText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
