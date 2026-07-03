import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

const STEPS = ['CONFIRMED', 'PRINTING', 'SHIPPED', 'DELIVERED'] as const;
type Step = (typeof STEPS)[number];

const FILTERS = ['ALL', ...STEPS] as const;

const statusAccent = (palette: typeof staticPalette): Record<Step, string> => ({
  CONFIRMED: palette.electric,
  PRINTING: palette.acid,
  SHIPPED: palette.blush,
  DELIVERED: palette.mute,
});

type Order = {
  id: string;
  product: string;
  buyer: string;
  qty: number;
  total: number;
  status: string;
  date: string;
};

export default function MerchOrders() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const orders = useStore((s) => s.merchOrders) as Order[];

  const accents = statusAccent(palette);

  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('ALL');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === 'ALL' ? orders : orders.filter((o) => o.status === filter)),
    [orders, filter],
  );

  const { openCount, weekRevenue } = useMemo(() => {
    const open = orders.filter((o) => o.status !== 'DELIVERED').length;
    // "This week" = orders dated in hours or within 7 days.
    const week = orders
      .filter((o) => o.date.endsWith('h') || (o.date.endsWith('d') && parseInt(o.date, 10) <= 7))
      .reduce((a, o) => a + o.total, 0);
    return { openCount: open, weekRevenue: week };
  }, [orders]);

  const active = openId ? orders.find((o) => o.id === openId) ?? orders[0] : null;
  const activeStepIdx = active ? STEPS.indexOf(active.status as Step) : -1;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MERCH" title="ORDERS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        orders.
      </RNText>

      {/* Metric grid */}
      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="OPEN ORDERS" value={openCount} size="md" accent={palette.electric} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="THIS WEEK" value={weekRevenue} prefix="₹" size="md" accent={palette.acid} />
        </View>
      </View>

      {/* Status filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        style={{ marginTop: 18 }}
      >
        {FILTERS.map((f) => (
          <Chip
            key={f}
            label={f}
            active={filter === f}
            accent={f === 'ALL' ? palette.ink : accents[f as Step]}
            size="sm"
            onPress={() => setFilter(f)}
          />
        ))}
      </ScrollView>

      {/* Order list */}
      <View style={{ marginTop: 8 }}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="cube-outline" size={22} color={palette.inkMuted} />
            <RNText style={styles.emptyText}>No {filter.toLowerCase()} orders right now.</RNText>
          </View>
        ) : (
          filtered.map((o) => (
            <Pressable key={o.id} style={styles.row} onPress={() => setOpenId(o.id)}>
              <View style={{ flex: 1 }}>
                <RNText style={styles.product} numberOfLines={1}>
                  {o.product}
                </RNText>
                <RNText style={styles.meta} numberOfLines={1}>
                  {o.buyer} · qty {o.qty} · ₹{o.total.toLocaleString()} · {o.date} ago
                </RNText>
              </View>
              <View style={[styles.statusPill, { backgroundColor: accents[o.status as Step] ?? palette.boneSoft }]}>
                <RNText style={styles.statusText}>{o.status}</RNText>
              </View>
              <Ionicons name="chevron-forward" size={16} color={palette.inkMuted} />
            </Pressable>
          ))
        )}
      </View>

      {/* Order detail sheet */}
      <Sheet
        visible={openId !== null}
        onClose={() => setOpenId(null)}
        eyebrow={active ? `ORDER ${active.id.toUpperCase()}` : 'ORDER'}
        title={active?.product ?? 'order.'}
      >
        {active ? (
          <>
            {/* Facts */}
            <View style={styles.factCard}>
              <View style={styles.factRow}>
                <RNText style={styles.factKey}>BUYER</RNText>
                <RNText style={styles.factVal}>{active.buyer}</RNText>
              </View>
              <View style={styles.factRow}>
                <RNText style={styles.factKey}>QUANTITY</RNText>
                <RNText style={styles.factVal}>{active.qty}</RNText>
              </View>
              <View style={styles.factRow}>
                <RNText style={styles.factKey}>TOTAL</RNText>
                <RNText style={styles.factVal}>₹{active.total.toLocaleString()}</RNText>
              </View>
              <View style={[styles.factRow, { borderBottomWidth: 0 }]}>
                <RNText style={styles.factKey}>PLACED</RNText>
                <RNText style={styles.factVal}>{active.date} ago</RNText>
              </View>
            </View>

            {/* Status timeline */}
            <RNText style={styles.timelineLabel}>STATUS</RNText>
            <View style={styles.timeline}>
              {STEPS.map((s, i) => {
                const done = i <= activeStepIdx;
                const current = i === activeStepIdx;
                return (
                  <View key={s} style={styles.tlStep}>
                    <View style={styles.tlDotCol}>
                      <View
                        style={[
                          styles.tlDot,
                          done && { backgroundColor: palette.ink, borderColor: palette.ink },
                          current && { backgroundColor: accents[s], borderColor: accents[s] },
                        ]}
                      >
                        {done && <Ionicons name="checkmark-circle" size={14} color={palette.bone} />}
                      </View>
                      {i < STEPS.length - 1 && (
                        <View style={[styles.tlLine, i < activeStepIdx && { backgroundColor: palette.ink }]} />
                      )}
                    </View>
                    <View style={styles.tlText}>
                      <RNText style={[styles.tlName, (done || current) && { color: palette.ink }]}>{s}</RNText>
                      {current && <RNText style={styles.tlNow}>current</RNText>}
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Action */}
            {active.status === 'DELIVERED' ? (
              <Tap
                onPress={() => toast(`Pinged ${active.buyer} about their order.`, 'success')}
                style={styles.cta}
                burstColor={palette.bone}
              >
                <RNText style={styles.ctaLabel}>CONTACT BUYER</RNText>
                <View style={styles.ctaArrow}>
                  <Ionicons name="send" size={14} color={palette.ink} />
                </View>
              </Tap>
            ) : (
              <Tap
                onPress={() => {
                  toast('Marked shipped · buyer notified.', 'success');
                  setOpenId(null);
                }}
                style={styles.cta}
                burstColor={palette.bone}
              >
                <RNText style={styles.ctaLabel}>MARK SHIPPED</RNText>
                <View style={styles.ctaArrow}>
                  <Ionicons name="arrow-forward" size={14} color={palette.ink} />
                </View>
              </Tap>
            )}

            <Pressable onPress={() => setOpenId(null)} style={styles.sheetDone}>
              <RNText style={styles.sheetDoneText}>CLOSE</RNText>
            </Pressable>
          </>
        ) : null}
      </Sheet>
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

    metricGrid: { flexDirection: 'row', gap: 10 },

    chipRow: { gap: 8, paddingRight: 4 },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    product: { fontFamily: fonts.displayBold, fontSize: 17, color: palette.ink, letterSpacing: -0.4 },
    meta: { ...T.small, color: palette.inkMuted, marginTop: 4 },
    statusPill: { paddingHorizontal: 10, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    statusText: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 1, color: palette.ink },

    empty: {
      marginTop: 24,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      paddingVertical: 28,
      alignItems: 'center',
      gap: 10,
    },
    emptyText: { ...T.small, color: palette.inkMuted },

    // Sheet — facts
    factCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      paddingHorizontal: 16,
    },
    factRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 13,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    factKey: { ...T.label, color: palette.inkMuted },
    factVal: { fontFamily: fonts.bodyBold, fontSize: 14, letterSpacing: -0.2, color: palette.ink },

    // Sheet — timeline
    timelineLabel: { ...T.label, color: palette.inkMuted, marginTop: 20, marginBottom: 12 },
    timeline: { paddingLeft: 2 },
    tlStep: { flexDirection: 'row', gap: 14 },
    tlDotCol: { alignItems: 'center', width: 24 },
    tlDot: {
      width: 24,
      height: 24,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tlLine: { width: 2, flex: 1, minHeight: 22, backgroundColor: palette.line },
    tlText: { flex: 1, paddingBottom: 18, flexDirection: 'row', alignItems: 'center', gap: 8 },
    tlName: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 0.4, color: palette.inkMuted },
    tlNow: {
      ...T.micro,
      color: palette.ink,
      backgroundColor: palette.acid,
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: 8,
      overflow: 'hidden',
    },

    cta: {
      marginTop: 8,
      height: 56,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaLabel: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2.5, color: palette.bone },
    ctaArrow: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },

    sheetDone: {
      marginTop: 12,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetDoneText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
