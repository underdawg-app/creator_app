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

const slideObjects = [
  require('@/objects/obj-1.png'),
  require('@/objects/obj-2.png'),
  require('@/objects/obj-3.png'),
];

const { width, height } = Dimensions.get('window');

const HERO_HEIGHT = Math.min(height * 0.52, 480);
const OBJ_SIZE = Math.min(width * 0.74, 320);
// Slide 1 (obj-1) renders noticeably larger than the rest.
const OBJ_SIZE_LG = Math.min(width * 1.2, 520);

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

  // Spring-followed scroll position drives the parallax. One derived spring
  // instance avoids the jitter of restarting one per scroll event.
  const scrollXFollow = useDerivedValue(() =>
    withSpring(scrollX.value, {
      damping: 18,
      stiffness: 110,
      mass: 1.2,
      overshootClamping: false,
    })
  );

  // Stable refs — Android freezes the slide index if either changes per render.
  const onViewRef = useRef((info: { viewableItems: ViewToken[] }) => {
    if (info.viewableItems[0]?.index != null) {
      setIndex(info.viewableItems[0].index!);
    }
  });
  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 55 });

  const slide = { ...welcomeSlides[index], bg: palette.bone, fg: palette.ink };

  const goNext = () => {
    if (index < welcomeSlides.length - 1) {
      const next = index + 1;
      setIndex(next);
      ref.current?.scrollToIndex({ index: next, animated: true });
    } else {
      router.push('/(onboarding)/auth');
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: slide.bg }]}>
      <SafeAreaView edges={['top']} style={styles.topSafe}>
        <View style={styles.topRow}>
          <View style={styles.counter}>
            <View style={[styles.counterDot, { backgroundColor: slide.accent }]} />
            <RNText style={[styles.counterText, { color: slide.fg }]}>
              {String(index + 1).padStart(2, '0')}
              <RNText style={{ opacity: 0.4 }}>{` / 0${welcomeSlides.length}`}</RNText>
            </RNText>
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
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onScrollToIndexFailed={({ index: i }) => {
          requestAnimationFrame(() => {
            ref.current?.scrollToOffset({ offset: i * width, animated: true });
          });
        }}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        style={{ flex: 1 }}
        renderItem={({ item, index: i }: { item: any; index: number }) => {
          const themeAwareItem = { ...item, bg: palette.bone, fg: palette.ink };
          return (
            <Slide
              item={themeAwareItem}
              i={i}
              scrollX={scrollX}
              scrollXFollow={scrollXFollow}
              active={i === index}
            />
          );
        }}
      />

      <SafeAreaView edges={['bottom']} style={styles.bottomSafe}>
        <View style={styles.bottomRow}>
          <View style={styles.dots}>
            {welcomeSlides.map((_, di) => {
              const isActive = di === index;
              return (
                <View
                  key={di}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: isActive ? slide.accent : slide.fg,
                      opacity: isActive ? 1 : 0.28,
                      width: isActive ? 28 : 8,
                    },
                  ]}
                />
              );
            })}
          </View>
          <MagneticButton
            label={index === welcomeSlides.length - 1 ? 'GET STARTED' : 'CONTINUE'}
            onPress={goNext}
            background={index === 0 ? '#8B5CF6' : slide.accent}
            foreground={index === 0 ? '#F2EFE6' : palette.ink}
            size="lg"
          />
        </View>
      </SafeAreaView>
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

  // Idle float — sine loop, only on the active slide.
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

  const objStyle = useAnimatedStyle(() => {
    const input = [(i - 1) * width, i * width, (i + 1) * width];
    const followTx = interpolate(
      scrollXFollow.value,
      input,
      [width * 0.9, 0, -width * 0.9]
    );
    const followRot = interpolate(scrollXFollow.value, input, [-22, 0, 22]);
    const followSc = interpolate(scrollXFollow.value, input, [0.82, 1, 0.82]);
    const idleY = (idle.value - 0.5) * 32;
    const idleX = (idle2.value - 0.5) * 18;
    const idleRot = (idle.value - 0.5) * 8 + (idle2.value - 0.5) * 3;
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


  // Faint chapter glyph behind the hero. Slow drift; opacity dips off-screen.
  const glyphStyle = useAnimatedStyle(() => {
    const input = [(i - 1) * width, i * width, (i + 1) * width];
    const tx = interpolate(scrollX.value, input, [width * 0.5, 0, -width * 0.5]);
    const op = interpolate(scrollX.value, input, [0, 0.07, 0]);
    return { transform: [{ translateX: tx }], opacity: op };
  });

  // Copy block enters from below — feels grounded after the swipe.
  const copyStyle = useAnimatedStyle(() => {
    const input = [(i - 1) * width, i * width, (i + 1) * width];
    const tx = interpolate(scrollX.value, input, [width * 0.25, 0, -width * 0.25]);
    const op = interpolate(scrollX.value, input, [0, 1, 0]);
    return { transform: [{ translateX: tx }], opacity: op };
  });

  return (
    <View style={styles.slide}>
      {/* Hero zone — accent halo + 3d object + faded chapter glyph */}
      <View style={styles.hero}>
        <Animated.Text
          style={[
            styles.heroGlyph,
            { color: item.fg },
            glyphStyle,
          ]}
          allowFontScaling={false}
        >
          {item.kanji}
        </Animated.Text>

        <Animated.View style={[styles.objWrap, objStyle]} pointerEvents="none">
          <Image
            source={slideObjects[i % slideObjects.length]}
            style={{
              width: i === 0 ? OBJ_SIZE_LG : OBJ_SIZE,
              height: i === 0 ? OBJ_SIZE_LG : OBJ_SIZE,
            }}
            contentFit="contain"
          />
        </Animated.View>
      </View>

      {/* Copy zone */}
      <Animated.View style={[styles.copy, copyStyle]}>
        <RNText style={[styles.title, { color: item.fg }]} allowFontScaling={false}>
          {item.title}
        </RNText>
        <RNText
          allowFontScaling={false}
          style={[styles.desc, { color: item.fg }]}
        >
          {item.description}
        </RNText>
      </Animated.View>
    </View>
  );
}

const makeStyles = (palette: typeof staticPalette) => StyleSheet.create({
  root: { flex: 1 },

  topSafe: { paddingHorizontal: 20 },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  counterDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  counterText: {
    ...T.label,
    letterSpacing: 2.4,
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  skip: { ...T.label, opacity: 0.75 },
  skipLine: { width: 14, height: 1, opacity: 0.75 },

  slide: {
    width,
    flex: 1,
    paddingHorizontal: 24,
  },
  hero: {
    height: HERO_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  heroGlyph: {
    position: 'absolute',
    top: 20,
    left: -8,
    fontFamily: fonts.displayBold,
    fontSize: 200,
    lineHeight: 190,
    letterSpacing: -6,
    includeFontPadding: false,
  },
  objWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  copy: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  accentRule: {
    width: 44,
    height: 3,
    marginBottom: 18,
  },
  title: {
    fontFamily: fonts.displayBold,
    fontSize: 52,
    lineHeight: 54,
    letterSpacing: -1.6,
    includeFontPadding: false,
  },
  desc: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.1,
    opacity: 0.78,
    marginTop: 16,
    maxWidth: 340,
  },

  bottomSafe: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});
