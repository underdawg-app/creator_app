import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { rateCardSeed } from '@/data/mock';
import { useStore } from '@/store';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function RateCard() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const custom = useStore((s) => s.rateCardCustom);
  const setRate = useStore((s) => s.setRate);
  const toast = useStore((s) => s.toast);
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(rateCardSeed.map((r) => [r.key, String(custom[r.key] ?? r.base)]))
  );

  const save = () => {
    rateCardSeed.forEach((r) => {
      const v = Number(draft[r.key]);
      if (!isNaN(v)) setRate(r.key, v);
    });
    toast('Rate card saved.', 'success');
  };

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="JOBS" title="RATE CARD" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Transparent pricing. Brands see exactly what each service costs.
      </RNText>

      <View style={{ marginTop: 18, gap: 10 }}>
        {rateCardSeed.map((r) => (
          <View key={r.key} style={styles.row}>
            <View style={{ flex: 1 }}>
              <RNText
                style={styles.name}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                maxFontSizeMultiplier={1.15}
              >
                {r.name}
              </RNText>
              <RNText style={styles.desc} maxFontSizeMultiplier={1.2}>
                {r.desc}
              </RNText>
            </View>
            <View style={styles.rateWrap}>
              <RNText style={styles.currency}>₹</RNText>
              <TextInput
                style={styles.input}
                value={draft[r.key]}
                onChangeText={(v) => setDraft({ ...draft, [r.key]: v })}
                keyboardType="numeric"
                maxFontSizeMultiplier={1.15}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 30 }}>
        <MagneticButton
          label="SAVE RATES"
          size="lg"
          background={palette.ink}
          foreground={palette.acid}
          onPress={save}
        />
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.7, maxWidth: 360 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  name: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3 },
  desc: { ...T.small, color: palette.ink, opacity: 0.62, marginTop: 3 },
  rateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.paper,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.line,
    paddingHorizontal: 12,
    gap: 4,
  },
  currency: { fontFamily: fonts.displayBold, fontSize: 14, color: palette.ink },
  input: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: palette.ink,
    minWidth: 80,
    paddingVertical: 10,
  },
});
