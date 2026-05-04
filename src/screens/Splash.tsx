import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text as RNText, Platform } from 'react-native';

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
import { AnimatedSignet } from '@/components/svg/AnimatedSignet';
import { RuleDot, Asterisk } from '@/components/svg/Marks';
import { prefetchImages } from '@/components/ui/Image';
import { feedPosts, profileMock, userFeed } from '@/data/mock';

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
  // First 12 feed posts cover the initial visible window + a couple of
  // off-screen-prefetch rows. Each is requested at the actual display size
  // so the disk-cache key matches what Feed will ask for at render time.
  const feedCovers = feedPosts.slice(0, 12).map((p) => ({
    uri: p.image,
    targetWidth: width,
    priority: 'high' as const,
  }));
  const feedAvatars = feedPosts.slice(0, 16).map((p) => ({
    uri: p.avatar,
    targetWidth: 42,
    priority: 'high' as const,
  }));
  const profile = [
    { uri: profileMock.avatar, targetWidth: 120, priority: 'high' as const },
    ...userFeed
      .slice(0, 6)
      .filter((u): u is typeof u & { image: string } => typeof u.image === 'string')
      .map((u) => ({
        uri: u.image,
        targetWidth: Math.floor(width / 3),
        priority: 'normal' as const,
      })),
  ];
  prefetchImages([...feedCovers, ...feedAvatars, ...profile]);
}

export default function Splash() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const headerP = useSharedValue(0);
  const markP = useSharedValue(0);
  const wordP = useSharedValue(0);
  const taglineP = useSharedValue(0);
  const progressP = useSharedValue(0);

  useEffect(() => {
    const ease = Easing.bezier(0.22, 1, 0.36, 1);

    headerP.value = withTiming(1, { duration: 520, easing: ease });
    markP.value = withDelay(200, withTiming(1, { duration: 640, easing: ease }));
    wordP.value = withDelay(900, withTiming(1, { duration: 820, easing: ease }));
    taglineP.value = withDelay(1500, withTiming(1, { duration: 560, easing: ease }));
    progressP.value = withTiming(1, { duration: SPLASH_MS - 200, easing: Easing.linear });

    // Pre-warm the image cache while the splash plays. By the time the user
    // lands on Feed/Profile, the first batch of avatars + cover photos is
    // already on disk, so the first scroll has zero network wait.
    prewarmImageCache();

    const t = setTimeout(() => router.replace('/(onboarding)/welcome'), SPLASH_MS);
    return () => clearTimeout(t);
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerP.value,
    transform: [{ translateY: (1 - headerP.value) * -8 }],
  }));
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

      {/* Top meta */}
      <Animated.View style={[styles.top, headerStyle]}>
        <View style={styles.topRow}>
          <View style={styles.metaCol}>
            <RNText style={styles.metaLabel}>UD · CREATOR OS</RNText>
            <RNText style={styles.metaValue}>N° 001</RNText>
          </View>
          <Asterisk size={18} color={palette.bone} strokeWidth={1.4} />
          <View style={[styles.metaCol, { alignItems: 'flex-end' }]}>
            <RNText style={styles.metaLabel}>VERSION</RNText>
            <RNText style={styles.metaValue}>MMXXVI</RNText>
          </View>
        </View>
        <View style={styles.hairline} />
      </Animated.View>

      {/* Center mark + wordmark */}
      <View style={styles.center}>
        <Animated.View style={[styles.markWrap, markStyle]}>
          <AnimatedSignet size={124} color={palette.bone} accent={palette.acid} />
        </Animated.View>

        <View style={styles.wordmark}>
          <View style={styles.lineClip}>
            <Animated.Text
              style={[styles.word, wordStyle]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
            >
              UNDER<Animated.Text style={styles.wordAccent}>DAWGS</Animated.Text>
            </Animated.Text>
          </View>
        </View>

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
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.bone,
  },
  waveAbs: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  top: {
    paddingTop: 64,
    paddingHorizontal: 24,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 14,
  },
  metaCol: {},
  metaLabel: {
    ...T.micro,
    color: palette.ink,
    opacity: 0.55,
  },
  metaValue: {
    ...T.labelLarge,
    color: palette.ink,
    marginTop: 4,
  },
  hairline: {
    height: 1,
    backgroundColor: palette.lineDark,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  markWrap: {
    marginBottom: 28,
  },
  wordmark: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  lineClip: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  word: {
    fontFamily: fonts.displayBold,
    fontSize: 54,
    lineHeight: 58,
    letterSpacing: -2.2,
    color: palette.ink,
    textAlign: 'center',
  },
  wordAccent: {
    fontFamily: fonts.displayBold,
    fontSize: 54,
    lineHeight: 58,
    letterSpacing: -2.2,
    color: palette.acid,
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
    paddingHorizontal: 24,
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
