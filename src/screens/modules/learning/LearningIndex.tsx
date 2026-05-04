import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { router } from '@/navigation';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { Section } from '@/components/ui/Section';
import { BadgePill } from '@/components/ui/BadgePill';
import { coursesSeed } from '@/data/mock';
import { useStore } from '@/store';

export default function LearningHome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const progress = useStore((s) => s.lessonProgress);

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="MODULE · 14" title="LEARNING" />}>
      <RNText
        style={styles.title}
        numberOfLines={2}
        adjustsFontSizeToFit
        minimumFontScale={0.6}
        maxFontSizeMultiplier={1.1}
      >
        get better,<RNText style={styles.italic}>{'\n'}on purpose.</RNText>
      </RNText>
      <RNText style={styles.body} maxFontSizeMultiplier={1.2}>
        Courses, guides, and playbooks from creators you actually believe. Short, specific, paid-for-by-us.
      </RNText>

      <Section eyebrow={`COURSES · ${coursesSeed.length}`} title="pick one. finish it.">
        <View style={{ gap: 12 }}>
          {coursesSeed.map((c) => {
            const done = progress[c.id] ?? 0;
            return (
              <Tap
                key={c.id}
                onPress={() => router.push(`/(modules)/learning/${c.id}` as any)}
                burstColor={c.accent}
                variant="heavy"
                style={[styles.card, { backgroundColor: c.accent }]}
              >
                <BadgePill label={c.category} accent={palette.ink} />
                <RNText
                  style={styles.cardTitle}
                  numberOfLines={3}
                  adjustsFontSizeToFit
                  minimumFontScale={0.72}
                  maxFontSizeMultiplier={1.1}
                >
                  {c.title}
                </RNText>
                <RNText style={styles.meta} maxFontSizeMultiplier={1.15}>
                  {c.instructor} · {c.duration} · {c.lessons} lessons
                </RNText>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, { width: `${(done / c.lessons) * 100}%` }]} />
                </View>
                <RNText style={styles.progressText} maxFontSizeMultiplier={1.1}>
                  {done} / {c.lessons} DONE
                </RNText>
              </Tap>
            );
          })}
        </View>
      </Section>
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 50,
    letterSpacing: -2.4,
    color: palette.ink,
    marginTop: 4,
  },
  italic: { fontFamily: fonts.editorialItalic, color: palette.electric },
  body: { ...T.body, color: palette.ink, opacity: 0.72, marginTop: 14, maxWidth: 360 },

  card: { padding: 22, borderRadius: 22, gap: 10 },
  cardTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.8,
    color: palette.ink,
    marginTop: 6,
  },
  meta: { ...T.micro, color: palette.ink, opacity: 0.72 },
  progressTrack: { height: 6, borderRadius: 3, backgroundColor: palette.ink, opacity: 0.22, overflow: 'hidden', marginTop: 10 },
  progressFill: { height: '100%', backgroundColor: palette.ink, borderRadius: 3 },
  progressText: { ...T.micro, color: palette.ink, opacity: 0.8, marginTop: 6 },
});
