import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { analyticsSeed } from '@/data/mock';
import { useStore } from '@/store';

type Insight = (typeof analyticsSeed.ai)[number];

// Pull the @handle out of a COLLAB insight title for the MESSAGE button.
function handleFor(i: Insight): string | null {
  const m = i.title.match(/@[\w.]+/);
  return m ? m[0] : null;
}

export default function AnalyticsAiInsights() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  // Local lifecycle: 'applied' cards leave the active list; 'snoozed' too.
  const [applied, setApplied] = useState<string[]>([]);
  const [snoozed, setSnoozed] = useState<string[]>([]);

  const active = useMemo(
    () => analyticsSeed.ai.filter((i) => !applied.includes(i.id) && !snoozed.includes(i.id)),
    [applied, snoozed],
  );

  const apply = (i: Insight) => {
    setApplied((prev) => (prev.includes(i.id) ? prev : [...prev, i.id]));
    toast('Added to your plan.', 'success');
  };
  const snooze = (i: Insight) => {
    setSnoozed((prev) => (prev.includes(i.id) ? prev : [...prev, i.id]));
    toast('Snoozed 7 days.', 'default');
  };
  const reset = () => {
    setApplied([]);
    setSnoozed([]);
    toast('Insights restored.', 'default');
  };

  const total = analyticsSeed.ai.length;
  const handled = applied.length + snoozed.length;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ANALYTICS" title="AI INSIGHTS" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.6}>
        what to do next.
      </RNText>
      <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
        Specific moves for this week. Not a dashboard.
      </RNText>

      {/* Progress header */}
      <View style={styles.statRow}>
        <View style={styles.statCol}>
          <RNText style={styles.statLabel}>APPLIED</RNText>
          <RNText style={styles.statValue}>{applied.length}</RNText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCol}>
          <RNText style={styles.statLabel}>ACTIVE</RNText>
          <RNText style={styles.statValue}>{active.length}</RNText>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statCol}>
          <RNText style={styles.statLabel}>OF</RNText>
          <RNText style={[styles.statValue, { opacity: 0.5 }]}>{total}</RNText>
        </View>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${Math.max((handled / total) * 100, 2)}%` }]} />
      </View>

      {/* Insight cards */}
      <View style={styles.list}>
        {active.map((i) => {
          const at = handleFor(i);
          return (
            <View key={i.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={[styles.kindPill, { backgroundColor: i.accent }]}>
                  <RNText style={styles.kindText} maxFontSizeMultiplier={1.1}>
                    {i.kind}
                  </RNText>
                </View>
                <View style={[styles.dot, { backgroundColor: i.accent }]} />
              </View>

              <RNText
                style={styles.cardTitle}
                numberOfLines={3}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                maxFontSizeMultiplier={1.1}
              >
                {i.title}
              </RNText>
              <RNText style={styles.cardBody} maxFontSizeMultiplier={1.2}>
                {i.body}
              </RNText>

              {/* Actions */}
              <View style={styles.actions}>
                <Pressable onPress={() => snooze(i)} style={styles.snoozeBtn}>
                  <Ionicons name="time-outline" size={14} color={palette.ink} />
                  <RNText style={styles.snoozeText}>SNOOZE</RNText>
                </Pressable>
                <Pressable onPress={() => apply(i)} style={styles.applyBtn}>
                  <RNText style={styles.applyText}>APPLY</RNText>
                  <Ionicons name="checkmark-circle" size={15} color={palette.bone} />
                </Pressable>
              </View>

              {i.kind === 'COLLAB' && at ? (
                <Pressable
                  onPress={() => {
                    toast(`Opening chat with ${at}.`, 'success');
                    router.push('/(tabs)/inbox');
                  }}
                  style={styles.messageRow}
                >
                  <Ionicons name="chatbubble-ellipses-outline" size={15} color={palette.ink} />
                  <RNText style={styles.messageText}>MESSAGE {at}</RNText>
                  <Ionicons name="arrow-forward" size={14} color={palette.ink} />
                </Pressable>
              ) : null}
            </View>
          );
        })}
      </View>

      {/* Empty state */}
      {active.length === 0 ? (
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Ionicons name="sparkles-outline" size={22} color={palette.ink} />
          </View>
          <RNText style={styles.emptyTitle}>all handled.</RNText>
          <RNText style={styles.emptyBody}>
            {applied.length} applied · {snoozed.length} snoozed. Fresh insights drop weekly.
          </RNText>
          <Pressable onPress={reset} style={styles.resetBtn}>
            <Ionicons name="sync-outline" size={14} color={palette.bone} />
            <RNText style={styles.resetText}>RESTORE INSIGHTS</RNText>
          </Pressable>
        </View>
      ) : null}

      {/* Footer link to full analytics */}
      <Pressable onPress={() => router.push('/(modules)/analytics')} style={styles.footLink}>
        <RNText style={styles.footText}>OPEN FULL ANALYTICS</RNText>
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
    },
    sub: { ...T.body, color: palette.ink, opacity: 0.62, marginTop: 8, maxWidth: 320 },

    statRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 22,
      padding: 16,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    statCol: { flex: 1, alignItems: 'center' },
    statDivider: { width: 1, height: 30, backgroundColor: palette.line },
    statLabel: { ...T.label, color: palette.inkMuted },
    statValue: {
      fontFamily: fonts.displayBold,
      fontSize: 26,
      letterSpacing: -1,
      color: palette.ink,
      marginTop: 4,
    },
    barTrack: {
      height: 6,
      borderRadius: 3,
      backgroundColor: palette.boneSoft,
      overflow: 'hidden',
      marginTop: 12,
    },
    barFill: { height: 6, borderRadius: 3, backgroundColor: palette.ink },

    list: { marginTop: 22, gap: 12 },
    card: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
      gap: 12,
    },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    kindPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
    kindText: { ...T.micro, color: palette.ink },
    dot: { width: 8, height: 8, borderRadius: 4 },
    cardTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 22,
      lineHeight: 24,
      letterSpacing: -0.8,
      color: palette.ink,
    },
    cardBody: { ...T.body, color: palette.ink, opacity: 0.7, maxWidth: 340 },

    actions: { flexDirection: 'row', gap: 8, marginTop: 2 },
    snoozeBtn: {
      flex: 1,
      height: 44,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    snoozeText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2, color: palette.ink },
    applyBtn: {
      flex: 1.4,
      height: 44,
      borderRadius: 14,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
    },
    applyText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2, color: palette.bone },

    messageRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    messageText: {
      flex: 1,
      fontFamily: fonts.bodyBold,
      fontSize: 11,
      letterSpacing: 1.6,
      color: palette.ink,
    },

    empty: {
      marginTop: 24,
      alignItems: 'center',
      padding: 28,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      gap: 8,
    },
    emptyIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    emptyTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 28,
      letterSpacing: -1,
      color: palette.ink,
    },
    emptyBody: { ...T.small, color: palette.inkMuted, textAlign: 'center', maxWidth: 260 },
    resetBtn: {
      marginTop: 12,
      height: 46,
      paddingHorizontal: 20,
      borderRadius: 14,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    resetText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 2, color: palette.bone },

    footLink: {
      marginTop: 22,
      height: 48,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
    },
    footText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
