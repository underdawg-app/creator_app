import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Text as RNText, Platform, Image as RNImage } from 'react-native';
import Video from 'react-native-video';

const IS_ANDROID = Platform.OS === 'android';
import { router } from '@/navigation';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useTheme, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { type as T } from '@/theme/typography';
import { RuleDot } from '@/components/svg/Marks';
import { BRAND_WORDMARK_ASSETS } from '@/components/brand/BrandWordmark';
import { prefetchImages } from '@/components/ui/Image';
import { feedPosts, profileMock, userFeed } from '@/data/mock';
import { useStore } from '@/store';
import { getAuth } from '@/lib/firebase';

// Theme-aware splash films. Each already contains the animated underdawg
// wordmark, so the screen renders no logo of its own — the video IS the logo.
const SPLASH_DARK = require('@/objects/splash-dark.mp4');
const SPLASH_LIGHT = require('@/objects/splash-light.mp4');

// Off-screen warmers for the brand + decorative PNGs the first real screen
// paints, so nothing decodes-on-render after the splash hands off.
const PRELOAD_ASSETS = [
  ...BRAND_WORDMARK_ASSETS,
  require('@/objects/obj-1.png'),
  require('@/objects/obj-2.png'),
  require('@/objects/obj-3.png'),
  require('@/objects/obj-4.png'),
  require('@/objects/obj-5.png'),
  require('@/objects/obj-6.png'),
  require('@/objects/obj-7.png'),
  require('@/objects/obj-8.png'),
  require('@/objects/obj-9.png'),
  require('@/objects/obj-10.png'),
];

const { width } = Dimensions.get('window');

// Hand-off is driven by the film actually finishing (`onEnd`), then we hold a
// beat on the completed wordmark so it never jump-cuts into onboarding.
const END_HOLD_MS = 850;
// Safety net only — fires if the film never reports `onEnd` (stall / error).
const FALLBACK_MS = IS_ANDROID ? 5200 : 5800;
// Playback rate ramp: punch in hard at the open, ease to a calmer finish.
const RATE_START = 3.2;
const RATE_END = 1.2;
// Scale the film down so the wordmark reads as a mark, not a billboard. The
// film's own field is the backdrop colour, so the margin is seamless.
const VIDEO_SCALE = 0.82;

let CACHE_PREWARMED = false;
function prewarmImageCache() {
  if (CACHE_PREWARMED) return;
  CACHE_PREWARMED = true;
  const feedCoversHigh = feedPosts.slice(0, 12).map((p) => ({
    uri: p.image,
    targetWidth: width,
    priority: 'high' as const,
  }));
  const feedCoversRest = feedPosts.slice(12).map((p) => ({
    uri: p.image,
    targetWidth: width,
    priority: 'normal' as const,
  }));
  const feedAvatars = feedPosts.map((p) => ({
    uri: p.avatar,
    targetWidth: 42,
    priority: 'high' as const,
  }));
  const profile = [
    { uri: profileMock.avatar, targetWidth: 120, priority: 'high' as const },
    ...userFeed
      .filter((u): u is typeof u & { image: string } => typeof u.image === 'string')
      .map((u) => ({
        uri: u.image,
        targetWidth: Math.floor(width / 3),
        priority: 'normal' as const,
      })),
  ];
  prefetchImages([...feedCoversHigh, ...feedAvatars, ...profile, ...feedCoversRest]);
}

export default function Splash() {
  const { scheme } = useTheme();
  const styles = useThemedPaletteStyles(makeStyles);

  const isDark = scheme === 'dark';
  const source = isDark ? SPLASH_DARK : SPLASH_LIGHT;
  // Match the film's own field so there's zero flash before the first frame.
  const backdrop = isDark ? '#000000' : '#F4F1EA';
  // Chrome ink reads against the film: light on the dark film, dark on light.
  const ink = isDark ? '#F2EFE6' : '#11110E';
  const accent = staticPalette.acid;

  const [rate, setRate] = useState(RATE_START);
  const vProg = useSharedValue(0);
  const routedRef = useRef(false);

  const finish = () => {
    if (routedRef.current) return;
    routedRef.current = true;
    // Wait for store hydration, then branch on auth.
    const route = () => {
      const { hydrated, onboarded } = useStore.getState();
      if (!hydrated) {
        setTimeout(route, 60);
        return;
      }
      let signedIn = false;
      try {
        signedIn = !!getAuth().currentUser;
      } catch {
        signedIn = false;
      }
      if (!signedIn) router.replace('/(onboarding)/welcome');
      else if (!onboarded) router.replace('/(onboarding)/user-type');
      else router.replace('/(tabs)');
    };
    route();
  };

  // The film hitting its end is the primary trigger; hold a beat on the final
  // frame (video pauses there) before we route, so it doesn't jump-cut.
  const onVideoEnd = () => {
    setTimeout(finish, END_HOLD_MS);
  };

  useEffect(() => {
    prewarmImageCache();
    // Pure safety net in case `onEnd` never arrives.
    const t = setTimeout(finish, FALLBACK_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drive the rate ramp + progress bar off real playback position.
  const onProgress = (e: { currentTime: number; seekableDuration: number }) => {
    const dur = e.seekableDuration > 0 ? e.seekableDuration : 5;
    const f = Math.min(1, Math.max(0, e.currentTime / dur));
    vProg.value = f;
    const eased = Math.pow(f, 0.82);
    const next = RATE_START + (RATE_END - RATE_START) * eased;
    setRate((prev) => (Math.abs(prev - next) > 0.04 ? next : prev));
  };

  const progressStyle = useAnimatedStyle(() => ({ width: `${vProg.value * 100}%` }));

  return (
    <View style={[styles.root, { backgroundColor: backdrop }]}>
      {/* The film — centered and scaled down; it already carries the wordmark.
          `contain` shows the whole frame (no zoom-crop) so the logo stays at
          its true, smaller size. */}
      <View pointerEvents="none" style={styles.videoWrap}>
        <Video
          source={source}
          style={styles.video}
          resizeMode="contain"
          rate={rate}
          muted
          repeat={false}
          controls={false}
          ignoreSilentSwitch="ignore"
          playInBackground={false}
          playWhenInactive={false}
          progressUpdateInterval={50}
          onProgress={onProgress}
          onEnd={onVideoEnd}
          onError={finish}
        />
      </View>

      {/* Subtle legibility scrims top + bottom; center stays clean for the logo. */}
      <View pointerEvents="none" style={[styles.scrimTop, { backgroundColor: backdrop }]} />
      <View pointerEvents="none" style={[styles.scrimBottom, { backgroundColor: backdrop }]} />

      {/* Top status line — visible from frame one, no entrance delay. */}
      <View style={styles.top}>
        <View style={styles.statusRow}>
          <RNText style={[styles.statusLabel, { color: ink }]} allowFontScaling={false}>
            LOADING EDITION
          </RNText>
          <RNText style={[styles.statusLabel, { color: ink }]} allowFontScaling={false}>
            {`${String(new Date().getFullYear()).slice(-2)} / ${String(
              new Date().getMonth() + 1,
            ).padStart(2, '0')}`}
          </RNText>
        </View>
      </View>

      {/* Bottom chrome — tagline, progress, copyright — also no entrance delay. */}
      <View style={styles.bottom}>
        <RuleDot width={width - 48} color={`${ink}22`} dotColor={accent} />
        <RNText
          style={[styles.tagline, { color: ink }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
          allowFontScaling={false}
        >
          GET DISCOVERED. GET CONNECTED. GET PAID.
        </RNText>
        <View style={[styles.progressTrack, { backgroundColor: `${ink}1F` }]}>
          <Animated.View style={[styles.progressFill, { backgroundColor: accent }, progressStyle]} />
        </View>
        <RNText style={[styles.copyright, { color: ink }]} allowFontScaling={false}>
          © UNDERDAWG · BUILT FOR THE UNDERRATED
        </RNText>
      </View>

      {/* Off-screen PNG warmers — 1×1, invisible, never touched. */}
      <View
        pointerEvents="none"
        style={styles.preloader}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
      >
        {PRELOAD_ASSETS.map((src, i) => (
          <RNImage key={i} source={src} style={styles.preloaderImg} />
        ))}
      </View>
    </View>
  );
}

const makeStyles = (_palette: typeof staticPalette) =>
  StyleSheet.create({
    root: { flex: 1 },

    videoWrap: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
    video: { width: '100%', height: '100%', transform: [{ scale: VIDEO_SCALE }] },

    scrimTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 120, opacity: 0.4 },
    scrimBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 240, opacity: 0.5 },

    top: { position: 'absolute', top: 0, left: 0, right: 0, paddingTop: IS_ANDROID ? 28 : 58, paddingHorizontal: 24 },
    statusRow: { flexDirection: 'row', justifyContent: 'space-between' },
    statusLabel: { ...T.micro, opacity: 0.6 },

    bottom: { position: 'absolute', left: 0, right: 0, bottom: 44, paddingHorizontal: 24, gap: 14, alignItems: 'center' },
    tagline: { ...T.labelLarge, opacity: 0.9, textAlign: 'center' },
    progressTrack: { alignSelf: 'stretch', height: 2, overflow: 'hidden', borderRadius: 1 },
    progressFill: { height: 2 },
    copyright: { ...T.micro, opacity: 0.45, textAlign: 'center' },

    preloader: { position: 'absolute', left: 0, top: 0, width: 1, height: 1, opacity: 0 },
    preloaderImg: { width: 1, height: 1 },
  });
