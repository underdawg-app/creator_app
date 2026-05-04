import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Platform,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { Image } from '@/components/ui/Image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@/icons';
import { router } from '@/navigation';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { profileMock, userFeed, type UserFeedItem } from '@/data/mock';
import { useStore } from '@/store';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { SkiaGrain } from '@/components/skia/SkiaGrain';
import { Marquee } from '@/components/ui/Marquee';
import { Tap } from '@/components/ui/Tap';
import { BadgePill } from '@/components/ui/BadgePill';

const { width } = Dimensions.get('window');

const SCREEN_PADDING = 24;
const GRID_GAP = 4;
const VIDEO_GAP = 10;
const POST_TILE_SIZE = (width - SCREEN_PADDING * 2 - GRID_GAP * 2) / 3;
const VIDEO_TILE_W = Math.floor((width - SCREEN_PADDING * 2 - VIDEO_GAP) / 2);
const VIDEO_TILE_H = VIDEO_TILE_W * 1.45;

type FeedTab = 'POSTS' | 'VIDEOS' | 'WRITTEN';

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

  const tabCount: Record<FeedTab, number> = {
    POSTS: imagePosts.length,
    VIDEOS: videoPosts.length,
    WRITTEN: textPosts.length,
  };

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
              <RNText style={styles.kicker} maxFontSizeMultiplier={1.1}>
                YOUR PROFILE
              </RNText>
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
              {/* Avatar circle — centered above the name */}
              <View style={styles.avatarWrap}>
                <View style={styles.avatarRing}>
                  <Image
                    source={{ uri: profileMock.avatar }}
                    style={styles.avatar}
                    cachePolicy="memory-disk"
                    contentFit="cover"
                    transition={150}
                    priority="high"
                    targetWidth={120}
                  />
                </View>
                <View style={styles.avatarStatusDot} />
              </View>

              <View style={styles.nameBlock}>
                <RNText
                  style={styles.bigName}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                  maxFontSizeMultiplier={1.1}
                >
                  {firstName}.
                </RNText>
                <RNText
                  style={styles.bigNameAccent}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                  maxFontSizeMultiplier={1.1}
                >
                  {lastName}.
                </RNText>
                <RNText style={styles.handleText} maxFontSizeMultiplier={1.1}>
                  {profile.handle}
                </RNText>
              </View>
            </View>

            <View style={styles.metaRow}>
              <RNText
                style={styles.metaText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
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
            style={{ height: LOOP_HEIGHT, width: width, backgroundColor: palette.ink }}
          />
        </View>

        {/* ===== PERSONAL FEED ===== */}
        <View style={styles.feedSection}>
          <View style={styles.feedHead}>
            <RNText style={styles.feedKicker} maxFontSizeMultiplier={1.1}>
              YOUR FEED · {userFeed.length} POSTS
            </RNText>
            <RNText
              style={styles.feedTitle}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              maxFontSizeMultiplier={1.1}
            >
              everything <RNText style={styles.feedItalic}>you</RNText> made.
            </RNText>
          </View>

          <View style={styles.tabBar}>
            <FeedTabBtn
              active={tab === 'POSTS'}
              icon="grid-outline"
              label="POSTS"
              count={tabCount.POSTS}
              onPress={() => setTab('POSTS')}
            />
            <FeedTabBtn
              active={tab === 'VIDEOS'}
              icon="play-circle-outline"
              label="VIDEOS"
              count={tabCount.VIDEOS}
              onPress={() => setTab('VIDEOS')}
            />
            <FeedTabBtn
              active={tab === 'WRITTEN'}
              icon="reader-outline"
              label="WRITTEN"
              count={tabCount.WRITTEN}
              onPress={() => setTab('WRITTEN')}
            />
          </View>

          {tab === 'POSTS' ? <PostsGrid items={imagePosts} /> : null}
          {tab === 'VIDEOS' ? <VideosGrid items={videoPosts} /> : null}
          {tab === 'WRITTEN' ? <WrittenList items={textPosts} /> : null}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Feed tabs + per-kind layouts
 * --------------------------------------------------------------------- */

function FeedTabBtn({
  active,
  icon,
  label,
  count,
  onPress,
}: {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  count: number;
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
        size={16}
        color={active ? palette.bone : palette.ink}
      />
      <RNText
        style={[styles.tabLabel, active && { color: palette.bone }]}
        maxFontSizeMultiplier={1.1}
      >
        {label}
      </RNText>
      <RNText
        style={[styles.tabCount, active && { color: palette.acid }]}
        maxFontSizeMultiplier={1.1}
      >
        {count}
      </RNText>
    </Tap>
  );
}

function PostsGrid({ items }: { items: UserFeedItem[] }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <View style={styles.postsGrid}>
      {items.map((p, i) => (
        <Tap
          key={p.id}
          style={[
            styles.postTile,
            i === 0 && styles.postTileFeatured,
            { backgroundColor: palette.ink },
          ]}
          onPress={() => router.push('/(modules)/portfolio')}
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
          <View style={styles.postTileScrim} pointerEvents="none" />
          <View style={[styles.postTileAccent, { backgroundColor: p.accent }]} />
          {i === 0 ? (
            <View style={styles.postTileMeta}>
              <RNText style={styles.postTileTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
                {p.title}
              </RNText>
              <RNText style={styles.postTileAgo} maxFontSizeMultiplier={1.1}>
                {p.postedAgo} · {compact(p.likes)} likes
              </RNText>
            </View>
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
          onPress={() => router.push('/(modules)/portfolio')}
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
          <View style={styles.videoTileTop}>
            <View style={[styles.videoCategoryPill, { backgroundColor: v.accent }]}>
              <RNText style={styles.videoCategoryLabel} maxFontSizeMultiplier={1.1}>
                {v.category ?? 'VIDEO'}
              </RNText>
            </View>
            {v.duration ? (
              <View style={styles.videoDurationPill}>
                <Ionicons name="time-outline" size={11} color={staticPalette.bone} />
                <RNText style={styles.videoDuration} maxFontSizeMultiplier={1.1}>
                  {v.duration}
                </RNText>
              </View>
            ) : null}
          </View>
          <View style={styles.videoPlayBadge}>
            <Ionicons name="play" size={22} color={staticPalette.ink} />
          </View>
          <View style={styles.videoTileBottom}>
            <RNText style={styles.videoTileTitle} numberOfLines={1} maxFontSizeMultiplier={1.1}>
              {v.title}
            </RNText>
            <View style={styles.videoTileFoot}>
              <View style={styles.videoStat}>
                <Ionicons name="heart" size={11} color={staticPalette.bone} />
                <RNText style={styles.videoStatText} maxFontSizeMultiplier={1.1}>
                  {compact(v.likes)}
                </RNText>
              </View>
              <View style={styles.videoStat}>
                <Ionicons name="chatbubble" size={10} color={staticPalette.bone} />
                <RNText style={styles.videoStatText} maxFontSizeMultiplier={1.1}>
                  {compact(v.comments)}
                </RNText>
              </View>
              <View style={{ flex: 1 }} />
              <RNText style={styles.videoTileAgo} maxFontSizeMultiplier={1.1}>
                {v.postedAgo}
              </RNText>
            </View>
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
  },
  avatar: {
    flex: 1,
    borderRadius: 44,
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
    fontSize: 52,
    lineHeight: 52,
    color: staticPalette.bone,
    letterSpacing: -2.2,
  },
  bigNameAccent: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 52,
    color: staticPalette.acid,
    letterSpacing: -2.2,
  },

  metaRow: { marginTop: 16, alignItems: 'center' },
  metaText: { ...T.label, color: staticPalette.bone, opacity: 0.8, textAlign: 'center' },

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

  /* ---------- Continuous marquee strip ---------- */
  loopStrip: {
    height: LOOP_HEIGHT,
    overflow: 'hidden',
    backgroundColor: palette.ink,
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
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  tabBtnActive: {
    backgroundColor: palette.ink,
  },
  tabLabel: {
    ...T.button,
    fontSize: 11,
    color: palette.ink,
  },
  tabCount: {
    ...T.micro,
    fontSize: 10,
    color: palette.mute,
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
  postTileFeatured: {
    width: POST_TILE_SIZE * 2 + GRID_GAP,
    height: POST_TILE_SIZE * 2 + GRID_GAP,
    borderRadius: 8,
  },
  postTileScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  postTileAccent: {
    position: 'absolute',
    left: 8,
    top: 8,
    width: 22,
    height: 3,
    borderRadius: 2,
  },
  postTileMeta: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
  },
  postTileTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: -0.6,
    color: staticPalette.bone,
  },
  postTileAgo: {
    ...T.micro,
    color: 'rgba(242,239,230,0.78)',
    marginTop: 4,
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
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  videoTileTop: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  videoCategoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  videoCategoryLabel: {
    ...T.micro,
    fontSize: 9,
    color: staticPalette.ink,
  },
  videoDurationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: 'rgba(10,10,10,0.6)',
  },
  videoDuration: {
    ...T.micro,
    fontSize: 10,
    color: staticPalette.bone,
  },
  videoPlayBadge: {
    position: 'absolute',
    alignSelf: 'center',
    top: '40%',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoTileBottom: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
  },
  videoTileTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.4,
    color: staticPalette.bone,
  },
  videoTileFoot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  videoStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  videoStatText: {
    ...T.micro,
    fontSize: 10,
    color: staticPalette.bone,
  },
  videoTileAgo: {
    ...T.micro,
    fontSize: 10,
    color: 'rgba(242,239,230,0.7)',
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
});
