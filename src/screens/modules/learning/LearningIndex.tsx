// LearningIndex — the learning module: courses, guides, and playbooks. Rebuilt
// on the shared design system (ScreenFrame / ModuleHeader / Section / Chip /
// ListCell) around a "continue" hero, category chips, full course cards with
// progress, instructors, and an overall-progress widget. Behavior, routes, and
// seed/progress logic are unchanged — only the visual shell was reskinned.

import React, { useMemo } from 'react';
import { View, StyleSheet, Text as RNText, ScrollView } from 'react-native';

import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';

import { Ionicons } from '@/icons';
import { router } from '@/navigation';

import { ScreenFrame } from '@/components/ui/ScreenFrame';
import { ModuleHeader } from '@/components/ui/ModuleHeader';
import { Section } from '@/components/ui/Section';
import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';

import { coursesSeed, lessonsSample } from '@/data/mock';
import { useStore } from '@/store';

const SCREEN_PADDING = 12;

/* -----------------------------------------------------------------------
 * Instructor mock — derived from coursesSeed instructors. The page can't
 * source full instructor data, so we fabricate a stable handle keyed off
 * the instructor's name.
 * --------------------------------------------------------------------- */
const instructorHandle = (name: string) =>
  '@' + name.toLowerCase().replace(/[^a-z0-9]/g, '');

export default function LevelUp() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const progress = useStore((s) => s.lessonProgress);
  const toast = useStore((s) => s.toast);

  const totalLessons = useMemo(
    () => coursesSeed.reduce((a, c) => a + c.lessons, 0),
    [],
  );
  const totalDone = useMemo(
    () => coursesSeed.reduce((a, c) => a + (progress[c.id] ?? 0), 0),
    [progress],
  );
  const completedCourses = useMemo(
    () => coursesSeed.filter((c) => (progress[c.id] ?? 0) >= c.lessons).length,
    [progress],
  );
  const inProgressCourses = useMemo(
    () =>
      coursesSeed.filter((c) => {
        const d = progress[c.id] ?? 0;
        return d > 0 && d < c.lessons;
      }),
    [progress],
  );
  const pct = totalLessons === 0 ? 0 : Math.round((totalDone / totalLessons) * 100);
  const continueCourse = inProgressCourses[0] ?? coursesSeed[0];
  const continueDone = progress[continueCourse.id] ?? 0;
  const continueNextLesson =
    lessonsSample[Math.min(continueDone, lessonsSample.length - 1)];

  const categories = useMemo(
    () => Array.from(new Set(coursesSeed.map((c) => c.category))),
    [],
  );

  const instructors = useMemo(
    () => Array.from(new Set(coursesSeed.map((c) => c.instructor))).slice(0, 6),
    [],
  );

  return (
    <ScreenFrame
      header={
        <ModuleHeader
          eyebrow="LEVEL UP · LEARN BY DOING"
          title="LEARNING"
          showBack
          right={
            <Tap
              onPress={() => toast('Search coming soon.', 'default')}
              style={styles.headerBtn}
              burstColor={palette.ink}
            >
              <Ionicons name="search-outline" size={16} color={palette.ink} />
            </Tap>
          }
        />
      }
    >
      {/* ===== Continue hero ===== */}
      <View style={styles.hero}>
        <View style={styles.heroHead}>
          <RNText style={styles.heroEyebrow} maxFontSizeMultiplier={1.15}>
            {coursesSeed.length} COURSES · PAID FOR BY UNDERDAWG
          </RNText>
        </View>
        <RNText
          style={styles.heroTitle}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
          maxFontSizeMultiplier={1.1}
        >
          get better,{'\n'}
          <RNText style={styles.heroTitleItalic}>on purpose.</RNText>
        </RNText>
        <RNText style={styles.heroSub} numberOfLines={3} maxFontSizeMultiplier={1.15}>
          Courses, guides, and playbooks from creators you actually believe.
          Short, specific, paid-for-by-us.
        </RNText>

        {/* Headline stats */}
        <View style={styles.statStrip}>
          <Stat label="COMPLETED" value={String(completedCourses)} />
          <View style={styles.statDiv} />
          <Stat label="IN PROGRESS" value={String(inProgressCourses.length)} accent />
          <View style={styles.statDiv} />
          <Stat label="LESSONS" value={`${totalDone}/${totalLessons}`} />
        </View>

        {/* Continue card */}
        <Tap
          style={[styles.continueCard, { borderColor: palette.line }]}
          burstColor={continueCourse.accent}
          variant="heavy"
          onPress={() => router.push(`/(modules)/learning/${continueCourse.id}` as any)}
        >
          <View style={[styles.continueAccent, { backgroundColor: continueCourse.accent }]} />
          <View style={styles.continueBody}>
            <RNText style={styles.continueKicker} maxFontSizeMultiplier={1.1}>
              {continueDone > 0 ? 'PICK UP WHERE YOU LEFT' : 'START WITH'}
            </RNText>
            <RNText
              style={styles.continueTitle}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              maxFontSizeMultiplier={1.1}
            >
              {continueCourse.title}
            </RNText>
            <RNText style={styles.continueMeta} maxFontSizeMultiplier={1.1}>
              Next · {continueNextLesson?.title ?? 'Lesson 1'} · {continueNextLesson?.duration ?? '—'}
            </RNText>
            <View style={[styles.barTrack, { backgroundColor: palette.line }]}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${(continueDone / continueCourse.lessons) * 100}%`,
                    backgroundColor: continueCourse.accent,
                  },
                ]}
              />
            </View>
            <View style={styles.continueFoot}>
              <RNText style={styles.continueFootText} maxFontSizeMultiplier={1.1}>
                {continueDone} / {continueCourse.lessons} DONE
              </RNText>
              <View style={[styles.continuePlay, { backgroundColor: palette.acid }]}>
                <Ionicons name="play" size={14} color={staticPalette.ink} />
              </View>
            </View>
          </View>
        </Tap>
      </View>

      {/* ===== Categories ===== */}
      <Section eyebrow={`CATEGORIES · ${categories.length}`} title="pick your lane.">
        <View style={styles.chipRow}>
          {categories.map((cat, i) => (
            <Chip
              key={cat}
              label={cat}
              active
              accent={
                i % 4 === 0
                  ? palette.acid
                  : i % 4 === 1
                    ? palette.electric
                    : i % 4 === 2
                      ? palette.blush
                      : palette.ember
              }
            />
          ))}
        </View>
      </Section>

      {/* ===== Courses ===== */}
      <Section eyebrow={`COURSES · ${coursesSeed.length}`} title="pick one. finish it.">
        <View style={styles.courseList}>
          {coursesSeed.map((c) => {
            const done = progress[c.id] ?? 0;
            const courseProgress = c.lessons === 0 ? 0 : (done / c.lessons) * 100;
            const finished = done >= c.lessons;
            const started = done > 0;
            return (
              <Tap
                key={c.id}
                style={[styles.courseCard, { backgroundColor: c.accent }]}
                burstColor={c.accent}
                variant="heavy"
                onPress={() => router.push(`/(modules)/learning/${c.id}` as any)}
              >
                <View style={styles.courseHead}>
                  <View style={styles.coursePill}>
                    <RNText style={styles.coursePillLabel} maxFontSizeMultiplier={1.1}>
                      {c.category}
                    </RNText>
                  </View>
                  {finished ? (
                    <View style={styles.courseDoneTag}>
                      <Ionicons name="checkmark" size={12} color={staticPalette.bone} />
                      <RNText style={styles.courseDoneLabel} maxFontSizeMultiplier={1.1}>
                        DONE
                      </RNText>
                    </View>
                  ) : started ? (
                    <View style={styles.courseInProgressTag}>
                      <View style={styles.courseInProgressDot} />
                      <RNText style={styles.courseInProgressLabel} maxFontSizeMultiplier={1.1}>
                        IN PROGRESS
                      </RNText>
                    </View>
                  ) : null}
                </View>

                <RNText
                  style={styles.courseTitle}
                  numberOfLines={3}
                  adjustsFontSizeToFit
                  minimumFontScale={0.72}
                  maxFontSizeMultiplier={1.1}
                >
                  {c.title}
                </RNText>

                <View style={styles.courseMetaRow}>
                  <View style={styles.courseMetaCell}>
                    <Ionicons name="person-outline" size={11} color={staticPalette.ink} />
                    <RNText style={styles.courseMetaText} maxFontSizeMultiplier={1.1}>
                      {c.instructor}
                    </RNText>
                  </View>
                  <View style={styles.courseMetaCell}>
                    <Ionicons name="time-outline" size={11} color={staticPalette.ink} />
                    <RNText style={styles.courseMetaText} maxFontSizeMultiplier={1.1}>
                      {c.duration}
                    </RNText>
                  </View>
                  <View style={styles.courseMetaCell}>
                    <Ionicons name="albums-outline" size={11} color={staticPalette.ink} />
                    <RNText style={styles.courseMetaText} maxFontSizeMultiplier={1.1}>
                      {c.lessons} LESSONS
                    </RNText>
                  </View>
                </View>

                <View style={styles.courseBarTrack}>
                  <View style={[styles.courseBarFill, { width: `${courseProgress}%` }]} />
                </View>

                <View style={styles.courseFoot}>
                  <RNText style={styles.courseFootText} maxFontSizeMultiplier={1.1}>
                    {done} / {c.lessons} DONE
                  </RNText>
                  <View style={styles.courseFootRight}>
                    <RNText style={styles.courseFootCta} maxFontSizeMultiplier={1.1}>
                      {finished ? 'REVIEW' : started ? 'CONTINUE' : 'START'}
                    </RNText>
                    <View style={styles.courseFootArrow}>
                      <Ionicons name="arrow-forward" size={13} color={staticPalette.ink} />
                    </View>
                  </View>
                </View>
              </Tap>
            );
          })}
        </View>
      </Section>

      {/* ===== Instructors ===== */}
      <Section eyebrow={`INSTRUCTORS · ${instructors.length}`} title="taught by people who did it.">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.instructorScrollContent}
          style={styles.instructorScroll}
        >
          {instructors.map((name, i) => (
            <Tap
              key={name}
              style={styles.instructorCard}
              burstColor={palette.acid}
              onPress={() => toast(`Open ${name} page.`, 'default')}
            >
              <View
                style={[
                  styles.instructorAvatar,
                  {
                    backgroundColor:
                      i % 4 === 0
                        ? palette.acid
                        : i % 4 === 1
                          ? palette.electric
                          : i % 4 === 2
                            ? palette.blush
                            : palette.ember,
                  },
                ]}
              >
                <RNText style={styles.instructorInitials}>
                  {name
                    .split(' ')
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join('')}
                </RNText>
              </View>
              <RNText style={styles.instructorName} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {name}
              </RNText>
              <RNText style={styles.instructorHandle} maxFontSizeMultiplier={1.1}>
                {instructorHandle(name)}
              </RNText>
            </Tap>
          ))}
        </ScrollView>
      </Section>

      {/* ===== Progress widget ===== */}
      <Section eyebrow="YOUR PROGRESS" title="receipts.">
        <View style={[styles.progressCard, { borderColor: palette.line, backgroundColor: palette.paper }]}>
          <RNText style={styles.progressKicker} maxFontSizeMultiplier={1.1}>
            OVERALL · {pct}%
          </RNText>
          <View style={styles.progressValueRow}>
            <RNText style={styles.progressValue} maxFontSizeMultiplier={1.1}>
              {totalDone}
            </RNText>
            <RNText style={styles.progressValueLabel} maxFontSizeMultiplier={1.1}>
              OF {totalLessons} LESSONS
            </RNText>
          </View>
          <View style={[styles.barTrack, { backgroundColor: palette.line }]}>
            <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: palette.acid }]} />
          </View>
        </View>
      </Section>

      {/* ===== Footer CTA ===== */}
      <Section eyebrow="MISSING SOMETHING?" title="ask for it.">
        <Tap
          style={[styles.footerCta, { backgroundColor: palette.acid }]}
          burstColor={palette.acid}
          variant="heavy"
          onPress={() => toast('Suggesting a course.', 'default')}
        >
          <Ionicons name="bulb-outline" size={16} color={staticPalette.ink} />
          <RNText style={styles.footerCtaLabel} maxFontSizeMultiplier={1.1}>
            SUGGEST A COURSE
          </RNText>
          <Ionicons name="arrow-forward" size={14} color={staticPalette.ink} />
        </Tap>
      </Section>
    </ScreenFrame>
  );
}

/* -----------------------------------------------------------------------
 * Sub-components
 * --------------------------------------------------------------------- */

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.stat}>
      <RNText
        style={[styles.statValue, accent && { color: palette.acid }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {value}
      </RNText>
      <RNText
        style={styles.statLabel}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        maxFontSizeMultiplier={1.1}
      >
        {label}
      </RNText>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Styles
 * --------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  headerBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Hero ---------- */
  hero: {
    marginTop: 6,
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
    gap: 16,
  },
  heroHead: {},
  heroEyebrow: { ...T.label, color: palette.ink, opacity: 0.55 },
  heroTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 44,
    lineHeight: 44,
    letterSpacing: -1.8,
    color: palette.ink,
  },
  heroTitleItalic: {
    fontFamily: fonts.editorialItalic,
    color: palette.electric,
    letterSpacing: -1,
  },
  heroSub: {
    ...T.body,
    color: palette.ink,
    opacity: 0.8,
    lineHeight: 21,
  },

  /* ---------- Stats ---------- */
  statStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: palette.line,
  },
  stat: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    letterSpacing: -0.5,
    color: palette.ink,
    textAlign: 'center',
    width: '100%',
  },
  statLabel: { ...T.micro, color: palette.mute, textAlign: 'center', width: '100%' },
  statDiv: { width: 1, height: 30, backgroundColor: palette.line },

  /* ---------- Continue card ---------- */
  continueCard: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: palette.boneSoft,
  },
  continueAccent: { width: 6 },
  continueBody: { flex: 1, padding: 16, gap: 8 },
  continueKicker: { ...T.label, color: palette.ink, opacity: 0.55 },
  continueTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
    color: palette.ink,
  },
  continueMeta: { fontFamily: fonts.body, fontSize: 12, color: palette.ink, opacity: 0.7 },
  continueFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  continueFootText: { ...T.micro, color: palette.ink, opacity: 0.75 },
  continuePlay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Shared bar ---------- */
  barTrack: { marginTop: 4, height: 5, borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 3 },

  /* ---------- Chip row ---------- */
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  /* ---------- Course list ---------- */
  courseList: { gap: 12 },
  courseCard: { padding: 20, borderRadius: 22, gap: 12 },
  courseHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  coursePill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: staticPalette.ink,
  },
  coursePillLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },
  courseDoneTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: staticPalette.ink,
  },
  courseDoneLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: staticPalette.bone,
    textTransform: 'uppercase',
  },
  courseInProgressTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(10,10,10,0.85)',
  },
  courseInProgressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: staticPalette.acid,
  },
  courseInProgressLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: staticPalette.bone,
    textTransform: 'uppercase',
  },
  courseTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.8,
    color: staticPalette.ink,
  },
  courseMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  courseMetaCell: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  courseMetaText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    color: staticPalette.ink,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
  courseBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(10,10,10,0.18)',
    overflow: 'hidden',
    marginTop: 2,
  },
  courseBarFill: { height: '100%', backgroundColor: staticPalette.ink, borderRadius: 3 },
  courseFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  courseFootText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    color: staticPalette.ink,
    opacity: 0.85,
    textTransform: 'uppercase',
  },
  courseFootRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  courseFootCta: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.8,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },
  courseFootArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(10,10,10,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Instructors ---------- */
  instructorScroll: { marginHorizontal: -SCREEN_PADDING },
  instructorScrollContent: { paddingHorizontal: SCREEN_PADDING, gap: 12 },
  instructorCard: { width: 130, gap: 8, alignItems: 'flex-start' },
  instructorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructorInitials: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    letterSpacing: -0.6,
    color: staticPalette.ink,
  },
  instructorName: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  instructorHandle: { fontFamily: fonts.body, fontSize: 12, color: palette.mute },

  /* ---------- Progress card ---------- */
  progressCard: { padding: 22, borderRadius: 22, borderWidth: 1, gap: 8 },
  progressKicker: { ...T.label, color: palette.ink, opacity: 0.55 },
  progressValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10 },
  progressValue: {
    fontFamily: fonts.displayBold,
    fontSize: 48,
    lineHeight: 50,
    letterSpacing: -2,
    color: palette.ink,
  },
  progressValueLabel: { ...T.micro, color: palette.mute },

  /* ---------- Footer CTA ---------- */
  footerCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 56,
    borderRadius: 28,
  },
  footerCtaLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 1.8,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },
});
