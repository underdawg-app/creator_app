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
import { repBreakdown, analyticsSeed } from '@/data/mock';
import { useStore } from '@/store';

const TIERS = [
  { key: 'emerging', label: 'EMERGING', min: 0 },
  { key: 'bronze', label: 'BRONZE', min: 31 },
  { key: 'silver', label: 'SILVER', min: 51 },
  { key: 'gold', label: 'GOLD', min: 71 },
  { key: 'platinum', label: 'PLATINUM', min: 86 },
];

function tierIndex(score: number) {
  let idx = 0;
  for (let i = 0; i < TIERS.length; i++) if (score >= TIERS[i].min) idx = i;
  return idx;
}

export default function ReputationIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const badges = useStore((s) => s.badges);

  const [historyOpen, setHistoryOpen] = useState(false);

  const score = 82;
  const curIdx = tierIndex(score);
  const cur = TIERS[curIdx];
  const next = TIERS[curIdx + 1];
  const toNext = next ? next.min - score : 0;

  // Progress within the current tier toward the next threshold.
  const lo = cur.min;
  const hi = next ? next.min : 100;
  const tierPct = Math.min(100, Math.round(((score - lo) / (hi - lo)) * 100));

  const barColor = (s: number) => (s >= 85 ? palette.acid : s >= 70 ? palette.ink : palette.mute);

  const trend = analyticsSeed.trend;
  const maxTrend = Math.max(...trend);
  const minTrend = Math.min(...trend);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="STANDING" title="REPUTATION" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        your standing.
      </RNText>

      {/* Score hero */}
      <View style={styles.scoreCard}>
        <View style={styles.scoreTop}>
          <View style={styles.scoreNumWrap}>
            <RNText style={styles.scoreNum}>{score}</RNText>
            <RNText style={styles.scoreOf}>/ 100</RNText>
          </View>
          <View style={[styles.tierPill, { backgroundColor: palette.acid }]}>
            <Ionicons name="ribbon-outline" size={13} color={palette.ink} />
            <RNText style={styles.tierPillText}>{cur.label}</RNText>
          </View>
        </View>

        <View style={styles.scoreBarTrack}>
          <View style={[styles.scoreBarFill, { width: `${Math.max(tierPct, 4)}%`, backgroundColor: palette.acid }]} />
        </View>
        <View style={styles.scoreFoot}>
          <RNText style={styles.scoreFootText}>{cur.label}</RNText>
          {next ? (
            <RNText style={styles.scoreFootText}>
              +{toNext} to {next.label.charAt(0) + next.label.slice(1).toLowerCase()}
            </RNText>
          ) : (
            <RNText style={styles.scoreFootText}>top tier</RNText>
          )}
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
          {TIERS.map((t, i) => {
            const active = i === curIdx;
            return (
              <View key={t.key} style={[styles.tierStep, active && styles.tierStepActive]}>
                <RNText style={[styles.tierStepText, active && styles.tierStepTextActive]}>{t.label}</RNText>
                <RNText style={[styles.tierStepMin, active && styles.tierStepTextActive]}>{t.min}+</RNText>
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
      gap: 14,
    },
    scoreTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    scoreNumWrap: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
    scoreNum: { fontFamily: fonts.displayBold, fontSize: 72, lineHeight: 66, letterSpacing: -4, color: palette.ink },
    scoreOf: { fontFamily: fonts.body, fontSize: 16, color: palette.inkMuted, marginBottom: 8 },
    tierPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 12,
      height: 30,
      borderRadius: 15,
    },
    tierPillText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1.6, color: palette.ink },

    scoreBarTrack: { height: 10, borderRadius: 5, backgroundColor: palette.boneSoft, overflow: 'hidden' },
    scoreBarFill: { height: 10, borderRadius: 5 },
    scoreFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    scoreFootText: { ...T.label, color: palette.inkMuted },

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
