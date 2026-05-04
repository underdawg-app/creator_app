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
import { useStore } from '@/store';
import { BrandSignet } from '@/components/svg/Wordmark';
import { BadgePill } from '@/components/ui/BadgePill';
import { Chip } from '@/components/ui/Chip';

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
  const profile = useStore((s) => s.profile);

  return (
    <View style={styles.header}>
      <View style={styles.brandLockup}>
        <BrandSignet size={20} color={palette.ink} accent={palette.acid} />
        <RNText style={styles.wordmark} maxFontSizeMultiplier={1.1}>
          UNDERDAWGS
        </RNText>
      </View>
      <View style={styles.headerRight}>
        <Tap
          onPress={() => toast('Search coming soon.', 'default')}
          style={styles.iconBtn}
          burstColor={palette.ink}
        >
          <Ionicons name="search" size={18} color={palette.ink} />
        </Tap>
        <Tap
          onPress={() => toast('3 new notifications.', 'default')}
          style={styles.iconBtn}
          burstColor={palette.acid}
        >
          <Ionicons name="notifications-outline" size={18} color={palette.ink} />
          <View style={styles.dot} />
        </Tap>
        <Tap
          onPress={() => router.push('/(tabs)/profile')}
          style={styles.avatarSmall}
          burstColor={palette.acid}
          variant="heavy"
        >
          <RNText style={styles.avatarSmallText}>
            {profile.name.slice(0, 1).toUpperCase()}
          </RNText>
        </Tap>
      </View>
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
          {active === t ? <View style={styles.tabUnderline} /> : null}
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
  const following = useStore((s) => !!s.following[post.handle]);
  const toggleLike = useStore((s) => s.toggleLike);
  const toggleSave = useStore((s) => s.toggleSave);
  const toggleFollow = useStore((s) => s.toggleFollow);

  const likes = post.likes + (liked ? 1 : 0);
  const avatarColor = post.color;

  return (
    <View style={styles.post}>
      {/* ── Header row ── */}
      <View style={styles.postHead}>
        <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
          {post.avatar ? (
            <Image
              source={{ uri: post.avatar }}
              style={StyleSheet.absoluteFill as any}
              contentFit="cover"
              transition={180}
              targetWidth={42}
            />
          ) : (
            <RNText style={styles.avatarText} maxFontSizeMultiplier={1.1}>
              {post.creator.slice(0, 1)}
            </RNText>
          )}
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={styles.nameRow}>
            <RNText
              style={styles.postName}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              maxFontSizeMultiplier={1.15}
            >
              {post.creator}
            </RNText>
            {post.rising ? (
              <View style={styles.verified}>
                <Ionicons name="checkmark" size={10} color={staticPalette.ink} />
              </View>
            ) : null}
          </View>
          <RNText
            style={styles.postMeta}
            numberOfLines={1}
            maxFontSizeMultiplier={1.15}
          >
            {post.handle} · {post.location} · {post.postedAgo}
          </RNText>
        </View>
        <Tap
          onPress={() => {
            toggleFollow(post.handle);
            toast(
              following ? `Unfollowed ${post.handle}.` : `Following ${post.handle}.`,
              following ? 'default' : 'success'
            );
          }}
          style={[
            styles.followBtn,
            following && { backgroundColor: palette.ink, borderColor: palette.ink },
          ]}
          burstColor={palette.acid}
        >
          <RNText
            style={[
              styles.followLabel,
              following && { color: palette.bone },
            ]}
            maxFontSizeMultiplier={1.1}
          >
            {following ? 'FOLLOWING' : 'FOLLOW'}
          </RNText>
        </Tap>
      </View>

      {/* ── Caption ── */}
      <View style={styles.captionBlock}>
        <RNText
          style={styles.captionTitle}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
          maxFontSizeMultiplier={1.1}
        >
          {post.title}
        </RNText>
        <RNText style={styles.captionNote} maxFontSizeMultiplier={1.2}>
          {post.note}
        </RNText>
      </View>

      {/* ── Media block — real image with content overlays ── */}
      <Tap
        onPress={() => toast('Post detail opening…', 'default')}
        burstColor={post.color}
      >
        <View style={[styles.media, { backgroundColor: post.bg }]}>
          {post.image ? (
            <Image
              source={{ uri: post.image }}
              style={StyleSheet.absoluteFill as any}
              contentFit="cover"
              transition={240}
              placeholder={{ blurhash: 'L6H2EC=PM+yV0g-mq.wG9c010J}I' }}
              targetWidth={width}
            />
          ) : null}
          {/* scrim for legibility of overlays */}
          <View style={styles.mediaScrim} pointerEvents="none" />
          <View style={styles.mediaCategoryPill}>
            <RNText style={styles.mediaCategory} maxFontSizeMultiplier={1.1}>
              {post.category}
            </RNText>
          </View>
          {isVideo(post.type) ? (
            <View style={styles.playBadge}>
              <Ionicons name="play" size={20} color={palette.ink} />
            </View>
          ) : null}
          <View style={styles.mediaBottomRow}>
            <RNText style={styles.mediaType} numberOfLines={1} maxFontSizeMultiplier={1.1}>
              {post.type}
            </RNText>
            <RNText style={styles.mediaLocation} numberOfLines={1} maxFontSizeMultiplier={1.1}>
              {post.location}
            </RNText>
          </View>
        </View>
      </Tap>

      {/* ── Engagement bar ── */}
      <View style={styles.engage}>
        <Tap
          onPress={() => toggleLike(post.id)}
          burstColor={post.color}
          variant="heavy"
          style={styles.engageBtn}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={18}
            color={liked ? palette.ember : palette.ink}
          />
          <RNText style={styles.engageCount} maxFontSizeMultiplier={1.15}>
            {compact(likes)}
          </RNText>
        </Tap>
        <Tap
          onPress={() => toast('Comments opening…', 'default')}
          burstColor={post.color}
          style={styles.engageBtn}
        >
          <Ionicons name="chatbubble-outline" size={17} color={palette.ink} />
          <RNText style={styles.engageCount} maxFontSizeMultiplier={1.15}>
            {compact(post.comments)}
          </RNText>
        </Tap>
        <Tap
          onPress={() => toast('Reposted.', 'success')}
          burstColor={post.color}
          style={styles.engageBtn}
        >
          <Ionicons name="repeat" size={18} color={palette.ink} />
          <RNText style={styles.engageCount} maxFontSizeMultiplier={1.15}>
            {compact(post.reposts)}
          </RNText>
        </Tap>
        <View style={{ flex: 1 }} />
        <Tap
          onPress={() => toggleSave(post.id)}
          burstColor={post.color}
          style={styles.engageIconBtn}
        >
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={17}
            color={saved ? palette.acid : palette.ink}
          />
        </Tap>
        <Tap
          onPress={() => toast('Share sheet opened.', 'default')}
          burstColor={post.color}
          style={styles.engageIconBtn}
        >
          <Ionicons name="share-outline" size={17} color={palette.ink} />
        </Tap>
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
  brandLockup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wordmark: {
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    letterSpacing: 2.8,
    color: palette.ink,
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
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: staticPalette.ink,
  },

  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 4,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  tabItemActive: {},
  tabLabel: {
    ...T.label,
    color: palette.ink,
    opacity: 0.45,
  },
  tabLabelActive: { opacity: 1 },
  tabUnderline: {
    height: 3,
    width: '100%',
    backgroundColor: palette.acid,
    marginTop: 6,
    borderRadius: 2,
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
    fontFamily: fonts.displayBold,
    fontSize: 22,
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
  separator: { height: 1, backgroundColor: palette.line, marginHorizontal: 0 },
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
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: staticPalette.ink,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  postName: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.3,
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
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
    color: staticPalette.ink,
  },

  captionBlock: { gap: 6 },
  captionTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.7,
    color: palette.ink,
  },
  captionNote: {
    fontFamily: fonts.editorial,
    fontSize: 16,
    lineHeight: 22,
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
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
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
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.4,
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
  widgetKicker: { ...T.label, color: staticPalette.ink, opacity: 0.65 },
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
    fontFamily: fonts.displayBold,
    fontSize: 16,
    color: staticPalette.ink,
  },
  widgetName: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    letterSpacing: -0.2,
    color: staticPalette.ink,
  },
  widgetMeta: { ...T.micro, color: staticPalette.ink, opacity: 0.55, marginTop: 2 },
  widgetFollow: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: palette.acid,
    borderWidth: 1,
    borderColor: palette.acid,
  },
  widgetFollowLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.4,
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
    fontFamily: fonts.displayBold,
    fontSize: 13,
    color: staticPalette.ink,
    letterSpacing: -0.3,
  },
  challengeTag: {
    fontFamily: fonts.displayBold,
    fontSize: 26,
    letterSpacing: -0.8,
    color: staticPalette.ink,
    marginTop: 4,
  },
  challengePrompt: {
    fontFamily: fonts.editorialItalic,
    fontSize: 19,
    lineHeight: 24,
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
});
