import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ViewToken,
  Pressable,
  Text as RNText,
  Platform,
} from 'react-native';
import { router } from '@/navigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

const IS_ANDROID = Platform.OS === 'android';
import { Image } from '@/components/ui/Image';
import { palette as staticPalette } from '@/theme/colors';
import { useThemedPalette, useThemedPaletteStyles } from '@/theme/ThemeContext';
import { fonts, type as T } from '@/theme/typography';
import { welcomeSlides } from '@/data/mock';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { RevealText } from '@/components/ui/RevealText';
import { SkiaWaveField } from '@/components/skia/SkiaWaveField';
import { SkiaGrain } from '@/components/skia/SkiaGrain';
import { Marquee } from '@/components/ui/Marquee';
import { Asterisk, CornerBracket, StepDots } from '@/components/svg/Marks';

const slideObjects = [
  require('@/objects/obj-1.png'),
  require('@/objects/obj-2.png'),
  require('@/objects/obj-3.png'),
];

const BRAND_LOGO = require('@/objects/brand-wordmark.png');

const { width, height } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<any>);

export default function Welcome() {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const scrollX = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const ref = useRef<FlatList<any>>(null);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  // Continuous spring follower — derived so Reanimated tracks a single spring
  // instance instead of restarting one per scroll event (which caused jitter).
  const scrollXFollow = useDerivedValue(() =>
    withSpring(scrollX.value, {
      damping: 18,
      stiffness: 110,
      mass: 1.2,
      overshootClamping: false,
    })
  );

  // Android requires onViewableItemsChanged + viewabilityConfig to be STABLE
  // refs across renders — passing fresh closures triggers
  // "Changing onViewableItemsChanged on the fly is not supported" and freezes
  // the slide index at 0, which in turn makes the NEXT button no-op.
  const onViewRef = useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems[0]?.index != null) {
      setIndex(info.viewableItems[0].index!);
    }
  });
  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 55 });

  const slide = welcomeSlides[index];
  const isLight = slide.fg === palette.ink;
  const hair = isLight ? 'rgba(10,10,10,0.28)' : 'rgba(242,239,230,0.32)';

  const goNext = () => {
    if (index < welcomeSlides.length - 1) {
      const next = index + 1;
      // Optimistically update local state so the UI advances even if Android's
      // viewability callback is debounced or never fires for the programmatic
      // scroll. This prevents the "stuck on slide 1" bug.
      setIndex(next);
      ref.current?.scrollToIndex({ index: next, animated: true });
    } else {
      router.push('/(onboarding)/auth');
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: slide.bg }]}>
      {/* SkiaWaveField removed — animated background lines were reading
          as a screen glitch on device. Plain bg is calmer for onboarding. */}

      <SafeAreaView edges={['top']} style={styles.topSafe}>
        <View style={styles.topRow}>
          <View style={styles.brand}>
            <Image
              source={BRAND_LOGO}
              style={styles.brandLogo}
              contentFit="contain"
            />
          </View>
          <Pressable
            onPress={() => router.replace('/(onboarding)/auth')}
            hitSlop={10}
            style={styles.skipBtn}
          >
            <RNText style={[styles.skip, { color: slide.fg }]}>SKIP</RNText>
            <View style={[styles.skipLine, { backgroundColor: slide.fg }]} />
          </Pressable>
        </View>
        <View style={[styles.hairline, { backgroundColor: hair }]} />
      </SafeAreaView>

      <AnimatedFlatList
        ref={ref}
        data={welcomeSlides}
        keyExtractor={(it: any) => it.kanji}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        // getItemLayout + onScrollToIndexFailed make programmatic scrollToIndex
        // reliable on Android, where unmeasured items would otherwise silently
        // drop the call.
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onScrollToIndexFailed={({ index: i }) => {
          requestAnimationFrame(() => {
            ref.current?.scrollToOffset({ offset: i * width, animated: true });
          });
        }}
        // Windowing: render the visible slide first; neighbors lazily.
        // Keeps Reanimated worklet count low on Android.
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        style={{ flex: 1 }}
        renderItem={({ item, index: i }: { item: any; index: number }) => (
          <Slide
            item={item as (typeof welcomeSlides)[0]}
            i={i}
            scrollX={scrollX}
            scrollXFollow={scrollXFollow}
            active={i === index}
          />
        )}
      />

      <SafeAreaView edges={['bottom']} style={styles.bottomSafe}>
        <View style={[styles.hairline, { backgroundColor: hair }]} />

        <View style={styles.bottomRow}>
          <View style={styles.dotsCol}>
            <StepDots
              total={welcomeSlides.length}
              active={index}
              activeColor={slide.accent}
              inactiveColor={slide.fg}
              size={8}
              activeWidth={28}
              gap={6}
            />
            <RNText style={[styles.progress, { color: slide.fg }]}>
              {String(index + 1).padStart(2, '0')} / 0{welcomeSlides.length}
            </RNText>
          </View>
          <MagneticButton
            label={index === welcomeSlides.length - 1 ? 'START' : 'NEXT'}
            onPress={goNext}
            background={slide.accent}
            foreground={slide.bg}
            size="lg"
          />
        </View>

        <Marquee
          items={['GET DISCOVERED', 'CONNECTED']}
          speed={40}
          separator="   ·   "
          textStyle={{
            fontFamily: fonts.displayBold,
            color: slide.fg,
            opacity: 0.85,
            fontSize: 18,
            lineHeight: 22,
            letterSpacing: -0.4,
            includeFontPadding: false,
          }}
          style={{ marginTop: 26, height: 26 }}
        />
      </SafeAreaView>

      {/* SkiaGrain disabled on this screen — its shader includes a slow
          vertical sweep that read as a glitching scan-line on device. */}
    </View>
  );
}

function Slide({
  item,
  i,
  scrollX,
  scrollXFollow,
  active,
}: {
  item: (typeof welcomeSlides)[0];
  i: number;
  scrollX: SharedValue<number>;
  scrollXFollow: SharedValue<number>;
  active: boolean;
}) {
  const palette = useThemedPalette();
  const styles = useThemedPaletteStyles(makeStyles);
  const titleLines = item.title.split('\n');

  // Idle float — single continuous sine loop. Only runs for the ACTIVE slide;
  // off-screen slides park their values at rest so we don't burn UI-thread
  // cycles animating things the user can't see. This is the single biggest
  // smoothness win on Android, where 3 simultaneous worklets per slide × 3
  // slides was the dominant cost.
  const idle = useSharedValue(0.5);
  const idle2 = useSharedValue(0.5);
  React.useEffect(() => {
    if (!active) {
      cancelAnimation(idle);
      cancelAnimation(idle2);
      idle.value = 0.5;
      idle2.value = 0.5;
      return;
    }
    idle.value = withRepeat(
      withTiming(1, { duration: 3200 + i * 240, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    idle2.value = withRepeat(
      withTiming(1, { duration: 2300 + i * 200, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
    return () => {
      cancelAnimation(idle);
      cancelAnimation(idle2);
    };
  }, [active]);

  const blobStyle = useAnimatedStyle(() => {
    const input = [(i - 1) * width, i * width, (i + 1) * width];
    const followTx = interpolate(
      scrollXFollow.value,
      input,
      [width * 0.8, 0, -width * 0.8]
    );
    const followRot = interpolate(scrollXFollow.value, input, [-24, 0, 24]);
    const followSc = interpolate(scrollXFollow.value, input, [0.86, 1, 0.86]);
    // Idle float — wider radius, smoother sine loop. Wobble lag is intentionally
    // dropped: it added extra worklet cost per frame for a subtle effect that
    // disappears in the noise of the spring follower.
    const idleY = (idle.value - 0.5) * 44;
    const idleX = (idle2.value - 0.5) * 22;
    const idleRot = (idle.value - 0.5) * 10 + (idle2.value - 0.5) * 4;
    const idleSc = 1 + (idle.value - 0.5) * 0.05;
    return {
      transform: [
        { translateX: followTx + idleX },
        { translateY: idleY },
        { rotate: `${followRot + idleRot}deg` },
        { scale: followSc * idleSc },
      ],
    };
  });

  const editorialStyle = useAnimatedStyle(() => {
    const input = [(i - 1) * width, i * width, (i + 1) * width];
    const tx = interpolate(scrollX.value, input, [width * 0.4, 0, -width * 0.4]);
    const op = interpolate(scrollX.value, input, [0, 1, 0]);
    return { transform: [{ translateX: tx }], opacity: op };
  });

  return (
    <View style={{ width, paddingHorizontal: 12, flex: 1 }}>
      {/* Kicker row with asterisk */}
      <View style={styles.slideHeader}>
        <Asterisk size={14} color={item.fg} strokeWidth={1.4} />
        <RNText style={[styles.kicker, { color: item.fg }]}>
          {item.kanji} · {item.kicker}
        </RNText>
        <View style={[styles.tick, { backgroundColor: item.fg }]} />
        <RNText style={[styles.kicker, { color: item.fg, opacity: 0.6 }]}>
          EDITION 26
        </RNText>
      </View>

      {/* 3D object — floats, wobbles, parallaxes with swipe */}
      <Animated.View style={[styles.blobWrap, blobStyle]} pointerEvents="none">
        <Image
          source={slideObjects[i % slideObjects.length]}
          style={{ width: width * 0.78, height: width * 0.78 }}
          contentFit="contain"
        />
      </Animated.View>

      {/* Copy block */}
      <View style={styles.slideCopy}>
        {/* Framing brackets */}
        <View style={styles.copyFrame}>
          <CornerBracket
            width={24}
            height={24}
            color={item.fg}
            corner="tl"
            style={{ position: 'absolute', top: -8, left: -8 }}
          />
          <CornerBracket
            width={24}
            height={24}
            color={item.fg}
            corner="br"
            style={{ position: 'absolute', bottom: -8, right: -8 }}
          />

          <RNText
            numberOfLines={titleLines.length}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            allowFontScaling={false}
            style={{
              fontFamily: fonts.displayBold,
              fontSize: 40,
              lineHeight: 42,
              letterSpacing: -1.0,
              color: item.fg,
              includeFontPadding: false,
            }}
          >
            {item.title}
          </RNText>
        </View>

        <Animated.Text
          style={[
            {
              fontFamily: fonts.editorialItalic,
              fontSize: 22,
              lineHeight: 28,
              letterSpacing: -0.3,
              color: item.accent,
              marginTop: 40,
            },
            editorialStyle,
          ]}
        >
          {item.editorial}
        </Animated.Text>
        <RNText
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            lineHeight: 22,
            color: item.fg,
            opacity: 0.75,
            marginTop: 20,
            maxWidth: 360,
          }}
        >
          {item.description}
        </RNText>
      </View>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1 },
  topSafe: { paddingHorizontal: 12 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 6,
    paddingBottom: 10,
  },
  brand: {
    width: 130,
    height: 36,
    justifyContent: 'center',
    overflow: 'visible',
  },
  brandLogo: {
    position: 'absolute',
    left: -8,
    top: -32,
    width: 130,
    height: 100,
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  skip: {
    ...T.label,
    opacity: 0.75,
  },
  skipLine: { width: 14, height: 1, opacity: 0.75 },
  hairline: { height: 1 },

  slideHeader: {
    marginTop: 24,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tick: { width: 14, height: 2, opacity: 0.5 },
  kicker: { ...T.label },
  blobWrap: {
    position: 'absolute',
    right: -width * 0.2,
    top: 56,
    opacity: 0.94,
  },
  slideCopy: {
    marginTop: 'auto',
    marginBottom: 36,
  },
  copyFrame: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },

  bottomSafe: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    paddingTop: 0,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 28,
    paddingBottom: 14,
  },
  dotsCol: { gap: 12 },
  progress: { ...T.micro, opacity: 0.6 },
});
