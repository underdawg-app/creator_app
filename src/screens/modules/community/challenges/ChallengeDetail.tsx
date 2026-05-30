import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Pressable,
  TextInput,
} from 'react-native';
import { router, useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { Sheet } from '@/components/ui/Sheet';
import { challenges } from '@/data/mock';
import { useStore } from '@/store';

const RULES = [
  'Post to your feed with the challenge tag.',
  'One entry per creator — make it count.',
  'Original work only, made this week.',
  'Keep it under 30 seconds.',
];

export default function ChallengeDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams();
  const challengeId = typeof id === 'string' ? id : undefined;
  const c = challenges.find((x) => x.id === challengeId) ?? challenges[0];

  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const [joined, setJoined] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [caption, setCaption] = useState('');

  const ended = c.daysLeft <= 0;
  const reelRoute = `/(modules)/community/challenges/${c.id}/reel`;
  const leaders = [...c.reel].sort((a, b) => b.likes - a.likes).slice(0, 3);

  const onJoin = () => {
    setJoined(true);
    confetti();
    toast("You're in. Good luck.", 'success');
  };

  const onSubmit = () => {
    setSheetOpen(false);
    setCaption('');
    confetti();
    toast('Entry submitted!', 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="CHALLENGE" title={c.tag} showBack />} waves={false}>
      <RNText style={styles.title} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.6}>
        {c.prompt}
      </RNText>

      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: c.color }]}>
        <RNText style={styles.heroKicker}>PRIZE</RNText>
        <RNText style={styles.heroPrize} numberOfLines={2} adjustsFontSizeToFit minimumFontScale={0.7}>
          {c.prize}
        </RNText>
        <View style={styles.heroMeta}>
          <View style={styles.heroPill}>
            <Ionicons name="time-outline" size={13} color={staticPalette.ink} />
            <RNText style={styles.heroPillText}>{ended ? 'ENDED' : `${c.daysLeft}D LEFT`}</RNText>
          </View>
          <View style={styles.heroPill}>
            <Ionicons name="people-outline" size={13} color={staticPalette.ink} />
            <RNText style={styles.heroPillText}>{c.entries} ENTRIES</RNText>
          </View>
        </View>
      </View>

      {/* Winners note for ended challenges */}
      {ended && (
        <View style={styles.winnerNote}>
          <Ionicons name="trophy-outline" size={16} color={palette.ink} />
          <RNText style={styles.winnerNoteText}>
            Winners announced. Tap the gallery to watch the top entries.
          </RNText>
        </View>
      )}

      {/* Join / Submit CTA */}
      {!joined && !ended ? (
        <Tap onPress={onJoin} style={styles.cta} burstColor={palette.bone}>
          <RNText style={styles.ctaLabel}>JOIN CHALLENGE</RNText>
          <View style={styles.ctaArrow}>
            <Ionicons name="arrow-forward" size={16} color={palette.ink} />
          </View>
        </Tap>
      ) : null}
      {joined && !ended ? (
        <Tap onPress={() => setSheetOpen(true)} style={styles.cta} burstColor={palette.bone}>
          <RNText style={styles.ctaLabel}>SUBMIT ENTRY</RNText>
          <View style={styles.ctaArrow}>
            <Ionicons name="cloud-upload-outline" size={16} color={palette.ink} />
          </View>
        </Tap>
      ) : null}

      {/* Rules */}
      <Section eyebrow="THE RULES" title="how it works.">
        <View style={styles.ruleList}>
          {RULES.map((r, i) => (
            <View key={i} style={styles.ruleRow}>
              <RNText style={styles.ruleNum}>{String(i + 1).padStart(2, '0')}</RNText>
              <RNText style={styles.ruleText}>{r}</RNText>
            </View>
          ))}
        </View>
      </Section>

      {/* Judging */}
      <Section eyebrow="JUDGING">
        <View style={styles.splitRow}>
          <View style={styles.judgeCard}>
            <Ionicons name="heart-outline" size={18} color={palette.ink} />
            <RNText style={styles.judgeBig}>60%</RNText>
            <RNText style={styles.judgeLabel}>community votes</RNText>
          </View>
          <View style={[styles.judgeCard, { backgroundColor: palette.ink }]}>
            <Ionicons name="ribbon-outline" size={18} color={palette.acid} />
            <RNText style={[styles.judgeBig, { color: palette.bone }]}>40%</RNText>
            <RNText style={[styles.judgeLabel, { color: palette.boneMuted }]}>editor pick</RNText>
          </View>
        </View>
      </Section>

      {/* Timeline */}
      <Section eyebrow="TIMELINE">
        <View style={styles.timeline}>
          <View style={styles.tlRow}>
            <View style={[styles.tlDot, { backgroundColor: palette.electric }]} />
            <RNText style={styles.tlText}>
              {ended ? 'Submissions closed' : `Submissions close in ${c.daysLeft}d`}
            </RNText>
          </View>
          <View style={styles.tlLine} />
          <View style={styles.tlRow}>
            <View style={[styles.tlDot, { backgroundColor: palette.acid }]} />
            <RNText style={styles.tlText}>
              {ended ? 'Winners announced' : `Winners announced in ${c.daysLeft + 2}d`}
            </RNText>
          </View>
        </View>
      </Section>

      {/* Entry gallery */}
      <Section
        eyebrow="ENTRY GALLERY"
        title="the field."
        action={{ label: 'OPEN REEL', onPress: () => router.push(reelRoute) }}
      >
        <View style={styles.grid}>
          {c.reel.map((e) => (
            <Pressable key={e.id} style={styles.tile} onPress={() => router.push(reelRoute)}>
              <View style={[styles.tileCover, { backgroundColor: c.color }]}>
                <Ionicons name="play" size={20} color={staticPalette.ink} />
              </View>
              <RNText style={styles.tileHandle} numberOfLines={1}>
                {e.handle}
              </RNText>
              <View style={styles.tileLikes}>
                <Ionicons name="heart" size={11} color={palette.blush} />
                <RNText style={styles.tileLikesText}>{e.likes.toLocaleString()}</RNText>
              </View>
            </Pressable>
          ))}
        </View>
      </Section>

      {/* Leaderboard */}
      <Section eyebrow="LEADERBOARD" title="top three.">
        <View style={{ gap: 8 }}>
          {leaders.map((e, i) => (
            <Pressable key={e.id} style={styles.lbRow} onPress={() => router.push(reelRoute)}>
              <RNText style={[styles.lbRank, i === 0 && { color: palette.ink }]}>{i + 1}</RNText>
              <View style={{ flex: 1 }}>
                <RNText style={styles.lbHandle} numberOfLines={1}>
                  {e.handle}
                </RNText>
                <RNText style={styles.lbCaption} numberOfLines={1}>
                  {e.caption}
                </RNText>
              </View>
              <View style={styles.lbLikes}>
                <Ionicons name="heart" size={12} color={palette.blush} />
                <RNText style={styles.lbLikesText}>{e.likes.toLocaleString()}</RNText>
              </View>
              <Ionicons name="chevron-forward" size={16} color={palette.inkMuted} />
            </Pressable>
          ))}
        </View>
      </Section>

      {/* Submit sheet */}
      <Sheet visible={sheetOpen} onClose={() => setSheetOpen(false)} eyebrow={c.tag} title="submit entry.">
        <RNText style={styles.sheetLabel}>CAPTION</RNText>
        <TextInput
          style={styles.input}
          placeholder="say something about your entry…"
          placeholderTextColor={palette.inkMuted}
          value={caption}
          onChangeText={setCaption}
          multiline
        />
        <Pressable
          style={styles.recordRow}
          onPress={() => toast('Recording captured · ready to submit.', 'success')}
        >
          <Ionicons name="cloud-upload-outline" size={16} color={palette.ink} />
          <RNText style={styles.recordText}>RECORD / UPLOAD</RNText>
        </Pressable>
        <Pressable style={styles.sheetCta} onPress={onSubmit}>
          <RNText style={styles.sheetCtaText}>SUBMIT TO {c.tag}</RNText>
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

    hero: { borderRadius: 20, padding: 22, gap: 6 },
    heroKicker: { ...T.label, color: staticPalette.ink, opacity: 0.55 },
    heroPrize: {
      fontFamily: fonts.displayBold,
      fontSize: 32,
      lineHeight: 34,
      letterSpacing: -1.2,
      color: staticPalette.ink,
    },
    heroMeta: { flexDirection: 'row', gap: 8, marginTop: 10 },
    heroPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      paddingHorizontal: 11,
      height: 28,
      borderRadius: 14,
      backgroundColor: 'rgba(10,10,10,0.10)',
    },
    heroPillText: { fontFamily: fonts.bodyBold, fontSize: 11, letterSpacing: 1, color: staticPalette.ink },

    winnerNote: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginTop: 14,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
    },
    winnerNoteText: { ...T.small, color: palette.ink, flex: 1, lineHeight: 18 },

    cta: {
      marginTop: 16,
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

    ruleList: { gap: 12 },
    ruleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
    ruleNum: { fontFamily: fonts.displayBold, fontSize: 14, color: palette.inkMuted, width: 24 },
    ruleText: { ...T.body, color: palette.ink, flex: 1, lineHeight: 20 },

    splitRow: { flexDirection: 'row', gap: 10 },
    judgeCard: {
      flex: 1,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 16,
      gap: 4,
    },
    judgeBig: { fontFamily: fonts.displayBold, fontSize: 36, letterSpacing: -2, color: palette.ink, marginTop: 6 },
    judgeLabel: { ...T.small, color: palette.inkMuted },

    timeline: {
      borderRadius: 18,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
      padding: 18,
    },
    tlRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    tlDot: { width: 10, height: 10, borderRadius: 5 },
    tlLine: { width: 2, height: 22, backgroundColor: palette.line, marginLeft: 4, marginVertical: 4 },
    tlText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: palette.ink },

    grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    tile: { width: '47%', flexGrow: 1, gap: 6 },
    tileCover: {
      height: 96,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileHandle: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },
    tileLikes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    tileLikesText: { ...T.small, color: palette.inkMuted },

    lbRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 14,
    },
    lbRank: { fontFamily: fonts.displayBold, fontSize: 22, letterSpacing: -1, color: palette.inkMuted, width: 26 },
    lbHandle: { fontFamily: fonts.bodyBold, fontSize: 14, color: palette.ink },
    lbCaption: { ...T.small, color: palette.inkMuted, marginTop: 1 },
    lbLikes: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    lbLikesText: { fontFamily: fonts.bodyBold, fontSize: 13, color: palette.ink },

    sheetLabel: { ...T.label, color: palette.inkMuted, marginBottom: 8 },
    input: {
      minHeight: 80,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      padding: 14,
      fontFamily: fonts.body,
      fontSize: 15,
      color: palette.ink,
      textAlignVertical: 'top',
    },
    recordRow: {
      marginTop: 12,
      height: 52,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.boneSoft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    recordText: { fontFamily: fonts.bodyBold, fontSize: 12, letterSpacing: 2, color: palette.ink },
    sheetCta: {
      marginTop: 14,
      height: 56,
      borderRadius: 16,
      backgroundColor: palette.ink,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sheetCtaText: { fontFamily: fonts.bodyBold, fontSize: 13, letterSpacing: 2, color: palette.bone },
  });
