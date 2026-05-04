import React, { useState } from 'react';
import { Platform, View, ViewProps, LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';

const IS_ANDROID = Platform.OS === 'android';

type Props = ViewProps & {
  scrollY: SharedValue<number>;
  speed?: number;
  children: React.ReactNode;
};

/**
 * Parallax wraps its children and shifts them vertically as the user scrolls.
 *
 * On Android the parallax is disabled — each Parallax instance runs a worklet
 * on every scroll frame that recomputes the transform, and Profile uses
 * several at once. The shift is barely perceptible at our speed values
 * (0.2–0.4) but the cumulative per-frame work is what makes the screen feel
 * sticky on mid-range Android. Returning a plain View skips the worklet
 * entirely.
 */
export function Parallax({ scrollY, speed = 0.3, style, children, ...rest }: Props) {
  if (IS_ANDROID) {
    return (
      <View style={style as any} {...rest}>
        {children}
      </View>
    );
  }
  return (
    <ParallaxImpl scrollY={scrollY} speed={speed} style={style} {...rest}>
      {children}
    </ParallaxImpl>
  );
}

function ParallaxImpl({ scrollY, speed = 0.3, style, children, ...rest }: Props) {
  const [y, setY] = useState<number>(0);
  const onLayout = (e: LayoutChangeEvent) => setY(e.nativeEvent.layout.y);

  const animated = useAnimatedStyle(() => ({
    transform: [{ translateY: (scrollY.value - y) * -speed }],
  }));

  return (
    <Animated.View onLayout={onLayout} style={[style as any, animated]} {...rest}>
      {children}
    </Animated.View>
  );
}
