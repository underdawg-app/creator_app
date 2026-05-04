import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { analyticsSeed } from '@/data/mock';
import { ArrowMark } from '@/components/svg/Marks';
import { useStore } from '@/store';

export default function AIInsights() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="ANALYTICS" title="AI INSIGHTS" />}>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Four cards, each a specific thing to do this week. Not a dashboard. A move.
      </RNText>

      <View style={{ marginTop: 18, gap: 12 }}>
        {analyticsSeed.ai.map((i) => (
          <Tap
            key={i.id}
            onPress={() => toast('Insight saved to your plan.', 'success')}
            burstColor={i.accent}
            variant="heavy"
            style={[styles.card, { backgroundColor: i.accent }]}
          >
            <View style={styles.cardTop}>
              <View style={styles.kindPill}>
                <RNText style={styles.kindText} maxFontSizeMultiplier={1.1}>
                  {i.kind}
                </RNText>
              </View>
              <ArrowMark size={14} color={palette.ink} strokeWidth={1.8} />
            </View>
            <RNText
              style={styles.cardTitle}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              maxFontSizeMultiplier={1.1}
            >
              {i.title}
            </RNText>
            <RNText style={styles.cardBody} maxFontSizeMultiplier={1.2}>
              {i.body}
            </RNText>
          </Tap>
        ))}
      </View>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 4, maxWidth: 360 },
  card: { borderRadius: 22, padding: 22, gap: 12 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kindPill: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, backgroundColor: palette.ink },
  kindText: { ...T.micro, color: palette.bone },
  cardTitle: { fontFamily: fonts.displayBold, fontSize: 26, lineHeight: 28, color: palette.ink, letterSpacing: -0.8 },
  cardBody: { ...T.body, color: palette.ink, opacity: 0.85, maxWidth: 340 },
});
