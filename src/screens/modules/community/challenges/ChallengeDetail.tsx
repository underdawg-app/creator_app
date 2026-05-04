import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { useLocalSearchParams, router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BadgePill } from '@/components/ui/BadgePill';
import { challenges } from '@/data/mock';
import { useStore } from '@/store';

export default function ChallengeDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = challenges.find((x) => x.id === id);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  if (!c) {
    return (
      <ScreenFrame header={<ModuleHeader eyebrow="CHALLENGE" title="NOT FOUND" />}>
        <RNText style={styles.body}>This challenge has ended.</RNText>
      </ScreenFrame>
    );
  }

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="CHALLENGE" title={c.tag} />}>
      <View style={[styles.hero, { backgroundColor: c.color }]}>
        <RNText style={styles.heroKicker}>CHALLENGE</RNText>
        <RNText
          style={styles.heroTag}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
        >
          {c.tag}
        </RNText>
        <RNText
          style={styles.prompt}
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
          maxFontSizeMultiplier={1.1}
        >
          {c.prompt}
        </RNText>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaCell}>
          <BadgePill label={`${c.daysLeft} DAYS`} accent={palette.electric} />
          <RNText style={styles.metaLabel}>LEFT</RNText>
        </View>
        <View style={styles.metaCell}>
          <BadgePill label={String(c.entries)} accent={palette.blush} />
          <RNText style={styles.metaLabel}>ENTRIES</RNText>
        </View>
        <View style={styles.metaCell}>
          <BadgePill label="OPEN" accent={palette.acid} />
          <RNText style={styles.metaLabel}>STATUS</RNText>
        </View>
      </View>

      <View style={styles.prizeCard}>
        <RNText style={styles.prizeLabel}>PRIZE</RNText>
        <RNText
          style={styles.prizeValue}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {c.prize}
        </RNText>
      </View>

      <RNText style={styles.rules} maxFontSizeMultiplier={1.2}>
        Rules: post to your feed with the challenge tag. One entry per creator. Judges are two editors and the community vote.
      </RNText>

      <View style={{ marginTop: 30, flexDirection: 'row', gap: 10 }}>
        <MagneticButton
          label="SUBMIT ENTRY"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={() => {
            confetti();
            toast('Entry submitted. Good luck.', 'success');
            router.back();
          }}
        />
        <MagneticButton
          label="SHARE"
          background={palette.bone}
          foreground={palette.ink}
          onPress={() => toast('Link copied.', 'success')}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  hero: { borderRadius: 24, padding: 26, gap: 10, marginTop: 4 },
  heroKicker: { ...T.label, color: staticPalette.ink, opacity: 0.6 },
  heroTag: { fontFamily: fonts.displayBold, fontSize: 44, letterSpacing: -2, color: staticPalette.ink },
  prompt: { fontFamily: fonts.editorialItalic, fontSize: 24, lineHeight: 28, color: staticPalette.ink, marginTop: 6 },

  metaRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  metaCell: { flex: 1, alignItems: 'flex-start', gap: 6 },
  metaLabel: { ...T.micro, color: staticPalette.ink, opacity: 0.55 },

  prizeCard: {
    marginTop: 20,
    padding: 22,
    borderRadius: 20,
    backgroundColor: palette.ink,
    gap: 8,
  },
  prizeLabel: { ...T.label, color: palette.bone, opacity: 0.6 },
  prizeValue: { fontFamily: fonts.displayBold, fontSize: 32, color: palette.acid, letterSpacing: -1.2, lineHeight: 34 },

  rules: { fontFamily: fonts.editorialItalic, fontSize: 17, lineHeight: 24, color: palette.ink, opacity: 0.82, marginTop: 20, maxWidth: 360 },
  body: { ...T.body, color: palette.ink, opacity: 0.7 },
});
