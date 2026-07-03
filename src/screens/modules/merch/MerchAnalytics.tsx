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
import { productsSeed, merchOrdersSeed } from '@/data/mock';
import { useStore } from '@/store';

type Range = '30D' | '90D' | 'ALL';

// Range chips scale displayed totals so the numbers visibly move.
const RANGE_MULT: Record<Range, number> = { '30D': 1, '90D': 2.4, ALL: 6.1 };

// Fabricated ascending 12-bar trend (relative weekly revenue index).
const TREND = [8, 11, 9, 14, 17, 15, 21, 24, 22, 29, 33, 38];

// Stable accent rotation for top-product bars.
const ACCENTS = ['electric', 'blush', 'acid', 'ember'] as const;

export default function MerchAnalytics() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [range, setRange] = useState<Range>('30D');
  const mult = RANGE_MULT[range];

  const { revenue, units, orders, top } = useMemo(() => {
    const rev = productsSeed.reduce((a, p) => a + p.margin * p.sold, 0);
    const u = productsSeed.reduce((a, p) => a + p.sold, 0);
    const ranked = [...productsSeed]
      .sort((a, b) => b.sold - a.sold)
      .map((p, i) => ({
        id: p.id,
        name: p.name,
        sold: p.sold,
        revenue: p.margin * p.sold,
        share: Math.round((p.sold / (u || 1)) * 100),
        accent: ACCENTS[i % ACCENTS.length],
      }));
    return { revenue: rev, units: u, orders: merchOrdersSeed.length, top: ranked };
  }, []);

  const scaledRevenue = Math.round(revenue * mult);
  const scaledUnits = Math.round(units * mult);
  const scaledOrders = Math.round(orders * mult);
  // Fabricated store conversion that nudges with the selected range.
  const conversion = range === '30D' ? 4 : range === '90D' ? 5 : 6;

  const maxTrend = Math.max(...TREND);
  const recent = merchOrdersSeed.slice(0, 3);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MERCH" title="ANALYTICS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        what sells.
      </RNText>

      {/* Range selector */}
      <View style={styles.chipRow}>
        {(['30D', '90D', 'ALL'] as Range[]).map((r) => (
          <Chip key={r} label={r} active={range === r} onPress={() => setRange(r)} accent={palette.acid} />
        ))}
      </View>

      {/* Headline metrics */}
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label={`REVENUE · ${range}`} value={scaledRevenue} prefix="₹" size="lg" accent={palette.acid} />
        </View>
      </View>
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="UNITS SOLD" value={scaledUnits} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="ORDERS" value={scaledOrders} size="md" accent={palette.blush} />
        </View>
      </View>
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="CONVERSION" value={conversion} suffix="%" size="md" accent={palette.ember} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="LIVE SKUS" value={productsSeed.filter((p) => p.published).length} size="md" />
        </View>
      </View>

      {/* Top products by units sold */}
      <Section
        eyebrow="TOP PRODUCTS"
        title="bestsellers."
        action={{ label: 'STORE', onPress: () => router.push('/(modules)/merch/store') }}
      >
        {top.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => toast(`${p.name} · ${p.sold} sold · ₹${Math.round(p.revenue * mult).toLocaleString()}`, 'default')}
            style={styles.prodRow}
          >
            <View style={styles.prodHead}>
              <RNText style={styles.prodName} numberOfLines={1}>
                {p.name}
              </RNText>
              <RNText style={styles.prodAmount}>₹{Math.round(p.revenue * mult).toLocaleString()}</RNText>
            </View>
            <View style={styles.barTrack}>
              <View
                style={[styles.barFill, { width: `${Math.max(p.share, 4)}%`, backgroundColor: palette[p.accent] }]}
              />
            </View>
            <View style={styles.prodFoot}>
              <RNText style={styles.prodFootText}>{p.sold} units</RNText>
              <RNText style={styles.prodFootText}>{p.share}% of units</RNText>
            </View>
          </Pressable>
        ))}
      </Section>

      {/* Revenue trend sparkline */}
      <Section eyebrow="LAST 12 WEEKS" title="revenue trend.">
        <View style={styles.trendCard}>
          <View style={styles.sparkRow}>
            {TREND.map((v, i) => (
              <View
                key={i}
                style={[
                  styles.spark,
                  {
                    height: 12 + (v / maxTrend) * 56,
                    backgroundColor: i === TREND.length - 1 ? palette.acid : palette.ink,
                    opacity: i === TREND.length - 1 ? 1 : 0.55,
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.trendFoot}>
            <RNText style={styles.trendFootText}>Peak week · ₹{Math.round(maxTrend * 1300 * mult).toLocaleString()}</RNText>
            <RNText style={styles.trendDelta}>+18.4%</RNText>
          </View>
        </View>
      </Section>

      {/* Recent orders preview */}
      <Section
        eyebrow="RECENT ORDERS"
        action={{ label: 'VIEW ALL', onPress: () => router.push('/(modules)/merch/orders') }}
      >
        {recent.map((o) => (
          <ListCell
            key={o.id}
            icon="cube-outline"
            title={o.product}
            subtitle={`${o.buyer} · ${o.status} · ${o.date}`}
            right={<RNText style={styles.orderAmt}>₹{o.total.toLocaleString()}</RNText>}
            onPress={() => router.push('/(modules)/merch/orders')}
          />
        ))}
      </Section>

      {/* View all CTA */}
      <Pressable onPress={() => router.push('/(modules)/merch/orders')} style={styles.allRow}>
        <Ionicons name="bar-chart-outline" size={16} color={palette.ink} />
        <RNText style={styles.allText}>VIEW ALL ORDERS</RNText>
        <Ionicons name="chevron-forward" size={16} color={palette.inkMuted} />
      </Pressable>
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

    metricGrid: { flexDirection: 'row', gap: 10, marginTop: 10 },

    prodRow: { gap: 8, paddingVertical: 8 },
    prodHead: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
    prodName: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.2, color: palette.ink, flex: 1 },
    prodAmount: { fontFamily: fonts.displayBold, fontSize: 15, letterSpacing: -0.4, color: palette.ink },
    barTrack: { height: 6, borderRadius: 3, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    barFill: { height: 6, borderRadius: 3, backgroundColor: palette.ink },
    prodFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    prodFootText: { ...T.small, color: palette.inkMuted },

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

    orderAmt: { fontFamily: fonts.displayBold, fontSize: 15, letterSpacing: -0.4, color: palette.ink },

    allRow: {
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
    allText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
