import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

type Filter = 'ALL' | 'EARNED' | 'LOCKED';
type Badge = { key: string; name: string; earned: boolean; note: string };

// Deterministic fake progress for a locked badge, derived from its key so the
// number is stable across renders (no random jitter).
function lockedProgress(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return 25 + (h % 60); // 25–84%
}

export default function ReputationBadges() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const badges = useStore((s) => s.badges) as Badge[];
  const toast = useStore((s) => s.toast);

  const [filter, setFilter] = useState<Filter>('ALL');
  const [open, setOpen] = useState<Badge | null>(null);

  const earnedCount = useMemo(() => badges.filter((b) => b.earned).length, [badges]);
  const total = badges.length;

  const nextBadge = useMemo(() => {
    // Nearest locked badge by fake progress = the obvious "next up".
    const locked = badges.filter((b) => !b.earned);
    if (!locked.length) return null;
    return locked.reduce((best, b) =>
      lockedProgress(b.key) > lockedProgress(best.key) ? b : best,
    );
  }, [badges]);

  const visible = useMemo(() => {
    if (filter === 'EARNED') return badges.filter((b) => b.earned);
    if (filter === 'LOCKED') return badges.filter((b) => !b.earned);
    return badges;
  }, [badges, filter]);

  const openPct = open && !open.earned ? lockedProgress(open.key) : 0;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="REPUTATION" title="BADGES" />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        what you've{'\n'}earned.
      </RNText>

      {/* Stat row: earned count + next-badge hint */}
      <View style={styles.statRow}>
        <View style={{ flex: 1 }}>
          <MetricCard
            label={`EARNED · OF ${total}`}
            value={earnedCount}
            suffix={`/ ${total}`}
            size="md"
            accent={palette.acid}
          />
        </View>
        <Pressable
          onPress={() => nextBadge && setOpen(nextBadge)}
          style={styles.nextCard}
          disabled={!nextBadge}
        >
          <RNText style={styles.nextKicker}>NEXT UP</RNText>
          {nextBadge ? (
            <>
              <RNText style={styles.nextName} numberOfLines={2}>
                {nextBadge.name}
              </RNText>
              <View style={styles.nextBarTrack}>
                <View
                  style={[styles.nextBarFill, { width: `${lockedProgress(nextBadge.key)}%` }]}
                />
              </View>
              <RNText style={styles.nextPct}>{lockedProgress(nextBadge.key)}% there</RNText>
            </>
          ) : (
            <RNText style={styles.nextName}>All earned.</RNText>
          )}
        </Pressable>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {(['ALL', 'EARNED', 'LOCKED'] as Filter[]).map((f) => (
          <Chip
            key={f}
            label={f === 'ALL' ? `ALL · ${total}` : f === 'EARNED' ? `EARNED · ${earnedCount}` : `LOCKED · ${total - earnedCount}`}
            active={filter === f}
            onPress={() => setFilter(f)}
          />
        ))}
      </ScrollView>

      {/* 2-col grid */}
      <View style={styles.grid}>
        {visible.map((b) => {
          if (b.earned) {
            return (
              <Tap
                key={b.key}
                onPress={() => setOpen(b)}
                burstColor={palette.acid}
                style={[styles.badge, { backgroundColor: palette.acid }]}
              >
                <View style={styles.badgeTop}>
                  <Ionicons name="ribbon-outline" size={20} color={palette.ink} />
                  <Ionicons name="checkmark-circle" size={18} color={palette.ink} />
                </View>
                <RNText
                  style={[styles.badgeName, { color: palette.ink }]}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {b.name}
                </RNText>
                <RNText style={[styles.badgeNote, { color: palette.ink }]} numberOfLines={2}>
                  {b.note}
                </RNText>
              </Tap>
            );
          }
          return (
            <Tap
              key={b.key}
              onPress={() => setOpen(b)}
              burstColor={palette.ink}
              style={styles.badgeLocked}
            >
              <View style={styles.badgeTop}>
                <Ionicons name="ribbon-outline" size={20} color={palette.inkMuted} />
                <Ionicons name="lock-closed-outline" size={16} color={palette.inkMuted} />
              </View>
              <RNText
                style={[styles.badgeName, { color: palette.inkMuted }]}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {b.name}
              </RNText>
              <RNText style={[styles.badgeNote, { color: palette.inkMuted }]} numberOfLines={2}>
                {b.note}
              </RNText>
              <View style={styles.lockedBarTrack}>
                <View style={[styles.lockedBarFill, { width: `${lockedProgress(b.key)}%` }]} />
              </View>
            </Tap>
          );
        })}
      </View>

      {/* Detail sheet */}
      <Sheet
        visible={!!open}
        onClose={() => setOpen(null)}
        eyebrow={open?.earned ? 'EARNED' : 'LOCKED'}
        title={open?.name ?? ''}
      >
        {open && (
          <View style={{ gap: 16 }}>
            <View
              style={[
                styles.sheetStatus,
                { backgroundColor: open.earned ? palette.acid : palette.boneSoft },
              ]}
            >
              <Ionicons
                name={open.earned ? 'checkmark-circle' : 'lock-closed-outline'}
                size={18}
                color={palette.ink}
              />
              <RNText style={styles.sheetStatusText}>
                {open.earned ? 'Unlocked and in your case.' : `${openPct}% of the way there.`}
              </RNText>
            </View>

            <View>
              <RNText style={styles.sheetKicker}>HOW TO EARN</RNText>
              <RNText style={styles.sheetBody}>{open.note}</RNText>
            </View>

            {!open.earned && (
              <View>
                <View style={styles.sheetBarTrack}>
                  <View style={[styles.sheetBarFill, { width: `${openPct}%` }]} />
                </View>
                <RNText style={styles.sheetPct}>{openPct}% complete</RNText>
              </View>
            )}

            <Tap
              onPress={() => {
                if (open.earned) {
                  toast('Shared to your profile.', 'success');
                } else {
                  toast(`Tracking "${open.name}".`, 'default');
                }
                setOpen(null);
              }}
              style={styles.cta}
              burstColor={palette.bone}
            >
              <RNText style={styles.ctaLabel}>{open.earned ? 'SHARE BADGE' : 'TRACK PROGRESS'}</RNText>
              <View style={styles.ctaArrow}>
                <Ionicons name="arrow-forward" size={16} color={palette.ink} />
              </View>
            </Tap>
          </View>
        )}
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

    statRow: { flexDirection: 'row', gap: 10 },
    nextCard: {
      flex: 1,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      minHeight: 120,
      justifyContent: 'center',
      gap: 6,
    },
    nextKicker: { ...T.label, color: palette.inkMuted },
    nextName: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.3,
      color: palette.ink,
    },
    nextBarTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.boneSoft,
      overflow: 'hidden',
      marginTop: 2,
    },
    nextBarFill: { height: 6, borderRadius: 3, backgroundColor: palette.electric },
    nextPct: { ...T.micro, color: palette.inkMuted },

    chips: { gap: 8, paddingVertical: 18 },

    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    badge: {
      flexBasis: '47.5%',
      flexGrow: 1,
      borderRadius: 18,
      padding: 16,
      gap: 6,
      minHeight: 150,
    },
    badgeLocked: {
      flexBasis: '47.5%',
      flexGrow: 1,
      borderRadius: 18,
      padding: 16,
      gap: 6,
      minHeight: 150,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    badgeTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    badgeName: {
      fontFamily: fonts.displayBold,
      fontSize: 16,
      letterSpacing: -0.3,
      marginTop: 12,
    },
    badgeNote: { ...T.micro, opacity: 0.8, marginTop: 2 },
    lockedBarTrack: {
      height: 5,
      borderRadius: 3,
      backgroundColor: palette.line,
      overflow: 'hidden',
      marginTop: 'auto',
    },
    lockedBarFill: { height: 5, borderRadius: 3, backgroundColor: palette.inkMuted },

    sheetStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      padding: 14,
      borderRadius: 16,
    },
    sheetStatusText: {
      fontFamily: fonts.bodyBold,
      fontSize: 14,
      letterSpacing: -0.2,
      color: palette.ink,
    },
    sheetKicker: { ...T.label, color: palette.inkMuted, marginBottom: 6 },
    sheetBody: {
      fontFamily: fonts.body,
      fontSize: 15,
      lineHeight: 22,
      color: palette.ink,
    },
    sheetBarTrack: {
      height: 8,
      borderRadius: 4,
      backgroundColor: palette.boneSoft,
      overflow: 'hidden',
    },
    sheetBarFill: { height: 8, borderRadius: 4, backgroundColor: palette.acid },
    sheetPct: { ...T.label, color: palette.inkMuted, marginTop: 8 },

    cta: {
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
  });
