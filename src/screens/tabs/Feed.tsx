import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text as RNText,
  ScrollView,
  RefreshControl,
  FlatList,
  ListRenderItem,
  Platform,
} from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from '@/navigation';
import { Ionicons } from '@/icons';
import { Image } from '@/components/ui/Image';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import {
  feedPosts,
  challenges,
  risingList,
} from '@/data/mock';
import { Tap } from '@/components/ui/Tap';
import { BrandWordmark } from '@/components/brand/BrandWordmark';
import { useStore } from '@/store';
import { BadgePill } from '@/components/ui/BadgePill';
import { Chip } from '@/components/ui/Chip';
import { profileHref } from '@/data/people';

const { width } = Dimensions.get('window');

type Post = (typeof feedPosts)[number];
type Tab = 'FOR YOU' | 'FOLLOWING' | 'RISING';

// Stable, module-scoped FlatList helpers — recreating them inline on every
// render would defeat React.memo on rows.
const keyExtractor = (p: Post) => p.id;
const feedContentContainer = { paddingBottom: 120 };

/* --------------------------------------------------------------------------
 * Feed root
 * ------------------------------------------------------------------------ */

export default function Feed() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [tab, setTab] = useState<Tab>('FOR YOU');
  const [refreshing, setRefreshing] = useState(false);
  const following = useStore((s) => s.following);
  const toast = useStore((s) => s.toast);

  const visible = useMemo(() => {
    if (tab === 'FOLLOWING') {
      const handles = Object.keys(following).filter((h) => following[h]);
      if (handles.length === 0) return feedPosts.slice(0, 2);
      return feedPosts.filter((p) => handles.includes(p.handle));
    }
    if (tab === 'RISING') return feedPosts.filter((p) => p.rising);
    return feedPosts;
  }, [tab, following]);

  // Track the in-flight refresh timer so it gets cancelled if the screen
  // unmounts mid-refresh — otherwise we'd setState on an unmounted component
  // and React logs a warning.
  const refreshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (refreshTimer.current) clearTimeout(refreshTimer.current);
    refreshTimer.current = setTimeout(() => {
      setRefreshing(false);
      toast('Feed refreshed.', 'default');
      refreshTimer.current = null;
    }, 900);
  }, [toast]);

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item, index }) => (
      <>
        <PostCard post={item} />
        {/* every 4 posts, inject a side-widget */}
        {(index + 1) % 4 === 0 ? (
          index % 8 === 3 ? <WhoToFollow /> : <LiveChallengeCard />
        ) : null}
      </>
    ),
    []
  );

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <HeaderBar />
        <TabBar active={tab} onChange={setTab} />
      </SafeAreaView>

      <FlatList
        data={visible}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={StoriesStripMemo}
        ListEmptyComponent={
          <View style={styles.empty}>
            <RNText style={styles.emptyText}>
              Nothing in this tab yet. Follow someone to fill it up.
            </RNText>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={palette.ink}
          />
        }
        ItemSeparatorComponent={Separator}
        contentContainerStyle={feedContentContainer}
        showsVerticalScrollIndicator={false}
        // Android FlatList tuning. removeClippedSubviews drops off-screen
        // native views (huge memory + scroll smoothness win); the batch caps
        // keep frame budget tight so scrolling doesn't stall while we hydrate
        // off-screen rows.
        removeClippedSubviews={IS_ANDROID}
        initialNumToRender={6}
        maxToRenderPerBatch={IS_ANDROID ? 4 : 8}
        updateCellsBatchingPeriod={IS_ANDROID ? 60 : 50}
        windowSize={IS_ANDROID ? 7 : 11}
        // Honor system reduce-motion + skip overscroll bounce on Android,
        // which on some OEMs causes stutter when the list reaches its end.
        overScrollMode={IS_ANDROID ? 'never' : 'auto'}
      />
    </View>
  );
}

/* --------------------------------------------------------------------------
 * Stable list helpers
 * ------------------------------------------------------------------------ */

const Separator = React.memo(function Separator() {
  const styles = useThemedPaletteStyles(makeStyles);
  return <View style={styles.separator} />;
});

/* --------------------------------------------------------------------------
 * Header
 * ------------------------------------------------------------------------ */

function HeaderBar() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);

  return (
    <View style={styles.header}>
      <Tap
        onPress={() => router.push('/(modules)/notifications')}
        style={styles.iconBtn}
        burstColor={palette.acid}
      >
        <Ionicons name="notifications-outline" size={18} color={palette.ink} />
        <View style={styles.dot} />
      </Tap>
      <View style={styles.brandLockup}>
        <BrandWordmark style={styles.brandLogo} />
      </View>
      <Tap
        onPress={() => router.push('/(tabs)/inbox')}
        style={styles.iconBtn}
        burstColor={palette.acid}
      >
        <Ionicons name="chatbubble-outline" size={18} color={palette.ink} />
      </Tap>
    </View>
  );
}

function TabBar({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const tabs: Tab[] = ['FOR YOU', 'FOLLOWING', 'RISING'];
  return (
    <View style={styles.tabBar}>
      {tabs.map((t) => (
        <Tap
          key={t}
          onPress={() => onChange(t)}
          style={[styles.tabItem, active === t && styles.tabItemActive]}
          burstColor={palette.acid}
        >
          <RNText
            style={[styles.tabLabel, active === t && styles.tabLabelActive]}
            maxFontSizeMultiplier={1.1}
          >
            {t}
          </RNText>
        </Tap>
      ))}
    </View>
  );
}

/* --------------------------------------------------------------------------
 * Stories strip — horizontal creator circles at top of the feed
 * ------------------------------------------------------------------------ */

const StoriesStripMemo = <StoriesStrip />;

function StoriesStrip() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const profile = useStore((s) => s.profile);

  // Use the actual posts' avatars so story circles reflect the real creators
  // already present in the feed. Story rings/initials use a single pink accent
  // so the strip reads as one coherent row, not a multicolor jumble.
  const posts = feedPosts.slice(0, 9);
  const STORY_COLOR = palette.blush;
  const stories = [
    {
      key: 'me',
      name: 'You',
      initial: profile.name.slice(0, 1).toUpperCase(),
      color: STORY_COLOR,
      avatar: null as string | null,
      add: true,
    },
    ...posts.map((p) => ({
      key: p.handle,
      name: p.creator.split(' ')[0],
      initial: p.creator.slice(0, 1).toUpperCase(),
      color: STORY_COLOR,
      avatar: (p as any).avatar ?? null,
      add: false,
    })),
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.storiesRow}
    >
      {stories.map((s) => (
        <Tap
          key={s.key}
          onPress={() =>
            s.add
              ? toast('Story capture coming soon.', 'default')
              : toast(`Viewing ${s.name}'s story.`, 'default')
          }
          style={styles.storyCol}
          burstColor={s.color}
        >
          <View style={[styles.storyRing, { borderColor: s.color }]}>
            <View style={[styles.storyAvatar, { backgroundColor: s.color }]}>
              {s.avatar ? (
                <Image
                  source={{ uri: s.avatar }}
                  style={StyleSheet.absoluteFill as any}
                  contentFit="cover"
                  transition={180}
                  targetWidth={54}
                />
              ) : (
                <RNText style={styles.storyInitial} maxFontSizeMultiplier={1.1}>
                  {s.initial}
                </RNText>
              )}
            </View>
            {s.add ? (
              <View style={styles.storyAdd}>
                <Ionicons name="add" size={14} color={palette.bone} />
              </View>
            ) : null}
          </View>
          <RNText style={styles.storyName} numberOfLines={1} maxFontSizeMultiplier={1.15}>
            {s.name}
          </RNText>
        </Tap>
      ))}
    </ScrollView>
  );
}

function storyColor(rank: string) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const n = parseInt(rank, 10);
  const colors = [palette.acid, palette.electric, palette.blush, palette.ember];
  return colors[(n - 1) % colors.length];
}

/* --------------------------------------------------------------------------
 * Post card — avatar + name row, caption, media, engagement bar
 * ------------------------------------------------------------------------ */

// Memoize on post identity. The component subscribes to per-post store
// slices (likes/saves/following) via Zustand selectors, so memoing here only
// blocks parent-driven re-renders — store updates still re-render the row
// they apply to.
const PostCard = React.memo(PostCardImpl);

function PostCardImpl({ post }: { post: Post }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const liked = useStore((s) => !!s.likes[post.id]);
  const saved = useStore((s) => !!s.saves[post.id]);
  const toggleLike = useStore((s) => s.toggleLike);
  const toggleSave = useStore((s) => s.toggleSave);

  const likes = post.likes + (liked ? 1 : 0);

  const openPost = useCallback(() => router.push(`/(modules)/post/${post.id}` as any), [post.id]);
  const openProfile = useCallback(() => router.push(profileHref(post.handle) as any), [post.handle]);

  // Double-tap the thumbnail to like; single tap opens the post.
  const lastTap = useRef(0);
  const singleTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onThumbTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 240) {
      if (singleTapTimer.current) { clearTimeout(singleTapTimer.current); singleTapTimer.current = null; }
      lastTap.current = 0;
      if (!liked) toggleLike(post.id);
    } else {
      lastTap.current = now;
      singleTapTimer.current = setTimeout(() => { singleTapTimer.current = null; openPost(); }, 240);
    }
  }, [liked, post.id, toggleLike, openPost]);

  return (
    <View style={styles.ticketWrap}>
      {post.rising ? (
        <View style={styles.tape}>
          <RNText style={styles.tapeText}>RISING FAST</RNText>
        </View>
      ) : null}

      <View style={styles.ticketCard}>
        <View style={styles.ticketBody}>
          <View style={styles.ticketLeft}>
            <RNText style={styles.ticketKicker} numberOfLines={1}>
              {post.category}
            </RNText>
            <RNText
              style={styles.ticketCreator}
              numberOfLines={2}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
              onPress={openProfile}
            >
              {post.creator}
            </RNText>
            <RNText style={styles.ticketTitle} numberOfLines={2}>
              {post.title}
            </RNText>

            <View style={styles.metaBlock}>
              <View style={styles.metaRow}>
                <RNText style={styles.metaLabel}>Date</RNText>
                <RNText style={styles.metaValue}>{post.postedAgo}</RNText>
              </View>
              <View style={styles.metaRow}>
                <RNText style={styles.metaLabel}>Location</RNText>
                <RNText style={styles.metaValue} numberOfLines={1}>
                  {post.location}
                </RNText>
              </View>
              <View style={styles.metaRow}>
                <RNText style={styles.metaLabel}>Type</RNText>
                <RNText style={styles.metaValue} numberOfLines={1}>
                  {post.type}
                </RNText>
              </View>
            </View>
          </View>

          <Tap style={styles.thumbWrap} onPress={onThumbTap} burstColor={post.color}>
            {post.image ? (
              <Image
                source={{ uri: post.image }}
                style={StyleSheet.absoluteFill as any}
                contentFit="cover"
                transition={240}
                placeholder={{ blurhash: 'L6H2EC=PM+yV0g-mq.wG9c010J}I' }}
                targetWidth={140}
              />
            ) : null}
            {isVideo(post.type) ? (
              <View style={styles.thumbPlay}>
                <Ionicons name="play" size={16} color={palette.ink} />
              </View>
            ) : null}
          </Tap>
        </View>

        <View style={styles.perforation} />

        <View style={styles.ticketFooter}>
          <Tap
            onPress={openPost}
            style={styles.detailsBtn}
            burstColor={post.color}
          >
            <RNText style={styles.detailsText}>DETAILS</RNText>
            <Ionicons name="arrow-forward" size={12} color={palette.ink} />
          </Tap>

          <View style={styles.engageRow}>
            <Tap
              onPress={() => toggleLike(post.id)}
              style={styles.engagePill}
              burstColor={post.color}
            >
              <Ionicons
                name={liked ? 'heart' : 'heart-outline'}
                size={14}
                color={liked ? palette.ember : palette.ink}
              />
              <RNText style={styles.engagePillText}>{compact(likes)}</RNText>
            </Tap>
            <Tap
              onPress={openPost}
              style={styles.engagePill}
              burstColor={post.color}
            >
              <Ionicons name="chatbubble-outline" size={13} color={palette.ink} />
              <RNText style={styles.engagePillText}>{compact(post.comments)}</RNText>
            </Tap>
            <Tap
              onPress={() => toggleSave(post.id)}
              style={styles.engageIconPill}
              burstColor={post.color}
            >
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={13}
                color={palette.ink}
              />
            </Tap>
          </View>
        </View>
      </View>
    </View>
  );
}

function isVideo(type: string) {
  return type.toUpperCase().includes('VIDEO') || type.toUpperCase().includes('LIVE');
}

function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toString();
}

/* --------------------------------------------------------------------------
 * Inline widgets — break up the scroll with relevant side content
 * ------------------------------------------------------------------------ */

function WhoToFollow() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toggleFollow = useStore((s) => s.toggleFollow);
  const following = useStore((s) => s.following);
  const toast = useStore((s) => s.toast);
  const pick = risingList.slice(0, 3);

  return (
    <View style={styles.widget}>
      <View style={styles.widgetHead}>
        <RNText style={styles.widgetKicker} maxFontSizeMultiplier={1.15}>
          WHO TO FOLLOW
        </RNText>
        <Tap
          onPress={() => router.push('/(tabs)/explore')}
          burstColor={palette.ink}
        >
          <RNText style={styles.widgetAction} maxFontSizeMultiplier={1.15}>
            SEE ALL
          </RNText>
        </Tap>
      </View>
      {pick.map((r) => {
        const active = !!following[r.handle];
        return (
          <View key={r.handle} style={styles.widgetRow}>
            <View
              style={[
                styles.widgetAvatar,
                { backgroundColor: storyColor(r.rank) },
              ]}
            >
              <RNText style={styles.widgetAvatarText}>
                {r.name.slice(0, 1)}
              </RNText>
            </View>
            <View style={{ flex: 1 }}>
              <RNText
                style={styles.widgetName}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
                maxFontSizeMultiplier={1.15}
              >
                {r.name}
              </RNText>
              <RNText
                style={styles.widgetMeta}
                numberOfLines={1}
                maxFontSizeMultiplier={1.15}
              >
                {r.handle} · {r.type} · {r.city}
              </RNText>
            </View>
            <Tap
              onPress={() => {
                toggleFollow(r.handle);
                toast(active ? `Unfollowed ${r.handle}.` : `Following ${r.handle}.`, 'success');
              }}
              style={[
                styles.widgetFollow,
                active && { backgroundColor: palette.ink, borderColor: palette.ink },
              ]}
              burstColor={palette.acid}
            >
              <RNText
                style={[styles.widgetFollowLabel, active && { color: palette.bone }]}
                maxFontSizeMultiplier={1.1}
              >
                {active ? 'FOLLOWING' : 'FOLLOW'}
              </RNText>
            </Tap>
          </View>
        );
      })}
    </View>
  );
}

function LiveChallengeCard() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const c = challenges[0];

  return (
    <Tap
      onPress={() => router.push(`/(modules)/community/challenges/${c.id}` as any)}
      burstColor={c.color}
      variant="heavy"
      style={[styles.challenge, { backgroundColor: c.color }]}
    >
      <View style={styles.challengeTop}>
        <BadgePill label="LIVE CHALLENGE" accent={staticPalette.ink} />
        <RNText style={styles.challengeDays} maxFontSizeMultiplier={1.1}>
          {c.daysLeft}D LEFT
        </RNText>
      </View>
      <RNText
        style={styles.challengeTag}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        maxFontSizeMultiplier={1.1}
      >
        {c.tag}
      </RNText>
      <RNText style={styles.challengePrompt} numberOfLines={2} maxFontSizeMultiplier={1.15}>
        {c.prompt}
      </RNText>
      <View style={styles.challengeFoot}>
        <RNText style={styles.challengeMeta} maxFontSizeMultiplier={1.15}>
          {c.entries} ENTRIES · {c.prize}
        </RNText>
        <Ionicons name="arrow-forward" size={14} color={staticPalette.ink} />
      </View>
    </Tap>
  );
}

/* --------------------------------------------------------------------------
 * Styles
 * ------------------------------------------------------------------------ */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  /* ─── Header ─── */
  headerSafe: {
    backgroundColor: palette.bone,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  createBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLockup: {
    width: 130,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  brandLogo: {
    width: 132,
    height: 34,
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: palette.ember,
    borderWidth: 1.5,
    borderColor: palette.bone,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 10,
    gap: 6,
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabItemActive: {
    backgroundColor: palette.ink,
  },
  tabLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: palette.ink,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
  tabLabelActive: {
    color: palette.bone,
    opacity: 1,
  },
  tabUnderline: {
    width: 0,
    height: 0,
  },

  /* ─── Stories strip ─── */
  storiesRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  storyCol: { alignItems: 'center', gap: 6, width: 64 },
  storyRing: {
    width: 62,
    height: 62,
    borderRadius: 31,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  storyInitial: {
    ...T.title3,
    color: staticPalette.ink,
  },
  storyAdd: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: palette.ink,
    borderWidth: 2,
    borderColor: palette.bone,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyName: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.75,
    maxWidth: 64,
  },

  /* ─── Post ─── */
  separator: { height: 0 },
  post: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  postHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    ...T.title3,
    color: staticPalette.ink,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  postName: {
    ...T.body,
    color: palette.ink,
    flexShrink: 1,
  },
  verified: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: palette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postMeta: { ...T.micro, color: palette.ink, opacity: 0.55 },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: palette.acid,
    borderWidth: 1,
    borderColor: palette.acid,
  },
  followLabel: {
    ...T.label,
    color: staticPalette.ink,
  },

  captionBlock: { gap: 6 },
  captionTitle: {
    ...T.title2,
    color: palette.ink,
  },
  captionNote: {
    ...T.lead,
    color: palette.ink,
    opacity: 0.82,
  },

  media: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'flex-end',
    padding: 14,
  },
  /* Dark gradient-ish scrim via layered semi-transparent ink so overlaid
     text stays readable against any photo. */
  mediaScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,10,0.22)',
  },
  mediaCategoryPill: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: palette.bone,
  },
  mediaCategory: {
    ...T.label,
    color: staticPalette.ink,
  },
  playBadge: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -28,
    marginTop: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: palette.bone,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
  },
  mediaBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  mediaType: {
    ...T.micro,
    color: palette.bone,
    opacity: 0.95,
    flexShrink: 1,
  },
  mediaLocation: {
    ...T.micro,
    color: palette.bone,
    opacity: 0.85,
  },

  engage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 2,
  },
  engageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  engageIconBtn: { padding: 4 },
  engageCount: {
    ...T.small,
    color: staticPalette.ink,
  },

  /* ─── Widgets ─── */
  widget: {
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
    gap: 12,
  },
  widgetHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  widgetKicker: { ...T.label, color: palette.ink, opacity: 0.65 },
  widgetAction: { ...T.label, color: palette.electric },
  widgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  widgetAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetAvatarText: {
    ...T.small,
    color: staticPalette.ink,
  },
  widgetName: {
    ...T.body,
    color: palette.ink,
  },
  widgetMeta: { ...T.micro, color: palette.ink, opacity: 0.55, marginTop: 2 },
  widgetFollow: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: palette.acid,
    borderWidth: 1,
    borderColor: palette.acid,
  },
  widgetFollowLabel: {
    ...T.label,
    color: staticPalette.ink,
  },

  challenge: {
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 18,
    borderRadius: 20,
    gap: 10,
  },
  challengeTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  challengeDays: {
    ...T.small,
    color: staticPalette.ink,
  },
  challengeTag: {
    ...T.display3,
    color: staticPalette.ink,
    marginTop: 4,
  },
  challengePrompt: {
    ...T.editorial3,
    color: staticPalette.ink,
  },
  challengeFoot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  challengeMeta: {
    ...T.micro,
    color: staticPalette.ink,
    opacity: 0.72,
    flex: 1,
  },

  /* ─── Empty ─── */
  empty: { padding: 40, alignItems: 'center' },
  emptyText: {
    ...T.body,
    color: palette.ink,
    opacity: 0.55,
    textAlign: 'center',
    maxWidth: 300,
  },

  /* ─── Ticket-card post (redesign) ─── */
  ticketWrap: {
    marginHorizontal: 16,
    marginVertical: 8,
    position: 'relative',
  },
  tape: {
    position: 'absolute',
    top: -10,
    right: 14,
    zIndex: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#9CA3AF',
    borderWidth: 1.5,
    borderColor: palette.ink,
    transform: [{ rotate: '4deg' }],
  },
  tapeText: {
    ...T.label,
    color: staticPalette.bone,
  },
  ticketCard: {
    backgroundColor: palette.paper,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: palette.ink,
    overflow: 'hidden',
  },
  ticketBody: {
    flexDirection: 'row',
    padding: 16,
    gap: 14,
  },
  ticketLeft: {
    flex: 1,
    minWidth: 0,
  },
  ticketKicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.55,
    marginBottom: 6,
  },
  ticketCreator: {
    ...T.title2,
    color: palette.ink,
    includeFontPadding: false,
  },
  ticketTitle: {
    ...T.body,
    color: palette.ink,
    opacity: 0.78,
    marginTop: 4,
  },
  metaBlock: {
    marginTop: 10,
    gap: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    ...T.small,
    color: palette.ink,
    opacity: 0.5,
    width: 56,
  },
  metaValue: {
    flex: 1,
    ...T.small,
    color: palette.ink,
  },
  thumbWrap: {
    width: 100,
    height: 116,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: palette.boneSoft,
    borderWidth: 1,
    borderColor: palette.ink,
    position: 'relative',
  },
  thumbPlay: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: palette.bone,
    borderWidth: 1,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  perforation: {
    height: 1,
    marginHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: palette.ink,
    borderStyle: 'dashed',
    opacity: 0.35,
  },
  ticketFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  detailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailsText: {
    ...T.label,
    color: palette.ink,
  },
  engageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  engagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.ink,
    backgroundColor: 'transparent',
  },
  engagePillText: {
    ...T.small,
    color: palette.ink,
  },
  engageIconPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
