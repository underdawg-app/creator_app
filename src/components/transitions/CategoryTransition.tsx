import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text as RNText,
} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import FastImage from '@d11/react-native-fast-image';
import Video from 'react-native-video';
import { fonts } from '@/theme/typography';

const { width } = Dimensions.get('window');

// Slide-in and slide-out at the SAME speed (400ms each) with a 3s hold of
// video in between. Total visible time = 3.8s after the video has loaded.
const ENTER_MS = 400;
const HOLD_MS = 3000;
const EXIT_MS = 400;
// Hard cap on how long we wait for the video to deliver its first frame before
// starting the slide anyway. Avoids the panel sitting off-screen forever if a
// clip is slow to load or onLoad never fires.
const MAX_PRELOAD_MS = 600;
export const TRANSITION_MS = ENTER_MS + HOLD_MS + EXIT_MS; // 3800
const NAVIGATE_AT_MS = ENTER_MS + 1000; // 1.4s in — leaves 2.4s for step 4 to render

export type TransitionKey =
  | 'visual'
  | 'musician'
  | 'video'
  | 'writer'
  | 'performer'
  | 'educator'
  | 'podcaster'
  | 'streamer'
  | 'fashion'
  | 'multi';

type MediaKind = 'video' | 'gif' | null;

const MEDIA: Record<TransitionKey, { kind: MediaKind; source: any }> = {
  visual:    { kind: 'video', source: require('../../../assets/transitions/visual.mp4') },
  musician:  { kind: 'video', source: require('../../../assets/transitions/musician.mp4') },
  video:     { kind: 'video', source: require('../../../assets/transitions/video.mp4') },
  performer: { kind: 'video', source: require('../../../assets/transitions/performer.mp4') },
  educator:  { kind: 'video', source: require('../../../assets/transitions/educator.mp4') },
  streamer:  { kind: 'video', source: require('../../../assets/transitions/streamer.mp4') },
  writer:    { kind: 'gif',   source: require('../../../assets/transitions/writer.gif') },
  fashion:   { kind: 'gif',   source: require('../../../assets/transitions/fashion.gif') },
  podcaster: { kind: 'video', source: require('../../../assets/transitions/podcaster.mp4') },
  multi:     { kind: 'video', source: require('../../../assets/transitions/multi.mp4') },
};

// One-line title (large display) + a short editorial quote underneath.
type Copy = { title: string; quote: string };
const COPY: Record<TransitionKey, Copy> = {
  visual:    { title: 'VISUAL\nART',   quote: 'The frame is the world.' },
  musician:  { title: 'MUSIC',         quote: 'Notes, before words.' },
  video:     { title: 'VIDEO',         quote: 'Tell it in motion.' },
  writer:    { title: 'WRITING',       quote: 'Pages before voices.' },
  performer: { title: 'PERFORMER',     quote: 'The body remembers.' },
  educator:  { title: 'EDUCATOR',      quote: 'What you give, multiplies.' },
  podcaster: { title: 'PODCASTER',     quote: 'Voices in the dark.' },
  streamer:  { title: 'STREAMER',      quote: 'Live. Always live.' },
  fashion:   { title: 'FASHION',       quote: 'Worn, then known.' },
  multi:     { title: 'MULTI',         quote: 'All of it. At once.' },
};

type Props = {
  active: boolean;
  category: TransitionKey | null;
  color: string;
  onMid?: () => void;
  onComplete: () => void;
};

export function CategoryTransition({
  active,
  category,
  color,
  onMid,
  onComplete,
}: Props) {
  // 0 = off-screen LEFT, 1 = covering, 2 = off-screen RIGHT.
  const slide = useSharedValue(0);
  // 0 → 1 across the visible hold; drives the progress bar at the bottom.
  const progress = useSharedValue(0);
  const [mediaReady, setMediaReady] = useState(false);

  // Mount the media element as soon as `active` flips. The slide doesn't run
  // yet — first we wait for the video's onLoad (or the preload cap) so the
  // first frame is on screen before the panel becomes visible.
  useEffect(() => {
    if (!active || !category) {
      slide.value = 0;
      progress.value = 0;
      setMediaReady(false);
      return;
    }

    const media = MEDIA[category];
    if (media.kind !== 'video') {
      setMediaReady(true);
      return;
    }

    setMediaReady(false);
    const capTimer = setTimeout(() => setMediaReady(true), MAX_PRELOAD_MS);
    return () => clearTimeout(capTimer);
  }, [active, category]);

  // Once the media is primed, run enter → hold → exit.
  useEffect(() => {
    if (!active || !category || !mediaReady) return;

    slide.value = 0;
    progress.value = 0;
    slide.value = withTiming(
      1,
      { duration: ENTER_MS, easing: Easing.bezier(0.5, 0, 0.2, 1) },
    );
    progress.value = withTiming(1, {
      duration: ENTER_MS + HOLD_MS,
      easing: Easing.linear,
    });

    const exitTimer = setTimeout(() => {
      slide.value = withTiming(
        2,
        { duration: EXIT_MS, easing: Easing.bezier(0.5, 0, 0.2, 1) },
        (finished) => { if (finished) runOnJS(onComplete)(); },
      );
    }, ENTER_MS + HOLD_MS);

    const midTimer = setTimeout(() => {
      onMid?.();
    }, NAVIGATE_AT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(midTimer);
    };
  }, [mediaReady, active, category]);

  if (!active || !category) return null;

  const media = MEDIA[category];
  const showVideo = media.kind === 'video';
  const showGif = media.kind === 'gif';

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="auto">
      <SlidingPanel slide={slide} color={color}>
        {showVideo ? (
          <Video
            source={media.source}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            repeat
            paused={false}
            muted
            playInBackground={false}
            ignoreSilentSwitch="ignore"
            controls={false}
            onReadyForDisplay={() => setMediaReady(true)}
            onError={() => setMediaReady(true)}
          />
        ) : null}
        {showGif ? (
          <FastImage
            source={media.source}
            style={StyleSheet.absoluteFill}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : null}
        <View style={styles.scrim} pointerEvents="none" />
        <EditorialOverlay
          copy={COPY[category]}
          accent={color}
          progress={progress}
        />
      </SlidingPanel>
    </View>
  );
}

function SlidingPanel({
  slide,
  color,
  children,
}: {
  slide: SharedValue<number>;
  color: string;
  children?: React.ReactNode;
}) {
  const s = useAnimatedStyle(() => ({
    transform: [{ translateX: (slide.value - 1) * width }],
  }));

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, { backgroundColor: color }, s]}
    >
      {children}
    </Animated.View>
  );
}

function EditorialOverlay({
  copy,
  accent,
  progress,
}: {
  copy: Copy;
  accent: string;
  progress: SharedValue<number>;
}) {
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.top}>
        <View style={[styles.accentSquare, { backgroundColor: accent }]} />
        <RNText style={styles.kicker}>YOU MAKE</RNText>
      </View>

      <View style={styles.middle}>
        <RNText
          allowFontScaling={false}
          style={styles.title}
          adjustsFontSizeToFit
          numberOfLines={2}
          minimumFontScale={0.7}
        >
          {copy.title}
          <RNText style={{ color: accent }}>.</RNText>
        </RNText>
        <RNText
          allowFontScaling={false}
          style={styles.quote}
          numberOfLines={2}
        >
          {copy.quote}
        </RNText>
      </View>

      <View style={styles.bottom}>
        <View style={styles.bottomRow}>
          <RNText style={styles.brand}>UNDERDAWG</RNText>
          <RNText style={styles.brand}>LOADING</RNText>
        </View>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[styles.progressFill, { backgroundColor: accent }, progressStyle]}
          />
        </View>
      </View>
    </View>
  );
}

const INK = 'rgba(255,255,255,0.96)';
const INK_SOFT = 'rgba(255,255,255,0.6)';
const RULE = 'rgba(255,255,255,0.18)';

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 56,
    justifyContent: 'space-between',
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accentSquare: {
    width: 10,
    height: 10,
  },
  kicker: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    letterSpacing: 3.2,
    color: INK,
    textTransform: 'uppercase',
  },

  middle: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 56,
    lineHeight: 58,
    letterSpacing: -2,
    color: INK,
    includeFontPadding: false,
  },
  quote: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
    color: INK_SOFT,
    marginTop: 20,
    maxWidth: 320,
  },

  bottom: {
    gap: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2.6,
    color: INK,
    textTransform: 'uppercase',
  },
  progressTrack: {
    height: 2,
    backgroundColor: RULE,
    overflow: 'hidden',
  },
  progressFill: {
    height: 2,
    width: '0%',
  },
});
