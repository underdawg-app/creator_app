import React, { useMemo, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  Dimensions,
  Platform,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette as staticPalette } from '@/theme/colors';
import { useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';

import { Ionicons } from '@/icons';
import { router, useLocalSearchParams } from '@/navigation';

import { Image } from '@/components/ui/Image';
import { Tap } from '@/components/ui/Tap';
import { profileMock, userFeed, type UserFeedItem } from '@/data/mock';
import { useStore } from '@/store';

const IS_ANDROID = Platform.OS === 'android';
const { width, height } = Dimensions.get('window');

/* -----------------------------------------------------------------------
 * Full-screen vertical Reel viewer.
 *
 *  - One reel per screen, snap-paged vertically (TikTok / Instagram Reels).
 *  - Opens at the tapped reel and lets the user swipe down through the rest
 *    of their videos.
 *  - Each reel surfaces handle, caption, category, duration, and right-rail
 *    actions (heart, comment, share, save, more) with counts pulled from
 *    the post's stats.
 * --------------------------------------------------------------------- */

export default function ReelViewer() {
  const styles = useThemedPaletteStyles(makeStyles);
  const { id } = useLocalSearchParams<{ id?: string }>();

  const orderedReels = useMemo(() => {
    const videoPosts = userFeed.filter((p) => p.kind === 'video');
    if (!id) return videoPosts;
    const startIdx = videoPosts.findIndex((p) => p.id === id);
    if (startIdx === -1) return videoPosts;
    return [
      ...videoPosts.slice(startIdx),
      ...videoPosts.slice(0, startIdx),
    ];
  }, [id]);

  const listRef = useRef<FlatList<UserFeedItem>>(null);

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <FlatList
        ref={listRef}
        data={orderedReels}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <Reel item={item} />}
        pagingEnabled
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        disableIntervalMomentum
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={IS_ANDROID}
        overScrollMode={IS_ANDROID ? 'never' : 'auto'}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        getItemLayout={(_, i) => ({
          length: height,
          offset: height * i,
          index: i,
        })}
      />
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Single reel
 * --------------------------------------------------------------------- */

function Reel({ item }: { item: UserFeedItem }) {
  const styles = useThemedPaletteStyles(makeStyles);
  const insets = useSafeAreaInsets();
  const toast = useStore((s) => s.toast);

  return (
    <View style={[styles.reel, { width, height }]}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={StyleSheet.absoluteFill as any}
          contentFit="cover"
          transition={150}
          priority="high"
          targetWidth={width}
        />
      ) : null}

      {/* Top + bottom scrims so overlays stay legible regardless of media */}
      <View style={[styles.topScrim, { paddingTop: insets.top + 6 }]} pointerEvents="none" />
      <View style={styles.bottomScrim} pointerEvents="none" />

      {/* Top bar */}
      <SafeAreaView edges={['top']} style={styles.topBarWrap}>
        <View style={styles.topBar}>
          <Tap
            onPress={() => router.back()}
            style={styles.iconBtn}
            burstColor={staticPalette.acid}
          >
            <Ionicons name="arrow-back" size={18} color={staticPalette.bone} />
          </Tap>
          <View style={styles.topSpacer} />
          <Tap
            onPress={() => toast('Search reels.', 'default')}
            style={styles.iconBtn}
            burstColor={staticPalette.acid}
          >
            <Ionicons name="search-outline" size={18} color={staticPalette.bone} />
          </Tap>
        </View>
      </SafeAreaView>

      {/* Right rail — actions */}
      <View
        style={[
          styles.rightRail,
          { bottom: 24 + (insets.bottom || 0) },
        ]}
      >
        <RailAction
          icon="heart-outline"
          value={compact(item.likes)}
          onPress={() => toast('Liked.', 'success')}
        />
        <RailAction
          icon="chatbubble-outline"
          value={compact(item.comments)}
          onPress={() => toast('Comments opened.', 'default')}
        />
        <RailAction
          icon="paper-plane-outline"
          value={compact(item.reposts)}
          onPress={() => toast('Shared.', 'success')}
        />
        <RailAction
          icon="bookmark-outline"
          onPress={() => toast('Saved.', 'success')}
        />
        <RailAction
          icon="ellipsis-horizontal"
          onPress={() => toast('Menu opened.', 'default')}
        />
      </View>

      {/* Bottom info — handle, caption, category, duration */}
      <View
        style={[
          styles.bottomInfo,
          {
            paddingBottom: 28 + (insets.bottom || 0),
          },
        ]}
      >
        <View style={styles.authorRow}>
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
          <RNText
            style={styles.handleText}
            numberOfLines={1}
            maxFontSizeMultiplier={1.1}
          >
            {profileMock.handle}
          </RNText>
          <Tap
            onPress={() => toast('Following.', 'success')}
            style={styles.followBtn}
            burstColor={staticPalette.acid}
          >
            <RNText style={styles.followLabel} maxFontSizeMultiplier={1.1}>
              FOLLOW
            </RNText>
          </Tap>
        </View>

        <RNText
          style={styles.caption}
          numberOfLines={3}
          maxFontSizeMultiplier={1.15}
        >
          {item.body ?? item.title}
        </RNText>

        <View style={styles.metaRow}>
          <View style={[styles.categoryPill, { backgroundColor: item.accent }]}>
            <RNText style={styles.categoryLabel} maxFontSizeMultiplier={1.1}>
              {item.category ?? 'REEL'}
            </RNText>
          </View>
          {item.duration ? (
            <View style={styles.durationPill}>
              <Ionicons name="time-outline" size={11} color={staticPalette.bone} />
              <RNText style={styles.durationText} maxFontSizeMultiplier={1.1}>
                {item.duration}
              </RNText>
            </View>
          ) : null}
          <RNText style={styles.agoText} maxFontSizeMultiplier={1.1}>
            {item.postedAgo}
          </RNText>
        </View>
      </View>

      {/* Progress bar mock — bottom edge */}
      <View
        style={[
          styles.progressTrack,
          { bottom: insets.bottom || 0 },
        ]}
      >
        <View style={[styles.progressFill, { backgroundColor: item.accent }]} />
      </View>
    </View>
  );
}

/* -----------------------------------------------------------------------
 * Sub-components
 * --------------------------------------------------------------------- */

function RailAction({
  icon,
  value,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  value?: string;
  onPress: () => void;
}) {
  const styles = useThemedPaletteStyles(makeStyles);
  return (
    <Tap onPress={onPress} style={styles.railBtn} burstColor={staticPalette.acid}>
      <Ionicons name={icon} size={26} color={staticPalette.bone} />
      {value ? (
        <RNText style={styles.railValue} maxFontSizeMultiplier={1.1}>
          {value}
        </RNText>
      ) : null}
    </Tap>
  );
}

function compact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  return n.toString();
}

/* -----------------------------------------------------------------------
 * Styles
 * --------------------------------------------------------------------- */

const makeStyles = (_palette: typeof staticPalette) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },

  reel: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },

  topScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  bottomScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 260,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  topBarWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(242,239,230,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(10,10,10,0.4)',
  },
  topSpacer: { flex: 1 },

  /* Right rail */
  rightRail: {
    position: 'absolute',
    right: 12,
    alignItems: 'center',
    gap: 18,
  },
  railBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderRadius: 12,
  },
  railValue: {
    ...T.micro,
    fontSize: 10,
    color: staticPalette.bone,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 4,
  },

  /* Bottom info */
  bottomInfo: {
    position: 'absolute',
    left: 0,
    right: 86,
    bottom: 0,
    paddingHorizontal: 16,
    gap: 10,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarRing: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    padding: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(242,239,230,0.16)',
  },
  avatar: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  handleText: {
    fontFamily: fonts.displayBold,
    fontSize: 15,
    letterSpacing: -0.3,
    color: staticPalette.bone,
  },
  followBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: staticPalette.bone,
  },
  followLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1.6,
    color: staticPalette.bone,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: staticPalette.bone,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowRadius: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  categoryPill: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
  },
  categoryLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.4,
    color: staticPalette.ink,
    textTransform: 'uppercase',
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(10,10,10,0.55)',
  },
  durationText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.2,
    color: staticPalette.bone,
    textTransform: 'uppercase',
  },
  agoText: {
    fontFamily: fonts.bodyBold,
    fontSize: 9,
    letterSpacing: 1.2,
    color: 'rgba(242,239,230,0.75)',
    textTransform: 'uppercase',
  },

  /* Progress bar */
  progressTrack: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'rgba(242,239,230,0.16)',
  },
  progressFill: {
    height: '100%',
    width: '38%',
  },
});
