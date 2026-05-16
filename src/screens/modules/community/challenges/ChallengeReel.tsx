import React, { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text as RNText,
  TextInput,
  Dimensions,
  Pressable,
  FlatList,
  Platform,
  Share,
  Modal,
  KeyboardAvoidingView,
  type ViewToken,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from '@/navigation';

// Probe whether the running iOS/Android binary has the react-native-video
// native ViewManager registered. v6 ships two names: the legacy bridge
// name `RCTVideo` (old arch) and the Fabric codegen name `RNCVideo` (new
// arch / bridgeless). If either probe succeeds the JS wrapper is safe to
// load; otherwise the screen falls back to cover-image-only playback and
// the user needs to rebuild iOS so the pod is linked into the binary:
//   cd ios && pod install && npx react-native run-ios --scheme UnderdawgsScratch
let Video: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const RN = require('react-native');
  let registered = false;
  for (const name of ['RNCVideo', 'RCTVideo']) {
    try {
      RN.requireNativeComponent(name);
      registered = true;
      break;
    } catch {
      // try next name
    }
  }
  if (registered) {
    Video = require('react-native-video').default;
  }
} catch {
  Video = null;
}
import { palette as staticPalette } from '@/theme/colors';
import { fonts, type as T } from '@/theme/typography';
import { challenges, type Challenge, type ChallengeEntry } from '@/data/mock';
import { Ionicons } from '@/icons';
import { Image } from '@/components/ui/Image';
import { ChallengeJoinCard } from '@/components/ui/ChallengeJoinCard';
import { useStore } from '@/store';

const { height: SCREEN_H, width: SCREEN_W } = Dimensions.get('window');
const IS_ANDROID = Platform.OS === 'android';

type FeedItem = ChallengeEntry & { feedKey: string };

// Recycle the base reel into the infinite-scroll buffer. We never trim
// the array — FlatList virtualises items past the windowSize anyway, so
// memory growth is bounded by what's actually on screen.
function makeBatch(reel: ChallengeEntry[], offset: number): FeedItem[] {
  return reel.map((e, i) => ({ ...e, feedKey: `${e.id}#${offset + i}` }));
}

export default function ChallengeReel() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const challenge: Challenge | undefined = useMemo(
    () => challenges.find((c) => c.id === id),
    [id],
  );

  const baseReel = challenge?.reel ?? [];
  const [feed, setFeed] = useState<FeedItem[]>(() =>
    baseReel.length ? makeBatch(baseReel, 0) : [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showJoinCard, setShowJoinCard] = useState(false);
  const [commentEntryId, setCommentEntryId] = useState<string | null>(null);
  const swipeCount = useRef(0);
  const lastIndex = useRef(0);
  const dismissedRef = useRef(false);

  const toast = useStore((s) => s.toast);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const next = viewableItems[0]?.index ?? 0;
      if (next !== lastIndex.current) {
        swipeCount.current += 1;
        lastIndex.current = next;
        if (swipeCount.current >= 2 && !dismissedRef.current) {
          setShowJoinCard(true);
        }
      }
      setActiveIndex(next);
    },
  ).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 80 }).current;

  // Infinite swipes: when the user nears the end of the buffered feed,
  // append another shuffled copy of the base reel with fresh keys.
  const onEndReached = useCallback(() => {
    if (!baseReel.length) return;
    setFeed((prev) => [...prev, ...makeBatch(baseReel, prev.length)]);
  }, [baseReel]);

  const onJoin = useCallback(() => {
    setShowJoinCard(false);
    dismissedRef.current = true;
    // Tap USE / floating Join → straight to the camera in VIDEO mode.
    // After recording, camera hands off to the unified image-composer
    // post screen for caption / tags / publish.
    router.push('/(modules)/camera?mode=VIDEO');
  }, []);

  const onDismissCard = useCallback(() => {
    setShowJoinCard(false);
    dismissedRef.current = true;
  }, []);

  const openComments = useCallback((entryId: string) => {
    setCommentEntryId(entryId);
  }, []);
  const closeComments = useCallback(() => setCommentEntryId(null), []);

  const onShare = useCallback(
    async (entry: ChallengeEntry) => {
      try {
        await Share.share({
          message: `${entry.handle} on Underdawgs — ${entry.caption}\n${entry.videoUrl}`,
        });
      } catch {
        toast('Could not open share sheet.', 'default');
      }
    },
    [toast],
  );

  if (!challenge) {
    return (
      <View style={styles.notFound}>
        <RNText style={styles.notFoundText}>Challenge not found.</RNText>
        <Pressable onPress={() => router.back()} style={styles.notFoundBack}>
          <RNText style={styles.notFoundBackText}>BACK</RNText>
        </Pressable>
      </View>
    );
  }

  // Stabilise callbacks across renders so ReelItem's React.memo can short-
  // circuit when only the parent's activeIndex changes — otherwise every
  // swipe re-renders every mounted page.
  const onTapToggleMute = useCallback(() => setMuted((m) => !m), []);

  const renderItem = useCallback(
    ({ item, index }: { item: FeedItem; index: number }) => (
      <ReelItem
        entry={item}
        challenge={challenge!}
        isActive={index === activeIndex}
        muted={muted}
        onTapToggleMute={onTapToggleMute}
        onOpenComments={openComments}
        onShare={onShare}
        onUseSound={onJoin}
      />
    ),
    [challenge, activeIndex, muted, onTapToggleMute, openComments, onShare, onJoin],
  );

  const activeEntry = commentEntryId
    ? feed.find((e) => e.id === commentEntryId)
    : null;

  return (
    <View style={styles.root}>
      <FlatList
        data={feed}
        keyExtractor={(e) => e.feedKey}
        renderItem={renderItem}
        pagingEnabled
        snapToInterval={SCREEN_H}
        snapToAlignment="start"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, i) => ({ length: SCREEN_H, offset: SCREEN_H * i, index: i })}
        removeClippedSubviews={IS_ANDROID}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        onEndReached={onEndReached}
        onEndReachedThreshold={1.5}
      />

      <SafeAreaView edges={['top']} style={styles.topBar} pointerEvents="box-none">
        <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={10}>
          <Ionicons name="close" size={22} color={staticPalette.bone} />
        </Pressable>
        <View style={styles.topMeta}>
          <RNText style={styles.topTag}>{challenge.tag}</RNText>
        </View>
        <View style={{ width: 38 }} />
      </SafeAreaView>

      <ChallengeJoinCard
        visible={showJoinCard}
        tag={challenge.tag}
        audioTitle={challenge.audio.title}
        audioCreator={challenge.audio.creator}
        onJoin={onJoin}
        onDismiss={onDismissCard}
      />

      <CommentsModal entry={activeEntry} onClose={closeComments} />
    </View>
  );
}

/* -------------------------------------------------------------------------- */
/*  Single reel page                                                          */
/* -------------------------------------------------------------------------- */

const ReelItem = React.memo(function ReelItem({
  entry,
  challenge,
  isActive,
  muted,
  onTapToggleMute,
  onOpenComments,
  onShare,
  onUseSound,
}: {
  entry: ChallengeEntry;
  challenge: Challenge;
  isActive: boolean;
  muted: boolean;
  onTapToggleMute: () => void;
  onOpenComments: (entryId: string) => void;
  onShare: (entry: ChallengeEntry) => void;
  onUseSound: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const canRenderVideo = !!Video && !videoFailed;

  // Heart pop animation on like (rail button).
  const heartScale = useSharedValue(1);
  const heartStyle = useAnimatedStyle(() => ({ transform: [{ scale: heartScale.value }] }));

  // Center burst animation on double-tap like.
  const burstScale = useSharedValue(0);
  const burstOpacity = useSharedValue(0);
  const burstStyle = useAnimatedStyle(() => ({
    opacity: burstOpacity.value,
    transform: [{ scale: burstScale.value }],
  }));

  const popHeart = useCallback(() => {
    heartScale.value = withSequence(
      withTiming(1.35, { duration: 140, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 180, easing: Easing.out(Easing.quad) }),
    );
  }, [heartScale]);

  const playBurst = useCallback(() => {
    burstScale.value = 0.3;
    burstOpacity.value = 1;
    burstScale.value = withTiming(1.15, {
      duration: 280,
      easing: Easing.out(Easing.quad),
    });
    burstOpacity.value = withSequence(
      withTiming(1, { duration: 80 }),
      withTiming(0, { duration: 380, easing: Easing.in(Easing.quad) }),
    );
  }, [burstScale, burstOpacity]);

  const handleLike = useCallback(() => {
    setLiked((l) => !l);
    popHeart();
  }, [popHeart]);

  // Double-tap on the video → always like (idempotent toward `true`) and
  // play a heart-burst centered on the screen. Single tap still toggles
  // mute via the Pressable's onPress; we use the tap-count tracker to
  // distinguish a single tap from the second tap of a double.
  const lastTapRef = useRef(0);
  const handleSurfaceTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < 280) {
      lastTapRef.current = 0;
      if (!liked) {
        setLiked(true);
        popHeart();
      }
      playBurst();
    } else {
      lastTapRef.current = now;
      // Defer the single-tap action so a quick second tap can intercept.
      setTimeout(() => {
        if (lastTapRef.current && Date.now() - lastTapRef.current >= 280) {
          onTapToggleMute();
          lastTapRef.current = 0;
        }
      }, 290);
    }
  }, [liked, onTapToggleMute, playBurst, popHeart]);

  const handleComment = useCallback(() => {
    onOpenComments(entry.id);
  }, [entry.id, onOpenComments]);

  const handleShare = useCallback(() => {
    onShare(entry);
  }, [entry, onShare]);

  return (
    <View style={styles.page}>
      <Pressable style={StyleSheet.absoluteFill} onPress={handleSurfaceTap}>
        {/* Cover image sits beneath the video. While video buffers it shows
            through; once Video reports ready we hide it instantly so the
            first decoded frame doesn't peek over a stale photo. */}
        {!videoReady ? (
          <Image
            source={{ uri: entry.coverUrl }}
            style={StyleSheet.absoluteFill as any}
            contentFit="cover"
            targetWidth={SCREEN_W}
          />
        ) : null}
        {canRenderVideo ? (
          <VideoErrorBoundary onError={() => setVideoFailed(true)}>
            <Video
              source={{ uri: entry.videoUrl }}
              style={StyleSheet.absoluteFill}
              paused={!isActive}
              repeat
              resizeMode="cover"
              muted={muted}
              ignoreSilentSwitch="ignore"
              playInBackground={false}
              playWhenInactive={false}
              bufferConfig={{
                minBufferMs: 1500,
                maxBufferMs: 4000,
                bufferForPlaybackMs: 1000,
                bufferForPlaybackAfterRebufferMs: 1500,
              }}
              progressUpdateInterval={1000}
              onReadyForDisplay={() => setVideoReady(true)}
              onError={() => {
                setVideoReady(false);
                setVideoFailed(true);
              }}
            />
          </VideoErrorBoundary>
        ) : null}
      </Pressable>

      {/* Bottom overlay text */}
      <View style={styles.bottomScrim} pointerEvents="none" />
      <View style={styles.bottomOverlay} pointerEvents="box-none">
        <RNText style={styles.handle} maxFontSizeMultiplier={1.1}>
          {entry.handle}
        </RNText>
        <RNText style={styles.caption} numberOfLines={2} maxFontSizeMultiplier={1.15}>
          {entry.caption}
        </RNText>
        <View style={styles.audioRow}>
          <Ionicons name="musical-notes" size={11} color={staticPalette.acid} />
          <RNText style={styles.audioTxt} numberOfLines={1}>
            {challenge.tag} · {challenge.audio.title} · {challenge.audio.creator}
          </RNText>
        </View>
      </View>

      {/* Right rail actions */}
      <View style={styles.rightRail} pointerEvents="box-none">
        <Pressable onPress={handleLike} style={styles.railBtn} hitSlop={6}>
          <Animated.View style={heartStyle}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={28}
              color={liked ? staticPalette.blush : staticPalette.bone}
            />
          </Animated.View>
          <RNText
            style={[
              styles.railLabel,
              { color: liked ? staticPalette.blush : staticPalette.bone },
            ]}
          >
            {formatCount(entry.likes + (liked ? 1 : 0))}
          </RNText>
        </Pressable>
        <RailButton
          icon="chatbubble-outline"
          tint={staticPalette.bone}
          label={formatCount(entry.comments)}
          onPress={handleComment}
        />
        <RailButton
          icon="paper-plane-outline"
          tint={staticPalette.bone}
          label="SHARE"
          onPress={handleShare}
        />
        <Pressable onPress={onUseSound} style={styles.useSoundWrap} hitSlop={6}>
          <View style={styles.useSoundIcon}>
            <Ionicons name="add" size={20} color={staticPalette.ink} />
          </View>
          <RNText style={styles.useSoundLabel}>USE</RNText>
        </Pressable>
      </View>

      {/* Center heart burst on double-tap. Sits above everything but is
          non-interactive so it doesn't swallow the next tap. */}
      <Animated.View
        pointerEvents="none"
        style={[styles.heartBurst, burstStyle]}
      >
        <Ionicons name="heart" size={120} color={staticPalette.blush} />
      </Animated.View>

      {/* Mute hint when muted + active. Suppress when there's no video. */}
      {muted && isActive && canRenderVideo ? (
        <View style={styles.mutedPill} pointerEvents="none">
          <Ionicons name="volume-mute" size={12} color={staticPalette.bone} />
          <RNText style={styles.mutedTxt}>TAP TO UNMUTE</RNText>
        </View>
      ) : null}
    </View>
  );
});

function RailButton({
  icon,
  tint,
  label,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  tint: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.railBtn} hitSlop={6}>
      <Ionicons name={icon} size={28} color={tint} />
      <RNText style={[styles.railLabel, { color: tint }]}>{label}</RNText>
    </Pressable>
  );
}

/* -------------------------------------------------------------------------- */
/*  Comments modal                                                            */
/* -------------------------------------------------------------------------- */

const MOCK_COMMENTS: { handle: string; body: string; ago: string }[] = [
  { handle: '@kore.odu', body: 'this is unreal — keep going.', ago: '2h' },
  { handle: '@solaroux', body: 'the third color choice 🔥', ago: '4h' },
  { handle: '@ari.s', body: 'wait the audio sync though', ago: '6h' },
  { handle: '@lin.w', body: 'saving this for inspo', ago: '8h' },
];

function CommentsModal({
  entry,
  onClose,
}: {
  entry: ChallengeEntry | null;
  onClose: () => void;
}) {
  const visible = !!entry;
  const [draft, setDraft] = useState('');
  const [extra, setExtra] = useState<typeof MOCK_COMMENTS>([]);

  useEffect(() => {
    if (!visible) {
      setDraft('');
      setExtra([]);
    }
  }, [visible]);

  if (!visible || !entry) return null;

  const onSend = () => {
    const value = draft.trim();
    if (!value) return;
    setExtra((prev) => [{ handle: 'you', body: value, ago: 'now' }, ...prev]);
    setDraft('');
  };

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.commentsScrim} onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.commentsWrap}
        pointerEvents="box-none"
      >
        <View style={styles.commentsSheet}>
          <View style={styles.commentsGrip} />
          <RNText style={styles.commentsTitle}>COMMENTS · {entry.handle}</RNText>
          <FlatList
            data={[...extra, ...MOCK_COMMENTS]}
            keyExtractor={(_, i) => `c-${i}`}
            renderItem={({ item }) => (
              <View style={styles.commentRow}>
                <View style={styles.commentAvatar}>
                  <RNText style={styles.commentAvatarLetter}>
                    {item.handle.charAt(1).toUpperCase()}
                  </RNText>
                </View>
                <View style={{ flex: 1 }}>
                  <RNText style={styles.commentHandle}>{item.handle}</RNText>
                  <RNText style={styles.commentBody}>{item.body}</RNText>
                </View>
                <RNText style={styles.commentAgo}>{item.ago}</RNText>
              </View>
            )}
            style={styles.commentsList}
            keyboardShouldPersistTaps="handled"
          />
          <View style={styles.commentInputRow}>
            <TextInput
              style={styles.commentInput}
              value={draft}
              onChangeText={setDraft}
              placeholder="say something…"
              placeholderTextColor="rgba(242,239,230,0.45)"
              returnKeyType="send"
              onSubmitEditing={onSend}
            />
            <Pressable onPress={onSend} style={styles.commentSendBtn} hitSlop={8}>
              <Ionicons name="arrow-up" size={18} color={staticPalette.ink} />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

class VideoErrorBoundary extends Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/* -------------------------------------------------------------------------- */
/*  Styles                                                                    */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  page: { width: SCREEN_W, height: SCREEN_H, backgroundColor: '#000' },

  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(10,10,10,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topMeta: { flex: 1, alignItems: 'center' },
  topTag: {
    fontFamily: fonts.displayBold,
    fontSize: 16,
    letterSpacing: -0.4,
    color: staticPalette.acid,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 4,
  },
  topCounter: {
    ...T.micro,
    color: staticPalette.bone,
    opacity: 0.8,
    marginTop: 2,
  },

  bottomScrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 220,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: -60 },
    shadowRadius: 40,
  },
  bottomOverlay: {
    position: 'absolute',
    left: 18,
    right: 90,
    bottom: 110,
    gap: 6,
  },
  handle: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    letterSpacing: -0.4,
    color: staticPalette.bone,
    textShadowColor: 'rgba(0,0,0,0.65)',
    textShadowRadius: 6,
  },
  caption: {
    fontFamily: fonts.editorialItalic,
    fontSize: 16,
    lineHeight: 22,
    color: staticPalette.bone,
    opacity: 0.95,
    textShadowColor: 'rgba(0,0,0,0.65)',
    textShadowRadius: 6,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(10,10,10,0.55)',
    alignSelf: 'flex-start',
  },
  audioTxt: {
    ...T.micro,
    color: staticPalette.bone,
    fontFamily: fonts.body,
    letterSpacing: 0.4,
    maxWidth: 240,
  },

  rightRail: {
    position: 'absolute',
    right: 12,
    bottom: 130,
    alignItems: 'center',
    gap: 22,
  },
  railBtn: { alignItems: 'center', gap: 4 },
  railLabel: {
    ...T.micro,
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 0.8,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 4,
  },
  useSoundWrap: { alignItems: 'center', gap: 4, marginTop: 4 },
  useSoundIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
  useSoundLabel: {
    ...T.micro,
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 1,
    color: staticPalette.bone,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 4,
  },

  heartBurst: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.55,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },
  mutedPill: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(10,10,10,0.55)',
  },
  mutedTxt: {
    ...T.micro,
    color: staticPalette.bone,
    fontFamily: fonts.bodyBold,
    letterSpacing: 1.2,
    fontSize: 9,
  },

  notFound: {
    flex: 1,
    backgroundColor: staticPalette.ink,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 18,
  },
  notFoundText: {
    fontFamily: fonts.displayBold,
    fontSize: 18,
    color: staticPalette.bone,
  },
  notFoundBack: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 99,
    backgroundColor: staticPalette.acid,
  },
  notFoundBackText: {
    fontFamily: fonts.bodyBold,
    color: staticPalette.ink,
    letterSpacing: 1.4,
  },

  /* Comments modal */
  commentsScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  commentsWrap: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commentsSheet: {
    backgroundColor: '#0F0F0F',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 18,
    maxHeight: '70%',
    minHeight: 360,
    borderTopWidth: 1,
    borderTopColor: 'rgba(242,239,230,0.14)',
  },
  commentsGrip: {
    alignSelf: 'center',
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(242,239,230,0.25)',
    marginBottom: 12,
  },
  commentsTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.6,
    color: staticPalette.bone,
    opacity: 0.8,
    marginBottom: 10,
  },
  commentsList: { flexGrow: 0 },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(242,239,230,0.07)',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(242,239,230,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarLetter: {
    fontFamily: fonts.displayBold,
    fontSize: 13,
    color: staticPalette.bone,
  },
  commentHandle: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 0.5,
    color: staticPalette.bone,
    opacity: 0.85,
  },
  commentBody: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: staticPalette.bone,
    marginTop: 2,
  },
  commentAgo: {
    ...T.micro,
    color: staticPalette.bone,
    opacity: 0.4,
    fontSize: 10,
    marginTop: 2,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(242,239,230,0.08)',
  },
  commentInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 99,
    backgroundColor: 'rgba(242,239,230,0.08)',
    color: staticPalette.bone,
    fontFamily: fonts.body,
    fontSize: 14,
  },
  commentSendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: staticPalette.acid,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
