import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';

import { Ionicons } from '@/icons';
import { router } from '@/navigation';

import { Tap } from '@/components/ui/Tap';
import { Chip } from '@/components/ui/Chip';
import { Marquee } from '@/components/ui/Marquee';
import { Ticker } from '@/components/ui/Ticker';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { SkiaGrain } from '@/components/skia/SkiaGrain';

import { coursesSeed, lessonsSample } from '@/data/mock';
import { useStore } from '@/store';

const IS_ANDROID = Platform.OS === 'android';
const { width } = Dimensions.get('window');

const SCREEN_PADDING = 12;
const LOOP_HEIGHT = 42;

/* -----------------------------------------------------------------------
 * Instructor mock — derived from coursesSeed instructors. The page can't
 * source full instructor data, so we fabricate a stable handle + niche
 * keyed off the instructor's name.
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
    () =>
      coursesSeed.reduce((a, c) => a + (progress[c.id] ?? 0), 0),
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

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={onScroll}
        scrollEventThrottle={IS_ANDROID ? 32 : 16}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={IS_ANDROID}
        overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {/* =====================================================
            HERO
         ===================================================== */}
        <View style={styles.hero}>
          <View style={styles.heroWave} pointerEvents="none">
            <SkiaWaveField
              width={width}
              height={620}
              color="rgba(242,239,230,0.06)"
              lines={18}
              amplitude={12}
              frequency={0.02}
              speed={0.25}
              strokeWidth={1}
            />
          </View>

          <SafeAreaView edges={['top']} style={styles.heroSafe}>
            {/* Top bar — back / kicker / search */}
            <View style={styles.heroTopBar}>
              <Tap
                onPress={() => router.back()}
                style={styles.iconBtn}
                burstColor={staticPalette.bone}
              >
                <Ionicons name="arrow-back" size={16} color={staticPalette.bone} />
              </Tap>

              <View style={styles.heroEyebrowWrap}>
                <RNText style={styles.heroEyebrow} maxFontSizeMultiplier={1.1}>
                  LEVEL UP · LEARN BY DOING
                </RNText>
              </View>

              <Tap
                onPress={() => toast('Search coming soon.', 'default')}
                style={styles.iconBtn}
                burstColor={staticPalette.acid}
              >
                <Ionicons name="search-outline" size={16} color={staticPalette.bone} />
              </Tap>
            </View>

            {/* URL / status ticker */}
            <View style={styles.urlStrip}>
              <Marquee
                items={[
                  `${coursesSeed.length} COURSES`,
                  'PAID FOR BY UNDERDAWG',
                  'SHORT · SPECIFIC',
                  'TAUGHT BY CREATORS',
                ]}
                speed={28}
                separator="   ·   "
                textStyle={styles.urlText}
              />
            </View>

            {/* Title block */}
            <View style={styles.titleBlock}>
              <RNText
                style={styles.title}
                numberOfLines={2}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
                maxFontSizeMultiplier={1.1}
              >
                get better,
                {'\n'}
                <RNText style={styles.titleItalic}>on purpose.</RNText>
              </RNText>
              <RNText style={styles.subtitle} maxFontSizeMultiplier={1.15}>
                Courses, guides, and playbooks from creators you actually believe.
                Short, specific, paid-for-by-us.
              </RNText>
            </View>

            {/* Stats row */}
            <View style={styles.statsRow}>
              <StatCol label="COMPLETED" value={String(completedCourses)} />
              <StatDivider />
              <StatCol
                label="IN PROGRESS"
                value={String(inProgressCourses.length)}
                accent
              />
              <StatDivider />
              <StatCol label="LESSONS" value={`${totalDone}/${totalLessons}`} />
            </View>

            {/* Continue card */}
            <Tap
              style={styles.continueCard}
              burstColor={continueCourse.accent}
              variant="heavy"
              onPress={() =>
                router.push(`/(modules)/learning/${continueCourse.id}` as any)
              }
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
                <View style={styles.continueBarTrack}>
                  <View
                    style={[
                      styles.continueBarFill,
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
                  <View style={styles.continuePlay}>
                    <Ionicons name="play" size={14} color={staticPalette.ink} />
                  </View>
                </View>
              </View>
            </Tap>
          </SafeAreaView>

          <SkiaGrain width={width} height={620} intensity={0.08} tint={[1, 1, 1, 0.16]} />
        </View>

        {/* =====================================================
            MARQUEE TRANSITION
         ===================================================== */}
        <View style={styles.loopStrip}>
          <Marquee
            items={[
              'PRICING',
              'GROWTH',
              'CONTRACTS',
              'CRAFT',
              'BUSINESS',
              'NEGOTIATION',
            ]}
            speed={48}
            direction="left"
            separator="   ·   "
            textStyle={styles.loopText}
            style={{ height: LOOP_HEIGHT, width, backgroundColor: staticPalette.ink }}
          />
        </View>

        {/* =====================================================
            CATEGORIES — chips
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead eyebrow={`CATEGORIES · ${categories.length}`} title="pick your lane." />
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
        </View>

        {/* =====================================================
            COURSES — full cards
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead
            eyebrow={`COURSES · ${coursesSeed.length}`}
            title="pick one. finish it."
          />
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
                  onPress={() =>
                    router.push(`/(modules)/learning/${c.id}` as any)
                  }
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
                    <View
                      style={[
                        styles.courseBarFill,
                        { width: `${courseProgress}%` },
                      ]}
                    />
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
        </View>

        {/* =====================================================
            INSTRUCTORS
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead
            eyebrow={`INSTRUCTORS · ${instructors.length}`}
            title="taught by people who did it."
          />
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
                <RNText
                  style={styles.instructorName}
                  numberOfLines={1}
                  maxFontSizeMultiplier={1.1}
                >
                  {name}
                </RNText>
                <RNText style={styles.instructorHandle} maxFontSizeMultiplier={1.1}>
                  {instructorHandle(name)}
                </RNText>
              </Tap>
            ))}
          </ScrollView>
        </View>

        {/* =====================================================
            PROGRESS — quick widget
         ===================================================== */}
        <View style={styles.section}>
          <SectionHead eyebrow="YOUR PROGRESS" title="receipts." />
          <View style={styles.progressCard}>
            <View style={styles.progressLeft}>
              <RNText style={styles.progressKicker} maxFontSizeMultiplier={1.1}>
                OVERALL · {pct}%
              </RNText>
              <View style={{ marginTop: 4 }}>
                <Ticker
                  value={totalDone}
                  fontSize={48}
                  color={palette.ink}
                  label={`OF ${totalLessons} LESSONS`}
                />
              </View>
              <View style={styles.progressBarTrack}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${pct}%`, backgroundColor: palette.acid },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

        {/* =====================================================
            FOOTER CTA
         ===================================================== */}
        <View style={styles.section}>
          <Tap
            style={styles.footerCta}
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
        </View>
      </Animated.ScrollView>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Sub-components
 * --------------------------------------------------------------------- */

function StatCol({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.statCol}>
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

function StatDivider() {
  const styles = useThemedPaletteStyles(makeStyles);
  return <View style={styles.statDivider} />;
}

function SectionHead({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.sectionHead}>
      <RNText style={styles.sectionEyebrow} maxFontSizeMultiplier={1.15}>
        {eyebrow}
      </RNText>
      <RNText
        style={styles.sectionTitle}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {title}
      </RNText>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Styles
 * --------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  /* ---------- HERO ---------- */
  hero: {
    backgroundColor: staticPalette.ink,
    overflow: 'hidden',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  heroWave: { position: 'absolute', top: 0, left: 0, right: 0 },
  heroSafe: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 28,
  },
  heroTopBar: {
    paddingTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEyebrowWrap: { flex: 1, alignItems: 'center' },
  heroEyebrow: {
    ...T.label,
    color: staticPalette.bone,
    opacity: 0.7,
  },

  urlStrip: {
    marginTop: 14,
    height: 22,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(242,239,230,0.12)',
    justifyContent: 'center',
    overflow: 'hidden',
    marginHorizontal: -SCREEN_PADDING,
  },
  urlText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: staticPalette.bone,
    opacity: 0.65,
  },

  titleBlock: { marginTop: 24 },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 56,
    lineHeight: 54,
    letterSpacing: -2.2,
    color: staticPalette.bone,
  },
  titleItalic: {
    fontFamily: fonts.editorialItalic,
    color: staticPalette.acid,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: fonts.editorial,
    fontSize: 15,
    lineHeight: 22,
    color: staticPalette.bone,
    opacity: 0.78,
    marginTop: 14,
    maxWidth: 360,
  },

  /* ---------- Stats row ---------- */
  statsRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 6,
  },
  statValue: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
    color: staticPalette.bone,
    textAlign: 'center',
    width: '100%',
  },
  statLabel: {
    ...T.micro,
    fontSize: 9,
    color: staticPalette.mute,
    textAlign: 'center',
    width: '100%',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(242,239,230,0.18)',
  },

  /* ---------- Continue card ---------- */
  continueCard: {
    marginTop: 18,
    flexDirection: 'row',
    backgroundColor: 'rgba(242,239,230,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
    borderRadius: 20,
    overflow: 'hidden',
  },
  continueAccent: {
    width: 6,
  },
  continueBody: {
    flex: 1,
    padding: 18,
    gap: 8,
  },
  continueKicker: {
    ...T.label,
    color: staticPalette.bone,
    opacity: 0.6,
  },
  continueTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
    color: staticPalette.bone,
  },
  continueMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: 'rgba(242,239,230,0.7)',
  },
  continueBarTrack: {
    marginTop: 4,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(242,239,230,0.18)',
    overflow: 'hidden',
  },
  continueBarFill: { height: '100%', borderRadius: 3 },
  continueFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  continueFootText: {
    ...T.micro,
    color: staticPalette.bone,
    opacity: 0.75,
  },
  continuePlay: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Marquee ---------- */
  loopStrip: {
    height: LOOP_HEIGHT,
    overflow: 'hidden',
    backgroundColor: staticPalette.ink,
  },
  loopText: {
    fontFamily: fonts.displayBold,
    fontSize: 20,
    lineHeight: LOOP_HEIGHT,
    letterSpacing: -0.4,
    color: staticPalette.bone,
  },

  /* ---------- Generic sections ---------- */
  section: {
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 28,
  },
  sectionHead: {
    paddingTop: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  sectionEyebrow: { ...T.label, color: palette.ink, opacity: 0.55 },
  sectionTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    lineHeight: 34,
    letterSpacing: -1.2,
    color: palette.ink,
    marginTop: 8,
  },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },

  /* ---------- Course list ---------- */
  courseList: { gap: 12 },
  courseCard: {
    padding: 20,
    borderRadius: 22,
    gap: 12,
  },
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
  courseMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  courseMetaCell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
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
  courseFootRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
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
  instructorScrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 12,
  },
  instructorCard: {
    width: 130,
    gap: 8,
    alignItems: 'flex-start',
  },
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
  instructorHandle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: palette.mute,
  },

  /* ---------- Progress card ---------- */
  progressCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  progressLeft: { gap: 8 },
  progressKicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
  },
  progressBarTrack: {
    marginTop: 8,
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.line,
    overflow: 'hidden',
  },
  progressBarFill: { height: '100%', borderRadius: 3 },

  /* ---------- Footer CTA ---------- */
  footerCta: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 56,
    borderRadius: 28,
    backgroundColor: staticPalette.acid,
  },
  footerCtaLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    letterSpacing: 1.8,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },
});
