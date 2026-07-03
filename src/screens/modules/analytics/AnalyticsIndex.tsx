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

// Compact number formatting: 28_420 -> "28.4K", 1_284_000 -> "1.3M".
function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${Math.round(n)}`;
}

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
  const factor = FACTOR[range];
  const up = deltaRounded >= 0;

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

      {/* Hero — headline reach with growth pill */}
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <RNText style={styles.heroLabel}>TOTAL REACH</RNText>
          <View style={[styles.deltaPill, { backgroundColor: up ? palette.acid : palette.ember }]}>
            <Ionicons
              name={up ? 'arrow-up' : 'arrow-down'}
              size={11}
              color={palette.ink}
            />
            <RNText style={styles.deltaPillText}>{Math.abs(deltaRounded)}%</RNText>
          </View>
        </View>
        <RNText style={styles.heroValue} maxFontSizeMultiplier={1.05}>
          {fmt(m.reach)}
        </RNText>
        <View style={styles.heroFootRow}>
          <HeroStat label="ENGAGEMENT" value={fmt(m.engagement)} palette={palette} styles={styles} />
          <View style={styles.heroDivider} />
          <HeroStat label="ENG. RATE" value={`${m.rate}%`} palette={palette} styles={styles} />
          <View style={styles.heroDivider} />
          <HeroStat label="PROFILE VIEWS" value={fmt(m.views)} palette={palette} styles={styles} />
        </View>
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

      {/* Trend chart */}
      <Section eyebrow="ENGAGEMENT RATE · 12 POINTS">
        <View style={styles.trendCard}>
          <TrendChart />
          <View style={styles.trendFoot}>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: palette.acid }]} />
              <RNText style={styles.trendFootText}>Latest peak</RNText>
            </View>
            <RNText style={styles.trendDelta}>{up ? '+' : ''}{deltaRounded}% vs prior</RNText>
          </View>
        </View>
      </Section>

      {/* Top content */}
      <Section
        eyebrow="TOP CONTENT"
        action={{ label: 'ALL', onPress: () => router.push('/(modules)/analytics/content-performance') }}
      >
        <View style={styles.panel}>
          {analyticsSeed.topContent.map((c, i) => {
            const views = Math.round(c.views * factor);
            const max = Math.round(analyticsSeed.topContent[0].views * factor);
            return (
              <Pressable
                key={c.id}
                style={[styles.contentRow, i === 0 && styles.contentRowFirst]}
                onPress={() => router.push('/(modules)/analytics/content-performance')}
              >
                <RNText style={styles.rank}>{i + 1}</RNText>
                <View style={styles.contentBody}>
                  <RNText style={styles.contentTitle} numberOfLines={1}>{c.title}</RNText>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${(views / max) * 100}%` }]} />
                  </View>
                  <View style={styles.contentMeta}>
                    <RNText style={styles.metaText}>{fmt(views)} views</RNText>
                    <RNText style={styles.metaDot}>·</RNText>
                    <RNText style={styles.metaText}>{fmt(Math.round(c.likes * factor))} likes</RNText>
                  </View>
                </View>
                <View style={styles.ratePill}>
                  <RNText style={styles.rateValue}>{c.rate}%</RNText>
                  <RNText style={styles.rateLabel}>ENG</RNText>
                </View>
              </Pressable>
            );
          })}
        </View>
      </Section>

      {/* Audience snapshot */}
      <Section
        eyebrow="AUDIENCE"
        action={{ label: 'DETAILS', onPress: () => router.push('/(modules)/analytics/audience') }}
      >
        <View style={styles.panel}>
          <RNText style={styles.panelHead}>AGE</RNText>
          {analyticsSeed.audience.ages.map((a) => (
            <DistRow key={a.label} label={a.label} value={a.value} accent={palette.ink} styles={styles} />
          ))}

          <View style={styles.panelSplit} />

          <RNText style={styles.panelHead}>TOP LOCATIONS</RNText>
          <View style={styles.locWrap}>
            {analyticsSeed.audience.locations.map((l) => (
              <View key={l.label} style={styles.locChip}>
                <RNText style={styles.locName}>{l.label}</RNText>
                <RNText style={styles.locValue}>{l.value}%</RNText>
              </View>
            ))}
          </View>

          <View style={styles.panelSplit} />

          <RNText style={styles.panelHead}>DEVICE</RNText>
          <View style={styles.deviceBar}>
            {analyticsSeed.audience.devices.map((d, i) => (
              <View
                key={d.label}
                style={[
                  styles.deviceSeg,
                  {
                    flex: d.value,
                    backgroundColor: i === 0 ? palette.ink : palette.blush,
                    borderTopLeftRadius: i === 0 ? 8 : 0,
                    borderBottomLeftRadius: i === 0 ? 8 : 0,
                    borderTopRightRadius: i === 0 ? 0 : 8,
                    borderBottomRightRadius: i === 0 ? 0 : 8,
                  },
                ]}
              >
                <RNText
                  style={[styles.deviceLabel, { color: i === 0 ? palette.bone : palette.ink }]}
                  numberOfLines={1}
                >
                  {d.label} {d.value}%
                </RNText>
              </View>
            ))}
          </View>
        </View>
      </Section>

      {/* AI insight highlight */}
      <Section
        eyebrow="AI INSIGHT"
        action={{ label: 'MORE', onPress: () => router.push('/(modules)/analytics/ai-insights') }}
      >
        <Pressable
          style={styles.aiCard}
          onPress={() => router.push('/(modules)/analytics/ai-insights')}
        >
          <View style={styles.aiTop}>
            <View style={[styles.aiKind, { backgroundColor: analyticsSeed.ai[0].accent }]}>
              <Ionicons name="sparkles" size={11} color={palette.bone} />
              <RNText style={styles.aiKindText}>{analyticsSeed.ai[0].kind}</RNText>
            </View>
            <Ionicons name="arrow-forward" size={16} color={palette.inkMuted} />
          </View>
          <RNText style={styles.aiTitle}>{analyticsSeed.ai[0].title}</RNText>
          <RNText style={styles.aiBody}>{analyticsSeed.ai[0].body}</RNText>
        </Pressable>
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

function HeroStat({
  label,
  value,
  styles,
}: {
  label: string;
  value: string;
  palette: typeof staticPalette;
  styles: ReturnType<typeof makeStyles>;
}) {
  return (
    <View style={styles.heroStat}>
      <RNText style={styles.heroStatValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        {value}
      </RNText>
      <RNText style={styles.heroStatLabel} numberOfLines={1}>{label}</RNText>
    </View>
  );
}

function DistRow({
  label,
  value,
  accent,
  styles,
}: {
  label: string;
  value: number;
  accent: string;
  styles: ReturnType<typeof makeStyles>;
}) {
  return (
    <View style={styles.distRow}>
      <RNText style={styles.distLabel}>{label}</RNText>
      <View style={styles.distTrack}>
        <View style={[styles.distFill, { width: `${value}%`, backgroundColor: accent }]} />
      </View>
      <RNText style={styles.distValue}>{value}%</RNText>
    </View>
  );
}

function TrendChart() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const trend = analyticsSeed.trend;
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const avg = trend.reduce((s, v) => s + v, 0) / trend.length;

  return (
    <View>
      <View style={styles.chartArea}>
        {/* baseline gridlines */}
        <View style={styles.gridline} />
        <View style={[styles.gridline, { top: '50%' }]} />
        {/* average marker */}
        <View
          style={[
            styles.avgLine,
            { bottom: `${((avg - min) / (max - min || 1)) * 70 + 12}%` },
          ]}
        />
        <View style={styles.sparkRow}>
          {trend.map((v, i) => {
            const last = i === trend.length - 1;
            return (
              <Pressable key={i} style={styles.sparkCol} onPress={() => {}}>
                <View
                  style={[
                    styles.spark,
                    {
                      height: 14 + ((v - min) / (max - min || 1)) * 70,
                      backgroundColor: last ? palette.acid : palette.ink,
                      opacity: last ? 1 : 0.45,
                    },
                  ]}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={styles.axisRow}>
        <RNText style={styles.axisText}>low {min}%</RNText>
        <RNText style={styles.axisText}>avg {avg.toFixed(1)}%</RNText>
        <RNText style={styles.axisText}>peak {max}%</RNText>
      </View>
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

    // Hero
    hero: {
      marginTop: 18,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: palette.lineDark,
      backgroundColor: palette.ink,
      padding: 20,
    },
    heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    heroLabel: { ...T.label, color: palette.bone, opacity: 0.6, letterSpacing: 2 },
    deltaPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      paddingHorizontal: 9,
      height: 24,
      borderRadius: 12,
    },
    deltaPillText: { fontFamily: fonts.bodyBold, fontSize: 12, color: palette.ink },
    heroValue: {
      fontFamily: fonts.displayBold,
      fontSize: 56,
      lineHeight: 58,
      letterSpacing: -2.5,
      color: palette.bone,
      marginTop: 6,
    },
    heroFootRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: palette.lineDark,
    },
    heroDivider: { width: 1, height: 28, backgroundColor: palette.lineDark },
    heroStat: { flex: 1, alignItems: 'center', gap: 3 },
    heroStatValue: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.bone, letterSpacing: -0.5 },
    heroStatLabel: { ...T.micro, color: palette.bone, opacity: 0.55, letterSpacing: 1 },

    grid: { flexDirection: 'row', gap: 10, marginTop: 10 },

    // Trend
    trendCard: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 12,
    },
    chartArea: { position: 'relative', height: 96, justifyContent: 'flex-end' },
    gridline: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 1,
      backgroundColor: palette.line,
    },
    avgLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: palette.electric,
      opacity: 0.5,
    },
    sparkRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 5, height: 96 },
    sparkCol: { flex: 1, justifyContent: 'flex-end' },
    spark: { borderRadius: 3 },
    axisRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 2,
    },
    axisText: { ...T.micro, color: palette.inkMuted, letterSpacing: 0.5 },
    trendFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    legendRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    trendFootText: { ...T.small, color: palette.inkMuted },
    trendDelta: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },

    // Generic panel
    panel: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      marginTop: 2,
    },
    panelHead: { ...T.label, color: palette.inkMuted, letterSpacing: 1.6, marginBottom: 10 },
    panelSplit: { height: 1, backgroundColor: palette.line, marginVertical: 16 },

    // Top content
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingTop: 14,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    contentRowFirst: { paddingTop: 0, borderTopWidth: 0 },
    rank: {
      fontFamily: fonts.displayBold,
      fontSize: 20,
      color: palette.ink,
      opacity: 0.35,
      width: 22,
      textAlign: 'center',
    },
    contentBody: { flex: 1, gap: 6 },
    contentTitle: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink, letterSpacing: 0.3 },
    barTrack: { height: 5, borderRadius: 3, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    barFill: { height: 5, borderRadius: 3, backgroundColor: palette.ink },
    contentMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metaText: { ...T.micro, color: palette.inkMuted },
    metaDot: { ...T.micro, color: palette.inkMuted },
    ratePill: { alignItems: 'center', minWidth: 44 },
    rateValue: { fontFamily: fonts.bodyBold, fontSize: 15, color: palette.ink },
    rateLabel: { ...T.micro, color: palette.inkMuted, letterSpacing: 1 },

    // Distribution rows
    distRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 9 },
    distLabel: { ...T.small, color: palette.ink, width: 48 },
    distTrack: { flex: 1, height: 8, borderRadius: 4, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    distFill: { height: 8, borderRadius: 4 },
    distValue: { fontFamily: fonts.bodyBold, fontSize: 12, color: palette.ink, width: 36, textAlign: 'right' },

    // Locations
    locWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    locChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      height: 32,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    locName: { fontFamily: fonts.bodyBold, fontSize: 12, color: palette.ink, letterSpacing: 0.5 },
    locValue: { ...T.small, color: palette.inkMuted },

    // Device split bar
    deviceBar: { flexDirection: 'row', height: 36, borderRadius: 8, overflow: 'hidden', gap: 2 },
    deviceSeg: { alignItems: 'center', justifyContent: 'center' },
    deviceLabel: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 0.8 },

    // AI card
    aiCard: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 18,
      gap: 10,
    },
    aiTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    aiKind: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 10,
      height: 24,
      borderRadius: 12,
    },
    aiKindText: { fontFamily: fonts.bodyBold, fontSize: 10, letterSpacing: 1.4, color: palette.bone },
    aiTitle: { fontFamily: fonts.displayBold, fontSize: 18, lineHeight: 22, color: palette.ink, letterSpacing: -0.4 },
    aiBody: { ...T.small, color: palette.inkMuted, lineHeight: 19 },

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
