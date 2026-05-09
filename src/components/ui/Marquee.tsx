import React, { useEffect, useMemo, useState } from 'react';
import { Platform, View, StyleSheet, ViewStyle, Text as RNText } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const IS_ANDROID = Platform.OS === 'android';

type Props = {
  items: string[];
  speed?: number; // px per second
  direction?: 'left' | 'right';
  textStyle?: any;
  separator?: string;
  style?: ViewStyle;
};

/**
 * Infinitely-scrolling horizontal ticker.
 *
 * We measure the width of ONE copy of the content, then render enough
 * copies to always exceed 2× the container's visual width so the tape
 * never shows a blank gap while the transform snaps back to 0. The
 * animation still translates by exactly one-copy-width, so every copy
 * passes the same spot in the same time — no seams, no jumps.
 */
export function Marquee({
  items,
  speed = 60,
  direction = 'left',
  textStyle,
  separator = '  /  ',
  style,
}: Props) {
  const x = useSharedValue(0);
  const [copyW, setCopyW] = useState<number>(0);
  const [containerW, setContainerW] = useState<number>(0);

  // How many copies do we need so the rendered strip is always ≥ 2× the
  // visible container width? That guarantees no blank space at any point
  // in the translation cycle. Minimum 3 copies so two-copy layouts are
  // never bare while a single copy is mid-flight.
  const copyCount = useMemo(() => {
    if (!copyW || !containerW) return 3;
    return Math.max(3, Math.ceil((containerW * 2) / copyW) + 1);
  }, [copyW, containerW]);

  useEffect(() => {
    if (!copyW) return;
    cancelAnimation(x);
    x.value = 0;
    // Slower marquee on Android. The infinite withRepeat keeps the JS thread
    // generating tween updates non-stop; halving speed halves the work.
    const effectiveSpeed = IS_ANDROID ? speed * 0.5 : speed;
    const duration = (copyW / effectiveSpeed) * 1000;
    x.value = withRepeat(
      withTiming(direction === 'left' ? -copyW : copyW, {
        duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    return () => cancelAnimation(x);
  }, [copyW, speed, direction]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: direction === 'right' ? x.value - copyW : x.value }],
  }));

  const content = items.join(separator) + separator;

  return (
    <View
      style={[styles.wrap, style]}
      onLayout={(e) => setContainerW(e.nativeEvent.layout.width)}
    >
      <Animated.View style={[styles.row, animatedStyle]}>
        {Array.from({ length: copyCount }).map((_, i) => (
          <RNText
            key={i}
            style={[textStyle, { flexShrink: 0 }]}
            allowFontScaling={false}
            onLayout={i === 0 ? (e) => setCopyW(e.nativeEvent.layout.width) : undefined}
          >
            {content}
          </RNText>
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { overflow: 'hidden' },
  row: { flexDirection: 'row' },
});
