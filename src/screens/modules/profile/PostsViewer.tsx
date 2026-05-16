import React, { useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';

import { Ionicons } from '@/icons';
import { router, useLocalSearchParams } from '@/navigation';

import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { profileMock, userFeed, type UserFeedItem } from '@/data/mock';
import { useStore } from '@/store';

const IS_ANDROID = Platform.OS === 'android';
const { width } = Dimensions.get('window');
const SCREEN_PADDING = 12;

/* -----------------------------------------------------------------------
 * Vertical posts viewer.
 *
 *  - Opened from Profile's POSTS grid with a post id.
 *  - Renders the tapped post first; the rest of the user's posts follow
 *    so swiping down lands on neighbouring posts (Instagram-style).
 *  - Each card surfaces the analytics that the user requested: views,
 *    reach, likes, comments, reputation impact, plus the caption and a
 *    couple of preview comments.
 * --------------------------------------------------------------------- */

type Stats = {
  views: number;
  reach: number;
  reputation: number;
  saves: number;
};

function deriveStats(item: UserFeedItem): Stats {
  const views = Math.round(item.likes * 10.4 + item.comments * 12);
  const reach = Math.round(views * 1.18);
  const reputation = Math.max(1, Math.round((item.likes + item.comments * 4) / 60));
  const saves = Math.round(item.likes * 0.07);
  return { views, reach, reputation, saves };
}

const sampleComments = [
  { id: 'c1', handle: '@keira.t', body: 'the blue. always the blue.' },
  { id: 'c2', handle: '@miguel.arte', body: 'studio window energy, undeniable.' },
];

export default function PostsViewer() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const { id } = useLocalSearchParams<{ id?: string }>();

  const orderedPosts = useMemo(() => {
    const imagePosts = userFeed.filter((p) => p.kind === 'image');
    if (!id) return imagePosts;
    const startIdx = imagePosts.findIndex((p) => p.id === id);
    if (startIdx === -1) return imagePosts;
    return [
      ...imagePosts.slice(startIdx),
      ...imagePosts.slice(0, startIdx),
    ];
  }, [id]);

  const listRef = useRef<FlatList<UserFeedItem>>(null);

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerWrap}>
        <View style={styles.header}>
          <Tap
            onPress={() => router.back()}
            style={styles.iconBtn}
            burstColor={palette.acid}
          >
            <Ionicons name="arrow-back" size={16} color={palette.ink} />
          </Tap>
          <View style={styles.headerCenter}>
            <RNText style={styles.headerEyebrow} maxFontSizeMultiplier={1.1}>
              POSTS · {profileMock.handle}
            </RNText>
            <RNText
              style={styles.headerTitle}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}
            >
              {profileMock.name}
            </RNText>
          </View>
          <Tap
            onPress={() => toast('Share sheet opened.', 'success')}
            style={styles.iconBtn}
            burstColor={palette.acid}
          >
            <Ionicons name="paper-plane-outline" size={16} color={palette.ink} />
          </Tap>
        </View>
      </SafeAreaView>

      <FlatList
        ref={listRef}
        data={orderedPosts}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <PostCard item={item} />}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={IS_ANDROID}
        overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        contentContainerStyle={{ paddingBottom: 80 }}
        windowSize={5}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
      />
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Post card
 * --------------------------------------------------------------------- */

function PostCard({ item }: { item: UserFeedItem }) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const toast = useStore((s) => s.toast);
  const stats = useMemo(() => deriveStats(item), [item]);

  return (
    <View style={styles.card}>
      {/* Author row */}
      <View style={styles.authorRow}>
        <View style={styles.authorLeft}>
          <View style={[styles.avatarRing, { borderColor: item.accent }]}>
            <Image
              source={{ uri: profileMock.avatar }}
              style={styles.avatar}
              cachePolicy="memory-disk"
              contentFit="cover"
              transition={150}
              priority="high"
              targetWidth={44}
            />
          </View>
          <View style={{ flex: 1 }}>
            <RNText
              style={styles.authorHandle}
              numberOfLines={1}
              maxFontSizeMultiplier={1.1}
            >
              {profileMock.handle}
            </RNText>
            <RNText style={styles.authorMeta} maxFontSizeMultiplier={1.1}>
              {item.category ?? 'POST'} · {item.postedAgo}
            </RNText>
          </View>
        </View>
        <Tap
          onPress={() => toast('Menu opened.', 'default')}
          style={styles.moreBtn}
          burstColor={palette.acid}
        >
          <Ionicons name="ellipsis-horizontal" size={16} color={palette.ink} />
        </Tap>
      </View>

      {/* Media */}
      <View style={[styles.media, { backgroundColor: palette.ink }]}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFill as any}
            contentFit="cover"
            transition={200}
            priority="high"
            targetWidth={width}
          />
        ) : null}
        <View style={[styles.mediaAccent, { backgroundColor: item.accent }]} />
      </View>

      {/* Action row */}
      <View style={styles.actionRow}>
        <View style={styles.actionLeft}>
          <ActionBtn
            icon="heart-outline"
            onPress={() => toast('Liked.', 'success')}
          />
          <ActionBtn
            icon="chatbubble-outline"
            onPress={() => toast('Comments opened.', 'default')}
          />
          <ActionBtn
            icon="paper-plane-outline"
            onPress={() => toast('Shared.', 'success')}
          />
        </View>
        <ActionBtn
          icon="bookmark-outline"
          onPress={() => toast('Saved.', 'success')}
        />
      </View>

      {/* Likes */}
      <View style={styles.likeBlock}>
        <RNText style={styles.likeCount} maxFontSizeMultiplier={1.1}>
          {compact(item.likes)} likes
        </RNText>
      </View>

      {/* Caption */}
      <View style={styles.captionBlock}>
        <RNText style={styles.captionBody} maxFontSizeMultiplier={1.15}>
          <RNText style={styles.captionHandle}>{profileMock.handle} </RNText>
          {item.body ?? item.title}
        </RNText>
      </View>

      {/* Comments preview */}
      <View style={styles.commentBlock}>
        <Tap
          onPress={() => {}}
          style={styles.commentMore}
          burstColor={palette.acid}
        >
          <RNText style={styles.commentMoreText} maxFontSizeMultiplier={1.1}>
            View all {item.comments} comments
          </RNText>
        </Tap>
        {sampleComments.map((c) => (
          <RNText
            key={c.id}
            style={styles.commentLine}
            numberOfLines={1}
            maxFontSizeMultiplier={1.15}
          >
            <RNText style={styles.commentHandle}>{c.handle} </RNText>
            {c.body}
          </RNText>
        ))}
      </View>

      {/* Analytics row */}
      <View style={styles.analyticsCard}>
        <View style={styles.analyticsHead}>
          <RNText style={styles.analyticsEyebrow} maxFontSizeMultiplier={1.1}>
            ANALYTICS · {item.postedAgo}
          </RNText>
          <View style={styles.analyticsTrend}>
            <Ionicons name="trending-up" size={11} color={palette.acid} />
            <RNText style={styles.analyticsTrendText} maxFontSizeMultiplier={1.1}>
              +{(stats.views / Math.max(1, item.likes)).toFixed(1)}× engaged
            </RNText>
          </View>
        </View>

        <View style={styles.analyticsGrid}>
          <AnalyticsCell label="VIEWS" value={compact(stats.views)} />
          <AnalyticsCell label="REACH" value={compact(stats.reach)} />
          <AnalyticsCell label="LIKES" value={compact(item.likes)} />
        </View>
        <View style={styles.analyticsGrid}>
          <AnalyticsCell label="COMMENTS" value={compact(item.comments)} />
          <AnalyticsCell label="SAVES" value={compact(stats.saves)} />
          <AnalyticsCell
            label="REP +"
            value={`+${stats.reputation}`}
            accent
          />
        </View>

        <Tap
          onPress={() => router.push('/(modules)/analytics' as any)}
          style={styles.analyticsCta}
          burstColor={palette.acid}
        >
          <Ionicons name="bar-chart-outline" size={13} color={staticPalette.ink} />
          <RNText style={styles.analyticsCtaLabel} maxFontSizeMultiplier={1.1}>
            FULL ANALYTICS
          </RNText>
          <Ionicons name="arrow-forward" size={13} color={staticPalette.ink} />
        </Tap>
      </View>

      <View style={styles.divider} />
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Sub-components
 * --------------------------------------------------------------------- */

function ActionBtn({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap onPress={onPress} style={styles.actionBtn} burstColor={palette.acid}>
      <Ionicons name={icon} size={22} color={palette.ink} />
    </Tap>
  );
}

function AnalyticsCell({
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
    <View style={styles.analyticsCell}>
      <RNText
        style={[styles.analyticsValue, accent && { color: palette.acid }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        maxFontSizeMultiplier={1.1}
      >
        {value}
      </RNText>
      <RNText style={styles.analyticsLabel} maxFontSizeMultiplier={1.1}>
        {label}
      </RNText>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Utility
 * --------------------------------------------------------------------- */

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toString();
}

/* -----------------------------------------------------------------------
 * Styles
 * --------------------------------------------------------------------- */

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1, backgroundColor: palette.bone },

  headerWrap: {
    backgroundColor: palette.bone,
    borderBottomWidth: 1,
    borderBottomColor: palette.line,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: palette.line,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerEyebrow: { ...T.label, color: palette.ink, opacity: 0.6 },
  headerTitle: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.4,
    color: palette.ink,
    marginTop: 2,
  },

  /* ---------- Card ---------- */
  card: {
    paddingTop: 16,
  },

  authorRow: {
    paddingHorizontal: SCREEN_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  authorLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatarRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    overflow: 'hidden',
    backgroundColor: palette.boneSoft,
  },
  avatar: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  authorHandle: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.3,
    color: palette.ink,
  },
  authorMeta: { ...T.micro, color: palette.mute, marginTop: 3 },
  moreBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },

  media: {
    marginTop: 12,
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
  mediaAccent: {
    position: 'absolute',
    left: 14,
    top: 14,
    width: 28,
    height: 3,
    borderRadius: 2,
  },

  actionRow: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  likeBlock: {
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 4,
  },
  likeCount: {
    fontFamily: fonts.displayBold,
    fontSize: 14,
    letterSpacing: -0.3,
    color: palette.ink,
  },

  captionBlock: {
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 6,
  },
  captionBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: palette.ink,
  },
  captionHandle: {
    fontFamily: fonts.bodyBold,
    color: palette.ink,
  },

  commentBlock: {
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 6,
    gap: 4,
  },
  commentMore: { paddingVertical: 2 },
  commentMoreText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: palette.mute,
  },
  commentLine: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: palette.ink,
    opacity: 0.85,
  },
  commentHandle: { fontFamily: fonts.bodyBold, opacity: 1 },

  /* ---------- Analytics ---------- */
  analyticsCard: {
    marginHorizontal: SCREEN_PADDING,
    marginTop: 14,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.line,
    backgroundColor: palette.paper,
    gap: 10,
  },
  analyticsHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  analyticsEyebrow: { ...T.label, color: palette.ink, opacity: 0.55 },
  analyticsTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(216,255,61,0.18)',
  },
  analyticsTrendText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.2,
    color: palette.ink,
    textTransform: 'uppercase',
  },
  analyticsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  analyticsCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: palette.boneSoft,
    alignItems: 'flex-start',
    gap: 4,
  },
  analyticsValue: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    letterSpacing: -0.5,
    color: palette.ink,
  },
  analyticsLabel: {
    ...T.micro,
    fontSize: 9,
    color: palette.mute,
  },
  analyticsCta: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 38,
    borderRadius: 19,
    backgroundColor: staticPalette.acid,
  },
  analyticsCtaLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },

  divider: {
    marginTop: 18,
    marginHorizontal: SCREEN_PADDING,
    height: 1,
    backgroundColor: palette.line,
  },
});
