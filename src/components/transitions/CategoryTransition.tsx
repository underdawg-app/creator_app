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
  podcaster: { kind: null,    source: null },
  multi:     { kind: null,    source: null },
};

// Editorial-magazine style overlay per category. Kicker sits top-left in
// uppercase tracked caps; headline sits centered/lower in italic display
// serif; footer is a small uppercase strip with the brand mark.
type Copy = { kicker: string; headline: string; footer: string };
const COPY: Record<TransitionKey, Copy> = {
  visual:    { kicker: 'N° 01 — VISUAL ART',  headline: 'The frame is the world.',     footer: 'IMAGE · PAINT · PRINT' },
  musician:  { kicker: 'N° 02 — MUSIC',       headline: 'Notes, before words.',        footer: 'NOTE · LOOP · LIVE' },
  video:     { kicker: 'N° 03 — VIDEO',       headline: 'Tell it in motion.',          footer: 'FRAME · CUT · SHIP' },
  writer:    { kicker: 'N° 04 — WRITING',     headline: 'Pages before voices.',        footer: 'PAGE · INK · VOICE' },
  performer: { kicker: 'N° 05 — PERFORMER',   headline: 'The body remembers.',         footer: 'STAGE · BODY · SHOW' },
  educator:  { kicker: 'N° 06 — EDUCATOR',    headline: 'What you give, multiplies.',  footer: 'BOOK · CLASS · Q & A' },
  podcaster: { kicker: 'N° 07 — PODCASTER',   headline: 'Voices in the dark.',         footer: 'MIC · TAPE · TALK' },
  streamer:  { kicker: 'N° 08 — STREAMER',    headline: 'Live. Always live.',          footer: 'LIVE · CHAT · PLAY' },
  fashion:   { kicker: 'N° 09 — FASHION',     headline: 'Worn, then known.',           footer: 'CLOTH · FIT · FEEL' },
  multi:     { kicker: 'N° 10 — MULTI',       headline: 'All of it. At once.',         footer: 'CRAFT · CROSS · CODE' },
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
  const [mediaReady, setMediaReady] = useState(false);

  // Mount the media element as soon as `active` flips. The slide doesn't run
  // yet — first we wait for the video's onLoad (or the preload cap) so the
  // first frame is on screen before the panel becomes visible.
  useEffect(() => {
    if (!active || !category) {
      slide.value = 0;
      setMediaReady(false);
      return;
    }

    const media = MEDIA[category];
    // GIFs and "no media" categories have nothing meaningful to preload —
    // start the slide immediately.
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
    slide.value = withTiming(
      1,
      { duration: ENTER_MS, easing: Easing.bezier(0.5, 0, 0.2, 1) },
    );

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
            // `onReadyForDisplay` fires when the player has actually composited
            // its first frame — `onLoad` fires earlier (metadata-only) and was
            // letting the colored panel flash for a frame before the video
            // surface had pixels.
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
        <EditorialOverlay copy={COPY[category]} />
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

function EditorialOverlay({ copy }: { copy: Copy }) {
  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.kickerRow}>
        <View style={styles.kickerDot} />
        <RNText style={styles.kickerText}>{copy.kicker}</RNText>
        <View style={styles.kickerRule} />
      </View>

      <View style={styles.headlineWrap}>
        <RNText style={styles.headline} adjustsFontSizeToFit numberOfLines={2} minimumFontScale={0.6}>
          {copy.headline}
        </RNText>
      </View>

      <View style={styles.footerRow}>
        <RNText style={styles.footerText}>{copy.footer}</RNText>
        <View style={styles.footerRule} />
        <RNText style={styles.footerText}>UNDERDAWG · MMXXVI</RNText>
      </View>
    </View>
  );
}

// Editorial overlay sits on top of the video. To read cleanly we treat the
// whole overlay area as a black surface — heavy scrim, soft off-white type,
// hairline rules at low opacity. No bright-white blocks, no neon accents.
const INK = 'rgba(255,255,255,0.92)';
const RULE = 'rgba(255,255,255,0.28)';

const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.62)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 28,
    paddingTop: 96,
    paddingBottom: 80,
    justifyContent: 'space-between',
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  kickerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: INK,
    backgroundColor: 'transparent',
  },
  kickerText: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 2.6,
    color: INK,
    textTransform: 'uppercase',
  },
  kickerRule: {
    flex: 1,
    height: 1,
    backgroundColor: RULE,
  },
  headlineWrap: {
    paddingRight: 16,
  },
  headline: {
    fontFamily: fonts.editorialItalic,
    fontSize: 56,
    lineHeight: 60,
    letterSpacing: -1.2,
    color: INK,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  footerText: {
    fontFamily: fonts.bodyBold,
    fontSize: 10,
    letterSpacing: 2.4,
    color: INK,
    textTransform: 'uppercase',
  },
  footerRule: {
    flex: 1,
    height: 1,
    backgroundColor: RULE,
  },
});
