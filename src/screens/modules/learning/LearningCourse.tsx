import React from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { useLocalSearchParams } from '@/navigation';
import { Ionicons } from '@/icons';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Tap } from '@/components/ui/Tap';
import { BadgePill } from '@/components/ui/BadgePill';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { coursesSeed, lessonsSample } from '@/data/mock';
import { useStore } from '@/store';

export default function CourseDetail() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const { course } = useLocalSearchParams<{ course: string }>();
  const c = coursesSeed.find((x) => x.id === course) ?? coursesSeed[0];
  const done = useStore((s) => s.lessonProgress[c.id] ?? 0);
  const mark = useStore((s) => s.markLessonDone);
  const toast = useStore((s) => s.toast);
  const confetti = useStore((s) => s.confetti);

  const total = lessonsSample.length;
  const complete = done >= total;

  return (
    <ScreenFrame header={<ModuleHeader eyebrow="COURSE" title={c.category} />}>
      <View style={[styles.hero, { backgroundColor: c.accent }]}>
        <BadgePill label={c.category} accent={palette.ink} />
        <RNText
          style={styles.title}
          numberOfLines={3}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          maxFontSizeMultiplier={1.1}
        >
          {c.title}
        </RNText>
        <RNText style={styles.meta} maxFontSizeMultiplier={1.15}>
          {c.instructor} · {c.duration}
        </RNText>
      </View>

      <RNText style={styles.sectionLabel} maxFontSizeMultiplier={1.15}>
        — LESSONS · {done} / {total} done
      </RNText>

      <View style={{ marginTop: 10, gap: 0 }}>
        {lessonsSample.map((l, i) => {
          const isDone = i < done;
          return (
            <Tap
              key={l.id}
              onPress={() => {
                mark(c.id, i);
                if (i + 1 === total && !complete) {
                  confetti();
                  toast('Course complete. Nice.', 'success');
                } else {
                  toast(`Lesson "${l.title}" complete.`, 'success');
                }
              }}
              burstColor={c.accent}
              style={styles.lesson}
            >
              <View style={[styles.lessonDot, { backgroundColor: isDone ? palette.acid : palette.line }]}>
                {isDone ? <Ionicons name="checkmark" size={14} color={staticPalette.ink} /> : null}
              </View>
              <View style={{ flex: 1 }}>
                <RNText
                  style={[styles.lessonTitle, { opacity: isDone ? 0.6 : 0.95 }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                  maxFontSizeMultiplier={1.15}
                >
                  {l.title}
                </RNText>
                <RNText style={styles.lessonDuration}>{l.duration}</RNText>
              </View>
              <Ionicons
                name={isDone ? 'refresh-outline' : 'play'}
                size={16}
                color={palette.ink}
                style={{ opacity: 0.6 }}
              />
            </Tap>
          );
        })}
      </View>

      {!complete ? (
        <View style={{ marginTop: 26 }}>
          <MagneticButton
            label="CONTINUE COURSE"
            size="lg"
            background={palette.ink}
            foreground={palette.acid}
            onPress={() => {
              mark(c.id, done);
              toast('Moving forward.', 'default');
            }}
          />
        </View>
      ) : null}
    </ScreenFrame>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  hero: { borderRadius: 22, padding: 22, gap: 10 },
  title: { fontFamily: fonts.displayBold, fontSize: 32, lineHeight: 34, color: staticPalette.ink, letterSpacing: -1 },
  meta: { ...T.micro, color: staticPalette.ink, opacity: 0.75 },
  sectionLabel: { ...T.label, color: palette.ink, opacity: 0.6, marginTop: 24 },
  lesson: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  lessonDot: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  lessonTitle: { fontFamily: fonts.displayBold, fontSize: 16, color: palette.ink, letterSpacing: -0.3 },
  lessonDuration: { ...T.micro, color: palette.ink, opacity: 0.55, marginTop: 3 },
});
