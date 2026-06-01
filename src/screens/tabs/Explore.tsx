import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
  TextInput,
  Pressable,
  Image as RNImage,
  Animated as RNAnimated,
} from 'react-native';

// Height (in px) of the SearchBar + TabBar block that auto-hides on
// scroll-down and re-shows on scroll-up. Plain RN Animated with
// useNativeDriver:false — Android-safe.
const SCROLLAWAY_HEIGHT = 104;
const HIDE_THRESHOLD = 12;

const HEADER_LOGO = require('@/objects/brand-wordmark.png');

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
  categoriesGrid,
  jobsSeed,
} from '@/data/mock';
import { Tap } from '@/components/ui/Tap';
import { useStore } from '@/store';
import { BadgePill } from '@/components/ui/BadgePill';
import { JobRow } from '@/components/jobs/JobRow';

const { width } = Dimensions.get('window');

type Post = (typeof feedPosts)[number];
type Tab = 'FOR YOU' | 'FOLLOWING' | 'RISING';
type FeedItem =
  | { kind: 'post'; post: Post; key: string }
  | { kind: 'gig'; job: (typeof jobsSeed)[number]; key: string }
  | { kind: 'who'; key: string }
  | { kind: 'challenge'; key: string };

const CATEGORY_ICONS: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
  art: 'color-palette',
  music: 'musical-notes',
  film: 'film',
  dance: 'body',
  poetry: 'book',
  design: 'shapes',
  fashion: 'shirt',
  podcast: 'mic',
};

const CATEGORY_TO_POST_CATEGORY: Record<string, string[]> = {
  art: ['VISUAL ART'],
  music: ['MUSIC'],
  film: ['FILM'],
  dance: ['DANCE'],
  poetry: ['POETRY'],
  design: ['DESIGN'],
  fashion: ['FASHION'],
  podcast: ['PODCAST'],
};

// Stable FlatList helpers — module-scoped so memoized rows don't churn.
const keyExtractor = (it: FeedItem) => it.key;
const contentContainer = { paddingBottom: 160 };

/* --------------------------------------------------------------------------
 * Screen root — merged Feed + Explore
 * ------------------------------------------------------------------------ */

export default function Explore() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [tab, setTab] = useState<Tab>('FOR YOU');
  const [craft, setCraft] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const following = useStore((s) => s.following);
  const toast = useStore((s) => s.toast);

  const visiblePosts = useMemo(() => {
    let list: Post[] = feedPosts;
    if (tab === 'FOLLOWING') {
      const handles = Object.keys(following).filter((h) => following[h]);
      list = handles.length === 0 ? feedPosts.slice(0, 2) : feedPosts.filter((p) => handles.includes(p.handle));
    } else if (tab === 'RISING') {
      list = feedPosts.filter((p) => p.rising);
    }
    if (craft) {
      const matches = CATEGORY_TO_POST_CATEGORY[craft] ?? [];
      if (matches.length > 0) {
        list = list.filter((p) => matches.includes(p.category));
      }
    }
    return list;
  }, [tab, following, craft]);

  // Interleave posts with sponsored gigs and side widgets so the scroll
  // never feels like an undifferentiated wall of media. The cadence is
  // fixed so users can predict where ads land:
  //   - every 3rd item: sponsored gig (rotates through jobsSeed)
  //   - every 7th item: who-to-follow card
  //   - every 11th item: live challenge card
  const feedItems = useMemo<FeedItem[]>(() => {
    const out: FeedItem[] = [];
    let gigIndex = 0;
    visiblePosts.forEach((post, i) => {
      out.push({ kind: 'post', post, key: `p-${post.id}` });
      const slot = i + 1;
      if (slot % 3 === 0) {
        const job = jobsSeed[gigIndex % jobsSeed.length];
        out.push({ kind: 'gig', job, key: `g-${slot}-${job.id}` });
        gigIndex += 1;
      }
      if (slot % 7 === 0) {
        out.push({ kind: 'who', key: `w-${slot}` });
      }
      if (slot % 11 === 0) {
        out.push({ kind: 'challenge', key: `c-${slot}` });
      }
    });
    return out;
  }, [visiblePosts]);

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

  const [savedGigs, setSavedGigs] = useState<Record<string, boolean>>({});
  const toggleGigSave = useCallback((id: string) => {
    setSavedGigs((s) => {
      const next = !s[id];
      toast(next ? 'Saved for later.' : 'Removed from saved.', 'success');
      return { ...s, [id]: next };
    });
  }, [toast]);

  const renderItem: ListRenderItem<FeedItem> = useCallback(({ item }) => {
    if (item.kind === 'post') return <PostCard post={item.post} />;
    if (item.kind === 'gig') {
      return (
        <JobRow
          job={item.job}
          saved={!!savedGigs[item.job.id]}
          onSave={() => toggleGigSave(item.job.id)}
        />
      );
    }
    if (item.kind === 'who') return <WhoToFollow />;
    return <LiveChallengeCard />;
  }, [savedGigs, toggleGigSave]);

  const listHeader = (
    <>
      <BrowseByCraft active={craft} onChange={setCraft} />
    </>
  );

  // Auto-hide search+tabs on scroll. `hidden` is a stock RN Animated.Value
  // (not reanimated) so the JS-thread animation is safe on Android.
  // 0 = fully shown, 1 = fully hidden.
  const hidden = useRef(new RNAnimated.Value(0)).current;
  const lastYRef = useRef(0);
  const isHiddenRef = useRef(false);
  const animateTo = useCallback(
    (toValue: number, duration: number) => {
      RNAnimated.timing(hidden, {
        toValue,
        duration,
        useNativeDriver: false,
      }).start();
      isHiddenRef.current = toValue === 1;
    },
    [hidden],
  );
  const onScroll = useCallback(
    (e: any) => {
      const y = e.nativeEvent.contentOffset.y;
      const dy = y - lastYRef.current;
      lastYRef.current = y;
      if (y <= 0) {
        if (isHiddenRef.current) animateTo(0, 180);
        return;
      }
      if (dy > HIDE_THRESHOLD && !isHiddenRef.current) {
        animateTo(1, 220);
      } else if (dy < -HIDE_THRESHOLD && isHiddenRef.current) {
        animateTo(0, 200);
      }
    },
    [animateTo],
  );
  const animatedHeight = hidden.interpolate({
    inputRange: [0, 1],
    outputRange: [SCROLLAWAY_HEIGHT, 0],
  });
  const animatedOpacity = hidden.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <HeaderBar />
        <RNAnimated.View
          style={{ height: animatedHeight, opacity: animatedOpacity, overflow: 'hidden' }}
        >
          <SearchBar />
          <TabBar active={tab} onChange={setTab} />
        </RNAnimated.View>
      </SafeAreaView>

      <FlatList
        data={feedItems}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={
          <View style={styles.empty}>
            <RNText style={styles.emptyText}>
              Nothing here yet. Follow someone or switch tabs to fill it up.
            </RNText>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={palette.ink} />
        }
        ItemSeparatorComponent={Separator}
        contentContainerStyle={contentContainer}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={IS_ANDROID}
        initialNumToRender={6}
        maxToRenderPerBatch={IS_ANDROID ? 4 : 8}
        updateCellsBatchingPeriod={IS_ANDROID ? 60 : 50}
        windowSize={IS_ANDROID ? 7 : 11}
        overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
}

/* --------------------------------------------------------------------------
 * Header & top tabs
 * ------------------------------------------------------------------------ */

const Separator = React.memo(function Separator() {
  const styles = useThemedPaletteStyles(makeStyles);
  return <View style={styles.separator} />;
});

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
        <View style={styles.notifDot} />
      </Tap>
      <View style={styles.headerCenter}>
        <RNImage
          source={HEADER_LOGO}
          style={[styles.headerLogo, { tintColor: palette.ink }]}
          resizeMode="contain"
        />
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

function SearchBar() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const [query, setQuery] = useState('');
  return (
    <View style={styles.searchWrap}>
      <Ionicons name="search-outline" size={16} color={palette.mute} />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search creators, tags, gigs..."
        placeholderTextColor={palette.mute}
        style={styles.searchInput}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {query.length > 0 ? (
        <Pressable onPress={() => setQuery('')} hitSlop={10}>
          <Ionicons name="close-circle" size={16} color={palette.mute} />
        </Pressable>
      ) : null}
    </View>
  );
}

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
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
 * Stories strip
 * ------------------------------------------------------------------------ */

function StoriesStrip() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const profile = useStore((s) => s.profile);

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

/* --------------------------------------------------------------------------
 * Browse by Craft — large horizontal cards, not pill chips
 * ------------------------------------------------------------------------ */

function BrowseByCraft({
  active,
  onChange,
}: {
  active: string | null;
  onChange: (k: string | null) => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);

  return (
    <View style={styles.craftSection}>
      <View style={styles.craftHead}>
        <View style={styles.craftHeadLeft}>
          <View style={[styles.craftDot, { backgroundColor: palette.ink }]} />
          <RNText style={styles.craftKicker} maxFontSizeMultiplier={1.15}>
            BROWSE BY CRAFT
          </RNText>
        </View>
        {active ? (
          <Tap onPress={() => onChange(null)} burstColor={palette.acid}>
            <RNText style={styles.craftClear} maxFontSizeMultiplier={1.15}>
              CLEAR
            </RNText>
          </Tap>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.craftRow}
      >
        <Tap
          onPress={() => onChange(null)}
          burstColor={palette.acid}
          style={[
            styles.craftPill,
            active === null && {
              backgroundColor: palette.acid,
              borderColor: palette.ink,
            },
          ]}
        >
          <RNText
            style={[styles.craftPillLabel, { color: palette.ink }]}
            numberOfLines={1}
            maxFontSizeMultiplier={1.1}
          >
            All
          </RNText>
        </Tap>
        {categoriesGrid.map((c) => {
          const isActive = active === c.key;
          return (
            <Tap
              key={c.key}
              onPress={() => onChange(isActive ? null : c.key)}
              burstColor={c.accent}
              style={[
                styles.craftPill,
                isActive && { backgroundColor: c.accent, borderColor: palette.ink },
              ]}
            >
              <RNText
                style={[styles.craftPillLabel, { color: palette.ink }]}
                numberOfLines={1}
                maxFontSizeMultiplier={1.1}
              >
                {c.label}
              </RNText>
            </Tap>
          );
        })}
      </ScrollView>
    </View>
  );
}

/* --------------------------------------------------------------------------
 * Post card — same engagement model as the old Feed, lifted in
 * ------------------------------------------------------------------------ */

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

  return (
    <View style={styles.post}>
      <View style={styles.postHead}>
        <View style={[styles.avatar, { backgroundColor: post.color }]}>
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
                <Ionicons name="checkmark" size={10} color={staticPalette.bone} />
              </View>
            ) : null}
          </View>
          <RNText style={styles.postMeta} numberOfLines={1} maxFontSizeMultiplier={1.15}>
            {post.handle} · {post.location} · {post.postedAgo}
          </RNText>
        </View>
        <Tap
          onPress={() => {
            toggleFollow(post.handle);
          }}
          style={[
            styles.followBtn,
            following && { backgroundColor: palette.ink, borderColor: palette.ink },
          ]}
          burstColor={palette.acid}
        >
          <RNText
            style={[styles.followLabel, following && { color: palette.bone }]}
            maxFontSizeMultiplier={1.1}
          >
            {following ? 'FOLLOWING' : 'FOLLOW'}
          </RNText>
        </Tap>
      </View>

      <Tap onPress={() => toast('Post detail opening…', 'default')} burstColor={post.color}>
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
          <View style={styles.mediaScrim} pointerEvents="none" />
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

      <View style={styles.captionBlock}>
        <RNText style={styles.captionLine} maxFontSizeMultiplier={1.2}>
          <RNText style={styles.captionHandle}>{post.handle}</RNText>
          <RNText> {post.title} · </RNText>
          <RNText style={styles.captionNote}>{post.note}</RNText>
        </RNText>
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
 * Who-to-follow widget — kept from the old feed
 * ------------------------------------------------------------------------ */

function WhoToFollow() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toggleFollow = useStore((s) => s.toggleFollow);
  const following = useStore((s) => s.following);
  const toast = useStore((s) => s.toast);
  const pick = risingList.slice(0, 3);

  const ringColors = [palette.acid, palette.electric, palette.blush];

  return (
    <View style={styles.widget}>
      <View style={styles.widgetHead}>
        <RNText style={styles.widgetKicker} maxFontSizeMultiplier={1.15}>
          WHO TO FOLLOW
        </RNText>
        <Tap onPress={() => toast('See all rising creators.', 'default')} burstColor={palette.ink}>
          <RNText style={styles.widgetAction} maxFontSizeMultiplier={1.15}>
            SEE ALL
          </RNText>
        </Tap>
      </View>
      {pick.map((r, i) => {
        const active = !!following[r.handle];
        return (
          <View key={r.handle} style={styles.widgetRow}>
            <View style={[styles.widgetAvatar, { backgroundColor: ringColors[i % ringColors.length] }]}>
              <RNText style={styles.widgetAvatarText}>{r.name.slice(0, 1)}</RNText>
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
              <RNText style={styles.widgetMeta} numberOfLines={1} maxFontSizeMultiplier={1.15}>
                {r.handle} · {r.type} · {r.city}
              </RNText>
            </View>
            <Tap
              onPress={() => {
                toggleFollow(r.handle);
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
  const c = challenges[0];

  return (
    <Tap
      onPress={() => router.push(`/(modules)/community/challenges/${c.id}` as any)}
      burstColor={c.color}
      style={styles.challenge}
    >
      <View style={[styles.challengeStripe, { backgroundColor: c.color }]} />
      <View style={styles.challengeBody}>
        <View style={styles.challengeMetaRow}>
          <View style={[styles.challengeLiveDot, { backgroundColor: c.color }]} />
          <RNText style={styles.challengeKicker} maxFontSizeMultiplier={1.1}>
            LIVE CHALLENGE
          </RNText>
          <RNText style={styles.challengeDot}>·</RNText>
          <RNText style={styles.challengeDays} maxFontSizeMultiplier={1.1}>
            {c.daysLeft}D LEFT
          </RNText>
        </View>
        <RNText
          style={styles.challengeTag}
          numberOfLines={1}
          maxFontSizeMultiplier={1.1}
        >
          {c.tag}
        </RNText>
        <RNText style={styles.challengePrompt} numberOfLines={2} maxFontSizeMultiplier={1.15}>
          {c.prompt}
        </RNText>
        <RNText style={styles.challengeFootMeta} maxFontSizeMultiplier={1.1}>
          {c.entries} entries · {c.prize}
        </RNText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={palette.ink} />
    </Tap>
  );
}

/* --------------------------------------------------------------------------
 * Styles
 * ------------------------------------------------------------------------ */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  /* ─── Header (no left create button — that lives in the bottom FAB now) ── */
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
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerCenter: {
    width: 200,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
  },
  headerLogo: {
    position: 'absolute',
    alignSelf: 'center',
    top: -38,
    width: 160,
    height: 120,
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
  notifDot: {
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

  /* ─── Search bar above the tabs ── */
  searchWrap: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 0,
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.paper,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    ...T.body,
    color: palette.ink,
    paddingVertical: 0,
  },

  /* ─── Top segmented tabs (pill style) ── */
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
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
    ...T.label,
    color: palette.ink,
    opacity: 0.5,
  },
  tabLabelActive: {
    color: palette.bone,
    opacity: 1,
  },
  tabUnderline: {
    width: 0,
    height: 0,
  },

  /* ─── Stories strip ── */
  storiesRow: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
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
  storyInitial: { ...T.title2, color: staticPalette.ink },
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
  storyName: { ...T.micro, color: palette.ink, opacity: 0.75, maxWidth: 64 },

  /* ─── Browse by craft — big horizontal cards ── */
  craftSection: {
    paddingTop: 6,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: palette.line,
  },
  craftHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },
  craftHeadLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  craftDot: { width: 8, height: 8, borderRadius: 4 },
  craftKicker: { ...T.labelLarge, color: palette.ink },
  craftCount: { ...T.micro, color: palette.ink, opacity: 0.55 },
  craftClear: { ...T.label, color: palette.electric },
  craftRow: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  craftPill: {
    height: 36,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: palette.ink,
    backgroundColor: palette.paper,
    alignItems: 'center',
    justifyContent: 'center',
  },
  craftPillLabel: {
    ...T.body,
  },

  /* ─── Post ── */
  separator: { height: 1, backgroundColor: palette.line, marginHorizontal: 0 },
  post: { paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  postHead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarText: { ...T.title3, color: staticPalette.ink },
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
    backgroundColor: '#2E5BFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  postMeta: { ...T.micro, color: palette.ink, opacity: 0.55 },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.ink,
  },
  followLabel: {
    ...T.label,
    color: palette.ink,
  },

  captionBlock: { paddingTop: 2 },
  captionLine: {
    ...T.body,
    color: palette.ink,
  },
  captionHandle: {
    fontFamily: fonts.bodyBold,
    color: palette.ink,
  },
  captionNote: {
    fontFamily: fonts.editorial,
    color: palette.ink,
    opacity: 0.78,
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
  mediaScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,10,10,0.22)',
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
  mediaType: { ...T.micro, color: palette.bone, opacity: 0.95, flexShrink: 1 },
  mediaLocation: { ...T.micro, color: palette.bone, opacity: 0.85 },

  engage: { flexDirection: 'row', alignItems: 'center', gap: 18, marginTop: 2 },
  engageBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  engageIconBtn: { padding: 4 },
  engageCount: {
    ...T.labelLarge,
    color: palette.ink,
  },

  /* ─── Widgets ── */
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
  widgetRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  widgetAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetAvatarText: { ...T.small, color: staticPalette.ink },
  widgetName: {
    ...T.body,
    color: palette.ink,
  },
  widgetMeta: { ...T.micro, color: palette.ink, opacity: 0.55, marginTop: 2 },
  widgetFollow: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.ink,
  },
  widgetFollowLabel: {
    ...T.label,
    color: palette.ink,
  },

  challenge: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 14,
    backgroundColor: palette.paper,
    borderWidth: 1,
    borderColor: palette.line,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 14,
    gap: 12,
    overflow: 'hidden',
  },
  challengeStripe: {
    width: 4,
    alignSelf: 'stretch',
  },
  challengeBody: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 12,
    gap: 4,
  },
  challengeMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  challengeLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  challengeKicker: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
    letterSpacing: 1.6,
  },
  challengeDot: { ...T.labelLarge, color: palette.ink, opacity: 0.45 },
  challengeDays: {
    ...T.label,
    color: palette.ink,
    opacity: 0.7,
  },
  challengeTag: {
    ...T.lead,
    color: palette.ink,
  },
  challengePrompt: {
    ...T.button,
    color: palette.ink,
    opacity: 0.78,
  },
  challengeFootMeta: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.55,
    marginTop: 2,
  },

  empty: { padding: 40, alignItems: 'center' },
  emptyText: {
    ...T.body,
    color: palette.ink,
    opacity: 0.55,
    textAlign: 'center',
    maxWidth: 300,
  },
});
