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
import { analyticsSeed, transactionsSeed } from '@/data/mock';
import { useStore } from '@/store';

type Range = '30D' | '90D' | 'ALL';

// Each kind gets a stable accent + display label for the source rows.
const KIND_META: Record<string, { label: string; accent: keyof typeof staticPalette }> = {
  'BRAND DEAL': { label: 'BRAND DEAL', accent: 'electric' },
  'GET VIRAL': { label: 'GET VIRAL', accent: 'acid' },
  COMMISSION: { label: 'COMMISSION', accent: 'blush' },
  'ART SALE': { label: 'ART SALE', accent: 'ember' },
  MERCH: { label: 'MERCH', accent: 'ink' },
  TIP: { label: 'TIP', accent: 'mute' },
};

// Range chips scale the displayed totals so the numbers visibly move.
const RANGE_MULT: Record<Range, number> = { '30D': 1, '90D': 2.7, ALL: 8.4 };

export default function AnalyticsEarnings() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [range, setRange] = useState<Range>('30D');
  const mult = RANGE_MULT[range];

  const { sources, baseTotal } = useMemo(() => {
    const byKind: Record<string, number> = {};
    transactionsSeed
      .filter((t) => t.direction === 'IN')
      .forEach((t) => {
        byKind[t.kind] = (byKind[t.kind] ?? 0) + t.amount;
      });
    const tot = Object.values(byKind).reduce((a, n) => a + n, 0) || 1;
    const src = Object.entries(byKind)
      .map(([kind, amount]) => {
        const meta = KIND_META[kind] ?? { label: kind, accent: 'ink' as const };
        return {
          kind,
          label: meta.label,
          accent: meta.accent,
          amount,
          pct: Math.round((amount / tot) * 100),
        };
      })
      .sort((a, b) => b.amount - a.amount);
    return { sources: src, baseTotal: tot };
  }, []);

  const total = Math.round(baseTotal * mult);
  const topStream = sources[0];
  const trend = analyticsSeed.trend;
  const maxTrend = Math.max(...trend);
  // Scale the sparkline into rupee figures for the value readout.
  const trendScale = total / trend.reduce((a, n) => a + n, 0);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ANALYTICS" title="EARNINGS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        where money{'\n'}comes from.
      </RNText>

      {/* Range selector */}
      <View style={styles.chipRow}>
        {(['30D', '90D', 'ALL'] as Range[]).map((r) => (
          <Chip
            key={r}
            label={r}
            active={range === r}
            onPress={() => setRange(r)}
            accent={palette.acid}
          />
        ))}
      </View>

      {/* Total earned hero */}
      <View style={styles.heroRow}>
        <View style={{ flex: 1 }}>
          <MetricCard
            label={`TOTAL EARNED · ${range}`}
            value={total}
            prefix="₹"
            size="lg"
            accent={palette.acid}
            delta={analyticsSeed.totals.growth30d}
          />
        </View>
      </View>

      {/* Top stream callout */}
      {topStream && (
        <Pressable
          onPress={() => router.push('/(modules)/finance/transactions')}
          style={styles.topCard}
        >
          <View style={styles.topIcon}>
            <Ionicons name="trending-up-outline" size={20} color={palette.ink} />
          </View>
          <View style={{ flex: 1 }}>
            <RNText style={styles.topKicker}>TOP STREAM</RNText>
            <RNText style={styles.topName}>{topStream.label}</RNText>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <RNText style={styles.topAmt}>
              ₹{Math.round(topStream.amount * mult).toLocaleString()}
            </RNText>
            <RNText style={styles.topShare}>{topStream.pct}% of all</RNText>
          </View>
        </Pressable>
      )}

      {/* By source */}
      <Section
        eyebrow="BY SOURCE"
        action={{ label: 'TRANSACTIONS', onPress: () => router.push('/(modules)/finance/transactions') }}
      >
        {sources.map((s) => (
          <Pressable
            key={s.kind}
            onPress={() => toast(`${s.label}: ₹${Math.round(s.amount * mult).toLocaleString()} · ${s.pct}%`, 'default')}
            style={styles.srcRow}
          >
            <View style={styles.srcHead}>
              <RNText style={styles.srcLabel}>{s.label}</RNText>
              <RNText style={styles.srcAmount}>
                ₹{Math.round(s.amount * mult).toLocaleString()}
              </RNText>
              <RNText style={styles.srcPct}>{s.pct}%</RNText>
            </View>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: `${Math.max(s.pct, 4)}%`, backgroundColor: palette[s.accent] },
                ]}
              />
            </View>
          </Pressable>
        ))}
      </Section>

      {/* Inflow trend */}
      <Section eyebrow="LAST 12 WEEKS">
        <View style={styles.trendCard}>
          <View style={styles.sparkRow}>
            {trend.map((v, i) => (
              <View
                key={i}
                style={[
                  styles.spark,
                  {
                    height: 12 + (v / maxTrend) * 56,
                    backgroundColor: i === trend.length - 1 ? palette.acid : palette.ink,
                    opacity: i === trend.length - 1 ? 1 : 0.55,
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.trendFoot}>
            <RNText style={styles.trendFootText}>
              Peak week · ₹{Math.round(maxTrend * trendScale).toLocaleString()}
            </RNText>
            <RNText style={styles.trendDelta}>
              +{analyticsSeed.totals.growth30d.toFixed(1)}%
            </RNText>
          </View>
        </View>
      </Section>

      {/* Go deeper */}
      <Section eyebrow="GO DEEPER">
        <ListCell
          icon="bar-chart-outline"
          title="Full finance dashboard"
          subtitle="Balance · payouts · sources"
          onPress={() => router.push('/(modules)/finance')}
        />
        <ListCell
          icon="receipt-outline"
          title="Transactions"
          subtitle={`${transactionsSeed.length} entries · search + filter`}
          onPress={() => router.push('/(modules)/finance/transactions')}
        />
      </Section>
    </ScreenFrame>
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
      marginBottom: 16,
    },

    chipRow: { flexDirection: 'row', gap: 6, marginBottom: 14 },

    heroRow: { flexDirection: 'row' },

    topCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginTop: 12,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 16,
    },
    topIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topKicker: { ...T.label, color: palette.inkMuted },
    topName: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.3,
      color: palette.ink,
      marginTop: 2,
    },
    topAmt: { fontFamily: fonts.displayBold, fontSize: 16, letterSpacing: -0.4, color: palette.ink },
    topShare: { ...T.small, color: palette.inkMuted, marginTop: 2 },

    srcRow: { gap: 8, paddingVertical: 6 },
    srcHead: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
    srcLabel: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 0.4,
      color: palette.ink,
      flex: 1,
    },
    srcAmount: { fontFamily: fonts.body, fontSize: 14, color: palette.ink },
    srcPct: { ...T.label, color: palette.inkMuted, width: 36, textAlign: 'right' },
    barTrack: { height: 6, borderRadius: 3, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    barFill: { height: 6, borderRadius: 3, backgroundColor: palette.ink },

    trendCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 14,
    },
    sparkRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 70 },
    spark: { flex: 1, borderRadius: 3 },
    trendFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    trendFootText: { ...T.small, color: palette.inkMuted },
    trendDelta: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },
  });
