import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Pressable, ScrollView } from 'react-native';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MetricCard } from '@/components/ui/MetricCard';
import { Chip } from '@/components/ui/Chip';
import { Tap } from '@/components/ui/Tap';
import { challenges } from '@/data/mock';
import { useStore } from '@/store';

type Phase = 'ACTIVE' | 'UPCOMING' | 'ENDED';
type Cat = 'ALL' | 'ART' | 'MUSIC' | 'FILM' | 'DANCE';

type Card = {
  id: string;
  tag: string;
  prompt: string;
  prize: string;
  daysLeft: number;
  entries: number;
  color: string;
  phase: Phase;
  note: string;
  winner?: string;
};

const PHASES: Phase[] = ['ACTIVE', 'UPCOMING', 'ENDED'];
const CATS: Cat[] = ['ALL', 'ART', 'MUSIC', 'FILM', 'DANCE'];

// Loose tag→category mapping. Falls back to ART so every card lands somewhere.
function catOf(tag: string, prompt: string): Cat {
  const s = `${tag} ${prompt}`.toLowerCase();
  if (/dance|move|choreo|step/.test(s)) return 'DANCE';
  if (/track|sound|song|music|audio|beat|bus/.test(s)) return 'MUSIC';
  if (/film|minute|rain|reel|shoot|frame|monsoon/.test(s)) return 'FILM';
  return 'ART';
}

export default function ChallengesIndex() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  const [phase, setPhase] = useState<Phase>('ACTIVE');
  const [cat, setCat] = useState<Cat>('ALL');
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  // Active = real seed. Upcoming + ended are fabricated locally.
  const cards: Card[] = useMemo(() => {
    const active: Card[] = challenges.map((c) => ({
      id: c.id,
      tag: c.tag,
      prompt: c.prompt,
      prize: c.prize,
      daysLeft: c.daysLeft,
      entries: c.entries,
      color: c.color,
      phase: 'ACTIVE',
      note: `${c.daysLeft}D LEFT`,
    }));

    const upcoming: Card[] = [
      {
        id: 'u1',
        tag: '#SLOWMOTION',
        prompt: 'one dance, half speed, no cuts',
        prize: '₹30,000 + STAGE SLOT',
        daysLeft: 3,
        entries: 0,
        color: '#FF5A1F',
        phase: 'UPCOMING',
        note: 'STARTS IN 3D',
      },
      {
        id: 'u2',
        tag: '#FIRSTLIGHT',
        prompt: 'shoot a film before sunrise',
        prize: '₹45,000 + GEAR KIT',
        daysLeft: 6,
        entries: 0,
        color: '#2E5BFF',
        phase: 'UPCOMING',
        note: 'STARTS IN 6D',
      },
    ];

    const ended: Card[] = [
      {
        id: 'e1',
        tag: '#GHOSTNOTE',
        prompt: 'a song built from one sampled breath',
        prize: '₹50,000 + LABEL INTRO',
        daysLeft: 0,
        entries: 341,
        color: '#FF6BB5',
        phase: 'ENDED',
        note: 'CLOSED',
        winner: '@kore.odu',
      },
    ];

    return [...active, ...upcoming, ...ended];
  }, []);

  const phaseCards = cards.filter((c) => c.phase === phase);
  const filtered = phaseCards.filter((c) => cat === 'ALL' || catOf(c.tag, c.prompt) === cat);

  const activeCount = cards.filter((c) => c.phase === 'ACTIVE').length;
  const yourEntries = 2;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMMUNITY" title="CHALLENGES" />} waves={false}>
      <RNText style={styles.title} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.7}>
        compete.
      </RNText>

      <View style={styles.metricGrid}>
        <View style={{ flex: 1 }}>
          <MetricCard label="ACTIVE NOW" value={activeCount} accent={palette.acid} />
        </View>
        <View style={{ flex: 1 }}>
          <MetricCard label="YOUR ENTRIES" value={yourEntries} accent={palette.blush} />
        </View>
      </View>

      {/* Phase tabs */}
      <View style={styles.tabRow}>
        {PHASES.map((p) => (
          <Chip key={p} label={p} active={phase === p} onPress={() => setPhase(p)} />
        ))}
      </View>

      {/* Category filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
        style={styles.catScroll}
      >
        {CATS.map((c) => (
          <Chip key={c} label={c} size="sm" active={cat === c} accent={palette.electric} onPress={() => setCat(c)} />
        ))}
      </ScrollView>

      {filtered.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="trophy-outline" size={22} color={palette.inkMuted} />
          <RNText style={styles.emptyText}>Nothing here yet. Try another category.</RNText>
        </View>
      ) : (
        <View style={styles.list}>
          {filtered.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => router.push(`/(modules)/community/challenges/${c.id}` as any)}
              style={styles.card}
            >
              <View style={[styles.stripe, { backgroundColor: c.color }]} />
              <View style={styles.cardBody}>
                <View style={styles.cardHead}>
                  <RNText style={styles.cardTag} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                    {c.tag}
                  </RNText>
                  <Ionicons name="chevron-forward" size={18} color={palette.inkMuted} />
                </View>

                <RNText style={styles.cardPrompt} numberOfLines={2} maxFontSizeMultiplier={1.2}>
                  {c.prompt}
                </RNText>

                <View style={styles.prizeRow}>
                  <View style={styles.prizePill}>
                    <Ionicons name="ribbon-outline" size={12} color={palette.ink} />
                    <RNText style={styles.prizeText} numberOfLines={1}>
                      {c.prize}
                    </RNText>
                  </View>
                </View>

                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Ionicons name="time-outline" size={13} color={palette.inkMuted} />
                    <RNText style={styles.metaText}>{c.note}</RNText>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="people-outline" size={13} color={palette.inkMuted} />
                    <RNText style={styles.metaText}>{c.entries} ENTRIES</RNText>
                  </View>
                </View>

                {c.phase === 'ENDED' && c.winner ? (
                  <View style={styles.winnerRow}>
                    <Ionicons name="trophy-outline" size={14} color={palette.ink} />
                    <RNText style={styles.winnerText}>
                      Winner <RNText style={styles.winnerHandle}>{c.winner}</RNText>
                    </RNText>
                  </View>
                ) : null}

                {c.phase === 'ACTIVE' ? (
                  <Tap
                    onPress={() => {
                      setJoined((j) => ({ ...j, [c.id]: true }));
                      toast('Joined — create your entry.', 'success');
                    }}
                    style={[styles.joinBtn, joined[c.id] && styles.joinBtnDone]}
                    burstColor={c.color}
                  >
                    {joined[c.id] ? (
                      <>
                        <Ionicons name="checkmark-circle" size={15} color={palette.ink} />
                        <RNText style={styles.joinText}>JOINED</RNText>
                      </>
                    ) : (
                      <>
                        <Ionicons name="add" size={16} color={palette.bone} />
                        <RNText style={[styles.joinText, { color: palette.bone }]}>JOIN</RNText>
                      </>
                    )}
                  </Tap>
                ) : null}

                {c.phase === 'UPCOMING' ? (
                  <Tap
                    onPress={() => toast('Reminder set for launch.', 'success')}
                    style={styles.remindBtn}
                    burstColor={c.color}
                  >
                    <Ionicons name="time-outline" size={14} color={palette.ink} />
                    <RNText style={styles.remindText}>REMIND ME</RNText>
                  </Tap>
                ) : null}
              </View>
            </Pressable>
          ))}
        </View>
      )}

      <Tap onPress={() => router.push('/(modules)/community')} style={styles.backRow} burstColor={palette.ink}>
        <Ionicons name="chatbubbles-outline" size={16} color={palette.ink} />
        <RNText style={styles.backText}>BACK TO COMMUNITY</RNText>
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

    metricGrid: { flexDirection: 'row', gap: 10 },

    tabRow: { flexDirection: 'row', gap: 8, marginTop: 18 },

    catScroll: { marginTop: 12, marginHorizontal: -2 },
    catRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 2 },

    list: { gap: 12, marginTop: 18 },
    card: {
      flexDirection: 'row',
      borderRadius: 20,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      overflow: 'hidden',
    },
    stripe: { width: 6 },
    cardBody: { flex: 1, padding: 18, gap: 10 },

    cardHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    cardTag: {
      fontFamily: fonts.displayBold,
      fontSize: 26,
      letterSpacing: -1.1,
      color: palette.ink,
      flex: 1,
    },
    cardPrompt: { ...T.body, color: palette.inkMuted, lineHeight: 20 },

    prizeRow: { flexDirection: 'row' },
    prizePill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingHorizontal: 12,
      height: 30,
      borderRadius: 15,
      backgroundColor: palette.acid,
      maxWidth: '100%',
    },
    prizeText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 0.4, color: palette.ink, flexShrink: 1 },

    metaRow: { flexDirection: 'row', gap: 18, marginTop: 2 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    metaText: { ...T.label, color: palette.inkMuted },

    winnerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 7,
      marginTop: 2,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: palette.line,
    },
    winnerText: { fontFamily: fonts.body, fontSize: 13, color: palette.inkMuted },
    winnerHandle: { fontFamily: fonts.bodyBold, color: palette.ink },

    joinBtn: {
      marginTop: 4,
      height: 44,
      borderRadius: 14,
      backgroundColor: palette.ink,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
    },
    joinBtnDone: { backgroundColor: palette.boneSoft, borderWidth: 1, borderColor: palette.line },
    joinText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },

    remindBtn: {
      marginTop: 4,
      height: 44,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 7,
    },
    remindText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },

    empty: {
      marginTop: 24,
      alignItems: 'center',
      gap: 10,
      paddingVertical: 36,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    emptyText: { ...T.body, color: palette.inkMuted },

    backRow: {
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
    backText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
  });
