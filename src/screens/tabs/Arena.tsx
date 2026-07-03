import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { palette as staticPalette, type Palette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { withOpacity } from '@/theme/colorUtils';
import { fonts, type as T } from '@/theme/typography';
import {
  challenges,
  leaderboardWeek,
  leaderboardAllTime,
  type Challenge,
  type LeaderRow,
} from '@/data/mock';
import { Tap } from '@/components/ui/Tap';
import { Image } from '@/components/ui/Image';
import { Asterisk } from '@/components/svg/Marks';
import { Ionicons } from '@/icons';

const IS_ANDROID = Platform.OS === 'android';

type Segment = 'CHALLENGES' | 'LEADERBOARD';
type Window = 'WEEK' | 'ALL';

export default function Arena() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [segment, setSegment] = useState<Segment>('CHALLENGES');
  const [window, setWindow] = useState<Window>('WEEK');

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Asterisk size={10} color={palette.ink} strokeWidth={1.2} />
          <RNText style={styles.kicker} maxFontSizeMultiplier={1.15}>
            ARENA · LIVE
          </RNText>
        </View>

        <View style={styles.heading}>
          <RNText style={styles.headingItalic} maxFontSizeMultiplier={1.1}>
            who's
          </RNText>
          <RNText style={styles.headingLine} maxFontSizeMultiplier={1.1}>
            CHASING
          </RNText>
          <RNText style={styles.headingAccent} maxFontSizeMultiplier={1.1}>
            THE PRIZE?
          </RNText>
        </View>

        <SegmentedToggle value={segment} onChange={setSegment} />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={IS_ANDROID}
          overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        >
          {segment === 'CHALLENGES' ? (
            <ChallengesGrid />
          ) : (
            <LeaderboardView window={window} onChangeWindow={setWindow} />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function SegmentedToggle({
  value,
  onChange,
}: {
  value: Segment;
  onChange: (v: Segment) => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const segs: Segment[] = ['CHALLENGES', 'LEADERBOARD'];
  return (
    <View style={styles.segRow}>
      {segs.map((s) => {
        const active = value === s;
        return (
          <Tap
            key={s}
            onPress={() => onChange(s)}
            style={[styles.segItem, active && styles.segItemActive]}
            burstColor={palette.acid}
          >
            <RNText
              style={[styles.segLabel, active && styles.segLabelActive]}
              maxFontSizeMultiplier={1.1}
            >
              {s}
            </RNText>
            {active ? <View style={styles.segUnderline} /> : null}
          </Tap>
        );
      })}
    </View>
  );
}

function ChallengesGrid() {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.grid}>
      {challenges.map((c, i) => (
        <ChallengeCard key={c.id} c={c} large={i === 0} />
      ))}
    </View>
  );
}

function ChallengeCard({ c, large }: { c: Challenge; large?: boolean }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap
      style={[
        styles.card,
        { backgroundColor: c.color },
        large ? styles.cardLarge : styles.cardSmall,
      ]}
      burstColor={palette.ink}
      variant="heavy"
      onPress={() =>
        router.push(`/(modules)/community/challenges/${c.id}/reel`)
      }
    >
      <View style={styles.cardTop}>
        <RNText style={styles.cardTag} numberOfLines={1} maxFontSizeMultiplier={1.1}>
          {c.tag}
        </RNText>
        <View style={styles.entriesPill}>
          <Ionicons name="play" size={10} color={palette.ink} />
          <RNText style={styles.entriesText}>{c.entries}</RNText>
        </View>
      </View>

      <RNText style={styles.cardPrompt} numberOfLines={3} maxFontSizeMultiplier={1.15}>
        {c.prompt}
      </RNText>

      <View style={styles.audioStrip}>
        <View style={styles.waveformWrap}>
          {Array.from({ length: large ? 22 : 14 }).map((_, i) => {
            const h = 4 + ((i * 13) % 12);
            return <View key={i} style={[styles.waveBar, { height: h }]} />;
          })}
        </View>
        <View style={{ flex: 1 }}>
          <RNText style={styles.audioTitle} numberOfLines={1}>
            {c.audio.title}
          </RNText>
          <RNText style={styles.audioCreator} numberOfLines={1}>
            {c.audio.creator}
          </RNText>
        </View>
      </View>

      <View style={styles.cardMeta}>
        <RNText style={styles.cardMetaText}>{c.daysLeft}D LEFT</RNText>
        <RNText style={styles.cardMetaDot}>·</RNText>
        <RNText style={styles.cardMetaText}>{c.prize}</RNText>
      </View>
    </Tap>
  );
}

function LeaderboardView({
  window,
  onChangeWindow,
}: {
  window: Window;
  onChangeWindow: (w: Window) => void;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  const data = window === 'WEEK' ? leaderboardWeek : leaderboardAllTime;
  return (
    <View>
      <View style={styles.windowRow}>
        <WindowPill label="THIS WEEK" active={window === 'WEEK'} onPress={() => onChangeWindow('WEEK')} />
        <WindowPill label="ALL-TIME" active={window === 'ALL'} onPress={() => onChangeWindow('ALL')} />
      </View>
      <View style={{ gap: 8 }}>
        {data.map((row) => (
          <LeaderRowItem key={row.uid} row={row} />
        ))}
      </View>
    </View>
  );
}

function WindowPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap
      onPress={onPress}
      style={[styles.windowPill, active && styles.windowPillActive]}
      burstColor={palette.acid}
    >
      <RNText style={[styles.windowLabel, active && styles.windowLabelActive]}>
        {label}
      </RNText>
    </Tap>
  );
}

function LeaderRowItem({ row }: { row: LeaderRow }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const isTop3 = row.rank <= 3;
  return (
    <Tap
      onPress={() => router.push('/(tabs)/profile')}
      style={styles.leaderRow}
      burstColor={palette.acid}
    >
      <RNText
        style={[styles.leaderRank, isTop3 && { color: palette.acid }]}
      >
        {String(row.rank).padStart(2, '0')}
      </RNText>
      <Image
        source={{ uri: row.avatarUrl }}
        style={styles.leaderAvatar}
        targetWidth={56}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <RNText style={styles.leaderName} numberOfLines={1}>
          {row.name}
        </RNText>
        <RNText style={styles.leaderHandle} numberOfLines={1}>
          {row.handle} · {row.city}
        </RNText>
      </View>
      <View style={styles.leaderRight}>
        <RNText style={styles.repScore}>{formatRep(row.repScore)}</RNText>
        <View style={styles.deltaChip}>
          <Ionicons name="arrow-up" size={9} color={palette.ink} />
          <RNText style={styles.deltaText}>{row.repDelta}</RNText>
        </View>
      </View>
    </Tap>
  );
}

function formatRep(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

const makeStyles = (palette: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: palette.bone },
    topRow: {
      paddingHorizontal: 20,
      paddingTop: 6,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    kicker: { ...T.label, color: palette.ink, opacity: 0.7 },
    heading: { paddingHorizontal: 20, marginTop: 14, gap: 0 },
    headingItalic: {
      ...T.editorial2,
      color: palette.ink,
    },
    headingLine: {
      ...T.display2,
      color: palette.ink,
    },
    headingAccent: {
      ...T.display2,
      color: palette.acid,
    },
    segRow: {
      flexDirection: 'row',
      marginTop: 22,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: palette.line,
    },
    segItem: {
      paddingVertical: 14,
      paddingHorizontal: 6,
      marginRight: 20,
    },
    segItemActive: {},
    segLabel: {
      ...T.labelLarge,
      color: palette.ink,
      opacity: 0.45,
    },
    segLabelActive: { opacity: 1, color: palette.ink },
    segUnderline: {
      position: 'absolute',
      left: 6,
      right: 26,
      bottom: -1,
      height: 2,
      backgroundColor: palette.acid,
    },
    scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 140 },
    grid: { gap: 14 },
    card: {
      borderRadius: 22,
      padding: 18,
      gap: 12,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    cardLarge: { minHeight: 220 },
    cardSmall: { minHeight: 170 },
    cardTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    cardTag: {
      ...T.editorial3,
      color: palette.ink,
    },
    entriesPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 99,
      backgroundColor: withOpacity(palette.ink, 0.12),
    },
    entriesText: {
      ...T.micro,
      color: palette.ink,
      fontFamily: fonts.bodyBold,
      letterSpacing: 1,
    },
    cardPrompt: {
      ...T.title3,
      color: palette.ink,
      opacity: 0.85,
    },
    audioStrip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      paddingTop: 8,
      borderTopWidth: 1,
      borderTopColor: withOpacity(palette.ink, 0.14),
    },
    waveformWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      height: 16,
    },
    waveBar: {
      width: 2,
      borderRadius: 1,
      backgroundColor: palette.ink,
      opacity: 0.6,
    },
    audioTitle: {
      ...T.label,
      letterSpacing: 1.4,
      color: palette.ink,
      fontFamily: fonts.bodyBold,
    },
    audioCreator: {
      ...T.micro,
      color: palette.ink,
      opacity: 0.6,
      marginTop: 1,
    },
    cardMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    cardMetaText: {
      ...T.micro,
      color: palette.ink,
      opacity: 0.72,
      fontFamily: fonts.bodyBold,
      letterSpacing: 1.2,
    },
    cardMetaDot: { color: palette.ink, opacity: 0.4 },
    windowRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    windowPill: {
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 99,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    windowPillActive: {
      borderColor: palette.ink,
      backgroundColor: palette.ink,
    },
    windowLabel: {
      ...T.label,
      color: palette.ink,
      opacity: 0.7,
    },
    windowLabelActive: { color: palette.acid, opacity: 1 },
    leaderRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 16,
      backgroundColor: palette.paper,
      borderWidth: 1,
      borderColor: palette.line,
    },
    leaderRank: {
      ...T.title2,
      color: palette.ink,
      width: 36,
    },
    leaderAvatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: palette.line,
    },
    leaderName: {
      ...T.body,
      color: palette.ink,
    },
    leaderHandle: {
      ...T.micro,
      color: palette.ink,
      opacity: 0.55,
      fontFamily: fonts.body,
    },
    leaderRight: { alignItems: 'flex-end', gap: 4 },
    repScore: {
      ...T.lead,
      color: palette.ink,
    },
    deltaChip: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 99,
      backgroundColor: palette.acid,
    },
    deltaText: {
      ...T.micro,
      color: palette.ink,
    },
  });
