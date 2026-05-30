import React, { useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';
import { transactionsSeed, type Transaction } from '@/data/mock';

type Tab = 'ALL' | 'IN' | 'OUT' | 'PENDING';

const TABS: Tab[] = ['ALL', 'IN', 'OUT', 'PENDING'];
const KINDS = ['BRAND DEAL', 'MERCH', 'ART SALE', 'TIP', 'PAYOUT', 'FEE', 'GET VIRAL', 'COMMISSION'];

const statusAccent = (status: Transaction['status'], palette: typeof staticPalette) =>
  status === 'CLEARED' ? palette.acid : status === 'PENDING' ? palette.ember : palette.electric;

export default function FinanceTransactions() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<Tab>('ALL');
  const [kind, setKind] = useState<string | null>(null);
  const [active, setActive] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactionsSeed.filter((t) => {
      if (tab === 'IN' && t.direction !== 'IN') return false;
      if (tab === 'OUT' && t.direction !== 'OUT') return false;
      if (tab === 'PENDING' && t.status !== 'PENDING') return false;
      if (kind && t.kind !== kind) return false;
      if (q && !(`${t.source} ${t.kind}`.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [query, tab, kind]);

  const totals = useMemo(() => {
    let inSum = 0;
    let outSum = 0;
    filtered.forEach((t) => {
      if (t.direction === 'IN') inSum += t.amount;
      else outSum += t.amount;
    });
    return { inSum, outSum };
  }, [filtered]);

  const txnId = active ? `UD-${active.id.toUpperCase()}-${active.amount}` : '';

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MONEY · LEDGER" title="TRANSACTIONS" />} waves={false}>
      <RNText style={styles.title}>every rupee.</RNText>

      <View style={styles.searchRow}>
        <Ionicons name="receipt-outline" size={16} color={palette.inkMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search source or kind"
          placeholderTextColor={palette.inkMuted}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {query.length > 0 ? (
          <Pressable onPress={() => setQuery('')} hitSlop={8}>
            <Ionicons name="close" size={16} color={palette.inkMuted} />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.metrics}>
        <View style={{ flex: 1 }}>
          <MetricCard label="TOTAL IN" value={totals.inSum} prefix="₹" size="sm" />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="TOTAL OUT" value={totals.outSum} prefix="₹" size="sm" accent={palette.mute} />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        style={styles.chipScroll}
      >
        {TABS.map((t) => (
          <Chip key={t} label={t} active={tab === t} onPress={() => setTab(t)} size="sm" />
        ))}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
        style={styles.chipScroll}
      >
        {KINDS.map((k) => (
          <Chip
            key={k}
            label={k}
            active={kind === k}
            onPress={() => setKind((cur) => (cur === k ? null : k))}
            size="sm"
            accent={palette.electric}
          />
        ))}
      </ScrollView>

      <RNText style={styles.count}>
        {filtered.length} {filtered.length === 1 ? 'ENTRY' : 'ENTRIES'}
      </RNText>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="search-outline" size={22} color={palette.inkMuted} />
          <RNText style={styles.emptyText}>No transactions match.</RNText>
        </View>
      ) : (
        filtered.map((t) => (
          <Pressable key={t.id} onPress={() => setActive(t)} style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={styles.rowTop}>
                <RNText style={styles.kind} numberOfLines={1}>
                  {t.kind}
                </RNText>
                <View style={[styles.pill, { borderColor: statusAccent(t.status, palette) }]}>
                  <RNText style={[styles.pillText, { color: statusAccent(t.status, palette) }]}>
                    {t.status}
                  </RNText>
                </View>
              </View>
              <RNText style={styles.source} numberOfLines={1}>
                {t.source}
              </RNText>
              <RNText style={styles.ago}>{t.date} ago</RNText>
            </View>
            <RNText
              style={[styles.amount, { color: t.direction === 'IN' ? palette.ink : palette.mute }]}
            >
              {t.direction === 'IN' ? '+' : '−'}₹{t.amount.toLocaleString()}
            </RNText>
          </Pressable>
        ))
      )}

      <Sheet
        visible={!!active}
        onClose={() => setActive(null)}
        eyebrow={active ? `${active.direction} · ${active.status}` : undefined}
        title={active ? active.kind : undefined}
      >
        {active ? (
          <View style={{ gap: 14 }}>
            <RNText
              style={[
                styles.sheetAmount,
                { color: active.direction === 'IN' ? palette.ink : palette.mute },
              ]}
            >
              {active.direction === 'IN' ? '+' : '−'}₹{active.amount.toLocaleString()}
            </RNText>

            <DetailRow label="SOURCE" value={active.source} styles={styles} />
            <DetailRow
              label="DIRECTION"
              value={active.direction === 'IN' ? 'Money in' : 'Money out'}
              styles={styles}
            />
            <DetailRow label="DATE" value={`${active.date} ago`} styles={styles} />
            <DetailRow label="STATUS" value={active.status} styles={styles} />
            <DetailRow label="TXN ID" value={txnId} styles={styles} />

            <Pressable
              onPress={() => {
                toast('Receipt copied to clipboard.', 'success');
                setActive(null);
              }}
              style={styles.cta}
            >
              <RNText style={styles.ctaText}>COPY RECEIPT</RNText>
              <View style={styles.ctaArrow}>
                <Ionicons name="arrow-forward" size={14} color={palette.ink} />
              </View>
            </Pressable>
          </View>
        ) : null}
      </Sheet>
    </ScreenFrame>
  );
}

function DetailRow({
  label,
  value,
  styles,
}: {
  label: string;
  value: string;
  styles: ReturnType<typeof makeStyles>;
}) {
  return (
    <View style={styles.detailRow}>
      <RNText style={styles.detailLabel}>{label}</RNText>
      <RNText style={styles.detailValue} numberOfLines={1}>
        {value}
      </RNText>
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
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 18,
      paddingHorizontal: 14,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    searchInput: {
      flex: 1,
      fontFamily: fonts.body,
      fontSize: 14,
      color: palette.ink,
      padding: 0,
    },
    metrics: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 14,
    },
    chipScroll: {
      marginTop: 14,
      marginHorizontal: -12,
    },
    chipRow: {
      gap: 8,
      paddingHorizontal: 12,
    },
    count: {
      ...T.label,
      color: palette.ink,
      opacity: 0.5,
      marginTop: 18,
      marginBottom: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    rowTop: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    kind: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.3,
      color: palette.ink,
      flexShrink: 1,
    },
    pill: {
      paddingHorizontal: 8,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pillText: {
      fontFamily: fonts.bodyBold,
      fontSize: 9,
      letterSpacing: 1.4,
    },
    source: {
      ...T.small,
      color: palette.ink,
      opacity: 0.7,
      marginTop: 4,
    },
    ago: {
      ...T.micro,
      color: palette.ink,
      opacity: 0.45,
      marginTop: 4,
    },
    amount: {
      fontFamily: fonts.displayBold,
      fontSize: 18,
      letterSpacing: -0.5,
    },
    empty: {
      alignItems: 'center',
      gap: 8,
      paddingVertical: 48,
    },
    emptyText: {
      ...T.body,
      color: palette.ink,
      opacity: 0.55,
    },
    sheetAmount: {
      fontFamily: fonts.displayBold,
      fontSize: 40,
      letterSpacing: -1.5,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 14,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    detailLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.5,
    },
    detailValue: {
      fontFamily: fonts.bodyMedium,
      fontSize: 14,
      color: palette.ink,
      flexShrink: 1,
      textAlign: 'right',
    },
    cta: {
      marginTop: 8,
      height: 60,
      borderRadius: 18,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    },
    ctaText: {
      fontFamily: fonts.bodyBold,
      fontSize: 13,
      letterSpacing: 2,
      color: palette.bone,
    },
    ctaArrow: {
      width: 26,
      height: 26,
      borderRadius: 13,
      backgroundColor: palette.bone,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
