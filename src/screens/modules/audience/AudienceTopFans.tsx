import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { topFans } from '@/data/mock';
import { useStore } from '@/store';

export default function TopFans() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="AUDIENCE" title="TOP FANS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Scored by multi-platform engagement, comment quality, and purchase history. Your best people, ranked.
      </RNText>

      <View style={styles.list}>
        {topFans.map((f, i) => (
          <Tap
            key={f.id}
            onPress={() => toast(`DM template copied for ${f.handle}.`, 'success')}
            burstColor={palette.acid}
            style={styles.row}
          >
            <RNText style={styles.idx} maxFontSizeMultiplier={1.1}>
              {String(i + 1).padStart(2, '0')}
            </RNText>
            <View style={{ flex: 1 }}>
              <RNText
                style={styles.handle}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                maxFontSizeMultiplier={1.15}
              >
                {f.handle}
              </RNText>
              <RNText style={styles.note} maxFontSizeMultiplier={1.15}>
                {f.note}
              </RNText>
              <View style={styles.platforms}>
                {f.platforms.map((p) => (
                  <View key={p} style={styles.platformPill}>
                    <RNText style={styles.platformPillText} maxFontSizeMultiplier={1.1}>
                      {p.toUpperCase()}
                    </RNText>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.score}>
              <RNText style={styles.scoreValue} maxFontSizeMultiplier={1.1}>
                {f.score}
              </RNText>
            </View>
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 4, maxWidth: 360 },
  list: { marginTop: 22 },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  idx: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: palette.ink,
    opacity: 0.4,
    width: 34,
    marginTop: 2,
  },
  handle: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    color: palette.ink,
    letterSpacing: -0.6,
  },
  note: { ...T.small, color: palette.ink, opacity: 0.7, marginTop: 4 },
  platforms: { flexDirection: 'row', gap: 6, marginTop: 8 },
  platformPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.line,
  },
  platformPillText: { ...T.micro, color: palette.ink, opacity: 0.75 },
  score: {
    minWidth: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: palette.acid,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreValue: { fontFamily: fonts.displayBold, fontSize: 18, color: staticPalette.ink },
});
