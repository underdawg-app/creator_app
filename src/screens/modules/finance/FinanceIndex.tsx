import React, { useMemo } from 'react';
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
import { Tap } from '@/components/ui/Tap';
import { analyticsSeed, transactionsSeed } from '@/data/mock';
import { useStore } from '@/store';

// Group raw transaction `kind` labels into earnings sources.
const SOURCE_MAP: Record<string, string> = {
  'BRAND DEAL': 'Gigs',
  'GET VIRAL': 'Gigs',
  MERCH: 'Merch',
  'ART SALE': 'Art',
  TIP: 'Tips',
  COMMISSION: 'Commission',
};
const SOURCE_ORDER = ['Gigs', 'Merch', 'Art', 'Tips', 'Commission'];

export default function FinanceIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const { available, pending, thisMonth, lastMonth, sources, total } = useMemo(() => {
    const inCleared = transactionsSeed
      .filter((t) => t.direction === 'IN' && t.status === 'CLEARED')
      .reduce((a, t) => a + t.amount, 0);
    const pend = transactionsSeed
      .filter((t) => t.direction === 'IN' && t.status === 'PENDING')
      .reduce((a, t) => a + t.amount, 0);

    const byKind: Record<string, number> = {};
    transactionsSeed
      .filter((t) => t.direction === 'IN')
      .forEach((t) => {
        const label = SOURCE_MAP[t.kind] ?? 'Gigs';
        byKind[label] = (byKind[label] ?? 0) + t.amount;
      });
    const tot = Object.values(byKind).reduce((a, n) => a + n, 0) || 1;
    const src = SOURCE_ORDER.filter((s) => byKind[s]).map((s) => ({
      label: s,
      amount: byKind[s],
      pct: Math.round((byKind[s] / tot) * 100),
    }));

    return {
      available: 242_000,
      pending: pend,
      thisMonth: inCleared,
      lastMonth: 186_400,
      sources: src,
      total: tot,
    };
  }, []);

  const trend = analyticsSeed.trend;
  const maxTrend = Math.max(...trend);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MONEY" title="FINANCE" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        your money,{'\n'}in one place.
      </RNText>

      {/* Balance hero + withdraw */}
      <View style={styles.heroRow}>
        <View style={{ flex: 1 }}>
          <MetricCard label="AVAILABLE BALANCE" value={available} prefix="₹" size="lg" accent={palette.acid} />
        </View>
      </View>
      <Tap onPress={() => router.push('/(modules)/finance/payouts')} style={styles.cta} burstColor={palette.bone}>
        <RNText style={styles.ctaLabel}>WITHDRAW</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </View>
      </Tap>

      {/* Metric grid */}
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="PENDING" value={pending} prefix="₹" size="md" accent={palette.blush} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="THIS MONTH" value={thisMonth} prefix="₹" size="md" accent={palette.electric} />
        </View>
      </View>
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="LAST MONTH" value={lastMonth} prefix="₹" size="md" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="LIFETIME" value={total} prefix="₹" size="md" accent={palette.acid} />
        </View>
      </View>

      {/* Earnings by source */}
      <Section
        eyebrow="EARNINGS BY SOURCE"
        action={{ label: 'ANALYTICS', onPress: () => router.push('/(modules)/analytics') }}
      >
        {sources.map((s) => (
          <Pressable key={s.label} onPress={() => router.push('/(modules)/analytics')} style={styles.srcRow}>
            <View style={styles.srcHead}>
              <RNText style={styles.srcLabel}>{s.label}</RNText>
              <RNText style={styles.srcAmount}>₹{s.amount.toLocaleString()}</RNText>
              <RNText style={styles.srcPct}>{s.pct}%</RNText>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${Math.max(s.pct, 4)}%` }]} />
            </View>
          </Pressable>
        ))}
      </Section>

      {/* 12-point trend sparkline */}
      <Section eyebrow="LAST 12 WEEKS">
        <Pressable onPress={() => router.push('/(modules)/analytics')} style={styles.trendCard}>
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
            <RNText style={styles.trendFootText}>Inflow trend</RNText>
            <RNText style={styles.trendDelta}>+{analyticsSeed.totals.growth30d.toFixed(1)}%</RNText>
          </View>
        </Pressable>
      </Section>

      {/* Next payout */}
      <Section eyebrow="NEXT PAYOUT">
        <Pressable onPress={() => router.push('/(modules)/finance/payouts')} style={styles.payoutCard}>
          <View style={styles.payoutIcon}>
            <Ionicons name="time-outline" size={20} color={palette.ink} />
          </View>
          <View style={{ flex: 1 }}>
            <RNText style={styles.payoutTitle}>Auto · weekly</RNText>
            <RNText style={styles.payoutSub}>Est. Fri, 5 Jun · HDFC ****4821</RNText>
          </View>
          <RNText style={styles.payoutAmt}>₹{pending.toLocaleString()}</RNText>
          <Ionicons name="chevron-forward" size={18} color={palette.inkMuted} />
        </Pressable>
      </Section>

      {/* Quick links */}
      <Section eyebrow="GO DEEP">
        <ListCell
          icon="receipt-outline"
          title="Transactions"
          subtitle={`${transactionsSeed.length} entries · search + filter`}
          onPress={() => router.push('/(modules)/finance/transactions')}
        />
        <ListCell
          icon="card-outline"
          title="Payment methods"
          subtitle="Bank · UPI · PayPal"
          onPress={() => router.push('/(modules)/finance/payment-methods')}
        />
        <ListCell
          icon="document-text-outline"
          title="Tax center"
          subtitle="GST, TDS, export for CA"
          onPress={() => router.push('/(modules)/finance/tax')}
        />
        <ListCell
          icon="business-outline"
          title="Invoices"
          subtitle="Generate · send · track"
          onPress={() => router.push('/(modules)/finance/invoice')}
        />
      </Section>

      <Tap onPress={() => toast('Statement exported to email.', 'success')} style={styles.exportRow} burstColor={palette.ink}>
        <Ionicons name="cloud-upload-outline" size={16} color={palette.ink} />
        <RNText style={styles.exportText}>EXPORT FULL STATEMENT</RNText>
      </Tap>
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
      marginBottom: 18,
    },
    heroRow: { flexDirection: 'row' },

    cta: {
      marginTop: 10,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: 2.5, color: palette.bone },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    metricGrid: { flexDirection: 'row', gap: 10, marginTop: 10 },

    srcRow: { gap: 8, paddingVertical: 6 },
    srcHead: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
    srcLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink, flex: 1 },
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

    payoutCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 16,
    },
    payoutIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    payoutTitle: { fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: -0.2, color: palette.ink },
    payoutSub: { ...T.small, color: palette.inkMuted, marginTop: 2 },
    payoutAmt: { fontFamily: fonts.displayBold, fontSize: 16, letterSpacing: -0.4, color: palette.ink },

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
