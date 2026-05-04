import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

export default function Badges() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const badges = useStore((s) => s.badges);
  const toast = useStore((s) => s.toast);
  const earned = badges.filter((b) => b.earned);
  const pending = badges.filter((b) => !b.earned);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="REPUTATION" title="BADGES" />}>
      <Section eyebrow={`EARNED · ${earned.length}`} title="in your trophy case.">
        <View style={styles.grid}>
          {earned.map((b) => (
            <Tap
              key={b.key}
              onPress={() => toast(b.note, 'default')}
              burstColor={palette.acid}
              style={[styles.badge, { backgroundColor: palette.acid }]}
            >
              <Ionicons name="checkmark-circle" size={18} color={palette.ink} />
              <RNText
                style={styles.badgeName}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
                maxFontSizeMultiplier={1.1}
              >
                {b.name}
              </RNText>
              <RNText style={styles.badgeNote} numberOfLines={2} maxFontSizeMultiplier={1.15}>
                {b.note}
              </RNText>
            </Tap>
          ))}
        </View>
      </Section>

      <Section eyebrow={`UNEARNED · ${pending.length}`} title="still to come.">
        <View style={styles.grid}>
          {pending.map((b) => (
            <Tap
              key={b.key}
              onPress={() => toast(`Requirement: ${b.note}`, 'default')}
              burstColor={palette.ink}
              style={styles.badgeDim}
            >
              <Ionicons name="lock-closed-outline" size={18} color={palette.ink} style={{ opacity: 0.5 }} />
              <RNText
                style={[styles.badgeName, { color: palette.ink, opacity: 0.7 }]}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.75}
              >
                {b.name}
              </RNText>
              <RNText style={[styles.badgeNote, { color: palette.ink, opacity: 0.55 }]} numberOfLines={2}>
                {b.note}
              </RNText>
            </Tap>
          ))}
        </View>
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badge: {
    flexBasis: '48%',
    borderRadius: 18,
    padding: 16,
    gap: 8,
    minHeight: 140,
  },
  badgeDim: {
    flexBasis: '48%',
    borderRadius: 18,
    padding: 16,
    gap: 8,
    minHeight: 140,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  badgeName: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.3,
    color: palette.ink,
    marginTop: 8,
  },
  badgeNote: { ...T.micro, color: palette.ink, opacity: 0.75, marginTop: 4 },
});
