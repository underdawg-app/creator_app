// CommunityIntro — the welcoming landing for the Community module. First-timers
// land here (CommunityIndex redirects when !communityOnboarded). It explains
// what the room is, lets the creator pick the scenes that shape their feed
// (persisted via the store), links into every sub-section, and hands off to the
// live community index. Rebuilt on the shared design system (ScreenFrame /
// ModuleHeader / Section / ListCell) to match PortfolioIndex.

import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text as RNText, Dimensions } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { Chip } from '@/components/ui/Chip';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Image } from '@/components/ui/Image';
import { RuleDot, Asterisk } from '@/components/svg/Marks';
import { useStore } from '@/store';
import { communityScenes } from '@/data/mock';

const { width } = Dimensions.get('window');
const HERO_OBJ = require('@/objects/obj-2.png');
const OBJ_SIZE = Math.min(width * 0.5, 220);

const VALUE_PROPS = [
  'Share wins, name the struggles',
  'Tips, feedback, and honest answers',
  'Challenges, rooms, mentors, collabs',
];

const CRAFTS = communityScenes.filter((s) => s.kind === 'CRAFT');
const ROOMS = communityScenes.filter((s) => s.kind === 'ROOM');

export default function CommunityIntro() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const setCommunityOnboarded = useStore((s) => s.setCommunityOnboarded);
  const setCommunityInterests = useStore((s) => s.setCommunityInterests);

  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (key: string) =>
    setPicked((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));

  // Persist the chosen scenes, flip the onboard flag, and drop into the hub.
  const enter = (interests: string[]) => {
    setCommunityInterests(interests);
    setCommunityOnboarded(true);
    router.replace('/(modules)/community');
  };

  const ctaLabel = useMemo(
    () => (picked.length ? `ENTER COMMUNITY · ${picked.length}` : 'ENTER COMMUNITY'),
    [picked.length],
  );

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          eyebrow="COMMUNITY"
          title="THE ROOM"
          showBack={false}
          left={<View style={{ width: 38, height: 38 }} />}
        />
      }
    >
      {/* ===== Hero ===== */}
      <View style={styles.hero}>
        <View style={styles.heroObjWrap} pointerEvents="none">
          <Image source={HERO_OBJ} style={{ width: OBJ_SIZE, height: OBJ_SIZE }} contentFit="contain" />
        </View>

        <RNText style={styles.eyebrow} maxFontSizeMultiplier={1.1}>
          WELCOME TO THE ROOM
        </RNText>
        <RNText style={styles.heroTitle} maxFontSizeMultiplier={1.1}>
          not alone.<RNText style={styles.heroItalic}>{'\n'}not ever.</RNText>
        </RNText>
        <RNText style={styles.heroBody} maxFontSizeMultiplier={1.2}>
          Creators helping creators. Wins to share, struggles to name, tips that actually work — and
          the room to ask for help.
        </RNText>

        <View style={styles.rule}>
          <RuleDot width={width - 84} color={palette.line} dotColor={palette.electric} />
        </View>

        <View style={styles.valueList}>
          {VALUE_PROPS.map((v) => (
            <View key={v} style={styles.valueRow}>
              <Asterisk size={10} color={palette.electric} strokeWidth={1.4} />
              <RNText style={styles.valueText} maxFontSizeMultiplier={1.2}>
                {v}
              </RNText>
            </View>
          ))}
        </View>

        <View style={styles.heroCta}>
          <MagneticButton
            label={ctaLabel}
            onPress={() => enter(picked)}
            background={palette.electric}
            foreground={palette.bone}
            size="lg"
          />
        </View>
      </View>

      {/* ===== Personalize — your craft ===== */}
      <Section eyebrow="STEP 01 · YOUR CRAFT" title="what do you make?">
        <RNText style={styles.sectionBody} maxFontSizeMultiplier={1.2}>
          Pick a few. We'll shape your feed and rooms around them — optional, change it anytime.
        </RNText>
        <View style={styles.chipWrap}>
          {CRAFTS.map((s) => (
            <Chip
              key={s.key}
              label={s.label}
              accent={s.accent}
              active={picked.includes(s.key)}
              onPress={() => toggle(s.key)}
            />
          ))}
        </View>
      </Section>

      {/* ===== Personalize — rooms ===== */}
      <Section eyebrow="STEP 02 · ROOMS FOR YOU" title="where do you want in?">
        <View style={styles.chipWrap}>
          {ROOMS.map((s) => (
            <Chip
              key={s.key}
              label={s.label}
              accent={s.accent}
              active={picked.includes(s.key)}
              onPress={() => toggle(s.key)}
            />
          ))}
        </View>
      </Section>

      {/* ===== Explore the room ===== */}
      <Section eyebrow="WHAT'S INSIDE" title="explore the room.">
        <ListCell
          icon="people-outline"
          title="Groups"
          subtitle="Niche · location · interest · private"
          accent={palette.electric}
          onPress={() => enterTo('/(modules)/community/groups')}
        />
        <ListCell
          icon="calendar-outline"
          title="Events"
          subtitle="Meetups · webinars · AMAs · workshops"
          accent={palette.blush}
          onPress={() => enterTo('/(modules)/community/events')}
        />
        <ListCell
          icon="trophy-outline"
          title="Challenges"
          subtitle="Open prompts with prizes"
          accent={palette.acid}
          onPress={() => enterTo('/(modules)/community/challenges')}
        />
        <ListCell
          icon="people-circle-outline"
          title="Mentorship"
          subtitle="Learn from someone a step ahead"
          accent={palette.ember}
          onPress={() => enterTo('/(modules)/community/mentorship')}
        />
        <ListCell
          icon="help-circle-outline"
          title="Q&A and polls"
          subtitle="Ask the room, vote with the crowd"
          accent={palette.electric}
          onPress={() => enterTo('/(modules)/community/qa')}
        />
        <ListCell
          icon="search-outline"
          title="Creator directory"
          subtitle="Find and follow creators in your orbit"
          accent={palette.blush}
          onPress={() => enterTo('/(modules)/community/directory')}
        />
      </Section>

      {/* ===== Primary CTA ===== */}
      <View style={styles.footerCta}>
        <MagneticButton
          label={ctaLabel}
          onPress={() => enter(picked)}
          background={palette.ink}
          foreground={palette.bone}
          size="lg"
        />
      </View>
    </ScreenFrame>
  );

  // Mark the user onboarded (so the index won't bounce them back to intro),
  // persist any scenes they've already tapped, then deep-link the sub-section.
  function enterTo(path: string) {
    setCommunityInterests(picked);
    setCommunityOnboarded(true);
    router.replace(path as any);
  }
}

const makeStyles = (palette: typeof staticPalette) =>
  StyleSheet.create({
    /* ---------- Hero ---------- */
    hero: {
      marginTop: 6,
      padding: 20,
      borderRadius: 24,
      borderWidth: 1,
      borderColor: palette.line,
      backgroundColor: palette.paper,
    },
    heroObjWrap: { alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    eyebrow: { ...T.label, color: palette.electric, letterSpacing: 2.6, marginBottom: 12 },
    heroTitle: {
      fontFamily: fonts.displayBold,
      fontSize: 48,
      lineHeight: 46,
      letterSpacing: -2,
      color: palette.ink,
      includeFontPadding: false,
    },
    heroItalic: { fontFamily: fonts.editorial, fontStyle: 'italic', opacity: 0.85 },
    heroBody: { ...T.lead, color: palette.ink, opacity: 0.74, marginTop: 14 },

    rule: { marginTop: 22, marginBottom: 18, alignItems: 'flex-start' },
    valueList: { gap: 12 },
    valueRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    valueText: { ...T.bodyMedium, color: palette.ink, opacity: 0.82 },

    heroCta: { marginTop: 22 },

    /* ---------- Sections ---------- */
    sectionBody: { ...T.body, color: palette.ink, opacity: 0.68, lineHeight: 21 },
    chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },

    /* ---------- Footer CTA ---------- */
    footerCta: { marginTop: 32 },
  });
