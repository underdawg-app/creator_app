import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, Switch } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { Ionicons } from '@/icons';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { Chip } from '@/components/ui/Chip';
import { Sheet } from '@/components/ui/Sheet';
import { useStore } from '@/store';

const DEFAULT_AMOUNTS = [49, 99, 199, 499];

const RECENT_TIPS = [
  { id: 't1', from: 'arihant.s', amount: 199, note: 'For the night-bus EP.', time: '2h' },
  { id: 't2', from: 'maya.films', amount: 49, note: '', time: '1d' },
  { id: 't3', from: 'kore.odu', amount: 499, note: 'Keep them coming.', time: '3d' },
];

type Tip = { id: string; from: string; amount: number; note: string; time: string; week: boolean };

const TIP_HISTORY: Tip[] = [
  { id: 'h1', from: 'arihant.s', amount: 199, note: 'For the night-bus EP.', time: '2h', week: true },
  { id: 'h2', from: 'maya.films', amount: 49, note: '', time: '1d', week: true },
  { id: 'h3', from: 'kore.odu', amount: 499, note: 'Keep them coming.', time: '3d', week: true },
  { id: 'h4', from: 'nia.r', amount: 99, note: 'That cover hit.', time: '5d', week: true },
  { id: 'h5', from: 'jay.oke', amount: 149, note: '', time: '1w', week: false },
  { id: 'h6', from: 'charu', amount: 299, note: 'Worth every rupee.', time: '2w', week: false },
  { id: 'h7', from: 'ari.s', amount: 49, note: '', time: '3w', week: false },
  { id: 'h8', from: 'devs.k', amount: 999, note: 'Big fan, keep building.', time: '4w', week: false },
  { id: 'h9', from: 'lola.m', amount: 49, note: '', time: '5w', week: false },
];

type Tipper = { id: string; handle: string; total: number; count: number };

const TOP_TIPPERS: Tipper[] = [
  { id: 'tp1', handle: 'devs.k', total: 2480, count: 6 },
  { id: 'tp2', handle: 'kore.odu', total: 1740, count: 5 },
  { id: 'tp3', handle: 'arihant.s', total: 1190, count: 8 },
  { id: 'tp4', handle: 'charu', total: 640, count: 3 },
  { id: 'tp5', handle: 'nia.r', total: 420, count: 4 },
];

type Filter = 'ALL' | 'WITH MESSAGE' | 'THIS WEEK';

export default function TipsIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [enabled, setEnabled] = useState(true);
  const [allowMessages, setAllowMessages] = useState(true);
  const [amounts] = useState<number[]>(DEFAULT_AMOUNTS);
  const [filter, setFilter] = useState<Filter>('ALL');
  const [thanked, setThanked] = useState<Record<string, boolean>>({});
  const [openTipper, setOpenTipper] = useState<Tipper | null>(null);

  const total = RECENT_TIPS.reduce((s, t) => s + t.amount, 0);

  const filtered = useMemo(() => {
    if (filter === 'WITH MESSAGE') return TIP_HISTORY.filter((t) => t.note.length > 0);
    if (filter === 'THIS WEEK') return TIP_HISTORY.filter((t) => t.week);
    return TIP_HISTORY;
  }, [filter]);

  const thank = (handle: string, id: string) => {
    setThanked((prev) => ({ ...prev, [id]: true }));
    toast(`Thanked @${handle}.`, 'success');
  };

  return (
    <ScreenFrame
      header={<ModuleHeader eyebrow="MONEY" title="TIPS" />}
      waves={false}
    >
      <RNText style={styles.title}>let people back the work.</RNText>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <RNText style={styles.statLabel}>RECEIVED · 30D</RNText>
          <RNText style={styles.statValue}>₹{total.toLocaleString()}</RNText>
        </View>
        <View style={styles.statBox}>
          <RNText style={styles.statLabel}>TIPPERS</RNText>
          <RNText style={styles.statValue}>{RECENT_TIPS.length}</RNText>
        </View>
      </View>

      <Section eyebrow="SETTINGS">
        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.toggleTitle}>Accept tips</RNText>
            <RNText style={styles.toggleHint}>Show the tip button on your profile and posts.</RNText>
          </View>
          <Switch
            value={enabled}
            onValueChange={setEnabled}
            trackColor={{ false: palette.line, true: palette.ink }}
            thumbColor={palette.bone}
          />
        </View>
        <View style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <RNText style={styles.toggleTitle}>Allow tip messages</RNText>
            <RNText style={styles.toggleHint}>Tippers can write a short note.</RNText>
          </View>
          <Switch
            value={allowMessages}
            onValueChange={setAllowMessages}
            trackColor={{ false: palette.line, true: palette.ink }}
            thumbColor={palette.bone}
          />
        </View>
      </Section>

      <Section eyebrow="SUGGESTED AMOUNTS">
        <View style={styles.chipsRow}>
          {amounts.map((amt) => (
            <View key={amt} style={styles.amountChip}>
              <RNText style={styles.amountChipText}>₹{amt}</RNText>
            </View>
          ))}
        </View>
        <Pressable
          onPress={() => toast('Edit amounts coming soon.', 'default')}
          style={styles.editAmounts}
        >
          <RNText style={styles.editAmountsText}>EDIT AMOUNTS</RNText>
        </Pressable>
      </Section>

      <Section eyebrow="RECENT TIPS">
        {RECENT_TIPS.map((tip) => (
          <ListCell
            key={tip.id}
            icon="heart"
            title={`₹${tip.amount}  ·  @${tip.from}`}
            subtitle={tip.note || `${tip.time} ago`}
            onPress={() => toast(`Thanked @${tip.from}.`, 'success')}
          />
        ))}
      </Section>

      {/* TIP HISTORY — fuller list + filters + per-row THANK */}
      <Section eyebrow="TIP HISTORY">
        <View style={styles.filterRow}>
          {(['ALL', 'WITH MESSAGE', 'THIS WEEK'] as Filter[]).map((f) => (
            <Chip
              key={f}
              label={f}
              size="sm"
              active={filter === f}
              onPress={() => setFilter(f)}
            />
          ))}
        </View>

        {filtered.map((tip) => {
          const done = thanked[tip.id];
          return (
            <View key={tip.id} style={styles.histRow}>
              <View style={styles.avatar}>
                <RNText style={styles.avatarText}>{tip.from.charAt(0).toUpperCase()}</RNText>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.histHead}>
                  <RNText style={styles.histAmount}>₹{tip.amount}</RNText>
                  <RNText style={styles.histHandle} numberOfLines={1}>
                    @{tip.from}
                  </RNText>
                  <RNText style={styles.histTime}>{tip.time}</RNText>
                </View>
                {tip.note ? (
                  <RNText style={styles.histNote} numberOfLines={1}>
                    {tip.note}
                  </RNText>
                ) : null}
              </View>
              <Pressable
                onPress={() => thank(tip.from, tip.id)}
                disabled={done}
                style={[styles.thankBtn, done && styles.thankBtnDone]}
              >
                {done ? (
                  <Ionicons name="checkmark-circle" size={14} color={palette.ink} />
                ) : null}
                <RNText style={[styles.thankText, done && styles.thankTextDone]}>
                  {done ? 'THANKED' : 'THANK'}
                </RNText>
              </Pressable>
            </View>
          );
        })}

        {filtered.length === 0 ? (
          <RNText style={styles.emptyText}>No tips match this filter yet.</RNText>
        ) : null}
      </Section>

      {/* TOP TIPPERS — ranked, tap opens breakdown sheet */}
      <Section eyebrow="TOP TIPPERS">
        {TOP_TIPPERS.map((tp, i) => (
          <Pressable
            key={tp.id}
            onPress={() => setOpenTipper(tp)}
            style={styles.tipperRow}
          >
            <View style={[styles.rankBadge, i === 0 && styles.rankBadgeGold]}>
              <RNText style={[styles.rankText, i === 0 && styles.rankTextGold]}>
                {i + 1}
              </RNText>
            </View>
            <View style={{ flex: 1 }}>
              <RNText style={styles.tipperHandle}>@{tp.handle}</RNText>
              <RNText style={styles.tipperMeta}>{tp.count} tips</RNText>
            </View>
            <RNText style={styles.tipperTotal}>₹{tp.total.toLocaleString()}</RNText>
            <Ionicons name="chevron-forward" size={16} color={palette.ink} />
          </Pressable>
        ))}
      </Section>

      <Sheet
        visible={openTipper !== null}
        onClose={() => setOpenTipper(null)}
        eyebrow="TOP SUPPORTER"
        title={openTipper ? `@${openTipper.handle}` : ''}
      >
        {openTipper ? (
          <View style={{ gap: 12 }}>
            <View style={styles.sheetStatsRow}>
              <View style={styles.sheetStat}>
                <RNText style={styles.sheetStatLabel}>TOTAL GIVEN</RNText>
                <RNText style={styles.sheetStatValue}>₹{openTipper.total.toLocaleString()}</RNText>
              </View>
              <View style={styles.sheetStat}>
                <RNText style={styles.sheetStatLabel}>TIPS</RNText>
                <RNText style={styles.sheetStatValue}>{openTipper.count}</RNText>
              </View>
              <View style={styles.sheetStat}>
                <RNText style={styles.sheetStatLabel}>AVG</RNText>
                <RNText style={styles.sheetStatValue}>
                  ₹{Math.round(openTipper.total / openTipper.count)}
                </RNText>
              </View>
            </View>

            <Pressable
              onPress={() => {
                const h = openTipper.handle;
                setOpenTipper(null);
                toast(`Thanked @${h}.`, 'success');
              }}
              style={styles.sheetCta}
            >
              <RNText style={styles.sheetCtaLabel}>SEND THANKS</RNText>
              <View style={styles.sheetCtaArrow}>
                <Ionicons name="arrow-forward" size={16} color={palette.ink} />
              </View>
            </Pressable>
          </View>
        ) : null}
      </Sheet>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 36,
    lineHeight: 38,
    letterSpacing: -1.6,
    color: palette.ink,
    marginTop: 6,
    marginBottom: 18,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
  },
  statLabel: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
    marginBottom: 6,
  },
  statValue: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    letterSpacing: -0.4,
    color: palette.ink,
  },

  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: palette.line,
  },
  toggleTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: palette.ink,
  },
  toggleHint: {
    ...T.small,
    color: palette.ink,
    opacity: 0.55,
    marginTop: 2,
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amountChip: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.boneSoft,
  },
  amountChipText: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    color: palette.ink,
  },
  editAmounts: {
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  editAmountsText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2.2,
    color: palette.ink,
    opacity: 0.7,
    textTransform: 'uppercase',
  },

  // TIP HISTORY
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  histRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: palette.line,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: palette.ink,
  },
  histHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  histAmount: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  histHandle: {
    ...T.small,
    color: palette.ink,
    opacity: 0.6,
    flexShrink: 1,
  },
  histTime: {
    ...T.small,
    color: palette.ink,
    opacity: 0.4,
    marginLeft: 'auto',
  },
  histNote: {
    ...T.small,
    color: palette.ink,
    opacity: 0.7,
    marginTop: 3,
  },
  thankBtn: {
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: palette.ink,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  thankBtnDone: {
    backgroundColor: palette.boneSoft,
    borderColor: palette.line,
  },
  thankText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: palette.ink,
  },
  thankTextDone: {
    opacity: 0.55,
  },
  emptyText: {
    ...T.small,
    color: palette.ink,
    opacity: 0.5,
    paddingVertical: 14,
  },

  // TOP TIPPERS
  tipperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: palette.line,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankBadgeGold: {
    backgroundColor: palette.acid,
    borderColor: palette.acid,
  },
  rankText: {
    fontFamily: fonts.displayBold,
    fontSize: 13,
    color: palette.ink,
  },
  rankTextGold: {
    color: palette.ink,
  },
  tipperHandle: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: palette.ink,
  },
  tipperMeta: {
    ...T.small,
    color: palette.ink,
    opacity: 0.55,
    marginTop: 2,
  },
  tipperTotal: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.4,
    color: palette.ink,
  },

  // SHEET
  sheetStatsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  sheetStat: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.boneSoft,
  },
  sheetStatLabel: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
    marginBottom: 6,
  },
  sheetStatValue: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    letterSpacing: -0.4,
    color: palette.ink,
  },
  sheetCta: {
    marginTop: 4,
    height: 56,
    borderRadius: 18,
    backgroundColor: palette.ink,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  sheetCtaLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 2.5,
    color: palette.bone,
  },
  sheetCtaArrow: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: palette.bone,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
