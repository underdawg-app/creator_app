import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { BadgePill } from '@/components/ui/BadgePill';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';

export default function Commissions() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const commissions = useStore((s) => s.commissions);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ART" title="COMMISSIONS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Briefs, deposits, and progress updates. One thread per job.
      </RNText>

      <View style={{ marginTop: 18 }}>
        {commissions.map((c) => (
          <Tap
            key={c.id}
            onPress={() => toast(`Opened ${c.from}'s brief.`, 'default')}
            burstColor={c.accent}
            style={[styles.card, { borderColor: c.accent }]}
          >
            <View style={styles.top}>
              <BadgePill label={c.status} accent={c.accent} />
              <RNText style={styles.budget}>
                ₹{c.budget.toLocaleString()}
              </RNText>
            </View>
            <RNText style={styles.from} maxFontSizeMultiplier={1.15}>
              FROM {c.from}
            </RNText>
            <RNText style={styles.brief} numberOfLines={3} maxFontSizeMultiplier={1.2}>
              {c.brief}
            </RNText>
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.7, maxWidth: 360 },
  card: {
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    backgroundColor: palette.paper,
    gap: 10,
    marginBottom: 10,
  },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  budget: { fontFamily: fonts.displayBold, fontSize: 20, color: palette.ink, letterSpacing: -0.5 },
  from: { ...T.label, color: palette.ink, opacity: 0.65 },
  brief: { fontFamily: fonts.editorial, fontSize: 17, lineHeight: 24, color: palette.ink, opacity: 0.9 },
});
