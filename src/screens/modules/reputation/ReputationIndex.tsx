import React, { useState } from 'react';
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
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { Ticker } from '@/components/ui/Ticker';
import { repBreakdown, analyticsSeed } from '@/data/mock';
import { useStore } from '@/store';

// Realistic ranked ladder: each metal tier splits into three divisions
// (III → II → I, low to high), capped by a single Diamond apex. A score sits
// in the highest rank whose `min` it meets.
type Rank = { key: string; tier: string; div: string; min: number };

const RANKS: Rank[] = [
  { key: 'bronze-3', tier: 'BRONZE', div: 'III', min: 0 },
  { key: 'bronze-2', tier: 'BRONZE', div: 'II', min: 8 },
  { key: 'bronze-1', tier: 'BRONZE', div: 'I', min: 16 },
  { key: 'silver-3', tier: 'SILVER', div: 'III', min: 24 },
  { key: 'silver-2', tier: 'SILVER', div: 'II', min: 32 },
  { key: 'silver-1', tier: 'SILVER', div: 'I', min: 40 },
  { key: 'gold-3', tier: 'GOLD', div: 'III', min: 48 },
  { key: 'gold-2', tier: 'GOLD', div: 'II', min: 56 },
  { key: 'gold-1', tier: 'GOLD', div: 'I', min: 64 },
  { key: 'plat-3', tier: 'PLATINUM', div: 'III', min: 72 },
  { key: 'plat-2', tier: 'PLATINUM', div: 'II', min: 78 },
  { key: 'plat-1', tier: 'PLATINUM', div: 'I', min: 84 },
  { key: 'diamond', tier: 'DIAMOND', div: '', min: 90 },
];

// The five base tiers, for the compact ladder strip.
const BASE_TIERS = ['BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND'];

function rankIndex(score: number) {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) if (score >= RANKS[i].min) idx = i;
  return idx;
}

// "PLATINUM II" — caps, for pills and labels.
const rankLabel = (r: Rank) => (r.div ? `${r.tier} ${r.div}` : r.tier);

// "Platinum II" — title-cased tier, for inline sentence copy.
const pretty = (r: Rank) => {
  const tier = r.tier.charAt(0) + r.tier.slice(1).toLowerCase();
  return r.div ? `${tier} ${r.div}` : tier;
};

export default function ReputationIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const badges = useStore((s) => s.badges);

  const [historyOpen, setHistoryOpen] = useState(false);

  const score = 82;
  const curIdx = rankIndex(score);
  const cur = RANKS[curIdx];
  const next = RANKS[curIdx + 1];
  const toNext = next ? next.min - score : 0;

  // Active base tier + each base tier's entry threshold (its division III).
  const activeBaseIdx = BASE_TIERS.indexOf(cur.tier);
  const baseMin = (t: string) => RANKS.find((r) => r.tier === t)?.min ?? 0;

  // Progress within the current tier toward the next threshold.
  const lo = cur.min;
  const hi = next ? next.min : 100;
  const tierPct = Math.min(100, Math.round(((score - lo) / (hi - lo)) * 100));

  const barColor = (s: number) => (s >= 85 ? palette.acid : s >= 70 ? palette.ink : palette.mute);

  const trend = analyticsSeed.trend;
  const maxTrend = Math.max(...trend);
  const minTrend = Math.min(...trend);
  const growth = analyticsSeed.totals.growth30d;

  // Strongest factor to celebrate, weakest to nudge — derived, not hardcoded.
  const ranked = [...repBreakdown].sort((a, b) => b.score - a.score);
  const strongest = ranked[0];
  const focus = ranked[ranked.length - 1];

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="STANDING" title="REPUTATION" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        your standing.
      </RNText>

      {/* Score hero */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreHero}>
          <ProgressRing size={128} stroke={12} progress={score / 100} color={palette.acid}>
            <View style={styles.ringCenter}>
              <Ticker value={score} style={styles.scoreNum} />
              <RNText style={styles.scoreOf}>/ 100</RNText>
            </View>
          </ProgressRing>

          <View style={styles.scoreInfo}>
            <View style={[styles.tierPill, { backgroundColor: palette.acid }]}>
              <Ionicons name="ribbon-outline" size={13} color={palette.ink} />
              <RNText style={styles.tierPillText}>{rankLabel(cur)}</RNText>
            </View>
            {next ? (
              <RNText style={styles.nextLine}>
                <RNText style={styles.nextStrong}>+{toNext}</RNText> to {pretty(next)}
              </RNText>
            ) : (
              <RNText style={styles.nextLine}>Top rank reached.</RNText>
            )}

            <Pressable onPress={() => setHistoryOpen(true)} style={styles.trendPeek} hitSlop={6}>
              <View style={styles.heroSpark}>
                {trend.map((v, i) => (
                  <View
                    key={i}
                    style={[
                      styles.heroSparkBar,
                      {
                        height: 4 + ((v - minTrend) / (maxTrend - minTrend || 1)) * 18,
                        backgroundColor: i === trend.length - 1 ? palette.electric : palette.ink,
                        opacity: i === trend.length - 1 ? 1 : 0.35,
                      },
                    ]}
                  />
                ))}
              </View>
              <View style={styles.trendMeta}>
                <Ionicons name="trending-up" size={13} color={palette.electric} />
                <RNText style={styles.trendPct}>+{growth.toFixed(1)}%</RNText>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Within-tier progress toward the next threshold */}
        <View style={styles.scoreBarTrack}>
          <View style={[styles.scoreBarFill, { width: `${Math.max(tierPct, 4)}%`, backgroundColor: palette.acid }]} />
        </View>
        <View style={styles.scoreFoot}>
          <RNText style={styles.scoreFootText}>{rankLabel(cur)}</RNText>
          <RNText style={styles.scoreFootText}>{next ? rankLabel(next) : 'MAX'}</RNText>
        </View>
      </View>

      {/* Quick read: strongest + focus factor */}
      <View style={styles.statRow}>
        <View style={[styles.statCard, { borderColor: palette.acid }]}>
          <RNText style={styles.statKicker}>STRONGEST</RNText>
          <RNText style={styles.statValue}>{strongest.score}</RNText>
          <RNText style={styles.statLabel} numberOfLines={1}>
            {strongest.label}
          </RNText>
        </View>
        <View style={styles.statCard}>
          <RNText style={styles.statKicker}>FOCUS HERE</RNText>
          <RNText style={styles.statValue}>{focus.score}</RNText>
          <RNText style={styles.statLabel} numberOfLines={1}>
            {focus.label}
          </RNText>
        </View>
      </View>

      {/* Factors */}
      <Section
        eyebrow="WHAT MOVES IT"
        title="factors."
        action={{ label: 'HISTORY', onPress: () => setHistoryOpen(true) }}
      >
        <View style={{ gap: 14, marginTop: 2 }}>
          {repBreakdown.map((r) => (
            <View key={r.key} style={styles.factorRow}>
              <View style={styles.factorHead}>
                <RNText style={styles.factorLabel} numberOfLines={1}>
                  {r.label}
                </RNText>
                <RNText style={styles.factorWeight}>{r.weight}%</RNText>
                <RNText style={styles.factorScore}>{r.score}</RNText>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[styles.barFill, { width: `${Math.max(r.score, 4)}%`, backgroundColor: barColor(r.score) }]}
                />
              </View>
            </View>
          ))}
        </View>
      </Section>

      {/* Tiers strip */}
      <Section eyebrow="TIERS">
        <View style={styles.tierStrip}>
          {BASE_TIERS.map((t, i) => {
            const active = i === activeBaseIdx;
            return (
              <View key={t} style={[styles.tierStep, active && styles.tierStepActive]}>
                <RNText style={[styles.tierStepText, active && styles.tierStepTextActive]}>{t}</RNText>
                <RNText style={[styles.tierStepMin, active && styles.tierStepTextActive]}>{baseMin(t)}+</RNText>
              </View>
            );
          })}
        </View>
      </Section>

      {/* Improve */}
      <Section eyebrow="MOVE THE NUMBER" title="improve.">
        <ListCell
          icon="time-outline"
          title="Post weekly"
          subtitle="Consistency is 74 — your lowest big factor"
          onPress={() => toast('Streak goal set · post by Sunday.', 'success')}
        />
        <ListCell
          icon="shield-checkmark-outline"
          title="Close a brand deal"
          subtitle="Lifts Brand reliability + Community standing"
          onPress={() => router.push('/(modules)/jobs')}
        />
        <ListCell
          icon="finger-print-outline"
          title="Get ID-verified"
          subtitle="Adds a trust layer to your profile"
          accent={palette.acid}
          onPress={() => router.push('/(modules)/reputation/verification')}
        />
      </Section>

      {/* Deeper links */}
      <Section eyebrow="GO DEEP">
        <ListCell
          icon="trophy-outline"
          title="Badges"
          subtitle={`${badges.filter((b) => b.earned).length} earned · ${badges.filter((b) => !b.earned).length} open`}
          onPress={() => router.push('/(modules)/reputation/badges')}
        />
      </Section>

      {/* Verify CTA */}
      <Tap
        onPress={() => router.push('/(modules)/reputation/verification')}
        style={styles.cta}
        burstColor={palette.bone}
      >
        <RNText style={styles.ctaLabel}>GET VERIFIED</RNText>
        <View style={styles.ctaArrow}>
          <Ionicons name="arrow-forward" size={16} color={palette.ink} />
        </View>
      </Tap>

      {/* Score history sheet */}
      <Sheet visible={historyOpen} onClose={() => setHistoryOpen(false)} eyebrow="LAST 12 WEEKS" title="score history.">
        <View style={styles.sheetCard}>
          <View style={styles.sparkRow}>
            {trend.map((v, i) => (
              <View
                key={i}
                style={[
                  styles.spark,
                  {
                    height: 14 + ((v - minTrend) / (maxTrend - minTrend || 1)) * 60,
                    backgroundColor: i === trend.length - 1 ? palette.acid : palette.ink,
                    opacity: i === trend.length - 1 ? 1 : 0.5,
                  },
                ]}
              />
            ))}
          </View>
          <View style={styles.sheetFoot}>
            <RNText style={styles.sheetFootText}>Trending up</RNText>
            <RNText style={styles.sheetDelta}>+{analyticsSeed.totals.growth30d.toFixed(1)}%</RNText>
          </View>
        </View>
        <RNText style={styles.sheetNote}>
          Reputation is portable. Brands, fans, and managers all see the same number.
        </RNText>
        <Pressable onPress={() => setHistoryOpen(false)} style={styles.sheetDone}>
          <RNText style={styles.sheetDoneText}>DONE</RNText>
        </Pressable>
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

    scoreCard: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 16,
    },
    scoreHero: { flexDirection: 'row', alignItems: 'center', gap: 20 },
    ringCenter: { alignItems: 'center' },
    scoreNum: { fontFamily: fonts.displayBold, fontSize: 44, lineHeight: 46, letterSpacing: -2, color: palette.ink },
    scoreOf: { fontFamily: fonts.body, fontSize: 12, color: palette.inkMuted, marginTop: -2 },

    scoreInfo: { flex: 1, gap: 10, alignItems: 'flex-start' },
    tierPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 12,
      height: 30,
      borderRadius: 15,
    },
    tierPillText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },
    nextLine: { fontFamily: fonts.body, fontSize: 14, color: palette.inkMuted },
    nextStrong: { fontFamily: fonts.displayBold, fontSize: 15, color: palette.ink },
    trendPeek: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    heroSpark: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 22 },
    heroSparkBar: { width: 3, borderRadius: 1.5 },
    trendMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    trendPct: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.electric },

    scoreBarTrack: { height: 10, borderRadius: 5, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    scoreBarFill: { height: 10, borderRadius: 5 },
    scoreFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    scoreFootText: { ...T.label, color: palette.inkMuted },

    statRow: { flexDirection: 'row', gap: 10, marginTop: 12 },
    statCard: {
      flex: 1,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 4,
    },
    statKicker: { ...T.label, color: palette.inkMuted },
    statValue: { fontFamily: fonts.displayBold, fontSize: 32, letterSpacing: -1, color: palette.ink, marginTop: 2 },
    statLabel: { ...T.small, color: palette.inkMuted },

    factorRow: { gap: 8 },
    factorHead: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
    factorLabel: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: -0.1, color: palette.ink, flex: 1 },
    factorWeight: { ...T.label, color: palette.inkMuted },
    factorScore: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, width: 30, textAlign: 'right' },
    barTrack: { height: 6, borderRadius: 3, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    barFill: { height: 6, borderRadius: 3 },

    tierStrip: { flexDirection: 'row', gap: 5 },
    tierStep: {
      flex: 1,
      paddingVertical: 9,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      alignItems: 'center',
      gap: 2,
    },
    tierStepActive: { backgroundColor: palette.ink, borderColor: palette.ink },
    tierStepText: { fontFamily: fonts.bodyBold, fontSize: 9, letterSpacing: 0.6, color: palette.inkMuted },
    tierStepMin: { fontFamily: fonts.body, fontSize: 9, color: palette.inkMuted },
    tierStepTextActive: { color: palette.bone },

    cta: {
      marginTop: 20,
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

    sheetCard: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 14,
    },
    sparkRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: 76 },
    spark: { flex: 1, borderRadius: 3 },
    sheetFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    sheetFootText: { ...T.small, color: palette.inkMuted },
    sheetDelta: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },
    sheetNote: { ...T.body, color: palette.inkMuted, marginTop: 14, lineHeight: 20 },
    sheetDone: {
      marginTop: 18,
      height: 52,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetDoneText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2, color: palette.bone },
  });
