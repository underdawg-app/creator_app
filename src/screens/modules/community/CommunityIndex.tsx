import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { ListCell } from '@/components/ui/ListCell';
import { BadgePill } from '@/components/ui/BadgePill';
import { communityPostsSeed, challenges } from '@/data/mock';

const kindColor: Record<string, string> = {
  WIN: '#D8FF3D',
  STRUGGLE: '#FF5A1F',
  TIP: '#2E5BFF',
  RESOURCE: '#FF6BB5',
};

export default function CommunityHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MODULE · 13" title="COMMUNITY" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        not alone.<RNText style={styles.italic}>{'\n'}not ever.</RNText>
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Creators helping creators. Wins to share, struggles to name, tips that actually work.
      </RNText>

      <Section eyebrow="MANAGE">
        <ListCell
          icon="people-outline"
          title="Groups"
          subtitle="By craft, city, technique"
          onPress={() => router.push('/(modules)/community/groups')}
        />
        <ListCell
          icon="calendar-outline"
          title="Events"
          subtitle="Open studios, AMAs, workshops"
          onPress={() => router.push('/(modules)/community/events')}
        />
      </Section>

      <Section eyebrow="LIVE CHALLENGES">
        {challenges.map((c) => (
          <Tap
            key={c.id}
            onPress={() => router.push(`/(modules)/community/challenges/${c.id}` as any)}
            burstColor={c.color}
            style={[styles.challengeRow, { backgroundColor: c.color }]}
          >
            <View style={{ flex: 1 }}>
              <RNText
                style={styles.challengeTag}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                maxFontSizeMultiplier={1.1}
              >
                {c.tag}
              </RNText>
              <RNText style={styles.challengePrompt} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                {c.prompt}
              </RNText>
            </View>
            <View style={styles.challengeMeta}>
              <RNText style={styles.challengeDays}>{c.daysLeft}D</RNText>
              <RNText style={styles.challengeEntries}>{c.entries} ENTRIES</RNText>
            </View>
          </Tap>
        ))}
      </Section>

      <Section eyebrow="COMMUNITY FEED" title="what people are saying.">
        {communityPostsSeed.map((p) => (
          <Tap key={p.id} burstColor={kindColor[p.kind]} style={styles.postRow}>
            <View style={styles.postTop}>
              <BadgePill label={p.kind} accent={kindColor[p.kind]} />
              <RNText style={styles.ago}>{p.ago}</RNText>
            </View>
            <RNText style={styles.from} maxFontSizeMultiplier={1.15}>
              {p.from}
            </RNText>
            <RNText style={styles.postBody} numberOfLines={3} maxFontSizeMultiplier={1.2}>
              {p.body}
            </RNText>
          </Tap>
        ))}
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 50,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 14, maxWidth: 360 },

  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
  },
  challengeTag: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.4, color: staticPalette.ink },
  challengePrompt: { ...T.small, color: staticPalette.ink, opacity: 0.82, marginTop: 4 },
  challengeMeta: { alignItems: 'flex-end' },
  challengeDays: { fontFamily: fonts.displayBold, fontSize: 18, color: staticPalette.ink, letterSpacing: -0.4 },
  challengeEntries: { ...T.micro, color: staticPalette.ink, opacity: 0.7, marginTop: 3 },

  postRow: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    gap: 6,
  },
  postTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ago: { ...T.micro, color: palette.ink, opacity: 0.5 },
  from: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3, marginTop: 4 },
  postBody: { fontFamily: fonts.editorial, fontSize: 17, lineHeight: 24, color: palette.ink, opacity: 0.88 },
});
