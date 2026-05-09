import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { ListCell } from '@/components/ui/ListCell';
import { BadgePill } from '@/components/ui/BadgePill';
import { repBreakdown } from '@/data/mock';
import { useStore } from '@/store';

export default function ReputationHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const badges = useStore((s) => s.badges);
  const verification = useStore((s) => s.verification);
  const done = verification.filter((v) => v.done).length;
  const score = profile.reputation;
  const tier =
    score >= 90 ? 'ELITE' : score >= 80 ? 'TRUSTED' : score >= 60 ? 'ESTABLISHED' : score >= 40 ? 'RISING' : 'NEW';

  return (
    <ScreenFrame header={<ModuleHeader title="REPUTATION" />}>
      <View style={styles.hero}>
        <RNText
          style={styles.score}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {score}
        </RNText>
        <View style={{ gap: 6 }}>
          <BadgePill tier={tier} />
          <RNText style={styles.scoreLabel} maxFontSizeMultiplier={1.15}>
            YOUR SCORE · 100
          </RNText>
        </View>
      </View>

      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Reputation is portable. Brands, fans, and managers see the same number. Only you can move it.
      </RNText>

      <Section eyebrow="WHAT MOVES IT" title="your breakdown.">
        <View style={{ gap: 12, marginTop: 4 }}>
          {repBreakdown.map((r) => (
            <View key={r.key} style={styles.row}>
              <View style={{ flex: 1 }}>
                <RNText style={styles.rowKey} maxFontSizeMultiplier={1.15}>
                  {r.label}
                </RNText>
                <RNText style={styles.rowWeight}>{r.weight}% of score</RNText>
              </View>
              <View style={styles.track}>
                <View
                  style={[
                    styles.fill,
                    { width: `${r.score}%`, backgroundColor: r.score >= 80 ? palette.acid : palette.electric },
                  ]}
                />
              </View>
              <RNText style={styles.rowVal} maxFontSizeMultiplier={1.1}>
                {r.score}
              </RNText>
            </View>
          ))}
        </View>
      </Section>

      <Section eyebrow="GET DEEPER">
        <ListCell
          icon="shield-checkmark-outline"
          title="Verification"
          subtitle={`${done} / ${verification.length} steps complete`}
          onPress={() => router.push('/(modules)/reputation/verification')}
        />
        <ListCell
          icon="trophy-outline"
          title="Badges"
          subtitle={`${badges.filter((b) => b.earned).length} earned · ${badges.filter((b) => !b.earned).length} open`}
          onPress={() => router.push('/(modules)/reputation/badges')}
        />
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  hero: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 16,
  },
  score: {
    fontFamily: fonts.displayBold,
    fontSize: 140,
    lineHeight: 120,
    color: palette.ink,
    letterSpacing: -5,
  },
  scoreLabel: { ...T.label, color: palette.ink, opacity: 0.6 },
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 14, maxWidth: 360 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowKey: { fontFamily: fonts.displayBold, fontSize: 14, color: palette.ink, letterSpacing: -0.2 },
  rowWeight: { ...T.micro, color: palette.ink, opacity: 0.55, marginTop: 2 },
  track: { width: 80, height: 8, backgroundColor: palette.line, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%' },
  rowVal: { fontFamily: fonts.displayBold, fontSize: 18, color: palette.ink, width: 36, textAlign: 'right' },
});
