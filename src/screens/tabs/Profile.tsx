import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  Modal,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { Image } from '@/components/ui/Image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { profileMock, userFeed, coursesSeed, type UserFeedItem } from '@/data/mock';
import { useStore } from '@/store';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { SkiaGrain } from '@/components/skia/SkiaGrain';
import { Marquee } from '@/components/ui/Marquee';
import { Tap } from '@/components/ui/Tap';
import { BadgePill } from '@/components/ui/BadgePill';

const { width } = Dimensions.get('window');

const SCREEN_PADDING = 12;
const GRID_GAP = 4;
const VIDEO_GAP = 10;
// Reserved exclusively for the "completed" state in the profile-setup
// strip — progress bar fill, percent badge, count accent, and each step's
// checkmark badge. Never used for any other UI state so the user can
// always read "neon green = done".
const NEON_GREEN = '#39FF14';
const POST_TILE_SIZE = (width - SCREEN_PADDING * 2 - GRID_GAP * 2) / 3;
const VIDEO_TILE_W = Math.floor((width - SCREEN_PADDING * 2 - VIDEO_GAP) / 2);
const VIDEO_TILE_H = VIDEO_TILE_W * 1.45;

type FeedTab = 'POSTS' | 'VIDEOS' | 'WRITTEN' | 'LEVEL UP';

/** Single continuous marquee strip below the hero. */
const LOOP_HEIGHT = 44;

const loopTextStyle = {
  fontFamily: fonts.displayBold,
  fontSize: 22,
  lineHeight: LOOP_HEIGHT,
  letterSpacing: -0.6,
  color: staticPalette.bone,
};

export default function Profile() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);

  const followers = profileMock.stats.followers;
  const earned = profileMock.stats.earned;

  const [tab, setTab] = useState<FeedTab>('POSTS');
  const [previewOpen, setPreviewOpen] = useState(false);

  const scrollY = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const firstName = (profile.name.split(' ')[0] || 'Sola').toUpperCase();
  const lastName = (profile.name.split(' ')[1] || 'Roux').toUpperCase();

  const imagePosts = userFeed.filter((i) => i.kind === 'image');
  const videoPosts = userFeed.filter((i) => i.kind === 'video');
  const textPosts = userFeed.filter((i) => i.kind === 'text');

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        onScroll={onScroll}
        // Halve the JS-thread scroll-callback rate on Android. The parallax
        // worklet still tracks finger position on the UI thread; this only
        // throttles the JS handler and trims back the work done per frame.
        scrollEventThrottle={IS_ANDROID ? 32 : 16}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={IS_ANDROID}
        overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* ===== HERO ===== */}
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
            <View style={styles.heroTopBar}>
              <Tap
                onPress={() => router.push('/(modules)/community')}
                style={styles.profileMenuBtn}
                burstColor={staticPalette.bone}
              >
                <Ionicons name="people-circle-outline" size={18} color={staticPalette.bone} />
                <RNText style={styles.profileMenuLabel} maxFontSizeMultiplier={1.1}>
                  COMMUNITY
                </RNText>
                <Ionicons name="chevron-forward" size={12} color={staticPalette.bone} />
              </Tap>
              <Tap
                onPress={() => router.push('/(modules)/settings')}
                style={styles.iconBtn}
                burstColor={staticPalette.bone}
              >
                <Ionicons name="settings-outline" size={16} color={staticPalette.bone} />
              </Tap>
            </View>

            {/* Avatar (centered top) + Name block (centered below) */}
            <View style={styles.heroNameAvatarRow}>
              {/* Avatar — tap anywhere on the photo (or the pencil badge) to
                  open ProfileEdit. Pencil sits on the bottom-right corner,
                  outside the ring's clipping, so it reads as a sticker. */}
              <Pressable
                onPress={() => router.push('/(modules)/profile/edit')}
                onLongPress={() => setPreviewOpen(true)}
                delayLongPress={250}
                style={styles.avatarWrap}
                hitSlop={6}
              >
                <View style={styles.avatarRing}>
                  <Image
                    source={{ uri: profile.avatar || profileMock.avatar }}
                    style={styles.avatar}
                    cachePolicy="memory-disk"
                    contentFit="cover"
                    transition={150}
                    priority="high"
                    targetWidth={120}
                  />
                </View>
                <View style={styles.avatarEditPip}>
                  <Ionicons name="pencil" size={12} color={staticPalette.ink} />
                </View>
              </Pressable>

              <View style={styles.nameBlock}>
                <RNText
                  style={styles.bigName}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.65}
                  maxFontSizeMultiplier={1.1}
                >
                  {firstName} <RNText style={styles.bigNameAccent}>{lastName}</RNText>
                </RNText>
                <RNText style={styles.handleText} maxFontSizeMultiplier={1.1}>
                  {profile.handle}
                </RNText>
              </View>
            </View>

            <View style={styles.metaRow}>
              {/* Locked at fontSize 16 — no adjustsFontSizeToFit. If the combined
                  type + location overflows one line we wrap to two; we never
                  shrink the type. */}
              <RNText
                style={styles.metaText}
                numberOfLines={2}
                maxFontSizeMultiplier={1.1}
              >
                {profile.type} · {profile.location}
              </RNText>
            </View>

            <View style={styles.pillRow}>
              <BadgePill tier="RISING" accent={palette.acid} inverse />
              <BadgePill label="VERIFIED" accent={palette.electric} inverse />
            </View>

            <RNText
              style={styles.bio}
              numberOfLines={3}
              maxFontSizeMultiplier={1.15}
            >
              {profile.bio}
            </RNText>

            {/* Stats — each column is now tappable and routes to its module */}
            <View style={styles.statsRow}>
              <StatCol
                label="FOLLOWERS"
                value={compact(followers)}
                onPress={() => router.push('/(modules)/audience')}
              />
              <StatDivider />
              <StatCol
                label="REPUTATION"
                value={String(profile.reputation)}
                accent
                onPress={() => router.push('/(modules)/reputation')}
              />
              <StatDivider />
              <StatCol
                label="₹ EARNED"
                value={compact(earned)}
                onPress={() => router.push('/(modules)/finance')}
              />
            </View>

            {/* View Analytics — wide, short, Instagram-like */}
            <Tap
              style={styles.analyticsCard}
              burstColor={palette.acid}
              onPress={() => router.push('/(modules)/analytics')}
            >
              <View style={styles.analyticsLeft}>
                <View style={styles.analyticsIcon}>
                  <Ionicons name="trending-up" size={16} color={staticPalette.ink} />
                </View>
                <View>
                  <RNText style={styles.analyticsLabel} maxFontSizeMultiplier={1.1}>
                    VIEW ANALYTICS
                  </RNText>
                  <RNText style={styles.analyticsSub} maxFontSizeMultiplier={1.15}>
                    +24% reach this week
                  </RNText>
                </View>
              </View>
              <View style={styles.analyticsRight}>
                <MiniSpark />
                <Ionicons name="arrow-forward" size={14} color={staticPalette.bone} />
              </View>
            </Tap>

            {/* CTAs — PORTFOLIO + MY STORE */}
            <View style={styles.ctaRow}>
              <View style={styles.ctaSlot}>
                <Tap
                  style={styles.ctaPrimary}
                  burstColor={palette.ink}
                  variant="heavy"
                  onPress={() => router.push('/(modules)/portfolio')}
                >
                  <RNText style={styles.ctaPrimaryLabel} maxFontSizeMultiplier={1.1}>
                    PORTFOLIO
                  </RNText>
                  <Ionicons name="arrow-forward" size={13} color={staticPalette.ink} />
                </Tap>
              </View>
              <View style={styles.ctaSlot}>
                <Tap
                  style={styles.ctaGhost}
                  burstColor={staticPalette.bone}
                  onPress={() => router.push('/(modules)/merch')}
                >
                  <Ionicons
                    name="storefront-outline"
                    size={14}
                    color={staticPalette.bone}
                  />
                  <RNText style={styles.ctaGhostLabel} maxFontSizeMultiplier={1.1}>
                    MY STORE
                  </RNText>
                </Tap>
              </View>
            </View>
          </SafeAreaView>

          <SkiaGrain width={width} height={620} intensity={0.08} tint={[1, 1, 1, 0.16]} />
        </View>

        {/* ===== PROFILE SETUP STRIP ===== */}
        <ProfileSetupStrip />

        {/* ===== Continuous moving marquee (single strip) ===== */}
        <View style={styles.loopStrip}>
          <Marquee
            items={[
              'NEW COLLECTION',
              'UNDERDAWG SS26',
              'GET PAID',
              'GET DISCOVERED',
              'GET CONNECTED',
              'YOU ARE UNDERDAWG',
            ]}
            speed={52}
            direction="left"
            separator="   ·   "
            textStyle={loopTextStyle}
            style={{ height: LOOP_HEIGHT, width: width, backgroundColor: staticPalette.ink }}
          />
        </View>

        {/* ===== PERSONAL FEED ===== */}
        <View style={styles.feedSection}>
          <View style={styles.tabBar}>
            <View style={styles.tabSlot}>
              <FeedTabBtn
                active={tab === 'POSTS'}
                icon="grid-outline"
                onPress={() => setTab('POSTS')}
              />
            </View>
            <View style={styles.tabSlot}>
              <FeedTabBtn
                active={tab === 'VIDEOS'}
                icon="play-circle-outline"
                onPress={() => setTab('VIDEOS')}
              />
            </View>
            <View style={styles.tabSlot}>
              <FeedTabBtn
                active={tab === 'WRITTEN'}
                icon="reader-outline"
                onPress={() => setTab('WRITTEN')}
              />
            </View>
            <View style={styles.tabSlot}>
              <FeedTabBtn
                active={tab === 'LEVEL UP'}
                icon="rocket-outline"
                onPress={() => setTab('LEVEL UP')}
              />
            </View>
          </View>

          {tab === 'POSTS' ? <PostsGrid items={imagePosts} /> : null}
          {tab === 'VIDEOS' ? <VideosGrid items={videoPosts} /> : null}
          {tab === 'WRITTEN' ? <WrittenList items={textPosts} /> : null}
          {tab === 'LEVEL UP' ? <LevelUpList /> : null}
        </View>
      </Animated.ScrollView>

      <AvatarPreview
        visible={previewOpen}
        uri={profile.avatar || profileMock.avatar}
        onClose={() => setPreviewOpen(false)}
      />
    </View>
  );
}

function AvatarPreview({
  visible,
  uri,
  onClose,
}: {
  visible: boolean;
  uri: string;
  onClose: () => void;
}) {
  // Single shared value drives both backdrop fade + photo scale.
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withTiming(visible ? 1 : 0, {
      duration: visible ? 200 : 160,
      easing: Easing.out(Easing.cubic),
    });
  }, [visible]);

  const backdrop = useAnimatedStyle(() => ({ opacity: p.value * 0.92 }));
  const photo = useAnimatedStyle(() => ({
    opacity: p.value,
    transform: [{ scale: 0.6 + p.value * 0.4 }],
  }));

  const big = Math.min(width - 48, 360);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable onPress={onClose} style={StyleSheet.absoluteFill}>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            { backgroundColor: staticPalette.ink },
            backdrop,
          ]}
        />
        <View style={previewStyles.center} pointerEvents="none">
          <Animated.View
            style={[
              previewStyles.frame,
              { width: big, height: big, borderRadius: big / 2 },
              photo,
            ]}
          >
            <Image
              source={{ uri }}
              style={previewStyles.image}
              cachePolicy="memory-disk"
              contentFit="cover"
              transition={100}
              priority="high"
              targetWidth={Math.round(big * 2)}
            />
          </Animated.View>
        </View>
      </Pressable>
    </Modal>
  );
}

const previewStyles = StyleSheet.create({
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: staticPalette.acid,
    backgroundColor: staticPalette.ink,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

/* -----------------------------------------------------------------------
 * Feed tabs + per-kind layouts
 * --------------------------------------------------------------------- */

function FeedTabBtn({
  active,
  icon,
  onPress,
}: {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap
      style={[styles.tabBtn, active && styles.tabBtnActive]}
      onPress={onPress}
      burstColor={palette.acid}
    >
      <Ionicons
        name={icon}
        size={20}
        color={active ? palette.bone : palette.ink}
      />
    </Tap>
  );
}

function PostsGrid({ items }: { items: UserFeedItem[] }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.postsGrid}>
      {items.map((p) => (
        <Tap
          key={p.id}
          style={[styles.postTile, { backgroundColor: palette.ink }]}
          onPress={() =>
            router.push(`/(modules)/profile/post/${p.id}` as any)
          }
          burstColor={p.accent}
        >
          {p.image ? (
            <Image
              source={{ uri: p.image }}
              style={StyleSheet.absoluteFill as any}
              contentFit="cover"
              transition={200}
              targetWidth={POST_TILE_SIZE}
            />
          ) : null}
        </Tap>
      ))}
    </View>
  );
}

function VideosGrid({ items }: { items: UserFeedItem[] }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.videosGrid}>
      {items.map((v) => (
        <Tap
          key={v.id}
          style={[styles.videoTile, { backgroundColor: palette.ink }]}
          onPress={() =>
            router.push(`/(modules)/profile/reel/${v.id}` as any)
          }
          burstColor={v.accent}
        >
          {v.image ? (
            <Image
              source={{ uri: v.image }}
              style={StyleSheet.absoluteFill as any}
              contentFit="cover"
              transition={200}
              targetWidth={VIDEO_TILE_W}
            />
          ) : null}
          <View style={styles.videoTileScrim} pointerEvents="none" />
          <View style={styles.videoPlayMark}>
            <Ionicons name="play" size={14} color={staticPalette.bone} />
          </View>
        </Tap>
      ))}
    </View>
  );
}

function WrittenList({ items }: { items: UserFeedItem[] }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.writtenList}>
      {items.map((t) => (
        <Tap
          key={t.id}
          style={styles.writtenCard}
          onPress={() => router.push('/(modules)/portfolio')}
          burstColor={t.accent}
        >
          <View style={styles.writtenHead}>
            <View style={[styles.writtenAccent, { backgroundColor: t.accent }]} />
            <RNText style={styles.writtenKicker} maxFontSizeMultiplier={1.1}>
              {profileMock.handle} · {t.postedAgo}
            </RNText>
            <View style={{ flex: 1 }} />
            <Ionicons name="ellipsis-horizontal" size={14} color={palette.ink} />
          </View>
          <RNText
            style={styles.writtenTitle}
            numberOfLines={2}
            maxFontSizeMultiplier={1.1}
          >
            {t.title}
          </RNText>
          <RNText style={styles.writtenBody} maxFontSizeMultiplier={1.15}>
            {t.body}
          </RNText>
          <View style={styles.writtenFoot}>
            <View style={styles.writtenStat}>
              <Ionicons name="heart-outline" size={14} color={palette.ink} />
              <RNText style={styles.writtenStatText} maxFontSizeMultiplier={1.1}>
                {compact(t.likes)}
              </RNText>
            </View>
            <View style={styles.writtenStat}>
              <Ionicons name="chatbubble-outline" size={13} color={palette.ink} />
              <RNText style={styles.writtenStatText} maxFontSizeMultiplier={1.1}>
                {compact(t.comments)}
              </RNText>
            </View>
            <View style={styles.writtenStat}>
              <Ionicons name="repeat" size={14} color={palette.ink} />
              <RNText style={styles.writtenStatText} maxFontSizeMultiplier={1.1}>
                {compact(t.reposts)}
              </RNText>
            </View>
          </View>
        </Tap>
      ))}
    </View>
  );
}

function LevelUpList() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const progress = useStore((s) => s.lessonProgress);

  const totalLessons = profileMock ? coursesSeed.reduce((a, c) => a + c.lessons, 0) : 0;
  const totalDone = coursesSeed.reduce((a, c) => a + (progress[c.id] ?? 0), 0);
  const pct = totalLessons === 0 ? 0 : Math.round((totalDone / totalLessons) * 100);

  return (
    <View style={styles.levelUpWrap}>
      {/* Progress summary card */}
      <Tap
        style={styles.levelUpSummary}
        burstColor={palette.acid}
        variant="heavy"
        onPress={() => router.push('/(modules)/learning' as any)}
      >
        <View style={styles.levelUpSummaryLeft}>
          <RNText style={styles.levelUpKicker} maxFontSizeMultiplier={1.1}>
            LEVEL UP · {coursesSeed.length} COURSES
          </RNText>
          <RNText style={styles.levelUpHeadline} maxFontSizeMultiplier={1.1}>
            <RNText style={styles.levelUpHeadlineAccent}>{totalDone}</RNText>
            <RNText> of {totalLessons} lessons done.</RNText>
          </RNText>
          <View style={styles.levelUpBar}>
            <View
              style={[
                styles.levelUpBarFill,
                { width: `${pct}%`, backgroundColor: staticPalette.acid },
              ]}
            />
          </View>
          <RNText style={styles.levelUpBarMeta} maxFontSizeMultiplier={1.1}>
            {pct}% complete · keep going.
          </RNText>
        </View>
        <View style={styles.levelUpPctBadge}>
          <RNText style={styles.levelUpPctText}>{pct}%</RNText>
        </View>
      </Tap>

      {/* Course cards */}
      {coursesSeed.map((c) => {
        const done = progress[c.id] ?? 0;
        const courseProgress = c.lessons === 0 ? 0 : (done / c.lessons) * 100;
        const finished = done >= c.lessons;
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
              ) : null}
            </View>
            <RNText
              style={styles.courseTitle}
              numberOfLines={3}
              adjustsFontSizeToFit
              minimumFontScale={0.75}
              maxFontSizeMultiplier={1.1}
            >
              {c.title}
            </RNText>
            <RNText style={styles.courseMeta} maxFontSizeMultiplier={1.1}>
              {c.instructor} · {c.duration} · {c.lessons} lessons
            </RNText>
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
                  {finished ? 'REVIEW' : done > 0 ? 'CONTINUE' : 'START'}
                </RNText>
                <Ionicons name="arrow-forward" size={13} color={staticPalette.ink} />
              </View>
            </View>
          </Tap>
        );
      })}

      <Tap
        style={styles.levelUpAll}
        burstColor={palette.acid}
        onPress={() => router.push('/(modules)/learning' as any)}
      >
        <Ionicons name="trophy-outline" size={14} color={palette.ink} />
        <RNText style={styles.levelUpAllLabel} maxFontSizeMultiplier={1.1}>
          OPEN LEVEL UP
        </RNText>
        <Ionicons name="arrow-forward" size={13} color={palette.ink} />
      </Tap>
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
  onPress,
}: {
  label: string;
  value: string;
  accent?: boolean;
  onPress?: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap style={styles.statCol} onPress={onPress} burstColor={staticPalette.bone}>
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
    </Tap>
  );
}

function StatDivider() {
  const styles = useThemedPaletteStyles(makeStyles);
  return <View style={styles.statDivider} />;
}

/* -----------------------------------------------------------------------
 * Profile setup — Instagram-style stepped completion strip
 * --------------------------------------------------------------------- */

type SetupStep = {
  key: string;
  title: string;
  sub: string;
  icon: keyof typeof Ionicons.glyphMap;
  accent: string;
  route: string;
  done: boolean;
};

function ProfileSetupStrip() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const profile = useStore((s) => s.profile);
  const following = useStore((s) => s.following);
  const followingCount = Object.values(following).filter(Boolean).length;

  // Per-step accent — every step gets a distinct, non-red hue. Ember is
  // intentionally absent; neon green is reserved exclusively for the
  // "done" state so completion always pops.
  const steps: SetupStep[] = [
    {
      key: 'photo',
      title: 'ADD PHOTO',
      sub: 'show your face',
      icon: 'camera-outline',
      accent: palette.blush,
      route: '/(modules)/profile/edit',
      done: !!profileMock.avatar,
    },
    {
      key: 'bio',
      title: 'WRITE BIO',
      sub: 'one line on you',
      icon: 'create-outline',
      accent: palette.electric,
      route: '/(modules)/profile/edit',
      done: !!profile.bio && profile.bio.trim().length > 0,
    },
    {
      key: 'craft',
      title: 'PICK CRAFT',
      sub: 'what you make',
      icon: 'sparkles-outline',
      accent: '#A78BFA',
      route: '/(onboarding)/creator-type',
      done: !!profile.type && profile.type.trim().length > 0,
    },
    {
      key: 'location',
      title: 'LOCATION',
      sub: 'where you are',
      icon: 'location-outline',
      accent: '#06B6D4',
      route: '/(modules)/profile/edit',
      done: !!profile.location && profile.location.trim().length > 0,
    },
    {
      key: 'follow',
      title: 'FOLLOW 5',
      sub: `${followingCount} so far`,
      icon: 'person-add-outline',
      accent: palette.acid,
      route: '/(tabs)/explore',
      done: followingCount >= 5,
    },
    {
      key: 'socials',
      title: 'CONNECT',
      sub: 'IG · TT · SP',
      icon: 'link-outline',
      accent: palette.blush,
      route: '/(modules)/audience',
      done: false,
    },
    {
      key: 'verified',
      title: 'GET VERIFIED',
      sub: 'claim the tick',
      icon: 'checkmark-circle-outline',
      accent: palette.electric,
      route: '/(modules)/reputation/verification',
      done: false,
    },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const total = steps.length;
  const pct = Math.round((doneCount / total) * 100);

  if (doneCount === total) return null;

  return (
    <View style={styles.setupWrap}>
      <View style={styles.setupHead}>
        <View style={{ flex: 1 }}>
          <RNText style={styles.setupKicker} maxFontSizeMultiplier={1.15}>
            COMPLETE YOUR PROFILE
          </RNText>
          <RNText style={styles.setupTitle} maxFontSizeMultiplier={1.1}>
            <RNText style={styles.setupTitleAccent}>{doneCount}</RNText>
            <RNText> of {total} done.</RNText>
          </RNText>
        </View>
        <View style={styles.setupPctBadge}>
          <RNText style={styles.setupPctText}>{pct}%</RNText>
        </View>
      </View>

      <View style={styles.setupBar}>
        <View
          style={[
            styles.setupBarFill,
            { width: `${pct}%`, backgroundColor: NEON_GREEN },
          ]}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.setupScrollContent}
        style={styles.setupScroll}
      >
        {steps.map((s) => (
          <SetupCard key={s.key} step={s} />
        ))}
      </ScrollView>
    </View>
  );
}

function SetupCard({ step }: { step: SetupStep }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const c = step.done ? null : step;

  return (
    <Tap
      onPress={() => router.push(step.route as any)}
      burstColor={step.accent}
      style={[
        styles.setupCard,
        step.done
          ? { backgroundColor: palette.paper, borderColor: palette.line }
          : { backgroundColor: step.accent, borderColor: step.accent },
      ]}
    >
      <View
        style={[
          styles.setupIcon,
          step.done
            ? { backgroundColor: NEON_GREEN }
            : { backgroundColor: 'rgba(10,10,10,0.12)' },
        ]}
      >
        <Ionicons
          name={step.done ? 'checkmark' : step.icon}
          size={18}
          color={staticPalette.ink}
        />
      </View>
      <RNText
        style={[
          styles.setupCardTitle,
          { color: step.done ? palette.ink : staticPalette.ink },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.8}
      >
        {step.title}
      </RNText>
      <RNText
        style={[
          styles.setupCardSub,
          {
            color: step.done
              ? palette.mute
              : 'rgba(10,10,10,0.65)',
          },
        ]}
        numberOfLines={1}
      >
        {step.done ? 'done' : step.sub}
      </RNText>
    </Tap>
  );
}

/* Tiny inline bar-spark used inside the Analytics wide card */
function MiniSpark() {
  const heights = [8, 14, 10, 18, 12, 22, 16];
  return (
    <View style={sparkStyles.row}>
      {heights.map((h, i) => (
        <View
          key={i}
          style={[
            sparkStyles.bar,
            { height: h, backgroundColor: i === heights.length - 1 ? staticPalette.acid : 'rgba(242,239,230,0.55)' },
          ]}
        />
      ))}
    </View>
  );
}

const sparkStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 22 },
  bar: { width: 3, borderRadius: 1.5 },
});

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toString();
}

/* -----------------------------------------------------------------------
 * Styles
 * --------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  hero: {
    backgroundColor: staticPalette.ink,
    overflow: 'hidden',
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  heroWave: { position: 'absolute', top: 0, left: 0, right: 0 },
  heroSafe: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 24,
  },

  heroTopBar: {
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kicker: { ...T.label, color: staticPalette.bone, opacity: 0.7 },
  profileMenuBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
  },
  profileMenuLabel: {
    ...T.label,
    color: staticPalette.bone,
    letterSpacing: 1.8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Avatar ---------- */
  avatarWrap: {
    width: 96,
    height: 96,
    flexShrink: 0,
    marginTop: 10,
    alignSelf: 'center',
  },
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: staticPalette.acid,
    padding: 3,
    backgroundColor: staticPalette.ink,
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    borderRadius: 44,
    overflow: 'hidden',
    backgroundColor: 'rgba(242,239,230,0.12)',
  },
  avatarStatusDot: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: staticPalette.acid,
    borderWidth: 2,
    borderColor: staticPalette.ink,
  },
  // Pencil sticker for "tap the photo to edit profile". Sits at the top-right
  // corner, opposite the status dot, outside the ring's clipping so it reads
  // as a chip floating on the photo.
  avatarEditPip: {
    position: 'absolute',
    right: -4,
    top: -4,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: staticPalette.acid,
    borderWidth: 2,
    borderColor: staticPalette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- Name + Avatar stack (centered) ---------- */
  heroNameAvatarRow: {
    marginTop: 18,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
  },

  /* ---------- Name block ---------- */
  nameBlock: { alignItems: 'center' },
  handleText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: staticPalette.acid,
    opacity: 0.85,
    marginTop: 6,
    letterSpacing: 0.2,
  },
  italicGreet: {
    fontFamily: fonts.editorialItalic,
    fontSize: 26,
    lineHeight: 26,
    color: staticPalette.bone,
    letterSpacing: -0.3,
  },
  bigName: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    lineHeight: 34,
    color: staticPalette.bone,
    letterSpacing: -1.2,
    textAlign: 'center',
  },
  bigNameAccent: {
    fontFamily: fonts.displayBold,
    fontSize: 32,
    lineHeight: 34,
    color: staticPalette.acid,
    letterSpacing: -1.2,
  },

  metaRow: { marginTop: 14, alignItems: 'center' },
  metaText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.6,
    color: staticPalette.bone,
    opacity: 0.92,
    textAlign: 'center',
  },

  pillRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  bio: {
    fontFamily: fonts.editorial,
    fontSize: 15,
    lineHeight: 21,
    color: staticPalette.bone,
    opacity: 0.86,
    marginTop: 14,
    maxWidth: 360,
    textAlign: 'center',
    alignSelf: 'center',
  },

  /* ---------- Stats row ---------- */
  statsRow: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(242,239,230,0.18)',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 8,
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
    color: staticPalette.mute,
    textAlign: 'center',
    width: '100%',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: 'rgba(242,239,230,0.18)',
  },

  /* ---------- Analytics wide card ---------- */
  analyticsCard: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 58,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.22)',
    backgroundColor: 'rgba(242,239,230,0.04)',
  },
  analyticsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  analyticsIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  analyticsLabel: {
    ...T.button,
    fontSize: 11,
    color: staticPalette.bone,
  },
  analyticsSub: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: staticPalette.mute,
    marginTop: 2,
  },
  analyticsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  /* ---------- CTA row ---------- */
  ctaRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  ctaSlot: { flex: 1 },
  ctaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: staticPalette.acid,
    height: 48,
    borderRadius: 24,
  },
  ctaPrimaryLabel: { ...T.button, fontSize: 12, color: staticPalette.ink },
  ctaGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.32)',
  },
  ctaGhostLabel: { ...T.button, fontSize: 12, color: staticPalette.bone },

  /* ---------- Profile setup strip ---------- */
  setupWrap: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 10,
    paddingBottom: 14,
    marginTop: -6,
    backgroundColor: palette.bone,
  },
  setupHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  setupKicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
    letterSpacing: 1.6,
  },
  setupTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
    color: palette.ink,
    marginTop: 4,
  },
  setupTitleAccent: {
    fontFamily: fonts.editorialItalic,
    color: NEON_GREEN,
  },
  setupPctBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: NEON_GREEN,
  },
  setupPctText: {
    fontFamily: fonts.displayBold,
    fontSize: 12,
    color: staticPalette.ink,
    letterSpacing: -0.2,
  },
  setupBar: {
    marginTop: 12,
    height: 4,
    borderRadius: 2,
    backgroundColor: palette.line,
    overflow: 'hidden',
  },
  setupBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  setupScroll: { marginTop: 14, marginHorizontal: -SCREEN_PADDING },
  setupScrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    gap: 10,
  },
  setupCard: {
    width: 132,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    gap: 8,
  },
  setupIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setupCardTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.3,
  },
  setupCardSub: {
    ...T.label,
    fontSize: 10,
    letterSpacing: 1.2,
  },

  /* ---------- Continuous marquee strip ---------- */
  loopStrip: {
    height: LOOP_HEIGHT,
    overflow: 'hidden',
    backgroundColor: staticPalette.ink,
  },

  /* ---------- Personal feed section ---------- */
  feedSection: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 28,
  },
  feedHead: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  feedKicker: { ...T.label, color: palette.ink, opacity: 0.6 },
  feedTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 40,
    lineHeight: 42,
    letterSpacing: -1.8,
    color: palette.ink,
    marginTop: 12,
  },
  feedItalic: { fontFamily: fonts.editorialItalic, color: palette.electric },

  tabBar: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 6,
    padding: 4,
    borderRadius: 24,
    backgroundColor: 'rgba(10,10,10,0.04)',
    borderWidth: 1,
    borderColor: palette.line,
  },
  tabSlot: { flex: 1 },
  tabBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  tabBtnActive: {
    backgroundColor: palette.ink,
  },

  /* ---------- POSTS — Instagram-style 3-col grid ---------- */
  postsGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  postTile: {
    width: POST_TILE_SIZE,
    height: POST_TILE_SIZE,
    overflow: 'hidden',
    borderRadius: 4,
  },

  /* ---------- VIDEOS — 2-col reel grid ---------- */
  videosGrid: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: VIDEO_GAP,
  },
  videoTile: {
    width: VIDEO_TILE_W,
    height: VIDEO_TILE_H,
    borderRadius: 14,
    overflow: 'hidden',
  },
  videoTileScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  videoPlayMark: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(10,10,10,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ---------- WRITTEN — editorial posts on page surface, hairline-separated ---------- */
  writtenList: {
    marginTop: 8,
  },
  writtenCard: {
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  writtenHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  writtenAccent: {
    width: 14,
    height: 3,
    borderRadius: 2,
  },
  writtenKicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
  },
  writtenTitle: {
    fontFamily: fonts.editorialItalic,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.6,
    color: palette.ink,
    marginTop: 10,
  },
  writtenBody: {
    fontFamily: fonts.editorial,
    fontSize: 15,
    lineHeight: 22,
    color: palette.ink,
    opacity: 0.85,
    marginTop: 8,
  },
  writtenFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  writtenStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  writtenStatText: {
    ...T.micro,
    color: palette.ink,
  },

  /* ---------- LEVEL UP — course cards inside the feed ---------- */
  levelUpWrap: {
    marginTop: 18,
    gap: 12,
  },
  levelUpSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
    borderRadius: 22,
    backgroundColor: staticPalette.ink,
    overflow: 'hidden',
  },
  levelUpSummaryLeft: { flex: 1, gap: 8 },
  levelUpKicker: {
    ...T.label,
    color: staticPalette.bone,
    opacity: 0.55,
  },
  levelUpHeadline: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
    color: staticPalette.bone,
  },
  levelUpHeadlineAccent: {
    fontFamily: fonts.editorialItalic,
    color: staticPalette.acid,
  },
  levelUpBar: {
    marginTop: 4,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(242,239,230,0.18)',
    overflow: 'hidden',
  },
  levelUpBarFill: { height: '100%', borderRadius: 3 },
  levelUpBarMeta: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: 'rgba(242,239,230,0.7)',
  },
  levelUpPctBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelUpPctText: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    letterSpacing: -0.3,
    color: staticPalette.ink,
  },

  courseCard: {
    padding: 18,
    borderRadius: 22,
    gap: 10,
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
  courseTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: -0.8,
    color: staticPalette.ink,
    marginTop: 4,
  },
  courseMeta: {
    ...T.micro,
    fontSize: 10,
    color: staticPalette.ink,
    opacity: 0.7,
  },
  courseBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(10,10,10,0.18)',
    overflow: 'hidden',
    marginTop: 4,
  },
  courseBarFill: { height: '100%', backgroundColor: staticPalette.ink, borderRadius: 3 },
  courseFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
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
    gap: 5,
  },
  courseFootCta: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.8,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },

  levelUpAll: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
  },
  levelUpAllLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 1.6,
    color: palette.ink,
    textTransform: 'uppercase',
  },
});
