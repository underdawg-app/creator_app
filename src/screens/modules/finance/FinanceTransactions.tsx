import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { BadgePill } from '@/components/ui/BadgePill';
import { useStore } from '@/store';

const kindColor: Record<string, string> = {
  'BRAND DEAL': '#2E5BFF',
  'MERCH': '#D8FF3D',
  'ART SALE': '#FF6BB5',
  'TIP': '#FF5A1F',
  'GET VIRAL': '#D8FF3D',
  'COMMISSION': '#FF6BB5',
  'PAYOUT': '#9C988A',
  'FEE': '#9C988A',
};

export default function Transactions() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const tx = useStore((s) => s.transactions);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="FINANCE" title="TRANSACTIONS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Every rupee in, every rupee out. Ranked by recency.
      </RNText>

      <View style={{ marginTop: 18 }}>
        {tx.map((t) => (
          <View key={t.id} style={styles.row}>
            <View style={[styles.dot, { backgroundColor: kindColor[t.kind] ?? palette.ink }]} />
            <View style={{ flex: 1 }}>
              <View style={styles.topRow}>
                <RNText
                  style={styles.kind}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                  maxFontSizeMultiplier={1.15}
                >
                  {t.kind}
                </RNText>
                <RNText
                  style={[
                    styles.amount,
                    { color: t.direction === 'IN' ? palette.ink : palette.ember },
                  ]}
                  maxFontSizeMultiplier={1.1}
                >
                  {t.direction === 'IN' ? '+' : '−'}₹{t.amount.toLocaleString()}
                </RNText>
              </View>
              <RNText style={styles.source} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
                {t.source}
              </RNText>
              <View style={styles.bot}>
                <RNText style={styles.ago}>{t.date} ago</RNText>
                <BadgePill label={t.status} accent={t.status === 'CLEARED' ? palette.acid : palette.mute} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.7, maxWidth: 360 },
  row: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
    alignItems: 'flex-start',
  },
  dot: { width: 10, height: 10, borderRadius: 5, marginTop: 10 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 },
  kind: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3, flex: 1 },
  amount: { fontFamily: fonts.displayBold, fontSize: 18, letterSpacing: -0.5 },
  source: { ...T.small, color: palette.ink, opacity: 0.7, marginTop: 4 },
  bot: { flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 8 },
  ago: { ...T.micro, color: palette.ink, opacity: 0.5 },
});
