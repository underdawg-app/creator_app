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

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

// Icon + tint per transaction kind, for the activity feed.
const KIND_META: Record<string, { icon: string; tint: string }> = {
  'BRAND DEAL': { icon: 'briefcase-outline', tint: '#2E5BFF' },
  'GET VIRAL': { icon: 'rocket-outline', tint: '#FF5A1F' },
  MERCH: { icon: 'shirt-outline', tint: '#FF6BB5' },
  'ART SALE': { icon: 'color-palette-outline', tint: '#9C988A' },
  TIP: { icon: 'heart-outline', tint: '#F70E0A' },
  COMMISSION: { icon: 'create-outline', tint: '#2E5BFF' },
  PAYOUT: { icon: 'arrow-up-outline', tint: '#9C988A' },
  FEE: { icon: 'remove-circle-outline', tint: '#9C988A' },
};

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

  // Color per source, reused by the stacked bar and the rows.
  const SRC_COLORS: Record<string, string> = {
    Gigs: palette.ink,
    Merch: palette.blush,
    Art: palette.electric,
    Tips: palette.ember,
    Commission: palette.acid,
  };

  const momDelta = Math.round(((thisMonth - lastMonth) / lastMonth) * 1000) / 10;
  const momUp = momDelta >= 0;

  const recent = transactionsSeed.slice(0, 5);

  const trend = analyticsSeed.trend;
  const maxTrend = Math.max(...trend);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MONEY" title="FINANCE" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        your money,{'\n'}in one place.
      </RNText>

      {/* Balance hero — dark feature card with withdraw built in */}
      <View style={styles.hero}>
        <View style={styles.heroTopRow}>
          <RNText style={styles.heroLabel}>AVAILABLE BALANCE</RNText>
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <RNText style={styles.liveText}>LIVE</RNText>
          </View>
        </View>
        <RNText style={styles.heroValue} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.5}>
          {inr(available)}
        </RNText>
        <View style={styles.heroPills}>
          <View style={styles.heroPill}>
            <Ionicons name="time-outline" size={13} color={palette.bone} />
            <RNText style={styles.heroPillText}>{inr(pending)} pending</RNText>
          </View>
          <View style={styles.heroPill}>
            <Ionicons name={momUp ? 'trending-up' : 'trending-down'} size={13} color={palette.bone} />
            <RNText style={styles.heroPillText}>{momUp ? '+' : ''}{momDelta}% MoM</RNText>
          </View>
        </View>

        <View style={styles.heroActions}>
          <Tap onPress={() => router.push('/(modules)/finance/payouts')} style={styles.ctaPrimary} burstColor={palette.ink}>
            <RNText style={styles.ctaPrimaryText}>WITHDRAW</RNText>
            <Ionicons name="arrow-forward" size={15} color={palette.ink} />
          </Tap>
          <Tap onPress={() => router.push('/(modules)/finance/invoice')} style={styles.ctaGhost} burstColor={palette.bone}>
            <Ionicons name="add" size={16} color={palette.bone} />
            <RNText style={styles.ctaGhostText}>INVOICE</RNText>
          </Tap>
        </View>
      </View>

      {/* Metric grid */}
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="THIS MONTH" value={thisMonth} prefix="₹" delta={momDelta} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="LAST MONTH" value={lastMonth} prefix="₹" size="md" />
        </View>
      </View>
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="PENDING" value={pending} prefix="₹" size="md" accent={palette.blush} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="LIFETIME" value={total} prefix="₹" size="md" accent={palette.acid} />
        </View>
      </View>

      {/* Earnings by source — composition bar + rows */}
      <Section
        eyebrow="EARNINGS BY SOURCE"
        action={{ label: 'ANALYTICS', onPress: () => router.push('/(modules)/analytics') }}
      >
        <View style={styles.panel}>
          <View style={styles.stackBar}>
            {sources.map((s, i) => (
              <View
                key={s.label}
                style={{
                  flex: s.pct,
                  backgroundColor: SRC_COLORS[s.label] ?? palette.ink,
                  marginLeft: i === 0 ? 0 : 2,
                  borderTopLeftRadius: i === 0 ? 7 : 0,
                  borderBottomLeftRadius: i === 0 ? 7 : 0,
                  borderTopRightRadius: i === sources.length - 1 ? 7 : 0,
                  borderBottomRightRadius: i === sources.length - 1 ? 7 : 0,
                }}
              />
            ))}
          </View>
          {sources.map((s, i) => (
            <Pressable
              key={s.label}
              onPress={() => router.push('/(modules)/analytics')}
              style={[styles.srcRow, i === sources.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={[styles.srcDot, { backgroundColor: SRC_COLORS[s.label] ?? palette.ink }]} />
              <RNText style={styles.srcLabel}>{s.label}</RNText>
              <RNText style={styles.srcAmount}>{inr(s.amount)}</RNText>
              <RNText style={styles.srcPct}>{s.pct}%</RNText>
            </Pressable>
          ))}
        </View>
      </Section>

      {/* Recent activity */}
      <Section
        eyebrow="RECENT ACTIVITY"
        action={{ label: 'ALL', onPress: () => router.push('/(modules)/finance/transactions') }}
      >
        <View style={styles.panel}>
          {recent.map((tx, i) => {
            const meta = KIND_META[tx.kind] ?? KIND_META['BRAND DEAL'];
            const out = tx.direction === 'OUT';
            return (
              <Pressable
                key={tx.id}
                onPress={() => router.push('/(modules)/finance/transactions')}
                style={[styles.txRow, i === 0 && styles.txRowFirst]}
              >
                <View style={[styles.txIcon, { borderColor: meta.tint }]}>
                  <Ionicons name={meta.icon as any} size={17} color={meta.tint} />
                </View>
                <View style={styles.txBody}>
                  <RNText style={styles.txSource} numberOfLines={1}>{tx.source}</RNText>
                  <View style={styles.txMeta}>
                    <RNText style={styles.txKind}>{tx.kind}</RNText>
                    <RNText style={styles.metaDot}>·</RNText>
                    <RNText style={styles.txDate}>{tx.date} ago</RNText>
                    {tx.status === 'PENDING' ? (
                      <View style={styles.pendBadge}>
                        <RNText style={styles.pendText}>PENDING</RNText>
                      </View>
                    ) : null}
                  </View>
                </View>
                <RNText style={[styles.txAmt, { color: out ? palette.inkMuted : palette.ink }]}>
                  {out ? '−' : '+'}{inr(tx.amount)}
                </RNText>
              </Pressable>
            );
          })}
        </View>
      </Section>

      {/* 12-point inflow trend */}
      <Section eyebrow="INFLOW · LAST 12 WEEKS">
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
            <RNText style={styles.trendFootText}>Weekly inflow trend</RNText>
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
          <RNText style={styles.payoutAmt}>{inr(pending)}</RNText>
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

    // Hero balance card
    hero: {
      borderRadius: 24,
      backgroundColor: palette.ink,
      padding: 22,
      borderWidth: 1,
      borderColor: palette.lineDark,
    },
    heroTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    heroLabel: { ...T.label, color: palette.bone, opacity: 0.6, letterSpacing: 2 },
    liveTag: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 9,
      height: 22,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: palette.lineDark,
    },
    liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: palette.acid },
    liveText: { ...T.micro, color: palette.bone, opacity: 0.7, letterSpacing: 1.2 },
    heroValue: {
      fontFamily: fonts.displayBold,
      fontSize: 52,
      lineHeight: 56,
      letterSpacing: -2.5,
      color: palette.bone,
      marginTop: 8,
    },
    heroPills: { flexDirection: 'row', gap: 8, marginTop: 14 },
    heroPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 11,
      height: 30,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: palette.lineDark,
    },
    heroPillText: { ...T.small, color: palette.bone, opacity: 0.85 },
    heroActions: { flexDirection: 'row', gap: 10, marginTop: 18 },
    ctaPrimary: {
      flex: 1,
      height: 52,
      borderRadius: 16,
      backgroundColor: palette.bone,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    ctaPrimaryText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2.5, color: palette.ink },
    ctaGhost: {
      paddingHorizontal: 18,
      height: 52,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.lineDark,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    ctaGhostText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.bone },

    metricGrid: { flexDirection: 'row', gap: 10, marginTop: 10 },

    // Generic panel
    panel: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      marginTop: 2,
    },

    // Earnings by source
    stackBar: { flexDirection: 'row', height: 14, borderRadius: 7, overflow: 'hidden', marginBottom: 14 },
    srcRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 11,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    srcDot: { width: 9, height: 9, borderRadius: 5 },
    srcLabel: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink, flex: 1 },
    srcAmount: { fontFamily: fonts.body, fontSize: 14, color: palette.ink },
    srcPct: { ...T.label, color: palette.inkMuted, width: 38, textAlign: 'right' },

    // Recent activity
    txRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingTop: 13,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    txRowFirst: { paddingTop: 0, borderTopWidth: 0 },
    txIcon: {
      width: 40,
      height: 40,
      borderRadius: 12,
      borderWidth: 1.5,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
    },
    txBody: { flex: 1, gap: 4 },
    txSource: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink },
    txMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    txKind: { ...T.micro, color: palette.inkMuted, letterSpacing: 0.8 },
    txDate: { ...T.micro, color: palette.inkMuted },
    metaDot: { ...T.micro, color: palette.inkMuted },
    pendBadge: {
      paddingHorizontal: 7,
      height: 16,
      borderRadius: 8,
      backgroundColor: palette.blush,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 2,
    },
    pendText: { ...T.micro, color: palette.ink, letterSpacing: 0.8, fontFamily: fonts.bodyBold },
    txAmt: { fontFamily: fonts.displayBold, fontSize: 15, letterSpacing: -0.4 },

    // Trend
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
