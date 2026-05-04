import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Stepper } from '@/components/ui/Stepper';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Ionicons } from '@/icons';
import { useStore } from '@/store';

export default function Verification() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const verification = useStore((s) => s.verification);
  const advance = useStore((s) => s.advanceVerification);
  const confetti = useStore((s) => s.confetti);
  const toast = useStore((s) => s.toast);
  const current = verification.findIndex((v) => !v.done);
  const allDone = current === -1;

  const step = () => {
    if (allDone) return;
    advance();
    const nextIdx = verification.findIndex((v, i) => i >= current + 1 && !v.done);
    if (nextIdx < 0) {
      confetti();
      toast('Verified. You are officially Underdawg.', 'success');
    } else {
      toast(`${verification[current].label} complete.`, 'success');
    }
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="REPUTATION" title="VERIFICATION" />}>
      <Stepper steps={verification.map((v) => v.label)} current={allDone ? verification.length - 1 : current} />

      <View style={styles.hero}>
        <RNText style={styles.kicker} maxFontSizeMultiplier={1.15}>
          {allDone ? 'ALL DONE' : `STEP ${current + 1} OF ${verification.length}`}
        </RNText>
        <RNText
          style={styles.title}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {allDone ? 'verified.' : (verification[current]?.label ?? '').toLowerCase()}.
        </RNText>
        <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
          {allDone
            ? 'Your profile now shows the shield. Brands trust verified creators at a higher rate — so do fans.'
            : 'We verify one creator at a time, by hand where it matters. No bots. No sponsored verification.'}
        </RNText>
      </View>

      <View style={styles.list}>
        {verification.map((v, i) => (
          <View key={v.key} style={styles.row}>
            <View
              style={[
                styles.rowDot,
                { backgroundColor: v.done ? palette.acid : palette.line },
              ]}
            >
              {v.done ? <Ionicons name="checkmark" size={14} color={palette.ink} /> : null}
            </View>
            <RNText
              style={[styles.rowLabel, { opacity: v.done ? 0.9 : 0.5 }]}
              maxFontSizeMultiplier={1.15}
            >
              {v.label}
            </RNText>
            {i === current && !allDone ? (
              <RNText style={styles.active}>← YOU ARE HERE</RNText>
            ) : null}
          </View>
        ))}
      </View>

      {!allDone ? (
        <View style={{ marginTop: 30 }}>
          <MagneticButton
            label={`ADVANCE · ${verification[current]?.label}`}
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={step}
          />
        </View>
      ) : null}
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  hero: { marginTop: 20 },
  kicker: { ...T.label, color: palette.ink, opacity: 0.6 },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 52,
    letterSpacing: -2.2,
    color: palette.ink,
    marginTop: 8,
  },
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 14, maxWidth: 360 },
  list: { marginTop: 26, gap: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowDot: { width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, letterSpacing: -0.4, flex: 1 },
  active: { ...T.micro, color: palette.electric },
});
