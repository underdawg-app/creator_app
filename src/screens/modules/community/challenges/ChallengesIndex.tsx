import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { challenges } from '@/data/mock';

export default function ChallengesList() {
  const styles = useThemedPaletteStyles(makeStyles);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COMMUNITY" title="CHALLENGES" />}>
      <RNText style={styles.sub} maxFontSizeMultiplier={1.2}>
        Open challenges. Make something. Win something.
      </RNText>
      <View style={styles.list}>
        {challenges.map((c) => (
          <Tap
            key={c.id}
            style={[styles.card, { backgroundColor: c.color }]}
            onPress={() => router.push(`/(modules)/community/challenges/${c.id}` as any)}
            burstColor={c.color}
          >
            <RNText style={styles.cardTag} numberOfLines={1} maxFontSizeMultiplier={1.1}>
              {c.tag}
            </RNText>
            <RNText style={styles.cardPrompt} numberOfLines={2} maxFontSizeMultiplier={1.2}>
              {c.prompt}
            </RNText>
            <View style={styles.cardMeta}>
              <RNText style={styles.cardMetaText} maxFontSizeMultiplier={1.1}>
                {c.daysLeft}D LEFT
              </RNText>
              <RNText style={styles.cardMetaText} maxFontSizeMultiplier={1.1}>
                {c.entries} ENTRIES
              </RNText>
            </View>
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  sub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.72,
    marginTop: 4,
    marginBottom: 20,
  },
  list: { gap: 12 },
  card: {
    borderRadius: 20,
    padding: 24,
    gap: 8,
  },
  cardTag: {
    fontFamily: fonts.displayBold,
    fontSize: 28,
    letterSpacing: -1.2,
    color: staticPalette.ink,
  },
  cardPrompt: {
    fontFamily: fonts.editorialItalic,
    fontSize: 18,
    lineHeight: 24,
    color: staticPalette.ink,
    opacity: 0.8,
  },
  cardMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  cardMetaText: {
    ...T.micro,
    color: staticPalette.ink,
    opacity: 0.7,
  },
});
