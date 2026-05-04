import React, { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ViewProps } from 'react-native';

type Props = ViewProps & {
  delay?: number;
  duration?: number;
  from?: 'right' | 'up' | 'fade';
  distance?: number;
};

/**
 * Wrap the root of every screen. It does a soft slide-in + fade on mount,
 * so every navigation transition gets an extra layer of polish beyond the
 * stack's own push animation.
 */
export function PageTransition({
  delay = 0,
  duration = 620,
  from = 'right',
  distance = 18,
  style,
  children,
  ...rest
}: Props) {
  const p = useSharedValue(0);

  useEffect(() => {
    p.value = 0;
    p.value = withTiming(1, {
      duration,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    });
  }, [duration]);

  const animated = useAnimatedStyle(() => {
    let tx = 0;
    let ty = 0;
    if (from === 'right') tx = (1 - p.value) * distance;
    if (from === 'up') ty = (1 - p.value) * distance;
    return {
      opacity: p.value,
      transform: [{ translateX: tx }, { translateY: ty }],
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, style as any, animated]} {...rest}>
      {children}
    </Animated.View>
  );
}
