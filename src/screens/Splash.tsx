import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text as RNText, Platform, Image as RNImage } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
import { router } from '@/navigation';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { SkiaGrain } from '@/components/skia/SkiaGrain';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
const BRAND_WORDMARK = require('@/objects/brand-splash.png');
// Every bundled image the app uses, rendered invisibly below at 1×1 so the
// PNG decoder warms the bitmap cache during splash. By the time the user
// reaches the first real screen, none of these have to decode-on-render —
// they paint instantly. Includes brand marks (header/tab-bar/splash) and
// every decorative `obj-*.png` used across onboarding + auth + complete.
const PRELOAD_ASSETS = [
  require('@/objects/brand-logo.png'),
  require('@/objects/brand-wordmark.png'),
  require('@/objects/brand-splash.png'),
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
import { RuleDot } from '@/components/svg/Marks';
import { prefetchImages } from '@/components/ui/Image';
import { feedPosts, profileMock, userFeed } from '@/data/mock';
import { useStore } from '@/store';
import { getAuth } from '@/lib/firebase';

const { width, height } = Dimensions.get('window');

// 3s on iOS gives the editorial reveal time to land. On Android the same
// duration overlaps with the JS bundle settling and just feels like the app
// is frozen, so we cut it roughly in half and let the user reach the actual
// product faster.
const SPLASH_MS = IS_ANDROID ? 1200 : 3000;

let CACHE_PREWARMED = false;
function prewarmImageCache() {
  if (CACHE_PREWARMED) return;
  CACHE_PREWARMED = true;
  // Pre-warm FastImage's memory + disk cache for every remote URL the app
  // will likely render in the first session. Splits into priority tiers so
  // the visible-first-paint covers download first.
  // HIGH: the initial feed window + every avatar (small, fast, ubiquitous).
  // NORMAL: the rest of the feed gallery + user-feed grid.
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
  prefetchImages([
    ...feedCoversHigh,
    ...feedAvatars,
    ...profile,
    ...feedCoversRest,
  ]);
}

export default function Splash() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const markP = useSharedValue(0);
  const wordP = useSharedValue(0);
  const taglineP = useSharedValue(0);
  const progressP = useSharedValue(0);

  useEffect(() => {
    const ease = Easing.bezier(0.22, 1, 0.36, 1);

    markP.value = withDelay(200, withTiming(1, { duration: 640, easing: ease }));
    wordP.value = withDelay(900, withTiming(1, { duration: 820, easing: ease }));
    taglineP.value = withDelay(1500, withTiming(1, { duration: 560, easing: ease }));
    progressP.value = withTiming(1, { duration: SPLASH_MS - 200, easing: Easing.linear });

    // Pre-warm the image cache while the splash plays. By the time the user
    // lands on Feed/Profile, the first batch of avatars + cover photos is
    // already on disk, so the first scroll has zero network wait.
    prewarmImageCache();

    // Route based on:
    //   1. Persisted Zustand state (hydrated + onboarded flags)
    //   2. Firebase auth currentUser (signed-in / signed-out)
    //
    // Truth table:
    //   - !signedIn        → Welcome (run full onboarding incl. auth)
    //   - signedIn + !onboarded → Auth screen (pick up where they left off)
    //   - signedIn + onboarded → Tabs
    //
    // Wait for AsyncStorage hydration before reading; Firebase native SDK
    // hydrates synchronously from disk so currentUser is reliable here.
    const route = () => {
      const { hydrated, onboarded } = useStore.getState();
      if (!hydrated) {
        setTimeout(route, 80);
        return;
      }
      let signedIn = false;
      try {
        signedIn = !!getAuth().currentUser;
      } catch {
        // Firebase native module unavailable (e.g. during dev without
        // GoogleService-Info.plist). Fall back to onboarded flag alone.
        signedIn = false;
      }
      if (!signedIn) {
        router.replace('/(onboarding)/welcome');
      } else if (!onboarded) {
        router.replace('/(onboarding)/user-type');
      } else {
        router.replace('/(tabs)');
      }
    };
    const t = setTimeout(route, SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  const markStyle = useAnimatedStyle(() => ({
    opacity: markP.value,
    transform: [{ scale: 0.9 + markP.value * 0.1 }],
  }));
  const wordStyle = useAnimatedStyle(() => ({
    opacity: wordP.value,
    transform: [{ translateY: (1 - wordP.value) * 44 }],
  }));
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineP.value,
    transform: [{ translateY: (1 - taglineP.value) * 12 }],
  }));
  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressP.value * 100}%`,
  }));

  return (
    <View style={styles.root}>
      {/* Backdrop — Skia wave field skipped on Android (see SkiaWaveField). */}
      {!IS_ANDROID && (
        <View style={styles.waveAbs} pointerEvents="none">
          <SkiaWaveField
            width={width}
            height={height}
            color="rgba(242,239,230,0.055)"
            lines={22}
            amplitude={12}
            frequency={0.018}
            speed={0.3}
            strokeWidth={1}
          />
        </View>
      )}

      {/* Center wordmark */}
      <View style={styles.center}>
        <Animated.View style={[styles.wordmark, markStyle]}>
          <RNImage
            source={BRAND_WORDMARK}
            style={styles.brandWordmark}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.tagline, taglineStyle]}>
          <RuleDot width={180} color={palette.bone} dotColor={palette.acid} />
          <RNText
            style={styles.taglineText}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.5}
          >
            GET DISCOVERED. GET CONNECTED. GET PAID.
          </RNText>
        </Animated.View>
      </View>

      {/* Bottom progress + status */}
      <Animated.View style={[styles.bottom, taglineStyle]}>
        <View style={styles.statusRow}>
          <RNText style={styles.statusLabel}>LOADING EDITION</RNText>
          <RNText style={styles.statusLabel}>
            {`${String(new Date().getFullYear()).slice(-2)} / ${String(
              new Date().getMonth() + 1
            ).padStart(2, '0')}`}
          </RNText>
        </View>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
        <RNText style={styles.copyright}>© UNDERDAWGS · BUILT FOR THE UNDERRATED</RNText>
      </Animated.View>

      {/* Skip the procedural grain on Android — running a full-screen
          fragment shader during the first JS frames after font load is the
          dominant cause of the splash signet stutter on mid-range devices. */}
      {!IS_ANDROID && (
        <SkiaGrain
          width={width}
          height={height}
          intensity={0.1}
          tint={[1, 1, 1, 0.16]}
        />
      )}

      {/* Off-screen preloaders — force RN to decode brand PNGs so the
          headers (Feed/Explore/Welcome) and tab-bar logo render instantly
          on first mount after splash. 1×1 px, fully transparent, behind
          everything, never touched by the user. */}
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

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  preloader: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 1,
    height: 1,
    opacity: 0,
  },
  preloaderImg: { width: 1, height: 1 },
  root: {
    flex: 1,
    backgroundColor: palette.bone,
  },
  waveAbs: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  wordmark: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  brandWordmark: {
    width: Math.min(width * 0.85, 380),
    height: Math.min(width * 0.85, 380),
  },

  tagline: {
    marginTop: 32,
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 14,
  },
  taglineText: {
    ...T.labelLarge,
    color: palette.ink,
    opacity: 0.8,
    textAlign: 'center',
  },

  bottom: {
    paddingBottom: 40,
    paddingHorizontal: 12,
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabel: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.5,
  },
  progressTrack: {
    height: 2,
    backgroundColor: palette.lineDark,
    overflow: 'hidden',
  },
  progressFill: {
    height: 2,
    backgroundColor: palette.acid,
  },
  copyright: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.4,
    textAlign: 'center',
    marginTop: 4,
  },
});
